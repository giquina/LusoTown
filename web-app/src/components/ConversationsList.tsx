'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService } from '@/services/messagingService'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Heart, 
  Calendar, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Sparkles,
  Users
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { pt, enUS } from 'date-fns/locale'

interface ConversationsListProps {
  onConversationSelect: (conversation: any) => void
  selectedConversationId?: string
  className?: string
}

export default function ConversationsList({
  onConversationSelect,
  selectedConversationId,
  className = ''
}: ConversationsListProps) {
  const { language } = useLanguage()
  const [conversations, setConversations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'matches' | 'events'>('all')

  const translations = {
    en: {
      conversations: 'Conversations',
      search: 'Search conversations...',
      noConversations: 'No conversations yet',
      startMatching: 'Start matching with Portuguese speakers to begin conversations',
      noResults: 'No conversations found',
      tryDifferentSearch: 'Try a different search term',
      filters: {
        all: 'All',
        matches: 'Matches',
        events: 'Events'
      },
      connectionTypes: {
        mutual_match: 'Mutual match',
        event_based: 'Met at event',
        professional: 'Professional'
      },
      lastMessage: 'Last message',
      unreadMessages: (count: number) => `${count} unread`,
      today: 'Today',
      yesterday: 'Yesterday',
      online: 'Online',
      typing: 'Typing...',
      messagePreview: {
        text: (content: string) => content,
        image: 'Image',
        voice: 'Voice message',
        system: 'System message'
      }
    },
    pt: {
      conversations: 'Conversas',
      search: 'Procurar conversas...',
      noConversations: 'Ainda não há conversas',
      startMatching: 'Comece a fazer match com falantes de português para iniciar conversas',
      noResults: 'Nenhuma conversa encontrada',
      tryDifferentSearch: 'Tente um termo de pesquisa diferente',
      filters: {
        all: 'Todas',
        matches: 'Matches',
        events: 'Eventos'
      },
      connectionTypes: {
        mutual_match: 'Match mútuo',
        event_based: 'Conheceram-se em evento',
        professional: 'Profissional'
      },
      lastMessage: 'Última mensagem',
      unreadMessages: (count: number) => `${count} não lida${count === 1 ? '' : 's'}`,
      today: 'Hoje',
      yesterday: 'Ontem',
      online: 'Online',
      typing: 'A escrever...',
      messagePreview: {
        text: (content: string) => content,
        image: 'Imagem',
        voice: 'Mensagem de voz',
        system: 'Mensagem do sistema'
      }
    }
  }

  const t = translations[language]
  const dateLocale = language === 'pt' ? pt : enUS

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setLoading(true)
      const convs = await messagingService.getUserConversations()
      setConversations(convs)
    } catch (err) {
      console.error('Error loading conversations:', err)
      setError(err instanceof Error ? err.message : 'Failed to load conversations')
    } finally {
      setLoading(false)
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
      return t.yesterday
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: dateLocale })
    }
  }

  const getConnectionIcon = (connectionType: string) => {
    switch (connectionType) {
      case 'mutual_match':
        return <Heart className="w-4 h-4 text-coral-500" />
      case 'event_based':
        return <Calendar className="w-4 h-4 text-primary-500" />
      case 'professional':
        return <Users className="w-4 h-4 text-accent-500" />
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getMessagePreview = (message: any) => {
    if (!message) return ''
    
    switch (message.message_type) {
      case 'image':
        return t.messagePreview.image
      case 'voice':
        return t.messagePreview.voice
      case 'system':
        return t.messagePreview.system
      default:
        return message.content.length > 50 
          ? `${message.content.substring(0, 50)}...`
          : message.content
    }
  }

  const filteredConversations = conversations.filter(conv => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      conv.other_participant?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.other_participant?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.content?.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply connection type filter
    const matchesFilter = filter === 'all' || 
      (filter === 'matches' && conv.connection_type === 'mutual_match') ||
      (filter === 'events' && conv.connection_type === 'event_based')

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className={`${className} p-4`}>
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-secondary-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-secondary-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t.conversations}</h2>
          <button className="p-2 hover:bg-secondary-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-secondary-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -transecondary-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          {Object.entries(t.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key as 'all' | 'matches' | 'events')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {error ? (
          <div className="p-4 text-center text-coral-600">
            {error}
            <button
              onClick={loadConversations}
              className="block mx-auto mt-2 px-4 py-2 bg-coral-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? t.noResults : t.noConversations}
            </h3>
            <p className="text-secondary-600">
              {searchQuery ? t.tryDifferentSearch : t.startMatching}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredConversations.map((conversation, index) => {
              const participant = conversation.other_participant
              const isSelected = selectedConversationId === conversation.id
              
              return (
                <motion.button
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onConversationSelect(conversation)}
                  className={`w-full p-4 border-b border-secondary-100 hover:bg-secondary-50 transition-colors text-left ${
                    isSelected ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Profile Picture */}
                    <div className="relative">
                      <img
                        src={participant?.profile_picture_url || '/images/default-avatar.png'}
                        alt={participant?.first_name || 'User'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {conversation.unread_count > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {conversation.unread_count > 99 ? '99+' : conversation.unread_count}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 truncate">
                            {participant?.first_name} {participant?.last_name}
                          </h3>
                          {getConnectionIcon(conversation.connection_type)}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          {conversation.last_message && (
                            <span>{formatMessageTime(conversation.last_message.created_at)}</span>
                          )}
                          {conversation.last_message?.approval_status === 'pending' && (
                            <Clock className="w-3 h-3 text-accent-500" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${
                          conversation.unread_count > 0 ? 'font-medium text-gray-900' : 'text-secondary-600'
                        }`}>
                          {conversation.last_message 
                            ? getMessagePreview(conversation.last_message)
                            : t.connectionTypes[conversation.connection_type]
                          }
                        </p>
                        
                        {conversation.unread_count > 0 && (
                          <span className="text-xs text-primary-600 font-medium">
                            {t.unreadMessages(conversation.unread_count)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}