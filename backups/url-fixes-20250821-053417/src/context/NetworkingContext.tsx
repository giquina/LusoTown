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

export interface ConnectionFilters {
  membershipTier?: 'free' | 'core' | 'premium' | 'business' | 'student'
  location?: string
  minSharedEvents?: number
  connectionStrength?: 'weak' | 'medium' | 'strong'
  isVerified?: boolean
  lastInteractionDays?: number
  // Premium filtering options
  ageRange?: [number, number]
  interests?: string[]
  professionalBackground?: string[]
  languagePreference?: 'portuguese' | 'english' | 'both'
  culturalBackground?: 'portugal' | 'brazil' | 'other_lusophone' | 'any'
  relationshipGoal?: 'friendship' | 'professional' | 'cultural_exchange' | 'any'
  familyStatus?: 'single' | 'family' | 'any'
}

export interface PremiumMatch {
  id: string
  userId: string
  matchedUserId: string
  matchedUser: {
    id: string
    firstName: string
    lastName?: string
    profilePictureUrl?: string
    location?: string
    membershipTier: 'free' | 'core' | 'premium' | 'business' | 'student'
    isVerified?: boolean
    culturalBackground?: string
    interests?: string[]
    professionalBackground?: string
    bio?: string
    age?: number
    languagePreference?: string
  }
  compatibilityScore: number
  sharedInterests: string[]
  culturalCompatibility: number
  professionalCompatibility: number
  locationCompatibility: number
  matchReason: string
  isLiked: boolean
  isMatched: boolean
  createdAt: string
  expiresAt?: string
}

export interface SecureMessage {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  messageType: 'text' | 'photo' | 'voice' | 'system'
  isRead: boolean
  isReported: boolean
  safetyScore: number
  createdAt: string
  editedAt?: string
}

export interface Conversation {
  id: string
  participantIds: string[]
  participants: PremiumMatch['matchedUser'][]
  lastMessage?: SecureMessage
  unreadCount: number
  isActive: boolean
  connectionType: 'mutual_match' | 'event_based' | 'professional'
  safetyStatus: 'safe' | 'flagged' | 'blocked'
  createdAt: string
  updatedAt: string
}

export interface NetworkAnalytics {
  averageConnectionStrength: number
  topEventForConnections: { eventTitle: string; connectionCount: number }
  mostActiveMonth: { month: string; newConnections: number }
  connectionGrowthRate: number
  strongConnectionsPercent: number
}

interface NetworkingContextType {
  connections: Connection[]
  stats: NetworkStats
  notifications: ConnectionNotification[]
  conversationStarters: ConversationStarter[]
  loading: boolean
  
  // Connection management
  getConnections: (sortBy?: 'recent' | 'most_events' | 'alphabetical' | 'strongest') => Connection[]
  searchConnections: (query: string) => Connection[]
  filterConnections: (filters: ConnectionFilters) => Connection[]
  getConnectionsByEvent: (eventId: string) => Connection[]
  exportConnections: (format: 'csv' | 'json') => void
  
  // Event attendance
  checkInToEvent: (eventId: string) => Promise<void>
  markEventAttended: (eventId: string) => Promise<void>
  
  // Notifications
  markNotificationAsRead: (notificationId: string) => void
  getUnreadNotificationsCount: () => number
  
  // Stats and achievements
  refreshStats: () => Promise<void>
  getNetworkAnalytics: () => NetworkAnalytics
  
  // Conversation helpers
  getConversationStarters: (category?: string) => ConversationStarter[]
}

// Helper function to calculate connection strength based on multiple factors
function calculateConnectionStrength({
  sharedEventsCount,
  daysSinceFirstMet,
  daysSinceLastInteraction,
  isVerified,
  membershipTier
}: {
  sharedEventsCount: number
  daysSinceFirstMet: number
  daysSinceLastInteraction: number
  isVerified: boolean
  membershipTier: 'free' | 'core' | 'premium'
}): number {
  let strength = 0
  
  // Base score from shared events (0-5 points)
  strength += Math.min(sharedEventsCount * 1.5, 5)
  
  // Recency bonus for recent interactions (0-2 points)
  if (daysSinceLastInteraction <= 7) {
    strength += 2
  } else if (daysSinceLastInteraction <= 30) {
    strength += 1
  } else if (daysSinceLastInteraction <= 90) {
    strength += 0.5
  }
  
  // Longevity bonus for long-term connections (0-1.5 points)
  if (daysSinceFirstMet >= 90) {
    strength += 1.5
  } else if (daysSinceFirstMet >= 30) {
    strength += 1
  } else if (daysSinceFirstMet >= 7) {
    strength += 0.5
  }
  
  // Verification bonus (0-1 point)
  if (isVerified) {
    strength += 1
  }
  
  // Membership tier bonus (0-0.5 points)
  if (membershipTier === 'premium') {
    strength += 0.5
  } else if (membershipTier === 'core') {
    strength += 0.25
  }
  
  // Ensure score is between 0-10
  return Math.min(Math.max(strength, 0), 10)
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
      context: 'Tradições culturais lusófonas'
    },
    {
      id: 'cultural-2',
      category: 'cultural',
      text_en: "Have you been to any good Fado nights recently?",
      text_pt: "Andou por alguma boa noite de Fado ultimamente?",
      context: 'Música e cultura portuguesa'
    },
    {
      id: 'cultural-5',
      category: 'cultural',
      text_en: "Which Portuguese pastry do you miss the most from home?",
      text_pt: "Que doce português tem mais saudades de casa?",
      context: 'Gastronomia e memórias afetivas'
    },
    {
      id: 'cultural-6',
      category: 'cultural',
      text_en: "How do you celebrate Santos Populares in London?",
      text_pt: "Como celebra os Santos Populares em Londres?",
      context: 'Festividades tradicionais portuguesas'
    },
    {
      id: 'cultural-7',
      category: 'cultural',
      text_en: "What Portuguese words do you find yourself using in English conversations?",
      text_pt: "Que palavras portuguesas se apanha a usar nas conversas em inglês?",
      context: 'Língua e identidade cultural'
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
      text_pt: "Do que sente mais saudades da cultura portuguesa vivendo no Reino Unido?",
      context: 'Experiências pessoais e saudade'
    },
    {
      id: 'personal-2',
      category: 'personal',
      text_en: "How do you keep your children connected to Portuguese culture?",
      text_pt: "Como mantém os seus filhos ligados à cultura portuguesa?",
      context: 'Família e preservação cultural'
    },
    {
      id: 'personal-4',
      category: 'personal',
      text_en: "What Portuguese expression best describes your experience in London?",
      text_pt: "Que expressão portuguesa melhor descreve a sua experiência em Londres?",
      context: 'Expressões idiomáticas portuguesas'
    },
    {
      id: 'personal-5',
      category: 'personal',
      text_en: "How has living in London changed your perspective on being Portuguese?",
      text_pt: "Como é que viver em Londres mudou a sua perspetiva de ser português?",
      context: 'Identidade cultural na diáspora'
    },
    {
      id: 'cultural-3',
      category: 'cultural',
      text_en: "What's your favorite Portuguese recipe to cook in London?",
      text_pt: "Qual é a tua receita portuguesa favorita para cozinhar em Londres?",
      context: 'Food and cooking traditions'
    },
    {
      id: 'professional-2',
      category: 'professional',
      text_en: "Have you found good Portuguese business networking opportunities here?",
      text_pt: "Encontrou boas oportunidades de networking empresarial português aqui?",
      context: 'Networking empresarial lusófono'
    },
    {
      id: 'professional-4',
      category: 'professional',
      text_en: "Do you work with Portuguese clients or suppliers from your role in London?",
      text_pt: "Trabalha com clientes ou fornecedores portugueses no seu papel em Londres?",
      context: 'Negócios transnacionais lusófonos'
    },
    {
      id: 'professional-5',
      category: 'professional',
      text_en: "How has your Portuguese background influenced your career path?",
      text_pt: "Como é que as suas origens portuguesas influenciaram o seu percurso profissional?",
      context: 'Vantagens culturais no trabalho'
    },
    {
      id: 'cultural-4',
      category: 'cultural',
      text_en: "Do you celebrate any Portuguese holidays or festivals in London?",
      text_pt: "Celebras algum feriado ou festival português em Londres?",
      context: 'Holiday celebrations'
    },
    {
      id: 'events-3',
      category: 'events',
      text_en: "Which London areas remind you most of Portugal?",
      text_pt: "Que áreas de Londres te lembram mais de Portugal?",
      context: 'London areas and Portuguese culture'
    },
    {
      id: 'personal-3',
      category: 'personal',
      text_en: "What's the biggest challenge you've faced living in the UK?",
      text_pt: "Qual foi o maior desafio que enfrentaste vivendo no Reino Unido?",
      context: 'Immigration challenges'
    },
    {
      id: 'professional-3',
      category: 'professional',
      text_en: "Are there Portuguese business communities you'd recommend?",
      text_pt: "Há comunidades empresariais portuguesas que recomendarias?",
      context: 'Business communities'
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
        connectionStrength: calculateConnectionStrength({
          sharedEventsCount: 3,
          daysSinceFirstMet: Math.floor((new Date().getTime() - new Date('2024-01-15').getTime()) / (1000 * 60 * 60 * 24)),
          daysSinceLastInteraction: Math.floor((new Date().getTime() - new Date('2024-01-20T18:00:00Z').getTime()) / (1000 * 60 * 60 * 24)),
          isVerified: true,
          membershipTier: 'premium'
        }),
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
        connectionStrength: calculateConnectionStrength({
          sharedEventsCount: 2,
          daysSinceFirstMet: Math.floor((new Date().getTime() - new Date('2024-01-10').getTime()) / (1000 * 60 * 60 * 24)),
          daysSinceLastInteraction: Math.floor((new Date().getTime() - new Date('2024-01-18T15:30:00Z').getTime()) / (1000 * 60 * 60 * 24)),
          isVerified: false,
          membershipTier: 'core'
        }),
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
        connectionStrength: calculateConnectionStrength({
          sharedEventsCount: 1,
          daysSinceFirstMet: Math.floor((new Date().getTime() - new Date('2024-01-08').getTime()) / (1000 * 60 * 60 * 24)),
          daysSinceLastInteraction: Math.floor((new Date().getTime() - new Date('2024-01-22T11:00:00Z').getTime()) / (1000 * 60 * 60 * 24)),
          isVerified: true,
          membershipTier: 'core'
        }),
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
      connectionStrength: 6.8,
      achievements: [
        {
          id: 'ach-1',
          type: 'connector',
          name: 'Community Connector',
          description: 'Connected with 3+ Portuguese Portuguese speakers',
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
        },
        {
          id: 'ach-3',
          type: 'heritage_preserver',
          name: 'Heritage Guardian',
          description: 'Actively preserving and sharing Portuguese culture',
          icon: '🏛️',
          earnedAt: '2024-01-25T16:00:00Z',
          isActive: true
        },
        {
          id: 'ach-4',
          type: 'community_bridge',
          name: 'Community Bridge Builder',
          description: 'Connecting Portuguese speakers across different backgrounds',
          icon: '🌉',
          earnedAt: '2024-01-22T14:30:00Z',
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
  const getConnections = (sortBy: 'recent' | 'most_events' | 'alphabetical' | 'strongest' = 'recent') => {
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
      case 'strongest':
        sorted.sort((a, b) => b.connectionStrength - a.connectionStrength)
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

  const filterConnections = (filters: ConnectionFilters) => {
    return connections.filter(conn => {
      // Membership tier filter
      if (filters.membershipTier && conn.connectedUser.membershipTier !== filters.membershipTier) {
        return false
      }
      
      // Location filter
      if (filters.location && !conn.connectedUser.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      
      // Minimum shared events filter
      if (filters.minSharedEvents && conn.sharedEventsCount < filters.minSharedEvents) {
        return false
      }
      
      // Connection strength filter
      if (filters.connectionStrength) {
        const strength = conn.connectionStrength
        const isWeak = strength < 4
        const isMedium = strength >= 4 && strength < 7
        const isStrong = strength >= 7
        
        if (filters.connectionStrength === 'weak' && !isWeak) return false
        if (filters.connectionStrength === 'medium' && !isMedium) return false
        if (filters.connectionStrength === 'strong' && !isStrong) return false
      }
      
      // Verified filter
      if (filters.isVerified !== undefined && conn.connectedUser.isVerified !== filters.isVerified) {
        return false
      }
      
      // Last interaction filter
      if (filters.lastInteractionDays) {
        const daysSinceInteraction = Math.floor(
          (new Date().getTime() - new Date(conn.lastInteractionAt).getTime()) / (1000 * 60 * 60 * 24)
        )
        if (daysSinceInteraction > filters.lastInteractionDays) {
          return false
        }
      }
      
      return true
    })
  }

  const getConnectionsByEvent = (eventId: string) => {
    return connections.filter(conn => conn.firstMetEventId === eventId)
  }

  const checkInToEvent = async (eventId: string) => {
    // Mock implementation - in real app would call API
    // This would create potential connections with other attendees
  }

  const markEventAttended = async (eventId: string) => {
    // Mock implementation - in real app would call API
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
  }

  const getConversationStarters = (category?: string) => {
    if (!category) return conversationStarters
    return conversationStarters.filter(starter => starter.category === category)
  }

  const exportConnections = (format: 'csv' | 'json') => {
    const data = connections.map(conn => ({
      name: `${conn.connectedUser.firstName} ${conn.connectedUser.lastName || ''}`,
      location: conn.connectedUser.location || '',
      membershipTier: conn.connectedUser.membershipTier,
      sharedEvents: conn.sharedEventsCount,
      connectionStrength: conn.connectionStrength,
      firstMetEvent: conn.firstMetEvent?.title || '',
      firstMetDate: conn.firstMetEvent?.date || '',
      lastInteraction: conn.lastInteractionAt,
      isVerified: conn.connectedUser.isVerified ? 'Yes' : 'No'
    }))

    if (format === 'csv') {
      const headers = ['Name', 'Location', 'Membership', 'Shared Events', 'Connection Strength', 'First Met Event', 'First Met Date', 'Last Interaction', 'Verified']
      const csvContent = [headers.join(','), ...data.map(row => Object.values(row).join(','))].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute('download', 'lusotown-connections.csv')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.setAttribute('hidden', '')
      a.setAttribute('href', url)
      a.setAttribute('download', 'lusotown-connections.json')
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const getNetworkAnalytics = (): NetworkAnalytics => {
    if (connections.length === 0) {
      return {
        averageConnectionStrength: 0,
        topEventForConnections: { eventTitle: 'No events yet', connectionCount: 0 },
        mostActiveMonth: { month: 'No activity yet', newConnections: 0 },
        connectionGrowthRate: 0,
        strongConnectionsPercent: 0
      }
    }

    // Average connection strength
    const averageConnectionStrength = connections.reduce((sum, conn) => sum + conn.connectionStrength, 0) / connections.length

    // Top event for connections
    const eventConnections: Record<string, number> = {}
    connections.forEach(conn => {
      if (conn.firstMetEvent) {
        eventConnections[conn.firstMetEvent.title] = (eventConnections[conn.firstMetEvent.title] || 0) + 1
      }
    })
    
    const topEvent = Object.entries(eventConnections).reduce(
      (max, [event, count]) => count > max.connectionCount ? { eventTitle: event, connectionCount: count } : max,
      { eventTitle: 'No events yet', connectionCount: 0 }
    )

    // Most active month (mock data for now)
    const mostActiveMonth = { month: 'January 2024', newConnections: connections.length }

    // Connection growth rate (mock calculation)
    const connectionGrowthRate = Math.round((connections.length / 30) * 100) / 100 // connections per month

    // Strong connections percentage
    const strongConnections = connections.filter(conn => conn.connectionStrength >= 7).length
    const strongConnectionsPercent = Math.round((strongConnections / connections.length) * 100)

    return {
      averageConnectionStrength: Math.round(averageConnectionStrength * 10) / 10,
      topEventForConnections: topEvent,
      mostActiveMonth,
      connectionGrowthRate,
      strongConnectionsPercent
    }
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
      filterConnections,
      getConnectionsByEvent,
      exportConnections,
      checkInToEvent,
      markEventAttended,
      markNotificationAsRead,
      getUnreadNotificationsCount,
      refreshStats,
      getNetworkAnalytics,
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