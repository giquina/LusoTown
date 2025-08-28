'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  LUSOPHONE_NATIONS, 
  getAllFlags,
  VISUAL_POLISH_CONFIG 
} from '@/config/cultural-authenticity-system'

/**
 * Cultural Flag Banner
 * Shows rotating flags or nation highlights in header
 */
interface CulturalFlagBannerProps {
  position?: 'top' | 'bottom'
  style?: 'rotating' | 'static' | 'celebrating'
  showText?: boolean
  compact?: boolean
}

export const CulturalFlagBanner: React.FC<CulturalFlagBannerProps> = ({
  position = 'top',
  style = 'static',
  showText = true,
  compact = false
}) => {
  const { language } = useLanguage()
  const [currentNationIndex, setCurrentNationIndex] = useState(0)

  useEffect(() => {
    if (style === 'rotating') {
      const interval = setInterval(() => {
        setCurrentNationIndex((prev) => (prev + 1) % LUSOPHONE_NATIONS.length)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [style])

  const currentNation = LUSOPHONE_NATIONS[currentNationIndex]

  if (style === 'static') {
    return (
      <div className={`bg-gradient-to-r from-primary-50 to-secondary-50 ${compact ? 'py-1' : 'py-2'} ${position === 'bottom' ? 'border-t' : 'border-b'} border-primary-200/30`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">{getAllFlags()}</span>
            {showText && (
              <span className="text-sm font-medium text-primary-700">
                {language === 'pt' 
                  ? 'Celebrando todas as nações lusófonas no Reino Unido'
                  : 'Celebrating all Portuguese-speaking nations in the UK'
                }
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (style === 'rotating') {
    return (
      <div className={`bg-gradient-to-r from-primary-50 to-secondary-50 ${compact ? 'py-2' : 'py-3'} ${position === 'bottom' ? 'border-t' : 'border-b'} border-primary-200/30`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNationIndex}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span 
                  className="text-2xl flag-hover-wave"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {currentNation.flag}
                </motion.span>
                {showText && (
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary-800">
                      {currentNation.name[language as 'en' | 'pt']}
                    </div>
                    <div className="text-xs text-primary-600">
                      {language === 'pt' ? 'Comunidade' : 'Community'}: {currentNation.ukDiasporaSize}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  // Celebrating style for special events
  return (
    <div className={`bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 ${compact ? 'py-2' : 'py-4'} ${position === 'bottom' ? 'border-t-2' : 'border-b-2'} border-primary-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div 
            className="text-4xl mb-2"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -2, 2, 0] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {getAllFlags()}
          </motion.div>
          {showText && (
            <div className="text-primary-800 font-bold">
              {language === 'pt' 
                ? '🎉 Celebrando a Diversidade Lusófona! 🎉'
                : '🎉 Celebrating Portuguese-Speaking Diversity! 🎉'
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Cultural Breadcrumb Enhancement
 * Shows cultural context in page navigation
 */
interface CulturalBreadcrumbProps {
  items: Array<{
    label: string
    href?: string
    current?: boolean
    nation?: string
  }>
  showFlags?: boolean
}

export const CulturalBreadcrumb: React.FC<CulturalBreadcrumbProps> = ({
  items,
  showFlags = true
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400">/</span>
          )}
          <div className="flex items-center gap-1">
            {showFlags && item.nation && (
              <span className="text-sm flag-hover-wave">
                {LUSOPHONE_NATIONS.find(n => n.id === item.nation)?.flag}
              </span>
            )}
            <span className={item.current ? 'text-primary-700 font-medium' : 'hover:text-primary-600 transition-colors'}>
              {item.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </nav>
  )
}

/**
 * Language-First Messaging Badge
 * Promotes inclusive language across the platform
 */
interface LanguageFirstBadgeProps {
  message?: 'community' | 'speakers' | 'diaspora' | 'heritage'
  position?: 'inline' | 'floating'
  variant?: 'subtle' | 'prominent'
}

export const LanguageFirstBadge: React.FC<LanguageFirstBadgeProps> = ({
  message = 'community',
  position = 'inline',
  variant = 'subtle'
}) => {
  const { language } = useLanguage()

  const messages = {
    community: {
      pt: 'Comunidade Lusófona',
      en: 'Portuguese-speaking Community'
    },
    speakers: {
      pt: 'Falantes de Português',
      en: 'Portuguese Speakers'
    },
    diaspora: {
      pt: 'Diáspora Lusófona',
      en: 'Lusophone Diaspora'
    },
    heritage: {
      pt: 'Património Português',
      en: 'Portuguese Heritage'
    }
  }

  const variantStyles = {
    subtle: 'bg-primary-50 text-primary-700 border-primary-200',
    prominent: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-300 font-semibold'
  }

  const positionStyles = {
    inline: '',
    floating: 'fixed top-4 right-4 z-50 shadow-lg'
  }

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs
      ${variantStyles[variant]}
      ${positionStyles[position]}
      transition-all duration-300 hover:scale-105
    `}>
      <span className="text-xs">🌍</span>
      <span>{messages[message][language as 'en' | 'pt']}</span>
    </div>
  )
}

/**
 * Cultural Achievement Ticker
 * Shows rotating achievements from different nations
 */
interface CulturalAchievementTickerProps {
  achievements?: Array<{
    nation: string
    achievement: {
      en: string
      pt: string
    }
    icon?: string
  }>
  speed?: 'slow' | 'medium' | 'fast'
}

export const CulturalAchievementTicker: React.FC<CulturalAchievementTickerProps> = ({
  achievements = [
    {
      nation: 'angola',
      achievement: {
        en: '50+ Angolan businesses thriving in London',
        pt: '50+ empresas angolanas prosperando em Londres'
      },
      icon: '💎'
    },
    {
      nation: 'brazil',
      achievement: {
        en: '150+ Brazilian professionals in tech sector',
        pt: '150+ profissionais brasileiros no setor tecnológico'
      },
      icon: '🚀'
    },
    {
      nation: 'cape_verde',
      achievement: {
        en: 'Cape Verdean Morna music courses filled monthly',
        pt: 'Cursos de Morna cabo-verdiana lotados mensalmente'
      },
      icon: '🎵'
    },
    {
      nation: 'portugal',
      achievement: {
        en: '500+ Portuguese families celebrating traditions',
        pt: '500+ famílias portuguesas celebrando tradições'
      },
      icon: '🏰'
    },
    {
      nation: 'mozambique',
      achievement: {
        en: 'Mozambican spice businesses expanding across UK',
        pt: 'Empresas de especiarias moçambicanas expandindo pelo Reino Unido'
      },
      icon: '🌶️'
    }
  ],
  speed = 'medium'
}) => {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const speedConfig = {
    slow: 4000,
    medium: 3000,
    fast: 2000
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length)
    }, speedConfig[speed])

    return () => clearInterval(interval)
  }, [achievements.length, speed])

  const currentAchievement = achievements[currentIndex]
  const currentNation = LUSOPHONE_NATIONS.find(n => n.id === currentAchievement.nation)

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-primary-200/50 rounded-lg px-4 py-2 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="flex items-center gap-3 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lg">{currentNation?.flag}</span>
          <span>{currentAchievement.icon}</span>
          <span className="text-gray-700 font-medium">
            {currentAchievement.achievement[language as 'en' | 'pt']}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Export all components
export default {
  CulturalFlagBanner,
  CulturalBreadcrumb,
  LanguageFirstBadge,
  CulturalAchievementTicker
}