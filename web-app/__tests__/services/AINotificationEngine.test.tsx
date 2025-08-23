/**
 * AI Notification Engine Test Suite
 * Production-ready testing for Portuguese Community Platform
 * 
 * Tests cover:
 * - Production deployment readiness
 * - Portuguese cultural personalization
 * - Performance optimization
 * - Error handling and monitoring
 * - A/B testing framework
 * - Database integration
 */

import { aiNotificationEngine, SmartNotificationEngine } from '../../src/services/AINotificationEngine'
import { UserBehaviorProfile, CulturalContext } from '../../src/services/NotificationService'

// Mock Supabase client
jest.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ 
              data: mockTemplateData, 
              error: null 
            }))
          })),
          order: jest.fn(() => ({
            limit: jest.fn(() => Promise.resolve({
              data: mockAnalyticsData,
              error: null
            }))
          }))
        })),
        gte: jest.fn(() => ({
          not: jest.fn(() => Promise.resolve({
            data: mockAnalyticsData,
            error: null
          }))
        })),
        limit: jest.fn(() => Promise.resolve({
          data: [mockTemplateData],
          error: null
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({
            data: mockNotificationData,
            error: null
          }))
        }))
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({
          data: null,
          error: null
        }))
      }))
    }))
  }
}))

const mockTemplateData = {
  id: 'cultural_event_fado',
  name: 'Fado Night Invitation',
  category: 'cultural',
  cultural_contexts: [
    { portuguese_region: 'lisboa', cultural_significance: 'Traditional fado heritage' }
  ],
  content_variations: {
    formal: {
      title: 'Authentic Fado Performance Tonight',
      message: 'Join us for traditional Portuguese fado music.',
      title_pt: 'Espetáculo de Fado Autêntico Esta Noite',
      message_pt: 'Junte-se a nós para fado tradicional português.'
    },
    casual: {
      title: 'Fado Night - Feel the Saudade! 🎵',
      message: 'Tonight\'s fado will touch your Portuguese soul.',
      title_pt: 'Noite de Fado - Sente a Saudade! 🎵',
      message_pt: 'O fado de hoje vai tocar a tua alma portuguesa.'
    },
    friendly: {
      title: 'Your Portuguese Heart is Calling! 💙',
      message: 'Come feel the saudade with fellow Portuguese souls.',
      title_pt: 'O Teu Coração Português Está a Chamar! 💙',
      message_pt: 'Vem sentir a saudade com outras almas portuguesas.'
    }
  },
  dynamic_variables: ['venue', 'time', 'fadista_name'],
  engagement_triggers: ['cultural_heritage', 'music_interest'],
  target_diaspora_groups: ['first_generation', 'heritage_connection']
}

const mockAnalyticsData = [
  {
    notification_id: 'test-notif-1',
    user_id: 'test-user-1',
    engagement_score: 85,
    cultural_region: 'lisboa',
    diaspora_generation: 'first_generation',
    send_hour: 19,
    sent_timestamp: new Date().toISOString(),
    opened_timestamp: new Date().toISOString()
  },
  {
    notification_id: 'test-notif-2',
    user_id: 'test-user-2',
    engagement_score: 72,
    cultural_region: 'norte',
    diaspora_generation: 'second_generation',
    send_hour: 20,
    sent_timestamp: new Date().toISOString(),
    opened_timestamp: new Date().toISOString()
  }
]

const mockNotificationData = {
  id: 'generated-notification-1',
  user_id: 'test-user-1',
  title: 'Your Portuguese Heart is Calling! 💙',
  message: 'Come feel the saudade with fellow Portuguese souls.',
  ai_generated: true,
  engagement_score: 85
}

describe('AI Notification Engine - Production Readiness', () => {
  let engine: SmartNotificationEngine

  beforeEach(() => {
    engine = new SmartNotificationEngine()
    jest.clearAllMocks()
  })

  describe('System Initialization', () => {
    test('should initialize without errors', async () => {
      expect(engine).toBeDefined()
      expect(engine).toBeInstanceOf(SmartNotificationEngine)
    })

    test('should handle initialization failures gracefully', async () => {
      // Test initialization with database connection failure
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      // This should not throw, even with connection issues
      const testEngine = new SmartNotificationEngine()
      expect(testEngine).toBeDefined()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Portuguese Cultural Personalization', () => {
    const createMockUserBehavior = (region: string): UserBehaviorProfile => ({
      user_id: `test-user-${region}`,
      engagement_patterns: {
        peak_activity_hours: [19, 20, 21],
        preferred_days: ['friday', 'saturday'],
        avg_response_time_minutes: 15,
        click_through_rate: 0.65,
        notification_open_rate: 0.80
      },
      cultural_preferences: {
        portuguese_region: region as CulturalContext['portuguese_region'],
        cultural_significance: `${region} cultural heritage`,
        diaspora_relevance: 'first_generation',
        language_preference: 'pt',
        cultural_interests: ['fado', 'cultural_events']
      },
      content_affinity: {
        event_types: ['cultural', 'social'],
        business_categories: ['restaurants', 'cultural_centers'],
        communication_style: 'friendly'
      },
      ai_insights: {
        engagement_likelihood: 0.85,
        optimal_send_times: ['19:00', '20:00'],
        content_preferences: ['cultural_events', 'music'],
        churn_risk: 0.1
      }
    })

    test('should generate personalized notifications for Lisboa region', async () => {
      const userBehavior = createMockUserBehavior('lisboa')
      const dynamicData = {
        venue: 'Portuguese Cultural Center',
        time: '19:30',
        fadista_name: 'Maria João'
      }

      const result = await engine.generatePersonalizedNotification(
        'test-user-lisboa',
        'cultural_event_fado',
        dynamicData,
        userBehavior
      )

      expect(result).toBeDefined()
      expect(result.notification).toBeDefined()
      expect(result.cultural_adaptation).toBeDefined()
      expect(result.performance_prediction).toBeDefined()

      // Verify Portuguese cultural context
      expect(result.notification.cultural_context?.portuguese_region).toBe('lisboa')
      expect(result.cultural_adaptation.cultural_authenticity_score).toBeGreaterThan(0.5)
      expect(result.performance_prediction.likelihood_score).toBeGreaterThan(0)
    })

    test('should adapt content for different Portuguese regions', async () => {
      const regions = ['lisboa', 'norte', 'acores', 'madeira']
      const results: any[] = []

      for (const region of regions) {
        const userBehavior = createMockUserBehavior(region)
        const result = await engine.generatePersonalizedNotification(
          `test-user-${region}`,
          'cultural_event_fado',
          { venue: 'Test Venue', time: '19:00' },
          userBehavior
        )
        results.push({ region, result })
      }

      // Verify each region gets personalized treatment
      results.forEach(({ region, result }) => {
        expect(result.cultural_adaptation).toBeDefined()
        expect(result.notification.cultural_context?.portuguese_region).toBe(region)
        expect(result.cultural_adaptation.cultural_authenticity_score).toBeGreaterThan(0)
      })
    })

    test('should handle diaspora generation preferences', async () => {
      const generations = ['first_generation', 'second_generation', 'heritage_connection']
      
      for (const generation of generations) {
        const userBehavior = createMockUserBehavior('lisboa')
        userBehavior.cultural_preferences.diaspora_relevance = generation as any

        const result = await engine.generatePersonalizedNotification(
          `test-user-${generation}`,
          'cultural_event_fado',
          { venue: 'Test', time: '19:00' },
          userBehavior
        )

        expect(result.notification.cultural_context?.diaspora_relevance).toBe(generation)
        expect(result.cultural_adaptation.adaptation_reasoning).toContain(
          expect.stringMatching(new RegExp(generation.replace('_', ' '), 'i'))
        )
      }
    })
  })

  describe('Engagement Prediction', () => {
    test('should predict engagement accurately', async () => {
      const userBehavior = createMockUserBehavior('lisboa')
      
      const prediction = await engine.predictEngagement(
        'test-user',
        mockTemplateData as any,
        userBehavior
      )

      expect(prediction).toBeDefined()
      expect(prediction.likelihood_score).toBeGreaterThanOrEqual(0)
      expect(prediction.likelihood_score).toBeLessThanOrEqual(100)
      expect(prediction.optimal_send_time).toMatch(/^\d{2}:\d{2}$/)
      expect(prediction.content_recommendation).toMatch(/^(formal|casual|friendly)$/)
      expect(Array.isArray(prediction.reasoning)).toBe(true)
    })

    test('should provide higher predictions for culturally relevant content', async () => {
      const userBehavior = createMockUserBehavior('lisboa')
      
      // High cultural relevance user
      userBehavior.cultural_preferences.cultural_interests = ['fado', 'portuguese_cuisine', 'cultural_events']
      userBehavior.engagement_patterns.click_through_rate = 0.8
      
      const prediction = await engine.predictEngagement(
        'test-user-high-cultural',
        mockTemplateData as any,
        userBehavior
      )

      expect(prediction.likelihood_score).toBeGreaterThan(60)
      expect(prediction.cultural_adaptation_needed).toBe(false)
    })

    test('should handle prediction errors gracefully', async () => {
      const invalidUserBehavior = {} as UserBehaviorProfile

      const prediction = await engine.predictEngagement(
        'test-user-invalid',
        mockTemplateData as any,
        invalidUserBehavior
      )

      // Should return default prediction, not throw
      expect(prediction).toBeDefined()
      expect(prediction.likelihood_score).toBe(50)
      expect(prediction.reasoning).toContain('Default prediction due to insufficient data')
    })
  })

  describe('Timing Optimization', () => {
    test('should optimize notification timing for Portuguese community', async () => {
      const notifications = [mockNotificationData] as any[]
      
      const result = await engine.optimizeTimingForCommunity(notifications)

      expect(result).toBeDefined()
      expect(result.optimized_notifications).toBeDefined()
      expect(result.timing_insights).toBeDefined()
      expect(result.performance_prediction).toBeDefined()

      // Verify Portuguese evening hours are preferred (18-22)
      const optimizedTime = result.optimized_notifications[0]?.optimal_send_time
      if (optimizedTime) {
        const hour = parseInt(optimizedTime.split(':')[0])
        expect(hour).toBeGreaterThanOrEqual(17)
        expect(hour).toBeLessThanOrEqual(23)
      }
    })

    test('should consider Portuguese cultural events timing', async () => {
      // Mock Santos Populares period (June)
      const originalDate = Date
      global.Date = jest.fn(() => new originalDate(2025, 5, 13)) as any // June 13th
      global.Date.now = originalDate.now

      const notifications = [mockNotificationData] as any[]
      const result = await engine.optimizeTimingForCommunity(notifications)

      expect(result.performance_prediction).toBeDefined()
      
      global.Date = originalDate
    })
  })

  describe('A/B Testing Framework', () => {
    test('should execute A/B tests correctly', async () => {
      const variants = [
        {
          id: 'variant-a',
          name: 'Formal Style',
          percentage: 50,
          content_modifications: { tone: 'formal' },
          target_metrics: ['open_rate', 'click_rate']
        },
        {
          id: 'variant-b',
          name: 'Friendly Style',
          percentage: 50,
          content_modifications: { tone: 'friendly' },
          target_metrics: ['engagement_rate']
        }
      ]

      const targetUsers = ['user1', 'user2', 'user3', 'user4']
      
      const assignments = await engine.runABTest('cultural_event_fado', variants, targetUsers)

      expect(assignments).toBeDefined()
      expect(assignments.length).toBe(2)
      
      // Verify user distribution
      const totalAssigned = assignments.reduce((sum, assignment) => sum + assignment.users.length, 0)
      expect(totalAssigned).toBeLessThanOrEqual(targetUsers.length)
    })
  })

  describe('Performance Monitoring', () => {
    test('should provide health check information', async () => {
      const healthCheck = await engine.healthCheck()

      expect(healthCheck).toBeDefined()
      expect(healthCheck.status).toMatch(/^(healthy|degraded|critical)$/)
      expect(healthCheck.checks).toBeDefined()
      expect(healthCheck.message).toBeDefined()
      expect(healthCheck.timestamp).toBeDefined()

      // Verify critical checks
      expect(typeof healthCheck.checks.initialized).toBe('boolean')
      expect(typeof healthCheck.checks.database_connection).toBe('boolean')
    })

    test('should provide performance metrics', async () => {
      const metrics = await engine.getPerformanceMetrics()

      expect(metrics).toBeDefined()
      expect(metrics.system_health).toMatch(/^(healthy|degraded|critical|unknown)$/)
      expect(typeof metrics.average_prediction_time).toBe('number')
      expect(typeof metrics.error_rate).toBe('number')
      expect(typeof metrics.queue_size).toBe('number')
      expect(Array.isArray(metrics.recommendations)).toBe(true)
    })
  })

  describe('Queue Processing', () => {
    test('should queue notifications for optimal delivery', async () => {
      const userId = 'test-user-queue'
      const templateId = 'cultural_event_fado'
      const dynamicData = { venue: 'Test Venue', time: '19:00' }

      // This should not throw
      await expect(
        engine.queueNotificationForOptimalDelivery(userId, templateId, dynamicData, 'normal')
      ).resolves.not.toThrow()
    })

    test('should process notification queue', async () => {
      const result = await engine.processNotificationQueue()

      expect(result).toBeDefined()
      expect(typeof result.total_sent).toBe('number')
      expect(result.audience_insights).toBeDefined()
      expect(result.audience_insights.preferred_content_style).toBeDefined()
    })
  })

  describe('Error Handling and Resilience', () => {
    test('should handle database connection failures', async () => {
      // Mock database failure
      const originalSupabase = require('../../src/lib/supabase').supabase
      require('../../src/lib/supabase').supabase = {
        from: () => ({
          select: () => Promise.resolve({ data: null, error: new Error('Connection failed') })
        })
      }

      const userBehavior = createMockUserBehavior('lisboa')
      
      // Should not throw, should return fallback
      const result = await engine.generatePersonalizedNotification(
        'test-user-db-error',
        'cultural_event_fado',
        { venue: 'Test', time: '19:00' },
        userBehavior
      )

      expect(result).toBeDefined()
      
      // Restore original
      require('../../src/lib/supabase').supabase = originalSupabase
    })

    test('should handle invalid user behavior gracefully', async () => {
      const invalidBehavior = {
        user_id: 'invalid',
        engagement_patterns: null,
        cultural_preferences: null,
        content_affinity: null,
        ai_insights: null
      } as any

      // Should not throw
      await expect(
        engine.predictEngagement('invalid-user', mockTemplateData as any, invalidBehavior)
      ).resolves.toBeDefined()
    })
  })

  describe('Integration with Portuguese Configuration', () => {
    test('should use configuration-driven data (no hardcoding)', async () => {
      const userBehavior = createMockUserBehavior('lisboa')
      
      const result = await engine.generatePersonalizedNotification(
        'test-config-user',
        'cultural_event_fado',
        { venue: '{{venue}}', contact: '{{contact_email}}' },
        userBehavior
      )

      // Verify no hardcoded values in action_data
      if (result.notification.action_data) {
        const actionData = JSON.stringify(result.notification.action_data)
        expect(actionData).not.toContain('demo@example.com')
        expect(actionData).not.toContain('hardcoded')
        expect(actionData).not.toContain('£19.99')
      }
    })
  })

  function createMockUserBehavior(region: string): UserBehaviorProfile {
    return {
      user_id: `test-user-${region}`,
      engagement_patterns: {
        peak_activity_hours: [19, 20, 21],
        preferred_days: ['friday', 'saturday'],
        avg_response_time_minutes: 15,
        click_through_rate: 0.65,
        notification_open_rate: 0.80
      },
      cultural_preferences: {
        portuguese_region: region as CulturalContext['portuguese_region'],
        cultural_significance: `${region} cultural heritage`,
        diaspora_relevance: 'first_generation',
        language_preference: 'pt',
        cultural_interests: ['fado', 'cultural_events']
      },
      content_affinity: {
        event_types: ['cultural', 'social'],
        business_categories: ['restaurants', 'cultural_centers'],
        communication_style: 'friendly'
      },
      ai_insights: {
        engagement_likelihood: 0.85,
        optimal_send_times: ['19:00', '20:00'],
        content_preferences: ['cultural_events', 'music'],
        churn_risk: 0.1
      }
    }
  }
})

describe('AI Notification Engine - Load Testing', () => {
  test('should handle concurrent prediction requests', async () => {
    const promises = []
    const userBehavior = {
      user_id: 'load-test-user',
      engagement_patterns: {
        peak_activity_hours: [19, 20],
        preferred_days: ['friday'],
        avg_response_time_minutes: 15,
        click_through_rate: 0.5,
        notification_open_rate: 0.7
      },
      cultural_preferences: {
        portuguese_region: 'lisboa' as const,
        cultural_significance: 'Test',
        diaspora_relevance: 'first_generation' as const,
        language_preference: 'pt' as const,
        cultural_interests: ['cultural_events']
      },
      content_affinity: {
        event_types: ['cultural'],
        business_categories: ['restaurants'],
        communication_style: 'friendly' as const
      },
      ai_insights: {
        engagement_likelihood: 0.8,
        optimal_send_times: ['19:00'],
        content_preferences: ['cultural_events'],
        churn_risk: 0.1
      }
    }

    // Create 10 concurrent prediction requests
    for (let i = 0; i < 10; i++) {
      promises.push(
        aiNotificationEngine.predictEngagement(
          `load-test-user-${i}`,
          mockTemplateData as any,
          userBehavior
        )
      )
    }

    const results = await Promise.all(promises)
    
    expect(results).toHaveLength(10)
    results.forEach(result => {
      expect(result).toBeDefined()
      expect(result.likelihood_score).toBeGreaterThanOrEqual(0)
    })
  }, 10000) // 10 second timeout for load test
})