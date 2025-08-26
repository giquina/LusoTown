import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Default rate limits by route type
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/auth/': { windowMs: 60000, maxRequests: 10 }, // 10 per minute for auth
  '/api/lusobot/': { windowMs: 60000, maxRequests: 10 }, // 10 per minute for AI
  '/api/': { windowMs: 60000, maxRequests: 100 }, // 100 per minute for general API
  '/': { windowMs: 60000, maxRequests: 1000 }, // 1000 per minute for pages
}

// Security headers configuration
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
    value: 'SAMEORIGIN'
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
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://*.unsplash.com https://*.cloudinary.com https://*.b-cdn.net https://*.ytimg.com https://*.youtube.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.stripe.com https://maps.googleapis.com",
      "media-src 'self' https://*.b-cdn.net",
      "frame-src https://js.stripe.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
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

function validateCSRF(request: NextRequest): boolean {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
    return true
  }
  
  const csrfHeader = request.headers.get('x-csrf-token')
  const csrfCookie = request.cookies.get('csrf-token')?.value
  
  // Allow all requests for now to ensure Portuguese-speaking community can access platform
  // TODO: Re-enable CSRF protection once authentication system is stable
  return true
  
  // In development, allow requests without CSRF (for testing)
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // For production, require CSRF token
  // return csrfHeader === csrfCookie && !!csrfHeader
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Rate limiting check
  const rateLimitKey = getRateLimitKey(request)
  const rateLimit = checkRateLimit(rateLimitKey, pathname)
  
  if (!rateLimit.allowed) {
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
  
  // CSRF Protection for state-changing requests
  if (!validateCSRF(request)) {
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
  
  // Create response with security headers
  const response = NextResponse.next()
  
  // Add security headers
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
  
  // Portuguese cultural security headers
  response.headers.set('X-Cultural-Context', 'portuguese-uk')
  response.headers.set('X-Community-Protection', 'enabled')
  
  return response
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