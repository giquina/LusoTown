'use client'

/**
 * Portuguese Community Analytics Dashboard
 * 
 * Comprehensive analytics focused on Portuguese-speaking community engagement,
 * cultural authenticity metrics, PALOP nation representation, and UK geographic distribution.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PORTUGUESE_COMMUNITY_METRICS } from '@/config/error-monitoring';

interface CommunityEngagementMetrics {
  total_members: number;
  active_daily_users: number;
  monthly_growth_rate: number;
  retention_rate: number;
  cultural_authenticity_score: number;
  portuguese_content_engagement: number;
  bilingual_usage_ratio: { pt: number; en: number };
  mobile_vs_desktop: { mobile: number; desktop: number };
}

interface BusinessDirectoryMetrics {
  total_portuguese_businesses: number;
  search_queries_daily: number;
  popular_business_categories: Record<string, number>;
  geographic_distribution: Record<string, number>;
  user_discovery_success_rate: number;
  mobile_search_percentage: number;
}

interface EventEngagementMetrics {
  total_events_monthly: number;
  booking_conversion_rate: number;
  popular_event_types: Record<string, number>;
  attendance_rate: number;
  cultural_event_preference: number;
  geographic_event_distribution: Record<string, number>;
}

interface UniversityPartnershipMetrics {
  total_student_members: number;
  university_engagement_rates: Record<string, number>;
  service_usage_breakdown: Record<string, number>;
  accommodation_success_rate: number;
  career_placement_rate: number;
  mentorship_program_participation: number;
}

export default function CommunityAnalyticsDashboard() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('30d');
  
  const [communityMetrics, setCommunityMetrics] = useState<CommunityEngagementMetrics>({
    total_members: 750,
    active_daily_users: 234,
    monthly_growth_rate: 12.5,
    retention_rate: 78.3,
    cultural_authenticity_score: 8.7,
    portuguese_content_engagement: 73.5,
    bilingual_usage_ratio: { pt: 68, en: 32 },
    mobile_vs_desktop: { mobile: 82, desktop: 18 }
  });

  const [businessMetrics, setBusinessMetrics] = useState<BusinessDirectoryMetrics>({
    total_portuguese_businesses: 156,
    search_queries_daily: 89,
    popular_business_categories: {
      restaurants: 34,
      services: 28,
      retail: 18,
      healthcare: 12,
      education: 8
    },
    geographic_distribution: {
      london: 68,
      manchester: 12,
      birmingham: 8,
      leeds: 5,
      other: 7
    },
    user_discovery_success_rate: 76.8,
    mobile_search_percentage: 84
  });

  const [eventMetrics, setEventMetrics] = useState<EventEngagementMetrics>({
    total_events_monthly: 23,
    booking_conversion_rate: 34.7,
    popular_event_types: {
      cultural_celebrations: 45,
      networking: 25,
      educational: 18,
      social: 12
    },
    attendance_rate: 87.2,
    cultural_event_preference: 78,
    geographic_event_distribution: {
      london: 70,
      manchester: 15,
      birmingham: 10,
      other: 5
    }
  });

  const [universityMetrics, setUniversityMetrics] = useState<UniversityPartnershipMetrics>({
    total_student_members: 2150,
    university_engagement_rates: {
      ucl: 95,
      kings_college: 87,
      imperial: 82,
      lse: 79,
      oxford: 76,
      cambridge: 74,
      manchester: 71,
      edinburgh: 68
    },
    service_usage_breakdown: {
      accommodation: 42,
      networking: 28,
      career_services: 18,
      mentorship: 12
    },
    accommodation_success_rate: 89.3,
    career_placement_rate: 73.5,
    mentorship_program_participation: 45.7
  });

  const refreshAnalytics = async () => {
    setLoading(true);
    try {
      // In production, this would fetch real analytics data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate data refresh with slight variations
      setCommunityMetrics(prev => ({
        ...prev,
        active_daily_users: prev.active_daily_users + Math.floor(Math.random() * 20) - 10
      }));
      
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceIndicator = (value: number, thresholds: { excellent: number; good: number }) => {
    if (value >= thresholds.excellent) return { color: 'text-green-600', label: t('monitoring.excellent') };
    if (value >= thresholds.good) return { color: 'text-yellow-600', label: t('monitoring.good') };
    return { color: 'text-red-600', label: t('monitoring.needs_attention') };
  };

  const timeframeLabels = {
    '24h': language === 'pt' ? 'Últimas 24h' : 'Last 24h',
    '7d': language === 'pt' ? 'Última semana' : 'Last week',
    '30d': language === 'pt' ? 'Último mês' : 'Last month',
    '90d': language === 'pt' ? 'Últimos 3 meses' : 'Last 3 months'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? 'Análises da Comunidade Portuguesa' : 'Portuguese Community Analytics'}
              </h1>
              <p className="text-lg text-gray-600">
                {language === 'pt' 
                  ? 'Métricas abrangentes de engagement e autenticidade cultural'
                  : 'Comprehensive engagement metrics and cultural authenticity tracking'
                }
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {Object.entries(timeframeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              
              <button
                onClick={refreshAnalytics}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {language === 'pt' ? 'Atualizando...' : 'Refreshing...'}
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    {language === 'pt' ? 'Atualizar' : 'Refresh'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Community Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      {language === 'pt' ? 'Membros Totais' : 'Total Members'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {communityMetrics.total_members.toLocaleString()}
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
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Utilizadores Ativos Diários' : 'Daily Active Users'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {communityMetrics.active_daily_users.toLocaleString()}
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
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Crescimento Mensal' : 'Monthly Growth'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      +{communityMetrics.monthly_growth_rate}%
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
                      {language === 'pt' ? 'Autenticidade Cultural' : 'Cultural Authenticity'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {communityMetrics.cultural_authenticity_score}/10
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Directory Analytics */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Análises do Diretório de Negócios' : 'Business Directory Analytics'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Business Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Categorias Populares' : 'Popular Categories'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(businessMetrics.popular_business_categories).map(([category, percentage]) => (
                    <div key={category} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600 capitalize">
                        {category === 'restaurants' ? (language === 'pt' ? 'Restaurantes' : 'Restaurants') :
                         category === 'services' ? (language === 'pt' ? 'Serviços' : 'Services') :
                         category === 'retail' ? (language === 'pt' ? 'Comércio' : 'Retail') :
                         category === 'healthcare' ? (language === 'pt' ? 'Saúde' : 'Healthcare') :
                         category === 'education' ? (language === 'pt' ? 'Educação' : 'Education') : category}
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

              {/* Geographic Distribution */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Distribuição Geográfica UK' : 'UK Geographic Distribution'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(businessMetrics.geographic_distribution).map(([city, percentage]) => (
                    <div key={city} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600 capitalize">
                        {city}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
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

            {/* Key Metrics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Negócios Portugueses' : 'Portuguese Businesses'}
                </h5>
                <p className="text-xl font-semibold text-primary-600">
                  {businessMetrics.total_portuguese_businesses}
                </p>
                <p className="text-sm text-gray-500">
                  {getPerformanceIndicator(businessMetrics.total_portuguese_businesses, { excellent: 150, good: 100 }).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Pesquisas Diárias' : 'Daily Searches'}
                </h5>
                <p className="text-xl font-semibold text-blue-600">
                  {businessMetrics.search_queries_daily}
                </p>
                <p className="text-sm text-gray-500">
                  {businessMetrics.mobile_search_percentage}% mobile
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Taxa de Sucesso' : 'Discovery Success Rate'}
                </h5>
                <p className="text-xl font-semibold text-green-600">
                  {businessMetrics.user_discovery_success_rate}%
                </p>
                <p className="text-sm text-gray-500">
                  {getPerformanceIndicator(businessMetrics.user_discovery_success_rate, { excellent: 75, good: 60 }).label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* University Partnerships */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Parcerias Universitárias' : 'University Partnerships'}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* University Engagement Rates */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Engagement por Universidade' : 'University Engagement Rates'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(universityMetrics.university_engagement_rates)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([university, rate]) => (
                    <div key={university} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600">
                        {university.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${rate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm font-medium text-gray-900">
                        {rate}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Usage */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Utilização de Serviços' : 'Service Usage Breakdown'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(universityMetrics.service_usage_breakdown).map(([service, percentage]) => (
                    <div key={service} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600 capitalize">
                        {service === 'accommodation' ? (language === 'pt' ? 'Alojamento' : 'Accommodation') :
                         service === 'networking' ? (language === 'pt' ? 'Networking' : 'Networking') :
                         service === 'career_services' ? (language === 'pt' ? 'Carreira' : 'Career') :
                         service === 'mentorship' ? (language === 'pt' ? 'Mentoria' : 'Mentorship') : service}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
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

            {/* Student Metrics */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Estudantes Totais' : 'Total Students'}
                </h5>
                <p className="text-xl font-semibold text-primary-600">
                  {universityMetrics.total_student_members.toLocaleString()}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Taxa Alojamento' : 'Accommodation Rate'}
                </h5>
                <p className="text-xl font-semibold text-green-600">
                  {universityMetrics.accommodation_success_rate}%
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Colocação Carreira' : 'Career Placement'}
                </h5>
                <p className="text-xl font-semibold text-blue-600">
                  {universityMetrics.career_placement_rate}%
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-500 mb-1">
                  {language === 'pt' ? 'Participação Mentoria' : 'Mentorship Participation'}
                </h5>
                <p className="text-xl font-semibold text-purple-600">
                  {universityMetrics.mentorship_program_participation}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Language and Device Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {language === 'pt' ? 'Utilização Bilíngue' : 'Bilingual Usage'}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="3"
                      strokeDasharray={`${communityMetrics.bilingual_usage_ratio.pt}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-900">
                      {communityMetrics.bilingual_usage_ratio.pt}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'pt' ? 'Conteúdo em Português' : 'Portuguese Content'}
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">PT: {communityMetrics.bilingual_usage_ratio.pt}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">EN: {communityMetrics.bilingual_usage_ratio.en}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {language === 'pt' ? 'Dispositivos de Acesso' : 'Device Access'}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${communityMetrics.mobile_vs_desktop.mobile}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-900">
                      {communityMetrics.mobile_vs_desktop.mobile}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'pt' ? 'Acesso Mobile' : 'Mobile Access'}
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Mobile: {communityMetrics.mobile_vs_desktop.mobile}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Desktop: {communityMetrics.mobile_vs_desktop.desktop}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}