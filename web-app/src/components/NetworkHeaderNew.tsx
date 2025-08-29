'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand'

interface NetworkStats {
  totalConnections: number
  activeChats: number
  eventsAttended: number
  businessConnections: number
  mentorshipConnections: number
  newMatches: number
}

interface NetworkHeaderProps {
  userProfile?: {
    name: string
    avatar: string
    heritage: string
    location: string
    memberSince: string
  }
  stats?: NetworkStats
  onNavigate: (section: string) => void
  activeSection: string
  className?: string
}

const defaultStats: NetworkStats = {
  totalConnections: 47,
  activeChats: 8,
  eventsAttended: 12,
  businessConnections: 15,
  mentorshipConnections: 3,
  newMatches: 5
}

const defaultProfile = {
  name: 'Portuguese Community Member',
  avatar: '/images/profiles/default.jpg',
  heritage: 'Portuguese',
  location: 'London, UK',
  memberSince: '2024'
}

export default function NetworkHeader({
  userProfile = defaultProfile,
  stats = defaultStats,
  onNavigate,
  activeSection,
  className = ''
}: NetworkHeaderProps) {
  const { language } = useLanguage()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

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

  const navigationSections = [
    { 
      id: 'connections', 
      label: language === 'pt' ? 'Conexões' : 'Connections',
      icon: '👥',
      count: stats.totalConnections
    },
    { 
      id: 'conversations', 
      label: language === 'pt' ? 'Conversas' : 'Conversations',
      icon: '💬',
      count: stats.activeChats
    },
    { 
      id: 'events', 
      label: language === 'pt' ? 'Eventos' : 'Events',
      icon: '📅',
      count: stats.eventsAttended
    },
    { 
      id: 'business', 
      label: language === 'pt' ? 'Negócios' : 'Business',
      icon: '💼',
      count: stats.businessConnections
    },
    { 
      id: 'mentorship', 
      label: language === 'pt' ? 'Mentoria' : 'Mentorship',
      icon: '🎓',
      count: stats.mentorshipConnections
    }
  ]

  const quickStats = [
    {
      label: language === 'pt' ? 'Total de Conexões' : 'Total Connections',
      value: stats.totalConnections,
      change: '+12',
      changeLabel: language === 'pt' ? 'este mês' : 'this month',
      positive: true
    },
    {
      label: language === 'pt' ? 'Conversas Ativas' : 'Active Chats',
      value: stats.activeChats,
      change: '+3',
      changeLabel: language === 'pt' ? 'hoje' : 'today',
      positive: true
    },
    {
      label: language === 'pt' ? 'Novas Sugestões' : 'New Matches',
      value: stats.newMatches,
      change: '5',
      changeLabel: language === 'pt' ? 'aguardam' : 'waiting',
      positive: true
    }
  ]

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      {/* Main Header */}
      <div className="px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold text-gray-600">
                  {userProfile.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 text-lg">
                {getHeritageFlag(userProfile.heritage)}
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {language === 'pt' ? 'Minha Rede' : 'My Network'}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span>👤</span>
                  {userProfile.name}
                </span>
                <span className="flex items-center gap-1">
                  <span>📍</span>
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <span>📅</span>
                  {language === 'pt' ? 'Membro desde' : 'Member since'} {userProfile.memberSince}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2 min-h-[44px]"
            >
              <span>🔍</span>
              <span className="hidden sm:inline">{language === 'pt' ? 'Procurar Pessoas' : 'Find People'}</span>
            </button>
            <button
              className="px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 min-h-[44px]"
              style={{ backgroundColor: brandColors.primary }}
            >
              <span>➕</span>
              <span className="hidden sm:inline">{language === 'pt' ? 'Nova Conexão' : 'New Connection'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold mb-1" style={{ color: brandColors.primary }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className={`text-xs flex items-center justify-center gap-1 ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.positive ? '↗️' : '↘️'}</span>
                {stat.change} {stat.changeLabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 md:px-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium text-sm whitespace-nowrap
                transition-all duration-200 border-b-2 min-h-[44px]
                ${activeSection === section.id
                  ? 'text-white bg-opacity-10 border-b-2'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                }
              `}
              style={{
                backgroundColor: activeSection === section.id ? `${brandColors.primary}20` : undefined,
                color: activeSection === section.id ? brandColors.primary : undefined,
                borderBottomColor: activeSection === section.id ? brandColors.primary : undefined
              }}
            >
              <span className="text-lg">{section.icon}</span>
              <span>{section.label}</span>
              {section.count > 0 && (
                <span
                  className={`
                    px-2 py-1 text-xs rounded-full min-w-[20px] text-center
                    ${activeSection === section.id 
                      ? 'bg-white text-gray-700' 
                      : 'text-white'
                    }
                  `}
                  style={{
                    backgroundColor: activeSection !== section.id ? PORTUGUESE_COLORS.red[500] : undefined
                  }}
                >
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Banner */}
      {stats.newMatches > 0 && (
        <div 
          className="mx-4 md:mx-6 mb-4 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ backgroundColor: `${PORTUGUESE_COLORS.green[500]}20` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-medium" style={{ color: PORTUGUESE_COLORS.green[700] }}>
                {language === 'pt' 
                  ? `${stats.newMatches} novas sugestões de conexão!`
                  : `${stats.newMatches} new connection suggestions!`
                }
              </p>
              <p className="text-sm text-gray-600">
                {language === 'pt'
                  ? 'Pessoas da comunidade lusófona que partilham os seus interesses'
                  : 'Portuguese-speaking community members who share your interests'
                }
              </p>
            </div>
          </div>
          <button 
            className="px-4 py-2 text-white rounded-lg hover:shadow-md transition-all duration-200 self-start md:self-center min-h-[44px]"
            style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
            onClick={() => onNavigate('matches')}
          >
            {language === 'pt' ? 'Ver Sugestões' : 'View Suggestions'}
          </button>
        </div>
      )}
    </div>
  )
}