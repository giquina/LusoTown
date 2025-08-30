'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { CULTURAL_INTEREST_CATEGORIES, CULTURAL_VALUES, LANGUAGE_PROFICIENCY_LEVELS } from '@/config/cultural-preferences'

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
}

interface MatchingProfileProps {
  profile: MatchingProfile
  onLike?: (profileId: string) => void
  onPass?: (profileId: string) => void
  onReport?: (profileId: string) => void
  showActions?: boolean
  compact?: boolean
}

export default function MatchingProfile({
  profile,
  onLike,
  onPass,
  onReport,
  showActions = true,
  compact = false
}: MatchingProfileProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFullBio, setShowFullBio] = useState(false)

  const getLanguageProficiencyLabel = (level: string) => {
    const proficiency = LANGUAGE_PROFICIENCY_LEVELS.find(p => p.level === level)
    return proficiency ? (language === 'pt' ? proficiency.namePt : proficiency.nameEn) : level
  }

  const getCulturalInterestLabel = (interestId: string) => {
    for (const category of CULTURAL_INTEREST_CATEGORIES) {
      const interest = category.interests.find(i => i.id === interestId)
      if (interest) {
        return language === 'pt' ? interest.namePt : interest.nameEn
      }
    }
    return interestId
  }

  const getCulturalValueLabel = (valueId: string) => {
    const value = CULTURAL_VALUES.find(v => v.id === valueId)
    return value ? (language === 'pt' ? value.namePt : value.nameEn) : valueId
  }

  const getCulturalFlag = (culturalBackground: string) => {
    const flags: Record<string, string> = {
      portugal: '🇵🇹',
      brazil: '🇧🇷',
      angola: '🇦🇴',
      cape_verde: '🇨🇻',
      mozambique: '🇲🇿',
      guinea_bissau: '🇬🇼',
      sao_tome: '🇸🇹',
      timor_leste: '🇹🇱',
      macau: '🇲🇴'
    }
    return flags[culturalBackground] || '🌍'
  }

  const getActivityStatus = (lastActive: string) => {
    const now = new Date()
    const lastActiveDate = new Date(lastActive)
    const diffInHours = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 3600))
    
    if (diffInHours < 1) return { label: t('matching.online_now', 'Online now'), color: 'bg-green-400' }
    if (diffInHours < 24) return { label: t('matching.active_today', 'Active today'), color: 'bg-yellow-400' }
    if (diffInHours < 168) return { label: t('matching.active_week', 'Active this week'), color: 'bg-gray-400' }
    return { label: t('matching.offline', 'Offline'), color: 'bg-gray-300' }
  }

  const activityStatus = getActivityStatus(profile.lastActive)

  const handlePhotoNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPhotoIndex(prev => 
        prev === 0 ? profile.photos.length - 1 : prev - 1
      )
    } else {
      setCurrentPhotoIndex(prev => 
        prev === profile.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${compact ? 'max-w-sm' : 'max-w-md'}`}>
      {/* Photo Gallery */}
      <div className="relative">
        <div className={`relative ${compact ? 'h-64' : 'h-96'} overflow-hidden`}>
          {profile.photos && profile.photos.length > 0 ? (
            <>
              <Image
                src={profile.photos[currentPhotoIndex]}
                alt={`${profile.name}'s photo ${currentPhotoIndex + 1}`}
                fill
                className="object-cover"
              />
              
              {/* Photo Navigation */}
              {profile.photos.length > 1 && (
                <>
                  <button
                    onClick={() => handlePhotoNavigation('prev')}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handlePhotoNavigation('next')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                  >
                    →
                  </button>
                  
                  {/* Photo Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {profile.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-6xl text-gray-400">👤</div>
            </div>
          )}
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {profile.isVerified && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ✓ {t('common.verified', 'Verified')}
            </div>
          )}
          
          <div className={`text-white px-2 py-1 rounded-full text-xs font-medium ${activityStatus.color}`}>
            {activityStatus.label}
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="absolute top-3 right-3">
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            {profile.profileCompleteness}% {t('matching.complete', 'Complete')}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className={`${compact ? 'p-4' : 'p-6'} space-y-4`}>
        {/* Name, Age, Location */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className={`font-bold text-gray-900 ${compact ? 'text-xl' : 'text-2xl'}`}>
              {profile.name}, {profile.age}
            </h2>
            {profile.safetyScore >= 8 && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                {t('matching.safe_profile', 'Safe Profile')}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <span>📍</span>
            <span className="text-sm">
              {profile.location.city}
              {profile.location.distance && (
                <span className="ml-1">• {profile.location.distance}km {t('common.away', 'away')}</span>
              )}
            </span>
          </div>
        </div>

        {/* Cultural Background */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2 text-sm">
            {t('matching.cultural_background', 'Cultural Background')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.culturalBackground.map((background, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                <span>{getCulturalFlag(background)}</span>
                <span className="capitalize">{background.replace('_', ' ')}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2 text-sm">
            {t('matching.languages', 'Languages')}
          </h3>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span>🇵🇹</span>
              <span>{getLanguageProficiencyLabel(profile.languageSkills.portuguese)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🇬🇧</span>
              <span>{getLanguageProficiencyLabel(profile.languageSkills.english)}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2 text-sm">
            {t('matching.about', 'About')}
          </h3>
          <div className="text-gray-700 text-sm">
            {showFullBio ? (
              <div>
                {profile.bio}
                <button
                  onClick={() => setShowFullBio(false)}
                  className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                >
                  {t('common.show_less', 'Show less')}
                </button>
              </div>
            ) : (
              <div>
                {profile.bio.length > 100 ? (
                  <div>
                    {profile.bio.substring(0, 100)}...
                    <button
                      onClick={() => setShowFullBio(true)}
                      className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                    >
                      {t('common.show_more', 'Show more')}
                    </button>
                  </div>
                ) : (
                  profile.bio
                )}
              </div>
            )}
          </div>
        </div>

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800 mb-2 text-sm">
              {t('matching.interests', 'Interests')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.slice(0, compact ? 3 : 5).map((interestId, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: colors.secondary }}
                >
                  {getCulturalInterestLabel(interestId)}
                </span>
              ))}
              {profile.interests.length > (compact ? 3 : 5) && (
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  +{profile.interests.length - (compact ? 3 : 5)} {t('common.more', 'more')}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Cultural Values */}
        {profile.culturalValues.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800 mb-2 text-sm">
              {t('matching.values', 'Values')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.culturalValues.slice(0, 3).map((valueId, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: colors.accent }}
                >
                  {getCulturalValueLabel(valueId)}
                </span>
              ))}
              {profile.culturalValues.length > 3 && (
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  +{profile.culturalValues.length - 3} {t('common.more', 'more')}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Education & Work */}
        {(profile.education || profile.occupation) && (
          <div className="text-sm text-gray-600 space-y-1">
            {profile.education && (
              <div className="flex items-center space-x-2">
                <span>🎓</span>
                <span>{profile.education}</span>
              </div>
            )}
            {profile.occupation && (
              <div className="flex items-center space-x-2">
                <span>💼</span>
                <span>{profile.occupation}</span>
              </div>
            )}
          </div>
        )}

        {/* Looking For */}
        {profile.lookingFor.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800 mb-2 text-sm">
              {t('matching.looking_for', 'Looking For')}
            </h3>
            <div className="text-sm text-gray-600">
              {profile.lookingFor.join(', ')}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <button
              onClick={() => onPass && onPass(profile.id)}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
            >
              <span>👋</span>
              <span>{t('matching.pass', 'Pass')}</span>
            </button>
            
            <button
              onClick={() => onLike && onLike(profile.id)}
              className="flex-1 py-3 px-4 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              style={{ backgroundColor: colors.action }}
            >
              <span>❤️</span>
              <span>{t('matching.like', 'Like')}</span>
            </button>
          </div>
          
          {/* Report Option */}
          <button
            onClick={() => onReport && onReport(profile.id)}
            className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            {t('matching.report_profile', 'Report this profile')}
          </button>
        </div>
      )}
    </div>
  )
}