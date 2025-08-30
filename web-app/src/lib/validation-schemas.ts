/**
 * Comprehensive Input Validation Schemas for Portuguese Community Platform
 * 
 * This module provides Zod validation schemas for all forms and data inputs
 * in the LusoTown platform, with special focus on Portuguese community data
 * integrity, bilingual content validation, and cultural authenticity.
 * 
 * Features:
 * - Business directory submissions with Portuguese cultural context
 * - Event creation forms with PALOP nation support
 * - User profile forms with heritage validation
 * - Contact/messaging forms with Portuguese domain support
 * - Bilingual text field validation (EN/PT)
 * - UK Portuguese community address validation
 * - Portuguese phone number format validation
 * - Cultural data validation with PALOP context
 */

import { z } from 'zod'
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries'
import { PALOP_BUSINESS_DIRECTORY } from '@/config/palop-business-directory'

// =============================================================================
// UTILITY VALIDATORS AND CONSTANTS
// =============================================================================

/**
 * Portuguese Community Areas in the UK
 * Used for address validation and community context
 */
const PORTUGUESE_COMMUNITY_AREAS = [
  // Greater London Portuguese areas
  'Stockwell', 'Vauxhall', 'Kennington', 'Oval', 'Elephant and Castle',
  'South Lambeth', 'Nine Elms', 'Battersea', 'Clapham', 'Brixton',
  'Peckham', 'East Dulwich', 'Crystal Palace', 'Norwood',
  'Golborne Road', 'Notting Hill', 'Portobello', 'Ladbroke Grove',
  'Hammersmith', 'Shepherds Bush', 'White City', 'East Acton',
  'Thornton Heath', 'Croydon', 'Mitcham', 'Tooting', 'Streatham',
  
  // Manchester Portuguese community
  'Rusholme', 'Fallowfield', 'Withington', 'Didsbury', 'Chorlton',
  
  // Birmingham Portuguese areas
  'Sparkbrook', 'Small Heath', 'Aston', 'Handsworth',
  
  // Leeds Portuguese community
  'Harehills', 'Chapeltown', 'Roundhay', 'Headingley',
  
  // Liverpool Portuguese areas
  'Toxteth', 'Liverpool 8', 'Edge Hill', 'Wavertree',
  
  // Other UK Portuguese communities
  'Bristol', 'Cardiff', 'Edinburgh', 'Glasgow', 'Dundee',
  'Portsmouth', 'Southampton', 'Brighton', 'Reading', 'Oxford',
  'Cambridge', 'Norwich', 'Newcastle', 'Sunderland', 'Middlesbrough'
] as const

/**
 * Portuguese Domain Extensions
 * For email validation with Portuguese community context
 */
const PORTUGUESE_DOMAINS = [
  // Portugal domains
  'gmail.com', 'hotmail.com', 'sapo.pt', 'clix.pt', 'iol.pt', 
  'portugalmail.com', 'mail.telepac.pt', 'netcabo.pt', 'ip.pt',
  
  // Brazilian domains
  'gmail.com', 'hotmail.com', 'uol.com.br', 'globo.com', 'terra.com.br',
  'ig.com.br', 'yahoo.com.br', 'bol.com.br', 'outlook.com.br',
  
  // Angola domains
  'gmail.com', 'hotmail.com', 'netangola.com', 'angola.com',
  
  // Cape Verde domains
  'gmail.com', 'hotmail.com', 'cvtelecom.cv', 'sapo.cv',
  
  // Mozambique domains
  'gmail.com', 'hotmail.com', 'tvcabo.co.mz', 'teledata.mz',
  
  // Guinea-Bissau domains
  'gmail.com', 'hotmail.com', 'guinea-bissau.net',
  
  // São Tomé and Príncipe domains
  'gmail.com', 'hotmail.com', 'cstome.net',
  
  // East Timor domains
  'gmail.com', 'hotmail.com', 'timor-leste.gov.tl',
  
  // International Portuguese community
  'outlook.com', 'yahoo.com', 'live.com', 'me.com', 'icloud.com'
] as const

/**
 * Business Categories with Portuguese Cultural Context
 */
const PORTUGUESE_BUSINESS_CATEGORIES = [
  'restaurants', 'cafes', 'bakeries', 'food_services',
  'import_export', 'retail', 'supermarkets', 'specialty_stores',
  'professional_services', 'legal_services', 'accounting', 'consulting',
  'beauty_wellness', 'hairdressing', 'spa_services', 'healthcare',
  'cultural_services', 'language_teaching', 'dance_instruction', 'music_education',
  'technology', 'digital_services', 'web_development', 'it_consulting',
  'finance', 'banking', 'insurance', 'investment',
  'education', 'tutoring', 'universities', 'schools',
  'construction', 'architecture', 'engineering', 'maintenance',
  'transportation', 'travel_services', 'logistics', 'delivery',
  'entertainment', 'events', 'media', 'photography',
  'tourism', 'travel_agencies', 'accommodation', 'tour_guides',
  'religious_services', 'community_centers', 'cultural_centers', 'sports_clubs'
] as const

/**
 * Event Types with PALOP Cultural Context
 */
const PORTUGUESE_EVENT_TYPES = [
  'cultural_festival', 'festa', 'celebration',
  'music_concert', 'dance_performance', 'theater',
  'food_festival', 'wine_tasting', 'culinary_event',
  'sports_event', 'football_match', 'cultural_sports',
  'religious_ceremony', 'procession', 'mass',
  'educational_workshop', 'language_class', 'cultural_course',
  'business_networking', 'professional_meetup', 'conference',
  'community_meeting', 'social_gathering', 'family_event',
  'art_exhibition', 'gallery_opening', 'cultural_showcase',
  'independence_day', 'national_celebration', 'historical_commemoration',
  'children_event', 'youth_gathering', 'senior_event',
  'fundraising', 'charity_event', 'community_support'
] as const

// =============================================================================
// COMMON VALIDATION PATTERNS
// =============================================================================

/**
 * UK Phone Number Validation (Portuguese Community Format)
 * Supports: +44, 07, landline formats commonly used by Portuguese speakers
 */
export const ukPhoneSchema = z.string()
  .regex(/^(?:\+44\s?)?(?:0\s?)?(?:7\d{9}|[1-9]\d{8,9})$/, 'Invalid UK phone number')
  .or(z.string().regex(/^\+44\s?20\s?\d{4}\s?\d{4}$/, 'London landline format: +44 20 1234 5678'))
  .or(z.string().regex(/^07\d{9}$/, 'Mobile format: 07123456789'))
  .or(z.string().regex(/^0[1-9]\d{8,9}$/, 'Landline format: 0123456789'))

/**
 * Portuguese Phone Number Validation
 * Supports: +351, 9X mobile, 2X landline formats
 */
export const portuguesePhoneSchema = z.string()
  .regex(/^(?:\+351\s?)?(?:9[1236]\d{7}|2[1-9]\d{7})$/, 'Invalid Portuguese phone number')
  .or(z.string().regex(/^\+351\s?9[1236]\s?\d{3}\s?\d{3}\s?\d{3}$/, 'Portugal mobile: +351 91 123 456 789'))
  .or(z.string().regex(/^\+351\s?2[1-9]\s?\d{3}\s?\d{4}$/, 'Portugal landline: +351 21 123 4567'))

/**
 * Brazilian Phone Number Validation
 * Supports: +55, (XX) mobile and landline formats
 */
export const brazilianPhoneSchema = z.string()
  .regex(/^(?:\+55\s?)?\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, 'Invalid Brazilian phone number')
  .or(z.string().regex(/^\+55\s?\(\d{2}\)\s?9\d{4}-\d{4}$/, 'Brazil mobile: +55 (11) 91234-5678'))
  .or(z.string().regex(/^\+55\s?\(\d{2}\)\s?\d{4}-\d{4}$/, 'Brazil landline: +55 (11) 1234-5678'))

/**
 * UK Postcode Validation
 * Comprehensive UK postcode pattern matching
 */
export const ukPostcodeSchema = z.string()
  .regex(/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i, 'Invalid UK postcode format')
  .transform(val => val.toUpperCase().replace(/\s+/g, ' ').trim())

/**
 * Portuguese Postcode Validation
 * Format: 1234-123
 */
export const portuguesePostcodeSchema = z.string()
  .regex(/^\d{4}-\d{3}$/, 'Invalid Portuguese postcode (format: 1234-123)')

/**
 * Brazilian Postcode (CEP) Validation
 * Format: 12345-678 or 12345678
 */
export const brazilianPostcodeSchema = z.string()
  .regex(/^\d{5}-?\d{3}$/, 'Invalid Brazilian postcode (format: 12345-678)')
  .transform(val => val.replace(/(\d{5})(\d{3})/, '$1-$2'))

/**
 * Email Validation with Portuguese Domain Context
 */
export const emailSchema = z.string()
  .email('Invalid email format')
  .toLowerCase()
  .refine(email => {
    const domain = email.split('@')[1]
    return PORTUGUESE_DOMAINS.includes(domain as any) || 
           email.includes('.pt') || 
           email.includes('.br') || 
           email.includes('.ao') ||
           email.includes('.cv') ||
           email.includes('.mz') ||
           email.includes('.gw') ||
           email.includes('.st') ||
           email.includes('.tl') ||
           domain.includes('gmail') ||
           domain.includes('hotmail') ||
           domain.includes('outlook')
  }, 'Email domain should be from a Portuguese-speaking community or common provider')

/**
 * Bilingual Text Validation (EN/PT)
 * Ensures both English and Portuguese versions are provided
 */
export const bilingualTextSchema = z.object({
  en: z.string().min(1, 'English text is required'),
  pt: z.string().min(1, 'Portuguese text is required')
}).refine(data => {
  // Check for Portuguese characters in PT version
  const hasPortugueseChars = /[ãàáâçéêíóôõú]/i.test(data.pt)
  return hasPortugueseChars || data.pt !== data.en
}, 'Portuguese text should contain Portuguese characters or be different from English')

/**
 * Cultural Heritage Validation
 * Validates Portuguese/PALOP cultural heritage selection
 */
export const culturalHeritageSchema = z.object({
  primaryCountry: z.enum(PORTUGUESE_SPEAKING_COUNTRIES.map(c => c.code) as any),
  region: z.string().optional(),
  culturalBackground: z.array(z.string()).min(1, 'At least one cultural background required'),
  languagePreference: z.enum(['pt', 'en', 'both']),
  heritageStrength: z.enum(['strong', 'moderate', 'developing']).optional()
})

/**
 * Portuguese Address Validation (UK Context)
 * Validates UK addresses with Portuguese community area detection
 */
export const portugueseUKAddressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: ukPostcodeSchema,
  area: z.string().optional(),
  isPortugueseArea: z.boolean().optional()
}).transform(data => {
  // Detect if address is in known Portuguese community area
  const isPortugueseArea = PORTUGUESE_COMMUNITY_AREAS.some(area => 
    data.street.toLowerCase().includes(area.toLowerCase()) ||
    data.city.toLowerCase().includes(area.toLowerCase())
  )
  
  return {
    ...data,
    isPortugueseArea
  }
})

// =============================================================================
// BUSINESS DIRECTORY VALIDATION SCHEMAS
// =============================================================================

/**
 * Business Directory Submission Schema
 * Comprehensive validation for Portuguese business listings
 */
export const businessDirectorySchema = z.object({
  // Basic Business Information
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessNamePortuguese: z.string().optional(),
  ownerName: z.string().min(2, 'Owner name is required'),
  ownerCountry: z.enum(PORTUGUESE_SPEAKING_COUNTRIES.map(c => c.code.toLowerCase()) as any),
  
  // Business Classification
  category: z.enum(PORTUGUESE_BUSINESS_CATEGORIES),
  subcategory: z.string().min(1, 'Subcategory is required'),
  businessType: z.enum(['sole_trader', 'partnership', 'limited_company', 'franchise']),
  
  // Business Description (Bilingual)
  description: z.string().min(50, 'Description must be at least 50 characters'),
  descriptionPortuguese: z.string().min(50, 'Portuguese description must be at least 50 characters'),
  specialties: z.array(z.string()).min(1, 'At least one specialty required'),
  uniqueSellingPoint: z.string().min(20, 'Unique selling point must be at least 20 characters'),
  culturalConnection: z.string().min(30, 'Cultural connection description required'),
  
  // Location & Contact Information
  address: z.string().min(10, 'Full address is required'),
  postcode: ukPostcodeSchema,
  city: z.string().min(1, 'City is required'),
  region: z.string().min(1, 'Region is required'),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).optional(),
  
  phone: z.union([ukPhoneSchema, portuguesePhoneSchema, brazilianPhoneSchema]),
  email: emailSchema,
  website: z.string().url().optional(),
  
  // Business Hours
  openingHours: z.object({
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string().optional(),
    sunday: z.string().optional()
  }),
  
  // Services & Products (Bilingual)
  services: z.array(z.string()).min(1, 'At least one service required'),
  servicesPortuguese: z.array(z.string()).min(1, 'Portuguese services required'),
  priceRange: z.enum(['£', '££', '£££', '££££']),
  paymentMethods: z.array(z.string()).min(1, 'At least one payment method required'),
  languages: z.array(z.string()).min(1, 'Languages spoken must be specified'),
  
  // Cultural Elements
  culturalOfferings: z.array(z.string()),
  traditionalProducts: z.array(z.string()).optional(),
  culturalEvents: z.boolean().default(false),
  communitySupport: z.array(z.string()),
  
  // Business Success Metrics
  establishedYear: z.number().min(1900).max(new Date().getFullYear()),
  employees: z.number().min(1).max(10000),
  annualRevenue: z.string().optional(),
  awards: z.array(z.string()).optional(),
  certifications: z.array(z.string()),
  
  // Target Market & Community
  targetCustomers: z.array(z.string()).min(1, 'Target customers required'),
  communityInvolvement: z.array(z.string()),
  socialImpact: z.string().min(30, 'Social impact description required'),
  
  // Online Presence
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    youtube: z.string().url().optional(),
    tiktok: z.string().url().optional()
  }).optional(),
  
  // Business Development
  expansionPlans: z.string().optional(),
  partnershipInterests: z.array(z.string()),
  investmentSeeking: z.boolean().default(false),
  mentoringOffered: z.boolean().default(false),
  
  // Terms & Verification
  termsAccepted: z.boolean().refine(val => val === true, 'Terms must be accepted'),
  gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent required'),
  culturalAuthenticity: z.boolean().default(false),
  verificationDocuments: z.array(z.string()).optional()
}).refine(data => {
  // Ensure Portuguese content is provided for Portuguese businesses
  const requiresPortuguese = ['PT', 'BR', 'AO', 'MZ', 'CV'].includes(data.ownerCountry.toUpperCase())
  if (requiresPortuguese && !data.businessNamePortuguese) {
    return false
  }
  return true
}, {
  message: 'Portuguese business name required for businesses from Portuguese-speaking countries',
  path: ['businessNamePortuguese']
})

/**
 * Business Directory Update Schema
 * For existing business updates (partial validation)
 */
export const businessUpdateSchema = businessDirectorySchema.partial().extend({
  businessId: z.string().uuid('Valid business ID required'),
  lastUpdated: z.date().default(new Date())
})

// =============================================================================
// EVENT CREATION VALIDATION SCHEMAS
// =============================================================================

/**
 * Portuguese Event Creation Schema
 * Comprehensive validation for Portuguese community events
 */
export const portugueseEventSchema = z.object({
  // Basic Event Information
  title: bilingualTextSchema,
  description: bilingualTextSchema.refine(data => 
    data.en.length >= 100 && data.pt.length >= 100, 
    'Event descriptions must be at least 100 characters in both languages'
  ),
  culturalSignificance: z.string().min(50, 'Cultural significance must be explained'),
  
  // Event Classification
  eventType: z.enum(PORTUGUESE_EVENT_TYPES),
  culturalContext: z.array(z.string()).min(1, 'Cultural context tags required'),
  portugueseRegions: z.array(z.enum(PORTUGUESE_SPEAKING_COUNTRIES.map(c => c.code.toLowerCase()) as any)),
  targetAudience: z.array(z.string()).min(1, 'Target audience must be specified'),
  
  // Date & Time
  dateStart: z.date().refine(date => date > new Date(), 'Event must be in the future'),
  dateEnd: z.date(),
  timeZone: z.string().default('Europe/London'),
  recurring: z.boolean().default(false),
  recurrencePattern: z.string().optional(),
  
  // Location Information
  location: z.object({
    type: z.enum(['physical', 'virtual', 'hybrid']),
    venue: z.string().min(1, 'Venue name required'),
    address: portugueseUKAddressSchema.optional(),
    virtualLink: z.string().url().optional(),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180)
    }).optional(),
    accessibilityInfo: z.string().optional(),
    publicTransport: z.string().optional()
  }),
  
  // Ticketing & Pricing
  pricing: z.object({
    type: z.enum(['free', 'paid', 'donation', 'member_only']),
    priceGBP: z.number().min(0).optional(),
    currency: z.string().default('GBP'),
    earlyBirdPrice: z.number().min(0).optional(),
    memberDiscount: z.number().min(0).max(100).optional(),
    groupDiscounts: z.boolean().default(false)
  }),
  
  maxAttendees: z.number().min(1).max(10000),
  ageRestrictions: z.object({
    minAge: z.number().min(0).max(100).optional(),
    maxAge: z.number().min(0).max(100).optional(),
    childFriendly: z.boolean().default(false)
  }),
  
  // Organizer Information
  organizer: z.object({
    name: z.string().min(2, 'Organizer name required'),
    email: emailSchema,
    phone: z.union([ukPhoneSchema, portuguesePhoneSchema, brazilianPhoneSchema]),
    organization: z.string().optional(),
    website: z.string().url().optional(),
    culturalCredentials: z.array(z.string()).optional()
  }),
  
  // Cultural Requirements
  languageRequirements: z.array(z.enum(['portuguese', 'english', 'both', 'creole'])),
  culturalDressCode: z.string().optional(),
  traditionalElements: z.array(z.string()),
  foodAndDrink: z.object({
    provided: z.boolean().default(false),
    traditional: z.boolean().default(false),
    halal: z.boolean().default(false),
    vegetarian: z.boolean().default(false),
    alcoholServed: z.boolean().default(false)
  }),
  
  // Media & Promotion
  images: z.array(z.string().url()).optional(),
  promotionalVideo: z.string().url().optional(),
  socialMediaHashtags: z.array(z.string()).optional(),
  mediaContact: z.string().email().optional(),
  
  // Community & Networking
  networkingOpportunities: z.boolean().default(false),
  businessSponsorship: z.boolean().default(false),
  communityPartners: z.array(z.string()).optional(),
  volunteerOpportunities: z.boolean().default(false),
  
  // Safety & Requirements
  covidRequirements: z.string().optional(),
  safetyMeasures: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
  
  // Terms & Verification
  termsAccepted: z.boolean().refine(val => val === true, 'Terms must be accepted'),
  gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent required'),
  culturalAuthenticity: z.boolean().refine(val => val === true, 'Cultural authenticity confirmation required'),
  organizerVerification: z.boolean().default(false)
}).refine(data => {
  // Validate date range
  return data.dateEnd > data.dateStart
}, {
  message: 'End date must be after start date',
  path: ['dateEnd']
}).refine(data => {
  // Validate virtual events have virtual links
  if (data.location.type === 'virtual' || data.location.type === 'hybrid') {
    return !!data.location.virtualLink
  }
  return true
}, {
  message: 'Virtual link required for virtual or hybrid events',
  path: ['location', 'virtualLink']
}).refine(data => {
  // Validate paid events have pricing
  if (data.pricing.type === 'paid') {
    return data.pricing.priceGBP && data.pricing.priceGBP > 0
  }
  return true
}, {
  message: 'Price required for paid events',
  path: ['pricing', 'priceGBP']
})

/**
 * Event Update Schema
 * For existing event updates (partial validation)
 */
export const eventUpdateSchema = portugueseEventSchema.partial().extend({
  eventId: z.string().uuid('Valid event ID required'),
  lastUpdated: z.date().default(new Date()),
  updateReason: z.string().min(10, 'Update reason required')
})

// =============================================================================
// USER PROFILE VALIDATION SCHEMAS
// =============================================================================

/**
 * Portuguese Community User Profile Schema
 * Comprehensive validation for user profiles with cultural context
 */
export const portugueseCommunityProfileSchema = z.object({
  // Basic Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: emailSchema,
  phone: z.union([ukPhoneSchema, portuguesePhoneSchema, brazilianPhoneSchema]).optional(),
  
  dateOfBirth: z.date().refine(date => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 16 && age <= 100
  }, 'Age must be between 16 and 100'),
  
  gender: z.enum(['male', 'female', 'non_binary', 'prefer_not_to_say']).optional(),
  
  // Cultural Heritage & Background
  culturalHeritage: culturalHeritageSchema,
  
  // UK Location Information
  ukLocation: z.object({
    address: portugueseUKAddressSchema,
    yearsInUK: z.number().min(0).max(100),
    immigrationStatus: z.enum(['citizen', 'settled', 'visa', 'student', 'temporary', 'prefer_not_to_say']).optional(),
    localPortugueseCommunity: z.boolean().default(false)
  }),
  
  // Language Preferences
  languagePreferences: z.object({
    primaryLanguage: z.enum(['portuguese', 'english', 'both']),
    fluentLanguages: z.array(z.string()).min(1, 'At least one fluent language required'),
    learningLanguages: z.array(z.string()).optional(),
    accentPreference: z.enum(['portugal', 'brazil', 'angola', 'any', 'no_preference']).optional()
  }),
  
  // Interests & Activities
  interests: z.object({
    cultural: z.array(z.string()).min(1, 'At least one cultural interest required'),
    social: z.array(z.string()).optional(),
    business: z.array(z.string()).optional(),
    sports: z.array(z.string()).optional(),
    music: z.array(z.string()).optional(),
    food: z.array(z.string()).optional(),
    travel: z.array(z.string()).optional()
  }),
  
  // Professional Information
  professional: z.object({
    occupation: z.string().optional(),
    industry: z.string().optional(),
    workLocation: z.string().optional(),
    networkingInterests: z.array(z.string()).optional(),
    businessOwner: z.boolean().default(false),
    lookingForWork: z.boolean().default(false),
    mentorshipInterests: z.array(z.enum(['seeking', 'offering', 'both'])).optional()
  }).optional(),
  
  // Education (if applicable)
  education: z.object({
    currentStudent: z.boolean().default(false),
    university: z.string().optional(),
    course: z.string().optional(),
    graduationYear: z.number().min(2020).max(2030).optional(),
    degreeLevel: z.enum(['undergraduate', 'postgraduate', 'phd', 'other']).optional()
  }).optional(),
  
  // Community Involvement
  communityInvolvement: z.object({
    volunteerWork: z.array(z.string()).optional(),
    culturalOrganizations: z.array(z.string()).optional(),
    leadershipRoles: z.array(z.string()).optional(),
    eventOrganizing: z.boolean().default(false),
    communitySupport: z.array(z.string()).optional()
  }),
  
  // Privacy & Matching Preferences
  privacySettings: z.object({
    profileVisibility: z.enum(['public', 'community', 'matches_only', 'private']),
    showLocation: z.boolean().default(true),
    showAge: z.boolean().default(true),
    showWorkplace: z.boolean().default(false),
    contactableBy: z.enum(['everyone', 'community', 'matches', 'no_one'])
  }),
  
  matchingPreferences: z.object({
    lookingFor: z.array(z.enum(['friendship', 'networking', 'dating', 'business', 'mentorship'])),
    ageRange: z.object({
      min: z.number().min(16).max(100),
      max: z.number().min(16).max(100)
    }).optional(),
    locationRadius: z.number().min(1).max(500).default(25),
    culturalImportance: z.enum(['very_important', 'important', 'somewhat_important', 'not_important']),
    languageImportance: z.enum(['must_speak_portuguese', 'prefer_portuguese', 'either', 'prefer_english'])
  }).optional(),
  
  // Verification & Safety
  verification: z.object({
    emailVerified: z.boolean().default(false),
    phoneVerified: z.boolean().default(false),
    identityVerified: z.boolean().default(false),
    culturalVerified: z.boolean().default(false),
    backgroundChecked: z.boolean().default(false)
  }),
  
  // Terms & Consent
  termsAccepted: z.boolean().refine(val => val === true, 'Terms must be accepted'),
  gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent required'),
  marketingConsent: z.boolean().default(false),
  dataProcessingConsent: z.boolean().refine(val => val === true, 'Data processing consent required'),
  
  // Optional Profile Enhancement
  bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),
  profilePicture: z.string().url().optional(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional()
  }).optional()
}).refine(data => {
  // Validate age range in matching preferences
  if (data.matchingPreferences?.ageRange) {
    return data.matchingPreferences.ageRange.max >= data.matchingPreferences.ageRange.min
  }
  return true
}, {
  message: 'Maximum age must be greater than or equal to minimum age',
  path: ['matchingPreferences', 'ageRange', 'max']
})

/**
 * User Profile Update Schema
 * For existing profile updates (partial validation)
 */
export const profileUpdateSchema = portugueseCommunityProfileSchema.partial().extend({
  userId: z.string().uuid('Valid user ID required'),
  lastUpdated: z.date().default(new Date())
})

// =============================================================================
// CONTACT & MESSAGING VALIDATION SCHEMAS
// =============================================================================

/**
 * Contact Form Schema
 * For general contact and support messages
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: z.union([ukPhoneSchema, portuguesePhoneSchema, brazilianPhoneSchema]).optional(),
  
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum([
    'general_inquiry',
    'business_directory',
    'event_listing',
    'technical_support',
    'community_feedback',
    'partnership',
    'press_inquiry',
    'complaint',
    'suggestion',
    'cultural_question'
  ]),
  
  message: z.string().min(20, 'Message must be at least 20 characters'),
  language: z.enum(['en', 'pt', 'both']),
  
  // Portuguese Community Context
  userType: z.enum([
    'community_member',
    'business_owner',
    'event_organizer',
    'student',
    'visitor',
    'potential_member',
    'press',
    'partner_organization'
  ]),
  
  urgency: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  
  // Contact Preferences
  preferredResponse: z.enum(['email', 'phone', 'either']).default('email'),
  bestTimeToCall: z.string().optional(),
  timeZone: z.string().default('Europe/London'),
  
  // Privacy & Consent
  gdprConsent: z.boolean().refine(val => val === true, 'GDPR consent required'),
  marketingConsent: z.boolean().default(false),
  
  // Anti-spam
  honeypot: z.string().max(0, 'Bot detected').optional()
})

/**
 * Community Messaging Schema
 * For member-to-member messaging within the platform
 */
export const communityMessageSchema = z.object({
  recipientId: z.string().uuid('Valid recipient ID required'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').optional(),
  content: z.string().min(10, 'Message must be at least 10 characters'),
  
  messageType: z.enum([
    'text',
    'introduction',
    'event_invitation',
    'business_inquiry',
    'cultural_question',
    'networking',
    'mentorship',
    'collaboration'
  ]),
  
  language: z.enum(['en', 'pt', 'both']),
  culturalContext: z.array(z.string()).optional(),
  
  // Attachments
  attachments: z.array(z.object({
    url: z.string().url(),
    type: z.enum(['image', 'document', 'link']),
    name: z.string()
  })).max(5, 'Maximum 5 attachments allowed').optional(),
  
  // Privacy & Safety
  requestReadReceipt: z.boolean().default(false),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  
  // Community Guidelines Compliance
  guidelinesAccepted: z.boolean().refine(val => val === true, 'Community guidelines must be accepted')
})

// =============================================================================
// EXPORT TYPES FOR TYPE SAFETY
// =============================================================================

export type BusinessDirectoryInput = z.infer<typeof businessDirectorySchema>
export type BusinessUpdateInput = z.infer<typeof businessUpdateSchema>
export type PortugueseEventInput = z.infer<typeof portugueseEventSchema>
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>
export type PortugueseCommunityProfileInput = z.infer<typeof portugueseCommunityProfileSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type CommunityMessageInput = z.infer<typeof communityMessageSchema>
export type BilingualTextInput = z.infer<typeof bilingualTextSchema>
export type CulturalHeritageInput = z.infer<typeof culturalHeritageSchema>
export type PortugueseUKAddressInput = z.infer<typeof portugueseUKAddressSchema>

// =============================================================================
// VALIDATION HELPER FUNCTIONS
// =============================================================================

/**
 * Validate Business Directory Submission
 */
export async function validateBusinessDirectorySubmission(data: unknown): Promise<{
  success: boolean
  data?: BusinessDirectoryInput
  errors?: z.ZodError
}> {
  try {
    const validated = businessDirectorySchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Validate Portuguese Event Creation
 */
export async function validatePortugueseEvent(data: unknown): Promise<{
  success: boolean
  data?: PortugueseEventInput
  errors?: z.ZodError
}> {
  try {
    const validated = portugueseEventSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Validate Community Profile
 */
export async function validateCommunityProfile(data: unknown): Promise<{
  success: boolean
  data?: PortugueseCommunityProfileInput
  errors?: z.ZodError
}> {
  try {
    const validated = portugueseCommunityProfileSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Extract Validation Errors for UI Display
 * Converts Zod errors to user-friendly format with bilingual support
 */
export function extractValidationErrors(
  error: z.ZodError,
  language: 'en' | 'pt' = 'en'
): Record<string, string> {
  const errors: Record<string, string> = {}
  
  error.issues.forEach(issue => {
    const path = issue.path.join('.')
    errors[path] = issue.message
  })
  
  return errors
}

/**
 * Check if Address is in Portuguese Community Area
 */
export function isPortugueseCommunityArea(address: string): boolean {
  const normalizedAddress = address.toLowerCase()
  return PORTUGUESE_COMMUNITY_AREAS.some(area => 
    normalizedAddress.includes(area.toLowerCase())
  )
}

/**
 * Validate Phone Number with Country Context
 */
export function validatePhoneWithCountry(phone: string, countryCode: string): boolean {
  switch (countryCode.toUpperCase()) {
    case 'PT':
      return portuguesePhoneSchema.safeParse(phone).success
    case 'BR':
      return brazilianPhoneSchema.safeParse(phone).success
    case 'GB':
    case 'UK':
    default:
      return ukPhoneSchema.safeParse(phone).success
  }
}