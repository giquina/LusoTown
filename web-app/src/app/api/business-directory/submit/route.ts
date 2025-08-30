/**
 * Business Directory Submission API Endpoint
 * 
 * Handles Portuguese community business directory submissions with comprehensive
 * validation, bilingual support, and cultural authenticity verification.
 * 
 * Features:
 * - Zod validation with Portuguese cultural context
 * - Bilingual error messages (EN/PT)
 * - PALOP nation business verification
 * - Portuguese community area detection
 * - Anti-spam protection with honeypot
 * - GDPR compliant data processing
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { ratelimit } from '@/lib/ratelimit'
import { 
  businessDirectorySchema, 
  validateBusinessDirectorySubmission,
  extractValidationErrors,
  isPortugueseCommunityArea,
  type BusinessDirectoryInput 
} from '@/lib/validation-schemas'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Rate limiting configuration for business submissions
 */
const RATE_LIMIT_CONFIG = {
  requests: 3, // 3 submissions per hour
  window: '1h',
  message: 'Too many business submissions. Please try again in an hour.'
}

/**
 * POST /api/business-directory/submit
 * Submit a new business to the Portuguese community directory
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.ip ?? headers().get('x-forwarded-for') ?? 'unknown'
    const rateLimitResult = await ratelimit.limit(ip, RATE_LIMIT_CONFIG)
    
    if (!rateLimitResult.success) {
      return NextResponse.json({
        error: 'rate_limit_exceeded',
        message: RATE_LIMIT_CONFIG.message,
        retryAfter: rateLimitResult.reset
      }, { status: 429 })
    }

    // Parse request body
    const body = await request.json()
    const language = request.headers.get('accept-language')?.includes('pt') ? 'pt' : 'en'

    // Anti-spam honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      console.warn('Honeypot triggered:', { ip, timestamp: new Date().toISOString() })
      return NextResponse.json({
        error: 'spam_detected',
        message: language === 'pt' ? 'Atividade suspeita detetada' : 'Suspicious activity detected'
      }, { status: 400 })
    }

    // Validate business submission data
    const validationResult = await validateBusinessDirectorySubmission(body)
    
    if (!validationResult.success) {
      const errors = extractValidationErrors(validationResult.errors!, language)
      
      return NextResponse.json({
        error: 'validation_failed',
        message: language === 'pt' 
          ? 'Dados de submissão inválidos' 
          : 'Invalid submission data',
        validationErrors: errors,
        details: validationResult.errors?.issues
      }, { status: 400 })
    }

    const businessData = validationResult.data!

    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check authentication (optional for submissions, required for auto-approval)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const isAuthenticated = !authError && user

    // Enhanced validation for Portuguese community businesses
    const culturalValidation = await validateCulturalAuthenticity(businessData)
    
    // Detect Portuguese community area
    const isInPortugueseArea = isPortugueseCommunityArea(businessData.address)
    
    // Prepare business record for database
    const businessRecord = {
      // Basic Information
      business_name: businessData.businessName,
      business_name_portuguese: businessData.businessNamePortuguese || null,
      owner_name: businessData.ownerName,
      owner_country: businessData.ownerCountry.toUpperCase(),
      
      // Classification
      category: businessData.category,
      subcategory: businessData.subcategory,
      business_type: businessData.businessType,
      
      // Descriptions (bilingual)
      description: businessData.description,
      description_portuguese: businessData.descriptionPortuguese,
      specialties: businessData.specialties,
      unique_selling_point: businessData.uniqueSellingPoint,
      cultural_connection: businessData.culturalConnection,
      
      // Location & Contact
      address: businessData.address,
      postcode: businessData.postcode,
      city: businessData.city,
      region: businessData.region,
      coordinates: businessData.coordinates || null,
      is_portuguese_area: isInPortugueseArea,
      
      phone: businessData.phone,
      email: businessData.email.toLowerCase(),
      website: businessData.website || null,
      
      // Business Hours (JSON)
      opening_hours: businessData.openingHours,
      
      // Services & Products (bilingual arrays)
      services: businessData.services,
      services_portuguese: businessData.servicesPortuguese,
      price_range: businessData.priceRange,
      payment_methods: businessData.paymentMethods,
      languages: businessData.languages,
      
      // Cultural Elements
      cultural_offerings: businessData.culturalOfferings,
      traditional_products: businessData.traditionalProducts || [],
      cultural_events: businessData.culturalEvents,
      community_support: businessData.communitySupport,
      
      // Business Metrics
      established_year: businessData.establishedYear,
      employees: businessData.employees,
      annual_revenue: businessData.annualRevenue || null,
      awards: businessData.awards || [],
      certifications: businessData.certifications,
      
      // Target Market
      target_customers: businessData.targetCustomers,
      community_involvement: businessData.communityInvolvement,
      social_impact: businessData.socialImpact,
      
      // Online Presence
      social_media: businessData.socialMedia || {},
      
      // Business Development
      expansion_plans: businessData.expansionPlans || null,
      partnership_interests: businessData.partnershipInterests,
      investment_seeking: businessData.investmentSeeking,
      mentoring_offered: businessData.mentoringOffered,
      
      // Verification & Status
      cultural_authenticity_score: culturalValidation.score,
      cultural_flags: culturalValidation.flags,
      verification_documents: businessData.verificationDocuments || [],
      
      // Auto-approval logic
      is_verified: false, // Manual verification required
      is_active: culturalValidation.score >= 70, // Auto-activate high-quality submissions
      is_featured: false,
      requires_review: culturalValidation.score < 50 || culturalValidation.hasWarnings,
      
      // Metadata
      submitted_by: user?.id || null,
      submitted_at: new Date().toISOString(),
      submission_ip: ip,
      submission_language: language,
      gdpr_consent: businessData.gdprConsent,
      terms_accepted: businessData.termsAccepted,
      cultural_authenticity_confirmed: businessData.culturalAuthenticity
    }

    // Insert business into database
    const { data: insertedBusiness, error: insertError } = await supabase
      .from('portuguese_business_directory')
      .insert([businessRecord])
      .select()
      .single()

    if (insertError) {
      console.error('Business directory submission error:', insertError)
      
      // Handle specific database errors
      if (insertError.code === '23505') { // Unique constraint violation
        return NextResponse.json({
          error: 'duplicate_business',
          message: language === 'pt' 
            ? 'Este negócio já está registado no diretório' 
            : 'This business is already registered in the directory'
        }, { status: 409 })
      }
      
      return NextResponse.json({
        error: 'database_error',
        message: language === 'pt' 
          ? 'Erro ao guardar o negócio. Tente novamente.' 
          : 'Error saving business. Please try again.'
      }, { status: 500 })
    }

    // Send notification emails (if configured)
    await sendBusinessSubmissionNotifications(businessData, culturalValidation, language)
    
    // Log successful submission for analytics
    await logBusinessSubmission(insertedBusiness.id, culturalValidation, ip)

    // Return success response with submission details
    return NextResponse.json({
      success: true,
      message: language === 'pt' 
        ? 'Negócio submetido com sucesso! Será revisado pela nossa equipa.' 
        : 'Business submitted successfully! It will be reviewed by our team.',
      submissionId: insertedBusiness.id,
      status: {
        isActive: insertedBusiness.is_active,
        requiresReview: insertedBusiness.requires_review,
        culturalScore: culturalValidation.score,
        isPortugueseArea: isInPortugueseArea,
        estimatedApprovalTime: getEstimatedApprovalTime(culturalValidation.score)
      },
      nextSteps: getSubmissionNextSteps(culturalValidation.score, language)
    }, { status: 201 })

  } catch (error) {
    console.error('Business submission API error:', error)
    
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
 * Validate cultural authenticity of business submission
 */
async function validateCulturalAuthenticity(businessData: BusinessDirectoryInput): Promise<{
  score: number
  flags: string[]
  hasWarnings: boolean
  recommendations: string[]
}> {
  const flags: string[] = []
  const recommendations: string[] = []
  let score = 0
  let hasWarnings = false

  // Check Portuguese/PALOP country origin (40 points max)
  const isPALOPCountry = ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL', 'MO'].includes(
    businessData.ownerCountry.toUpperCase()
  )
  
  if (isPALOPCountry) {
    score += 30
    flags.push('verified_palop_origin')
  } else {
    hasWarnings = true
    flags.push('warning_non_palop_origin')
    recommendations.push('Consider highlighting connections to Portuguese-speaking community')
  }

  // Check cultural connection quality (25 points max)
  const culturalConnectionLength = businessData.culturalConnection.length
  if (culturalConnectionLength >= 100) {
    score += 20
    flags.push('detailed_cultural_connection')
  } else if (culturalConnectionLength >= 50) {
    score += 10
    flags.push('basic_cultural_connection')
  } else {
    hasWarnings = true
    flags.push('warning_weak_cultural_connection')
    recommendations.push('Expand cultural connection description')
  }

  // Check Portuguese language content (20 points max)
  const hasPortugueseName = !!businessData.businessNamePortuguese
  const hasPortugueseDescription = businessData.descriptionPortuguese.length >= 50
  const hasPortugueseServices = businessData.servicesPortuguese.length > 0
  
  if (hasPortugueseName && hasPortugueseDescription && hasPortugueseServices) {
    score += 20
    flags.push('complete_portuguese_content')
  } else if (hasPortugueseDescription) {
    score += 10
    flags.push('partial_portuguese_content')
    recommendations.push('Add Portuguese business name and service descriptions')
  } else {
    hasWarnings = true
    flags.push('warning_missing_portuguese_content')
    recommendations.push('Add Portuguese translations for better community engagement')
  }

  // Check cultural offerings (15 points max)
  if (businessData.culturalOfferings.length >= 3) {
    score += 15
    flags.push('rich_cultural_offerings')
  } else if (businessData.culturalOfferings.length > 0) {
    score += 8
    flags.push('basic_cultural_offerings')
  } else {
    hasWarnings = true
    flags.push('warning_no_cultural_offerings')
    recommendations.push('Add cultural offerings to better serve the Portuguese-speaking community')
  }

  // Bonus points for community involvement
  if (businessData.communityInvolvement.length >= 2) {
    score += 10
    flags.push('strong_community_involvement')
  }

  if (businessData.culturalEvents) {
    score += 5
    flags.push('hosts_cultural_events')
  }

  // Cap score at 100
  score = Math.min(score, 100)

  return { score, flags, hasWarnings, recommendations }
}

/**
 * Send notification emails for business submission
 */
async function sendBusinessSubmissionNotifications(
  businessData: BusinessDirectoryInput,
  culturalValidation: any,
  language: string
) {
  try {
    // Implementation would depend on email service (SendGrid, etc.)
    console.log('Business submission notification:', {
      business: businessData.businessName,
      score: culturalValidation.score,
      language
    })
    
    // Could send emails to:
    // 1. Business owner confirmation
    // 2. Admin review notification (if requires review)
    // 3. Community moderators (for cultural authenticity review)
    
  } catch (error) {
    console.error('Email notification error:', error)
    // Non-blocking error - don't fail the submission
  }
}

/**
 * Log business submission for analytics
 */
async function logBusinessSubmission(
  businessId: string,
  culturalValidation: any,
  ip: string
) {
  try {
    // Implementation would log to analytics service
    console.log('Business submission logged:', {
      businessId,
      culturalScore: culturalValidation.score,
      timestamp: new Date().toISOString(),
      ip: `${ip.substring(0, 8)  }...` // Partial IP for privacy
    })
  } catch (error) {
    console.error('Analytics logging error:', error)
    // Non-blocking error
  }
}

/**
 * Get estimated approval time based on cultural score
 */
function getEstimatedApprovalTime(culturalScore: number): string {
  if (culturalScore >= 80) return '1-2 business days'
  if (culturalScore >= 60) return '2-5 business days'
  if (culturalScore >= 40) return '5-10 business days'
  return '10-15 business days'
}

/**
 * Get next steps for business submission
 */
function getSubmissionNextSteps(culturalScore: number, language: string): string[] {
  const steps = []
  
  if (language === 'pt') {
    steps.push('Verificaremos a autenticidade cultural do seu negócio')
    steps.push('Receberá uma confirmação por email em breve')
    
    if (culturalScore < 60) {
      steps.push('Poderemos contactá-lo para informações adicionais')
      steps.push('Considere adicionar mais detalhes culturais portugueses')
    }
    
    steps.push('O seu negócio aparecerá no diretório após aprovação')
  } else {
    steps.push('We will verify the cultural authenticity of your business')
    steps.push('You will receive email confirmation shortly')
    
    if (culturalScore < 60) {
      steps.push('We may contact you for additional information')
      steps.push('Consider adding more Portuguese cultural details')
    }
    
    steps.push('Your business will appear in the directory after approval')
  }
  
  return steps
}