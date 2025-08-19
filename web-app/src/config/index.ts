// Centralized configuration exports
export { communityStats, communityMilestones, getNumericStat, formatStat } from './community';
export { contactInfo, contactPhones, socialMedia, officeLocations } from './contact';
export { brandConfig, defaultImages, venues, brandColors } from './brand';
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

// Quick access to commonly used values
export const config = {
  ...appConfig,
  features: featureFlags,
  brand: brandConfig,
  community: communityStats,
  contact: contactInfo,
  images: defaultImages,
};