/**
 * Performance Monitoring Dashboard for LusoTown Portuguese-speaking Community Platform
 * 
 * Comprehensive performance monitoring and alerting system with real-time dashboards:
 * - Database performance tracking for Portuguese cultural content
 * - API response time monitoring for community features
 * - Cache hit ratio tracking for frequently accessed Portuguese data
 * - Real-time alerts for performance degradation
 * - Automated optimization recommendations
 */

import { getPortugueseConnectionPool } from './database-connection-pool';
import { getPortugueseCacheManager } from './redis-cache-manager';
import { getPortugueseQueryOptimizer } from './query-optimizer';
import { performanceMonitor } from './monitoring/index';
import logger from '@/utils/logger';

interface PerformanceDashboard {
  timestamp: Date;
  database: DatabaseMetrics;
  cache: CacheMetrics;
  api: ApiMetrics;
  system: SystemMetrics;
  alerts: PerformanceAlert[];
  recommendations: OptimizationRecommendation[];
  healthScore: number;
}

interface DatabaseMetrics {
  connectionPool: {
    total: number;
    active: number;
    idle: number;
    waiting: number;
  };
  queryPerformance: {
    averageResponseTime: number;
    slowQueries: number;
    totalQueries: number;
    portugueseContentQueries: number;
    businessDirectoryQueries: number;
  };
  indexUtilization: {
    culturalEventsIndexHits: number;
    businessGeoIndexHits: number;
    compatibilityIndexHits: number;
  };
}

interface CacheMetrics {
  hitRatio: number;
  totalHits: number;
  totalMisses: number;
  memoryUsage: number;
  keyCount: number;
  averageResponseTime: number;
  portugueseContentCacheHits: number;
}

interface ApiMetrics {
  averageResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  slowEndpoints: EndpointMetric[];
  portugueseFeatureUsage: number;
  mobileUsageRate: number;
  bilingualUsageRate: number;
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
}

interface PerformanceAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'database' | 'cache' | 'api' | 'system';
  message: string;
  metric: string;
  threshold: number;
  currentValue: number;
  timestamp: Date;
  portugueseImpact: string;
  autoResolve: boolean;
}

interface OptimizationRecommendation {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'database' | 'cache' | 'api' | 'infrastructure';
  title: string;
  description: string;
  estimatedImpact: string;
  implementationEffort: 'low' | 'medium' | 'high';
  portugueseFeatureAffected: string[];
  sqlQueries?: string[];
  codeChanges?: string[];
}

interface EndpointMetric {
  endpoint: string;
  averageResponseTime: number;
  requestCount: number;
  errorCount: number;
  slowRequestsCount: number;
  portugueseFeature: boolean;
}

export class PortuguesePerformanceMonitoringDashboard {
  private connectionPool: any;
  private cacheManager: any;
  private queryOptimizer: any;
  private alerts: Map<string, PerformanceAlert> = new Map();
  private metricsHistory: PerformanceDashboard[] = [];
  private monitoringInterval: NodeJS.Timeout | null = null;
  
  // Performance thresholds for Portuguese community
  private thresholds = {
    database: {
      maxQueryTime: 200, // ms
      maxConnectionUtilization: 0.8, // 80%
      slowQueryThreshold: 500, // ms
    },
    cache: {
      minHitRatio: 0.8, // 80%
      maxResponseTime: 50, // ms
      maxMemoryUsage: 0.9, // 90%
    },
    api: {
      maxResponseTime: 1000, // ms
      maxErrorRate: 0.05, // 5%
      minThroughput: 100, // requests/min
    },
    system: {
      maxCpuUsage: 0.8, // 80%
      maxMemoryUsage: 0.85, // 85%
      maxDiskUsage: 0.9, // 90%
    }
  };

  constructor() {
    this.connectionPool = getPortugueseConnectionPool();
    this.cacheManager = getPortugueseCacheManager();
    this.queryOptimizer = getPortugueseQueryOptimizer();
  }

  /**
   * Start real-time performance monitoring
   */
  startMonitoring(intervalMs: number = 60000): void {
    logger.info('Starting Portuguese community performance monitoring', { interval: intervalMs });
    
    this.monitoringInterval = setInterval(async () => {
      try {
        const dashboard = await this.collectMetrics();
        this.processAlerts(dashboard);
        this.storeMetrics(dashboard);
        
        // Log health score
        logger.info('Portuguese community performance health score', {
          healthScore: dashboard.healthScore,
          alerts: dashboard.alerts.length,
          recommendations: dashboard.recommendations.length
        });
        
      } catch (error) {
        logger.error('Performance monitoring error', error, {
          area: 'monitoring',
          action: 'collect_metrics'
        });
      }
    }, intervalMs);
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      logger.info('Portuguese community performance monitoring stopped');
    }
  }

  /**
   * Get current performance dashboard
   */
  async getCurrentDashboard(): Promise<PerformanceDashboard> {
    return await this.collectMetrics();
  }

  /**
   * Get performance history for Portuguese community analysis
   */
  getPerformanceHistory(hours: number = 24): PerformanceDashboard[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.metricsHistory.filter(metric => metric.timestamp >= cutoffTime);
  }

  /**
   * Get active alerts for Portuguese community features
   */
  getActiveAlerts(): PerformanceAlert[] {
    return Array.from(this.alerts.values()).filter(alert => !alert.autoResolve);
  }

  /**
   * Get Portuguese-specific performance insights
   */
  async getPortuguesePerformanceInsights(): Promise<any> {
    const dashboard = await this.getCurrentDashboard();
    const history = this.getPerformanceHistory(168); // 1 week
    
    return {
      current: dashboard,
      trends: this.analyzePerformanceTrends(history),
      portugueseSpecific: {
        culturalContentPerformance: this.analyzeCulturalContentPerformance(dashboard),
        businessDirectoryPerformance: this.analyzeBusinessDirectoryPerformance(dashboard),
        geoLocationQueryPerformance: this.analyzeGeoLocationPerformance(dashboard),
        bilingualFeatureUsage: dashboard.api.bilingualUsageRate,
        mobileOptimization: dashboard.api.mobileUsageRate
      },
      optimization: {
        immediateActions: dashboard.recommendations.filter(r => r.priority === 'critical'),
        plannedImprovements: dashboard.recommendations.filter(r => r.priority === 'high'),
        longTermOptimizations: dashboard.recommendations.filter(r => r.priority === 'medium')
      }
    };
  }

  /**
   * Collect comprehensive performance metrics
   */
  private async collectMetrics(): Promise<PerformanceDashboard> {
    const [
      databaseMetrics,
      cacheMetrics,
      apiMetrics,
      systemMetrics
    ] = await Promise.all([
      this.collectDatabaseMetrics(),
      this.collectCacheMetrics(),
      this.collectApiMetrics(),
      this.collectSystemMetrics()
    ]);

    const alerts = this.generateAlerts(databaseMetrics, cacheMetrics, apiMetrics, systemMetrics);
    const recommendations = await this.generateRecommendations(databaseMetrics, cacheMetrics, apiMetrics);
    const healthScore = this.calculateHealthScore(databaseMetrics, cacheMetrics, apiMetrics, systemMetrics);

    return {
      timestamp: new Date(),
      database: databaseMetrics,
      cache: cacheMetrics,
      api: apiMetrics,
      system: systemMetrics,
      alerts,
      recommendations,
      healthScore
    };
  }

  /**
   * Collect database performance metrics
   */
  private async collectDatabaseMetrics(): Promise<DatabaseMetrics> {
    const poolMetrics = this.connectionPool.getMetrics();
    
    return {
      connectionPool: {
        total: poolMetrics.totalConnections,
        active: poolMetrics.activeConnections,
        idle: poolMetrics.idleConnections,
        waiting: poolMetrics.waitingClients
      },
      queryPerformance: {
        averageResponseTime: poolMetrics.averageQueryTime,
        slowQueries: poolMetrics.slowQueries,
        totalQueries: poolMetrics.totalQueries,
        portugueseContentQueries: poolMetrics.portugueseContentQueries,
        businessDirectoryQueries: poolMetrics.businessDirectoryQueries
      },
      indexUtilization: {
        culturalEventsIndexHits: await this.getIndexHitRate('idx_portuguese_events_active_date_category'),
        businessGeoIndexHits: await this.getIndexHitRate('idx_portuguese_businesses_spatial_type'),
        compatibilityIndexHits: await this.getIndexHitRate('idx_cultural_compatibility_optimized')
      }
    };
  }

  /**
   * Collect cache performance metrics
   */
  private async collectCacheMetrics(): Promise<CacheMetrics> {
    const metrics = this.cacheManager.getMetrics();
    const detailedStats = await this.cacheManager.getDetailedStats();
    
    return {
      hitRatio: metrics.hitRatio,
      totalHits: metrics.hits,
      totalMisses: metrics.misses,
      memoryUsage: detailedStats.memoryInfo?.used_memory || 0,
      keyCount: detailedStats.dbSize || 0,
      averageResponseTime: metrics.averageResponseTime,
      portugueseContentCacheHits: await this.getPortugueseCacheHits()
    };
  }

  /**
   * Collect API performance metrics
   */
  private async collectApiMetrics(): Promise<ApiMetrics> {
    const portugalMetrics = performanceMonitor.getPortugueseMetrics();
    const slowEndpoints = await this.getSlowEndpoints();
    
    return {
      averageResponseTime: portugalMetrics.avg_response_time,
      requestsPerSecond: this.calculateRequestsPerSecond(),
      errorRate: portugalMetrics.error_rate / 100, // Convert percentage to decimal
      slowEndpoints,
      portugueseFeatureUsage: this.calculatePortugueseFeatureUsage(),
      mobileUsageRate: portugalMetrics.mobile_usage_rate / 100,
      bilingualUsageRate: portugalMetrics.bilingual_feature_usage / 100
    };
  }

  /**
   * Collect system performance metrics
   */
  private async collectSystemMetrics(): Promise<SystemMetrics> {
    // In production, these would come from actual system monitoring
    return {
      cpuUsage: await this.getCpuUsage(),
      memoryUsage: await this.getMemoryUsage(),
      diskUsage: await this.getDiskUsage(),
      networkLatency: await this.getNetworkLatency()
    };
  }

  /**
   * Generate performance alerts for Portuguese community
   */
  private generateAlerts(
    database: DatabaseMetrics,
    cache: CacheMetrics,
    api: ApiMetrics,
    system: SystemMetrics
  ): PerformanceAlert[] {
    const alerts: PerformanceAlert[] = [];

    // Database alerts
    if (database.queryPerformance.averageResponseTime > this.thresholds.database.maxQueryTime) {
      alerts.push({
        id: `db_slow_queries_${Date.now()}`,
        severity: 'high',
        type: 'database',
        message: `Portuguese community database queries are slow (${database.queryPerformance.averageResponseTime}ms average)`,
        metric: 'average_query_time',
        threshold: this.thresholds.database.maxQueryTime,
        currentValue: database.queryPerformance.averageResponseTime,
        timestamp: new Date(),
        portugueseImpact: 'Portuguese cultural content and business directory searches may be slow',
        autoResolve: false
      });
    }

    const connectionUtilization = database.connectionPool.active / database.connectionPool.total;
    if (connectionUtilization > this.thresholds.database.maxConnectionUtilization) {
      alerts.push({
        id: `db_connection_high_${Date.now()}`,
        severity: 'medium',
        type: 'database',
        message: `Portuguese community database connection pool utilization is high (${Math.round(connectionUtilization * 100)}%)`,
        metric: 'connection_pool_utilization',
        threshold: this.thresholds.database.maxConnectionUtilization,
        currentValue: connectionUtilization,
        timestamp: new Date(),
        portugueseImpact: 'New Portuguese community users may experience connection delays',
        autoResolve: true
      });
    }

    // Cache alerts
    if (cache.hitRatio < this.thresholds.cache.minHitRatio) {
      alerts.push({
        id: `cache_low_hit_${Date.now()}`,
        severity: 'medium',
        type: 'cache',
        message: `Portuguese community cache hit ratio is low (${Math.round(cache.hitRatio * 100)}%)`,
        metric: 'cache_hit_ratio',
        threshold: this.thresholds.cache.minHitRatio,
        currentValue: cache.hitRatio,
        timestamp: new Date(),
        portugueseImpact: 'Portuguese events and business data will load slower',
        autoResolve: true
      });
    }

    // API alerts
    if (api.averageResponseTime > this.thresholds.api.maxResponseTime) {
      alerts.push({
        id: `api_slow_${Date.now()}`,
        severity: 'high',
        type: 'api',
        message: `Portuguese community API responses are slow (${api.averageResponseTime}ms average)`,
        metric: 'api_response_time',
        threshold: this.thresholds.api.maxResponseTime,
        currentValue: api.averageResponseTime,
        timestamp: new Date(),
        portugueseImpact: 'Portuguese community features will respond slowly to user actions',
        autoResolve: false
      });
    }

    if (api.errorRate > this.thresholds.api.maxErrorRate) {
      alerts.push({
        id: `api_errors_${Date.now()}`,
        severity: 'critical',
        type: 'api',
        message: `Portuguese community API error rate is high (${Math.round(api.errorRate * 100)}%)`,
        metric: 'api_error_rate',
        threshold: this.thresholds.api.maxErrorRate,
        currentValue: api.errorRate,
        timestamp: new Date(),
        portugueseImpact: 'Portuguese community users are experiencing failures',
        autoResolve: false
      });
    }

    return alerts;
  }

  /**
   * Generate optimization recommendations
   */
  private async generateRecommendations(
    database: DatabaseMetrics,
    cache: CacheMetrics,
    api: ApiMetrics
  ): Promise<OptimizationRecommendation[]> {
    const recommendations: OptimizationRecommendation[] = [];

    // Database optimization recommendations
    if (database.queryPerformance.slowQueries > database.queryPerformance.totalQueries * 0.1) {
      recommendations.push({
        id: 'optimize_slow_queries',
        priority: 'high',
        category: 'database',
        title: 'Optimize Slow Portuguese Community Queries',
        description: 'High percentage of slow queries detected in Portuguese cultural content and business directory searches',
        estimatedImpact: '40-60% improvement in query response times',
        implementationEffort: 'medium',
        portugueseFeatureAffected: ['Cultural Events', 'Business Directory', 'Cultural Matching'],
        sqlQueries: await this.getSlowQueryOptimizations(),
        codeChanges: [
          'Add database indexes for Portuguese cultural content queries',
          'Implement query result caching for frequent Portuguese business searches',
          'Optimize PostGIS geolocation queries for UK Portuguese businesses'
        ]
      });
    }

    // Cache optimization recommendations
    if (cache.hitRatio < 0.8) {
      recommendations.push({
        id: 'improve_cache_strategy',
        priority: 'medium',
        category: 'cache',
        title: 'Improve Portuguese Content Caching Strategy',
        description: 'Low cache hit ratio indicates Portuguese community content is not being cached effectively',
        estimatedImpact: '30-50% improvement in page load times',
        implementationEffort: 'low',
        portugueseFeatureAffected: ['Events Discovery', 'Business Directory', 'User Profiles'],
        codeChanges: [
          'Implement cache warming for popular Portuguese events',
          'Add geolocation-based caching for Portuguese businesses',
          'Cache cultural compatibility results for faster matching'
        ]
      });
    }

    // API optimization recommendations
    const slowEndpointCount = api.slowEndpoints.filter(e => e.averageResponseTime > 500).length;
    if (slowEndpointCount > 0) {
      recommendations.push({
        id: 'optimize_api_endpoints',
        priority: 'high',
        category: 'api',
        title: 'Optimize Slow Portuguese Community API Endpoints',
        description: `${slowEndpointCount} API endpoints serving Portuguese community features are responding slowly`,
        estimatedImpact: '50-70% improvement in API response times',
        implementationEffort: 'medium',
        portugueseFeatureAffected: this.getAffectedFeatures(api.slowEndpoints),
        codeChanges: [
          'Implement pagination for large Portuguese event listings',
          'Add response compression for Portuguese business data',
          'Optimize JSON serialization for cultural compatibility results'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Calculate overall health score for Portuguese community platform
   */
  private calculateHealthScore(
    database: DatabaseMetrics,
    cache: CacheMetrics,
    api: ApiMetrics,
    system: SystemMetrics
  ): number {
    let score = 100;

    // Database health (40% of total score)
    const dbUtilization = database.connectionPool.active / database.connectionPool.total;
    if (database.queryPerformance.averageResponseTime > 200) score -= 15;
    if (dbUtilization > 0.8) score -= 10;
    if (database.queryPerformance.slowQueries > database.queryPerformance.totalQueries * 0.1) score -= 15;

    // Cache health (25% of total score)
    if (cache.hitRatio < 0.8) score -= 10;
    if (cache.averageResponseTime > 50) score -= 5;
    if (cache.memoryUsage > 0.9) score -= 10;

    // API health (25% of total score)
    if (api.averageResponseTime > 500) score -= 15;
    if (api.errorRate > 0.05) score -= 10;

    // System health (10% of total score)
    if (system.cpuUsage > 0.8) score -= 5;
    if (system.memoryUsage > 0.85) score -= 5;

    return Math.max(0, score);
  }

  /**
   * Process and manage alerts
   */
  private processAlerts(dashboard: PerformanceDashboard): void {
    // Remove resolved auto-resolve alerts
    for (const [alertId, alert] of this.alerts.entries()) {
      if (alert.autoResolve) {
        const isResolved = this.checkAlertResolution(alert, dashboard);
        if (isResolved) {
          this.alerts.delete(alertId);
          logger.info('Portuguese community performance alert auto-resolved', { alertId, alert: alert.message });
        }
      }
    }

    // Add new alerts
    for (const newAlert of dashboard.alerts) {
      this.alerts.set(newAlert.id, newAlert);
      
      if (newAlert.severity === 'critical' || newAlert.severity === 'high') {
        logger.warn('Portuguese community performance alert triggered', newAlert);
        
        // In production, send notifications here
        this.sendPerformanceAlert(newAlert);
      }
    }
  }

  /**
   * Store metrics history for trend analysis
   */
  private storeMetrics(dashboard: PerformanceDashboard): void {
    this.metricsHistory.push(dashboard);
    
    // Keep only last 7 days of metrics (assuming 1-minute intervals)
    const maxMetrics = 7 * 24 * 60;
    if (this.metricsHistory.length > maxMetrics) {
      this.metricsHistory.splice(0, this.metricsHistory.length - maxMetrics);
    }
  }

  /**
   * Helper methods for metrics collection
   */

  private async getIndexHitRate(indexName: string): Promise<number> {
    try {
      const result = await this.connectionPool.query(`
        SELECT 
          idx_scan as hits,
          idx_tup_read as reads
        FROM pg_stat_user_indexes 
        WHERE indexrelname = $1
      `, [indexName]);
      
      if (result.rows.length > 0) {
        const { hits, reads } = result.rows[0];
        return reads > 0 ? hits / reads : 0;
      }
    } catch (error) {
      logger.error('Failed to get index hit rate', error);
    }
    return 0;
  }

  private async getPortugueseCacheHits(): Promise<number> {
    try {
      const stats = await this.cacheManager.getDetailedStats();
      return stats.metrics?.hits || 0;
    } catch (error) {
      return 0;
    }
  }

  private calculateRequestsPerSecond(): number {
    // This would be calculated from actual request logs in production
    return Math.floor(Math.random() * 50) + 20; // Mock data
  }

  private calculatePortugueseFeatureUsage(): number {
    // Calculate percentage of requests to Portuguese-specific endpoints
    return Math.floor(Math.random() * 30) + 60; // Mock: 60-90%
  }

  private async getSlowEndpoints(): Promise<EndpointMetric[]> {
    // In production, this would analyze actual request logs
    return [
      {
        endpoint: '/api/business-directory/search',
        averageResponseTime: 750,
        requestCount: 245,
        errorCount: 3,
        slowRequestsCount: 45,
        portugueseFeature: true
      },
      {
        endpoint: '/api/events/cultural',
        averageResponseTime: 420,
        requestCount: 189,
        errorCount: 1,
        slowRequestsCount: 23,
        portugueseFeature: true
      }
    ];
  }

  private async getCpuUsage(): Promise<number> {
    return Math.random() * 0.3 + 0.2; // Mock: 20-50%
  }

  private async getMemoryUsage(): Promise<number> {
    return Math.random() * 0.3 + 0.4; // Mock: 40-70%
  }

  private async getDiskUsage(): Promise<number> {
    return Math.random() * 0.2 + 0.3; // Mock: 30-50%
  }

  private async getNetworkLatency(): Promise<number> {
    return Math.random() * 20 + 10; // Mock: 10-30ms
  }

  private async getSlowQueryOptimizations(): Promise<string[]> {
    return [
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_optimized 
       ON portuguese_cultural_events (is_active, event_date, cultural_category) 
       WHERE is_active = true AND event_date >= CURRENT_DATE`,
      
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_geo_optimized 
       ON portuguese_businesses USING GIST(coordinates) 
       INCLUDE (business_type, rating_average) 
       WHERE is_active = true`,
       
      `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_performance 
       ON cultural_compatibility (user_a_id, overall_compatibility DESC, updated_at DESC) 
       WHERE overall_compatibility >= 0.7`
    ];
  }

  private getAffectedFeatures(slowEndpoints: EndpointMetric[]): string[] {
    const features = new Set<string>();
    
    slowEndpoints.forEach(endpoint => {
      if (endpoint.endpoint.includes('business-directory')) features.add('Business Directory');
      if (endpoint.endpoint.includes('events')) features.add('Cultural Events');
      if (endpoint.endpoint.includes('cultural')) features.add('Cultural Matching');
      if (endpoint.endpoint.includes('transport')) features.add('Transport Services');
      if (endpoint.endpoint.includes('streaming')) features.add('Streaming Platform');
    });
    
    return Array.from(features);
  }

  private checkAlertResolution(alert: PerformanceAlert, dashboard: PerformanceDashboard): boolean {
    switch (alert.type) {
      case 'database':
        if (alert.metric === 'connection_pool_utilization') {
          const utilization = dashboard.database.connectionPool.active / dashboard.database.connectionPool.total;
          return utilization <= alert.threshold;
        }
        break;
      case 'cache':
        if (alert.metric === 'cache_hit_ratio') {
          return dashboard.cache.hitRatio >= alert.threshold;
        }
        break;
    }
    return false;
  }

  private sendPerformanceAlert(alert: PerformanceAlert): void {
    // In production, integrate with notification systems (Slack, email, SMS)
    logger.warn('PERFORMANCE ALERT: Portuguese Community Platform', {
      severity: alert.severity,
      message: alert.message,
      portugueseImpact: alert.portugueseImpact,
      currentValue: alert.currentValue,
      threshold: alert.threshold
    });
  }

  private analyzePerformanceTrends(history: PerformanceDashboard[]): any {
    if (history.length < 2) return null;

    const latest = history[history.length - 1];
    const previous = history[history.length - 2];

    return {
      healthScore: {
        current: latest.healthScore,
        trend: latest.healthScore - previous.healthScore,
        direction: latest.healthScore > previous.healthScore ? 'improving' : 'declining'
      },
      database: {
        queryTime: {
          current: latest.database.queryPerformance.averageResponseTime,
          trend: latest.database.queryPerformance.averageResponseTime - previous.database.queryPerformance.averageResponseTime,
        }
      },
      cache: {
        hitRatio: {
          current: latest.cache.hitRatio,
          trend: latest.cache.hitRatio - previous.cache.hitRatio,
        }
      }
    };
  }

  private analyzeCulturalContentPerformance(dashboard: PerformanceDashboard): any {
    return {
      queryPerformance: dashboard.database.queryPerformance.portugueseContentQueries,
      cacheEffectiveness: dashboard.cache.portugueseContentCacheHits / dashboard.cache.totalHits,
      apiResponseTime: dashboard.api.slowEndpoints
        .filter(e => e.portugueseFeature && e.endpoint.includes('cultural'))
        .map(e => e.averageResponseTime)[0] || 0
    };
  }

  private analyzeBusinessDirectoryPerformance(dashboard: PerformanceDashboard): any {
    return {
      geoQueryPerformance: dashboard.database.queryPerformance.businessDirectoryQueries,
      spatialIndexEfficiency: dashboard.database.indexUtilization.businessGeoIndexHits,
      apiResponseTime: dashboard.api.slowEndpoints
        .filter(e => e.portugueseFeature && e.endpoint.includes('business'))
        .map(e => e.averageResponseTime)[0] || 0
    };
  }

  private analyzeGeoLocationPerformance(dashboard: PerformanceDashboard): any {
    return {
      spatialQueryEfficiency: dashboard.database.indexUtilization.businessGeoIndexHits,
      averageResponseTime: dashboard.api.slowEndpoints
        .filter(e => e.endpoint.includes('geo') || e.endpoint.includes('location'))
        .reduce((sum, e) => sum + e.averageResponseTime, 0) / 
        dashboard.api.slowEndpoints.filter(e => e.endpoint.includes('geo') || e.endpoint.includes('location')).length || 0
    };
  }
}

// Singleton instance
let performanceDashboard: PortuguesePerformanceMonitoringDashboard | null = null;

/**
 * Get or create the Portuguese performance monitoring dashboard
 */
export function getPortuguesePerformanceDashboard(): PortuguesePerformanceMonitoringDashboard {
  if (!performanceDashboard) {
    performanceDashboard = new PortuguesePerformanceMonitoringDashboard();
  }
  
  return performanceDashboard;
}

/**
 * Initialize and start Portuguese community performance monitoring
 */
export function initializePortuguesePerformanceMonitoring(intervalMs: number = 60000): PortuguesePerformanceMonitoringDashboard {
  const dashboard = getPortuguesePerformanceDashboard();
  dashboard.startMonitoring(intervalMs);
  
  logger.info('Portuguese community performance monitoring initialized', { interval: intervalMs });
  return dashboard;
}

export default PortuguesePerformanceMonitoringDashboard;