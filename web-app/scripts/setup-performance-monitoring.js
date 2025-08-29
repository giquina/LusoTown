/**
 * Performance Monitoring Setup Script for LusoTown Portuguese-speaking Community Platform
 * 
 * This script sets up comprehensive performance monitoring including:
 * - Database connection pooling configuration
 * - Redis cache initialization and optimization
 * - Performance metrics collection setup
 * - Query optimization initialization
 * - Monitoring dashboard data preparation
 */

const fs = require('fs');
const path = require('path');

// Performance monitoring configuration
const MONITORING_CONFIG = {
  database: {
    connectionPooling: {
      enabled: true,
      minConnections: 5,
      maxConnections: 25,
      idleTimeoutMs: 30000,
      connectionTimeoutMs: 5000,
      statementTimeoutMs: 30000
    },
    queryOptimization: {
      enableProfiling: true,
      slowQueryThreshold: 200, // ms
      enableAutoIndexing: process.env.NODE_ENV === 'production',
      cacheQueryPlans: true
    },
    monitoring: {
      collectMetrics: true,
      metricsRetentionDays: 30,
      alertThresholds: {
        connectionUtilization: 80, // percent
        averageQueryTime: 500, // ms
        slowQueryCount: 10
      }
    }
  },
  cache: {
    redis: {
      enabled: true,
      maxMemory: '256mb',
      evictionPolicy: 'allkeys-lru',
      keyExpiration: {
        'portuguese-events': 300, // 5 minutes
        'portuguese-businesses': 1800, // 30 minutes
        'cultural-matches': 900, // 15 minutes
        'api-responses': 600, // 10 minutes
        'user-sessions': 86400 // 24 hours
      }
    },
    monitoring: {
      collectHitRatios: true,
      alertOnLowHitRatio: 70, // percent
      trackMemoryUsage: true,
      trackOperationCounts: true
    }
  },
  api: {
    monitoring: {
      trackResponseTimes: true,
      trackErrorRates: true,
      slowEndpointThreshold: 1000, // ms
      errorRateThreshold: 5 // percent
    },
    rateLimiting: {
      enabled: true,
      windowMs: 60000, // 1 minute
      maxRequests: {
        'portuguese-events': 50,
        'portuguese-businesses': 30,
        'cultural-matching': 20,
        'general': 100
      }
    }
  },
  community: {
    metrics: {
      trackActiveUsers: true,
      trackCulturalEvents: true,
      trackBusinessQueries: true,
      trackMatchingActivity: true,
      trackGeoLocationQueries: true
    },
    alerts: {
      lowActivity: true,
      highErrorRates: true,
      performanceDegradation: true
    }
  }
};

/**
 * Setup database performance monitoring
 */
async function setupDatabaseMonitoring() {
  console.log('🔧 Setting up database performance monitoring...');

  // Create database monitoring configuration
  const dbMonitoringConfig = `
-- Database monitoring configuration for LusoTown Portuguese-speaking Community
-- This configuration enables performance monitoring and optimization

-- Enable pg_stat_statements for query performance tracking
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Configure connection pooling settings
ALTER SYSTEM SET max_connections = '${MONITORING_CONFIG.database.connectionPooling.maxConnections}';
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;
ALTER SYSTEM SET pg_stat_statements.track_utility = on;

-- Configure query optimization settings
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET work_mem = '16MB';
ALTER SYSTEM SET maintenance_work_mem = '128MB';

-- Configure logging for slow queries
ALTER SYSTEM SET log_min_duration_statement = '${MONITORING_CONFIG.database.queryOptimization.slowQueryThreshold}';
ALTER SYSTEM SET log_statement = 'mod';
ALTER SYSTEM SET log_duration = on;
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- Portuguese community specific settings
ALTER SYSTEM SET default_text_search_config = 'portuguese';
ALTER SYSTEM SET timezone = 'Europe/Lisbon';

SELECT pg_reload_conf();
`;

  // Write database configuration
  const dbConfigPath = path.join(__dirname, '..', 'database-monitoring-config.sql');
  fs.writeFileSync(dbConfigPath, dbMonitoringConfig);

  console.log('✅ Database monitoring configuration created');
  return dbConfigPath;
}

/**
 * Setup Redis cache monitoring
 */
async function setupCacheMonitoring() {
  console.log('🔧 Setting up Redis cache monitoring...');

  // Create Redis monitoring configuration
  const redisConfig = `
# Redis configuration for LusoTown Portuguese-speaking Community Performance Monitoring
# This configuration optimizes Redis for Portuguese cultural content caching

# Memory management
maxmemory ${MONITORING_CONFIG.cache.redis.maxMemory}
maxmemory-policy ${MONITORING_CONFIG.cache.redis.evictionPolicy}
maxmemory-samples 10

# Persistence configuration
save 900 1
save 300 10
save 60 10000

# Performance optimizations
tcp-nodelay yes
tcp-keepalive 300

# Logging
loglevel notice
syslog-enabled yes
syslog-ident redis-lusotown

# Portuguese community cache optimization
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64

# Connection settings
timeout 300
tcp-backlog 511

# Memory usage tracking
latency-monitor-threshold 100
`;

  // Write Redis configuration
  const redisConfigPath = path.join(__dirname, '..', 'redis-monitoring.conf');
  fs.writeFileSync(redisConfigPath, redisConfig);

  console.log('✅ Redis monitoring configuration created');
  return redisConfigPath;
}

/**
 * Create performance monitoring environment variables
 */
function createMonitoringEnvironment() {
  console.log('🔧 Creating performance monitoring environment configuration...');

  const envConfig = `
# Performance Monitoring Configuration for LusoTown Portuguese-speaking Community Platform

# Database Performance Monitoring
DB_POOL_MIN_CONNECTIONS=${MONITORING_CONFIG.database.connectionPooling.minConnections}
DB_POOL_MAX_CONNECTIONS=${MONITORING_CONFIG.database.connectionPooling.maxConnections}
DB_POOL_IDLE_TIMEOUT=${MONITORING_CONFIG.database.connectionPooling.idleTimeoutMs}
DB_POOL_CONNECTION_TIMEOUT=${MONITORING_CONFIG.database.connectionPooling.connectionTimeoutMs}
DB_POOL_STATEMENT_TIMEOUT=${MONITORING_CONFIG.database.connectionPooling.statementTimeoutMs}

# Query Optimization Settings
ENABLE_QUERY_PROFILING=${MONITORING_CONFIG.database.queryOptimization.enableProfiling}
SLOW_QUERY_THRESHOLD=${MONITORING_CONFIG.database.queryOptimization.slowQueryThreshold}
ENABLE_AUTO_INDEXING=${MONITORING_CONFIG.database.queryOptimization.enableAutoIndexing}
CACHE_QUERY_PLANS=${MONITORING_CONFIG.database.queryOptimization.cacheQueryPlans}

# Redis Cache Configuration
REDIS_MAX_MEMORY=${MONITORING_CONFIG.cache.redis.maxMemory}
REDIS_EVICTION_POLICY=${MONITORING_CONFIG.cache.redis.evictionPolicy}

# Cache TTL Settings (in seconds)
CACHE_TTL_PORTUGUESE_EVENTS=${MONITORING_CONFIG.cache.redis.keyExpiration['portuguese-events']}
CACHE_TTL_PORTUGUESE_BUSINESSES=${MONITORING_CONFIG.cache.redis.keyExpiration['portuguese-businesses']}
CACHE_TTL_CULTURAL_MATCHES=${MONITORING_CONFIG.cache.redis.keyExpiration['cultural-matches']}
CACHE_TTL_API_RESPONSES=${MONITORING_CONFIG.cache.redis.keyExpiration['api-responses']}
CACHE_TTL_USER_SESSIONS=${MONITORING_CONFIG.cache.redis.keyExpiration['user-sessions']}

# Performance Alert Thresholds
ALERT_CONNECTION_UTILIZATION=${MONITORING_CONFIG.database.monitoring.alertThresholds.connectionUtilization}
ALERT_AVERAGE_QUERY_TIME=${MONITORING_CONFIG.database.monitoring.alertThresholds.averageQueryTime}
ALERT_SLOW_QUERY_COUNT=${MONITORING_CONFIG.database.monitoring.alertThresholds.slowQueryCount}
ALERT_CACHE_HIT_RATIO=${MONITORING_CONFIG.cache.monitoring.alertOnLowHitRatio}
ALERT_API_ERROR_RATE=${MONITORING_CONFIG.api.monitoring.errorRateThreshold}

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=${MONITORING_CONFIG.api.rateLimiting.windowMs}
RATE_LIMIT_EVENTS=${MONITORING_CONFIG.api.rateLimiting.maxRequests['portuguese-events']}
RATE_LIMIT_BUSINESSES=${MONITORING_CONFIG.api.rateLimiting.maxRequests['portuguese-businesses']}
RATE_LIMIT_MATCHING=${MONITORING_CONFIG.api.rateLimiting.maxRequests['cultural-matching']}
RATE_LIMIT_GENERAL=${MONITORING_CONFIG.api.rateLimiting.maxRequests['general']}

# Monitoring Features
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_QUERY_OPTIMIZATION=true
ENABLE_CACHE_MONITORING=true
ENABLE_API_MONITORING=true
ENABLE_COMMUNITY_METRICS=true

# Portuguese Community Specific Settings
ENABLE_CULTURAL_CONTENT_TRACKING=true
ENABLE_GEOLOCATION_OPTIMIZATION=true
ENABLE_PORTUGUESE_TEXT_SEARCH=true
ENABLE_CULTURAL_COMPATIBILITY_CACHING=true

# Development vs Production Settings
PERFORMANCE_MONITORING_LEVEL=${process.env.NODE_ENV === 'production' ? 'detailed' : 'basic'}
LOG_SLOW_QUERIES=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}
ENABLE_QUERY_PLANS=${process.env.NODE_ENV !== 'production' ? 'true' : 'false'}
`;

  const envPath = path.join(__dirname, '..', '.env.performance-monitoring');
  fs.writeFileSync(envPath, envConfig);

  console.log('✅ Performance monitoring environment configuration created');
  return envPath;
}

/**
 * Create performance monitoring initialization script
 */
function createInitializationScript() {
  console.log('🔧 Creating performance monitoring initialization script...');

  const initScript = `#!/bin/bash
# Performance Monitoring Initialization Script for LusoTown Portuguese-speaking Community Platform

echo "🚀 Initializing LusoTown Performance Monitoring..."

# Load environment variables
if [ -f .env.performance-monitoring ]; then
    source .env.performance-monitoring
    echo "✅ Performance monitoring environment loaded"
else
    echo "❌ Performance monitoring environment file not found"
    exit 1
fi

# Initialize database performance monitoring
echo "🔧 Setting up database performance monitoring..."
if [ -f database-monitoring-config.sql ]; then
    psql $DATABASE_URL -f database-monitoring-config.sql
    echo "✅ Database monitoring configured"
else
    echo "⚠️  Database monitoring config not found"
fi

# Apply database performance migration
echo "🔧 Applying database performance optimizations..."
if [ -f scripts/database-performance-migration.sql ]; then
    psql $DATABASE_URL -f scripts/database-performance-migration.sql
    echo "✅ Database performance optimizations applied"
else
    echo "⚠️  Database performance migration not found"
fi

# Start Redis with monitoring configuration
echo "🔧 Starting Redis with monitoring configuration..."
if [ -f redis-monitoring.conf ]; then
    redis-server redis-monitoring.conf --daemonize yes
    echo "✅ Redis monitoring started"
else
    echo "⚠️  Redis monitoring config not found"
fi

# Initialize connection pool
echo "🔧 Initializing database connection pool..."
node -e "
const { initializePortugueseConnectionPool } = require('./src/lib/database-connection-pool');
const pool = initializePortugueseConnectionPool({
    min: process.env.DB_POOL_MIN_CONNECTIONS || 5,
    max: process.env.DB_POOL_MAX_CONNECTIONS || 25
});
console.log('✅ Database connection pool initialized');
"

# Initialize cache manager
echo "🔧 Initializing Redis cache manager..."
node -e "
const { initializePortugueseCacheManager } = require('./src/lib/redis-cache-manager');
const cache = initializePortugueseCacheManager();
console.log('✅ Redis cache manager initialized');
"

# Initialize query optimizer
echo "🔧 Initializing query optimizer..."
node -e "
const { getPortugueseQueryOptimizer } = require('./src/lib/query-optimizer');
const optimizer = getPortugueseQueryOptimizer();
optimizer.autoOptimizeIndexes().then(() => {
    console.log('✅ Query optimizer initialized and indexes optimized');
}).catch(err => {
    console.error('⚠️  Query optimizer initialization failed:', err.message);
});
"

# Warm up caches
echo "🔧 Warming up performance caches..."
node -e "
const { getPortugueseCacheManager } = require('./src/lib/redis-cache-manager');
const cache = getPortugueseCacheManager();
cache.warmCache().then(() => {
    console.log('✅ Performance caches warmed up');
}).catch(err => {
    console.error('⚠️  Cache warming failed:', err.message);
});
"

echo "🎉 LusoTown Performance Monitoring initialization complete!"
echo "📊 Access monitoring dashboard at: http://localhost:3000/admin/monitoring"
echo "🔍 Performance metrics available at: /api/monitoring/performance"
echo "📈 Dashboard data available at: /api/monitoring/dashboard"

# Display current system status
echo ""
echo "📋 Current System Status:"
echo "- Database connections: $DB_POOL_MIN_CONNECTIONS-$DB_POOL_MAX_CONNECTIONS"
echo "- Redis cache: Enabled with $REDIS_MAX_MEMORY memory limit"
echo "- Query optimization: $([ "$ENABLE_QUERY_PROFILING" = "true" ] && echo "Enabled" || echo "Disabled")"
echo "- Performance monitoring: $([ "$ENABLE_PERFORMANCE_MONITORING" = "true" ] && echo "Active" || echo "Inactive")"
echo "- Portuguese content optimization: $([ "$ENABLE_CULTURAL_CONTENT_TRACKING" = "true" ] && echo "Enabled" || echo "Disabled")"
`;

  const initScriptPath = path.join(__dirname, '..', 'init-performance-monitoring.sh');
  fs.writeFileSync(initScriptPath, initScript);
  
  // Make script executable
  fs.chmodSync(initScriptPath, '755');

  console.log('✅ Performance monitoring initialization script created');
  return initScriptPath;
}

/**
 * Create monitoring documentation
 */
function createMonitoringDocumentation() {
  console.log('🔧 Creating performance monitoring documentation...');

  const documentation = `# Performance Monitoring Setup for LusoTown Portuguese-speaking Community Platform

## Overview

This document outlines the comprehensive performance monitoring system implemented for the LusoTown platform, specifically optimized for Portuguese-speaking community features.

## Components

### 1. Database Performance Monitoring

#### Connection Pool Management
- **Pool Size**: ${MONITORING_CONFIG.database.connectionPooling.minConnections}-${MONITORING_CONFIG.database.connectionPooling.maxConnections} connections
- **Timeout Settings**: ${MONITORING_CONFIG.database.connectionPooling.connectionTimeoutMs}ms connection, ${MONITORING_CONFIG.database.connectionPooling.idleTimeoutMs}ms idle
- **Statement Timeout**: ${MONITORING_CONFIG.database.connectionPooling.statementTimeoutMs}ms

#### Query Optimization
- **Slow Query Threshold**: ${MONITORING_CONFIG.database.queryOptimization.slowQueryThreshold}ms
- **Auto-indexing**: ${MONITORING_CONFIG.database.queryOptimization.enableAutoIndexing ? 'Enabled in production' : 'Disabled'}
- **Query Plan Caching**: ${MONITORING_CONFIG.database.queryOptimization.cacheQueryPlans ? 'Enabled' : 'Disabled'}

#### Performance Metrics
- Query execution time tracking
- Connection pool utilization monitoring
- Slow query identification and logging
- Portuguese cultural content query optimization

### 2. Redis Cache Monitoring

#### Memory Management
- **Max Memory**: ${MONITORING_CONFIG.cache.redis.maxMemory}
- **Eviction Policy**: ${MONITORING_CONFIG.cache.redis.evictionPolicy}
- **Hit Ratio Monitoring**: Alert when below ${MONITORING_CONFIG.cache.monitoring.alertOnLowHitRatio}%

#### Cache TTL Configuration
- Portuguese Events: ${MONITORING_CONFIG.cache.redis.keyExpiration['portuguese-events']}s
- Portuguese Businesses: ${MONITORING_CONFIG.cache.redis.keyExpiration['portuguese-businesses']}s
- Cultural Matches: ${MONITORING_CONFIG.cache.redis.keyExpiration['cultural-matches']}s
- API Responses: ${MONITORING_CONFIG.cache.redis.keyExpiration['api-responses']}s
- User Sessions: ${MONITORING_CONFIG.cache.redis.keyExpiration['user-sessions']}s

### 3. API Performance Monitoring

#### Response Time Tracking
- **Slow Endpoint Threshold**: ${MONITORING_CONFIG.api.monitoring.slowEndpointThreshold}ms
- **Error Rate Alert**: ${MONITORING_CONFIG.api.monitoring.errorRateThreshold}%
- **Rate Limiting**: ${MONITORING_CONFIG.api.rateLimiting.windowMs}ms windows

#### Portuguese Community Endpoints
- Events API: ${MONITORING_CONFIG.api.rateLimiting.maxRequests['portuguese-events']} requests/minute
- Business Directory: ${MONITORING_CONFIG.api.rateLimiting.maxRequests['portuguese-businesses']} requests/minute
- Cultural Matching: ${MONITORING_CONFIG.api.rateLimiting.maxRequests['cultural-matching']} requests/minute

### 4. Community Metrics Tracking

#### User Activity
- Active user count monitoring
- Cultural event participation tracking
- Business directory query analytics
- Geolocation search patterns

#### Performance Indicators
- Portuguese content engagement rates
- Cultural compatibility matching success
- UK Portuguese business discovery metrics
- Platform response times for community features

## Setup Instructions

### 1. Initialize Performance Monitoring

\`\`\`bash
# Run the initialization script
./init-performance-monitoring.sh
\`\`\`

### 2. Configure Environment

\`\`\`bash
# Load performance monitoring environment
source .env.performance-monitoring
\`\`\`

### 3. Apply Database Optimizations

\`\`\`bash
# Apply performance migration
psql $DATABASE_URL -f scripts/database-performance-migration.sql
\`\`\`

### 4. Start Services

\`\`\`bash
# Start the application with performance monitoring
npm run dev

# Or for production
npm run start
\`\`\`

## Monitoring Endpoints

### Performance Metrics API
- **URL**: \`/api/monitoring/performance\`
- **Method**: GET
- **Description**: Comprehensive performance metrics including database, cache, and API statistics

### Monitoring Dashboard API
- **URL**: \`/api/monitoring/dashboard\`
- **Method**: GET
- **Description**: Real-time dashboard data with Portuguese community activity metrics

### Health Check API
- **URL**: \`/api/monitoring/health\`
- **Method**: GET
- **Description**: System health status including Portuguese community features

## Performance Thresholds

### Alerts Configuration
- **Database Connection Utilization**: Alert at ${MONITORING_CONFIG.database.monitoring.alertThresholds.connectionUtilization}%
- **Average Query Time**: Alert at ${MONITORING_CONFIG.database.monitoring.alertThresholds.averageQueryTime}ms
- **Cache Hit Ratio**: Alert below ${MONITORING_CONFIG.cache.monitoring.alertOnLowHitRatio}%
- **API Error Rate**: Alert above ${MONITORING_CONFIG.api.monitoring.errorRateThreshold}%

### Optimization Targets
- **Query Response Time**: <200ms for Portuguese cultural queries
- **Cache Hit Ratio**: >80% for frequently accessed Portuguese content
- **Connection Pool Efficiency**: <80% utilization under normal load
- **API Response Time**: <500ms for Portuguese community endpoints

## Troubleshooting

### Common Issues

#### High Database Connection Usage
- Check connection pool configuration
- Review long-running queries
- Verify proper connection release

#### Low Cache Hit Ratio
- Review TTL settings for Portuguese content
- Check cache warming procedures
- Verify cache invalidation patterns

#### Slow API Responses
- Check database query performance
- Review cache effectiveness
- Verify rate limiting configuration

### Performance Optimization

#### Database Optimization
- Ensure proper indexing for Portuguese cultural queries
- Monitor query execution plans
- Optimize PostGIS geolocation queries

#### Cache Optimization
- Implement cache warming for popular Portuguese content
- Optimize TTL values based on content update frequency
- Use cache tags for efficient invalidation

#### API Optimization
- Implement response compression
- Use CDN for static Portuguese cultural content
- Optimize database queries for community features

## Maintenance

### Regular Tasks
- Monitor slow query logs
- Review cache hit ratios
- Update performance thresholds
- Optimize database indexes
- Clean up old performance data

### Scheduled Jobs
- Daily: Update table statistics
- Weekly: Clean up old performance data
- Monthly: Review and optimize indexes
- Quarterly: Performance audit and optimization

## Dashboard Access

The performance monitoring dashboard provides real-time insights into:
- System health and uptime
- Portuguese community activity metrics
- Database and cache performance
- API response times and error rates
- Performance trends and alerts

Access the dashboard at: \`http://localhost:3000/admin/monitoring\`
`;

  const docsPath = path.join(__dirname, '..', 'PERFORMANCE_MONITORING_SETUP.md');
  fs.writeFileSync(docsPath, documentation);

  console.log('✅ Performance monitoring documentation created');
  return docsPath;
}

/**
 * Main setup function
 */
async function setupPerformanceMonitoring() {
  console.log('🚀 Setting up comprehensive performance monitoring for LusoTown Portuguese-speaking Community Platform...\n');

  try {
    // Setup database monitoring
    const dbConfigPath = await setupDatabaseMonitoring();
    
    // Setup cache monitoring
    const redisConfigPath = await setupCacheMonitoring();
    
    // Create environment configuration
    const envPath = createMonitoringEnvironment();
    
    // Create initialization script
    const initScriptPath = createInitializationScript();
    
    // Create documentation
    const docsPath = createMonitoringDocumentation();

    console.log('\n🎉 Performance monitoring setup completed successfully!\n');
    
    console.log('📁 Generated Files:');
    console.log(`   Database Config: ${dbConfigPath}`);
    console.log(`   Redis Config: ${redisConfigPath}`);
    console.log(`   Environment Config: ${envPath}`);
    console.log(`   Initialization Script: ${initScriptPath}`);
    console.log(`   Documentation: ${docsPath}\n`);
    
    console.log('🚀 Next Steps:');
    console.log('   1. Review generated configuration files');
    console.log('   2. Set up environment variables: source .env.performance-monitoring');
    console.log('   3. Initialize monitoring: ./init-performance-monitoring.sh');
    console.log('   4. Start the application: npm run dev');
    console.log('   5. Access monitoring dashboard: http://localhost:3000/admin/monitoring\n');
    
    console.log('📊 Performance Monitoring Features:');
    console.log('   ✅ Database connection pool management');
    console.log('   ✅ Redis cache performance tracking');
    console.log('   ✅ Query optimization with auto-indexing');
    console.log('   ✅ API response time monitoring');
    console.log('   ✅ Portuguese community metrics tracking');
    console.log('   ✅ Real-time performance dashboard');
    console.log('   ✅ Automated alerts and recommendations\n');

    return {
      success: true,
      files: {
        dbConfig: dbConfigPath,
        redisConfig: redisConfigPath,
        environment: envPath,
        initScript: initScriptPath,
        documentation: docsPath
      },
      config: MONITORING_CONFIG
    };

  } catch (error) {
    console.error('❌ Performance monitoring setup failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run setup if called directly
if (require.main === module) {
  setupPerformanceMonitoring()
    .then(result => {
      if (result.success) {
        process.exit(0);
      } else {
        console.error('Setup failed:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = {
  setupPerformanceMonitoring,
  MONITORING_CONFIG
};