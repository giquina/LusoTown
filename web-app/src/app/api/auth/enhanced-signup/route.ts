/**
 * Enhanced Signup API Endpoint
 * Handles comprehensive Lusophone community signup with cultural integration
 */

import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase'
import logger from '@/utils/logger'
// import { EnhancedSignupForm } from '@/types/enhanced-signup'
// import { sendCulturalWelcomeEmail } from '@/lib/email/cultural-welcome'
// import { processPartnerEventInterests } from '@/lib/partnership/event-processor'
import { validateCulturalBackground } from '@/lib/validation/cultural-validator'
// import { registerForInitialEvents } from '@/lib/events/auto-registration'
import {
  API_ERROR_MESSAGES,
  API_LOG_MESSAGES,
  INITIAL_RECOMMENDATIONS,
  getApiErrorMessage,
  getApiLogMessage
} from '@/config/api-messages'

// Enhanced signup types matching the full form structure
interface EnhancedSignupRequest {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth: Date
  primaryInterests?: string[]
  businessTrack?: string[]
  socialTrack?: string[]
  culturalTrack?: string[]
  portugueseOrigin?: {
    country: string
    region?: string
    culturalBackground?: string[]
  }
  ukLocation?: string
  languagePreference?: string
  culturalVerificationBadges?: string[]
  profileVisibility?: string
  eventNotifications?: boolean
  partnerEventInterest?: boolean
  agreeTerms: boolean
  ageConfirmation: boolean
  referralCode?: string
}

interface SignupResponse {
  success: boolean
  profile?: any
  error?: string
  culturalMatch?: any
  partnerEvents?: any[]
  recommendations?: any[]
}

// Placeholder function implementations for build compatibility
async function processPartnerEventInterests(signupData: EnhancedSignupRequest) {
  return {
    interestedEvents: signupData.partnerEventInterest ? ['kizomba', 'fado'] : []
  }
}

async function sendCulturalWelcomeEmail(data: any) {
  // Placeholder for cultural welcome email
  return Promise.resolve()
}

async function registerForInitialEvents(data: any) {
  // Placeholder for initial event registration
  return Promise.resolve([])
}

export async function POST(request: NextRequest): Promise<NextResponse<SignupResponse>> {
  try {
    const signupData: EnhancedSignupRequest = await request.json()

    // Basic validation
    if (!signupData.email || !signupData.password) {
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('MISSING_CREDENTIALS') },
        { status: 400 }
      )
    }

    if (!signupData.firstName || !signupData.lastName) {
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('MISSING_USER_INFO') },
        { status: 400 }
      )
    }

    if (!signupData.agreeTerms) {
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('TERMS_NOT_AGREED') },
        { status: 400 }
      )
    }

    if (!signupData.ageConfirmation) {
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('AGE_NOT_CONFIRMED') },
        { status: 400 }
      )
    }

    if (signupData.password !== signupData.confirmPassword) {
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('PASSWORDS_MISMATCH') },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        data: {
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          full_name: `${signupData.firstName} ${signupData.lastName}`,
          // Add enhanced signup metadata
          signup_type: 'enhanced',
          primary_interests: signupData.primaryInterests,
          portuguese_origin: signupData.portugueseOrigin,
          uk_location: signupData.ukLocation,
          language_preference: signupData.languagePreference
        }
      }
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, error: authError?.message || getApiErrorMessage('ACCOUNT_CREATION_FAILED') },
        { status: 400 }
      )
    }

    // Validate cultural background
    const culturalValidation = await validateCulturalBackground(signupData)

    // Process partner event interests
    const partnerEventData = await processPartnerEventInterests(signupData)

    // Create enhanced user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: signupData.email,
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          full_name: `${signupData.firstName} ${signupData.lastName}`,
          phone: signupData.phone,
          date_of_birth: signupData.dateOfBirth,
          
          // Cultural information
          portuguese_origin: signupData.portugueseOrigin,
          uk_location: signupData.ukLocation,
          language_preference: signupData.languagePreference,
          
          // Interests and targeting
          primary_interests: signupData.primaryInterests,
          business_track: signupData.businessTrack,
          social_track: signupData.socialTrack,
          cultural_track: signupData.culturalTrack,
          
          // Verification and preferences
          cultural_verification_badges: signupData.culturalVerificationBadges,
          profile_visibility: signupData.profileVisibility,
          event_notifications: signupData.eventNotifications,
          partner_event_interest: signupData.partnerEventInterest,
          
          // Cultural data
          cultural_preferences: {
            origins: signupData.portugueseOrigin ? [signupData.portugueseOrigin.country] : [],
            regions: signupData.portugueseOrigin?.region ? [signupData.portugueseOrigin.region] : [],
            cultural_background: signupData.portugueseOrigin?.culturalBackground || [],
            verification_badges: signupData.culturalVerificationBadges || [],
            partner_events: partnerEventData.interestedEvents || []
          },
          
          // Signup metadata
          signup_method: 'enhanced_form',
          signup_completed_at: new Date().toISOString(),
          onboarding_step: 'completed',
          
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single()

    if (profileError) {
      logger.error(getApiLogMessage('PROFILE_CREATION_ERROR'), profileError)
      return NextResponse.json(
        { success: false, error: getApiErrorMessage('PROFILE_CREATION_FAILED') },
        { status: 500 }
      )
    }

    // Process referral code if provided
    let referralResult = null
    if (signupData.referralCode) {
      try {
        const { data: referralData } = await supabase.rpc('apply_referral_code', {
          code: signupData.referralCode.toUpperCase(),
          new_user_id: authData.user.id
        })
        referralResult = referralData
      } catch (referralError) {
        logger.error(getApiLogMessage('REFERRAL_PROCESSING_ERROR'), referralError)
        // Don't fail signup for referral errors
      }
    }

    // Send culturally appropriate welcome email
    try {
      await sendCulturalWelcomeEmail({
        user: authData.user,
        profile: profile,
        culturalData: {
          origin: signupData.portugueseOrigin,
          interests: signupData.primaryInterests,
          languagePreference: signupData.languagePreference,
          partnerEvents: partnerEventData.interestedEvents || []
        }
      })
    } catch (emailError) {
      logger.error(getApiLogMessage('WELCOME_EMAIL_ERROR'), emailError)
      // Don't fail signup for email errors
    }

    // Register for relevant cultural events automatically
    let autoRegistrationResults = null
    try {
      autoRegistrationResults = await registerForInitialEvents({
        userId: authData.user.id,
        interests: signupData.primaryInterests,
        location: signupData.ukLocation,
        culturalOrigin: signupData.portugueseOrigin?.country || 'unknown',
        partnerEventInterest: signupData.partnerEventInterest
      })
    } catch (registrationError) {
      logger.error(getApiLogMessage('AUTO_REGISTRATION_ERROR'), registrationError)
      // Don't fail signup for registration errors
    }

    // Calculate cultural compatibility score
    let compatibilityData = null
    try {
      const { data: compatibilityScore } = await supabase.rpc(
        'calculate_initial_cultural_compatibility',
        {
          user_id: authData.user.id,
          cultural_prefs: {
            portuguese_region: signupData.portugueseOrigin.country,
            language_preference: signupData.languagePreference,
            cultural_interests: signupData.primaryInterests,
            heritage_pride: 5, // Default high heritage pride for new signups
            event_frequency: signupData.eventNotifications ? 'weekly' : 'monthly'
          }
        }
      )
      compatibilityData = compatibilityScore
    } catch (compatibilityError) {
      logger.error(getApiLogMessage('COMPATIBILITY_CALCULATION_ERROR'), compatibilityError)
    }

    // Generate recommendations based on signup data
    const recommendations = generateInitialRecommendations({
      primaryInterests: signupData.primaryInterests,
      portugueseOrigin: signupData.portugueseOrigin,
      ukLocation: signupData.ukLocation,
      partnerEventInterest: signupData.partnerEventInterest,
      profileVisibility: signupData.profileVisibility
    })

    const response: SignupResponse = {
      success: true,
      profile: {
        ...profile,
        referral_applied: !!referralResult,
        referral_discount: referralResult?.discount_percentage || null
      },
      culturalMatch: compatibilityData,
      partnerEvents: partnerEventData.interestedEvents || [],
      recommendations
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    logger.error(getApiLogMessage('ENHANCED_SIGNUP_ERROR'), error)
    return NextResponse.json(
      { 
        success: false, 
        error: getApiErrorMessage('UNEXPECTED_SIGNUP_ERROR')
      },
      { status: 500 }
    )
  }
}

// Generate initial recommendations based on signup data
function generateInitialRecommendations(data: {
  primaryInterests: string[]
  portugueseOrigin: any
  ukLocation: string
  partnerEventInterest: boolean
  profileVisibility: string
}) {
  const recommendations = []

  // Business networking recommendations
  if (data.primaryInterests.includes('business-networking')) {
    recommendations.push({
      ...INITIAL_RECOMMENDATIONS.BUSINESS_NETWORKING,
      next_date: getNextFirstSaturday()
    })
  }

  // Cultural event recommendations
  if (data.primaryInterests.includes('cultural-events')) {
    recommendations.push({
      ...INITIAL_RECOMMENDATIONS.CULTURAL_EVENTS,
      next_date: getNextFirstFriday()
    })
  }

  // Dance recommendations
  if (data.primaryInterests.includes('dance-cultural-arts') || data.partnerEventInterest) {
    recommendations.push({
      ...INITIAL_RECOMMENDATIONS.DANCE_EVENTS,
      next_date: getNextTuesday()
    })
  }

  // Dating recommendations
  if (data.primaryInterests.includes('dating-romance')) {
    recommendations.push(INITIAL_RECOMMENDATIONS.CULTURAL_MATCHING)
  }

  // Location-specific recommendations
  if (data.ukLocation === 'London') {
    recommendations.push(INITIAL_RECOMMENDATIONS.STOCKWELL_COMMUNITY)
  }

  return recommendations.slice(0, 5) // Limit to 5 recommendations
}

// Helper functions for date calculations
function getNextFirstSaturday(): string {
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstSaturday = new Date(firstOfMonth)
  firstSaturday.setDate(1 + (6 - firstOfMonth.getDay()) % 7)
  
  if (firstSaturday < now) {
    // Next month's first Saturday
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const nextFirstSaturday = new Date(nextMonth)
    nextFirstSaturday.setDate(1 + (6 - nextMonth.getDay()) % 7)
    return nextFirstSaturday.toISOString()
  }
  
  return firstSaturday.toISOString()
}

function getNextFirstFriday(): string {
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstFriday = new Date(firstOfMonth)
  firstFriday.setDate(1 + (5 - firstOfMonth.getDay() + 7) % 7)
  
  if (firstFriday < now) {
    // Next month's first Friday
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const nextFirstFriday = new Date(nextMonth)
    nextFirstFriday.setDate(1 + (5 - nextMonth.getDay() + 7) % 7)
    return nextFirstFriday.toISOString()
  }
  
  return firstFriday.toISOString()
}

function getNextTuesday(): string {
  const now = new Date()
  const nextTuesday = new Date(now)
  const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7
  nextTuesday.setDate(now.getDate() + daysUntilTuesday)
  nextTuesday.setHours(20, 0, 0, 0) // 8 PM
  return nextTuesday.toISOString()
}