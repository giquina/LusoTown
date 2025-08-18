'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface PortugueseCulturalBadgeProps {
  type: 'live' | 'premium' | 'cultural' | 'regional' | 'verified'
  region?: 'brazil' | 'portugal' | 'africa' | 'diaspora' | 'universal'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function PortugueseCulturalBadge({ 
  type, 
  region = 'universal', 
  className = '', 
  size = 'md',
  showText = true 
}: PortugueseCulturalBadgeProps) {
  const { language } = useLanguage()

  const getBadgeConfig = () => {
    switch (type) {
      case 'live':
        return {
          gradient: 'from-red-500 via-red-600 to-red-700',
          icon: '🔴',
          text: language === 'pt' ? 'AO VIVO' : 'LIVE',
          textColor: 'text-white',
          pulse: true
        }
      case 'premium':
        return {
          gradient: 'from-yellow-400 via-yellow-500 to-amber-600',
          icon: '👑',
          text: language === 'pt' ? 'PREMIUM' : 'PREMIUM',
          textColor: 'text-white',
          pulse: false
        }
      case 'cultural':
        return {
          gradient: 'from-green-600 via-green-700 to-red-600', // Portuguese flag colors
          icon: '🇵🇹',
          text: language === 'pt' ? 'CULTURAL' : 'CULTURAL',
          textColor: 'text-white',
          pulse: false
        }
      case 'regional':
        return getRegionalBadge(region)
      case 'verified':
        return {
          gradient: 'from-blue-500 via-blue-600 to-blue-700',
          icon: '✓',
          text: language === 'pt' ? 'VERIFICADO' : 'VERIFIED',
          textColor: 'text-white',
          pulse: false
        }
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          icon: '•',
          text: '',
          textColor: 'text-white',
          pulse: false
        }
    }
  }

  const getRegionalBadge = (region: string) => {
    switch (region) {
      case 'brazil':
        return {
          gradient: 'from-green-500 via-yellow-400 to-blue-600',
          icon: '🇧🇷',
          text: language === 'pt' ? 'BRASIL' : 'BRAZIL',
          textColor: 'text-white',
          pulse: false
        }
      case 'portugal':
        return {
          gradient: 'from-green-600 via-red-600 to-red-700',
          icon: '🇵🇹',
          text: language === 'pt' ? 'PORTUGAL' : 'PORTUGAL',
          textColor: 'text-white',
          pulse: false
        }
      case 'africa':
        return {
          gradient: 'from-orange-500 via-yellow-500 to-red-600',
          icon: '🌍',
          text: language === 'pt' ? 'ÁFRICA' : 'AFRICA',
          textColor: 'text-white',
          pulse: false
        }
      case 'diaspora':
        return {
          gradient: 'from-blue-500 via-purple-500 to-indigo-600',
          icon: '🌎',
          text: language === 'pt' ? 'DIÁSPORA' : 'DIASPORA',
          textColor: 'text-white',
          pulse: false
        }
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          icon: '🌐',
          text: language === 'pt' ? 'UNIVERSAL' : 'UNIVERSAL',
          textColor: 'text-white',
          pulse: false
        }
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1 text-xs',
          icon: 'text-xs',
          gap: 'gap-1'
        }
      case 'md':
        return {
          container: 'px-3 py-1.5 text-sm',
          icon: 'text-sm',
          gap: 'gap-1.5'
        }
      case 'lg':
        return {
          container: 'px-4 py-2 text-base',
          icon: 'text-base',
          gap: 'gap-2'
        }
      default:
        return {
          container: 'px-3 py-1.5 text-sm',
          icon: 'text-sm',
          gap: 'gap-1.5'
        }
    }
  }

  const config = getBadgeConfig()
  const sizes = getSizeClasses()

  const badgeComponent = (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center ${sizes.gap} ${sizes.container} bg-gradient-to-r ${config.gradient} ${config.textColor} font-bold rounded-full shadow-sm backdrop-blur-sm ${className}`}
    >
      <span className={sizes.icon}>{config.icon}</span>
      {showText && config.text && (
        <span className="font-extrabold tracking-wide">
          {config.text}
        </span>
      )}
    </motion.div>
  )

  if (config.pulse) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {badgeComponent}
      </motion.div>
    )
  }

  return badgeComponent
}

// Portuguese Cultural Patterns Component
export function PortuguesePatternBorder({ 
  children, 
  pattern = 'azulejos',
  className = '' 
}: { 
  children: React.ReactNode
  pattern?: 'azulejos' | 'waves' | 'tiles' | 'geometric'
  className?: string 
}) {
  const getPatternClasses = () => {
    switch (pattern) {
      case 'azulejos':
        return 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden before:absolute before:inset-0 before:bg-blue-100 before:opacity-20'
      case 'waves':
        return 'border-2 border-teal-400 bg-gradient-to-br from-teal-50 to-white relative overflow-hidden'
      case 'tiles':
        return 'border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden'
      case 'geometric':
        return 'border-2 border-red-400 bg-gradient-to-br from-red-50 to-white relative overflow-hidden'
      default:
        return 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-white'
    }
  }

  return (
    <div className={`rounded-xl ${getPatternClasses()} ${className}`}>
      {children}
    </div>
  )
}

// Portuguese Cultural Accent Component
export function PortugueseAccent({ 
  type = 'corner',
  color = 'primary' 
}: { 
  type?: 'corner' | 'divider' | 'accent'
  color?: 'primary' | 'secondary' | 'flag' 
}) {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'from-primary-400 to-primary-600'
      case 'secondary':
        return 'from-secondary-400 to-secondary-600'
      case 'flag':
        return 'from-green-500 to-red-600'
      default:
        return 'from-primary-400 to-primary-600'
    }
  }

  if (type === 'corner') {
    return (
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${getColorClasses()} transform rotate-45 translate-x-6 -translate-y-6 opacity-80`} />
      </div>
    )
  }

  if (type === 'divider') {
    return (
      <div className={`h-0.5 bg-gradient-to-r ${getColorClasses()} opacity-60`} />
    )
  }

  return (
    <div className={`w-2 h-full bg-gradient-to-b ${getColorClasses()} rounded-full opacity-80`} />
  )
}