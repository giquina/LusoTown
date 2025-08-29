'use client'

/**
 * Production Monitoring Dashboard for LusoTown Portuguese-Speaking Community Platform
 * 
 * Displays comprehensive monitoring metrics including:
 * - Real-time uptime status for critical Portuguese community features
 * - Performance metrics for mobile Portuguese community usage
 * - Bilingual content loading and switching performance
 * - Community engagement metrics and cultural content performance
 * - Error rates and incident response status
 */

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  monitoring,
  getCommunityMetrics,
  type PerformanceMetric,
  type UptimeStatus,
  type CommunityMetrics
} from '@/lib/monitoring'
import {
  MONITORING_DASHBOARD,
  PORTUGUESE_ERROR_THRESHOLDS,
  ERROR_SEVERITY
} from '@/config/error-monitoring'

interface MonitoringDashboardProps {
  showAdvancedMetrics?: boolean
  compactView?: boolean
  autoRefresh?: boolean
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical'
  uptime: number
  responseTime: number
  errorRate: number
  communityEngagement: number
}

export default function MonitoringDashboard({
  showAdvancedMetrics = true,
  compactView = false,
  autoRefresh = true
}: MonitoringDashboardProps) {
  const { t } = useLanguage()
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 'healthy',
    uptime: 99.9,
    responseTime: 250,
    errorRate: 0.01,
    communityEngagement: 0.85
  })
  const [communityMetrics, setCommunityMetrics] = useState<CommunityMetrics>({
    activeUsers: 0,
    portugueseSpeakers: 0,
    bilingualSwitches: 0,
    culturalContentViews: 0,
    businessDirectorySearches: 0,
    eventBookings: 0,
    mobileUsage: 0,
    engagementScore: 0
  })
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])
  const [uptimeStatus, setUptimeStatus] = useState<Record<string, UptimeStatus>>({})
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Update metrics from monitoring service
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = getCommunityMetrics()
      setCommunityMetrics(metrics)
      
      const performance = monitoring.getPerformanceMetrics()
      setPerformanceMetrics(performance.slice(-10)) // Last 10 metrics
      
      const uptime = monitoring.getUptimeStatus()
      setUptimeStatus(uptime)
      
      // Calculate overall system health
      const overallUptime = Object.values(uptime).length > 0 
        ? Object.values(uptime).reduce((sum, status) => sum + status.uptime, 0) / Object.values(uptime).length
        : 99.9

      const avgResponseTime = Object.values(uptime).length > 0
        ? Object.values(uptime).reduce((sum, status) => sum + status.responseTime, 0) / Object.values(uptime).length
        : 250

      const errorRate = performance.filter(m => m.status === 'critical').length / Math.max(performance.length, 1)

      setSystemHealth({
        overall: errorRate > 0.05 || overallUptime < 99.5 ? 'critical' : 
                errorRate > 0.02 || overallUptime < 99.9 ? 'warning' : 'healthy',
        uptime: overallUptime,
        responseTime: avgResponseTime,
        errorRate: errorRate,
        communityEngagement: metrics.engagementScore
      })
      
      setLastUpdated(new Date())
    }

    updateMetrics()
    
    if (autoRefresh) {
      const interval = setInterval(updateMetrics, MONITORING_DASHBOARD.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getHealthStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatMetricValue = (value: number, type: 'percentage' | 'milliseconds' | 'count' | 'score') => {
    switch (type) {
      case 'percentage':
        return `${(value * 100).toFixed(2)}%`
      case 'milliseconds':
        return `${Math.round(value)}ms`
      case 'count':
        return value.toLocaleString()
      case 'score':
        return `${(value * 100).toFixed(1)}/100`
      default:
        return value.toString()
    }
  }

  const getUptimeStatusIcon = (status: 'up' | 'down' | 'degraded') => {
    switch (status) {
      case 'up':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      case 'degraded':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      case 'down':
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      default:
        return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
    }
  }

  if (compactView) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('monitoring.platform_status')}
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(systemHealth.overall)}`}>
            {t(`monitoring.status.${systemHealth.overall}`)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatMetricValue(systemHealth.uptime / 100, 'percentage')}
            </div>
            <div className="text-sm text-gray-500">{t('monitoring.uptime')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatMetricValue(systemHealth.responseTime, 'milliseconds')}
            </div>
            <div className="text-sm text-gray-500">{t('monitoring.response_time')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatMetricValue(communityMetrics.portugueseSpeakers, 'count')}
            </div>
            <div className="text-sm text-gray-500">{t('monitoring.portuguese_speakers')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {formatMetricValue(communityMetrics.engagementScore, 'score')}
            </div>
            <div className="text-sm text-gray-500">{t('monitoring.engagement_score')}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('monitoring.system_health_overview')}
          </h2>
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getHealthStatusColor(systemHealth.overall)}`}>
              {t(`monitoring.status.${systemHealth.overall}`)}
            </div>
            <div className="text-sm text-gray-500">
              {t('monitoring.last_updated')}: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">{t('monitoring.platform_uptime')}</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatMetricValue(systemHealth.uptime / 100, 'percentage')}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Target: {formatMetricValue(PORTUGUESE_ERROR_THRESHOLDS.uptimeTarget, 'percentage')}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">{t('monitoring.avg_response_time')}</p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatMetricValue(systemHealth.responseTime, 'milliseconds')}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L10 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">
              {systemHealth.responseTime <= 500 ? t('monitoring.excellent') : 
               systemHealth.responseTime <= 1000 ? t('monitoring.good') : t('monitoring.needs_attention')}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">{t('monitoring.community_engagement')}</p>
                <p className="text-2xl font-bold text-purple-700">
                  {formatMetricValue(systemHealth.communityEngagement, 'score')}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">
              Target: {formatMetricValue(PORTUGUESE_ERROR_THRESHOLDS.communityEngagementThreshold, 'score')}
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">{t('monitoring.error_rate')}</p>
                <p className="text-2xl font-bold text-red-700">
                  {formatMetricValue(systemHealth.errorRate, 'percentage')}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-red-600 mt-2">
              {systemHealth.errorRate <= 0.01 ? t('monitoring.excellent') :
               systemHealth.errorRate <= 0.05 ? t('monitoring.acceptable') : t('monitoring.critical')}
            </p>
          </div>
        </div>
      </div>

      {/* Portuguese Community Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t('monitoring.portuguese_community_metrics')}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatMetricValue(communityMetrics.activeUsers, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.active_users')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatMetricValue(communityMetrics.portugueseSpeakers, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.portuguese_speakers')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {formatMetricValue(communityMetrics.bilingualSwitches, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.bilingual_switches')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {formatMetricValue(communityMetrics.culturalContentViews, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.cultural_content_views')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">
              {formatMetricValue(communityMetrics.businessDirectorySearches, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.business_searches')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {formatMetricValue(communityMetrics.eventBookings, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.event_bookings')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {formatMetricValue(communityMetrics.mobileUsage, 'count')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.mobile_interactions')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {formatMetricValue(communityMetrics.engagementScore, 'score')}
            </div>
            <div className="text-sm text-gray-600">{t('monitoring.engagement_score')}</div>
          </div>
        </div>
      </div>

      {/* Endpoint Uptime Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t('monitoring.endpoint_uptime_status')}
        </h3>
        
        <div className="space-y-4">
          {Object.entries(uptimeStatus).map(([endpoint, status]) => (
            <div key={endpoint} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getUptimeStatusIcon(status.status)}
                <div>
                  <div className="font-medium text-gray-900">
                    {t(`monitoring.endpoints.${endpoint}`)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('monitoring.last_check')}: {status.lastCheck.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  {formatMetricValue(status.uptime / 100, 'percentage')} uptime
                </div>
                <div className="text-sm text-gray-500">
                  {formatMetricValue(status.responseTime, 'milliseconds')} response
                </div>
              </div>
            </div>
          ))}
          
          {Object.keys(uptimeStatus).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t('monitoring.no_uptime_data')}
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      {showAdvancedMetrics && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('monitoring.recent_performance_metrics')}
          </h3>
          
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {t(`monitoring.metrics.${metric.name}`) || metric.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {metric.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {formatMetricValue(metric.value, 'milliseconds')}
                  </div>
                  <div className="text-sm text-gray-500">
                    Threshold: {formatMetricValue(metric.threshold, 'milliseconds')}
                  </div>
                </div>
              </div>
            ))}
            
            {performanceMetrics.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {t('monitoring.no_performance_data')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}