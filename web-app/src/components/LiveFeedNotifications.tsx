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

  // Mock data for realistic notifications
  const mockNotifications: Omit<NotificationItem, 'id' | 'timeAgo'>[] = [
    {
      type: 'signup',
      name: 'Emma Thompson',
      location: 'Chelsea',
      action: 'just joined AdyaTribe',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'review',
      name: 'Sarah Mitchell',
      location: 'Kensington',
      action: 'left a 5-star review for "Wine Tasting Evening"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'event_join',
      name: 'Lisa Chen',
      location: 'Canary Wharf',
      action: 'signed up for "Thames Path Walking Group"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      type: 'friendship',
      name: 'Rachel Davis',
      location: 'Shoreditch',
      action: 'made 3 new connections',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'chat_join',
      name: 'Maria Rodriguez',
      location: 'Hampstead',
      action: 'joined "Book Club Central" chat room',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      type: 'signup',
      name: 'Jessica Wright',
      location: 'Greenwich',
      action: 'just joined AdyaTribe',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'review',
      name: 'Hannah Wilson',
      location: 'Richmond',
      action: 'left a 5-star review for "Pottery Workshop"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'event_join',
      name: 'Sophie Brown',
      location: 'Clapham',
      action: 'signed up for "Sunday Brunch & Book Club"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      type: 'friendship',
      name: 'Charlotte Taylor',
      location: 'Notting Hill',
      action: 'made 2 new connections',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'chat_join',
      name: 'Amy Johnson',
      location: 'Brixton',
      action: 'joined "Fitness Buddies" chat room',
      icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
      gradient: 'from-purple-400 to-violet-500'
    },
    {
      type: 'signup',
      name: 'Grace Park',
      location: 'Wimbledon',
      action: 'just joined AdyaTribe',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      type: 'review',
      name: 'Olivia Martinez',
      location: 'Fulham',
      action: 'left a 5-star review for "Art Gallery Tour"',
      icon: <StarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      type: 'event_join',
      name: 'Isabella Garcia',
      location: 'Marylebone',
      action: 'signed up for "Wine & Paint Night"',
      icon: <CalendarIcon className="w-4 h-4 text-white" />,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      type: 'friendship',
      name: 'Victoria Smith',
      location: 'Camden',
      action: 'made 4 new connections',
      icon: <HeartIcon className="w-4 h-4 text-white" />,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      type: 'signup',
      name: 'Lucy Anderson',
      location: 'Putney',
      action: 'just joined AdyaTribe',
      icon: <UserPlusIcon className="w-4 h-4 text-white" />,
      gradient: 'from-green-400 to-emerald-500'
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
                <span className="font-medium text-primary-500">AdyaTribe</span> • Live Activity
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