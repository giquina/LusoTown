import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import logger from '@/utils/logger'

export const dynamic = 'force-dynamic'

// GET /api/streams - Get Portuguese cultural streams (community-focused)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const language = searchParams.get('language') || 'pt'
    const status = searchParams.get('status') || 'live'
    const cultural_region = searchParams.get('cultural_region')
    const community_only = searchParams.get('community') !== 'false' // Default to community streams only

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let query = supabase
      .from('streams')
      .select(`
        *,
        profiles:user_id (
          id,
          first_name,
          last_name,
          profile_picture_url,
          heritage_verified
        ),
        stream_categories:category_id (
          id,
          name_pt,
          name_en,
          slug,
          portuguese_focused
        )
      `)
      .eq('is_community_stream', true) // Only community streams
      .order('created_at', { ascending: false }) // Recent streams first, not viewer count
      .range(offset, offset + limit - 1)

    // Apply community-focused filters
    if (status === 'live') {
      query = query.eq('is_live', true).eq('status', 'live')
    } else if (status === 'scheduled') {
      query = query.eq('status', 'scheduled')
    } else if (status === 'ended') {
      query = query.eq('status', 'ended')
    }

    // Only Portuguese-focused categories
    if (category) {
      const { data: categoryData } = await supabase
        .from('stream_categories')
        .select('id')
        .eq('slug', category)
        .eq('portuguese_focused', true) // Only Portuguese cultural categories
        .single()
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id)
      }
    }

    if (language && language !== 'all') {
      query = query.eq('language', language)
    }

    if (cultural_region && cultural_region !== 'all') {
      query = query.eq('cultural_region', cultural_region)
    }

    // Remove premium filtering - all community streams are free

    const { data: streams, error, count } = await query

    if (error) {
      logger.error('Failed to fetch streams', error, {
        area: 'streaming',
        action: 'fetch_streams',
        culturalContext: 'portuguese',
        filters: { category, language, status, cultural_region, featured_only, premium_only }
      })
      return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 })
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('streams')
      .select('*', { count: 'exact', head: true })

    if (status === 'live') {
      countQuery = countQuery.eq('is_live', true).eq('status', 'live')
    }

    const { count: totalCount } = await countQuery

    return NextResponse.json({
      streams: streams || [],
      total: totalCount || 0,
      hasNext: offset + limit < (totalCount || 0),
      filters: {
        category,
        language,
        status,
        cultural_region,
        community_only
      },
      culturalContext: 'portuguese-speaking-community',
      streaming_info: {
        focus: 'Portuguese cultural content and community events',
        accessibility: 'All streams are free for community members',
        languages: ['Portuguese', 'English'],
        content_types: ['Cultural events', 'Language learning', 'Community discussions', 'Business talks']
      }
    })
  } catch (error) {
    logger.error('Streams API GET error', error, {
      area: 'streaming',
      action: 'streams_api_get',
      culturalContext: 'portuguese'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/streams - Create a new stream
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.category_id) {
      return NextResponse.json({ 
        error: 'Title and category are required' 
      }, { status: 400 })
    }

    // Check if user is community member in good standing
    const { data: userProfile } = await supabase
      .from('portuguese_profiles')
      .select('community_guidelines_accepted, heritage_verified')
      .eq('id', user.id)
      .single()

    if (!userProfile?.community_guidelines_accepted) {
      return NextResponse.json({ 
        error: 'Must accept community guidelines to stream cultural content' 
      }, { status: 403 })
    }

    // Create community-focused stream
    const streamData = {
      user_id: user.id,
      title: data.title.trim(),
      description: data.description?.trim() || null,
      category_id: data.category_id,
      language: data.language || 'pt',
      cultural_region: data.cultural_region || 'universal',
      tags: data.tags || [],
      is_community_stream: true, // All streams are community streams
      is_premium: false, // All community streams are free
      require_subscription: false, // No subscription required
      allow_chat: data.allow_chat !== false,
      max_viewers: 100, // Reasonable limit for community streams
      age_restriction: data.age_restriction || null,
      scheduled_at: data.scheduled_at ? new Date(data.scheduled_at).toISOString() : null,
      status: data.scheduled_at ? 'scheduled' : 'live',
      community_guidelines_compliant: true
    }

    const { data: newStream, error: createError } = await supabase
      .from('streams')
      .insert(streamData)
      .select(`
        *,
        profiles:user_id (
          id,
          first_name,
          last_name,
          profile_picture_url
        ),
        stream_categories:category_id (
          id,
          name_pt,
          name_en,
          slug
        )
      `)
      .single()

    if (createError) {
      logger.error('Stream creation failed', createError, {
        area: 'streaming',
        action: 'create_stream',
        culturalContext: 'portuguese',
        userId: user.id,
        streamTitle: data.title,
        category: data.category_id
      })
      return NextResponse.json({ 
        error: createError.message.includes('Daily stream limit exceeded') 
          ? 'Daily stream limit exceeded' 
          : 'Failed to create stream' 
      }, { status: 400 })
    }

    // Generate auth tokens for the stream
    const tokenExpiresAt = new Date()
    tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24) // 24 hour expiry

    const { error: tokenError } = await supabase
      .from('stream_auth_tokens')
      .insert([
        {
          stream_id: newStream.id,
          token: `rtmp_${newStream.stream_key}`,
          token_type: 'rtmp',
          expires_at: tokenExpiresAt.toISOString()
        },
        {
          stream_id: newStream.id,
          token: `play_${newStream.stream_key}`,
          token_type: 'playback',
          expires_at: tokenExpiresAt.toISOString()
        }
      ])

    if (tokenError) {
      logger.error('Stream auth token creation failed', tokenError, {
        area: 'streaming',
        action: 'create_auth_tokens',
        culturalContext: 'portuguese',
        userId: user.id,
        streamId: newStream.id
      })
    }

    return NextResponse.json(newStream, { status: 201 })
  } catch (error) {
    logger.error('Streams API POST error', error, {
      area: 'streaming',
      action: 'streams_api_post',
      culturalContext: 'portuguese'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}