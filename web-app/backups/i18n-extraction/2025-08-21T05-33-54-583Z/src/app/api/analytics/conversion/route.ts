import { NextRequest, NextResponse } from 'next/server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      event, 
      trigger, 
      language, 
      timestamp,
      contextData = {}
    } = body

    // Store conversion event in database
    const { error } = await supabase
      .from('conversion_events')
      .insert({
        user_id: user.id,
        event_type: event,
        trigger_type: trigger,
        language: language,
        context_data: contextData,
        created_at: timestamp || new Date().toISOString()
      })

    if (error) {
      console.error('Error storing conversion event:', error)
      return NextResponse.json({ error: 'Failed to track event' }, { status: 500 })
    }

    // Additional analytics tracking can be added here
    // (Google Analytics, Mixpanel, etc.)

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Conversion tracking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30d'
    const eventType = searchParams.get('event_type')

    let query = supabase
      .from('conversion_events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    // Add date filter
    const now = new Date()
    let startDate = new Date()
    
    switch (timeframe) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
    }

    query = query.gte('created_at', startDate.toISOString())

    if (eventType) {
      query = query.eq('event_type', eventType)
    }

    const { data: events, error } = await query

    if (error) {
      console.error('Error fetching conversion events:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    // Aggregate data for analysis
    const aggregatedData = {
      totalEvents: events?.length || 0,
      eventsByType: {},
      eventsByTrigger: {},
      conversionRate: 0
    }

    events?.forEach(event => {
      // Count by event type
      if (!aggregatedData.eventsByType[event.event_type]) {
        aggregatedData.eventsByType[event.event_type] = 0
      }
      aggregatedData.eventsByType[event.event_type]++

      // Count by trigger type
      if (!aggregatedData.eventsByTrigger[event.trigger_type]) {
        aggregatedData.eventsByTrigger[event.trigger_type] = 0
      }
      aggregatedData.eventsByTrigger[event.trigger_type]++
    })

    // Calculate conversion rate (upgrade clicks vs prompt shows)
    const promptShows = aggregatedData.eventsByType['upgrade_prompt_shown'] || 0
    const upgradeClicks = aggregatedData.eventsByType['upgrade_clicked'] || 0
    
    if (promptShows > 0) {
      aggregatedData.conversionRate = (upgradeClicks / promptShows) * 100
    }

    return NextResponse.json({
      success: true,
      data: aggregatedData,
      events: events?.slice(0, 50) // Return last 50 events for detailed view
    })
    
  } catch (error) {
    console.error('Conversion analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}