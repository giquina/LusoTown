'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  BellIcon, 
  XMarkIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  CheckIcon,
  TrashIcon,
  Cog6ToothIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { BellIcon as BellSolidIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import { NotificationCategory, NotificationType, BaseNotification } from '@/context/NotificationContext'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export default function NotificationCenter({ isOpen, onClose, className = '' }: NotificationCenterProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    getNotificationsByCategory,
    getNotificationsByType,
    searchNotifications,
    trackNotificationEngagement,
    getPersonalizedRecommendations
  } = useNotifications()
  const { language, t } = useLanguage()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all')
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all')
  const [showSettings, setShowSettings] = useState(false)
  const [filteredNotifications, setFilteredNotifications] = useState<BaseNotification[]>([])

  // Filter notifications based on search and filters
  useEffect(() => {
    let filtered = notifications

    if (searchQuery) {
      filtered = searchNotifications(searchQuery)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notif => notif.category === selectedCategory)
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(notif => notif.type === selectedType)
    }

    // Sort by priority and date
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    setFilteredNotifications(filtered)
  }, [notifications, searchQuery, selectedCategory, selectedType, searchNotifications])

  const handleNotificationClick = (notification: BaseNotification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    trackNotificationEngagement(notification.id, 'clicked')
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
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

  const getPriorityColor = (priority: BaseNotification['priority']) => {
    switch (priority) {
      case 'urgent': return 'border-l-action-500 bg-action-50'
      case 'high': return 'border-l-premium-500 bg-premium-50'
      case 'medium': return 'border-l-primary-500 bg-primary-50'
      case 'low': return 'border-l-secondary-500 bg-secondary-50'
      default: return 'border-l-neutral-300 bg-neutral-50'
    }
  }

  const getCategoryIcon = (category: NotificationCategory) => {
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

  const categories: { value: NotificationCategory | 'all'; label: string; labelPT: string }[] = [
    { value: 'all', label: 'All', labelPT: 'Todas' },
    { value: 'networking', label: 'Networking', labelPT: 'Networking' },
    { value: 'services', label: 'Services', labelPT: 'Serviços' },
    { value: 'community', label: 'Community', labelPT: 'Comunidade' },
    { value: 'business', label: 'Business', labelPT: 'Negócios' },
    { value: 'students', label: 'Students', labelPT: 'Estudantes' },
    { value: 'events', label: 'Events', labelPT: 'Eventos' },
    { value: 'transport', label: 'Transport', labelPT: 'Transporte' },
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${className}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
      >
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellSolidIcon className="h-6 w-6 text-primary-600" />
              <h2 className="text-lg font-semibold text-neutral-900">
                {language === 'pt' ? 'Notificações' : 'Notifications'}
              </h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-action-500 px-2 py-1 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                title={language === 'pt' ? 'Marcar todas como lidas' : 'Mark all as read'}
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                title={language === 'pt' ? 'Configurações' : 'Settings'}
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder={language === 'pt' ? 'Pesquisar notificações...' : 'Search notifications...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {language === 'pt' ? category.labelPT : category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <BellIcon className="h-12 w-12 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                {language === 'pt' ? 'Nenhuma notificação' : 'No notifications'}
              </h3>
              <p className="text-sm text-neutral-500">
                {language === 'pt' 
                  ? 'Suas notificações aparecerão aqui'
                  : 'Your notifications will appear here'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`group relative rounded-lg border-l-4 p-4 transition-all hover:shadow-md cursor-pointer ${
                      getPriorityColor(notification.priority)
                    } ${notification.isRead ? 'opacity-75' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-500" />
                    )}

                    {/* Content */}
                    <div className="pr-8">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">
                          {getCategoryIcon(notification.category)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-neutral-900 mb-1">
                            {language === 'pt' && notification.titlePT 
                              ? notification.titlePT 
                              : notification.title
                            }
                          </h4>
                          <p className="text-xs text-neutral-600 mb-2">
                            {language === 'pt' && notification.messagePT 
                              ? notification.messagePT 
                              : notification.message
                            }
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-400">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            {notification.actionLabel && (
                              <span className="text-xs font-medium text-primary-600">
                                {language === 'pt' && notification.actionLabelPT 
                                  ? notification.actionLabelPT 
                                  : notification.actionLabel
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col space-y-1">
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                            className="rounded p-1 text-neutral-400 hover:bg-white hover:text-primary-600"
                            title={language === 'pt' ? 'Marcar como lida' : 'Mark as read'}
                          >
                            <EyeIcon className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                            trackNotificationEngagement(notification.id, 'dismissed')
                          }}
                          className="rounded p-1 text-neutral-400 hover:bg-white hover:text-action-600"
                          title={language === 'pt' ? 'Eliminar' : 'Delete'}
                        >
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="border-t border-neutral-200 bg-neutral-50 p-4 overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                {language === 'pt' ? 'Configurações Rápidas' : 'Quick Settings'}
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left rounded-lg p-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {language === 'pt' ? 'Preferências de Notificação' : 'Notification Preferences'}
                </button>
                <button className="w-full text-left rounded-lg p-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {language === 'pt' ? 'Configurar Canais' : 'Configure Channels'}
                </button>
                <button className="w-full text-left rounded-lg p-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {language === 'pt' ? 'Personalização' : 'Personalization'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}