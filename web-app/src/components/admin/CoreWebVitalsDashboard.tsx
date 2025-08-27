/**
 * Core Web Vitals Dashboard Component
 * 
 * Real-time performance monitoring dashboard for the LusoTown Portuguese
 * community platform. Displays Core Web Vitals metrics with Portuguese
 * cultural context and mobile-first optimization insights.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import logger from '@/utils/logger';
import {
  WEB_VITALS_THRESHOLDS,
  DASHBOARD_CONFIG,
  OPTIMIZATION_RECOMMENDATIONS,
  WebVitalMetric,
  DashboardMetrics,
  PerformanceScore
} from '@/config/core-web-vitals';
import { getCurrentMetrics, onPerformanceAlert, WebVitalMeasurement } from '@/services/core-web-vitals-monitor';
import { useLanguage } from '@/context/LanguageContext';
import { PORTUGUESE_COLORS } from '@/config/brand';
import { trackEvent, ANALYTICS_EVENTS } from '@/config/analytics';

// Performance Score Badge Component
const PerformanceScoreBadge: React.FC<{
  score: PerformanceScore;
  value: number;
  metric: WebVitalMetric;
}> = ({ score, value, metric }) => {
  const getScoreColor = (score: PerformanceScore) => {
    switch (score) {
      case 'good': return DASHBOARD_CONFIG.CHART_COLORS.EXCELLENT;
      case 'needs-improvement': return DASHBOARD_CONFIG.CHART_COLORS.NEEDS_IMPROVEMENT;
      case 'poor': return DASHBOARD_CONFIG.CHART_COLORS.POOR;
      default: return DASHBOARD_CONFIG.CHART_COLORS.NEUTRAL;
    }
  };

  const getScoreIcon = (score: PerformanceScore) => {
    switch (score) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '🚨';
      default: return '❓';
    }
  };

  const formatValue = (metric: WebVitalMetric, value: number) => {
    switch (metric) {
      case 'LCP':
      case 'FCP':
      case 'TTI':
      case 'FID':
        return `${value.toFixed(0)}ms`;
      case 'CLS':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  return (
    <div 
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{ 
        backgroundColor: `${getScoreColor(score)}15`,
        color: getScoreColor(score),
        border: `1px solid ${getScoreColor(score)}30`
      }}
    >
      <span className="mr-2">{getScoreIcon(score)}</span>
      <span>{formatValue(metric, value)}</span>
    </div>
  );
};

// Web Vitals Card Component
const WebVitalCard: React.FC<{
  metric: WebVitalMetric;
  value: number;
  score: PerformanceScore;
  title: string;
  description: string;
  threshold: number;
}> = ({ metric, value, score, title, description, threshold }) => {
  const { t } = useLanguage();

  const getMetricIcon = (metric: WebVitalMetric) => {
    switch (metric) {
      case 'LCP': return '🖼️';
      case 'FID': return '👆';
      case 'CLS': return '📐';
      case 'FCP': return '🎨';
      case 'TTI': return '⚡';
      default: return '📊';
    }
  };

  const getImprovementTip = (metric: WebVitalMetric) => {
    switch (metric) {
      case 'LCP':
        return t('webVitals.tips.lcp', 'Optimize Portuguese cultural images and critical resources');
      case 'FID':
        return t('webVitals.tips.fid', 'Reduce JavaScript execution time for Portuguese UI');
      case 'CLS':
        return t('webVitals.tips.cls', 'Set dimensions for Portuguese cultural images');
      case 'FCP':
        return t('webVitals.tips.fcp', 'Optimize Portuguese font loading and text rendering');
      case 'TTI':
        return t('webVitals.tips.tti', 'Reduce main thread work and optimize AI systems');
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getMetricIcon(metric)}</span>
          <div>
            <h3 className="font-semibold text-primary-900 text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <PerformanceScoreBadge score={score} value={value} metric={metric} />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {t('webVitals.threshold', 'Threshold')}: {metric === 'CLS' ? threshold.toFixed(3) : `${threshold}ms`}
          </span>
          <span className="text-sm font-medium">
            {((threshold - value) / threshold * 100).toFixed(1)}% {t('webVitals.belowThreshold', 'below threshold')}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, Math.max(0, (1 - value / (threshold * 2)) * 100))}%`,
              backgroundColor: DASHBOARD_CONFIG.CHART_COLORS[score.toUpperCase().replace('-', '_') as keyof typeof DASHBOARD_CONFIG.CHART_COLORS]
            }}
          />
        </div>
      </div>

      {/* Improvement Tip */}
      {score !== 'good' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>{t('webVitals.tip', 'Tip')}:</strong> {getImprovementTip(metric)}
          </p>
        </div>
      )}
    </div>
  );
};

// Portuguese Content Metrics Component
const PortugueseContentMetrics: React.FC<{
  metrics: DashboardMetrics['portugueseContentMetrics'];
}> = ({ metrics }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
      <h3 className="font-semibold text-primary-900 text-lg mb-4 flex items-center">
        🇵🇹 {t('webVitals.portugueseContent.title', 'Portuguese Content Performance')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {metrics.textRenderingTime.toFixed(0)}ms
          </div>
          <div className="text-sm text-primary-700">
            {t('webVitals.portugueseContent.textRendering', 'Text Rendering')}
          </div>
          <div className="text-xs text-primary-600 mt-1">
            {t('webVitals.portugueseContent.textNote', '+25% longer than English')}
          </div>
        </div>

        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {(metrics.imageLoadingTime / 1000).toFixed(1)}s
          </div>
          <div className="text-sm text-primary-700">
            {t('webVitals.portugueseContent.imageLoading', 'Cultural Images')}
          </div>
          <div className="text-xs text-primary-600 mt-1">
            {t('webVitals.portugueseContent.imageNote', 'Azulejo & heritage photos')}
          </div>
        </div>

        <div className="text-center p-4 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {metrics.culturalElementsLoadTime.toFixed(0)}ms
          </div>
          <div className="text-sm text-primary-700">
            {t('webVitals.portugueseContent.culturalElements', 'Cultural Elements')}
          </div>
          <div className="text-xs text-primary-600 mt-1">
            {t('webVitals.portugueseContent.elementsNote', 'Icons & symbols')}
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Systems Performance Component
const AISystemsMetrics: React.FC<{
  metrics: DashboardMetrics['aiSystemMetrics'];
}> = ({ metrics }) => {
  const { t } = useLanguage();

  const aiSystems = [
    {
      name: 'LusoBot',
      value: metrics.lusoBotResponseTime,
      threshold: 2000,
      icon: '🤖'
    },
    {
      name: 'Matching',
      value: metrics.matchingAlgorithmTime,
      threshold: 3000,
      icon: '💕'
    },
    {
      name: 'Notifications',
      value: metrics.notificationProcessingTime,
      threshold: 1500,
      icon: '🔔'
    },
    {
      name: 'Analytics',
      value: metrics.analyticsProcessingTime,
      threshold: 5000,
      icon: '📊'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
      <h3 className="font-semibold text-primary-900 text-lg mb-4 flex items-center">
        🤖 {t('webVitals.aiSystems.title', 'AI Systems Performance')}
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {aiSystems.map((system) => {
          const performance = system.value <= system.threshold ? 'good' : 
                           system.value <= system.threshold * 1.5 ? 'needs-improvement' : 'poor';
          
          return (
            <div key={system.name} className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">{system.icon}</div>
              <div className="text-sm font-medium text-gray-900 mb-1">{system.name}</div>
              <div 
                className="text-lg font-bold mb-1"
                style={{ 
                  color: performance === 'good' ? DASHBOARD_CONFIG.CHART_COLORS.EXCELLENT :
                         performance === 'needs-improvement' ? DASHBOARD_CONFIG.CHART_COLORS.NEEDS_IMPROVEMENT :
                         DASHBOARD_CONFIG.CHART_COLORS.POOR
                }}
              >
                {system.value.toFixed(0)}ms
              </div>
              <div className="text-xs text-gray-600">
                {t('webVitals.threshold', 'Threshold')}: {system.threshold}ms
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Mobile Performance Component
const MobilePerformanceMetrics: React.FC<{
  metrics: DashboardMetrics['mobileMetrics'];
}> = ({ metrics }) => {
  const { t } = useLanguage();

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return DASHBOARD_CONFIG.CHART_COLORS.EXCELLENT;
    if (score >= 0.6) return DASHBOARD_CONFIG.CHART_COLORS.GOOD;
    if (score >= 0.4) return DASHBOARD_CONFIG.CHART_COLORS.NEEDS_IMPROVEMENT;
    return DASHBOARD_CONFIG.CHART_COLORS.POOR;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
      <h3 className="font-semibold text-primary-900 text-lg mb-4 flex items-center">
        📱 {t('webVitals.mobile.title', 'Mobile Portuguese Experience')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mobile Traffic */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
               style={{ 
                 backgroundColor: `${DASHBOARD_CONFIG.CHART_COLORS.PRIMARY}20`,
                 color: DASHBOARD_CONFIG.CHART_COLORS.PRIMARY
               }}>
            {(metrics.mobileTraffic * 100).toFixed(0)}%
          </div>
          <div className="text-sm font-medium text-gray-900">
            {t('webVitals.mobile.traffic', 'Mobile Traffic')}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {t('webVitals.mobile.trafficNote', 'Portuguese community usage')}
          </div>
        </div>

        {/* Performance Score */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
               style={{ 
                 backgroundColor: `${getScoreColor(metrics.mobilePerformanceScore)}20`,
                 color: getScoreColor(metrics.mobilePerformanceScore)
               }}>
            {(metrics.mobilePerformanceScore * 100).toFixed(0)}
          </div>
          <div className="text-sm font-medium text-gray-900">
            {t('webVitals.mobile.performance', 'Performance Score')}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {t('webVitals.mobile.performanceNote', 'Overall mobile metrics')}
          </div>
        </div>

        {/* Touch Responsiveness */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
               style={{ 
                 backgroundColor: `${getScoreColor(metrics.touchResponsiveness)}20`,
                 color: getScoreColor(metrics.touchResponsiveness)
               }}>
            {(metrics.touchResponsiveness * 100).toFixed(0)}
          </div>
          <div className="text-sm font-medium text-gray-900">
            {t('webVitals.mobile.touch', 'Touch Response')}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {t('webVitals.mobile.touchNote', 'Portuguese UI interactions')}
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Alerts Component
const PerformanceAlerts: React.FC<{
  alerts: WebVitalMeasurement[];
  onDismiss: (index: number) => void;
}> = ({ alerts, onDismiss }) => {
  const { t } = useLanguage();

  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="text-green-600 text-lg">✅</div>
        <div className="text-sm text-green-800 mt-1">
          {t('webVitals.alerts.noAlerts', 'No performance alerts - all systems running well!')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="text-red-500 text-xl mr-3">🚨</div>
              <div>
                <div className="font-medium text-red-900">
                  {t('webVitals.alerts.poorPerformance', 'Poor Performance Detected')}
                </div>
                <div className="text-sm text-red-700 mt-1">
                  {alert.metric} exceeded threshold on {alert.pageCategory} 
                  ({alert.deviceType} device, {alert.userLanguage} language)
                </div>
                <div className="text-xs text-red-600 mt-2">
                  {t('webVitals.alerts.value', 'Value')}: {alert.value.toFixed(0)}
                  {alert.metric === 'CLS' ? '' : 'ms'} | 
                  {t('webVitals.alerts.timestamp', 'Time')}: {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDismiss(index)}
              className="text-red-400 hover:text-red-600 ml-4"
              aria-label={t('webVitals.alerts.dismiss', 'Dismiss alert')}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Optimization Recommendations Component
const OptimizationRecommendations: React.FC = () => {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const recommendations = Object.entries(OPTIMIZATION_RECOMMENDATIONS);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary-200 p-6">
      <h3 className="font-semibold text-primary-900 text-lg mb-4 flex items-center">
        💡 {t('webVitals.recommendations.title', 'Optimization Recommendations')}
      </h3>

      <div className="space-y-4">
        {recommendations.map(([key, rec]) => (
          <div key={key} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedSection(expandedSection === key ? null : key)}
            >
              <div>
                <div className="font-medium text-gray-900">{rec.title}</div>
                <div className="text-sm text-gray-600 mt-1">{rec.description}</div>
              </div>
              <div className="text-gray-400">
                {expandedSection === key ? '−' : '+'}
              </div>
            </button>
            
            {expandedSection === key && (
              <div className="px-4 pb-4">
                <ul className="space-y-2">
                  {rec.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const CoreWebVitalsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [alerts, setAlerts] = useState<WebVitalMeasurement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Refresh metrics
  const refreshMetrics = useCallback(async () => {
    try {
      const currentMetrics = getCurrentMetrics();
      setMetrics(currentMetrics);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to fetch Core Web Vitals metrics', error, {
        area: 'performance',
        action: 'fetch_web_vitals',
        culturalContext: 'portuguese'
      });
      setIsLoading(false);
    }
  }, []);

  // Handle performance alerts
  const handlePerformanceAlert = useCallback((measurement: WebVitalMeasurement) => {
    setAlerts(prevAlerts => [measurement, ...prevAlerts.slice(0, 9)]); // Keep last 10 alerts
  }, []);

  // Dismiss alert
  const dismissAlert = (index: number) => {
    setAlerts(prevAlerts => prevAlerts.filter((_, i) => i !== index));
  };

  // Setup real-time monitoring
  useEffect(() => {
    // Initial load
    refreshMetrics();

    // Setup performance alert handler
    onPerformanceAlert(handlePerformanceAlert);

    // Setup periodic refresh
    const refreshInterval = setInterval(refreshMetrics, DASHBOARD_CONFIG.REFRESH_INTERVALS.OVERVIEW);

    // Track dashboard access
    trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
      metric_type: 'dashboard_access',
      timestamp: Date.now()
    });

    // Cleanup
    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshMetrics, handlePerformanceAlert]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <div className="text-red-600 text-lg mb-4">
          {t('webVitals.error.title', 'Unable to load Web Vitals data')}
        </div>
        <button
          onClick={refreshMetrics}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {t('webVitals.error.retry', 'Retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">
            {t('webVitals.title', 'Core Web Vitals Dashboard')}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('webVitals.subtitle', 'Portuguese community platform performance monitoring')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {t('webVitals.lastUpdated', 'Last updated')}
          </div>
          <div className="text-sm font-medium text-primary-700">
            {lastUpdated.toLocaleTimeString()}
          </div>
          <button
            onClick={refreshMetrics}
            className="mt-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm"
          >
            🔄 {t('webVitals.refresh', 'Refresh')}
          </button>
        </div>
      </div>

      {/* Performance Alerts */}
      {alerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-red-900 mb-4">
            {t('webVitals.alerts.title', 'Performance Alerts')}
          </h2>
          <PerformanceAlerts alerts={alerts} onDismiss={dismissAlert} />
        </div>
      )}

      {/* Core Web Vitals Cards */}
      <div>
        <h2 className="text-xl font-semibold text-primary-900 mb-4">
          {t('webVitals.coreMetrics.title', 'Core Web Vitals')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WebVitalCard
            metric="LCP"
            value={metrics.webVitals.LCP}
            score={metrics.performanceScores.LCP}
            title={t('webVitals.lcp.title', 'Largest Contentful Paint')}
            description={t('webVitals.lcp.description', 'Loading performance')}
            threshold={WEB_VITALS_THRESHOLDS.LCP.GOOD}
          />
          <WebVitalCard
            metric="FID"
            value={metrics.webVitals.FID}
            score={metrics.performanceScores.FID}
            title={t('webVitals.fid.title', 'First Input Delay')}
            description={t('webVitals.fid.description', 'Interactivity')}
            threshold={WEB_VITALS_THRESHOLDS.FID.GOOD}
          />
          <WebVitalCard
            metric="CLS"
            value={metrics.webVitals.CLS}
            score={metrics.performanceScores.CLS}
            title={t('webVitals.cls.title', 'Cumulative Layout Shift')}
            description={t('webVitals.cls.description', 'Visual stability')}
            threshold={WEB_VITALS_THRESHOLDS.CLS.GOOD}
          />
          <WebVitalCard
            metric="FCP"
            value={metrics.webVitals.FCP}
            score={metrics.performanceScores.FCP}
            title={t('webVitals.fcp.title', 'First Contentful Paint')}
            description={t('webVitals.fcp.description', 'Perceived loading')}
            threshold={WEB_VITALS_THRESHOLDS.FCP.GOOD}
          />
          <WebVitalCard
            metric="TTI"
            value={metrics.webVitals.TTI}
            score={metrics.performanceScores.TTI}
            title={t('webVitals.tti.title', 'Time to Interactive')}
            description={t('webVitals.tti.description', 'Full interactivity')}
            threshold={WEB_VITALS_THRESHOLDS.TTI.GOOD}
          />
        </div>
      </div>

      {/* Portuguese Content Metrics */}
      <PortugueseContentMetrics metrics={metrics.portugueseContentMetrics} />

      {/* AI Systems Performance */}
      <AISystemsMetrics metrics={metrics.aiSystemMetrics} />

      {/* Mobile Performance */}
      <MobilePerformanceMetrics metrics={metrics.mobileMetrics} />

      {/* Optimization Recommendations */}
      <OptimizationRecommendations />
    </div>
  );
};

export default CoreWebVitalsDashboard;