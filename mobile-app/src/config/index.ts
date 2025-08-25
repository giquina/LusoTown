/**
 * Mobile App Configuration
 * Integrates with web-app shared configuration following LusoTown's zero hardcoding policy
 * All dynamic data imported from ../../../web-app/src/config/
 */

// Import shared Portuguese-speaking community configuration from web app
// Note: Using require() for cross-platform compatibility
const path = require('path');
const webConfigPath = '../../../web-app/src/config';

// Safely import web app configurations
let sharedBrand, sharedRoutes, sharedPricing, sharedContact, sharedCommunity;
try {
  sharedBrand = require(`${webConfigPath}/brand.ts`);
  sharedRoutes = require(`${webConfigPath}/routes.ts`);
  sharedPricing = require(`${webConfigPath}/pricing.ts`);
  sharedContact = require(`${webConfigPath}/contact.ts`);
  sharedCommunity = require(`${webConfigPath}/community.ts`);
} catch (error) {
  console.warn('Could not load web app config, using fallback values:', error);
}

// Mobile-specific configuration
export const MOBILE_CONFIG = {
  // App metadata
  app: {
    name: sharedConfig.MOBILE_APP.name,
    version: sharedConfig.MOBILE_APP.version,
    scheme: sharedConfig.MOBILE_APP.scheme,
    bundleIdentifier: sharedConfig.MOBILE_APP.bundleIdentifier
  },

  // API endpoints
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || sharedConfig.API_ENDPOINTS.api,
    webUrl: process.env.EXPO_PUBLIC_WEB_URL || sharedConfig.API_ENDPOINTS.web,
    streamingUrl: process.env.EXPO_PUBLIC_STREAMING_URL || sharedConfig.API_ENDPOINTS.streaming
  },

  // Portuguese cultural features
  culture: {
    defaultLanguage: process.env.EXPO_PUBLIC_DEFAULT_LANGUAGE || 'en',
    supportedLanguages: process.env.EXPO_PUBLIC_SUPPORTED_LANGUAGES?.split(',') || ['en', 'pt'],
    heritageCode: process.env.EXPO_PUBLIC_HERITAGE_CODE || 'pt',
    enableCulturalFeatures: process.env.EXPO_PUBLIC_CULTURAL_FEATURES === 'true'
  },

  // Community metrics
  community: {
    totalMembers: process.env.EXPO_PUBLIC_TOTAL_MEMBERS || sharedConfig.COMMUNITY_METRICS.totalMembers,
    totalStudents: process.env.EXPO_PUBLIC_TOTAL_STUDENTS || sharedConfig.COMMUNITY_METRICS.totalStudents,
    universityPartnerships: process.env.EXPO_PUBLIC_UNIVERSITY_PARTNERSHIPS || sharedConfig.COMMUNITY_METRICS.universityPartnerships
  },

  // Mobile-specific features
  features: {
    biometricAuth: process.env.EXPO_PUBLIC_BIOMETRIC_AUTH === 'true',
    pushNotifications: process.env.EXPO_PUBLIC_PUSH_NOTIFICATIONS === 'true',
    secureStorage: process.env.EXPO_PUBLIC_SECURE_STORAGE === 'true',
    offlineMode: true,
    darkMode: true,
    hapticFeedback: process.env.EXPO_PUBLIC_VIBRATION === 'true'
  },

  // Development settings
  development: {
    isDevelopment: process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true',
    debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
    logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || 'info'
  }
};

// Re-export shared configurations for convenience
export const BRAND_CONFIG = sharedBrand.brandConfig;
export const BRAND_COLORS = sharedBrand.brandColors;
export const PORTUGUESE_COLORS = sharedBrand.PORTUGUESE_COLORS;
export const MOBILE_BRAND = sharedBrand.MOBILE_BRAND;
export const CULTURAL_SYMBOLS = sharedBrand.CULTURAL_SYMBOLS;

export const ROUTES = sharedRoutes.ROUTES;
export const MOBILE_ROUTES = sharedRoutes.MOBILE_ROUTES;
export const PORTUGUESE_ROUTES = sharedRoutes.PORTUGUESE_ROUTES;
export const BRAZILIAN_ROUTES = sharedRoutes.BRAZILIAN_ROUTES;

export const SUBSCRIPTION_PLANS = sharedPricing.SUBSCRIPTION_PLANS;
export const STUDENT_DISCOUNTS = sharedPricing.STUDENT_DISCOUNTS;
export const MOBILE_FEATURES = sharedPricing.MOBILE_FEATURES;
export const FREE_TIER = sharedPricing.FREE_TIER;

export const CONTACT_INFO = sharedContact.CONTACT_INFO;
export const PORTUGUESE_CONTACTS = sharedContact.PORTUGUESE_CONTACTS;
export const MOBILE_CONTACT = sharedContact.MOBILE_CONTACT;
export const EMERGENCY_CONTACTS = sharedContact.EMERGENCY_CONTACTS;

// Helper functions
export const formatPrice = sharedPricing.formatPrice;
export const calculateYearlySavings = sharedPricing.calculateYearlySavings;

// Mobile-specific helper functions
export const getMobileTabIcon = (tabName: string): string => {
  const icons: Record<string, string> = {
    home: 'home',
    events: 'calendar',
    matches: 'users',
    business: 'briefcase',
    profile: 'user',
    streaming: 'play-circle',
    settings: 'settings'
  };
  return icons[tabName] || 'circle';
};

export const getDeepLinkUrl = (route: string, params?: Record<string, string>): string => {
  let url = `${MOBILE_CONFIG.app.scheme}://${route}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  return url;
};

export const isPortugueseSpeaker = (language: string): boolean => {
  return ['pt', 'pt-BR', 'pt-PT'].includes(language);
};

// Default export for convenience
export default {
  MOBILE_CONFIG,
  BRAND_CONFIG,
  BRAND_COLORS,
  PORTUGUESE_COLORS,
  ROUTES,
  SUBSCRIPTION_PLANS,
  CONTACT_INFO
};