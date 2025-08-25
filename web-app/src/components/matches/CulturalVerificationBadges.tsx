'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  HeartIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  CakeIcon,
  MapPinIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import {
  ShieldCheckIcon as ShieldCheckSolidIcon,
  StarIcon as StarSolidIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

export interface VerificationBadge {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: 'heritage' | 'events' | 'community' | 'traditions' | 'travel' | 'cultural'
  earnedAt: string
  verificationScore: number
}

interface CulturalVerificationBadgesProps {
  badges: VerificationBadge[]
  size?: 'small' | 'medium' | 'large'
  showAll?: boolean
  maxDisplay?: number
  showTooltips?: boolean
  animated?: boolean
}

const BADGE_DEFINITIONS = {
  heritage_verified: {
    icon: '🛡️',
    color: 'emerald',
    category: 'heritage' as const,
    requirements: ['3+ heritage photos', 'Family cultural items verified']
  },
  event_verified: {
    icon: '🎪',
    color: 'blue',
    category: 'events' as const,
    requirements: ['Event photos with timestamps', 'Recognized Lusophone events']
  },
  community_member: {
    icon: '👑',
    color: 'pink',
    category: 'community' as const,
    requirements: ['Community event participation', 'Lusophone social activities']
  },
  cultural_guardian: {
    icon: '🏆',
    color: 'indigo',
    category: 'traditions' as const,
    requirements: ['Traditional Lusophone elements', 'Cultural knowledge demonstration']
  },
  lusophone_traveler: {
    icon: '🌍',
    color: 'purple',
    category: 'travel' as const,
    requirements: ['Photos from Portugal/Brazil/Angola/etc.', 'Geolocation verification']
  },
  fado_lover: {
    icon: '🎵',
    color: 'slate',
    category: 'cultural' as const,
    requirements: ['Fado event photos', 'Portuguese music venues']
  },
  santos_populares_champion: {
    icon: '🎊',
    color: 'yellow',
    category: 'events' as const,
    requirements: ['Santos Populares celebration photos', 'Traditional decorations']
  },
  pasteis_connoisseur: {
    icon: '🧁',
    color: 'orange',
    category: 'cultural' as const,
    requirements: ['Pastéis de nata photos', 'Lusophone bakery visits']
  },
  azulejos_admirer: {
    icon: '🎨',
    color: 'blue',
    category: 'heritage' as const,
    requirements: ['Azulejos photos', 'Lusophone tile appreciation']
  },
  football_fanatic: {
    icon: '⚽',
    color: 'green',
    category: 'cultural' as const,
    requirements: ['Portugal national team support', 'Football celebration photos']
  }
}

export default function CulturalVerificationBadges({
  badges,
  size = 'medium',
  showAll = false,
  maxDisplay = 3,
  showTooltips = true,
  animated = true
}: CulturalVerificationBadgesProps) {
  const { language } = useLanguage()

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'gap-1',
          badge: 'w-6 h-6 text-xs',
          text: 'text-xs',
          spacing: 'px-1.5 py-0.5'
        }
      case 'large':
        return {
          container: 'gap-3',
          badge: 'w-12 h-12 text-lg',
          text: 'text-sm',
          spacing: 'px-3 py-2'
        }
      default:
        return {
          container: 'gap-2',
          badge: 'w-8 h-8 text-sm',
          text: 'text-xs',
          spacing: 'px-2 py-1'
        }
    }
  }

  const getRarityColor = (rarity: string, color: string) => {
    const baseColors = {
      emerald: 'from-emerald-400 to-emerald-600',
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      pink: 'from-pink-400 to-pink-600',
      indigo: 'from-indigo-400 to-indigo-600',
      yellow: 'from-yellow-400 to-yellow-600',
      orange: 'from-orange-400 to-orange-600',
      slate: 'from-slate-400 to-slate-600',
      green: 'from-green-400 to-green-600'
    }

    const rarityEffects = {
      common: '',
      rare: 'shadow-lg ring-2 ring-white ring-opacity-50',
      epic: 'shadow-xl ring-2 ring-yellow-300 ring-opacity-70',
      legendary: 'shadow-2xl ring-4 ring-yellow-400 ring-opacity-80 animate-pulse'
    }

    const colorClass = baseColors[color as keyof typeof baseColors] || baseColors.emerald
    const effectClass = rarityEffects[rarity as keyof typeof rarityEffects] || ''

    return `bg-gradient-to-br ${colorClass} ${effectClass}`
  }

  const getTextColor = (color: string) => {
    const colors = {
      emerald: 'text-emerald-700',
      blue: 'text-blue-700',
      purple: 'text-purple-700',
      pink: 'text-pink-700',
      indigo: 'text-indigo-700',
      yellow: 'text-yellow-700',
      orange: 'text-orange-700',
      slate: 'text-slate-700',
      green: 'text-green-700'
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  const sortedBadges = [...badges].sort((a, b) => {
    const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 }
    return rarityOrder[b.rarity] - rarityOrder[a.rarity]
  })

  const displayBadges = showAll ? sortedBadges : sortedBadges.slice(0, maxDisplay)
  const hiddenCount = badges.length - displayBadges.length

  const sizeClasses = getSizeClasses()

  if (badges.length === 0) return null

  return (
    <div className={`flex items-center ${sizeClasses.container}`}>
      {displayBadges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={animated ? { scale: 0, rotate: -180 } : undefined}
          animate={animated ? { scale: 1, rotate: 0 } : undefined}
          transition={animated ? { delay: index * 0.1, type: "spring", stiffness: 200 } : undefined}
          className="relative group"
        >
          <div
            className={`
              ${sizeClasses.badge} 
              ${getRarityColor(badge.rarity, badge.color)}
              rounded-full flex items-center justify-center text-white font-bold
              cursor-pointer transform transition-all duration-200 hover:scale-110
            `}
            title={showTooltips ? (language === 'pt' ? badge.namePortuguese : badge.name) : undefined}
          >
            <span>{badge.icon}</span>
          </div>

          {/* Legendary badge glow effect */}
          {badge.rarity === 'legendary' && (
            <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-20 animate-ping" />
          )}

          {/* Epic badge sparkles */}
          {badge.rarity === 'epic' && (
            <div className="absolute -top-1 -right-1">
              <SparklesIcon className="w-3 h-3 text-yellow-400 animate-pulse" />
            </div>
          )}

          {/* Detailed tooltip on hover */}
          {showTooltips && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
              <div className="font-semibold mb-1">
                {language === 'pt' ? badge.namePortuguese : badge.name}
              </div>
              <div className="text-gray-300 mb-1">
                {language === 'pt' ? badge.descriptionPortuguese : badge.description}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <StarSolidIcon className="w-3 h-3" />
                <span>{badge.verificationScore}% {language === 'pt' ? 'verificado' : 'verified'}</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          )}
        </motion.div>
      ))}

      {/* Show remaining badges count */}
      {hiddenCount > 0 && (
        <motion.div
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: displayBadges.length * 0.1 } : undefined}
          className={`
            ${sizeClasses.badge}
            bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center
            text-gray-600 font-bold cursor-pointer hover:bg-gray-200 transition-colors
          `}
          title={language === 'pt' ? `Mais ${hiddenCount} distintivos` : `${hiddenCount} more badges`}
        >
          <span className={sizeClasses.text}>+{hiddenCount}</span>
        </motion.div>
      )}
    </div>
  )
}

// Helper component for verification summary
export function VerificationSummary({ 
  badges, 
  verificationScore,
  showDetails = false 
}: { 
  badges: VerificationBadge[]
  verificationScore: number
  showDetails?: boolean
}) {
  const { language } = useLanguage()

  const rarityCount = badges.reduce((acc, badge) => {
    acc[badge.rarity] = (acc[badge.rarity] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const getVerificationLevel = (score: number) => {
    if (score >= 95) return { level: 'Legendary', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 85) return { level: 'Epic', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 75) return { level: 'Rare', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { level: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const verificationLevel = getVerificationLevel(verificationScore)

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <ShieldCheckSolidIcon className="w-5 h-5 text-emerald-600" />
        <span className="font-semibold text-gray-900">
          {language === 'pt' ? 'Culturalmente Verificado' : 'Culturally Verified'}
        </span>
      </div>
      
      <div className={`px-2 py-1 rounded-full ${verificationLevel.bg} ${verificationLevel.color} text-xs font-medium`}>
        {verificationScore}%
      </div>

      {badges.length > 0 && (
        <CulturalVerificationBadges 
          badges={badges} 
          size="small" 
          maxDisplay={3}
          showTooltips={false}
        />
      )}

      {showDetails && (
        <div className="text-xs text-gray-600">
          {badges.length} {language === 'pt' ? 'distintivos' : 'badges'}
          {rarityCount.legendary && ` • ${rarityCount.legendary} legendary`}
          {rarityCount.epic && ` • ${rarityCount.epic} epic`}
        </div>
      )}
    </div>
  )
}