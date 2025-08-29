import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { getPortugueseApiMiddleware } from '@/lib/api-middleware';
import logger from '@/utils/logger';
import { getApiErrorMessage, getApiLogMessage, getApiSuccessMessage } from '@/config/api-messages';
import { APIValidation, validateAPIInput, ValidationError } from '@/lib/validation/api-validation';

// Optimized Business Directory API with Connection Pooling and Caching
const apiMiddleware = getPortugueseApiMiddleware();

export const GET = apiMiddleware.withOptimizations(
  async (context, request) => {
    const { searchParams } = new URL(request.url);
    
    // Extract and validate search parameters
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
    
    // Extract location parameters for geospatial queries
    const lat = parseFloat(searchParams.get('latitude') || '0');
    const lon = parseFloat(searchParams.get('longitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '10');
    
    // Build filters for the middleware
    const filters = {
      userLocation: lat && lon ? { lat, lng: lon } : undefined,
      categories: validatedSearch.category ? [validatedSearch.category] : undefined,
      radius,
      searchText: validatedSearch.query,
      limit: validatedSearch.limit,
      offset: validatedSearch.offset
    };

    try {
      // Use optimized business directory handler
      const result = await apiMiddleware.getPortugueseBusinesses(context, filters);
      
      logger.info(getApiLogMessage('PORTUGUESE_BUSINESS_DIRECTORY_SUCCESS'), undefined, {
        area: 'business_directory',
        action: 'fetch_success',
        results_count: result.data.businesses.length,
        cached: result.cached,
        execution_time: result.executionTime,
        filters
      });

      return {
        data: {
          businesses: result.data.businesses,
          total: result.data.total,
          filters: {
            category: validatedSearch.category,
            location: validatedSearch.location,
            portuguese_specialties: validatedSearch.portugueseSpecialties,
            radius
          },
          cultural_context: 'portuguese-speaking-community',
          location_context: 'united-kingdom',
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
      if (error instanceof ValidationError) {
        logger.warn('Business directory validation error', error, {
          area: 'business_directory',
          action: 'validation_error',
          issues: error.issues
        });

        throw error;
      }

      logger.error(getApiLogMessage('BUSINESS_DIRECTORY_API_ERROR'), error, {
        area: 'business_directory',
        action: 'api_error',
        filters
      });

      throw error;
    }
  },
  {
    enableCaching: true,
    enableQueryOptimization: true,
    enablePerformanceMonitoring: true,
    cacheTTL: 900, // 15 minutes for business directory
    rateLimit: {
      endpoint: 'business-directory',
      maxRequests: 50,
      windowMs: 60000 // 1 minute
    }
  }
);

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