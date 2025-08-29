/**
 * API Endpoint Validation Schemas for Portuguese Community Platform
 * Comprehensive input validation for all API routes with Portuguese-specific patterns
 */

import { z } from 'zod'
import { PORTUGUESE_PATTERNS } from '@/lib/security/input-validation'

/**
 * Authentication API Validation
 */
export const AuthValidation = {
  // Enhanced signup validation
  signup: z.object({
    firstName: z
      .string()
      .min(1, 'First name required')
      .max(50, 'First name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in first name'),

    lastName: z
      .string()
      .min(1, 'Last name required')
      .max(50, 'Last name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in last name'),

    email: z
      .string()
      .email('Invalid email format')
      .max(255, 'Email too long')
      .transform(val => val.toLowerCase().trim()),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password too long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, 
             'Password must contain uppercase, lowercase, number, and special character'),

    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine((date) => {
        const birthDate = new Date(date)
        const now = new Date()
        const age = now.getFullYear() - birthDate.getFullYear()
        return age >= 16 && age <= 120
      }, 'Invalid age range'),

    palopOrigin: z.enum([
      'portugal', 'brazil', 'angola', 'mozambique', 'cape_verde',
      'guinea_bissau', 'sao_tome_principe', 'east_timor'
    ]),

    languagePreference: z
      .enum(['portuguese', 'english', 'both'])
      .default('both'),

    currentCity: z
      .string()
      .max(100, 'City name too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in city name'),

    termsAccepted: z
      .boolean()
      .refine(val => val === true, 'Terms and conditions must be accepted'),

    gdprConsent: z
      .boolean()
      .refine(val => val === true, 'GDPR consent required'),

    marketingConsent: z.boolean().default(false),

    // Rate limiting token
    rateToken: z.string().optional(),
  }),

  // Login validation
  login: z.object({
    email: z
      .string()
      .email('Invalid email format')
      .transform(val => val.toLowerCase().trim()),

    password: z
      .string()
      .min(1, 'Password required')
      .max(128, 'Password too long'),

    rememberMe: z.boolean().default(false),
    rateToken: z.string().optional(),
  }),

  // Password reset validation
  passwordReset: z.object({
    email: z
      .string()
      .email('Invalid email format')
      .transform(val => val.toLowerCase().trim()),

    rateToken: z.string().optional(),
  }),

  // Password update validation
  passwordUpdate: z.object({
    currentPassword: z.string().min(1, 'Current password required'),
    
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password too long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, 
             'Password must contain uppercase, lowercase, number, and special character'),

    confirmPassword: z.string(),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  }),
}

/**
 * Business Directory API Validation
 */
export const BusinessDirectoryValidation = {
  // Create business listing
  create: z.object({
    businessName: z
      .string()
      .min(2, 'Business name too short')
      .max(100, 'Business name too long')
      .regex(PORTUGUESE_PATTERNS.businessName, 'Invalid characters in business name'),

    businessNamePortuguese: z
      .string()
      .max(100, 'Portuguese name too long')
      .regex(PORTUGUESE_PATTERNS.businessName, 'Invalid characters in Portuguese name')
      .optional(),

    description: z
      .string()
      .min(20, 'Description too short')
      .max(1000, 'Description too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in description'),

    category: z.enum([
      'restaurant', 'cafe', 'grocery', 'bakery', 'clothing', 'services',
      'healthcare', 'education', 'entertainment', 'professional_services',
      'cultural_center', 'religious_organization', 'sports_recreation',
      'travel_tourism', 'media_communication', 'financial_services',
      'beauty_wellness', 'automotive', 'construction', 'technology', 'other'
    ]),

    address: z
      .string()
      .min(10, 'Address too short')
      .max(200, 'Address too long')
      .regex(PORTUGUESE_PATTERNS.address, 'Invalid address format'),

    postcode: z
      .string()
      .regex(PORTUGUESE_PATTERNS.ukPostalCode, 'Invalid UK postcode'),

    phone: z
      .string()
      .refine((phone) => {
        return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
               PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
               PORTUGUESE_PATTERNS.brazilPhone.test(phone) ||
               PORTUGUESE_PATTERNS.internationalPhone.test(phone)
      }, 'Invalid phone number format'),

    email: z
      .string()
      .email('Invalid email format')
      .max(255, 'Email too long'),

    website: z
      .string()
      .regex(PORTUGUESE_PATTERNS.url, 'Invalid website URL')
      .optional(),

    ownerName: z
      .string()
      .min(2, 'Owner name too short')
      .max(100, 'Owner name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in owner name'),

    yearEstablished: z
      .number()
      .int()
      .min(1800, 'Year too early')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),

    gdprConsent: z
      .boolean()
      .refine(val => val === true, 'GDPR consent required'),

    rateToken: z.string().optional(),
  }),

  // Update business listing
  update: z.object({
    businessId: z.string().uuid('Invalid business ID'),
    updateData: z.object({
      businessName: z.string().max(100).optional(),
      description: z.string().max(1000).optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      operatingHours: z.record(z.string()).optional(),
    }),
    rateToken: z.string().optional(),
  }),

  // Search businesses
  search: z.object({
    query: z
      .string()
      .max(100, 'Search query too long')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.-]*$/, 'Invalid search characters')
      .optional(),

    category: z
      .string()
      .max(50, 'Category too long')
      .optional(),

    location: z
      .string()
      .max(100, 'Location too long')
      .optional(),

    londonArea: z
      .enum(['central', 'east', 'north', 'south', 'west', 'southeast', 'southwest', 'northwest', 'northeast', 'greater_london'])
      .optional(),

    portugueseSpecialties: z
      .array(z.string().max(50))
      .max(5)
      .optional(),

    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(20),

    offset: z
      .number()
      .int()
      .min(0)
      .default(0),
  }),

  // Get business clusters (for map)
  clusters: z.object({
    bounds: z.object({
      north: z.number().min(-90).max(90),
      south: z.number().min(-90).max(90),
      east: z.number().min(-180).max(180),
      west: z.number().min(-180).max(180),
    }),
    zoom: z.number().min(1).max(20).default(10),
  }),
}

/**
 * Events API Validation
 */
export const EventsValidation = {
  // Create event
  create: z.object({
    title: z
      .string()
      .min(5, 'Title too short')
      .max(100, 'Title too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in title'),

    titlePortuguese: z
      .string()
      .max(100, 'Portuguese title too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in Portuguese title')
      .optional(),

    description: z
      .string()
      .min(20, 'Description too short')
      .max(2000, 'Description too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in description'),

    eventType: z.enum(['online', 'in_person', 'hybrid']),

    culturalCategory: z.enum([
      'festival', 'cultural_celebration', 'religious_celebration', 'food_wine',
      'music_concert', 'dance_event', 'art_exhibition', 'language_exchange',
      'business_networking', 'educational', 'sports', 'family_event',
      'community_gathering', 'charity_fundraiser', 'academic', 'professional_development'
    ]),

    startDate: z
      .string()
      .datetime('Invalid datetime format')
      .refine(date => new Date(date) > new Date(), 'Event must be in the future'),

    endDate: z
      .string()
      .datetime('Invalid datetime format'),

    venue: z
      .string()
      .max(200, 'Venue name too long')
      .optional(),

    address: z
      .string()
      .max(300, 'Address too long')
      .optional(),

    postcode: z
      .string()
      .regex(PORTUGUESE_PATTERNS.ukPostalCode, 'Invalid UK postcode')
      .optional(),

    virtualLink: z
      .string()
      .regex(PORTUGUESE_PATTERNS.url, 'Invalid URL format')
      .optional(),

    maxAttendees: z
      .number()
      .int()
      .min(1)
      .max(1000)
      .optional(),

    price: z
      .number()
      .min(0)
      .max(500)
      .default(0),

    organizerName: z
      .string()
      .min(2, 'Organizer name too short')
      .max(100, 'Organizer name too long')
      .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in organizer name'),

    organizerEmail: z
      .string()
      .email('Invalid email format'),

    culturalAuthenticity: z
      .boolean()
      .refine(val => val === true, 'Cultural authenticity verification required'),

    gdprConsent: z
      .boolean()
      .refine(val => val === true, 'GDPR consent required'),

    rateToken: z.string().optional(),
  }).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: 'End date must be after start date',
    path: ['endDate']
  }),

  // Search events
  search: z.object({
    query: z
      .string()
      .max(100, 'Search query too long')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿĀ-žÇç\s\d.-]*$/, 'Invalid search characters')
      .optional(),

    category: z
      .string()
      .max(50, 'Category too long')
      .optional(),

    startDate: z
      .string()
      .datetime()
      .optional(),

    endDate: z
      .string()
      .datetime()
      .optional(),

    eventType: z
      .enum(['online', 'in_person', 'hybrid'])
      .optional(),

    londonArea: z
      .enum(['central', 'east', 'north', 'south', 'west', 'southeast', 'southwest', 'northwest', 'northeast', 'greater_london'])
      .optional(),

    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(20),

    offset: z
      .number()
      .int()
      .min(0)
      .default(0),
  }),

  // Join event
  join: z.object({
    eventId: z.string().uuid('Invalid event ID'),
    attendeeInfo: z.object({
      firstName: z.string().max(50),
      lastName: z.string().max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      dietaryRequirements: z.string().max(200).optional(),
    }),
    gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent required'),
    rateToken: z.string().optional(),
  }),
}

/**
 * Community Messaging API Validation
 */
export const MessagingValidation = {
  // Send message
  send: z.object({
    recipientId: z.string().uuid('Invalid recipient ID'),
    
    subject: z
      .string()
      .min(1, 'Subject required')
      .max(100, 'Subject too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in subject')
      .optional(),

    content: z
      .string()
      .min(1, 'Message cannot be empty')
      .max(2000, 'Message too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in message'),

    messageType: z
      .enum(['direct', 'group', 'event_inquiry', 'business_inquiry'])
      .default('direct'),

    language: z
      .enum(['portuguese', 'english', 'both'])
      .default('portuguese'),

    priority: z
      .enum(['low', 'normal', 'high'])
      .default('normal'),

    attachments: z
      .array(z.object({
        filename: z.string().max(255),
        fileSize: z.number().max(5 * 1024 * 1024), // 5MB
        mimeType: z.enum([
          'image/jpeg', 'image/png', 'image/gif', 'image/webp',
          'application/pdf', 'text/plain', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ])
      }))
      .max(3, 'Maximum 3 attachments allowed')
      .optional(),

    rateToken: z.string().optional(),
  }),

  // Get messages
  list: z.object({
    conversationId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    messageType: z.enum(['direct', 'group', 'event_inquiry', 'business_inquiry']).optional(),
    limit: z.number().int().min(1).max(100).default(50),
    offset: z.number().int().min(0).default(0),
    since: z.string().datetime().optional(),
  }),

  // Update message status
  updateStatus: z.object({
    messageId: z.string().uuid('Invalid message ID'),
    status: z.enum(['read', 'unread', 'archived', 'deleted']),
  }),
}

/**
 * Feed API Validation
 */
export const FeedValidation = {
  // Get community feed
  get: z.object({
    feedType: z
      .enum(['events', 'businesses', 'community', 'cultural', 'mixed'])
      .default('mixed'),

    userInterests: z
      .array(z.string().max(50))
      .max(10)
      .optional(),

    location: z
      .string()
      .max(100)
      .optional(),

    languagePreference: z
      .enum(['portuguese', 'english', 'both'])
      .default('both'),

    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .default(20),

    offset: z
      .number()
      .int()
      .min(0)
      .default(0),

    since: z
      .string()
      .datetime()
      .optional(),
  }),

  // Create feed item
  create: z.object({
    type: z.enum(['event', 'business', 'community_announcement', 'cultural_highlight']),
    
    title: z
      .string()
      .min(5, 'Title too short')
      .max(100, 'Title too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in title'),

    content: z
      .string()
      .min(20, 'Content too short')
      .max(2000, 'Content too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in content'),

    contentPortuguese: z
      .string()
      .max(2000, 'Portuguese content too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in Portuguese content')
      .optional(),

    tags: z
      .array(z.string().max(30).regex(PORTUGUESE_PATTERNS.culturalKeyword))
      .max(10, 'Maximum 10 tags allowed')
      .optional(),

    targetAudience: z
      .array(z.enum(['all', 'students', 'professionals', 'families', 'seniors', 'businesses']))
      .max(5)
      .optional(),

    palopOrigins: z
      .array(z.enum(['portugal', 'brazil', 'angola', 'mozambique', 'cape_verde', 'guinea_bissau', 'sao_tome_principe', 'east_timor']))
      .max(8)
      .optional(),

    rateToken: z.string().optional(),
  }),
}

/**
 * Upload API Validation
 */
export const UploadValidation = {
  // File upload
  file: z.object({
    filename: z
      .string()
      .min(1, 'Filename required')
      .max(255, 'Filename too long')
      .regex(/^[A-Za-z0-9\s\-_\.\(\)]+$/, 'Invalid filename characters'),

    fileSize: z
      .number()
      .int()
      .min(1, 'File cannot be empty')
      .max(10 * 1024 * 1024, 'File too large (max 10MB)'),

    mimeType: z.enum([
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'application/pdf', 'text/plain', 'text/csv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]),

    uploadType: z.enum(['profile_photo', 'business_photo', 'event_photo', 'document', 'cultural_content']),

    altText: z
      .string()
      .max(200, 'Alt text too long')
      .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in alt text')
      .optional(),

    rateToken: z.string().optional(),
  }),

  // Multiple file upload
  multiple: z.object({
    files: z
      .array(z.object({
        filename: z.string().max(255),
        fileSize: z.number().max(5 * 1024 * 1024),
        mimeType: z.string(),
      }))
      .min(1, 'At least one file required')
      .max(5, 'Maximum 5 files allowed'),

    uploadType: z.enum(['event_photos', 'business_photos', 'cultural_gallery']),
    rateToken: z.string().optional(),
  }),
}

/**
 * Rate Limiting and Security Validation
 */
export const SecurityValidation = {
  // Rate limit check
  rateLimit: z.object({
    action: z.enum([
      'signup', 'login', 'password_reset', 'business_create', 'event_create',
      'message_send', 'upload', 'search', 'feed_create'
    ]),
    identifier: z.string().min(1).max(100),
    userAgent: z.string().max(500).optional(),
    ipAddress: z.string().ip().optional(),
  }),

  // CSRF token validation
  csrf: z.object({
    token: z.string().min(32, 'Invalid CSRF token'),
    action: z.string().max(100),
  }),

  // Content moderation
  moderation: z.object({
    content: z.string().min(1).max(10000),
    contentType: z.enum(['text', 'html', 'markdown']),
    language: z.enum(['portuguese', 'english', 'auto']).default('auto'),
    strictMode: z.boolean().default(false),
  }),
}

// Export all validation schemas
export const APIValidation = {
  auth: AuthValidation,
  businessDirectory: BusinessDirectoryValidation,
  events: EventsValidation,
  messaging: MessagingValidation,
  feed: FeedValidation,
  upload: UploadValidation,
  security: SecurityValidation,
}

// Generic validation error handler
export class ValidationError extends Error {
  public issues: string[]
  public statusCode: number

  constructor(message: string, issues: string[] = [], statusCode: number = 400) {
    super(message)
    this.name = 'ValidationError'
    this.issues = issues
    this.statusCode = statusCode
  }
}

// Validation middleware helper
export function validateAPIInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
      throw new ValidationError('Validation failed', issues, 400)
    }
    throw new ValidationError('Invalid input data', [], 400)
  }
}