'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CalendarIcon,
  MapPinIcon,
  FireIcon,
  SparklesIcon,
  CheckCircleIcon,
  CursorArrowRippleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import {
  ChatBubbleLeftRightIcon as ChatSolid,
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid'

interface ConversationStarter {
  id: string
  textEn: string
  textPt: string
  category: string
  categoryPt: string
  culturalContext: string
  culturalContextPt: string
  popularity: number
  matchType: 'mutual' | 'event' | 'both'
  eventType?: string
  region?: string
}

interface UserProfile {
  id: string
  name: string
  age: number
  location: string
  origin: string
  interests: string[]
  sharedEvents?: Array<{
    id: string
    title: string
    type: string
    date: string
  }>
}

interface ConversationStartersProps {
  currentUserId: string
  matchedUser: UserProfile
  messagingUnlocked: boolean
  unlockReason: 'mutual_match' | 'shared_events' | 'both'
  sharedEvents?: Array<{
    id: string
    title: string
    type: string
    date: string
  }>
  onStartConversation: (starterId: string, message: string) => void
  className?: string
}

export default function ConversationStarters({
  currentUserId,
  matchedUser,
  messagingUnlocked,
  unlockReason,
  sharedEvents = [],
  onStartConversation,
  className = ''
}: ConversationStartersProps) {
  const { language, t } = useLanguage()
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [suggestedStarters, setSuggestedStarters] = useState<ConversationStarter[]>([])

  // Portuguese cultural conversation starters database
  const conversationStarters: ConversationStarter[] = [
    // Food & Culture
    {
      id: 'food_1',
      textEn: "What's your favorite Portuguese dish? I'm always looking for authentic recipes!",
      textPt: "Qual é o teu prato português favorito? Estou sempre à procura de receitas autênticas!",
      category: 'Portuguese Food',
      categoryPt: 'Comida Portuguesa',
      culturalContext: 'Food connects Portuguese people deeply to their heritage',
      culturalContextPt: 'A comida conecta profundamente os portugueses ao seu património',
      popularity: 92,
      matchType: 'both'
    },
    {
      id: 'food_2',
      textEn: "Best Portuguese bakery in London? I need my pastéis de nata fix!",
      textPt: "Melhor pastelaria portuguesa em Londres? Preciso da minha dose de pastéis de nata!",
      category: 'Portuguese Food',
      categoryPt: 'Comida Portuguesa',
      culturalContext: 'Pastéis de nata are a cultural staple for Portuguese speakers',
      culturalContextPt: 'Pastéis de nata são um elemento cultural fundamental para falantes de português',
      popularity: 88,
      matchType: 'both'
    },
    
    // Saudade & Homesickness
    {
      id: 'saudade_1',
      textEn: "Do you ever feel saudade for home? What do you miss most?",
      textPt: "Sentes saudade de casa? Do que tens mais saudades?",
      category: 'Saudade & Heritage',
      categoryPt: 'Saudade e Património',
      culturalContext: 'Saudade is a uniquely Portuguese emotion that bonds the diaspora',
      culturalContextPt: 'Saudade é uma emoção unicamente portuguesa que une a diáspora',
      popularity: 85,
      matchType: 'both'
    },
    {
      id: 'saudade_2',
      textEn: "What brings you the most comfort when you're feeling homesick?",
      textPt: "O que te traz mais conforto quando sentes saudades de casa?",
      category: 'Saudade & Heritage',
      categoryPt: 'Saudade e Património',
      culturalContext: 'Shared homesickness experiences create deep connections',
      culturalContextPt: 'Experiências partilhadas de saudade criam conexões profundas',
      popularity: 78,
      matchType: 'both'
    },
    
    // Regional Heritage
    {
      id: 'region_1',
      textEn: "Which region are you from? I love learning about different Portuguese traditions!",
      textPt: "De que região és? Adoro aprender sobre diferentes tradições portuguesas!",
      category: 'Regional Heritage',
      categoryPt: 'Património Regional',
      culturalContext: 'Portuguese regions have distinct cultures and traditions',
      culturalContextPt: 'As regiões portuguesas têm culturas e tradições distintas',
      popularity: 82,
      matchType: 'both'
    },
    
    // Festivals & Celebrations
    {
      id: 'festival_1',
      textEn: "How do you celebrate São João in the UK? I miss the festivities from home!",
      textPt: "Como celebras o São João no Reino Unido? Tenho saudades das festividades de casa!",
      category: 'Portuguese Festivals',
      categoryPt: 'Festas Portuguesas',
      culturalContext: 'São João is a major Portuguese celebration that diaspora tries to recreate',
      culturalContextPt: 'São João é uma grande celebração portuguesa que a diáspora tenta recriar',
      popularity: 75,
      matchType: 'both'
    },
    {
      id: 'festival_2',
      textEn: "Have you found any good Santos Populares celebrations in London?",
      textPt: "Conheces boas celebrações dos Santos Populares em Londres?",
      category: 'Portuguese Festivals',
      categoryPt: 'Festas Portuguesas',
      culturalContext: 'Santos Populares are cherished Portuguese summer festivals',
      culturalContextPt: 'Santos Populares são queridas festas portuguesas de verão',
      popularity: 70,
      matchType: 'both'
    },
    
    // Music & Fado
    {
      id: 'music_1',
      textEn: "Do you enjoy Fado? There's something so moving about it...",
      textPt: "Gostas de Fado? Há algo tão tocante nele...",
      category: 'Portuguese Music',
      categoryPt: 'Música Portuguesa',
      culturalContext: 'Fado represents the soul of Portuguese culture and identity',
      culturalContextPt: 'O Fado representa a alma da cultura e identidade portuguesa',
      popularity: 73,
      matchType: 'both'
    },
    
    // London Life
    {
      id: 'london_1',
      textEn: "How long have you been in London? What's been your biggest adjustment?",
      textPt: "Há quanto tempo estás em Londres? Qual foi a tua maior adaptação?",
      category: 'London Portuguese Life',
      categoryPt: 'Vida Portuguesa em Londres',
      culturalContext: 'Shared immigrant experiences create strong bonds',
      culturalContextPt: 'Experiências partilhadas de imigração criam laços fortes',
      popularity: 80,
      matchType: 'both'
    },
    {
      id: 'london_2',
      textEn: "Favorite Portuguese community spot in London? I love discovering new places!",
      textPt: "Sítio favorito da comunidade portuguesa em Londres? Adoro descobrir novos lugares!",
      category: 'London Portuguese Life',
      categoryPt: 'Vida Portuguesa em Londres',
      culturalContext: 'Portuguese community spaces are vital for cultural connection',
      culturalContextPt: 'Espaços da comunidade portuguesa são vitais para a conexão cultural',
      popularity: 77,
      matchType: 'both'
    },
    
    // Event-Specific Starters
    {
      id: 'event_1',
      textEn: "Looking forward to the event! Should we grab coffee beforehand?",
      textPt: "Estou ansioso(a) pelo evento! Devíamos tomar um café antes?",
      category: 'Event Planning',
      categoryPt: 'Planeamento de Eventos',
      culturalContext: 'Meeting before events builds comfort and connection',
      culturalContextPt: 'Encontrar-se antes dos eventos cria conforto e conexão',
      popularity: 90,
      matchType: 'event',
      eventType: 'general'
    },
    {
      id: 'event_2',
      textEn: "What drew you to this event? I'm excited to meet fellow Portuguese speakers!",
      textPt: "O que te levou a este evento? Estou animado(a) para conhecer outros falantes de português!",
      category: 'Event Planning',
      categoryPt: 'Planeamento de Eventos',
      culturalContext: 'Events are opportunities to strengthen Portuguese community bonds',
      culturalContextPt: 'Eventos são oportunidades para fortalecer laços da comunidade portuguesa',
      popularity: 85,
      matchType: 'event',
      eventType: 'general'
    }
  ]

  // Generate personalized starters based on user profile and unlock reason
  useEffect(() => {
    const generatePersonalizedStarters = () => {
      let filtered = conversationStarters.filter(starter => {
        // Filter by match type
        if (unlockReason === 'mutual_match' && starter.matchType === 'event') return false
        if (unlockReason === 'shared_events' && starter.matchType === 'mutual') return false
        return true
      })

      // Add event-specific starters if applicable
      if (sharedEvents.length > 0) {
        const eventStarters = conversationStarters.filter(starter => 
          starter.matchType === 'event' || starter.eventType === 'general'
        )
        filtered = [...filtered, ...eventStarters]
      }

      // Personalize based on user interests and origin
      const personalized = filtered.map(starter => {
        let personalityScore = starter.popularity

        // Boost scores based on shared interests
        if (matchedUser.interests.some(interest => 
          interest.toLowerCase().includes('food') || 
          interest.toLowerCase().includes('cuisine')
        ) && starter.category.includes('Food')) {
          personalityScore += 10
        }

        if (matchedUser.interests.some(interest => 
          interest.toLowerCase().includes('music') || 
          interest.toLowerCase().includes('fado')
        ) && starter.category.includes('Music')) {
          personalityScore += 10
        }

        if (matchedUser.interests.some(interest => 
          interest.toLowerCase().includes('culture') || 
          interest.toLowerCase().includes('festival')
        ) && starter.category.includes('Festival')) {
          personalityScore += 10
        }

        return { ...starter, personalityScore }
      })

      // Sort by personality score and take top 6
      const sorted = personalized.sort((a, b) => b.personalityScore - a.personalityScore)
      setSuggestedStarters(sorted.slice(0, 6))
    }

    if (messagingUnlocked) {
      generatePersonalizedStarters()
    }
  }, [matchedUser, unlockReason, sharedEvents, messagingUnlocked])

  const handleStarterSelect = (starter: ConversationStarter) => {
    setSelectedStarter(starter.id)
    const message = language === 'pt' ? starter.textPt : starter.textEn
    setCustomMessage(message)
  }

  const handleSendMessage = () => {
    if (selectedStarter && customMessage.trim()) {
      onStartConversation(selectedStarter, customMessage.trim())
      setSelectedStarter(null)
      setCustomMessage('')
      setShowCustomInput(false)
    }
  }

  // Don't render anything if messaging is not unlocked
  if (!messagingUnlocked) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border border-primary-100 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl">
          <ChatSolid className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary-900">
            {t('messaging.conversation_starters') || (language === 'pt' ? 'Iniciadores de Conversa Portugueses' : 'Portuguese Conversation Starters')}
          </h3>
          <p className="text-sm text-primary-600">
            {language === 'pt' 
              ? `Conecte-se com ${matchedUser.name} através da cultura portuguesa`
              : `Connect with ${matchedUser.name} through Portuguese culture`}
          </p>
        </div>
      </div>

      {/* Unlock Reason Badge */}
      <div className="flex items-center gap-2 mb-4">
        {unlockReason === 'mutual_match' && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
            <HeartSolid className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {t('messaging.mutual_match') || (language === 'pt' ? 'Match Mútuo' : 'Mutual Match')}
            </span>
          </div>
        )}
        
        {unlockReason === 'shared_events' && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {t('messaging.event_connection') || (language === 'pt' ? 'Conexão de Evento' : 'Event Connection')}
            </span>
          </div>
        )}

        {unlockReason === 'both' && (
          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-2 rounded-lg">
            <SparklesIcon className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">
              {language === 'pt' ? 'Match + Eventos' : 'Match + Events'}
            </span>
          </div>
        )}
      </div>

      {/* Shared Events Info */}
      {sharedEvents.length > 0 && (
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-semibold text-accent-800">
              {language === 'pt' ? 'Eventos Partilhados' : 'Shared Events'}
            </span>
          </div>
          <div className="text-xs text-accent-700">
            {sharedEvents.slice(0, 2).map((event, idx) => (
              <div key={event.id} className="flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 text-accent-600" />
                <span>{event.title}</span>
              </div>
            ))}
            {sharedEvents.length > 2 && (
              <span className="text-accent-600 font-medium">
                +{sharedEvents.length - 2} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Conversation Starters Grid */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-bold text-primary-900 flex items-center gap-2">
          <SparklesIcon className="w-4 h-4 text-secondary-500" />
          {language === 'pt' ? 'Sugestões Personalizadas' : 'Personalized Suggestions'}
        </h4>
        
        <div className="grid gap-3">
          {suggestedStarters.map((starter) => (
            <motion.div
              key={starter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedStarter === starter.id
                  ? 'border-secondary-400 bg-secondary-50 shadow-md'
                  : 'border-primary-200 hover:border-secondary-300 hover:bg-primary-25'
              }`}
              onClick={() => handleStarterSelect(starter)}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-primary-800 leading-relaxed flex-1 font-medium">
                  "{language === 'pt' ? starter.textPt : starter.textEn}"
                </p>
                <div className="flex items-center gap-1 ml-3">
                  <FireIcon className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600 font-medium">
                    {starter.personalityScore || starter.popularity}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-lg font-medium">
                  {language === 'pt' ? starter.categoryPt : starter.category}
                </span>
                <div className="flex items-center gap-2">
                  {selectedStarter === starter.id && (
                    <CheckCircleIcon className="w-4 h-4 text-secondary-600" />
                  )}
                  <span className="text-xs text-primary-500">
                    {language === 'pt' ? 'Toque para usar' : 'Tap to use'}
                  </span>
                </div>
              </div>
              
              {/* Cultural Context */}
              <div className="mt-2 pt-2 border-t border-primary-100">
                <p className="text-xs text-primary-600 italic">
                  💡 {language === 'pt' ? starter.culturalContextPt : starter.culturalContext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Message Input */}
      <AnimatePresence>
        {selectedStarter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="border-t border-primary-100 pt-4">
              <label className="block text-sm font-medium text-primary-900 mb-2">
                {language === 'pt' ? 'Personalize sua mensagem:' : 'Personalize your message:'}
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 border border-primary-200 rounded-xl resize-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
                rows={3}
                placeholder={language === 'pt' 
                  ? 'Edite a mensagem ou adicione algo pessoal...'
                  : 'Edit the message or add something personal...'}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedStarter(null)
                  setCustomMessage('')
                }}
                className="flex-1 py-3 px-4 border border-primary-300 text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                {language === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!customMessage.trim()}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CursorArrowRippleIcon className="w-4 h-4" />
                {t('messaging.start_conversation') || (language === 'pt' ? 'Iniciar Conversa' : 'Start Conversation')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Custom Message Option */}
      {!selectedStarter && (
        <div className="pt-4 border-t border-primary-100">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="w-full py-3 px-4 border border-primary-300 text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            {language === 'pt' ? 'Escrever Mensagem Personalizada' : 'Write Custom Message'}
          </button>
        </div>
      )}

      {/* Safety Reminder */}
      <div className="mt-4 pt-4 border-t border-primary-100">
        <div className="flex items-start gap-2 text-xs text-primary-600">
          <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
          <p>
            {t('messaging.safety_reminder') || (language === 'pt' 
              ? 'Mantenha as conversas respeitosas e reporte qualquer comportamento inadequado'
              : 'Keep conversations respectful and report any inappropriate behavior')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}