import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { 
  securityLogger, 
  bruteForceProtection, 
  SQLInjectionProtection,
  PortugueseSessionManager,
  createSecurityMiddleware
} from '@/lib/security/comprehensive-security'

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Enhanced rate limits with Portuguese community protection
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/auth/': { windowMs: 60000, maxRequests: 5 }, // 5 per minute for auth (stricter)
  '/api/lusobot/': { windowMs: 60000, maxRequests: 10 }, // 10 per minute for AI
  '/api/messaging/': { windowMs: 60000, maxRequests: 30 }, // 30 per minute for messaging
  '/api/business-directory/': { windowMs: 60000, maxRequests: 60 }, // 60 per minute for business queries
  '/api/events/': { windowMs: 60000, maxRequests: 40 }, // 40 per minute for events
  '/api/upload/': { windowMs: 300000, maxRequests: 5 }, // 5 per 5 minutes for uploads
  '/api/': { windowMs: 60000, maxRequests: 100 }, // 100 per minute for general API
  '/': { windowMs: 60000, maxRequests: 1000 }, // 1000 per minute for pages
}

// Enhanced security headers for Portuguese community protection
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY' // Stricter than SAMEORIGIN
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin' // Stricter referrer policy
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://*.unsplash.com https://*.cloudinary.com https://*.b-cdn.net https://*.ytimg.com https://*.youtube.com https://*.supabase.co",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://maps.googleapis.com https://nominatim.openstreetmap.org",
      "media-src 'self' https://*.b-cdn.net https://*.supabase.co",
      "frame-src https://js.stripe.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join('; ')
  }
]

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            request.headers.get('cf-connecting-ip') ||
            'unknown'
  
  return ip
}

function checkRateLimit(
  key: string,
  pathname: string
): { allowed: boolean; remaining?: number; resetTime?: number } {
  const now = Date.now()
  
  // Find matching rate limit config
  let config = RATE_LIMITS['/'] // default
  for (const [pattern, rateConfig] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(pattern) && pattern !== '/') {
      config = rateConfig
      break
    }
  }
  
  const rateLimitKey = `${key}:${pathname.split('/').slice(0, 3).join('/')}`
  const current = rateLimitStore.get(rateLimitKey)
  
  // Clean expired entries
  if (current && now > current.resetTime) {
    rateLimitStore.delete(rateLimitKey)
  }
  
  const entry = rateLimitStore.get(rateLimitKey) || { count: 0, resetTime: now + config.windowMs }
  
  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }
  
  entry.count += 1
  rateLimitStore.set(rateLimitKey, entry)
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

function isAuthProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/messages',
    '/premium',
    '/api/messaging',
    '/api/upgrade-subscription',
    '/api/lusobot',
    '/matches',
    '/events/create',
    '/transport/book'
  ]
  
  return protectedRoutes.some(route => pathname.startsWith(route))
}

async function validateCSRF(request: NextRequest): Promise<boolean> {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
    return true
  }
  
  const csrfHeader = request.headers.get('x-csrf-token') || request.headers.get('x-lusotown-csrf-token')
  const csrfCookie = request.cookies.get('csrf-token')?.value || request.cookies.get('lusotown-csrf-token')?.value
  
  // In development, allow requests without CSRF (for testing)
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // For production, require CSRF token for state-changing operations
  const requiresCSRF = pathname => 
    pathname.includes('/api/') && 
    !pathname.includes('/api/health') && 
    !pathname.includes('/api/monitoring')
  
  if (requiresCSRF(request.nextUrl.pathname)) {
    const isValid = csrfHeader === csrfCookie && !!csrfHeader && csrfHeader.length >= 32
    
    if (!isValid) {
      // Log CSRF violation for Portuguese community security
      await securityLogger.logSecurityEvent({
        ip: getRateLimitKey(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        eventType: 'FAILED_CSRF',
        severity: 'HIGH',
        description: `CSRF validation failed for ${request.nextUrl.pathname}`,
        culturalContext: 'portuguese-uk',
        metadata: { 
          hasHeader: !!csrfHeader,
          hasCookie: !!csrfCookie,
          headerLength: csrfHeader?.length || 0
        }
      })
    }
    
    return isValid
  }
  
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getRateLimitKey(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  try {
    // Enhanced brute force protection check
    if (pathname.includes('/api/auth/') || pathname.includes('/login')) {
      const isBlocked = await bruteForceProtection.isBlocked(ip)
      if (isBlocked) {
        await securityLogger.logSecurityEvent({
          ip,
          userAgent,
          eventType: 'LOGIN_ATTEMPT',
          severity: 'HIGH',
          description: `Blocked login attempt from IP ${ip} due to brute force protection`,
          culturalContext: 'portuguese-uk'
        })

        return new NextResponse(
          JSON.stringify({
            error: 'Too many failed attempts',
            message: 'Your IP has been temporarily blocked. Please try again later.',
            blockReason: 'brute_force_protection'
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '1800', // 30 minutes
              'X-Security-Block': 'brute-force'
            }
          }
        )
      }
    }
    
    // SQL Injection detection for API endpoints
    if (pathname.startsWith('/api/') && request.method !== 'GET') {
      try {
        const url = new URL(request.url)
        const searchParams = Object.fromEntries(url.searchParams)
        
        const validation = SQLInjectionProtection.sanitizeForDatabase(searchParams)
        if (!validation.isValid) {
          await securityLogger.logSecurityEvent({
            ip,
            userAgent,
            eventType: 'SQL_INJECTION_ATTEMPT',
            severity: 'CRITICAL',
            description: `Potential SQL injection attempt blocked from IP ${ip}`,
            metadata: { 
              threats: validation.threats, 
              path: pathname,
              params: searchParams
            }
          })

          return new NextResponse(
            JSON.stringify({
              error: 'Invalid request parameters',
              message: 'Request blocked for security reasons'
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }
      } catch (error) {
        // Non-standard request format, continue with other validations
      }
    }
    
    // Rate limiting check with enhanced logging
    const rateLimit = checkRateLimit(ip, pathname)
    
    if (!rateLimit.allowed) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'RATE_LIMIT_EXCEEDED',
        severity: 'MEDIUM',
        description: `Rate limit exceeded for IP ${ip} on path ${pathname}`,
        metadata: { 
          path: pathname,
          resetTime: rateLimit.resetTime
        }
      })
      
      return new NextResponse(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many requests, please try again later'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-Rate-Limit-Limit': RATE_LIMITS['/api/']?.maxRequests.toString() || '100',
            'X-Rate-Limit-Remaining': '0',
            'X-Rate-Limit-Reset': rateLimit.resetTime?.toString() || Date.now().toString(),
            'Retry-After': '60'
          }
        }
      )
    }
    
    // Enhanced CSRF Protection
    const csrfValid = await validateCSRF(request)
    if (!csrfValid) {
      return new NextResponse(
        JSON.stringify({
          error: 'Invalid CSRF token',
          message: 'Request blocked for security reasons'
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    // Create response with enhanced security headers
    const response = NextResponse.next()
    
    // Add all security headers
    securityHeaders.forEach(({ key, value }) => {
      response.headers.set(key, value)
    })
    
    // Add rate limit headers
    if (rateLimit.remaining !== undefined) {
      response.headers.set('X-Rate-Limit-Remaining', rateLimit.remaining.toString())
    }
    if (rateLimit.resetTime) {
      response.headers.set('X-Rate-Limit-Reset', rateLimit.resetTime.toString())
    }
    
    // Portuguese cultural and security headers
    response.headers.set('X-Cultural-Context', 'portuguese-uk')
    response.headers.set('X-Community-Protection', 'enhanced')
    response.headers.set('X-Security-Level', 'maximum')
    response.headers.set('X-Portuguese-Safe', 'true')
    
    return response
    
  } catch (error) {
    // Log middleware errors but don't block requests
    console.error('Security middleware error:', error)
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'SUSPICIOUS_ACTIVITY',
      severity: 'MEDIUM',
      description: `Security middleware error for IP ${ip}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: { path: pathname }
    }).catch(() => {}) // Prevent cascading errors
    
    // Return response with basic security headers
    const response = NextResponse.next()
    securityHeaders.forEach(({ key, value }) => {
      response.headers.set(key, value)
    })
    
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.css$|.*\\.js$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    }
  ],
}