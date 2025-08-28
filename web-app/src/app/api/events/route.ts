import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

// GET /api/events - Portuguese cultural events discovery
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region'); // Portuguese region focus
    const language = searchParams.get('language') || 'pt';
    const location = searchParams.get('location'); // London area
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    let query = supabase
      .from('portuguese_events')
      .select(`
        id,
        title,
        description,
        cultural_category,
        location_pt,
        location_en,
        coordinates,
        event_date,
        event_time,
        price_range,
        max_participants,
        current_participants,
        organizer:profiles!organizer_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        ),
        portuguese_region,
        community_tags,
        cultural_significance,
        language_requirements,
        accessibility_features,
        is_free,
        requires_booking,
        booking_deadline,
        contact_info,
        created_at
      `)
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString().split('T')[0]) // Only future events
      .order('event_date', { ascending: true })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category) {
      query = query.eq('cultural_category', category);
    }

    if (region && region !== 'all') {
      query = query.contains('portuguese_region', [region]);
    }

    if (location && location !== 'all') {
      query = query.eq('london_area', location);
    }

    if (dateFrom) {
      query = query.gte('event_date', dateFrom);
    }

    if (dateTo) {
      query = query.lte('event_date', dateTo);
    }

    const { data: events, error, count } = await query;

    if (error) {
      logger.error('Failed to fetch Portuguese events', error, {
        area: 'events',
        action: 'fetch_events',
        culturalContext: 'portuguese',
        filters: { category, region, location, language }
      });
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('portuguese_events')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .gte('event_date', new Date().toISOString().split('T')[0]);

    // Transform events for bilingual display
    const transformedEvents = (events || []).map(event => ({
      ...event,
      titleDisplay: language === 'pt' ? event.title.pt || event.title.en : event.title.en || event.title.pt,
      descriptionDisplay: language === 'pt' ? event.description.pt || event.description.en : event.description.en || event.description.pt,
      locationDisplay: language === 'pt' ? event.location_pt || event.location_en : event.location_en || event.location_pt,
      spotsAvailable: event.max_participants ? event.max_participants - event.current_participants : null,
      isFullyBooked: event.max_participants && event.current_participants >= event.max_participants
    }));

    return NextResponse.json({
      events: transformedEvents,
      total: totalCount || 0,
      hasNext: offset + limit < (totalCount || 0),
      filters: {
        category,
        region,
        location,
        language,
        dateFrom,
        dateTo
      },
      culturalContext: 'portuguese-speaking-community'
    });

  } catch (error) {
    logger.error('Events API GET error', error, {
      area: 'events',
      action: 'events_api_get',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/events - Create new Portuguese cultural event
export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.cultural_category || !data.event_date) {
      return NextResponse.json({ 
        error: 'Title, description, cultural category, and event date are required' 
      }, { status: 400 });
    }

    // Validate cultural category
    const validCategories = [
      'fado', 'folklore', 'cuisine', 'festival', 'language', 
      'business', 'networking', 'sports', 'literature', 'arts'
    ];
    
    if (!validCategories.includes(data.cultural_category)) {
      return NextResponse.json({ 
        error: 'Invalid cultural category' 
      }, { status: 400 });
    }

    // Create bilingual event
    const eventData = {
      organizer_id: user.id,
      title: {
        en: data.title.en || data.title,
        pt: data.title.pt || data.title
      },
      description: {
        en: data.description.en || data.description,
        pt: data.description.pt || data.description
      },
      cultural_category: data.cultural_category,
      location_pt: data.location_pt,
      location_en: data.location_en,
      coordinates: data.coordinates,
      event_date: data.event_date,
      event_time: data.event_time,
      price_range: data.price_range || 'free',
      max_participants: data.max_participants,
      portuguese_region: data.portuguese_region || [],
      community_tags: data.community_tags || [],
      cultural_significance: data.cultural_significance,
      language_requirements: data.language_requirements || ['portuguese', 'english'],
      accessibility_features: data.accessibility_features || [],
      is_free: data.is_free || data.price_range === 'free',
      requires_booking: data.requires_booking || false,
      booking_deadline: data.booking_deadline,
      contact_info: {
        email: data.contact_info?.email || user.email,
        phone: data.contact_info?.phone,
        whatsapp: data.contact_info?.whatsapp,
        preferred_language: data.contact_info?.preferred_language || 'pt'
      },
      is_active: true,
      london_area: determineLondonArea(data.location_en || data.location_pt)
    };

    const { data: newEvent, error: createError } = await supabase
      .from('portuguese_events')
      .insert(eventData)
      .select(`
        *,
        organizer:profiles!organizer_id(
          id,
          first_name,
          last_name,
          profile_picture_url
        )
      `)
      .single();

    if (createError) {
      logger.error('Portuguese event creation failed', createError, {
        area: 'events',
        action: 'create_event',
        culturalContext: 'portuguese',
        userId: user.id,
        eventCategory: data.cultural_category
      });
      return NextResponse.json({ 
        error: 'Failed to create event' 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: 'Portuguese cultural event created successfully'
    }, { status: 201 });

  } catch (error) {
    logger.error('Events API POST error', error, {
      area: 'events',
      action: 'events_api_post',
      culturalContext: 'portuguese'
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to determine London area from location
function determineLondonArea(location: string): string {
  if (!location) return 'central_london';
  
  const locationLower = location.toLowerCase();
  
  // Simple area mapping based on common London area names
  if (locationLower.includes('shoreditch') || locationLower.includes('hackney') || locationLower.includes('bethnal green')) {
    return 'east_london';
  }
  if (locationLower.includes('stockwell') || locationLower.includes('brixton') || locationLower.includes('elephant')) {
    return 'south_london';
  }
  if (locationLower.includes('camden') || locationLower.includes('islington') || locationLower.includes('kings cross')) {
    return 'north_london';
  }
  if (locationLower.includes('notting hill') || locationLower.includes('paddington') || locationLower.includes('hammersmith')) {
    return 'west_london';
  }
  
  return 'central_london';
}