/**
 * Cultural Background Validation
 * Validates Lusophone cultural information and heritage
 */

import { EnhancedSignupForm, PortugueseCountry } from '@/types/enhanced-signup'
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries'

export interface CulturalValidationResult {
  isValid: boolean
  culturalScore: number
  validationFlags: string[]
  recommendations: string[]
  heritageLevel: 'strong' | 'moderate' | 'developing'
}

export async function validateCulturalBackground(
  signupData: EnhancedSignupForm
): Promise<CulturalValidationResult> {
  const validationFlags: string[] = []
  const recommendations: string[] = []
  let culturalScore = 0

  // Validate Lusophone origin
  const originValidation = validatePortugueseOrigin(signupData.portugueseOrigin)
  culturalScore += originValidation.score
  validationFlags.push(...originValidation.flags)
  recommendations.push(...originValidation.recommendations)

  // Validate cultural interests
  const interestsValidation = validateCulturalInterests(signupData)
  culturalScore += interestsValidation.score
  validationFlags.push(...interestsValidation.flags)
  recommendations.push(...interestsValidation.recommendations)

  // Validate language preference
  const languageValidation = validateLanguagePreference(signupData.languagePreference)
  culturalScore += languageValidation.score
  validationFlags.push(...languageValidation.flags)

  // Validate verification badges
  if (signupData.culturalVerificationBadges && signupData.culturalVerificationBadges.length > 0) {
    const badgeValidation = validateCulturalBadges(signupData.culturalVerificationBadges)
    culturalScore += badgeValidation.score
    validationFlags.push(...badgeValidation.flags)
  }

  // Determine heritage level
  const heritageLevel = determineHeritageLevel(culturalScore, signupData)

  // Generate specific recommendations
  const specificRecommendations = generateCulturalRecommendations(signupData, heritageLevel)
  recommendations.push(...specificRecommendations)

  return {
    isValid: validationFlags.length === 0 || validationFlags.every(flag => !flag.startsWith('error:')),
    culturalScore: Math.min(100, culturalScore),
    validationFlags: [...new Set(validationFlags)], // Remove duplicates
    recommendations: [...new Set(recommendations)], // Remove duplicates
    heritageLevel
  }
}

function validatePortugueseOrigin(origin: any) {
  const flags: string[] = []
  const recommendations: string[] = []
  let score = 0

  if (!origin || !origin.country) {
    flags.push('error:missing_portuguese_origin')
    return { score: 0, flags, recommendations }
  }

  // Check if country is valid
  const validCountry = PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === origin.country.toUpperCase())
  if (!validCountry) {
    flags.push('error:invalid_portuguese_country')
    return { score: 0, flags, recommendations }
  }

  // Score based on country (primary countries get higher scores)
  if (validCountry.isPrimary) {
    score += 25
    flags.push('verified:primary_portuguese_country')
  } else {
    score += 15
    flags.push('verified:secondary_portuguese_country')
  }

  // Bonus for region specification
  if (origin.region) {
    score += 10
    flags.push('detail:region_specified')
    recommendations.push(`Connect with others from ${origin.region}`)
  } else {
    recommendations.push('Consider specifying your region to find more local connections')
  }

  // Bonus for cultural background details
  if (origin.culturalBackground && origin.culturalBackground.length > 0) {
    score += 15
    flags.push('detail:cultural_background_provided')
    recommendations.push('Your cultural background will help match you with like-minded community members')
  } else {
    recommendations.push('Adding cultural background details will improve your community matching')
  }

  return { score, flags, recommendations }
}

function validateCulturalInterests(signupData: EnhancedSignupForm) {
  const flags: string[] = []
  const recommendations: string[] = []
  let score = 0

  // Primary interests validation
  if (signupData.primaryInterests && signupData.primaryInterests.length > 0) {
    score += 20
    flags.push('verified:primary_interests_selected')

    // Bonus for cultural-related interests
    const culturalInterests = [
      'cultural-events',
      'dance-cultural-arts', 
      'food-cultural-experiences'
    ]
    const hasCulturalInterests = signupData.primaryInterests.some(interest => 
      culturalInterests.includes(interest)
    )
    
    if (hasCulturalInterests) {
      score += 15
      flags.push('verified:strong_cultural_interests')
      recommendations.push('Your cultural interests will connect you with authentic Lusophone experiences')
    }

    // Check for business interests
    if (signupData.primaryInterests.includes('business-networking')) {
      score += 10
      flags.push('verified:business_networking_interest')
      recommendations.push('Join the Lusophone Business Network for professional connections')
    }

    // Check for romantic interests
    if (signupData.primaryInterests.includes('dating-romance')) {
      score += 10
      flags.push('verified:romantic_interest')
      recommendations.push('Complete the cultural compatibility quiz for better matches')
    }
  } else {
    flags.push('warning:no_primary_interests')
    recommendations.push('Selecting your interests will help us recommend relevant events and connections')
  }

  // Secondary track interests
  const trackScore = calculateTrackScore(signupData)
  score += trackScore.score
  flags.push(...trackScore.flags)
  recommendations.push(...trackScore.recommendations)

  return { score, flags, recommendations }
}

function calculateTrackScore(signupData: EnhancedSignupForm) {
  const flags: string[] = []
  const recommendations: string[] = []
  let score = 0

  if (signupData.businessTrack && signupData.businessTrack.length > 0) {
    score += 10
    flags.push('detail:business_track_specified')
    recommendations.push('Explore Portuguese business opportunities in the UK')
  }

  if (signupData.socialTrack && signupData.socialTrack.length > 0) {
    score += 10
    flags.push('detail:social_track_specified')
    
    if (signupData.socialTrack.includes('kizomba-partner-dancing')) {
      recommendations.push('Join Chocolate Kizomba nights for dance and social connections')
    }
    if (signupData.socialTrack.includes('fado-music')) {
      recommendations.push('Attend Fado nights at Casa do Bacalhau for authentic Portuguese music')
    }
  }

  if (signupData.culturalTrack && signupData.culturalTrack.length > 0) {
    score += 10
    flags.push('detail:cultural_track_specified')
    recommendations.push('Participate in cultural preservation activities and community traditions')
  }

  return { score, flags, recommendations }
}

function validateLanguagePreference(languagePreference: string) {
  const flags: string[] = []
  let score = 0

  switch (languagePreference) {
    case 'pt':
      score = 25
      flags.push('verified:portuguese_first_language')
      break
    case 'both':
      score = 20
      flags.push('verified:bilingual_comfortable')
      break
    case 'en':
      score = 10
      flags.push('verified:english_preference')
      break
    default:
      score = 0
      flags.push('warning:no_language_preference')
  }

  return { score, flags }
}

function validateCulturalBadges(badges: string[]) {
  const flags: string[] = []
  let score = 0

  const badgeScores = {
    'business-owner-verified': 15,
    'single-culturally-connected': 10,
    'cultural-event-organizer': 20,
    'community-ambassador': 25,
    'dance-community-member': 15,
    'language-exchange-leader': 15
  }

  badges.forEach(badge => {
    const badgeScore = badgeScores[badge as keyof typeof badgeScores] || 5
    score += badgeScore
    flags.push(`badge:${badge}`)
  })

  if (badges.length >= 3) {
    score += 10
    flags.push('verified:multiple_community_roles')
  }

  return { score, flags }
}

function determineHeritageLevel(
  culturalScore: number, 
  signupData: EnhancedSignupForm
): 'strong' | 'moderate' | 'developing' {
  // Strong heritage indicators
  const strongIndicators = [
    culturalScore >= 80,
    signupData.languagePreference === 'pt',
    signupData.portugueseOrigin?.culturalBackground?.length >= 3,
    signupData.culturalVerificationBadges?.length >= 2,
    signupData.primaryInterests?.includes('cultural-events'),
    signupData.primaryInterests?.includes('dance-cultural-arts')
  ]

  const strongCount = strongIndicators.filter(Boolean).length

  if (strongCount >= 4) return 'strong'
  if (strongCount >= 2 || culturalScore >= 50) return 'moderate'
  return 'developing'
}

function generateCulturalRecommendations(
  signupData: EnhancedSignupForm, 
  heritageLevel: string
): string[] {
  const recommendations: string[] = []

  // Heritage level specific recommendations
  switch (heritageLevel) {
    case 'strong':
      recommendations.push('Consider becoming a community ambassador to help preserve Portuguese culture')
      recommendations.push('Your strong cultural connection makes you ideal for organizing cultural events')
      break
    case 'moderate':
      recommendations.push('Explore Lusophone cultural workshops to deepen your heritage connection')
      recommendations.push('Connect with community elders to learn more about Portuguese traditions')
      break
    case 'developing':
      recommendations.push('Start with beginner-friendly cultural events to build your Lusophone knowledge')
      recommendations.push('Join language exchange groups to improve your Lusophone skills')
      break
  }

  // Location-specific recommendations
  if (signupData.ukLocation === 'London') {
    recommendations.push('Visit the Lusophone Cultural Centre in South London')
    recommendations.push('Explore Stockwell\'s Little Portugal for authentic shops and restaurants')
  } else {
    recommendations.push(`Connect with the Lusophone community in ${signupData.ukLocation}`)
    recommendations.push('Consider traveling to London for major Lusophone cultural events')
  }

  // Origin-specific recommendations
  const country = signupData.portugueseOrigin?.country
  if (country === 'portugal') {
    recommendations.push('Join regional Lusophone groups to connect with people from your area')
  } else if (country === 'brazil') {
    recommendations.push('Explore Brazilian cultural events and capoeira groups')
  } else if (country === 'angola') {
    recommendations.push('Participate in Angolan cultural celebrations and Kizomba dance events')
  }

  return recommendations
}