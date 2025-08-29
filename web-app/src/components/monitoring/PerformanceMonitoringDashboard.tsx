'use client'

/**
 * Performance Monitoring Dashboard for Portuguese Community Platform
 * 
 * Real-time monitoring of key platform metrics with focus on Portuguese-speaking
 * community features, cultural authenticity indicators, and PALOP nation engagement.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MONITORING_ENDPOINTS } from '@/config/error-monitoring';

interface PerformanceMetrics {
  platform_uptime: number;
  avg_response_time: number;
  community_engagement: number;
  error_rate: number;
  portuguese_speakers_active: number;
  bilingual_switches: number;
  cultural_content_views: number;
  business_searches: number;
  event_bookings: number;
  mobile_interactions: number;
}

interface EndpointStatus {
  homepage: 'healthy' | 'warning' | 'critical';
  events: 'healthy' | 'warning' | 'critical';
  businessDirectory: 'healthy' | 'warning' | 'critical';
  streaming: 'healthy' | 'warning' | 'critical';
  api: 'healthy' | 'warning' | 'critical';
  auth: 'healthy' | 'warning' | 'critical';
}

interface CulturalMetrics {
  palop_representation: Record<string, number>;
  uk_geographic_distribution: Record<string, number>;
  university_engagement: Record<string, number>;
  cultural_authenticity_score: number;
  portuguese_content_engagement: number;
}

export default function PerformanceMonitoringDashboard() {
  const { t, language } = useLanguage();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    platform_uptime: 99.9,
    avg_response_time: 245,
    community_engagement: 87,
    error_rate: 0.12,
    portuguese_speakers_active: 456,
    bilingual_switches: 1234,
    cultural_content_views: 5678,
    business_searches: 234,
    event_bookings: 89,
    mobile_interactions: 3421
  });

  const [endpointStatus, setEndpointStatus] = useState<EndpointStatus>({
    homepage: 'healthy',
    events: 'healthy',
    businessDirectory: 'warning',
    streaming: 'healthy',
    api: 'healthy',
    auth: 'healthy'
  });

  const [culturalMetrics, setCulturalMetrics] = useState<CulturalMetrics>({
    palop_representation: {
      portugal: 45,
      brazil: 32,
      cape_verde: 8,
      angola: 7,
      mozambique: 4,
      guinea_bissau: 2,
      sao_tome_principe: 1.5,
      east_timor: 0.5
    },
    uk_geographic_distribution: {
      london: 65,
      manchester: 12,
      birmingham: 8,
      leeds: 5,
      glasgow: 4,
      liverpool: 3,
      bristol: 2,
      edinburgh: 1
    },
    university_engagement: {
      ucl: 95,
      kings_college: 87,
      imperial: 82,
      lse: 79,
      oxford: 76,
      cambridge: 74,
      manchester: 71,
      edinburgh: 68
    },
    cultural_authenticity_score: 8.7,
    portuguese_content_engagement: 73.5
  });

  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshMetrics = async () => {
    setLoading(true);
    try {
      // In production, these would be real API calls
      const response = await fetch(MONITORING_ENDPOINTS.dashboard);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data.metrics);
        setEndpointStatus(data.endpoints);
        setCulturalMetrics(data.cultural_metrics);
      }
    } catch (error) {
      console.error('Failed to refresh metrics:', error);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return t('monitoring.excellent');
    if (value >= thresholds.warning) return t('monitoring.good');
    return t('monitoring.needs_attention');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('monitoring.platform_status')}
              </h1>
              <p className="text-lg text-gray-600">
                {t('monitoring.system_health_overview')}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={refreshMetrics}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {t('error_monitoring.refresh_data')}
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    {t('error_monitoring.refresh_data')}
                  </>
                )}
              </button>
              <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500">
                {t('monitoring.last_updated')}: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('monitoring.platform_uptime')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.platform_uptime}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('monitoring.avg_response_time')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.avg_response_time}ms
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('monitoring.portuguese_speakers')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.portuguese_speakers_active.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('monitoring.error_rate')}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {metrics.error_rate}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portuguese Community Metrics */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {t('monitoring.portuguese_community_metrics')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.active_users')}
                </h4>
                <p className="text-2xl font-semibold text-primary-600">
                  {metrics.portuguese_speakers_active}
                </p>
                <p className="text-sm text-gray-500">
                  {getPerformanceStatus(metrics.portuguese_speakers_active, { good: 400, warning: 200 })}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.bilingual_switches')}
                </h4>
                <p className="text-2xl font-semibold text-green-600">
                  {metrics.bilingual_switches}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Últimas 24h' : 'Last 24h'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.cultural_content_views')}
                </h4>
                <p className="text-2xl font-semibold text-blue-600">
                  {metrics.cultural_content_views}
                </p>
                <p className="text-sm text-gray-500">
                  {culturalMetrics.cultural_authenticity_score}/10 {language === 'pt' ? 'autenticidade' : 'authenticity'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.business_searches')}
                </h4>
                <p className="text-2xl font-semibold text-yellow-600">
                  {metrics.business_searches}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Negócios portugueses' : 'Portuguese businesses'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.event_bookings')}
                </h4>
                <p className="text-2xl font-semibold text-purple-600">
                  {metrics.event_bookings}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Eventos culturais' : 'Cultural events'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {t('monitoring.mobile_interactions')}
                </h4>
                <p className="text-2xl font-semibold text-indigo-600">
                  {metrics.mobile_interactions}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round((metrics.mobile_interactions / (metrics.mobile_interactions + 1000)) * 100)}% mobile
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Endpoint Status */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {t('monitoring.endpoint_uptime_status')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(endpointStatus).map(([endpoint, status]) => (
                <div key={endpoint} className={`border rounded-lg p-4 ${getStatusColor(status)}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {t(`monitoring.endpoints.${endpoint}`)}
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : status === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t(`monitoring.status.${status}`)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {t('monitoring.last_check')}: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PALOP Representation Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Representação das Nações PALOP' : 'PALOP Nation Representation'}
            </h3>
            <div className="space-y-4">
              {Object.entries(culturalMetrics.palop_representation).map(([nation, percentage]) => (
                <div key={nation} className="flex items-center">
                  <div className="w-24 text-sm text-gray-600 capitalize">
                    {nation.replace('_', ' ')}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900">
                    {percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}