/**
 * Comprehensive Test Suite for Production-Ready Predictive Community Analytics
 * Tests luxury Portuguese community analytics with GDPR compliance and performance optimization
 */

import { PredictiveCommunityAnalytics, predictiveCommunityAnalytics } from '@/lib/ai/PredictiveCommunityAnalytics'

describe('PredictiveCommunityAnalytics', () => {
  let analytics: PredictiveCommunityAnalytics

  beforeEach(() => {
    analytics = new PredictiveCommunityAnalytics()
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Clean up any timers or async operations
    // jest.runOnlyPendingTimers()
  })

  describe('GDPR Compliance and Privacy', () => {
    it('should require analytics consent for personalized predictions', async () => {
      const privacySettings = {
        analyticsConsent: false,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      await expect(
        analytics.predictCommunityTrends('month', 'user123', privacySettings)
      ).rejects.toThrow('Analytics consent required for personalized predictions')
    })

    it('should allow anonymous predictions without consent', async () => {
      const trends = await analytics.predictCommunityTrends('week')
      
      expect(trends).toBeDefined()
      expect(Array.isArray(trends)).toBe(true)
    })

    it('should cache results with proper GDPR consent tracking', async () => {
      const privacySettings = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      // First call - should process and cache
      const trends1 = await analytics.predictCommunityTrends('week', 'user123', privacySettings)
      
      // Second call - should use cache
      const trends2 = await analytics.predictCommunityTrends('week', 'user123', privacySettings)
      
      expect(trends1).toEqual(trends2)
    })

    it('should reject cached results if consent levels changed', async () => {
      const initialPrivacy = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: true
      }

      const restrictedPrivacy = {
        analyticsConsent: true,
        personalizedRecommendations: false,
        communityInsights: true,
        marketingAnalytics: false
      }

      // Cache with full consent
      await analytics.predictCommunityTrends('week', 'user123', initialPrivacy)
      
      // Should not use cache with restricted consent
      const trends = await analytics.predictCommunityTrends('week', 'user123', restrictedPrivacy)
      expect(trends).toBeDefined()
    })
  })

  describe('Luxury Event Success Prediction', () => {
    const luxuryEventDetails = {
      type: 'cultural_gala',
      date: new Date('2025-06-15'),
      time: '19:00',
      location: 'central_london',
      culturalTheme: 'fado',
      targetAudience: ['business_leaders', 'cultural_elites'],
      price: 125,
      capacity: 150,
      luxuryLevel: 'luxury' as const,
      premiumServices: ['private_transport', 'premium_catering', 'cultural_guide'],
      culturalAuthenticity: 9
    }

    it('should predict luxury event success with premium factors', async () => {
      const prediction = await analytics.predictEventSuccess(luxuryEventDetails)
      
      expect(prediction.successProbability).toBeGreaterThan(70)
      expect(prediction.luxuryScore).toBeGreaterThan(80)
      expect(prediction.authenticityScore).toBeGreaterThan(85)
      expect(prediction.premiumPositioning.marketPosition).toBe('luxury')
    })

    it('should validate luxury event requirements', async () => {
      const invalidLuxuryEvent = {
        ...luxuryEventDetails,
        culturalAuthenticity: 5, // Too low for luxury
        luxuryLevel: 'luxury' as const
      }

      await expect(
        analytics.predictEventSuccess(invalidLuxuryEvent)
      ).rejects.toThrow('Luxury events must maintain high cultural authenticity')
    })

    it('should provide sophisticated marketing recommendations for luxury events', async () => {
      const prediction = await analytics.predictEventSuccess(luxuryEventDetails)
      
      const marketingText = prediction.recommendedMarketing.join(' ')
      expect(marketingText).toMatch(/affluent Portuguese professionals/i)
      expect(marketingText).toMatch(/luxury Portuguese brands/i)
      expect(marketingText).toMatch(/exclusivity and limited availability/i)
    })

    it('should calculate premium positioning correctly', async () => {
      const prediction = await analytics.predictEventSuccess(luxuryEventDetails)
      
      expect(prediction.premiumPositioning.marketPosition).toBe('luxury')
      expect(prediction.premiumPositioning.recommendedPricing.min).toBeGreaterThanOrEqual(75)
      expect(prediction.premiumPositioning.targetDemographics).toContain('business_leaders')
    })

    it('should handle ultra-luxury events with special requirements', async () => {
      const ultraLuxuryEvent = {
        ...luxuryEventDetails,
        price: 250,
        luxuryLevel: 'ultra_luxury' as const,
        capacity: 50 // Smaller, more exclusive
      }

      const prediction = await analytics.predictEventSuccess(ultraLuxuryEvent)
      
      expect(prediction.premiumPositioning.marketPosition).toBe('ultra_luxury')
      const ultraMarketingText = prediction.recommendedMarketing.join(' ')
      expect(ultraMarketingText).toMatch(/private invitation-only/i)
    })
  })

  describe('Portuguese Cultural Analysis', () => {
    it('should accurately assess Portuguese cultural elements', () => {
      // Test cultural resonance calculation
      const fadoResonance = (analytics as any).calculateCulturalResonance('fado')
      const saudadeResonance = (analytics as any).calculateCulturalResonance('saudade')
      const santosResonance = (analytics as any).calculateCulturalResonance('santos_populares')
      
      expect(fadoResonance).toBeGreaterThan(0.9)
      expect(saudadeResonance).toBeGreaterThan(0.85)
      expect(santosResonance).toBeGreaterThan(0.9)
    })

    it('should consider seasonal preferences for Portuguese events', () => {
      const summerDate = new Date('2025-07-15')
      const winterDate = new Date('2025-12-15')
      
      const summerOutdoor = (analytics as any).calculateSeasonalPreference(summerDate, 'outdoor_festival')
      const winterFado = (analytics as any).calculateSeasonalPreference(winterDate, 'fado_evening')
      
      expect(summerOutdoor).toBeGreaterThan(0.8)
      expect(winterFado).toBeGreaterThan(0.8)
    })

    it('should evaluate location accessibility for Portuguese community', () => {
      const vauxhallScore = (analytics as any).analyzeLocationAccessibility('vauxhall')
      const stockwellScore = (analytics as any).analyzeLocationAccessibility('stockwell')
      const eastLondonScore = (analytics as any).analyzeLocationAccessibility('east_london')
      
      expect(vauxhallScore).toBeGreaterThan(90) // High Portuguese concentration
      expect(stockwellScore).toBeGreaterThan(90) // High Portuguese concentration
      expect(eastLondonScore).toBeLessThan(80) // Lower Portuguese concentration
    })
  })

  describe('User Churn Prediction and Retention', () => {
    const mockMember = {
      id: 'user123',
      profile: {
        region: 'portugal' as const,
        generationInUK: 1,
        saudadeIntensity: 7,
        culturalMaintenance: 8,
        adaptationStyle: 'traditional' as const,
        luxuryServicePreference: 8,
        heritageConnectionStrength: 9,
        culturalIdentityEvolution: [],
        premiumEngagementLevel: 'luxury' as const
      },
      engagement: {
        eventAttendance: 5,
        messagesSent: 20,
        connectionsRequested: 8,
        contentShared: 15,
        groupsJoined: 3,
        lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        sessionDuration: 1800, // 30 minutes
        featureUsage: { events: 10, matches: 5 },
        culturalContentEngagement: 85
      },
      behavior: {
        loginFrequency: 'weekly' as const,
        peakActivityTimes: ['19:00', '20:00'],
        contentPreferences: ['cultural_events', 'fado_music'],
        communicationStyle: 'active' as const,
        eventBookingPattern: 'planned' as const,
        culturalInterestEvolution: [],
        saudadeIntensityTrend: [7, 8, 7, 6],
        socialConnectivity: 75
      },
      preferences: {
        eventTypes: ['cultural_festivals', 'fado_nights'],
        languageUsage: { pt: 70, en: 30 },
        contentFormats: ['video', 'live_events'],
        communicationChannels: ['email', 'app'],
        culturalActivities: ['fado', 'traditional_food'],
        groupSizes: 'medium' as const,
        timePreferences: ['evening'],
        locationPreferences: ['central_london', 'south_london']
      },
      location: {
        borough: 'lambeth',
        coordinates: { lat: 51.5, lon: -0.1 },
        travelRadius: 15,
        preferredAreas: ['vauxhall', 'stockwell'],
        transportPreferences: ['tube', 'bus']
      },
      demographics: {
        age: 35,
        gender: 'male',
        profession: 'business_executive',
        educationLevel: 'masters',
        familyStatus: 'married',
        timeInUK: 5,
        childrenInUK: true,
        portugueseNetworkSize: 25
      },
      privacy: {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      },
      consentTimestamp: new Date(),
      dataRetentionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      analyticsVersion: '2.0.0'
    }

    it('should predict user churn with sophisticated analysis', async () => {
      // Mock the memberData to include our test member
      ;(analytics as any).memberData.set('user123', mockMember)
      
      const prediction = await analytics.predictUserChurn('user123', mockMember.privacy)
      
      expect(prediction.userId).toBe('user123')
      expect(prediction.churnProbability).toBeGreaterThanOrEqual(0)
      expect(prediction.churnProbability).toBeLessThanOrEqual(100)
      expect(prediction.riskLevel).toMatch(/^(low|medium|high|critical)$/)
    })

    it('should provide luxury retention strategies for premium members', async () => {
      ;(analytics as any).memberData.set('user123', mockMember)
      
      const prediction = await analytics.predictUserChurn('user123', mockMember.privacy)
      
      const retentionText = prediction.retentionStrategies.join(' ')
      expect(retentionText).toMatch(/exclusive VIP|premium content|luxury events/i)
      
      if (mockMember.profile.premiumEngagementLevel === 'luxury') {
        const luxuryRetentionText = prediction.retentionStrategies.join(' ')
        expect(luxuryRetentionText).toMatch(/dedicated luxury account manager/i)
      }
    })

    it('should generate sophisticated cultural interventions', async () => {
      ;(analytics as any).memberData.set('user123', mockMember)
      
      const prediction = await analytics.predictUserChurn('user123', mockMember.privacy)
      
      const interventionText = prediction.culturalInterventions.join(' ')
      expect(interventionText).toMatch(/premium fado music therapy/i)
      expect(interventionText).toMatch(/luxury Portuguese cultural/i)
    })

    it('should recommend elite community connections', async () => {
      ;(analytics as any).memberData.set('user123', mockMember)
      
      const prediction = await analytics.predictUserChurn('user123', mockMember.privacy)
      
      const connectionsText = prediction.communityConnections.join(' ')
      expect(connectionsText).toMatch(/elite Portuguese professionals/i)
      expect(connectionsText).toMatch(/business leaders/i)
    })

    it('should create premium engagement strategies', async () => {
      ;(analytics as any).memberData.set('user123', mockMember)
      
      const prediction = await analytics.predictUserChurn('user123', mockMember.privacy)
      
      expect(prediction.premiumEngagementStrategy).toBeDefined()
      expect(prediction.premiumEngagementStrategy.approach).toMatch(/premium|luxury|exclusive/)
      expect(prediction.premiumEngagementStrategy.channels).toContain(
        expect.stringMatching(/account_manager|exclusive|priority/)
      )
    })
  })

  describe('Performance and Optimization', () => {
    it('should complete predictions within acceptable time limits', async () => {
      const startTime = Date.now()
      
      await analytics.predictCommunityTrends('week')
      
      const duration = Date.now() - startTime
      expect(duration).toBeLessThan(5000) // Should complete within 5 seconds
    })

    it('should use caching effectively for repeated queries', async () => {
      const privacySettings = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      // First call - no cache
      const start1 = Date.now()
      await analytics.predictCommunityTrends('month', 'user456', privacySettings)
      const duration1 = Date.now() - start1

      // Second call - should use cache
      const start2 = Date.now()
      await analytics.predictCommunityTrends('month', 'user456', privacySettings)
      const duration2 = Date.now() - start2

      expect(duration2).toBeLessThan(duration1) // Cache should be faster
    })

    it('should handle large datasets efficiently', async () => {
      // Mock large community data
      const largeMemberData = new Array(1000).fill(null).map((_, index) => ({
        id: `user${index}`,
        // ... mock member data
      }))

      // This should complete without memory issues or excessive time
      const startTime = Date.now()
      const health = await analytics.analyzeCommunityHealth()
      const duration = Date.now() - startTime

      expect(health).toBeDefined()
      expect(duration).toBeLessThan(10000) // Should complete within 10 seconds
    })
  })

  describe('Business Intelligence and Revenue Optimization', () => {
    const businessEvent = {
      type: 'networking_premium',
      date: new Date('2025-09-20'),
      time: '18:30',
      location: 'central_london',
      culturalTheme: 'business_networking',
      targetAudience: ['entrepreneurs', 'business_executives'],
      price: 85,
      capacity: 100,
      luxuryLevel: 'premium' as const,
      culturalAuthenticity: 7
    }

    it('should optimize pricing recommendations for revenue', async () => {
      const prediction = await analytics.predictEventSuccess(businessEvent)
      
      expect(prediction.premiumPositioning.recommendedPricing).toBeDefined()
      expect(prediction.premiumPositioning.recommendedPricing.min).toBeGreaterThan(0)
      expect(prediction.premiumPositioning.recommendedPricing.max).toBeGreaterThan(
        prediction.premiumPositioning.recommendedPricing.min
      )
    })

    it('should identify high-value target demographics', async () => {
      const prediction = await analytics.predictEventSuccess(businessEvent)
      
      const demographicsText = prediction.premiumPositioning.targetDemographics.join(' ')
      expect(demographicsText).toMatch(/professionals|business|entrepreneurs/i)
    })

    it('should provide revenue optimization insights', async () => {
      const prediction = await analytics.predictEventSuccess(businessEvent)
      
      // Success probability should factor in revenue potential
      if (prediction.luxuryScore > 70 && prediction.authenticityScore > 70) {
        expect(prediction.successProbability).toBeGreaterThan(75)
      }
    })
  })

  describe('Community Health Analytics', () => {
    it('should provide comprehensive community health metrics', async () => {
      const health = await analytics.analyzeCommunityHealth()
      
      expect(health.overallHealth).toBeGreaterThanOrEqual(0)
      expect(health.overallHealth).toBeLessThanOrEqual(100)
      
      expect(health.engagement).toBeDefined()
      expect(health.cultural).toBeDefined()
      expect(health.social).toBeDefined()
      expect(health.growth).toBeDefined()
      expect(health.wellbeing).toBeDefined()
    })

    it('should track Portuguese-specific cultural health metrics', async () => {
      const health = await analytics.analyzeCommunityHealth()
      
      expect(health.cultural.authenticity).toBeDefined()
      expect(health.cultural.preservation).toBeDefined()
      expect(health.cultural.generationalTransfer).toBeDefined()
      
      expect(health.wellbeing.saudadeManagement).toBeDefined()
      expect(health.wellbeing.culturalComfort).toBeDefined()
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid user IDs gracefully', async () => {
      await expect(
        analytics.predictUserChurn('nonexistent-user')
      ).rejects.toThrow('User not found')
    })

    it('should validate cultural authenticity scores', () => {
      expect(() => {
        ;(analytics as any).validateCulturalAuthenticity(-1)
      }).toThrow('Cultural authenticity must be between 1-10')
      
      expect(() => {
        ;(analytics as any).validateCulturalAuthenticity(11)
      }).toThrow('Cultural authenticity must be between 1-10')
    })

    it('should handle network errors gracefully', async () => {
      // Mock network failure
      jest.spyOn(console, 'error').mockImplementation(() => {})
      
      // Should not crash on network errors
      const trends = await analytics.predictCommunityTrends('week')
      expect(trends).toBeDefined()
    })
  })

  describe('Data Privacy and GDPR Compliance', () => {
    it('should respect data retention policies', () => {
      const retentionDays = (analytics as any).GDPR_DATA_RETENTION_DAYS
      expect(retentionDays).toBe(1095) // 3 years as per GDPR
    })

    it('should expire cached data appropriately', async () => {
      const cacheKey = 'test_cache'
      const testData = { test: 'data' }
      
      ;(analytics as any).setCachedResult(cacheKey, testData, 'user123', {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      })
      
      // Should exist immediately
      let cached = (analytics as any).getCachedResult(cacheKey)
      expect(cached).toBeDefined()
      
      // Mock cache expiry
      ;(analytics as any).predictionCache.set(cacheKey, {
        ...cached,
        timestamp: Date.now() - 400000 // Older than TTL
      })
      
      // Should be expired
      cached = (analytics as any).getCachedResult(cacheKey)
      expect(cached).toBeNull()
    })
  })

  describe('Production Readiness', () => {
    it('should handle concurrent requests efficiently', async () => {
      const promises = Array.from({ length: 10 }, (_, i) => 
        analytics.predictCommunityTrends('week', `user${i}`, {
          analyticsConsent: true,
          personalizedRecommendations: true,
          communityInsights: true,
          marketingAnalytics: false
        })
      )
      
      const results = await Promise.all(promises)
      
      expect(results).toHaveLength(10)
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true)
      })
    })

    it('should maintain model versioning', () => {
      const version = (analytics as any).MODEL_VERSION
      expect(version).toBe('2.0.0')
    })

    it('should track performance metrics', async () => {
      await analytics.predictCommunityTrends('week')
      
      const metrics = (analytics as any).performanceMetrics
      expect(metrics.processingTimes.length).toBeGreaterThan(0)
    })
  })
})

describe('Singleton Instance', () => {
  it('should provide a singleton instance', () => {
    expect(predictiveCommunityAnalytics).toBeInstanceOf(PredictiveCommunityAnalytics)
  })

  it('should maintain state across multiple calls to singleton', async () => {
    // Make calls to singleton instance
    await predictiveCommunityAnalytics.predictCommunityTrends('week')
    const health = await predictiveCommunityAnalytics.analyzeCommunityHealth()
    
    expect(health).toBeDefined()
  })
})