'use client'

import { supabase, Profile } from '@/lib/supabase'
import { User, authService } from '@/lib/auth'
import { UserProfile, connectionService } from '@/lib/connections'

export interface ProfileCompletionStep {
  id: string
  name: string
  completed: boolean
  required: boolean
  points: number
}

export interface ProfileStats {
  completionPercentage: number
  totalPoints: number
  maxPoints: number
  completedSteps: number
  totalSteps: number
}

export interface PhotoUpload {
  id: string
  file: File
  preview: string
  caption?: string
  isProfilePicture: boolean
  uploadProgress: number
  status: 'uploading' | 'completed' | 'error'
}

export interface ProfileFormData {
  name: string
  bio: string
  location: string
  age: number
  interests: string[]
  lookingFor: 'friendship' | 'activity_partners' | 'networking' | 'all'
  ageRange: { min: number; max: number }
  preferredLocations: string[]
  privacy: {
    showAge: boolean
    showLocation: boolean
    allowMessages: 'everyone' | 'connections' | 'premium'
    profileVisibility: 'public' | 'members_only' | 'connections_only'
  }
}

// Available interests for profile setup
export const INTEREST_CATEGORIES = {
  'Social & Networking': [
    'Networking', 'Coffee Chats', 'Dinner Parties', 'Happy Hour',
    'Wine Tasting', 'Book Clubs', 'Game Nights', 'Meetups'
  ],
  'Health & Wellness': [
    'Yoga', 'Pilates', 'Gym & Fitness', 'Running', 'Cycling',
    'Meditation', 'Wellness Retreats', 'Healthy Cooking'
  ],
  'Arts & Culture': [
    'Art Galleries', 'Museums', 'Theatre', 'Concerts', 'Photography',
    'Poetry', 'Creative Writing', 'Film & Cinema', 'Dancing'
  ],
  'Outdoor & Adventure': [
    'Hiking', 'Rock Climbing', 'Camping', 'Water Sports',
    'Travel Adventures', 'Nature Walks', 'Outdoor Photography'
  ],
  'Food & Dining': [
    'Restaurant Tours', 'Cooking Classes', 'Food Markets',
    'Brunch', 'Vegetarian/Vegan', 'International Cuisine'
  ],
  'Professional & Learning': [
    'Career Development', 'Entrepreneurship', 'Public Speaking',
    'Languages', 'Online Courses', 'Workshops', 'Conferences'
  ]
}

export const ALL_INTERESTS = Object.values(INTEREST_CATEGORIES).flat()

// London areas for location preferences
export const LONDON_AREAS = [
  'Central London', 'Westminster', 'City of London', 'Camden',
  'Islington', 'Hackney', 'Tower Hamlets', 'Greenwich', 'Lewisham',
  'Southwark', 'Lambeth', 'Wandsworth', 'Hammersmith & Fulham',
  'Kensington & Chelsea', 'Chelsea', 'Kensington', 'Notting Hill',
  'Paddington', 'Marylebone', 'Fitzrovia', 'Covent Garden',
  'Shoreditch', 'Canary Wharf', 'Borough', 'Clapham', 'Battersea',
  'Wimbledon', 'Richmond', 'Kingston', 'Croydon'
]

export class ProfileService {
  private static instance: ProfileService

  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  // Profile completion tracking
  calculateProfileCompletion(user: User, profile?: UserProfile): ProfileStats {
    const steps: ProfileCompletionStep[] = [
      {
        id: 'basic_info',
        name: 'Basic Information',
        completed: !!(user.name && user.email),
        required: true,
        points: 15
      },
      {
        id: 'profile_picture',
        name: 'Profile Picture',
        completed: !!user.profileImage,
        required: true,
        points: 20
      },
      {
        id: 'bio',
        name: 'About Me',
        completed: !!(profile?.bio && profile.bio.length > 20),
        required: true,
        points: 15
      },
      {
        id: 'location',
        name: 'Location',
        completed: !!user.location,
        required: true,
        points: 10
      },
      {
        id: 'interests',
        name: 'Interests',
        completed: !!(user.interests && user.interests.length >= 3),
        required: true,
        points: 15
      },
      {
        id: 'preferences',
        name: 'Connection Preferences',
        completed: !!(profile?.preferences?.lookingFor),
        required: false,
        points: 10
      },
      {
        id: 'additional_photos',
        name: 'Photo Gallery',
        completed: !!(profile?.photos && profile.photos.length >= 2),
        required: false,
        points: 10
      },
      {
        id: 'verification',
        name: 'Profile Verification',
        completed: !!(profile?.verification?.emailVerified && profile.verification.photoVerified),
        required: false,
        points: 5
      }
    ]

    const completedSteps = steps.filter(step => step.completed).length
    const totalSteps = steps.length
    const requiredSteps = steps.filter(step => step.required)
    const completedRequiredSteps = requiredSteps.filter(step => step.completed).length
    
    const totalPoints = steps.filter(step => step.completed).reduce((sum, step) => sum + step.points, 0)
    const maxPoints = steps.reduce((sum, step) => sum + step.points, 0)
    
    // Completion percentage based on points
    const completionPercentage = Math.round((totalPoints / maxPoints) * 100)

    return {
      completionPercentage,
      totalPoints,
      maxPoints,
      completedSteps,
      totalSteps
    }
  }

  // Get profile completion steps with current status
  getProfileSteps(user: User, profile?: UserProfile): ProfileCompletionStep[] {
    const stats = this.calculateProfileCompletion(user, profile)
    
    return [
      {
        id: 'basic_info',
        name: 'Basic Information',
        completed: !!(user.name && user.email),
        required: true,
        points: 15
      },
      {
        id: 'profile_picture',
        name: 'Profile Picture',
        completed: !!user.profileImage,
        required: true,
        points: 20
      },
      {
        id: 'bio',
        name: 'About Me',
        completed: !!(profile?.bio && profile.bio.length > 20),
        required: true,
        points: 15
      },
      {
        id: 'location',
        name: 'Location',
        completed: !!user.location,
        required: true,
        points: 10
      },
      {
        id: 'interests',
        name: 'Interests',
        completed: !!(user.interests && user.interests.length >= 3),
        required: true,
        points: 15
      },
      {
        id: 'preferences',
        name: 'Connection Preferences',
        completed: !!(profile?.preferences?.lookingFor),
        required: false,
        points: 10
      },
      {
        id: 'additional_photos',
        name: 'Photo Gallery',
        completed: !!(profile?.photos && profile.photos.length >= 2),
        required: false,
        points: 10
      },
      {
        id: 'verification',
        name: 'Profile Verification',
        completed: !!(profile?.verification?.emailVerified && profile.verification.photoVerified),
        required: false,
        points: 5
      }
    ]
  }

  // Image compression utility
  async compressImage(file: File, maxWidth: number = 1000, quality: number = 0.8): Promise<File> {
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

  // Validate image file
  validateImage(file: File): { valid: boolean; error?: string } {
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

  // Create photo upload object
  createPhotoUpload(file: File, isProfilePicture: boolean = false): PhotoUpload {
    return {
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      isProfilePicture,
      uploadProgress: 0,
      status: 'uploading'
    }
  }

  // Simulate photo upload (replace with real upload logic)
  async uploadPhoto(photoUpload: PhotoUpload, onProgress?: (progress: number) => void): Promise<{ success: boolean; url?: string; error?: string }> {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      onProgress?.(progress)
    }
    
    // Simulate successful upload
    const mockUrl = `/uploads/photos/${photoUpload.id}.${photoUpload.file.type.split('/')[1]}`
    return { success: true, url: mockUrl }
  }

  // Update user profile
  async updateProfile(userId: string, updates: Partial<ProfileFormData>): Promise<{ success: boolean; message: string }> {
    try {
      const user = authService.getCurrentUser()
      if (!user || user.id !== userId) {
        return { success: false, message: 'Unauthorized' }
      }

      // Update user data in auth service
      await authService.updateProfile({
        name: updates.name,
        location: updates.location,
        interests: updates.interests
      })

      // In a real app, you'd update the profile in your database
      // For now, we'll just simulate success
      return { success: true, message: 'Profile updated successfully' }
    } catch (error) {
      return { success: false, message: 'Failed to update profile' }
    }
  }

  // Get profile by user ID
  async getProfile(userId: string): Promise<UserProfile | null> {
    return await connectionService.getProfile(userId)
  }

  // Search profiles with filters
  async searchProfiles(query: string, filters?: {
    ageRange?: { min: number; max: number }
    location?: string[]
    interests?: string[]
    membershipTier?: 'free' | 'core' | 'premium'
  }): Promise<UserProfile[]> {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) return []

    const allProfiles = await connectionService.discoverProfiles(currentUser.id, filters)
    
    if (!query.trim()) return allProfiles

    // Filter by search query
    const searchTerm = query.toLowerCase()
    return allProfiles.filter(profile => 
      profile.name.toLowerCase().includes(searchTerm) ||
      profile.bio.toLowerCase().includes(searchTerm) ||
      profile.location.toLowerCase().includes(searchTerm) ||
      profile.interests.some(interest => interest.toLowerCase().includes(searchTerm))
    )
  }

  // Get profile recommendations
  async getRecommendedProfiles(userId: string, limit: number = 10): Promise<UserProfile[]> {
    const user = authService.getCurrentUser()
    if (!user) return []

    const userProfile = await this.getProfile(userId)
    if (!userProfile) return []

    // Get profiles with similar interests
    const allProfiles = await connectionService.discoverProfiles(userId)
    
    // Score profiles based on common interests and other factors
    const scoredProfiles = allProfiles.map(profile => {
      let score = 0
      
      // Common interests (40 points max)
      const commonInterests = profile.interests.filter(interest =>
        userProfile.interests.some(userInterest => 
          userInterest.toLowerCase().includes(interest.toLowerCase())
        )
      )
      score += commonInterests.length * 10
      
      // Same membership tier (10 points)
      if (profile.membershipTier === userProfile.membershipTier) {
        score += 10
      }
      
      // Similar age (20 points max)
      const ageDiff = Math.abs(profile.age - userProfile.age)
      if (ageDiff <= 5) score += 20
      else if (ageDiff <= 10) score += 10
      
      // Same area (15 points)
      if (profile.location.includes(userProfile.location.split(',')[0])) {
        score += 15
      }
      
      // Active user (5 points)
      const daysSinceActive = Math.floor((Date.now() - new Date(profile.lastActive).getTime()) / (1000 * 60 * 60 * 24))
      if (daysSinceActive <= 7) score += 5
      
      return { ...profile, matchScore: score }
    })
    
    // Sort by score and return top matches
    return scoredProfiles
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)
  }
}

export const profileService = ProfileService.getInstance()