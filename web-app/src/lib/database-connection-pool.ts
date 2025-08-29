/**
 * PostgreSQL Connection Pool Manager for LusoTown Portuguese-speaking Community Platform
 * 
 * Implements advanced connection pooling with Portuguese community optimizations:
 * - Intelligent connection scaling based on community activity
 * - Portuguese cultural content query optimization
 * - Real-time monitoring for Portuguese community events
 * - Geolocation query optimization for UK Portuguese businesses
 */

import { Pool, PoolClient, PoolConfig } from 'pg';
import logger from '@/utils/logger';

interface PortugueseConnectionPoolConfig extends PoolConfig {
  // Portuguese community specific settings
  culturalContentQueries: boolean;
  geoLocationOptimization: boolean;
  realtimeSubscriptions: boolean;
  businessDirectoryOptimization: boolean;
}

interface ConnectionPoolMetrics {
  totalConnections: number;
  activeConnections: number;
  idleConnections: number;
  waitingClients: number;
  totalQueries: number;
  averageQueryTime: number;
  slowQueries: number;
  errorCount: number;
  cacheHitRatio: number;
  portugueseContentQueries: number;
  businessDirectoryQueries: number;
  geoLocationQueries: number;
}

export class PortugueseConnectionPoolManager {
  private pool: Pool;
  private metrics: ConnectionPoolMetrics;
  private queryTimings: Map<string, number[]>;
  private slowQueryThreshold: number = 200; // ms
  private healthCheckInterval: NodeJS.Timeout | null = null;

  constructor(config?: Partial<PortugueseConnectionPoolConfig>) {
    // Optimized connection pool configuration for Portuguese community
    const poolConfig: PortugueseConnectionPoolConfig = {
      // Basic PostgreSQL connection settings
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'lusotown',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,

      // Connection pool optimizations
      min: 5, // Minimum connections for Portuguese community base load
      max: 25, // Maximum connections for peak Portuguese community activity
      idleTimeoutMillis: 30000, // 30 seconds
      connectionTimeoutMillis: 5000, // 5 seconds
      statementTimeout: 30000, // 30 seconds for complex Portuguese queries
      query_timeout: 30000,

      // Application settings
      application_name: 'LusoTown-Portuguese-Community',
      
      // Portuguese community specific features
      culturalContentQueries: true,
      geoLocationOptimization: true,
      realtimeSubscriptions: true,
      businessDirectoryOptimization: true,

      ...config
    };

    this.pool = new Pool(poolConfig);
    this.queryTimings = new Map();
    
    this.metrics = {
      totalConnections: 0,
      activeConnections: 0,
      idleConnections: 0,
      waitingClients: 0,
      totalQueries: 0,
      averageQueryTime: 0,
      slowQueries: 0,
      errorCount: 0,
      cacheHitRatio: 0,
      portugueseContentQueries: 0,
      businessDirectoryQueries: 0,
      geoLocationQueries: 0
    };

    this.setupEventListeners();
    this.startHealthChecks();
    this.setupOptimizedQueries();
  }

  /**
   * Setup pool event listeners for Portuguese community monitoring
   */
  private setupEventListeners(): void {
    this.pool.on('connect', (client) => {
      logger.info('New PostgreSQL client connected for Portuguese community', {
        totalConnections: this.pool.totalCount,
        activeConnections: this.pool.activeCount
      });
    });

    this.pool.on('acquire', (client) => {
      this.metrics.activeConnections++;
    });

    this.pool.on('release', (client) => {
      this.metrics.activeConnections--;
    });

    this.pool.on('error', (err, client) => {
      this.metrics.errorCount++;
      logger.error('PostgreSQL connection pool error for Portuguese community', err, {
        area: 'database',
        action: 'pool_error',
        culturalContext: 'portuguese'
      });
    });

    // Log when pool reaches capacity
    this.pool.on('pool-drain', () => {
      logger.warn('Portuguese community connection pool is at capacity', {
        totalConnections: this.pool.totalCount,
        waitingClients: this.pool.waitingCount
      });
    });
  }

  /**
   * Execute optimized query with Portuguese community context
   */
  async query<T = any>(
    text: string, 
    params?: any[], 
    options?: {
      queryType?: 'cultural' | 'business' | 'geolocation' | 'matching' | 'general';
      timeout?: number;
      priority?: 'high' | 'normal' | 'low';
    }
  ): Promise<{ rows: T[]; rowCount: number; duration: number }> {
    const startTime = Date.now();
    const queryType = options?.queryType || 'general';
    
    try {
      // Apply query optimizations based on type
      const optimizedQuery = this.optimizeQueryForPortugueseCommunity(text, queryType);
      
      const result = await this.pool.query(optimizedQuery, params);
      const duration = Date.now() - startTime;
      
      // Track metrics
      this.recordQueryMetrics(queryType, duration, text);
      
      logger.debug('Portuguese community database query executed', {
        queryType,
        duration,
        rowCount: result.rowCount,
        culturalContext: 'portuguese'
      });

      return {
        rows: result.rows,
        rowCount: result.rowCount || 0,
        duration
      };
    } catch (error) {
      this.metrics.errorCount++;
      const duration = Date.now() - startTime;
      
      logger.error('Portuguese community database query failed', error, {
        area: 'database',
        action: 'query_execution',
        queryType,
        duration,
        culturalContext: 'portuguese'
      });
      
      throw error;
    }
  }

  /**
   * Get dedicated client for Portuguese community transactions
   */
  async getClient(): Promise<PoolClient> {
    const client = await this.pool.connect();
    
    // Optimize client settings for Portuguese community
    await client.query('SET timezone = "Europe/Lisbon"');
    await client.query('SET search_path = public, extensions');
    
    return client;
  }

  /**
   * Execute Portuguese business directory geolocation query
   */
  async queryPortugueseBusinessesGeo(
    latitude: number,
    longitude: number,
    radiusKm: number = 10,
    businessTypes?: string[]
  ) {
    const query = `
      SELECT 
        b.id,
        b.name,
        b.business_type,
        b.address,
        b.phone,
        b.website,
        b.portuguese_specialties,
        b.coordinates,
        ST_Distance(
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
          b.coordinates::geography
        ) / 1000 AS distance_km
      FROM portuguese_businesses b
      WHERE 
        ST_DWithin(
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
          b.coordinates::geography,
          $3 * 1000
        )
        AND ($4::text[] IS NULL OR b.business_type = ANY($4))
        AND b.is_active = true
      ORDER BY distance_km
      LIMIT 25;
    `;

    return this.query(query, [latitude, longitude, radiusKm * 1000, businessTypes], {
      queryType: 'geolocation',
      priority: 'high'
    });
  }

  /**
   * Execute Portuguese cultural event queries with optimization
   */
  async queryPortugueseCulturalEvents(
    userId?: string,
    categories?: string[],
    location?: { lat: number; lng: number; radius: number }
  ) {
    let query = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.event_date,
        e.event_time,
        e.venue_name,
        e.venue_address,
        e.coordinates,
        e.cultural_category,
        e.portuguese_region,
        e.language_requirements,
        e.price,
        e.max_attendees,
        e.current_attendees,
        COALESCE(ea.is_attending, false) as user_attending
      FROM portuguese_cultural_events e
      LEFT JOIN event_attendees ea ON (e.id = ea.event_id AND ea.user_id = $1)
      WHERE e.event_date >= CURRENT_DATE
        AND e.is_active = true
    `;

    const params: any[] = [userId];
    let paramCount = 1;

    if (categories && categories.length > 0) {
      paramCount++;
      query += ` AND e.cultural_category = ANY($${paramCount})`;
      params.push(categories);
    }

    if (location) {
      paramCount++;
      query += ` AND ST_DWithin(
        ST_SetSRID(ST_MakePoint($${paramCount + 1}, $${paramCount}), 4326)::geography,
        e.coordinates::geography,
        $${paramCount + 2} * 1000
      )`;
      params.push(location.lat, location.lng, location.radius);
      paramCount += 2;
    }

    query += `
      ORDER BY 
        CASE WHEN ea.is_attending THEN 0 ELSE 1 END,
        e.event_date ASC,
        e.created_at DESC
      LIMIT 50;
    `;

    return this.query(query, params, {
      queryType: 'cultural',
      priority: 'high'
    });
  }

  /**
   * Execute Portuguese cultural compatibility matching
   */
  async queryPortugueseCulturalMatching(userId: string, limit: number = 20) {
    const query = `
      SELECT 
        cc.user_b_id as potential_match_id,
        cc.overall_compatibility,
        cc.cultural_compatibility,
        cc.language_compatibility,
        cc.professional_compatibility,
        cc.shared_elements,
        p.first_name,
        p.last_name,
        p.profile_picture_url,
        p.location,
        cp.portuguese_origin,
        cp.cultural_interests
      FROM cultural_compatibility cc
      JOIN profiles p ON cc.user_b_id = p.id
      LEFT JOIN cultural_preferences cp ON cc.user_b_id = cp.user_id
      WHERE cc.user_a_id = $1
        AND cc.overall_compatibility >= 0.7
        AND p.is_active = true
        AND p.verification_status = 'verified'
      ORDER BY cc.overall_compatibility DESC, cc.updated_at DESC
      LIMIT $2;
    `;

    return this.query(query, [userId, limit], {
      queryType: 'matching',
      priority: 'high'
    });
  }

  /**
   * Optimize queries for Portuguese community patterns
   */
  private optimizeQueryForPortugueseCommunity(query: string, queryType: string): string {
    let optimizedQuery = query;

    switch (queryType) {
      case 'cultural':
        // Add cultural content specific indexes hint
        if (query.includes('portuguese_cultural_events')) {
          optimizedQuery = `/*+ IndexScan(portuguese_cultural_events idx_cultural_events_date_category) */ ${query}`;
        }
        break;

      case 'business':
        // Add business directory specific optimizations
        if (query.includes('portuguese_businesses')) {
          optimizedQuery = `/*+ IndexScan(portuguese_businesses idx_portuguese_businesses_location) */ ${query}`;
        }
        break;

      case 'geolocation':
        // Enable parallel processing for geolocation queries
        optimizedQuery = `SET LOCAL max_parallel_workers_per_gather = 4; ${query}`;
        break;

      case 'matching':
        // Optimize cultural compatibility queries
        if (query.includes('cultural_compatibility')) {
          optimizedQuery = `/*+ HashJoin(cultural_compatibility profiles) */ ${query}`;
        }
        break;
    }

    return optimizedQuery;
  }

  /**
   * Record query metrics for Portuguese community monitoring
   */
  private recordQueryMetrics(queryType: string, duration: number, queryText: string): void {
    this.metrics.totalQueries++;
    
    // Update query type specific metrics
    switch (queryType) {
      case 'cultural':
        this.metrics.portugueseContentQueries++;
        break;
      case 'business':
      case 'geolocation':
        this.metrics.businessDirectoryQueries++;
        this.metrics.geoLocationQueries++;
        break;
    }

    // Track slow queries
    if (duration > this.slowQueryThreshold) {
      this.metrics.slowQueries++;
      logger.warn('Slow Portuguese community query detected', {
        duration,
        queryType,
        threshold: this.slowQueryThreshold,
        query: queryText.substring(0, 200) + (queryText.length > 200 ? '...' : '')
      });
    }

    // Update timing statistics
    const timings = this.queryTimings.get(queryType) || [];
    timings.push(duration);
    
    // Keep only last 100 timings per type
    if (timings.length > 100) {
      timings.splice(0, timings.length - 100);
    }
    
    this.queryTimings.set(queryType, timings);
    
    // Update average query time
    const totalTime = Array.from(this.queryTimings.values())
      .flat()
      .reduce((sum, time) => sum + time, 0);
    const totalCount = Array.from(this.queryTimings.values())
      .flat()
      .length;
    
    this.metrics.averageQueryTime = totalCount > 0 ? totalTime / totalCount : 0;
  }

  /**
   * Get connection pool metrics for Portuguese community monitoring
   */
  getMetrics(): ConnectionPoolMetrics {
    return {
      ...this.metrics,
      totalConnections: this.pool.totalCount,
      activeConnections: this.pool.activeCount,
      idleConnections: this.pool.idleCount,
      waitingClients: this.pool.waitingCount
    };
  }

  /**
   * Setup optimized queries for Portuguese community
   */
  private async setupOptimizedQueries(): Promise<void> {
    try {
      const client = await this.getClient();
      
      // Create indexes for Portuguese community optimization
      await client.query(`
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_location_active 
        ON portuguese_businesses USING GIST(coordinates) 
        WHERE is_active = true;
      `);
      
      await client.query(`
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_events_date_category_active
        ON portuguese_cultural_events (event_date, cultural_category)
        WHERE is_active = true AND event_date >= CURRENT_DATE;
      `);
      
      await client.query(`
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_score
        ON cultural_compatibility (user_a_id, overall_compatibility DESC, updated_at DESC)
        WHERE overall_compatibility >= 0.7;
      `);

      client.release();
      
      logger.info('Portuguese community database indexes optimized');
    } catch (error) {
      logger.error('Failed to setup Portuguese community database optimizations', error);
    }
  }

  /**
   * Start health check monitoring for Portuguese community
   */
  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      try {
        const startTime = Date.now();
        await this.pool.query('SELECT 1 as health_check');
        const duration = Date.now() - startTime;
        
        if (duration > 1000) {
          logger.warn('Portuguese community database health check slow', {
            duration,
            connections: this.getMetrics()
          });
        }
      } catch (error) {
        logger.error('Portuguese community database health check failed', error);
      }
    }, 30000); // Every 30 seconds
  }

  /**
   * Graceful shutdown of Portuguese community connection pool
   */
  async shutdown(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    logger.info('Shutting down Portuguese community connection pool');
    await this.pool.end();
    logger.info('Portuguese community connection pool shutdown complete');
  }

  /**
   * Get database performance insights for Portuguese community
   */
  getPerformanceInsights(): {
    recommendations: string[];
    alerts: string[];
    metrics: ConnectionPoolMetrics;
  } {
    const metrics = this.getMetrics();
    const recommendations: string[] = [];
    const alerts: string[] = [];

    // Connection pool analysis
    if (metrics.activeConnections / metrics.totalConnections > 0.8) {
      alerts.push('Portuguese community connection pool utilization is high (>80%)');
      recommendations.push('Consider increasing maximum connections for Portuguese community peak hours');
    }

    if (metrics.waitingClients > 0) {
      alerts.push(`${metrics.waitingClients} Portuguese community clients waiting for connections`);
      recommendations.push('Optimize query performance or increase connection pool size');
    }

    // Query performance analysis
    if (metrics.averageQueryTime > 100) {
      alerts.push(`Portuguese community average query time is ${Math.round(metrics.averageQueryTime)}ms`);
      recommendations.push('Review and optimize slow Portuguese cultural queries');
    }

    if (metrics.slowQueries / metrics.totalQueries > 0.1) {
      alerts.push('High percentage of slow Portuguese community queries (>10%)');
      recommendations.push('Add database indexes for Portuguese cultural content queries');
    }

    // Error rate analysis
    if (metrics.errorCount / metrics.totalQueries > 0.05) {
      alerts.push('High Portuguese community database error rate (>5%)');
      recommendations.push('Review connection stability and query error handling');
    }

    return { recommendations, alerts, metrics };
  }
}

// Singleton instance for application-wide use
let connectionPool: PortugueseConnectionPoolManager | null = null;

/**
 * Get or create the Portuguese community connection pool
 */
export function getPortugueseConnectionPool(): PortugueseConnectionPoolManager {
  if (!connectionPool) {
    connectionPool = new PortugueseConnectionPoolManager();
  }
  
  return connectionPool;
}

/**
 * Initialize Portuguese community connection pool with configuration
 */
export function initializePortugueseConnectionPool(
  config?: Partial<PortugueseConnectionPoolConfig>
): PortugueseConnectionPoolManager {
  connectionPool = new PortugueseConnectionPoolManager(config);
  return connectionPool;
}

export default PortugueseConnectionPoolManager;