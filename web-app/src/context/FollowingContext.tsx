'use client'

import { buildUnsplashUrl } from '@/config';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface FollowableEntity {
  id: string
  type: 'person' | 'group' | 'community' | 'event_organizer'
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
}

export interface Following {
  entity: FollowableEntity
  followedAt: string
  notificationsEnabled: boolean
}

interface FollowingContextType {
  following: Following[]
  followEntity: (entity: FollowableEntity) => void
  unfollowEntity: (entityId: string) => void
  isFollowing: (entityId: string) => boolean
  toggleFollow: (entity: FollowableEntity) => void
  toggleNotifications: (entityId: string) => void
  getFollowingByType: (type: FollowableEntity['type']) => Following[]
  getFollowingSuggestions: () => FollowableEntity[]
  getTotalFollowingCount: () => number
  getFollowingStats: () => {
    people: number
    groups: number
    communities: number
    eventOrganizers: number
  }
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined)

export function FollowingProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<Following[]>([])

  // Load following data from localStorage on mount
  useEffect(() => {
    const savedFollowing = localStorage.getItem('lusotown-following')
    if (savedFollowing) {
      try {
        setFollowing(JSON.parse(savedFollowing))
      } catch (error) {
        console.error('Error parsing saved following data:', error)
      }
    }
  }, [])

  // Save following data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lusotown-following', JSON.stringify(following))
  }, [following])

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

  // Mock suggestions based on Portuguese cultural interests
  const getFollowingSuggestions = (): FollowableEntity[] => {
    const suggestions: FollowableEntity[] = [
      {
        id: 'person-maria-santos',
        type: 'person',
        name: 'Maria Santos',
        description: 'Cultural events organizer and Fado enthusiast',
        imageUrl: buildUnsplashUrl('1494790108755-2616b612b1ac'),
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
        imageUrl: buildUnsplashUrl('1493225457124-a3eb161ffa5f'),
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
        imageUrl: buildUnsplashUrl('1511895426328-dc8714191300'),
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
        imageUrl: buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
        location: 'London, UK',
        followers: 892,
        isVerified: true,
        culturalFocus: ['Portuguese Cuisine', 'Cultural Festivals', 'Community Events']
      },
      {
        id: 'group-portuguese-business-network',
        type: 'group',
        name: 'Portuguese Business Network UK',
        title: 'Connecting Portuguese entrepreneurs',
        description: 'Network of Portuguese business owners and entrepreneurs in the UK',
        imageUrl: buildUnsplashUrl('1600880292203-757bb62b4baf'),
        location: 'United Kingdom',
        followers: 756,
        category: 'Business & Professional',
        culturalFocus: ['Business Networking', 'Entrepreneurship', 'Economic Growth']
      },
      {
        id: 'person-ana-cultural',
        type: 'person',
        name: 'Ana Pereira',
        description: 'Portuguese literature enthusiast and book club organizer',
        imageUrl: buildUnsplashUrl('1580489944761-15a19d654956'),
        location: 'London, UK',
        followers: 423,
        culturalFocus: ['Portuguese Literature', 'Language Education', 'Book Clubs'],
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