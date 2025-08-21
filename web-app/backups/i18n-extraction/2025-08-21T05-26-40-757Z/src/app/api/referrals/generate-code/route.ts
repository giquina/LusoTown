import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { authService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = authService.getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already has an active referral code
    const { data: existingCode, error: fetchError } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (existingCode && !fetchError) {
      return NextResponse.json({ 
        success: true, 
        code: existingCode.code,
        existing: true 
      })
    }

    // Generate new referral code using database function
    const { data: newCode, error: generateError } = await supabase
      .rpc('generate_referral_code', { p_user_id: user.id })

    if (generateError) {
      console.error('Error generating referral code:', generateError)
      return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })
    }

    // Insert the new referral code
    const { data: insertedCode, error: insertError } = await supabase
      .from('referral_codes')
      .insert({
        user_id: user.id,
        code: newCode,
        is_active: true
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting referral code:', insertError)
      return NextResponse.json({ error: 'Failed to save code' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      code: insertedCode.code,
      existing: false 
    })

  } catch (error) {
    console.error('Error in generate-code API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}