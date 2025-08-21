'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  BoltIcon,
  HeartIcon,
  StarIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { predictiveCommunityAnalytics } from '@/lib/ai/PredictiveCommunityAnalytics'

interface AnalyticsData {
  communityHealth: {
    overall: number
    engagement: number
    cultural: number
    growth: number
    retention: number
  }
  churnPredictions: {
    high: number
    medium: number
    low: number
    totalAtRisk: number
  }
  growthForecasts: {
    nextMonth: number
    nextQuarter: number
    yearEnd: number
    confidence: number
  }
  eventSuccessPredictions: {
    upcoming: Array<{
      id: string
      name: string
      successProbability: number
      expectedAttendance: number
      culturalResonance: number
    }>
  }
  culturalInsights: {
    saudadeIntensity: number
    languagePreservation: number
    generationalBridge: number
    culturalAuthenticity: number
  }
  businessIntelligence: {
    marketDemand: {
      transport: number
      events: number
      housing: number
      networking: number
    }
    revenueOptimization: {
      currentMRR: number
      projectedMRR: number
      churnSavings: number
      upsellOpportunity: number
    }
    geographicGrowth: {
      london: number
      manchester: number
      birmingham: number
      other: number
    }
  }
}

export default function PredictiveAnalyticsDashboard() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    try {
      // Simulate loading predictive analytics data
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockData: AnalyticsData = {
        communityHealth: {
          overall: 78,
          engagement: 82,
          cultural: 85,
          growth: 74,
          retention: 79
        },
        churnPredictions: {
          high: 12,
          medium: 24,
          low: 156,
          totalAtRisk: 36
        },
        growthForecasts: {
          nextMonth: 15,
          nextQuarter: 45,
          yearEnd: 180,
          confidence: 87
        },
        eventSuccessPredictions: {
          upcoming: [
            {
              id: '1',
              name: 'Fado Night em Stockwell',
              successProbability: 92,
              expectedAttendance: 48,
              culturalResonance: 95
            },
            {
              id: '2', 
              name: 'Portuguese Business Networking',
              successProbability: 78,
              expectedAttendance: 32,
              culturalResonance: 72
            },
            {
              id: '3',
              name: 'Santos Populares Celebration',
              successProbability: 96,
              expectedAttendance: 125,
              culturalResonance: 98
            }
          ]
        },
        culturalInsights: {
          saudadeIntensity: 72,
          languagePreservation: 68,
          generationalBridge: 81,
          culturalAuthenticity: 89
        },
        businessIntelligence: {
          marketDemand: {
            transport: 85,
            events: 92,
            housing: 74,
            networking: 88
          },
          revenueOptimization: {
            currentMRR: 4200,
            projectedMRR: 5800,
            churnSavings: 850,
            upsellOpportunity: 1200
          },
          geographicGrowth: {
            london: 78,
            manchester: 12,
            birmingham: 8,
            other: 15
          }
        }
      }
      
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Error loading analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isPortuguese ? 'Carregando análises preditivas...' : 'Loading predictive analytics...'}
          </p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          {isPortuguese ? 'Erro ao carregar dados' : 'Error loading data'}
        </p>
      </div>
    )
  }

  const tabs = [
    {
      id: 'overview',
      name: isPortuguese ? 'Visão Geral' : 'Overview',
      icon: ChartBarIcon
    },
    {
      id: 'community',
      name: isPortuguese ? 'Saúde Comunitária' : 'Community Health',
      icon: HeartIcon
    },
    {
      id: 'growth',
      name: isPortuguese ? 'Previsões de Crescimento' : 'Growth Forecasts',
      icon: ArrowTrendingUpIcon
    },
    {
      id: 'events',
      name: isPortuguese ? 'Sucesso de Eventos' : 'Event Success',
      icon: CalendarDaysIcon
    },
    {
      id: 'business',
      name: isPortuguese ? 'Inteligência de Negócio' : 'Business Intelligence',
      icon: CurrencyPoundIcon
    },
    {
      id: 'cultural',
      name: isPortuguese ? 'Insights Culturais' : 'Cultural Insights',
      icon: GlobeEuropeAfricaIcon
    }
  ]

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSuccessColor = (probability: number) => {
    if (probability >= 90) return 'text-green-600'
    if (probability >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-lg">
              <BoltIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isPortuguese ? 'Análises Preditivas da Comunidade' : 'Predictive Community Analytics'}
              </h1>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Insights de IA para otimização da comunidade portuguesa' 
                  : 'AI-powered insights for Portuguese community optimization'
                }
              </p>
            </div>
          </div>

          {/* Community Health Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isPortuguese ? 'Saúde Geral da Comunidade' : 'Overall Community Health'}
              </h2>
              <div className={`px-4 py-2 rounded-full text-lg font-bold ${getHealthColor(analyticsData.communityHealth.overall)}`}>
                {analyticsData.communityHealth.overall}%
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'engagement', label: isPortuguese ? 'Engajamento' : 'Engagement', icon: UserGroupIcon },
                { key: 'cultural', label: isPortuguese ? 'Cultural' : 'Cultural', icon: GlobeEuropeAfricaIcon },
                { key: 'growth', label: isPortuguese ? 'Crescimento' : 'Growth', icon: ArrowTrendingUpIcon },
                { key: 'retention', label: isPortuguese ? 'Retenção' : 'Retention', icon: HeartIcon }
              ].map((metric) => (
                <div key={metric.key} className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <metric.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {analyticsData.communityHealth[metric.key as keyof typeof analyticsData.communityHealth]}%
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Churn Risk Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isPortuguese ? 'Previsão de Churn' : 'Churn Prediction'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Alto Risco' : 'High Risk'}</span>
                    <span className="text-2xl font-bold text-red-600">{analyticsData.churnPredictions.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Médio Risco' : 'Medium Risk'}</span>
                    <span className="text-2xl font-bold text-yellow-600">{analyticsData.churnPredictions.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Baixo Risco' : 'Low Risk'}</span>
                    <span className="text-2xl font-bold text-green-600">{analyticsData.churnPredictions.low}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">
                    <strong>{analyticsData.churnPredictions.totalAtRisk}</strong> {isPortuguese ? 'membros necessitam intervenção imediata' : 'members need immediate intervention'}
                  </p>
                </div>
              </motion.div>

              {/* Growth Forecasts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isPortuguese ? 'Previsões de Crescimento' : 'Growth Forecasts'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Próximo Mês' : 'Next Month'}</span>
                    <span className="text-2xl font-bold text-green-600">+{analyticsData.growthForecasts.nextMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Próximo Trimestre' : 'Next Quarter'}</span>
                    <span className="text-2xl font-bold text-green-600">+{analyticsData.growthForecasts.nextQuarter}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Final do Ano' : 'Year End'}</span>
                    <span className="text-2xl font-bold text-green-600">+{analyticsData.growthForecasts.yearEnd}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    {analyticsData.growthForecasts.confidence}% {isPortuguese ? 'confiança na previsão' : 'confidence in forecast'}
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(analyticsData.communityHealth).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${getHealthColor(value)}`}>
                      <span className="text-2xl font-bold">{value}%</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {isPortuguese ? {
                        overall: 'Geral',
                        engagement: 'Engajamento',
                        cultural: 'Cultural',
                        growth: 'Crescimento',
                        retention: 'Retenção'
                      }[key] : key}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {value >= 80 ? (isPortuguese ? 'Excelente' : 'Excellent') :
                       value >= 60 ? (isPortuguese ? 'Bom' : 'Good') :
                       (isPortuguese ? 'Necessita atenção' : 'Needs attention')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              {analyticsData.eventSuccessPredictions.upcoming.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.successProbability >= 90 ? 'bg-green-100 text-green-800' :
                      event.successProbability >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.successProbability}% {isPortuguese ? 'sucesso' : 'success'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <UserGroupIcon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">{event.expectedAttendance}</div>
                      <div className="text-sm text-gray-600">{isPortuguese ? 'Participantes esperados' : 'Expected attendees'}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <GlobeEuropeAfricaIcon className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">{event.culturalResonance}%</div>
                      <div className="text-sm text-gray-600">{isPortuguese ? 'Ressonância cultural' : 'Cultural resonance'}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <StarIcon className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-900">{event.successProbability}%</div>
                      <div className="text-sm text-gray-600">{isPortuguese ? 'Probabilidade de sucesso' : 'Success probability'}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'business' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Market Demand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {isPortuguese ? 'Demanda do Mercado' : 'Market Demand'}
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(analyticsData.businessIntelligence.marketDemand).map(([service, demand]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">
                        {isPortuguese ? {
                          transport: 'Transporte',
                          events: 'Eventos',
                          housing: 'Habitação',
                          networking: 'Networking'
                        }[service] : service}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${demand}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{demand}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Revenue Optimization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {isPortuguese ? 'Otimização de Receita' : 'Revenue Optimization'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'MRR Atual' : 'Current MRR'}</span>
                    <span className="text-xl font-bold text-gray-900">£{analyticsData.businessIntelligence.revenueOptimization.currentMRR}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'MRR Projetada' : 'Projected MRR'}</span>
                    <span className="text-xl font-bold text-green-600">£{analyticsData.businessIntelligence.revenueOptimization.projectedMRR}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Economia Churn' : 'Churn Savings'}</span>
                    <span className="text-xl font-bold text-blue-600">£{analyticsData.businessIntelligence.revenueOptimization.churnSavings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isPortuguese ? 'Oportunidade Upsell' : 'Upsell Opportunity'}</span>
                    <span className="text-xl font-bold text-purple-600">£{analyticsData.businessIntelligence.revenueOptimization.upsellOpportunity}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    {isPortuguese 
                      ? 'Potencial de crescimento de receita: 38%' 
                      : 'Revenue growth potential: 38%'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'cultural' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(analyticsData.culturalInsights).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <GlobeEuropeAfricaIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isPortuguese ? {
                        saudadeIntensity: 'Intensidade Saudade',
                        languagePreservation: 'Preservação Linguística',
                        generationalBridge: 'Ponte Geracional',
                        culturalAuthenticity: 'Autenticidade Cultural'
                      }[key] : key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full transition-all duration-1000" 
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{value}%</span>
                  </div>
                  
                  <p className="text-gray-600 mt-4 text-sm">
                    {value >= 80 ? (isPortuguese ? 'Muito forte na comunidade' : 'Very strong in community') :
                     value >= 60 ? (isPortuguese ? 'Presente na comunidade' : 'Present in community') :
                     (isPortuguese ? 'Necessita fortalecimento' : 'Needs strengthening')}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'growth' && (
            <div className="space-y-8">
              {/* Geographic Growth Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPinIcon className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isPortuguese ? 'Crescimento Geográfico' : 'Geographic Growth'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(analyticsData.businessIntelligence.geographicGrowth).map(([city, percentage]) => (
                    <div key={city} className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">{percentage}%</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 capitalize">{city}</h4>
                      <p className="text-sm text-gray-600">
                        {isPortuguese ? 'da comunidade' : 'of community'}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Growth Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <SparklesIcon className="w-6 h-6 text-accent-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isPortuguese ? 'Recomendações de Crescimento' : 'Growth Recommendations'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      title: isPortuguese ? 'Foco em eventos culturais autênticos' : 'Focus on authentic cultural events',
                      description: isPortuguese ? 'Eventos com alta ressonância cultural têm 95% de taxa de sucesso' : 'Events with high cultural resonance have 95% success rate',
                      priority: 'high'
                    },
                    {
                      title: isPortuguese ? 'Expansão para Manchester' : 'Expand to Manchester',
                      description: isPortuguese ? 'Demanda crescente identificada na comunidade portuguesa' : 'Growing demand identified in Portuguese community',
                      priority: 'medium'
                    },
                    {
                      title: isPortuguese ? 'Programa de retenção de saudade' : 'Saudade retention program',
                      description: isPortuguese ? 'Reduzir churn em 40% através de suporte cultural' : 'Reduce churn by 40% through cultural support',
                      priority: 'high'
                    }
                  ].map((recommendation, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      recommendation.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                    }`}>
                      <h4 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h4>
                      <p className="text-sm text-gray-600">{recommendation.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}