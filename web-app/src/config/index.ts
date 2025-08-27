/**
 * Centralized Configuration Exports
 *
 * Main entry point for all application configuration constants.
 * Import from this file to access any configuration values.
 */

// Community and contact information
export {
  communityStats,
  communityMilestones,
  getNumericStat,
  formatStat,
} from "./community";
export {
  contactInfo,
  contactPhones,
  socialMedia,
  officeLocations,
  contact,
} from "./contact";

// Mobile app and PWA configuration
export {
  MOBILE_APP_CONFIG,
  DEVICE_DETECTION_CONFIG,
  LANDING_PAGE_CONFIG,
  PWA_ENHANCEMENT_CONFIG,
} from "./mobile-app";

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
  COMPONENT_COLORS,
} from "./brand";

// Portuguese Mobile Design System
export {
  PORTUGUESE_MOBILE_DESIGN_TOKENS,
  PORTUGUESE_CULTURAL_PATTERNS,
  MOBILE_GESTURE_PATTERNS,
  ACCESSIBILITY_TOKENS,
} from "./portuguese-mobile-design-tokens";

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
  getBreadcrumbPath,
} from "./routes";

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
  membership, // Legacy export
} from "./pricing";

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
  COMMON_IMAGES,
  URL_CONFIG,
  buildUnsplashUrl,
  buildPortugueseImageUrl,
  buildAvatarUrl,
  buildCloudinaryUrl,
  buildGravatarUrl,
  buildCalendarUrl,
  buildDirectionsUrl,
  buildSocialShareUrl,
  buildUniversityUrl,
  buildPortugueseResourceUrl,
  buildStreamingUrl,
  getEnvironmentUrl,
} from "./cdn";

// Analytics and tracking
export {
  ANALYTICS_EVENTS,
  EVENT_CATEGORIES,
  CULTURAL_EVENTS as ANALYTICS_CULTURAL_EVENTS,
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
  trackPortugueseCulturalEngagement,
} from "./analytics";

// Welcome popup and onboarding
export {
  WELCOME_POPUP_CONFIG,
  INTEREST_CATEGORIES,
  COUNTRY_ROUTING,
  DEFAULT_WELCOME_PREFERENCES,
  WELCOME_ANALYTICS_EVENTS,
  WELCOME_VALIDATION,
  getRoutingForCountry,
  getRouteForPreferences,
} from "./welcome-popup";

// Cultural events and heritage
export {
  CULTURAL_EVENTS,
  getEventsByType,
  getFeaturedEvents,
  getRegularEvents,
  getEventsByOrigin,
  getUpcomingEventsForSignup,
  getKizombaEvents,
  getBusinessNetworkingEvents,
  getFoodEvents,
  getCulturalEventMetrics,
} from "./cultural-events";

// Recurring events system
export {
  RECURRING_EVENT_TEMPLATES,
  PORTUGUESE_CULTURAL_CALENDAR,
  getActiveRecurringTemplates,
  getFeaturedRecurringTemplates,
  getRecurringTemplatesByCategory,
  getRecurringTemplatesByOrigin,
  generateRecurrenceOccurrences,
  getUpcomingCulturalCelebrations,
  validateCulturalAuthenticity,
  getSeasonalEventSuggestions,
} from "./recurring-events";

// Lusophone cultural celebrations
export {
  LUSOPHONE_CELEBRATIONS,
  CULTURAL_WISDOM,
  getCelebrationById,
  getCelebrationsByCategory,
  getCelebrationsByCountry,
  getCelebrationsByMonth,
  getRandomCulturalWisdom,
  getCulturalWisdomByCountry,
  getTotalCelebrationBusinesses,
  getFeaturedCelebrations,
} from "./lusophone-celebrations";

// Business directory and PALOP businesses
export {
  PALOP_BUSINESS_DIRECTORY,
  getFeaturedPALOPBusinesses,
  getPALOPBusinessesByCategory,
  getPALOPBusinessesByCountry,
  getPremiumPALOPBusinesses,
  getPALOPBusinessesByCity,
  searchPALOPBusinesses,
  getPALOPBusinessStats,
} from "./palop-business-directory";

export {
  FEATURED_PORTUGUESE_BUSINESSES,
  BUSINESS_DIRECTORY_CATEGORIES,
  PALOP_BUSINESS_SHOWCASE,
  BUSINESS_GEOGRAPHIC_DISTRIBUTION,
  getFeaturedBusinessesByCategory,
  getBusinessesByCity,
  getBusinessesByCountry,
  getPremiumBusinesses,
  searchBusinesses,
  getBusinessDirectoryStats,
} from "./business-directory-carousels";

// Mock data and testing
export {
  mockProfileImages,
  mockEventImages,
  getProfileImage,
  getEventImage,
} from "./mockData";

// Voice messaging and communication features
export {
  VOICE_RECORDING_CONFIG,
  SPEECH_TO_TEXT_CONFIG,
  VOICE_MESSAGE_UI,
  RECORDING_QUALITY,
  VOICE_MESSAGE_CATEGORIES,
  AUDIO_ENHANCEMENT,
  VOICE_STORAGE_CONFIG,
  VOICE_MODERATION,
  VOICE_ACCESSIBILITY,
  PORTUGUESE_AUDIO_PREFERENCES,
  VOICE_ANALYTICS,
  VOICE_API_CONFIG,
  getVoiceConfigForTier,
  getSpeechToTextForDialect,
  getRecordingQualityLabel,
  getMaxDurationForCategory,
  isValidVoiceFormat,
  calculateVoiceFileSize,
} from "./voice-messaging";

// Translation and Portuguese communication
export {
  PORTUGUESE_DIALECTS as TRANSLATION_DIALECTS,
  TRANSLATION_PROVIDERS,
  CULTURAL_CONTEXTS,
  TRANSLATION_QUALITY,
  PORTUGUESE_EXPRESSIONS,
  TRANSLATION_FEATURES,
  PORTUGUESE_IDIOMS,
  TRANSLATION_UI,
  TRANSLATION_MODERATION,
  getDialectInfo as getTranslationDialectInfo,
  getBestTranslationProvider,
  getTranslationQuality,
  getCulturalContext as getTranslationCulturalContext,
  isPortugueseIdiom,
  translateIdiom,
  formatTranslationResult,
} from "./portuguese-translation";

// Portuguese cultural communication
export {
  PORTUGUESE_EMOJI_PACKS,
  CULTURAL_EXPRESSIONS,
  GREETING_TEMPLATES,
  FAREWELL_TEMPLATES,
  PORTUGUESE_REACTIONS,
  getEmojiPackForCountry,
  getGreetingForContext,
  getFarewellForContext,
  getCulturalExpressionsByRegion,
  getReactionsByCategory,
  searchEmojis,
  getRandomGreeting,
  getTimeBasedGreeting,
} from "./portuguese-emojis";

// Advanced Portuguese Cultural Knowledge and AI Systems
export {
  PORTUGUESE_CULTURAL_TRADITIONS,
  LANGUAGE_LEARNING_MODULES,
  EMOTIONAL_SUPPORT_RESPONSES,
  VOICE_PERSONALITIES,
  findCulturalTradition,
  getLanguageLearningModule,
  findEmotionalSupport,
  getVoicePersonality,
  analyzeCulturalContext,
} from "./portuguese-cultural-knowledge";

export {
  LANGUAGE_LEARNING_MODULES as ADVANCED_LANGUAGE_MODULES,
  PRONUNCIATION_GUIDES,
  PORTUGUESE_DIALECTS,
  getModuleByLevel,
  findPronunciationGuide,
  getDialectInfo,
  generatePersonalizedLesson,
  assessPronunciation,
  getCulturalContext,
} from "./portuguese-language-learning";

export {
  VOICE_PERSONALITIES as VOICE_CONFIGS,
  voiceInteractionSystem,
  VoiceInteractionSystem,
} from "./voice-interaction-system";

// Environment-based configuration
export const appConfig = {
  environment: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  enableDemo: process.env.NODE_ENV === "development", // Only show demo features in dev
};

// Feature flags
export const featureFlags = {
  enableStreaming: process.env.NEXT_PUBLIC_ENABLE_STREAMING !== "false",
  enableMatching: process.env.NEXT_PUBLIC_ENABLE_MATCHING !== "false",
  enableTransport: process.env.NEXT_PUBLIC_ENABLE_TRANSPORT !== "false",
  enableEvents: process.env.NEXT_PUBLIC_ENABLE_EVENTS !== "false",
  enablePremium: process.env.NEXT_PUBLIC_ENABLE_PREMIUM !== "false",
  enableVoiceMessaging:
    process.env.NEXT_PUBLIC_ENABLE_VOICE_MESSAGING !== "false",
  enableTranslation: process.env.NEXT_PUBLIC_ENABLE_TRANSLATION !== "false",
  enableCulturalExpressions:
    process.env.NEXT_PUBLIC_ENABLE_CULTURAL_EXPRESSIONS !== "false",
};

// Re-export legacy config object (will be built from imports)
export const config = {
  ...appConfig,
  features: featureFlags,
};
