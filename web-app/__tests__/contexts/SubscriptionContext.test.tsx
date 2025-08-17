import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { SubscriptionProvider, useSubscription } from '@/context/SubscriptionContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { portugueseTestUtils } from '../utils/test-utils'

// Mock Stripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve({
    redirectToCheckout: jest.fn(),
  })),
}))

// Mock auth service
jest.mock('@/lib/auth', () => ({
  authService: {
    getCurrentUser: jest.fn(),
    isDemoUser: jest.fn(() => false),
    onAuthStateChange: jest.fn(() => jest.fn()),
  },
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  },
}))

// Mock fetch for API calls
global.fetch = jest.fn()

describe('SubscriptionContext', () => {
  const mockUser = {
    id: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
  }

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageProvider>
      <SubscriptionProvider>{children}</SubscriptionProvider>
    </LanguageProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
    const { authService } = require('@/lib/auth')
    authService.getCurrentUser.mockReturnValue(mockUser)
    authService.isDemoUser.mockReturnValue(false)
  })

  describe('Initialization', () => {
    it('should initialize with loading state', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      expect(result.current.isLoading).toBe(true)
      expect(result.current.subscription).toBeNull()
      expect(result.current.hasActiveSubscription).toBe(false)
    })

    it('should handle demo user correctly', () => {
      const { authService } = require('@/lib/auth')
      authService.isDemoUser.mockReturnValue(true)
      
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      expect(result.current.subscriptionRequired).toBe(false)
    })
  })

  describe('Subscription Management', () => {
    it('should create subscription with correct tier', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ sessionId: 'test-session-id' }),
      } as Response)

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      await act(async () => {
        const sessionId = await result.current.createSubscription('platinum')
        expect(sessionId).toBe('test-session-id')
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: mockUser.id,
          userEmail: mockUser.email,
          userName: mockUser.name,
          tier: 'platinum',
        }),
      })
    })

    it('should handle subscription creation failure', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      } as Response)

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      await act(async () => {
        const sessionId = await result.current.createSubscription('bronze')
        expect(sessionId).toBeNull()
      })
    })

    it('should upgrade subscription successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      // Set up existing subscription
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      // Mock existing subscription
      act(() => {
        (result.current as any).subscription = portugueseTestUtils.mockPremiumSubscription
      })

      await act(async () => {
        const success = await result.current.upgradeSubscription('platinum')
        expect(success).toBe(true)
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/upgrade-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: undefined, // since we mocked the subscription
          newTier: 'platinum',
        }),
      })
    })

    it('should cancel subscription successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      // Mock existing subscription
      act(() => {
        (result.current as any).subscription = portugueseTestUtils.mockPremiumSubscription
      })

      await act(async () => {
        const success = await result.current.cancelSubscription()
        expect(success).toBe(true)
      })

      expect(mockFetch).toHaveBeenCalledWith('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: undefined, // since we mocked the subscription
        }),
      })
    })
  })

  describe('Membership Tiers and Discounts', () => {
    it('should calculate correct service discount for each tier', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      // Test different tiers
      const tiers = [
        { tier: 'bronze', expectedDiscount: 10 },
        { tier: 'silver', expectedDiscount: 15 },
        { tier: 'gold', expectedDiscount: 20 },
        { tier: 'platinum', expectedDiscount: 25 },
      ]

      tiers.forEach(({ tier, expectedDiscount }) => {
        act(() => {
          (result.current as any).subscription = {
            ...portugueseTestUtils.mockPremiumSubscription,
            tier,
            status: 'active',
            current_period_end: '2025-01-01T00:00:00Z',
          }
        })

        expect(result.current.serviceDiscount).toBe(expectedDiscount)
        expect(result.current.membershipTier).toBe(tier)
      })
    })

    it('should return no discount for inactive subscription', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      expect(result.current.serviceDiscount).toBe(0)
      expect(result.current.membershipTier).toBe('none')
    })
  })

  describe('Trial Management', () => {
    it('should detect active trial period', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      
      act(() => {
        (result.current as any).trial = {
          id: 'trial-1',
          user_id: mockUser.id,
          trial_start: new Date().toISOString(),
          trial_end: futureDate.toISOString(),
          is_used: false,
          created_at: new Date().toISOString(),
        }
      })

      expect(result.current.isInTrial).toBe(true)
      expect(result.current.trialDaysRemaining).toBeGreaterThan(0)
      expect(result.current.subscriptionRequired).toBe(false)
    })

    it('should detect expired trial', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)
      
      act(() => {
        (result.current as any).trial = {
          id: 'trial-1',
          user_id: mockUser.id,
          trial_start: new Date().toISOString(),
          trial_end: pastDate.toISOString(),
          is_used: false,
          created_at: new Date().toISOString(),
        }
      })

      expect(result.current.isInTrial).toBe(false)
      expect(result.current.trialDaysRemaining).toBe(0)
      expect(result.current.subscriptionRequired).toBe(true)
    })

    it('should mark trial as used', async () => {
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        update: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve({ error: null })),
        })),
      })

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      act(() => {
        (result.current as any).trial = {
          id: 'trial-1',
          user_id: mockUser.id,
          trial_start: new Date().toISOString(),
          trial_end: new Date().toISOString(),
          is_used: false,
          created_at: new Date().toISOString(),
        }
      })

      await act(async () => {
        await result.current.markTrialAsUsed()
      })

      expect(supabase.from).toHaveBeenCalledWith('subscription_trials')
    })
  })

  describe('Usage Tracking', () => {
    it('should track membership usage correctly', async () => {
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        insert: jest.fn(() => Promise.resolve({ error: null })),
      })

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      act(() => {
        (result.current as any).subscription = portugueseTestUtils.mockPremiumSubscription
      })

      await act(async () => {
        await result.current.trackMembershipUsage(
          'transport_discount',
          'executive_transport',
          20,
          15.50
        )
      })

      expect(supabase.from).toHaveBeenCalledWith('membership_usage')
    })
  })

  describe('Portuguese Context Integration', () => {
    it('should provide Portuguese error messages', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      } as Response)

      // Mock toast
      const { toast } = require('react-hot-toast')

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      // Set language to Portuguese
      const languageContext = require('@/context/LanguageContext')
      languageContext.language = 'pt'

      await act(async () => {
        await result.current.createSubscription('bronze')
      })

      // Should show Portuguese error message
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('Erro ao criar subscrição')
      )
    })

    it('should handle Portuguese subscription tiers', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      const portugueseTiers = ['bronze', 'silver', 'gold', 'platinum'] as const
      
      portugueseTiers.forEach(tier => {
        act(() => {
          (result.current as any).subscription = {
            ...portugueseTestUtils.mockPremiumSubscription,
            tier,
            status: 'active',
            current_period_end: '2025-01-01T00:00:00Z',
          }
        })

        expect(result.current.membershipTier).toBe(tier)
        expect(result.current.hasActiveSubscription).toBe(true)
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      await act(async () => {
        const sessionId = await result.current.createSubscription('bronze')
        expect(sessionId).toBeNull()
      })
    })

    it('should handle Supabase errors', async () => {
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        update: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve({ error: { message: 'Database error' } })),
        })),
      })

      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      act(() => {
        (result.current as any).trial = {
          id: 'trial-1',
          user_id: mockUser.id,
          is_used: false,
        }
      })

      await act(async () => {
        await result.current.markTrialAsUsed()
      })

      // Should not crash, error should be logged
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Subscription Status Detection', () => {
    it('should correctly identify active subscription', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      
      act(() => {
        (result.current as any).subscription = {
          ...portugueseTestUtils.mockPremiumSubscription,
          status: 'active',
          current_period_end: futureDate.toISOString(),
        }
      })

      expect(result.current.hasActiveSubscription).toBe(true)
      expect(result.current.subscriptionRequired).toBe(false)
    })

    it('should correctly identify expired subscription', () => {
      const { result } = renderHook(() => useSubscription(), { wrapper })
      
      const pastDate = new Date()
      pastDate.setFullYear(pastDate.getFullYear() - 1)
      
      act(() => {
        (result.current as any).subscription = {
          ...portugueseTestUtils.mockPremiumSubscription,
          status: 'active',
          current_period_end: pastDate.toISOString(),
        }
      })

      expect(result.current.hasActiveSubscription).toBe(false)
      expect(result.current.subscriptionRequired).toBe(true)
    })
  })
})
