/**
 * Partnership Event Processor
 * Processes partner event interests and creates initial connections
 */

import { EnhancedSignupForm } from '@/types/enhanced-signup'
import { PARTNERSHIP_EVENTS, getNewUserRecommendations } from '@/config/partnership-events'

export interface PartnerEventProcessingResult {
  interestedEvents: PartnerEventInterest[]
  recommendations: PartnerEventRecommendation[]
  autoRegistrations: PartnerEventRegistration[]
  discounts: PartnerEventDiscount[]
}

export interface PartnerEventInterest {
  eventId: string
  partnerName: string
  eventName: string
  interestLevel: 'high' | 'medium' | 'low'
  matchingReasons: string[]
  nextEventDate?: string
  location: string
  memberBenefits: string[]
}

export interface PartnerEventRecommendation {
  eventId: string
  score: number
  reasoning: string[]
  userPersonalization: string
}

export interface PartnerEventRegistration {
  eventId: string
  eventType: string
  registrationStatus: 'pending' | 'confirmed'
  welcomePackage?: boolean
}

export interface PartnerEventDiscount {
  eventId: string
  discountPercentage: number
  validUntil: string
  discountCode: string
  conditions: string[]
}

export async function processPartnerEventInterests(
  signupData: EnhancedSignupForm
): Promise<PartnerEventProcessingResult> {
  const interestedEvents: PartnerEventInterest[] = []
  const recommendations: PartnerEventRecommendation[] = []
  const autoRegistrations: PartnerEventRegistration[] = []
  const discounts: PartnerEventDiscount[] = []

  // Process based on primary interests
  for (const interest of signupData.primaryInterests) {
    const matchingEvents = findMatchingPartnerEvents(interest, signupData)
    
    for (const event of matchingEvents) {
      const eventInterest = createEventInterest(event, interest, signupData)
      interestedEvents.push(eventInterest)

      // Generate recommendations
      const recommendation = generateEventRecommendation(event, signupData)
      recommendations.push(recommendation)

      // Create discount if applicable
      if (event.lusoTownDiscount && event.lusoTownDiscount > 0) {
        const discount = createEventDiscount(event, signupData)
        discounts.push(discount)
      }

      // Auto-register for beginner-friendly events if user opted in
      if (signupData.partnerEventInterest && isBeginnerFriendlyEvent(event, signupData)) {
        const registration = createAutoRegistration(event, signupData)
        autoRegistrations.push(registration)
      }
    }
  }

  // Process specific partner event interest flag
  if (signupData.partnerEventInterest) {
    const partnerRecommendations = getNewUserRecommendations(signupData.primaryInterests)
    
    for (const partnerEvent of partnerRecommendations) {
      if (!interestedEvents.find(e => e.eventId === partnerEvent.id)) {
        const eventInterest = createEventInterest(partnerEvent, 'partner-interest', signupData)
        interestedEvents.push(eventInterest)
      }
    }
  }

  // Add cultural origin specific events
  const culturalEvents = findCulturalOriginEvents(signupData.portugueseOrigin.country)
  for (const event of culturalEvents) {
    if (!interestedEvents.find(e => e.eventId === event.id)) {
      const eventInterest = createEventInterest(event, 'cultural-origin', signupData)
      interestedEvents.push(eventInterest)
    }
  }

  return {
    interestedEvents: interestedEvents.slice(0, 10), // Limit to top 10
    recommendations: recommendations.sort((a, b) => b.score - a.score).slice(0, 5),
    autoRegistrations,
    discounts
  }
}

function findMatchingPartnerEvents(interest: string, signupData: EnhancedSignupForm) {
  const matchingEvents = []

  // Map interests to partner events
  const interestMapping = {
    'dance-cultural-arts': ['chocolate-kizomba', 'brazilian-cultural-center'],
    'cultural-events': ['fado-casa-do-bacalhau', 'cape-verdean-music-society'],
    'business-networking': ['portuguese-business-network'],
    'dating-romance': ['chocolate-kizomba'], // Dance events good for romance
    'food-cultural-experiences': ['fado-casa-do-bacalhau'],
    'friendship-social': ['brazilian-cultural-center', 'cape-verdean-music-society']
  }

  const eventIds = interestMapping[interest as keyof typeof interestMapping] || []
  
  for (const eventId of eventIds) {
    const event = PARTNERSHIP_EVENTS.find(e => e.id === eventId)
    if (event) {
      matchingEvents.push(event)
    }
  }

  // Filter by location preference (prioritize London events for London users)
  if (signupData.ukLocation === 'London') {
    return matchingEvents // All partnership events are in London currently
  } else {
    // For non-London users, still show events but mark as travel required
    return matchingEvents
  }
}

function createEventInterest(
  event: any, 
  matchingReason: string, 
  signupData: EnhancedSignupForm
): PartnerEventInterest {
  const matchingReasons = []
  let interestLevel: 'high' | 'medium' | 'low' = 'medium'

  // Determine interest level and reasons
  if (matchingReason === 'dance-cultural-arts' && event.id.includes('kizomba')) {
    interestLevel = 'high'
    matchingReasons.push('Perfect match for dance and cultural interests')
  } else if (matchingReason === 'cultural-events' && event.id.includes('fado')) {
    interestLevel = 'high'
    matchingReasons.push('Authentic Lusophone cultural experience')
  } else if (matchingReason === 'business-networking' && event.id.includes('business')) {
    interestLevel = 'high'
    matchingReasons.push('Ideal for Portuguese business networking')
  } else {
    interestLevel = 'medium'
    matchingReasons.push('Good match for your interests')
  }

  // Add location matching
  if (signupData.ukLocation === 'London') {
    matchingReasons.push('Located in your area')
  } else {
    matchingReasons.push('Worth traveling to London for')
  }

  // Add language matching
  if (signupData.languagePreference === 'pt' && event.culturalFocus.includes('portuguese-language')) {
    matchingReasons.push('Portuguese language friendly')
    interestLevel = 'high'
  }

  // Add cultural origin matching
  const originMatching = {
    'portugal': ['portuguese-heritage', 'fado-music'],
    'brazil': ['brazilian-heritage', 'samba-dance', 'brazilian-music'],
    'angola': ['angolan-heritage', 'kizomba-dance'],
    'cape-verde': ['cape-verdean-heritage', 'morna-music'],
    'mozambique': ['portuguese-language']
  }

  const userOriginFocus = originMatching[signupData.portugueseOrigin.country as keyof typeof originMatching] || []
  const hasOriginMatch = event.culturalFocus?.some((focus: string) => userOriginFocus.includes(focus))
  
  if (hasOriginMatch) {
    matchingReasons.push(`Perfect for your ${signupData.portugueseOrigin.country} heritage`)
    interestLevel = 'high'
  }

  return {
    eventId: event.id,
    partnerName: event.partnerName,
    eventName: event.name,
    interestLevel,
    matchingReasons,
    nextEventDate: calculateNextEventDate(event),
    location: event.location,
    memberBenefits: event.memberBenefits
  }
}

function generateEventRecommendation(event: any, signupData: EnhancedSignupForm): PartnerEventRecommendation {
  const reasoning = []
  let score = 50 // Base score

  // Score based on user interests
  const userInterests = signupData.primaryInterests.join(',')
  if (event.targetAudience.some((audience: string) => userInterests.includes(audience))) {
    score += 20
    reasoning.push('Matches your primary interests')
  }

  // Score based on cultural focus
  const userOrigin = signupData.portugueseOrigin.country
  if (event.culturalFocus?.some((focus: string) => focus.includes(userOrigin))) {
    score += 25
    reasoning.push(`Perfect for ${userOrigin} heritage`)
  }

  // Score based on language preference
  if (signupData.languagePreference === 'pt' && event.culturalFocus?.includes('portuguese-language')) {
    score += 15
    reasoning.push('Portuguese language environment')
  }

  // Score based on location
  if (signupData.ukLocation === 'London') {
    score += 10
    reasoning.push('Located in your city')
  }

  // Score based on price range and accessibility
  if (event.priceRange === 'free' || event.priceRange === 'low') {
    score += 10
    reasoning.push('Affordable and accessible')
  }

  // Bonus for beginner-friendly events
  if (event.eventTypes?.some((type: any) => type.beginnerFriendly)) {
    score += 10
    reasoning.push('Beginner-friendly environment')
  }

  const personalization = createPersonalizationMessage(event, signupData)

  return {
    eventId: event.id,
    score: Math.min(100, score),
    reasoning,
    userPersonalization: personalization
  }
}

function createEventDiscount(event: any, signupData: EnhancedSignupForm): PartnerEventDiscount {
  const discountCode = generateDiscountCode(event.id, signupData.firstName)
  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + 30) // 30 days validity

  return {
    eventId: event.id,
    discountPercentage: event.lusoTownDiscount,
    validUntil: validUntil.toISOString(),
    discountCode,
    conditions: [
      'Valid for new LusoTown members only',
      'Cannot be combined with other offers',
      'Must mention LusoTown when booking',
      `Valid until ${validUntil.toLocaleDateString()}`
    ]
  }
}

function createAutoRegistration(event: any, signupData: EnhancedSignupForm): PartnerEventRegistration {
  return {
    eventId: event.id,
    eventType: 'beginner-session',
    registrationStatus: 'pending',
    welcomePackage: true
  }
}

function isBeginnerFriendlyEvent(event: any, signupData: EnhancedSignupForm): boolean {
  return event.eventTypes?.some((type: any) => type.beginnerFriendly) &&
         event.priceRange !== 'premium' &&
         !signupData.culturalVerificationBadges?.includes('cultural-event-organizer')
}

function findCulturalOriginEvents(country: string) {
  const originMapping = {
    'portugal': ['fado-casa-do-bacalhau'],
    'brazil': ['brazilian-cultural-center'],
    'angola': ['chocolate-kizomba'],
    'cape-verde': ['cape-verdean-music-society'],
    'mozambique': ['portuguese-business-network']
  }

  const eventIds = originMapping[country as keyof typeof originMapping] || []
  return PARTNERSHIP_EVENTS.filter(event => eventIds.includes(event.id))
}

function calculateNextEventDate(event: any): string {
  const now = new Date()
  
  // Simple calculation based on schedule patterns
  if (event.schedule.includes('Tuesday & Thursday')) {
    const nextTuesday = new Date(now)
    const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7
    nextTuesday.setDate(now.getDate() + daysUntilTuesday)
    nextTuesday.setHours(20, 0, 0, 0)
    return nextTuesday.toISOString()
  }
  
  if (event.schedule.includes('First Friday')) {
    // Calculate next first Friday
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstFriday = new Date(firstOfMonth)
    firstFriday.setDate(1 + (5 - firstOfMonth.getDay() + 7) % 7)
    
    if (firstFriday < now) {
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const nextFirstFriday = new Date(nextMonth)
      nextFirstFriday.setDate(1 + (5 - nextMonth.getDay() + 7) % 7)
      return nextFirstFriday.toISOString()
    }
    return firstFriday.toISOString()
  }
  
  if (event.schedule.includes('First Saturday')) {
    // Calculate next first Saturday
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstSaturday = new Date(firstOfMonth)
    firstSaturday.setDate(1 + (6 - firstOfMonth.getDay()) % 7)
    
    if (firstSaturday < now) {
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const nextFirstSaturday = new Date(nextMonth)
      nextFirstSaturday.setDate(1 + (6 - nextMonth.getDay()) % 7)
      return nextFirstSaturday.toISOString()
    }
    return firstSaturday.toISOString()
  }
  
  // Default to next weekend
  const nextWeekend = new Date(now)
  const daysUntilWeekend = (6 - now.getDay()) % 7 || 7
  nextWeekend.setDate(now.getDate() + daysUntilWeekend)
  return nextWeekend.toISOString()
}

function createPersonalizationMessage(event: any, signupData: EnhancedSignupForm): string {
  const origin = signupData.portugueseOrigin.country
  const interests = signupData.primaryInterests
  const location = signupData.ukLocation
  
  if (event.id === 'chocolate-kizomba') {
    if (interests.includes('dating-romance')) {
      return `${signupData.firstName}, Kizomba is perfect for meeting someone special while celebrating Angolan culture!`
    } else if (interests.includes('dance-cultural-arts')) {
      return `${signupData.firstName}, learn authentic Angolan Kizomba in London's most welcoming dance community!`
    } else {
      return `${signupData.firstName}, discover the beautiful art of Kizomba dancing every Tuesday & Thursday!`
    }
  }
  
  if (event.id === 'fado-casa-do-bacalhau') {
    if (origin === 'portugal') {
      return `${signupData.firstName}, experience the saudade of Portugal with authentic Fado music in London!`
    } else {
      return `${signupData.firstName}, immerse yourself in the soul of Portuguese culture through traditional Fado!`
    }
  }
  
  if (event.id === 'portuguese-business-network') {
    return `${signupData.firstName}, build your professional network with successful Lusophone entrepreneurs!`
  }
  
  return `${signupData.firstName}, this event is perfectly matched to your interests and cultural background!`
}

function generateDiscountCode(eventId: string, firstName: string): string {
  const eventPrefix = eventId.split('-')[0].toUpperCase().substring(0, 4)
  const namePrefix = firstName.toUpperCase().substring(0, 3)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${eventPrefix}${namePrefix}${random}`
}