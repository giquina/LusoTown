'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CulturalGallery() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {t('cultural.gallery.title') || 'Portuguese Cultural Gallery'}
      </h3>
      <p className="text-gray-600">
        {t('cultural.gallery.description') || 'Explore rich Portuguese cultural heritage and traditions.'}
      </p>
    </div>
  )
}
