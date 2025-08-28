import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { businessDirectoryService } from '@/services/BusinessDirectoryService';

/**
 * GET /api/business-directory/search
 * Advanced hybrid search combining text query with optional location filtering
 * 
 * Query parameters:
 * - q: Search query (business name, description, specialties, etc.)
 * - lat, lng: Optional user location for distance-based results
 * - radius: Search radius in kilometers if location provided (default: 50)
 * - types[]: Business types to filter by
 * - minRating: Minimum rating filter (default: 0)
 * - verified: Show only verified businesses (default: true)
 * - limit: Maximum results (default: 20, max: 50)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    
    const searchQuery = searchParams.get('q');
    
    if (!searchQuery || searchQuery.trim().length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Search query must be at least 2 characters long' 
        },
        { status: 400 }
      );
    }
    
    // Parse location parameters (optional)
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    let latitude: number | undefined;
    let longitude: number | undefined;
    
    if (lat && lng) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lng);
      
      // Validate coordinates if provided
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
    }
    
    // Parse optional parameters
    const radius = Math.min(parseFloat(searchParams.get('radius') || '50'), 200); // Max 200km for text search
    const businessTypes = searchParams.getAll('types');
    const minRating = Math.max(parseFloat(searchParams.get('minRating') || '0'), 0);
    const verifiedOnly = searchParams.get('verified') !== 'false';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50); // Max 50 for text search

    // Build hybrid search parameters
    const hybridParams = {
      search_query: searchQuery.trim(),
      latitude,
      longitude,
      radius_km: radius,
      business_types: businessTypes.length > 0 ? businessTypes : undefined,
      min_rating: minRating,
      verified_only: verifiedOnly,
      limit
    };

    // Execute hybrid search
    const businesses = await businessDirectoryService.searchBusinessesHybrid(hybridParams);

    const executionTime = Date.now() - startTime;
    
    // Log performance for monitoring
    if (executionTime > 300) {
      logger.warn(`Slow hybrid search API call: ${executionTime}ms`, {
        query: searchQuery,
        location: latitude && longitude ? { latitude, longitude } : null,
        filters: { businessTypes, minRating, verifiedOnly },
        resultCount: businesses.length
      });
    }
    
    // Calculate search analytics
    const matchTypeDistribution = businesses.reduce((acc, business) => {
      const matchType = (business as any).match_type || 'unknown';
      acc[matchType] = (acc[matchType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const avgRating = businesses.length > 0 
      ? businesses.reduce((sum, b) => sum + b.average_rating, 0) / businesses.length 
      : 0;
    
    const avgDistance = latitude && longitude && businesses.length > 0
      ? businesses.reduce((sum, b) => sum + ((b as any).distance_km || 0), 0) / businesses.length 
      : null;
    
    return NextResponse.json({
      success: true,
      data: {
        businesses,
        metadata: {
          search_query: searchQuery,
          search_location: latitude && longitude ? { latitude, longitude } : null,
          search_radius_km: latitude && longitude ? radius : null,
          filters: {
            business_types: businessTypes,
            min_rating: minRating,
            verified_only: verifiedOnly
          },
          pagination: {
            limit,
            total_returned: businesses.length,
            has_more: businesses.length >= limit
          },
          analytics: {
            match_type_distribution: matchTypeDistribution,
            avg_rating: Math.round(avgRating * 10) / 10,
            avg_distance_km: avgDistance ? Math.round(avgDistance * 100) / 100 : null,
            top_business_types: Object.entries(
              businesses.reduce((acc, b) => {
                acc[b.business_type] = (acc[b.business_type] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).sort(([,a], [,b]) => b - a).slice(0, 5)
          }
        },
        performance: {
          execution_time_ms: executionTime,
          search_method: 'hybrid_text_location',
          cache_used: executionTime < 100 // Assume cache if very fast
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Hybrid search API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search Portuguese businesses',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/business-directory/search/suggestions
 * Get search suggestions based on partial input
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { query, location } = body;
    
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: {
          suggestions: [],
          categories: [],
          specialties: []
        }
      });
    }
    
    const supabase = businessDirectoryService['supabaseClient'];
    
    // Get business name suggestions
    const { data: nameData } = await supabase
      .from('portuguese_businesses')
      .select('name, name_portuguese, business_type')
      .or(`name.ilike.%${query}%,name_portuguese.ilike.%${query}%`)
      .eq('is_active', true)
      .eq('is_verified', true)
      .limit(10);
    
    // Get business type suggestions
    const { data: typeData } = await supabase
      .from('portuguese_businesses')
      .select('business_type')
      .ilike('business_type', `%${query}%`)
      .eq('is_active', true)
      .eq('is_verified', true)
      .limit(5);
    
    // Get specialty suggestions
    const { data: specialtyData } = await supabase
      .from('portuguese_businesses')
      .select('portuguese_specialties')
      .eq('is_active', true)
      .eq('is_verified', true)
      .not('portuguese_specialties', 'is', null);
    
    // Process specialty suggestions
    const allSpecialties = specialtyData?.flatMap(b => b.portuguese_specialties || []) || [];
    const matchingSpecialties = [...new Set(allSpecialties
      .filter(spec => spec.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8))];
    
    // Build suggestions
    const suggestions = [
      ...(nameData || []).map(b => ({
        type: 'business',
        text: b.name_portuguese || b.name,
        secondary: b.business_type,
        value: b.name_portuguese || b.name
      })),
      ...[...new Set((typeData || []).map(t => t.business_type))].map(type => ({
        type: 'category',
        text: type,
        value: type
      })),
      ...matchingSpecialties.map(spec => ({
        type: 'specialty',
        text: spec,
        value: spec
      }))
    ].slice(0, 15);
    
    const executionTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: {
        query,
        suggestions,
        metadata: {
          total_suggestions: suggestions.length,
          business_matches: suggestions.filter(s => s.type === 'business').length,
          category_matches: suggestions.filter(s => s.type === 'category').length,
          specialty_matches: suggestions.filter(s => s.type === 'specialty').length
        },
        performance: {
          execution_time_ms: executionTime
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Search suggestions API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get search suggestions',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}