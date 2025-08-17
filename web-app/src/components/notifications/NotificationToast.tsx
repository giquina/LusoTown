'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useNotifications } from '@/context/NotificationContext'
import { 
  XMarkIcon, 
  EyeIcon, 
  ArrowTopRightOnSquareIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { BaseNotification } from '@/context/NotificationContext'

interface NotificationToastProps {
  notification: BaseNotification
  onClose: () => void
  onAction?: () => void
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
}

export default function NotificationToast({
  notification,
  onClose,
  onAction,
  duration = 5000,
  position = 'top-right'
}: NotificationToastProps) {
  const { language } = useLanguage()
  const { markAsRead, trackNotificationEngagement } = useNotifications()
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 100) {
            setIsVisible(false)
            return 0
          }
          return prev - 100
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [duration])

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(onClose, 300) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const handleAction = () => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    trackNotificationEngagement(notification.id, 'clicked')
    
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank')
    }
    
    if (onAction) {
      onAction()
    }
    
    setIsVisible(false)
  }

  const handleDismiss = () => {
    trackNotificationEngagement(notification.id, 'dismissed')
    setIsVisible(false)
  }

  const handleMarkAsRead = () => {
    markAsRead(notification.id)
    trackNotificationEngagement(notification.id, 'clicked')
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'networking': return '🤝'
      case 'services': return '🚗'
      case 'community': return '🏛️'
      case 'business': return '💼'
      case 'students': return '🎓'
      case 'subscription': return '💎'
      case 'system': return '⚙️'
      case 'heritage': return '🇵🇹'
      case 'events': return '🎭'
      case 'transport': return '🚙'
      default: return '📢'
    }
  }

  const getPriorityStyles = (priority: BaseNotification['priority']) => {
    switch (priority) {
      case 'urgent':
        return {
          border: 'border-l-4 border-l-action-500',
          background: 'bg-action-50',
          iconBg: 'bg-action-100',
          titleColor: 'text-action-900',
          pulseColor: 'bg-action-400'
        }
      case 'high':
        return {
          border: 'border-l-4 border-l-premium-500',
          background: 'bg-premium-50',
          iconBg: 'bg-premium-100',
          titleColor: 'text-premium-900',
          pulseColor: 'bg-premium-400'
        }
      case 'medium':
        return {
          border: 'border-l-4 border-l-primary-500',
          background: 'bg-primary-50',
          iconBg: 'bg-primary-100',
          titleColor: 'text-primary-900',
          pulseColor: 'bg-primary-400'
        }
      case 'low':
        return {
          border: 'border-l-4 border-l-secondary-500',
          background: 'bg-secondary-50',
          iconBg: 'bg-secondary-100',
          titleColor: 'text-secondary-900',
          pulseColor: 'bg-secondary-400'
        }
      default:
        return {
          border: 'border-l-4 border-l-neutral-300',
          background: 'bg-white',
          iconBg: 'bg-neutral-100',
          titleColor: 'text-neutral-900',
          pulseColor: 'bg-neutral-400'
        }
    }
  }

  const getPositionClasses = (pos: string) => {
    switch (pos) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-4 right-4'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffInMinutes < 1) return language === 'pt' ? 'agora' : 'now'
    if (diffInMinutes < 60) return language === 'pt' ? `${diffInMinutes}m` : `${diffInMinutes}m`
    if (diffInMinutes < 1440) return language === 'pt' ? `${Math.floor(diffInMinutes / 60)}h` : `${Math.floor(diffInMinutes / 60)}h`
    return language === 'pt' ? `${Math.floor(diffInMinutes / 1440)}d` : `${Math.floor(diffInMinutes / 1440)}d`
  }

  const styles = getPriorityStyles(notification.priority)
  const progressPercentage = duration > 0 ? (timeLeft / duration) * 100 : 0

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`fixed z-50 ${getPositionClasses(position)}`}
        >
          <div className={`w-80 bg-white rounded-lg shadow-lg ${styles.border} ${styles.background} relative overflow-hidden group`}>
            {/* Progress bar */}
            {duration > 0 && (
              <div className="absolute top-0 left-0 h-1 bg-neutral-200 w-full">
                <motion.div
                  className={`h-full ${styles.pulseColor}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            )}

            {/* Main content */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center relative`}>
                  <span className="text-lg">{getCategoryIcon(notification.category)}</span>
                  {!notification.isRead && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${styles.pulseColor} rounded-full animate-pulse`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-semibold ${styles.titleColor} mb-1`}>
                        {language === 'pt' && notification.titlePT 
                          ? notification.titlePT 
                          : notification.title
                        }
                      </h4>
                      <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
                        {language === 'pt' && notification.messagePT 
                          ? notification.messagePT 
                          : notification.message
                        }
                      </p>
                      
                      {/* Metadata */}
                      <div className="flex items-center space-x-2 text-xs text-neutral-400">
                        <ClockIcon className="h-3 w-3" />
                        <span>{formatTimeAgo(notification.createdAt)}</span>
                        {notification.priority === 'urgent' && (
                          <span className="bg-action-100 text-action-700 px-2 py-1 rounded-full text-xs font-medium">
                            {language === 'pt' ? 'Urgente' : 'Urgent'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.isRead && (
                        <button
                          onClick={handleMarkAsRead}
                          className="p-1 rounded text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          title={language === 'pt' ? 'Marcar como lida' : 'Mark as read'}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={handleDismiss}
                        className="p-1 rounded text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                        title={language === 'pt' ? 'Dispensar' : 'Dismiss'}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action button */}
                  {notification.actionUrl && (
                    <button
                      onClick={handleAction}
                      className="mt-3 flex items-center space-x-2 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>
                        {language === 'pt' && notification.actionLabelPT 
                          ? notification.actionLabelPT 
                          : notification.actionLabel || (language === 'pt' ? 'Ver Mais' : 'View More')
                        }
                      </span>
                      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Hover overlay for pause */}
            <div 
              className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-5 transition-colors cursor-pointer"
              onClick={handleAction}
              onMouseEnter={() => duration > 0 && setTimeLeft(timeLeft)} // Pause on hover
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}