/**
 * Performance Monitoring React Hook
 * 
 * React hook for Core Web Vitals monitoring in LusoTown Portuguese
 * community platform. Provides easy integration with Portuguese
 * cultural context and mobile-first optimization.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  startMonitoring,
  stopMonitoring,
  getCurrentMetrics,
  onPerformanceAlert,
  WebVitalMeasurement
} from '@/services/core-web-vitals-monitor';
import {
  MonitoringCategory,
  DashboardMetrics,
  MONITORING_CONFIG,
  DASHBOARD_CONFIG
} from '@/config/core-web-vitals';
import { trackEvent, ANALYTICS_EVENTS } from '@/config/analytics';

export interface PerformanceMonitoringOptions {
  pageCategory?: MonitoringCategory;
  autoStart?: boolean;
  refreshInterval?: number;
  enableAlerts?: boolean;
  trackAnalytics?: boolean;
}

export interface PerformanceMonitoringState {
  isMonitoring: boolean;
  metrics: DashboardMetrics | null;
  alerts: WebVitalMeasurement[];
  lastUpdated: Date | null;
  error: string | null;
  isSupported: boolean;
}

export interface PerformanceMonitoringActions {
  start: () => void;
  stop: () => void;
  refresh: () => Promise<void>;
  clearAlerts: () => void;
  dismissAlert: (index: number) => void;
  exportMetrics: (format?: 'json' | 'csv') => void;
}

export type PerformanceMonitoringHook = [
  PerformanceMonitoringState,
  PerformanceMonitoringActions
];

/**
 * Main Performance Monitoring Hook
 * 
 * Provides comprehensive Core Web Vitals monitoring with Portuguese
 * cultural context and mobile-first optimization insights.
 */
export const usePerformanceMonitoring = (
  options: PerformanceMonitoringOptions = {}
): PerformanceMonitoringHook => {
  const {
    pageCategory,
    autoStart = true,
    refreshInterval = DASHBOARD_CONFIG.REFRESH_INTERVALS.OVERVIEW,
    enableAlerts = true,
    trackAnalytics = true
  } = options;

  // State management
  const [state, setState] = useState<PerformanceMonitoringState>({
    isMonitoring: false,
    metrics: null,
    alerts: [],
    lastUpdated: null,
    error: null,
    isSupported: checkPerformanceSupport()
  });

  // Refs for cleanup
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alertCallbackRef = useRef<((measurement: WebVitalMeasurement) => void) | null>(null);

  // Check if performance monitoring is supported
  function checkPerformanceSupport(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
      'performance' in window &&
      'PerformanceObserver' in window &&
      typeof PerformanceObserver.supportedEntryTypes !== 'undefined'
    );
  }

  // Refresh metrics
  const refresh = useCallback(async (): Promise<void> => {
    if (!state.isSupported) {
      setState(prev => ({
        ...prev,
        error: 'Performance monitoring not supported in this browser'
      }));
      return;
    }

    try {
      const metrics = getCurrentMetrics();
      
      setState(prev => ({
        ...prev,
        metrics,
        lastUpdated: new Date(),
        error: null
      }));

      // Track metrics refresh in analytics
      if (trackAnalytics) {
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'metrics_refreshed',
          lcp: metrics.webVitals.LCP,
          fid: metrics.webVitals.FID,
          cls: metrics.webVitals.CLS,
          page_category: pageCategory,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Failed to refresh performance metrics:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to refresh metrics'
      }));
    }
  }, [state.isSupported, pageCategory, trackAnalytics]);

  // Start monitoring
  const start = useCallback(() => {
    if (!state.isSupported) {
      setState(prev => ({
        ...prev,
        error: 'Performance monitoring not supported in this browser'
      }));
      return;
    }

    if (state.isMonitoring) {
      return; // Already monitoring
    }

    try {
      // Start Core Web Vitals monitoring
      startMonitoring(pageCategory);

      // Setup performance alert handler
      if (enableAlerts) {
        const alertCallback = (measurement: WebVitalMeasurement) => {
          setState(prev => ({
            ...prev,
            alerts: [measurement, ...prev.alerts.slice(0, 9)] // Keep last 10 alerts
          }));

          // Track alert in analytics
          if (trackAnalytics) {
            trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
              metric_type: 'performance_alert',
              metric: measurement.metric,
              value: measurement.value,
              score: measurement.score,
              page_category: measurement.pageCategory,
              device_type: measurement.deviceType
            });
          }
        };

        onPerformanceAlert(alertCallback);
        alertCallbackRef.current = alertCallback;
      }

      // Setup periodic metrics refresh
      if (refreshInterval > 0) {
        refreshIntervalRef.current = setInterval(refresh, refreshInterval);
      }

      // Initial metrics load
      refresh();

      setState(prev => ({
        ...prev,
        isMonitoring: true,
        error: null
      }));

      // Track monitoring start
      if (trackAnalytics) {
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'monitoring_started',
          page_category: pageCategory,
          auto_start: autoStart,
          refresh_interval: refreshInterval
        });
      }

      console.log(`🔍 Performance monitoring started for ${pageCategory || 'current page'}`);
    } catch (error) {
      console.error('Failed to start performance monitoring:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start monitoring'
      }));
    }
  }, [state.isSupported, state.isMonitoring, pageCategory, enableAlerts, refreshInterval, refresh, trackAnalytics, autoStart]);

  // Stop monitoring
  const stop = useCallback(() => {
    if (!state.isMonitoring) {
      return; // Not monitoring
    }

    try {
      // Stop Core Web Vitals monitoring
      stopMonitoring();

      // Clear refresh interval
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }

      setState(prev => ({
        ...prev,
        isMonitoring: false,
        error: null
      }));

      // Track monitoring stop
      if (trackAnalytics && state.metrics) {
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'monitoring_stopped',
          final_lcp: state.metrics.webVitals.LCP,
          final_fid: state.metrics.webVitals.FID,
          final_cls: state.metrics.webVitals.CLS,
          page_category: pageCategory,
          session_duration: state.lastUpdated ? Date.now() - state.lastUpdated.getTime() : 0
        });
      }

      console.log('🛑 Performance monitoring stopped');
    } catch (error) {
      console.error('Failed to stop performance monitoring:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to stop monitoring'
      }));
    }
  }, [state.isMonitoring, state.metrics, state.lastUpdated, pageCategory, trackAnalytics]);

  // Clear all alerts
  const clearAlerts = useCallback(() => {
    setState(prev => ({
      ...prev,
      alerts: []
    }));

    if (trackAnalytics) {
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'alerts_cleared',
        alerts_count: state.alerts.length
      });
    }
  }, [state.alerts.length, trackAnalytics]);

  // Dismiss specific alert
  const dismissAlert = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      alerts: prev.alerts.filter((_, i) => i !== index)
    }));

    if (trackAnalytics) {
      trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
        metric_type: 'alert_dismissed',
        alert_index: index
      });
    }
  }, [trackAnalytics]);

  // Export metrics
  const exportMetrics = useCallback((format: 'json' | 'csv' = 'json') => {
    if (!state.metrics) {
      console.warn('No metrics available to export');
      return;
    }

    try {
      let exportData: string;
      let filename: string;
      let mimeType: string;

      if (format === 'csv') {
        // Convert metrics to CSV
        const csvData = [
          'Metric,Value,Score,Timestamp',
          `LCP,${state.metrics.webVitals.LCP},${state.metrics.performanceScores.LCP},${state.metrics.timestamp}`,
          `FID,${state.metrics.webVitals.FID},${state.metrics.performanceScores.FID},${state.metrics.timestamp}`,
          `CLS,${state.metrics.webVitals.CLS},${state.metrics.performanceScores.CLS},${state.metrics.timestamp}`,
          `FCP,${state.metrics.webVitals.FCP},${state.metrics.performanceScores.FCP},${state.metrics.timestamp}`,
          `TTI,${state.metrics.webVitals.TTI},${state.metrics.performanceScores.TTI},${state.metrics.timestamp}`
        ].join('\n');

        exportData = csvData;
        filename = `lusotown-webvitals-${Date.now()}.csv`;
        mimeType = 'text/csv';
      } else {
        // Export as JSON
        exportData = JSON.stringify({
          exportedAt: new Date().toISOString(),
          pageCategory,
          metrics: state.metrics,
          alerts: state.alerts.map(alert => ({
            ...alert,
            timestamp: new Date(alert.timestamp).toISOString()
          }))
        }, null, 2);
        
        filename = `lusotown-webvitals-${Date.now()}.json`;
        mimeType = 'application/json';
      }

      // Create and trigger download
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Track export
      if (trackAnalytics) {
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'metrics_exported',
          format,
          filename,
          page_category: pageCategory
        });
      }

      console.log(`📊 Performance metrics exported as ${format.toUpperCase()}: ${filename}`);
    } catch (error) {
      console.error('Failed to export metrics:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to export metrics'
      }));
    }
  }, [state.metrics, state.alerts, pageCategory, trackAnalytics]);

  // Auto-start monitoring on component mount
  useEffect(() => {
    if (autoStart && state.isSupported) {
      start();
    }

    // Cleanup on unmount
    return () => {
      if (state.isMonitoring) {
        stop();
      }
    };
  }, [autoStart, state.isSupported]); // Only run on mount

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Return state and actions
  return [
    state,
    {
      start,
      stop,
      refresh,
      clearAlerts,
      dismissAlert,
      exportMetrics
    }
  ];
};

/**
 * Simplified Performance Monitoring Hook
 * 
 * Easy-to-use hook for basic performance monitoring without advanced features.
 */
export const useSimplePerformanceMonitoring = (pageCategory?: MonitoringCategory) => {
  const [state, actions] = usePerformanceMonitoring({
    pageCategory,
    autoStart: true,
    enableAlerts: false,
    trackAnalytics: false
  });

  return {
    isMonitoring: state.isMonitoring,
    metrics: state.metrics,
    isSupported: state.isSupported,
    error: state.error,
    refresh: actions.refresh
  };
};

/**
 * Performance Alerts Hook
 * 
 * Focused hook for monitoring performance alerts with Portuguese context.
 */
export const usePerformanceAlerts = (pageCategory?: MonitoringCategory) => {
  const [state, actions] = usePerformanceMonitoring({
    pageCategory,
    autoStart: true,
    enableAlerts: true,
    refreshInterval: MONITORING_CONFIG.COLLECTION_INTERVALS.REAL_TIME // 1 second
  });

  return {
    alerts: state.alerts,
    hasAlerts: state.alerts.length > 0,
    criticalAlerts: state.alerts.filter(alert => alert.score === 'poor'),
    clearAlerts: actions.clearAlerts,
    dismissAlert: actions.dismissAlert,
    isMonitoring: state.isMonitoring
  };
};

/**
 * Mobile Performance Hook
 * 
 * Specialized hook for monitoring mobile performance with Portuguese
 * community focus (375px breakpoint priority).
 */
export const useMobilePerformanceMonitoring = (pageCategory?: MonitoringCategory) => {
  const [state, actions] = usePerformanceMonitoring({
    pageCategory,
    autoStart: true,
    refreshInterval: DASHBOARD_CONFIG.REFRESH_INTERVALS.REAL_TIME
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 375;
  
  return {
    metrics: state.metrics,
    mobileMetrics: state.metrics?.mobileMetrics,
    isMobileDevice: isMobile,
    mobilePerformanceScore: state.metrics?.mobileMetrics?.mobilePerformanceScore || 0,
    touchResponsiveness: state.metrics?.mobileMetrics?.touchResponsiveness || 0,
    isMonitoring: state.isMonitoring && isMobile,
    refresh: actions.refresh,
    exportMetrics: actions.exportMetrics
  };
};

/**
 * Portuguese Content Performance Hook
 * 
 * Specialized hook for monitoring Portuguese cultural content performance.
 */
export const usePortugueseContentPerformance = (pageCategory?: MonitoringCategory) => {
  const [state, actions] = usePerformanceMonitoring({
    pageCategory,
    autoStart: true,
    trackAnalytics: true
  });

  return {
    metrics: state.metrics,
    portugueseMetrics: state.metrics?.portugueseContentMetrics,
    aiMetrics: state.metrics?.aiSystemMetrics,
    textRenderingTime: state.metrics?.portugueseContentMetrics?.textRenderingTime || 0,
    imageLoadingTime: state.metrics?.portugueseContentMetrics?.imageLoadingTime || 0,
    culturalElementsLoadTime: state.metrics?.portugueseContentMetrics?.culturalElementsLoadTime || 0,
    isMonitoring: state.isMonitoring,
    refresh: actions.refresh
  };
};

// Export types for external use
export type {
  PerformanceMonitoringOptions,
  PerformanceMonitoringState,
  PerformanceMonitoringActions,
  PerformanceMonitoringHook
};