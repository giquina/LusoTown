import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { securityLogger } from '@/lib/security/comprehensive-security';

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Admin-only security dashboard API
export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    // Authentication check for admin users only
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, permissions')
      .eq('id', user.id)
      .single();
    
    if (profileError || !profile || profile.role !== 'admin') {
      await securityLogger.logSecurityEvent({
        userId: user.id,
        ip,
        userAgent,
        eventType: 'UNAUTHORIZED_API_ACCESS',
        severity: 'HIGH',
        description: `Non-admin user attempted to access security dashboard`,
        culturalContext: 'portuguese-uk',
        metadata: { endpoint: '/api/admin/security-dashboard' }
      });
      
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    const severity = searchParams.get('severity') || 'all';
    const eventType = searchParams.get('eventType') || 'all';
    
    // Calculate time range
    const now = new Date();
    const timeRanges = {
      '1h': new Date(now.getTime() - 60 * 60 * 1000),
      '24h': new Date(now.getTime() - 24 * 60 * 60 * 1000),
      '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    };
    
    const startTime = timeRanges[timeframe as keyof typeof timeRanges] || timeRanges['24h'];
    
    // Build security events query
    let securityQuery = supabase
      .from('security_audit_log')
      .select(`
        id,
        user_id,
        ip_address,
        user_agent,
        event_type,
        severity,
        description,
        cultural_context,
        metadata,
        created_at,
        profiles!left (
          email,
          first_name,
          last_name
        )
      `)
      .gte('created_at', startTime.toISOString())
      .order('created_at', { ascending: false });
    
    // Apply filters
    if (severity !== 'all') {
      securityQuery = securityQuery.eq('severity', severity.toUpperCase());
    }
    
    if (eventType !== 'all') {
      securityQuery = securityQuery.eq('event_type', eventType.toUpperCase());
    }
    
    // Limit results for performance
    securityQuery = securityQuery.limit(500);
    
    const { data: securityEvents, error: eventsError } = await securityQuery;
    
    if (eventsError) {
      throw eventsError;
    }
    
    // Get security statistics
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_security_stats', {
        start_date: startTime.toISOString(),
        end_date: now.toISOString()
      });
    
    if (statsError) {
      console.error('Error fetching security stats:', statsError);
    }
    
    // Get top threat IPs
    const { data: topThreats, error: threatsError } = await supabase
      .from('security_audit_log')
      .select('ip_address, severity, count(*)')
      .gte('created_at', startTime.toISOString())
      .in('severity', ['HIGH', 'CRITICAL'])
      .group('ip_address, severity')
      .order('count', { ascending: false })
      .limit(10);
    
    if (threatsError) {
      console.error('Error fetching threat data:', threatsError);
    }
    
    // Get failed login attempts
    const { data: failedLogins, error: loginsError } = await supabase
      .from('failed_login_attempts')
      .select('ip_address, email, attempt_count, blocked_until, attempt_time')
      .gte('attempt_time', startTime.toISOString())
      .order('attempt_time', { ascending: false })
      .limit(100);
    
    if (loginsError) {
      console.error('Error fetching failed logins:', loginsError);
    }
    
    // Get active sessions count
    const { data: activeSessions, error: sessionsError } = await supabase
      .from('user_sessions')
      .select('count(*)')
      .eq('is_active', true)
      .gt('expires_at', now.toISOString());
    
    if (sessionsError) {
      console.error('Error fetching session data:', sessionsError);
    }
    
    // Calculate security metrics
    const securityMetrics = {
      totalEvents: securityEvents?.length || 0,
      criticalEvents: securityEvents?.filter(e => e.severity === 'CRITICAL').length || 0,
      highSeverityEvents: securityEvents?.filter(e => e.severity === 'HIGH').length || 0,
      mediumSeverityEvents: securityEvents?.filter(e => e.severity === 'MEDIUM').length || 0,
      lowSeverityEvents: securityEvents?.filter(e => e.severity === 'LOW').length || 0,
      
      // Event type breakdown
      loginAttempts: securityEvents?.filter(e => e.event_type === 'LOGIN_ATTEMPT').length || 0,
      rateLimitExceeded: securityEvents?.filter(e => e.event_type === 'RATE_LIMIT_EXCEEDED').length || 0,
      xssAttempts: securityEvents?.filter(e => e.event_type === 'XSS_ATTEMPT').length || 0,
      sqlInjectionAttempts: securityEvents?.filter(e => e.event_type === 'SQL_INJECTION_ATTEMPT').length || 0,
      csrfFailures: securityEvents?.filter(e => e.event_type === 'FAILED_CSRF').length || 0,
      
      // Cultural context breakdown
      portugueseContext: securityEvents?.filter(e => e.cultural_context === 'portuguese-uk').length || 0,
      generalContext: securityEvents?.filter(e => e.cultural_context === 'general').length || 0,
      
      // Time-based metrics
      eventsLastHour: securityEvents?.filter(e => 
        new Date(e.created_at) > new Date(now.getTime() - 60 * 60 * 1000)
      ).length || 0,
      
      // Additional metrics
      uniqueIPs: new Set(securityEvents?.map(e => e.ip_address) || []).size,
      activeSessions: activeSessions?.[0]?.count || 0,
      blockedIPs: failedLogins?.filter(f => f.blocked_until && new Date(f.blocked_until) > now).length || 0
    };
    
    // Detect security trends
    const hourlyBreakdown = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(now.getTime() - (i * 60 * 60 * 1000));
      const hourStart = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours(), 0, 0);
      const hourEnd = new Date(hour.getFullYear(), hour.getMonth(), hour.getDate(), hour.getHours(), 59, 59);
      
      const eventsInHour = securityEvents?.filter(e => {
        const eventTime = new Date(e.created_at);
        return eventTime >= hourStart && eventTime <= hourEnd;
      }).length || 0;
      
      return {
        hour: hourStart.toISOString(),
        eventCount: eventsInHour,
        criticalCount: securityEvents?.filter(e => {
          const eventTime = new Date(e.created_at);
          return eventTime >= hourStart && eventTime <= hourEnd && e.severity === 'CRITICAL';
        }).length || 0
      };
    }).reverse();
    
    // Security recommendations based on current threats
    const recommendations = [];
    
    if (securityMetrics.criticalEvents > 0) {
      recommendations.push({
        priority: 'CRITICAL',
        message: `${securityMetrics.criticalEvents} critical security events detected. Immediate attention required.`,
        action: 'Review critical events and consider blocking suspicious IPs'
      });
    }
    
    if (securityMetrics.sqlInjectionAttempts > 5) {
      recommendations.push({
        priority: 'HIGH',
        message: `${securityMetrics.sqlInjectionAttempts} SQL injection attempts detected.`,
        action: 'Review and enhance input validation for Portuguese business submissions'
      });
    }
    
    if (securityMetrics.rateLimitExceeded > 50) {
      recommendations.push({
        priority: 'MEDIUM',
        message: `High rate limiting activity detected (${securityMetrics.rateLimitExceeded} events).`,
        action: 'Consider reducing rate limits for sensitive endpoints'
      });
    }
    
    if (securityMetrics.blockedIPs > 10) {
      recommendations.push({
        priority: 'MEDIUM',
        message: `${securityMetrics.blockedIPs} IP addresses currently blocked.`,
        action: 'Review blocked IPs and consider permanent banning for repeat offenders'
      });
    }
    
    // Log admin dashboard access
    await securityLogger.logSecurityEvent({
      userId: user.id,
      ip,
      userAgent,
      eventType: 'DATA_ACCESS',
      severity: 'LOW',
      description: 'Admin accessed security dashboard',
      culturalContext: 'portuguese-uk',
      metadata: { 
        timeframe,
        severity,
        eventType,
        eventsReturned: securityEvents?.length || 0
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        metrics: securityMetrics,
        events: securityEvents?.slice(0, 50) || [], // Limit for performance
        hourlyBreakdown,
        topThreats: topThreats || [],
        failedLogins: failedLogins?.slice(0, 20) || [],
        recommendations,
        filters: {
          timeframe,
          severity,
          eventType
        },
        meta: {
          totalEvents: securityEvents?.length || 0,
          startTime: startTime.toISOString(),
          endTime: now.toISOString(),
          queryExecutedAt: now.toISOString()
        }
      }
    });
    
  } catch (error) {
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'SUSPICIOUS_ACTIVITY',
      severity: 'HIGH',
      description: `Security dashboard API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: { endpoint: '/api/admin/security-dashboard' }
    });
    
    console.error('Security dashboard API error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Security dashboard temporarily unavailable'
      },
      { status: 500 }
    );
  }
}

// POST endpoint for security actions (blocking IPs, clearing events, etc.)
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    // Authentication and authorization check (same as GET)
    const supabase = getSupabaseClient();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profileError || !profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { action, targetIP, eventIds } = body;
    
    switch (action) {
      case 'block_ip':
        if (!targetIP) {
          return NextResponse.json(
            { error: 'Target IP required for blocking' },
            { status: 400 }
          );
        }
        
        // Add IP to blocked list
        const blockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        const { error: blockError } = await supabase
          .from('failed_login_attempts')
          .insert([{
            ip_address: targetIP,
            blocked_until: blockUntil.toISOString(),
            attempt_count: 999, // Mark as admin blocked
            user_agent: 'Admin blocked',
            cultural_context: 'admin-action'
          }]);
        
        if (blockError) {
          throw blockError;
        }
        
        await securityLogger.logSecurityEvent({
          userId: user.id,
          ip,
          userAgent,
          eventType: 'SUSPICIOUS_ACTIVITY',
          severity: 'HIGH',
          description: `Admin blocked IP address: ${targetIP}`,
          culturalContext: 'portuguese-uk',
          metadata: { 
            action: 'block_ip',
            targetIP,
            blockUntil: blockUntil.toISOString()
          }
        });
        
        return NextResponse.json({
          success: true,
          message: `IP ${targetIP} blocked for 24 hours`
        });
        
      case 'clear_events':
        if (!eventIds || !Array.isArray(eventIds)) {
          return NextResponse.json(
            { error: 'Event IDs array required' },
            { status: 400 }
          );
        }
        
        // Mark events as reviewed (soft delete)
        const { error: clearError } = await supabase
          .from('security_audit_log')
          .update({ 
            metadata: { ...{}, reviewed: true, reviewedBy: user.id, reviewedAt: new Date().toISOString() }
          })
          .in('id', eventIds);
        
        if (clearError) {
          throw clearError;
        }
        
        await securityLogger.logSecurityEvent({
          userId: user.id,
          ip,
          userAgent,
          eventType: 'DATA_ACCESS',
          severity: 'LOW',
          description: `Admin cleared ${eventIds.length} security events`,
          culturalContext: 'portuguese-uk',
          metadata: { action: 'clear_events', eventCount: eventIds.length }
        });
        
        return NextResponse.json({
          success: true,
          message: `${eventIds.length} events marked as reviewed`
        });
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('Security dashboard action error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Security action failed'
      },
      { status: 500 }
    );
  }
}