'use client'

/**
 * Mobile Performance Dashboard for Portuguese Community Platform
 * 
 * Specialized monitoring for mobile performance metrics with focus on 
 * Portuguese-speaking community mobile usage patterns and touch interactions.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface MobilePerformanceMetrics {
  mobile_user_percentage: number;
  avg_mobile_load_time: number;
  mobile_bounce_rate: number;
  touch_interaction_success_rate: number;
  portuguese_mobile_content_engagement: number;
  mobile_accessibility_score: number;
  offline_functionality_score: number;
  mobile_conversion_rate: number;
}

interface DeviceMetrics {
  device_types: Record<string, number>;
  operating_systems: Record<string, number>;
  screen_sizes: Record<string, number>;
  network_types: Record<string, number>;
}

interface UserExperienceMetrics {
  core_web_vitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  mobile_usability_score: number;
  portuguese_content_mobile_optimization: number;
  touch_target_compliance: number;
  gesture_recognition_accuracy: number;
}

interface GeolocationPerformance {
  location_accuracy: number;
  gps_acquisition_time: number;
  business_directory_location_success: number;
  event_location_accuracy: number;
  uk_coverage_quality: Record<string, number>;
}

export default function MobilePerformanceDashboard() {
  const { t, language } = useLanguage();
  
  const [mobileMetrics, setMobileMetrics] = useState<MobilePerformanceMetrics>({
    mobile_user_percentage: 84.3,
    avg_mobile_load_time: 1.8,
    mobile_bounce_rate: 23.7,
    touch_interaction_success_rate: 96.2,
    portuguese_mobile_content_engagement: 78.9,
    mobile_accessibility_score: 92.4,
    offline_functionality_score: 67.8,
    mobile_conversion_rate: 34.5
  });

  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics>({
    device_types: {
      smartphone: 78,
      tablet: 16,
      desktop: 6
    },
    operating_systems: {
      android: 52,
      ios: 38,
      other: 10
    },
    screen_sizes: {
      small_mobile: 45,  // < 375px
      large_mobile: 35,  // 375-414px
      tablet: 16,        // 768-1024px
      desktop: 4         // > 1024px
    },
    network_types: {
      '4g': 68,
      'wifi': 24,
      '5g': 6,
      '3g': 2
    }
  });

  const [uxMetrics, setUxMetrics] = useState<UserExperienceMetrics>({
    core_web_vitals: {
      lcp: 2.1, // seconds
      fid: 89,  // milliseconds
      cls: 0.08 // score
    },
    mobile_usability_score: 91.7,
    portuguese_content_mobile_optimization: 88.3,
    touch_target_compliance: 94.6,
    gesture_recognition_accuracy: 97.2
  });

  const [geoMetrics, setGeoMetrics] = useState<GeolocationPerformance>({
    location_accuracy: 95.4,
    gps_acquisition_time: 3.2,
    business_directory_location_success: 92.8,
    event_location_accuracy: 96.1,
    uk_coverage_quality: {
      london: 98,
      manchester: 94,
      birmingham: 92,
      leeds: 89,
      glasgow: 87,
      other_cities: 85
    }
  });

  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const refreshMobileMetrics = async () => {
    setLoading(true);
    try {
      // In production, fetch real mobile performance data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate metric updates
      setMobileMetrics(prev => ({
        ...prev,
        avg_mobile_load_time: prev.avg_mobile_load_time + (Math.random() * 0.2 - 0.1),
        touch_interaction_success_rate: Math.max(90, prev.touch_interaction_success_rate + (Math.random() * 2 - 1))
      }));
      
    } catch (error) {
      console.error('Failed to refresh mobile metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceStatus = (value: number, thresholds: { excellent: number; good: number }, inverse = false) => {
    const isExcellent = inverse ? value <= thresholds.excellent : value >= thresholds.excellent;
    const isGood = inverse ? value <= thresholds.good : value >= thresholds.good;
    
    if (isExcellent) return { color: 'text-green-600', label: language === 'pt' ? 'Excelente' : 'Excellent' };
    if (isGood) return { color: 'text-yellow-600', label: language === 'pt' ? 'Bom' : 'Good' };
    return { color: 'text-red-600', label: language === 'pt' ? 'Precisa Atenção' : 'Needs Attention' };
  };

  const getCoreWebVitalStatus = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
        return getPerformanceStatus(value, { excellent: 2.5, good: 4.0 }, true);
      case 'fid':
        return getPerformanceStatus(value, { excellent: 100, good: 300 }, true);
      case 'cls':
        return getPerformanceStatus(value, { excellent: 0.1, good: 0.25 }, true);
      default:
        return { color: 'text-gray-600', label: 'Unknown' };
    }
  };

  const timeframeLabels = {
    '1h': language === 'pt' ? 'Última hora' : 'Last hour',
    '24h': language === 'pt' ? 'Últimas 24h' : 'Last 24h',
    '7d': language === 'pt' ? 'Última semana' : 'Last week',
    '30d': language === 'pt' ? 'Último mês' : 'Last month'
  };

  useEffect(() => {
    // Auto-refresh every 2 minutes for mobile performance
    const interval = setInterval(refreshMobileMetrics, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? 'Performance Mobile' : 'Mobile Performance'}
              </h1>
              <p className="text-lg text-gray-600">
                {language === 'pt' 
                  ? 'Monitorização especializada para comunidade portuguesa mobile-heavy'
                  : 'Specialized monitoring for mobile-heavy Portuguese community'
                }
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {Object.entries(timeframeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              
              <button
                onClick={refreshMobileMetrics}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {language === 'pt' ? 'Atualizando...' : 'Refreshing...'}
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    {language === 'pt' ? 'Atualizar' : 'Refresh'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V7zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Utilizadores Mobile' : 'Mobile Users'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mobileMetrics.mobile_user_percentage}%
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
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Tempo Carregamento' : 'Load Time'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mobileMetrics.avg_mobile_load_time.toFixed(1)}s
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
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Interações Touch' : 'Touch Interactions'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mobileMetrics.touch_interaction_success_rate}%
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
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Engagement PT Mobile' : 'PT Mobile Engagement'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {mobileMetrics.portuguese_mobile_content_engagement}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Core Web Vitals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    Largest Contentful Paint (LCP)
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getCoreWebVitalStatus('lcp', uxMetrics.core_web_vitals.lcp).color === 'text-green-600' 
                      ? 'bg-green-100 text-green-700'
                      : getCoreWebVitalStatus('lcp', uxMetrics.core_web_vitals.lcp).color === 'text-yellow-600'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {getCoreWebVitalStatus('lcp', uxMetrics.core_web_vitals.lcp).label}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {uxMetrics.core_web_vitals.lcp.toFixed(1)}s
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Meta: < 2.5s' : 'Target: < 2.5s'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    First Input Delay (FID)
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getCoreWebVitalStatus('fid', uxMetrics.core_web_vitals.fid).color === 'text-green-600' 
                      ? 'bg-green-100 text-green-700'
                      : getCoreWebVitalStatus('fid', uxMetrics.core_web_vitals.fid).color === 'text-yellow-600'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {getCoreWebVitalStatus('fid', uxMetrics.core_web_vitals.fid).label}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {uxMetrics.core_web_vitals.fid}ms
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Meta: < 100ms' : 'Target: < 100ms'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-500">
                    Cumulative Layout Shift (CLS)
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getCoreWebVitalStatus('cls', uxMetrics.core_web_vitals.cls).color === 'text-green-600' 
                      ? 'bg-green-100 text-green-700'
                      : getCoreWebVitalStatus('cls', uxMetrics.core_web_vitals.cls).color === 'text-yellow-600'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {getCoreWebVitalStatus('cls', uxMetrics.core_web_vitals.cls).label}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {uxMetrics.core_web_vitals.cls.toFixed(3)}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Meta: < 0.1' : 'Target: < 0.1'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Device & Network Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {language === 'pt' ? 'Dispositivos e SO' : 'Devices & OS'}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {language === 'pt' ? 'Tipos de Dispositivo' : 'Device Types'}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(deviceMetrics.device_types).map(([device, percentage]) => (
                      <div key={device} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600 capitalize">
                          {device === 'smartphone' ? (language === 'pt' ? 'Smartphone' : 'Smartphone') :
                           device === 'tablet' ? (language === 'pt' ? 'Tablet' : 'Tablet') :
                           device === 'desktop' ? (language === 'pt' ? 'Desktop' : 'Desktop') : device}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-sm font-medium text-gray-900">
                          {percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {language === 'pt' ? 'Sistemas Operativos' : 'Operating Systems'}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(deviceMetrics.operating_systems).map(([os, percentage]) => (
                      <div key={os} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600 uppercase">
                          {os}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-sm font-medium text-gray-900">
                          {percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {language === 'pt' ? 'Tamanhos de Ecrã e Rede' : 'Screen Sizes & Network'}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {language === 'pt' ? 'Tamanhos de Ecrã' : 'Screen Sizes'}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(deviceMetrics.screen_sizes).map(([size, percentage]) => (
                      <div key={size} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">
                          {size === 'small_mobile' ? '< 375px' :
                           size === 'large_mobile' ? '375-414px' :
                           size === 'tablet' ? '768-1024px' :
                           size === 'desktop' ? '> 1024px' : size}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-sm font-medium text-gray-900">
                          {percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {language === 'pt' ? 'Tipos de Rede' : 'Network Types'}
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(deviceMetrics.network_types).map(([network, percentage]) => (
                      <div key={network} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600 uppercase">
                          {network}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-8 text-sm font-medium text-gray-900">
                          {percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Geolocation Performance */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Performance de Geolocalização' : 'Geolocation Performance'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Precisão Localização' : 'Location Accuracy'}
                </h4>
                <p className="text-2xl font-semibold text-green-600">
                  {geoMetrics.location_accuracy}%
                </p>
                <p className={`text-sm ${getPerformanceStatus(geoMetrics.location_accuracy, { excellent: 90, good: 75 }).color}`}>
                  {getPerformanceStatus(geoMetrics.location_accuracy, { excellent: 90, good: 75 }).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Tempo Aquisição GPS' : 'GPS Acquisition Time'}
                </h4>
                <p className="text-2xl font-semibold text-blue-600">
                  {geoMetrics.gps_acquisition_time.toFixed(1)}s
                </p>
                <p className={`text-sm ${getPerformanceStatus(geoMetrics.gps_acquisition_time, { excellent: 3, good: 5 }, true).color}`}>
                  {getPerformanceStatus(geoMetrics.gps_acquisition_time, { excellent: 3, good: 5 }, true).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Sucesso Diretório' : 'Directory Success'}
                </h4>
                <p className="text-2xl font-semibold text-primary-600">
                  {geoMetrics.business_directory_location_success}%
                </p>
                <p className={`text-sm ${getPerformanceStatus(geoMetrics.business_directory_location_success, { excellent: 85, good: 70 }).color}`}>
                  {getPerformanceStatus(geoMetrics.business_directory_location_success, { excellent: 85, good: 70 }).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Precisão Eventos' : 'Event Accuracy'}
                </h4>
                <p className="text-2xl font-semibold text-purple-600">
                  {geoMetrics.event_location_accuracy}%
                </p>
                <p className={`text-sm ${getPerformanceStatus(geoMetrics.event_location_accuracy, { excellent: 90, good: 80 }).color}`}>
                  {getPerformanceStatus(geoMetrics.event_location_accuracy, { excellent: 90, good: 80 }).label}
                </p>
              </div>
            </div>

            {/* UK Coverage Quality */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                {language === 'pt' ? 'Qualidade de Cobertura UK' : 'UK Coverage Quality'}
              </h4>
              <div className="space-y-3">
                {Object.entries(geoMetrics.uk_coverage_quality).map(([city, quality]) => (
                  <div key={city} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600 capitalize">
                      {city.replace('_', ' ')}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${quality}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-medium text-gray-900">
                      {quality}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile UX Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                {language === 'pt' ? 'Usabilidade Mobile' : 'Mobile Usability'}
              </h4>
              <p className="text-2xl font-semibold text-blue-600">
                {uxMetrics.mobile_usability_score}%
              </p>
              <p className={`text-sm ${getPerformanceStatus(uxMetrics.mobile_usability_score, { excellent: 90, good: 80 }).color}`}>
                {getPerformanceStatus(uxMetrics.mobile_usability_score, { excellent: 90, good: 80 }).label}
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                {language === 'pt' ? 'Otimização Conteúdo PT' : 'PT Content Optimization'}
              </h4>
              <p className="text-2xl font-semibold text-primary-600">
                {uxMetrics.portuguese_content_mobile_optimization}%
              </p>
              <p className={`text-sm ${getPerformanceStatus(uxMetrics.portuguese_content_mobile_optimization, { excellent: 85, good: 70 }).color}`}>
                {getPerformanceStatus(uxMetrics.portuguese_content_mobile_optimization, { excellent: 85, good: 70 }).label}
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                {language === 'pt' ? 'Compliance Touch Targets' : 'Touch Target Compliance'}
              </h4>
              <p className="text-2xl font-semibold text-green-600">
                {uxMetrics.touch_target_compliance}%
              </p>
              <p className={`text-sm ${getPerformanceStatus(uxMetrics.touch_target_compliance, { excellent: 90, good: 80 }).color}`}>
                {getPerformanceStatus(uxMetrics.touch_target_compliance, { excellent: 90, good: 80 }).label}
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                {language === 'pt' ? 'Reconhecimento Gestos' : 'Gesture Recognition'}
              </h4>
              <p className="text-2xl font-semibold text-purple-600">
                {uxMetrics.gesture_recognition_accuracy}%
              </p>
              <p className={`text-sm ${getPerformanceStatus(uxMetrics.gesture_recognition_accuracy, { excellent: 95, good: 85 }).color}`}>
                {getPerformanceStatus(uxMetrics.gesture_recognition_accuracy, { excellent: 95, good: 85 }).label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}