'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { notificationService } from '@/services/NotificationService'
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  BarChart3,
  Globe,
  Heart,
  Calendar,
  Zap,
  MessageSquare,
  Settings,
  ChevronRight,
  ChevronDown,
  Activity,
  Award,
  Flag
} from 'lucide-react'

interface AIAnalytics {
  insights: string[]
  optimizations: string[]
  cultural_patterns: Record<string, any>
}

interface EngagementPrediction {
  likelihood_score: number
  optimal_send_time: string
  recommendations: string[]
}

interface CulturalInsight {
  region: string
  engagement_rate: number
  preferred_content: string[]
  optimal_times: string[]
  cultural_events: string[]
}

export default function AINotificationDashboard() {
  const { language, t } = useLanguage()
  
  // State management
  const [analytics, setAnalytics] = useState<AIAnalytics | null>(null)
  const [predictions, setPredictions] = useState<Record<string, EngagementPrediction>>({})
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    insights: true,
    predictions: true,
    cultural: true,
    optimization: false
  })

  // Portuguese regions for cultural analysis
  const portugueseRegions = [
    { code: 'all', name: 'All Regions', name_pt: 'Todas as Regiões', flag: '🇵🇹' },
    { code: 'lisboa', name: 'Lisboa', name_pt: 'Lisboa', flag: '🏛️' },
    { code: 'norte', name: 'Norte', name_pt: 'Norte', flag: '🏔️' },
    { code: 'centro', name: 'Centro', name_pt: 'Centro', flag: '🌊' },
    { code: 'alentejo', name: 'Alentejo', name_pt: 'Alentejo', flag: '🌾' },
    { code: 'algarve', name: 'Algarve', name_pt: 'Algarve', flag: '🏖️' },
    { code: 'acores', name: 'Açores', name_pt: 'Açores', flag: '🌋' },
    { code: 'madeira', name: 'Madeira', name_pt: 'Madeira', flag: '🍇' },
    { code: 'brasil', name: 'Brasil', name_pt: 'Brasil', flag: '🇧🇷' }
  ]

  // AI notification templates for prediction testing
  const notificationTemplates = [
    { id: 'cultural_event_fado', name: 'Fado Night Event', name_pt: 'Evento de Fado' },
    { id: 'business_networking_portuguese', name: 'Business Networking', name_pt: 'Networking Empresarial' },
    { id: 'festival_santos_populares', name: 'Santos Populares', name_pt: 'Santos Populares' }
  ]

  useEffect(() => {
    loadAIAnalytics()
    loadEngagementPredictions()
  }, [timeframe, selectedRegion])

  const loadAIAnalytics = async () => {
    try {
      setLoading(true)
      const analyticsData = await notificationService.getAINotificationAnalytics()
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Failed to load AI analytics:', error)
      // Mock data for development
      setAnalytics({
        insights: [
          'Lisboa region shows 15% higher engagement with cultural events',
          'Evening notifications (7-9 PM) have 25% better response rates',
          'Fado-related content generates highest emotional engagement',
          'Portuguese language content shows 20% higher click-through rates'
        ],
        optimizations: [
          'Increase cultural personalization for Norte region',
          'Optimize send times based on regional preferences',
          'A/B test formal vs casual communication styles',
          'Enhance Santos Populares promotion timing'
        ],
        cultural_patterns: {
          lisboa: { engagement_rate: 0.73, preferred_content: ['fado', 'cultural_events'], optimal_times: ['19:00', '20:00'] },
          norte: { engagement_rate: 0.68, preferred_content: ['business', 'festivals'], optimal_times: ['20:00', '21:00'] },
          acores: { engagement_rate: 0.81, preferred_content: ['community', 'traditions'], optimal_times: ['20:30', '21:30'] }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const loadEngagementPredictions = async () => {
    try {
      const predictionsData: Record<string, EngagementPrediction> = {}
      
      for (const template of notificationTemplates) {
        try {
          const prediction = await notificationService.predictNotificationEngagement(
            'demo-user-id',
            template.id
          )
          predictionsData[template.id] = prediction
        } catch (error) {
          console.error(`Failed to predict engagement for ${template.id}:`, error)
          // Mock prediction data
          predictionsData[template.id] = {
            likelihood_score: 65 + Math.random() * 30,
            optimal_send_time: ['19:00', '20:00', '21:00'][Math.floor(Math.random() * 3)],
            recommendations: [
              'High cultural relevance for target audience',
              'Evening timing optimizes engagement',
              'Portuguese language content recommended'
            ]
          }
        }
      }
      
      setPredictions(predictionsData)
    } catch (error) {
      console.error('Failed to load engagement predictions:', error)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getEngagementLabel = (score: number) => {
    if (score >= 80) return language === 'pt' ? 'Excelente' : 'Excellent'
    if (score >= 60) return language === 'pt' ? 'Bom' : 'Good'
    return language === 'pt' ? 'Baixo' : 'Low'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-gray-600">
          {language === 'pt' ? 'Carregando análises de IA...' : 'Loading AI analytics...'}
        </span>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">
              {language === 'pt' ? 'Painel de IA - Notificações' : 'AI Notification Dashboard'}
            </h1>
            <p className="text-blue-100 mt-1">
              {language === 'pt' 
                ? 'Análises inteligentes para a comunidade portuguesa'
                : 'Intelligent analytics for the Portuguese community'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Region Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Região:' : 'Region:'}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {portugueseRegions.map(region => (
                <option key={region.code} value={region.code}>
                  {region.flag} {language === 'pt' ? region.name_pt : region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Período:' : 'Timeframe:'}
            </label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              {[
                { value: '7d', label: '7d' },
                { value: '30d', label: '30d' },
                { value: '90d', label: '90d' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setTimeframe(option.value as typeof timeframe)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    timeframe === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div
            className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('insights')}
          >
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'pt' ? 'Insights de IA' : 'AI Insights'}
              </h2>
            </div>
            {expandedSections.insights ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
          
          {expandedSections.insights && (
            <div className="p-4 space-y-3">
              {analytics?.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Engagement Predictions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div
            className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleSection('predictions')}
          >
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'pt' ? 'Previsões de Engagement' : 'Engagement Predictions'}
              </h2>
            </div>
            {expandedSections.predictions ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </div>
          
          {expandedSections.predictions && (
            <div className="p-4 space-y-3">
              {notificationTemplates.map(template => {
                const prediction = predictions[template.id]
                if (!prediction) return null

                return (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {language === 'pt' ? template.name_pt : template.name}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(prediction.likelihood_score)}`}>
                        {getEngagementLabel(prediction.likelihood_score)} ({Math.round(prediction.likelihood_score)}%)
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{prediction.optimal_send_time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-4 w-4" />
                        <span>{Math.round(prediction.likelihood_score)}% {language === 'pt' ? 'engagement' : 'engagement'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${prediction.likelihood_score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cultural Patterns Analysis */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('cultural')}
        >
          <div className="flex items-center space-x-3">
            <Flag className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'pt' ? 'Padrões Culturais' : 'Cultural Patterns'}
            </h2>
          </div>
          {expandedSections.cultural ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
        
        {expandedSections.cultural && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(analytics?.cultural_patterns || {}).map(([region, pattern]: [string, any]) => {
                const regionInfo = portugueseRegions.find(r => r.code === region)
                
                return (
                  <div key={region} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl">{regionInfo?.flag || '🇵🇹'}</span>
                      <h3 className="font-medium text-gray-900">
                        {language === 'pt' ? regionInfo?.name_pt : regionInfo?.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {language === 'pt' ? 'Engagement:' : 'Engagement:'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round(pattern.engagement_rate * 100)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${pattern.engagement_rate * 100}%` }}
                        />
                      </div>
                      
                      {pattern.preferred_content && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === 'pt' ? 'Conteúdo Preferido:' : 'Preferred Content:'}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {pattern.preferred_content.map((content: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {content}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {pattern.optimal_times && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === 'pt' ? 'Horas Ótimas:' : 'Optimal Times:'}
                          </p>
                          <div className="flex space-x-1">
                            {pattern.optimal_times.map((time: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer"
          onClick={() => toggleSection('optimization')}
        >
          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'pt' ? 'Recomendações de Otimização' : 'Optimization Recommendations'}
            </h2>
          </div>
          {expandedSections.optimization ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
        
        {expandedSections.optimization && (
          <div className="p-4 space-y-3">
            {analytics?.optimizations.map((optimization, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Settings className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{optimization}</p>
                  <button className="mt-2 text-xs text-yellow-700 hover:text-yellow-800 font-medium">
                    {language === 'pt' ? '→ Implementar' : '→ Implement'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {language === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Executar Teste A/B' : 'Run A/B Test'}
            </span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Segmentar Audiência' : 'Segment Audience'}
            </span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Criar Template' : 'Create Template'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}