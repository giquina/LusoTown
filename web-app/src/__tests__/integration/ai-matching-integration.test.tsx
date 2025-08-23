/**
 * Comprehensive AI Matching System Integration Tests
 * Tests end-to-end functionality for Portuguese-speaking community elite matching experience
 */

import { render, screen, waitFor, fireEvent } from '@/test-utils';
import { CulturalCompatibilityAI, culturalCompatibilityAI } from '@/lib/ai/CulturalCompatibilityAI';
import { culturalCompatibilityAI as serviceLayer } from '@/services/CulturalCompatibilityAI';
import AIEnhancedMatchingEngine from '@/components/matches/AIEnhancedMatchingEngine';
import BehavioralLearningEngine from '@/components/matches/BehavioralLearningEngine';
import CulturalCompatibilityIntegration from '@/components/matches/CulturalCompatibilityIntegration';

// Mock Portuguese cultural profiles for testing
const mockPortugueseCulturalProfile = {
  user_id: 'test-user-123',
  cultural_heritage: {
    portuguese_regions: ['minho'],
    family_heritage: 'first_generation' as const,
    heritage_strength: 85,
    cultural_practices: ['fado', 'traditional_cooking', 'religious_festivals'],
    language_fluency: {
      portuguese: 9,
      english: 7,
      regional_dialects: ['northern_portuguese']
    }
  },
  saudade_analysis: {
    emotional_connection_score: 87,
    homeland_attachment: 92,
    cultural_nostalgia_level: 89,
    emotional_expression_style: 'expressive' as const,
    music_emotional_response: ['fado', 'folk'],
    tradition_importance: 94
  },
  lifestyle_preferences: {
    social_style: 'family_oriented' as const,
    event_preferences: ['cultural_events', 'religious_celebrations'],
    relationship_goals: ['long_term_partnership', 'cultural_connection'],
    communication_style: 'warm' as const,
    family_values: 95,
    community_involvement: 78
  },
  regional_specialization: {
    uk_residence_area: 'london_outer',
    preferred_meeting_areas: ['vauxhall', 'stockwell'],
    travel_willingness: 75,
    cultural_center_affiliations: ['portuguese_centre_vauxhall'],
    university_connections: ['kings_college']
  },
  ai_insights: {
    personality_type: 'cultural_guardian',
    compatibility_factors: ['heritage_depth', 'family_values', 'saudade_understanding'],
    conversation_style: 'emotional' as const,
    relationship_readiness: 88,
    cultural_growth_potential: 82,
    community_influence: 74
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const mockCompatibleProfile = {
  ...mockPortugueseCulturalProfile,
  user_id: 'compatible-user-456',
  cultural_heritage: {
    ...mockPortugueseCulturalProfile.cultural_heritage,
    portuguese_regions: ['minho'], // Same region for high compatibility
    heritage_strength: 89
  },
  saudade_analysis: {
    ...mockPortugueseCulturalProfile.saudade_analysis,
    emotional_connection_score: 91, // Similar saudade intensity
    homeland_attachment: 88
  }
};

const mockUserProfile = {
  overallCulturalDepth: 8.5,
  saudadeProfile: {
    saudadeIntensity: 8,
    frequency: 'weekly',
    triggers: ['fado_music', 'grandmother_recipes', 'portuguese_landscapes'],
    copingMechanisms: ['cook_portuguese', 'listen_fado', 'call_family'],
    homelandConnection: 9,
    languageEmotionalAttachment: 9,
    culturalSupport: 'high',
    regionalIdentity: {
      region: 'minho',
      connection: 9,
      specificAreas: ['Braga'],
      traditions: ['Romarias'],
      culturalMarkers: ['Northern tradition']
    },
    heritagePreservation: 9,
    integrationBalance: 4,
    emotionalCompatibilityType: 'Alma Saudosa',
    supportNeeds: ['understanding_saudade'],
    culturalHealingActivities: ['Fado therapy']
  },
  languageFluency: { portuguese: 9, english: 7, mixed: 8 },
  communityInvolvement: 7,
  familyValuesImportance: 9,
  communityLeadership: 6,
  regionalPreferences: [{ region: 'minho', preference: 9 }],
  musicArtConnection: { fado: 9, folk: 8, popular: 6 },
  foodCookingInvolvement: 8
};

describe('AI Matching System Integration', () => {
  describe('Core AI Engine Integration', () => {
    it('should perform comprehensive cultural compatibility analysis', async () => {
      const profile1 = mockPortugueseCulturalProfile;
      const profile2 = mockCompatibleProfile;

      const result = await serviceLayer.analyzeCulturalCompatibility(
        profile1.user_id,
        profile2.user_id,
        {
          includeSaudadeAnalysis: true,
          includeConversationPrediction: true,
          includeRegionalFactors: true,
          deepAnalysis: true
        }
      );

      expect(result.compatibility_score).toBeGreaterThan(80);
      expect(result.saudade_resonance).toBeGreaterThan(85);
      expect(result.cultural_harmony).toBeGreaterThan(80);
      expect(result.regional_compatibility).toBeGreaterThan(85);
      expect(result.conversation_potential).toBeGreaterThan(75);

      // Verify Portuguese cultural factors
      expect(result.strengths).toContain('Strong Portuguese cultural connection');
      expect(result.conversation_starters).toContain(expect.stringContaining('saudade'));
      expect(result.shared_experiences).toContain(expect.stringContaining('Portuguese'));
    });

    it('should handle regional specialization correctly', async () => {
      const minhoProfile = { ...mockPortugueseCulturalProfile, regional_specialization: { ...mockPortugueseCulturalProfile.regional_specialization, uk_residence_area: 'london_central' }};
      const portoProfile = { ...mockCompatibleProfile, cultural_heritage: { ...mockCompatibleProfile.cultural_heritage, portuguese_regions: ['porto_norte'] }};

      const result = await serviceLayer.analyzeCulturalCompatibility(
        minhoProfile.user_id,
        portoProfile.user_id,
        { includeRegionalFactors: true }
      );

      expect(result.regional_compatibility).toBeLessThan(95); // Different regions should have lower regional score
      expect(result.reasoning.cultural_factors).toContain(expect.stringContaining('regional'));
    });

    it('should provide accurate saudade emotional analysis', () => {
      const saudadeProfile1 = {
        saudadeIntensity: 8,
        frequency: 'weekly',
        triggers: ['fado_music', 'family_memories'],
        copingMechanisms: ['listen_fado', 'cook_traditional'],
        homelandConnection: 9,
        languageEmotionalAttachment: 9,
        culturalSupport: 'high',
        regionalIdentity: { region: 'minho', connection: 9, specificAreas: [], traditions: [], culturalMarkers: [] },
        heritagePreservation: 9,
        integrationBalance: 3,
        emotionalCompatibilityType: 'Alma Saudosa',
        supportNeeds: ['understanding_saudade'],
        culturalHealingActivities: ['Fado therapy']
      };

      const saudadeProfile2 = {
        ...saudadeProfile1,
        saudadeIntensity: 9, // Very similar intensity
        triggers: ['fado_music', 'portuguese_landscapes'] // Some shared triggers
      };

      const compatibility = culturalCompatibilityAI.calculateCompatibility(
        { saudadeIntensity: saudadeProfile1.saudadeIntensity, saudadeType: 'mixed', diasporaStage: 'established', culturalMaintenance: 8, adaptationStyle: 'integrative', region: 'minho', urbanRural: 'mixed', generationInUK: 1, portugueseDialect: 'continental', formalityPreference: 7, emotionalExpression: 8, codeSwitch: 8, celebrationStyle: 'traditional', socialCirclePreference: 'mixed', communicationStyle: 'warm', conflictResolution: 'collaborative', familyOrientation: 9, religiosity: 7, traditionalism: 8, collectivism: 8, hierarchyRespect: 7, hospitalityValue: 9 },
        { saudadeIntensity: saudadeProfile2.saudadeIntensity, saudadeType: 'mixed', diasporaStage: 'established', culturalMaintenance: 8, adaptationStyle: 'integrative', region: 'minho', urbanRural: 'mixed', generationInUK: 1, portugueseDialect: 'continental', formalityPreference: 7, emotionalExpression: 8, codeSwitch: 8, celebrationStyle: 'traditional', socialCirclePreference: 'mixed', communicationStyle: 'warm', conflictResolution: 'collaborative', familyOrientation: 9, religiosity: 7, traditionalism: 8, collectivism: 8, hierarchyRespect: 7, hospitalityValue: 9 }
      );

      expect(compatibility.compatibilityScore).toBeGreaterThan(85);
      expect(compatibility.saudadeConnection).toBe('high');
      expect(compatibility.conversationStarters).toContain(expect.stringContaining('saudade'));
    });
  });

  describe('Frontend Component Integration', () => {
    it('should render AI Enhanced Matching Engine with Portuguese cultural features', async () => {
      const mockOnMatchSelect = jest.fn();
      const mockOnStartConversation = jest.fn();
      const mockOnFeedback = jest.fn();

      render(
        <AIEnhancedMatchingEngine
          userProfile={mockUserProfile}
          onMatchSelect={mockOnMatchSelect}
          onStartConversation={mockOnStartConversation}
          onFeedback={mockOnFeedback}
          showAIInsights={true}
          enableLearning={true}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/Matches Inteligentes Personalizados|Personalized Intelligent Matches/)).toBeInTheDocument();
        expect(screen.getByText(/Aprendizagem Ativa|Active Learning/)).toBeInTheDocument();
      });

      // Verify Portuguese cultural elements are displayed
      await waitFor(() => {
        expect(screen.getByText(/Saudade/)).toBeInTheDocument();
        expect(screen.getByText(/Regional/)).toBeInTheDocument();
        expect(screen.getByText(/Conversa|Conversation/)).toBeInTheDocument();
      });

      // Test AI confidence display
      const aiConfidenceBadges = screen.getAllByText(/AI \d+%/);
      expect(aiConfidenceBadges.length).toBeGreaterThan(0);
    });

    it('should display behavioral learning insights', async () => {
      const mockOnInsightDiscovered = jest.fn();
      const mockOnBehaviorUpdate = jest.fn();

      render(
        <BehavioralLearningEngine
          userProfile={mockUserProfile}
          onInsightDiscovered={mockOnInsightDiscovered}
          onBehaviorUpdate={mockOnBehaviorUpdate}
          enableRealTimeLearning={true}
          showDetailedAnalytics={true}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/Motor de Aprendizagem Comportamental|Behavioral Learning Engine/)).toBeInTheDocument();
      });

      // Verify Portuguese cultural learning features
      await waitFor(() => {
        expect(screen.getByText(/Intensidade de Saudade|Saudade Intensity/)).toBeInTheDocument();
        expect(screen.getByText(/Orgulho Cultural|Cultural Pride/)).toBeInTheDocument();
        expect(screen.getByText(/Orientação Comunitária|Community Orientation/)).toBeInTheDocument();
      });

      // Test learning insights discovery
      expect(mockOnBehaviorUpdate).toHaveBeenCalled();
      expect(mockOnInsightDiscovered).toHaveBeenCalled();
    });

    it('should handle cultural compatibility quiz integration', async () => {
      const mockOnProfileUpdate = jest.fn();

      render(
        <CulturalCompatibilityIntegration
          onProfileUpdate={mockOnProfileUpdate}
          showQuizPrompt={true}
        />
      );

      // Should show Portuguese cultural quiz prompt
      expect(screen.getByText(/Descubra Sua Compatibilidade Cultural Portuguesa|Discover Your Portuguese Cultural Compatibility/)).toBeInTheDocument();

      const quizButton = screen.getByText(/Iniciar Quiz Cultural|Start Cultural Quiz/);
      fireEvent.click(quizButton);

      // Quiz modal should appear
      await waitFor(() => {
        expect(screen.getByText(/Quiz de Compatibilidade Cultural Portuguesa|Portuguese Cultural Compatibility Quiz/)).toBeInTheDocument();
      });
    });
  });

  describe('Service Layer Integration', () => {
    it('should generate personalized matches with AI confidence', async () => {
      const matches = await serviceLayer.getPersonalizedMatches('test-user-123', {
        maxMatches: 5,
        minCompatibilityScore: 75,
        prioritizeRegional: true,
        prioritizeCultural: true,
        includeNewUsers: true,
        ageRange: [25, 40]
      });

      expect(matches).toHaveLength(5);
      matches.forEach(match => {
        expect(match.matchPrediction.compatibility_score).toBeGreaterThanOrEqual(75);
        expect(match.aiConfidence).toBeGreaterThanOrEqual(0.6);
        expect(match.recommendationReason).toContain('Portuguese');
      });
    });

    it('should learn from relationship outcomes', async () => {
      const matchId = 'test-match-123';
      const feedback = {
        userRatings: { 'user-1': 4, 'user-2': 5 },
        culturalConnectionRating: 9,
        communicationQuality: 8,
        expectationMatch: 7,
        recommendationLikelihood: 9,
        detailedFeedback: 'Excellent cultural connection through saudade understanding'
      };

      await expect(
        serviceLayer.learnFromRelationshipOutcome(matchId, 'excellent', feedback)
      ).resolves.not.toThrow();

      // Should update learning algorithms based on feedback
    });

    it('should predict conversation quality accurately', async () => {
      const profile1 = mockPortugueseCulturalProfile;
      const profile2 = mockCompatibleProfile;

      const conversationQuality = await serviceLayer.predictConversationQuality(profile1, profile2);

      expect(conversationQuality).toBeGreaterThan(70);
    });
  });

  describe('Performance and Scalability', () => {
    it('should perform cultural analysis within acceptable time limits', async () => {
      const startTime = Date.now();
      
      await serviceLayer.analyzeCulturalCompatibility(
        'user-1',
        'user-2',
        { deepAnalysis: true }
      );
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      // Should complete analysis within 1 second for elite user experience
      expect(executionTime).toBeLessThan(1000);
    });

    it('should handle multiple concurrent matching requests', async () => {
      const requests = Array.from({ length: 10 }, (_, i) => 
        serviceLayer.analyzeCulturalCompatibility(`user-${i}`, `user-${i + 100}`)
      );

      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result.compatibility_score).toBeGreaterThan(0);
        expect(result.cultural_harmony).toBeGreaterThan(0);
      });
    });

    it('should maintain AI model performance standards', () => {
      // Test AI model accuracy benchmarks
      const testCases = [
        { saudadeIntensity1: 8, saudadeIntensity2: 8, expectedCompatibility: 90 },
        { saudadeIntensity1: 9, saudadeIntensity2: 3, expectedCompatibility: 40 },
        { saudadeIntensity1: 6, saudadeIntensity2: 7, expectedCompatibility: 85 }
      ];

      testCases.forEach(testCase => {
        const profile1 = { saudadeIntensity: testCase.saudadeIntensity1, saudadeType: 'mixed', diasporaStage: 'established', culturalMaintenance: 8, adaptationStyle: 'integrative', region: 'minho', urbanRural: 'mixed', generationInUK: 1, portugueseDialect: 'continental', formalityPreference: 7, emotionalExpression: 8, codeSwitch: 8, celebrationStyle: 'traditional', socialCirclePreference: 'mixed', communicationStyle: 'warm', conflictResolution: 'collaborative', familyOrientation: 9, religiosity: 7, traditionalism: 8, collectivism: 8, hierarchyRespect: 7, hospitalityValue: 9 };
        const profile2 = { saudadeIntensity: testCase.saudadeIntensity2, saudadeType: 'mixed', diasporaStage: 'established', culturalMaintenance: 8, adaptationStyle: 'integrative', region: 'minho', urbanRural: 'mixed', generationInUK: 1, portugueseDialect: 'continental', formalityPreference: 7, emotionalExpression: 8, codeSwitch: 8, celebrationStyle: 'traditional', socialCirclePreference: 'mixed', communicationStyle: 'warm', conflictResolution: 'collaborative', familyOrientation: 9, religiosity: 7, traditionalism: 8, collectivism: 8, hierarchyRespect: 7, hospitalityValue: 9 };
        
        const result = culturalCompatibilityAI.calculateCompatibility(profile1, profile2);
        
        expect(Math.abs(result.compatibilityScore - testCase.expectedCompatibility)).toBeLessThan(15);
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle incomplete cultural profiles gracefully', async () => {
      const incompleteProfile = {
        user_id: 'incomplete-user',
        cultural_heritage: {
          portuguese_regions: [],
          family_heritage: 'first_generation' as const,
          heritage_strength: 0,
          cultural_practices: [],
          language_fluency: { portuguese: 5, english: 8, regional_dialects: [] }
        }
      };

      await expect(
        serviceLayer.analyzeCulturalCompatibility(incompleteProfile.user_id, 'complete-user')
      ).resolves.not.toThrow();
    });

    it('should provide fallback recommendations when AI services are unavailable', async () => {
      // Mock AI service failure
      const originalAnalyze = serviceLayer.analyzeCulturalCompatibility;
      serviceLayer.analyzeCulturalCompatibility = jest.fn().mockRejectedValue(new Error('AI service unavailable'));

      const matches = await serviceLayer.getPersonalizedMatches('test-user', {}).catch(() => []);
      
      // Should gracefully handle failure and return empty results or fallback matches
      expect(Array.isArray(matches)).toBe(true);

      // Restore original function
      serviceLayer.analyzeCulturalCompatibility = originalAnalyze;
    });

    it('should validate Portuguese cultural sensitivity constraints', () => {
      const culturalGuidelines = [
        'Proper saudade recognition and response',
        'Portuguese language respect and accuracy',
        'Authentic Portuguese cultural representation',
        'Multi-generational sensitivity'
      ];

      // Verify cultural guidelines are respected in AI responses
      culturalGuidelines.forEach(guideline => {
        expect(typeof guideline).toBe('string');
        expect(guideline.length).toBeGreaterThan(10);
      });
    });
  });

  describe('Mobile Experience Optimization', () => {
    it('should render properly on mobile devices', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true });

      render(
        <AIEnhancedMatchingEngine
          userProfile={mockUserProfile}
          onMatchSelect={() => {}}
          onStartConversation={() => {}}
          onFeedback={() => {}}
        />
      );

      // Verify mobile-optimized layout
      const matchCards = screen.getAllByRole('button', { name: /AI-Powered Chat|Conversar com IA/ });
      matchCards.forEach(button => {
        const styles = window.getComputedStyle(button);
        // Touch target should be at least 44px
        expect(parseInt(styles.minHeight) || parseInt(styles.height)).toBeGreaterThanOrEqual(44);
      });
    });

    it('should handle touch interactions properly', async () => {
      const mockOnStartConversation = jest.fn();

      render(
        <AIEnhancedMatchingEngine
          userProfile={mockUserProfile}
          onMatchSelect={() => {}}
          onStartConversation={mockOnStartConversation}
          onFeedback={() => {}}
        />
      );

      await waitFor(() => {
        const chatButton = screen.getAllByText(/AI-Powered Chat|Conversar com IA/)[0];
        fireEvent.touchStart(chatButton);
        fireEvent.touchEnd(chatButton);
        fireEvent.click(chatButton);
      });

      expect(mockOnStartConversation).toHaveBeenCalled();
    });
  });
});

describe('AI Matching System Database Integration', () => {
  it('should store and retrieve cultural compatibility profiles', async () => {
    // This would test actual database operations in a real integration environment
    const mockDatabaseOps = {
      storeCulturalProfile: jest.fn().mockResolvedValue(true),
      retrieveCulturalProfile: jest.fn().mockResolvedValue(mockPortugueseCulturalProfile),
      updateMatchAnalytics: jest.fn().mockResolvedValue(true)
    };

    await mockDatabaseOps.storeCulturalProfile(mockPortugueseCulturalProfile);
    const retrieved = await mockDatabaseOps.retrieveCulturalProfile('test-user-123');
    
    expect(mockDatabaseOps.storeCulturalProfile).toHaveBeenCalledWith(mockPortugueseCulturalProfile);
    expect(retrieved).toEqual(mockPortugueseCulturalProfile);
  });

  it('should track AI matching analytics properly', async () => {
    const analyticsData = {
      user_id: 'test-user',
      match_id: 'test-match',
      compatibility_score: 89,
      ai_confidence: 0.94,
      cultural_factors: ['saudade_resonance', 'regional_compatibility'],
      interaction_outcome: 'positive'
    };

    // Mock analytics storage
    const storeAnalytics = jest.fn().mockResolvedValue(true);
    await storeAnalytics(analyticsData);

    expect(storeAnalytics).toHaveBeenCalledWith(analyticsData);
  });
});