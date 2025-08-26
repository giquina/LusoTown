/**
 * Performance Widget Component
 * 
 * Compact real-time performance monitoring widget for the LusoTown
 * Portuguese community platform. Shows key Core Web Vitals metrics
 * with Portuguese cultural context in a compact dashboard widget.
 */

'use client';

import React, { useState } from 'react';
import { useSimplePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { WEB_VITALS_THRESHOLDS, DASHBOARD_CONFIG } from '@/config/core-web-vitals';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/config/routes';

interface PerformanceWidgetProps {
  pageCategory?: string;
  compact?: boolean;
  showDetails?: boolean;
  className?: string;
}

// Metric Score Component
const MetricScore: React.FC<{
  metric: 'LCP' | 'FID' | 'CLS';
  value: number;
  compact?: boolean;
}> = ({ metric, value, compact = false }) => {
  const getScoreData = (metric: string, value: number) => {
    const thresholds = WEB_VITALS_THRESHOLDS[metric as keyof typeof WEB_VITALS_THRESHOLDS];
    if (!thresholds) return { score: 'poor', color: DASHBOARD_CONFIG.CHART_COLORS.POOR };

    if (value <= thresholds.GOOD) {
      return { score: 'good', color: DASHBOARD_CONFIG.CHART_COLORS.EXCELLENT };
    } else if (value <= thresholds.NEEDS_IMPROVEMENT) {
      return { score: 'needs-improvement', color: DASHBOARD_CONFIG.CHART_COLORS.NEEDS_IMPROVEMENT };
    } else {
      return { score: 'poor', color: DASHBOARD_CONFIG.CHART_COLORS.POOR };
    }
  };

  const scoreData = getScoreData(metric, value);
  
  const formatValue = (metric: string, value: number) => {
    if (metric === 'CLS') return value.toFixed(3);
    return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`;
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'LCP': return '🖼️';
      case 'FID': return '👆';
      case 'CLS': return '📐';
      default: return '📊';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm">{getMetricIcon(metric)}</span>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: scoreData.color }}
          title={`${metric}: ${formatValue(metric, value)}`}
        />
        <span className="text-xs font-medium text-gray-700">
          {formatValue(metric, value)}
        </span>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-lg mb-1">{getMetricIcon(metric)}</div>
      <div 
        className="text-sm font-bold mb-1"
        style={{ color: scoreData.color }}
      >
        {formatValue(metric, value)}
      </div>
      <div className="text-xs text-gray-600">{metric}</div>
    </div>
  );
};

// Main Performance Widget
const PerformanceWidget: React.FC<PerformanceWidgetProps> = ({
  pageCategory,
  compact = false,
  showDetails = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const { metrics, isSupported, isMonitoring, error, refresh } = useSimplePerformanceMonitoring(
    pageCategory as any
  );
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if performance monitoring is not supported
  if (!isSupported) {
    return null;
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center space-x-2">
          <span className="text-red-500">⚠️</span>
          <span className="text-sm text-red-700">
            {t('performance.widget.error', 'Performance monitoring unavailable')}
          </span>
        </div>
      </div>
    );
  }

  // Loading state
  if (!metrics) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-3 animate-pulse ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate overall performance score
  const calculateOverallScore = () => {
    const scores = [
      metrics.performanceScores.LCP,
      metrics.performanceScores.FID,
      metrics.performanceScores.CLS
    ];
    
    const goodCount = scores.filter(score => score === 'good').length;
    const needsImprovementCount = scores.filter(score => score === 'needs-improvement').length;
    
    if (goodCount >= 2) return 'good';
    if (goodCount + needsImprovementCount >= 2) return 'needs-improvement';
    return 'poor';
  };

  const overallScore = calculateOverallScore();
  const overallColor = 
    overallScore === 'good' ? DASHBOARD_CONFIG.CHART_COLORS.EXCELLENT :
    overallScore === 'needs-improvement' ? DASHBOARD_CONFIG.CHART_COLORS.NEEDS_IMPROVEMENT :
    DASHBOARD_CONFIG.CHART_COLORS.POOR;

  const getOverallIcon = (score: string) => {
    switch (score) {
      case 'good': return '🟢';
      case 'needs-improvement': return '🟡';
      case 'poor': return '🔴';
      default: return '⚪';
    }
  };

  const getPerformanceMessage = (score: string) => {
    switch (score) {
      case 'good':
        return t('performance.widget.good', 'Excellent Portuguese user experience');
      case 'needs-improvement':
        return t('performance.widget.needsImprovement', 'Performance can be improved');
      case 'poor':
        return t('performance.widget.poor', 'Performance needs attention');
      default:
        return t('performance.widget.unknown', 'Analyzing performance...');
    }
  };

  // Compact version
  if (compact) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getOverallIcon(overallScore)}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {t('performance.widget.title', 'Performance')}
              </div>
              <div className="text-xs text-gray-600">
                {isMonitoring ? t('performance.widget.live', 'Live monitoring') : 
                 t('performance.widget.idle', 'Idle')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MetricScore metric="LCP" value={metrics.webVitals.LCP} compact />
            <MetricScore metric="FID" value={metrics.webVitals.FID} compact />
            <MetricScore metric="CLS" value={metrics.webVitals.CLS} compact />
          </div>
        </div>
      </div>
    );
  }

  // Full version
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div 
        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getOverallIcon(overallScore)}</span>
            <div>
              <h3 className="font-semibold text-gray-900">
                {t('performance.widget.title', 'Core Web Vitals')}
              </h3>
              <p className="text-sm text-gray-600">
                {getPerformanceMessage(overallScore)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isMonitoring && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">
                  {t('performance.widget.live', 'LIVE')}
                </span>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                refresh();
              }}
              className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors"
              title={t('performance.widget.refresh', 'Refresh metrics')}
            >
              🔄
            </button>
            <span className="text-gray-400 text-sm">
              {isExpanded ? '−' : '+'}
            </span>
          </div>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <MetricScore metric="LCP" value={metrics.webVitals.LCP} />
          <MetricScore metric="FID" value={metrics.webVitals.FID} />
          <MetricScore metric="CLS" value={metrics.webVitals.CLS} />
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
          {/* Portuguese Content Metrics */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              🇵🇹 {t('performance.widget.portugueseContent', 'Portuguese Content')}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-primary-50 rounded p-2">
                <div className="text-sm font-medium text-primary-900">
                  {metrics.portugueseContentMetrics.textRenderingTime.toFixed(0)}ms
                </div>
                <div className="text-xs text-primary-700">
                  {t('performance.widget.textRendering', 'Text Rendering')}
                </div>
              </div>
              <div className="bg-primary-50 rounded p-2">
                <div className="text-sm font-medium text-primary-900">
                  {(metrics.portugueseContentMetrics.imageLoadingTime / 1000).toFixed(1)}s
                </div>
                <div className="text-xs text-primary-700">
                  {t('performance.widget.culturalImages', 'Cultural Images')}
                </div>
              </div>
              <div className="bg-primary-50 rounded p-2">
                <div className="text-sm font-medium text-primary-900">
                  {metrics.portugueseContentMetrics.culturalElementsLoadTime.toFixed(0)}ms
                </div>
                <div className="text-xs text-primary-700">
                  {t('performance.widget.culturalElements', 'Cultural Elements')}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Performance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              📱 {t('performance.widget.mobilePerformance', 'Mobile Performance')}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: overallColor }}
                />
                <span className="text-sm text-gray-700">
                  {(metrics.mobileMetrics.mobilePerformanceScore * 100).toFixed(0)}% score
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {(metrics.mobileMetrics.mobileTraffic * 100).toFixed(0)}% mobile traffic
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {t('performance.widget.lastUpdated', 'Updated')}: {
                new Date(metrics.timestamp).toLocaleTimeString()
              }
            </div>
            
            {showDetails && (
              <a
                href={ROUTES.ADMIN.PERFORMANCE || '/admin/performance'}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                {t('performance.widget.viewDetails', 'View Details')} →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceWidget;