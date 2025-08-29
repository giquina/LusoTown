'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function BusinessMarketSelector() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        {t('business.marketSelector.title', 'Business Market Selector')}
      </h2>
      <p className="text-gray-600">
        {t('business.marketSelector.description', 'Select your target Portuguese-speaking markets.')}
      </p>
    </div>
  )
}
