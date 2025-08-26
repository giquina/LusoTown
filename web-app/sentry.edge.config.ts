/**
 * Sentry Edge Runtime Configuration for LusoTown Platform
 * Handles error tracking for Portuguese community Edge API routes
 */

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Minimal configuration for Edge runtime
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: process.env.NODE_ENV,
  
  // Edge runtime specific context
  initialScope: {
    tags: {
      component: 'lusotown-edge',
      community: 'portuguese-speaking',
      runtime: 'edge'
    }
  },
  
  // Debug mode for development
  debug: process.env.NODE_ENV === 'development',
})