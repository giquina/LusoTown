'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useLanguage } from './LanguageContext'
import { authService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing'
  plan_type: 'yearly'
  current_period_start?: string
  current_period_end?: string
  trial_end?: string
  amount: number
  currency: string
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

interface SubscriptionContextType {
  subscription: Subscription | null
  trial: SubscriptionTrial | null
  isLoading: boolean
  hasActiveSubscription: boolean
  isInTrial: boolean
  trialDaysRemaining: number
  subscriptionRequired: boolean
  stripe: Stripe | null
  
  // Actions
  checkSubscriptionStatus: () => Promise<void>
  createSubscription: () => Promise<string | null>
  cancelSubscription: () => Promise<boolean>
  redirectToSubscription: () => void
  markTrialAsUsed: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

interface SubscriptionProviderProps {
  children: ReactNode
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { language, t } = useLanguage()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [trial, setTrial] = useState<SubscriptionTrial | null>(null)
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

  const createSubscription = async (): Promise<string | null> => {
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
    window.location.href = '/subscription'
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

  const value: SubscriptionContextType = {
    subscription,
    trial,
    isLoading,
    hasActiveSubscription,
    isInTrial,
    trialDaysRemaining,
    subscriptionRequired,
    stripe,
    checkSubscriptionStatus,
    createSubscription,
    cancelSubscription,
    redirectToSubscription,
    markTrialAsUsed,
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