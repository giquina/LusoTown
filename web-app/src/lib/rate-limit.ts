import { createClient, RedisClientType } from 'redis';

// Redis client for rate limiting
let redis: RedisClientType | null = null;

// Initialize Redis client
const initializeRedis = async (): Promise<RedisClientType | null> => {
  if (redis) return redis;

  // Use different Redis configurations based on environment
  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisPassword = process.env.REDIS_PASSWORD || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (process.env.NODE_ENV === 'production' && redisUrl) {
    // Production: Use Redis service (Upstash, Railway, or other)
    try {
      redis = createClient({
        url: redisUrl,
        password: redisPassword,
      });
      await redis.connect();
    } catch (error) {
      console.error('Redis connection failed:', error);
      redis = null;
    }
  } else {
    // Development: Use in-memory fallback
    console.warn('Redis not configured - using in-memory rate limiting (not suitable for production)');
    redis = null;
  }

  return redis;
};

// Rate limit configurations for different endpoints
export const RATE_LIMIT_CONFIGS = {
  // Business directory endpoints
  'business-directory': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 50,
    description: 'Business directory access',
  },
  
  // Community messaging endpoints  
  'community-messaging': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    description: 'Community messaging',
  },
  
  // Event booking endpoints
  'event-booking': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    description: 'Event booking',
  },
  
  // Authentication endpoints
  'authentication': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    description: 'Authentication attempts',
  },
  
  // Matching system endpoints
  'matching': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    description: 'Cultural matching',
  },
  
  // Transport services endpoints
  'transport': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 15,
    description: 'Transport services',
  },
  
  // Admin endpoints (more restrictive)
  'admin': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    description: 'Administrative functions',
  },
  
  // General API endpoints
  'general': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    description: 'General API access',
  },
  
  // Streaming endpoints
  'streaming': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60,
    description: 'Streaming content access',
  },
  
  // Feed and content endpoints
  'content': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 80,
    description: 'Content and feed access',
  }
} as const;

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIGS;

// Trusted Portuguese community partners (bypass rate limits)
const TRUSTED_PARTNERS = new Set([
  // Portuguese Chamber of Commerce IPs
  // University partnership IPs  
  // Community organization IPs
  // Add trusted IP ranges or API keys here
]);

// Rate limiting result interface
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

// Rate limiting function with Portuguese community context
export async function rateLimit(
  identifier: string,
  type: RateLimitType,
  options: {
    userBased?: boolean;
    ipBased?: boolean;
    bypassForTrusted?: boolean;
    customLimits?: { maxRequests?: number; windowMs?: number };
  } = {}
): Promise<RateLimitResult> {
  // Use custom limits if provided, otherwise fallback to default config
  const config = options.customLimits || RATE_LIMIT_CONFIGS[type];
  const windowMs = config.windowMs || RATE_LIMIT_CONFIGS[type].windowMs;
  const maxRequests = config.maxRequests || RATE_LIMIT_CONFIGS[type].maxRequests;
  
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const windowEnd = windowStart + windowMs;
  
  // Check for trusted partners bypass
  if (options.bypassForTrusted && TRUSTED_PARTNERS.has(identifier)) {
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests,
      resetTime: new Date(windowEnd),
    };
  }

  try {
    const redisClient = await initializeRedis();
    
    if (!redisClient) {
      // Fallback to in-memory rate limiting for development
      return inMemoryRateLimit(identifier, type, { maxRequests, windowMs }, windowEnd);
    }

    // Redis-based rate limiting
    const key = `rate_limit:${type}:${identifier}:${windowStart}`;
    
    // Use Redis multi for atomic operations
    const multi = redisClient.multi();
    multi.incr(key);
    multi.expire(key, Math.ceil(windowMs / 1000));
    
    const results = await multi.exec();
    const currentCount = (results?.[0] as number) || 0;
    
    const remaining = Math.max(0, maxRequests - currentCount);
    const success = currentCount <= maxRequests;
    
    return {
      success,
      limit: maxRequests,
      remaining,
      resetTime: new Date(windowEnd),
      retryAfter: success ? undefined : Math.ceil((windowEnd - Date.now()) / 1000),
    };
    
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow requests if Redis is unavailable
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests,
      resetTime: new Date(windowEnd),
    };
  }
}

// In-memory fallback for development
const inMemoryStore = new Map<string, { count: number; windowStart: number }>();

function inMemoryRateLimit(
  identifier: string,
  type: RateLimitType,
  config: { maxRequests: number; windowMs: number },
  windowEnd: number
): RateLimitResult {
  const windowStart = Math.floor(Date.now() / config.windowMs) * config.windowMs;
  const key = `${type}:${identifier}`;
  
  const current = inMemoryStore.get(key);
  
  if (!current || current.windowStart !== windowStart) {
    inMemoryStore.set(key, { count: 1, windowStart });
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime: new Date(windowEnd),
    };
  }
  
  current.count++;
  const remaining = Math.max(0, config.maxRequests - current.count);
  const success = current.count <= config.maxRequests;
  
  return {
    success,
    limit: config.maxRequests,
    remaining,
    resetTime: new Date(windowEnd),
    retryAfter: success ? undefined : Math.ceil((windowEnd - Date.now()) / 1000),
  };
}

// Get rate limit status without incrementing
export async function getRateLimitStatus(
  identifier: string,
  type: RateLimitType
): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIGS[type];
  const windowStart = Math.floor(Date.now() / config.windowMs) * config.windowMs;
  const windowEnd = windowStart + config.windowMs;
  
  try {
    const redisClient = await initializeRedis();
    
    if (!redisClient) {
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests,
        resetTime: new Date(windowEnd),
      };
    }

    const key = `rate_limit:${type}:${identifier}:${windowStart}`;
    const currentCount = await redisClient.get(key);
    const count = currentCount ? parseInt(currentCount, 10) : 0;
    
    const remaining = Math.max(0, config.maxRequests - count);
    const success = count < config.maxRequests;
    
    return {
      success,
      limit: config.maxRequests,
      remaining,
      resetTime: new Date(windowEnd),
    };
    
  } catch (error) {
    console.error('Rate limit status check error:', error);
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: new Date(windowEnd),
    };
  }
}

// Clean up expired rate limit entries (maintenance function)
export async function cleanupRateLimitData(): Promise<void> {
  try {
    const redisClient = await initializeRedis();
    if (!redisClient) return;
    
    // Redis automatically expires keys, so no cleanup needed for Redis
    // This is mainly for the in-memory fallback
    const now = Date.now();
    const entries = Array.from(inMemoryStore.entries());
    for (const [key, value] of entries) {
      if (now - value.windowStart > 300000) { // 5 minutes
        inMemoryStore.delete(key);
      }
    }
  } catch (error) {
    console.error('Rate limit cleanup error:', error);
  }
}

// Portuguese community specific rate limiting helpers
export const PORTUGUESE_COMMUNITY_ENDPOINTS = {
  '/api/business-directory': 'business-directory',
  '/api/events': 'event-booking', 
  '/api/messaging': 'community-messaging',
  '/api/matching': 'matching',
  '/api/transport': 'transport',
  '/api/auth': 'authentication',
  '/api/admin': 'admin',
  '/api/streaming': 'streaming',
  '/api/feed': 'content',
  '/api/community': 'content',
} as const;

// Helper to determine rate limit type from URL path
export function getRateLimitTypeFromPath(pathname: string): RateLimitType {
  for (const [path, type] of Object.entries(PORTUGUESE_COMMUNITY_ENDPOINTS)) {
    if (pathname.startsWith(path)) {
      return type as RateLimitType;
    }
  }
  return 'general';
}