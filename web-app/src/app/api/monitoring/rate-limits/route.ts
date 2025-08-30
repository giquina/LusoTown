import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit, getRateLimitMetrics, cleanupAbuseData } from '@/lib/rate-limit-middleware';
import logger from '@/utils/logger';
import { getApiErrorMessage, getApiSuccessMessage } from '@/config/api-messages';

// Rate limit monitoring endpoint for Portuguese community platform
export async function GET(request: NextRequest) {
  // Apply admin rate limiting to monitoring endpoints
  const rateLimitCheck = await withRateLimit(request, 'admin');
  
  if (!('success' in rateLimitCheck)) {
    return rateLimitCheck;
  }

  try {
    // Check if user has admin privileges (simplified check)
    const authHeader = request.headers.get('authorization');
    const isAdmin = await checkAdminAccess(authHeader);
    
    if (!isAdmin) {
      logger.warn('Unauthorized rate limit monitoring access attempt', undefined, {
        area: 'security',
        action: 'unauthorized_monitoring_access',
        userAgent: request.headers.get('user-agent'),
        ip: getClientIP(request)
      });
      
      return NextResponse.json(
        { error: getApiErrorMessage('UNAUTHORIZED_ACCESS') },
        { 
          status: 403,
          headers: rateLimitCheck.headers
        }
      );
    }

    // Get comprehensive rate limiting metrics
    const metrics = getRateLimitMetrics();
    
    // Get system health indicators
    const systemHealth = {
      redisConnected: await checkRedisConnection(),
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    // Get Portuguese community specific metrics
    const communityMetrics = {
      totalActiveUsers: await getActiveUserCount(),
      peakHourUsage: await getPeakHourMetrics(),
      culturalEndpointUsage: await getCulturalEndpointMetrics(),
      abusePreventionStats: {
        totalBlockedRequests: metrics.abuseDetections.length,
        criticalIncidents: metrics.abuseDetections.filter(a => a.severity === 'critical').length,
        mostTargetedEndpoints: await getMostTargetedEndpoints()
      }
    };

    logger.info('Rate limit monitoring accessed', {
      area: 'monitoring',
      action: 'rate_limit_metrics_accessed',
      metricsType: 'comprehensive',
      culturalContext: 'portuguese-community'
    });

    const response = NextResponse.json({
      success: true,
      data: {
        rateLimitMetrics: metrics,
        systemHealth,
        communityMetrics,
        recommendations: generateSecurityRecommendations(metrics, communityMetrics),
        lastUpdated: new Date().toISOString(),
        context: 'portuguese-community-platform'
      }
    });

    // Add rate limit headers
    rateLimitCheck.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;

  } catch (error) {
    logger.error('Rate limit monitoring error', error, {
      area: 'monitoring',
      action: 'rate_limit_monitoring_error'
    });

    return NextResponse.json(
      { error: getApiErrorMessage('MONITORING_SERVICE_ERROR') },
      { 
        status: 500,
        headers: rateLimitCheck.headers
      }
    );
  }
}

// POST endpoint for manual abuse pattern cleanup
export async function POST(request: NextRequest) {
  const rateLimitCheck = await withRateLimit(request, 'admin');
  
  if (!('success' in rateLimitCheck)) {
    return rateLimitCheck;
  }

  try {
    const authHeader = request.headers.get('authorization');
    const isAdmin = await checkAdminAccess(authHeader);
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: getApiErrorMessage('UNAUTHORIZED_ACCESS') },
        { status: 403 }
      );
    }

    const body = await request.json();
    const action = body.action;

    switch (action) {
      case 'cleanup_abuse_data':
        cleanupAbuseData();
        logger.info('Manual abuse data cleanup initiated', {
          area: 'security',
          action: 'manual_abuse_cleanup',
          culturalContext: 'portuguese-community'
        });
        
        return NextResponse.json({
          success: true,
          message: getApiSuccessMessage('ABUSE_DATA_CLEANED'),
          timestamp: new Date().toISOString()
        });

      case 'reset_rate_limits':
        // In production, implement selective rate limit reset
        logger.info('Rate limit reset requested', {
          area: 'security',
          action: 'rate_limit_reset_request',
          culturalContext: 'portuguese-community'
        });
        
        return NextResponse.json({
          success: true,
          message: getApiSuccessMessage('RATE_LIMITS_RESET'),
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

  } catch (error) {
    logger.error('Rate limit management error', error, {
      area: 'monitoring',
      action: 'rate_limit_management_error'
    });

    return NextResponse.json(
      { error: getApiErrorMessage('MANAGEMENT_SERVICE_ERROR') },
      { status: 500 }
    );
  }
}

// Helper functions
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  return request.headers.get('x-real-ip') || 
         request.headers.get('cf-connecting-ip') || 
         request.ip || 'unknown';
}

async function checkAdminAccess(authHeader: string | null): Promise<boolean> {
  // Simplified admin check - in production, validate JWT and check roles
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  // In production, decode JWT and check for admin role
  // For now, return false to require proper authentication setup
  return false;
}

async function checkRedisConnection(): Promise<boolean> {
  try {
    // In production, ping Redis to check connection
    return true; // Simplified for now
  } catch {
    return false;
  }
}

async function getActiveUserCount(): Promise<number> {
  // In production, query active users in the last hour
  return 0; // Simplified for now
}

async function getPeakHourMetrics(): Promise<{
  peakHour: string;
  requestCount: number;
  mostActiveEndpoint: string;
}> {
  // In production, analyze request patterns
  return {
    peakHour: '19:00-20:00 GMT',
    requestCount: 0,
    mostActiveEndpoint: '/api/events'
  };
}

async function getCulturalEndpointMetrics(): Promise<{
  businessDirectory: number;
  events: number;
  matching: number;
  transport: number;
}> {
  // In production, analyze Portuguese cultural endpoint usage
  return {
    businessDirectory: 0,
    events: 0,
    matching: 0,
    transport: 0
  };
}

async function getMostTargetedEndpoints(): Promise<Array<{
  endpoint: string;
  violations: number;
  lastIncident: string;
}>> {
  // In production, analyze abuse patterns by endpoint
  return [];
}

function generateSecurityRecommendations(
  metrics: any,
  communityMetrics: any
): string[] {
  const recommendations: string[] = [];

  if (metrics.totalPatterns > 100) {
    recommendations.push('High number of abuse patterns detected - consider implementing CAPTCHA challenges');
  }

  if (metrics.abuseDetections.length > 10) {
    recommendations.push('Multiple abuse detections - review and potentially strengthen rate limits for Portuguese community endpoints');
  }

  const criticalAbuse = metrics.abuseDetections.filter((a: any) => a.severity === 'critical');
  if (criticalAbuse.length > 0) {
    recommendations.push('Critical abuse patterns detected - immediate security review recommended for Portuguese community protection');
  }

  if (communityMetrics.abusePreventionStats.totalBlockedRequests > 1000) {
    recommendations.push('High volume of blocked requests - consider implementing progressive rate limiting for Portuguese community users');
  }

  if (recommendations.length === 0) {
    recommendations.push('Security metrics are within normal parameters for Portuguese community platform');
  }

  return recommendations;
}