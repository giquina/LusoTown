'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Heart,
  Globe,
  Users,
  Zap,
  DollarSign,
  Clock,
  Shield,
  MessageSquare
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface AIMetrics {
  summary: {
    total_ai_requests: number
    success_rate: number
    average_response_time_ms: number
    cost_efficiency: number
    cultural_accuracy_score: number
  }
  feature_performance: FeaturePerformance[]
  cultural_insights: CulturalInsights
  user_satisfaction: UserSatisfaction
  recommendations: PerformanceRecommendation[]
}

interface FeaturePerformance {
  feature_name: string
  total_requests: number
  success_rate: number
  avg_response_time_ms: number
  user_satisfaction_score: number
  cultural_accuracy_score: number
  engagement_improvement: number
  error_rate: number
  portuguese_specific_metrics: {
    saudade_detection_accuracy?: number
    cultural_authenticity_score?: number
    bilingual_quality_score?: number
    regional_adaptation_success?: number
  }
}

interface CulturalInsights {
  saudade_support_effectiveness: number
  cultural_matching_accuracy: number
  regional_personalization_success: Record<string, number>
  generational_adaptation_scores: Record<string, number>
  cultural_content_engagement: number
  language_preference_accuracy: number
}

interface UserSatisfaction {
  overall_satisfaction: number
  cultural_authenticity_rating: number
  emotional_support_rating: number
  recommendation_relevance: number
  response_helpfulness: number
  cultural_sensitivity_score: number
}

interface PerformanceRecommendation {
  category: string
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  cultural_impact: string
}

export default function AIMonitoringDashboard() {
  const { t } = useLanguage()
  const [metrics, setMetrics] = useState<AIMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('week')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadMetrics()
  }, [selectedTimeframe])

  const loadMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ai/analytics?timeframe=${selectedTimeframe}&include_cultural_metrics=true&include_user_satisfaction=true`)
      
      if (!response.ok) {
        throw new Error('Failed to load AI metrics')
      }

      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error('Error loading AI metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshMetrics = async () => {
    setRefreshing(true)
    await loadMetrics()
    setRefreshing(false)
  }

  const getHealthStatusIcon = (value: number, threshold: number = 0.8) => {
    if (value >= threshold) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (value >= threshold * 0.7) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getHealthStatusColor = (value: number, threshold: number = 0.8) => {
    if (value >= threshold) return 'text-green-600'
    if (value >= threshold * 0.7) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`
  const formatCurrency = (value: number) => `£${value.toFixed(4)}`
  const formatMs = (value: number) => `${value.toFixed(0)}ms`

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading AI Metrics</AlertTitle>
          <AlertDescription>
            Failed to load AI performance data. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Performance Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Portuguese Community AI Systems Monitoring
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
          <Button 
            onClick={refreshMetrics} 
            disabled={refreshing}
            variant="outline"
          >
            {refreshing ? <Activity className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.total_ai_requests.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">AI service calls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            {getHealthStatusIcon(metrics.summary.success_rate)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthStatusColor(metrics.summary.success_rate)}`}>
              {formatPercentage(metrics.summary.success_rate)}
            </div>
            <p className="text-xs text-gray-600 mt-1">System reliability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMs(metrics.summary.average_response_time_ms)}</div>
            <p className="text-xs text-gray-600 mt-1">Average latency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cultural Accuracy</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getHealthStatusColor(metrics.summary.cultural_accuracy_score)}`}>
              {formatPercentage(metrics.summary.cultural_accuracy_score)}
            </div>
            <p className="text-xs text-gray-600 mt-1">Portuguese authenticity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Efficiency</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.summary.cost_efficiency.toFixed(1)}</div>
            <p className="text-xs text-gray-600 mt-1">Requests per £</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Feature Performance</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Insights</TabsTrigger>
          <TabsTrigger value="satisfaction">User Satisfaction</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4">
            {metrics.feature_performance.map((feature) => (
              <Card key={feature.feature_name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{feature.feature_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                      <CardDescription>
                        {feature.total_requests.toLocaleString()} requests • {formatPercentage(feature.success_rate)} success rate
                      </CardDescription>
                    </div>
                    <Badge variant={feature.success_rate >= 0.95 ? 'default' : feature.success_rate >= 0.8 ? 'secondary' : 'destructive'}>
                      {feature.success_rate >= 0.95 ? 'Excellent' : feature.success_rate >= 0.8 ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Response Time</div>
                      <div className="text-lg font-semibold">{formatMs(feature.avg_response_time_ms)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">User Satisfaction</div>
                      <div className="text-lg font-semibold">{feature.user_satisfaction_score.toFixed(1)}/5</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Cultural Score</div>
                      <div className="text-lg font-semibold">{feature.cultural_accuracy_score.toFixed(1)}/5</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Engagement Boost</div>
                      <div className="text-lg font-semibold">+{feature.engagement_improvement.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* Portuguese-specific metrics */}
                  {feature.portuguese_specific_metrics && Object.keys(feature.portuguese_specific_metrics).length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm font-medium text-gray-700 mb-2">Portuguese Cultural Metrics</div>
                      <div className="grid grid-cols-2 gap-4">
                        {feature.portuguese_specific_metrics.saudade_detection_accuracy && (
                          <div>
                            <div className="text-xs text-gray-600">Saudade Detection</div>
                            <div className="text-sm font-semibold">{formatPercentage(feature.portuguese_specific_metrics.saudade_detection_accuracy)}</div>
                          </div>
                        )}
                        {feature.portuguese_specific_metrics.cultural_authenticity_score && (
                          <div>
                            <div className="text-xs text-gray-600">Cultural Authenticity</div>
                            <div className="text-sm font-semibold">{formatPercentage(feature.portuguese_specific_metrics.cultural_authenticity_score)}</div>
                          </div>
                        )}
                        {feature.portuguese_specific_metrics.bilingual_quality_score && (
                          <div>
                            <div className="text-xs text-gray-600">Bilingual Quality</div>
                            <div className="text-sm font-semibold">{formatPercentage(feature.portuguese_specific_metrics.bilingual_quality_score)}</div>
                          </div>
                        )}
                        {feature.portuguese_specific_metrics.regional_adaptation_success && (
                          <div>
                            <div className="text-xs text-gray-600">Regional Adaptation</div>
                            <div className="text-sm font-semibold">{formatPercentage(feature.portuguese_specific_metrics.regional_adaptation_success)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Saudade Support Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Overall Effectiveness</span>
                    <span className="font-semibold">{formatPercentage(metrics.cultural_insights.saudade_support_effectiveness)}</span>
                  </div>
                  <Progress value={metrics.cultural_insights.saudade_support_effectiveness * 100} className="h-2" />
                  <p className="text-sm text-gray-600">
                    Measures how well AI systems provide emotional support for Portuguese diaspora experiences
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Cultural Matching Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Matching Success</span>
                    <span className="font-semibold">{formatPercentage(metrics.cultural_insights.cultural_matching_accuracy)}</span>
                  </div>
                  <Progress value={metrics.cultural_insights.cultural_matching_accuracy * 100} className="h-2" />
                  <p className="text-sm text-gray-600">
                    AI-powered cultural compatibility matching between community members
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Regional Personalization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(metrics.cultural_insights.regional_personalization_success).map(([region, score]) => (
                    <div key={region} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="capitalize">{region.replace('_', ' ')}</span>
                        <span className="font-semibold">{formatPercentage(score)}</span>
                      </div>
                      <Progress value={score * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Generational Adaptation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(metrics.cultural_insights.generational_adaptation_scores).map(([generation, score]) => (
                    <div key={generation} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="capitalize">{generation.replace('_', ' ')}</span>
                        <span className="font-semibold">{formatPercentage(score)}</span>
                      </div>
                      <Progress value={score * 100} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {(metrics.user_satisfaction.overall_satisfaction * 5).toFixed(1)}/5
                  </div>
                  <Progress value={metrics.user_satisfaction.overall_satisfaction * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Authenticity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {(metrics.user_satisfaction.cultural_authenticity_rating * 5).toFixed(1)}/5
                  </div>
                  <Progress value={metrics.user_satisfaction.cultural_authenticity_rating * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emotional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {(metrics.user_satisfaction.emotional_support_rating * 5).toFixed(1)}/5
                  </div>
                  <Progress value={metrics.user_satisfaction.emotional_support_rating * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Satisfaction Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Recommendation Relevance</div>
                    <div className="flex justify-between items-center">
                      <Progress value={metrics.user_satisfaction.recommendation_relevance * 100} className="h-2 flex-1 mr-3" />
                      <span className="font-semibold">{formatPercentage(metrics.user_satisfaction.recommendation_relevance)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Response Helpfulness</div>
                    <div className="flex justify-between items-center">
                      <Progress value={metrics.user_satisfaction.response_helpfulness * 100} className="h-2 flex-1 mr-3" />
                      <span className="font-semibold">{formatPercentage(metrics.user_satisfaction.response_helpfulness)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Cultural Sensitivity</div>
                    <div className="flex justify-between items-center">
                      <Progress value={metrics.user_satisfaction.cultural_sensitivity_score * 100} className="h-2 flex-1 mr-3" />
                      <span className="font-semibold">{formatPercentage(metrics.user_satisfaction.cultural_sensitivity_score)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {metrics.recommendations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Critical Issues</h3>
                <p className="text-gray-600">All AI systems are performing within acceptable parameters.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {metrics.recommendations.map((rec, index) => (
                <Card key={index} className={`border-l-4 ${
                  rec.priority === 'high' ? 'border-l-red-500' :
                  rec.priority === 'medium' ? 'border-l-yellow-500' :
                  'border-l-blue-500'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {rec.priority === 'high' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                          {rec.priority === 'medium' && <Zap className="h-5 w-5 text-yellow-500" />}
                          {rec.priority === 'low' && <TrendingUp className="h-5 w-5 text-blue-500" />}
                          {rec.title}
                        </CardTitle>
                        <CardDescription>{rec.description}</CardDescription>
                      </div>
                      <Badge variant={
                        rec.priority === 'high' ? 'destructive' :
                        rec.priority === 'medium' ? 'secondary' :
                        'default'
                      }>
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Category</div>
                        <div className="text-sm text-gray-600 capitalize">{rec.category.replace('_', ' ')}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Cultural Impact</div>
                        <div className="text-sm text-gray-600">{rec.cultural_impact}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}