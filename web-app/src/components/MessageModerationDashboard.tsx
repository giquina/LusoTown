'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Flag, 
  User, 
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  X
} from 'lucide-react'

interface ModerationItem {
  id: string
  messageId: string
  conversationId: string
  senderId: string
  receiverId: string
  senderName: string
  receiverName: string
  content: string
  flaggedReasons: string[]
  systemAnalysis: {
    blocked: boolean
    score: number
    flags: string[]
  }
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent'
  isResolved: boolean
  moderatorId?: string
  moderatorAction?: 'approve' | 'reject' | 'edit' | 'warn_user' | 'block_user'
  moderatorNotes?: string
  createdAt: string
  resolvedAt?: string
}

interface ModerationStats {
  totalPending: number
  totalResolved: number
  averageResponseTime: number
  flaggedBySystem: number
  flaggedByUsers: number
  approvalRate: number
  rejectionRate: number
}

export default function MessageModerationDashboard() {
  const { language } = useLanguage()
  const [moderationQueue, setModerationQueue] = useState<ModerationItem[]>([])
  const [stats, setStats] = useState<ModerationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null)
  const [moderationAction, setModerationAction] = useState<string>('')
  const [moderatorNotes, setModeratorNotes] = useState('')

  useEffect(() => {
    loadModerationQueue()
    loadModerationStats()
  }, [])

  const loadModerationQueue = async () => {
    setLoading(true)
    try {
      // Mock moderation queue data
      const mockQueue: ModerationItem[] = [
        {
          id: 'mod-1',
          messageId: 'msg-1',
          conversationId: 'conv-1',
          senderId: 'user-1',
          receiverId: 'user-2',
          senderName: 'João Silva',
          receiverName: 'Maria Santos',
          content: 'Olá! O meu número é +44 7911 123456. Podemos conversar no WhatsApp?',
          flaggedReasons: ['phone_number', 'social_media'],
          aiAnalysis: {
            blocked: true,
            score: 45,
            flags: ['phone_number', 'social_media']
          },
          priorityLevel: 'high',
          isResolved: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'mod-2',
          messageId: 'msg-2',
          conversationId: 'conv-2',
          senderId: 'user-3',
          receiverId: 'user-4',
          senderName: 'Pedro Costa',
          receiverName: 'Ana Rodrigues',
          content: 'Hi! I\'m new here. Let\'s meet at 123 Oxford Street for coffee?',
          flaggedReasons: ['new_user', 'address'],
          aiAnalysis: {
            blocked: true,
            score: 65,
            flags: ['address']
          },
          priorityLevel: 'medium',
          isResolved: false,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'mod-3',
          messageId: 'msg-3',
          conversationId: 'conv-3',
          senderId: 'user-5',
          receiverId: 'user-6',
          senderName: 'Carlos Mendes',
          receiverName: 'Rita Ferreira',
          content: 'Adoro fado! Conhece o Clube de Fado em Londres? Tem eventos incríveis.',
          flaggedReasons: ['new_user'],
          aiAnalysis: {
            blocked: false,
            score: 95,
            flags: []
          },
          priorityLevel: 'low',
          isResolved: false,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'mod-4',
          messageId: 'msg-4',
          conversationId: 'conv-4',
          senderId: 'user-7',
          receiverId: 'user-8',
          senderName: 'Miguel Sousa',
          receiverName: 'Inês Pereira',
          content: 'You\'re so fucking beautiful! Want to hook up tonight?',
          flaggedReasons: ['profanity', 'inappropriate'],
          aiAnalysis: {
            blocked: true,
            score: 20,
            flags: ['profanity']
          },
          priorityLevel: 'urgent',
          isResolved: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        }
      ]
      
      setModerationQueue(mockQueue)
    } catch (error) {
      console.error('Error loading moderation queue:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadModerationStats = async () => {
    try {
      // Mock stats
      const mockStats: ModerationStats = {
        totalPending: 47,
        totalResolved: 312,
        averageResponseTime: 3.2,
        flaggedBySystem: 28,
        flaggedByUsers: 19,
        approvalRate: 68,
        rejectionRate: 22
      }
      
      setStats(mockStats)
    } catch (error) {
      console.error('Error loading moderation stats:', error)
    }
  }

  const handleModerationAction = async (item: ModerationItem, action: string, notes: string) => {
    try {
      // Mock API call to moderate message
        messageId: item.messageId,
        action,
        notes,
        moderatorId: 'current-moderator'
      })

      // Update local state
      setModerationQueue(prev => prev.map(queueItem => 
        queueItem.id === item.id
          ? {
              ...queueItem,
              isResolved: true,
              moderatorAction: action as any,
              moderatorNotes: notes,
              resolvedAt: new Date().toISOString()
            }
          : queueItem
      ))

      setSelectedItem(null)
      setModerationAction('')
      setModeratorNotes('')
    } catch (error) {
      console.error('Error moderating message:', error)
    }
  }

  const filteredQueue = moderationQueue
    .filter(item => !item.isResolved)
    .filter(item => {
      if (filterPriority !== 'all' && item.priorityLevel !== filterPriority) {
        return false
      }
      if (searchQuery) {
        return item.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.content.toLowerCase().includes(searchQuery.toLowerCase())
      }
      return true
    })
    .sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priorityLevel] - priorityOrder[a.priorityLevel]
    })

  const translations = {
    en: {
      title: 'Message Moderation Dashboard',
      subtitle: 'Review and moderate flagged messages for Portuguese community safety',
      stats: {
        totalPending: 'Pending Review',
        totalResolved: 'Resolved Today',
        averageResponseTime: 'Avg Response Time',
        flaggedBySystem: 'System Flagged',
        flaggedByUsers: 'User Reported',
        approvalRate: 'Approval Rate',
        rejectionRate: 'Rejection Rate',
        hours: 'hours'
      },
      filters: {
        search: 'Search messages, users...',
        priority: 'Priority Level',
        all: 'All Priorities',
        urgent: 'Urgent',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      queue: {
        noItems: 'No pending moderation items',
        allClear: 'All messages have been reviewed!',
        flaggedReasons: 'Flagged for',
        safetyScore: 'Safety Score',
        timeAgo: 'ago',
        from: 'From',
        to: 'To',
        review: 'Review',
        viewFull: 'View Full Message'
      },
      moderation: {
        title: 'Moderate Message',
        action: 'Moderation Action',
        actions: {
          approve: 'Approve Message',
          reject: 'Reject Message',
          edit: 'Edit and Approve',
          warn_user: 'Warn User',
          block_user: 'Block User'
        },
        notes: 'Moderator Notes',
        notesPlaceholder: 'Add notes about your decision...',
        submit: 'Submit Decision',
        cancel: 'Cancel'
      },
      reasons: {
        phone_number: 'Phone Number',
        email_address: 'Email Address',
        address: 'Physical Address',
        social_media: 'Social Media Handle',
        profanity: 'Profanity',
        inappropriate: 'Inappropriate Content',
        new_user: 'New User'
      }
    },
    pt: {
      title: 'Painel de Moderação de Mensagens',
      subtitle: 'Reveja e modere mensagens sinalizadas para a segurança da comunidade portuguesa',
      stats: {
        totalPending: 'Pendente Revisão',
        totalResolved: 'Resolvidas Hoje',
        averageResponseTime: 'Tempo Médio Resposta',
        flaggedBySystem: 'Sinalizadas pelo Sistema',
        flaggedByUsers: 'Reportadas por Utilizadores',
        approvalRate: 'Taxa de Aprovação',
        rejectionRate: 'Taxa de Rejeição',
        hours: 'horas'
      },
      filters: {
        search: 'Procurar mensagens, utilizadores...',
        priority: 'Nível de Prioridade',
        all: 'Todas as Prioridades',
        urgent: 'Urgente',
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa'
      },
      queue: {
        noItems: 'Não há itens pendentes de moderação',
        allClear: 'Todas as mensagens foram revistas!',
        flaggedReasons: 'Sinalizada por',
        aiScore: 'Pontuação IA Segurança',
        timeAgo: 'atrás',
        from: 'De',
        to: 'Para',
        review: 'Rever',
        viewFull: 'Ver Mensagem Completa'
      },
      moderation: {
        title: 'Moderar Mensagem',
        action: 'Ação de Moderação',
        actions: {
          approve: 'Aprovar Mensagem',
          reject: 'Rejeitar Mensagem',
          edit: 'Editar e Aprovar',
          warn_user: 'Avisar Utilizador',
          block_user: 'Bloquear Utilizador'
        },
        notes: 'Notas do Moderador',
        notesPlaceholder: 'Adicione notas sobre a sua decisão...',
        submit: 'Submeter Decisão',
        cancel: 'Cancelar'
      },
      reasons: {
        phone_number: 'Número de Telefone',
        email_address: 'Endereço de Email',
        address: 'Morada Física',
        social_media: 'Rede Social',
        profanity: 'Profanidade',
        inappropriate: 'Conteúdo Inapropriado',
        new_user: 'Utilizador Novo'
      }
    }
  }

  const t = translations[language]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-coral-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-primary-600 bg-blue-50 border-blue-200'
      default: return 'text-secondary-600 bg-secondary-50 border-secondary-200'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = diff / (1000 * 60 * 60)
    
    if (hours < 1) return `${Math.floor(diff / (1000 * 60))}m ${t.queue.timeAgo}`
    if (hours < 24) return `${Math.floor(hours)}h ${t.queue.timeAgo}`
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">{t.title}</h1>
        <p className="text-secondary-600 mt-1">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600">{t.stats.totalPending}</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalPending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600">{t.stats.totalResolved}</p>
                <p className="text-2xl font-bold text-action-600">{stats.totalResolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-action-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600">{t.stats.averageResponseTime}</p>
                <p className="text-2xl font-bold text-primary-600">
                  {stats.averageResponseTime}
                  <span className="text-sm text-secondary-500 ml-1">{t.stats.hours}</span>
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600">{t.stats.approvalRate}</p>
                <p className="text-2xl font-bold text-action-600">{stats.approvalRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-action-600" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -transecondary-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder={t.filters.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">{t.filters.all}</option>
            <option value="urgent">{t.filters.urgent}</option>
            <option value="high">{t.filters.high}</option>
            <option value="medium">{t.filters.medium}</option>
            <option value="low">{t.filters.low}</option>
          </select>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-100">
        {filteredQueue.length === 0 ? (
          <div className="p-8 text-center">
            <Shield className="h-12 w-12 text-action-600 mx-auto mb-3" />
            <h3 className="font-medium text-secondary-900 mb-2">{t.queue.noItems}</h3>
            <p className="text-sm text-secondary-600">{t.queue.allClear}</p>
          </div>
        ) : (
          <div className="divide-y divide-secondary-100">
            {filteredQueue.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Priority and Time */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(item.priorityLevel)}`}>
                        {t.filters[item.priorityLevel as keyof typeof t.filters]}
                      </span>
                      <span className="text-sm text-secondary-500">
                        {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>

                    {/* Users */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-secondary-500">{t.queue.from}:</span>
                        <span className="font-medium text-secondary-900">{item.senderName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-secondary-500">{t.queue.to}:</span>
                        <span className="font-medium text-secondary-900">{item.receiverName}</span>
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="bg-secondary-50 rounded-lg p-3">
                      <p className="text-sm text-secondary-700 line-clamp-2">{item.content}</p>
                    </div>

                    {/* Flagged Reasons and Safety Score */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-secondary-500">{t.queue.flaggedReasons}:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.flaggedReasons.map((reason) => (
                            <span key={reason} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                              {t.reasons[reason as keyof typeof t.reasons] || reason}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-secondary-500">{t.queue.aiScore}:</span>
                        <span className={`text-sm font-medium ${
                          item.aiAnalysis.score >= 80 ? 'text-action-600' :
                          item.aiAnalysis.score >= 50 ? 'text-yellow-600' :
                          'text-coral-600'
                        }`}>
                          {item.aiAnalysis.score}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-6 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {t.queue.review}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Moderation Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-secondary-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-secondary-900">{t.moderation.title}</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-50"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Message Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-500">{t.queue.from}</p>
                      <p className="font-medium text-secondary-900">{selectedItem.senderName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-secondary-500">{t.queue.to}</p>
                      <p className="font-medium text-secondary-900">{selectedItem.receiverName}</p>
                    </div>
                  </div>

                  <div className="bg-secondary-50 rounded-lg p-4">
                    <p className="text-secondary-900">{selectedItem.content}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-secondary-500 mb-2">{t.queue.flaggedReasons}</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.flaggedReasons.map((reason) => (
                          <span key={reason} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                            {t.reasons[reason as keyof typeof t.reasons] || reason}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-secondary-500 mb-2">{t.queue.aiScore}</p>
                      <div className={`text-2xl font-bold ${
                        selectedItem.aiAnalysis.score >= 80 ? 'text-action-600' :
                        selectedItem.aiAnalysis.score >= 50 ? 'text-yellow-600' :
                        'text-coral-600'
                      }`}>
                        {selectedItem.aiAnalysis.score}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-secondary-700">
                    {t.moderation.action}
                  </label>
                  <div className="space-y-2">
                    {Object.entries(t.moderation.actions).map(([action, label]) => (
                      <button
                        key={action}
                        onClick={() => setModerationAction(action)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          moderationAction === action
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-secondary-200 hover:border-secondary-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Moderator Notes */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {t.moderation.notes}
                  </label>
                  <textarea
                    value={moderatorNotes}
                    onChange={(e) => setModeratorNotes(e.target.value)}
                    placeholder={t.moderation.notesPlaceholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-secondary-100">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 text-secondary-600 hover:text-secondary-900"
                >
                  {t.moderation.cancel}
                </button>
                <button
                  onClick={() => handleModerationAction(selectedItem, moderationAction, moderatorNotes)}
                  disabled={!moderationAction}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.moderation.submit}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}