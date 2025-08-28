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
  
  // Business directory errors
  SUPABASE_CONFIG_MISSING: 'Supabase configuration missing. Please check environment variables.',
  BUSINESS_FETCH_FAILED: 'Failed to fetch businesses',
  BUSINESS_CLUSTERS_FAILED: 'Failed to get business clusters',
  BUSINESS_SUBMISSION_FAILED: 'Failed to submit business',
  GEOCODING_UNAVAILABLE: 'Geocoding service unavailable',
  GEOCODING_FAILED: 'Geocoding failed',
  
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
  
  // General errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  INVALID_METRIC_REQUESTED: 'Invalid metric requested'
} as const;

export const API_SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  BUSINESS_SUBMITTED: 'Business submitted successfully',
  SUBSCRIPTION_CREATED: 'Subscription created successfully',
  SUBSCRIPTION_CANCELLED: 'Subscription cancelled successfully',
  EMAIL_QUEUED: 'Email queued successfully',
  CATEGORY_CREATED: 'Category created successfully'
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

export const API_ENDPOINT_DESCRIPTIONS = {
  GET_ADMIN_PERFORMANCE: 'GET /api/admin/performance',
  POST_ADMIN_PERFORMANCE: 'POST /api/admin/performance',
  COMMUNITY_EVENTS: 'Community Events - Portuguese cultural event discovery and booking',
  BUSINESS_DIRECTORY: 'Business Directory - PostGIS-powered Portuguese business listings',
  CULTURAL_MATCHING: 'Cultural Matching - Simple compatibility for community connections',
  TRANSPORT_COORDINATION: 'Transport Coordination - Community transport sharing and coordination',
  UNIVERSITY_INTEGRATION: 'University Integration - 8 UK university partnerships monitoring'
} as const;

export const STRIPE_CONFIG = {
  MISSING_SECRET_KEY: 'STRIPE_SECRET_KEY environment variable is not set'
} as const;

export const GEOCODING_CONFIG = {
  USER_AGENT: 'LusoTown Portuguese Business Directory',
  GEOCODING_FAILED_LOG: 'Geocoding failed'
} as const;

// Type definitions
export type ApiErrorMessage = keyof typeof API_ERROR_MESSAGES;
export type ApiSuccessMessage = keyof typeof API_SUCCESS_MESSAGES;
export type ApiLogMessage = keyof typeof API_LOG_MESSAGES;
export type PerformanceRecommendation = keyof typeof PERFORMANCE_RECOMMENDATIONS;
export type PerformanceStatus = keyof typeof PERFORMANCE_STATUS_MESSAGES;
export type ApiEndpointDescription = keyof typeof API_ENDPOINT_DESCRIPTIONS;

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
