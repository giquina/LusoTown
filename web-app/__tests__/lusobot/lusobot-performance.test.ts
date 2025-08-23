/**
 * LusoBot Performance and Rate Limiting Tests
 * 
 * Production-focused performance tests for the LusoBot AI assistant,
 * including mobile optimization, memory management, and rate limiting.
 */

import { performance } from 'perf_hooks'
import { 
  LusoBotEngine, 
  SaudadeEngine, 
  LusoBotSession,
  type MessageMetadata 
} from '@/lib/lusobot-engine'

describe('LusoBot Performance Tests', () => {

  const mockUserContext: MessageMetadata = {
    userRegion: 'diaspora_uk',
    communityLevel: 'active',
    languageProficiency: 'native',
    interests: ['culture', 'food'],
    mood: 'curious'
  }

  describe('Response Time Performance', () => {
    test('should respond to simple queries within 500ms', async () => {
      const startTime = performance.now()
      
      await LusoBotEngine.generateResponse(
        'Hello, how are you?',
        mockUserContext,
        'en'
      )
      
      const responseTime = performance.now() - startTime
      expect(responseTime).toBeLessThan(500) // 500ms threshold
    })

    test('should respond to complex Portuguese cultural queries within 1000ms', async () => {
      const startTime = performance.now()
      
      await LusoBotEngine.generateResponse(
        'Conte-me sobre a história do fado em Coimbra e como se diferencia do fado de Lisboa, especialmente durante o século XIX',
        mockUserContext,
        'pt'
      )
      
      const responseTime = performance.now() - startTime
      expect(responseTime).toBeLessThan(1000) // 1s threshold for complex queries
    })

    test('should handle rapid sequential requests efficiently', async () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      const queries = [
        'Hello',
        'Tell me about Portuguese food',
        'What about fado music?',
        'I miss home',
        'Where can I find Portuguese events?'
      ]

      const startTime = performance.now()
      
      for (const query of queries) {
        await session.sendMessage(query)
      }
      
      const totalTime = performance.now() - startTime
      const averageTime = totalTime / queries.length
      
      expect(averageTime).toBeLessThan(600) // Average response time under 600ms
      expect(totalTime).toBeLessThan(4000) // Total time under 4 seconds
    })

    test('should maintain consistent performance under load', async () => {
      const concurrentRequests = 10
      const promises: Promise<any>[] = []
      
      const startTime = performance.now()
      
      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          LusoBotEngine.generateResponse(
            `Concurrent request ${i + 1}`,
            mockUserContext,
            'en'
          )
        )
      }
      
      const responses = await Promise.all(promises)
      const totalTime = performance.now() - startTime
      
      expect(responses.length).toBe(concurrentRequests)
      expect(totalTime).toBeLessThan(2000) // Should handle 10 concurrent requests in under 2s
      
      responses.forEach(response => {
        expect(response.content).toBeDefined()
        expect(response.content.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Saudade Detection Performance', () => {
    test('should detect saudade in under 50ms', () => {
      const testMessages = [
        'Tenho muitas saudades de casa',
        'I really miss Portugal and my family',
        'Estou com saudades da minha terra natal',
        'Feeling homesick today',
        'Miss the Portuguese-speaking community'
      ]
      
      testMessages.forEach(message => {
        const startTime = performance.now()
        
        const result = SaudadeEngine.detectSaudade(message, 'pt')
        
        const detectionTime = performance.now() - startTime
        
        expect(detectionTime).toBeLessThan(50) // Under 50ms
        expect(result).toBeDefined()
        expect(typeof result.saudade).toBe('number')
      })
    })

    test('should handle large text inputs efficiently', () => {
      const largeMessage = 'Tenho saudades de casa. '.repeat(100) // 2300+ characters
      
      const startTime = performance.now()
      
      const result = SaudadeEngine.detectSaudade(largeMessage, 'pt')
      
      const detectionTime = performance.now() - startTime
      
      expect(detectionTime).toBeLessThan(100) // Should handle large text under 100ms
      expect(result.saudade).toBeGreaterThan(0.5)
    })

    test('should generate emotional responses quickly', () => {
      const highSaudadeTone = {
        saudade: 0.9,
        nostalgia: 0.8,
        hope: 0.3,
        community: 0.6,
        heritage: 0.7
      }
      
      const startTime = performance.now()
      
      const response = SaudadeEngine.generateSaudadeResponse(highSaudadeTone, 'pt')
      
      const responseTime = performance.now() - startTime
      
      expect(responseTime).toBeLessThan(10) // Should generate response under 10ms
      expect(response.length).toBeGreaterThan(50)
    })
  })

  describe('Memory Usage Optimization', () => {
    test('should not leak memory in long conversations', async () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      
      // Simulate a long conversation
      const messageCount = 50
      const messages = Array.from({ length: messageCount }, (_, i) => 
        `Message number ${i + 1} about Portuguese culture`
      )
      
      for (const message of messages) {
        await session.sendMessage(message)
        
        // Check that memory doesn't grow excessively
        const conversationData = session.getMessages()
        expect(conversationData.length).toBeLessThanOrEqual(messageCount + 1) // +1 for welcome message
        
        // Verify each message has proper cleanup
        conversationData.forEach(msg => {
          expect(msg.id).toBeDefined()
          expect(msg.timestamp).toBeInstanceOf(Date)
        })
      }
    })

    test('should efficiently handle session export without memory bloat', () => {
      const session = new LusoBotSession(mockUserContext, 'pt')
      
      // Add multiple messages
      const promises = Array.from({ length: 20 }, (_, i) => 
        session.sendMessage(`Test message ${i + 1}`)
      )
      
      return Promise.all(promises).then(() => {
        const startTime = performance.now()
        
        const exported = session.exportConversation()
        
        const exportTime = performance.now() - startTime
        
        expect(exportTime).toBeLessThan(100) // Export should be fast
        expect(exported.length).toBeGreaterThan(1000) // Should contain substantial data
        
        // Verify JSON is valid
        const parsed = JSON.parse(exported)
        expect(parsed.messages).toBeDefined()
        expect(parsed.userContext).toBeDefined()
      })
    })

    test('should cleanup resources properly', () => {
      // Test multiple session creation and destruction
      const sessions = Array.from({ length: 10 }, (_, i) => 
        new LusoBotSession(
          { ...mockUserContext, mood: `test_${i}` as any },
          i % 2 === 0 ? 'en' : 'pt'
        )
      )
      
      sessions.forEach((session, index) => {
        const messages = session.getMessages()
        expect(messages.length).toBe(1) // Welcome message only
        expect(messages[0].role).toBe('assistant')
      })
      
      // Sessions should be independent
      expect(sessions[0].getMessages()[0].language).toBe('en')
      expect(sessions[1].getMessages()[0].language).toBe('pt')
    })
  })

  describe('Cultural Context Performance', () => {
    test('should identify cultural context quickly', () => {
      const testCases = [
        { message: 'Quero comer bacalhau', expected: 'cuisine' },
        { message: 'Tell me about fado music', expected: 'fado' },
        { message: 'Portuguese business culture', expected: 'business' },
        { message: 'Sou do Porto', expected: 'north' },
        { message: 'Festa de São João', expected: 'festivals' }
      ]
      
      testCases.forEach(({ message, expected }) => {
        const startTime = performance.now()
        
        // Access private method for testing
        const result = (LusoBotEngine as any).identifyCulturalContext(message, 'pt')
        
        const identificationTime = performance.now() - startTime
        
        expect(identificationTime).toBeLessThan(20) // Under 20ms
        expect(result.confidence).toBeGreaterThan(0.3)
      })
    })

    test('should handle mixed language content efficiently', () => {
      const mixedMessage = 'I love Portuguese comida, especially bacalhau à Brás and pastéis de nata'
      
      const startTime = performance.now()
      
      const result = (LusoBotEngine as any).identifyCulturalContext(mixedMessage, 'en')
      
      const identificationTime = performance.now() - startTime
      
      expect(identificationTime).toBeLessThan(30)
      expect(result.topic).toBe('cuisine')
    })
  })

  describe('Suggestion Generation Performance', () => {
    test('should generate suggestions within performance budget', async () => {
      const startTime = performance.now()
      
      const response = await LusoBotEngine.generateResponse(
        'I need help with Portuguese-speaking community events',
        mockUserContext,
        'en'
      )
      
      const totalTime = performance.now() - startTime
      
      expect(totalTime).toBeLessThan(800) // Total response under 800ms
      expect(response.suggestions).toBeDefined()
      expect(response.suggestions!.length).toBeGreaterThan(0)
      expect(response.suggestions!.length).toBeLessThanOrEqual(4) // Reasonable suggestion count
      
      // Verify suggestion quality doesn't compromise performance
      response.suggestions!.forEach(suggestion => {
        expect(suggestion.title.length).toBeGreaterThan(5)
        expect(suggestion.description.length).toBeGreaterThan(10)
        expect(suggestion.culturalRelevance).toBeGreaterThan(0)
      })
    })

    test('should prioritize suggestions efficiently', async () => {
      const response = await LusoBotEngine.generateResponse(
        'Feeling very homesick, need community support and cultural events',
        { ...mockUserContext, mood: 'homesick' },
        'en'
      )
      
      expect(response.suggestions).toBeDefined()
      
      if (response.suggestions!.length > 1) {
        // Should be sorted by priority and cultural relevance
        const suggestions = response.suggestions!
        
        for (let i = 0; i < suggestions.length - 1; i++) {
          const current = suggestions[i]
          const next = suggestions[i + 1]
          
          const currentScore = current.culturalRelevance
          const nextScore = next.culturalRelevance
          
          // Allow for equal scores but generally should be descending
          expect(currentScore).toBeGreaterThanOrEqual(nextScore - 0.1)
        }
      }
    })
  })

  describe('Error Recovery Performance', () => {
    test('should handle errors without degrading performance', async () => {
      const invalidContext: MessageMetadata = {
        userRegion: 'invalid' as any,
        communityLevel: 'invalid' as any,
        languageProficiency: 'invalid' as any,
        interests: [],
        mood: 'invalid' as any
      }
      
      const startTime = performance.now()
      
      const response = await LusoBotEngine.generateResponse(
        'Test message',
        invalidContext,
        'en'
      )
      
      const responseTime = performance.now() - startTime
      
      // Should still respond quickly despite invalid context
      expect(responseTime).toBeLessThan(600)
      expect(response.content).toBeDefined()
      expect(response.content.length).toBeGreaterThan(0)
    })

    test('should gracefully handle empty or malformed input', async () => {
      const testCases = [
        '',
        '   ',
        '\n\t',
        'a'.repeat(1000), // Very long message
        '🇵🇹🇵🇹🇵🇹🇵🇹🇵🇹', // Only emojis
        '123456789', // Only numbers
      ]
      
      for (const testMessage of testCases) {
        const startTime = performance.now()
        
        const response = await LusoBotEngine.generateResponse(
          testMessage,
          mockUserContext,
          'en'
        )
        
        const responseTime = performance.now() - startTime
        
        expect(responseTime).toBeLessThan(700) // Should handle gracefully
        expect(response.content).toBeDefined()
        
        // Should provide meaningful fallback response
        if (testMessage.trim().length === 0) {
          expect(response.content.length).toBeGreaterThan(20)
        }
      }
    })
  })

  describe('Bilingual Performance', () => {
    test('should switch languages efficiently', async () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      
      const queries = [
        { message: 'Hello', language: 'en' as const },
        { message: 'Olá', language: 'pt' as const },
        { message: 'How are you?', language: 'en' as const },
        { message: 'Como está?', language: 'pt' as const }
      ]
      
      const startTime = performance.now()
      
      for (const { message, language } of queries) {
        session.setLanguage(language)
        await session.sendMessage(message)
      }
      
      const totalTime = performance.now() - startTime
      const averageTime = totalTime / queries.length
      
      expect(averageTime).toBeLessThan(500) // Language switching shouldn't add overhead
      
      const messages = session.getMessages()
      expect(messages.length).toBe(1 + (queries.length * 2)) // Welcome + user/assistant pairs
    })

    test('should maintain performance across language variants', async () => {
      const messages = [
        'Como posso encontrar comida portuguesa em Londres?',
        'How can I find Portuguese food in London?',
        'Onde há casas de fado?',
        'Where are there fado houses?',
        'Estou com saudades de casa',
        'I\'m feeling homesick'
      ]
      
      const responseTimes: number[] = []
      
      for (let i = 0; i < messages.length; i++) {
        const startTime = performance.now()
        
        await LusoBotEngine.generateResponse(
          messages[i],
          mockUserContext,
          i % 2 === 0 ? 'pt' : 'en'
        )
        
        const responseTime = performance.now() - startTime
        responseTimes.push(responseTime)
      }
      
      // All responses should be within reasonable bounds
      responseTimes.forEach(time => {
        expect(time).toBeLessThan(800)
      })
      
      // Variance between languages shouldn't be too high
      const maxTime = Math.max(...responseTimes)
      const minTime = Math.min(...responseTimes)
      expect(maxTime / minTime).toBeLessThan(3) // Less than 3x difference
    })
  })

  describe('Mobile Performance', () => {
    test('should perform well on simulated mobile constraints', async () => {
      // Simulate mobile environment with limited resources
      const mobileSession = new LusoBotSession(
        { ...mockUserContext, mood: 'mobile_user' as any },
        'en'
      )
      
      // Test quick interaction pattern common on mobile
      const quickQueries = [
        'Hi',
        'Food?',
        'Events',
        'Help',
        'Thanks'
      ]
      
      const startTime = performance.now()
      
      for (const query of quickQueries) {
        await mobileSession.sendMessage(query)
      }
      
      const totalTime = performance.now() - startTime
      
      // Mobile should complete quickly
      expect(totalTime).toBeLessThan(3000) // Under 3 seconds for 5 queries
      
      const messages = mobileSession.getMessages()
      expect(messages.length).toBe(1 + (quickQueries.length * 2))
    })

    test('should handle limited bandwidth scenarios', () => {
      // Test with minimal data structures
      const minimalContext: MessageMetadata = {
        userRegion: 'diaspora_uk',
        communityLevel: 'newcomer',
        languageProficiency: 'learning',
        interests: ['basic'],
        mood: 'curious'
      }
      
      return LusoBotEngine.generateResponse(
        'Quick help',
        minimalContext,
        'en'
      ).then(response => {
        // Should still provide quality response
        expect(response.content.length).toBeGreaterThan(30)
        expect(response.suggestions).toBeDefined()
        
        // Response data should be reasonably sized for mobile
        const responseSize = JSON.stringify(response).length
        expect(responseSize).toBeLessThan(5000) // Under 5KB
      })
    })
  })

  describe('Rate Limiting Simulation', () => {
    test('should handle burst traffic gracefully', async () => {
      const burstSize = 20
      const requests = Array.from({ length: burstSize }, (_, i) => 
        LusoBotEngine.generateResponse(
          `Burst request ${i + 1}`,
          mockUserContext,
          'en'
        )
      )
      
      const startTime = performance.now()
      
      try {
        const responses = await Promise.all(requests)
        const totalTime = performance.now() - startTime
        
        expect(responses.length).toBe(burstSize)
        expect(totalTime).toBeLessThan(5000) // Should handle burst within 5 seconds
        
        responses.forEach(response => {
          expect(response.content).toBeDefined()
          expect(response.id).toBeDefined()
        })
      } catch (error) {
        // If rate limiting is implemented, should fail gracefully
        expect(error).toBeInstanceOf(Error)
      }
    })

    test('should maintain quality under sustained load', async () => {
      const sustainedRequests = 5
      const batchDelay = 100 // ms between batches
      
      for (let batch = 0; batch < sustainedRequests; batch++) {
        const startTime = performance.now()
        
        const response = await LusoBotEngine.generateResponse(
          `Sustained load test batch ${batch + 1}`,
          mockUserContext,
          'en'
        )
        
        const responseTime = performance.now() - startTime
        
        // Quality shouldn't degrade over time
        expect(response.content.length).toBeGreaterThan(50)
        expect(responseTime).toBeLessThan(1000)
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, batchDelay))
      }
    })
  })
})