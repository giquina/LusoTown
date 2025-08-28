/**
 * Cultural Matching System Tests
 * Tests for the Portuguese-speaking community matching algorithm
 */

import {
  CulturalMatchingService,
  SafeMatchingProfile,
  calculateDistance,
  getCulturalBackgroundName,
  getPortugueseConversationStarters
} from '@/lib/cultural-matching';

describe('Cultural Matching System', () => {
  const mockUserProfile: SafeMatchingProfile = {
    id: 'user1',
    userId: 'user1',
    name: 'Test User',
    age: 28,
    location: {
      city: 'London',
      latitude: 51.5074,
      longitude: -0.1278
    },
    bio: 'Portuguese from Porto, love fado and traditional cooking',
    interests: ['fado', 'portuguese_cuisine', 'community_events'],
    culturalBackground: ['PT'],
    languageSkills: {
      portuguese: 'native',
      english: 'fluent'
    },
    isVerified: true,
    lastActive: new Date(),
    safetyScore: 8
  };

  const mockCandidateProfiles: SafeMatchingProfile[] = [
    {
      id: 'candidate1',
      userId: 'candidate1',
      name: 'Maria Silva',
      age: 26,
      location: {
        city: 'London',
        latitude: 51.5074,
        longitude: -0.1278
      },
      bio: 'Also from Porto, love fado and Portuguese culture',
      interests: ['fado', 'portuguese_cuisine', 'cultural_education'],
      culturalBackground: ['PT'],
      languageSkills: {
        portuguese: 'native',
        english: 'intermediate'
      },
      isVerified: true,
      lastActive: new Date(),
      safetyScore: 9
    },
    {
      id: 'candidate2',
      userId: 'candidate2',
      name: 'Carlos Santos',
      age: 35,
      location: {
        city: 'London',
        latitude: 51.4994,
        longitude: -0.1270
      },
      bio: 'Brazilian software engineer, love music and networking',
      interests: ['brazilian_music', 'networking', 'football'],
      culturalBackground: ['BR'],
      languageSkills: {
        portuguese: 'native',
        english: 'fluent'
      },
      isVerified: true,
      lastActive: new Date(),
      safetyScore: 7
    },
    {
      id: 'candidate3',
      userId: 'candidate3',
      name: 'Ana Costa',
      age: 45,
      location: {
        city: 'Manchester',
        latitude: 53.4808,
        longitude: -2.2426
      },
      bio: 'Cape Verdean community leader, love cultural events',
      interests: ['community_events', 'cultural_education', 'portuguese_cuisine'],
      culturalBackground: ['CV'],
      languageSkills: {
        portuguese: 'fluent',
        english: 'native'
      },
      isVerified: true,
      lastActive: new Date(),
      safetyScore: 8
    }
  ];

  describe('Distance Calculation', () => {
    it('should calculate correct distance between London coordinates', () => {
      const distance = calculateDistance(51.5074, -0.1278, 51.4994, -0.1270);
      expect(distance).toBeGreaterThan(0);
      expect(distance).toBeLessThan(5); // Should be under 5km for nearby London locations
    });

    it('should calculate correct distance between London and Manchester', () => {
      const distance = calculateDistance(51.5074, -0.1278, 53.4808, -2.2426);
      expect(distance).toBeGreaterThan(200); // Should be around 200+ km
      expect(distance).toBeLessThan(300);
    });
  });

  describe('Cultural Background Names', () => {
    it('should return correct English names for country codes', () => {
      expect(getCulturalBackgroundName('PT', 'en')).toBe('Portugal');
      expect(getCulturalBackgroundName('BR', 'en')).toBe('Brazil');
      expect(getCulturalBackgroundName('CV', 'en')).toBe('Cape Verde');
    });

    it('should return correct Portuguese names for country codes', () => {
      expect(getCulturalBackgroundName('PT', 'pt')).toBe('Portugal');
      expect(getCulturalBackgroundName('BR', 'pt')).toBe('Brasil');
      expect(getCulturalBackgroundName('CV', 'pt')).toBe('Cabo Verde');
    });
  });

  describe('Conversation Starters', () => {
    it('should generate Portuguese conversation starters', () => {
      const starters = getPortugueseConversationStarters(['fado'], ['PT'], 'pt');
      expect(starters).toHaveLength(5);
      expect(starters.some(s => s.includes('Fado'))).toBeTruthy();
      expect(starters.some(s => s.includes('região de Portugal'))).toBeTruthy();
    });

    it('should generate English conversation starters', () => {
      const starters = getPortugueseConversationStarters(['football'], ['BR'], 'en');
      expect(starters).toHaveLength(5);
      expect(starters.some(s => s.includes('Brazil'))).toBeTruthy();
      expect(starters.some(s => s.includes('football'))).toBeTruthy();
    });
  });

  describe('Cultural Matching Algorithm', () => {
    it('should find matches with compatible profiles', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles,
        {
          ageRange: [18, 65],
          maxDistance: 500, // Large radius to include all candidates
          culturalBackgrounds: [], // Include all backgrounds
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: false
        }
      );

      expect(matches).toHaveLength(3); // All candidates should be returned
      expect(matches[0].compatibility.overall).toBeGreaterThan(0);
    });

    it('should rank higher compatibility matches first', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles,
        {
          ageRange: [18, 65],
          maxDistance: 500,
          culturalBackgrounds: [],
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: false
        }
      );

      // First match should be the Portuguese candidate with shared interests
      expect(matches[0].culturalBackground).toContain('PT');
      expect(matches[0].compatibility.overall).toBeGreaterThan(matches[1].compatibility.overall);
    });

    it('should filter by age range', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles,
        {
          ageRange: [25, 30],
          maxDistance: 50,
          culturalBackgrounds: [],
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: false
        }
      );

      // Should only include candidates within age range (26-30)
      expect(matches).toHaveLength(1);
      expect(matches[0].name).toBe('Maria Silva');
    });

    it('should filter by distance', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles,
        {
          ageRange: [18, 65],
          maxDistance: 10, // Only London area
          culturalBackgrounds: [],
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: false
        }
      );

      // Should exclude Manchester candidate
      expect(matches).toHaveLength(2);
      expect(matches.every(m => m.location.city === 'London')).toBeTruthy();
    });

    it('should filter by cultural background', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles,
        {
          ageRange: [18, 65],
          maxDistance: 500,
          culturalBackgrounds: ['PT'], // Only Portuguese
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: false
        }
      );

      // Should only include Portuguese candidates
      expect(matches).toHaveLength(1);
      expect(matches[0].culturalBackground).toContain('PT');
    });

    it('should filter by verification status', () => {
      const unverifiedProfile = {
        ...mockCandidateProfiles[0],
        isVerified: false
      };
      
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        [unverifiedProfile, ...mockCandidateProfiles.slice(1)],
        {
          ageRange: [18, 65],
          maxDistance: 500,
          culturalBackgrounds: [],
          languagePreference: 'bilingual',
          interests: [],
          verifiedOnly: true
        }
      );

      // Should exclude unverified profile
      expect(matches.every(m => m.isVerified)).toBeTruthy();
    });

    it('should enforce minimum compatibility score', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles
      );

      // All matches should meet minimum 50% compatibility
      expect(matches.every(m => m.compatibility.overall >= 50)).toBeTruthy();
    });

    it('should generate shared elements', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles
      );

      const portugueseMatch = matches.find(m => m.culturalBackground.includes('PT'));
      expect(portugueseMatch?.compatibility.sharedElements).toContain('PT');
      expect(portugueseMatch?.compatibility.sharedElements.length).toBeGreaterThan(0);
    });

    it('should generate connection reasons', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles
      );

      expect(matches[0].compatibility.connectionReasons.length).toBeGreaterThan(0);
      expect(matches[0].compatibility.connectionReasons[0]).toContain('cultural');
    });

    it('should generate recommended icebreakers', () => {
      const matches = CulturalMatchingService.findMatches(
        mockUserProfile,
        mockCandidateProfiles
      );

      expect(matches[0].compatibility.recommendedIcebreakers.length).toBeGreaterThan(0);
      expect(matches[0].compatibility.recommendedIcebreakers.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Profile Safety Validation', () => {
    it('should validate safe profiles', () => {
      const isValid = CulturalMatchingService.validateProfile(mockUserProfile);
      expect(isValid).toBeTruthy();
    });

    it('should reject profiles with low safety score', () => {
      const unsafeProfile = {
        ...mockUserProfile,
        safetyScore: 4
      };
      
      const isValid = CulturalMatchingService.validateProfile(unsafeProfile);
      expect(isValid).toBeFalsy();
    });

    it('should reject unverified profiles in safety check', () => {
      const unverifiedProfile = {
        ...mockUserProfile,
        isVerified: false
      };
      
      const isValid = CulturalMatchingService.validateProfile(unverifiedProfile);
      expect(isValid).toBeFalsy();
    });

    it('should reject underage profiles', () => {
      const underageProfile = {
        ...mockUserProfile,
        age: 16
      };
      
      const isValid = CulturalMatchingService.validateProfile(underageProfile);
      expect(isValid).toBeFalsy();
    });

    it('should reject profiles with suspicious content', () => {
      const suspiciousProfile = {
        ...mockUserProfile,
        bio: 'Looking for investment opportunities and money'
      };
      
      const isValid = CulturalMatchingService.validateProfile(suspiciousProfile);
      expect(isValid).toBeFalsy();
    });
  });
});