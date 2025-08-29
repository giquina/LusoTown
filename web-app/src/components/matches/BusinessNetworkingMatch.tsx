'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function BusinessNetworkingMatch() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        {t('networking.match.title', 'Business Networking Match')}
      </h2>
      <p className="text-gray-600">
        {t('networking.match.description', 'Connect with Portuguese business professionals in your industry.')}
      </p>
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">🏢</span>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900">Portuguese Business {i}</h3>
              <p className="text-sm text-gray-600">Professional connection</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
