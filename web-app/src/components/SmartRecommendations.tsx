'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function SmartRecommendations() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        {t('recommendations.title', 'Smart Recommendations')}
      </h2>
      <p className="text-gray-600 mb-4">
        {t('recommendations.description', 'AI-powered recommendations for Portuguese community activities.')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-primary-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary-900">
              {t(`recommendations.item${i}.title`, `Recommendation ${i}`)}
            </h3>
            <p className="text-sm text-gray-600">
              {t(`recommendations.item${i}.description`, 'Portuguese cultural recommendation')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
