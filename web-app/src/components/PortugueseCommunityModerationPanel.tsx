'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Flag, 
  Users, 
  MessageCircle, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Clock,
  TrendingUp,
  Globe,
  Heart,
  Calendar
} from 'lucide-react'

interface ModerationStats {
  total_conversations: number
  flagged_messages: number
  pending_reviews: number
  blocked_users: number
  mutual_matches: number
  event_based_connections: number
  safety_score_average: number
  portuguese_content_percentage: number
}

interface FlaggedContent {
  id: string
  content: string
  sender_name: string
  receiver_name: string
  flagged_reasons: string[]
  ai_analysis: any
  priority_level: 'low' | 'medium' | 'high' | 'urgent'
  created_at: string
  conversation_type: 'mutual_match' | 'event_based' | 'professional'
}

export default function PortugueseCommunityModerationPanel() {
  const { language } = useLanguage()
  const [stats, setStats] = useState<ModerationStats | null>(null)
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'moderation' | 'safety'>('overview')
  const [loading, setLoading] = useState(true)

  const translations = {
    en: {
      title: 'Portuguese Community Safety Dashboard',
      overview: 'Overview',
      moderation: 'Moderation Queue',
      safety: 'Safety Guidelines',
      
      stats: {
        totalConversations: 'Total Conversations',
        flaggedMessages: 'Flagged Messages',
        pendingReviews: 'Pending Reviews',
        blockedUsers: 'Blocked Users',
        mutualMatches: 'Mutual Matches',
        eventConnections: 'Event-Based Connections',
        averageSafety: 'Average Safety Score',
        portugueseContent: 'Portuguese Content'
      },
      
      priorities: {
        urgent: 'Urgent',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      
      connectionTypes: {
        mutual_match: 'Mutual Match',
        event_based: 'Event Connection',
        professional: 'Professional'
      },
      
      moderationActions: {
        approve: 'Approve',
        reject: 'Reject',
        edit: 'Edit',
        warn: 'Warn User',
        block: 'Block User'
      },
      
      safetyGuidelines: {
        title: 'Portuguese Community Safety Guidelines',
        guidelines: [
          'Respect Portuguese cultural values and traditions',
          'Use appropriate language in both Portuguese and English',
          'Report any inappropriate behavior immediately',
          'Keep personal information private until meeting in person',
          'Meet in public places for first meetings',
          'Respect consent and boundaries at all times',
          'Support fellow community members respectfully'
        ]
      },
      
      culturalModeration: {
        title: 'Cultural Sensitivity Guidelines',
        description: 'Our moderation considers Portuguese cultural context and language nuances',
        features: [
          'Portuguese language profanity detection',
          'Cultural reference understanding',
          'Regional dialect recognition (Brazil, Portugal, Africa)',
          'Context-aware moderation for cultural expressions'
        ]
      }
    },
    pt: {
      title: 'Painel de Segurança da Comunidade Portuguesa',
      overview: 'Visão Geral',
      moderation: 'Fila de Moderação',
      safety: 'Diretrizes de Segurança',
      
      stats: {
        totalConversations: 'Total de Conversas',
        flaggedMessages: 'Mensagens Sinalizadas',
        pendingReviews: 'Análises Pendentes',
        blockedUsers: 'Utilizadores Bloqueados',
        mutualMatches: 'Matches Mútuos',
        eventConnections: 'Conexões por Eventos',
        averageSafety: 'Pontuação Média de Segurança',
        portugueseContent: 'Conteúdo Português'
      },
      
      priorities: {
        urgent: 'Urgente',
        high: 'Alto',
        medium: 'Médio',
        low: 'Baixo'
      },
      
      connectionTypes: {
        mutual_match: 'Match Mútuo',
        event_based: 'Conexão por Evento',
        professional: 'Profissional'
      },
      
      moderationActions: {
        approve: 'Aprovar',
        reject: 'Rejeitar',
        edit: 'Editar',
        warn: 'Avisar Utilizador',
        block: 'Bloquear Utilizador'
      },
      
      safetyGuidelines: {
        title: 'Diretrizes de Segurança da Comunidade Portuguesa',
        guidelines: [
          'Respeite os valores e tradições culturais portugueses',
          'Use linguagem apropriada em português e inglês',
          'Denuncie qualquer comportamento inapropriado imediatamente',
          'Mantenha informações pessoais privadas até encontrar pessoalmente',
          'Encontre-se em locais públicos para primeiros encontros',
          'Respeite o consentimento e limites sempre',
          'Apoie outros membros da comunidade respeitosamente'
        ]
      },
      
      culturalModeration: {
        title: 'Diretrizes de Sensibilidade Cultural',
        description: 'Nossa moderação considera o contexto cultural português e nuances linguísticas',
        features: [
          'Detecção de profanidade em português',
          'Compreensão de referências culturais',
          'Reconhecimento de dialetos regionais (Brasil, Portugal, África)',
          'Moderação contextual para expressões culturais'
        ]
      }
    }
  }

  const t = translations[language]

  useEffect(() => {
    loadModerationData()
  }, [])

  const loadModerationData = async () => {
    try {
      setLoading(true)
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        total_conversations: 1247,
        flagged_messages: 23,
        pending_reviews: 8,
        blocked_users: 12,
        mutual_matches: 834,
        event_based_connections: 413,
        safety_score_average: 94,
        portuguese_content_percentage: 78
      })
      
      setFlaggedContent([
        {
          id: '1',
          content: 'Podemos nos encontrar no meu apartamento?',
          sender_name: 'João S.',
          receiver_name: 'Maria L.',
          flagged_reasons: ['personal_information', 'safety_concern'],
          ai_analysis: { safety_score: 65, concerns: ['private_meeting_suggestion'] },
          priority_level: 'medium',
          created_at: new Date().toISOString(),
          conversation_type: 'mutual_match'
        },
        {
          id: '2',
          content: 'Here is my phone number: +44 7700 900123',
          sender_name: 'Pedro M.',
          receiver_name: 'Ana R.',
          flagged_reasons: ['phone_number', 'contact_info'],
          ai_analysis: { safety_score: 45, concerns: ['contact_information_sharing'] },
          priority_level: 'high',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          conversation_type: 'event_based'
        }
      ])
    } catch (error) {
      console.error('Error loading moderation data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case 'mutual_match': return <Heart className="w-4 h-4" />
      case 'event_based': return <Calendar className="w-4 h-4" />
      case 'professional': return <Users className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">Monitor and maintain safety within the Portuguese community</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'overview', label: t.overview, icon: TrendingUp },
            { key: 'moderation', label: t.moderation, icon: Flag },
            { key: 'safety', label: t.safety, icon: Shield }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: t.stats.totalConversations,
                value: stats.total_conversations,
                icon: MessageCircle,
                color: 'blue'
              },
              {
                label: t.stats.mutualMatches,
                value: stats.mutual_matches,
                icon: Heart,
                color: 'pink'
              },
              {
                label: t.stats.eventConnections,
                value: stats.event_based_connections,
                icon: Calendar,
                color: 'green'
              },
              {
                label: t.stats.flaggedMessages,
                value: stats.flagged_messages,
                icon: Flag,
                color: 'red'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Safety Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Score</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${stats.safety_score_average}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {stats.safety_score_average}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Average safety score across all conversations
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Portuguese Content</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-secondary-500 h-3 rounded-full"
                      style={{ width: `${stats.portuguese_content_percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-secondary-600">
                  {stats.portuguese_content_percentage}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Messages containing Portuguese language or cultural references
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Flagged Content</h2>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {flaggedContent.length} items pending review
              </span>
            </div>
          </div>

          {flaggedContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getConnectionTypeIcon(item.conversation_type)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.sender_name} → {item.receiver_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.connectionTypes[item.conversation_type]}
                    </p>
                  </div>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority_level)}`}>
                  {t.priorities[item.priority_level]}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800 italic">"{item.content}"</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.flagged_reasons.map((reason, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                  >
                    {reason.replace('_', ' ')}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                {Object.entries(t.moderationActions).map(([action, label]) => (
                  <button
                    key={action}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      action === 'approve'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : action === 'reject' || action === 'block'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Safety Tab */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t.safetyGuidelines.title}
            </h2>
            <ul className="space-y-3">
              {t.safetyGuidelines.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {t.culturalModeration.title}
            </h2>
            <p className="text-gray-600 mb-4">{t.culturalModeration.description}</p>
            <ul className="space-y-2">
              {t.culturalModeration.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-secondary-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}