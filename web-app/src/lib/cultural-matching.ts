/**
 * Cultural Matching System for Portuguese-speaking Community
 * Simple, safe, and focused on cultural compatibility
 */

import { PortugueseCountry, PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';
import { PORTUGUESE_HERITAGE } from '@/config/heritage';
import { 
  CulturalPreferences, 
  CulturalMatchingConfig, 
  DEFAULT_MATCHING_CONFIG,
  MatchProfile,
  calculateOverallCompatibility,
  getCompatibilityLevel,
  PORTUGUESE_ORIGIN_NAMES,
  CULTURAL_ELEMENT_NAMES
} from '@/types/cultural-preferences';

export interface LocationInfo {
  city: string;
  latitude: number;
  longitude: number;
  postcode?: string;
}

export interface SafeMatchingProfile {
  id: string;
  userId: string;
  name: string;
  age: number;
  location: LocationInfo;
  bio: string;
  interests: string[];
  culturalBackground: string[];
  languageSkills: {
    portuguese: 'native' | 'fluent' | 'intermediate' | 'beginner';
    english: 'native' | 'fluent' | 'intermediate' | 'beginner';
  };
  isVerified: boolean;
  lastActive: Date;
  safetyScore: number; // 1-10, higher is safer
}

export interface CulturalCompatibilityScore {
  overall: number;
  breakdown: {
    cultural: number;
    location: number;
    language: number;
    interests: number;
    age: number;
  };
  sharedElements: string[];
  recommendedIcebreakers: string[];
  connectionReasons: string[];
}

export interface MatchingFilters {
  ageRange: [number, number];
  maxDistance: number; // in kilometers
  culturalBackgrounds: string[];
  languagePreference: 'portuguese' | 'bilingual' | 'english';
  interests: string[];
  verifiedOnly: boolean;
}

// Default cultural matching filters
export const DEFAULT_MATCHING_FILTERS: MatchingFilters = {
  ageRange: [18, 65],
  maxDistance: 25, // 25km radius in London area
  culturalBackgrounds: ['PT', 'BR'], // Portugal and Brazil by default
  languagePreference: 'bilingual',
  interests: [],
  verifiedOnly: false
};

// Cultural interest categories for Portuguese-speaking community
export const CULTURAL_INTERESTS = {
  music: [
    'fado', 'traditional-music', 'modern-portuguese', 'brazilian-music',
    'african-lusophone', 'folk-music'
  ],
  food: [
    'portuguese-cuisine', 'brazilian-cuisine', 'palop-cuisine', 'cooking',
    'wine-tasting', 'food-festivals'
  ],
  traditions: [
    'santos-populares', 'christmas-traditions', 'religious-festivals',
    'regional-celebrations', 'family-traditions'
  ],
  arts: [
    'literature', 'poetry', 'visual-arts', 'crafts', 'theater', 'cinema'
  ],
  social: [
    'community-events', 'networking', 'sports', 'travel', 'language-exchange'
  ],
  professional: [
    'business', 'entrepreneurship', 'mentoring', 'career-development'
  ]
};

// Portuguese cultural icebreakers organized by category
export const CULTURAL_ICEBREAKERS = {
  food: [
    "What's your favorite Portuguese restaurant in London?",
    "Do you know how to make pastéis de nata?",
    "Have you tried any good bacalhau dishes here?",
    "Qual é o seu prato português favorito em Londres?"
  ],
  culture: [
    "Do you listen to Fado music?",
    "Have you been to any Santos Populares celebrations here?",
    "What do you miss most about Portuguese culture?",
    "Como celebra o Natal português em Londres?"
  ],
  location: [
    "How long have you been in the UK?",
    "What brought you to London?",
    "Do you ever visit the Portuguese areas in London?",
    "Conhece bem a comunidade portuguesa aqui?"
  ],
  social: [
    "Are you part of any Portuguese community groups?",
    "Do you follow Portuguese football?",
    "Have you been to any Lusophone events recently?",
    "Gosta de participar em eventos da comunidade?"
  ]
};

/**
 * Calculate distance between two geographic points using Haversine formula
 */
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate cultural compatibility between two profiles
 */
function calculateCulturalCompatibility(
  profile1: SafeMatchingProfile,
  profile2: SafeMatchingProfile
): number {
  // Shared cultural backgrounds (40% weight)
  const sharedBackgrounds = profile1.culturalBackground.filter(bg =>
    profile2.culturalBackground.includes(bg)
  );
  const culturalScore = (sharedBackgrounds.length / Math.max(
    profile1.culturalBackground.length,
    profile2.culturalBackground.length,
    1
  )) * 100;

  // Shared interests (35% weight)
  const sharedInterests = profile1.interests.filter(interest =>
    profile2.interests.includes(interest)
  );
  const interestsScore = (sharedInterests.length / Math.max(
    profile1.interests.length,
    profile2.interests.length,
    1
  )) * 100;

  // Language compatibility (25% weight)
  let languageScore = 0;
  if (profile1.languageSkills.portuguese === profile2.languageSkills.portuguese) {
    languageScore += 50;
  }
  if (profile1.languageSkills.english === profile2.languageSkills.english) {
    languageScore += 50;
  }

  return (culturalScore * 0.4 + interestsScore * 0.35 + languageScore * 0.25);
}

/**
 * Calculate location compatibility based on distance
 */
function calculateLocationCompatibility(
  profile1: SafeMatchingProfile,
  profile2: SafeMatchingProfile,
  maxDistance: number
): number {
  const distance = calculateDistance(
    profile1.location.latitude,
    profile1.location.longitude,
    profile2.location.latitude,
    profile2.location.longitude
  );

  if (distance <= maxDistance * 0.3) return 100; // Very close
  if (distance <= maxDistance * 0.6) return 80;  // Close
  if (distance <= maxDistance) return 60;        // Within range
  return 0; // Too far
}

/**
 * Calculate age compatibility
 */
function calculateAgeCompatibility(age1: number, age2: number): number {
  const ageDiff = Math.abs(age1 - age2);
  if (ageDiff <= 3) return 100;
  if (ageDiff <= 7) return 80;
  if (ageDiff <= 12) return 60;
  if (ageDiff <= 18) return 40;
  return 20;
}

/**
 * Generate recommended icebreakers based on shared interests
 */
function generateIcebreakers(
  profile1: SafeMatchingProfile,
  profile2: SafeMatchingProfile
): string[] {
  const sharedInterests = profile1.interests.filter(interest =>
    profile2.interests.includes(interest)
  );
  
  const sharedBackgrounds = profile1.culturalBackground.filter(bg =>
    profile2.culturalBackground.includes(bg)
  );

  const icebreakers: string[] = [];

  // Add food-related icebreakers if food interests are shared
  if (sharedInterests.some(i => CULTURAL_INTERESTS.food.includes(i))) {
    icebreakers.push(...CULTURAL_ICEBREAKERS.food.slice(0, 2));
  }

  // Add cultural icebreakers if cultural interests are shared
  if (sharedInterests.some(i => CULTURAL_INTERESTS.traditions.includes(i) || 
                                  CULTURAL_INTERESTS.music.includes(i))) {
    icebreakers.push(...CULTURAL_ICEBREAKERS.culture.slice(0, 2));
  }

  // Add location-based icebreakers
  icebreakers.push(...CULTURAL_ICEBREAKERS.location.slice(0, 1));

  // Add social icebreakers if social interests are shared
  if (sharedInterests.some(i => CULTURAL_INTERESTS.social.includes(i))) {
    icebreakers.push(...CULTURAL_ICEBREAKERS.social.slice(0, 1));
  }

  // Return up to 5 unique icebreakers
  return [...new Set(icebreakers)].slice(0, 5);
}

/**
 * Generate connection reasons explaining why two profiles are compatible
 */
function generateConnectionReasons(
  profile1: SafeMatchingProfile,
  profile2: SafeMatchingProfile,
  language: 'en' | 'pt' = 'en'
): string[] {
  const reasons: string[] = [];
  
  const sharedBackgrounds = profile1.culturalBackground.filter(bg =>
    profile2.culturalBackground.includes(bg)
  );
  
  const sharedInterests = profile1.interests.filter(interest =>
    profile2.interests.includes(interest)
  );

  if (language === 'pt') {
    if (sharedBackgrounds.length > 0) {
      const countries = sharedBackgrounds.map(code => 
        PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code)?.namePortuguese || code
      ).join(', ');
      reasons.push(`Têm origem cultural comum: ${countries}`);
    }

    if (sharedInterests.length > 0) {
      reasons.push(`Partilham ${sharedInterests.length} interesses culturais`);
    }

    if (profile1.languageSkills.portuguese === profile2.languageSkills.portuguese) {
      reasons.push('Têm o mesmo nível de português');
    }

    const distance = calculateDistance(
      profile1.location.latitude,
      profile1.location.longitude,
      profile2.location.latitude,
      profile2.location.longitude
    );
    
    if (distance <= 10) {
      reasons.push('Vivem perto um do outro em Londres');
    }
  } else {
    if (sharedBackgrounds.length > 0) {
      const countries = sharedBackgrounds.map(code => 
        PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code)?.name || code
      ).join(', ');
      reasons.push(`Share cultural heritage: ${countries}`);
    }

    if (sharedInterests.length > 0) {
      reasons.push(`Have ${sharedInterests.length} shared cultural interests`);
    }

    if (profile1.languageSkills.portuguese === profile2.languageSkills.portuguese) {
      reasons.push('Similar Portuguese language proficiency');
    }

    const distance = calculateDistance(
      profile1.location.latitude,
      profile1.location.longitude,
      profile2.location.latitude,
      profile2.location.longitude
    );
    
    if (distance <= 10) {
      reasons.push('Live close to each other in London');
    }
  }

  return reasons;
}

/**
 * Main matching function - finds compatible profiles
 */
export function findCulturalMatches(
  userProfile: SafeMatchingProfile,
  availableProfiles: SafeMatchingProfile[],
  filters: MatchingFilters = DEFAULT_MATCHING_FILTERS,
  maxResults: number = 20
): Array<SafeMatchingProfile & { compatibility: CulturalCompatibilityScore }> {
  
  const matches = availableProfiles
    .filter(profile => {
      // Don't match with self
      if (profile.userId === userProfile.userId) return false;

      // Age filter
      if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) {
        return false;
      }

      // Distance filter
      const distance = calculateDistance(
        userProfile.location.latitude,
        userProfile.location.longitude,
        profile.location.latitude,
        profile.location.longitude
      );
      if (distance > filters.maxDistance) return false;

      // Cultural background filter
      if (filters.culturalBackgrounds.length > 0) {
        const hasMatchingBackground = profile.culturalBackground.some(bg =>
          filters.culturalBackgrounds.includes(bg)
        );
        if (!hasMatchingBackground) return false;
      }

      // Verification filter
      if (filters.verifiedOnly && !profile.isVerified) return false;

      // Safety score filter (minimum 6/10)
      if (profile.safetyScore < 6) return false;

      return true;
    })
    .map(profile => {
      // Calculate compatibility scores
      const cultural = calculateCulturalCompatibility(userProfile, profile);
      const location = calculateLocationCompatibility(userProfile, profile, filters.maxDistance);
      const language = profile.languageSkills.portuguese === userProfile.languageSkills.portuguese ? 80 : 60;
      const interests = (profile.interests.filter(i => userProfile.interests.includes(i)).length /
                        Math.max(userProfile.interests.length, 1)) * 100;
      const age = calculateAgeCompatibility(userProfile.age, profile.age);

      const overall = (cultural * 0.3 + location * 0.2 + language * 0.2 + interests * 0.2 + age * 0.1);

      const sharedElements = [
        ...profile.culturalBackground.filter(bg => userProfile.culturalBackground.includes(bg)),
        ...profile.interests.filter(i => userProfile.interests.includes(i))
      ];

      const compatibility: CulturalCompatibilityScore = {
        overall: Math.round(overall),
        breakdown: {
          cultural: Math.round(cultural),
          location: Math.round(location),
          language: Math.round(language),
          interests: Math.round(interests),
          age: Math.round(age)
        },
        sharedElements,
        recommendedIcebreakers: generateIcebreakers(userProfile, profile),
        connectionReasons: generateConnectionReasons(userProfile, profile)
      };

      return {
        ...profile,
        compatibility
      };
    })
    .filter(match => match.compatibility.overall >= 50) // Minimum 50% compatibility
    .sort((a, b) => b.compatibility.overall - a.compatibility.overall)
    .slice(0, maxResults);

  return matches;
}

/**
 * Get cultural background display name
 */
export function getCulturalBackgroundName(
  code: string,
  language: 'en' | 'pt' = 'en'
): string {
  const country = PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code);
  return language === 'pt' ? country?.namePortuguese || code : country?.name || code;
}

/**
 * Validate a matching profile for safety
 */
export function validateProfileSafety(profile: SafeMatchingProfile): boolean {
  // Basic safety checks
  if (profile.safetyScore < 6) return false;
  if (!profile.isVerified) return false;
  if (profile.age < 18) return false;
  
  // Check for suspicious content in bio
  const suspiciousWords = ['money', 'investment', 'business opportunity', 'whatsapp', 'telegram'];
  const bioLower = profile.bio.toLowerCase();
  const hasSuspiciousContent = suspiciousWords.some(word => bioLower.includes(word));
  
  if (hasSuspiciousContent) return false;
  
  return true;
}

/**
 * Generate safe conversation starters based on Portuguese cultural context
 */
export function getPortugueseConversationStarters(
  sharedInterests: string[],
  sharedBackground: string[],
  language: 'en' | 'pt' = 'en'
): string[] {
  const starters: string[] = [];

  if (language === 'pt') {
    starters.push(
      "Olá! Como tem sido a experiência de viver em Londres?",
      "Que bom encontrar alguém da comunidade portuguesa aqui!",
      "Conhece algum restaurante português bom por aqui?"
    );

    if (sharedBackground.includes('PT')) {
      starters.push("De que região de Portugal é?");
    }
    if (sharedBackground.includes('BR')) {
      starters.push("Do Brasil! De que estado?");
    }
    if (sharedInterests.includes('fado')) {
      starters.push("Vi que gosta de Fado. Já foi a algum concerto aqui em Londres?");
    }
    if (sharedInterests.includes('football')) {
      starters.push("Também é fã de futebol português?");
    }
  } else {
    starters.push(
      "Hello! How are you finding life in London?",
      "Great to meet someone from the Portuguese-speaking community!",
      "Do you know any good Portuguese restaurants around here?"
    );

    if (sharedBackground.includes('PT')) {
      starters.push("Which region of Portugal are you from?");
    }
    if (sharedBackground.includes('BR')) {
      starters.push("From Brazil! Which state?");
    }
    if (sharedInterests.includes('fado')) {
      starters.push("I see you like Fado. Been to any concerts in London?");
    }
    if (sharedInterests.includes('football')) {
      starters.push("Also a Portuguese football fan?");
    }
  }

  return starters.slice(0, 5);
}

/**
 * Export the main matching service
 */
export const CulturalMatchingService = {
  findMatches: findCulturalMatches,
  validateProfile: validateProfileSafety,
  getConversationStarters: getPortugueseConversationStarters,
  getCulturalName: getCulturalBackgroundName,
  calculateDistance,
  CULTURAL_INTERESTS,
  CULTURAL_ICEBREAKERS,
  DEFAULT_FILTERS: DEFAULT_MATCHING_FILTERS
};