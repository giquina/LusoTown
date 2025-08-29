/**
 * API Middleware for Portuguese Community Platform
 * Combines rate limiting, error monitoring, and security for API routes
 */

import { NextRequest, NextResponse } from 'next/server'
import { reportAPIError, reportDatabaseError, reportBusinessDirectoryServerError } from '../../sentry.server.config'
import { withRateLimit } from '@/lib/rate-limit-middleware'
import { RateLimitType } from '@/lib/rate-limit'

// API Response interface for consistent error handling
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  code?: string
  timestamp?: string
  requestId?: string
}

// Portuguese community API context
interface PortugueseAPIContext {
  userId?: string
  isPortugueseCommunity: boolean
  language: 'en' | 'pt'
  trustLevel: 'new' | 'trusted' | 'verified'
  location: 'uk' | 'portugal' | 'brazil' | 'other'
  endpoint: string
  method: string
}

// Enhanced error handling for Portuguese community API routes
export class PortugueseAPIError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly context: Record<string, any>

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR',
    context: Record<string, any> = {}
  ) {
    super(message)
    this.name = 'PortugueseAPIError'
    this.statusCode = statusCode
    this.code = code
    this.context = context
  }
}

// Extract Portuguese community context from request
function getPortugueseAPIContext(request: NextRequest): PortugueseAPIContext {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const userLanguage = request.headers.get('x-language-preference') || ''
  const authHeader = request.headers.get('authorization')
  const cfCountry = request.headers.get('cf-ipcountry') || ''
  
  // Detect Portuguese-speaking users
  const isPortugueseCommunity = 
    acceptLanguage.includes('pt') || 
    userLanguage === 'pt' ||
    userLanguage === 'portuguese'
  
  // Determine language preference
  const language: 'en' | 'pt' = isPortugueseCommunity ? 'pt' : 'en'
  
  // Determine location
  let location: 'uk' | 'portugal' | 'brazil' | 'other' = 'other'
  if (cfCountry === 'GB') location = 'uk'
  else if (cfCountry === 'PT') location = 'portugal'
  else if (cfCountry === 'BR') location = 'brazil'
  
  // Determine trust level
  let trustLevel: 'new' | 'trusted' | 'verified' = 'new'
  if (authHeader?.startsWith('Bearer ')) {
    trustLevel = 'trusted' // In production, decode JWT to get actual trust level
  }
  
  return {
    isPortugueseCommunity,
    language,
    trustLevel,
    location,
    endpoint: request.nextUrl.pathname,
    method: request.method
  }
}

// Generate unique request ID for tracking
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Create standardized API response
export function createAPIResponse<T>(
  success: boolean,
  data?: T,
  error?: string,
  message?: string,
  code?: string,
  requestId?: string
): APIResponse<T> {
  return {
    success,
    data,
    error,
    message,
    code,
    timestamp: new Date().toISOString(),
    requestId
  }
}

// Create error response with Portuguese community context
export function createErrorResponse(
  error: string,
  statusCode: number = 500,
  code: string = 'INTERNAL_SERVER_ERROR',
  message?: string,
  requestId?: string,
  language: 'en' | 'pt' = 'en'
): NextResponse {
  const errorMessages = {
    en: {
      INTERNAL_SERVER_ERROR: 'An internal server error occurred',
      BAD_REQUEST: 'Invalid request parameters',
      UNAUTHORIZED: 'Authentication required',
      FORBIDDEN: 'Access denied',
      NOT_FOUND: 'Resource not found',
      RATE_LIMIT_EXCEEDED: 'Too many requests',
      VALIDATION_ERROR: 'Validation failed',
      DATABASE_ERROR: 'Database operation failed',
      PORTUGUESE_BUSINESS_ERROR: 'Business directory error',
      CULTURAL_MATCHING_ERROR: 'Cultural matching error'
    },
    pt: {
      INTERNAL_SERVER_ERROR: 'Ocorreu um erro interno do servidor',
      BAD_REQUEST: 'Parâmetros de solicitação inválidos',
      UNAUTHORIZED: 'Autenticação necessária',
      FORBIDDEN: 'Acesso negado',
      NOT_FOUND: 'Recurso não encontrado',
      RATE_LIMIT_EXCEEDED: 'Muitas solicitações',
      VALIDATION_ERROR: 'Validação falhou',
      DATABASE_ERROR: 'Operação de banco de dados falhou',
      PORTUGUESE_BUSINESS_ERROR: 'Erro no diretório de negócios',
      CULTURAL_MATCHING_ERROR: 'Erro de correspondência cultural'
    }
  }

  const localizedMessage = message || 
    errorMessages[language][code as keyof typeof errorMessages.en] || 
    errorMessages[language].INTERNAL_SERVER_ERROR

  return NextResponse.json(
    createAPIResponse(false, undefined, error, localizedMessage, code, requestId),
    { status: statusCode }
  )
}

// Comprehensive API route wrapper with Portuguese community features
export function withPortugueseAPIHandler(
  handler: (request: NextRequest, context: PortugueseAPIContext) => Promise<NextResponse>,
  options: {
    rateLimitType?: RateLimitType
    requireAuth?: boolean
    allowedMethods?: string[]
    skipRateLimit?: boolean
  } = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const requestId = generateRequestId()
    const startTime = Date.now()
    
    try {
      // Extract Portuguese community context
      const context = getPortugueseAPIContext(request)
      
      // Method validation
      if (options.allowedMethods && !options.allowedMethods.includes(request.method)) {
        return createErrorResponse(
          'Method not allowed',
          405,
          'METHOD_NOT_ALLOWED',
          undefined,
          requestId,
          context.language
        )
      }
      
      // Authentication check
      if (options.requireAuth) {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return createErrorResponse(
            'Authentication required',
            401,
            'UNAUTHORIZED',
            undefined,
            requestId,
            context.language
          )
        }
      }
      
      // Apply rate limiting if not skipped
      if (!options.skipRateLimit) {
        const rateLimitResult = await withRateLimit(request, options.rateLimitType)
        if (rateLimitResult && 'success' in rateLimitResult && !rateLimitResult.success) {
          return rateLimitResult as NextResponse
        }
      }
      
      // Execute handler with context
      const response = await handler(request, context)
      
      // Add Portuguese community headers to response
      response.headers.set('X-Portuguese-Community', context.isPortugueseCommunity.toString())
      response.headers.set('X-Request-ID', requestId)
      response.headers.set('X-Processing-Time', `${Date.now() - startTime}ms`)
      response.headers.set('X-Language-Context', context.language)
      
      // Log successful Portuguese community API calls
      if (context.isPortugueseCommunity) {
        console.log('Portuguese Community API Success:', {
          endpoint: context.endpoint,
          method: context.method,
          requestId,
          processingTime: Date.now() - startTime,
          statusCode: response.status,
          language: context.language,
          location: context.location,
          timestamp: new Date().toISOString()
        })
      }
      
      return response
      
    } catch (error) {
      const apiError = error as PortugueseAPIError | Error
      const context = getPortugueseAPIContext(request)
      
      // Enhanced error logging with Portuguese community context
      console.error('Portuguese Community API Error:', {
        error: apiError.message,
        stack: apiError.stack,
        endpoint: context.endpoint,
        method: context.method,
        requestId,
        processingTime: Date.now() - startTime,
        isPortugueseCommunity: context.isPortugueseCommunity,
        language: context.language,
        location: context.location,
        timestamp: new Date().toISOString()
      })
      
      // Report to Sentry with Portuguese community context
      reportAPIError(apiError, {
        endpoint: context.endpoint,
        method: context.method,
        requestData: {
          hasBody: request.body !== null,
          contentType: request.headers.get('content-type'),
          userAgent: request.headers.get('user-agent')
        },
        isPortugueseUser: context.isPortugueseCommunity
      })
      
      // Return appropriate error response
      if (apiError instanceof PortugueseAPIError) {
        return createErrorResponse(
          apiError.message,
          apiError.statusCode,
          apiError.code,
          undefined,
          requestId,
          context.language
        )
      }
      
      // Generic error handling
      return createErrorResponse(
        'An unexpected error occurred',
        500,
        'INTERNAL_SERVER_ERROR',
        undefined,
        requestId,
        context.language
      )
    }
  }
}

// Specialized wrapper for business directory API routes
export function withBusinessDirectoryAPI(
  handler: (request: NextRequest, context: PortugueseAPIContext) => Promise<NextResponse>
) {
  return withPortugueseAPIHandler(
    async (request, context) => {
      try {
        return await handler(request, context)
      } catch (error) {
        // Specialized business directory error reporting
        reportBusinessDirectoryServerError(error as Error, {
          operation: request.method.toLowerCase() as 'create' | 'read' | 'update' | 'delete',
          userId: context.userId
        })
        throw error
      }
    },
    {
      rateLimitType: 'business-directory',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  )
}

// Specialized wrapper for cultural matching API routes
export function withCulturalMatchingAPI(
  handler: (request: NextRequest, context: PortugueseAPIContext) => Promise<NextResponse>
) {
  return withPortugueseAPIHandler(
    handler,
    {
      rateLimitType: 'matching',
      requireAuth: true,
      allowedMethods: ['GET', 'POST', 'PUT']
    }
  )
}

// Specialized wrapper for events API routes
export function withEventsAPI(
  handler: (request: NextRequest, context: PortugueseAPIContext) => Promise<NextResponse>
) {
  return withPortugueseAPIHandler(
    handler,
    {
      rateLimitType: 'event-booking',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  )
}

// Specialized wrapper for authentication API routes
export function withAuthAPI(
  handler: (request: NextRequest, context: PortugueseAPIContext) => Promise<NextResponse>
) {
  return withPortugueseAPIHandler(
    handler,
    {
      rateLimitType: 'authentication',
      allowedMethods: ['POST', 'PUT'],
      skipRateLimit: false // Keep strict rate limiting for auth
    }
  )
}

// Database operation wrapper with error monitoring
export async function withDatabaseOperation<T>(
  operation: () => Promise<T>,
  context: {
    table?: string
    operationType?: 'create' | 'read' | 'update' | 'delete'
    isPortugueseData?: boolean
  } = {}
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    // Report database errors to Sentry
    reportDatabaseError(error as Error, {
      operation: context.operationType,
      table: context.table,
      isPortugueseData: context.isPortugueseData
    })
    
    throw new PortugueseAPIError(
      'Database operation failed',
      500,
      'DATABASE_ERROR',
      { table: context.table, operation: context.operationType }
    )
  }
}

// Validation helper with Portuguese community context
export function validatePortugueseInput(
  data: any,
  rules: Record<string, (value: any) => boolean | string>,
  language: 'en' | 'pt' = 'en'
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  
  const errorMessages = {
    en: {
      required: 'This field is required',
      invalid: 'Invalid value',
      tooShort: 'Value is too short',
      tooLong: 'Value is too long',
      invalidEmail: 'Invalid email address',
      invalidPhone: 'Invalid phone number'
    },
    pt: {
      required: 'Este campo é obrigatório',
      invalid: 'Valor inválido',
      tooShort: 'Valor muito curto',
      tooLong: 'Valor muito longo',
      invalidEmail: 'Endereço de email inválido',
      invalidPhone: 'Número de telefone inválido'
    }
  }
  
  for (const [field, rule] of Object.entries(rules)) {
    const result = rule(data[field])
    if (typeof result === 'string') {
      errors[field] = result
    } else if (result === false) {
      errors[field] = errorMessages[language].invalid
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

// Export types for use in API routes
export type { PortugueseAPIContext, APIResponse }