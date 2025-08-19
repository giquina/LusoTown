/**
 * Ad Revenue Dashboard Component
 * Real-time analytics for LusoTown ad monetization
 */

'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Calendar,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  PieChart,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RevenueStats {
  period: string;
  totals: {
    revenue: string;
    impressions: number;
    clicks: number;
    ctr: string;
    cpm: string;
  };
  networkPerformance: Array<{
    network_name: string;
    campaign_name: string;
    total_impressions: number;
    total_clicks: number;
    total_revenue: number;
    ctr: number;
  }>;
  portuguesePerformance: Array<{
    cultural_context: string;
    country_code: string;
    impressions: number;
    clicks: number;
    revenue: number;
    avg_cpm: number;
  }>;
  dailyData: Array<{
    date: string;
    total_impressions: number;
    total_clicks: number;
    total_revenue: number;
    portugal_revenue: number;
    brazil_revenue: number;
    uk_revenue: number;
    desktop_impressions: number;
    mobile_impressions: number;
    tablet_impressions: number;
  }>;
  currency: string;
}

interface CampaignStats {
  campaigns: Array<{
    id: string;
    name: string;
    campaign_type: string;
    status: string;
    current_impressions: number;
    current_clicks: number;
    current_spend: number;
    daily_budget: number;
    total_budget: number;
    target_audience: string;
    start_date: string;
    end_date: string;
    ad_networks: {
      name: string;
      type: string;
    };
    performance: {
      ctr: number;
      cpm: number;
      cpc: number;
    };
  }>;
}

export function AdRevenueDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [revenueStats, setRevenueStats] = useState<RevenueStats | null>(null);
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const streamingServerUrl = process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080';

  // Fetch revenue statistics
  const fetchRevenueStats = async (period: string = 'today') => {
    try {
      setLoading(true);
      const response = await fetch(`${streamingServerUrl}/api/ads/stats/revenue?period=${period}`);
      const data = await response.json();
      
      if (data.success) {
        setRevenueStats(data);
      } else {
        setError('Failed to fetch revenue stats');
      }
    } catch (err) {
      setError('Error fetching revenue statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch campaign statistics
  const fetchCampaignStats = async () => {
    try {
      const response = await fetch(`${streamingServerUrl}/api/ads/stats/campaigns`);
      const data = await response.json();
      
      if (data.success) {
        setCampaignStats(data);
      }
    } catch (err) {
      console.error('Error fetching campaign stats:', err);
    }
  };

  useEffect(() => {
    fetchRevenueStats(selectedPeriod);
    fetchCampaignStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchRevenueStats(selectedPeriod);
      fetchCampaignStats();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  // Format currency
  const formatCurrency = (amount: number | string, currency: string = 'GBP') => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(num);
  };

  // Format percentage
  const formatPercentage = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `${num.toFixed(2)}%`;
  };

  if (loading && !revenueStats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t({ pt: 'Carregando estatísticas...', en: 'Loading statistics...' })}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => fetchRevenueStats(selectedPeriod)}
            className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            {t({ pt: 'Tentar Novamente', en: 'Try Again' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t({ pt: 'Painel de Receita de Anúncios', en: 'Ad Revenue Dashboard' })}
          </h1>
          <p className="text-gray-600">
            {t({ 
              pt: 'Monitorização em tempo real da monetização da comunidade portuguesa', 
              en: 'Real-time monitoring of Portuguese community monetization' 
            })}
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200 w-fit">
            {[
              { value: 'today', label: { pt: 'Hoje', en: 'Today' } },
              { value: 'week', label: { pt: 'Esta Semana', en: 'This Week' } },
              { value: 'month', label: { pt: 'Este Mês', en: 'This Month' } }
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t(period.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        {revenueStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {t({ pt: 'Receita Total', en: 'Total Revenue' })}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(revenueStats.totals.revenue, revenueStats.currency)}
              </div>
              <p className="text-sm text-gray-600">
                {t({ pt: `Período: ${selectedPeriod}`, en: `Period: ${selectedPeriod}` })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {t({ pt: 'Impressões', en: 'Impressions' })}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {revenueStats.totals.impressions.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                CPM: {formatCurrency(revenueStats.totals.cpm, revenueStats.currency)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MousePointer className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {t({ pt: 'Cliques', en: 'Clicks' })}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {revenueStats.totals.clicks.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">
                CTR: {formatPercentage(revenueStats.totals.ctr)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {t({ pt: 'Performance', en: 'Performance' })}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatPercentage(revenueStats.totals.ctr)}
              </div>
              <p className="text-sm text-gray-600">
                {t({ pt: 'Taxa de Clique', en: 'Click-through Rate' })}
              </p>
            </motion.div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', icon: BarChart3, label: { pt: 'Visão Geral', en: 'Overview' } },
                { id: 'networks', icon: Globe, label: { pt: 'Redes de Anúncios', en: 'Ad Networks' } },
                { id: 'portuguese', icon: Calendar, label: { pt: 'Comunidade Portuguesa', en: 'Portuguese Community' } },
                { id: 'campaigns', icon: PieChart, label: { pt: 'Campanhas', en: 'Campaigns' } }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className={`-ml-0.5 mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {t(tab.label)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && revenueStats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t({ pt: 'Receita Diária', en: 'Daily Revenue' })}
                </h3>
                <div className="space-y-3">
                  {revenueStats.dailyData.slice(-7).map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{day.date}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(day.total_revenue, revenueStats.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t({ pt: 'Distribuição por Dispositivo', en: 'Device Distribution' })}
                </h3>
                <div className="space-y-4">
                  {revenueStats.dailyData.length > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Monitor className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm text-gray-700">Desktop</span>
                        </div>
                        <span className="text-sm font-medium">
                          {revenueStats.dailyData[0]?.desktop_impressions?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm text-gray-700">Mobile</span>
                        </div>
                        <span className="text-sm font-medium">
                          {revenueStats.dailyData[0]?.mobile_impressions?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Tablet className="w-5 h-5 text-gray-600 mr-2" />
                          <span className="text-sm text-gray-700">Tablet</span>
                        </div>
                        <span className="text-sm font-medium">
                          {revenueStats.dailyData[0]?.tablet_impressions?.toLocaleString() || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'networks' && revenueStats && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t({ pt: 'Performance das Redes de Anúncios', en: 'Ad Network Performance' })}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Rede', en: 'Network' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Campanha', en: 'Campaign' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Impressões', en: 'Impressions' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Cliques', en: 'Clicks' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Receita', en: 'Revenue' })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {revenueStats.networkPerformance.map((network, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {network.network_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {network.campaign_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {network.total_impressions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {network.total_clicks.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatPercentage(network.ctr)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(network.total_revenue, revenueStats.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'portuguese' && revenueStats && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t({ pt: 'Performance da Comunidade Portuguesa', en: 'Portuguese Community Performance' })}
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {revenueStats.dailyData.length > 0 && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">
                          {formatCurrency(revenueStats.dailyData[0]?.portugal_revenue || 0, revenueStats.currency)}
                        </div>
                        <p className="text-sm text-gray-600">🇵🇹 Portugal</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {formatCurrency(revenueStats.dailyData[0]?.brazil_revenue || 0, revenueStats.currency)}
                        </div>
                        <p className="text-sm text-gray-600">🇧🇷 Brasil</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {formatCurrency(revenueStats.dailyData[0]?.uk_revenue || 0, revenueStats.currency)}
                        </div>
                        <p className="text-sm text-gray-600">🇬🇧 Reino Unido</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {formatCurrency((revenueStats.dailyData[0]?.total_revenue || 0) - (revenueStats.dailyData[0]?.portugal_revenue || 0) - (revenueStats.dailyData[0]?.brazil_revenue || 0) - (revenueStats.dailyData[0]?.uk_revenue || 0), revenueStats.currency)}
                        </div>
                        <p className="text-sm text-gray-600">🌍 {t({ pt: 'Outros', en: 'Others' })}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t({ pt: 'Contexto Cultural', en: 'Cultural Context' })}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t({ pt: 'País', en: 'Country' })}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t({ pt: 'Impressões', en: 'Impressions' })}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t({ pt: 'Receita', en: 'Revenue' })}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CPM
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {revenueStats.portuguesePerformance.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.cultural_context}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.country_code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.impressions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {formatCurrency(item.revenue, revenueStats.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatCurrency(item.avg_cpm, revenueStats.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && campaignStats && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t({ pt: 'Campanhas Ativas', en: 'Active Campaigns' })}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Campanha', en: 'Campaign' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Tipo', en: 'Type' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Status', en: 'Status' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Impressões', en: 'Impressions' })}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CPM
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t({ pt: 'Gasto', en: 'Spent' })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaignStats.campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.ad_networks.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {campaign.campaign_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            campaign.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : campaign.status === 'paused'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {campaign.current_impressions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatPercentage(campaign.performance.ctr)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatCurrency(campaign.performance.cpm)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(campaign.current_spend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}