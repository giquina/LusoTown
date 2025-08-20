'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useLanguage } from './LanguageContext'
import { useNetworking } from './NetworkingContext'
import { useSubscription } from './SubscriptionContext'
import toast from 'react-hot-toast'

// Core notification types
export interface BaseNotification {
  id: string
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  titlePT?: string
  messagePT?: string
  userId: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  data?: any
  createdAt: string
  expiresAt?: string
  actionUrl?: string
  actionLabel?: string
  actionLabelPT?: string
}

export type NotificationType =
  | 'connection_request'
  | 'new_match'
  | 'event_invitation'
  | 'service_booking'
  | 'sia_compliance'
  | 'tour_confirmation'
  | 'chat_message'
  | 'group_activity'
  | 'cultural_event'
  | 'business_opportunity'
  | 'partnership_invite'
  | 'student_event'
  | 'university_update'
  | 'career_opportunity'
  | 'subscription_update'
  | 'trial_expiring'
  | 'payment_reminder'
  | 'system_update'
  | 'heritage_update'
  | 'community_announcement'
  | 'live_stream'
  | 'transport_update'

export type NotificationCategory =
  | 'networking'
  | 'services'
  | 'community'
  | 'business'
  | 'students'
  | 'subscription'
  | 'system'
  | 'heritage'
  | 'events'
  | 'transport'

export type DeliveryChannel = 
  | 'in_app'
  | 'email'
  | 'whatsapp'
  | 'sms'
  | 'push'

export interface NotificationPreferences {
  userId: string
  inApp: NotificationChannelSettings
  email: NotificationChannelSettings
  whatsapp: NotificationChannelSettings
  sms: NotificationChannelSettings
  push: NotificationChannelSettings
  quietHours: {
    enabled: boolean
    startTime: string // HH:mm format
    endTime: string // HH:mm format
    timezone: string
  }
  language: 'en' | 'pt'
  culturalInterests: string[]
  professionalInterests: string[]
  geographicPreferences: string[]
  subscriptionTierPreferences: boolean
}

export interface NotificationChannelSettings {
  enabled: boolean
  categories: Record<NotificationCategory, boolean>
  priority: {
    low: boolean
    medium: boolean
    high: boolean
    urgent: boolean
  }
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}

export interface PersonalizationProfile {
  userId: string
  culturalBackground: 'portugal' | 'brazil' | 'other_lusophone' | 'multicultural'
  languagePreference: 'en' | 'pt' | 'both'
  professionalSector: string[]
  interests: string[]
  locationPreferences: string[]
  connectionGoals: ('friendship' | 'professional' | 'cultural_exchange' | 'business')[]
  eventPreferences: ('cultural' | 'business' | 'social' | 'educational' | 'networking')[]
  serviceUsage: ('transport' | 'tours' | 'events' | 'heritage' | 'live_streams')[]
  engagementLevel: 'low' | 'medium' | 'high' | 'very_high'
  timePreferences: {
    preferredDays: string[] // ['monday', 'tuesday', etc.]
    preferredTimes: string[] // ['morning', 'afternoon', 'evening']
  }
}

export interface NotificationTemplate {
  id: string
  type: NotificationType
  category: NotificationCategory
  titleTemplate: string
  messageTemplate: string
  titleTemplatePT: string
  messageTemplatePT: string
  defaultPriority: 'low' | 'medium' | 'high' | 'urgent'
  variables: string[]
  channels: DeliveryChannel[]
  culturalContext?: string
  businessContext?: string
}

export interface NotificationRule {
  id: string
  userId: string
  category: NotificationCategory
  type: NotificationType
  condition: any // Flexible condition object
  action: 'send' | 'suppress' | 'delay' | 'escalate'
  enabled: boolean
  priority: number
}

export interface NotificationAnalytics {
  userId: string
  totalNotifications: number
  readRate: number
  responseRate: number
  categoryBreakdown: Record<NotificationCategory, number>
  channelEffectiveness: Record<DeliveryChannel, number>
  optimalSendTimes: string[]
  engagementScore: number
  lastUpdated: string
}

interface NotificationContextType {
  notifications: BaseNotification[]
  preferences: NotificationPreferences | null
  personalization: PersonalizationProfile | null
  analytics: NotificationAnalytics | null
  unreadCount: number
  loading: boolean

  // Core notification management
  addNotification: (notification: Omit<BaseNotification, 'id' | 'createdAt' | 'isRead'>) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  deleteNotification: (notificationId: string) => void
  clearExpiredNotifications: () => void

  // Filtering and searching
  getNotificationsByCategory: (category: NotificationCategory) => BaseNotification[]
  getNotificationsByType: (type: NotificationType) => BaseNotification[]
  getUnreadNotifications: () => BaseNotification[]
  searchNotifications: (query: string) => BaseNotification[]

  // Preferences management
  updatePreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>
  updatePersonalization: (profile: Partial<PersonalizationProfile>) => Promise<void>
  getChannelSettings: (channel: DeliveryChannel) => NotificationChannelSettings
  updateChannelSettings: (channel: DeliveryChannel, settings: Partial<NotificationChannelSettings>) => Promise<void>

  // Smart notifications
  sendPersonalizedNotification: (template: NotificationTemplate, data: any) => void
  scheduleNotification: (notification: Omit<BaseNotification, 'id' | 'createdAt' | 'isRead'>, sendAt: Date) => void
  sendCulturalNotification: (culturalContext: string, data: any) => void
  sendBusinessNotification: (businessContext: string, data: any) => void

  // Integration helpers
  notifyNetworkingUpdate: (type: 'new_connection' | 'new_match' | 'event_invitation', data: any) => void
  notifyServiceUpdate: (type: 'booking_confirmed' | 'sia_update' | 'transport_update', data: any) => void
  notifyCommunityUpdate: (type: 'chat_message' | 'group_activity' | 'cultural_event', data: any) => void
  notifyBusinessUpdate: (type: 'partnership_invite' | 'opportunity', data: any) => void
  notifyStudentUpdate: (type: 'university_event' | 'career_opportunity', data: any) => void

  // Analytics and optimization
  trackNotificationEngagement: (notificationId: string, action: 'clicked' | 'dismissed' | 'shared') => void
  getPersonalizedRecommendations: () => BaseNotification[]
  optimizeSendTimes: () => Promise<void>
  generateInsights: () => Promise<NotificationAnalytics>
}

// Default preferences
const defaultPreferences: NotificationPreferences = {
  userId: '',
  inApp: {
    enabled: true,
    categories: {
      networking: true,
      services: true,
      community: true,
      business: true,
      students: true,
      subscription: true,
      system: true,
      heritage: true,
      events: true,
      transport: true,
    },
    priority: {
      low: true,
      medium: true,
      high: true,
      urgent: true,
    },
    frequency: 'immediate',
  },
  email: {
    enabled: true,
    categories: {
      networking: true,
      services: true,
      community: false,
      business: true,
      students: true,
      subscription: true,
      system: false,
      heritage: false,
      events: true,
      transport: true,
    },
    priority: {
      low: false,
      medium: true,
      high: true,
      urgent: true,
    },
    frequency: 'daily',
  },
  whatsapp: {
    enabled: false,
    categories: {
      networking: false,
      services: true,
      community: true,
      business: false,
      students: false,
      subscription: false,
      system: false,
      heritage: false,
      events: false,
      transport: true,
    },
    priority: {
      low: false,
      medium: false,
      high: true,
      urgent: true,
    },
    frequency: 'immediate',
  },
  sms: {
    enabled: false,
    categories: {
      networking: false,
      services: true,
      community: false,
      business: false,
      students: false,
      subscription: false,
      system: false,
      heritage: false,
      events: false,
      transport: true,
    },
    priority: {
      low: false,
      medium: false,
      high: false,
      urgent: true,
    },
    frequency: 'immediate',
  },
  push: {
    enabled: true,
    categories: {
      networking: true,
      services: true,
      community: true,
      business: true,
      students: true,
      subscription: true,
      system: false,
      heritage: true,
      events: true,
      transport: true,
    },
    priority: {
      low: false,
      medium: true,
      high: true,
      urgent: true,
    },
    frequency: 'immediate',
  },
  quietHours: {
    enabled: true,
    startTime: '22:00',
    endTime: '08:00',
    timezone: 'Europe/London',
  },
  language: 'en',
  culturalInterests: ['fado', 'portuguese_cuisine', 'festivals', 'literature'],
  professionalInterests: ['networking', 'entrepreneurship', 'technology'],
  geographicPreferences: ['london', 'south_london', 'portuguese_areas'],
  subscriptionTierPreferences: true,
}

// Notification templates for Portuguese community
const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'new_connection',
    type: 'connection_request',
    category: 'networking',
    titleTemplate: 'New Connection Request',
    messageTemplate: '{{senderName}} wants to connect with you from {{eventName}}',
    titleTemplatePT: 'Novo Pedido de Ligação',
    messageTemplatePT: '{{senderName}} quer conectar-se consigo a partir de {{eventName}}',
    defaultPriority: 'medium',
    variables: ['senderName', 'eventName'],
    channels: ['in_app', 'email', 'push'],
    culturalContext: 'Portuguese community networking',
  },
  {
    id: 'cultural_event',
    type: 'cultural_event',
    category: 'community',
    titleTemplate: 'Portuguese Cultural Event',
    messageTemplate: '{{eventName}} is happening {{eventDate}} in {{location}}',
    titleTemplatePT: 'Evento Cultural Português',
    messageTemplatePT: '{{eventName}} acontece {{eventDate}} em {{location}}',
    defaultPriority: 'medium',
    variables: ['eventName', 'eventDate', 'location'],
    channels: ['in_app', 'email', 'push', 'whatsapp'],
    culturalContext: 'Portuguese heritage preservation',
  },
  {
    id: 'transport_booking',
    type: 'service_booking',
    category: 'services',
    titleTemplate: 'Transport Booking Confirmed',
    messageTemplate: 'Your transport service for {{date}} at {{time}} has been confirmed',
    titleTemplatePT: 'Reserva de Transporte Confirmada',
    messageTemplatePT: 'O seu serviço de transporte para {{date}} às {{time}} foi confirmado',
    defaultPriority: 'high',
    variables: ['date', 'time', 'service'],
    channels: ['in_app', 'email', 'sms', 'whatsapp'],
    businessContext: 'Professional transport services',
  },
  {
    id: 'business_opportunity',
    type: 'business_opportunity',
    category: 'business',
    titleTemplate: 'Portuguese Business Opportunity',
    messageTemplate: 'New partnership opportunity with {{companyName}} in {{sector}}',
    titleTemplatePT: 'Oportunidade de Negócio Português',
    messageTemplatePT: 'Nova oportunidade de parceria com {{companyName}} em {{sector}}',
    defaultPriority: 'high',
    variables: ['companyName', 'sector'],
    channels: ['in_app', 'email'],
    businessContext: 'Portuguese business networking',
  },
  {
    id: 'student_event',
    type: 'student_event',
    category: 'students',
    titleTemplate: 'University Portuguese Society Event',
    messageTemplate: '{{universityName}} Portuguese Society presents: {{eventName}}',
    titleTemplatePT: 'Evento da Associação Portuguesa Universitária',
    messageTemplatePT: 'Associação Portuguesa da {{universityName}} apresenta: {{eventName}}',
    defaultPriority: 'medium',
    variables: ['universityName', 'eventName'],
    channels: ['in_app', 'email', 'push'],
    culturalContext: 'Student Portuguese community',
  },
]

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { language, t } = useLanguage()
  const { notifications: networkNotifications } = useNetworking()
  const { subscription, membershipTier } = useSubscription()

  const [notifications, setNotifications] = useState<BaseNotification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [personalization, setPersonalization] = useState<PersonalizationProfile | null>(null)
  const [analytics, setAnalytics] = useState<NotificationAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  // Load data on mount
  useEffect(() => {
    loadNotificationData()
  }, [])

  const loadNotificationData = async () => {
    setLoading(true)
    try {
      // Load from localStorage (in production, this would be from Supabase)
      const savedNotifications = localStorage.getItem('lusotown-notifications')
      const savedPreferences = localStorage.getItem('lusotown-notification-preferences')
      const savedPersonalization = localStorage.getItem('lusotown-notification-personalization')

      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      } else {
        initializeDefaultNotifications()
      }

      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      } else {
        const userPreferences = { ...defaultPreferences, userId: 'current-user', language: language as 'en' | 'pt' }
        setPreferences(userPreferences)
        localStorage.setItem('lusotown-notification-preferences', JSON.stringify(userPreferences))
      }

      if (savedPersonalization) {
        setPersonalization(JSON.parse(savedPersonalization))
      } else {
        initializeDefaultPersonalization()
      }

      await generateInsights()
    } catch (error) {
      console.error('Error loading notification data:', error)
    } finally {
      setLoading(false)
    }
  }

  const initializeDefaultNotifications = () => {
    const defaultNotifications: BaseNotification[] = [
      {
        id: 'notif-welcome',
        type: 'community_announcement',
        category: 'community',
        title: 'Welcome to LusoTown London',
        message: 'Discover Portuguese events, connect with the community, and explore Portuguese culture in the U.K. & UK',
        titlePT: 'Bem-vindo ao LusoTown Londres',
        messagePT: 'Descubra eventos portugueses, conecte-se com a comunidade e explore a cultura portuguesa em Londres e Reino Unido',
        userId: 'current-user',
        isRead: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        actionUrl: '/events',
        actionLabel: 'Explore Events',
        actionLabelPT: 'Explorar Eventos'
      },
      {
        id: 'notif-transport',
        type: 'service_booking',
        category: 'services',
        title: 'Premium Transport Services Available',
        message: 'Book SIA-compliant transport and cultural tours with Portuguese-speaking drivers',
        titlePT: 'Serviços de Transporte Premium Disponíveis',
        messagePT: 'Reserve transporte compatível com SIA e tours culturais com condutores de língua portuguesa',
        userId: 'current-user',
        isRead: false,
        priority: 'medium',
        createdAt: new Date(Date.now() - 60000).toISOString(),
        actionUrl: '/transport',
        actionLabel: 'View Services',
        actionLabelPT: 'Ver Serviços'
      },
      {
        id: 'notif-networking',
        type: 'event_invitation',
        category: 'networking',
        title: 'Portuguese Business Networking Event',
        message: 'Join fellow Portuguese entrepreneurs and professionals this Friday at Portuguese Cultural Centre',
        titlePT: 'Evento de Networking Empresarial Português',
        messagePT: 'Junte-se a outros empresários e profissionais portugueses esta sexta-feira no Centro Cultural Português',
        userId: 'current-user',
        isRead: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 120000).toISOString(),
        actionUrl: '/events',
        actionLabel: 'Join Event',
        actionLabelPT: 'Participar no Evento'
      }
    ]

    setNotifications(defaultNotifications)
    localStorage.setItem('lusotown-notifications', JSON.stringify(defaultNotifications))
  }

  const initializeDefaultPersonalization = () => {
    const defaultProfile: PersonalizationProfile = {
      userId: 'current-user',
      culturalBackground: 'portugal',
      languagePreference: language as 'en' | 'pt',
      professionalSector: ['technology', 'business'],
      interests: ['fado', 'portuguese_cuisine', 'networking', 'cultural_events'],
      locationPreferences: ['south_london', 'central_london'],
      connectionGoals: ['professional', 'cultural_exchange'],
      eventPreferences: ['cultural', 'business', 'networking'],
      serviceUsage: ['events', 'transport'],
      engagementLevel: 'medium',
      timePreferences: {
        preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        preferredTimes: ['evening']
      }
    }

    setPersonalization(defaultProfile)
    localStorage.setItem('lusotown-notification-personalization', JSON.stringify(defaultProfile))
  }

  // Core notification management
  const addNotification = useCallback((notificationData: Omit<BaseNotification, 'id' | 'createdAt' | 'isRead'>) => {
    const notification: BaseNotification = {
      ...notificationData,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    }

    setNotifications(prev => {
      const updated = [notification, ...prev]
      localStorage.setItem('lusotown-notifications', JSON.stringify(updated))
      return updated
    })

    // Show toast for high priority notifications
    if (notification.priority === 'high' || notification.priority === 'urgent') {
      const title = language === 'pt' && notification.titlePT ? notification.titlePT : notification.title
      const message = language === 'pt' && notification.messagePT ? notification.messagePT : notification.message
      
      toast.success(`${title}: ${message}`, {
        duration: 5000,
        position: 'top-right',
      })
    }
  }, [language])

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
      localStorage.setItem('lusotown-notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, isRead: true }))
      localStorage.setItem('lusotown-notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.filter(notif => notif.id !== notificationId)
      localStorage.setItem('lusotown-notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearExpiredNotifications = useCallback(() => {
    const now = new Date()
    setNotifications(prev => {
      const updated = prev.filter(notif => !notif.expiresAt || new Date(notif.expiresAt) > now)
      localStorage.setItem('lusotown-notifications', JSON.stringify(updated))
      return updated
    })
  }, [])

  // Filtering and searching
  const getNotificationsByCategory = (category: NotificationCategory) => {
    return notifications.filter(notif => notif.category === category)
  }

  const getNotificationsByType = (type: NotificationType) => {
    return notifications.filter(notif => notif.type === type)
  }

  const getUnreadNotifications = () => {
    return notifications.filter(notif => !notif.isRead)
  }

  const searchNotifications = (query: string) => {
    if (!query.trim()) return notifications

    const searchTerm = query.toLowerCase()
    return notifications.filter(notif => 
      notif.title.toLowerCase().includes(searchTerm) ||
      notif.message.toLowerCase().includes(searchTerm) ||
      (notif.titlePT && notif.titlePT.toLowerCase().includes(searchTerm)) ||
      (notif.messagePT && notif.messagePT.toLowerCase().includes(searchTerm))
    )
  }

  // Preferences management
  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    if (!preferences) return

    const updated = { ...preferences, ...newPreferences }
    setPreferences(updated)
    localStorage.setItem('lusotown-notification-preferences', JSON.stringify(updated))
  }

  const updatePersonalization = async (newProfile: Partial<PersonalizationProfile>) => {
    if (!personalization) return

    const updated = { ...personalization, ...newProfile }
    setPersonalization(updated)
    localStorage.setItem('lusotown-notification-personalization', JSON.stringify(updated))
  }

  const getChannelSettings = (channel: DeliveryChannel): NotificationChannelSettings => {
    return preferences?.[channel] || defaultPreferences[channel]
  }

  const updateChannelSettings = async (channel: DeliveryChannel, settings: Partial<NotificationChannelSettings>) => {
    if (!preferences) return

    const updated = {
      ...preferences,
      [channel]: { ...preferences[channel], ...settings }
    }
    setPreferences(updated)
    localStorage.setItem('lusotown-notification-preferences', JSON.stringify(updated))
  }

  // Smart notifications
  const sendPersonalizedNotification = (template: NotificationTemplate, data: any) => {
    const title = language === 'pt' ? template.titleTemplatePT : template.titleTemplate
    const message = language === 'pt' ? template.messageTemplatePT : template.messageTemplate

    // Replace template variables
    let personalizedTitle = title
    let personalizedMessage = message

    template.variables.forEach(variable => {
      const value = data[variable] || `{{${variable}}}`
      personalizedTitle = personalizedTitle.replace(`{{${variable}}}`, value)
      personalizedMessage = personalizedMessage.replace(`{{${variable}}}`, value)
    })

    addNotification({
      type: template.type,
      category: template.category,
      title: personalizedTitle,
      message: personalizedMessage,
      userId: 'current-user',
      priority: template.defaultPriority,
      data,
    })
  }

  const scheduleNotification = (notification: Omit<BaseNotification, 'id' | 'createdAt' | 'isRead'>, sendAt: Date) => {
    // In production, this would use a job queue or scheduler
    const delay = sendAt.getTime() - Date.now()
    if (delay > 0) {
      setTimeout(() => {
        addNotification(notification)
      }, delay)
    } else {
      addNotification(notification)
    }
  }

  const sendCulturalNotification = (culturalContext: string, data: any) => {
    const template = notificationTemplates.find(t => t.culturalContext === culturalContext)
    if (template) {
      sendPersonalizedNotification(template, data)
    }
  }

  const sendBusinessNotification = (businessContext: string, data: any) => {
    const template = notificationTemplates.find(t => t.businessContext === businessContext)
    if (template) {
      sendPersonalizedNotification(template, data)
    }
  }

  // Integration helpers
  const notifyNetworkingUpdate = (type: 'new_connection' | 'new_match' | 'event_invitation', data: any) => {
    const titles = {
      new_connection: { en: 'New Connection', pt: 'Nova Ligação' },
      new_match: { en: 'New Match Found', pt: 'Nova Compatibilidade Encontrada' },
      event_invitation: { en: 'Event Invitation', pt: 'Convite para Evento' }
    }

    const messages = {
      new_connection: { 
        en: `You connected with ${data.name} through Portuguese community events`, 
        pt: `Conectou-se com ${data.name} através de eventos da comunidade portuguesa` 
      },
      new_match: { 
        en: `${data.name} shares your interests in Portuguese culture and business`, 
        pt: `${data.name} partilha os seus interesses na cultura e negócios portugueses` 
      },
      event_invitation: { 
        en: `You're invited to ${data.eventName} - Portuguese community gathering`, 
        pt: `Está convidado para ${data.eventName} - encontro da comunidade portuguesa` 
      }
    }

    addNotification({
      type: type === 'new_connection' ? 'connection_request' : type === 'new_match' ? 'new_match' : 'event_invitation',
      category: 'networking',
      title: titles[type][language as 'en' | 'pt'],
      message: messages[type][language as 'en' | 'pt'],
      userId: 'current-user',
      priority: 'medium',
      data,
      actionUrl: '/my-network',
      actionLabel: language === 'pt' ? 'Ver Rede' : 'View Network'
    })
  }

  const notifyServiceUpdate = (type: 'booking_confirmed' | 'sia_update' | 'transport_update', data: any) => {
    const titles = {
      booking_confirmed: { en: 'Booking Confirmed', pt: 'Reserva Confirmada' },
      sia_update: { en: 'SIA Compliance Update', pt: 'Atualização de Conformidade SIA' },
      transport_update: { en: 'Transport Update', pt: 'Atualização de Transporte' }
    }

    addNotification({
      type: 'service_booking',
      category: 'services',
      title: titles[type][language as 'en' | 'pt'],
      message: data.message || (language === 'pt' ? 'Atualização do seu serviço' : 'Update on your service'),
      userId: 'current-user',
      priority: 'high',
      data,
      actionUrl: '/transport',
      actionLabel: language === 'pt' ? 'Ver Detalhes' : 'View Details'
    })
  }

  const notifyCommunityUpdate = (type: 'chat_message' | 'group_activity' | 'cultural_event', data: any) => {
    const titles = {
      chat_message: { en: 'New Message', pt: 'Nova Mensagem' },
      group_activity: { en: 'Group Activity', pt: 'Atividade do Grupo' },
      cultural_event: { en: 'Cultural Event', pt: 'Evento Cultural' }
    }

    addNotification({
      type: type === 'chat_message' ? 'chat_message' : type === 'group_activity' ? 'group_activity' : 'cultural_event',
      category: 'community',
      title: titles[type][language as 'en' | 'pt'],
      message: data.message || (language === 'pt' ? 'Nova atividade na comunidade portuguesa' : 'New activity in Portuguese community'),
      userId: 'current-user',
      priority: 'medium',
      data,
      actionUrl: '/events',
      actionLabel: language === 'pt' ? 'Ver Comunidade' : 'View Community'
    })
  }

  const notifyBusinessUpdate = (type: 'partnership_invite' | 'opportunity', data: any) => {
    const titles = {
      partnership_invite: { en: 'Partnership Invitation', pt: 'Convite de Parceria' },
      opportunity: { en: 'Business Opportunity', pt: 'Oportunidade de Negócio' }
    }

    addNotification({
      type: 'business_opportunity',
      category: 'business',
      title: titles[type][language as 'en' | 'pt'],
      message: data.message || (language === 'pt' ? 'Nova oportunidade de negócio português' : 'New Portuguese business opportunity'),
      userId: 'current-user',
      priority: 'high',
      data,
      actionUrl: '/corporate-partnerships',
      actionLabel: language === 'pt' ? 'Ver Oportunidade' : 'View Opportunity'
    })
  }

  const notifyStudentUpdate = (type: 'university_event' | 'career_opportunity', data: any) => {
    const titles = {
      university_event: { en: 'University Event', pt: 'Evento Universitário' },
      career_opportunity: { en: 'Career Opportunity', pt: 'Oportunidade de Carreira' }
    }

    addNotification({
      type: type === 'university_event' ? 'student_event' : 'career_opportunity',
      category: 'students',
      title: titles[type][language as 'en' | 'pt'],
      message: data.message || (language === 'pt' ? 'Nova oportunidade para estudantes portugueses' : 'New opportunity for Portuguese students'),
      userId: 'current-user',
      priority: 'medium',
      data,
      actionUrl: '/students',
      actionLabel: language === 'pt' ? 'Ver Detalhes' : 'View Details'
    })
  }

  // Analytics and optimization
  const trackNotificationEngagement = (notificationId: string, action: 'clicked' | 'dismissed' | 'shared') => {
    // In production, this would send analytics data to tracking service
    console.log(`Notification ${notificationId} was ${action}`)
  }

  const getPersonalizedRecommendations = (): BaseNotification[] => {
    if (!personalization) return []

    // Simple recommendation algorithm based on user interests and engagement
    const recommendations: BaseNotification[] = []
    
    if (personalization.interests.includes('fado')) {
      recommendations.push({
        id: 'rec-fado',
        type: 'cultural_event',
        category: 'community',
        title: 'Fado Night Recommendation',
        message: 'Based on your interest in Fado, we recommend tonight\'s performance at Portuguese Cultural Centre',
        titlePT: 'Recomendação de Noite de Fado',
        messagePT: 'Com base no seu interesse no Fado, recomendamos a apresentação de hoje à noite no Centro Cultural Português',
        userId: 'current-user',
        isRead: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        actionUrl: '/events',
        actionLabel: 'Book Now',
        actionLabelPT: 'Reservar Agora'
      })
    }

    if (personalization.connectionGoals.includes('professional')) {
      recommendations.push({
        id: 'rec-networking',
        type: 'business_opportunity',
        category: 'business',
        title: 'Professional Networking Match',
        message: 'We found Portuguese professionals in your industry attending tomorrow\'s business mixer',
        titlePT: 'Compatibilidade de Networking Profissional',
        messagePT: 'Encontrámos profissionais portugueses da sua área que vão ao evento de negócios de amanhã',
        userId: 'current-user',
        isRead: false,
        priority: 'high',
        createdAt: new Date().toISOString(),
        actionUrl: '/my-network',
        actionLabel: 'View Matches',
        actionLabelPT: 'Ver Compatibilidades'
      })
    }

    return recommendations
  }

  const optimizeSendTimes = async () => {
    // Analyze user engagement patterns and optimize notification timing
    if (!analytics) return

    const optimalTimes = ['18:00', '19:30', '12:00'] // Mock optimal times
    
    if (preferences) {
      await updatePreferences({
        ...preferences,
        // Could update frequency based on optimal times
      })
    }
  }

  const generateInsights = async (): Promise<NotificationAnalytics> => {
    const insights: NotificationAnalytics = {
      userId: 'current-user',
      totalNotifications: notifications.length,
      readRate: notifications.length > 0 ? (notifications.filter(n => n.isRead).length / notifications.length) * 100 : 0,
      responseRate: 75, // Mock response rate
      categoryBreakdown: {
        networking: notifications.filter(n => n.category === 'networking').length,
        services: notifications.filter(n => n.category === 'services').length,
        community: notifications.filter(n => n.category === 'community').length,
        business: notifications.filter(n => n.category === 'business').length,
        students: notifications.filter(n => n.category === 'students').length,
        subscription: notifications.filter(n => n.category === 'subscription').length,
        system: notifications.filter(n => n.category === 'system').length,
        heritage: notifications.filter(n => n.category === 'heritage').length,
        events: notifications.filter(n => n.category === 'events').length,
        transport: notifications.filter(n => n.category === 'transport').length,
      },
      channelEffectiveness: {
        in_app: 90,
        email: 65,
        whatsapp: 85,
        sms: 95,
        push: 80,
      },
      optimalSendTimes: ['18:00', '19:30', '12:00'],
      engagementScore: 82,
      lastUpdated: new Date().toISOString(),
    }

    setAnalytics(insights)
    return insights
  }

  const unreadCount = notifications.filter(notif => !notif.isRead).length

  const value: NotificationContextType = {
    notifications,
    preferences,
    personalization,
    analytics,
    unreadCount,
    loading,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearExpiredNotifications,
    getNotificationsByCategory,
    getNotificationsByType,
    getUnreadNotifications,
    searchNotifications,
    updatePreferences,
    updatePersonalization,
    getChannelSettings,
    updateChannelSettings,
    sendPersonalizedNotification,
    scheduleNotification,
    sendCulturalNotification,
    sendBusinessNotification,
    notifyNetworkingUpdate,
    notifyServiceUpdate,
    notifyCommunityUpdate,
    notifyBusinessUpdate,
    notifyStudentUpdate,
    trackNotificationEngagement,
    getPersonalizedRecommendations,
    optimizeSendTimes,
    generateInsights,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Backward-compatible alias used by some components
export const useNotification = useNotifications