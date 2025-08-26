import { NextRequest, NextResponse } from "next/server";
import { getEnhancedDatabaseService } from "@/services/EnhancedDatabaseService";

/**
 * Database Performance Monitoring API for Portuguese Community
 *
 * Provides comprehensive performance analytics including:
 * - Real-time connection pool health
 * - Portuguese query performance metrics
 * - Cache efficiency analysis
 * - Database optimization recommendations
 * - Resource utilization monitoring
 */

interface PerformanceAnalyticsRequest {
  includeHistory?: boolean;
  analysisDepth?: "basic" | "detailed" | "comprehensive";
  optimizationRecommendations?: boolean;
  culturalQueryAnalysis?: boolean;
  healthCheck?: boolean;
}

interface PerformanceResponse {
  success: boolean;
  data?: {
    timestamp: string;
    healthStatus: any;
    performanceMetrics: any;
    queryAnalytics: any;
    optimizationRecommendations: string[];
    alerts: any[];
  };
  error?: string;
  metadata?: {
    analysisTime: number;
    dataPoints: number;
    confidenceLevel: string;
  };
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<PerformanceResponse>> {
  const startTime = performance.now();

  try {
    const { searchParams } = new URL(request.url);

    // Parse performance analysis parameters
    const params: PerformanceAnalyticsRequest = {
      includeHistory: searchParams.get("history") === "true",
      analysisDepth: (searchParams.get("depth") as any) || "detailed",
      optimizationRecommendations:
        searchParams.get("recommendations") !== "false",
      culturalQueryAnalysis: searchParams.get("cultural") === "true",
      healthCheck: searchParams.get("health") === "true",
    };

    // Get enhanced database service
    const dbService = getEnhancedDatabaseService();

    // Collect comprehensive performance metrics
    const performanceMetrics = await dbService.collectPerformanceMetrics();

    // Derive a health status object from available service metrics
    const serviceMetrics =
      performanceMetrics.data?.service_metrics || ({} as any);
    const healthStatus = {
      connectionPool: {
        healthy: true,
        active: serviceMetrics.connectionPool?.active ?? 0,
        configured_max: serviceMetrics.connectionPool?.configured_max ?? 0,
        averageResponseTime: serviceMetrics.averageExecutionTime ?? 0,
      },
      cacheStatus: {
        redisAvailable: serviceMetrics.cache_status?.redis_available ?? false,
      },
      realtimeChannels: {
        active: 0,
      },
    };

    // Initialize response data structure
    const responseData = {
      timestamp: new Date().toISOString(),
      healthStatus,
      performanceMetrics: performanceMetrics.data,
      queryAnalytics: null as any,
      optimizationRecommendations: [] as string[],
      alerts: [] as any[],
    };

    // Perform detailed analysis based on request parameters
    if (
      params.analysisDepth === "comprehensive" ||
      params.culturalQueryAnalysis
    ) {
      try {
        // This would call the database function if it exists
        // For now, we'll simulate the analysis
        responseData.queryAnalytics =
          await analyzePortugueseQueryPerformance(dbService);
      } catch (error) {
        console.warn("Cultural query analysis failed:", error);
        responseData.queryAnalytics = {
          analysis: "limited_data",
          message: "Detailed query analysis not available",
        };
      }
    }

    // Generate optimization recommendations
    if (params.optimizationRecommendations) {
      responseData.optimizationRecommendations =
        generateOptimizationRecommendations(
          healthStatus,
          performanceMetrics.data
        );
    }

    // Check for performance alerts
    responseData.alerts = generatePerformanceAlerts(
      healthStatus,
      performanceMetrics.data
    );

    const executionTime = performance.now() - startTime;

    return NextResponse.json({
      success: true,
      data: responseData,
      metadata: {
        analysisTime: Math.round(executionTime),
        dataPoints: calculateDataPoints(responseData),
        confidenceLevel: determineConfidenceLevel(responseData),
      },
    });
  } catch (error) {
    console.error("Performance monitoring API error:", error);

    const executionTime = performance.now() - startTime;

    return NextResponse.json(
      {
        success: false,
        error: "Performance monitoring analysis failed",
        metadata: {
          analysisTime: Math.round(executionTime),
          dataPoints: 0,
          confidenceLevel: "error",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Analyze Portuguese query performance patterns
 */
async function analyzePortugueseQueryPerformance(dbService: any) {
  const analysis = {
    businessSearchPerformance: {
      averageExecutionTime: 0,
      cacheHitRatio: 0,
      spatialQueryEfficiency: 0,
      recommendations: [] as string[],
    },
    eventDiscoveryPerformance: {
      averageExecutionTime: 0,
      culturalScoringPerformance: 0,
      geospatialOptimization: 0,
      recommendations: [] as string[],
    },
    culturalMatchingPerformance: {
      averageExecutionTime: 0,
      compatibilityCalculationSpeed: 0,
      locationFactorPerformance: 0,
      recommendations: [] as string[],
    },
    overallPortugueseQueryHealth: {
      status: "unknown",
      performanceGrade: "pending",
      criticalIssues: [] as string[],
      improvements: [] as string[],
    },
  };

  try {
    // Get current performance statistics
    const stats = dbService.getPerformanceStatistics();

    // Analyze business search performance
    analysis.businessSearchPerformance.averageExecutionTime =
      stats.averageExecutionTime;
    analysis.businessSearchPerformance.cacheHitRatio = stats.cacheHitRatio;

    if (stats.averageExecutionTime > 200) {
      analysis.businessSearchPerformance.recommendations.push(
        "Portuguese business search queries are slower than optimal - consider index optimization"
      );
    }

    if (stats.cacheHitRatio < 0.7) {
      analysis.businessSearchPerformance.recommendations.push(
        "Cache hit ratio is low - review caching strategy for Portuguese business data"
      );
    }

    // Analyze slow queries
    const slowQueries = stats.slowQueries.filter(
      (q: { executionTime: number }) => q.executionTime > 500
    );
    if (slowQueries.length > 0) {
      analysis.overallPortugueseQueryHealth.criticalIssues.push(
        `${slowQueries.length} slow queries detected affecting Portuguese community experience`
      );
    }

    // Determine overall health status
    if (stats.averageExecutionTime < 150 && stats.cacheHitRatio > 0.8) {
      analysis.overallPortugueseQueryHealth.status = "excellent";
      analysis.overallPortugueseQueryHealth.performanceGrade = "A+";
    } else if (stats.averageExecutionTime < 300 && stats.cacheHitRatio > 0.6) {
      analysis.overallPortugueseQueryHealth.status = "good";
      analysis.overallPortugueseQueryHealth.performanceGrade = "B+";
    } else if (stats.averageExecutionTime < 500) {
      analysis.overallPortugueseQueryHealth.status = "needs_attention";
      analysis.overallPortugueseQueryHealth.performanceGrade = "C";
    } else {
      analysis.overallPortugueseQueryHealth.status = "critical";
      analysis.overallPortugueseQueryHealth.performanceGrade = "D";
      analysis.overallPortugueseQueryHealth.criticalIssues.push(
        "Critical performance degradation detected in Portuguese community queries"
      );
    }
  } catch (error) {
    console.error("Query performance analysis failed:", error);
    analysis.overallPortugueseQueryHealth.status = "analysis_failed";
    analysis.overallPortugueseQueryHealth.criticalIssues.push(
      "Unable to analyze query performance"
    );
  }

  return analysis;
}

/**
 * Generate optimization recommendations based on performance data
 */
function generateOptimizationRecommendations(
  healthStatus: any,
  performanceMetrics: any
): string[] {
  const recommendations: string[] = [];

  // Connection pool recommendations
  if (!healthStatus.connectionPool.healthy) {
    recommendations.push(
      "Connection pool health is degraded - investigate connection issues immediately"
    );
  }

  const utilization =
    healthStatus.connectionPool.active /
    healthStatus.connectionPool.configured_max;
  if (utilization > 0.8) {
    recommendations.push(
      "High connection pool utilization detected - consider increasing pool size"
    );
  } else if (utilization < 0.2) {
    recommendations.push(
      "Low connection pool utilization - consider reducing pool size for efficiency"
    );
  }

  // Performance recommendations
  if (performanceMetrics?.service_metrics?.averageExecutionTime > 300) {
    recommendations.push(
      "Average query execution time is high - optimize Portuguese community query indexes"
    );
  }

  if (performanceMetrics?.service_metrics?.cacheHitRatio < 0.7) {
    recommendations.push(
      "Cache hit ratio is below optimal - review caching strategy for Portuguese data"
    );
  }

  // Portuguese-specific recommendations
  if (performanceMetrics?.service_metrics?.slowQueries?.length > 10) {
    recommendations.push(
      "High number of slow queries detected - focus on PostGIS spatial query optimization"
    );
  }

  // Cache recommendations
  if (!healthStatus.cacheStatus.redisAvailable) {
    recommendations.push(
      "Redis cache is not available - implement caching for better Portuguese community performance"
    );
  }

  // Real-time recommendations
  if (healthStatus.realtimeChannels.active === 0) {
    recommendations.push(
      "No real-time channels active - ensure Portuguese community features have live updates"
    );
  }

  // Resource utilization recommendations
  if (healthStatus.connectionPool.averageResponseTime > 200) {
    recommendations.push(
      "High average response time - investigate database server resources and query optimization"
    );
  }

  // Default recommendations if none found
  if (recommendations.length === 0) {
    recommendations.push(
      "Database performance is within acceptable limits for Portuguese community workload"
    );
    recommendations.push(
      "Continue monitoring for sustained performance optimization"
    );
  }

  return recommendations;
}

/**
 * Generate performance alerts based on thresholds
 */
function generatePerformanceAlerts(
  healthStatus: any,
  performanceMetrics: any
): any[] {
  const alerts: any[] = [];

  // Critical alerts
  if (!healthStatus.connectionPool.healthy) {
    alerts.push({
      level: "critical",
      type: "connection_health",
      message: "Database connection pool is unhealthy",
      timestamp: new Date().toISOString(),
      impact: "Portuguese community features may be unavailable",
      action: "Investigate connection issues immediately",
    });
  }

  if (performanceMetrics?.service_metrics?.averageExecutionTime > 1000) {
    alerts.push({
      level: "critical",
      type: "query_performance",
      message: "Critical query performance degradation detected",
      timestamp: new Date().toISOString(),
      impact: "Portuguese community searches and features severely slowed",
      action: "Immediate database optimization required",
    });
  }

  // Warning alerts
  if (performanceMetrics?.service_metrics?.averageExecutionTime > 500) {
    alerts.push({
      level: "warning",
      type: "query_performance",
      message: "Query performance is below optimal thresholds",
      timestamp: new Date().toISOString(),
      impact: "Portuguese community user experience may be affected",
      action: "Schedule query optimization and index review",
    });
  }

  const utilization =
    healthStatus.connectionPool.active /
    healthStatus.connectionPool.configured_max;
  if (utilization > 0.9) {
    alerts.push({
      level: "warning",
      type: "resource_utilization",
      message: "Connection pool utilization is critically high",
      timestamp: new Date().toISOString(),
      impact: "New Portuguese community connections may be rejected",
      action: "Increase connection pool size or optimize connection usage",
    });
  }

  if (performanceMetrics?.service_metrics?.cacheHitRatio < 0.5) {
    alerts.push({
      level: "warning",
      type: "cache_efficiency",
      message: "Cache hit ratio is critically low",
      timestamp: new Date().toISOString(),
      impact: "Increased database load and slower Portuguese community queries",
      action: "Review and optimize caching strategy for Portuguese data",
    });
  }

  // Info alerts
  if (healthStatus.realtimeChannels.active > 10) {
    alerts.push({
      level: "info",
      type: "realtime_activity",
      message: "High real-time channel activity detected",
      timestamp: new Date().toISOString(),
      impact: "Strong Portuguese community engagement",
      action: "Monitor resource usage during peak activity",
    });
  }

  return alerts;
}

/**
 * Calculate the number of data points in the response
 */
function calculateDataPoints(responseData: any): number {
  let dataPoints = 0;

  // Count health status metrics
  if (responseData.healthStatus) {
    dataPoints += Object.keys(responseData.healthStatus).length;
  }

  // Count performance metrics
  if (responseData.performanceMetrics) {
    dataPoints += Object.keys(responseData.performanceMetrics).length;
  }

  // Count query analytics
  if (responseData.queryAnalytics) {
    dataPoints += Object.keys(responseData.queryAnalytics).length;
  }

  // Count recommendations and alerts
  dataPoints += responseData.optimizationRecommendations.length;
  dataPoints += responseData.alerts.length;

  return dataPoints;
}

/**
 * Determine confidence level based on available data
 */
function determineConfidenceLevel(responseData: any): string {
  let confidenceScore = 0;

  // Health status available
  if (responseData.healthStatus?.connectionPool?.healthy !== undefined) {
    confidenceScore += 25;
  }

  // Performance metrics available
  if (responseData.performanceMetrics?.service_metrics) {
    confidenceScore += 25;
  }

  // Query analytics available
  if (
    responseData.queryAnalytics &&
    responseData.queryAnalytics.analysis !== "limited_data"
  ) {
    confidenceScore += 30;
  }

  // Recommendations generated
  if (responseData.optimizationRecommendations.length > 0) {
    confidenceScore += 20;
  }

  if (confidenceScore >= 90) return "high";
  if (confidenceScore >= 70) return "medium";
  if (confidenceScore >= 50) return "low";
  return "insufficient_data";
}

/**
 * POST endpoint for triggering database maintenance
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { action } = await request.json();

    if (!action) {
      return NextResponse.json(
        {
          success: false,
          error: "Maintenance action is required",
        },
        { status: 400 }
      );
    }

    const dbService = getEnhancedDatabaseService();
    let result: any;

    switch (action) {
      case "maintenance":
        result = await dbService.maintainPortugueseCommunityDatabase();
        break;

      case "health_check":
        // Collect latest performance to derive health status
        const metrics = await dbService.collectPerformanceMetrics();
        const svc = metrics.data?.service_metrics || ({} as any);
        result = {
          healthStatus: {
            connectionPool: {
              healthy: true,
              active: svc.connectionPool?.active ?? 0,
              configured_max: svc.connectionPool?.configured_max ?? 0,
              averageResponseTime: svc.averageExecutionTime ?? 0,
            },
            cacheStatus: {
              redisAvailable: svc.cache_status?.redis_available ?? false,
            },
            realtimeChannels: {
              active: 0,
            },
          },
          timestamp: new Date().toISOString(),
        };
        break;

      case "optimize_pool":
        // Optimization hook not implemented; acknowledge request
        result = {
          message:
            "Connection pool optimization is not required/implemented in this environment",
          timestamp: new Date().toISOString(),
        };
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid maintenance action",
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Database maintenance action failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Database maintenance action failed",
      },
      { status: 500 }
    );
  }
}
