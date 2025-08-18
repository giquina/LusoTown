import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

// Always dynamic; this route depends on authenticated user request
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Get user's referral code
  const { data: referralCode } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (!referralCode) {
      return NextResponse.json({
        totalReferrals: 0,
        completedReferrals: 0,
        activeReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        totalFreeDays: 0,
        bonusUnlocked: false,
        progressToBonus: 0,
        leaderboardPosition: null
      })
    }

    // Get referral statistics
  const { data: referrals } = await supabase
      .from('referrals')
      .select(`
        id,
        status,
        created_at,
        referral_rewards!inner(reward_type, reward_value, is_redeemed)
      `)
      .eq('referral_code', referralCode.code)

    const totalReferrals = referrals?.length || 0
    const completedReferrals = referrals?.filter(r => r.status === 'completed').length || 0
    const activeReferrals = referrals?.filter(r => r.status === 'active').length || 0
    const pendingReferrals = referrals?.filter(r => r.status === 'pending').length || 0

    // Calculate total free days from rewards
    const totalFreeDays = referrals?.reduce((total, referral) => {
      const freeMonthRewards = referral.referral_rewards.filter(
        (reward: any) => reward.reward_type === 'free_month' && reward.is_redeemed
      )
      return total + freeMonthRewards.reduce((sum: number, reward: any) => sum + reward.reward_value, 0)
    }, 0) || 0

    // Get leaderboard position
  const { data: leaderboard } = await supabase
      .from('referral_leaderboard')
      .select('id, completed_referrals')
      .order('completed_referrals', { ascending: false })

    const leaderboardPosition = leaderboard?.findIndex(entry => entry.id === user.id) ?? -1
    const actualPosition = leaderboardPosition >= 0 ? leaderboardPosition + 1 : null

    return NextResponse.json({
      totalReferrals,
      completedReferrals,
      activeReferrals,
      pendingReferrals,
      totalEarnings: totalFreeDays * 19.99, // £19.99 value per free month
      totalFreeDays,
      bonusUnlocked: completedReferrals >= 5,
      progressToBonus: Math.min(completedReferrals / 5, 1),
      leaderboardPosition: actualPosition
    })

  } catch (error) {
    console.error('Error in referral stats API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}