/**
 * Secure credential configuration for LusoTown platform
 * 
 * SECURITY WARNING: Never commit actual credentials to version control.
 * This file manages environment variable access with secure fallbacks.
 */

// Demo system configuration
export const DEMO_CONFIG = {
  email: process.env.DEMO_EMAIL || '',
  password: process.env.DEMO_PASSWORD || '',
  userId: process.env.DEMO_USER_ID || 'demo-user-secure-id',
} as const;

// Admin system configuration
export const ADMIN_CONFIG = {
  emailDomain: process.env.ADMIN_EMAIL_DOMAIN || '',
} as const;

// Test display credentials (non-functional, UI display only)
export const TEST_DISPLAY_CONFIG = {
  email: process.env.NEXT_PUBLIC_TEST_DISPLAY_EMAIL || 'demo@example.com',
  password: process.env.NEXT_PUBLIC_TEST_DISPLAY_PASSWORD || 'demo-password',
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

// Security checks
if (typeof window === 'undefined') {
  // Server-side security validation
  if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) {
    console.warn('SECURITY: Demo credentials not set in environment variables');
  }
  
  if (!process.env.ADMIN_EMAIL_DOMAIN) {
    console.warn('SECURITY: Admin email domain not configured');
  }
}