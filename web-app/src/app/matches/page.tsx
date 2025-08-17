'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { motion } from 'framer-motion'
import { 
  Heart, 
  X, 
  Filter, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Coffee,
  Calendar,
  MessageCircle,
  Shield,
  Crown,
  Sparkles,
  Users,
  Globe,
  Music,
  Camera
} from 'lucide-react'
import MatchCard from '@/components/MatchCard'
import MatchFilters from '@/components/MatchFilters'
import MatchingAlgorithm from '@/components/MatchingAlgorithm'
import PremiumMatchesGate from '@/components/PremiumMatchesGate'
import SafetyCenter from '@/components/SafetyCenter'
import MatchConversations from '@/components/MatchConversations'

interface MatchesPageProps {}

interface UserProfile {
  id: string
  firstName: string
  lastName?: string
  profilePictureUrl?: string
  location?: string
  membershipTier: 'free' | 'core' | 'premium' | 'business' | 'student'
  isVerified?: boolean
  culturalBackground?: string
  interests?: string[]
  professionalBackground?: string
  bio?: string
  age?: number
  languagePreference?: string
  relationshipGoal?: 'friendship' | 'professional' | 'cultural_exchange' | 'any'
  familyStatus?: 'single' | 'family' | 'any'
}

interface PremiumMatch {
  id: string
  userId: string
  matchedUserId: string
  matchedUser: UserProfile
  compatibilityScore: number
  sharedInterests: string[]
  culturalCompatibility: number
  professionalCompatibility: number
  locationCompatibility: number
  matchReason: string
  isLiked: boolean
  isMatched: boolean
  createdAt: string
  expiresAt?: string
}

interface MatchFilters {
  ageRange?: [number, number]
  interests?: string[]
  professionalBackground?: string[]
  languagePreference?: 'portuguese' | 'english' | 'both'
  culturalBackground?: 'portugal' | 'brazil' | 'other_lusophone' | 'any'
  relationshipGoal?: 'friendship' | 'professional' | 'cultural_exchange' | 'any'
  familyStatus?: 'single' | 'family' | 'any'
  location?: string
  membershipTier?: 'free' | 'core' | 'premium' | 'business' | 'student'
  verifiedOnly?: boolean
}

export default function MatchesPage({}: MatchesPageProps) {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, membershipTier, subscriptionRequired } = useSubscription()
  
  const [currentTab, setCurrentTab] = useState<'discover' | 'matches' | 'conversations' | 'safety'>('discover')
  const [showFilters, setShowFilters] = useState(false)
  const [matches, setMatches] = useState<PremiumMatch[]>([])
  const [filters, setFilters] = useState<MatchFilters>({})
  const [dailyMatchesUsed, setDailyMatchesUsed] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isLiking, setIsLiking] = useState<string | null>(null)

  // Free tier limits
  const DAILY_FREE_MATCHES = 5
  const hasReachedDailyLimit = !hasActiveSubscription && dailyMatchesUsed >= DAILY_FREE_MATCHES

  useEffect(() => {
    loadMatches()
    loadDailyUsage()
  }, [filters])

  const loadMatches = async () => {
    setLoading(true)
    try {
      // Mock API call - in real app would fetch from backend
      const mockMatches = generateMockMatches()
      setMatches(mockMatches)
    } catch (error) {
      console.error('Error loading matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadDailyUsage = () => {
    const today = new Date().toDateString()
    const savedUsage = localStorage.getItem(`lusotown-daily-matches-${today}`)
    setDailyMatchesUsed(savedUsage ? parseInt(savedUsage) : 0)
  }

  const generateMockMatches = (): PremiumMatch[] => {
    const mockProfiles: UserProfile[] = [
      {
        id: 'user-1',
        firstName: 'Sofia',
        lastName: 'Fernandes',
        profilePictureUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=400&h=400&fit=crop&crop=face&auto=format',
        location: 'Canary Wharf, London',
        membershipTier: 'premium',
        isVerified: true,
        culturalBackground: 'portugal',
        interests: ['fado', 'portuguese_cuisine', 'business_networking', 'wine_tasting', 'cultural_events'],
        professionalBackground: 'Finance & Banking',
        bio: 'Portuguese finance professional passionate about preserving our cultural traditions while building meaningful business connections in London.',
        age: 32,
        languagePreference: 'both',
        relationshipGoal: 'professional',
        familyStatus: 'single'
      },
      {
        id: 'user-2',
        firstName: 'Miguel',
        lastName: 'Santos',
        profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format',
        location: 'Vauxhall, London',
        membershipTier: 'core',
        isVerified: true,
        culturalBackground: 'portugal',
        interests: ['football', 'portuguese_history', 'entrepreneurship', 'tech_innovation', 'family_activities'],
        professionalBackground: 'Technology & Startups',
        bio: 'Tech entrepreneur from Porto, building the next generation of Portuguese startups in London while staying connected to our roots.',
        age: 29,
        languagePreference: 'both',
        relationshipGoal: 'friendship',
        familyStatus: 'family'
      },
      {
        id: 'user-3',
        firstName: 'Ana',
        lastName: 'Rodrigues',
        profilePictureUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&auto=format',
        location: 'Camden, London',
        membershipTier: 'premium',
        isVerified: true,
        culturalBackground: 'brazil',
        interests: ['brazilian_music', 'cultural_exchange', 'photography', 'arts_and_culture', 'language_learning'],
        professionalBackground: 'Creative Arts & Media',
        bio: 'Brazilian photographer documenting the lusophone community in London. Love sharing stories through images and connecting cultures.',
        age: 27,
        languagePreference: 'portuguese',
        relationshipGoal: 'cultural_exchange',
        familyStatus: 'single'
      },
      {
        id: 'user-4',
        firstName: 'Carlos',
        lastName: 'Oliveira',
        profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format',
        location: 'Greenwich, London',
        membershipTier: 'business',
        isVerified: true,
        culturalBackground: 'portugal',
        interests: ['real_estate', 'portuguese_business', 'investment', 'networking', 'golf'],
        professionalBackground: 'Real Estate & Investment',
        bio: 'Portuguese real estate investor helping fellow Portuguese speakers find their perfect home in London. Business partnerships welcome.',
        age: 41,
        languagePreference: 'both',
        relationshipGoal: 'professional',
        familyStatus: 'family'
      },
      {
        id: 'user-5',
        firstName: 'Beatriz',
        lastName: 'Costa',
        profilePictureUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format',
        location: 'South Kensington, London',
        membershipTier: 'student',
        isVerified: false,
        culturalBackground: 'portugal',
        interests: ['medical_studies', 'portuguese_literature', 'volunteering', 'student_life', 'cultural_preservation'],
        professionalBackground: 'Healthcare & Medicine',
        bio: 'Medical student from Lisbon studying in London. Looking to connect with other Portuguese students and young professionals.',
        age: 24,
        languagePreference: 'both',
        relationshipGoal: 'friendship',
        familyStatus: 'single'
      }
    ]

    return mockProfiles.map((profile, index) => ({
      id: `match-${profile.id}`,
      userId: 'current-user',
      matchedUserId: profile.id,
      matchedUser: profile,
      compatibilityScore: Math.floor(75 + Math.random() * 20), // 75-95%
      sharedInterests: profile.interests?.slice(0, 2 + Math.floor(Math.random() * 2)) || [],
      culturalCompatibility: Math.floor(80 + Math.random() * 15), // 80-95%
      professionalCompatibility: Math.floor(70 + Math.random() * 25), // 70-95%
      locationCompatibility: Math.floor(60 + Math.random() * 30), // 60-90%
      matchReason: generateMatchReason(profile),
      isLiked: false,
      isMatched: false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    }))
  }

  const generateMatchReason = (profile: UserProfile): string => {
    const reasons = [
      `Shared Portuguese heritage and ${profile.professionalBackground?.toLowerCase()} background`,
      `Both interested in ${profile.interests?.[0]?.replace('_', ' ')} and located in London`,
      `Strong cultural compatibility and similar relationship goals`,
      `Professional synergy in ${profile.professionalBackground} with cultural connection`,
      `Geographic proximity and shared Portuguese community interests`
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  const handleLike = async (matchId: string) => {
    if (hasReachedDailyLimit) {
      return
    }

    setIsLiking(matchId)
    
    try {
      // Update local state
      setMatches(prev => prev.map(match => 
        match.id === matchId 
          ? { ...match, isLiked: true, isMatched: Math.random() > 0.7 } // 30% chance of mutual match
          : match
      ))

      // Update daily usage for free users
      if (!hasActiveSubscription) {
        const newUsage = dailyMatchesUsed + 1
        setDailyMatchesUsed(newUsage)
        const today = new Date().toDateString()
        localStorage.setItem(`lusotown-daily-matches-${today}`, newUsage.toString())
      }

      // Mock API call to record like
      console.log('Liked match:', matchId)
      
    } catch (error) {
      console.error('Error liking match:', error)
    } finally {
      setIsLiking(null)
    }
  }

  const handlePass = async (matchId: string) => {
    if (hasReachedDailyLimit) {
      return
    }

    try {
      // Remove from current matches
      setMatches(prev => prev.filter(match => match.id !== matchId))

      // Update daily usage for free users
      if (!hasActiveSubscription) {
        const newUsage = dailyMatchesUsed + 1
        setDailyMatchesUsed(newUsage)
        const today = new Date().toDateString()
        localStorage.setItem(`lusotown-daily-matches-${today}`, newUsage.toString())
      }

      // Mock API call to record pass
      console.log('Passed on match:', matchId)
      
    } catch (error) {
      console.error('Error passing match:', error)
    }
  }

  const mutualMatches = matches.filter(match => match.isMatched)
  const likedMatches = matches.filter(match => match.isLiked && !match.isMatched)
  const availableMatches = matches.filter(match => !match.isLiked)

  const translations = {
    en: {
      title: 'Premium Matches',
      subtitle: 'Connect with Portuguese Community Members in London & UK',
      tabs: {
        discover: 'Discover',
        matches: 'Matches',
        conversations: 'Conversations',
        safety: 'Safety'
      },
      dailyLimit: `Daily matches: ${dailyMatchesUsed}/${DAILY_FREE_MATCHES}`,
      unlimited: 'Unlimited matches',
      noMatches: 'No more matches available',
      upgradeForMore: 'Upgrade to Premium for unlimited matches',
      filters: 'Filters',
      compatibility: 'Compatibility',
      sharedInterests: 'Shared Interests',
      culturalMatch: 'Cultural Match',
      professionalMatch: 'Professional Match',
      locationMatch: 'Location Match',
      mutualMatches: 'Mutual Matches',
      likedProfiles: 'Liked Profiles',
      startConversation: 'Start Conversation',
      waitingForResponse: 'Waiting for response...',
      premiumFeatures: {
        title: 'Premium Matching Features',
        unlimited: 'Unlimited daily matches',
        advanced: 'Advanced filtering options',
        priority: 'Priority profile visibility',
        insights: 'Detailed compatibility insights',
        vip: 'VIP event access for matches'
      }
    },
    pt: {
      title: 'Matches Premium',
      subtitle: 'Conecte-se com Membros da Comunidade Portuguesa em Londres e Reino Unido',
      tabs: {
        discover: 'Descobrir',
        matches: 'Matches',
        conversations: 'Conversas',
        safety: 'Segurança'
      },
      dailyLimit: `Matches diários: ${dailyMatchesUsed}/${DAILY_FREE_MATCHES}`,
      unlimited: 'Matches ilimitados',
      noMatches: 'Não há mais matches disponíveis',
      upgradeForMore: 'Upgrade para Premium para matches ilimitados',
      filters: 'Filtros',
      compatibility: 'Compatibilidade',
      sharedInterests: 'Interesses Partilhados',
      culturalMatch: 'Match Cultural',
      professionalMatch: 'Match Profissional',
      locationMatch: 'Match de Localização',
      mutualMatches: 'Matches Mútuos',
      likedProfiles: 'Perfis Curtidos',
      startConversation: 'Iniciar Conversa',
      waitingForResponse: 'Aguardando resposta...',
      premiumFeatures: {
        title: 'Funcionalidades Premium de Matching',
        unlimited: 'Matches diários ilimitados',
        advanced: 'Opções de filtro avançadas',
        priority: 'Visibilidade prioritária do perfil',
        insights: 'Insights detalhados de compatibilidade',
        vip: 'Acesso VIP a eventos para matches'
      }
    }
  }

  const currentTranslations = translations[language]

  if (subscriptionRequired && currentTab === 'discover' && hasReachedDailyLimit) {
    return <PremiumMatchesGate />
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Heart className="h-8 w-8 text-primary-500" />
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                {currentTranslations.title}
              </h1>
              {hasActiveSubscription && (
                <Crown className="h-6 w-6 text-premium-500" />
              )}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-600 mb-6"
            >
              {currentTranslations.subtitle}
            </motion.p>

            {/* Match Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
                {hasActiveSubscription ? currentTranslations.unlimited : currentTranslations.dailyLimit}
              </div>
              
              {membershipTier !== 'none' && (
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  membershipTier === 'platinum' ? 'bg-premium-50 text-premium-700' :
                  membershipTier === 'gold' ? 'bg-accent-50 text-accent-700' :
                  membershipTier === 'silver' ? 'bg-neutral-100 text-neutral-700' :
                  'bg-coral-50 text-coral-700'
                }`}>
                  {membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)} Member
                </div>
              )}
            </motion.div>

            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="bg-neutral-100 p-1 rounded-xl">
                {Object.entries(currentTranslations.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentTab(key as any)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentTab === key
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'discover' && (
          <div className="space-y-8">
            {/* Filters Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
              >
                <Filter className="h-5 w-5" />
                {currentTranslations.filters}
              </button>
              
              {!hasActiveSubscription && (
                <div className="text-sm text-neutral-500">
                  {hasReachedDailyLimit ? currentTranslations.upgradeForMore : `${DAILY_FREE_MATCHES - dailyMatchesUsed} matches remaining today`}
                </div>
              )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <MatchFilters
                filters={filters}
                onFiltersChange={setFilters}
                hasActiveSubscription={hasActiveSubscription}
              />
            )}

            {/* Matches Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
                ))}
              </div>
            ) : availableMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onLike={() => handleLike(match.id)}
                    onPass={() => handlePass(match.id)}
                    isLiking={isLiking === match.id}
                    disabled={hasReachedDailyLimit}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {currentTranslations.noMatches}
                </h3>
                {!hasActiveSubscription && (
                  <p className="text-neutral-600 mb-6">
                    {currentTranslations.upgradeForMore}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {currentTab === 'matches' && (
          <div className="space-y-8">
            {/* Mutual Matches */}
            {mutualMatches.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent-500" />
                  {currentTranslations.mutualMatches} ({mutualMatches.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mutualMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-xl p-6 shadow-sm border-2 border-accent-200">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={match.matchedUser.profilePictureUrl}
                          alt={match.matchedUser.firstName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-neutral-900">
                            {match.matchedUser.firstName} {match.matchedUser.lastName}
                          </h4>
                          <p className="text-sm text-neutral-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {match.matchedUser.location}
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-accent-500 text-white py-2 rounded-lg font-medium hover:bg-accent-600 transition-colors">
                        {currentTranslations.startConversation}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liked Profiles */}
            {likedMatches.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-action-500" />
                  {currentTranslations.likedProfiles} ({likedMatches.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={match.matchedUser.profilePictureUrl}
                          alt={match.matchedUser.firstName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-neutral-900">
                            {match.matchedUser.firstName} {match.matchedUser.lastName}
                          </h4>
                          <p className="text-sm text-neutral-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {match.matchedUser.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 text-center">
                        {currentTranslations.waitingForResponse}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mutualMatches.length === 0 && likedMatches.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No matches yet
                </h3>
                <p className="text-neutral-600">
                  Start discovering profiles to make your first match!
                </p>
              </div>
            )}
          </div>
        )}

        {currentTab === 'conversations' && (
          <MatchConversations mutualMatches={mutualMatches} />
        )}

        {currentTab === 'safety' && (
          <SafetyCenter />
        )}
      </div>

      {/* Premium Features Sidebar (Premium users only) */}
      {hasActiveSubscription && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 w-64 hidden xl:block">
          <div className="text-center mb-4">
            <Crown className="h-8 w-8 text-premium-500 mx-auto mb-2" />
            <h4 className="font-semibold text-neutral-900">{currentTranslations.premiumFeatures.title}</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-secondary-600">
              <Sparkles className="h-4 w-4" />
              {currentTranslations.premiumFeatures.unlimited}
            </div>
            <div className="flex items-center gap-2 text-secondary-600">
              <Filter className="h-4 w-4" />
              {currentTranslations.premiumFeatures.advanced}
            </div>
            <div className="flex items-center gap-2 text-secondary-600">
              <Crown className="h-4 w-4" />
              {currentTranslations.premiumFeatures.priority}
            </div>
            <div className="flex items-center gap-2 text-secondary-600">
              <Calendar className="h-4 w-4" />
              {currentTranslations.premiumFeatures.vip}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}