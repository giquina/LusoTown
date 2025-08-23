/**
 * Production Performance Tests for Predictive Community Analytics
 * Tests performance under realistic load conditions for luxury Portuguese-speaking community
 */

import { PredictiveCommunityAnalytics } from '@/lib/ai/PredictiveCommunityAnalytics'

describe('Analytics Performance Tests', () => {
  let analytics: PredictiveCommunityAnalytics
  
  beforeEach(() => {
    analytics = new PredictiveCommunityAnalytics()
  })

  describe('Response Time Performance', () => {
    it('should predict community trends within 2 seconds', async () => {
      const startTime = performance.now()
      
      const trends = await analytics.predictCommunityTrends('month')
      
      const duration = performance.now() - startTime
      expect(duration).toBeLessThan(2000) // 2 seconds max
      expect(trends).toBeDefined()
    })

    it('should predict event success within 1.5 seconds', async () => {
      const eventDetails = {
        type: 'cultural_festival',
        date: new Date('2025-06-15'),
        time: '19:00',
        location: 'central_london',
        culturalTheme: 'fado',
        targetAudience: ['business_professionals', 'cultural_enthusiasts'],
        price: 45,
        capacity: 200,
        luxuryLevel: 'premium' as const,
        culturalAuthenticity: 8
      }

      const startTime = performance.now()
      
      const prediction = await analytics.predictEventSuccess(eventDetails)
      
      const duration = performance.now() - startTime
      expect(duration).toBeLessThan(1500) // 1.5 seconds max
      expect(prediction.successProbability).toBeDefined()
    })

    it('should analyze community health within 3 seconds', async () => {
      const startTime = performance.now()
      
      const health = await analytics.analyzeCommunityHealth()
      
      const duration = performance.now() - startTime
      expect(duration).toBeLessThan(3000) // 3 seconds max
      expect(health.overallHealth).toBeDefined()
    })
  })

  describe('Cache Performance', () => {
    it('should significantly improve performance on cached requests', async () => {
      const privacySettings = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      // First request - no cache
      const start1 = performance.now()
      await analytics.predictCommunityTrends('week', 'performance_user', privacySettings)
      const uncachedDuration = performance.now() - start1

      // Second request - with cache
      const start2 = performance.now()
      await analytics.predictCommunityTrends('week', 'performance_user', privacySettings)
      const cachedDuration = performance.now() - start2

      // Cached request should be at least 50% faster
      expect(cachedDuration).toBeLessThan(uncachedDuration * 0.5)
      expect(cachedDuration).toBeLessThan(100) // Should be under 100ms
    })

    it('should handle cache eviction efficiently', async () => {
      const privacySettings = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      // Fill cache with multiple entries
      const promises = Array.from({ length: 20 }, (_, i) =>
        analytics.predictCommunityTrends('month', `cache_user_${i}`, privacySettings)
      )

      const startTime = performance.now()
      await Promise.all(promises)
      const duration = performance.now() - startTime

      // Should handle 20 concurrent requests efficiently
      expect(duration).toBeLessThan(5000) // 5 seconds total
    })
  })

  describe('Concurrent Load Performance', () => {
    it('should handle multiple concurrent trend predictions', async () => {
      const concurrentRequests = 15
      const promises = Array.from({ length: concurrentRequests }, (_, i) => {
        const timeframe = i % 2 === 0 ? 'week' : 'month'
        return analytics.predictCommunityTrends(timeframe as 'week' | 'month')
      })

      const startTime = performance.now()
      const results = await Promise.all(promises)
      const totalDuration = performance.now() - startTime

      // All requests should complete
      expect(results).toHaveLength(concurrentRequests)
      results.forEach(result => expect(result).toBeDefined())

      // Average time per request should be reasonable
      const avgDuration = totalDuration / concurrentRequests
      expect(avgDuration).toBeLessThan(1000) // Average under 1 second
    })

    it('should handle mixed analytics operations concurrently', async () => {
      const eventDetails = {
        type: 'business_networking',
        date: new Date('2025-07-10'),
        time: '18:30',
        location: 'central_london',
        culturalTheme: 'professional_portuguese',
        targetAudience: ['entrepreneurs', 'business_executives'],
        price: 65,
        capacity: 120,
        luxuryLevel: 'premium' as const,
        culturalAuthenticity: 7
      }

      const operations = [
        analytics.predictCommunityTrends('season'),
        analytics.predictEventSuccess(eventDetails),
        analytics.analyzeCommunityHealth(),
        analytics.predictCommunityTrends('year'),
        analytics.generateOptimalEventTiming('cultural_festival', 'fado', ['professionals'])
      ]

      const startTime = performance.now()
      const results = await Promise.all(operations)
      const totalDuration = performance.now() - startTime

      expect(results).toHaveLength(5)
      expect(totalDuration).toBeLessThan(8000) // 8 seconds total for all operations
      results.forEach(result => expect(result).toBeDefined())
    })
  })

  describe('Memory Performance', () => {
    it('should not leak memory during repeated operations', async () => {
      // Record initial memory if available
      const initialMemory = (global as any).gc ? process.memoryUsage().heapUsed : null

      // Perform many operations
      const iterations = 100
      for (let i = 0; i < iterations; i++) {
        await analytics.predictCommunityTrends('week')
        
        // Every 25 iterations, check if we can force garbage collection
        if (i % 25 === 0 && (global as any).gc) {
          (global as any).gc()
        }
      }

      // Check final memory if available
      if (initialMemory && (global as any).gc) {
        (global as any).gc()
        const finalMemory = process.memoryUsage().heapUsed
        const memoryGrowth = finalMemory - initialMemory
        
        // Memory growth should be reasonable (less than 50MB)
        expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024) // 50MB
      }
      
      // At minimum, verify operations still work after many iterations
      const finalTrends = await analytics.predictCommunityTrends('month')
      expect(finalTrends).toBeDefined()
    })

    it('should efficiently manage cache memory', async () => {
      const privacySettings = {
        analyticsConsent: true,
        personalizedRecommendations: true,
        communityInsights: true,
        marketingAnalytics: false
      }

      // Create many cache entries
      const cacheEntries = 50
      const promises = Array.from({ length: cacheEntries }, (_, i) =>
        analytics.predictCommunityTrends('week', `memory_test_${i}`, privacySettings)
      )

      await Promise.all(promises)

      // Verify cache is working but not unlimited
      const cacheSize = (analytics as any).predictionCache.size
      expect(cacheSize).toBeGreaterThan(0)
      expect(cacheSize).toBeLessThanOrEqual(cacheEntries * 1.1) // Allow some overhead
    })
  })

  describe('Data Volume Performance', () => {
    it('should handle large community datasets efficiently', async () => {
      // Simulate large community by mocking memberData
      const largeMemberDataSize = 5000
      const mockMemberData = new Map()
      
      for (let i = 0; i < largeMemberDataSize; i++) {
        mockMemberData.set(`user_${i}`, {
          id: `user_${i}`,
          profile: {
            region: i % 2 === 0 ? 'portugal' : 'brazil',
            saudadeIntensity: Math.floor(Math.random() * 10) + 1,
            culturalMaintenance: Math.floor(Math.random() * 10) + 1,
            premiumEngagementLevel: 'standard'
          },
          engagement: {
            eventAttendance: Math.floor(Math.random() * 20),
            culturalContentEngagement: Math.floor(Math.random() * 100)
          },
          demographics: {
            age: 25 + Math.floor(Math.random() * 40),
            profession: 'professional'
          }
        })
      }

      // Replace memberData for this test
      ;(analytics as any).memberData = mockMemberData

      const startTime = performance.now()
      const health = await analytics.analyzeCommunityHealth()
      const duration = performance.now() - startTime

      expect(health).toBeDefined()
      expect(duration).toBeLessThan(10000) // Should handle 5000 members within 10 seconds
    })

    it('should process complex cultural calendars efficiently', async () => {
      // Create large cultural calendar
      const culturalEvents = Array.from({ length: 365 }, (_, i) => ({
        name: `Event_${i}`,
        date: new Date(2025, 0, 1 + i), // Full year of events
        type: i % 3 === 0 ? 'cultural_festival' : i % 3 === 1 ? 'fado_night' : 'business_networking',
        luxuryLevel: 'standard' as const,
        targetAudience: ['community'],
        culturalSignificance: Math.floor(Math.random() * 10) + 1
      }))

      ;(analytics as any).culturalCalendar = culturalEvents

      const startTime = performance.now()
      const timing = analytics.generateOptimalEventTiming(
        'cultural_festival',
        'portuguese_heritage',
        ['families', 'professionals']
      )
      const duration = performance.now() - startTime

      expect(timing).toBeDefined()
      expect(duration).toBeLessThan(2000) // Should handle 365 events within 2 seconds
    })
  })

  describe('Error Handling Performance', () => {
    it('should fail fast on invalid inputs', async () => {
      const startTime = performance.now()
      
      try {
        await analytics.predictUserChurn('nonexistent-user')
      } catch (error) {
        const duration = performance.now() - startTime
        expect(duration).toBeLessThan(100) // Should fail within 100ms
        expect(error.message).toContain('User not found')
      }
    })

    it('should handle partial failures gracefully without degrading performance', async () => {
      // Mock some internal method to fail
      const originalMethod = (analytics as any).analyzeCulturalInterestTrends
      ;(analytics as any).analyzeCulturalInterestTrends = jest.fn().mockRejectedValue(
        new Error('Simulated failure')
      )

      const startTime = performance.now()
      
      try {
        const trends = await analytics.predictCommunityTrends('month')
        const duration = performance.now() - startTime
        
        // Should still return partial results quickly
        expect(duration).toBeLessThan(3000)
        expect(trends).toBeDefined()
      } finally {
        // Restore original method
        ;(analytics as any).analyzeCulturalInterestTrends = originalMethod
      }
    })
  })

  describe('Production Load Simulation', () => {
    it('should handle realistic Portuguese-speaking community load', async () => {
      // Simulate realistic load:
      // - 750 community members
      // - Peak usage: 50 concurrent users
      // - Mixed operations typical for Portuguese-speaking community

      const peakConcurrentUsers = 50
      const operations = []

      // Simulate typical Portuguese-speaking community usage patterns
      for (let i = 0; i < peakConcurrentUsers; i++) {
        const userId = `portuguese_user_${i}`
        const operationType = i % 4

        switch (operationType) {
          case 0: // Community trends
            operations.push(analytics.predictCommunityTrends('month', userId, {
              analyticsConsent: true,
              personalizedRecommendations: true,
              communityInsights: true,
              marketingAnalytics: Math.random() > 0.5
            }))
            break
          
          case 1: // Event predictions
            operations.push(analytics.predictEventSuccess({
              type: 'fado_night',
              date: new Date('2025-08-15'),
              time: '20:00',
              location: 'south_london',
              culturalTheme: 'fado',
              targetAudience: ['cultural_enthusiasts'],
              price: 35,
              capacity: 80,
              luxuryLevel: 'standard' as const,
              culturalAuthenticity: 9
            }))
            break
          
          case 2: // Community health
            operations.push(analytics.analyzeCommunityHealth())
            break
          
          case 3: // Event timing
            operations.push(analytics.generateOptimalEventTiming(
              'cultural_celebration',
              'portuguese_heritage',
              ['families']
            ))
            break
        }
      }

      const startTime = performance.now()
      const results = await Promise.allSettled(operations)
      const totalDuration = performance.now() - startTime

      // Count successful operations
      const successful = results.filter(r => r.status === 'fulfilled').length
      const failed = results.filter(r => r.status === 'rejected').length

      // Performance expectations for production load
      expect(totalDuration).toBeLessThan(15000) // 15 seconds for 50 concurrent operations
      expect(successful).toBeGreaterThan(peakConcurrentUsers * 0.9) // 90%+ success rate
      expect(failed).toBeLessThan(peakConcurrentUsers * 0.1) // Less than 10% failures

      // Average response time should be acceptable
      const avgResponseTime = totalDuration / peakConcurrentUsers
      expect(avgResponseTime).toBeLessThan(500) // Average under 500ms per operation
    })
  })

  describe('Scalability Metrics', () => {
    it('should maintain performance as community grows', async () => {
      const communitySizes = [100, 500, 1000, 2500]
      const performanceResults = []

      for (const size of communitySizes) {
        // Mock community of given size
        const mockMembers = new Map()
        for (let i = 0; i < size; i++) {
          mockMembers.set(`user_${i}`, {
            id: `user_${i}`,
            profile: { region: 'portugal', saudadeIntensity: 5 },
            engagement: { culturalContentEngagement: 70 }
          })
        }
        ;(analytics as any).memberData = mockMembers

        const startTime = performance.now()
        await analytics.analyzeCommunityHealth()
        const duration = performance.now() - startTime

        performanceResults.push({ size, duration })
      }

      // Performance should scale reasonably (not exponentially)
      const smallCommunity = performanceResults.find(r => r.size === 100)
      const largeCommunity = performanceResults.find(r => r.size === 2500)

      // Large community (25x size) should not take more than 10x time
      const performanceRatio = largeCommunity.duration / smallCommunity.duration
      expect(performanceRatio).toBeLessThan(10)
    })
  })
})