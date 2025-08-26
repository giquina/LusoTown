/**
 * Next.js Instrumentation File
 * Initializes Sentry and other monitoring tools for Portuguese community platform
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation
    await import('./sentry.server.config')
    
    // Initialize Portuguese community monitoring
    console.log('✅ Portuguese community monitoring initialized (server)')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    await import('./sentry.edge.config')
    
    console.log('✅ Portuguese community monitoring initialized (edge)')
  }
}