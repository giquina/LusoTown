'use client'

import React from 'react'
import ProfileCreationWizard from '@/components/ProfileCreationWizard'
import { useLanguage } from '@/context/LanguageContext'

export default function ProfileSetupPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('profile.setup.title', 'Complete Your Portuguese Community Profile')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('profile.setup.subtitle', 'Connect with Portuguese speakers in the U.K. who share your cultural heritage and interests')}
            </p>
          </div>

          <ProfileCreationWizard />
        </div>
      </div>
    </div>
  )
}