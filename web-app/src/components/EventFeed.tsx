'use client'

import { ROUTES, buildUnsplashUrl } from '@/config';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  HeartIcon as HeartOutlineIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  PhotoIcon,
  ClockIcon,
  StarIcon,
  EyeIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import FavoriteButton from '@/components/FavoriteButton'
import { formatEventDate } from '@/lib/dateUtils'

export interface EventFeedPost {
  id: string
  type: 'event_created' | 'event_update' | 'event_photo' | 'event_review' | 'event_reminder' | 'user_joined' | 'event_full'
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImage?: string
  eventPrice: number
  eventCategory: string
  eventSpotsLeft: number
  eventMaxAttendees: number
  hostName: string
  hostImage?: string
  hostVerified?: boolean
  content: string
  images?: string[]
  createdAt: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  userId?: string
  userName?: string
  userImage?: string
  priority: 'high' | 'medium' | 'low'
  isSponsored?: boolean
  reactions: {
    interested: number
    love: number
    going: number
    wow: number
  }
}

// Mock event feed posts focused on real-life meetups
const generateEventFeedPosts = (): EventFeedPost[] => [
  {
    id: 'feed-event-1',
    type: 'event_created',
    eventId: 'event-pt-1',
    eventTitle: 'Noite de Fado & Vinho Verde - Authentic Portuguese Night',
    eventDate: '2025-08-16',
    eventTime: '19:00',
    eventLocation: 'A Toca Restaurant, Stockwell',
    eventImage: buildUnsplashUrl('1493225457124-a3eb161ffa5f'),
    eventPrice: 45,
    eventCategory: 'Music & Entertainment',
    eventSpotsLeft: 13,
    eventMaxAttendees: 35,
    hostName: 'Miguel Santos',
    hostImage: buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
    hostVerified: true,
    content: 'Estou muito entusiasmado em anunciar a nossa próxima noite de Fado! Teremos a fadista Maria Fernandes diretamente de Lisboa, acompanhada por guitarristas autênticos. Incluímos jantar tradicional português e degustação de Vinho Verde. Será uma noite especial para celebrar a nossa cultura! 🎶🍷 #FadoNight #PortugueseCulture #LittlePortugal',
    images: [
      buildUnsplashUrl('1544551763-46a013bb70d5'),
      buildUnsplashUrl('1571019613454-1cb2f99b2d8b')
    ],
    createdAt: '2 hours ago',
    likes: 34,
    comments: 12,
    shares: 8,
    liked: false,
    priority: 'high',
    isSponsored: false,
    reactions: {
      interested: 28,
      love: 15,
      going: 22,
      wow: 6
    }
  },
  {
    id: 'feed-event-2',
    type: 'user_joined',
    eventId: 'event-pt-2',
    eventTitle: 'Portugal vs Spain - Euro Qualifiers Viewing',
    eventDate: '2025-08-19',
    eventTime: '19:45',
    eventLocation: 'The Fentiman Arms, Vauxhall',
    eventImage: buildUnsplashUrl('1574629810360-7efbbe195018'),
    eventPrice: 15,
    eventCategory: 'Sports Viewing',
    eventSpotsLeft: 12,
    eventMaxAttendees: 40,
    hostName: 'Ricardo Ferreira',
    hostImage: buildUnsplashUrl('1472099645785-5658abf4ff4e'),
    content: 'Acabei de me inscrever para ver o grande jogo! Vai ser épico! Bifanas e Super Bock esperando por todos nós. Força Portugal! 🇵🇹⚽',
    createdAt: '4 hours ago',
    likes: 19,
    comments: 6,
    shares: 3,
    liked: true,
    userId: 'user-carlos',
    userName: 'Carlos Oliveira',
    userImage: buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
    priority: 'medium',
    reactions: {
      interested: 15,
      love: 8,
      going: 28,
      wow: 2
    }
  },
  {
    id: 'feed-event-3',
    type: 'event_full',
    eventId: 'event-pt-3',
    eventTitle: 'Mulheres Falantes de Português 30+ - Wine & Stories',
    eventDate: '2025-08-17',
    eventTime: '18:30',
    eventLocation: 'Champor-Champor Restaurant, Elephant & Castle',
    eventImage: buildUnsplashUrl('1470337458703-46ad1756a187'),
    eventPrice: 38,
    eventCategory: 'Wine & Dining',
    eventSpotsLeft: 0,
    eventMaxAttendees: 12,
    hostName: 'Fernanda Costa',
    hostImage: buildUnsplashUrl('1580489944761-15a19d654956'),
    hostVerified: true,
    content: 'O nosso evento íntimo para mulheres portuguesas está LOTADO! 🎉 Mas temos waitlist disponível. Esta vai ser uma noite especial de conexões autênticas e vinhos dos países lusófonos. Próximo evento já está sendo planejado para setembro!',
    createdAt: '6 hours ago',
    likes: 28,
    comments: 15,
    shares: 5,
    liked: false,
    priority: 'high',
    reactions: {
      interested: 45,
      love: 22,
      going: 12,
      wow: 8
    }
  },
  {
    id: 'feed-event-4',
    type: 'event_photo',
    eventId: 'event-pt-4',
    eventTitle: 'Portuguese Language Exchange & Cocktails',
    eventDate: '2025-08-20',
    eventTime: '18:00',
    eventLocation: 'Bar Elixir, Battersea Power Station',
    eventImage: buildUnsplashUrl('1514933651103-005eec06c04b'),
    eventPrice: 8,
    eventCategory: 'Language Exchange',
    eventSpotsLeft: 14,
    eventMaxAttendees: 45,
    hostName: 'Joana Ribeiro',
    hostImage: buildUnsplashUrl('1494790108755-2616b612b1ac'),
    content: 'Sneak peek dos cocktails especiais do próximo Language Exchange! 🍹 O Caipirinha Tropical e o Porto Tónico estão incríveis. Cada drink conta uma história cultural. Ainda temos vagas!',
    images: [
      buildUnsplashUrl('1567696911980-2eed69a46042'),
      buildUnsplashUrl('1582268611958-ebfd161ef9cf'),
      buildUnsplashUrl('1514362545857-3bc16c4c7d1b')
    ],
    createdAt: '8 hours ago',
    likes: 31,
    comments: 8,
    shares: 12,
    liked: true,
    priority: 'medium',
    reactions: {
      interested: 20,
      love: 18,
      going: 31,
      wow: 12
    }
  },
  {
    id: 'feed-event-5',
    type: 'event_reminder',
    eventId: 'event-pt-5',
    eventTitle: 'Festa de São João Londrina - Portuguese Mid-Summer Festival',
    eventDate: '2025-08-23',
    eventTime: '18:00',
    eventLocation: 'Portuguese Club of London, Bayswater',
    eventImage: buildUnsplashUrl('1578662996442-48f60103fc96'),
    eventPrice: 55,
    eventCategory: 'Cultural Events',
    eventSpotsLeft: 28,
    eventMaxAttendees: 80,
    hostName: 'António Pereira',
    hostImage: buildUnsplashUrl('1560250097-0b93528c311a'),
    hostVerified: true,
    content: 'LEMBRETE: Só faltam 7 dias para a nossa Festa de São João! 🔨✨ Já temos sardinhas frescas encomendadas, a decoração tradicional está quase pronta, e a fogueira será acesa no pátio do clube. Tragam os vossos martelos de plástico para a tradição da sorte! Últimas vagas disponíveis.',
    createdAt: '12 hours ago',
    likes: 43,
    comments: 18,
    shares: 15,
    liked: false,
    priority: 'high',
    reactions: {
      interested: 35,
      love: 28,
      going: 52,
      wow: 15
    }
  },
  {
    id: 'feed-event-6',
    type: 'event_review',
    eventId: 'event-pt-6',
    eventTitle: 'Portuguese Business Networking Breakfast',
    eventDate: '2025-08-21',
    eventTime: '08:00',
    eventLocation: 'O Cantinho de Portugal, Stockwell',
    eventImage: buildUnsplashUrl('1556909114-f6e7ad7d3136'),
    eventPrice: 25,
    eventCategory: 'Professional Meetups',
    eventSpotsLeft: 7,
    eventMaxAttendees: 25,
    hostName: 'Patrícia Gomes',
    hostImage: buildUnsplashUrl('1573496359142-b8d87734a5a2'),
    content: '⭐⭐⭐⭐⭐ Review do último networking breakfast: "Conexões autênticas, pastéis de nata divinos, e oportunidades de negócio reais. A Patrícia sabe como juntar as pessoas certas!" - João M., Empresário. Próximo breakfast tem foco em "Digital Innovation". Inscrições abertas!',
    createdAt: '1 day ago',
    likes: 16,
    comments: 4,
    shares: 7,
    liked: false,
    priority: 'low',
    reactions: {
      interested: 18,
      love: 12,
      going: 18,
      wow: 5
    }
  }
]

interface EventFeedProps {
  className?: string
  limit?: number
}

export default function EventFeed({ className = '', limit }: EventFeedProps) {
  const { language } = useLanguage()
  const { isFavorite } = useFavorites()
  const [posts, setPosts] = useState<EventFeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'going' | 'interested' | 'nearby'>('all')
  
  const isPortuguese = language === 'pt'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let allPosts = generateEventFeedPosts()
      if (limit) {
        allPosts = allPosts.slice(0, limit)
      }
      setPosts(allPosts)
      setLoading(false)
    }, 1000)
  }, [limit])

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ))
  }

  const handleReaction = (postId: string, reactionType: keyof EventFeedPost['reactions']) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + 1
            }
          } 
        : post
    ))
  }

  const getPostTypeIcon = (type: EventFeedPost['type']) => {
    switch (type) {
      case 'event_created':
        return <CalendarDaysIcon className="w-4 h-4 text-green-500" />
      case 'event_update':
        return <ClockIcon className="w-4 h-4 text-primary-500" />
      case 'event_photo':
        return <PhotoIcon className="w-4 h-4 text-purple-500" />
      case 'event_review':
        return <StarIcon className="w-4 h-4 text-yellow-500" />
      case 'event_reminder':
        return <ClockIcon className="w-4 h-4 text-orange-500" />
      case 'user_joined':
        return <UserGroupIcon className="w-4 h-4 text-secondary-500" />
      case 'event_full':
        return <EyeIcon className="w-4 h-4 text-red-500" />
      default:
        return <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getPostTypeLabel = (type: EventFeedPost['type']) => {
    const labels = {
      'event_created': isPortuguese ? 'Novo Evento' : 'New Event',
      'event_update': isPortuguese ? 'Atualização' : 'Update',
      'event_photo': isPortuguese ? 'Fotos' : 'Photos',
      'event_review': isPortuguese ? 'Avaliação' : 'Review',
      'event_reminder': isPortuguese ? 'Lembrete' : 'Reminder',
      'user_joined': isPortuguese ? 'Novo Participante' : 'Someone Joined',
      'event_full': isPortuguese ? 'Evento Lotado' : 'Event Full'
    }
    return labels[type] || 'Update'
  }

  const formatDate = (dateString: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateString, isPortuguese)
  }
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-48 bg-gray-200 rounded-lg mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Bar */}
      {!limit && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: isPortuguese ? 'Todos' : 'All Updates' },
              { key: 'going', label: isPortuguese ? 'Vou Participar' : 'Going' },
              { key: 'interested', label: isPortuguese ? 'Interessado' : 'Interested' },
              { key: 'nearby', label: isPortuguese ? 'Perto de Mim' : 'Nearby' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col ${
              post.priority === 'high' ? 'ring-2 ring-primary-100' : ''
            }`}
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {post.hostImage ? (
                        <Image 
                          src={post.hostImage} 
                          alt={post.hostName}
                          width={60} height={60} className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                          {post.hostName.charAt(0)}
                        </div>
                      )}
                    </div>
                    {post.hostVerified && (
                      <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-4 h-4 text-primary-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{post.hostName}</h4>
                      {post.isSponsored && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          {isPortuguese ? 'Patrocinado' : 'Sponsored'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {getPostTypeIcon(post.type)}
                      <span>{getPostTypeLabel(post.type)}</span>
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
                
                <FavoriteButton
                  itemId={post.eventId}
                  itemType="event"
                  itemTitle={post.eventTitle}
                  itemDescription={post.content}
                  itemImageUrl={post.eventImage}
                  size="sm"
                />
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  {post.images.length === 1 ? (
                    <div className="rounded-lg overflow-hidden">
                      <Image 
                        src={post.images[0]} 
                        alt="Event photo" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                      {post.images.slice(0, 4).map((image, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden">
                          <Image 
                            src={image} 
                            alt={`Event photo ${idx + 1}`} 
                            width={60} height={60} className="object-cover"
                          />
                          {idx === 3 && post.images && post.images.length > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                              +{post.images.length - 4}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Event Card */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4 border border-primary-100">
                <div className="flex items-start gap-3">
                  {post.eventImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image 
                        src={post.eventImage} 
                        alt={post.eventTitle}
                        width={60} height={60} className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.eventTitle}</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
                        <span>{formatDate(post.eventDate)} • {post.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4 text-secondary-500" />
                        <span className="truncate">{post.eventLocation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4 text-purple-500" />
                        <span>
                          {post.eventSpotsLeft > 0 
                            ? `${post.eventSpotsLeft} ${isPortuguese ? 'vagas' : 'spots'}`
                            : isPortuguese ? 'Lotado' : 'Full'
                          }
                        </span>
                      </div>
                      <div className="text-primary-600 font-semibold">
                        {post.eventPrice === 0 ? (isPortuguese ? 'GRÁTIS' : 'FREE') : `£${post.eventPrice}`}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                          {post.eventCategory}
                        </span>
                        {post.eventSpotsLeft <= 5 && post.eventSpotsLeft > 0 && (
                          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                            {isPortuguese ? 'Últimas vagas' : 'Few spots left'}
                          </span>
                        )}
                        {post.eventSpotsLeft === 0 && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            {isPortuguese ? 'Lotado' : 'Full'}
                          </span>
                        )}
                      </div>
                      
                      <a
                        href={buildRoute(ROUTES.events, { id: 'event-id' })}
                        className="text-primary-600 text-sm font-medium hover:underline"
                      >
                        {post.eventSpotsLeft > 0 
                          ? (isPortuguese ? 'Ver Detalhes & RSVP' : 'View Details & RSVP')
                          : (isPortuguese ? 'Entrar na Lista' : 'Join Waitlist')
                        }
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reactions Bar */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <button 
                  onClick={() => handleReaction(post.id, 'interested')}
                  className="flex items-center gap-1 hover:text-primary-500 transition-colors"
                >
                  <span>👀</span>
                  <span>{post.reactions.interested} {isPortuguese ? 'interessados' : 'interested'}</span>
                </button>
                
                <button 
                  onClick={() => handleReaction(post.id, 'going')}
                  className="flex items-center gap-1 hover:text-secondary-500 transition-colors"
                >
                  <span>✅</span>
                  <span>{post.reactions.going} {isPortuguese ? 'vão' : 'going'}</span>
                </button>
                
                <button 
                  onClick={() => handleReaction(post.id, 'love')}
                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                >
                  <span>❤️</span>
                  <span>{post.reactions.love}</span>
                </button>
                
                <button 
                  onClick={() => handleReaction(post.id, 'wow')}
                  className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
                >
                  <span>😍</span>
                  <span>{post.reactions.wow}</span>
                </button>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    {post.liked ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartOutlineIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-600 hover:text-secondary-500 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
                
                <a
                  href={buildRoute(ROUTES.events, { id: 'event-id' })}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm px-4 py-2 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium"
                >
                  {isPortuguese ? 'Ver Evento' : 'View Event'}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}