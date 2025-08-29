'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand'

interface ConnectionNotification {
  id: string
  type: 'new_connection' | 'message' | 'event_invite' | 'business_opportunity' | 'mentorship_request' | 'cultural_event'
  title: string
  titlePt: string
  message: string
  messagePt: string
  timestamp: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionLabel?: string
  actionLabelPt?: string
  secondaryActionLabel?: string
  secondaryActionLabelPt?: string
  relatedUser?: {
    name: string
    avatar: string
    heritage: string
    location: string
  }
  relatedEvent?: {
    name: string
    date: string
    location: string
  }
  dismissed?: boolean
}

interface ConnectionNotificationBannerProps {
  notifications?: ConnectionNotification[]
  onNotificationAction: (notificationId: string, action: 'primary' | 'secondary' | 'dismiss') => void
  maxVisible?: number
  autoHideDelay?: number
  className?: string
}

const MOCK_NOTIFICATIONS: ConnectionNotification[] = [
  {
    id: '1',
    type: 'new_connection',
    title: 'New Connection Request',
    titlePt: 'Nova Solicitação de Conexão',
    message: 'Maria Santos from London wants to connect with you',
    messagePt: 'Maria Santos de Londres quer conectar-se consigo',
    timestamp: '2 minutes ago',
    priority: 'high',
    actionLabel: 'Accept',
    actionLabelPt: 'Aceitar',
    secondaryActionLabel: 'View Profile',
    secondaryActionLabelPt: 'Ver Perfil',
    relatedUser: {
      name: 'Maria Santos',
      avatar: '/images/profiles/maria.jpg',
      heritage: 'Portuguese',
      location: 'London, UK'
    }
  },
  {
    id: '2',
    type: 'event_invite',
    title: 'Portuguese Cultural Evening Invitation',
    titlePt: 'Convite para Noite Cultural Portuguesa',
    message: 'You\'ve been invited to a Portuguese cultural celebration this Saturday',
    messagePt: 'Foi convidado para uma celebração cultural portuguesa este sábado',
    timestamp: '1 hour ago',
    priority: 'medium',
    actionLabel: 'RSVP',
    actionLabelPt: 'Responder',
    secondaryActionLabel: 'Learn More',
    secondaryActionLabelPt: 'Saber Mais',
    relatedEvent: {
      name: 'Portuguese Cultural Evening',
      date: 'Saturday, August 31st',
      location: 'Cultural Centre, London'
    }
  },
  {
    id: '3',
    type: 'mentorship_request',
    title: 'Mentorship Opportunity',
    titlePt: 'Oportunidade de Mentoria',
    message: 'A Brazilian student at UCL is looking for career guidance',
    messagePt: 'Um estudante brasileiro na UCL procura orientação profissional',
    timestamp: '3 hours ago',
    priority: 'medium',
    actionLabel: 'Offer Help',
    actionLabelPt: 'Oferecer Ajuda',
    secondaryActionLabel: 'Not Now',
    secondaryActionLabelPt: 'Agora Não',
    relatedUser: {
      name: 'Carlos Silva',
      avatar: '/images/profiles/carlos.jpg',
      heritage: 'Brazilian',
      location: 'London, UK'
    }
  },
  {
    id: '4',
    type: 'business_opportunity',
    title: 'Business Partnership Opportunity',
    titlePt: 'Oportunidade de Parceria Empresarial',
    message: 'A Portuguese business owner wants to discuss collaboration',
    messagePt: 'Um empresário português quer discutir colaboração',
    timestamp: '6 hours ago',
    priority: 'high',
    actionLabel: 'Connect',
    actionLabelPt: 'Conectar',
    secondaryActionLabel: 'Learn More',
    secondaryActionLabelPt: 'Saber Mais',
    relatedUser: {
      name: 'Ana Rodrigues',
      avatar: '/images/profiles/ana.jpg',
      heritage: 'Portuguese',
      location: 'Manchester, UK'
    }
  }
]

export default function ConnectionNotificationBanner({
  notifications = MOCK_NOTIFICATIONS,
  onNotificationAction,
  maxVisible = 3,
  autoHideDelay = 0,
  className = ''
}: ConnectionNotificationBannerProps) {
  const { language } = useLanguage()
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set())
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_connection': return '👥'
      case 'message': return '💬'
      case 'event_invite': return '📅'
      case 'business_opportunity': return '💼'
      case 'mentorship_request': return '🎓'
      case 'cultural_event': return '🎭'
      default: return '🔔'
    }
  }

  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'urgent': return {
        bg: `${PORTUGUESE_COLORS.red[500]}20`,
        border: PORTUGUESE_COLORS.red[500],
        accent: PORTUGUESE_COLORS.red[500]
      }
      case 'high': return {
        bg: `${brandColors.primary}20`,
        border: brandColors.primary,
        accent: brandColors.primary
      }
      case 'medium': return {
        bg: `${PORTUGUESE_COLORS.green[500]}20`,
        border: PORTUGUESE_COLORS.green[500],
        accent: PORTUGUESE_COLORS.green[500]
      }
      default: return {
        bg: '#F3F4F6',
        border: '#D1D5DB',
        accent: '#6B7280'
      }
    }
  }

  const getHeritageFlag = (heritage: string) => {
    const flags = {
      'Portuguese': '🇵🇹',
      'Brazilian': '🇧🇷',
      'Cape Verdean': '🇨🇻',
      'Angolan': '🇦🇴',
      'Mozambican': '🇲🇿',
      'Guinea-Bissau': '🇬🇼',
      'São Tomé': '🇸🇹',
      'East Timorese': '🇹🇱'
    }
    return flags[heritage as keyof typeof flags] || '🇵🇹'
  }

  const formatTimestamp = (timestamp: string) => {
    if (language === 'pt') {
      return timestamp
        .replace('minutes ago', 'minutos atrás')
        .replace('minute ago', 'minuto atrás')
        .replace('hours ago', 'horas atrás')
        .replace('hour ago', 'hora atrás')
        .replace('days ago', 'dias atrás')
        .replace('day ago', 'dia atrás')
    }
    return timestamp
  }

  const handleDismiss = (notificationId: string) => {
    setDismissedNotifications(prev => new Set([...prev, notificationId]))
    onNotificationAction(notificationId, 'dismiss')
  }

  const handleAction = (notificationId: string, action: 'primary' | 'secondary') => {
    onNotificationAction(notificationId, action)
  }

  const visibleNotifications = notifications
    .filter(notification => !dismissedNotifications.has(notification.id))
    .slice(0, maxVisible)

  if (visibleNotifications.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      {visibleNotifications.map((notification) => {
        const colors = getPriorityColors(notification.priority)
        const isExpanded = expandedNotification === notification.id

        return (
          <div
            key={notification.id}
            className="rounded-xl border-l-4 shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden"
            style={{
              backgroundColor: colors.bg,
              borderLeftColor: colors.border
            }}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Notification Icon */}
                <div className="text-2xl flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {language === 'pt' ? notification.titlePt : notification.title}
                      </h3>
                      <p className="text-gray-700 mb-2 leading-relaxed">
                        {language === 'pt' ? notification.messagePt : notification.message}
                      </p>

                      {/* Related User Info */}
                      {notification.relatedUser && (
                        <div className="flex items-center gap-3 mb-3 p-3 bg-white bg-opacity-50 rounded-lg">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {notification.relatedUser.name.charAt(0)}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 text-xs">
                              {getHeritageFlag(notification.relatedUser.heritage)}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {notification.relatedUser.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {notification.relatedUser.location}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Related Event Info */}
                      {notification.relatedEvent && (
                        <div className="mb-3 p-3 bg-white bg-opacity-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">📅</span>
                            <p className="font-medium text-gray-900 text-sm">
                              {notification.relatedEvent.name}
                            </p>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span>🗓️</span>
                              {notification.relatedEvent.date}
                            </div>
                            <div className="flex items-center gap-2">
                              <span>📍</span>
                              {notification.relatedEvent.location}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <p className="text-xs text-gray-500 mb-3">
                        {formatTimestamp(notification.timestamp)}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 flex-wrap">
                        {notification.actionLabel && (
                          <button
                            onClick={() => handleAction(notification.id, 'primary')}
                            className="px-4 py-2 rounded-lg text-white font-medium text-sm transition-all duration-200 hover:shadow-md hover:scale-105"
                            style={{ backgroundColor: colors.accent }}
                          >
                            {language === 'pt' ? notification.actionLabelPt : notification.actionLabel}
                          </button>
                        )}
                        {notification.secondaryActionLabel && (
                          <button
                            onClick={() => handleAction(notification.id, 'secondary')}
                            className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-50 border border-gray-200"
                          >
                            {language === 'pt' ? notification.secondaryActionLabelPt : notification.secondaryActionLabel}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Dismiss Button */}
                    <button
                      onClick={() => handleDismiss(notification.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
                      aria-label={language === 'pt' ? 'Dispensar notificação' : 'Dismiss notification'}
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Indicator */}
            <div className="h-1" style={{ backgroundColor: colors.accent }}></div>
          </div>
        )
      })}

      {/* Show More Notifications */}
      {notifications.length > maxVisible && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg"
          >
            {language === 'pt' 
              ? `Ver mais ${notifications.length - maxVisible} notificações`
              : `View ${notifications.length - maxVisible} more notifications`
            }
          </button>
        </div>
      )}

      {/* Notification Summary */}
      {visibleNotifications.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {language === 'pt'
              ? `${visibleNotifications.length} notificações ativas da comunidade lusófona`
              : `${visibleNotifications.length} active Portuguese-speaking community notifications`
            }
          </p>
        </div>
      )}
    </div>
  )
}