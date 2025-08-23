#!/usr/bin/env node

/**
 * Portuguese-Speaking Community Database Performance Monitor
 * 
 * Monitors and analyzes database performance for LusoTown platform
 * Focuses on Portuguese cultural queries and community features
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'your_service_key';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Performance monitoring for Portuguese community database
 */
class PortugueseDatabaseMonitor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      queryPerformance: {},
      indexUsage: {},
      tableStats: {},
      optimizationRecommendations: []
    };
  }

  /**
   * Test Portuguese event discovery performance
   */
  async testEventDiscoveryPerformance() {
    console.log('🔍 Testing Portuguese event discovery performance...');
    
    const testQueries = [
      {
        name: 'Portuguese Events Discovery',
        query: `
          SELECT * FROM find_portuguese_events_optimized(
            51.5074, -0.1278, 25.0, 
            ARRAY['Music & Entertainment', 'Cultural Events'], 
            'pt', 20
          )
        `
      },
      {
        name: 'Cultural Events Search',
        query: `
          SELECT id, title, start_datetime, current_attendee_count
          FROM events 
          WHERE status = 'active' 
            AND (title ~* 'fado|portugal|português' 
                OR description ~* 'portuguese|cultural')
          ORDER BY start_datetime ASC 
          LIMIT 10
        `
      }
    ];

    for (const testQuery of testQueries) {
      const startTime = performance.now();
      
      try {
        const { data, error } = await supabase.rpc('query', {
          query: testQuery.query
        });
        
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        this.results.queryPerformance[testQuery.name] = {
          executionTime: `${executionTime.toFixed(2)}ms`,
          recordCount: data?.length || 0,
          status: error ? 'failed' : 'success',
          error: error?.message
        };

        console.log(`  ✅ ${testQuery.name}: ${executionTime.toFixed(2)}ms (${data?.length || 0} records)`);
      } catch (err) {
        console.log(`  ❌ ${testQuery.name}: ${err.message}`);
        this.results.queryPerformance[testQuery.name] = {
          status: 'failed',
          error: err.message
        };
      }
    }
  }

  /**
   * Test Portuguese business directory performance
   */
  async testBusinessDirectoryPerformance() {
    console.log('🏪 Testing Portuguese business directory performance...');
    
    const testQueries = [
      {
        name: 'Portuguese Business Proximity Search',
        query: `
          SELECT * FROM find_portuguese_businesses_optimized(
            51.5074, -0.1278, 
            ARRAY['Restaurant', 'Cultural Center'], 
            10.0, 15
          )
        `
      },
      {
        name: 'Business Directory Geospatial Query',
        query: `
          SELECT id, name, business_type, 
                 ST_Distance(
                   ST_SetSRID(ST_MakePoint(-0.1278, 51.5074), 4326)::geography,
                   coordinates::geography
                 ) / 1000 as distance_km
          FROM portuguese_businesses 
          WHERE is_active = true
            AND ST_DWithin(
              ST_SetSRID(ST_MakePoint(-0.1278, 51.5074), 4326)::geography,
              coordinates::geography,
              10000
            )
          ORDER BY distance_km 
          LIMIT 10
        `
      }
    ];

    for (const testQuery of testQueries) {
      const startTime = performance.now();
      
      try {
        const { data, error } = await supabase.rpc('query', {
          query: testQuery.query
        });
        
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        this.results.queryPerformance[testQuery.name] = {
          executionTime: `${executionTime.toFixed(2)}ms`,
          recordCount: data?.length || 0,
          status: error ? 'failed' : 'success',
          error: error?.message
        };

        console.log(`  ✅ ${testQuery.name}: ${executionTime.toFixed(2)}ms (${data?.length || 0} records)`);
      } catch (err) {
        console.log(`  ❌ ${testQuery.name}: ${err.message}`);
        this.results.queryPerformance[testQuery.name] = {
          status: 'failed',
          error: err.message
        };
      }
    }
  }

  /**
   * Test cultural compatibility matching performance
   */
  async testCulturalMatchingPerformance() {
    console.log('💖 Testing cultural compatibility matching performance...');
    
    const startTime = performance.now();
    
    try {
      // Note: This would require actual user IDs in a real test
      const { data, error } = await supabase.rpc('calculate_portuguese_cultural_compatibility_optimized', {
        user_id: '00000000-0000-0000-0000-000000000001',
        target_user_id: '00000000-0000-0000-0000-000000000002'
      });
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      this.results.queryPerformance['Cultural Compatibility Matching'] = {
        executionTime: `${executionTime.toFixed(2)}ms`,
        status: error ? 'failed' : 'success',
        compatibilityData: data,
        error: error?.message
      };

      console.log(`  ✅ Cultural Compatibility Matching: ${executionTime.toFixed(2)}ms`);
    } catch (err) {
      console.log(`  ❌ Cultural Compatibility Matching: ${err.message}`);
      this.results.queryPerformance['Cultural Compatibility Matching'] = {
        status: 'failed',
        error: err.message
      };
    }
  }

  /**
   * Analyze database table statistics
   */
  async analyzeTableStatistics() {
    console.log('📊 Analyzing Portuguese community table statistics...');
    
    try {
      const { data: tableStats, error } = await supabase
        .from('v_portuguese_community_performance')
        .select('*');
      
      if (error) throw error;
      
      this.results.tableStats = tableStats.reduce((acc, stat) => {
        acc[stat.table_name] = {
          tableSize: stat.table_size,
          totalSize: stat.total_size,
          activeRecords: stat.active_records,
          recentRecords: stat.recent_records
        };
        return acc;
      }, {});

      console.log('  ✅ Table statistics analyzed');
      tableStats.forEach(stat => {
        console.log(`    📋 ${stat.table_name}: ${stat.table_size} (${stat.active_records} active, ${stat.recent_records} recent)`);
      });
    } catch (err) {
      console.log(`  ❌ Table statistics analysis failed: ${err.message}`);
      this.results.tableStats = { error: err.message };
    }
  }

  /**
   * Test materialized view performance
   */
  async testMaterializedViewPerformance() {
    console.log('🔄 Testing materialized view performance...');
    
    const materializedViewTests = [
      {
        name: 'Popular Portuguese Events Cache',
        table: 'mv_popular_portuguese_events'
      },
      {
        name: 'Portuguese Business Directory Cache',
        table: 'mv_portuguese_businesses_directory'
      }
    ];

    for (const test of materializedViewTests) {
      const startTime = performance.now();
      
      try {
        const { data, error, count } = await supabase
          .from(test.table)
          .select('*', { count: 'exact' })
          .limit(10);
        
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        this.results.queryPerformance[test.name] = {
          executionTime: `${executionTime.toFixed(2)}ms`,
          recordCount: data?.length || 0,
          totalCount: count,
          status: error ? 'failed' : 'success',
          error: error?.message
        };

        console.log(`  ✅ ${test.name}: ${executionTime.toFixed(2)}ms (${count} total records)`);
      } catch (err) {
        console.log(`  ❌ ${test.name}: ${err.message}`);
        this.results.queryPerformance[test.name] = {
          status: 'failed',
          error: err.message
        };
      }
    }
  }

  /**
   * Test real-time subscription performance
   */
  async testRealTimePerformance() {
    console.log('⚡ Testing real-time subscription performance...');
    
    const startTime = performance.now();
    
    try {
      // Test connection to real-time channels
      const channel = supabase.channel('portuguese-events')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'events' }, 
            (payload) => {
              console.log('Real-time event received:', payload);
            })
        .subscribe((status) => {
          const endTime = performance.now();
          const connectionTime = endTime - startTime;
          
          this.results.queryPerformance['Real-time Subscription'] = {
            connectionTime: `${connectionTime.toFixed(2)}ms`,
            status: status === 'SUBSCRIBED' ? 'success' : 'failed',
            subscriptionStatus: status
          };

          console.log(`  ✅ Real-time Subscription: ${connectionTime.toFixed(2)}ms (${status})`);
        });

      // Clean up subscription
      setTimeout(() => {
        supabase.removeChannel(channel);
      }, 2000);
    } catch (err) {
      console.log(`  ❌ Real-time Subscription: ${err.message}`);
      this.results.queryPerformance['Real-time Subscription'] = {
        status: 'failed',
        error: err.message
      };
    }
  }

  /**
   * Generate optimization recommendations
   */
  generateOptimizationRecommendations() {
    console.log('💡 Generating optimization recommendations...');
    
    const recommendations = [];
    
    // Analyze query performance and suggest optimizations
    Object.entries(this.results.queryPerformance).forEach(([queryName, stats]) => {
      if (stats.status === 'success' && stats.executionTime) {
        const execTime = parseFloat(stats.executionTime);
        
        if (execTime > 200) {
          recommendations.push({
            type: 'performance',
            severity: 'high',
            query: queryName,
            issue: `Slow query execution: ${stats.executionTime}`,
            recommendation: 'Consider adding or optimizing indexes for this query pattern'
          });
        } else if (execTime > 100) {
          recommendations.push({
            type: 'performance',
            severity: 'medium',
            query: queryName,
            issue: `Moderate query execution: ${stats.executionTime}`,
            recommendation: 'Monitor query performance and consider optimization if usage increases'
          });
        } else {
          recommendations.push({
            type: 'performance',
            severity: 'low',
            query: queryName,
            issue: `Good query performance: ${stats.executionTime}`,
            recommendation: 'Current optimization is effective'
          });
        }
      }
      
      if (stats.status === 'failed') {
        recommendations.push({
          type: 'error',
          severity: 'high',
          query: queryName,
          issue: `Query failed: ${stats.error}`,
          recommendation: 'Investigate and fix query execution issues'
        });
      }
    });

    // Analyze table sizes
    Object.entries(this.results.tableStats).forEach(([tableName, stats]) => {
      if (stats.activeRecords > 100000) {
        recommendations.push({
          type: 'capacity',
          severity: 'medium',
          table: tableName,
          issue: `Large table with ${stats.activeRecords} active records`,
          recommendation: 'Consider partitioning or archival strategies'
        });
      }
    });

    this.results.optimizationRecommendations = recommendations;
    
    console.log(`  ✅ Generated ${recommendations.length} recommendations`);
    recommendations.forEach(rec => {
      console.log(`    ${rec.severity.toUpperCase()}: ${rec.issue} - ${rec.recommendation}`);
    });
  }

  /**
   * Generate performance report
   */
  generatePerformanceReport() {
    const reportData = {
      ...this.results,
      summary: {
        totalQueriesTested: Object.keys(this.results.queryPerformance).length,
        successfulQueries: Object.values(this.results.queryPerformance).filter(q => q.status === 'success').length,
        failedQueries: Object.values(this.results.queryPerformance).filter(q => q.status === 'failed').length,
        averageExecutionTime: this.calculateAverageExecutionTime(),
        optimizationScore: this.calculateOptimizationScore()
      }
    };

    // Save report to file
    const reportPath = path.join(__dirname, '..', 'performance-reports', `portuguese-db-performance-${Date.now()}.json`);
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    return { reportData, reportPath };
  }

  /**
   * Calculate average execution time for successful queries
   */
  calculateAverageExecutionTime() {
    const executionTimes = Object.values(this.results.queryPerformance)
      .filter(q => q.status === 'success' && q.executionTime)
      .map(q => parseFloat(q.executionTime));
    
    if (executionTimes.length === 0) return null;
    
    const average = executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length;
    return `${average.toFixed(2)}ms`;
  }

  /**
   * Calculate optimization score (0-100)
   */
  calculateOptimizationScore() {
    const highSeverityIssues = this.results.optimizationRecommendations.filter(r => r.severity === 'high').length;
    const mediumSeverityIssues = this.results.optimizationRecommendations.filter(r => r.severity === 'medium').length;
    const lowSeverityIssues = this.results.optimizationRecommendations.filter(r => r.severity === 'low').length;
    
    const score = Math.max(0, 100 - (highSeverityIssues * 20) - (mediumSeverityIssues * 10) - (lowSeverityIssues * 2));
    return score;
  }

  /**
   * Run complete performance analysis
   */
  async runCompleteAnalysis() {
    console.log('🚀 Starting Portuguese Community Database Performance Analysis');
    console.log('=' .repeat(80));
    
    try {
      await this.testEventDiscoveryPerformance();
      await this.testBusinessDirectoryPerformance();
      await this.testCulturalMatchingPerformance();
      await this.analyzeTableStatistics();
      await this.testMaterializedViewPerformance();
      await this.testRealTimePerformance();
      
      this.generateOptimizationRecommendations();
      
      const { reportData, reportPath } = this.generatePerformanceReport();
      
      console.log('=' .repeat(80));
      console.log('📋 PERFORMANCE ANALYSIS SUMMARY');
      console.log('=' .repeat(80));
      console.log(`📊 Queries Tested: ${reportData.summary.totalQueriesTested}`);
      console.log(`✅ Successful: ${reportData.summary.successfulQueries}`);
      console.log(`❌ Failed: ${reportData.summary.failedQueries}`);
      console.log(`⏱️  Average Execution Time: ${reportData.summary.averageExecutionTime || 'N/A'}`);
      console.log(`🎯 Optimization Score: ${reportData.summary.optimizationScore}/100`);
      console.log(`💡 Recommendations: ${reportData.optimizationRecommendations.length}`);
      console.log(`📄 Report saved to: ${reportPath}`);
      console.log('=' .repeat(80));
      
      return reportData;
      
    } catch (error) {
      console.error('❌ Performance analysis failed:', error);
      throw error;
    }
  }
}

// Run the performance analysis if this script is executed directly
if (require.main === module) {
  const monitor = new PortugueseDatabaseMonitor();
  
  monitor.runCompleteAnalysis()
    .then((results) => {
      console.log('✅ Performance analysis completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Performance analysis failed:', error);
      process.exit(1);
    });
}

module.exports = PortugueseDatabaseMonitor;