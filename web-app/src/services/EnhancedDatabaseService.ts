/**
 * Enhanced Database Service for LusoTown Portuguese-Speaking Community
 * 
 * Provides optimized database operations with:
 * - Connection pooling for high availability
 * - Advanced caching with Redis integration
 * - PostGIS optimization for Portuguese business directory
 * - Real-time subscription management
 * - Performance monitoring and analytics
 */

import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import logger from '@/utils/logger';

// Types for Portuguese community data
interface PortugueseBusinessSearchParams {
  userLat: number;
  userLng: number;
  businessTypes?: string[];
  portugueseSpecialties?: string[];
  radiusKm?: number;
  culturalPreference?: 'portugal' | 'brazil' | 'africa' | 'mixed';
  ratingThreshold?: number;
  priceRange?: 'budget' | 'mid' | 'premium';
  openingNow?: boolean;
  limit?: number;
}

interface PortugueseEventSearchParams {
  userLat?: number;
  userLng?: number;
  radiusKm?: number;
  culturalCategories?: string[];
  languagePreference?: string;
  eventTypes?: string[];
  dateRangeStart?: string;
  dateRangeEnd?: string;
  priceMax?: number;
  membershipRequired?: string;
  limit?: number;
}

interface CulturalCompatibilityParams {
  userId: string;
  targetUserId: string;
  includeLocationFactor?: boolean;
  locationImportance?: number;
}

interface DatabasePerformanceMetrics {
  queryCount: number;
  averageExecutionTime: number;
  slowQueries: Array<{
    query: string;
    executionTime: number;
    timestamp: Date;
  }>;
  cacheHitRatio: number;
  connectionPoolStats: {
    active: number;
    idle: number;
    total: number;
  };
}

/**
 * Connection pool configuration optimized for Portuguese community workload
 */
const CONNECTION_POOL_CONFIG = {
  // Pool sizing for Portuguese community scale (750+ members, 2150+ students)
  minConnections: 8,
  maxConnections: 50,
  acquireTimeoutMillis: 30000,
  createTimeoutMillis: 30000,
  destroyTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  reapIntervalMillis: 1000,
  
  // Portuguese community specific optimizations
  applicationName: 'LusoTown-Enhanced-Community-Service',
  
  // Performance settings for PostGIS operations
  statementTimeout: 60000,
  queryTimeout: 30000,
  connectionTimeout: 10000,
  
  // Retry configuration for reliability
  maxRetries: 3,
  retryDelayMs: 1000
};

/**
 * Cache configuration for different Portuguese community data types
 */
const CACHE_CONFIG = {
  portugueseBusinesses: {
    keyPrefix: 'pt_business',
    ttlSeconds: 1800, // 30 minutes
    maxEntries: 1000
  },
  portugueseEvents: {
    keyPrefix: 'pt_event',
    ttlSeconds: 300, // 5 minutes  
    maxEntries: 500
  },
  culturalMatches: {
    keyPrefix: 'cultural_match',
    ttlSeconds: 900, // 15 minutes
    maxEntries: 200
  },
  businessClusters: {
    keyPrefix: 'pt_clusters',
    ttlSeconds: 3600, // 1 hour
    maxEntries: 50
  },
  performanceMetrics: {
    keyPrefix: 'perf_metrics',
    ttlSeconds: 60, // 1 minute
    maxEntries: 10
  }
} as const;

/**
 * Enhanced Database Service with Portuguese community optimizations
 */
export class EnhancedDatabaseService {
  private supabase: SupabaseClient;
  private redis: Redis | null = null;
  private connectionPool: Map<string, SupabaseClient> = new Map();
  private performanceMetrics: DatabasePerformanceMetrics;
  private realtimeChannels: Map<string, any> = new Map();
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private performanceMonitoringActive = false;
  private connectionPoolHealth = {
    healthy: true,
    lastHealthCheck: new Date(),
    unhealthyConnectionCount: 0,
    averageResponseTime: 0
  };

  constructor() {
    // Initialize primary Supabase client
    this.supabase = this.createOptimizedSupabaseClient();
    
    // Initialize Redis for caching (optional)
    this.initializeRedisClient();
    
    // Initialize performance tracking
    this.performanceMetrics = {
      queryCount: 0,
      averageExecutionTime: 0,
      slowQueries: [],
      cacheHitRatio: 0,
      connectionPoolStats: {
        active: 0,
        idle: 0,
        total: 0
      }
    };
    
    // Setup connection pooling
    this.initializeConnectionPool();
    
    // Setup real-time subscriptions for Portuguese community data
    this.setupPortugueseRealtimeSubscriptions();
    
    // Initialize health monitoring
    this.startHealthMonitoring();
    
    // Start performance monitoring
    this.initializePerformanceMonitoring();
  }

  /**
   * Create optimized Supabase client for Portuguese community operations
   */
  private createOptimizedSupabaseClient(): SupabaseClient {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration for Portuguese community service');
    }
    
    return createClient(supabaseUrl, supabaseKey, {
      db: {
        schema: 'public'
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      },
      realtime: {
        params: {
          eventsPerSecond: 15, // Higher for Portuguese community activity
        }
      },
      global: {
        headers: {
          'X-Portuguese-Community-Service': 'true',
          'X-Service-Version': '2.0.0'
        }
      }
    });
  }

  /**
   * Initialize Redis client for caching
   */
  private async initializeRedisClient(): Promise<void> {
    try {
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        this.redis = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
          retry: {
            retries: 3,
            backoff: (retryCount) => Math.pow(2, retryCount) * 1000
          }
        });
        
        // Test Redis connection
        await this.redis.ping();
        logger.info('Redis cache initialized for Lusophone community database service', {
          area: 'performance',
          culturalContext: 'lusophone',
          action: 'redis_cache_initialized'
        });
      }
    } catch (error) {
      logger.warn('Redis cache not available for Lusophone database service, using in-memory cache', {
        error: error.message,
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'redis_cache_fallback'
      });
      this.redis = null;
    }
  }

  /**
   * Initialize connection pooling for high availability
   */
  private initializeConnectionPool(): void {
    // Create multiple client instances for connection pooling
    for (let i = 0; i < CONNECTION_POOL_CONFIG.minConnections; i++) {
      const client = this.createOptimizedSupabaseClient();
      this.connectionPool.set(`client_${i}`, client);
    }
    
    logger.info('Lusophone database connection pool initialized', {
      minConnections: CONNECTION_POOL_CONFIG.minConnections,
      maxConnections: CONNECTION_POOL_CONFIG.maxConnections,
      area: 'performance',
      culturalContext: 'lusophone',
      action: 'connection_pool_initialized'
    });
  }

  /**
   * Get optimized client from connection pool
   */
  private getPooledClient(): SupabaseClient {
    // Simple round-robin client selection
    const clientKeys = Array.from(this.connectionPool.keys());
    const selectedKey = clientKeys[Math.floor(Math.random() * clientKeys.length)];
    return this.connectionPool.get(selectedKey) || this.supabase;
  }

  /**
   * Setup real-time subscriptions for Portuguese community data
   */
  private setupPortugueseRealtimeSubscriptions(): void {
    // Subscribe to Portuguese business changes
    const businessChannel = this.supabase
      .channel('portuguese-businesses-enhanced')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'portuguese_businesses',
            filter: 'is_active=eq.true'
          }, 
          (payload) => {
            logger.debug('Lusophone business real-time update received', {
              payload,
              area: 'business',
              culturalContext: 'lusophone',
              action: 'business_update_received'
            });
            this.invalidateCache('portugueseBusinesses');
          })
      .subscribe();
    
    this.realtimeChannels.set('businesses', businessChannel);

    // Subscribe to Portuguese events changes
    const eventsChannel = this.supabase
      .channel('portuguese-events-enhanced')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'events'
          }, 
          (payload) => {
            // Only invalidate for Portuguese-relevant events
            const event = payload.new || payload.old;
            if (this.isPortugueseRelevantEvent(event)) {
              logger.debug('Lusophone event real-time update received', {
                payload,
                area: 'events',
                culturalContext: 'lusophone',
                action: 'event_update_received'
              });
              this.invalidateCache('portugueseEvents');
            }
          })
      .subscribe();
    
    this.realtimeChannels.set('events', eventsChannel);

    // Subscribe to cultural compatibility updates
    const matchesChannel = this.supabase
      .channel('cultural-matches-enhanced')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_matches'
          }, 
          (payload) => {
            logger.debug('Lusophone cultural match update received', {
              payload,
              area: 'matching',
              culturalContext: 'lusophone',
              action: 'match_update_received'
            });
            this.invalidateCache('culturalMatches');
          })
      .subscribe();
    
    this.realtimeChannels.set('matches', matchesChannel);
  }

  /**
   * Check if event is Portuguese-relevant for cache invalidation
   */
  private isPortugueseRelevantEvent(event: any): boolean {
    if (!event) return false;
    
    const portugueseKeywords = [
      'português', 'portuguese', 'fado', 'portugal', 'brasil', 'lusófono',
      'cultural', 'comunidade'
    ];
    
    const title = (event.title || '').toLowerCase();
    const description = (event.description || '').toLowerCase();
    const category = (event.category || '').toLowerCase();
    
    return portugueseKeywords.some(keyword => 
      title.includes(keyword) || 
      description.includes(keyword) || 
      category.includes(keyword)
    );
  }

  /**
   * Advanced Portuguese business search with caching and optimization
   */
  async findPortugueseBusinessesAdvanced(params: PortugueseBusinessSearchParams) {
    const cacheKey = this.generateCacheKey('portugueseBusinesses', params);
    const startTime = performance.now();
    
    try {
      // Try cache first
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        this.updatePerformanceMetrics('cache_hit', performance.now() - startTime);
        return {
          data: cachedResult,
          cached: true,
          executionTime: performance.now() - startTime
        };
      }
      
      // Execute optimized database query
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('find_portuguese_businesses_advanced', {
        user_lat: params.userLat,
        user_lng: params.userLng,
        business_types: params.businessTypes,
        portuguese_specialties: params.portugueseSpecialties,
        radius_km: params.radiusKm || 10.0,
        cultural_preference: params.culturalPreference,
        rating_threshold: params.ratingThreshold || 0.0,
        price_range: params.priceRange,
        opening_now: params.openingNow || false,
        limit_count: params.limit || 20
      });
      
      if (error) throw error;
      
      // Cache the results
      await this.setCache(cacheKey, data, 'portugueseBusinesses');
      
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_query', executionTime);
      
      return {
        data,
        cached: false,
        executionTime
      };
      
    } catch (error) {
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_error', executionTime);
      logger.error('Enhanced Lusophone business search failed', error, {
        params: searchParams,
        area: 'business',
        culturalContext: 'lusophone',
        action: 'business_search_failed'
      });
      throw error;
    }
  }

  /**
   * Enhanced Portuguese event discovery with geospatial optimization
   */
  async findPortugueseEventsGeospatialOptimized(params: PortugueseEventSearchParams) {
    const cacheKey = this.generateCacheKey('portugueseEvents', params);
    const startTime = performance.now();
    
    try {
      // Try cache first
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        this.updatePerformanceMetrics('cache_hit', performance.now() - startTime);
        return {
          data: cachedResult,
          cached: true,
          executionTime: performance.now() - startTime
        };
      }
      
      // Execute optimized geospatial query
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('find_portuguese_events_geospatial_optimized', {
        user_lat: params.userLat,
        user_lng: params.userLng,
        radius_km: params.radiusKm || 25.0,
        cultural_categories: params.culturalCategories,
        language_preference: params.languagePreference || 'pt',
        event_types: params.eventTypes,
        date_range_start: params.dateRangeStart,
        date_range_end: params.dateRangeEnd,
        price_max: params.priceMax,
        membership_required: params.membershipRequired,
        limit_count: params.limit || 20
      });
      
      if (error) throw error;
      
      // Cache the results
      await this.setCache(cacheKey, data, 'portugueseEvents');
      
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_query', executionTime);
      
      return {
        data,
        cached: false,
        executionTime
      };
      
    } catch (error) {
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_error', executionTime);
      logger.error('Enhanced Lusophone event discovery failed', error, {
        params: searchParams,
        area: 'events',
        culturalContext: 'lusophone',
        action: 'event_discovery_failed'
      });
      throw error;
    }
  }

  /**
   * Portuguese business clustering analysis
   */
  async getPortugueseBusinessClusters(
    centerLat: number = 51.5074, // London center
    centerLng: number = -0.1278,
    clusterRadiusKm: number = 2.0,
    minBusinessesPerCluster: number = 3
  ) {
    const cacheKey = this.generateCacheKey('businessClusters', {
      centerLat,
      centerLng,
      clusterRadiusKm,
      minBusinessesPerCluster
    });
    const startTime = performance.now();
    
    try {
      // Try cache first
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        this.updatePerformanceMetrics('cache_hit', performance.now() - startTime);
        return {
          data: cachedResult,
          cached: true,
          executionTime: performance.now() - startTime
        };
      }
      
      // Execute clustering analysis
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('get_portuguese_business_clusters', {
        center_lat: centerLat,
        center_lng: centerLng,
        cluster_radius_km: clusterRadiusKm,
        min_businesses_per_cluster: minBusinessesPerCluster
      });
      
      if (error) throw error;
      
      // Cache the results (longer TTL for clustering data)
      await this.setCache(cacheKey, data, 'businessClusters');
      
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_query', executionTime);
      
      return {
        data,
        cached: false,
        executionTime
      };
      
    } catch (error) {
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_error', executionTime);
      logger.error('Lusophone business clustering analysis failed', error, {
        userLat,
        userLng,
        area: 'business',
        culturalContext: 'lusophone',
        action: 'business_clustering_failed'
      });
      throw error;
    }
  }

  /**
   * Advanced cultural compatibility calculation with location factors
   */
  async calculateCulturalCompatibilityAdvanced(params: CulturalCompatibilityParams) {
    const cacheKey = this.generateCacheKey('culturalMatches', params);
    const startTime = performance.now();
    
    try {
      // Try cache first
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        this.updatePerformanceMetrics('cache_hit', performance.now() - startTime);
        return {
          data: cachedResult,
          cached: true,
          executionTime: performance.now() - startTime
        };
      }
      
      // Execute cultural compatibility calculation
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('calculate_portuguese_cultural_compatibility_advanced', {
        user_id: params.userId,
        target_user_id: params.targetUserId,
        include_location_factor: params.includeLocationFactor || true,
        location_importance: params.locationImportance || 0.15
      });
      
      if (error) throw error;
      
      // Cache the results
      await this.setCache(cacheKey, data, 'culturalMatches');
      
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_query', executionTime);
      
      return {
        data,
        cached: false,
        executionTime
      };
      
    } catch (error) {
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('database_error', executionTime);
      logger.error('Advanced Lusophone cultural compatibility calculation failed', error, {
        userId: params.userId,
        targetUserId: params.targetUserId,
        area: 'matching',
        culturalContext: 'lusophone',
        action: 'compatibility_calculation_failed'
      });
      throw error;
    }
  }

  /**
   * Database maintenance and optimization
   */
  async maintainPortugueseCommunityDatabase() {
    const startTime = performance.now();
    
    try {
      logger.info('Starting Lusophone community database maintenance', {
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'maintenance_started'
      });
      
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('maintain_portuguese_community_database');
      
      if (error) throw error;
      
      const executionTime = performance.now() - startTime;
      
      logger.info('Lusophone database maintenance completed successfully', {
        executionTime: parseFloat(executionTime.toFixed(2)),
        maintenanceResults: data?.length || 0,
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'maintenance_completed',
        duration: parseFloat(executionTime.toFixed(2))
      });
      
      // Log maintenance results
      data?.forEach((result: any) => {
        logger.debug('Lusophone database maintenance task completed', {
          maintenanceType: result.maintenance_type,
          status: result.status,
          taskExecutionTime: result.execution_time_ms,
          area: 'performance',
          culturalContext: 'lusophone',
          action: 'maintenance_task_completed'
        });
      });
      
      return {
        success: true,
        maintenanceResults: data,
        totalExecutionTime: executionTime
      };
      
    } catch (error) {
      logger.error('Lusophone database maintenance failed', error, {
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'maintenance_failed'
      });
      throw error;
    }
  }

  /**
   * Performance monitoring and metrics collection
   */
  async collectPerformanceMetrics() {
    const cacheKey = 'performance_metrics_current';
    const startTime = performance.now();
    
    try {
      // Check cache first (short TTL for performance metrics)
      const cachedResult = await this.getFromCache(cacheKey);
      if (cachedResult) {
        return {
          data: cachedResult,
          cached: true
        };
      }
      
      const client = this.getPooledClient();
      const { data, error } = await client.rpc('collect_portuguese_performance_metrics');
      
      if (error) throw error;
      
      // Add internal service metrics
      const enhancedMetrics = {
        database_metrics: data,
        service_metrics: {
          ...this.performanceMetrics,
          connectionPool: {
            active: this.connectionPool.size,
            configured_min: CONNECTION_POOL_CONFIG.minConnections,
            configured_max: CONNECTION_POOL_CONFIG.maxConnections
          },
          cache_status: {
            redis_available: this.redis !== null,
            cache_configs: Object.keys(CACHE_CONFIG)
          }
        },
        collection_timestamp: new Date().toISOString()
      };
      
      // Cache metrics briefly
      await this.setCache(cacheKey, enhancedMetrics, 'performanceMetrics');
      
      const executionTime = performance.now() - startTime;
      this.updatePerformanceMetrics('performance_collection', executionTime);
      
      return {
        data: enhancedMetrics,
        cached: false,
        executionTime
      };
      
    } catch (error) {
      logger.error('Lusophone database performance metrics collection failed', error, {
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'metrics_collection_failed'
      });
      throw error;
    }
  }

  /**
   * Cache management methods
   */
  private generateCacheKey(category: keyof typeof CACHE_CONFIG, params: any): string {
    const config = CACHE_CONFIG[category];
    const paramsHash = Buffer.from(JSON.stringify(params)).toString('base64');
    return `${config.keyPrefix}:${paramsHash}`;
  }

  private async getFromCache(key: string): Promise<any | null> {
    try {
      if (this.redis) {
        const cached = await this.redis.get(key);
        if (cached) {
          return JSON.parse(cached as string);
        }
      }
      return null;
    } catch (error) {
      logger.warn('Lusophone database cache get operation failed', {
        key,
        error: error.message,
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'cache_get_failed'
      });
      return null;
    }
  }

  private async setCache(key: string, data: any, category: keyof typeof CACHE_CONFIG): Promise<void> {
    try {
      if (this.redis) {
        const config = CACHE_CONFIG[category];
        await this.redis.setex(key, config.ttlSeconds, JSON.stringify(data));
      }
    } catch (error) {
      logger.warn('Lusophone database cache set operation failed', {
        key,
        ttlSeconds,
        error: error.message,
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'cache_set_failed'
      });
    }
  }

  private async invalidateCache(category: keyof typeof CACHE_CONFIG): Promise<void> {
    try {
      if (this.redis) {
        const config = CACHE_CONFIG[category];
        const pattern = `${config.keyPrefix}:*`;
        
        // Get all keys matching pattern and delete them
        // Note: This is a simplified approach - in production, consider using SCAN
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      }
    } catch (error) {
      logger.warn('Lusophone database cache invalidation failed', {
        key,
        error: error.message,
        area: 'performance',
        culturalContext: 'lusophone',
        action: 'cache_invalidation_failed'
      });
    }
  }

  /**
   * Performance metrics tracking
   */
  private updatePerformanceMetrics(type: 'cache_hit' | 'database_query' | 'database_error' | 'performance_collection', executionTime: number): void {
    this.performanceMetrics.queryCount++;
    
    // Update average execution time
    const totalTime = this.performanceMetrics.averageExecutionTime * (this.performanceMetrics.queryCount - 1) + executionTime;
    this.performanceMetrics.averageExecutionTime = totalTime / this.performanceMetrics.queryCount;
    
    // Track slow queries (>500ms)
    if (executionTime > 500) {
      this.performanceMetrics.slowQueries.push({
        query: type,
        executionTime,
        timestamp: new Date()
      });
      
      // Keep only last 50 slow queries
      if (this.performanceMetrics.slowQueries.length > 50) {
        this.performanceMetrics.slowQueries = this.performanceMetrics.slowQueries.slice(-50);
      }
    }
    
    // Update cache hit ratio
    if (type === 'cache_hit') {
      const totalQueries = this.performanceMetrics.queryCount;
      const cacheHits = this.performanceMetrics.slowQueries.filter(q => q.query === 'cache_hit').length;
      this.performanceMetrics.cacheHitRatio = cacheHits / totalQueries;
    }
  }

  /**
   * Get current performance statistics
   */
  getPerformanceStatistics(): DatabasePerformanceMetrics {
    return {
      ...this.performanceMetrics,
      connectionPoolStats: {
        active: this.connectionPool.size,
        idle: CONNECTION_POOL_CONFIG.minConnections - this.connectionPool.size,
        total: this.connectionPool.size
      }
    };
  }

  /**
   * Cleanup resources and close connections
   */
  async cleanup(): Promise<void> {
    logger.info('Cleaning up Enhanced Lusophone Database Service', {
      area: 'performance',
      culturalContext: 'lusophone',
      action: 'service_cleanup_started'
    });
    
    // Close real-time channels
    this.realtimeChannels.forEach((channel, key) => {
      this.supabase.removeChannel(channel);
    });
    this.realtimeChannels.clear();
    
    // Close connection pool (Supabase handles this automatically)
    this.connectionPool.clear();
    
    // Close Redis connection
    if (this.redis) {
      // Redis client automatically handles cleanup
    }
    
    logger.info('Enhanced Lusophone Database Service cleanup completed', {
      area: 'performance',
      culturalContext: 'lusophone',
      action: 'service_cleanup_completed'
    });
  }
}

// Singleton instance for application-wide use
let enhancedDatabaseService: EnhancedDatabaseService | null = null;

/**
 * Get or create the enhanced database service instance
 */
export function getEnhancedDatabaseService(): EnhancedDatabaseService {
  if (!enhancedDatabaseService) {
    enhancedDatabaseService = new EnhancedDatabaseService();
  }
  return enhancedDatabaseService;
}

export default EnhancedDatabaseService;