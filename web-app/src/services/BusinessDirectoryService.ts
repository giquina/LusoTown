import { supabase } from '@/lib/supabase'
import logger from '@/utils/logger'

export interface PortugueseBusiness {
  id: string
  owner_id?: string
  business_name: string
  business_type: string
  description?: string
  address: string
  neighborhood?: string
  postcode?: string
  phone?: string
  email?: string
  website?: string
  social_media?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  specialties?: string[]
  portuguese_authenticity_score: number // 0-100
  serves_portuguese_community: boolean
  staff_speaks_portuguese: boolean
  accepts_multibanco: boolean
  business_hours?: Record<string, { open: string; close: string; closed?: boolean }>
  average_rating: number
  review_count: number
  price_range?: 'budget' | 'moderate' | 'upscale' | 'luxury'
  verified_status: 'pending' | 'verified' | 'premium' | 'rejected'
  featured_until?: string
  created_at: string
  updated_at: string
  
  // Populated fields
  owner?: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
  }
  recent_reviews?: BusinessReview[]
  is_open?: boolean
  distance_km?: number // Distance from search location
}

export interface BusinessReview {
  id: string
  business_id: string
  reviewer_id: string
  rating: number
  review_text?: string
  cultural_authenticity_rating?: number
  language_accommodation_rating?: number
  recommended_dishes?: string[]
  visit_type?: 'dining' | 'shopping' | 'service' | 'event' | 'meeting'
  visit_date?: string
  helpful_votes: number
  is_verified_customer: boolean
  moderation_status: 'pending' | 'approved' | 'rejected'
  created_at: string
  
  // Populated reviewer data
  reviewer?: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url?: string
  }
}

export interface BusinessSearchFilters {
  business_type?: string
  neighborhood?: string
  price_range?: string
  min_rating?: number
  portuguese_owned_only?: boolean
  portuguese_speaking_staff?: boolean
  accepts_multibanco?: boolean
  verified_only?: boolean
  open_now?: boolean
  limit?: number
  offset?: number
  // New location-based filters
  latitude?: number
  longitude?: number
  radius_km?: number
  cultural_focus?: string
  portuguese_specialties?: string[]
  max_price_level?: number
}

export interface BusinessCategory {
  type: string
  name: string
  description: string
  icon: string
  business_count: number
}

export interface BusinessCluster {
  cluster_id: string
  cluster_lat: number
  cluster_lng: number
  business_count: number
  avg_rating: number
  dominant_type: string
  cultural_mix: Record<string, number>
  business_ids: string[]
}

export interface LocationSearchParams {
  latitude: number
  longitude: number
  radius_km?: number
  business_types?: string[]
  min_rating?: number
  max_price_level?: number
  cultural_focus?: string
  portuguese_specialties?: string[]
  verified_only?: boolean
  open_now?: boolean
  limit?: number
  offset?: number
}

export interface HybridSearchParams {
  search_query?: string
  latitude?: number
  longitude?: number
  radius_km?: number
  business_types?: string[]
  min_rating?: number
  verified_only?: boolean
  limit?: number
}

class BusinessDirectoryService {
  private supabaseClient = supabase
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private readonly DEFAULT_CACHE_TTL = 15 * 60 * 1000 // 15 minutes in milliseconds

  /**
   * Generate cache key for search parameters
   */
  private generateCacheKey(method: string, params: any): string {
    return `${method}:${JSON.stringify(params)}`
  }

  /**
   * Get cached data if valid
   */
  private getCachedData<T>(cacheKey: string): T | null {
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }
    if (cached) {
      this.cache.delete(cacheKey) // Remove expired cache
    }
    return null
  }

  /**
   * Cache data with TTL
   */
  private setCachedData(cacheKey: string, data: any, ttl: number = this.DEFAULT_CACHE_TTL): void {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  /**
   * Log performance metrics to database
   */
  private async logPerformance(searchType: string, executionTime: number, resultCount: number, params: any = {}) {
    try {
      await this.supabaseClient.rpc('log_business_search_performance', {
        search_type: searchType,
        execution_time_ms: executionTime,
        result_count: resultCount,
        search_parameters: params
      })
    } catch (error) {
      logger.warn('Failed to log performance metrics:', error)
    }
  }

  /**
   * Clear expired cache entries
   */
  private cleanupCache(): void {
    const now = Date.now()
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp >= value.ttl) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Get nearby Portuguese businesses using optimized PostGIS search
   */
  async getNearbyBusinesses(params: LocationSearchParams): Promise<PortugueseBusiness[]> {
    const cacheKey = this.generateCacheKey('getNearbyBusinesses', params)
    const cached = this.getCachedData<PortugueseBusiness[]>(cacheKey)
    
    if (cached) {
      logger.debug('Returning cached nearby businesses result')
      return cached
    }

    const startTime = Date.now()
    
    try {
      const { data, error } = await this.supabaseClient.rpc(
        'find_nearby_portuguese_businesses',
        {
          user_lat: params.latitude,
          user_lng: params.longitude,
          radius_km: params.radius_km || 10.0,
          business_types: params.business_types || null,
          min_rating: params.min_rating || 0.0,
          max_price_level: params.max_price_level || 4,
          cultural_focus_filter: params.cultural_focus || null,
          portuguese_specialties_filter: params.portuguese_specialties || null,
          verified_only: params.verified_only ?? true,
          open_now: params.open_now ?? false,
          limit_results: params.limit || 20,
          offset_results: params.offset || 0
        }
      )

      if (error) {
        logger.error('Nearby businesses search error:', error)
        throw error
      }

      // Log performance metrics
      const executionTime = Date.now() - startTime
      await this.logPerformance('nearby_search', executionTime, data?.length || 0, params)
      
      if (executionTime > 200) {
        logger.warn(`Slow nearby business search: ${executionTime}ms`, {
          params,
          resultCount: data?.length || 0
        })
      }

      const result = (data || []).map(business => ({
        id: business.business_id,
        business_name: business.business_name,
        business_type: business.business_type,
        description: business.description,
        address: business.address,
        postcode: business.postcode,
        phone: business.phone,
        website: business.website_url,
        average_rating: business.average_rating,
        review_count: business.total_reviews,
        price_range: business.price_range,
        specialties: business.portuguese_specialties,
        portuguese_authenticity_score: business.recommendation_score * 10, // Convert to 0-100 scale
        serves_portuguese_community: true,
        staff_speaks_portuguese: true,
        accepts_multibanco: true, // Assume true for Portuguese businesses
        verified_status: business.is_verified ? 'verified' : 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_open: business.is_open_now,
        // Add distance info
        distance_km: business.distance_km
      }))

      // Cache successful results
      this.setCachedData(cacheKey, result)
      return result
    } catch (error) {
      logger.error('Nearby businesses search failed:', error)
      throw new Error('Failed to search nearby Portuguese businesses')
    }
  }

  /**
   * Hybrid search combining text and location
   */
  async searchBusinessesHybrid(params: HybridSearchParams): Promise<PortugueseBusiness[]> {
    const cacheKey = this.generateCacheKey('searchBusinessesHybrid', params)
    const cached = this.getCachedData<PortugueseBusiness[]>(cacheKey)
    
    if (cached) {
      logger.debug('Returning cached hybrid search result')
      return cached
    }

    const startTime = Date.now()
    
    try {
      const { data, error } = await this.supabaseClient.rpc(
        'search_portuguese_businesses_hybrid',
        {
          search_query: params.search_query || null,
          user_lat: params.latitude || null,
          user_lng: params.longitude || null,
          radius_km: params.radius_km || 50.0,
          business_types: params.business_types || null,
          min_rating: params.min_rating || 0.0,
          verified_only: params.verified_only ?? true,
          limit_results: params.limit || 20
        }
      )

      if (error) {
        logger.error('Hybrid business search error:', error)
        throw error
      }

      // Log performance metrics
      const executionTime = Date.now() - startTime
      await this.logPerformance('hybrid_search', executionTime, data?.length || 0, params)
      
      if (executionTime > 300) {
        logger.warn(`Slow hybrid business search: ${executionTime}ms`, {
          params,
          resultCount: data?.length || 0
        })
      }

      const result = (data || []).map(business => ({
        id: business.business_id,
        business_name: business.business_name,
        business_type: business.business_type,
        description: business.description,
        address: business.address,
        postcode: business.postcode,
        phone: business.phone,
        website: business.website_url,
        average_rating: business.average_rating,
        review_count: business.total_reviews,
        price_range: business.price_range,
        specialties: business.portuguese_specialties,
        portuguese_authenticity_score: business.relevance_score * 10,
        serves_portuguese_community: true,
        staff_speaks_portuguese: true,
        accepts_multibanco: true,
        verified_status: business.is_verified ? 'verified' : 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        distance_km: business.distance_km,
        match_type: business.match_type
      }))

      // Cache successful results
      this.setCachedData(cacheKey, result)
      return result
    } catch (error) {
      logger.error('Hybrid business search failed:', error)
      throw new Error('Failed to search Portuguese businesses')
    }
  }

  /**
   * Get business clusters for map visualization
   */
  async getBusinessClusters(
    bounds: {
      south: number
      west: number
      north: number
      east: number
    },
    zoomLevel: number = 12,
    filters: {
      business_types?: string[]
      min_rating?: number
      verified_only?: boolean
    } = {}
  ): Promise<BusinessCluster[]> {
    const cacheKey = this.generateCacheKey('getBusinessClusters', { bounds, zoomLevel, filters })
    const cached = this.getCachedData<BusinessCluster[]>(cacheKey)
    
    if (cached) {
      logger.debug('Returning cached business clusters result')
      return cached
    }

    const startTime = Date.now()
    
    try {
      const { data, error } = await this.supabaseClient.rpc(
        'get_business_clusters_for_map',
        {
          bounds_south: bounds.south,
          bounds_west: bounds.west,
          bounds_north: bounds.north,
          bounds_east: bounds.east,
          zoom_level: zoomLevel,
          business_types: filters.business_types || null,
          min_rating: filters.min_rating || 0.0,
          verified_only: filters.verified_only ?? true
        }
      )

      if (error) {
        logger.error('Business clusters error:', error)
        throw error
      }

      // Log performance metrics
      const executionTime = Date.now() - startTime
      await this.logPerformance('map_clustering', executionTime, data?.length || 0, { bounds, zoomLevel, filters })
      
      if (executionTime > 100) {
        logger.warn(`Slow business clustering: ${executionTime}ms`, {
          bounds,
          zoomLevel,
          resultCount: data?.length || 0
        })
      }

      const result = data || []
      // Cache successful results with shorter TTL for map data
      this.setCachedData(cacheKey, result, 5 * 60 * 1000) // 5 minutes
      return result
    } catch (error) {
      logger.error('Business clustering failed:', error)
      throw new Error('Failed to get business clusters')
    }
  }

  /**
   * Get all Portuguese businesses with filters (legacy method, enhanced)
   */
  async getPortugueseBusinesses(filters: BusinessSearchFilters = {}): Promise<PortugueseBusiness[]> {
    // If location filters are provided, use the optimized location search
    if (filters.latitude && filters.longitude) {
      return this.getNearbyBusinesses({
        latitude: filters.latitude,
        longitude: filters.longitude,
        radius_km: filters.radius_km || 10.0,
        business_types: filters.business_type ? [filters.business_type] : undefined,
        min_rating: filters.min_rating || 0.0,
        max_price_level: filters.max_price_level || 4,
        cultural_focus: filters.cultural_focus,
        portuguese_specialties: filters.portuguese_specialties,
        verified_only: filters.verified_only,
        open_now: filters.open_now,
        limit: filters.limit,
        offset: filters.offset
      })
    }

    // Clean up cache periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup on each call
      this.cleanupCache()
    }

    let query = this.supabaseClient
      .from('portuguese_businesses')
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url),
        recent_reviews:business_reviews!business_id(
          id,
          rating,
          review_text,
          cultural_authenticity_rating,
          visit_date,
          reviewer:profiles!reviewer_id(id, first_name, last_name, profile_picture_url)
        )
      `)

    // Apply filters
    if (filters.business_type) {
      query = query.eq('business_type', filters.business_type)
    }

    if (filters.neighborhood) {
      query = query.eq('neighborhood', filters.neighborhood)
    }

    if (filters.price_range) {
      query = query.eq('price_range', filters.price_range)
    }

    if (filters.min_rating) {
      query = query.gte('average_rating', filters.min_rating)
    }

    if (filters.portuguese_speaking_staff) {
      query = query.eq('staff_speaks_portuguese', true)
    }

    if (filters.accepts_multibanco) {
      query = query.eq('accepts_multibanco', true)
    }

    if (filters.verified_only) {
      query = query.in('verified_status', ['verified', 'premium'])
    } else {
      query = query.neq('verified_status', 'rejected')
    }

    query = query
      .order('average_rating', { ascending: false })
      .order('review_count', { ascending: false })
      .limit(filters.limit || 20)

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
    }

    const { data, error } = await query

    if (error) throw error

    // Process business hours and determine if open
    return (data || []).map(business => ({
      ...business,
      is_open: this.isBusinessOpen(business.business_hours),
      recent_reviews: business.recent_reviews?.slice(0, 3) || []
    }))
  }

  /**
   * Get featured Portuguese businesses
   */
  async getFeaturedBusinesses(): Promise<PortugueseBusiness[]> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url),
        recent_reviews:business_reviews!business_id(
          id,
          rating,
          review_text,
          created_at,
          reviewer:profiles!reviewer_id(id, first_name, last_name)
        )
      `)
      .eq('verified_status', 'premium')
      .gte('featured_until', new Date().toISOString())
      .order('average_rating', { ascending: false })
      .limit(6)

    if (error) throw error

    return (data || []).map(business => ({
      ...business,
      is_open: this.isBusinessOpen(business.business_hours),
      recent_reviews: business.recent_reviews?.slice(0, 3) || []
    }))
  }

  /**
   * Get business by ID
   */
  async getBusinessById(businessId: string): Promise<PortugueseBusiness | null> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url, bio)
      `)
      .eq('id', businessId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return {
      ...data,
      is_open: this.isBusinessOpen(data.business_hours)
    }
  }

  /**
   * Search businesses by text query
   */
  async searchBusinesses(query: string, filters: BusinessSearchFilters = {}): Promise<PortugueseBusiness[]> {
    let supabaseQuery = this.supabaseClient
      .from('portuguese_businesses')
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url),
        recent_reviews:business_reviews!business_id(
          id,
          rating,
          review_text,
          reviewer:profiles!reviewer_id(id, first_name, last_name)
        )
      `)

    // Text search in business name, description, and specialties
    if (query) {
      supabaseQuery = supabaseQuery.or(`business_name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    // Apply other filters
    if (filters.business_type) {
      supabaseQuery = supabaseQuery.eq('business_type', filters.business_type)
    }

    if (filters.neighborhood) {
      supabaseQuery = supabaseQuery.eq('neighborhood', filters.neighborhood)
    }

    if (filters.verified_only) {
      supabaseQuery = supabaseQuery.in('verified_status', ['verified', 'premium'])
    } else {
      supabaseQuery = supabaseQuery.neq('verified_status', 'rejected')
    }

    supabaseQuery = supabaseQuery
      .order('average_rating', { ascending: false })
      .limit(filters.limit || 20)

    const { data, error } = await supabaseQuery

    if (error) throw error

    return (data || []).map(business => ({
      ...business,
      is_open: this.isBusinessOpen(business.business_hours),
      recent_reviews: business.recent_reviews?.slice(0, 3) || []
    }))
  }

  /**
   * Get business categories with counts
   */
  async getBusinessCategories(): Promise<BusinessCategory[]> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .select('business_type')
      .neq('verified_status', 'rejected')

    if (error) throw error

    // Count businesses by type
    const typeCounts: Record<string, number> = {}
    data?.forEach(business => {
      typeCounts[business.business_type] = (typeCounts[business.business_type] || 0) + 1
    })

    // Define category metadata
    const categoryMetadata: Record<string, { name: string; description: string; icon: string }> = {
      restaurant: {
        name: 'Restaurants',
        description: 'Portuguese restaurants and dining experiences',
        icon: '🍽️'
      },
      cafe: {
        name: 'Cafés',
        description: 'Lusophone cafés and coffee shops',
        icon: '☕'
      },
      bakery: {
        name: 'Bakeries',
        description: 'Lusophone bakeries and pastry shops',
        icon: '🥖'
      },
      shop: {
        name: 'Shops',
        description: 'Lusophone grocery stores and specialty shops',
        icon: '🛍️'
      },
      bar: {
        name: 'Bars & Pubs',
        description: 'Lusophone bars and entertainment venues',
        icon: '🍻'
      },
      cultural_center: {
        name: 'Cultural Centers',
        description: 'Lusophone cultural and community centers',
        icon: '🏛️'
      },
      church: {
        name: 'Churches',
        description: 'Lusophone churches and religious centers',
        icon: '⛪'
      },
      service: {
        name: 'Services',
        description: 'Lusophone professional services',
        icon: '🔧'
      }
    }

    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      name: categoryMetadata[type]?.name || type,
      description: categoryMetadata[type]?.description || '',
      icon: categoryMetadata[type]?.icon || '🏢',
      business_count: count
    })).sort((a, b) => b.business_count - a.business_count)
  }

  /**
   * Get business reviews
   */
  async getBusinessReviews(businessId: string, limit: number = 10): Promise<BusinessReview[]> {
    const { data, error } = await this.supabaseClient
      .from('business_reviews')
      .select(`
        *,
        reviewer:profiles!reviewer_id(id, first_name, last_name, profile_picture_url)
      `)
      .eq('business_id', businessId)
      .eq('moderation_status', 'approved')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  /**
   * Add a business review
   */
  async addBusinessReview(review: {
    business_id: string
    rating: number
    review_text?: string
    cultural_authenticity_rating?: number
    language_accommodation_rating?: number
    recommended_dishes?: string[]
    visit_type?: BusinessReview['visit_type']
    visit_date?: string
  }): Promise<BusinessReview> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('business_reviews')
      .insert({
        ...review,
        reviewer_id: user.user.id
      })
      .select(`
        *,
        reviewer:profiles!reviewer_id(id, first_name, last_name, profile_picture_url)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Update business review helpful votes
   */
  async voteHelpfulReview(reviewId: string, helpful: boolean): Promise<void> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { error } = await this.supabaseClient
      .from('business_reviews')
      .update({
        helpful_votes: helpful ? 
          this.supabaseClient.rpc('increment_helpful_votes', { review_id: reviewId }) :
          this.supabaseClient.rpc('decrement_helpful_votes', { review_id: reviewId })
      })
      .eq('id', reviewId)

    if (error) throw error
  }

  /**
   * Register a new Portuguese business
   */
  async registerBusiness(businessData: Partial<PortugueseBusiness>): Promise<PortugueseBusiness> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { id, created_at, updated_at, average_rating, review_count, ...createData } = businessData

    const { data, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .insert({
        ...createData,
        owner_id: user.user.id,
        average_rating: 0,
        review_count: 0,
        verified_status: 'pending'
      })
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Update business information (owner only)
   */
  async updateBusiness(businessId: string, businessData: Partial<PortugueseBusiness>): Promise<PortugueseBusiness> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { id, created_at, updated_at, owner_id, average_rating, review_count, ...updateData } = businessData

    const { data, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .update(updateData)
      .eq('id', businessId)
      .eq('owner_id', user.user.id) // Ensure only owner can update
      .select(`
        *,
        owner:profiles!owner_id(id, first_name, last_name, profile_picture_url)
      `)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Upload business image
   */
  async uploadBusinessImage(businessId: string, file: File, imageType: 'logo' | 'gallery'): Promise<string> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const fileExt = file.name.split('.').pop()
    const fileName = `${businessId}-${imageType}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await this.supabaseClient.storage
      .from('business-images')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = this.supabaseClient.storage
      .from('business-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  /**
   * Get businesses by neighborhood
   */
  async getBusinessesByNeighborhood(neighborhood: string): Promise<PortugueseBusiness[]> {
    return this.getPortugueseBusinesses({ neighborhood, verified_only: true })
  }

  /**
   * Get top-rated Portuguese businesses
   */
  async getTopRatedBusinesses(limit: number = 10): Promise<PortugueseBusiness[]> {
    return this.getPortugueseBusinesses({ 
      min_rating: 4.0,
      verified_only: true,
      limit 
    })
  }

  /**
   * Get business statistics for dashboard
   */
  async getBusinessStatistics(): Promise<{
    total_businesses: number
    verified_businesses: number
    average_rating: number
    total_reviews: number
    by_neighborhood: Record<string, number>
    by_type: Record<string, number>
  }> {
    const { data: businesses, error } = await this.supabaseClient
      .from('portuguese_businesses')
      .select('verified_status, average_rating, review_count, neighborhood, business_type')

    if (error) throw error

    const stats = {
      total_businesses: businesses?.length || 0,
      verified_businesses: businesses?.filter(b => ['verified', 'premium'].includes(b.verified_status)).length || 0,
      average_rating: 0,
      total_reviews: 0,
      by_neighborhood: {} as Record<string, number>,
      by_type: {} as Record<string, number>
    }

    if (businesses) {
      // Calculate averages
      const ratedBusinesses = businesses.filter(b => b.review_count > 0)
      if (ratedBusinesses.length > 0) {
        stats.average_rating = ratedBusinesses.reduce((sum, b) => sum + b.average_rating, 0) / ratedBusinesses.length
      }
      stats.total_reviews = businesses.reduce((sum, b) => sum + b.review_count, 0)

      // Group by neighborhood and type
      businesses.forEach(business => {
        if (business.neighborhood) {
          stats.by_neighborhood[business.neighborhood] = (stats.by_neighborhood[business.neighborhood] || 0) + 1
        }
        stats.by_type[business.business_type] = (stats.by_type[business.business_type] || 0) + 1
      })
    }

    return stats
  }

  /**
   * Helper function to determine if business is currently open
   */
  private isBusinessOpen(businessHours?: Record<string, { open: string; close: string; closed?: boolean }>): boolean {
    if (!businessHours) return true // Assume open if no hours specified

    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() // e.g., 'monday'
    const currentTime = now.toTimeString().slice(0, 5) // e.g., '14:30'

    const daySchedule = businessHours[currentDay]
    if (!daySchedule || daySchedule.closed) return false

    return currentTime >= daySchedule.open && currentTime <= daySchedule.close
  }

  /**
   * Get user's reviewed businesses
   */
  async getUserReviewedBusinesses(): Promise<Array<{
    business: PortugueseBusiness
    review: BusinessReview
  }>> {
    const { data: user } = await this.supabaseClient.auth.getUser()
    if (!user.user) throw new Error('User not authenticated')

    const { data, error } = await this.supabaseClient
      .from('business_reviews')
      .select(`
        *,
        business:portuguese_businesses!business_id(*)
      `)
      .eq('reviewer_id', user.user.id)
      .eq('moderation_status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(item => ({
      business: item.business,
      review: item
    }))
  }
}

export const businessDirectoryService = new BusinessDirectoryService()