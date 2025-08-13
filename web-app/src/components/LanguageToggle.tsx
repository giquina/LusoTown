'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 hover:border-primary-300 transition-colors duration-200"
      title={`Switch to ${language === 'en' ? 'Português' : 'English'}`}
    >
      {language === 'en' ? (
        <span className="text-lg">🇵🇹</span>
      ) : (
        <span className="text-lg">🇬🇧</span>
      )}
      <span className="text-sm font-medium text-gray-700">
        {language === 'en' ? 'PT' : 'EN'}
      </span>
    </button>
  )
}