'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { institutionalPartnershipsService, InstitutionalPartnershipStrategy, PartnershipOutreach } from '@/lib/institutionalPartnerships'
import {
  BuildingLibraryIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  TrophyIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon,
  HandRaisedIcon,
  PresentationChartLineIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  BanknotesIcon,
  HeartIcon,
  LanguageIcon,
  GiftIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface PartnershipCategory {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ReactNode
  color: string
  institutions: number
  totalReach: number
  averageValue: number
  growthRate: number
  keyBenefits: string[]
  keyBenefitsPortuguese: string[]
}

interface PartnershipPipeline {
  stage: string
  stagePortuguese: string
  count: number
  totalValue: number
  averageTime: string
  successRate: number
  color: string
}

interface GlobalPresence {
  region: string
  regionPortuguese: string
  institutions: number
  reach: number
  programs: number
  status: 'active' | 'developing' | 'planned'
  keyPartnerships: string[]
}

const ComprehensiveInstitutionalPartnerships: React.FC = () => {
  const { language } = useLanguage()
  const { trackActivity } = usePlatformIntegration()
  const [selectedTab, setSelectedTab] = useState<string>('overview')
  const [loading, setLoading] = useState(true)
  const [strategies, setStrategies] = useState<InstitutionalPartnershipStrategy[]>([])
  const [outreachPipeline, setOutreachPipeline] = useState<PartnershipOutreach[]>([])
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    loadPartnershipData()
    trackActivity({
      activityType: 'institutional_partnerships_access',
      metadata: { section: 'comprehensive_partnerships', timestamp: new Date().toISOString() }
    })
  }, [])

  const loadPartnershipData = async () => {
    setLoading(true)
    try {
      const [strategiesData, pipelineData, analyticsData] = await Promise.all([
        institutionalPartnershipsService.getPartnershipStrategies(),
        institutionalPartnershipsService.getOutreachPipeline(),
        institutionalPartnershipsService.getPartnershipAnalytics()
      ])

      setStrategies(strategiesData)
      setOutreachPipeline(pipelineData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading partnership data:', error)
    } finally {
      setLoading(false)
    }
  }

  const partnershipCategories: PartnershipCategory[] = [
    {
      id: 'government_diplomatic',
      name: 'Government & Diplomatic',
      namePortuguese: 'Governo e Diplomático',
      description: 'Official Portuguese government institutions and diplomatic missions',
      descriptionPortuguese: 'Instituições oficiais do governo português e missões diplomáticas',
      icon: <BuildingLibraryIcon className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      institutions: 8,
      totalReach: 45000,
      averageValue: 85000,
      growthRate: 18.5,
      keyBenefits: [
        'Official recognition and endorsement',
        'Government service integration',
        'Policy influence and advocacy',
        'Consular service coordination'
      ],
      keyBenefitsPortuguese: [
        'Reconhecimento e endosso oficial',
        'Integração de serviços governamentais',
        'Influência política e advocacia',
        'Coordenação de serviços consulares'
      ]
    },
    {
      id: 'cultural_educational',
      name: 'Cultural & Educational',
      namePortuguese: 'Cultural e Educacional',
      description: 'Universities, cultural centers, and educational institutions',
      descriptionPortuguese: 'Universidades, centros culturais e instituições educacionais',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      institutions: 15,
      totalReach: 25000,
      averageValue: 45000,
      growthRate: 22.3,
      keyBenefits: [
        'Academic research collaboration',
        'Student support services',
        'Cultural programming partnerships',
        'Language certification programs'
      ],
      keyBenefitsPortuguese: [
        'Colaboração em investigação académica',
        'Serviços de apoio estudantil',
        'Parcerias de programação cultural',
        'Programas de certificação linguística'
      ]
    },
    {
      id: 'business_professional',
      name: 'Business & Professional',
      namePortuguese: 'Empresarial e Profissional',
      description: 'Professional associations and business organizations',
      descriptionPortuguese: 'Associações profissionais e organizações empresariais',
      icon: <BriefcaseIcon className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      institutions: 12,
      totalReach: 35000,
      averageValue: 35000,
      growthRate: 15.8,
      keyBenefits: [
        'Professional development programs',
        'Career advancement support',
        'Business networking opportunities',
        'Industry-specific training'
      ],
      keyBenefitsPortuguese: [
        'Programas de desenvolvimento profissional',
        'Apoio ao avanço na carreira',
        'Oportunidades de networking empresarial',
        'Formação específica por setor'
      ]
    },
    {
      id: 'media_communications',
      name: 'Media & Communications',
      namePortuguese: 'Media e Comunicações',
      description: 'Portuguese media outlets and communication platforms',
      descriptionPortuguese: 'Meios de comunicação portugueses e plataformas de comunicação',
      icon: <TrophyIcon className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      institutions: 6,
      totalReach: 180000,
      averageValue: 25000,
      growthRate: 28.4,
      keyBenefits: [
        'Community event coverage',
        'Cultural content collaboration',
        'Brand visibility enhancement',
        'Documentary production support'
      ],
      keyBenefitsPortuguese: [
        'Cobertura de eventos comunitários',
        'Colaboração em conteúdo cultural',
        'Melhoria da visibilidade da marca',
        'Apoio à produção de documentários'
      ]
    }
  ]

  const pipelineStages: PartnershipPipeline[] = [
    {
      stage: 'research',
      stagePortuguese: 'Investigação',
      count: outreachPipeline.filter(p => p.outreachStage === 'research').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'research').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '2-4 weeks',
      successRate: 95,
      color: 'bg-gray-100 text-gray-800'
    },
    {
      stage: 'initial_contact',
      stagePortuguese: 'Contacto Inicial',
      count: outreachPipeline.filter(p => p.outreachStage === 'initial_contact').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'initial_contact').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '1-2 weeks',
      successRate: 78,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      stage: 'meeting_scheduled',
      stagePortuguese: 'Reunião Agendada',
      count: outreachPipeline.filter(p => p.outreachStage === 'meeting_scheduled').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'meeting_scheduled').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '2-3 weeks',
      successRate: 82,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      stage: 'proposal_sent',
      stagePortuguese: 'Proposta Enviada',
      count: outreachPipeline.filter(p => p.outreachStage === 'proposal_sent').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'proposal_sent').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '4-6 weeks',
      successRate: 65,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      stage: 'negotiations',
      stagePortuguese: 'Negociações',
      count: outreachPipeline.filter(p => p.outreachStage === 'negotiations').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'negotiations').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '3-5 weeks',
      successRate: 85,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      stage: 'agreement',
      stagePortuguese: 'Acordo',
      count: outreachPipeline.filter(p => p.outreachStage === 'agreement').length,
      totalValue: outreachPipeline.filter(p => p.outreachStage === 'agreement').reduce((sum, p) => sum + p.proposalValue, 0),
      averageTime: '1-2 weeks',
      successRate: 98,
      color: 'bg-green-100 text-green-800'
    }
  ]

  const globalPresence: GlobalPresence[] = [
    {
      region: 'Portugal',
      regionPortuguese: 'Portugal',
      institutions: 28,
      reach: 125000,
      programs: 45,
      status: 'active',
      keyPartnerships: ['Ministry of Culture', 'Instituto Camões', 'University of Lisbon']
    },
    {
      region: 'United Kingdom',
      regionPortuguese: 'Reino Unido',
      institutions: 35,
      reach: 85000,
      programs: 38,
      status: 'active',
      keyPartnerships: ['Portuguese Embassy London', 'King\'s College', 'Portuguese Cultural Centre']
    },
    {
      region: 'Brazil',
      regionPortuguese: 'Brasil',
      institutions: 15,
      reach: 45000,
      programs: 22,
      status: 'developing',
      keyPartnerships: ['Brazilian Embassy', 'Casa do Brasil', 'University of São Paulo']
    },
    {
      region: 'Europe (Other)',
      regionPortuguese: 'Europa (Outros)',
      institutions: 12,
      reach: 28000,
      programs: 15,
      status: 'developing',
      keyPartnerships: ['French Portuguese Communities', 'German Cultural Centers']
    }
  ]

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleViewStrategy = (strategyId: string) => {
    trackActivity({
      activityType: 'partnership_strategy_view',
      metadata: { strategyId, timestamp: new Date().toISOString() }
    })
    // In real implementation, this would navigate to strategy detail page
    console.log('Viewing strategy:', strategyId)
  }

  const handleContactInstitution = (outreachId: string) => {
    trackActivity({
      activityType: 'institution_contact',
      metadata: { outreachId, timestamp: new Date().toISOString() }
    })
    // In real implementation, this would open contact modal
    console.log('Contacting institution:', outreachId)
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
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <HandRaisedIcon className="w-12 h-12 text-primary-500 mr-4" />
          <GlobeAltIcon className="w-12 h-12 text-secondary-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'Parcerias Institucionais Estratégicas'
            : 'Strategic Institutional Partnerships'
          }
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Conectando a comunidade de falantes de português mundial através de parcerias oficiais com governos, universidades, organizações culturais e meios de comunicação para criar uma plataforma autêntica e reconhecida oficialmente.'
            : 'Connecting the global Portuguese-speaking community through official partnerships with governments, universities, cultural organizations, and media outlets to create an authentic and officially recognized platform.'
          }
        </p>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <BuildingLibraryIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {partnershipCategories.reduce((sum, cat) => sum + cat.institutions, 0)}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Instituições Parceiras' : 'Partner Institutions'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
          <UserGroupIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {(partnershipCategories.reduce((sum, cat) => sum + cat.totalReach, 0) / 1000).toFixed(0)}K
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Alcance Global' : 'Global Reach'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
          <BanknotesIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {formatCurrency(outreachPipeline.reduce((sum, p) => sum + p.proposalValue, 0))}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Pipeline de Valor' : 'Pipeline Value'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-premium-500 to-premium-600 rounded-xl p-6 text-white">
          <TrophyIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {analytics ? `${analytics.partnerSatisfactionScore.toFixed(1)}/5` : '4.6/5'}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Satisfação dos Parceiros' : 'Partner Satisfaction'}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {['overview', 'strategies', 'pipeline', 'global', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'overview' && (language === 'pt' ? 'Visão Geral' : 'Overview')}
                {tab === 'strategies' && (language === 'pt' ? 'Estratégias' : 'Strategies')}
                {tab === 'pipeline' && (language === 'pt' ? 'Pipeline' : 'Pipeline')}
                {tab === 'global' && (language === 'pt' ? 'Presença Global' : 'Global Presence')}
                {tab === 'analytics' && (language === 'pt' ? 'Análises' : 'Analytics')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <div className="space-y-12">
          {/* Partnership Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'pt' ? 'Categorias de Parcerias' : 'Partnership Categories'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnershipCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {category.icon}
                        <h3 className="text-xl font-semibold">
                          {language === 'pt' ? category.namePortuguese : category.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{category.institutions}</p>
                        <p className="text-xs opacity-90">{language === 'pt' ? 'instituições' : 'institutions'}</p>
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      {language === 'pt' ? category.descriptionPortuguese : category.description}
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{(category.totalReach / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-600">{language === 'pt' ? 'Alcance' : 'Reach'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(category.averageValue)}</p>
                        <p className="text-xs text-gray-600">{language === 'pt' ? 'Valor Médio' : 'Avg Value'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">+{category.growthRate}%</p>
                        <p className="text-xs text-gray-600">{language === 'pt' ? 'Crescimento' : 'Growth'}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        {language === 'pt' ? 'Principais Benefícios:' : 'Key Benefits:'}
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'pt' ? category.keyBenefitsPortuguese : category.keyBenefits).map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'strategies' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Estratégias de Desenvolvimento' : 'Development Strategies'}
          </h2>
          
          <div className="space-y-6">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? strategy.namePortuguese : strategy.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Instituições Alvo:' : 'Target Institutions:'}
                        </h4>
                        <ul className="space-y-1">
                          {strategy.targetInstitutions.slice(0, 3).map((institution, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-2" />
                              {institution}
                            </li>
                          ))}
                          {strategy.targetInstitutions.length > 3 && (
                            <li className="text-sm text-gray-500">
                              +{strategy.targetInstitutions.length - 3} {language === 'pt' ? 'mais' : 'more'}
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Resultados Esperados:' : 'Expected Outcomes:'}
                        </h4>
                        <ul className="space-y-1">
                          {strategy.expectedOutcomes.slice(0, 3).map((outcome, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <CheckBadgeIcon className="w-3 h-3 text-green-500 mr-2" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <button
                      onClick={() => handleViewStrategy(strategy.id)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      {language === 'pt' ? 'Ver Estratégia' : 'View Strategy'}
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    {language === 'pt' ? 'Cronograma:' : 'Timeline:'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{strategy.timeline.phase1}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-yellow-600">2</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{strategy.timeline.phase2}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-orange-600">3</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{strategy.timeline.phase3}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">{strategy.timeline.completion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'pipeline' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Pipeline de Desenvolvimento' : 'Development Pipeline'}
          </h2>

          {/* Pipeline Stages Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stage.color} mb-2`}>
                  {language === 'pt' ? stage.stagePortuguese : stage.stage}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
                <p className="text-xs text-gray-600 mb-1">{formatCurrency(stage.totalValue)}</p>
                <p className="text-xs text-green-600">{stage.successRate}% {language === 'pt' ? 'sucesso' : 'success'}</p>
              </div>
            ))}
          </div>

          {/* Active Outreach */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {language === 'pt' ? 'Outreach Ativo' : 'Active Outreach'}
            </h3>
            
            <div className="space-y-4">
              {outreachPipeline.map((outreach) => (
                <div key={outreach.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{outreach.institutionName}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          pipelineStages.find(s => s.stage === outreach.outreachStage)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {language === 'pt' 
                            ? pipelineStages.find(s => s.stage === outreach.outreachStage)?.stagePortuguese 
                            : outreach.outreachStage.replace('_', ' ')
                          }
                        </span>
                        <span className={`text-xs font-medium ${
                          outreach.priority === 'high' ? 'text-red-600' :
                          outreach.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {outreach.priority.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{outreach.institutionType}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Valor da Proposta' : 'Proposal Value'}</p>
                          <p className="font-semibold text-green-600">{formatCurrency(outreach.proposalValue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Último Contacto' : 'Last Contact'}</p>
                          <p className="font-medium">{new Date(outreach.lastContact).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{language === 'pt' ? 'Próximo Passo' : 'Follow Up'}</p>
                          <p className="font-medium">{new Date(outreach.followUpDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Próximas Ações:' : 'Next Actions:'}
                        </h5>
                        <ul className="space-y-1">
                          {outreach.nextActions.slice(0, 2).map((action, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center">
                              <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-2" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-sm text-gray-600 italic">{outreach.notes}</div>
                    </div>
                    
                    <div className="ml-6 space-y-2">
                      <button
                        onClick={() => handleContactInstitution(outreach.id)}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
                      >
                        {language === 'pt' ? 'Contactar' : 'Contact'}
                      </button>
                      <div className="text-xs text-gray-500">
                        <div className="flex items-center">
                          <PhoneIcon className="w-3 h-3 mr-1" />
                          {outreach.contactPerson.phone || 'N/A'}
                        </div>
                        <div className="flex items-center mt-1">
                          <EnvelopeIcon className="w-3 h-3 mr-1" />
                          {outreach.contactPerson.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'global' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Presença Global' : 'Global Presence'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalPresence.map((region) => (
              <div key={region.region} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'pt' ? region.regionPortuguese : region.region}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    region.status === 'active' ? 'bg-green-100 text-green-800' :
                    region.status === 'developing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {region.status === 'active' ? (language === 'pt' ? 'Ativo' : 'Active') :
                     region.status === 'developing' ? (language === 'pt' ? 'Desenvolvendo' : 'Developing') :
                     (language === 'pt' ? 'Planeado' : 'Planned')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{region.institutions}</p>
                    <p className="text-xs text-gray-600">{language === 'pt' ? 'Instituições' : 'Institutions'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{(region.reach / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-600">{language === 'pt' ? 'Alcance' : 'Reach'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{region.programs}</p>
                    <p className="text-xs text-gray-600">{language === 'pt' ? 'Programas' : 'Programs'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    {language === 'pt' ? 'Parcerias Principais:' : 'Key Partnerships:'}
                  </h4>
                  <ul className="space-y-2">
                    {region.keyPartnerships.map((partnership, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <HandRaisedIcon className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                        {partnership}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Análises e Insights' : 'Analytics & Insights'}
          </h2>

          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{language === 'pt' ? 'Taxa de Crescimento' : 'Growth Rate'}</h3>
                  <TrophyIcon className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-green-600">+{analytics.communityGrowthRate}%</p>
                <p className="text-sm text-gray-600">{language === 'pt' ? 'Crescimento anual da comunidade' : 'Annual community growth'}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{language === 'pt' ? 'Utilização de Benefícios' : 'Benefit Utilization'}</h3>
                  <ChartBarIcon className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-blue-600">{analytics.benefitUtilizationRate}%</p>
                <p className="text-sm text-gray-600">{language === 'pt' ? 'Membros utilizando benefícios' : 'Members using benefits'}</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{language === 'pt' ? 'Duração Média' : 'Avg Duration'}</h3>
                  <ClockIcon className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-purple-600">{analytics.averagePartnershipDuration.toFixed(1)}</p>
                <p className="text-sm text-gray-600">{language === 'pt' ? 'Anos por parceria' : 'Years per partnership'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
  <HandRaisedIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Torne-se um Parceiro Institucional' : 'Become an Institutional Partner'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Junte-se à nossa rede global de instituições portuguesas de prestígio e ajude-nos a construir a maior plataforma comunitária portuguesa do mundo.'
            : 'Join our global network of prestigious Portuguese institutions and help us build the world\'s largest Portuguese-speaking community platform.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {language === 'pt' ? 'Propor Parceria' : 'Propose Partnership'}
          </button>
          <button className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            {language === 'pt' ? 'Saber Mais' : 'Learn More'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveInstitutionalPartnerships