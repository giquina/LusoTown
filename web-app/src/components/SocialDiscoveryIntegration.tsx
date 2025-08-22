'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  StarIcon,
  BoltIcon,
  UserPlusIcon,
  CheckCircleIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { Following } from '@/context/FollowingContext'

interface MatchProfile {
  id: string
  name: string
  age: number
  location: string
  interests: string[]
  compatibility: number
  socialConnection?: {
    sharedEvents: number
    mutualFollowers: number
    connectionStrength: 'weak' | 'medium' | 'strong'
  }
}

interface DiscoveryMatch {
  id: string
  name: string
  age: number
  location: string
  interests: string[]
  compatibility: number
  discoveryReason: 'mutual_followers' | 'shared_interests' | 'location_proximity' | 'event_attendance' | 'cultural_compatibility'
  mutualConnections: string[]
  recentActivity: string
  verificationStatus: 'verified' | 'community_verified' | 'pending'
  culturalScore: number
  isOnline: boolean
  lastSeen: string
  socialScore: number
}

interface SocialDiscoveryIntegrationProps {
  className?: string
  matches: MatchProfile[]
  following: Following[]
  onDiscoveryMatch: (matchData: DiscoveryMatch) => void
}

const mockDiscoveryMatches: DiscoveryMatch[] = [
  {
    id: 'disc-1',
    name: 'Marta Silva',
    age: 31,
    location: 'Bermondsey',
    interests: ['Portuguese Literature', 'Wine Tasting', 'Cultural Events', 'Photography'],
    compatibility: 87,
    discoveryReason: 'mutual_followers',
    mutualConnections: ['Sofia Martins', 'Ana Oliveira'],
    recentActivity: 'Attended Fado night at Portuguese Cultural Centre',
    verificationStatus: 'verified',
    culturalScore: 92,
    isOnline: true,
    lastSeen: 'Online now',
    socialScore: 88
  },
  {
    id: 'disc-2',
    name: 'Carlos Mendes',
    age: 28,
    location: 'Elephant & Castle',
    interests: ['Portuguese Football', 'Business Networking', 'Tech Events', 'Brazilian Culture'],
    compatibility: 84,
    discoveryReason: 'shared_interests',
    mutualConnections: ['Ricardo Ferreira'],
    recentActivity: 'Joined Portuguese Business Network event',
    verificationStatus: 'community_verified',
    culturalScore: 89,
    isOnline: false,
    lastSeen: '2 hours ago',
    socialScore: 85
  },
  {
    id: 'disc-3',
    name: 'Isabella Santos',
    age: 26,
    location: 'Camden',
    interests: ['Fado Music', 'Dance', 'Portuguese Cuisine', 'Young Professionals'],
    compatibility: 91,
    discoveryReason: 'cultural_compatibility',
    mutualConnections: ['Ana Oliveira', 'Sofia Martins', 'Marta Silva'],
    recentActivity: 'Organized pastéis de nata workshop',
    verificationStatus: 'verified',
    culturalScore: 95,
    isOnline: true,
    lastSeen: 'Online now',
    socialScore: 91
  },
  {
    id: 'disc-4',
    name: 'Pedro Almeida',
    age: 33,
    location: 'Stockwell',
    interests: ['Traditional Music', 'Portuguese History', 'Cultural Tours', 'Art'],
    compatibility: 83,
    discoveryReason: 'location_proximity',
    mutualConnections: ['Carlos Mendes'],
    recentActivity: 'Led Portuguese heritage walking tour',
    verificationStatus: 'verified',
    culturalScore: 88,
    isOnline: false,
    lastSeen: '5 hours ago',
    socialScore: 82
  },
  {
    id: 'disc-5',
    name: 'Fernanda Costa',
    age: 29,
    location: 'Vauxhall',
    interests: ['Brazilian Festivals', 'Community Events', 'Portuguese Language', 'Social Work'],
    compatibility: 86,
    discoveryReason: 'event_attendance',
    mutualConnections: ['Isabella Santos', 'Ricardo Ferreira'],
    recentActivity: 'Volunteered at Portuguese community center',
    verificationStatus: 'community_verified',
    culturalScore: 90,
    isOnline: true,
    lastSeen: 'Online now',
    socialScore: 87
  }
]

export default function SocialDiscoveryIntegration({
  className = '',
  matches,
  following,
  onDiscoveryMatch
}: SocialDiscoveryIntegrationProps) {
  const { language } = useLanguage()
  const { membershipTier, hasActiveSubscription } = useSubscription()
  const [discoveryMatches, setDiscoveryMatches] = useState<DiscoveryMatch[]>(mockDiscoveryMatches)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterBy, setFilterBy] = useState<'all' | 'online' | 'high_compatibility' | 'mutual_friends' | 'verified'>('all')
  const [sortBy, setSortBy] = useState<'compatibility' | 'cultural_score' | 'social_score' | 'last_seen'>('compatibility')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<DiscoveryMatch | null>(null)
  const [showMatchDetail, setShowMatchDetail] = useState(false)

  const isPortuguese = language === 'pt'
  const isPremiumUser = hasActiveSubscription && (membershipTier === 'community' || membershipTier === 'ambassador')

  // Enhanced discovery algorithm based on existing matches and social connections
  const enhancedDiscoveryMatches = useMemo(() => {
    return discoveryMatches.map(match => {
      let discoveryScore = match.compatibility * 0.4
      
      // Boost based on mutual connections
      discoveryScore += match.mutualConnections.length * 8
      
      // Cultural compatibility boost
      discoveryScore += match.culturalScore * 0.3
      
      // Social engagement boost
      discoveryScore += match.socialScore * 0.2
      
      // Online status boost
      if (match.isOnline) discoveryScore += 10
      
      // Verification boost
      if (match.verificationStatus === 'verified') discoveryScore += 15
      else if (match.verificationStatus === 'community_verified') discoveryScore += 8
      
      // Recent activity boost
      const activityBoost = match.recentActivity.includes('Organized') ? 12 : 
                           match.recentActivity.includes('Attended') ? 8 : 
                           match.recentActivity.includes('Joined') ? 6 : 4
      discoveryScore += activityBoost
      
      return {
        ...match,
        discoveryScore: Math.min(100, Math.round(discoveryScore))
      }
    })
  }, [discoveryMatches])

  // Filter and sort discovery matches
  const filteredMatches = useMemo(() => {
    let filtered = enhancedDiscoveryMatches

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(match =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.interests.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Apply category filters
    switch (filterBy) {
      case 'online':
        filtered = filtered.filter(match => match.isOnline)
        break
      case 'high_compatibility':
        filtered = filtered.filter(match => match.compatibility >= 85)
        break
      case 'mutual_friends':
        filtered = filtered.filter(match => match.mutualConnections.length >= 2)
        break
      case 'verified':
        filtered = filtered.filter(match => match.verificationStatus === 'verified')
        break
    }

    // Sort matches
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          return b.compatibility - a.compatibility
        case 'cultural_score':
          return b.culturalScore - a.culturalScore
        case 'social_score':
          return (b as any).discoveryScore - (a as any).discoveryScore
        case 'last_seen':
          if (a.isOnline && !b.isOnline) return -1
          if (!a.isOnline && b.isOnline) return 1
          return 0
        default:
          return 0
      }
    })
  }, [enhancedDiscoveryMatches, searchQuery, filterBy, sortBy])

  const handleRefreshDiscovery = async () => {
    setIsRefreshing(true)
    
    // Simulate AI-powered discovery refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add new discovery matches (simulate discovery algorithm)
    const newMatches = generateNewDiscoveryMatches()
    setDiscoveryMatches(prev => [...newMatches, ...prev].slice(0, 20)) // Keep latest 20
    
    setIsRefreshing(false)
  }

  const generateNewDiscoveryMatches = (): DiscoveryMatch[] => {
    // Simulate AI discovery based on existing matches and social connections
    const names = ['Luisa', 'Miguel', 'Catarina', 'André', 'Beatriz', 'Tiago']
    const locations = ['Stockwell', 'Vauxhall', 'Camden', 'Bermondsey', 'Elephant & Castle']
    const reasons = ['mutual_followers', 'shared_interests', 'cultural_compatibility'] as const
    
    return Array.from({ length: 2 }, (_, i) => ({
      id: `disc-new-${Date.now()}-${i}`,
      name: `${names[Math.floor(Math.random() * names.length)]  } ${  
            ['Silva', 'Santos', 'Oliveira', 'Costa', 'Ferreira'][Math.floor(Math.random() * 5)]}`,
      age: 25 + Math.floor(Math.random() * 10),
      location: locations[Math.floor(Math.random() * locations.length)],
      interests: ['Portuguese Culture', 'Cultural Events', 'Community', 'Networking'].slice(0, 2 + Math.floor(Math.random() * 2)),
      compatibility: 80 + Math.floor(Math.random() * 15),
      discoveryReason: reasons[Math.floor(Math.random() * reasons.length)],
      mutualConnections: matches.slice(0, 1 + Math.floor(Math.random() * 2)).map(m => m.name),
      recentActivity: 'Recently joined Portuguese community events',
      verificationStatus: Math.random() > 0.3 ? 'verified' : 'community_verified' as any,
      culturalScore: 85 + Math.floor(Math.random() * 10),
      isOnline: Math.random() > 0.6,
      lastSeen: Math.random() > 0.5 ? 'Online now' : `${Math.floor(Math.random() * 24)} hours ago`,
      socialScore: 80 + Math.floor(Math.random() * 15)
    }))
  }

  const getDiscoveryReasonLabel = (reason: DiscoveryMatch['discoveryReason']) => {
    switch (reason) {
      case 'mutual_followers': return isPortuguese ? 'Seguidores Mútuos' : 'Mutual Followers'
      case 'shared_interests': return isPortuguese ? 'Interesses Comuns' : 'Shared Interests'
      case 'location_proximity': return isPortuguese ? 'Proximidade' : 'Location Proximity'
      case 'event_attendance': return isPortuguese ? 'Eventos Comuns' : 'Event Attendance'
      case 'cultural_compatibility': return isPortuguese ? 'Compatibilidade Cultural' : 'Cultural Compatibility'
    }
  }

  const getDiscoveryReasonIcon = (reason: DiscoveryMatch['discoveryReason']) => {
    switch (reason) {
      case 'mutual_followers': return UserGroupIcon
      case 'shared_interests': return HeartIcon
      case 'location_proximity': return MapPinIcon
      case 'event_attendance': return CalendarIcon
      case 'cultural_compatibility': return SparklesIcon
    }
  }

  const getVerificationIcon = (status: DiscoveryMatch['verificationStatus']) => {
    switch (status) {
      case 'verified': return <CheckCircleIcon className="w-4 h-4 text-primary-500" />
      case 'community_verified': return <StarSolidIcon className="w-4 h-4 text-secondary-500" />
      case 'pending': return <StarIcon className="w-4 h-4 text-gray-400" />
    }
  }

  const handleMatchInterest = (match: DiscoveryMatch) => {
    onDiscoveryMatch(match)
    setDiscoveryMatches(prev => prev.filter(m => m.id !== match.id))
  }

  const handleViewProfile = (match: DiscoveryMatch) => {
    setSelectedMatch(match)
    setShowMatchDetail(true)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Social Discovery Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MagnifyingGlassIcon className="w-5 h-5 text-coral-500" />
              {isPortuguese ? 'Descoberta Social Inteligente' : 'Smart Social Discovery'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isPortuguese 
                ? 'Encontre novos matches baseados na sua rede social portuguesa'
                : 'Find new matches based on your Portuguese social network'
              }
            </p>
          </div>
          
          <button
            onClick={handleRefreshDiscovery}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              isRefreshing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-coral-500 to-primary-500 text-white hover:from-coral-600 hover:to-primary-600'
            }`}
          >
            <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 
              (isPortuguese ? 'Atualizando...' : 'Refreshing...') :
              (isPortuguese ? 'Descobrir Mais' : 'Discover More')
            }
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isPortuguese ? 'Pesquisar por nome, local ou interesses...' : 'Search by name, location or interests...'}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: isPortuguese ? 'Todos' : 'All' },
              { id: 'online', label: isPortuguese ? 'Online' : 'Online' },
              { id: 'high_compatibility', label: isPortuguese ? 'Alta Compatibilidade' : 'High Compatibility' },
              { id: 'mutual_friends', label: isPortuguese ? 'Amigos Mútuos' : 'Mutual Friends' },
              { id: 'verified', label: isPortuguese ? 'Verificados' : 'Verified' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setFilterBy(filter.id as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterBy === filter.id
                    ? 'bg-coral-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {isPortuguese ? 'Ordenar por:' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-coral-500 focus:ring-coral-500 text-sm"
            >
              <option value="compatibility">{isPortuguese ? 'Compatibilidade' : 'Compatibility'}</option>
              <option value="cultural_score">{isPortuguese ? 'Pontuação Cultural' : 'Cultural Score'}</option>
              <option value="social_score">{isPortuguese ? 'Pontuação Social' : 'Social Score'}</option>
              <option value="last_seen">{isPortuguese ? 'Última Vez Online' : 'Last Seen'}</option>
            </select>
          </div>
        </div>

        {/* Discovery Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-coral-50 to-primary-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-coral-600 mb-1">
              {filteredMatches.length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Descobertos' : 'Discovered'}
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {filteredMatches.filter(m => m.isOnline).length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Online Agora' : 'Online Now'}
            </div>
          </div>
          <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {filteredMatches.filter(m => m.compatibility >= 85).length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Alta Compatibilidade' : 'High Compatibility'}
            </div>
          </div>
          <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {filteredMatches.filter(m => m.verificationStatus === 'verified').length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Verificados' : 'Verified'}
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Matches Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map(match => {
          const ReasonIcon = getDiscoveryReasonIcon(match.discoveryReason)
          
          return (
            <motion.div
              key={match.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Match Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-coral-400 to-primary-400 rounded-full flex items-center justify-center text-white font-bold">
                        {match.name.charAt(0)}
                      </div>
                      {match.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {match.name}, {match.age}
                        {getVerificationIcon(match.verificationStatus)}
                      </h3>
                      <p className="text-sm text-gray-600">{match.location}</p>
                      <p className="text-xs text-gray-500">{match.lastSeen}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-coral-600 mb-1">
                      {match.compatibility}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {isPortuguese ? 'Compatível' : 'Compatible'}
                    </div>
                  </div>
                </div>

                {/* Discovery Reason */}
                <div className="mb-4 p-3 bg-gradient-to-r from-coral-50 to-primary-50 rounded-lg border border-coral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <ReasonIcon className="w-4 h-4 text-coral-600" />
                    <span className="text-sm font-medium text-coral-800">
                      {getDiscoveryReasonLabel(match.discoveryReason)}
                    </span>
                  </div>
                  {match.mutualConnections.length > 0 && (
                    <div className="text-xs text-gray-600">
                      {isPortuguese ? 'Amigos mútuos: ' : 'Mutual friends: '}
                      {match.mutualConnections.slice(0, 2).join(', ')}
                      {match.mutualConnections.length > 2 && ` +${match.mutualConnections.length - 2}`}
                    </div>
                  )}
                </div>

                {/* Compatibility Scores */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-primary-600">{match.culturalScore}%</div>
                    <div className="text-xs text-gray-600">{isPortuguese ? 'Cultural' : 'Cultural'}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-secondary-600">{match.socialScore}%</div>
                    <div className="text-xs text-gray-600">{isPortuguese ? 'Social' : 'Social'}</div>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {match.interests.slice(0, 3).map(interest => (
                      <span key={interest} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                        {interest}
                      </span>
                    ))}
                    {match.interests.length > 3 && (
                      <span className="text-xs text-gray-500">+{match.interests.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {isPortuguese ? 'Atividade Recente' : 'Recent Activity'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{match.recentActivity}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleViewProfile(match)}
                    className="py-2 px-4 rounded-lg font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {isPortuguese ? 'Ver Perfil' : 'View Profile'}
                  </button>
                  <button
                    onClick={() => handleMatchInterest(match)}
                    className="py-2 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-coral-500 to-primary-500 text-white hover:from-coral-600 hover:to-primary-600 transition-all"
                  >
                    {isPortuguese ? 'Interesse' : 'Interested'}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isPortuguese ? 'Nenhuma Descoberta Encontrada' : 'No Discoveries Found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? (
              isPortuguese 
                ? `Nenhum resultado para "${searchQuery}". Tente termos diferentes.`
                : `No results for "${searchQuery}". Try different terms.`
            ) : (
              isPortuguese 
                ? 'Experimente diferentes filtros ou atualize as descobertas.'
                : 'Try different filters or refresh discoveries.'
            )}
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setFilterBy('all')
              handleRefreshDiscovery()
            }}
            className="bg-gradient-to-r from-coral-500 to-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-coral-600 hover:to-primary-600 transition-all"
          >
            {isPortuguese ? 'Reiniciar Descoberta' : 'Reset Discovery'}
          </button>
        </div>
      )}

      {/* Match Detail Modal */}
      <AnimatePresence>
        {showMatchDetail && selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMatchDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedMatch.name}
                </h3>
                <button
                  onClick={() => setShowMatchDetail(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Detailed match information would go here */}
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-coral-50 to-primary-50 rounded-xl">
                  <div className="text-3xl font-bold text-coral-600 mb-2">
                    {selectedMatch.compatibility}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? 'Compatibilidade Geral' : 'Overall Compatibility'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary-600">{selectedMatch.culturalScore}%</div>
                    <div className="text-xs text-gray-600">{isPortuguese ? 'Compatibilidade Cultural' : 'Cultural Compatibility'}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-secondary-600">{selectedMatch.socialScore}%</div>
                    <div className="text-xs text-gray-600">{isPortuguese ? 'Pontuação Social' : 'Social Score'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Interesses' : 'Interests'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMatch.interests.map(interest => (
                      <span key={interest} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'Amigos Mútuos' : 'Mutual Friends'}
                  </h4>
                  <div className="space-y-1">
                    {selectedMatch.mutualConnections.map(connection => (
                      <div key={connection} className="text-sm text-gray-600">
                        • {connection}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowMatchDetail(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    {isPortuguese ? 'Fechar' : 'Close'}
                  </button>
                  <button
                    onClick={() => {
                      handleMatchInterest(selectedMatch)
                      setShowMatchDetail(false)
                    }}
                    className="flex-1 bg-gradient-to-r from-coral-500 to-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-coral-600 hover:to-primary-600 transition-all"
                  >
                    {isPortuguese ? 'Demonstrar Interesse' : 'Show Interest'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Features */}
      {!isPremiumUser && (
        <div className="bg-gradient-to-r from-coral-50 to-primary-50 rounded-2xl p-6 border border-coral-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Descoberta Premium' : 'Premium Discovery'}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {isPortuguese ? 'Algoritmo de descoberta avançado' : 'Advanced discovery algorithm'}</li>
                <li>• {isPortuguese ? 'Descobertas ilimitadas diárias' : 'Unlimited daily discoveries'}</li>
                <li>• {isPortuguese ? 'Filtros de compatibilidade cultural' : 'Cultural compatibility filters'}</li>
                <li>• {isPortuguese ? 'Prioridade nas recomendações' : 'Priority in recommendations'}</li>
              </ul>
            </div>
            <button className="bg-coral-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-600 transition-colors">
              {isPortuguese ? 'Upgrade' : 'Upgrade'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}