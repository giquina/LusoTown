/**
 * Database Query Optimizer for LusoTown Portuguese-speaking Community Platform
 * 
 * Advanced query optimization specifically designed for Portuguese cultural content:
 * - PostGIS geolocation query optimization for UK Portuguese businesses
 * - Portuguese text search optimization with proper character handling
 * - Cultural compatibility algorithm query tuning
 * - Event discovery query performance enhancement
 * - Real-time query performance monitoring and auto-tuning
 */

import { getPortugueseConnectionPool } from './database-connection-pool';
import logger from '@/utils/logger';

interface QueryOptimizationConfig {
  enableQueryProfiling: boolean;
  enableAutoIndexing: boolean;
  maxQueryExecutionTime: number;
  slowQueryThreshold: number;
  cacheQueryPlans: boolean;
  optimizePortugueseText: boolean;
  enableParallelQueries: boolean;
}

interface OptimizedQuery {
  originalQuery: string;
  optimizedQuery: string;
  indexSuggestions: string[];
  estimatedImprovement: number;
  executionPlan?: any;
  optimizationTechniques: string[];
}

interface QueryPerformanceMetrics {
  queryHash: string;
  executionTime: number;
  rowsReturned: number;
  indexesUsed: string[];
  fullTableScans: boolean;
  timestamp: Date;
  queryType: 'cultural' | 'business' | 'geolocation' | 'matching' | 'general';
  portugueseContent: boolean;
}

export class PortugueseQueryOptimizer {
  private config: QueryOptimizationConfig;
  private queryCache: Map<string, OptimizedQuery>;
  private performanceMetrics: Map<string, QueryPerformanceMetrics[]>;
  private connectionPool: any;

  // Portuguese-specific optimization patterns
  private portugueseOptimizations = {
    textSearch: [
      { pattern: /ILIKE\s+['"]%([^%]+)%['"]/, replacement: "to_tsvector('portuguese', $column) @@ plainto_tsquery('portuguese', '$1')" },
      { pattern: /ILIKE\s+['"]([^%]+)%['"]/, replacement: "$column ILIKE '$1%' OR to_tsvector('portuguese', $column) @@ plainto_tsquery('portuguese', '$1')" },
    ],
    geoQueries: [
      { pattern: /ST_Distance\(.*?\)\s*<\s*(\d+)/, replacement: "ST_DWithin($1, $2, $3)" },
      { pattern: /ORDER BY\s+ST_Distance/, replacement: "ORDER BY $column <-> $point" },
    ],
    culturalQueries: [
      { pattern: /cultural_category\s*=\s*ANY/, replacement: "cultural_category = ANY($1) AND is_active = true" },
      { pattern: /portuguese_region\s*&&/, replacement: "portuguese_region && $1 AND event_date >= CURRENT_DATE" },
    ],
    indexHints: [
      { table: 'portuguese_events', columns: ['event_date', 'cultural_category', 'is_active'] },
      { table: 'portuguese_businesses', columns: ['coordinates', 'business_type', 'is_active'] },
      { table: 'cultural_compatibility', columns: ['user_a_id', 'overall_compatibility', 'updated_at'] },
      { table: 'profiles', columns: ['portuguese_origin', 'location', 'is_active'] },
    ]
  };

  constructor(config?: Partial<QueryOptimizationConfig>) {
    this.config = {
      enableQueryProfiling: true,
      enableAutoIndexing: process.env.NODE_ENV === 'production',
      maxQueryExecutionTime: 5000, // 5 seconds
      slowQueryThreshold: 200, // 200ms
      cacheQueryPlans: true,
      optimizePortugueseText: true,
      enableParallelQueries: true,
      ...config
    };

    this.queryCache = new Map();
    this.performanceMetrics = new Map();
    this.connectionPool = getPortugueseConnectionPool();
  }

  /**
   * Optimize query for Portuguese community content
   */
  async optimizeQuery(
    query: string, 
    params?: any[], 
    queryType: 'cultural' | 'business' | 'geolocation' | 'matching' | 'general' = 'general'
  ): Promise<OptimizedQuery> {
    const queryHash = this.generateQueryHash(query);
    
    // Check cache first
    const cachedOptimization = this.queryCache.get(queryHash);
    if (cachedOptimization && this.config.cacheQueryPlans) {
      return cachedOptimization;
    }

    logger.debug('Optimizing Portuguese community query', { queryType, hash: queryHash });

    const optimization = await this.performQueryOptimization(query, params, queryType);
    
    // Cache the optimization result
    if (this.config.cacheQueryPlans) {
      this.queryCache.set(queryHash, optimization);
    }

    return optimization;
  }

  /**
   * Execute optimized query with performance monitoring
   */
  async executeOptimizedQuery<T = any>(
    query: string,
    params?: any[],
    queryType: 'cultural' | 'business' | 'geolocation' | 'matching' | 'general' = 'general'
  ): Promise<{ rows: T[]; rowCount: number; metrics: QueryPerformanceMetrics }> {
    const startTime = Date.now();
    
    // Optimize the query first
    const optimization = await this.optimizeQuery(query, params, queryType);
    const finalQuery = optimization.optimizedQuery || query;

    // Execute the query
    const result = await this.connectionPool.query(finalQuery, params, {
      queryType,
      timeout: this.config.maxQueryExecutionTime
    });

    const executionTime = Date.now() - startTime;
    
    // Collect performance metrics
    const metrics = await this.collectQueryMetrics(
      query,
      finalQuery,
      executionTime,
      result.rowCount || 0,
      queryType
    );

    // Store metrics for analysis
    this.storePerformanceMetrics(this.generateQueryHash(query), metrics);

    // Log slow queries
    if (executionTime > this.config.slowQueryThreshold) {
      logger.warn('Slow Portuguese community query detected', {
        executionTime,
        queryType,
        rowCount: result.rowCount,
        optimized: optimization.optimizedQuery !== optimization.originalQuery
      });
    }

    return {
      rows: result.rows,
      rowCount: result.rowCount || 0,
      metrics
    };
  }

  /**
   * Optimize Portuguese cultural events query
   */
  async optimizePortugueseCulturalEventsQuery(
    userLocation?: { lat: number; lng: number },
    categories?: string[],
    dateRange?: { from: Date; to: Date }
  ): Promise<OptimizedQuery> {
    let query = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.event_date,
        e.event_time,
        e.venue_name,
        e.venue_address,
        e.cultural_category,
        e.portuguese_region,
        e.language_requirements,
        e.price,
        e.max_attendees,
        e.current_attendees,
        e.coordinates
    `;

    // Add distance calculation if location provided
    if (userLocation) {
      query += `,
        ST_Distance(
          ST_SetSRID(ST_MakePoint($lat, $lng), 4326)::geography,
          e.coordinates::geography
        ) / 1000 AS distance_km`;
    }

    query += `
      FROM portuguese_cultural_events e
      WHERE e.is_active = true
        AND e.event_date >= CURRENT_DATE
    `;

    const optimizationTechniques: string[] = [];

    // Add category filter optimization
    if (categories && categories.length > 0) {
      query += ` AND e.cultural_category = ANY($categories)`;
      optimizationTechniques.push('Category array optimization');
    }

    // Add date range optimization
    if (dateRange) {
      query += ` AND e.event_date BETWEEN $fromDate AND $toDate`;
      optimizationTechniques.push('Date range indexing');
    }

    // Add location-based filtering
    if (userLocation) {
      query += ` AND ST_DWithin(
        ST_SetSRID(ST_MakePoint($lng, $lat), 4326)::geography,
        e.coordinates::geography,
        25000
      )`;
      optimizationTechniques.push('PostGIS spatial indexing');
    }

    // Optimize ordering
    if (userLocation) {
      query += ` ORDER BY distance_km ASC, e.event_date ASC`;
      optimizationTechniques.push('Distance-based ordering optimization');
    } else {
      query += ` ORDER BY e.event_date ASC, e.created_at DESC`;
    }

    query += ` LIMIT 50`;

    const indexSuggestions = [
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_active_date ON portuguese_cultural_events (is_active, event_date) WHERE is_active = true',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_location ON portuguese_cultural_events USING GIST(coordinates) WHERE is_active = true',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_category_date ON portuguese_cultural_events (cultural_category, event_date, is_active)'
    ];

    return {
      originalQuery: 'SELECT * FROM portuguese_cultural_events WHERE ...',
      optimizedQuery: query,
      indexSuggestions,
      estimatedImprovement: 70, // 70% estimated improvement
      optimizationTechniques
    };
  }

  /**
   * Optimize Portuguese business directory geolocation query
   */
  async optimizePortugueseBusinessGeoQuery(
    userLocation: { lat: number; lng: number },
    businessTypes?: string[],
    radiusKm: number = 10
  ): Promise<OptimizedQuery> {
    // Optimized PostGIS query with proper spatial indexing
    const query = `
      SELECT 
        b.id,
        b.name,
        b.business_type,
        b.address,
        b.phone,
        b.website,
        b.portuguese_specialties,
        b.opening_hours,
        b.coordinates,
        b.rating_average,
        b.review_count,
        ST_Distance(
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
          b.coordinates::geography
        ) / 1000 AS distance_km
      FROM portuguese_businesses b
      WHERE 
        b.is_active = true
        AND ST_DWithin(
          ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
          b.coordinates::geography,
          $3 * 1000
        )
        ${businessTypes ? 'AND b.business_type = ANY($4)' : ''}
      ORDER BY 
        b.coordinates <-> ST_SetSRID(ST_MakePoint($2, $1), 4326),
        b.rating_average DESC NULLS LAST
      LIMIT 25;
    `;

    const indexSuggestions = [
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_spatial ON portuguese_businesses USING GIST(coordinates) WHERE is_active = true',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_type_active ON portuguese_businesses (business_type, is_active, rating_average DESC)',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_rating ON portuguese_businesses (rating_average DESC, review_count DESC) WHERE is_active = true'
    ];

    return {
      originalQuery: 'Basic geolocation query without optimization',
      optimizedQuery: query,
      indexSuggestions,
      estimatedImprovement: 85, // 85% improvement with spatial indexing
      optimizationTechniques: [
        'PostGIS KNN operator (<->) for distance ordering',
        'ST_DWithin for efficient radius filtering',
        'Spatial GIST indexing for geographic queries',
        'Composite indexing for business type filtering'
      ]
    };
  }

  /**
   * Optimize cultural compatibility matching query
   */
  async optimizeCulturalCompatibilityQuery(
    userId: string,
    minCompatibility: number = 0.7,
    limit: number = 20
  ): Promise<OptimizedQuery> {
    const query = `
      WITH user_preferences AS (
        SELECT 
          cultural_values,
          portuguese_origin,
          language_preference,
          cultural_celebrations
        FROM cultural_preferences 
        WHERE user_id = $1
      ),
      compatibility_scores AS (
        SELECT 
          cc.user_b_id,
          cc.overall_compatibility,
          cc.cultural_compatibility,
          cc.language_compatibility,
          cc.shared_elements,
          p.first_name,
          p.last_name,
          p.profile_picture_url,
          p.location,
          cp.portuguese_origin,
          ROW_NUMBER() OVER (
            ORDER BY cc.overall_compatibility DESC, cc.updated_at DESC
          ) as rank
        FROM cultural_compatibility cc
        JOIN profiles p ON cc.user_b_id = p.id
        LEFT JOIN cultural_preferences cp ON cc.user_b_id = cp.user_id
        WHERE cc.user_a_id = $1
          AND cc.overall_compatibility >= $2
          AND p.is_active = true
          AND p.verification_status = 'verified'
      )
      SELECT *
      FROM compatibility_scores
      WHERE rank <= $3
      ORDER BY overall_compatibility DESC;
    `;

    const indexSuggestions = [
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_user_score ON cultural_compatibility (user_a_id, overall_compatibility DESC, updated_at DESC) WHERE overall_compatibility >= 0.7',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_active_verified ON profiles (is_active, verification_status) WHERE is_active = true AND verification_status = \'verified\'',
      'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_user ON cultural_preferences (user_id) INCLUDE (portuguese_origin, language_preference)'
    ];

    return {
      originalQuery: 'Basic compatibility query without optimization',
      optimizedQuery: query,
      indexSuggestions,
      estimatedImprovement: 75,
      optimizationTechniques: [
        'Common Table Expressions (CTE) for query clarity',
        'Composite indexing on compatibility scores',
        'ROW_NUMBER() window function for efficient pagination',
        'INCLUDE columns in indexes for covered queries'
      ]
    };
  }

  /**
   * Auto-suggest and create missing indexes for Portuguese content
   */
  async autoOptimizeIndexes(): Promise<string[]> {
    if (!this.config.enableAutoIndexing) {
      return [];
    }

    const createdIndexes: string[] = [];

    try {
      const indexSuggestions = this.generatePortugueseIndexSuggestions();
      
      for (const indexQuery of indexSuggestions) {
        try {
          await this.connectionPool.query(indexQuery);
          createdIndexes.push(indexQuery);
          logger.info('Created Portuguese community index', { index: indexQuery });
        } catch (error) {
          // Index might already exist, which is fine
          if (!error.message.includes('already exists')) {
            logger.warn('Failed to create Portuguese community index', { 
              error: error.message, 
              index: indexQuery 
            });
          }
        }
      }
    } catch (error) {
      logger.error('Auto-indexing for Portuguese community failed', error);
    }

    return createdIndexes;
  }

  /**
   * Analyze query performance and provide recommendations
   */
  async analyzeQueryPerformance(timeframe: 'hour' | 'day' | 'week' = 'day'): Promise<any> {
    const now = new Date();
    const timeframeMs = timeframe === 'hour' ? 3600000 : 
                       timeframe === 'day' ? 86400000 : 604800000;
    
    const cutoffTime = new Date(now.getTime() - timeframeMs);
    
    const analysis = {
      totalQueries: 0,
      slowQueries: 0,
      averageExecutionTime: 0,
      queryTypeBreakdown: {} as any,
      topSlowQueries: [] as any[],
      indexRecommendations: [] as string[],
      optimizationOpportunities: [] as string[]
    };

    // Analyze stored metrics
    for (const [queryHash, metrics] of this.performanceMetrics.entries()) {
      const recentMetrics = metrics.filter(m => m.timestamp >= cutoffTime);
      
      if (recentMetrics.length === 0) continue;

      analysis.totalQueries += recentMetrics.length;
      
      const avgTime = recentMetrics.reduce((sum, m) => sum + m.executionTime, 0) / recentMetrics.length;
      const slowQueryCount = recentMetrics.filter(m => m.executionTime > this.config.slowQueryThreshold).length;
      
      analysis.slowQueries += slowQueryCount;
      
      // Track query types
      recentMetrics.forEach(metric => {
        analysis.queryTypeBreakdown[metric.queryType] = 
          (analysis.queryTypeBreakdown[metric.queryType] || 0) + 1;
      });

      // Identify slow queries
      if (avgTime > this.config.slowQueryThreshold) {
        analysis.topSlowQueries.push({
          queryHash,
          averageTime: Math.round(avgTime),
          executionCount: recentMetrics.length,
          queryType: recentMetrics[0].queryType
        });
      }
    }

    // Calculate overall average
    analysis.averageExecutionTime = analysis.totalQueries > 0 
      ? Math.round(analysis.averageExecutionTime / analysis.totalQueries)
      : 0;

    // Sort slow queries by impact (time * frequency)
    analysis.topSlowQueries.sort((a, b) => 
      (b.averageTime * b.executionCount) - (a.averageTime * a.executionCount)
    );

    // Generate recommendations
    analysis.indexRecommendations = this.generatePortugueseIndexSuggestions();
    analysis.optimizationOpportunities = this.generateOptimizationOpportunities(analysis);

    return analysis;
  }

  /**
   * Generate Portuguese-specific index suggestions
   */
  private generatePortugueseIndexSuggestions(): string[] {
    return [
      // Portuguese events optimization
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_active_date_category 
       ON portuguese_cultural_events (is_active, event_date, cultural_category) 
       WHERE is_active = true AND event_date >= CURRENT_DATE`,
      
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_location_active 
       ON portuguese_cultural_events USING GIST(coordinates) 
       WHERE is_active = true`,
      
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_region_date 
       ON portuguese_cultural_events (portuguese_region, event_date, is_active) 
       WHERE is_active = true`,

      // Portuguese businesses optimization
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_spatial_type 
       ON portuguese_businesses USING GIST(coordinates) 
       INCLUDE (business_type, rating_average) 
       WHERE is_active = true`,
      
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_text_search 
       ON portuguese_businesses USING GIN(to_tsvector('portuguese', name || ' ' || description)) 
       WHERE is_active = true`,

      // Cultural compatibility optimization
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_optimized 
       ON cultural_compatibility (user_a_id, overall_compatibility DESC, updated_at DESC) 
       INCLUDE (cultural_compatibility, language_compatibility, shared_elements) 
       WHERE overall_compatibility >= 0.6`,

      // User profiles optimization
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_portuguese_active 
       ON profiles (portuguese_origin, is_active, verification_status) 
       WHERE is_active = true`,

      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_location_heritage 
       ON profiles (location, portuguese_origin, is_active) 
       WHERE is_active = true AND verification_status = 'verified'`
    ];
  }

  /**
   * Private helper methods
   */

  private async performQueryOptimization(
    query: string, 
    params?: any[], 
    queryType?: string
  ): Promise<OptimizedQuery> {
    let optimizedQuery = query;
    const optimizationTechniques: string[] = [];
    let estimatedImprovement = 0;

    // Apply Portuguese text search optimizations
    if (this.config.optimizePortugueseText && queryType === 'cultural') {
      optimizedQuery = this.applyPortugueseTextOptimizations(optimizedQuery);
      optimizationTechniques.push('Portuguese text search optimization');
      estimatedImprovement += 25;
    }

    // Apply geolocation optimizations
    if (queryType === 'geolocation' || queryType === 'business') {
      optimizedQuery = this.applyGeoOptimizations(optimizedQuery);
      optimizationTechniques.push('PostGIS spatial optimization');
      estimatedImprovement += 40;
    }

    // Apply cultural query optimizations
    if (queryType === 'cultural' || queryType === 'matching') {
      optimizedQuery = this.applyCulturalOptimizations(optimizedQuery);
      optimizationTechniques.push('Cultural content optimization');
      estimatedImprovement += 30;
    }

    const indexSuggestions = this.getIndexSuggestionsForQuery(optimizedQuery, queryType);

    return {
      originalQuery: query,
      optimizedQuery,
      indexSuggestions,
      estimatedImprovement,
      optimizationTechniques
    };
  }

  private applyPortugueseTextOptimizations(query: string): string {
    let optimized = query;
    
    for (const opt of this.portugueseOptimizations.textSearch) {
      optimized = optimized.replace(opt.pattern, opt.replacement);
    }
    
    return optimized;
  }

  private applyGeoOptimizations(query: string): string {
    let optimized = query;
    
    for (const opt of this.portugueseOptimizations.geoQueries) {
      optimized = optimized.replace(opt.pattern, opt.replacement);
    }
    
    return optimized;
  }

  private applyCulturalOptimizations(query: string): string {
    let optimized = query;
    
    for (const opt of this.portugueseOptimizations.culturalQueries) {
      optimized = optimized.replace(opt.pattern, opt.replacement);
    }
    
    return optimized;
  }

  private getIndexSuggestionsForQuery(query: string, queryType?: string): string[] {
    const suggestions: string[] = [];
    
    // Analyze query for table usage and suggest indexes
    if (query.includes('portuguese_cultural_events')) {
      suggestions.push('CREATE INDEX ON portuguese_cultural_events (event_date, cultural_category) WHERE is_active = true');
    }
    
    if (query.includes('portuguese_businesses') && query.includes('ST_')) {
      suggestions.push('CREATE INDEX ON portuguese_businesses USING GIST(coordinates)');
    }
    
    if (query.includes('cultural_compatibility')) {
      suggestions.push('CREATE INDEX ON cultural_compatibility (user_a_id, overall_compatibility DESC)');
    }
    
    return suggestions;
  }

  private async collectQueryMetrics(
    originalQuery: string,
    optimizedQuery: string,
    executionTime: number,
    rowCount: number,
    queryType: string
  ): Promise<QueryPerformanceMetrics> {
    return {
      queryHash: this.generateQueryHash(originalQuery),
      executionTime,
      rowsReturned: rowCount,
      indexesUsed: [], // Would be populated from EXPLAIN output
      fullTableScans: false, // Would be detected from EXPLAIN output
      timestamp: new Date(),
      queryType: queryType as any,
      portugueseContent: this.isPortugueseContentQuery(originalQuery)
    };
  }

  private storePerformanceMetrics(queryHash: string, metrics: QueryPerformanceMetrics): void {
    const existing = this.performanceMetrics.get(queryHash) || [];
    existing.push(metrics);
    
    // Keep only last 100 metrics per query
    if (existing.length > 100) {
      existing.splice(0, existing.length - 100);
    }
    
    this.performanceMetrics.set(queryHash, existing);
  }

  private generateQueryHash(query: string): string {
    // Simple hash function for query identification
    return Buffer.from(query.replace(/\s+/g, ' ').trim()).toString('base64').substring(0, 16);
  }

  private isPortugueseContentQuery(query: string): boolean {
    return query.includes('portuguese_') || 
           query.includes('cultural_') || 
           query.includes('lusophone') ||
           query.includes('cultural_category');
  }

  private generateOptimizationOpportunities(analysis: any): string[] {
    const opportunities: string[] = [];
    
    if (analysis.slowQueries > analysis.totalQueries * 0.1) {
      opportunities.push('High percentage of slow queries - consider query optimization and indexing');
    }
    
    if (analysis.queryTypeBreakdown.geolocation > 0 && analysis.averageExecutionTime > 500) {
      opportunities.push('Geolocation queries are slow - ensure PostGIS spatial indexes are created');
    }
    
    if (analysis.queryTypeBreakdown.cultural > 0) {
      opportunities.push('Optimize Portuguese cultural content queries with proper text search indexes');
    }
    
    return opportunities;
  }
}

// Singleton instance
let queryOptimizer: PortugueseQueryOptimizer | null = null;

/**
 * Get or create the Portuguese query optimizer
 */
export function getPortugueseQueryOptimizer(): PortugueseQueryOptimizer {
  if (!queryOptimizer) {
    queryOptimizer = new PortugueseQueryOptimizer();
  }
  
  return queryOptimizer;
}

export default PortugueseQueryOptimizer;