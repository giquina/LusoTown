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
  culturalFocus?: string[] // Portuguese cultural interests
  lastActive?: string
  // Portuguese nation specific fields
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

// Create a safe wrapper for useAuthRequired that handles SSG
function useAuthRequiredSafe() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  try {
    const authRequired = useAuthRequired()
    return {
      ...authRequired,
      isClient
    }
  } catch (error) {
    // Fallback for SSG when AuthPopupProvider is not available
    return {
      requireAuth: () => {},
      requireAuthForCart: () => {},
      requireAuthForDetails: () => {},
      isAuthenticated: false,
      isClient
    }
  }
}

export function FollowingProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<Following[]>([])
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { requireAuth, isClient } = useAuthRequiredSafe()

  // Load following data from database on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadFollowingData()
    }
  }, [isAuthenticated])

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

      // For now, we'll simulate database behavior with localStorage
      // but structure it for easy migration to actual database
      const savedFollowing = localStorage.getItem(`lusotown-following-${user.id}`)
      if (savedFollowing) {
        try {
          setFollowing(JSON.parse(savedFollowing))
        } catch (error) {
          console.error('Error parsing saved following data:', error)
        }
      }
    } catch (error) {
      console.error('Error loading following data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveFollowingData = async (newFollowing: Following[]) => {
    if (!isAuthenticated) return
    
    try {
      const user = await getCurrentUser()
      if (user) {
        localStorage.setItem(`lusotown-following-${user.id}`, JSON.stringify(newFollowing))
      }
    } catch (error) {
      console.error('Error saving following data:', error)
    }
  }

  const followEntity = async (entity: FollowableEntity): Promise<boolean> => {
    if (!isAuthenticated) {
      // Only show auth popup on client-side
      if (isClient) {
        requireAuth(() => followEntity(entity), 'view-details', {
          type: 'follow',
          data: { entityName: entity.name, entityType: entity.type }
        })
      }
      return false
    }

    try {
      const user = await getCurrentUser()
      if (!user) return false

      // Check if already following
      if (following.some(f => f.entity.id === entity.id)) {
        return true
      }

      const newFollowing: Following = {
        id: `follow-${Date.now()}`,
        entity,
        followedAt: new Date().toISOString(),
        notificationsEnabled: true,
        userId: user.id
      }

      const updatedFollowing = [...following, newFollowing]
      setFollowing(updatedFollowing)
      await saveFollowingData(updatedFollowing)
      
      return true
    } catch (error) {
      console.error('Error following entity:', error)
      return false
    }
  }

  const unfollowEntity = async (entityId: string): Promise<boolean> => {
    if (!isAuthenticated) return false

    try {
      const updatedFollowing = following.filter(f => f.entity.id !== entityId)
      setFollowing(updatedFollowing)
      await saveFollowingData(updatedFollowing)
      return true
    } catch (error) {
      console.error('Error unfollowing entity:', error)
      return false
    }
  }

  const isFollowing = (entityId: string) => {
    return following.some(f => f.entity.id === entityId)
  }

  const toggleFollow = async (entity: FollowableEntity): Promise<boolean> => {
    if (isFollowing(entity.id)) {
      return await unfollowEntity(entity.id)
    } else {
      return await followEntity(entity)
    }
  }

  const toggleNotifications = async (entityId: string): Promise<boolean> => {
    if (!isAuthenticated) return false

    try {
      const updatedFollowing = following.map(f => 
        f.entity.id === entityId 
          ? { ...f, notificationsEnabled: !f.notificationsEnabled }
          : f
      )
      
      setFollowing(updatedFollowing)
      await saveFollowingData(updatedFollowing)
      return true
    } catch (error) {
      console.error('Error toggling notifications:', error)
      return false
    }
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
      eventOrganizers: 0,
      portugueseNations: 0
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
        case 'portuguese_nation':
          stats.portugueseNations++
          break
      }
    })

    return stats
  }

  const getFollowBenefits = (entityType: FollowableEntity['type']): FollowBenefits => {
    const benefitsMap: Record<FollowableEntity['type'], FollowBenefits> = {
      person: {
        notifications: ['New posts and updates', 'Event invitations', 'Direct messages'],
        events: ['Exclusive meetups', 'Personal events', 'Networking opportunities'],
        networking: ['Professional connections', 'Cultural exchanges', 'Mentorship'],
        opportunities: ['Job referrals', 'Business partnerships', 'Cultural projects'],
        content: ['Personal stories', 'Cultural insights', 'Professional tips']
      },
      group: {
        notifications: ['New group activities', 'Member discussions', 'Event announcements'],
        events: ['Group meetups', 'Cultural celebrations', 'Educational workshops'],
        networking: ['Group members network', 'Collaborative projects', 'Skill sharing'],
        opportunities: ['Group partnerships', 'Community projects', 'Volunteer opportunities'],
        content: ['Group discussions', 'Shared resources', 'Cultural content']
      },
      community: {
        notifications: ['Community updates', 'Important announcements', 'Cultural celebrations'],
        events: ['Community festivals', 'Cultural workshops', 'Social gatherings'],
        networking: ['Community leaders', 'Local businesses', 'Cultural organizations'],
        opportunities: ['Community projects', 'Cultural exchanges', 'Local partnerships'],
        content: ['Community news', 'Cultural heritage', 'Local insights']
      },
      event_organizer: {
        notifications: ['New events', 'Early bird tickets', 'Exclusive invitations'],
        events: ['Premium events', 'VIP access', 'Meet & greets'],
        networking: ['Event attendees', 'Industry professionals', 'Cultural personalities'],
        opportunities: ['Event partnerships', 'Speaking opportunities', 'Cultural collaborations'],
        content: ['Event updates', 'Cultural programming', 'Behind-the-scenes']
      },
      portuguese_nation: {
        notifications: ['Cultural celebrations', 'Economic updates', 'Tourism opportunities', 'Embassy events'],
        events: ['National holidays', 'Embassy events', 'Cultural festivals', 'Business summits'],
        networking: ['Nationals in London', 'Business networks', 'Cultural groups', 'Trade associations'],
        opportunities: ['Trade missions', 'Investment opportunities', 'Cultural exchanges', 'Business partnerships'],
        content: ['National news', 'Cultural heritage', 'Economic insights', 'Tourism highlights']
      }
    }
    
    return benefitsMap[entityType] || benefitsMap.person
  }

  // Enhanced suggestions with Portuguese-speaking nations
  const getFollowingSuggestions = (): FollowableEntity[] => {
    const suggestions: FollowableEntity[] = [
      // Portuguese-speaking nations
      {
        id: 'nation-portugal',
        type: 'portuguese_nation',
        name: 'Portugal',
        title: 'Republic of Portugal',
        description: 'Follow for cultural events, business opportunities, and community updates from Portugal in London',
        imageUrl: '/images/flags/portugal.png',
        location: 'Europe',
        followers: 2840,
        isVerified: true,
        countryCode: 'PT',
        capital: 'Lisbon',
        language: 'Portuguese',
        currency: 'EUR',
        culturalFocus: ['Fado', 'Port Wine', 'Azulejos', 'Maritime Heritage'],
        benefits: [
          'Portuguese Embassy event invitations',
          'Cultural festival notifications',
          'Business networking with Portuguese companies',
          'Tourism and travel opportunities',
          'Language and cultural workshops'
        ],
        upcomingEvents: 12,
        businessOpportunities: 28
      },
      {
        id: 'nation-brazil',
        type: 'portuguese_nation',
        name: 'Brazil',
        title: 'Federative Republic of Brazil',
        description: 'Connect with Brazilian culture, Carnival events, and business opportunities in London',
        imageUrl: '/images/flags/brazil.png',
        location: 'South America',
        followers: 1950,
        isVerified: true,
        countryCode: 'BR',
        capital: 'Brasília',
        language: 'Portuguese (Brazilian)',
        currency: 'BRL',
        culturalFocus: ['Carnival', 'Samba', 'Capoeira', 'Football'],
        benefits: [
          'Carnival celebration invites',
          'Brazilian business networking',
          'Capoeira and dance workshops',
          'Football viewing parties',
          'Brazilian cuisine events'
        ],
        upcomingEvents: 8,
        businessOpportunities: 15
      },
      {
        id: 'nation-angola',
        type: 'portuguese_nation',
        name: 'Angola',
        title: 'Republic of Angola',
        description: 'Discover Angolan culture, music, and business opportunities in London',
        imageUrl: '/images/flags/angola.png',
        location: 'Africa',
        followers: 680,
        isVerified: true,
        countryCode: 'AO',
        capital: 'Luanda',
        language: 'Portuguese',
        currency: 'AOA',
        culturalFocus: ['Semba', 'Kizomba', 'Traditional Crafts', 'Oil Industry'],
        benefits: [
          'Angolan cultural events',
          'Kizomba dance workshops',
          'Business networking opportunities',
          'Music and art celebrations'
        ],
        upcomingEvents: 4,
        businessOpportunities: 8
      },
      {
        id: 'nation-mozambique',
        type: 'portuguese_nation',
        name: 'Mozambique',
        title: 'Republic of Mozambique',
        description: 'Connect with Mozambican culture and opportunities in London',
        imageUrl: '/images/flags/mozambique.png',
        location: 'Africa',
        followers: 420,
        isVerified: true,
        countryCode: 'MZ',
        capital: 'Maputo',
        language: 'Portuguese',
        currency: 'MZN',
        culturalFocus: ['Marrabenta', 'Traditional Textiles', 'Coastal Culture'],
        benefits: [
          'Cultural celebrations',
          'Business opportunities',
          'Community gatherings',
          'Traditional music events'
        ],
        upcomingEvents: 3,
        businessOpportunities: 5
      },
      // Existing suggestions for other entity types
      {
        id: 'person-maria-santos',
        type: 'person',
        name: 'Maria Santos',
        description: 'Cultural events organizer and Fado enthusiast',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=150&h=150&fit=crop&crop=face&auto=format',
        location: 'London, UK',
        followers: 245,
        isVerified: true,
        culturalFocus: ['Fado', 'Portuguese Music', 'Cultural Events'],
        lastActive: '2 hours ago'
      },
      {
        id: 'group-fado-london',
        type: 'group',
        name: 'Fado Lovers London',
        title: 'Traditional Portuguese Music Community',
        description: 'Dedicated to preserving and celebrating Fado music in London',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&auto=format',
        location: 'London, UK',
        followers: 1240,
        category: 'Music & Culture',
        culturalFocus: ['Fado', 'Portuguese Music', 'Traditional Culture']
      },
      {
        id: 'community-portuguese-families-uk',
        type: 'community',
        name: 'Portuguese Families UK',
        title: 'Supporting Portuguese families across Britain',
        description: 'A supportive community for Portuguese families living in the UK',
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
        title: 'Portuguese Cultural Events Organizer',
        description: 'Organizing authentic Portuguese cultural experiences across London',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
        location: 'London, UK',
        followers: 892,
        isVerified: true,
        culturalFocus: ['Portuguese Cuisine', 'Cultural Festivals', 'Community Events']
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
      getFollowingStats,
      getFollowBenefits,
      loading,
      isAuthenticated
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