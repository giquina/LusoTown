import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { LusoBotEngine, SaudadeEngine } from '@/lib/lusobot-engine'
import { withRateLimit } from '@/lib/lusobot-rate-limit'
import type { Language } from '@/i18n'
import type { LusoBotMessage, MessageMetadata } from '@/lib/lusobot-engine'

/**
 * Enhanced LusoBot AI Chat API Endpoint
 * Provides Portuguese cultural AI assistance with saudade support
 */

interface ChatRequest {
  message: string
  language?: Language
  session_id?: string
  cultural_context?: {
    portuguese_region?: string
    saudade_intensity?: number
    cultural_interests?: string[]
  }
}

interface ChatResponse {
  response: LusoBotMessage
  conversation_context: {
    saudade_detected: boolean
    cultural_topics: string[]
    emotional_support_provided: boolean
    recommendations: any[]
  }
  session_metadata: {
    session_id: string
    conversation_count: number
    cultural_effectiveness: number
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

    const requestData: ChatRequest = await request.json()
    const { message, language = 'en', session_id, cultural_context } = requestData
    
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get user profiles for rate limiting context
    const [culturalProfileResult, userProfileResult, subscriptionResult] = await Promise.all([
      supabase
        .from('cultural_personality_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('profiles')
        .select('first_name, heritage_story, cultural_background, community_role, community_contributions, verified_heritage')
        .eq('id', user.id)
        .single(),
      supabase
        .from('subscriptions')
        .select('status, tier')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()
    ])

    const culturalProfile = culturalProfileResult.data
    const userProfile = userProfileResult.data
    const hasActiveSubscription = !!subscriptionResult.data

    // Detect emotional tone and cultural context for rate limiting
    const emotionalTone = SaudadeEngine.detectSaudade(message, language)
    const culturalContext = (LusoBotEngine as any).identifyCulturalContext(message, language)

    // Apply rate limiting with context
    const rateLimitCheck = await withRateLimit('free')(
      user.id,
      request,
      {
        userProfile,
        culturalProfile,
        hasActiveSubscription,
        emotionalTone,
        culturalContext
      }
    )

    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          message: rateLimitCheck.message,
          retryAfter: Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000),
          limit: rateLimitCheck.limit,
          remaining: rateLimitCheck.remaining,
          tier: rateLimitCheck.tier
        }, 
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitCheck.limit.toString(),
            'X-RateLimit-Remaining': rateLimitCheck.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitCheck.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const startTime = Date.now()
    const sessionId = session_id || `lusobot_${Date.now()}_${user.id}`

    try {
      // Get user's cultural profile for enhanced context
      const { data: culturalProfile } = await supabase
        .from('cultural_personality_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      // Get user's Portuguese profile for additional context
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('first_name, heritage_story, cultural_background')
        .eq('id', user.id)
        .single()

      // Build comprehensive message metadata
      const messageMetadata: MessageMetadata = {
        userRegion: cultural_context?.portuguese_region || culturalProfile?.portuguese_region || 'diaspora_uk',
        communityLevel: determineCommunityLevel(culturalProfile),
        languageProficiency: determineLanguageProficiency(culturalProfile),
        interests: cultural_context?.cultural_interests || extractInterestsFromProfile(culturalProfile),
        mood: 'curious' // Default, could be enhanced with sentiment analysis
      }

      // Detect saudade and emotional state
      const emotionalTone = SaudadeEngine.detectSaudade(message, language)
      const saudadeDetected = emotionalTone.saudade > 0.3

      // Generate AI response using LusoBot engine
      const botResponse = await LusoBotEngine.generateResponse(
        message,
        messageMetadata,
        language
      )

      // Enhanced cultural analysis
      const culturalTopics = extractCulturalTopics(message, botResponse.content)
      const emotionalSupportProvided = checkEmotionalSupport(botResponse.content, emotionalTone)

      // Generate contextual recommendations
      const recommendations = await generateContextualRecommendations(
        user.id,
        message,
        culturalProfile,
        emotionalTone,
        supabase
      )

      // Update conversation context in database
      await updateConversationContext(
        user.id,
        sessionId,
        emotionalTone,
        culturalTopics,
        emotionalSupportProvided,
        supabase
      )

      // Store conversation interaction for learning
      await storeConversationInteraction(
        user.id,
        sessionId,
        message,
        botResponse.content,
        language,
        culturalTopics,
        saudadeDetected,
        supabase
      )

      // Get updated session metadata
      const sessionMetadata = await getSessionMetadata(user.id, sessionId, supabase)

      // Track successful AI interaction
      const endTime = Date.now()
      await trackAIUsage(
        'lusobot',
        'chat_interaction',
        user.id,
        endTime - startTime,
        true,
        supabase,
        culturalTopics.join(',')
      )

      const response: ChatResponse = {
        response: {
          ...botResponse,
          metadata: {
            ...botResponse.metadata,
            cultural_effectiveness: calculateCulturalEffectiveness(botResponse, culturalProfile),
            saudade_therapeutic_value: emotionalTone.saudade > 0.5 ? 0.8 : 0.3
          }
        },
        conversation_context: {
          saudade_detected: saudadeDetected,
          cultural_topics: culturalTopics,
          emotional_support_provided: emotionalSupportProvided,
          recommendations: recommendations
        },
        session_metadata: {
          session_id: sessionId,
          conversation_count: sessionMetadata.conversation_count,
          cultural_effectiveness: sessionMetadata.effectiveness
        }
      }

      return NextResponse.json(response)

    } catch (error) {
      // Track failed interaction
      const endTime = Date.now()
      await trackAIUsage(
        'lusobot',
        'chat_interaction',
        user.id,
        endTime - startTime,
        false,
        supabase,
        null,
        error instanceof Error ? error.message : 'Unknown error'
      )
      throw error
    }

  } catch (error) {
    console.error('LusoBot Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process LusoBot conversation' },
      { status: 500 }
    )
  }
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

    const sessionId = searchParams.get('session_id')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Get conversation history
    const { data: conversations, error } = await supabase
      .from('voice_assistant_interactions')
      .select(`
        id,
        interaction_type,
        input_text,
        input_language,
        ai_response_text,
        response_language,
        cultural_topic_detected,
        cultural_advice_given,
        saudade_support_provided,
        user_satisfaction_rating,
        cultural_accuracy_rating,
        created_at
      `)
      .eq('user_id', user.id)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) throw error

    // Get session context
    const { data: sessionContext } = await supabase
      .from('lusobot_conversation_context')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_id', sessionId)
      .single()

    return NextResponse.json({
      conversations: conversations || [],
      session_context: sessionContext,
      total_interactions: conversations?.length || 0
    })

  } catch (error) {
    console.error('LusoBot conversation history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversation history' },
      { status: 500 }
    )
  }
}

// Helper Functions

function determineCommunityLevel(culturalProfile: any): MessageMetadata['communityLevel'] {
  if (!culturalProfile) return 'newcomer'
  
  const { generation_in_uk, cultural_adaptation_stage } = culturalProfile
  
  if (generation_in_uk === 1 && cultural_adaptation_stage === 'honeymoon') return 'newcomer'
  if (generation_in_uk === 1 && cultural_adaptation_stage === 'adaptation') return 'active'
  if (generation_in_uk >= 2) return 'engaged'
  if (culturalProfile.cultural_archetype === 'guardião_comunidade') return 'leader'
  
  return 'active'
}

function determineLanguageProficiency(culturalProfile: any): MessageMetadata['languageProficiency'] {
  if (!culturalProfile) return 'intermediate'
  
  const { language_loyalty, generation_in_uk } = culturalProfile
  
  if (generation_in_uk === 1 && language_loyalty >= 8) return 'native'
  if (generation_in_uk === 1) return 'fluent'
  if (generation_in_uk === 2 && language_loyalty >= 6) return 'fluent'
  if (generation_in_uk === 2) return 'intermediate'
  if (generation_in_uk >= 3) return 'learning'
  
  return 'intermediate'
}

function extractInterestsFromProfile(culturalProfile: any): string[] {
  if (!culturalProfile) return ['general_culture']
  
  const interests = []
  
  if (culturalProfile.fado_resonance >= 7) interests.push('fado_music')
  if (culturalProfile.food_cultural_significance >= 7) interests.push('portuguese_cuisine')
  if (culturalProfile.tradition_adherence >= 7) interests.push('traditional_customs')
  if (culturalProfile.family_centricity >= 8) interests.push('family_traditions')
  if (culturalProfile.saudade_capacity >= 6) interests.push('cultural_heritage')
  
  return interests.length > 0 ? interests : ['general_culture']
}

function extractCulturalTopics(userMessage: string, botResponse: string): string[] {
  const topics = []
  const combinedText = `${userMessage} ${botResponse}`.toLowerCase()
  
  const topicKeywords = {
    'fado': ['fado', 'música', 'amália', 'coimbra', 'lisboa'],
    'food': ['comida', 'receita', 'bacalhau', 'pastéis', 'francesinha', 'food', 'recipe'],
    'saudade': ['saudade', 'saudades', 'miss', 'homesick', 'nostalgia'],
    'tradition': ['tradição', 'tradições', 'costume', 'festival', 'tradition'],
    'family': ['família', 'family', 'parents', 'children', 'avó', 'grandmother'],
    'language': ['português', 'portuguese', 'língua', 'language', 'falar', 'speak'],
    'region': ['norte', 'lisboa', 'açores', 'madeira', 'porto', 'coimbra'],
    'diaspora': ['comunidade', 'community', 'london', 'uk', 'emigrar', 'immigrant']
  }
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      topics.push(topic)
    }
  }
  
  return topics.length > 0 ? topics : ['general_conversation']
}

function checkEmotionalSupport(botResponse: string, emotionalTone: any): boolean {
  const supportKeywords = [
    'compreendo', 'understand', 'apoio', 'support', 'ajudar', 'help',
    'comunidade', 'community', 'não estás sozinho', 'not alone',
    'sentimentos', 'feelings', 'normal', 'natural'
  ]
  
  const responseText = botResponse.toLowerCase()
  const hasSupport = supportKeywords.some(keyword => responseText.includes(keyword))
  const needsSupport = emotionalTone.saudade > 0.5 || emotionalTone.nostalgia > 0.5
  
  return hasSupport && needsSupport
}

function calculateCulturalEffectiveness(botResponse: LusoBotMessage, culturalProfile: any): number {
  let effectiveness = 0.5
  
  // Check for cultural context usage
  if (botResponse.culturalContext && botResponse.culturalContext.confidence > 0.7) {
    effectiveness += 0.2
  }
  
  // Check for appropriate emotional tone
  if (botResponse.emotionalTone) {
    const tone = botResponse.emotionalTone
    if (tone.community > 0.5 || tone.heritage > 0.5) {
      effectiveness += 0.2
    }
  }
  
  // Check for personalization
  if (culturalProfile && botResponse.culturalContext?.region === culturalProfile.portuguese_region) {
    effectiveness += 0.1
  }
  
  return Math.min(effectiveness, 1.0)
}

async function generateContextualRecommendations(
  userId: string,
  message: string,
  culturalProfile: any,
  emotionalTone: any,
  supabase: any
) {
  const recommendations = []
  
  // High saudade - recommend support
  if (emotionalTone.saudade > 0.6) {
    recommendations.push({
      type: 'emotional_support',
      title: 'Saudade Support Group',
      description: 'Connect with others who understand your feelings',
      priority: 'high',
      cultural_relevance: 0.9
    })
  }
  
  // Food/cooking interest - recommend events
  if (message.toLowerCase().includes('comida') || message.toLowerCase().includes('food')) {
    const { data: cookingEvents } = await supabase
      .from('events')
      .select('id, title, date')
      .ilike('title', '%cooking%')
      .eq('cultural_category', 'portuguese')
      .gte('date', new Date().toISOString())
      .limit(2)
    
    cookingEvents?.forEach(event => {
      recommendations.push({
        type: 'cultural_event',
        title: event.title,
        description: 'Portuguese cooking event',
        item_id: event.id,
        priority: 'medium',
        cultural_relevance: 0.8
      })
    })
  }
  
  // Music interest - recommend fado events
  if (message.toLowerCase().includes('música') || message.toLowerCase().includes('fado')) {
    recommendations.push({
      type: 'cultural_activity',
      title: 'Fado Listening Session',
      description: 'Experience the soul of Portuguese music',
      priority: 'medium',
      cultural_relevance: 0.9
    })
  }
  
  return recommendations.slice(0, 3) // Limit to 3 recommendations
}

async function updateConversationContext(
  userId: string,
  sessionId: string,
  emotionalTone: any,
  culturalTopics: string[],
  emotionalSupportProvided: boolean,
  supabase: any
) {
  const emotionalState = {
    saudade_level: emotionalTone.saudade,
    nostalgia_level: emotionalTone.nostalgia,
    community_need: emotionalTone.community,
    heritage_connection: emotionalTone.heritage,
    support_provided: emotionalSupportProvided
  }
  
  await supabase.rpc('update_lusobot_context', {
    p_user_id: userId,
    p_session_id: sessionId,
    p_emotional_state: emotionalState,
    p_cultural_topics: culturalTopics,
    p_saudade_intensity: Math.round(emotionalTone.saudade * 10),
    p_support_needs: emotionalSupportProvided ? ['emotional_support'] : []
  })
}

async function storeConversationInteraction(
  userId: string,
  sessionId: string,
  userMessage: string,
  botResponse: string,
  language: Language,
  culturalTopics: string[],
  saudadeDetected: boolean,
  supabase: any
) {
  await supabase.from('voice_assistant_interactions').insert({
    user_id: userId,
    session_id: sessionId,
    interaction_type: 'text_input',
    input_text: userMessage,
    input_language: language,
    ai_response_text: botResponse,
    response_language: language,
    cultural_topic_detected: culturalTopics[0] || 'general',
    cultural_advice_given: culturalTopics.length > 0,
    saudade_support_provided: saudadeDetected
  })
}

async function getSessionMetadata(userId: string, sessionId: string, supabase: any) {
  const { data: context } = await supabase
    .from('lusobot_conversation_context')
    .select('conversation_count, conversation_effectiveness_score')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .single()
  
  return {
    conversation_count: context?.conversation_count || 1,
    effectiveness: context?.conversation_effectiveness_score || 0.7
  }
}

async function trackAIUsage(
  serviceName: string,
  operationType: string,
  userId: string,
  latencyMs: number,
  success: boolean,
  supabase: any,
  culturalContext?: string | null,
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
      cultural_context: culturalContext || 'portuguese_ai_assistant'
    })
  } catch (error) {
    console.error('Failed to track AI usage:', error)
  }
}