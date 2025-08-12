import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

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
  is_private: boolean
  max_members?: number
  current_member_count: number
  created_by: string
  image_url?: string
  rules?: string
  is_active: boolean
  created_at: string
  updated_at: string
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
      // Use ilike for partial location matching
      const locationFilter = filters.location.map(loc => `location.ilike.%${loc}%`).join(',')
      query = query.or(locationFilter)
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