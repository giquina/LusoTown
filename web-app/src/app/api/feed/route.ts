import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import logger from '@/utils/logger'

export const dynamic = 'force-dynamic'

// GET /api/feed - Portuguese community activity feed (simple community updates)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const type = searchParams.get('type') || 'all' // events, businesses, community
    
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies })

    // Get community activities and updates
    let activities: any[] = []

    // Get recent Portuguese events
    if (type === 'all' || type === 'events') {
      const { data: events } = await supabase
        .from('portuguese_events')
        .select(`
          id,
          title,
          event_date,
          location_pt,
          location_en,
          cultural_category,
          organizer:profiles!organizer_id(first_name, last_name),
          created_at
        `)
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false })
        .limit(5)

      const eventActivities = (events || []).map(event => ({
        id: `event-${event.id}`,
        type: 'event',
        title: event.title.en || event.title.pt,
        description: `New Portuguese cultural event: ${event.cultural_category}`,
        location: event.location_en || event.location_pt,
        date: event.event_date,
        organizer: event.organizer && Array.isArray(event.organizer) && event.organizer[0] 
          ? `${event.organizer[0].first_name} ${event.organizer[0].last_name}`
          : 'Unknown Organizer',
        created_at: event.created_at,
        category: event.cultural_category
      }))
      activities.push(...eventActivities)
    }

    // Get new Portuguese businesses
    if (type === 'all' || type === 'businesses') {
      const { data: businesses } = await supabase
        .from('portuguese_businesses')
        .select('id, name, category, address, is_verified, created_at')
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(3)

      const businessActivities = (businesses || []).map(business => ({
        id: `business-${business.id}`,
        type: 'business',
        title: business.name,
        description: `New verified Portuguese business: ${business.category}`,
        location: business.address,
        category: business.category,
        created_at: business.created_at
      }))
      activities.push(...businessActivities)
    }

    // Get community milestones
    if (type === 'all' || type === 'community') {
      const { count: memberCount } = await supabase
        .from('portuguese_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('community_guidelines_accepted', true)

      // Add community milestone if member count is at certain thresholds
      if (memberCount && memberCount % 100 === 0) {
        activities.push({
          id: `milestone-${memberCount}`,
          type: 'community',
          title: 'Community Milestone',
          description: `Portuguese-speaking community has reached ${memberCount} members!`,
          created_at: new Date().toISOString(),
          milestone: memberCount
        })
      }
    }

    // Sort by creation date and paginate
    const sortedActivities = activities
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(offset, offset + limit)

    return NextResponse.json({
      activities: sortedActivities,
      total: activities.length,
      hasNext: offset + limit < activities.length,
      filters: { type },
      culturalContext: 'portuguese-speaking-community',
      community_info: {
        focus: 'Community events, businesses, and cultural activities',
        languages: ['Portuguese', 'English'],
        regions_served: 'All Portuguese-speaking nations represented'
      }
    })

  } catch (error) {
    logger.error('Community feed API error', error, {
      area: 'community',
      action: 'fetch_feed',
      culturalContext: 'portuguese'
    })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Community activity feed is read-only - no user posting functionality
// Events, businesses, and community updates are managed through their respective APIs