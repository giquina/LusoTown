/**
 * Welcome Flow Hook
 * 
 * Comprehensive hook for components to interact with the welcome system.
 * Provides utilities for checking user status, getting recommendations, and handling onboarding.
 */

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useWelcome } from '@/context/WelcomeContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  navigateToRecommendedPage,
  getUserPreferenceSummary,
  arePreferencesComplete,
  getOnboardingProgress,
  getNextRecommendedAction,
  getCountrySpecificRoutes,
  getInterestSpecificRoutes
} from '@/utils/welcomeRouting';
import { WELCOME_ANALYTICS_EVENTS } from '@/config/welcome-popup';

export function useWelcomeFlow() {
  const router = useRouter();
  const { language } = useLanguage();
  const welcome = useWelcome();

  // User status checks
  const userStatus = useMemo(() => {
    const summary = getUserPreferenceSummary(welcome.preferences, language);
    const isComplete = arePreferencesComplete(welcome.preferences);
    const progress = getOnboardingProgress(welcome.preferences);
    const nextAction = getNextRecommendedAction(welcome.preferences);

    return {
      isNewUser: welcome.isFirstTime,
      hasSeenPopup: welcome.preferences.displayCount > 0,
      hasCompletedWelcome: welcome.preferences.completedWelcome,
      isOnboardingComplete: isComplete,
      onboardingProgress: progress,
      nextRecommendedAction: nextAction,
      userSummary: summary
    };
  }, [welcome.preferences, welcome.isFirstTime, language]);

  // Navigation utilities
  const navigation = useMemo(() => {
    const recommendedRoute = navigateToRecommendedPage(welcome.preferences);
    const countryRoutes = welcome.preferences.country 
      ? getCountrySpecificRoutes(welcome.preferences.country)
      : null;
    const interestRoutes = getInterestSpecificRoutes(welcome.preferences.interests);

    return {
      recommendedRoute,
      countryRoutes,
      interestRoutes,
      navigateToRecommended: () => {
        welcome.trackEvent(WELCOME_ANALYTICS_EVENTS.BANNER_CLICKED, { 
          action: 'navigate_recommended',
          route: recommendedRoute
        });
        router.push(recommendedRoute);
      }
    };
  }, [welcome.preferences, router, welcome.trackEvent]);

  // Onboarding actions
  const onboardingActions = useMemo(() => ({
    startWelcome: useCallback(() => {
      welcome.showPopup();
      welcome.trackEvent(WELCOME_ANALYTICS_EVENTS.POPUP_SHOWN, { 
        trigger: 'manual',
        source: 'useWelcomeFlow'
      });
    }, [welcome]),

    skipWelcome: useCallback(() => {
      welcome.skipPopup();
      welcome.trackEvent(WELCOME_ANALYTICS_EVENTS.SKIP_CLICKED, { 
        source: 'useWelcomeFlow'
      });
    }, [welcome]),

    completeWelcome: useCallback((country?: string, interests: string[] = []) => {
      welcome.completeWelcomeFlow(country, interests);
      welcome.trackEvent(WELCOME_ANALYTICS_EVENTS.FLOW_COMPLETED, {
        country,
        interests,
        interestCount: interests.length,
        source: 'useWelcomeFlow'
      });
    }, [welcome]),

    updatePreferences: useCallback((country?: string, interests?: string[]) => {
      const updates: any = {};
      if (country !== undefined) updates.country = country;
      if (interests !== undefined) updates.interests = interests;
      
      welcome.updatePreferences(updates);
      welcome.trackEvent('preferences_updated', {
        updates,
        source: 'useWelcomeFlow'
      });
    }, [welcome])
  }), [welcome]);

  // Utility functions
  const utilities = useMemo(() => ({
    shouldShowOnboardingHints: () => {
      return !welcome.preferences.completedWelcome || welcome.isFirstTime;
    },

    getPersonalizedGreeting: () => {
      const summary = getUserPreferenceSummary(welcome.preferences, language);
      
      if (!summary.hasPreferences) {
        return language === 'pt' 
          ? 'Bem-vindo ao LusoTown!' 
          : 'Welcome to LusoTown!';
      }

      if (summary.country) {
        return language === 'pt'
          ? `Olá! Vemos que és ${summary.country === 'Portugal' ? 'de Portugal' : `d${summary.country}`}!`
          : `Hello! We see you're from ${summary.country}!`;
      }

      return language === 'pt'
        ? 'Bem-vindo de volta!'
        : 'Welcome back!';
    },

    getRecommendedContent: () => {
      if (!welcome.preferences.completedWelcome) {
        return {
          title: language === 'pt' ? 'Complete o seu perfil' : 'Complete your profile',
          description: language === 'pt' 
            ? 'Ajude-nos a personalizar a sua experiência'
            : 'Help us personalize your experience',
          action: 'complete_onboarding'
        };
      }

      const summary = getUserPreferenceSummary(welcome.preferences, language);
      
      if (summary.interests.length > 0) {
        return {
          title: language === 'pt' ? 'Baseado nos seus interesses' : 'Based on your interests',
          description: `${summary.interests.slice(0, 2).join(', ')}${summary.interests.length > 2 ? '...' : ''}`,
          action: 'view_personalized'
        };
      }

      if (summary.country) {
        return {
          title: language === 'pt' ? 'Da sua região' : 'From your region',
          description: `${summary.countryFlag} ${summary.country}`,
          action: 'view_country_content'
        };
      }

      return {
        title: language === 'pt' ? 'Descubra a sua comunidade' : 'Discover your community',
        description: language === 'pt' ? 'Explore eventos e negócios' : 'Explore events and businesses',
        action: 'explore_community'
      };
    },

    canShowPersonalizedContent: () => {
      return welcome.preferences.completedWelcome && 
             (welcome.preferences.country || welcome.preferences.interests.length > 0);
    }
  }), [welcome.preferences, welcome.isFirstTime, language]);

  return {
    // State
    ...userStatus,
    isPopupVisible: welcome.isPopupVisible,
    isBannerVisible: welcome.isBannerVisible,
    isLoading: welcome.isLoading,
    preferences: welcome.preferences,

    // Navigation
    ...navigation,

    // Actions
    ...onboardingActions,

    // Utilities
    ...utilities,

    // Raw welcome context for advanced usage
    welcomeContext: welcome
  };
}