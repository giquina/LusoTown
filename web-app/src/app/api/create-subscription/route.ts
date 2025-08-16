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
    const { userId, userEmail, userName } = await request.json()

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required user information' },
        { status: 400 }
      )
    }

    // Check if user already has a Stripe customer
    const stripe = getStripe()
    let customerId: string

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    if (existingProfile?.stripe_customer_id) {
      customerId = existingProfile.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          lusotown_user_id: userId,
        },
      })
      customerId = customer.id

      // Update profile with Stripe customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'LusoTown Annual Membership',
              description: 'Annual access to the Portuguese community network in London',
              images: ['https://lusotown.vercel.app/lusotown-membership.jpg'],
            },
            unit_amount: 2500, // £25.00 in pence
            recurring: {
              interval: 'year',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/cancelled`,
      metadata: {
        lusotown_user_id: userId,
      },
      subscription_data: {
        metadata: {
          lusotown_user_id: userId,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription session' },
      { status: 500 }
    )
  }
}