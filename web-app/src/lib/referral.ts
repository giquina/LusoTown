import { supabase } from './supabase'

// Referral Types
export interface ReferralCode {
  id: string
  user_id: string
  code: string
  uses_count: number
  max_uses: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Referral {
  id: string
  referrer_id: string
  referred_id: string
  referral_code: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  completed_at: string | null
  reward_given: boolean
  created_at: string
  updated_at: string
}

export interface ReferralReward {
  id: string
  user_id: string
  referral_id: string
  reward_type: 'free_month' | 'discount' | 'credit' | 'bonus_features'
  reward_value: number
  currency: string
  is_redeemed: boolean
  redeemed_at: string | null
  expires_at: string | null
  description_en: string
  description_pt: string
  created_at: string
  updated_at: string
}

export interface ReferralCampaign {
  id: string
  name: string
  slug: string
  title_en: string
  title_pt: string
  description_en: string
  description_pt: string
  reward_referrer_type: string
  reward_referrer_value: number
  reward_referee_type: string
  reward_referee_value: number
  min_referrals_for_bonus: number
  bonus_reward_type: string
  bonus_reward_value: number
  start_date: string
  end_date: string | null
  is_active: boolean
  target_audience: string
  created_at: string
  updated_at: string
}

export interface ReferralStats {
  totalReferrals: number
  completedReferrals: number
  activeReferrals: number
  pendingReferrals: number
  totalEarnings: number
  totalFreeDays: number
  bonusUnlocked: boolean
  progressToBonus: number
  leaderboardPosition: number | null
}

export interface LeaderboardEntry {
  id: string
  first_name: string
  last_name: string
  code: string
  total_referrals: number
  completed_referrals: number
  active_referrals: number
  total_free_days: number
  last_referral_date: string | null
}

class ReferralService {
  // Get or create referral code for user
  async getUserReferralCode(userId: string): Promise<ReferralCode | null> {
    try {
      // First check if user already has a referral code
      const { data: existingCode, error: fetchError } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()

      if (existingCode && !fetchError) {
        return existingCode
      }

      // Generate new referral code
      const { data: newCodeData, error: generateError } = await supabase
        .rpc('generate_referral_code', { p_user_id: userId })

      if (generateError) {
        throw generateError
      }

      // Insert the new referral code
      const { data: insertedCode, error: insertError } = await supabase
        .from('referral_codes')
        .insert({
          user_id: userId,
          code: newCodeData,
          is_active: true
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      return insertedCode
    } catch (error) {
      console.error('Error getting/creating referral code:', error)
      return null
    }
  }

  // Get referral stats for user
  async getReferralStats(userId: string): Promise<ReferralStats | null> {
    try {
      const { data: referralCode } = await supabase
        .from('referral_codes')
        .select('code')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()

      if (!referralCode) {
        return null
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

      // Calculate total earnings
      const totalFreeDays = referrals?.reduce((total, referral) => {
        const freeMonthRewards = referral.referral_rewards.filter(
          (reward: any) => reward.reward_type === 'free_month' && reward.is_redeemed
        )
        return total + freeMonthRewards.reduce((sum: number, reward: any) => sum + reward.reward_value, 0)
      }, 0) || 0

      // Check leaderboard position
      const { data: leaderboard } = await supabase
        .from('referral_leaderboard')
        .select('*')
        .order('completed_referrals', { ascending: false })

      const leaderboardPosition = leaderboard?.findIndex(entry => entry.id === userId) ?? null
      const actualPosition = leaderboardPosition !== null && leaderboardPosition >= 0 ? leaderboardPosition + 1 : null

      return {
        totalReferrals,
        completedReferrals,
        activeReferrals,
        pendingReferrals,
        totalEarnings: totalFreeDays * 25, // Assuming £25 value per free month
        totalFreeDays,
        bonusUnlocked: completedReferrals >= 5,
        progressToBonus: Math.min(completedReferrals / 5, 1),
        leaderboardPosition: actualPosition
      }
    } catch (error) {
      console.error('Error getting referral stats:', error)
      return null
    }
  }

  // Get user's referral history
  async getReferralHistory(userId: string): Promise<any[]> {
    try {
      const { data: referralCode } = await supabase
        .from('referral_codes')
        .select('code')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single()

      if (!referralCode) {
        return []
      }

      const { data: referrals, error } = await supabase
        .from('referrals')
        .select(`
          *,
          profiles!referrals_referred_id_fkey(first_name, last_name, email),
          referral_rewards(*)
        `)
        .eq('referral_code', referralCode.code)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return referrals || []
    } catch (error) {
      console.error('Error getting referral history:', error)
      return []
    }
  }

  // Get leaderboard
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase
        .from('referral_leaderboard')
        .select('*')
        .limit(limit)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error getting leaderboard:', error)
      return []
    }
  }

  // Get active campaigns
  async getActiveCampaigns(): Promise<ReferralCampaign[]> {
    try {
      const { data, error } = await supabase
        .from('referral_campaigns')
        .select('*')
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error getting active campaigns:', error)
      return []
    }
  }

  // Create referral when user signs up with code
  async createReferral(referralCode: string, newUserId: string): Promise<boolean> {
    try {
      // Get the referral code details
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('user_id')
        .eq('code', referralCode)
        .eq('is_active', true)
        .single()

      if (codeError || !codeData) {
        console.error('Invalid referral code:', referralCode)
        return false
      }

      // Create the referral relationship
      const { error: insertError } = await supabase
        .from('referrals')
        .insert({
          referrer_id: codeData.user_id,
          referred_id: newUserId,
          referral_code: referralCode,
          status: 'pending'
        })

      if (insertError) {
        console.error('Error creating referral:', insertError)
        return false
      }

      return true
    } catch (error) {
      console.error('Error creating referral:', error)
      return false
    }
  }

  // Mark referral as completed (called when user stays active for 30 days)
  async completeReferral(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('process_successful_referral', { p_referred_user_id: userId })

      if (error) {
        throw error
      }

      return data || false
    } catch (error) {
      console.error('Error completing referral:', error)
      return false
    }
  }

  // Generate share links and messages
  generateShareData(code: string, language: 'en' | 'pt' = 'en') {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lusotown.com'
    const referralUrl = `${baseUrl}/signup?ref=${code}`
    
    const messages = {
      en: {
        whatsapp: `Join me on LusoTown - the Portuguese community platform in London! Use my code ${code} and get 25% off your first month. Perfect for connecting with Portuguese speakers. ${referralUrl}`,
        email: {
          subject: 'Join the Portuguese Community in London - LusoTown',
          body: `Hi!\n\nI wanted to invite you to join LusoTown, the Portuguese community platform I've been using in London. It's been amazing for connecting with other Portuguese speakers, finding cultural events, and accessing Portuguese-speaking services.\n\nUse my referral code ${code} when you sign up and you'll get 25% off your first month!\n\nJoin here: ${referralUrl}\n\nLooking forward to seeing you in the community!\n\nBest regards`
        },
        generic: `Join LusoTown - London's Portuguese community platform! Use code ${code} for 25% off. Connect with Portuguese speakers, discover cultural events, and access Portuguese services. ${referralUrl}`
      },
      pt: {
        whatsapp: `Junte-se a mim no LusoTown - a plataforma da comunidade portuguesa em Londres! Use o meu código ${code} e ganhe 25% de desconto no primeiro mês. Perfeito para conectar com falantes de português. ${referralUrl}`,
        email: {
          subject: 'Junte-se à Comunidade Portuguesa em Londres - LusoTown',
          body: `Olá!\n\nQueria convidá-lo a juntar-se ao LusoTown, a plataforma da comunidade portuguesa que tenho usado em Londres. Tem sido fantástico para conectar com outros falantes de português, encontrar eventos culturais e aceder a serviços em português.\n\nUse o meu código de indicação ${code} quando se inscrever e terá 25% de desconto no primeiro mês!\n\nJunte-se aqui: ${referralUrl}\n\nEspero vê-lo na comunidade!\n\nCumprimentos`
        },
        generic: `Junte-se ao LusoTown - a plataforma da comunidade portuguesa de Londres! Use o código ${code} para 25% de desconto. Conecte-se com falantes de português, descubra eventos culturais e aceda a serviços portugueses. ${referralUrl}`
      }
    }

    return {
      url: referralUrl,
      code,
      messages: messages[language],
      socialUrls: {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(messages[language].whatsapp)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`,
        instagram: referralUrl, // Instagram doesn't support direct sharing, so just provide the URL
        email: `mailto:?subject=${encodeURIComponent(messages[language].email.subject)}&body=${encodeURIComponent(messages[language].email.body)}`
      }
    }
  }

  // Get user's pending rewards
  async getPendingRewards(userId: string): Promise<ReferralReward[]> {
    try {
      const { data, error } = await supabase
        .from('referral_rewards')
        .select('*')
        .eq('user_id', userId)
        .eq('is_redeemed', false)
        .gt('expires_at', new Date().toISOString())

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error getting pending rewards:', error)
      return []
    }
  }

  // Redeem a reward
  async redeemReward(rewardId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('referral_rewards')
        .update({
          is_redeemed: true,
          redeemed_at: new Date().toISOString()
        })
        .eq('id', rewardId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error redeeming reward:', error)
      return false
    }
  }
}

export const referralService = new ReferralService()