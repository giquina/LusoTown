/**
 * Basic Privacy and Security Configuration for LusoTown
 * Portuguese-speaking Community Platform
 */

export const PRIVACY_SECURITY_CONFIG = {
  transparency: {
    dataProcessing: {
      purposes: [
        'community_connection',
        'cultural_event_recommendations', 
        'portuguese_business_discovery',
        'cultural_compatibility_matching'
      ],
      legalBasis: 'consent_and_legitimate_interest',
      retentionPeriod: '24_months',
      thirdPartySharing: 'minimal_essential_only'
    }
  },
  compliance: {
    gdpr: {
      enabled: true,
      dataProtectionOfficer: 'privacy@lusotown.com',
      lawfulBasisTracking: true,
      consentManagement: true,
      rightToPortability: true,
      rightToErasure: true,
      dataMinimization: true,
      privacyByDesign: true
    }
  }
}

export const PORTUGUESE_CULTURAL_PRIVACY = {
  culturalSensitivity: {
    diasporaProtection: true,
    regionalIdentityPrivacy: true,
    familyConnectionProtection: true,
    culturalEventParticipation: 'opt_in_only'
  },
  dataLocalizations: {
    preferredLanguage: ['pt', 'en'],
    culturalContext: 'portuguese_speaking_community',
    regionalCompliance: ['gdpr_eu', 'uk_data_protection']
  }
}

export const PRIVACY_TEMPLATES = {
  dataExport: {
    en: 'Your Portuguese community data export is ready',
    pt: 'A exportação dos seus dados da comunidade portuguesa está pronta'
  },
  dataDeletion: {
    en: 'Your Portuguese community account has been deleted',
    pt: 'A sua conta da comunidade portuguesa foi eliminada'
  },
  consentUpdate: {
    en: 'Privacy settings updated for Portuguese community features',
    pt: 'Definições de privacidade atualizadas para funcionalidades da comunidade portuguesa'
  }
}