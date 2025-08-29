/**
 * Monitoring Dashboard API for LusoTown Portuguese-speaking Community Platform
 * 
 * Provides real-time dashboard data including:
 * - System health overview
 * - Portuguese community activity metrics
 * - Performance trending data
 * - Alert notifications
 * - Resource utilization charts
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPortugueseConnectionPool } from '@/lib/database-connection-pool';
import { getPortugueseCacheManager } from '@/lib/redis-cache-manager';

interface DashboardData {
  timestamp: string;
  overview: {
    status: 'healthy' | 'degraded' | 'critical';
    uptime: string;
    version: string;
    environment: string;
  };
  keyMetrics: {
    responseTime: number;
    throughput: number;
    errorRate: number;
    cacheHitRatio: number;
    activeConnections: number;
    memoryUsage: number;
  };
  portugueseCommunity: {
    activeUsers: number;
    culturalEvents: number;
    businessListings: number;
    matchesGenerated: number;
    geoQueries: number;
    streamingViewers: number;
  };
  systemHealth: {
    database: {
      status: string;
      connections: number;
      queryTime: number;
      slowQueries: number;
    };
    cache: {
      status: string;
      hitRatio: number;
      memory: string;
      operations: number;
    };
    api: {
      status: string;
      requests: number;
      avgResponse: number;
      errors: number;
    };
  };
  alerts: {
    critical: string[];
    warnings: string[];
    info: string[];
  };
  trends: {
    last24h: {
      responseTime: number[];
      throughput: number[];
      errors: number[];
      cacheHits: number[];
    };
    timeLabels: string[];
  };
}

// Store trending data (in production, this would be in Redis or a time-series DB)
const trendingData = {
  responseTime: [] as number[],
  throughput: [] as number[],
  errors: [] as number[],
  cacheHits: [] as number[],
  timestamps: [] as string[]
};

/**
 * GET - Dashboard data with real-time metrics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    const dashboardData = await collectDashboardData();
    const responseTime = Date.now() - startTime;

    // Update trending data
    updateTrendingData({
      responseTime: responseTime,
      throughput: calculateCurrentThroughput(),
      errors: getCurrentErrorCount(),
      cacheHits: await getCurrentCacheHitRatio()
    });

    return NextResponse.json(dashboardData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Response-Time': `${responseTime}ms`,
        'X-Portuguese-Community': 'monitoring-dashboard'
      }
    });

  } catch (error) {
    console.error('Dashboard data collection error:', error);
    
    return NextResponse.json({
      error: 'Failed to collect dashboard data',
      timestamp: new Date().toISOString(),
      overview: {
        status: 'critical',
        uptime: formatUptime(process.uptime()),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      }
    }, { status: 500 });
  }
}

/**
 * Collect comprehensive dashboard data
 */
async function collectDashboardData(): Promise<DashboardData> {
  const [
    systemHealth,
    portugueseCommunityMetrics,
    keyMetrics
  ] = await Promise.all([
    getSystemHealthStatus(),
    getPortugueseCommunityActivity(),
    getKeyMetrics()
  ]);

  const alerts = generateDashboardAlerts(systemHealth, keyMetrics);
  const overview = {
    status: determineOverallStatus(systemHealth, alerts),
    uptime: formatUptime(process.uptime()),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };

  return {
    timestamp: new Date().toISOString(),
    overview,
    keyMetrics,
    portugueseCommunity: portugueseCommunityMetrics,
    systemHealth,
    alerts,
    trends: getTrendingData()
  };
}

/**
 * Get system health status for all components
 */
async function getSystemHealthStatus(): Promise<any> {
  const [databaseHealth, cacheHealth, apiHealth] = await Promise.all([
    getDatabaseHealth(),
    getCacheHealth(),
    getApiHealth()
  ]);

  return {
    database: databaseHealth,
    cache: cacheHealth,
    api: apiHealth
  };
}

/**
 * Get database health metrics
 */
async function getDatabaseHealth(): Promise<any> {
  try {
    const connectionPool = getPortugueseConnectionPool();
    const metrics = connectionPool.getMetrics();
    const insights = connectionPool.getPerformanceInsights();

    return {
      status: determineHealthStatus(metrics.errorCount, metrics.totalQueries, 0.05),
      connections: metrics.activeConnections,
      queryTime: Math.round(metrics.averageQueryTime),
      slowQueries: metrics.slowQueries,
      totalConnections: metrics.totalConnections,
      utilization: metrics.totalConnections > 0 
        ? Math.round((metrics.activeConnections / metrics.totalConnections) * 100) 
        : 0,
      alerts: insights.alerts,
      recommendations: insights.recommendations
    };
  } catch (error) {
    return {
      status: 'critical',
      connections: 0,
      queryTime: 0,
      slowQueries: 0,
      error: 'Database health check failed'
    };
  }
}

/**
 * Get cache health metrics
 */
async function getCacheHealth(): Promise<any> {
  try {
    const cacheManager = getPortugueseCacheManager();
    const stats = await cacheManager.getDetailedStats();
    const metrics = cacheManager.getMetrics();

    const hitRatio = metrics.hitRatio * 100;

    return {
      status: stats.connected ? (hitRatio > 70 ? 'healthy' : 'degraded') : 'critical',
      hitRatio: Math.round(hitRatio),
      memory: formatBytes(stats.memoryInfo?.used_memory || 0),
      operations: metrics.hits + metrics.misses + metrics.sets + metrics.deletes,
      connected: stats.connected,
      averageResponseTime: Math.round(metrics.averageResponseTime),
      errors: metrics.errors
    };
  } catch (error) {
    return {
      status: 'critical',
      hitRatio: 0,
      memory: '0 B',
      operations: 0,
      connected: false,
      error: 'Cache health check failed'
    };
  }
}

/**
 * Get API health metrics
 */
async function getApiHealth(): Promise<any> {
  try {
    // These would be collected from middleware or monitoring service
    const totalRequests = 1000; // Placeholder
    const errors = 10; // Placeholder
    const avgResponseTime = 150; // Placeholder

    const errorRate = (errors / totalRequests) * 100;

    return {
      status: errorRate > 5 ? 'degraded' : avgResponseTime > 1000 ? 'degraded' : 'healthy',
      requests: totalRequests,
      avgResponse: avgResponseTime,
      errors: errors,
      errorRate: Math.round(errorRate * 100) / 100
    };
  } catch (error) {
    return {
      status: 'critical',
      requests: 0,
      avgResponse: 0,
      errors: 0,
      error: 'API health check failed'
    };
  }
}

/**
 * Get Portuguese community activity metrics
 */
async function getPortugueseCommunityActivity(): Promise<any> {
  try {
    // In production, these would query the database for real metrics
    return {
      activeUsers: await getActiveUserCount(),
      culturalEvents: await getCulturalEventCount(),
      businessListings: await getBusinessListingCount(),
      matchesGenerated: await getMatchesGeneratedCount(),
      geoQueries: await getGeoQueryCount(),
      streamingViewers: await getStreamingViewerCount()
    };
  } catch (error) {
    return {
      activeUsers: 0,
      culturalEvents: 0,
      businessListings: 0,
      matchesGenerated: 0,
      geoQueries: 0,
      streamingViewers: 0,
      error: 'Community metrics unavailable'
    };
  }
}

/**
 * Get key performance metrics
 */
async function getKeyMetrics(): Promise<any> {
  const memoryUsage = process.memoryUsage();
  const memoryPercentage = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

  return {
    responseTime: await getAverageResponseTime(),
    throughput: calculateCurrentThroughput(),
    errorRate: await getCurrentErrorRate(),
    cacheHitRatio: await getCurrentCacheHitRatio(),
    activeConnections: await getActiveConnectionCount(),
    memoryUsage: Math.round(memoryPercentage)
  };
}

/**
 * Generate dashboard alerts
 */
function generateDashboardAlerts(systemHealth: any, keyMetrics: any): any {
  const critical: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  // Critical alerts
  if (systemHealth.database.status === 'critical') {
    critical.push('Database connection issues detected');
  }
  
  if (systemHealth.cache.status === 'critical') {
    critical.push('Cache system is unavailable');
  }

  if (keyMetrics.memoryUsage > 90) {
    critical.push('Memory usage critically high (>90%)');
  }

  // Warning alerts
  if (systemHealth.database.utilization > 80) {
    warnings.push('Database connection pool utilization high');
  }

  if (keyMetrics.cacheHitRatio < 70) {
    warnings.push('Cache hit ratio below optimal threshold');
  }

  if (keyMetrics.responseTime > 1000) {
    warnings.push('API response times elevated');
  }

  if (systemHealth.database.slowQueries > 10) {
    warnings.push(`${systemHealth.database.slowQueries} slow queries detected`);
  }

  // Info alerts
  if (keyMetrics.throughput < 100) {
    info.push('Low system throughput - consider optimization');
  }

  return { critical, warnings, info };
}

/**
 * Determine overall system status
 */
function determineOverallStatus(systemHealth: any, alerts: any): 'healthy' | 'degraded' | 'critical' {
  if (alerts.critical.length > 0) {
    return 'critical';
  }
  
  if (alerts.warnings.length >= 3) {
    return 'degraded';
  }
  
  if (
    systemHealth.database.status === 'degraded' ||
    systemHealth.cache.status === 'degraded' ||
    systemHealth.api.status === 'degraded'
  ) {
    return 'degraded';
  }

  return 'healthy';
}

/**
 * Update trending data for charts
 */
function updateTrendingData(currentData: any): void {
  const maxDataPoints = 24; // Last 24 hours
  const currentTime = new Date().toISOString();

  // Add current data point
  trendingData.responseTime.push(currentData.responseTime);
  trendingData.throughput.push(currentData.throughput);
  trendingData.errors.push(currentData.errors);
  trendingData.cacheHits.push(currentData.cacheHits);
  trendingData.timestamps.push(currentTime);

  // Keep only last 24 data points
  if (trendingData.responseTime.length > maxDataPoints) {
    trendingData.responseTime.shift();
    trendingData.throughput.shift();
    trendingData.errors.shift();
    trendingData.cacheHits.shift();
    trendingData.timestamps.shift();
  }
}

/**
 * Get trending data for dashboard charts
 */
function getTrendingData(): any {
  return {
    last24h: {
      responseTime: [...trendingData.responseTime],
      throughput: [...trendingData.throughput],
      errors: [...trendingData.errors],
      cacheHits: [...trendingData.cacheHits]
    },
    timeLabels: trendingData.timestamps.map(timestamp => 
      new Date(timestamp).toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    )
  };
}

/**
 * Helper functions for metrics collection
 */

async function getActiveUserCount(): Promise<number> {
  // In production, query active sessions from database
  return Math.floor(Math.random() * 150) + 50; // Mock data
}

async function getCulturalEventCount(): Promise<number> {
  // Query upcoming Portuguese cultural events
  return Math.floor(Math.random() * 20) + 5; // Mock data
}

async function getBusinessListingCount(): Promise<number> {
  // Query active Portuguese businesses
  return Math.floor(Math.random() * 50) + 100; // Mock data
}

async function getMatchesGeneratedCount(): Promise<number> {
  // Query cultural compatibility matches generated today
  return Math.floor(Math.random() * 100) + 20; // Mock data
}

async function getGeoQueryCount(): Promise<number> {
  // Query geolocation-based searches
  return Math.floor(Math.random() * 200) + 50; // Mock data
}

async function getStreamingViewerCount(): Promise<number> {
  // Query current streaming viewers
  return Math.floor(Math.random() * 30) + 5; // Mock data
}

async function getAverageResponseTime(): Promise<number> {
  // Calculate average API response time
  return Math.floor(Math.random() * 300) + 100; // Mock data
}

function calculateCurrentThroughput(): number {
  // Calculate requests per second
  return Math.floor(Math.random() * 200) + 50; // Mock data
}

async function getCurrentErrorRate(): Promise<number> {
  // Calculate current error rate percentage
  return Math.random() * 5; // Mock data (0-5%)
}

async function getCurrentCacheHitRatio(): Promise<number> {
  try {
    const cacheManager = getPortugueseCacheManager();
    const metrics = cacheManager.getMetrics();
    return metrics.hitRatio * 100;
  } catch (error) {
    return 0;
  }
}

function getCurrentErrorCount(): number {
  return Math.floor(Math.random() * 10); // Mock data
}

async function getActiveConnectionCount(): Promise<number> {
  try {
    const connectionPool = getPortugueseConnectionPool();
    const metrics = connectionPool.getMetrics();
    return metrics.activeConnections;
  } catch (error) {
    return 0;
  }
}

/**
 * Utility functions
 */

function determineHealthStatus(errors: number, total: number, threshold: number): string {
  if (total === 0) return 'healthy';
  const errorRate = errors / total;
  
  if (errorRate > threshold * 2) return 'critical';
  if (errorRate > threshold) return 'degraded';
  return 'healthy';
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}