/**
 * Production Monitoring Service for LusoTown Portuguese-Speaking Community Platform
 * 
 * Provides comprehensive monitoring for:
 * - Error tracking and alerting with Portuguese cultural context
 * - Performance monitoring for mobile Portuguese community usage
 * - Bilingual content issues detection and reporting
 * - Incident response procedures for community platform
 * - Uptime monitoring for critical Portuguese community features
 * - Portuguese cultural content failure alerts
 * - Community engagement metrics and dashboards
 */

import * as Sentry from '@sentry/nextjs'
import { 
  ERROR_MONITORING,
  MONITORING_METRICS,
  PORTUGUESE_ERROR_CONTEXTS,
  ERROR_SEVERITY,
  PORTUGUESE_ERROR_THRESHOLDS,
  MONITORING_ALERTS,
  ERROR_CATEGORIES,
  UPTIME_MONITORING,
  INCIDENT_RESPONSE,
  MONITORING_DASHBOARD
} from '@/config/error-monitoring'
import { 
  ANALYTICS_EVENTS,
  CULTURAL_EVENTS,
  PERFORMANCE_METRICS,
  trackEvent,
  trackPortugueseCulturalEngagement
} from '@/config/analytics'

// Types for monitoring
export interface MonitoringEvent {
  id: string
  timestamp: Date
  severity: keyof typeof ERROR_SEVERITY
  category: string
  message: string
  context: Record<string, any>
  portugalContext?: {
    language: 'en' | 'pt'
    culturalFeature?: string
    communitySegment?: string
    mobileDevice?: boolean
  }
}

export interface PerformanceMetric {
  name: string
  value: number
  threshold: number
  status: 'good' | 'warning' | 'critical'
  timestamp: Date
  portugueseContext?: boolean
}

export interface UptimeStatus {
  endpoint: string
  status: 'up' | 'down' | 'degraded'
  responseTime: number
  lastCheck: Date
  uptime: number
}

export interface CommunityMetrics {
  activeUsers: number
  portugueseSpeakers: number
  bilingualSwitches: number
  culturalContentViews: number
  businessDirectorySearches: number
  eventBookings: number
  mobileUsage: number
  engagementScore: number
}

/**
 * Core Monitoring Service Class
 */
export class LusoTownMonitoringService {
  private static instance: LusoTownMonitoringService
  private uptimeIntervals: Map<string, NodeJS.Timeout> = new Map()
  private performanceMetrics: PerformanceMetric[] = []
  private communityMetrics: CommunityMetrics = {
    activeUsers: 0,
    portugueseSpeakers: 0,
    bilingualSwitches: 0,
    culturalContentViews: 0,
    businessDirectorySearches: 0,
    eventBookings: 0,
    mobileUsage: 0,
    engagementScore: 0
  }

  private constructor() {
    this.initializeMonitoring()
  }

  public static getInstance(): LusoTownMonitoringService {
    if (!LusoTownMonitoringService.instance) {
      LusoTownMonitoringService.instance = new LusoTownMonitoringService()
    }
    return LusoTownMonitoringService.instance
  }

  /**
   * Initialize comprehensive monitoring systems
   */
  private initializeMonitoring(): void {
    if (typeof window !== 'undefined') {
      this.setupClientSideMonitoring()
    }
    
    if (process.env.NODE_ENV === 'production') {
      this.startUptimeMonitoring()
      this.initializePerformanceTracking()
      this.setupCommunityMetricsTracking()
    }
  }

  /**
   * Client-side monitoring setup
   */
  private setupClientSideMonitoring(): void {
    // Portuguese character rendering monitoring
    this.monitorPortugueseCharacterRendering()
    
    // Bilingual switching performance
    this.monitorBilingualSwitching()
    
    // Mobile Portuguese UX monitoring
    this.monitorMobilePortugueseUX()
    
    // Cultural content performance
    this.monitorCulturalContentPerformance()
  }

  /**
   * Monitor Portuguese character rendering issues
   */
  private monitorPortugueseCharacterRendering(): void {
    const checkCharacterRendering = () => {
      const portugueseText = 'Á„o'
      const testElement = document.createElement('div')
      testElement.textContent = portugueseText
      testElement.style.visibility = 'hidden'
      testElement.style.position = 'absolute'
      document.body.appendChild(testElement)

      const rendered = testElement.textContent || testElement.innerText
      document.body.removeChild(testElement)

      if (rendered !== portugueseText) {
        this.reportError({
          message: 'Portuguese character rendering failure',
          severity: ERROR_SEVERITY.HIGH,
          category: ERROR_CATEGORIES.CHARACTER_ENCODING.name,
          context: {
            expected: portugueseText,
            rendered: rendered,
            userAgent: navigator.userAgent
          }
        })
      }
    }

    // Check on page load and every 5 minutes
    checkCharacterRendering()
    setInterval(checkCharacterRendering, 300000)
  }

  /**
   * Monitor bilingual switching performance
   */
  private monitorBilingualSwitching(): void {
    let switchStartTime: number

    // Listen for language changes
    window.addEventListener('languagechange', () => {
      switchStartTime = Date.now()
    })

    // Monitor DOM changes for language switches
    const observer = new MutationObserver(() => {
      if (switchStartTime) {
        const switchTime = Date.now() - switchStartTime
        
        this.trackPerformanceMetric({
          name: 'bilingual_switching_time',
          value: switchTime,
          threshold: PORTUGUESE_ERROR_THRESHOLDS.languageSwitchingTime,
          status: switchTime <= PORTUGUESE_ERROR_THRESHOLDS.languageSwitchingTime ? 'good' : 'warning',
          timestamp: new Date()
        })

        if (switchTime > PORTUGUESE_ERROR_THRESHOLDS.languageSwitchingTime) {
          this.reportError({
            message: 'Slow bilingual switching performance',
            severity: ERROR_SEVERITY.MEDIUM,
            category: ERROR_CATEGORIES.BILINGUAL_SYSTEM.name,
            context: {
              switchTime: switchTime,
              threshold: PORTUGUESE_ERROR_THRESHOLDS.languageSwitchingTime
            }
          })
        }

        this.communityMetrics.bilingualSwitches++
        switchStartTime = 0
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })
  }

  /**
   * Monitor mobile Portuguese UX performance
   */
  private monitorMobilePortugueseUX(): void {
    if (!this.isMobileDevice()) return

    // Track touch interactions on Portuguese content
    document.addEventListener('touchstart', (event) => {
      const target = event.target as HTMLElement
      const hasPortugueseContent = this.hasPortugueseContent(target)
      
      if (hasPortugueseContent) {
        trackPortugueseCulturalEngagement('mobile_touch_interaction', target.id)
        this.communityMetrics.mobileUsage++
      }
    })

    // Monitor viewport changes for Portuguese content
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        if (this.hasPortugueseContent(element)) {
          this.trackPerformanceMetric({
            name: 'mobile_portuguese_content_layout',
            value: entry.contentRect.width,
            threshold: 320, // Minimum mobile width
            status: entry.contentRect.width >= 320 ? 'good' : 'critical',
            timestamp: new Date(),
            portugueseContext: true
          })
        }
      })
    })

    // Observe Portuguese content containers
    document.querySelectorAll('[lang="pt"], [data-portuguese]').forEach((element) => {
      resizeObserver.observe(element as HTMLElement)
    })
  }

  /**
   * Monitor cultural content performance
   */
  private monitorCulturalContentPerformance(): void {
    // Track Portuguese cultural content loading
    const culturalElements = document.querySelectorAll(
      '[data-cultural], [data-portuguese], [lang="pt"], .portuguese-content'
    )

    culturalElements.forEach((element) => {
      const startTime = Date.now()
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const loadTime = Date.now() - startTime
            
            this.trackPerformanceMetric({
              name: 'cultural_content_load_time',
              value: loadTime,
              threshold: PORTUGUESE_ERROR_THRESHOLDS.culturalContentLoadTime,
              status: loadTime <= PORTUGUESE_ERROR_THRESHOLDS.culturalContentLoadTime ? 'good' : 'warning',
              timestamp: new Date(),
              portugueseContext: true
            })

            this.communityMetrics.culturalContentViews++
            trackEvent(CULTURAL_EVENTS.PORTUGUESE_CONTENT_VIEW, {
              contentType: element.getAttribute('data-cultural') || 'general',
              loadTime: loadTime
            })

            observer.unobserve(entry.target)
          }
        })
      })

      observer.observe(element)
    })
  }

  /**
   * Start uptime monitoring for critical endpoints
   */
  private startUptimeMonitoring(): void {
    if (!UPTIME_MONITORING.enabled) return

    Object.entries(UPTIME_MONITORING.endpoints).forEach(([name, path]) => {
      const interval = setInterval(async () => {
        await this.checkEndpointUptime(name, path)
      }, UPTIME_MONITORING.checkInterval)

      this.uptimeIntervals.set(name, interval)
    })
  }

  /**
   * Check individual endpoint uptime
   */
  private async checkEndpointUptime(name: string, path: string): Promise<void> {
    const startTime = Date.now()
    let attempts = 0
    let lastError: Error | null = null

    while (attempts < UPTIME_MONITORING.retryAttempts) {
      try {
        const response = await fetch(path, {
          method: 'GET'
        })

        const responseTime = Date.now() - startTime
        const isHealthy = response.ok

        if (isHealthy) {
          this.recordUptimeStatus({
            endpoint: name,
            status: 'up',
            responseTime,
            lastCheck: new Date(),
            uptime: this.calculateUptime(name)
          })
          return
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        lastError = error as Error
        attempts++
        
        if (attempts < UPTIME_MONITORING.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second between retries
        }
      }
    }

    // All attempts failed
    const responseTime = Date.now() - startTime
    this.recordUptimeStatus({
      endpoint: name,
      status: 'down',
      responseTime,
      lastCheck: new Date(),
      uptime: this.calculateUptime(name)
    })

    this.reportError({
      message: `Uptime check failed for ${name}`,
      severity: ERROR_SEVERITY.CRITICAL,
      category: 'uptime_monitoring',
      context: {
        endpoint: name,
        path: path,
        attempts: attempts,
        lastError: lastError?.message,
        responseTime: responseTime
      }
    })
  }

  /**
   * Initialize performance tracking
   */
  private initializePerformanceTracking(): void {
    if (typeof window === 'undefined') return

    // Core Web Vitals tracking
    this.trackWebVitals()
    
    // Portuguese-specific performance metrics
    this.trackPortuguesePerformanceMetrics()
  }

  /**
   * Track Core Web Vitals with Portuguese context
   */
  private trackWebVitals(): void {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      
      this.trackPerformanceMetric({
        name: PERFORMANCE_METRICS.LARGEST_CONTENTFUL_PAINT,
        value: lastEntry.startTime,
        threshold: 2500, // 2.5 seconds
        status: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'warning' : 'critical',
        timestamp: new Date()
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry: any) => {
        this.trackPerformanceMetric({
          name: PERFORMANCE_METRICS.FIRST_INPUT_DELAY,
          value: entry.processingStart - entry.startTime,
          threshold: 100, // 100ms
          status: entry.processingStart - entry.startTime <= 100 ? 'good' : 'critical',
          timestamp: new Date()
        })
      })
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let cls = 0
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cls += entry.value
        }
      })
      
      this.trackPerformanceMetric({
        name: PERFORMANCE_METRICS.CUMULATIVE_LAYOUT_SHIFT,
        value: cls,
        threshold: 0.1,
        status: cls <= 0.1 ? 'good' : cls <= 0.25 ? 'warning' : 'critical',
        timestamp: new Date()
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  /**
   * Track Portuguese-specific performance metrics
   */
  private trackPortuguesePerformanceMetrics(): void {
    // Business directory search performance
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.matches('[data-business-search], .business-search-btn')) {
        const startTime = Date.now()
        
        // Track when results load
        const observer = new MutationObserver(() => {
          const resultsContainer = document.querySelector('.business-results, [data-business-results]')
          if (resultsContainer && resultsContainer.children.length > 0) {
            const searchTime = Date.now() - startTime
            
            this.trackPerformanceMetric({
              name: 'business_directory_search_time',
              value: searchTime,
              threshold: 2000, // 2 seconds
              status: searchTime <= 2000 ? 'good' : 'warning',
              timestamp: new Date(),
              portugueseContext: true
            })

            this.communityMetrics.businessDirectorySearches++
            observer.disconnect()
          }
        })

        observer.observe(document.body, { childList: true, subtree: true })
      }
    })

    // Event booking performance
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.matches('[data-event-book], .event-book-btn')) {
        const startTime = Date.now()
        
        const handleBookingComplete = () => {
          const bookingTime = Date.now() - startTime
          
          this.trackPerformanceMetric({
            name: 'event_booking_time',
            value: bookingTime,
            threshold: 3000, // 3 seconds
            status: bookingTime <= 3000 ? 'good' : 'warning',
            timestamp: new Date(),
            portugueseContext: true
          })

          this.communityMetrics.eventBookings++
          document.removeEventListener('bookingComplete', handleBookingComplete)
        }

        document.addEventListener('bookingComplete', handleBookingComplete)
      }
    })
  }

  /**
   * Setup community metrics tracking
   */
  private setupCommunityMetricsTracking(): void {
    // Track community engagement
    setInterval(() => {
      this.calculateCommunityEngagement()
    }, 60000) // Every minute

    // Track Portuguese speaker identification
    document.addEventListener('languagePreferenceSet', (event: any) => {
      if (event.detail?.language === 'pt') {
        this.communityMetrics.portugueseSpeakers++
      }
    })
  }

  /**
   * Calculate community engagement score
   */
  private calculateCommunityEngagement(): void {
    const totalUsers = this.communityMetrics.activeUsers || 1
    const engagementFactors = {
      bilingualUsage: this.communityMetrics.bilingualSwitches / totalUsers,
      culturalContentViews: this.communityMetrics.culturalContentViews / totalUsers,
      businessDirectoryUsage: this.communityMetrics.businessDirectorySearches / totalUsers,
      eventParticipation: this.communityMetrics.eventBookings / totalUsers,
      mobileUsage: this.communityMetrics.mobileUsage / totalUsers
    }

    const engagementScore = Object.values(engagementFactors).reduce((sum, factor) => sum + factor, 0) / 5
    this.communityMetrics.engagementScore = Math.min(engagementScore, 1)

    // Alert if engagement drops below threshold
    if (engagementScore < PORTUGUESE_ERROR_THRESHOLDS.communityEngagementThreshold) {
      this.reportError({
        message: 'Community engagement below threshold',
        severity: ERROR_SEVERITY.MEDIUM,
        category: 'community_engagement',
        context: {
          currentScore: engagementScore,
          threshold: PORTUGUESE_ERROR_THRESHOLDS.communityEngagementThreshold,
          metrics: this.communityMetrics
        }
      })
    }

    // Track engagement metric
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_name: 'community_engagement',
      metric_value: engagementScore,
      community_segment: 'portuguese'
    })
  }

  /**
   * Report error with Portuguese community context
   */
  public reportError(errorData: {
    message: string
    severity: keyof typeof ERROR_SEVERITY
    category: string
    context: Record<string, any>
    portugalContext?: {
      language: 'en' | 'pt'
      culturalFeature?: string
      communitySegment?: string
      mobileDevice?: boolean
    }
  }): void {
    const monitoringEvent: MonitoringEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      severity: errorData.severity,
      category: errorData.category,
      message: errorData.message,
      context: errorData.context,
      portugalContext: errorData.portugalContext
    }

    // Send to Sentry with Portuguese context
    Sentry.captureException(new Error(errorData.message), {
      level: this.mapSeverityToSentryLevel(errorData.severity),
      tags: {
        category: errorData.category,
        community: 'portuguese-speaking',
        ...(errorData.portugalContext?.language && { language: errorData.portugalContext.language }),
        ...(errorData.portugalContext?.culturalFeature && { cultural_feature: errorData.portugalContext.culturalFeature })
      },
      contexts: {
        lusotown: {
          ...errorData.context,
          ...errorData.portugalContext
        }
      }
    })

    // Check if alert threshold is reached
    this.checkAlertThreshold(errorData.category, errorData.severity)

    // Track error analytics
    trackEvent(ANALYTICS_EVENTS.ERROR_BOUNDARY, {
      error_category: errorData.category,
      error_severity: errorData.severity,
      portuguese_context: !!errorData.portugalContext
    })
  }

  /**
   * Track performance metric
   */
  public trackPerformanceMetric(metric: PerformanceMetric): void {
    this.performanceMetrics.push(metric)

    // Keep only last 1000 metrics
    if (this.performanceMetrics.length > 1000) {
      this.performanceMetrics = this.performanceMetrics.slice(-1000)
    }

    // Send to monitoring systems
    Sentry.addBreadcrumb({
      message: `Performance metric: ${metric.name}`,
      level: metric.status === 'critical' ? 'error' : metric.status === 'warning' ? 'warning' : 'info',
      data: {
        value: metric.value,
        threshold: metric.threshold,
        status: metric.status,
        portuguese_context: metric.portugueseContext
      }
    })

    // Track in analytics
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_status: metric.status,
      portuguese_context: metric.portugueseContext
    })
  }

  /**
   * Record uptime status
   */
  private recordUptimeStatus(status: UptimeStatus): void {
    // Store uptime data (in production, this would go to a database)
    if (typeof window !== 'undefined') {
      const uptimeData = JSON.parse(localStorage.getItem('lusotown_uptime') || '{}')
      uptimeData[status.endpoint] = status
      localStorage.setItem('lusotown_uptime', JSON.stringify(uptimeData))
    }

    // Send critical alerts for downtime
    if (status.status === 'down') {
      this.triggerIncidentResponse('uptime_failure', {
        endpoint: status.endpoint,
        responseTime: status.responseTime,
        uptime: status.uptime
      })
    }
  }

  /**
   * Trigger incident response procedures
   */
  private triggerIncidentResponse(incidentType: string, context: Record<string, any>): void {
    const incident = {
      id: this.generateEventId(),
      type: incidentType,
      timestamp: new Date(),
      context: context,
      severity: this.determineIncidentSeverity(incidentType, context)
    }

    // Determine escalation level
    const escalationLevel = this.getEscalationLevel(incident.severity)
    
    // Send alerts through configured channels
    this.sendIncidentAlerts(incident, escalationLevel)

    // Log incident
    console.error('LusoTown Incident:', incident)
    
    // Report to Sentry
    Sentry.captureException(new Error(`Incident: ${incidentType}`), {
      level: 'error',
      tags: {
        incident_type: incidentType,
        severity: incident.severity,
        community: 'portuguese-speaking'
      },
      contexts: {
        incident: context
      }
    })
  }

  // Utility methods
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  private hasPortugueseContent(element: HTMLElement): boolean {
    return element.lang === 'pt' || 
           element.hasAttribute('data-portuguese') ||
           element.classList.contains('portuguese-content') ||
           /[‡·‚„ÁÈÍÌÛÙı˙]/i.test(element.textContent || '')
  }

  private generateEventId(): string {
    return `lusotown_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private mapSeverityToSentryLevel(severity: keyof typeof ERROR_SEVERITY): any {
    const mapping = {
      [ERROR_SEVERITY.LOW]: 'info',
      [ERROR_SEVERITY.MEDIUM]: 'warning',
      [ERROR_SEVERITY.HIGH]: 'error',
      [ERROR_SEVERITY.CRITICAL]: 'fatal'
    }
    return mapping[severity] || 'error'
  }

  private checkAlertThreshold(category: string, severity: keyof typeof ERROR_SEVERITY): void {
    // Implementation for alert threshold checking
    // This would track error counts and trigger alerts when thresholds are exceeded
  }

  private calculateUptime(endpoint: string): number {
    // Implementation for uptime calculation
    // This would calculate uptime percentage based on historical data
    return 99.9 // Placeholder
  }

  private determineIncidentSeverity(type: string, context: Record<string, any>): keyof typeof ERROR_SEVERITY {
    // Logic to determine incident severity based on type and context
    if (type === 'uptime_failure') {
      return ERROR_SEVERITY.CRITICAL
    }
    return ERROR_SEVERITY.MEDIUM
  }

  private getEscalationLevel(severity: keyof typeof ERROR_SEVERITY) {
    if (severity === ERROR_SEVERITY.CRITICAL) {
      return INCIDENT_RESPONSE.escalationLevels.level3
    } else if (severity === ERROR_SEVERITY.HIGH) {
      return INCIDENT_RESPONSE.escalationLevels.level2
    }
    return INCIDENT_RESPONSE.escalationLevels.level1
  }

  private sendIncidentAlerts(incident: any, escalationLevel: any): void {
    // Implementation for sending alerts through various channels
    // This would integrate with email, Slack, SMS, etc.
    console.log('Incident alert:', incident, escalationLevel)
  }

  // Public API methods
  public getCommunityMetrics(): CommunityMetrics {
    return this.communityMetrics
  }

  public getPerformanceMetrics(): PerformanceMetric[] {
    return this.performanceMetrics
  }

  public getUptimeStatus(): Record<string, UptimeStatus> {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('lusotown_uptime') || '{}')
    }
    return {}
  }

  public startMonitoring(): void {
    this.initializeMonitoring()
  }

  public stopMonitoring(): void {
    this.uptimeIntervals.forEach((interval) => {
      clearInterval(interval)
    })
    this.uptimeIntervals.clear()
  }
}

// Export singleton instance
export const monitoring = LusoTownMonitoringService.getInstance()

// Export utility functions
export const reportError = (errorData: Parameters<typeof monitoring.reportError>[0]) => {
  monitoring.reportError(errorData)
}

export const trackPerformance = (metric: PerformanceMetric) => {
  monitoring.trackPerformanceMetric(metric)
}

export const getCommunityMetrics = () => {
  return monitoring.getCommunityMetrics()
}

export const startProductionMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    monitoring.startMonitoring()
  }
}