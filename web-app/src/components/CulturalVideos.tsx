'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CulturalVideos() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {t('cultural.videos.title') || 'Cultural Videos'}
      </h3>
      <p className="text-gray-600">
        {t('cultural.videos.description') || 'Watch authentic Portuguese cultural performances and events.'}
      </p>
    </div>
  )
}
