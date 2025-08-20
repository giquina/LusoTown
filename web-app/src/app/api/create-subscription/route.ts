import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY as string
  return new Stripe(key, {
  // Use the SDK's default pinned version to avoid type mismatches
  // See types in node-stripe SDK for allowed literal values
  apiVersion: undefined,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail, userName, tier = 'community', planType = 'monthly' } = await request.json()

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required user information' },
        { status: 400 }
      )
    }

    // Validate tier selection
    if (!['community', 'ambassador'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier selection' },
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

    // Determine pricing based on tier
    const tierConfig = {
      community: {
        name: 'LusoTown Community Member',
        namePortuguese: 'Membro da Comunidade LusoTown',
        description: 'Full access to Portuguese community network in London',
        descriptionPortuguese: 'Acesso completo à rede da comunidade portuguesa em Londres',
        price: 1999, // £19.99 in pence
      },
      ambassador: {
        name: 'LusoTown Cultural Ambassador',
        namePortuguese: 'Embaixador Cultural LusoTown',
        description: 'Lead the Portuguese community with priority features',
        descriptionPortuguese: 'Lidere a comunidade portuguesa com funcionalidades prioritárias',
        price: 3999, // £39.99 in pence
      },
    }

    const selectedTier = tierConfig[tier as keyof typeof tierConfig]

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
              name: selectedTier.name,
              description: selectedTier.description,
              images: [require('@/config/site').absoluteUrl('/lusotown-membership.jpg')],
            },
            unit_amount: selectedTier.price,
            recurring: {
              interval: planType === 'yearly' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/cancelled`,
      metadata: {
        lusotown_user_id: userId,
        lusotown_tier: tier,
        lusotown_plan_type: planType,
      },
      subscription_data: {
        metadata: {
          lusotown_user_id: userId,
          lusotown_tier: tier,
          lusotown_plan_type: planType,
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