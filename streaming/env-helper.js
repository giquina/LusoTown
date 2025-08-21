/**
 * Environment Variable Validation Helper for Streaming Server
 * 
 * Provides runtime validation for required environment variables
 * to prevent deployment with missing critical configuration.
 */

/**
 * Retrieves and validates a required environment variable
 * 
 * @param {string} key - The environment variable key
 * @param {string} [description] - Optional description for better error messages
 * @returns {string} The environment variable value
 * @throws {Error} If the environment variable is missing or empty
 */
function requireEnv(key, description) {
  const value = process.env[key]
  
  if (!value || value.trim() === '') {
    const errorMessage = description 
      ? `Missing required environment variable: ${key} (${description})`
      : `Missing required environment variable: ${key}`
    
    console.error(`❌ ${errorMessage}`)
    throw new Error(errorMessage)
  }
  
  return value.trim()
}

/**
 * Retrieves an optional environment variable with a default value
 * 
 * @param {string} key - The environment variable key  
 * @param {string} defaultValue - The default value if the env var is not set
 * @returns {string} The environment variable value or default
 */
function getEnv(key, defaultValue) {
  const value = process.env[key]
  return value && value.trim() !== '' ? value.trim() : defaultValue
}

/**
 * Validates that all required environment variables are present
 * Exit the process if any are missing (for server startup)
 * 
 * @param {string[]} requiredVars - Array of required environment variable keys
 */
function validateRequiredEnvVars(requiredVars) {
  const missing = []
  
  for (const key of requiredVars) {
    const value = process.env[key]
    if (!value || value.trim() === '') {
      missing.push(key)
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach(key => console.error(`   - ${key}`))
    console.error('\nPlease check your environment configuration and ensure all required variables are set.')
    console.error('Refer to .env.production.example for required variables.\n')
    process.exit(1)
  }
}

module.exports = {
  requireEnv,
  getEnv,
  validateRequiredEnvVars
}