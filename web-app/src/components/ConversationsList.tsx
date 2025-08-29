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
  selectedConversationId?: string
  className?: string
}

// Mock data for demonstration - in real app, this would come from props or API
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    participantName: 'Maria Santos',
    participantAvatar: '/images/profiles/maria.jpg',
    lastMessage: 'Looking forward to the Portuguese cultural event this weekend!',
    lastMessagePt: 'Ansiosa pelo evento cultural português este fim de semana!',
    timestamp: '2 min ago',
    unreadCount: 3,
    isOnline: true,
    heritage: 'Portuguese',
    location: 'London',
    messageType: 'event'
  },
  {
    id: '2',
    participantName: 'João Pereira',
    participantAvatar: '/images/profiles/joao.jpg',
    lastMessage: 'Thank you for the business directory recommendation',
    lastMessagePt: 'Obrigado pela recomendação do diretório empresarial',
    timestamp: '1 hour ago',
    unreadCount: 1,
    isOnline: true,
    heritage: 'Brazilian',
    location: 'Manchester',
    messageType: 'business'
  },
  {
    id: '3',
    participantName: 'Ana Rodrigues',
    participantAvatar: '/images/profiles/ana.jpg',
    lastMessage: 'Would love to connect about university experiences',
    lastMessagePt: 'Gostaria de conversar sobre experiências universitárias',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isOnline: false,
    heritage: 'Cape Verdean',
    location: 'Birmingham',
    messageType: 'text'
  },
  {
    id: '4',
    participantName: 'Carlos Silva',
    participantAvatar: '/images/profiles/carlos.jpg',
    lastMessage: 'Shared some photos from the Portuguese festival',
    lastMessagePt: 'Partilhei algumas fotos do festival português',
    timestamp: '1 day ago',
    unreadCount: 0,
    isOnline: false,
    heritage: 'Portuguese',
    location: 'Edinburgh',
    messageType: 'image'
  },
  {
    id: '5',
    participantName: 'Lucia Fernandes',
    participantAvatar: '/images/profiles/lucia.jpg',
    lastMessage: 'Great meeting you at the networking event!',
    lastMessagePt: 'Foi ótimo conhecê-la no evento de networking!',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: true,
    heritage: 'Angolan',
    location: 'Liverpool',
    messageType: 'text'
  },
  {
    id: '6',
    participantName: 'Ricardo Costa',
    participantAvatar: '/images/profiles/ricardo.jpg',
    lastMessage: 'Looking for Portuguese tutoring opportunities',
    lastMessagePt: 'À procura de oportunidades de tutoria de português',
    timestamp: '1 week ago',
    unreadCount: 0,
    isOnline: false,
    heritage: 'Brazilian',
    location: 'Oxford',
    messageType: 'text'
  }
]

export default function ConversationsList({
  conversations = MOCK_CONVERSATIONS,
  onConversationSelect,
  selectedConversationId,
  className = ''
}: ConversationsListProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'online'>('all')

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return '📷'
      case 'event': return '📅'
      case 'business': return '💼'
      default: return '💬'
    }
  }

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

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.participantName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      (language === 'pt' ? conversation.lastMessagePt : conversation.lastMessage)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    const matchesFilter = filterType === 'all' ||
      (filterType === 'unread' && conversation.unreadCount > 0) ||
      (filterType === 'online' && conversation.isOnline)

    return matchesSearch && matchesFilter
  })

  const formatTimestamp = (timestamp: string) => {
    if (language === 'pt') {
      return timestamp
        .replace('min ago', 'min atrás')
        .replace('hour ago', 'hora atrás')
        .replace('hours ago', 'horas atrás')
        .replace('day ago', 'dia atrás')
        .replace('days ago', 'dias atrás')
        .replace('week ago', 'semana atrás')
        .replace('weeks ago', 'semanas atrás')
    }
    return timestamp
  }

  return (
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-4" style={{ color: brandColors.primary }}>
          {language === 'pt' ? 'Conversas' : 'Conversations'}
        </h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={language === 'pt' ? 'Procurar conversas...' : 'Search conversations...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-20"
            style={{ focusRing: `${brandColors.primary}33` }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: language === 'pt' ? 'Todas' : 'All' },
            { key: 'unread', label: language === 'pt' ? 'Não lidas' : 'Unread' },
            { key: 'online', label: language === 'pt' ? 'Online' : 'Online' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterType(key as typeof filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterType === key
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: filterType === key ? brandColors.primary : undefined
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg">
              {language === 'pt' 
                ? 'Nenhuma conversa encontrada' 
                : 'No conversations found'
              }
            </p>
            <p className="text-sm mt-2">
              {language === 'pt'
                ? 'Comece a conectar-se com outros membros da comunidade lusófona'
                : 'Start connecting with other Portuguese-speaking community members'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`w-full p-4 text-left rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  selectedConversationId === conversation.id
                    ? 'ring-2 ring-opacity-20'
                    : ''
                }`}
                style={{
                  backgroundColor: selectedConversationId === conversation.id ? `${brandColors.primary}10` : undefined,
                  ringColor: selectedConversationId === conversation.id ? `${brandColors.primary}33` : undefined
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <span className="text-lg font-medium text-gray-600">
                        {conversation.participantName.charAt(0)}
                      </span>
                    </div>
                    {/* Online indicator */}
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {/* Heritage flag */}
                    <div className="absolute -top-1 -left-1 text-sm">
                      {getHeritageFlag(conversation.heritage)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {conversation.participantName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(conversation.timestamp)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <div
                            className="px-2 py-1 text-xs text-white rounded-full min-w-[20px] text-center"
                            style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
                          >
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {getMessageTypeIcon(conversation.messageType)}
                      </span>
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {language === 'pt' ? conversation.lastMessagePt : conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {language === 'pt' 
              ? `${filteredConversations.length} conversas`
              : `${filteredConversations.length} conversations`
            }
          </span>
          <span>
            {language === 'pt' 
              ? `${conversations.filter(c => c.unreadCount > 0).length} não lidas`
              : `${conversations.filter(c => c.unreadCount > 0).length} unread`
            }
          </span>
        </div>
      </div>
    </div>
  )
}