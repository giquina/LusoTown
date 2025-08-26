/**
 * Sentry Server Configuration for LusoTown Platform
 * Handles error tracking for Portuguese community features on the server side
 */

import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING } from '@/config/error-monitoring'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Performance monitoring for Portuguese community API endpoints
  tracesSampleRate: ERROR_MONITORING.sampleRate,
  
  // Profiling for performance insights
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
  
  // Error filtering for server-side operations
  beforeSend(event) {
    // Apply the configured beforeSend filter
    if (ERROR_MONITORING.beforeSend) {
      event = ERROR_MONITORING.beforeSend(event)
    }
    
    // Filter out database connection pool warnings
    if (event.message?.includes('Connection pool timeout')) {
      return null
    }
    
    // Add Portuguese community context
    event.contexts = {
      ...event.contexts,
      lusotown: {
        platform: 'api',
        community_focus: 'portuguese-speaking',
        target_region: 'united_kingdom',
        database: 'supabase-postgresql'
      }
    }
    
    return event
  },
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: ERROR_MONITORING.environment,
  
  // Server-side integrations
  integrations: [
    // Performance monitoring for API routes
    new Sentry.ProfilingIntegration(),
  ],
  
  // Tag all server events
  initialScope: {
    tags: {
      component: 'lusotown-api',
      community: 'portuguese-speaking',
      region: 'united-kingdom',
      runtime: 'nodejs'
    }
  },
  
  // Maximum breadcrumbs for server operations
  maxBreadcrumbs: ERROR_MONITORING.maxBreadcrumbs,
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
})