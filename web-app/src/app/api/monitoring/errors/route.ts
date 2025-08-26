/**
 * API Route for Portuguese Community Error Reporting
 * Handles error reports from client-side with Sentry integration
 */

import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING, PORTUGUESE_ERROR_CONTEXTS, ERROR_SEVERITY } from '@/config/error-monitoring'
import { capturePortugueseError } from '@/lib/monitoring/sentry-utils'

export const runtime = 'edge'

interface ErrorReport {
  message: string
  stack?: string
  type: string
  severity: keyof typeof ERROR_SEVERITY
  context: string
  url?: string
  userAgent?: string
  userId?: string
  sessionId?: string
  portugueseContext?: {
    language: 'pt' | 'en'
    culturalFeature?: keyof typeof PORTUGUESE_ERROR_CONTEXTS
    businessDirectoryAction?: string
    characterEncodingIssue?: boolean
    mobileDevice?: boolean
  }
  metadata?: Record<string, any>
  timestamp: string
}

interface BatchErrorReport {
  errors: ErrorReport[]
  sessionId: string
  environment: string
  userAgent?: string
}

// Rate limiting for error reports (prevent spam)
const errorReportCounts = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_ERRORS_PER_MINUTE = 50

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const bucket = errorReportCounts.get(identifier)
  
  if (!bucket || (now - bucket.lastReset) > RATE_LIMIT_WINDOW) {
    errorReportCounts.set(identifier, { count: 1, lastReset: now })
    return true
  }
  
  if (bucket.count >= MAX_ERRORS_PER_MINUTE) {
    return false
  }
  
  bucket.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Check if error monitoring is enabled
    if (!ERROR_MONITORING.enabled) {
      return NextResponse.json(
        { error: 'Error monitoring is disabled' },
        { status: 503 }
      )
    }

    const body = await request.json() as BatchErrorReport
    const clientIP = request.ip || 'unknown'
    
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Validate request structure
    if (!body.errors || !Array.isArray(body.errors) || body.errors.length === 0) {
      return NextResponse.json(
        { error: 'Invalid error report format' },
        { status: 400 }
      )
    }

    // Process each error in the batch
    const processedErrors: string[] = []
    
    for (const errorReport of body.errors.slice(0, 20)) { // Limit to 20 errors per batch
      try {
        await processErrorReport(errorReport, {
          clientIP,
          userAgent: body.userAgent || request.headers.get('user-agent') || 'unknown',
          environment: body.environment || ERROR_MONITORING.environment
        })
        
        processedErrors.push(errorReport.message)
      } catch (processingError) {
        console.error('Failed to process error report:', processingError)
        
        // Report the processing error to Sentry
        Sentry.captureException(processingError, {
          tags: {
            error_type: 'error_processing_failure',
            original_error: errorReport.message
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: processedErrors.length,
      total: body.errors.length,
      message: `Processed ${processedErrors.length} Portuguese community error reports`
    })

  } catch (error) {
    console.error('Error in monitoring API:', error)
    
    // Report API error to Sentry
    Sentry.captureException(error, {
      tags: {
        api_endpoint: '/api/monitoring/errors',
        error_type: 'api_error'
      }
    })

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processErrorReport(
  errorReport: ErrorReport,
  context: {
    clientIP: string
    userAgent: string
    environment: string
  }
) {
  // Set Sentry scope with Portuguese community context
  Sentry.withScope((scope) => {
    // Set basic error information
    scope.setLevel(errorReport.severity as any)
    scope.setTag('error_source', 'client_report')
    scope.setTag('client_ip', context.clientIP)
    scope.setTag('environment', context.environment)
    
    // Set Portuguese community context
    if (errorReport.portugueseContext) {
      scope.setContext('portuguese_community', {
        language: errorReport.portugueseContext.language,
        cultural_feature: errorReport.portugueseContext.culturalFeature,
        business_directory_action: errorReport.portugueseContext.businessDirectoryAction,
        mobile_device: errorReport.portugueseContext.mobileDevice,
        character_encoding_issue: errorReport.portugueseContext.characterEncodingIssue
      })
      
      scope.setTags({
        community_language: errorReport.portugueseContext.language,
        cultural_feature: errorReport.portugueseContext.culturalFeature || 'general',
        mobile_user: errorReport.portugueseContext.mobileDevice ? 'yes' : 'no',
        has_encoding_issues: errorReport.portugueseContext.characterEncodingIssue ? 'yes' : 'no'
      })
    }

    // Set user context if available
    if (errorReport.userId) {
      scope.setUser({
        id: errorReport.userId,
        segment: 'portuguese-community'
      })
    }

    // Set request context
    scope.setContext('request_info', {
      url: errorReport.url,
      user_agent: errorReport.userAgent || context.userAgent,
      session_id: errorReport.sessionId,
      timestamp: errorReport.timestamp,
      client_ip: context.clientIP
    })

    // Set additional metadata
    if (errorReport.metadata) {
      scope.setContext('error_metadata', errorReport.metadata)
    }

    // Add breadcrumb for the error report
    scope.addBreadcrumb({
      message: `Client error report: ${errorReport.context}`,
      category: 'error_report',
      level: errorReport.severity as any,
      data: {
        error_context: errorReport.context,
        portuguese_feature: errorReport.portugueseContext?.culturalFeature,
        session_id: errorReport.sessionId,
        url: errorReport.url
      }
    })

    // Capture the error
    if (errorReport.stack) {
      const error = new Error(errorReport.message)
      error.stack = errorReport.stack
      error.name = errorReport.type
      Sentry.captureException(error)
    } else {
      Sentry.captureMessage(errorReport.message, errorReport.severity as any)
    }
  })
}

// GET endpoint for error monitoring dashboard data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('range') || '24h'
    const feature = searchParams.get('feature')
    
    // Mock data for demonstration (in production, this would query your monitoring service)
    const mockData = {
      totalErrors: Math.floor(Math.random() * 100),
      criticalErrors: Math.floor(Math.random() * 10),
      portugueseFeatureErrors: Math.floor(Math.random() * 25),
      errorsByFeature: {
        'cultural-content': Math.floor(Math.random() * 15),
        'business-directory': Math.floor(Math.random() * 20),
        'language-switching': Math.floor(Math.random() * 8),
        'character-encoding': Math.floor(Math.random() * 5)
      },
      performanceMetrics: {
        avgResponseTime: Math.random() * 2000 + 500,
        portugueseContentLoadTime: Math.random() * 1500 + 800,
        languageSwitchTime: Math.random() * 300 + 100,
        businessDirectoryResponseTime: Math.random() * 2500 + 1000
      },
      timeRange,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(mockData)

  } catch (error) {
    console.error('Error fetching monitoring data:', error)
    Sentry.captureException(error)
    
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data' },
      { status: 500 }
    )
  }
}