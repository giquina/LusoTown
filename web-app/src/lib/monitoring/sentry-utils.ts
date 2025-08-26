/**
 * Sentry Utilities for Portuguese Community Error Tracking
 * Provides helper functions for enhanced error tracking with Portuguese cultural context
 */

import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING, PORTUGUESE_ERROR_CONTEXTS } from '@/config/error-monitoring'

export interface PortugueseErrorContext {
  language: 'en' | 'pt'
  culturalFeature?: keyof typeof PORTUGUESE_ERROR_CONTEXTS
  businessDirectoryAction?: string
  mobileDevice?: boolean
  characterEncodingIssue?: boolean
  userLocation?: {
    region?: string
    city?: string
  }
  browserInfo?: {
    language: string
    timezone: string
  }
}

export interface LusoTownUserContext {
  id?: string
  email?: string
  membershipTier?: string
  preferredLanguage?: 'en' | 'pt'
  communityRole?: string
  verificationStatus?: string
  joinDate?: string
  lastActiveFeature?: string
}

/**
 * Set Portuguese community user context in Sentry
 */
export function setPortugueseUserContext(user: LusoTownUserContext) {
  Sentry.setUser({
    id: user.id,
    email: user.email, // Will be filtered by beforeSend if needed
    segment: 'portuguese-community',
    membership_tier: user.membershipTier,
    preferred_language: user.preferredLanguage,
    community_role: user.communityRole,
    verification_status: user.verificationStatus,
    join_date: user.joinDate,
    last_active_feature: user.lastActiveFeature
  })
}

/**
 * Set Portuguese cultural context for error tracking
 */
export function setPortugueseCulturalContext(context: PortugueseErrorContext) {
  Sentry.setContext('portuguese_community', {
    language: context.language,
    cultural_feature: context.culturalFeature,
    business_directory_action: context.businessDirectoryAction,
    mobile_device: context.mobileDevice || false,
    character_encoding_issue: context.characterEncodingIssue || false,
    user_location: context.userLocation,
    browser_info: context.browserInfo
  })

  // Set tags for better filtering
  Sentry.setTags({
    community_language: context.language,
    cultural_feature: context.culturalFeature || 'general',
    mobile_user: context.mobileDevice ? 'yes' : 'no',
    has_encoding_issues: context.characterEncodingIssue ? 'yes' : 'no'
  })
}

/**
 * Track Portuguese feature performance metrics
 */
export function trackPortuguesePerformance(
  feature: keyof typeof PORTUGUESE_ERROR_CONTEXTS,
  duration: number,
  success: boolean,
  metadata?: Record<string, any>
) {
  const transaction = Sentry.startTransaction({
    name: `Portuguese Feature: ${feature}`,
    op: 'portuguese_community_feature'
  })

  transaction.setTag('feature', feature)
  transaction.setTag('success', success)
  transaction.setTag('community_focus', 'portuguese')
  
  if (metadata) {
    transaction.setData('metadata', metadata)
  }

  // Set performance metrics
  transaction.setMeasurement('duration', duration, 'millisecond')
  
  if (success) {
    transaction.setStatus('ok')
  } else {
    transaction.setStatus('internal_error')
  }

  transaction.finish()

  // Add breadcrumb for the performance event
  Sentry.addBreadcrumb({
    message: `Portuguese feature ${feature} ${success ? 'completed' : 'failed'}`,
    category: 'performance',
    level: success ? 'info' : 'warning',
    data: {
      feature,
      duration,
      success,
      threshold_exceeded: duration > 2000,
      ...metadata
    }
  })
}

/**
 * Track Portuguese community user interactions
 */
export function trackPortugueseUserInteraction(
  action: string,
  feature: keyof typeof PORTUGUESE_ERROR_CONTEXTS,
  metadata?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    message: `Portuguese user interaction: ${action}`,
    category: 'user_interaction',
    level: 'info',
    data: {
      action,
      feature,
      community_focus: 'portuguese',
      timestamp: new Date().toISOString(),
      ...metadata
    }
  })

  // Track as custom event for analytics
  Sentry.captureEvent({
    message: `Portuguese Community Interaction: ${action}`,
    level: 'info',
    tags: {
      event_type: 'user_interaction',
      community: 'portuguese',
      feature,
      action
    },
    extra: metadata
  })
}

/**
 * Capture Portuguese-specific errors with enhanced context
 */
export function capturePortugueseError(
  error: Error | string,
  context: {
    feature: keyof typeof PORTUGUESE_ERROR_CONTEXTS
    severity?: 'info' | 'warning' | 'error' | 'fatal'
    userContext?: PortugueseErrorContext
    additionalData?: Record<string, any>
  }
) {
  Sentry.withScope((scope) => {
    // Set severity
    scope.setLevel(context.severity || 'error')
    
    // Set Portuguese community tags
    scope.setTag('community_focus', 'portuguese')
    scope.setTag('feature_category', context.feature)
    scope.setTag('error_source', 'portuguese_community')
    
    // Set cultural context
    if (context.userContext) {
      setPortugueseCulturalContext(context.userContext)
    }
    
    // Add feature-specific context
    scope.setContext('feature_context', {
      feature: context.feature,
      feature_description: PORTUGUESE_ERROR_CONTEXTS[context.feature],
      additional_data: context.additionalData
    })
    
    // Add breadcrumb
    scope.addBreadcrumb({
      message: `Error in Portuguese feature: ${context.feature}`,
      category: 'error',
      level: context.severity || 'error',
      data: {
        feature: context.feature,
        user_context: context.userContext,
        ...context.additionalData
      }
    })
    
    // Capture the error
    if (typeof error === 'string') {
      Sentry.captureMessage(error, context.severity || 'error')
    } else {
      Sentry.captureException(error)
    }
  })
}

/**
 * Track Portuguese business directory interactions
 */
export function trackBusinessDirectoryEvent(
  action: 'search' | 'view' | 'contact' | 'error',
  businessData?: {
    businessId?: string
    businessType?: string
    location?: string
    searchQuery?: string
    errorDetails?: string
  }
) {
  const isError = action === 'error'
  
  Sentry.addBreadcrumb({
    message: `Business directory ${action}`,
    category: 'portuguese_business',
    level: isError ? 'error' : 'info',
    data: {
      action,
      business_id: businessData?.businessId,
      business_type: businessData?.businessType,
      location: businessData?.location,
      search_query: businessData?.searchQuery,
      error_details: businessData?.errorDetails,
      timestamp: new Date().toISOString()
    }
  })

  if (isError && businessData?.errorDetails) {
    capturePortugueseError(
      `Business directory error: ${businessData.errorDetails}`,
      {
        feature: 'BUSINESS_DIRECTORY',
        severity: 'error',
        additionalData: businessData
      }
    )
  }
}

/**
 * Initialize Portuguese community monitoring for the current session
 */
export function initializePortugueseMonitoring(
  language: 'en' | 'pt',
  userAgent?: string
) {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent || navigator?.userAgent || '')
  const browserLanguage = navigator?.language || 'en'
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Set initial Portuguese context
  setPortugueseCulturalContext({
    language,
    mobileDevice: isMobile,
    browserInfo: {
      language: browserLanguage,
      timezone
    }
  })

  // Set session-level tags
  Sentry.setTags({
    community_platform: 'lusotown',
    target_community: 'portuguese',
    session_language: language,
    is_mobile_session: isMobile ? 'yes' : 'no',
    browser_timezone: timezone
  })

  // Add session initialization breadcrumb
  Sentry.addBreadcrumb({
    message: 'Portuguese community session initialized',
    category: 'session',
    level: 'info',
    data: {
      language,
      is_mobile: isMobile,
      browser_language: browserLanguage,
      timezone,
      initialization_time: new Date().toISOString()
    }
  })
}

/**
 * Track language switching events with performance
 */
export function trackLanguageSwitch(
  fromLanguage: 'en' | 'pt',
  toLanguage: 'en' | 'pt',
  switchDuration: number,
  success: boolean
) {
  const isSlowSwitch = switchDuration > 500 // More than 500ms is considered slow
  
  Sentry.addBreadcrumb({
    message: `Language switch: ${fromLanguage} → ${toLanguage}`,
    category: 'language',
    level: success ? 'info' : 'error',
    data: {
      from_language: fromLanguage,
      to_language: toLanguage,
      duration_ms: switchDuration,
      success,
      is_slow: isSlowSwitch,
      timestamp: new Date().toISOString()
    }
  })

  // Track performance
  trackPortuguesePerformance(
    'LANGUAGE_SWITCHING',
    switchDuration,
    success,
    {
      from_language: fromLanguage,
      to_language: toLanguage,
      is_slow_switch: isSlowSwitch
    }
  )

  // Report slow language switches as performance issues
  if (isSlowSwitch && success) {
    Sentry.captureMessage(
      `Slow language switch detected: ${switchDuration}ms`,
      'warning'
    )
  } else if (!success) {
    capturePortugueseError(
      `Language switch failed: ${fromLanguage} → ${toLanguage}`,
      {
        feature: 'LANGUAGE_SWITCHING',
        severity: 'error',
        additionalData: {
          from_language: fromLanguage,
          to_language: toLanguage,
          duration: switchDuration
        }
      }
    )
  }
}

export default {
  setPortugueseUserContext,
  setPortugueseCulturalContext,
  trackPortuguesePerformance,
  trackPortugueseUserInteraction,
  capturePortugueseError,
  trackBusinessDirectoryEvent,
  initializePortugueseMonitoring,
  trackLanguageSwitch
}