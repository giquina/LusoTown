'use client'

import React, { useState, useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { 
  ExclamationTriangleIcon, 
  ChartBarIcon, 
  BoltIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  LanguageIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { errorTracker, ErrorEvent } from '@/lib/monitoring/error-tracker'
import { 
  MONITORING_DASHBOARD, 
  PORTUGUESE_ERROR_CONTEXTS,
  ERROR_SEVERITY 
} from '@/config/error-monitoring'

interface DashboardMetrics {
  totalErrors: number
  criticalErrors: number
  portugueseRelatedErrors: number
  errorsByContext: Record<string, number>
  performanceMetrics: {
    averageLoadTime: number
    portugueseContentLoadTime: number
    languageSwitchingTime: number
    businessDirectoryResponseTime: number
  }
  recentAlerts: ErrorEvent[]
}

interface MonitoringDashboardProps {
  className?: string
  showHeader?: boolean
  compactMode?: boolean
}

export default function ErrorMonitoringDashboard({ 
  className = '',
  showHeader = true,
  compactMode = false
}: MonitoringDashboardProps) {
  const { t, language } = useLanguage()
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalErrors: 0,
    criticalErrors: 0,
    portugueseRelatedErrors: 0,
    errorsByContext: {},
    performanceMetrics: {
      averageLoadTime: 0,
      portugueseContentLoadTime: 0,
      languageSwitchingTime: 0,
      businessDirectoryResponseTime: 0
    },
    recentAlerts: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    loadMetrics()
    
    // Set up periodic refresh
    const interval = setInterval(loadMetrics, MONITORING_DASHBOARD.refreshInterval)
    
    // Listen for real-time error alerts
    const handleErrorAlert = (event: CustomEvent) => {
      loadMetrics() // Refresh metrics when new alerts come in
    }

    window.addEventListener('lusotown:error-alert', handleErrorAlert as EventListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener('lusotown:error-alert', handleErrorAlert as EventListener)
    }
  }, [])

  const loadMetrics = async () => {
    try {
      // Get current error summary from tracker
      const errorSummary = errorTracker.getErrorSummary()
      
      // Simulate performance metrics (in real implementation, these would come from your monitoring service)
      const performanceMetrics = {
        averageLoadTime: Math.random() * 2000 + 1000, // 1-3 seconds
        portugueseContentLoadTime: Math.random() * 1500 + 800, // 0.8-2.3 seconds
        languageSwitchingTime: Math.random() * 300 + 100, // 100-400ms
        businessDirectoryResponseTime: Math.random() * 3000 + 500 // 0.5-3.5 seconds
      }

      // Get recent alerts (mock data for demo)
      const recentAlerts: ErrorEvent[] = []

      setMetrics({
        totalErrors: errorSummary.totalErrors,
        criticalErrors: errorSummary.criticalErrors,
        portugueseRelatedErrors: errorSummary.portugueseRelatedErrors,
        errorsByContext: errorSummary.errorsByContext,
        performanceMetrics,
        recentAlerts
      })
      
      setLastUpdate(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load monitoring metrics:', error)
      setIsLoading(false)
    }
  }

  const getErrorSeverityColor = (context: string) => {
    if (context.includes('critical')) return 'text-red-600 bg-red-50 border-red-200'
    if (context.includes('portuguese') || context.includes('cultural')) return 'text-primary-600 bg-primary-50 border-primary-200'
    if (context.includes('performance')) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const getPerformanceStatus = (value: number, threshold: number) => {
    if (value > threshold * 1.5) return { color: 'text-red-600', status: 'critical' }
    if (value > threshold) return { color: 'text-yellow-600', status: 'warning' }
    return { color: 'text-green-600', status: 'good' }
  }

  const formatMetricValue = (value: number, unit: string = 'ms') => {
    return value < 1000 ? `${Math.round(value)}${unit}` : `${(value / 1000).toFixed(1)}s`
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {showHeader && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChartBarIcon className="w-6 h-6 text-primary-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('error_monitoring.title')}
                </h2>
                <p className="text-sm text-gray-600">
                  {t('error_monitoring.subtitle')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadMetrics}
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{t('error_monitoring.refresh_data')}</span>
              </button>
              <div className="text-sm text-gray-500">
                {t('error_monitoring.last_24h')}: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Total Errors
                </p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalErrors}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">
                  {t('error_monitoring.critical_errors')}
                </p>
                <p className="text-2xl font-bold text-red-900">{metrics.criticalErrors}</p>
              </div>
              <BoltIcon className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600">
                  {t('error_monitoring.portuguese_features')}
                </p>
                <p className="text-2xl font-bold text-primary-900">{metrics.portugueseRelatedErrors}</p>
              </div>
              <LanguageIcon className="w-8 h-8 text-primary-400" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">
                  System Status
                </p>
                <p className="text-lg font-bold text-green-900">
                  {metrics.criticalErrors === 0 ? 
                    (language === 'pt' ? 'Saudável' : 'Healthy') : 
                    (language === 'pt' ? 'Degradado' : 'Degraded')}
                </p>
              </div>
              <GlobeAltIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('error_monitoring.performance_issues')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              {/* Portuguese Content Load Time */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LanguageIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Portuguese Content Load
                  </span>
                </div>
                <div className={`text-sm font-semibold ${getPerformanceStatus(metrics.performanceMetrics.portugueseContentLoadTime, 2000).color}`}>
                  {formatMetricValue(metrics.performanceMetrics.portugueseContentLoadTime)}
                </div>
              </div>

              {/* Language Switching */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <LanguageIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Language Switching
                  </span>
                </div>
                <div className={`text-sm font-semibold ${getPerformanceStatus(metrics.performanceMetrics.languageSwitchingTime, 500).color}`}>
                  {formatMetricValue(metrics.performanceMetrics.languageSwitchingTime)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Business Directory */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Business Directory
                  </span>
                </div>
                <div className={`text-sm font-semibold ${getPerformanceStatus(metrics.performanceMetrics.businessDirectoryResponseTime, 2000).color}`}>
                  {formatMetricValue(metrics.performanceMetrics.businessDirectoryResponseTime)}
                </div>
              </div>

              {/* Average Load Time */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Average Load Time
                  </span>
                </div>
                <div className={`text-sm font-semibold ${getPerformanceStatus(metrics.performanceMetrics.averageLoadTime, 2500).color}`}>
                  {formatMetricValue(metrics.performanceMetrics.averageLoadTime)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Breakdown */}
        {!compactMode && Object.keys(metrics.errorsByContext).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Error Breakdown by Context
            </h3>
            
            <div className="space-y-2">
              {Object.entries(metrics.errorsByContext).map(([context, count]) => (
                <div key={context} className={`flex items-center justify-between p-3 rounded-lg border ${getErrorSeverityColor(context)}`}>
                  <span className="text-sm font-medium capitalize">
                    {context.replace(/-/g, ' ').replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portuguese-Specific Health Indicators */}
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center space-x-2">
            <LanguageIcon className="w-5 h-5" />
            <span>Portuguese Community Features Health</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-900">
                {metrics.portugueseRelatedErrors === 0 ? '✅' : '⚠️'}
              </p>
              <p className="text-sm text-primary-700">
                Cultural Content
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-900">
                {metrics.performanceMetrics.languageSwitchingTime < 500 ? '✅' : '⚠️'}
              </p>
              <p className="text-sm text-primary-700">
                Bilingual System
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-900">
                {metrics.performanceMetrics.businessDirectoryResponseTime < 2000 ? '✅' : '⚠️'}
              </p>
              <p className="text-sm text-primary-700">
                Business Directory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
