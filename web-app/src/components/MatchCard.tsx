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
  Wine,
  Sparkles,
  Calendar
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
      whileHover={{ scale: 1.02, y: -4 }}
      className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 overflow-hidden transition-all duration-300 ${disabled ? 'opacity-50' : 'hover:shadow-2xl'}`}
    >
      {/* Enhanced Profile Image */}
      <div className="relative h-56 sm:h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
        <img
          src={matchedUser.profilePictureUrl}
          alt={matchedUser.firstName}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Enhanced Compatibility Score */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-white/40">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              compatibilityScore >= 90 ? 'bg-secondary-500' :
              compatibilityScore >= 80 ? 'bg-accent-500' :
              compatibilityScore >= 70 ? 'bg-coral-500' : 'bg-action-500'
            }`} />
            <span className="text-sm font-bold text-neutral-800">
              {compatibilityScore}%
            </span>
          </div>
        </div>

        {/* Enhanced Membership Badge */}
        <div className={`absolute top-3 right-3 ${membershipBadge.color} rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg backdrop-blur-md`}>
          <MembershipIcon className="h-4 w-4" />
          <span className="text-xs font-bold">{membershipBadge.label}</span>
        </div>

        {/* Enhanced Verification Badge */}
        {matchedUser.isVerified && (
          <div className="absolute bottom-3 right-3 bg-secondary-500 text-white rounded-xl p-2 shadow-lg">
            <Shield className="h-4 w-4" />
          </div>
        )}

        {/* Enhanced Cultural Background Flag */}
        <div className="absolute bottom-3 left-3 text-3xl drop-shadow-lg">
          {getFlagEmoji(matchedUser.culturalBackground)}
        </div>
      </div>

      {/* Enhanced Profile Content */}
      <div className="p-4 sm:p-6">
        {/* Enhanced Basic Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {matchedUser.firstName} {matchedUser.lastName}
              </h3>
              {matchedUser.relationshipGoal && (
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {t.lookingFor}: {getGoalLabel(matchedUser.relationshipGoal)}
                  </span>
                </div>
              )}
            </div>
            {matchedUser.age && (
              <div className="text-right">
                <span className="text-lg font-bold text-neutral-700">
                  {matchedUser.age}
                </span>
                <span className="text-xs text-neutral-500 block">
                  {t.yearsOld}
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 text-neutral-600">
              <div className="w-5 h-5 bg-primary-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-3 w-3 text-primary-600" />
              </div>
              <span className="font-medium">{matchedUser.location}</span>
            </div>
            {matchedUser.professionalBackground && (
              <div className="flex items-center gap-2 text-neutral-600">
                <div className="w-5 h-5 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-3 w-3 text-secondary-600" />
                </div>
                <span className="font-medium">{matchedUser.professionalBackground}</span>
              </div>
            )}
          </div>
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

        {/* Enhanced Compatibility Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-500 rounded-full" />
            {t.compatibility}
          </h4>
          <div className="space-y-3">
            <div className="bg-neutral-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">{t.cultural}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCompatibilityColor(culturalCompatibility)}`}>
                  {culturalCompatibility}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-secondary-400 to-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${culturalCompatibility}%` }}
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">{t.professional}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCompatibilityColor(professionalCompatibility)}`}>
                  {professionalCompatibility}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent-400 to-accent-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${professionalCompatibility}%` }}
                />
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">{t.location}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getCompatibilityColor(locationCompatibility)}`}>
                  {locationCompatibility}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-coral-400 to-coral-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${locationCompatibility}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Shared Interests */}
        {sharedInterests.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-500 rounded-full" />
              {t.sharedInterests}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {sharedInterests.slice(0, 4).map((interest) => {
                const InterestIcon = getInterestIcon(interest)
                return (
                  <motion.div
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200/50 text-primary-700 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:shadow-md"
                  >
                    <InterestIcon className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{interest.replace('_', ' ')}</span>
                  </motion.div>
                )
              })}
              {sharedInterests.length > 4 && (
                <div className="flex items-center justify-center bg-neutral-100 text-neutral-600 px-3 py-2 rounded-xl text-xs font-medium col-span-2">
                  +{sharedInterests.length - 4} more interests
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Match Reason */}
        <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 via-secondary-50 to-primary-50 border border-accent-200/50 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <p className="text-sm text-accent-800 font-medium leading-relaxed">
              "{matchReason}"
            </p>
          </div>
        </div>

        {/* Event Recommendations Preview */}
        <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 via-secondary-50 to-coral-50 rounded-2xl border border-accent-200">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-accent-600" />
            <span className="text-sm font-medium text-accent-800">Perfect Events Together</span>
          </div>
          <div className="text-xs text-accent-700 mb-2">
            Based on your shared cultural interests:
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white/70 rounded-lg p-2 border border-accent-200/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-coral-100 rounded-lg flex items-center justify-center">
                  <Music className="h-3 w-3 text-coral-600" />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-900">Noite de Fado</div>
                  <div className="text-xs text-gray-600">95% compatibility</div>
                </div>
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-2 border border-accent-200/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Utensils className="h-3 w-3 text-secondary-600" />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-900">Portuguese Cooking</div>
                  <div className="text-xs text-gray-600">88% compatibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPass}
            disabled={disabled || isLiking}
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <X className="h-5 w-5" />
            <span className="text-sm sm:text-base">{t.pass}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLike}
            disabled={disabled || isLiking}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-action-500 via-coral-500 to-secondary-500 hover:from-action-600 hover:via-coral-600 hover:to-secondary-600 text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <Heart className={`h-5 w-5 ${isLiking ? 'animate-bounce' : ''}`} />
            <span className="text-sm sm:text-base">
              {isLiking ? '...' : t.like}
            </span>
          </motion.button>
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