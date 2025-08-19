'use client'

import React, { useState } from 'react';
import { AdRevenueDashboard } from '@/components/AdRevenueDashboard';
import { AdNetworkConfiguration } from '@/components/AdNetworkConfiguration';
import { useLanguage } from '@/context/LanguageContext';
import { DollarSign, Settings, BarChart3, Users, Calendar } from 'lucide-react';

export default function AdRevenueAdminPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: { pt: 'Painel de Receita', en: 'Revenue Dashboard' },
      icon: BarChart3,
      component: AdRevenueDashboard
    },
    {
      id: 'networks',
      label: { pt: 'Configuração de Redes', en: 'Network Configuration' },
      icon: Settings,
      component: AdNetworkConfiguration
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdRevenueDashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                  {t({ pt: 'Sistema de Receita de Anúncios', en: 'Ad Revenue System' })}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {t({ 
                    pt: 'Gestão e monitorização da monetização da comunidade portuguesa', 
                    en: 'Portuguese community monetization management and monitoring' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {t({ pt: 'Sistema de Anúncios', en: 'Ad System' })}
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    {t({ pt: 'Ativo', en: 'Active' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </div>
    </div>
  );
}