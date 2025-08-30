/**
 * Rate Limiting for Portuguese Community Platform
 * Intelligent rate limiting with Portuguese community considerations
 */

// Rate limiting store interface (in production, use Redis)
interface RateLimitRecord {
  count: number;
  windowStart: number;
  lastAccess: number;
  violations: number;
  userInfo?: {
    isPortugueseCommunity: boolean;
    trustLevel: 'new' | 'trusted' | 'verified';
    location: 'uk' | 'portugal' | 'brazil' | 'other';
  };
}

// Rate limit configuration for different endpoints
export interface RateLimitConfig {
  windowMs: number;           // Time window in milliseconds
  maxRequests: number;        // Maximum requests per window
  blockDuration: number;      // Block duration after violation
  whitelistIPs: string[];     // Whitelisted IPs
  trustedUserMultiplier: number; // Multiplier for trusted users
  portugueseCommunityBonus: number; // Bonus requests for Portuguese community
  endpoints: {
    [key: string]: {
      maxRequests: number;
      windowMs: number;
      description: string;
    };
  };
}

// Default rate limiting configuration
export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  windowMs: 60000, // 1 minute
  maxRequests: 30,
  blockDuration: 300000, // 5 minutes
  whitelistIPs: ['127.0.0.1', '::1'], // localhost
  trustedUserMultiplier: 2,
  portugueseCommunityBonus: 10,
  endpoints: {
    // Business directory endpoints
    '/api/business/submit': {
      maxRequests: 5,
      windowMs: 300000, // 5 minutes
      description: 'Business submission - requires verification'
    },
    '/api/business/search': {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      description: 'Business search - high usage expected'
    },
    '/api/business/directory': {
      maxRequests: 200,
      windowMs: 60000, // 1 minute
      description: 'Business directory listing - public access'
    },

    // Event endpoints
    '/api/events/create': {
      maxRequests: 10,
      windowMs: 300000, // 5 minutes
      description: 'Event creation - moderate limiting'
    },
    '/api/events/book': {
      maxRequests: 20,
      windowMs: 60000, // 1 minute
      description: 'Event booking - allow multiple bookings'
    },
    '/api/events/list': {
      maxRequests: 150,
      windowMs: 60000, // 1 minute
      description: 'Event listing - public access'
    },

    // Community messaging
    '/api/messages/send': {
      maxRequests: 50,
      windowMs: 60000, // 1 minute
      description: 'Community messaging - allow conversation flow'
    },
    '/api/messages/community': {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      description: 'Community message feed - high usage'
    },

    // Authentication endpoints
    '/api/auth/signup': {
      maxRequests: 10,
      windowMs: 600000, // 10 minutes
      description: 'User registration - prevent abuse'
    },
    '/api/auth/signin': {
      maxRequests: 15,
      windowMs: 300000, // 5 minutes
      description: 'User login - allow retry attempts'
    },
    '/api/auth/verify': {
      maxRequests: 20,
      windowMs: 300000, // 5 minutes
      description: 'Email verification - allow resends'
    },

    // Cultural content
    '/api/cultural/content': {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      description: 'Cultural content access - community focused'
    },
    '/api/cultural/submit': {
      maxRequests: 15,
      windowMs: 300000, // 5 minutes
      description: 'Cultural content submission - moderated'
    },

    // Transport coordination
    '/api/transport/book': {
      maxRequests: 30,
      windowMs: 300000, // 5 minutes
      description: 'Transport booking - community service'
    },
    '/api/transport/search': {
      maxRequests: 80,
      windowMs: 60000, // 1 minute
      description: 'Transport search - frequent usage expected'
    }
  }
};

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, RateLimitRecord>();

// Portuguese community rate limiter
export class PortugueseRateLimiter {
  private config: RateLimitConfig;
  
  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = { ...DEFAULT_RATE_LIMIT_CONFIG, ...config };
  }

  // Check rate limit for request
  async checkRateLimit(
    identifier: string,
    endpoint: string,
    userInfo?: RateLimitRecord['userInfo']
  ): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
    reason?: string;
  }> {
    const now = Date.now();
    const key = `${identifier}:${endpoint}`;
    
    // Check whitelist
    if (this.config.whitelistIPs.includes(identifier)) {
      return {
        allowed: true,
        remaining: 999,
        resetTime: now + this.config.windowMs
      };
    }

    // Get endpoint specific limits
    const endpointConfig = this.config.endpoints[endpoint];
    const windowMs = endpointConfig?.windowMs || this.config.windowMs;
    const baseMaxRequests = endpointConfig?.maxRequests || this.config.maxRequests;
    
    // Calculate effective max requests with bonuses
    const maxRequests = this.calculateEffectiveLimit(baseMaxRequests, userInfo);
    
    // Get or create rate limit record
    let record = rateLimitStore.get(key);
    
    if (!record || (now - record.windowStart) > windowMs) {
      // New window or first request
      record = {
        count: 1,
        windowStart: now,
        lastAccess: now,
        violations: record?.violations || 0,
        userInfo
      };
      rateLimitStore.set(key, record);
      
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + windowMs
      };
    }

    // Update record
    record.count++;
    record.lastAccess = now;
    record.userInfo = userInfo || record.userInfo;
    
    const isBlocked = this.isCurrentlyBlocked(record, now);
    if (isBlocked.blocked) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.windowStart + windowMs,
        retryAfter: isBlocked.retryAfter,
        reason: 'Rate limit exceeded - currently blocked'
      };
    }

    const allowed = record.count <= maxRequests;
    
    if (!allowed) {
      // Rate limit exceeded
      record.violations++;
      
      // Log security incident for Portuguese community protection
      this.logRateLimitViolation(identifier, endpoint, record);
      
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.windowStart + windowMs,
        retryAfter: this.calculateRetryAfter(record),
        reason: this.generateBlockReason(record, endpoint)
      };
    }

    rateLimitStore.set(key, record);
    
    return {
      allowed: true,
      remaining: maxRequests - record.count,
      resetTime: record.windowStart + windowMs
    };
  }

  // Calculate effective rate limit with Portuguese community bonuses
  private calculateEffectiveLimit(baseLimit: number, userInfo?: RateLimitRecord['userInfo']): number {
    let effectiveLimit = baseLimit;
    
    if (userInfo) {
      // Portuguese community bonus
      if (userInfo.isPortugueseCommunity) {
        effectiveLimit += this.config.portugueseCommunityBonus;
      }
      
      // Trust level multiplier
      switch (userInfo.trustLevel) {
        case 'verified':
          effectiveLimit = Math.floor(effectiveLimit * this.config.trustedUserMultiplier);
          break;
        case 'trusted':
          effectiveLimit = Math.floor(effectiveLimit * 1.5);
          break;
        case 'new':
          effectiveLimit = Math.floor(effectiveLimit * 0.8);
          break;
      }
      
      // Location-based adjustment
      if (userInfo.location === 'uk') {
        effectiveLimit += 5; // UK-based Portuguese community members get slight bonus
      }
    }
    
    return Math.max(baseLimit, effectiveLimit);
  }

  // Check if currently blocked due to previous violations
  private isCurrentlyBlocked(record: RateLimitRecord, now: number): {
    blocked: boolean;
    retryAfter?: number;
  } {
    if (record.violations === 0) {
      return { blocked: false };
    }
    
    // Progressive blocking based on violation count
    const blockDuration = Math.min(
      this.config.blockDuration * Math.pow(2, record.violations - 1),
      3600000 // Max 1 hour block
    );
    
    const blockExpiry = record.lastAccess + blockDuration;
    
    if (now < blockExpiry) {
      return {
        blocked: true,
        retryAfter: Math.ceil((blockExpiry - now) / 1000)
      };
    }
    
    // Block expired, reset violations
    record.violations = Math.max(0, record.violations - 1);
    return { blocked: false };
  }

  // Calculate retry after time based on violations
  private calculateRetryAfter(record: RateLimitRecord): number {
    const baseDelay = 60; // 1 minute base
    const multiplier = Math.min(record.violations, 10);
    return baseDelay * multiplier;
  }

  // Generate human-readable block reason
  private generateBlockReason(record: RateLimitRecord, endpoint: string): string {
    const endpointConfig = this.config.endpoints[endpoint];
    const description = endpointConfig?.description || 'API endpoint';
    
    if (record.violations === 1) {
      return `Rate limit exceeded for ${description}. Please slow down your requests.`;
    } else if (record.violations <= 3) {
      return `Multiple rate limit violations detected for ${description}. Extended cooling period applied.`;
    } else {
      return `Severe rate limiting violations detected. Portuguese community protection measures activated.`;
    }
  }

  // Log rate limit violations for security monitoring
  private logRateLimitViolation(
    identifier: string,
    endpoint: string,
    record: RateLimitRecord
  ): void {
    const logData = {
      timestamp: new Date().toISOString(),
      identifier: `${identifier.substring(0, 20)  }***`, // Partially masked for privacy
      endpoint,
      violationCount: record.violations,
      requestCount: record.count,
      windowStart: new Date(record.windowStart).toISOString(),
      isPortugueseCommunity: record.userInfo?.isPortugueseCommunity || false,
      trustLevel: record.userInfo?.trustLevel || 'unknown',
      location: record.userInfo?.location || 'unknown'
    };

    // In production, send to proper logging service
    console.warn('Portuguese Community Rate Limit Violation:', logData);
    
    // For severe violations, trigger additional security measures
    if (record.violations >= 5) {
      console.error('SEVERE RATE LIMIT VIOLATION - Portuguese Community Security Alert:', logData);
      // In production, trigger security incident response
    }
  }

  // Clean up old records (call periodically)
  cleanupExpiredRecords(): void {
    const now = Date.now();
    const maxAge = Math.max(...Object.values(this.config.endpoints).map(e => e.windowMs)) + 
                   this.config.blockDuration;
    
    for (const [key, record] of rateLimitStore.entries()) {
      if ((now - record.lastAccess) > maxAge) {
        rateLimitStore.delete(key);
      }
    }
  }

  // Get current statistics
  getStatistics(): {
    totalRecords: number;
    activeRecords: number;
    violationRecords: number;
    portugueseCommunityRecords: number;
  } {
    const now = Date.now();
    let activeRecords = 0;
    let violationRecords = 0;
    let portugueseCommunityRecords = 0;
    
    for (const record of rateLimitStore.values()) {
      if ((now - record.lastAccess) <= 300000) { // Active in last 5 minutes
        activeRecords++;
      }
      if (record.violations > 0) {
        violationRecords++;
      }
      if (record.userInfo?.isPortugueseCommunity) {
        portugueseCommunityRecords++;
      }
    }
    
    return {
      totalRecords: rateLimitStore.size,
      activeRecords,
      violationRecords,
      portugueseCommunityRecords
    };
  }

  // Create rate limit headers
  createHeaders(result: Awaited<ReturnType<typeof this.checkRateLimit>>): Record<string, string> {
    const headers: Record<string, string> = {
      'X-RateLimit-Limit': this.config.maxRequests.toString(),
      'X-RateLimit-Remaining': result.remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
    };

    if (result.retryAfter) {
      headers['Retry-After'] = result.retryAfter.toString();
    }

    return headers;
  }
}

// Utility functions for Next.js middleware and API routes
export function getClientIdentifier(request: {
  headers: { get: (name: string) => string | null };
  ip?: string;
}): string {
  // In production, use more sophisticated identification
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIP || request.ip || 'unknown';
  
  return ip;
}

export function getUserInfo(request: {
  headers: { get: (name: string) => string | null };
}): RateLimitRecord['userInfo'] {
  // Extract user information from headers (set by auth middleware)
  const portugueseCommunity = request.headers.get('x-portuguese-community') === 'true';
  const trustLevel = request.headers.get('x-trust-level') as RateLimitRecord['userInfo']['trustLevel'] || 'new';
  const location = request.headers.get('x-user-location') as RateLimitRecord['userInfo']['location'] || 'other';
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  return {
    isPortugueseCommunity: portugueseCommunity || acceptLanguage.includes('pt'),
    trustLevel,
    location
  };
}

// Export configured rate limiter instance
export const portugueseRateLimiter = new PortugueseRateLimiter();

// Cleanup interval (run every 5 minutes)
if (typeof window === 'undefined') { // Server-side only
  setInterval(() => {
    portugueseRateLimiter.cleanupExpiredRecords();
  }, 300000);
}

// Export types and utilities
export type { RateLimitConfig, RateLimitRecord };