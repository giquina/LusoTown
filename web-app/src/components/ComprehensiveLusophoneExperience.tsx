'use client'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'

interface ComprehensiveLusophoneExperienceProps {
  className?: string
}

export default function ComprehensiveLusophoneExperience({ 
  className = "" 
}: ComprehensiveLusophoneExperienceProps) {
  const { t } = useLanguage()

  return (
    <div className={`bg-gradient-to-br from-${HERITAGE_COLORS.primary.light} to-${HERITAGE_COLORS.secondary.light} rounded-xl p-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t('lusophone.experience.title')}
        </h2>
        <p className="text-gray-700 mb-6">
          {t('lusophone.experience.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-lg p-4">
            <div className="text-3xl mb-2">🇵🇹</div>
            <h3 className="font-semibold">{t('lusophone.portugal.title')}</h3>
            <p className="text-sm text-gray-600">{t('lusophone.portugal.description')}</p>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4">
            <div className="text-3xl mb-2">🇧🇷</div>
            <h3 className="font-semibold">{t('lusophone.brazil.title')}</h3>
            <p className="text-sm text-gray-600">{t('lusophone.brazil.description')}</p>
          </div>
          
          <div className="bg-white/80 rounded-lg p-4">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-semibold">{t('lusophone.palop.title')}</h3>
            <p className="text-sm text-gray-600">{t('lusophone.palop.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
