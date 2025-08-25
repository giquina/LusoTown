/**
 * Welcome Popup Configuration
 * 
 * Settings for the new user welcome popup flow, including routing logic,
 * user preferences, and display configuration.
 */

import { ROUTES, PORTUGUESE_ROUTES, BRAZILIAN_ROUTES, buildRouteWithQuery } from './routes';

// Welcome popup display settings
export interface WelcomePopupConfig {
  enabled: boolean;
  showOnFirstVisit: boolean;
  showAfterDays: number; // Show again after X days if user clicked "Skip"
  maxDisplayCount: number; // Maximum times to show popup
  storageKey: string;
  bannerStorageKey: string;
}

export const WELCOME_POPUP_CONFIG: WelcomePopupConfig = {
  enabled: true,
  showOnFirstVisit: true,
  showAfterDays: 7,
  maxDisplayCount: 3,
  storageKey: 'lusotown_welcome_popup',
  bannerStorageKey: 'lusotown_welcome_banner_dismissed'
};

// User interest categories for welcome flow
export interface InterestCategory {
  id: string;
  nameEn: string;
  namePt: string;
  icon: string;
  description: string;
  route: string;
  queryParams?: Record<string, string>;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: 'cultural_events',
    nameEn: 'Cultural Events',
    namePt: 'Eventos Culturais',
    icon: '🎭',
    description: 'Festivals, music, dance, and cultural celebrations',
    route: ROUTES.events,
    queryParams: { category: 'cultural' }
  },
  {
    id: 'business_networking',
    nameEn: 'Business & Networking',
    namePt: 'Negócios e Networking',
    icon: '💼',
    description: 'Professional networking and business connections',
    route: ROUTES.businessDirectory
  },
  {
    id: 'student_life',
    nameEn: 'Student Life',
    namePt: 'Vida Estudantil',
    icon: '🎓',
    description: 'University partnerships and student resources',
    route: ROUTES.universities
  },
  {
    id: 'food_dining',
    nameEn: 'Food & Dining',
    namePt: 'Comida e Restaurantes',
    icon: '🍽️',
    description: 'Portuguese restaurants and culinary experiences',
    route: ROUTES.businessDirectory,
    queryParams: { category: 'restaurant' }
  },
  {
    id: 'sports_recreation',
    nameEn: 'Sports & Recreation',
    namePt: 'Desporto e Recreação',
    icon: '⚽',
    description: 'Football groups, sports clubs, and recreational activities',
    route: ROUTES.groups,
    queryParams: { category: 'sports' }
  },
  {
    id: 'housing_services',
    nameEn: 'Housing & Services',
    namePt: 'Habitação e Serviços',
    icon: '🏠',
    description: 'Housing assistance and local services',
    route: ROUTES.housingAssistance
  }
];

// Country-specific routing logic
export interface CountryRouting {
  code: string;
  nameEn: string;
  namePt: string;
  flag: string;
  defaultRoute: string;
  queryParams?: Record<string, string>;
  specialRoutes?: {
    cultural: string;
    business: string;
    events: string;
  };
}

export const COUNTRY_ROUTING: CountryRouting[] = [
  {
    code: 'PT',
    nameEn: 'Portugal',
    namePt: 'Portugal',
    flag: '🇵🇹',
    defaultRoute: ROUTES.events,
    queryParams: { country: 'portugal' },
    specialRoutes: {
      cultural: PORTUGUESE_ROUTES.culturalEvents,
      business: PORTUGUESE_ROUTES.portugueseBusiness,
      events: buildRouteWithQuery(ROUTES.events, { country: 'portugal' })
    }
  },
  {
    code: 'BR',
    nameEn: 'Brazil',
    namePt: 'Brasil',
    flag: '🇧🇷',
    defaultRoute: ROUTES.events,
    queryParams: { country: 'brazil' },
    specialRoutes: {
      cultural: BRAZILIAN_ROUTES.brazilianEvents,
      business: BRAZILIAN_ROUTES.brazilianBusiness,
      events: buildRouteWithQuery(ROUTES.events, { country: 'brazil' })
    }
  },
  {
    code: 'AO',
    nameEn: 'Angola',
    namePt: 'Angola',
    flag: '🇦🇴',
    defaultRoute: ROUTES.events,
    queryParams: { country: 'angola' },
    specialRoutes: {
      cultural: buildRouteWithQuery(ROUTES.events, { country: 'angola', category: 'cultural' }),
      business: buildRouteWithQuery(ROUTES.businessDirectory, { country: 'angola' }),
      events: buildRouteWithQuery(ROUTES.events, { country: 'angola' })
    }
  },
  {
    code: 'CV',
    nameEn: 'Cape Verde',
    namePt: 'Cabo Verde',
    flag: '🇨🇻',
    defaultRoute: ROUTES.events,
    queryParams: { country: 'cape-verde' },
    specialRoutes: {
      cultural: buildRouteWithQuery(ROUTES.events, { country: 'cape-verde', category: 'cultural' }),
      business: buildRouteWithQuery(ROUTES.businessDirectory, { country: 'cape-verde' }),
      events: buildRouteWithQuery(ROUTES.events, { country: 'cape-verde' })
    }
  },
  {
    code: 'MZ',
    nameEn: 'Mozambique',
    namePt: 'Moçambique',
    flag: '🇲🇿',
    defaultRoute: ROUTES.events,
    queryParams: { country: 'mozambique' },
    specialRoutes: {
      cultural: buildRouteWithQuery(ROUTES.events, { country: 'mozambique', category: 'cultural' }),
      business: buildRouteWithQuery(ROUTES.businessDirectory, { country: 'mozambique' }),
      events: buildRouteWithQuery(ROUTES.events, { country: 'mozambique' })
    }
  }
];

// Welcome popup user preferences structure
export interface WelcomePreferences {
  country?: string;
  interests: string[];
  completedWelcome: boolean;
  skippedAt?: number;
  displayCount: number;
  lastShownAt?: number;
}

export const DEFAULT_WELCOME_PREFERENCES: WelcomePreferences = {
  interests: [],
  completedWelcome: false,
  displayCount: 0
};

// Helper functions for routing logic
export const getRoutingForCountry = (countryCode: string): CountryRouting | undefined => {
  return COUNTRY_ROUTING.find(routing => routing.code === countryCode);
};

export const getRouteForPreferences = (preferences: WelcomePreferences): string => {
  // If user selected a country, route based on country
  if (preferences.country) {
    const countryRouting = getRoutingForCountry(preferences.country);
    if (countryRouting) {
      return countryRouting.defaultRoute + (countryRouting.queryParams 
        ? `?${new URLSearchParams(countryRouting.queryParams).toString()}`
        : '');
    }
  }

  // If user selected interests, route to the first interest
  if (preferences.interests.length > 0) {
    const firstInterest = INTEREST_CATEGORIES.find(cat => cat.id === preferences.interests[0]);
    if (firstInterest) {
      return firstInterest.route + (firstInterest.queryParams
        ? `?${new URLSearchParams(firstInterest.queryParams).toString()}`
        : '');
    }
  }

  // Default route
  return ROUTES.events;
};

// Analytics events for welcome popup
export const WELCOME_ANALYTICS_EVENTS = {
  POPUP_SHOWN: 'welcome_popup_shown',
  GET_STARTED_CLICKED: 'welcome_get_started_clicked',
  EXPLORE_FIRST_CLICKED: 'welcome_explore_first_clicked',
  SKIP_CLICKED: 'welcome_skip_clicked',
  COUNTRY_SELECTED: 'welcome_country_selected',
  INTERESTS_SELECTED: 'welcome_interests_selected',
  FLOW_COMPLETED: 'welcome_flow_completed',
  BANNER_SHOWN: 'welcome_banner_shown',
  BANNER_CLICKED: 'welcome_banner_clicked',
  BANNER_DISMISSED: 'welcome_banner_dismissed'
} as const;

export type WelcomeAnalyticsEvent = typeof WELCOME_ANALYTICS_EVENTS[keyof typeof WELCOME_ANALYTICS_EVENTS];

// Welcome popup validation rules
export const WELCOME_VALIDATION = {
  maxInterests: 3,
  minInterests: 1,
  requiredFields: [] as string[], // No required fields for flexible UX
  allowSkip: true
} as const;