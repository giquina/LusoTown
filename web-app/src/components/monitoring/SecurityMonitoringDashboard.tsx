'use client'

/**
 * Security Monitoring Dashboard for Portuguese Community Platform
 * 
 * Real-time security monitoring with focus on protecting Portuguese-speaking
 * community features, rate limiting effectiveness, and cultural content security.
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SecurityMetrics {
  blocked_attacks_24h: number;
  rate_limit_violations: number;
  xss_attempts_blocked: number;
  csrf_attempts_blocked: number;
  sql_injection_attempts: number;
  portuguese_content_security_score: number;
  user_input_validation_success_rate: number;
  session_security_compliance: number;
}

interface ThreatAnalysis {
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  active_threats: number;
  geo_threat_distribution: Record<string, number>;
  target_features: Record<string, number>;
  common_attack_vectors: Record<string, number>;
}

interface RateLimitingMetrics {
  api_requests_24h: number;
  rate_limited_requests: number;
  suspicious_patterns_detected: number;
  portuguese_community_protection_rate: number;
  automated_bot_blocks: number;
  legitimate_user_protection: number;
}

interface AccessibilitySecurityMetrics {
  screen_reader_access_security: number;
  keyboard_navigation_security: number;
  portuguese_accessibility_compliance: number;
  wcag_security_alignment: number;
}

export default function SecurityMonitoringDashboard() {
  const { t, language } = useLanguage();
  
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    blocked_attacks_24h: 47,
    rate_limit_violations: 123,
    xss_attempts_blocked: 28,
    csrf_attempts_blocked: 15,
    sql_injection_attempts: 3,
    portuguese_content_security_score: 94.7,
    user_input_validation_success_rate: 99.2,
    session_security_compliance: 98.1
  });

  const [threatAnalysis, setThreatAnalysis] = useState<ThreatAnalysis>({
    threat_level: 'low',
    active_threats: 2,
    geo_threat_distribution: {
      'unknown': 45,
      'suspicious_automated': 28,
      'potential_bot_network': 18,
      'confirmed_malicious': 9
    },
    target_features: {
      'business_directory': 35,
      'user_authentication': 28,
      'event_booking': 20,
      'portuguese_content': 12,
      'streaming_service': 5
    },
    common_attack_vectors: {
      'brute_force_login': 42,
      'automated_scraping': 31,
      'xss_attempts': 15,
      'sql_injection': 8,
      'csrf_attacks': 4
    }
  });

  const [rateLimitingMetrics, setRateLimitingMetrics] = useState<RateLimitingMetrics>({
    api_requests_24h: 15420,
    rate_limited_requests: 234,
    suspicious_patterns_detected: 67,
    portuguese_community_protection_rate: 98.9,
    automated_bot_blocks: 156,
    legitimate_user_protection: 99.7
  });

  const [accessibilityMetrics, setAccessibilityMetrics] = useState<AccessibilitySecurityMetrics>({
    screen_reader_access_security: 96.8,
    keyboard_navigation_security: 94.2,
    portuguese_accessibility_compliance: 92.5,
    wcag_security_alignment: 95.1
  });

  const [loading, setLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshSecurityMetrics = async () => {
    setLoading(true);
    try {
      // In production, fetch real security metrics
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate security metric updates
      setSecurityMetrics(prev => ({
        ...prev,
        blocked_attacks_24h: prev.blocked_attacks_24h + Math.floor(Math.random() * 5),
        rate_limit_violations: prev.rate_limit_violations + Math.floor(Math.random() * 10)
      }));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh security metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-refresh every 60 seconds for security monitoring
    const interval = setInterval(refreshSecurityMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSecurityStatus = (score: number) => {
    if (score >= 95) return { color: 'text-green-600', label: language === 'pt' ? 'Excelente' : 'Excellent' };
    if (score >= 85) return { color: 'text-yellow-600', label: language === 'pt' ? 'Bom' : 'Good' };
    if (score >= 70) return { color: 'text-orange-600', label: language === 'pt' ? 'Precisa Atenção' : 'Needs Attention' };
    return { color: 'text-red-600', label: language === 'pt' ? 'Crítico' : 'Critical' };
  };

  const timeframeLabels = {
    '1h': language === 'pt' ? 'Última hora' : 'Last hour',
    '24h': language === 'pt' ? 'Últimas 24h' : 'Last 24h',
    '7d': language === 'pt' ? 'Última semana' : 'Last week',
    '30d': language === 'pt' ? 'Último mês' : 'Last month'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? 'Monitorização de Segurança' : 'Security Monitoring'}
              </h1>
              <p className="text-lg text-gray-600">
                {language === 'pt' 
                  ? 'Proteção da comunidade portuguesa em tempo real'
                  : 'Real-time Portuguese community protection'
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
                onClick={refreshSecurityMetrics}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {language === 'pt' ? 'Atualizando...' : 'Refreshing...'}
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {language === 'pt' ? 'Atualizar' : 'Refresh'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Threat Level Alert */}
        <div className={`rounded-lg border p-4 mb-8 ${getThreatLevelColor(threatAnalysis.threat_level)}`}>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.351-.166-2A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-medium">
                {language === 'pt' ? 'Nível de Ameaça Atual' : 'Current Threat Level'}: {threatAnalysis.threat_level.toUpperCase()}
              </h3>
              <p className="text-sm">
                {threatAnalysis.active_threats} {language === 'pt' ? 'ameaças ativas detectadas' : 'active threats detected'} | 
                {language === 'pt' ? 'Última atualização' : 'Last updated'}: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Security Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Ataques Bloqueados (24h)' : 'Blocked Attacks (24h)'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {securityMetrics.blocked_attacks_24h}
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
                  <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Violações Rate Limit' : 'Rate Limit Violations'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {securityMetrics.rate_limit_violations}
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
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Validação Input' : 'Input Validation'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {securityMetrics.user_input_validation_success_rate}%
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
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {language === 'pt' ? 'Proteção Comunidade' : 'Community Protection'}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {rateLimitingMetrics.portuguese_community_protection_rate}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attack Analysis */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Análise de Ataques' : 'Attack Analysis'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Attack Vectors */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Vetores de Ataque Comuns' : 'Common Attack Vectors'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(threatAnalysis.common_attack_vectors).map(([vector, percentage]) => (
                    <div key={vector} className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">
                        {vector === 'brute_force_login' ? (language === 'pt' ? 'Login Força Bruta' : 'Brute Force Login') :
                         vector === 'automated_scraping' ? (language === 'pt' ? 'Scraping Automatizado' : 'Automated Scraping') :
                         vector === 'xss_attempts' ? (language === 'pt' ? 'Tentativas XSS' : 'XSS Attempts') :
                         vector === 'sql_injection' ? (language === 'pt' ? 'Injeção SQL' : 'SQL Injection') :
                         vector === 'csrf_attacks' ? (language === 'pt' ? 'Ataques CSRF' : 'CSRF Attacks') : vector}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
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

              {/* Target Features */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">
                  {language === 'pt' ? 'Funcionalidades Visadas' : 'Targeted Features'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(threatAnalysis.target_features).map(([feature, percentage]) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-32 text-sm text-gray-600">
                        {feature === 'business_directory' ? (language === 'pt' ? 'Diretório Negócios' : 'Business Directory') :
                         feature === 'user_authentication' ? (language === 'pt' ? 'Autenticação' : 'Authentication') :
                         feature === 'event_booking' ? (language === 'pt' ? 'Reserva Eventos' : 'Event Booking') :
                         feature === 'portuguese_content' ? (language === 'pt' ? 'Conteúdo PT' : 'Portuguese Content') :
                         feature === 'streaming_service' ? (language === 'pt' ? 'Streaming' : 'Streaming') : feature}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500"
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

        {/* Rate Limiting & Protection */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Rate Limiting e Proteção' : 'Rate Limiting & Protection'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Requisições API (24h)' : 'API Requests (24h)'}
                </h4>
                <p className="text-2xl font-semibold text-blue-600">
                  {rateLimitingMetrics.api_requests_24h.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {rateLimitingMetrics.rate_limited_requests} {language === 'pt' ? 'limitadas' : 'limited'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Padrões Suspeitos' : 'Suspicious Patterns'}
                </h4>
                <p className="text-2xl font-semibold text-orange-600">
                  {rateLimitingMetrics.suspicious_patterns_detected}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Detectados e bloqueados' : 'Detected and blocked'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Bots Bloqueados' : 'Blocked Bots'}
                </h4>
                <p className="text-2xl font-semibold text-red-600">
                  {rateLimitingMetrics.automated_bot_blocks}
                </p>
                <p className="text-sm text-gray-500">
                  {rateLimitingMetrics.legitimate_user_protection}% {language === 'pt' ? 'proteção utilizadores' : 'user protection'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portuguese Content Security */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Segurança do Conteúdo Português' : 'Portuguese Content Security'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Score Segurança Conteúdo' : 'Content Security Score'}
                </h4>
                <p className="text-2xl font-semibold text-green-600">
                  {securityMetrics.portuguese_content_security_score}%
                </p>
                <p className={`text-sm ${getSecurityStatus(securityMetrics.portuguese_content_security_score).color}`}>
                  {getSecurityStatus(securityMetrics.portuguese_content_security_score).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'XSS Bloqueados' : 'XSS Blocked'}
                </h4>
                <p className="text-2xl font-semibold text-yellow-600">
                  {securityMetrics.xss_attempts_blocked}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Últimas 24h' : 'Last 24h'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'CSRF Bloqueados' : 'CSRF Blocked'}
                </h4>
                <p className="text-2xl font-semibold text-purple-600">
                  {securityMetrics.csrf_attempts_blocked}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Últimas 24h' : 'Last 24h'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'SQL Injection' : 'SQL Injection'}
                </h4>
                <p className="text-2xl font-semibold text-red-600">
                  {securityMetrics.sql_injection_attempts}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Tentativas bloqueadas' : 'Attempts blocked'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Security */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              {language === 'pt' ? 'Segurança de Acessibilidade' : 'Accessibility Security'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Screen Reader Seguro' : 'Screen Reader Security'}
                </h4>
                <p className="text-2xl font-semibold text-blue-600">
                  {accessibilityMetrics.screen_reader_access_security}%
                </p>
                <p className={`text-sm ${getSecurityStatus(accessibilityMetrics.screen_reader_access_security).color}`}>
                  {getSecurityStatus(accessibilityMetrics.screen_reader_access_security).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Navegação Teclado' : 'Keyboard Navigation'}
                </h4>
                <p className="text-2xl font-semibold text-green-600">
                  {accessibilityMetrics.keyboard_navigation_security}%
                </p>
                <p className={`text-sm ${getSecurityStatus(accessibilityMetrics.keyboard_navigation_security).color}`}>
                  {getSecurityStatus(accessibilityMetrics.keyboard_navigation_security).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'Compliance Português' : 'Portuguese Compliance'}
                </h4>
                <p className="text-2xl font-semibold text-primary-600">
                  {accessibilityMetrics.portuguese_accessibility_compliance}%
                </p>
                <p className={`text-sm ${getSecurityStatus(accessibilityMetrics.portuguese_accessibility_compliance).color}`}>
                  {getSecurityStatus(accessibilityMetrics.portuguese_accessibility_compliance).label}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'pt' ? 'WCAG Alinhamento' : 'WCAG Alignment'}
                </h4>
                <p className="text-2xl font-semibold text-yellow-600">
                  {accessibilityMetrics.wcag_security_alignment}%
                </p>
                <p className={`text-sm ${getSecurityStatus(accessibilityMetrics.wcag_security_alignment).color}`}>
                  {getSecurityStatus(accessibilityMetrics.wcag_security_alignment).label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}