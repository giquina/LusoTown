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

  const getCurrentFlag = () => {
    if (language.startsWith('pt')) {
      return '🇵🇹' // Show PT flag for any Portuguese variant
    }
    return '🇬🇧' // UK flag for English
  }

  const currentLang = getLanguageDisplay(language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-secondary-200/40 hover:border-secondary-400 hover:shadow-xl hover:bg-gradient-to-r hover:from-secondary-50 hover:to-accent-50 transition-all duration-300 hover:scale-105 w-12 h-12"
        title={`Current: ${currentLang.label}`}
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{getCurrentFlag()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-secondary-200/60 py-2 min-w-[280px] z-50 animate-fade-in">
          <div className="px-5 py-3 bg-gradient-to-r from-secondary-50/60 via-accent-50/40 to-coral-50/40 border-b border-secondary-200/40">
            <p className="text-xs text-secondary-700 font-bold uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse"></span>
              Unidos pela Língua • United by Language
            </p>
            <p className="text-xs text-gray-600 mt-1">Connecting All Portuguese-Speaking Communities</p>
          </div>
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
              className={`group w-full flex items-center gap-4 px-5 py-3 text-sm hover:bg-gradient-to-r hover:from-secondary-50/60 hover:to-accent-50/40 transition-all duration-300 ${
                language === lang.value 
                  ? 'bg-gradient-to-r from-secondary-100/80 to-accent-100/60 text-secondary-800 shadow-sm' 
                  : 'text-gray-700 hover:text-secondary-700'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">{lang.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-semibold">{lang.label}</div>
                {lang.value === 'pt-pt' && <div className="text-xs text-gray-500">Europa • África • Ásia</div>}
                {lang.value === 'pt-br' && <div className="text-xs text-gray-500">Brasil • América</div>}
                {lang.value === 'en' && <div className="text-xs text-gray-500">Global • International</div>}
              </div>
              {language === lang.value && (
                <div className="w-5 h-5 bg-gradient-to-r from-secondary-600 to-accent-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
          
          {/* Cultural note */}
          <div className="px-5 py-3 mt-2 border-t border-secondary-200/40">
            <p className="text-xs text-gray-500 italic leading-relaxed">
              "Onde há portugueses, há sempre uma mesa para mais um" - Celebrating all corners of the Portuguese-speaking world
            </p>
          </div>
        </div>
      )}
    </div>
  )
}