'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  LUSOPHONE_NATIONS, 
  VISUAL_POLISH_CONFIG, 
  MICRO_INTERACTIONS,
  getCulturalColors,
  getAllFlags 
} from '@/config/cultural-authenticity-system'

/**
 * Portuguese-Speaking Nations Journey Visualization
 * Shows animated paths from all lusophone countries to UK
 */
interface NationsJourneyProps {
  showAnimation?: boolean
  compact?: boolean
}

export const LusophoneNationsJourney: React.FC<NationsJourneyProps> = ({ 
  showAnimation = true, 
  compact = false 
}) => {
  const { t, language } = useLanguage()
  const [activeNation, setActiveNation] = useState<string | null>(null)

  return (
    <div className={`relative ${compact ? 'py-8' : 'py-16'} bg-gradient-to-br from-blue-50 to-indigo-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          {...VISUAL_POLISH_CONFIG.animations.fadeIn}
        >
          <h2 className="text-4xl font-bold mb-4" style={VISUAL_POLISH_CONFIG.animations.gradientText}>
            {language === 'pt' ? 'Jornada das Nações Lusófonas' : 'Portuguese-Speaking Nations Journey'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'De todos os cantos do mundo lusófono para o Reino Unido - uma única comunidade unida pela língua'
              : 'From every corner of the Portuguese-speaking world to the United Kingdom - one community united by language'
            }
          </p>
        </motion.div>

        {/* Nations Grid with Journey Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LUSOPHONE_NATIONS.map((nation, index) => (
            <motion.div
              key={nation.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onHoverStart={() => setActiveNation(nation.id)}
              onHoverEnd={() => setActiveNation(null)}
            >
              {/* Nation Card */}
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-primary-200 transition-all duration-300"
                style={{
                  ...MICRO_INTERACTIONS.cards.hover,
                  background: activeNation === nation.id 
                    ? `linear-gradient(135deg, ${nation.celebrationColors.primary}10, ${nation.celebrationColors.secondary}10)`
                    : 'white'
                }}
              >
                {/* Flag Header */}
                <div className="relative h-32 bg-gradient-to-r from-primary-50 to-primary-100">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: VISUAL_POLISH_CONFIG.culturalEffects.nationalsColors[nation.id as keyof typeof VISUAL_POLISH_CONFIG.culturalEffects.nationalsColors]
                    }}
                  />
                  
                  {/* Flag Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-8xl filter drop-shadow-lg"
                      animate={activeNation === nation.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {nation.flag}
                    </motion.span>
                  </div>

                  {/* UK Journey Arrow */}
                  <AnimatePresence>
                    {activeNation === nation.id && (
                      <motion.div
                        className="absolute right-2 top-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-center space-x-1 bg-white/90 rounded-full px-3 py-1">
                          <span className="text-sm">{nation.flag}</span>
                          <motion.span 
                            className="text-primary-600"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                          <span className="text-sm">🇬🇧</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nation Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {nation.name[language as 'en' | 'pt']}
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Capital & Continent */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{nation.capital}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {nation.continent}
                      </span>
                    </div>

                    {/* UK Diaspora Size */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">UK Community:</span>
                      <span className="font-semibold text-primary-700">{nation.ukDiasporaSize}</span>
                    </div>

                    {/* Cultural Elements Preview */}
                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-gray-700">Music:</span>
                          <p className="text-gray-600">{nation.culturalElements.music.slice(0, 2).join(', ')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Food:</span>
                          <p className="text-gray-600">{nation.culturalElements.food.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Famous For */}
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {nation.famousFor[language as 'en' | 'pt'].slice(0, 3).map((item, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Unity Message */}
        <motion.div 
          className="text-center mt-16"
          {...VISUAL_POLISH_CONFIG.animations.fadeIn}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-6xl mb-4">
              {getAllFlags()}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Uma Língua, Muitas Nações, Uma Comunidade' : 'One Language, Many Nations, One Community'}
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'pt' 
                ? 'No Reino Unido, celebramos a riqueza de todas as culturas lusófonas. Cada nação traz sua própria música, tradições e sabores, criando uma comunidade vibrante e diversificada.'
                : 'In the United Kingdom, we celebrate the richness of all Portuguese-speaking cultures. Each nation brings its own music, traditions, and flavors, creating a vibrant and diverse community.'
              }
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/**
 * Gradient Text Effect Component
 * Creates stunning gradient text with cultural colors
 */
interface GradientTextProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  colors?: 'lusophone' | 'portugal' | 'brazil' | 'angola' | 'cape_verde' | 'mozambique'
  animate?: boolean
  className?: string
}

export const LusophoneGradientText: React.FC<GradientTextProps> = ({
  children,
  size = 'md',
  colors = 'lusophone',
  animate = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  }

  const colorGradients = {
    lusophone: 'linear-gradient(135deg, #D4A574 0%, #8B4513 25%, #228B22 50%, #DC143C 75%, #D4A574 100%)',
    portugal: 'linear-gradient(135deg, #FF0000 0%, #006600 100%)',
    brazil: 'linear-gradient(135deg, #009B3A 0%, #FEDF00 50%, #002776 100%)',
    angola: 'linear-gradient(135deg, #CE1126 0%, #000000 50%, #FFCD00 100%)',
    cape_verde: 'linear-gradient(135deg, #003893 0%, #FFFFFF 50%, #CF142B 100%)',
    mozambique: 'linear-gradient(135deg, #009639 0%, #000000 50%, #FFFF00 100%)'
  }

  return (
    <span 
      className={`font-bold ${sizeClasses[size]} ${className}`}
      style={{
        background: colorGradients[colors],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: animate ? '200% 200%' : '100% 100%',
        animation: animate ? 'gradient-shift 6s ease infinite' : 'none'
      }}
    >
      {children}
    </span>
  )
}

/**
 * Cultural Loading Skeleton
 * Portuguese-themed loading animations
 */
interface CulturalLoadingProps {
  type?: 'card' | 'list' | 'hero' | 'text'
  count?: number
  showFlags?: boolean
}

export const CulturalLoadingSkeleton: React.FC<CulturalLoadingProps> = ({
  type = 'card',
  count = 3,
  showFlags = true
}) => {
  const skeletonCards = Array.from({ length: count }, (_, i) => (
    <div key={i} className="animate-pulse">
      <div className="bg-white rounded-lg shadow p-4">
        {showFlags && (
          <div className="flex justify-between items-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full" />
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
        )}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  ))

  if (type === 'hero') {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gradient-to-r from-primary-200 to-secondary-200 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {skeletonCards}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonCards}
    </div>
  )
}

/**
 * Parallax Cultural Background
 * Subtle cultural patterns with parallax effect
 */
interface ParallaxCulturalBackgroundProps {
  children: React.ReactNode
  pattern?: 'azulejos' | 'flags' | 'waves' | 'subtle'
  intensity?: 'light' | 'medium' | 'strong'
}

export const ParallaxCulturalBackground: React.FC<ParallaxCulturalBackgroundProps> = ({
  children,
  pattern = 'subtle',
  intensity = 'light'
}) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const backgroundPatterns = {
    azulejos: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A574' fill-opacity='${intensity === 'light' ? '0.05' : intensity === 'medium' ? '0.1' : '0.15'}'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    flags: 'linear-gradient(45deg, transparent 40%, rgba(212, 165, 116, 0.05) 50%, transparent 60%)',
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10c10 0 10-10 20-10s10 10 20 10 10-10 20-10 10 10 20 10 10-10 20-10 10 10 20 10v10H0z' fill='%23228B22' fill-opacity='${intensity === 'light' ? '0.03' : intensity === 'medium' ? '0.06' : '0.1'}'/%3E%3C/svg%3E")`,
    subtle: 'linear-gradient(135deg, rgba(212, 165, 116, 0.02) 0%, rgba(139, 69, 19, 0.02) 100%)'
  }

  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundPatterns[pattern],
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundSize: pattern === 'waves' ? '100px 20px' : pattern === 'azulejos' ? '60px 60px' : 'auto',
          ...VISUAL_POLISH_CONFIG.animations.parallaxScroll
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

/**
 * Cultural Hover Card
 * Enhanced card with micro-interactions and cultural theming
 */
interface CulturalHoverCardProps {
  children: React.ReactNode
  nation?: string
  elevation?: 'sm' | 'md' | 'lg' | 'xl'
  culturalAccent?: boolean
  className?: string
}

export const CulturalHoverCard: React.FC<CulturalHoverCardProps> = ({
  children,
  nation,
  elevation = 'md',
  culturalAccent = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const colors = nation ? getCulturalColors(nation) : null

  const elevationStyles = {
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  }

  return (
    <motion.div
      className={`bg-white rounded-xl transition-all duration-300 ${elevationStyles[elevation]} ${className}`}
      style={{
        borderLeft: culturalAccent && colors ? `4px solid ${colors.primary}` : undefined
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {culturalAccent && isHovered && colors && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`
          }}
        />
      )}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}

// Export all components
export default {
  LusophoneNationsJourney,
  LusophoneGradientText,
  CulturalLoadingSkeleton,
  ParallaxCulturalBackground,
  CulturalHoverCard
}

// CSS Animations (to be added to global.css)
export const CULTURAL_CSS_ANIMATIONS = `
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes lusophone-flow {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

@keyframes cultural-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 165, 116, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(212, 165, 116, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 165, 116, 0);
  }
}

@keyframes loading-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`