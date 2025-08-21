'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Calendar,
  Users,
  Zap,
  Star,
  Heart,
  Coffee,
  Music,
  BookOpen,
  Utensils,
  Flag,
  ArrowRight
} from 'lucide-react'

interface ConversationStarter {
  id: string
  category: string
  promptEn: string
  promptPt: string
  culturalContext: string
  usageCount: number
}

interface ConversationManagerProps {
  conversationId: string
  participantIds: string[]
  expiresAt?: string
  lastActivity?: string
  connectionType: 'mutual_match' | 'event_based' | 'professional'
  onSendStarter: (starter: ConversationStarter) => void
  onBookEvent?: () => void
}

export default function ConversationManager({
  conversationId,
  participantIds,
  expiresAt,
  lastActivity,
  connectionType,
  onSendStarter,
  onBookEvent
}: ConversationManagerProps) {
  const { language } = useLanguage()
  const [conversationStarters, setConversationStarters] = useState<ConversationStarter[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showStarters, setShowStarters] = useState(false)
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<string>('')
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)

  useEffect(() => {
    loadConversationStarters()
    if (expiresAt) {
      const interval = setInterval(updateTimeUntilExpiry, 60000) // Update every minute
      updateTimeUntilExpiry()
      return () => clearInterval(interval)
    }
  }, [expiresAt])

  const updateTimeUntilExpiry = () => {
    if (!expiresAt) return

    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()

    if (diff <= 0) {
      setTimeUntilExpiry('Expired')
      setIsExpiringSoon(false)
      return
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours < 24) {
      setIsExpiringSoon(true)
      if (hours > 0) {
        setTimeUntilExpiry(`${hours}h ${minutes}m`)
      } else {
        setTimeUntilExpiry(`${minutes}m`)
      }
    } else {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      setTimeUntilExpiry(`${days}d ${remainingHours}h`)
      setIsExpiringSoon(days <= 1)
    }
  }

  const loadConversationStarters = async () => {
    try {
      // Mock Portuguese conversation starters
      const mockStarters: ConversationStarter[] = [
        {
          id: 'cs-1',
          category: 'culture',
          promptEn: "What's your favorite Portuguese tradition you still celebrate in London?",
          promptPt: 'Qual é a tradição portuguesa que mais gosta de celebrar em Londres?',
          culturalContext: 'Helps discover shared cultural values and practices',
          usageCount: 145
        },
        {
          id: 'cs-2',
          category: 'food',
          promptEn: "Where do you find the best pastéis de nata in London?",
          promptPt: 'Onde encontra os melhores pastéis de nata em Londres?',
          culturalContext: 'Classic Portuguese pastry conversation starter',
          usageCount: 203
        },
        {
          id: 'cs-3',
          category: 'music',
          promptEn: "Do you enjoy Fado music? Any favorite singers?",
          promptPt: 'Gosta de fado? Tem algum fadista preferido?',
          culturalContext: 'Traditional Portuguese music genre',
          usageCount: 89
        },
        {
          id: 'cs-4',
          category: 'events',
          promptEn: "Have you been to any Portuguese cultural events in London recently?",
          promptPt: 'Tem ido a eventos culturais portugueses em Londres?',
          culturalContext: 'Connects to LusoTown community events',
          usageCount: 167
        },
        {
          id: 'cs-5',
          category: 'sports',
          promptEn: "How do you follow Portuguese football while living in London?",
          promptPt: 'Como acompanha o futebol português vivendo em Londres?',
          culturalContext: 'Football is central to Portuguese culture',
          usageCount: 134
        },
        {
          id: 'cs-6',
          category: 'language',
          promptEn: "Do you speak Portuguese at home or mostly English now?",
          promptPt: 'Fala português em casa ou principalmente inglês agora?',
          culturalContext: 'Language preservation in diaspora',
          usageCount: 98
        },
        {
          id: 'cs-7',
          category: 'holidays',
          promptEn: "How do you celebrate Portuguese holidays like Santos Populares in London?",
          promptPt: 'Como celebra as festas portuguesas como os Santos Populares em Londres?',
          culturalContext: 'Traditional June festivals',
          usageCount: 76
        },
        {
          id: 'cs-8',
          category: 'community',
          promptEn: "How important is staying connected to the Portuguese community here?",
          promptPt: 'Que importância tem manter-se ligado à comunidade portuguesa aqui?',
          culturalContext: 'Community belonging and identity',
          usageCount: 112
        }
      ]
      
      setConversationStarters(mockStarters)
    } catch (error) {
      console.error('Error loading conversation starters:', error)
    }
  }

  const categories = [
    { id: 'all', name: 'All', namePortuguese: 'Todas', icon: Star },
    { id: 'culture', name: 'Culture', namePortuguese: 'Cultura', icon: Flag },
    { id: 'food', name: 'Food', namePortuguese: 'Comida', icon: Utensils },
    { id: 'music', name: 'Music', namePortuguese: 'Música', icon: Music },
    { id: 'events', name: 'Events', namePortuguese: 'Eventos', icon: Calendar },
    { id: 'sports', name: 'Sports', namePortuguese: 'Desportos', icon: Heart },
    { id: 'community', name: 'Community', namePortuguese: 'Comunidade', icon: Users }
  ]

  const filteredStarters = selectedCategory === 'all' 
    ? conversationStarters 
    : conversationStarters.filter(starter => starter.category === selectedCategory)

  const translations = {
    en: {
      title: 'Conversation Helper',
      subtitle: 'Break the ice with Portuguese cultural conversation starters',
      expiryWarning: 'Conversation expires in',
      expired: 'This conversation has expired',
      extendConversation: 'Book an event to continue chatting',
      bookEvent: 'Browse Events',
      categories: 'Categories',
      startConversation: 'Start Conversation',
      culturalContext: 'Cultural Context',
      popularStarter: 'Popular',
      usedBy: 'Used by',
      people: 'people',
      connectionTypes: {
        mutual_match: 'Mutual Match',
        event_based: 'Event Connection',
        professional: 'Professional Network'
      },
      tips: {
        title: 'Portuguese Community Tips',
        tip1: 'Portuguese speakers love sharing cultural experiences',
        tip2: 'Food is always a safe conversation starter',
        tip3: 'Showing interest in Portuguese culture goes a long way',
        tip4: 'Events are great for extending conversations naturally'
      }
    },
    pt: {
      title: 'Assistente de Conversação',
      subtitle: 'Quebre o gelo com iniciadores de conversa culturais portugueses',
      expiryWarning: 'Conversa expira em',
      expired: 'Esta conversa expirou',
      extendConversation: 'Reserve um evento para continuar a conversar',
      bookEvent: 'Explorar Eventos',
      categories: 'Categorias',
      startConversation: 'Iniciar Conversa',
      culturalContext: 'Contexto Cultural',
      popularStarter: 'Popular',
      usedBy: 'Usado por',
      people: 'pessoas',
      connectionTypes: {
        mutual_match: 'Match Mútuo',
        event_based: 'Conexão de Evento',
        professional: 'Rede Profissional'
      },
      tips: {
        title: 'Dicas da Comunidade Portuguesa',
        tip1: 'Portugueses adoram partilhar experiências culturais',
        tip2: 'Comida é sempre um bom tópico de conversa',
        tip3: 'Mostrar interesse na cultura portuguesa é muito valorizado',
        tip4: 'Eventos são ótimos para estender conversas naturalmente'
      }
    }
  }

  const t = translations[language]

  return (
    <div className="space-y-6">
      {/* Conversation Status */}
      {expiresAt && (
        <div className={`rounded-lg border p-4 ${
          timeUntilExpiry === 'Expired' 
            ? 'bg-red-50 border-red-200' 
            : isExpiringSoon 
              ? 'bg-amber-50 border-amber-200' 
              : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {timeUntilExpiry === 'Expired' ? (
                <X className="h-5 w-5 text-coral-600" />
              ) : isExpiringSoon ? (
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              ) : (
                <Clock className="h-5 w-5 text-action-600" />
              )}
              
              <div>
                <p className={`font-medium ${
                  timeUntilExpiry === 'Expired' ? 'text-red-900' :
                  isExpiringSoon ? 'text-amber-900' : 'text-green-900'
                }`}>
                  {timeUntilExpiry === 'Expired' ? t.expired : `${t.expiryWarning} ${timeUntilExpiry}`}
                </p>
                <p className={`text-sm ${
                  timeUntilExpiry === 'Expired' ? 'text-red-700' :
                  isExpiringSoon ? 'text-amber-700' : 'text-green-700'
                }`}>
                  {t.connectionTypes[connectionType]}
                </p>
              </div>
            </div>

            {(timeUntilExpiry === 'Expired' || isExpiringSoon) && onBookEvent && (
              <button
                onClick={onBookEvent}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2 text-sm"
              >
                <Calendar className="h-4 w-4" />
                {t.bookEvent}
              </button>
            )}
          </div>

          {(timeUntilExpiry === 'Expired' || isExpiringSoon) && (
            <p className={`text-sm mt-2 ${
              timeUntilExpiry === 'Expired' ? 'text-red-700' : 'text-amber-700'
            }`}>
              {t.extendConversation}
            </p>
          )}
        </div>
      )}

      {/* Conversation Starters Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
        <button
          onClick={() => setShowStarters(!showStarters)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary-600" />
            <div className="text-left">
              <h3 className="font-medium text-secondary-900">{t.title}</h3>
              <p className="text-sm text-secondary-600">{t.subtitle}</p>
            </div>
          </div>
          <ArrowRight className={`h-5 w-5 text-secondary-400 transform transition-transform ${showStarters ? 'rotate-90' : ''}`} />
        </button>

        <AnimatePresence>
          {showStarters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-6"
            >
              {/* Categories */}
              <div>
                <p className="text-sm font-medium text-secondary-700 mb-3">{t.categories}</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                          selectedCategory === category.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {language === 'pt' ? category.namePortuguese : category.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Conversation Starters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStarters.map((starter) => (
                  <motion.div
                    key={starter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-secondary-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => onSendStarter(starter)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-secondary-900 leading-relaxed group-hover:text-primary-700">
                          {language === 'pt' ? starter.promptPt : starter.promptEn}
                        </p>
                        {starter.usageCount > 100 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {t.popularStarter}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-secondary-500">
                        <p className="mb-1">
                          <span className="font-medium">{t.culturalContext}:</span> {starter.culturalContext}
                        </p>
                        <p>
                          {t.usedBy} {starter.usageCount} {t.people}
                        </p>
                      </div>

                      <button className="w-full bg-secondary-50 group-hover:bg-primary-50 text-secondary-700 group-hover:text-primary-700 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {t.startConversation}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Portuguese Community Tips */}
              <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-medium text-secondary-900 mb-3">{t.tips.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Heart className="h-4 w-4 text-action-600 mt-0.5" />
                    <p className="text-sm text-secondary-700">{t.tips.tip1}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Utensils className="h-4 w-4 text-coral-600 mt-0.5" />
                    <p className="text-sm text-secondary-700">{t.tips.tip2}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Flag className="h-4 w-4 text-action-600 mt-0.5" />
                    <p className="text-sm text-secondary-700">{t.tips.tip3}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-coral-600 mt-0.5" />
                    <p className="text-sm text-secondary-700">{t.tips.tip4}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}