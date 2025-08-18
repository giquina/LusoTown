'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, PlayIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Briefcase, GraduationCap, Music, Camera, Lock, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import StreamCard from './StreamCard'

interface Stream {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  host: string
  thumbnail: string
  viewerCount: number
  isLive: boolean
  isPremium: boolean
  hlsUrl?: string
  youtubeVideoId?: string
  region?: 'portugal' | 'brazil' | 'africa' | 'diaspora'
  language: 'pt' | 'en'
  tags: string[]
  startedAt?: string
  scheduledStart?: string
  duration?: number
}

interface StreamGridProps {
  category: string
  filter: 'all' | 'live' | 'upcoming' | 'featured'
  sortBy: 'recent' | 'popular' | 'viewers'
  searchQuery?: string
}

export default function StreamGrid({ category, filter, sortBy, searchQuery = '' }: StreamGridProps) {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const hasAccess = hasActiveSubscription || isInTrial

  // Mock streams data with Portuguese focus
  const allStreams: Stream[] = [
    {
      id: 'fado-live-tonight',
      title: t('streaming.cultural-content', 'Cultural Content') + ': ' + (language === 'pt' ? 'Noite de Fado ao Vivo' : 'Live Fado Night'),
      description: language === 'pt' ? 'Música tradicional portuguesa com artistas de Lisboa' : 'Traditional Portuguese music with artists from Lisbon',
      category: 'portuguese-culture',
      categoryName: t('streaming.cultural-content', 'Cultural Content'),
      host: 'Maria Santos',
      thumbnail: '/events/art-tour.jpg',
      viewerCount: 234,
      isLive: true,
      isPremium: false,
      hlsUrl: 'https://demo.com/fado-live.m3u8',
      region: 'portugal',
      language: 'pt',
      tags: ['fado', 'music', 'traditional', 'portugal'],
      startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: 'business-ai-workshop',
      title: language === 'pt' ? 'Workshop de IA para Negócios Portugueses' : 'AI Workshop for Portuguese Businesses',
      description: language === 'pt' ? 'Como implementar IA no seu negócio em Londres' : 'How to implement AI in your London business',
      category: 'business-workshops',
      categoryName: t('streaming.business-workshops', 'Business Workshops'),
      host: 'Carlos Mendes',
      thumbnail: '/events/book-club.jpg',
      viewerCount: 0,
      isLive: false,
      isPremium: true,
      region: 'diaspora',
      language: 'pt',
      tags: ['ai', 'business', 'workshop', 'technology'],
      scheduledStart: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 90
    },
    {
      id: 'student-careers-session',
      title: language === 'pt' ? 'Sessão de Carreiras - Estudantes Portugueses UK' : 'Career Session - Portuguese Students UK',
      description: language === 'pt' ? 'Conselhos de carreira para estudantes portugueses no Reino Unido' : 'Career advice for Portuguese students in the UK',
      category: 'student-sessions',
      categoryName: t('streaming.student-sessions', 'Student Sessions'),
      host: 'Ana Ribeiro',
      thumbnail: '/events/yoga.jpg',
      viewerCount: 89,
      isLive: true,
      isPremium: false,
      region: 'diaspora',
      language: 'pt',
      tags: ['students', 'career', 'uk', 'advice'],
      startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
      id: 'community-coffee-chat',
      title: language === 'pt' ? 'Café Comunitário - Conhece a Comunidade' : 'Community Coffee - Meet the Community',
      description: language === 'pt' ? 'Conversas informais com portugueses em Londres' : 'Informal chats with Portuguese speakers in London',
      category: 'community-events',
      categoryName: t('streaming.community-events', 'Community Events'),
      host: 'LusoTown Community',
      thumbnail: '/events/networking.jpg',
      viewerCount: 156,
      isLive: true,
      isPremium: false,
      region: 'diaspora',
      language: 'pt',
      tags: ['community', 'networking', 'london', 'coffee'],
      startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: 'vip-business-roundtable',
      title: language === 'pt' ? 'Mesa Redonda VIP: Futuro dos Negócios Luso-Britânicos' : 'VIP Roundtable: Future of Luso-British Business',
      description: language === 'pt' ? 'CEOs discutem oportunidades pós-Brexit' : 'CEOs discuss post-Brexit opportunities',
      category: 'vip-business',
      categoryName: t('streaming.vip-exclusive', 'VIP Exclusive'),
      host: 'Miguel Santos & CEOs',
      thumbnail: '/events/jazz-networking.jpg',
      viewerCount: 0,
      isLive: false,
      isPremium: true,
      region: 'diaspora',
      language: 'pt',
      tags: ['vip', 'ceo', 'business', 'brexit'],
      scheduledStart: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      duration: 120
    },
    {
      id: 'brazilian-culture-festival',
      title: language === 'pt' ? 'Festival da Cultura Brasileira em Londres' : 'Brazilian Culture Festival in London',
      description: language === 'pt' ? 'Celebrando a diversidade cultural luso-brasileira' : 'Celebrating Luso-Brazilian cultural diversity',
      category: 'portuguese-culture',
      categoryName: t('streaming.cultural-content', 'Cultural Content'),
      host: 'Casa do Brasil',
      thumbnail: '/events/art-tour.jpg',
      viewerCount: 312,
      isLive: true,
      isPremium: false,
      region: 'brazil',
      language: 'pt',
      tags: ['brazil', 'culture', 'festival', 'london'],
      startedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    }
  ]

  // Filter streams based on criteria
  const filteredStreams = allStreams.filter(stream => {
    // Category filter
    const matchesCategory = category === 'all' || stream.category === category
    
    // Status filter
    let matchesFilter = true
    switch (filter) {
      case 'live':
        matchesFilter = stream.isLive
        break
      case 'upcoming':
        matchesFilter = !stream.isLive && stream.scheduledStart
        break
      case 'featured':
        matchesFilter = stream.viewerCount > 100 || stream.isPremium
        break
    }
    
    // Access filter - only show premium content if user has access
    const hasStreamAccess = !stream.isPremium || hasAccess
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesFilter && hasStreamAccess && matchesSearch
  })

  // Sort streams
  const sortedStreams = [...filteredStreams].sort((a, b) => {
    switch (sortBy) {
      case 'viewers':
        return b.viewerCount - a.viewerCount
      case 'popular':
        return (b.viewerCount * (b.isLive ? 2 : 1)) - (a.viewerCount * (a.isLive ? 2 : 1))
      case 'recent':
      default:
        const aTime = a.startedAt || a.scheduledStart || '0'
        const bTime = b.startedAt || b.scheduledStart || '0'
        return new Date(bTime).getTime() - new Date(aTime).getTime()
    }
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500)
  }, [category, filter, sortBy])

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

  const getRegionFlag = (region?: string) => {
    switch (region) {
      case 'portugal': return '🇵🇹'
      case 'brazil': return '🇧🇷'
      case 'africa': return '🌍'
      case 'diaspora': return '🌐'
      default: return '🇵🇹'
    }
  }

  const formatViewerCount = (count: number) => {
    if (count === 0) return '0'
    if (count < 1000) return count.toString()
    return `${(count / 1000).toFixed(1)}k`
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return ''
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (sortedStreams.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('streaming.no-streams', 'No streams available')}
        </h3>
        <p className="text-gray-500 mb-6">
          {searchQuery 
            ? (language === 'pt' ? `Nenhum stream encontrado para "${searchQuery}"` : `No streams found for "${searchQuery}"`)
            : (category === 'all' 
                ? t('streaming.no-streams', 'No streams available')
                : t('streaming.no-streams-category', 'No streams in this category')
              )
          }
        </p>
        {!hasAccess && (
          <a
            href="/subscription"
            className="inline-flex items-center gap-2 px-6 py-3 bg-premium-600 text-white rounded-lg hover:bg-premium-700 transition-colors"
          >
            <Crown className="w-5 h-5" />
            <span>{language === 'pt' ? 'Ver Conteúdo Premium' : 'View Premium Content'}</span>
          </a>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {sortedStreams.map((stream, index) => (
        <StreamCard
          key={stream.id}
          stream={stream}
          hasAccess={hasAccess}
          onSelect={setSelectedStream}
          delay={index * 0.1}
        />
      ))}
      
      {/* Premium Content Promotion */}
      {!hasAccess && category === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (sortedStreams.length * 0.1) + 0.2 }}
          className="bg-gradient-to-br from-premium-50 to-coral-50 border-2 border-dashed border-premium-300 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[280px]"
        >
          <div className="bg-premium-100 p-4 rounded-full mb-4">
            <Crown className="w-8 h-8 text-premium-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">
            {t('streaming.premium-required', 'Premium subscription required')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {language === 'pt' 
              ? 'Desbloqueie workshops exclusivos, mesas redondas VIP e muito mais.'
              : 'Unlock exclusive workshops, VIP roundtables, and more.'
            }
          </p>
          <a
            href="/subscription"
            className="px-4 py-2 bg-premium-600 text-white text-sm font-medium rounded-lg hover:bg-premium-700 transition-colors"
          >
            {t('streaming.upgrade-to-watch', 'Upgrade to watch')}
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}