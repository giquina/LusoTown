'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import MatchingProfile from './MatchingProfile'
import MatchFilters from './MatchFilters'
import { DEFAULT_CULTURAL_MATCHING_CONFIG } from '@/config/cultural-preferences'

interface MatchingProfile {
  id: string
  name: string
  age: number
  location: {
    city: string
    distance?: number
  }
  profileImage?: string
  bio: string
  culturalBackground: string[]
  interests: string[]
  languageSkills: {
    portuguese: string
    english: string
  }
  culturalValues: string[]
  education?: string
  occupation?: string
  lookingFor: string[]
  profileCompleteness: number
  isVerified: boolean
  lastActive: string
  photos: string[]
  safetyScore: number
  compatibilityScore?: number
}

interface CulturalMatchingSystemProps {
  userProfile?: Partial<MatchingProfile>
  initialMatches?: MatchingProfile[]
}

export default function CulturalMatchingSystem({
  userProfile,
  initialMatches = []
}: CulturalMatchingSystemProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const [matches, setMatches] = useState<MatchingProfile[]>(initialMatches)
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    ageRange: [18, 65] as [number, number],
    maxDistance: 25,
    culturalBackground: [] as string[],
    interests: [] as string[],
    languageProficiency: '',
    education: '',
    lookingFor: [] as string[],
    minCompatibility: 60
  })

  // Statistics
  const [stats, setStats] = useState({
    totalLikes: 0,
    totalPasses: 0,
    matches: 0,
    messages: 0
  })

  useEffect(() => {
    if (matches.length === 0 || currentMatchIndex >= matches.length - 2) {
      loadMoreMatches()
    }
  }, [currentMatchIndex, matches.length])

  const loadMoreMatches = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        age_min: filters.ageRange[0].toString(),
        age_max: filters.ageRange[1].toString(),
        max_distance: filters.maxDistance.toString(),
        min_compatibility: filters.minCompatibility.toString(),
        limit: '10'
      })

      if (filters.culturalBackground.length > 0) {
        params.append('cultural_background', filters.culturalBackground.join(','))
      }
      if (filters.interests.length > 0) {
        params.append('interests', filters.interests.join(','))
      }
      if (filters.languageProficiency) {
        params.append('language_proficiency', filters.languageProficiency)
      }

      const response = await fetch(`/api/matching/profiles?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        const newMatches = data.profiles || []
        
        // Calculate compatibility scores
        const scoredMatches = newMatches.map((match: MatchingProfile) => ({
          ...match,
          compatibilityScore: calculateCompatibility(userProfile, match)
        }))

        setMatches(prev => [...prev, ...scoredMatches])
      }
    } catch (error) {
      console.error('Failed to load matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateCompatibility = (user?: Partial<MatchingProfile>, match?: MatchingProfile): number => {
    if (!user || !match) return 0

    let score = 0
    const config = DEFAULT_CULTURAL_MATCHING_CONFIG

    // Cultural background compatibility
    if (user.culturalBackground && match.culturalBackground) {
      const sharedCulture = user.culturalBackground.some(bg => 
        match.culturalBackground.includes(bg)
      )
      if (sharedCulture) score += config.weights.cultural * 100
    }

    // Interest compatibility
    if (user.interests && match.interests) {
      const sharedInterests = user.interests.filter(interest => 
        match.interests.includes(interest)
      ).length
      const interestScore = (sharedInterests / Math.max(user.interests.length, match.interests.length)) * 100
      score += config.weights.interests * interestScore
    }

    // Language compatibility
    if (user.languageSkills && match.languageSkills) {
      const userPtLevel = getLanguageScore(user.languageSkills.portuguese)
      const matchPtLevel = getLanguageScore(match.languageSkills.portuguese)
      const languageScore = 100 - Math.abs(userPtLevel - matchPtLevel) * 10
      score += config.weights.language * Math.max(0, languageScore)
    }

    // Age compatibility
    if (user.age && match.age) {
      const ageDiff = Math.abs(user.age - match.age)
      const ageScore = Math.max(0, 100 - ageDiff * 5)
      score += config.weights.age * ageScore
    }

    return Math.round(Math.min(100, score))
  }

  const getLanguageScore = (level: string): number => {
    const scores: Record<string, number> = {
      native: 10,
      fluent: 9,
      intermediate: 6,
      beginner: 3
    }
    return scores[level] || 5
  }

  const handleLike = async (profileId: string) => {
    try {
      const response = await fetch('/api/matching/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId })
      })

      if (response.ok) {
        const data = await response.json()
        setStats(prev => ({
          ...prev,
          totalLikes: prev.totalLikes + 1,
          matches: data.isMatch ? prev.matches + 1 : prev.matches
        }))

        if (data.isMatch) {
          // Show match celebration
          showMatchCelebration(profileId)
        }
      }
    } catch (error) {
      console.error('Failed to like profile:', error)
    }
    
    moveToNextProfile()
  }

  const handlePass = async (profileId: string) => {
    try {
      await fetch('/api/matching/pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId })
      })

      setStats(prev => ({
        ...prev,
        totalPasses: prev.totalPasses + 1
      }))
    } catch (error) {
      console.error('Failed to pass profile:', error)
    }
    
    moveToNextProfile()
  }

  const handleReport = async (profileId: string) => {
    try {
      await fetch('/api/matching/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          profileId,
          reason: 'inappropriate_content' 
        })
      })
    } catch (error) {
      console.error('Failed to report profile:', error)
    }
    
    moveToNextProfile()
  }

  const moveToNextProfile = () => {
    setCurrentMatchIndex(prev => prev + 1)
  }

  const showMatchCelebration = (profileId: string) => {
    // This would show a match celebration modal/animation
    console.log('Match celebration for:', profileId)
  }

  const currentMatch = matches[currentMatchIndex]

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('matching.discover_title', 'Discover Portuguese Speakers')}
        </h1>
        <p className="text-gray-600">
          {t('matching.discover_subtitle', 'Find meaningful connections within the Portuguese-speaking community')}
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>
            {stats.totalLikes}
          </div>
          <div className="text-sm text-gray-600">
            {t('matching.likes_given', 'Likes Given')}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
            {stats.matches}
          </div>
          <div className="text-sm text-gray-600">
            {t('matching.matches', 'Matches')}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: colors.accent }}>
            {stats.messages}
          </div>
          <div className="text-sm text-gray-600">
            {t('matching.messages', 'Messages')}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold mb-1 text-gray-600">
            {currentMatch?.compatibilityScore || 0}%
          </div>
          <div className="text-sm text-gray-600">
            {t('matching.compatibility', 'Compatibility')}
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <span>🎛️</span>
          <span>{t('matching.filters', 'Filters')}</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <MatchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onApply={() => {
              setMatches([])
              setCurrentMatchIndex(0)
              loadMoreMatches()
              setShowFilters(false)
            }}
          />
        </div>
      )}

      {/* Main Matching Interface */}
      <div className="flex justify-center">
        {loading && matches.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {t('matching.loading_profiles', 'Finding Portuguese speakers near you...')}
            </p>
          </div>
        ) : currentMatch ? (
          <div className="relative">
            {/* Profile Card */}
            <MatchingProfile
              profile={currentMatch}
              onLike={handleLike}
              onPass={handlePass}
              onReport={handleReport}
              showActions={true}
            />

            {/* Compatibility Badge */}
            {currentMatch.compatibilityScore && currentMatch.compatibilityScore > 70 && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                🔥 {currentMatch.compatibilityScore}% {t('matching.match', 'Match')}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('matching.no_more_profiles', 'No more profiles')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('matching.check_back_later', 'Check back later for new Portuguese speakers to discover!')}
            </p>
            <button
              onClick={() => {
                setMatches([])
                setCurrentMatchIndex(0)
                loadMoreMatches()
              }}
              className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              {t('matching.search_again', 'Search Again')}
            </button>
          </div>
        )}
      </div>

      {/* Safety Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span>🛡️</span>
          <span className="font-medium text-yellow-800">
            {t('matching.safety_first', 'Safety First')}
          </span>
        </div>
        <p className="text-yellow-700 text-sm">
          {t('matching.safety_message', 'Always meet in public places and trust your instincts. Report any inappropriate behavior.')}
        </p>
      </div>

      {/* Community Guidelines */}
      <div className="text-center text-sm text-gray-500">
        <p>
          {t('matching.community_guidelines', 'By using our matching service, you agree to our')} {' '}
          <a href="/community-guidelines" className="text-blue-600 hover:underline">
            {t('matching.community_guidelines_link', 'Community Guidelines')}
          </a>
          {' '}{t('common.and', 'and')}{' '}
          <a href="/safety" className="text-blue-600 hover:underline">
            {t('matching.safety_tips', 'Safety Tips')}
          </a>
        </p>
      </div>
    </div>
  )
}