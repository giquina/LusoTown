'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useLanguage } from './LanguageContext'
import { authService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { ROUTES } from '@/config/routes'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing'
  plan_type: 'monthly' | 'yearly'
  tier: 'free' | 'community' | 'ambassador'
  current_period_start?: string
  current_period_end?: string
  trial_end?: string
  amount: number
  currency: string
  student_verified?: boolean
  corporate_account_id?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionTrial {
  id: string
  user_id: string
  trial_start: string
  trial_end: string
  is_used: boolean
  created_at: string
}

export interface SubscriptionUsageLimits {
  dailyMatches: number
  monthlyMessages: number
  premiumEvents: number
  livestreamHours: number
  hasUnlimitedAccess: boolean
}

export interface SubscriptionUsage {
  dailyMatchesUsed: number
  monthlyMessagesUsed: number
  premiumEventsUsed: number
  livestreamHoursUsed: number
  lastResetDate: string
}

interface SubscriptionContextType {
  subscription: Subscription | null
  trial: SubscriptionTrial | null
  usage: SubscriptionUsage | null
  isLoading: boolean
  hasActiveSubscription: boolean
  isInTrial: boolean
  trialDaysRemaining: number
  subscriptionRequired: boolean
  stripe: Stripe | null
  membershipTier: 'none' | 'free' | 'community' | 'ambassador'
  serviceDiscount: number
  usageLimits: SubscriptionUsageLimits
  
  // Feature access
  canSendMessage: () => boolean
  canCreateMatch: () => boolean
  canAccessPremiumEvent: () => boolean
  canAccessLivestream: () => boolean
  getRemainingMatches: () => number
  getRemainingMessages: () => number
  
  // Actions
  checkSubscriptionStatus: () => Promise<void>
  createSubscription: (tier?: 'free' | 'community' | 'ambassador', planType?: 'monthly' | 'yearly') => Promise<string | null>
  upgradeSubscription: (newTier: 'free' | 'community' | 'ambassador') => Promise<boolean>
  cancelSubscription: () => Promise<boolean>
  redirectToSubscription: () => void
  markTrialAsUsed: () => Promise<void>
  trackMembershipUsage: (benefitType: string, serviceType: string, discountApplied?: number, amountSaved?: number) => Promise<void>
  trackFeatureUsage: (feature: 'match' | 'message' | 'premium_event' | 'livestream') => Promise<boolean>
  validateStudentStatus: (studentEmail: string, universityId: string) => Promise<boolean>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

interface SubscriptionProviderProps {
  children: ReactNode
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { language, t } = useLanguage()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [trial, setTrial] = useState<SubscriptionTrial | null>(null)
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stripe, setStripe] = useState<Stripe | null>(null)

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise
      setStripe(stripeInstance)
    }
    initializeStripe()
  }, [])

  // Load subscription status when user changes
  useEffect(() => {
    const checkUserSubscription = async () => {
      const user = authService.getCurrentUser()
      if (user && !authService.isDemoUser()) {
        await checkSubscriptionStatus()
      } else {
        setSubscription(null)
        setTrial(null)
        setIsLoading(false)
      }
    }

    checkUserSubscription()

    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChange(checkUserSubscription)
    return unsubscribe
  }, [])

  const checkSubscriptionStatus = async () => {
    setIsLoading(true)
    try {
      const user = authService.getCurrentUser()
      if (!user || authService.isDemoUser()) {
        setSubscription(null)
        setTrial(null)
        return
      }

      // Check for active subscription
      const { data: subscriptionData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      if (subError && subError.code !== 'PGRST116') {
        console.error('Error fetching subscription:', subError)
      } else if (subscriptionData) {
        setSubscription(subscriptionData)
      }

      // Check for trial status
      const { data: trialData, error: trialError } = await supabase
        .from('subscription_trials')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (trialError && trialError.code !== 'PGRST116') {
        console.error('Error fetching trial:', trialError)
      } else if (trialData) {
        setTrial(trialData)
      }
    } catch (error) {
      console.error('Error checking subscription status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createSubscription = async (
    tier: 'free' | 'community' | 'ambassador' = 'community',
    planType: 'monthly' | 'yearly' = 'monthly'
  ): Promise<string | null> => {
    try {
      const user = authService.getCurrentUser()
      if (!user || authService.isDemoUser()) {
        throw new Error('User must be logged in to create subscription')
      }

      // Call your backend API to create Stripe checkout session
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
          userName: user.name,
          tier: tier,
          planType: planType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create subscription')
      }

      const { sessionId } = await response.json()
      
      if (!stripe) {
        throw new Error('Stripe not initialized')
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error('Stripe checkout error:', error)
        toast.error(
          language === 'pt' 
            ? 'Erro ao processar pagamento. Tente novamente.' 
            : 'Payment processing error. Please try again.'
        )
        return null
      }

      return sessionId
    } catch (error) {
      console.error('Error creating subscription:', error)
      toast.error(
        language === 'pt' 
          ? 'Erro ao criar subscrição. Tente novamente.' 
          : 'Error creating subscription. Please try again.'
      )
      return null
    }
  }

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      const user = authService.getCurrentUser()
      if (!user || !subscription) {
        return false
      }

      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      // Refresh subscription status
      await checkSubscriptionStatus()
      
      toast.success(
        language === 'pt' 
          ? 'Subscrição cancelada com sucesso' 
          : 'Subscription cancelled successfully'
      )
      
      return true
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      toast.error(
        language === 'pt' 
          ? 'Erro ao cancelar subscrição' 
          : 'Error cancelling subscription'
      )
      return false
    }
  }

  const redirectToSubscription = () => {
  window.location.href = ROUTES.subscription
  }

  const upgradeSubscription = async (newTier: 'free' | 'community' | 'ambassador'): Promise<boolean> => {
    try {
      const user = authService.getCurrentUser()
      if (!user || !subscription) {
        return false
      }

      const response = await fetch('/api/upgrade-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
          newTier: newTier,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to upgrade subscription')
      }

      // Refresh subscription status
      await checkSubscriptionStatus()
      
      toast.success(
        language === 'pt' 
          ? 'Subscrição atualizada com sucesso' 
          : 'Subscription upgraded successfully'
      )
      
      return true
    } catch (error) {
      console.error('Error upgrading subscription:', error)
      toast.error(
        language === 'pt' 
          ? 'Erro ao atualizar subscrição' 
          : 'Error upgrading subscription'
      )
      return false
    }
  }

  const markTrialAsUsed = async () => {
    try {
      const user = authService.getCurrentUser()
      if (!user || !trial) return

      const { error } = await supabase
        .from('subscription_trials')
        .update({ is_used: true })
        .eq('user_id', user.id)

      if (error) {
        console.error('Error marking trial as used:', error)
      } else {
        setTrial(prev => prev ? { ...prev, is_used: true } : null)
      }
    } catch (error) {
      console.error('Error marking trial as used:', error)
    }
  }

  const trackMembershipUsage = async (
    benefitType: string, 
    serviceType: string, 
    discountApplied: number = 0, 
    amountSaved: number = 0
  ) => {
    try {
      const user = authService.getCurrentUser()
      if (!user || !subscription) return

      const { error } = await supabase
        .from('membership_usage')
        .insert({
          user_id: user.id,
          subscription_id: subscription.id,
          benefit_type: benefitType,
          service_type: serviceType,
          discount_applied: discountApplied,
          amount_saved: amountSaved,
        })

      if (error) {
        console.error('Error tracking membership usage:', error)
      }
    } catch (error) {
      console.error('Error tracking membership usage:', error)
    }
  }

  const trackFeatureUsage = async (feature: 'match' | 'message' | 'premium_event' | 'livestream'): Promise<boolean> => {
    try {
      const user = authService.getCurrentUser()
      if (!user) return false

      // Check current usage limits
      if (!canUseFeature(feature)) {
        return false
      }

      // Update usage counts
      const today = new Date().toISOString().split('T')[0]
      const currentMonth = new Date().toISOString().substring(0, 7)
      
      // Start from a strongly-typed baseline and then copy forward allowed counters
      let updatedUsage: SubscriptionUsage = {
        dailyMatchesUsed: 0,
        monthlyMessagesUsed:
          usage?.lastResetDate?.substring(0, 7) === currentMonth ? usage!.monthlyMessagesUsed : 0,
        premiumEventsUsed: 0,
        livestreamHoursUsed: 0,
        lastResetDate: today,
      }

      // If same day, carry forward today's counters
      if (usage && usage.lastResetDate === today) {
        updatedUsage.dailyMatchesUsed = usage.dailyMatchesUsed
        updatedUsage.premiumEventsUsed = usage.premiumEventsUsed
        updatedUsage.livestreamHoursUsed = usage.livestreamHoursUsed
      }

      // Increment the specific counter
      switch (feature) {
        case 'match':
          updatedUsage.dailyMatchesUsed++
          break
        case 'message':
          updatedUsage.monthlyMessagesUsed++
          break
        case 'premium_event':
          updatedUsage.premiumEventsUsed++
          break
        case 'livestream':
          updatedUsage.livestreamHoursUsed++
          break
      }

      // Save to database
      const { error } = await supabase
        .from('subscription_usage')
        .upsert({
          user_id: user.id,
          ...updatedUsage
        })

      if (error) {
        console.error('Error tracking feature usage:', error)
        return false
      }

  setUsage(updatedUsage)
      return true
    } catch (error) {
      console.error('Error tracking feature usage:', error)
      return false
    }
  }

  const validateStudentStatus = async (studentEmail: string, universityId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/validate-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: studentEmail,
          universityId: universityId,
        }),
      })

      if (!response.ok) {
        return false
      }

      const { isValid } = await response.json()
      return isValid
    } catch (error) {
      console.error('Error validating student status:', error)
      return false
    }
  }

  // Helper function to check feature usage
  const canUseFeature = (feature: 'match' | 'message' | 'premium_event' | 'livestream'): boolean => {
    if (usageLimits.hasUnlimitedAccess) return true
    if (!usage) return true // First time usage

    const today = new Date().toISOString().split('T')[0]
    const currentMonth = new Date().toISOString().substring(0, 7)
    
    // Reset counters if needed
    const dailyReset = usage.lastResetDate !== today
    const monthlyReset = usage.lastResetDate.substring(0, 7) !== currentMonth

    switch (feature) {
      case 'match':
        const dailyMatches = dailyReset ? 0 : usage.dailyMatchesUsed
        return dailyMatches < usageLimits.dailyMatches
      case 'message':
        const monthlyMessages = monthlyReset ? 0 : usage.monthlyMessagesUsed
        return monthlyMessages < usageLimits.monthlyMessages
      case 'premium_event':
        return usage.premiumEventsUsed < usageLimits.premiumEvents
      case 'livestream':
        return usage.livestreamHoursUsed < usageLimits.livestreamHours
      default:
        return false
    }
  }

  // Computed values
  const hasActiveSubscription = Boolean(
    subscription && 
    subscription.status === 'active' && 
    subscription.current_period_end && 
    new Date(subscription.current_period_end) > new Date()
  )

  const isInTrial = Boolean(
    trial && 
    !trial.is_used && 
    new Date(trial.trial_end) > new Date()
  )

  const trialDaysRemaining = trial && !trial.is_used ? 
    Math.max(0, Math.ceil((new Date(trial.trial_end).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 
    0

  // Subscription is required for all users except demo users
  const subscriptionRequired = !authService.isDemoUser() && !hasActiveSubscription && !isInTrial

  // Get current membership tier
  const membershipTier: 'none' | 'free' | 'community' | 'ambassador' = 
    hasActiveSubscription && subscription?.tier ? subscription.tier : 'none'

  // Normalize to an effective tier for limits/discounts
  const effectiveTier: 'free' | 'community' | 'ambassador' = membershipTier === 'none' ? 'free' : membershipTier

  // Calculate service discount based on tier
  const serviceDiscount = (() => {
    switch (effectiveTier) {
      case 'community': return 10 // 10% member discount
      case 'ambassador': return 20 // 20% ambassador discount
      default: return 0
    }
  })()

  // Usage limits based on tier - Optimized for Portuguese community conversion
  const usageLimits: SubscriptionUsageLimits = (() => {
    switch (effectiveTier) {
      case 'free':
        return {
          dailyMatches: 2, // Aligned with promised benefits in MembershipTiers
          monthlyMessages: 3, // Aligned with promised benefits in MembershipTiers
          premiumEvents: 0,
          livestreamHours: 0,
          hasUnlimitedAccess: false
        }
      case 'community':
        return {
          dailyMatches: -1, // unlimited matches
          monthlyMessages: -1, // unlimited messaging
          premiumEvents: -1, // unlimited community events (not premium events)
          livestreamHours: 0, // no streaming access for community tier
          hasUnlimitedAccess: false
        }
      case 'ambassador':
        return {
          dailyMatches: -1, // unlimited
          monthlyMessages: -1, // unlimited
          premiumEvents: -1, // unlimited including premium events
          livestreamHours: 5, // 5 hours per month as stated in benefits
          hasUnlimitedAccess: false // Limited streaming hours, not unlimited
        }
      default:
        return {
          dailyMatches: 3,
          monthlyMessages: 10,
          premiumEvents: 0,
          livestreamHours: 0,
          hasUnlimitedAccess: false
        }
    }
  })()

  // Feature access functions
  const canSendMessage = (): boolean => {
    return canUseFeature('message')
  }

  const canCreateMatch = (): boolean => {
    return canUseFeature('match')
  }

  const canAccessPremiumEvent = (): boolean => {
    return canUseFeature('premium_event')
  }

  const canAccessLivestream = (): boolean => {
    return canUseFeature('livestream')
  }

  const getRemainingMatches = (): number => {
    if (usageLimits.hasUnlimitedAccess || usageLimits.dailyMatches === -1) return -1
    
    const today = new Date().toISOString().split('T')[0]
    const dailyUsed = usage?.lastResetDate === today ? usage.dailyMatchesUsed : 0
    return Math.max(0, usageLimits.dailyMatches - dailyUsed)
  }

  const getRemainingMessages = (): number => {
    if (usageLimits.hasUnlimitedAccess || usageLimits.monthlyMessages === -1) return -1
    
    const currentMonth = new Date().toISOString().substring(0, 7)
    const monthlyUsed = usage?.lastResetDate?.substring(0, 7) === currentMonth ? usage.monthlyMessagesUsed : 0
    return Math.max(0, usageLimits.monthlyMessages - monthlyUsed)
  }

  const value: SubscriptionContextType = {
    subscription,
    trial,
    usage,
    isLoading,
    hasActiveSubscription,
    isInTrial,
    trialDaysRemaining,
    subscriptionRequired,
    stripe,
    membershipTier,
    serviceDiscount,
    usageLimits,
    canSendMessage,
    canCreateMatch,
    canAccessPremiumEvent,
    canAccessLivestream,
    getRemainingMatches,
    getRemainingMessages,
    checkSubscriptionStatus,
    createSubscription,
    upgradeSubscription,
    cancelSubscription,
    redirectToSubscription,
    markTrialAsUsed,
    trackMembershipUsage,
    trackFeatureUsage,
    validateStudentStatus,
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}