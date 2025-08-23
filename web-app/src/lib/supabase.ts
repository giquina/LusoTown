import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side client for API routes (safe for client bundles)
// Avoid importing `next/headers` at module scope to keep this file client-compatible.
type CookieStoreLike = {
  get: (name: string) => { value?: string } | string | undefined
} | undefined

export function createClient(cookieStore?: CookieStoreLike) {
  const options: any = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }

  if (cookieStore) {
    options.cookies = {
      get(name: string) {
        const v = typeof (cookieStore as any)?.get === 'function' ? (cookieStore as any).get(name) : undefined
        return typeof v === 'string' ? v : v?.value
      },
    }
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, options)
}

// Types for our database
export interface Profile {
  id: string
  email: string
  first_name: string
  last_name?: string
  date_of_birth: string
  bio?: string
  location?: string
  verification_status: 'pending' | 'verified' | 'rejected'
  verification_selfie_url?: string
  profile_picture_url?: string
  is_active: boolean
  membership_tier: 'free' | 'core' | 'premium'
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Interest {
  id: string
  name: string
  category: string
  description?: string
  icon?: string
  created_at: string
}

export interface Group {
  id: string
  name: string
  description?: string
  group_type: 'interest' | 'location' | 'activity'
  category?: string
  location?: string
  london_borough?: string
  is_private: boolean
  max_members?: number
  current_member_count: number
  created_by: string
  image_url?: string
  rules?: string
  is_active: boolean
  portuguese_origin?: 'portugal' | 'brazil' | 'angola' | 'mozambique' | 'cape-verde' | 'guinea-bissau' | 'sao-tome-principe' | 'east-timor' | 'macau' | 'equatorial-guinea' | 'mixed' | 'any'
  language_preference?: 'english' | 'portuguese' | 'pt-pt' | 'pt-br' | 'both'
  age_restrictions?: {
    min_age?: number
    max_age?: number
    professionals_welcome?: boolean
  }
  meeting_frequency?: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'irregular' | 'one-time'
  verification_level?: 'none' | 'basic' | 'verified' | 'premium'
  safety_features?: {
    auto_moderation?: boolean
    manual_approval?: boolean
    background_check_required?: boolean
  }
  cultural_focus?: {
    preserves_heritage?: boolean
    professional_networking?: boolean
    traditional_activities?: boolean
    language_learning?: boolean
  }
  contact_info?: {
    email?: string
    phone?: string
    whatsapp?: string
    telegram?: string
  }
  group_tags?: string[]
  moderation_status?: 'pending' | 'approved' | 'rejected' | 'flagged' | 'under_review'
  rejection_reason?: string
  last_moderated_at?: string
  moderated_by?: string
  created_at: string
  updated_at: string
}

export interface GroupCategory {
  id: string
  name_en: string
  name_pt: string
  description_en?: string
  description_pt?: string
  icon?: string
  color_class?: string
  is_age_restricted: boolean
  min_age?: number
  is_active: boolean
  display_order: number
  created_at: string
}

export interface GroupReport {
  id: string
  group_id: string
  reported_by: string
  report_type: 'inappropriate_content' | 'spam' | 'harassment' | 'fake_group' | 'safety_concern' | 'age_inappropriate' | 'other'
  description: string
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed'
  reviewed_by?: string
  reviewed_at?: string
  resolution_notes?: string
  created_at: string
}

export interface GroupJoinRequest {
  id: string
  group_id: string
  user_id: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  response_message?: string
  created_at: string
}

export interface Event {
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
  created_at: string
  updated_at: string
}

// Extended Profile interface with privacy and preferences
export interface UserProfile extends Profile {
  interests?: string[]
  photos?: ProfilePhoto[]
  preferences?: {
    looking_for: 'friendship' | 'activity_partners' | 'networking' | 'all'
    age_range_min: number
    age_range_max: number
    preferred_locations?: string[]
  }
  privacy_settings?: {
    show_age: boolean
    show_location: boolean
    allow_messages: 'everyone' | 'connections' | 'premium'
    profile_visibility: 'public' | 'members_only' | 'connections_only'
  }
  verification_data?: {
    email_verified: boolean
    phone_verified: boolean
    photo_verified: boolean
    background_checked: boolean
  }
  stats?: {
    connections_count: number
    events_attended: number
    profile_completion: number
  }
}

export interface ProfilePhoto {
  id: string
  user_id: string
  url: string
  caption?: string
  is_profile_picture: boolean
  uploaded_at: string
  is_active: boolean
}

export interface ProfileCompletion {
  percentage: number
  completed_steps: string[]
  missing_steps: string[]
  total_points: number
  max_points: number
}

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Profile management functions
export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const user = await getCurrentUser()
    if (!user) return null
    
    return await getProfile(user.id)
  } catch (error) {
    console.error('Error fetching current user profile:', error)
    return null
  }
}

export const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Photo management functions
export const uploadPhoto = async (userId: string, file: File, isProfilePicture: boolean = false) => {
  try {
    // Validate image
    const validation = validateImage(file)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // Compress image
    const compressedFile = await compressImage(file)
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
    
    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, compressedFile)
    
    if (uploadError) throw uploadError
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName)
    
    // Update profile if this is the profile picture
    if (isProfilePicture) {
      await updateProfile(userId, { profile_picture_url: urlData.publicUrl })
    }
    
    return {
      success: true,
      url: urlData.publicUrl,
      path: fileName
    }
  } catch (error) {
    console.error('Error uploading photo:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const deletePhoto = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from('profile-pictures')
      .remove([path])
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error deleting photo:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Profile completion calculation
export const calculateProfileCompletion = async (userId: string): Promise<ProfileCompletion> => {
  try {
    const profile = await getProfile(userId)
    if (!profile) {
      return {
        percentage: 0,
        completed_steps: [],
        missing_steps: ['basic_info'],
        total_points: 0,
        max_points: 100
      }
    }

    const steps = [
      { id: 'basic_info', completed: !!(profile.first_name && profile.email), points: 15 },
      { id: 'profile_picture', completed: !!profile.profile_picture_url, points: 20 },
      { id: 'bio', completed: !!(profile.bio && profile.bio.length > 20), points: 15 },
      { id: 'location', completed: !!profile.location, points: 10 },
      { id: 'date_of_birth', completed: !!profile.date_of_birth, points: 10 },
      { id: 'interests', completed: !!(profile.interests && profile.interests.length >= 3), points: 15 },
      { id: 'verification', completed: profile.verification_status === 'verified', points: 10 },
      { id: 'preferences', completed: !!(profile.preferences?.looking_for), points: 5 }
    ]

    const completedSteps = steps.filter(step => step.completed)
    const missingSteps = steps.filter(step => !step.completed)
    const totalPoints = completedSteps.reduce((sum, step) => sum + step.points, 0)
    const maxPoints = steps.reduce((sum, step) => sum + step.points, 0)

    return {
      percentage: Math.round((totalPoints / maxPoints) * 100),
      completed_steps: completedSteps.map(s => s.id),
      missing_steps: missingSteps.map(s => s.id),
      total_points: totalPoints,
      max_points: maxPoints
    }
  } catch (error) {
    console.error('Error calculating profile completion:', error)
    return {
      percentage: 0,
      completed_steps: [],
      missing_steps: ['error'],
      total_points: 0,
      max_points: 100
    }
  }
}

// Search profiles with filters
export const searchProfiles = async (filters?: {
  query?: string
  age_range?: { min: number; max: number }
  location?: string[]
  interests?: string[]
  membership_tier?: 'free' | 'core' | 'premium'
  limit?: number
}): Promise<UserProfile[]> => {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('is_active', true)
      .eq('verification_status', 'verified')
    
    // Apply filters
    if (filters?.age_range) {
      const today = new Date()
      const minDate = new Date(today.getFullYear() - filters.age_range.max, today.getMonth(), today.getDate())
      const maxDate = new Date(today.getFullYear() - filters.age_range.min, today.getMonth(), today.getDate())
      query = query.gte('date_of_birth', minDate.toISOString().split('T')[0])
      query = query.lte('date_of_birth', maxDate.toISOString().split('T')[0])
    }

    if (filters?.membership_tier) {
      query = query.eq('membership_tier', filters.membership_tier)
    }

    if (filters?.location?.length) {
      // Use proper parameterized queries to prevent SQL injection
      const locationConditions = filters.location.map((loc, index) => {
        // Escape and sanitize location strings
        const sanitizedLocation = loc.replace(/[%_]/g, '\\$&').substring(0, 50)
        return `location.ilike.%${sanitizedLocation}%`
      })
      
      if (locationConditions.length > 0) {
        query = query.or(locationConditions.join(','))
      }
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) throw error

    // Filter by text search if provided
    let results = data || []
    if (filters?.query) {
      const searchTerm = filters.query.toLowerCase()
      results = results.filter(profile => 
        profile.first_name?.toLowerCase().includes(searchTerm) ||
        profile.last_name?.toLowerCase().includes(searchTerm) ||
        profile.bio?.toLowerCase().includes(searchTerm) ||
        profile.location?.toLowerCase().includes(searchTerm)
      )
    }

    return results
  } catch (error) {
    console.error('Error searching profiles:', error)
    return []
  }
}

// File upload helpers
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)
  
  if (error) throw error
  return data
}

export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

// Image validation and compression utilities
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WebP image' }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 5MB' }
  }
  
  return { valid: true }
}

export const compressImage = async (file: File, maxWidth: number = 1000, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          })
          resolve(compressedFile)
        } else {
          resolve(file)
        }
      }, file.type, quality)
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Transport Service Types
export interface TransportService {
  id: string
  service_name: string
  service_type: 'executive' | 'tourism' | 'airport' | 'events' | 'business' | 'personal'
  description?: string
  base_hourly_rate: number
  minimum_hours: number
  day_rate?: number
  minimum_day_hours: number
  call_out_fee: number
  peak_time_multiplier: number
  currency: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TransportVehicle {
  id: string
  make: string
  model: string
  year: number
  category: 'executive' | 'luxury' | 'premium' | 'standard'
  max_passengers: number
  features: string[]
  image_url?: string
  hourly_rate_premium: number
  is_active: boolean
  created_at: string
}

export interface TransportDriver {
  id: string
  first_name: string
  last_name: string
  license_number: string
  languages_spoken: string[]
  years_experience: number
  specializations: string[]
  background_check_date: string
  profile_picture_url?: string
  hourly_rate_premium: number
  is_active: boolean
  created_at: string
}

export interface TransportPricingTier {
  id: string
  tier_name: string
  block_hours_min: number
  block_hours_max?: number
  discount_percentage: number
  description?: string
  is_active: boolean
  created_at: string
}

export interface TransportPeakTime {
  id: string
  name: string
  start_time: string
  end_time: string
  days_of_week: number[]
  multiplier: number
  description?: string
  is_active: boolean
  created_at: string
}

export interface TransportBooking {
  id: string
  booking_reference: string
  customer_id: string
  service_id: string
  vehicle_id?: string
  driver_id?: string
  booking_type: 'hourly' | 'day_rate' | 'block_booking' | 'airport_transfer'
  pickup_datetime: string
  pickup_location: string
  pickup_postcode?: string
  dropoff_location?: string
  dropoff_postcode?: string
  
  // Pricing details
  base_hours: number
  actual_hours?: number
  hourly_rate: number
  day_rate_applied?: number
  call_out_fee: number
  peak_time_charges: number
  block_discount_percentage: number
  vehicle_premium: number
  driver_premium: number
  subtotal: number
  member_discount_percentage: number
  member_discount_amount: number
  total_amount: number
  currency: string
  
  // Customer details
  customer_notes?: string
  special_requirements?: string
  passenger_count: number
  customer_phone?: string
  customer_email?: string
  
  // Status
  status: 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  payment_status: 'pending' | 'paid' | 'partial' | 'refunded' | 'failed'
  payment_method?: string
  stripe_payment_intent_id?: string
  
  created_at: string
  updated_at: string
  confirmed_at?: string
  completed_at?: string
}

export interface TransportBookingExtra {
  id: string
  booking_id: string
  extra_type: string
  description: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

export interface TransportAvailability {
  id: string
  driver_id?: string
  vehicle_id?: string
  start_datetime: string
  end_datetime: string
  availability_type: 'available' | 'busy' | 'maintenance' | 'unavailable'
  notes?: string
  created_at: string
}

// Pricing calculation interfaces
export interface PricingCalculationRequest {
  service_id: string
  vehicle_id?: string
  driver_id?: string
  pickup_datetime: string
  hours: number
  booking_type: 'hourly' | 'day_rate' | 'block_booking' | 'airport_transfer'
  membership_tier?: 'free' | 'core' | 'premium'
  passenger_count?: number
  extras?: { type: string; quantity: number }[]
}

export interface PricingCalculationResult {
  base_rate: number
  hours: number
  subtotal: number
  call_out_fee: number
  peak_time_charges: number
  block_discount: {
    applicable: boolean
    percentage: number
    amount: number
  }
  vehicle_premium: number
  driver_premium: number
  member_discount: {
    applicable: boolean
    percentage: number
    amount: number
  }
  extras_total: number
  total_amount: number
  currency: string
  breakdown: {
    description: string
    amount: number
    type: 'charge' | 'discount'
  }[]
}

// Premium Membership System Types
export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing'
  plan_type: 'yearly'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  current_period_start?: string
  current_period_end?: string
  trial_end?: string
  amount: number
  currency: string
  created_at: string
  updated_at: string
}

export interface MembershipBenefit {
  id: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  benefit_type: 'service_discount' | 'cultural_events' | 'business_networking' | 'concierge_support' | 'premium_access'
  benefit_name: string
  benefit_description?: string
  benefit_value?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface MembershipUsage {
  id: string
  user_id: string
  subscription_id: string
  benefit_type: string
  usage_date: string
  service_type?: string
  discount_applied?: number
  amount_saved?: number
  notes?: string
  created_at: string
}

export interface PortugueseCommunityPartnership {
  id: string
  partner_name: string
  partner_type: 'chamber_of_commerce' | 'cultural_institute' | 'business_association' | 'community_organization'
  partnership_description?: string
  member_benefits?: string
  required_tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
  contact_info?: any
  is_active: boolean
  created_at: string
  updated_at: string
}

export type MembershipTier = 'basic' | 'student' | 'professional' | 'business' | 'vip'

export interface MembershipTierConfig {
  tier: MembershipTier
  name: string
  namePortuguese: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  descriptionPortuguese: string
  color: string
  icon: string
  features: string[]
  featuresPortuguese: string[]
  limits: {
    dailyMatches: number
    monthlyMessages: number
    premiumEvents: number
    livestreamHours: number
  }
  popular?: boolean
  studentDiscount?: number
}

// Membership utility functions
export const getMembershipTierConfig = (tier: MembershipTier): MembershipTierConfig => {
  const configs: Record<MembershipTier, MembershipTierConfig> = {
    basic: {
      tier: 'basic',
      name: 'Basic',
      namePortuguese: 'Básico',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Basic community access with limited features',
      descriptionPortuguese: 'Acesso básico à comunidade com funcionalidades limitadas',
      color: 'gray',
      icon: 'UserIcon',
      features: [
        '5 matches per day',
        '20 messages per month',
        'Basic community events',
        'Profile browsing'
      ],
      featuresPortuguese: [
        '5 matches por dia',
        '20 mensagens por mês',
        'Eventos básicos da comunidade',
        'Navegação de perfis'
      ],
      limits: {
        dailyMatches: 5,
        monthlyMessages: 20,
        premiumEvents: 0,
        livestreamHours: 0
      }
    },
    student: {
      tier: 'student',
      name: 'Student',
      namePortuguese: 'Estudante',
      monthlyPrice: 1250, // £12.50
      yearlyPrice: 12500, // £125 (50% off regular)
      description: 'Special pricing for university students with verification',
      descriptionPortuguese: 'Preços especiais para estudantes universitários com verificação',
      color: 'blue',
      icon: 'AcademicCapIcon',
      features: [
        '50 matches per day',
        '100 messages per month',
        '2 premium events per month',
        '5 hours livestream access',
        'University partnerships',
        'Student network access'
      ],
      featuresPortuguese: [
        '50 matches por dia',
        '100 mensagens por mês',
        '2 eventos premium por mês',
        '5 horas de acesso a livestream',
        'Parcerias universitárias',
        'Acesso à rede de estudantes'
      ],
      limits: {
        dailyMatches: 50,
        monthlyMessages: 100,
        premiumEvents: 2,
        livestreamHours: 5
      },
      studentDiscount: 50
    },
    professional: {
      tier: 'professional',
      name: 'Professional',
      namePortuguese: 'Profissional',
      monthlyPrice: 2500, // £25
      yearlyPrice: 25000, // £250
      description: 'Full access for Portuguese professionals in London',
      descriptionPortuguese: 'Acesso completo para profissionais portugueses em Londres',
      color: 'primary',
      icon: 'BriefcaseIcon',
      features: [
        'Unlimited matches',
        'Unlimited messages',
        '5 premium events per month',
        '10 hours livestream access',
        'Professional networking',
        'Business directory listing'
      ],
      featuresPortuguese: [
        'Matches ilimitados',
        'Mensagens ilimitadas',
        '5 eventos premium por mês',
        '10 horas de acesso a livestream',
        'Networking profissional',
        'Listagem no diretório de negócios'
      ],
      limits: {
        dailyMatches: -1,
        monthlyMessages: -1,
        premiumEvents: 5,
        livestreamHours: 10
      },
      popular: true
    },
    business: {
      tier: 'business',
      name: 'Business',
      namePortuguese: 'Negócios',
      monthlyPrice: 9900, // £99
      yearlyPrice: 99000, // £990
      description: 'Corporate networking and partnership tools',
      descriptionPortuguese: 'Ferramentas de networking empresarial e parcerias',
      color: 'amber',
      icon: 'BuildingOfficeIcon',
      features: [
        'Unlimited everything',
        '25 hours livestream access',
        'Corporate event hosting',
        'Partnership opportunities',
        'Bulk employee accounts',
        'Business analytics'
      ],
      featuresPortuguese: [
        'Tudo ilimitado',
        '25 horas de acesso a livestream',
        'Hospedagem de eventos corporativos',
        'Oportunidades de parceria',
        'Contas em massa para funcionários',
        'Análises de negócios'
      ],
      limits: {
        dailyMatches: -1,
        monthlyMessages: -1,
        premiumEvents: -1,
        livestreamHours: 25
      }
    },
    vip: {
      tier: 'vip',
      name: 'VIP',
      namePortuguese: 'VIP',
      monthlyPrice: 24900, // £249
      yearlyPrice: 249000, // £2490
      description: 'Exclusive VIP experiences and priority access',
      descriptionPortuguese: 'Experiências VIP exclusivas e acesso prioritário',
      color: 'purple',
      icon: 'CrownIcon',
      features: [
        'Everything unlimited',
        'VIP events and experiences',
        'Personal concierge service',
        'Priority matching algorithm',
        'Exclusive networking events',
        'Direct access to founders'
      ],
      featuresPortuguese: [
        'Tudo ilimitado',
        'Eventos e experiências VIP',
        'Serviço de concierge pessoal',
        'Algoritmo de matching prioritário',
        'Eventos de networking exclusivos',
        'Acesso direto aos fundadores'
      ],
      limits: {
        dailyMatches: -1,
        monthlyMessages: -1,
        premiumEvents: -1,
        livestreamHours: -1
      }
    }
  }
  
  return configs[tier]
}

// Cultural Preferences Types
export interface CulturalPreferences {
  id: string
  user_id: string
  origins: string[]
  language_preference: string
  cultural_celebrations: string[]
  professional_goals: string[]
  cultural_values: Record<string, number>
  lifestyle_preferences: string[]
  compatibility_score?: number
  cultural_depth_score?: number
  community_engagement_score?: number
  completed_at: string
  last_updated: string
  quiz_version: string
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
  compatibility_insights: string[]
  shared_elements: string[]
  calculated_at: string
  last_updated: string
}

// Cultural Preferences Functions
export const getCulturalPreferences = async (userId: string): Promise<CulturalPreferences | null> => {
  try {
    const { data, error } = await supabase
      .from('cultural_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error fetching cultural preferences:', error)
    return null
  }
}

export const saveCulturalPreferences = async (
  userId: string, 
  preferences: {
    origins: string[]
    language_preference: string
    cultural_celebrations: string[]
    professional_goals: string[]
    cultural_values: Record<string, number>
    lifestyle_preferences: string[]
  }
) => {
  try {
    const { data, error } = await supabase
      .from('cultural_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        last_updated: new Date().toISOString(),
        quiz_version: '1.0'
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Trigger compatibility calculation for this user
    try {
      await supabase.rpc('update_user_compatibility_scores', {
        target_user_id: userId
      })
    } catch (compatError) {
      console.warn('Failed to update compatibility scores:', compatError)
      // Don't fail the main operation if compatibility calculation fails
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Error saving cultural preferences:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export const getCulturalCompatibility = async (
  userAId: string, 
  userBId: string
): Promise<CulturalCompatibility | null> => {
  try {
    const { data, error } = await supabase
      .from('cultural_compatibility')
      .select('*')
      .eq('user_a_id', userAId)
      .eq('user_b_id', userBId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    return data
  } catch (error) {
    console.error('Error fetching cultural compatibility:', error)
    return null
  }
}

export const getTopCulturalMatches = async (
  userId: string, 
  limit: number = 10
): Promise<Array<CulturalCompatibility & { profile: UserProfile }> | []> => {
  try {
    const { data, error } = await supabase
      .from('cultural_compatibility')
      .select(`
        *,
        profile:profiles!cultural_compatibility_user_b_id_fkey(*)
      `)
      .eq('user_a_id', userId)
      .order('overall_compatibility', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching top cultural matches:', error)
    return []
  }
}

export const getPortugueseCulturalElements = async () => {
  try {
    const { data, error } = await supabase
      .from('portuguese_cultural_elements')
      .select('*')
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching Portuguese cultural elements:', error)
    return []
  }
}

export const getCulturalInsights = async () => {
  try {
    const { data, error } = await supabase
      .from('cultural_insights')
      .select('*')
      .eq('is_active', true)
      .order('category')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching cultural insights:', error)
    return []
  }
}