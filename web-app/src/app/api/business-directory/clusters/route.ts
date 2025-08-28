import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { businessDirectoryService } from '@/services/BusinessDirectoryService';

// Mark this route as dynamic since it depends on query parameters
export const dynamic = 'force-dynamic';

/**
 * GET /api/business-directory/clusters
 * Get business clusters for map visualization
 * 
 * Query parameters:
 * - south, west, north, east: Bounding box coordinates
 * - zoom: Zoom level (affects clustering granularity)
 * - types[]: Business types to filter by
 * - minRating: Minimum rating filter
 * - verified: Whether to show only verified businesses
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = request.nextUrl;
    
    // Validate required bounding box parameters
    const south = searchParams.get('south');
    const west = searchParams.get('west');
    const north = searchParams.get('north');
    const east = searchParams.get('east');
    
    if (!south || !west || !north || !east) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required bounding box parameters (south, west, north, east)' 
        },
        { status: 400 }
      );
    }
    
    const bounds = {
      south: parseFloat(south),
      west: parseFloat(west),
      north: parseFloat(north),
      east: parseFloat(east)
    };
    
    // Validate bounding box
    if (bounds.south >= bounds.north || bounds.west >= bounds.east) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid bounding box coordinates' 
        },
        { status: 400 }
      );
    }
    
    // Parse optional parameters
    const zoomLevel = parseInt(searchParams.get('zoom') || '12');
    const businessTypes = searchParams.getAll('types');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const verifiedOnly = searchParams.get('verified') !== 'false';

    // Validate zoom level
    if (zoomLevel < 1 || zoomLevel > 20) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid zoom level (must be between 1 and 20)' 
        },
        { status: 400 }
      );
    }

    // Get business clusters using optimized service
    const clusters = await businessDirectoryService.getBusinessClusters(
      bounds,
      zoomLevel,
      {
        business_types: businessTypes.length > 0 ? businessTypes : undefined,
        min_rating: minRating,
        verified_only: verifiedOnly
      }
    );

    const executionTime = Date.now() - startTime;
    
    // Log performance metrics
    if (executionTime > 200) {
      logger.warn(`Slow business clusters API call: ${executionTime}ms`, {
        bounds,
        zoomLevel,
        filters: { businessTypes, minRating, verifiedOnly },
        resultCount: clusters.length
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        clusters,
        metadata: {
          bounds,
          zoomLevel,
          filters: {
            business_types: businessTypes,
            min_rating: minRating,
            verified_only: verifiedOnly
          },
          total_clusters: clusters.length,
          total_businesses: clusters.reduce((sum, cluster) => sum + cluster.business_count, 0)
        },
        performance: {
          execution_time_ms: executionTime,
          cache_used: executionTime < 50 // Assume cache was used if very fast
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Business clusters API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get business clusters',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/business-directory/clusters/hotspots
 * Get business category hotspots from materialized view
 */
export async function GET_HOTSPOTS(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const { searchParams } = request.nextUrl;
    
    const businessType = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Use direct query to materialized view for better performance
    const { data, error } = await businessDirectoryService['supabaseClient']
      .from('mv_business_category_hotspots')
      .select('*')
      .modify((query) => {
        if (businessType) {
          query.eq('business_type', businessType);
        }
      })
      .order('hotspot_score', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const executionTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: {
        hotspots: data || [],
        metadata: {
          business_type: businessType,
          total_hotspots: data?.length || 0
        },
        performance: {
          execution_time_ms: executionTime
        }
      }
    });

  } catch (error) {
    const executionTime = Date.now() - startTime;
    logger.error('Business hotspots API error:', { error, executionTime });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get business hotspots',
        execution_time_ms: executionTime
      },
      { status: 500 }
    );
  }
}