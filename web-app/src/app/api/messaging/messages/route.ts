import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { withRateLimit } from '@/lib/rate-limit-middleware'
import { logRateLimitViolation, detectAndLogAbuse } from '@/lib/rate-limit-monitoring'
import logger from '@/utils/logger'

export async function GET(request: NextRequest) {
  // Apply rate limiting for community messaging
  const rateLimitCheck = await withRateLimit(request, 'community-messaging');
  
  if (!('success' in rateLimitCheck)) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    logRateLimitViolation(
      clientIP,
      'community-messaging',
      '/api/messaging/messages',
      20, // limit from config
      1,
      request.headers.get('user-agent') || undefined
    );
    return rateLimitCheck;
  }

  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }

    // Verify user is participant in conversation
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select('participant_ids')
      .eq('id', conversationId)
      .single()

    if (conversationError || !conversation?.participant_ids.includes(user.id)) {
      return NextResponse.json({ error: 'Access denied to this conversation' }, { status: 403 })
    }

    // Get messages with sender details
    const { data: messages, error } = await supabase
      .from('conversation_messages')
      .select(`
        *,
        sender:profiles!sender_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        ),
        receiver:profiles!receiver_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `)
      .eq('conversation_id', conversationId)
      .in('approval_status', ['approved', 'auto_approved'])
      .eq('is_blocked', false)
      .order('created_at', { ascending: true })

    if (error) {
      logger.error('Failed to fetch conversation messages', error, {
        area: 'messaging',
        action: 'fetch_messages',
        userId: user.id,
        conversationId
      })
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    const response = NextResponse.json(messages || [])
    
    // Add rate limit headers
    rateLimitCheck.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    logger.error('Messages API GET error', error, {
      area: 'messaging',
      action: 'fetch_messages_api'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Apply stricter rate limiting for message posting
  const rateLimitCheck = await withRateLimit(request, 'community-messaging');
  
  if (!('success' in rateLimitCheck)) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Detect potential spam or abuse patterns
    const isAbuse = detectAndLogAbuse(
      clientIP,
      '/api/messaging/messages',
      'community-messaging',
      1,
      60000 // 1 minute window
    );
    
    if (isAbuse) {
      logger.warn('Potential messaging abuse detected', undefined, {
        area: 'security',
        action: 'messaging_abuse_detection',
        client_ip: `${clientIP.substring(0, 8)}***`
      });
    }
    
    return rateLimitCheck;
  }

  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { conversationId, receiverId, content, messageType = 'text' } = body

    if (!conversationId || !receiverId || !content) {
      return NextResponse.json({ 
        error: 'Conversation ID, receiver ID, and content are required' 
      }, { status: 400 })
    }

    // Verify conversation exists and user is participant
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select('participant_ids, is_active')
      .eq('id', conversationId)
      .single()

    if (conversationError || !conversation?.participant_ids.includes(user.id) || !conversation.is_active) {
      return NextResponse.json({ error: 'Invalid conversation or access denied' }, { status: 403 })
    }

    // Verify receiver is the other participant
    const otherParticipant = conversation.participant_ids.find(id => id !== user.id)
    if (otherParticipant !== receiverId) {
      return NextResponse.json({ error: 'Invalid receiver for this conversation' }, { status: 400 })
    }

    // Create message (trigger functions will handle validation and moderation)
    const { data: message, error } = await supabase
      .from('conversation_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        receiver_id: receiverId,
        content,
        message_type: messageType
      })
      .select(`
        *,
        sender:profiles!sender_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        ),
        receiver:profiles!receiver_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `)
      .single()

    if (error) {
      logger.error('Message creation failed', error, {
        area: 'messaging',
        action: 'create_message',
        userId: user.id,
        conversationId,
        receiverId,
        messageType
      })
      if (error.message.includes('not authorized to message')) {
        return NextResponse.json({ 
          error: 'You are not authorized to message this user. You must be matched or have attended events together.' 
        }, { status: 403 })
      }
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    // Update conversation last activity
    await supabase
      .from('conversations')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('id', conversationId)

    const response = NextResponse.json(message)
    
    // Add rate limit headers
    rateLimitCheck.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    logger.error('Messages API POST error', error, {
      area: 'messaging',
      action: 'create_message_api'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { conversationId, action } = body

    if (!conversationId || !action) {
      return NextResponse.json({ 
        error: 'Conversation ID and action are required' 
      }, { status: 400 })
    }

    if (action === 'mark_read') {
      // Mark messages as read
      const { error } = await supabase
        .from('conversation_messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .eq('receiver_id', user.id)
        .eq('is_read', false)

      if (error) {
        logger.error('Failed to mark messages as read', error, {
          area: 'messaging',
          action: 'mark_read',
          userId: user.id,
          conversationId
        })
        return NextResponse.json({ error: 'Failed to mark messages as read' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    logger.error('Messages API PATCH error', error, {
      area: 'messaging',
      action: 'patch_message_api'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}