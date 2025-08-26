/**
 * LusoTown Mobile App - Portuguese Cultural Configuration
 * 
 * Centralized configuration system following zero hardcoding policy.
 * Imports shared configuration with mobile-specific overrides.
 */

// Portuguese Colors - Mobile Optimized
export const PORTUGUESE_COLORS = {
  // Traditional Portuguese Flag Colors
  primary: '#FF0000',           // Portuguese flag red - passion and courage
  primaryDark: '#CC0000',       // Deep red for interactions
  primaryLight: '#FFE6E6',      // Light red for backgrounds
  
  secondary: '#00A859',         // Portuguese flag green - hope and nature
  secondaryDark: '#008A47',     // Deep green for interactions
  secondaryLight: '#E6F7F1',    // Light green for backgrounds
  
  accent: '#FFD700',            // Portuguese golden heritage
  accentDark: '#B8860B',        // Deep gold for premium features
  accentLight: '#FFFACD',       // Light gold for accents
  
  // Cultural Heritage Colors
  azulejo: '#4A90E2',          // Portuguese tile blue
  azulejoDark: '#2E5B9A',      
  azulejoLight: '#E1F0FF',     
  
  // Premium Colors
  premium: '#B8860B',          // Luxurious Portuguese gold
  premiumDark: '#996F00',      
  premiumLight: '#F4E99B',     
  
  // Status colors using Portuguese heritage
  success: '#00A859',          // Portuguese green for success
  warning: '#FFD700',          // Portuguese gold for warnings
  error: '#FF0000',            // Portuguese red for errors
  
  // Neutral colors
  background: '#FAFAFA',       // Clean white background
  surface: '#FFFFFF',          // Card backgrounds
  text: '#1F2937',            // Dark text for readability
  textSecondary: '#6B7280',   // Secondary text
  textLight: '#9CA3AF',       // Placeholder text
  border: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Mobile App Configuration
export const MOBILE_CONFIG = {
  name: 'LusoTown',
  version: '1.0.0',
  build: process.env.EXPO_PUBLIC_BUILD_NUMBER || '1',
  environment: process.env.NODE_ENV || 'development',
  
  // App Store Information
  stores: {
    ios: {
      url: process.env.EXPO_PUBLIC_IOS_APP_URL || 'https://apps.apple.com/app/lusotown',
      id: process.env.EXPO_PUBLIC_IOS_APP_ID || '1234567890',
      scheme: 'lusotown-ios',
    },
    android: {
      url: process.env.EXPO_PUBLIC_ANDROID_APP_URL || 'https://play.google.com/store/apps/details?id=com.lusotown.app',
      id: process.env.EXPO_PUBLIC_ANDROID_APP_ID || 'com.lusotown.app',
      scheme: 'lusotown-android',
    },
  },
  
  // Deep Link Configuration
  deepLink: {
    scheme: 'lusotown',
    fallbackUrl: process.env.EXPO_PUBLIC_FALLBACK_URL || 'https://lusotown.com/app',
    universalLink: process.env.EXPO_PUBLIC_UNIVERSAL_LINK || 'https://lusotown.com',
  },
  
  // Performance Configuration
  performance: {
    enableHermes: true,
    enableTurboModules: true,
    enableNewArchitecture: false, // Stable release configuration
  },
  
  // Portuguese Cultural Settings
  cultural: {
    defaultLanguage: 'pt',
    supportedLanguages: ['pt', 'en'],
    defaultHeritage: 'portugal',
    enableCulturalAnimations: true,
  },
};

// Subscription Plans - Mobile Optimized
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    monthly: 0,
    annual: 0,
    monthlyStripe: 0,
    annualStripe: 0,
    labelEn: 'Free',
    labelPt: 'Grátis',
    culturalValueEn: 'Explore Community',
    culturalValuePt: 'Explorar Comunidade',
    features: {
      matches: 2,
      messages: 3,
      events: true,
      basicProfile: true,
      culturalQuiz: true,
    },
  },
  community: {
    id: 'community',
    monthly: 19.99,
    annual: 199.99,
    monthlyStripe: 1999,
    annualStripe: 19999,
    labelEn: 'Community',
    labelPt: 'Comunidade',
    culturalValueEn: 'Full Portuguese Experience',
    culturalValuePt: 'Experiência Portuguesa Completa',
    features: {
      matches: 'unlimited',
      messages: 'unlimited',
      events: true,
      premiumProfile: true,
      culturalInsights: true,
      voiceMessages: true,
      translation: true,
    },
  },
  ambassador: {
    id: 'ambassador',
    monthly: 39.99,
    annual: 399.99,
    monthlyStripe: 3999,
    annualStripe: 39999,
    labelEn: 'Ambassador',
    labelPt: 'Embaixador',
    culturalValueEn: 'Portuguese Cultural Leader',
    culturalValuePt: 'Líder Cultural Português',
    features: {
      matches: 'unlimited',
      messages: 'unlimited',
      events: true,
      premiumProfile: true,
      culturalInsights: true,
      voiceMessages: true,
      translation: true,
      eventCreation: true,
      businessDirectory: true,
      prioritySupport: true,
    },
  },
};

// Contact Information
export const CONTACT_INFO = {
  general: process.env.EXPO_PUBLIC_CONTACT_EMAIL || 'hello@lusotown.com',
  support: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'support@lusotown.com',
  safety: process.env.EXPO_PUBLIC_SAFETY_EMAIL || 'safety@lusotown.com',
  events: process.env.EXPO_PUBLIC_EVENTS_EMAIL || 'events@lusotown.com',
  partnerships: process.env.EXPO_PUBLIC_PARTNERSHIPS_EMAIL || 'partnerships@lusotown.com',
  
  phones: {
    general: process.env.EXPO_PUBLIC_CONTACT_PHONE || '+44 20 7123 4567',
    emergency: process.env.EXPO_PUBLIC_EMERGENCY_PHONE || '+44 20 7123 4567',
  },
  
  social: {
    instagram: process.env.EXPO_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/lusotownlondon',
    facebook: process.env.EXPO_PUBLIC_FACEBOOK_URL || 'https://facebook.com/lusotownlondon',
    twitter: process.env.EXPO_PUBLIC_TWITTER_URL || 'https://twitter.com/lusotownlondon',
    linkedin: process.env.EXPO_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/lusotown',
    youtube: process.env.EXPO_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@lusotownlondon',
  },
  
  office: {
    name: process.env.EXPO_PUBLIC_OFFICE_NAME || 'LusoTown London HQ',
    address: process.env.EXPO_PUBLIC_OFFICE_ADDRESS || 'Portuguese-speaking Community Centre, Vauxhall, London',
    postcode: process.env.EXPO_PUBLIC_OFFICE_POSTCODE || 'SW8 2LG',
    city: 'London',
    country: 'United Kingdom',
  },
};

// Cultural Symbols
export const CULTURAL_SYMBOLS = {
  flag: '🇵🇹',
  castle: '🏰',
  ship: '⛵',
  music: '🎵',
  wine: '🍷',
  fish: '🐟',
  azulejo: '🟦',
  fado: '🎶',
  pastéis: '🧁',
  cork: '🌳',
};

export const HERITAGE_FLAGS = {
  portugal: '🇵🇹',
  brazil: '🇧🇷',
  'cape-verde': '🇨🇻',
  angola: '🇦🇴',
  mozambique: '🇲🇿',
  'guinea-bissau': '🇬🇼',
  'east-timor': '🇹🇱',
  'sao-tome': '🇸🇹',
};

export const PORTUGUESE_REGIONS = {
  minho: { name: { en: 'Minho', pt: 'Minho' }, emoji: '🌿' },
  douro: { name: { en: 'Douro', pt: 'Douro' }, emoji: '🍇' },
  'tras-os-montes': { name: { en: 'Trás-os-Montes', pt: 'Trás-os-Montes' }, emoji: '⛰️' },
  'beira-interior': { name: { en: 'Beira Interior', pt: 'Beira Interior' }, emoji: '🏔️' },
  'beira-litoral': { name: { en: 'Beira Litoral', pt: 'Beira Litoral' }, emoji: '🌊' },
  'ribatejo': { name: { en: 'Ribatejo', pt: 'Ribatejo' }, emoji: '🐂' },
  'estremadura': { name: { en: 'Estremadura', pt: 'Estremadura' }, emoji: '🏛️' },
  'alto-alentejo': { name: { en: 'Alto Alentejo', pt: 'Alto Alentejo' }, emoji: '🌾' },
  'baixo-alentejo': { name: { en: 'Baixo Alentejo', pt: 'Baixo Alentejo' }, emoji: '🫒' },
  algarve: { name: { en: 'Algarve', pt: 'Algarve' }, emoji: '🏖️' },
  azores: { name: { en: 'Azores', pt: 'Açores' }, emoji: '🌋' },
  madeira: { name: { en: 'Madeira', pt: 'Madeira' }, emoji: '🌺' },
};

export const LUSOPHONE_COUNTRIES = [
  {
    code: 'portugal',
    name: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    language: 'pt',
    capital: { en: 'Lisbon', pt: 'Lisboa' },
    continent: 'Europe',
  },
  {
    code: 'brazil',
    name: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷',
    language: 'pt',
    capital: { en: 'Brasília', pt: 'Brasília' },
    continent: 'South America',
  },
  {
    code: 'cape-verde',
    name: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    language: 'pt',
    capital: { en: 'Praia', pt: 'Praia' },
    continent: 'Africa',
  },
  {
    code: 'angola',
    name: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    language: 'pt',
    capital: { en: 'Luanda', pt: 'Luanda' },
    continent: 'Africa',
  },
  {
    code: 'mozambique',
    name: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    language: 'pt',
    capital: { en: 'Maputo', pt: 'Maputo' },
    continent: 'Africa',
  },
  {
    code: 'guinea-bissau',
    name: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' },
    flag: '🇬🇼',
    language: 'pt',
    capital: { en: 'Bissau', pt: 'Bissau' },
    continent: 'Africa',
  },
  {
    code: 'east-timor',
    name: { en: 'East Timor', pt: 'Timor-Leste' },
    flag: '🇹🇱',
    language: 'pt',
    capital: { en: 'Dili', pt: 'Díli' },
    continent: 'Asia',
  },
  {
    code: 'sao-tome',
    name: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' },
    flag: '🇸🇹',
    language: 'pt',
    capital: { en: 'São Tomé', pt: 'São Tomé' },
    continent: 'Africa',
  },
];

export const CULTURAL_INTERESTS = [
  { id: 'fado', name: { en: 'Fado Music', pt: 'Fado' }, emoji: '🎶', category: 'music' },
  { id: 'football', name: { en: 'Football', pt: 'Futebol' }, emoji: '⚽', category: 'sports' },
  { id: 'gastronomy', name: { en: 'Portuguese Cuisine', pt: 'Gastronomia Portuguesa' }, emoji: '🍽️', category: 'food' },
  { id: 'wine', name: { en: 'Portuguese Wines', pt: 'Vinhos Portugueses' }, emoji: '🍷', category: 'food' },
  { id: 'literature', name: { en: 'Portuguese Literature', pt: 'Literatura Portuguesa' }, emoji: '📚', category: 'culture' },
  { id: 'history', name: { en: 'Portuguese History', pt: 'História Portuguesa' }, emoji: '🏛️', category: 'culture' },
  { id: 'festivals', name: { en: 'Portuguese Festivals', pt: 'Festas Portuguesas' }, emoji: '🎊', category: 'culture' },
  { id: 'handicrafts', name: { en: 'Portuguese Handicrafts', pt: 'Artesanato Português' }, emoji: '🎨', category: 'arts' },
  { id: 'azulejos', name: { en: 'Portuguese Tiles', pt: 'Azulejos' }, emoji: '🟦', category: 'arts' },
  { id: 'navigation', name: { en: 'Portuguese Discoveries', pt: 'Descobrimentos Portugueses' }, emoji: '🧭', category: 'history' },
  { id: 'folk-dance', name: { en: 'Portuguese Folk Dance', pt: 'Folclore Português' }, emoji: '💃', category: 'dance' },
  { id: 'cork', name: { en: 'Portuguese Cork', pt: 'Cortiça Portuguesa' }, emoji: '🌳', category: 'nature' },
];

// App Configuration - Environment Variable Driven
export const APP_CONFIG = {
  name: MOBILE_CONFIG.name,
  version: MOBILE_CONFIG.version,
  build: MOBILE_CONFIG.build,
  environment: MOBILE_CONFIG.environment,
  description: {
    en: 'Portuguese-speaking Community Platform in the UK',
    pt: 'Plataforma da Comunidade de Língua Portuguesa no Reino Unido',
  },
  supportEmail: CONTACT_INFO.support,
  community: {
    totalMembers: parseInt(process.env.EXPO_PUBLIC_TOTAL_MEMBERS || '2750'),
    totalStudents: parseInt(process.env.EXPO_PUBLIC_TOTAL_STUDENTS || '2150'),
    universityPartnerships: parseInt(process.env.EXPO_PUBLIC_UNIVERSITY_PARTNERSHIPS || '8'),
  },
  social: CONTACT_INFO.social,
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://lusotown.com',
  apiVersion: 'v1',
};

// Demo Credentials - Environment Driven
export const DEMO_CREDENTIALS = {
  email: process.env.EXPO_PUBLIC_DEMO_EMAIL || 'demo@lusotown.com',
  password: process.env.EXPO_PUBLIC_DEMO_PASSWORD || 'LusoTown2025!',
};

// API Configuration
export const API_CONFIG = {
  baseUrl: APP_CONFIG.baseUrl,
  timeout: 10000,
  retries: 3,
  endpoints: {
    auth: '/api/auth',
    users: '/api/users',
    events: '/api/events',
    matches: '/api/matches',
    messages: '/api/messages',
    subscriptions: '/api/subscriptions',
  },
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

// Mobile UX Configuration
export const MOBILE_UX_CONFIG = {
  // Touch targets
  minTouchTarget: 44, // iOS HIG and Android guidelines
  comfortableSpacing: 12,
  premiumSpacing: 16,
  
  // Portuguese text handling
  textExpansionFactor: 1.3, // Portuguese text is typically 30% longer than English
  maxLineLength: 80,
  
  // Responsive breakpoints for mobile
  breakpoints: {
    small: 375,     // iPhone SE
    medium: 414,    // iPhone 11/12/13
    large: 428,     // iPhone 14 Plus
    tablet: 768,    // iPad mini
  },
  
  // Cultural animations
  animationDuration: {
    fast: 200,
    normal: 300,
    slow: 500,
    cultural: 800, // For Portuguese cultural elements
  },
  
  // Portuguese content preferences
  portuguese: {
    preferAccentColors: true,
    enableCulturalAnimations: true,
    showHeritageFlags: true,
    enableVoiceMessages: true,
  },
};

// Feature Flags for Mobile App
export const MOBILE_FEATURE_FLAGS = {
  enablePushNotifications: process.env.EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS !== 'false',
  enableBiometricAuth: process.env.EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH !== 'false',
  enableVoiceMessages: process.env.EXPO_PUBLIC_ENABLE_VOICE_MESSAGES !== 'false',
  enableCulturalQuiz: process.env.EXPO_PUBLIC_ENABLE_CULTURAL_QUIZ !== 'false',
  enableStreamingIntegration: process.env.EXPO_PUBLIC_ENABLE_STREAMING !== 'false',
  enableOfflineMode: process.env.EXPO_PUBLIC_ENABLE_OFFLINE_MODE !== 'false',
  enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS !== 'false',
  enableSocialSharing: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_SHARING !== 'false',
};

// Legacy exports for compatibility
export default {
  PORTUGUESE_COLORS,
  MOBILE_CONFIG,
  SUBSCRIPTION_PLANS,
  CONTACT_INFO,
  CULTURAL_SYMBOLS,
  HERITAGE_FLAGS,
  PORTUGUESE_REGIONS,
  LUSOPHONE_COUNTRIES,
  CULTURAL_INTERESTS,
  APP_CONFIG,
  DEMO_CREDENTIALS,
  API_CONFIG,
  MOBILE_UX_CONFIG,
  MOBILE_FEATURE_FLAGS,
};