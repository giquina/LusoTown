'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Crown, Users, MessageCircle, Send } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface ChatMessage {
  id: string
  user: {
    name: string
    isPremium: boolean
    isHost: boolean
    avatar: string
  }
  message: string
  timestamp: Date
  isSuperchat?: boolean
  reactions?: Array<{
    emoji: string
    count: number
  }>
}

interface LiveChatWidgetProps {
  streamId: string
  isLive: boolean
  hasAccess: boolean
}

export default function LiveChatWidget({ streamId, isLive, hasAccess }: LiveChatWidgetProps) {
  const { language } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const canParticipate = hasAccess && (hasActiveSubscription || isInTrial)

  // Mock chat messages for demonstration
  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      user: {
        name: 'Maria Santos',
        isPremium: false,
        isHost: true,
        avatar: 'MS'
      },
      message: language === 'pt' ? 'Bem-vindos à nossa noite de fado! 🎵' : 'Welcome to our fado night! 🎵',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      user: {
        name: 'João Silva',
        isPremium: true,
        isHost: false,
        avatar: 'JS'
      },
      message: language === 'pt' ? 'Que voz maravilhosa! Obrigado por este momento especial' : 'What a wonderful voice! Thank you for this special moment',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      reactions: [{ emoji: '❤️', count: 5 }, { emoji: '👏', count: 3 }]
    },
    {
      id: '3',
      user: {
        name: 'Ana Costa',
        isPremium: false,
        isHost: false,
        avatar: 'AC'
      },
      message: language === 'pt' ? 'Primeira vez a assistir fado ao vivo, estou emocionada!' : 'First time watching live fado, I\'m so moved!',
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    },
    {
      id: '4',
      user: {
        name: 'Carlos Mendes',
        isPremium: true,
        isHost: false,
        avatar: 'CM'
      },
      message: language === 'pt' ? 'Conseguem partilhar o nome dessa música? É lindíssima!' : 'Can you share the name of that song? It\'s beautiful!',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isSuperchat: true
    },
    {
      id: '5',
      user: {
        name: 'Rita Fernandes',
        isPremium: false,
        isHost: false,
        avatar: 'RF'
      },
      message: language === 'pt' ? 'Saudades de Portugal... obrigada por isto 🇵🇹' : 'Missing Portugal... thank you for this 🇵🇹',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      reactions: [{ emoji: '🇵🇹', count: 8 }, { emoji: '❤️', count: 12 }]
    }
  ]

  useEffect(() => {
    if (isLive) {
      setMessages(mockMessages)
      setIsConnected(true)
      setViewerCount(127)

      // Simulate new messages coming in
      const interval = setInterval(() => {
        const randomMessages = [
          language === 'pt' ? 'Que lindo! 😍' : 'So beautiful! 😍',
          language === 'pt' ? 'Bravo! 👏' : 'Bravo! 👏',
          language === 'pt' ? 'Obrigado pela música' : 'Thank you for the music',
          language === 'pt' ? 'Estou a chorar de emoção' : 'I\'m crying with emotion',
          language === 'pt' ? 'Viva Portugal! 🇵🇹' : 'Long live Portugal! 🇵🇹'
        ]

        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: {
            name: `Viewer${Math.floor(Math.random() * 1000)}`,
            isPremium: Math.random() > 0.7,
            isHost: false,
            avatar: `V${Math.floor(Math.random() * 10)}`
          },
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date()
        }

        setMessages(prev => [...prev.slice(-20), newMsg]) // Keep last 20 messages
      }, Math.random() * 10000 + 5000) // Random interval 5-15 seconds

      return () => clearInterval(interval)
    }
  }, [isLive, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !canParticipate) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: 'Você', // You
        isPremium: hasActiveSubscription,
        isHost: false,
        avatar: 'YO'
      },
      message: newMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const handleReaction = (messageId: string, emoji: string) => {
    if (!canParticipate) return

    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || []
        const existingReaction = reactions.find(r => r.emoji === emoji)
        
        if (existingReaction) {
          existingReaction.count += 1
        } else {
          reactions.push({ emoji, count: 1 })
        }
        
        return { ...msg, reactions }
      }
      return msg
    }))
  }

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
      className="bg-white rounded-xl shadow-sm overflow-hidden h-96 flex flex-col"
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Chat ao Vivo' : 'Live Chat'}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {isConnected && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-secondary-500 rounded-full"
                    />
                    <span>{viewerCount} {language === 'pt' ? 'online' : 'online'}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {isLive && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-action-500 text-white px-2 py-1 rounded-full text-xs font-bold"
            >
              {language === 'pt' ? 'AO VIVO' : 'LIVE'}
            </motion.div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-2 ${message.isSuperchat ? 'bg-accent-50 p-2 rounded-lg border-l-4 border-accent-500' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                message.user.isHost 
                  ? 'bg-gradient-to-r from-action-500 to-secondary-500'
                  : message.user.isPremium
                  ? 'bg-gradient-to-r from-premium-500 to-premium-600'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}>
                {message.user.avatar}
              </div>

              <div className="flex-1 min-w-0">
                {/* User Info */}
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${
                    message.user.isHost ? 'text-action-600' : 'text-gray-700'
                  }`}>
                    {message.user.name}
                  </span>
                  
                  {message.user.isHost && (
                    <span className="bg-action-100 text-action-700 px-1.5 py-0.5 rounded text-xs font-medium">
                      {language === 'pt' ? 'HOST' : 'HOST'}
                    </span>
                  )}
                  
                  {message.user.isPremium && !message.user.isHost && (
                    <Crown className="w-3 h-3 text-premium-600" />
                  )}
                  
                  <span className="text-xs text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>

                {/* Message */}
                <div className="text-sm text-gray-900 break-words">
                  {message.message}
                </div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {message.reactions.map((reaction, index) => (
                      <button
                        key={index}
                        onClick={() => handleReaction(message.id, reaction.emoji)}
                        disabled={!canParticipate}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          canParticipate 
                            ? 'bg-gray-100 hover:bg-gray-200' 
                            : 'bg-gray-100 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-gray-600">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200">
        {canParticipate ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={language === 'pt' ? 'Escreva uma mensagem...' : 'Type a message...'}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={200}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-sm text-gray-600 mb-2">
              {language === 'pt' 
                ? 'Faça login para participar no chat'
                : 'Sign in to participate in chat'
              }
            </div>
            <div className="flex gap-2 justify-center">
              <a
                href="/login"
                className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
              >
                {language === 'pt' ? 'Entrar' : 'Sign In'}
              </a>
              <a
                href="/subscription"
                className="px-3 py-1.5 bg-premium-600 text-white text-sm rounded-lg hover:bg-premium-700 transition-colors"
              >
                {language === 'pt' ? 'Premium' : 'Premium'}
              </a>
            </div>
          </div>
        )}

        {/* Quick Reactions */}
        {canParticipate && (
          <div className="flex gap-2 mt-2 justify-center">
            {['❤️', '👏', '🎵', '🇵🇹', '😍'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  const latestMessage = messages[messages.length - 1]
                  if (latestMessage) {
                    handleReaction(latestMessage.id, emoji)
                  }
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}