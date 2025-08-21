/**
 * Centralized Configuration Exports
 * 
 * Main entry point for all application configuration constants.
 * Import from this file to access any configuration values.
 */

// Community and contact information
export { communityStats, communityMilestones, getNumericStat, formatStat } from './community';
export { contactInfo, contactPhones, socialMedia, officeLocations } from './contact';

// Brand and design system
export { 
  brandConfig, 
  defaultImages, 
  venues, 
  brandColors,
  PORTUGUESE_COLORS,
  DESIGN_TOKENS,
  CULTURAL_SYMBOLS,
  CULTURAL_EMOJIS,
  ACCESSIBILITY_COLORS,
  SEMANTIC_COLORS,
  COMPONENT_COLORS
} from './brand';

// Routes and navigation
export { 
  ROUTES, 
  QUERY_PARAMS,
  ROUTE_PATTERNS,
  ROUTE_CATEGORIES,
  PORTUGUESE_ROUTES,
  routePath, 
  routeUrl, 
  buildRoute,
  buildRouteWithQuery,
  isPublicRoute,
  isProtectedRoute,
  isAdminRoute,
  getBreadcrumbPath
} from './routes';

// Pricing and payments
export { 
  SUBSCRIPTION_PLANS,
  TRANSPORT_PRICING,
  EVENT_PRICING,
  BUSINESS_PRICING,
  STREAMING_PRICING,
  PAYMENT_FEES,
  DISCOUNTS,
  PRICE_DISPLAY,
  CURRENCIES,
  currency,
  currencySymbol,
  formatPrice,
  formatPriceRange,
  calculateDiscount,
  calculateSubscriptionSavings,
  getPlanPrice,
  getPlanLabel,
  getFormattedPlanPrice,
  getTransportQuote,
  plans, // Legacy export
  membership // Legacy export
} from './pricing';

// CDN and external resources
export {
  CDN_PROVIDERS,
  SOCIAL_URLS,
  PORTUGUESE_RESOURCES,
  UNIVERSITY_URLS,
  EXTERNAL_SERVICES,
  STREAMING_URLS,
  BUSINESS_URLS,
  LEGAL_URLS,
  TICKETING_URLS,
  TRANSPORT_URLS,
  buildUnsplashUrl,
  buildCloudinaryUrl,
  buildGravatarUrl,
  buildCalendarUrl,
  buildDirectionsUrl,
  buildSocialShareUrl
} from './cdn';

// Analytics and tracking
export {
  ANALYTICS_EVENTS,
  EVENT_CATEGORIES,
  CULTURAL_EVENTS,
  FUNNEL_EVENTS,
  ENGAGEMENT_METRICS,
  BUSINESS_EVENTS,
  EVENT_PARAMETERS,
  UTM_PARAMETERS,
  GA4_CONFIG,
  FACEBOOK_EVENTS,
  PERFORMANCE_METRICS,
  ERROR_CATEGORIES,
  trackEvent,
  trackPageView,
  trackUserAction,
  trackConversion,
  trackPortugueseCulturalEngagement
} from './analytics';

// Mock data and testing
export { mockProfileImages, mockEventImages, getProfileImage, getEventImage } from './mockData';

// Environment-based configuration
export const appConfig = {
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  enableDemo: process.env.NODE_ENV === 'development', // Only show demo features in dev
};

// Feature flags
export const featureFlags = {
  enableStreaming: process.env.NEXT_PUBLIC_ENABLE_STREAMING !== 'false',
  enableMatching: process.env.NEXT_PUBLIC_ENABLE_MATCHING !== 'false', 
  enableTransport: process.env.NEXT_PUBLIC_ENABLE_TRANSPORT !== 'false',
  enableEvents: process.env.NEXT_PUBLIC_ENABLE_EVENTS !== 'false',
  enablePremium: process.env.NEXT_PUBLIC_ENABLE_PREMIUM !== 'false',
};

// Re-export legacy config object (will be built from imports)
export const config = {
  ...appConfig,
  features: featureFlags,
};