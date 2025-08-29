import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken, validateCSRFToken } from './input-validation'
export interface CSRFConfig {
  cookieName: string
  headerName: string
  tokenLength: number
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
  maxAge: number
}
export const DEFAULT_CSRF_CONFIG: CSRFConfig = {
  cookieName: 'lusotown-csrf-token',
  headerName: 'x-csrf-token',
  tokenLength: 32,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 // 24 hours
}
export class CSRFProtection {
  private config: CSRFConfig
  constructor(config: Partial<CSRFConfig> = {}) {
    this.config = { ...DEFAULT_CSRF_CONFIG, ...config }
  }
  // Generate and set CSRF token
  generateToken(request: NextRequest, response: NextResponse): string {
    const token = generateCSRFToken()
    // Set token in cookie
    response.cookies.set({
      name: this.config.cookieName,
      value: token,
      httpOnly: true,
      secure: this.config.secure,
      sameSite: this.config.sameSite,
      maxAge: this.config.maxAge,
      path: '/'
    })
    return token
  }
  // Validate CSRF token from request
  validateToken(request: NextRequest): {
    isValid: boolean
    error?: string
  } {
    // Skip validation for safe methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return { isValid: true }
    }
    // Get token from header
    const headerToken = request.headers.get(this.config.headerName)
    if (!headerToken) {
      return {
        isValid: false,
        error: 'Missing CSRF token in headers'
      }
    }
    // Get token from cookie
    const cookieToken = request.cookies.get(this.config.cookieName)?.value
    if (!cookieToken) {
      return {
        isValid: false,
        error: 'Missing CSRF token in cookies'
      }
    }
    // Validate tokens match
    if (!validateCSRFToken(headerToken, cookieToken)) {
      return {
        isValid: false,
        error: 'Invalid CSRF token'
      }
    }
    return { isValid: true }
  }
  // Middleware function for CSRF protection
  protect() {
    return (request: NextRequest) => {
      const validation = this.validateToken(request)
      if (!validation.isValid) {
        return NextResponse.json(
          {
            error: 'CSRF Protection',
            message: validation.error || 'Invalid CSRF token'
          },
          { status: 403 }
        )
      }
      return null // Allow request to continue
    }
  }
  // Get CSRF token for client-side use (safe for exposure)
  getClientToken(request: NextRequest): string | null {
    return request.cookies.get(this.config.cookieName)?.value || null
  }
}
// Default instance
export const csrfProtection = new CSRFProtection()
// Helper function to add CSRF token to API responses
export function addCSRFToken(
  request: NextRequest, 
  response: NextResponse
): NextResponse {
  const token = csrfProtection.generateToken(request, response)
  // Add token to response headers for client-side access
  response.headers.set('X-CSRF-Token', token)
  return response
}
// Lusophone-specific CSRF protection with cultural considerations
export class PortugueseCSRFProtection extends CSRFProtection {
  constructor(config: Partial<CSRFConfig> = {}) {
    super({
      ...config,
      cookieName: 'lusotown-pt-csrf',
      headerName: 'x-lusotown-csrf-token'
    })
  }
  // Enhanced validation for Lusophone community features
  validatePortugueseRequest(request: NextRequest): {
    isValid: boolean
    culturalContext?: string
    error?: string
  } {
    const baseValidation = this.validateToken(request)
    if (!baseValidation.isValid) {
      return baseValidation
    }
    // Additional Lusophone community validations
    const userAgent = request.headers.get('user-agent')
    const acceptLanguage = request.headers.get('accept-language')
    // Check for Portuguese language context
    const hasPortugueseContext = 
      acceptLanguage?.includes('pt') ||
      request.headers.get('x-cultural-context') === 'portuguese-uk'
    return {
      isValid: true,
      culturalContext: hasPortugueseContext ? 'portuguese-uk' : 'general'
    }
  }
}
// Lusophone community CSRF protection instance
export const portugueseCSRF = new PortugueseCSRFProtection()
// Utility functions for API routes
export function requireCSRF(handler: Function) {
  return async (request: NextRequest) => {
    const validation = csrfProtection.validateToken(request)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 403 }
      )
    }
    return handler(request)
  }
}
// Special protection for sensitive Lusophone community operations
export function requirePortugueseCSRF(handler: Function) {
  return async (request: NextRequest) => {
    const validation = portugueseCSRF.validatePortugueseRequest(request)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 403 }
      )
    }
    // Log cultural context for security monitoring
    if (validation.culturalContext) {
      }
    return handler(request)
  }
}