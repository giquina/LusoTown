'use client'

import { ROUTES } from '@/config';
import { useCallback, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Custom hook to integrate notifications with existing platform features
 * Automatically sends notifications based on platform activities
 */
export function useNotificationIntegration() {
  const { 
    notifyNetworkingUpdate,
    notifyServiceUpdate,
    notifyCommunityUpdate,
    notifyBusinessUpdate,
    notifyStudentUpdate,
    addNotification
  } = useNotifications()
  const { connections, stats } = useNetworking()
  const { subscription, membershipTier, hasActiveSubscription } = useSubscription()
  const { language } = useLanguage()

  // Track networking events
  const notifyNewConnection = useCallback((connectionData: {
    name: string
    eventName?: string
    profileUrl?: string
  }) => {
    notifyNetworkingUpdate('new_connection', {
      name: connectionData.name,
      eventName: connectionData.eventName,
      profileUrl: connectionData.profileUrl
    })
  }, [notifyNetworkingUpdate])

  const notifyNewMatch = useCallback((matchData: {
    name: string
    compatibilityScore: number
    sharedInterests: string[]
    location?: string
  }) => {
    notifyNetworkingUpdate('new_match', {
      name: matchData.name,
      score: matchData.compatibilityScore,
      interests: matchData.sharedInterests.join(', '),
      location: matchData.location
    })
  }, [notifyNetworkingUpdate])

  const notifyEventInvitation = useCallback((eventData: {
    eventName: string
    eventDate: string
    location: string
    inviterName?: string
  }) => {
    notifyNetworkingUpdate('event_invitation', {
      eventName: eventData.eventName,
      eventDate: eventData.eventDate,
      location: eventData.location,
      inviterName: eventData.inviterName
    })
  }, [notifyNetworkingUpdate])

  // Track service events
  const notifyTransportBooking = useCallback((bookingData: {
    date: string
    time: string
    service: string
    driver?: string
    confirmationCode?: string
  }) => {
    notifyServiceUpdate('booking_confirmed', {
      message: language === 'pt' 
        ? `Transporte confirmado para ${bookingData.date} às ${bookingData.time}`
        : `Transport confirmed for ${bookingData.date} at ${bookingData.time}`,
      date: bookingData.date,
      time: bookingData.time,
      service: bookingData.service,
      driver: bookingData.driver,
      confirmationCode: bookingData.confirmationCode
    })
  }, [notifyServiceUpdate, language])

  const notifySIACompliance = useCallback((complianceData: {
    status: 'pending' | 'approved' | 'requires_update'
    message?: string
  }) => {
    notifyServiceUpdate('sia_update', {
      message: complianceData.message || (
        language === 'pt' 
          ? `Status SIA: ${complianceData.status}`
          : `SIA Status: ${complianceData.status}`
      ),
      status: complianceData.status
    })
  }, [notifyServiceUpdate, language])

  const notifyTransportUpdate = useCallback((updateData: {
    type: 'delay' | 'cancellation' | 'driver_change' | 'route_change'
    message: string
    bookingRef?: string
  }) => {
    notifyServiceUpdate('transport_update', {
      message: updateData.message,
      type: updateData.type,
      bookingRef: updateData.bookingRef
    })
  }, [notifyServiceUpdate])

  // Track community events
  const notifyChatMessage = useCallback((messageData: {
    senderName: string
    groupName?: string
    preview: string
    unreadCount?: number
  }) => {
    notifyCommunityUpdate('chat_message', {
      message: language === 'pt'
        ? `${messageData.senderName}: ${messageData.preview}`
        : `${messageData.senderName}: ${messageData.preview}`,
      senderName: messageData.senderName,
      groupName: messageData.groupName,
      preview: messageData.preview,
      unreadCount: messageData.unreadCount
    })
  }, [notifyCommunityUpdate, language])

  const notifyGroupActivity = useCallback((activityData: {
    groupName: string
    activity: string
    memberCount?: number
  }) => {
    notifyCommunityUpdate('group_activity', {
      message: language === 'pt'
        ? `Nova atividade em ${activityData.groupName}: ${activityData.activity}`
        : `New activity in ${activityData.groupName}: ${activityData.activity}`,
      groupName: activityData.groupName,
      activity: activityData.activity,
      memberCount: activityData.memberCount
    })
  }, [notifyCommunityUpdate, language])

  const notifyCulturalEvent = useCallback((eventData: {
    eventName: string
    date: string
    location: string
    type: 'fado' | 'festival' | 'cultural' | 'heritage'
  }) => {
    notifyCommunityUpdate('cultural_event', {
      message: language === 'pt'
        ? `Novo evento cultural: ${eventData.eventName} em ${eventData.location}`
        : `New cultural event: ${eventData.eventName} in ${eventData.location}`,
      eventName: eventData.eventName,
      date: eventData.date,
      location: eventData.location,
      type: eventData.type
    })
  }, [notifyCommunityUpdate, language])

  // Track business events
  const notifyPartnershipInvite = useCallback((partnershipData: {
    companyName: string
    sector: string
    opportunity: string
    contactPerson?: string
  }) => {
    notifyBusinessUpdate('partnership_invite', {
      message: language === 'pt'
        ? `Nova parceria com ${partnershipData.companyName} no setor ${partnershipData.sector}`
        : `New partnership with ${partnershipData.companyName} in ${partnershipData.sector}`,
      companyName: partnershipData.companyName,
      sector: partnershipData.sector,
      opportunity: partnershipData.opportunity,
      contactPerson: partnershipData.contactPerson
    })
  }, [notifyBusinessUpdate, language])

  const notifyBusinessOpportunity = useCallback((opportunityData: {
    title: string
    company: string
    location: string
    type: 'job' | 'contract' | 'partnership' | 'investment'
  }) => {
    notifyBusinessUpdate('opportunity', {
      message: language === 'pt'
        ? `Nova oportunidade: ${opportunityData.title} na ${opportunityData.company}`
        : `New opportunity: ${opportunityData.title} at ${opportunityData.company}`,
      title: opportunityData.title,
      company: opportunityData.company,
      location: opportunityData.location,
      type: opportunityData.type
    })
  }, [notifyBusinessUpdate, language])

  // Track student events
  const notifyUniversityEvent = useCallback((eventData: {
    universityName: string
    eventName: string
    date: string
    type: 'academic' | 'cultural' | 'networking' | 'career'
  }) => {
    notifyStudentUpdate('university_event', {
      message: language === 'pt'
        ? `Evento universitário: ${eventData.eventName} na ${eventData.universityName}`
        : `University event: ${eventData.eventName} at ${eventData.universityName}`,
      universityName: eventData.universityName,
      eventName: eventData.eventName,
      date: eventData.date,
      type: eventData.type
    })
  }, [notifyStudentUpdate, language])

  const notifyCareerOpportunity = useCallback((careerData: {
    position: string
    company: string
    location: string
    level: 'entry' | 'mid' | 'senior'
    type: 'internship' | 'graduate' | 'full-time'
  }) => {
    notifyStudentUpdate('career_opportunity', {
      message: language === 'pt'
        ? `Oportunidade de carreira: ${careerData.position} na ${careerData.company}`
        : `Career opportunity: ${careerData.position} at ${careerData.company}`,
      position: careerData.position,
      company: careerData.company,
      location: careerData.location,
      level: careerData.level,
      type: careerData.type
    })
  }, [notifyStudentUpdate, language])

  // Track subscription events
  const notifySubscriptionUpdate = useCallback((updateData: {
    type: 'upgrade' | 'downgrade' | 'renewal' | 'expiring' | 'cancelled'
    tier?: string
    expiryDate?: string
    benefits?: string[]
  }) => {
    const messages = {
      upgrade: {
        pt: `Subscrição atualizada para ${updateData.tier}`,
        en: `Subscription upgraded to ${updateData.tier}`
      },
      downgrade: {
        pt: `Subscrição alterada para ${updateData.tier}`,
        en: `Subscription changed to ${updateData.tier}`
      },
      renewal: {
        pt: 'Subscrição renovada com sucesso',
        en: 'Subscription renewed successfully'
      },
      expiring: {
        pt: `Subscrição expira em ${updateData.expiryDate}`,
        en: `Subscription expires on ${updateData.expiryDate}`
      },
      cancelled: {
        pt: 'Subscrição cancelada',
        en: 'Subscription cancelled'
      }
    }

    addNotification({
      type: updateData.type === 'expiring' ? 'trial_expiring' : 'subscription_update',
      category: 'subscription',
      title: language === 'pt' ? 'Atualização de Subscrição' : 'Subscription Update',
      message: messages[updateData.type][language as 'pt' | 'en'],
      userId: 'current-user',
      priority: updateData.type === 'expiring' ? 'high' : 'medium',
      data: updateData,
      actionUrl: '/subscription',
      actionLabel: language === 'pt' ? 'Ver Detalhes' : 'View Details'
    })
  }, [addNotification, language])

  // Track live streaming events
  const notifyLiveStream = useCallback((streamData: {
    title: string
    startTime: string
    category: 'cultural' | 'business' | 'educational' | 'entertainment'
    host?: string
  }) => {
    addNotification({
      type: 'live_stream',
      category: 'events',
      title: language === 'pt' ? 'Stream ao Vivo' : 'Live Stream',
      message: language === 'pt'
        ? `${streamData.title} começa às ${streamData.startTime}`
        : `${streamData.title} starts at ${streamData.startTime}`,
      userId: 'current-user',
      priority: 'medium',
      data: streamData,
      actionUrl: ROUTES.live,
      actionLabel: language === 'pt' ? 'Assistir' : 'Watch'
    })
  }, [addNotification, language])

  // Track heritage and cultural preservation events
  const notifyHeritageUpdate = useCallback((heritageData: {
    title: string
    type: 'artifact' | 'story' | 'tradition' | 'celebration'
    contributor?: string
    location?: string
  }) => {
    addNotification({
      type: 'heritage_update',
      category: 'heritage',
      title: language === 'pt' ? 'Património Cultural' : 'Cultural Heritage',
      message: language === 'pt'
        ? `Nova contribuição: ${heritageData.title}`
        : `New contribution: ${heritageData.title}`,
      userId: 'current-user',
      priority: 'low',
      data: heritageData,
      actionUrl: '/heritage',
      actionLabel: language === 'pt' ? 'Explorar' : 'Explore'
    })
  }, [addNotification, language])

  // Monitor connection changes for automatic notifications
  useEffect(() => {
    const previousConnectionCount = parseInt(localStorage.getItem('lusotown-previous-connection-count') || '0')
    const currentConnectionCount = connections.length

    if (currentConnectionCount > previousConnectionCount) {
      const newConnections = currentConnectionCount - previousConnectionCount
      if (newConnections > 0) {
        addNotification({
          type: 'connection_request',
          category: 'networking',
          title: language === 'pt' ? 'Novas Ligações!' : 'New Connections!',
          message: language === 'pt'
            ? `Tem ${newConnections} nova${newConnections > 1 ? 's' : ''} ligaç${newConnections > 1 ? 'ões' : 'ão'} na rede`
            : `You have ${newConnections} new connection${newConnections > 1 ? 's' : ''} in your network`,
          userId: 'current-user',
          priority: 'medium',
          actionUrl: '/my-network',
          actionLabel: language === 'pt' ? 'Ver Rede' : 'View Network'
        })
      }
    }

    localStorage.setItem('lusotown-previous-connection-count', currentConnectionCount.toString())
  }, [connections.length, addNotification, language])

  // Monitor subscription status for notifications
  useEffect(() => {
    const previousSubscriptionStatus = localStorage.getItem('lusotown-previous-subscription-status')
    const currentSubscriptionStatus = hasActiveSubscription ? 'active' : 'inactive'

    if (previousSubscriptionStatus && previousSubscriptionStatus !== currentSubscriptionStatus) {
      if (currentSubscriptionStatus === 'active') {
        notifySubscriptionUpdate({
          type: 'upgrade',
          tier: membershipTier,
          benefits: ['Transport services', 'Premium networking', 'Cultural events']
        })
      } else {
        notifySubscriptionUpdate({
          type: 'cancelled'
        })
      }
    }

    localStorage.setItem('lusotown-previous-subscription-status', currentSubscriptionStatus)
  }, [hasActiveSubscription, membershipTier, notifySubscriptionUpdate])

  return {
    // Networking notifications
    notifyNewConnection,
    notifyNewMatch,
    notifyEventInvitation,
    
    // Service notifications
    notifyTransportBooking,
    notifySIACompliance,
    notifyTransportUpdate,
    
    // Community notifications
    notifyChatMessage,
    notifyGroupActivity,
    notifyCulturalEvent,
    
    // Business notifications
    notifyPartnershipInvite,
    notifyBusinessOpportunity,
    
    // Student notifications
    notifyUniversityEvent,
    notifyCareerOpportunity,
    
    // Subscription notifications
    notifySubscriptionUpdate,
    
    // Other notifications
    notifyLiveStream,
    notifyHeritageUpdate
  }
}