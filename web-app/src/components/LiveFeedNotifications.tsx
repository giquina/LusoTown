'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlusIcon, 
  StarIcon, 
  HeartIcon, 
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'

interface NotificationItem {
  id: string
  type: 'signup' | 'review' | 'event_join' | 'chat_join' | 'friendship'
  name: string
  location: string
  action: string
  timeAgo: string
  icon: React.ReactNode
  gradient: string
}

const LiveFeedNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mock data for realistic Portuguese community notifications
  const mockNotifications: Omit<NotificationItem, 'id' | 'timeAgo'>[] = [
    {
      type: 'signup',
      name: 'Ana Sofia',
      location: 'Camden',
      action: 'just joined LusoTown London',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'event_join',
      name: 'Miguel Santos',
      location: 'Shoreditch',
      action: 'joined a Portuguese pub crawl',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'review',
      name: 'Beatriz Ferreira',
      location: 'Kensington',
      action: 'left a 5-star review for "Fado night at Taberna Real"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'chat_join',
      name: 'João Pereira',
      location: 'Canary Wharf',
      action: 'joined "Weekend Football & Beers" group',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      type: 'event_join',
      name: 'Catarina Silva',
      location: 'Clapham',
      action: 'attending "Women-only Portuguese Brunch"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'friendship',
      name: 'Ricardo Oliveira',
      location: 'Brixton',
      action: 'made 3 new connections at cocktail night',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'signup',
      name: 'Mariana Costa',
      location: 'Greenwich',
      action: 'just joined LusoTown London',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'review',
      name: 'Pedro Almeida',
      location: 'Notting Hill',
      action: 'left a 5-star review for "Portuguese Wine Tasting"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'event_join',
      name: 'Inês Rodrigues',
      location: 'Hampstead',
      action: 'signed up for "Late Night Portuguese Dancing"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'chat_join',
      name: 'Gonçalo Martins',
      location: 'Richmond',
      action: 'joined "Portuguese Business Networking" chat',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      type: 'friendship',
      name: 'Sofia Mendes',
      location: 'Fulham',
      action: 'connected with 2 people from Porto',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'event_join',
      name: 'Tiago Carvalho',
      location: 'Marylebone',
      action: 'attending "Portuguese Food & Drinks Night"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'signup',
      name: 'Filipa Gonçalves',
      location: 'Putney',
      action: 'just joined LusoTown London',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'review',
      name: 'André Ribeiro',
      location: 'Camden',
      action: 'left a 5-star review for "Portuguese Rooftop Party"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'chat_join',
      name: 'Lara Fernandes',
      location: 'Shoreditch',
      action: 'joined "Portuguese Singles 25+" group',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      type: 'event_join',
      name: 'Bruno Neves',
      location: 'Clapham',
      action: 'signed up for "Portuguese Comedy Night"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'friendship',
      name: 'Teresa Lopes',
      location: 'Kensington',
      action: 'made 4 new friends at wine bar meetup',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'review',
      name: 'Carlos Sousa',
      location: 'Canary Wharf',
      action: 'left a 5-star review for "Portuguese Happy Hour"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'event_join',
      name: 'Helena Pinto',
      location: 'Brixton',
      action: 'attending "Brazilian Samba Night"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-primary-400 to-secondary-500'
    },
    {
      type: 'chat_join',
      name: 'Rafael Dias',
      location: 'Greenwich',
      action: 'joined "Portuguese Football Fans" chat',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    }
  ]

  // Generate time ago strings
  const getRandomTimeAgo = () => {
    const options = [
      '2 minutes ago',
      '5 minutes ago',
      '8 minutes ago',
      '12 minutes ago',
      '15 minutes ago',
      '18 minutes ago',
      '22 minutes ago',
      '25 minutes ago',
      '30 minutes ago',
      '35 minutes ago',
      '42 minutes ago',
      '48 minutes ago'
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  // Show notifications periodically
  useEffect(() => {
    // Start after 30 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true)
      showNextNotification()
    }, 30000)

    return () => clearTimeout(initialDelay)
  }, [])

  const showNextNotification = () => {
    const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)]
    const notification: NotificationItem = {
      ...randomNotification,
      id: Math.random().toString(36).substr(2, 9),
      timeAgo: getRandomTimeAgo()
    }

    setCurrentNotification(notification)

    // Hide after 6 seconds
    setTimeout(() => {
      setCurrentNotification(null)
    }, 6000)

    // Schedule next notification (between 15-45 seconds)
    const nextDelay = Math.random() * 30000 + 15000
    setTimeout(showNextNotification, nextDelay)
  }

  const handleClose = () => {
    setCurrentNotification(null)
  }

  // Hide on mobile devices or if not visible
  if (!isVisible || isMobile) return null

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              duration: 0.4 
            }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentNotification.gradient} flex items-center justify-center flex-shrink-0`}>
                {currentNotification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      <span className="font-semibold">{currentNotification.name}</span>
                      <span className="text-gray-600 font-normal"> from {currentNotification.location}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-tight">
                      {currentNotification.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      {currentNotification.timeAgo}
                    </p>
                  </div>
                  
                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className={`h-full bg-gradient-to-r ${currentNotification.gradient} rounded-full`}
              />
            </div>

            {/* Subtle branding */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400">
                <span className="font-medium text-primary-500">LusoTown London</span> • Live Activity
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating indicator when no notification is shown */}
      <AnimatePresence>
        {!currentNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default LiveFeedNotifications