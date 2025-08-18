'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon, 
  FaceSmileIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { Crown, Users, MessageCircle, Send, Shield, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { ChatMessage, ChatUser, ChatRoom } from '@/types/chat'
import { socketManager } from '@/lib/socket-client'
import { portugueseModerationEngine } from '@/lib/portuguese-moderation'
import { parseEmotesInMessage, REGIONAL_INDICATORS } from '@/lib/portuguese-emotes'
import EmotePicker from './EmotePicker'
import ChatMessageComponent from './ChatMessage'

interface ChatWindowProps {
  streamId: string
  roomId: string
  currentUser: ChatUser | null
  isLive: boolean
  hasAccess: boolean
  className?: string
}

export default function ChatWindow({ 
  streamId, 
  roomId, 
  currentUser, 
  isLive, 
  hasAccess, 
  className = '' 
}: ChatWindowProps) {
  const { language } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [onlineUsers, setOnlineUsers] = useState<ChatUser[]>([])
  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [isEmotePickerOpen, setIsEmotePickerOpen] = useState(false)
  const [moderationWarning, setModerationWarning] = useState<string | null>(null)
  const [slowModeCountdown, setSlowModeCountdown] = useState(0)
  const [lastMessageTime, setLastMessageTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  
  const canParticipate = hasAccess && currentUser && (hasActiveSubscription || isInTrial || currentUser.isModerator || currentUser.isHost)
  const canModerate = currentUser && (currentUser.isModerator || currentUser.isHost)

  // Initialize socket connection
  useEffect(() => {
    if (!currentUser || !isLive) return

    const initializeSocket = async () => {
      try {
        await socketManager.connect(currentUser.id, currentUser.region)
        setIsConnected(true)
        socketManager.joinRoom(roomId, currentUser.id)
      } catch (error) {
        console.error('Failed to connect to chat:', error)
        setIsConnected(false)
      }
    }

    initializeSocket()

    return () => {
      socketManager.leaveRoom(roomId)
      socketManager.disconnect()
      setIsConnected(false)
    }
  }, [currentUser, roomId, isLive])

  // Socket event listeners
  useEffect(() => {
    if (!isConnected) return

    socketManager.onMessage((message: ChatMessage) => {
      setMessages(prev => [...prev.slice(-49), message]) // Keep last 50 messages
    })

    socketManager.onUserJoined((user: ChatUser) => {
      setOnlineUsers(prev => [...prev.filter(u => u.id !== user.id), user])
    })

    socketManager.onUserLeft((userId: string) => {
      setOnlineUsers(prev => prev.filter(u => u.id !== userId))
    })

    socketManager.onViewerCount((count: number) => {
      setViewerCount(count)
    })

    socketManager.onRoomUpdate((updatedRoom: ChatRoom) => {
      setRoom(updatedRoom)
    })

    socketManager.onMessageDeleted((messageId: string) => {
      setMessages(prev => prev.filter(m => m.id !== messageId))
    })

    socketManager.onUserTimeout((userId: string, duration: number) => {
      // Handle user timeout UI update
      console.log(`User ${userId} timed out for ${duration} seconds`)
    })

    socketManager.onReactionAdded((messageId: string, emoji: string, userId: string) => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          const existingReaction = reactions.find(r => r.emoji === emoji)
          
          if (existingReaction) {
            if (!existingReaction.users.includes(userId)) {
              existingReaction.count += 1
              existingReaction.users.push(userId)
            }
          } else {
            reactions.push({ emoji, count: 1, users: [userId] })
          }
          
          return { ...msg, reactions }
        }
        return msg
      }))
    })

    return () => {
      socketManager.removeAllListeners()
    }
  }, [isConnected])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Slow mode countdown
  useEffect(() => {
    if (slowModeCountdown > 0) {
      const timer = setTimeout(() => setSlowModeCountdown(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [slowModeCountdown])

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !canParticipate || !currentUser || !isConnected) return

    // Check slow mode
    if (room?.settings.slowMode && !currentUser.isModerator && !currentUser.isHost) {
      const timeSinceLastMessage = (Date.now() - lastMessageTime) / 1000
      if (timeSinceLastMessage < room.settings.slowMode) {
        setSlowModeCountdown(room.settings.slowMode - Math.floor(timeSinceLastMessage))
        return
      }
    }

    // Check moderation
    const moderationResult = portugueseModerationEngine.moderateMessage(
      newMessage,
      currentUser.region,
      currentUser.isModerator ? 'moderator' : 
      currentUser.isHost ? 'host' :
      currentUser.isSubscriber ? 'subscriber' : 'viewer'
    )

    if (!moderationResult.isAllowed) {
      setModerationWarning(moderationResult.suggestion || 'Message não permitida')
      setTimeout(() => setModerationWarning(null), 5000)
      return
    }

    // Parse emotes in message
    const { text, emotes } = parseEmotesInMessage(newMessage)

    const message: Omit<ChatMessage, 'id' | 'timestamp'> = {
      userId: currentUser.id,
      username: currentUser.username,
      message: newMessage,
      emotes,
      userRegion: currentUser.region,
      isSubscriber: currentUser.isSubscriber,
      isModerator: currentUser.isModerator,
      isHost: currentUser.isHost
    }

    socketManager.sendMessage(message)
    setNewMessage('')
    setLastMessageTime(Date.now())

    // Set slow mode countdown
    if (room?.settings.slowMode && !currentUser.isModerator && !currentUser.isHost) {
      setSlowModeCountdown(room.settings.slowMode)
    }
  }, [newMessage, canParticipate, currentUser, isConnected, room, lastMessageTime])

  const handleEmoteSelect = useCallback((emoteCode: string) => {
    setNewMessage(prev => prev + emoteCode + ' ')
    chatInputRef.current?.focus()
  }, [])

  const handleReactionSelect = useCallback((emoji: string) => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1]
      socketManager.addReaction(latestMessage.id, emoji)
    }
  }, [messages])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-primary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                {language === 'pt' ? 'Chat ao Vivo' : 'Live Chat'}
                {room?.settings.portugueseOnly && (
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                    🇵🇹 PT
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {isConnected ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-secondary-500 rounded-full"
                    />
                    <UserGroupIcon className="w-3 h-3" />
                    <span>{viewerCount} {language === 'pt' ? 'online' : 'online'}</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <span>{language === 'pt' ? 'Desconectado' : 'Disconnected'}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isLive && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-action-500 text-white px-2 py-1 rounded-full text-xs font-bold"
              >
                {language === 'pt' ? 'AO VIVO' : 'LIVE'}
              </motion.div>
            )}
            
            {canModerate && (
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded-lg">
                <Cog6ToothIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Room Settings Info */}
        {room && (room.settings.slowMode > 0 || room.settings.subscriberOnly || room.settings.emoteOnly) && (
          <div className="mt-2 flex gap-2 text-xs">
            {room.settings.slowMode > 0 && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {language === 'pt' ? `Modo lento: ${room.settings.slowMode}s` : `Slow mode: ${room.settings.slowMode}s`}
              </span>
            )}
            {room.settings.subscriberOnly && (
              <span className="bg-premium-100 text-premium-800 px-2 py-1 rounded-full">
                {language === 'pt' ? 'Só membros' : 'Subscribers only'}
              </span>
            )}
            {room.settings.emoteOnly && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {language === 'pt' ? 'Só emotes' : 'Emote only'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <ChatMessageComponent
              key={message.id}
              message={message}
              currentUser={currentUser}
              canModerate={canModerate}
              onReaction={handleReactionSelect}
              language={language}
            />
          ))}
        </AnimatePresence>
        
        {messages.length === 0 && isConnected && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">
              {language === 'pt' 
                ? 'Seja o primeiro a dizer olá!'
                : 'Be the first to say hello!'
              }
            </p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Moderation Warning */}
      <AnimatePresence>
        {moderationWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-3 mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <div className="flex items-center gap-2 text-amber-800">
              <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs">{moderationWarning}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200">
        {canParticipate ? (
          <div className="space-y-2">
            <div className="flex gap-2 relative">
              <input
                ref={chatInputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'pt' ? 'Escreva uma mensagem...' : 'Type a message...'}
                disabled={slowModeCountdown > 0}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm 
                  focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  disabled:bg-gray-100 disabled:cursor-not-allowed"
                maxLength={500}
              />
              
              <button
                onClick={() => setIsEmotePickerOpen(!isEmotePickerOpen)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 
                  transition-colors"
                type="button"
              >
                <FaceSmileIcon className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || slowModeCountdown > 0}
                className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {slowModeCountdown > 0 ? slowModeCountdown : <Send className="w-4 h-4" />}
              </button>

              {/* Emote Picker */}
              {isEmotePickerOpen && currentUser && (
                <EmotePicker
                  onEmoteSelect={handleEmoteSelect}
                  onReactionSelect={handleReactionSelect}
                  userRegion={currentUser.region}
                  isOpen={isEmotePickerOpen}
                  onClose={() => setIsEmotePickerOpen(false)}
                  position="top"
                />
              )}
            </div>

            {/* Character Count */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{newMessage.length}/500</span>
              {currentUser && (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="text-xs">{REGIONAL_INDICATORS[currentUser.region].flag}</span>
                    {REGIONAL_INDICATORS[currentUser.region].name}
                  </span>
                  {currentUser.isSubscriber && <Crown className="w-3 h-3 text-premium-600" />}
                  {currentUser.isModerator && <Shield className="w-3 h-3 text-blue-600" />}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-sm text-gray-600 mb-2">
              {!currentUser ? (
                language === 'pt' ? 'Faça login para participar no chat' : 'Sign in to participate in chat'
              ) : (
                language === 'pt' ? 'Membership necessária para participar' : 'Membership required to participate'
              )}
            </div>
            <div className="flex gap-2 justify-center">
              {!currentUser ? (
                <>
                  <a
                    href="/login"
                    className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg 
                      hover:bg-primary-700 transition-colors"
                  >
                    {language === 'pt' ? 'Entrar' : 'Sign In'}
                  </a>
                  <a
                    href="/signup"
                    className="px-3 py-1.5 bg-secondary-600 text-white text-sm rounded-lg 
                      hover:bg-secondary-700 transition-colors"
                  >
                    {language === 'pt' ? 'Registar' : 'Sign Up'}
                  </a>
                </>
              ) : (
                <a
                  href="/premium-membership"
                  className="px-3 py-1.5 bg-premium-600 text-white text-sm rounded-lg 
                    hover:bg-premium-700 transition-colors"
                >
                  {language === 'pt' ? 'Obter Membership' : 'Get Membership'}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}