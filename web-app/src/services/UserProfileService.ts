import { supabase } from '@/lib/supabase'

export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  date_of_birth: string
  bio?: string
  location?: string
  verification_status: 'pending' | 'verified' | 'rejected'
  verification_selfie_url?: string
  profile_picture_url?: string
  is_active: boolean
  membership_tier: 'free' | 'core' | 'premium'
  stripe_customer_id?: string
  
  // Portuguese cultural data
  portuguese_origin?: string
  portuguese_regions?: string[]
  years_in_uk?: number
  language_proficiency?: {
    portuguese?: number // 1-5 scale
    english?: number // 1-5 scale
  }
  professional_status?: string
  uk_visa_status?: string
  family_in_uk?: boolean
  cultural_connection_level?: number // 1-5 scale
  london_neighborhood?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  
  created_at: string
  updated_at: string
}

export interface UserInterests {
  user_id: string
  interests: Array<{
    id: string
    name: string
    category: string
    description?: string
    icon?: string
  }>
}

export interface CulturalPreferences {
  id: string
  user_id: string
  origins: string[]
  language_preference: 'portuguese_first' | 'bilingual' | 'english_comfortable' | 'learning'
  cultural_celebrations: string[]
  professional_goals: string[]
  cultural_values: Record<string, number>
  lifestyle_preferences: string[]
  compatibility_score: number
  cultural_depth_score: number
  community_engagement_score: number
  completed_at: string
  last_updated: string
  quiz_version: string
}

class UserProfileService {
  private supabaseClient = supabase

  /**
   * Get current user's profile
   */
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  }

  /**
   * Update user profile
   */
  async updateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Remove system-only fields
    const { id, email, created_at, updated_at, ...updateData } = profileData

    const { data, error } = await this.supabaseClient
      .from('profiles')
      .update(updateData)
      .eq('id', user.user.id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Get user's interests
   */
  async getUserInterests(userId?: string): Promise<UserInterests | null> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    const targetUserId = userId || user.user?.id
    if (!targetUserId) throw new Error('User ID required')

    const { data, error } = await this.supabaseClient
      .from('user_interests')
      .select(`
        user_id,
        interest:interests(
          id,
          name,
          category,
          description,
          icon
        )
      `)
      .eq('user_id', targetUserId)

    if (error) throw error

    if (!data || data.length === 0) return null

    return {
      user_id: targetUserId,
      interests: (data || []).map((item: any) => item.interest).filter(Boolean)
    }
  }

  /**
   * Update user interests
   */
  async updateUserInterests(interestIds: string[]): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Delete existing interests
    const { error: deleteError } = await this.supabaseClient
      .from('user_interests')
      .delete()
      .eq('user_id', user.user.id)

    if (deleteError) throw deleteError

    // Insert new interests
    if (interestIds.length > 0) {
      const { error: insertError } = await this.supabaseClient
        .from('user_interests')
        .insert(
          interestIds.map(interestId => ({
            user_id: user.user.id,
            interest_id: interestId
          }))
        )

      if (insertError) throw insertError
    }
  }

  /**
   * Get all available interests for selection
   */
  async getAvailableInterests(): Promise<Array<{
    id: string
    name: string
    category: string
    description?: string
    icon?: string
  }>> {
    const { data, error } = await this.supabaseClient
      .from('interests')
      .select('*')
      .order('category, name')

    if (error) throw error
    return data || []
  }

  /**
   * Get user's cultural preferences
   */
  async getUserCulturalPreferences(userId?: string): Promise<CulturalPreferences | null> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    const targetUserId = userId || user.user?.id
    if (!targetUserId) throw new Error('User ID required')

    const { data, error } = await this.supabaseClient
      .from('cultural_preferences')
      .select('*')
      .eq('user_id', targetUserId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  }

  /**
   * Save user's cultural preferences
   */
  async saveCulturalPreferences(preferences: Partial<CulturalPreferences>): Promise<CulturalPreferences> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { id, user_id, ...preferenceData } = preferences

    const { data, error } = await this.supabaseClient
      .from('cultural_preferences')
      .upsert({
        user_id: user.user.id,
        ...preferenceData,
        last_updated: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  /**
   * Upload profile picture
   */
  async uploadProfilePicture(file: File): Promise<string> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.user.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await this.supabaseClient.storage
      .from('profile-pictures')
      .upload(`${user.user.id}/${fileName}`, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = this.supabaseClient.storage
      .from('profile-pictures')
      .getPublicUrl(`${user.user.id}/${fileName}`)

    // Update profile with new picture URL
    await this.updateUserProfile({
      profile_picture_url: publicUrl
    })

    return publicUrl
  }

  /**
   * Upload verification selfie
   */
  async uploadVerificationSelfie(file: File): Promise<string> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const fileExt = file.name.split('.').pop()
    const fileName = `verification-${user.user.id}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await this.supabaseClient.storage
      .from('verification-selfies')
      .upload(`${user.user.id}/${fileName}`, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = this.supabaseClient.storage
      .from('verification-selfies')
      .getPublicUrl(`${user.user.id}/${fileName}`)

    // Update profile with verification selfie URL and set status to pending
    await this.updateUserProfile({
      verification_selfie_url: publicUrl,
      verification_status: 'pending'
    })

    return publicUrl
  }

  /**
   * Search for Portuguese-speaking community members
   */
  async searchCommunityMembers(filters: {
    location?: string
    portuguese_origin?: string
    interests?: string[]
    cultural_connection_level?: number
    limit?: number
    offset?: number
  }): Promise<UserProfile[]> {
    let query = this.supabaseClient
      .from('profiles')
      .select('*')
      .eq('is_active', true)
      .eq('verification_status', 'verified')

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters.portuguese_origin) {
      query = query.eq('portuguese_origin', filters.portuguese_origin)
    }

    if (filters.cultural_connection_level) {
      query = query.gte('cultural_connection_level', filters.cultural_connection_level)
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(filters.limit || 20)
      .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1)

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Get user statistics for dashboard
   */
  async getUserStatistics(): Promise<{
    total_connections: number
    mutual_matches: number
    events_attended: number
    cultural_score: number
    profile_completion: number
  }> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const [
      { count: connections },
      { count: matches },
      { count: events },
      profile,
      preferences
    ] = await Promise.all([
      this.supabaseClient
        .from('community_connections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('status', 'active'),
      
      this.supabaseClient
        .from('user_matches')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('is_mutual', true),
      
      this.supabaseClient
        .from('event_attendees')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.user.id),
      
      this.getCurrentUserProfile(),
      this.getUserCulturalPreferences()
    ])

    // Calculate profile completion percentage
    let completionScore = 0
    if (profile) {
      const fields = [
        'first_name', 'last_name', 'bio', 'location', 'profile_picture_url',
        'portuguese_origin', 'years_in_uk', 'professional_status', 'london_neighborhood'
      ]
      const completedFields = fields.filter(field => profile[field as keyof UserProfile])
      completionScore = Math.round((completedFields.length / fields.length) * 100)
    }

    return {
      total_connections: connections || 0,
      mutual_matches: matches || 0,
      events_attended: events || 0,
      cultural_score: preferences?.cultural_depth_score || 0,
      profile_completion: completionScore
    }
  }

  /**
   * Deactivate user account
   */
  async deactivateAccount(): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('profiles')
      .update({ is_active: false })
      .eq('id', user.user.id)

    if (error) throw error
  }

  /**
   * Delete user account permanently
   */
  async deleteAccount(): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // This would typically involve more complex cleanup
    // For now, just mark as deleted
    const { error } = await this.supabaseClient
      .from('profiles')
      .update({ 
        is_active: false,
        email: `deleted_${Date.now()}@deleted.com`,
        first_name: 'Deleted',
        last_name: 'User'
      })
      .eq('id', user.user.id)

    if (error) throw error
  }
}

export const userProfileService = new UserProfileService()