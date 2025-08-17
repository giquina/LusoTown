'use client'

import { useEffect, useCallback } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useNotificationIntegration } from '@/hooks/useNotificationIntegration'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface SmartNotificationTriggerProps {
  // Context-based triggers
  page?: 'events' | 'transport' | 'networking' | 'services' | 'students' | 'business' | 'heritage'
  action?: 'page_view' | 'booking' | 'connection' | 'event_creation' | 'registration'
  
  // Event-specific triggers
  eventType?: 'cultural' | 'business' | 'networking' | 'educational' | 'student'
  eventData?: {
    name?: string
    date?: string
    location?: string
    organizer?: string
  }
  
  // Service-specific triggers
  serviceType?: 'transport' | 'tours' | 'sia_compliance' | 'close_protection'
  serviceData?: {
    bookingRef?: string
    serviceDate?: string
    status?: string
  }
  
  // User context
  userInterests?: string[]
  userLocation?: string
  membershipTier?: string
  
  // Timing controls
  delay?: number // milliseconds
  triggerOnce?: boolean
  sessionKey?: string // for triggerOnce functionality
}

export default function SmartNotificationTrigger({
  page,
  action = 'page_view',
  eventType,
  eventData,
  serviceType,
  serviceData,
  userInterests = [],
  userLocation,
  membershipTier,
  delay = 0,
  triggerOnce = false,
  sessionKey
}: SmartNotificationTriggerProps) {
  const { addNotification, getPersonalizedRecommendations } = useNotifications()
  const { 
    notifyEventInvitation,
    notifyTransportBooking,
    notifyBusinessOpportunity,
    notifyUniversityEvent,
    notifyHeritageUpdate,
    notifyCulturalEvent
  } = useNotificationIntegration()
  const { language } = useLanguage()
  const { hasActiveSubscription, membershipTier: currentMembershipTier } = useSubscription()

  // Check if notification should be triggered based on session key
  const shouldTrigger = useCallback(() => {
    if (!triggerOnce) return true
    if (!sessionKey) return true
    
    const hasTriggered = sessionStorage.getItem(`notification-trigger-${sessionKey}`)
    return !hasTriggered
  }, [triggerOnce, sessionKey])

  // Mark notification as triggered
  const markAsTriggered = useCallback(() => {
    if (triggerOnce && sessionKey) {
      sessionStorage.setItem(`notification-trigger-${sessionKey}`, 'true')
    }
  }, [triggerOnce, sessionKey])

  // Context-aware notification logic
  const triggerContextualNotification = useCallback(() => {
    if (!shouldTrigger()) return

    // Page-specific contextual notifications
    switch (page) {
      case 'events':
        if (action === 'page_view') {
          // Suggest relevant events based on user interests
          if (userInterests.includes('fado')) {
            notifyCulturalEvent({
              eventName: language === 'pt' ? 'Noite de Fado no Centro Cultural' : 'Fado Night at Cultural Centre',
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Portuguese Cultural Centre, London',
              type: 'fado'
            })
          }
          
          if (userInterests.includes('networking') && hasActiveSubscription) {
            notifyBusinessOpportunity({
              title: language === 'pt' ? 'Networking Empresarial Português' : 'Portuguese Business Networking',
              company: 'LusoTown Business Network',
              location: 'Central London',
              type: 'networking'
            })
          }
        }
        break

      case 'transport':
        if (action === 'page_view' && !hasActiveSubscription) {
          addNotification({
            type: 'subscription_update',
            category: 'subscription',
            title: language === 'pt' ? 'Subscrição Necessária' : 'Subscription Required',
            message: language === 'pt' 
              ? 'Precisa de uma subscrição ativa para reservar serviços de transporte'
              : 'You need an active subscription to book transport services',
            userId: 'current-user',
            priority: 'high',
            actionUrl: '/subscription',
            actionLabel: language === 'pt' ? 'Subscrever' : 'Subscribe'
          })
        } else if (action === 'booking' && serviceData) {
          notifyTransportBooking({
            date: serviceData.serviceDate || new Date().toISOString(),
            time: '15:00',
            service: serviceType === 'close_protection' ? 'Close Protection' : 'Executive Transport',
            confirmationCode: serviceData.bookingRef
          })
        }
        break

      case 'networking':
        if (action === 'page_view') {
          // Show networking opportunities
          addNotification({
            type: 'new_match',
            category: 'networking',
            title: language === 'pt' ? 'Novas Compatibilidades Disponíveis' : 'New Matches Available',
            message: language === 'pt' 
              ? 'Encontrámos profissionais portugueses com interesses similares'
              : 'We found Portuguese professionals with similar interests',
            userId: 'current-user',
            priority: 'medium',
            actionUrl: '/my-network',
            actionLabel: language === 'pt' ? 'Ver Compatibilidades' : 'View Matches'
          })
        }
        break

      case 'students':
        if (action === 'page_view') {
          notifyUniversityEvent({
            universityName: 'University College London',
            eventName: language === 'pt' ? 'Associação Portuguesa - Noite de Networking' : 'Portuguese Society - Networking Night',
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'networking'
          })
        }
        break

      case 'business':
        if (action === 'page_view') {
          notifyBusinessOpportunity({
            title: language === 'pt' ? 'Oportunidade de Parceria' : 'Partnership Opportunity',
            company: 'Portuguese Tech Hub London',
            location: 'Canary Wharf',
            type: 'partnership'
          })
        }
        break

      case 'heritage':
        if (action === 'page_view') {
          notifyHeritageUpdate({
            title: language === 'pt' ? 'Nova História da Comunidade' : 'New Community Story',
            type: 'story',
            contributor: 'Maria Santos',
            location: 'Vauxhall Portuguese Community'
          })
        }
        break

      case 'services':
        if (action === 'page_view' && !hasActiveSubscription) {
          addNotification({
            type: 'trial_expiring',
            category: 'subscription',
            title: language === 'pt' ? 'Experimente Serviços Premium' : 'Try Premium Services',
            message: language === 'pt' 
              ? 'Desbloqueie transporte SIA, tours culturais e networking exclusivo'
              : 'Unlock SIA transport, cultural tours, and exclusive networking',
            userId: 'current-user',
            priority: 'medium',
            actionUrl: '/subscription',
            actionLabel: language === 'pt' ? 'Ver Planos' : 'View Plans'
          })
        }
        break
    }

    markAsTriggered()
  }, [
    page, action, eventType, eventData, serviceType, serviceData,
    userInterests, hasActiveSubscription, language, shouldTrigger, markAsTriggered,
    addNotification, notifyCulturalEvent, notifyBusinessOpportunity, 
    notifyTransportBooking, notifyUniversityEvent, notifyHeritageUpdate
  ])

  // Membership tier specific notifications
  const triggerMembershipNotifications = useCallback(() => {
    if (!hasActiveSubscription && currentMembershipTier === 'none') {
      // Free tier limitations
      addNotification({
        type: 'subscription_update',
        category: 'subscription',
        title: language === 'pt' ? 'Desbloqueie Mais Funcionalidades' : 'Unlock More Features',
        message: language === 'pt' 
          ? 'Torne-se membro para aceder a serviços exclusivos da comunidade'
          : 'Become a member to access exclusive community services',
        userId: 'current-user',
        priority: 'low',
        actionUrl: '/subscription',
        actionLabel: language === 'pt' ? 'Ver Benefícios' : 'View Benefits'
      })
    }
  }, [hasActiveSubscription, currentMembershipTier, language, addNotification])

  // Location-based notifications
  const triggerLocationNotifications = useCallback(() => {
    if (userLocation) {
      // South London Portuguese community focus
      if (userLocation.toLowerCase().includes('south') || 
          userLocation.toLowerCase().includes('vauxhall') ||
          userLocation.toLowerCase().includes('stockwell')) {
        addNotification({
          type: 'community_announcement',
          category: 'community',
          title: language === 'pt' ? 'Comunidade Sul de Londres' : 'South London Community',
          message: language === 'pt' 
            ? 'Descubra eventos próximos na sua área da comunidade portuguesa'
            : 'Discover nearby events in your Portuguese community area',
          userId: 'current-user',
          priority: 'low',
          actionUrl: '/events?location=south-london',
          actionLabel: language === 'pt' ? 'Ver Eventos Locais' : 'View Local Events'
        })
      }
    }
  }, [userLocation, language, addNotification])

  // Interest-based smart suggestions
  const triggerInterestNotifications = useCallback(() => {
    if (userInterests.length > 0) {
      // Cultural interests
      if (userInterests.includes('portuguese_cuisine')) {
        addNotification({
          type: 'cultural_event',
          category: 'community',
          title: language === 'pt' ? 'Tour Gastronómico Português' : 'Portuguese Food Tour',
          message: language === 'pt' 
            ? 'Explore restaurantes portugueses autênticos em Little Portugal'
            : 'Explore authentic Portuguese restaurants in Little Portugal',
          userId: 'current-user',
          priority: 'medium',
          actionUrl: '/events?category=food-tours',
          actionLabel: language === 'pt' ? 'Reservar Tour' : 'Book Tour'
        })
      }

      // Professional interests
      if (userInterests.includes('technology') && hasActiveSubscription) {
        notifyBusinessOpportunity({
          title: language === 'pt' ? 'Tech Meetup Português' : 'Portuguese Tech Meetup',
          company: 'Portuguese Tech Community London',
          location: 'Shoreditch',
          type: 'networking'
        })
      }
    }
  }, [userInterests, hasActiveSubscription, language, addNotification, notifyBusinessOpportunity])

  // Main effect to trigger notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerContextualNotification()
      triggerMembershipNotifications()
      triggerLocationNotifications()
      triggerInterestNotifications()
    }, delay)

    return () => clearTimeout(timer)
  }, [
    delay,
    triggerContextualNotification,
    triggerMembershipNotifications,
    triggerLocationNotifications,
    triggerInterestNotifications
  ])

  // Component doesn't render anything - it's purely functional
  return null
}