import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getRateLimitTypeFromPath, RateLimitType, RATE_LIMIT_CONFIGS } from './rate-limit';
import logger from '@/utils/logger';

// Enhanced Portuguese community rate limit configurations
export const PORTUGUESE_COMMUNITY_RATE_LIMITS = {
  // Anonymous users (more restrictive)
  anonymous: {
    'business-directory': { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 requests per hour
    'events': { maxRequests: 30, windowMs: 60 * 60 * 1000 }, // 30 requests per hour
    'community-messaging': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 requests per hour
    'matching': { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 requests per hour
    'transport': { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 requests per hour
    'authentication': { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 requests per hour
    'streaming': { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 requests per hour
    'content': { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 requests per hour
    'general': { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 requests per hour
  },
  // Authenticated users (more generous)
  authenticated: {
    'business-directory': { maxRequests: 200, windowMs: 60 * 60 * 1000 }, // 200 requests per hour
    'events': { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 requests per hour
    'community-messaging': { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 requests per hour
    'matching': { maxRequests: 60, windowMs: 60 * 60 * 1000 }, // 60 requests per hour
    'transport': { maxRequests: 80, windowMs: 60 * 60 * 1000 }, // 80 requests per hour
    'authentication': { maxRequests: 30, windowMs: 60 * 60 * 1000 }, // 30 requests per hour
    'streaming': { maxRequests: 120, windowMs: 60 * 60 * 1000 }, // 120 requests per hour
    'content': { maxRequests: 500, windowMs: 60 * 60 * 1000 }, // 500 requests per hour
    'general': { maxRequests: 500, windowMs: 60 * 60 * 1000 }, // 500 requests per hour
  },
  // Premium/verified users (highest limits)
  premium: {
    'business-directory': { maxRequests: 500, windowMs: 60 * 60 * 1000 }, // 500 requests per hour
    'events': { maxRequests: 300, windowMs: 60 * 60 * 1000 }, // 300 requests per hour
    'community-messaging': { maxRequests: 150, windowMs: 60 * 60 * 1000 }, // 150 requests per hour
    'matching': { maxRequests: 200, windowMs: 60 * 60 * 1000 }, // 200 requests per hour
    'transport': { maxRequests: 200, windowMs: 60 * 60 * 1000 }, // 200 requests per hour
    'authentication': { maxRequests: 50, windowMs: 60 * 60 * 1000 }, // 50 requests per hour
    'streaming': { maxRequests: 300, windowMs: 60 * 60 * 1000 }, // 300 requests per hour
    'content': { maxRequests: 1000, windowMs: 60 * 60 * 1000 }, // 1000 requests per hour
    'general': { maxRequests: 1000, windowMs: 60 * 60 * 1000 }, // 1000 requests per hour
  }
} as const;

// Rate limit error messages in Portuguese and English
export const RATE_LIMIT_MESSAGES = {
  en: {
    'business-directory': 'Too many business directory requests. Please try again in a few minutes to help protect our Portuguese business community.',
    'community-messaging': 'Too many messaging requests. Please slow down to maintain community safety for all Portuguese-speaking members.',
    'event-booking': 'Too many event booking attempts. Please wait before trying again to ensure fair access for all community members.',
    'authentication': 'Too many login attempts. Please try again in a few minutes for your security.',
    'matching': 'Too many cultural matching requests. Please wait before continuing to maintain service quality.',
    'transport': 'Too many transport service requests. Please try again shortly to help manage community resources.',
    'admin': 'Too many administrative requests. Access temporarily restricted for security.',
    'general': 'Too many requests. Please slow down to help maintain service quality for the Portuguese community.',
    'streaming': 'Too many streaming requests. Please try again in a few minutes.',
    'content': 'Too many content requests. Please wait before continuing.',
    'events': 'Too many event requests. Please wait before continuing to browse Portuguese cultural events.',
    default: 'Rate limit exceeded. Please try again later to help maintain service quality for the Portuguese-speaking community.',
  },
  pt: {
    'business-directory': 'Muitos pedidos ao diretório de negócios. Tente novamente em alguns minutos para ajudar a proteger a nossa comunidade empresarial portuguesa.',
    'community-messaging': 'Muitos pedidos de mensagens. Por favor, diminua o ritmo para manter a segurança da comunidade para todos os membros lusófonos.',
    'event-booking': 'Muitas tentativas de reserva de eventos. Aguarde antes de tentar novamente para garantir acesso justo a todos os membros da comunidade.',
    'authentication': 'Muitas tentativas de login. Tente novamente em alguns minutos para sua segurança.',
    'matching': 'Muitos pedidos de compatibilidade cultural. Aguarde antes de continuar para manter a qualidade do serviço.',
    'transport': 'Muitos pedidos de serviços de transporte. Tente novamente em breve para ajudar a gerir os recursos da comunidade.',
    'admin': 'Muitos pedidos administrativos. Acesso temporariamente restrito por segurança.',
    'general': 'Muitos pedidos. Por favor, diminua o ritmo para ajudar a manter a qualidade do serviço para a comunidade portuguesa.',
    'streaming': 'Muitos pedidos de streaming. Tente novamente em alguns minutos.',
    'content': 'Muitos pedidos de conteúdo. Aguarde antes de continuar.',
    'events': 'Muitos pedidos de eventos. Aguarde antes de continuar a navegar pelos eventos culturais portugueses.',
    default: 'Limite de taxa excedido. Tente novamente mais tarde para ajudar a manter a qualidade do serviço para a comunidade lusófona.',
  },
} as const;

// Portuguese community abuse detection patterns
interface AbusePattern {
  identifier: string;
  endpoint: string;
  violations: number;
  lastViolation: Date;
  pattern: 'rapid_fire' | 'distributed' | 'credential_stuffing' | 'scraping' | 'spam';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const abusePatterns = new Map<string, AbusePattern>();

// User tier detection
type UserTier = 'anonymous' | 'authenticated' | 'premium';

interface UserContext {
  id?: string;
  tier: UserTier;
  isVerified?: boolean;
  culturalContributions?: number;
  communityStanding?: 'good' | 'warning' | 'restricted';
}

// Helper to get user's preferred language from headers or user data
function getLanguagePreference(request: NextRequest): 'en' | 'pt' {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  if (acceptLanguage.includes('pt')) return 'pt';
  
  // Check custom language header
  const customLang = request.headers.get('x-language-preference');
  if (customLang === 'pt' || customLang === 'portuguese') return 'pt';
  
  // Check URL path for Portuguese indicators
  const url = request.url.toLowerCase();
  if (url.includes('/pt/') || url.includes('lang=pt')) return 'pt';
  
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

// Extract user context from request
async function extractUserContext(request: NextRequest): Promise<UserContext> {
  const authHeader = request.headers.get('authorization');
  const sessionCookie = request.cookies.get('session')?.value;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check for authentication
  if (authHeader?.startsWith('Bearer ') || sessionCookie) {
    try {
      // In a real implementation, you would decode JWT or validate session
      // For now, we'll simulate user context extraction
      const userId = extractUserIdFromAuth(authHeader || sessionCookie);
      
      if (userId) {
        // Determine user tier based on various factors
        const isPremium = await checkPremiumStatus(userId);
        const isVerified = await checkVerificationStatus(userId);
        
        return {
          id: userId,
          tier: isPremium ? 'premium' : 'authenticated',
          isVerified,
          culturalContributions: await getCulturalContributions(userId),
          communityStanding: await getCommunityStanding(userId)
        };
      }
    } catch (error) {
      logger.warn('Failed to extract user context', error, {
        area: 'rate_limiting',
        action: 'user_context_extraction'
      });
    }
  }
  
  return { tier: 'anonymous' };
}

// Enhanced rate limit middleware with Portuguese community context
export async function withRateLimit(
  request: NextRequest,
  rateLimitType?: RateLimitType,
  options: {
    skipIpCheck?: boolean;
    skipUserCheck?: boolean;
    bypassForTrusted?: boolean;
    customLimits?: { maxRequests?: number; windowMs?: number };
  } = {}
): Promise<NextResponse | { success: true; headers: Headers }> {
  const startTime = Date.now();
  const pathname = request.nextUrl.pathname;
  const type = rateLimitType || getRateLimitTypeFromPath(pathname);
  
  // Get client identifiers
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  const userContext = await extractUserContext(request);
  
  // Create composite identifier for rate limiting
  let identifier = clientIP;
  
  // Prioritize user-based rate limiting for authenticated requests
  if (!options.skipUserCheck && userContext.id) {
    identifier = `user:${userContext.id}`;
  } else if (!options.skipIpCheck) {
    // Use IP-based rate limiting with user agent fingerprinting
    const fingerprint = createFingerprint(clientIP, userAgent);
    identifier = `ip:${fingerprint}`;
  }
  
  // Get rate limit configuration based on user tier
  const limits = getPortugueseCommunityLimits(type, userContext.tier, options.customLimits);
  
  // Apply rate limiting
  const rateLimitResult = await rateLimit(identifier, type, {
    userBased: !!userContext.id,
    ipBased: !userContext.id,
    bypassForTrusted: options.bypassForTrusted,
    customLimits: limits
  });
  
  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
  headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime.getTime() / 1000).toString());
  headers.set('X-RateLimit-Context', 'portuguese-community');
  headers.set('X-User-Tier', userContext.tier);
  
  if (!rateLimitResult.success) {
    // Rate limit exceeded - detect and log potential abuse
    const isAbuse = detectAndLogAbuse(identifier, pathname, type, userContext);
    
    // Log rate limit violation for monitoring
    logger.warn('Rate limit exceeded', undefined, {
      area: 'rate_limiting',
      action: 'rate_limit_exceeded',
      type,
      identifier: maskIdentifier(identifier),
      limit: rateLimitResult.limit,
      userAgent,
      pathname,
      userTier: userContext.tier,
      isAbuse,
      executionTime: Date.now() - startTime,
      culturalContext: 'portuguese-community'
    });
    
    // Set retry after header
    if (rateLimitResult.retryAfter) {
      headers.set('Retry-After', rateLimitResult.retryAfter.toString());
    }
    
    const language = getLanguagePreference(request);
    const errorMessage = getRateLimitErrorMessage(type, language);
    
    return NextResponse.json(
      {
        error: errorMessage,
        code: 'RATE_LIMIT_EXCEEDED',
        context: 'portuguese-community',
        details: {
          limit: rateLimitResult.limit,
          resetTime: rateLimitResult.resetTime,
          retryAfter: rateLimitResult.retryAfter,
          userTier: userContext.tier,
          upgradeMessage: userContext.tier === 'anonymous' ? 
            (language === 'pt' ? 'Considere criar uma conta para limites mais altos' : 'Consider creating an account for higher limits') :
            null
        },
      },
      { 
        status: 429, 
        headers: headers 
      }
    );
  }
  
  // Log successful request for monitoring
  logger.debug('Rate limit check passed', {
    area: 'rate_limiting',
    action: 'rate_limit_passed',
    type,
    identifier: maskIdentifier(identifier),
    remaining: rateLimitResult.remaining,
    userTier: userContext.tier,
    executionTime: Date.now() - startTime
  });
  
  // Return headers to be included in successful responses
  return { success: true, headers };
}

// Portuguese community abuse detection with cultural context
export function detectAndLogAbuse(
  identifier: string,
  endpoint: string,
  rateLimitType: RateLimitType,
  userContext: UserContext
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
      severity: 'low'
    };
    abusePatterns.set(key, pattern);
    return false;
  }
  
  // Update pattern
  pattern.violations++;
  pattern.lastViolation = now;
  
  // Determine abuse severity based on endpoint and user context
  const timeSinceLastViolation = now.getTime() - pattern.lastViolation.getTime();
  
  // Critical endpoints (authentication, messaging) have lower thresholds
  const criticalEndpoints = ['authentication', 'community-messaging', 'admin'];
  const isCriticalEndpoint = criticalEndpoints.includes(rateLimitType);
  
  // Adjust thresholds based on user context
  let violationThreshold = isCriticalEndpoint ? 5 : 10;
  let timeWindow = 300000; // 5 minutes
  
  if (userContext.tier === 'anonymous') {
    violationThreshold = Math.floor(violationThreshold * 0.7); // Stricter for anonymous
  } else if (userContext.communityStanding === 'warning') {
    violationThreshold = Math.floor(violationThreshold * 0.5); // Much stricter for users with warnings
  }
  
  // Detect abuse patterns
  if (pattern.violations >= violationThreshold && timeSinceLastViolation < timeWindow) {
    // Determine pattern type
    if (rateLimitType === 'authentication') {
      pattern.pattern = 'credential_stuffing';
    } else if (rateLimitType === 'business-directory' && pattern.violations > 20) {
      pattern.pattern = 'scraping';
    } else if (rateLimitType === 'community-messaging') {
      pattern.pattern = 'spam';
    }
    
    // Determine severity
    if (pattern.violations > violationThreshold * 3) {
      pattern.severity = 'critical';
    } else if (pattern.violations > violationThreshold * 2) {
      pattern.severity = 'high';
    } else if (pattern.violations > violationThreshold * 1.5) {
      pattern.severity = 'medium';
    }
    
    logger.error('Portuguese community abuse detected', undefined, {
      area: 'security',
      action: 'abuse_detection',
      identifier: maskIdentifier(identifier),
      endpoint,
      violations: pattern.violations,
      pattern: pattern.pattern,
      severity: pattern.severity,
      userTier: userContext.tier,
      culturalContext: 'portuguese-community',
      timestamp: now.toISOString(),
    });
    
    // In production, consider implementing:
    // 1. Temporary IP/user bans
    // 2. Notify community moderators for messaging abuse
    // 3. Alert security team for critical abuse
    // 4. Implement CAPTCHA challenges
    
    return true;
  }
  
  return false;
}

// Get Portuguese community-specific rate limits
function getPortugueseCommunityLimits(
  type: RateLimitType,
  userTier: UserTier,
  customLimits?: { maxRequests?: number; windowMs?: number }
): { maxRequests: number; windowMs: number } {
  if (customLimits) {
    return {
      maxRequests: customLimits.maxRequests || RATE_LIMIT_CONFIGS[type].maxRequests,
      windowMs: customLimits.windowMs || RATE_LIMIT_CONFIGS[type].windowMs
    };
  }
  
  const tierLimits = PORTUGUESE_COMMUNITY_RATE_LIMITS[userTier];
  if (tierLimits && tierLimits[type]) {
    return tierLimits[type];
  }
  
  // Fallback to default config
  return {
    maxRequests: RATE_LIMIT_CONFIGS[type].maxRequests,
    windowMs: RATE_LIMIT_CONFIGS[type].windowMs
  };
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
  if (!authHeader) return null;
  
  try {
    // Handle Bearer token
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      // In production, decode JWT and extract user ID
      return token.substring(0, 16); // Simplified for now
    }
    
    // Handle session cookie (simplified)
    if (authHeader.length > 10) {
      return authHeader.substring(0, 16);
    }
    
    return null;
  } catch {
    return null;
  }
}

function createFingerprint(ip: string, userAgent: string): string {
  // Enhanced fingerprinting for better abuse detection
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

function maskIdentifier(identifier: string): string {
  // Mask sensitive parts of identifier for logging
  if (identifier.startsWith('user:')) {
    const userId = identifier.replace('user:', '');
    return `user:${userId.substring(0, 4)}***`;
  } else if (identifier.startsWith('ip:')) {
    const ip = identifier.replace('ip:', '');
    return `ip:${ip.substring(0, 6)}***`;
  }
  return `${identifier.substring(0, 8)}***`;
}

// Portuguese community user status checks (mock implementations)
async function checkPremiumStatus(userId: string): Promise<boolean> {
  // In production, check user's subscription status
  return false; // Simplified for now
}

async function checkVerificationStatus(userId: string): Promise<boolean> {
  // In production, check user's verification status
  return false; // Simplified for now
}

async function getCulturalContributions(userId: string): Promise<number> {
  // In production, get user's cultural contribution score
  return 0; // Simplified for now
}

async function getCommunityStanding(userId: string): Promise<'good' | 'warning' | 'restricted'> {
  // In production, check user's community standing
  return 'good'; // Simplified for now
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

// Rate limiting monitoring and metrics
export function getRateLimitMetrics(): {
  totalPatterns: number;
  severityBreakdown: Record<string, number>;
  typeBreakdown: Record<string, number>;
  abuseDetections: AbusePattern[];
} {
  const patterns = Array.from(abusePatterns.values());
  
  const severityBreakdown = patterns.reduce((acc, pattern) => {
    acc[pattern.severity] = (acc[pattern.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const typeBreakdown = patterns.reduce((acc, pattern) => {
    acc[pattern.pattern] = (acc[pattern.pattern] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalPatterns: patterns.length,
    severityBreakdown,
    typeBreakdown,
    abuseDetections: patterns.filter(p => p.severity === 'critical' || p.severity === 'high')
  };
}