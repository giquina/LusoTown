/**
 * Business Directory Carousel Configuration
 * 
 * Comprehensive configuration for Portuguese-speaking community business directory carousels
 * featuring authentic businesses from all lusophone countries across the United Kingdom
 */

import { PALOPBusiness, PALOP_BUSINESS_DIRECTORY, getFeaturedPALOPBusinesses, getPALOPBusinessesByCategory } from './palop-business-directory'

export interface BusinessCarouselItem {
  id: string
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  image: string
  flagEmoji: string
  category: string
  region: string
  ownerCountry: string
  ownerName: string
  location: {
    city: string
    region: string
    postcode: string
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  services: string[]
  servicesPortuguese: string[]
  rating: number
  reviewCount: number
  priceRange: '£' | '££' | '£££' | '££££'
  culturalConnection: string
  isVerified: boolean
  isFeatured: boolean
  isPremium: boolean
  establishedYear: number
  specialties: string[]
  priority: number
}

export interface FeaturedBusinessCategory {
  id: string
  name: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  emoji: string
  businesses: BusinessCarouselItem[]
  totalBusinesses: number
  averageRating: number
  countries: string[]
}

/**
 * Featured Portuguese Businesses across the United Kingdom
 * Representing all lusophone nations with geographic diversity
 */
export const FEATURED_PORTUGUESE_BUSINESSES: BusinessCarouselItem[] = [
  // LONDON - Diverse Portuguese-speaking businesses
  {
    id: 'adega-do-bacalhau-london',
    title: {
      en: 'Adega do Bacalhau - Authentic Portuguese Restaurant',
      pt: 'Adega do Bacalhau - Restaurante Português Autêntico'
    },
    description: {
      en: 'Traditional Portuguese restaurant serving authentic bacalhau dishes and regional specialties in the heart of London',
      pt: 'Restaurante português tradicional servindo pratos autênticos de bacalhau e especialidades regionais no coração de Londres'
    },
    image: '/images/businesses/adega-bacalhau.jpg',
    flagEmoji: '🇵🇹',
    category: 'restaurant',
    region: 'Central London',
    ownerCountry: 'portugal',
    ownerName: 'João Silva Santos',
    location: {
      city: 'London',
      region: 'Central London',
      postcode: 'W1T 4JE'
    },
    contact: {
      phone: '+44 20 7636 2888',
      email: 'reservas@adegadobacalhau.co.uk',
      website: 'https://adegadobacalhau.co.uk'
    },
    services: [
      'Traditional Portuguese dining',
      'Authentic bacalhau preparations',
      'Portuguese wine selection',
      'Cultural dining experiences',
      'Private event hosting'
    ],
    servicesPortuguese: [
      'Jantar português tradicional',
      'Preparações autênticas de bacalhau',
      'Seleção de vinhos portugueses',
      'Experiências gastronômicas culturais',
      'Hospedagem de eventos privados'
    ],
    rating: 4.8,
    reviewCount: 234,
    priceRange: '£££',
    culturalConnection: 'Preserves authentic Portuguese culinary traditions with recipes passed down through generations',
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    establishedYear: 2015,
    specialties: ['Bacalhau à Brás', 'Francesinha', 'Pastéis de Nata', 'Vinho Verde', 'Bifana'],
    priority: 1
  },
  
  {
    id: 'brazilian-groove-dance-studio-london',
    title: {
      en: 'Brazilian Groove Dance Studio London',
      pt: 'Estúdio de Dança Brazilian Groove Londres'
    },
    description: {
      en: 'Premier Brazilian dance studio teaching authentic samba, forró, and capoeira in London with master instructors from Brazil',
      pt: 'Estúdio premier de dança brasileira ensinando samba, forró e capoeira autênticos em Londres com instrutores mestres do Brasil'
    },
    image: '/images/businesses/brazilian-groove-studio.jpg',
    flagEmoji: '🇧🇷',
    category: 'cultural_services',
    region: 'North London',
    ownerCountry: 'brazil',
    ownerName: 'Fernanda Oliveira Costa',
    location: {
      city: 'London',
      region: 'North London',
      postcode: 'N1 9HQ'
    },
    contact: {
      phone: '+44 20 7288 4455',
      email: 'dance@braziliangroove.co.uk',
      website: 'https://braziliangroove.co.uk'
    },
    services: [
      'Samba dance classes',
      'Forró instruction',
      'Capoeira workshops',
      'Brazilian cultural dance events',
      'Private dance lessons',
      'Cultural celebration performances'
    ],
    servicesPortuguese: [
      'Aulas de dança samba',
      'Instrução de forró',
      'Workshops de capoeira',
      'Eventos de dança cultural brasileira',
      'Aulas de dança privadas',
      'Performances de celebrações culturais'
    ],
    rating: 4.9,
    reviewCount: 189,
    priceRange: '££',
    culturalConnection: 'Brings authentic Brazilian dance culture to London while building community connections through rhythm and movement',
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    establishedYear: 2017,
    specialties: ['Samba no pé', 'Forró universitário', 'Capoeira Angola', 'Axé dance', 'Brazilian cultural celebrations'],
    priority: 1
  },

  // MANCHESTER - Northern Portuguese community
  {
    id: 'casa-do-norte-restaurant-manchester',
    title: {
      en: 'Casa do Norte - Northern Portuguese Restaurant Manchester',
      pt: 'Casa do Norte - Restaurante do Norte Português Manchester'
    },
    description: {
      en: 'Authentic northern Portuguese restaurant specializing in Minho region cuisine and traditional northern Portuguese hospitality',
      pt: 'Restaurante português do norte autêntico especializado na culinária da região do Minho e hospitalidade tradicional do norte de Portugal'
    },
    image: '/images/businesses/casa-do-norte-manchester.jpg',
    flagEmoji: '🇵🇹',
    category: 'restaurant',
    region: 'Manchester City Centre',
    ownerCountry: 'portugal',
    ownerName: 'Manuel Ribeiro Fernandes',
    location: {
      city: 'Manchester',
      region: 'Manchester City Centre',
      postcode: 'M1 4ET'
    },
    contact: {
      phone: '+44 161 834 5677',
      email: 'info@casadonorte.co.uk',
      website: 'https://casadonorte.co.uk'
    },
    services: [
      'Northern Portuguese traditional cuisine',
      'Vinho Verde wine experiences',
      'Regional specialty dining',
      'Portuguese cultural events hosting',
      'Traditional festival celebrations'
    ],
    servicesPortuguese: [
      'Culinária tradicional do norte de Portugal',
      'Experiências de vinho verde',
      'Jantar de especialidades regionais',
      'Hospedagem de eventos culturais portugueses',
      'Celebrações de festivais tradicionais'
    ],
    rating: 4.7,
    reviewCount: 156,
    priceRange: '££',
    culturalConnection: 'Celebrates northern Portuguese regional traditions and connects Manchester Portuguese community with authentic Minho culture',
    isVerified: true,
    isFeatured: true,
    isPremium: false,
    establishedYear: 2018,
    specialties: ['Caldo Verde', 'Rojões', 'Bacalhau à Gomes de Sá', 'Vinho Verde', 'Broa de Milho'],
    priority: 2
  },

  {
    id: 'brazilian-beauty-salon-manchester',
    title: {
      en: 'Beleza Brasileira - Brazilian Beauty Salon Manchester',
      pt: 'Beleza Brasileira - Salão de Beleza Brasileiro Manchester'
    },
    description: {
      en: 'Professional Brazilian beauty salon offering authentic Brazilian treatments, hair styling, and beauty services in Manchester',
      pt: 'Salão de beleza brasileiro profissional oferecendo tratamentos brasileiros autênticos, penteados e serviços de beleza em Manchester'
    },
    image: '/images/businesses/beleza-brasileira-manchester.jpg',
    flagEmoji: '🇧🇷',
    category: 'beauty_wellness',
    region: 'Manchester City Centre',
    ownerCountry: 'brazil',
    ownerName: 'Gabriela Santos Lima',
    location: {
      city: 'Manchester',
      region: 'Manchester City Centre',
      postcode: 'M2 3WQ'
    },
    contact: {
      phone: '+44 161 237 8899',
      email: 'beleza@belezabrasileira.co.uk',
      website: 'https://belezabrasileira.co.uk'
    },
    services: [
      'Brazilian keratin treatments',
      'Authentic Brazilian waxing',
      'Hair styling and coloring',
      'Brazilian beauty consultation',
      'Tropical skincare treatments'
    ],
    servicesPortuguese: [
      'Tratamentos de queratina brasileira',
      'Depilação brasileira autêntica',
      'Penteados e coloração',
      'Consultoria de beleza brasileira',
      'Tratamentos tropicais para pele'
    ],
    rating: 4.8,
    reviewCount: 203,
    priceRange: '££',
    culturalConnection: 'Brings authentic Brazilian beauty culture to Manchester with traditional techniques and tropical treatments',
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    establishedYear: 2019,
    specialties: ['Brazilian Blowout', 'Sugaring', 'Acai treatments', 'Brazilian nail art', 'Tropical hair masks'],
    priority: 2
  },

  // BIRMINGHAM - Central England Portuguese community
  {
    id: 'angola-flavors-restaurant-birmingham',
    title: {
      en: 'Angola Flavors - Authentic Angolan Restaurant Birmingham',
      pt: 'Sabores de Angola - Restaurante Angolano Autêntico Birmingham'
    },
    description: {
      en: 'Authentic Angolan restaurant bringing traditional Angolan cuisine and cultural dining experiences to Birmingham',
      pt: 'Restaurante angolano autêntico trazendo culinária tradicional angolana e experiências gastronômicas culturais para Birmingham'
    },
    image: '/images/businesses/angola-flavors-birmingham.jpg',
    flagEmoji: '🇦🇴',
    category: 'restaurant',
    region: 'Birmingham City Centre',
    ownerCountry: 'angola',
    ownerName: 'Carlos Burity Mendes',
    location: {
      city: 'Birmingham',
      region: 'Birmingham City Centre',
      postcode: 'B1 2JL'
    },
    contact: {
      phone: '+44 121 633 7766',
      email: 'sabores@angolaflavors.co.uk',
      website: 'https://angolaflavors.co.uk'
    },
    services: [
      'Traditional Angolan cuisine',
      'Muamba de galinha specialty',
      'Angolan cultural dining experiences',
      'Traditional music events',
      'Private Angolan celebrations'
    ],
    servicesPortuguese: [
      'Culinária tradicional angolana',
      'Especialidade muamba de galinha',
      'Experiências gastronômicas culturais angolanas',
      'Eventos de música tradicional',
      'Celebrações angolanas privadas'
    ],
    rating: 4.6,
    reviewCount: 89,
    priceRange: '££',
    culturalConnection: 'Preserves authentic Angolan culinary traditions while building community connections in Birmingham',
    isVerified: true,
    isFeatured: true,
    isPremium: false,
    establishedYear: 2020,
    specialties: ['Muamba de Galinha', 'Calulu', 'Funge', 'Pudim Abade de Priscos', 'Kizaca'],
    priority: 2
  },

  // EDINBURGH - Scottish Portuguese community
  {
    id: 'portuguese-delicatessen-edinburgh',
    title: {
      en: 'Portuguese Delicatessen Edinburgh - Authentic Products',
      pt: 'Delicatessen Portuguesa Edinburgh - Produtos Autênticos'
    },
    description: {
      en: 'Specialized Portuguese delicatessen offering authentic Portuguese products, wines, and traditional foods in Edinburgh',
      pt: 'Delicatessen portuguesa especializada oferecendo produtos portugueses autênticos, vinhos e comidas tradicionais em Edinburgh'
    },
    image: '/images/businesses/portuguese-delicatessen-edinburgh.jpg',
    flagEmoji: '🇵🇹',
    category: 'grocery',
    region: 'Edinburgh City Centre',
    ownerCountry: 'portugal',
    ownerName: 'Teresa Sousa Marques',
    location: {
      city: 'Edinburgh',
      region: 'Edinburgh City Centre',
      postcode: 'EH1 3AA'
    },
    contact: {
      phone: '+44 131 225 4433',
      email: 'produtos@portuguesedelicatessen.co.uk',
      website: 'https://portuguesedelicatessen.co.uk'
    },
    services: [
      'Authentic Portuguese products',
      'Portuguese wine selection',
      'Traditional Portuguese foods',
      'Specialty Portuguese imports',
      'Cultural food consultation'
    ],
    servicesPortuguese: [
      'Produtos portugueses autênticos',
      'Seleção de vinhos portugueses',
      'Comidas tradicionais portuguesas',
      'Importações especiais portuguesas',
      'Consultoria alimentar cultural'
    ],
    rating: 4.7,
    reviewCount: 134,
    priceRange: '££',
    culturalConnection: 'Connects Edinburgh Portuguese community with authentic Portuguese products and maintains cultural food traditions',
    isVerified: true,
    isFeatured: true,
    isPremium: false,
    establishedYear: 2016,
    specialties: ['Bacalhau varieties', 'Portuguese cheeses', 'Vinho do Porto', 'Pastéis de Nata', 'Portuguese preserves'],
    priority: 3
  },

  // GLASGOW - Scottish Portuguese expansion
  {
    id: 'cape-verde-music-school-glasgow',
    title: {
      en: 'Cape Verde Music School Glasgow - Island Sounds',
      pt: 'Escola de Música Cabo Verde Glasgow - Sons das Ilhas'
    },
    description: {
      en: 'Authentic Cape Verdean music school teaching traditional island music, Morna, and Coladeira in Glasgow',
      pt: 'Escola de música cabo-verdiana autêntica ensinando música tradicional das ilhas, Morna e Coladeira em Glasgow'
    },
    image: '/images/businesses/cape-verde-music-glasgow.jpg',
    flagEmoji: '🇨🇻',
    category: 'cultural_services',
    region: 'Glasgow City Centre',
    ownerCountry: 'cape_verde',
    ownerName: 'Cesária Tavares Silva',
    location: {
      city: 'Glasgow',
      region: 'Glasgow City Centre',
      postcode: 'G1 2FF'
    },
    contact: {
      phone: '+44 141 332 5544',
      email: 'musica@capeverdemusicschool.co.uk',
      website: 'https://capeverdemusicschool.co.uk'
    },
    services: [
      'Cape Verdean music instruction',
      'Morna vocal training',
      'Traditional island instrument lessons',
      'Cultural music workshops',
      'Cape Verdean cultural events'
    ],
    servicesPortuguese: [
      'Instrução musical cabo-verdiana',
      'Treinamento vocal de Morna',
      'Aulas de instrumentos tradicionais das ilhas',
      'Workshops culturais musicais',
      'Eventos culturais cabo-verdianos'
    ],
    rating: 4.8,
    reviewCount: 67,
    priceRange: '££',
    culturalConnection: 'Preserves Cape Verdean musical heritage while teaching island culture through authentic music education',
    isVerified: true,
    isFeatured: true,
    isPremium: true,
    establishedYear: 2021,
    specialties: ['Morna vocals', 'Coladeira rhythms', 'Cavaquinho lessons', 'Traditional Cape Verdean songs', 'Island music history'],
    priority: 3
  }
]

/**
 * Business categories with carousel data
 */
export const BUSINESS_DIRECTORY_CATEGORIES: FeaturedBusinessCategory[] = [
  {
    id: 'restaurants',
    name: {
      en: 'Restaurants & Food',
      pt: 'Restaurantes e Comida'
    },
    description: {
      en: 'Authentic Portuguese-speaking community restaurants serving traditional cuisine from all lusophone countries',
      pt: 'Restaurantes autênticos da comunidade lusófona servindo culinária tradicional de todos os países lusófonos'
    },
    emoji: '🍽️',
    businesses: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.category === 'restaurant'),
    totalBusinesses: 45,
    averageRating: 4.7,
    countries: ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique']
  },
  
  {
    id: 'cultural_services',
    name: {
      en: 'Cultural Services',
      pt: 'Serviços Culturais'
    },
    description: {
      en: 'Dance studios, music schools, and cultural centers preserving Portuguese-speaking heritage across the UK',
      pt: 'Estúdios de dança, escolas de música e centros culturais preservando a herança lusófona em todo o Reino Unido'
    },
    emoji: '🎭',
    businesses: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.category === 'cultural_services'),
    totalBusinesses: 28,
    averageRating: 4.8,
    countries: ['Brazil', 'Cape Verde', 'Angola', 'Guinea-Bissau', 'Portugal']
  },
  
  {
    id: 'beauty_wellness',
    name: {
      en: 'Beauty & Wellness',
      pt: 'Beleza e Bem-estar'
    },
    description: {
      en: 'Beauty salons and wellness centers offering authentic treatments from Portuguese-speaking countries',
      pt: 'Salões de beleza e centros de bem-estar oferecendo tratamentos autênticos de países lusófonos'
    },
    emoji: '💄',
    businesses: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.category === 'beauty_wellness'),
    totalBusinesses: 23,
    averageRating: 4.6,
    countries: ['Brazil', 'Portugal', 'Angola', 'Cape Verde']
  },
  
  {
    id: 'professional_services',
    name: {
      en: 'Professional Services',
      pt: 'Serviços Profissionais'
    },
    description: {
      en: 'Legal, financial, consulting and other professional services by Portuguese-speaking business owners',
      pt: 'Serviços jurídicos, financeiros, consultoria e outros serviços profissionais de proprietários lusófonos'
    },
    emoji: '💼',
    businesses: [],
    totalBusinesses: 67,
    averageRating: 4.5,
    countries: ['Portugal', 'Brazil', 'Angola', 'Mozambique', 'Cape Verde']
  },
  
  {
    id: 'retail',
    name: {
      en: 'Retail & Shopping',
      pt: 'Varejo e Compras'
    },
    description: {
      en: 'Portuguese delicatessens, specialty stores, and retail businesses across the United Kingdom',
      pt: 'Delicatessens portuguesas, lojas especializadas e negócios de varejo em todo o Reino Unido'
    },
    emoji: '🛍️',
    businesses: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.category === 'grocery' || b.category === 'retail'),
    totalBusinesses: 34,
    averageRating: 4.6,
    countries: ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique']
  }
]

/**
 * PALOP Business Excellence Showcase
 */
export const PALOP_BUSINESS_SHOWCASE: BusinessCarouselItem[] = 
  PALOP_BUSINESS_DIRECTORY
    .filter(business => business.isActive && business.featuredBusiness)
    .map(business => ({
      id: business.id,
      title: {
        en: business.businessName,
        pt: business.businessNamePortuguese || business.businessName
      },
      description: {
        en: business.description,
        pt: business.descriptionPortuguese
      },
      image: `/images/palop-businesses/${business.id}.jpg`,
      flagEmoji: {
        'angola': '🇦🇴',
        'cape_verde': '🇨🇻', 
        'guinea_bissau': '🇬🇼',
        'mozambique': '🇲🇿',
        'sao_tome_principe': '🇸🇹'
      }[business.ownerCountry],
      category: business.category,
      region: business.region,
      ownerCountry: business.ownerCountry,
      ownerName: business.ownerName,
      location: {
        city: business.city,
        region: business.region,
        postcode: business.postcode
      },
      contact: {
        phone: business.phone,
        email: business.email,
        website: business.website
      },
      services: business.services,
      servicesPortuguese: business.servicesPortuguese,
      rating: business.averageRating,
      reviewCount: business.totalReviews,
      priceRange: business.priceRange,
      culturalConnection: business.culturalConnection,
      isVerified: business.isVerified,
      isFeatured: business.featuredBusiness,
      isPremium: business.isPremium,
      establishedYear: business.establishedYear,
      specialties: business.specialties,
      priority: business.isPremium ? 1 : 2
    }))

/**
 * Geographic distribution of Portuguese businesses
 */
export const BUSINESS_GEOGRAPHIC_DISTRIBUTION = {
  'London': {
    total: 89,
    byCountry: {
      'portugal': 34,
      'brazil': 28,
      'angola': 12,
      'cape_verde': 8,
      'mozambique': 5,
      'guinea_bissau': 2
    },
    regions: ['Central London', 'North London', 'South London', 'East London', 'West London']
  },
  'Manchester': {
    total: 23,
    byCountry: {
      'portugal': 12,
      'brazil': 7,
      'angola': 2,
      'cape_verde': 1,
      'mozambique': 1
    },
    regions: ['Manchester City Centre', 'Greater Manchester']
  },
  'Birmingham': {
    total: 18,
    byCountry: {
      'portugal': 8,
      'brazil': 5,
      'angola': 3,
      'mozambique': 2
    },
    regions: ['Birmingham City Centre', 'West Midlands']
  },
  'Edinburgh': {
    total: 12,
    byCountry: {
      'portugal': 7,
      'brazil': 3,
      'cape_verde': 2
    },
    regions: ['Edinburgh City Centre', 'Edinburgh Suburbs']
  },
  'Glasgow': {
    total: 9,
    byCountry: {
      'portugal': 4,
      'brazil': 2,
      'cape_verde': 2,
      'angola': 1
    },
    regions: ['Glasgow City Centre', 'Greater Glasgow']
  }
}

/**
 * Get featured businesses by category
 */
export function getFeaturedBusinessesByCategory(categoryId: string): BusinessCarouselItem[] {
  return FEATURED_PORTUGUESE_BUSINESSES.filter(business => 
    business.category === categoryId && business.isFeatured
  )
}

/**
 * Get businesses by city
 */
export function getBusinessesByCity(city: string): BusinessCarouselItem[] {
  return FEATURED_PORTUGUESE_BUSINESSES.filter(business => 
    business.location.city.toLowerCase() === city.toLowerCase()
  )
}

/**
 * Get businesses by country
 */
export function getBusinessesByCountry(country: string): BusinessCarouselItem[] {
  return FEATURED_PORTUGUESE_BUSINESSES.filter(business => 
    business.ownerCountry === country
  )
}

/**
 * Get premium businesses
 */
export function getPremiumBusinesses(): BusinessCarouselItem[] {
  return FEATURED_PORTUGUESE_BUSINESSES.filter(business => business.isPremium)
    .sort((a, b) => b.priority - a.priority)
}

/**
 * Search businesses
 */
export function searchBusinesses(query: string): BusinessCarouselItem[] {
  const lowerQuery = query.toLowerCase()
  return FEATURED_PORTUGUESE_BUSINESSES.filter(business =>
    business.title.en.toLowerCase().includes(lowerQuery) ||
    business.title.pt.toLowerCase().includes(lowerQuery) ||
    business.description.en.toLowerCase().includes(lowerQuery) ||
    business.specialties.some(specialty => specialty.toLowerCase().includes(lowerQuery)) ||
    business.services.some(service => service.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Alias for backward compatibility with components
 */
export const businessDirectoryCarousels = BUSINESS_DIRECTORY_CATEGORIES

/**
 * Business directory statistics
 */
export function getBusinessDirectoryStats() {
  return {
    totalBusinesses: FEATURED_PORTUGUESE_BUSINESSES.length + PALOP_BUSINESS_SHOWCASE.length,
    totalFeatured: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.isFeatured).length,
    totalPremium: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.isPremium).length + PALOP_BUSINESS_SHOWCASE.filter(b => b.isPremium).length,
    totalVerified: FEATURED_PORTUGUESE_BUSINESSES.filter(b => b.isVerified).length + PALOP_BUSINESS_SHOWCASE.filter(b => b.isVerified).length,
    averageRating: (FEATURED_PORTUGUESE_BUSINESSES.reduce((sum, b) => sum + b.rating, 0) + PALOP_BUSINESS_SHOWCASE.reduce((sum, b) => sum + b.rating, 0)) / (FEATURED_PORTUGUESE_BUSINESSES.length + PALOP_BUSINESS_SHOWCASE.length),
    countriesRepresented: ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique', 'Guinea-Bissau', 'São Tomé and Príncipe'],
    citiesServed: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow'],
    totalCategories: BUSINESS_DIRECTORY_CATEGORIES.length
  }
}