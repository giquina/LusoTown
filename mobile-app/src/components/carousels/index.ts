/**
 * LusoTown Mobile - Portuguese Community Carousels
 * 
 * Export all carousel components and types for the mobile app.
 * Optimized for Portuguese-speaking community content.
 */

// Main carousel component
export { default as LusophoneCarousel } from './LusophoneCarousel';
export type {
  LusophoneCarouselItem,
  EventCarouselItem,
  BusinessCarouselItem,
  CulturalCarouselItem,
  CarouselItemType,
  MobileCarouselConfig,
} from './LusophoneCarousel';
export { DEFAULT_MOBILE_CONFIG } from './LusophoneCarousel';

// Specialized carousel components
export { default as EventsCarousel } from './EventsCarousel';
export { default as BusinessCarousel } from './BusinessCarousel';
export { default as CulturalCarousel } from './CulturalCarousel';

/**
 * Sample data generators for development and testing
 */
import { EventCarouselItem, BusinessCarouselItem, CulturalCarouselItem } from './LusophoneCarousel';
import { HERITAGE_FLAGS } from '../../config';

/**
 * Generate sample Portuguese community events
 */
export const generateSampleEvents = (): EventCarouselItem[] => [
  {
    id: 'event-1',
    title: {
      en: 'Fado Night at Portuguese Cultural Centre',
      pt: 'Noite de Fado no Centro Cultural Português',
    },
    description: {
      en: 'Traditional Portuguese Fado performance with dinner',
      pt: 'Espetáculo tradicional de Fado português com jantar',
    },
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
    location: 'Vauxhall, London',
    price: 25,
    attendees: 45,
    tags: ['Fado', 'Music', 'Traditional', 'Dinner'],
    isFeature: true,
    heritage: 'portugal',
    category: 'music',
    actionLabel: {
      en: 'Book Now',
      pt: 'Reservar Agora',
    },
  },
  {
    id: 'event-2',
    title: {
      en: 'Brazilian Capoeira Workshop',
      pt: 'Workshop de Capoeira Brasileira',
    },
    description: {
      en: 'Learn traditional Brazilian martial arts and music',
      pt: 'Aprenda artes marciais e música tradicionais brasileiras',
    },
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Bermondsey, London',
    price: 15,
    attendees: 23,
    tags: ['Capoeira', 'Workshop', 'Brazilian', 'Fitness'],
    isFeature: false,
    heritage: 'brazil',
    category: 'sports',
    actionLabel: {
      en: 'Join Workshop',
      pt: 'Participar Workshop',
    },
  },
  {
    id: 'event-3',
    title: {
      en: 'Cape Verdean Independence Day Celebration',
      pt: 'Celebração do Dia da Independência de Cabo Verde',
    },
    description: {
      en: 'Celebrate Cape Verdean culture with music, dance, and food',
      pt: 'Celebre a cultura cabo-verdiana com música, dança e comida',
    },
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Stockwell, London',
    price: 0,
    attendees: 78,
    tags: ['Independence', 'Culture', 'Free', 'Community'],
    isFeature: true,
    heritage: 'cape-verde',
    category: 'cultural',
    actionLabel: {
      en: 'RSVP Free',
      pt: 'Confirmar Grátis',
    },
  },
];

/**
 * Generate sample Portuguese businesses
 */
export const generateSampleBusinesses = (): BusinessCarouselItem[] => [
  {
    id: 'business-1',
    title: {
      en: 'Casa do Bacalhau',
      pt: 'Casa do Bacalhau',
    },
    description: {
      en: 'Authentic Portuguese restaurant specializing in traditional codfish dishes',
      pt: 'Restaurante português autêntico especializado em pratos tradicionais de bacalhau',
    },
    businessType: 'restaurant',
    rating: 4.7,
    area: 'Vauxhall, London',
    isVerified: true,
    heritage: 'portugal',
    category: 'food',
    actionLabel: {
      en: 'View Menu',
      pt: 'Ver Menu',
    },
  },
  {
    id: 'business-2',
    title: {
      en: 'London Portuguese Services',
      pt: 'Serviços Portugueses Londres',
    },
    description: {
      en: 'Translation, legal, and immigration services for the Portuguese community',
      pt: 'Serviços de tradução, jurídicos e imigração para a comunidade portuguesa',
    },
    businessType: 'service',
    rating: 4.9,
    area: 'Central London',
    isVerified: true,
    heritage: 'portugal',
    category: 'services',
    actionLabel: {
      en: 'Contact Us',
      pt: 'Contacte-nos',
    },
  },
  {
    id: 'business-3',
    title: {
      en: 'Azulejo Arts & Crafts',
      pt: 'Arte e Artesanato Azulejo',
    },
    description: {
      en: 'Portuguese traditional tiles and handmade crafts from all PALOP countries',
      pt: 'Azulejos portugueses tradicionais e artesanato de todos os países PALOP',
    },
    businessType: 'shop',
    rating: 4.5,
    area: 'Camden, London',
    isVerified: false,
    heritage: 'portugal',
    category: 'arts',
    actionLabel: {
      en: 'Visit Shop',
      pt: 'Visitar Loja',
    },
  },
];

/**
 * Generate sample cultural heritage items
 */
export const generateSampleCulturalItems = (): CulturalCarouselItem[] => [
  {
    id: 'cultural-1',
    title: {
      en: 'Portuguese Maritime Heritage',
      pt: 'Patrimônio Marítimo Português',
    },
    description: {
      en: 'Discover the rich maritime tradition that connected Portugal to the world',
      pt: 'Descubra a rica tradição marítima que conectou Portugal ao mundo',
    },
    country: 'Portugal',
    heritage: 'portugal',
    culturalElements: ['Navigation', 'Discoveries', 'Caravels', 'Maritime Trade', 'Port Wine', 'Coastal Traditions'],
    communitySize: 15000,
    category: 'history',
    actionLabel: {
      en: 'Learn More',
      pt: 'Saber Mais',
    },
  },
  {
    id: 'cultural-2',
    title: {
      en: 'Brazilian Cultural Diversity',
      pt: 'Diversidade Cultural Brasileira',
    },
    description: {
      en: 'Explore the vibrant mix of African, Indigenous, and Portuguese cultures',
      pt: 'Explore a vibrante mistura de culturas africanas, indígenas e portuguesas',
    },
    country: 'Brazil',
    heritage: 'brazil',
    culturalElements: ['Samba', 'Capoeira', 'Carnival', 'Bossa Nova', 'Cuisine', 'Indigenous Arts'],
    communitySize: 25000,
    category: 'culture',
    actionLabel: {
      en: 'Explore Culture',
      pt: 'Explorar Cultura',
    },
  },
  {
    id: 'cultural-3',
    title: {
      en: 'Cape Verdean Musical Traditions',
      pt: 'Tradições Musicais Cabo-verdianas',
    },
    description: {
      en: 'Experience the unique blend of African and Portuguese musical influences',
      pt: 'Experimente a mistura única de influências musicais africanas e portuguesas',
    },
    country: 'Cape Verde',
    heritage: 'cape-verde',
    culturalElements: ['Morna', 'Coladeira', 'Batuque', 'Cesária Évora', 'Traditional Dance', 'Island Culture'],
    communitySize: 8000,
    category: 'music',
    actionLabel: {
      en: 'Listen Now',
      pt: 'Ouvir Agora',
    },
  },
];

/**
 * Carousel configuration presets for different use cases
 */
export const CAROUSEL_PRESETS = {
  featured: {
    itemHeight: 300,
    enableAutoplay: true,
    autoplayDelay: 4000,
    inactiveSlideScale: 0.85,
  },
  compact: {
    itemHeight: 200,
    enableAutoplay: false,
    inactiveSlideScale: 0.9,
  },
  showcase: {
    itemHeight: 350,
    enableAutoplay: true,
    autoplayDelay: 6000,
    enableParallax: true,
    inactiveSlideScale: 0.8,
  },
} as const;