/**
 * Core Web Vitals Configuration for Portuguese Community Platform
 * Comprehensive performance monitoring system
 */
// Core Web Vitals metric types
export type WebVitalMetric = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTI';
export type PerformanceScore = 'good' | 'needs-improvement' | 'poor';
export type MonitoringCategory = 'CULTURAL_EVENTS' | 'BUSINESS_DIRECTORY' | 'AI_MATCHING' | 'STREAMING_PLATFORM' | 'COMMUNITY_PROFILES';
// Web Vitals thresholds
export const WEB_VITALS_THRESHOLDS = {
  LCP: { GOOD: 2500, NEEDS_IMPROVEMENT: 4000 },
  FID: { GOOD: 100, NEEDS_IMPROVEMENT: 300 },
  CLS: { GOOD: 0.1, NEEDS_IMPROVEMENT: 0.25 },
  FCP: { GOOD: 1800, NEEDS_IMPROVEMENT: 3000 },
  TTI: { GOOD: 3800, NEEDS_IMPROVEMENT: 7300 }
} as const;
// Portuguese monitoring categories
export const PORTUGUESE_MONITORING_CATEGORIES = {
  CULTURAL_EVENTS: 'portuguese-cultural-events',
  BUSINESS_DIRECTORY: 'portuguese-business-directory',
  AI_MATCHING: 'portuguese-cultural-matching',
  STREAMING_PLATFORM: 'portuguese-streaming-content',
  COMMUNITY_PROFILES: 'portuguese-community-profiles'
} as const;
// Mobile monitoring breakpoints
export const MOBILE_MONITORING_BREAKPOINTS = {
  MOBILE: { width: 768, priority: 'high' },
  TABLET: { width: 1024, priority: 'medium' },
  DESKTOP: { width: 1920, priority: 'normal' }
} as const;
// AI performance thresholds
export const AI_PERFORMANCE_THRESHOLDS = {
  LUSOBOT_RESPONSE_TIME: 2000,
  MATCHING_ALGORITHM: 3000,
  NOTIFICATION_PROCESSING: 1000,
  ANALYTICS_PROCESSING: 5000
} as const;
// Monitoring configuration
export const MONITORING_CONFIG = {
  COLLECTION_INTERVALS: {
    REGULAR: 30000, // 30 seconds
    INTENSIVE: 10000, // 10 seconds
    CRITICAL: 5000 // 5 seconds
  },
  ALERT_THRESHOLDS: {
    CRITICAL_PERFORMANCE_DEGRADATION: 0.3,
    WARNING_PERFORMANCE_DEGRADATION: 0.6
  }
} as const;
// Web Vital Measurement interface
export interface WebVitalMeasurement {
  metric: WebVitalMetric;
  value: number;
  score: PerformanceScore;
  timestamp: number;
  pageCategory: MonitoringCategory;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userLanguage: 'en' | 'pt';
  culturalContent: boolean;
}
// Dashboard metrics interface
export interface DashboardMetrics {
  timestamp: number;
  webVitals: Record<WebVitalMetric, number>;
  performanceScores: Record<WebVitalMetric, PerformanceScore>;
  portugueseContentMetrics: {
    textRenderingTime: number;
    imageLoadingTime: number;
    culturalElementsLoadTime: number;
  };
  aiSystemMetrics: {
    lusoBotResponseTime: number;
    matchingAlgorithmTime: number;
    notificationProcessingTime: number;
    analyticsProcessingTime: number;
  };
  mobileMetrics: {
    mobileTraffic: number;
    mobilePerformanceScore: number;
    touchResponsiveness: number;
  };
  budgetStatus: any[];
}
// Performance scoring function
export const getPerformanceScore = (metric: WebVitalMetric, value: number): PerformanceScore => {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  if (value <= thresholds.GOOD) return 'good';
  if (value <= thresholds.NEEDS_IMPROVEMENT) return 'needs-improvement';
  return 'poor';
};
// Portuguese content weight calculation
export const getPortugueseContentWeight = (category: MonitoringCategory): number => {
  const weights = {
    CULTURAL_EVENTS: 0.8,
    BUSINESS_DIRECTORY: 0.6,
    AI_MATCHING: 0.7,
    STREAMING_PLATFORM: 0.9,
    COMMUNITY_PROFILES: 0.5
  };
  return weights[category] || 0.5;
};
// Mobile performance priority calculation
export const calculateMobilePerformancePriority = (category: MonitoringCategory): number => {
  const priorities = {
    CULTURAL_EVENTS: 0.9,
    BUSINESS_DIRECTORY: 0.8,
    AI_MATCHING: 0.7,
    STREAMING_PLATFORM: 0.6,
    COMMUNITY_PROFILES: 0.8
  };
  return priorities[category] || 0.5;
};
// Simple performance tracking for community platform (legacy compatibility)
export const trackCommunityPerformance = (metric: string, value: number) => {
  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    }
};
// Legacy performance config (for backward compatibility)
export const PERFORMANCE_CONFIG = {
  trackPageViews: process.env.NODE_ENV === 'production',
  trackCommunityEngagement: true,
  basicErrorReporting: true,
  // Core Web Vitals (simplified)
  thresholds: {
    LCP_GOOD: 2500,
    FID_GOOD: 100,
    CLS_GOOD: 0.1
  }
};