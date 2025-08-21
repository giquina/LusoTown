/**
 * Matching preferences system for Portuguese-speaking country filtering
 */

import { PORTUGUESE_SPEAKING_COUNTRIES, DEFAULT_COUNTRY_PREFERENCES, isValidCountryCode } from '@/config/portuguese-countries';

export interface MatchingPreferences {
  preferredCountries: string[]; // Country codes
  ageRange: {
    min: number;
    max: number;
  };
  distanceRange: number; // in miles
  lookingFor: 'friendship' | 'dating' | 'networking' | 'any';
  interests: string[];
  languages: string[];
  lastUpdated: string;
}

export const DEFAULT_MATCHING_PREFERENCES: MatchingPreferences = {
  preferredCountries: DEFAULT_COUNTRY_PREFERENCES,
  ageRange: {
    min: 25,
    max: 45,
  },
  distanceRange: 50, // 50 miles
  lookingFor: 'any',
  interests: [],
  languages: ['Portuguese', 'English'],
  lastUpdated: new Date().toISOString(),
};

// Validate country preferences
export const validateCountryPreferences = (countries: string[]): string[] => {
  return countries.filter(code => isValidCountryCode(code));
};

// Check if user matches country preferences
export const matchesCountryPreferences = (
  userCountry: string,
  preferredCountries: string[]
): boolean => {
  if (preferredCountries.length === 0) {
    return true; // No preference means match with everyone
  }
  
  return preferredCountries.includes(userCountry);
};

// Get country compatibility score (0-100)
export const getCountryCompatibilityScore = (
  user1Countries: string[],
  user2Countries: string[]
): number => {
  if (user1Countries.length === 0 || user2Countries.length === 0) {
    return 100; // No preferences means fully compatible
  }
  
  // Check if there's any overlap
  const hasOverlap = user1Countries.some(country => user2Countries.includes(country));
  
  if (hasOverlap) {
    // Calculate percentage of overlap
    const overlap = user1Countries.filter(country => user2Countries.includes(country));
    const totalUniqueCountries = new Set([...user1Countries, ...user2Countries]).size;
    return Math.round((overlap.length / totalUniqueCountries) * 100);
  }
  
  return 0; // No compatibility
};

// Save preferences to localStorage
export const saveMatchingPreferences = (preferences: MatchingPreferences): void => {
  try {
    const validatedPreferences = {
      ...preferences,
      preferredCountries: validateCountryPreferences(preferences.preferredCountries),
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem('lusotown-matching-preferences', JSON.stringify(validatedPreferences));
  } catch (error) {
    console.error('Failed to save matching preferences:', error);
  }
};

// Load preferences from localStorage
export const loadMatchingPreferences = (): MatchingPreferences => {
  try {
    const stored = localStorage.getItem('lusotown-matching-preferences');
    if (stored) {
      const parsed = JSON.parse(stored) as MatchingPreferences;
      return {
        ...DEFAULT_MATCHING_PREFERENCES,
        ...parsed,
        preferredCountries: validateCountryPreferences(parsed.preferredCountries || DEFAULT_COUNTRY_PREFERENCES),
      };
    }
  } catch (error) {
    console.error('Failed to load matching preferences:', error);
  }
  
  return DEFAULT_MATCHING_PREFERENCES;
};

// Update specific preference
export const updateMatchingPreference = <T extends keyof MatchingPreferences>(
  key: T,
  value: MatchingPreferences[T]
): void => {
  const currentPreferences = loadMatchingPreferences();
  const updatedPreferences = {
    ...currentPreferences,
    [key]: value,
    lastUpdated: new Date().toISOString(),
  };
  
  saveMatchingPreferences(updatedPreferences);
};

// Get country preference statistics for analytics
export const getCountryPreferenceStats = (allUserPreferences: string[][]): Record<string, number> => {
  const stats: Record<string, number> = {};
  
  allUserPreferences.forEach(preferences => {
    preferences.forEach(countryCode => {
      stats[countryCode] = (stats[countryCode] || 0) + 1;
    });
  });
  
  return stats;
};

// Suggest popular countries based on community preferences
export const suggestPopularCountries = (
  currentPreferences: string[],
  communityStats: Record<string, number>,
  maxSuggestions: number = 3
): string[] => {
  // Get countries not already selected
  const unselectedCountries = PORTUGUESE_SPEAKING_COUNTRIES
    .map(country => country.code)
    .filter(code => !currentPreferences.includes(code));
  
  // Sort by popularity in community
  const sortedByPopularity = unselectedCountries
    .sort((a, b) => (communityStats[b] || 0) - (communityStats[a] || 0))
    .slice(0, maxSuggestions);
  
  return sortedByPopularity;
};