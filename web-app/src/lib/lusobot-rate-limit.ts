/**
 * LusoBot Rate Limiting and Abuse Prevention
 * 
 * Production-grade rate limiting system for LusoBot AI assistant
 * with Portuguese-speaking community-specific considerations and fair usage policies.
 */

// Dynamic import for Redis to handle missing dependency gracefully
let Redis: any = null
try {
  Redis = require('@upstash/redis').Redis
} catch (error) {
  // Redis not available, will use in-memory fallback
  console.warn('Redis not available for rate limiting, using in-memory fallback')
}

// Rate limiting configuration
export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  burstLimit: number // Allowed burst above normal limit
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator: (userId: string, ip?: string) => string
  message: string
  standardHeaders?: boolean
  legacyHeaders?: boolean
}

// Community-based rate limiting tiers
export const RATE_LIMIT_TIERS = {
  // Free tier - basic rate limiting
  free: {
    windowMs: 60000, // 1 minute
    maxRequests: 10, // 10 requests per minute
    burstLimit: 15,
    keyGenerator: (userId: string) => `lusobot:free:${userId}`,
    message: 'Rate limit exceeded. Please wait before sending more messages to LusoBot.'
  },
  
  // Community members - more generous limits
  community: {
    windowMs: 60000, // 1 minute
    maxRequests: 20, // 20 requests per minute
    burstLimit: 30,
    keyGenerator: (userId: string) => `lusobot:community:${userId}`,
    message: 'Rate limit exceeded. As a community member, you have higher limits. Please wait a moment.'
  },
  
  // Active community members - higher limits
  active: {
    windowMs: 60000, // 1 minute
    maxRequests: 40, // 40 requests per minute
    burstLimit: 60,
    keyGenerator: (userId: string) => `lusobot:active:${userId}`,
    message: 'Rate limit exceeded. Please wait before continuing your conversation.'
  },
  
  // Community leaders - very high limits
  leader: {
    windowMs: 60000, // 1 minute
    maxRequests: 80, // 80 requests per minute
    burstLimit: 120,
    keyGenerator: (userId: string) => `lusobot:leader:${userId}`,
    message: 'Rate limit exceeded. As a community leader, you have high limits. Please wait briefly.'
  },
  
  // Premium subscribers - highest limits
  premium: {
    windowMs: 60000, // 1 minute
    maxRequests: 100, // 100 requests per minute
    burstLimit: 150,
    keyGenerator: (userId: string) => `lusobot:premium:${userId}`,
    message: 'Rate limit exceeded. Premium members have the highest limits. Please wait a moment.'
  }
} as const

export type RateLimitTier = keyof typeof RATE_LIMIT_TIERS

// Portuguese-speaking community-specific rate limiting rules
export const COMMUNITY_RATE_RULES = {
  // Emotional support conversations get special treatment
  saudadeSupport: {
    windowMs: 300000, // 5 minutes
    maxRequests: 15, // 15 emotional support messages per 5 minutes
    burstLimit: 20,
    keyGenerator: (userId: string) => `lusobot:saudade:${userId}`,
    message: 'Compreendemos que precisa de apoio emocional. Por favor, aguarde um momento antes de continuar. / We understand you need emotional support. Please wait a moment before continuing.'
  },
  
  // Cultural learning sessions
  culturalLearning: {
    windowMs: 60000, // 1 minute
    maxRequests: 30, // 30 cultural questions per minute
    burstLimit: 40,
    keyGenerator: (userId: string) => `lusobot:cultural:${userId}`,
    message: 'Learning about Portuguese culture is wonderful! Please pace your questions for the best experience.'
  },
  
  // Language practice sessions
  languagePractice: {
    windowMs: 60000, // 1 minute
    maxRequests: 50, // 50 language practice messages per minute
    burstLimit: 70,
    keyGenerator: (userId: string) => `lusobot:language:${userId}`,
    message: 'A prática de português é importante! Por favor, faça uma pausa entre as conversas. / Lusophone practice is important! Please pause between conversations.'
  }
}

// Rate limiting class
export class LusoBotRateLimit {
  private redis: any = null
  private memoryStore: Map<string, { count: number; resetTime: number }> = new Map()

  constructor() {
    if (Redis && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        this.redis = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN
        })
      } catch (error) {
        console.warn('Failed to initialize Redis, using memory store:', error)
      }
    }
  }

  /**
   * Check if user has exceeded rate limit
   */
  async checkRateLimit(
    userId: string,
    tier: RateLimitTier,
    ip?: string,
    specialRule?: keyof typeof COMMUNITY_RATE_RULES
  ): Promise<RateLimitResult> {
    const config = specialRule ? COMMUNITY_RATE_RULES[specialRule] : RATE_LIMIT_TIERS[tier]
    const key = config.keyGenerator(userId, ip)
    
    if (!this.redis) {
      // Use memory store fallback
      return this.checkRateLimitMemory(key, config)
    }

    try {
      const window = Math.floor(Date.now() / config.windowMs)
      const redisKey = `${key}:${window}`

      // Get current count
      const current = await this.redis.get(redisKey) as number || 0
      
      // Check if limit exceeded
      const limit = config.maxRequests
      const burstLimit = config.burstLimit
      const allowed = current < limit

      if (allowed) {
        // Increment counter
        const pipeline = this.redis.pipeline()
        pipeline.incr(redisKey)
        pipeline.expire(redisKey, Math.ceil(config.windowMs / 1000))
        await pipeline.exec()
      }

      // Check if burst limit exceeded (more serious violation)
      const burstViolation = current >= burstLimit

      return {
        allowed,
        limit,
        remaining: Math.max(0, limit - current - 1),
        resetTime: (window + 1) * config.windowMs,
        burstViolation,
        message: config.message
      }

    } catch (error) {
      console.error('Rate limiting error:', error)
      // Fallback to memory store
      return this.checkRateLimitMemory(key, config)
    }
  }

  /**
   * Memory store fallback for rate limiting
   */
  private checkRateLimitMemory(
    key: string,
    config: any
  ): RateLimitResult {
    const now = Date.now()
    const window = Math.floor(now / config.windowMs)
    const memoryKey = `${key}:${window}`
    
    // Clean expired entries
    const cutoff = now - config.windowMs * 2
    for (const [k, v] of this.memoryStore.entries()) {
      if (v.resetTime < cutoff) {
        this.memoryStore.delete(k)
      }
    }
    
    // Get or create entry
    let entry = this.memoryStore.get(memoryKey)
    if (!entry) {
      entry = { count: 0, resetTime: (window + 1) * config.windowMs }
      this.memoryStore.set(memoryKey, entry)
    }
    
    const allowed = entry.count < config.maxRequests
    const burstViolation = entry.count >= config.burstLimit
    
    if (allowed) {
      entry.count++
    }
    
    return {
      allowed,
      limit: config.maxRequests,
      remaining: Math.max(0, config.maxRequests - entry.count - 1),
      resetTime: entry.resetTime,
      burstViolation,
      message: config.message
    }
  }

  /**
   * Determine appropriate rate limit tier based on user profile
   */
  async determineRateLimitTier(
    userId: string,
    userProfile: any,
    culturalProfile: any,
    hasActiveSubscription: boolean
  ): Promise<RateLimitTier> {
    try {
      // Premium subscribers get highest tier
      if (hasActiveSubscription) {
        return 'premium'
      }

      // Community leaders
      if (userProfile?.community_role === 'leader' || culturalProfile?.cultural_archetype === 'guardião_comunidade') {
        return 'leader'
      }

      // Active community members
      if (culturalProfile?.community_engagement >= 7 || userProfile?.community_contributions > 10) {
        return 'active'
      }

      // Basic community members
      if (culturalProfile || userProfile?.verified_heritage) {
        return 'community'
      }

      // Default free tier
      return 'free'

    } catch (error) {
      console.error('Error determining rate limit tier:', error)
      return 'free' // Safe default
    }
  }

  /**
   * Detect conversation type for special rate limiting rules
   */
  detectConversationType(
    message: string,
    emotionalTone: any,
    culturalContext: any
  ): keyof typeof COMMUNITY_RATE_RULES | null {
    // High saudade content gets emotional support treatment
    if (emotionalTone?.saudade > 0.6 || emotionalTone?.nostalgia > 0.6) {
      return 'saudadeSupport'
    }

    // Language learning indicators
    if (message.includes('como se diz') || 
        message.includes('how do you say') ||
        message.includes('pronúncia') ||
        message.includes('pronunciation') ||
        culturalContext?.expertise?.includes('language_learning')) {
      return 'languagePractice'
    }

    // Cultural learning indicators
    if (culturalContext?.topic === 'history' ||
        culturalContext?.topic === 'traditions' ||
        culturalContext?.topic === 'cuisine' ||
        culturalContext?.topic === 'fado' ||
        message.includes('cultura portuguesa') ||
        message.includes('portuguese culture')) {
      return 'culturalLearning'
    }

    return null
  }

  /**
   * Track rate limit violations for abuse prevention
   */
  async trackViolation(
    userId: string,
    tier: RateLimitTier,
    ip?: string,
    userAgent?: string
  ): Promise<void> {
    if (!this.redis) {
      // Memory store fallback - simplified tracking
      const violationKey = `violations:${userId}`
      const entry = this.memoryStore.get(violationKey) || { count: 0, resetTime: Date.now() + 86400000 }
      entry.count++
      this.memoryStore.set(violationKey, entry)
      return
    }

    try {
      const violationKey = `lusobot:violations:${userId}`
      const dailyKey = `lusobot:violations:daily:${userId}:${new Date().toDateString()}`
      
      // Track total violations
      await this.redis.incr(violationKey)
      await this.redis.expire(violationKey, 86400 * 7) // 7 days
      
      // Track daily violations
      await this.redis.incr(dailyKey)
      await this.redis.expire(dailyKey, 86400) // 24 hours
      
      // Get violation counts
      const totalViolations = await this.redis.get(violationKey) as number || 0
      const dailyViolations = await this.redis.get(dailyKey) as number || 0
      
      // Implement escalating consequences
      if (dailyViolations > 50) {
        // Temporary block for excessive daily violations
        await this.redis.setex(`lusobot:blocked:${userId}`, 3600, 'excessive_violations') // 1 hour
      } else if (totalViolations > 200) {
        // Longer block for persistent violators
        await this.redis.setex(`lusobot:blocked:${userId}`, 86400, 'persistent_violations') // 24 hours
      }
      
    } catch (error) {
      console.error('Error tracking rate limit violation:', error)
    }
  }

  /**
   * Check if user is blocked for abuse
   */
  async isUserBlocked(userId: string): Promise<BlockStatus> {
    if (!this.redis) {
      // Memory store fallback - simplified blocking
      const blockKey = `blocked:${userId}`
      const entry = this.memoryStore.get(blockKey)
      if (entry && entry.resetTime > Date.now()) {
        return { blocked: true, reason: 'memory_store_block', unblockTime: entry.resetTime }
      }
      return { blocked: false }
    }

    try {
      const blockReason = await this.redis.get(`lusobot:blocked:${userId}`) as string
      
      if (blockReason) {
        const ttl = await this.redis.ttl(`lusobot:blocked:${userId}`)
        return {
          blocked: true,
          reason: blockReason,
          unblockTime: Date.now() + (ttl * 1000)
        }
      }
      
      return { blocked: false }
      
    } catch (error) {
      console.error('Error checking user block status:', error)
      return { blocked: false }
    }
  }

  /**
   * Get rate limit status for user
   */
  async getRateLimitStatus(userId: string, tier: RateLimitTier): Promise<RateLimitStatus> {
    if (!this.redis) {
      return {
        tier,
        dailyUsage: 0,
        weeklyUsage: 0,
        violations: 0
      }
    }

    try {
      const today = new Date().toDateString()
      const thisWeek = getWeekString(new Date())
      
      const [dailyUsage, weeklyUsage, violations] = await Promise.all([
        this.redis.get(`lusobot:usage:daily:${userId}:${today}`) as Promise<number>,
        this.redis.get(`lusobot:usage:weekly:${userId}:${thisWeek}`) as Promise<number>,
        this.redis.get(`lusobot:violations:${userId}`) as Promise<number>
      ])
      
      return {
        tier,
        dailyUsage: dailyUsage || 0,
        weeklyUsage: weeklyUsage || 0,
        violations: violations || 0,
        limits: RATE_LIMIT_TIERS[tier]
      }
      
    } catch (error) {
      console.error('Error getting rate limit status:', error)
      return {
        tier,
        dailyUsage: 0,
        weeklyUsage: 0,
        violations: 0
      }
    }
  }
}

// Types
export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetTime: number
  burstViolation?: boolean
  message?: string
}

export interface BlockStatus {
  blocked: boolean
  reason?: string
  unblockTime?: number
}

export interface RateLimitStatus {
  tier: RateLimitTier
  dailyUsage: number
  weeklyUsage: number
  violations: number
  limits?: typeof RATE_LIMIT_TIERS[RateLimitTier]
}

// Helper functions
function getWeekString(date: Date): string {
  const year = date.getFullYear()
  const week = Math.ceil(((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7)
  return `${year}-W${week.toString().padStart(2, '0')}`
}

// Export singleton instance
export const lusoBotRateLimit = new LusoBotRateLimit()

// Middleware helper for Next.js API routes
export function withRateLimit(tier: RateLimitTier = 'free') {
  return async function rateLimitMiddleware(
    userId: string,
    request: Request,
    context?: {
      userProfile?: any
      culturalProfile?: any
      hasActiveSubscription?: boolean
      emotionalTone?: any
      culturalContext?: any
    }
  ) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Determine actual tier if context provided
    let actualTier = tier
    if (context) {
      actualTier = await lusoBotRateLimit.determineRateLimitTier(
        userId,
        context.userProfile,
        context.culturalProfile,
        context.hasActiveSubscription || false
      )
    }
    
    // Check if user is blocked
    const blockStatus = await lusoBotRateLimit.isUserBlocked(userId)
    if (blockStatus.blocked) {
      return {
        allowed: false,
        error: 'User temporarily blocked for excessive usage',
        blockReason: blockStatus.reason,
        unblockTime: blockStatus.unblockTime
      }
    }
    
    // Detect special conversation type
    let specialRule: keyof typeof COMMUNITY_RATE_RULES | null = null
    if (context?.emotionalTone && context?.culturalContext) {
      specialRule = lusoBotRateLimit.detectConversationType(
        (request as any).message || '',
        context.emotionalTone,
        context.culturalContext
      )
    }
    
    // Check rate limit
    const result = await lusoBotRateLimit.checkRateLimit(
      userId,
      actualTier,
      ip,
      specialRule
    )
    
    // Track violations
    if (!result.allowed) {
      await lusoBotRateLimit.trackViolation(
        userId,
        actualTier,
        ip,
        request.headers.get('user-agent') || undefined
      )
    }
    
    return {
      allowed: result.allowed,
      limit: result.limit,
      remaining: result.remaining,
      resetTime: result.resetTime,
      message: result.message,
      tier: actualTier,
      burstViolation: result.burstViolation
    }
  }
}