'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  SparklesIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import LusoBotChat from './LusoBotChat'

interface LusoBotWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  autoOpen?: boolean
  showWelcomeMessage?: boolean
  customGreeting?: string
  theme?: 'light' | 'dark' | 'portuguese'
}

interface FloatingMessage {
  id: string
  text: string
  type: 'welcome' | 'suggestion' | 'help'
  visible: boolean
}

export default function LusoBotWidget({ 
  position = 'bottom-right',
  autoOpen = false,
  showWelcomeMessage = true,
  customGreeting,
  theme = 'portuguese'
}: LusoBotWidgetProps) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  // Position classes with mobile-safe positioning
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6 md:bottom-6 md:right-6',
    'bottom-left': 'bottom-6 left-6 md:bottom-6 md:left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  // Mobile-safe positioning that avoids navigation conflicts
  const mobilePositionClasses = {
    'bottom-right': 'bottom-24 right-16 safe-area-bottom', // Above mobile nav + avoid FloatingNavigation FAB
    'bottom-left': 'bottom-24 left-4 safe-area-bottom',
    'top-right': 'top-20 right-4 safe-area-top', // Below header
    'top-left': 'top-20 left-4 safe-area-top'
  }

  // Choose positioning based on screen size - mobile uses safe positioning
  const getCurrentPositionClass = () => {
    return isMobile ? mobilePositionClasses[position] : positionClasses[position]
  }

  // Mobile detection and resize handler
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Keyboard detection for mobile - hide widget when keyboard is open
  useEffect(() => {
    if (!isMobile) return

    const initialViewportHeight = window.visualViewport?.height || window.innerHeight
    
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height
        const heightDifference = initialViewportHeight - currentHeight
        setIsKeyboardOpen(heightDifference > 150) // Keyboard likely open if viewport shrunk by 150px+
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      return () => window.visualViewport?.removeEventListener('resize', handleViewportChange)
    }
  }, [isMobile])

  // Theme configurations
  const themes = {
    light: {
      buttonBg: 'bg-white shadow-lg border border-gray-200',
      buttonHover: 'hover:shadow-xl',
      iconColor: 'text-primary-600',
      chatBg: 'bg-white',
      badgeColor: 'bg-red-500'
    },
    dark: {
      buttonBg: 'bg-gray-800 shadow-lg',
      buttonHover: 'hover:shadow-xl',
      iconColor: 'text-white',
      chatBg: 'bg-gray-800',
      badgeColor: 'bg-red-500'
    },
    portuguese: {
      buttonBg: 'bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg',
      buttonHover: 'hover:shadow-xl hover:from-primary-600 hover:to-secondary-600',
      iconColor: 'text-white',
      chatBg: 'bg-white',
      badgeColor: 'bg-red-500'
    }
  }

  const currentTheme = themes[theme]

  // Welcome messages based on language and context
  const welcomeMessages = {
    pt: [
      'Olá! Precisa de ajuda com algo português? 🇵🇹',
      'Tem saudades de casa? Estou aqui para ajudar 💙',
      'Quer saber sobre eventos portugueses em Londres?',
      'Posso ajudar com tradições e cultura portuguesa!'
    ],
    en: [
      'Hello! Need help with something Portuguese? 🇵🇹',
      'Feeling homesick? I\'m here to help 💙',
      'Want to know about Portuguese events in London?',
      'I can help with Portuguese traditions and culture!'
    ]
  }

  // Initialize floating messages
  useEffect(() => {
    if (!showWelcomeMessage || hasInteracted) return

    const timer = setTimeout(() => {
      const messages = welcomeMessages[language as keyof typeof welcomeMessages]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      
      const newMessage: FloatingMessage = {
        id: `welcome_${Date.now()}`,
        text: customGreeting || randomMessage,
        type: 'welcome',
        visible: true
      }

      setFloatingMessages([newMessage])
      setUnreadCount(1)

      // Hide message after 10 seconds
      setTimeout(() => {
        setFloatingMessages(prev => 
          prev.map(msg => ({ ...msg, visible: false }))
        )
      }, 10000)
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [language, showWelcomeMessage, hasInteracted, customGreeting])

  // Add contextual suggestions based on page
  useEffect(() => {
    const pathname = window.location.pathname
    let suggestion = ''

    if (pathname.includes('/events')) {
      suggestion = language === 'pt' 
        ? 'Posso ajudar-te a encontrar eventos portugueses!'
        : 'I can help you find Portuguese events!'
    } else if (pathname.includes('/directory')) {
      suggestion = language === 'pt'
        ? 'Procuras negócios portugueses específicos?'
        : 'Looking for specific Portuguese businesses?'
    } else if (pathname.includes('/community')) {
      suggestion = language === 'pt'
        ? 'Quer conectar-se com a comunidade de falantes de português?'
        : 'Want to connect with the Portuguese-speaking community?'
    }

    if (suggestion && !hasInteracted) {
      const timer = setTimeout(() => {
        const newMessage: FloatingMessage = {
          id: `suggestion_${Date.now()}`,
          text: suggestion,
          type: 'suggestion',
          visible: true
        }

        setFloatingMessages(prev => [...prev, newMessage])
        setUnreadCount(prev => prev + 1)

        setTimeout(() => {
          setFloatingMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, visible: false } : msg
            )
          )
        }, 8000)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [language, hasInteracted])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setHasInteracted(true)
    setUnreadCount(0)
    setFloatingMessages([])
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleMaximize = () => {
    setIsMinimized(false)
  }

  const dismissFloatingMessage = (messageId: string) => {
    setFloatingMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, visible: false } : msg
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  return (
    <>
      {/* Floating Messages */}
      <AnimatePresence>
        {floatingMessages.map((message) => 
          message.visible && !isOpen && (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className={`fixed ${getCurrentPositionClass()} z-40 ${isMobile ? 'mb-16' : 'mb-20'} max-w-xs`}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 relative">
                {/* Close button */}
                <button
                  onClick={() => dismissFloatingMessage(message.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center
                    hover:bg-gray-200 transition-colors"
                >
                  <XMarkIcon className="w-3 h-3 text-gray-500" />
                </button>

                {/* Message content */}
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🇵🇹</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">LusoBot</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {message.text}
                  </p>

                  <button
                    onClick={handleOpen}
                    className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {language === 'pt' ? 'Conversar agora' : 'Chat now'}
                  </button>
                </div>

                {/* Tail */}
                <div className={`absolute ${position.includes('right') ? '-bottom-2 right-6' : '-bottom-2 left-6'} 
                  w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45`} />
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Main Chat Widget */}
      <div className={`fixed ${getCurrentPositionClass()} z-40`}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`mb-4 ${
                isMinimized 
                  ? 'w-80 h-16 md:w-80 md:h-16' 
                  : 'w-[90vw] max-w-sm h-[70vh] max-h-[500px] md:w-96 md:h-[600px]'
              } ${currentTheme.chatBg} rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
            >
              {isMinimized ? (
                <div className="h-full flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🇵🇹</span>
                    </div>
                    <span className="font-medium text-gray-900">LusoBot</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMaximize}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center
                        hover:bg-gray-200 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center
                        hover:bg-gray-200 transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🇵🇹</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">LusoBot</h3>
                        <p className="text-xs text-white/80">
                          {language === 'pt' ? 'Assistente Cultural' : 'Cultural Assistant'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMinimize}
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center
                          hover:bg-white/30 transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center
                          hover:bg-white/30 transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 relative">
                    <LusoBotChat 
                      isEmbedded={true}
                      className="h-full border-0 bg-transparent"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {!isOpen && !isKeyboardOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full ${currentTheme.buttonBg} ${currentTheme.buttonHover}
              flex items-center justify-center transition-all duration-200 relative group min-h-[44px] min-w-[44px]`}
            aria-label={language === 'pt' ? 'Abrir LusoBot - Assistente Cultural Português' : 'Open LusoBot - Portuguese Cultural Assistant'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Pulse animation for attention */}
            {unreadCount > 0 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-primary-400 opacity-30"
              />
            )}

            {/* Main Icon with Portuguese Context */}
            <div className="relative">
              {unreadCount > 0 ? (
                <HeartSolidIcon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${currentTheme.iconColor}`} />
              ) : (
                <ChatBubbleLeftRightIcon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${currentTheme.iconColor}`} />
              )}
              
              {/* Portuguese heritage indicator */}
              <div className="absolute -top-1 -left-1 w-3 h-3 text-[10px] flex items-center justify-center">
                🇵🇹
              </div>
              
              {/* Unread count badge */}
              {unreadCount > 0 && (
                <div className={`absolute -top-2 -right-2 w-5 h-5 ${currentTheme.badgeColor} 
                  rounded-full flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
            </div>

            {/* Hover tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
              bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 
              transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {language === 'pt' ? 'Conversar com LusoBot' : 'Chat with LusoBot'}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                w-2 h-2 bg-gray-800 rotate-45" />
            </div>
          </motion.button>
        )}
      </div>
    </>
  )
}