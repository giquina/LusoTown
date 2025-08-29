/**
 * Comprehensive Zod Validation Schemas for Portuguese Community Platform Forms
 * Includes Portuguese-specific validation patterns and bilingual error messages
 */

import { z } from 'zod'
import { PORTUGUESE_PATTERNS, VALIDATION_MESSAGES } from '@/lib/security/input-validation'

// Portuguese Cultural Enhancement Constants
const PORTUGUESE_REGIONS = [
  'minho', 'douro', 'tras_os_montes', 'beira', 'estremadura', 'ribatejo',
  'alentejo', 'algarve', 'azores', 'madeira', 'lisboa', 'porto', 'coimbra'
] as const

const BRAZILIAN_STATES = [
  'acre', 'alagoas', 'amapa', 'amazonas', 'bahia', 'ceara', 'distrito_federal',
  'espirito_santo', 'goias', 'maranhao', 'mato_grosso', 'mato_grosso_do_sul',
  'minas_gerais', 'para', 'paraiba', 'parana', 'pernambuco', 'piaui',
  'rio_de_janeiro', 'rio_grande_do_norte', 'rio_grande_do_sul', 'rondonia',
  'roraima', 'santa_catarina', 'sao_paulo', 'sergipe', 'tocantins'
] as const

const PALOP_COUNTRIES = [
  'angola', 'brazil', 'cape_verde', 'guinea_bissau', 'mozambique', 
  'portugal', 'sao_tome_principe', 'east_timor'
] as const

const LONDON_AREAS = [
  'central', 'east', 'north', 'south', 'west', 'southeast', 'southwest',
  'northwest', 'northeast', 'greater_london'
] as const

const UK_UNIVERSITIES = [
  'ucl', 'kings_college', 'imperial', 'lse', 'oxford', 'cambridge',
  'manchester', 'edinburgh', 'warwick', 'bristol', 'glasgow', 'durham'
] as const

/**
 * Enhanced Business Directory Form Validation
 * Comprehensive validation for Portuguese businesses in London
 */
export const BusinessDirectorySchema = z.object({
  // Basic Business Information
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name too long')
    .regex(PORTUGUESE_PATTERNS.businessName, 'Invalid characters in business name')
    .transform(val => val.trim()),

  businessNamePortuguese: z
    .string()
    .max(100, 'Portuguese business name too long')
    .regex(PORTUGUESE_PATTERNS.businessName, 'Invalid characters in Portuguese name')
    .transform(val => val.trim())
    .optional(),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in description')
    .transform(val => val.trim()),

  descriptionPortuguese: z
    .string()
    .max(1000, 'Portuguese description too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in Portuguese description')
    .transform(val => val.trim())
    .optional(),

  // Business Category and Specialization
  category: z.enum([
    'restaurant', 'cafe', 'grocery', 'bakery', 'clothing', 'services',
    'healthcare', 'education', 'entertainment', 'professional_services',
    'cultural_center', 'religious_organization', 'sports_recreation',
    'travel_tourism', 'media_communication', 'financial_services',
    'beauty_wellness', 'automotive', 'construction', 'technology', 'other'
  ], { errorMap: () => ({ message: 'Please select a valid business category' }) }),

  portugueseSpecialties: z
    .array(z.enum([
      'traditional_food', 'pasteis_de_nata', 'bacalhau_dishes', 'portuguese_wine',
      'fado_music', 'cultural_events', 'portuguese_classes', 'dance_lessons',
      'portuguese_books', 'azulejo_tiles', 'handicrafts', 'religious_services',
      'festival_organization', 'travel_portugal', 'translation_services',
      'legal_immigration', 'portuguese_media', 'community_center', 'other'
    ]))
    .max(5, 'Maximum 5 specialties allowed')
    .optional(),

  // Location Information
  address: z
    .string()
    .min(10, 'Address too short')
    .max(200, 'Address too long')
    .regex(PORTUGUESE_PATTERNS.address, 'Invalid address format')
    .transform(val => val.trim()),

  postcode: z
    .string()
    .regex(PORTUGUESE_PATTERNS.ukPostalCode, 'Invalid UK postcode')
    .transform(val => val.toUpperCase().trim()),

  londonArea: z
    .enum(LONDON_AREAS, { errorMap: () => ({ message: 'Please select a valid London area' }) }),

  // Contact Information
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
    .max(255, 'Email too long')
    .transform(val => val.toLowerCase().trim()),

  website: z
    .string()
    .regex(PORTUGUESE_PATTERNS.url, 'Invalid website URL')
    .max(255, 'Website URL too long')
    .optional()
    .or(z.literal('')),

  // Owner/Manager Information
  ownerName: z
    .string()
    .min(2, 'Owner name too short')
    .max(100, 'Owner name too long')
    .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in owner name'),

  ownerRegion: z
    .enum([...PORTUGUESE_REGIONS, ...BRAZILIAN_STATES])
    .optional(),

  palopOrigin: z
    .enum(PALOP_COUNTRIES)
    .optional(),

  // Business Details
  yearEstablished: z
    .number()
    .int('Year must be a whole number')
    .min(1800, 'Year too early')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),

  employeeCount: z
    .enum(['1', '2-5', '6-10', '11-25', '26-50', '51-100', '100+'])
    .optional(),

  // Operating Hours
  operatingHours: z.object({
    monday: z.string().max(50).optional(),
    tuesday: z.string().max(50).optional(),
    wednesday: z.string().max(50).optional(),
    thursday: z.string().max(50).optional(),
    friday: z.string().max(50).optional(),
    saturday: z.string().max(50).optional(),
    sunday: z.string().max(50).optional(),
  }).optional(),

  // Cultural and Community Information
  languagesSpoken: z
    .array(z.enum(['portuguese', 'english', 'spanish', 'french', 'other']))
    .min(1, 'Select at least one language'),

  supportsCulturalEvents: z.boolean().default(false),
  acceptsPortuguesePayments: z.boolean().default(false),
  offersStudentDiscounts: z.boolean().default(false),

  // Keywords for Search
  keywords: z
    .array(z.string().max(30).regex(PORTUGUESE_PATTERNS.culturalKeyword))
    .max(10, 'Maximum 10 keywords allowed')
    .optional(),

  // Social Media
  socialMedia: z.object({
    facebook: z.string().regex(PORTUGUESE_PATTERNS.url).optional().or(z.literal('')),
    instagram: z.string().regex(PORTUGUESE_PATTERNS.url).optional().or(z.literal('')),
    twitter: z.string().regex(PORTUGUESE_PATTERNS.url).optional().or(z.literal('')),
    whatsapp: z.string().regex(PORTUGUESE_PATTERNS.internationalPhone).optional().or(z.literal('')),
  }).optional(),

  // Verification and Consent
  businessLicenseNumber: z.string().max(100).optional(),
  vatNumber: z.string().max(50).optional(),
  gdprConsent: z
    .boolean()
    .refine(val => val === true, 'GDPR consent required'),
  marketingConsent: z.boolean().default(false),
  verificationConsent: z.boolean().default(false),
})

/**
 * User Registration/Signup Form Validation
 * Enhanced validation for Portuguese community members
 */
export const UserRegistrationSchema = z.object({
  // Basic Information
  firstName: z
    .string()
    .min(1, 'First name required')
    .max(50, 'First name too long')
    .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in name'),

  lastName: z
    .string()
    .min(1, 'Last name required')
    .max(50, 'Last name too long')
    .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in name'),

  email: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .transform(val => val.toLowerCase().trim()),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/, 
           'Password must contain uppercase, lowercase, number, and special character'),

  confirmPassword: z.string(),

  // Portuguese Cultural Information
  palopOrigin: z
    .enum(PALOP_COUNTRIES, { errorMap: () => ({ message: 'Please select your PALOP origin' }) }),

  regionOfOrigin: z
    .enum([...PORTUGUESE_REGIONS, ...BRAZILIAN_STATES])
    .optional(),

  languagePreference: z
    .enum(['portuguese', 'english', 'both'])
    .default('both'),

  // Location in UK
  currentCity: z
    .string()
    .max(100, 'City name too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in city name'),

  londonArea: z
    .enum(LONDON_AREAS)
    .optional(),

  postcode: z
    .string()
    .regex(PORTUGUESE_PATTERNS.ukPostalCode, 'Invalid UK postcode')
    .optional(),

  // Personal Information
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => {
      const birthDate = new Date(date)
      const now = new Date()
      const age = now.getFullYear() - birthDate.getFullYear()
      return age >= 16 && age <= 120
    }, 'Invalid age range'),

  phoneNumber: z
    .string()
    .refine((phone) => {
      return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
             PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
             PORTUGUESE_PATTERNS.brazilPhone.test(phone)
    }, 'Invalid phone number format')
    .optional(),

  // Community Interests
  communityInterests: z
    .array(z.enum([
      'cultural_events', 'business_networking', 'language_exchange',
      'food_culture', 'music_fado', 'sports', 'education', 'family_activities',
      'professional_development', 'entrepreneurship', 'travel_portugal',
      'religious_community', 'arts_crafts', 'literature', 'history'
    ]))
    .max(10, 'Maximum 10 interests allowed')
    .optional(),

  // University Information (for students)
  isStudent: z.boolean().default(false),
  university: z
    .enum(UK_UNIVERSITIES)
    .optional(),
  courseOfStudy: z
    .string()
    .max(100, 'Course name too long')
    .optional(),
  graduationYear: z
    .number()
    .int()
    .min(new Date().getFullYear(), 'Graduation year must be in the future')
    .max(new Date().getFullYear() + 10, 'Graduation year too far in future')
    .optional(),

  // Professional Information
  profession: z
    .string()
    .max(100, 'Profession description too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in profession')
    .optional(),

  employmentStatus: z
    .enum(['employed', 'self_employed', 'student', 'unemployed', 'retired'])
    .optional(),

  // Membership Preferences
  membershipType: z
    .enum(['community', 'business', 'student', 'cultural'])
    .default('community'),

  // Privacy and Communication
  profileVisibility: z
    .enum(['public', 'community', 'private'])
    .default('community'),

  communicationPreferences: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    whatsapp: z.boolean().default(false),
    communityUpdates: z.boolean().default(true),
    eventNotifications: z.boolean().default(true),
    businessUpdates: z.boolean().default(false),
  }).optional(),

  // Consent and Terms
  termsAccepted: z
    .boolean()
    .refine(val => val === true, 'Terms and conditions must be accepted'),
  
  privacyPolicyAccepted: z
    .boolean()
    .refine(val => val === true, 'Privacy policy must be accepted'),

  gdprConsent: z
    .boolean()
    .refine(val => val === true, 'GDPR consent required'),

  marketingConsent: z.boolean().default(false),
  communityGuidelinesAccepted: z
    .boolean()
    .refine(val => val === true, 'Community guidelines must be accepted'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})

/**
 * Event Creation Form Validation
 * Portuguese community events with cultural celebration support
 */
export const EventCreationSchema = z.object({
  // Basic Event Information
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

  descriptionPortuguese: z
    .string()
    .max(2000, 'Portuguese description too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in Portuguese description')
    .optional(),

  // Event Type and Category
  eventType: z.enum(['online', 'in_person', 'hybrid']),

  culturalCategory: z.enum([
    'festival', 'cultural_celebration', 'religious_celebration', 'food_wine',
    'music_concert', 'dance_event', 'art_exhibition', 'language_exchange',
    'business_networking', 'educational', 'sports', 'family_event',
    'community_gathering', 'charity_fundraiser', 'academic', 'professional_development',
    'entrepreneurship', 'cultural_workshop', 'historical_tour', 'other'
  ]),

  portugueseCelebration: z.enum([
    'festa_de_sao_joao', 'festa_de_santo_antonio', 'festa_de_sao_pedro',
    'festa_dos_tabuleiros', 'carnaval', 'festa_da_flor', 'festa_do_avante',
    'festa_das_vindimas', 'natal', 'pascoa', 'dia_de_portugal',
    'dia_da_independencia_brasil', 'dia_da_consciencia_negra',
    'festa_junina', 'festa_de_iemanja', 'festa_do_divino',
    'festa_de_nossa_senhora', 'festa_do_espirito_santo', 'other', 'none'
  ]).default('none'),

  // Date and Time
  startDate: z
    .string()
    .datetime('Invalid datetime format')
    .refine(date => new Date(date) > new Date(), 'Event must be in the future'),

  endDate: z
    .string()
    .datetime('Invalid datetime format'),

  allDay: z.boolean().default(false),

  // Location Information
  venue: z
    .string()
    .max(200, 'Venue name too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in venue name')
    .optional(),

  address: z
    .string()
    .max(300, 'Address too long')
    .regex(PORTUGUESE_PATTERNS.address, 'Invalid characters in address')
    .optional(),

  postcode: z
    .string()
    .regex(PORTUGUESE_PATTERNS.ukPostalCode, 'Invalid UK postcode')
    .optional(),

  londonArea: z
    .enum(LONDON_AREAS)
    .optional(),

  virtualLink: z
    .string()
    .regex(PORTUGUESE_PATTERNS.url, 'Invalid URL format')
    .optional(),

  // Capacity and Pricing
  maxAttendees: z
    .number()
    .int()
    .min(1, 'At least 1 attendee required')
    .max(1000, 'Too many attendees')
    .optional(),

  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(500, 'Price too high')
    .default(0),

  currency: z
    .enum(['GBP', 'EUR', 'USD'])
    .default('GBP'),

  // Organizer Information
  organizerName: z
    .string()
    .min(2, 'Organizer name too short')
    .max(100, 'Organizer name too long')
    .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in organizer name'),

  organizerEmail: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long'),

  organizerPhone: z
    .string()
    .refine((phone) => {
      return PORTUGUESE_PATTERNS.ukPhone.test(phone) ||
             PORTUGUESE_PATTERNS.portugalPhone.test(phone) ||
             PORTUGUESE_PATTERNS.brazilPhone.test(phone)
    }, 'Invalid phone number format')
    .optional(),

  // Event Details
  tags: z
    .array(z.string().max(30).regex(PORTUGUESE_PATTERNS.culturalKeyword))
    .max(10, 'Maximum 10 tags allowed')
    .optional(),

  ageRestriction: z.object({
    minimumAge: z.number().min(0).max(100).optional(),
    maximumAge: z.number().min(0).max(100).optional(),
  }).refine(data => {
    if (data.minimumAge && data.maximumAge) {
      return data.minimumAge <= data.maximumAge
    }
    return true
  }, 'Minimum age must be less than or equal to maximum age').optional(),

  // Accessibility
  accessibility: z.object({
    wheelchairAccessible: z.boolean().default(false),
    hearingLoop: z.boolean().default(false),
    signLanguage: z.boolean().default(false),
    portugueseTranslation: z.boolean().default(false),
    brailleProgram: z.boolean().default(false),
  }).optional(),

  // Community Guidelines
  alcoholServed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  childFriendly: z.boolean().default(true),
  petFriendly: z.boolean().default(false),

  // Consent and Verification
  culturalAuthenticity: z
    .boolean()
    .refine(val => val === true, 'Cultural authenticity verification required'),
  
  communityGuidelinesAccepted: z
    .boolean()
    .refine(val => val === true, 'Community guidelines must be accepted'),

  gdprConsent: z
    .boolean()
    .refine(val => val === true, 'GDPR consent required'),
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate']
})

/**
 * Community Messaging Form Validation
 * Safe messaging for Portuguese community members
 */
export const CommunityMessagingSchema = z.object({
  recipientId: z
    .string()
    .uuid('Invalid recipient ID'),

  subject: z
    .string()
    .min(1, 'Subject required')
    .max(100, 'Subject too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in subject')
    .optional(),

  message: z
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

  // Safety and Community Guidelines
  communityGuidelinesAccepted: z
    .boolean()
    .refine(val => val === true, 'Community guidelines must be accepted'),
})

/**
 * Portuguese Community Feedback Form
 * User feedback and suggestions with cultural context
 */
export const CommunityFeedbackSchema = z.object({
  feedbackType: z.enum([
    'suggestion', 'complaint', 'compliment', 'bug_report', 'feature_request',
    'cultural_feedback', 'event_feedback', 'business_feedback', 'general'
  ]),

  subject: z
    .string()
    .min(5, 'Subject too short')
    .max(100, 'Subject too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in subject'),

  message: z
    .string()
    .min(20, 'Message too short')
    .max(3000, 'Message too long')
    .regex(PORTUGUESE_PATTERNS.culturalText, 'Invalid characters in message'),

  userName: z
    .string()
    .max(100, 'Name too long')
    .regex(PORTUGUESE_PATTERNS.name, 'Invalid characters in name')
    .optional(),

  userEmail: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .optional(),

  palopOrigin: z
    .enum(PALOP_COUNTRIES)
    .optional(),

  urgency: z
    .enum(['low', 'medium', 'high', 'critical'])
    .default('medium'),

  allowFollowUp: z.boolean().default(true),
  gdprConsent: z
    .boolean()
    .refine(val => val === true, 'GDPR consent required'),
})

// Export all schemas and types
export type BusinessDirectoryFormData = z.infer<typeof BusinessDirectorySchema>
export type UserRegistrationFormData = z.infer<typeof UserRegistrationSchema>
export type EventCreationFormData = z.infer<typeof EventCreationSchema>
export type CommunityMessagingFormData = z.infer<typeof CommunityMessagingSchema>
export type CommunityFeedbackFormData = z.infer<typeof CommunityFeedbackSchema>

// Export validation functions
export const validateBusinessDirectory = (data: unknown) => BusinessDirectorySchema.parse(data)
export const validateUserRegistration = (data: unknown) => UserRegistrationSchema.parse(data)
export const validateEventCreation = (data: unknown) => EventCreationSchema.parse(data)
export const validateCommunityMessaging = (data: unknown) => CommunityMessagingSchema.parse(data)
export const validateCommunityFeedback = (data: unknown) => CommunityFeedbackSchema.parse(data)

// Bilingual error message translator
export function translateValidationError(error: string, language: 'en' | 'pt'): string {
  const translations: Record<string, Record<string, string>> = {
    // Business validation errors
    'Business name must be at least 2 characters': {
      pt: 'Nome do negócio deve ter pelo menos 2 caracteres'
    },
    'Business name too long': {
      pt: 'Nome do negócio muito longo'
    },
    'Invalid characters in business name': {
      pt: 'Caracteres inválidos no nome do negócio'
    },
    'Description must be at least 20 characters': {
      pt: 'Descrição deve ter pelo menos 20 caracteres'
    },
    'Please select a valid business category': {
      pt: 'Por favor, selecione uma categoria de negócio válida'
    },
    'Invalid phone number format': {
      pt: 'Formato de número de telefone inválido'
    },
    'Invalid UK postcode': {
      pt: 'Código postal do Reino Unido inválido'
    },
    'GDPR consent required': {
      pt: 'Consentimento GDPR obrigatório'
    },

    // User registration errors
    'First name required': {
      pt: 'Primeiro nome obrigatório'
    },
    'Invalid email format': {
      pt: 'Formato de email inválido'
    },
    'Password must be at least 8 characters': {
      pt: 'Palavra-passe deve ter pelo menos 8 caracteres'
    },
    'Passwords must match': {
      pt: 'Palavras-passe devem coincidir'
    },
    'Terms and conditions must be accepted': {
      pt: 'Termos e condições devem ser aceites'
    },
    'Invalid age range': {
      pt: 'Faixa etária inválida'
    },

    // Event creation errors
    'Event must be in the future': {
      pt: 'Evento deve estar no futuro'
    },
    'End date must be after start date': {
      pt: 'Data de fim deve ser depois da data de início'
    },
    'Cultural authenticity verification required': {
      pt: 'Verificação de autenticidade cultural obrigatória'
    },

    // Messaging errors
    'Message cannot be empty': {
      pt: 'Mensagem não pode estar vazia'
    },
    'Community guidelines must be accepted': {
      pt: 'Diretrizes da comunidade devem ser aceites'
    }
  }

  return translations[error]?.[language] || error
}