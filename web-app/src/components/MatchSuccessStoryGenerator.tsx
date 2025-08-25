'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SparklesIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  MapPinIcon,
  CameraIcon,
  ShareIcon,
  CheckCircleIcon,
  StarIcon,
  UserGroupIcon,
  BoltIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface MatchProfile {
  id: string
  name: string
  age: number
  location: string
  interests: string[]
  compatibility: number
  matchedAt?: string
}

interface SocialConnection {
  id: string
  matchId: string
  sharedEvents: number
  serviceBookings: number
  storiesGenerated: number
  connectionStrength: 'weak' | 'medium' | 'strong'
}

interface SuccessStory {
  id: string
  matchId: string
  type: 'first_meet' | 'event_together' | 'service_shared' | 'milestone' | 'cultural_moment'
  title: string
  description: string
  culturalElement: string
  location?: string
  date: string
  imageUrl?: string
  likes: number
  shares: number
  comments: number
  isPublished: boolean
  visibility: 'public' | 'community' | 'private'
  template: string
  generated: boolean
}

interface MatchSuccessStoryGeneratorProps {
  className?: string
  matches: MatchProfile[]
  socialConnections: SocialConnection[]
  onStoryGenerate?: (matchId: string, storyType: string) => void
}

const storyTemplates = {
  first_meet: {
    en: [
      "Just met {name} at {location}! The Lusophone connection was instant - we bonded over {cultural_element}. Sometimes the best conversations happen in Lusophone! 🇵🇹",
      "First coffee with {name} and it felt like talking to a childhood friend from Portugal. Amazing how {cultural_element} brings people together in London! ☕",
      "Met {name} through LusoTown and discovered we both miss {cultural_element} from home. Already planning our next Lusophone adventure! 🌟"
    ],
    pt: [
      "Acabei de conhecer {name} em {location}! A conexão portuguesa foi instantânea - conectámo-nos através de {cultural_element}. Às vezes as melhores conversas acontecem em português! 🇵🇹",
      "Primeiro café com {name} e pareceu conversar com um amigo de infância de Portugal. Incrível como {cultural_element} une as pessoas em Londres! ☕",
      "Conheci {name} através do LusoTown e descobrimos que ambos sentimos saudades de {cultural_element} de casa. Já estamos a planear a nossa próxima aventura portuguesa! 🌟"
    ]
  },
  event_together: {
    en: [
      "Attended the {event_name} with {name} - such an authentic Lusophone experience! Nothing beats sharing {cultural_element} with someone who truly understands. 🎵",
      "Fado night with {name} was magical! We both got emotional during {cultural_element}. These are the moments that make living in London special. ❤️",
      "Portuguese wine tasting with {name} - discovered we both love {cultural_element}! Already booking our next cultural adventure together. 🍷"
    ],
    pt: [
      "Participei no {event_name} com {name} - que experiência portuguesa autêntica! Nada como partilhar {cultural_element} com alguém que realmente compreende. 🎵",
      "Noite de Fado com {name} foi mágica! Ambos nos emocionámos durante {cultural_element}. Estes são os momentos que tornam especial viver em Londres. ❤️",
      "Prova de vinhos portugueses com {name} - descobrimos que ambos amamos {cultural_element}! Já estamos a marcar a nossa próxima aventura cultural juntos. 🍷"
    ]
  },
  service_shared: {
    en: [
      "Shared a Lusophone cultural tour with {name} today! Our guide's stories about {cultural_element} brought back so many memories from home. Perfect day! 🗺️",
      "Took the transport service to {location} with {name} - having a Portuguese-speaking driver made all the difference! Talked about {cultural_element} the whole way. 🚗",
      "Found the perfect apartment in {location} with help from {name}! The Portuguese-speaking community here is incredible. Can't wait to host our first {cultural_element} dinner! 🏠"
    ],
    pt: [
      "Partilhei um tour cultural português com {name} hoje! As histórias do nosso guia sobre {cultural_element} trouxeram tantas memórias de casa. Dia perfeito! 🗺️",
      "Apanhámos o serviço de transporte para {location} com {name} - ter um motorista que fala português fez toda a diferença! Falámos sobre {cultural_element} todo o caminho. 🚗",
      "Encontrámos o apartamento perfeito em {location} com ajuda de {name}! A comunidade de falantes de português aqui é incrível. Mal posso esperar para organizar o nosso primeiro jantar de {cultural_element}! 🏠"
    ]
  },
  cultural_moment: {
    en: [
      "Cooked pastéis de nata with {name} today! Teaching each other family recipes and sharing stories about {cultural_element}. This is what community means. 👨‍🍳",
      "Celebrated Santos Populares with {name} in the local park! Even in London, we keep our {cultural_element} traditions alive. Saudade hits different when shared. 🎉",
      "Sunday morning at the Lusophone market with {name} - found ingredients for {cultural_element}! Nothing like speaking Lusophone while shopping for a taste of home. 🛒"
    ],
    pt: [
      "Cozinhámos pastéis de nata com {name} hoje! Ensinando um ao outro receitas de família e partilhando histórias sobre {cultural_element}. Isto é o que significa comunidade. 👨‍🍳",
      "Celebrámos os Santos Populares com {name} no parque local! Mesmo em Londres, mantemos vivas as nossas tradições de {cultural_element}. A saudade bate diferente quando partilhada. 🎉",
      "Domingo de manhã no mercado português com {name} - encontrámos ingredientes para {cultural_element}! Nada como falar português enquanto compramos um sabor de casa. 🛒"
    ]
  },
  milestone: {
    en: [
      "Three months of friendship with {name} and counting! From strangers to family friends, all thanks to our shared love of {cultural_element}. LusoTown connections are real! 🎯",
      "Celebrated {name}'s birthday Lusophone-style! Gathered the whole community for {cultural_element}. These are the friendships that last a lifetime. 🎂",
      "Six months since meeting {name} through LusoTown - now we're planning to visit Portugal together! Our {cultural_element} adventures continue. ✈️"
    ],
    pt: [
      "Três meses de amizade com {name} e a contar! De estranhos a amigos de família, tudo graças ao nosso amor partilhado por {cultural_element}. As conexões do LusoTown são reais! 🎯",
      "Celebrámos o aniversário de {name} à portuguesa! Reunimos toda a comunidade para {cultural_element}. Estas são as amizades que duram uma vida. 🎂",
      "Seis meses desde que conheci {name} através do LusoTown - agora estamos a planear visitar Portugal juntos! As nossas aventuras de {cultural_element} continuam. ✈️"
    ]
  }
}

const culturalElements = [
  'fado music', 'pastéis de nata', 'Portuguese wine', 'Santos Populares', 'saudade',
  'bacalhau recipes', 'azulejo art', 'Lusophone coffee', 'sardinha festivals',
  'Camões poetry', 'Lusophone football', 'traditional dancing', 'family recipes',
  'Lusophone cinema', 'Minho traditions', 'Alentejo music', 'Porto culture'
]

const mockSuccessStories: SuccessStory[] = [
  {
    id: 'story-1',
    matchId: 'match-1',
    type: 'first_meet',
    title: 'First Lusophone Connection in London',
    description: 'Just met Sofia at Borough Market! The Lusophone connection was instant - we bonded over pastéis de nata. Sometimes the best conversations happen in Lusophone! 🇵🇹',
    culturalElement: 'pastéis de nata',
    location: 'Borough Market',
    date: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop&auto=format',
    likes: 23,
    shares: 5,
    comments: 8,
    isPublished: true,
    visibility: 'community',
    template: 'first_meet_1',
    generated: true
  },
  {
    id: 'story-2',
    matchId: 'match-3',
    type: 'event_together',
    title: 'Magical Fado Night Experience',
    description: 'Fado night with Ana was magical! We both got emotional during traditional saudade songs. These are the moments that make living in London special. ❤️',
    culturalElement: 'fado music',
    location: 'Lusophone Cultural Centre',
    date: '1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&auto=format',
    likes: 45,
    shares: 12,
    comments: 15,
    isPublished: true,
    visibility: 'public',
    template: 'event_together_2',
    generated: true
  }
]

export default function MatchSuccessStoryGenerator({
  className = '',
  matches,
  socialConnections,
  onStoryGenerate
}: MatchSuccessStoryGeneratorProps) {
  const { language } = useLanguage()
  const { membershipTier, hasActiveSubscription } = useSubscription()
  const [stories, setStories] = useState<SuccessStory[]>(mockSuccessStories)
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [storyType, setStoryType] = useState<SuccessStory['type']>('first_meet')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGenerator, setShowGenerator] = useState(false)
  const [customization, setCustomization] = useState({
    location: '',
    culturalElement: '',
    eventName: '',
    personalNote: ''
  })

  const isPortuguese = language === 'pt'
  const isPremiumUser = hasActiveSubscription && (membershipTier === 'community' || membershipTier === 'ambassador')

  // Get available matches for story generation
  const availableMatches = matches.filter(match => {
    const connection = socialConnections.find(conn => conn.matchId === match.id)
    return connection && connection.connectionStrength !== 'weak'
  })

  const generateStoryContent = (match: MatchProfile, type: SuccessStory['type']): Partial<SuccessStory> => {
    const templates = storyTemplates[type][isPortuguese ? 'pt' : 'en']
    const template = templates[Math.floor(Math.random() * templates.length)]
    const culturalElement = customization.culturalElement || 
      culturalElements[Math.floor(Math.random() * culturalElements.length)]
    
    let description = template
      .replace('{name}', match.name)
      .replace('{location}', customization.location || match.location)
      .replace('{cultural_element}', culturalElement)
      .replace('{event_name}', customization.eventName || 'Lusophone Cultural Evening')
    
    // Add personal note if provided
    if (customization.personalNote) {
      description += ` ${customization.personalNote}`
    }

    const titles = {
      first_meet: isPortuguese ? 'Primeira Conexão Portuguesa' : 'First Lusophone Connection',
      event_together: isPortuguese ? 'Evento Cultural Partilhado' : 'Shared Cultural Event',
      service_shared: isPortuguese ? 'Serviço Comunitário' : 'Community Service Shared',
      cultural_moment: isPortuguese ? 'Momento Cultural Especial' : 'Special Cultural Moment',
      milestone: isPortuguese ? 'Marco na Amizade' : 'Friendship Milestone'
    }

    return {
      title: titles[type],
      description,
      culturalElement,
      location: customization.location || match.location,
      date: isPortuguese ? 'Agora mesmo' : 'Just now',
      likes: 0,
      shares: 0,
      comments: 0,
      isPublished: false,
      visibility: 'community',
      generated: true
    }
  }

  const handleGenerateStory = async () => {
    if (!selectedMatch) return

    const match = matches.find(m => m.id === selectedMatch)
    if (!match) return

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const storyContent = generateStoryContent(match, storyType)
    
    const newStory: SuccessStory = {
      id: `story-${Date.now()}`,
      matchId: selectedMatch,
      type: storyType,
      template: `${storyType}_generated`,
      ...storyContent
    } as SuccessStory

    setStories(prev => [newStory, ...prev])
    onStoryGenerate?.(selectedMatch, storyType)
    
    setIsGenerating(false)
    setShowGenerator(false)
    
    // Reset customization
    setCustomization({
      location: '',
      culturalElement: '',
      eventName: '',
      personalNote: ''
    })
  }

  const handlePublishStory = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, isPublished: true, visibility: 'public' }
        : story
    ))
  }

  const handleLikeStory = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ))
  }

  const getStoryTypeIcon = (type: SuccessStory['type']) => {
    switch (type) {
      case 'first_meet': return UserGroupIcon
      case 'event_together': return CalendarIcon
      case 'service_shared': return SparklesIcon
      case 'cultural_moment': return HeartIcon
      case 'milestone': return StarIcon
      default: return ChatBubbleLeftRightIcon
    }
  }

  const getStoryTypeLabel = (type: SuccessStory['type']) => {
    switch (type) {
      case 'first_meet': return isPortuguese ? 'Primeiro Encontro' : 'First Meeting'
      case 'event_together': return isPortuguese ? 'Evento Juntos' : 'Event Together'
      case 'service_shared': return isPortuguese ? 'Serviço Partilhado' : 'Service Shared'
      case 'cultural_moment': return isPortuguese ? 'Momento Cultural' : 'Cultural Moment'
      case 'milestone': return isPortuguese ? 'Marco' : 'Milestone'
      default: return isPortuguese ? 'História' : 'Story'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Success Story Generator Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-accent-500" />
              {isPortuguese ? 'Gerador de Histórias de Sucesso' : 'Success Story Generator'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isPortuguese 
                ? 'Crie e partilhe momentos especiais com os seus matches portugueses'
                : 'Create and share special moments with your Lusophone matches'
              }
            </p>
          </div>
          
          <button
            onClick={() => setShowGenerator(true)}
            disabled={availableMatches.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              availableMatches.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-500 to-coral-500 text-white hover:from-accent-600 hover:to-coral-600'
            }`}
          >
            <PlusIcon className="w-4 h-4" />
            {isPortuguese ? 'Nova História' : 'New Story'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {stories.length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Histórias Criadas' : 'Stories Created'}
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {stories.filter(s => s.isPublished).length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Publicadas' : 'Published'}
            </div>
          </div>
          <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {stories.reduce((sum, story) => sum + story.likes, 0)}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Gostos Totais' : 'Total Likes'}
            </div>
          </div>
        </div>
      </div>

      {/* Story Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BoltIcon className="w-5 h-5 text-accent-500" />
                {isPortuguese ? 'Criar História de Sucesso' : 'Create Success Story'}
              </h3>

              <div className="space-y-6">
                {/* Match Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Escolher Match' : 'Choose Match'}
                  </label>
                  <select
                    value={selectedMatch || ''}
                    onChange={(e) => setSelectedMatch(e.target.value || null)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  >
                    <option value="">{isPortuguese ? 'Selecionar match...' : 'Select match...'}</option>
                    {availableMatches.map(match => (
                      <option key={match.id} value={match.id}>
                        {match.name} - {match.location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Story Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Tipo de História' : 'Story Type'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(['first_meet', 'event_together', 'service_shared', 'cultural_moment', 'milestone'] as const).map(type => {
                      const IconComponent = getStoryTypeIcon(type)
                      return (
                        <button
                          key={type}
                          onClick={() => setStoryType(type)}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                            storyType === type
                              ? 'border-accent-500 bg-accent-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent className="w-6 h-6 mb-2 text-accent-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {getStoryTypeLabel(type)}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Customization Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Local (opcional)' : 'Location (optional)'}
                    </label>
                    <input
                      type="text"
                      value={customization.location}
                      onChange={(e) => setCustomization(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={isPortuguese ? 'ex: Borough Market' : 'e.g. Borough Market'}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Elemento Cultural' : 'Cultural Element'}
                    </label>
                    <select
                      value={customization.culturalElement}
                      onChange={(e) => setCustomization(prev => ({ ...prev, culturalElement: e.target.value }))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    >
                      <option value="">{isPortuguese ? 'Aleatório' : 'Random'}</option>
                      {culturalElements.map(element => (
                        <option key={element} value={element}>{element}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {storyType === 'event_together' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Nome do Evento' : 'Event Name'}
                    </label>
                    <input
                      type="text"
                      value={customization.eventName}
                      onChange={(e) => setCustomization(prev => ({ ...prev, eventName: e.target.value }))}
                      placeholder={isPortuguese ? 'ex: Noite de Fado' : 'e.g. Fado Night'}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Nota Pessoal (opcional)' : 'Personal Note (optional)'}
                  </label>
                  <textarea
                    value={customization.personalNote}
                    onChange={(e) => setCustomization(prev => ({ ...prev, personalNote: e.target.value }))}
                    placeholder={isPortuguese ? 'Adicione uma nota pessoal...' : 'Add a personal note...'}
                    rows={3}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowGenerator(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  {isPortuguese ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  onClick={handleGenerateStory}
                  disabled={!selectedMatch || isGenerating}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                    !selectedMatch || isGenerating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-500 to-coral-500 text-white hover:from-accent-600 hover:to-coral-600'
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isPortuguese ? 'Gerando...' : 'Generating...'}
                    </div>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4 inline mr-2" />
                      {isPortuguese ? 'Gerar História' : 'Generate Story'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Stories List */}
      <div className="space-y-4">
        {stories.map(story => {
          const match = matches.find(m => m.id === story.matchId)
          const IconComponent = getStoryTypeIcon(story.type)
          
          return (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Story Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-400 to-coral-400 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{getStoryTypeLabel(story.type)}</span>
                        {match && (
                          <>
                            <span>•</span>
                            <span>{isPortuguese ? 'com' : 'with'} {match.name}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {story.generated && (
                      <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs font-medium">
                        AI
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      story.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {story.isPublished ? 
                        (isPortuguese ? 'Publicado' : 'Published') : 
                        (isPortuguese ? 'Rascunho' : 'Draft')
                      }
                    </span>
                  </div>
                </div>

                {/* Story Content */}
                <p className="text-gray-700 mb-4 leading-relaxed">{story.description}</p>

                {/* Cultural Element & Location */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4" />
                    {story.culturalElement}
                  </div>
                  {story.location && (
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {story.location}
                    </div>
                  )}
                </div>

                {/* Story Image */}
                {story.imageUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={story.imageUrl} 
                      alt="Story moment"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Story Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLikeStory(story.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium">{story.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">{story.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">{story.shares}</span>
                    </button>
                  </div>
                  
                  {!story.isPublished && (
                    <button
                      onClick={() => handlePublishStory(story.id)}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
                    >
                      {isPortuguese ? 'Publicar' : 'Publish'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="text-center py-12">
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isPortuguese ? 'Nenhuma História Criada' : 'No Stories Created Yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {isPortuguese 
              ? 'Comece a documentar os seus momentos especiais com matches portugueses!'
              : 'Start documenting your special moments with Lusophone matches!'
            }
          </p>
          <button
            onClick={() => setShowGenerator(true)}
            disabled={availableMatches.length === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              availableMatches.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-500 to-coral-500 text-white hover:from-accent-600 hover:to-coral-600'
            }`}
          >
            {isPortuguese ? 'Criar Primeira História' : 'Create First Story'}
          </button>
        </div>
      )}

      {/* Premium Features */}
      {!isPremiumUser && (
        <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-2xl p-6 border border-accent-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Histórias Premium' : 'Premium Stories'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {isPortuguese ? 'Geração AI avançada' : 'Advanced AI generation'}</li>
                <li>• {isPortuguese ? 'Templates culturais exclusivos' : 'Exclusive cultural templates'}</li>
                <li>• {isPortuguese ? 'Álbum de fotos automático' : 'Automatic photo albums'}</li>
                <li>• {isPortuguese ? 'Partilha em redes sociais' : 'Social media sharing'}</li>
              </ul>
            </div>
            <button className="bg-accent-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-colors">
              {isPortuguese ? 'Upgrade' : 'Upgrade'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}