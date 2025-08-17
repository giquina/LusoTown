'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  institutionalPartnershipsService, 
  InstitutionalPartnershipStrategy, 
  PartnershipOutreach 
} from '@/lib/institutionalPartnerships'
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  CurrencyPoundIcon,
  TrendingUpIcon,
  CalendarDaysIcon,
  HandshakeIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
  BellIcon,
  CogIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

interface DashboardMetrics {
  totalPartnerships: number
  pipelineValue: number
  averagePartnershipDuration: number
  communityGrowthRate: number
  benefitUtilizationRate: number
  partnerSatisfactionScore: number
}

interface PartnershipRecommendation {
  priority: 'high' | 'medium' | 'low'
  institution: string
  rationale: string
  expectedValue: number
  timeToImplement: string
}

const StrategicPartnershipDashboard: React.FC = () => {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [strategies, setStrategies] = useState<InstitutionalPartnershipStrategy[]>([])
  const [outreachPipeline, setOutreachPipeline] = useState<PartnershipOutreach[]>([])
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [recommendations, setRecommendations] = useState<PartnershipRecommendation[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'strategies' | 'pipeline' | 'analytics'>('overview')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [
        allStrategies,
        pipeline,
        analyticsData,
        partnershipRecommendations
      ] = await Promise.all([
        institutionalPartnershipsService.getPartnershipStrategies(),
        institutionalPartnershipsService.getOutreachPipeline(),
        institutionalPartnershipsService.getPartnershipAnalytics(),
        institutionalPartnershipsService.generatePartnershipRecommendations()
      ])

      setStrategies(allStrategies)
      setOutreachPipeline(pipeline)
      setMetrics(analyticsData)
      setRecommendations(partnershipRecommendations)
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      government_diplomatic: <BuildingOffice2Icon className="w-5 h-5" />,
      cultural_educational: <AcademicCapIcon className="w-5 h-5" />,
      business_professional: <BriefcaseIcon className="w-5 h-5" />,
      community_religious: <HeartIcon className="w-5 h-5" />,
      media_sports: <TrophyIcon className="w-5 h-5" />
    }
    return icons[category as keyof typeof icons] || <BuildingOffice2Icon className="w-5 h-5" />
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      government_diplomatic: 'bg-blue-100 text-blue-700 border-blue-200',
      cultural_educational: 'bg-purple-100 text-purple-700 border-purple-200',
      business_professional: 'bg-green-100 text-green-700 border-green-200',
      community_religious: 'bg-red-100 text-red-700 border-red-200',
      media_sports: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const getStageColor = (stage: PartnershipOutreach['outreachStage']) => {
    const colors = {
      research: 'bg-gray-100 text-gray-700',
      initial_contact: 'bg-blue-100 text-blue-700',
      meeting_scheduled: 'bg-purple-100 text-purple-700',
      proposal_sent: 'bg-yellow-100 text-yellow-700',
      negotiations: 'bg-orange-100 text-orange-700',
      agreement: 'bg-green-100 text-green-700'
    }
    return colors[stage]
  }

  const getPriorityColor = (priority: PartnershipOutreach['priority']) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    }
    return colors[priority]
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getTimelineProgress = (strategy: InstitutionalPartnershipStrategy): number => {
    // Mock progress calculation based on current date
    return Math.random() * 100
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'pt' ? 'Painel Estratégico de Parcerias' : 'Strategic Partnership Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'pt' 
                ? 'Gestão abrangente de parcerias institucionais portuguesas'
                : 'Comprehensive management of Portuguese institutional partnerships'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
              <DocumentTextIcon className="w-4 h-4 inline mr-2" />
              {language === 'pt' ? 'Nova Parceria' : 'New Partnership'}
            </button>
            <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
              <PresentationChartLineIcon className="w-4 h-4 inline mr-2" />
              {language === 'pt' ? 'Relatório' : 'Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          {[
            { id: 'overview', name: language === 'pt' ? 'Visão Geral' : 'Overview', icon: ChartBarIcon },
            { id: 'strategies', name: language === 'pt' ? 'Estratégias' : 'Strategies', icon: PresentationChartLineIcon },
            { id: 'pipeline', name: language === 'pt' ? 'Pipeline' : 'Pipeline', icon: TrendingUpIcon },
            { id: 'analytics', name: language === 'pt' ? 'Análises' : 'Analytics', icon: ChartBarIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <HandshakeIcon className="w-8 h-8 text-primary-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Total de Parcerias' : 'Total Partnerships'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.totalPartnerships}</p>
                    <p className="text-xs text-green-600">
                      +{metrics.communityGrowthRate}% {language === 'pt' ? 'crescimento' : 'growth'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <CurrencyPoundIcon className="w-8 h-8 text-accent-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Valor do Pipeline' : 'Pipeline Value'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.pipelineValue)}</p>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? 'em desenvolvimento' : 'in development'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center">
                  <StarIcon className="w-8 h-8 text-premium-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Satisfação Parceiros' : 'Partner Satisfaction'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.partnerSatisfactionScore}/5</p>
                    <p className="text-xs text-green-600">
                      {language === 'pt' ? 'Excelente' : 'Excellent'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* High Priority Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Ações Prioritárias' : 'Priority Actions'}
            </h3>
            
            <div className="space-y-4">
              {outreachPipeline.filter(item => item.priority === 'high').slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{item.institutionName}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(item.outreachStage)}`}>
                        {item.outreachStage.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.institutionType}</p>
                    <p className="text-sm text-green-600 font-medium mt-2">
                      {formatCurrency(item.proposalValue)} {language === 'pt' ? 'valor estimado' : 'estimated value'}
                    </p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Recomendações Estratégicas' : 'Strategic Recommendations'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.slice(0, 4).map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.institution}</h4>
                    <span className={`text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.rationale}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">{formatCurrency(rec.expectedValue)}</span>
                    <span className="text-gray-500">{rec.timeToImplement}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Strategies Tab */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'pt' ? 'Estratégias de Parceria' : 'Partnership Strategies'}
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">{language === 'pt' ? 'Todas as Categorias' : 'All Categories'}</option>
                <option value="government_diplomatic">{language === 'pt' ? 'Governo e Diplomático' : 'Government & Diplomatic'}</option>
                <option value="cultural_educational">{language === 'pt' ? 'Cultural e Educacional' : 'Cultural & Educational'}</option>
                <option value="business_professional">{language === 'pt' ? 'Empresarial e Profissional' : 'Business & Professional'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strategies
              .filter(strategy => selectedCategory === 'all' || strategy.category === selectedCategory)
              .map((strategy) => (
                <div key={strategy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(strategy.category)}`}>
                        {getCategoryIcon(strategy.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {language === 'pt' ? strategy.namePortuguese : strategy.name}
                        </h3>
                        <p className="text-sm text-gray-600">{strategy.targetInstitutions.length} {language === 'pt' ? 'instituições alvo' : 'target institutions'}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {Math.round(getTimelineProgress(strategy))}% {language === 'pt' ? 'completo' : 'complete'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{strategy.description}</p>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      {language === 'pt' ? 'Objetivos Estratégicos:' : 'Strategic Objectives:'}
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {strategy.strategicObjectives.slice(0, 3).map((objective, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
                      {strategy.timeline.completion}
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'pt' ? 'Pipeline de Desenvolvimento' : 'Development Pipeline'}
            </h2>
            <div className="text-sm text-gray-600">
              {outreachPipeline.length} {language === 'pt' ? 'oportunidades ativas' : 'active opportunities'}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {outreachPipeline.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{item.institutionName}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(item.outreachStage)}`}>
                          {item.outreachStage.replace('_', ' ')}
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{item.institutionType}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Valor Proposto' : 'Proposed Value'}</p>
                          <p className="font-medium text-green-600">{formatCurrency(item.proposalValue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Último Contacto' : 'Last Contact'}</p>
                          <p className="font-medium">{new Date(item.lastContact).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Próximo Follow-up' : 'Next Follow-up'}</p>
                          <p className="font-medium">{new Date(item.followUpDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">{language === 'pt' ? 'Próximas Ações:' : 'Next Actions:'}</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {item.nextActions.slice(0, 2).map((action, index) => (
                            <li key={index} className="flex items-center">
                              <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-1" />
                          {item.contactPerson.email}
                        </div>
                        {item.contactPerson.phone && (
                          <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-1" />
                            {item.contactPerson.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-6">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        {language === 'pt' ? 'Editar' : 'Edit'}
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
                        {language === 'pt' ? 'Contactar' : 'Contact'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'pt' ? 'Análises e Métricas' : 'Analytics & Metrics'}
          </h2>

          {/* Performance Metrics Grid */}
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Duração Média' : 'Avg Duration'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.averagePartnershipDuration.toFixed(1)}</p>
                    <p className="text-xs text-gray-500">{language === 'pt' ? 'anos' : 'years'}</p>
                  </div>
                  <ClockIcon className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Taxa de Crescimento' : 'Growth Rate'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.communityGrowthRate}%</p>
                    <p className="text-xs text-green-600">{language === 'pt' ? 'mensal' : 'monthly'}</p>
                  </div>
                  <TrendingUpIcon className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Taxa de Utilização' : 'Utilization Rate'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.benefitUtilizationRate}%</p>
                    <p className="text-xs text-gray-500">{language === 'pt' ? 'benefícios' : 'benefits'}</p>
                  </div>
                  <ChartBarIcon className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {language === 'pt' ? 'Satisfação' : 'Satisfaction'}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{metrics.partnerSatisfactionScore}</p>
                    <p className="text-xs text-green-600">/5 {language === 'pt' ? 'estrelas' : 'stars'}</p>
                  </div>
                  <StarIcon className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>
          )}

          {/* Success Stories */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <SparklesIcon className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-medium text-green-800">Instituto Camões Partnership</h4>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  {language === 'pt' 
                    ? 'Parceria estratégica resultou em 300% de aumento na participação em programas culturais'
                    : 'Strategic partnership resulted in 300% increase in cultural program participation'
                  }
                </p>
                <div className="text-xs text-green-600">
                  £105,000 {language === 'pt' ? 'em benefícios para membros' : 'in member benefits'}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrophyIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-800">University Network Expansion</h4>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  {language === 'pt' 
                    ? 'Rede universitária expandida para 8 instituições servindo 1,200+ estudantes portugueses'
                    : 'University network expanded to 8 institutions serving 1,200+ Portuguese students'
                  }
                </p>
                <div className="text-xs text-blue-600">
                  £85,000 {language === 'pt' ? 'em poupanças educacionais' : 'in educational savings'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StrategicPartnershipDashboard