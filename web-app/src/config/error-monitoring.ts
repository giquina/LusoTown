/**
 * Error Monitoring and Tracking Configuration
 * Provides comprehensive error tracking for Portuguese-speaking community features
 */

export interface ErrorMonitoringConfig {
  enabled: boolean
  environment: 'development' | 'staging' | 'production'
  endpoint?: string
  apiKey?: string
  sampleRate: number
  maxBreadcrumbs: number
  beforeSend?: (event: any) => any
}

export interface MonitoringMetrics {
  coreWebVitals: {
    lcp: boolean // Largest Contentful Paint
    fid: boolean // First Input Delay  
    cls: boolean // Cumulative Layout Shift
  }
  customMetrics: {
    portugueseContentLoad: boolean
    culturalFeatureUsage: boolean
    businessDirectoryPerformance: boolean
    bilingualSwitchingTime: boolean
  }
}

// Error monitoring configuration
export const ERROR_MONITORING: ErrorMonitoringConfig = {
  enabled: process.env.NODE_ENV === 'production',
  environment: (process.env.NODE_ENV as any) || 'development',
  endpoint: process.env.NEXT_PUBLIC_ERROR_MONITORING_ENDPOINT,
  apiKey: process.env.NEXT_PUBLIC_ERROR_MONITORING_API_KEY,
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  maxBreadcrumbs: 50,
  beforeSend: (event) => {
    // Filter sensitive information
    if (event.user) {
      delete event.user.email
      delete event.user.phone
    }
    return event
  }
}

// Performance monitoring metrics
export const MONITORING_METRICS: MonitoringMetrics = {
  coreWebVitals: {
    lcp: true,
    fid: true,
    cls: true
  },
  customMetrics: {
    portugueseContentLoad: true,
    culturalFeatureUsage: true,
    businessDirectoryPerformance: true,
    bilingualSwitchingTime: true
  }
}

// Portuguese-specific error contexts
export const PORTUGUESE_ERROR_CONTEXTS = {
  CULTURAL_CONTENT: 'portuguese-cultural-content',
  BUSINESS_DIRECTORY: 'portuguese-business-directory',
  LANGUAGE_SWITCHING: 'bilingual-language-switching',
  CHARACTER_ENCODING: 'portuguese-character-encoding',
  CULTURAL_MATCHING: 'cultural-matching-algorithm',
  EVENT_BOOKING: 'lusophone-event-booking',
  UNIVERSITY_PARTNERSHIPS: 'university-partnership-features'
} as const

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium', 
  HIGH: 'high',
  CRITICAL: 'critical'
} as const

// Portuguese community feature error thresholds
export const PORTUGUESE_ERROR_THRESHOLDS = {
  businessDirectoryFailureRate: parseFloat(process.env.PORTUGUESE_CONTENT_ERROR_THRESHOLD || '0.05'), // 5% max failure rate
  culturalContentLoadTime: 3000, // 3 seconds max
  languageSwitchingTime: parseInt(process.env.BILINGUAL_SWITCHING_THRESHOLD || '500'), // 500ms max for language switching
  characterRenderingErrors: 0.01, // 1% max Portuguese character errors
  culturalMatchingTimeout: 5000, // 5 seconds max for cultural matching
  eventBookingFailureRate: 0.02, // 2% max booking failures
  communityEngagementThreshold: parseFloat(process.env.COMMUNITY_ENGAGEMENT_THRESHOLD || '0.7'), // 70% min engagement
  mobilePortugueseUXScore: 85, // 85/100 min mobile UX score for Portuguese users
  uptimeTarget: 0.999 // 99.9% uptime target
}

// Alert configuration for Portuguese community features
export const MONITORING_ALERTS = {
  criticalErrors: {
    enabled: true,
    threshold: 10, // 10 critical errors per hour
    cooldown: 3600000, // 1 hour cooldown
    channels: ['email', 'slack'],
    recipients: process.env.ALERT_RECIPIENTS?.split(',') || []
  },
  performanceDegradation: {
    enabled: true,
    threshold: PORTUGUESE_ERROR_THRESHOLDS.culturalContentLoadTime,
    consecutiveFailures: 5,
    channels: ['slack'],
    recipients: process.env.PERFORMANCE_ALERT_RECIPIENTS?.split(',') || []
  },
  portugueseFeaturesDown: {
    enabled: true,
    threshold: PORTUGUESE_ERROR_THRESHOLDS.businessDirectoryFailureRate,
    timeWindow: 300000, // 5 minutes
    channels: ['email', 'sms'],
    recipients: process.env.CRITICAL_ALERT_RECIPIENTS?.split(',') || []
  }
}

// Error categorization for Portuguese community features
export const ERROR_CATEGORIES = {
  // Portuguese-specific categories
  PORTUGUESE_CONTENT: {
    name: 'Portuguese Content',
    severity: ERROR_SEVERITY.HIGH,
    context: PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT,
    alertThreshold: 5
  },
  BILINGUAL_SYSTEM: {
    name: 'Bilingual System',
    severity: ERROR_SEVERITY.MEDIUM,
    context: PORTUGUESE_ERROR_CONTEXTS.LANGUAGE_SWITCHING,
    alertThreshold: 10
  },
  BUSINESS_DIRECTORY: {
    name: 'Portuguese Business Directory', 
    severity: ERROR_SEVERITY.HIGH,
    context: PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY,
    alertThreshold: 3
  },
  CULTURAL_MATCHING: {
    name: 'Cultural Matching Algorithm',
    severity: ERROR_SEVERITY.CRITICAL,
    context: PORTUGUESE_ERROR_CONTEXTS.CULTURAL_MATCHING,
    alertThreshold: 1
  },
  CHARACTER_ENCODING: {
    name: 'Portuguese Character Encoding',
    severity: ERROR_SEVERITY.HIGH,
    context: PORTUGUESE_ERROR_CONTEXTS.CHARACTER_ENCODING,
    alertThreshold: 5
  },
  // General categories
  AUTHENTICATION: {
    name: 'User Authentication',
    severity: ERROR_SEVERITY.CRITICAL,
    context: 'auth-system',
    alertThreshold: 1
  },
  NETWORK: {
    name: 'Network Connectivity',
    severity: ERROR_SEVERITY.MEDIUM,
    context: 'network-requests',
    alertThreshold: 20
  },
  DATABASE: {
    name: 'Database Operations',
    severity: ERROR_SEVERITY.CRITICAL,
    context: 'database-queries',
    alertThreshold: 2
  }
} as const

// Feature flag for error monitoring
export const ERROR_MONITORING_FEATURES = {
  realTimeAlerts: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_ALERTS === 'true',
  performanceTracking: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_TRACKING !== 'false',
  userSessionRecording: process.env.NEXT_PUBLIC_ENABLE_SESSION_RECORDING === 'true',
  portugueseContextTracking: true,
  mobileFocusedMonitoring: true,
  gdprCompliantLogging: true
}

// Uptime monitoring configuration
export const UPTIME_MONITORING = {
  enabled: process.env.NODE_ENV === 'production',
  checkInterval: parseInt(process.env.UPTIME_CHECK_INTERVAL || '60000'), // 1 minute
  webhookUrl: process.env.UPTIME_WEBHOOK_URL,
  endpoints: {
    homepage: '/',
    events: '/events',
    businessDirectory: '/business-directory',
    streaming: '/streaming',
    api: '/api/health',
    auth: '/api/auth/user'
  },
  healthCheckTimeout: 10000, // 10 seconds
  retryAttempts: 3,
  alertThreshold: 2 // Alert after 2 consecutive failures
}

// Incident response configuration
export const INCIDENT_RESPONSE = {
  escalationLevels: {
    level1: {
      name: 'Community Support',
      contacts: process.env.ALERT_RECIPIENTS?.split(',') || [],
      responseTime: 300000, // 5 minutes
      severity: ['low', 'medium']
    },
    level2: {
      name: 'Technical Team',
      contacts: process.env.PERFORMANCE_ALERT_RECIPIENTS?.split(',') || [],
      responseTime: 900000, // 15 minutes
      severity: ['high']
    },
    level3: {
      name: 'Critical Response Team',
      contacts: process.env.CRITICAL_ALERT_RECIPIENTS?.split(',') || [],
      responseTime: 300000, // 5 minutes
      severity: ['critical']
    }
  },
  communicationChannels: {
    email: true,
    slack: process.env.SLACK_WEBHOOK_URL ? true : false,
    sms: process.env.TWILIO_SMS_ENABLED === 'true',
    statusPage: process.env.STATUS_PAGE_API_KEY ? true : false
  },
  automatedActions: {
    restartServices: false, // Manual approval required
    scaleResources: true, // Auto-scale if configured
    rollbackDeployment: false, // Manual approval required
    enableMaintenanceMode: true // Auto-enable for critical failures
  }
}

// Dashboard configuration
export const MONITORING_DASHBOARD = {
  refreshInterval: 30000, // 30 seconds
  historicalDataDays: 30,
  displayMetrics: [
    'error_rate',
    'portuguese_content_performance',
    'bilingual_switching_performance',
    'business_directory_success_rate',
    'cultural_matching_accuracy',
    'mobile_user_experience_score',
    'uptime_percentage',
    'community_engagement_rate',
    'portuguese_character_rendering_success',
    'api_response_times'
  ],
  alertHistoryLimit: 100,
  realTimeUpdates: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME_ALERTS === 'true'
}

export default {
  ERROR_MONITORING,
  MONITORING_METRICS,
  PORTUGUESE_ERROR_CONTEXTS,
  ERROR_SEVERITY,
  PORTUGUESE_ERROR_THRESHOLDS,
  MONITORING_ALERTS,
  ERROR_CATEGORIES,
  ERROR_MONITORING_FEATURES,
  UPTIME_MONITORING,
  INCIDENT_RESPONSE,
  MONITORING_DASHBOARD
}
