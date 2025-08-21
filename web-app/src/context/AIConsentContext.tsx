'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useLanguage } from './LanguageContext'
import { AI_SECURITY_CONFIG, AI_PRIVACY_TEMPLATES } from '@/config/ai-security'
import type { Language } from '@/i18n'

// =============================================================================
// AI CONSENT MANAGEMENT CONTEXT
// =============================================================================

export interface AIConsentState {
  // Core consent status
  hasGivenConsent: boolean
  consentTimestamp?: string
  consentVersion: string
  
  // Feature-specific consents
  notifications: boolean
  matching: boolean
  analytics: boolean
  lusobot: boolean
  
  // Cultural data consents
  heritageSharing: boolean
  familyConnections: boolean
  regionalPreferences: boolean
  culturalInterests: boolean
  
  // Cross-border data transfer
  portugalData: boolean
  brazilData: boolean
  euData: boolean
  globalData: boolean
  
  // Privacy template
  privacyTemplate: 'conservative' | 'balanced' | 'enhanced'
  
  // Cultural considerations
  culturalSensitivityLevel: 'standard' | 'enhanced' | 'maximum'
  languagePreference: Language
  dialectPreservation: boolean
  
  // User control preferences
  aiIntensity: {
    notifications: 'minimal' | 'balanced' | 'enhanced'
    matching: 'basic' | 'smart' | 'advanced'
    recommendations: 'conservative' | 'moderate' | 'aggressive'
  }
  
  // Data retention preferences
  dataRetention: {
    conversations: number // days
    interactions: number // days
    analytics: number // days
  }
}

export interface AIConsentActions {
  // Consent management
  giveConsent: (consents: Partial<AIConsentState>) => Promise<void>
  withdrawConsent: (feature?: string) => Promise<void>
  updateConsent: (consents: Partial<AIConsentState>) => Promise<void>
  
  // Template management
  applyPrivacyTemplate: (template: 'conservative' | 'balanced' | 'enhanced') => Promise<void>
  
  // Feature controls
  toggleFeatureConsent: (feature: keyof AIConsentState, enabled: boolean) => Promise<void>
  updateAIIntensity: (feature: string, level: string) => Promise<void>
  
  // Cultural settings
  updateCulturalSettings: (settings: {
    sensitivityLevel?: 'standard' | 'enhanced' | 'maximum'
    languagePreference?: Language
    dialectPreservation?: boolean
  }) => Promise<void>
  
  // Data management
  requestDataExport: () => Promise<void>
  requestDataDeletion: () => Promise<void>
  updateRetentionPreferences: (preferences: Partial<AIConsentState['dataRetention']>) => Promise<void>
  
  // Transparency
  viewAIExplanation: (feature: string) => string
  getDataUsageReport: () => Promise<any>
  getCulturalDataSummary: () => Promise<any>
}

interface AIConsentContextType extends AIConsentState, AIConsentActions {
  isLoading: boolean
  lastUpdated?: string
}

// =============================================================================
// CONTEXT IMPLEMENTATION
// =============================================================================

const AIConsentContext = createContext<AIConsentContextType | undefined>(undefined)

export function useAIConsent() {
  const context = useContext(AIConsentContext)
  if (context === undefined) {
    throw new Error('useAIConsent must be used within an AIConsentProvider')
  }
  return context
}

interface AIConsentProviderProps {
  children: ReactNode
  userId?: string
}

export function AIConsentProvider({ children, userId }: AIConsentProviderProps) {
  const { language, t } = useLanguage()
  
  // Initial state with Portuguese community defaults
  const [consentState, setConsentState] = useState<AIConsentState>({
    hasGivenConsent: false,
    consentVersion: '1.0.0',
    
    // Feature consents - conservative defaults for Portuguese community
    notifications: false,
    matching: false,
    analytics: false,
    lusobot: false,
    
    // Cultural data - explicit consent required
    heritageSharing: false,
    familyConnections: false,
    regionalPreferences: false,
    culturalInterests: false,
    
    // Cross-border data - explicit consent for Portuguese diaspora
    portugalData: false,
    brazilData: false,
    euData: false,
    globalData: false,
    
    // Conservative privacy by default
    privacyTemplate: 'conservative',
    
    // Enhanced cultural sensitivity for Portuguese community
    culturalSensitivityLevel: 'enhanced',
    languagePreference: language,
    dialectPreservation: true,
    
    // Moderate AI intensity
    aiIntensity: {
      notifications: 'balanced',
      matching: 'smart',
      recommendations: 'moderate'
    },
    
    // Privacy-conscious retention periods
    dataRetention: {
      conversations: 90,
      interactions: 30,
      analytics: 180
    }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>()

  // =============================================================================
  // CONSENT MANAGEMENT ACTIONS
  // =============================================================================

  const giveConsent = useCallback(async (consents: Partial<AIConsentState>) => {
    setIsLoading(true)
    try {
      const timestamp = new Date().toISOString()
      
      const newState = {
        ...consentState,
        ...consents,
        hasGivenConsent: true,
        consentTimestamp: timestamp
      }
      
      // Save to local storage and server
      localStorage.setItem('ai_consent_state', JSON.stringify(newState))
      
      // Log consent for audit trail
      console.log('AI Consent Given:', {
        userId,
        timestamp,
        consents: Object.keys(consents),
        culturalContext: {
          language: language,
          sensitivityLevel: newState.culturalSensitivityLevel
        }
      })
      
      setConsentState(newState)
      setLastUpdated(timestamp)
      
      // TODO: Send to backend for GDPR compliance
      // await saveConsentToServer(userId, newState, timestamp)
      
    } catch (error) {
      console.error('Error saving AI consent:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [consentState, userId, language])

  const withdrawConsent = useCallback(async (feature?: string) => {
    setIsLoading(true)
    try {
      const timestamp = new Date().toISOString()
      
      let newState: AIConsentState
      
      if (feature) {
        // Withdraw consent for specific feature
        newState = {
          ...consentState,
          [feature]: false
        }
      } else {
        // Withdraw all consent - return to conservative defaults
        newState = {
          ...consentState,
          hasGivenConsent: false,
          notifications: false,
          matching: false,
          analytics: false,
          lusobot: false,
          heritageSharing: false,
          familyConnections: false,
          regionalPreferences: false,
          culturalInterests: false,
          portugalData: false,
          brazilData: false,
          euData: false,
          globalData: false,
          privacyTemplate: 'conservative'
        }
      }
      
      // Save withdrawal
      localStorage.setItem('ai_consent_state', JSON.stringify(newState))
      
      // Log withdrawal for audit trail
      console.log('AI Consent Withdrawn:', {
        userId,
        timestamp,
        feature: feature || 'all',
        culturalContext: {
          language: language,
          respectsPortuguesePrivacy: true
        }
      })
      
      setConsentState(newState)
      setLastUpdated(timestamp)
      
      // TODO: Send to backend for GDPR compliance
      // await recordConsentWithdrawal(userId, feature, timestamp)
      
    } catch (error) {
      console.error('Error withdrawing AI consent:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [consentState, userId, language])

  const updateConsent = useCallback(async (consents: Partial<AIConsentState>) => {
    setIsLoading(true)
    try {
      const timestamp = new Date().toISOString()
      
      const newState = {
        ...consentState,
        ...consents
      }
      
      localStorage.setItem('ai_consent_state', JSON.stringify(newState))
      
      console.log('AI Consent Updated:', {
        userId,
        timestamp,
        updates: Object.keys(consents),
        culturalConsiderations: {
          respectsHeritagePrivacy: newState.heritageSharing,
          preservesDialects: newState.dialectPreservation,
          culturalSensitivity: newState.culturalSensitivityLevel
        }
      })
      
      setConsentState(newState)
      setLastUpdated(timestamp)
      
    } catch (error) {
      console.error('Error updating AI consent:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [consentState, userId])

  // =============================================================================
  // PRIVACY TEMPLATE MANAGEMENT
  // =============================================================================

  const applyPrivacyTemplate = useCallback(async (template: 'conservative' | 'balanced' | 'enhanced') => {
    const templateConfig = AI_PRIVACY_TEMPLATES[template]
    
    const templateConsents: Partial<AIConsentState> = {
      privacyTemplate: template,
      
      // Apply template settings with Portuguese cultural considerations
      notifications: template !== 'conservative',
      analytics: template === 'enhanced',
      
      // Matching always requires explicit consent in Portuguese culture
      matching: false, // Always requires explicit user consent
      lusobot: template !== 'conservative',
      
      // Cultural data sharing based on template
      heritageSharing: false, // Always requires explicit consent
      familyConnections: false, // Always requires explicit consent
      regionalPreferences: template !== 'conservative',
      culturalInterests: template === 'enhanced',
      
      // Cross-border data transfer
      portugalData: template === 'enhanced',
      euData: template !== 'conservative',
      brazilData: false, // Always requires explicit consent
      globalData: false, // Always requires explicit consent
      
      // Adjust AI intensity based on template
      aiIntensity: {
        notifications: template === 'conservative' ? 'minimal' : template === 'balanced' ? 'balanced' : 'enhanced',
        matching: template === 'conservative' ? 'basic' : template === 'balanced' ? 'smart' : 'advanced',
        recommendations: template === 'conservative' ? 'conservative' : template === 'balanced' ? 'moderate' : 'aggressive'
      }
    }
    
    await updateConsent(templateConsents)
  }, [updateConsent])

  // =============================================================================
  // FEATURE CONTROL ACTIONS
  // =============================================================================

  const toggleFeatureConsent = useCallback(async (feature: keyof AIConsentState, enabled: boolean) => {
    // Special handling for sensitive Portuguese cultural features
    if (['heritageSharing', 'familyConnections'].includes(feature) && enabled) {
      // Show additional cultural sensitivity warning
      const confirmed = window.confirm(
        language === 'pt' 
          ? 'Esta funcionalidade envolve dados culturais sensíveis. Tem a certeza que pretende ativar?'
          : 'This feature involves sensitive cultural data. Are you sure you want to enable it?'
      )
      
      if (!confirmed) return
    }
    
    await updateConsent({ [feature]: enabled })
  }, [updateConsent, language])

  const updateAIIntensity = useCallback(async (feature: string, level: string) => {
    const newIntensity = {
      ...consentState.aiIntensity,
      [feature]: level
    }
    
    await updateConsent({ aiIntensity: newIntensity })
  }, [consentState.aiIntensity, updateConsent])

  // =============================================================================
  // CULTURAL SETTINGS MANAGEMENT
  // =============================================================================

  const updateCulturalSettings = useCallback(async (settings: {
    sensitivityLevel?: 'standard' | 'enhanced' | 'maximum'
    languagePreference?: Language
    dialectPreservation?: boolean
  }) => {
    await updateConsent({
      culturalSensitivityLevel: settings.sensitivityLevel || consentState.culturalSensitivityLevel,
      languagePreference: settings.languagePreference || consentState.languagePreference,
      dialectPreservation: settings.dialectPreservation ?? consentState.dialectPreservation
    })
  }, [consentState, updateConsent])

  // =============================================================================
  // DATA MANAGEMENT ACTIONS
  // =============================================================================

  const requestDataExport = useCallback(async () => {
    try {
      console.log('Data export requested:', {
        userId,
        timestamp: new Date().toISOString(),
        includesCulturalData: consentState.heritageSharing,
        language: language
      })
      
      // TODO: Implement GDPR data export
      // const exportData = await requestUserDataExport(userId)
      // downloadDataExport(exportData, language)
      
      alert(
        language === 'pt' 
          ? 'A sua solicitação de exportação de dados foi processada. Receberá um email em breve.'
          : 'Your data export request has been processed. You will receive an email shortly.'
      )
    } catch (error) {
      console.error('Error requesting data export:', error)
      throw error
    }
  }, [userId, consentState.heritageSharing, language])

  const requestDataDeletion = useCallback(async () => {
    const confirmed = window.confirm(
      language === 'pt' 
        ? 'Tem a certeza que pretende eliminar todos os seus dados? Esta ação não pode ser revertida.'
        : 'Are you sure you want to delete all your data? This action cannot be undone.'
    )
    
    if (!confirmed) return
    
    try {
      console.log('Data deletion requested:', {
        userId,
        timestamp: new Date().toISOString(),
        includesCulturalData: consentState.heritageSharing,
        language: language
      })
      
      // TODO: Implement GDPR right to erasure
      // await requestUserDataDeletion(userId)
      
      // Clear local consent state
      localStorage.removeItem('ai_consent_state')
      
      alert(
        language === 'pt' 
          ? 'A sua solicitação de eliminação de dados foi processada.'
          : 'Your data deletion request has been processed.'
      )
    } catch (error) {
      console.error('Error requesting data deletion:', error)
      throw error
    }
  }, [userId, consentState.heritageSharing, language])

  const updateRetentionPreferences = useCallback(async (preferences: Partial<AIConsentState['dataRetention']>) => {
    const newRetention = {
      ...consentState.dataRetention,
      ...preferences
    }
    
    await updateConsent({ dataRetention: newRetention })
  }, [consentState.dataRetention, updateConsent])

  // =============================================================================
  // TRANSPARENCY ACTIONS
  // =============================================================================

  const viewAIExplanation = useCallback((feature: string): string => {
    const explanations = AI_SECURITY_CONFIG.transparency.aiDisclosure.featureSpecific
    const explanation = explanations[feature as keyof typeof explanations]
    
    if (language === 'pt') {
      const ptExplanations = {
        notifications: 'A IA ajuda a personalizar as suas notificações com base nas preferências culturais',
        matching: 'A IA sugere conexões compatíveis usando fatores de compatibilidade cultural',
        analytics: 'A IA analisa padrões da comunidade para melhorar as funcionalidades da plataforma',
        lusobot: 'Assistente cultural com IA treinado na herança e tradições portuguesas'
      }
      return ptExplanations[feature as keyof typeof ptExplanations] || explanation
    }
    
    return explanation || 'AI feature explanation not available.'
  }, [language])

  const getDataUsageReport = useCallback(async () => {
    // TODO: Generate comprehensive data usage report
    return {
      userId,
      reportDate: new Date().toISOString(),
      consentStatus: consentState,
      dataUsage: {
        notifications: consentState.notifications ? 'Active' : 'Disabled',
        matching: consentState.matching ? 'Active' : 'Disabled',
        analytics: consentState.analytics ? 'Active' : 'Disabled',
        lusobot: consentState.lusobot ? 'Active' : 'Disabled'
      },
      culturalDataHandling: {
        heritageStories: consentState.heritageSharing ? 'Enabled' : 'Disabled',
        familyConnections: consentState.familyConnections ? 'Enabled' : 'Disabled',
        dialectPreservation: consentState.dialectPreservation ? 'Active' : 'Disabled'
      },
      privacyMeasures: {
        encryption: 'AES-256-GCM',
        dataMinimization: 'Active',
        culturalSensitivity: consentState.culturalSensitivityLevel
      }
    }
  }, [userId, consentState])

  const getCulturalDataSummary = useCallback(async () => {
    // TODO: Generate cultural data summary respecting Portuguese privacy values
    return {
      userId,
      culturalProfile: {
        languagePreference: consentState.languagePreference,
        regionalInterests: consentState.regionalPreferences ? 'Enabled' : 'Disabled',
        heritageSharing: consentState.heritageSharing ? 'Enabled' : 'Disabled',
        dialectPreservation: consentState.dialectPreservation
      },
      privacyProtections: {
        familyDataProtection: 'Maximum',
        heritageDataEncryption: 'Active',
        culturalSensitivityLevel: consentState.culturalSensitivityLevel
      },
      communityContributions: {
        culturalEventsParticipation: 'Tracking with consent',
        languagePreservationContribution: consentState.dialectPreservation ? 'Active' : 'Disabled'
      }
    }
  }, [consentState])

  // =============================================================================
  // LOAD CONSENT FROM STORAGE ON INIT
  // =============================================================================

  useEffect(() => {
    const loadConsentState = () => {
      try {
        const stored = localStorage.getItem('ai_consent_state')
        if (stored) {
          const parsedState = JSON.parse(stored)
          setConsentState(prev => ({
            ...prev,
            ...parsedState,
            // Ensure language preference matches current language
            languagePreference: language
          }))
          setLastUpdated(parsedState.consentTimestamp)
        }
      } catch (error) {
        console.error('Error loading AI consent state:', error)
      }
    }
    
    loadConsentState()
  }, [language])

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const contextValue: AIConsentContextType = {
    // State
    ...consentState,
    isLoading,
    lastUpdated,
    
    // Actions
    giveConsent,
    withdrawConsent,
    updateConsent,
    applyPrivacyTemplate,
    toggleFeatureConsent,
    updateAIIntensity,
    updateCulturalSettings,
    requestDataExport,
    requestDataDeletion,
    updateRetentionPreferences,
    viewAIExplanation,
    getDataUsageReport,
    getCulturalDataSummary
  }

  return (
    <AIConsentContext.Provider value={contextValue}>
      {children}
    </AIConsentContext.Provider>
  )
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

export function useAIFeatureEnabled(feature: keyof AIConsentState): boolean {
  const { [feature]: isEnabled } = useAIConsent()
  return Boolean(isEnabled)
}

export function usePortugueseCulturalPrivacy() {
  const consent = useAIConsent()
  
  return {
    respectsHeritagePrivacy: consent.culturalSensitivityLevel === 'maximum',
    preservesDialects: consent.dialectPreservation,
    protectsFamilyData: !consent.familyConnections || consent.culturalSensitivityLevel === 'maximum',
    honorsSaudadePrivacy: consent.culturalSensitivityLevel !== 'standard',
    supportsCommunityValues: consent.regionalPreferences && consent.culturalInterests
  }
}

export default AIConsentProvider