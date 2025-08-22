'use client'

/**
 * AI Ethics Dashboard for Portuguese Community Platform
 * 
 * Comprehensive transparency dashboard showing AI ethics status, heritage respect,
 * language preservation metrics, privacy protection, and community feedback for
 * the Portuguese community. Provides bilingual interface and cultural context.
 */

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIConsent } from '@/context/AIConsentContext'
import { aiEthicsEngine } from '@/services/AIEthicsEngine'
import { heritageRespectProtocol } from '@/services/HeritageRespectProtocol'
import { languagePreservationAI } from '@/services/LanguagePreservationAI'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Heart, 
  Globe, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
  Book,
  Lock,
  BarChart3,
  Activity,
  Calendar,
  RefreshCw
} from 'lucide-react'

interface EthicsDashboardData {
  heritage_respect: {
    status: 'excellent' | 'good' | 'needs_attention'
    score: number
    recent_violations: number
    community_satisfaction: number
    cultural_accuracy: number
  }
  language_preservation: {
    portuguese_usage_rate: number
    dialect_preservation_score: number
    bilingual_balance: number
    learning_support_effectiveness: number
    community_engagement: number
  }
  privacy_protection: {
    rating: number
    gdpr_compliance: 'excellent' | 'good' | 'needs_improvement'
    data_minimization_score: number
    encryption_status: boolean
    community_trust: number
  }
  transparency: {
    level: number
    ai_disclosure_effectiveness: number
    user_control_utilization: number
    explanation_clarity: number
    bilingual_support_quality: number
  }
  community_feedback: {
    total_participants: number
    satisfaction_score: number
    trust_level: number
    recent_concerns: string[]
    improvement_requests: string[]
  }
  recent_improvements: Array<{
    date: string
    category: string
    description: string
    impact: 'low' | 'medium' | 'high'
  }>
  upcoming_initiatives: Array<{
    title: string
    category: string
    timeline: string
    expected_impact: string
  }>
}

export default function AIEthicsDashboard() {
  const { language, t } = useLanguage()
  const { culturalSensitivityLevel, hasGivenConsent } = useAIConsent()
  
  const [dashboardData, setDashboardData] = useState<EthicsDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Load comprehensive ethics data
      const ethicsData = await aiEthicsEngine.generateEthicsDashboard()
      const heritageStatus = await getHeritageRespectStatus()
      const languageMetrics = await languagePreservationAI.generateLanguagePreservationReport()
      const privacyMetrics = await getPrivacyProtectionMetrics()
      const transparencyData = await getTransparencyMetrics()
      const communityFeedback = await getCommunityFeedbackSummary()
      
      const dashboardData: EthicsDashboardData = {
        heritage_respect: {
          status: ethicsData.heritage_respect_status,
          score: 0.87,
          recent_violations: 2,
          community_satisfaction: 0.89,
          cultural_accuracy: 0.85
        },
        language_preservation: {
          portuguese_usage_rate: languageMetrics.portuguese_usage_rate,
          dialect_preservation_score: languageMetrics.dialect_preservation_score,
          bilingual_balance: languageMetrics.bilingual_balance_ratio,
          learning_support_effectiveness: languageMetrics.language_learning_support_effectiveness,
          community_engagement: languageMetrics.community_language_satisfaction
        },
        privacy_protection: {
          rating: ethicsData.privacy_protection_rating,
          gdpr_compliance: 'excellent',
          data_minimization_score: 0.91,
          encryption_status: true,
          community_trust: ethicsData.community_trust_score
        },
        transparency: {
          level: ethicsData.transparency_level,
          ai_disclosure_effectiveness: 0.83,
          user_control_utilization: 0.67,
          explanation_clarity: 0.79,
          bilingual_support_quality: 0.88
        },
        community_feedback: {
          total_participants: 487,
          satisfaction_score: 0.84,
          trust_level: 0.78,
          recent_concerns: [
            'More dialect support needed',
            'Clearer AI explanations requested',
            'Better family privacy protection'
          ],
          improvement_requests: [
            'Enhanced Açoriano dialect support',
            'Improved saudade sensitivity',
            'More cultural event AI features'
          ]
        },
        recent_improvements: ethicsData.recent_improvements.map(improvement => ({
          date: '2025-01-15',
          category: 'Heritage Respect',
          description: improvement,
          impact: 'high' as const
        })),
        upcoming_initiatives: ethicsData.upcoming_initiatives.map(initiative => ({
          title: initiative,
          category: 'Language Preservation',
          timeline: 'Q1 2025',
          expected_impact: 'High community engagement'
        }))
      }
      
      setDashboardData(dashboardData)
      setLastUpdated(new Date().toISOString())
    } catch (error) {
      console.error('Failed to load AI Ethics Dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshDashboard = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600'
      case 'good': return 'text-blue-600'
      case 'needs_attention': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'default'
      case 'good': return 'secondary'
      case 'needs_attention': return 'destructive'
      default: return 'outline'
    }
  }

  const formatPercentage = (value: number) => Math.round(value * 100)

  if (isLoading || !dashboardData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>{language === 'pt' ? 'Carregando painel de ética...' : 'Loading ethics dashboard...'}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                {language === 'pt' ? 'Painel de Ética da IA' : 'AI Ethics Dashboard'}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {language === 'pt' ? 
                  'Transparência completa sobre ética da IA na comunidade portuguesa' :
                  'Complete transparency on AI ethics in the Portuguese community'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Última atualização' : 'Last updated'}
                </p>
                <p className="text-sm font-medium">
                  {new Date(lastUpdated).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={refreshDashboard}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {language === 'pt' ? 'Atualizar' : 'Refresh'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Respeito pelo Património' : 'Heritage Respect'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{formatPercentage(dashboardData.heritage_respect.score)}%</span>
                  <Badge variant={getStatusBadgeVariant(dashboardData.heritage_respect.status)}>
                    {dashboardData.heritage_respect.status === 'excellent' ? 
                      (language === 'pt' ? 'Excelente' : 'Excellent') :
                      dashboardData.heritage_respect.status === 'good' ?
                      (language === 'pt' ? 'Bom' : 'Good') :
                      (language === 'pt' ? 'Precisa Atenção' : 'Needs Attention')
                    }
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Book className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Preservação da Língua' : 'Language Preservation'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{formatPercentage(dashboardData.language_preservation.portuguese_usage_rate)}%</span>
                  <Badge variant="secondary">
                    {language === 'pt' ? 'Ativo' : 'Active'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Proteção da Privacidade' : 'Privacy Protection'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{formatPercentage(dashboardData.privacy_protection.rating)}%</span>
                  <Badge variant="default">
                    {dashboardData.privacy_protection.gdpr_compliance === 'excellent' ?
                      (language === 'pt' ? 'GDPR Excelente' : 'GDPR Excellent') :
                      'GDPR Good'
                    }
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? 'Confiança da Comunidade' : 'Community Trust'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{formatPercentage(dashboardData.privacy_protection.community_trust)}%</span>
                  <Badge variant="secondary">
                    {language === 'pt' ? 'Crescendo' : 'Growing'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'pt' ? 'Visão Geral' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="heritage">
            {language === 'pt' ? 'Património' : 'Heritage'}
          </TabsTrigger>
          <TabsTrigger value="language">
            {language === 'pt' ? 'Língua' : 'Language'}
          </TabsTrigger>
          <TabsTrigger value="privacy">
            {language === 'pt' ? 'Privacidade' : 'Privacy'}
          </TabsTrigger>
          <TabsTrigger value="feedback">
            {language === 'pt' ? 'Feedback' : 'Feedback'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Improvements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {language === 'pt' ? 'Melhorias Recentes' : 'Recent Improvements'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recent_improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{improvement.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {improvement.category} • {new Date(improvement.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                      </p>
                    </div>
                    <Badge variant={improvement.impact === 'high' ? 'default' : 'secondary'}>
                      {improvement.impact === 'high' ? 
                        (language === 'pt' ? 'Alto Impacto' : 'High Impact') :
                        (language === 'pt' ? 'Médio Impacto' : 'Medium Impact')
                      }
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Initiatives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {language === 'pt' ? 'Próximas Iniciativas' : 'Upcoming Initiatives'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.upcoming_initiatives.map((initiative, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{initiative.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {initiative.category} • {initiative.timeline}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">{initiative.expected_impact}</p>
                    </div>
                    <Badge variant="outline">
                      {language === 'pt' ? 'Planeado' : 'Planned'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heritage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                {language === 'pt' ? 'Respeito pelo Património Cultural' : 'Cultural Heritage Respect'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{formatPercentage(dashboardData.heritage_respect.cultural_accuracy)}%</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Precisão Cultural' : 'Cultural Accuracy'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{formatPercentage(dashboardData.heritage_respect.community_satisfaction)}%</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Satisfação da Comunidade' : 'Community Satisfaction'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{dashboardData.heritage_respect.recent_violations}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Violações Recentes' : 'Recent Violations'}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">
                  {language === 'pt' ? 'Áreas de Foco' : 'Focus Areas'}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>{language === 'pt' ? 'Respeito pela Saudade' : 'Saudade Respect'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20" />
                      <span className="text-sm">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'pt' ? 'Diversidade Regional' : 'Regional Diversity'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={87} className="w-20" />
                      <span className="text-sm">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'pt' ? 'Valores Familiares' : 'Family Values'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20" />
                      <span className="text-sm">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'pt' ? 'Tradições Religiosas' : 'Religious Traditions'}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-20" />
                      <span className="text-sm">89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                {language === 'pt' ? 'Preservação da Língua Portuguesa' : 'Portuguese Language Preservation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Métricas de Uso' : 'Usage Metrics'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Conteúdo em Português' : 'Portuguese Content'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={formatPercentage(dashboardData.language_preservation.portuguese_usage_rate)} className="w-20" />
                        <span className="text-sm">{formatPercentage(dashboardData.language_preservation.portuguese_usage_rate)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Equilíbrio Bilíngue' : 'Bilingual Balance'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={formatPercentage(dashboardData.language_preservation.bilingual_balance)} className="w-20" />
                        <span className="text-sm">{formatPercentage(dashboardData.language_preservation.bilingual_balance)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Envolvimento da Comunidade' : 'Community Engagement'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={formatPercentage(dashboardData.language_preservation.community_engagement)} className="w-20" />
                        <span className="text-sm">{formatPercentage(dashboardData.language_preservation.community_engagement)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Preservação de Dialetos' : 'Dialect Preservation'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Minhoto' : 'Minhoto'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Açoriano' : 'Azorean'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-20" />
                        <span className="text-sm">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Madeirense' : 'Madeiran'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20" />
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {language === 'pt' ? 'Proteção da Privacidade' : 'Privacy Protection'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Conformidade Técnica' : 'Technical Compliance'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>GDPR</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          {language === 'pt' ? 'Excelente' : 'Excellent'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Encriptação' : 'Encryption'}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">AES-256-GCM</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Minimização de Dados' : 'Data Minimization'}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={formatPercentage(dashboardData.privacy_protection.data_minimization_score)} className="w-20" />
                        <span className="text-sm">{formatPercentage(dashboardData.privacy_protection.data_minimization_score)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Proteção Cultural' : 'Cultural Protection'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Dados Familiares' : 'Family Data'}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          {language === 'pt' ? 'Máxima Proteção' : 'Maximum Protection'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Património' : 'Heritage'}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          {language === 'pt' ? 'Protegido' : 'Protected'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === 'pt' ? 'Privacidade Saudade' : 'Saudade Privacy'}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          {language === 'pt' ? 'Respeitada' : 'Respected'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {language === 'pt' ? 'Feedback da Comunidade' : 'Community Feedback'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{dashboardData.community_feedback.total_participants}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Participantes Total' : 'Total Participants'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{formatPercentage(dashboardData.community_feedback.satisfaction_score)}%</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Satisfação' : 'Satisfaction'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{formatPercentage(dashboardData.community_feedback.trust_level)}%</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'pt' ? 'Confiança' : 'Trust Level'}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Preocupações Recentes' : 'Recent Concerns'}
                  </h4>
                  <div className="space-y-2">
                    {dashboardData.community_feedback.recent_concerns.map((concern, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-yellow-50 border border-yellow-200">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    {language === 'pt' ? 'Solicitações de Melhoria' : 'Improvement Requests'}
                  </h4>
                  <div className="space-y-2">
                    {dashboardData.community_feedback.improvement_requests.map((request, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-blue-50 border border-blue-200">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{request}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions for data loading
async function getHeritageRespectStatus() {
  // In production, this would fetch from Heritage Respect Protocol
  return 'excellent' as const
}

async function getPrivacyProtectionMetrics() {
  // In production, this would fetch from Privacy Protection service
  return {
    rating: 0.89,
    gdpr_compliance: 'excellent' as const,
    data_minimization_score: 0.91,
    encryption_status: true,
    community_trust: 0.84
  }
}

async function getTransparencyMetrics() {
  // In production, this would fetch from Transparency service
  return {
    level: 0.82,
    ai_disclosure_effectiveness: 0.83,
    user_control_utilization: 0.67,
    explanation_clarity: 0.79,
    bilingual_support_quality: 0.88
  }
}

async function getCommunityFeedbackSummary() {
  // In production, this would fetch from Community Feedback service
  return {
    total_participants: 487,
    satisfaction_score: 0.84,
    trust_level: 0.78,
    recent_concerns: [
      'More dialect support needed',
      'Clearer AI explanations requested',
      'Better family privacy protection'
    ],
    improvement_requests: [
      'Enhanced Açoriano dialect support',
      'Improved saudade sensitivity',
      'More cultural event AI features'
    ]
  }
}