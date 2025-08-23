import { NextRequest, NextResponse } from 'next/server'
import { aiEthicsEngine } from '@/services/AIEthicsEngine'
import { heritageRespectProtocol } from '@/services/HeritageRespectProtocol'
import { languagePreservationAI } from '@/services/LanguagePreservationAI'

/**
 * AI Ethics API Endpoints for Portuguese-speaking community Platform
 * 
 * Provides REST API access to AI ethics monitoring, heritage respect validation,
 * language preservation metrics, and community feedback systems.
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const timeframe = searchParams.get('timeframe') || '30d'

    switch (action) {
      case 'dashboard':
        return await getDashboard()
      
      case 'heritage-status':
        return await getHeritageStatus()
      
      case 'language-metrics':
        return await getLanguageMetrics()
      
      case 'privacy-audit':
        const auditScope = searchParams.get('scope') as 'full' | 'cultural_data' | 'cross_border' | 'user_consent' || 'full'
        return await getPrivacyAudit(auditScope)
      
      case 'transparency-report':
        return await getTransparencyReport(timeframe)
      
      case 'community-feedback':
        const feedbackType = searchParams.get('type') || 'all'
        return await getCommunityFeedback(feedbackType, timeframe)
      
      default:
        return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('[AI Ethics API] GET request failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'validate-cultural-content':
        return await validateCulturalContent(body)
      
      case 'report-heritage-violation':
        return await reportHeritageViolation(body)
      
      case 'submit-community-feedback':
        return await submitCommunityFeedback(body)
      
      case 'optimize-bilingual-content':
        return await optimizeBilingualContent(body)
      
      case 'request-cultural-explanation':
        return await requestCulturalExplanation(body)
      
      default:
        return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('[AI Ethics API] POST request failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// =============================================================================
// GET ENDPOINTS
// =============================================================================

async function getDashboard() {
  try {
    const dashboard = await aiEthicsEngine.generateEthicsDashboard()
    
    return NextResponse.json({
      success: true,
      data: dashboard,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Dashboard generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI ethics dashboard' },
      { status: 500 }
    )
  }
}

async function getHeritageStatus() {
  try {
    // Get recent heritage respect feedback
    const timeframe = {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString()
    }
    
    const heritageRespectFeedback = await aiEthicsEngine.getHeritageRespectFeedback(timeframe)
    
    return NextResponse.json({
      success: true,
      data: {
        heritage_respect_rating: heritageRespectFeedback.heritage_respect_rating,
        cultural_accuracy_rating: heritageRespectFeedback.cultural_accuracy_rating,
        community_satisfaction: heritageRespectFeedback.heritage_respect_rating,
        recent_feedback: heritageRespectFeedback
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Heritage status failed:', error)
    return NextResponse.json(
      { error: 'Failed to get heritage status' },
      { status: 500 }
    )
  }
}

async function getLanguageMetrics() {
  try {
    const languageMetrics = await languagePreservationAI.generateLanguagePreservationReport()
    
    return NextResponse.json({
      success: true,
      data: languageMetrics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Language metrics failed:', error)
    return NextResponse.json(
      { error: 'Failed to get language preservation metrics' },
      { status: 500 }
    )
  }
}

async function getPrivacyAudit(scope: 'full' | 'cultural_data' | 'cross_border' | 'user_consent') {
  try {
    const privacyAudit = await aiEthicsEngine.conductPrivacyAudit(scope)
    
    return NextResponse.json({
      success: true,
      data: privacyAudit,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Privacy audit failed:', error)
    return NextResponse.json(
      { error: 'Failed to conduct privacy audit' },
      { status: 500 }
    )
  }
}

async function getTransparencyReport(timeframe: string) {
  try {
    // Calculate timeframe dates
    const days = parseInt(timeframe.replace('d', '')) || 30
    const reportPeriod = {
      start: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString()
    }
    
    const transparencyReport = await aiEthicsEngine.generateTransparencyReport(reportPeriod)
    
    return NextResponse.json({
      success: true,
      data: transparencyReport,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Transparency report failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate transparency report' },
      { status: 500 }
    )
  }
}

async function getCommunityFeedback(feedbackType: string, timeframe: string) {
  try {
    // Calculate timeframe dates
    const days = parseInt(timeframe.replace('d', '')) || 30
    const period = {
      start: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString()
    }
    
    const feedback = await aiEthicsEngine.getHeritageRespectFeedback(period)
    
    return NextResponse.json({
      success: true,
      data: {
        feedback_summary: feedback,
        collection_period: period,
        feedback_type: feedbackType
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Community feedback failed:', error)
    return NextResponse.json(
      { error: 'Failed to get community feedback' },
      { status: 500 }
    )
  }
}

// =============================================================================
// POST ENDPOINTS
// =============================================================================

async function validateCulturalContent(body: any) {
  try {
    const { content, context } = body
    
    if (!content || !context) {
      return NextResponse.json(
        { error: 'Content and context are required' },
        { status: 400 }
      )
    }
    
    const validation = await heritageRespectProtocol.validateCulturalContent(content, context)
    
    return NextResponse.json({
      success: true,
      data: validation,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Cultural content validation failed:', error)
    return NextResponse.json(
      { error: 'Failed to validate cultural content' },
      { status: 500 }
    )
  }
}

async function reportHeritageViolation(body: any) {
  try {
    const { content, violation_type, affected_heritage, cultural_context, reporter_id } = body
    
    if (!content || !violation_type || !affected_heritage) {
      return NextResponse.json(
        { error: 'Content, violation type, and affected heritage are required' },
        { status: 400 }
      )
    }
    
    const violationReport = await heritageRespectProtocol.reportHeritageViolation({
      content,
      violation_type,
      affected_heritage,
      cultural_context: cultural_context || 'General Portuguese heritage',
      reporter_id
    })
    
    return NextResponse.json({
      success: true,
      data: violationReport,
      message: 'Heritage violation reported successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Heritage violation report failed:', error)
    return NextResponse.json(
      { error: 'Failed to report heritage violation' },
      { status: 500 }
    )
  }
}

async function submitCommunityFeedback(body: any) {
  try {
    const { feedback_type, responses, cultural_context, user_id } = body
    
    if (!feedback_type || !responses) {
      return NextResponse.json(
        { error: 'Feedback type and responses are required' },
        { status: 400 }
      )
    }
    
    // In production, this would store feedback in database
    const feedbackId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Log feedback for analysis
    console.log('[AI Ethics API] Community feedback submitted:', {
      feedback_id: feedbackId,
      feedback_type,
      responses_count: Object.keys(responses).length,
      cultural_context,
      user_id: user_id || 'anonymous',
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json({
      success: true,
      data: {
        feedback_id: feedbackId,
        status: 'submitted',
        thank_you_message: 'Obrigado pelo seu feedback! Your input helps improve AI respect for Portuguese culture.'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Community feedback submission failed:', error)
    return NextResponse.json(
      { error: 'Failed to submit community feedback' },
      { status: 500 }
    )
  }
}

async function optimizeBilingualContent(body: any) {
  try {
    const { content, user_profile } = body
    
    if (!content || !user_profile) {
      return NextResponse.json(
        { error: 'Content and user profile are required' },
        { status: 400 }
      )
    }
    
    const optimization = await languagePreservationAI.optimizeBilingualContent(content, user_profile)
    
    return NextResponse.json({
      success: true,
      data: optimization,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Bilingual content optimization failed:', error)
    return NextResponse.json(
      { error: 'Failed to optimize bilingual content' },
      { status: 500 }
    )
  }
}

async function requestCulturalExplanation(body: any) {
  try {
    const { feature, user_language, cultural_context } = body
    
    if (!feature || !user_language) {
      return NextResponse.json(
        { error: 'Feature and user language are required' },
        { status: 400 }
      )
    }
    
    const explanation = await aiEthicsEngine.explainAIFeatureToUser(
      feature,
      user_language,
      cultural_context
    )
    
    return NextResponse.json({
      success: true,
      data: explanation,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('[AI Ethics API] Cultural explanation failed:', error)
    return NextResponse.json(
      { error: 'Failed to provide cultural explanation' },
      { status: 500 }
    )
  }
}

// =============================================================================
// MIDDLEWARE AND HELPERS
// =============================================================================

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