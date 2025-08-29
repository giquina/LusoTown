'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand'

interface Conversation {
  id: string
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessagePt: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  heritage: string
  location: string
  messageType: 'text' | 'image' | 'event' | 'business'
}

interface ConversationsListProps {
  conversations?: Conversation[]
  onConversationSelect: (conversationId: string) => void
  className?: string
  showFilters?: boolean
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participantName: 'Maria Santos',
    participantAvatar: '/images/profiles/maria.jpg',
    lastMessage: 'Looking forward to the Portuguese cultural event this weekend!',
    lastMessagePt: 'Ansiosa pelo evento cultural português este fim de semana!',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    heritage: 'Portuguese',
    location: 'London, UK',
    messageType: 'event'
  },
  {
    id: '2',
    participantName: 'João Ferreira',
    participantAvatar: '/images/profiles/joao.jpg',
    lastMessage: 'Thank you for the business networking introduction',
    lastMessagePt: 'Obrigado pela apresentação para networking empresarial',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: true,
    heritage: 'Brazilian',
    location: 'Manchester, UK',
    messageType: 'business'
  },
  {
    id: '3',
    participantName: 'Ana Rodrigues',
    participantAvatar: '/images/profiles/ana.jpg',
    lastMessage: 'The photos from the Cape Verdean music festival were amazing!',
    lastMessagePt: 'As fotos do festival de música cabo-verdiana estavam incríveis!',
    timestamp: '3h ago',
    unreadCount: 1,
    isOnline: false,
    heritage: 'Cape Verdean',
    location: 'Birmingham, UK',
    messageType: 'image'
  },
  {
    id: '4',
    participantName: 'Pedro Silva',
    participantAvatar: '/images/profiles/pedro.jpg',
    lastMessage: 'Great connecting with fellow Portuguese speakers in tech',
    lastMessagePt: 'Ótimo conectar com outros lusófonos da área tech',
    timestamp: '1d ago',
    unreadCount: 0,
    isOnline: false,
    heritage: 'Portuguese',
    location: 'Edinburgh, UK',
    messageType: 'text'
  },
  {
    id: '5',
    participantName: 'Luísa Costa',
    participantAvatar: '/images/profiles/luisa.jpg',
    lastMessage: 'Would love to collaborate on Angolan heritage preservation project',
    lastMessagePt: 'Adoraria colaborar no projeto de preservação do património angolano',
    timestamp: '2d ago',
    unreadCount: 3,
    isOnline: true,
    heritage: 'Angolan',
    location: 'Liverpool, UK',
    messageType: 'text'
  }
]

export default function ConversationsList({
  conversations = MOCK_CONVERSATIONS,
  onConversationSelect,
  className = '',
  showFilters = true
}: ConversationsListProps) {
  const { language } = useLanguage()
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getHeritageFlag = (heritage: string) => {
    const flags = {
      'Portuguese': '🇵🇹',
      'Brazilian': '🇧🇷',
      'Cape Verdean': '🇨🇻',
      'Angolan': '🇦🇴',
      'Mozambican': '🇲🇿',
      'Guinea-Bissau': '🇬🇼',
      'São Tomé': '🇸🇹',
      'East Timorese': '🇹🇱'
    }
    return flags[heritage as keyof typeof flags] || '🇵🇹'
  }

  const getMessageTypeIcon = (type: string) => {
    const icons = {
      'text': '💬',
      'image': '📸',
      'event': '📅',
      'business': '💼'
    }
    return icons[type as keyof typeof icons] || '💬'
  }

  const filterTypes = [
    { id: 'all', label: language === 'pt' ? 'Todas' : 'All' },
    { id: 'unread', label: language === 'pt' ? 'Não Lidas' : 'Unread' },
    { id: 'online', label: language === 'pt' ? 'Online' : 'Online' },
    { id: 'business', label: language === 'pt' ? 'Negócios' : 'Business' },
    { id: 'event', label: language === 'pt' ? 'Eventos' : 'Events' }
  ]

  const filteredConversations = conversations
    .filter(conv => {
      if (filterType === 'unread') return conv.unreadCount > 0
      if (filterType === 'online') return conv.isOnline
      if (filterType === 'business') return conv.messageType === 'business'
      if (filterType === 'event') return conv.messageType === 'event'
      return true
    })
    .filter(conv => {
      if (!searchQuery) return true
      return conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
             conv.lastMessagePt.toLowerCase().includes(searchQuery.toLowerCase())
    })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  const onlineCount = conversations.filter(conv => conv.isOnline).length

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Conversas' : 'Conversations'}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {totalUnread > 0 && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {totalUnread} {language === 'pt' ? 'não lidas' : 'unread'}
              </span>
            )}
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {onlineCount} {language === 'pt' ? 'online' : 'online'}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={language === 'pt' ? 'Procurar conversas...' : 'Search conversations...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* Filter Tabs */}
        {showFilters && (
          <div className="flex items-center gap-2 overflow-x-auto">
            {filterTypes.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  filterType === filter.id
                    ? 'text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: filterType === filter.id ? brandColors.primary : undefined
                }}
              >
                {filter.label}
                {filter.id === 'unread' && totalUnread > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {totalUnread}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversations List */}
      <div className="max-h-[600px] overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg font-medium mb-2">
              {language === 'pt' ? 'Nenhuma conversa encontrada' : 'No conversations found'}
            </p>
            <p className="text-sm">
              {language === 'pt' 
                ? 'Tente ajustar os filtros ou iniciar uma nova conversa'
                : 'Try adjusting filters or start a new conversation'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-lg font-semibold text-gray-600">
                        {conversation.participantName.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Heritage Flag */}
                    <div className="absolute -bottom-1 -right-1 text-sm">
                      {getHeritageFlag(conversation.heritage)}
                    </div>

                    {/* Online Status */}
                    {conversation.isOnline && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.participantName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {getMessageTypeIcon(conversation.messageType)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {conversation.timestamp}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <span 
                            className="px-2 py-1 text-xs text-white rounded-full min-w-[20px] text-center"
                            style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
                          >
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <span>📍</span>
                      <span>{conversation.location}</span>
                    </div>

                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {language === 'pt' ? conversation.lastMessagePt : conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {filteredConversations.length} {language === 'pt' ? 'conversas' : 'conversations'}
          </span>
          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
            >
              {language === 'pt' ? 'Marcar Todas Lidas' : 'Mark All Read'}
            </button>
            <button 
              className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200"
              style={{ backgroundColor: brandColors.primary }}
            >
              {language === 'pt' ? 'Nova Conversa' : 'New Conversation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}