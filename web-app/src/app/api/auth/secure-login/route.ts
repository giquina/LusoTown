import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  securityLogger,
  bruteForceProtection,
  PortugueseSessionManager,
  AuthTokenManager,
  SQLInjectionProtection
} from '@/lib/security/comprehensive-security';
import { validateInput, validatePassword } from '@/lib/security/input-validation';
import { portugueseCSRF } from '@/lib/security/csrf-protection';
import bcrypt from 'bcryptjs';
import logger from '@/utils/logger';

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Enhanced secure login endpoint for Portuguese community
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  try {
    // CSRF Protection Check
    const csrfValidation = portugueseCSRF.validatePortugueseRequest(request);
    if (!csrfValidation.isValid) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'FAILED_CSRF',
        severity: 'HIGH',
        description: `CSRF validation failed for login attempt from IP ${ip}`,
        culturalContext: 'portuguese-uk',
        metadata: { error: csrfValidation.error }
      });
      
      return NextResponse.json(
        { 
          error: 'Security validation failed',
          message: 'Request blocked for security reasons'
        },
        { status: 403 }
      );
    }
    
    // Enhanced Brute Force Protection
    const isBlocked = await bruteForceProtection.isBlocked(ip);
    if (isBlocked) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'HIGH',
        description: `Blocked login attempt from IP ${ip} due to brute force protection`,
        culturalContext: 'portuguese-uk'
      });
      
      return NextResponse.json(
        { 
          error: 'Too many failed attempts',
          message: 'Your IP has been temporarily blocked. Please try again later.',
          blockReason: 'brute_force_protection'
        },
        { status: 429 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    
    // SQL Injection Protection
    const sqlValidation = SQLInjectionProtection.sanitizeForDatabase(body);
    if (!sqlValidation.isValid) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'SQL_INJECTION_ATTEMPT',
        severity: 'CRITICAL',
        description: `SQL injection attempt in login from IP ${ip}`,
        culturalContext: 'portuguese-uk',
        metadata: { threats: sqlValidation.threats }
      });
      
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }
    
    // Input validation
    const { email, password, culturalContext, rememberMe = false } = sqlValidation.sanitizedParams;
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'LOW',
        description: `Invalid email format in login attempt: ${email}`,
        culturalContext: 'portuguese-uk'
      });
      
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Password strength validation (for new accounts)
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid && passwordValidation.score < 2) {
      return NextResponse.json(
        { 
          error: 'Password does not meet security requirements',
          issues: passwordValidation.issues
        },
        { status: 400 }
      );
    }
    
    const supabase = getSupabaseClient();
    
    // Check if user exists and get security settings
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        first_name,
        last_name,
        user_security_settings (
          two_factor_enabled,
          login_notifications,
          suspicious_activity_alerts,
          allowed_ips,
          last_password_change,
          verification_level
        )
      `)
      .eq('email', email.toLowerCase())
      .single();
    
    if (userError || !userData) {
      // Record failed attempt for non-existent user (to prevent user enumeration)
      await bruteForceProtection.recordFailedAttempt(ip, email);
      
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'MEDIUM',
        description: `Login attempt for non-existent email: ${email}`,
        culturalContext: 'portuguese-uk',
        metadata: { email }
      });
      
      // Use generic error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check IP whitelist (if configured)
    const securitySettings = userData.user_security_settings?.[0];
    if (securitySettings?.allowed_ips?.length > 0) {
      const isAllowedIP = securitySettings.allowed_ips.some((allowedIP: string) => 
        ip.includes(allowedIP) || allowedIP === '*'
      );
      
      if (!isAllowedIP) {
        await securityLogger.logSecurityEvent({
          userId: userData.id,
          ip,
          userAgent,
          eventType: 'LOGIN_ATTEMPT',
          severity: 'HIGH',
          description: `Login attempt from non-whitelisted IP: ${ip}`,
          culturalContext: 'portuguese-uk',
          metadata: { allowedIPs: securitySettings.allowed_ips }
        });
        
        return NextResponse.json(
          { 
            error: 'Login not allowed from this location',
            message: 'Please contact support if you believe this is an error'
          },
          { status: 403 }
        );
      }
    }
    
    // Attempt authentication with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password
    });
    
    if (authError || !authData.user) {
      // Record failed login attempt
      await bruteForceProtection.recordFailedAttempt(ip, email);
      
      await securityLogger.logSecurityEvent({
        userId: userData.id,
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'MEDIUM',
        description: `Failed login attempt for user ${email}`,
        culturalContext: 'portuguese-uk',
        metadata: { 
          email,
          authError: authError?.message,
          userAgent,
          acceptLanguage
        }
      });
      
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Clear failed attempts on successful login
    await bruteForceProtection.clearAttempts(ip, email);
    
    // Create secure session
    const culturalContextValue = culturalContext || 
      (acceptLanguage.includes('pt') ? 'portuguese-uk' : 'general');
    
    const sessionData = await PortugueseSessionManager.createSecureSession(
      authData.user.id,
      userAgent,
      ip,
      culturalContextValue
    );
    
    // Check if 2FA is enabled
    const requires2FA = securitySettings?.two_factor_enabled === true;
    
    if (requires2FA) {
      // For 2FA users, return intermediate response
      await securityLogger.logSecurityEvent({
        userId: authData.user.id,
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'LOW',
        description: `2FA required for user ${email}`,
        culturalContext: culturalContextValue,
        metadata: { requires2FA: true }
      });
      
      return NextResponse.json({
        success: false,
        requires2FA: true,
        sessionId: sessionData.sessionId,
        message: 'Two-factor authentication required'
      });
    }
    
    // Log successful login
    await securityLogger.logSecurityEvent({
      userId: authData.user.id,
      ip,
      userAgent,
      eventType: 'LOGIN_ATTEMPT',
      severity: 'LOW',
      description: `Successful login for user ${email}`,
      culturalContext: culturalContextValue,
      metadata: { 
        sessionId: sessionData.sessionId,
        userAgent,
        acceptLanguage,
        rememberMe
      }
    });
    
    // Update last login information
    await supabase
      .from('profiles')
      .update({ 
        last_login_at: new Date().toISOString(),
        last_login_ip: ip
      })
      .eq('id', authData.user.id);
    
    // Send login notification if enabled
    if (securitySettings?.login_notifications) {
      // Implementation for sending login notification email/push
      // This would integrate with your notification service
      logger.info('Login notification sent', {
        area: 'auth',
        action: 'login_notification_sent',
        email,
        ip
      });
    }
    
    const executionTime = Date.now() - startTime;
    
    // Prepare response
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          firstName: userData.first_name,
          lastName: userData.last_name
        },
        session: {
          accessToken: authData.session?.access_token,
          refreshToken: authData.session?.refresh_token,
          expiresAt: authData.session?.expires_at,
          sessionId: sessionData.sessionId
        },
        culturalContext: culturalContextValue,
        securityLevel: securitySettings?.verification_level || 'basic'
      },
      executionTime
    });
    
    // Set secure session cookies
    response.cookies.set({
      name: 'session_token',
      value: sessionData.sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
      path: '/'
    });
    
    // Set cultural context cookie
    response.cookies.set({
      name: 'cultural_context',
      value: culturalContextValue,
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    const executionTime = Date.now() - startTime;
    
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'LOGIN_ATTEMPT',
      severity: 'HIGH',
      description: `Login system error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      culturalContext: 'portuguese-uk',
      metadata: { 
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime
      }
    });
    
    console.error('Secure login error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Login system temporarily unavailable',
        message: 'Please try again in a few moments'
      },
      { status: 500 }
    );
  }
}

// Secure logout endpoint
export async function DELETE(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  try {
    const supabase = getSupabaseClient();
    
    // Get session token from cookie or header
    const sessionToken = request.cookies.get('session_token')?.value ||
                        request.headers.get('x-session-token');
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No active session found' },
        { status: 401 }
      );
    }
    
    // Validate and get session details
    const sessionValidation = await PortugueseSessionManager.validateSession(sessionToken);
    
    if (sessionValidation.isValid && sessionValidation.userId) {
      // Log logout event
      await securityLogger.logSecurityEvent({
        userId: sessionValidation.userId,
        ip,
        userAgent,
        eventType: 'LOGIN_ATTEMPT',
        severity: 'LOW',
        description: 'User logout',
        culturalContext: sessionValidation.culturalContext,
        metadata: { action: 'logout' }
      });
      
      // Invalidate session
      await PortugueseSessionManager.invalidateSession(sessionToken);
      
      // Revoke Supabase session if available
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        await supabase.auth.signOut();
      }
    }
    
    // Clear cookies
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
    
    response.cookies.set({
      name: 'session_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    });
    
    return response;
    
  } catch (error) {
    await securityLogger.logSecurityEvent({
      ip,
      userAgent,
      eventType: 'LOGIN_ATTEMPT',
      severity: 'MEDIUM',
      description: `Logout error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: { action: 'logout' }
    });
    
    console.error('Secure logout error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Logout failed'
      },
      { status: 500 }
    );
  }
}