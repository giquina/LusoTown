/**
 * Analytics and Event Tracking Configuration
 * 
 * Centralizes all analytics event names, tracking parameters, and 
 * measurement constants to eliminate hardcoded analytics strings.
 */

// Core Analytics Events
export const ANALYTICS_EVENTS = {
  // User Authentication & Onboarding
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PROFILE_COMPLETE: 'profile_complete',
  EMAIL_VERIFIED: 'email_verified',
  
  // Page Views
  PAGE_VIEW: 'page_view',
  HOME_VIEW: 'home_view',
  EVENTS_VIEW: 'events_view',
  MATCHES_VIEW: 'matches_view',
  BUSINESS_DIRECTORY_VIEW: 'business_directory_view',
  STREAMING_VIEW: 'streaming_view',
  
  // Event Interactions
  EVENT_VIEW: 'event_view',
  EVENT_FAVORITE: 'event_favorite',
  EVENT_SHARE: 'event_share',
  EVENT_ATTEND: 'event_attend',
  EVENT_CREATE: 'event_create',
  EVENT_SEARCH: 'event_search',
  
  // Group Activities
  GROUP_VIEW: 'group_view',
  GROUP_JOIN: 'group_join',
  GROUP_LEAVE: 'group_leave',
  GROUP_CREATE: 'group_create',
  GROUP_INVITE: 'group_invite',
  
  // Matching System
  MATCH_VIEW: 'match_view',
  MATCH_LIKE: 'match_like',
  MATCH_PASS: 'match_pass',
  MATCH_CONVERSATION: 'match_conversation',
  MATCH_REPORT: 'match_report',
  
  // Business Directory
  BUSINESS_VIEW: 'business_view',
  BUSINESS_CONTACT: 'business_contact',
  BUSINESS_DIRECTIONS: 'business_directions',
  BUSINESS_WEBSITE: 'business_website',
  BUSINESS_REVIEW: 'business_review',
  BUSINESS_SUBMIT: 'business_submit',
  
  // Subscription & Payments
  SUBSCRIPTION_START: 'subscription_start',
  SUBSCRIPTION_UPGRADE: 'subscription_upgrade',
  SUBSCRIPTION_CANCEL: 'subscription_cancel',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  
  // Streaming Platform
  STREAM_START: 'stream_start',
  STREAM_END: 'stream_end',
  STREAM_WATCH: 'stream_watch',
  STREAM_CHAT: 'stream_chat',
  STREAM_DONATE: 'stream_donate',
  STREAM_FOLLOW: 'stream_follow',
  
  // Transport Services
  TRANSPORT_REQUEST: 'transport_request',
  TRANSPORT_BOOK: 'transport_book',
  TRANSPORT_CANCEL: 'transport_cancel',
  TRANSPORT_COMPLETE: 'transport_complete',
  
  // Community Engagement
  POST_CREATE: 'post_create',
  POST_LIKE: 'post_like',
  POST_COMMENT: 'post_comment',
  POST_SHARE: 'post_share',
  MESSAGE_SEND: 'message_send',
  
  // Language & Localization
  LANGUAGE_CHANGE: 'language_change',
  CONTENT_TRANSLATE: 'content_translate',
  
  // Search & Discovery
  SEARCH_QUERY: 'search_query',
  FILTER_APPLY: 'filter_apply',
  LOCATION_SEARCH: 'location_search',
  
  // External Interactions
  EXTERNAL_LINK: 'external_link',
  SOCIAL_SHARE: 'social_share',
  EMAIL_SHARE: 'email_share',
  
  // Errors & Performance
  ERROR_BOUNDARY: 'error_boundary',
  API_ERROR: 'api_error',
  PERFORMANCE_METRIC: 'performance_metric',
} as const;

// Event Categories for Organization
export const EVENT_CATEGORIES = {
  USER: 'user',
  CONTENT: 'content',
  COMMERCE: 'commerce',
  SOCIAL: 'social',
  TECHNICAL: 'technical',
  MARKETING: 'marketing'
} as const;

// Lusophone Cultural Event Tracking
export const CULTURAL_EVENTS = {
  PORTUGUESE_CONTENT_VIEW: 'portuguese_content_view',
  CULTURAL_EVENT_ATTEND: 'cultural_event_attend',
  PORTUGUESE_BUSINESS_CONTACT: 'portuguese_business_contact',
  COMMUNITY_MILESTONE: 'community_milestone',
  CULTURAL_PREFERENCE: 'cultural_preference',
  LANGUAGE_PREFERENCE: 'language_preference'
} as const;

// Conversion Funnel Events
export const FUNNEL_EVENTS = {
  LANDING_PAGE: 'funnel_landing',
  FEATURE_EXPLORE: 'funnel_feature_explore',
  SIGNUP_START: 'funnel_signup_start',
  SIGNUP_COMPLETE: 'funnel_signup_complete',
  FIRST_ACTION: 'funnel_first_action',
  SUBSCRIPTION_VIEW: 'funnel_subscription_view',
  SUBSCRIPTION_START: 'funnel_subscription_start',
  SUBSCRIPTION_COMPLETE: 'funnel_subscription_complete'
} as const;

// User Engagement Metrics
export const ENGAGEMENT_METRICS = {
  SESSION_DURATION: 'session_duration',
  PAGE_TIME: 'page_time',
  SCROLL_DEPTH: 'scroll_depth',
  CLICK_THROUGH_RATE: 'click_through_rate',
  BOUNCE_RATE: 'bounce_rate',
  RETURN_VISITOR: 'return_visitor'
} as const;

// Business Intelligence Events
export const BUSINESS_EVENTS = {
  FEATURE_USAGE: 'feature_usage',
  USER_RETENTION: 'user_retention',
  CHURN_RISK: 'churn_risk',
  UPGRADE_OPPORTUNITY: 'upgrade_opportunity',
  REFERRAL_SUCCESS: 'referral_success'
} as const;

// Event Parameters (common parameters for tracking)
export const EVENT_PARAMETERS = {
  // User Context
  USER_ID: 'user_id',
  USER_TYPE: 'user_type',
  MEMBERSHIP_TIER: 'membership_tier',
  LANGUAGE: 'language',
  
  // Content Context
  CONTENT_ID: 'content_id',
  CONTENT_TYPE: 'content_type',
  CONTENT_CATEGORY: 'content_category',
  
  // Location Context
  LOCATION: 'location',
  POSTAL_CODE: 'postal_code',
  CITY: 'city',
  
  // Business Context
  BUSINESS_ID: 'business_id',
  BUSINESS_CATEGORY: 'business_category',
  
  // Technical Context
  PLATFORM: 'platform',
  BROWSER: 'browser',
  DEVICE_TYPE: 'device_type',
  
  // Engagement Context
  SOURCE: 'source',
  MEDIUM: 'medium',
  CAMPAIGN: 'campaign',
  VALUE: 'value'
} as const;

// UTM and Campaign Parameters
export const UTM_PARAMETERS = {
  SOURCE: 'utm_source',
  MEDIUM: 'utm_medium',
  CAMPAIGN: 'utm_campaign',
  TERM: 'utm_term',
  CONTENT: 'utm_content'
} as const;

// Google Analytics 4 Event Configuration
export const GA4_CONFIG = {
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  CUSTOM_DIMENSIONS: {
    USER_LANGUAGE: 'custom_user_language',
    MEMBERSHIP_STATUS: 'custom_membership_status',
    COMMUNITY_SEGMENT: 'custom_community_segment',
    CONTENT_LANGUAGE: 'custom_content_language'
  }
} as const;

// Facebook Pixel Events
export const FACEBOOK_EVENTS = {
  PAGE_VIEW: 'PageView',
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration'
} as const;

// Performance Monitoring
export const PERFORMANCE_METRICS = {
  FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
  LARGEST_CONTENTFUL_PAINT: 'largest_contentful_paint',
  FIRST_INPUT_DELAY: 'first_input_delay',
  CUMULATIVE_LAYOUT_SHIFT: 'cumulative_layout_shift',
  TIME_TO_INTERACTIVE: 'time_to_interactive'
} as const;

// Error Tracking Categories
export const ERROR_CATEGORIES = {
  JAVASCRIPT: 'javascript_error',
  API: 'api_error',
  NETWORK: 'network_error',
  AUTHENTICATION: 'auth_error',
  PAYMENT: 'payment_error',
  STREAMING: 'streaming_error'
} as const;

// Helper functions for analytics
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA4_CONFIG.MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

export const trackUserAction = (action: string, category: string, label?: string, value?: number) => {
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

export const trackConversion = (eventName: string, value: number, currency: string = 'GBP') => {
  trackEvent(eventName, {
    value: value,
    currency: currency,
    event_category: EVENT_CATEGORIES.COMMERCE
  });
};

export const trackPortugueseCulturalEngagement = (eventType: string, contentId?: string) => {
  trackEvent(CULTURAL_EVENTS.PORTUGUESE_CONTENT_VIEW, {
    cultural_event_type: eventType,
    content_id: contentId,
    language: 'pt',
    community_segment: 'portuguese'
  });
};

// Type definitions
export type AnalyticsEvent = keyof typeof ANALYTICS_EVENTS;
export type EventCategory = keyof typeof EVENT_CATEGORIES;
export type CulturalEvent = keyof typeof CULTURAL_EVENTS;
export type FunnelEvent = keyof typeof FUNNEL_EVENTS;
export type EngagementMetric = keyof typeof ENGAGEMENT_METRICS;
export type BusinessEvent = keyof typeof BUSINESS_EVENTS;
export type EventParameter = keyof typeof EVENT_PARAMETERS;
export type UTMParameter = keyof typeof UTM_PARAMETERS;
export type FacebookEvent = keyof typeof FACEBOOK_EVENTS;
export type PerformanceMetric = keyof typeof PERFORMANCE_METRICS;
export type ErrorCategory = keyof typeof ERROR_CATEGORIES;