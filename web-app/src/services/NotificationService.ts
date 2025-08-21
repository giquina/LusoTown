import { supabase } from '@/lib/supabase'

export interface UserNotification {
  id: string
  user_id: string
  notification_type: 'match' | 'message' | 'event' | 'connection' | 'system' | 'cultural' | 'business'
  title: string
  message: string
  action_url?: string
  action_data?: Record<string, any>
  priority: 'low' | 'normal' | 'high' | 'urgent'
  is_read: boolean
  is_pushed: boolean
  is_emailed: boolean
  expires_at?: string
  created_at: string
  // AI Enhancement fields
  ai_generated?: boolean
  engagement_score?: number
  optimal_send_time?: string
  cultural_context?: CulturalContext
  personalization_tags?: string[]
  ab_test_variant?: string
}

export interface CulturalContext {
  portuguese_region?: 'norte' | 'centro' | 'lisboa' | 'alentejo' | 'algarve' | 'acores' | 'madeira' | 'brasil' | 'angola' | 'mozambique' | 'cabo_verde'
  cultural_significance?: string
  diaspora_relevance?: 'first_generation' | 'second_generation' | 'recent_immigrant' | 'heritage_connection'
  language_preference?: 'pt' | 'en' | 'mixed'
  cultural_interests?: string[]
}

export interface UserBehaviorProfile {
  user_id: string
  engagement_patterns: {
    peak_activity_hours: number[]
    preferred_days: string[]
    avg_response_time_minutes: number
    click_through_rate: number
    notification_open_rate: number
  }
  cultural_preferences: CulturalContext
  content_affinity: {
    event_types: string[]
    business_categories: string[]
    communication_style: 'formal' | 'casual' | 'friendly'
  }
  ai_insights: {
    engagement_likelihood: number
    optimal_send_times: string[]
    content_preferences: string[]
    churn_risk: number
  }
}

export interface NotificationPreferences {
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  sms_notifications: boolean
  notification_types: {
    matches: boolean
    messages: boolean
    events: boolean
    connections: boolean
    system: boolean
    cultural: boolean
    business: boolean
  }
  quiet_hours: {
    enabled: boolean
    start_time: string // e.g., '22:00'
    end_time: string   // e.g., '08:00'
  }
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}

export interface NotificationStats {
  total_notifications: number
  unread_notifications: number
  notifications_by_type: Record<string, number>
  recent_activity: Array<{
    date: string
    count: number
  }>
}

class NotificationService {
  private supabaseClient = supabase
  private realtimeSubscription: any = null

  /**
   * Get user notifications with pagination
   */
  async getUserNotifications(filters?: {
    notification_type?: string
    is_read?: boolean
    priority?: string
    limit?: number
    offset?: number
  }): Promise<UserNotification[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    let query = this.supabaseClient
      .from('user_notifications')
      .select('*')
      .eq('user_id', user.user.id)

    // Apply filters
    if (filters?.notification_type) {
      query = query.eq('notification_type', filters.notification_type)
    }

    if (filters?.is_read !== undefined) {
      query = query.eq('is_read', filters.is_read)
    }

    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }

    // Filter out expired notifications
    query = query.or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    query = query
      .order('created_at', { ascending: false })
      .limit(filters?.limit || 50)

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(): Promise<number> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { count, error } = await this.supabaseClient
      .from('user_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.user.id)
      .eq('is_read', false)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error) throw error
    return count || 0
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('user_notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.user.id)

    if (error) throw error
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('user_notifications')
      .update({ is_read: true })
      .eq('user_id', user.user.id)
      .eq('is_read', false)

    if (error) throw error
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('user_notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.user.id)

    if (error) throw error
  }

  /**
   * Delete all read notifications
   */
  async deleteReadNotifications(): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('user_notifications')
      .delete()
      .eq('user_id', user.user.id)
      .eq('is_read', true)

    if (error) throw error
  }

  /**
   * Create a new notification (system use)
   */
  async createNotification(notification: {
    user_id: string
    notification_type: UserNotification['notification_type']
    title: string
    message: string
    action_url?: string
    action_data?: Record<string, any>
    priority?: UserNotification['priority']
    expires_at?: string
  }): Promise<UserNotification> {
    const { data, error } = await this.supabaseClient
      .from('user_notifications')
      .insert({
        ...notification,
        priority: notification.priority || 'normal'
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Send Portuguese community welcome notification
   */
  async sendWelcomeNotification(userId: string): Promise<void> {
    await this.createNotification({
      user_id: userId,
      notification_type: 'system',
      title: 'Bem-vindo à LusoTown! 🇵🇹',
      message: 'Welcome to London\'s Portuguese community! Complete your cultural preferences to get personalized event recommendations and connect with fellow Portuguese speakers.',
      action_url: '/profile/cultural-preferences',
      action_data: {
        type: 'cultural_onboarding',
        step: 'preferences'
      },
      priority: 'high',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    })
  }

  /**
   * Send cultural event notification
   */
  async sendCulturalEventNotification(userId: string, eventData: {
    event_id: string
    event_title: string
    event_date: string
    cultural_significance?: string
  }): Promise<void> {
    await this.createNotification({
      user_id: userId,
      notification_type: 'cultural',
      title: `🎉 ${eventData.event_title}`,
      message: `A Portuguese cultural event is coming up on ${new Date(eventData.event_date).toLocaleDateString()}. ${eventData.cultural_significance || 'Join fellow Portuguese speakers for this special celebration!'}`,
      action_url: `/events/${eventData.event_id}`,
      action_data: {
        type: 'cultural_event',
        event_id: eventData.event_id,
        cultural_celebration: true
      },
      priority: 'normal'
    })
  }

  /**
   * Send match notification
   */
  async sendMatchNotification(userId: string, matchData: {
    match_id: string
    matched_user_name: string
    compatibility_score: number
    shared_interests: string[]
  }): Promise<void> {
    const sharedInterestsText = matchData.shared_interests.length > 0 
      ? ` You both enjoy ${matchData.shared_interests.slice(0, 2).join(' and ')}.`
      : ''

    await this.createNotification({
      user_id: userId,
      notification_type: 'match',
      title: `Nova conexão! 💫`,
      message: `You have a ${matchData.compatibility_score}% compatibility with ${matchData.matched_user_name} from the Portuguese community.${sharedInterestsText}`,
      action_url: `/matches/${matchData.match_id}`,
      action_data: {
        type: 'new_match',
        match_id: matchData.match_id,
        compatibility_score: matchData.compatibility_score
      },
      priority: 'normal'
    })
  }

  /**
   * Send business feature notification
   */
  async sendBusinessNotification(userId: string, businessData: {
    business_id: string
    business_name: string
    business_type: string
    neighborhood?: string
    special_offer?: string
  }): Promise<void> {
    const message = businessData.special_offer
      ? `${businessData.business_name} in ${businessData.neighborhood} has a special offer: ${businessData.special_offer}`
      : `New Portuguese ${businessData.business_type} ${businessData.business_name} is now featured in ${businessData.neighborhood}.`

    await this.createNotification({
      user_id: userId,
      notification_type: 'business',
      title: `🏪 Nova empresa portuguesa!`,
      message,
      action_url: `/businesses/${businessData.business_id}`,
      action_data: {
        type: 'business_feature',
        business_id: businessData.business_id,
        has_special_offer: !!businessData.special_offer
      },
      priority: 'low'
    })
  }

  /**
   * Get notification statistics
   */
  async getNotificationStats(): Promise<NotificationStats> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const [
      { count: totalCount },
      { count: unreadCount },
      { data: allNotifications }
    ] = await Promise.all([
      this.supabaseClient
        .from('user_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.user.id),
      
      this.supabaseClient
        .from('user_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('is_read', false),
      
      this.supabaseClient
        .from('user_notifications')
        .select('notification_type, created_at')
        .eq('user_id', user.user.id)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
        .order('created_at', { ascending: false })
    ])

    // Count by type
    const notificationsByType: Record<string, number> = {}
    allNotifications?.forEach(notification => {
      notificationsByType[notification.notification_type] = 
        (notificationsByType[notification.notification_type] || 0) + 1
    })

    // Count by day for recent activity
    const dailyActivity: Record<string, number> = {}
    allNotifications?.forEach(notification => {
      const date = notification.created_at.split('T')[0]
      dailyActivity[date] = (dailyActivity[date] || 0) + 1
    })

    const recentActivity = Object.entries(dailyActivity)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 7)

    return {
      total_notifications: totalCount || 0,
      unread_notifications: unreadCount || 0,
      notifications_by_type: notificationsByType,
      recent_activity: recentActivity
    }
  }

  /**
   * Subscribe to real-time notifications
   */
  subscribeToNotifications(
    onNewNotification: (notification: UserNotification) => void,
    onNotificationUpdate: (notification: UserNotification) => void
  ): () => void {
    const userPromise = this.supabaseClient.auth.getUser()
    
    userPromise.then(({ data: userData }) => {
      if (!userData.user) return

      this.realtimeSubscription = this.supabaseClient
        .channel('user_notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'user_notifications',
            filter: `user_id=eq.${userData.user.id}`
          },
          (payload) => {
            onNewNotification(payload.new as UserNotification)
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'user_notifications',
            filter: `user_id=eq.${userData.user.id}`
          },
          (payload) => {
            onNotificationUpdate(payload.new as UserNotification)
          }
        )
        .subscribe()
    })
    
    return () => {
      if (this.realtimeSubscription) {
        this.supabaseClient.removeChannel(this.realtimeSubscription)
        this.realtimeSubscription = null
      }
    }
  }

  /**
   * Get notification preferences (would be in user preferences table)
   */
  async getNotificationPreferences(): Promise<NotificationPreferences | null> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // This would come from a user_preferences table
    // For now, return default preferences
    return {
      user_id: user.user.id,
      email_notifications: true,
      push_notifications: true,
      sms_notifications: false,
      notification_types: {
        matches: true,
        messages: true,
        events: true,
        connections: true,
        system: true,
        cultural: true,
        business: false
      },
      quiet_hours: {
        enabled: true,
        start_time: '22:00',
        end_time: '08:00'
      },
      frequency: 'immediate'
    }
  }

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // This would update a user_preferences table
    // For now, store in localStorage as fallback
    if (typeof window !== 'undefined') {
      localStorage.setItem(`notification_preferences_${user.user.id}`, JSON.stringify(preferences))
    }
  }

  /**
   * Send bulk notifications to Portuguese community members
   */
  async sendCommunityAnnouncement(announcement: {
    title: string
    message: string
    notification_type: UserNotification['notification_type']
    action_url?: string
    filters?: {
      portuguese_origin?: string
      london_neighborhood?: string
      membership_tier?: string
      cultural_connection_level?: number
    }
  }): Promise<void> {
    // This would typically be an admin function
    let query = this.supabaseClient
      .from('profiles')
      .select('id')
      .eq('is_active', true)

    // Apply filters if provided
    if (announcement.filters?.portuguese_origin) {
      query = query.eq('portuguese_origin', announcement.filters.portuguese_origin)
    }

    if (announcement.filters?.london_neighborhood) {
      query = query.eq('london_neighborhood', announcement.filters.london_neighborhood)
    }

    if (announcement.filters?.membership_tier) {
      query = query.eq('membership_tier', announcement.filters.membership_tier)
    }

    if (announcement.filters?.cultural_connection_level) {
      query = query.gte('cultural_connection_level', announcement.filters.cultural_connection_level)
    }

    const { data: users, error } = await query

    if (error) throw error

    // Create notifications for all matching users
    const notifications = (users || []).map(user => ({
      user_id: user.id,
      notification_type: announcement.notification_type,
      title: announcement.title,
      message: announcement.message,
      action_url: announcement.action_url,
      priority: 'normal' as const
    }))

    if (notifications.length > 0) {
      const { error: insertError } = await this.supabaseClient
        .from('user_notifications')
        .insert(notifications)

      if (insertError) throw insertError
    }
  }

  /**
   * Send AI-powered personalized notification
   */
  async sendAIPersonalizedNotification(
    userId: string,
    templateId: string,
    dynamicData: Record<string, any> = {}
  ): Promise<UserNotification> {
    try {
      const { aiNotificationEngine } = await import('./AINotificationEngine')
      
      // Get user behavior profile (in production, from database)
      const userBehavior = await this.getUserBehaviorProfile(userId)
      if (!userBehavior) {
        throw new Error('User behavior profile not found')
      }

      // Generate AI-personalized notification
      const personalizedNotification = await aiNotificationEngine.generatePersonalizedNotification(
        userId,
        templateId,
        dynamicData,
        userBehavior
      )

      // Save to database
      const { data, error } = await this.supabaseClient
        .from('user_notifications')
        .insert(personalizedNotification)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (error) {
      console.error('[Notification Service] AI personalized notification failed:', error)
      // Fallback to standard notification
      return this.createNotification({
        user_id: userId,
        notification_type: 'cultural',
        title: 'Portuguese Community Update',
        message: 'New updates available for the Portuguese community',
        priority: 'normal'
      })
    }
  }

  /**
   * Send cultural event notification with AI personalization
   */
  async sendAICulturalEventNotification(userId: string, eventData: {
    event_id: string
    event_title: string
    event_date: string
    cultural_significance?: string
    portuguese_region?: string
    event_type?: string
  }): Promise<void> {
    try {
      await this.sendAIPersonalizedNotification(
        userId,
        'cultural_event_fado',
        {
          venue: eventData.event_title,
          time: new Date(eventData.event_date).toLocaleTimeString(),
          cultural_context: eventData.cultural_significance,
          portuguese_region: eventData.portuguese_region
        }
      )
    } catch (error) {
      console.error('[Notification Service] AI cultural event notification failed:', error)
      // Fallback to standard notification
      await this.sendCulturalEventNotification(userId, eventData)
    }
  }

  /**
   * Predict engagement for notification before sending
   */
  async predictNotificationEngagement(
    userId: string,
    templateId: string
  ): Promise<{
    likelihood_score: number
    optimal_send_time: string
    recommendations: string[]
  }> {
    try {
      const { aiNotificationEngine } = await import('./AINotificationEngine')
      const userBehavior = await this.getUserBehaviorProfile(userId)
      
      if (!userBehavior) {
        return {
          likelihood_score: 50,
          optimal_send_time: '19:00',
          recommendations: ['User profile needed for better predictions']
        }
      }

      // Find template (simplified - in production, get from database)
      const templates = (aiNotificationEngine as any).aiTemplates
      const template = templates.find((t: any) => t.id === templateId)
      
      if (!template) {
        return {
          likelihood_score: 30,
          optimal_send_time: '19:00',
          recommendations: ['Template not found']
        }
      }

      const prediction = await aiNotificationEngine.predictEngagement(userId, template, userBehavior)
      
      return {
        likelihood_score: prediction.likelihood_score,
        optimal_send_time: prediction.optimal_send_time,
        recommendations: prediction.reasoning
      }
    } catch (error) {
      console.error('[Notification Service] Engagement prediction failed:', error)
      return {
        likelihood_score: 40,
        optimal_send_time: '19:00',
        recommendations: ['Prediction service unavailable']
      }
    }
  }

  /**
   * Get or create user behavior profile for AI personalization
   */
  private async getUserBehaviorProfile(userId: string): Promise<UserBehaviorProfile | null> {
    try {
      // In production, fetch from database
      const { data, error } = await this.supabaseClient
        .from('user_behavior_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') { // Not found error
        throw error
      }

      if (data) {
        return data
      }

      // Create default profile if not exists
      const defaultProfile: UserBehaviorProfile = {
        user_id: userId,
        engagement_patterns: {
          peak_activity_hours: [18, 19, 20],
          preferred_days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          avg_response_time_minutes: 30,
          click_through_rate: 0.15,
          notification_open_rate: 0.6
        },
        cultural_preferences: {
          portuguese_region: 'lisboa',
          cultural_significance: 'Community connection',
          diaspora_relevance: 'heritage_connection',
          language_preference: 'mixed',
          cultural_interests: ['cultural_events', 'portuguese_cuisine']
        },
        content_affinity: {
          event_types: ['cultural', 'social'],
          business_categories: ['restaurants', 'events'],
          communication_style: 'friendly'
        },
        ai_insights: {
          engagement_likelihood: 0.6,
          optimal_send_times: ['19:00', '20:00'],
          content_preferences: ['cultural_events'],
          churn_risk: 0.2
        }
      }

      // Save default profile
      const { data: newProfile, error: insertError } = await this.supabaseClient
        .from('user_behavior_profiles')
        .insert(defaultProfile)
        .select()
        .single()

      if (insertError) {
        console.warn('[Notification Service] Failed to create behavior profile:', insertError)
        return defaultProfile // Return default even if save fails
      }

      return newProfile
    } catch (error) {
      console.error('[Notification Service] Failed to get user behavior profile:', error)
      return null
    }
  }

  /**
   * Update user behavior profile based on notification interactions
   */
  async updateUserBehaviorFromInteraction(
    userId: string,
    notificationId: string,
    interactionType: 'opened' | 'clicked' | 'dismissed' | 'converted'
  ): Promise<void> {
    try {
      const profile = await this.getUserBehaviorProfile(userId)
      if (!profile) return

      // Update engagement patterns based on interaction
      const now = new Date()
      const currentHour = now.getHours()
      
      switch (interactionType) {
        case 'opened':
          profile.engagement_patterns.notification_open_rate = 
            Math.min(1.0, profile.engagement_patterns.notification_open_rate + 0.01)
          break
        case 'clicked':
          profile.engagement_patterns.click_through_rate = 
            Math.min(1.0, profile.engagement_patterns.click_through_rate + 0.01)
          // Add current hour to peak activity
          if (!profile.engagement_patterns.peak_activity_hours.includes(currentHour)) {
            profile.engagement_patterns.peak_activity_hours.push(currentHour)
            profile.engagement_patterns.peak_activity_hours.sort((a, b) => a - b)
          }
          break
        case 'dismissed':
          profile.engagement_patterns.notification_open_rate = 
            Math.max(0.0, profile.engagement_patterns.notification_open_rate - 0.005)
          break
      }

      // Update AI insights
      profile.ai_insights.engagement_likelihood = 
        (profile.engagement_patterns.notification_open_rate + profile.engagement_patterns.click_through_rate) / 2

      // Save updated profile
      await this.supabaseClient
        .from('user_behavior_profiles')
        .update(profile)
        .eq('user_id', userId)

    } catch (error) {
      console.error('[Notification Service] Failed to update behavior profile:', error)
    }
  }

  /**
   * Get notification performance analytics
   */
  async getAINotificationAnalytics(): Promise<{
    insights: string[]
    optimizations: string[]
    cultural_patterns: Record<string, any>
  }> {
    try {
      const { aiNotificationEngine } = await import('./AINotificationEngine')
      return await aiNotificationEngine.analyzePerformanceAndOptimize()
    } catch (error) {
      console.error('[Notification Service] Analytics failed:', error)
      return {
        insights: ['Analytics unavailable'],
        optimizations: ['Check system health'],
        cultural_patterns: {}
      }
    }
  }
}

export const notificationService = new NotificationService()