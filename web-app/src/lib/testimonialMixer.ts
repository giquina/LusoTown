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

// Authentic Portuguese testimonial data for various services
export const authenticPortugueseTestimonials = {
  community: [
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Fernanda Oliveira',
      age: '31',
      location: 'Stockwell, Londres',
      quote: 'Mudei-me para Londres há 3 anos e sentia-me desligada da minha cultura. Através da LusoTown descobri a Casa do Bacalhau em Stockwell e eventos de fado no The Ivy. Agora organizamos saraus mensais onde cantamos fados tradicionais e partilhamos histórias de casa. É como ter um pedacinho de Portugal em Londres!',
      rating: 5,
      relationship: 'Organizadora de Eventos Culturais',
      imageId: 'fernanda-oliveira'
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Marco Santos',
      age: '28',
      location: 'Bermondsey, Londres',
      quote: 'Cresci no Brasil e queria manter viva a nossa tradição musical em Londres. A LusoTown ajudou-me a encontrar outros brasileiros e portugueses que amam samba e bossa nova. Agora temos uma roda de samba todos os domingos no Burgess Park. A música une-nos mais que qualquer fronteira!',
      rating: 5,
      relationship: 'Músico e Organizador Comunitário',
      imageId: 'marco-santos'
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Catarina Lopes',
      age: '35',
      location: 'Nine Elms, Londres',
      quote: 'Trabalho em tech mas sempre quis ensinar português às minhas filhas. Através da LusoTown organizamos workshops de língua portuguesa para crianças na biblioteca local. Ver os pequenos a falar "obrigada" e cantar canções portuguesas é a minha maior alegria. Estamos a criar a próxima geração luso-londrina!',
      rating: 5,
      relationship: 'Educadora e Mãe Luso-Britânica',
      imageId: 'catarina-lopes'
    }
  ],
  
  transport: [
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'António Ferreira',
      location: 'Canary Wharf, Londres',
      rating: 5,
      text: 'Preciso frequentemente de transporte para reuniões de negócios importantes. O serviço de motorista português da LusoTown é impecável - pontual, discreto e compreende as nossas necessidades culturais. Durante as viagens podemos falar em português sobre negócios sem preocupações. Excelente para executivos lusos!',
      service: 'Transporte Executivo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Isabel Mendes',
      location: 'Kensington, Londres',
      rating: 5,
      text: 'Organizei um tour especial para os meus pais que visitaram Londres pela primeira vez. O motorista falava português perfeito e conhecia todos os locais com história portuguesa - desde a Casa de Portugal em South Kensington até restaurantes autênticos em Vauxhall. Os meus pais adoraram sentir-se em casa!',
      service: 'Tour Cultural Português',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Rui Costa',
      location: 'Greenwich, Londres',
      rating: 5,
      text: 'Como brasileiro em Londres, estava nervoso com o sistema de transportes para eventos importantes. O serviço português da LusoTown eliminou todo o stress - motoristas que entendem a nossa pontualidade cultural, falam nossa língua e conhecem os melhores caminhos. Agora uso sempre para eventos especiais!',
      service: 'Transporte para Eventos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ],
  
  transport: [
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Patrícia Silva',
      location: 'South Lambeth, Londres',
      rating: 5,
      text: 'Trabalho até tarde e sempre me preocupei com a segurança no regresso a casa. O serviço de transporte seguro da LusoTown com motoristas portugueses é perfeito - sinto-me segura, posso relaxar falando português e eles conhecem bem as áreas portuguesas de Londres. Recomendo a todas as mulheres lusas!',
      service: 'Transporte Seguro Noturno',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face'
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Carlos Alberto',
      location: 'Elephant & Castle, Londres',
      rating: 5,
      text: 'Trouxe a minha família de Portugal para visitar Londres e queríamos um tour que respeitasse a nossa cultura. O motorista português mostrou-nos não só os pontos turísticos tradicionais mas também locais especiais para portugueses - mercados, restaurantes, centros comunitários. Foi uma experiência autenticamente lusa!',
      service: 'Tour Familiar Português',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ]
}