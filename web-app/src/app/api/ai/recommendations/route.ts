import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { aiNotificationEngine } from '@/services/AINotificationEngine'
import { predictiveCommunityAnalytics } from '@/lib/ai/PredictiveCommunityAnalytics'

/**
 * AI-Powered Recommendations API Endpoint
 * Provides personalized Portuguese cultural recommendations
 */

interface RecommendationRequest {
  user_id?: string
  recommendation_types?: string[]
  cultural_preferences?: {
    portuguese_region?: string
    saudade_intensity?: number
    cultural_interests?: string[]
    generation_in_uk?: number
  }
  limit?: number
  include_expired?: boolean
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters
    const recommendation_types = searchParams.get('types')?.split(',') || []
    const limit = parseInt(searchParams.get('limit') || '10')
    const include_expired = searchParams.get('include_expired') === 'true'

    // Track AI service usage
    const startTime = Date.now()
    
    try {
      // Get user's cultural profile for personalization
      const { data: culturalProfile } = await supabase
        .from('cultural_personality_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Get user's behavior profile
      const { data: behaviorProfile } = await supabase
        .from('user_behavior_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Build recommendation query
      let query = supabase
        .from('ai_recommendations')
        .select(`
          id,
          recommendation_type,
          recommended_item_id,
          recommended_item_type,
          recommendation_title,
          recommendation_description,
          confidence_score,
          relevance_reasons,
          cultural_relevance_score,
          saudade_therapeutic_value,
          portuguese_cultural_context,
          generational_appropriateness,
          regional_relevance,
          priority_score,
          expires_at,
          created_at
        `)
        .eq('user_id', user.id)
        .order('priority_score', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit)

      // Filter by recommendation types if specified
      if (recommendation_types.length > 0) {
        query = query.in('recommendation_type', recommendation_types)
      }

      // Filter expired recommendations unless requested
      if (!include_expired) {
        query = query.or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
      }

      const { data: recommendations, error: queryError } = await query

      if (queryError) throw queryError

      // Generate new recommendations if user has fewer than 5
      if (recommendations.length < 5) {
        await generateNewRecommendations(user.id, culturalProfile, behaviorProfile, supabase)
      }

      // Enhanced recommendations with AI insights
      const enhancedRecommendations = await Promise.all(
        recommendations.map(async (rec) => {
          // Add related content based on recommendation type
          const relatedContent = await getRelatedContent(rec, supabase)
          
          return {
            ...rec,
            related_content: relatedContent,
            ai_insights: {
              cultural_fit: calculateCulturalFit(rec, culturalProfile),
              saudade_benefit: rec.saudade_therapeutic_value,
              personalization_score: calculatePersonalizationScore(rec, behaviorProfile)
            }
          }
        })
      )

      // Track successful request
      const endTime = Date.now()
      await trackAIUsage(
        'ai_recommendations',
        'GET',
        user.id,
        endTime - startTime,
        true,
        supabase
      )

      return NextResponse.json({
        recommendations: enhancedRecommendations,
        user_profile: {
          cultural_archetype: culturalProfile?.cultural_archetype,
          saudade_intensity: culturalProfile?.saudade_capacity,
          portuguese_region: culturalProfile?.portuguese_region,
          generation_in_uk: culturalProfile?.generation_in_uk
        },
        metadata: {
          total_count: recommendations.length,
          generated_at: new Date().toISOString(),
          personalization_enabled: true,
          cultural_adaptation_applied: true
        }
      })

    } catch (error) {
      // Track failed request
      const endTime = Date.now()
      await trackAIUsage(
        'ai_recommendations',
        'GET',
        user.id,
        endTime - startTime,
        false,
        supabase,
        error instanceof Error ? error.message : 'Unknown error'
      )
      throw error
    }

  } catch (error) {
    console.error('AI Recommendations API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI recommendations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requestData: RecommendationRequest = await request.json()
    const startTime = Date.now()

    try {
      // Get user's cultural and behavior profiles
      const [culturalResult, behaviorResult] = await Promise.all([
        supabase
          .from('cultural_personality_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('user_behavior_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
      ])

      const culturalProfile = culturalResult.data
      const behaviorProfile = behaviorResult.data

      if (!culturalProfile) {
        return NextResponse.json(
          { error: 'Cultural profile required for AI recommendations' },
          { status: 400 }
        )
      }

      // Generate AI-powered recommendations
      const recommendations = await generateAIRecommendations(
        user.id,
        culturalProfile,
        behaviorProfile,
        requestData,
        supabase
      )

      // Store recommendations in database
      const storedRecommendations = await storeRecommendations(recommendations, supabase)

      // Track successful request
      const endTime = Date.now()
      await trackAIUsage(
        'ai_recommendations',
        'POST',
        user.id,
        endTime - startTime,
        true,
        supabase
      )

      return NextResponse.json({
        recommendations: storedRecommendations,
        generation_metadata: {
          algorithm_version: '2.0',
          cultural_adaptation_applied: true,
          saudade_awareness_enabled: true,
          generation_timestamp: new Date().toISOString(),
          cultural_context: culturalProfile.cultural_archetype
        }
      })

    } catch (error) {
      // Track failed request
      const endTime = Date.now()
      await trackAIUsage(
        'ai_recommendations',
        'POST',
        user.id,
        endTime - startTime,
        false,
        supabase,
        error instanceof Error ? error.message : 'Unknown error'
      )
      throw error
    }

  } catch (error) {
    console.error('AI Recommendations generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI recommendations' },
      { status: 500 }
    )
  }
}

// Helper Functions

async function generateNewRecommendations(
  userId: string,
  culturalProfile: any,
  behaviorProfile: any,
  supabase: any
) {
  // Use predictive analytics to generate new recommendations
  try {
    // Get community trends that might interest this user
    const trends = await predictiveCommunityAnalytics.predictCommunityTrends('month')
    
    // Generate recommendations based on trends and user profile
    const newRecommendations = []
    
    for (const trend of trends.slice(0, 3)) {
      if (isRelevantToUser(trend, culturalProfile)) {
        const recommendation = {
          user_id: userId,
          recommendation_type: 'cultural_event',
          recommended_item_id: null, // Would be populated with actual event IDs
          recommended_item_type: 'trend',
          recommendation_title: `Trending: ${trend.title}`,
          recommendation_description: trend.description,
          confidence_score: trend.confidence / 100,
          cultural_relevance_score: 0.8,
          portuguese_cultural_context: trend.culturalContext,
          priority_score: 75,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
        newRecommendations.push(recommendation)
      }
    }

    // Store new recommendations
    if (newRecommendations.length > 0) {
      await supabase.from('ai_recommendations').insert(newRecommendations)
    }

  } catch (error) {
    console.error('Error generating new recommendations:', error)
  }
}

async function generateAIRecommendations(
  userId: string,
  culturalProfile: any,
  behaviorProfile: any,
  requestData: RecommendationRequest,
  supabase: any
) {
  const recommendations = []

  // Recommendation type 1: Cultural Events
  if (!requestData.recommendation_types || requestData.recommendation_types.includes('cultural_event')) {
    const culturalEvents = await generateCulturalEventRecommendations(
      userId,
      culturalProfile,
      behaviorProfile,
      supabase
    )
    recommendations.push(...culturalEvents)
  }

  // Recommendation type 2: Community Connections
  if (!requestData.recommendation_types || requestData.recommendation_types.includes('community_connection')) {
    const communityConnections = await generateCommunityConnectionRecommendations(
      userId,
      culturalProfile,
      supabase
    )
    recommendations.push(...communityConnections)
  }

  // Recommendation type 3: Business Discovery
  if (!requestData.recommendation_types || requestData.recommendation_types.includes('business_discovery')) {
    const businessRecommendations = await generateBusinessRecommendations(
      userId,
      culturalProfile,
      supabase
    )
    recommendations.push(...businessRecommendations)
  }

  // Recommendation type 4: Saudade Support
  if (culturalProfile.saudade_capacity >= 7) {
    const saudadeSupport = await generateSaudadeSupportRecommendations(
      userId,
      culturalProfile,
      supabase
    )
    recommendations.push(...saudadeSupport)
  }

  return recommendations
}

async function generateCulturalEventRecommendations(
  userId: string,
  culturalProfile: any,
  behaviorProfile: any,
  supabase: any
) {
  // Get upcoming Portuguese cultural events
  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, date, cultural_category, location')
    .eq('cultural_category', 'portuguese')
    .gte('date', new Date().toISOString())
    .limit(5)

  const recommendations = []

  for (const event of events || []) {
    const relevanceScore = calculateEventRelevance(event, culturalProfile)
    
    if (relevanceScore > 0.5) {
      recommendations.push({
        user_id: userId,
        recommendation_type: 'cultural_event',
        recommended_item_id: event.id,
        recommended_item_type: 'event',
        recommendation_title: `Recommended Event: ${event.title}`,
        recommendation_description: event.description,
        confidence_score: relevanceScore,
        cultural_relevance_score: relevanceScore,
        saudade_therapeutic_value: culturalProfile.saudade_capacity >= 6 ? 0.8 : 0.3,
        portuguese_cultural_context: event.cultural_category,
        regional_relevance: [culturalProfile.portuguese_region],
        generational_appropriateness: [getGenerationalCategory(culturalProfile.generation_in_uk)],
        priority_score: Math.round(relevanceScore * 100),
        relevance_reasons: [
          'Matches your cultural interests',
          'Relevant to your Portuguese region',
          'Good for community connection'
        ]
      })
    }
  }

  return recommendations
}

async function generateCommunityConnectionRecommendations(
  userId: string,
  culturalProfile: any,
  supabase: any
) {
  // Find compatible community members
  const { data: compatibleUsers } = await supabase
    .from('cultural_compatibility_matches')
    .select(`
      user2_id,
      compatibility_score,
      saudade_connection,
      recommended_interaction,
      profiles:user2_id(id, first_name, heritage_story)
    `)
    .eq('user1_id', userId)
    .gte('compatibility_score', 70)
    .limit(3)

  const recommendations = []

  for (const match of compatibleUsers || []) {
    recommendations.push({
      user_id: userId,
      recommendation_type: 'community_connection',
      recommended_item_id: match.user2_id,
      recommended_item_type: 'user_profile',
      recommendation_title: `Connect with ${match.profiles.first_name}`,
      recommendation_description: `High cultural compatibility (${match.compatibility_score}%) - great for ${match.recommended_interaction}`,
      confidence_score: match.compatibility_score / 100,
      cultural_relevance_score: 0.9,
      saudade_therapeutic_value: match.saudade_connection === 'high' ? 0.9 : 0.6,
      portuguese_cultural_context: 'community_building',
      priority_score: match.compatibility_score,
      relevance_reasons: [
        'High cultural compatibility',
        'Shared Portuguese heritage',
        'Similar saudade experiences'
      ]
    })
  }

  return recommendations
}

async function generateBusinessRecommendations(
  userId: string,
  culturalProfile: any,
  supabase: any
) {
  // Get Portuguese businesses near user
  const { data: businesses } = await supabase
    .from('businesses')
    .select('id, name, description, category, portuguese_authenticity_score')
    .eq('is_portuguese', true)
    .gte('portuguese_authenticity_score', 80)
    .limit(3)

  const recommendations = []

  for (const business of businesses || []) {
    recommendations.push({
      user_id: userId,
      recommendation_type: 'business_discovery',
      recommended_item_id: business.id,
      recommended_item_type: 'business',
      recommendation_title: `Discover: ${business.name}`,
      recommendation_description: business.description,
      confidence_score: business.portuguese_authenticity_score / 100,
      cultural_relevance_score: business.portuguese_authenticity_score / 100,
      saudade_therapeutic_value: 0.7,
      portuguese_cultural_context: business.category,
      priority_score: business.portuguese_authenticity_score,
      relevance_reasons: [
        'Authentic Portuguese business',
        'High community rating',
        'Good for cultural connection'
      ]
    })
  }

  return recommendations
}

async function generateSaudadeSupportRecommendations(
  userId: string,
  culturalProfile: any,
  supabase: any
) {
  return [
    {
      user_id: userId,
      recommendation_type: 'saudade_support',
      recommended_item_id: null,
      recommended_item_type: 'service',
      recommendation_title: 'Saudade Support Group',
      recommendation_description: 'Connect with others who understand the deep longing for home',
      confidence_score: 0.95,
      cultural_relevance_score: 1.0,
      saudade_therapeutic_value: 0.95,
      portuguese_cultural_context: 'emotional_support',
      priority_score: 95,
      relevance_reasons: [
        'High saudade intensity detected',
        'Therapeutic community support',
        'Cultural emotional understanding'
      ]
    }
  ]
}

async function getRelatedContent(recommendation: any, supabase: any) {
  if (recommendation.recommended_item_type === 'event') {
    // Get related events
    const { data: relatedEvents } = await supabase
      .from('events')
      .select('id, title, date')
      .eq('cultural_category', 'portuguese')
      .neq('id', recommendation.recommended_item_id)
      .limit(3)
    
    return relatedEvents || []
  }
  
  return []
}

function calculateCulturalFit(recommendation: any, culturalProfile: any) {
  if (!culturalProfile) return 0.5
  
  let fit = 0.5
  
  // Regional relevance
  if (recommendation.regional_relevance?.includes(culturalProfile.portuguese_region)) {
    fit += 0.2
  }
  
  // Generational appropriateness
  const userGeneration = getGenerationalCategory(culturalProfile.generation_in_uk)
  if (recommendation.generational_appropriateness?.includes(userGeneration)) {
    fit += 0.2
  }
  
  // Cultural archetype alignment
  if (recommendation.portuguese_cultural_context) {
    fit += 0.1
  }
  
  return Math.min(fit, 1.0)
}

function calculatePersonalizationScore(recommendation: any, behaviorProfile: any) {
  if (!behaviorProfile) return 0.5
  
  // Simple personalization based on user's AI insights
  return behaviorProfile.ai_insights?.engagement_likelihood || 0.5
}

function calculateEventRelevance(event: any, culturalProfile: any) {
  let relevance = 0.5
  
  // Base relevance for Portuguese events
  if (event.cultural_category === 'portuguese') {
    relevance += 0.3
  }
  
  // Add relevance based on user's cultural archetype
  if (culturalProfile.cultural_archetype === 'saudoso_tradicional' && 
      event.title.toLowerCase().includes('traditional')) {
    relevance += 0.2
  }
  
  return Math.min(relevance, 1.0)
}

function getGenerationalCategory(generationInUK: number) {
  if (generationInUK === 1) return 'first_generation'
  if (generationInUK === 2) return 'second_generation'
  if (generationInUK >= 3) return 'third_generation'
  return 'mixed'
}

function isRelevantToUser(trend: any, culturalProfile: any) {
  // Check if trend is relevant to user's cultural profile
  return trend.affectedSegments?.some((segment: string) => 
    segment === 'all_members' || 
    segment === getGenerationalCategory(culturalProfile.generation_in_uk)
  )
}

async function storeRecommendations(recommendations: any[], supabase: any) {
  if (recommendations.length === 0) return []
  
  const { data, error } = await supabase
    .from('ai_recommendations')
    .insert(recommendations)
    .select()
  
  if (error) throw error
  return data
}

async function trackAIUsage(
  serviceName: string,
  operationType: string,
  userId: string,
  latencyMs: number,
  success: boolean,
  supabase: any,
  errorMessage?: string
) {
  try {
    await supabase.from('ai_service_usage').insert({
      service_name: serviceName,
      operation_type: operationType,
      user_id: userId,
      latency_ms: latencyMs,
      success,
      error_message: errorMessage,
      cultural_context: 'portuguese_community_recommendations'
    })
  } catch (error) {
    console.error('Failed to track AI usage:', error)
  }
}