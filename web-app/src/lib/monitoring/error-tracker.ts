/**
 * Comprehensive Error Tracking System for LusoTown Platform
 * Handles Portuguese community-specific error tracking and monitoring with Sentry integration
 */

import * as Sentry from '@sentry/nextjs'
import { 
  ERROR_MONITORING, 
  MONITORING_ALERTS, 
  ERROR_CATEGORIES,
  PORTUGUESE_ERROR_CONTEXTS,
  ERROR_SEVERITY,
  PORTUGUESE_ERROR_THRESHOLDS
} from '@/config/error-monitoring'
import { LusoTownError, ErrorType } from '@/lib/errorHandling'
import { getErrorMessage, getContextualErrorMessage } from './portuguese-error-messages'

export interface ErrorEvent {
  id: string
  timestamp: Date
  message: string
  type: ErrorType
  severity: keyof typeof ERROR_SEVERITY
  context: string
  stack?: string
  userAgent?: string
  url?: string
  userId?: string
  sessionId?: string
  portugueseContext?: {
    language: 'pt' | 'en'
    culturalFeature?: string
    businessDirectoryAction?: string
    characterEncodingIssue?: boolean
    mobileDevice?: boolean
  }
  metadata?: Record<string, any>
}

export interface PerformanceMetric {
  name: string
  value: number
  timestamp: Date
  context: string
  threshold?: number
  exceedsThreshold: boolean
}

class ErrorTracker {
  private errorQueue: ErrorEvent[] = []
  private performanceQueue: PerformanceMetric[] = []
  private errorCounts: Map<string, number> = new Map()
  private lastFlush: Date = new Date()
  private sessionId: string = this.generateSessionId()

  constructor() {
    this.setupErrorCapture()
    this.setupPerformanceCapture()
    this.setupPeriodicFlush()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private setupErrorCapture() {
    if (typeof window === 'undefined') return

    // Capture unhandled errors
    window.addEventListener('error', (event) => {
      this.trackError({
        message: event.message,
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.HIGH,
        context: 'unhandled-error',
        stack: event.error?.stack,
        url: event.filename,
        metadata: {
          lineno: event.lineno,
          colno: event.colno
        }
      })
    })

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: event.reason?.message || 'Unhandled promise rejection',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.HIGH,
        context: 'unhandled-rejection',
        stack: event.reason?.stack,
        metadata: {
          reason: event.reason
        }
      })
    })
  }

  private setupPerformanceCapture() {
    if (typeof window === 'undefined') return

    // Capture performance metrics using Performance Observer API
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              this.trackPerformanceMetric({
                name: 'Page Load Time',
                value: entry.duration,
                context: 'page-navigation'
              })
            } else if (entry.entryType === 'measure') {
              this.trackPerformanceMetric({
                name: entry.name,
                value: entry.duration,
                context: 'custom-measure'
              })
            }
          }
        })

        observer.observe({ entryTypes: ['navigation', 'measure'] })
      } catch (error) {
        console.error('Failed to setup performance observer:', error)
      }
    }
  }

  trackError(errorData: Partial<ErrorEvent>) {
    const error: ErrorEvent = {
      id: this.generateErrorId(),
      timestamp: new Date(),
      message: errorData.message || 'Unknown error',
      type: errorData.type || ErrorType.UNKNOWN,
      severity: errorData.severity || ERROR_SEVERITY.MEDIUM,
      context: errorData.context || 'unknown',
      stack: errorData.stack,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      sessionId: this.sessionId,
      userId: errorData.userId,
      portugueseContext: errorData.portugueseContext,
      metadata: errorData.metadata
    }

    // Send to Sentry with Portuguese community context
    this.sendToSentry(error)

    this.errorQueue.push(error)
    this.updateErrorCounts(error)
    this.checkAlertThresholds(error)

    // Immediate flush for critical errors
    if (error.severity === ERROR_SEVERITY.CRITICAL) {
      this.flushErrors()
    }
  }

  trackPerformanceMetric(metricData: Omit<PerformanceMetric, 'timestamp' | 'exceedsThreshold'>) {
    const metric: PerformanceMetric = {
      ...metricData,
      timestamp: new Date(),
      exceedsThreshold: metricData.threshold ? metricData.value > metricData.threshold : false
    }

    this.performanceQueue.push(metric)

    // Track performance issues as errors if they exceed thresholds
    if (metric.exceedsThreshold) {
      this.trackError({
        message: `Performance threshold exceeded: ${metric.name} (${metric.value}ms > ${metric.threshold}ms)`,
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.MEDIUM,
        context: 'performance-degradation',
        metadata: { metric }
      })
    }
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private updateErrorCounts(error: ErrorEvent) {
    const key = `${error.context}-${error.severity}`
    const current = this.errorCounts.get(key) || 0
    this.errorCounts.set(key, current + 1)
  }

  private checkAlertThresholds(error: ErrorEvent) {
    const category = Object.values(ERROR_CATEGORIES).find(cat => 
      cat.context === error.context
    )

    if (category) {
      const key = `${error.context}-${error.severity}`
      const count = this.errorCounts.get(key) || 0

      if (count >= category.alertThreshold) {
        this.triggerAlert(error, category, count)
      }
    }
  }

  private triggerAlert(error: ErrorEvent, category: any, count: number) {
    if (!MONITORING_ALERTS.criticalErrors.enabled) return

    console.error('ALERT TRIGGERED:', {
      category: category.name,
      error: error.message,
      count,
      severity: error.severity,
      context: error.context,
      timestamp: error.timestamp
    })

    // Dispatch custom event for UI notifications
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lusotown:error-alert', {
        detail: { error, category, count }
      }))
    }
  }

  private setupPeriodicFlush() {
    // Flush errors and metrics every 5 minutes
    setInterval(() => {
      this.flushErrors()
      this.flushMetrics()
    }, 5 * 60 * 1000)

    // Flush on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flushErrors()
        this.flushMetrics()
      })
    }
  }

  private async flushErrors() {
    if (this.errorQueue.length === 0) return

    const errorsToFlush = [...this.errorQueue]
    this.errorQueue = []

    try {
      if (ERROR_MONITORING.enabled && ERROR_MONITORING.endpoint) {
        await this.sendToMonitoringService(errorsToFlush, 'errors')
      } else {
        console.group('🚨 Error Batch:', errorsToFlush.length, 'errors')
        errorsToFlush.forEach(error => {
          console.error('Error:', error.message, error)
        })
        console.groupEnd()
      }
    } catch (flushError) {
      console.error('Failed to flush errors:', flushError)
      this.errorQueue.unshift(...errorsToFlush)
    }
  }

  private async flushMetrics() {
    if (this.performanceQueue.length === 0) return

    const metricsToFlush = [...this.performanceQueue]
    this.performanceQueue = []

    try {
      if (ERROR_MONITORING.enabled && ERROR_MONITORING.endpoint) {
        await this.sendToMonitoringService(metricsToFlush, 'metrics')
      } else {
        console.group('📊 Performance Metrics:', metricsToFlush.length, 'metrics')
        metricsToFlush.forEach(metric => {
          const status = metric.exceedsThreshold ? '❌' : '✅'
          console.log(`${status} ${metric.name}: ${metric.value}ms`, metric)
        })
        console.groupEnd()
      }
    } catch (flushError) {
      console.error('Failed to flush metrics:', flushError)
      this.performanceQueue.unshift(...metricsToFlush)
    }
  }

  private async sendToMonitoringService(data: any[], type: 'errors' | 'metrics') {
    if (!ERROR_MONITORING.endpoint || !ERROR_MONITORING.apiKey) return

    const response = await fetch(ERROR_MONITORING.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ERROR_MONITORING.apiKey}`
      },
      body: JSON.stringify({
        type,
        data,
        environment: ERROR_MONITORING.environment,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to send ${type} to monitoring service: ${response.statusText}`)
    }
  }

  private sendToSentry(error: ErrorEvent) {
    try {
      // Set user context if available
      if (error.userId) {
        Sentry.setUser({
          id: error.userId,
          segment: 'portuguese-community'
        })
      }

      // Set Portuguese community context
      Sentry.setContext('portuguese_community', {
        feature_context: error.context,
        language: error.portugueseContext?.language || 'unknown',
        cultural_feature: error.portugueseContext?.culturalFeature,
        business_directory_action: error.portugueseContext?.businessDirectoryAction,
        mobile_device: error.portugueseContext?.mobileDevice || false,
        character_encoding_issue: error.portugueseContext?.characterEncodingIssue || false
      })

      // Set additional metadata
      Sentry.setTags({
        error_severity: error.severity,
        error_type: error.type,
        error_context: error.context,
        session_id: error.sessionId
      })

      // Add breadcrumb for error sequence
      Sentry.addBreadcrumb({
        message: `Error in ${error.context}`,
        category: 'error',
        level: error.severity as any,
        data: {
          error_id: error.id,
          portuguese_context: error.portugueseContext,
          metadata: error.metadata
        }
      })

      // Capture the error
      if (error.stack) {
        const sentryError = new Error(error.message)
        sentryError.stack = error.stack
        Sentry.captureException(sentryError)
      } else {
        Sentry.captureMessage(error.message, error.severity as any)
      }

    } catch (sentryError) {
      console.error('Failed to send error to Sentry:', sentryError)
    }
  }

  // Public methods for manual tracking
  trackPortugueseFeatureError(featureContext: keyof typeof PORTUGUESE_ERROR_CONTEXTS, error: Error | string, metadata?: any) {
    const language = typeof window !== 'undefined' ? 
      (localStorage.getItem('preferred-language') as 'en' | 'pt') || 'en' : 'en'

    // Determine severity based on feature context
    let severity = ERROR_SEVERITY.HIGH
    if (featureContext === 'CULTURAL_MATCHING' || featureContext === 'AUTHENTICATION' || featureContext === 'DATABASE') {
      severity = ERROR_SEVERITY.CRITICAL
    }

    this.trackError({
      message: typeof error === 'string' ? error : error.message,
      type: ErrorType.CLIENT_ERROR,
      severity,
      context: PORTUGUESE_ERROR_CONTEXTS[featureContext],
      stack: typeof error === 'string' ? undefined : error.stack,
      portugueseContext: {
        language,
        culturalFeature: featureContext,
        mobileDevice: typeof window !== 'undefined' ? /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) : false
      },
      metadata
    })
  }

  getErrorSummary() {
    return {
      totalErrors: this.errorQueue.length,
      errorsByContext: Array.from(this.errorCounts.entries()).reduce((acc, [key, count]) => {
        acc[key] = count
        return acc
      }, {} as Record<string, number>),
      criticalErrors: this.errorQueue.filter(e => e.severity === 'critical').length,
      portugueseRelatedErrors: this.errorQueue.filter(e => e.portugueseContext).length
    }
  }
}

// Global error tracker instance
export const errorTracker = new ErrorTracker()

// Export the class for testing
export { ErrorTracker }
