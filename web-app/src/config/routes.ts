// Centralized application routes and URL helpers
// Use these constants instead of hardcoded strings like "/events" or full URLs.

import { absoluteUrl } from './site'

export const ROUTES = {
  home: '/',
  events: '/events',
  transport: '/transport',
  transportGroup: '/transport?mode=group',
  services: '/services',
  host: '/host',
  signup: '/signup',
  login: '/login',
  pricing: '/pricing',
  referrals: '/referrals',
  help: '/help',
  faq: '/faq',
  rules: '/rules',
  businessDirectory: '/business-directory',
  businessNetworking: '/business-networking',
  community: '/community',
  instituteCamoes: '/instituto-camoes',
  live: '/live',
  tv: '/tv',
  streaming: '/streaming',
  streamingGetStarted: '/streaming/get-started',
  streamingLearn: '/streaming/learn',
  subscription: '/subscription',
  students: '/students',
  premiumMembership: '/premium-membership',
  matches: '/matches',
  londonTours: '/london-tours',
  directory: '/directory',
  groups: '/groups',
  groupsCreate: '/groups/create',
  feed: '/feed',
  favorites: '/favorites',
  saved: '/saved',
  about: '/about',
  contact: '/contact',
  myNetwork: '/my-network',
  myEvents: '/my-events',
  communityGuidelines: '/community-guidelines',
  safety: '/safety',
  successStories: '/success-stories',
  terms: '/terms',
  privacy: '/privacy',
  forgotPassword: '/forgot-password',
  dashboard: '/dashboard',
  admin: '/admin',
  howItWorks: '/how-it-works',
  caseStudies: '/case-studies',
  partnerships: '/partnerships',
  housingAssistance: '/housing-assistance',
  neighborhoodGroups: '/neighborhood-groups',
  forums: '/forums',
} as const

export type RouteKey = keyof typeof ROUTES

export const routePath = (key: RouteKey): string => ROUTES[key]

export const routeUrl = (key: RouteKey): string => absoluteUrl(ROUTES[key])
