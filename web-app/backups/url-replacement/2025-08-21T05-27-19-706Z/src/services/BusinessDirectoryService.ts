import { supabase } from '@/lib/supabase'

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
}

export interface BusinessCategory {
  type: string
  name: string
  description: string
  icon: string
  business_count: number
}

class BusinessDirectoryService {
  private supabaseClient = supabase

  /**
   * Get all Portuguese businesses with filters
   */
  async getPortugueseBusinesses(filters: BusinessSearchFilters = {}): Promise<PortugueseBusiness[]> {
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
        description: 'Portuguese cafés and coffee shops',
        icon: '☕'
      },
      bakery: {
        name: 'Bakeries',
        description: 'Portuguese bakeries and pastry shops',
        icon: '🥖'
      },
      shop: {
        name: 'Shops',
        description: 'Portuguese grocery stores and specialty shops',
        icon: '🛍️'
      },
      bar: {
        name: 'Bars & Pubs',
        description: 'Portuguese bars and entertainment venues',
        icon: '🍻'
      },
      cultural_center: {
        name: 'Cultural Centers',
        description: 'Portuguese cultural and community centers',
        icon: '🏛️'
      },
      church: {
        name: 'Churches',
        description: 'Portuguese churches and religious centers',
        icon: '⛪'
      },
      service: {
        name: 'Services',
        description: 'Portuguese professional services',
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
    const currentDay = now.toLocaleLowerCase() // e.g., 'monday'
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