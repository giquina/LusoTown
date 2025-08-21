import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY || 'sk_test_51Demo123456789012345678901234567890Demo'
  return new Stripe(key, {
    apiVersion: '2024-06-20',
  })
}

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription ID' },
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
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}