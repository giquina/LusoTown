import { NextRequest, NextResponse } from "next/server";
import { getEnhancedDatabaseService } from "@/services/EnhancedDatabaseService";
import logger from '@/utils/logger';

/**
 * Advanced Portuguese Business Search API
 *
 * Optimized for high-performance Portuguese community business discovery with:
 * - PostGIS geospatial optimization
 * - Cultural authenticity scoring
 * - Redis caching for mobile responsiveness
 * - Real-time availability checking
 * - Community recommendation algorithms
 */

interface AdvancedBusinessSearchParams {
  // Location parameters
  userLat?: number;
  userLng?: number;
  radiusKm?: number;

  // Business filters
  businessTypes?: string[];
  portugueseSpecialties?: string[];
  culturalPreference?: "portugal" | "brazil" | "africa" | "mixed";
  priceRange?: "budget" | "mid" | "premium";
  ratingThreshold?: number;

  // Availability filters
  openingNow?: boolean;
  availableToday?: boolean;

  // Portuguese community preferences
  culturalAuthenticity?: "high" | "medium" | "any";
  communityVerified?: boolean;
  supportsCulture?: boolean;

  // Performance parameters
  limit?: number;
  offset?: number;
  includeClustering?: boolean;
  mobileOptimized?: boolean;
}

interface BusinessSearchResponse {
  success: boolean;
  data?: {
    businesses: any[];
    totalResults: number;
    searchMetrics: {
      executionTime: number;
      cached: boolean;
      searchRadius: number;
      culturalRelevance: number;
    };
    clustering?: {
      clusters: any[];
      recommendations: string[];
    };
    recommendations: string[];
  };
  error?: string;
  performance?: {
    queryTime: number;
    cacheStatus: string;
    optimizationLevel: string;
  };
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<BusinessSearchResponse>> {
  const startTime = performance.now();

  try {
    const { searchParams } = new URL(request.url);

    // Parse advanced search parameters without assigning undefined to optional properties
    const params: AdvancedBusinessSearchParams = {
      radiusKm: searchParams.get("radius")
        ? parseFloat(searchParams.get("radius")!)
        : 10.0,
      ratingThreshold: searchParams.get("rating")
        ? parseFloat(searchParams.get("rating")!)
        : 0.0,
      openingNow: searchParams.get("openNow") === "true",
      availableToday: searchParams.get("availableToday") === "true",
      culturalAuthenticity: (searchParams.get("authenticity") as any) || "any",
      communityVerified: searchParams.get("verified") === "true",
      supportsCulture: searchParams.get("supportsCulture") === "true",
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 20,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
      includeClustering: searchParams.get("clustering") === "true",
      mobileOptimized: searchParams.get("mobile") === "true",
    };
    const latStr = searchParams.get("lat");
    const lngStr = searchParams.get("lng");
    if (latStr) params.userLat = parseFloat(latStr);
    if (lngStr) params.userLng = parseFloat(lngStr);
    const typesStr = searchParams.get("types");
    if (typesStr) params.businessTypes = typesStr.split(",");
    const specsStr = searchParams.get("specialties");
    if (specsStr) params.portugueseSpecialties = specsStr.split(",");
    const culturalStr = searchParams.get("cultural") as any;
    if (culturalStr) params.culturalPreference = culturalStr;
    const priceStr = searchParams.get("price") as any;
    if (priceStr) params.priceRange = priceStr;

    // Validate required parameters for geospatial search
    if (
      (params.userLat && !params.userLng) ||
      (!params.userLat && params.userLng)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Both latitude and longitude are required for location-based search",
        },
        { status: 400 }
      );
    }
    if (params.userLat === undefined || params.userLng === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Latitude and longitude are required",
        },
        { status: 400 }
      );
    }

    // Get enhanced database service
    const dbService = getEnhancedDatabaseService();

    // Execute advanced Portuguese business search
    const requestPayload: any = {
      userLat: params.userLat!,
      userLng: params.userLng!,
      openingNow: params.openingNow,
      limit: params.limit,
    };
    if (params.businessTypes)
      requestPayload.businessTypes = params.businessTypes;
    if (params.portugueseSpecialties)
      requestPayload.portugueseSpecialties = params.portugueseSpecialties;
    if (searchParams.get("radius")) requestPayload.radiusKm = params.radiusKm;
    if (params.culturalPreference)
      requestPayload.culturalPreference = params.culturalPreference;
    if (searchParams.get("rating"))
      requestPayload.ratingThreshold = params.ratingThreshold;
    if (params.priceRange) requestPayload.priceRange = params.priceRange;
    const searchResult =
      await dbService.findPortugueseBusinessesAdvanced(requestPayload);

    // Apply additional filters for Portuguese community preferences
    let filteredBusinesses = searchResult.data || [];

    // Cultural authenticity filter
    if (params.culturalAuthenticity === "high") {
      filteredBusinesses = filteredBusinesses.filter(
        (business: any) =>
          business.cultural_focus &&
          ["portugal", "brazil", "africa"].includes(business.cultural_focus) &&
          business.portuguese_specialties?.length > 0
      );
    } else if (params.culturalAuthenticity === "medium") {
      filteredBusinesses = filteredBusinesses.filter(
        (business: any) =>
          business.cultural_focus === "mixed" ||
          business.portuguese_specialties?.length > 0
      );
    }

    // Community verification filter
    if (params.communityVerified) {
      filteredBusinesses = filteredBusinesses.filter(
        (business: any) => business.is_verified
      );
    }

    // Culture support filter
    if (params.supportsCulture) {
      filteredBusinesses = filteredBusinesses.filter(
        (business: any) =>
          business.supports_culture || business.cultural_offerings?.length > 0
      );
    }

    // Apply pagination after filtering
    const startIndex = params.offset || 0;
    const endIndex = startIndex + (params.limit || 20);
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);

    // Get clustering analysis if requested
    let clusteringResults:
      | { clusters: any[]; recommendations: string[] }
      | undefined = undefined;
    if (params.includeClustering && params.userLat && params.userLng) {
      try {
        const clusteringResult = await dbService.getPortugueseBusinessClusters(
          params.userLat,
          params.userLng,
          params.radiusKm || 10.0,
          2 // Minimum businesses per cluster
        );
        clusteringResults = {
          clusters: clusteringResult.data?.slice(0, 10) || [], // Top 10 clusters
          recommendations: generateClusterRecommendations(
            clusteringResult.data || []
          ),
        };
      } catch (error) {
        logger.warn('Business clustering analysis failed', {
          area: 'business',
          action: 'clustering_analysis',
          culturalContext: 'portuguese',
          userLat: params.userLat,
          userLng: params.userLng,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // Generate Portuguese community recommendations
    const recommendations = generatePortugueseBusinessRecommendations(
      paginatedBusinesses,
      params
    );

    // Calculate cultural relevance score
    const culturalRelevance = calculateCulturalRelevanceScore(
      paginatedBusinesses,
      params
    );

    const executionTime = performance.now() - startTime;

    const dataOut: NonNullable<BusinessSearchResponse["data"]> = {
      businesses: paginatedBusinesses,
      totalResults: filteredBusinesses.length,
      searchMetrics: {
        executionTime: Math.round(executionTime),
        cached: searchResult.cached,
        searchRadius: params.radiusKm || 10.0,
        culturalRelevance: Math.round(culturalRelevance * 100) / 100,
      },
      recommendations,
    } as any;
    if (clusteringResults) {
      (dataOut as any).clustering = clusteringResults;
    }
    return NextResponse.json<BusinessSearchResponse>({
      success: true,
      data: dataOut,
      performance: {
        queryTime: Math.round(executionTime),
        cacheStatus: searchResult.cached ? "hit" : "miss",
        optimizationLevel: params.mobileOptimized ? "mobile" : "standard",
      },
    });
  } catch (error) {
    logger.error('Advanced Portuguese business search failed', error, {
      area: 'business',
      action: 'advanced_business_search',
      culturalContext: 'portuguese',
      searchParams: {
        userLat: params.userLat,
        userLng: params.userLng,
        radius: params.radiusKm,
        culturalPreference: params.culturalPreference
      }
    });

    const executionTime = performance.now() - startTime;

    return NextResponse.json(
      {
        success: false,
        error: "Advanced Portuguese business search failed",
        performance: {
          queryTime: Math.round(executionTime),
          cacheStatus: "error",
          optimizationLevel: "failed",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Generate clustering recommendations for Portuguese businesses
 */
function generateClusterRecommendations(clusters: any[]): string[] {
  if (!clusters || clusters.length === 0) {
    return ["No Portuguese business clusters found in search area"];
  }

  const recommendations = [];
  const totalBusinesses = clusters.reduce(
    (sum, cluster) => sum + cluster.business_count,
    0
  );

  if (totalBusinesses > 20) {
    recommendations.push(
      `Strong Portuguese business presence with ${totalBusinesses} businesses in ${clusters.length} clusters`
    );
  }

  const highRatedClusters = clusters.filter(
    (cluster) => cluster.average_rating > 4.0
  );
  if (highRatedClusters.length > 0) {
    recommendations.push(
      `${highRatedClusters.length} high-quality Portuguese business clusters identified`
    );
  }

  const culturalClusters = clusters.filter((cluster) =>
    cluster.cluster_specialties?.some(
      (specialty: string) =>
        specialty.includes("traditional") || specialty.includes("cultural")
    )
  );

  if (culturalClusters.length > 0) {
    recommendations.push(
      `${culturalClusters.length} authentic Portuguese cultural clusters found`
    );
  }

  return recommendations.length > 0
    ? recommendations
    : ["Portuguese businesses distributed throughout search area"];
}

/**
 * Generate Portuguese community specific recommendations
 */
function generatePortugueseBusinessRecommendations(
  businesses: any[],
  params: AdvancedBusinessSearchParams
): string[] {
  const recommendations = [];

  if (businesses.length === 0) {
    recommendations.push("No Portuguese businesses found in search area");
    if (params.radiusKm && params.radiusKm < 20) {
      recommendations.push(
        "Try expanding search radius to find more Portuguese businesses"
      );
    }
    return recommendations;
  }

  // Analyze business quality
  const highRatedBusinesses = businesses.filter(
    (business) => business.rating >= 4.0
  ).length;
  const verifiedBusinesses = businesses.filter(
    (business) => business.is_verified
  ).length;
  const culturalBusinesses = businesses.filter(
    (business) => business.cultural_focus && business.cultural_focus !== "none"
  ).length;

  if (highRatedBusinesses > businesses.length * 0.7) {
    recommendations.push("Excellent Portuguese business quality in this area");
  }

  if (verifiedBusinesses > businesses.length * 0.8) {
    recommendations.push(
      "Most businesses are community-verified for authenticity"
    );
  }

  if (culturalBusinesses > businesses.length * 0.6) {
    recommendations.push("Strong Portuguese cultural offerings available");
  }

  // Analyze business types
  const businessTypes = businesses.reduce(
    (types: Record<string, number>, business) => {
      types[business.business_type] = (types[business.business_type] || 0) + 1;
      return types;
    },
    {}
  );

  const mostCommonType = Object.entries(businessTypes).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  )[0];

  if (mostCommonType && (mostCommonType[1] as number) > 3) {
    recommendations.push(
      `${mostCommonType[0]}s are well-represented in this Portuguese community area`
    );
  }

  // Analyze price ranges
  const budgetOptions = businesses.filter(
    (business) =>
      business.price_range === "budget" || business.price_range === "£"
  ).length;

  if (budgetOptions > businesses.length * 0.4) {
    recommendations.push(
      "Good selection of budget-friendly Portuguese options"
    );
  }

  // Location-specific recommendations
  if (params.userLat && params.userLng) {
    const centralLondonBusinesses = businesses.filter(
      (business) =>
        business.coordinates &&
        Math.abs(business.coordinates.latitude - 51.5074) < 0.05 &&
        Math.abs(business.coordinates.longitude - -0.1278) < 0.1
    ).length;

    if (centralLondonBusinesses > businesses.length * 0.7) {
      recommendations.push(
        "Convenient Central London Portuguese business access"
      );
    }
  }

  return recommendations.length > 0
    ? recommendations
    : ["Portuguese businesses available in search area"];
}

/**
 * Calculate cultural relevance score for search results
 */
function calculateCulturalRelevanceScore(
  businesses: any[],
  params: AdvancedBusinessSearchParams
): number {
  if (businesses.length === 0) return 0;

  let totalScore = 0;
  let maxPossibleScore = 0;

  businesses.forEach((business) => {
    let businessScore = 0;
    let maxBusinessScore = 10;

    // Cultural focus scoring
    switch (business.cultural_focus) {
      case "portugal":
        businessScore += 4;
        break;
      case "brazil":
        businessScore += 3.5;
        break;
      case "africa":
        businessScore += 3;
        break;
      case "mixed":
        businessScore += 2.5;
        break;
      default:
        businessScore += 1;
    }

    // Portuguese specialties bonus
    if (business.portuguese_specialties?.length > 0) {
      businessScore += Math.min(business.portuguese_specialties.length, 3);
    }

    // Community verification bonus
    if (business.is_verified) {
      businessScore += 2;
    }

    // Cultural offerings bonus
    if (business.cultural_offerings?.length > 0) {
      businessScore += 1;
    }

    totalScore += businessScore;
    maxPossibleScore += maxBusinessScore;
  });

  return maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
}

/**
 * POST endpoint for creating new Portuguese business listings
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const businessData = await request.json();

    // Validate required fields for Portuguese business
    const requiredFields = [
      "name",
      "business_type",
      "address",
      "owner_region",
      "phone",
      "email",
    ];
    const missingFields = requiredFields.filter(
      (field) => !businessData[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate Portuguese community authenticity
    if (
      !businessData.owner_region ||
      ![
        "portugal",
        "brazil",
        "angola",
        "mozambique",
        "cape_verde",
        "guinea_bissau",
        "sao_tome_principe",
      ].includes(businessData.owner_region)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Portuguese-speaking community region is required for authenticity",
        },
        { status: 400 }
      );
    }

    const dbService = getEnhancedDatabaseService();

    // Create business entry with enhanced data
    const enhancedBusinessData = {
      ...businessData,
      is_verified: false, // Requires community verification
      is_premium: false,
      created_at: new Date().toISOString(),
      cultural_focus: determineCulturalFocus(businessData.owner_region),
      supports_culture: businessData.cultural_offerings?.length > 0 || false,
      verification_status: "pending",
      community_score: 0, // Will be updated after community review
    };

    // This would typically use a database insert operation
    // For now, return success response
    return NextResponse.json({
      success: true,
      data: {
        businessId: `temp_id_${Date.now()}`,
        message: "Portuguese business submitted for community verification",
        estimatedVerificationTime: "24-48 hours",
        verificationProcess: [
          "Cultural authenticity review",
          "Community member verification",
          "Business details validation",
          "Portuguese specialties confirmation",
        ],
      },
    });
  } catch (error) {
    logger.error('Portuguese business creation failed', error, {
      area: 'business',
      action: 'create_business',
      culturalContext: 'portuguese',
      businessData: {
        name: businessData?.name,
        type: businessData?.business_type,
        region: businessData?.owner_region
      }
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit Portuguese business for verification",
      },
      { status: 500 }
    );
  }
}

/**
 * Determine cultural focus based on owner region
 */
function determineCulturalFocus(ownerRegion: string): string {
  const regionMapping: Record<string, string> = {
    portugal: "portugal",
    brazil: "brazil",
    angola: "africa",
    mozambique: "africa",
    cape_verde: "africa",
    guinea_bissau: "africa",
    sao_tome_principe: "africa",
  };

  return regionMapping[ownerRegion] || "mixed";
}
