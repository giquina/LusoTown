'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function HeritageSelector() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        {t('heritage.selector.title', 'Heritage Selector')}
      </h2>
      <p className="text-gray-600 mb-6">
        {t('heritage.selector.description', 'Select your Portuguese cultural heritage background.')}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Portugal', 'Brazil', 'Angola', 'Mozambique', 'Cape Verde', 'Guinea-Bissau', 'São Tomé', 'East Timor'].map((country) => (
          <button
            key={country}
            className="p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
          >
            <span className="block text-sm font-medium text-primary-900">{country}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
