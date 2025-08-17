'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useLanguage } from './LanguageContext'
import { useCart } from './CartContext'
import { useNetworking } from './NetworkingContext'
import { useSubscription } from './SubscriptionContext'
import { useFavorites } from './FavoritesContext'

// Platform Integration Types
export interface UserJourney {
  id: string
  userId: string
  journeyType: 'service_to_community' | 'community_to_service' | 'cross_engagement'
  startPoint: string
  currentStep: string
  completedSteps: string[]
  engagementScore: number
  revenueGenerated: number
  lastActivity: string
  createdAt: string
}

export interface ServiceRecommendation {
  id: string
  type: 'transport' | 'event' | 'community_group' | 'business_networking' | 'premium_feature'
  title: string
  description: string
  relevanceScore: number
  basedOn: string[] // what triggered this recommendation
  cta: string
  price?: number
  urgency: 'low' | 'medium' | 'high'
  category: string
  metadata: Record<string, any>
}

export interface CrossPlatformNotification {
  id: string
  type: 'service_completion' | 'community_invitation' | 'revenue_opportunity' | 'engagement_milestone' | 'smart_recommendation'
  title: string
  message: string
  actionType: 'redirect' | 'popup' | 'bookmark' | 'cart_add'
  actionData: Record<string, any>
  priority: 'low' | 'medium' | 'high' | 'urgent'
  isRead: boolean
  expiresAt?: string
  createdAt: string
}

export interface EcosystemAnalytics {
  userEngagementScore: number
  serviceUsageFrequency: Record<string, number>
  communityParticipationLevel: number
  revenueContribution: number
  crossPlatformConversions: number
  lastServiceBooking?: string
  lastCommunityEvent?: string
  preferredServices: string[]
  communityConnections: number
  monthlyGrowthRate: number
}

export interface IntegrationBridge {
  fromContext: 'transport' | 'events' | 'networking' | 'subscription' | 'cart'
  toContext: 'transport' | 'events' | 'networking' | 'subscription' | 'cart'
  triggerEvent: string
  bridgeAction: () => void
  priority: number
}

interface PlatformIntegrationContextType {
  // Core State
  userJourney: UserJourney | null
  ecosystemAnalytics: EcosystemAnalytics
  activeRecommendations: ServiceRecommendation[]
  crossPlatformNotifications: CrossPlatformNotification[]
  isLoading: boolean
  
  // Integration Functions
  initializeUserJourney: (startPoint: string) => void
  updateJourneyProgress: (step: string, metadata?: Record<string, any>) => void
  generateServiceRecommendations: (trigger: string, context?: Record<string, any>) => ServiceRecommendation[]
  
  // Activity Tracking (used by UI components)
  trackActivity: (activity: { activityType: string; serviceType?: string; points?: number; metadata?: Record<string, any> }) => void
  
  // UI helper data/functions expected by unified-experience components
  bridgeOpportunities: Array<{ id: string; title: string; category: string; description: string }>
  getCulturalEventTransportPairings: () => any[]
  findPortugueseBusinessConnections: () => any[]
  getPortugueseCommunityInsights: () => { highlights: string[]; groups: number; events: number }
  createGroupTransportBooking: (params?: Record<string, any>) => Promise<string | null>
  getProgressiveUpgradeOptions: () => any[]
  calculateMembershipBenefits: () => { transportDiscount: number }
  
  // Service to Community Bridges
  handleServiceCompletion: (serviceType: string, serviceData: Record<string, any>) => void
  suggestCommunityEngagement: (serviceType: string) => ServiceRecommendation[]
  autoEnrollCommunityGroups: (serviceType: string, preferences: Record<string, any>) => void
  
  // Community to Service Bridges
  suggestRelevantServices: (communityActivity: string, connections: any[]) => ServiceRecommendation[]
  handleNetworkingEventAttendance: (eventId: string, connections: any[]) => void
  generateBusinessNetworkingOpportunities: (networkData: Record<string, any>) => ServiceRecommendation[]
  
  // Smart Recommendations
  getPersonalizedRecommendations: () => (ServiceRecommendation & { benefits?: string[] })[]
  trackRecommendationInteraction: (recommendationId: string, action: 'viewed' | 'clicked' | 'booked' | 'dismissed') => void
  
  // Cross-Platform Notifications
  addNotification: (notification: Omit<CrossPlatformNotification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (notificationId: string) => void
  getUnreadNotificationsCount: () => number
  clearExpiredNotifications: () => void
  
  // Revenue Optimization
  trackRevenueOpportunity: (amount: number, source: string, metadata?: Record<string, any>) => void
  calculateEcosystemValue: () => { totalValue: number; monthlyGrowth: number; projectedRevenue: number }
  
  // User Timeline & History
  getUserTimeline: () => Array<{ type: string; title: string; date: string; metadata: Record<string, any> }>
  
  // AI-Driven Insights
  generateUserInsights: () => { strengths: string[]; opportunities: string[]; nextActions: string[] }
}

const PlatformIntegrationContext = createContext<PlatformIntegrationContextType | undefined>(undefined)

export function PlatformIntegrationProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  
  // Safely get context values with fallbacks to prevent initialization errors
  const cartContext = useCart()
  const networkingContext = useNetworking()
  const subscriptionContext = useSubscription()
  const favoritesContext = useFavorites()
  
  const { cartItems = [], addToCart } = cartContext || { cartItems: [], addToCart: () => {} }
  const { connections = [], stats: networkStats = { eventsAttended: 0 } } = networkingContext || { connections: [], stats: { eventsAttended: 0 } }
  const { hasActiveSubscription = false, membershipTier = 'none' } = subscriptionContext || { hasActiveSubscription: false, membershipTier: 'none' }
  const { favorites = [] } = favoritesContext || { favorites: [] }
  
  const [userJourney, setUserJourney] = useState<UserJourney | null>(null)
  const [ecosystemAnalytics, setEcosystemAnalytics] = useState<EcosystemAnalytics>({
    userEngagementScore: 0,
    serviceUsageFrequency: {},
    communityParticipationLevel: 0,
    revenueContribution: 0,
    crossPlatformConversions: 0,
    preferredServices: [],
    communityConnections: 0,
    monthlyGrowthRate: 0
  })
  const [activeRecommendations, setActiveRecommendations] = useState<ServiceRecommendation[]>([])
  const [crossPlatformNotifications, setCrossPlatformNotifications] = useState<CrossPlatformNotification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load persisted data from localStorage with safety check
  useEffect(() => {
    // Only load after all contexts are available
    if (cartContext && networkingContext && subscriptionContext && favoritesContext) {
      loadPlatformData()
    }
  }, [cartContext, networkingContext, subscriptionContext, favoritesContext])

  // Auto-save data changes
  useEffect(() => {
    if (!isLoading) {
      savePlatformData()
    }
  }, [userJourney, ecosystemAnalytics, activeRecommendations, crossPlatformNotifications, isLoading])

  // Monitor context changes for automatic bridging (only when contexts are loaded)
  useEffect(() => {
    if (!isLoading && cartContext && networkingContext && subscriptionContext && favoritesContext) {
      updateEcosystemAnalytics()
    }
  }, [cartItems, connections, networkStats, hasActiveSubscription, favorites, isLoading, cartContext, networkingContext, subscriptionContext, favoritesContext])

  // Auto-generate recommendations based on activity (only when contexts are loaded)
  useEffect(() => {
    if (!isLoading && cartContext && networkingContext && subscriptionContext && favoritesContext) {
      const newRecommendations = generateAutomaticRecommendations()
      setActiveRecommendations(prev => {
        const combined = [...prev, ...newRecommendations]
        // Remove duplicates and limit to top 10
        const unique = combined.filter((rec, index, self) => 
          index === self.findIndex(r => r.type === rec.type && r.title === rec.title)
        )
        return unique.slice(0, 10).sort((a, b) => b.relevanceScore - a.relevanceScore)
      })
    }
  }, [ecosystemAnalytics, isLoading, cartContext, networkingContext, subscriptionContext, favoritesContext])

  const loadPlatformData = () => {
    try {
      setIsLoading(true)
      
      // Load user journey
      const savedJourney = localStorage.getItem('lusotown-user-journey')
      if (savedJourney) {
        setUserJourney(JSON.parse(savedJourney))
      }
      
      // Load analytics
      const savedAnalytics = localStorage.getItem('lusotown-ecosystem-analytics')
      if (savedAnalytics) {
        setEcosystemAnalytics(JSON.parse(savedAnalytics))
      } else {
        initializeAnalytics()
      }
      
      // Load recommendations
      const savedRecommendations = localStorage.getItem('lusotown-recommendations')
      if (savedRecommendations) {
        setActiveRecommendations(JSON.parse(savedRecommendations))
      }
      
      // Load notifications
      const savedNotifications = localStorage.getItem('lusotown-platform-notifications')
      if (savedNotifications) {
        setCrossPlatformNotifications(JSON.parse(savedNotifications))
      }
      
    } catch (error) {
      console.error('Error loading platform integration data:', error)
      initializeAnalytics()
    } finally {
      setIsLoading(false)
    }
  }

  const savePlatformData = () => {
    try {
      localStorage.setItem('lusotown-user-journey', JSON.stringify(userJourney))
      localStorage.setItem('lusotown-ecosystem-analytics', JSON.stringify(ecosystemAnalytics))
      localStorage.setItem('lusotown-recommendations', JSON.stringify(activeRecommendations))
      localStorage.setItem('lusotown-platform-notifications', JSON.stringify(crossPlatformNotifications))
    } catch (error) {
      console.error('Error saving platform integration data:', error)
    }
  }

  const initializeAnalytics = () => {
    setEcosystemAnalytics({
      userEngagementScore: 2.5,
      serviceUsageFrequency: {},
      communityParticipationLevel: 1.2,
      revenueContribution: 0,
      crossPlatformConversions: 0,
      preferredServices: [],
      communityConnections: connections?.length || 0,
      monthlyGrowthRate: 0
    })
  }

  const updateEcosystemAnalytics = useCallback(() => {
    const safeConnections = connections || []
    const safeCartItems = cartItems || []
    const safeFavorites = favorites || []
    const safeNetworkStats = networkStats || { eventsAttended: 0 }
    
    setEcosystemAnalytics(prev => ({
      ...prev,
      communityConnections: safeConnections.length,
      communityParticipationLevel: Math.min(10, safeNetworkStats.eventsAttended * 0.5 + safeConnections.length * 0.3),
      userEngagementScore: Math.min(10, (
        safeCartItems.length * 0.5 +
        safeConnections.length * 0.3 +
        safeFavorites.length * 0.2 +
        (hasActiveSubscription ? 2 : 0) +
        safeNetworkStats.eventsAttended * 0.4
      )),
      serviceUsageFrequency: {
        ...prev.serviceUsageFrequency,
        cart_activity: safeCartItems.length,
        community_networking: safeConnections.length,
        subscription_tier: hasActiveSubscription ? 1 : 0
      }
    }))
  }, [cartItems, connections, networkStats, hasActiveSubscription, favorites])

  const initializeUserJourney = useCallback((startPoint: string) => {
    const newJourney: UserJourney = {
      id: `journey-${Date.now()}`,
      userId: 'current-user',
      journeyType: startPoint.includes('transport') ? 'service_to_community' : 'community_to_service',
      startPoint,
      currentStep: startPoint,
      completedSteps: [startPoint],
      engagementScore: 1,
      revenueGenerated: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    
    setUserJourney(newJourney)
    
    // Welcome notification
    addNotification({
      type: 'engagement_milestone',
      title: language === 'pt' ? 'Bem-vindo ao LusoTown!' : 'Welcome to LusoTown!',
      message: language === 'pt' 
        ? 'Explore nossa comunidade portuguesa e serviços premium em Londres'
        : 'Explore our Portuguese community and premium services in London',
      actionType: 'redirect',
      actionData: { url: '/my-network' },
      priority: 'medium',
      isRead: false
    })
  }, [language])

  const updateJourneyProgress = useCallback((step: string, metadata: Record<string, any> = {}) => {
    if (!userJourney) return
    
    setUserJourney(prev => prev ? {
      ...prev,
      currentStep: step,
      completedSteps: [...prev.completedSteps, step],
      engagementScore: prev.engagementScore + 0.5,
      lastActivity: new Date().toISOString()
    } : null)
    
    // Track specific journey milestones
    if (step.includes('booking_complete')) {
      handleServiceCompletion(metadata.serviceType || 'transport', metadata)
    }
    
    if (step.includes('event_attended')) {
      handleNetworkingEventAttendance(metadata.eventId || '', [])
    }
  }, [userJourney])

  const generateServiceRecommendations = useCallback((trigger: string, context: Record<string, any> = {}): ServiceRecommendation[] => {
    const recommendations: ServiceRecommendation[] = []
    const isPortuguese = language === 'pt'
    
    // Transport completion → Community events
    if (trigger === 'transport_completion') {
      recommendations.push({
        id: `rec-transport-community-${Date.now()}`,
        type: 'event',
        title: isPortuguese ? 'Eventos Comunitários Portugueses' : 'Portuguese Community Events',
        description: isPortuguese 
          ? 'Conecte-se com outros portugueses em eventos culturais exclusivos'
          : 'Connect with other Portuguese speakers at exclusive cultural events',
        relevanceScore: 9,
        basedOn: ['recent_transport_booking', 'cultural_interest'],
        cta: isPortuguese ? 'Explorar Eventos' : 'Explore Events',
        urgency: 'medium',
        category: 'community',
        metadata: { source: 'transport_bridge', serviceType: context.serviceType }
      })
    }
    
    // High networking activity → Premium transport
    if (trigger === 'high_networking_activity' && connections.length >= 3) {
      recommendations.push({
        id: `rec-networking-transport-${Date.now()}`,
        type: 'transport',
        title: isPortuguese ? 'Transporte VIP para Eventos' : 'VIP Transport for Events',
        description: isPortuguese 
          ? 'Chegue aos eventos com estilo! Transporte premium para networking'
          : 'Arrive in style! Premium transport for networking events',
        relevanceScore: 8.5,
        basedOn: ['networking_connections', 'event_attendance'],
        cta: isPortuguese ? 'Reservar Transporte' : 'Book Transport',
        price: membershipTier !== 'none' ? 180 : 200,
        urgency: 'low',
        category: 'transport',
        metadata: { discount: membershipTier !== 'none' ? 10 : 0 }
      })
    }
    
    // No subscription + active engagement → Membership
    if (trigger === 'membership_opportunity' && !hasActiveSubscription && ecosystemAnalytics.userEngagementScore > 5) {
      recommendations.push({
        id: `rec-membership-${Date.now()}`,
        type: 'premium_feature',
        title: isPortuguese ? 'Torne-se Membro Premium' : 'Become Premium Member',
        description: isPortuguese 
          ? 'Desbloqueie descontos exclusivos e recursos premium da comunidade'
          : 'Unlock exclusive discounts and premium community features',
        relevanceScore: 9.5,
        basedOn: ['high_engagement', 'service_usage'],
        cta: isPortuguese ? 'Ver Benefícios' : 'View Benefits',
        price: 25,
        urgency: 'high',
        category: 'subscription',
        metadata: { annualSavings: 150, discountPercent: 20 }
      })
    }
    
    return recommendations
  }, [language, connections, membershipTier, hasActiveSubscription, ecosystemAnalytics])

  const generateAutomaticRecommendations = useCallback((): ServiceRecommendation[] => {
    const triggers = []
    
    // Determine triggers based on current state
    if (cartItems.length > 0 && cartItems.some(item => item.type === 'transport_service')) {
      triggers.push('transport_completion')
    }
    
    if (connections.length >= 3) {
      triggers.push('high_networking_activity')
    }
    
    if (!hasActiveSubscription && ecosystemAnalytics.userEngagementScore > 4) {
      triggers.push('membership_opportunity')
    }
    
    // Generate recommendations for all triggers
    return triggers.flatMap(trigger => 
      generateServiceRecommendations(trigger, { 
        connectionCount: connections.length,
        engagementScore: ecosystemAnalytics.userEngagementScore
      })
    )
  }, [cartItems, connections, hasActiveSubscription, ecosystemAnalytics, generateServiceRecommendations])

  const handleServiceCompletion = useCallback((serviceType: string, serviceData: Record<string, any>) => {
    // Generate community engagement suggestions
    const communityRecommendations = suggestCommunityEngagement(serviceType)
    setActiveRecommendations(prev => [...prev, ...communityRecommendations])
    
    // Auto-enroll in relevant community groups
    autoEnrollCommunityGroups(serviceType, { language, location: 'London' })
    
    // Track revenue and update analytics
    trackRevenueOpportunity(serviceData.amount || 0, `${serviceType}_service`)
    
    // Send completion notification
    addNotification({
      type: 'service_completion',
      title: language === 'pt' ? 'Serviço Concluído!' : 'Service Completed!',
      message: language === 'pt' 
        ? 'Explore eventos da comunidade portuguesa relacionados'
        : 'Explore related Portuguese community events',
      actionType: 'redirect',
      actionData: { url: '/events' },
      priority: 'medium',
      isRead: false
    })
  }, [language])

  const suggestCommunityEngagement = useCallback((serviceType: string): ServiceRecommendation[] => {
    const isPortuguese = language === 'pt'
    const suggestions: ServiceRecommendation[] = []
    
    if (serviceType === 'transport') {
      suggestions.push({
        id: `community-transport-${Date.now()}`,
        type: 'community_group',
        title: isPortuguese ? 'Grupo de Exploradores de Londres' : 'London Explorers Group',
        description: isPortuguese 
          ? 'Junte-se a portugueses que exploram Londres regularmente'
          : 'Join Portuguese speakers who explore London regularly',
        relevanceScore: 8,
        basedOn: ['transport_usage', 'london_exploration'],
        cta: isPortuguese ? 'Juntar ao Grupo' : 'Join Group',
        urgency: 'medium',
        category: 'community',
        metadata: { groupType: 'exploration', autoEnroll: true }
      })
    }
    
    return suggestions
  }, [language])

  const autoEnrollCommunityGroups = useCallback((serviceType: string, preferences: Record<string, any>) => {
    // Mock auto-enrollment logic
    console.log('Auto-enrolling in community groups:', { serviceType, preferences })
  }, [])

  const suggestRelevantServices = useCallback((communityActivity: string, connections: any[]): ServiceRecommendation[] => {
    const isPortuguese = language === 'pt'
    const suggestions: ServiceRecommendation[] = []
    
    if (communityActivity.includes('networking') && connections.length >= 2) {
      suggestions.push({
        id: `service-networking-${Date.now()}`,
        type: 'business_networking',
        title: isPortuguese ? 'Eventos de Networking Premium' : 'Premium Networking Events',
        description: isPortuguese 
          ? 'Eventos exclusivos para profissionais portugueses em Londres'
          : 'Exclusive events for Portuguese professionals in London',
        relevanceScore: 8.5,
        basedOn: ['networking_activity', 'professional_connections'],
        cta: isPortuguese ? 'Ver Eventos' : 'View Events',
        price: hasActiveSubscription ? 15 : 25,
        urgency: 'medium',
        category: 'networking',
        metadata: { memberDiscount: hasActiveSubscription }
      })
    }
    
    return suggestions
  }, [language, hasActiveSubscription])

  const handleNetworkingEventAttendance = useCallback((eventId: string, connections: any[]) => {
    // Generate business networking opportunities
    const businessOpportunities = generateBusinessNetworkingOpportunities({ 
      eventId, 
      connections,
      membershipTier 
    })
    
    setActiveRecommendations(prev => [...prev, ...businessOpportunities])
    
    updateJourneyProgress('networking_event_attended', { eventId, newConnections: connections.length })
  }, [membershipTier, updateJourneyProgress])

  const generateBusinessNetworkingOpportunities = useCallback((networkData: Record<string, any>): ServiceRecommendation[] => {
    const isPortuguese = language === 'pt'
    
    return [{
      id: `business-opportunity-${Date.now()}`,
      type: 'business_networking',
      title: isPortuguese ? 'Workshop de IA para Empresários' : 'AI Workshop for Entrepreneurs',
      description: isPortuguese 
        ? 'Aprenda IA aplicada a negócios com outros empreendedores portugueses'
        : 'Learn business AI with other Portuguese entrepreneurs',
      relevanceScore: 9,
      basedOn: ['networking_activity', 'professional_interest'],
      cta: isPortuguese ? 'Inscrever-se' : 'Register',
      price: 45,
      urgency: 'high',
      category: 'professional',
      metadata: { networkingValue: 'high', skillLevel: 'intermediate' }
    }]
  }, [language])

  const getPersonalizedRecommendations = useCallback((): (ServiceRecommendation & { benefits?: string[] })[] => {
    return activeRecommendations
      .filter(rec => rec.relevanceScore >= 7)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5)
      .map(rec => ({
        ...rec,
        // Ensure UI can safely render tags even if none provided
        benefits: Array.isArray((rec as any).benefits)
          ? (rec as any).benefits
          : Array.isArray(rec.metadata?.benefits)
            ? (rec.metadata.benefits as string[])
            : ['community', 'transport_pairing']
      }))
  }, [activeRecommendations])

  // Activity tracking stub used by UI components
  const trackActivity = useCallback((activity: { activityType: string; serviceType?: string; points?: number; metadata?: Record<string, any> }) => {
    try {
      updateJourneyProgress(activity.activityType, activity.metadata || {})
    } catch (e) {
      console.log('trackActivity stub:', activity)
    }
  }, [updateJourneyProgress])

  // Helper data/functions expected by unified experience components
  const bridgeOpportunities = useMemo(() => ([
    {
      id: 'bridge-1',
      title: language === 'pt' ? 'Transporte + Evento' : 'Transport + Event',
      category: 'integration',
      description: language === 'pt' ? 'Combine transporte premium com eventos culturais' : 'Combine premium transport with cultural events',
      serviceIntegration: { transportIncluded: true, eventAccess: true, networkingFeatures: false },
      pricing: { basePrice: 120, memberDiscount: 15 },
      duration: language === 'pt' ? 'Dia inteiro' : 'Full day'
    },
    {
      id: 'bridge-2',
      title: language === 'pt' ? 'Networking + Serviços' : 'Networking + Services',
      category: 'community',
      description: language === 'pt' ? 'Conecte-se e reserve serviços em conjunto' : 'Connect and book services together',
      serviceIntegration: { transportIncluded: false, eventAccess: true, networkingFeatures: true },
      pricing: { basePrice: 80, memberDiscount: 10 },
      duration: language === 'pt' ? '3 horas' : '3 hours'
    }
  ]), [language])

  const getCulturalEventTransportPairings = useCallback(() => {
    return [
      {
        eventId: 'portuguese-music-night',
        eventTitle: language === 'pt' ? 'Noite de Música Portuguesa' : 'Portuguese Music Night',
        culturalExperience: language === 'pt' ? 'Fado ao vivo com transporte opcional' : 'Live Fado with optional transport',
        groupSavings: language === 'pt' ? 'Poupe 20% em grupos' : 'Save 20% in groups',
        transportOptions: ['standard', 'vip']
      }
    ]
  }, [language])

  const findPortugueseBusinessConnections = useCallback(() => {
    return []
  }, [])

  const getPortugueseCommunityInsights = useCallback(() => {
    const isPt = language === 'pt'
    return {
      highlights: [
        isPt ? 'Crescimento estável da comunidade' : 'Steady community growth',
        isPt ? 'Eventos culturais mensais' : 'Monthly cultural events'
      ],
      groups: 0,
      events: 0,
      totalMembers: 0,
      activeLastMonth: 0,
      averageConnections: 0,
      communityGrowth: '0%'
    }
  }, [language])

  const createGroupTransportBooking = useCallback(async (_params?: Record<string, any>) => {
    return null
  }, [])

  const getProgressiveUpgradeOptions = useCallback(() => {
    return []
  }, [])

  const calculateMembershipBenefits = useCallback(() => {
    const base = 10
    const extra = hasActiveSubscription
      ? (membershipTier === 'vip' ? 15
        : membershipTier === 'business' ? 10
        : membershipTier === 'professional' ? 7
        : membershipTier === 'student' ? 5
        : membershipTier === 'basic' ? 3
        : 0)
      : 0
    return { transportDiscount: base + extra }
  }, [hasActiveSubscription, membershipTier])

  const trackRecommendationInteraction = useCallback((recommendationId: string, action: 'viewed' | 'clicked' | 'booked' | 'dismissed') => {
    // Update recommendation metrics
    setActiveRecommendations(prev => prev.map(rec => 
      rec.id === recommendationId 
        ? { ...rec, metadata: { ...rec.metadata, lastAction: action, actionAt: new Date().toISOString() }}
        : rec
    ))
    
    // Remove if dismissed
    if (action === 'dismissed') {
      setActiveRecommendations(prev => prev.filter(rec => rec.id !== recommendationId))
    }
    
    // Track booking conversion
    if (action === 'booked') {
      setEcosystemAnalytics(prev => ({
        ...prev,
        crossPlatformConversions: prev.crossPlatformConversions + 1
      }))
    }
  }, [])

  const addNotification = useCallback((notification: Omit<CrossPlatformNotification, 'id' | 'createdAt'>) => {
    const newNotification: CrossPlatformNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString()
    }
    
    setCrossPlatformNotifications(prev => [newNotification, ...prev].slice(0, 20))
  }, [])

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setCrossPlatformNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ))
  }, [])

  const getUnreadNotificationsCount = useCallback(() => {
    return crossPlatformNotifications.filter(notif => !notif.isRead).length
  }, [crossPlatformNotifications])

  const clearExpiredNotifications = useCallback(() => {
    const now = new Date().toISOString()
    setCrossPlatformNotifications(prev => prev.filter(notif => 
      !notif.expiresAt || notif.expiresAt > now
    ))
  }, [])

  const trackRevenueOpportunity = useCallback((amount: number, source: string, metadata: Record<string, any> = {}) => {
    setEcosystemAnalytics(prev => ({
      ...prev,
      revenueContribution: prev.revenueContribution + amount,
      serviceUsageFrequency: {
        ...prev.serviceUsageFrequency,
        [source]: (prev.serviceUsageFrequency[source] || 0) + 1
      }
    }))
  }, [])

  const calculateEcosystemValue = useCallback(() => {
    const { revenueContribution, crossPlatformConversions, userEngagementScore } = ecosystemAnalytics
    
    return {
      totalValue: revenueContribution + (crossPlatformConversions * 25) + (userEngagementScore * 10),
      monthlyGrowth: ecosystemAnalytics.monthlyGrowthRate,
      projectedRevenue: revenueContribution * 1.5 + (userEngagementScore * 15)
    }
  }, [ecosystemAnalytics])

  const getUserTimeline = useCallback(() => {
    const timeline: Array<{ type: string; title: string; date: string; metadata: Record<string, any> }> = []
    
    // Add journey steps
    if (userJourney) {
      userJourney.completedSteps.forEach(step => {
        timeline.push({
          type: 'journey',
          title: step.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          date: userJourney.lastActivity,
          metadata: { journeyType: userJourney.journeyType }
        })
      })
    }
    
    // Add cart activity
    cartItems.forEach(item => {
      timeline.push({
        type: 'cart',
        title: `Added ${item.title}`,
        date: item.addedAt,
        metadata: { itemType: item.type, price: item.price }
      })
    })
    
    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)
  }, [userJourney, cartItems])

  const generateUserInsights = useCallback(() => {
    const { userEngagementScore, communityParticipationLevel, revenueContribution } = ecosystemAnalytics
    const isPortuguese = language === 'pt'
    
    const insights = {
      strengths: [] as string[],
      opportunities: [] as string[],
      nextActions: [] as string[]
    }
    
    // Strengths
    if (connections.length >= 3) {
      insights.strengths.push(
        isPortuguese ? 'Bem conectado na comunidade' : 'Well connected in community'
      )
    }
    
    if (hasActiveSubscription) {
      insights.strengths.push(
        isPortuguese ? 'Membro premium ativo' : 'Active premium member'
      )
    }
    
    if (userEngagementScore > 7) {
      insights.strengths.push(
        isPortuguese ? 'Alto envolvimento na plataforma' : 'High platform engagement'
      )
    }
    
    // Opportunities
    if (!hasActiveSubscription && userEngagementScore > 5) {
      insights.opportunities.push(
        isPortuguese ? 'Candidato ideal para membership premium' : 'Great candidate for premium membership'
      )
    }
    
    if (connections.length < 3) {
      insights.opportunities.push(
        isPortuguese ? 'Expandir rede de contactos portugueses' : 'Expand Portuguese network connections'
      )
    }
    
    if (cartItems.length === 0) {
      insights.opportunities.push(
        isPortuguese ? 'Explorar serviços premium disponíveis' : 'Explore available premium services'
      )
    }
    
    // Next Actions
    if (activeRecommendations.length > 0) {
      insights.nextActions.push(
        isPortuguese ? 'Verificar recomendações personalizadas' : 'Check personalized recommendations'
      )
    }
    
    insights.nextActions.push(
      isPortuguese ? 'Participar no próximo evento da comunidade' : 'Attend next community event'
    )
    
    if (!hasActiveSubscription) {
      insights.nextActions.push(
        isPortuguese ? 'Considerar membership para descontos' : 'Consider membership for discounts'
      )
    }
    
    return insights
  }, [ecosystemAnalytics, language, connections, hasActiveSubscription, cartItems, activeRecommendations])

  // Memoized context value
  const contextValue = useMemo(() => ({
    userJourney,
    ecosystemAnalytics,
    activeRecommendations,
    crossPlatformNotifications,
    isLoading,
    initializeUserJourney,
    updateJourneyProgress,
    generateServiceRecommendations,
  // activity + UI helpers
  trackActivity,
  bridgeOpportunities,
  getCulturalEventTransportPairings,
  findPortugueseBusinessConnections,
  getPortugueseCommunityInsights,
  createGroupTransportBooking,
  getProgressiveUpgradeOptions,
  calculateMembershipBenefits,
    handleServiceCompletion,
    suggestCommunityEngagement,
    autoEnrollCommunityGroups,
    suggestRelevantServices,
    handleNetworkingEventAttendance,
    generateBusinessNetworkingOpportunities,
    getPersonalizedRecommendations,
    trackRecommendationInteraction,
    addNotification,
    markNotificationAsRead,
    getUnreadNotificationsCount,
    clearExpiredNotifications,
    trackRevenueOpportunity,
    calculateEcosystemValue,
    getUserTimeline,
    generateUserInsights
  }), [
    userJourney,
    ecosystemAnalytics,
    activeRecommendations,
    crossPlatformNotifications,
    isLoading,
    initializeUserJourney,
    updateJourneyProgress,
    generateServiceRecommendations,
  trackActivity,
  bridgeOpportunities,
  getCulturalEventTransportPairings,
  findPortugueseBusinessConnections,
  getPortugueseCommunityInsights,
  createGroupTransportBooking,
  getProgressiveUpgradeOptions,
  calculateMembershipBenefits,
    handleServiceCompletion,
    suggestCommunityEngagement,
    autoEnrollCommunityGroups,
    suggestRelevantServices,
    handleNetworkingEventAttendance,
    generateBusinessNetworkingOpportunities,
    getPersonalizedRecommendations,
    trackRecommendationInteraction,
    addNotification,
    markNotificationAsRead,
    getUnreadNotificationsCount,
    clearExpiredNotifications,
    trackRevenueOpportunity,
    calculateEcosystemValue,
    getUserTimeline,
    generateUserInsights
  ])

  return (
    <PlatformIntegrationContext.Provider value={contextValue}>
      {children}
    </PlatformIntegrationContext.Provider>
  )
}

export function usePlatformIntegration() {
  const context = useContext(PlatformIntegrationContext)
  if (context === undefined) {
    throw new Error('usePlatformIntegration must be used within a PlatformIntegrationProvider')
  }
  return context
}