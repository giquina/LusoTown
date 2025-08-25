import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET /api/emotes - Get Lusophone emotes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') || 'pt'
    const region = searchParams.get('region') // 'brazil', 'portugal', 'africa', 'diaspora'
    const category = searchParams.get('category') // 'emotion', 'culture', 'food', 'sports', 'music', 'celebration'
    const premium_only = searchParams.get('premium_only') === 'true'
    const include_usage = searchParams.get('include_usage') === 'true'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Check user subscription for premium emotes
    const { data: { user } } = await supabase.auth.getUser()
    let hasPremiuAccess = false

    if (user) {
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('membership_tier')
        .eq('id', user.id)
        .single()

      hasPremiuAccess = userProfile?.membership_tier === 'premium' || userProfile?.membership_tier === 'core'
    }

    let query = supabase
      .from('portuguese_emotes')
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false })

    // Filter by region if specified
    if (region && region !== 'all') {
      query = query.contains('regions', [region])
    }

    // Filter by category if specified
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Filter premium emotes based on access
    if (premium_only) {
      if (!hasPremiuAccess) {
        return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 })
      }
      query = query.eq('is_premium', true)
    } else if (!hasPremiuAccess) {
      // Only show free emotes for non-premium users
      query = query.eq('is_premium', false)
    }

    const { data: emotes, error } = await query

    if (error) {
      console.error('Error fetching emotes:', error)
      return NextResponse.json({ error: 'Failed to fetch emotes' }, { status: 500 })
    }

    // Format emotes based on language preference
    const formattedEmotes = (emotes || []).map(emote => ({
      id: emote.id,
      code: emote.code,
      name: language === 'pt' ? emote.name_pt : emote.name_en,
      imageUrl: emote.image_url,
      culturalContext: emote.cultural_context,
      regions: emote.regions,
      category: emote.category,
      isPremium: emote.is_premium,
      usageCount: include_usage ? emote.usage_count : undefined,
      hasAccess: !emote.is_premium || hasPremiuAccess
    }))

    // Group by category for easier UI consumption
    const categorizedEmotes = formattedEmotes.reduce((acc: any, emote) => {
      if (!acc[emote.category]) {
        acc[emote.category] = []
      }
      acc[emote.category].push(emote)
      return acc
    }, {})

    return NextResponse.json({
      emotes: formattedEmotes,
      categorized: categorizedEmotes,
      total: formattedEmotes.length,
      filters: {
        language,
        region,
        category,
        premiumOnly: premium_only
      },
      userAccess: {
        hasPremium: hasPremiuAccess,
        canUsePremiumEmotes: hasPremiuAccess
      }
    })
  } catch (error) {
    console.error('Error in GET /api/emotes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/emotes/use - Track emote usage
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const data = await request.json()
    const { emoteId, context } = data

    if (!emoteId) {
      return NextResponse.json({ error: 'Emote ID is required' }, { status: 400 })
    }

    // Get emote details
    const { data: emote, error: emoteError } = await supabase
      .from('portuguese_emotes')
      .select('*')
      .eq('id', emoteId)
      .single()

    if (emoteError || !emote) {
      return NextResponse.json({ error: 'Emote not found' }, { status: 404 })
    }

    // Check if user has access to premium emotes
    if (emote.is_premium) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: 'Authentication required for premium emotes' }, { status: 401 })
      }

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('membership_tier')
        .eq('id', user.id)
        .single()

      const hasAccess = userProfile?.membership_tier === 'premium' || userProfile?.membership_tier === 'core'
      if (!hasAccess) {
        return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 })
      }
    }

    // Increment usage count
    const { error: updateError } = await supabase
      .from('portuguese_emotes')
      .update({ usage_count: emote.usage_count + 1 })
      .eq('id', emoteId)

    if (updateError) {
      console.error('Error updating emote usage:', updateError)
      // Don't fail the request for this, just log it
    }

    return NextResponse.json({
      success: true,
      emote: {
        id: emote.id,
        code: emote.code,
        usageCount: emote.usage_count + 1
      },
      context: context
    })
  } catch (error) {
    console.error('Error in POST /api/emotes/use:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}