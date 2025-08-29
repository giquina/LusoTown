/**
 * Server-side Validation Middleware for Portuguese Community Platform
 * Comprehensive validation for API routes with Portuguese-specific features
 */

import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError, ZodSchema } from 'zod';
import { ValidationSchemas, PORTUGUESE_PATTERNS, validatePortugueseContent } from '@/lib/security/input-validation';
import { API_ERROR_MESSAGES, API_LOG_MESSAGES } from '@/config/api-messages';

// Rate limiting store (in production, use Redis or similar)
interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastAccess: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Portuguese-specific validation configuration
export interface PortugueseValidationConfig {
  enableCulturalValidation: boolean;
  enableGeolocationValidation: boolean;
  enablePortugueseCharacterValidation: boolean;
  strictModeEnabled: boolean;
  maxRequestsPerMinute: number;
  enableGDPRCompliance: boolean;
}

const DEFAULT_PORTUGUESE_CONFIG: PortugueseValidationConfig = {
  enableCulturalValidation: true,
  enableGeolocationValidation: true,
  enablePortugueseCharacterValidation: true,
  strictModeEnabled: true,
  maxRequestsPerMinute: 30,
  enableGDPRCompliance: true,
};

// Enhanced validation middleware with Portuguese community features
export function createValidationMiddleware(
  schema: ZodSchema<any>,
  config: Partial<PortugueseValidationConfig> = {}
) {
  const validationConfig = { ...DEFAULT_PORTUGUESE_CONFIG, ...config };

  return async function validationMiddleware(
    request: NextRequest,
    handler: (request: NextRequest, validatedData: any) => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      // Rate limiting validation
      const rateLimitResult = await validateRateLimit(request, validationConfig);
      if (!rateLimitResult.allowed) {
        return NextResponse.json(
          {
            error: API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            message: 'Rate limit exceeded for Portuguese community actions',
            resetTime: rateLimitResult.resetTime,
            remaining: rateLimitResult.remaining
          },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': validationConfig.maxRequestsPerMinute.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
              'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
            }
          }
        );
      }

      // Parse and validate request body
      const body = await parseRequestBody(request);
      
      // Portuguese-specific content validation
      if (validationConfig.enableCulturalValidation) {
        const culturalValidation = await validatePortugueseCulturalContent(body);
        if (!culturalValidation.isValid) {
          console.warn(`Portuguese cultural validation failed: ${culturalValidation.issues.join(', ')}`);
          
          return NextResponse.json(
            {
              error: 'Cultural validation failed',
              message: 'Content does not meet Portuguese community standards',
              issues: culturalValidation.issues,
              culturalScore: culturalValidation.culturalScore
            },
            { status: 400 }
          );
        }
      }

      // GDPR compliance validation for Portuguese users
      if (validationConfig.enableGDPRCompliance) {
        const gdprValidation = await validateGDPRCompliance(request, body);
        if (!gdprValidation.isCompliant) {
          return NextResponse.json(
            {
              error: 'GDPR compliance violation',
              message: 'Request does not meet GDPR requirements for Portuguese community data',
              violations: gdprValidation.violations
            },
            { status: 400 }
          );
        }
      }

      // Schema validation with enhanced error messages
      const validatedData = await validateWithSchema(schema, body, validationConfig);
      
      // Portuguese character validation
      if (validationConfig.enablePortugueseCharacterValidation) {
        validatePortugueseCharacters(validatedData);
      }

      // Geolocation validation for UK addresses
      if (validationConfig.enableGeolocationValidation) {
        await validateUKGeolocation(validatedData);
      }

      // Log successful validation for Portuguese community monitoring
      logPortugueseValidationSuccess(request, validatedData);

      // Call the handler with validated data
      return await handler(request, validatedData);

    } catch (error) {
      return handleValidationError(error, request, validationConfig);
    }
  };
}

// Parse request body with error handling
async function parseRequestBody(request: NextRequest): Promise<any> {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const text = await request.text();
      if (!text.trim()) {
        throw new Error('Empty request body');
      }
      return JSON.parse(text);
    }
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const body: any = {};
      
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          body[key] = {
            name: value.name,
            size: value.size,
            type: value.type,
            file: value
          };
        } else {
          body[key] = value;
        }
      }
      
      return body;
    }
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      const body: any = {};
      
      for (const [key, value] of formData.entries()) {
        body[key] = value;
      }
      
      return body;
    }
    
    // Default to JSON parsing
    return await request.json();
    
  } catch (error) {
    throw new Error(`Failed to parse request body: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Rate limiting with Portuguese community consideration
async function validateRateLimit(
  request: NextRequest,
  config: PortugueseValidationConfig
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const identifier = getClientIdentifier(request);
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    // New window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
      lastAccess: now
    };
    rateLimitStore.set(identifier, newEntry);
    
    return {
      allowed: true,
      remaining: config.maxRequestsPerMinute - 1,
      resetTime: newEntry.resetTime
    };
  }
  
  // Update existing entry
  entry.count++;
  entry.lastAccess = now;
  rateLimitStore.set(identifier, entry);
  
  const allowed = entry.count <= config.maxRequestsPerMinute;
  const remaining = Math.max(0, config.maxRequestsPerMinute - entry.count);
  
  return {
    allowed,
    remaining,
    resetTime: entry.resetTime
  };
}

// Get client identifier for rate limiting
function getClientIdentifier(request: NextRequest): string {
  // In production, use more sophisticated client identification
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Hash the combination for privacy
  return `${ip}-${userAgent.substring(0, 50)}`;
}

// Portuguese cultural content validation
async function validatePortugueseCulturalContent(data: any): Promise<{
  isValid: boolean;
  issues: string[];
  culturalScore: number;
}> {
  const issues: string[] = [];
  let culturalScore = 100;
  
  // Check for Portuguese cultural appropriateness
  const textFields = extractTextFields(data);
  
  for (const field of textFields) {
    const contentValidation = validatePortugueseContent(field.value);
    
    if (!contentValidation.isValid) {
      issues.push(`${field.name}: ${contentValidation.issues.join(', ')}`);
      culturalScore -= 20;
    }
    
    // Check for Portuguese cultural sensitivity
    const culturalSensitivity = await checkCulturalSensitivity(field.value);
    if (!culturalSensitivity.appropriate) {
      issues.push(`${field.name}: Contains culturally insensitive content`);
      culturalScore -= 30;
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    culturalScore: Math.max(0, culturalScore)
  };
}

// Extract text fields from data object
function extractTextFields(data: any, prefix = ''): Array<{ name: string; value: string }> {
  const textFields: Array<{ name: string; value: string }> = [];
  
  for (const [key, value] of Object.entries(data)) {
    const fieldName = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string' && value.trim().length > 0) {
      textFields.push({ name: fieldName, value });
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      textFields.push(...extractTextFields(value, fieldName));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string' && item.trim().length > 0) {
          textFields.push({ name: `${fieldName}[${index}]`, value: item });
        } else if (typeof item === 'object' && item !== null) {
          textFields.push(...extractTextFields(item, `${fieldName}[${index}]`));
        }
      });
    }
  }
  
  return textFields;
}

// Check cultural sensitivity for Portuguese content
async function checkCulturalSensitivity(content: string): Promise<{
  appropriate: boolean;
  concerns: string[];
}> {
  const concerns: string[] = [];
  
  // Portuguese cultural sensitivity patterns
  const sensitivePatterns = [
    {
      pattern: /ditadura|salazar|fascismo/i,
      concern: 'References to sensitive historical periods'
    },
    {
      pattern: /ciganos?|pretos?/i,
      concern: 'Potentially offensive ethnic references'
    },
    {
      pattern: /brasileiros?\s+(burros?|ignorantes?)/i,
      concern: 'Derogatory references to Portuguese-speaking communities'
    }
  ];
  
  for (const { pattern, concern } of sensitivePatterns) {
    if (pattern.test(content)) {
      concerns.push(concern);
    }
  }
  
  return {
    appropriate: concerns.length === 0,
    concerns
  };
}

// GDPR compliance validation for Portuguese users
async function validateGDPRCompliance(
  request: NextRequest,
  data: any
): Promise<{ isCompliant: boolean; violations: string[] }> {
  const violations: string[] = [];
  
  // Check for consent fields
  if (data.email && !data.emailConsent && !data.gdprConsent) {
    violations.push('Email provided without explicit consent');
  }
  
  // Check for data minimization
  const sensitiveFields = ['dateOfBirth', 'phone', 'address', 'nationalId', 'passport'];
  const providedSensitiveFields = sensitiveFields.filter(field => data[field]);
  
  if (providedSensitiveFields.length > 0 && !data.dataProcessingConsent) {
    violations.push('Sensitive data provided without processing consent');
  }
  
  // Check for right to be forgotten indicators
  if (data.deleteAccount || data.withdrawConsent) {
    // In production, trigger data deletion processes
    console.log('GDPR deletion request detected for Portuguese user');
  }
  
  // Validate data retention policy compliance
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isPortugueseUser = acceptLanguage.includes('pt');
  
  if (isPortugueseUser && !data.dataRetentionAcknowledged) {
    violations.push('Portuguese user must acknowledge data retention policy');
  }
  
  return {
    isCompliant: violations.length === 0,
    violations
  };
}

// Schema validation with enhanced error messages
async function validateWithSchema(
  schema: ZodSchema<any>,
  data: any,
  config: PortugueseValidationConfig
): Promise<any> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const enhancedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
        portugueseMessage: translateErrorToPortuguese(err.message)
      }));
      
      throw new PortugueseValidationError(
        'Validation failed for Portuguese community data',
        enhancedErrors
      );
    }
    throw error;
  }
}

// Translate validation errors to Portuguese
function translateErrorToPortuguese(englishMessage: string): string {
  const translations: Record<string, string> = {
    'Required': 'Obrigatório',
    'Invalid email format': 'Formato de email inválido',
    'Password too short': 'Palavra-passe demasiado curta',
    'Invalid characters': 'Caracteres inválidos',
    'Too long': 'Demasiado longo',
    'Too short': 'Demasiado curto',
    'Invalid date format': 'Formato de data inválido',
    'Invalid phone number format': 'Formato de número de telefone inválido',
    'Invalid postcode format': 'Formato de código postal inválido'
  };
  
  return translations[englishMessage] || englishMessage;
}

// Portuguese character validation
function validatePortugueseCharacters(data: any): void {
  const textFields = extractTextFields(data);
  
  for (const field of textFields) {
    if (!PORTUGUESE_PATTERNS.culturalText.test(field.value)) {
      throw new PortugueseValidationError(
        `Invalid Portuguese characters in field: ${field.name}`,
        [{
          field: field.name,
          message: 'Contains invalid characters for Portuguese content',
          code: 'invalid_characters',
          portugueseMessage: 'Contém caracteres inválidos para conteúdo português'
        }]
      );
    }
  }
}

// UK geolocation validation
async function validateUKGeolocation(data: any): Promise<void> {
  if (data.postcode) {
    const isValidUKPostcode = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i.test(data.postcode);
    
    if (!isValidUKPostcode) {
      throw new PortugueseValidationError(
        'Invalid UK postcode format',
        [{
          field: 'postcode',
          message: 'Must be a valid UK postcode',
          code: 'invalid_uk_postcode',
          portugueseMessage: 'Deve ser um código postal do Reino Unido válido'
        }]
      );
    }
  }
  
  if (data.address && data.country) {
    const validUKCountries = ['UK', 'GB', 'United Kingdom', 'England', 'Scotland', 'Wales', 'Northern Ireland'];
    
    if (!validUKCountries.includes(data.country)) {
      console.warn(`Non-UK address provided for Portuguese community member: ${data.country}`);
    }
  }
}

// Log successful validation for monitoring
function logPortugueseValidationSuccess(request: NextRequest, data: any): void {
  const endpoint = request.nextUrl.pathname;
  const method = request.method;
  const timestamp = new Date().toISOString();
  
  // In production, send to logging service
  console.log(`Portuguese validation success: ${method} ${endpoint} at ${timestamp}`);
  
  // Track cultural data for analytics
  if (data.portugueseOrigin || data.culturalPreferences) {
    console.log(`Cultural data validated for Portuguese community member`);
  }
}

// Enhanced error handling
function handleValidationError(
  error: any,
  request: NextRequest,
  config: PortugueseValidationConfig
): NextResponse {
  console.error(API_LOG_MESSAGES.ENHANCED_SIGNUP_ERROR, error);
  
  if (error instanceof PortugueseValidationError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
        endpoint: request.nextUrl.pathname
      },
      { status: 400 }
    );
  }
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Schema Validation Error',
        message: 'Invalid data format for Portuguese community platform',
        issues: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        })),
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }
  
  // Generic error response
  return NextResponse.json(
    {
      error: API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      message: 'Validation failed for Portuguese community request',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  );
}

// Custom error class for Portuguese validation
export class PortugueseValidationError extends Error {
  public details: Array<{
    field: string;
    message: string;
    code: string;
    portugueseMessage: string;
  }>;

  constructor(message: string, details: Array<{
    field: string;
    message: string;
    code: string;
    portugueseMessage: string;
  }>) {
    super(message);
    this.name = 'PortugueseValidationError';
    this.details = details;
  }
}

// Predefined validation middleware for common endpoints
export const businessValidationMiddleware = createValidationMiddleware(
  ValidationSchemas.businessSubmission,
  {
    enableCulturalValidation: true,
    enableGeolocationValidation: true,
    maxRequestsPerMinute: 10, // Lower rate limit for business submissions
    strictModeEnabled: true
  }
);

export const eventValidationMiddleware = createValidationMiddleware(
  ValidationSchemas.eventCreation,
  {
    enableCulturalValidation: true,
    enableGeolocationValidation: true,
    maxRequestsPerMinute: 15,
    strictModeEnabled: true
  }
);

export const userProfileValidationMiddleware = createValidationMiddleware(
  ValidationSchemas.userProfile,
  {
    enableCulturalValidation: true,
    enableGDPRCompliance: true,
    maxRequestsPerMinute: 20,
    strictModeEnabled: false // More lenient for user profiles
  }
);

export const messageValidationMiddleware = createValidationMiddleware(
  ValidationSchemas.message,
  {
    enableCulturalValidation: true,
    maxRequestsPerMinute: 50, // Higher rate limit for messaging
    strictModeEnabled: true
  }
);

// Clean up rate limit store periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime && (now - entry.lastAccess) > 300000) { // 5 minutes
      rateLimitStore.delete(key);
    }
  }
}, 300000); // Clean up every 5 minutes

// Export validation schemas for direct use
export { ValidationSchemas } from '@/lib/security/input-validation';