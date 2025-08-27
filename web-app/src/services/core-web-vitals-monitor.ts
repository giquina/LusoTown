/**
 * Core Web Vitals Monitoring Service
 * 
 * Real-time performance monitoring system for the LusoTown Portuguese
 * community platform. Tracks Core Web Vitals with Portuguese cultural
 * context and mobile-first optimization.
 */

import logger from '@/utils/logger';
import { 
  WEB_VITALS_THRESHOLDS,
  PORTUGUESE_MONITORING_CATEGORIES,
  MOBILE_MONITORING_BREAKPOINTS,
  AI_PERFORMANCE_THRESHOLDS,
  MONITORING_CONFIG,
  getPerformanceScore,
  getPortugueseContentWeight,
  calculateMobilePerformancePriority,
  WebVitalMetric,
  WebVitalMeasurement,
  DashboardMetrics,
  PerformanceScore,
  MonitoringCategory
} from '@/config/core-web-vitals';
import { ANALYTICS_EVENTS, PERFORMANCE_METRICS, trackEvent } from '@/config/analytics';

// Browser compatibility check
const isPerformanceObserverSupported = () => {
  return typeof window !== 'undefined' && 'PerformanceObserver' in window;
};

const isWebVitalsSupported = () => {
  return typeof window !== 'undefined' && 'performance' in window;
};

// Core Web Vitals Collector Class
class CoreWebVitalsMonitor {
  private measurements: WebVitalMeasurement[] = [];
  private observers: PerformanceObserver[] = [];
  private alertCallbacks: ((metric: WebVitalMeasurement) => void)[] = [];
  private isCollecting = false;
  private currentPageCategory: MonitoringCategory = 'CULTURAL_EVENTS';
  private deviceType: string = 'mobile';
  private userLanguage: 'en' | 'pt' = 'en';
  private culturalContent = true;

  constructor() {
    this.detectDeviceType();
    this.detectUserLanguage();
    this.detectCulturalContent();
  }

  // Initialize monitoring
  public startMonitoring(pageCategory?: MonitoringCategory): void {
    if (!isWebVitalsSupported() || this.isCollecting) return;

    this.isCollecting = true;
    this.currentPageCategory = pageCategory || this.detectPageCategory();
    
    logger.info(`Starting Core Web Vitals monitoring for Portuguese community platform: ${this.currentPageCategory}`, {
      area: 'performance',
      action: 'start_web_vitals_monitoring',
      culturalContext: 'portuguese',
      pageCategory: this.currentPageCategory
    });
    
    // Start collecting all Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTI();
    
    // Monitor AI system performance
    this.monitorAIPerformance();
    
    // Monitor Portuguese content loading
    this.monitorPortugueseContentPerformance();
    
    // Set up periodic reporting
    this.setupPeriodicReporting();
    
    // Track monitoring start
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_type: 'monitoring_started',
      page_category: this.currentPageCategory,
      device_type: this.deviceType,
      language: this.userLanguage,
      cultural_content: this.culturalContent
    });
  }

  // Stop monitoring and cleanup
  public stopMonitoring(): void {
    if (!this.isCollecting) return;
    
    this.isCollecting = false;
    
    // Disconnect all observers
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        logger.warn('Performance observer disconnect error', {
          area: 'performance',
          action: 'disconnect_observer',
          culturalContext: 'portuguese',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    });
    
    this.observers = [];
    
    logger.info('Core Web Vitals monitoring stopped for Portuguese platform', {
      area: 'performance',
      action: 'stop_web_vitals_monitoring',
      culturalContext: 'portuguese'
    });
    
    // Track monitoring stop with final measurements
    const finalMetrics = this.getCurrentMetrics();
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_type: 'monitoring_stopped',
      final_lcp: finalMetrics.webVitals.LCP,
      final_fid: finalMetrics.webVitals.FID,
      final_cls: finalMetrics.webVitals.CLS,
      measurements_count: this.measurements.length
    });
  }

  // Observe Largest Contentful Paint (LCP)
  private observeLCP(): void {
    if (!isPerformanceObserverSupported()) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry && lastEntry.startTime) {
          const measurement = this.createMeasurement('LCP', lastEntry.startTime);
          this.recordMeasurement(measurement);
          
          // Check for Portuguese content impact
          this.analyzePortugueseContentImpact('LCP', lastEntry.startTime);
          
          // Alert if performance is poor
          if (measurement.score === 'poor') {
            this.triggerPerformanceAlert(measurement);
          }
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('LCP observer setup failed for Portuguese platform', {
        area: 'performance',
        action: 'lcp_observer_setup',
        culturalContext: 'portuguese',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  // Observe First Input Delay (FID)
  private observeFID(): void {
    if (!isPerformanceObserverSupported()) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          if (entry.name === 'first-input' && entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime;
            const measurement = this.createMeasurement('FID', fid);
            this.recordMeasurement(measurement);
            
            // Check for Portuguese UI interaction delays
            this.analyzePortugueseUIPerformance(fid);
            
            if (measurement.score === 'poor') {
              this.triggerPerformanceAlert(measurement);
            }
          }
        });
      });
      
      observer.observe({ type: 'first-input', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      logger.warn('FID observer setup failed for Portuguese platform', {
        area: 'performance',
        action: 'fid_observer_setup',
        culturalContext: 'portuguese',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  // Observe Cumulative Layout Shift (CLS)
  private observeCLS(): void {
    if (!isPerformanceObserverSupported()) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: any[] = [];
    
    try {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent input
          if (!(entry as any).hadRecentInput) {
            const entryValue = (entry as any).value;
            
            if (sessionEntries.length === 0 || 
                entry.startTime - sessionEntries[sessionEntries.length - 1].startTime < 1000) {
              sessionValue += entryValue;
              sessionEntries.push(entry);
            } else {
              // New session
              clsValue = Math.max(clsValue, sessionValue);
              sessionValue = entryValue;
              sessionEntries = [entry];
            }
          }
        }
        
        // Update current CLS value
        const currentCLS = Math.max(clsValue, sessionValue);
        if (currentCLS > 0) {
          const measurement = this.createMeasurement('CLS', currentCLS);
          this.recordMeasurement(measurement);
          
          // Analyze Portuguese content layout stability
          this.analyzePortugueseLayoutStability(currentCLS);
          
          if (measurement.score === 'poor') {
            this.triggerPerformanceAlert(measurement);
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observer setup failed:', error);
    }
  }

  // Observe First Contentful Paint (FCP)
  private observeFCP(): void {
    if (!isPerformanceObserverSupported()) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint' && entry.startTime) {
            const measurement = this.createMeasurement('FCP', entry.startTime);
            this.recordMeasurement(measurement);
            
            // Analyze Portuguese text rendering
            this.analyzePortugueseTextRendering(entry.startTime);
          }
        });
      });
      
      observer.observe({ type: 'paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP observer setup failed:', error);
    }
  }

  // Observe Time to Interactive (TTI)
  private observeTTI(): void {
    // TTI is complex to measure directly, so we'll use a simplified approach
    // combining DOMContentLoaded and main thread quiet periods
    
    if (typeof document !== 'undefined') {
      let domContentLoaded = 0;
      let mainThreadQuiet = 0;
      
      // Measure DOM content loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          domContentLoaded = performance.now();
          this.calculateTTI(domContentLoaded, mainThreadQuiet);
        });
      } else {
        domContentLoaded = performance.now();
      }
      
      // Estimate main thread quiet (simplified)
      setTimeout(() => {
        mainThreadQuiet = performance.now();
        this.calculateTTI(domContentLoaded, mainThreadQuiet);
      }, 100); // Wait for immediate tasks to complete
    }
  }

  // Calculate TTI from DOM and main thread metrics
  private calculateTTI(domTime: number, quietTime: number): void {
    const tti = Math.max(domTime, quietTime);
    const measurement = this.createMeasurement('TTI', tti);
    this.recordMeasurement(measurement);
  }

  // Monitor AI System Performance
  private monitorAIPerformance(): void {
    // Monitor LusoBot response times
    this.monitorAIComponent('lusobot', AI_PERFORMANCE_THRESHOLDS.LUSOBOT_RESPONSE_TIME);
    
    // Monitor matching algorithm performance  
    this.monitorAIComponent('matching', AI_PERFORMANCE_THRESHOLDS.MATCHING_ALGORITHM);
    
    // Monitor notification processing
    this.monitorAIComponent('notifications', AI_PERFORMANCE_THRESHOLDS.NOTIFICATION_PROCESSING);
    
    // Monitor analytics processing
    this.monitorAIComponent('analytics', AI_PERFORMANCE_THRESHOLDS.ANALYTICS_PROCESSING);
  }

  // Monitor specific AI component
  private monitorAIComponent(component: string, threshold: number): void {
    // Look for AI component loading indicators
    const aiSelector = `[data-ai-component="${component}"]`;
    const aiElement = document.querySelector(aiSelector);
    
    if (aiElement) {
      const startTime = performance.now();
      
      // Monitor when AI component becomes interactive
      const observer = new MutationObserver(() => {
        const isReady = aiElement.getAttribute('data-ai-ready') === 'true';
        if (isReady) {
          const loadTime = performance.now() - startTime;
          
          trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
            metric_type: `ai_${component}_load_time`,
            value: loadTime,
            threshold: threshold,
            status: loadTime <= threshold ? 'good' : 'poor',
            page_category: this.currentPageCategory
          });
          
          observer.disconnect();
        }
      });
      
      observer.observe(aiElement, { attributes: true });
    }
  }

  // Monitor Portuguese content performance
  private monitorPortugueseContentPerformance(): void {
    // Monitor Portuguese text rendering
    this.monitorPortugueseTextElements();
    
    // Monitor Portuguese images loading  
    this.monitorPortugueseCulturalImages();
    
    // Monitor Portuguese cultural symbols/icons
    this.monitorCulturalElements();
  }

  // Monitor Portuguese text elements
  private monitorPortugueseTextElements(): void {
    const textElements = document.querySelectorAll('[data-portuguese-text="true"]');
    const startTime = performance.now();
    
    // Check if Portuguese text has rendered
    const checkTextRendering = () => {
      let renderedCount = 0;
      textElements.forEach(element => {
        if (element.getBoundingClientRect().height > 0) {
          renderedCount++;
        }
      });
      
      if (renderedCount === textElements.length && textElements.length > 0) {
        const renderTime = performance.now() - startTime;
        
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'portuguese_text_rendering',
          value: renderTime,
          text_elements_count: textElements.length,
          device_type: this.deviceType
        });
      } else if (performance.now() - startTime < 5000) {
        // Keep checking for up to 5 seconds
        requestAnimationFrame(checkTextRendering);
      }
    };
    
    requestAnimationFrame(checkTextRendering);
  }

  // Monitor Portuguese cultural images
  private monitorPortugueseCulturalImages(): void {
    const culturalImages = document.querySelectorAll('[data-portuguese-cultural="true"]');
    let loadedCount = 0;
    const startTime = performance.now();
    
    culturalImages.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === culturalImages.length) {
              const loadTime = performance.now() - startTime;
              
              trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
                metric_type: 'portuguese_cultural_images_load',
                value: loadTime,
                images_count: culturalImages.length,
                device_type: this.deviceType
              });
            }
          });
        }
      }
    });
    
    // Handle case where all images are already loaded
    if (loadedCount === culturalImages.length && culturalImages.length > 0) {
      const loadTime = performance.now() - startTime;
      
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'portuguese_cultural_images_load', 
        value: loadTime,
        images_count: culturalImages.length,
        device_type: this.deviceType
      });
    }
  }

  // Monitor cultural elements (icons, symbols, etc.)
  private monitorCulturalElements(): void {
    const culturalElements = document.querySelectorAll('[data-cultural-element="true"]');
    
    if (culturalElements.length > 0) {
      const startTime = performance.now();
      
      // Wait for elements to be positioned
      requestAnimationFrame(() => {
        const loadTime = performance.now() - startTime;
        
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'cultural_elements_ready',
          value: loadTime,
          elements_count: culturalElements.length,
          page_category: this.currentPageCategory
        });
      });
    }
  }

  // Create measurement object
  private createMeasurement(metric: WebVitalMetric, value: number): WebVitalMeasurement {
    return {
      metric,
      value,
      score: getPerformanceScore(metric, value),
      timestamp: Date.now(),
      pageCategory: this.currentPageCategory,
      deviceType: this.deviceType as any,
      userLanguage: this.userLanguage,
      culturalContent: this.culturalContent
    };
  }

  // Record measurement
  private recordMeasurement(measurement: WebVitalMeasurement): void {
    this.measurements.push(measurement);
    
    // Keep only recent measurements to prevent memory issues
    const maxMeasurements = 100;
    if (this.measurements.length > maxMeasurements) {
      this.measurements = this.measurements.slice(-maxMeasurements);
    }
    
    // Log significant measurements
    if (measurement.score === 'poor') {
      console.warn(`🚨 Poor ${measurement.metric} detected:`, {
        value: measurement.value,
        threshold: WEB_VITALS_THRESHOLDS[measurement.metric].GOOD,
        pageCategory: measurement.pageCategory,
        deviceType: measurement.deviceType
      });
    }
    
    // Track in analytics
    trackEvent(PERFORMANCE_METRICS[`${measurement.metric.toLowerCase()}_metric` as keyof typeof PERFORMANCE_METRICS] || ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric: measurement.metric.toLowerCase(),
      value: measurement.value,
      score: measurement.score,
      page_category: measurement.pageCategory,
      device_type: measurement.deviceType,
      user_language: measurement.userLanguage,
      cultural_content: measurement.culturalContent
    });
  }

  // Analyze Portuguese content impact on performance
  private analyzePortugueseContentImpact(metric: string, value: number): void {
    const contentWeight = getPortugueseContentWeight(this.currentPageCategory);
    const expectedImpact = contentWeight * 100; // Percentage impact
    
    if (expectedImpact > 25) { // More than 25% impact
      console.log(`📊 Portuguese content impact on ${metric}:`, {
        contentWeight,
        expectedImpact: `${expectedImpact.toFixed(1)}%`,
        actualValue: value,
        pageCategory: this.currentPageCategory
      });
    }
  }

  // Analyze Portuguese UI performance
  private analyzePortugueseUIPerformance(fid: number): void {
    // Check if FID is impacted by Portuguese UI elements
    const portugueseUIElements = document.querySelectorAll('[data-portuguese-ui="true"]');
    
    if (portugueseUIElements.length > 0 && fid > WEB_VITALS_THRESHOLDS.FID.GOOD) {
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'portuguese_ui_interaction_delay',
        fid_value: fid,
        ui_elements_count: portugueseUIElements.length,
        device_type: this.deviceType
      });
    }
  }

  // Analyze Portuguese layout stability
  private analyzePortugueseLayoutStability(cls: number): void {
    // Check for layout shifts in Portuguese content areas
    const portugueseContent = document.querySelectorAll('[data-portuguese-content="true"]');
    
    if (cls > WEB_VITALS_THRESHOLDS.CLS.GOOD && portugueseContent.length > 0) {
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'portuguese_content_layout_shift',
        cls_value: cls,
        content_sections: portugueseContent.length,
        device_type: this.deviceType
      });
    }
  }

  // Analyze Portuguese text rendering
  private analyzePortugueseTextRendering(fcp: number): void {
    // Check if Portuguese text affects FCP
    const portugueseText = document.querySelectorAll('[data-portuguese-text="true"]');
    
    if (portugueseText.length > 0) {
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'portuguese_text_fcp_impact',
        fcp_value: fcp,
        text_elements: portugueseText.length,
        device_type: this.deviceType
      });
    }
  }

  // Trigger performance alert
  private triggerPerformanceAlert(measurement: WebVitalMeasurement): void {
    const alert = {
      type: 'performance_degradation' as const,
      severity: 'critical' as const,
      metric: measurement.metric,
      value: measurement.value,
      threshold: WEB_VITALS_THRESHOLDS[measurement.metric].GOOD,
      pageCategory: measurement.pageCategory,
      deviceType: measurement.deviceType,
      timestamp: measurement.timestamp,
      culturalContent: measurement.culturalContent
    };
    
    // Notify alert callbacks
    this.alertCallbacks.forEach(callback => {
      try {
        callback(measurement);
      } catch (error) {
        console.warn('Performance alert callback error:', error);
      }
    });
    
    // Log critical performance issue
    console.error('🚨 CRITICAL PERFORMANCE ISSUE:', alert);
    
    // Track critical performance event
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_type: 'critical_performance_alert',
      ...alert
    });
  }

  // Setup periodic reporting
  private setupPeriodicReporting(): void {
    const reportingInterval = MONITORING_CONFIG.COLLECTION_INTERVALS.REGULAR;
    
    setInterval(() => {
      if (this.isCollecting && this.measurements.length > 0) {
        const currentMetrics = this.getCurrentMetrics();
        
        // Send metrics to analytics
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'periodic_performance_report',
          lcp: currentMetrics.webVitals.LCP,
          fid: currentMetrics.webVitals.FID, 
          cls: currentMetrics.webVitals.CLS,
          fcp: currentMetrics.webVitals.FCP,
          tti: currentMetrics.webVitals.TTI,
          page_category: this.currentPageCategory,
          device_type: this.deviceType,
          measurements_count: this.measurements.length
        });
      }
    }, reportingInterval);
  }

  // Detect device type
  private detectDeviceType(): void {
    if (typeof window === 'undefined') return;
    
    const width = window.innerWidth;
    if (width <= MOBILE_MONITORING_BREAKPOINTS.MOBILE.width) {
      this.deviceType = 'mobile';
    } else if (width <= MOBILE_MONITORING_BREAKPOINTS.TABLET.width) {
      this.deviceType = 'tablet';
    } else {
      this.deviceType = 'desktop';
    }
  }

  // Detect user language
  private detectUserLanguage(): void {
    if (typeof window === 'undefined') return;
    
    const lang = document.documentElement.lang || 
                 navigator.language || 
                 (navigator as any).userLanguage || 
                 'en';
    
    this.userLanguage = lang.startsWith('pt') ? 'pt' : 'en';
  }

  // Detect cultural content
  private detectCulturalContent(): void {
    if (typeof document === 'undefined') return;
    
    // Check for Portuguese cultural indicators
    const culturalIndicators = [
      '[data-portuguese-content="true"]',
      '[data-cultural-element="true"]',
      '[data-portuguese-cultural="true"]',
      '.portuguese-cultural',
      '.lusophone-content'
    ];
    
    this.culturalContent = culturalIndicators.some(selector => 
      document.querySelector(selector) !== null
    );
  }

  // Detect current page category
  private detectPageCategory(): MonitoringCategory {
    if (typeof window === 'undefined') return 'CULTURAL_EVENTS';
    
    const pathname = window.location.pathname;
    
    if (pathname.includes('/eventos') || pathname.includes('/events')) {
      return 'CULTURAL_EVENTS';
    } else if (pathname.includes('/business') || pathname.includes('/empresa')) {
      return 'BUSINESS_DIRECTORY';
    } else if (pathname.includes('/matches') || pathname.includes('/encontros')) {
      return 'AI_MATCHING';
    } else if (pathname.includes('/streaming')) {
      return 'STREAMING_PLATFORM';
    } else if (pathname.includes('/profile') || pathname.includes('/perfil')) {
      return 'COMMUNITY_PROFILES';
    }
    
    return 'CULTURAL_EVENTS';
  }

  // Get current metrics summary
  public getCurrentMetrics(): DashboardMetrics {
    const latestMeasurements = this.getLatestMeasurements();
    
    return {
      timestamp: Date.now(),
      webVitals: {
        LCP: latestMeasurements.LCP?.value || 0,
        FID: latestMeasurements.FID?.value || 0,
        CLS: latestMeasurements.CLS?.value || 0,
        FCP: latestMeasurements.FCP?.value || 0,
        TTI: latestMeasurements.TTI?.value || 0
      },
      performanceScores: {
        LCP: latestMeasurements.LCP?.score || 'poor',
        FID: latestMeasurements.FID?.score || 'poor',
        CLS: latestMeasurements.CLS?.score || 'poor',
        FCP: latestMeasurements.FCP?.score || 'poor',
        TTI: latestMeasurements.TTI?.score || 'poor'
      },
      portugueseContentMetrics: {
        textRenderingTime: this.calculatePortugueseTextRenderTime(),
        imageLoadingTime: this.calculatePortugueseImageLoadTime(),
        culturalElementsLoadTime: this.calculateCulturalElementsLoadTime()
      },
      aiSystemMetrics: {
        lusoBotResponseTime: this.getAIMetric('lusobot'),
        matchingAlgorithmTime: this.getAIMetric('matching'),
        notificationProcessingTime: this.getAIMetric('notifications'),
        analyticsProcessingTime: this.getAIMetric('analytics')
      },
      mobileMetrics: {
        mobileTraffic: calculateMobilePerformancePriority(this.currentPageCategory),
        mobilePerformanceScore: this.calculateMobilePerformanceScore(),
        touchResponsiveness: this.calculateTouchResponsiveness()
      },
      budgetStatus: []
    };
  }

  // Get latest measurements by metric
  private getLatestMeasurements(): Record<WebVitalMetric, WebVitalMeasurement | undefined> {
    const latest: Record<string, WebVitalMeasurement | undefined> = {};
    
    // Get the most recent measurement for each metric
    Object.values(['LCP', 'FID', 'CLS', 'FCP', 'TTI']).forEach(metric => {
      const measurements = this.measurements.filter(m => m.metric === metric);
      latest[metric] = measurements.length > 0 ? measurements[measurements.length - 1] : undefined;
    });
    
    return latest as Record<WebVitalMetric, WebVitalMeasurement | undefined>;
  }

  // Calculate Portuguese text render time
  private calculatePortugueseTextRenderTime(): number {
    // Simplified calculation - in real implementation would track actual rendering
    const contentWeight = getPortugueseContentWeight(this.currentPageCategory);
    return contentWeight * 500; // Base 500ms adjusted for content weight
  }

  // Calculate Portuguese image load time  
  private calculatePortugueseImageLoadTime(): number {
    // Simplified calculation
    const culturalImages = document.querySelectorAll('[data-portuguese-cultural="true"]').length;
    return Math.max(1000, culturalImages * 200); // 200ms per cultural image, min 1s
  }

  // Calculate cultural elements load time
  private calculateCulturalElementsLoadTime(): number {
    const culturalElements = document.querySelectorAll('[data-cultural-element="true"]').length;
    return culturalElements * 50; // 50ms per cultural element
  }

  // Get AI system metric
  private getAIMetric(component: string): number {
    // In real implementation, would track actual AI response times
    const thresholds = {
      lusobot: AI_PERFORMANCE_THRESHOLDS.LUSOBOT_RESPONSE_TIME,
      matching: AI_PERFORMANCE_THRESHOLDS.MATCHING_ALGORITHM,
      notifications: AI_PERFORMANCE_THRESHOLDS.NOTIFICATION_PROCESSING,
      analytics: AI_PERFORMANCE_THRESHOLDS.ANALYTICS_PROCESSING
    };
    
    return thresholds[component as keyof typeof thresholds] * 0.8; // Assume 80% of threshold
  }

  // Calculate mobile performance score
  private calculateMobilePerformanceScore(): number {
    if (this.deviceType !== 'mobile') return 1.0;
    
    const latest = this.getLatestMeasurements();
    const scores = Object.values(latest).map(m => {
      if (!m) return 0;
      return m.score === 'good' ? 1 : m.score === 'needs-improvement' ? 0.5 : 0;
    });
    
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  }

  // Calculate touch responsiveness
  private calculateTouchResponsiveness(): number {
    const latest = this.getLatestMeasurements();
    const fid = latest.FID;
    
    if (!fid) return 1.0;
    
    // Good touch responsiveness if FID < 100ms
    return fid.value <= 100 ? 1.0 : Math.max(0.1, 1 - (fid.value - 100) / 200);
  }

  // Add alert callback
  public onAlert(callback: (measurement: WebVitalMeasurement) => void): void {
    this.alertCallbacks.push(callback);
  }

  // Remove alert callback
  public removeAlert(callback: (measurement: WebVitalMeasurement) => void): void {
    const index = this.alertCallbacks.indexOf(callback);
    if (index > -1) {
      this.alertCallbacks.splice(index, 1);
    }
  }

  // Get all measurements
  public getMeasurements(): WebVitalMeasurement[] {
    return [...this.measurements];
  }

  // Clear measurements
  public clearMeasurements(): void {
    this.measurements = [];
  }
}

// Export singleton instance
export const coreWebVitalsMonitor = new CoreWebVitalsMonitor();

// Export utility functions
export const startMonitoring = (pageCategory?: MonitoringCategory) => {
  coreWebVitalsMonitor.startMonitoring(pageCategory);
};

export const stopMonitoring = () => {
  coreWebVitalsMonitor.stopMonitoring();
};

export const getCurrentMetrics = () => {
  return coreWebVitalsMonitor.getCurrentMetrics();
};

export const onPerformanceAlert = (callback: (measurement: WebVitalMeasurement) => void) => {
  coreWebVitalsMonitor.onAlert(callback);
};

// React hook for Core Web Vitals monitoring
export const useWebVitalsMonitoring = (pageCategory?: MonitoringCategory) => {
  if (typeof window !== 'undefined') {
    // Start monitoring when component mounts
    window.addEventListener('load', () => {
      startMonitoring(pageCategory);
    });
    
    // Stop monitoring when page unloads
    window.addEventListener('beforeunload', () => {
      stopMonitoring();
    });
  }
  
  return {
    startMonitoring: () => startMonitoring(pageCategory),
    stopMonitoring,
    getCurrentMetrics,
    onAlert: onPerformanceAlert
  };
};