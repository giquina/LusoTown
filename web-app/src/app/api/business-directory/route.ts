import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { withRateLimit } from '@/lib/rate-limit-middleware';
import { logRateLimitViolation, detectAndLogAbuse } from '@/lib/rate-limit-monitoring';
import logger from '@/utils/logger';
import { getApiErrorMessage, getApiLogMessage, getApiSuccessMessage } from '@/config/api-messages';
import { APIValidation, validateAPIInput, ValidationError } from '@/lib/validation/api-validation';

// Business Directory API with Portuguese Community Rate Limiting
export async function GET(request: NextRequest) {
  // Apply rate limiting for business directory access
  const rateLimitCheck = await withRateLimit(request, 'business-directory', {
    bypassForTrusted: true, // Allow trusted Portuguese community partners
  });
  
  if (!('success' in rateLimitCheck)) {
    // Rate limit exceeded - log the violation
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    logRateLimitViolation(
      clientIP,
      'business-directory',
      '/api/business-directory',
      50, // limit from config
      1, // current violation
      request.headers.get('user-agent') || undefined
    );
    
    return rateLimitCheck; // Return rate limit error response
  }

  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    
    // Validate and sanitize input parameters
    const searchData = {
      query: searchParams.get('query') || undefined,
      category: searchParams.get('category') || undefined,
      location: searchParams.get('location') || undefined,
      londonArea: searchParams.get('london_area') || undefined,
      portugueseSpecialties: searchParams.get('portuguese_specialties')?.split(',') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    // Validate input using Zod schema
    const validatedSearch = validateAPIInput(APIValidation.businessDirectory.search, searchData);
    
    // Extract Portuguese-specific query parameters
    const category = validatedSearch.category;
    const location = validatedSearch.location;
    const portugueseSpecialties = validatedSearch.portugueseSpecialties;
    const lon = parseFloat(searchParams.get('longitude') || '0');
    const lat = parseFloat(searchParams.get('latitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '5'); // 5km default
    
    let query = supabase
      .from('portuguese_businesses')
      .select(`
        id,
        name,
        category,
        description,
        address,
        postcode,
        phone,
        email,
        website,
        portuguese_origin,
        languages_supported,
        coordinates,
        opening_hours,
        rating,
        review_count,
        verified,
        cultural_specialties,
        community_favorite,
        created_at
      `)
      .eq('is_active', true)
      .eq('is_approved', true);

    // Apply Portuguese community specific filters
    if (category) {
      query = query.eq('category', category);
    }
    
    if (portugueseSpecialties) {
      query = query.contains('cultural_specialties', portugueseSpecialties);
    }

    // Apply location-based filtering using PostGIS for London area
    if (lon && lat && radius) {
      // Use PostGIS distance query for Portuguese businesses in London
      query = query.rpc('get_businesses_within_radius', {
        center_lat: lat,
        center_lon: lon,
        radius_km: radius
      });
    } else if (location) {
      // Text-based location search for Portuguese community areas
      query = query.or(`address.ilike.%${location}%,postcode.ilike.%${location}%`);
    }

    // Order by community favorites and rating
    query = query.order('community_favorite', { ascending: false })
                  .order('rating', { ascending: false })
                  .limit(50);

    const { data: businesses, error } = await query;

    if (error) {
      logger.error(getApiLogMessage('PORTUGUESE_BUSINESS_DIRECTORY_FETCH_ERROR'), error, {
        area: 'business_directory',
        action: 'fetch_businesses',
        filters: { category, location, portugueseSpecialties }
      });
      
      return NextResponse.json(
        { error: getApiErrorMessage('PORTUGUESE_BUSINESS_FETCH_FAILED') },
        { status: 500, headers: rateLimitCheck.headers }
      );
    }

    // Transform data for Portuguese community context
    const transformedBusinesses = businesses?.map(business => ({
      ...business,
      distance_km: business.distance_km ? parseFloat(business.distance_km.toFixed(2)) : null,
      cultural_context: {
        portuguese_heritage: business.portuguese_origin?.includes('portugal'),
        brazilian_heritage: business.portuguese_origin?.includes('brazil'),
        palop_heritage: business.portuguese_origin?.some((origin: string) => 
          ['angola', 'mozambique', 'cape-verde', 'guinea-bissau', 'sao-tome-principe'].includes(origin)
        ),
        lusophone_friendly: business.languages_supported?.includes('portuguese'),
        community_verified: business.verified && business.community_favorite
      }
    })) || [];

    // Log successful request for monitoring
    logger.info(getApiLogMessage('PORTUGUESE_BUSINESS_DIRECTORY_SUCCESS'), undefined, {
      area: 'business_directory',
      action: 'fetch_success',
      results_count: transformedBusinesses.length,
      filters: { category, location, portugueseSpecialties }
    });

    const response = NextResponse.json({
      businesses: transformedBusinesses,
      total: transformedBusinesses.length,
      filters: {
        category,
        location,
        portuguese_specialties: portugueseSpecialties,
        radius: radius
      },
      cultural_context: 'portuguese-speaking-community',
      location_context: 'united-kingdom'
    });

    // Add rate limit headers
    rateLimitCheck.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;

  } catch (error) {
    // Handle validation errors specifically
    if (error instanceof ValidationError) {
      logger.warn('Business directory validation error', error, {
        area: 'business_directory',
        action: 'validation_error',
        issues: error.issues
      });

      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues,
          message: getApiErrorMessage('VALIDATION_FAILED')
        },
        { status: error.statusCode }
      );
    }

    logger.error(getApiLogMessage('BUSINESS_DIRECTORY_API_ERROR'), error, {
      area: 'business_directory',
      action: 'api_error'
    });

    return NextResponse.json(
      { error: getApiErrorMessage('BUSINESS_DIRECTORY_SERVER_ERROR') },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Apply stricter rate limiting for business submissions
  const rateLimitCheck = await withRateLimit(request, 'business-directory');
  
  if (!('success' in rateLimitCheck)) {
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Detect potential abuse for business submission endpoint
    const isAbuse = detectAndLogAbuse(
      clientIP,
      '/api/business-directory',
      'business-directory',
      1,
      60000 // 1 minute window
    );
    
    if (isAbuse) {
      logger.warn(getApiLogMessage('PORTUGUESE_BUSINESS_ABUSE_DETECTED'), undefined, {
        area: 'security',
        action: 'abuse_detection',
        endpoint: 'business_directory_post',
        client_ip: `${clientIP.substring(0, 8)}***`
      });
    }

    return rateLimitCheck;
  }

  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: getApiErrorMessage('AUTHENTICATION_REQUIRED_BUSINESS') }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate business data using Zod schema
    const businessData = {
      businessName: body.name || body.businessName,
      businessNamePortuguese: body.businessNamePortuguese,
      description: body.description,
      category: body.category,
      address: body.address,
      postcode: body.postcode,
      phone: body.phone,
      email: body.email,
      website: body.website,
      ownerName: body.ownerName || body.owner_name,
      yearEstablished: parseInt(body.yearEstablished || body.year_established || new Date().getFullYear()),
      gdprConsent: body.gdprConsent || body.gdpr_consent,
      rateToken: body.rateToken,
    };

    const validatedBusiness = validateAPIInput(APIValidation.businessDirectory.create, businessData);

    // Geocode address for Portuguese business location
    let coordinates = null;
    try {
      // Simple geocoding for UK postcodes (in production, use proper geocoding service)
      const geocodeResponse = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(validatedBusiness.postcode)}`
      );
      
      if (geocodeResponse.ok) {
        const geocodeData = await geocodeResponse.json();
        coordinates = {
          type: 'Point',
          coordinates: [geocodeData.result.longitude, geocodeData.result.latitude]
        };
      }
    } catch (geocodeError) {
      logger.warn(getApiLogMessage('GEOCODING_FAILED_BUSINESS'), geocodeError, {
        area: 'business_directory',
        action: 'geocoding_failure',
        postcode: validatedBusiness.postcode
      });
    }

    // Insert Portuguese business into directory using validated data
    const { data: business, error } = await supabase
      .from('portuguese_businesses')
      .insert({
        name: validatedBusiness.businessName,
        name_portuguese: validatedBusiness.businessNamePortuguese,
        category: validatedBusiness.category,
        description: validatedBusiness.description,
        address: validatedBusiness.address,
        postcode: validatedBusiness.postcode,
        phone: validatedBusiness.phone,
        email: validatedBusiness.email,
        website: validatedBusiness.website,
        owner_name: validatedBusiness.ownerName,
        year_established: validatedBusiness.yearEstablished,
        languages_supported: ['portuguese'], // Default for Portuguese community businesses
        coordinates,
        submitted_by: user.id,
        is_active: false, // Requires approval
        is_approved: false, // Community moderation required
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      logger.error(getApiLogMessage('PORTUGUESE_BUSINESS_SUBMISSION_FAILED'), error, {
        area: 'business_directory',
        action: 'submission_failed',
        user_id: user.id
      });

      return NextResponse.json(
        { error: getApiErrorMessage('BUSINESS_SUBMISSION_FAILED_REVIEW') },
        { status: 500 }
      );
    }

    logger.info(getApiLogMessage('PORTUGUESE_BUSINESS_SUBMISSION_SUCCESS'), undefined, {
      area: 'business_directory',
      action: 'business_submitted',
      business_id: business.id,
      category: validatedBusiness.category,
      user_id: user.id
    });

    const response = NextResponse.json({
      success: true,
      business,
      message: 'Portuguese business submitted successfully for community review',
      next_steps: [
        getApiSuccessMessage('BUSINESS_REVIEW_PROCESS'),
        getApiSuccessMessage('CULTURAL_AUTHENTICITY_VERIFICATION'),
        getApiSuccessMessage('PORTUGUESE_COMMUNITY_FEEDBACK'),
        getApiSuccessMessage('BUSINESS_LISTING_ACTIVATION')
      ]
    });

    // Add rate limit headers
    rateLimitCheck.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;

  } catch (error) {
    // Handle validation errors specifically
    if (error instanceof ValidationError) {
      logger.warn('Business submission validation error', error, {
        area: 'business_directory',
        action: 'validation_error',
        issues: error.issues
      });

      return NextResponse.json(
        { 
          error: 'Business submission validation failed',
          details: error.issues,
          message: getApiErrorMessage('VALIDATION_FAILED')
        },
        { status: error.statusCode }
      );
    }

    logger.error(getApiLogMessage('BUSINESS_DIRECTORY_POST_ERROR'), error, {
      area: 'business_directory',
      action: 'post_api_error'
    });

    return NextResponse.json(
      { error: getApiErrorMessage('BUSINESS_SUBMISSION_SERVER_ERROR') },
      { status: 500 }
    );
  }
}