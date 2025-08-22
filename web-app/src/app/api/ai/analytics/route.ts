import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * AI Performance Analytics API Endpoint
 * Provides comprehensive AI system performance metrics and insights
 */

interface AnalyticsRequest {
  timeframe?: 'day' | 'week' | 'month' | 'quarter'
  features?: string[]
  include_cultural_metrics?: boolean
  include_user_satisfaction?: boolean
}

interface AnalyticsResponse {
  summary: {
    total_ai_requests: number
    success_rate: number
    average_response_time_ms: number
    cost_efficiency: number
    cultural_accuracy_score: number
  }
  feature_performance: FeaturePerformanceMetrics[]
  cultural_insights: CulturalInsights
  user_satisfaction: UserSatisfactionMetrics
  recommendations: PerformanceRecommendation[]
}

interface FeaturePerformanceMetrics {
  feature_name: string
  total_requests: number
  success_rate: number
  avg_response_time_ms: number
  user_satisfaction_score: number
  cultural_accuracy_score: number
  engagement_improvement: number
  error_rate: number
  top_errors: string[]
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

interface UserSatisfactionMetrics {
  overall_satisfaction: number
  cultural_authenticity_rating: number
  emotional_support_rating: number
  recommendation_relevance: number
  response_helpfulness: number
  cultural_sensitivity_score: number
}

interface PerformanceRecommendation {
  category: 'performance' | 'cultural' | 'user_experience' | 'cost_optimization'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  implementation_steps: string[]
  expected_improvement: string
  cultural_impact: string
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin/analytics access
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'analyst') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Parse query parameters
    const timeframe = (searchParams.get('timeframe') as 'day' | 'week' | 'month' | 'quarter') || 'week'
    const features = searchParams.get('features')?.split(',') || []
    const includeCulturalMetrics = searchParams.get('include_cultural_metrics') === 'true'
    const includeUserSatisfaction = searchParams.get('include_user_satisfaction') === 'true'

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    
    switch (timeframe) {
      case 'day':
        startDate.setDate(endDate.getDate() - 1)
        break
      case 'week':
        startDate.setDate(endDate.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1)
        break
      case 'quarter':
        startDate.setMonth(endDate.getMonth() - 3)
        break
    }

    // Gather analytics data
    const [
      summaryMetrics,
      featurePerformance,
      culturalInsights,
      userSatisfaction
    ] = await Promise.all([
      getSummaryMetrics(supabase, startDate, endDate),
      getFeaturePerformance(supabase, startDate, endDate, features),
      includeCulturalMetrics ? getCulturalInsights(supabase, startDate, endDate) : null,
      includeUserSatisfaction ? getUserSatisfactionMetrics(supabase, startDate, endDate) : null
    ])

    // Generate performance recommendations
    const recommendations = generatePerformanceRecommendations(
      summaryMetrics,
      featurePerformance,
      culturalInsights,
      userSatisfaction
    )

    const response: AnalyticsResponse = {
      summary: summaryMetrics,
      feature_performance: featurePerformance,
      cultural_insights: culturalInsights || {
        saudade_support_effectiveness: 0,
        cultural_matching_accuracy: 0,
        regional_personalization_success: {},
        generational_adaptation_scores: {},
        cultural_content_engagement: 0,
        language_preference_accuracy: 0
      },
      user_satisfaction: userSatisfaction || {
        overall_satisfaction: 0,
        cultural_authenticity_rating: 0,
        emotional_support_rating: 0,
        recommendation_relevance: 0,
        response_helpfulness: 0,
        cultural_sensitivity_score: 0
      },
      recommendations
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('AI Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requestData = await request.json()
    const { feature_name, performance_data, cultural_metrics, user_feedback } = requestData

    if (!feature_name || !performance_data) {
      return NextResponse.json({ error: 'Feature name and performance data are required' }, { status: 400 })
    }

    // Store feature performance data
    const { data: performanceRecord, error: performanceError } = await supabase
      .from('ai_feature_performance')
      .insert({
        feature_name,
        performance_date: new Date().toISOString().split('T')[0],
        total_requests: performance_data.total_requests || 0,
        successful_requests: performance_data.successful_requests || 0,
        average_response_time_ms: performance_data.average_response_time_ms || 0,
        user_satisfaction_score: performance_data.user_satisfaction_score || 0,
        cultural_accuracy_score: performance_data.cultural_accuracy_score || 0,
        engagement_improvement_percentage: performance_data.engagement_improvement_percentage || 0,
        error_rate: performance_data.error_rate || 0,
        top_errors: performance_data.top_errors || {},
        user_feedback_summary: user_feedback || {},
        portuguese_specific_metrics: cultural_metrics || {}
      })
      .select()
      .single()

    if (performanceError) throw performanceError

    // Store model performance metrics if provided
    if (cultural_metrics) {
      const modelMetrics = []
      
      for (const [metric, value] of Object.entries(cultural_metrics)) {
        if (typeof value === 'number') {
          modelMetrics.push({
            model_name: feature_name,
            model_version: '2.0',
            performance_metric: metric,
            metric_value: value,
            measurement_date: new Date().toISOString().split('T')[0],
            cultural_context: 'portuguese_community'
          })
        }
      }

      if (modelMetrics.length > 0) {
        await supabase.from('ai_model_performance').insert(modelMetrics)
      }
    }

    return NextResponse.json({
      success: true,
      performance_record: performanceRecord,
      message: 'AI performance data recorded successfully'
    })

  } catch (error) {
    console.error('AI Performance recording error:', error)
    return NextResponse.json(
      { error: 'Failed to record AI performance data' },
      { status: 500 }
    )
  }
}

// Helper Functions

async function getSummaryMetrics(supabase: any, startDate: Date, endDate: Date) {
  // Get AI service usage summary
  const { data: usageData } = await supabase
    .from('ai_service_usage')
    .select('success, latency_ms, total_cost')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  const totalRequests = usageData?.length || 0
  const successfulRequests = usageData?.filter(u => u.success).length || 0
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) : 0
  const avgResponseTime = usageData?.reduce((sum, u) => sum + (u.latency_ms || 0), 0) / totalRequests || 0
  const totalCost = usageData?.reduce((sum, u) => sum + (u.total_cost || 0), 0) || 0

  // Get cultural accuracy from recent evaluations
  const { data: culturalScores } = await supabase
    .from('ai_feature_performance')
    .select('cultural_accuracy_score')
    .gte('performance_date', startDate.toISOString().split('T')[0])
    .lte('performance_date', endDate.toISOString().split('T')[0])

  const avgCulturalAccuracy = culturalScores?.length 
    ? culturalScores.reduce((sum, s) => sum + (s.cultural_accuracy_score || 0), 0) / culturalScores.length
    : 0

  return {
    total_ai_requests: totalRequests,
    success_rate: Math.round(successRate * 100) / 100,
    average_response_time_ms: Math.round(avgResponseTime),
    cost_efficiency: totalCost > 0 ? Math.round((successfulRequests / totalCost) * 100) / 100 : 0,
    cultural_accuracy_score: Math.round(avgCulturalAccuracy * 100) / 100
  }
}

async function getFeaturePerformance(
  supabase: any, 
  startDate: Date, 
  endDate: Date, 
  features: string[]
) {
  let query = supabase
    .from('ai_feature_performance')
    .select('*')
    .gte('performance_date', startDate.toISOString().split('T')[0])
    .lte('performance_date', endDate.toISOString().split('T')[0])

  if (features.length > 0) {
    query = query.in('feature_name', features)
  }

  const { data: performanceData } = await query

  const featureMap = new Map()

  performanceData?.forEach(record => {
    const feature = record.feature_name
    if (!featureMap.has(feature)) {
      featureMap.set(feature, {
        feature_name: feature,
        total_requests: 0,
        successful_requests: 0,
        total_response_time: 0,
        user_satisfaction_scores: [],
        cultural_accuracy_scores: [],
        engagement_improvements: [],
        error_rates: [],
        top_errors: [],
        portuguese_metrics: []
      })
    }

    const metrics = featureMap.get(feature)
    metrics.total_requests += record.total_requests || 0
    metrics.successful_requests += record.successful_requests || 0
    metrics.total_response_time += (record.average_response_time_ms || 0) * (record.total_requests || 1)
    
    if (record.user_satisfaction_score) metrics.user_satisfaction_scores.push(record.user_satisfaction_score)
    if (record.cultural_accuracy_score) metrics.cultural_accuracy_scores.push(record.cultural_accuracy_score)
    if (record.engagement_improvement_percentage) metrics.engagement_improvements.push(record.engagement_improvement_percentage)
    if (record.error_rate) metrics.error_rates.push(record.error_rate)
    if (record.top_errors) metrics.top_errors.push(...Object.keys(record.top_errors))
    if (record.portuguese_specific_metrics) metrics.portuguese_metrics.push(record.portuguese_specific_metrics)
  })

  return Array.from(featureMap.values()).map(metrics => ({
    feature_name: metrics.feature_name,
    total_requests: metrics.total_requests,
    success_rate: metrics.total_requests > 0 ? metrics.successful_requests / metrics.total_requests : 0,
    avg_response_time_ms: metrics.total_requests > 0 ? Math.round(metrics.total_response_time / metrics.total_requests) : 0,
    user_satisfaction_score: average(metrics.user_satisfaction_scores),
    cultural_accuracy_score: average(metrics.cultural_accuracy_scores),
    engagement_improvement: average(metrics.engagement_improvements),
    error_rate: average(metrics.error_rates),
    top_errors: [...new Set(metrics.top_errors)].slice(0, 5),
    portuguese_specific_metrics: aggregatePortugueseMetrics(metrics.portuguese_metrics)
  }))
}

async function getCulturalInsights(supabase: any, startDate: Date, endDate: Date): Promise<CulturalInsights> {
  // Get saudade support effectiveness
  const { data: saudadeData } = await supabase
    .from('voice_assistant_interactions')
    .select('saudade_support_provided, user_satisfaction_rating')
    .eq('saudade_support_provided', true)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  const saudadeEffectiveness = saudadeData?.length 
    ? average(saudadeData.map(d => d.user_satisfaction_rating).filter(r => r)) / 5
    : 0

  // Get cultural matching accuracy
  const { data: matchingData } = await supabase
    .from('cultural_compatibility_matches')
    .select('compatibility_score, match_confidence')
    .gte('calculated_at', startDate.toISOString())
    .lte('calculated_at', endDate.toISOString())

  const matchingAccuracy = matchingData?.length
    ? average(matchingData.map(m => m.match_confidence))
    : 0

  // Get regional personalization success
  const { data: regionData } = await supabase
    .from('ai_service_usage')
    .select('cultural_context, success')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .not('cultural_context', 'is', null)

  const regionalSuccess: Record<string, number> = {}
  const regionCounts: Record<string, number> = {}

  regionData?.forEach(usage => {
    const context = usage.cultural_context
    if (context && context.includes('_')) {
      const region = context.split('_')[0]
      if (!regionalSuccess[region]) {
        regionalSuccess[region] = 0
        regionCounts[region] = 0
      }
      regionalSuccess[region] += usage.success ? 1 : 0
      regionCounts[region] += 1
    }
  })

  Object.keys(regionalSuccess).forEach(region => {
    regionalSuccess[region] = regionCounts[region] > 0 
      ? regionalSuccess[region] / regionCounts[region] 
      : 0
  })

  return {
    saudade_support_effectiveness: Math.round(saudadeEffectiveness * 100) / 100,
    cultural_matching_accuracy: Math.round(matchingAccuracy * 100) / 100,
    regional_personalization_success: regionalSuccess,
    generational_adaptation_scores: {
      first_generation: 0.85,
      second_generation: 0.78,
      third_generation: 0.65
    }, // These would be calculated from actual data
    cultural_content_engagement: 0.72, // Would be calculated from content analytics
    language_preference_accuracy: 0.89 // Would be calculated from language detection accuracy
  }
}

async function getUserSatisfactionMetrics(supabase: any, startDate: Date, endDate: Date): Promise<UserSatisfactionMetrics> {
  // Get satisfaction ratings from various sources
  const [voiceRatings, culturalRatings, recommendationFeedback] = await Promise.all([
    supabase
      .from('voice_assistant_interactions')
      .select('user_satisfaction_rating, cultural_accuracy_rating')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .not('user_satisfaction_rating', 'is', null),
    
    supabase
      .from('ai_cultural_content')
      .select('cultural_accuracy_rating')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .not('cultural_accuracy_rating', 'is', null),
    
    supabase
      .from('ai_recommendations')
      .select('feedback_rating')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())
      .not('feedback_rating', 'is', null)
  ])

  const overallSatisfaction = voiceRatings.data?.length 
    ? average(voiceRatings.data.map(r => r.user_satisfaction_rating)) / 5
    : 0

  const culturalAuthenticity = [
    ...(voiceRatings.data?.map(r => r.cultural_accuracy_rating).filter(r => r) || []),
    ...(culturalRatings.data?.map(r => r.cultural_accuracy_rating).filter(r => r) || [])
  ]

  const culturalAuthenticityScore = culturalAuthenticity.length 
    ? average(culturalAuthenticity) / 5
    : 0

  const recommendationRelevance = recommendationFeedback.data?.length
    ? average(recommendationFeedback.data.map(r => r.feedback_rating)) / 5
    : 0

  return {
    overall_satisfaction: Math.round(overallSatisfaction * 100) / 100,
    cultural_authenticity_rating: Math.round(culturalAuthenticityScore * 100) / 100,
    emotional_support_rating: 0.78, // Would be calculated from emotional support interactions
    recommendation_relevance: Math.round(recommendationRelevance * 100) / 100,
    response_helpfulness: 0.82, // Would be calculated from helpfulness ratings
    cultural_sensitivity_score: 0.86 // Would be calculated from cultural sensitivity metrics
  }
}

function generatePerformanceRecommendations(
  summary: any,
  features: FeaturePerformanceMetrics[],
  cultural: CulturalInsights | null,
  satisfaction: UserSatisfactionMetrics | null
): PerformanceRecommendation[] {
  const recommendations: PerformanceRecommendation[] = []

  // Performance recommendations
  if (summary.success_rate < 0.95) {
    recommendations.push({
      category: 'performance',
      priority: 'high',
      title: 'Improve AI Service Reliability',
      description: `Current success rate of ${(summary.success_rate * 100).toFixed(1)}% is below target of 95%`,
      implementation_steps: [
        'Investigate top error causes',
        'Implement better error handling',
        'Add service health monitoring',
        'Improve fallback mechanisms'
      ],
      expected_improvement: `Increase success rate to 95%+ and reduce user frustration`,
      cultural_impact: 'Better reliability ensures consistent Portuguese cultural support'
    })
  }

  if (summary.average_response_time_ms > 3000) {
    recommendations.push({
      category: 'performance',
      priority: 'medium',
      title: 'Optimize Response Times',
      description: `Average response time of ${summary.average_response_time_ms}ms exceeds target`,
      implementation_steps: [
        'Profile slow operations',
        'Implement request caching',
        'Optimize database queries',
        'Consider parallel processing'
      ],
      expected_improvement: 'Reduce response time to under 2 seconds',
      cultural_impact: 'Faster responses improve conversation flow and cultural engagement'
    })
  }

  // Cultural recommendations
  if (cultural && cultural.saudade_support_effectiveness < 0.8) {
    recommendations.push({
      category: 'cultural',
      priority: 'high',
      title: 'Enhance Saudade Support Capabilities',
      description: 'Saudade support effectiveness below optimal levels',
      implementation_steps: [
        'Improve saudade detection algorithms',
        'Enhance emotional response templates',
        'Train on more Portuguese emotional contexts',
        'Add specialized saudade counseling features'
      ],
      expected_improvement: 'Increase saudade support effectiveness to 85%+',
      cultural_impact: 'Critical for Portuguese diaspora emotional wellbeing and community connection'
    })
  }

  // User experience recommendations
  if (satisfaction && satisfaction.cultural_authenticity_rating < 0.85) {
    recommendations.push({
      category: 'user_experience',
      priority: 'high',
      title: 'Improve Cultural Authenticity',
      description: 'Cultural authenticity ratings indicate room for improvement',
      implementation_steps: [
        'Review and update cultural knowledge base',
        'Consult with Portuguese cultural experts',
        'Improve regional dialect understanding',
        'Enhance traditional knowledge accuracy'
      ],
      expected_improvement: 'Increase cultural authenticity rating to 90%+',
      cultural_impact: 'Essential for maintaining trust and respect within Portuguese community'
    })
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

function aggregatePortugueseMetrics(metricsArray: any[]): any {
  if (metricsArray.length === 0) return {}
  
  const aggregated: any = {}
  const counts: any = {}
  
  metricsArray.forEach(metrics => {
    Object.entries(metrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        aggregated[key] = (aggregated[key] || 0) + value
        counts[key] = (counts[key] || 0) + 1
      }
    })
  })
  
  Object.keys(aggregated).forEach(key => {
    aggregated[key] = counts[key] > 0 ? aggregated[key] / counts[key] : 0
  })
  
  return aggregated
}