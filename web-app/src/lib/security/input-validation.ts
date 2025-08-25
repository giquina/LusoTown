import DOMPurify from 'isomorphic-dompurify'
import { z } from 'zod'

// Lusophone-specific validation patterns
export const PORTUGUESE_PATTERNS = {
  // Lusophone postal codes: 1234-123
  postalCode: /^\d{4}-\d{3}$/,
  
  // Lusophone phone numbers: +351 123 456 789
  phoneNumber: /^\+351\s?\d{3}\s?\d{3}\s?\d{3}$/,
  
  // Lusophone NIF (tax number): 123456789
  nif: /^\d{9}$/,
  
  // Lusophone names (allows Lusophone characters)
  name: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s'-]{1,100}$/,
  
  // Lusophone text content (allows cultural expressions)
  culturalText: /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.,!?()'":-]{1,5000}$/
}

// Security validation schemas using Zod
export const ValidationSchemas = {
  // User profile validation
  userProfile: z.object({
    firstName: z.string()
      .min(1, 'First name is required')
      .max(50, 'First name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in name'),
    
    lastName: z.string()
      .max(50, 'Last name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in name')
      .optional(),
    
    email: z.string()
      .email('Invalid email format')
      .max(255, 'Email too long')
      .transform(email => email.toLowerCase().trim()),
    
    bio: z.string()
      .max(500, 'Bio too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in bio')
      .optional(),
    
    location: z.string()
      .max(100, 'Location too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid location format')
      .optional(),
    
    dateOfBirth: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine(date => {
        const birthDate = new Date(date)
        const now = new Date()
        const age = now.getFullYear() - birthDate.getFullYear()
        return age >= 16 && age <= 120
      }, 'Invalid age range')
  }),

  // Message validation
  message: z.object({
    content: z.string()
      .min(1, 'Message cannot be empty')
      .max(1000, 'Message too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in message')
      .transform(content => sanitizeText(content)),
    
    messageType: z.enum(['text', 'image', 'file']).default('text'),
    
    conversationId: z.string().uuid('Invalid conversation ID'),
    
    receiverId: z.string().uuid('Invalid receiver ID')
  }),

  // Cultural preferences validation
  culturalPreferences: z.object({
    origins: z.array(z.enum([
      'portugal', 'brazil', 'angola', 'mozambique', 'cape_verde',
      'guinea_bissau', 'sao_tome_principe', 'east_timor', 'macau'
    ])).min(1, 'Select at least one origin'),
    
    languagePreference: z.enum(['portuguese', 'english', 'both']),
    
    culturalCelebrations: z.array(z.string().max(50)).max(10),
    
    professionalGoals: z.array(z.string().max(100)).max(5),
    
    culturalValues: z.record(z.number().min(1).max(5)),
    
    lifestylePreferences: z.array(z.string().max(50)).max(10)
  }),

  // Event creation validation
  eventCreation: z.object({
    title: z.string()
      .min(5, 'Title too short')
      .max(100, 'Title too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in title'),
    
    description: z.string()
      .max(2000, 'Description too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in description')
      .optional(),
    
    eventType: z.enum(['online', 'in_person', 'hybrid']),
    
    location: z.string()
      .max(200, 'Location too long')
      .optional(),
    
    virtualLink: z.string()
      .url('Invalid URL format')
      .optional(),
    
    startDatetime: z.string()
      .datetime('Invalid datetime format')
      .refine(date => new Date(date) > new Date(), 'Event must be in the future'),
    
    endDatetime: z.string()
      .datetime('Invalid datetime format'),
    
    maxAttendees: z.number()
      .min(1, 'At least 1 attendee required')
      .max(1000, 'Too many attendees')
      .optional(),
    
    price: z.number()
      .min(0, 'Price cannot be negative')
      .max(1000, 'Price too high'),
    
    tags: z.array(z.string().max(30)).max(10).optional()
  }).refine(
    data => new Date(data.endDatetime) > new Date(data.startDatetime),
    'End time must be after start time'
  ),

  // File upload validation
  fileUpload: z.object({
    file: z.object({
      name: z.string().max(255, 'Filename too long'),
      size: z.number().max(5 * 1024 * 1024, 'File too large (max 5MB)'),
      type: z.enum([
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
        'application/pdf', 'text/plain'
      ], { errorMap: () => ({ message: 'Invalid file type' }) })
    })
  }),

  // Search filters validation
  searchFilters: z.object({
    query: z.string()
      .max(100, 'Search query too long')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.-]{0,100}$/, 'Invalid search characters')
      .optional(),
    
    ageRange: z.object({
      min: z.number().min(16).max(100),
      max: z.number().min(16).max(100)
    }).refine(data => data.min <= data.max, 'Invalid age range').optional(),
    
    location: z.array(z.string().max(50)).max(5).optional(),
    
    interests: z.array(z.string().max(30)).max(10).optional(),
    
    membershipTier: z.enum(['free', 'core', 'premium']).optional(),
    
    limit: z.number().min(1).max(100).default(20)
  })
}

// Text sanitization functions
export function sanitizeText(text: string): string {
  if (typeof window !== 'undefined') {
    // Client-side sanitization
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] })
  }
  
  // Server-side basic sanitization
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export function sanitizeHTML(html: string, allowedTags: string[] = []): string {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: allowedTags })
  }
  
  // Server-side: strip all HTML if no DOMPurify available
  return sanitizeText(html)
}

// Lusophone-specific content validation
export function validatePortugueseContent(content: string): {
  isValid: boolean
  issues: string[]
  sanitizedContent: string
} {
  const issues: string[] = []
  let sanitizedContent = sanitizeText(content)
  
  // Check for potentially harmful Lusophone phrases
  const suspiciousPatterns = [
    /golpe|fraude|esquema/i, // Scam/fraud
    /dados\s+pessoais/i, // Personal data harvesting
    /transferir\s+dinheiro/i, // Money transfer scams
  ]
  
  const hasSuspiciousContent = suspiciousPatterns.some(pattern => 
    pattern.test(content)
  )
  
  if (hasSuspiciousContent) {
    issues.push('Content may contain suspicious patterns')
  }
  
  // Validate cultural sensitivity
  if (!PORTUGUESE_PATTERNS.culturalText.test(content)) {
    issues.push('Content contains invalid characters')
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    sanitizedContent
  }
}

// Rate limiting validation
export function validateRateLimit(
  identifier: string,
  action: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  // This would integrate with your rate limiting store
  // For now, return a basic implementation
  return {
    allowed: true,
    remaining: maxAttempts - 1,
    resetTime: Date.now() + windowMs
  }
}

// CSRF token validation
export function generateCSRFToken(): string {
  if (typeof crypto !== 'undefined') {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  
  // Fallback for environments without crypto
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken && token.length >= 32
}

// SQL injection prevention helpers
export function escapeString(str: string): string {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case '\0': return '\\0'
      case '\x08': return '\\b'
      case '\x09': return '\\t'
      case '\x1a': return '\\z'
      case '\n': return '\\n'
      case '\r': return '\\r'
      case '"':
      case "'":
      case '\\':
      case '%': return '\\' + char
      default: return char
    }
  })
}

// Password validation for Lusophone users
export function validatePassword(password: string): {
  isValid: boolean
  score: number
  issues: string[]
} {
  const issues: string[] = []
  let score = 0
  
  if (password.length < 8) {
    issues.push('Password must be at least 8 characters long')
  } else {
    score += 1
  }
  
  if (!/[a-z]/.test(password)) {
    issues.push('Password must contain lowercase letters')
  } else {
    score += 1
  }
  
  if (!/[A-Z]/.test(password)) {
    issues.push('Password must contain uppercase letters')
  } else {
    score += 1
  }
  
  if (!/\d/.test(password)) {
    issues.push('Password must contain numbers')
  } else {
    score += 1
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password)) {
    issues.push('Password must contain special characters')
  } else {
    score += 1
  }
  
  // Check for common Lusophone passwords
  const commonPortuguesePasswords = [
    'portugal', 'lisboa', 'porto', 'benfica', 'sporting', 'futebol',
    'saudade', 'fado', 'bacalhau', 'azulejo'
  ]
  
  if (commonPortuguesePasswords.some(common => 
    password.toLowerCase().includes(common)
  )) {
    issues.push('Password contains common Lusophone words')
    score = Math.max(0, score - 2)
  }
  
  return {
    isValid: issues.length === 0 && score >= 4,
    score: Math.min(5, score),
    issues
  }
}

// Export validation functions for API routes
export const validateInput = {
  userProfile: (data: unknown) => ValidationSchemas.userProfile.parse(data),
  message: (data: unknown) => ValidationSchemas.message.parse(data),
  culturalPreferences: (data: unknown) => ValidationSchemas.culturalPreferences.parse(data),
  eventCreation: (data: unknown) => ValidationSchemas.eventCreation.parse(data),
  fileUpload: (data: unknown) => ValidationSchemas.fileUpload.parse(data),
  searchFilters: (data: unknown) => ValidationSchemas.searchFilters.parse(data),
}

// Error handling for validation
export class ValidationError extends Error {
  public issues: string[]
  
  constructor(message: string, issues: string[] = []) {
    super(message)
    this.name = 'ValidationError'
    this.issues = issues
  }
}