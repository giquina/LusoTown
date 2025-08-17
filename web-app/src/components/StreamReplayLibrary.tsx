'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, ClockIcon, EyeIcon, HeartIcon, BookmarkIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Crown, Calendar, Filter, Users, Briefcase, GraduationCap, Music, Camera, Lock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface StreamReplay {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  originalStreamDate: string
  duration: number
  views: number
  likes: number
  host: string
  isPremium: boolean
  thumbnail: string
  youtubeVideoId: string
  tags: string[]
  keyMoments: Array<{
    time: number
    title: string
    description: string
  }>
}

interface StreamReplayLibraryProps {
  hasAccess: boolean
  selectedCategory: string
  language: string
}

export default function StreamReplayLibrary({ hasAccess, selectedCategory, language }: StreamReplayLibraryProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent') // recent, popular, duration
  const [showFilters, setShowFilters] = useState(false)
  const [selectedReplay, setSelectedReplay] = useState<StreamReplay | null>(null)

  // Mock replay data
  const replays: StreamReplay[] = [
    {
      id: 'fado-night-dec-2024',
      title: language === 'pt' ? 'Noite de Fado Especial - Dezembro 2024' : 'Special Fado Night - December 2024',
      description: language === 'pt' ? 'Uma noite inesquecível de fado tradicional com artistas de Lisboa e Porto' : 'An unforgettable night of traditional fado with artists from Lisbon and Porto',
      category: 'portuguese-culture',
      categoryName: language === 'pt' ? 'Cultura Portuguesa' : 'Portuguese Culture',
      originalStreamDate: '2024-12-15T20:00:00Z',
      duration: 95,
      views: 1247,
      likes: 189,
      host: 'Maria Santos & Convidados',
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
      youtubeVideoId: 'dQw4w9WgXcQ',
      tags: ['fado', 'music', 'tradition', 'portugal', 'culture'],
      keyMoments: [
        { time: 15, title: language === 'pt' ? 'Abertura Tradicional' : 'Traditional Opening', description: language === 'pt' ? 'Fado tradicional de Lisboa' : 'Traditional Lisbon fado' },
        { time: 45, title: language === 'pt' ? 'Momento Especial' : 'Special Moment', description: language === 'pt' ? 'Dueto emocionante' : 'Emotional duet' },
        { time: 72, title: language === 'pt' ? 'Grande Final' : 'Grand Finale', description: language === 'pt' ? 'Todos os artistas juntos' : 'All artists together' }
      ]
    },
    {
      id: 'ai-business-workshop-jan-2025',
      title: language === 'pt' ? 'Workshop de IA para Negócios - Janeiro 2025' : 'AI for Business Workshop - January 2025',
      description: language === 'pt' ? 'Como implementar inteligência artificial no seu negócio português' : 'How to implement artificial intelligence in your Portuguese business',
      category: 'business-workshops',
      categoryName: language === 'pt' ? 'Workshops de Negócios' : 'Business Workshops',
      originalStreamDate: '2025-01-10T14:00:00Z',
      duration: 120,
      views: 892,
      likes: 156,
      host: 'Carlos Mendes',
      isPremium: true,
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
      youtubeVideoId: 'dQw4w9WgXcQ',
      tags: ['ai', 'business', 'workshop', 'technology', 'automation'],
      keyMoments: [
        { time: 10, title: language === 'pt' ? 'Introdução à IA' : 'Introduction to AI', description: language === 'pt' ? 'Conceitos básicos' : 'Basic concepts' },
        { time: 35, title: language === 'pt' ? 'Casos de Uso' : 'Use Cases', description: language === 'pt' ? 'Exemplos práticos para negócios' : 'Practical business examples' },
        { time: 80, title: 'Q&A', description: language === 'pt' ? 'Perguntas e respostas' : 'Questions and answers' }
      ]
    },
    {
      id: 'community-stories-nov-2024',
      title: language === 'pt' ? 'Histórias da Comunidade - Novembro 2024' : 'Community Stories - November 2024',
      description: language === 'pt' ? 'Membros da comunidade partilham as suas experiências em Londres' : 'Community members share their experiences in London',
      category: 'community-events',
      categoryName: language === 'pt' ? 'Eventos Comunitários' : 'Community Events',
      originalStreamDate: '2024-11-20T19:00:00Z',
      duration: 67,
      views: 2156,
      likes: 298,
      host: 'LusoTown Community Team',
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=225&fit=crop',
      youtubeVideoId: 'dQw4w9WgXcQ',
      tags: ['community', 'stories', 'london', 'experiences', 'networking'],
      keyMoments: [
        { time: 8, title: language === 'pt' ? 'História da Ana' : 'Ana\'s Story', description: language === 'pt' ? 'Chegada a Londres' : 'Arrival in London' },
        { time: 25, title: language === 'pt' ? 'Experiência do Miguel' : 'Miguel\'s Experience', description: language === 'pt' ? 'Construindo um negócio' : 'Building a business' },
        { time: 45, title: language === 'pt' ? 'Conselhos da Comunidade' : 'Community Advice', description: language === 'pt' ? 'Dicas para novos chegados' : 'Tips for newcomers' }
      ]
    },
    {
      id: 'student-career-guide-jan-2025',
      title: language === 'pt' ? 'Guia de Carreiras para Estudantes - Janeiro 2025' : 'Student Career Guide - January 2025',
      description: language === 'pt' ? 'Conselhos de carreira e oportunidades para estudantes portugueses no Reino Unido' : 'Career advice and opportunities for Portuguese students in the UK',
      category: 'student-sessions',
      categoryName: language === 'pt' ? 'Sessões de Estudantes' : 'Student Sessions',
      originalStreamDate: '2025-01-15T16:00:00Z',
      duration: 85,
      views: 543,
      likes: 78,
      host: 'Ana Ribeiro',
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop',
      youtubeVideoId: 'dQw4w9WgXcQ',
      tags: ['students', 'career', 'uk', 'advice', 'opportunities'],
      keyMoments: [
        { time: 12, title: language === 'pt' ? 'Mercado de Trabalho UK' : 'UK Job Market', description: language === 'pt' ? 'Panorama atual' : 'Current landscape' },
        { time: 40, title: language === 'pt' ? 'CV e Entrevistas' : 'CV and Interviews', description: language === 'pt' ? 'Dicas práticas' : 'Practical tips' },
        { time: 65, title: language === 'pt' ? 'Networking Estudantil' : 'Student Networking', description: language === 'pt' ? 'Como construir conexões' : 'How to build connections' }
      ]
    },
    {
      id: 'vip-roundtable-dec-2024',
      title: language === 'pt' ? 'Mesa Redonda VIP - Dezembro 2024' : 'VIP Roundtable - December 2024',
      description: language === 'pt' ? 'CEOs portugueses discutem o futuro dos negócios pós-Brexit' : 'Portuguese CEOs discuss the future of post-Brexit business',
      category: 'vip-business',
      categoryName: language === 'pt' ? 'VIP Business' : 'VIP Business',
      originalStreamDate: '2024-12-08T15:00:00Z',
      duration: 135,
      views: 678,
      likes: 124,
      host: 'Miguel Santos & CEOs',
      isPremium: true,
      thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=225&fit=crop',
      youtubeVideoId: 'dQw4w9WgXcQ',
      tags: ['vip', 'ceo', 'business', 'brexit', 'strategy'],
      keyMoments: [
        { time: 20, title: language === 'pt' ? 'Impacto do Brexit' : 'Brexit Impact', description: language === 'pt' ? 'Análise detalhada' : 'Detailed analysis' },
        { time: 55, title: language === 'pt' ? 'Estratégias de Adaptação' : 'Adaptation Strategies', description: language === 'pt' ? 'Como as empresas se adaptaram' : 'How companies adapted' },
        { time: 95, title: language === 'pt' ? 'Futuro dos Negócios' : 'Future of Business', description: language === 'pt' ? 'Perspectivas e oportunidades' : 'Perspectives and opportunities' }
      ]
    }
  ]

  const filteredReplays = replays.filter(replay => {
    const matchesCategory = selectedCategory === 'all' || replay.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      replay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replay.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replay.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const hasReplayAccess = !replay.isPremium || hasAccess
    
    return matchesCategory && matchesSearch && hasReplayAccess
  })

  const sortedReplays = [...filteredReplays].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views
      case 'duration':
        return b.duration - a.duration
      case 'recent':
      default:
        return new Date(b.originalStreamDate).getTime() - new Date(a.originalStreamDate).getTime()
    }
  })

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      'portuguese-culture': Music,
      'business-workshops': Briefcase,
      'community-events': Users,
      'student-sessions': GraduationCap,
      'vip-business': Crown,
      'behind-scenes': Camera
    }
    
    return iconMap[categoryId as keyof typeof iconMap] || Users
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Biblioteca de Replays' : 'Replay Library'}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <PlayIcon className="w-4 h-4" />
          <span>{sortedReplays.length} {language === 'pt' ? 'replays disponíveis' : 'replays available'}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'pt' ? 'Pesquisar replays...' : 'Search replays...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="recent">{language === 'pt' ? 'Mais Recentes' : 'Most Recent'}</option>
            <option value="popular">{language === 'pt' ? 'Mais Populares' : 'Most Popular'}</option>
            <option value="duration">{language === 'pt' ? 'Mais Longos' : 'Longest'}</option>
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FunnelIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Replay Grid */}
      {sortedReplays.length === 0 ? (
        <div className="text-center py-12">
          <PlayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhum replay encontrado' : 'No replays found'}
          </h3>
          <p className="text-gray-500">
            {language === 'pt' 
              ? 'Tente ajustar os filtros ou pesquisa.'
              : 'Try adjusting your filters or search.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {sortedReplays.map((replay, index) => {
            const IconComponent = getCategoryIcon(replay.category)

            return (
              <motion.div
                key={replay.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  <img 
                    src={replay.thumbnail} 
                    alt={replay.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedReplay(replay)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-full transition-all duration-200"
                    >
                      <PlayIcon className="w-8 h-8 text-white ml-1" />
                    </motion.button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {formatDuration(replay.duration)}
                  </div>

                  {/* Premium Badge */}
                  {replay.isPremium && (
                    <div className="absolute top-2 right-2 bg-premium-500 rounded-full p-1">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
                      {replay.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {replay.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      <span>{replay.categoryName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(replay.originalStreamDate)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-3 h-3" />
                        <span>{replay.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="w-3 h-3" />
                        <span>{replay.likes}</span>
                      </div>
                    </div>
                    <span>{language === 'pt' ? 'Com' : 'With'} {replay.host}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {replay.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                        title={language === 'pt' ? 'Guardar' : 'Save'}
                      >
                        <BookmarkIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedReplay(replay)}
                        className="px-3 py-1.5 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        {language === 'pt' ? 'Assistir' : 'Watch'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Premium Content Notice */}
      {!hasAccess && replays.some(r => r.isPremium) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-gradient-to-r from-premium-50 to-coral-50 border border-premium-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="bg-premium-500 p-2 rounded-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {language === 'pt' ? 'Mais Conteúdo Disponível' : 'More Content Available'}
              </div>
              <div className="text-xs text-gray-600">
                {language === 'pt' 
                  ? 'Torne-se membro premium para aceder a replays exclusivos de workshops de negócios e mesas redondas VIP.'
                  : 'Become a premium member to access exclusive replays of business workshops and VIP roundtables.'
                }
              </div>
            </div>
            <a
              href="/subscription"
              className="px-4 py-2 bg-premium-600 text-white text-sm font-medium rounded-lg hover:bg-premium-700 transition-colors whitespace-nowrap"
            >
              {language === 'pt' ? 'Ver Premium' : 'View Premium'}
            </a>
          </div>
        </motion.div>
      )}

      {/* Replay Player Modal */}
      <AnimatePresence>
        {selectedReplay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedReplay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedReplay.youtubeVideoId}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedReplay.title}
                />
              </div>

              {/* Video Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedReplay.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedReplay.description}
                </p>

                {/* Key Moments */}
                {selectedReplay.keyMoments.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Momentos-Chave' : 'Key Moments'}
                    </h3>
                    <div className="space-y-2">
                      {selectedReplay.keyMoments.map((moment, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <div className="text-sm font-medium text-primary-600 min-w-0">
                            {Math.floor(moment.time / 60)}:{(moment.time % 60).toString().padStart(2, '0')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900">{moment.title}</div>
                            <div className="text-xs text-gray-500">{moment.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatDate(selectedReplay.originalStreamDate)}</span>
                    <span>{formatDuration(selectedReplay.duration)}</span>
                    <span>{selectedReplay.views.toLocaleString()} {language === 'pt' ? 'visualizações' : 'views'}</span>
                  </div>
                  <button
                    onClick={() => setSelectedReplay(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {language === 'pt' ? 'Fechar' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}