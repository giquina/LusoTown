'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService, ConversationMessage, Conversation } from '@/services/messagingService'
import MessageAuthorizationGate from './MessageAuthorizationGate'
import VoiceMessageRecorder from './VoiceMessageRecorder'
import VoiceMessagePlayer from './VoiceMessagePlayer'
import MessageTranslator from './MessageTranslator'
import PortugueseCommunicationPanel from './PortugueseCommunicationPanel'
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
  Flag,
  Mic,
  MicOff,
  Languages,
  Globe,
  Volume2,
  VolumeX,
  Settings,
  Plus,
  X,
  Paperclip
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { pt, enUS } from 'date-fns/locale'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface VoiceMessage {
  id: string
  audioUrl: string
  duration: number
  transcription?: string
  translation?: string
  senderName: string
  senderAvatar?: string
  timestamp: string
  dialect?: string
  confidence?: number
  isRead?: boolean
}

interface EnhancedMessagingInterfaceProps {
  targetUserId: string
  targetUserName: string
  targetUserImage?: string
  targetUserLocation?: string
  targetUserBio?: string
  conversationId?: string
  membershipTier?: string
  preferredDialect?: string
  onBack?: () => void
  className?: string
}

export default function EnhancedMessagingInterface({
  targetUserId,
  targetUserName,
  targetUserImage,
  targetUserLocation,
  targetUserBio,
  conversationId: initialConversationId,
  membershipTier = 'standard',
  preferredDialect = 'pt-PT',
  onBack,
  className = ''
}: EnhancedMessagingInterfaceProps) {
  const { language } = useLanguage()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [voiceMessages, setVoiceMessages] = useState<VoiceMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState(false)
  
  // Enhanced messaging features
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [showTranslator, setShowTranslator] = useState(false)
  const [showCommunicationPanel, setShowCommunicationPanel] = useState(false)
  const [translationEnabled, setTranslationEnabled] = useState(true)
  const [voiceMessagesEnabled, setVoiceMessagesEnabled] = useState(true)
  const [selectedMessageForTranslation, setSelectedMessageForTranslation] = useState<string | null>(null)
  const [autoTranslate, setAutoTranslate] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const translations = {
    en: {
      typeMessage: 'Type a message...',
      send: 'Send',
      voiceMessage: 'Voice message',
      translate: 'Translate',
      culturalExpressions: 'Portuguese expressions',
      messagingRestricted: 'Messaging is restricted for safety',
      waitingApproval: 'Message pending approval',
      messageBlocked: 'Message blocked by safety filters',
      messageDelivered: 'Delivered',
      messageRead: 'Read',
      today: 'Today',
      yesterday: 'Yesterday',
      reportMessage: 'Report message',
      backToConversations: 'Back to conversations',
      safetyNotice: 'All messages are monitored for safety in our Portuguese-speaking community',
      connectionType: {
        mutual_match: 'Connected through mutual match',
        event_based: 'Met at a community event',
        professional: 'Professional connection'
      },
      conversationStarters: [
        'Olá! How are you enjoying London?',
        'What\'s your favorite Portuguese restaurant here?',
        'Have you been to any Lusophone events recently?',
        'How do you stay connected to Portuguese culture in London?'
      ],
      startConversation: 'Start the conversation with a friendly greeting!',
      enableVoiceMessages: 'Enable voice messages',
      enableAutoTranslation: 'Auto-translate messages',
      voiceRecording: 'Voice recording',
      translationSettings: 'Translation settings',
      messageSettings: 'Message settings',
      sendingVoiceMessage: 'Sending voice message...',
      voiceMessageSent: 'Voice message sent!',
      translationFailed: 'Translation failed',
      attachFile: 'Attach file',
      emoji: 'Emoji',
      more: 'More options'
    },
    pt: {
      typeMessage: 'Escreva uma mensagem...',
      send: 'Enviar',
      voiceMessage: 'Mensagem de voz',
      translate: 'Traduzir',
      culturalExpressions: 'Expressões portuguesas',
      messagingRestricted: 'Mensagens restringidas por segurança',
      waitingApproval: 'Mensagem pendente de aprovação',
      messageBlocked: 'Mensagem bloqueada pelos filtros de segurança',
      messageDelivered: 'Entregue',
      messageRead: 'Lida',
      today: 'Hoje',
      yesterday: 'Ontem',
      reportMessage: 'Reportar mensagem',
      backToConversations: 'Voltar às conversas',
      safetyNotice: 'Todas as mensagens são monitorizadas para segurança na nossa comunidade de falantes de português',
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
      startConversation: 'Comece a conversa com uma saudação amigável!',
      enableVoiceMessages: 'Ativar mensagens de voz',
      enableAutoTranslation: 'Auto-traduzir mensagens',
      voiceRecording: 'Gravação de voz',
      translationSettings: 'Configurações de tradução',
      messageSettings: 'Configurações de mensagem',
      sendingVoiceMessage: 'Enviando mensagem de voz...',
      voiceMessageSent: 'Mensagem de voz enviada!',
      translationFailed: 'Falha na tradução',
      attachFile: 'Anexar ficheiro',
      emoji: 'Emoji',
      more: 'Mais opções'
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
  }, [messages, voiceMessages])

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
      
      // Load voice messages (mock data for now)
      setVoiceMessages([])
      
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
      
      // Auto-translate if enabled
      if (autoTranslate && translationEnabled) {
        handleTranslateMessage(message.id, newMessage.trim())
      }
      
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleSendVoiceMessage = async (audioBlob: Blob, transcription: string, duration: number) => {
    if (!conversation) return

    try {
      setSending(true)
      
      // Upload voice message to server
      const formData = new FormData()
      formData.append('audio', audioBlob, 'voice-message.webm')
      formData.append('conversationId', conversation.id)
      formData.append('targetUserId', targetUserId)
      formData.append('transcription', transcription)
      formData.append('duration', duration.toString())
      formData.append('dialect', preferredDialect)

      const response = await fetch('/api/voice-messages', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to send voice message')
      }

      const voiceMessage = await response.json()
      
      // Add to voice messages list
      setVoiceMessages(prev => [...prev, voiceMessage])
      
      // Auto-translate transcription if enabled
      if (autoTranslate && translationEnabled && transcription) {
        handleTranslateMessage(voiceMessage.id, transcription)
      }

      setShowVoiceRecorder(false)
      setError(null)

    } catch (err) {
      console.error('Error sending voice message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send voice message')
    } finally {
      setSending(false)
    }
  }

  const handleTranslateMessage = async (messageId: string, text: string) => {
    try {
      const response = await fetch('/api/translate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messageId,
          text,
          sourceLanguage: 'auto',
          targetLanguage: language === 'pt' ? 'en' : 'pt',
          dialect: preferredDialect
        })
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const translation = await response.json()
      
      // Update message with translation
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, translation: translation.translatedText }
          : msg
      ))

      // Update voice message with translation
      setVoiceMessages(prev => prev.map(vm =>
        vm.id === messageId
          ? { ...vm, translation: translation.translatedText }
          : vm
      ))

    } catch (err) {
      console.error('Translation error:', err)
      setError(t.translationFailed)
    }
  }

  const handleSelectExpression = (text: string, emoji?: string) => {
    const expressionText = emoji ? `${emoji} ${text}` : text
    setNewMessage(prev => prev + (prev ? ' ' : '') + expressionText)
    setShowCommunicationPanel(false)
    inputRef.current?.focus()
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
      return <Clock className="w-3 h-3 text-yellow-500" />
    }
    if (message.is_blocked) {
      return <AlertTriangle className="w-3 h-3 text-red-500" />
    }
    if (message.is_read) {
      return <CheckCircle className="w-3 h-3 text-green-500" />
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
            : 'bg-gray-100 text-gray-900'
        }`} style={isOwn ? { backgroundColor: PORTUGUESE_COLORS.primary } : {}}>
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

          {/* Translation Display */}
          {translationEnabled && message.translation && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="flex items-center space-x-1 mb-1">
                <Languages className="w-3 h-3 opacity-70" />
                <span className="text-xs opacity-70">{t.translate}</span>
              </div>
              <p className="text-xs italic opacity-90">{message.translation}</p>
            </div>
          )}
        </div>
        
        <div className={`flex items-center justify-between mt-1 space-x-2 ${
          isOwn ? 'flex-row-reverse space-x-reverse' : ''
        }`}>
          <span className="text-xs text-gray-500">
            {formatMessageTime(message.created_at)}
          </span>
          <div className="flex items-center space-x-2">
            {isOwn && getMessageStatusIcon(message)}
            {translationEnabled && !message.translation && (
              <button
                onClick={() => handleTranslateMessage(message.id, message.content)}
                className="p-1 text-gray-400 hover:text-primary-600 rounded"
              >
                <Languages className="w-3 h-3" />
              </button>
            )}
          </div>
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
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
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
                <Heart className="w-4 h-4 text-red-500" />
              )}
              {conversation.connection_type === 'event_based' && (
                <Calendar className="w-4 h-4 text-blue-500" />
              )}
              <span className="text-xs text-gray-500">
                {t.connectionType[conversation.connection_type]}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 bg-gray-50 border-b border-gray-200"
          >
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="voiceMessages"
                    checked={voiceMessagesEnabled}
                    onChange={(e) => setVoiceMessagesEnabled(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="voiceMessages" className="text-sm text-gray-700">
                    {t.enableVoiceMessages}
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoTranslate"
                    checked={autoTranslate}
                    onChange={(e) => setAutoTranslate(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="autoTranslate" className="text-sm text-gray-700">
                    {t.enableAutoTranslation}
                  </label>
                </div>
              </div>
              
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          ) : (messages.length === 0 && voiceMessages.length === 0) ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">{t.startConversation}</p>
              <div className="space-y-2">
                {t.conversationStarters.map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(starter)}
                    className="block w-full p-2 text-left text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    "{starter}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Render text messages */}
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender_id !== targetUserId}
                />
              ))}
              
              {/* Render voice messages */}
              {voiceMessages.map((voiceMessage) => (
                <VoiceMessagePlayer
                  key={voiceMessage.id}
                  message={voiceMessage}
                  isOwn={voiceMessage.senderName === 'You'}
                  showTranscription={true}
                  showTranslation={translationEnabled}
                  onTranslate={(id) => handleTranslateMessage(id, voiceMessage.transcription || '')}
                  onReport={(id) => console.log('Report voice message:', id)}
                  onDownload={(id) => console.log('Download voice message:', id)}
                />
              ))}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Voice Recorder Panel */}
        <AnimatePresence>
          {showVoiceRecorder && voiceMessagesEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-gray-50 border-t border-gray-200"
            >
              <VoiceMessageRecorder
                onSendVoiceMessage={handleSendVoiceMessage}
                membershipTier={membershipTier}
                preferredDialect={preferredDialect}
                disabled={sending}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Translation Panel */}
        <AnimatePresence>
          {showTranslator && selectedMessageForTranslation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-white border-t border-gray-200"
            >
              <MessageTranslator
                originalMessage={selectedMessageForTranslation}
                dialect={preferredDialect}
                showCulturalContext={true}
                enableVoicePlayback={true}
                onTranslationComplete={(result) => {
                  console.log('Translation completed:', result)
                  setShowTranslator(false)
                  setSelectedMessageForTranslation(null)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Communication Panel */}
        <AnimatePresence>
          {showCommunicationPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200"
            >
              <PortugueseCommunicationPanel
                onSelectExpression={handleSelectExpression}
                preferredCountry="Portugal"
                preferredFormality="casual"
                showEmojiPacks={true}
                showGreetings={true}
                showExpressions={true}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Safety Notice */}
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center space-x-2 text-sm text-blue-700">
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

          {/* Input Controls Row */}
          <div className="flex items-center space-x-2 mb-3">
            <button
              onClick={() => setShowCommunicationPanel(!showCommunicationPanel)}
              className={`p-2 rounded-lg transition-colors ${
                showCommunicationPanel 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-5 h-5" />
            </button>

            {voiceMessagesEnabled && (
              <button
                onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                className={`p-2 rounded-lg transition-colors ${
                  showVoiceRecorder 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {showVoiceRecorder ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => {
                setShowTranslator(!showTranslator)
                setSelectedMessageForTranslation(newMessage)
              }}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-lg transition-colors ${
                showTranslator 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              <Languages className="w-5 h-5" />
            </button>

            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Smile className="w-5 h-5" />
            </button>

            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>
          
          {/* Message Input */}
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.typeMessage}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={sending}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ backgroundColor: PORTUGUESE_COLORS.primary }}
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </MessageAuthorizationGate>
    </div>
  )
}