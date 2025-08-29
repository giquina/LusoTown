'use client'

/**
 * Main Monitoring Dashboard for Portuguese Community Platform
 * 
 * Integrated dashboard hub providing access to all monitoring dashboards
 * with Portuguese community-specific metrics and real-time alerts.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PerformanceMonitoringDashboard from './monitoring/PerformanceMonitoringDashboard';
import CommunityAnalyticsDashboard from './monitoring/CommunityAnalyticsDashboard';
import SecurityMonitoringDashboard from './monitoring/SecurityMonitoringDashboard';
import MobilePerformanceDashboard from './monitoring/MobilePerformanceDashboard';

type DashboardView = 'overview' | 'performance' | 'community' | 'security' | 'mobile';

interface PlatformStatus {
  overall_health: 'healthy' | 'warning' | 'critical';
  active_alerts: number;
  portuguese_community_satisfaction: number;
  system_uptime: number;
  mobile_performance_score: number;
  security_threat_level: 'low' | 'medium' | 'high' | 'critical';
}

interface AlertItem {
  id: string;
  type: 'performance' | 'security' | 'community' | 'mobile';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  portuguese_impact: boolean;
}

export default function MonitoringDashboard() {
  const { t, language } = useLanguage();
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [loading, setLoading] = useState(false);
  
  const [platformStatus, setPlatformStatus] = useState<PlatformStatus>({
    overall_health: 'healthy',
    active_alerts: 2,
    portuguese_community_satisfaction: 87.3,
    system_uptime: 99.9,
    mobile_performance_score: 91.2,
    security_threat_level: 'low'
  });

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      type: 'performance',
      severity: 'medium',
      title: language === 'pt' ? 'Tempo de resposta elevado' : 'High response time',
      description: language === 'pt' ? 'API do diretório de negócios com 1.2s de resposta' : 'Business directory API responding at 1.2s',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      portuguese_impact: true
    },
    {
      id: '2',
      type: 'security',
      severity: 'low',
      title: language === 'pt' ? 'Tentativas de login suspeitas' : 'Suspicious login attempts',
      description: language === 'pt' ? '47 tentativas bloqueadas nas últimas 24h' : '47 attempts blocked in last 24h',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      portuguese_impact: false
    }
  ]);

  const refreshPlatformStatus = async () => {
    setLoading(true);
    try {
      // In production, fetch real platform status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate status updates
      setPlatformStatus(prev => ({
        ...prev,
        portuguese_community_satisfaction: Math.max(80, prev.portuguese_community_satisfaction + (Math.random() * 4 - 2))
      }));
      
    } catch (error) {
      console.error('Failed to refresh platform status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshPlatformStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getHealthStatusColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const dashboardTabs = [
    {
      id: 'overview' as DashboardView,
      label: language === 'pt' ? 'Visão Geral' : 'Overview',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    {
      id: 'performance' as DashboardView,
      label: language === 'pt' ? 'Performance' : 'Performance',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'community' as DashboardView,
      label: language === 'pt' ? 'Comunidade' : 'Community',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    },
    {
      id: 'security' as DashboardView,
      label: language === 'pt' ? 'Segurança' : 'Security',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'mobile' as DashboardView,
      label: language === 'pt' ? 'Mobile' : 'Mobile',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V7zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
        </svg>
      )
    }
  ];

  const renderDashboardContent = () => {
    switch (activeView) {
      case 'performance':
        return <PerformanceMonitoringDashboard />;
      case 'community':
        return <CommunityAnalyticsDashboard />;
      case 'security':
        return <SecurityMonitoringDashboard />;
      case 'mobile':
        return <MobilePerformanceDashboard />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Platform Health Status */}
      <div className={`rounded-lg border p-6 ${getHealthStatusColor(platformStatus.overall_health)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium mb-1">
              {language === 'pt' ? 'Estado Geral da Plataforma' : 'Overall Platform Health'}
            </h3>
            <p className="text-sm">
              {language === 'pt' ? 'Saúde do sistema e comunidade portuguesa' : 'System and Portuguese community health'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold mb-1">
              {platformStatus.overall_health.toUpperCase()}
            </div>
            <div className="text-sm">
              {platformStatus.system_uptime}% {language === 'pt' ? 'uptime' : 'uptime'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {language === 'pt' ? 'Satisfação Comunidade' : 'Community Satisfaction'}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {platformStatus.portuguese_community_satisfaction.toFixed(1)}%
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
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1V7zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {language === 'pt' ? 'Performance Mobile' : 'Mobile Performance'}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {platformStatus.mobile_performance_score}%
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
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {language === 'pt' ? 'Nível Segurança' : 'Security Level'}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900 uppercase">
                    {platformStatus.security_threat_level}
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
                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {language === 'pt' ? 'Alertas Ativos' : 'Active Alerts'}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {platformStatus.active_alerts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Alertas Ativos' : 'Active Alerts'}
            </h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.portuguese_impact && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {language === 'pt' ? 'Impacto PT' : 'PT Impact'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {alert.timestamp.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                      </p>
                    </div>
                    <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      {language === 'pt' ? 'Resolver' : 'Resolve'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            {language === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardTabs.slice(1).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className="inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <div className="mr-3">
                  {tab.icon}
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (activeView !== 'overview') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => setActiveView('overview')}
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    ← {language === 'pt' ? 'Voltar à Visão Geral' : 'Back to Overview'}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeView === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="mr-2">
                      {tab.icon}
                    </div>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {renderDashboardContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? 'Centro de Monitorização' : 'Monitoring Center'}
              </h1>
              <p className="text-lg text-gray-600">
                {language === 'pt' 
                  ? 'Monitorização abrangente da plataforma da comunidade portuguesa'
                  : 'Comprehensive Portuguese community platform monitoring'
                }
              </p>
            </div>
            
            <button
              onClick={refreshPlatformStatus}
              disabled={loading}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
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
                  {language === 'pt' ? 'Atualizar Estado' : 'Refresh Status'}
                </>
              )}
            </button>
          </div>
        </div>

        {renderDashboardContent()}
      </div>
    </div>
  );
}