import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  TRANSLATION_PROVIDERS,
  PORTUGUESE_DIALECTS,
  CULTURAL_CONTEXTS,
  PORTUGUESE_IDIOMS,
  getBestTranslationProvider,
  getTranslationQuality,
  getCulturalContext,
  isPortugueseIdiom,
  translateIdiom
} from '@/config/portuguese-translation'

// Helper function to detect language
async function detectLanguage(text: string): Promise<string> {
  // Simple language detection based on common Portuguese words
  const portugueseMarkers = [
    'são', 'não', 'com', 'para', 'uma', 'por', 'mais', 'que', 'este', 'como',
    'muito', 'mesmo', 'ainda', 'também', 'depois', 'bem', 'onde', 'aqui',
    'português', 'brasil', 'portugal', 'olá', 'obrigado', 'desculpe'
  ]
  
  const englishMarkers = [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
    'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his'
  ]
  
  const lowerText = text.toLowerCase()
  const portugueseScore = portugueseMarkers.reduce((score, word) => 
    score + (lowerText.includes(word) ? 1 : 0), 0
  )
  const englishScore = englishMarkers.reduce((score, word) => 
    score + (lowerText.includes(word) ? 1 : 0), 0
  )
  
  if (portugueseScore > englishScore) {
    return 'pt'
  } else if (englishScore > portugueseScore) {
    return 'en'
  }
  
  return 'auto' // Let the translation service detect
}

// Helper function to analyze cultural context
function analyzeCulturalContext(text: string, dialect: string) {
  const analysis = {
    culturalMarkers: [] as string[],
    detectedIdioms: [] as string[],
    formalityLevel: 'neutral' as 'formal' | 'casual' | 'neutral',
    regionalExpressions: [] as string[]
  }

  // Check for cultural markers
  const dialectInfo = PORTUGUESE_DIALECTS[dialect as keyof typeof PORTUGUESE_DIALECTS]
  if (dialectInfo) {
    const culturalContext = getCulturalContext(dialectInfo.country)
    
    culturalContext.culturalMarkers.forEach(marker => {
      if (text.toLowerCase().includes(marker.toLowerCase())) {
        analysis.culturalMarkers.push(marker)
      }
    })
  }

  // Check for idioms
  if (isPortugueseIdiom(text, dialect)) {
    const idioms = PORTUGUESE_IDIOMS[dialect as keyof typeof PORTUGUESE_IDIOMS] || {}
    Object.keys(idioms).forEach(idiom => {
      if (text.includes(idiom)) {
        analysis.detectedIdioms.push(idiom)
      }
    })
  }

  // Detect formality level
  const formalWords = ['senhor', 'senhora', 'vossa', 'vossemecê', 'cordialmente']
  const casualWords = ['tu', 'você', 'mano', 'cara', 'fixe', 'legal']
  
  const hasFormal = formalWords.some(word => text.toLowerCase().includes(word))
  const hasCasual = casualWords.some(word => text.toLowerCase().includes(word))
  
  if (hasFormal && !hasCasual) {
    analysis.formalityLevel = 'formal'
  } else if (hasCasual && !hasFormal) {
    analysis.formalityLevel = 'casual'
  }

  return analysis
}

// Mock translation function (replace with actual API calls)
async function translateText(
  text: string, 
  sourceLanguage: string, 
  targetLanguage: string,
  provider: string
): Promise<{
  translatedText: string;
  confidence: number;
  detectedLanguage?: string;
  alternatives?: string[];
}> {
  try {
    // This is a mock implementation
    // In production, you would call the actual translation API
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock translation logic for demonstration
    const mockTranslations: Record<string, string> = {
      'Olá! Como está?': 'Hello! How are you?',
      'Bom dia! Tudo bem?': 'Good morning! Everything okay?',
      'Que saudades!': 'I miss you so much!',
      'Está tudo bem': 'Everything is fine',
      'Muito obrigado': 'Thank you very much',
      'Hello! How are you?': 'Olá! Como está?',
      'Good morning!': 'Bom dia!',
      'Thank you very much': 'Muito obrigado',
      'How are things?': 'Como vão as coisas?',
      'See you later': 'Até logo'
    }

    // Check for exact matches first
    let translatedText = mockTranslations[text]
    let confidence = 0.95

    if (!translatedText) {
      // Fallback: simple word-by-word translation for demo
      const simpleTranslations: Record<string, string> = {
        'olá': 'hello', 'bom': 'good', 'dia': 'day', 'como': 'how',
        'está': 'are', 'tudo': 'everything', 'bem': 'well', 'muito': 'very',
        'obrigado': 'thank you', 'sim': 'yes', 'não': 'no',
        'hello': 'olá', 'good': 'bom', 'day': 'dia', 'how': 'como',
        'are': 'está', 'everything': 'tudo', 'well': 'bem', 'very': 'muito',
        'yes': 'sim', 'no': 'não', 'thank': 'obrigado'
      }

      const words = text.toLowerCase().split(/\s+/)
      const translatedWords = words.map(word => {
        const cleanWord = word.replace(/[^\w]/g, '')
        return simpleTranslations[cleanWord] || word
      })
      
      translatedText = translatedWords.join(' ')
      confidence = 0.7
    }

    // Generate alternatives
    const alternatives = [
      translatedText,
      translatedText.toLowerCase(),
      translatedText.charAt(0).toUpperCase() + translatedText.slice(1).toLowerCase()
    ].filter((item, index, arr) => arr.indexOf(item) === index).slice(1)

    return {
      translatedText,
      confidence,
      detectedLanguage: sourceLanguage === 'auto' ? 
        (text.match(/[àáâãçéêíóôõú]/i) ? 'pt' : 'en') : sourceLanguage,
      alternatives: alternatives.length > 0 ? alternatives : undefined
    }

  } catch (error) {
    console.error('Translation error:', error)
    throw new Error('Translation service failed')
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

    const body = await request.json()
    const { 
      messageId, 
      text, 
      sourceLanguage = 'auto', 
      targetLanguage = 'en',
      dialect = 'pt-PT',
      includeCulturalContext = true
    } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Detect source language if auto
    const detectedSourceLang = sourceLanguage === 'auto' ? 
      await detectLanguage(text) : sourceLanguage

    // Get best translation provider for the dialect
    const provider = getBestTranslationProvider(dialect)
    
    // Translate the text
    const translationResult = await translateText(
      text,
      detectedSourceLang,
      targetLanguage,
      provider.name
    )

    // Analyze cultural context if enabled
    let culturalAnalysis = null
    if (includeCulturalContext && detectedSourceLang === 'pt') {
      culturalAnalysis = analyzeCulturalContext(text, dialect)
    }

    // Get quality assessment
    const quality = getTranslationQuality(translationResult.confidence)

    // Prepare response
    const response = {
      originalText: text,
      translatedText: translationResult.translatedText,
      sourceLanguage: translationResult.detectedLanguage || detectedSourceLang,
      targetLanguage: targetLanguage,
      dialect: dialect,
      confidence: translationResult.confidence,
      quality: {
        score: quality.threshold,
        label: quality.label,
        color: quality.color,
        icon: quality.icon
      },
      provider: provider.name,
      alternatives: translationResult.alternatives,
      cultural: culturalAnalysis ? {
        markers: culturalAnalysis.culturalMarkers,
        idioms: culturalAnalysis.detectedIdioms.map(idiom => ({
          original: idiom,
          translation: translateIdiom(idiom, dialect),
          explanation: `Traditional ${dialect} expression`
        })),
        formality: culturalAnalysis.formalityLevel,
        regionalExpressions: culturalAnalysis.regionalExpressions
      } : null,
      timestamp: new Date().toISOString()
    }

    // Save translation record if messageId provided
    if (messageId) {
      const { error: saveError } = await supabase
        .from('message_translations')
        .upsert({
          message_id: messageId,
          user_id: user.id,
          original_text: text,
          translated_text: translationResult.translatedText,
          source_language: response.sourceLanguage,
          target_language: targetLanguage,
          dialect: dialect,
          confidence: translationResult.confidence,
          provider: provider.name,
          cultural_context: culturalAnalysis
        })

      if (saveError) {
        console.error('Failed to save translation:', saveError)
        // Don't fail the request, just log the error
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Translation failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('messageId')
    const userId = searchParams.get('userId')
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let query = supabase
      .from('message_translations')
      .select('*')
      .eq('user_id', user.id)

    if (messageId) {
      query = query.eq('message_id', messageId)
    }

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data: translations, error } = await query
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Failed to fetch translations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch translations' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      translations: translations || [],
      total: translations?.length || 0
    })

  } catch (error) {
    console.error('Translation GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}