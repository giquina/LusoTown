'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  Heart, 
  X, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe,
  Shield,
  Crown,
  Music,
  Coffee,
  Camera,
  Building,
  Utensils,
  Palette,
  Users,
  BookOpen,
  Stethoscope,
  Plane,
  Goal,
  Wine
} from 'lucide-react'

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

interface MatchCardProps {
  match: PremiumMatch
  onLike: () => void
  onPass: () => void
  isLiking: boolean
  disabled: boolean
}

export default function MatchCard({ match, onLike, onPass, isLiking, disabled }: MatchCardProps) {
  const { language } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)

  const { matchedUser, compatibilityScore, sharedInterests, culturalCompatibility, professionalCompatibility, locationCompatibility, matchReason } = match

  const getInterestIcon = (interest: string) => {
    const iconMap: { [key: string]: any } = {
      'fado': Music,
      'portuguese_cuisine': Utensils,
      'business_networking': Users,
      'wine_tasting': Wine,
      'cultural_events': Palette,
      'football': Goal,
      'portuguese_history': BookOpen,
      'entrepreneurship': Building,
      'tech_innovation': GraduationCap,
      'family_activities': Users,
      'brazilian_music': Music,
      'cultural_exchange': Globe,
      'photography': Camera,
      'arts_and_culture': Palette,
      'language_learning': BookOpen,
      'real_estate': Building,
      'portuguese_business': Building,
      'investment': Building,
      'networking': Users,
      'golf': Coffee,
      'medical_studies': Stethoscope,
      'portuguese_literature': BookOpen,
      'volunteering': Heart,
      'student_life': GraduationCap,
      'cultural_preservation': Shield
    }
    return iconMap[interest] || Coffee
  }

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case 'premium':
        return { color: 'text-premium-600 bg-premium-50', icon: Crown, label: 'Premium' }
      case 'business':
        return { color: 'text-accent-600 bg-accent-50', icon: Building, label: 'Business' }
      case 'student':
        return { color: 'text-secondary-600 bg-secondary-50', icon: GraduationCap, label: 'Student' }
      case 'core':
        return { color: 'text-coral-600 bg-coral-50', icon: Shield, label: 'Core' }
      default:
        return { color: 'text-neutral-600 bg-neutral-50', icon: Users, label: 'Free' }
    }
  }

  const membershipBadge = getMembershipBadge(matchedUser.membershipTier)
  const MembershipIcon = membershipBadge.icon

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-secondary-600 bg-secondary-50'
    if (score >= 80) return 'text-accent-600 bg-accent-50'
    if (score >= 70) return 'text-coral-600 bg-coral-50'
    return 'text-neutral-600 bg-neutral-50'
  }

  const getGoalLabel = (goal?: string) => {
    const labels = {
      en: {
        friendship: 'Friendship',
        professional: 'Professional',
        cultural_exchange: 'Cultural Exchange',
        any: 'Open to All'
      },
      pt: {
        friendship: 'Amizade',
        professional: 'Profissional',
        cultural_exchange: 'Intercâmbio Cultural',
        any: 'Aberto a Tudo'
      }
    }
    return labels[language]?.[goal as keyof typeof labels.en] || goal
  }

  const getFlagEmoji = (background?: string) => {
    switch (background) {
      case 'portugal': return '🇵🇹'
      case 'brazil': return '🇧🇷'
      case 'other_lusophone': return '🌍'
      default: return '🇬🇧'
    }
  }

  const translations = {
    en: {
      compatibility: 'Compatibility',
      cultural: 'Cultural',
      professional: 'Professional',
      location: 'Location',
      sharedInterests: 'Shared Interests',
      lookingFor: 'Looking for',
      verified: 'Verified',
      yearsOld: 'years old',
      showMore: 'Show more',
      showLess: 'Show less',
      like: 'Like',
      pass: 'Pass',
      upgradeRequired: 'Upgrade to continue matching'
    },
    pt: {
      compatibility: 'Compatibilidade',
      cultural: 'Cultural',
      professional: 'Profissional',
      location: 'Localização',
      sharedInterests: 'Interesses Partilhados',
      lookingFor: 'À procura de',
      verified: 'Verificado',
      yearsOld: 'anos',
      showMore: 'Ver mais',
      showLess: 'Ver menos',
      like: 'Curtir',
      pass: 'Passar',
      upgradeRequired: 'Upgrade necessário para continuar'
    }
  }

  const t = translations[language]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${disabled ? 'opacity-50' : ''}`}
    >
      {/* Profile Image */}
      <div className="relative h-64 bg-neutral-100">
        <img
          src={matchedUser.profilePictureUrl}
          alt={matchedUser.firstName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Compatibility Score */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-primary-600">
            {compatibilityScore}% {t.compatibility}
          </span>
        </div>

        {/* Membership Badge */}
        <div className={`absolute top-4 right-4 ${membershipBadge.color} rounded-full px-2 py-1 flex items-center gap-1`}>
          <MembershipIcon className="h-3 w-3" />
          <span className="text-xs font-medium">{membershipBadge.label}</span>
        </div>

        {/* Verification Badge */}
        {matchedUser.isVerified && (
          <div className="absolute bottom-4 right-4 bg-secondary-500 text-white rounded-full p-2">
            <Shield className="h-4 w-4" />
          </div>
        )}

        {/* Cultural Background Flag */}
        <div className="absolute bottom-4 left-4 text-2xl">
          {getFlagEmoji(matchedUser.culturalBackground)}
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Basic Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-neutral-900">
              {matchedUser.firstName} {matchedUser.lastName}
            </h3>
            {matchedUser.age && (
              <span className="text-sm text-neutral-600">
                {matchedUser.age} {t.yearsOld}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {matchedUser.location}
            </div>
            {matchedUser.professionalBackground && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {matchedUser.professionalBackground}
              </div>
            )}
          </div>

          {matchedUser.relationshipGoal && (
            <div className="text-sm text-neutral-600 mb-3">
              {t.lookingFor}: <span className="font-medium">{getGoalLabel(matchedUser.relationshipGoal)}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {matchedUser.bio && (
          <div className="mb-4">
            <p className="text-sm text-neutral-700 leading-relaxed">
              {showFullBio ? matchedUser.bio : `${matchedUser.bio.slice(0, 120)}${matchedUser.bio.length > 120 ? '...' : ''}`}
            </p>
            {matchedUser.bio.length > 120 && (
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-primary-600 text-sm font-medium mt-1 hover:text-primary-700"
              >
                {showFullBio ? t.showLess : t.showMore}
              </button>
            )}
          </div>
        )}

        {/* Compatibility Breakdown */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">{t.cultural}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getCompatibilityColor(culturalCompatibility)}`}>
              {culturalCompatibility}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">{t.professional}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getCompatibilityColor(professionalCompatibility)}`}>
              {professionalCompatibility}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">{t.location}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getCompatibilityColor(locationCompatibility)}`}>
              {locationCompatibility}%
            </span>
          </div>
        </div>

        {/* Shared Interests */}
        {sharedInterests.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-neutral-900 mb-2">{t.sharedInterests}</h4>
            <div className="flex flex-wrap gap-2">
              {sharedInterests.slice(0, 3).map((interest) => {
                const InterestIcon = getInterestIcon(interest)
                return (
                  <div
                    key={interest}
                    className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs"
                  >
                    <InterestIcon className="h-3 w-3" />
                    {interest.replace('_', ' ')}
                  </div>
                )
              })}
              {sharedInterests.length > 3 && (
                <div className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full text-xs">
                  +{sharedInterests.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Match Reason */}
        <div className="mb-6 p-3 bg-accent-50 rounded-lg">
          <p className="text-sm text-accent-800 italic">
            "{matchReason}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onPass}
            disabled={disabled || isLiking}
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
            {t.pass}
          </button>
          
          <button
            onClick={onLike}
            disabled={disabled || isLiking}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-action-500 to-coral-500 text-white py-3 rounded-xl font-medium hover:from-action-600 hover:to-coral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className={`h-5 w-5 ${isLiking ? 'animate-pulse' : ''}`} />
            {isLiking ? '...' : t.like}
          </button>
        </div>

        {disabled && (
          <div className="mt-3 text-center">
            <p className="text-sm text-coral-600 font-medium">{t.upgradeRequired}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}