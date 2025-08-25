// Shared configuration index for LusoTown platform
// This file exports all shared configuration that can be used by both web and mobile apps
// Following LusoTown's zero hardcoding policy

module.exports = {
  // Core brand configuration
  brand: require('./brand'),
  
  // Application routes and navigation
  routes: require('./routes'),
  
  // Pricing and subscription plans
  pricing: require('./pricing'),
  
  // Contact information
  contact: require('./contact'),
  
  // University partnerships
  universities: require('./universities'),
  
  // Portuguese cultural centers
  culturalCenters: require('./cultural-centers'),
  
  // Community guidelines
  communityGuidelines: require('./community-guidelines'),
  
  // Portuguese institutions
  portugueseInstitutions: require('./portuguese-institutions'),
  
  // Platform constants
  PLATFORM_NAME: 'LusoTown',
  PLATFORM_DESCRIPTION: 'Portuguese-speaking community platform for the United Kingdom',
  SUPPORTED_LANGUAGES: ['en', 'pt'],
  DEFAULT_LANGUAGE: 'en',
  
  // Mobile app specific constants
  MOBILE_APP: {
    name: 'LusoTown',
    slug: 'lusotown-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'lusotown',
    bundleIdentifier: 'com.lusotown.app',
    package: 'com.lusotown.app'
  },
  
  // Community metrics (from environment or defaults)
  COMMUNITY_METRICS: {
    totalMembers: process.env.NEXT_PUBLIC_TOTAL_MEMBERS || '750',
    totalStudents: process.env.NEXT_PUBLIC_TOTAL_STUDENTS || '2150',
    universityPartnerships: process.env.NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS || '8'
  },
  
  // API endpoints
  API_ENDPOINTS: {
    web: process.env.NEXT_PUBLIC_WEB_URL || 'https://lusotown.com',
    api: process.env.NEXT_PUBLIC_API_URL || 'https://lusotown.com/api',
    streaming: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080'
  }
};