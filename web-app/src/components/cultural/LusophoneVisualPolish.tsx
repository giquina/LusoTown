'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface NationsJourneyProps {
  showAnimation?: boolean
  compact?: boolean
}

export const LusophoneNationsJourney: React.FC<NationsJourneyProps> = ({ 
  showAnimation = true, 
  compact = false 
}) => {
  const { t, language } = useLanguage()

  return (
    <div className="relative py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Portuguese-Speaking Nations Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From every corner of the Portuguese-speaking world to the United Kingdom - one community united by language
        </p>
        <div className="mt-8 text-6xl">
          🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱🇲🇴🇬🇧
        </div>
      </div>
    </div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  colors?: 'lusophone' | 'portugal' | 'brazil'
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

  return (
    <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}

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
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

interface CulturalHoverCardProps {
  children: React.ReactNode
  nation?: string
  elevation?: 'sm' | 'md' | 'lg' | 'xl'
  culturalAccent?: boolean
  className?: string
}

export const CulturalHoverCard: React.FC<CulturalHoverCardProps> = ({
  children,
  elevation = 'md',
  className = ''
}) => {
  const elevationStyles = {
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl'
  }

  return (
    <motion.div
      className={`bg-white rounded-xl transition-all duration-300 ${elevationStyles[elevation]} ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        {children}
      </div>
    </motion.div>
  )
}
