/**
 * Performance Monitoring API for LusoTown Portuguese-speaking Community Platform
 * 
 * Provides comprehensive performance metrics including:
 * - Database connection pool statistics
 * - Redis cache performance metrics
 * - API response time analytics
 * - Portuguese community specific performance indicators
 * - Real-time system health monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPortugueseConnectionPool } from '@/lib/database-connection-pool';
import { getPortugueseCacheManager } from '@/lib/redis-cache-manager';
import { getOptimizedSupabaseClient } from '@/lib/database-cache-optimization';

interface PerformanceMetrics {
  timestamp: string;
  system: {
    uptime: number;
    memoryUsage: {
      used: number;
      total: number;
      percentage: number;
    };
    cpuUsage: number;
    nodeVersion: string;
    environment: string;
  };
  database: {
    connectionPool: any;
    queryPerformance: any;
    slowQueries: number;
    activeConnections: number;
    connectionUtilization: number;
  };
  cache: {
    redis: any;
    hitRatio: number;
    memoryUsage: number;
    operationsPerSecond: number;
    averageResponseTime: number;
  };
  apiPerformance: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    slowEndpoints: string[];
    portugueseContentRequests: number;
  };
  portugueseCommunity: {
    activeUsers: number;
    culturalEvents: number;
    businessDirectoryQueries: number;
    matchingSystemPerformance: number;
    geoLocationQueries: number;
  };
  recommendations: string[];
  alerts: string[];
  status: 'healthy' | 'degraded' | 'critical';
}

// Performance tracking storage
const performanceStore = {
  requestCounts: new Map<string, number>(),
  responseTimes: new Map<string, number[]>(),
  errorCounts: new Map<string, number>(),
  startTime: Date.now(),
  
  // Portuguese community specific metrics
  culturalContentRequests: 0,
  businessDirectoryRequests: 0,
  matchingRequests: 0,
  geoLocationRequests: 0
};

/**
 * GET - Comprehensive performance metrics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  
  try {
    const metrics = await collectPerformanceMetrics();
    const recommendations = generateRecommendations(metrics);
    const alerts = generateAlerts(metrics);
    const status = determineSystemStatus(metrics);

    const performanceData: PerformanceMetrics = {
      timestamp: new Date().toISOString(),
      ...metrics,
      recommendations,
      alerts,
      status
    };

    // Record this API request performance
    recordApiRequest('/api/monitoring/performance', Date.now() - startTime, false);

    return NextResponse.json(performanceData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Response-Time': `${Date.now() - startTime}ms`
      }
    });

  } catch (error) {
    console.error('Performance monitoring error:', error);
    
    // Record error for this endpoint
    recordApiRequest('/api/monitoring/performance', Date.now() - startTime, true);

    return NextResponse.json({
      error: 'Failed to collect performance metrics',
      timestamp: new Date().toISOString(),
      status: 'critical'
    }, { status: 500 });
  }
}

/**
 * POST - Record performance metrics from client or other services
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const metricsData = await request.json();
    
    // Process and store client-side performance metrics
    if (metricsData.endpoint && metricsData.responseTime !== undefined) {
      recordApiRequest(
        metricsData.endpoint,
        metricsData.responseTime,
        metricsData.error || false
      );
      
      // Track Portuguese community specific requests
      if (metricsData.portugueseContent) {
        performanceStore.culturalContentRequests++;
      }
      
      if (metricsData.businessDirectory) {
        performanceStore.businessDirectoryRequests++;
      }
      
      if (metricsData.matching) {
        performanceStore.matchingRequests++;
      }
      
      if (metricsData.geoLocation) {
        performanceStore.geoLocationRequests++;
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Performance metrics recording error:', error);
    return NextResponse.json(
      { error: 'Failed to record performance metrics' },
      { status: 400 }
    );
  }
}

/**
 * Collect comprehensive performance metrics
 */
async function collectPerformanceMetrics(): Promise<Omit<PerformanceMetrics, 'timestamp' | 'recommendations' | 'alerts' | 'status'>> {
  const [
    systemMetrics,
    databaseMetrics,
    cacheMetrics,
    apiMetrics,
    communityMetrics
  ] = await Promise.all([
    getSystemMetrics(),
    getDatabaseMetrics(),
    getCacheMetrics(),
    getApiPerformanceMetrics(),
    getPortugueseCommunityMetrics()
  ]);

  return {
    system: systemMetrics,
    database: databaseMetrics,
    cache: cacheMetrics,
    apiPerformance: apiMetrics,
    portugueseCommunity: communityMetrics
  };
}

/**
 * Get system-level performance metrics
 */
async function getSystemMetrics(): Promise<any> {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();

  return {
    uptime: uptime,
    memoryUsage: {
      used: memoryUsage.heapUsed,
      total: memoryUsage.heapTotal,
      percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100)
    },
    cpuUsage: await getCpuUsage(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development'
  };
}

/**
 * Get database performance metrics
 */
async function getDatabaseMetrics(): Promise<any> {
  try {
    const connectionPool = getPortugueseConnectionPool();
    const poolMetrics = connectionPool.getMetrics();
    const insights = connectionPool.getPerformanceInsights();

    return {
      connectionPool: poolMetrics,
      queryPerformance: {
        averageQueryTime: poolMetrics.averageQueryTime,
        slowQueries: poolMetrics.slowQueries,
        totalQueries: poolMetrics.totalQueries,
        errorCount: poolMetrics.errorCount
      },
      slowQueries: poolMetrics.slowQueries,
      activeConnections: poolMetrics.activeConnections,
      connectionUtilization: poolMetrics.totalConnections > 0 
        ? (poolMetrics.activeConnections / poolMetrics.totalConnections) * 100 
        : 0,
      insights: insights
    };
  } catch (error) {
    console.error('Failed to get database metrics:', error);
    return {
      connectionPool: null,
      queryPerformance: null,
      error: 'Database metrics unavailable'
    };
  }
}

/**
 * Get cache performance metrics
 */
async function getCacheMetrics(): Promise<any> {
  try {
    const cacheManager = getPortugueseCacheManager();
    const cacheStats = await cacheManager.getDetailedStats();
    const metrics = cacheManager.getMetrics();

    return {
      redis: cacheStats,
      hitRatio: metrics.hitRatio * 100, // Convert to percentage
      memoryUsage: cacheStats.memoryInfo?.used_memory || 0,
      operationsPerSecond: calculateOperationsPerSecond(metrics),
      averageResponseTime: metrics.averageResponseTime,
      connected: cacheStats.connected
    };
  } catch (error) {
    console.error('Failed to get cache metrics:', error);
    return {
      redis: null,
      hitRatio: 0,
      memoryUsage: 0,
      operationsPerSecond: 0,
      averageResponseTime: 0,
      connected: false,
      error: 'Cache metrics unavailable'
    };
  }
}

/**
 * Get API performance metrics
 */
async function getApiPerformanceMetrics(): Promise<any> {
  const totalRequests = Array.from(performanceStore.requestCounts.values())
    .reduce((sum, count) => sum + count, 0);
  
  const totalErrors = Array.from(performanceStore.errorCounts.values())
    .reduce((sum, count) => sum + count, 0);
  
  const allResponseTimes = Array.from(performanceStore.responseTimes.values())
    .flat();
  
  const averageResponseTime = allResponseTimes.length > 0
    ? allResponseTimes.reduce((sum, time) => sum + time, 0) / allResponseTimes.length
    : 0;
  
  const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
  
  // Find slow endpoints (>1000ms average)
  const slowEndpoints: string[] = [];
  for (const [endpoint, times] of performanceStore.responseTimes.entries()) {
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    if (avgTime > 1000) {
      slowEndpoints.push(`${endpoint} (${Math.round(avgTime)}ms)`);
    }
  }

  return {
    totalRequests,
    averageResponseTime: Math.round(averageResponseTime),
    errorRate: Math.round(errorRate * 100) / 100,
    slowEndpoints,
    portugueseContentRequests: performanceStore.culturalContentRequests
  };
}

/**
 * Get Portuguese community specific metrics
 */
async function getPortugueseCommunityMetrics(): Promise<any> {
  try {
    // In a real implementation, these would query the database
    // For now, we'll use the tracked request counts
    
    return {
      activeUsers: 0, // Would be calculated from active sessions
      culturalEvents: 0, // Would be queried from database
      businessDirectoryQueries: performanceStore.businessDirectoryRequests,
      matchingSystemPerformance: calculateMatchingPerformance(),
      geoLocationQueries: performanceStore.geoLocationRequests
    };
  } catch (error) {
    console.error('Failed to get Portuguese community metrics:', error);
    return {
      activeUsers: 0,
      culturalEvents: 0,
      businessDirectoryQueries: 0,
      matchingSystemPerformance: 0,
      geoLocationQueries: 0,
      error: 'Community metrics unavailable'
    };
  }
}

/**
 * Generate performance recommendations
 */
function generateRecommendations(metrics: any): string[] {
  const recommendations: string[] = [];

  // Memory recommendations
  if (metrics.system.memoryUsage.percentage > 80) {
    recommendations.push('High memory usage detected. Consider optimizing Portuguese cultural content caching.');
  }

  // Database recommendations
  if (metrics.database.connectionUtilization > 80) {
    recommendations.push('Database connection pool utilization is high. Consider increasing pool size for Portuguese community peak hours.');
  }

  if (metrics.database.queryPerformance?.averageQueryTime > 200) {
    recommendations.push('Slow database queries detected. Optimize Portuguese cultural content queries with proper indexing.');
  }

  // Cache recommendations
  if (metrics.cache.hitRatio < 70) {
    recommendations.push('Low cache hit ratio. Review Portuguese community cache strategies and TTL values.');
  }

  if (!metrics.cache.connected) {
    recommendations.push('Redis cache is disconnected. Reconnect to improve Portuguese community performance.');
  }

  // API recommendations
  if (metrics.apiPerformance.errorRate > 5) {
    recommendations.push('High API error rate detected. Review error handling for Portuguese community endpoints.');
  }

  if (metrics.apiPerformance.slowEndpoints.length > 0) {
    recommendations.push(`Slow API endpoints detected: ${metrics.apiPerformance.slowEndpoints.join(', ')}`);
  }

  return recommendations;
}

/**
 * Generate performance alerts
 */
function generateAlerts(metrics: any): string[] {
  const alerts: string[] = [];

  // Critical system alerts
  if (metrics.system.memoryUsage.percentage > 90) {
    alerts.push('CRITICAL: Memory usage above 90%');
  }

  // Database alerts
  if (metrics.database.connectionUtilization > 95) {
    alerts.push('CRITICAL: Database connection pool near capacity');
  }

  if (metrics.database.queryPerformance?.errorCount > 10) {
    alerts.push('WARNING: High number of database errors');
  }

  // Cache alerts
  if (!metrics.cache.connected) {
    alerts.push('CRITICAL: Redis cache is disconnected');
  }

  if (metrics.cache.hitRatio < 50) {
    alerts.push('WARNING: Very low cache hit ratio');
  }

  // API alerts
  if (metrics.apiPerformance.errorRate > 10) {
    alerts.push('CRITICAL: API error rate above 10%');
  }

  if (metrics.apiPerformance.averageResponseTime > 2000) {
    alerts.push('WARNING: High API response times');
  }

  return alerts;
}

/**
 * Determine overall system status
 */
function determineSystemStatus(metrics: any): 'healthy' | 'degraded' | 'critical' {
  // Critical conditions
  if (
    metrics.system.memoryUsage.percentage > 90 ||
    metrics.database.connectionUtilization > 95 ||
    !metrics.cache.connected ||
    metrics.apiPerformance.errorRate > 10
  ) {
    return 'critical';
  }

  // Degraded conditions
  if (
    metrics.system.memoryUsage.percentage > 80 ||
    metrics.database.connectionUtilization > 80 ||
    metrics.cache.hitRatio < 50 ||
    metrics.apiPerformance.errorRate > 5 ||
    metrics.apiPerformance.averageResponseTime > 1500
  ) {
    return 'degraded';
  }

  return 'healthy';
}

/**
 * Helper functions
 */

function recordApiRequest(endpoint: string, responseTime: number, isError: boolean): void {
  // Update request counts
  const currentCount = performanceStore.requestCounts.get(endpoint) || 0;
  performanceStore.requestCounts.set(endpoint, currentCount + 1);

  // Update response times (keep last 100)
  const times = performanceStore.responseTimes.get(endpoint) || [];
  times.push(responseTime);
  if (times.length > 100) {
    times.splice(0, times.length - 100);
  }
  performanceStore.responseTimes.set(endpoint, times);

  // Update error counts
  if (isError) {
    const currentErrors = performanceStore.errorCounts.get(endpoint) || 0;
    performanceStore.errorCounts.set(endpoint, currentErrors + 1);
  }
}

async function getCpuUsage(): Promise<number> {
  // Simple CPU usage calculation
  // In production, you might want to use a more sophisticated method
  return 0; // Placeholder
}

function calculateOperationsPerSecond(metrics: any): number {
  const totalOps = metrics.hits + metrics.misses + metrics.sets + metrics.deletes;
  const uptimeSeconds = process.uptime();
  return uptimeSeconds > 0 ? Math.round(totalOps / uptimeSeconds) : 0;
}

function calculateMatchingPerformance(): number {
  // Calculate matching system performance score
  // This would be based on actual matching algorithm performance
  const totalMatchingRequests = performanceStore.matchingRequests;
  const uptime = process.uptime();
  
  // Simple calculation - requests per second
  return uptime > 0 ? Math.round(totalMatchingRequests / uptime) : 0;
}