'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  ShieldCheckIcon,
  CheckBadgeIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

interface OfficialPartnershipBadgeProps {
  variant?: 'compact' | 'full' | 'minimal'
  showText?: boolean
  position?: 'header' | 'footer' | 'content' | 'floating'
  className?: string
}

export default function OfficialPartnershipBadge({ 
  variant = 'compact', 
  showText = true, 
  position = 'content',
  className = ''
}: OfficialPartnershipBadgeProps) {
  const { language } = useLanguage()

  const badgeText = {
    en: {
      primary: 'Officially Recognized',
      secondary: 'by Instituto Camões',
      full: 'Officially Recognized by Instituto Camões'
    },
    pt: {
      primary: 'Oficialmente Reconhecida',
      secondary: 'pelo Instituto Camões',
      full: 'Oficialmente Reconhecida pelo Instituto Camões'
    }
  }

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-red-500 rounded-full"></div>
        {showText && (
          <span className="text-xs font-medium text-gray-600">
            {badgeText[language].primary}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-3 py-1.5 shadow-sm ${className}`}>
        <ShieldCheckIcon className="w-4 h-4 text-primary-600" />
        {showText && (
          <span className="text-xs font-bold text-primary-700">
            {badgeText[language].primary}
          </span>
        )}
        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
      </div>
    )
  }

  // Full variant
  return (
    <div className={`bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 border border-primary-200 rounded-2xl p-4 shadow-lg ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md">
            <ShieldCheckIcon className="w-5 h-5 text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-md">
            <CheckBadgeIcon className="w-5 h-5 text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-premium-500 rounded-full flex items-center justify-center shadow-md">
            <TrophyIcon className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {showText && (
          <div className="flex-1">
            <div className="text-sm font-bold text-primary-700">
              {badgeText[language].primary}
            </div>
            <div className="text-xs text-primary-600">
              {badgeText[language].secondary}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-600">
            {language === 'pt' ? 'Ativo' : 'Active'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Floating badge component for corner positioning
export function FloatingOfficialBadge() {
  const { language } = useLanguage()
  
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-full p-3 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-3xl">
        <ShieldCheckIcon className="w-6 h-6" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
          {language === 'pt' 
            ? 'Oficialmente Reconhecida pelo Instituto Camões'
            : 'Officially Recognized by Instituto Camões'}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  )
}

// Header integration component
export function HeaderOfficialBadge() {
  return (
    <OfficialPartnershipBadge 
      variant="compact" 
      showText={true} 
      position="header"
      className="hidden sm:inline-flex ml-4"
    />
  )
}

// Footer integration component  
export function FooterOfficialBadge() {
  return (
    <OfficialPartnershipBadge 
      variant="full" 
      showText={true} 
      position="footer"
      className="max-w-md"
    />
  )
}