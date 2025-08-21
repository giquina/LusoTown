'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  HeartIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
  CheckBadgeIcon,
  FireIcon,
  UsersIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useFollowing, FollowableEntity } from '@/context/FollowingContext'
import FollowButton from '@/components/FollowButton'

// Mock match data structure (extends the existing match system)
interface MatchProfile {
  id: string
  name: string
  age: number
  location: string
  profession: string
  origin: string
  interests: string[]
  bio: string
  compatibility: number
  isMatched: boolean
  recentPosts?: MatchSocialPost[]
  mutualConnections?: string[]
  commonEvents?: string[]
  serviceProvider?: {
    type: 'transport' | 'tour' | 'event' | 'business'
    verified: boolean
    rating: number
    specialties: string[]
  }
}

interface MatchSocialPost {
  id: string
  content: string
  createdAt: string
  likes: number
  liked: boolean
  linkedEvent?: {
    id: string
    title: string
    date: string
    location: string
  }
  culturalTags?: string[]
  serviceAnnouncement?: boolean
}

interface MatchSocialIntegrationProps {
  currentProfile?: MatchProfile
  recentMatches?: MatchProfile[]
  onViewProfile: (profileId: string) => void
  onStartConversation: (profileId: string) => void
  onFollowMatch: (profile: MatchProfile) => void
  className?: string
}

export default function MatchSocialIntegration({
  currentProfile,
  recentMatches = [],
  onViewProfile,
  onStartConversation,
  onFollowMatch,
  className = ''
}: MatchSocialIntegrationProps) {
  const { language } = useLanguage()
  const { isFollowing, followEntity } = useFollowing()
  const [selectedTab, setSelectedTab] = useState<'posts' | 'connections' | 'events'>('posts')
  const [showSuccessStory, setShowSuccessStory] = useState(false)

  const isPortuguese = language === 'pt'

  // Mock data for demonstration
  const mockMatchedPosts: MatchSocialPost[] = useMemo(() => [
    {
      id: 'match-post-1',
      content: 'Excited to explore Portuguese cafés in Stockwell with my new LusoTown match! 🇵🇹 Anyone know the best pastéis de nata spots?',
      createdAt: '3 hours ago',
      likes: 15,
      liked: false,
      linkedEvent: {
        id: 'cafe-tour',
        title: 'Portuguese Café Tour',
        date: '2025-08-22',
        location: 'Stockwell, London'
      },
      culturalTags: ['Portuguese Cuisine', 'London Exploration']
    },
    {
      id: 'match-post-2',
      content: 'Met an amazing Portuguese architect through LusoTown! Planning to attend the next cultural event together. This community is incredible! 🏛️',
      createdAt: '1 day ago',
      likes: 23,
      liked: true,
      culturalTags: ['Professional Networking', 'Cultural Events'],
      serviceAnnouncement: false
    },
    {
      id: 'match-post-3',
      content: 'Found my transport service buddy through LusoTown matches! Now offering combined Portuguese cultural tours. 🚗🇵🇹',
      createdAt: '2 days ago',
      likes: 31,
      liked: false,
      culturalTags: ['Transport Service', 'Portuguese Tours'],
      serviceAnnouncement: true
    }
  ], [])

  const handleAutoFollow = (profile: MatchProfile) => {
    const entity: FollowableEntity = {
      id: profile.id,
      type: 'person',
      name: profile.name,
      description: `${profile.profession} from ${profile.origin}`,
      imageUrl: `https://images.unsplash.com/photo-${Math.random().toString(36)}?w=150&h=150&fit=crop&crop=face&auto=format`,
      location: profile.location,
      followers: Math.floor(Math.random() * 500) + 50,
      culturalFocus: profile.interests,
      isVerified: profile.serviceProvider?.verified || false
    }
    
    followEntity(entity)
    onFollowMatch(profile)
  }

  const generateSuccessStory = (match: MatchProfile) => {
    const stories = [
      {
        title: isPortuguese ? 'Encontro Cultural' : 'Cultural Connection',
        content: isPortuguese 
          ? `${match.name} e eu encontramo-nos no festival de Fado e descobrimos uma paixão partilhada pela música tradicional portuguesa!`
          : `${match.name} and I met at the Fado festival and discovered a shared passion for traditional Portuguese music!`
      },
      {
        title: isPortuguese ? 'Parceria de Negócio' : 'Business Partnership',
        content: isPortuguese
          ? `Conectei-me com ${match.name} através do LusoTown e agora oferecemos serviços combinados de turismo português!`
          : `Connected with ${match.name} through LusoTown and now we offer combined Portuguese tourism services!`
      },
      {
        title: isPortuguese ? 'Amizade Duradoura' : 'Lasting Friendship',
        content: isPortuguese
          ? `${match.name} tornou-se uma amiga próxima. Exploramos Londres juntas, sempre falando em português!`
          : `${match.name} became a close friend. We explore London together, always speaking Portuguese!`
      }
    ]
    
    return stories[Math.floor(Math.random() * stories.length)]
  }

  if (!currentProfile && recentMatches.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {isPortuguese ? 'Nenhum Match Ainda' : 'No Matches Yet'}
        </h3>
        <p className="text-gray-500">
          {isPortuguese 
            ? 'Comece a fazer matches para ver conexões sociais aqui'
            : 'Start matching to see social connections here'
          }
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Match Social Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SparklesIcon className="w-6 h-6 text-primary-500" />
              {isPortuguese ? 'Conexões dos Teus Matches' : 'Your Match Connections'}
            </h2>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'Vê as atualizações sociais dos teus matches e conecta-te na vida real'
                : 'See social updates from your matches and connect in real life'
              }
            </p>
          </div>
          
          {currentProfile && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {currentProfile.compatibility}%
              </div>
              <div className="text-sm text-gray-500">
                {isPortuguese ? 'Compatibilidade' : 'Match'}
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setSelectedTab('posts')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedTab === 'posts'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {isPortuguese ? 'Publicações' : 'Posts'} ({mockMatchedPosts.length})
          </button>
          <button
            onClick={() => setSelectedTab('connections')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedTab === 'connections'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {isPortuguese ? 'Conexões' : 'Connections'} ({recentMatches.length})
          </button>
          <button
            onClick={() => setSelectedTab('events')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              selectedTab === 'events'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {isPortuguese ? 'Eventos' : 'Events'} (3)
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {selectedTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Current Match Profile Posts */}
            {currentProfile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                      {currentProfile.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        {currentProfile.name}
                        {currentProfile.serviceProvider?.verified && (
                          <CheckBadgeIcon className="w-4 h-4 text-primary-500" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {currentProfile.compatibility}% {isPortuguese ? 'compatibilidade' : 'match'} • {currentProfile.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!isFollowing(currentProfile.id) && (
                      <button
                        onClick={() => handleAutoFollow(currentProfile)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors"
                      >
                        <UserPlusIcon className="w-4 h-4" />
                        {isPortuguese ? 'Seguir' : 'Follow'}
                      </button>
                    )}
                    <button
                      onClick={() => onStartConversation(currentProfile.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      {isPortuguese ? 'Conversar' : 'Chat'}
                    </button>
                  </div>
                </div>

                {/* Service Provider Badge */}
                {currentProfile.serviceProvider && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-blue-800">
                        {isPortuguese ? 'Prestador de Serviços Verificado' : 'Verified Service Provider'}
                      </span>
                      <span className="text-sm text-blue-600">
                        {currentProfile.serviceProvider.rating}/5 ⭐
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.serviceProvider.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent posts placeholder */}
                <p className="text-gray-600 italic">
                  {isPortuguese 
                    ? 'Publicações recentes aparecerão aqui após a conexão...'
                    : 'Recent posts will appear here after connection...'
                  }
                </p>
              </div>
            )}

            {/* Match Success Stories Feed */}
            {mockMatchedPosts.map((post, index) => (
              <div 
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      {isPortuguese ? 'História de Sucesso' : 'Success Story'}
                      <FireIcon className="w-4 h-4 text-orange-500" />
                    </h4>
                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{post.content}</p>
                
                {/* Linked Event */}
                {post.linkedEvent && (
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3 mb-4 border border-primary-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarDaysIcon className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold text-gray-900">{post.linkedEvent.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{post.linkedEvent.date} • {post.linkedEvent.location}</p>
                  </div>
                )}
                
                {/* Cultural Tags */}
                {post.culturalTags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.culturalTags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
                      {post.liked ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-gray-600 hover:text-primary-500 transition-colors">
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      <span className="text-sm">
                        {isPortuguese ? 'Comentar' : 'Comment'}
                      </span>
                    </button>
                  </div>
                  
                  {post.serviceAnnouncement && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {isPortuguese ? 'Serviço' : 'Service'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {recentMatches.map((match, index) => (
              <div 
                key={match.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg">
                      {match.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{match.name}, {match.age}</h4>
                      <p className="text-gray-600">{match.profession} • {match.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-primary-600">
                          {match.compatibility}% {isPortuguese ? 'compatibilidade' : 'match'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onViewProfile(match.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      {isPortuguese ? 'Ver Perfil' : 'View Profile'}
                    </button>
                    <button
                      onClick={() => onStartConversation(match.id)}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all"
                    >
                      {isPortuguese ? 'Conversar' : 'Message'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Suggested events for matches */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-primary-500" />
                {isPortuguese ? 'Eventos Recomendados para Matches' : 'Recommended Events for Matches'}
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
                  <h5 className="font-semibold text-gray-900">Portuguese Cultural Night</h5>
                  <p className="text-sm text-gray-600 mb-2">August 25, 2025 • Portuguese Cultural Centre</p>
                  <p className="text-sm text-gray-700 mb-3">Perfect for cultural matches to meet in person</p>
                  <button className="text-primary-600 text-sm font-medium hover:underline">
                    {isPortuguese ? 'Coordenar Encontro' : 'Coordinate Meetup'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Panel */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UsersIcon className="w-5 h-5 text-primary-600" />
          {isPortuguese ? 'Ações Rápidas' : 'Quick Actions'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setShowSuccessStory(true)}
            className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors"
          >
            <FireIcon className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">
              {isPortuguese ? 'Partilhar História de Sucesso' : 'Share Success Story'}
            </span>
          </button>
          
          <button className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors">
            <CalendarDaysIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">
              {isPortuguese ? 'Planear Encontro' : 'Plan Meetup'}
            </span>
          </button>
          
          <button className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors">
            <LinkIcon className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">
              {isPortuguese ? 'Serviços em Grupo' : 'Group Services'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}