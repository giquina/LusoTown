'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PALOP_COUNTRIES } from '@/config/palop-cultural-events'
import { SparklesIcon, HeartIcon, GlobeAltIcon, TrophyIcon } from '@heroicons/react/24/outline'

interface PALOPPrideProps {
  variant?: 'banner' | 'inline' | 'footer' | 'hero' | 'compact'
  className?: string
  showDescription?: boolean
  showFlags?: boolean
  animated?: boolean
}

/**
 * PALOP Pride Component - Celebrating African Lusophone Heritage
 * Displays pride and recognition for PALOP countries across LusoTown
 */
const PALOPPride: React.FC<PALOPPrideProps> = ({ 
  variant = 'inline',
  className = '',
  showDescription = true,
  showFlags = true,
  animated = false 
}) => {
  const { t } = useLanguage()

  const palop_flags = Object.values(PALOP_COUNTRIES).map(country => country.flag).join(' ')
  const all_flags = `🇵🇹 🇧🇷 ${palop_flags}`

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-green-100 via-yellow-50 to-red-100 border border-green-200 rounded-xl p-4 ${className} ${animated ? 'hover:shadow-lg transition-all duration-300' : ''}`}>
        <div className="flex items-center justify-center gap-3 text-center">
          <GlobeAltIcon className="w-6 h-6 text-primary-600" />
          <div>
            <div className="font-bold text-gray-900">
              {t('palop.community.recognition', 'PALOP Recognition - Seen, Celebrated, Empowered')}
            </div>
            {showFlags && (
              <div className="text-lg mt-1">{all_flags}</div>
            )}
            {showDescription && (
              <p className="text-sm text-gray-600 mt-1">
                {t('palop.description', 'From PALOP Countries to UK Success Stories - celebrating 50+ years of independence')}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6 ${animated ? 'animate-pulse' : ''}">
          <SparklesIcon className="w-4 h-4" />
          {t('palop.community.pride', 'Celebrating PALOP Heritage Pride')}
        </div>
        {showFlags && (
          <div className="text-2xl mb-4">{all_flags}</div>
        )}
        {showDescription && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('palop.full_name', 'African Lusophone-Speaking Countries')} - 
            Angola 🇦🇴 • Cape Verde 🇨🇻 • Guinea-Bissau 🇬🇼 • Mozambique 🇲🇿 • São Tomé and Príncipe 🇸🇹
          </p>
        )}
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HeartIcon className="w-4 h-4 text-red-400" />
            <span className="text-white font-semibold">
              {t('palop.community.unity', 'PALOP Unity - Stronger Together in the UK')}
            </span>
          </div>
          {showFlags && (
            <div className="text-lg mb-2">{all_flags}</div>
          )}
          <p className="text-gray-300 text-sm">
            {t('palop.success.subtitle', 'Where PALOP Cultures Thrive in Britain')}
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {showFlags && <span className="text-sm">{palop_flags}</span>}
        <span className="text-sm font-medium text-gray-700">
          {t('palop.title', 'PALOP Heritage')}
        </span>
      </div>
    )
  }

  // Default: inline variant
  return (
    <div className={`flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200 ${className} ${animated ? 'hover:shadow-md transition-all duration-300' : ''}`}>
      <div className="flex-shrink-0">
        <GlobeAltIcon className="w-5 h-5 text-primary-600" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-gray-900">
          {t('palop.subtitle', 'Celebrating Países Africanos de Língua Oficial Portuguesa')}
        </div>
        {showFlags && (
          <div className="text-base mt-1">{all_flags}</div>
        )}
        {showDescription && (
          <p className="text-sm text-gray-600 mt-1">
            {t('palop.success.entrepreneurs', 'PALOP Entrepreneurs Changing London\'s Landscape')}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * PALOP Business Excellence Badge
 * Highlights PALOP business achievements
 */
export const PALOPBusinessBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage()
  
  return (
    <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold ${className}`}>
      <SparklesIcon className="w-3 h-3" />
      {t('palop.business.title', 'PALOP Business Excellence')}
    </div>
  )
}

/**
 * PALOP Country Flag Row
 * Simple row of PALOP country flags
 */
export const PALOPFlagRow: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹
    </div>
  )
}

/**
 * PALOP Independence Years Badge
 * Shows the independence celebration context
 */
export const PALOPIndependenceBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage()
  
  return (
    <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white px-4 py-2 rounded-full font-bold ${className}`}>
      <TrophyIcon className="w-4 h-4" />
      <span>{t('palop.independence.subtitle', 'Celebrating 50+ Years of African Lusophone Freedom')}</span>
    </div>
  )
}

export default PALOPPride