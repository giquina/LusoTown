import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's conversations with participant details and last message
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select(`
        *,
        conversation_messages!left (
          id,
          content,
          sender_id,
          created_at,
          is_read,
          approval_status
        )
      `)
      .contains('participant_ids', [user.id])
      .eq('is_active', true)
      .order('last_activity_at', { ascending: false })

    if (error) {
      console.error('Conversations fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
    }

    // Enhance conversations with participant details
    const enhancedConversations = await Promise.all(
      (conversations || []).map(async (conversation) => {
        const otherParticipantId = conversation.participant_ids.find(
          (id: string) => id !== user.id
        )

        const { data: participant } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, profile_picture_url, location, verification_status')
          .eq('id', otherParticipantId)
          .single()

        // Get last message
        const lastMessage = conversation.conversation_messages?.[0] || null

        // Count unread messages
        const unreadCount = conversation.conversation_messages?.filter(
          (msg: any) => 
            !msg.is_read && 
            msg.sender_id !== user.id &&
            (msg.approval_status === 'approved' || msg.approval_status === 'auto_approved')
        ).length || 0

        return {
          ...conversation,
          other_participant: participant,
          last_message: lastMessage,
          unread_count: unreadCount
        }
      })
    )

    return NextResponse.json(enhancedConversations)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { targetUserId, connectionType = 'mutual_match' } = body

    if (!targetUserId) {
      return NextResponse.json({ error: 'Target user ID is required' }, { status: 400 })
    }

    // Check if conversation already exists
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('*')
      .contains('participant_ids', [user.id])
      .contains('participant_ids', [targetUserId])
      .eq('is_active', true)
      .single()

    if (existingConversation) {
      return NextResponse.json(existingConversation)
    }

    // Check messaging permissions first
    const { data: permissionCheck, error: permissionError } = await supabase
      .rpc('can_users_message', {
        user_a: user.id,
        user_b: targetUserId
      })

    if (permissionError || !permissionCheck?.can_message) {
      return NextResponse.json({ 
        error: 'No permission to message this user. You must be matched or have attended the same event.' 
      }, { status: 403 })
    }

    // Create new conversation
    const { data: newConversation, error } = await supabase
      .from('conversations')
      .insert({
        participant_ids: [user.id, targetUserId],
        connection_type: connectionType
      })
      .select()
      .single()

    if (error) {
      console.error('Conversation creation error:', error)
      return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
    }

    return NextResponse.json(newConversation)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}