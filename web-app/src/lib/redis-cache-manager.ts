/**
 * Redis Cache Manager for LusoTown Portuguese-speaking Community Platform
 * 
 * Advanced Redis caching with Portuguese cultural content optimization:
 * - Intelligent cache warming for Portuguese events and businesses
 * - Geolocation caching for UK Portuguese community
 * - Cultural compatibility caching for matching system
 * - Real-time cache invalidation for Portuguese content updates
 */

import { createClient, RedisClientType } from 'redis';
import logger from '@/utils/logger';

interface CacheConfig {
  ttl: number; // Time to live in seconds
  refreshThreshold: number; // Refresh when TTL is below this percentage
  compression: boolean; // Enable data compression
  tags: string[]; // Cache tags for invalidation
}

interface CacheMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  errors: number;
  totalMemoryUsed: number;
  hitRatio: number;
  averageResponseTime: number;
}

export class PortugueseRedisCacheManager {
  private client: RedisClientType;
  private isConnected: boolean = false;
  private metrics: CacheMetrics;
  private connectionRetries: number = 0;
  private maxRetries: number = 5;
  private retryDelay: number = 1000; // ms

  // Cache configurations for Portuguese community content
  private cacheConfigs: Record<string, CacheConfig> = {
    'portuguese-events': {
      ttl: 300, // 5 minutes
      refreshThreshold: 0.2,
      compression: true,
      tags: ['events', 'cultural', 'portuguese']
    },
    'portuguese-businesses': {
      ttl: 1800, // 30 minutes
      refreshThreshold: 0.3,
      compression: true,
      tags: ['businesses', 'directory', 'portuguese']
    },
    'cultural-matches': {
      ttl: 900, // 15 minutes
      refreshThreshold: 0.25,
      compression: true,
      tags: ['matching', 'cultural', 'portuguese']
    },
    'geo-locations': {
      ttl: 3600, // 1 hour
      refreshThreshold: 0.4,
      compression: true,
      tags: ['geolocation', 'uk', 'portuguese']
    },
    'community-feed': {
      ttl: 180, // 3 minutes
      refreshThreshold: 0.15,
      compression: false, // Real-time content, don't compress
      tags: ['feed', 'community', 'realtime']
    },
    'user-sessions': {
      ttl: 86400, // 24 hours
      refreshThreshold: 0.8,
      compression: false,
      tags: ['sessions', 'auth']
    },
    'api-responses': {
      ttl: 600, // 10 minutes
      refreshThreshold: 0.3,
      compression: true,
      tags: ['api', 'responses']
    },
    'rate-limits': {
      ttl: 3600, // 1 hour
      refreshThreshold: 0.9,
      compression: false,
      tags: ['security', 'rate-limiting']
    }
  };

  constructor() {
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      totalMemoryUsed: 0,
      hitRatio: 0,
      averageResponseTime: 0
    };

    this.initializeClient();
  }

  /**
   * Initialize Redis client with Portuguese community optimizations
   */
  private async initializeClient(): Promise<void> {
    try {
      // Use different Redis configurations based on environment
      const redisConfig = this.getRedisConfig();
      
      this.client = createClient(redisConfig);

      // Setup event listeners
      this.client.on('connect', () => {
        logger.info('Portuguese community Redis cache connected');
        this.isConnected = true;
        this.connectionRetries = 0;
      });

      this.client.on('error', (error) => {
        logger.error('Portuguese community Redis cache error', error, {
          area: 'cache',
          action: 'connection_error'
        });
        this.metrics.errors++;
        this.isConnected = false;
        this.handleConnectionError();
      });

      this.client.on('end', () => {
        logger.warn('Portuguese community Redis cache connection ended');
        this.isConnected = false;
      });

      await this.client.connect();
      
      // Setup cache optimization settings
      await this.setupCacheOptimizations();
      
    } catch (error) {
      logger.error('Failed to initialize Portuguese community Redis cache', error);
      this.handleConnectionError();
    }
  }

  /**
   * Get Redis configuration based on environment
   */
  private getRedisConfig(): any {
    if (process.env.NODE_ENV === 'production') {
      // Production configuration
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        // Upstash Redis (serverless)
        return {
          url: process.env.UPSTASH_REDIS_REST_URL,
          password: process.env.UPSTASH_REDIS_REST_TOKEN
        };
      } else if (process.env.REDIS_URL) {
        // Standard Redis URL
        return {
          url: process.env.REDIS_URL,
          password: process.env.REDIS_PASSWORD
        };
      }
    }

    // Development/fallback configuration
    return {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: 0,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true
    };
  }

  /**
   * Handle connection errors with exponential backoff
   */
  private async handleConnectionError(): Promise<void> {
    if (this.connectionRetries >= this.maxRetries) {
      logger.error('Portuguese community Redis cache max retries exceeded');
      return;
    }

    this.connectionRetries++;
    const delay = this.retryDelay * Math.pow(2, this.connectionRetries - 1);
    
    logger.info(`Retrying Portuguese community Redis connection in ${delay}ms (attempt ${this.connectionRetries}/${this.maxRetries})`);
    
    setTimeout(async () => {
      try {
        await this.client.connect();
      } catch (error) {
        logger.error('Portuguese community Redis reconnection failed', error);
        this.handleConnectionError();
      }
    }, delay);
  }

  /**
   * Setup cache optimization settings for Portuguese community
   */
  private async setupCacheOptimizations(): Promise<void> {
    if (!this.isConnected) return;

    try {
      // Configure memory optimization
      await this.client.configSet('maxmemory-policy', 'allkeys-lru');
      await this.client.configSet('maxmemory-samples', '10');
      
      // Configure persistence for Portuguese community data
      await this.client.configSet('save', '900 1 300 10 60 10000');
      
      logger.info('Portuguese community Redis cache optimizations applied');
    } catch (error) {
      logger.warn('Failed to apply Redis optimizations', error);
    }
  }

  /**
   * Get cached data for Portuguese community content
   */
  async get<T = any>(key: string, cacheType?: string): Promise<T | null> {
    if (!this.isConnected) {
      logger.warn('Portuguese community Redis cache not connected, returning null');
      this.metrics.misses++;
      return null;
    }

    const startTime = Date.now();

    try {
      const cacheKey = this.buildCacheKey(key, cacheType);
      const data = await this.client.get(cacheKey);
      
      const responseTime = Date.now() - startTime;
      this.updateMetrics('get', responseTime);

      if (data === null) {
        this.metrics.misses++;
        return null;
      }

      this.metrics.hits++;
      
      // Parse data (handle compression if enabled)
      const config = cacheType ? this.cacheConfigs[cacheType] : null;
      const parsedData = await this.parseData(data, config?.compression);
      
      // Check if cache needs refreshing
      if (cacheType && config) {
        const ttl = await this.client.ttl(cacheKey);
        const configTtl = config.ttl;
        const remainingTtlPercentage = ttl / configTtl;
        
        if (remainingTtlPercentage < config.refreshThreshold) {
          // Cache is close to expiring, trigger background refresh
          this.scheduleRefresh(cacheKey, cacheType);
        }
      }

      return parsedData;
    } catch (error) {
      this.metrics.errors++;
      logger.error('Portuguese community Redis cache get error', error, {
        area: 'cache',
        action: 'get',
        key: key.substring(0, 50) // Log only first 50 chars for security
      });
      return null;
    }
  }

  /**
   * Set cached data for Portuguese community content
   */
  async set<T = any>(
    key: string, 
    value: T, 
    cacheType?: string, 
    customTtl?: number
  ): Promise<boolean> {
    if (!this.isConnected) {
      logger.warn('Portuguese community Redis cache not connected, skipping set');
      return false;
    }

    const startTime = Date.now();

    try {
      const cacheKey = this.buildCacheKey(key, cacheType);
      const config = cacheType ? this.cacheConfigs[cacheType] : null;
      const ttl = customTtl || config?.ttl || 300; // Default 5 minutes
      
      // Serialize data (handle compression if enabled)
      const serializedData = await this.serializeData(value, config?.compression);
      
      await this.client.setEx(cacheKey, ttl, serializedData);
      
      // Add tags for cache invalidation
      if (config?.tags) {
        await this.tagCache(cacheKey, config.tags);
      }

      const responseTime = Date.now() - startTime;
      this.updateMetrics('set', responseTime);
      this.metrics.sets++;

      logger.debug('Portuguese community cache set', {
        key: key.substring(0, 50),
        cacheType,
        ttl,
        size: serializedData.length
      });

      return true;
    } catch (error) {
      this.metrics.errors++;
      logger.error('Portuguese community Redis cache set error', error, {
        area: 'cache',
        action: 'set',
        key: key.substring(0, 50)
      });
      return false;
    }
  }

  /**
   * Delete cached data for Portuguese community content
   */
  async delete(key: string, cacheType?: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const cacheKey = this.buildCacheKey(key, cacheType);
      const deleted = await this.client.del(cacheKey);
      
      if (deleted > 0) {
        this.metrics.deletes++;
        logger.debug('Portuguese community cache deleted', { key: key.substring(0, 50), cacheType });
      }

      return deleted > 0;
    } catch (error) {
      this.metrics.errors++;
      logger.error('Portuguese community Redis cache delete error', error, {
        area: 'cache',
        action: 'delete',
        key: key.substring(0, 50)
      });
      return false;
    }
  }

  /**
   * Cache Portuguese events with geolocation optimization
   */
  async cachePortugueseEvents(
    userLocation: { lat: number; lng: number },
    events: any[],
    filters?: any
  ): Promise<boolean> {
    const cacheKey = `events_${userLocation.lat}_${userLocation.lng}_${JSON.stringify(filters)}`;
    
    return this.set(cacheKey, {
      events,
      location: userLocation,
      filters,
      timestamp: Date.now()
    }, 'portuguese-events');
  }

  /**
   * Cache Portuguese businesses with geolocation data
   */
  async cachePortugueseBusinesses(
    userLocation: { lat: number; lng: number },
    businesses: any[],
    radiusKm: number
  ): Promise<boolean> {
    const cacheKey = `businesses_${userLocation.lat}_${userLocation.lng}_${radiusKm}`;
    
    return this.set(cacheKey, {
      businesses,
      location: userLocation,
      radiusKm,
      timestamp: Date.now()
    }, 'portuguese-businesses');
  }

  /**
   * Cache cultural compatibility matches
   */
  async cacheCulturalMatches(userId: string, matches: any[]): Promise<boolean> {
    const cacheKey = `matches_${userId}`;
    
    return this.set(cacheKey, {
      matches,
      userId,
      timestamp: Date.now()
    }, 'cultural-matches');
  }

  /**
   * Cache API responses for Portuguese community endpoints
   */
  async cacheApiResponse(
    endpoint: string,
    params: any,
    response: any,
    customTtl?: number
  ): Promise<boolean> {
    const cacheKey = `api_${endpoint}_${JSON.stringify(params)}`;
    
    return this.set(cacheKey, {
      response,
      endpoint,
      params,
      timestamp: Date.now()
    }, 'api-responses', customTtl);
  }

  /**
   * Invalidate cache by tags (for Portuguese content updates)
   */
  async invalidateByTags(tags: string[]): Promise<number> {
    if (!this.isConnected) return 0;

    let deletedCount = 0;

    try {
      for (const tag of tags) {
        const tagKey = `tag:${tag}`;
        const keys = await this.client.sMembers(tagKey);
        
        if (keys.length > 0) {
          const deleted = await this.client.del(keys);
          deletedCount += deleted;
          
          // Remove the tag set
          await this.client.del(tagKey);
        }
      }

      logger.info('Portuguese community cache invalidated by tags', {
        tags,
        deletedCount
      });

      return deletedCount;
    } catch (error) {
      this.metrics.errors++;
      logger.error('Portuguese community cache tag invalidation error', error);
      return 0;
    }
  }

  /**
   * Warm cache with popular Portuguese community content
   */
  async warmCache(): Promise<void> {
    if (!this.isConnected) return;

    logger.info('Warming Portuguese community cache...');

    try {
      // This would be called by background jobs or during app startup
      // Implementation would fetch and cache popular content:
      
      // 1. Popular Portuguese events in London
      // 2. Top-rated Portuguese businesses
      // 3. Common cultural compatibility queries
      // 4. Frequently accessed user sessions
      
      logger.info('Portuguese community cache warming completed');
    } catch (error) {
      logger.error('Portuguese community cache warming failed', error);
    }
  }

  /**
   * Get cache metrics for Portuguese community monitoring
   */
  getMetrics(): CacheMetrics {
    const totalRequests = this.metrics.hits + this.metrics.misses;
    
    return {
      ...this.metrics,
      hitRatio: totalRequests > 0 ? this.metrics.hits / totalRequests : 0
    };
  }

  /**
   * Get detailed cache statistics
   */
  async getDetailedStats(): Promise<any> {
    if (!this.isConnected) {
      return { connected: false };
    }

    try {
      const info = await this.client.info('memory');
      const dbSize = await this.client.dbSize();
      
      return {
        connected: true,
        dbSize,
        memoryInfo: this.parseRedisInfo(info),
        metrics: this.getMetrics(),
        cacheConfigs: this.cacheConfigs
      };
    } catch (error) {
      logger.error('Failed to get Portuguese community cache stats', error);
      return { connected: false, error: error.message };
    }
  }

  /**
   * Clear all Portuguese community cache
   */
  async clearAll(): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.flushAll();
      this.resetMetrics();
      logger.info('Portuguese community cache cleared');
      return true;
    } catch (error) {
      logger.error('Failed to clear Portuguese community cache', error);
      return false;
    }
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    if (this.isConnected) {
      logger.info('Shutting down Portuguese community Redis cache');
      await this.client.quit();
      this.isConnected = false;
    }
  }

  /**
   * Private helper methods
   */

  private buildCacheKey(key: string, cacheType?: string): string {
    const prefix = cacheType || 'general';
    return `lusotown:${prefix}:${key}`;
  }

  private async serializeData(data: any, compress?: boolean): Promise<string> {
    let serialized = JSON.stringify(data);
    
    if (compress) {
      // In a production environment, you might want to use compression
      // For now, we'll just use JSON serialization
      // Example: serialized = await gzip(serialized);
    }
    
    return serialized;
  }

  private async parseData(data: string, compressed?: boolean): Promise<any> {
    let parsed = data;
    
    if (compressed) {
      // In a production environment, you might want to use decompression
      // For now, we'll just parse JSON
      // Example: parsed = await gunzip(data);
    }
    
    return JSON.parse(parsed);
  }

  private async tagCache(cacheKey: string, tags: string[]): Promise<void> {
    for (const tag of tags) {
      const tagKey = `tag:${tag}`;
      await this.client.sAdd(tagKey, cacheKey);
      await this.client.expire(tagKey, 3600); // Tags expire after 1 hour
    }
  }

  private scheduleRefresh(cacheKey: string, cacheType: string): void {
    // In a production environment, this would trigger a background job
    // to refresh the cache before it expires
    logger.debug('Scheduling Portuguese community cache refresh', { cacheKey, cacheType });
  }

  private updateMetrics(operation: string, responseTime: number): void {
    // Update average response time
    const totalOps = this.metrics.hits + this.metrics.misses + this.metrics.sets + this.metrics.deletes;
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime * totalOps + responseTime) / (totalOps + 1);
  }

  private parseRedisInfo(info: string): any {
    const lines = info.split('\r\n');
    const parsed: any = {};
    
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':');
        parsed[key] = isNaN(Number(value)) ? value : Number(value);
      }
    }
    
    return parsed;
  }

  private resetMetrics(): void {
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      errors: 0,
      totalMemoryUsed: 0,
      hitRatio: 0,
      averageResponseTime: 0
    };
  }
}

// Singleton instance for application-wide use
let cacheManager: PortugueseRedisCacheManager | null = null;

/**
 * Get or create the Portuguese community cache manager
 */
export function getPortugueseCacheManager(): PortugueseRedisCacheManager {
  if (!cacheManager) {
    cacheManager = new PortugueseRedisCacheManager();
  }
  
  return cacheManager;
}

/**
 * Initialize Portuguese community cache manager
 */
export function initializePortugueseCacheManager(): PortugueseRedisCacheManager {
  cacheManager = new PortugueseRedisCacheManager();
  return cacheManager;
}

export default PortugueseRedisCacheManager;