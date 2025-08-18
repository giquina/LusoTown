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
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_demo123456789012345678901234567890'

    let event: Stripe.Event

    try {
      const stripe = getStripe()
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Checkout session completed for user:', userId)

  // Mark trial as used if they had one
  await supabase
    .from('subscription_trials')
    .update({ is_used: true })
    .eq('user_id', userId)
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Subscription created for user:', userId)

  // Create subscription record
  await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      status: subscription.status as any,
      plan_type: 'monthly',
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      amount: 19.99,
      currency: 'GBP',
    })

  // Update profile subscription status
  await supabase
    .from('profiles')
    .update({ subscription_status: 'active' })
    .eq('id', userId)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Subscription updated for user:', userId)

  // Update subscription record
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status as any,
      current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
      current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  // Update profile subscription status
  let profileStatus = 'active'
  if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    profileStatus = 'expired'
  } else if (subscription.status === 'past_due') {
    profileStatus = 'expired'
  }

  await supabase
    .from('profiles')
    .update({ subscription_status: profileStatus })
    .eq('id', userId)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Subscription deleted for user:', userId)

  // Update subscription record
  await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  // Update profile subscription status
  await supabase
    .from('profiles')
    .update({ subscription_status: 'cancelled' })
    .eq('id', userId)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!(invoice as any).subscription) return

  const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string)
  const userId = subscription.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Payment succeeded for user:', userId)

  // Record payment
  const { data: subscriptionData } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('stripe_subscription_id', subscription.id)
    .single()

  if (subscriptionData) {
    await supabase
      .from('subscription_payments')
      .insert({
        subscription_id: subscriptionData.id,
        stripe_payment_intent_id: (invoice as any).payment_intent as string,
        amount: ((invoice as any).amount_paid || 0) / 100, // Convert from cents
        currency: ((invoice as any).currency || 'gbp').toUpperCase(),
        status: 'succeeded',
        payment_method_type: 'card', // Default for now
        receipt_url: (invoice as any).hosted_invoice_url,
      })
  }

  // Ensure profile status is active
  await supabase
    .from('profiles')
    .update({ subscription_status: 'active' })
    .eq('id', userId)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (!(invoice as any).subscription) return

  const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string)
  const userId = subscription.metadata?.lusotown_user_id
  if (!userId) return

  console.log('Payment failed for user:', userId)

  // Record failed payment
  const { data: subscriptionData } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('stripe_subscription_id', subscription.id)
    .single()

  if (subscriptionData) {
    await supabase
      .from('subscription_payments')
      .insert({
        subscription_id: subscriptionData.id,
        stripe_payment_intent_id: (invoice as any).payment_intent as string,
        amount: ((invoice as any).amount_due || 0) / 100, // Convert from cents
        currency: ((invoice as any).currency || 'gbp').toUpperCase(),
        status: 'failed',
        payment_method_type: 'card', // Default for now
      })
  }

  // Update profile status if subscription is past due
  if (subscription.status === 'past_due') {
    await supabase
      .from('profiles')
      .update({ subscription_status: 'expired' })
      .eq('id', userId)
  }
}