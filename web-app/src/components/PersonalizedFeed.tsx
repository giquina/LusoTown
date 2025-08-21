'use client'

import { useState, useEffect, useMemo } from 'react'
import { ROUTES } from '@/config'
import Image from 'next/image'
import { ROUTES } from '@/config'
import { motion } from 'framer-motion'
import { ROUTES } from '@/config'
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowPathIcon, 
  PhotoIcon,
  LinkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  LanguageIcon,
  BellIcon,
  StarIcon,
  FunnelIcon as FilterIcon,
  TruckIcon,
  BriefcaseIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { ROUTES } from '@/config'
import { useFollowing, FollowableEntity } from '@/context/FollowingContext'
import { ROUTES } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config'
import { useSubscription } from '@/context/SubscriptionContext'
import { ROUTES } from '@/config'
import FollowButton from '@/components/FollowButton'
import { ROUTES } from '@/config'
import EnhancedPostCreator from '@/components/EnhancedPostCreator'
import { ROUTES } from '@/config'
import ServiceIntegrationFeed from '@/components/ServiceIntegrationFeed'
import { ROUTES } from '@/config'

interface FeedPost {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  authorType: FollowableEntity['type']
  authorVerified?: boolean
  content: string
  imageUrl?: string
  linkUrl?: string
  linkedEvent?: {
    id: string
    title: string
    date: string
    location: string
  }
  linkedBusiness?: {
    id: string
    name: string
    category: string
  }
  createdAt: string
  likes: number
  comments: number
  liked: boolean
  reactions: {
    heart: number
    thumbsUp: number
    laugh: number
    wow: number
    sad: number
    angry: number
  }
  hashtags: string[]
  culturalTags?: string[]
  isFromFollowing: boolean
  priority?: 'high' | 'medium' | 'low'
  servicePost?: boolean
  serviceType?: 'transport' | 'tour' | 'event' | 'business' | 'housing'
}

// Mock posts from followed entities
const generatePersonalizedPosts = (followedEntities: FollowableEntity[]): FeedPost[] => {
  const basePosts: Omit<FeedPost, 'isFromFollowing' | 'priority' | 'authorId' | 'authorName' | 'authorAvatar' | 'authorType'>[] = [
    {
      id: 'post-1',
      authorVerified: true,
      content: 'Acabei de terminar a organização da próxima noite de Fado! Vai ser uma experiência inesquecível com músicos autênticos vindos diretamente de Lisboa. 🎶 #Fado #CulturaPortuguesa',
      imageUrl: buildUnsplashUrl('photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format'),
      createdAt: '2 hours ago',
      likes: 34,
      comments: 8,
      liked: false,
      reactions: { heart: 20, thumbsUp: 10, laugh: 3, wow: 1, sad: 0, angry: 0 },
      hashtags: ['Fado', 'CulturaPortuguesa'],
      culturalTags: ['Traditional Music', 'Portuguese Heritage'],
      linkedEvent: {
        id: 'event1',
        title: 'Noite de Fado Autêntico',
        date: '2025-08-20',
        location: 'Portuguese Cultural Centre, London'
      }
    },
    {
      id: 'post-2',
      content: 'O nosso grupo de famílias portuguesas está a organizar um workshop de culinária tradicional! As crianças vão aprender a fazer pastéis de nata enquanto os pais exploram pratos regionais. 👨‍👩‍👧‍👦',
      createdAt: '4 hours ago',
      likes: 28,
      comments: 12,
      liked: true,
      reactions: { heart: 18, thumbsUp: 7, laugh: 2, wow: 1, sad: 0, angry: 0 },
      hashtags: ['CulinariaPortuguesa', 'FamiliasPortuguesas'],
      culturalTags: ['Portuguese Cuisine', 'Family Activities']
    },
    {
      id: 'post-3',
      content: 'Partilhando alguns recursos fantásticos para ensinar português às nossas crianças nascidas no Reino Unido. É tão importante manter a nossa língua viva! 📚',
      linkUrl: 'https://example.com/portuguese-resources',
      createdAt: '6 hours ago',
      likes: 41,
      comments: 15,
      liked: false,
      reactions: { heart: 25, thumbsUp: 12, laugh: 1, wow: 3, sad: 0, angry: 0 },
      hashtags: ['LinguaPortuguesa', 'Educacao', 'CriancasLusas'],
      culturalTags: ['Language Preservation', 'Education']
    },
    {
      id: 'post-4',
      authorVerified: true,
      content: 'Great turnout at our Portuguese business networking event! So proud to see our community supporting each other. Próximo encontro será em Manchester! 💼',
      imageUrl: buildUnsplashUrl('photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format'),
      createdAt: '8 hours ago',
      likes: 52,
      comments: 18,
      liked: true,
      reactions: { heart: 30, thumbsUp: 15, laugh: 4, wow: 3, sad: 0, angry: 0 },
      hashtags: ['EmpreendedorismoPT', 'NetworkingPortugues'],
      culturalTags: ['Business', 'Professional Network'],
      linkedBusiness: {
        id: 'business1',
        name: 'Portuguese Business Network UK',
        category: 'Professional Services'
      }
    },
    {
      id: 'post-5',
      content: 'Descobri uma nova padaria portuguesa em Birmingham que faz pão de milho igual ao da minha avó! Alguém conhece outros locais autênticos por aí? 🍞',
      createdAt: '12 hours ago',
      likes: 19,
      comments: 9,
      liked: false,
      reactions: { heart: 12, thumbsUp: 5, laugh: 1, wow: 1, sad: 0, angry: 0 },
      hashtags: ['ComidaPortuguesa', 'Birmingham', 'PaoDeMillho'],
      culturalTags: ['Portuguese Food', 'Local Business']
    },
    {
      id: 'post-6',
      content: 'Available this weekend for Portuguese cultural tours of London! Just completed an amazing tour to Tower Bridge where I shared the story of Portuguese explorers. Bilingual service and deep cultural knowledge included! 🚗🇵🇹',
      createdAt: '3 hours ago',
      likes: 31,
      comments: 7,
      liked: false,
      reactions: { heart: 18, thumbsUp: 10, laugh: 2, wow: 1, sad: 0, angry: 0 },
      hashtags: ['CulturalTours', 'PortugueseGuide', 'LondonTours'],
      culturalTags: ['Transport Service', 'Cultural Heritage'],
      servicePost: true,
      serviceType: 'transport',
      linkedBusiness: {
        id: 'portuguese_tours',
        name: 'Portuguese Heritage Tours London',
        category: 'Cultural Tours & Transport'
      }
    },
    {
      id: 'post-7',
      authorVerified: true,
      content: 'Coordinating group transport for the upcoming Fado night at Portuguese Cultural Centre! 🚌 Multiple pickup points across London including Stockwell, Vauxhall, and Elephant & Castle. Portuguese-speaking drivers and cultural commentary included!',
      createdAt: '5 hours ago',
      likes: 42,
      comments: 15,
      liked: true,
      reactions: { heart: 25, thumbsUp: 12, laugh: 3, wow: 2, sad: 0, angry: 0 },
      hashtags: ['EventTransport', 'FadoNight', 'GroupService'],
      culturalTags: ['Community Event', 'Transport Coordination'],
      servicePost: true,
      serviceType: 'event',
      linkedEvent: {
        id: 'fado_night_transport',
        title: 'Fado Night - Group Transport',
        date: '2025-08-22',
        location: 'Multiple London Pickups'
      }
    },
    {
      id: 'post-8',
      content: 'Procuro apartamento T1/T2 na área portuguesa de Londres (Stockwell/Vauxhall). Preferência por propriedades perto da comunidade portuguesa. Sou profissional, não fumador, referências disponíveis! 🏠',
      createdAt: '1 day ago',
      likes: 23,
      comments: 11,
      liked: false,
      reactions: { heart: 15, thumbsUp: 6, laugh: 1, wow: 1, sad: 0, angry: 0 },
      hashtags: ['HabitacaoLondres', 'ComunidadePortuguesa', 'Stockwell'],
      culturalTags: ['Housing Search', 'Community Areas'],
      servicePost: true,
      serviceType: 'housing'
    }
  ]

  // Map posts to followed entities
  return basePosts.map((post, index) => {
    const followedEntity = followedEntities[index % followedEntities.length]
    if (!followedEntity) {
      return {
        ...post,
        authorId: 'unknown',
        authorName: 'Community Member',
        authorAvatar: '',
        authorType: 'person' as const,
        isFromFollowing: false,
        priority: 'low' as const
      }
    }

    return {
      ...post,
      authorId: followedEntity.id,
      authorName: followedEntity.name,
      authorAvatar: followedEntity.imageUrl || '',
      authorType: followedEntity.type,
      authorVerified: followedEntity.isVerified,
      isFromFollowing: true,
      priority: followedEntity.isVerified ? 'high' : 'medium' as const
    }
  })
}

interface PersonalizedFeedProps {
  className?: string
}

export default function PersonalizedFeed({ className = '' }: PersonalizedFeedProps) {
  const { following, isFollowing } = useFollowing()
  const { language } = useLanguage()
  const { membershipTier } = useSubscription()
  const [posts, setPosts] = useState<FeedPost[]>([])
  const [filter, setFilter] = useState<'all' | 'following' | 'services' | 'cultural'>('all')
  const [newPost, setNewPost] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showServiceFeed, setShowServiceFeed] = useState(false)
  
  // Helper function to check if language is Portuguese
  const isPortuguese = language === 'pt'

  // Generate personalized posts based on following
  const followedEntities = following.map(f => f.entity)
  const personalizedPosts = useMemo(() => {
    const generated = generatePersonalizedPosts(followedEntities)
    // Sort by priority and recency
    return generated.sort((a, b) => {
      const priorityScore = { high: 3, medium: 2, low: 1 }
      const aPriority = priorityScore[a.priority || 'low']
      const bPriority = priorityScore[b.priority || 'low']
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [followedEntities])

  useEffect(() => {
    setPosts(personalizedPosts)
  }, [personalizedPosts])

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ))
  }

  const filteredPosts = useMemo(() => {
    switch (filter) {
      case 'following':
        return posts.filter(post => post.isFromFollowing)
      case 'services':
        return posts.filter(post => post.servicePost)
      case 'cultural':
        return posts.filter(post => !post.servicePost && post.culturalTags && post.culturalTags.length > 0)
      default:
        return posts
    }
  }, [posts, filter])

  const handleCreatePost = (content: string, category: string, template?: string) => {
    const post: FeedPost = {
      id: `post-${Date.now()}`,
      authorId: 'currentUser',
      authorName: isPortuguese ? 'Tu' : 'You',
      authorAvatar: buildUnsplashUrl('photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format'),
      authorType: 'person',
      content,
      createdAt: isPortuguese ? 'Agora mesmo' : 'Just now',
      likes: 0,
      comments: 0,
      liked: false,
      reactions: { heart: 0, thumbsUp: 0, laugh: 0, wow: 0, sad: 0, angry: 0 },
      hashtags: extractHashtags(content),
      culturalTags: template ? [template] : undefined,
      servicePost: ['transport', 'business', 'housing', 'event'].includes(category),
      serviceType: ['transport', 'business', 'housing', 'event'].includes(category) ? category as any : undefined,
      isFromFollowing: false,
      priority: 'high' // User's own posts get high priority
    }
    
    setPosts([post, ...posts])
    setShowCreatePost(false)
  }

  const extractHashtags = (content: string): string[] => {
    const hashtagRegex = /#[\w\u00C0-\u017F]+/g
    const matches = content.match(hashtagRegex) || []
    return matches.map(tag => tag.substring(1)) // Remove the # symbol
  }

  const getAuthorTypeIcon = (type: FollowableEntity['type']) => {
    switch (type) {
      case 'group':
        return <UserGroupIcon className="w-3 h-3" />
      case 'community':
        return <UserGroupIcon className="w-3 h-3" />
      case 'event_organizer':
        return <CalendarDaysIcon className="w-3 h-3" />
      default:
        return null
    }
  }

  if (following.length === 0) {
    return (
      <div className="text-center py-16">
        <StarIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
{isPortuguese ? 'Feed Personalizado' : 'Personalized Feed'}
        </h3>
        <p className="text-secondary-600 mb-6">
          {isPortuguese 
            ? 'Segue pessoas, grupos e comunidades para ver as suas atualizações aqui.'
            : 'Follow people, groups, and communities to see their updates here.'
          }
        </p>
        <a 
          href="/following" 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 inline-flex items-center gap-2"
        >
          <StarIcon className="w-5 h-5" />
          {isPortuguese ? 'Descobrir Pessoas' : 'Discover People'}
        </a>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Feed Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BellIcon className="w-6 h-6 text-primary-500" />
              {isPortuguese ? 'Feed da Tua Rede' : 'Your Network Feed'}
            </h2>
            <p className="text-secondary-600">
              {isPortuguese 
                ? `Atualizações de ${following.length} pessoas e grupos que segues`
                : `Updates from ${following.length} people and groups you follow`
              }
            </p>
          </div>
          
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm"
          >
            {isPortuguese ? 'Partilhar' : 'Share'}
          </button>
        </div>

        {/* Enhanced Filters */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              filter === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            <FilterIcon className="w-4 h-4" />
            {isPortuguese ? 'Todos' : 'All'} ({posts.length})
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              filter === 'following'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            <HeartSolidIcon className="w-4 h-4" />
            {isPortuguese ? 'A Seguir' : 'Following'} ({posts.filter(p => p.isFromFollowing).length})
          </button>
          <button
            onClick={() => setFilter('services')}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              filter === 'services'
                ? 'bg-secondary-100 text-secondary-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            <TruckIcon className="w-4 h-4" />
            {isPortuguese ? 'Serviços' : 'Services'} ({posts.filter(p => p.servicePost).length})
          </button>
          <button
            onClick={() => setFilter('cultural')}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              filter === 'cultural'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
            {isPortuguese ? 'Cultural' : 'Cultural'} ({posts.filter(p => !p.servicePost && p.culturalTags).length})
          </button>
        </div>
      </div>

      {/* Enhanced Create Post Modal */}
      {showCreatePost && (
        <EnhancedPostCreator
          onCreatePost={handleCreatePost}
          onClose={() => setShowCreatePost(false)}
        />
      )}

      {/* Feed Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden opacity-0 transecondary-y-5"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {post.authorAvatar ? (
                        <Image 
                          src={post.authorAvatar} 
                          alt={post.authorName}
                          fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                          {post.authorName.charAt(0)}
                        </div>
                      )}
                    </div>
                    {post.authorVerified && (
                      <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-4 h-4 text-primary-500 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{post.authorName}</h4>
                      {getAuthorTypeIcon(post.authorType)}
                      {post.isFromFollowing && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {isPortuguese ? 'A seguir' : 'Following'}
                        </span>
                      )}
                      {post.servicePost && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          post.serviceType === 'transport' ? 'bg-blue-100 text-primary-700' :
                          post.serviceType === 'business' ? 'bg-green-100 text-green-700' :
                          post.serviceType === 'housing' ? 'bg-orange-100 text-orange-700' :
                          post.serviceType === 'event' ? 'bg-accent-100 text-accent-700' :
                          'bg-secondary-100 text-secondary-700'
                        }`}>
                          {post.serviceType === 'transport' ? (isPortuguese ? 'Transporte' : 'Transport') :
                           post.serviceType === 'business' ? (isPortuguese ? 'Negócio' : 'Business') :
                           post.serviceType === 'housing' ? (isPortuguese ? 'Habitação' : 'Housing') :
                           post.serviceType === 'event' ? (isPortuguese ? 'Evento' : 'Event') :
                           (isPortuguese ? 'Serviço' : 'Service')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                  </div>
                </div>
                
                {!isFollowing(post.authorId) && post.authorId !== 'currentUser' && (
                  <FollowButton 
                    entity={{
                      id: post.authorId,
                      type: post.authorType,
                      name: post.authorName,
                      imageUrl: post.authorAvatar,
                      isVerified: post.authorVerified
                    }}
                    variant="compact"
                  />
                )}
              </div>
              
              {/* Post Content */}
              <p className="text-secondary-700 mb-4 whitespace-pre-line">{post.content}</p>
              
              {/* Post Image */}
              {post.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <Image 
                    src={post.imageUrl} 
                    alt="Post image" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {/* Linked Event */}
              {post.linkedEvent && (
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4 border border-primary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDaysIcon className="w-4 h-4 text-primary-600" />
                    <h5 className="font-semibold text-gray-900">{post.linkedEvent.title}</h5>
                  </div>
                  <div className="text-sm text-secondary-600">
                    <p>{post.linkedEvent.date}</p>
                    <p>{post.linkedEvent.location}</p>
                  </div>
                  <button className="mt-2 text-primary-600 text-sm font-medium hover:underline">
                    {isPortuguese ? 'Ver Detalhes do Evento' : 'View Event Details'}
                  </button>
                </div>
              )}
              
              {/* Linked Business */}
              {post.linkedBusiness && (
                <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4 mb-4 border border-secondary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-secondary-600" />
                    <h5 className="font-semibold text-gray-900">{post.linkedBusiness.name}</h5>
                  </div>
                  <p className="text-sm text-secondary-600">{post.linkedBusiness.category}</p>
                  <button className="mt-2 text-secondary-600 text-sm font-medium hover:underline">
                    {isPortuguese ? 'Ver Negócio' : 'View Business'}
                  </button>
                </div>
              )}
              
              {/* Cultural Tags */}
              {post.culturalTags && post.culturalTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.culturalTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-2 py-1 rounded-full border border-primary-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Hashtags */}
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.hashtags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-primary-600 text-sm hover:underline cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Post Actions */}
            <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-secondary-600 hover:text-coral-500 transition-colors"
                  >
                    {post.liked ? (
                      <HeartSolidIcon className="w-5 h-5 text-coral-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 transition-colors">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 transition-colors">
                    <ArrowPathIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {isPortuguese ? 'Partilhar' : 'Share'}
                    </span>
                  </button>
                </div>
                
                <div className="flex gap-1">
                  <button className="p-1 text-gray-400 hover:text-coral-500">❤️</button>
                  <button className="p-1 text-gray-400 hover:text-primary-500">👍</button>
                  <button className="p-1 text-gray-400 hover:text-accent-500">😂</button>
                  <button className="p-1 text-gray-400 hover:text-accent-500">😮</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Integration Section */}
      {filter === 'services' && (
        <div className="mt-8">
          <ServiceIntegrationFeed />
        </div>
      )}

      {/* Quick Access to Services */}
      {filter === 'all' && (membershipTier === 'community' || membershipTier === 'ambassador') && (
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-primary-600" />
                {isPortuguese ? 'Serviços Disponíveis' : 'Available Services'}
              </h3>
              <p className="text-sm text-secondary-600">
                {isPortuguese 
                  ? 'Serviços da comunidade portuguesa verificada'
                  : 'Services from verified Portuguese community'
                }
              </p>
            </div>
            <button
              onClick={() => setFilter('services')}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
            >
              {isPortuguese ? 'Ver Todos' : 'View All'}
              <SparklesIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setFilter('services')}
              className="flex flex-col items-center p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors border border-secondary-200"
            >
              <TruckIcon className="w-6 h-6 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">
                {isPortuguese ? 'Transporte' : 'Transport'}
              </span>
              <span className="text-xs text-gray-500">
                {posts.filter(p => p.serviceType === 'transport').length} {isPortuguese ? 'disponível' : 'available'}
              </span>
            </button>

            <button
              onClick={() => setFilter('services')}
              className="flex flex-col items-center p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors border border-secondary-200"
            >
              <CalendarDaysIcon className="w-6 h-6 text-accent-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">
                {isPortuguese ? 'Eventos' : 'Events'}
              </span>
              <span className="text-xs text-gray-500">
                {posts.filter(p => p.serviceType === 'event').length} {isPortuguese ? 'ativos' : 'active'}
              </span>
            </button>

            <button
              onClick={() => setFilter('services')}
              className="flex flex-col items-center p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors border border-secondary-200"
            >
              <BriefcaseIcon className="w-6 h-6 text-action-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">
                {isPortuguese ? 'Negócios' : 'Business'}
              </span>
              <span className="text-xs text-gray-500">
                {posts.filter(p => p.serviceType === 'business').length} {isPortuguese ? 'recomendações' : 'recommendations'}
              </span>
            </button>

            <button
              onClick={() => setFilter('services')}
              className="flex flex-col items-center p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors border border-secondary-200"
            >
              <HomeIcon className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-secondary-700">
                {isPortuguese ? 'Habitação' : 'Housing'}
              </span>
              <span className="text-xs text-gray-500">
                {posts.filter(p => p.serviceType === 'housing').length} {isPortuguese ? 'oportunidades' : 'opportunities'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}