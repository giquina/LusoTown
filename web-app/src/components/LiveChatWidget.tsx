'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  HeartIcon, 
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { Crown, Users, MessageCircle, Send, Shield, BarChart3 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { ChatUser, ChatRoom } from '@/types/chat'
import ChatWindow from './ChatWindow'
import ModeratorPanel from './ModeratorPanel'
import PortuguesePolls from './PortuguesePolls'

interface LiveChatWidgetProps {
  streamId: string
  isLive: boolean
  hasAccess: boolean
  currentUser?: ChatUser | null
  className?: string
  showPolls?: boolean
  onClose?: () => void
}

export default function LiveChatWidget({ 
  streamId, 
  isLive, 
  hasAccess, 
  currentUser = null,
  className = '',
  showPolls = false,
  onClose
}: LiveChatWidgetProps) {
  const { language } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [activeView, setActiveView] = useState<'chat' | 'polls' | 'moderation'>('chat')
  const [showModeratorPanel, setShowModeratorPanel] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([])
  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock current user if not provided (in real implementation, this would come from auth)
  const mockCurrentUser: ChatUser | null = currentUser || (hasAccess ? {
    id: 'mock-user-id',
    username: language === 'pt' ? 'Visitante' : 'Guest',
    displayName: language === 'pt' ? 'Visitante' : 'Guest',
    avatar: 'GU',
    region: 'diaspora',
    isSubscriber: hasActiveSubscription,
    isModerator: false,
    isHost: false,
    badges: [],
    joinedAt: new Date()
  } : null)

  const canModerate = mockCurrentUser && (mockCurrentUser.isModerator || mockCurrentUser.isHost)
  const canCreatePolls = mockCurrentUser && (mockCurrentUser.isModerator || mockCurrentUser.isHost || mockCurrentUser.isSubscriber)
  
  const roomId = `stream_${streamId}`

  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isLive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl shadow-sm overflow-hidden p-6 text-center ${className}`}
      >
        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {language === 'pt' ? 'Stream Offline' : 'Stream Offline'}
        </h3>
        <p className="text-gray-600 text-sm">
          {language === 'pt' 
            ? 'O chat estará disponível quando a transmissão começar.'
            : 'Chat will be available when the stream starts.'
          }
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${
        isExpanded ? 'fixed inset-4 z-40' : className || 'h-96'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-primary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Chat Interativo' : 'Interactive Chat'}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-secondary-500 rounded-full"
                />
                <span>{language === 'pt' ? 'Ao Vivo' : 'Live'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView('chat')}
                className={`p-1.5 rounded-md transition-colors ${
                  activeView === 'chat' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title={language === 'pt' ? 'Chat' : 'Chat'}
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              
              {showPolls && (
                <button
                  onClick={() => setActiveView('polls')}
                  className={`p-1.5 rounded-md transition-colors ${
                    activeView === 'polls' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={language === 'pt' ? 'Sondagens' : 'Polls'}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              )}
              
              {canModerate && (
                <button
                  onClick={() => setShowModeratorPanel(true)}
                  className={`p-1.5 rounded-md transition-colors ${
                    showModeratorPanel 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={language === 'pt' ? 'Moderação' : 'Moderation'}
                >
                  <Shield className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Expand/Close Buttons */}
            <button
              onClick={toggleExpanded}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-lg"
              title={isExpanded 
                ? (language === 'pt' ? 'Minimizar' : 'Minimize')
                : (language === 'pt' ? 'Expandir' : 'Expand')
              }
            >
              {isExpanded ? (
                <XMarkIcon className="w-4 h-4" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>

            {onClose && !isExpanded && (
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-gray-700 rounded-lg"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active View Indicator */}
        <div className="mt-2 flex gap-2 text-xs">
          {activeView === 'chat' && (
            <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
              {language === 'pt' ? 'Chat Português' : 'Portuguese Chat'}
            </span>
          )}
          {activeView === 'polls' && (
            <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full">
              {language === 'pt' ? 'Sondagens Culturais' : 'Cultural Polls'}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Main Content */}
        <div className={`flex-1 ${showModeratorPanel ? 'mr-80' : ''} transition-all duration-300`}>
          <AnimatePresence mode="wait">
            {activeView === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <ChatWindow
                  streamId={streamId}
                  roomId={roomId}
                  currentUser={mockCurrentUser}
                  isLive={isLive}
                  hasAccess={hasAccess}
                  className="h-full rounded-none shadow-none border-none"
                />
              </motion.div>
            )}

            {activeView === 'polls' && showPolls && (
              <motion.div
                key="polls"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full overflow-y-auto p-4"
              >
                <PortuguesePolls
                  currentUser={mockCurrentUser}
                  canCreatePolls={canCreatePolls}
                  streamId={streamId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Moderator Panel Overlay */}
        <AnimatePresence>
          {showModeratorPanel && canModerate && (
            <ModeratorPanel
              room={room}
              onlineUsers={onlineUsers}
              currentUser={mockCurrentUser}
              isVisible={showModeratorPanel}
              onClose={() => setShowModeratorPanel(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer - Portuguese Cultural Touch */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-3 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                🇵🇹 <span>{language === 'pt' ? 'Comunidade Portuguesa' : 'Portuguese Community'}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {onlineUsers.length} online
              </span>
              <span>{language === 'pt' ? 'LusoTown TV' : 'LusoTown TV'}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}