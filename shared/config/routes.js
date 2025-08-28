// Shared routes configuration for LusoTown platform
// This file provides route configuration that can be used by both web and mobile apps
// Following LusoTown's zero hardcoding policy

// Main Application Routes
const ROUTES = {
  // Core Pages
  home: '/',
  dashboard: '/dashboard',
  admin: '/admin',
  
  // Authentication
  signup: '/signup',
  login: '/login',
  forgotPassword: '/forgot-password',
  
  // Onboarding / Application
  apply: '/apply',
  
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
  culturalMembership: '/cultural-membership',
  socialMembership: '/social-membership',
  communityMembership: '/community-membership',
  businessMembership: '/business-membership',
  
  // Educational & Partnerships
  students: '/students',
  instituteCamoes: '/instituto-camoes',
  partnerships: '/partnerships',
  universities: '/universities',
  mentorship: '/mentorship',
  portugueseInstitutionalPartnerships: '/portuguese-institutional-partnerships',
  
  // Cultural Communities
  portugueseSpeakingNations: '/portuguese-speaking-nations',
  
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
  unsubscribe: '/unsubscribe',
  emailPreferences: '/email-preferences',
  
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
};

// Mobile-specific routes and deep links
const MOBILE_ROUTES = {
  // Deep link schemes
  scheme: 'lusotown',
  
  // Deep link patterns
  deepLinks: {
    home: 'lusotown://home',
    events: 'lusotown://events',
    matches: 'lusotown://matches',
    profile: 'lusotown://profile',
    businessDirectory: 'lusotown://business',
    streaming: 'lusotown://live',
    eventDetail: 'lusotown://events/:id',
    businessDetail: 'lusotown://business/:id',
    userProfile: 'lusotown://profile/:id'
  },
  
  // Mobile navigation tabs
  tabs: {
    home: { name: 'Home', icon: 'home', route: '/' },
    events: { name: 'Events', icon: 'calendar', route: '/events' },
    matches: { name: 'Matches', icon: 'users', route: '/matches' },
    business: { name: 'Business', icon: 'briefcase', route: '/business-directory' },
    profile: { name: 'Profile', icon: 'user', route: '/profile' }
  }
};

// Query Parameter Helpers
const QUERY_PARAMS = {
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
};

// Common Route Patterns
const ROUTE_PATTERNS = {
  eventDetail: '/events/[id]',
  groupDetail: '/groups/[id]',
  businessDetail: '/business-directory/[id]',
  userProfile: '/profile/[id]',
  streamingChannel: '/streaming/[channel]',
  universityPartnership: '/universities/[university]'
};

// Route Categories for Navigation
const ROUTE_CATEGORIES = {
  public: [
    'home', 'events', 'businessDirectory', 'about', 'contact', 
    'pricing', 'howItWorks', 'tours', 'instituteCamoes', 'portugueseSpeakingNations'
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
};

// Helper Functions
const routePath = (key) => {
  const route = ROUTES[key];
  return typeof route === 'string' ? route : '/';
};

const buildRoute = (pattern, params) => {
  let route = pattern;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`[${key}]`, value);
  });
  return route;
};

const buildRouteWithQuery = (route, queryParams) => {
  const params = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  const queryString = params.toString();
  return queryString ? `${route}?${queryString}` : route;
};

const isPublicRoute = (route) => {
  return ROUTE_CATEGORIES.public.some(key => ROUTES[key] === route);
};

const isProtectedRoute = (route) => {
  return ROUTE_CATEGORIES.protected.some(key => ROUTES[key] === route);
};

const isAdminRoute = (route) => {
  return ROUTE_CATEGORIES.admin.some(key => ROUTES[key] === route);
};

// Portuguese-speaking community Specific Routes
const PORTUGUESE_ROUTES = {
  culturalEvents: buildRouteWithQuery(ROUTES.events, { category: 'cultural' }),
  portugueseBusiness: buildRouteWithQuery(ROUTES.businessDirectory, { language: 'pt' }),
  portugalConsulate: '/portugal-consulate',
  portugueseClasses: '/portuguese-classes',
  fadoEvents: buildRouteWithQuery(ROUTES.events, { category: 'fado' }),
  footballGroups: buildRouteWithQuery(ROUTES.groups, { category: 'football' })
};

// Brazilian Community Specific Routes
const BRAZILIAN_ROUTES = {
  casaDoBrasil: '/casa-do-brasil',
  brazilianBusiness: buildRouteWithQuery(ROUTES.businessDirectory, { country: 'brazil' }),
  brazilianEvents: buildRouteWithQuery(ROUTES.events, { category: 'brazilian' }),
  carnivalEvents: buildRouteWithQuery(ROUTES.events, { category: 'carnival' }),
  festaJunina: buildRouteWithQuery(ROUTES.events, { category: 'festa-junina' }),
  capoeira: buildRouteWithQuery(ROUTES.events, { category: 'capoeira' })
};

module.exports = {
  ROUTES,
  MOBILE_ROUTES,
  QUERY_PARAMS,
  ROUTE_PATTERNS,
  ROUTE_CATEGORIES,
  PORTUGUESE_ROUTES,
  BRAZILIAN_ROUTES,
  
  // Helper functions
  routePath,
  buildRoute,
  buildRouteWithQuery,
  isPublicRoute,
  isProtectedRoute,
  isAdminRoute
};