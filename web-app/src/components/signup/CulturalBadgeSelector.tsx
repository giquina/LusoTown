/**
 * Cultural Badge Selector Component
 * Lusophone community verification badges and specializations
 */

"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { CulturalBadge, CULTURAL_BADGE_DESCRIPTIONS } from '@/types/enhanced-signup'
import { 
  CheckCircleIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface CulturalBadgeSelectorProps {
  badges: CulturalBadge[]
  selected: CulturalBadge[]
  onSelectionChange: (badges: CulturalBadge[]) => void
  showVerificationProcess?: boolean
  maxSelection?: number
  className?: string
}

interface BadgeInfo {
  badge: CulturalBadge
  name: string
  namePortuguese: string
  description: string
  icon: React.ComponentType<any>
  color: string
  verificationRequired: boolean
  popularityLevel: 'high' | 'medium' | 'low'
}

const BADGE_INFO: BadgeInfo[] = [
  {
    badge: 'business-owner-verified',
    name: 'Verified Business Owner',
    namePortuguese: 'Empresário Verificado',
    description: 'Verified Portuguese business owner in the UK',
    icon: BuildingStorefrontIcon,
    color: 'blue',
    verificationRequired: true,
    popularityLevel: 'medium'
  },
  {
    badge: 'single-culturally-connected',
    name: 'Single & Culturally Connected',
    namePortuguese: 'Solteiro e Culturalmente Conectado',
    description: 'Single and actively seeking cultural connections',
    icon: HeartIcon,
    color: 'red',
    verificationRequired: false,
    popularityLevel: 'high'
  },
  {
    badge: 'cultural-event-organizer',
    name: 'Cultural Event Organizer',
    namePortuguese: 'Organizador de Eventos Culturais',
    description: 'Organizes Lusophone cultural events and activities',
    icon: SparklesIcon,
    color: 'purple',
    verificationRequired: true,
    popularityLevel: 'low'
  },
  {
    badge: 'community-ambassador',
    name: 'Community Ambassador',
    namePortuguese: 'Embaixador da Comunidade',
    description: 'Official ambassador for Lusophone community initiatives',
    icon: UserGroupIcon,
    color: 'green',
    verificationRequired: true,
    popularityLevel: 'low'
  },
  {
    badge: 'dance-community-member',
    name: 'Dance Community Member',
    namePortuguese: 'Membro da Comunidade de Dança',
    description: 'Active in Lusophone/Lusophone dance communities',
    icon: MusicalNoteIcon,
    color: 'orange',
    verificationRequired: false,
    popularityLevel: 'high'
  },
  {
    badge: 'language-exchange-leader',
    name: 'Language Exchange Leader',
    namePortuguese: 'Líder de Intercâmbio de Idiomas',
    description: 'Leads Lusophone-English language exchange sessions',
    icon: ChatBubbleLeftRightIcon,
    color: 'indigo',
    verificationRequired: true,
    popularityLevel: 'medium'
  }
]

const getColorClasses = (color: string, isSelected: boolean) => {
  const colors = {
    blue: isSelected 
      ? 'bg-blue-500 text-white border-blue-500' 
      : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    red: isSelected 
      ? 'bg-red-500 text-white border-red-500' 
      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
    purple: isSelected 
      ? 'bg-purple-500 text-white border-purple-500' 
      : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    green: isSelected 
      ? 'bg-green-500 text-white border-green-500' 
      : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
    orange: isSelected 
      ? 'bg-orange-500 text-white border-orange-500' 
      : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
    indigo: isSelected 
      ? 'bg-indigo-500 text-white border-indigo-500' 
      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
  }
  return colors[color as keyof typeof colors] || colors.blue
}

const getPopularityIndicator = (level: string, language: string) => {
  const indicators = {
    high: { emoji: '🔥', label: language === 'pt' ? 'Popular' : 'Popular' },
    medium: { emoji: '⭐', label: language === 'pt' ? 'Comum' : 'Common' },
    low: { emoji: '🎯', label: language === 'pt' ? 'Especializado' : 'Specialized' }
  }
  return indicators[level as keyof typeof indicators] || indicators.medium
}

export default function CulturalBadgeSelector({
  badges,
  selected,
  onSelectionChange,
  showVerificationProcess = true,
  maxSelection = 3,
  className = ""
}: CulturalBadgeSelectorProps) {
  const { t, language } = useLanguage()
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const availableBadgeInfo = BADGE_INFO.filter(info => badges.includes(info.badge))

  const handleBadgeToggle = (badge: CulturalBadge) => {
    const isCurrentlySelected = selected.includes(badge)
    
    if (isCurrentlySelected) {
      // Remove badge
      onSelectionChange(selected.filter(b => b !== badge))
    } else {
      // Add badge (if under limit)
      if (selected.length < maxSelection) {
        onSelectionChange([...selected, badge])
      }
    }
  }

  const toggleDetails = (badgeId: string) => {
    setShowDetails(showDetails === badgeId ? null : badgeId)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          {t('signup.cultural-badges', 'Cultural Verification Badges')}
        </label>
        <div className="text-xs text-gray-500">
          {selected.length}/{maxSelection} {language === 'pt' ? 'selecionados' : 'selected'}
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availableBadgeInfo.map((badgeInfo, index) => {
          const isSelected = selected.includes(badgeInfo.badge)
          const IconComponent = badgeInfo.icon
          const popularity = getPopularityIndicator(badgeInfo.popularityLevel, language)
          
          return (
            <motion.div
              key={badgeInfo.badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => handleBadgeToggle(badgeInfo.badge)}
                disabled={!isSelected && selected.length >= maxSelection}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  getColorClasses(badgeInfo.color, isSelected)
                } ${
                  !isSelected && selected.length >= maxSelection 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:shadow-md'
                }`}
              >
                {/* Badge Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-white/20' 
                        : 'bg-white/80'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        isSelected ? 'text-white' : `text-${badgeInfo.color}-600`
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">
                        {language === 'pt' ? badgeInfo.namePortuguese : badgeInfo.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs">{popularity.emoji}</span>
                        <span className="text-xs opacity-75">{popularity.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className={`flex-shrink-0 ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`}>
                    <CheckCircleIcon className={`h-5 w-5 ${
                      isSelected ? 'fill-current' : ''
                    }`} />
                  </div>
                </div>

                {/* Badge Description */}
                <p className={`text-xs leading-relaxed ${
                  isSelected ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {badgeInfo.description}
                </p>

                {/* Verification Required */}
                {badgeInfo.verificationRequired && (
                  <div className={`flex items-center gap-1 mt-2 text-xs ${
                    isSelected ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    <ShieldCheckIcon className="h-3 w-3" />
                    <span>
                      {language === 'pt' ? 'Verificação necessária' : 'Verification required'}
                    </span>
                  </div>
                )}
              </button>

              {/* Details Toggle */}
              <button
                type="button"
                onClick={() => toggleDetails(badgeInfo.badge)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <InformationCircleIcon className="h-4 w-4 text-gray-500" />
              </button>

              {/* Expanded Details */}
              <AnimatePresence>
                {showDetails === badgeInfo.badge && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm"
                  >
                    <h5 className="font-medium text-gray-900 mb-2">
                      {language === 'pt' ? 'Detalhes do Distintivo' : 'Badge Details'}
                    </h5>
                    <p className="text-gray-700 mb-2">
                      {CULTURAL_BADGE_DESCRIPTIONS[badgeInfo.badge]}
                    </p>
                    
                    {badgeInfo.verificationRequired && showVerificationProcess && (
                      <div className="bg-blue-50 rounded-md p-2 mt-2">
                        <p className="text-xs text-blue-800">
                          {language === 'pt' 
                            ? 'Este distintivo requer verificação manual pela equipe do LusoTown.'
                            : 'This badge requires manual verification by the LusoTown team.'}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Selection Help */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 rounded-lg p-4 border border-primary-200"
        >
          <h4 className="font-semibold text-primary-900 mb-2 text-sm">
            {language === 'pt' ? 'Distintivos Selecionados:' : 'Selected Badges:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {selected.map((badge) => {
              const badgeInfo = BADGE_INFO.find(info => info.badge === badge)
              if (!badgeInfo) return null
              
              const IconComponent = badgeInfo.icon
              return (
                <div 
                  key={badge}
                  className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-primary-300"
                >
                  <IconComponent className="h-3 w-3 text-primary-600" />
                  <span className="text-xs text-primary-800">
                    {language === 'pt' ? badgeInfo.namePortuguese : badgeInfo.name}
                  </span>
                </div>
              )
            })}
          </div>
          
          {selected.length === maxSelection && (
            <p className="text-xs text-primary-700 mt-2">
              {language === 'pt' 
                ? 'Máximo de distintivos selecionados. Remova um para adicionar outro.'
                : 'Maximum badges selected. Remove one to add another.'}
            </p>
          )}
        </motion.div>
      )}

      {/* Verification Process Info */}
      {showVerificationProcess && selected.some(badge => 
        BADGE_INFO.find(info => info.badge === badge)?.verificationRequired
      ) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                {language === 'pt' ? 'Processo de Verificação' : 'Verification Process'}
              </h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                {language === 'pt'
                  ? 'Os distintivos que requerem verificação serão processados pela nossa equipe em até 48 horas. Você receberá uma notificação por email quando a verificação estiver completa.'
                  : 'Badges requiring verification will be processed by our team within 48 hours. You\'ll receive an email notification when verification is complete.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}