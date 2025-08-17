'use client'

import { useState, useRef, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'
import { BellIcon } from '@heroicons/react/24/outline'
import { BellIcon as BellSolidIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import NotificationCenter from './NotificationCenter'

interface NotificationBellProps {
  className?: string
  showBadge?: boolean
  showDropdown?: boolean
}

export default function NotificationBell({ 
  className = '', 
  showBadge = true,
  showDropdown = false 
}: NotificationBellProps) {
  const { unreadCount, getUnreadNotifications } = useNotifications()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const bellRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setShowQuickView(false)
      }
    }

    if (showQuickView) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showQuickView])

  const handleBellClick = () => {
    if (showDropdown) {
      setShowQuickView(!showQuickView)
    } else {
      setIsOpen(true)
    }
  }

  const unreadNotifications = getUnreadNotifications().slice(0, 5) // Show only first 5 in dropdown

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffInMinutes < 1) return language === 'pt' ? 'agora' : 'now'
    if (diffInMinutes < 60) return language === 'pt' ? `${diffInMinutes}m` : `${diffInMinutes}m`
    if (diffInMinutes < 1440) return language === 'pt' ? `${Math.floor(diffInMinutes / 60)}h` : `${Math.floor(diffInMinutes / 60)}h`
    return language === 'pt' ? `${Math.floor(diffInMinutes / 1440)}d` : `${Math.floor(diffInMinutes / 1440)}d`
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

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Notification Bell */}
        <motion.button
          ref={bellRef}
          onClick={handleBellClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-primary-600 transition-colors"
          title={language === 'pt' ? 'Notificações' : 'Notifications'}
        >
          {unreadCount > 0 ? (
            <BellSolidIcon className="h-6 w-6 text-primary-600" />
          ) : (
            <BellIcon className="h-6 w-6" />
          )}
          
          {/* Notification Badge */}
          {showBadge && unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-action-500 text-xs font-bold text-white"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}

          {/* Pulse animation for new notifications */}
          {unreadCount > 0 && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-primary-400 opacity-25"
            />
          )}
        </motion.button>

        {/* Quick View Dropdown */}
        <AnimatePresence>
          {showDropdown && showQuickView && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 w-80 rounded-lg bg-white shadow-lg border border-neutral-200 z-40"
            >
              {/* Header */}
              <div className="border-b border-neutral-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {language === 'pt' ? 'Notificações Recentes' : 'Recent Notifications'}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                      {unreadCount} {language === 'pt' ? 'novas' : 'new'}
                    </span>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-64 overflow-y-auto">
                {unreadNotifications.length === 0 ? (
                  <div className="p-4 text-center">
                    <BellIcon className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
                    <p className="text-sm text-neutral-500">
                      {language === 'pt' ? 'Nenhuma notificação nova' : 'No new notifications'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {unreadNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-lg p-3 hover:bg-neutral-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setShowQuickView(false)
                          setIsOpen(true)
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-base flex-shrink-0">
                            {getCategoryIcon(notification.category)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-neutral-900 truncate">
                              {language === 'pt' && notification.titlePT 
                                ? notification.titlePT 
                                : notification.title
                              }
                            </h4>
                            <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                              {language === 'pt' && notification.messagePT 
                                ? notification.messagePT 
                                : notification.message
                              }
                            </p>
                            <span className="text-xs text-neutral-400 mt-1">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-200 p-3">
                <button
                  onClick={() => {
                    setShowQuickView(false)
                    setIsOpen(true)
                  }}
                  className="w-full rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  {language === 'pt' ? 'Ver Todas as Notificações' : 'View All Notifications'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Notification Center */}
      <AnimatePresence>
        {isOpen && (
          <NotificationCenter
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}