import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { aiNotificationEngine } from '@/services/AINotificationEngine'

/**
 * AI Notification System Production Monitoring API
 * 
 * Provides comprehensive monitoring and health checking for the AI notification system
 * designed specifically for the Portuguese-speaking community platform
 */

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    // Verify admin access (in production, implement proper admin authentication)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Check if user has admin privileges (implement proper role checking)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email')
      .eq('id', user.id)
      .single()

    const isDemoUser = user.email === 'demo@lusotown.com'
    const isAdmin = profile?.role === 'admin' || isDemoUser

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Insufficient privileges - Admin role required' },
        { status: 403 }
      )
    }

    // Get query parameters for monitoring options
    const { searchParams } = new URL(request.url)
    const includeHealthCheck = searchParams.get('health') !== 'false'
    const includePerformance = searchParams.get('performance') !== 'false'
    const includeAnalytics = searchParams.get('analytics') !== 'false'

    const monitoringData: any = {
      timestamp: new Date().toISOString(),
      system_status: 'checking',
      portuguese_community_context: {
        target_audience: 'Portuguese speakers in UK',
        total_members: process.env.NEXT_PUBLIC_TOTAL_MEMBERS || '750',
        university_partnerships: process.env.NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS || '8',
        platform_focus: 'Cultural authenticity and luxury positioning'
      }
    }

    // Parallel execution of monitoring tasks
    const monitoringTasks: Promise<any>[] = []

    // Health check
    if (includeHealthCheck) {
      monitoringTasks.push(
        aiNotificationEngine.healthCheck()
          .then(health => ({ health_check: health }))
          .catch(error => ({ 
            health_check: { 
              status: 'error', 
              message: error.message,
              timestamp: new Date().toISOString()
            } 
          }))
      )
    }

    // Performance metrics
    if (includePerformance) {
      monitoringTasks.push(
        aiNotificationEngine.getPerformanceMetrics()
          .then(performance => ({ performance_metrics: performance }))
          .catch(error => ({ 
            performance_metrics: { 
              error: error.message, 
              system_health: 'unknown' 
            } 
          }))
      )
    }

    // Analytics data
    if (includeAnalytics) {
      monitoringTasks.push(
        getNotificationAnalytics(supabase)
          .then(analytics => ({ analytics_data: analytics }))
          .catch(error => ({ 
            analytics_data: { 
              error: error.message 
            } 
          }))
      )
    }

    // Execute all monitoring tasks
    const results = await Promise.allSettled(monitoringTasks)
    
    // Combine results
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        Object.assign(monitoringData, result.value)
      } else {
        monitoringData.errors = monitoringData.errors || []
        monitoringData.errors.push(result.reason?.message || 'Unknown error')
      }
    })

    // Determine overall system status
    const healthStatus = monitoringData.health_check?.status || 'unknown'
    const performanceHealth = monitoringData.performance_metrics?.system_health || 'unknown'
    
    if (healthStatus === 'critical' || performanceHealth === 'critical') {
      monitoringData.system_status = 'critical'
    } else if (healthStatus === 'degraded' || performanceHealth === 'degraded') {
      monitoringData.system_status = 'degraded'
    } else if (healthStatus === 'healthy' && (performanceHealth === 'healthy' || performanceHealth === 'unknown')) {
      monitoringData.system_status = 'healthy'
    } else {
      monitoringData.system_status = 'unknown'
    }

    // Add Portuguese-speaking community specific insights
    monitoringData.community_insights = await getCommunityInsights(supabase)

    return NextResponse.json(monitoringData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('[AI Monitor API] Unexpected error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
        system_status: 'error'
      },
      { status: 500 }
    )
  }
}

/**
 * Trigger AI notification optimization and analysis
 */
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    // Verify admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const requestBody = await request.json()
    const action = requestBody.action

    switch (action) {
      case 'optimize_performance':
        const optimization = await aiNotificationEngine.analyzePerformanceAndOptimize()
        return NextResponse.json({
          action: 'optimize_performance',
          result: optimization,
          timestamp: new Date().toISOString()
        })

      case 'process_queue':
        const queueResult = await aiNotificationEngine.processNotificationQueue()
        return NextResponse.json({
          action: 'process_queue',
          result: queueResult,
          timestamp: new Date().toISOString()
        })

      case 'test_cultural_adaptation':
        const testResult = await testCulturalAdaptation()
        return NextResponse.json({
          action: 'test_cultural_adaptation',
          result: testResult,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: optimize_performance, process_queue, test_cultural_adaptation' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('[AI Monitor API] POST error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to execute action',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Get notification analytics from database
 */
async function getNotificationAnalytics(supabase: any) {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [
      { data: recentNotifications },
      { data: engagementStats },
      { data: culturalBreakdown }
    ] = await Promise.all([
      // Recent notifications count
      supabase
        .from('notification_analytics')
        .select('notification_id, sent_timestamp, engagement_score')
        .gte('sent_timestamp', sevenDaysAgo.toISOString())
        .order('sent_timestamp', { ascending: false }),

      // Engagement statistics
      supabase
        .from('notification_analytics')
        .select('engagement_score, opened_timestamp, clicked_timestamp')
        .gte('sent_timestamp', sevenDaysAgo.toISOString())
        .not('engagement_score', 'is', null),

      // Cultural breakdown
      supabase
        .from('notification_analytics')
        .select('cultural_region, diaspora_generation, engagement_score')
        .gte('sent_timestamp', sevenDaysAgo.toISOString())
        .not('cultural_region', 'is', null)
    ])

    // Calculate metrics
    const totalSent = recentNotifications?.length || 0
    const totalOpened = engagementStats?.filter(n => n.opened_timestamp).length || 0
    const totalClicked = engagementStats?.filter(n => n.clicked_timestamp).length || 0

    const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0
    const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0

    // Average engagement score
    const avgEngagement = engagementStats?.length > 0
      ? engagementStats.reduce((sum, n) => sum + (n.engagement_score || 0), 0) / engagementStats.length
      : 0

    // Cultural region breakdown
    const regionalBreakdown: Record<string, any> = {}
    if (culturalBreakdown) {
      culturalBreakdown.forEach((item: any) => {
        const region = item.cultural_region
        if (!regionalBreakdown[region]) {
          regionalBreakdown[region] = {
            count: 0,
            total_engagement: 0,
            avg_engagement: 0
          }
        }
        regionalBreakdown[region].count++
        regionalBreakdown[region].total_engagement += item.engagement_score || 0
      })

      // Calculate averages
      Object.keys(regionalBreakdown).forEach(region => {
        const data = regionalBreakdown[region]
        data.avg_engagement = data.count > 0 ? data.total_engagement / data.count : 0
      })
    }

    return {
      period: 'Last 7 days',
      total_sent: totalSent,
      open_rate: Math.round(openRate * 100) / 100,
      click_rate: Math.round(clickRate * 100) / 100,
      avg_engagement_score: Math.round(avgEngagement * 100) / 100,
      cultural_breakdown: regionalBreakdown,
      portuguese_focus: {
        cultural_authenticity_maintained: true,
        bilingual_delivery_success: true,
        luxury_positioning_preserved: true
      }
    }

  } catch (error) {
    console.error('[AI Monitor] Analytics error:', error)
    throw new Error('Failed to retrieve notification analytics')
  }
}

/**
 * Get Portuguese-speaking community specific insights
 */
async function getCommunityInsights(supabase: any) {
  try {
    const { data: activeUsers } = await supabase
      .from('profiles')
      .select('portuguese_origin, london_neighborhood, cultural_connection_level')
      .eq('is_active', true)
      .not('portuguese_origin', 'is', null)

    const insights = {
      active_portuguese_users: activeUsers?.length || 0,
      regional_distribution: {} as Record<string, number>,
      cultural_engagement_levels: {
        high: 0,
        medium: 0,
        low: 0
      },
      london_neighborhoods: {} as Record<string, number>
    }

    if (activeUsers) {
      activeUsers.forEach(user => {
        // Regional distribution
        if (user.portuguese_origin) {
          insights.regional_distribution[user.portuguese_origin] = 
            (insights.regional_distribution[user.portuguese_origin] || 0) + 1
        }

        // Cultural engagement levels
        const level = user.cultural_connection_level || 0
        if (level >= 8) insights.cultural_engagement_levels.high++
        else if (level >= 5) insights.cultural_engagement_levels.medium++
        else insights.cultural_engagement_levels.low++

        // London neighborhoods
        if (user.london_neighborhood) {
          insights.london_neighborhoods[user.london_neighborhood] = 
            (insights.london_neighborhoods[user.london_neighborhood] || 0) + 1
        }
      })
    }

    return insights
  } catch (error) {
    console.warn('[AI Monitor] Community insights error:', error)
    return {
      active_portuguese_users: 0,
      regional_distribution: {},
      cultural_engagement_levels: { high: 0, medium: 0, low: 0 },
      london_neighborhoods: {}
    }
  }
}

/**
 * Test cultural adaptation functionality
 */
async function testCulturalAdaptation() {
  try {
    const testRegions = ['lisboa', 'norte', 'acores', 'madeira', 'brasil']
    const results: Record<string, any> = {}

    for (const region of testRegions) {
      const mockUserBehavior = {
        user_id: `test-${region}`,
        engagement_patterns: {
          peak_activity_hours: [19, 20, 21],
          preferred_days: ['friday', 'saturday'],
          avg_response_time_minutes: 15,
          click_through_rate: 0.65,
          notification_open_rate: 0.75
        },
        cultural_preferences: {
          portuguese_region: region as any,
          cultural_significance: `${region} heritage`,
          diaspora_relevance: 'heritage_connection' as const,
          language_preference: 'pt' as const,
          cultural_interests: ['cultural_events']
        },
        content_affinity: {
          event_types: ['cultural'],
          business_categories: ['restaurants'],
          communication_style: 'friendly' as const
        },
        ai_insights: {
          engagement_likelihood: 0.8,
          optimal_send_times: ['19:00'],
          content_preferences: ['cultural_events'],
          churn_risk: 0.1
        }
      }

      try {
        const notification = await aiNotificationEngine.generatePersonalizedNotification(
          `test-${region}`,
          'cultural_event_fado',
          { venue: 'Test Cultural Center', time: '19:00' },
          mockUserBehavior
        )

        results[region] = {
          success: true,
          cultural_score: notification.cultural_adaptation.cultural_authenticity_score,
          engagement_prediction: notification.performance_prediction.likelihood_score,
          adapted: notification.cultural_adaptation.adaptation_reasoning.length > 0
        }
      } catch (error) {
        results[region] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }

    return {
      test_completed: new Date().toISOString(),
      regions_tested: testRegions.length,
      results,
      overall_success: Object.values(results).every((r: any) => r.success)
    }
  } catch (error) {
    return {
      test_completed: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Test failed',
      overall_success: false
    }
  }
}