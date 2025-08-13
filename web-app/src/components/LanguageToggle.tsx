'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 min-w-[80px] justify-center"
      title={`Switch to ${language === 'en' ? 'Português' : 'English'}`}
    >
      {/* Always show current language flag and text */}
      {language === 'en' ? (
        <>
          <span className="text-lg">🇬🇧</span>
          <span className="text-sm font-semibold text-gray-700">EN</span>
        </>
      ) : (
        <>
          <span className="text-lg">🇵🇹</span>
          <span className="text-sm font-semibold text-gray-700">PT</span>
        </>
      )}
    </button>
  )
}