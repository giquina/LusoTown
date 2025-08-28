# Database Performance Service - Portuguese Community Platform

## Overview

The Database Performance Service provides comprehensive monitoring and optimization for the LusoTown Portuguese-speaking community platform. This service is designed specifically for the simplified, community-focused database schema that supports our 4 core systems:

1. **Community Events** - Portuguese cultural event discovery and booking
2. **Business Directory** - PostGIS-powered Portuguese business listings  
3. **Simple Cultural Matching** - Basic compatibility for community connections
4. **Transport Coordination** - Community transport sharing and coordination

## Quick Start

### Basic Usage

```typescript
import DatabasePerformanceService from '@/services/DatabasePerformanceService';

// Initialize the service
const dbService = new DatabasePerformanceService();

// Get community platform metrics
const metrics = await dbService.getCommunityPlatformMetrics();
console.log('Community Health:', {
  activeUsers: metrics.total_active_users,
  upcomingEvents: metrics.upcoming_events,
  mutualMatches: metrics.mutual_matches
});

// Check overall database health
const health = await dbService.getDatabaseHealth();
console.log('Database Health Score:', health.overall_score + '%');
```

### Performance Monitoring Dashboard

```typescript
import { createPerformanceDashboard } from '@/services/DatabasePerformanceExample';

// Create comprehensive dashboard
const dashboard = await createPerformanceDashboard();

// Use in your admin interface
export default function AdminDashboard() {
  const [performanceData, setPerformanceData] = useState(null);
  
  useEffect(() => {
    createPerformanceDashboard()
      .then(setPerformanceData)
      .catch(console.error);
  }, []);
  
  return (
    <div className="performance-dashboard">
      <h2>Portuguese Community Platform Health</h2>
      {performanceData && (
        <>
          <MetricCard 
            title="Database Health" 
            value={performanceData.systemHealth.overall_score + '%'}
            status={performanceData.systemHealth.overall_score > 80 ? 'good' : 'warning'}
          />
          <MetricCard 
            title="Active Users" 
            value={performanceData.communityMetrics.total_active_users}
            status="info"
          />
          <MetricCard 
            title="Upcoming Events" 
            value={performanceData.communityMetrics.upcoming_events}
            status={performanceData.communityMetrics.upcoming_events > 10 ? 'good' : 'warning'}
          />
        </>
      )}
    </div>
  );
}
```

## Core Features

### 1. Community Platform Metrics

Monitor the health and growth of the Portuguese-speaking community:

```typescript
const metrics = await dbService.getCommunityPlatformMetrics();

// Available metrics:
// - total_active_users: Active Portuguese speakers
// - weekly_new_users: New registrations this week
// - verified_users: Heritage-verified community members
// - published_events: Active Portuguese cultural events
// - upcoming_events: Events in the next 30 days
// - mutual_matches: Successful cultural connections
// - available_transport: Active transport coordination options
// - university_partnerships: Number of active university partnerships (8)
```

### 2. Performance Analysis by Core System

#### Business Directory (PostGIS Performance)
```typescript
const businessMetrics = await dbService.getBusinessDirectoryPerformance();

// Monitors:
// - Location-based search performance (<100ms target)
// - PostGIS spatial query optimization
// - Business verification and filtering efficiency
// - Results relevance and count
```

#### Community Events Discovery
```typescript
const eventMetrics = await dbService.getEventDiscoveryPerformance();

// Monitors:
// - Event search and filtering performance (<80ms target)
// - Geographic radius queries
// - Cultural category filtering efficiency
// - Portuguese region personalization
```

#### Cultural Matching System
```typescript
const matchingMetrics = await dbService.getCulturalMatchingPerformance();

// Monitors:
// - Compatibility calculation performance (<50ms target)
// - Batch matching efficiency
// - Cultural preferences indexing
// - Match quality and relevance
```

#### Transport Coordination
```typescript
const transportMetrics = await dbService.getTransportCoordinationPerformance();

// Monitors:
// - Transport search performance (<70ms target)
// - Route and schedule filtering
// - Availability status queries
// - Event integration efficiency
```

### 3. Automated Performance Alerting

```typescript
import { setupPerformanceAlerting } from '@/services/DatabasePerformanceExample';

// Setup automated monitoring with alerts
const alertConfig = await setupPerformanceAlerting();

// Alert categories:
// - CRITICAL: Database failures, connection issues
// - PERFORMANCE: Slow queries, optimization needs  
// - COMMUNITY_GROWTH: Low engagement, registration issues
// - MAINTENANCE: Table bloat, index optimization needs
```

### 4. Database Health Analysis

```typescript
const health = await dbService.getDatabaseHealth();

// Comprehensive health check including:
// - Overall performance score (0-100%)
// - Table sizes and growth patterns
// - Index usage efficiency
// - Query performance analysis
// - Slow query identification
```

### 5. University Integration Monitoring

```typescript
const universityMetrics = await dbService.getUniversityIntegrationMetrics();

// Monitors 8 university partnerships:
// - Student registration and verification
// - Partnership status and activity
// - Portuguese student participation rates
// - University-specific event engagement
```

## Database Migrations

The service works with the simplified database schema created by these migrations:

1. **`20250828_002_simplified_user_profiles.sql`** - Removes over-engineered systems, focuses on community essentials
2. **`20250828_003_performance_monitoring_functions.sql`** - Adds monitoring functions and views

### Key Optimizations Made:

- **Removed ~15,000 lines** of misaligned code (NFT, Creator Economy, E-commerce, Luxury branding, Complex AI, VR/AR)
- **Simplified to 4 core systems** serving Portuguese community needs
- **Performance indexes** optimized for <100ms query responses
- **PostGIS optimization** for UK Portuguese business directory
- **Cultural authenticity focus** removing luxury/elite distinctions

## Performance Targets

| System | Target Performance | Current Status |
|--------|-------------------|----------------|
| Business Directory Search | <100ms | ✅ Optimized |
| Event Discovery | <80ms | ✅ Optimized |
| Cultural Matching | <50ms | ✅ Optimized |
| Transport Coordination | <70ms | ✅ Optimized |
| University Integration | <30ms | ✅ Optimized |

## Integration with Existing Code

### API Routes Integration

```typescript
// pages/api/admin/performance.ts
import DatabasePerformanceService from '@/services/DatabasePerformanceService';

export default async function handler(req: NextRequest) {
  const dbService = new DatabasePerformanceService();
  
  try {
    const metrics = await dbService.getCommunityPlatformMetrics();
    const health = await dbService.getDatabaseHealth();
    
    return NextResponse.json({
      community: metrics,
      health: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Performance monitoring failed' }, { status: 500 });
  }
}
```

### React Component Integration

```typescript
// components/admin/PerformanceMonitor.tsx
import { useEffect, useState } from 'react';
import DatabasePerformanceService from '@/services/DatabasePerformanceService';

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const dbService = new DatabasePerformanceService();
    
    const fetchMetrics = async () => {
      try {
        const [community, health] = await Promise.all([
          dbService.getCommunityPlatformMetrics(),
          dbService.getDatabaseHealth()
        ]);
        
        setMetrics({ community, health });
      } catch (error) {
        console.error('Failed to fetch performance metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
    
    // Set up periodic refresh (every 5 minutes)
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  if (loading) return <div>Loading performance metrics...</div>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard 
        title="Active Users" 
        value={metrics.community.total_active_users}
        change={`+${metrics.community.weekly_new_users} this week`}
        status="good"
      />
      <MetricCard 
        title="Database Health" 
        value={metrics.health.overall_score + '%'}
        status={metrics.health.overall_score > 80 ? 'good' : 'warning'}
      />
      <MetricCard 
        title="Upcoming Events" 
        value={metrics.community.upcoming_events}
        status={metrics.community.upcoming_events > 10 ? 'good' : 'warning'}
      />
      <MetricCard 
        title="Community Matches" 
        value={metrics.community.mutual_matches}
        status="info"
      />
    </div>
  );
}
```

## Environment Configuration

Add these environment variables for enhanced monitoring:

```env
# Optional: Custom Supabase connection for monitoring
MONITORING_SUPABASE_URL=your_supabase_url
MONITORING_SUPABASE_KEY=your_service_role_key

# Performance alerting configuration
PERFORMANCE_ALERT_THRESHOLD_MS=100
COMMUNITY_GROWTH_ALERT_THRESHOLD=5
DATABASE_HEALTH_ALERT_THRESHOLD=80
```

## Best Practices

### 1. Regular Monitoring

Set up automated monitoring that runs every 5-10 minutes:

```typescript
import { startRealTimeMonitoring } from '@/services/DatabasePerformanceExample';

// In your monitoring service or admin dashboard
const stopMonitoring = await startRealTimeMonitoring(5); // 5-minute intervals
```

### 2. Performance Optimization

Use the optimization recommendations:

```typescript
const recommendations = await dbService.getOptimizationRecommendations();

// Prioritize critical issues first
if (recommendations.critical.length > 0) {
  console.log('🚨 Critical issues require immediate attention');
  // Send alerts to administrators
}
```

### 3. Community Growth Tracking

Monitor Portuguese community growth patterns:

```typescript
import { analyzeCommunityGrowth } from '@/services/DatabasePerformanceExample';

const growth = await analyzeCommunityGrowth();
console.log('Portuguese Community Growth Analysis:', growth.analysis);
```

### 4. Maintenance Automation

Regular database maintenance for optimal performance:

```typescript
import { performDatabaseMaintenance } from '@/services/DatabasePerformanceExample';

// Run weekly during low-traffic periods
const maintenance = await performDatabaseMaintenance();
console.log('Maintenance Status:', maintenance.recommendations);
```

## Troubleshooting

### Common Issues

1. **Slow Business Directory Searches**
   - Check PostGIS spatial indexes
   - Verify UK geographic bounds filtering
   - Review business verification status filters

2. **Event Discovery Performance Issues**
   - Optimize temporal indexes on start_datetime
   - Check Portuguese region filtering efficiency
   - Review cultural category indexing

3. **Cultural Matching Delays**
   - Refresh cultural_preferences GIN indexes
   - Consider compatibility score caching
   - Optimize batch matching queries

4. **Transport Coordination Problems**
   - Check departure_datetime indexes
   - Optimize route and availability filtering
   - Review event integration queries

### Performance Debugging

```typescript
// Enable detailed performance logging
await dbService.logPerformanceMetrics(
  'business_directory_search',
  executionTimeMs,
  resultCount,
  { user_location: 'London', radius_km: 10 }
);
```

## Contributing

When adding new features to the Portuguese community platform:

1. **Add performance monitoring** for new database queries
2. **Include performance tests** for new functionality  
3. **Update monitoring thresholds** based on expected usage
4. **Document performance characteristics** in code comments

## Support

For questions about the Database Performance Service:

1. Check the example usage in `DatabasePerformanceExample.ts`
2. Review migration files for schema understanding
3. Monitor logs for performance patterns
4. Use the built-in recommendation engine for optimization guidance

The performance service is specifically designed for the Portuguese-speaking community platform's simplified, community-focused architecture.