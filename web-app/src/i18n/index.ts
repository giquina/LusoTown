// Translation loader and management utility
export type Language = 'en' | 'pt'

// Translation cache to avoid repeated JSON parsing
let translationCache: Record<Language, Record<string, string>> = {} as Record<Language, Record<string, string>>

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
    
    // Fallback to English if Lusophone fails to load
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