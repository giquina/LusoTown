'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { Language, loadTranslations, translateKey, isValidLanguage } from '@/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en')
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load saved language preference with English as default
  useEffect(() => {
    const savedLanguage = localStorage.getItem('lusotown-language')
    
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      setLanguage(savedLanguage)
    }
    // Always default to English unless user explicitly saved a preference
    // This ensures English is the true default language
  }, [])

  // Load translations when language changes
  useEffect(() => {
    let isMounted = true
    
    const loadLanguageTranslations = async () => {
      setIsLoading(true)
      
      try {
        const newTranslations = await loadTranslations(language)
        
        // Only update if component is still mounted
        if (isMounted) {
          setTranslations(newTranslations)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to load translations:', error)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadLanguageTranslations()

    return () => {
      isMounted = false
    }
  }, [language])

  // Save language preference - memoized to prevent unnecessary re-renders
  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem('lusotown-language', lang)
    } catch (error) {
      console.error('Failed to save language preference:', error)
    }
  }, [])

  // Translation function - memoized to prevent unnecessary re-renders
  const t = useCallback((key: string, fallback?: string): string => {
    return translateKey(translations, key, fallback)
  }, [translations])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ 
    language, 
    setLanguage: handleSetLanguage, 
    t,
    isLoading
  }), [language, handleSetLanguage, t, isLoading])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}