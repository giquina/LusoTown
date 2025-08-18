'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Image, 
  Paperclip, 
  MoreVertical, 
  Search,
  Phone,
  Video,
  Info,
  Archive,
  Flag,
  Check,
  CheckCheck,
  Clock,
  Heart,
  Shield,
  AlertTriangle,
  Zap,
  Ban,
  Eye,
  Calendar
} from 'lucide-react'
import AgeVerificationModal from './AgeVerificationModal'
import ConversationManager from './ConversationManager'

interface UserProfile {
  id: string
  firstName: string
  lastName?: string
  profilePictureUrl?: string
  location?: string
  membershipTier: 'free' | 'core' | 'premium' | 'business' | 'student'
  isVerified?: boolean
}

interface PremiumMatch {
  id: string
  userId: string
  matchedUserId: string
  matchedUser: UserProfile
  compatibilityScore: number
  sharedInterests: string[]
  isLiked: boolean
  isMatched: boolean
  createdAt: string
}

interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  messageType: 'text' | 'photo' | 'voice' | 'system'
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'auto_approved'
  isRead: boolean
  isReported: boolean
  isBlocked: boolean
  blockedReason?: string
  safetyScore: number
  containsContactInfo: boolean
  flaggedContent: any
  responseDeadline?: string
  createdAt: string
  editedAt?: string
}

interface Conversation {
  id: string
  participantIds: string[]
  participants: UserProfile[]
  lastMessage?: Message
  unreadCount: number
  isActive: boolean
  expiresAt?: string
  lastActivityAt: string
  connectionType: 'mutual_match' | 'event_based' | 'professional'
  safetyStatus: 'safe' | 'flagged' | 'blocked'
  createdAt: string
  updatedAt: string
}

interface ConversationStarter {
  id: string
  category: string
  promptEn: string
  promptPt: string
  culturalContext: string
  usageCount: number
}

interface MatchConversationsProps {
  mutualMatches: PremiumMatch[]
}

export default function MatchConversations({ mutualMatches }: MatchConversationsProps) {
  const { language } = useLanguage()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAgeVerification, setShowAgeVerification] = useState(false)
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [pendingMessages, setPendingMessages] = useState<Message[]>([])
  const [messageCount, setMessageCount] = useState(0)

  useEffect(() => {
    checkAgeVerification()
    loadConversations()
  }, [mutualMatches])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation)
    }
  }, [selectedConversation])

  const checkAgeVerification = () => {
    // Mock age verification check
    const hasVerification = localStorage.getItem('age_verified')
    setIsAgeVerified(!!hasVerification)
  }

  const loadConversations = async () => {
    setLoading(true)
    try {
      // Mock conversations from mutual matches
      const mockConversations: Conversation[] = mutualMatches.map((match, index) => ({
        id: `conv-${match.id}`,
        participantIds: [match.userId, match.matchedUserId],
        participants: [match.matchedUser],
        lastMessage: generateMockMessage(`conv-${match.id}`, match.matchedUserId, 'current-user', index),
        unreadCount: Math.floor(Math.random() * 3),
        isActive: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        lastActivityAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        connectionType: 'mutual_match',
        safetyStatus: 'safe',
        createdAt: match.createdAt,
        updatedAt: new Date().toISOString()
      }))
      
      setConversations(mockConversations)
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockMessage = (conversationId: string, senderId: string, receiverId: string, index: number): Message => {
    const messageOptions = [
      'Olá! Vi que partilhamos interesse em eventos culturais portugueses.',
      'Hi! I noticed we both love Portuguese cuisine. Any restaurant recommendations?',
      'Que bom encontrar outro português em Londres! Como está a adaptar-se?',
      'I see you work in finance too. Would love to connect professionally.',
      'Adoro fado também! Conhece algum bom local para ouvir em Londres?'
    ]

    return {
      id: `msg-${conversationId}-${index}`,
      conversationId,
      senderId,
      receiverId,
      content: messageOptions[index % messageOptions.length],
      messageType: 'text',
      approvalStatus: 'approved',
      isRead: Math.random() > 0.3,
      isReported: false,
      isBlocked: false,
      safetyScore: 95,
      containsContactInfo: false,
      flaggedContent: {},
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      const mockMessages = generateMockMessages(conversationId)
      setMessages(mockMessages)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const generateMockMessages = (conversationId: string): Message[] => {
    const conversation = conversations.find(c => c.id === conversationId)
    if (!conversation) return []

    const messageCount = 5 + Math.floor(Math.random() * 10)
    const mockMessages: Message[] = []

    for (let i = 0; i < messageCount; i++) {
      const isFromOther = i % 3 !== 0 // Vary who's sending
      const messageContent = getRandomMessage(isFromOther, i)
      const needsApproval = messageContent.includes('@') || messageContent.includes('phone') || messageContent.includes('WhatsApp')
      
      mockMessages.push({
        id: `msg-${conversationId}-${i}`,
        conversationId,
        senderId: isFromOther ? conversation.participants[0].id : 'current-user',
        receiverId: isFromOther ? 'current-user' : conversation.participants[0].id,
        content: messageContent,
        messageType: 'text',
        approvalStatus: needsApproval ? 'pending' : 'approved',
        isRead: !isFromOther || Math.random() > 0.2,
        isReported: false,
        isBlocked: needsApproval,
        safetyScore: needsApproval ? 45 : 95,
        containsContactInfo: needsApproval,
        flaggedContent: needsApproval ? { flags: ['contact_info'] } : {},
        responseDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - (messageCount - i) * 60 * 60 * 1000).toISOString()
      })
    }

    return mockMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }

  const getRandomMessage = (isFromOther: boolean, index: number): string => {
    const otherMessages = [
      'Olá! Como está?',
      'Vi que também gosta de eventos culturais portugueses',
      'Tem alguma recomendação de restaurantes portugueses em Londres?',
      'Que coincidência trabalharmos na mesma área!',
      'Adorava conhecer mais sobre a sua experiência em Londres',
      'Há algum evento interessante esta semana?',
      'My WhatsApp is +44 7911 123456 if you want to chat', // This will be flagged
      'Can we meet at my place? 123 Oxford Street', // This will be flagged
      'Follow me on Instagram @user123' // This will be flagged
    ]

    const myMessages = [
      'Olá! Tudo bem, obrigado(a)!',
      'Sim, adoro! Especialmente noites de fado',
      'Recomendo muito o Nando\'s... brincadeira! 😄 O Casa do Bacalhau é excelente',
      'Sim! Seria ótimo trocar experiências profissionais',
      'Estou aqui há 3 anos, já me sinto em casa',
      'Vou verificar o calendário do LusoTown!',
      'Adorava conhecer-te melhor',
      'Que tipos de eventos prefere?'
    ]

    return isFromOther ? otherMessages[index % otherMessages.length] : myMessages[index % myMessages.length]
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !isAgeVerified) {
      if (!isAgeVerified) {
        setShowAgeVerification(true)
        return
      }
      return
    }

    // AI Content filtering simulation
    const containsContactInfo = /\+?[0-9\s\-\(\)]{10,}|@[a-zA-Z0-9_]+|instagram|whatsapp|snapchat|telegram/i.test(newMessage)
    const containsProfanity = /fuck|shit|damn|bitch/i.test(newMessage)
    const safetyScore = containsContactInfo ? 45 : containsProfanity ? 60 : 95
    const needsApproval = safetyScore < 70 || messageCount < 10

    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation,
      senderId: 'current-user',
      receiverId: conversations.find(c => c.id === selectedConversation)?.participants[0].id || '',
      content: newMessage.trim(),
      messageType: 'text',
      approvalStatus: needsApproval ? 'pending' : 'auto_approved',
      isRead: false,
      isReported: false,
      isBlocked: needsApproval,
      safetyScore,
      containsContactInfo,
      flaggedContent: containsContactInfo ? { flags: ['contact_info'] } : {},
      responseDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    }

    if (needsApproval) {
      setPendingMessages(prev => [...prev, message])
      alert(language === 'pt' ? 'Sua mensagem está sendo revisada.' : 'Your message is being reviewed.')
    } else {
      setMessages(prev => [...prev, message])
      setMessageCount(prev => prev + 1)
    }

    setNewMessage('')

    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: message, updatedAt: new Date().toISOString() }
        : conv
    ))
  }

  const handleConversationStarter = (starter: ConversationStarter) => {
    const prompt = language === 'pt' ? starter.promptPt : starter.promptEn
    setNewMessage(prompt)
  }

  const handleBookEvent = () => {
    // Navigate to events page
    window.location.href = '/events'
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participants[0].firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants[0].lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  const translations = {
    en: {
      title: 'Conversations',
      search: 'Search conversations...',
      noConversations: 'No conversations yet',
      startMatching: 'Start matching to begin conversations',
      typeMessage: 'Type a message...',
      send: 'Send',
      online: 'Online',
      lastSeen: 'Last seen',
      compatibility: 'Compatibility',
      sharedInterests: 'Shared interests',
      safetyTip: 'Keep conversations respectful and report any concerns',
      ageVerificationRequired: 'Age verification required to send messages',
      verifyAge: 'Verify Age',
      messageBlocked: 'Message blocked for review',
      messagePending: 'Message pending approval',
      messageOptions: {
        call: 'Voice call',
        video: 'Video call',
        info: 'Profile info',
        archive: 'Archive',
        report: 'Report'
      }
    },
    pt: {
      title: 'Conversas',
      search: 'Procurar conversas...',
      noConversations: 'Ainda não há conversas',
      startMatching: 'Comece a fazer matches para iniciar conversas',
      typeMessage: 'Escreva uma mensagem...',
      send: 'Enviar',
      online: 'Online',
      lastSeen: 'Visto pela última vez',
      compatibility: 'Compatibilidade',
      sharedInterests: 'Interesses partilhados',
      safetyTip: 'Mantenha as conversas respeitosas e reporte qualquer preocupação',
      ageVerificationRequired: 'Verificação de idade necessária para enviar mensagens',
      verifyAge: 'Verificar Idade',
      messageBlocked: 'Mensagem bloqueada para revisão',
      messagePending: 'Mensagem pendente aprovação',
      messageOptions: {
        call: 'Chamada de voz',
        video: 'Videochamada',
        info: 'Info do perfil',
        archive: 'Arquivar',
        report: 'Reportar'
      }
    }
  }

  const t = translations[language]

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = diff / (1000 * 60 * 60)
    
    if (hours < 1) return `${Math.floor(diff / (1000 * 60))}m`
    if (hours < 24) return `${Math.floor(hours)}h`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 h-[700px] flex flex-col">
        {/* Conversation Manager */}
        {selectedConv && (
          <ConversationManager
            conversationId={selectedConv.id}
            participantIds={selectedConv.participantIds}
            expiresAt={selectedConv.expiresAt}
            lastActivity={selectedConv.lastActivityAt}
            connectionType={selectedConv.connectionType}
            onSendStarter={handleConversationStarter}
            onBookEvent={handleBookEvent}
          />
        )}

        <div className="flex flex-1 min-h-0">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-neutral-200 flex flex-col">
            {/* Search Header */}
            <div className="p-4 border-b border-neutral-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                  <h3 className="font-medium text-neutral-900 mb-2">{t.noConversations}</h3>
                  <p className="text-sm text-neutral-600">{t.startMatching}</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conversation) => (
                    <motion.button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-lg hover:bg-neutral-50 transition-colors ${
                        selectedConversation === conversation.id ? 'bg-primary-50 border border-primary-200' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={conversation.participants[0].profilePictureUrl}
                            alt={conversation.participants[0].firstName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {conversation.participants[0].isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-secondary-500 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-neutral-900 truncate">
                              {conversation.participants[0].firstName} {conversation.participants[0].lastName}
                            </h4>
                            {conversation.lastMessage && (
                              <span className="text-xs text-neutral-500">
                                {formatTime(conversation.lastMessage.createdAt)}
                              </span>
                            )}
                          </div>
                          
                          {conversation.lastMessage && (
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-neutral-600 truncate flex items-center gap-1">
                                {conversation.lastMessage.isBlocked && (
                                  <Ban className="h-3 w-3 text-red-500" />
                                )}
                                {conversation.lastMessage.approvalStatus === 'pending' && (
                                  <Clock className="h-3 w-3 text-amber-500" />
                                )}
                                {conversation.lastMessage.content}
                              </p>
                              <div className="flex items-center gap-1">
                                {conversation.unreadCount > 0 && (
                                  <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                    {conversation.unreadCount}
                                  </span>
                                )}
                                {conversation.lastMessage.senderId === 'current-user' && (
                                  <div className="text-neutral-400">
                                    {conversation.lastMessage.isRead ? <CheckCheck className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedConv.participants[0].profilePictureUrl}
                        alt={selectedConv.participants[0].firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {selectedConv.participants[0].firstName} {selectedConv.participants[0].lastName}
                        </h3>
                        <p className="text-sm text-secondary-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {t.online}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                        <Info className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
                          message.senderId === 'current-user'
                            ? message.isBlocked ? 'bg-red-100 text-red-800' : 'bg-primary-600 text-white'
                            : message.isBlocked ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-900'
                        }`}>
                          {message.isBlocked && (
                            <div className="absolute -top-2 -right-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                          )}
                          {message.approvalStatus === 'pending' && (
                            <div className="absolute -top-2 -right-2">
                              <Clock className="h-4 w-4 text-amber-500" />
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          {message.containsContactInfo && (
                            <p className="text-xs mt-1 opacity-75">
                              {message.senderId === 'current-user' ? t.messageBlocked : t.messagePending}
                            </p>
                          )}
                          <div className={`flex items-center gap-1 mt-1 ${
                            message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className={`text-xs ${
                              message.senderId === 'current-user' ? 'text-primary-200' : 'text-neutral-500'
                            }`}>
                              {formatTime(message.createdAt)}
                            </span>
                            {message.senderId === 'current-user' && !message.isBlocked && (
                              <div className="text-primary-200">
                                {message.isRead ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Pending Messages */}
                  {pendingMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-amber-100 text-amber-800 relative">
                        <div className="absolute -top-2 -right-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-75">{t.messagePending}</p>
                        <div className="flex items-center gap-1 mt-1 justify-end">
                          <span className="text-xs text-amber-600">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                  {!isAgeVerified && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-amber-600" />
                          <p className="text-sm text-amber-800">{t.ageVerificationRequired}</p>
                        </div>
                        <button
                          onClick={() => setShowAgeVerification(true)}
                          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm"
                        >
                          {t.verifyAge}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100">
                      <Image className="h-5 w-5" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t.typeMessage}
                        disabled={!isAgeVerified}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-full focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || !isAgeVerified}
                      className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-neutral-500 mt-2 text-center">
                    {t.safetyTip}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-neutral-600">
                    Choose a conversation from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeVerification}
        onClose={() => setShowAgeVerification(false)}
        onVerified={(verified) => {
          setIsAgeVerified(verified)
          if (verified) {
            localStorage.setItem('age_verified', 'true')
          }
        }}
        userId="current-user"
      />
    </>
  )
}