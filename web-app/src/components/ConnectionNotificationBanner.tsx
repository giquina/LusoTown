'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  UserGroupIcon,
  TrophyIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'
import { ConnectionNotification } from '@/context/NetworkingContext'

interface ConnectionNotificationBannerProps {
  notifications: ConnectionNotification[]
}

export default function ConnectionNotificationBanner({ notifications }: ConnectionNotificationBannerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const { markNotificationAsRead } = useNetworking()
  
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set())

  const unreadNotifications = notifications.filter(
    notif => !notif.isRead && !dismissedNotifications.has(notif.id)
  )

  const handleDismiss = (notificationId: string) => {
    setDismissedNotifications(prev => new Set([...prev, notificationId]))
    markNotificationAsRead(notificationId)
  }

  // Portuguese cultural notification messages
  const getPortugueseNotificationText = (type: string, originalMessage: string) => {
    const culturalMessages = {
      new_connection: {
        en: `🤝 New Portuguese connection! You're building your London community.`,
        pt: `🤝 Nova conexão portuguesa! Está a construir a sua comunidade em Londres.`
      },
      milestone: {
        en: `🎉 Portuguese community milestone achieved! Your cultural network is growing.`,
        pt: `🎉 Marco da comunidade portuguesa alcançado! A sua rede cultural está a crescer.`
      },
      upcoming_event_with_connections: {
        en: `📅 Portuguese cultural event coming up! Connect with fellow Lusitanians.`,
        pt: `📅 Evento cultural português a aproximar-se! Conecte-se com outros lusitanos.`
      },
      connection_activity: {
        en: `👋 Portuguese community activity! Someone from your network is active.`,
        pt: `👋 Atividade da comunidade portuguesa! Alguém da sua rede está ativo.`
      }
    }
    
    return culturalMessages[type as keyof typeof culturalMessages]?.[language] || originalMessage
  }

  const getNotificationIcon = (type: string) => {
    const icons = {
      new_connection: UserGroupIcon,
      milestone: TrophyIcon,
      upcoming_event_with_connections: CalendarIcon,
      connection_activity: BellIcon
    }
    return icons[type as keyof typeof icons] || BellIcon
  }

  const getNotificationColor = (type: string) => {
    const colors = {
      new_connection: 'from-blue-500 to-accent-500',
      milestone: 'from-yellow-500 to-orange-500',
      upcoming_event_with_connections: 'from-green-500 to-emerald-500',
      connection_activity: 'from-accent-500 to-pink-500'
    }
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  if (unreadNotifications.length === 0) {
    return null
  }

  return (
    <div className="bg-white border-b border-secondary-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {unreadNotifications.slice(0, 3).map((notification) => {
            const IconComponent = getNotificationIcon(notification.type)
            const colorClass = getNotificationColor(notification.type)
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="py-3 border-b border-secondary-100 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  {/* Notification Icon */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-secondary-600 truncate">
                      {getPortugueseNotificationText(notification.type, notification.message)}
                    </p>
                    {/* Portuguese cultural context */}
                    {notification.type === 'new_connection' && (
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span className="mr-1">🇵🇹</span>
                        {isPortuguese 
                          ? 'Comunidade portuguesa a crescer' 
                          : 'Portuguese community growing'
                        }
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {notification.type === 'new_connection' && (
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                        {isPortuguese ? 'Ver Perfil' : 'View Profile'}
                      </button>
                    )}
                    {notification.type === 'milestone' && (
                      <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                        {isPortuguese ? 'Ver Conquista' : 'View Achievement'}
                      </button>
                    )}
                    {notification.type === 'upcoming_event_with_connections' && (
                      <button className="text-sm font-medium text-action-600 hover:text-green-700 transition-colors">
                        {isPortuguese ? 'Ver Evento' : 'View Event'}
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDismiss(notification.id)}
                      className="p-1 text-gray-400 hover:text-secondary-600 transition-colors"
                      title={isPortuguese ? 'Dispensar' : 'Dismiss'}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Show more indicator */}
        {unreadNotifications.length > 3 && (
          <div className="py-2 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              {isPortuguese 
                ? `+${unreadNotifications.length - 3} mais notificações`
                : `+${unreadNotifications.length - 3} more notifications`
              }
            </button>
          </div>
        )}
      </div>
    </div>
  )
}