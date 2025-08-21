import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }
  return new Stripe(key, {
    apiVersion: '2024-06-20',
  })
}

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, newTier } = await request.json()

    if (!subscriptionId || !newTier) {
      return NextResponse.json(
        { error: 'Missing subscription ID or new tier' },
        { status: 400 }
      )
    }

    // Validate tier selection
    if (!['community', 'ambassador'].includes(newTier)) {
      return NextResponse.json(
        { error: 'Invalid tier selection' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    
    // Update subscription record in database
    await supabase
      .from('subscriptions')
      .update({ 
        tier: newTier,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)

    return NextResponse.json({ 
      success: true, 
      newTier: newTier
    })
  } catch (error) {
    console.error('Error upgrading subscription:', error)
    return NextResponse.json(
      { error: 'Failed to upgrade subscription' },
      { status: 500 }
    )
  }
}
