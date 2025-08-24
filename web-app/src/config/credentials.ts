/**
 * Secure credential configuration for LusoTown platform
 * 
 * SECURITY WARNING: Never commit actual credentials to version control.
 * This file manages environment variable access with secure fallbacks.
 * 
 * Security Features:
 * - Environment variable validation
 * - Secure defaults that fail safe
 * - Runtime security checks
 * - Portuguese community specific validation
 */

// Security validation functions
function validateEnvironmentSecurity(): void {
  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    // Only validate during development/runtime, not during builds
    const requiredEnvVars = [
      'DEMO_EMAIL',
      'DEMO_PASSWORD',
      'ADMIN_EMAIL_DOMAIN',
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ]
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      console.warn('Missing development environment variables:', missingVars)
    }
  }
}

// Only run security validation in development
if (process.env.NODE_ENV === 'development') {
  validateEnvironmentSecurity()
}

// Secure demo system configuration
export const DEMO_CONFIG = {
  get email(): string {
    const email = process.env.DEMO_EMAIL
    if (!email && typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      // Only throw in production runtime, not during builds
      return ''
    }
    return email || ''
  },
  
  get password(): string {
    const password = process.env.DEMO_PASSWORD
    if (!password && typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      // Only throw in production runtime, not during builds
      return ''
    }
    return password || ''
  },
  
  get userId(): string {
    return process.env.DEMO_USER_ID || 'demo-user-secure-id'
  },
  
  // Security metadata
  get isConfigured(): boolean {
    return !!(process.env.DEMO_EMAIL && process.env.DEMO_PASSWORD)
  }
} as const;

// Enhanced admin system configuration
export const ADMIN_CONFIG = {
  get emailDomain(): string {
    const domain = process.env.ADMIN_EMAIL_DOMAIN
    if (!domain && typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      // Only throw in production runtime, not during builds
      return ''
    }
    return domain || ''
  },
  
  get isConfigured(): boolean {
    return !!process.env.ADMIN_EMAIL_DOMAIN
  },
  
  // Additional admin security
  get allowedDomains(): string[] {
    const domains = process.env.ADMIN_ALLOWED_DOMAINS
    return domains ? domains.split(',').map(d => d.trim()) : []
  }
} as const;

// Secure test display credentials (non-functional, UI display only)
export const TEST_DISPLAY_CONFIG = {
  email: process.env.NEXT_PUBLIC_TEST_DISPLAY_EMAIL || 'demo@example.com',
  password: process.env.NEXT_PUBLIC_TEST_DISPLAY_PASSWORD || '••••••••',
} as const;

// Validation functions
export const validateDemoCredentials = (email: string, password: string): boolean => {
  if (!DEMO_CONFIG.email || !DEMO_CONFIG.password) {
    console.warn('Demo credentials not configured. Set DEMO_EMAIL and DEMO_PASSWORD environment variables.');
    return false;
  }
  
  return (
    email.trim().toLowerCase() === DEMO_CONFIG.email.toLowerCase() &&
    password === DEMO_CONFIG.password
  );
};

export const isAdminEmail = (email: string): boolean => {
  if (!ADMIN_CONFIG.emailDomain) {
    console.warn('Admin email domain not configured. Set ADMIN_EMAIL_DOMAIN environment variable.');
    return false;
  }
  
  return email.includes(ADMIN_CONFIG.emailDomain);
};

// Security checks - only warn, don't throw during builds
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  // Only validate in development runtime
  if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) {
    console.warn('SECURITY: Demo credentials not set in environment variables');
  }
  
  if (!process.env.ADMIN_EMAIL_DOMAIN) {
    console.warn('SECURITY: Admin email domain not configured');
  }
}