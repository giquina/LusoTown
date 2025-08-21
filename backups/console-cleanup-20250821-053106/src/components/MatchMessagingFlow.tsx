'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import MessageAuthorizationGate from './MessageAuthorizationGate'
import ConversationStarters from './ConversationStarters'
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CalendarIcon,
  CheckCircleIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import {
  ChatBubbleLeftRightIcon as ChatSolid,
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid'

interface MatchedUser {
  id: string
  name: string
  age: number
  location: string
  profession: string
  origin: string
  interests: string[]
  bio: string
  image?: string
  compatibility: number
  sharedEvents?: Array<{
    id: string
    title: string
    type: string
    date: string
  }>
}

interface MatchMessagingFlowProps {
  currentUserId: string
  matchedUser: MatchedUser
  onMessageSent?: (message: string, starterId?: string) => void
  onEventSuggestionClick?: (eventId: string) => void
  className?: string
}

export default function MatchMessagingFlow({
  currentUserId,
  matchedUser,
  onMessageSent,
  onEventSuggestionClick,
  className = ''
}: MatchMessagingFlowProps) {
  const { language, t } = useLanguage()
  const [messagingPermission, setMessagingPermission] = useState<{
    can_message: boolean
    has_mutual_match: boolean
    has_event_permission: boolean
    shared_events_count: number
    reason?: string
  } | null>(null)
  const [showStarters, setShowStarters] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock permission check - In production, this would call the real API
  useEffect(() => {
    const checkMessagingPermission = async () => {
      setLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock logic for demonstration
      const hasMutualMatch = Math.random() > 0.3 // 70% chance of mutual match for demo
      const sharedEventsCount = Math.floor(Math.random() * 3) // 0-2 shared events
      const hasEventPermission = sharedEventsCount > 0
      
      const permission = {
        can_message: hasMutualMatch || hasEventPermission,
        has_mutual_match: hasMutualMatch,
        has_event_permission: hasEventPermission,
        shared_events_count: sharedEventsCount,
        reason: hasMutualMatch ? 'mutual_match' : hasEventPermission ? 'shared_events' : 'no_permission'
      }
      
      setMessagingPermission(permission)
      setLoading(false)
      
      // Auto-show conversation starters if messaging is unlocked
      if (permission.can_message) {
        setTimeout(() => setShowStarters(true), 500)
      }
    }

    checkMessagingPermission()
  }, [currentUserId, matchedUser.id])

  const handleStartConversation = (starterId: string, message: string) => {
    onMessageSent?.(message, starterId)
    
    // Show success feedback
    setShowStarters(false)
    setTimeout(() => {
      // Could navigate to messages view or show success state
      console.log('Message sent successfully!')
    }, 300)
  }

  const getUnlockReason = () => {
    if (!messagingPermission?.can_message) return null
    
    if (messagingPermission.has_mutual_match && messagingPermission.has_event_permission) {
      return 'both'
    }
    if (messagingPermission.has_mutual_match) {
      return 'mutual_match'
    }
    if (messagingPermission.has_event_permission) {
      return 'shared_events'
    }
    return null
  }

  const getSharedEvents = () => {
    if (!messagingPermission?.has_event_permission) return []
    
    // Mock shared events based on shared_events_count
    const mockEvents = [
      {
        id: 'evt1',
        title: 'Noite de Fado Autêntico',
        type: 'Cultural',
        date: '2025-08-25'
      },
      {
        id: 'evt2',
        title: 'Degustação de Vinhos do Douro',
        type: 'Gastronomy',
        date: '2025-08-28'
      },
      {
        id: 'evt3',
        title: 'Portuguese Business Network',
        type: 'Professional',
        date: '2025-09-02'
      }
    ]
    
    return mockEvents.slice(0, messagingPermission.shared_events_count)
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-primary-100 p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-4 bg-primary-100 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-primary-50 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-20 bg-primary-50 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Authorization Gate */}
      <MessageAuthorizationGate
        targetUserId={matchedUser.id}
        targetUserName={matchedUser.name}
        targetUserImage={matchedUser.image}
        onPermissionGranted={() => setShowStarters(true)}
        onPermissionDenied={() => setShowStarters(false)}
      >
        {/* Messaging Interface - Only shown when authorized */}
        <div className="space-y-6">
          {/* Quick Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <ChatSolid className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">
                    {language === 'pt' ? 'Mensagens Desbloqueadas!' : 'Messaging Unlocked!'}
                  </h4>
                  <p className="text-sm text-green-700">
                    {language === 'pt' 
                      ? `Pode agora conversar com ${matchedUser.name}`
                      : `You can now chat with ${matchedUser.name}`}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowStarters(!showStarters)}
                className="bg-white border border-green-300 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <SparklesIcon className="w-4 h-4" />
                {showStarters 
                  ? (language === 'pt' ? 'Ocultar' : 'Hide')
                  : (language === 'pt' ? 'Iniciar Conversa' : 'Start Chat')
                }
              </button>
            </div>
            
            {/* Permission Details */}
            <div className="mt-3 flex flex-wrap gap-2">
              {messagingPermission?.has_mutual_match && (
                <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg">
                  <HeartSolid className="w-3 h-3 text-red-500" />
                  <span className="text-xs font-medium text-green-800">
                    {language === 'pt' ? 'Match Mútuo' : 'Mutual Match'}
                  </span>
                </div>
              )}
              
              {messagingPermission?.has_event_permission && (
                <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-lg">
                  <CalendarIcon className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium text-green-800">
                    {messagingPermission.shared_events_count} {language === 'pt' ? 'Eventos' : 'Events'}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Conversation Starters */}
          <AnimatePresence>
            {showStarters && messagingPermission?.can_message && (
              <ConversationStarters
                currentUserId={currentUserId}
                matchedUser={matchedUser}
                messagingUnlocked={true}
                unlockReason={getUnlockReason() as any}
                sharedEvents={getSharedEvents()}
                onStartConversation={handleStartConversation}
              />
            )}
          </AnimatePresence>

          {/* Manual Message Input - Alternative to starters */}
          {!showStarters && messagingPermission?.can_message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900">
                    {language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}
                  </h4>
                  <p className="text-sm text-primary-600">
                    {language === 'pt'
                      ? `Inicie uma conversa com ${matchedUser.name}`
                      : `Start a conversation with ${matchedUser.name}`}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <textarea
                  className="w-full p-3 border border-primary-200 rounded-xl resize-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
                  rows={3}
                  placeholder={language === 'pt' 
                    ? 'Escreva a sua mensagem...'
                    : 'Write your message...'}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowStarters(true)}
                    className="flex-1 py-3 px-4 border border-primary-300 text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    {language === 'pt' ? 'Ver Sugestões' : 'View Suggestions'}
                  </button>
                  
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
                    {language === 'pt' ? 'Enviar' : 'Send'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </MessageAuthorizationGate>
    </div>
  )
}