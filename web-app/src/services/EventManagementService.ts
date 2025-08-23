import { supabase } from '@/lib/supabase'
import { eventService } from '@/lib/events'

export interface PortugueseEvent {
  id: string
  title: string
  description?: string
  event_type: 'online' | 'in_person' | 'hybrid'
  location?: string
  virtual_link?: string
  start_datetime: string
  end_datetime: string
  max_attendees?: number
  current_attendee_count: number
  price: number
  currency: string
  group_id?: string
  created_by: string
  image_url?: string
  is_featured: boolean
  status: 'active' | 'cancelled' | 'completed'
  tags?: string[]
  
  // Portuguese cultural enhancements
  cultural_category?: string
  portuguese_neighborhood?: string
  cultural_authenticity_score?: number
  requires_portuguese_verification?: boolean
  partner_venue_id?: string
  fado_music_featured?: boolean
  santos_populares_themed?: boolean
  football_viewing_party?: boolean
  cultural_preservation_focus?: boolean
  
  created_at: string
  updated_at: string
  
  // Populated fields
  group?: {
    id: string
    name: string
    category?: string
  }
  creator?: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
  }
  venue?: PortugueseVenue
}

export interface PortugueseVenue {
  id: string
  name: string
  venue_type: 'restaurant' | 'cultural_center' | 'church' | 'cafe' | 'club' | 'bakery' | 'community_hall'
  address: string
  neighborhood?: string
  contact_email?: string
  contact_phone?: string
  website_url?: string
  verified_portuguese_owned: boolean
  authenticity_rating: number
  specialties?: string[]
  coordinates?: { lat: number; lng: number }
  operating_hours?: Record<string, { open: string; close: string }>
  partnership_status: 'pending' | 'active' | 'inactive'
  partnership_tier: 'basic' | 'premium' | 'exclusive'
  created_at: string
  updated_at: string
}

export interface EventAttendee {
  event_id: string
  user_id: string
  status: 'registered' | 'attended' | 'no_show'
  registered_at: string
  notes?: string
  user?: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
  }
}

export interface EventRecommendation {
  id: string
  user_id: string
  event_id: string
  recommendation_score: number
  recommendation_reasons?: string[]
  cultural_compatibility_score?: number
  location_compatibility_score?: number
  interest_compatibility_score?: number
  created_at: string
  event?: PortugueseEvent
}

export interface CulturalCalendar {
  id: string
  name: string
  description?: string
  cultural_significance?: string
  celebration_type: 'religious' | 'national' | 'regional' | 'traditional' | 'community'
  origin_region?: string
  date_type: 'fixed' | 'variable' | 'season'
  celebration_date?: string
  celebration_month?: number
  celebration_day?: number
  season?: string
  is_major_celebration: boolean
  london_participation_level: number
  typical_activities?: string[]
  food_traditions?: string[]
  music_traditions?: string[]
  recommended_venues?: string[]
  created_at: string
}

class EventManagementService {
  private supabaseClient = supabase

  /**
   * Get featured Portuguese events
   */
  async getFeaturedEvents(): Promise<PortugueseEvent[]> {
    try {
      const { data, error } = await this.supabaseClient
        .from('events')
        .select(`
          *,
          group:groups(id, name, category),
          creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
          venue:portuguese_venues!partner_venue_id(*)
        `)
        .eq('is_featured', true)
        .eq('status', 'active')
        .gte('end_datetime', new Date().toISOString())
        .order('start_datetime', { ascending: true })
        .limit(6)

      if (error) throw error
      return data || []
    } catch (error) {
      // Fallback to local featured events
      console.warn('Supabase unavailable, using local featured events:', error)
      
      const localEvents = await eventService.getEvents({ featured: true })
      return localEvents.slice(0, 6).map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        event_type: 'in_person' as const,
        location: event.location,
        start_datetime: new Date(`${event.date} ${event.time}`).toISOString(),
        end_datetime: event.endTime || new Date(new Date(`${event.date} ${event.time}`).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        max_attendees: event.maxAttendees,
        current_attendee_count: event.currentAttendees,
        price: event.price,
        currency: event.currency,
        created_by: 'mock-user-id',
        image_url: event.images?.[0] || event.image_url,
        is_featured: true,
        status: 'active' as const,
        tags: event.tags,
        cultural_category: event.category,
        portuguese_neighborhood: 'Vauxhall',
        cultural_authenticity_score: 5.0,
        requires_portuguese_verification: event.membershipRequired !== 'free',
        fado_music_featured: event.category.includes('Music') || event.category.includes('Cultural'),
        santos_populares_themed: event.title.toLowerCase().includes('santos') || event.title.toLowerCase().includes('festival'),
        football_viewing_party: event.title.toLowerCase().includes('football') || event.title.toLowerCase().includes('futebol'),
        cultural_preservation_focus: event.category.includes('Cultural') || event.category.includes('Heritage'),
        created_at: event.createdAt,
        updated_at: event.updatedAt,
        group: event.hostId ? {
          id: event.hostId,
          name: event.hostName || 'Portuguese-speaking community Group',
          category: 'Cultural'
        } : undefined,
        creator: {
          id: 'mock-user-id',
          first_name: event.hostName?.split(' ')[0] || 'Ana',
          last_name: event.hostName?.split(' ')[1] || 'Silva',
          profile_picture_url: '/profiles/default-avatar.svg'
        }
      }))
    }
  }

  /**
   * Get upcoming Portuguese-speaking community events
   */
  async getUpcomingEvents(filters?: {
    cultural_category?: string
    neighborhood?: string
    price_max?: number
    event_type?: string
    limit?: number
    offset?: number
  }): Promise<PortugueseEvent[]> {
    try {
      let query = this.supabaseClient
        .from('events')
        .select(`
          *,
          group:groups(id, name, category),
          creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
          venue:portuguese_venues!partner_venue_id(*)
        `)
        .eq('status', 'active')
        .gte('start_datetime', new Date().toISOString())

      if (filters?.cultural_category) {
        query = query.eq('cultural_category', filters.cultural_category)
      }

      if (filters?.neighborhood) {
        query = query.eq('portuguese_neighborhood', filters.neighborhood)
      }

      if (filters?.price_max) {
        query = query.lte('price', filters.price_max)
      }

      if (filters?.event_type) {
        query = query.eq('event_type', filters.event_type)
      }

      query = query
        .order('start_datetime', { ascending: true })
        .limit(filters?.limit || 20)

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      // Fallback to local events data when Supabase is unavailable
      console.warn('Supabase unavailable, using local events data:', error)
      
      const localEvents = await eventService.getEvents()
      const transformedEvents: PortugueseEvent[] = localEvents.slice(0, filters?.limit || 20).map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        event_type: 'in_person' as const,
        location: event.location,
        start_datetime: new Date(`${event.date} ${event.time}`).toISOString(),
        end_datetime: event.endTime || new Date(new Date(`${event.date} ${event.time}`).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        max_attendees: event.maxAttendees,
        current_attendee_count: event.currentAttendees,
        price: event.price,
        currency: event.currency,
        created_by: 'mock-user-id',
        image_url: event.images?.[0] || event.image_url,
        is_featured: event.featured || false,
        status: 'active' as const,
        tags: event.tags,
        cultural_category: event.category,
        portuguese_neighborhood: 'Vauxhall',
        cultural_authenticity_score: 4.8,
        requires_portuguese_verification: event.membershipRequired !== 'free',
        fado_music_featured: event.category.includes('Music') || event.category.includes('Cultural'),
        santos_populares_themed: event.title.toLowerCase().includes('santos') || event.title.toLowerCase().includes('festival'),
        football_viewing_party: event.title.toLowerCase().includes('football') || event.title.toLowerCase().includes('futebol'),
        cultural_preservation_focus: event.category.includes('Cultural') || event.category.includes('Heritage'),
        created_at: event.createdAt,
        updated_at: event.updatedAt,
        group: event.hostId ? {
          id: event.hostId,
          name: event.hostName || 'Portuguese-speaking community Group',
          category: 'Cultural'
        } : undefined,
        creator: {
          id: 'mock-user-id',
          first_name: event.hostName?.split(' ')[0] || 'Ana',
          last_name: event.hostName?.split(' ')[1] || 'Silva',
          profile_picture_url: '/profiles/default-avatar.svg'
        }
      }))

      // Apply filters to mock data
      let filtered = transformedEvents

      if (filters?.cultural_category) {
        filtered = filtered.filter(e => e.cultural_category === filters.cultural_category)
      }

      if (filters?.neighborhood) {
        filtered = filtered.filter(e => e.portuguese_neighborhood === filters.neighborhood)
      }

      if (filters?.price_max) {
        filtered = filtered.filter(e => e.price <= filters.price_max!)
      }

      if (filters?.event_type) {
        filtered = filtered.filter(e => e.event_type === filters.event_type)
      }

      return filtered
    }
  }

  /**
   * Get event recommendations for user based on cultural preferences
   */
  async getPersonalizedEventRecommendations(): Promise<EventRecommendation[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('event_recommendations')
      .select(`
        *,
        event:events(
          *,
          group:groups(id, name, category),
          creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
          venue:portuguese_venues!partner_venue_id(*)
        )
      `)
      .eq('user_id', user.user.id)
      .order('recommendation_score', { ascending: false })
      .limit(10)

    if (error) throw error
    return data || []
  }

  /**
   * Get event details by ID
   */
  async getEventById(eventId: string): Promise<PortugueseEvent | null> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select(`
        *,
        group:groups(id, name, category, description),
        creator:profiles!created_by(id, first_name, last_name, profile_picture_url, bio),
        venue:portuguese_venues!partner_venue_id(*)
      `)
      .eq('id', eventId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  }

  /**
   * Register for an event (RSVP)
   */
  async registerForEvent(eventId: string, notes?: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    // Check if event is at capacity
    const event = await this.getEventById(eventId)
    if (!event) throw new Error('Event not found')

    if (event.max_attendees && event.current_attendee_count >= event.max_attendees) {
      throw new Error('Event is at maximum capacity')
    }

    const { error } = await this.supabaseClient
      .from('event_attendees')
      .insert({
        event_id: eventId,
        user_id: user.user.id,
        status: 'registered',
        notes
      })

    if (error) {
      if (error.code === '23505') {
        throw new Error('Already registered for this event')
      }
      throw error
    }

    // Update event attendee count
    const { error: updateError } = await this.supabaseClient
      .from('events')
      .update({
        current_attendee_count: event.current_attendee_count + 1
      })
      .eq('id', eventId)

    if (updateError) throw updateError
  }

  /**
   * Cancel event registration
   */
  async cancelEventRegistration(eventId: string): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.user.id)

    if (error) throw error

    // Update event attendee count
    const event = await this.getEventById(eventId)
    if (event && event.current_attendee_count > 0) {
      await this.supabaseClient
        .from('events')
        .update({
          current_attendee_count: event.current_attendee_count - 1
        })
        .eq('id', eventId)
    }
  }

  /**
   * Get user's registered events
   */
  async getUserRegisteredEvents(): Promise<PortugueseEvent[]> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('event_attendees')
      .select(`
        *,
        event:events(
          *,
          group:groups(id, name, category),
          creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
          venue:portuguese_venues!partner_venue_id(*)
        )
      `)
      .eq('user_id', user.user.id)
      .eq('status', 'registered')
      .order('registered_at', { ascending: false })

    if (error) throw error
    return data?.map(item => item.event).filter(Boolean) || []
  }

  /**
   * Create a new Portuguese cultural event
   */
  async createEvent(eventData: Partial<PortugueseEvent>): Promise<PortugueseEvent> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { id, created_at, updated_at, current_attendee_count, ...createData } = eventData

    const { data, error } = await this.supabaseClient
      .from('events')
      .insert({
        ...createData,
        created_by: user.user.id,
        current_attendee_count: 0
      })
      .select(`
        *,
        group:groups(id, name, category),
        creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
        venue:portuguese_venues!partner_venue_id(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Update an event (only creator can update)
   */
  async updateEvent(eventId: string, eventData: Partial<PortugueseEvent>): Promise<PortugueseEvent> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { id, created_at, updated_at, created_by, current_attendee_count, ...updateData } = eventData

    const { data, error } = await this.supabaseClient
      .from('events')
      .update(updateData)
      .eq('id', eventId)
      .eq('created_by', user.user.id) // Ensure only creator can update
      .select(`
        *,
        group:groups(id, name, category),
        creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
        venue:portuguese_venues!partner_venue_id(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Get event attendees list
   */
  async getEventAttendees(eventId: string): Promise<EventAttendee[]> {
    const { data, error } = await this.supabaseClient
      .from('event_attendees')
      .select(`
        *,
        user:profiles!user_id(id, first_name, last_name, profile_picture_url)
      `)
      .eq('event_id', eventId)
      .order('registered_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Get Portuguese venues for event location selection
   */
  async getPortugueseVenues(filters?: {
    venue_type?: string
    neighborhood?: string
    verified_only?: boolean
  }): Promise<PortugueseVenue[]> {
    let query = this.supabaseClient
      .from('portuguese_venues')
      .select('*')
      .eq('partnership_status', 'active')

    if (filters?.venue_type) {
      query = query.eq('venue_type', filters.venue_type)
    }

    if (filters?.neighborhood) {
      query = query.eq('neighborhood', filters.neighborhood)
    }

    if (filters?.verified_only) {
      query = query.eq('verified_portuguese_owned', true)
    }

    query = query.order('authenticity_rating', { ascending: false })

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Get Portuguese cultural calendar
   */
  async getCulturalCalendar(filters?: {
    celebration_type?: string
    origin_region?: string
    major_only?: boolean
    month?: number
  }): Promise<CulturalCalendar[]> {
    let query = this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')

    if (filters?.celebration_type) {
      query = query.eq('celebration_type', filters.celebration_type)
    }

    if (filters?.origin_region) {
      query = query.eq('origin_region', filters.origin_region)
    }

    if (filters?.major_only) {
      query = query.eq('is_major_celebration', true)
    }

    if (filters?.month) {
      query = query.eq('celebration_month', filters.month)
    }

    query = query.order('london_participation_level', { ascending: false })

    const { data, error } = await query

    if (error) throw error
    return data || []
  }

  /**
   * Upload event image
   */
  async uploadEventImage(eventId: string, file: File): Promise<string> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const fileExt = file.name.split('.').pop()
    const fileName = `event-${eventId}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await this.supabaseClient.storage
      .from('event-images')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = this.supabaseClient.storage
      .from('event-images')
      .getPublicUrl(fileName)

    // Update event with new image URL
    await this.updateEvent(eventId, {
      image_url: publicUrl
    })

    return publicUrl
  }

  /**
   * Search events by text and cultural criteria
   */
  async searchEvents(query: string, filters?: {
    cultural_category?: string
    neighborhood?: string
    price_max?: number
    date_from?: string
    date_to?: string
  }): Promise<PortugueseEvent[]> {
    let supabaseQuery = this.supabaseClient
      .from('events')
      .select(`
        *,
        group:groups(id, name, category),
        creator:profiles!created_by(id, first_name, last_name, profile_picture_url),
        venue:portuguese_venues!partner_venue_id(*)
      `)
      .eq('status', 'active')
      .gte('end_datetime', new Date().toISOString())

    // Text search in title and description
    if (query) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    }

    // Apply filters
    if (filters?.cultural_category) {
      supabaseQuery = supabaseQuery.eq('cultural_category', filters.cultural_category)
    }

    if (filters?.neighborhood) {
      supabaseQuery = supabaseQuery.eq('portuguese_neighborhood', filters.neighborhood)
    }

    if (filters?.price_max) {
      supabaseQuery = supabaseQuery.lte('price', filters.price_max)
    }

    if (filters?.date_from) {
      supabaseQuery = supabaseQuery.gte('start_datetime', filters.date_from)
    }

    if (filters?.date_to) {
      supabaseQuery = supabaseQuery.lte('start_datetime', filters.date_to)
    }

    supabaseQuery = supabaseQuery
      .order('start_datetime', { ascending: true })
      .limit(50)

    const { data, error } = await supabaseQuery

    if (error) throw error
    return data || []
  }
}

export const eventManagementService = new EventManagementService()