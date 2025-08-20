// Bilingual testimonial mixing utility
// Ensures 70% Portuguese reviews are always displayed regardless of language setting

export interface BaseTestimonial {
  id: string | number
  name: string
  rating: number
  language: 'en' | 'pt'
  isAuthentic?: boolean // Marks if this is an authentic Portuguese review
}

export interface TestimonialMixConfig {
  portuguesePercentage: number // Default 70%
  shuffleSeed?: string // For consistent ordering
}

/**
 * Creates a mixed array of testimonials ensuring Portuguese representation
 * @param allTestimonials - Complete array of testimonials with language indicators
 * @param config - Configuration for mixing logic
 * @returns Mixed array maintaining Portuguese percentage
 */
export function createMixedTestimonials<T extends BaseTestimonial>(
  allTestimonials: T[],
  config: TestimonialMixConfig = { portuguesePercentage: 70 }
): T[] {
  const { portuguesePercentage } = config
  
  // Separate Portuguese and English testimonials
  const portugueseReviews = allTestimonials.filter(t => t.language === 'pt')
  const englishReviews = allTestimonials.filter(t => t.language === 'en')
  
  // Calculate how many Portuguese reviews we need
  const totalReviews = allTestimonials.length
  const neededPortuguese = Math.ceil((portuguesePercentage / 100) * totalReviews)
  
  // Ensure we have enough Portuguese reviews
  const selectedPortuguese = portugueseReviews.slice(0, neededPortuguese)
  const remainingSlots = totalReviews - selectedPortuguese.length
  const selectedEnglish = englishReviews.slice(0, remainingSlots)
  
  // Combine and shuffle for natural distribution
  const mixed = [...selectedPortuguese, ...selectedEnglish]
  
  // Simple shuffle for natural distribution (deterministic with seed)
  return shuffleArray(mixed)
}

/**
 * Simple deterministic shuffle for consistent testimonial ordering
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  
  // Simple shuffle pattern that distributes Portuguese reviews naturally
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Create deterministic pseudo-random index
    const j = (i * 7 + 3) % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Gets display text based on testimonial language, not user's language preference
 * This ensures Portuguese reviews always display in Portuguese
 */
export function getTestimonialText(
  testimonial: any,
  userLanguage: 'en' | 'pt'
): {
  text: string
  location: string
  service?: string
  relationship?: string
} {
  // If testimonial is marked as Portuguese, always show Portuguese version
  if (testimonial.language === 'pt') {
    return {
      text: testimonial.textPortuguese || testimonial.quote,
      location: testimonial.locationPortuguese || testimonial.location,
      service: testimonial.servicePortuguese || testimonial.service,
      relationship: testimonial.relationshipPortuguese || testimonial.relationship
    }
  }
  
  // For English testimonials, respect user's language preference
  if (userLanguage === 'pt' && testimonial.textPortuguese) {
    return {
      text: testimonial.textPortuguese,
      location: testimonial.locationPortuguese || testimonial.location,
      service: testimonial.servicePortuguese || testimonial.service,
      relationship: testimonial.relationshipPortuguese || testimonial.relationship
    }
  }
  
  // Default to English
  return {
    text: testimonial.text || testimonial.quote,
    location: testimonial.location,
    service: testimonial.service,
    relationship: testimonial.relationship
  }
}
// Re-export content moved to centralized module (prefer CMS/i18n later)
export { authenticPortugueseTestimonials } from '@/content/testimonials'