'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case 'en':
        return { flag: '🇬🇧', text: 'EN', label: 'English' }
      case 'pt-pt':
        return { flag: '🇵🇹', text: 'PT', label: 'Português (Portugal)' }
      case 'pt-br':
        return { flag: '🇧🇷', text: 'BR', label: 'Português (Brasil)' }
      default:
        return { flag: '🇬🇧', text: 'EN', label: 'English' }
    }
  }

  const currentLang = getLanguageDisplay(language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 min-w-[80px] justify-center"
        title={`Current: ${currentLang.label}`}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-semibold text-gray-700">{currentLang.text}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px] z-50">
          <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
            Connecting All Portuguese-Speaking Communities
          </p>
          {[
            { value: 'en', ...getLanguageDisplay('en') },
            { value: 'pt-pt', ...getLanguageDisplay('pt-pt') },
            { value: 'pt-br', ...getLanguageDisplay('pt-br') }
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                setLanguage(lang.value as any)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                language === lang.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
              {language === lang.value && (
                <svg className="w-4 h-4 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}