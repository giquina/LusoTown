/**
 * Mobile App Configuration
 * Integrates with shared configuration following LusoTown's zero hardcoding policy
 * Imports shared configurations and provides mobile-specific enhancements
 */

// Import shared configuration from @lusotown/shared
import { config as sharedConfig } from '@lusotown/shared';

// Mobile-specific configuration
export const MOBILE_CONFIG = {
  // App metadata
  app: {
    name: 'LusoTown',
    version: '1.0.0',
    scheme: 'lusotown',
    bundleIdentifier: 'com.lusotown.app'
  },

  // API endpoints
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://lusotown.com/api',
    webUrl: process.env.EXPO_PUBLIC_WEB_URL || 'https://lusotown.com',
    streamingUrl: process.env.EXPO_PUBLIC_STREAMING_URL || 'http://localhost:8080'
  },

  // Portuguese cultural features
  culture: {
    defaultLanguage: process.env.EXPO_PUBLIC_DEFAULT_LANGUAGE || 'en',
    supportedLanguages: process.env.EXPO_PUBLIC_SUPPORTED_LANGUAGES?.split(',') || ['en', 'pt'],
    heritageCode: process.env.EXPO_PUBLIC_HERITAGE_CODE || 'pt',
    enableCulturalFeatures: process.env.EXPO_PUBLIC_CULTURAL_FEATURES === 'true',
    lusophoneNations: process.env.EXPO_PUBLIC_LUSOPHONE_NATIONS?.split(',') || ['pt', 'br', 'cv', 'ao', 'mz', 'gw', 'st', 'tl']
  },

  // Community metrics
  community: {
    totalMembers: parseInt(process.env.EXPO_PUBLIC_TOTAL_MEMBERS || '750'),
    totalStudents: parseInt(process.env.EXPO_PUBLIC_TOTAL_STUDENTS || '2150'),
    universityPartnerships: parseInt(process.env.EXPO_PUBLIC_UNIVERSITY_PARTNERSHIPS || '8'),
    businessListings: parseInt(process.env.EXPO_PUBLIC_BUSINESS_LISTINGS || '150'),
    monthlyEvents: parseInt(process.env.EXPO_PUBLIC_MONTHLY_EVENTS || '45')
  },

  // Mobile-specific features
  features: {
    biometricAuth: process.env.EXPO_PUBLIC_BIOMETRIC_AUTH === 'true',
    pushNotifications: process.env.EXPO_PUBLIC_PUSH_NOTIFICATIONS === 'true',
    secureStorage: process.env.EXPO_PUBLIC_SECURE_STORAGE === 'true',
    offlineMode: true,
    darkMode: true,
    hapticFeedback: process.env.EXPO_PUBLIC_VIBRATION === 'true',
    streaming: process.env.EXPO_PUBLIC_ENABLE_STREAMING === 'true',
    matching: process.env.EXPO_PUBLIC_ENABLE_MATCHING === 'true',
    transport: process.env.EXPO_PUBLIC_ENABLE_TRANSPORT === 'true',
    events: process.env.EXPO_PUBLIC_ENABLE_EVENTS === 'true',
    premium: process.env.EXPO_PUBLIC_ENABLE_PREMIUM === 'true',
    businessDirectory: process.env.EXPO_PUBLIC_ENABLE_BUSINESS_DIRECTORY === 'true'
  },

  // Development settings
  development: {
    isDevelopment: process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === 'true',
    debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
    logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || 'info',
    enableFlipper: process.env.EXPO_PUBLIC_ENABLE_FLIPPER === 'true',
    performanceMonitoring: process.env.EXPO_PUBLIC_PERFORMANCE_MONITORING === 'true'
  }
};

// Portuguese Cultural Configuration for Mobile
export const PORTUGUESE_COLORS = {
  red: '#FF0000',           // Portuguese flag red
  green: '#00A859',         // Portuguese flag green
  gold: '#FFD700',          // Portuguese heritage gold
  azulejo: '#4A90E2',       // Portuguese tile blue
  primary: '#FF0000',       // Main brand color
  secondary: '#00A859',     // Secondary brand color
  accent: '#FFD700'         // Accent color
};

// Mobile Routes Configuration
export const MOBILE_ROUTES = {
  auth: {
    welcome: 'Welcome',
    login: 'Login',
    signup: 'Signup',
    onboarding: 'OnboardingFlow'
  },
  main: {
    home: 'Home',
    events: 'Events',
    matches: 'Matches',
    directory: 'Directory',
    profile: 'Profile'
  },
  modals: {
    eventDetails: 'EventDetails',
    userProfile: 'UserProfile',
    businessDetails: 'BusinessDetails',
    booking: 'BookingScreen',
    subscription: 'SubscriptionScreen',
    badges: 'CommunityBadgesScreen',
    settings: 'Settings'
  }
};

// Mobile-Specific Subscription Plans
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Comunidade',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['Basic events', 'Community access', 'Business directory'],
    maxConnections: 50
  },
  community: {
    id: 'community',
    name: 'Embaixador',
    priceMonthly: 19.99,
    priceYearly: 199.99,
    features: ['All events', 'Premium matching', 'Priority support'],
    maxConnections: 500
  },
  ambassador: {
    id: 'ambassador',
    name: 'Patrono',
    priceMonthly: 39.99,
    priceYearly: 399.99,
    features: ['Everything', 'Exclusive events', 'Business promotion'],
    maxConnections: 2000
  }
};

// Contact Information
export const CONTACT_INFO = {
  support: {
    email: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'support@lusotown.com',
    phone: '+44 20 7946 0958'
  },
  demo: {
    email: process.env.EXPO_PUBLIC_DEMO_EMAIL || 'demo@lusotown.com',
    password: process.env.EXPO_PUBLIC_DEMO_PASSWORD || 'LusoTown2025!'
  },
  social: {
    twitter: process.env.EXPO_PUBLIC_TWITTER_HANDLE || '@LusoTownUK',
    instagram: process.env.EXPO_PUBLIC_INSTAGRAM_HANDLE || '@lusotownuk',
    facebook: process.env.EXPO_PUBLIC_FACEBOOK_PAGE || 'LusoTownUK'
  }
};

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