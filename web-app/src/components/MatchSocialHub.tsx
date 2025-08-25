'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  BoltIcon,
  MapPinIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TruckIcon,
  BriefcaseIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useFollowing, FollowableEntity } from '@/context/FollowingContext'
import ServiceProviderMatching from '@/components/ServiceProviderMatching'
import MatchSuccessStoryGenerator from '@/components/MatchSuccessStoryGenerator'
import SocialDiscoveryIntegration from '@/components/SocialDiscoveryIntegration'
import EventCoordinationSystem from '@/components/EventCoordinationSystem'

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
  isMatch: boolean
  matchedAt?: string
  lastActivity?: string
  serviceNeeds?: string[]
  eventPreferences?: string[]
  followedBySocial?: boolean
}

interface SocialConnection {
  id: string
  matchId: string
  followedAt: string
  sharedEvents: number
  mutualFollowers: number
  connectionStrength: 'weak' | 'medium' | 'strong'
  serviceBookings: number
  storiesGenerated: number
}

interface MatchSocialHubProps {
  className?: string
  matches?: MatchProfile[]
  onServiceRequest?: (matchId: string, serviceType: string) => void
  onEventCoordination?: (matchId: string, eventId: string) => void
  onStoryGenerate?: (matchId: string, storyType: string) => void
}

const mockMatches: MatchProfile[] = [
  {
    id: 'match-1',
    name: 'Sofia Martins',
    age: 29,
    location: 'Stockwell',
    profession: 'Graphic Designer',
    origin: 'Porto, Portugal',
    interests: ['Fado', 'Lusophone Cuisine', 'Arts & Crafts', 'Cultural Events'],
    bio: 'Designer from Porto who loves authentic Portuguese culture and exploring London\'s creative scene.',
    compatibility: 94,
    isMatch: true,
    matchedAt: '2 days ago',
    lastActivity: '1 hour ago',
    serviceNeeds: ['transport', 'cultural_tours'],
    eventPreferences: ['fado_nights', 'cultural_events', 'art_exhibitions'],
    followedBySocial: true
  },
  {
    id: 'match-2',
    name: 'Ricardo Ferreira',
    age: 32,
    location: 'Vauxhall',
    profession: 'Software Developer',
    origin: 'São Paulo, Brasil',
    interests: ['Football', 'Tech Meetups', 'Brazilian Culture', 'Professional Networking'],
    bio: 'Brazilian developer passionate about tech and maintaining cultural connections in London.',
    compatibility: 89,
    isMatch: true,
    matchedAt: '1 week ago',
    lastActivity: '3 hours ago',
    serviceNeeds: ['business_networking', 'transport'],
    eventPreferences: ['football_screenings', 'tech_meetups', 'brazilian_events'],
    followedBySocial: false
  },
  {
    id: 'match-3',
    name: 'Ana Oliveira',
    age: 27,
    location: 'Camden',
    profession: 'Marketing Manager',
    origin: 'Lisboa, Portugal',
    interests: ['Wine Tasting', 'Lusophone Literature', 'Business Events', 'Cultural Tours'],
    bio: 'Marketing professional from Lisbon who enjoys Portuguese wine and literature discussions.',
    compatibility: 91,
    isMatch: true,
    matchedAt: '4 days ago',
    lastActivity: '30 minutes ago',
    serviceNeeds: ['cultural_tours', 'business_events'],
    eventPreferences: ['wine_tasting', 'literature_circles', 'business_networking'],
    followedBySocial: true
  }
]

const mockSocialConnections: SocialConnection[] = [
  {
    id: 'conn-1',
    matchId: 'match-1',
    followedAt: '2 days ago',
    sharedEvents: 3,
    mutualFollowers: 12,
    connectionStrength: 'strong',
    serviceBookings: 2,
    storiesGenerated: 4
  },
  {
    id: 'conn-2',
    matchId: 'match-3',
    followedAt: '4 days ago',
    sharedEvents: 1,
    mutualFollowers: 7,
    connectionStrength: 'medium',
    serviceBookings: 1,
    storiesGenerated: 2
  }
]

export default function MatchSocialHub({
  className = '',
  matches = mockMatches,
  onServiceRequest,
  onEventCoordination,
  onStoryGenerate
}: MatchSocialHubProps) {
  const { language } = useLanguage()
  const { membershipTier, hasActiveSubscription } = useSubscription()
  const { following, followEntity, isFollowing } = useFollowing()
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'events' | 'stories' | 'discovery'>('overview')
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>(mockSocialConnections)
  const [autoFollowEnabled, setAutoFollowEnabled] = useState(true)
  const [serviceRecommendations, setServiceRecommendations] = useState<any[]>([])
  const [eventSuggestions, setEventSuggestions] = useState<any[]>([])
  const [successStories, setSuccessStories] = useState<any[]>([])
  const [discoveryMatches, setDiscoveryMatches] = useState<any[]>([])

  const isPortuguese = language === 'pt'
  const isPremiumUser = hasActiveSubscription && (membershipTier === 'community' || membershipTier === 'ambassador')

  // Enhanced matches with social integration data
  const enhancedMatches = useMemo(() => {
    return matches.map(match => {
      const socialConnection = socialConnections.find(conn => conn.matchId === match.id)
      const isFollowedInSocial = following.some(f => f.entity.id === match.id)
      
      return {
        ...match,
        socialConnection,
        isFollowedInSocial,
        integrationScore: calculateIntegrationScore(match, socialConnection, isFollowedInSocial)
      }
    })
  }, [matches, socialConnections, following])

  // Calculate integration score for match-social connection strength
  function calculateIntegrationScore(match: MatchProfile, connection?: SocialConnection, isFollowed?: boolean): number {
    let score = match.compatibility * 0.4 // Base compatibility weight
    
    if (connection) {
      score += connection.sharedEvents * 5 // Shared events boost
      score += connection.mutualFollowers * 2 // Mutual followers boost
      score += connection.serviceBookings * 8 // Service usage boost
      score += connection.storiesGenerated * 3 // Story engagement boost
    }
    
    if (isFollowed) score += 10 // Following bonus
    if (match.followedBySocial) score += 5 // Followed back bonus
    
    return Math.min(100, Math.round(score))
  }

  // Auto-follow matches when enabled
  useEffect(() => {
    if (autoFollowEnabled && isPremiumUser) {
      matches.forEach(match => {
        if (match.isMatch && !isFollowing(match.id) && !match.followedBySocial) {
          const entity: FollowableEntity = {
            id: match.id,
            type: 'person',
            name: match.name,
            description: match.bio,
            location: match.location,
            culturalFocus: match.interests,
            isVerified: true
          }
          
          // Auto-follow with delay to simulate natural behavior
          setTimeout(() => {
            followEntity(entity)
            setSocialConnections(prev => [...prev, {
              id: `conn-${Date.now()}`,
              matchId: match.id,
              followedAt: 'Just now',
              sharedEvents: 0,
              mutualFollowers: 0,
              connectionStrength: 'weak',
              serviceBookings: 0,
              storiesGenerated: 0
            }])
          }, Math.random() * 2000 + 1000) // Random delay 1-3 seconds
        }
      })
    }
  }, [matches, autoFollowEnabled, isPremiumUser, isFollowing, followEntity])

  const getConnectionStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'strong': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'weak': return 'text-gray-600 bg-gray-100'
    }
  }

  const handleServiceRequest = (matchId: string, serviceType: string) => {
    onServiceRequest?.(matchId, serviceType)
    
    // Update connection with service booking
    setSocialConnections(prev => prev.map(conn => 
      conn.matchId === matchId 
        ? { ...conn, serviceBookings: conn.serviceBookings + 1 }
        : conn
    ))
  }

  const handleEventCoordination = (matchId: string, eventId: string) => {
    onEventCoordination?.(matchId, eventId)
    
    // Update connection with shared event
    setSocialConnections(prev => prev.map(conn => 
      conn.matchId === matchId 
        ? { ...conn, sharedEvents: conn.sharedEvents + 1 }
        : conn
    ))
  }

  const handleStoryGenerate = (matchId: string, storyType: string) => {
    onStoryGenerate?.(matchId, storyType)
    
    // Update connection with story generation
    setSocialConnections(prev => prev.map(conn => 
      conn.matchId === matchId 
        ? { ...conn, storiesGenerated: conn.storiesGenerated + 1 }
        : conn
    ))
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Match-Social Integration Header */}
      <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-6 border border-primary-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BoltIcon className="w-6 h-6 text-primary-500" />
              {isPortuguese ? 'Hub Match-Social' : 'Match-Social Hub'}
            </h2>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'Conecte os seus matches à rede social portuguesa'
                : 'Connect your matches to the Lusophone social network'
              }
            </p>
          </div>
          
          {isPremiumUser && (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoFollowEnabled}
                  onChange={(e) => setAutoFollowEnabled(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">
                  {isPortuguese ? 'Auto-seguir matches' : 'Auto-follow matches'}
                </span>
              </label>
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                {isPortuguese ? 'Premium' : 'Premium'}
              </span>
            </div>
          )}
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {enhancedMatches.filter(m => m.isFollowedInSocial).length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Matches Conectados' : 'Connected Matches'}
            </div>
          </div>
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {socialConnections.reduce((sum, conn) => sum + conn.sharedEvents, 0)}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Eventos Partilhados' : 'Shared Events'}
            </div>
          </div>
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {socialConnections.reduce((sum, conn) => sum + conn.serviceBookings, 0)}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Serviços Reservados' : 'Services Booked'}
            </div>
          </div>
          <div className="bg-white/60 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-coral-600 mb-1">
              {socialConnections.reduce((sum, conn) => sum + conn.storiesGenerated, 0)}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Histórias Criadas' : 'Stories Created'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: isPortuguese ? 'Visão Geral' : 'Overview', icon: SparklesIcon },
            { id: 'services', label: isPortuguese ? 'Serviços' : 'Services', icon: TruckIcon },
            { id: 'events', label: isPortuguese ? 'Eventos' : 'Events', icon: CalendarIcon },
            { id: 'stories', label: isPortuguese ? 'Histórias' : 'Stories', icon: ChatBubbleLeftRightIcon },
            { id: 'discovery', label: isPortuguese ? 'Descoberta' : 'Discovery', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Enhanced Matches Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  {isPortuguese ? 'Matches Integrados' : 'Integrated Matches'}
                </h3>
                
                <div className="space-y-4">
                  {enhancedMatches.map((match) => (
                    <div key={match.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                            {match.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{match.name}, {match.age}</h4>
                            <p className="text-sm text-gray-600">{match.location} • {match.profession}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600 mb-1">
                            {match.integrationScore}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {isPortuguese ? 'Integração' : 'Integration'}
                          </div>
                        </div>
                      </div>
                      
                      {match.socialConnection && (
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {match.socialConnection.sharedEvents} {isPortuguese ? 'eventos' : 'events'}
                          </span>
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="w-4 h-4" />
                            {match.socialConnection.mutualFollowers} {isPortuguese ? 'mútuos' : 'mutual'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getConnectionStrengthColor(match.socialConnection.connectionStrength)
                          }`}>
                            {match.socialConnection.connectionStrength === 'strong' ? (isPortuguese ? 'Forte' : 'Strong') :
                             match.socialConnection.connectionStrength === 'medium' ? (isPortuguese ? 'Médio' : 'Medium') :
                             (isPortuguese ? 'Fraco' : 'Weak')}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {!match.isFollowedInSocial && (
                          <button className="flex-1 bg-primary-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                            {isPortuguese ? 'Seguir na Rede' : 'Follow on Social'}
                          </button>
                        )}
                        <button className="flex-1 bg-secondary-100 text-secondary-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary-200 transition-colors">
                          {isPortuguese ? 'Ver Serviços' : 'View Services'}
                        </button>
                        <button className="flex-1 bg-accent-100 text-accent-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent-200 transition-colors">
                          {isPortuguese ? 'Coordenar Evento' : 'Coordinate Event'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <ServiceProviderMatching
              matches={enhancedMatches}
              onServiceRequest={handleServiceRequest}
              className=""
            />
          )}

          {activeTab === 'events' && (
            <EventCoordinationSystem
              matches={enhancedMatches}
              socialConnections={socialConnections}
              onEventCoordination={handleEventCoordination}
              className=""
            />
          )}

          {activeTab === 'stories' && (
            <MatchSuccessStoryGenerator
              matches={enhancedMatches}
              socialConnections={socialConnections}
              onStoryGenerate={handleStoryGenerate}
              className=""
            />
          )}

          {activeTab === 'discovery' && (
            <SocialDiscoveryIntegration
              matches={enhancedMatches}
              following={following}
              onDiscoveryMatch={(matchData) => {
                setDiscoveryMatches(prev => [...prev, matchData])
              }}
              className=""
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Premium Upgrade Prompt for Free Users */}
      {!isPremiumUser && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isPortuguese ? 'Desbloqueie Integração Completa' : 'Unlock Full Integration'}
              </h3>
              <p className="text-white/90 text-sm">
                {isPortuguese 
                  ? 'Auto-seguir matches, coordenação de eventos e muito mais com Premium'
                  : 'Auto-follow matches, event coordination and much more with Premium'
                }
              </p>
            </div>
            <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              {isPortuguese ? 'Upgrade' : 'Upgrade'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}