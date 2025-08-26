/**
 * Core Web Vitals Monitoring Configuration
 * 
 * Comprehensive performance monitoring system specifically designed for
 * the LusoTown Portuguese-speaking community platform, tracking Core Web Vitals
 * with Portuguese cultural context and mobile-first optimization.
 */

import { ROUTES } from './routes';
import { PORTUGUESE_COLORS } from './brand';

// Core Web Vitals Thresholds (aligned with Google standards)
export const WEB_VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP) - measures loading performance
  LCP: {
    GOOD: 2500,     // <= 2.5s is good
    NEEDS_IMPROVEMENT: 4000, // 2.5s - 4s needs improvement
    POOR: 4001      // > 4s is poor
  },
  
  // First Input Delay (FID) - measures interactivity
  FID: {
    GOOD: 100,      // <= 100ms is good
    NEEDS_IMPROVEMENT: 300, // 100ms - 300ms needs improvement
    POOR: 301       // > 300ms is poor
  },
  
  // Cumulative Layout Shift (CLS) - measures visual stability
  CLS: {
    GOOD: 0.1,      // <= 0.1 is good
    NEEDS_IMPROVEMENT: 0.25, // 0.1 - 0.25 needs improvement
    POOR: 0.26      // > 0.25 is poor
  },
  
  // First Contentful Paint (FCP) - measures perceived loading
  FCP: {
    GOOD: 1800,     // <= 1.8s is good
    NEEDS_IMPROVEMENT: 3000, // 1.8s - 3s needs improvement
    POOR: 3001      // > 3s is poor
  },
  
  // Time to Interactive (TTI) - measures full interactivity
  TTI: {
    GOOD: 3800,     // <= 3.8s is good
    NEEDS_IMPROVEMENT: 7300, // 3.8s - 7.3s needs improvement
    POOR: 7301      // > 7.3s is poor
  }
} as const;

// Portuguese Community-Specific Monitoring Categories
export const PORTUGUESE_MONITORING_CATEGORIES = {
  // Cultural content pages
  CULTURAL_EVENTS: 'portuguese_cultural_events',
  BUSINESS_DIRECTORY: 'portuguese_business_directory',
  COMMUNITY_PROFILES: 'portuguese_community_profiles',
  CULTURAL_CELEBRATIONS: 'portuguese_celebrations',
  
  // AI System Performance
  AI_NOTIFICATIONS: 'ai_notification_system',
  AI_MATCHING: 'ai_matching_system', 
  LUSOBOT_ASSISTANT: 'lusobot_assistant',
  PREDICTIVE_ANALYTICS: 'predictive_analytics',
  
  // Language-specific content
  PORTUGUESE_TEXT_RENDERING: 'portuguese_text_rendering',
  BILINGUAL_SWITCHING: 'bilingual_language_switching',
  TRANSLATION_SERVICES: 'translation_services',
  
  // Mobile Portuguese Experience
  MOBILE_NAVIGATION: 'mobile_portuguese_navigation',
  MOBILE_EVENTS: 'mobile_events_discovery',
  MOBILE_BUSINESS_SEARCH: 'mobile_business_search',
  
  // Premium Features
  STREAMING_PLATFORM: 'portuguese_streaming',
  TRANSPORT_SERVICES: 'premium_transport',
  UNIVERSITY_SERVICES: 'university_partnerships'
} as const;

// Page Categories for Targeted Monitoring
export const PAGE_MONITORING_CONFIG = {
  // High-priority Portuguese community pages
  [ROUTES.HOME]: {
    category: 'homepage',
    priority: 'high',
    portuguese_content: true,
    mobile_priority: true,
    expected_lcp_elements: ['.hero-section', '.community-stats', '.featured-events']
  },
  
  [ROUTES.EVENTS.ROOT]: {
    category: PORTUGUESE_MONITORING_CATEGORIES.CULTURAL_EVENTS,
    priority: 'high', 
    portuguese_content: true,
    mobile_priority: true,
    expected_lcp_elements: ['.events-hero', '.event-cards', '.cultural-calendar']
  },
  
  [ROUTES.BUSINESS_DIRECTORY.ROOT]: {
    category: PORTUGUESE_MONITORING_CATEGORIES.BUSINESS_DIRECTORY,
    priority: 'high',
    portuguese_content: true,
    mobile_priority: true,
    expected_lcp_elements: ['.business-map', '.business-grid', '.portuguese-categories']
  },
  
  [ROUTES.MATCHES.ROOT]: {
    category: PORTUGUESE_MONITORING_CATEGORIES.AI_MATCHING,
    priority: 'medium',
    portuguese_content: true,
    mobile_priority: true,
    expected_lcp_elements: ['.match-cards', '.compatibility-meter', '.cultural-preferences']
  },
  
  [ROUTES.STREAMING.ROOT]: {
    category: PORTUGUESE_MONITORING_CATEGORIES.STREAMING_PLATFORM,
    priority: 'medium',
    portuguese_content: true,
    mobile_priority: false, // Desktop-focused initially
    expected_lcp_elements: ['.video-player', '.stream-thumbnail', '.portuguese-content-grid']
  }
} as const;

// Mobile Breakpoints for Portuguese Community Focus
export const MOBILE_MONITORING_BREAKPOINTS = {
  MOBILE: {
    width: 375,
    name: 'mobile',
    priority: 'high', // Portuguese community is mobile-heavy
    description: 'Primary Portuguese community mobile experience'
  },
  TABLET: {
    width: 768, 
    name: 'tablet',
    priority: 'medium',
    description: 'Portuguese community tablet experience'
  },
  DESKTOP: {
    width: 1024,
    name: 'desktop', 
    priority: 'medium',
    description: 'Portuguese community desktop experience'
  }
} as const;

// Portuguese Cultural Content Performance Budgets
export const PERFORMANCE_BUDGETS = {
  // JavaScript Bundle Sizes (KB)
  JS_BUDGET: {
    CRITICAL: 150,    // Critical JS for Portuguese page load
    AI_SYSTEMS: 250,  // AI components (LusoBot, matching, analytics)
    CULTURAL_FEATURES: 200, // Portuguese cultural features
    TOTAL_MOBILE: 600 // Total JS budget for mobile
  },
  
  // CSS Bundle Sizes (KB)
  CSS_BUDGET: {
    CRITICAL: 50,     // Critical CSS including Portuguese fonts
    CULTURAL_STYLES: 75, // Portuguese cultural theming
    RESPONSIVE: 25,   // Mobile responsive styles
    TOTAL: 150
  },
  
  // Image Sizes (KB) 
  IMAGE_BUDGET: {
    HERO_IMAGES: 200,       // Portuguese cultural hero images
    PROFILE_PHOTOS: 50,     // User profile images
    BUSINESS_PHOTOS: 100,   // Business directory images
    EVENT_THUMBNAILS: 75,   // Cultural event thumbnails
    CULTURAL_ICONS: 25      // Portuguese cultural icons/symbols
  },
  
  // Third-party Scripts (KB)
  THIRD_PARTY_BUDGET: {
    ANALYTICS: 50,          // GA4, performance monitoring
    MAPS: 150,             // Business directory mapping
    PAYMENTS: 100,         // Stripe for subscriptions
    SOCIAL: 75,            // Social sharing widgets
    TOTAL: 375
  }
} as const;

// AI System Performance Thresholds
export const AI_PERFORMANCE_THRESHOLDS = {
  LUSOBOT_RESPONSE_TIME: 2000,      // 2s max for Portuguese AI responses
  MATCHING_ALGORITHM: 3000,         // 3s max for cultural compatibility
  NOTIFICATION_PROCESSING: 1500,    // 1.5s for AI notifications
  ANALYTICS_PROCESSING: 5000        // 5s for predictive analytics
} as const;

// Real-time Monitoring Configuration
export const MONITORING_CONFIG = {
  // Data collection intervals
  COLLECTION_INTERVALS: {
    REAL_TIME: 1000,        // 1s for real-time metrics
    REGULAR: 30000,         // 30s for regular collection
    DETAILED: 300000,       // 5min for detailed analysis
    DAILY_SUMMARY: 86400000 // 24h for daily reports
  },
  
  // Alert thresholds
  ALERT_THRESHOLDS: {
    CRITICAL: {
      lcp_degradation: 50,    // 50% worse than baseline
      fid_degradation: 100,   // 100% worse than baseline
      cls_degradation: 200,   // 200% worse than baseline
      error_rate: 5          // 5% error rate
    },
    WARNING: {
      lcp_degradation: 25,    // 25% worse than baseline
      fid_degradation: 50,    // 50% worse than baseline  
      cls_degradation: 100,   // 100% worse than baseline
      error_rate: 2          // 2% error rate
    }
  },
  
  // Data retention
  DATA_RETENTION: {
    RAW_METRICS: 7,         // 7 days of raw data
    AGGREGATED: 90,         // 90 days of hourly aggregates
    SUMMARIES: 365          // 1 year of daily summaries
  }
} as const;

// Portuguese Cultural Content Optimization Recommendations
export const OPTIMIZATION_RECOMMENDATIONS = {
  PORTUGUESE_TEXT: {
    title: 'Portuguese Text Optimization',
    description: 'Portuguese text is typically 20-30% longer than English',
    recommendations: [
      'Use efficient font loading for Portuguese characters',
      'Optimize line height for Portuguese accented characters',
      'Consider text truncation for mobile Portuguese content',
      'Implement progressive text loading for long Portuguese descriptions'
    ]
  },
  
  CULTURAL_IMAGES: {
    title: 'Portuguese Cultural Images',
    description: 'Optimize images featuring Portuguese cultural elements',
    recommendations: [
      'Use WebP format for azulejo pattern backgrounds',
      'Implement lazy loading for Portuguese heritage photo galleries',
      'Optimize Portuguese flag and cultural symbol SVGs',
      'Use CDN for Portuguese business profile images'
    ]
  },
  
  MOBILE_PORTUGUESE_UX: {
    title: 'Mobile Portuguese Experience',
    description: '75% of Portuguese community accesses via mobile',
    recommendations: [
      'Prioritize mobile-first Portuguese text sizing',
      'Optimize touch targets for Portuguese UI elements',
      'Implement smooth scrolling for Portuguese event listings',
      'Use progressive enhancement for Portuguese cultural features'
    ]
  },
  
  AI_SYSTEM_OPTIMIZATION: {
    title: 'AI Systems Performance',
    description: 'Optimize 4 production AI systems for Portuguese users',
    recommendations: [
      'Implement lazy loading for non-critical AI components',
      'Use service workers for AI response caching',
      'Optimize Portuguese language processing models',
      'Implement graceful degradation for AI features'
    ]
  }
} as const;

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  REFRESH_INTERVALS: {
    REAL_TIME: 5000,        // 5s refresh for real-time view
    OVERVIEW: 30000,        // 30s refresh for overview
    DETAILED: 60000         // 1min refresh for detailed views
  },
  
  CHART_COLORS: {
    EXCELLENT: PORTUGUESE_COLORS.success,
    GOOD: PORTUGUESE_COLORS.primary,
    NEEDS_IMPROVEMENT: PORTUGUESE_COLORS.warning,
    POOR: PORTUGUESE_COLORS.error,
    NEUTRAL: PORTUGUESE_COLORS.gray[400]
  },
  
  EXPORT_FORMATS: ['CSV', 'JSON', 'PDF'],
  
  NOTIFICATION_CHANNELS: ['email', 'slack', 'dashboard', 'sms']
} as const;

// Utility Functions
export const getPerformanceScore = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = WEB_VITALS_THRESHOLDS[metric as keyof typeof WEB_VITALS_THRESHOLDS];
  if (!thresholds) return 'poor';
  
  if (value <= thresholds.GOOD) return 'good';
  if (value <= thresholds.NEEDS_IMPROVEMENT) return 'needs-improvement';
  return 'poor';
};

export const getPortugueseContentWeight = (pageType: string): number => {
  // Portuguese text is typically 20-30% heavier than English
  const baseWeight = 1.0;
  const portugueseTextMultiplier = 1.25;
  
  switch (pageType) {
    case 'cultural_events':
      return baseWeight * portugueseTextMultiplier * 1.1; // Extra for event descriptions
    case 'business_directory':
      return baseWeight * portugueseTextMultiplier * 1.05; // Moderate for business info
    case 'community_profiles':
      return baseWeight * portugueseTextMultiplier * 1.15; // High for personal stories
    default:
      return baseWeight * portugueseTextMultiplier;
  }
};

export const calculateMobilePerformancePriority = (pageCategory: string): number => {
  // Higher score = higher priority for mobile optimization
  const mobileUsageByCategory = {
    [PORTUGUESE_MONITORING_CATEGORIES.CULTURAL_EVENTS]: 0.8,      // 80% mobile usage
    [PORTUGUESE_MONITORING_CATEGORIES.BUSINESS_DIRECTORY]: 0.75,   // 75% mobile usage  
    [PORTUGUESE_MONITORING_CATEGORIES.COMMUNITY_PROFILES]: 0.85,   // 85% mobile usage
    [PORTUGUESE_MONITORING_CATEGORIES.AI_MATCHING]: 0.7,          // 70% mobile usage
    [PORTUGUESE_MONITORING_CATEGORIES.STREAMING_PLATFORM]: 0.4     // 40% mobile usage
  };
  
  return mobileUsageByCategory[pageCategory] || 0.6; // Default 60% mobile usage
};

// Type definitions
export type WebVitalMetric = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTI';
export type PerformanceScore = 'good' | 'needs-improvement' | 'poor';
export type MonitoringCategory = keyof typeof PORTUGUESE_MONITORING_CATEGORIES;
export type MobileBreakpoint = keyof typeof MOBILE_MONITORING_BREAKPOINTS;
export type AlertLevel = 'critical' | 'warning' | 'info';

export interface WebVitalMeasurement {
  metric: WebVitalMetric;
  value: number;
  score: PerformanceScore;
  timestamp: number;
  pageCategory: MonitoringCategory;
  deviceType: MobileBreakpoint;
  userLanguage: 'en' | 'pt';
  culturalContent: boolean;
}

export interface PerformanceBudgetStatus {
  category: string;
  currentSize: number;
  budgetLimit: number;
  utilizationPercentage: number;
  status: PerformanceScore;
  recommendations: string[];
}

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
  budgetStatus: PerformanceBudgetStatus[];
}