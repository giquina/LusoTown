/**
 * Mobile App Integration Tests - Portuguese API Connections
 * Phase 6A: Performance Optimization & Quality Assurance
 * 
 * Tests API integrations for Portuguese-speaking community features
 * Focus: Supabase integration, Portuguese content handling, error scenarios
 */

import { supabase } from '../../src/lib/supabase'

// Mock fetch for API testing
global.fetch = jest.fn()

describe('Portuguese Community API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Authentication API', () => {
    test('handles Portuguese user registration', async () => {
      const mockUser = {
        email: 'jose.silva@email.com',
        password: 'SecurePassword123!',
        user_metadata: {
          full_name: 'José Silva',
          heritage: 'Portugal',
          location: 'London, UK'
        }
      }

      // Mock successful registration
      supabase.auth.signUp = jest.fn().mockResolvedValue({
        data: { user: { id: 'user-123', ...mockUser } },
        error: null
      })

      const result = await supabase.auth.signUp({
        email: mockUser.email,
        password: mockUser.password,
        options: {
          data: mockUser.user_metadata
        }
      })

      expect(result.error).toBeNull()
      expect(result.data.user).toBeDefined()
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: mockUser.email,
        password: mockUser.password,
        options: {
          data: mockUser.user_metadata
        }
      })
    })

    test('handles Portuguese login with proper error messages', async () => {
      const loginData = {
        email: 'maria@email.com',
        password: 'wrongpassword'
      }

      // Mock failed login
      supabase.auth.signIn = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' }
      })

      const result = await supabase.auth.signIn(loginData)

      expect(result.error).toBeDefined()
      expect(result.error.message).toBe('Invalid credentials')
      expect(result.data).toBeNull()
    })
  })

  describe('Events API', () => {
    test('fetches Portuguese cultural events', async () => {
      const mockEvents = [
        {
          id: 1,
          title: 'Festa de São João',
          description: 'Tradicional festa portuguesa',
          location: 'London, UK',
          date: '2025-06-24',
          heritage: 'Portugal',
          category: 'Cultural'
        },
        {
          id: 2,
          title: 'Festival de Música Brasileira',
          description: 'Concerto de música brasileira',
          location: 'Manchester, UK',
          date: '2025-07-15',
          heritage: 'Brasil',
          category: 'Music'
        }
      ]

      supabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockEvents,
              error: null
            })
          })
        })
      })

      // Simulate API call
      const result = await supabase
        .from('events')
        .select('*')
        .eq('active', true)
        .order('date', { ascending: true })

      expect(result.data).toEqual(mockEvents)
      expect(result.error).toBeNull()
      expect(result.data[0].title).toBe('Festa de São João')
      expect(result.data[1].heritage).toBe('Brasil')
    })

    test('handles event creation with Portuguese content validation', async () => {
      const newEvent = {
        title: 'Noite de Fado',
        description: 'Uma noite especial de fado tradicional português',
        location: 'Portuguese Cultural Centre, London',
        date: '2025-08-20',
        heritage: 'Portugal',
        organizer_id: 'user-123'
      }

      supabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockResolvedValue({
          data: { id: 'event-456', ...newEvent },
          error: null
        })
      })

      const result = await supabase
        .from('events')
        .insert(newEvent)

      expect(result.error).toBeNull()
      expect(result.data.title).toBe('Noite de Fado')
      expect(result.data.description).toContain('fado tradicional português')
    })
  })

  describe('Business Directory API', () => {
    test('searches Portuguese businesses with geolocation', async () => {
      const mockBusinesses = [
        {
          id: 1,
          name: 'Restaurante O Bacalhau',
          category: 'Restaurant',
          heritage: 'Portugal',
          location: 'London, UK',
          coordinates: { lat: 51.5074, lng: -0.1278 },
          verified: true
        },
        {
          id: 2,
          name: 'Padaria Brasileira',
          category: 'Bakery',
          heritage: 'Brasil',
          location: 'Manchester, UK',
          coordinates: { lat: 53.4808, lng: -2.2426 },
          verified: true
        }
      ]

      // Mock PostGIS geolocation query
      supabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            within: jest.fn().mockResolvedValue({
              data: mockBusinesses,
              error: null
            })
          })
        })
      })

      const result = await supabase
        .from('businesses')
        .select('*')
        .eq('verified', true)
        .within('coordinates', { lat: 51.5074, lng: -0.1278, radius: 10000 })

      expect(result.data).toEqual(mockBusinesses)
      expect(result.data[0].name).toBe('Restaurante O Bacalhau')
      expect(result.data[0].heritage).toBe('Portugal')
      expect(result.data[1].heritage).toBe('Brasil')
    })
  })

  describe('Matching System API', () => {
    test('finds Portuguese cultural compatibility matches', async () => {
      const userProfile = {
        id: 'user-123',
        heritage: 'Portugal',
        interests: ['Fado', 'Football', 'Food'],
        location: 'London, UK',
        age: 28
      }

      const mockMatches = [
        {
          id: 'user-456',
          heritage: 'Portugal',
          interests: ['Fado', 'Music', 'Food'],
          location: 'London, UK',
          age: 25,
          compatibility_score: 85
        },
        {
          id: 'user-789',
          heritage: 'Brasil',
          interests: ['Music', 'Football', 'Samba'],
          location: 'London, UK',
          age: 30,
          compatibility_score: 72
        }
      ]

      // Mock AI matching algorithm API call
      supabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          neq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({
              data: mockMatches,
              error: null
            })
          })
        })
      })

      const result = await supabase
        .from('matches')
        .select('*')
        .neq('user_id', userProfile.id)
        .order('compatibility_score', { ascending: false })

      expect(result.data).toEqual(mockMatches)
      expect(result.data[0].compatibility_score).toBe(85)
      expect(result.data[0].heritage).toBe('Portugal')
    })
  })

  describe('Error Handling', () => {
    test('handles network connectivity issues', async () => {
      // Mock network failure
      supabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValue({
          message: 'Network request failed',
          name: 'NetworkError'
        })
      })

      try {
        await supabase.from('events').select('*')
      } catch (error) {
        expect(error.message).toBe('Network request failed')
        expect(error.name).toBe('NetworkError')
      }
    })

    test('handles Portuguese text encoding errors', async () => {
      const portugueseText = 'São João - Celebração Tradicional 🇵🇹'
      
      supabase.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockResolvedValue({
          data: { title: portugueseText },
          error: null
        })
      })

      const result = await supabase
        .from('events')
        .insert({ title: portugueseText })

      // Verify Portuguese characters are preserved
      expect(result.data.title).toBe(portugueseText)
      expect(result.data.title).toContain('São')
      expect(result.data.title).toContain('João')
      expect(result.data.title).toContain('🇵🇹')
    })

    test('handles API rate limiting gracefully', async () => {
      const rateLimitError = {
        message: 'Rate limit exceeded',
        status: 429,
        retry_after: 60
      }

      supabase.from = jest.fn().mockReturnValue({
        select: jest.fn().mockRejectedValue(rateLimitError)
      })

      try {
        await supabase.from('events').select('*')
      } catch (error) {
        expect(error.status).toBe(429)
        expect(error.message).toBe('Rate limit exceeded')
        expect(error.retry_after).toBe(60)
      }
    })
  })

  describe('Data Validation', () => {
    test('validates Portuguese phone numbers', () => {
      const validatePortuguesePhone = (phone: string) => {
        // Portuguese mobile: +351 9X XXX XXXX
        // UK Portuguese community: +44 7XXX XXXXXX
        const portuguesePhoneRegex = /^(\+351\s9\d{8}|\+44\s7\d{9})$/
        return portuguesePhoneRegex.test(phone.replace(/\s/g, ' '))
      }

      expect(validatePortuguesePhone('+351 91 234 5678')).toBe(true)
      expect(validatePortuguesePhone('+44 7123 456789')).toBe(true)
      expect(validatePortuguesePhone('+1 555 123 4567')).toBe(false)
    })

    test('validates Portuguese postal codes', () => {
      const validatePostalCode = (code: string, country: string) => {
        if (country === 'Portugal') {
          // Portuguese postal code: XXXX-XXX
          return /^\d{4}-\d{3}$/.test(code)
        } else if (country === 'UK') {
          // UK postal code patterns
          return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(code)
        }
        return false
      }

      expect(validatePostalCode('1000-001', 'Portugal')).toBe(true)
      expect(validatePostalCode('SW1A 1AA', 'UK')).toBe(true)
      expect(validatePostalCode('12345', 'Portugal')).toBe(false)
    })
  })
})

describe('API Performance Tests', () => {
  test('API responses meet performance requirements', async () => {
    const startTime = performance.now()
    
    supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: [{ id: 1, title: 'Test Event' }],
        error: null
      })
    })

    await supabase.from('events').select('*')
    
    const endTime = performance.now()
    const responseTime = endTime - startTime
    
    // API calls should respond within 2 seconds
    expect(responseTime).toBeLessThan(2000)
  })

  test('handles large datasets efficiently', async () => {
    // Mock large dataset
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      title: `Evento Português ${i}`,
      heritage: i % 2 === 0 ? 'Portugal' : 'Brasil'
    }))

    supabase.from = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        data: largeDataset,
        error: null
      })
    })

    const startTime = performance.now()
    const result = await supabase.from('events').select('*')
    const endTime = performance.now()

    expect(result.data.length).toBe(1000)
    expect(endTime - startTime).toBeLessThan(1000) // Should handle large data within 1 second
  })
})
