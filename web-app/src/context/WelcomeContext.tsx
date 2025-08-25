/**
 * Welcome Context Provider
 * 
 * Manages welcome popup state, user preferences, and routing logic
 * for the new user onboarding experience.
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  WelcomePreferences,
  getRouteForPreferences,
  WELCOME_ANALYTICS_EVENTS,
  WelcomeAnalyticsEvent
} from '@/config/welcome-popup';
import {
  getWelcomePreferences,
  saveWelcomePreferences,
  shouldShowWelcomePopup,
  markWelcomePopupShown,
  markWelcomePopupSkipped,
  markWelcomeFlowCompleted,
  shouldShowWelcomeBanner,
  dismissWelcomeBanner,
  isFirstTimeVisitor
} from '@/utils/welcomeStorage';

interface WelcomeContextValue {
  // State
  isPopupVisible: boolean;
  isBannerVisible: boolean;
  preferences: WelcomePreferences;
  isFirstTime: boolean;
  isLoading: boolean;

  // Actions
  showPopup: () => void;
  hidePopup: () => void;
  skipPopup: () => void;
  completeWelcomeFlow: (country?: string, interests?: string[]) => void;
  updatePreferences: (preferences: Partial<WelcomePreferences>) => void;
  hideBanner: () => void;
  navigateToRecommended: () => void;

  // Analytics
  trackEvent: (event: WelcomeAnalyticsEvent, data?: Record<string, any>) => void;
}

const WelcomeContext = createContext<WelcomeContextValue | undefined>(undefined);

export const useWelcome = () => {
  const context = useContext(WelcomeContext);
  if (context === undefined) {
    throw new Error('useWelcome must be used within a WelcomeProvider');
  }
  return context;
};

interface WelcomeProviderProps {
  children: React.ReactNode;
}

export function WelcomeProvider({ children }: WelcomeProviderProps) {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [preferences, setPreferences] = useState<WelcomePreferences>(() => getWelcomePreferences());
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize welcome state
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        
        // Get current preferences and check if should show popup/banner
        const currentPreferences = getWelcomePreferences();
        const shouldShowPopupNow = shouldShowWelcomePopup();
        const shouldShowBannerNow = shouldShowWelcomeBanner();
        const isFirstTimeUser = isFirstTimeVisitor();

        setPreferences(currentPreferences);
        setIsFirstTime(isFirstTimeUser);
        setIsBannerVisible(shouldShowBannerNow);

        // Show popup if conditions are met
        if (shouldShowPopupNow) {
          // Add small delay to ensure page is loaded
          setTimeout(() => {
            setIsPopupVisible(true);
            markWelcomePopupShown();
            trackEvent(WELCOME_ANALYTICS_EVENTS.POPUP_SHOWN, {
              isFirstTime: isFirstTimeUser,
              displayCount: currentPreferences.displayCount + 1
            });
          }, 1000);
        }
      } catch (error) {
        console.error('Error initializing welcome context:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  // Track analytics events
  const trackEvent = useCallback((event: WelcomeAnalyticsEvent, data?: Record<string, any>) => {
    try {
      // Integration with analytics service (Google Analytics, Mixpanel, etc.)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event, {
          event_category: 'welcome_flow',
          ...data
        });
      }

      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Welcome Analytics: ${event}`, data);
      }
    } catch (error) {
      console.warn('Error tracking welcome event:', error);
    }
  }, []);

  // Show popup manually
  const showPopup = useCallback(() => {
    setIsPopupVisible(true);
    markWelcomePopupShown();
    trackEvent(WELCOME_ANALYTICS_EVENTS.POPUP_SHOWN, {
      manual: true,
      displayCount: preferences.displayCount + 1
    });
  }, [preferences.displayCount, trackEvent]);

  // Hide popup
  const hidePopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  // Skip popup
  const skipPopup = useCallback(() => {
    setIsPopupVisible(false);
    markWelcomePopupSkipped();
    
    const updatedPreferences = getWelcomePreferences();
    setPreferences(updatedPreferences);
    
    trackEvent(WELCOME_ANALYTICS_EVENTS.SKIP_CLICKED, {
      displayCount: preferences.displayCount
    });

    // Show banner for future interaction
    setIsBannerVisible(true);
  }, [preferences.displayCount, trackEvent]);

  // Complete welcome flow
  const completeWelcomeFlow = useCallback((country?: string, interests: string[] = []) => {
    setIsPopupVisible(false);
    markWelcomeFlowCompleted(country, interests);
    
    const updatedPreferences = getWelcomePreferences();
    setPreferences(updatedPreferences);
    
    trackEvent(WELCOME_ANALYTICS_EVENTS.FLOW_COMPLETED, {
      country,
      interests,
      interestCount: interests.length
    });

    // Navigate to recommended page
    const recommendedRoute = getRouteForPreferences({ ...updatedPreferences, country, interests });
    router.push(recommendedRoute);
  }, [router, trackEvent]);

  // Update preferences
  const updatePreferences = useCallback((newPreferences: Partial<WelcomePreferences>) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    saveWelcomePreferences(updatedPreferences);
  }, [preferences]);

  // Hide banner
  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
    dismissWelcomeBanner();
    trackEvent(WELCOME_ANALYTICS_EVENTS.BANNER_DISMISSED);
  }, [trackEvent]);

  // Navigate to recommended content
  const navigateToRecommended = useCallback(() => {
    const recommendedRoute = getRouteForPreferences(preferences);
    router.push(recommendedRoute);
    trackEvent(WELCOME_ANALYTICS_EVENTS.BANNER_CLICKED, {
      route: recommendedRoute
    });
  }, [preferences, router, trackEvent]);

  const value: WelcomeContextValue = {
    // State
    isPopupVisible,
    isBannerVisible,
    preferences,
    isFirstTime,
    isLoading,

    // Actions
    showPopup,
    hidePopup,
    skipPopup,
    completeWelcomeFlow,
    updatePreferences,
    hideBanner,
    navigateToRecommended,

    // Analytics
    trackEvent
  };

  return (
    <WelcomeContext.Provider value={value}>
      {children}
    </WelcomeContext.Provider>
  );
}

// Hook to check if user should see onboarding hints
export const useWelcomeHints = () => {
  const { preferences, isFirstTime } = useWelcome();
  
  return {
    shouldShowHints: !preferences.completedWelcome || isFirstTime,
    isNewUser: isFirstTime,
    hasCompletedWelcome: preferences.completedWelcome,
    userCountry: preferences.country,
    userInterests: preferences.interests
  };
};