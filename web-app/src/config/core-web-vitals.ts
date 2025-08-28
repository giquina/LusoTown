/**
 * Simple Performance Configuration for Portuguese Community Platform
 * Basic performance tracking focused on community needs
 */

// Simple performance thresholds
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

// Simple performance tracking for community platform
export const trackCommunityPerformance = (metric: string, value: number) => {
  if (PERFORMANCE_CONFIG.trackPageViews && typeof window !== 'undefined') {
    console.log(`Community Performance: ${metric} = ${value}`);
  }
};