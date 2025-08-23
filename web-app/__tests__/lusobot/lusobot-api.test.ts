/**
 * LusoBot API Production Tests
 * 
 * Comprehensive API testing for the LusoBot chat endpoint,
 * including authentication, rate limiting, and database integration.
 */

import { NextRequest } from 'next/server'
import { POST, GET } from '@/app/api/lusobot/chat/route'

// Mock Supabase
const mockSupabase = {
  auth: {
    getUser: jest.fn()
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn()
      })),
      order: jest.fn(() => ({
        limit: jest.fn()
      })),
      limit: jest.fn()
    })),
    insert: jest.fn(),
    upsert: jest.fn()
  })),
  rpc: jest.fn()
}

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: jest.fn(() => mockSupabase)
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn()
}))

// Mock LusoBot engine
jest.mock('@/lib/lusobot-engine', () => ({
  LusoBotEngine: {
    generateResponse: jest.fn()
  },
  SaudadeEngine: {
    detectSaudade: jest.fn()
  }
}))

describe('LusoBot API Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/lusobot/chat - Authentication', () => {
    test('should require user authentication', async () => {
      mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: new Error('Not authenticated')
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello LusoBot'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    test('should accept authenticated requests', async () => {
      const mockUser = { id: 'user_123', email: 'test@example.com' }
      
      mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: mockUser },
        error: null
      })

      // Mock database responses
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'cultural_personality_profiles') {
          return {
            select: () => ({
              eq: () => ({
                single: () => Promise.resolve({
                  data: { portuguese_region: 'diaspora_uk', saudade_capacity: 7 },
                  error: null
                })
              })
            })
          }
        }
        if (table === 'profiles') {
          return {
            select: () => ({
              eq: () => ({
                single: () => Promise.resolve({
                  data: { first_name: 'Test', cultural_background: 'portuguese' },
                  error: null
                })
              })
            })
          }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null }),
          upsert: () => Promise.resolve({ data: null, error: null })
        }
      })

      // Mock LusoBot response
      const { LusoBotEngine } = require('@/lib/lusobot-engine')
      LusoBotEngine.generateResponse.mockResolvedValueOnce({
        id: 'response_123',
        role: 'assistant',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(),
        language: 'en',
        culturalContext: {
          region: 'diaspora_uk',
          topic: 'community',
          expertise: ['cultural_events'],
          confidence: 0.8
        },
        emotionalTone: {
          saudade: 0.2,
          nostalgia: 0.1,
          hope: 0.6,
          community: 0.7,
          heritage: 0.5
        },
        suggestions: []
      })

      // Mock saudade detection
      const { SaudadeEngine } = require('@/lib/lusobot-engine')
      SaudadeEngine.detectSaudade.mockReturnValueOnce({
        saudade: 0.1,
        nostalgia: 0.0,
        hope: 0.3,
        community: 0.2,
        heritage: 0.1
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Hello LusoBot',
          language: 'en'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.response).toBeDefined()
      expect(data.response.content).toBe('Hello! How can I help you today?')
      expect(data.conversation_context).toBeDefined()
      expect(data.session_metadata).toBeDefined()
    })
  })

  describe('POST /api/lusobot/chat - Input Validation', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: { id: 'user_123' } },
        error: null
      })
    })

    test('should reject empty messages', async () => {
      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: ''
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Message is required')
    })

    test('should reject whitespace-only messages', async () => {
      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: '   \n\t  '
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Message is required')
    })

    test('should accept valid Portuguese messages', async () => {
      // Setup mocks for successful request
      const setupMocks = () => {
        mockSupabase.from.mockImplementation((table: string) => ({
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null }),
          upsert: () => Promise.resolve({ data: null, error: null })
        }))

        const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
        LusoBotEngine.generateResponse.mockResolvedValue({
          id: 'response_pt',
          content: 'Olá! Como posso ajudar?',
          language: 'pt',
          culturalContext: { confidence: 0.8 },
          emotionalTone: { saudade: 0.3 }
        })
        SaudadeEngine.detectSaudade.mockReturnValue({ saudade: 0.3 })
      }

      setupMocks()

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Olá, como estás?',
          language: 'pt'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })
  })

  describe('POST /api/lusobot/chat - Cultural Context Processing', () => {
    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: { id: 'user_123' } },
        error: null
      })
    })

    test('should process Portuguese cultural context correctly', async () => {
      // Mock cultural profile
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'cultural_personality_profiles') {
          return {
            select: () => ({
              eq: () => ({
                single: () => Promise.resolve({
                  data: {
                    portuguese_region: 'north',
                    saudade_capacity: 8,
                    fado_resonance: 9,
                    generation_in_uk: 1
                  }
                })
              })
            })
          }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null })
        }
      })

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      // Mock saudade detection for high saudade content
      SaudadeEngine.detectSaudade.mockReturnValueOnce({
        saudade: 0.8,
        nostalgia: 0.7,
        hope: 0.3,
        community: 0.6,
        heritage: 0.9
      })

      LusoBotEngine.generateResponse.mockResolvedValueOnce({
        id: 'cultural_response',
        content: 'Compreendo essa saudade profunda que sentes.',
        language: 'pt',
        culturalContext: {
          region: 'north',
          topic: 'saudade',
          confidence: 0.9
        },
        emotionalTone: {
          saudade: 0.8,
          heritage: 0.9
        }
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Tenho muitas saudades do Porto, da minha terra',
          language: 'pt',
          cultural_context: {
            portuguese_region: 'north',
            saudade_intensity: 8
          }
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.conversation_context.saudade_detected).toBe(true)
      expect(data.conversation_context.emotional_support_provided).toBe(true)
    })

    test('should generate contextual recommendations', async () => {
      // Setup for food-related query
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'events') {
          return {
            select: () => ({
              ilike: () => ({
                eq: () => ({
                  gte: () => ({
                    limit: () => Promise.resolve({
                      data: [
                        {
                          id: 'cooking_event_1',
                          title: 'Portuguese Cooking Workshop',
                          date: '2024-01-15'
                        }
                      ]
                    })
                  })
                })
              })
            })
          }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null })
        }
      })

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      SaudadeEngine.detectSaudade.mockReturnValue({ saudade: 0.2 })
      LusoBotEngine.generateResponse.mockResolvedValue({
        id: 'food_response',
        content: 'Let me help you find Portuguese restaurants',
        culturalContext: { topic: 'cuisine' }
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Where can I find good Portuguese food in London?',
          language: 'en'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.conversation_context.recommendations).toBeDefined()
    })
  })

  describe('POST /api/lusobot/chat - Database Integration', () => {
    test('should store conversation interactions', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const insertMock = jest.fn().mockResolvedValue({ data: null, error: null })
      
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'voice_assistant_interactions') {
          return { insert: insertMock }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null })
        }
      })

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      SaudadeEngine.detectSaudade.mockReturnValue({ saudade: 0.1 })
      LusoBotEngine.generateResponse.mockResolvedValue({
        id: 'test_response',
        content: 'Test response',
        culturalContext: { topic: 'general' }
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Test message',
          language: 'en'
        })
      })

      const response = await POST(request)
      
      expect(response.status).toBe(200)
      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: 'user_123',
          input_text: 'Test message',
          interaction_type: 'text_input'
        })
      )
    })

    test('should update conversation context', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const rpcMock = jest.fn().mockResolvedValue({ data: null, error: null })
      mockSupabase.rpc = rpcMock

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null })
      }))

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      SaudadeEngine.detectSaudade.mockReturnValue({
        saudade: 0.7,
        community: 0.5
      })
      LusoBotEngine.generateResponse.mockResolvedValue({
        id: 'context_test',
        content: 'Context update test'
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'I miss home so much',
          language: 'en'
        })
      })

      await POST(request)

      expect(rpcMock).toHaveBeenCalledWith(
        'update_lusobot_context',
        expect.objectContaining({
          p_user_id: 'user_123',
          p_saudade_intensity: 7
        })
      )
    })
  })

  describe('GET /api/lusobot/chat - Conversation History', () => {
    test('should require authentication for history access', async () => {
      mockSupabase.auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: new Error('Not authenticated')
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat?session_id=test_session')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    test('should require session ID parameter', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Session ID is required')
    })

    test('should return conversation history', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const mockConversations = [
        {
          id: 'interaction_1',
          input_text: 'Hello',
          ai_response_text: 'Hi there!',
          cultural_topic_detected: 'greeting',
          created_at: '2024-01-01T10:00:00Z'
        }
      ]

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'voice_assistant_interactions') {
          return {
            select: () => ({
              eq: () => ({
                eq: () => ({
                  order: () => ({
                    limit: () => Promise.resolve({
                      data: mockConversations,
                      error: null
                    })
                  })
                })
              })
            })
          }
        }
        if (table === 'lusobot_conversation_context') {
          return {
            select: () => ({
              eq: () => ({
                eq: () => ({
                  single: () => Promise.resolve({
                    data: { conversation_count: 5 },
                    error: null
                  })
                })
              })
            })
          }
        }
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat?session_id=test_session')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.conversations).toEqual(mockConversations)
      expect(data.total_interactions).toBe(1)
    })
  })

  describe('Error Handling', () => {
    test('should handle LusoBot engine errors gracefully', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null })
      }))

      const { LusoBotEngine } = require('@/lib/lusobot-engine')
      LusoBotEngine.generateResponse.mockRejectedValue(new Error('AI processing error'))

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Test message'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to process LusoBot conversation')
    })

    test('should handle database errors gracefully', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({ eq: () => ({ single: () => Promise.reject(new Error('Database error')) }) })
      }))

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Test message'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to process LusoBot conversation')
    })

    test('should track failed AI interactions', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const insertMock = jest.fn().mockResolvedValue({ data: null, error: null })
      
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'ai_service_usage') {
          return { insert: insertMock }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.reject(new Error('DB Error')) }) })
        }
      })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Test message'
        })
      })

      await POST(request)

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          service_name: 'lusobot',
          operation_type: 'chat_interaction',
          success: false,
          error_message: expect.any(String)
        })
      )
    })
  })

  describe('Performance and Monitoring', () => {
    test('should track response latency', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      const insertMock = jest.fn().mockResolvedValue({ data: null, error: null })
      
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'ai_service_usage') {
          return { insert: insertMock }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null })
        }
      })

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      // Add delay to simulate processing time
      LusoBotEngine.generateResponse.mockImplementation(
        () => new Promise(resolve => 
          setTimeout(() => resolve({
            id: 'perf_test',
            content: 'Performance test response'
          }), 100)
        )
      )
      SaudadeEngine.detectSaudade.mockReturnValue({ saudade: 0.1 })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Performance test'
        })
      })

      await POST(request)

      expect(insertMock).toHaveBeenCalledWith(
        expect.objectContaining({
          service_name: 'lusobot',
          latency_ms: expect.any(Number),
          success: true
        })
      )
    })

    test('should generate session metadata', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user_123' } },
        error: null
      })

      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'lusobot_conversation_context') {
          return {
            select: () => ({
              eq: () => ({
                eq: () => ({
                  single: () => Promise.resolve({
                    data: {
                      conversation_count: 3,
                      conversation_effectiveness_score: 0.85
                    }
                  })
                })
              })
            })
          }
        }
        return {
          select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null }) }) }),
          insert: () => Promise.resolve({ data: null, error: null })
        }
      })

      const { LusoBotEngine, SaudadeEngine } = require('@/lib/lusobot-engine')
      
      LusoBotEngine.generateResponse.mockResolvedValue({
        id: 'metadata_test',
        content: 'Metadata test response'
      })
      SaudadeEngine.detectSaudade.mockReturnValue({ saudade: 0.1 })

      const request = new NextRequest('http://localhost:3000/api/lusobot/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: 'Metadata test',
          session_id: 'test_session_123'
        })
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.session_metadata).toEqual({
        session_id: 'test_session_123',
        conversation_count: 3,
        cultural_effectiveness: 0.85
      })
    })
  })
})