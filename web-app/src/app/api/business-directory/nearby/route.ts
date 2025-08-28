import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { businessDirectoryService } from '@/services/BusinessDirectoryService';

/**
 * GET /api/business-directory/nearby
 * Optimized endpoint for location-based Portuguese business searches
 * 
 * Query parameters:
 * - lat, lng: User location (required)
 * - radius: Search radius in kilometers (default: 10)
 * - types[]: Business types to filter by
 * - minRating: Minimum rating filter (default: 0)
 * - maxPrice: Maximum price level 1-4 (default: 4)
 * - cultural: Cultural focus filter ('portugal', 'brazil', 'africa', 'mixed')
 * - specialties[]: Portuguese specialties to filter by
 * - verified: Show only verified businesses (default: true)
 * - openNow: Show only currently open businesses (default: false)
 * - limit: Maximum results (default: 20, max: 100)
 * - offset: Results offset for pagination (default: 0)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate required location parameters
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    if (!lat || !lng) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required location parameters (lat, lng)' 
        },
        { status: 400 }
      );
    }
    
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    
    // Validate coordinates
    if (isNaN(latitude) || isNaN(longitude) || 
        latitude < -90 || latitude > 90 || 
        longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid latitude or longitude coordinates' 
        },
        { status: 400 }
      );
    }
    
    // Parse optional parameters
    const radius = Math.min(parseFloat(searchParams.get('radius') || '10'), 100); // Max 100km
    const businessTypes = searchParams.getAll('types');
    const minRating = Math.max(parseFloat(searchParams.get('minRating') || '0'), 0);
    const maxPriceLevel = Math.min(parseInt(searchParams.get('maxPrice') || '4'), 4);
    const culturalFocus = searchParams.get('cultural');
    const specialties = searchParams.getAll('specialties');
    const verifiedOnly = searchParams.get('verified') !== 'false';
    const openNow = searchParams.get('openNow') === 'true';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Max 100 results
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);

    // Build search parameters
    const searchParams_obj = {
      latitude,
      longitude,
      radius_km: radius,
      business_types: businessTypes.length > 0 ? businessTypes : undefined,
      min_rating: minRating,
      max_price_level: maxPriceLevel,
      cultural_focus: culturalFocus || undefined,
      portuguese_specialties: specialties.length > 0 ? specialties : undefined,
      verified_only: verifiedOnly,
      open_now: openNow,
      limit,
      offset
    };

    // Execute optimized location search
    const businesses = await businessDirectoryService.getNearbyBusinesses(searchParams_obj);

    const executionTime = Date.now() - startTime;
    
    // Log performance metrics for monitoring
    if (executionTime > 200) {
      logger.warn(`Slow nearby businesses API call: ${executionTime}ms`, {
        location: { latitude, longitude },
        radius,
        filters: { businessTypes, minRating, culturalFocus, specialties },
        resultCount: businesses.length
      });
    }
    
    // Calculate additional metadata
    const hasMore = businesses.length >= limit;
    const avgDistance = businesses.length > 0 
      ? businesses.reduce((sum, b) => sum + (b.distance_km || 0), 0) / businesses.length 
      : 0;
    const avgRating = businesses.length > 0 
      ? businesses.reduce((sum, b) => sum + b.average_rating, 0) / businesses.length 
      : 0;
    
    return NextResponse.json({
      success: true,
      data: {
        businesses,
        metadata: {
          search_location: { latitude, longitude },
          search_radius_km: radius,
          filters: {
            business_types: businessTypes,
            min_rating: minRating,
            max_price_level: maxPriceLevel,
            cultural_focus: culturalFocus,
            portuguese_specialties: specialties,
            verified_only: verifiedOnly,
            open_now: openNow
          },
          pagination: {
            limit,
            offset,
            has_more: hasMore,
            total_returned: businesses.length
          },
          analytics: {
            avg_distance_km: Math.round(avgDistance * 100) / 100,
            avg_rating: Math.round(avgRating * 10) / 10,
            furthest_business_km: Math.max(...businesses.map(b => b.distance_km || 0)),
            price_distribution: businesses.reduce((acc, b) => {
              acc[b.price_range || 'unknown'] = (acc[b.price_range || 'unknown'] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          }
        },
        performance: {
          execution_time_ms: executionTime,
          search_method: 'optimized_postgis',
          cache_used: executionTime < 50 // Assume cache if very fast
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Nearby businesses API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to find nearby Portuguese businesses',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/business-directory/nearby/bulk
 * Bulk location search for multiple locations (useful for route planning)
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { locations, filters = {} } = body;
    
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing or invalid locations array' 
        },
        { status: 400 }
      );
    }
    
    if (locations.length > 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Maximum 10 locations allowed per bulk request' 
        },
        { status: 400 }
      );
    }
    
    // Validate locations
    const validatedLocations = locations.map((loc, index) => {
      if (!loc.latitude || !loc.longitude) {
        throw new Error(`Invalid location at index ${index}: missing lat/lng`);
      }
      const lat = parseFloat(loc.latitude);
      const lng = parseFloat(loc.longitude);
      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error(`Invalid coordinates at index ${index}`);
      }
      return {
        latitude: lat,
        longitude: lng,
        name: loc.name || `Location ${index + 1}`
      };
    });
    
    // Execute searches for all locations
    const searchPromises = validatedLocations.map(async (location) => {
      try {
        const searchParams = {
          latitude: location.latitude,
          longitude: location.longitude,
          radius_km: filters.radius_km || 10,
          business_types: filters.business_types,
          min_rating: filters.min_rating || 0,
          max_price_level: filters.max_price_level || 4,
          cultural_focus: filters.cultural_focus,
          portuguese_specialties: filters.portuguese_specialties,
          verified_only: filters.verified_only ?? true,
          open_now: filters.open_now ?? false,
          limit: Math.min(filters.limit || 10, 20) // Smaller limit for bulk
        };
        
        const businesses = await businessDirectoryService.getNearbyBusinesses(searchParams);
        
        return {
          location,
          businesses,
          success: true
        };
      } catch (error) {
        logger.error(`Bulk search error for location ${location.name}:`, error);
        return {
          location,
          businesses: [],
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });
    
    const results = await Promise.all(searchPromises);
    const executionTime = Date.now() - startTime;
    
    // Calculate summary statistics
    const totalBusinesses = results.reduce((sum, r) => sum + r.businesses.length, 0);
    const successfulSearches = results.filter(r => r.success).length;
    
    return NextResponse.json({
      success: true,
      data: {
        results,
        metadata: {
          locations_searched: validatedLocations.length,
          successful_searches: successfulSearches,
          total_businesses_found: totalBusinesses,
          filters: filters
        },
        performance: {
          execution_time_ms: executionTime,
          searches_completed: results.length,
          avg_time_per_search: Math.round(executionTime / results.length)
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Bulk nearby businesses API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to execute bulk search',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}