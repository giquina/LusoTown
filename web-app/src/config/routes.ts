/**
 * Centralized Application Routes Configuration
 * 
 * Use these constants instead of hardcoded strings like "/events" or full URLs.
 * Provides type-safe route navigation and URL generation helpers.
 */

import { absoluteUrl } from './site'

// Main Application Routes
export const ROUTES = {
  // Core Pages
  home: '/',
  dashboard: '/dashboard',
  admin: '/admin',
  
  // Authentication
  signup: '/signup',
  login: '/login',
  forgotPassword: '/forgot-password',
  
  // Events & Activities
  events: '/events',
  eventsCreate: '/events/create',
  eventsEdit: '/events/edit',
  groups: '/groups',
  groupsCreate: '/groups/create',
  groupsJoin: '/groups/join',
  londonTours: '/london-tours',
  tours: '/tours',
  
  // Community Features
  matches: '/matches',
  feed: '/feed',
  community: '/community',
  myNetwork: '/my-network',
  myEvents: '/my-events',
  favorites: '/favorites',
  saved: '/saved',
  
  // Services
  transport: '/transport',
  transportGroup: '/transport?mode=group',
  transportLuxury: '/transport?type=luxury',
  services: '/services',
  
  // Business
  businessDirectory: '/business-directory',
  businessNetworking: '/business-networking',
  directory: '/directory',
  businessSubmit: '/business-directory/submit',
  businessClaim: '/business-directory/claim',
  
  // Streaming & Media
  live: '/live',
  tv: '/tv',
  streaming: '/streaming',
  streamingDashboard: '/streaming/dashboard',
  streamingCreate: '/streaming/create',
  
  // Membership & Subscriptions
  subscription: '/subscription',
  pricing: '/pricing',
  premiumMembership: '/premium-membership',
  membershipUpgrade: '/membership/upgrade',
  
  // Educational & Partnerships
  students: '/students',
  instituteCamoes: '/instituto-camoes',
  partnerships: '/partnerships',
  universities: '/universities',
  mentorship: '/mentorship',
  corporatePartnerships: '/corporate-partnerships',
  portugueseInstitutionalPartnerships: '/portuguese-institutional-partnerships',
  
  // Support & Information
  help: '/help',
  faq: '/faq',
  howItWorks: '/how-it-works',
  contact: '/contact',
  about: '/about',
  
  // Community Guidelines & Safety
  rules: '/rules',
  communityGuidelines: '/community-guidelines',
  safety: '/safety',
  safetyReport: '/safety/report',
  
  // Legal & Policy
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
  
  // Marketing & Growth
  referrals: '/referrals',
  successStories: '/success-stories',
  caseStudies: '/case-studies',
  
  // Housing & Local Services
  housingAssistance: '/housing-assistance',
  neighborhoodGroups: '/neighborhood-groups',
  localServices: '/local-services',
  
  // Communication
  forums: '/forums',
  messages: '/messages',
  notifications: '/notifications',
  
  // Professional
  careers: '/careers',
  host: '/host',
  hostApplication: '/host/apply',
  
  // User Account
  profile: '/profile',
  profileEdit: '/profile/edit',
  settings: '/settings',
  billing: '/billing',
  
  // API Routes
  api: {
    auth: '/api/auth',
    events: '/api/events',
    users: '/api/users',
    matches: '/api/matches',
    business: '/api/business',
    streaming: '/api/streaming',
    transport: '/api/transport',
    payments: '/api/payments',
    webhooks: '/api/webhooks'
  }
} as const

// Query Parameter Helpers
export const QUERY_PARAMS = {
  mode: 'mode',
  type: 'type',
  category: 'category',
  location: 'location',
  date: 'date',
  price: 'price',
  language: 'language',
  search: 'search',
  filter: 'filter',
  sort: 'sort',
  page: 'page',
  limit: 'limit',
  tab: 'tab',
  ref: 'ref',
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_campaign: 'utm_campaign'
} as const;

// Common Route Patterns
export const ROUTE_PATTERNS = {
  eventDetail: '/events/[id]',
  groupDetail: '/groups/[id]',
  businessDetail: '/business-directory/[id]',
  userProfile: '/profile/[id]',
  streamingChannel: '/streaming/[channel]',
  universityPartnership: '/universities/[university]'
} as const;

// Route Categories for Navigation
export const ROUTE_CATEGORIES = {
  public: [
    'home', 'events', 'businessDirectory', 'about', 'contact', 
    'pricing', 'howItWorks', 'tours', 'instituteCamoes'
  ],
  auth: [
    'signup', 'login', 'forgotPassword'
  ],
  protected: [
    'dashboard', 'matches', 'feed', 'myNetwork', 'myEvents', 
    'favorites', 'transport', 'streaming', 'subscription'
  ],
  admin: [
    'admin'
  ]
} as const;

// Type definitions
export type RouteKey = keyof typeof ROUTES;
export type QueryParam = keyof typeof QUERY_PARAMS;
export type RoutePattern = keyof typeof ROUTE_PATTERNS;
export type RouteCategory = keyof typeof ROUTE_CATEGORIES;

// Helper Functions
export const routePath = (key: RouteKey): string => {
  const route = ROUTES[key];
  return typeof route === 'string' ? route : '/';
};

export const routeUrl = (key: RouteKey): string => {
  const route = ROUTES[key];
  return typeof route === 'string' ? absoluteUrl(route) : absoluteUrl('/');
};

export const buildRoute = (pattern: string, params: Record<string, string>): string => {
  let route = pattern;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`[${key}]`, value);
  });
  return route;
};

export const buildRouteWithQuery = (
  route: string, 
  queryParams: Record<string, string | number | boolean>
): string => {
  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  const queryString = params.toString();
  return queryString ? `${route}?${queryString}` : route;
};

export const isPublicRoute = (route: string): boolean => {
  return ROUTE_CATEGORIES.public.some(key => ROUTES[key as RouteKey] === route);
};

export const isProtectedRoute = (route: string): boolean => {
  return ROUTE_CATEGORIES.protected.some(key => ROUTES[key as RouteKey] === route);
};

export const isAdminRoute = (route: string): boolean => {
  return ROUTE_CATEGORIES.admin.some(key => ROUTES[key as RouteKey] === route);
};

// Navigation Breadcrumb Helpers
export const getBreadcrumbPath = (route: string): string[] => {
  const segments = route.split('/').filter(Boolean);
  return segments.map((_, index) => '/' + segments.slice(0, index + 1).join('/'));
};

// Portuguese Community Specific Routes
export const PORTUGUESE_ROUTES = {
  culturalEvents: buildRouteWithQuery(ROUTES.events, { category: 'cultural' }),
  portugueseBusiness: buildRouteWithQuery(ROUTES.businessDirectory, { language: 'pt' }),
  portugalConsulate: '/portugal-consulate',
  portugueseClasses: '/portuguese-classes',
  fadoEvents: buildRouteWithQuery(ROUTES.events, { category: 'fado' }),
  footballGroups: buildRouteWithQuery(ROUTES.groups, { category: 'football' })
} as const;
