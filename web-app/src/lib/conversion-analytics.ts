/**
 * Conversion Analytics Tracking System
 * 
 * Comprehensive analytics for Lusophone community signup conversion optimization.
 * Tracks user behavior, A/B test performance, and cultural engagement metrics.
 */

interface ConversionEvent {
  type: string
  userId?: string
  sessionId: string
  timestamp: number
  data: Record<string, any>
  metadata?: {
    userAgent: string
    viewport: { width: number; height: number }
    referrer: string
    language: string
    timezone: string
  }
}

interface ConversionFunnel {
  stage: string
  users: number
  conversionRate: number
  dropoffRate: number
  avgTimeSpent: number
  topExitReasons: string[]
}

interface ABTestResult {
  testId: string
  variationId: string
  participants: number
  conversions: number
  conversionRate: number
  confidenceLevel: number
  statisticalSignificance: boolean
  uplift: number
}

class ConversionAnalytics {
  private events: ConversionEvent[] = []
  private sessionId: string
  private userId?: string
  private isDebugMode: boolean

  constructor(userId?: string, debugMode = false) {
    this.sessionId = this.generateSessionId()
    this.userId = userId
    this.isDebugMode = debugMode || process.env.NODE_ENV === 'development'
    this.loadStoredEvents()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private loadStoredEvents(): void {
    try {
      const stored = localStorage.getItem('lusotown-conversion-events')
      if (stored) {
        this.events = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load stored conversion events:', error)
    }
  }

  private saveEvents(): void {
    try {
      // Keep only last 1000 events to prevent storage overflow
      const eventsToStore = this.events.slice(-1000)
      localStorage.setItem('lusotown-conversion-events', JSON.stringify(eventsToStore))
    } catch (error) {
      console.warn('Failed to save conversion events:', error)
    }
  }

  // Track conversion events
  track(eventType: string, data: Record<string, any> = {}): void {
    const event: ConversionEvent = {
      type: eventType,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      data,
      metadata: {
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        referrer: document.referrer,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }

    this.events.push(event)
    this.saveEvents()

    if (this.isDebugMode) {
      console.log('🎯 Conversion Event:', event)
    }

    // Send to analytics service (implement based on your analytics provider)
    this.sendToAnalytics(event)
  }

  // Track Lusophone-specific cultural engagement
  trackCulturalEngagement(culturalElement: string, action: string, data: Record<string, any> = {}): void {
    this.track('cultural_engagement', {
      element: culturalElement,
      action,
      ...data,
      isCulturalEvent: true
    })
  }

  // Track Portuguese language preferences
  trackLanguageInteraction(language: 'en' | 'pt', action: string): void {
    this.track('language_interaction', {
      language,
      action,
      isPortugueseInteraction: language === 'pt'
    })
  }

  // Track form field interactions with Lusophone context
  trackFormInteraction(fieldName: string, action: 'focus' | 'blur' | 'complete' | 'error', value?: any): void {
    const isPortugueseField = ['portugueseOrigin', 'londonArea', 'languagePreference'].includes(fieldName)
    
    this.track('form_interaction', {
      field: fieldName,
      action,
      value: action === 'complete' ? value : undefined,
      isPortugueseSpecific: isPortugueseField,
      timestamp: Date.now()
    })
  }

  // Track A/B test assignment and performance
  trackABTest(testId: string, variationId: string, action: 'assigned' | 'converted', data: Record<string, any> = {}): void {
    this.track('ab_test_event', {
      testId,
      variationId,
      action,
      ...data,
      isABTestEvent: true
    })
  }

  // Track social proof interactions
  trackSocialProof(proofType: string, interaction: 'view' | 'click' | 'hover', data: Record<string, any> = {}): void {
    this.track('social_proof_interaction', {
      proofType,
      interaction,
      ...data,
      isSocialProofEvent: true
    })
  }

  // Track partnership-related interactions
  trackPartnershipInteraction(partner: string, action: string, data: Record<string, any> = {}): void {
    this.track('partnership_interaction', {
      partner,
      action,
      ...data,
      isPartnershipEvent: true,
      isPortugueseCultural: ['chocolate-kizomba', 'instituto-camoes', 'portuguese-embassy'].includes(partner)
    })
  }

  // Generate conversion funnel analysis
  getConversionFunnel(): ConversionFunnel[] {
    const funnelStages = [
      'page_view',
      'headline_view',
      'benefits_engagement', 
      'form_started',
      'form_field_completed',
      'form_submitted',
      'signup_completed'
    ]

    const funnel: ConversionFunnel[] = []
    const totalVisitors = this.getUniqueVisitors()

    funnelStages.forEach((stage, index) => {
      const stageEvents = this.events.filter(e => 
        this.getStageEvents(stage).includes(e.type)
      )
      
      const uniqueUsers = new Set(stageEvents.map(e => e.sessionId)).size
      const conversionRate = totalVisitors > 0 ? (uniqueUsers / totalVisitors) * 100 : 0
      const dropoffRate = index > 0 ? 
        ((funnel[index - 1].users - uniqueUsers) / funnel[index - 1].users) * 100 : 0

      const avgTimeSpent = this.calculateAverageTimeSpent(stage)

      funnel.push({
        stage,
        users: uniqueUsers,
        conversionRate,
        dropoffRate,
        avgTimeSpent,
        topExitReasons: this.getTopExitReasons(stage)
      })
    })

    return funnel
  }

  // Get Lusophone-specific insights
  getPortugueseInsights(): {
    culturalEngagement: number
    languagePreference: { en: number; pt: number }
    topCulturalElements: Array<{ element: string; engagement: number }>
    portugueseOriginBreakdown: Record<string, number>
    ukLocationPreferences: Record<string, number>
  } {
    const culturalEvents = this.events.filter(e => e.data.isCulturalEvent)
    const languageEvents = this.events.filter(e => e.data.isPortugueseInteraction !== undefined)
    
    // Calculate cultural engagement score
    const totalEvents = this.events.length
    const culturalEngagement = totalEvents > 0 ? (culturalEvents.length / totalEvents) * 100 : 0

    // Language preferences
    const enEvents = languageEvents.filter(e => e.data.language === 'en').length
    const ptEvents = languageEvents.filter(e => e.data.language === 'pt').length
    const totalLangEvents = enEvents + ptEvents

    const languagePreference = {
      en: totalLangEvents > 0 ? (enEvents / totalLangEvents) * 100 : 0,
      pt: totalLangEvents > 0 ? (ptEvents / totalLangEvents) * 100 : 0
    }

    // Top cultural elements
    const culturalElementCounts: Record<string, number> = {}
    culturalEvents.forEach(e => {
      const element = e.data.element
      if (element) {
        culturalElementCounts[element] = (culturalElementCounts[element] || 0) + 1
      }
    })

    const topCulturalElements = Object.entries(culturalElementCounts)
      .map(([element, count]) => ({ element, engagement: count }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10)

    // Lusophone origin breakdown
    const originEvents = this.events.filter(e => e.data.field === 'portugueseOrigin' && e.data.value)
    const portugueseOriginBreakdown: Record<string, number> = {}
    originEvents.forEach(e => {
      const origin = e.data.value
      portugueseOriginBreakdown[origin] = (portugueseOriginBreakdown[origin] || 0) + 1
    })

    // UK location preferences
    const locationEvents = this.events.filter(e => e.data.field === 'londonArea' && e.data.value)
    const ukLocationPreferences: Record<string, number> = {}
    locationEvents.forEach(e => {
      const location = e.data.value
      ukLocationPreferences[location] = (ukLocationPreferences[location] || 0) + 1
    })

    return {
      culturalEngagement,
      languagePreference,
      topCulturalElements,
      portugueseOriginBreakdown,
      ukLocationPreferences
    }
  }

  // Get A/B test performance
  getABTestResults(testId: string): ABTestResult[] {
    const testEvents = this.events.filter(e => 
      e.type === 'ab_test_event' && e.data.testId === testId
    )

    const variations = new Map<string, { assigned: number; converted: number }>()

    testEvents.forEach(event => {
      const variationId = event.data.variationId
      const action = event.data.action

      if (!variations.has(variationId)) {
        variations.set(variationId, { assigned: 0, converted: 0 })
      }

      const variation = variations.get(variationId)!
      if (action === 'assigned') {
        variation.assigned++
      } else if (action === 'converted') {
        variation.converted++
      }
    })

    return Array.from(variations.entries()).map(([variationId, data]) => {
      const conversionRate = data.assigned > 0 ? (data.converted / data.assigned) * 100 : 0
      
      return {
        testId,
        variationId,
        participants: data.assigned,
        conversions: data.converted,
        conversionRate,
        confidenceLevel: this.calculateConfidenceLevel(data.assigned, data.converted),
        statisticalSignificance: this.isStatisticallySignificant(data.assigned, data.converted),
        uplift: this.calculateUplift(variationId, variations, conversionRate)
      }
    })
  }

  // Mobile-specific analytics
  getMobileInsights(): {
    mobileTraffic: number
    mobileConversionRate: number
    touchInteractions: number
    formFieldFocusRate: number
    mobileCTAClickRate: number
  } {
    const mobileEvents = this.events.filter(e => this.isMobileDevice(e.metadata?.userAgent))
    const totalEvents = this.events.length
    
    const mobileTraffic = totalEvents > 0 ? (mobileEvents.length / totalEvents) * 100 : 0
    
    const mobileConversions = mobileEvents.filter(e => e.type === 'signup_completed').length
    const mobileVisitors = new Set(mobileEvents.map(e => e.sessionId)).size
    const mobileConversionRate = mobileVisitors > 0 ? (mobileConversions / mobileVisitors) * 100 : 0
    
    const touchInteractions = mobileEvents.filter(e => e.type === 'mobile_cta_tapped').length
    const formFieldFocusEvents = mobileEvents.filter(e => e.type === 'mobile_form_focused').length
    const formFieldFocusRate = mobileEvents.length > 0 ? (formFieldFocusEvents / mobileEvents.length) * 100 : 0
    
    const mobileCTAClicks = mobileEvents.filter(e => e.type === 'mobile_cta_tapped').length
    const mobileCTAClickRate = mobileEvents.length > 0 ? (mobileCTAClicks / mobileEvents.length) * 100 : 0

    return {
      mobileTraffic,
      mobileConversionRate,
      touchInteractions,
      formFieldFocusRate,
      mobileCTAClickRate
    }
  }

  // Helper methods
  private getStageEvents(stage: string): string[] {
    const stageMap: Record<string, string[]> = {
      'page_view': ['page_view', 'signup_page_loaded'],
      'headline_view': ['headline_viewed', 'variation_selected'],
      'benefits_engagement': ['benefit_hovered', 'social_proof_clicked', 'cultural_engagement'],
      'form_started': ['form_interaction'],
      'form_field_completed': ['form_field_completed'],
      'form_submitted': ['signup_started'],
      'signup_completed': ['signup_completed']
    }
    return stageMap[stage] || []
  }

  private getUniqueVisitors(): number {
    return new Set(this.events.map(e => e.sessionId)).size
  }

  private calculateAverageTimeSpent(stage: string): number {
    const stageEvents = this.events.filter(e => 
      this.getStageEvents(stage).includes(e.type)
    )
    
    if (stageEvents.length === 0) return 0

    // Group by session and calculate time spent
    const sessionTimes: Record<string, number[]> = {}
    stageEvents.forEach(e => {
      if (!sessionTimes[e.sessionId]) {
        sessionTimes[e.sessionId] = []
      }
      sessionTimes[e.sessionId].push(e.timestamp)
    })

    const avgTimes = Object.values(sessionTimes).map(timestamps => {
      if (timestamps.length < 2) return 0
      return Math.max(...timestamps) - Math.min(...timestamps)
    })

    return avgTimes.length > 0 ? avgTimes.reduce((sum, time) => sum + time, 0) / avgTimes.length : 0
  }

  private getTopExitReasons(stage: string): string[] {
    // This would analyze user behavior patterns to identify exit reasons
    // For now, return common exit reasons based on stage
    const exitReasonMap: Record<string, string[]> = {
      'headline_view': ['headline_not_compelling', 'wrong_audience'],
      'benefits_engagement': ['unclear_value_prop', 'trust_concerns'],
      'form_started': ['too_many_fields', 'privacy_concerns'],
      'form_field_completed': ['validation_errors', 'cultural_mismatch'],
      'form_submitted': ['technical_error', 'email_verification_issue']
    }
    return exitReasonMap[stage] || ['unknown_exit_reason']
  }

  private isMobileDevice(userAgent?: string): boolean {
    if (!userAgent) return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  }

  private calculateConfidenceLevel(participants: number, conversions: number): number {
    // Simplified confidence level calculation
    if (participants < 100) return 0.5 // Low confidence with small sample
    if (participants < 500) return 0.8
    return 0.95
  }

  private isStatisticallySignificant(participants: number, conversions: number): boolean {
    // Simplified statistical significance check
    return participants >= 100 && conversions >= 5
  }

  private calculateUplift(
    variationId: string, 
    variations: Map<string, { assigned: number; converted: number }>,
    conversionRate: number
  ): number {
    // Find control variation (assumes 'control' is the control variation ID)
    const control = variations.get('control')
    if (!control || control.assigned === 0) return 0
    
    const controlRate = (control.converted / control.assigned) * 100
    return controlRate > 0 ? ((conversionRate - controlRate) / controlRate) * 100 : 0
  }

  private async sendToAnalytics(event: ConversionEvent): Promise<void> {
    try {
      // Example implementation - replace with your analytics service
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.type, {
          custom_parameter_user_id: event.userId,
          custom_parameter_session_id: event.sessionId,
          ...event.data
        })
      }

      // Could also send to other analytics services:
      // - Google Analytics 4
      // - Mixpanel
      // - Amplitude
      // - Custom analytics endpoint
    } catch (error) {
      console.warn('Failed to send event to analytics:', error)
    }
  }

  // Export data for analysis
  exportData(): {
    events: ConversionEvent[]
    funnel: ConversionFunnel[]
    portugueseInsights: ReturnType<this['getPortugueseInsights']>
    mobileInsights: ReturnType<this['getMobileInsights']>
  } {
    return {
      events: this.events,
      funnel: this.getConversionFunnel(),
      portugueseInsights: this.getPortugueseInsights(),
      mobileInsights: this.getMobileInsights()
    }
  }

  // Clear analytics data
  clearData(): void {
    this.events = []
    localStorage.removeItem('lusotown-conversion-events')
    sessionStorage.removeItem('lusotown-session-metrics')
  }
}

// Singleton instance for global use
let analyticsInstance: ConversionAnalytics | null = null

export const getConversionAnalytics = (userId?: string): ConversionAnalytics => {
  if (!analyticsInstance) {
    analyticsInstance = new ConversionAnalytics(userId)
  }
  return analyticsInstance
}

// React hook for conversion analytics
export const useConversionAnalytics = (userId?: string) => {
  const analytics = getConversionAnalytics(userId)
  
  return {
    track: analytics.track.bind(analytics),
    trackCultural: analytics.trackCulturalEngagement.bind(analytics),
    trackLanguage: analytics.trackLanguageInteraction.bind(analytics),
    trackForm: analytics.trackFormInteraction.bind(analytics),
    trackABTest: analytics.trackABTest.bind(analytics),
    trackSocialProof: analytics.trackSocialProof.bind(analytics),
    trackPartnership: analytics.trackPartnershipInteraction.bind(analytics),
    getFunnel: analytics.getConversionFunnel.bind(analytics),
    getPortugueseInsights: analytics.getPortugueseInsights.bind(analytics),
    getMobileInsights: analytics.getMobileInsights.bind(analytics),
    exportData: analytics.exportData.bind(analytics)
  }
}

// Lusophone Community Specific Events
export const PORTUGUESE_CONVERSION_EVENTS = {
  // Cultural Engagement
  SAUDADE_MESSAGING_VIEWED: 'saudade_messaging_viewed',
  FLAG_INTERACTION: 'flag_interaction',
  LUSOPHONE_NATIONS_EXPLORED: 'lusophone_nations_explored',
  CULTURAL_HERITAGE_SELECTED: 'cultural_heritage_selected',
  
  // Community Connection
  PORTUGUESE_ORIGIN_SELECTED: 'portuguese_origin_selected',
  UK_LOCATION_SELECTED: 'uk_location_selected',
  LANGUAGE_PREFERENCE_SET: 'language_preference_set',
  CULTURAL_INTERESTS_SELECTED: 'cultural_interests_selected',
  
  // Business Networking
  BUSINESS_INTEREST_SHOWN: 'business_interest_shown',
  PROFESSIONAL_NETWORKING_CTA: 'professional_networking_cta_clicked',
  MENTORSHIP_INTEREST: 'mentorship_interest_shown',
  
  // Romantic Connections
  DATING_INTEREST_SHOWN: 'dating_interest_shown',
  CULTURAL_COMPATIBILITY_INTEREST: 'cultural_compatibility_interest',
  RELATIONSHIP_CTA_CLICKED: 'relationship_cta_clicked',
  
  // Partnership Events
  CHOCOLATE_KIZOMBA_CLICKED: 'chocolate_kizomba_clicked',
  CULTURAL_EVENT_INTEREST: 'cultural_event_interest_shown',
  PARTNER_OFFER_VIEWED: 'partner_offer_viewed'
} as const

export default ConversionAnalytics