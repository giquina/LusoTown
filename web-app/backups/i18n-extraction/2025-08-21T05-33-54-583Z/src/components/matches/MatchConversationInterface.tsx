'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import MatchMessagingFlow from '../MatchMessagingFlow'
import ConversationStarters from '../ConversationStarters'
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon,
  SparklesIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import {
  ChatBubbleLeftRightIcon as ChatSolid,
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid'

interface MatchProfile {
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

interface MatchConversationInterfaceProps {
  currentUserId: string
  matches: Array<{
    id: string
    profile: MatchProfile
    isMutual: boolean
    sharedEvents?: Array<{
      id: string
      title: string
      type: string
      date: string
    }>
  }>
  onMessageSent?: (matchId: string, message: string, starterId?: string) => void
  onCloseChat?: () => void
  className?: string
}

export default function MatchConversationInterface({
  currentUserId,
  matches,
  onMessageSent,
  onCloseChat,
  className = ''
}: MatchConversationInterfaceProps) {
  const { language, t } = useLanguage()
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [showConversationStarters, setShowConversationStarters] = useState(false)

  // Filter to only mutual matches or those with shared events
  const messagingEnabledMatches = matches.filter(match => 
    match.isMutual || (match.sharedEvents && match.sharedEvents.length > 0)
  )

  const selectedMatchData = messagingEnabledMatches.find(match => match.id === selectedMatch)

  const handleStartConversation = (matchId: string, message: string, starterId?: string) => {
    onMessageSent?.(matchId, message, starterId)
    setShowConversationStarters(false)
    setSelectedMatch(null)
  }

  if (messagingEnabledMatches.length === 0) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-primary-100 p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-bold text-primary-900 mb-2">
          {language === 'pt' ? 'Nenhuma Conversa Disponível' : 'No Conversations Available'}
        </h3>
        <p className="text-primary-600 text-sm max-w-md mx-auto">
          {language === 'pt'
            ? 'Faça match mútuo ou participe em eventos com outros membros para desbloquear mensagens.'
            : 'Make mutual matches or attend events with other members to unlock messaging.'}
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl">
            <ChatSolid className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-900">
              {language === 'pt' ? 'Conversas Desbloqueadas' : 'Unlocked Conversations'}
            </h2>
            <p className="text-sm text-primary-600">
              {language === 'pt' 
                ? `${messagingEnabledMatches.length} conexões disponíveis para conversar`
                : `${messagingEnabledMatches.length} connections available to chat`}
            </p>
          </div>
        </div>
        
        {onCloseChat && (
          <button
            onClick={onCloseChat}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Match Selection */}
      {!selectedMatch && (
        <div className="grid gap-4">
          {messagingEnabledMatches.map((match) => (
            <motion.div
              key={match.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-primary-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedMatch(match.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-900">
                    {match.profile.name}, {match.profile.age}
                  </h4>
                  <p className="text-sm text-primary-600">
                    {match.profile.location} • {match.profile.compatibility}% match
                  </p>
                  
                  {/* Connection Type Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    {match.isMutual && (
                      <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-1 rounded-lg">
                        <HeartSolid className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-medium text-green-800">
                          {language === 'pt' ? 'Match Mútuo' : 'Mutual Match'}
                        </span>
                      </div>
                    )}
                    
                    {match.sharedEvents && match.sharedEvents.length > 0 && (
                      <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
                        <CalendarIcon className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">
                          {match.sharedEvents.length} {language === 'pt' ? 'Eventos' : 'Events'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-medium hover:from-secondary-700 hover:to-accent-700 transition-all">
                    {language === 'pt' ? 'Conversar' : 'Chat'}
                  </button>
                </div>
              </div>
              
              {/* Preview of shared interests */}
              <div className="mt-3 flex flex-wrap gap-1">
                {match.profile.interests.slice(0, 3).map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {match.profile.interests.length > 3 && (
                  <span className="text-primary-600 text-xs">
                    +{match.profile.interests.length - 3} {language === 'pt' ? 'mais' : 'more'}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Conversation Interface for Selected Match */}
      <AnimatePresence>
        {selectedMatch && selectedMatchData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Selected Match Header */}
            <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900">
                      {selectedMatchData.profile.name}, {selectedMatchData.profile.age}
                    </h3>
                    <p className="text-sm text-primary-600">
                      {selectedMatchData.profile.profession} • {selectedMatchData.profile.location}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conversation Starters Component */}
            <ConversationStarters
              currentUserId={currentUserId}
              matchedUser={selectedMatchData.profile}
              messagingUnlocked={true}
              unlockReason={
                selectedMatchData.isMutual && selectedMatchData.sharedEvents?.length 
                  ? 'both'
                  : selectedMatchData.isMutual 
                    ? 'mutual_match' 
                    : 'shared_events'
              }
              sharedEvents={selectedMatchData.sharedEvents || []}
              onStartConversation={(starterId, message) => 
                handleStartConversation(selectedMatchData.id, message, starterId)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}