'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService, ConversationMessage, Conversation } from '@/services/messagingService'
import MessageAuthorizationGate from './MessageAuthorizationGate'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Image, 
  Paperclip, 
  MoreVertical, 
  Clock,
  Check,
  CheckCheck,
  AlertTriangle,
  Flag,
  Ban,
  Shield,
  Heart,
  Calendar,
  Eye,
  EyeOff
} from 'lucide-react'

interface RestrictedMessagingInterfaceProps {
  targetUserId: string
  targetUser: {
    id: string
    firstName: string
    lastName?: string
    profilePictureUrl?: string
    location?: string
    isVerified?: boolean
  }
  onClose?: () => void
}

export default function RestrictedMessagingInterface({
  targetUserId,
  targetUser,
  onClose
}: RestrictedMessagingInterfaceProps) {
  const { language } = useLanguage()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportingMessageId, setReportingMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const translations = {
    en: {
      typeMessage: 'Type a message...',
      send: 'Send',
      messageDelivered: 'Delivered',
      messageRead: 'Read',
      messagePending: 'Pending approval',
      reportMessage: 'Report message',
      blockUser: 'Block user',
      inappropriateContent: 'Inappropriate content',
      spam: 'Spam',
      harassment: 'Harassment',
      fakeProfile: 'Fake profile',
      other: 'Other',
      reportSubmitted: 'Report submitted',
      userBlocked: 'User blocked',
      connectionType: {
        mutual_match: 'Mutual Match',
        event_based: 'Met at Event',
        professional: 'Professional Connection'
      },
      safetyReminder: 'Never share personal contact information in messages. Keep conversations on LusoTown for your safety.',
      messagingGuidelines: 'Portuguese Community Messaging Guidelines',
      guidelines: [
        'Be respectful and kind to fellow Portuguese speakers',
        'Keep conversations appropriate and community-friendly',
        'Report any inappropriate behavior immediately',
        'Meet in public places for first in-person meetings'
      ]
    },
    pt: {
      typeMessage: 'Escreva uma mensagem...',
      send: 'Enviar',
      messageDelivered: 'Entregue',
      messageRead: 'Lida',
      messagePending: 'Aguarda aprovação',
      reportMessage: 'Denunciar mensagem',
      blockUser: 'Bloquear utilizador',
      inappropriateContent: 'Conteúdo inapropriado',
      spam: 'Spam',
      harassment: 'Assédio',
      fakeProfile: 'Perfil falso',
      other: 'Outro',
      reportSubmitted: 'Denúncia enviada',
      userBlocked: 'Utilizador bloqueado',
      connectionType: {
        mutual_match: 'Match Mútuo',
        event_based: 'Conheceram-se num Evento',
        professional: 'Ligação Profissional'
      },
      safetyReminder: 'Nunca partilhe informações de contacto pessoais nas mensagens. Mantenha as conversas no LusoTown para sua segurança.',
      messagingGuidelines: 'Diretrizes de Mensagens da Comunidade Portuguesa',
      guidelines: [
        'Seja respeitoso e gentil com outros falantes de português',
        'Mantenha as conversas apropriadas e amigáveis à comunidade',
        'Denuncie qualquer comportamento inapropriado imediatamente',
        'Encontre-se em lugares públicos para primeiros encontros presenciais'
      ]
    }
  }

  const t = translations[language]

  useEffect(() => {
    if (hasPermission) {
      initializeConversation()
    }
  }, [hasPermission, targetUserId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeConversation = async () => {
    try {
      setLoading(true)
      const conv = await messagingService.getOrCreateConversation(targetUserId)
      setConversation(conv)
      
      const msgs = await messagingService.getConversationMessages(conv.id)
      setMessages(msgs)
      
      // Mark messages as read
      await messagingService.markMessagesAsRead(conv.id)
    } catch (error) {
      console.error('Error initializing conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation || loading) return

    try {
      setLoading(true)
      const message = await messagingService.sendMessage(
        conversation.id,
        targetUserId,
        newMessage.trim()
      )
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleReportMessage = async (messageId: string, reason: string) => {
    try {
      await messagingService.reportMessage(messageId, reason)
      setShowReportModal(false)
      setReportingMessageId(null)
      alert(t.reportSubmitted)
    } catch (error) {
      console.error('Error reporting message:', error)
    }
  }

  const handleBlockUser = async () => {
    if (confirm('Are you sure you want to block this user?')) {
      try {
        await messagingService.blockUser(targetUserId)
        alert(t.userBlocked)
        onClose?.()
      } catch (error) {
        console.error('Error blocking user:', error)
      }
    }
  }

  const getMessageStatusIcon = (message: ConversationMessage) => {
    if (message.approval_status === 'pending') {
      return <Clock className="h-3 w-3 text-yellow-500" />
    }
    if (message.is_read) {
      return <CheckCheck className="h-3 w-3 text-blue-500" />
    }
    return <Check className="h-3 w-3 text-gray-400" />
  }

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <MessageAuthorizationGate
      targetUserId={targetUserId}
      targetUserName={`${targetUser.firstName} ${targetUser.lastName || ''}`}
      targetUserImage={targetUser.profilePictureUrl}
      onPermissionGranted={() => setHasPermission(true)}
      onPermissionDenied={() => setHasPermission(false)}
    >
      <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {targetUser.profilePictureUrl && (
                <img
                  src={targetUser.profilePictureUrl}
                  alt={targetUser.firstName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-900">
                  {targetUser.firstName} {targetUser.lastName}
                  {targetUser.isVerified && (
                    <Shield className="inline-block ml-2 h-4 w-4 text-blue-500" />
                  )}
                </h3>
                {conversation && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {conversation.connection_type === 'mutual_match' && <Heart className="h-3 w-3" />}
                    {conversation.connection_type === 'event_based' && <Calendar className="h-3 w-3" />}
                    <span>{t.connectionType[conversation.connection_type]}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowReportModal(true)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title={t.reportMessage}
              >
                <Flag className="h-4 w-4" />
              </button>
              <button
                onClick={handleBlockUser}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title={t.blockUser}
              >
                <Ban className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Guidelines */}
        <div className="p-3 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start space-x-2">
            <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">{t.messagingGuidelines}</p>
              <p className="mt-1">{t.safetyReminder}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.sender_id === targetUserId ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender_id === targetUserId
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">
                      {formatMessageTime(message.created_at)}
                    </span>
                    {message.sender_id !== targetUserId && (
                      <div className="ml-2">
                        {getMessageStatusIcon(message)}
                      </div>
                    )}
                  </div>
                  
                  {message.approval_status === 'pending' && (
                    <div className="flex items-center space-x-1 mt-1 text-xs opacity-70">
                      <AlertTriangle className="h-3 w-3" />
                      <span>{t.messagePending}</span>
                    </div>
                  )}
                  
                  {message.contains_contact_info && (
                    <div className="mt-1 p-1 bg-yellow-100 rounded text-xs text-yellow-800">
                      Message flagged for review
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.typeMessage}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || loading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t.reportMessage}</h3>
            <div className="space-y-2">
              {[
                { key: 'inappropriateContent', label: t.inappropriateContent },
                { key: 'spam', label: t.spam },
                { key: 'harassment', label: t.harassment },
                { key: 'fakeProfile', label: t.fakeProfile },
                { key: 'other', label: t.other }
              ].map((reason) => (
                <button
                  key={reason.key}
                  onClick={() => reportingMessageId && handleReportMessage(reportingMessageId, reason.key)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {reason.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </MessageAuthorizationGate>
  )
}