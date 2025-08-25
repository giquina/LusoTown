/**
 * Welcome Popup Routing Utilities
 * 
 * Handles routing logic based on user preferences from the welcome flow.
 * Routes users to the most relevant pages based on their country and interests.
 */

import { 
  getRouteForPreferences,
  getRoutingForCountry,
  COUNTRY_ROUTING,
  INTEREST_CATEGORIES,
  WelcomePreferences
} from '@/config/welcome-popup';
import { ROUTES, buildRouteWithQuery } from '@/config/routes';

/**
 * Navigate user to recommended page based on their welcome preferences
 */
export const navigateToRecommendedPage = (preferences: WelcomePreferences): string => {
  // Use the config utility to get the route
  return getRouteForPreferences(preferences);
};

/**
 * Get country-specific routes and filters
 */
export const getCountrySpecificRoutes = (countryCode: string) => {
  const countryRouting = getRoutingForCountry(countryCode.toUpperCase());
  
  if (!countryRouting) {
    return {
      eventsUrl: ROUTES.events,
      businessUrl: ROUTES.businessDirectory,
      culturalUrl: buildRouteWithQuery(ROUTES.events, { category: 'cultural' })
    };
  }

  return {
    eventsUrl: countryRouting.specialRoutes?.events || countryRouting.defaultRoute,
    businessUrl: countryRouting.specialRoutes?.business || ROUTES.businessDirectory,
    culturalUrl: countryRouting.specialRoutes?.cultural || buildRouteWithQuery(ROUTES.events, { category: 'cultural' }),
    defaultUrl: countryRouting.defaultRoute
  };
};

/**
 * Get interest-specific routes
 */
export const getInterestSpecificRoutes = (interestIds: string[]) => {
  return interestIds.map(interestId => {
    const interest = INTEREST_CATEGORIES.find(cat => cat.id === interestId);
    if (!interest) {
      return { id: interestId, route: ROUTES.events, name: 'Events' };
    }

    const route = interest.queryParams 
      ? buildRouteWithQuery(interest.route, interest.queryParams)
      : interest.route;

    return {
      id: interest.id,
      route,
      name: interest.nameEn,
      namePt: interest.namePt
    };
  });
};

/**
 * Build analytics-friendly route data
 */
export const buildRouteAnalytics = (preferences: WelcomePreferences) => {
  const recommendedRoute = getRouteForPreferences(preferences);
  const countryRoutes = preferences.country ? getCountrySpecificRoutes(preferences.country) : null;
  const interestRoutes = getInterestSpecificRoutes(preferences.interests);

  return {
    recommendedRoute,
    countryRoutes,
    interestRoutes,
    hasCountryPreference: !!preferences.country,
    hasInterestPreferences: preferences.interests.length > 0,
    preferenceStrength: preferences.interests.length + (preferences.country ? 1 : 0)
  };
};

/**
 * Get user preference summary for display
 */
export const getUserPreferenceSummary = (preferences: WelcomePreferences, language: 'en' | 'pt' = 'en') => {
  const country = preferences.country 
    ? COUNTRY_ROUTING.find(c => c.code === preferences.country?.toUpperCase())
    : null;

  const interests = preferences.interests
    .map(id => INTEREST_CATEGORIES.find(cat => cat.id === id))
    .filter(Boolean)
    .map(interest => language === 'pt' ? interest!.namePt : interest!.nameEn);

  return {
    country: country ? (language === 'pt' ? country.namePt : country.nameEn) : null,
    countryFlag: country?.flag,
    interests,
    interestCount: interests.length,
    hasPreferences: !!country || interests.length > 0
  };
};

/**
 * Check if user preferences are complete
 */
export const arePreferencesComplete = (preferences: WelcomePreferences): boolean => {
  return preferences.completedWelcome && (!!preferences.country || preferences.interests.length > 0);
};

/**
 * Get onboarding progress percentage
 */
export const getOnboardingProgress = (preferences: WelcomePreferences): number => {
  let progress = 0;
  
  if (preferences.country) progress += 50;
  if (preferences.interests.length > 0) progress += 50;
  if (preferences.completedWelcome) progress = 100;
  
  return Math.min(progress, 100);
};

/**
 * Get next recommended action for incomplete onboarding
 */
export const getNextRecommendedAction = (preferences: WelcomePreferences) => {
  if (preferences.completedWelcome) {
    return null; // No action needed
  }

  if (!preferences.country && preferences.interests.length === 0) {
    return {
      action: 'start_welcome',
      title: 'Get Started',
      description: 'Tell us about your preferences to get personalized recommendations'
    };
  }

  if (!preferences.country) {
    return {
      action: 'select_country',
      title: 'Select Your Country',
      description: 'Help us show you relevant content from your region'
    };
  }

  if (preferences.interests.length === 0) {
    return {
      action: 'select_interests',
      title: 'Choose Your Interests',
      description: 'Let us know what you\'re interested in to see relevant events and content'
    };
  }

  return {
    action: 'complete_welcome',
    title: 'Complete Setup',
    description: 'Finish setting up your preferences to get the full LusoTown experience'
  };
};