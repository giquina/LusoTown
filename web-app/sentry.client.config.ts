/**
 * Sentry Client Configuration for LusoTown Platform
 * Handles error tracking for Portuguese community features on the client side
 */

import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING } from '@/config/error-monitoring'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: ERROR_MONITORING.sampleRate,
  
  // Session replay for debugging
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  
  // Error filtering and preprocessing
  beforeSend(event, hint) {
    // Apply the configured beforeSend filter
    if (ERROR_MONITORING.beforeSend) {
      event = ERROR_MONITORING.beforeSend(event)
    }
    
    // Filter out Portuguese community irrelevant errors
    if (event.message && event.message.includes('ResizeObserver loop limit exceeded')) {
      return null
    }
    
    // Filter out development-only errors
    if (process.env.NODE_ENV !== 'production' && event.message?.includes('HMR')) {
      return null
    }
    
    // Add Portuguese community context
    event.contexts = {
      ...event.contexts,
      lusotown: {
        platform: 'web',
        community_focus: 'portuguese-speaking',
        target_region: 'united_kingdom'
      }
    }
    
    // Add language context if available
    if (typeof window !== 'undefined') {
      const currentLang = localStorage.getItem('preferred-language') || 'en'
      event.contexts.language = {
        current: currentLang,
        available: ['en', 'pt']
      }
    }
    
    return event
  },
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: ERROR_MONITORING.environment,
  
  // Additional integrations for Portuguese community features
  integrations: [
    // Web Vitals for performance monitoring
    new Sentry.BrowserTracing({
      tracingOrigins: [
        'localhost',
        /^https:\/\/lusotown/,
        /^https:\/\/.*\.vercel\.app/,
      ],
    }),
    
    // Session replay for debugging Portuguese cultural interactions
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Tag all events with Portuguese community context
  initialScope: {
    tags: {
      component: 'lusotown-web',
      community: 'portuguese-speaking',
      region: 'united-kingdom'
    }
  },
  
  // Maximum breadcrumbs
  maxBreadcrumbs: ERROR_MONITORING.maxBreadcrumbs,
  
  // Capture console errors
  captureUnhandledRejections: true,
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
})