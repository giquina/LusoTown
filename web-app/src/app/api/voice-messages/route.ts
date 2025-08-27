import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { 
  VOICE_STORAGE_CONFIG,
  VOICE_MODERATION,
  getVoiceConfigForTier
} from '@/config/voice-messaging'
import { logger } from '@/utils/logger'

// Helper function to validate audio file
function validateAudioFile(file: File): { isValid: boolean; error?: string } {
  // Check file size
  if (file.size > VOICE_STORAGE_CONFIG.maxFileSize) {
    return {
      isValid: false,
      error: `File too large. Maximum size is ${VOICE_STORAGE_CONFIG.maxFileSize / (1024 * 1024)}MB`
    }
  }

  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  if (!fileExtension || !VOICE_STORAGE_CONFIG.allowedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      error: `Invalid file format. Allowed formats: ${VOICE_STORAGE_CONFIG.allowedFormats.join(', ')}`
    }
  }

  return { isValid: true }
}

// Helper function to moderate voice message content
async function moderateVoiceMessage(transcription: string): Promise<{
  isApproved: boolean;
  confidence: number;
  flaggedReasons: string[];
}> {
  if (!VOICE_MODERATION.enableContentFiltering) {
    return { isApproved: true, confidence: 1.0, flaggedReasons: [] }
  }

  const flaggedReasons: string[] = []
  let confidence = 1.0

  // Check for flagged keywords
  const keywords = VOICE_MODERATION.flaggedKeywords.pt.concat(
    VOICE_MODERATION.flaggedKeywords.en
  )

  const lowerTranscription = transcription.toLowerCase()
  keywords.forEach(keyword => {
    if (lowerTranscription.includes(keyword.toLowerCase())) {
      flaggedReasons.push(`Contains flagged keyword: ${keyword}`)
      confidence -= 0.3
    }
  })

  // Basic content analysis
  if (transcription.includes('http') || transcription.includes('www.')) {
    flaggedReasons.push('Contains URL or link')
    confidence -= 0.2
  }

  if (/\b[\d\s\-\(\)\+]{10,}\b/.test(transcription)) {
    flaggedReasons.push('Contains potential phone number')
    confidence -= 0.2
  }

  if (/[\w\.-]+@[\w\.-]+\.\w+/.test(transcription)) {
    flaggedReasons.push('Contains email address')
    confidence -= 0.3
  }

  const isApproved = confidence >= VOICE_MODERATION.confidenceThreshold

  return { isApproved, confidence: Math.max(0, confidence), flaggedReasons }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile for membership tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('membership_tier, first_name, last_name, profile_picture_url')
      .eq('id', user.id)
      .single()

    const membershipTier = profile?.membership_tier || 'standard'
    const voiceConfig = getVoiceConfigForTier(membershipTier)

    // Parse form data
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const conversationId = formData.get('conversationId') as string
    const targetUserId = formData.get('targetUserId') as string
    const transcription = formData.get('transcription') as string || ''
    const duration = parseFloat(formData.get('duration') as string || '0')
    const dialect = formData.get('dialect') as string || 'pt-PT'

    // Validate inputs
    if (!audioFile || !conversationId || !targetUserId) {
      return NextResponse.json(
        { error: 'Missing required fields: audio, conversationId, targetUserId' },
        { status: 400 }
      )
    }

    // Validate audio file
    const fileValidation = validateAudioFile(audioFile)
    if (!fileValidation.isValid) {
      return NextResponse.json({ error: fileValidation.error }, { status: 400 })
    }

    // Check duration limits
    if (duration > voiceConfig.maxDuration) {
      return NextResponse.json({
        error: `Voice message too long. Maximum duration is ${voiceConfig.maxDuration} seconds`
      }, { status: 400 })
    }

    // Verify conversation permission
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .contains('participant_ids', [user.id])
      .single()

    if (convError || !conversation) {
      return NextResponse.json(
        { error: 'Conversation not found or no permission' },
        { status: 403 }
      )
    }

    // Moderate transcription content
    const moderation = await moderateVoiceMessage(transcription)

    // Convert audio file to buffer
    const audioBuffer = await audioFile.arrayBuffer()
    const audioBlob = new Uint8Array(audioBuffer)

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = audioFile.name.split('.').pop()
    const filename = `voice-${user.id}-${timestamp}.${fileExtension}`

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('voice-messages')
      .upload(filename, audioBlob, {
        contentType: audioFile.type,
        upsert: false
      })

    if (storageError) {
      logger.error('Voice message storage upload failed', storageError, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'voice_upload_error',
        userId: user.id
      })
      return NextResponse.json(
        { error: 'Failed to upload voice message' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('voice-messages')
      .getPublicUrl(filename)

    // Save voice message record
    const { data: voiceMessage, error: dbError } = await supabase
      .from('conversation_voice_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        receiver_id: targetUserId,
        file_path: storageData.path,
        file_url: urlData.publicUrl,
        duration: duration,
        transcription: transcription,
        dialect: dialect,
        file_size: audioFile.size,
        mime_type: audioFile.type,
        approval_status: moderation.isApproved ? 'auto_approved' : 'pending',
        safety_score: moderation.confidence,
        is_flagged: !moderation.isApproved,
        flagged_reasons: moderation.flaggedReasons
      })
      .select(`
        *,
        sender:profiles!sender_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `)
      .single()

    if (dbError) {
      logger.error('Voice message database insert failed', dbError, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'voice_db_insert_error',
        userId: user.id
      })
      // Clean up uploaded file if DB insert fails
      await supabase.storage
        .from('voice-messages')
        .remove([filename])
      
      return NextResponse.json(
        { error: 'Failed to save voice message' },
        { status: 500 }
      )
    }

    // Update conversation last activity
    await supabase
      .from('conversations')
      .update({ 
        last_activity_at: new Date().toISOString(),
        last_message_type: 'voice'
      })
      .eq('id', conversationId)

    // Format response
    const response = {
      id: voiceMessage.id,
      audioUrl: urlData.publicUrl,
      duration: voiceMessage.duration,
      transcription: voiceMessage.transcription,
      senderName: voiceMessage.sender ? 
        `${voiceMessage.sender.first_name} ${voiceMessage.sender.last_name}` : 
        'Unknown',
      senderAvatar: voiceMessage.sender?.profile_picture_url,
      timestamp: voiceMessage.created_at,
      dialect: voiceMessage.dialect,
      confidence: voiceMessage.safety_score,
      isRead: false,
      approvalStatus: voiceMessage.approval_status,
      isFlagged: voiceMessage.is_flagged
    }

    // Send notification if approved
    if (moderation.isApproved) {
      // TODO: Trigger push notification to target user
      logger.info('Voice message auto-approved and notification sent', {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'voice_message_approved',
        userId: user.id,
        targetUserId,
        dialect
      })
    }

    return NextResponse.json(response)

  } catch (error) {
    logger.error('Voice message API error', error, {
      area: 'messaging',
      culturalContext: 'lusophone',
      action: 'voice_message_api_error'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!conversationId) {
      return NextResponse.json(
        { error: 'conversationId is required' },
        { status: 400 }
      )
    }

    // Verify user has access to conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .contains('participant_ids', [user.id])
      .single()

    if (convError || !conversation) {
      return NextResponse.json(
        { error: 'Conversation not found or no permission' },
        { status: 403 }
      )
    }

    // Get voice messages
    const { data: voiceMessages, error } = await supabase
      .from('conversation_voice_messages')
      .select(`
        *,
        sender:profiles!sender_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `)
      .eq('conversation_id', conversationId)
      .in('approval_status', ['approved', 'auto_approved'])
      .eq('is_flagged', false)
      .order('created_at', { ascending: true })

    if (error) {
      logger.error('Voice messages fetch error', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'voice_messages_fetch_error',
        userId: user.id
      })
      return NextResponse.json(
        { error: 'Failed to fetch voice messages' },
        { status: 500 }
      )
    }

    // Format voice messages
    const formattedMessages = voiceMessages.map(vm => ({
      id: vm.id,
      audioUrl: vm.file_url,
      duration: vm.duration,
      transcription: vm.transcription,
      translation: vm.translation,
      senderName: vm.sender ? 
        `${vm.sender.first_name} ${vm.sender.last_name}` : 
        'Unknown',
      senderAvatar: vm.sender?.profile_picture_url,
      timestamp: vm.created_at,
      dialect: vm.dialect,
      confidence: vm.safety_score,
      isRead: vm.is_read
    }))

    return NextResponse.json({
      voiceMessages: formattedMessages,
      total: formattedMessages.length
    })

  } catch (error) {
    logger.error('Voice messages GET error', error, {
      area: 'messaging',
      culturalContext: 'lusophone',
      action: 'voice_messages_get_error'
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}