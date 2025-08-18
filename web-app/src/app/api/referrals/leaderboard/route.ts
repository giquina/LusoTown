import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // Get leaderboard data
    const { data: leaderboard, error } = await supabase
      .from('referral_leaderboard')
      .select('*')
      .limit(Math.min(limit, 50)) // Max 50 entries

    if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      leaderboard: leaderboard || [] 
    })

  } catch (error) {
    console.error('Error in leaderboard API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}