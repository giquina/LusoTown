import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { getApiErrorMessage, getApiSuccessMessage, STRIPE_CONFIG } from '@/config/api-messages'
import logger from '@/utils/logger'

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(STRIPE_CONFIG.MISSING_SECRET_KEY)
  }
  return new Stripe(key, {
    apiVersion: '2025-07-30.basil' as any,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: getApiErrorMessage('MISSING_SUBSCRIPTION_ID') },
        { status: 400 }
      )
    }

    // Cancel the subscription in Stripe
    const stripe = getStripe()
    const cancelledSubscription = await stripe.subscriptions.cancel(subscriptionId)

    // Update subscription status in database
    await supabase
      .from('subscriptions')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)

    // Update profile subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .single()

    if (subscription) {
      await supabase
        .from('profiles')
        .update({ subscription_status: 'cancelled' })
        .eq('id', subscription.user_id)
    }

    return NextResponse.json({ 
      success: true, 
      subscription: cancelledSubscription 
    })
  } catch (error) {
    logger.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: getApiErrorMessage('SUBSCRIPTION_CANCEL_FAILED') },
      { status: 500 }
    )
  }
}