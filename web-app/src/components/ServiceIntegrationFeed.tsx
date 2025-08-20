'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  TruckIcon,
  MapPinIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  StarIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  CheckBadgeIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface ServicePost {
  id: string
  type: 'transport_available' | 'tour_experience' | 'event_coordination' | 'business_service' | 'chauffeur_available' | 'close_protection'
  author: {
    id: string
    name: string
    avatar: string
    verified: boolean
    serviceProvider: boolean
    rating?: number
    completedServices?: number
  }
  content: string
  serviceDetails?: {
    type: string
    price?: string
    availability: string
    areas: string[]
    languages: string[]
    includes?: string[]
    booking?: string
  }
  images?: string[]
  createdAt: string
  timeAgo: string
  metrics: {
    likes: number
    comments: number
    shares: number
    views: number
    bookings?: number
  }
  userInteraction: {
    liked: boolean
    bookmarked: boolean
  }
  tags: string[]
  featured: boolean
}

const mockServicePosts: ServicePost[] = [
  {
    id: 'service-1',
    type: 'transport_available',
    author: {
      id: 'carlos_transport',
      name: 'Carlos Mendes',
      avatar: '/images/avatars/default.jpg',
      verified: true,
      serviceProvider: true,
      rating: 4.9,
      completedServices: 247
    },
    content: 'Just completed a beautiful tour to Windsor Castle with a lovely Portuguese family! Shared stories about Portuguese royalty connections and showed them the Portuguese influences in the castle\'s history. Available this weekend for airport pickups and London tours! 🏰',
    serviceDetails: {
      type: 'Airport Transfer & Tours',
      price: 'From £45',
      availability: 'This Weekend',
      areas: ['Heathrow', 'Gatwick', 'Central London', 'Windsor'],
      languages: ['Portuguese', 'English'],
      includes: ['Cultural commentary', 'Portuguese community areas', 'Historical context'],
      booking: 'WhatsApp: +44 7xxx xxx xxx'
    },
    images: ['https://images.unsplash.com/photo-1583677995106-1594c4bf5d90?w=600&h=400&fit=crop'],
    createdAt: '2 hours ago',
    timeAgo: '2h',
    metrics: { likes: 34, comments: 12, shares: 8, views: 156, bookings: 3 },
    userInteraction: { liked: false, bookmarked: true },
    tags: ['TransportService', 'CulturalTour', 'WeekendAvailable'],
    featured: true
  },
  {
    id: 'service-2',
    type: 'tour_experience',
    author: {
      id: 'maria_tours',
      name: 'Maria Silva',
      avatar: '/images/avatars/default.jpg',
      verified: true,
      serviceProvider: true,
      rating: 4.8,
      completedServices: 189
    },
    content: 'Amazing cultural tour of Stockwell Portuguese community today! Visited the best Portuguese bakeries, explored the Portuguese murals, and ended at the Portuguese Cultural Centre. My guests loved learning about our community\'s history in the U.K.! 🇵🇹',
    serviceDetails: {
      type: 'Cultural Walking Tour',
      price: 'From £25 per person',
      availability: 'Daily',
      areas: ['Stockwell', 'Vauxhall', 'Borough Market'],
      languages: ['Portuguese', 'English'],
      includes: ['Portuguese bakery visits', 'Cultural history', 'Local insights', 'Pastéis de nata tasting']
    },
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'
    ],
    createdAt: '5 hours ago',
    timeAgo: '5h',
    metrics: { likes: 28, comments: 15, shares: 6, views: 123, bookings: 2 },
    userInteraction: { liked: true, bookmarked: false },
    tags: ['CulturalTour', 'StockwellTour', 'PortugueseCommunity'],
    featured: false
  },
  {
    id: 'service-3',
    type: 'event_coordination',
    author: {
      id: 'ana_events',
      name: 'Ana Costa',
      avatar: '/images/avatars/default.jpg',
      verified: true,
      serviceProvider: true,
      rating: 5.0,
      completedServices: 67
    },
    content: 'Successfully coordinated transport for the Portuguese Business Network event last night! 45 Portuguese professionals attended with seamless transport arrangements. Planning next month\'s Fado night with coordinated group transport from key London areas! 🚌',
    serviceDetails: {
      type: 'Event Transport Coordination',
      availability: 'Events Monthly',
      areas: ['All London', 'Group pickups available'],
      languages: ['Portuguese', 'English'],
      includes: ['Group coordination', 'Multiple pickup points', 'Event return transport', 'Portuguese-speaking drivers']
    },
    createdAt: '8 hours ago',
    timeAgo: '8h',
    metrics: { likes: 41, comments: 18, shares: 12, views: 189, bookings: 1 },
    userInteraction: { liked: false, bookmarked: true },
    tags: ['EventTransport', 'GroupService', 'BusinessNetworking'],
    featured: true
  }
]

export default function ServiceIntegrationFeed() {
  const { language } = useLanguage()
  const { membershipTier } = useSubscription()
  const [posts, setPosts] = useState<ServicePost[]>(mockServicePosts)
  const [filter, setFilter] = useState<'all' | 'transport' | 'tours' | 'events'>('all')
  
  const isPortuguese = language === 'pt'

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

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            userInteraction: {
              ...post.userInteraction,
              bookmarked: !post.userInteraction.bookmarked
            }
          }
        : post
    ))
  }

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'transport':
        return post.type.includes('transport') || post.type.includes('chauffeur')
      case 'tours':
        return post.type.includes('tour') || post.type.includes('experience')
      case 'events':
        return post.type.includes('event') || post.type.includes('coordination')
      default:
        return true
    }
  })

  const getServiceIcon = (type: string) => {
    if (type.includes('transport') || type.includes('chauffeur')) return TruckIcon
    if (type.includes('tour') || type.includes('experience')) return MapPinIcon
    if (type.includes('event')) return CalendarDaysIcon
    if (type.includes('protection')) return ShieldCheckIcon
    return UserGroupIcon
  }

  const getServiceColor = (type: string) => {
    if (type.includes('transport')) return 'from-blue-500 to-blue-600'
    if (type.includes('tour')) return 'from-green-500 to-green-600'
    if (type.includes('event')) return 'from-purple-500 to-purple-600'
    if (type.includes('protection')) return 'from-red-500 to-red-600'
    return 'from-gray-500 to-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <TruckIcon className="w-6 h-6 text-primary-500" />
              {isPortuguese ? 'Serviços da Comunidade' : 'Community Services'}
            </h2>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'Serviços disponíveis de membros verificados da comunidade portuguesa'
                : 'Available services from verified Portuguese community members'
              }
            </p>
          </div>
        </div>

        {/* Service Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {[
            { id: 'all', label: isPortuguese ? 'Todos' : 'All', icon: UserGroupIcon },
            { id: 'transport', label: isPortuguese ? 'Transporte' : 'Transport', icon: TruckIcon },
            { id: 'tours', label: isPortuguese ? 'Tours' : 'Tours', icon: MapPinIcon },
            { id: 'events', label: isPortuguese ? 'Eventos' : 'Events', icon: CalendarDaysIcon }
          ].map(filterOption => {
            const Icon = filterOption.icon
            const isActive = filter === filterOption.id
            return (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filterOption.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Service Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post, index) => {
          const ServiceIcon = getServiceIcon(post.type)
          const serviceColor = getServiceColor(post.type)
          
          return (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                post.featured ? 'border-primary-200 bg-gradient-to-r from-primary-50/30 to-transparent' : 'border-gray-100'
              }`}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-2">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <StarIcon className="w-4 h-4" />
                    {isPortuguese ? 'Serviço Em Destaque' : 'Featured Service'}
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                        <Image 
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {post.author.verified && (
                        <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                        {post.author.serviceProvider && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                            {isPortuguese ? 'Provedor de Serviços' : 'Service Provider'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {post.timeAgo}
                        </div>
                        {post.author.rating && (
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3 h-3 text-yellow-500" />
                            <span>{post.author.rating}</span>
                          </div>
                        )}
                        {post.author.completedServices && (
                          <div className="flex items-center gap-1">
                            <CheckBadgeIcon className="w-3 h-3 text-green-500" />
                            <span>{post.author.completedServices} services</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${serviceColor} text-white`}>
                    <ServiceIcon className="w-5 h-5" />
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                {/* Service Details Card */}
                {post.serviceDetails && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                        <ServiceIcon className="w-4 h-4 text-primary-600" />
                        {post.serviceDetails.type}
                      </h5>
                      {post.serviceDetails.price && (
                        <span className="text-lg font-bold text-primary-600">
                          {post.serviceDetails.price}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 font-medium">
                          {isPortuguese ? 'Disponibilidade:' : 'Availability:'}
                        </span>
                        <p className="text-gray-800">{post.serviceDetails.availability}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">
                          {isPortuguese ? 'Áreas:' : 'Areas:'}
                        </span>
                        <p className="text-gray-800">{post.serviceDetails.areas.join(', ')}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">
                          {isPortuguese ? 'Idiomas:' : 'Languages:'}
                        </span>
                        <p className="text-gray-800">{post.serviceDetails.languages.join(', ')}</p>
                      </div>
                      {post.serviceDetails.booking && (
                        <div>
                          <span className="text-gray-600 font-medium">
                            {isPortuguese ? 'Reservas:' : 'Booking:'}
                          </span>
                          <p className="text-gray-800">{post.serviceDetails.booking}</p>
                        </div>
                      )}
                    </div>

                    {post.serviceDetails.includes && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="text-gray-600 font-medium text-sm">
                          {isPortuguese ? 'Inclui:' : 'Includes:'}
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {post.serviceDetails.includes.map((item, index) => (
                            <span key={index} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    {post.images.length === 1 ? (
                      <div className="relative h-64 sm:h-80">
                        <Image 
                          src={post.images[0]}
                          alt="Service image" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {post.images.slice(0, 4).map((image, index) => (
                          <div key={index} className="relative h-32 sm:h-40">
                            <Image 
                              src={image}
                              alt={`Service image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-primary-600 hover:text-primary-700 cursor-pointer text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Metrics */}
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
                    {post.metrics.bookings && post.metrics.bookings > 0 && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckBadgeIcon className="w-4 h-4" />
                        {post.metrics.bookings} {isPortuguese ? 'reservas' : 'bookings'}
                      </span>
                    )}
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
                  <div className="flex items-center gap-4">
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
                      <span>{isPortuguese ? 'Gosto' : 'Like'}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-all duration-300">
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      <span>{isPortuguese ? 'Comentar' : 'Comment'}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleBookmark(post.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        post.userInteraction.bookmarked
                          ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100'
                          : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      <StarIcon className={`w-5 h-5 ${post.userInteraction.bookmarked ? 'fill-current' : ''}`} />
                      <span>{isPortuguese ? 'Guardar' : 'Save'}</span>
                    </button>
                  </div>
                  
                  {(membershipTier === 'community' || membershipTier === 'ambassador') && (
                    <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                      {isPortuguese ? 'Contactar' : 'Contact'}
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}