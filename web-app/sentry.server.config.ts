/**
 * Sentry Server Configuration for LusoTown Platform
 * Comprehensive server-side error tracking for Portuguese community features
 */

import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING, PORTUGUESE_ERROR_CONTEXTS, ERROR_CATEGORIES } from '@/config/error-monitoring'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

// Server-side Portuguese community context detection
function getServerPortugueseContext(request?: any): Record<string, any> {
  const context: Record<string, any> = {
    server: true,
    runtime: 'nodejs',
    database: 'supabase-postgresql'
  };

  if (request) {
    // Extract Portuguese community indicators from request
    const acceptLanguage = request.headers?.get?.('accept-language') || 
                          request.headers?.['accept-language'] || '';
    const userAgent = request.headers?.get?.('user-agent') || 
                     request.headers?.['user-agent'] || '';
    const referer = request.headers?.get?.('referer') || 
                   request.headers?.['referer'] || '';
    
    context.isPortugueseRequest = acceptLanguage.includes('pt');
    context.userAgent = userAgent.substring(0, 100); // Truncate for privacy
    context.hasPortugueseReferer = referer.includes('business-directory') || 
                                  referer.includes('events') || 
                                  referer.includes('cultural');
  }

  return context;
}

// Enhanced error categorization for Portuguese API endpoints
function categorizeAPIError(event: Sentry.Event): Record<string, string> {
  const tags: Record<string, string> = {};
  const request = event.request;
  const url = request?.url || '';
  const path = new URL(url || 'http://localhost').pathname;

  // Portuguese community API endpoint classification
  if (path.includes('/api/business-directory')) {
    tags['api.category'] = 'portuguese-business-directory';
    tags['error.priority'] = 'critical';
    tags['error.context'] = PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY;
  } else if (path.includes('/api/events')) {
    tags['api.category'] = 'lusophone-events';
    tags['error.priority'] = 'high';
    tags['error.context'] = PORTUGUESE_ERROR_CONTEXTS.EVENT_BOOKING;
  } else if (path.includes('/api/messaging') || path.includes('/api/community')) {
    tags['api.category'] = 'community-messaging';
    tags['error.priority'] = 'high';
    tags['error.context'] = PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT;
  } else if (path.includes('/api/auth')) {
    tags['api.category'] = 'authentication';
    tags['error.priority'] = 'critical';
    tags['error.context'] = 'auth-system';
  } else if (path.includes('/api/cultural') || path.includes('/api/matching')) {
    tags['api.category'] = 'cultural-matching';
    tags['error.priority'] = 'critical';
    tags['error.context'] = PORTUGUESE_ERROR_CONTEXTS.CULTURAL_MATCHING;
  } else if (path.includes('/api/admin')) {
    tags['api.category'] = 'admin-functions';
    tags['error.priority'] = 'critical';
    tags['error.context'] = 'admin-operations';
  }

  // Database operation detection
  if (event.message?.includes('supabase') || event.message?.includes('postgresql')) {
    tags['database.operation'] = 'true';
    tags['error.database'] = 'supabase';
  }

  return tags;
}

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Enhanced performance monitoring for Portuguese community API endpoints
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.05'),
  
  // Server-side profiling for performance insights
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.02 : 0.1,
  
  // Advanced error filtering for server-side operations
  beforeSend(event, hint) {
    // Apply base configuration filter
    if (ERROR_MONITORING.beforeSend) {
      event = ERROR_MONITORING.beforeSend(event);
      if (!event) return null;
    }
    
    // Add Portuguese community server context
    const request = event.request || hint.originalException?.request;
    event.contexts = {
      ...event.contexts,
      lusotown: {
        platform: 'api',
        community_focus: 'portuguese-speaking',
        target_region: 'united_kingdom',
        ...getServerPortugueseContext(request)
      }
    };
    
    // Enhanced API error categorization
    const apiTags = categorizeAPIError(event);
    event.tags = { ...event.tags, ...apiTags };
    
    // Filter out non-critical server errors in production
    if (process.env.NODE_ENV === 'production') {
      // Filter database connection pool warnings
      if (event.message?.includes('Connection pool timeout') ||
          event.message?.includes('Connection terminated unexpectedly') ||
          event.message?.includes('Connection closed')) {
        return null;
      }
      
      // Filter Next.js development warnings
      if (event.message?.includes('HMR') ||
          event.message?.includes('Hot reload') ||
          event.message?.includes('webpack-hmr')) {
        return null;
      }
      
      // Filter common Supabase info messages
      if (event.level === 'info' && event.message?.includes('supabase')) {
        return null;
      }
    }
    
    // Escalate Portuguese community API errors
    if (apiTags['api.category']?.includes('portuguese') || 
        apiTags['api.category']?.includes('cultural') ||
        apiTags['api.category']?.includes('business-directory')) {
      
      event.level = 'error';
      event.tags = {
        ...event.tags,
        'error.escalated': 'true',
        'error.community': 'portuguese'
      };
      
      // Enhanced fingerprinting for Portuguese API errors
      const path = event.request?.url ? new URL(event.request.url).pathname : 'unknown';
      event.fingerprint = [
        apiTags['error.context'] || 'api-error',
        path,
        event.message || 'server-error'
      ];
    }
    
    // Add database context for Supabase errors
    if (event.message?.includes('supabase') || event.message?.includes('postgresql')) {
      event.contexts = {
        ...event.contexts,
        database: {
          type: 'postgresql',
          provider: 'supabase',
          operation: event.message?.includes('SELECT') ? 'read' : 
                    event.message?.includes('INSERT') ? 'create' :
                    event.message?.includes('UPDATE') ? 'update' :
                    event.message?.includes('DELETE') ? 'delete' : 'unknown'
        }
      };
    }
    
    return event;
  },
  
  // Enhanced breadcrumb filtering for server operations
  beforeBreadcrumb(breadcrumb, hint) {
    // Enhanced breadcrumbs for Portuguese community API operations
    if (breadcrumb.category === 'http' || breadcrumb.category === 'fetch') {
      const url = breadcrumb.data?.url || '';
      
      // Enhance Portuguese API breadcrumbs
      if (url.includes('business-directory') ||
          url.includes('events') ||
          url.includes('cultural') ||
          url.includes('matching')) {
        
        breadcrumb.level = 'info';
        breadcrumb.data = {
          ...breadcrumb.data,
          'portuguese.api': true,
          'community.operation': true
        };
      }
      
      // Track database operations
      if (url.includes('supabase') || breadcrumb.message?.includes('postgresql')) {
        breadcrumb.data = {
          ...breadcrumb.data,
          'database.operation': true,
          'database.provider': 'supabase'
        };
      }
    }
    
    // Filter noisy server breadcrumbs in production
    if (process.env.NODE_ENV === 'production') {
      if (breadcrumb.category === 'console' && breadcrumb.level !== 'error') {
        return null;
      }
      
      // Keep only important HTTP requests
      if (breadcrumb.category === 'http') {
        const url = breadcrumb.data?.url || '';
        const method = breadcrumb.data?.method || '';
        
        // Keep Portuguese community API calls and errors
        if (!url.includes('/api/') || 
            (method === 'GET' && !url.includes('business') && !url.includes('events'))) {
          return null;
        }
      }
    }
    
    return breadcrumb;
  },
  
  // Release and environment tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: ERROR_MONITORING.environment,
  
  // Enhanced server-side integrations
  integrations: [
    // Advanced performance monitoring for API routes
    new Sentry.ProfilingIntegration(),
    
    // HTTP integration for API request tracking
    new Sentry.Integrations.Http({
      tracing: true,
      breadcrumbs: true
    }),
    
    // Console integration for server logs
    new Sentry.Integrations.Console({
      levels: ['error', 'warn']
    })
  ],
  
  // Enhanced server scope
  initialScope: {
    tags: {
      component: 'lusotown-api',
      community: 'portuguese-speaking',
      region: 'united-kingdom',
      runtime: 'nodejs',
      platform: 'vercel'
    },
    contexts: {
      app: {
        name: 'LusoTown London API',
        version: process.env.npm_package_version || '1.0.0'
      },
      runtime: {
        name: 'nodejs',
        version: process.version
      },
      server: {
        host: process.env.VERCEL_URL || 'localhost',
        environment: process.env.NODE_ENV || 'development'
      }
    }
  },
  
  // Configuration
  maxBreadcrumbs: ERROR_MONITORING.maxBreadcrumbs,
  captureUnhandledRejections: true,
  debug: process.env.NODE_ENV === 'development',
  
  // Transport options for server reliability
  transportOptions: {
    // Timeout for sending events
    timeout: 5000,
    // Buffer size for offline events
    bufferSize: 100
  }
});

// Export Sentry for manual server-side error reporting
export { Sentry };

// Portuguese community API error reporting functions
export const reportAPIError = (
  error: Error,
  context: {
    endpoint?: string;
    method?: string;
    userId?: string;
    requestData?: any;
    isPortugueseUser?: boolean;
  } = {}
) => {
  Sentry.withScope((scope) => {
    // Sanitize request data
    const sanitizedData = context.requestData ? {
      hasData: !!context.requestData,
      dataKeys: Object.keys(context.requestData),
      dataSize: JSON.stringify(context.requestData).length
    } : {};
    
    scope.setContext('api-error', {
      endpoint: context.endpoint,
      method: context.method,
      hasUserId: !!context.userId,
      requestData: sanitizedData,
      isPortugueseUser: context.isPortugueseUser
    });
    
    scope.setTag('error.type', 'api');
    scope.setTag('error.portuguese.api', context.isPortugueseUser ? 'true' : 'false');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};

// Database error reporting for Portuguese community operations
export const reportDatabaseError = (
  error: Error,
  context: {
    operation?: string;
    table?: string;
    query?: string;
    isPortugueseData?: boolean;
  } = {}
) => {
  Sentry.withScope((scope) => {
    scope.setContext('database-error', {
      operation: context.operation,
      table: context.table,
      queryType: context.query?.split(' ')[0] || 'unknown',
      isPortugueseData: context.isPortugueseData
    });
    
    scope.setTag('error.database', 'supabase');
    scope.setTag('error.priority', 'critical');
    scope.setTag('error.type', 'database');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};

// Business directory specific server error reporting
export const reportBusinessDirectoryServerError = (
  error: Error,
  context: {
    businessId?: string;
    operation?: 'create' | 'read' | 'update' | 'delete';
    userId?: string;
  } = {}
) => {
  Sentry.withScope((scope) => {
    scope.setContext('business-directory-server', {
      context: PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY,
      operation: context.operation,
      hasBusiness: !!context.businessId,
      hasUser: !!context.userId
    });
    
    scope.setTag('error.business.directory.server', 'true');
    scope.setTag('error.priority', 'critical');
    scope.setTag('error.feature', 'business-directory');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};