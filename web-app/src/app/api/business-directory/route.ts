import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BusinessFilters {
  search?: string;
  category?: string[];
  palop?: boolean;
  cultural?: boolean;
  londonArea?: string[];
  verificationStatus?: 'verified' | 'all';
  sortBy?: 'featured' | 'rating' | 'distance' | 'newest' | 'alphabetical';
  priceRange?: string[];
  openNow?: boolean;
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
  limit?: number;
  offset?: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const filters: BusinessFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.getAll('category'),
      palop: searchParams.get('palop') === 'true',
      cultural: searchParams.get('cultural') === 'true',
      londonArea: searchParams.getAll('londonArea'),
      verificationStatus: (searchParams.get('verificationStatus') as 'verified' | 'all') || 'verified',
      sortBy: (searchParams.get('sortBy') as any) || 'featured',
      priceRange: searchParams.getAll('priceRange'),
      openNow: searchParams.get('openNow') === 'true',
      latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : undefined,
      longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : undefined,
      radius: searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : 10,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    };

    // Build the PostGIS-optimized query
    const businesses = await findPortugueseBusinesses(filters);
    
    return NextResponse.json({
      success: true,
      data: {
        businesses: businesses.data,
        total: businesses.total,
        hasMore: businesses.hasMore,
        filters: filters,
      }
    });

  } catch (error) {
    console.error('Business directory API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

async function findPortugueseBusinesses(filters: BusinessFilters) {
  // Start building the query
  let query = supabase
    .from('portuguese_businesses')
    .select(`
      id,
      name,
      name_portuguese,
      category,
      subcategory,
      description,
      description_portuguese,
      address,
      postcode,
      city,
      phone,
      email,
      website,
      rating,
      review_count,
      price_range,
      coordinates,
      is_verified,
      is_premium,
      cultural_offerings,
      opening_hours,
      photos,
      special_offers,
      cultural_events,
      owner_region,
      languages_spoken,
      supports_culture,
      created_at,
      updated_at,
      featured_until
    `);

  // Apply base filters
  if (filters.verificationStatus === 'verified') {
    query = query.eq('is_verified', true);
  }

  // Search filter using full-text search
  if (filters.search) {
    query = query.or(`
      name.ilike.%${filters.search}%,
      name_portuguese.ilike.%${filters.search}%,
      description.ilike.%${filters.search}%,
      description_portuguese.ilike.%${filters.search}%,
      subcategory.ilike.%${filters.search}%,
      cultural_offerings.cs.{${filters.search}}
    `);
  }

  // Category filter
  if (filters.category && filters.category.length > 0) {
    query = query.in('category', filters.category);
  }

  // PALOP filter (Portuguese-speaking African Countries)
  if (filters.palop) {
    const palopRegions = ['angola', 'mozambique', 'cape_verde', 'guinea_bissau', 'sao_tome_principe'];
    query = query.in('owner_region', palopRegions);
  }

  // Cultural support filter
  if (filters.cultural) {
    query = query.eq('supports_culture', true);
  }

  // London area filter
  if (filters.londonArea && filters.londonArea.length > 0) {
    query = query.in('london_area', filters.londonArea);
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange.length > 0) {
    query = query.in('price_range', filters.priceRange);
  }

  // Open now filter
  if (filters.openNow) {
    // This would require a more complex query to check current opening hours
    // For now, we'll filter this on the client side
  }

  // Execute the base query
  let baseQuery = query;

  // Handle geolocation and distance-based queries
  if (filters.latitude && filters.longitude) {
    // Use PostGIS for distance calculation
    const { data, error } = await supabase.rpc('find_portuguese_businesses_optimized', {
      user_lat: filters.latitude,
      user_lng: filters.longitude,
      business_types: filters.category,
      radius_km: filters.radius || 10,
      limit_count: filters.limit || 20
    });

    if (error) {
      console.error('PostGIS query error:', error);
      // Fallback to regular query without distance
    } else {
      // Apply additional filters to PostGIS results
      let filteredData = data || [];
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter((business: any) => 
          business.business_name.toLowerCase().includes(searchLower) ||
          (business.business_name_portuguese && business.business_name_portuguese.toLowerCase().includes(searchLower)) ||
          business.address.toLowerCase().includes(searchLower)
        );
      }

      // Apply PALOP filter
      if (filters.palop) {
        const palopRegions = ['angola', 'mozambique', 'cape_verde', 'guinea_bissau', 'sao_tome_principe'];
        filteredData = filteredData.filter((business: any) => 
          business.owner_region && palopRegions.includes(business.owner_region)
        );
      }

      return {
        data: filteredData,
        total: filteredData.length,
        hasMore: false
      };
    }
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'rating':
      query = query.order('rating', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'alphabetical':
      query = query.order('name', { ascending: true });
      break;
    case 'featured':
    default:
      // Featured businesses first (those with featured_until > now)
      query = query.order('is_premium', { ascending: false })
                  .order('rating', { ascending: false })
                  .order('review_count', { ascending: false });
      break;
  }

  // Apply pagination
  const countQuery = await supabase
    .from('portuguese_businesses')
    .select('*', { count: 'exact', head: true });

  const { data, error, count } = await query
    .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1);

  if (error) {
    throw error;
  }

  // Process results to add computed fields
  const processedBusinesses = (data || []).map((business: any) => ({
    ...business,
    // Add distance field if coordinates available
    distance_km: null,
    // Format opening hours
    isOpenNow: filters.openNow ? isBusinessOpenNow(business.opening_hours) : undefined,
    // Add computed fields
    nameDisplay: business.name_portuguese || business.name,
    descriptionDisplay: business.description_portuguese || business.description,
  }));

  return {
    data: processedBusinesses,
    total: count || 0,
    hasMore: ((filters.offset || 0) + (filters.limit || 20)) < (count || 0)
  };
}

// Helper function to check if business is currently open
function isBusinessOpenNow(openingHours: any): boolean {
  if (!openingHours) return false;
  
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const todayHours = openingHours[currentDay];
  if (!todayHours || todayHours === 'Closed' || todayHours === 'closed') {
    return false;
  }
  
  // Parse hours format like "09:00-18:00" or "09:00-12:00,14:00-18:00"
  const hoursParts = todayHours.split(',');
  
  for (const part of hoursParts) {
    const range = part.trim().split('-');
    if (range.length === 2) {
      const openTime = parseTimeToMinutes(range[0].trim());
      const closeTime = parseTimeToMinutes(range[1].trim());
      
      if (openTime !== null && closeTime !== null) {
        if (currentTime >= openTime && currentTime <= closeTime) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Helper function to parse time string to minutes
function parseTimeToMinutes(timeStr: string): number | null {
  const parts = timeStr.split(':');
  if (parts.length !== 2) return null;
  
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  
  if (isNaN(hours) || isNaN(minutes)) return null;
  
  return hours * 60 + minutes;
}

// POST endpoint for submitting new businesses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'description', 'address', 'phone', 'email', 'owner_region'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Geocode the address using the address
    let coordinates = null;
    if (body.address) {
      try {
        coordinates = await geocodeAddress(`${body.address}, London, United Kingdom`);
      } catch (error) {
        console.warn('Geocoding failed:', error);
      }
    }

    // Insert the new business
    const { data, error } = await supabase
      .from('portuguese_businesses')
      .insert([{
        name: body.name,
        name_portuguese: body.namePortuguese,
        category: body.category,
        subcategory: body.subcategory,
        description: body.description,
        description_portuguese: body.descriptionPortuguese,
        address: body.address,
        postcode: body.postcode,
        city: body.city || 'London',
        phone: body.phone,
        email: body.email,
        website: body.website,
        coordinates: coordinates,
        is_verified: false, // Needs verification
        is_premium: false,
        cultural_offerings: body.culturalOfferings || [],
        opening_hours: body.openingHours,
        owner_region: body.ownerRegion,
        languages_spoken: body.languagesSpoken || ['portuguese', 'english'],
        supports_culture: body.supportsCulture || false,
        price_range: body.priceRange || '££',
        london_area: determineLodonArea(body.postcode),
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        business: data,
        message: 'Business submitted for verification. You will be contacted within 48 hours.'
      }
    });

  } catch (error) {
    console.error('Business submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit business' },
      { status: 500 }
    );
  }
}

// Helper function to geocode address using Nominatim
async function geocodeAddress(address: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
      {
        headers: {
          'User-Agent': 'LusoTown Portuguese Business Directory'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    console.warn('Geocoding failed:', error);
  }

  return null;
}

// Helper function to determine London area from postcode
function determineLodonArea(postcode: string): string {
  if (!postcode) return 'central_london';
  
  const postcodeUpper = postcode.toUpperCase();
  const district = postcodeUpper.split(' ')[0];
  
  // London postcode area mapping
  const areaMapping: Record<string, string> = {
    // Central London
    'WC1': 'central_london', 'WC2': 'central_london',
    'EC1': 'central_london', 'EC2': 'central_london', 'EC3': 'central_london', 'EC4': 'central_london',
    
    // West London
    'W1': 'central_london', 'W2': 'west_london', 'W3': 'west_london', 'W4': 'west_london',
    'W5': 'west_london', 'W6': 'west_london', 'W7': 'west_london', 'W8': 'west_london',
    'W9': 'west_london', 'W10': 'west_london', 'W11': 'west_london', 'W12': 'west_london',
    'W13': 'west_london', 'W14': 'west_london',
    
    // North London
    'N1': 'north_london', 'N2': 'north_london', 'N3': 'north_london', 'N4': 'north_london',
    'N5': 'north_london', 'N6': 'north_london', 'N7': 'north_london', 'N8': 'north_london',
    'N9': 'north_london', 'N10': 'north_london', 'N11': 'north_london', 'N12': 'north_london',
    
    // South London
    'SW1': 'central_london', 'SW2': 'south_london', 'SW3': 'south_london', 'SW4': 'south_london',
    'SW5': 'south_london', 'SW6': 'south_london', 'SW7': 'south_london', 'SW8': 'south_london',
    'SW9': 'south_london', 'SW10': 'south_london', 'SW11': 'south_london', 'SW12': 'south_london',
    'SE1': 'central_london', 'SE2': 'southeast_london', 'SE3': 'southeast_london', 'SE4': 'southeast_london',
    'SE5': 'south_london', 'SE6': 'southeast_london', 'SE7': 'southeast_london', 'SE8': 'southeast_london',
    
    // East London
    'E1': 'east_london', 'E2': 'east_london', 'E3': 'east_london', 'E4': 'east_london',
    'E5': 'east_london', 'E6': 'east_london', 'E7': 'east_london', 'E8': 'east_london',
    'E9': 'east_london', 'E10': 'east_london', 'E11': 'east_london', 'E12': 'east_london',
  };
  
  // Check for exact match first
  if (areaMapping[district]) {
    return areaMapping[district];
  }
  
  // Check for partial matches (e.g., SW15 -> south_london)
  const prefix = district.match(/^[A-Z]+/)?.[0];
  if (prefix) {
    const matches = Object.keys(areaMapping).filter(key => key.startsWith(prefix));
    if (matches.length > 0) {
      return areaMapping[matches[0]];
    }
  }
  
  return 'central_london'; // Default fallback
}