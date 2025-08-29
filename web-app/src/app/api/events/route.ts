import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getPortugueseApiMiddleware } from '@/lib/api-middleware';
import logger from '@/utils/logger';

export const dynamic = 'force-dynamic';

// Optimized Portuguese Events API with Connection Pooling and Caching
const apiMiddleware = getPortugueseApiMiddleware();

export const GET = apiMiddleware.withOptimizations(
  async (context, request) => {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const region = searchParams.get('region');
    const language = searchParams.get('language') || 'pt';
    const location = searchParams.get('location');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Extract location for geospatial filtering
    const lat = parseFloat(searchParams.get('latitude') || '0');
    const lon = parseFloat(searchParams.get('longitude') || '0');
    
    // Build filters for the middleware
    const filters = {
      category,
      region,
      userLocation: lat && lon ? { lat, lng: lon } : undefined,
      dateFrom,
      dateTo,
      limit,
      offset
    };

    try {
      // Use optimized events handler
      const result = await apiMiddleware.getPortugueseEvents(context, filters);
      
      // Transform events for bilingual display
      const transformedEvents = result.data.events.map(event => ({
        ...event,
        titleDisplay: language === 'pt' ? event.title?.pt || event.title?.en || event.title : event.title?.en || event.title?.pt || event.title,
        descriptionDisplay: language === 'pt' ? event.description?.pt || event.description?.en || event.description : event.description?.en || event.description?.pt || event.description,
        locationDisplay: language === 'pt' ? event.location_pt || event.location_en : event.location_en || event.location_pt,
      }));

      logger.info('Portuguese events fetched successfully', {
        area: 'events',
        action: 'fetch_events',
        culturalContext: 'portuguese',
        results_count: transformedEvents.length,
        cached: result.cached,
        execution_time: result.executionTime,
        filters
      });

      return {
        data: {
          events: transformedEvents,
          total: result.data.total,
          hasNext: offset + limit < result.data.total,
          filters: {
            category,
            region,
            location,
            language,
            dateFrom,
            dateTo
          },
          cultural_context: 'portuguese-speaking-community',
          performance: {
            cached: result.cached,
            execution_time: result.executionTime,
            cache_hit_ratio: result.cacheHitRatio
          }
        },
        cached: result.cached,
        executionTime: result.executionTime,
        queryCount: result.queryCount,
        cacheHitRatio: result.cacheHitRatio
      };
    } catch (error) {
      logger.error('Events API error', error, {
        area: 'events',
        action: 'events_api_get',
        culturalContext: 'portuguese',
        filters
      });
      throw error;
    }
  },
  {
    enableCaching: true,
    enableQueryOptimization: true,
    enablePerformanceMonitoring: true,
    cacheTTL: 300, // 5 minutes for events (more dynamic content)
    rateLimit: {
      endpoint: 'events',
      maxRequests: 100,
      windowMs: 60000 // 1 minute
    }
  }
);

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