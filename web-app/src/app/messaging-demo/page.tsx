'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import MatchConversations from '@/components/MatchConversations'
import MessageModerationDashboard from '@/components/MessageModerationDashboard'
import { Shield, MessageSquare, Users, Settings } from 'lucide-react'

// Mock data for demonstration
const mockMatches = [
  {
    id: 'match-1',
    userId: 'current-user',
    matchedUserId: 'user-1',
    matchedUser: {
      id: 'user-1',
      firstName: 'Maria',
      lastName: 'Santos',
      profilePictureUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'Vauxhall, London',
      membershipTier: 'premium' as const,
      isVerified: true
    },
    compatibilityScore: 85,
    sharedInterests: ['fado', 'portuguese_cuisine', 'cultural_events'],
    isLiked: true,
    isMatched: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'match-2',
    userId: 'current-user',
    matchedUserId: 'user-2',
    matchedUser: {
      id: 'user-2',
      firstName: 'João',
      lastName: 'Silva',
      profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Camden, London',
      membershipTier: 'core' as const,
      isVerified: false
    },
    compatibilityScore: 92,
    sharedInterests: ['football', 'portuguese_history', 'professional_networking'],
    isLiked: true,
    isMatched: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'match-3',
    userId: 'current-user',
    matchedUserId: 'user-3',
    matchedUser: {
      id: 'user-3',
      firstName: 'Ana',
      lastName: 'Costa',
      profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Clapham, London',
      membershipTier: 'student' as const,
      isVerified: true
    },
    compatibilityScore: 78,
    sharedInterests: ['portuguese_language', 'traditional_music', 'community_events'],
    isLiked: true,
    isMatched: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
]

export default function MessagingDemoPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'conversations' | 'moderation'>('conversations')
  const [isAdmin, setIsAdmin] = useState(false)

  const translations = {
    en: {
      title: 'TikTok-Style Messaging System Demo',
      subtitle: 'Complete Portuguese community messaging platform with safety features',
      tabs: {
        conversations: 'Conversations',
        moderation: 'Moderation Dashboard'
      },
      features: {
        title: 'Key Features Implemented',
        items: [
          'Age verification required before messaging',
          'AI content filtering for phone numbers, emails, addresses',
          'Message approval system for new users',
          '7-day conversation expiry without event booking',
          '48-hour response time tracking',
          'Portuguese cultural conversation starters',
          'Real-time safety scoring and blocking',
          'Comprehensive moderation dashboard',
          'Community Ambassador achievement system',
          'Event-based conversation extensions'
        ]
      },
      adminMode: 'Admin Mode (View Moderation Dashboard)',
      userMode: 'User Mode (Regular Conversations)',
      demo: {
        title: 'Demo Instructions',
        instructions: [
          '1. Try sending a message with contact info (phone, email, social media)',
          '2. Messages will be flagged and require approval',
          '3. Use conversation starters for cultural ice-breakers',
          '4. Notice conversation expiry warnings',
          '5. Switch to Admin Mode to see moderation features'
        ]
      }
    },
    pt: {
      title: 'Demo do Sistema de Mensagens Estilo TikTok',
      subtitle: 'Plataforma completa de mensagens da comunidade portuguesa com funcionalidades de segurança',
      tabs: {
        conversations: 'Conversas',
        moderation: 'Painel de Moderação'
      },
      features: {
        title: 'Funcionalidades Principais Implementadas',
        items: [
          'Verificação de idade obrigatória antes das mensagens',
          'Filtragem de conteúdo IA para números, emails, moradas',
          'Sistema de aprovação de mensagens para novos utilizadores',
          'Expiração de conversas em 7 dias sem reserva de evento',
          'Seguimento de tempo de resposta de 48 horas',
          'Iniciadores de conversa culturais portugueses',
          'Pontuação de segurança em tempo real e bloqueio',
          'Painel de moderação abrangente',
          'Sistema de conquistas Embaixador da Comunidade',
          'Extensões de conversas baseadas em eventos'
        ]
      },
      adminMode: 'Modo Admin (Ver Painel de Moderação)',
      userMode: 'Modo Utilizador (Conversas Normais)',
      demo: {
        title: 'Instruções de Demonstração',
        instructions: [
          '1. Tente enviar uma mensagem com informações de contacto (telefone, email, redes sociais)',
          '2. As mensagens serão sinalizadas e requerem aprovação',
          '3. Use iniciadores de conversa para quebrar o gelo cultural',
          '4. Note os avisos de expiração de conversas',
          '5. Mude para Modo Admin para ver funcionalidades de moderação'
        ]
      }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-neutral-600 mb-6">
            {t.subtitle}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isAdmin 
                  ? 'bg-red-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}
            >
              {isAdmin ? <Settings className="h-4 w-4" /> : <Users className="h-4 w-4" />}
              {isAdmin ? t.adminMode : t.userMode}
            </button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary-600" />
            {t.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.features.items.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <p className="text-neutral-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            {t.demo.title}
          </h3>
          <div className="space-y-2">
            {t.demo.instructions.map((instruction, index) => (
              <p key={index} className="text-amber-800">
                {instruction}
              </p>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('conversations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'conversations'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              {t.tabs.conversations}
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('moderation')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'moderation'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Shield className="h-4 w-4" />
                {t.tabs.moderation}
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'conversations' ? (
          <MatchConversations mutualMatches={mockMatches} />
        ) : (
          <MessageModerationDashboard />
        )}
      </div>
    </div>
  )
}