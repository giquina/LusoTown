/**
 * API Messages Configuration
 * 
 * Centralized error messages, success messages, and API responses
 * to eliminate hardcoded strings in API routes and error handlers
 */

export const API_ERROR_MESSAGES = {
  // Authentication errors
  MISSING_CREDENTIALS: 'Email and password are required',
  MISSING_USER_INFO: 'First name and last name are required', 
  TERMS_NOT_AGREED: 'You must agree to the terms and conditions',
  AGE_NOT_CONFIRMED: 'Age confirmation is required',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  ACCOUNT_CREATION_FAILED: 'Failed to create account',
  PROFILE_CREATION_FAILED: 'Failed to create user profile',
  UNAUTHORIZED: 'Unauthorized',
  ADMIN_ACCESS_REQUIRED: 'Admin access required',
  AUTHENTICATION_REQUIRED: 'Authentication required',
  INVALID_AUTHENTICATION_TOKEN: 'Invalid authentication token',
  NO_ACTIVE_SESSION: 'No active session found',
  INVALID_EMAIL_FORMAT: 'Invalid email format',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  INVALID_REQUEST_PARAMETERS: 'Invalid request parameters',
  TARGET_IP_REQUIRED: 'Target IP required for blocking',
  EVENT_IDS_REQUIRED: 'Event IDs array required',
  INVALID_ACTION: 'Invalid action',
  
  // Business directory errors
  SUPABASE_CONFIG_MISSING: 'Supabase configuration missing. Please check environment variables.',
  BUSINESS_FETCH_FAILED: 'Failed to fetch businesses',
  BUSINESS_CLUSTERS_FAILED: 'Failed to get business clusters',
  BUSINESS_SUBMISSION_FAILED: 'Failed to submit business',
  GEOCODING_UNAVAILABLE: 'Geocoding service unavailable',
  GEOCODING_FAILED: 'Geocoding failed',
  PORTUGUESE_BUSINESS_FETCH_FAILED: 'Failed to fetch Portuguese businesses',
  AUTHENTICATION_REQUIRED_BUSINESS: 'Authentication required for business submission',
  MISSING_BUSINESS_FIELDS: 'Missing required fields: name, category, address, postcode, and Portuguese origin are required',
  BUSINESS_SUBMISSION_FAILED_REVIEW: 'Failed to submit business for Portuguese community review',
  BUSINESS_SUBMISSION_SERVER_ERROR: 'Internal server error processing Portuguese business submission',
  BUSINESS_DIRECTORY_SERVER_ERROR: 'Internal server error accessing Portuguese business directory',
  BUSINESS_FETCH_FAILED_GENERIC: 'Failed to fetch businesses',
  BUSINESS_CREATION_FAILED: 'Failed to create business',
  MISSING_BUSINESS_FIELDS_GENERIC: 'Missing required fields',
  BUSINESS_SUBMISSION_SUCCESS_MESSAGE: 'Business submitted for verification. You will be contacted within 48 hours.',
  VALIDATION_FAILED: 'Request validation failed. Please check your input and try again.',
  BUSINESS_REVIEW_PROCESS_MESSAGE: 'Portuguese business submitted successfully for community review',
  
  // Subscription errors
  MISSING_SUBSCRIPTION_ID: 'Missing subscription ID',
  SUBSCRIPTION_CANCEL_FAILED: 'Failed to cancel subscription',
  MISSING_USER_INFORMATION: 'Missing required user information',
  INVALID_TIER_SELECTION: 'Invalid tier selection',
  SUBSCRIPTION_SESSION_FAILED: 'Failed to create subscription session',
  
  // Categories errors  
  CATEGORIES_FETCH_FAILED: 'Failed to fetch categories',
  CATEGORY_CREATION_FAILED: 'Failed to create category',
  
  // Email errors
  EMAIL_PREFERENCES_FETCH_FAILED: 'Failed to fetch email preferences',
  EMAIL_PREFERENCES_UPDATE_FAILED: 'Failed to update email preferences',
  EMAIL_QUEUE_FAILED: 'Failed to queue email',
  
  // Rate limiting errors
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please try again later.',
  BUSINESS_DIRECTORY_RATE_LIMIT: 'Too many business directory requests. Please try again in a few minutes.',
  MESSAGING_RATE_LIMIT: 'Too many messaging requests. Please slow down to maintain community safety.',
  EVENT_BOOKING_RATE_LIMIT: 'Too many event booking attempts. Please wait before trying again.',
  AUTH_RATE_LIMIT: 'Too many login attempts. Please try again in a few minutes.',
  MATCHING_RATE_LIMIT: 'Too many matching requests. Please wait before continuing.',
  TRANSPORT_RATE_LIMIT: 'Too many transport service requests. Please try again shortly.',
  ADMIN_RATE_LIMIT: 'Too many administrative requests. Access temporarily restricted.',
  
  // General errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_METRIC_REQUESTED: 'Invalid metric requested',
  UNEXPECTED_SIGNUP_ERROR: 'An unexpected error occurred during signup. Please try again.',
  PERFORMANCE_METRICS_FAILED: 'Failed to retrieve performance metrics',
  UNKNOWN_ERROR_OCCURRED: 'Unknown error occurred',
  INVALID_REQUEST_BODY: 'Invalid request body',
  PERFORMANCE_LOGGING_FAILED: 'Failed to log performance metrics',
  SUPABASE_CONFIGURATION_MISSING: 'Supabase configuration missing',
  TARGET_IP_REQUIRED: 'Target IP required for blocking',
  EVENT_IDS_REQUIRED: 'Event IDs array required',
  INVALID_ACTION: 'Invalid action',
  INVALID_EMAIL_FORMAT: 'Invalid email format',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  MISSING_CREDENTIALS: 'Email and password are required',
  NO_ACTIVE_SESSION: 'No active session found'
} as const;

export const API_SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  BUSINESS_SUBMITTED: 'Business submitted successfully',
  SUBSCRIPTION_CREATED: 'Subscription created successfully',
  SUBSCRIPTION_CANCELLED: 'Subscription cancelled successfully',
  EMAIL_QUEUED: 'Email queued successfully',
  CATEGORY_CREATED: 'Category created successfully',
  USER_SIGNED_OUT: 'Successfully signed out',
  BUSINESS_REVIEW_PROCESS: 'Community moderation review (24-48 hours)',
  CULTURAL_AUTHENTICITY_VERIFICATION: 'Cultural authenticity verification',
  PORTUGUESE_COMMUNITY_FEEDBACK: 'Portuguese-speaking community feedback collection',
  BUSINESS_LISTING_ACTIVATION: 'Business listing activation',
  LOGIN_NOTIFICATION: 'Login notification sent',
  BUSINESS_SUBMITTED_FOR_REVIEW: 'Portuguese business submitted successfully for community review',
  PERFORMANCE_METRICS_LOGGED: 'Performance metrics logged successfully',
  LOGIN_NOTIFICATION_SENT: 'Login notification sent'
} as const;

export const API_LOG_MESSAGES = {
  // Performance and debugging
  PERFORMANCE_METRICS_ERROR: 'Performance metrics API error:',
  PERFORMANCE_LOGGING_ERROR: 'Performance logging API error:',
  BUSINESS_DIRECTORY_API_ERROR: 'Business directory API error:',
  BUSINESS_CLUSTERS_API_ERROR: 'Business clusters API error:',
  BUSINESS_HOTSPOTS_API_ERROR: 'Business hotspots API error:',
  NEARBY_BUSINESSES_API_ERROR: 'Nearby businesses API error:',
  BULK_NEARBY_BUSINESSES_API_ERROR: 'Bulk nearby businesses API error:',
  PERFORMANCE_MONITORING_API_ERROR: 'Performance monitoring API error:',
  PERFORMANCE_BENCHMARK_API_ERROR: 'Performance benchmark API error:',
  PERFORMANCE_CACHE_CLEANUP_API_ERROR: 'Performance cache cleanup API error:',
  OPTIMIZED_POSTGIS_QUERY_ERROR: 'Optimized PostGIS query error:',
  HYBRID_SEARCH_API_ERROR: 'Hybrid search API error:',
  SEARCH_SUGGESTIONS_API_ERROR: 'Search suggestions API error:',
  // Security and authentication logging
  SECURITY_STATS_FETCH_ERROR: 'Error fetching security stats:',
  THREAT_DATA_FETCH_ERROR: 'Error fetching threat data:',
  FAILED_LOGINS_FETCH_ERROR: 'Error fetching failed logins:',
  SESSION_DATA_FETCH_ERROR: 'Error fetching session data:',
  PERFORMANCE_MONITORING_REQUEST: 'Performance monitoring API request',
  PERFORMANCE_MONITORING_ERROR: 'Performance monitoring API error',
  PERFORMANCE_OPTIMIZATION_TRIGGERED: 'Performance optimization action triggered',
  PERFORMANCE_OPTIMIZATION_FAILED: 'Performance optimization action failed',
  DATABASE_OPTIMIZATION_FAILED: 'Database optimization failed',
  CACHE_CLEARING_FAILED: 'Cache clearing failed',
  CACHE_WARMING_FAILED: 'Cache warming failed',
  INDEX_CREATION_FAILED: 'Index creation failed',
  QUERY_ANALYSIS_FAILED: 'Query analysis failed',
  PERFORMANCE_MONITORING_START_FAILED: 'Performance monitoring start failed',
  PERFORMANCE_MONITORING_STOP_FAILED: 'Performance monitoring stop failed',
  SECURITY_DASHBOARD_API_ERROR: 'Security dashboard API error:',
  SECURITY_DASHBOARD_ACTION_ERROR: 'Security dashboard action error:',
  SECURE_LOGIN_ERROR: 'Secure login error:',
  SECURITY_DASHBOARD_API_ERROR: 'Security dashboard API error:',
  SECURITY_DASHBOARD_ACTION_ERROR: 'Security dashboard action error:',
  SECURITY_STATS_FETCH_ERROR: 'Error fetching security stats:',
  THREAT_DATA_FETCH_ERROR: 'Error fetching threat data:',
  FAILED_LOGINS_FETCH_ERROR: 'Error fetching failed logins:',
  SESSION_DATA_FETCH_ERROR: 'Error fetching session data:',
  PERFORMANCE_MONITORING_REQUEST: 'Performance monitoring API request',
  PERFORMANCE_MONITORING_ERROR: 'Performance monitoring API error',
  PERFORMANCE_OPTIMIZATION_TRIGGERED: 'Performance optimization action triggered',
  PERFORMANCE_OPTIMIZATION_FAILED: 'Performance optimization action failed',
  DATABASE_OPTIMIZATION_FAILED: 'Database optimization failed',
  CACHE_CLEARING_FAILED: 'Cache clearing failed',
  CACHE_WARMING_FAILED: 'Cache warming failed',
  INDEX_CREATION_FAILED: 'Index creation failed',
  QUERY_ANALYSIS_FAILED: 'Query analysis failed',
  PERFORMANCE_MONITORING_START_FAILED: 'Performance monitoring start failed',
  PERFORMANCE_MONITORING_STOP_FAILED: 'Performance monitoring stop failed',
  SECURITY_DASHBOARD_API_ERROR: 'Security dashboard API error:',
  SECURITY_DASHBOARD_ACTION_ERROR: 'Security dashboard action error:',
  SECURE_LOGIN_ERROR: 'Secure login error:',
  SECURE_LOGIN_ERROR: 'Secure login error:',
  SECURE_LOGOUT_ERROR: 'Secure logout error:',
  SESSION_RETRIEVAL_ERROR: 'Session retrieval error',
  AUTH_SESSION_API_ERROR: 'Auth session API error',
  SIGN_OUT_ERROR: 'Sign out error',
  AUTH_SESSION_DELETE_ERROR: 'Auth session delete API error',
  // Business directory specific logging
  PORTUGUESE_BUSINESS_DIRECTORY_FETCH_ERROR: 'Portuguese business directory fetch failed',
  PORTUGUESE_BUSINESS_DIRECTORY_SUCCESS: 'Portuguese business directory accessed successfully',
  PORTUGUESE_BUSINESS_ABUSE_DETECTED: 'Potential abuse detected on business directory submission',
  GEOCODING_FAILED_BUSINESS: 'Geocoding failed for Portuguese business',
  PORTUGUESE_BUSINESS_SUBMISSION_FAILED: 'Failed to submit Portuguese business',
  PORTUGUESE_BUSINESS_SUBMISSION_SUCCESS: 'Portuguese business submitted successfully',
  BUSINESS_DIRECTORY_POST_ERROR: 'Business directory POST API error',
  DATABASE_ERROR: 'Database error:',
  BUSINESS_SEARCH_API_ERROR: 'Business search API error:',
  BUSINESS_INSERTION_ERROR: 'Business insertion error:',
  BUSINESS_CREATION_API_ERROR: 'Business creation API error:',
  
  // Profile and authentication
  PROFILE_CREATION_ERROR: 'Profile creation error:',
  REFERRAL_PROCESSING_ERROR: 'Referral processing error:',
  WELCOME_EMAIL_ERROR: 'Welcome email error:',
  AUTO_REGISTRATION_ERROR: 'Auto-registration error:',
  COMPATIBILITY_CALCULATION_ERROR: 'Compatibility calculation error:',
  ENHANCED_SIGNUP_ERROR: 'Enhanced signup error:',
  
  // Subscription and payment
  SUBSCRIPTION_CREATION_ERROR: 'Error creating subscription:',
  SUBSCRIPTION_CANCELLATION_ERROR: 'Error cancelling subscription:',
  
  // Categories
  CATEGORIES_FETCH_ERROR: 'Error fetching categories:',
  CATEGORIES_GET_ERROR: 'Error in GET /api/categories:',
  CATEGORIES_POST_ERROR: 'Error in POST /api/categories:',
  CATEGORY_CREATION_ERROR: 'Error creating category:',
  
  // Email
  LUSOPHONE_EMAIL_PREFERENCES_FETCH_ERROR: 'Failed to fetch Lusophone email preferences',
  LUSOPHONE_EMAIL_PREFERENCES_UPDATE: 'Updating Lusophone email preferences',
  LUSOPHONE_EMAIL_PREFERENCES_UPDATE_ERROR: 'Failed to update Lusophone email preferences',
  EMAIL_QUEUE_ERROR: 'Error queuing email',
  
  // Performance data
  PERFORMANCE_DATA_QUERY_ERROR: 'Performance data query error:',
  DATABASE_METRICS_QUERY_ERROR: 'Database metrics query error:',
  ALERTS_QUERY_ERROR: 'Alerts query error:'
} as const;

export const PERFORMANCE_RECOMMENDATIONS = {
  SLOW_QUERIES: 'Rebuild spatial indexes and optimize PostGIS queries',
  HIGH_MEMORY: 'Consider adding composite indexes for frequently filtered combinations',
  CACHE_MISSES: 'Refresh materialized views and update table statistics',
  INDEX_USAGE: 'Add functional indexes on JSONB cultural preferences columns',
  PARTITIONING: 'Consider partitioning large materialized views by date or region',
  EXECUTION_PLANS: 'Review query execution plans and consider adding appropriate indexes'
} as const;

export const PERFORMANCE_STATUS_MESSAGES = {
  ACCEPTABLE: 'Performance within acceptable range',
  DEGRADED: 'Performance degraded - review required',
  CRITICAL: 'Critical performance issues detected'
} as const;

export const SYSTEM_STATUS_MESSAGES = {
  SUPABASE_CONFIG_ERROR: 'Supabase configuration missing'
} as const;

export const API_ENDPOINT_DESCRIPTIONS = {
  GET_ADMIN_PERFORMANCE: 'GET /api/admin/performance',
  POST_ADMIN_PERFORMANCE: 'POST /api/admin/performance',
  COMMUNITY_EVENTS: 'Community Events - Portuguese cultural event discovery and booking',
  BUSINESS_DIRECTORY: 'Business Directory - PostGIS-powered Portuguese business listings',
  CULTURAL_MATCHING: 'Cultural Matching - Simple compatibility for community connections',
  TRANSPORT_COORDINATION: 'Transport Coordination - Community transport sharing and coordination',
  UNIVERSITY_INTEGRATION: 'University Integration - 8 UK university partnerships monitoring'
} as const;

// Performance API metadata
export const PERFORMANCE_API_METADATA = {
  TITLE: 'Portuguese Community Platform Performance API',
  VERSION: '1.0.0',
  DESCRIPTION: 'Comprehensive performance monitoring and optimization for LusoTown community platform',
  GET_METRICS_DESCRIPTION: 'Get performance metrics and health status',
  POST_METRICS_DESCRIPTION: 'Log performance metrics for historical analysis',
  AVAILABLE_METRICS: ['community', 'health', 'business', 'events', 'matching', 'transport', 'university', 'recommendations', 'maintenance'],
  PARAMETERS: {
    METRIC: 'Specific metric to retrieve (community, health, business, events, matching, transport, university, recommendations, maintenance)',
    DETAILED: 'Set to "true" for comprehensive metrics'
  }
} as const;

// Security dashboard configurations
export const SECURITY_EVENTS = {
  UNAUTHORIZED_API_ACCESS: 'UNAUTHORIZED_API_ACCESS',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SQL_INJECTION_ATTEMPT: 'SQL_INJECTION_ATTEMPT'
} as const;

export const SECURITY_RECOMMENDATIONS = {
  CRITICAL_EVENTS: {
    action: 'Review critical events and consider blocking suspicious IPs'
  },
  INPUT_VALIDATION: {
    action: 'Review and enhance input validation for Portuguese business submissions'
  },
  RATE_LIMITING: {
    action: 'Consider reducing rate limits for sensitive endpoints'
  },
  IP_BLOCKING: {
    action: 'Review blocked IPs and consider permanent banning for repeat offenders'
  }
} as const;

export const STRIPE_CONFIG = {
  MISSING_SECRET_KEY: 'STRIPE_SECRET_KEY environment variable is not set'
} as const;

export const GEOCODING_CONFIG = {
  USER_AGENT: 'LusoTown Portuguese Business Directory',
  GEOCODING_FAILED_LOG: 'Geocoding failed'
} as const;

// Performance optimization recommendations
export const PERFORMANCE_OPTIMIZATION_MESSAGES = {
  CULTURAL_EVENTS_INDEX: 'Optimize Portuguese cultural event queries with composite indexes',
  POSTGIS_SPATIAL_INDEX: 'Implement PostGIS spatial indexing for Portuguese business searches',
  PARTIAL_INDEXES: 'Add partial indexes for active Portuguese community content',
  CACHE_WARMING_EVENTS: 'Implement cache warming for popular Portuguese events',
  GEOLOCATION_CACHING: 'Add geolocation-based caching for Portuguese business searches',
  CACHE_TTL_OPTIMIZATION: 'Optimize cache TTL for Portuguese cultural content',
  CACHE_INVALIDATION: 'Implement cache invalidation strategies for real-time Portuguese updates',
  DATABASE_OPTIMIZATION_TIMING: 'Run database optimization script during low-traffic hours',
  MONITOR_INDEX_IMPACT: 'Monitor index creation impact on Portuguese community queries',
  TEST_STAGING_FIRST: 'Test query optimizations in staging environment first',
  DEPLOYMENT_CACHE_WARMING: 'Implement cache warming during deployment',
  MONITOR_CACHE_RATIOS: 'Monitor cache hit ratios after optimization',
  VALIDATE_CACHE_STRATEGIES: 'Validate Portuguese content cache invalidation strategies',
  GRADUAL_ROLLOUT: 'Deploy API optimizations with gradual rollout',
  MONITOR_RESPONSE_TIMES: 'Monitor Portuguese community API response times',
  TEST_BILINGUAL_PERFORMANCE: 'Test bilingual content performance impacts'
} as const;

// Performance data categories
export const PERFORMANCE_DATA_CATEGORIES = {
  CULTURAL_EVENTS: 'Portuguese cultural events',
  BUSINESS_DIRECTORY: 'Portuguese business directory', 
  CULTURAL_MATCHING: 'Cultural compatibility matches',
  GEOLOCATION: 'Geolocation data for Portuguese businesses',
  POPULAR_EVENTS: 'Popular Portuguese cultural events',
  TOP_BUSINESSES: 'Top-rated Portuguese businesses in London',
  COMPATIBILITY_DATA: 'Frequently accessed cultural compatibility data',
  USER_SESSIONS: 'Common Portuguese community user sessions'
} as const;

// Performance features
export const PERFORMANCE_FEATURES = {
  CULTURAL_EVENTS: 'Cultural Events',
  BUSINESS_DIRECTORY: 'Business Directory',
  GEOLOCATION_SERVICES: 'Geolocation Services',
  CONTENT_CACHING: 'Content Caching'
} as const;

// Performance impact levels
export const PERFORMANCE_IMPACT_LEVELS = {
  HIGH: 'High - Portuguese community users experiencing significant issues',
  MEDIUM: 'Medium - Some Portuguese community features may be slow', 
  LOW: 'Low - Minor performance impact on Portuguese community'
} as const;

// Performance health status messages
export const PERFORMANCE_HEALTH_MESSAGES = {
  OPTIMAL: 'Portuguese community platform performing optimally',
  GOOD: 'Portuguese community platform in good health with minor optimizations possible',
  FAIR: 'Portuguese community platform performance is fair but improvements recommended',
  NEEDS_ATTENTION: 'Portuguese community platform performance needs attention',
  CRITICAL: 'Critical issues affecting Portuguese community platform performance'
} as const;

// Performance optimization tasks
export const PERFORMANCE_OPTIMIZATION_TASKS = {
  EVENTS_INDEX: 'Portuguese cultural events index optimization',
  SPATIAL_INDEX: 'Portuguese business directory spatial indexing',
  COMPATIBILITY_INDEX: 'Cultural compatibility matching index creation',
  COMPOSITE_INDEX: 'Portuguese cultural events composite indexing',
  SPATIAL_OPTIMIZATION: 'Portuguese business directory spatial optimization',
  COMPATIBILITY_ENHANCEMENT: 'Cultural compatibility matching performance enhancement',
  TEXT_SEARCH: 'Optimize Portuguese text search with proper language configuration',
  SPATIAL_GEOLOCATION: 'Implement PostGIS spatial indexing for better geolocation performance',
  COMPOSITE_QUERIES: 'Add composite indexes for frequently queried Portuguese content combinations',
  QUERY_CACHING: 'Consider query result caching for popular Portuguese community searches'
} as const;

// Performance monitoring categories
export const PERFORMANCE_MONITORING_CATEGORIES = {
  REALTIME_TRACKING: 'Real-time database performance tracking',
  CACHE_MONITORING: 'Cache hit ratio monitoring',
  RESPONSE_ANALYSIS: 'API response time analysis',
  CULTURAL_OPTIMIZATION: 'Portuguese cultural content optimization',
  ALERT_GENERATION: 'Automatic alert generation'
} as const;

// Initial recommendations for new signups
export const INITIAL_RECOMMENDATIONS = {
  BUSINESS_NETWORKING: {
    type: 'event',
    title: 'Lusophone Business Breakfast',
    description: 'Monthly networking event for Lusophone entrepreneurs',
    location: 'Central London',
    category: 'business'
  },
  CULTURAL_EVENTS: {
    type: 'event',
    title: 'Fado Night at Casa do Bacalhau',
    description: 'Authentic Lusophone Fado music with traditional dinner',
    location: 'Southwark, London',
    category: 'cultural'
  },
  DANCE_EVENTS: {
    type: 'event',
    title: 'Chocolate Kizomba Night',
    description: 'Beginner-friendly Kizomba dancing every Tuesday & Thursday',
    location: 'One Regents Street, London',
    category: 'dance'
  },
  CULTURAL_MATCHING: {
    type: 'feature',
    title: 'Cultural Compatibility Matching',
    description: 'Find meaningful connections based on Lusophone cultural values',
    action: 'complete_cultural_quiz',
    category: 'matching'
  },
  STOCKWELL_COMMUNITY: {
    type: 'community',
    title: 'Stockwell Lusophone Quarter',
    description: 'Visit the heart of London\'s Lusophone community',
    location: 'Stockwell, London',
    category: 'community'
  }
} as const;

// Type definitions
export type ApiErrorMessage = keyof typeof API_ERROR_MESSAGES;
export type ApiSuccessMessage = keyof typeof API_SUCCESS_MESSAGES;
export type ApiLogMessage = keyof typeof API_LOG_MESSAGES;
export type PerformanceRecommendation = keyof typeof PERFORMANCE_RECOMMENDATIONS;
export type PerformanceStatus = keyof typeof PERFORMANCE_STATUS_MESSAGES;
export type ApiEndpointDescription = keyof typeof API_ENDPOINT_DESCRIPTIONS;
export type SystemStatusMessage = keyof typeof SYSTEM_STATUS_MESSAGES;

// Helper functions
export const getApiErrorMessage = (key: ApiErrorMessage): string => {
  return API_ERROR_MESSAGES[key];
};

export const getApiSuccessMessage = (key: ApiSuccessMessage): string => {
  return API_SUCCESS_MESSAGES[key];
};

export const getApiLogMessage = (key: ApiLogMessage): string => {
  return API_LOG_MESSAGES[key];
};

export const getPerformanceRecommendation = (key: PerformanceRecommendation): string => {
  return PERFORMANCE_RECOMMENDATIONS[key];
};

export const getPerformanceStatus = (key: PerformanceStatus): string => {
  return PERFORMANCE_STATUS_MESSAGES[key];
};

export const getApiEndpointDescription = (key: ApiEndpointDescription): string => {
  return API_ENDPOINT_DESCRIPTIONS[key];
};

export const getSystemStatusMessage = (key: SystemStatusMessage): string => {
  return SYSTEM_STATUS_MESSAGES[key];
};
