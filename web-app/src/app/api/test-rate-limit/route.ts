import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/rate-limit-middleware';
import { getRateLimitStatus, RateLimitType, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { getPortugueseCommunitySecurityStats } from '@/lib/rate-limit-monitoring';

// Test endpoint for Portuguese community rate limiting functionality
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testType = searchParams.get('type') as RateLimitType || 'general';
  const action = searchParams.get('action') || 'test';
  
  if (action === 'status') {
    // Get current rate limit status without incrementing
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const status = await getRateLimitStatus(`ip:${clientIP}`, testType);
    
    return NextResponse.json({
      rateLimitType: testType,
      status,
      config: RATE_LIMIT_CONFIGS[testType],
      clientIP: `${clientIP.substring(0, 8)}***`,
      timestamp: new Date().toISOString(),
    });
  }
  
  if (action === 'stats') {
    // Get Portuguese community security statistics
    const stats = getPortugueseCommunitySecurityStats();
    
    return NextResponse.json({
      ...stats,
      availableEndpoints: Object.keys(RATE_LIMIT_CONFIGS),
      culturalContext: 'portuguese-speaking-community',
    });
  }
  
  // Default: Test rate limiting
  const rateLimitCheck = await withRateLimit(request, testType);
  
  if (!('success' in rateLimitCheck)) {
    return rateLimitCheck; // Return rate limit error response
  }
  
  const response = NextResponse.json({
    success: true,
    message: `Rate limit test passed for ${testType}`,
    rateLimitType: testType,
    config: RATE_LIMIT_CONFIGS[testType],
    headers: Object.fromEntries(rateLimitCheck.headers.entries()),
    timestamp: new Date().toISOString(),
    culturalContext: 'portuguese-speaking-community',
    testInstructions: {
      rapidTest: `Send multiple requests quickly to test rate limiting`,
      statusCheck: `Add ?action=status to check current limits`,
      statsCheck: `Add ?action=stats to see community security stats`,
      typeTest: `Add ?type=business-directory to test specific endpoint limits`,
    },
  });
  
  // Add rate limit headers
  rateLimitCheck.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  return response;
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testType = searchParams.get('type') as RateLimitType || 'general';
  
  // Test with stricter rate limiting for POST requests
  const rateLimitCheck = await withRateLimit(request, testType);
  
  if (!('success' in rateLimitCheck)) {
    return rateLimitCheck;
  }
  
  const body = await request.json();
  
  const response = NextResponse.json({
    success: true,
    message: `POST rate limit test passed for ${testType}`,
    receivedData: body,
    rateLimitType: testType,
    config: RATE_LIMIT_CONFIGS[testType],
    timestamp: new Date().toISOString(),
  });
  
  rateLimitCheck.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  return response;
}