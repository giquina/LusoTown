// Comprehensive Security Configuration for Portuguese Community Platform
// This file centralizes all security settings and constants

export const SECURITY_CONFIG = {
  // Rate Limiting Configuration
  RATE_LIMITS: {
    // Authentication endpoints - strictest limits
    AUTH: {
      windowMs: 60000, // 1 minute
      maxRequests: 5,   // 5 attempts per minute
      blockDuration: 30 * 60 * 1000, // 30 minutes block
    },
    
    // File upload endpoints
    UPLOAD: {
      windowMs: 300000, // 5 minutes
      maxRequests: 5,   // 5 uploads per 5 minutes
      blockDuration: 60 * 60 * 1000, // 1 hour block
    },
    
    // Portuguese business directory
    BUSINESS_DIRECTORY: {
      windowMs: 60000,  // 1 minute
      maxRequests: 60,  // 60 requests per minute
      blockDuration: 5 * 60 * 1000, // 5 minutes block
    },
    
    // Community messaging
    MESSAGING: {
      windowMs: 60000,  // 1 minute
      maxRequests: 30,  // 30 messages per minute
      blockDuration: 10 * 60 * 1000, // 10 minutes block
    },
    
    // Event management
    EVENTS: {
      windowMs: 60000,  // 1 minute
      maxRequests: 40,  // 40 requests per minute
      blockDuration: 5 * 60 * 1000, // 5 minutes block
    },
    
    // General API endpoints
    API_GENERAL: {
      windowMs: 60000,  // 1 minute
      maxRequests: 100, // 100 requests per minute
      blockDuration: 2 * 60 * 1000, // 2 minutes block
    },
    
    // Public pages
    PAGES: {
      windowMs: 60000,  // 1 minute
      maxRequests: 1000, // 1000 page views per minute
      blockDuration: 60 * 1000, // 1 minute block
    }
  },

  // Brute Force Protection
  BRUTE_FORCE: {
    MAX_ATTEMPTS: 5,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    BLOCK_DURATION: 30 * 60 * 1000, // 30 minutes
    PROGRESSIVE_DELAY: true,
    PROGRESSIVE_MULTIPLIER: 2,
  },

  // Session Management
  SESSION: {
    // Regular users
    DEFAULT_TIMEOUT: 2 * 60 * 60 * 1000, // 2 hours
    
    // Premium users get longer sessions
    PREMIUM_TIMEOUT: 8 * 60 * 60 * 1000, // 8 hours
    
    // Remember me functionality
    REMEMBER_ME_TIMEOUT: 30 * 24 * 60 * 60 * 1000, // 30 days
    
    // Session refresh threshold
    REFRESH_THRESHOLD: 30 * 60 * 1000, // Refresh if less than 30 minutes remaining
    
    // Cookie settings
    COOKIE: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    }
  },

  // File Upload Security
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB maximum file size
    
    ALLOWED_TYPES: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/pdf',
      'text/plain'
    ],
    
    BLOCKED_EXTENSIONS: [
      '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar',
      '.php', '.asp', '.aspx', '.jsp', '.pl', '.py', '.rb', '.sh', '.ps1'
    ],
    
    // Virus scanning settings (if implemented)
    SCAN_ENABLED: process.env.NODE_ENV === 'production',
    QUARANTINE_SUSPICIOUS: true,
    
    // Content validation
    CHECK_FILE_SIGNATURES: true,
    VALIDATE_IMAGE_CONTENT: true,
    SCAN_FOR_EMBEDDED_SCRIPTS: true,
  },

  // CSRF Protection
  CSRF: {
    TOKEN_LENGTH: 32,
    COOKIE_NAME: 'lusotown-csrf-token',
    HEADER_NAME: 'x-lusotown-csrf-token',
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'strict' as const,
    MAX_AGE: 60 * 60 * 24, // 24 hours
    
    // Portuguese-specific CSRF settings
    PORTUGUESE_COOKIE_NAME: 'lusotown-pt-csrf',
    PORTUGUESE_HEADER_NAME: 'x-portuguese-csrf-token',
  },

  // Input Validation
  INPUT_VALIDATION: {
    // Text content limits
    MAX_TEXT_LENGTH: 5000,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 255,
    MAX_URL_LENGTH: 2048,
    
    // Portuguese-specific patterns
    PORTUGUESE_PATTERNS: {
      NAME: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s'-]{1,100}$/,
      CULTURAL_TEXT: /^(?!.*(<script|javascript:|vbscript:|data:text\/html|<iframe|<object))[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.,!?()'":;\-@#$%&+=\[\]{}|\\\/\n\r\t]{1,5000}$/i,
      POSTAL_CODE_PT: /^\d{4}-\d{3}$/, // Portuguese postal code
      POSTAL_CODE_UK: /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i, // UK postcode
      PHONE_PT: /^\+351\s?\d{3}\s?\d{3}\s?\d{3}$/, // Portuguese phone
      PHONE_UK: /^(\+44|0)[1-9]\d{8,10}$/, // UK phone
    },
    
    // Suspicious content patterns for Portuguese community
    SUSPICIOUS_PATTERNS: [
      /golpe|fraude|esquema/i,
      /dados\s+pessoais/i,
      /transferir\s+dinheiro/i,
      /venda\s+de\s+documentos/i,
      /passaporte\s+falso/i,
    ],
  },

  // SQL Injection Protection
  SQL_INJECTION: {
    DANGEROUS_PATTERNS: [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
      /(\bUNION\s+SELECT\b)/gi,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
      /(['";])/g,
      /(\-\-|\#|\/\*|\*\/)/g,
      /(\bxp_cmdshell\b)/gi,
      /(\bsp_executesql\b)/gi,
    ],
    
    // Automatic sanitization
    AUTO_SANITIZE: true,
    LOG_ATTEMPTS: true,
    BLOCK_REQUESTS: true,
  },

  // XSS Protection
  XSS: {
    DANGEROUS_PATTERNS: [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /vbscript:/gi,
      /onload\s*=/gi,
      /onerror\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
    ],
    
    // Content Security Policy settings
    CSP: {
      DEFAULT_SRC: ["'self'"],
      SCRIPT_SRC: [
        "'self'",
        "'unsafe-eval'", // Required for some frameworks
        "'unsafe-inline'", // Required for some components
        "https://js.stripe.com",
        "https://maps.googleapis.com",
        "https://www.googletagmanager.com"
      ],
      STYLE_SRC: [
        "'self'",
        "'unsafe-inline'", // Required for dynamic styles
        "https://fonts.googleapis.com"
      ],
      IMG_SRC: [
        "'self'",
        "data:",
        "blob:",
        "https://*.unsplash.com",
        "https://*.cloudinary.com",
        "https://*.b-cdn.net",
        "https://*.ytimg.com",
        "https://*.youtube.com",
        "https://*.supabase.co"
      ],
      FONT_SRC: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      CONNECT_SRC: [
        "'self'",
        "https://*.supabase.co",
        "https://api.stripe.com",
        "https://maps.googleapis.com",
        "https://nominatim.openstreetmap.org"
      ],
      MEDIA_SRC: [
        "'self'",
        "https://*.b-cdn.net",
        "https://*.supabase.co"
      ],
      FRAME_SRC: [
        "https://js.stripe.com",
        "https://www.youtube.com"
      ],
      OBJECT_SRC: ["'none'"],
      BASE_URI: ["'self'"],
      FORM_ACTION: ["'self'"],
      FRAME_ANCESTORS: ["'none'"]
    },
  },

  // Security Headers
  HEADERS: {
    HSTS: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true,
    },
    
    FRAME_OPTIONS: 'DENY', // Stricter than SAMEORIGIN
    CONTENT_TYPE_OPTIONS: 'nosniff',
    XSS_PROTECTION: '1; mode=block',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
    
    PERMISSIONS_POLICY: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()'
    ].join(', '),
    
    CROSS_ORIGIN_EMBEDDER_POLICY: 'require-corp',
    CROSS_ORIGIN_OPENER_POLICY: 'same-origin',
  },

  // Authentication Security
  AUTH: {
    PASSWORD: {
      MIN_LENGTH: 8,
      REQUIRE_UPPERCASE: true,
      REQUIRE_LOWERCASE: true,
      REQUIRE_NUMBERS: true,
      REQUIRE_SPECIAL: true,
      
      // Portuguese-specific weak passwords
      COMMON_PORTUGUESE_PASSWORDS: [
        'portugal',
        'lisboa',
        'porto',
        'benfica',
        'sporting',
        'futebol',
        'saudade',
        'fado',
        'bacalhau',
        'azulejo',
        'cristiano',
        'ronaldo',
      ],
    },
    
    TOKEN: {
      ACCESS_TOKEN_EXPIRY: 24 * 60 * 60, // 24 hours
      REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60, // 30 days
      TOKEN_LENGTH: 32,
    },
    
    TWO_FACTOR: {
      ENABLED_BY_DEFAULT: false,
      CODE_LENGTH: 6,
      CODE_EXPIRY: 300, // 5 minutes
      MAX_ATTEMPTS: 3,
    },
  },

  // Audit Logging
  AUDIT: {
    LOG_LEVELS: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const,
    
    RETENTION: {
      LOW: 30, // days
      MEDIUM: 60, // days
      HIGH: 90, // days
      CRITICAL: 365, // days - keep critical events for 1 year
    },
    
    // Auto-alert thresholds
    ALERT_THRESHOLDS: {
      CRITICAL_EVENTS_PER_HOUR: 5,
      SQL_INJECTION_ATTEMPTS_PER_HOUR: 10,
      FAILED_LOGINS_PER_IP: 20,
      XSS_ATTEMPTS_PER_HOUR: 15,
    },
    
    // Portuguese community specific logging
    CULTURAL_CONTEXT_LOGGING: true,
    ENHANCED_PORTUGUESE_MONITORING: true,
  },

  // Geographic Security
  GEO_SECURITY: {
    // IP blocking for known malicious regions
    BLOCKED_COUNTRIES: [], // Empty by default, can be configured
    
    // Enhanced monitoring for suspicious locations
    MONITOR_LOCATIONS: true,
    ALERT_ON_MULTIPLE_LOCATIONS: true,
    MAX_CONCURRENT_LOCATIONS: 5,
    
    // Portuguese community focus
    PRIORITY_REGIONS: ['PT', 'GB', 'BR'], // Portugal, UK, Brazil
  },

  // Emergency Security Modes
  EMERGENCY: {
    // Lockdown mode - only critical functions work
    LOCKDOWN_MODE: false,
    
    // Enhanced security mode - stricter limits
    ENHANCED_MODE: false,
    
    // Maintenance mode security
    MAINTENANCE_MODE: false,
  },
} as const;

// Security utility functions
export const SecurityUtils = {
  /**
   * Get rate limit configuration for a specific endpoint
   */
  getRateLimit: (endpoint: string) => {
    if (endpoint.includes('/api/auth/')) return SECURITY_CONFIG.RATE_LIMITS.AUTH;
    if (endpoint.includes('/api/upload/')) return SECURITY_CONFIG.RATE_LIMITS.UPLOAD;
    if (endpoint.includes('/api/business-directory/')) return SECURITY_CONFIG.RATE_LIMITS.BUSINESS_DIRECTORY;
    if (endpoint.includes('/api/messaging/')) return SECURITY_CONFIG.RATE_LIMITS.MESSAGING;
    if (endpoint.includes('/api/events/')) return SECURITY_CONFIG.RATE_LIMITS.EVENTS;
    if (endpoint.includes('/api/')) return SECURITY_CONFIG.RATE_LIMITS.API_GENERAL;
    return SECURITY_CONFIG.RATE_LIMITS.PAGES;
  },

  /**
   * Generate Content Security Policy header
   */
  generateCSP: () => {
    const csp = SECURITY_CONFIG.XSS.CSP;
    return [
      `default-src ${csp.DEFAULT_SRC.join(' ')}`,
      `script-src ${csp.SCRIPT_SRC.join(' ')}`,
      `style-src ${csp.STYLE_SRC.join(' ')}`,
      `img-src ${csp.IMG_SRC.join(' ')}`,
      `font-src ${csp.FONT_SRC.join(' ')}`,
      `connect-src ${csp.CONNECT_SRC.join(' ')}`,
      `media-src ${csp.MEDIA_SRC.join(' ')}`,
      `frame-src ${csp.FRAME_SRC.join(' ')}`,
      `object-src ${csp.OBJECT_SRC.join(' ')}`,
      `base-uri ${csp.BASE_URI.join(' ')}`,
      `form-action ${csp.FORM_ACTION.join(' ')}`,
      `frame-ancestors ${csp.FRAME_ANCESTORS.join(' ')}`
    ].join('; ');
  },

  /**
   * Check if content contains suspicious Portuguese patterns
   */
  containsSuspiciousContent: (content: string): boolean => {
    return SECURITY_CONFIG.INPUT_VALIDATION.SUSPICIOUS_PATTERNS.some(
      pattern => pattern.test(content)
    );
  },

  /**
   * Get session timeout based on user type
   */
  getSessionTimeout: (userType: 'regular' | 'premium' | 'remember_me' = 'regular'): number => {
    switch (userType) {
      case 'premium':
        return SECURITY_CONFIG.SESSION.PREMIUM_TIMEOUT;
      case 'remember_me':
        return SECURITY_CONFIG.SESSION.REMEMBER_ME_TIMEOUT;
      default:
        return SECURITY_CONFIG.SESSION.DEFAULT_TIMEOUT;
    }
  },

  /**
   * Validate Portuguese cultural context
   */
  isPortugueseCulturalContext: (request: { 
    headers: { get: (name: string) => string | null } 
  }): boolean => {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const culturalHeader = request.headers.get('x-cultural-context');
    
    return acceptLanguage.includes('pt') || culturalHeader === 'portuguese-uk';
  },
};

// Export types for TypeScript
export type SecurityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CulturalContext = 'portuguese-uk' | 'general';
export type SecurityEventType = 
  | 'LOGIN_ATTEMPT' 
  | 'FAILED_CSRF' 
  | 'RATE_LIMIT_EXCEEDED' 
  | 'SUSPICIOUS_ACTIVITY' 
  | 'XSS_ATTEMPT' 
  | 'SQL_INJECTION_ATTEMPT' 
  | 'FILE_UPLOAD'
  | 'DATA_ACCESS'
  | 'BRUTE_FORCE_DETECTED'
  | 'SESSION_HIJACK_ATTEMPT'
  | 'UNAUTHORIZED_API_ACCESS';

export default SECURITY_CONFIG;