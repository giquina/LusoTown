#!/bin/bash
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
