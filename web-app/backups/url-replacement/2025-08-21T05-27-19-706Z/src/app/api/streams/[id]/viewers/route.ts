import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET /api/streams/[id]/viewers - Get viewer sessions for a stream
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const include_analytics = searchParams.get('analytics') === 'true'
    
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    // Check if stream exists and if user can access viewer data
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('user_id, viewer_count, total_viewers, peak_viewers')
      .eq('id', params.id)
      .single()

    if (streamError || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    // Basic viewer count is public, detailed analytics only for stream owner
    const isStreamOwner = user && stream.user_id === user.id

    if (include_analytics && !isStreamOwner) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    let response: any = {
      streamId: params.id,
      currentViewers: stream.viewer_count,
      totalViewers: stream.total_viewers,
      peakViewers: stream.peak_viewers
    }

    if (include_analytics && isStreamOwner) {
      // Get detailed viewer sessions
      const { data: viewerSessions, error: sessionsError } = await supabase
        .from('viewer_sessions')
        .select(`
          id,
          user_id,
          joined_at,
          left_at,
          total_watch_time,
          chat_messages_sent,
          country,
          region,
          city,
          profiles:user_id (
            first_name,
            last_name,
            profile_picture_url
          )
        `)
        .eq('stream_id', params.id)
        .order('joined_at', { ascending: false })

      if (sessionsError) {
        console.error('Error fetching viewer sessions:', sessionsError)
      } else {
        response.viewerSessions = viewerSessions || []
      }

      // Get geographic breakdown
      const { data: geoData, error: geoError } = await supabase
        .from('viewer_sessions')
        .select('country, region, city')
        .eq('stream_id', params.id)
        .not('country', 'is', null)

      if (!geoError && geoData) {
        const countries = geoData.reduce((acc: any, session) => {
          const country = session.country || 'Unknown'
          acc[country] = (acc[country] || 0) + 1
          return acc
        }, {})

        const regions = geoData.reduce((acc: any, session) => {
          const region = session.region || 'Unknown'
          acc[region] = (acc[region] || 0) + 1
          return acc
        }, {})

        response.analytics = {
          geographic: {
            countries: Object.entries(countries).map(([country, count]) => ({ country, count })),
            regions: Object.entries(regions).map(([region, count]) => ({ region, count }))
          },
          engagement: {
            averageWatchTime: geoData.length > 0 
              ? Math.round(geoData.reduce((sum, s) => sum + (s as any).total_watch_time || 0, 0) / geoData.length)
              : 0,
            totalChatMessages: geoData.reduce((sum, s) => sum + (s as any).chat_messages_sent || 0, 0)
          }
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in GET /api/streams/[id]/viewers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/streams/[id]/viewers - Join stream as viewer
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user (optional for anonymous viewing)
    const { data: { user } } = await supabase.auth.getUser()

    const data = await request.json()
    const { sessionToken, userAgent, ipAddress } = data

    // Check if stream exists and is viewable
    const { data: stream, error: streamError } = await supabase
      .from('streams')
      .select('id, status, is_premium, require_subscription, max_viewers, viewer_count')
      .eq('id', params.id)
      .single()

    if (streamError || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    if (stream.status !== 'live') {
      return NextResponse.json({ error: 'Stream is not live' }, { status: 400 })
    }

    // Check premium access
    if (stream.is_premium || stream.require_subscription) {
      if (!user) {
        return NextResponse.json({ error: 'Authentication required for premium content' }, { status: 401 })
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

    // Check viewer limit
    if (stream.max_viewers && stream.viewer_count >= stream.max_viewers) {
      return NextResponse.json({ error: 'Stream has reached maximum viewer capacity' }, { status: 429 })
    }

    // Create viewer session
    const sessionData = {
      stream_id: params.id,
      user_id: user?.id || null,
      session_token: sessionToken,
      user_agent: userAgent,
      ip_address: ipAddress,
      // Geographic data would be populated by a separate service
      country: null,
      region: null,
      city: null
    }

    const { data: viewerSession, error: sessionError } = await supabase
      .from('viewer_sessions')
      .insert(sessionData)
      .select()
      .single()

    if (sessionError) {
      console.error('Error creating viewer session:', sessionError)
      return NextResponse.json({ error: 'Failed to join stream' }, { status: 500 })
    }

    return NextResponse.json({
      sessionId: viewerSession.id,
      sessionToken: viewerSession.session_token,
      joinedAt: viewerSession.joined_at,
      message: 'Successfully joined stream'
    }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/streams/[id]/viewers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/streams/[id]/viewers/[sessionId] - Update viewer session (e.g., leave stream)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const data = await request.json()
    const { sessionToken, watchTime, chatMessagesSent, action } = data

    if (action === 'leave') {
      // Update viewer session with leave time and final stats
      const { error: updateError } = await supabase
        .from('viewer_sessions')
        .update({
          left_at: new Date().toISOString(),
          total_watch_time: watchTime || 0,
          chat_messages_sent: chatMessagesSent || 0
        })
        .eq('stream_id', params.id)
        .eq('session_token', sessionToken)

      if (updateError) {
        console.error('Error updating viewer session:', updateError)
        return NextResponse.json({ error: 'Failed to leave stream' }, { status: 500 })
      }

      return NextResponse.json({ message: 'Successfully left stream' })
    }

    // For other actions (like updating watch time during stream)
    const { error: updateError } = await supabase
      .from('viewer_sessions')
      .update({
        total_watch_time: watchTime || 0,
        chat_messages_sent: chatMessagesSent || 0
      })
      .eq('stream_id', params.id)
      .eq('session_token', sessionToken)

    if (updateError) {
      console.error('Error updating viewer session:', updateError)
      return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Session updated successfully' })
  } catch (error) {
    console.error('Error in PUT /api/streams/[id]/viewers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}