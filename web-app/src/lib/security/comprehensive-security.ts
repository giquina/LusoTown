import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

// ===== SECURITY AUDIT LOGGING =====
interface SecurityEvent {
  userId?: string;
  ip: string;
  userAgent: string;
  eventType: 'LOGIN_ATTEMPT' | 'FAILED_CSRF' | 'RATE_LIMIT_EXCEEDED' | 'SUSPICIOUS_ACTIVITY' | 'XSS_ATTEMPT' | 'SQL_INJECTION_ATTEMPT' | 'FILE_UPLOAD' | 'DATA_ACCESS' | 'UNAUTHORIZED_API_ACCESS';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  culturalContext?: 'portuguese-uk' | 'general';
  metadata?: Record<string, any>;
  timestamp?: string;
}

class SecurityAuditLogger {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  async logSecurityEvent(event: Omit<SecurityEvent, "timestamp"> & { timestamp?: string }): Promise<void> {
    try {
      // Auto-generate timestamp if not provided
      const eventWithTimestamp = {
        ...event,
        timestamp: event.timestamp || new Date().toISOString()
      };
      // Log to Supabase for Portuguese community security tracking
      await this.supabase
        .from('security_audit_log')
        .insert([{
          user_id: event.userId,
          ip_address: event.ip,
          user_agent: event.userAgent,
          event_type: event.eventType,
          severity: event.severity,
          description: event.description,
          cultural_context: event.culturalContext || 'general',
          metadata: event.metadata || {},
          created_at: new Date().toISOString()
        }]);

      // Also log to console for immediate monitoring
      console.log(`[SECURITY] ${event.severity}: ${event.description}`, {
        ip: event.ip,
        type: event.eventType,
        culturalContext: event.culturalContext,
        metadata: event.metadata
      });

      // Alert for critical events
      if (event.severity === 'CRITICAL') {
        await this.sendSecurityAlert(event);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  private async sendSecurityAlert(event: SecurityEvent): Promise<void> {
    // Implementation for critical security alerts
    // Could integrate with email, Slack, or monitoring service
    console.error(`[CRITICAL SECURITY ALERT] ${event.description}`, event);
  }
}

export const securityLogger = new SecurityAuditLogger();

// ===== ENHANCED BRUTE FORCE PROTECTION =====
interface BruteForceAttempt {
  ip: string;
  email?: string;
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
  blockUntil?: number;
}

class BruteForceProtection {
  private redis?: Redis;
  private fallbackStore = new Map<string, BruteForceAttempt>();
  
  constructor() {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!
      });
    }
  }

  async recordFailedAttempt(ip: string, email?: string): Promise<void> {
    const key = `brute_force:${ip}${email ? `:${email}` : ''}`;
    const now = Date.now();

    try {
      if (this.redis) {
        const existing = await this.redis.get(key) as BruteForceAttempt | null;
        const attempt: BruteForceAttempt = {
          ip,
          email,
          attempts: (existing?.attempts || 0) + 1,
          lastAttempt: now,
          blocked: false
        };

        // Block after 5 failed attempts within 15 minutes
        if (attempt.attempts >= 5) {
          attempt.blocked = true;
          attempt.blockUntil = now + (30 * 60 * 1000); // Block for 30 minutes
        }

        await this.redis.setex(key, 3600, attempt); // Expire in 1 hour
      } else {
        // Fallback to memory store
        const existing = this.fallbackStore.get(key);
        const attempt: BruteForceAttempt = {
          ip,
          email,
          attempts: (existing?.attempts || 0) + 1,
          lastAttempt: now,
          blocked: false
        };

        if (attempt.attempts >= 5) {
          attempt.blocked = true;
          attempt.blockUntil = now + (30 * 60 * 1000);
        }

        this.fallbackStore.set(key, attempt);
      }

      // Log security event
      await securityLogger.logSecurityEvent({
        ip,
        userAgent: 'Unknown',
        eventType: 'LOGIN_ATTEMPT',
        severity: 'MEDIUM',
        description: `Failed login attempt${email ? ` for ${email}` : ''} from IP ${ip}`,
        culturalContext: email?.includes('@') ? 'portuguese-uk' : 'general',
        metadata: { email, attempts: (await this.getAttempts(ip, email))?.attempts }
      });
    } catch (error) {
      console.error('Failed to record brute force attempt:', error);
    }
  }

  async isBlocked(ip: string, email?: string): Promise<boolean> {
    const key = `brute_force:${ip}${email ? `:${email}` : ''}`;
    
    try {
      let attempt: BruteForceAttempt | null = null;
      
      if (this.redis) {
        attempt = await this.redis.get(key) as BruteForceAttempt | null;
      } else {
        attempt = this.fallbackStore.get(key) || null;
      }

      if (!attempt || !attempt.blocked) {
        return false;
      }

      // Check if block has expired
      if (attempt.blockUntil && Date.now() > attempt.blockUntil) {
        await this.clearAttempts(ip, email);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to check brute force status:', error);
      return false;
    }
  }

  async getAttempts(ip: string, email?: string): Promise<BruteForceAttempt | null> {
    const key = `brute_force:${ip}${email ? `:${email}` : ''}`;
    
    try {
      if (this.redis) {
        return await this.redis.get(key) as BruteForceAttempt | null;
      } else {
        return this.fallbackStore.get(key) || null;
      }
    } catch (error) {
      console.error('Failed to get brute force attempts:', error);
      return null;
    }
  }

  async clearAttempts(ip: string, email?: string): Promise<void> {
    const key = `brute_force:${ip}${email ? `:${email}` : ''}`;
    
    try {
      if (this.redis) {
        await this.redis.del(key);
      } else {
        this.fallbackStore.delete(key);
      }
    } catch (error) {
      console.error('Failed to clear brute force attempts:', error);
    }
  }
}

export const bruteForceProtection = new BruteForceProtection();

// ===== SQL INJECTION PREVENTION =====
export class SQLInjectionProtection {
  private static readonly DANGEROUS_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(\bUNION\s+SELECT\b)/gi,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
    /(['";])/g,
    /(\-\-|\#|\/\*|\*\/)/g,
    /(\bxp_cmdshell\b)/gi,
    /(\bsp_executesql\b)/gi,
    /(\beval\s*\()/gi,
    /(\bjavascript\s*:)/gi
  ];

  static validateInput(input: string, fieldName: string): {
    isValid: boolean;
    sanitizedInput: string;
    threats: string[];
  } {
    const threats: string[] = [];
    let sanitizedInput = input;

    // Check for dangerous patterns
    this.DANGEROUS_PATTERNS.forEach((pattern, index) => {
      if (pattern.test(input)) {
        threats.push(`Potential SQL injection pattern detected in ${fieldName}`);
        
        // Remove or neutralize dangerous content
        if (index < 3) { // SQL keywords and UNION
          sanitizedInput = sanitizedInput.replace(pattern, '[BLOCKED]');
        } else if (index < 5) { // Quotes and comments
          sanitizedInput = sanitizedInput.replace(pattern, '');
        } else { // Other dangerous patterns
          sanitizedInput = sanitizedInput.replace(pattern, '[BLOCKED]');
        }
      }
    });

    return {
      isValid: threats.length === 0,
      sanitizedInput: sanitizedInput.trim(),
      threats
    };
  }

  static sanitizeForDatabase(params: Record<string, any>): {
    sanitizedParams: Record<string, any>;
    threats: string[];
    isValid: boolean;
  } {
    const sanitizedParams: Record<string, any> = {};
    const allThreats: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const validation = this.validateInput(value, key);
        sanitizedParams[key] = validation.sanitizedInput;
        allThreats.push(...validation.threats);
      } else {
        sanitizedParams[key] = value;
      }
    });

    return {
      sanitizedParams,
      threats: allThreats,
      isValid: allThreats.length === 0
    };
  }
}

// ===== SECURE FILE UPLOAD SYSTEM =====
export class SecureFileUpload {
  private static readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'application/pdf',
    'text/plain'
  ];

  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly DANGEROUS_EXTENSIONS = [
    '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
    '.php', '.asp', '.aspx', '.jsp', '.pl', '.py', '.rb', '.sh'
  ];

  static validateFile(file: {
    name: string;
    size: number;
    type: string;
    buffer?: Buffer;
  }): {
    isValid: boolean;
    errors: string[];
    sanitizedName: string;
  } {
    const errors: string[] = [];
    
    // Validate file size
    if (file.size > this.MAX_FILE_SIZE) {
      errors.push(`File too large. Maximum size is ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    // Validate file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      errors.push(`File type ${file.type} not allowed`);
    }

    // Validate file extension
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (this.DANGEROUS_EXTENSIONS.includes(extension)) {
      errors.push(`File extension ${extension} not allowed`);
    }

    // Sanitize filename
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9\-_\.]/g, '_') // Replace special chars
      .replace(/\.+/g, '.') // Remove multiple dots
      .replace(/^\./, '') // Remove leading dot
      .substring(0, 100); // Limit length

    // Additional file content validation for images
    if (file.buffer && file.type.startsWith('image/')) {
      const contentValidation = this.validateImageContent(file.buffer);
      if (!contentValidation.isValid) {
        errors.push(...contentValidation.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedName
    };
  }

  private static validateImageContent(buffer: Buffer): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Check for common image file signatures
    const jpegSignature = buffer.subarray(0, 3);
    const pngSignature = buffer.subarray(0, 8);
    const webpSignature = buffer.subarray(0, 12);

    const isJPEG = jpegSignature[0] === 0xFF && jpegSignature[1] === 0xD8 && jpegSignature[2] === 0xFF;
    const isPNG = Buffer.compare(pngSignature, Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) === 0;
    const isWebP = buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP';

    if (!isJPEG && !isPNG && !isWebP) {
      errors.push('Invalid image file format or corrupted file');
    }

    // Check for embedded scripts in image metadata
    const contentString = buffer.toString('ascii').toLowerCase();
    const scriptPatterns = [
      '<script',
      'javascript:',
      'vbscript:',
      'onload=',
      'onerror=',
      'eval(',
      'document.',
      'window.'
    ];

    scriptPatterns.forEach(pattern => {
      if (contentString.includes(pattern)) {
        errors.push('Potentially malicious content detected in image');
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// ===== AUTHENTICATION TOKEN MANAGEMENT =====
export class AuthTokenManager {
  private static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
  private static readonly REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

  static generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  static validateTokenFormat(token: string): boolean {
    // JWT format validation
    if (token.split('.').length === 3) {
      return true;
    }
    
    // Custom token format validation
    return /^[a-f0-9]{64}$/i.test(token);
  }

  static async revokeToken(tokenId: string, reason: string): Promise<void> {
    // Implementation would store revoked tokens in database/Redis
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('revoked_tokens')
        .insert([{
          token_id: tokenId,
          revoked_at: new Date().toISOString(),
          reason: reason
        }]);
    } catch (error) {
      console.error('Failed to revoke token:', error);
    }
  }

  static async isTokenRevoked(tokenId: string): Promise<boolean> {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data, error } = await supabase
        .from('revoked_tokens')
        .select('token_id')
        .eq('token_id', tokenId)
        .single();

      return !!data && !error;
    } catch (error) {
      console.error('Failed to check token revocation:', error);
      return false;
    }
  }
}

// ===== SESSION MANAGEMENT FOR PORTUGUESE COMMUNITY =====
export class PortugueseSessionManager {
  private static readonly SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours for regular users
  private static readonly PREMIUM_SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours for premium users

  static async createSecureSession(userId: string, userAgent: string, ip: string, culturalContext?: string) {
    const sessionId = crypto.randomUUID();
    const sessionToken = AuthTokenManager.generateSecureToken();
    const expiresAt = new Date(Date.now() + this.SESSION_TIMEOUT);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('user_sessions')
        .insert([{
          session_id: sessionId,
          user_id: userId,
          session_token: sessionToken,
          user_agent: userAgent,
          ip_address: ip,
          cultural_context: culturalContext || 'general',
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        }]);

      return { sessionId, sessionToken, expiresAt };
    } catch (error) {
      console.error('Failed to create secure session:', error);
      throw new Error('Session creation failed');
    }
  }

  static async validateSession(sessionToken: string): Promise<{
    isValid: boolean;
    userId?: string;
    culturalContext?: string;
    shouldRefresh?: boolean;
  }> {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return { isValid: false };
      }

      // Update last activity
      await supabase
        .from('user_sessions')
        .update({ last_activity: new Date().toISOString() })
        .eq('session_id', data.session_id);

      // Check if session should be refreshed (less than 30 minutes remaining)
      const shouldRefresh = new Date(data.expires_at).getTime() - Date.now() < 30 * 60 * 1000;

      return {
        isValid: true,
        userId: data.user_id,
        culturalContext: data.cultural_context,
        shouldRefresh
      };
    } catch (error) {
      console.error('Failed to validate session:', error);
      return { isValid: false };
    }
  }

  static async invalidateSession(sessionToken: string): Promise<void> {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('user_sessions')
        .delete()
        .eq('session_token', sessionToken);
    } catch (error) {
      console.error('Failed to invalidate session:', error);
    }
  }
}

// ===== COMPREHENSIVE SECURITY MIDDLEWARE =====
export function createSecurityMiddleware() {
  return async (request: NextRequest) => {
    const startTime = Date.now();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const pathname = request.nextUrl.pathname;

    try {
      // Check for brute force attempts
      if (pathname.includes('/api/auth/') || pathname.includes('/login')) {
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
            { error: 'Too many failed attempts. Please try again later.' },
            { status: 429 }
          );
        }
      }

      // Validate request parameters for SQL injection
      if (request.method !== 'GET') {
        try {
          const body = await request.clone().json();
          const validation = SQLInjectionProtection.sanitizeForDatabase(body);
          
          if (!validation.isValid) {
            await securityLogger.logSecurityEvent({
              ip,
              userAgent,
              eventType: 'SQL_INJECTION_ATTEMPT',
              severity: 'CRITICAL',
              description: `Potential SQL injection attempt blocked from IP ${ip}`,
              metadata: { threats: validation.threats, path: pathname }
            });

            return NextResponse.json(
              { error: 'Invalid request parameters' },
              { status: 400 }
            );
          }
        } catch (e) {
          // Non-JSON request, continue
        }
      }

      // Enhanced security headers
      const response = NextResponse.next();
      
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-XSS-Protection', '1; mode=block');
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
      
      // Portuguese community specific headers
      response.headers.set('X-Cultural-Context', 'portuguese-uk');
      response.headers.set('X-Security-Level', 'enhanced');
      response.headers.set('X-Community-Protection', 'active');

      return response;
      
    } catch (error) {
      await securityLogger.logSecurityEvent({
        ip,
        userAgent,
        eventType: 'SUSPICIOUS_ACTIVITY',
        severity: 'MEDIUM',
        description: `Security middleware error for IP ${ip}`,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error', path: pathname }
      });

      return NextResponse.next();
    }
  };
}

// ===== SECURITY TESTING UTILITIES =====
export class SecurityTester {
  static async testXSSProtection(input: string): Promise<{
    blocked: boolean;
    threats: string[];
    sanitizedOutput: string;
  }> {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi
    ];

    const threats: string[] = [];
    let sanitizedOutput = input;

    xssPatterns.forEach(pattern => {
      if (pattern.test(input)) {
        threats.push('XSS pattern detected');
        sanitizedOutput = sanitizedOutput.replace(pattern, '[BLOCKED]');
      }
    });

    return {
      blocked: threats.length > 0,
      threats,
      sanitizedOutput
    };
  }

  static async testCSRFProtection(request: NextRequest): Promise<{
    protected: boolean;
    hasToken: boolean;
    tokenValid: boolean;
  }> {
    const csrfToken = request.headers.get('x-csrf-token');
    const csrfCookie = request.cookies.get('csrf-token')?.value;

    return {
      protected: request.method === 'GET' || !!csrfToken,
      hasToken: !!csrfToken,
      tokenValid: csrfToken === csrfCookie && !!csrfToken
    };
  }
}

// Export all security utilities
export {
  SecurityEvent,
  SecurityAuditLogger,
  BruteForceProtection,
  SQLInjectionProtection,
  SecureFileUpload,
  AuthTokenManager,
  PortugueseSessionManager,
  SecurityTester
};