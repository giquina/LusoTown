/**
 * Weekend Events Configuration
 * 
 * Portuguese-speaking community weekend events featuring authentic cultural experiences
 * from all lusophone countries across the United Kingdom
 */

import { Event } from '@/types/event'

export interface WeekendEventItem {
  id: string
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  shortDescription: {
    en: string
    pt: string
  }
  image: string
  flagEmoji: string
  date: string
  time: string
  endTime?: string
  location: string
  city: string
  region: string
  attendees: number
  maxAttendees: number
  price: number
  category: string
  culturalOrigin: 'portugal' | 'brazil' | 'angola' | 'cape_verde' | 'mozambique' | 'guinea_bissau' | 'sao_tome_principe'
  culturalCategory: string
  languageRequirements: 'portuguese_only' | 'english_only' | 'bilingual' | 'any'
  status: 'available' | 'fully-booked' | 'limited'
  featured: boolean
  specialOffer?: string
  tags: string[]
  organizer: {
    name: string
    contact: string
    verified: boolean
  }
  culturalAuthenticity: number // 1-10 scale
  communityRating: number
  reviewCount: number
  isRecurring: boolean
  priority: number
}

/**
 * This Weekend's Lusophone Community Events
 * Authentic experiences from Portuguese-speaking nations across the UK
 */
export const THIS_WEEKEND_LUSOPHONE_EVENTS: WeekendEventItem[] = [
  // LONDON EVENTS - Portuguese Heritage
  {
    id: 'fado-night-london-saturday',
    title: {
      en: 'Authentic Fado Night at Portuguese Cultural Centre',
      pt: 'Noite de Fado Autêntico no Centro Cultural Português'
    },
    description: {
      en: 'Experience the soul of Portugal with traditional Fado music performed by renowned fadistas from Lisbon. An intimate evening celebrating Portuguese musical heritage.',
      pt: 'Experiencie a alma de Portugal com música Fado tradicional interpretada por fadistas renomados de Lisboa. Uma noite íntima celebrando o património musical português.'
    },
    shortDescription: {
      en: 'Authentic Fado performance by Lisbon musicians',
      pt: 'Performance autêntica de Fado por músicos de Lisboa'
    },
    image: '/images/events/fado-night-london.jpg',
    flagEmoji: '🇵🇹',
    date: 'Saturday, 30 November',
    time: '19:30',
    endTime: '22:30',
    location: 'Portuguese Cultural Centre',
    city: 'London',
    region: 'South London',
    attendees: 67,
    maxAttendees: 80,
    price: 25,
    category: 'cultural_music',
    culturalOrigin: 'portugal',
    culturalCategory: 'Traditional Music',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: true,
    specialOffer: 'Student discount: £15',
    tags: ['Fado', 'Traditional Music', 'Portuguese Culture', 'Live Performance', 'Cultural Heritage'],
    organizer: {
      name: 'Centro Cultural Português de Londres',
      contact: 'cultura@ccpl.org.uk',
      verified: true
    },
    culturalAuthenticity: 10,
    communityRating: 4.9,
    reviewCount: 234,
    isRecurring: true,
    priority: 1
  },

  {
    id: 'brazilian-samba-workshop-london',
    title: {
      en: 'Brazilian Samba & Capoeira Workshop - Carnival Preparation',
      pt: 'Workshop de Samba Brasileiro & Capoeira - Preparação do Carnaval'
    },
    description: {
      en: 'Learn authentic Brazilian samba and capoeira from master instructors preparing for London Carnival. Includes traditional costumes and Brazilian percussion.',
      pt: 'Aprenda samba brasileiro e capoeira autênticos com instrutores mestres preparando-se para o Carnaval de Londres. Inclui trajes tradicionais e percussão brasileira.'
    },
    shortDescription: {
      en: 'Brazilian dance workshop for Carnival preparation',
      pt: 'Workshop de dança brasileira para preparação do Carnaval'
    },
    image: '/images/events/samba-workshop-london.jpg',
    flagEmoji: '🇧🇷',
    date: 'Saturday, 30 November',
    time: '14:00',
    endTime: '17:00',
    location: 'Brazilian Community Centre',
    city: 'London',
    region: 'North London',
    attendees: 45,
    maxAttendees: 60,
    price: 20,
    category: 'cultural_dance',
    culturalOrigin: 'brazil',
    culturalCategory: 'Dance & Movement',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: true,
    tags: ['Samba', 'Capoeira', 'Brazilian Culture', 'Dance Workshop', 'Carnival', 'Percussion'],
    organizer: {
      name: 'Escola de Samba Londres',
      contact: 'samba@escolalondres.co.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.8,
    reviewCount: 156,
    isRecurring: false,
    priority: 1
  },

  {
    id: 'angolan-cuisine-cooking-class-london',
    title: {
      en: 'Traditional Angolan Cooking Class - Muamba de Galinha',
      pt: 'Aula de Culinária Angolana Tradicional - Muamba de Galinha'
    },
    description: {
      en: 'Master the art of traditional Angolan cuisine with authentic Muamba de Galinha cooking class led by Angolan chef from Luanda.',
      pt: 'Domine a arte da culinária angolana tradicional com aula autêntica de Muamba de Galinha conduzida por chef angolano de Luanda.'
    },
    shortDescription: {
      en: 'Authentic Angolan cooking with Luanda chef',
      pt: 'Culinária angolana autêntica com chef de Luanda'
    },
    image: '/images/events/angolan-cooking-london.jpg',
    flagEmoji: '🇦🇴',
    date: 'Sunday, 1 December',
    time: '11:00',
    endTime: '15:00',
    location: 'African Cultural Kitchen',
    city: 'London',
    region: 'East London',
    attendees: 28,
    maxAttendees: 35,
    price: 35,
    category: 'cultural_cuisine',
    culturalOrigin: 'angola',
    culturalCategory: 'Culinary Arts',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: true,
    specialOffer: 'Includes recipe book',
    tags: ['Angolan Cuisine', 'Cooking Class', 'Muamba de Galinha', 'African Culture', 'Traditional Recipes'],
    organizer: {
      name: 'Chef Carlos Burity',
      contact: 'culinaria@chefangolano.co.uk',
      verified: true
    },
    culturalAuthenticity: 10,
    communityRating: 4.7,
    reviewCount: 89,
    isRecurring: false,
    priority: 2
  },

  // MANCHESTER EVENTS - Northern Portuguese Community
  {
    id: 'cape-verde-morna-manchester',
    title: {
      en: 'Cape Verdean Morna Music Evening - Island Sounds',
      pt: 'Noite de Morna Cabo-verdiana - Sons das Ilhas'
    },
    description: {
      en: 'Intimate evening of traditional Cape Verdean Morna music celebrating the musical legacy of Cesária Évora with authentic island musicians.',
      pt: 'Noite íntima de música Morna cabo-verdiana tradicional celebrando o legado musical de Cesária Évora com músicos autênticos das ilhas.'
    },
    shortDescription: {
      en: 'Cape Verdean Morna tribute to Cesária Évora',
      pt: 'Tributo de Morna cabo-verdiana a Cesária Évora'
    },
    image: '/images/events/morna-manchester.jpg',
    flagEmoji: '🇨🇻',
    date: 'Saturday, 30 November',
    time: '20:00',
    endTime: '23:00',
    location: 'Island Rhythms Cultural Centre',
    city: 'Manchester',
    region: 'Manchester City Centre',
    attendees: 52,
    maxAttendees: 70,
    price: 22,
    category: 'cultural_music',
    culturalOrigin: 'cape_verde',
    culturalCategory: 'Traditional Music',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: true,
    tags: ['Morna', 'Cape Verde', 'Cesária Évora', 'Island Music', 'Traditional Songs'],
    organizer: {
      name: 'Associação Cabo-verdiana Manchester',
      contact: 'musica@caboverde-manchester.org.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.8,
    reviewCount: 67,
    isRecurring: true,
    priority: 2
  },

  {
    id: 'portuguese-wine-tasting-manchester',
    title: {
      en: 'Premium Portuguese Wine Tasting - Douro Valley Collection',
      pt: 'Prova de Vinhos Portugueses Premium - Coleção do Vale do Douro'
    },
    description: {
      en: 'Exclusive tasting of premium Portuguese wines from Douro Valley with certified sommelier and traditional Portuguese petiscos pairing.',
      pt: 'Prova exclusiva de vinhos portugueses premium do Vale do Douro com sommelier certificado e harmonização com petiscos tradicionais portugueses.'
    },
    shortDescription: {
      en: 'Premium Douro wines with Portuguese petiscos',
      pt: 'Vinhos premium do Douro com petiscos portugueses'
    },
    image: '/images/events/wine-tasting-manchester.jpg',
    flagEmoji: '🇵🇹',
    date: 'Sunday, 1 December',
    time: '16:00',
    endTime: '19:00',
    location: 'Casa do Vinho',
    city: 'Manchester',
    region: 'Manchester City Centre',
    attendees: 34,
    maxAttendees: 40,
    price: 45,
    category: 'cultural_wine',
    culturalOrigin: 'portugal',
    culturalCategory: 'Wine & Gastronomy',
    languageRequirements: 'bilingual',
    status: 'limited',
    featured: true,
    specialOffer: 'Includes wine purchase discount',
    tags: ['Portuguese Wine', 'Douro Valley', 'Wine Tasting', 'Petiscos', 'Sommelier'],
    organizer: {
      name: 'Casa do Vinho Manchester',
      contact: 'eventos@casadovinho.co.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.9,
    reviewCount: 145,
    isRecurring: true,
    priority: 2
  },

  // BIRMINGHAM EVENTS - Central England Expansion
  {
    id: 'brazilian-forró-dance-birmingham',
    title: {
      en: 'Brazilian Forró Dance Night - Nordeste Rhythms',
      pt: 'Noite de Forró Brasileiro - Ritmos do Nordeste'
    },
    description: {
      en: 'Authentic Brazilian Forró dance night featuring live accordion music and traditional northeastern Brazilian rhythms with dance lessons.',
      pt: 'Noite autêntica de dança Forró brasileira com música ao vivo de acordeão e ritmos tradicionais do nordeste brasileiro com aulas de dança.'
    },
    shortDescription: {
      en: 'Brazilian Forró with live accordion music',
      pt: 'Forró brasileiro com música ao vivo de acordeão'
    },
    image: '/images/events/forro-birmingham.jpg',
    flagEmoji: '🇧🇷',
    date: 'Saturday, 30 November',
    time: '21:00',
    endTime: '01:00',
    location: 'Samba Birmingham',
    city: 'Birmingham',
    region: 'Birmingham City Centre',
    attendees: 78,
    maxAttendees: 100,
    price: 15,
    category: 'cultural_dance',
    culturalOrigin: 'brazil',
    culturalCategory: 'Social Dancing',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: false,
    tags: ['Forró', 'Brazilian Dance', 'Live Music', 'Accordion', 'Northeastern Brazil', 'Social Dance'],
    organizer: {
      name: 'Samba Birmingham',
      contact: 'dance@sambabirmingham.co.uk',
      verified: true
    },
    culturalAuthenticity: 8,
    communityRating: 4.6,
    reviewCount: 123,
    isRecurring: true,
    priority: 3
  },

  {
    id: 'mozambique-cultural-festival-birmingham',
    title: {
      en: 'Mozambican Cultural Festival - Heritage Celebration',
      pt: 'Festival Cultural Moçambicano - Celebração da Herança'
    },
    description: {
      en: 'Celebration of Mozambican heritage featuring traditional music, dance, crafts, and cuisine representing the diverse culture of Mozambique.',
      pt: 'Celebração da herança moçambicana com música tradicional, dança, artesanato e culinária representando a cultura diversa de Moçambique.'
    },
    shortDescription: {
      en: 'Mozambican heritage with music, dance & crafts',
      pt: 'Herança moçambicana com música, dança e artesanato'
    },
    image: '/images/events/mozambique-festival-birmingham.jpg',
    flagEmoji: '🇲🇿',
    date: 'Sunday, 1 December',
    time: '12:00',
    endTime: '18:00',
    location: 'African Heritage Centre',
    city: 'Birmingham',
    region: 'Birmingham City Centre',
    attendees: 89,
    maxAttendees: 120,
    price: 12,
    category: 'cultural_festival',
    culturalOrigin: 'mozambique',
    culturalCategory: 'Cultural Festival',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: false,
    specialOffer: 'Family tickets: £30 (4 people)',
    tags: ['Mozambique', 'African Culture', 'Traditional Crafts', 'Cultural Festival', 'Heritage'],
    organizer: {
      name: 'Associação Moçambicana Birmingham',
      contact: 'cultura@mozambique-birmingham.org.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.5,
    reviewCount: 78,
    isRecurring: false,
    priority: 3
  },

  // EDINBURGH EVENTS - Scottish Expansion
  {
    id: 'portuguese-literature-edinburgh',
    title: {
      en: 'Portuguese Literature Discussion - Fernando Pessoa Society',
      pt: 'Discussão de Literatura Portuguesa - Sociedade Fernando Pessoa'
    },
    description: {
      en: 'Literary discussion and poetry reading celebrating Portuguese literature with focus on Fernando Pessoa and contemporary Portuguese authors.',
      pt: 'Discussão literária e leitura de poesia celebrando a literatura portuguesa com foco em Fernando Pessoa e autores portugueses contemporâneos.'
    },
    shortDescription: {
      en: 'Portuguese literature & Fernando Pessoa poetry',
      pt: 'Literatura portuguesa & poesia de Fernando Pessoa'
    },
    image: '/images/events/literature-edinburgh.jpg',
    flagEmoji: '🇵🇹',
    date: 'Sunday, 1 December',
    time: '15:00',
    endTime: '17:30',
    location: 'Edinburgh Portuguese Society',
    city: 'Edinburgh',
    region: 'Edinburgh City Centre',
    attendees: 23,
    maxAttendees: 30,
    price: 8,
    category: 'cultural_literature',
    culturalOrigin: 'portugal',
    culturalCategory: 'Literature & Arts',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: false,
    tags: ['Portuguese Literature', 'Fernando Pessoa', 'Poetry', 'Book Discussion', 'Cultural Arts'],
    organizer: {
      name: 'Edinburgh Portuguese Society',
      contact: 'literatura@edinburgh-portuguese.org.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.7,
    reviewCount: 45,
    isRecurring: true,
    priority: 3
  },

  // GLASGOW EVENTS
  {
    id: 'guinea-bissau-cultural-evening-glasgow',
    title: {
      en: 'Guinea-Bissau Cultural Evening - Traditional Music & Dance',
      pt: 'Noite Cultural da Guiné-Bissau - Música e Dança Tradicionais'
    },
    description: {
      en: 'Authentic Guinea-Bissau cultural evening featuring traditional Gumbe music, Bissau-Guinean dance, and cultural storytelling.',
      pt: 'Noite cultural autêntica da Guiné-Bissau com música tradicional Gumbe, dança bissau-guineense e narrativa cultural.'
    },
    shortDescription: {
      en: 'Guinea-Bissau Gumbe music & traditional dance',
      pt: 'Música Gumbe e dança tradicional da Guiné-Bissau'
    },
    image: '/images/events/guinea-bissau-glasgow.jpg',
    flagEmoji: '🇬🇼',
    date: 'Saturday, 30 November',
    time: '19:00',
    endTime: '22:00',
    location: 'West African Cultural Centre',
    city: 'Glasgow',
    region: 'Glasgow City Centre',
    attendees: 41,
    maxAttendees: 50,
    price: 18,
    category: 'cultural_music',
    culturalOrigin: 'guinea_bissau',
    culturalCategory: 'Traditional Music',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: false,
    tags: ['Guinea-Bissau', 'Gumbe Music', 'African Culture', 'Traditional Dance', 'Cultural Heritage'],
    organizer: {
      name: 'Comunidade Bissau-Guineense Glasgow',
      contact: 'cultura@bissauguine-glasgow.org.uk',
      verified: true
    },
    culturalAuthenticity: 10,
    communityRating: 4.6,
    reviewCount: 29,
    isRecurring: false,
    priority: 4
  },

  // SÃO TOMÉ & PRÍNCIPE EVENT
  {
    id: 'sao-tome-chocolate-workshop-london',
    title: {
      en: 'São Tomé Chocolate Workshop - Island Cacao Heritage',
      pt: 'Workshop de Chocolate de São Tomé - Herança do Cacau das Ilhas'
    },
    description: {
      en: 'Experience São Tomé chocolate-making traditions with authentic cacao from the islands and learn about sustainable chocolate production.',
      pt: 'Experiencie as tradições de fabricação de chocolate de São Tomé com cacau autêntico das ilhas e aprenda sobre produção sustentável de chocolate.'
    },
    shortDescription: {
      en: 'São Tomé chocolate-making with authentic cacao',
      pt: 'Fabricação de chocolate de São Tomé com cacau autêntico'
    },
    image: '/images/events/chocolate-workshop-london.jpg',
    flagEmoji: '🇸🇹',
    date: 'Sunday, 1 December',
    time: '10:00',
    endTime: '13:00',
    location: 'Island Heritage Centre',
    city: 'London',
    region: 'Central London',
    attendees: 19,
    maxAttendees: 25,
    price: 28,
    category: 'cultural_workshop',
    culturalOrigin: 'sao_tome_principe',
    culturalCategory: 'Cultural Arts',
    languageRequirements: 'bilingual',
    status: 'available',
    featured: false,
    specialOffer: 'Take home chocolate bars',
    tags: ['São Tomé', 'Chocolate Making', 'Cacao Heritage', 'Island Culture', 'Sustainable Production'],
    organizer: {
      name: 'São Tomé Cultural Association',
      contact: 'workshops@saotome-cultural.org.uk',
      verified: true
    },
    culturalAuthenticity: 9,
    communityRating: 4.8,
    reviewCount: 16,
    isRecurring: false,
    priority: 4
  }
]

/**
 * Get weekend events by cultural origin
 */
export function getWeekendEventsByOrigin(origin: WeekendEventItem['culturalOrigin']): WeekendEventItem[] {
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event => event.culturalOrigin === origin)
}

/**
 * Get weekend events by city
 */
export function getWeekendEventsByCity(city: string): WeekendEventItem[] {
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event => 
    event.city.toLowerCase() === city.toLowerCase()
  )
}

/**
 * Get featured weekend events
 */
export function getFeaturedWeekendEvents(): WeekendEventItem[] {
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event => event.featured)
    .sort((a, b) => a.priority - b.priority)
}

/**
 * Get weekend events by category
 */
export function getWeekendEventsByCategory(category: string): WeekendEventItem[] {
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event => event.category === category)
}

/**
 * Get weekend events by availability status
 */
export function getAvailableWeekendEvents(): WeekendEventItem[] {
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event => event.status === 'available')
}

/**
 * Search weekend events
 */
export function searchWeekendEvents(query: string): WeekendEventItem[] {
  const lowerQuery = query.toLowerCase()
  return THIS_WEEKEND_LUSOPHONE_EVENTS.filter(event =>
    event.title.en.toLowerCase().includes(lowerQuery) ||
    event.title.pt.toLowerCase().includes(lowerQuery) ||
    event.description.en.toLowerCase().includes(lowerQuery) ||
    event.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    event.culturalOrigin.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Weekend events statistics
 */
export function getWeekendEventsStats() {
  return {
    totalEvents: THIS_WEEKEND_LUSOPHONE_EVENTS.length,
    featuredEvents: THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.featured).length,
    totalAttendees: THIS_WEEKEND_LUSOPHONE_EVENTS.reduce((sum, e) => sum + e.attendees, 0),
    averagePrice: THIS_WEEKEND_LUSOPHONE_EVENTS.reduce((sum, e) => sum + e.price, 0) / THIS_WEEKEND_LUSOPHONE_EVENTS.length,
    averageRating: THIS_WEEKEND_LUSOPHONE_EVENTS.reduce((sum, e) => sum + e.communityRating, 0) / THIS_WEEKEND_LUSOPHONE_EVENTS.length,
    countriesRepresented: Array.from(new Set(THIS_WEEKEND_LUSOPHONE_EVENTS.map(e => e.culturalOrigin))).length,
    citiesServed: Array.from(new Set(THIS_WEEKEND_LUSOPHONE_EVENTS.map(e => e.city))).length,
    verifiedOrganizers: THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.organizer.verified).length
  }
}

/**
 * Cultural diversity distribution
 */
export const CULTURAL_DISTRIBUTION = {
  'portugal': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'portugal').length,
  'brazil': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'brazil').length,
  'angola': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'angola').length,
  'cape_verde': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'cape_verde').length,
  'mozambique': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'mozambique').length,
  'guinea_bissau': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'guinea_bissau').length,
  'sao_tome_principe': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.culturalOrigin === 'sao_tome_principe').length
}

/**
 * City distribution for geographic insights
 */
export const CITY_DISTRIBUTION = {
  'London': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.city === 'London').length,
  'Manchester': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.city === 'Manchester').length,
  'Birmingham': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.city === 'Birmingham').length,
  'Edinburgh': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.city === 'Edinburgh').length,
  'Glasgow': THIS_WEEKEND_LUSOPHONE_EVENTS.filter(e => e.city === 'Glasgow').length
}