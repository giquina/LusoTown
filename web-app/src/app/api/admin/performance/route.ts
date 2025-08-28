/**
 * Performance Monitoring API Route
 * 
 * Provides database performance metrics and health monitoring
 * for the Portuguese community platform administration.
 * 
 * GET /api/admin/performance - Get comprehensive performance metrics
 * POST /api/admin/performance - Log performance metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import DatabasePerformanceService from '@/services/DatabasePerformanceService';

// Initialize performance service
const dbService = new DatabasePerformanceService();

/**
 * GET /api/admin/performance
 * 
 * Returns comprehensive performance metrics for Portuguese community platform
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    const detailed = searchParams.get('detailed') === 'true';

    // Return specific metric if requested
    if (metric) {
      switch (metric) {
        case 'community':
          const communityMetrics = await dbService.getCommunityPlatformMetrics();
          return NextResponse.json({
            metric: 'community',
            data: communityMetrics,
            timestamp: new Date().toISOString()
          });

        case 'health':
          const healthMetrics = await dbService.getDatabaseHealth();
          return NextResponse.json({
            metric: 'health',
            data: healthMetrics,
            timestamp: new Date().toISOString()
          });

        case 'business':
          const businessMetrics = await dbService.getBusinessDirectoryPerformance();
          return NextResponse.json({
            metric: 'business_directory',
            data: businessMetrics,
            timestamp: new Date().toISOString()
          });

        case 'events':
          const eventMetrics = await dbService.getEventDiscoveryPerformance();
          return NextResponse.json({
            metric: 'event_discovery',
            data: eventMetrics,
            timestamp: new Date().toISOString()
          });

        case 'matching':
          const matchingMetrics = await dbService.getCulturalMatchingPerformance();
          return NextResponse.json({
            metric: 'cultural_matching',
            data: matchingMetrics,
            timestamp: new Date().toISOString()
          });

        case 'transport':
          const transportMetrics = await dbService.getTransportCoordinationPerformance();
          return NextResponse.json({
            metric: 'transport_coordination',
            data: transportMetrics,
            timestamp: new Date().toISOString()
          });

        case 'university':
          const universityMetrics = await dbService.getUniversityIntegrationMetrics();
          return NextResponse.json({
            metric: 'university_integration',
            data: universityMetrics,
            timestamp: new Date().toISOString()
          });

        case 'recommendations':
          const recommendations = await dbService.getOptimizationRecommendations();
          return NextResponse.json({
            metric: 'optimization_recommendations',
            data: recommendations,
            timestamp: new Date().toISOString()
          });

        case 'maintenance':
          const maintenanceStatus = await dbService.getMaintenanceStatus();
          return NextResponse.json({
            metric: 'maintenance_status',
            data: maintenanceStatus,
            timestamp: new Date().toISOString()
          });

        default:
          return NextResponse.json(
            { error: 'Invalid metric requested', available_metrics: ['community', 'health', 'business', 'events', 'matching', 'transport', 'university', 'recommendations', 'maintenance'] },
            { status: 400 }
          );
      }
    }

    // Return comprehensive metrics if detailed=true
    if (detailed) {
      const [
        communityMetrics,
        healthMetrics,
        businessMetrics,
        eventMetrics,
        matchingMetrics,
        transportMetrics,
        universityMetrics,
        recommendations
      ] = await Promise.all([
        dbService.getCommunityPlatformMetrics(),
        dbService.getDatabaseHealth(),
        dbService.getBusinessDirectoryPerformance(),
        dbService.getEventDiscoveryPerformance(),
        dbService.getCulturalMatchingPerformance(),
        dbService.getTransportCoordinationPerformance(),
        dbService.getUniversityIntegrationMetrics(),
        dbService.getOptimizationRecommendations()
      ]);

      return NextResponse.json({
        comprehensive_metrics: {
          community: communityMetrics,
          database_health: healthMetrics,
          business_directory: businessMetrics,
          event_discovery: eventMetrics,
          cultural_matching: matchingMetrics,
          transport_coordination: transportMetrics,
          university_integration: universityMetrics,
          optimization_recommendations: recommendations
        },
        performance_summary: {
          overall_health_score: healthMetrics.overall_score,
          active_community_users: communityMetrics.total_active_users,
          upcoming_events: communityMetrics.upcoming_events,
          mutual_matches: communityMetrics.mutual_matches,
          available_transport: communityMetrics.available_transport,
          university_partnerships: communityMetrics.university_partnerships,
          critical_issues: recommendations.critical.length,
          performance_optimizations_needed: recommendations.performance.length
        },
        timestamp: new Date().toISOString()
      });
    }

    // Default: Return essential metrics summary
    const [communityMetrics, healthMetrics] = await Promise.all([
      dbService.getCommunityPlatformMetrics(),
      dbService.getDatabaseHealth()
    ]);

    return NextResponse.json({
      summary: {
        database_health_score: healthMetrics.overall_score,
        health_status: healthMetrics.overall_score > 90 ? 'excellent' : 
                      healthMetrics.overall_score > 80 ? 'good' : 
                      healthMetrics.overall_score > 60 ? 'fair' : 'needs_attention',
        community_metrics: {
          total_active_users: communityMetrics.total_active_users,
          weekly_new_users: communityMetrics.weekly_new_users,
          verified_users: communityMetrics.verified_users,
          published_events: communityMetrics.published_events,
          upcoming_events: communityMetrics.upcoming_events,
          mutual_matches: communityMetrics.mutual_matches,
          available_transport: communityMetrics.available_transport,
          university_partnerships: communityMetrics.university_partnerships
        },
        performance_indicators: {
          slow_queries_count: healthMetrics.slow_queries.length,
          table_sizes: healthMetrics.table_sizes,
          index_efficiency: Object.keys(healthMetrics.index_usage).length > 0 ? 'monitored' : 'basic'
        }
      },
      quick_actions: {
        view_detailed_metrics: '/api/admin/performance?detailed=true',
        get_recommendations: '/api/admin/performance?metric=recommendations',
        check_maintenance: '/api/admin/performance?metric=maintenance'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Performance metrics API error:', error);
    
    return NextResponse.json({
      error: 'Failed to retrieve performance metrics',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * POST /api/admin/performance
 * 
 * Logs performance metrics for historical analysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      search_type, 
      execution_time_ms, 
      result_count, 
      search_parameters = {} 
    } = body;

    // Validate required fields
    if (!search_type || typeof execution_time_ms !== 'number' || typeof result_count !== 'number') {
      return NextResponse.json({
        error: 'Invalid request body',
        required_fields: ['search_type', 'execution_time_ms', 'result_count'],
        optional_fields: ['search_parameters']
      }, { status: 400 });
    }

    // Log the performance metric
    await dbService.logPerformanceMetrics(
      search_type,
      execution_time_ms,
      result_count,
      search_parameters
    );

    // Analyze performance and provide feedback
    const performance_analysis = {
      status: execution_time_ms < 100 ? 'excellent' : 
              execution_time_ms < 200 ? 'good' : 
              execution_time_ms < 500 ? 'acceptable' : 'needs_optimization',
      recommendation: execution_time_ms > 200 ? 
        `Query took ${execution_time_ms}ms - consider optimization` : 
        'Performance within acceptable range',
      logged_at: new Date().toISOString()
    };

    return NextResponse.json({
      message: 'Performance metrics logged successfully',
      logged_data: {
        search_type,
        execution_time_ms,
        result_count,
        has_parameters: Object.keys(search_parameters).length > 0
      },
      performance_analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Performance logging API error:', error);
    
    return NextResponse.json({
      error: 'Failed to log performance metrics',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

/**
 * OPTIONS /api/admin/performance
 * 
 * Returns API documentation and available endpoints
 */
export async function OPTIONS() {
  return NextResponse.json({
    api_documentation: {
      title: 'Portuguese Community Platform Performance API',
      version: '1.0.0',
      description: 'Comprehensive performance monitoring and optimization for LusoTown community platform'
    },
    endpoints: {
      'GET /api/admin/performance': {
        description: 'Get performance metrics and health status',
        parameters: {
          metric: 'Specific metric to retrieve (community, health, business, events, matching, transport, university, recommendations, maintenance)',
          detailed: 'Set to "true" for comprehensive metrics'
        },
        examples: [
          '/api/admin/performance - Essential metrics summary',
          '/api/admin/performance?detailed=true - Comprehensive metrics',
          '/api/admin/performance?metric=health - Database health only',
          '/api/admin/performance?metric=recommendations - Optimization recommendations'
        ]
      },
      'POST /api/admin/performance': {
        description: 'Log performance metrics for historical analysis',
        body: {
          search_type: 'string (required) - Type of operation performed',
          execution_time_ms: 'number (required) - Query execution time in milliseconds',
          result_count: 'number (required) - Number of results returned',
          search_parameters: 'object (optional) - Parameters used in the operation'
        }
      }
    },
    core_systems_monitored: [
      'Community Events - Portuguese cultural event discovery and booking',
      'Business Directory - PostGIS-powered Portuguese business listings',
      'Cultural Matching - Simple compatibility for community connections',
      'Transport Coordination - Community transport sharing and coordination',
      'University Integration - 8 UK university partnerships monitoring'
    ],
    performance_targets: {
      business_directory_search: '<100ms',
      event_discovery: '<80ms',
      cultural_matching: '<50ms',
      transport_coordination: '<70ms',
      university_integration: '<30ms'
    },
    community_focus: 'Optimized for 750+ Portuguese speakers, 2,150+ students across UK'
  });
}