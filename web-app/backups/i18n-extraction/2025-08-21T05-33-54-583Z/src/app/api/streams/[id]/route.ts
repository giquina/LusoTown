import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET /api/streams/[id] - Get specific stream details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: stream, error } = await supabase
      .from('streams')
      .select(`
        *,
        profiles:user_id (
          id,
          first_name,
          last_name,
          profile_picture_url,
          verification_status
        ),
        stream_categories:category_id (
          id,
          name_pt,
          name_en,
          slug,
          portuguese_focused,
          cultural_context
        )
      `)
      .eq('id', params.id)
      .single()

    if (error || !stream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    // Check if user has access to premium content
    const { data: { user } } = await supabase.auth.getUser()
    let hasAccess = !stream.is_premium // Non-premium streams are always accessible

    if (stream.is_premium && user) {
      // Check user subscription status
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('membership_tier')
        .eq('id', user.id)
        .single()

      hasAccess = userProfile?.membership_tier === 'premium' || userProfile?.membership_tier === 'core'
    }

    return NextResponse.json({
      ...stream,
      hasAccess,
      viewerAccess: {
        canView: hasAccess || !stream.is_premium,
        canChat: stream.allow_chat && hasAccess,
        requiresSubscription: stream.is_premium && !hasAccess
      }
    })
  } catch (error) {
    console.error('Error in GET /api/streams/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/streams/[id] - Update stream details
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns the stream
    const { data: existingStream, error: fetchError } = await supabase
      .from('streams')
      .select('user_id')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingStream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    if (existingStream.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    
    // Prepare update data
    const updateData: any = {}
    
    if (data.title !== undefined) updateData.title = data.title.trim()
    if (data.description !== undefined) updateData.description = data.description?.trim() || null
    if (data.category_id !== undefined) updateData.category_id = data.category_id
    if (data.language !== undefined) updateData.language = data.language
    if (data.cultural_region !== undefined) updateData.cultural_region = data.cultural_region
    if (data.tags !== undefined) updateData.tags = data.tags
    if (data.is_premium !== undefined) updateData.is_premium = data.is_premium
    if (data.require_subscription !== undefined) updateData.require_subscription = data.require_subscription
    if (data.allow_chat !== undefined) updateData.allow_chat = data.allow_chat
    if (data.max_viewers !== undefined) updateData.max_viewers = data.max_viewers
    if (data.age_restriction !== undefined) updateData.age_restriction = data.age_restriction
    if (data.status !== undefined) updateData.status = data.status
    if (data.thumbnail_url !== undefined) updateData.thumbnail_url = data.thumbnail_url

    // Handle stream status changes
    if (data.status === 'live' && !data.is_live) {
      updateData.is_live = true
      updateData.started_at = new Date().toISOString()
    } else if (data.status === 'ended') {
      updateData.is_live = false
      updateData.ended_at = new Date().toISOString()
    }

    const { data: updatedStream, error: updateError } = await supabase
      .from('streams')
      .update(updateData)
      .eq('id', params.id)
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

    if (updateError) {
      console.error('Error updating stream:', updateError)
      return NextResponse.json({ error: 'Failed to update stream' }, { status: 500 })
    }

    return NextResponse.json(updatedStream)
  } catch (error) {
    console.error('Error in PUT /api/streams/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/streams/[id] - Delete stream
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns the stream
    const { data: existingStream, error: fetchError } = await supabase
      .from('streams')
      .select('user_id, status')
      .eq('id', params.id)
      .single()

    if (fetchError || !existingStream) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
    }

    if (existingStream.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Don't allow deletion of live streams
    if (existingStream.status === 'live') {
      return NextResponse.json({ 
        error: 'Cannot delete a live stream. End the stream first.' 
      }, { status: 400 })
    }

    const { error: deleteError } = await supabase
      .from('streams')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      console.error('Error deleting stream:', deleteError)
      return NextResponse.json({ error: 'Failed to delete stream' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Stream deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/streams/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}