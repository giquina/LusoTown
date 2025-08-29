/**
 * Error Monitoring Configuration for Portuguese Community Platform
 * 
 * Comprehensive monitoring system specifically designed for the Portuguese-speaking
 * community features with cultural authenticity indicators and PALOP nation tracking.
 */

export const ERROR_MONITORING = {
  enabled: true,
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    portuguese_community_tracking: true,
    palop_nation_analytics: true
  },
  portuguese_community_alerts: {
    critical_errors: {
      threshold: 5, // errors per minute
      notification_delay: 60000, // 1 minute
      bilingual_notification: true
    },
    business_directory_errors: {
      threshold: 10, // errors per hour
      notification_delay: 300000, // 5 minutes
      portuguese_business_priority: true
    },
    cultural_content_errors: {
      threshold: 3, // errors per minute
      notification_delay: 120000, // 2 minutes
      heritage_preservation_alert: true
    },
    mobile_user_errors: {
      threshold: 15, // errors per hour (mobile-heavy community)
      notification_delay: 180000, // 3 minutes
      portuguese_mobile_focus: true
    }
  },
  performance_monitoring: {
    bilingual_switching_time: {
      threshold: 500, // ms
      alert_enabled: true
    },
    cultural_content_load_time: {
      threshold: 2000, // ms
      alert_enabled: true
    },
    business_directory_search: {
      threshold: 1000, // ms
      alert_enabled: true,
      portuguese_business_priority: true
    },
    event_booking_time: {
      threshold: 3000, // ms
      alert_enabled: true
    },
    mobile_performance: {
      lcp_threshold: 2500, // ms - Critical for mobile-heavy Portuguese community
      fid_threshold: 100, // ms
      cls_threshold: 0.1,
      alert_enabled: true
    }
  }
} as const;

export const PORTUGUESE_ERROR_CONTEXTS = {
  business_directory: 'portuguese_business_search',
  cultural_events: 'portuguese_cultural_events',
  heritage_content: 'portuguese_heritage_preservation',
  bilingual_switching: 'portuguese_language_toggle',
  university_partnerships: 'portuguese_student_services',
  palop_nations: 'lusophone_community_features',
  transport_coordination: 'portuguese_community_transport',
  streaming_service: 'portuguese_cultural_streaming',
  mobile_experience: 'portuguese_mobile_users',
  authentication: 'portuguese_community_auth'
} as const;

export const ERROR_SEVERITY = {
  critical: {
    level: 'critical',
    portuguese_impact: 'severe_community_disruption',
    notification_required: true,
    escalation_time: 300000 // 5 minutes
  },
  high: {
    level: 'high',
    portuguese_impact: 'moderate_community_impact',
    notification_required: true,
    escalation_time: 600000 // 10 minutes
  },
  medium: {
    level: 'medium',
    portuguese_impact: 'minor_community_impact',
    notification_required: false,
    escalation_time: 1800000 // 30 minutes
  },
  low: {
    level: 'low',
    portuguese_impact: 'negligible_community_impact',
    notification_required: false,
    escalation_time: 3600000 // 1 hour
  }
} as const;

export const MONITORING_ENDPOINTS = {
  dashboard: '/api/monitoring/dashboard',
  errors: '/api/monitoring/errors',
  performance: '/api/monitoring/performance',
  health: '/api/monitoring/health',
  incidents: '/api/monitoring/incident'
} as const;

export const PORTUGUESE_COMMUNITY_METRICS = {
  palop_representation: [
    'portugal', 'brazil', 'cape_verde', 'guinea_bissau', 
    'sao_tome_principe', 'angola', 'mozambique', 'east_timor'
  ],
  uk_cities: [
    'london', 'manchester', 'birmingham', 'leeds', 'glasgow',
    'liverpool', 'bristol', 'sheffield', 'edinburgh', 'nottingham'
  ],
  university_partnerships: [
    'ucl', 'kings_college', 'imperial', 'lse', 'oxford',
    'cambridge', 'manchester', 'edinburgh'
  ],
  cultural_authenticity_indicators: {
    portuguese_language_usage: 'percentage_pt_content_engagement',
    heritage_content_interaction: 'cultural_preservation_metrics',
    business_directory_portuguese_searches: 'portuguese_business_discovery',
    event_participation: 'portuguese_community_event_attendance',
    bilingual_toggle_frequency: 'language_switching_patterns'
  }
} as const;

export const ALERT_TEMPLATES = {
  portuguese_community: {
    critical: {
      subject: '🚨 Alerta Crítico - Plataforma Comunidade Portuguesa',
      body: 'Sistema crítico da comunidade portuguesa está em falha. Impacto severo na comunidade.'
    },
    performance: {
      subject: '⚠️ Alerta Performance - Funcionalidades Portuguesas',
      body: 'Performance das funcionalidades da comunidade portuguesa está degradada.'
    },
    cultural_content: {
      subject: '📚 Alerta Conteúdo Cultural - Preservação Portuguesa',
      body: 'Problemas com conteúdo cultural português. Autenticidade em risco.'
    }
  }
} as const;

export const ERROR_CATEGORIES = {
  PORTUGUESE_CONTENT: {
    name: 'Portuguese Content',
    context: PORTUGUESE_ERROR_CONTEXTS.heritage_content,
    severity: ERROR_SEVERITY.high
  },
  BUSINESS_DIRECTORY: {
    name: 'Business Directory',
    context: PORTUGUESE_ERROR_CONTEXTS.business_directory,
    severity: ERROR_SEVERITY.critical
  },
  CULTURAL_MATCHING: {
    name: 'Cultural Matching',
    context: PORTUGUESE_ERROR_CONTEXTS.cultural_events,
    severity: ERROR_SEVERITY.high
  },
  LANGUAGE_SWITCHING: {
    name: 'Language Switching',
    context: PORTUGUESE_ERROR_CONTEXTS.bilingual_switching,
    severity: ERROR_SEVERITY.medium
  }
} as const;

export const MONITORING_ALERTS = {
  enabled: true,
  channels: ['console', 'sentry'],
  thresholds: {
    error_rate: 5,
    response_time: 2000,
    availability: 0.95
  },
  templates: ALERT_TEMPLATES
} as const;