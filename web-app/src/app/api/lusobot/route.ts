import { NextRequest, NextResponse } from 'next/server'
import { LusoBotEngine, MessageMetadata } from '@/lib/lusobot-engine'
import { Language } from '@/i18n'
import { validateInput, sanitizeText, validatePortugueseContent, ValidationError } from '@/lib/security/input-validation'
import { createClient } from '@/lib/supabase'

// Enhanced rate limiting and security
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userRequests = rateLimitMap.get(identifier) || []
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter((timestamp: number) => 
    now - timestamp < RATE_LIMIT_WINDOW
  )
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  validRequests.push(now)
  rateLimitMap.set(identifier, validRequests)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Rate limiting with user ID
    const rateLimitKey = user.id
    
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before sending another message.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { message, userContext, language } = body

    // Enhanced input validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Message too long. Maximum 500 characters allowed.' },
        { status: 400 }
      )
    }

    // Portuguese-specific content validation
    const contentValidation = validatePortugueseContent(message)
    if (!contentValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Invalid message content', 
          details: contentValidation.issues 
        },
        { status: 400 }
      )
    }

    // Validate language
    const validLanguages: Language[] = ['en', 'pt']
    const requestLanguage: Language = validLanguages.includes(language) ? language : 'en'

    // Prepare user context with defaults
    const contextMetadata: MessageMetadata = {
      userRegion: userContext?.userRegion || 'diaspora_uk',
      communityLevel: userContext?.communityLevel || 'newcomer',
      languageProficiency: userContext?.languageProficiency || 'learning',
      interests: userContext?.interests || ['community'],
      mood: userContext?.mood || 'curious'
    }

    // Content filtering for inappropriate content
    const inappropriatePatterns = [
      /\b(spam|scam|fraud|illegal)\b/i,
      /\b(hate|violence|harassment)\b/i,
      /\b(explicit|nsfw|adult)\b/i
    ]

    const containsInappropriateContent = inappropriatePatterns.some(pattern =>
      pattern.test(message)
    )

    if (containsInappropriateContent) {
      return NextResponse.json({
        id: `filtered_${Date.now()}`,
        role: 'assistant',
        content: requestLanguage === 'pt' 
          ? 'Desculpa, mas não posso responder a esse tipo de conteúdo. Como posso ajudar-te com questões relacionadas com a cultura e comunidade de falantes de português?'
          : 'Sorry, but I cannot respond to that type of content. How can I help you with Portuguese culture and community questions?',
        timestamp: new Date().toISOString(),
        language: requestLanguage,
        suggestions: []
      })
    }

    // Generate LusoBot response
    const response = await LusoBotEngine.generateResponse(
      message,
      contextMetadata,
      requestLanguage
    )

    // Format response for API
    const apiResponse = {
      id: response.id,
      role: response.role,
      content: response.content,
      timestamp: response.timestamp.toISOString(),
      language: response.language,
      culturalContext: response.culturalContext,
      emotionalTone: response.emotionalTone,
      suggestions: response.suggestions || [],
      metadata: {
        processingTime: Date.now() - Date.now(), // Placeholder for actual timing
        confidence: response.culturalContext?.confidence || 0.8,
        version: '1.0.0'
      }
    }

    return NextResponse.json(apiResponse)

  } catch (error) {
    console.error('LusoBot API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'Desculpa, ocorreu um erro técnico. Por favor tenta novamente. / Sorry, a technical error occurred. Please try again.',
        timestamp: new Date().toISOString(),
        suggestions: []
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint
  return NextResponse.json({
    status: 'healthy',
    service: 'LusoBot Portuguese Cultural AI',
    version: '1.0.0',
    capabilities: [
      'Bilingual conversation (Portuguese/English)',
      'Saudade emotional understanding',
      'Portuguese cultural expertise',
      'Community navigation support',
      'Language learning assistance',
      'Business culture guidance'
    ],
    regions_supported: [
      'north', 'center', 'south', 'lisbon', 'porto',
      'azores', 'madeira', 'brazil', 'angola', 'mozambique',
      'diaspora_uk', 'diaspora_us', 'diaspora_france', 'diaspora_other'
    ],
    rate_limits: {
      requests_per_minute: 10,
      max_message_length: 500
    }
  })
}

// OPTIONS handler for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}