import { supabase } from '@/lib/supabase'

export interface CommunityConnection {
  id: string
  user_id: string
  target_user_id: string
  connection_type: 'professional' | 'cultural' | 'social' | 'family_friend' | 'business_partner' | 'mentor_mentee'
  connection_strength: number // 1-5 scale
  shared_interests?: string[]
  shared_locations?: string[]
  shared_events?: string[]
  connection_notes?: string
  is_mutual: boolean
  status: 'active' | 'inactive' | 'blocked'
  last_interaction_at?: string
  created_at: string
  updated_at: string
  
  // Populated user data
  target_user?: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
    location?: string
    portuguese_origin?: string
    professional_status?: string
    membership_tier: string
  }
}

export interface CulturalCompatibility {
  id: string
  user_a_id: string
  user_b_id: string
  origin_compatibility: number
  language_compatibility: number
  cultural_compatibility: number
  professional_compatibility: number
  values_compatibility: number
  lifestyle_compatibility: number
  overall_compatibility: number
  compatibility_insights?: string[]
  shared_elements?: string[]
  calculated_at: string
  last_updated: string
}

export interface ConnectionRecommendation {
  user: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
    location?: string
    portuguese_origin?: string
    professional_status?: string
    bio?: string
  }
  compatibility_score: number
  shared_interests: string[]
  shared_locations: string[]
  connection_reasons: string[]
  cultural_compatibility?: CulturalCompatibility
}

export interface NetworkingEvent {
  id: string
  title: string
  description?: string
  start_datetime: string
  location?: string
  attendee_count: number
  attendees?: Array<{
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
    professional_status?: string
  }>
}

class ConnectionService {
  private supabaseClient = supabase

  /**
   * Get user's community connections
   */
  async getUserConnections(filters?: {
    connection_type?: string
    status?: string
    limit?: number
  }): Promise<CommunityConnection[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    let query = this.supabaseClient
      .from('community_connections')
      .select(`
        *,
        target_user:profiles!target_user_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          portuguese_origin,
          professional_status,
          membership_tier
        )
      `)
      .eq('user_id', user.user.id)

    if (filters?.connection_type) {
      query = query.eq('connection_type', filters.connection_type)
    }

    if (filters?.status) {
      query = query.eq('status', filters.status)
    } else {
      query = query.eq('status', 'active')
    }

    query = query
      .order('last_interaction_at', { ascending: false, nullsFirst: false })
      .limit(filters?.limit || 50)

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Get connection recommendations based on cultural compatibility
   */
  async getConnectionRecommendations(): Promise<ConnectionRecommendation[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Get cultural compatibility scores
    const { data: compatibilityData, error: compatibilityError } = await this.supabaseClient
      .from('cultural_compatibility')
      .select(`
        *,
        user_b:profiles!user_b_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          portuguese_origin,
          professional_status,
          bio
        )
      `)
      .eq('user_a_id', user.user.id)
      .gte('overall_compatibility', 70) // Only high compatibility matches
      .order('overall_compatibility', { ascending: false })
      .limit(20)

    if (compatibilityError) throw compatibilityError

    // Filter out existing connections
    const existingConnections = await this.getUserConnections()
    const existingConnectionIds = existingConnections.map(conn => conn.target_user_id)

    const recommendations: ConnectionRecommendation[] = (compatibilityData || [])
      .filter(comp => !existingConnectionIds.includes(comp.user_b_id))
      .map(comp => ({
        user: comp.user_b,
        compatibility_score: comp.overall_compatibility,
        shared_interests: [],
        shared_locations: [],
        connection_reasons: comp.compatibility_insights || [],
        cultural_compatibility: comp
      }))

    // Get shared interests for each recommendation
    for (const recommendation of recommendations) {
      const { data: sharedInterests } = await this.supabaseClient
        .rpc('get_shared_interests', {
          user_a: user.user.id,
          user_b: recommendation.user.id
        })

      if (sharedInterests) {
        recommendation.shared_interests = sharedInterests.map((interest: any) => interest.name)
      }
    }

    return recommendations
  }

  /**
   * Send connection request
   */
  async sendConnectionRequest(
    targetUserId: string, 
    connectionType: CommunityConnection['connection_type'],
    notes?: string
  ): Promise<CommunityConnection> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    if (user.user.id === targetUserId) {
      throw new Error('Cannot connect to yourself')
    }

    const { data, error } = await this.supabaseClient
      .from('community_connections')
      .insert({
        user_id: user.user.id,
        target_user_id: targetUserId,
        connection_type: connectionType,
        connection_notes: notes,
        connection_strength: 1,
        is_mutual: false,
        status: 'active'
      })
      .select(`
        *,
        target_user:profiles!target_user_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          portuguese_origin,
          professional_status,
          membership_tier
        )
      `)
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Connection already exists')
      }
      throw error
    }

    // Check if there's a reverse connection to make it mutual
    const { data: reverseConnection } = await this.supabaseClient
      .from('community_connections')
      .select('id')
      .eq('user_id', targetUserId)
      .eq('target_user_id', user.user.id)
      .eq('status', 'active')
      .single()

    if (reverseConnection) {
      // Make both connections mutual
      await Promise.all([
        this.supabaseClient
          .from('community_connections')
          .update({ is_mutual: true })
          .eq('id', data.id),
        this.supabaseClient
          .from('community_connections')
          .update({ is_mutual: true })
          .eq('id', reverseConnection.id)
      ])

      data.is_mutual = true
    }

    return data
  }

  /**
   * Update connection details
   */
  async updateConnection(
    connectionId: string,
    updates: {
      connection_type?: CommunityConnection['connection_type']
      connection_strength?: number
      connection_notes?: string
      status?: 'active' | 'inactive' | 'blocked'
    }
  ): Promise<CommunityConnection> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('community_connections')
      .update({
        ...updates,
        last_interaction_at: new Date().toISOString()
      })
      .eq('id', connectionId)
      .eq('user_id', user.user.id) // Ensure user owns the connection
      .select(`
        *,
        target_user:profiles!target_user_id(
          id,
          first_name,
          last_name,
          profile_picture_url,
          location,
          portuguese_origin,
          professional_status,
          membership_tier
        )
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Remove/block connection
   */
  async removeConnection(connectionId: string, block: boolean = false): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    if (block) {
      // Block the connection
      const { error } = await this.supabaseClient
        .from('community_connections')
        .update({ status: 'blocked' })
        .eq('id', connectionId)
        .eq('user_id', user.user.id)

      if (error) throw error
    } else {
      // Remove the connection entirely
      const { error } = await this.supabaseClient
        .from('community_connections')
        .delete()
        .eq('id', connectionId)
        .eq('user_id', user.user.id)

      if (error) throw error
    }
  }

  /**
   * Get mutual connections with another user
   */
  async getMutualConnections(targetUserId: string): Promise<Array<{
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
    connection_type: string
  }>> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .rpc('get_mutual_connections', {
        user_a: user.user.id,
        user_b: targetUserId
      })

    if (error) throw error
    return data || []
  }

  /**
   * Get networking events where user can meet new people
   */
  async getNetworkingEvents(): Promise<NetworkingEvent[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('events')
      .select(`
        id,
        title,
        description,
        start_datetime,
        location,
        current_attendee_count,
        event_attendees!inner(
          user:profiles(
            id,
            first_name,
            last_name,
            profile_picture_url,
            professional_status
          )
        )
      `)
      .contains('tags', ['networking'])
      .eq('status', 'active')
      .gte('start_datetime', new Date().toISOString())
      .order('start_datetime', { ascending: true })
      .limit(10)

    if (error) throw error

    return (data || []).map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      start_datetime: event.start_datetime,
      location: event.location,
      attendee_count: event.current_attendee_count,
      attendees: (event.event_attendees || []).map((attendee: any) => ({
        id: attendee.user?.id || attendee.id || '',
        first_name: attendee.user?.first_name || attendee.first_name || '',
        last_name: attendee.user?.last_name || attendee.last_name || '',
        profile_picture_url: attendee.user?.profile_picture_url || attendee.profile_picture_url,
        professional_status: attendee.user?.professional_status || attendee.professional_status
      })).filter(user => user.id)
    }))
  }

  /**
   * Get connection statistics for user dashboard
   */
  async getConnectionStatistics(): Promise<{
    total_connections: number
    mutual_connections: number
    professional_connections: number
    cultural_connections: number
    connection_strength_average: number
    recent_connections_count: number
  }> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const [
      { data: allConnections },
      { data: mutualConnections },
      { data: professionalConnections },
      { data: culturalConnections },
      { data: recentConnections }
    ] = await Promise.all([
      this.supabaseClient
        .from('community_connections')
        .select('connection_strength')
        .eq('user_id', user.user.id)
        .eq('status', 'active'),
      
      this.supabaseClient
        .from('community_connections')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('is_mutual', true)
        .eq('status', 'active'),
      
      this.supabaseClient
        .from('community_connections')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('connection_type', 'professional')
        .eq('status', 'active'),
      
      this.supabaseClient
        .from('community_connections')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('connection_type', 'cultural')
        .eq('status', 'active'),
      
      this.supabaseClient
        .from('community_connections')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id)
        .eq('status', 'active')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
    ])

    const avgConnectionStrength = allConnections?.length 
      ? allConnections.reduce((sum, conn) => sum + conn.connection_strength, 0) / allConnections.length
      : 0

    return {
      total_connections: allConnections?.length || 0,
      mutual_connections: mutualConnections?.length || 0,
      professional_connections: professionalConnections?.length || 0,
      cultural_connections: culturalConnections?.length || 0,
      connection_strength_average: Math.round(avgConnectionStrength * 100) / 100,
      recent_connections_count: recentConnections?.length || 0
    }
  }

  /**
   * Search for Portuguese-speaking community members to connect with
   */
  async searchPotentialConnections(filters: {
    location?: string
    portuguese_origin?: string
    professional_status?: string
    connection_type?: string
    cultural_compatibility_min?: number
    limit?: number
  }): Promise<ConnectionRecommendation[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Get existing connections to exclude
    const existingConnections = await this.getUserConnections()
    const existingConnectionIds = existingConnections.map(conn => conn.target_user_id)

    let query = this.supabaseClient
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        profile_picture_url,
        location,
        portuguese_origin,
        professional_status,
        bio
      `)
      .eq('is_active', true)
      .eq('verification_status', 'verified')
      .neq('id', user.user.id)

    // Exclude existing connections
    if (existingConnectionIds.length > 0) {
      query = query.not('id', 'in', `(${existingConnectionIds.join(',')})`)
    }

    // Apply filters
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters.portuguese_origin) {
      query = query.eq('portuguese_origin', filters.portuguese_origin)
    }

    if (filters.professional_status) {
      query = query.eq('professional_status', filters.professional_status)
    }

    query = query.limit(filters.limit || 20)

    const { data, error } = await query

    if (error) throw error

    // Get cultural compatibility for each potential connection
    const recommendations: ConnectionRecommendation[] = []

    for (const profile of data || []) {
      const { data: compatibility } = await this.supabaseClient
        .from('cultural_compatibility')
        .select('*')
        .eq('user_a_id', user.user.id)
        .eq('user_b_id', profile.id)
        .single()

      const compatibilityScore = compatibility?.overall_compatibility || 0

      if (!filters.cultural_compatibility_min || compatibilityScore >= filters.cultural_compatibility_min) {
        recommendations.push({
          user: profile,
          compatibility_score: compatibilityScore,
          shared_interests: [],
          shared_locations: [],
          connection_reasons: compatibility?.compatibility_insights || [],
          cultural_compatibility: compatibility
        })
      }
    }

    // Sort by compatibility score
    recommendations.sort((a, b) => b.compatibility_score - a.compatibility_score)

    return recommendations
  }
}

export const connectionService = new ConnectionService()