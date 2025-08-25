/**
 * Welcome Popup Local Storage Utilities
 * 
 * Handles persistence of welcome popup state, user preferences,
 * and timing logic for showing/hiding the popup.
 */

import { 
  WELCOME_POPUP_CONFIG, 
  WelcomePreferences, 
  DEFAULT_WELCOME_PREFERENCES 
} from '@/config/welcome-popup';

// Type for storage data structure
interface WelcomeStorageData {
  preferences: WelcomePreferences;
  version: number; // For future migration support
  createdAt: number;
  updatedAt: number;
}

const STORAGE_VERSION = 1;

/**
 * Get welcome preferences from localStorage
 */
export const getWelcomePreferences = (): WelcomePreferences => {
  if (typeof window === 'undefined') {
    return DEFAULT_WELCOME_PREFERENCES;
  }

  try {
    const stored = localStorage.getItem(WELCOME_POPUP_CONFIG.storageKey);
    if (!stored) {
      return DEFAULT_WELCOME_PREFERENCES;
    }

    const data: WelcomeStorageData = JSON.parse(stored);
    
    // Handle version migration if needed
    if (data.version !== STORAGE_VERSION) {
      // For now, just return defaults for different versions
      return DEFAULT_WELCOME_PREFERENCES;
    }

    return data.preferences;
  } catch (error) {
    console.warn('Error reading welcome preferences from localStorage:', error);
    return DEFAULT_WELCOME_PREFERENCES;
  }
};

/**
 * Save welcome preferences to localStorage
 */
export const saveWelcomePreferences = (preferences: WelcomePreferences): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: WelcomeStorageData = {
      preferences,
      version: STORAGE_VERSION,
      createdAt: getWelcomePreferences().displayCount === 0 ? Date.now() : 
        (JSON.parse(localStorage.getItem(WELCOME_POPUP_CONFIG.storageKey) || '{}').createdAt || Date.now()),
      updatedAt: Date.now()
    };

    localStorage.setItem(WELCOME_POPUP_CONFIG.storageKey, JSON.stringify(data));
  } catch (error) {
    console.warn('Error saving welcome preferences to localStorage:', error);
  }
};

/**
 * Check if user should see the welcome popup
 */
export const shouldShowWelcomePopup = (): boolean => {
  if (!WELCOME_POPUP_CONFIG.enabled) {
    return false;
  }

  const preferences = getWelcomePreferences();

  // Don't show if user completed the welcome flow
  if (preferences.completedWelcome) {
    return false;
  }

  // Don't show if maximum display count reached
  if (preferences.displayCount >= WELCOME_POPUP_CONFIG.maxDisplayCount) {
    return false;
  }

  // For first visit, show immediately
  if (preferences.displayCount === 0 && WELCOME_POPUP_CONFIG.showOnFirstVisit) {
    return true;
  }

  // If user previously skipped, check if enough time has passed
  if (preferences.skippedAt) {
    const daysSinceSkip = (Date.now() - preferences.skippedAt) / (1000 * 60 * 60 * 24);
    return daysSinceSkip >= WELCOME_POPUP_CONFIG.showAfterDays;
  }

  // If user has been shown the popup before but didn't complete or skip,
  // don't show again immediately (they probably closed it)
  if (preferences.lastShownAt) {
    const hoursSinceLastShown = (Date.now() - preferences.lastShownAt) / (1000 * 60 * 60);
    return hoursSinceLastShown >= 24; // Show again after 24 hours
  }

  return false;
};

/**
 * Mark welcome popup as shown
 */
export const markWelcomePopupShown = (): void => {
  const preferences = getWelcomePreferences();
  const updatedPreferences: WelcomePreferences = {
    ...preferences,
    displayCount: preferences.displayCount + 1,
    lastShownAt: Date.now()
  };
  saveWelcomePreferences(updatedPreferences);
};

/**
 * Mark welcome popup as skipped
 */
export const markWelcomePopupSkipped = (): void => {
  const preferences = getWelcomePreferences();
  const updatedPreferences: WelcomePreferences = {
    ...preferences,
    skippedAt: Date.now()
  };
  saveWelcomePreferences(updatedPreferences);
};

/**
 * Mark welcome flow as completed
 */
export const markWelcomeFlowCompleted = (country?: string, interests: string[] = []): void => {
  const preferences = getWelcomePreferences();
  const updatedPreferences: WelcomePreferences = {
    ...preferences,
    ...(country && { country }),
    interests,
    completedWelcome: true
  };
  saveWelcomePreferences(updatedPreferences);
};

/**
 * Clear welcome preferences (for testing or reset functionality)
 */
export const clearWelcomePreferences = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(WELCOME_POPUP_CONFIG.storageKey);
    localStorage.removeItem(WELCOME_POPUP_CONFIG.bannerStorageKey);
  } catch (error) {
    console.warn('Error clearing welcome preferences from localStorage:', error);
  }
};

/**
 * Check if welcome banner should be shown
 * (for users who clicked "Explore First")
 */
export const shouldShowWelcomeBanner = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const preferences = getWelcomePreferences();
  
  // Don't show banner if user completed welcome flow
  if (preferences.completedWelcome) {
    return false;
  }

  // Check if banner was permanently dismissed
  try {
    const bannerDismissed = localStorage.getItem(WELCOME_POPUP_CONFIG.bannerStorageKey);
    if (bannerDismissed === 'true') {
      return false;
    }
  } catch (error) {
    console.warn('Error reading banner dismissal state:', error);
    return false;
  }

  // Show banner if user has interacted with the popup but hasn't completed welcome
  return preferences.displayCount > 0 && !preferences.completedWelcome;
};

/**
 * Mark welcome banner as dismissed
 */
export const dismissWelcomeBanner = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(WELCOME_POPUP_CONFIG.bannerStorageKey, 'true');
  } catch (error) {
    console.warn('Error saving banner dismissal state:', error);
  }
};

/**
 * Get user preferences for route determination
 */
export const getUserPreferencesForRouting = (): { country?: string; interests: string[] } => {
  const preferences = getWelcomePreferences();
  return {
    ...(preferences.country && { country: preferences.country }),
    interests: preferences.interests
  };
};

/**
 * Check if user is a first-time visitor
 */
export const isFirstTimeVisitor = (): boolean => {
  const preferences = getWelcomePreferences();
  return preferences.displayCount === 0;
};

/**
 * Get welcome popup statistics (for debugging/analytics)
 */
export const getWelcomePopupStats = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(WELCOME_POPUP_CONFIG.storageKey);
    if (!stored) {
      return {
        isFirstTime: true,
        shouldShow: shouldShowWelcomePopup(),
        shouldShowBanner: shouldShowWelcomeBanner()
      };
    }

    const data: WelcomeStorageData = JSON.parse(stored);
    return {
      ...data,
      isFirstTime: false,
      shouldShow: shouldShowWelcomePopup(),
      shouldShowBanner: shouldShowWelcomeBanner(),
      daysSinceCreated: (Date.now() - data.createdAt) / (1000 * 60 * 60 * 24),
      daysSinceUpdated: (Date.now() - data.updatedAt) / (1000 * 60 * 60 * 24)
    };
  } catch (error) {
    console.warn('Error getting welcome popup stats:', error);
    return null;
  }
};