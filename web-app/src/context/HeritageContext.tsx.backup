'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { HeritageConfig, HeritageManager } from '@/config/heritage'

interface HeritageContextType {
  heritage: HeritageConfig
  heritageCode: string
  setHeritage: (code: string) => boolean
  availableHeritages: Array<{ code: string; name: string; flag: string }>
  
  // Utility methods for easy access
  colors: HeritageConfig['branding']['colors']
  symbols: HeritageConfig['branding']['symbols']
  emotes: HeritageConfig['streaming']['emotes']
  culturalAreas: string[]
  businessTypes: string[]
  
  // Helper functions
  moderateContent: (text: string, language?: string) => {
    approved: boolean
    flagged: boolean
    positive: boolean
    score: number
  }
}

const HeritageContext = createContext<HeritageContextType | undefined>(undefined)

interface HeritageProviderProps {
  children: ReactNode
  defaultHeritage?: string
}

export function HeritageProvider({ children, defaultHeritage = 'pt' }: HeritageProviderProps) {
  const [heritageManager] = useState(() => HeritageManager.getInstance())
  const [heritage, setHeritageState] = useState<HeritageConfig>(heritageManager.getCurrentHeritage())
  const [heritageCode, setHeritageCode] = useState<string>(defaultHeritage)

  useEffect(() => {
    // Initialize heritage from localStorage or environment
    const savedHeritage = localStorage.getItem('heritage-code')
    const envHeritage = process.env.NEXT_PUBLIC_HERITAGE_CODE
    const initialHeritage = savedHeritage || envHeritage || defaultHeritage

    if (initialHeritage && heritageManager.setHeritage(initialHeritage)) {
      setHeritageState(heritageManager.getCurrentHeritage())
      setHeritageCode(initialHeritage)
    }
  }, [defaultHeritage, heritageManager])

  const setHeritage = (code: string): boolean => {
    const success = heritageManager.setHeritage(code)
    if (success) {
      setHeritageState(heritageManager.getCurrentHeritage())
      setHeritageCode(code)
      
      // Persist to localStorage
      localStorage.setItem('heritage-code', code)
      
      // Trigger a custom event for other components that might need to react
      window.dispatchEvent(new CustomEvent('heritage-changed', { 
        detail: { code, heritage: heritageManager.getCurrentHeritage() } 
      }))
    }
    return success
  }

  const contextValue: HeritageContextType = {
    heritage,
    heritageCode,
    setHeritage,
    availableHeritages: heritageManager.getAvailableHeritages(),
    
    // Utility accessors
    colors: heritage.branding.colors,
    symbols: heritage.branding.symbols,
    emotes: heritage.streaming.emotes,
    culturalAreas: heritage.geography.diasporaHub.culturalAreas,
    businessTypes: heritage.community.businessTypes,
    
    // Helper functions
    moderateContent: heritageManager.moderateContent.bind(heritageManager)
  }

  return (
    <HeritageContext.Provider value={contextValue}>
      {children}
    </HeritageContext.Provider>
  )
}

export function useHeritage(): HeritageContextType {
  const context = useContext(HeritageContext)
  if (context === undefined) {
    throw new Error('useHeritage must be used within a HeritageProvider')
  }
  return context
}

// Hook for easy access to colors only
export function useHeritageColors() {
  const { colors } = useHeritage()
  return colors
}

// Hook for easy access to symbols only
export function useHeritageSymbols() {
  const { symbols } = useHeritage()
  return symbols
}

// Hook for easy access to emotes only
export function useHeritageEmotes() {
  const { emotes } = useHeritage()
  return emotes
}

// Hook for cultural areas
export function useCulturalAreas() {
  const { culturalAreas } = useHeritage()
  return culturalAreas
}

// Helper hook for getting heritage-aware CSS custom properties
export function useHeritageCSSProperties() {
  const { colors } = useHeritage()
  
  return {
    '--heritage-primary': colors.primary,
    '--heritage-secondary': colors.secondary,
    '--heritage-accent': colors.accent,
    '--heritage-action': colors.action,
    '--heritage-premium': colors.premium,
    '--heritage-coral': colors.coral,
  }
}

export default HeritageContext