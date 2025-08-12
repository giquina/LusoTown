'use client'

import { supabase, Group } from '@/lib/supabase'
import { getImageWithFallback } from '@/lib/profileImages'
import { RealtimeChannel } from '@supabase/supabase-js'

// Extended ChatRoom interface that combines Supabase Group with additional UI data
export interface ChatRoom extends Omit<Group, 'id' | 'name' | 'description' | 'is_private' | 'max_members' | 'current_member_count' | 'created_by' | 'image_url' | 'is_active' | 'created_at' | 'updated_at' | 'rules' | 'group_type'> {
  id: string
  name: string
  description: string
  type: 'public' | 'private' | 'event-based'
  category: string
  membershipRequired: 'free' | 'core' | 'premium'
  members: ChatMember[]
  moderators: string[] // user IDs
  createdBy: string
  createdAt: string
  isArchived: boolean
  avatar?: string
  coverImage?: string
  rules: string[]
  tags: string[]
  maxMembers: number
  currentMembers: number
  lastMessage?: ChatMessage
  lastActivity: string
  isJoined?: boolean
  notifications: boolean
  pinned: boolean
}

export interface ChatMember {
  id: string
  userId: string
  name: string
  avatar?: string
  membershipTier: 'free' | 'core' | 'premium'
  role: 'member' | 'moderator' | 'admin'
  joinedAt: string
  lastSeen: string
  isOnline: boolean
  isMuted: boolean
  permissions: {
    canPost: boolean
    canReact: boolean
    canShareMedia: boolean
  }
}

export interface ChatMessage {
  id: string
  roomId: string
  userId: string
  userName: string
  userAvatar?: string
  membershipTier: 'free' | 'core' | 'premium'
  content: string
  type: 'text' | 'image' | 'file' | 'system' | 'event' | 'poll'
  timestamp: string
  edited?: boolean
  editedAt?: string
  reactions: MessageReaction[]
  replyTo?: string // message ID
  mentions: string[] // user IDs
  attachments: MessageAttachment[]
  isDeleted: boolean
  deletedAt?: string
  isPinned: boolean
  pinnedBy?: string
  pinnedAt?: string
}

export interface MessageReaction {
  id: string
  messageId: string
  userId: string
  userName: string
  emoji: string
  timestamp: string
}

export interface MessageAttachment {
  id: string
  type: 'image' | 'file' | 'link'
  url: string
  filename: string
  size?: number
  preview?: string
  metadata?: Record<string, any>
}

export interface ChatNotification {
  id: string
  userId: string
  roomId: string
  messageId: string
  type: 'mention' | 'reply' | 'new_message' | 'room_invite'
  title: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface PollMessage {
  id: string
  question: string
  options: PollOption[]
  allowMultiple: boolean
  isAnonymous: boolean
  endsAt?: string
  totalVotes: number
}

export interface PollOption {
  id: string
  text: string
  votes: PollVote[]
  count: number
}

export interface PollVote {
  userId: string
  userName: string
  timestamp: string
}

// Real-time typing indicator
export interface TypingIndicator {
  groupId: string
  userId: string
  userName: string
  isTyping: boolean
  lastTypedAt: string
}

// User presence status
export interface UserPresence {
  userId: string
  isOnline: boolean
  status: 'online' | 'away' | 'busy' | 'offline'
  lastSeen: string
}

// Chat room categories and types
export const CHAT_CATEGORIES = {
  'General': {
    icon: '💬',
    description: 'General discussions and casual chat',
    rooms: ['Welcome Lounge', 'Random Chat', 'Daily Check-in']
  },
  'Events & Meetups': {
    icon: '📅',
    description: 'Discuss upcoming events and plan meetups',
    rooms: ['Event Planning', 'Post-Event Chat', 'Weekend Plans']
  },
  'Interests & Hobbies': {
    icon: '🎨',
    description: 'Chat about your favorite activities',
    rooms: ['Books & Literature', 'Food & Wine', 'Fitness & Wellness', 'Arts & Crafts']
  },
  'Professional': {
    icon: '💼',
    description: 'Career, networking, and professional development',
    rooms: ['Career Chat', 'Networking', 'Freelancer Corner']
  },
  'Location-Based': {
    icon: '📍',
    description: 'Chat with women in your area',
    rooms: ['Central London', 'North London', 'South London', 'West London', 'East London']
  },
  'Support & Wellness': {
    icon: '🤗',
    description: 'Supportive discussions and wellness topics',
    rooms: ['Mental Health Support', 'Life Transitions', 'Self-Care Sunday']
  },
  'Premium': {
    icon: '👑',
    description: 'Exclusive rooms for premium members',
    rooms: ['VIP Lounge', 'Premium Events', 'Exclusive Opportunities']
  }
} as const

// Keep mock data for fallback but use real data when possible
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'room-1',
    name: 'Welcome Lounge',
    description: 'A warm welcome space for new members to introduce themselves and ask questions',
    type: 'public',
    category: 'General',
    membershipRequired: 'free',
    members: [],
    moderators: ['mod-1', 'mod-2'],
    createdBy: 'admin-1',
    createdAt: '2024-01-01T10:00:00Z',
    isArchived: false,
    avatar: getImageWithFallback('forum-user-1'),
    rules: [
      'Be kind and welcoming to new members',
      'Keep introductions positive and friendly',
      'No spam or promotional content',
      'Ask questions - we\'re here to help!'
    ],
    tags: ['welcome', 'introductions', 'newbies', 'friendly'],
    maxMembers: 500,
    currentMembers: 234,
    lastActivity: '2024-01-26T15:30:00Z',
    isJoined: true,
    notifications: true,
    pinned: true
  }
]

// Mock messages data (simplified)
export const mockMessages: { [roomId: string]: ChatMessage[] } = {}

// Messaging Service
export class MessagingService {
  private static instance: MessagingService
  private notifications: ChatNotification[] = []
  private realtimeChannels: Map<string, RealtimeChannel> = new Map()
  private messageSubscriptions: Map<string, (messages: ChatMessage[]) => void> = new Map()
  private typingSubscriptions: Map<string, (indicators: TypingIndicator[]) => void> = new Map()
  private presenceSubscriptions: Map<string, (presence: UserPresence[]) => void> = new Map()

  static getInstance(): MessagingService {
    if (!MessagingService.instance) {
      MessagingService.instance = new MessagingService()
    }
    return MessagingService.instance
  }

  // Transform Supabase group to ChatRoom format
  private transformGroupToChatRoom(group: Group, userMembership?: any): ChatRoom {
    return {
      id: group.id,
      name: group.name,
      description: group.description || '',
      type: group.is_private ? 'private' : 'public',
      category: group.category || 'General',
      membershipRequired: 'free', // Default, could be enhanced with group-specific requirements
      members: [],
      moderators: [],
      createdBy: group.created_by,
      createdAt: group.created_at,
      isArchived: !group.is_active,
      avatar: group.image_url,
      coverImage: group.image_url,
      rules: group.rules ? [group.rules] : [],
      tags: [], // Could be enhanced with group tags
      maxMembers: group.max_members || 500,
      currentMembers: group.current_member_count,
      lastActivity: group.updated_at,
      isJoined: !!userMembership,
      notifications: userMembership?.notifications || false,
      pinned: false // Could be enhanced with user-specific pinning
    }
  }

  // Room management
  async getChatRooms(userId?: string, membershipTier?: 'free' | 'core' | 'premium'): Promise<ChatRoom[]> {
    try {
      let query = supabase
        .from('groups')
        .select(`
          *,
          group_members!inner(
            user_id,
            role
          )
        `)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })

      // If userId is provided, get user's membership info
      let userMemberships: any[] = []
      if (userId) {
        const { data: memberships } = await supabase
          .from('group_members')
          .select('group_id, role, is_active')
          .eq('user_id', userId)
          .eq('is_active', true)
        
        userMemberships = memberships || []
      }

      const { data: groups, error } = await query

      if (error) {
        console.error('Error fetching chat rooms:', error)
        return []
      }

      // Transform groups to chat rooms
      const chatRooms = (groups || []).map(group => {
        const userMembership = userMemberships.find(m => m.group_id === group.id)
        return this.transformGroupToChatRoom(group, userMembership)
      })

      // Sort by membership status, then by activity
      return chatRooms.sort((a, b) => {
        // Joined rooms first
        if (a.isJoined && !b.isJoined) return -1
        if (!a.isJoined && b.isJoined) return 1
        
        // Then by last activity
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      })
    } catch (error) {
      console.error('Error in getChatRooms:', error)
      return []
    }
  }

  async getRoomById(roomId: string, userId?: string): Promise<ChatRoom | null> {
    try {
      const { data: group, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_members(
            user_id,
            role,
            is_active,
            profiles(
              first_name,
              last_name,
              profile_picture_url,
              membership_tier
            )
          )
        `)
        .eq('id', roomId)
        .single()

      if (error || !group) {
        console.error('Error fetching room:', error)
        return null
      }

      // Get user membership if userId provided
      let userMembership = null
      if (userId) {
        userMembership = group.group_members.find((m: any) => m.user_id === userId && m.is_active)
      }

      const chatRoom = this.transformGroupToChatRoom(group, userMembership)
      
      // Add member information
      if (group.group_members) {
        chatRoom.members = group.group_members
          .filter((m: any) => m.is_active)
          .map((member: any) => ({
            id: `member-${member.user_id}`,
            userId: member.user_id,
            name: `${member.profiles.first_name} ${member.profiles.last_name || ''}`.trim(),
            avatar: member.profiles.profile_picture_url,
            membershipTier: member.profiles.membership_tier,
            role: member.role,
            joinedAt: member.joined_at || group.created_at,
            lastSeen: new Date().toISOString(),
            isOnline: false, // Would need real-time presence
            isMuted: false,
            permissions: {
              canPost: true,
              canReact: true,
              canShareMedia: member.role !== 'member' || true
            }
          }))
        
        // Extract moderators
        chatRoom.moderators = group.group_members
          .filter((m: any) => m.role === 'moderator' || m.role === 'admin')
          .map((m: any) => m.user_id)
      }

      return chatRoom
    } catch (error) {
      console.error('Error in getRoomById:', error)
      return null
    }
  }

  async joinRoom(roomId: string, userId: string, userData: any): Promise<{ success: boolean; message: string }> {
    try {
      // Check if room exists and get current member count
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('max_members, current_member_count, is_active')
        .eq('id', roomId)
        .single()

      if (groupError || !group) {
        return { success: false, message: 'Room not found' }
      }

      if (!group.is_active) {
        return { success: false, message: 'This room is no longer active' }
      }

      // Check if already a member
      const { data: existingMember } = await supabase
        .from('group_members')
        .select('is_active')
        .eq('group_id', roomId)
        .eq('user_id', userId)
        .single()

      if (existingMember?.is_active) {
        return { success: false, message: 'Already a member of this room' }
      }

      // Check capacity
      if (group.max_members && group.current_member_count >= group.max_members) {
        return { success: false, message: 'Room is at capacity' }
      }

      // Add or reactivate membership
      const { error: memberError } = await supabase
        .from('group_members')
        .upsert({
          group_id: roomId,
          user_id: userId,
          role: 'member',
          is_active: true,
          joined_at: new Date().toISOString()
        }, {
          onConflict: 'group_id,user_id'
        })

      if (memberError) {
        console.error('Error joining room:', memberError)
        return { success: false, message: 'Failed to join room' }
      }

      // Update group member count
      await supabase
        .from('groups')
        .update({ 
          current_member_count: group.current_member_count + (existingMember ? 0 : 1),
          updated_at: new Date().toISOString()
        })
        .eq('id', roomId)

      return { success: true, message: 'Successfully joined the room' }
    } catch (error) {
      console.error('Error in joinRoom:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }

  async leaveRoom(roomId: string, userId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if user is a member
      const { data: member, error: memberError } = await supabase
        .from('group_members')
        .select('is_active')
        .eq('group_id', roomId)
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()

      if (memberError || !member) {
        return { success: false, message: 'Not a member of this room' }
      }

      // Deactivate membership
      const { error: updateError } = await supabase
        .from('group_members')
        .update({ is_active: false })
        .eq('group_id', roomId)
        .eq('user_id', userId)

      if (updateError) {
        console.error('Error leaving room:', updateError)
        return { success: false, message: 'Failed to leave room' }
      }

      // Update group member count
      const { data: group } = await supabase
        .from('groups')
        .select('current_member_count')
        .eq('id', roomId)
        .single()

      if (group && group.current_member_count > 0) {
        await supabase
          .from('groups')
          .update({ 
            current_member_count: group.current_member_count - 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', roomId)
      }

      return { success: true, message: 'Successfully left the room' }
    } catch (error) {
      console.error('Error in leaveRoom:', error)
      return { success: false, message: 'An unexpected error occurred' }
    }
  }

  // Real-time message management
  async getMessages(roomId: string, limit: number = 50, before?: string): Promise<ChatMessage[]> {
    try {
      let query = supabase
        .from('messages')
        .select(`
          *,
          profiles!messages_user_id_fkey(
            first_name,
            last_name,
            profile_picture_url,
            membership_tier
          ),
          message_reactions(
            id,
            user_id,
            emoji,
            created_at,
            profiles!message_reactions_user_id_fkey(
              first_name,
              last_name
            )
          )
        `)
        .eq('group_id', roomId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (before) {
        query = query.lt('created_at', before)
      }

      const { data: messages, error } = await query

      if (error) {
        console.error('Error fetching messages:', error)
        return []
      }

      // Transform to ChatMessage format
      const chatMessages: ChatMessage[] = (messages || []).map(msg => ({
        id: msg.id,
        roomId: msg.group_id,
        userId: msg.user_id,
        userName: `${msg.profiles.first_name} ${msg.profiles.last_name || ''}`.trim(),
        userAvatar: msg.profiles.profile_picture_url,
        membershipTier: msg.profiles.membership_tier,
        content: msg.content,
        type: msg.message_type,
        timestamp: msg.created_at,
        edited: msg.is_edited,
        editedAt: msg.edited_at,
        reactions: (msg.message_reactions || []).map((reaction: any) => ({
          id: reaction.id,
          messageId: msg.id,
          userId: reaction.user_id,
          userName: `${reaction.profiles.first_name} ${reaction.profiles.last_name || ''}`.trim(),
          emoji: reaction.emoji,
          timestamp: reaction.created_at
        })),
        replyTo: msg.reply_to,
        mentions: msg.mentions || [],
        attachments: msg.attachments || [],
        isDeleted: msg.is_deleted,
        deletedAt: msg.deleted_at,
        isPinned: msg.is_pinned,
        pinnedBy: msg.pinned_by,
        pinnedAt: msg.pinned_at
      }))

      // Return in chronological order (oldest first)
      return chatMessages.reverse()
    } catch (error) {
      console.error('Error fetching messages:', error)
      return []
    }
  }

  async sendMessage(
    roomId: string, 
    userId: string, 
    content: string, 
    userData: any,
    replyTo?: string,
    attachments?: MessageAttachment[]
  ): Promise<{ success: boolean; message?: ChatMessage; error?: string }> {
    try {
      // Check if user is a member of the room
      const { data: member } = await supabase
        .from('group_members')
        .select('role, is_active')
        .eq('group_id', roomId)
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()

      if (!member) {
        return { success: false, error: 'Not authorized to post in this room' }
      }

      // Extract mentions from content
      const mentions = this.extractMentions(content)

      // Insert message into database
      const { data: message, error } = await supabase
        .from('messages')
        .insert({
          group_id: roomId,
          user_id: userId,
          content: content.trim(),
          message_type: 'text',
          reply_to: replyTo,
          mentions,
          attachments: attachments || []
        })
        .select(`
          *,
          profiles!messages_user_id_fkey(
            first_name,
            last_name,
            profile_picture_url,
            membership_tier
          )
        `)
        .single()

      if (error) {
        console.error('Error inserting message:', error)
        return { success: false, error: 'Failed to send message' }
      }

      // Update room's last activity
      await supabase
        .from('groups')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', roomId)

      // Transform to ChatMessage format
      const chatMessage: ChatMessage = {
        id: message.id,
        roomId: message.group_id,
        userId: message.user_id,
        userName: `${message.profiles.first_name} ${message.profiles.last_name || ''}`.trim(),
        userAvatar: message.profiles.profile_picture_url,
        membershipTier: message.profiles.membership_tier,
        content: message.content,
        type: message.message_type,
        timestamp: message.created_at,
        edited: message.is_edited,
        editedAt: message.edited_at,
        reactions: [],
        replyTo: message.reply_to,
        mentions: message.mentions || [],
        attachments: message.attachments || [],
        isDeleted: message.is_deleted,
        deletedAt: message.deleted_at,
        isPinned: message.is_pinned,
        pinnedBy: message.pinned_by,
        pinnedAt: message.pinned_at
      }

      return { success: true, message: chatMessage }
    } catch (error) {
      console.error('Error sending message:', error)
      return { success: false, error: 'Failed to send message' }
    }
  }

  async addReaction(messageId: string, userId: string, emoji: string, userName: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('message_reactions')
        .upsert({
          message_id: messageId,
          user_id: userId,
          emoji
        }, {
          onConflict: 'message_id,user_id,emoji'
        })

      if (error) {
        console.error('Error adding reaction:', error)
        return { success: false, message: 'Failed to add reaction' }
      }

      return { success: true, message: 'Reaction added' }
    } catch (error) {
      console.error('Error adding reaction:', error)
      return { success: false, message: 'Failed to add reaction' }
    }
  }

  async removeReaction(messageId: string, userId: string, emoji: string): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('message_reactions')
        .delete()
        .eq('message_id', messageId)
        .eq('user_id', userId)
        .eq('emoji', emoji)

      if (error) {
        console.error('Error removing reaction:', error)
        return { success: false, message: 'Failed to remove reaction' }
      }

      return { success: true, message: 'Reaction removed' }
    } catch (error) {
      console.error('Error removing reaction:', error)
      return { success: false, message: 'Failed to remove reaction' }
    }
  }

  private extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g
    const mentions: string[] = []
    let match

    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1])
    }

    return mentions
  }

  async getUserNotifications(userId: string): Promise<ChatNotification[]> {
    // In a real implementation, you'd have a notifications table
    return this.notifications.filter(n => n.userId === userId && !n.isRead)
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  }
  
  // Create a new group/chat room
  async createRoom(roomData: {
    name: string
    description?: string
    isPrivate?: boolean
    category?: string
    maxMembers?: number
  }, creatorId: string): Promise<{ success: boolean; room?: ChatRoom; error?: string }> {
    try {
      const { data: group, error } = await supabase
        .from('groups')
        .insert({
          name: roomData.name,
          description: roomData.description || '',
          group_type: 'interest',
          category: roomData.category || 'General',
          is_private: roomData.isPrivate || false,
          max_members: roomData.maxMembers || 500,
          created_by: creatorId,
          current_member_count: 1
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating room:', error)
        return { success: false, error: 'Failed to create room' }
      }

      // Add creator as admin
      await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: creatorId,
          role: 'admin',
          is_active: true,
          joined_at: new Date().toISOString()
        })

      const chatRoom = this.transformGroupToChatRoom(group, { role: 'admin' })
      return { success: true, room: chatRoom }
    } catch (error) {
      console.error('Error in createRoom:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  // Real-time functionality
  subscribeToMessages(roomId: string, callback: (messages: ChatMessage[]) => void): () => void {
    const channelName = `room:${roomId}:messages`
    
    // Store callback for this room
    this.messageSubscriptions.set(roomId, callback)
    
    if (this.realtimeChannels.has(channelName)) {
      // Channel already exists, just update callback
      return () => this.unsubscribeFromMessages(roomId)
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `group_id=eq.${roomId}`
        },
        async (payload) => {
          // Refetch messages when changes occur
          const messages = await this.getMessages(roomId)
          callback(messages)
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'message_reactions',
        },
        async (payload) => {
          // Refetch messages when reactions change
          const messages = await this.getMessages(roomId)
          callback(messages)
        }
      )
      .subscribe()

    this.realtimeChannels.set(channelName, channel)

    return () => this.unsubscribeFromMessages(roomId)
  }

  unsubscribeFromMessages(roomId: string): void {
    const channelName = `room:${roomId}:messages`
    const channel = this.realtimeChannels.get(channelName)
    
    if (channel) {
      supabase.removeChannel(channel)
      this.realtimeChannels.delete(channelName)
    }
    
    this.messageSubscriptions.delete(roomId)
  }

  // Typing indicators
  async updateTypingIndicator(roomId: string, userId: string, isTyping: boolean): Promise<void> {
    try {
      await supabase
        .from('typing_indicators')
        .upsert({
          group_id: roomId,
          user_id: userId,
          is_typing: isTyping,
          last_typed_at: new Date().toISOString()
        }, {
          onConflict: 'group_id,user_id'
        })
    } catch (error) {
      console.error('Error updating typing indicator:', error)
    }
  }

  subscribeToTypingIndicators(roomId: string, callback: (indicators: TypingIndicator[]) => void): () => void {
    const channelName = `room:${roomId}:typing`
    
    this.typingSubscriptions.set(roomId, callback)
    
    if (this.realtimeChannels.has(channelName)) {
      return () => this.unsubscribeFromTypingIndicators(roomId)
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'typing_indicators',
          filter: `group_id=eq.${roomId}`
        },
        async (payload) => {
          await this.fetchTypingIndicators(roomId, callback)
        }
      )
      .subscribe()

    this.realtimeChannels.set(channelName, channel)

    // Initial fetch
    this.fetchTypingIndicators(roomId, callback)

    return () => this.unsubscribeFromTypingIndicators(roomId)
  }

  private async fetchTypingIndicators(roomId: string, callback: (indicators: TypingIndicator[]) => void): Promise<void> {
    try {
      const { data: indicators } = await supabase
        .from('typing_indicators')
        .select(`
          *,
          profiles!typing_indicators_user_id_fkey(
            first_name,
            last_name
          )
        `)
        .eq('group_id', roomId)
        .eq('is_typing', true)
        .gte('last_typed_at', new Date(Date.now() - 30000).toISOString()) // Last 30 seconds

      const typingIndicators: TypingIndicator[] = (indicators || []).map(indicator => ({
        groupId: indicator.group_id,
        userId: indicator.user_id,
        userName: `${indicator.profiles.first_name} ${indicator.profiles.last_name || ''}`.trim(),
        isTyping: indicator.is_typing,
        lastTypedAt: indicator.last_typed_at
      }))

      callback(typingIndicators)
    } catch (error) {
      console.error('Error fetching typing indicators:', error)
    }
  }

  unsubscribeFromTypingIndicators(roomId: string): void {
    const channelName = `room:${roomId}:typing`
    const channel = this.realtimeChannels.get(channelName)
    
    if (channel) {
      supabase.removeChannel(channel)
      this.realtimeChannels.delete(channelName)
    }
    
    this.typingSubscriptions.delete(roomId)
  }

  // User presence
  async updateUserPresence(userId: string, isOnline: boolean, status: 'online' | 'away' | 'busy' | 'offline' = 'online'): Promise<void> {
    try {
      await supabase.rpc('update_user_presence', {
        user_uuid: userId,
        online_status: isOnline,
        presence_status: status
      })
    } catch (error) {
      console.error('Error updating user presence:', error)
    }
  }

  subscribeToUserPresence(roomId: string, callback: (presence: UserPresence[]) => void): () => void {
    const channelName = `room:${roomId}:presence`
    
    this.presenceSubscriptions.set(roomId, callback)
    
    if (this.realtimeChannels.has(channelName)) {
      return () => this.unsubscribeFromUserPresence(roomId)
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence'
        },
        async (payload) => {
          await this.fetchUserPresence(roomId, callback)
        }
      )
      .subscribe()

    this.realtimeChannels.set(channelName, channel)

    // Initial fetch
    this.fetchUserPresence(roomId, callback)

    return () => this.unsubscribeFromUserPresence(roomId)
  }

  private async fetchUserPresence(roomId: string, callback: (presence: UserPresence[]) => void): Promise<void> {
    try {
      // Get presence for room members only
      // First get the user IDs from group members
      const { data: members } = await supabase
        .from('group_members')
        .select('user_id')
        .eq('group_id', roomId)
        .eq('is_active', true)

      const userIds = members?.map(m => m.user_id) || []

      // Then get presence for those users
      const { data: presence } = await supabase
        .from('user_presence')
        .select('*')
        .in('user_id', userIds)

      const userPresence: UserPresence[] = (presence || []).map(p => ({
        userId: p.user_id,
        isOnline: p.is_online,
        status: p.status,
        lastSeen: p.last_seen
      }))

      callback(userPresence)
    } catch (error) {
      console.error('Error fetching user presence:', error)
    }
  }

  unsubscribeFromUserPresence(roomId: string): void {
    const channelName = `room:${roomId}:presence`
    const channel = this.realtimeChannels.get(channelName)
    
    if (channel) {
      supabase.removeChannel(channel)
      this.realtimeChannels.delete(channelName)
    }
    
    this.presenceSubscriptions.delete(roomId)
  }

  // Cleanup all subscriptions
  unsubscribeAll(): void {
    this.realtimeChannels.forEach((channel) => {
      supabase.removeChannel(channel)
    })
    this.realtimeChannels.clear()
    this.messageSubscriptions.clear()
    this.typingSubscriptions.clear()
    this.presenceSubscriptions.clear()
  }

  // Edit message
  async editMessage(messageId: string, content: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({
          content: content.trim(),
          is_edited: true,
          edited_at: new Date().toISOString(),
          mentions: this.extractMentions(content)
        })
        .eq('id', messageId)
        .eq('user_id', userId)

      if (error) {
        console.error('Error editing message:', error)
        return { success: false, error: 'Failed to edit message' }
      }

      return { success: true }
    } catch (error) {
      console.error('Error editing message:', error)
      return { success: false, error: 'Failed to edit message' }
    }
  }

  // Delete message
  async deleteMessage(messageId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({
          is_deleted: true,
          deleted_at: new Date().toISOString(),
          content: '[Message deleted]'
        })
        .eq('id', messageId)
        .eq('user_id', userId)

      if (error) {
        console.error('Error deleting message:', error)
        return { success: false, error: 'Failed to delete message' }
      }

      return { success: true }
    } catch (error) {
      console.error('Error deleting message:', error)
      return { success: false, error: 'Failed to delete message' }
    }
  }
}

export const messagingService = MessagingService.getInstance()