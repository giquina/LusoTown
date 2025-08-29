/**
 * Sentry Client Configuration for LusoTown Platform
 * Comprehensive error tracking for Portuguese community features on the client side
 */

import * as Sentry from '@sentry/nextjs'
import { ERROR_MONITORING, PORTUGUESE_ERROR_CONTEXTS, ERROR_CATEGORIES } from './src/config/error-monitoring'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN

// Portuguese community user detection for enhanced error context
function getPortugueseUserContext(): Sentry.User {
  if (typeof window === 'undefined') return {};
  
  const language = navigator.language || '';
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const currentLang = localStorage.getItem('preferred-language') || 'en';
  
  return {
    id: 'anonymous',
    language: currentLang,
    extra: {
      browserLanguage: language,
      timezone,
      isPortugueseSpeaker: language.includes('pt') || currentLang === 'pt',
      isUKBased: timezone.includes('London') || timezone.includes('Europe'),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown'
    }
  };
}

// Portuguese community specific error tags
function getPortugueseTags(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const currentLang = localStorage.getItem('preferred-language') || 'en';
  const browserLang = navigator.language || '';
  const isPortugueseUser = currentLang === 'pt' || browserLang.includes('pt');
  
  return {
    'portuguese.community': isPortugueseUser ? 'true' : 'false',
    'portuguese.language.current': currentLang,
    'portuguese.language.browser': browserLang,
    'community.platform': 'lusotown-london',
    'deployment.region': 'uk-london',
    'user.type': isPortugueseUser ? 'portuguese-community' : 'general',
    'platform.version': process.env.npm_package_version || '1.0.0'
  };
}

// Detect Portuguese community feature interactions
function getPortugueseFeatureContext(event: Sentry.Event): Record<string, any> {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const context: Record<string, any> = {};
  
  // Detect Portuguese-specific pages
  if (pathname.includes('business-directory')) {
    context.feature = 'portuguese-business-directory';
    context.priority = 'high';
    context.errorContext = PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY;
  } else if (pathname.includes('events')) {
    context.feature = 'lusophone-events';
    context.priority = 'high';
    context.errorContext = PORTUGUESE_ERROR_CONTEXTS.EVENT_BOOKING;
  } else if (pathname.includes('cultural') || pathname.includes('heritage')) {
    context.feature = 'portuguese-cultural-content';
    context.priority = 'high';
    context.errorContext = PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT;
  } else if (pathname.includes('matching')) {
    context.feature = 'cultural-matching';
    context.priority = 'critical';
    context.errorContext = PORTUGUESE_ERROR_CONTEXTS.CULTURAL_MATCHING;
  }
  
  // Detect language switching errors
  if (event.message?.includes('language') || event.message?.includes('i18n')) {
    context.feature = 'bilingual-system';
    context.priority = 'medium';
    context.errorContext = PORTUGUESE_ERROR_CONTEXTS.LANGUAGE_SWITCHING;
  }
  
  return context;
}

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Enhanced performance monitoring for Portuguese community
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.05'),
  
  // Session replay configuration
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
  replaysOnErrorSampleRate: 0.5, // Higher for errors
  
  // Advanced error filtering and preprocessing
  beforeSend(event, hint) {
    // Apply base configuration filter
    if (ERROR_MONITORING.beforeSend) {
      event = ERROR_MONITORING.beforeSend(event);
      if (!event) return null;
    }
    
    // Enhanced Portuguese community context
    event.user = { ...event.user, ...getPortugueseUserContext() };
    event.tags = { ...event.tags, ...getPortugueseTags() };
    
    // Add Portuguese feature context
    const featureContext = getPortugueseFeatureContext(event);
    if (Object.keys(featureContext).length > 0) {
      event.contexts = {
        ...event.contexts,
        'portuguese-feature': featureContext
      };
      
      // Update tags with feature-specific information
      event.tags = {
        ...event.tags,
        'error.feature': featureContext.feature || 'general',
        'error.priority': featureContext.priority || 'low',
        'error.portuguese.context': featureContext.errorContext || 'general'
      };
    }
    
    // Enhanced Portuguese community context
    event.contexts = {
      ...event.contexts,
      lusotown: {
        platform: 'web',
        community_focus: 'portuguese-speaking',
        target_region: 'united_kingdom',
        version: process.env.npm_package_version || '1.0.0',
        build: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development'
      },
      'portuguese-community': {
        platform: 'lusotown-london',
        community_type: 'portuguese-speaking',
        region: 'united-kingdom',
        priority: event.tags?.['portuguese.community'] === 'true' ? 'high' : 'normal'
      }
    };
    
    // Filter out non-critical errors in production
    if (process.env.NODE_ENV === 'production') {
      // Skip common browser/development warnings
      if (event.message?.includes('ResizeObserver loop limit exceeded') ||
          event.message?.includes('Non-passive event listener') ||
          event.message?.includes('Warning:') || 
          event.message?.includes('React DevTools') ||
          event.message?.includes('HMR')) {
        return null;
      }
      
      // Skip network errors that are likely user-related (but log Portuguese community ones)
      if ((event.exception?.values?.[0]?.type === 'NetworkError' ||
           event.message?.includes('Failed to fetch')) &&
          event.tags?.['portuguese.community'] !== 'true') {
        return null;
      }
    }
    
    // Enhanced fingerprinting for Portuguese cultural errors
    const error = hint.originalException as Error;
    if (error?.stack?.includes('portuguese') || 
        error?.stack?.includes('cultural') ||
        error?.stack?.includes('lusophone') ||
        error?.stack?.includes('business-directory')) {
      
      event.fingerprint = [
        featureContext.errorContext || PORTUGUESE_ERROR_CONTEXTS.CULTURAL_CONTENT,
        event.message || 'portuguese-content-error'
      ];
      
      // Escalate Portuguese community errors
      event.level = 'error';
      event.tags = {
        ...event.tags,
        'error.category': 'portuguese-cultural-content',
        'error.escalated': 'true'
      };
    }
    
    return event;
  },
  
  // Enhanced breadcrumb filtering for Portuguese community features
  beforeBreadcrumb(breadcrumb, hint) {
    // Enhanced breadcrumbs for Portuguese community interactions
    if (breadcrumb.category === 'ui.click' || breadcrumb.category === 'navigation') {
      const message = breadcrumb.message || '';
      const url = breadcrumb.data?.to || breadcrumb.data?.url || '';
      
      // Enhance Portuguese-related breadcrumbs
      if (message.includes('portuguese') || 
          message.includes('business-directory') ||
          message.includes('events') ||
          message.includes('cultural') ||
          url.includes('business-directory') ||
          url.includes('events')) {
        
        breadcrumb.level = 'info';
        breadcrumb.data = {
          ...breadcrumb.data,
          'portuguese.interaction': true,
          'community.feature': true,
          'priority': 'high'
        };
      }
      
      // Track language switching
      if (message.includes('language') || url.includes('lang=')) {
        breadcrumb.data = {
          ...breadcrumb.data,
          'language.switching': true,
          'bilingual.interaction': true
        };
      }
    }
    
    // Filter out noisy breadcrumbs in production
    if (process.env.NODE_ENV === 'production') {
      if (breadcrumb.category === 'console' && 
          breadcrumb.level !== 'error' && 
          breadcrumb.level !== 'warning') {
        return null;
      }
      
      // Keep XHR/Fetch breadcrumbs for Portuguese features
      if (breadcrumb.category === 'xhr' || breadcrumb.category === 'fetch') {
        const url = breadcrumb.data?.url || '';
        if (!url.includes('/api/') || 
            (!url.includes('business') && !url.includes('events') && !url.includes('cultural'))) {
          return null;
        }
      }
    }
    
    return breadcrumb;
  },
  
  // Release and environment tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
  environment: ERROR_MONITORING.environment,
  
  // Enhanced integrations for Portuguese community features
  integrations: [
    ...(typeof window !== 'undefined' ? [
      // Note: Advanced browser tracing integration removed due to version compatibility
      // Basic tracing is handled by Sentry.init configuration
    ] : [])
  ],
  
  // Enhanced initial scope with Portuguese community context
  initialScope: {
    tags: {
      ...getPortugueseTags(),
      component: 'lusotown-web',
      community: 'portuguese-speaking',
      region: 'united-kingdom'
    },
    user: getPortugueseUserContext(),
    contexts: {
      app: {
        name: 'LusoTown London',
        version: process.env.npm_package_version || '1.0.0'
      },
      community: {
        type: 'portuguese-speaking',
        region: 'london-uk',
        platform: 'web'
      }
    }
  },
  
  // Configuration
  maxBreadcrumbs: ERROR_MONITORING.maxBreadcrumbs,
  debug: process.env.NODE_ENV === 'development',
  
  // Transport options for better reliability
  // Using default transport for better compatibility
  // transport: Sentry.makeFetchTransport // Default transport is automatically used
});

// Export Sentry for manual error reporting
export { Sentry };

// Portuguese community specific error reporting functions
export const reportPortugueseError = (
  error: Error, 
  context: keyof typeof PORTUGUESE_ERROR_CONTEXTS,
  additionalData: Record<string, any> = {}
) => {
  Sentry.withScope((scope) => {
    scope.setContext('portuguese-error', {
      context: PORTUGUESE_ERROR_CONTEXTS[context],
      category: ERROR_CATEGORIES.PORTUGUESE_CONTENT?.name || 'Portuguese Content',
      ...additionalData
    });
    
    scope.setTag('error.portuguese.context', context);
    scope.setTag('error.priority', 'high');
    scope.setTag('error.community', 'portuguese');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};

// Business directory specific error reporting
export const reportBusinessDirectoryError = (
  error: Error,
  businessData?: { id?: string; name?: string; category?: string }
) => {
  Sentry.withScope((scope) => {
    // Sanitize business data before reporting
    const sanitizedData = businessData ? {
      hasId: !!businessData.id,
      hasName: !!businessData.name,
      category: businessData.category,
      idLength: businessData.id?.length || 0
    } : {};
    
    scope.setContext('business-directory', {
      context: PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY,
      businessData: sanitizedData,
      feature: 'portuguese-business-directory'
    });
    
    scope.setTag('error.business.directory', 'true');
    scope.setTag('error.priority', 'critical');
    scope.setTag('error.feature', 'business-directory');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};

// Cultural matching error reporting
export const reportCulturalMatchingError = (
  error: Error,
  matchingData?: { userId?: string; culturalPreferences?: any }
) => {
  Sentry.withScope((scope) => {
    // Remove all sensitive data before reporting
    const sanitizedData = matchingData ? {
      hasUserId: !!matchingData.userId,
      hasCulturalPreferences: !!matchingData.culturalPreferences,
      preferenceKeys: matchingData.culturalPreferences ? 
        Object.keys(matchingData.culturalPreferences) : []
    } : {};
    
    scope.setContext('cultural-matching', {
      context: PORTUGUESE_ERROR_CONTEXTS.CULTURAL_MATCHING,
      feature: 'portuguese-cultural-matching',
      matchingData: sanitizedData
    });
    
    scope.setTag('error.cultural.matching', 'true');
    scope.setTag('error.priority', 'critical');
    scope.setTag('error.feature', 'cultural-matching');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};

// Language switching error reporting
export const reportLanguageError = (
  error: Error,
  languageData?: { from?: string; to?: string; component?: string }
) => {
  Sentry.withScope((scope) => {
    scope.setContext('language-switching', {
      context: PORTUGUESE_ERROR_CONTEXTS.LANGUAGE_SWITCHING,
      feature: 'bilingual-system',
      languageData
    });
    
    scope.setTag('error.language.switching', 'true');
    scope.setTag('error.priority', 'medium');
    scope.setTag('error.feature', 'bilingual');
    scope.setLevel('error');
    
    Sentry.captureException(error);
  });
};