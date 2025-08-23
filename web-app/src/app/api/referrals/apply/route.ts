import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { authService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { referralCode } = await request.json()

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code is required' }, { status: 400 })
    }

    // Get current user
    const user = authService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if referral code exists and is valid
    const { data: codeData, error: codeError } = await supabase
      .from('referral_codes')
      .select('user_id, code')
      .eq('code', referralCode.toUpperCase())
      .eq('is_active', true)
      .single()

    if (codeError || !codeData) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
    }

    // Check if user is trying to refer themselves
    if (codeData.user_id === user.id) {
      return NextResponse.json({ error: 'Cannot refer yourself' }, { status: 400 })
    }

    // Check if user has already been referred
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('id')
      .eq('referred_id', user.id)
      .single()

    if (existingReferral) {
      return NextResponse.json({ error: 'User has already been referred' }, { status: 400 })
    }

    // Create the referral relationship
    const { data: newReferral, error: insertError } = await supabase
      .from('referrals')
      .insert({
        referrer_id: codeData.user_id,
        referred_id: user.id,
        referral_code: codeData.code,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating referral:', insertError)
      return NextResponse.json({ error: 'Failed to apply referral' }, { status: 500 })
    }

    // Give welcome reward to the new user (discount)
    const { error: rewardError } = await supabase
      .from('referral_rewards')
      .insert({
        user_id: user.id,
        referral_id: newReferral.id,
        reward_type: 'discount',
        reward_value: 25, // 25% discount
        description_en: 'Welcome discount for joining Portuguese-speaking community',
        description_pt: 'Desconto de boas-vindas por se juntar à comunidade de falantes de português',
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days
      })

    if (rewardError) {
      console.error('Error creating welcome reward:', rewardError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Referral applied successfully',
      discount: 25 // 25% welcome discount
    })

  } catch (error) {
    console.error('Error in apply referral API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}