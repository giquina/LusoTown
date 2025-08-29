'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function BusinessProfiles() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {t('business.profiles.title') || 'Portuguese Business Profiles'}
      </h3>
      <p className="text-gray-600">
        {t('business.profiles.description') || 'Discover local Portuguese-speaking businesses in your area.'}
      </p>
    </div>
  )
}
