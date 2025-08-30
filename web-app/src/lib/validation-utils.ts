/**
 * Validation Utilities for Portuguese Community Platform
 * 
 * Client-side validation helpers and form utilities with bilingual support
 * and Portuguese cultural context validation.
 */

import { z } from 'zod'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Extract validation errors with bilingual message support
 */
export function extractValidationErrorsWithI18n(
  error: z.ZodError,
  t: (key: string, params?: Record<string, any>) => string
): Record<string, string> {
  const errors: Record<string, string> = {}
  
  error.issues.forEach(issue => {
    const path = issue.path.join('.')
    
    // Map Zod error codes to translation keys
    const errorKey = getValidationErrorKey(issue.code, path, issue.message)
    
    try {
      errors[path] = t(errorKey, issue.params)
    } catch {
      // Fallback to original message if translation not found
      errors[path] = issue.message
    }
  })
  
  return errors
}

/**
 * Map Zod error codes to i18n translation keys
 */
function getValidationErrorKey(code: z.ZodIssueCode, path: string, message: string): string {
  // Business directory specific errors
  if (path.startsWith('business')) {
    if (code === 'too_small') return 'validation.business.description_too_short'
    if (path.includes('email')) return 'validation.business.email_domain'
    if (path.includes('phone')) return 'validation.business.phone_invalid'
    if (path.includes('name')) return 'validation.business.name_too_short'
    if (path.includes('category')) return 'validation.business.category_required'
    if (path.includes('portuguese') && code === 'invalid_string') {
      return 'validation.business.portuguese_name_required'
    }
    return 'validation.business.terms_required'
  }
  
  // Event specific errors
  if (path.startsWith('event') || path.includes('title') || path.includes('description')) {
    if (code === 'too_small' && path.includes('description')) {
      return 'validation.event.description_min_length'
    }
    if (path.includes('date') && code === 'invalid_date') {
      return 'validation.event.date_future'
    }
    if (path.includes('organizer')) return 'validation.event.organizer_contact_required'
    if (path.includes('cultural')) return 'validation.event.cultural_significance_required'
    return 'validation.event.title_bilingual_required'
  }
  
  // Profile specific errors
  if (path.startsWith('profile') || path.includes('firstName') || path.includes('lastName')) {
    if (code === 'too_small') return 'validation.profile.name_too_short'
    if (path.includes('age')) return 'validation.profile.age_range'
    if (path.includes('cultural')) return 'validation.profile.cultural_heritage_required'
    if (path.includes('interests')) return 'validation.profile.interests_required'
    if (path.includes('language')) return 'validation.profile.language_required'
    if (path.includes('terms')) return 'validation.profile.terms_acceptance'
    return 'validation.profile.gdpr_consent'
  }
  
  // Contact form specific errors
  if (path.startsWith('contact') || path.includes('subject') || path.includes('message')) {
    if (path.includes('name')) return 'validation.contact.name_required'
    if (path.includes('subject') && code === 'too_small') {
      return 'validation.contact.subject_too_short'
    }
    if (path.includes('message') && code === 'too_small') {
      return 'validation.contact.message_too_short'
    }
    if (path.includes('category')) return 'validation.contact.category_required'
    return 'validation.contact.gdpr_consent_required'
  }
  
  // Common field errors
  switch (code) {
    case 'invalid_string':
      if (path.includes('email')) return 'validation.email'
      if (path.includes('phone')) return 'validation.phone_number'
      if (path.includes('postcode')) return 'validation.postcode_uk'
      if (path.includes('url')) return 'validation.url.invalid'
      break
      
    case 'too_small':
      if (path.includes('password')) return 'validation.password_weak'
      return 'validation.string.min'
      
    case 'too_big':
      return 'validation.string.max'
      
    case 'invalid_date':
      return 'validation.date.invalid'
      
    case 'custom':
      if (message.includes('GDPR')) return 'validation.gdpr_required'
      if (message.includes('terms')) return 'validation.terms_required'
      if (message.includes('Portuguese')) return 'validation.portuguese_characters'
      break
  }
  
  return 'validation.required'
}

/**
 * Real-time validation for form fields
 */
export function validateFieldRealTime<T>(
  schema: z.ZodSchema<T>,
  value: any,
  t: (key: string, params?: Record<string, any>) => string
): {
  isValid: boolean
  error?: string
  warning?: string
} {
  try {
    schema.parse(value)
    return { isValid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0]
      const errorKey = getValidationErrorKey(firstIssue.code, firstIssue.path.join('.'), firstIssue.message)
      
      return {
        isValid: false,
        error: t(errorKey, firstIssue.params)
      }
    }
    
    return {
      isValid: false,
      error: t('validation.required')
    }
  }
}

/**
 * Phone number formatting with Portuguese community context
 */
export function formatPhoneNumber(phone: string, countryCode?: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  switch (countryCode?.toUpperCase()) {
    case 'PT': // Portuguese format
      if (digits.length === 9) {
        return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '+351 $1 $2 $3 $4')
      }
      break
      
    case 'BR': // Brazilian format
      if (digits.length === 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, '+55 ($1) $2-$3')
      } else if (digits.length === 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{4})/, '+55 ($1) $2-$3')
      }
      break
      
    case 'GB':
    case 'UK':
    default: // UK format
      if (digits.length === 11 && digits.startsWith('07')) {
        return digits.replace(/(\d{2})(\d{4})(\d{5})/, '$1$2 $3')
      } else if (digits.length === 10 && digits.startsWith('20')) {
        return digits.replace(/(\d{2})(\d{4})(\d{4})/, '+44 $1 $2 $3')
      }
      break
  }
  
  return phone // Return original if can't format
}

/**
 * Portuguese postcode validation and formatting
 */
export function formatPostcode(postcode: string, country: string): string {
  const cleaned = postcode.replace(/\s/g, '').toUpperCase()
  
  switch (country.toUpperCase()) {
    case 'PT':
      // Portuguese format: 1234-123
      if (/^\d{4}\d{3}$/.test(cleaned)) {
        return cleaned.replace(/(\d{4})(\d{3})/, '$1-$2')
      }
      break
      
    case 'BR':
      // Brazilian format: 12345-678
      if (/^\d{5}\d{3}$/.test(cleaned)) {
        return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
      }
      break
      
    case 'GB':
    case 'UK':
    default:
      // UK format: SW1A 1AA
      if (/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(cleaned)) {
        return cleaned.replace(/([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})/, '$1 $2')
      }
      break
  }
  
  return postcode
}

/**
 * Validate Portuguese characters in text
 */
export function hasPortugueseCharacters(text: string): boolean {
  const portugueseChars = /[ãàáâçéêíóôõú]/i
  return portugueseChars.test(text)
}

/**
 * Validate bilingual content completeness
 */
export function validateBilingualContent(
  content: { en: string; pt: string },
  t: (key: string) => string
): {
  isValid: boolean
  errors: { en?: string; pt?: string }
  warnings: string[]
} {
  const errors: { en?: string; pt?: string } = {}
  const warnings: string[] = []
  
  // Check required content
  if (!content.en.trim()) {
    errors.en = t('validation.bilingual.english_required')
  }
  
  if (!content.pt.trim()) {
    errors.pt = t('validation.bilingual.portuguese_required')
  }
  
  // Check Portuguese authenticity
  if (content.pt && !hasPortugueseCharacters(content.pt)) {
    warnings.push(t('validation.bilingual.portuguese_chars'))
  }
  
  // Check content similarity (potential duplicate)
  if (content.en && content.pt && content.en === content.pt) {
    warnings.push('Consider providing distinct Portuguese translation rather than duplicate')
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  }
}

/**
 * Portuguese community area detection with suggestions
 */
export function detectPortugueseCommunityArea(address: string): {
  isPortugueseArea: boolean
  confidence: number
  suggestedArea?: string
  nearbyAreas: string[]
} {
  const PORTUGUESE_AREAS = [
    { name: 'Stockwell', keywords: ['stockwell', 'sw9', 'south lambeth'], confidence: 0.9 },
    { name: 'Vauxhall', keywords: ['vauxhall', 'se11', 'kennington'], confidence: 0.8 },
    { name: 'Elephant and Castle', keywords: ['elephant', 'castle', 'se1', 'se17'], confidence: 0.7 },
    { name: 'Golborne Road', keywords: ['golborne', 'w10', 'notting hill', 'portobello'], confidence: 0.8 },
    { name: 'Tooting', keywords: ['tooting', 'sw17', 'mitcham'], confidence: 0.6 },
    { name: 'Croydon', keywords: ['croydon', 'cr0', 'thornton heath'], confidence: 0.5 }
  ]
  
  const normalizedAddress = address.toLowerCase()
  let bestMatch: any = null
  let maxConfidence = 0
  
  for (const area of PORTUGUESE_AREAS) {
    for (const keyword of area.keywords) {
      if (normalizedAddress.includes(keyword)) {
        if (area.confidence > maxConfidence) {
          maxConfidence = area.confidence
          bestMatch = area
        }
        break
      }
    }
  }
  
  const nearbyAreas = PORTUGUESE_AREAS
    .filter(area => area !== bestMatch)
    .map(area => area.name)
    .slice(0, 3)
  
  return {
    isPortugueseArea: maxConfidence >= 0.5,
    confidence: maxConfidence,
    suggestedArea: bestMatch?.name,
    nearbyAreas
  }
}

/**
 * Cultural heritage validation scoring
 */
export function calculateCulturalHeritageScore(data: {
  primaryCountry: string
  culturalBackground: string[]
  languagePreference: string
  region?: string
}): {
  score: number
  level: 'strong' | 'moderate' | 'developing'
  recommendations: string[]
} {
  let score = 0
  const recommendations: string[] = []
  
  // Primary country scoring (40 points max)
  const primaryCountries = ['PT', 'BR', 'AO', 'MZ', 'CV']
  if (primaryCountries.includes(data.primaryCountry.toUpperCase())) {
    score += 30
    if (data.primaryCountry.toUpperCase() === 'PT') {
      score += 10 // Bonus for Portugal
    }
  } else {
    recommendations.push('Consider connecting with Portuguese-speaking community groups')
  }
  
  // Cultural background depth (30 points max)
  if (data.culturalBackground.length >= 3) {
    score += 25
  } else if (data.culturalBackground.length >= 1) {
    score += 15
  } else {
    recommendations.push('Add more details about your cultural background')
  }
  
  // Language preference (20 points max)
  switch (data.languagePreference) {
    case 'pt':
      score += 20
      break
    case 'both':
      score += 15
      break
    case 'en':
      score += 5
      recommendations.push('Consider improving Portuguese language skills for better community integration')
      break
  }
  
  // Region specification bonus (10 points max)
  if (data.region) {
    score += 10
  } else {
    recommendations.push('Specify your regional connection for more targeted community matching')
  }
  
  // Determine heritage level
  let level: 'strong' | 'moderate' | 'developing'
  if (score >= 70) level = 'strong'
  else if (score >= 40) level = 'moderate'
  else level = 'developing'
  
  return { score: Math.min(score, 100), level, recommendations }
}

/**
 * Form submission with validation and error handling
 */
export async function submitFormWithValidation<T>(
  endpoint: string,
  data: T,
  schema: z.ZodSchema<T>,
  t: (key: string, params?: Record<string, any>) => string
): Promise<{
  success: boolean
  data?: any
  errors?: Record<string, string>
  message?: string
}> {
  try {
    // Client-side validation
    const validationResult = schema.safeParse(data)
    
    if (!validationResult.success) {
      return {
        success: false,
        errors: extractValidationErrorsWithI18n(validationResult.error, t),
        message: t('validation.form_validation_failed')
      }
    }
    
    // Submit to API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': t('common.locale', {}, 'en')
      },
      body: JSON.stringify(validationResult.data)
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        errors: result.validationErrors || {},
        message: result.message || t('validation.submission_failed')
      }
    }
    
    return {
      success: true,
      data: result,
      message: result.message || t('validation.submission_success')
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: t('validation.network_error')
    }
  }
}