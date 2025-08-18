import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// This endpoint is called by a background job to complete referrals after 30 days of user activity
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source (you should add proper authentication)
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REFERRAL_COMPLETION_TOKEN
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Check if user has been active for 30+ days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('created_at')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user was created more than 30 days ago
    if (new Date(user.created_at) > new Date(thirtyDaysAgo)) {
      return NextResponse.json({ 
        success: false, 
        message: 'User has not been active for 30 days yet' 
      })
    }

    // Call the database function to process the successful referral
    const { data: result, error: completionError } = await supabase
      .rpc('process_successful_referral', { p_referred_user_id: userId })

    if (completionError) {
      console.error('Error completing referral:', completionError)
      return NextResponse.json({ error: 'Failed to complete referral' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      completed: result,
      message: result ? 'Referral completed successfully' : 'No pending referral found'
    })

  } catch (error) {
    console.error('Error in complete referral API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Batch completion endpoint for processing multiple users
export async function PUT(request: NextRequest) {
  try {
    // Verify the request is from a trusted source
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.REFERRAL_COMPLETION_TOKEN
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all users who signed up 30+ days ago with pending referrals
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    const { data: pendingReferrals, error: fetchError } = await supabase
      .from('referrals')
      .select(`
        id,
        referred_id,
        profiles!referrals_referred_id_fkey(created_at)
      `)
      .eq('status', 'pending')
      .lte('profiles.created_at', thirtyDaysAgo)

    if (fetchError) {
      console.error('Error fetching pending referrals:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch pending referrals' }, { status: 500 })
    }

    let completedCount = 0
    const errors: string[] = []

    // Process each pending referral
    for (const referral of pendingReferrals || []) {
      try {
        const { data: result, error: completionError } = await supabase
          .rpc('process_successful_referral', { p_referred_user_id: referral.referred_id })

        if (completionError) {
          errors.push(`Failed to complete referral for user ${referral.referred_id}: ${completionError.message}`)
        } else if (result) {
          completedCount++
        }
      } catch (error) {
        errors.push(`Error processing referral for user ${referral.referred_id}: ${error}`)
      }
    }

    return NextResponse.json({ 
      success: true,
      processed: pendingReferrals?.length || 0,
      completed: completedCount,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Error in batch complete referrals API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}