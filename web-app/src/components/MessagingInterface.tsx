'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService, ConversationMessage, Conversation } from '@/services/messagingService'
import MessageAuthorizationGate from './MessageAuthorizationGate'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Smile, 
  Image, 
  MoreVertical, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Shield,
  Heart,
  Calendar,
  ArrowLeft,
  Flag
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { pt, enUS } from 'date-fns/locale'

interface MessagingInterfaceProps {
  targetUserId: string
  targetUserName: string
  targetUserImage?: string
  targetUserLocation?: string
  targetUserBio?: string
  conversationId?: string
  onBack?: () => void
  className?: string
}

export default function MessagingInterface({
  targetUserId,
  targetUserName,
  targetUserImage,
  targetUserLocation,
  targetUserBio,
  conversationId: initialConversationId,
  onBack,
  className = ''
}: MessagingInterfaceProps) {
  const { language } = useLanguage()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      typeMessage: 'Type a message...',
      send: 'Send',
      messagingRestricted: 'Messaging is restricted for safety',
      waitingApproval: 'Message pending approval',
      messageBlocked: 'Message blocked by safety filters',
      messageDelivered: 'Delivered',
      messageRead: 'Read',
      today: 'Today',
      yesterday: 'Yesterday',
      reportMessage: 'Report message',
      backToConversations: 'Back to conversations',
      safetyNotice: 'All messages are monitored for safety in our Portuguese community',
      connectionType: {
        mutual_match: 'Connected through mutual match',
        event_based: 'Met at a community event',
        professional: 'Professional connection'
      },
      conversationStarters: [
        'Olá! How are you enjoying London?',
        'What\'s your favorite Portuguese restaurant here?',
        'Have you been to any Portuguese events recently?',
        'How do you stay connected to Portuguese culture in London?'
      ],
      startConversation: 'Start the conversation with a friendly greeting!'
    },
    pt: {
      typeMessage: 'Escreva uma mensagem...',
      send: 'Enviar',
      messagingRestricted: 'Mensagens restringidas por segurança',
      waitingApproval: 'Mensagem pendente de aprovação',
      messageBlocked: 'Mensagem bloqueada pelos filtros de segurança',
      messageDelivered: 'Entregue',
      messageRead: 'Lida',
      today: 'Hoje',
      yesterday: 'Ontem',
      reportMessage: 'Reportar mensagem',
      backToConversations: 'Voltar às conversas',
      safetyNotice: 'Todas as mensagens são monitorizadas para segurança na nossa comunidade portuguesa',
      connectionType: {
        mutual_match: 'Conectados através de match mútuo',
        event_based: 'Conheceram-se num evento da comunidade',
        professional: 'Conexão profissional'
      },
      conversationStarters: [
        'Olá! Como está a correr Londres?',
        'Qual é o seu restaurante português favorito aqui?',
        'Esteve em algum evento português recentemente?',
        'Como se mantém ligado à cultura portuguesa em Londres?'
      ],
      startConversation: 'Comece a conversa com uma saudação amigável!'
    }
  }

  const t = translations[language]
  const dateLocale = language === 'pt' ? pt : enUS

  useEffect(() => {
    if (hasPermission) {
      initializeConversation()
    }
  }, [hasPermission, initialConversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeConversation = async () => {
    try {
      setLoading(true)
      
      let conv: Conversation
      if (initialConversationId) {
        // Get existing conversation
        const conversations = await messagingService.getUserConversations()
        conv = conversations.find(c => c.id === initialConversationId)
        if (!conv) throw new Error('Conversation not found')
      } else {
        // Create or get conversation
        conv = await messagingService.getOrCreateConversation(targetUserId)
      }
      
      setConversation(conv)
      
      // Load messages
      const msgs = await messagingService.getConversationMessages(conv.id)
      setMessages(msgs)
      
      // Mark messages as read
      await messagingService.markMessagesAsRead(conv.id)
    } catch (err) {
      console.error('Error initializing conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to load conversation')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation || sending) return

    try {
      setSending(true)
      const message = await messagingService.sendMessage(
        conversation.id,
        targetUserId,
        newMessage.trim()
      )
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
      setError(null)
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const isYesterday = date.toDateString() === yesterday.toDateString()

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (isYesterday) {
      return `${t.yesterday} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: dateLocale })
    }
  }

  const getMessageStatusIcon = (message: ConversationMessage) => {
    if (message.approval_status === 'pending') {
      return <Clock className="w-3 h-3 text-accent-500" />
    }
    if (message.is_blocked) {
      return <AlertTriangle className="w-3 h-3 text-coral-500" />
    }
    if (message.is_read) {
      return <CheckCircle className="w-3 h-3 text-action-500" />
    }
    return <CheckCircle className="w-3 h-3 text-gray-400" />
  }

  const MessageBubble = ({ message, isOwn }: { message: ConversationMessage, isOwn: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
        <div className={`relative px-4 py-2 rounded-lg ${
          isOwn 
            ? 'bg-primary-600 text-white' 
            : 'bg-secondary-100 text-gray-900'
        }`}>
          <p className="text-sm">{message.content}</p>
          
          {message.approval_status === 'pending' && (
            <div className="mt-1 text-xs opacity-75">
              {t.waitingApproval}
            </div>
          )}
          
          {message.is_blocked && (
            <div className="mt-1 text-xs text-red-200">
              {t.messageBlocked}
            </div>
          )}
        </div>
        
        <div className={`flex items-center mt-1 space-x-2 ${
          isOwn ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-gray-500">
            {formatMessageTime(message.created_at)}
          </span>
          {isOwn && getMessageStatusIcon(message)}
        </div>
      </div>
      
      {!isOwn && (
        <div className="order-0 mr-3">
          <img
            src={targetUserImage || '/images/default-avatar.png'}
            alt={targetUserName}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
    </motion.div>
  )

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-600" />
          </button>
        )}
        
        <img
          src={targetUserImage || '/images/default-avatar.png'}
          alt={targetUserName}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{targetUserName}</h3>
          {targetUserLocation && (
            <p className="text-sm text-gray-500">{targetUserLocation}</p>
          )}
          {conversation && (
            <div className="flex items-center space-x-2 mt-1">
              {conversation.connection_type === 'mutual_match' && (
                <Heart className="w-4 h-4 text-coral-500" />
              )}
              {conversation.connection_type === 'event_based' && (
                <Calendar className="w-4 h-4 text-primary-500" />
              )}
              <span className="text-xs text-gray-500">
                {t.connectionType[conversation.connection_type]}
              </span>
            </div>
          )}
        </div>
        
        <button className="p-2 hover:bg-secondary-100 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-secondary-600" />
        </button>
      </div>

      <MessageAuthorizationGate
        targetUserId={targetUserId}
        targetUserName={targetUserName}
        targetUserImage={targetUserImage}
        onPermissionGranted={() => setHasPermission(true)}
        onPermissionDenied={() => setHasPermission(false)}
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-secondary-600 mb-4">{t.startConversation}</p>
              <div className="space-y-2">
                {t.conversationStarters.map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(starter)}
                    className="block w-full p-2 text-left text-sm text-secondary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    "{starter}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender_id !== targetUserId}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Safety Notice */}
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center space-x-2 text-sm text-primary-700">
            <Shield className="w-4 h-4" />
            <span>{t.safetyNotice}</span>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.typeMessage}
                className="w-full px-4 py-2 border border-secondary-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </MessageAuthorizationGate>
    </div>
  )
}