# Performance Monitoring Setup for LusoTown Portuguese-speaking Community Platform

## Overview

This document outlines the comprehensive performance monitoring system implemented for the LusoTown platform, specifically optimized for Portuguese-speaking community features.

## Components

### 1. Database Performance Monitoring

#### Connection Pool Management
- **Pool Size**: 5-25 connections
- **Timeout Settings**: 5000ms connection, 30000ms idle
- **Statement Timeout**: 30000ms

#### Query Optimization
- **Slow Query Threshold**: 200ms
- **Auto-indexing**: Disabled
- **Query Plan Caching**: Enabled

#### Performance Metrics
- Query execution time tracking
- Connection pool utilization monitoring
- Slow query identification and logging
- Portuguese cultural content query optimization

### 2. Redis Cache Monitoring

#### Memory Management
- **Max Memory**: 256mb
- **Eviction Policy**: allkeys-lru
- **Hit Ratio Monitoring**: Alert when below 70%

#### Cache TTL Configuration
- Portuguese Events: 300s
- Portuguese Businesses: 1800s
- Cultural Matches: 900s
- API Responses: 600s
- User Sessions: 86400s

### 3. API Performance Monitoring

#### Response Time Tracking
- **Slow Endpoint Threshold**: 1000ms
- **Error Rate Alert**: 5%
- **Rate Limiting**: 60000ms windows

#### Portuguese Community Endpoints
- Events API: 50 requests/minute
- Business Directory: 30 requests/minute
- Cultural Matching: 20 requests/minute

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

```bash
# Run the initialization script
./init-performance-monitoring.sh
```

### 2. Configure Environment

```bash
# Load performance monitoring environment
source .env.performance-monitoring
```

### 3. Apply Database Optimizations

```bash
# Apply performance migration
psql $DATABASE_URL -f scripts/database-performance-migration.sql
```

### 4. Start Services

```bash
# Start the application with performance monitoring
npm run dev

# Or for production
npm run start
```

## Monitoring Endpoints

### Performance Metrics API
- **URL**: `/api/monitoring/performance`
- **Method**: GET
- **Description**: Comprehensive performance metrics including database, cache, and API statistics

### Monitoring Dashboard API
- **URL**: `/api/monitoring/dashboard`
- **Method**: GET
- **Description**: Real-time dashboard data with Portuguese community activity metrics

### Health Check API
- **URL**: `/api/monitoring/health`
- **Method**: GET
- **Description**: System health status including Portuguese community features

## Performance Thresholds

### Alerts Configuration
- **Database Connection Utilization**: Alert at 80%
- **Average Query Time**: Alert at 500ms
- **Cache Hit Ratio**: Alert below 70%
- **API Error Rate**: Alert above 5%

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

Access the dashboard at: `http://localhost:3000/admin/monitoring`
