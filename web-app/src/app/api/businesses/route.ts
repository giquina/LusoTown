import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getApiErrorMessage, getApiLogMessage } from '@/config/api-messages';
import logger from '@/utils/logger';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  
  // Extract query parameters
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const radius = searchParams.get('radius') || '10';
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const language = searchParams.get('lang') || 'en';

  try {
    let query = supabase
      .from('portuguese_businesses')
      .select(`
        id,
        name,
        name_portuguese,
        category,
        description,
        description_portuguese,
        address,
        postcode,
        city,
        region,
        coordinates,
        phone,
        email,
        website,
        owner_name,
        owner_country,
        established_year,
        rating,
        review_count,
        price_range,
        is_verified,
        is_featured,
        is_premium,
        specialties,
        services,
        services_portuguese,
        opening_hours,
        photos,
        cultural_connection,
        created_at,
        updated_at
      `);

    // Apply text search filter
    if (search && search.trim()) {
      query = query.or(
        `name.ilike.%${search}%,` +
        `name_portuguese.ilike.%${search}%,` +
        `description.ilike.%${search}%,` +
        `description_portuguese.ilike.%${search}%,` +
        `specialties.cs.{${search}}`
      );
    }

    // Apply category filter
    if (category) {
      query = query.eq('category', category);
    }

    // Apply city filter
    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    // Apply geolocation filter using PostGIS
    if (latitude && longitude && radius) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      const radiusMeters = parseFloat(radius) * 1000; // Convert km to meters

      // Use PostGIS ST_DWithin for efficient geospatial queries
      query = query.filter(
        'coordinates',
        'st_dwithin',
        `POINT(${lng} ${lat})::geography,${radiusMeters}`
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'distance':
        if (latitude && longitude) {
          // Sort by distance using PostGIS ST_Distance
          query = query.order('coordinates', { 
            ascending: true,
            nullsFirst: false,
            referencedTable: 'portuguese_businesses'
          });
        } else {
          query = query.order('rating', { ascending: false });
        }
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'featured':
      default:
        // Sort by featured status, then premium, then rating
        query = query
          .order('is_featured', { ascending: false })
          .order('is_premium', { ascending: false })
          .order('rating', { ascending: false });
        break;
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: businesses, error } = await query;

    if (error) {
      logger.business.error(getApiLogMessage('DATABASE_ERROR'), error);
      throw error;
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('portuguese_businesses')
      .select('*', { count: 'exact', head: true });

    // Transform data for response
    const transformedBusinesses = businesses?.map(business => ({
      id: business.id,
      name: business.name,
      namePortuguese: business.name_portuguese,
      category: business.category,
      description: business.description,
      descriptionPortuguese: business.description_portuguese,
      address: business.address,
      postcode: business.postcode,
      city: business.city,
      region: business.region,
      coordinates: business.coordinates,
      phone: business.phone,
      email: business.email,
      website: business.website,
      ownerName: business.owner_name,
      ownerCountry: business.owner_country,
      establishedYear: business.established_year,
      rating: business.rating,
      reviewCount: business.review_count,
      priceRange: business.price_range,
      isVerified: business.is_verified,
      isFeatured: business.is_featured,
      isPremium: business.is_premium,
      specialties: business.specialties,
      services: business.services,
      servicesPortuguese: business.services_portuguese,
      openingHours: business.opening_hours,
      photos: business.photos,
      culturalConnection: business.cultural_connection,
      createdAt: business.created_at,
      updatedAt: business.updated_at,
      // Calculate distance if coordinates provided
      distance: latitude && longitude && business.coordinates 
        ? calculateDistance(
            parseFloat(latitude), 
            parseFloat(longitude), 
            business.coordinates.coordinates[1], // PostGIS format [lng, lat]
            business.coordinates.coordinates[0]
          )
        : null
    })) || [];

    return NextResponse.json({
      businesses: transformedBusinesses,
      total: count || 0,
      hasMore: offset + limit < (count || 0),
      pagination: {
        offset,
        limit,
        total: count || 0,
        page: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil((count || 0) / limit)
      },
      filters: {
        search,
        category,
        city,
        coordinates: latitude && longitude ? { latitude, longitude, radius } : null,
        sortBy,
        language
      }
    });

  } catch (error) {
    logger.business.error(getApiLogMessage('BUSINESS_SEARCH_API_ERROR'), error);
    return NextResponse.json(
      { 
        error: getApiErrorMessage('BUSINESS_FETCH_FAILED_GENERIC'),
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: getApiErrorMessage('UNAUTHORIZED') }, { status: 401 });
    }

    const businessData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'description', 'address', 'phone', 'city'];
    const missingFields = requiredFields.filter(field => !businessData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `${getApiErrorMessage('MISSING_BUSINESS_FIELDS_GENERIC')}: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Prepare business data for insertion
    const businessToInsert = {
      name: businessData.name,
      name_portuguese: businessData.namePortuguese,
      category: businessData.category,
      description: businessData.description,
      description_portuguese: businessData.descriptionPortuguese,
      address: businessData.address,
      postcode: businessData.postcode,
      city: businessData.city,
      region: businessData.region,
      phone: businessData.phone,
      email: businessData.email,
      website: businessData.website,
      owner_name: businessData.ownerName,
      owner_country: businessData.ownerCountry,
      established_year: businessData.establishedYear,
      price_range: businessData.priceRange,
      specialties: businessData.specialties,
      services: businessData.services,
      services_portuguese: businessData.servicesPortuguese,
      opening_hours: businessData.openingHours,
      photos: businessData.photos,
      cultural_connection: businessData.culturalConnection,
      owner_id: user.id,
      verification_status: 'pending',
      is_verified: false,
      is_featured: false,
      is_premium: false,
      rating: 0,
      review_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert business
    const { data: newBusiness, error } = await supabase
      .from('portuguese_businesses')
      .insert(businessToInsert)
      .select()
      .single();

    if (error) {
      logger.business.error(getApiLogMessage('BUSINESS_INSERTION_ERROR'), error);
      throw error;
    }

    // TODO: Send notification to admins for verification
    // TODO: Geocode address to get coordinates

    return NextResponse.json({
      business: newBusiness,
      message: getApiErrorMessage('BUSINESS_SUBMISSION_SUCCESS_MESSAGE'),
      verificationRequired: true
    });

  } catch (error) {
    logger.business.error(getApiLogMessage('BUSINESS_CREATION_API_ERROR'), error);
    return NextResponse.json(
      { 
        error: getApiErrorMessage('BUSINESS_CREATION_FAILED'),
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}