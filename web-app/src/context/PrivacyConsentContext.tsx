'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useLanguage } from './LanguageContext'
import { PRIVACY_SECURITY_CONFIG, PRIVACY_TEMPLATES } from '@/config/privacy-security'
import type { Language } from '@/i18n'

// =============================================================================
// PRIVACY CONSENT MANAGEMENT CONTEXT
// =============================================================================

export interface PrivacyConsentState {
  // Core consent status
  hasGivenConsent: boolean
  consentTimestamp?: string
  consentVersion: string
  
  // Feature-specific consents
  notifications: boolean
  matching: boolean
  analytics: boolean
  communityFeatures: boolean
  
  // Cultural data consents
  heritageSharing: boolean
  familyConnections: boolean
  regionalPreferences: boolean
  culturalInterests: boolean
  
  // Data processing consents
  dataRetention: '6months' | '1year' | '2years' | 'indefinite'
  marketingConsent: boolean
  thirdPartySharing: boolean
}

export interface PrivacyConsentActions {
  updateConsent: (updates: Partial<PrivacyConsentState>) => Promise<void>
  withdrawConsent: (feature: keyof PrivacyConsentState) => Promise<void>
  grantConsent: (feature: keyof PrivacyConsentState) => Promise<void>
  exportUserData: () => Promise<any>
  requestDataDeletion: () => Promise<void>
}

export interface PrivacyConsentContextValue {
  consentState: PrivacyConsentState
  actions: PrivacyConsentActions
  isLoading: boolean
  error?: string
}

const PrivacyConsentContext = createContext<PrivacyConsentContextValue | undefined>(undefined)

// =============================================================================
// PRIVACY CONSENT PROVIDER
// =============================================================================

interface PrivacyConsentProviderProps {
  children: ReactNode
}

export function PrivacyConsentProvider({ children }: PrivacyConsentProviderProps) {
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()
  
  // Default consent state
  const [consentState, setConsentState] = useState<PrivacyConsentState>({
    hasGivenConsent: false,
    consentVersion: '1.0.0',
    notifications: false,
    matching: false,
    analytics: false,
    communityFeatures: false,
    heritageSharing: false,
    familyConnections: false,
    regionalPreferences: false,
    culturalInterests: false,
    dataRetention: '1year',
    marketingConsent: false,
    thirdPartySharing: false
  })

  // Load consent from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lusotown_privacy_consent')
      if (saved) {
        const parsed = JSON.parse(saved)
        setConsentState(parsed)
      }
    } catch (error) {
      console.error('Failed to load privacy consent:', error)
    }
  }, [])

  // Save consent to localStorage
  const saveConsent = useCallback((newState: PrivacyConsentState) => {
    try {
      localStorage.setItem('lusotown_privacy_consent', JSON.stringify(newState))
      setConsentState(newState)
    } catch (error) {
      console.error('Failed to save privacy consent:', error)
      setError('Failed to save consent preferences')
    }
  }, [])

  // Update consent
  const updateConsent = useCallback(async (updates: Partial<PrivacyConsentState>) => {
    setIsLoading(true)
    setError(undefined)
    
    try {
      const newState: PrivacyConsentState = {
        ...consentState,
        ...updates,
        consentTimestamp: new Date().toISOString()
      }
      
      // If granting consent for the first time
      if (!consentState.hasGivenConsent && updates.hasGivenConsent) {
        newState.hasGivenConsent = true
        newState.consentTimestamp = new Date().toISOString()
      }
      
      saveConsent(newState)
    } catch (error) {
      console.error('Failed to update consent:', error)
      setError('Failed to update consent preferences')
    } finally {
      setIsLoading(false)
    }
  }, [consentState, saveConsent])

  // Withdraw consent for specific feature
  const withdrawConsent = useCallback(async (feature: keyof PrivacyConsentState) => {
    await updateConsent({ [feature]: false })
  }, [updateConsent])

  // Grant consent for specific feature
  const grantConsent = useCallback(async (feature: keyof PrivacyConsentState) => {
    await updateConsent({ [feature]: true })
  }, [updateConsent])

  // Export user data
  const exportUserData = useCallback(async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would make an API call
      const userData = {
        consent: consentState,
        exportDate: new Date().toISOString(),
        platform: 'LusoTown Portuguese Community'
      }
      return userData
    } catch (error) {
      console.error('Failed to export data:', error)
      setError('Failed to export user data')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [consentState])

  // Request data deletion
  const requestDataDeletion = useCallback(async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would make an API call
      // For now, clear local storage
      localStorage.removeItem('lusotown_privacy_consent')
      setConsentState({
        hasGivenConsent: false,
        consentVersion: '1.0.0',
        notifications: false,
        matching: false,
        analytics: false,
        communityFeatures: false,
        heritageSharing: false,
        familyConnections: false,
        regionalPreferences: false,
        culturalInterests: false,
        dataRetention: '1year',
        marketingConsent: false,
        thirdPartySharing: false
      })
    } catch (error) {
      console.error('Failed to delete data:', error)
      setError('Failed to delete user data')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const contextValue: PrivacyConsentContextValue = {
    consentState,
    actions: {
      updateConsent,
      withdrawConsent,
      grantConsent,
      exportUserData,
      requestDataDeletion
    },
    isLoading,
    error
  }

  return (
    <PrivacyConsentContext.Provider value={contextValue}>
      {children}
    </PrivacyConsentContext.Provider>
  )
}

// =============================================================================
// HOOK FOR USING PRIVACY CONSENT CONTEXT
// =============================================================================

export function usePrivacyConsent() {
  const context = useContext(PrivacyConsentContext)
  if (context === undefined) {
    throw new Error('usePrivacyConsent must be used within a PrivacyConsentProvider')
  }
  return context
}

// =============================================================================
// PRIVACY CONSENT UTILITIES
// =============================================================================

export const getConsentExplanation = (feature: string, language: Language): string => {
  const explanations = {
    notifications: {
      en: 'Personalized notifications for Portuguese community events and activities',
      pt: 'Notificações personalizadas para eventos e atividades da comunidade portuguesa'
    },
    matching: {
      en: 'Connect with compatible Portuguese-speaking community members',
      pt: 'Conectar com membros compatíveis da comunidade lusófona'
    },
    analytics: {
      en: 'Help improve platform features through usage analytics',
      pt: 'Ajudar a melhorar as funcionalidades da plataforma através de análise de uso'
    },
    communityFeatures: {
      en: 'Access to Portuguese community features and cultural content',
      pt: 'Acesso a funcionalidades da comunidade portuguesa e conteúdo cultural'
    }
  }
  
  return explanations[feature as keyof typeof explanations]?.[language] || 
         'Community platform feature consent'
}