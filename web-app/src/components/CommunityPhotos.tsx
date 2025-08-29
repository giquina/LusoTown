'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CommunityPhotos() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {t('community.photos.title') || 'Community Photos'}
      </h3>
      <p className="text-gray-600">
        {t('community.photos.description') || 'Share memories from our vibrant Portuguese community events.'}
      </p>
    </div>
  )
}
