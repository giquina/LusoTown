import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getRateLimitTypeFromPath, RateLimitResult } from '@/lib/rate-limit'
import { RATE_LIMIT_MESSAGES } from '@/lib/rate-limit-middleware'
import logger from '@/utils/logger'

// Portuguese community context detection
function getPortugueseUserContext(request: NextRequest): {
  isPortugueseCommunity: boolean;
  language: string;
  trustLevel: 'new' | 'trusted' | 'verified';
  location: 'uk' | 'portugal' | 'brazil' | 'other';
} {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const userLanguage = request.headers.get('x-language-preference') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const cfCountry = request.headers.get('cf-ipcountry') || '';
  const forwarded = request.headers.get('x-forwarded-for') || '';
  
  // Detect Portuguese-speaking users
  const isPortugueseCommunity = 
    acceptLanguage.includes('pt') || 
    userLanguage === 'pt' ||
    userLanguage === 'portuguese';
  
  // Determine location context
  let location: 'uk' | 'portugal' | 'brazil' | 'other' = 'other';
  if (cfCountry === 'GB' || forwarded.includes('uk')) {
    location = 'uk';
  } else if (cfCountry === 'PT') {
    location = 'portugal';
  } else if (cfCountry === 'BR') {
    location = 'brazil';
  }
  
  // Simple trust level determination (in production, use auth data)
  let trustLevel: 'new' | 'trusted' | 'verified' = 'new';
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    trustLevel = 'trusted'; // Basic trust for authenticated users
  }
  
  return {
    isPortugueseCommunity,
    language: acceptLanguage,
    trustLevel,
    location
  };
}

// Enhanced client identifier for Portuguese community
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  const userAgent = request.headers.get('user-agent') || '';
  
  const ip = forwarded?.split(',')[0].trim() || realIP || cfConnectingIP || request.ip || 'unknown';
  
  // Create composite identifier for better rate limiting
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return `user:${authHeader.substring(7, 23)}`; // Use token prefix as user identifier
  }
  
  // Use IP + simple user agent fingerprint
  const agentHash = userAgent.length > 0 ? 
    Math.abs(userAgent.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16) : 
    'unknown';
  
  return `ip:${ip}:${agentHash}`;
}

// Get appropriate language for error messages
function getLanguagePreference(request: NextRequest): 'en' | 'pt' {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const customLang = request.headers.get('x-language-preference');
  
  if (acceptLanguage.includes('pt') || customLang === 'pt' || customLang === 'portuguese') {
    return 'pt';
  }
  
  return 'en';
}

// Apply comprehensive rate limiting with Portuguese community context
async function applyRateLimit(
  request: NextRequest,
  identifier: string,
  userContext: ReturnType<typeof getPortugueseUserContext>
): Promise<{ success: boolean; result?: RateLimitResult; response?: NextResponse }> {
  const pathname = request.nextUrl.pathname;
  const rateLimitType = getRateLimitTypeFromPath(pathname);
  
  try {
    const result = await rateLimit(identifier, rateLimitType, {
      userBased: identifier.startsWith('user:'),
      ipBased: identifier.startsWith('ip:'),
      bypassForTrusted: userContext.trustLevel === 'verified'
    });
    
    if (!result.success) {
      const language = getLanguagePreference(request);
      const errorMessage = RATE_LIMIT_MESSAGES[language][rateLimitType] || 
                          RATE_LIMIT_MESSAGES[language].default;
      
      // Enhanced headers for Portuguese community
      const headers = new Headers();
      headers.set('X-RateLimit-Limit', result.limit.toString());
      headers.set('X-RateLimit-Remaining', result.remaining.toString());
      headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime.getTime() / 1000).toString());
      headers.set('X-Portuguese-Community', userContext.isPortugueseCommunity.toString());
      
      if (result.retryAfter) {
        headers.set('Retry-After', result.retryAfter.toString());
      }
      
      // Log Portuguese community violations for monitoring
      logger.security.warn('Portuguese Community Rate Limit Violation', {
        identifier: identifier.substring(0, 20) + '***',
        endpoint: pathname,
        rateLimitType,
        isPortugueseCommunity: userContext.isPortugueseCommunity,
        trustLevel: userContext.trustLevel,
        location: userContext.location,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: false,
        response: NextResponse.json(
          {
            error: 'Rate Limit Exceeded',
            message: errorMessage,
            code: 'RATE_LIMIT_EXCEEDED',
            details: {
              limit: result.limit,
              resetTime: result.resetTime,
              retryAfter: result.retryAfter,
              endpoint: rateLimitType
            },
            portugueseCommunity: {
              isPortugueseCommunity: userContext.isPortugueseCommunity,
              language: language,
              location: userContext.location
            }
          },
          { 
            status: 429, 
            headers: headers 
          }
        )
      };
    }
    
    return { success: true, result };
  } catch (error) {
    logger.security.error('Rate limiting error', error);
    // Fail open - allow requests if rate limiting fails
    return { success: true };
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const startTime = Date.now();

  // Add comprehensive security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Portuguese community context detection
  const userContext = getPortugueseUserContext(request);
  const clientIdentifier = getClientIdentifier(request);
  
  // Enhanced API route protection
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Apply comprehensive rate limiting
    const rateLimitResult = await applyRateLimit(request, clientIdentifier, userContext);
    
    if (!rateLimitResult.success && rateLimitResult.response) {
      return rateLimitResult.response;
    }
    
    // Add rate limit headers to successful responses
    if (rateLimitResult.result) {
      response.headers.set('X-RateLimit-Limit', rateLimitResult.result.limit.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.result.resetTime.getTime() / 1000).toString());
    }
    
    // Portuguese community context headers for API routes
    response.headers.set('X-Portuguese-Community', userContext.isPortugueseCommunity.toString());
    response.headers.set('X-Trust-Level', userContext.trustLevel);
    response.headers.set('X-User-Location', userContext.location);
    
    // API-specific security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Enhanced security scanning
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    // Security scanners
    /sqlmap/i, /nikto/i, /nessus/i, /masscan/i, /nmap/i,
    // Bots and crawlers (block malicious ones)
    /bot.*bot/i, /crawler/i, /spider/i,
    // Script injection attempts
    /<script/i, /javascript:/i, /vbscript:/i, /data:text\/html/i,
    // Event handlers
    /onload=/i, /onerror=/i, /onclick=/i,
    // Common attack patterns
    /union.*select/i, /drop.*table/i, /script.*alert/i
  ];

  const hasSuspiciousUserAgent = suspiciousPatterns.some(pattern => pattern.test(userAgent));

  if (hasSuspiciousUserAgent && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
    logger.security.warn('Security Alert: Suspicious user agent blocked', {
      userAgent,
      ip: clientIdentifier,
      url: request.nextUrl.pathname,
      timestamp: new Date().toISOString(),
      portugueseCommunity: userContext.isPortugueseCommunity
    });
    
    return NextResponse.json(
      { 
        error: 'Request blocked for security reasons',
        message: 'Suspicious activity detected'
      },
      { status: 403 }
    );
  }

  // Enhanced query parameter validation
  const url = new URL(request.url);
  const queryString = url.search;
  
  if (queryString) {
    const suspiciousQueryPatterns = [
      // XSS patterns
      /<script/i, /javascript:/i, /vbscript:/i, /data:text\/html/i,
      // SQL injection patterns
      /union.*select/i, /drop.*table/i, /insert.*into/i,
      // HTML entities that might be XSS
      /&#x/i, /&lt;/i, /&gt;/i,
      // URL-encoded dangerous characters
      /%3C/i, /%3E/i, /%22/i, /%27/i, /%3B/i, /%28/i, /%29/i
    ];

    const hasSuspiciousQuery = suspiciousQueryPatterns.some(pattern =>
      pattern.test(decodeURIComponent(queryString))
    );

    if (hasSuspiciousQuery) {
      logger.security.warn('Security Alert: Suspicious query parameters blocked', {
        query: queryString.substring(0, 200), // Truncate for logs
        ip: clientIdentifier,
        url: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
        portugueseCommunity: userContext.isPortugueseCommunity
      });
      
      return NextResponse.json(
        { 
          error: 'Request blocked for security reasons',
          message: 'Invalid request parameters'
        },
        { status: 400 }
      );
    }
  }

  // Enhanced Portuguese community access logging
  const isPortugueseEndpoint = request.nextUrl.pathname.includes('business-directory') ||
                               request.nextUrl.pathname.includes('events') ||
                               request.nextUrl.pathname.includes('cultural') ||
                               request.nextUrl.pathname.includes('matching');

  if (isPortugueseEndpoint || userContext.isPortugueseCommunity) {
    logger.community.info('Portuguese Community Access', {
      endpoint: request.nextUrl.pathname,
      method: request.method,
      isPortugueseCommunity: userContext.isPortugueseCommunity,
      language: userContext.language,
      location: userContext.location,
      trustLevel: userContext.trustLevel,
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    });
  }

  // Add performance headers
  const processingTime = Date.now() - startTime;
  response.headers.set('X-Response-Time', `${processingTime}ms`);
  response.headers.set('X-Processed-By', 'LusoTown-Middleware');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - _vercel (Vercel system files)
     * - manifest.json, robots.txt, sitemap.xml
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|_vercel|manifest.json|robots.txt|sitemap.xml).*)',
  ],
}