/**
 * Mobile Performance Monitor Component
 * 
 * Real-time performance monitoring dashboard for Portuguese cultural content,
 * with mobile-first metrics and optimization suggestions.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  SignalIcon, 
  ClockIcon,
  PhotoIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { mobilePerformanceOptimizer, PerformanceMetrics } from '@/lib/mobile-performance';
import { getDeviceInfo } from '@/lib/mobile-detection';

interface MobilePerformanceMonitorProps {
  showDebugMode?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface PerformanceScore {
  overall: number;
  mobile: number;
  cultural: number;
  accessibility: number;
}

export default function MobilePerformanceMonitor({
  showDebugMode = false,
  autoRefresh = true,
  refreshInterval = 5000
}: MobilePerformanceMonitorProps) {
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ resourceLoadTime: {} });
  const [scores, setScores] = useState<PerformanceScore>({ overall: 0, mobile: 0, cultural: 0, accessibility: 0 });
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [connectionInfo, setConnectionInfo] = useState<any>({});
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    initializeMonitoring();
    
    if (autoRefresh) {
      const interval = setInterval(updateMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const initializeMonitoring = async () => {
    setIsMonitoring(true);
    
    try {
      // Get device information
      const device = getDeviceInfo();
      setDeviceInfo(device);
      
      // Get connection information
      const connection = getConnectionInfo();
      setConnectionInfo(connection);
      
      // Initialize performance optimizer
      await mobilePerformanceOptimizer.initialize();
      
      // Get initial metrics
      await updateMetrics();
      
    } catch (error) {
      console.error('Performance Monitor: Initialization failed:', error);
    }
  };

  const updateMetrics = async () => {
    try {
      // Get performance metrics
      const currentMetrics = mobilePerformanceOptimizer.getMetrics();
      setMetrics(currentMetrics);
      
      // Calculate scores
      const calculatedScores = calculatePerformanceScores(currentMetrics);
      setScores(calculatedScores);
      
      // Generate recommendations
      const newRecommendations = generateOptimizationRecommendations(currentMetrics, calculatedScores);
      setRecommendations(newRecommendations);
      
    } catch (error) {
      console.error('Performance Monitor: Metrics update failed:', error);
    }
  };

  const calculatePerformanceScores = (metrics: PerformanceMetrics): PerformanceScore => {
    let overallScore = 100;
    let mobileScore = 100;
    let culturalScore = 100;
    let accessibilityScore = 100;

    // FCP scoring (First Contentful Paint)
    if (metrics.firstContentfulPaint) {
      if (metrics.firstContentfulPaint > 3000) overallScore -= 20;
      else if (metrics.firstContentfulPaint > 1800) overallScore -= 10;
      
      if (metrics.firstContentfulPaint > 2500) mobileScore -= 25;
      else if (metrics.firstContentfulPaint > 1500) mobileScore -= 15;
    }

    // LCP scoring (Largest Contentful Paint)
    if (metrics.largestContentfulPaint) {
      if (metrics.largestContentfulPaint > 4000) overallScore -= 25;
      else if (metrics.largestContentfulPaint > 2500) overallScore -= 15;
      
      if (metrics.largestContentfulPaint > 4000) culturalScore -= 30;
    }

    // CLS scoring (Cumulative Layout Shift)
    if (metrics.cumulativeLayoutShift) {
      if (metrics.cumulativeLayoutShift > 0.25) overallScore -= 20;
      else if (metrics.cumulativeLayoutShift > 0.1) overallScore -= 10;
      
      if (metrics.cumulativeLayoutShift > 0.1) accessibilityScore -= 25;
    }

    // Cultural content performance
    if (metrics.culturalContentLoadTime) {
      if (metrics.culturalContentLoadTime > 5000) culturalScore -= 40;
      else if (metrics.culturalContentLoadTime > 3000) culturalScore -= 20;
    }

    return {
      overall: Math.max(0, Math.round(overallScore)),
      mobile: Math.max(0, Math.round(mobileScore)),
      cultural: Math.max(0, Math.round(culturalScore)),
      accessibility: Math.max(0, Math.round(accessibilityScore))
    };
  };

  const generateOptimizationRecommendations = (metrics: PerformanceMetrics, scores: PerformanceScore): string[] => {
    const recommendations: string[] = [];

    if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 2500) {
      recommendations.push('Optimize critical rendering path for Portuguese cultural content');
      recommendations.push('Consider inlining critical CSS for heritage colors');
    }

    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > 4000) {
      recommendations.push('Optimize largest Portuguese cultural images');
      recommendations.push('Preload hero images for Fado nights and cultural events');
    }

    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > 0.1) {
      recommendations.push('Reserve space for bilingual content to prevent layout shifts');
      recommendations.push('Set explicit dimensions for Portuguese event images');
    }

    if (metrics.culturalContentLoadTime && metrics.culturalContentLoadTime > 3000) {
      recommendations.push('Enable compression for Portuguese cultural assets');
      recommendations.push('Use WebP format for cultural celebration images');
    }

    if (scores.mobile < 80) {
      recommendations.push('Implement data saver mode for slow connections');
      recommendations.push('Optimize touch targets for Portuguese business directory');
    }

    if (connectionInfo.effectiveType === 'slow-2g' || connectionInfo.effectiveType === '2g') {
      recommendations.push('Enable ultra data saver mode');
      recommendations.push('Defer non-critical Portuguese cultural animations');
    }

    return recommendations;
  };

  const getConnectionInfo = () => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false
      };
    }
    return { effectiveType: 'unknown', downlink: 0, rtt: 0, saveData: false };
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <BoltIcon className="h-5 w-5" />;
    if (score >= 70) return <ClockIcon className="h-5 w-5" />;
    return <ExclamationTriangleIcon className="h-5 w-5" />;
  };

  if (!showDebugMode) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-sm w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="h-6 w-6" />
            <h3 className="font-semibold text-sm">Portuguese Community Performance</h3>
          </div>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <DevicePhoneMobileIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {/* Performance Scores */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`p-3 rounded-lg ${getScoreColor(scores.overall)}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Overall</span>
              {getScoreIcon(scores.overall)}
            </div>
            <div className="text-lg font-bold">{scores.overall}</div>
          </div>
          
          <div className={`p-3 rounded-lg ${getScoreColor(scores.mobile)}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Mobile</span>
              <DevicePhoneMobileIcon className="h-4 w-4" />
            </div>
            <div className="text-lg font-bold">{scores.mobile}</div>
          </div>
          
          <div className={`p-3 rounded-lg ${getScoreColor(scores.cultural)}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Cultural</span>
              <PhotoIcon className="h-4 w-4" />
            </div>
            <div className="text-lg font-bold">{scores.cultural}</div>
          </div>
          
          <div className={`p-3 rounded-lg ${getScoreColor(scores.accessibility)}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">A11y</span>
              <GlobeAltIcon className="h-4 w-4" />
            </div>
            <div className="text-lg font-bold">{scores.accessibility}</div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-semibold text-gray-900">Core Web Vitals</h4>
          
          {metrics.firstContentfulPaint && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">FCP</span>
              <span className={`font-medium ${metrics.firstContentfulPaint > 2500 ? 'text-red-600' : metrics.firstContentfulPaint > 1800 ? 'text-yellow-600' : 'text-green-600'}`}>
                {Math.round(metrics.firstContentfulPaint)}ms
              </span>
            </div>
          )}
          
          {metrics.largestContentfulPaint && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">LCP</span>
              <span className={`font-medium ${metrics.largestContentfulPaint > 4000 ? 'text-red-600' : metrics.largestContentfulPaint > 2500 ? 'text-yellow-600' : 'text-green-600'}`}>
                {Math.round(metrics.largestContentfulPaint)}ms
              </span>
            </div>
          )}
          
          {metrics.cumulativeLayoutShift && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">CLS</span>
              <span className={`font-medium ${metrics.cumulativeLayoutShift > 0.25 ? 'text-red-600' : metrics.cumulativeLayoutShift > 0.1 ? 'text-yellow-600' : 'text-green-600'}`}>
                {metrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
          )}
        </div>

        {/* Portuguese Cultural Metrics */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center">
            <PhotoIcon className="h-4 w-4 mr-1" />
            Portuguese Cultural Content
          </h4>
          
          {metrics.culturalContentLoadTime && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Cultural Content</span>
              <span className={`font-medium ${metrics.culturalContentLoadTime > 5000 ? 'text-red-600' : metrics.culturalContentLoadTime > 3000 ? 'text-yellow-600' : 'text-green-600'}`}>
                {Math.round(metrics.culturalContentLoadTime)}ms
              </span>
            </div>
          )}
          
          {metrics.bilingualRenderTime && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Bilingual Render</span>
              <span className={`font-medium ${metrics.bilingualRenderTime > 1000 ? 'text-red-600' : 'text-green-600'}`}>
                {Math.round(metrics.bilingualRenderTime)}ms
              </span>
            </div>
          )}
        </div>

        {/* Device & Connection Info */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center">
            <SignalIcon className="h-4 w-4 mr-1" />
            Device & Connection
          </h4>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-600">Device:</span>
              <div className="font-medium">
                {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Connection:</span>
              <div className="font-medium">{connectionInfo.effectiveType}</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Optimization Tips</h4>
            <div className="space-y-1">
              {recommendations.slice(0, 3).map((recommendation, index) => (
                <div key={index} className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  {recommendation}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>🇵🇹 Portuguese Community Optimized</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span>{isMonitoring ? 'Monitoring' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}