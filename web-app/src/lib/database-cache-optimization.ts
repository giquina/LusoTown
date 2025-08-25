/**
 * Lusophone-Speaking Community Database Cache Optimization
 * 
 * Optimizes database queries with intelligent caching for Lusophone cultural content
 * Implements connection pooling, query caching, and real-time subscription management
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cache configuration for Lusophone community features
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum cache entries
  enableRealtime: boolean;
  prefetchThreshold: number; // Prefetch when cache hit ratio drops below this
}

// Cache configurations for different data types
const CACHE_CONFIGS: Record<string, CacheConfig> = {
  portugueseEvents: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 1000,
    enableRealtime: true,
    prefetchThreshold: 0.8
  },
  portugueseBusinesses: {
    ttl: 30 * 60 * 1000, // 30 minutes
    maxSize: 500,
    enableRealtime: false,
    prefetchThreshold: 0.9
  },
  culturalMatches: {
    ttl: 15 * 60 * 1000, // 15 minutes
    maxSize: 200,
    enableRealtime: true,
    prefetchThreshold: 0.7
  },
  communityFeed: {
    ttl: 2 * 60 * 1000, // 2 minutes
    maxSize: 100,
    enableRealtime: true,
    prefetchThreshold: 0.6
  },
  portugalNations: {
    ttl: 60 * 60 * 1000, // 1 hour
    maxSize: 50,
    enableRealtime: false,
    prefetchThreshold: 0.95
  }
};

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  hitCount: number;
  lastAccessed: number;
}

// Query cache with LRU eviction
class PortugueseQueryCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: CacheConfig;
  private hitCount = 0;
  private missCount = 0;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.missCount++;
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.config.ttl) {
      this.cache.delete(key);
      this.missCount++;
      return null;
    }

    // Update access statistics
    entry.hitCount++;
    entry.lastAccessed = Date.now();
    this.hitCount++;

    return entry.data;
  }

  set(key: string, data: T): void {
    // Evict old entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      hitCount: 0,
      lastAccessed: Date.now()
    });
  }

  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  getHitRatio(): number {
    const total = this.hitCount + this.missCount;
    return total > 0 ? this.hitCount / total : 0;
  }

  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  getStats(): { hitCount: number; missCount: number; hitRatio: number; size: number } {
    return {
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRatio: this.getHitRatio(),
      size: this.cache.size
    };
  }
}

/**
 * Optimized Supabase client with Lusophone community caching
 */
export class OptimizedPortugueseSupabaseClient {
  private supabase: SupabaseClient;
  private caches: Map<string, PortugueseQueryCache<any>>;
  private realtimeChannels: Map<string, any>;

  constructor(supabaseUrl: string, supabaseKey: string) {
    // Initialize Supabase client with optimized configuration
    this.supabase = createClient(supabaseUrl, supabaseKey, {
      db: {
        schema: 'public',
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
      global: {
        headers: {
          'X-Lusophone-Community': 'true',
        },
      },
    });

    // Initialize caches for different data types
    this.caches = new Map();
    this.realtimeChannels = new Map();
    
    Object.entries(CACHE_CONFIGS).forEach(([key, config]) => {
      this.caches.set(key, new PortugueseQueryCache(config));
    });

    this.setupRealtimeSubscriptions();
  }

  /**
   * Get Lusophone events with optimized caching
   */
  async getPortugueseEventsOptimized(params: {
    userLat?: number;
    userLng?: number;
    radiusKm?: number;
    categories?: string[];
    language?: string;
    limit?: number;
  }) {
    const cacheKey = `events_${JSON.stringify(params)}`;
    const cache = this.caches.get('portugueseEvents')!;
    
    // Try cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return { data: cachedData, cached: true };
    }

    // Query database with optimized function
    const { data, error } = await this.supabase.rpc('find_portuguese_events_optimized', {
      user_lat: params.userLat,
      user_lng: params.userLng,
      radius_km: params.radiusKm || 25.0,
      cultural_categories: params.categories,
      language_preference: params.language || 'pt',
      limit_count: params.limit || 20
    });

    if (error) throw error;

    // Cache the results
    cache.set(cacheKey, data);
    
    return { data, cached: false };
  }

  /**
   * Get Portuguese businesses with PostGIS optimization and caching
   */
  async getPortugueseBusinessesOptimized(params: {
    userLat: number;
    userLng: number;
    businessTypes?: string[];
    radiusKm?: number;
    limit?: number;
  }) {
    const cacheKey = `businesses_${JSON.stringify(params)}`;
    const cache = this.caches.get('portugueseBusinesses')!;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return { data: cachedData, cached: true };
    }

    const { data, error } = await this.supabase.rpc('find_portuguese_businesses_optimized', {
      user_lat: params.userLat,
      user_lng: params.userLng,
      business_types: params.businessTypes,
      radius_km: params.radiusKm || 10.0,
      limit_count: params.limit || 15
    });

    if (error) throw error;

    cache.set(cacheKey, data);
    
    return { data, cached: false };
  }

  /**
   * Calculate cultural compatibility with caching
   */
  async calculateCulturalCompatibilityOptimized(userId: string, targetUserId: string) {
    const cacheKey = `compatibility_${userId}_${targetUserId}`;
    const cache = this.caches.get('culturalMatches')!;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return { data: cachedData, cached: true };
    }

    const { data, error } = await this.supabase.rpc('calculate_portuguese_cultural_compatibility_optimized', {
      user_id: userId,
      target_user_id: targetUserId
    });

    if (error) throw error;

    cache.set(cacheKey, data);
    
    return { data, cached: false };
  }

  /**
   * Get Lusophone community feed with real-time updates
   */
  async getPortugueseCommunityFeedOptimized(userId: string, limit?: number, offset?: number) {
    const cacheKey = `community_feed_${userId}_${limit}_${offset}`;
    const cache = this.caches.get('communityFeed')!;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return { data: cachedData, cached: true };
    }

    const { data, error } = await this.supabase.rpc('get_portuguese_community_feed_optimized', {
      user_id: userId,
      feed_limit: limit || 25,
      offset_count: offset || 0
    });

    if (error) throw error;

    cache.set(cacheKey, data);
    
    return { data, cached: false };
  }

  /**
   * Get Lusophone nation suggestions with caching
   */
  async getPortugueseNationSuggestions(userId?: string, limit?: number) {
    const cacheKey = `nation_suggestions_${userId}_${limit}`;
    const cache = this.caches.get('portugalNations')!;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return { data: cachedData, cached: true };
    }

    const { data, error } = await this.supabase.rpc('get_portuguese_nation_suggestions', {
      user_uuid: userId,
      limit_count: limit || 10
    });

    if (error) throw error;

    cache.set(cacheKey, data);
    
    return { data, cached: false };
  }

  /**
   * Setup real-time subscriptions for cache invalidation
   */
  private setupRealtimeSubscriptions(): void {
    // Subscribe to events changes
    const eventsChannel = this.supabase
      .channel('portuguese-events-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'events' }, 
          (payload) => {
            this.invalidateCache('portugueseEvents');
            this.invalidateCache('communityFeed');
          })
      .subscribe();
    
    this.realtimeChannels.set('events', eventsChannel);

    // Subscribe to business changes
    const businessesChannel = this.supabase
      .channel('portuguese-businesses-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'portuguese_businesses' }, 
          (payload) => {
            this.invalidateCache('portugueseBusinesses');
          })
      .subscribe();
    
    this.realtimeChannels.set('businesses', businessesChannel);

    // Subscribe to user matches changes
    const matchesChannel = this.supabase
      .channel('cultural-matches-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'user_matches' }, 
          (payload) => {
            this.invalidateCache('culturalMatches');
          })
      .subscribe();
    
    this.realtimeChannels.set('matches', matchesChannel);

    // Subscribe to community feed changes
    const feedChannel = this.supabase
      .channel('community-feed-changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'event_feed_posts' }, 
          (payload) => {
            this.invalidateCache('communityFeed');
          })
      .subscribe();
    
    this.realtimeChannels.set('feed', feedChannel);
  }

  /**
   * Invalidate specific cache
   */
  private invalidateCache(cacheType: string): void {
    const cache = this.caches.get(cacheType);
    if (cache) {
      cache.clear();
    }
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStatistics(): Record<string, any> {
    const stats: Record<string, any> = {};
    
    this.caches.forEach((cache, key) => {
      stats[key] = cache.getStats();
    });
    
    return stats;
  }

  /**
   * Prefetch popular Lusophone content
   */
  async prefetchPopularContent(): Promise<void> {
    console.log('🔄 Prefetching popular Lusophone content...');
    
    try {
      // Prefetch popular events
      await this.getPortugueseEventsOptimized({
        categories: ['Cultural Events', 'Music & Entertainment'],
        limit: 50
      });

      // Prefetch London Portuguese businesses
      await this.getPortugueseBusinessesOptimized({
        userLat: 51.5074,
        userLng: -0.1278,
        radiusKm: 25,
        limit: 30
      });

      // Prefetch Lusophone nation data
      await this.getPortugueseNationSuggestions();

      console.log('✅ Popular content prefetched successfully');
    } catch (error) {
      console.error('❌ Failed to prefetch popular content:', error);
    }
  }

  /**
   * Cleanup resources and close connections
   */
  cleanup(): void {
    // Close real-time channels
    this.realtimeChannels.forEach((channel, key) => {
      this.supabase.removeChannel(channel);
    });
    
    this.realtimeChannels.clear();
    
    // Clear all caches
    this.caches.forEach((cache) => {
      cache.clear();
    });
  }

  /**
   * Get the underlying Supabase client for advanced operations
   */
  getClient(): SupabaseClient {
    return this.supabase;
  }
}

/**
 * Connection pool configuration for production
 */
export const PRODUCTION_DB_CONFIG = {
  poolSize: 20,
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  statementTimeout: 60000,
  
  // Lusophone community specific optimizations
  applicationName: 'LusoTown-Lusophone-Community',
  searchPath: 'public',
  
  // Connection pooling for high availability
  maxConnections: 100,
  minConnections: 5,
  acquireTimeoutMillis: 30000,
  createTimeoutMillis: 30000,
  destroyTimeoutMillis: 5000,
  reapIntervalMillis: 1000,
  
  // Performance optimizations
  ssl: true,
  keepAlive: true,
  keepAliveInitialDelayMillis: 0
};

/**
 * Database performance monitoring metrics
 */
export class DatabasePerformanceMonitor {
  private metrics: {
    queryCount: number;
    totalExecutionTime: number;
    slowQueries: Array<{ query: string; time: number; timestamp: Date }>;
    errorCount: number;
    cacheHitRatio: number;
  };

  constructor() {
    this.metrics = {
      queryCount: 0,
      totalExecutionTime: 0,
      slowQueries: [],
      errorCount: 0,
      cacheHitRatio: 0
    };
  }

  recordQuery(executionTime: number, query: string): void {
    this.metrics.queryCount++;
    this.metrics.totalExecutionTime += executionTime;
    
    // Track slow queries (>200ms)
    if (executionTime > 200) {
      this.metrics.slowQueries.push({
        query,
        time: executionTime,
        timestamp: new Date()
      });
      
      // Keep only last 100 slow queries
      if (this.metrics.slowQueries.length > 100) {
        this.metrics.slowQueries = this.metrics.slowQueries.slice(-100);
      }
    }
  }

  recordError(): void {
    this.metrics.errorCount++;
  }

  updateCacheHitRatio(ratio: number): void {
    this.metrics.cacheHitRatio = ratio;
  }

  getMetrics(): typeof this.metrics {
    return {
      ...this.metrics,
      averageExecutionTime: this.metrics.queryCount > 0 
        ? this.metrics.totalExecutionTime / this.metrics.queryCount 
        : 0
    };
  }

  resetMetrics(): void {
    this.metrics = {
      queryCount: 0,
      totalExecutionTime: 0,
      slowQueries: [],
      errorCount: 0,
      cacheHitRatio: 0
    };
  }
}

// Singleton instance for application-wide use
let optimizedSupabaseClient: OptimizedPortugueseSupabaseClient | null = null;

/**
 * Get or create the optimized Supabase client instance
 */
export function getOptimizedSupabaseClient(): OptimizedPortugueseSupabaseClient {
  if (!optimizedSupabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration for Lusophone community optimization');
    }
    
    optimizedSupabaseClient = new OptimizedPortugueseSupabaseClient(supabaseUrl, supabaseKey);
    
    // Prefetch popular content on initialization
    optimizedSupabaseClient.prefetchPopularContent();
  }
  
  return optimizedSupabaseClient;
}

export default OptimizedPortugueseSupabaseClient;