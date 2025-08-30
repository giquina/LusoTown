import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Portuguese Community Streaming Room Creation API
 * Creates streaming rooms with Portuguese cultural context
 */

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required to create Portuguese community streams' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      category = 'general',
      subcategory,
      isPrivate = false,
      maxParticipants = 100,
      scheduledFor,
      tags = [],
      language = 'pt'
    } = body

    // Validation
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required for Portuguese community streams' },
        { status: 400 }
      )
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile required for Portuguese community streaming' },
        { status: 400 }
      )
    }

    // Generate unique room name
    const roomName = `lusotown_${category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create streaming room record
    const { data: streamRoom, error: createError } = await supabase
      .from('streaming_rooms')
      .insert({
        room_name: roomName,
        creator_id: user.id,
        title,
        description,
        category,
        subcategory,
        is_private: isPrivate,
        max_participants: maxParticipants,
        scheduled_for: scheduledFor || new Date().toISOString(),
        tags,
        language,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        metadata: {
          cultural: category !== 'general',
          heritage_context: profile.portuguese_heritage || 'general',
          creator_name: `${profile.first_name} ${profile.last_name}`.trim(),
          creator_avatar: profile.avatar_url
        }
      })
      .select()
      .single()

    if (createError) {
      console.error('❌ Database error creating stream room:', createError)
      return NextResponse.json(
        { error: 'Failed to create Portuguese community stream room' },
        { status: 500 }
      )
    }

    // Generate creator token via internal API
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/streaming/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('Cookie') || ''
      },
      body: JSON.stringify({
        roomName,
        participantName: `${profile.first_name} ${profile.last_name}`.trim() || 'Criador',
        category,
        role: 'streamer',
        metadata: {
          isCreator: true,
          roomId: streamRoom.id
        }
      })
    })

    let creatorToken = null
    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json()
      creatorToken = tokenData.token
    }

    console.log(`🎪 Created Portuguese streaming room: ${title} (${category}) by ${profile.first_name}`)

    return NextResponse.json({
      success: true,
      room: {
        id: streamRoom.id,
        roomName,
        title,
        description,
        category,
        subcategory,
        isPrivate,
        maxParticipants,
        scheduledFor: streamRoom.scheduled_for,
        tags,
        language,
        status: streamRoom.status,
        creator: {
          id: user.id,
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          avatar: profile.avatar_url,
          heritage: profile.portuguese_heritage
        },
        createdAt: streamRoom.created_at
      },
      streaming: {
        roomName,
        creatorToken,
        wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL,
        streamingServerUrl: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL
      }
    })

  } catch (error) {
    console.error('❌ Stream room creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create Portuguese community streaming room' },
      { status: 500 }
    )
  }
}

// Get streaming rooms
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const status = searchParams.get('status') || 'active'
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = supabase
      .from('streaming_rooms')
      .select(`
        *,
        creator:profiles!creator_id(
          id,
          first_name,
          last_name,
          avatar_url,
          portuguese_heritage
        ),
        participant_count:streaming_participants(count)
      `)
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data: rooms, error } = await query

    if (error) {
      console.error('❌ Error fetching streaming rooms:', error)
      return NextResponse.json(
        { error: 'Failed to fetch Portuguese community streaming rooms' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      rooms: rooms || [],
      total: rooms?.length || 0
    })

  } catch (error) {
    console.error('❌ Error fetching streaming rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Portuguese community streaming rooms' },
      { status: 500 }
    )
  }
}