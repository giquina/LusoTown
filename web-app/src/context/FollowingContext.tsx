'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { supabase, getCurrentUser } from '@/lib/supabase'
import { useAuthRequired } from '@/hooks/useAuthRequired'

export interface FollowableEntity {
  id: string
  type: 'person' | 'group' | 'community' | 'event_organizer' | 'portuguese_nation'
  name: string
  title?: string
  description?: string
  imageUrl?: string
  location?: string
  category?: string
  followers?: number
  isVerified?: boolean
  culturalFocus?: string[] // Lusophone cultural interests
  lastActive?: string
  // Lusophone nation specific fields
  countryCode?: string // For portuguese_nation type
  capital?: string
  language?: string
  currency?: string
  benefits?: string[] // What following this nation provides
  upcomingEvents?: number
  businessOpportunities?: number
}

export interface FollowBenefits {
  notifications: string[]
  events: string[]
  networking: string[]
  opportunities: string[]
  content: string[]
}

export interface Following {
  id?: string // Database ID
  entity: FollowableEntity
  followedAt: string
  notificationsEnabled: boolean
  userId?: string // For database storage
}

interface FollowingContextType {
  following: Following[]
  followEntity: (entity: FollowableEntity) => Promise<boolean>
  unfollowEntity: (entityId: string) => Promise<boolean>
  isFollowing: (entityId: string) => boolean
  toggleFollow: (entity: FollowableEntity) => Promise<boolean>
  toggleNotifications: (entityId: string) => Promise<boolean>
  getFollowingByType: (type: FollowableEntity['type']) => Following[]
  getFollowingSuggestions: () => FollowableEntity[]
  getTotalFollowingCount: () => number
  getFollowingStats: () => {
    people: number
    groups: number
    communities: number
    eventOrganizers: number
    portugueseNations: number
  }
  getFollowBenefits: (entityType: FollowableEntity['type']) => FollowBenefits
  loading: boolean
  isAuthenticated: boolean
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined)

export function FollowingProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<Following[]>([])
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { requireAuth } = useAuthRequired()

  // Load following data from database on mount
  useEffect(() => {
    loadFollowingData()
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const user = await getCurrentUser()
      setIsAuthenticated(!!user)
    } catch {
      setIsAuthenticated(false)
    }
  }

  const loadFollowingData = async () => {
    if (!isAuthenticated) return
    
    setLoading(true)
    try {
      const user = await getCurrentUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_following')
        .select(`
          id,
          entity_id,
          entity_type,
          notifications_enabled,
          followed_at,
          entity_data
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)

      if (error) throw error

      const followingData: Following[] = (data || []).map(item => ({
        id: item.id,
        entity: {
          id: item.entity_id,
          type: item.entity_type,
          ...item.entity_data
        },
        followedAt: item.followed_at,
        notificationsEnabled: item.notifications_enabled,
        userId: user.id
      }))

      setFollowing(followingData)
    } catch (error) {
      console.error('Error loading following data:', error)
    } finally {
      setLoading(false)
    }
  }

  const followEntity = (entity: FollowableEntity) => {
    setFollowing(prev => {
      // Prevent duplicates
      if (prev.some(f => f.entity.id === entity.id)) {
        return prev
      }
      return [...prev, {
        entity,
        followedAt: new Date().toISOString(),
        notificationsEnabled: true
      }]
    })
  }

  const unfollowEntity = (entityId: string) => {
    setFollowing(prev => prev.filter(f => f.entity.id !== entityId))
  }

  const isFollowing = (entityId: string) => {
    return following.some(f => f.entity.id === entityId)
  }

  const toggleFollow = (entity: FollowableEntity) => {
    if (isFollowing(entity.id)) {
      unfollowEntity(entity.id)
    } else {
      followEntity(entity)
    }
  }

  const toggleNotifications = (entityId: string) => {
    setFollowing(prev => prev.map(f => 
      f.entity.id === entityId 
        ? { ...f, notificationsEnabled: !f.notificationsEnabled }
        : f
    ))
  }

  const getFollowingByType = (type: FollowableEntity['type']) => {
    return following.filter(f => f.entity.type === type)
  }

  const getTotalFollowingCount = () => {
    return following.length
  }

  const getFollowingStats = () => {
    const stats = {
      people: 0,
      groups: 0,
      communities: 0,
      eventOrganizers: 0
    }

    following.forEach(f => {
      switch (f.entity.type) {
        case 'person':
          stats.people++
          break
        case 'group':
          stats.groups++
          break
        case 'community':
          stats.communities++
          break
        case 'event_organizer':
          stats.eventOrganizers++
          break
      }
    })

    return stats
  }

  // Mock suggestions based on Lusophone cultural interests
  const getFollowingSuggestions = (): FollowableEntity[] => {
    const suggestions: FollowableEntity[] = [
      {
        id: 'person-maria-santos',
        type: 'person',
        name: 'Maria Santos',
        description: 'Cultural events organizer and Fado enthusiast',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=150&h=150&fit=crop&crop=face&auto=format',
        location: 'London, United Kingdom',
        followers: 245,
        isVerified: true,
        culturalFocus: ['Fado', 'Lusophone Music', 'Cultural Events'],
        lastActive: '2 hours ago'
      },
      {
        id: 'group-fado-london',
        type: 'group',
        name: 'Fado Lovers London',
        title: 'Traditional Lusophone Music Community',
        description: 'Dedicated to preserving and celebrating Fado music in London',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&auto=format',
        location: 'London, United Kingdom',
        followers: 1240,
        category: 'Music & Culture',
        culturalFocus: ['Fado', 'Lusophone Music', 'Traditional Culture']
      },
      {
        id: 'community-portuguese-families-uk',
        type: 'community',
        name: 'Lusophone Families United Kingdom',
        title: 'Supporting Lusophone families across Britain',
        description: 'A supportive community for Lusophone families living in the United Kingdom',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150&h=150&fit=crop&auto=format',
        location: 'United Kingdom',
        followers: 2180,
        category: 'Family & Community',
        culturalFocus: ['Family Support', 'Language Preservation', 'Cultural Identity']
      },
      {
        id: 'organizer-carlos-events',
        type: 'event_organizer',
        name: 'Carlos Oliveira Events',
        title: 'Lusophone Cultural Events Organizer',
        description: 'Organizing authentic Lusophone cultural experiences across London',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
        location: 'London, United Kingdom',
        followers: 892,
        isVerified: true,
        culturalFocus: ['Lusophone Cuisine', 'Cultural Festivals', 'Community Events']
      },
      {
        id: 'group-portuguese-business-network',
        type: 'group',
        name: 'Lusophone Business Network United Kingdom',
        title: 'Connecting Lusophone entrepreneurs',
        description: 'Network of Portuguese business owners and entrepreneurs in the United Kingdom',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop&auto=format',
        location: 'United Kingdom',
        followers: 756,
        category: 'Business & Professional',
        culturalFocus: ['Business Networking', 'Entrepreneurship', 'Economic Growth']
      },
      {
        id: 'person-ana-cultural',
        type: 'person',
        name: 'Ana Pereira',
        description: 'Lusophone literature enthusiast and book club organizer',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
        location: 'London, United Kingdom',
        followers: 423,
        culturalFocus: ['Lusophone Literature', 'Language Education', 'Book Clubs'],
        lastActive: '5 hours ago'
      }
    ]

    // Filter out entities already being followed
    return suggestions.filter(suggestion => !isFollowing(suggestion.id))
  }

  return (
    <FollowingContext.Provider value={{
      following,
      followEntity,
      unfollowEntity,
      isFollowing,
      toggleFollow,
      toggleNotifications,
      getFollowingByType,
      getFollowingSuggestions,
      getTotalFollowingCount,
      getFollowingStats
    }}>
      {children}
    </FollowingContext.Provider>
  )
}

export function useFollowing() {
  const context = useContext(FollowingContext)
  if (context === undefined) {
    throw new Error('useFollowing must be used within a FollowingProvider')
  }
  return context
}