/**
 * Enhanced API Middleware for LusoTown Portuguese-speaking Community Platform
 * 
 * Integrates connection pooling, Redis caching, and query optimization:
 * - Automatic connection pool management for Portuguese community queries
 * - Intelligent caching for business directory and cultural events
 * - Performance monitoring and optimization for Portuguese content
 * - Rate limiting with Portuguese community context
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPortugueseConnectionPool } from './database-connection-pool';
import { getPortugueseCacheManager } from './redis-cache-manager';
import { getPortugueseQueryOptimizer } from './query-optimizer';
import { withRateLimit } from './rate-limit-middleware';
import logger from '@/utils/logger';

interface ApiMiddlewareConfig {
  enableCaching?: boolean;
  enableQueryOptimization?: boolean;
  enablePerformanceMonitoring?: boolean;
  cacheTTL?: number;
  rateLimit?: {
    endpoint: string;
    maxRequests?: number;
    windowMs?: number;
  };
}

interface ApiContext {
  connectionPool: any;
  cacheManager: any;
  queryOptimizer: any;
  requestId: string;
  startTime: number;
  userId?: string;
  culturalContext: 'portuguese' | 'general';
}

export interface OptimizedApiResponse<T = any> {
  data: T;
  cached: boolean;
  executionTime: number;
  queryCount: number;
  cacheHitRatio: number;
}

export class PortugueseApiMiddleware {
  private connectionPool: any;
  private cacheManager: any;
  private queryOptimizer: any;

  constructor() {
    this.connectionPool = getPortugueseConnectionPool();
    this.cacheManager = getPortugueseCacheManager();
    this.queryOptimizer = getPortugueseQueryOptimizer();
  }

  /**
   * Main middleware wrapper for Portuguese community APIs
   */
  withOptimizations<T = any>(
    handler: (context: ApiContext, request: NextRequest) => Promise<OptimizedApiResponse<T>>,
    config: ApiMiddlewareConfig = {}
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      const requestId = this.generateRequestId();
      const startTime = Date.now();
      
      // Setup API context
      const context: ApiContext = {
        connectionPool: this.connectionPool,
        cacheManager: this.cacheManager,
        queryOptimizer: this.queryOptimizer,
        requestId,
        startTime,
        culturalContext: this.detectPortugueseContext(request)
      };

      try {
        // Apply rate limiting if configured
        if (config.rateLimit) {
          const rateLimitResult = await withRateLimit(request, config.rateLimit.endpoint, {
            maxRequests: config.rateLimit.maxRequests,
            windowMs: config.rateLimit.windowMs
          });

          if (!('success' in rateLimitResult)) {
            return rateLimitResult;
          }
        }

        // Get user context if available
        context.userId = await this.extractUserId(request);

        // Check cache first if caching is enabled
        if (config.enableCaching) {
          const cachedResponse = await this.checkCache(request, context);
          if (cachedResponse) {
            return this.createResponse(cachedResponse, true, startTime);
          }
        }

        // Execute the API handler
        const result = await handler(context, request);

        // Cache the response if caching is enabled
        if (config.enableCaching && result.data) {
          await this.cacheResponse(request, result.data, config.cacheTTL, context);
        }

        // Log performance metrics
        if (config.enablePerformanceMonitoring) {
          this.logPerformanceMetrics(context, result, request);
        }

        return this.createResponse(result, false, startTime);

      } catch (error) {
        logger.error('Portuguese API middleware error', error, {
          area: 'api_middleware',
          action: 'request_processing',
          requestId,
          culturalContext: context.culturalContext
        });

        return NextResponse.json(
          { error: 'Internal server error', requestId },
          { status: 500 }
        );
      }
    };
  }

  /**
   * Optimized business directory API handler
   */
  async getPortugueseBusinesses(
    context: ApiContext,
    filters: {
      userLocation?: { lat: number; lng: number };
      categories?: string[];
      radius?: number;
      searchText?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<OptimizedApiResponse> {
    const { userLocation, categories, radius = 10, limit = 20, offset = 0 } = filters;
    
    // Check cache first
    const cacheKey = this.buildBusinessCacheKey(filters);
    let businesses = await context.cacheManager.get(cacheKey, 'portuguese-businesses');

    if (!businesses) {
      // Use optimized PostGIS query
      if (userLocation) {
        const queryResult = await context.connectionPool.queryPortugueseBusinessesGeo(
          userLocation.lat,
          userLocation.lng,
          radius,
          categories
        );
        businesses = queryResult.rows;
      } else {
        // Use text-based search with Portuguese optimization
        const optimizedQuery = await context.queryOptimizer.optimizeQuery(
          `
          SELECT 
            b.*,
            ts_rank(to_tsvector('portuguese', b.name || ' ' || b.description), query) as relevance
          FROM portuguese_businesses b,
               plainto_tsquery('portuguese', $1) query
          WHERE 
            b.is_active = true
            AND ($2::text[] IS NULL OR b.business_type = ANY($2))
            AND (to_tsvector('portuguese', b.name || ' ' || b.description) @@ query OR $1 = '')
          ORDER BY 
            CASE WHEN $1 != '' THEN relevance ELSE 0 END DESC,
            b.community_favorite DESC,
            b.rating_average DESC NULLS LAST
          LIMIT $3 OFFSET $4
          `,
          [filters.searchText || '', categories, limit, offset],
          'business'
        );
        
        const queryResult = await context.connectionPool.query(
          optimizedQuery.optimizedQuery,
          [filters.searchText || '', categories, limit, offset]
        );
        businesses = queryResult.rows;
      }

      // Cache the results
      await context.cacheManager.cachePortugueseBusinesses(
        userLocation || { lat: 51.5074, lng: -0.1278 }, // Default to London
        businesses,
        radius
      );
    }

    return {
      data: {
        businesses: this.enhanceBusinessData(businesses),
        total: businesses.length,
        cached: !!businesses,
        filters
      },
      cached: !!businesses,
      executionTime: Date.now() - context.startTime,
      queryCount: 1,
      cacheHitRatio: context.cacheManager.getMetrics().hitRatio
    };
  }

  /**
   * Optimized Portuguese events API handler
   */
  async getPortugueseEvents(
    context: ApiContext,
    filters: {
      category?: string;
      region?: string;
      userLocation?: { lat: number; lng: number };
      dateFrom?: string;
      dateTo?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<OptimizedApiResponse> {
    const { category, region, userLocation, dateFrom, dateTo, limit = 20, offset = 0 } = filters;

    // Check cache first
    const cacheKey = this.buildEventsCacheKey(filters);
    let events = await context.cacheManager.get(cacheKey, 'portuguese-events');

    if (!events) {
      // Use optimized cultural events query
      const queryResult = await context.connectionPool.queryPortugueseCulturalEvents(
        context.userId,
        category ? [category] : undefined,
        userLocation ? { ...userLocation, radius: 25 } : undefined
      );
      
      let eventsData = queryResult.rows;

      // Apply additional filters
      if (region && region !== 'all') {
        eventsData = eventsData.filter(event => 
          event.portuguese_region && event.portuguese_region.includes(region)
        );
      }

      if (dateFrom) {
        eventsData = eventsData.filter(event => 
          new Date(event.event_date) >= new Date(dateFrom)
        );
      }

      if (dateTo) {
        eventsData = eventsData.filter(event => 
          new Date(event.event_date) <= new Date(dateTo)
        );
      }

      // Apply pagination
      events = eventsData.slice(offset, offset + limit);

      // Cache the results
      await context.cacheManager.cachePortugueseEvents(
        userLocation || { lat: 51.5074, lng: -0.1278 },
        events,
        filters
      );
    }

    return {
      data: {
        events: this.enhanceEventData(events),
        total: events.length,
        cached: !!events,
        filters
      },
      cached: !!events,
      executionTime: Date.now() - context.startTime,
      queryCount: 1,
      cacheHitRatio: context.cacheManager.getMetrics().hitRatio
    };
  }

  /**
   * Optimized cultural matching API handler
   */
  async getPortugueseCulturalMatches(
    context: ApiContext,
    userId: string,
    filters: {
      minCompatibility?: number;
      limit?: number;
      location?: { lat: number; lng: number; radius: number };
    } = {}
  ): Promise<OptimizedApiResponse> {
    const { minCompatibility = 0.7, limit = 20, location } = filters;

    // Check cache first
    const cacheKey = `matches_${userId}_${minCompatibility}_${limit}`;
    let matches = await context.cacheManager.get(cacheKey, 'cultural-matches');

    if (!matches) {
      // Use optimized cultural compatibility query
      const queryResult = await context.connectionPool.queryPortugueseCulturalMatching(
        userId,
        limit
      );
      
      matches = queryResult.rows;

      // Apply location filtering if specified
      if (location && matches.length > 0) {
        // This would require additional PostGIS query to filter by user locations
        // For now, we'll keep all matches
      }

      // Cache the results
      await context.cacheManager.cacheCulturalMatches(userId, matches);
    }

    return {
      data: {
        matches: this.enhanceMatchData(matches),
        total: matches.length,
        compatibility_threshold: minCompatibility,
        cached: !!matches
      },
      cached: !!matches,
      executionTime: Date.now() - context.startTime,
      queryCount: 1,
      cacheHitRatio: context.cacheManager.getMetrics().hitRatio
    };
  }

  /**
   * Cache invalidation for Portuguese content updates
   */
  async invalidatePortugueseCache(
    contentType: 'businesses' | 'events' | 'matches' | 'all',
    specificKeys?: string[]
  ): Promise<void> {
    const tags = this.getCacheTagsForContentType(contentType);
    await this.cacheManager.invalidateByTags(tags);

    if (specificKeys) {
      for (const key of specificKeys) {
        await this.cacheManager.delete(key);
      }
    }

    logger.info('Portuguese community cache invalidated', {
      contentType,
      tags,
      specificKeys: specificKeys?.length || 0
    });
  }

  /**
   * Get API performance metrics
   */
  async getPerformanceMetrics(): Promise<any> {
    const connectionMetrics = this.connectionPool.getMetrics();
    const cacheMetrics = this.cacheManager.getMetrics();
    const queryAnalysis = await this.queryOptimizer.analyzeQueryPerformance('day');

    return {
      connections: connectionMetrics,
      cache: cacheMetrics,
      queries: queryAnalysis,
      recommendations: this.generatePerformanceRecommendations(
        connectionMetrics,
        cacheMetrics,
        queryAnalysis
      )
    };
  }

  /**
   * Private helper methods
   */

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private detectPortugueseContext(request: NextRequest): 'portuguese' | 'general' {
    const url = request.url.toLowerCase();
    const hasPortugueseIndicators = 
      url.includes('portuguese') ||
      url.includes('cultural') ||
      url.includes('business-directory') ||
      url.includes('events') ||
      url.includes('matching');

    return hasPortugueseIndicators ? 'portuguese' : 'general';
  }

  private async extractUserId(request: NextRequest): Promise<string | undefined> {
    try {
      // This would integrate with your auth system
      // For now, return undefined
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  private async checkCache(request: NextRequest, context: ApiContext): Promise<any> {
    const cacheKey = this.buildRequestCacheKey(request);
    return await context.cacheManager.get(cacheKey, 'api-responses');
  }

  private async cacheResponse(
    request: NextRequest,
    data: any,
    ttl: number = 300,
    context: ApiContext
  ): Promise<void> {
    const cacheKey = this.buildRequestCacheKey(request);
    await context.cacheManager.set(cacheKey, data, 'api-responses', ttl);
  }

  private buildRequestCacheKey(request: NextRequest): string {
    const url = new URL(request.url);
    const path = url.pathname;
    const params = Array.from(url.searchParams.entries()).sort();
    const paramsString = params.map(([key, value]) => `${key}=${value}`).join('&');
    
    return `${path}?${paramsString}`;
  }

  private buildBusinessCacheKey(filters: any): string {
    const { userLocation, categories, radius, searchText, limit, offset } = filters;
    const locationKey = userLocation ? `${userLocation.lat}_${userLocation.lng}` : 'no_location';
    const categoriesKey = categories?.join('_') || 'all_categories';
    
    return `businesses_${locationKey}_${categoriesKey}_${radius}_${searchText || ''}_${limit}_${offset}`;
  }

  private buildEventsCacheKey(filters: any): string {
    const { category, region, userLocation, dateFrom, dateTo, limit, offset } = filters;
    const locationKey = userLocation ? `${userLocation.lat}_${userLocation.lng}` : 'no_location';
    
    return `events_${category || 'all'}_${region || 'all'}_${locationKey}_${dateFrom || ''}_${dateTo || ''}_${limit}_${offset}`;
  }

  private enhanceBusinessData(businesses: any[]): any[] {
    return businesses.map(business => ({
      ...business,
      cultural_heritage: this.determineCulturalHeritage(business.portuguese_origin),
      distance_display: business.distance_km ? `${business.distance_km.toFixed(1)}km` : null,
      languages_supported: business.languages_supported || ['portuguese'],
      community_verified: business.verified && business.community_favorite
    }));
  }

  private enhanceEventData(events: any[]): any[] {
    return events.map(event => ({
      ...event,
      spots_available: event.max_attendees ? event.max_attendees - event.current_attendees : null,
      is_fully_booked: event.max_attendees && event.current_attendees >= event.max_attendees,
      cultural_significance_level: this.assessCulturalSignificance(event.cultural_category),
      accessibility_score: this.calculateAccessibilityScore(event.accessibility_features || [])
    }));
  }

  private enhanceMatchData(matches: any[]): any[] {
    return matches.map(match => ({
      ...match,
      compatibility_level: this.getCompatibilityLevel(match.overall_compatibility),
      shared_interests: match.shared_elements || [],
      cultural_connection_strength: this.assessCulturalConnection(
        match.cultural_compatibility,
        match.language_compatibility
      )
    }));
  }

  private determineCulturalHeritage(origins: string[]): any {
    if (!origins || origins.length === 0) return { type: 'unknown', strength: 0 };

    const heritageMap = {
      portugal: { type: 'portuguese', strength: 1.0 },
      brazil: { type: 'brazilian', strength: 1.0 },
      angola: { type: 'angolan', strength: 0.9 },
      mozambique: { type: 'mozambican', strength: 0.9 },
      'cape-verde': { type: 'cape_verdean', strength: 0.9 },
      'guinea-bissau': { type: 'guinea_bissauan', strength: 0.8 },
      'sao-tome-principe': { type: 'sao_tomean', strength: 0.8 },
      'east-timor': { type: 'timorese', strength: 0.7 }
    };

    const primaryHeritage = origins[0];
    return heritageMap[primaryHeritage] || { type: 'lusophone', strength: 0.8 };
  }

  private assessCulturalSignificance(category: string): 'high' | 'medium' | 'low' {
    const highSignificance = ['fado', 'folklore', 'festival', 'literature'];
    const mediumSignificance = ['cuisine', 'language', 'arts', 'sports'];
    
    if (highSignificance.includes(category)) return 'high';
    if (mediumSignificance.includes(category)) return 'medium';
    return 'low';
  }

  private calculateAccessibilityScore(features: string[]): number {
    const totalPossible = 10;
    const accessibilityFeatures = [
      'wheelchair_accessible', 'hearing_loop', 'sign_language', 'large_print',
      'audio_description', 'braille', 'accessible_parking', 'accessible_transport',
      'step_free_access', 'accessible_toilets'
    ];
    
    const score = features.filter(feature => 
      accessibilityFeatures.includes(feature)
    ).length;
    
    return (score / totalPossible) * 100;
  }

  private getCompatibilityLevel(score: number): string {
    if (score >= 0.9) return 'excellent';
    if (score >= 0.8) return 'very_good';
    if (score >= 0.7) return 'good';
    if (score >= 0.6) return 'fair';
    return 'low';
  }

  private assessCulturalConnection(culturalScore: number, languageScore: number): string {
    const avgScore = (culturalScore + languageScore) / 2;
    
    if (avgScore >= 0.85) return 'very_strong';
    if (avgScore >= 0.7) return 'strong';
    if (avgScore >= 0.55) return 'moderate';
    return 'weak';
  }

  private getCacheTagsForContentType(contentType: string): string[] {
    const tagMap = {
      businesses: ['businesses', 'directory', 'portuguese'],
      events: ['events', 'cultural', 'portuguese'],
      matches: ['matching', 'cultural', 'portuguese'],
      all: ['events', 'businesses', 'matching', 'cultural', 'portuguese']
    };

    return tagMap[contentType] || [];
  }

  private logPerformanceMetrics(
    context: ApiContext,
    result: OptimizedApiResponse,
    request: NextRequest
  ): void {
    const executionTime = Date.now() - context.startTime;
    
    logger.info('Portuguese API performance metrics', {
      requestId: context.requestId,
      endpoint: new URL(request.url).pathname,
      executionTime,
      cached: result.cached,
      queryCount: result.queryCount,
      cacheHitRatio: result.cacheHitRatio,
      culturalContext: context.culturalContext,
      userId: context.userId
    });
  }

  private createResponse(
    result: OptimizedApiResponse,
    cached: boolean,
    startTime: number
  ): NextResponse {
    const response = NextResponse.json(result.data);
    
    // Add performance headers
    response.headers.set('X-Execution-Time', `${Date.now() - startTime}ms`);
    response.headers.set('X-Cached', cached.toString());
    response.headers.set('X-Cache-Hit-Ratio', result.cacheHitRatio?.toString() || '0');
    response.headers.set('X-Cultural-Context', 'portuguese-community');
    
    return response;
  }

  private generatePerformanceRecommendations(
    connectionMetrics: any,
    cacheMetrics: any,
    queryAnalysis: any
  ): string[] {
    const recommendations: string[] = [];

    if (connectionMetrics.activeConnections / connectionMetrics.totalConnections > 0.8) {
      recommendations.push('Consider increasing database connection pool size during Portuguese community peak hours');
    }

    if (cacheMetrics.hitRatio < 0.7) {
      recommendations.push('Low cache hit ratio - review caching strategies for Portuguese content');
    }

    if (queryAnalysis.averageExecutionTime > 200) {
      recommendations.push('High average query execution time - optimize Portuguese cultural queries');
    }

    if (queryAnalysis.slowQueries > queryAnalysis.totalQueries * 0.1) {
      recommendations.push('High percentage of slow queries - review database indexes for Portuguese content');
    }

    return recommendations;
  }
}

// Singleton instance
let apiMiddleware: PortugueseApiMiddleware | null = null;

/**
 * Get the Portuguese API middleware instance
 */
export function getPortugueseApiMiddleware(): PortugueseApiMiddleware {
  if (!apiMiddleware) {
    apiMiddleware = new PortugueseApiMiddleware();
  }
  return apiMiddleware;
}

export default PortugueseApiMiddleware;