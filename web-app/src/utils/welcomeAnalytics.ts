/**
 * Welcome Analytics Utilities
 * 
 * Handles tracking and analytics for the welcome popup system,
 * including user interactions, conversion metrics, and preferences.
 */

import { WELCOME_ANALYTICS_EVENTS, WelcomeAnalyticsEvent } from '@/config/welcome-popup';
import { WelcomePreferences } from '@/config/welcome-popup';
import logger from '@/utils/logger';

interface AnalyticsData {
  [key: string]: any;
}

/**
 * Track welcome-related events
 */
export const trackWelcomeEvent = (
  event: WelcomeAnalyticsEvent, 
  data?: AnalyticsData,
  preferences?: WelcomePreferences
) => {
  try {
    const eventData: AnalyticsData = {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof window !== 'undefined' ? document.referrer : ''
    };

    // Add preference context if available
    if (preferences) {
      eventData.user_country = preferences.country;
      eventData.user_interests = preferences.interests;
      eventData.interest_count = preferences.interests.length;
      eventData.has_completed_welcome = preferences.completedWelcome;
      eventData.display_count = preferences.displayCount;
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        event_category: 'welcome_flow',
        event_label: event,
        custom_parameters: eventData
      });
    }

    // Send to other analytics platforms
    if (typeof window !== 'undefined') {
      // Facebook Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'CustomEvent', {
          content_name: event,
          content_category: 'welcome_flow',
          ...eventData
        });
      }

      // Mixpanel
      if ((window as any).mixpanel) {
        (window as any).mixpanel.track(event, {
          category: 'welcome_flow',
          ...eventData
        });
      }
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      logger.info(`Welcome Analytics: ${event}`, { 
        ...eventData,
        area: 'analytics',
        action: event
      });
    }

  } catch (error) {
    logger.warn('Error tracking welcome event', error, { area: 'analytics' });
  }
};

/**
 * Track popup shown event
 */
export const trackPopupShown = (displayCount: number, isFirstTime: boolean) => {
  trackWelcomeEvent(WELCOME_ANALYTICS_EVENTS.POPUP_SHOWN, {
    display_count: displayCount,
    is_first_time: isFirstTime,
    popup_type: 'welcome_popup'
  });
};

/**
 * Track user action on popup
 */
export const trackPopupAction = (
  action: 'get_started' | 'explore_first' | 'skip',
  preferences?: WelcomePreferences
) => {
  const eventMap = {
    get_started: WELCOME_ANALYTICS_EVENTS.GET_STARTED_CLICKED,
    explore_first: WELCOME_ANALYTICS_EVENTS.EXPLORE_FIRST_CLICKED,
    skip: WELCOME_ANALYTICS_EVENTS.SKIP_CLICKED
  };

  trackWelcomeEvent(eventMap[action], {
    action,
    popup_step: 'welcome'
  }, preferences);
};

/**
 * Track country selection
 */
export const trackCountrySelection = (
  country: string,
  preferences?: WelcomePreferences
) => {
  trackWelcomeEvent(WELCOME_ANALYTICS_EVENTS.COUNTRY_SELECTED, {
    selected_country: country,
    popup_step: 'country'
  }, preferences);
};

/**
 * Track interest selections
 */
export const trackInterestSelections = (
  interests: string[],
  preferences?: WelcomePreferences
) => {
  trackWelcomeEvent(WELCOME_ANALYTICS_EVENTS.INTERESTS_SELECTED, {
    selected_interests: interests,
    interest_count: interests.length,
    popup_step: 'interests'
  }, preferences);
};

/**
 * Track welcome flow completion
 */
export const trackWelcomeCompletion = (
  country: string | undefined,
  interests: string[],
  finalRoute: string
) => {
  trackWelcomeEvent(WELCOME_ANALYTICS_EVENTS.FLOW_COMPLETED, {
    final_country: country,
    final_interests: interests,
    final_interest_count: interests.length,
    final_route: finalRoute,
    completion_method: 'full_flow'
  });
};

/**
 * Track banner interactions
 */
export const trackBannerInteraction = (
  action: 'shown' | 'clicked' | 'dismissed',
  clickTarget?: string
) => {
  const eventMap = {
    shown: WELCOME_ANALYTICS_EVENTS.BANNER_SHOWN,
    clicked: WELCOME_ANALYTICS_EVENTS.BANNER_CLICKED,
    dismissed: WELCOME_ANALYTICS_EVENTS.BANNER_DISMISSED
  };

  trackWelcomeEvent(eventMap[action], {
    banner_action: action,
    click_target: clickTarget
  });
};

/**
 * Calculate conversion funnel metrics
 */
export const calculateConversionMetrics = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const welcomeData = localStorage.getItem('lusotown_welcome_popup');
    if (!welcomeData) {
      return null;
    }

    const data = JSON.parse(welcomeData);
    const preferences = data.preferences;

    return {
      hasSeenPopup: preferences.displayCount > 0,
      hasSelectedCountry: !!preferences.country,
      hasSelectedInterests: preferences.interests.length > 0,
      hasCompletedFlow: preferences.completedWelcome,
      conversionRate: preferences.completedWelcome ? 100 : 0,
      engagementLevel: (
        (preferences.country ? 1 : 0) +
        (preferences.interests.length > 0 ? 1 : 0) +
        (preferences.completedWelcome ? 1 : 0)
      ) / 3 * 100
    };
  } catch (error) {
    logger.warn('Error calculating conversion metrics', error, { area: 'analytics' });
    return null;
  }
};

/**
 * Get analytics summary for debugging
 */
export const getWelcomeAnalyticsSummary = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const welcomeData = localStorage.getItem('lusotown_welcome_popup');
    const bannerDismissed = localStorage.getItem('lusotown_welcome_banner_dismissed');
    
    const metrics = calculateConversionMetrics();
    
    return {
      localStorageData: welcomeData ? JSON.parse(welcomeData) : null,
      bannerDismissed: bannerDismissed === 'true',
      conversionMetrics: metrics,
      analyticsAvailable: {
        gtag: !!(window as any).gtag,
        fbq: !!(window as any).fbq,
        mixpanel: !!(window as any).mixpanel
      }
    };
  } catch (error) {
    logger.warn('Error getting analytics summary', error, { area: 'analytics' });
    return null;
  }
};