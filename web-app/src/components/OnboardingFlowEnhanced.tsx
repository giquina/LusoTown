'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function OnboardingFlowEnhanced() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        {t('onboarding.title', 'Enhanced Onboarding Flow')}
      </h2>
      <p className="text-gray-600">
        {t('onboarding.placeholder', 'Enhanced onboarding flow for Portuguese-speaking community members.')}
      </p>
    </div>
  )
}
