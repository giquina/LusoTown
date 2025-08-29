import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getRateLimitTypeFromPath, RateLimitType } from './rate-limit';

// Rate limit error messages in Portuguese and English
export const RATE_LIMIT_MESSAGES = {
  en: {
    'business-directory': 'Too many business directory requests. Please try again in a few minutes.',
    'community-messaging': 'Too many messaging requests. Please slow down to maintain community safety.',
    'event-booking': 'Too many event booking attempts. Please wait before trying again.',
    'authentication': 'Too many login attempts. Please try again in a few minutes.',
    'matching': 'Too many matching requests. Please wait before continuing.',
    'transport': 'Too many transport service requests. Please try again shortly.',
    'admin': 'Too many administrative requests. Access temporarily restricted.',
    'general': 'Too many requests. Please slow down.',
    'streaming': 'Too many streaming requests. Please try again in a few minutes.',
    'content': 'Too many content requests. Please wait before continuing.',
    default: 'Rate limit exceeded. Please try again later.',
  },
  pt: {
    'business-directory': 'Muitos pedidos ao diretório de negócios. Tente novamente em alguns minutos.',
    'community-messaging': 'Muitos pedidos de mensagens. Por favor, diminua o ritmo para manter a segurança da comunidade.',
    'event-booking': 'Muitas tentativas de reserva de eventos. Aguarde antes de tentar novamente.',
    'authentication': 'Muitas tentativas de login. Tente novamente em alguns minutos.',
    'matching': 'Muitos pedidos de compatibilidade. Aguarde antes de continuar.',
    'transport': 'Muitos pedidos de serviços de transporte. Tente novamente em breve.',
    'admin': 'Muitos pedidos administrativos. Acesso temporariamente restrito.',
    'general': 'Muitos pedidos. Por favor, diminua o ritmo.',
    'streaming': 'Muitos pedidos de streaming. Tente novamente em alguns minutos.',
    'content': 'Muitos pedidos de conteúdo. Aguarde antes de continuar.',
    default: 'Limite de taxa excedido. Tente novamente mais tarde.',
  },
} as const;

// Helper to get user's preferred language from headers or user data
function getLanguagePreference(request: NextRequest): 'en' | 'pt' {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  if (acceptLanguage.includes('pt')) return 'pt';
  
  // Check custom language header
  const customLang = request.headers.get('x-language-preference');
  if (customLang === 'pt' || customLang === 'portuguese') return 'pt';
  
  // Default to English
  return 'en';
}

// Get appropriate error message for rate limiting
function getRateLimitErrorMessage(
  rateLimitType: RateLimitType,
  language: 'en' | 'pt'
): string {
  return RATE_LIMIT_MESSAGES[language][rateLimitType] || RATE_LIMIT_MESSAGES[language].default;
}

// Enhanced rate limit middleware with Portuguese community context
export async function withRateLimit(
  request: NextRequest,
  rateLimitType?: RateLimitType,
  options: {
    skipIpCheck?: boolean;
    skipUserCheck?: boolean;
    bypassForTrusted?: boolean;
  } = {}
) {
  const pathname = request.nextUrl.pathname;
  const type = rateLimitType || getRateLimitTypeFromPath(pathname);
  
  // Get client identifiers
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const authHeader = request.headers.get('authorization');
  const userId = extractUserIdFromAuth(authHeader);
  
  // Create composite identifier for rate limiting
  let identifier = clientIP;
  
  // Prioritize user-based rate limiting for authenticated requests
  if (!options.skipUserCheck && userId) {
    identifier = `user:${userId}`;
  } else if (!options.skipIpCheck) {
    // Use IP-based rate limiting with user agent fingerprinting
    const fingerprint = createFingerprint(clientIP, userAgent);
    identifier = `ip:${fingerprint}`;
  }
  
  // Apply rate limiting
  const rateLimitResult = await rateLimit(identifier, type, {
    userBased: !!userId,
    ipBased: !userId,
    bypassForTrusted: options.bypassForTrusted,
  });
  
  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
  headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime.getTime() / 1000).toString());
  
  if (!rateLimitResult.success) {
    // Rate limit exceeded
    if (rateLimitResult.retryAfter) {
      headers.set('Retry-After', rateLimitResult.retryAfter.toString());
    }
    
    const language = getLanguagePreference(request);
    const errorMessage = getRateLimitErrorMessage(type, language);
    
    // Log rate limit violation for monitoring
    console.warn(`Rate limit exceeded for ${identifier} on ${type} endpoint`, {
      type,
      identifier,
      limit: rateLimitResult.limit,
      userAgent,
      pathname,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json(
      {
        error: errorMessage,
        code: 'RATE_LIMIT_EXCEEDED',
        details: {
          limit: rateLimitResult.limit,
          resetTime: rateLimitResult.resetTime,
          retryAfter: rateLimitResult.retryAfter,
        },
      },
      { 
        status: 429, 
        headers: headers 
      }
    );
  }
  
  // Return headers to be included in successful responses
  return { success: true, headers };
}

// Middleware wrapper function for easy use in API routes
export function createRateLimitMiddleware(rateLimitType?: RateLimitType) {
  return async (
    request: NextRequest,
    handler: (req: NextRequest) => Promise<Response> | Response
  ): Promise<Response> => {
    const rateLimitCheck = await withRateLimit(request, rateLimitType);
    
    if ('success' in rateLimitCheck && rateLimitCheck.success) {
      const response = await handler(request);
      
      // Add rate limit headers to successful responses
      rateLimitCheck.headers.forEach((value, key) => {
        response.headers.set(key, value);
      });
      
      return response;
    }
    
    return rateLimitCheck as Response;
  };
}

// Helper functions
function getClientIP(request: NextRequest): string {
  // Check various headers for client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;
  
  // Fallback to connection info (may not be available in all environments)
  return request.ip || 'unknown';
}

function extractUserIdFromAuth(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  try {
    // This is a simplified extraction - in production you'd decode the JWT
    // For now, we'll use a hash of the token as the identifier
    const token = authHeader.replace('Bearer ', '');
    return token.substring(0, 16); // Use first 16 chars as identifier
  } catch {
    return null;
  }
}

function createFingerprint(ip: string, userAgent: string): string {
  // Simple fingerprinting - combine IP and user agent hash
  const combined = `${ip}:${userAgent}`;
  
  // Simple hash function for fingerprinting
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
}

// Portuguese community specific rate limiting decorator
export function withPortugueseCommunityRateLimit(rateLimitType?: RateLimitType) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (request: NextRequest, ...args: any[]) {
      const rateLimitCheck = await withRateLimit(
        request, 
        rateLimitType,
        {
          bypassForTrusted: true, // Allow trusted Portuguese community partners
        }
      );
      
      if ('success' in rateLimitCheck && rateLimitCheck.success) {
        return originalMethod.apply(this, [request, ...args]);
      }
      
      return rateLimitCheck;
    };
    
    return descriptor;
  };
}

// Abuse detection for Portuguese community endpoints
export interface AbusePattern {
  identifier: string;
  endpoint: string;
  violations: number;
  lastViolation: Date;
  pattern: 'rapid_fire' | 'distributed' | 'credential_stuffing' | 'scraping';
}

const abusePatterns = new Map<string, AbusePattern>();

export function detectAbuse(
  identifier: string,
  endpoint: string,
  rateLimitType: RateLimitType
): boolean {
  const key = `${identifier}:${endpoint}`;
  const now = new Date();
  
  let pattern = abusePatterns.get(key);
  if (!pattern) {
    pattern = {
      identifier,
      endpoint,
      violations: 1,
      lastViolation: now,
      pattern: 'rapid_fire',
    };
    abusePatterns.set(key, pattern);
    return false;
  }
  
  // Update pattern
  pattern.violations++;
  pattern.lastViolation = now;
  
  // Detect abuse patterns
  const timeSinceLastViolation = now.getTime() - pattern.lastViolation.getTime();
  
  if (pattern.violations >= 10 && timeSinceLastViolation < 300000) { // 5 minutes
    console.error('Potential abuse detected:', {
      identifier,
      endpoint,
      violations: pattern.violations,
      pattern: pattern.pattern,
      timestamp: now.toISOString(),
    });
    
    // In production, you might want to:
    // 1. Ban IP temporarily
    // 2. Send alert to Sentry
    // 3. Notify community moderators
    return true;
  }
  
  return false;
}

// Cleanup abuse tracking data
export function cleanupAbuseData(): void {
  const now = Date.now();
  const threshold = 24 * 60 * 60 * 1000; // 24 hours
  
  const entries = Array.from(abusePatterns.entries());
  for (const [key, pattern] of entries) {
    if (now - pattern.lastViolation.getTime() > threshold) {
      abusePatterns.delete(key);
    }
  }
}