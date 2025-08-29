'use client'

import React, { useState, useEffect } from 'react'
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
  actionLabel: string
  actionLabelPt: string
  senderName: string
  senderHeritage: string
  senderAvatar?: string
  dismissed: boolean
  actionUrl?: string
}

interface ConnectionNotificationBannerProps {
  notifications?: ConnectionNotification[]
  onNotificationAction: (notificationId: string, actionType: 'accept' | 'dismiss' | 'view') => void
  className?: string
  maxVisible?: number
  autoHideDelay?: number
}

const MOCK_NOTIFICATIONS: ConnectionNotification[] = [
  {
    id: '1',
    type: 'new_connection',
    title: 'New Connection Request',
    titlePt: 'Nova Solicitação de Conexão',
    message: 'Maria Santos wants to connect with you',
    messagePt: 'Maria Santos quer conectar-se consigo',
    timestamp: '2 minutes ago',
    priority: 'medium',
    actionLabel: 'Accept',
    actionLabelPt: 'Aceitar',
    senderName: 'Maria Santos',
    senderHeritage: 'Portuguese',
    dismissed: false
  },
  {
    id: '2',
    type: 'event_invite',
    title: 'Portuguese Cultural Event Invitation',
    titlePt: 'Convite para Evento Cultural Português',
    message: 'You\'re invited to the Fado Night in London this Saturday',
    messagePt: 'Foi convidado para a Noite de Fado em Londres neste sábado',
    timestamp: '1 hour ago',
    priority: 'high',
    actionLabel: 'View Event',
    actionLabelPt: 'Ver Evento',
    senderName: 'João Ferreira',
    senderHeritage: 'Portuguese',
    dismissed: false
  },
  {
    id: '3',
    type: 'business_opportunity',
    title: 'Business Partnership Opportunity',
    titlePt: 'Oportunidade de Parceria Empresarial',
    message: 'Ana Rodrigues is interested in collaborating on a Portuguese restaurant project',
    messagePt: 'Ana Rodrigues está interessada em colaborar num projeto de restaurante português',
    timestamp: '3 hours ago',
    priority: 'high',
    actionLabel: 'Learn More',
    actionLabelPt: 'Saber Mais',
    senderName: 'Ana Rodrigues',
    senderHeritage: 'Brazilian',
    dismissed: false
  }
]

export default function ConnectionNotificationBanner({
  notifications = MOCK_NOTIFICATIONS,
  onNotificationAction,
  className = '',
  maxVisible = 3,
  autoHideDelay = 8000
}: ConnectionNotificationBannerProps) {
  const { language } = useLanguage()
  const [visibleNotifications, setVisibleNotifications] = useState<ConnectionNotification[]>([])
  const [animatingOut, setAnimatingOut] = useState<Set<string>>(new Set())

  useEffect(() => {
    const activeNotifications = notifications
      .filter(n => !n.dismissed)
      .sort((a, b) => {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
      .slice(0, maxVisible)

    setVisibleNotifications(activeNotifications)
  }, [notifications, maxVisible])

  useEffect(() => {
    if (autoHideDelay && autoHideDelay > 0) {
      visibleNotifications.forEach(notification => {
        if (notification.priority === 'low' || notification.priority === 'medium') {
          const timer = setTimeout(() => {
            handleDismiss(notification.id)
          }, autoHideDelay)

          return () => clearTimeout(timer)
        }
      })
    }
  }, [visibleNotifications, autoHideDelay])

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

  const getNotificationIcon = (type: string) => {
    const icons = {
      'new_connection': '🤝',
      'message': '💬',
      'event_invite': '📅',
      'business_opportunity': '💼',
      'mentorship_request': '🎓',
      'cultural_event': '🎭'
    }
    return icons[type as keyof typeof icons] || '🔔'
  }

  const getPriorityColors = (priority: string) => {
    const colors = {
      low: { bg: PORTUGUESE_COLORS.blue[50], border: PORTUGUESE_COLORS.blue[200], text: PORTUGUESE_COLORS.blue[700] },
      medium: { bg: PORTUGUESE_COLORS.green[50], border: PORTUGUESE_COLORS.green[200], text: PORTUGUESE_COLORS.green[700] },
      high: { bg: PORTUGUESE_COLORS.gold[50], border: PORTUGUESE_COLORS.gold[200], text: PORTUGUESE_COLORS.gold[700] },
      urgent: { bg: PORTUGUESE_COLORS.red[50], border: PORTUGUESE_COLORS.red[200], text: PORTUGUESE_COLORS.red[700] }
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const handleAction = (notification: ConnectionNotification, actionType: 'accept' | 'view') => {
    onNotificationAction(notification.id, actionType)
    handleDismiss(notification.id)
  }

  const handleDismiss = (notificationId: string) => {
    setAnimatingOut(prev => new Set([...prev, notificationId]))
    
    setTimeout(() => {
      onNotificationAction(notificationId, 'dismiss')
      setVisibleNotifications(prev => prev.filter(n => n.id !== notificationId))
      setAnimatingOut(prev => {
        const newSet = new Set(prev)
        newSet.delete(notificationId)
        return newSet
      })
    }, 300)
  }

  if (visibleNotifications.length === 0) {
    return null
  }

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full ${className}`}>
      {visibleNotifications.map((notification) => {
        const colors = getPriorityColors(notification.priority)
        const isAnimatingOut = animatingOut.has(notification.id)
        
        return (
          <div
            key={notification.id}
            className={`transform transition-all duration-300 ease-in-out ${
              isAnimatingOut 
                ? 'translate-x-full opacity-0' 
                : 'translate-x-0 opacity-100'
            }`}
          >
            <div
              className="bg-white rounded-lg shadow-lg border-l-4 overflow-hidden"
              style={{ 
                borderLeftColor: colors.border,
                backgroundColor: colors.bg
              }}
            >
              {/* Header */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Notification Icon */}
                    <div className="text-2xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      {/* Title */}
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {language === 'pt' ? notification.titlePt : notification.title}
                      </h4>
                      
                      {/* Sender Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">{notification.senderName}</span>
                        <span className="text-lg">{getHeritageFlag(notification.senderHeritage)}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      </div>
                      
                      {/* Message */}
                      <p className="text-sm text-gray-700 mb-3">
                        {language === 'pt' ? notification.messagePt : notification.message}
                      </p>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {notification.type === 'new_connection' ? (
                          <>
                            <button
                              onClick={() => handleAction(notification, 'accept')}
                              className="px-3 py-1 text-xs font-medium text-white rounded-full hover:shadow-sm transition-all duration-200"
                              style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
                            >
                              {language === 'pt' ? notification.actionLabelPt : notification.actionLabel}
                            </button>
                            <button
                              onClick={() => handleDismiss(notification.id)}
                              className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                              {language === 'pt' ? 'Recusar' : 'Decline'}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAction(notification, 'view')}
                            className="px-3 py-1 text-xs font-medium text-white rounded-full hover:shadow-sm transition-all duration-200"
                            style={{ backgroundColor: brandColors.primary }}
                          >
                            {language === 'pt' ? notification.actionLabelPt : notification.actionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => handleDismiss(notification.id)}
                    className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                    aria-label="Close notification"
                  >
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
              
              {/* Priority Indicator */}
              <div className="h-1 bg-gradient-to-r" style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.border}, ${colors.text})` 
              }}></div>
            </div>
          </div>
        )
      })}
      
      {/* Summary if more notifications exist */}
      {notifications.filter(n => !n.dismissed).length > maxVisible && (
        <div className="bg-gray-800 text-white rounded-lg p-3 text-center">
          <p className="text-sm">
            {language === 'pt' 
              ? `+${notifications.filter(n => !n.dismissed).length - maxVisible} mais notificações`
              : `+${notifications.filter(n => !n.dismissed).length - maxVisible} more notifications`
            }
          </p>
          <button 
            className="text-xs text-blue-300 hover:text-blue-200 mt-1"
            onClick={() => {/* Navigate to notifications page */}}
          >
            {language === 'pt' ? 'Ver todas' : 'View all'}
          </button>
        </div>
      )}
    </div>
  )
}