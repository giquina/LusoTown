'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BellIcon, 
  ArrowPathIcon,
  ClockIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface LiveUpdate {
  id: string
  type: 'new_event' | 'event_update' | 'user_joined' | 'photo_added' | 'spots_filled'
  message: string
  timestamp: Date
  eventId?: string
  userId?: string
}

interface LiveUpdateIndicatorProps {
  className?: string
  onUpdateClick?: (update: LiveUpdate) => void
}

export default function LiveUpdateIndicator({ 
  className = '',
  onUpdateClick
}: LiveUpdateIndicatorProps) {
  const { language } = useLanguage()
  const [updates, setUpdates] = useState<LiveUpdate[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date())
  const [showIndicator, setShowIndicator] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'reconnecting' | 'offline'>('connected')
  
  const isPortuguese = language === 'pt'

  // Mock live updates for demonstration
  const mockUpdates: Omit<LiveUpdate, 'id' | 'timestamp'>[] = [
    {
      type: 'new_event',
      message: isPortuguese 
        ? 'Novo evento: "Noite de Fado Íntimo" em Stockwell'
        : 'New event: "Intimate Fado Night" in Stockwell',
      eventId: 'event-123'
    },
    {
      type: 'user_joined',
      message: isPortuguese
        ? 'Maria Silva confirmou presença em "Portuguese Wine Tasting"'
        : 'Maria Silva confirmed attendance at "Portuguese Wine Tasting"',
      eventId: 'event-124',
      userId: 'user-456'
    },
    {
      type: 'photo_added',
      message: isPortuguese
        ? 'Novas fotos adicionadas ao evento "Cultural Festival"'
        : 'New photos added to "Cultural Festival" event',
      eventId: 'event-125'
    },
    {
      type: 'event_update',
      message: isPortuguese
        ? 'Localização atualizada para "Portuguese Business Networking"'
        : 'Location updated for "Portuguese Business Networking"',
      eventId: 'event-126'
    },
    {
      type: 'spots_filled',
      message: isPortuguese
        ? 'Últimas 3 vagas para "Weekend Football Meetup"'
        : 'Last 3 spots for "Weekend Football Meetup"',
      eventId: 'event-127'
    }
  ]

  // Simulate live updates
  useEffect(() => {
    const generateUpdate = () => {
      const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)]
      const newUpdate: LiveUpdate = {
        ...randomUpdate,
        id: `update-${Date.now()}-${Math.random()}`,
        timestamp: new Date()
      }

      setUpdates(prev => [newUpdate, ...prev.slice(0, 4)]) // Keep last 5 updates
      setLastUpdateTime(new Date())
      setShowIndicator(true)

      // Hide indicator after 5 seconds if not hovered
      setTimeout(() => {
        setShowIndicator(false)
      }, 5000)
    }

    // Initial delay, then regular updates
    const initialDelay = setTimeout(generateUpdate, 30000) // 30 seconds
    const interval = setInterval(generateUpdate, 45000 + Math.random() * 30000) // 45-75 seconds

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [])

  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setConnectionStatus('connected')
    }

    const handleOffline = () => {
      setIsOnline(false)
      setConnectionStatus('offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Simulate reconnection attempts when offline
  useEffect(() => {
    if (!isOnline) {
      setConnectionStatus('reconnecting')
      const reconnectTimer = setTimeout(() => {
        // Simulate successful reconnection
        if (Math.random() > 0.3) {
          setIsOnline(true)
          setConnectionStatus('connected')
        }
      }, 3000)

      return () => clearTimeout(reconnectTimer)
    }
  }, [isOnline])

  const handleUpdateClick = (update: LiveUpdate) => {
    onUpdateClick?.(update)
    setShowIndicator(false)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return isPortuguese ? 'agora mesmo' : 'just now'
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return isPortuguese 
        ? `${minutes} min atrás`
        : `${minutes}m ago`
    } else {
      const hours = Math.floor(diffInSeconds / 3600)
      return isPortuguese 
        ? `${hours}h atrás`
        : `${hours}h ago`
    }
  }

  const getUpdateIcon = (type: LiveUpdate['type']) => {
    switch (type) {
      case 'new_event':
        return <BellIcon className="w-4 h-4 text-primary-500" />
      case 'event_update':
        return <ArrowPathIcon className="w-4 h-4 text-accent-500" />
      case 'user_joined':
        return <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
      case 'photo_added':
        return <span className="text-purple-500">📸</span>
      case 'spots_filled':
        return <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
      default:
        return <BellIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <WifiIcon className="w-4 h-4 text-green-500" />
      case 'reconnecting':
        return <ArrowPathIcon className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'offline':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
    }
  }

  const getConnectionMessage = () => {
    switch (connectionStatus) {
      case 'connected':
        return isPortuguese ? 'Online • Atualizações em tempo real' : 'Online • Live updates'
      case 'reconnecting':
        return isPortuguese ? 'Reconectando...' : 'Reconnecting...'
      case 'offline':
        return isPortuguese ? 'Offline • Atualizações pausadas' : 'Offline • Updates paused'
    }
  }

  return (
    <div className={`fixed top-20 right-4 z-30 ${className}`}>
      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className={`mb-2 px-3 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${
          connectionStatus === 'connected' 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : connectionStatus === 'reconnecting'
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}
      >
        {getConnectionIcon()}
        <span>{getConnectionMessage()}</span>
      </motion.div>

      {/* Live Updates Indicator */}
      <AnimatePresence>
        {showIndicator && updates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-sm"
            onMouseEnter={() => setShowIndicator(true)}
            onMouseLeave={() => setShowIndicator(false)}
          >
            {/* Header */}
            <div className="bg-primary-50 px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {isPortuguese ? 'Atualizações ao Vivo' : 'Live Updates'}
                  </h3>
                </div>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(lastUpdateTime)}
                </span>
              </div>
            </div>

            {/* Updates List */}
            <div className="max-h-80 overflow-y-auto">
              {updates.slice(0, 3).map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleUpdateClick(update)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {update.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(update.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            {updates.length > 3 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  {isPortuguese 
                    ? `Ver mais ${updates.length - 3} atualizações`
                    : `View ${updates.length - 3} more updates`
                  }
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Indicator when collapsed */}
      <AnimatePresence>
        {!showIndicator && updates.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowIndicator(true)}
            className="bg-primary-500 text-white rounded-full p-3 shadow-lg hover:bg-primary-600 transition-colors relative"
          >
            <BellIcon className="w-5 h-5" />
            {updates.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {updates.length > 9 ? '9+' : updates.length}
              </span>
            )}
            <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-30"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}