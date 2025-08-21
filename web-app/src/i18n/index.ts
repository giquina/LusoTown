// Translation loader and management utility
export type Language = 'en' | 'pt'

// Translation cache to avoid repeated JSON parsing
let translationCache: Record<Language, Record<string, string>> = {} as Record<Language, Record<string, string>>

// Static translations loaded synchronously
let staticTranslations: Record<Language, Record<string, string>> | null = null

/**
 * Initialize static translations for synchronous usage
 * This loads translations synchronously to enable the simple t() function
 */
function initializeStaticTranslations() {
  if (staticTranslations) return staticTranslations
  
  try {
    // Load translations synchronously using require (Node.js) or static imports
    const enTranslations = require('./en.json')
    const ptTranslations = require('./pt.json')
    
    staticTranslations = {
      en: enTranslations,
      pt: ptTranslations
    }
    
    // Also populate cache
    translationCache = staticTranslations
    
    return staticTranslations
  } catch (error) {
    console.error('Failed to load static translations:', error)
    // Return empty fallback
    staticTranslations = { en: {}, pt: {} }
    return staticTranslations
  }
}

/**
 * Simple synchronous translation function
 * @param key - Translation key (e.g., 'safety.title')
 * @param language - Target language (defaults to 'en')
 * @returns Translated string or key as fallback
 */
export function t(key: string, language: Language = 'en'): string {
  const translations = initializeStaticTranslations()
  
  const translation = translations[language]?.[key]
  if (translation) {
    return translation
  }
  
  // Fallback to English if Portuguese translation is missing
  if (language === 'pt') {
    const englishFallback = translations.en?.[key]
    if (englishFallback) {
      return englishFallback
    }
  }
  
  // Return key as final fallback
  console.warn(`Missing translation for key: ${key} (language: ${language})`)
  return key
}

/**
 * Translation function with language parameter
 * @param key - Translation key
 * @param language - Target language  
 * @returns Translated string or key as fallback
 */
export function translate(key: string, language: Language): string {
  return t(key, language)
}

/**
 * Dynamically loads translation files only when needed
 * This reduces initial bundle size by lazy-loading translations
 */
export async function loadTranslations(language: Language): Promise<Record<string, string>> {
  // Return cached translations if already loaded
  if (translationCache[language]) {
    return translationCache[language]
  }

  try {
    // Dynamic import to enable code splitting
    const translations = await import(`./${language}.json`)
    translationCache[language] = translations.default
    return translations.default
  } catch (error) {
    console.error(`Failed to load translations for language: ${language}`, error)
    
    // Fallback to English if Portuguese fails to load
    if (language === 'pt') {
      return loadTranslations('en')
    }
    
    // Return empty object as final fallback
    return {}
  }
}

/**
 * Translation function with fallback support
 * @param translations - The loaded translations object
 * @param key - Translation key (e.g., 'hero.title')
 * @param fallback - Optional fallback text if key is not found
 * @returns Translated string or fallback
 */
export function translateKey(
  translations: Record<string, string>, 
  key: string, 
  fallback?: string
): string {
  const value = translations[key]
  
  if (value !== undefined) {
    return value
  }
  
  // Return fallback or the key itself for debugging
  return fallback || key
}

/**
 * Preload translations for better performance
 * Call this during app initialization to cache translations
 */
export async function preloadTranslations(): Promise<void> {
  try {
    await Promise.all([
      loadTranslations('en'),
      loadTranslations('pt')
    ])
  } catch (error) {
    console.error('Failed to preload translations:', error)
  }
}

/**
 * Clear translation cache (useful for testing or memory management)
 */
export function clearTranslationCache(): void {
  translationCache = {} as Record<Language, Record<string, string>>
}

/**
 * Get available languages
 */
export function getAvailableLanguages(): Language[] {
  return ['en', 'pt']
}

/**
 * Validate if a language is supported
 */
export function isValidLanguage(lang: string): lang is Language {
  return getAvailableLanguages().includes(lang as Language)
}