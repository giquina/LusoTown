#!/usr/bin/env node

/**
 * Enhanced Portuguese Community Database Performance Monitor
 * 
 * Real-time monitoring and alerting system for LusoTown database performance
 * Tracks Portuguese community specific queries, PostGIS operations, and connection health
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Performance thresholds for Portuguese community operations
 */
const PERFORMANCE_THRESHOLDS = {
  query_execution: {
    excellent: 50,    // < 50ms
    good: 150,        // 50-150ms
    warning: 500,     // 150-500ms
    critical: 1000    // > 1000ms
  },
  cache_hit_ratio: {
    excellent: 0.9,   // > 90%
    good: 0.8,        // 80-90%
    warning: 0.7,     // 70-80%
    critical: 0.6     // < 60%
  },
  connection_count: {
    excellent: 10,    // < 10 connections
    good: 25,         // 10-25 connections
    warning: 40,      // 25-40 connections
    critical: 50      // > 50 connections
  },
  disk_usage: {
    excellent: 1024,  // < 1GB
    good: 5120,       // 1-5GB
    warning: 10240,   // 5-10GB
    critical: 20480   // > 20GB
  }
};

/**
 * Portuguese Community Database Performance Monitor
 */
class PortugueseDatabasePerformanceMonitor {
  constructor() {
    this.monitoringInterval = 30000; // 30 seconds
    this.alertHistory = [];
    this.performanceHistory = [];
    this.isMonitoring = false;
    this.alertHandlers = new Map();
    
    // Setup alert handlers
    this.setupAlertHandlers();
  }

  /**
   * Setup different alert handlers (console, file, webhook)
   */
  setupAlertHandlers() {
    // Console alert handler
    this.alertHandlers.set('console', (alert) => {
      const emoji = this.getAlertEmoji(alert.severity);
      console.log(`${emoji} [${alert.severity.toUpperCase()}] ${alert.message}`);
      
      if (alert.details) {
        console.log(`   Details: ${JSON.stringify(alert.details, null, 2)}`);
      }
      
      if (alert.recommendations?.length > 0) {
        console.log(`   Recommendations:`);
        alert.recommendations.forEach(rec => console.log(`   - ${rec}`));
      }
    });

    // File alert handler
    this.alertHandlers.set('file', async (alert) => {
      try {
        const logsDir = path.join(__dirname, '..', 'logs');
        await fs.mkdir(logsDir, { recursive: true });
        
        const logFile = path.join(logsDir, `performance-alerts-${new Date().toISOString().split('T')[0]}.json`);
        const logEntry = {
          timestamp: new Date().toISOString(),
          ...alert
        };
        
        let existingLogs = [];
        try {
          const existingData = await fs.readFile(logFile, 'utf8');
          existingLogs = JSON.parse(existingData);
        } catch (e) {
          // File doesn't exist or is empty
        }
        
        existingLogs.push(logEntry);
        await fs.writeFile(logFile, JSON.stringify(existingLogs, null, 2));
      } catch (error) {
        console.error('Failed to write alert to file:', error);
      }
    });
  }

  /**
   * Get emoji for alert severity
   */
  getAlertEmoji(severity) {
    const emojis = {
      info: 'ℹ️',
      warning: '⚠️',
      critical: '🚨',
      error: '❌'
    };
    return emojis[severity] || '📊';
  }

  /**
   * Start monitoring Portuguese community database performance
   */
  async startMonitoring() {
    console.log('🚀 Starting Portuguese Community Database Performance Monitoring');
    console.log('=' .repeat(80));
    console.log(`📊 Monitoring interval: ${this.monitoringInterval / 1000} seconds`);
    console.log(`🎯 Tracking: Portuguese businesses, events, cultural matches, PostGIS operations`);
    console.log(`🔔 Alert thresholds configured for Portuguese community scale`);
    console.log('=' .repeat(80));
    
    this.isMonitoring = true;
    
    // Initial performance baseline
    await this.collectPerformanceMetrics();
    
    // Start monitoring loop
    while (this.isMonitoring) {
      try {
        await this.performMonitoringCycle();
        await this.sleep(this.monitoringInterval);
      } catch (error) {
        console.error('❌ Monitoring cycle failed:', error);
        await this.triggerAlert({
          severity: 'error',
          message: 'Database monitoring cycle failed',
          details: { error: error.message },
          recommendations: ['Check database connectivity', 'Verify monitoring permissions']
        });
        await this.sleep(5000); // Wait 5 seconds before retrying
      }
    }
  }

  /**
   * Perform complete monitoring cycle
   */
  async performMonitoringCycle() {
    const cycleStart = Date.now();
    console.log(`🔍 [${new Date().toISOString()}] Starting monitoring cycle...`);
    
    // Collect all performance metrics
    const metrics = await this.collectComprehensiveMetrics();
    
    // Store metrics in history
    this.performanceHistory.push({
      timestamp: new Date().toISOString(),
      ...metrics
    });
    
    // Keep only last 100 entries
    if (this.performanceHistory.length > 100) {
      this.performanceHistory = this.performanceHistory.slice(-100);
    }
    
    // Analyze metrics and trigger alerts if needed
    await this.analyzeMetricsAndAlert(metrics);
    
    // Display summary
    this.displayMonitoringSummary(metrics);
    
    const cycleDuration = Date.now() - cycleStart;
    console.log(`✅ Monitoring cycle completed in ${cycleDuration}ms`);
    console.log('─'.repeat(80));
  }

  /**
   * Collect comprehensive performance metrics
   */
  async collectComprehensiveMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      database: await this.collectDatabaseMetrics(),
      queries: await this.collectQueryMetrics(),
      connections: await this.collectConnectionMetrics(),
      storage: await this.collectStorageMetrics(),
      postgis: await this.collectPostGISMetrics(),
      cache: await this.collectCacheMetrics(),
      errors: await this.collectErrorMetrics()
    };
    
    return metrics;
  }

  /**
   * Collect database-level performance metrics
   */
  async collectDatabaseMetrics() {
    try {
      const { data, error } = await supabase.rpc('collect_portuguese_performance_metrics');
      
      if (error) throw error;
      
      return {
        performance_metrics: data || [],
        collection_success: true
      };
    } catch (error) {
      return {
        performance_metrics: [],
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect query performance metrics
   */
  async collectQueryMetrics() {
    try {
      // Get Portuguese community specific query stats
      const { data, error } = await supabase.rpc('monitor_portuguese_query_performance');
      
      if (error) throw error;
      
      return {
        portuguese_queries: data || [],
        collection_success: true
      };
    } catch (error) {
      return {
        portuguese_queries: [],
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect connection metrics
   */
  async collectConnectionMetrics() {
    try {
      const { data, error } = await supabase.rpc('query', {
        query: `
          SELECT 
            COUNT(*) as total_connections,
            COUNT(*) FILTER (WHERE state = 'active') as active_connections,
            COUNT(*) FILTER (WHERE state = 'idle') as idle_connections,
            COUNT(*) FILTER (WHERE application_name LIKE '%LusoTown%') as lusotown_connections,
            MAX(EXTRACT(EPOCH FROM (now() - query_start))) as longest_running_query_seconds
          FROM pg_stat_activity 
          WHERE datname = current_database()
        `
      });
      
      if (error) throw error;
      
      return {
        connection_stats: data[0] || {},
        collection_success: true
      };
    } catch (error) {
      return {
        connection_stats: {},
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect storage and disk usage metrics
   */
  async collectStorageMetrics() {
    try {
      const { data, error } = await supabase.rpc('query', {
        query: `
          SELECT 
            schemaname,
            tablename,
            pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as table_size,
            pg_total_relation_size(schemaname||'.'||tablename) as table_size_bytes
          FROM pg_tables 
          WHERE tablename IN ('portuguese_businesses', 'events', 'event_reservations', 'user_matches', 'conversation_messages')
          ORDER BY table_size_bytes DESC
        `
      });
      
      if (error) throw error;
      
      // Calculate total size for Portuguese community tables
      const totalBytes = data.reduce((sum, table) => sum + (table.table_size_bytes || 0), 0);
      
      return {
        table_sizes: data || [],
        total_portuguese_data_size_bytes: totalBytes,
        total_portuguese_data_size_mb: Math.round(totalBytes / 1024 / 1024),
        collection_success: true
      };
    } catch (error) {
      return {
        table_sizes: [],
        total_portuguese_data_size_bytes: 0,
        total_portuguese_data_size_mb: 0,
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect PostGIS specific performance metrics
   */
  async collectPostGISMetrics() {
    try {
      const { data, error } = await supabase.rpc('query', {
        query: `
          SELECT 
            indexname,
            tablename,
            indexdef
          FROM pg_indexes 
          WHERE indexdef LIKE '%GIST%' 
            AND (tablename LIKE '%portuguese%' OR tablename LIKE '%events%')
          ORDER BY tablename, indexname
        `
      });
      
      if (error) throw error;
      
      // Check materialized views status
      const { data: mvData, error: mvError } = await supabase.rpc('query', {
        query: `
          SELECT 
            matviewname,
            ispopulated,
            pg_size_pretty(pg_total_relation_size('public.'||matviewname)) as view_size
          FROM pg_matviews 
          WHERE matviewname LIKE '%portuguese%' OR matviewname LIKE '%mv_%'
        `
      });
      
      return {
        spatial_indexes: data || [],
        materialized_views: mvData || [],
        postgis_available: true,
        collection_success: true
      };
    } catch (error) {
      return {
        spatial_indexes: [],
        materialized_views: [],
        postgis_available: false,
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect cache performance metrics
   */
  async collectCacheMetrics() {
    try {
      const { data, error } = await supabase.rpc('query', {
        query: `
          SELECT 
            sum(heap_blks_read) as heap_read,
            sum(heap_blks_hit) as heap_hit,
            CASE WHEN sum(heap_blks_hit) + sum(heap_blks_read) = 0 THEN 0
                 ELSE round(100.0 * sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)), 2)
            END as cache_hit_ratio
          FROM pg_statio_user_tables 
          WHERE relname IN ('portuguese_businesses', 'events', 'user_matches')
        `
      });
      
      if (error) throw error;
      
      return {
        database_cache_stats: data[0] || {},
        collection_success: true
      };
    } catch (error) {
      return {
        database_cache_stats: {},
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Collect error and warning metrics
   */
  async collectErrorMetrics() {
    try {
      // This would typically connect to error logging system
      // For now, we'll return placeholder data
      return {
        recent_errors: [],
        error_rate: 0,
        collection_success: true
      };
    } catch (error) {
      return {
        recent_errors: [],
        error_rate: 0,
        collection_success: false,
        error: error.message
      };
    }
  }

  /**
   * Analyze metrics and trigger alerts
   */
  async analyzeMetricsAndAlert(metrics) {
    const alerts = [];
    
    // Analyze query performance
    if (metrics.queries.portuguese_queries) {
      for (const query of metrics.queries.portuguese_queries) {
        if (query.avg_execution_time_ms > PERFORMANCE_THRESHOLDS.query_execution.critical) {
          alerts.push({
            severity: 'critical',
            message: `Portuguese ${query.query_category} queries are critically slow`,
            details: {
              avg_time: `${query.avg_execution_time_ms}ms`,
              total_calls: query.total_calls,
              slowest_query: `${query.slowest_query_time_ms}ms`
            },
            recommendations: [
              query.optimization_suggestion,
              'Consider adding more specific indexes',
              'Review query execution plans'
            ]
          });
        } else if (query.avg_execution_time_ms > PERFORMANCE_THRESHOLDS.query_execution.warning) {
          alerts.push({
            severity: 'warning',
            message: `Portuguese ${query.query_category} queries are slower than expected`,
            details: {
              avg_time: `${query.avg_execution_time_ms}ms`,
              recommendation: query.optimization_suggestion
            }
          });
        }
      }
    }
    
    // Analyze connection metrics
    if (metrics.connections.connection_stats) {
      const connStats = metrics.connections.connection_stats;
      if (connStats.total_connections > PERFORMANCE_THRESHOLDS.connection_count.critical) {
        alerts.push({
          severity: 'critical',
          message: 'Connection count is critically high',
          details: {
            total_connections: connStats.total_connections,
            active_connections: connStats.active_connections,
            lusotown_connections: connStats.lusotown_connections
          },
          recommendations: [
            'Review connection pooling configuration',
            'Check for connection leaks',
            'Consider increasing connection limits'
          ]
        });
      }
    }
    
    // Analyze cache performance
    if (metrics.cache.database_cache_stats) {
      const cacheStats = metrics.cache.database_cache_stats;
      if (cacheStats.cache_hit_ratio < PERFORMANCE_THRESHOLDS.cache_hit_ratio.warning) {
        alerts.push({
          severity: 'warning',
          message: 'Database cache hit ratio is low',
          details: {
            cache_hit_ratio: `${cacheStats.cache_hit_ratio}%`,
            heap_reads: cacheStats.heap_read,
            heap_hits: cacheStats.heap_hit
          },
          recommendations: [
            'Consider increasing shared_buffers',
            'Review query patterns for optimization',
            'Check if working set fits in memory'
          ]
        });
      }
    }
    
    // Analyze storage usage
    if (metrics.storage.total_portuguese_data_size_mb > PERFORMANCE_THRESHOLDS.disk_usage.warning) {
      alerts.push({
        severity: metrics.storage.total_portuguese_data_size_mb > PERFORMANCE_THRESHOLDS.disk_usage.critical ? 'critical' : 'warning',
        message: 'Portuguese community data size is growing large',
        details: {
          total_size: `${metrics.storage.total_portuguese_data_size_mb}MB`,
          largest_tables: metrics.storage.table_sizes.slice(0, 3)
        },
        recommendations: [
          'Consider archiving old data',
          'Implement data partitioning',
          'Review data retention policies'
        ]
      });
    }
    
    // Trigger alerts
    for (const alert of alerts) {
      await this.triggerAlert(alert);
    }
  }

  /**
   * Display monitoring summary
   */
  displayMonitoringSummary(metrics) {
    console.log(`📊 Performance Summary [${new Date().toLocaleTimeString()}]`);
    
    // Query performance summary
    if (metrics.queries.portuguese_queries?.length > 0) {
      console.log('   🔍 Query Performance:');
      metrics.queries.portuguese_queries.forEach(query => {
        const status = this.getPerformanceStatus(query.avg_execution_time_ms, 'query_execution');
        console.log(`      ${query.query_category}: ${query.avg_execution_time_ms}ms ${status}`);
      });
    }
    
    // Connection summary
    if (metrics.connections.connection_stats) {
      const conn = metrics.connections.connection_stats;
      const status = this.getPerformanceStatus(conn.total_connections, 'connection_count');
      console.log(`   🔗 Connections: ${conn.active_connections}/${conn.total_connections} active ${status}`);
    }
    
    // Cache summary
    if (metrics.cache.database_cache_stats?.cache_hit_ratio) {
      const ratio = metrics.cache.database_cache_stats.cache_hit_ratio / 100;
      const status = this.getPerformanceStatus(ratio, 'cache_hit_ratio');
      console.log(`   💾 Cache Hit Ratio: ${metrics.cache.database_cache_stats.cache_hit_ratio}% ${status}`);
    }
    
    // Storage summary
    if (metrics.storage.total_portuguese_data_size_mb > 0) {
      const status = this.getPerformanceStatus(metrics.storage.total_portuguese_data_size_mb, 'disk_usage');
      console.log(`   💿 Portuguese Data: ${metrics.storage.total_portuguese_data_size_mb}MB ${status}`);
    }
  }

  /**
   * Get performance status emoji
   */
  getPerformanceStatus(value, threshold_type) {
    const thresholds = PERFORMANCE_THRESHOLDS[threshold_type];
    
    if (threshold_type === 'cache_hit_ratio') {
      if (value >= thresholds.excellent) return '🟢';
      if (value >= thresholds.good) return '🟡';
      if (value >= thresholds.warning) return '🟠';
      return '🔴';
    } else {
      if (value <= thresholds.excellent) return '🟢';
      if (value <= thresholds.good) return '🟡';
      if (value <= thresholds.warning) return '🟠';
      return '🔴';
    }
  }

  /**
   * Trigger alert through all configured handlers
   */
  async triggerAlert(alert) {
    // Add to alert history
    this.alertHistory.push({
      timestamp: new Date().toISOString(),
      ...alert
    });
    
    // Keep only last 50 alerts
    if (this.alertHistory.length > 50) {
      this.alertHistory = this.alertHistory.slice(-50);
    }
    
    // Trigger all alert handlers
    for (const [name, handler] of this.alertHandlers) {
      try {
        await handler(alert);
      } catch (error) {
        console.error(`Alert handler '${name}' failed:`, error);
      }
    }
  }

  /**
   * Generate performance report
   */
  async generatePerformanceReport() {
    const reportData = {
      report_metadata: {
        generated_at: new Date().toISOString(),
        monitoring_duration_hours: this.performanceHistory.length * (this.monitoringInterval / 1000 / 3600),
        data_points: this.performanceHistory.length,
        alert_count: this.alertHistory.length
      },
      performance_summary: this.calculatePerformanceSummary(),
      recent_alerts: this.alertHistory.slice(-10),
      performance_trends: this.calculatePerformanceTrends(),
      recommendations: this.generateRecommendations()
    };
    
    // Save report
    const reportsDir = path.join(__dirname, '..', 'performance-reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const reportFile = path.join(reportsDir, `portuguese-db-performance-report-${Date.now()}.json`);
    await fs.writeFile(reportFile, JSON.stringify(reportData, null, 2));
    
    console.log(`📄 Performance report saved to: ${reportFile}`);
    return reportData;
  }

  /**
   * Calculate performance summary from history
   */
  calculatePerformanceSummary() {
    if (this.performanceHistory.length === 0) return {};
    
    const latest = this.performanceHistory[this.performanceHistory.length - 1];
    
    return {
      current_status: latest,
      averages: {
        // Calculate averages from recent history
      },
      peaks: {
        // Calculate peak values
      }
    };
  }

  /**
   * Calculate performance trends
   */
  calculatePerformanceTrends() {
    // Implement trend analysis logic
    return {
      query_performance_trend: 'stable',
      connection_trend: 'increasing',
      cache_efficiency_trend: 'improving'
    };
  }

  /**
   * Generate recommendations based on monitoring data
   */
  generateRecommendations() {
    const recommendations = [];
    
    // Analyze recent alerts for patterns
    const recentCriticalAlerts = this.alertHistory
      .filter(alert => alert.severity === 'critical')
      .slice(-5);
    
    if (recentCriticalAlerts.length > 2) {
      recommendations.push({
        priority: 'high',
        category: 'stability',
        recommendation: 'Multiple critical alerts detected - immediate investigation required',
        impact: 'system_stability'
      });
    }
    
    return recommendations;
  }

  /**
   * Utility function for sleeping
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Stop monitoring
   */
  async stopMonitoring() {
    console.log('🛑 Stopping Portuguese Community Database Performance Monitoring...');
    this.isMonitoring = false;
    
    // Generate final report
    await this.generatePerformanceReport();
    
    console.log('✅ Monitoring stopped successfully');
  }

  /**
   * Setup graceful shutdown
   */
  setupGracefulShutdown() {
    process.on('SIGINT', async () => {
      console.log('\n🔄 Received SIGINT, shutting down gracefully...');
      await this.stopMonitoring();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🔄 Received SIGTERM, shutting down gracefully...');
      await this.stopMonitoring();
      process.exit(0);
    });
  }
}

// Run the monitor if this script is executed directly
if (require.main === module) {
  const monitor = new PortugueseDatabasePerformanceMonitor();
  
  // Setup graceful shutdown
  monitor.setupGracefulShutdown();
  
  // Start monitoring
  monitor.startMonitoring()
    .then(() => {
      console.log('✅ Portuguese community database performance monitoring started');
    })
    .catch((error) => {
      console.error('❌ Failed to start monitoring:', error);
      process.exit(1);
    });
}

module.exports = PortugueseDatabasePerformanceMonitor;