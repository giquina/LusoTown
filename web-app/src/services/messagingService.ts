import { supabase } from '@/lib/supabase'

export interface MessagePermissionCheck {
  can_message: boolean
  has_mutual_match: boolean
  has_event_permission: boolean
  shared_events_count: number
  reasons: string[]
}

export interface Match {
  id: string
  user_id: string
  target_user_id: string
  match_type: 'compatibility' | 'professional' | 'cultural' | 'event_based'
  compatibility_score: number
  shared_interests: string[]
  shared_events: string[]
  status: 'pending' | 'liked' | 'passed' | 'blocked'
  is_mutual: boolean
  mutual_matched_at?: string
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  participant_ids: string[]
  connection_type: 'mutual_match' | 'event_based' | 'professional'
  is_active: boolean
  expires_at?: string
  last_activity_at: string
  created_at: string
  updated_at: string
}

export interface ConversationMessage {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  message_type: 'text' | 'image' | 'voice' | 'system'
  approval_status: 'pending' | 'approved' | 'rejected' | 'auto_approved'
  is_read: boolean
  is_blocked: boolean
  blocked_reason?: string
  safety_score: number
  contains_contact_info: boolean
  flagged_content: any
  response_deadline?: string
  created_at: string
  updated_at: string
}

class MessagingService {
  private supabaseClient = supabase

  /**
   * Check if two users can message each other
   */
  async checkMessagePermission(targetUserId: string): Promise<MessagePermissionCheck> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .rpc('can_users_message', {
        user_a: user.user.id,
        user_b: targetUserId
      })

    if (error) throw error

    return data as MessagePermissionCheck
  }

  /**
   * Get user's mutual matches with messaging permissions
   */
  async getMutualMatches(): Promise<Match[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('user_matches')
      .select(`
        *,
        target_user:profiles!target_user_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          membership_tier,
          verification_status
        )
      `)
      .eq('user_id', user.user.id)
      .eq('is_mutual', true)
      .eq('status', 'liked')
      .order('mutual_matched_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Get users from shared events with messaging permissions
   */
  async getEventBasedContacts(): Promise<any[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('messaging_permissions')
      .select(`
        *,
        target_user:profiles!target_user_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          membership_tier,
          verification_status
        ),
        event:events!source_id(
          id,
          title,
          start_datetime,
          location
        )
      `)
      .eq('user_id', user.user.id)
      .eq('permission_type', 'event_based')
      .eq('is_active', true)
      .order('granted_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Create or get existing conversation between two users
   */
  async getOrCreateConversation(targetUserId: string): Promise<Conversation> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Check permission first
    const permission = await this.checkMessagePermission(targetUserId)
    if (!permission.can_message) {
      throw new Error('No permission to message this user. You must be matched or have attended the same event.')
    }

    // Check for existing conversation
    const { data: existingConversation } = await this.supabaseClient
      .from('conversations')
      .select('*')
      .contains('participant_ids', [user.user.id])
      .contains('participant_ids', [targetUserId])
      .eq('is_active', true)
      .single()

    if (existingConversation) {
      return existingConversation
    }

    // Create new conversation
    const connectionType = permission.has_mutual_match ? 'mutual_match' : 
                          permission.has_event_permission ? 'event_based' : 'professional'

    const { data: newConversation, error } = await this.supabaseClient
      .from('conversations')
      .insert({
        participant_ids: [user.user.id, targetUserId],
        connection_type: connectionType
      })
      .select()
      .single()

    if (error) throw error
    return newConversation
  }

  /**
   * Send a message in a conversation
   */
  async sendMessage(
    conversationId: string, 
    receiverId: string, 
    content: string, 
    messageType: 'text' | 'image' | 'voice' = 'text'
  ): Promise<ConversationMessage> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // The trigger function will validate permissions automatically
    const { data, error } = await this.supabaseClient
      .from('conversation_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.user.id,
        receiver_id: receiverId,
        content,
        message_type: messageType
      })
      .select()
      .single()

    if (error) {
      if (error.message.includes('not authorized to message')) {
        throw new Error('You can only message users you are matched with or have attended events together.')
      }
      throw error
    }

    // Update conversation last activity
    await this.supabaseClient
      .from('conversations')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('id', conversationId)

    return data
  }

  /**
   * Get messages for a conversation
   */
  async getConversationMessages(conversationId: string): Promise<ConversationMessage[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
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

    if (error) throw error
    return data || []
  }

  /**
   * Get user's active conversations
   */
  async getUserConversations(): Promise<any[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('conversations')
      .select(`
        *,
        conversation_messages!inner(
          id,
          content,
          sender_id,
          created_at,
          is_read,
          approval_status
        )
      `)
      .contains('participant_ids', [user.user.id])
      .eq('is_active', true)
      .order('last_activity_at', { ascending: false })

    if (error) throw error

    // Get participant details for each conversation
    const conversationsWithParticipants = await Promise.all(
      (data || []).map(async (conversation) => {
        const otherParticipantId = conversation.participant_ids.find(
          (id: string) => id !== user.user.id
        )

        const { data: participant } = await this.supabaseClient
          .from('profiles')
          .select('id, first_name, last_name, profile_picture_url, location')
          .eq('id', otherParticipantId)
          .single()

        return {
          ...conversation,
          other_participant: participant,
          last_message: conversation.conversation_messages?.[0] || null,
          unread_count: conversation.conversation_messages?.filter(
            (msg: any) => !msg.is_read && msg.sender_id !== user.user.id
          ).length || 0
        }
      })
    )

    return conversationsWithParticipants
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(conversationId: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('conversation_messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .eq('receiver_id', user.user.id)
      .eq('is_read', false)

    if (error) throw error
  }

  /**
   * Like a user (for matching)
   */
  async likeUser(targetUserId: string): Promise<Match> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('user_matches')
      .insert({
        user_id: user.user.id,
        target_user_id: targetUserId,
        status: 'liked'
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error('You have already interacted with this user')
      }
      throw error
    }

    return data
  }

  /**
   * Pass on a user (for matching)
   */
  async passUser(targetUserId: string): Promise<Match> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('user_matches')
      .insert({
        user_id: user.user.id,
        target_user_id: targetUserId,
        status: 'passed'
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already interacted with this user')
      }
      throw error
    }

    return data
  }

  /**
   * Report inappropriate message
   */
  async reportMessage(messageId: string, reason: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('conversation_messages')
      .update({ 
        is_blocked: true,
        blocked_reason: `Reported by user: ${reason}`
      })
      .eq('id', messageId)

    if (error) throw error

    // Also add to moderation queue
    const { error: moderationError } = await this.supabaseClient
      .from('moderation_queue')
      .insert({
        message_id: messageId,
        flagged_reasons: [reason],
        priority_level: 'high'
      })

    if (moderationError) throw moderationError
  }

  /**
   * Block a user
   */
  async blockUser(targetUserId: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Update any existing matches to blocked status
    const { error: matchError } = await this.supabaseClient
      .from('user_matches')
      .update({ status: 'blocked' })
      .or(`and(user_id.eq.${user.user.id},target_user_id.eq.${targetUserId}),and(user_id.eq.${targetUserId},target_user_id.eq.${user.user.id})`)

    if (matchError) throw matchError

    // Deactivate messaging permissions
    const { error: permissionError } = await this.supabaseClient
      .from('messaging_permissions')
      .update({ is_active: false })
      .or(`and(user_id.eq.${user.user.id},target_user_id.eq.${targetUserId}),and(user_id.eq.${targetUserId},target_user_id.eq.${user.user.id})`)

    if (permissionError) throw permissionError

    // Deactivate conversations
    const { error: conversationError } = await this.supabaseClient
      .from('conversations')
      .update({ is_active: false })
      .contains('participant_ids', [user.user.id])
      .contains('participant_ids', [targetUserId])

    if (conversationError) throw conversationError
  }
}

export const messagingService = new MessagingService()