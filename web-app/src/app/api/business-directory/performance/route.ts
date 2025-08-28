import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import logger from '@/utils/logger';

// Initialize Supabase client for server-side operations
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * GET /api/business-directory/performance
 * Get performance metrics and monitoring data for the business directory
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('range') || '24h';
    const detailed = searchParams.get('detailed') === 'true';
    
    const supabase = getSupabaseClient();
    
    // Calculate time interval based on range
    const intervalMap = {
      '1h': '1 hour',
      '24h': '24 hours', 
      '7d': '7 days',
      '30d': '30 days'
    };
    const interval = intervalMap[timeRange as keyof typeof intervalMap] || '24 hours';
    
    // Get performance metrics from logs
    const { data: performanceData, error: perfError } = await supabase
      .from('business_directory_performance_log')
      .select('*')
      .gte('logged_at', `now() - interval '${interval}'`)
      .order('logged_at', { ascending: false });
      
    if (perfError) {
      logger.error('Performance data query error:', perfError);
    }
    
    // Get database performance metrics
    const { data: dbMetrics, error: dbError } = await supabase
      .rpc('monitor_portuguese_query_performance_advanced');
      
    if (dbError) {
      logger.error('Database metrics query error:', dbError);
    }
    
    // Calculate summary statistics
    const summaryStats = performanceData ? calculateSummaryStats(performanceData) : {};
    
    // Get recent alerts
    const { data: alerts, error: alertsError } = await supabase
      .from('performance_alerts')
      .select('*')
      .gte('created_at', `now() - interval '${interval}'`)
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (alertsError) {
      logger.error('Alerts query error:', alertsError);
    }
    
    // Cache performance
    const { data: cacheStats, error: cacheError } = await supabase
      .from('business_search_cache')
      .select('access_count, created_at, last_accessed')
      .gte('created_at', `now() - interval '${interval}'`);
      
    const cacheHitRate = cacheStats ? calculateCacheHitRate(cacheStats) : 0;
    
    const response = {
      success: true,
      data: {
        summary: {
          time_range: timeRange,
          total_searches: performanceData?.length || 0,
          avg_response_time_ms: summaryStats.avgResponseTime || 0,
          cache_hit_rate_percent: cacheHitRate,
          alert_count: alerts?.filter(a => a.severity !== 'info').length || 0,
          slow_queries_count: summaryStats.slowQueriesCount || 0
        },
        performance_by_type: summaryStats.performanceByType || {},
        database_metrics: dbMetrics || [],
        recent_alerts: alerts?.slice(0, 10) || [],
        cache_performance: {
          hit_rate: cacheHitRate,
          total_entries: cacheStats?.length || 0,
          avg_access_count: cacheStats ? 
            cacheStats.reduce((sum, c) => sum + (c.access_count || 0), 0) / cacheStats.length : 0
        }
      }
    };
    
    if (detailed) {
      response.data['detailed_metrics'] = {
        hourly_breakdown: calculateHourlyBreakdown(performanceData || []),
        slowest_queries: (performanceData || [])
          .sort((a, b) => b.execution_time_ms - a.execution_time_ms)
          .slice(0, 20),
        performance_trends: calculatePerformanceTrends(performanceData || [])
      };
    }
    
    return NextResponse.json(response);
    
  } catch (error) {
    logger.error('Performance monitoring API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get performance metrics' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/business-directory/performance/benchmark
 * Run performance benchmarks on the business directory system
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    
    // Run the benchmark function
    const { data: benchmarkResults, error } = await supabase
      .rpc('benchmark_portuguese_community_performance');
      
    if (error) {
      throw error;
    }
    
    // Calculate overall performance grade
    const grades = benchmarkResults?.map((r: any) => r.performance_grade) || [];
    const gradePoints = grades.map((grade: string) => {
      const gradeMap: Record<string, number> = { 'A+': 4.0, 'A': 3.5, 'B': 2.5, 'C': 1.5, 'D': 0.5 };
      return gradeMap[grade] || 0;
    });
    const avgGradePoints = gradePoints.reduce((sum: number, points: number) => sum + points, 0) / gradePoints.length;
    
    const overallGrade = avgGradePoints >= 3.5 ? 'A+' :
                        avgGradePoints >= 3.0 ? 'A' :
                        avgGradePoints >= 2.0 ? 'B' :
                        avgGradePoints >= 1.0 ? 'C' : 'D';
    
    // Identify performance issues
    const performanceIssues = (benchmarkResults || [])
      .filter((r: any) => r.optimization_status.includes('optimization') || 
                          r.optimization_status.includes('Critical'))
      .map((r: any) => ({
        category: r.benchmark_category,
        operation: r.operation_description,
        execution_time: r.execution_time_ms,
        status: r.optimization_status,
        grade: r.performance_grade
      }));
    
    return NextResponse.json({
      success: true,
      data: {
        benchmark_results: benchmarkResults,
        overall_performance: {
          grade: overallGrade,
          grade_points: Math.round(avgGradePoints * 100) / 100,
          total_operations: benchmarkResults?.length || 0
        },
        performance_issues: performanceIssues,
        recommendations: generatePerformanceRecommendations(benchmarkResults || []),
        benchmark_timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    logger.error('Performance benchmark API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to run performance benchmark' 
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/business-directory/performance/cache
 * Clear performance cache and logs
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const olderThan = searchParams.get('olderThan') || '1h';
    
    const supabase = getSupabaseClient();
    
    // Run cleanup function
    const { data: cleanupResults, error } = await supabase
      .rpc('cleanup_business_directory_cache');
      
    if (error) {
      throw error;
    }
    
    return NextResponse.json({
      success: true,
      data: {
        cleanup_results: cleanupResults,
        message: 'Cache and performance logs cleaned up successfully'
      }
    });
    
  } catch (error) {
    logger.error('Performance cache cleanup API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clean up performance cache' 
      },
      { status: 500 }
    );
  }
}

// Helper functions
function calculateSummaryStats(performanceData: any[]) {
  const avgResponseTime = performanceData.reduce((sum, p) => sum + p.execution_time_ms, 0) / performanceData.length;
  const slowQueriesCount = performanceData.filter(p => p.execution_time_ms > 500).length;
  
  const performanceByType = performanceData.reduce((acc, p) => {
    if (!acc[p.search_type]) {
      acc[p.search_type] = { count: 0, total_time: 0, avg_time: 0, total_results: 0 };
    }
    acc[p.search_type].count++;
    acc[p.search_type].total_time += p.execution_time_ms;
    acc[p.search_type].total_results += p.result_count;
    acc[p.search_type].avg_time = acc[p.search_type].total_time / acc[p.search_type].count;
    return acc;
  }, {} as Record<string, any>);
  
  return {
    avgResponseTime: Math.round(avgResponseTime),
    slowQueriesCount,
    performanceByType
  };
}

function calculateCacheHitRate(cacheStats: any[]): number {
  if (cacheStats.length === 0) return 0;
  
  const totalAccesses = cacheStats.reduce((sum, c) => sum + (c.access_count || 0), 0);
  const totalCacheEntries = cacheStats.length;
  
  // Estimate hit rate based on access patterns
  return totalCacheEntries > 0 ? Math.min(Math.round((totalAccesses / totalCacheEntries) * 10), 100) : 0;
}

function calculateHourlyBreakdown(performanceData: any[]) {
  const hourlyData = performanceData.reduce((acc, p) => {
    const hour = new Date(p.logged_at).getHours();
    if (!acc[hour]) {
      acc[hour] = { count: 0, total_time: 0, avg_time: 0 };
    }
    acc[hour].count++;
    acc[hour].total_time += p.execution_time_ms;
    acc[hour].avg_time = acc[hour].total_time / acc[hour].count;
    return acc;
  }, {} as Record<number, any>);
  
  return Object.entries(hourlyData).map(([hour, data]) => ({
    hour: parseInt(hour),
    ...data
  }));
}

function calculatePerformanceTrends(performanceData: any[]) {
  // Group by 4-hour windows
  const windowSize = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const now = Date.now();
  
  const trends = [];
  for (let i = 0; i < 6; i++) { // Last 24 hours in 4-hour windows
    const windowStart = now - ((i + 1) * windowSize);
    const windowEnd = now - (i * windowSize);
    
    const windowData = performanceData.filter(p => {
      const timestamp = new Date(p.logged_at).getTime();
      return timestamp >= windowStart && timestamp < windowEnd;
    });
    
    const avgTime = windowData.length > 0 
      ? windowData.reduce((sum, p) => sum + p.execution_time_ms, 0) / windowData.length 
      : 0;
    
    trends.unshift({
      window_start: new Date(windowStart).toISOString(),
      window_end: new Date(windowEnd).toISOString(),
      query_count: windowData.length,
      avg_execution_time: Math.round(avgTime)
    });
  }
  
  return trends;
}

function generatePerformanceRecommendations(benchmarkResults: any[]) {
  const recommendations = [];
  
  for (const result of benchmarkResults) {
    if (result.performance_grade === 'D' || result.performance_grade === 'C') {
      recommendations.push({
        priority: result.performance_grade === 'D' ? 'high' : 'medium',
        category: result.benchmark_category,
        issue: `${result.operation_description} performance is ${result.optimization_status.toLowerCase()}`,
        recommendation: getOptimizationRecommendation(result.benchmark_category, result.execution_time_ms),
        expected_improvement: result.performance_grade === 'D' ? '50-80%' : '20-40%'
      });
    }
  }
  
  return recommendations;
}

function getOptimizationRecommendation(category: string, executionTime: number) {
  switch (category) {
    case 'business_search':
      return executionTime > 500 
        ? 'Rebuild spatial indexes and optimize PostGIS queries'
        : 'Consider adding composite indexes for frequently filtered combinations';
    case 'event_discovery':
      return 'Refresh materialized views and update table statistics';
    case 'cultural_matching':
      return 'Add functional indexes on JSONB cultural preferences columns';
    case 'materialized_views':
      return 'Consider partitioning large materialized views by date or region';
    default:
      return 'Review query execution plans and consider adding appropriate indexes';
  }
}