'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  HomeIcon,
  CheckBadgeIcon,
  EyeIcon,
  ArrowRightIcon,
  FireIcon,
  ClockIcon,
  UserGroupIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

interface CommunityPost {
  id: string
  type: 'event' | 'photo' | 'job' | 'housing' | 'discussion' | 'business' | 'culture'
  author: {
    id: string
    name: string
    avatar: string
    location: string
    verified: boolean
    heritage: 'Portugal' | 'Brazil' | 'Angola' | 'Mozambique' | 'Cape Verde' | 'Guinea-Bissau' | 'UK Diaspora'
    badges?: string[]
  }
  content: string
  images?: string[]
  timestamp: string
  timeAgo: string
  metrics: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  userInteraction: {
    liked: boolean
    saved: boolean
  }
  location?: string
  tags?: string[]
  linkedContent?: {
    type: 'event' | 'business' | 'housing' | 'job'
    id: string
    title: string
    subtitle?: string
    price?: string
    date?: string
  }
  trending?: boolean
  isLive?: boolean
}

export default function CommunityFeedSection() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const feedRef = useRef<HTMLDivElement>(null)

  // Mock community posts with authentic Portuguese-speaking community content
  useEffect(() => {
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        type: 'event',
        author: {
          id: 'maria_santos',
          name: 'Maria Santos',
          avatar: '/images/avatars/default.jpg',
          location: 'Vauxhall, London',
          verified: true,
          heritage: 'Portugal',
          badges: ['Event Host', 'Community Leader']
        },
        content: 'Excited to announce our next Fado night at the Portuguese Cultural Centre! Join us for an evening of traditional music, pastéis de nata, and connecting with fellow Portuguese speakers. Bring your saudade and let\'s create beautiful memories together! 🎵🇵🇹',
        images: ['https://images.unsplash.com/photo-1567336273898-ebbf9eb3c2bf?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date().toISOString(),
        timeAgo: '2 hours ago',
        metrics: { likes: 47, comments: 12, shares: 8, views: 234 },
        userInteraction: { liked: false, saved: false },
        location: 'Vauxhall, London',
        tags: ['#FadoNight', '#PortugueseCulture', '#LondonEvents'],
        linkedContent: {
          type: 'event',
          id: 'fado_night_march',
          title: 'Traditional Fado Night',
          subtitle: 'Portuguese Cultural Centre',
          date: 'March 15, 7:30 PM'
        },
        trending: true
      },
      {
        id: '2',
        type: 'photo',
        author: {
          id: 'joao_silva',
          name: 'João Silva',
          avatar: '/images/avatars/default.jpg',
          location: 'Stockwell, London',
          verified: true,
          heritage: 'Brazil',
          badges: ['Food Enthusiast']
        },
        content: 'Found the most authentic pastéis de nata outside of Portugal at this hidden gem in Borough Market! The owner is from Porto and uses his grandmother\'s recipe. Already planning my next visit! Who wants to join? 🥮✨',
        images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        timeAgo: '4 hours ago',
        metrics: { likes: 89, comments: 23, shares: 15, views: 456 },
        userInteraction: { liked: true, saved: true },
        location: 'Borough Market, London',
        tags: ['#PasteisDeNata', '#PortugueseFood', '#BoroughMarket'],
        linkedContent: {
          type: 'business',
          id: 'porto_bakery',
          title: 'Porto Authentic Bakery',
          subtitle: 'Traditional Portuguese pastries'
        }
      },
      {
        id: '3',
        type: 'job',
        author: {
          id: 'ana_costa',
          name: 'Ana Costa',
          avatar: '/images/avatars/default.jpg',
          location: 'Canary Wharf, London',
          verified: true,
          heritage: 'Portugal',
          badges: ['HR Professional', 'Recruiter']
        },
        content: 'Exciting opportunity at my company! We\'re looking for a Portuguese-speaking Customer Success Manager. Perfect for someone who understands both Portuguese and Brazilian markets. Remote-friendly with office in Canary Wharf. DM me for details! 💼',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        timeAgo: '6 hours ago',
        metrics: { likes: 34, comments: 18, shares: 22, views: 178 },
        userInteraction: { liked: false, saved: true },
        location: 'Canary Wharf, London',
        tags: ['#JobOpportunity', '#PortugueseSpeaking', '#CustomerSuccess'],
        linkedContent: {
          type: 'job',
          id: 'cs_manager_role',
          title: 'Customer Success Manager',
          subtitle: 'Fintech Company',
          price: '£45k - £55k'
        }
      },
      {
        id: '4',
        type: 'housing',
        author: {
          id: 'carlos_mendes',
          name: 'Carlos Mendes',
          avatar: '/images/avatars/default.jpg',
          location: 'Elephant & Castle, London',
          verified: true,
          heritage: 'Angola',
          badges: ['Property Expert']
        },
        content: 'Beautiful 2-bedroom flat available in Elephant & Castle! Perfect for Portuguese speakers - there\'s a strong community here. Walking distance to Portuguese shops and the Mercado restaurant. Looking for respectful tenants who appreciate good neighbours. 🏠',
        images: ['https://images.unsplash.com/photo-1567336273898-ebbf9eb3c2bf?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        timeAgo: '8 hours ago',
        metrics: { likes: 56, comments: 31, shares: 19, views: 389 },
        userInteraction: { liked: false, saved: false },
        location: 'Elephant & Castle, London',
        tags: ['#HousingLondon', '#PortugueseCommunity', '#ElephantCastle'],
        linkedContent: {
          type: 'housing',
          id: 'flat_elephant_2bed',
          title: '2-Bedroom Flat Available',
          subtitle: 'Elephant & Castle',
          price: '£1,800/month'
        }
      },
      {
        id: '5',
        type: 'culture',
        author: {
          id: 'fernanda_oliveira',
          name: 'Fernanda Oliveira',
          avatar: '/images/avatars/default.jpg',
          location: 'Camden, London',
          verified: true,
          heritage: 'Brazil',
          badges: ['Embaixadora Cultural', 'Professora de Idiomas']
        },
        content: '🇧🇷 Ensinei os meus amigos ingleses sobre as tradições da Festa Junina hoje! Fiz pamonha, dançámos quadrilha e expliquei porque saltamos por cima das fogueiras. As caras deles quando provaram paçoca pela primeira vez! 😂 Amo partilhar a nossa cultura linda aqui em Londres! A saudade do Brasil fica mais leve quando partilhamos as nossas tradições. 🎪🌽 #BrasileirosEmLondres',
        images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        timeAgo: '12 hours ago',
        metrics: { likes: 127, comments: 45, shares: 33, views: 678 },
        userInteraction: { liked: true, saved: false },
        location: 'Camden, London',
        tags: ['#FestaJunina', '#CulturaBrasileira', '#BrasileirosEmLondres'],
        isLive: false
      },
      {
        id: '6',
        type: 'discussion',
        author: {
          id: 'miguel_rodrigues',
          name: 'Miguel Rodrigues',
          avatar: '/images/avatars/default.jpg',
          location: 'Brixton, London',
          verified: true,
          heritage: 'Cape Verde',
          badges: ['Community Moderator']
        },
        content: 'Had an interesting conversation about maintaining our mother tongue while living abroad. How do you keep Portuguese alive in your daily life here in London? My kids are starting to prefer English, and I want them to stay connected to our roots. Any tips? 🤔',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        timeAgo: '18 hours ago',
        metrics: { likes: 73, comments: 58, shares: 12, views: 456 },
        userInteraction: { liked: false, saved: true },
        location: 'Brixton, London',
        tags: ['#PortugueseLanguage', '#Parenting', '#CulturalIdentity'],
        trending: true
      },
      {
        id: '7',
        type: 'event',
        author: {
          id: 'rita_pereira',
          name: 'Rita Pereira',
          avatar: '/images/avatars/default.jpg',
          location: 'Notting Hill, London',
          verified: true,
          heritage: 'Portugal',
          badges: ['Organizadora de Eventos', 'Adepta de Futebol']
        },
        content: '🇵🇹 JOGO DE PORTUGAL AMANHÃ! ⚽ Festa no pub português em Notting Hill. Ecrã grande, Super Bock à pressão e comentários apaixonados garantidos! Venham celebrar os nossos rapazes de vermelho e verde! Força Portugal! A união faz a força, principalmente aqui em Londres longe da nossa terra. Que bela forma de matar as saudades! 💪 #PortugalCaralho',
        images: ['https://images.unsplash.com/photo-1567336273898-ebbf9eb3c2bf?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
        timeAgo: '22 hours ago',
        metrics: { likes: 156, comments: 67, shares: 44, views: 892 },
        userInteraction: { liked: true, saved: true },
        location: 'Notting Hill, London',
        tags: ['#PortugalCaralho', '#Futebol', '#TugasEmLondres'],
        linkedContent: {
          type: 'event',
          id: 'portugal_match_watch',
          title: 'Portugal vs Espanha - Ver Juntos',
          subtitle: 'The Portuguese Pub',
          date: 'Amanhã, 20:00'
        },
        isLive: true
      },
      {
        id: '8',
        type: 'culture',
        author: {
          id: 'carlos_lisboa',
          name: 'Carlos Lisboa',
          avatar: '/images/avatars/default.jpg',
          location: 'Stockwell, London',
          verified: true,
          heritage: 'Portugal',
          badges: ['Mestre Fadista', 'Guia Turístico']
        },
        content: '🇵🇹 Ontem foi noite de fado no nosso quintal português aqui em Stockwell! Que saudades senti da minha Lisboa quando a guitarra começou a chorar... A Mariazinha cantou "Lágrima" e não houve olho seco. É isto que nos faz portugueses: a capacidade de transformar a dor em beleza. Aqui em Londres, o fado ganha um sabor especial - mistura-se a saudade da terra com a esperança do futuro. 🎸💔 #FadoEmLondres #Saudade',
        images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        timeAgo: '1 day ago',
        metrics: { likes: 203, comments: 67, shares: 45, views: 1024 },
        userInteraction: { liked: true, saved: true },
        location: 'Stockwell, London',
        tags: ['#FadoEmLondres', '#Saudade', '#CulturaPortuguesa'],
        isLive: false
      },
      {
        id: '9',
        type: 'culture',
        author: {
          id: 'luciana_santos',
          name: 'Luciana Santos',
          avatar: '/images/avatars/default.jpg',
          location: 'Elephant & Castle, London',
          verified: true,
          heritage: 'Brazil',
          badges: ['Chef Brasileira', 'Influencer Gastronômica']
        },
        content: '🇧🇷 Gente, hoje fiz um almoço de domingo brasileiro completo aqui em Londres! Feijoada, farofa, couve, laranja... Os ingleses da vizinhança vieram provar e ficaram apaixonados! Uma senhora me disse que nunca tinha comido algo tão saboroso. Chorei de emoção! É assim que levamos o Brasil no coração: um prato de cada vez, uma história de cada vez. Quem aí tá sentindo cheiro de dendê? 😭❤️ #BrasilNoPrato #SaudadeBoa',
        images: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center'],
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        timeAgo: '1 day ago',
        metrics: { likes: 289, comments: 89, shares: 67, views: 1456 },
        userInteraction: { liked: false, saved: true },
        location: 'Elephant & Castle, London',
        tags: ['#BrasilNoPrato', '#Feijoada', '#CozinhaBrasileira'],
        isLive: false
      },
      {
        id: '10',
        type: 'discussion',
        author: {
          id: 'maria_porto',
          name: 'Maria do Porto',
          avatar: '/images/avatars/default.jpg',
          location: 'Camden, London',
          verified: true,
          heritage: 'Portugal',
          badges: ['Professora', 'Mãe Portuguesa']
        },
        content: '🇵🇹 Alguém mais aqui luta para que os filhos não percam o sotaque português? O meu pequeno já começa a dizer "mum" em vez de "mãe" e o coração aperta-se-me todo... Como é que mantemos viva a nossa língua quando estamos rodeados de inglês? Preciso de dicas das outras mães portuguesas! A nossa identidade passa tanto pela forma como falamos... #MãesPortuguesasEmLondres #LínguaMaterna',
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        timeAgo: '1 day ago',
        metrics: { likes: 156, comments: 94, shares: 23, views: 789 },
        userInteraction: { liked: true, saved: false },
        location: 'Camden, London',
        tags: ['#MãesPortuguesas', '#LínguaPortuguesa', '#Identidade'],
        trending: true
      }
    ]

    // Simulate loading delay
    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filters = [
    { id: 'all', label: 'All', icon: UserGroupIcon, count: posts.length },
    { id: 'event', label: 'Events', icon: CalendarDaysIcon, count: posts.filter(p => p.type === 'event').length },
    { id: 'photo', label: 'Photos', icon: EyeIcon, count: posts.filter(p => p.type === 'photo').length },
    { id: 'job', label: 'Jobs', icon: BriefcaseIcon, count: posts.filter(p => p.type === 'job').length },
    { id: 'housing', label: 'Housing', icon: HomeIcon, count: posts.filter(p => p.type === 'housing').length },
    { id: 'culture', label: 'Culture', icon: HeartIcon, count: posts.filter(p => p.type === 'culture').length }
  ]

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeFilter)

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            metrics: {
              ...post.metrics,
              likes: post.userInteraction.liked ? post.metrics.likes - 1 : post.metrics.likes + 1
            },
            userInteraction: {
              ...post.userInteraction,
              liked: !post.userInteraction.liked
            }
          }
        : post
    ))
  }

  const getHeritageFlag = (heritage: string) => {
    const flags: Record<string, string> = {
      'Portugal': '🇵🇹',
      'Brazil': '🇧🇷', 
      'Angola': '🇦🇴',
      'Mozambique': '🇲🇿',
      'Cape Verde': '🇨🇻',
      'Guinea-Bissau': '🇬🇼',
      'UK Diaspora': '🇬🇧'
    }
    return flags[heritage] || '🌍'
  }

  const getPostTypeIcon = (type: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      'event': CalendarDaysIcon,
      'photo': EyeIcon,
      'job': BriefcaseIcon,
      'housing': HomeIcon,
      'culture': HeartIcon,
      'discussion': ChatBubbleLeftRightIcon,
      'business': MapPinIcon
    }
    return icons[type] || ChatBubbleLeftRightIcon
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-secondary-50/20 to-accent-50/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-lg mb-4 max-w-2xl mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-lg max-w-xl mx-auto animate-pulse"></div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2 max-w-xs"></div>
                      <div className="h-3 bg-gray-200 rounded max-w-24"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-secondary-50/20 to-accent-50/20 relative overflow-hidden">
      {/* Portuguese-inspired background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 via-accent-100/20 to-coral-100/20 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/30 via-secondary-100/20 to-accent-100/20 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/40 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/40 rounded-full opacity-30" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/40 rounded-full opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-lg mb-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm" aria-hidden="true"></div>
                <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                  {t('community_feed.badge')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FireIcon className="w-4 h-4 text-coral-500 animate-pulse" />
                <span className="text-xs text-coral-600 font-semibold">Live</span>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t('community_feed.title')}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 mb-4 font-medium max-w-3xl mx-auto leading-relaxed">
              {t('community_feed.subtitle')}
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('community_feed.description')}
            </p>
          </header>

          {/* Feed Filters */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max px-2 pb-2">
              {filters.map(filter => {
                const Icon = filter.icon
                const isActive = activeFilter === filter.id
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white shadow-lg transform scale-105' 
                        : 'bg-white/80 text-gray-700 hover:bg-secondary-50 border border-gray-200/60 hover:border-secondary-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Community Feed */}
          <div ref={feedRef} className="space-y-6 mb-12">
            {filteredPosts.map(post => {
              const PostTypeIcon = getPostTypeIcon(post.type)
              return (
                <article key={post.id} className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-sm border border-white/60 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                            <Image 
                              src={post.author.avatar || '/images/avatars/default.jpg'}
                              alt={post.author.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {post.author.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <CheckBadgeIcon className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{post.author.name}</h4>
                            <span className="text-lg" title={`Heritage: ${post.author.heritage}`}>
                              {getHeritageFlag(post.author.heritage)}
                            </span>
                            {post.trending && (
                              <div className="flex items-center gap-1 bg-coral-100 text-coral-700 text-xs px-2 py-0.5 rounded-full">
                                <FireIcon className="w-3 h-3" />
                                <span>Trending</span>
                              </div>
                            )}
                            {post.isLive && (
                              <div className="flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full animate-pulse">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span>Live</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPinIcon className="w-3 h-3" />
                            <span className="truncate">{post.author.location}</span>
                            <span>•</span>
                            <ClockIcon className="w-3 h-3" />
                            <span>{post.timeAgo}</span>
                          </div>
                          {post.author.badges && post.author.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.author.badges.map(badge => (
                                <span key={badge} className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <div className={`p-2 rounded-lg ${
                          post.type === 'event' ? 'bg-secondary-100 text-secondary-600' :
                          post.type === 'photo' ? 'bg-accent-100 text-accent-600' :
                          post.type === 'job' ? 'bg-premium-100 text-premium-600' :
                          post.type === 'housing' ? 'bg-coral-100 text-coral-600' :
                          post.type === 'culture' ? 'bg-action-100 text-action-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <PostTypeIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line">{post.content}</p>
                    
                    {/* Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        {post.images.length === 1 ? (
                          <div className="relative h-64 sm:h-80">
                            <Image 
                              src={post.images[0] || '/images/placeholder.jpg'}
                              alt="Post image" 
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {post.images.slice(0, 4).map((image, index) => (
                              <div key={index} className="relative h-32 sm:h-40">
                                <Image 
                                  src={image || '/images/placeholder.jpg'}
                                  alt={`Post image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                {index === 3 && post.images!.length > 4 && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-semibold">+{post.images!.length - 4}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Linked Content */}
                    {post.linkedContent && (
                      <div className="bg-gradient-to-r from-secondary-50/60 to-accent-50/60 rounded-xl p-4 mb-4 border border-secondary-100/60">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg">
                            {post.linkedContent.type === 'event' && <CalendarDaysIcon className="w-5 h-5 text-secondary-600" />}
                            {post.linkedContent.type === 'business' && <MapPinIcon className="w-5 h-5 text-secondary-600" />}
                            {post.linkedContent.type === 'job' && <BriefcaseIcon className="w-5 h-5 text-secondary-600" />}
                            {post.linkedContent.type === 'housing' && <HomeIcon className="w-5 h-5 text-secondary-600" />}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{post.linkedContent.title}</h5>
                            {post.linkedContent.subtitle && (
                              <p className="text-sm text-gray-600">{post.linkedContent.subtitle}</p>
                            )}
                            {post.linkedContent.price && (
                              <p className="text-sm font-medium text-secondary-600">{post.linkedContent.price}</p>
                            )}
                            {post.linkedContent.date && (
                              <p className="text-sm text-gray-600">{post.linkedContent.date}</p>
                            )}
                          </div>
                          <button className="text-secondary-600 hover:text-secondary-700 font-medium text-sm flex items-center gap-1">
                            View
                            <ArrowRightIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-secondary-600 hover:text-secondary-700 cursor-pointer text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Post Metrics */}
                  <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          {post.metrics.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          {post.metrics.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <ShareIcon className="w-4 h-4" />
                          {post.metrics.shares}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{post.metrics.views} views</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                          post.userInteraction.liked 
                            ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        {post.userInteraction.liked ? (
                          <HeartSolid className="w-5 h-5" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                        <span>Like</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg font-medium text-sm transition-all duration-300">
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        <span>Comment</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-accent-600 hover:bg-accent-50 rounded-lg font-medium text-sm transition-all duration-300">
                        <ShareIcon className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Call-to-Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/90 via-secondary-50/60 to-accent-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-8 lg:p-12 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('community_feed.cta.title')}
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {t('community_feed.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ROUTES.signup}
                  className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t('community_feed.cta.join_button')}
                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href={ROUTES.events}
                  className="text-lg font-bold px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  {t('community_feed.cta.browse_button')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}