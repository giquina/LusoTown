/**
 * Portuguese Community Event Submission API Endpoint
 * 
 * Handles Portuguese community event submissions with comprehensive validation,
 * cultural authenticity verification, and bilingual support.
 * 
 * Features:
 * - Zod validation with PALOP cultural context
 * - Bilingual content validation (EN/PT)
 * - Event organizer verification
 * - Cultural significance scoring
 * - Anti-spam protection
 * - GDPR compliant data processing
 * - Portuguese community area detection
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { ratelimit } from '@/lib/ratelimit'
import { 
  portugueseEventSchema,
  validatePortugueseEvent,
  extractValidationErrors,
  isPortugueseCommunityArea,
  type PortugueseEventInput 
} from '@/lib/validation-schemas'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Rate limiting configuration for event submissions
 */
const EVENT_RATE_LIMIT_CONFIG = {
  requests: 5, // 5 event submissions per day
  window: '24h',
  message: 'Too many event submissions today. Please try again tomorrow.'
}

/**
 * POST /api/events/submit
 * Submit a new Portuguese community event
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.ip ?? headers().get('x-forwarded-for') ?? 'unknown'
    const rateLimitResult = await ratelimit.limit(`event-${ip}`, EVENT_RATE_LIMIT_CONFIG)
    
    if (!rateLimitResult.success) {
      return NextResponse.json({
        error: 'rate_limit_exceeded',
        message: EVENT_RATE_LIMIT_CONFIG.message,
        retryAfter: rateLimitResult.reset
      }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()
    const language = request.headers.get('accept-language')?.includes('pt') ? 'pt' : 'en'

    // Anti-spam honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      console.warn('Event submission honeypot triggered:', { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({
        error: 'spam_detected',
        message: language === 'pt' ? 'Atividade suspeita detetada' : 'Suspicious activity detected'
      }, { status: 400 })
    }

    // Validate event submission data
    const validationResult = await validatePortugueseEvent(body)
    
    if (!validationResult.success) {
      const errors = extractValidationErrors(validationResult.errors!, language)
      
      return NextResponse.json({
        error: 'validation_failed',
        message: language === 'pt' 
          ? 'Dados do evento inválidos' 
          : 'Invalid event data',
        validationErrors: errors,
        details: validationResult.errors?.issues
      }, { status: 400 })
    }

    const eventData = validationResult.data!

    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check authentication (required for event submissions)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'authentication_required',
        message: language === 'pt' 
          ? 'Autenticação obrigatória para submeter eventos' 
          : 'Authentication required to submit events'
      }, { status: 401 })
    }

    // Validate organizer permissions
    const organizerValidation = await validateEventOrganizer(user.id, eventData, supabase)
    if (!organizerValidation.isValid) {
      return NextResponse.json({
        error: 'organizer_validation_failed',
        message: organizerValidation.message,
        details: organizerValidation.issues
      }, { status: 403 })
    }

    // Cultural authenticity validation
    const culturalValidation = await validateEventCulturalAuthenticity(eventData)
    
    // Check if event location is in Portuguese community area
    let isInPortugueseArea = false
    if (eventData.location.type === 'physical' && eventData.location.address) {
      isInPortugueseArea = isPortugueseCommunityArea(eventData.location.address.street)
    }

    // Prepare event record for database
    const eventRecord = {
      // Basic Event Information
      title_en: eventData.title.en,
      title_pt: eventData.title.pt,
      description_en: eventData.description.en,
      description_pt: eventData.description.pt,
      cultural_significance: eventData.culturalSignificance,
      
      // Event Classification
      event_type: eventData.eventType,
      cultural_context: eventData.culturalContext,
      portuguese_regions: eventData.portugueseRegions.map(r => r.toUpperCase()),
      target_audience: eventData.targetAudience,
      
      // Date & Time
      date_start: eventData.dateStart.toISOString(),
      date_end: eventData.dateEnd.toISOString(),
      timezone: eventData.timeZone,
      is_recurring: eventData.recurring,
      recurrence_pattern: eventData.recurrencePattern || null,
      
      // Location Information
      location_type: eventData.location.type,
      venue_name: eventData.location.venue,
      venue_address: eventData.location.address || null,
      virtual_link: eventData.location.virtualLink || null,
      coordinates: eventData.location.coordinates || null,
      accessibility_info: eventData.location.accessibilityInfo || null,
      public_transport: eventData.location.publicTransport || null,
      is_portuguese_area: isInPortugueseArea,
      
      // Ticketing & Pricing
      pricing_type: eventData.pricing.type,
      price_gbp: eventData.pricing.priceGBP || null,
      currency: eventData.pricing.currency,
      early_bird_price: eventData.pricing.earlyBirdPrice || null,
      member_discount: eventData.pricing.memberDiscount || null,
      group_discounts: eventData.pricing.groupDiscounts,
      
      max_attendees: eventData.maxAttendees,
      
      // Age Restrictions
      min_age: eventData.ageRestrictions.minAge || null,
      max_age: eventData.ageRestrictions.maxAge || null,
      child_friendly: eventData.ageRestrictions.childFriendly,
      
      // Organizer Information
      organizer_name: eventData.organizer.name,
      organizer_email: eventData.organizer.email.toLowerCase(),
      organizer_phone: eventData.organizer.phone,
      organizer_organization: eventData.organizer.organization || null,
      organizer_website: eventData.organizer.website || null,
      cultural_credentials: eventData.organizer.culturalCredentials || [],
      
      // Cultural Requirements
      language_requirements: eventData.languageRequirements,
      cultural_dress_code: eventData.culturalDressCode || null,
      traditional_elements: eventData.traditionalElements,
      
      // Food & Drink
      food_provided: eventData.foodAndDrink.provided,
      traditional_food: eventData.foodAndDrink.traditional,
      halal_available: eventData.foodAndDrink.halal,
      vegetarian_available: eventData.foodAndDrink.vegetarian,
      alcohol_served: eventData.foodAndDrink.alcoholServed,
      
      // Media & Promotion
      event_images: eventData.images || [],
      promotional_video: eventData.promotionalVideo || null,
      social_media_hashtags: eventData.socialMediaHashtags || [],
      media_contact: eventData.mediaContact || null,
      
      // Community Features
      networking_opportunities: eventData.networkingOpportunities,
      business_sponsorship: eventData.businessSponsorship,
      community_partners: eventData.communityPartners || [],
      volunteer_opportunities: eventData.volunteerOpportunities,
      
      // Safety & Requirements
      covid_requirements: eventData.covidRequirements || null,
      safety_measures: eventData.safetyMeasures || [],
      special_requirements: eventData.specialRequirements || null,
      
      // Verification & Authenticity
      cultural_authenticity_score: culturalValidation.score,
      cultural_flags: culturalValidation.flags,
      authenticity_confirmed: eventData.culturalAuthenticity,
      organizer_verified: organizerValidation.verificationLevel >= 2,
      
      // Status & Moderation
      is_approved: culturalValidation.score >= 70 && organizerValidation.verificationLevel >= 1,
      is_featured: false,
      requires_review: culturalValidation.score < 50 || organizerValidation.verificationLevel < 1,
      moderation_notes: culturalValidation.warnings.join('; ') || null,
      
      // Metadata
      created_by: user.id,
      submitted_at: new Date().toISOString(),
      submission_ip: ip,
      submission_language: language,
      gdpr_consent: eventData.gdprConsent,
      terms_accepted: eventData.termsAccepted
    }

    // Insert event into database
    const { data: insertedEvent, error: insertError } = await supabase
      .from('portuguese_community_events')
      .insert([eventRecord])
      .select()
      .single()

    if (insertError) {
      console.error('Event submission error:', insertError)
      
      // Handle specific database errors
      if (insertError.code === '23505') { // Unique constraint violation
        return NextResponse.json({
          error: 'duplicate_event',
          message: language === 'pt' 
            ? 'Este evento já foi submetido' 
            : 'This event has already been submitted'
        }, { status: 409 })
      }
      
      return NextResponse.json({
        error: 'database_error',
        message: language === 'pt' 
          ? 'Erro ao guardar o evento. Tente novamente.' 
          : 'Error saving event. Please try again.'
      }, { status: 500 })
    }

    // Send notification emails
    await sendEventSubmissionNotifications(eventData, culturalValidation, language)
    
    // Log successful submission
    await logEventSubmission(insertedEvent.id, culturalValidation, user.id, ip)

    // Return success response
    return NextResponse.json({
      success: true,
      message: language === 'pt' 
        ? 'Evento submetido com sucesso!' 
        : 'Event submitted successfully!',
      eventId: insertedEvent.id,
      status: {
        isApproved: insertedEvent.is_approved,
        requiresReview: insertedEvent.requires_review,
        culturalScore: culturalValidation.score,
        organizerVerified: organizerValidation.verificationLevel >= 2,
        isPortugueseArea: isInPortugueseArea,
        estimatedApprovalTime: getEventApprovalTime(culturalValidation.score, organizerValidation.verificationLevel)
      },
      nextSteps: getEventSubmissionNextSteps(culturalValidation.score, organizerValidation.verificationLevel, language),
      warnings: culturalValidation.warnings,
      recommendations: culturalValidation.recommendations
    }, { status: 201 })

  } catch (error) {
    console.error('Event submission API error:', error)
    
    const language = request.headers.get('accept-language')?.includes('pt') ? 'pt' : 'en'
    
    return NextResponse.json({
      error: 'internal_server_error',
      message: language === 'pt' 
        ? 'Erro interno do servidor. Tente novamente mais tarde.' 
        : 'Internal server error. Please try again later.'
    }, { status: 500 })
  }
}

/**
 * Validate event organizer permissions and credibility
 */
async function validateEventOrganizer(userId: string, eventData: PortugueseEventInput, supabase: any): Promise<{
  isValid: boolean
  verificationLevel: number // 0-3 (0=unverified, 3=highly verified)
  message: string
  issues: string[]
}> {
  const issues: string[] = []
  let verificationLevel = 0

  try {
    // Get user profile and verification status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      return {
        isValid: false,
        verificationLevel: 0,
        message: 'User profile not found',
        issues: ['missing_profile']
      }
    }

    // Check email verification
    if (profile.email_verified) {
      verificationLevel += 1
    } else {
      issues.push('email_not_verified')
    }

    // Check cultural heritage verification
    if (profile.cultural_heritage_verified) {
      verificationLevel += 1
    } else {
      issues.push('cultural_heritage_not_verified')
    }

    // Check previous event organizing experience
    const { data: previousEvents, error: eventsError } = await supabase
      .from('portuguese_community_events')
      .select('id, is_approved, cultural_authenticity_score')
      .eq('created_by', userId)
      .eq('is_approved', true)

    if (!eventsError && previousEvents && previousEvents.length > 0) {
      const avgScore = previousEvents.reduce((sum, e) => sum + (e.cultural_authenticity_score || 0), 0) / previousEvents.length
      
      if (previousEvents.length >= 3 && avgScore >= 80) {
        verificationLevel += 1 // Experienced organizer
      }
    }

    // Minimum verification requirements
    const isValid = verificationLevel >= 1 // At least email verified

    return {
      isValid,
      verificationLevel,
      message: isValid ? 'Organizer verified' : 'Organizer verification insufficient',
      issues
    }

  } catch (error) {
    console.error('Organizer validation error:', error)
    return {
      isValid: false,
      verificationLevel: 0,
      message: 'Error validating organizer',
      issues: ['validation_error']
    }
  }
}

/**
 * Validate cultural authenticity of event submission
 */
async function validateEventCulturalAuthenticity(eventData: PortugueseEventInput): Promise<{
  score: number
  flags: string[]
  warnings: string[]
  recommendations: string[]
}> {
  const flags: string[] = []
  const warnings: string[] = []
  const recommendations: string[] = []
  let score = 0

  // Check bilingual content quality (30 points max)
  const titleQuality = Math.min(eventData.title.en.length, eventData.title.pt.length)
  const descriptionQuality = Math.min(eventData.description.en.length, eventData.description.pt.length)
  
  if (titleQuality >= 10 && descriptionQuality >= 100) {
    score += 25
    flags.push('complete_bilingual_content')
  } else if (descriptionQuality >= 50) {
    score += 15
    flags.push('partial_bilingual_content')
    recommendations.push('Expand Portuguese description for better community engagement')
  } else {
    warnings.push('Insufficient Portuguese content')
    recommendations.push('Add detailed Portuguese description and title')
  }

  // Check Portuguese characters in PT content (5 points)
  const hasPortugueseChars = /[ãàáâçéêíóôõú]/i.test(`${eventData.title.pt  } ${  eventData.description.pt}`)
  if (hasPortugueseChars) {
    score += 5
    flags.push('authentic_portuguese_characters')
  }

  // Check cultural significance (25 points max)
  const culturalSignificanceLength = eventData.culturalSignificance.length
  if (culturalSignificanceLength >= 100) {
    score += 20
    flags.push('detailed_cultural_significance')
  } else if (culturalSignificanceLength >= 50) {
    score += 10
    flags.push('basic_cultural_significance')
  } else {
    warnings.push('Weak cultural significance explanation')
    recommendations.push('Explain the cultural importance of this event to the Portuguese community')
  }

  // Check Portuguese regions coverage (15 points max)
  if (eventData.portugueseRegions.length >= 2) {
    score += 15
    flags.push('multi_region_appeal')
  } else if (eventData.portugueseRegions.length === 1) {
    score += 8
    flags.push('single_region_focus')
  } else {
    warnings.push('No Portuguese regions specified')
    recommendations.push('Specify which Portuguese-speaking regions this event appeals to')
  }

  // Check traditional elements (10 points max)
  if (eventData.traditionalElements.length >= 3) {
    score += 10
    flags.push('rich_traditional_elements')
  } else if (eventData.traditionalElements.length > 0) {
    score += 5
    flags.push('some_traditional_elements')
  } else {
    warnings.push('No traditional elements specified')
    recommendations.push('Include traditional Portuguese cultural elements')
  }

  // Check cultural event type (10 points max)
  const culturalEventTypes = ['cultural_festival', 'festa', 'celebration', 'music_concert', 'dance_performance', 
                              'food_festival', 'religious_ceremony', 'independence_day', 'national_celebration']
  if (culturalEventTypes.includes(eventData.eventType)) {
    score += 10
    flags.push('authentic_cultural_event_type')
  }

  // Check language requirements (5 points max)
  if (eventData.languageRequirements.includes('portuguese')) {
    score += 5
    flags.push('portuguese_language_event')
  }

  // Bonus points for community features
  if (eventData.networkingOpportunities) score += 3
  if (eventData.businessSponsorship) score += 2
  if (eventData.volunteerOpportunities) score += 2
  if (eventData.foodAndDrink.traditional) score += 3

  // Cap score at 100
  score = Math.min(score, 100)

  return { score, flags, warnings, recommendations }
}

/**
 * Send event submission notifications
 */
async function sendEventSubmissionNotifications(
  eventData: PortugueseEventInput,
  culturalValidation: any,
  language: string
) {
  try {
    console.log('Event submission notification:', {
      event: eventData.title[language],
      score: culturalValidation.score,
      organizer: eventData.organizer.email
    })
    
    // Implementation would send emails to:
    // 1. Event organizer confirmation
    // 2. Admin review notification (if requires review)
    // 3. Community moderators for cultural events
    
  } catch (error) {
    console.error('Event notification error:', error)
  }
}

/**
 * Log event submission for analytics
 */
async function logEventSubmission(
  eventId: string,
  culturalValidation: any,
  userId: string,
  ip: string
) {
  try {
    console.log('Event submission logged:', {
      eventId,
      culturalScore: culturalValidation.score,
      userId,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Event analytics logging error:', error)
  }
}

/**
 * Get estimated approval time for events
 */
function getEventApprovalTime(culturalScore: number, organizerLevel: number): string {
  if (culturalScore >= 80 && organizerLevel >= 2) return 'Immediate (auto-approved)'
  if (culturalScore >= 70 && organizerLevel >= 1) return '2-4 hours'
  if (culturalScore >= 50) return '1-2 business days'
  return '3-5 business days'
}

/**
 * Get next steps for event submission
 */
function getEventSubmissionNextSteps(culturalScore: number, organizerLevel: number, language: string): string[] {
  const steps = []
  
  if (language === 'pt') {
    if (culturalScore >= 70 && organizerLevel >= 1) {
      steps.push('O seu evento foi aprovado automaticamente')
      steps.push('Aparecerá no calendário de eventos imediatamente')
    } else {
      steps.push('O seu evento será revisto pela nossa equipa cultural')
      steps.push('Receberá uma notificação por email sobre o estado')
      
      if (culturalScore < 50) {
        steps.push('Poderemos solicitar mais informações culturais')
      }
    }
    
    steps.push('Pode editar o evento a qualquer momento no seu painel')
    steps.push('Receberá notificações sobre inscrições de participantes')
  } else {
    if (culturalScore >= 70 && organizerLevel >= 1) {
      steps.push('Your event has been automatically approved')
      steps.push('It will appear in the events calendar immediately')
    } else {
      steps.push('Your event will be reviewed by our cultural team')
      steps.push('You will receive an email notification about the status')
      
      if (culturalScore < 50) {
        steps.push('We may request additional cultural information')
      }
    }
    
    steps.push('You can edit the event anytime from your dashboard')
    steps.push('You will receive notifications about participant registrations')
  }
  
  return steps
}