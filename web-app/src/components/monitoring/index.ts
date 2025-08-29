/**
 * Monitoring Components Index
 * 
 * Comprehensive monitoring system for Portuguese community platform
 * with real-time dashboards and cultural authenticity tracking.
 */

export { default as MonitoringDashboard } from './MonitoringDashboard';
export { default as PerformanceMonitoringDashboard } from './PerformanceMonitoringDashboard';
export { default as CommunityAnalyticsDashboard } from './CommunityAnalyticsDashboard';
export { default as SecurityMonitoringDashboard } from './SecurityMonitoringDashboard';
export { default as MobilePerformanceDashboard } from './MobilePerformanceDashboard';

// Re-export for backwards compatibility and convenience
export {
  MonitoringDashboard as MainDashboard,
  PerformanceMonitoringDashboard as PerformanceDashboard,
  CommunityAnalyticsDashboard as CommunityDashboard,
  SecurityMonitoringDashboard as SecurityDashboard,
  MobilePerformanceDashboard as MobileDashboard
};