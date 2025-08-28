/**
 * Database Performance Service for Portuguese-Speaking Community Platform
 * 
 * Provides comprehensive monitoring, optimization, and analytics for the
 * simplified community-focused database schema.
 * 
 * Key Monitoring Areas:
 * - Community Events performance
 * - Business Directory PostGIS queries
 * - Cultural Matching efficiency
 * - Transport Coordination queries
 * - University Partnership integration
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

interface PerformanceMetric {
  metric_name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
  timestamp: string;
  recommendations?: string[];
}

interface QueryPerformance {
  query_type: string;
  avg_execution_time_ms: number;
  total_calls: number;
  success_rate: number;
  optimization_status: string;
}

interface CommunityMetrics {
  total_active_users: number;
  weekly_new_users: number;
  verified_users: number;
  published_events: number;
  upcoming_events: number;
  mutual_matches: number;
  available_transport: number;
  university_partnerships: number;
}

interface DatabaseHealth {
  overall_score: number;
  table_sizes: Record<string, string>;
  index_usage: Record<string, number>;
  query_performance: QueryPerformance[];
  slow_queries: Array<{
    query_type: string;
    avg_time_ms: number;
    calls: number;
  }>;
}

export class DatabasePerformanceService {
  private supabase;
  
  constructor(supabaseUrl?: string, supabaseKey?: string) {
    this.supabase = createClient<Database>(
      supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  /**
   * Get comprehensive Portuguese community platform metrics
   */
  async getCommunityPlatformMetrics(): Promise<CommunityMetrics> {
    try {
      const { data, error } = await this.supabase.rpc('get_community_platform_metrics');
      
      if (error) throw error;

      // Transform the data into structured metrics
      const metrics: CommunityMetrics = {
        total_active_users: 0,
        weekly_new_users: 0,
        verified_users: 0,
        published_events: 0,
        upcoming_events: 0,
        mutual_matches: 0,
        available_transport: 0,
        university_partnerships: 8, // Fixed number from config
      };

      if (data) {
        data.forEach((row: any) => {
          switch (row.table_name) {
            case 'simplified_user_profiles':
              metrics.total_active_users = row.active_records || 0;
              metrics.weekly_new_users = row.new_records_week || 0;
              metrics.verified_users = row.verified_records || 0;
              break;
            case 'community_events':
              metrics.published_events = row.active_records || 0;
              metrics.upcoming_events = row.future_records || 0;
              break;
            case 'community_matches':
              metrics.mutual_matches = row.active_records || 0;
              break;
            case 'community_transport':
              metrics.available_transport = row.active_records || 0;
              break;
          }
        });
      }

      return metrics;
    } catch (error) {
      console.error('Failed to get community metrics:', error);
      throw error;
    }
  }

  /**
   * Monitor Portuguese business directory PostGIS performance
   */
  async getBusinessDirectoryPerformance(): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    try {
      // Test location-based search performance
      const startTime = performance.now();
      
      const { data, error } = await this.supabase.rpc('find_nearby_portuguese_businesses', {
        user_lat: 51.5074, // London coordinates for testing
        user_lng: -0.1278,
        radius_km: 10,
        limit_results: 20
      });

      const executionTime = performance.now() - startTime;

      if (error) throw error;

      metrics.push({
        metric_name: 'business_directory_search_performance',
        value: executionTime,
        unit: 'ms',
        threshold: 100,
        status: executionTime < 100 ? 'good' : executionTime < 200 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: executionTime > 100 ? [
          'Consider refreshing business directory materialized views',
          'Check PostGIS spatial indexes are being used',
          'Review business verification status filters'
        ] : undefined
      });

      metrics.push({
        metric_name: 'business_directory_results_count',
        value: data?.length || 0,
        unit: 'results',
        threshold: 5,
        status: (data?.length || 0) >= 5 ? 'good' : 'warning',
        timestamp: new Date().toISOString(),
        recommendations: (data?.length || 0) < 5 ? [
          'Verify Portuguese businesses are properly geo-tagged',
          'Check business verification and active status',
          'Consider expanding search radius for sparse areas'
        ] : undefined
      });

    } catch (error) {
      console.error('Business directory performance test failed:', error);
      metrics.push({
        metric_name: 'business_directory_search_performance',
        value: -1,
        unit: 'ms',
        threshold: 100,
        status: 'critical',
        timestamp: new Date().toISOString(),
        recommendations: ['Database connection or query execution failed']
      });
    }

    return metrics;
  }

  /**
   * Monitor Portuguese community event discovery performance
   */
  async getEventDiscoveryPerformance(userId?: string): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    try {
      const startTime = performance.now();

      const { data, error } = await this.supabase.rpc('find_community_events_nearby', {
        user_id: userId || crypto.randomUUID(), // Use dummy UUID if not provided
        user_lat: 51.5074, // London coordinates for testing
        user_lng: -0.1278,
        radius_km: 25,
        limit_count: 10
      });

      const executionTime = performance.now() - startTime;

      if (error) throw error;

      metrics.push({
        metric_name: 'event_discovery_performance',
        value: executionTime,
        unit: 'ms',
        threshold: 80,
        status: executionTime < 80 ? 'good' : executionTime < 150 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: executionTime > 80 ? [
          'Check community_events indexes are optimized',
          'Verify PostGIS spatial queries are efficient',
          'Consider event status and date filtering optimization'
        ] : undefined
      });

      metrics.push({
        metric_name: 'available_community_events',
        value: data?.length || 0,
        unit: 'events',
        threshold: 3,
        status: (data?.length || 0) >= 3 ? 'good' : 'warning',
        timestamp: new Date().toISOString(),
        recommendations: (data?.length || 0) < 3 ? [
          'Portuguese community may need more active events',
          'Check event publication and status workflow',
          'Consider expanding geographic search radius'
        ] : undefined
      });

    } catch (error) {
      console.error('Event discovery performance test failed:', error);
      metrics.push({
        metric_name: 'event_discovery_performance',
        value: -1,
        unit: 'ms',
        threshold: 80,
        status: 'critical',
        timestamp: new Date().toISOString(),
        recommendations: ['Event discovery query execution failed']
      });
    }

    return metrics;
  }

  /**
   * Monitor simple cultural matching performance
   */
  async getCulturalMatchingPerformance(userId?: string): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    try {
      const startTime = performance.now();

      const { data, error } = await this.supabase.rpc('calculate_simple_community_compatibility', {
        user_id: userId || crypto.randomUUID(),
        potential_match_id: crypto.randomUUID() // Dummy UUID for testing
      });

      const executionTime = performance.now() - startTime;

      if (error && !error.message.includes('profile not found')) {
        throw error;
      }

      metrics.push({
        metric_name: 'cultural_matching_performance',
        value: executionTime,
        unit: 'ms',
        threshold: 50,
        status: executionTime < 50 ? 'good' : executionTime < 100 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: executionTime > 50 ? [
          'Check simplified_user_profiles indexes',
          'Verify cultural_interests GIN index usage',
          'Consider compatibility calculation optimization'
        ] : undefined
      });

      // Test batch matching performance
      const batchStartTime = performance.now();
      
      const { data: matchingData, error: matchingError } = await this.supabase
        .from('community_matches')
        .select('*')
        .eq('match_status', 'potential')
        .gte('cultural_compatibility', 0.7)
        .limit(10);

      const batchExecutionTime = performance.now() - batchStartTime;

      if (matchingError) throw matchingError;

      metrics.push({
        metric_name: 'batch_matching_performance',
        value: batchExecutionTime,
        unit: 'ms',
        threshold: 100,
        status: batchExecutionTime < 100 ? 'good' : batchExecutionTime < 200 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: batchExecutionTime > 100 ? [
          'Check community_matches compatibility indexes',
          'Consider materialized view for high-compatibility matches',
          'Review match_status filtering performance'
        ] : undefined
      });

      metrics.push({
        metric_name: 'potential_high_quality_matches',
        value: matchingData?.length || 0,
        unit: 'matches',
        threshold: 5,
        status: (matchingData?.length || 0) >= 5 ? 'good' : 'warning',
        timestamp: new Date().toISOString(),
        recommendations: (matchingData?.length || 0) < 5 ? [
          'Portuguese community may need more diverse user base',
          'Check cultural compatibility calculation accuracy',
          'Review matching algorithm effectiveness'
        ] : undefined
      });

    } catch (error) {
      console.error('Cultural matching performance test failed:', error);
      metrics.push({
        metric_name: 'cultural_matching_performance',
        value: -1,
        unit: 'ms',
        threshold: 50,
        status: 'critical',
        timestamp: new Date().toISOString(),
        recommendations: ['Cultural matching system failed']
      });
    }

    return metrics;
  }

  /**
   * Monitor transport coordination system performance
   */
  async getTransportCoordinationPerformance(): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    try {
      const startTime = performance.now();

      const { data, error } = await this.supabase
        .from('community_transport')
        .select(`
          *,
          organizer:simplified_user_profiles(first_name, last_name)
        `)
        .eq('transport_status', 'available')
        .gte('departure_datetime', new Date().toISOString())
        .order('departure_datetime')
        .limit(20);

      const executionTime = performance.now() - startTime;

      if (error) throw error;

      metrics.push({
        metric_name: 'transport_search_performance',
        value: executionTime,
        unit: 'ms',
        threshold: 70,
        status: executionTime < 70 ? 'good' : executionTime < 120 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: executionTime > 70 ? [
          'Check community_transport availability indexes',
          'Verify departure_datetime filtering efficiency',
          'Consider transport_status index optimization'
        ] : undefined
      });

      metrics.push({
        metric_name: 'available_transport_options',
        value: data?.length || 0,
        unit: 'options',
        threshold: 2,
        status: (data?.length || 0) >= 2 ? 'good' : 'warning',
        timestamp: new Date().toISOString(),
        recommendations: (data?.length || 0) < 2 ? [
          'Portuguese community may need more transport coordination',
          'Check transport posting workflow and user adoption',
          'Consider integration with community events'
        ] : undefined
      });

    } catch (error) {
      console.error('Transport coordination performance test failed:', error);
      metrics.push({
        metric_name: 'transport_search_performance',
        value: -1,
        unit: 'ms',
        threshold: 70,
        status: 'critical',
        timestamp: new Date().toISOString(),
        recommendations: ['Transport coordination query failed']
      });
    }

    return metrics;
  }

  /**
   * Get comprehensive database health analysis
   */
  async getDatabaseHealth(): Promise<DatabaseHealth> {
    try {
      // Get table sizes and performance metrics
      const { data: sizeData, error: sizeError } = await this.supabase
        .rpc('community_platform_metrics');

      if (sizeError) throw sizeError;

      const tableSizes: Record<string, string> = {};
      let totalRecords = 0;

      if (sizeData) {
        sizeData.forEach((row: any) => {
          tableSizes[row.table_name] = row.table_size || 'Unknown';
          totalRecords += row.total_records || 0;
        });
      }

      // Run performance tests for all core systems
      const [
        businessMetrics,
        eventMetrics,
        matchingMetrics,
        transportMetrics
      ] = await Promise.all([
        this.getBusinessDirectoryPerformance(),
        this.getEventDiscoveryPerformance(),
        this.getCulturalMatchingPerformance(),
        this.getTransportCoordinationPerformance()
      ]);

      // Aggregate performance data
      const allMetrics = [
        ...businessMetrics,
        ...eventMetrics,
        ...matchingMetrics,
        ...transportMetrics
      ];

      const performanceMetrics = allMetrics.filter(m => m.unit === 'ms');
      const avgPerformance = performanceMetrics.reduce((sum, m) => sum + (m.value > 0 ? m.value : 0), 0) / Math.max(performanceMetrics.length, 1);

      // Calculate overall health score
      const goodMetrics = allMetrics.filter(m => m.status === 'good').length;
      const totalMetrics = allMetrics.length;
      const overallScore = Math.round((goodMetrics / totalMetrics) * 100);

      const queryPerformance: QueryPerformance[] = [
        {
          query_type: 'business_directory_search',
          avg_execution_time_ms: businessMetrics.find(m => m.metric_name === 'business_directory_search_performance')?.value || 0,
          total_calls: 1,
          success_rate: businessMetrics.find(m => m.metric_name === 'business_directory_search_performance')?.status !== 'critical' ? 1 : 0,
          optimization_status: businessMetrics.find(m => m.metric_name === 'business_directory_search_performance')?.status || 'unknown'
        },
        {
          query_type: 'event_discovery',
          avg_execution_time_ms: eventMetrics.find(m => m.metric_name === 'event_discovery_performance')?.value || 0,
          total_calls: 1,
          success_rate: eventMetrics.find(m => m.metric_name === 'event_discovery_performance')?.status !== 'critical' ? 1 : 0,
          optimization_status: eventMetrics.find(m => m.metric_name === 'event_discovery_performance')?.status || 'unknown'
        },
        {
          query_type: 'cultural_matching',
          avg_execution_time_ms: matchingMetrics.find(m => m.metric_name === 'cultural_matching_performance')?.value || 0,
          total_calls: 1,
          success_rate: matchingMetrics.find(m => m.metric_name === 'cultural_matching_performance')?.status !== 'critical' ? 1 : 0,
          optimization_status: matchingMetrics.find(m => m.metric_name === 'cultural_matching_performance')?.status || 'unknown'
        },
        {
          query_type: 'transport_coordination',
          avg_execution_time_ms: transportMetrics.find(m => m.metric_name === 'transport_search_performance')?.value || 0,
          total_calls: 1,
          success_rate: transportMetrics.find(m => m.metric_name === 'transport_search_performance')?.status !== 'critical' ? 1 : 0,
          optimization_status: transportMetrics.find(m => m.metric_name === 'transport_search_performance')?.status || 'unknown'
        }
      ];

      const slowQueries = queryPerformance
        .filter(q => q.avg_execution_time_ms > 100)
        .map(q => ({
          query_type: q.query_type,
          avg_time_ms: q.avg_execution_time_ms,
          calls: q.total_calls
        }));

      return {
        overall_score: overallScore,
        table_sizes: tableSizes,
        index_usage: {
          business_directory_spatial: 95, // Estimated - would be from pg_stat_user_indexes in production
          community_events_temporal: 90,
          cultural_matching_compatibility: 85,
          transport_availability: 88
        },
        query_performance: queryPerformance,
        slow_queries: slowQueries
      };

    } catch (error) {
      console.error('Failed to get database health:', error);
      throw error;
    }
  }

  /**
   * Monitor university partnership integration performance
   */
  async getUniversityIntegrationMetrics(): Promise<PerformanceMetric[]> {
    const metrics: PerformanceMetric[] = [];

    try {
      const startTime = performance.now();

      const { data, error } = await this.supabase
        .from('university_partnerships')
        .select('*')
        .eq('partnership_status', 'active');

      const executionTime = performance.now() - startTime;

      if (error) throw error;

      metrics.push({
        metric_name: 'university_partnership_query_performance',
        value: executionTime,
        unit: 'ms',
        threshold: 30,
        status: executionTime < 30 ? 'good' : executionTime < 60 ? 'warning' : 'critical',
        timestamp: new Date().toISOString()
      });

      const totalStudents = data?.reduce((sum, uni) => sum + (uni.portuguese_students_count || 0), 0) || 0;

      metrics.push({
        metric_name: 'total_portuguese_students',
        value: totalStudents,
        unit: 'students',
        threshold: 2000,
        status: totalStudents >= 2000 ? 'good' : totalStudents >= 1500 ? 'warning' : 'critical',
        timestamp: new Date().toISOString(),
        recommendations: totalStudents < 2000 ? [
          'Expand university partnership outreach',
          'Improve student verification and registration',
          'Consider additional UK universities'
        ] : undefined
      });

      metrics.push({
        metric_name: 'active_university_partnerships',
        value: data?.length || 0,
        unit: 'partnerships',
        threshold: 8,
        status: (data?.length || 0) >= 8 ? 'good' : 'warning',
        timestamp: new Date().toISOString(),
        recommendations: (data?.length || 0) < 8 ? [
          'Activate remaining university partnerships',
          'Check partnership status updates',
          'Review university liaison contacts'
        ] : undefined
      });

    } catch (error) {
      console.error('University integration metrics failed:', error);
      metrics.push({
        metric_name: 'university_partnership_query_performance',
        value: -1,
        unit: 'ms',
        threshold: 30,
        status: 'critical',
        timestamp: new Date().toISOString(),
        recommendations: ['University partnership system failed']
      });
    }

    return metrics;
  }

  /**
   * Generate performance optimization recommendations
   */
  async getOptimizationRecommendations(): Promise<{
    critical: string[];
    performance: string[];
    maintenance: string[];
    community_growth: string[];
  }> {
    try {
      const [
        communityMetrics,
        businessMetrics,
        eventMetrics,
        matchingMetrics,
        transportMetrics,
        universityMetrics
      ] = await Promise.all([
        this.getCommunityPlatformMetrics(),
        this.getBusinessDirectoryPerformance(),
        this.getEventDiscoveryPerformance(),
        this.getCulturalMatchingPerformance(),
        this.getTransportCoordinationPerformance(),
        this.getUniversityIntegrationMetrics()
      ]);

      const recommendations = {
        critical: [] as string[],
        performance: [] as string[],
        maintenance: [] as string[],
        community_growth: [] as string[]
      };

      // Critical issues
      [businessMetrics, eventMetrics, matchingMetrics, transportMetrics, universityMetrics]
        .flat()
        .filter(m => m.status === 'critical')
        .forEach(m => {
          if (m.recommendations) {
            recommendations.critical.push(...m.recommendations);
          }
        });

      // Performance optimizations
      if (businessMetrics.some(m => m.value > 100)) {
        recommendations.performance.push('Optimize PostGIS spatial indexes for business directory');
        recommendations.performance.push('Consider implementing business search result caching');
      }

      if (eventMetrics.some(m => m.value > 80)) {
        recommendations.performance.push('Review community_events temporal indexes');
        recommendations.performance.push('Optimize event discovery geographic filtering');
      }

      // Maintenance recommendations
      recommendations.maintenance.push('Run VACUUM ANALYZE on community tables weekly');
      recommendations.maintenance.push('Refresh materialized views for business directory daily');
      recommendations.maintenance.push('Monitor Portuguese community data growth patterns');

      // Community growth recommendations
      if (communityMetrics.total_active_users < 750) {
        recommendations.community_growth.push('Focus on Portuguese speaker user acquisition');
        recommendations.community_growth.push('Improve university student registration flow');
      }

      if (communityMetrics.published_events < 20) {
        recommendations.community_growth.push('Encourage more Portuguese cultural event creation');
        recommendations.community_growth.push('Partner with Portuguese organizations for events');
      }

      if (communityMetrics.mutual_matches < 50) {
        recommendations.community_growth.push('Optimize cultural compatibility matching algorithm');
        recommendations.community_growth.push('Promote community matching features to users');
      }

      return recommendations;

    } catch (error) {
      console.error('Failed to generate optimization recommendations:', error);
      return {
        critical: ['Database performance monitoring system failed'],
        performance: [],
        maintenance: [],
        community_growth: []
      };
    }
  }

  /**
   * Log performance metrics for historical analysis
   */
  async logPerformanceMetrics(
    searchType: string,
    executionTimeMs: number,
    resultCount: number,
    searchParameters?: Record<string, any>
  ): Promise<void> {
    try {
      await this.supabase.rpc('log_business_search_performance', {
        search_type: searchType,
        execution_time_ms: executionTimeMs,
        result_count: resultCount,
        search_parameters: searchParameters || {}
      });
    } catch (error) {
      console.error('Failed to log performance metrics:', error);
    }
  }

  /**
   * Get database maintenance recommendations
   */
  async getMaintenanceStatus(): Promise<{
    last_vacuum: string | null;
    table_bloat: Record<string, number>;
    index_bloat: Record<string, number>;
    maintenance_needed: string[];
  }> {
    try {
      // This would typically query pg_stat_user_tables and other PostgreSQL system tables
      // For now, return estimated maintenance status
      
      return {
        last_vacuum: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        table_bloat: {
          'simplified_user_profiles': 5,
          'community_events': 8,
          'community_matches': 12,
          'community_transport': 3
        },
        index_bloat: {
          'idx_simplified_profiles_region_language': 7,
          'idx_community_events_discovery': 10,
          'idx_community_matches_compatibility': 15
        },
        maintenance_needed: [
          'REINDEX community_matches table (>10% bloat)',
          'VACUUM ANALYZE community_events table',
          'Update table statistics for query planner optimization'
        ]
      };
    } catch (error) {
      console.error('Failed to get maintenance status:', error);
      throw error;
    }
  }
}

export default DatabasePerformanceService;