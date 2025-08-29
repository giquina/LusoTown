'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FlagData {
  flag: string
  name: string
  namePortuguese: string
  continent: string
  population: string
  culturalHighlight: string
}

const ALL_PORTUGUESE_SPEAKING_NATIONS: FlagData[] = [
  {
    flag: '🇵🇹',
    name: 'Portugal',
    namePortuguese: 'Portugal',
    continent: 'Europe',
    population: '10.3M',
    culturalHighlight: 'Birthplace of Portuguese language and culture'
  },
  {
    flag: '🇧🇷',
    name: 'Brazil', 
    namePortuguese: 'Brasil',
    continent: 'South America',
    population: '215M',
    culturalHighlight: 'Largest Portuguese-speaking nation, vibrant carnival culture'
  },
  {
    flag: '🇦🇴',
    name: 'Angola',
    namePortuguese: 'Angola', 
    continent: 'Africa',
    population: '34M',
    culturalHighlight: 'Kizomba dance origin, diamond and oil resources'
  },
  {
    flag: '🇨🇻',
    name: 'Cape Verde',
    namePortuguese: 'Cabo Verde',
    continent: 'Africa',
    population: '560K',
    culturalHighlight: 'Morna music heritage, island paradise culture'
  },
  {
    flag: '🇲🇿',
    name: 'Mozambique',
    namePortuguese: 'Moçambique',
    continent: 'Africa', 
    population: '32M',
    culturalHighlight: 'Indian Ocean coastal culture, natural gas resources'
  },
  {
    flag: '🇬🇼',
    name: 'Guinea-Bissau',
    namePortuguese: 'Guiné-Bissau',
    continent: 'Africa',
    population: '2M',
    culturalHighlight: 'World\'s largest cashew producer, Gumbe music traditions'
  },
  {
    flag: '🇸🇹', 
    name: 'São Tomé and Príncipe',
    namePortuguese: 'São Tomé e Príncipe',
    continent: 'Africa',
    population: '225K',
    culturalHighlight: 'World-class cocoa production, Ússua music heritage'
  },
  {
    flag: '🇹🇱',
    name: 'East Timor (Timor-Leste)',
    namePortuguese: 'Timor-Leste',
    continent: 'Asia',
    population: '1.3M', 
    culturalHighlight: 'Newest nation (2002), premium coffee, Asian-Portuguese fusion'
  }
]

interface RotatingFlagDisplayProps {
  showDetails?: boolean
  speed?: number // milliseconds per flag
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function RotatingFlagDisplay({ 
  showDetails = true, 
  speed = 1200, // Increased from typical 800ms to ensure visibility
  className = '',
  size = 'md'
}: RotatingFlagDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ALL_PORTUGUESE_SPEAKING_NATIONS.length)
    }, speed)
    
    return () => clearInterval(interval)
  }, [speed, isHovered])

  const currentFlag = ALL_PORTUGUESE_SPEAKING_NATIONS[currentIndex]
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-2xl'
      case 'md': return 'text-4xl'
      case 'lg': return 'text-6xl'
      case 'xl': return 'text-8xl'
      default: return 'text-4xl'
    }
  }

  const getContainerClasses = () => {
    switch (size) {
      case 'sm': return 'h-16'
      case 'md': return 'h-24'
      case 'lg': return 'h-32'
      case 'xl': return 'h-40'
      default: return 'h-24'
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Flag Display with Animation */}
      <div 
        className={`relative ${getContainerClasses()} flex items-center justify-center`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className={`${getSizeClasses()} cursor-pointer hover:scale-110 transition-transform select-none`}
        >
          {currentFlag.flag}
        </motion.div>
      </div>

      {/* Nation Details */}
      {showDetails && (
        <motion.div
          key={`details-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-4 max-w-sm"
        >
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {currentFlag.name}
          </h3>
          <p className="text-sm text-gray-600 font-medium mb-2">
            {currentFlag.namePortuguese} • {currentFlag.continent} • {currentFlag.population}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {currentFlag.culturalHighlight}
          </p>
        </motion.div>
      )}

      {/* Navigation Dots */}
      <div className="flex items-center gap-2 mt-4">
        {ALL_PORTUGUESE_SPEAKING_NATIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-primary-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Show ${ALL_PORTUGUESE_SPEAKING_NATIONS[index].name}`}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs bg-gray-200 rounded-full h-1 mt-3">
        <motion.div
          className="bg-gradient-to-r from-primary-600 to-secondary-600 h-1 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: speed / 1000, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "restart"
          }}
        />
      </div>

      {/* Cultural Equality Message */}
      <p className="text-xs text-center text-gray-400 mt-3 max-w-md leading-relaxed">
        🌍 Celebrating all 8 Portuguese-speaking nations with equal pride and representation. 
        Each nation contributes uniquely to our global Lusophone community.
      </p>
    </div>
  )
}

/**
 * Compact version for use in headers/footers
 */
export function CompactFlagRotation({ className = '' }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ALL_PORTUGUESE_SPEAKING_NATIONS.length)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-xl"
      >
        {ALL_PORTUGUESE_SPEAKING_NATIONS[currentIndex].flag}
      </motion.span>
      <div className="text-sm">
        <div className="font-medium text-gray-800">
          {ALL_PORTUGUESE_SPEAKING_NATIONS[currentIndex].name}
        </div>
        <div className="text-xs text-gray-500">
          {ALL_PORTUGUESE_SPEAKING_NATIONS[currentIndex].continent}
        </div>
      </div>
    </div>
  )
}

/**
 * All flags display for overview sections
 */
export function AllFlagsDisplay({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {ALL_PORTUGUESE_SPEAKING_NATIONS.map((nation, index) => (
        <motion.div
          key={nation.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <span className="text-2xl mb-1">{nation.flag}</span>
          <span className="text-xs font-medium text-gray-700">
            {nation.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}