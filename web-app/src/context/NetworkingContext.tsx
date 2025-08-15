'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// Networking types
export interface Connection {
  id: string
  userId: string
  connectedUserId: string
  connectedUser: {
    id: string
    firstName: string
    lastName?: string
    profilePictureUrl?: string
    location?: string
    membershipTier: 'free' | 'core' | 'premium'
    isVerified?: boolean
  }
  connectionSource: 'event_based' | 'mutual_friends' | 'manual'
  sharedEventsCount: number
  firstMetEventId?: string
  firstMetEvent?: {
    id: string
    title: string
    date: string
  }
  connectionStrength: number
  lastInteractionAt: string
  isActive: boolean
  privacyLevel: 'public' | 'normal' | 'private'
  createdAt: string
}

export interface NetworkStats {
  totalConnections: number
  eventsAttended: number
  newConnectionsThisMonth: number
  connectionStrength: number
  achievements: NetworkAchievement[]
}

export interface NetworkAchievement {
  id: string
  type: 'connector' | 'regular_attendee' | 'event_starter' | 'culture_preserver' | 'community_builder'
  name: string
  description: string
  icon: string
  earnedAt: string
  isActive: boolean
}

export interface ConnectionNotification {
  id: string
  type: 'new_connection' | 'milestone' | 'upcoming_event_with_connections' | 'connection_activity'
  title: string
  message: string
  data?: any
  isRead: boolean
  createdAt: string
  expiresAt?: string
}

export interface ConversationStarter {
  id: string
  category: 'cultural' | 'events' | 'professional' | 'personal'
  text_en: string
  text_pt: string
  context?: string
}

interface NetworkingContextType {
  connections: Connection[]
  stats: NetworkStats
  notifications: ConnectionNotification[]
  conversationStarters: ConversationStarter[]
  loading: boolean
  
  // Connection management
  getConnections: (sortBy?: 'recent' | 'most_events' | 'alphabetical') => Connection[]
  searchConnections: (query: string) => Connection[]
  getConnectionsByEvent: (eventId: string) => Connection[]
  
  // Event attendance
  checkInToEvent: (eventId: string) => Promise<void>
  markEventAttended: (eventId: string) => Promise<void>
  
  // Notifications
  markNotificationAsRead: (notificationId: string) => void
  getUnreadNotificationsCount: () => number
  
  // Stats and achievements
  refreshStats: () => Promise<void>
  
  // Conversation helpers
  getConversationStarters: (category?: string) => ConversationStarter[]
}

const NetworkingContext = createContext<NetworkingContextType | undefined>(undefined)

export function NetworkingProvider({ children }: { children: ReactNode }) {
  const [connections, setConnections] = useState<Connection[]>([])
  const [stats, setStats] = useState<NetworkStats>({
    totalConnections: 0,
    eventsAttended: 0,
    newConnectionsThisMonth: 0,
    connectionStrength: 0,
    achievements: []
  })
  const [notifications, setNotifications] = useState<ConnectionNotification[]>([])
  const [loading, setLoading] = useState(true)

  // Mock conversation starters with Portuguese cultural context
  const conversationStarters: ConversationStarter[] = [
    {
      id: 'cultural-1',
      category: 'cultural',
      text_en: "What's your favorite Portuguese tradition to celebrate in London?",
      text_pt: "Qual é a sua tradição portuguesa favorita para celebrar em Londres?",
      context: 'Cultural heritage and traditions'
    },
    {
      id: 'cultural-2',
      category: 'cultural',
      text_en: "Have you been to any good Fado nights recently?",
      text_pt: "Tens ido a algumas boas noites de Fado recentemente?",
      context: 'Portuguese music and culture'
    },
    {
      id: 'events-1',
      category: 'events',
      text_en: "Which LusoTown event would you recommend for first-timers?",
      text_pt: "Que evento do LusoTown recomendarias para principiantes?",
      context: 'Event recommendations'
    },
    {
      id: 'events-2',
      category: 'events',
      text_en: "Are you planning to attend any Portuguese cultural festivals this year?",
      text_pt: "Estás a planear assistir a alguns festivais culturais portugueses este ano?",
      context: 'Cultural events and festivals'
    },
    {
      id: 'professional-1',
      category: 'professional',
      text_en: "How has being part of the Portuguese community helped your career in London?",
      text_pt: "Como é que fazer parte da comunidade portuguesa ajudou a tua carreira em Londres?",
      context: 'Professional networking'
    },
    {
      id: 'personal-1',
      category: 'personal',
      text_en: "What do you miss most about Portuguese culture living in the UK?",
      text_pt: "Do que é que tens mais saudades da cultura portuguesa vivendo no Reino Unido?",
      context: 'Personal experiences and saudade'
    },
    {
      id: 'personal-2',
      category: 'personal',
      text_en: "How do you keep connected to Portuguese culture for your children?",
      text_pt: "Como manténs os teus filhos ligados à cultura portuguesa?",
      context: 'Family and cultural preservation'
    }
  ]

  // Load data from localStorage and initialize mock data
  useEffect(() => {
    loadNetworkingData()
  }, [])

  const loadNetworkingData = async () => {
    setLoading(true)
    
    try {
      // Load from localStorage first
      const savedConnections = localStorage.getItem('lusotown-connections')
      const savedStats = localStorage.getItem('lusotown-network-stats')
      const savedNotifications = localStorage.getItem('lusotown-network-notifications')
      
      if (savedConnections) {
        setConnections(JSON.parse(savedConnections))
      } else {
        // Initialize with mock data
        initializeMockConnections()
      }
      
      if (savedStats) {
        setStats(JSON.parse(savedStats))
      } else {
        initializeMockStats()
      }
      
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      } else {
        initializeMockNotifications()
      }
    } catch (error) {
      console.error('Error loading networking data:', error)
      initializeMockConnections()
      initializeMockStats()
      initializeMockNotifications()
    }
    
    setLoading(false)
  }

  const initializeMockConnections = () => {
    const mockConnections: Connection[] = [
      {
        id: 'conn-1',
        userId: 'current-user',
        connectedUserId: 'user-maria',
        connectedUser: {
          id: 'user-maria',
          firstName: 'Maria',
          lastName: 'Santos',
          profilePictureUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=150&h=150&fit=crop&crop=face&auto=format',
          location: 'Camberwell, London',
          membershipTier: 'premium',
          isVerified: true
        },
        connectionSource: 'event_based',
        sharedEventsCount: 3,
        firstMetEventId: 'event-fado-night',
        firstMetEvent: {
          id: 'event-fado-night',
          title: 'Fado Night at Portuguese Cultural Centre',
          date: '2024-01-15'
        },
        connectionStrength: 8.5,
        lastInteractionAt: '2024-01-20T18:00:00Z',
        isActive: true,
        privacyLevel: 'normal',
        createdAt: '2024-01-15T20:30:00Z'
      },
      {
        id: 'conn-2',
        userId: 'current-user',
        connectedUserId: 'user-carlos',
        connectedUser: {
          id: 'user-carlos',
          firstName: 'Carlos',
          lastName: 'Oliveira',
          profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
          location: 'Kennington, London',
          membershipTier: 'core',
          isVerified: false
        },
        connectionSource: 'event_based',
        sharedEventsCount: 2,
        firstMetEventId: 'event-portuguese-food-tour',
        firstMetEvent: {
          id: 'event-portuguese-food-tour',
          title: 'Portuguese Food Tour in Little Portugal',
          date: '2024-01-10'
        },
        connectionStrength: 6.2,
        lastInteractionAt: '2024-01-18T15:30:00Z',
        isActive: true,
        privacyLevel: 'normal',
        createdAt: '2024-01-10T14:15:00Z'
      },
      {
        id: 'conn-3',
        userId: 'current-user',
        connectedUserId: 'user-ana',
        connectedUser: {
          id: 'user-ana',
          firstName: 'Ana',
          lastName: 'Pereira',
          profilePictureUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
          location: 'Vauxhall, London',
          membershipTier: 'core',
          isVerified: true
        },
        connectionSource: 'event_based',
        sharedEventsCount: 1,
        firstMetEventId: 'event-book-club',
        firstMetEvent: {
          id: 'event-book-club',
          title: 'Portuguese Literature Book Club',
          date: '2024-01-08'
        },
        connectionStrength: 4.8,
        lastInteractionAt: '2024-01-22T11:00:00Z',
        isActive: true,
        privacyLevel: 'normal',
        createdAt: '2024-01-08T19:45:00Z'
      }
    ]
    
    setConnections(mockConnections)
    localStorage.setItem('lusotown-connections', JSON.stringify(mockConnections))
  }

  const initializeMockStats = () => {
    const mockStats: NetworkStats = {
      totalConnections: 3,
      eventsAttended: 8,
      newConnectionsThisMonth: 2,
      connectionStrength: 6.5,
      achievements: [
        {
          id: 'ach-1',
          type: 'connector',
          name: 'Community Connector',
          description: 'Connected with 3+ Portuguese community members',
          icon: '🤝',
          earnedAt: '2024-01-15T20:30:00Z',
          isActive: true
        },
        {
          id: 'ach-2',
          type: 'regular_attendee',
          name: 'Cultural Enthusiast',
          description: 'Attended 5+ Portuguese cultural events',
          icon: '🎭',
          earnedAt: '2024-01-20T18:00:00Z',
          isActive: true
        }
      ]
    }
    
    setStats(mockStats)
    localStorage.setItem('lusotown-network-stats', JSON.stringify(mockStats))
  }

  const initializeMockNotifications = () => {
    const mockNotifications: ConnectionNotification[] = [
      {
        id: 'notif-1',
        type: 'new_connection',
        title: 'New Connection!',
        message: 'You connected with Ana Pereira at Portuguese Literature Book Club',
        data: { connectionId: 'conn-3', eventId: 'event-book-club' },
        isRead: false,
        createdAt: '2024-01-08T19:45:00Z'
      },
      {
        id: 'notif-2',
        type: 'milestone',
        title: 'Achievement Unlocked!',
        message: 'You\'ve earned the "Cultural Enthusiast" badge for attending 5+ events',
        data: { achievementId: 'ach-2' },
        isRead: false,
        createdAt: '2024-01-20T18:00:00Z'
      }
    ]
    
    setNotifications(mockNotifications)
    localStorage.setItem('lusotown-network-notifications', JSON.stringify(mockNotifications))
  }

  // Helper functions
  const getConnections = (sortBy: 'recent' | 'most_events' | 'alphabetical' = 'recent') => {
    let sorted = [...connections]
    
    switch (sortBy) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.lastInteractionAt).getTime() - new Date(a.lastInteractionAt).getTime())
        break
      case 'most_events':
        sorted.sort((a, b) => b.sharedEventsCount - a.sharedEventsCount)
        break
      case 'alphabetical':
        sorted.sort((a, b) => a.connectedUser.firstName.localeCompare(b.connectedUser.firstName))
        break
    }
    
    return sorted
  }

  const searchConnections = (query: string) => {
    if (!query.trim()) return connections
    
    const searchTerm = query.toLowerCase()
    return connections.filter(conn => 
      conn.connectedUser.firstName.toLowerCase().includes(searchTerm) ||
      conn.connectedUser.lastName?.toLowerCase().includes(searchTerm) ||
      conn.connectedUser.location?.toLowerCase().includes(searchTerm) ||
      conn.firstMetEvent?.title.toLowerCase().includes(searchTerm)
    )
  }

  const getConnectionsByEvent = (eventId: string) => {
    return connections.filter(conn => conn.firstMetEventId === eventId)
  }

  const checkInToEvent = async (eventId: string) => {
    // Mock implementation - in real app would call API
    console.log('Checking in to event:', eventId)
    // This would create potential connections with other attendees
  }

  const markEventAttended = async (eventId: string) => {
    // Mock implementation - in real app would call API
    console.log('Marking event as attended:', eventId)
    // This would trigger connection creation logic
  }

  const markNotificationAsRead = (notificationId: string) => {
    const updated = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    )
    setNotifications(updated)
    localStorage.setItem('lusotown-network-notifications', JSON.stringify(updated))
  }

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notif => !notif.isRead).length
  }

  const refreshStats = async () => {
    // Mock implementation - in real app would call API
    console.log('Refreshing network stats')
  }

  const getConversationStarters = (category?: string) => {
    if (!category) return conversationStarters
    return conversationStarters.filter(starter => starter.category === category)
  }

  return (
    <NetworkingContext.Provider value={{
      connections,
      stats,
      notifications,
      conversationStarters,
      loading,
      getConnections,
      searchConnections,
      getConnectionsByEvent,
      checkInToEvent,
      markEventAttended,
      markNotificationAsRead,
      getUnreadNotificationsCount,
      refreshStats,
      getConversationStarters
    }}>
      {children}
    </NetworkingContext.Provider>
  )
}

export function useNetworking() {
  const context = useContext(NetworkingContext)
  if (context === undefined) {
    throw new Error('useNetworking must be used within a NetworkingProvider')
  }
  return context
}