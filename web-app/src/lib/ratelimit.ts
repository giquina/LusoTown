/**
 * Rate Limiting Utilities for Portuguese Community Platform
 * 
 * Simple in-memory rate limiting implementation for form submissions
 * and API endpoints with Portuguese community context.
 */

interface RateLimit {
  requests: number
  window: string
  message?: string
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: Date
  message?: string
}

class RateLimiter {
  private storage = new Map<string, { count: number; resetTime: number }>()

  /**
   * Check if request should be rate limited
   */
  async limit(identifier: string, config: RateLimit): Promise<RateLimitResult> {
    const windowMs = this.parseTimeWindow(config.window)
    const now = Date.now()
    const key = `${identifier}:${Math.floor(now / windowMs)}`
    
    // Clean up old entries
    this.cleanup()
    
    const record = this.storage.get(key) || { count: 0, resetTime: now + windowMs }
    
    if (record.count >= config.requests) {
      return {
        success: false,
        limit: config.requests,
        remaining: 0,
        reset: new Date(record.resetTime),
        message: config.message
      }
    }
    
    // Increment counter
    record.count += 1
    this.storage.set(key, record)
    
    return {
      success: true,
      limit: config.requests,
      remaining: config.requests - record.count,
      reset: new Date(record.resetTime)
    }
  }

  /**
   * Parse time window string to milliseconds
   */
  private parseTimeWindow(window: string): number {
    const match = window.match(/^(\d+)(s|m|h|d)$/)
    if (!match) {
      throw new Error(`Invalid time window format: ${window}`)
    }
    
    const [, amount, unit] = match
    const multipliers = {
      s: 1000,      // seconds
      m: 60000,     // minutes
      h: 3600000,   // hours
      d: 86400000   // days
    }
    
    return parseInt(amount) * multipliers[unit as keyof typeof multipliers]
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, record] of this.storage.entries()) {
      if (record.resetTime < now) {
        this.storage.delete(key)
      }
    }
  }

  /**
   * Reset rate limit for identifier
   */
  async reset(identifier: string): Promise<void> {
    const keysToDelete = []
    for (const key of this.storage.keys()) {
      if (key.startsWith(identifier + ':')) {
        keysToDelete.push(key)
      }
    }
    keysToDelete.forEach(key => this.storage.delete(key))
  }

  /**
   * Get current usage for identifier
   */
  async getUsage(identifier: string, window: string): Promise<{
    current: number
    resetTime: Date | null
  }> {
    const windowMs = this.parseTimeWindow(window)
    const now = Date.now()
    const key = `${identifier}:${Math.floor(now / windowMs)}`
    
    const record = this.storage.get(key)
    
    return {
      current: record?.count || 0,
      resetTime: record ? new Date(record.resetTime) : null
    }
  }
}

// Export singleton instance
export const ratelimit = new RateLimiter()

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMIT_CONFIGS = {
  // Form submissions
  businessDirectory: {
    requests: 3,
    window: '1h',
    message: 'Too many business submissions. Please try again in an hour.'
  },
  
  eventSubmission: {
    requests: 5,
    window: '24h',
    message: 'Too many event submissions today. Please try again tomorrow.'
  },
  
  contactForm: {
    requests: 10,
    window: '1h',
    message: 'Too many contact form submissions. Please try again later.'
  },
  
  profileUpdate: {
    requests: 20,
    window: '1h',
    message: 'Too many profile updates. Please try again later.'
  },
  
  messaging: {
    requests: 100,
    window: '1h',
    message: 'Too many messages sent. Please try again later.'
  },
  
  // API endpoints
  search: {
    requests: 1000,
    window: '1h',
    message: 'Too many search requests. Please try again later.'
  },
  
  authentication: {
    requests: 5,
    window: '15m',
    message: 'Too many authentication attempts. Please try again in 15 minutes.'
  },
  
  passwordReset: {
    requests: 3,
    window: '1h',
    message: 'Too many password reset attempts. Please try again in an hour.'
  }
} as const

/**
 * Rate limit middleware for Portuguese community features
 */
export function createPortugueseRateLimit(config: RateLimit) {
  return async (identifier: string) => {
    return ratelimit.limit(identifier, config)
  }
}

/**
 * Get user-friendly rate limit message
 */
export function getRateLimitMessage(
  result: RateLimitResult,
  language: 'en' | 'pt' = 'en'
): string {
  if (result.success) return ''
  
  const timeUntilReset = Math.ceil((result.reset.getTime() - Date.now()) / 1000 / 60) // minutes
  
  if (language === 'pt') {
    if (timeUntilReset <= 1) {
      return 'Demasiadas tentativas. Tente novamente em alguns momentos.'
    } else if (timeUntilReset < 60) {
      return `Demasiadas tentativas. Tente novamente em ${timeUntilReset} minutos.`
    } else {
      const hours = Math.ceil(timeUntilReset / 60)
      return `Demasiadas tentativas. Tente novamente em ${hours} hora${hours > 1 ? 's' : ''}.`
    }
  } else {
    if (timeUntilReset <= 1) {
      return 'Too many attempts. Please try again in a few moments.'
    } else if (timeUntilReset < 60) {
      return `Too many attempts. Please try again in ${timeUntilReset} minutes.`
    } else {
      const hours = Math.ceil(timeUntilReset / 60)
      return `Too many attempts. Please try again in ${hours} hour${hours > 1 ? 's' : ''}.`
    }
  }
}

/**
 * Portuguese community specific rate limiting
 * Adjusts limits based on user verification level and community standing
 */
export class PortugueseRateLimiter extends RateLimiter {
  /**
   * Enhanced rate limiting with community context
   */
  async limitWithCommunityContext(
    identifier: string,
    config: RateLimit,
    context: {
      isVerified?: boolean
      culturalScore?: number
      communityStanding?: 'good' | 'neutral' | 'warning'
      membershipLevel?: 'basic' | 'premium' | 'ambassador'
    }
  ): Promise<RateLimitResult> {
    // Adjust limits based on community context
    let adjustedConfig = { ...config }
    
    // Verified users get higher limits
    if (context.isVerified) {
      adjustedConfig.requests = Math.floor(adjustedConfig.requests * 1.5)
    }
    
    // Premium members get higher limits
    if (context.membershipLevel === 'premium') {
      adjustedConfig.requests = Math.floor(adjustedConfig.requests * 2)
    } else if (context.membershipLevel === 'ambassador') {
      adjustedConfig.requests = Math.floor(adjustedConfig.requests * 3)
    }
    
    // High cultural score gets bonus
    if (context.culturalScore && context.culturalScore >= 80) {
      adjustedConfig.requests = Math.floor(adjustedConfig.requests * 1.25)
    }
    
    // Poor community standing gets reduced limits
    if (context.communityStanding === 'warning') {
      adjustedConfig.requests = Math.floor(adjustedConfig.requests * 0.5)
    }
    
    return this.limit(identifier, adjustedConfig)
  }
}

// Export enhanced rate limiter for Portuguese community
export const portugueseRateLimit = new PortugueseRateLimiter()