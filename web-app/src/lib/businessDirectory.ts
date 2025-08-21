import { buildUnsplashUrl } from '@/config';
'use client'

// Portuguese Business Directory Service
// Connects Portuguese-owned businesses with the community

export interface PortugueseBusiness {
  id: string
  name: string
  namePortuguese?: string
  category: BusinessCategory
  description: string
  descriptionPortuguese?: string
  
  // Contact & Location
  address: string
  postcode: string
  phone: string
  email: string
  website?: string
  
  // Portuguese Community Details
  ownerName: string
  ownerRegion: PortugueseRegion
  languagesSpoken: Language[]
  yearEstablished: number
  
  // Verification Status
  verificationStatus: 'pending' | 'verified' | 'rejected'
  verificationDetails: BusinessVerification
  
  // Community Features
  specialOffers?: CommunityOffer[]
  culturalEvents?: BusinessEvent[]
  supportsCulture: boolean // Sponsors Portuguese events, etc.
  
  // Business Info
  openingHours: BusinessHours
  rating: number
  reviewCount: number
  photos: string[]
  
  // SEO & Discovery
  keywords: string[]
  londonArea: LondonArea
  nearbyTransport: string[]
  
  // Community Engagement
  joinedAt: string
  lastUpdated: string
  featuredUntil?: string
  communityBadges: BusinessBadge[]
  
  // Geolocation (optional - can be calculated from address)
  latitude?: number
  longitude?: number
}

export interface BusinessVerification {
  documentsSubmitted: string[] // Business license, Portuguese connection proof
  verifiedBy?: string // Admin ID
  verifiedAt?: string
  verificationNotes?: string
  businessLicense: boolean
  portugueseConnection: boolean // Owner/founder Portuguese heritage
  communityReferences: string[] // Community member references
  physicalLocationVerified: boolean
}

export interface CommunityOffer {
  id: string
  title: string
  titlePortuguese?: string
  description: string
  discount: string // "10% off", "Free appetizer", etc.
  validUntil: string
  membershipRequired: boolean
  specialEventOffer: boolean // For Fado nights, cultural events
}

export interface BusinessEvent {
  id: string
  title: string
  titlePortuguese?: string
  description: string
  date: string
  time: string
  price?: string
  capacity?: number
  registeredAttendees?: number
  eventType: 'cultural' | 'business' | 'social' | 'food' | 'music'
}

export interface BusinessHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  holidays?: string
}

export interface BusinessBadge {
  id: string
  name: string
  namePortuguese: string
  description: string
  icon: string
  color: string
  earnedAt: string
}

export type BusinessCategory = 
  | 'restaurant' 
  | 'cafe'
  | 'grocery'
  | 'bakery'
  | 'services'
  | 'healthcare'
  | 'legal'
  | 'financial'
  | 'real_estate'
  | 'education'
  | 'beauty'
  | 'retail'
  | 'automotive'
  | 'home_services'
  | 'entertainment'
  | 'travel'
  | 'technology'
  | 'consulting'
  | 'cultural_center'

export type PortugueseRegion = 
  | 'portugal_mainland'
  | 'portugal_azores'
  | 'portugal_madeira'
  | 'brazil'
  | 'angola'
  | 'mozambique'
  | 'cape_verde'
  | 'guinea_bissau'
  | 'sao_tome_principe'
  | 'east_timor'
  | 'macau'
  | 'portuguese_diaspora'

export type Language = 'portuguese' | 'english' | 'spanish' | 'french' | 'arabic' | 'swahili' | 'tetum'

export type LondonArea = 
  | 'central_london'
  | 'south_london'
  | 'north_london'
  | 'east_london'
  | 'west_london'
  | 'southeast_london'
  | 'southwest_london'
  | 'northeast_london'
  | 'northwest_london'

// Portuguese business keywords for SEO
export const PORTUGUESE_BUSINESS_KEYWORDS = [
  // Portuguese
  'restaurante português',
  'comida portuguesa',
  'negócio português',
  'comunidade portuguesa',
  'serviços em português',
  'falar português',
  'empresa portuguesa',
  'brasileiros em Londres',
  'lusitanos Londres',
  'Portugal Londres',
  
  // English
  'portuguese restaurant london',
  'portuguese business london',
  'portuguese community london',
  'brazilian business london',
  'lusophone services london',
  'portuguese speaking london',
  'angola business london',
  'mozambique services london',
  'cape verde london',
  'portuguese owned business'
]

// Sample verified Portuguese businesses in London
export const MOCK_PORTUGUESE_BUSINESSES: PortugueseBusiness[] = [
  {
    id: 'business-001',
    name: 'Casa do Bacalhau',
    namePortuguese: 'Casa do Bacalhau - Restaurante Tradicional',
    category: 'restaurant',
    description: 'Authentic Portuguese restaurant serving traditional dishes from all regions of Portugal. Family-owned since 1987, bringing the taste of home to London.',
    descriptionPortuguese: 'Restaurante português autêntico servindo pratos tradicionais de todas as regiões de Portugal. Empresa familiar desde 1987, trazendo o sabor de casa para Londres.',
    
    address: '47 Golborne Road, London',
    postcode: 'W10 5NR',
    phone: '+44 20 8960 5169',
    email: 'info@casadobacalhau.co.uk',
    website: 'https://casadobacalhau.co.uk',
    
    ownerName: 'Manuel Silva',
    ownerRegion: 'portugal_mainland',
    languagesSpoken: ['portuguese', 'english'],
    yearEstablished: 1987,
    
    verificationStatus: 'verified',
    verificationDetails: {
      documentsSubmitted: ['business_license', 'portuguese_passport', 'community_references'],
      verifiedBy: 'admin-001',
      verifiedAt: '2024-01-15T10:00:00Z',
      verificationNotes: 'Well-established Portuguese restaurant with strong community ties',
      businessLicense: true,
      portugueseConnection: true,
      communityReferences: ['user-001', 'user-003'],
      physicalLocationVerified: true
    },
    
    specialOffers: [
      {
        id: 'offer-001',
        title: '10% off for LusoTown members',
        titlePortuguese: '10% desconto para membros da LusoTown',
        description: 'Show your LusoTown membership for 10% off your meal - because family takes care of family',
        discount: '10% off',
        validUntil: '2024-12-31T23:59:59Z',
        membershipRequired: true,
        specialEventOffer: false
      }
    ],
    
    culturalEvents: [
      {
        id: 'event-001',
        title: 'Fado Night',
        titlePortuguese: 'Noite de Fado',
        description: 'Traditional Fado performance every Friday evening',
        date: 'Every Friday',
        time: '20:00',
        price: 'Free with dinner',
        eventType: 'cultural'
      }
    ],
    
    supportsCulture: true,
    
    openingHours: {
      monday: 'Closed',
      tuesday: '12:00-22:00',
      wednesday: '12:00-22:00',
      thursday: '12:00-22:00',
      friday: '12:00-23:00',
      saturday: '12:00-23:00',
      sunday: '12:00-21:00'
    },
    
    rating: 4.7,
    reviewCount: 234,
    photos: [
      buildUnsplashUrl('1414235077428-338989a2e8c0'),
      buildUnsplashUrl('1555396273-367ea4eb4db5')
    ],
    
    keywords: ['portuguese restaurant', 'bacalhau', 'fado', 'traditional portuguese', 'golborne road'],
    londonArea: 'west_london',
    nearbyTransport: ['Ladbroke Grove Station', 'Westbourne Park Station'],
    
    joinedAt: '2024-01-15T10:00:00Z',
    lastUpdated: '2024-01-26T14:30:00Z',
    featuredUntil: '2024-02-28T23:59:59Z',
    
    communityBadges: [
      {
        id: 'badge-founding',
        name: 'Founding Business Partner',
        namePortuguese: 'Parceiro Empresarial Fundador',
        description: 'One of the first businesses to join LusoTown',
        icon: '🏆',
        color: 'gold',
        earnedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'badge-cultural',
        name: 'Cultural Supporter',
        namePortuguese: 'Apoiador Cultural',
        description: 'Actively supports Portuguese cultural events',
        icon: '🎭',
        color: 'purple',
        earnedAt: '2024-01-20T10:00:00Z'
      }
    ]
  },
  {
    id: 'business-002',
    name: 'Pastelaria Ribeiro',
    namePortuguese: 'Pastelaria Ribeiro - Doces e Salgados',
    category: 'bakery',
    description: 'Traditional Portuguese bakery specializing in pastéis de nata, bolo de arroz, and other Portuguese pastries.',
    descriptionPortuguese: 'Pastelaria portuguesa tradicional especializada em pastéis de nata, bolo de arroz e outros doces portugueses.',
    
    address: '56 South Lambeth Road, London',
    postcode: 'SW8 1RL',
    phone: '+44 20 7820 9987',
    email: 'hello@pastelariaribeiro.com',
    website: 'https://pastelariaribeiro.com',
    
    ownerName: 'Maria Ribeiro',
    ownerRegion: 'portugal_mainland',
    languagesSpoken: ['portuguese', 'english'],
    yearEstablished: 2019,
    
    verificationStatus: 'verified',
    verificationDetails: {
      documentsSubmitted: ['business_license', 'portuguese_id', 'community_references'],
      verifiedBy: 'admin-001',
      verifiedAt: '2024-01-18T14:00:00Z',
      verificationNotes: 'Excellent Portuguese bakery with authentic recipes',
      businessLicense: true,
      portugueseConnection: true,
      communityReferences: ['user-002', 'user-004'],
      physicalLocationVerified: true
    },
    
    specialOffers: [
      {
        id: 'offer-002',
        title: 'Free coffee with pastéis de nata',
        titlePortuguese: 'Café grátis com pastéis de nata',
        description: 'Buy 6 pastéis de nata, get a free Portuguese coffee',
        discount: 'Free coffee',
        validUntil: '2024-12-31T23:59:59Z',
        membershipRequired: false,
        specialEventOffer: false
      }
    ],
    
    culturalEvents: [
      {
        id: 'event-002',
        title: 'Portuguese Pastry Workshop',
        titlePortuguese: 'Workshop de Doçaria Portuguesa',
        description: 'Learn to make traditional Portuguese pastries',
        date: 'Every Saturday',
        time: '10:00',
        price: '£35 per person',
        capacity: 8,
        eventType: 'cultural'
      }
    ],
    
    supportsCulture: true,
    
    openingHours: {
      monday: '07:00-18:00',
      tuesday: '07:00-18:00',
      wednesday: '07:00-18:00',
      thursday: '07:00-18:00',
      friday: '07:00-18:00',
      saturday: '08:00-17:00',
      sunday: '08:00-16:00'
    },
    
    rating: 4.9,
    reviewCount: 187,
    photos: [
      buildUnsplashUrl('1509440159596-0249088772ff'),
      buildUnsplashUrl('1578985545062-69928b1d9587')
    ],
    
    keywords: ['pastéis de nata', 'portuguese bakery', 'portuguese pastries', 'bolo de arroz', 'south lambeth'],
    londonArea: 'south_london',
    nearbyTransport: ['Stockwell Station', 'Vauxhall Station'],
    
    joinedAt: '2024-01-18T14:00:00Z',
    lastUpdated: '2024-01-25T11:15:00Z',
    
    communityBadges: [
      {
        id: 'badge-artisan',
        name: 'Master Artisan',
        namePortuguese: 'Mestre Artesão',
        description: 'Exceptional craftsmanship in traditional Portuguese baking',
        icon: '👨‍🍳',
        color: 'orange',
        earnedAt: '2024-01-22T10:00:00Z'
      }
    ]
  },
  {
    id: 'business-003',
    name: 'Lusitânia Travel',
    namePortuguese: 'Lusitânia Travel - Viagens para Portugal',
    category: 'travel',
    description: 'Specialized travel agency for trips to Portugal and Portuguese-speaking countries. Cultural tours and family visits.',
    descriptionPortuguese: 'Agência de viagens especializada em viagens para Portugal e países lusófonos. Tours culturais e visitas familiares.',
    
    address: '123 Harrow Road, London',
    postcode: 'W9 3RE',
    phone: '+44 20 7266 5544',
    email: 'info@lusitaniatravel.co.uk',
    website: 'https://lusitaniatravel.co.uk',
    
    ownerName: 'João Santos',
    ownerRegion: 'portugal_azores',
    languagesSpoken: ['portuguese', 'english'],
    yearEstablished: 2015,
    
    verificationStatus: 'verified',
    verificationDetails: {
      documentsSubmitted: ['business_license', 'travel_license', 'portuguese_passport'],
      verifiedBy: 'admin-002',
      verifiedAt: '2024-01-20T16:00:00Z',
      verificationNotes: 'Licensed travel agency with extensive Portugal expertise',
      businessLicense: true,
      portugueseConnection: true,
      communityReferences: ['user-001', 'user-005'],
      physicalLocationVerified: true
    },
    
    specialOffers: [
      {
        id: 'offer-003',
        title: '15% off family trips to Portugal',
        titlePortuguese: '15% desconto em viagens familiares para Portugal',
        description: 'Special discount for LusoTown families visiting Portugal',
        discount: '15% off',
        validUntil: '2024-12-31T23:59:59Z',
        membershipRequired: true,
        specialEventOffer: false
      }
    ],
    
    culturalEvents: [
      {
        id: 'event-003',
        title: 'Portugal Travel Information Session',
        titlePortuguese: 'Sessão Informativa sobre Viagens a Portugal',
        description: 'Monthly information session about traveling to different regions of Portugal',
        date: 'First Thursday of each month',
        time: '19:00',
        price: 'Free',
        capacity: 20,
        eventType: 'business'
      }
    ],
    
    supportsCulture: true,
    
    openingHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00',
      wednesday: '09:00-18:00',
      thursday: '09:00-19:00',
      friday: '09:00-18:00',
      saturday: '10:00-16:00',
      sunday: 'Closed'
    },
    
    rating: 4.8,
    reviewCount: 156,
    photos: [
      buildUnsplashUrl('1488646953014-85cb44e25828'),
      buildUnsplashUrl('1539650116574-75c0c6d5ce4f')
    ],
    
    keywords: ['portugal travel', 'azores travel', 'portuguese travel agency', 'family trips portugal', 'harrow road'],
    londonArea: 'northwest_london',
    nearbyTransport: ['Warwick Avenue Station', 'Maida Vale Station'],
    
    joinedAt: '2024-01-20T16:00:00Z',
    lastUpdated: '2024-01-24T09:30:00Z',
    
    communityBadges: [
      {
        id: 'badge-trusted',
        name: 'Trusted Partner',
        namePortuguese: 'Parceiro de Confiança',
        description: 'Consistently high-quality service and community support',
        icon: '✅',
        color: 'green',
        earnedAt: '2024-01-24T10:00:00Z'
      }
    ]
  },
  {
    id: 'business-004',
    name: 'Centro Cultural Português',
    namePortuguese: 'Centro Cultural Português de Londres',
    category: 'cultural_center',
    description: 'Portuguese cultural center offering language classes, cultural events, and community services for Portuguese speakers in London.',
    descriptionPortuguese: 'Centro cultural português oferecendo aulas de língua, eventos culturais e serviços comunitários para lusófonos em Londres.',
    
    address: '180 High Street, London',
    postcode: 'SE20 7EU',
    phone: '+44 20 8778 2233',
    email: 'info@centroculturalportugues.org.uk',
    website: 'https://centroculturalportugues.org.uk',
    
    ownerName: 'Dr. Ana Ferreira',
    ownerRegion: 'portugal_mainland',
    languagesSpoken: ['portuguese', 'english'],
    yearEstablished: 1995,
    
    verificationStatus: 'verified',
    verificationDetails: {
      documentsSubmitted: ['charity_registration', 'cultural_license', 'portuguese_embassy_endorsement'],
      verifiedBy: 'admin-003',
      verifiedAt: '2024-01-12T12:00:00Z',
      verificationNotes: 'Official Portuguese cultural center with embassy support',
      businessLicense: true,
      portugueseConnection: true,
      communityReferences: ['user-002', 'user-003', 'user-006'],
      physicalLocationVerified: true
    },
    
    specialOffers: [
      {
        id: 'offer-004',
        title: 'Free Portuguese language assessment',
        titlePortuguese: 'Avaliação gratuita de português',
        description: 'Free language assessment for new LusoTown members',
        discount: 'Free assessment',
        validUntil: '2024-12-31T23:59:59Z',
        membershipRequired: true,
        specialEventOffer: false
      }
    ],
    
    culturalEvents: [
      {
        id: 'event-004',
        title: 'Portuguese Heritage Month Celebration',
        titlePortuguese: 'Celebração do Mês da Herança Portuguesa',
        description: 'Month-long celebration of Portuguese culture, history, and traditions',
        date: 'Throughout June',
        time: 'Various times',
        price: 'Some events free, others £5-15',
        eventType: 'cultural'
      }
    ],
    
    supportsCulture: true,
    
    openingHours: {
      monday: '09:00-21:00',
      tuesday: '09:00-21:00',
      wednesday: '09:00-21:00',
      thursday: '09:00-21:00',
      friday: '09:00-18:00',
      saturday: '10:00-17:00',
      sunday: 'Event days only'
    },
    
    rating: 4.9,
    reviewCount: 312,
    photos: [
      buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
      buildUnsplashUrl('1524995997946-a1c2e315a42f')
    ],
    
    keywords: ['portuguese cultural center', 'portuguese language classes', 'portuguese community', 'cultural events london', 'high street'],
    londonArea: 'southeast_london',
    nearbyTransport: ['Penge East Station', 'Anerley Station'],
    
    joinedAt: '2024-01-12T12:00:00Z',
    lastUpdated: '2024-01-26T16:45:00Z',
    featuredUntil: '2024-03-31T23:59:59Z',
    
    communityBadges: [
      {
        id: 'badge-official',
        name: 'Official Cultural Partner',
        namePortuguese: 'Parceiro Cultural Oficial',
        description: 'Officially recognized Portuguese cultural institution',
        icon: '🏛️',
        color: 'blue',
        earnedAt: '2024-01-12T12:00:00Z'
      },
      {
        id: 'badge-educator',
        name: 'Community Educator',
        namePortuguese: 'Educador Comunitário',
        description: 'Outstanding contribution to Portuguese language education',
        icon: '📚',
        color: 'green',
        earnedAt: '2024-01-15T10:00:00Z'
      }
    ]
  }
]

export interface BusinessFilters {
  search?: string
  category?: BusinessCategory[]
  londonArea?: LondonArea[]
  verificationStatus?: 'verified' | 'all'
  supportsCulture?: boolean
  hasOffers?: boolean
  hasEvents?: boolean
  rating?: number // minimum rating
  ownerRegion?: PortugueseRegion[]
  languageSpoken?: Language[]
  sortBy?: 'newest' | 'rating' | 'alphabetical' | 'distance' | 'featured'
}

export class PortugueseBusinessService {
  private static instance: PortugueseBusinessService
  private businesses: PortugueseBusiness[] = []

  static getInstance(): PortugueseBusinessService {
    if (!PortugueseBusinessService.instance) {
      PortugueseBusinessService.instance = new PortugueseBusinessService()
    }
    return PortugueseBusinessService.instance
  }

  constructor() {
    this.loadMockData()
  }

  private loadMockData() {
    this.businesses = [...MOCK_PORTUGUESE_BUSINESSES]
  }

  async searchBusinesses(
    filters: BusinessFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    businesses: PortugueseBusiness[]
    total: number
    hasMore: boolean
    featuredBusinesses: PortugueseBusiness[]
  }> {
    let filteredBusinesses = [...this.businesses]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.name.toLowerCase().includes(searchLower) ||
        business.namePortuguese?.toLowerCase().includes(searchLower) ||
        business.description.toLowerCase().includes(searchLower) ||
        business.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      )
    }

    if (filters.category && filters.category.length > 0) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        filters.category!.includes(business.category)
      )
    }

    if (filters.londonArea && filters.londonArea.length > 0) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        filters.londonArea!.includes(business.londonArea)
      )
    }

    if (filters.verificationStatus === 'verified') {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.verificationStatus === 'verified'
      )
    }

    if (filters.supportsCulture) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.supportsCulture
      )
    }

    if (filters.hasOffers) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.specialOffers && business.specialOffers.length > 0
      )
    }

    if (filters.hasEvents) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.culturalEvents && business.culturalEvents.length > 0
      )
    }

    if (filters.rating) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        business.rating >= filters.rating!
      )
    }

    if (filters.ownerRegion && filters.ownerRegion.length > 0) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        filters.ownerRegion!.includes(business.ownerRegion)
      )
    }

    if (filters.languageSpoken && filters.languageSpoken.length > 0) {
      filteredBusinesses = filteredBusinesses.filter(business =>
        filters.languageSpoken!.some(lang => business.languagesSpoken.includes(lang))
      )
    }

    // Apply sorting
    this.applyBusinessSorting(filteredBusinesses, filters.sortBy || 'featured')

    // Get featured businesses
    const featuredBusinesses = this.businesses
      .filter(business => business.featuredUntil && new Date(business.featuredUntil) > new Date())
      .slice(0, 3)

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex)

    return {
      businesses: paginatedBusinesses,
      total: filteredBusinesses.length,
      hasMore: endIndex < filteredBusinesses.length,
      featuredBusinesses
    }
  }

  private applyBusinessSorting(businesses: PortugueseBusiness[], sortBy: BusinessFilters['sortBy']) {
    switch (sortBy) {
      case 'rating':
        businesses.sort((a, b) => b.rating - a.rating)
        break
      case 'alphabetical':
        businesses.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        businesses.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
        break
      case 'featured':
      default:
        businesses.sort((a, b) => {
          // Featured businesses first
          const aFeatured = a.featuredUntil && new Date(a.featuredUntil) > new Date()
          const bFeatured = b.featuredUntil && new Date(b.featuredUntil) > new Date()
          
          if (aFeatured && !bFeatured) return -1
          if (!aFeatured && bFeatured) return 1
          
          // Then by rating and review count
          const aScore = a.rating * Math.log(a.reviewCount + 1)
          const bScore = b.rating * Math.log(b.reviewCount + 1)
          return bScore - aScore
        })
        break
    }
  }

  async getBusinessById(businessId: string): Promise<PortugueseBusiness | null> {
    return this.businesses.find(b => b.id === businessId) || null
  }

  async submitBusinessForVerification(businessData: Partial<PortugueseBusiness>): Promise<{ success: boolean; businessId?: string; message: string }> {
    // In a real app, this would save to database and trigger verification process
    const defaults = {
      id: `business-${Date.now()}`,
      verificationStatus: 'pending' as const,
      verificationDetails: {
        documentsSubmitted: [],
        businessLicense: false,
        portugueseConnection: false,
        communityReferences: [],
        physicalLocationVerified: false
      },
      joinedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      communityBadges: [],
      specialOffers: [],
      culturalEvents: [],
      supportsCulture: false,
      rating: 0,
      reviewCount: 0,
      photos: [],
      keywords: []
    }

    const newBusiness: PortugueseBusiness = {
      ...defaults,
      ...businessData as PortugueseBusiness,
      verificationDetails: {
        ...defaults.verificationDetails,
        ...businessData.verificationDetails
      }
    }

    this.businesses.push(newBusiness)

    return {
      success: true,
      businessId: newBusiness.id,
      message: 'Business submitted for verification. You will be contacted within 48 hours.'
    }
  }

  async getBusinessesByCategory(category: BusinessCategory, limit: number = 10): Promise<PortugueseBusiness[]> {
    return this.businesses
      .filter(business => business.category === category && business.verificationStatus === 'verified')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  async getFeaturedBusinesses(limit: number = 6): Promise<PortugueseBusiness[]> {
    return this.businesses
      .filter(business => 
        business.verificationStatus === 'verified' &&
        business.featuredUntil && 
        new Date(business.featuredUntil) > new Date()
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  async getBusinessesWithEvents(): Promise<PortugueseBusiness[]> {
    return this.businesses
      .filter(business => 
        business.verificationStatus === 'verified' &&
        business.culturalEvents && 
        business.culturalEvents.length > 0
      )
      .sort((a, b) => (b.culturalEvents?.length || 0) - (a.culturalEvents?.length || 0))
  }

  async getBusinessesWithOffers(): Promise<PortugueseBusiness[]> {
    return this.businesses
      .filter(business => 
        business.verificationStatus === 'verified' &&
        business.specialOffers && 
        business.specialOffers.length > 0
      )
      .sort((a, b) => (b.specialOffers?.length || 0) - (a.specialOffers?.length || 0))
  }
}

export const portugueseBusinessService = PortugueseBusinessService.getInstance()