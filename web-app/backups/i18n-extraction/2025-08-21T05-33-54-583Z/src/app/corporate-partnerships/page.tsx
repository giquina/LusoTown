'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'
import CorporatePartnershipProgram from '@/components/CorporatePartnershipProgram'
import PartnershipIntegrationDashboard from '@/components/PartnershipIntegrationDashboard'
import {
  BuildingOffice2Icon,
  CalculatorIcon,
  ChartBarIcon,
  HandRaisedIcon,
  TrophyIcon,
  CurrencyPoundIcon,
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

type TabType = 'overview' | 'calculator' | 'dashboard'

export default function CorporatePartnerships() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs = [
    {
      id: 'overview' as TabType,
      name: language === 'pt' ? 'Visão Geral' : 'Overview',
      icon: <HandRaisedIcon className="w-5 h-5" />,
      description: language === 'pt' ? 'Programas de parceria e benefícios' : 'Partnership programs and benefits'
    },
    {
      id: 'calculator' as TabType,
      name: language === 'pt' ? 'Calculadora ROI' : 'ROI Calculator',
      icon: <CalculatorIcon className="w-5 h-5" />,
      description: language === 'pt' ? 'Calcule o retorno do investimento' : 'Calculate return on investment'
    },
    {
      id: 'dashboard' as TabType,
      name: language === 'pt' ? 'Painel de Gestão' : 'Management Dashboard',
      icon: <ChartBarIcon className="w-5 h-5" />,
      description: language === 'pt' ? 'Gerir parcerias existentes' : 'Manage existing partnerships'
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CorporatePartnershipProgram />
      case 'calculator':
        return <div className="p-8 text-center text-gray-500">Partnership calculator component removed</div>
      case 'dashboard':
        return <PartnershipIntegrationDashboard />
      default:
        return <CorporatePartnershipProgram />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <BuildingOffice2Icon className="w-16 h-16 text-white opacity-80 mr-4" />
                <h1 className="text-5xl font-bold">
                  {language === 'pt' 
                    ? 'Parcerias Corporativas'
                    : 'Corporate Partnerships'
                  }
                </h1>
              </div>
              <p className="text-xl opacity-90 max-w-4xl mx-auto mb-8">
                {language === 'pt'
                  ? 'Conecte-se ao mercado português de £450M no Reino Unido. Parcerias estratégicas para empresas que valorizam autenticidade, crescimento e impacto na comunidade lusófona.'
                  : 'Connect to the £450M Portuguese market in the UK. Strategic partnerships for businesses that value authenticity, growth, and impact in the Portuguese-speaking community.'
                }
              </p>
              
              {/* Key Value Propositions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserGroupIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">450,000+</h3>
                  <p className="text-sm opacity-75">
                    {language === 'pt' ? 'Portugueses no Reino Unido' : 'Portuguese in the UK'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CurrencyPoundIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">£450M</h3>
                  <p className="text-sm opacity-75">
                    {language === 'pt' ? 'Poder de Compra Anual' : 'Annual Spending Power'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrophyIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">380%</h3>
                  <p className="text-sm opacity-75">
                    {language === 'pt' ? 'ROI Médio dos Parceiros' : 'Average Partner ROI'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Success Stories Banner */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? 'Parceiros de Confiança' : 'Trusted Partners'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">Millennium Bank</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Serviços Bancários' : 'Banking Services'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">Instituto Camões</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Educação Cultural' : 'Cultural Education'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">TAP Air Portugal</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Viagens' : 'Travel'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">Portugal Foods UK</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Alimentação' : 'Food & Beverage'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">Anglo-Portuguese Society</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Relações Diplomáticas' : 'Diplomatic Relations'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700">Portuguese Embassy</div>
                  <div className="text-sm text-gray-500">
                    {language === 'pt' ? 'Oficiais' : 'Official'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
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
                    <span className={`mr-2 ${
                      activeTab === tab.id ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      {tab.icon}
                    </span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-screen">
          {renderTabContent()}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <SparklesIcon className="w-16 h-16 mx-auto mb-6 text-accent-400" />
              <h2 className="text-3xl font-bold mb-4">
                {language === 'pt' 
                  ? 'Transforme o Seu Negócio com Parcerias Estratégicas'
                  : 'Transform Your Business with Strategic Partnerships'
                }
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                {language === 'pt'
                  ? 'Junte-se a empresas líderes que já descobriram o valor do mercado português no Reino Unido. Parcerias que geram resultados reais.'
                  : 'Join leading companies that have already discovered the value of the Portuguese market in the UK. Partnerships that deliver real results.'
                }
              </p>
              
              {/* Key Partnership Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex items-center justify-center space-x-3">
                  <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                  <span className="text-lg">
                    {language === 'pt' ? 'Acesso Exclusivo à Comunidade' : 'Exclusive Community Access'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                  <span className="text-lg">
                    {language === 'pt' ? 'ROI Médio de 380%' : 'Average ROI of 380%'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                  <span className="text-lg">
                    {language === 'pt' ? 'Suporte Cultural Especializado' : 'Expert Cultural Support'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:partnerships@lusotown.com"
                  className="inline-flex items-center bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <HandRaisedIcon className="w-5 h-5 mr-2" />
                  {language === 'pt' ? 'Iniciar Parceria' : 'Start Partnership'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="inline-flex items-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <CalculatorIcon className="w-5 h-5 mr-2" />
                  {language === 'pt' ? 'Calcular ROI' : 'Calculate ROI'}
                </button>
              </div>
              
              <div className="mt-8 text-sm text-gray-400">
                <p>partnerships@lusotown.com • +44 (0) 20 7845 4032</p>
                <p className="mt-2">
                  {language === 'pt' 
                    ? 'Resposta garantida em 24 horas • Consulta inicial gratuita'
                    : 'Guaranteed 24-hour response • Free initial consultation'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}