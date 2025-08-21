/**
 * Environment Variable Validation Utility
 * 
 * Provides runtime validation for required environment variables
 * to prevent deployment with missing critical configuration.
 */

/**
 * Retrieves and validates a required environment variable
 * 
 * @param key - The environment variable key
 * @param description - Optional description for better error messages
 * @returns The environment variable value
 * @throws Error if the environment variable is missing or empty
 */
export function requireEnv(key: string, description?: string): string {
  const value = process.env[key]
  
  if (!value || value.trim() === '') {
    const errorMessage = description 
      ? `Missing required environment variable: ${key} (${description})`
      : `Missing required environment variable: ${key}`
    
    throw new Error(errorMessage)
  }
  
  return value.trim()
}

/**
 * Retrieves an optional environment variable with a default value
 * 
 * @param key - The environment variable key  
 * @param defaultValue - The default value if the env var is not set
 * @returns The environment variable value or default
 */
export function getEnv(key: string, defaultValue: string): string {
  const value = process.env[key]
  return value && value.trim() !== '' ? value.trim() : defaultValue
}

/**
 * Validates that all required environment variables are present
 * 
 * @param requiredVars - Array of required environment variable keys
 * @throws Error with details about all missing variables
 */
export function validateRequiredEnvVars(requiredVars: string[]): void {
  const missing: string[] = []
  
  for (const key of requiredVars) {
    const value = process.env[key]
    if (!value || value.trim() === '') {
      missing.push(key)
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    )
  }
}

/**
 * Checks if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Checks if we're in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Common environment variables with validation
 */
export const ENV = {
  // Supabase (required for app functionality)
  get SUPABASE_URL() {
    return requireEnv('NEXT_PUBLIC_SUPABASE_URL', 'Supabase project URL')
  },
  
  get SUPABASE_ANON_KEY() {
    return requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Supabase anonymous key')
  },
  
  // Stripe (required for payments)
  get STRIPE_SECRET_KEY() {
    return requireEnv('STRIPE_SECRET_KEY', 'Stripe secret key for payment processing')
  },
  
  get STRIPE_WEBHOOK_SECRET() {
    return requireEnv('STRIPE_WEBHOOK_SECRET', 'Stripe webhook endpoint secret')
  },
  
  // Streaming (required for live features)
  get STREAMING_JWT_SECRET() {
    return requireEnv('STREAMING_JWT_SECRET', 'JWT secret for streaming authentication')
  },
  
  // Optional with defaults
  get APP_URL() {
    return getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000')
  },
  
  get STREAMING_SERVER_URL() {
    return getEnv('NEXT_PUBLIC_STREAMING_SERVER_URL', 'http://localhost:8080')
  }
} as const