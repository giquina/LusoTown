'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBarIcon,
  UserGroupIcon,
  TrendingUpIcon,
  CurrencyPoundIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  FunnelIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface GrowthMetric {
  id: string
  name: string
  namePortuguese: string
  value: number
  previousValue: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  format: 'number' | 'percentage' | 'currency' | 'duration'
  category: 'acquisition' | 'engagement' | 'retention' | 'revenue' | 'satisfaction'
  target?: number
  benchmark?: number
  trendsData: {
    daily: number[]
    weekly: number[]
    monthly: number[]
  }
}

interface UserSegmentAnalysis {
  segment: string
  segmentPortuguese: string
  userCount: number
  conversionRate: number
  avgLifetimeValue: number
  retention: {
    day7: number
    day30: number
    day90: number
  }
  topActions: string[]
  topActionsPortuguese: string[]
  growthRate: number
  characteristics: {
    demographics: any
    behavior: any
    preferences: any
  }
}

interface ConversionFunnel {
  stage: string
  stagePortuguese: string
  users: number
  conversionRate: number
  dropoffRate: number
  avgTimeSpent: number
  topExitReasons: string[]
  topExitReasonsPortuguese: string[]
  optimizationOpportunities: string[]
  optimizationOpportunitiesPortuguese: string[]
}

interface GrowthAnalyticsDashboardProps {
  timeRange?: '7d' | '30d' | '90d' | '1y'
  focusArea?: 'overview' | 'acquisition' | 'engagement' | 'retention' | 'revenue'
  userSegment?: 'all' | 'new' | 'active' | 'engaged' | 'premium' | 'dormant'
  showPredictions?: boolean
}

export default function GrowthAnalyticsDashboard({
  timeRange = '30d',
  focusArea = 'overview',
  userSegment = 'all',
  showPredictions = true
}: GrowthAnalyticsDashboardProps) {
  const { language } = useLanguage()
  const { stats, connections } = useNetworking()
  const [growthMetrics, setGrowthMetrics] = useState<GrowthMetric[]>([])
  const [userSegments, setUserSegments] = useState<UserSegmentAnalysis[]>([])
  const [conversionFunnel, setConversionFunnel] = useState<ConversionFunnel[]>([])
  const [selectedMetric, setSelectedMetric] = useState<GrowthMetric | null>(null)
  const [activeTab, setActiveTab] = useState<string>(focusArea)

  const isPortuguese = language === 'pt'

  // Growth metrics with Portuguese community context
  const mockGrowthMetrics: GrowthMetric[] = [
    {
      id: 'total_users',
      name: 'Total Community Members',
      namePortuguese: 'Total de Membros da Comunidade',
      value: 750,
      previousValue: 680,
      change: 10.3,
      changeType: 'increase',
      format: 'number',
      category: 'acquisition',
      target: 1000,
      benchmark: 850,
      trendsData: {
        daily: [680, 685, 692, 698, 705, 712, 720, 728, 735, 742, 750],
        weekly: [580, 620, 665, 710, 750],
        monthly: [450, 520, 600, 680, 750]
      }
    },
    {
      id: 'portuguese_speakers',
      name: 'Portuguese Speaking Members',
      namePortuguese: 'Membros Falantes de Português',
      value: 567,
      previousValue: 514,
      change: 10.3,
      changeType: 'increase',
      format: 'number',
      category: 'acquisition',
      trendsData: {
        daily: [514, 518, 523, 528, 534, 540, 546, 552, 558, 562, 567],
        weekly: [440, 470, 505, 535, 567],
        monthly: [340, 395, 455, 514, 567]
      }
    },
    {
      id: 'monthly_active_users',
      name: 'Monthly Active Users',
      namePortuguese: 'Utilizadores Ativos Mensais',
      value: 485,
      previousValue: 425,
      change: 14.1,
      changeType: 'increase',
      format: 'number',
      category: 'engagement',
      target: 600,
      trendsData: {
        daily: [425, 430, 438, 445, 452, 460, 467, 474, 480, 482, 485],
        weekly: [365, 395, 420, 450, 485],
        monthly: [285, 325, 370, 425, 485]
      }
    },
    {
      id: 'premium_conversion_rate',
      name: 'Premium Conversion Rate',
      namePortuguese: 'Taxa de Conversão Premium',
      value: 18.5,
      previousValue: 16.2,
      change: 14.2,
      changeType: 'increase',
      format: 'percentage',
      category: 'revenue',
      target: 25,
      benchmark: 20,
      trendsData: {
        daily: [16.2, 16.4, 16.8, 17.1, 17.4, 17.7, 18.0, 18.2, 18.3, 18.4, 18.5],
        weekly: [14.5, 15.2, 16.8, 17.9, 18.5],
        monthly: [12.8, 14.1, 15.7, 16.2, 18.5]
      }
    },
    {
      id: 'avg_session_duration',
      name: 'Average Session Duration',
      namePortuguese: 'Duração Média da Sessão',
      value: 8.3,
      previousValue: 7.1,
      change: 16.9,
      changeType: 'increase',
      format: 'duration',
      category: 'engagement',
      target: 10,
      trendsData: {
        daily: [7.1, 7.2, 7.4, 7.6, 7.8, 8.0, 8.1, 8.2, 8.2, 8.3, 8.3],
        weekly: [6.5, 6.8, 7.3, 7.8, 8.3],
        monthly: [5.8, 6.2, 6.8, 7.1, 8.3]
      }
    },
    {
      id: 'customer_satisfaction',
      name: 'Customer Satisfaction Score',
      namePortuguese: 'Pontuação de Satisfação do Cliente',
      value: 4.7,
      previousValue: 4.4,
      change: 6.8,
      changeType: 'increase',
      format: 'number',
      category: 'satisfaction',
      target: 4.8,
      benchmark: 4.5,
      trendsData: {
        daily: [4.4, 4.4, 4.5, 4.5, 4.6, 4.6, 4.6, 4.7, 4.7, 4.7, 4.7],
        weekly: [4.2, 4.3, 4.4, 4.6, 4.7],
        monthly: [4.0, 4.1, 4.3, 4.4, 4.7]
      }
    },
    {
      id: 'monthly_revenue',
      name: 'Monthly Recurring Revenue',
      namePortuguese: 'Receita Recorrente Mensal',
      value: 15750,
      previousValue: 13500,
      change: 16.7,
      changeType: 'increase',
      format: 'currency',
      category: 'revenue',
      target: 20000,
      trendsData: {
        daily: Array.from({length: 11}, (_, i) => 13500 + (i * 225)),
        weekly: [11000, 12200, 13500, 14800, 15750],
        monthly: [8500, 10200, 11800, 13500, 15750]
      }
    },
    {
      id: 'retention_rate_30d',
      name: '30-Day Retention Rate',
      namePortuguese: 'Taxa de Retenção de 30 Dias',
      value: 72.5,
      previousValue: 68.2,
      change: 6.3,
      changeType: 'increase',
      format: 'percentage',
      category: 'retention',
      target: 75,
      benchmark: 70,
      trendsData: {
        daily: [68.2, 68.5, 69.1, 69.8, 70.2, 70.8, 71.2, 71.8, 72.1, 72.3, 72.5],
        weekly: [65.5, 67.2, 68.8, 70.5, 72.5],
        monthly: [62.3, 64.8, 66.9, 68.2, 72.5]
      }
    }
  ]

  // User segment analysis with Portuguese cultural context
  const mockUserSegments: UserSegmentAnalysis[] = [
    {
      segment: 'Portuguese Professionals',
      segmentPortuguese: 'Profissionais Portugueses',
      userCount: 185,
      conversionRate: 24.3,
      avgLifetimeValue: 85,
      retention: { day7: 85, day30: 72, day90: 58 },
      topActions: ['Business networking events', 'Professional mentorship', 'Premium transport'],
      topActionsPortuguese: ['Eventos de networking empresarial', 'Mentoria profissional', 'Transporte premium'],
      growthRate: 18.5,
      characteristics: {
        demographics: { ageRange: '28-45', education: 'University+', income: 'Above average' },
        behavior: { sessionLength: '12min', pageViews: 8.5, returnRate: 0.75 },
        preferences: { language: 'Bilingual', contentType: 'Professional', timeOfUse: 'Weekday evenings' }
      }
    },
    {
      segment: 'Brazilian Students',
      segmentPortuguese: 'Estudantes Brasileiros',
      userCount: 142,
      conversionRate: 12.7,
      avgLifetimeValue: 35,
      retention: { day7: 78, day30: 65, day90: 42 },
      topActions: ['Cultural events', 'Student networking', 'Community support'],
      topActionsPortuguese: ['Eventos culturais', 'Networking estudantil', 'Apoio comunitário'],
      growthRate: 22.1,
      characteristics: {
        demographics: { ageRange: '18-28', education: 'University', income: 'Student budget' },
        behavior: { sessionLength: '15min', pageViews: 12.3, returnRate: 0.68 },
        preferences: { language: 'Portuguese preferred', contentType: 'Cultural', timeOfUse: 'Weekends' }
      }
    },
    {
      segment: 'Established Portuguese Families',
      segmentPortuguese: 'Famílias Portuguesas Estabelecidas',
      userCount: 95,
      conversionRate: 31.6,
      avgLifetimeValue: 125,
      retention: { day7: 92, day30: 85, day90: 78 },
      topActions: ['Family events', 'Cultural preservation', 'Community leadership'],
      topActionsPortuguese: ['Eventos familiares', 'Preservação cultural', 'Liderança comunitária'],
      growthRate: 8.2,
      characteristics: {
        demographics: { ageRange: '35-55', education: 'Mixed', income: 'Stable' },
        behavior: { sessionLength: '18min', pageViews: 15.2, returnRate: 0.88 },
        preferences: { language: 'Portuguese', contentType: 'Family/Cultural', timeOfUse: 'Family time' }
      }
    },
    {
      segment: 'New Portuguese Arrivals',
      segmentPortuguese: 'Novos Chegados Portugueses',
      userCount: 78,
      conversionRate: 8.9,
      avgLifetimeValue: 45,
      retention: { day7: 65, day30: 48, day90: 28 },
      topActions: ['Housing assistance', 'Practical support', 'Community orientation'],
      topActionsPortuguese: ['Assistência habitacional', 'Apoio prático', 'Orientação comunitária'],
      growthRate: 35.4,
      characteristics: {
        demographics: { ageRange: '22-40', education: 'Varied', income: 'Transitioning' },
        behavior: { sessionLength: '22min', pageViews: 18.7, returnRate: 0.52 },
        preferences: { language: 'Portuguese', contentType: 'Practical', timeOfUse: 'Research hours' }
      }
    }
  ]

  // Conversion funnel with Portuguese journey stages
  const mockConversionFunnel: ConversionFunnel[] = [
    {
      stage: 'Discovery',
      stagePortuguese: 'Descoberta',
      users: 1250,
      conversionRate: 100,
      dropoffRate: 0,
      avgTimeSpent: 2.3,
      topExitReasons: ['Not relevant', 'Confusing navigation', 'Language barrier'],
      topExitReasonsPortuguese: ['Não relevante', 'Navegação confusa', 'Barreira linguística'],
      optimizationOpportunities: ['Improve Portuguese SEO', 'Clearer value proposition', 'Better landing pages'],
      optimizationOpportunitiesPortuguese: ['Melhorar SEO português', 'Proposta de valor mais clara', 'Melhores páginas de destino']
    },
    {
      stage: 'Interest',
      stagePortuguese: 'Interesse',
      users: 875,
      conversionRate: 70,
      dropoffRate: 30,
      avgTimeSpent: 5.8,
      topExitReasons: ['Too expensive', 'Not enough content', 'Unclear benefits'],
      topExitReasonsPortuguese: ['Muito caro', 'Conteúdo insuficiente', 'Benefícios pouco claros'],
      optimizationOpportunities: ['Add more free content', 'Clarify pricing', 'Portuguese testimonials'],
      optimizationOpportunitiesPortuguese: ['Adicionar mais conteúdo gratuito', 'Clarificar preços', 'Testemunhos portugueses']
    },
    {
      stage: 'Consideration',
      stagePortuguese: 'Consideração',
      users: 525,
      conversionRate: 42,
      dropoffRate: 40,
      avgTimeSpent: 12.5,
      topExitReasons: ['Comparison shopping', 'Need approval', 'Technical issues'],
      topExitReasonsPortuguese: ['Comparação de preços', 'Precisa de aprovação', 'Problemas técnicos'],
      optimizationOpportunities: ['Free trial offer', 'Social proof', 'Simplified signup'],
      optimizationOpportunitiesPortuguese: ['Oferta de teste gratuito', 'Prova social', 'Registo simplificado']
    },
    {
      stage: 'Conversion',
      stagePortuguese: 'Conversão',
      users: 185,
      conversionRate: 14.8,
      dropoffRate: 64.8,
      avgTimeSpent: 8.2,
      topExitReasons: ['Payment issues', 'Registration complexity', 'Changed mind'],
      topExitReasonsPortuguese: ['Problemas de pagamento', 'Complexidade de registo', 'Mudou de opinião'],
      optimizationOpportunities: ['Multiple payment options', 'One-click signup', 'Exit intent offers'],
      optimizationOpportunitiesPortuguese: ['Múltiplas opções de pagamento', 'Registo com um clique', 'Ofertas de intenção de saída']
    },
    {
      stage: 'Retention',
      stagePortuguese: 'Retenção',
      users: 134,
      conversionRate: 72.4,
      dropoffRate: 27.6,
      avgTimeSpent: 25.3,
      topExitReasons: ['Not enough value', 'Infrequent use', 'Better alternatives'],
      topExitReasonsPortuguese: ['Valor insuficiente', 'Uso pouco frequente', 'Melhores alternativas'],
      optimizationOpportunities: ['Engagement campaigns', 'Feature education', 'Community building'],
      optimizationOpportunitiesPortuguese: ['Campanhas de envolvimento', 'Educação sobre funcionalidades', 'Construção de comunidade']
    }
  ]

  useEffect(() => {
    loadGrowthMetrics()
    loadUserSegments()
    loadConversionFunnel()
  }, [timeRange, userSegment])

  const loadGrowthMetrics = () => {
    // Filter and adapt metrics based on time range
    const filteredMetrics = mockGrowthMetrics.map(metric => ({
      ...metric,
      // Adjust values based on time range
      value: timeRange === '7d' ? metric.value * 0.7 : 
             timeRange === '90d' ? metric.value * 1.8 : 
             timeRange === '1y' ? metric.value * 3.2 : metric.value
    }))
    setGrowthMetrics(filteredMetrics)
  }

  const loadUserSegments = () => {
    setUserSegments(mockUserSegments)
  }

  const loadConversionFunnel = () => {
    setConversionFunnel(mockConversionFunnel)
  }

  const formatMetricValue = (metric: GrowthMetric): string => {
    switch (metric.format) {
      case 'percentage':
        return `${metric.value.toFixed(1)}%`
      case 'currency':
        return `£${metric.value.toLocaleString()}`
      case 'duration':
        return `${metric.value.toFixed(1)}min`
      default:
        return metric.value.toLocaleString()
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUpIcon className="w-4 h-4 text-green-500" />
      case 'decrease':
        return <ArrowDownIcon className="w-4 h-4 text-red-500" />
      default:
        return <ArrowRightIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const tabs = [
    { id: 'overview', name: isPortuguese ? 'Visão Geral' : 'Overview', icon: ChartBarIcon },
    { id: 'acquisition', name: isPortuguese ? 'Aquisição' : 'Acquisition', icon: UserGroupIcon },
    { id: 'engagement', name: isPortuguese ? 'Envolvimento' : 'Engagement', icon: BoltIcon },
    { id: 'retention', name: isPortuguese ? 'Retenção' : 'Retention', icon: StarIcon },
    { id: 'revenue', name: isPortuguese ? 'Receita' : 'Revenue', icon: CurrencyPoundIcon }
  ]

  const filteredMetrics = activeTab === 'overview' 
    ? growthMetrics 
    : growthMetrics.filter(metric => metric.category === activeTab)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isPortuguese ? 'Painel de Análise de Crescimento' : 'Growth Analytics Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isPortuguese 
              ? 'Insights abrangentes sobre o crescimento da comunidade portuguesa'
              : 'Comprehensive insights into Portuguese community growth'
            }
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={timeRange}
            onChange={(e) => setGrowthMetrics([])} // Trigger reload
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7d">{isPortuguese ? 'Últimos 7 dias' : 'Last 7 days'}</option>
            <option value="30d">{isPortuguese ? 'Últimos 30 dias' : 'Last 30 days'}</option>
            <option value="90d">{isPortuguese ? 'Últimos 90 dias' : 'Last 90 days'}</option>
            <option value="1y">{isPortuguese ? 'Último ano' : 'Last year'}</option>
          </select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">
                {isPortuguese ? metric.namePortuguese : metric.name}
              </h3>
              {getChangeIcon(metric.changeType)}
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {formatMetricValue(metric)}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 
                  metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">
                  vs {isPortuguese ? 'período anterior' : 'previous period'}
                </span>
              </div>
              
              {metric.target && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{isPortuguese ? 'Progresso' : 'Progress'}</span>
                    <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Segments Analysis */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Análise de Segmentos de Utilizadores' : 'User Segment Analysis'}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {userSegments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isPortuguese ? segment.segmentPortuguese : segment.segment}
                </h3>
                <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {segment.userCount} {isPortuguese ? 'utilizadores' : 'users'}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{segment.conversionRate}%</div>
                  <div className="text-xs text-gray-600">{isPortuguese ? 'Conversão' : 'Conversion'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">£{segment.avgLifetimeValue}</div>
                  <div className="text-xs text-gray-600">LTV</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{segment.retention.day30}%</div>
                  <div className="text-xs text-gray-600">{isPortuguese ? 'Retenção 30d' : '30d Retention'}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  {isPortuguese ? 'Principais Ações:' : 'Top Actions:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(isPortuguese ? segment.topActionsPortuguese : segment.topActions).slice(0, 3).map((action, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FunnelIcon className="w-6 h-6 text-primary-600" />
          {isPortuguese ? 'Funil de Conversão' : 'Conversion Funnel'}
        </h2>
        
        <div className="space-y-4">
          {conversionFunnel.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-2xl font-bold text-gray-900">{stage.users}</div>
                  <div className="text-xs text-gray-600">
                    {isPortuguese ? 'utilizadores' : 'users'}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {isPortuguese ? stage.stagePortuguese : stage.stage}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{stage.conversionRate.toFixed(1)}% {isPortuguese ? 'conversão' : 'conversion'}</span>
                    <span>{stage.avgTimeSpent.toFixed(1)}min {isPortuguese ? 'tempo médio' : 'avg time'}</span>
                    {stage.dropoffRate > 0 && (
                      <span className="text-red-600">
                        {stage.dropoffRate.toFixed(1)}% {isPortuguese ? 'abandono' : 'drop-off'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${stage.conversionRate}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {index < conversionFunnel.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth Predictions */}
      {showPredictions && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUpIcon className="w-6 h-6 text-primary-600" />
            {isPortuguese ? 'Previsões de Crescimento' : 'Growth Predictions'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">1,200</div>
              <div className="text-sm text-gray-700">
                {isPortuguese ? 'Membros projetados em 6 meses' : 'Projected members in 6 months'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600">£28K</div>
              <div className="text-sm text-gray-700">
                {isPortuguese ? 'Receita mensal projetada' : 'Projected monthly revenue'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">85%</div>
              <div className="text-sm text-gray-700">
                {isPortuguese ? 'Taxa de retenção alvo' : 'Target retention rate'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Metric Detail Modal */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMetric(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isPortuguese ? selectedMetric.namePortuguese : selectedMetric.name}
                  </h2>
                  <div className="text-4xl font-bold text-primary-600 mt-2">
                    {formatMetricValue(selectedMetric)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Trends Chart Placeholder */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Tendência (30 dias)' : 'Trend (30 days)'}
                </h3>
                <div className="h-32 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg flex items-end justify-center">
                  <span className="text-gray-600 text-sm">
                    {isPortuguese ? 'Gráfico de tendência seria exibido aqui' : 'Trend chart would be displayed here'}
                  </span>
                </div>
              </div>

              {/* Metric Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {isPortuguese ? 'Valor Anterior' : 'Previous Value'}
                  </h4>
                  <div className="text-lg font-semibold text-gray-700">
                    {selectedMetric.format === 'percentage' ? `${selectedMetric.previousValue.toFixed(1)}%` :
                     selectedMetric.format === 'currency' ? `£${selectedMetric.previousValue.toLocaleString()}` :
                     selectedMetric.format === 'duration' ? `${selectedMetric.previousValue.toFixed(1)}min` :
                     selectedMetric.previousValue.toLocaleString()}
                  </div>
                </div>
                
                {selectedMetric.target && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isPortuguese ? 'Meta' : 'Target'}
                    </h4>
                    <div className="text-lg font-semibold text-gray-700">
                      {selectedMetric.format === 'percentage' ? `${selectedMetric.target.toFixed(1)}%` :
                       selectedMetric.format === 'currency' ? `£${selectedMetric.target.toLocaleString()}` :
                       selectedMetric.format === 'duration' ? `${selectedMetric.target.toFixed(1)}min` :
                       selectedMetric.target.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}