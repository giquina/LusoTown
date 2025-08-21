/**
 * AI Security and Privacy Framework Configuration
 * 
 * Comprehensive AI security and privacy standards specifically designed for
 * the Portuguese community platform, following security-guardian-advisor guidelines.
 */

import { Language } from '@/i18n'

// =============================================================================
// AI SECURITY CONFIGURATION
// =============================================================================

export interface AISecurityConfig {
  dataProtection: DataProtectionConfig
  consentManagement: ConsentManagementConfig
  culturalSensitivity: CulturalSensitivityConfig
  transparency: TransparencyConfig
  userControl: UserControlConfig
  monitoring: MonitoringConfig
  compliance: ComplianceConfig
}

// Data Protection Standards
export interface DataProtectionConfig {
  encryption: EncryptionStandards
  dataMinimization: DataMinimizationRules
  retention: DataRetentionPolicies
  crossBorder: CrossBorderDataRules
  anonymization: AnonymizationSettings
}

export interface EncryptionStandards {
  aiTrainingData: {
    algorithm: 'AES-256-GCM'
    keyRotation: number // days
    backupEncryption: boolean
  }
  culturalContent: {
    sensitivityLevel: 'high' | 'critical'
    encryptionRequired: boolean
    specialHandling: string[]
  }
  userInteractions: {
    encryptInTransit: boolean
    encryptAtRest: boolean
    logEncryption: boolean
  }
}

export interface DataMinimizationRules {
  aiFeatures: {
    notifications: string[] // only necessary data
    matching: string[] // only relevant preferences
    analytics: string[] // only aggregated data
    lusobot: string[] // only conversation context
  }
  culturalData: {
    heritageStories: boolean // require explicit consent
    familyConnections: boolean // handle with extra care
    personalSaudade: boolean // highest sensitivity
    regionalIdentity: boolean // cultural context only
  }
  retentionLimits: {
    conversationLogs: number // days
    interactionData: number // days
    analyticsData: number // days
    errorLogs: number // days
  }
}

// Portuguese Cultural Sensitivity Standards
export interface CulturalSensitivityConfig {
  heritageRespect: HeritageRespectProtocol
  languagePreservation: LanguagePreservationAI
  communityValues: CommunityValuesFramework
  culturalContext: CulturalContextRules
}

export interface HeritageRespectProtocol {
  traditionalKnowledge: {
    requireVerification: boolean
    sourceAttribution: boolean
    communityConsultation: boolean
  }
  familyStories: {
    privacyLevel: 'maximum'
    shareWithConsent: boolean
    culturalSensitivityCheck: boolean
  }
  religiousContent: {
    respectfulHandling: boolean
    avoidGeneralization: boolean
    consultCommunityLeaders: boolean
  }
  regionalIdentity: {
    avoidStereotypes: boolean
    celebrateDiversity: boolean
    respectDialectDifferences: boolean
  }
}

export interface LanguagePreservationAI {
  portugueseSupport: {
    prioritizeNativeContent: boolean
    preserveDialects: boolean
    promotePortugueseUse: boolean
  }
  bilingualBalance: {
    respectPreferences: boolean
    neverForceLanguage: boolean
    culturalContextAware: boolean
  }
  languageLearning: {
    supportLearners: boolean
    culturalContext: boolean
    respectNativeSpeakers: boolean
  }
}

// User Consent and Control
export interface ConsentManagementConfig {
  granularConsent: GranularConsentOptions
  withdrawal: ConsentWithdrawalRights
  transparency: ConsentTransparencyRules
  minorProtection: MinorProtectionRules
}

export interface GranularConsentOptions {
  aiFeatures: {
    notifications: 'explicit' | 'opt_in' | 'granular'
    matching: 'explicit' | 'opt_in' | 'granular'
    analytics: 'explicit' | 'opt_in' | 'granular'
    lusobot: 'explicit' | 'opt_in' | 'granular'
  }
  culturalData: {
    heritageSharing: 'explicit'
    familyConnections: 'explicit'
    regionalPreferences: 'opt_in'
    culturalInterests: 'granular'
  }
  crossBorderTransfer: {
    portugalData: 'explicit'
    brazilData: 'explicit'
    euData: 'opt_in'
    globalData: 'explicit'
  }
}

// Transparency and Explainability
export interface TransparencyConfig {
  aiDisclosure: AIDisclosureRules
  algorithmExplanation: AlgorithmExplanationStandards
  dataUsage: DataUsageTransparency
  bilingualSupport: BilingualTransparencyRules
}

export interface AIDisclosureRules {
  userFacing: {
    clearLabeling: boolean
    languageOptions: Language[]
    culturalContext: boolean
  }
  featureSpecific: {
    notifications: string // disclosure text
    matching: string // how AI helps matching
    analytics: string // what data is analyzed
    lusobot: string // AI conversation disclosure
  }
  ongoing: {
    reminderFrequency: number // days
    contextualReminders: boolean
    optOutAlways: boolean
  }
}

// User Control Systems
export interface UserControlConfig {
  aiPersonalization: PersonalizationControls
  dataControl: DataControlOptions
  privacySettings: PrivacySettingsGranularity
  feedbackMechanisms: FeedbackMechanismConfig
}

export interface PersonalizationControls {
  culturalPreferences: {
    regional: boolean // control regional targeting
    traditional: boolean // control traditional content
    modern: boolean // control modern content
    diaspora: boolean // control diaspora-specific content
  }
  aiIntensity: {
    notifications: 'minimal' | 'balanced' | 'enhanced'
    matching: 'basic' | 'smart' | 'advanced'
    recommendations: 'conservative' | 'moderate' | 'aggressive'
  }
  languageControl: {
    primaryLanguage: Language
    fallbackLanguage: Language
    mixedContent: boolean
    translateUserContent: boolean
  }
}

// Monitoring and Auditing
export interface MonitoringConfig {
  auditTrails: AuditTrailRequirements
  performanceMetrics: PerformanceMonitoringStandards
  securityMonitoring: SecurityMonitoringConfig
  culturalCompliance: CulturalComplianceMonitoring
}

export interface AuditTrailRequirements {
  userInteractions: {
    logLevel: 'basic' | 'detailed' | 'comprehensive'
    retention: number // days
    encryption: boolean
  }
  aiDecisions: {
    trackDecisionPath: boolean
    culturalFactors: boolean
    biasDetection: boolean
  }
  dataAccess: {
    trackAllAccess: boolean
    sensitiveDataFlags: boolean
    crossBorderTracking: boolean
  }
}

// Compliance Framework
export interface ComplianceConfig {
  gdpr: GDPRComplianceRules
  ukDataProtection: UKDataProtectionRules
  portugueseRegulations: PortugueseRegulationCompliance
  communityStandards: CommunityStandardsFramework
}

export interface GDPRComplianceRules {
  legalBasis: {
    notifications: 'legitimate_interest' | 'consent'
    matching: 'consent'
    analytics: 'legitimate_interest'
    lusobot: 'consent'
  }
  dataSubjectRights: {
    access: boolean
    rectification: boolean
    erasure: boolean
    portability: boolean
    restriction: boolean
    objection: boolean
  }
  privacyByDesign: {
    defaultPrivate: boolean
    minimizeData: boolean
    transparentProcessing: boolean
  }
}

// =============================================================================
// DEFAULT AI SECURITY CONFIGURATION
// =============================================================================

export const AI_SECURITY_CONFIG: AISecurityConfig = {
  dataProtection: {
    encryption: {
      aiTrainingData: {
        algorithm: 'AES-256-GCM',
        keyRotation: 90,
        backupEncryption: true
      },
      culturalContent: {
        sensitivityLevel: 'critical',
        encryptionRequired: true,
        specialHandling: ['heritage_stories', 'family_connections', 'saudade_expressions']
      },
      userInteractions: {
        encryptInTransit: true,
        encryptAtRest: true,
        logEncryption: true
      }
    },
    dataMinimization: {
      aiFeatures: {
        notifications: ['user_id', 'preferences', 'language'],
        matching: ['compatibility_factors', 'cultural_preferences'],
        analytics: ['aggregated_patterns', 'feature_usage'],
        lusobot: ['conversation_context', 'cultural_topics']
      },
      culturalData: {
        heritageStories: true,
        familyConnections: true,
        personalSaudade: true,
        regionalIdentity: true
      },
      retentionLimits: {
        conversationLogs: 365,
        interactionData: 90,
        analyticsData: 730,
        errorLogs: 30
      }
    },
    retention: {
      userGenerated: 2555, // 7 years for GDPR compliance
      systemGenerated: 365,
      analyticsData: 730,
      auditLogs: 2555
    },
    crossBorder: {
      ukToPortugal: 'adequacy_decision',
      ukToBrazil: 'standard_contractual_clauses',
      ukToEU: 'adequacy_decision',
      ukToOther: 'explicit_consent'
    },
    anonymization: {
      analyticsData: true,
      researchData: true,
      publicReporting: true,
      thirdPartySharing: true
    }
  },

  consentManagement: {
    granularConsent: {
      aiFeatures: {
        notifications: 'granular',
        matching: 'explicit',
        analytics: 'opt_in',
        lusobot: 'explicit'
      },
      culturalData: {
        heritageSharing: 'explicit',
        familyConnections: 'explicit',
        regionalPreferences: 'opt_in',
        culturalInterests: 'granular'
      },
      crossBorderTransfer: {
        portugalData: 'explicit',
        brazilData: 'explicit',
        euData: 'opt_in',
        globalData: 'explicit'
      }
    },
    withdrawal: {
      immediateEffect: true,
      gracePeriod: 30, // days
      dataRetention: 'minimal',
      reactivationProcess: 'full_consent'
    },
    transparency: {
      plainLanguage: true,
      bilingualConsent: true,
      culturalContext: true,
      regularUpdates: true
    },
    minorProtection: {
      ageVerification: true,
      parentalConsent: true,
      extraProtections: true,
      limitedDataCollection: true
    }
  },

  culturalSensitivity: {
    heritageRespect: {
      traditionalKnowledge: {
        requireVerification: true,
        sourceAttribution: true,
        communityConsultation: true
      },
      familyStories: {
        privacyLevel: 'maximum',
        shareWithConsent: true,
        culturalSensitivityCheck: true
      },
      religiousContent: {
        respectfulHandling: true,
        avoidGeneralization: true,
        consultCommunityLeaders: true
      },
      regionalIdentity: {
        avoidStereotypes: true,
        celebrateDiversity: true,
        respectDialectDifferences: true
      }
    },
    languagePreservation: {
      portugueseSupport: {
        prioritizeNativeContent: true,
        preserveDialects: true,
        promotePortugueseUse: true
      },
      bilingualBalance: {
        respectPreferences: true,
        neverForceLanguage: true,
        culturalContextAware: true
      },
      languageLearning: {
        supportLearners: true,
        culturalContext: true,
        respectNativeSpeakers: true
      }
    },
    communityValues: {
      family: 'highest_priority',
      tradition: 'preserve_and_evolve',
      hospitality: 'embed_in_features',
      solidarity: 'community_first'
    },
    culturalContext: {
      saudadeUnderstanding: true,
      regionalSensitivity: true,
      generationalRespect: true,
      diasporaSupport: true
    }
  },

  transparency: {
    aiDisclosure: {
      userFacing: {
        clearLabeling: true,
        languageOptions: ['en', 'pt'] as Language[],
        culturalContext: true
      },
      featureSpecific: {
        notifications: 'AI helps personalize your notifications based on cultural preferences',
        matching: 'AI suggests compatible connections using cultural compatibility factors',
        analytics: 'AI analyzes community patterns to improve platform features',
        lusobot: 'AI-powered cultural assistant trained on Portuguese heritage and traditions'
      },
      ongoing: {
        reminderFrequency: 180,
        contextualReminders: true,
        optOutAlways: true
      }
    },
    algorithmExplanation: {
      matchingFactors: ['cultural_background', 'interests', 'location', 'community_involvement'],
      notificationLogic: ['relevance', 'timing', 'cultural_significance', 'user_preferences'],
      contentPersonalization: ['language_preference', 'cultural_interests', 'community_engagement']
    },
    dataUsage: {
      clearPurpose: true,
      specificUse: true,
      noSurpriseBehavior: true,
      regularUpdates: true
    },
    bilingualSupport: {
      allNotices: true,
      cultureSpecificExamples: true,
      contextualTranslation: true
    }
  },

  userControl: {
    aiPersonalization: {
      culturalPreferences: {
        regional: true,
        traditional: true,
        modern: true,
        diaspora: true
      },
      aiIntensity: {
        notifications: 'balanced',
        matching: 'smart',
        recommendations: 'moderate'
      },
      languageControl: {
        primaryLanguage: 'en',
        fallbackLanguage: 'pt',
        mixedContent: true,
        translateUserContent: false
      }
    },
    dataControl: {
      viewData: true,
      downloadData: true,
      deleteData: true,
      correctData: true,
      restrictProcessing: true
    },
    privacySettings: {
      granularControls: true,
      easyAccess: true,
      culturalContextHelp: true,
      bilingualInterface: true
    },
    feedbackMechanisms: {
      aiQuality: true,
      culturalAccuracy: true,
      privacyConcerns: true,
      featureRequests: true
    }
  },

  monitoring: {
    auditTrails: {
      userInteractions: {
        logLevel: 'detailed',
        retention: 365,
        encryption: true
      },
      aiDecisions: {
        trackDecisionPath: true,
        culturalFactors: true,
        biasDetection: true
      },
      dataAccess: {
        trackAllAccess: true,
        sensitiveDataFlags: true,
        crossBorderTracking: true
      }
    },
    performanceMetrics: {
      culturalAccuracy: 'monthly_review',
      userSatisfaction: 'weekly_tracking',
      privacyCompliance: 'daily_monitoring',
      biasDetection: 'continuous'
    },
    securityMonitoring: {
      unauthorizedAccess: 'real_time',
      dataBreaches: 'immediate_alert',
      aiModelSecurity: 'weekly_audit',
      culturalContentSecurity: 'daily_review'
    },
    culturalCompliance: {
      heritageRespect: 'community_review',
      languagePreservation: 'linguistic_audit',
      communityValues: 'cultural_assessment',
      diasporaSupport: 'user_feedback'
    }
  },

  compliance: {
    gdpr: {
      legalBasis: {
        notifications: 'legitimate_interest',
        matching: 'consent',
        analytics: 'legitimate_interest',
        lusobot: 'consent'
      },
      dataSubjectRights: {
        access: true,
        rectification: true,
        erasure: true,
        portability: true,
        restriction: true,
        objection: true
      },
      privacyByDesign: {
        defaultPrivate: true,
        minimizeData: true,
        transparentProcessing: true
      }
    },
    ukDataProtection: {
      dataProtectionAct: true,
      ukGDPR: true,
      icoGuidelines: true,
      brexitConsiderations: true
    },
    portugueseRegulations: {
      cnpd: true, // Portuguese Data Protection Authority
      localRegulations: true,
      crossBorderRules: true
    },
    communityStandards: {
      culturalSensitivity: 'highest',
      communityConsultation: true,
      transparentGovernance: true,
      ethicalAI: true
    }
  }
}

// =============================================================================
// AI PRIVACY SETTINGS TEMPLATES
// =============================================================================

export const AI_PRIVACY_TEMPLATES = {
  conservative: {
    name: 'Conservative Privacy',
    description: 'Maximum privacy with minimal AI features',
    settings: {
      aiPersonalization: 'minimal',
      dataSharing: false,
      crossBorderTransfer: false,
      culturalDataSharing: 'explicit_only'
    }
  },
  
  balanced: {
    name: 'Balanced Experience',
    description: 'Good AI features with strong privacy protection',
    settings: {
      aiPersonalization: 'moderate',
      dataSharing: 'opt_in',
      crossBorderTransfer: 'with_consent',
      culturalDataSharing: 'community_only'
    }
  },
  
  enhanced: {
    name: 'Enhanced AI Experience',
    description: 'Full AI features with transparent privacy practices',
    settings: {
      aiPersonalization: 'full',
      dataSharing: 'improved_experience',
      crossBorderTransfer: 'with_safeguards',
      culturalDataSharing: 'community_and_research'
    }
  }
}

// =============================================================================
// PORTUGUESE CULTURAL PRIVACY CONSIDERATIONS
// =============================================================================

export const PORTUGUESE_CULTURAL_PRIVACY = {
  familyValues: {
    description: 'Portuguese families value privacy and close-knit relationships',
    implications: [
      'Family connections should require explicit consent',
      'Multi-generational privacy considerations',
      'Extended family network protection'
    ]
  },
  
  communityTrust: {
    description: 'Portuguese communities are built on trust and mutual support',
    implications: [
      'Transparency builds community trust',
      'Community members expect cultural sensitivity',
      'Word-of-mouth reputation is crucial'
    ]
  },
  
  saudadePrivacy: {
    description: 'Saudade is deeply personal and emotional',
    implications: [
      'Emotional content requires extra care',
      'Personal longing and nostalgia are private',
      'Cultural homesickness needs sensitive handling'
    ]
  },
  
  regionalIdentity: {
    description: 'Regional Portuguese identities are diverse and important',
    implications: [
      'Avoid stereotyping regions',
      'Respect dialect and cultural differences',
      'Continental, island, and diaspora distinctions matter'
    ]
  },
  
  religiousRespect: {
    description: 'Portuguese Catholic heritage influences privacy expectations',
    implications: [
      'Religious content needs respectful handling',
      'Traditional values guide privacy expectations',
      'Community and individual beliefs vary'
    ]
  }
}

// =============================================================================
// EXPORT DEFAULT CONFIGURATION
// =============================================================================

export default AI_SECURITY_CONFIG