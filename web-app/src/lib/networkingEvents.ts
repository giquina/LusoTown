'use client'

// Portuguese Business Networking Events Service
// Specialized events for Portuguese entrepreneurs and professionals

import { Event } from '@/lib/events'

export interface NetworkingEvent extends Event {
  // Networking-specific fields
  networkingType: NetworkingType
  businessFocus: BusinessFocus[]
  targetAudience: TargetAudience[]
  dresscode: string
  languageOfEvent: 'portuguese' | 'english' | 'bilingual'
  
  // Portuguese Business Context
  partnerOrganizations: PartnerOrganization[]
  sponsorships: BusinessSponsorship[]
  speakerLineup: Speaker[]
  
  // Business Features
  pitchSessions: boolean
  businessCardExchange: boolean
  mentorshipMatchmaking: boolean
  investorPresence: boolean
  
  // Follow-up & Community
  followUpEvents: string[] // Related event IDs
  whatsappGroup?: string
  linkedinGroup?: string
  businessDirectory: boolean // Add attendees to business directory
  
  // Metrics & Success
  businessConnectionsMade: number
  dealsGenerated: number
  followUpMeetings: number
  communityGrowth: number
}

export interface PartnerOrganization {
  id: string
  name: string
  namePortuguese?: string
  type: 'embassy' | 'chamber_commerce' | 'cultural_center' | 'business_association' | 'bank' | 'law_firm'
  website?: string
  representative?: string
  partnershipLevel: 'gold' | 'silver' | 'bronze' | 'supporting'
}

export interface BusinessSponsorship {
  id: string
  businessId: string
  businessName: string
  sponsorshipLevel: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze'
  benefits: string[]
  logoUrl?: string
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  bioPortuguese?: string
  expertise: string[]
  country: string
  imageUrl?: string
  linkedinUrl?: string
  presentationTopic: string
  presentationLanguage: 'portuguese' | 'english' | 'bilingual'
}

export type NetworkingType = 
  | 'breakfast_networking'
  | 'lunch_meeting'
  | 'after_work_drinks'
  | 'weekend_workshop'
  | 'conference'
  | 'panel_discussion'
  | 'pitch_competition'
  | 'mentorship_mixer'
  | 'investor_meetup'
  | 'industry_roundtable'

export type BusinessFocus = 
  | 'startups'
  | 'established_businesses'
  | 'import_export'
  | 'real_estate'
  | 'technology'
  | 'hospitality'
  | 'finance'
  | 'legal_services'
  | 'healthcare'
  | 'education'
  | 'retail'
  | 'construction'
  | 'consulting'
  | 'manufacturing'
  | 'logistics'

export type TargetAudience = 
  | 'entrepreneurs'
  | 'business_owners'
  | 'executives'
  | 'professionals'
  | 'freelancers'
  | 'investors'
  | 'mentors'
  | 'students'
  | 'recent_graduates'

// Portuguese Business Networking Keywords for SEO
export const NETWORKING_SEO_KEYWORDS = [
  // Portuguese
  'networking empresarial português',
  'negócios portugueses Londres',
  'empreendedores portugueses',
  'empresários brasileiros',
  'rede de contactos lusófona',
  'investidores português',
  'startup portuguesa',
  'networking profissional',
  'eventos de negócios',
  'comunidade empresarial',
  
  // English
  'portuguese business networking london',
  'portuguese entrepreneurs london',
  'lusophone business network',
  'brazilian business london',
  'portuguese professionals networking',
  'portuguese startup ecosystem',
  'lusitanian business community',
  'portuguese chamber commerce',
  'portuguese business events',
  'portuguese investment opportunities'
]

// Sample Portuguese Business Networking Events
export const MOCK_NETWORKING_EVENTS: NetworkingEvent[] = [
  {
    // Basic Event Info
    id: 'networking-001',
    title: 'Portuguese Entrepreneurs Breakfast Network',
    description: 'Monthly networking breakfast for Portuguese-speaking entrepreneurs in London. Share experiences, make connections, grow your business.',
    longDescription: 'Join London\'s most active Portuguese business community for our monthly networking breakfast. Connect with fellow entrepreneurs from Portugal, Brazil, Angola, and other Portuguese-speaking countries. This is your opportunity to expand your professional network, share challenges and successes, and discover new business opportunities. We facilitate structured networking, host guest speakers, and provide a platform for meaningful business relationships. Language: Bilingual (Portuguese and English). Dress code: Business casual.',
    date: '2024-02-15',
    time: '08:00',
    endTime: '10:00',
    location: 'Canary Wharf Business Center',
    address: '40 Bank Street, Canary Wharf, London E14 5NR',
    coordinates: { lat: 51.5051, lng: -0.0207 },
    category: 'Business & Professional',
    subcategory: 'Networking',
    tags: ['networking', 'entrepreneurs', 'portuguese', 'business', 'breakfast', 'startups'],
    
    // Host Info
    hostId: 'host-networking-001',
    hostName: 'Portuguese Chamber of Commerce UK',
    hostImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hostBio: 'Supporting Portuguese businesses in the UK since 1995. Connecting entrepreneurs, facilitating trade, and fostering growth.',
    
    // Event Details
    membershipRequired: 'free',
    price: 15,
    currency: 'GBP',
    maxAttendees: 50,
    minAttendees: 15,
    currentAttendees: 32,
    waitlistCount: 8,
    status: 'published',
    featured: true,
    
    // Media
    images: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 24,
    
    // Timestamps
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-25T14:30:00Z',
    
    // Additional Event Fields
    isRecurring: true,
    recurringPattern: { frequency: 'monthly', interval: 1 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible', 'hearing_loop'],
    cancellationPolicy: 'Full refund up to 24 hours before event',
    specialInstructions: 'Please bring business cards and arrive 15 minutes early for registration',
    weatherPolicy: 'Indoor event, unaffected by weather',
    
    // Portuguese Cultural Elements
    culturalTheme: 'Portuguese Business Excellence',
    portugalRegionFocus: ['portugal', 'brazil', 'angola'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 4.5,
    communityImpactScore: 4.8,
    heritagePreservation: true,
    crossCulturalExchange: true,
    
    // Networking-Specific Fields
    networkingType: 'breakfast_networking',
    businessFocus: ['startups', 'established_businesses', 'import_export', 'technology'],
    targetAudience: ['entrepreneurs', 'business_owners', 'professionals'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    
    // Partner Organizations
    partnerOrganizations: [
      {
        id: 'partner-001',
        name: 'Portuguese Embassy Commercial Office',
        namePortuguese: 'Escritório Comercial da Embaixada Portuguesa',
        type: 'embassy',
        website: 'https://comercial.londres.consuladoportugal.mne.gov.pt',
        representative: 'Dr. Carlos Silva',
        partnershipLevel: 'gold'
      },
      {
        id: 'partner-002',
        name: 'UK-Portugal Chamber of Commerce',
        type: 'chamber_commerce',
        website: 'https://uk-portugal.com',
        representative: 'Maria Santos',
        partnershipLevel: 'gold'
      }
    ],
    
    // Sponsorships
    sponsorships: [
      {
        id: 'sponsor-001',
        businessId: 'business-003',
        businessName: 'Lusitânia Travel',
        sponsorshipLevel: 'gold',
        benefits: ['Logo display', 'Speaking opportunity', 'Networking table'],
        logoUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      }
    ],
    
    // Speaker Lineup
    speakerLineup: [
      {
        id: 'speaker-001',
        name: 'Dr. Ana Ferreira',
        title: 'CEO',
        company: 'PortuTech Solutions',
        bio: 'Serial entrepreneur with 15 years of experience building tech companies between London and Lisbon.',
        bioPortuguese: 'Empreendedora em série com 15 anos de experiência criando empresas de tecnologia entre Londres e Lisboa.',
        expertise: ['technology', 'international_expansion', 'venture_capital'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        linkedinUrl: 'https://linkedin.com/in/ana-ferreira-ceo',
        presentationTopic: 'Scaling Portuguese Tech Startups in the UK Market',
        presentationLanguage: 'bilingual'
      }
    ],
    
    // Business Features
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: true,
    
    // Follow-up & Community
    followUpEvents: ['networking-002', 'networking-003'],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-entrepreneurs-london',
    linkedinGroup: 'https://linkedin.com/groups/portuguese-business-london',
    businessDirectory: true,
    
    // Metrics & Success
    businessConnectionsMade: 156,
    dealsGenerated: 12,
    followUpMeetings: 89,
    communityGrowth: 23
  },
  {
    id: 'networking-002',
    title: 'Portuguese-Brazilian Business Summit',
    description: 'Annual summit connecting Portuguese and Brazilian business communities in London. Explore trade opportunities, partnerships, and cultural exchange.',
    longDescription: 'The premier annual event bringing together Portuguese and Brazilian entrepreneurs, investors, and business leaders in London. This full-day summit features keynote presentations, panel discussions, networking sessions, and exhibition opportunities. Focus areas include fintech, renewable energy, tourism, and digital innovation. Simultaneous Portuguese-English translation available for all main sessions.',
    date: '2024-03-22',
    time: '09:00',
    endTime: '18:00',
    location: 'Portuguese Cultural Centre',
    address: '180 High Street, London SE20 7EU',
    coordinates: { lat: 51.4104, lng: -0.0574 },
    category: 'Business & Professional',
    subcategory: 'Conference',
    tags: ['conference', 'summit', 'portuguese', 'brazilian', 'trade', 'partnerships'],
    
    hostId: 'host-networking-002',
    hostName: 'Centro Cultural Português',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hostBio: 'Leading Portuguese cultural institution promoting business, cultural, and educational exchanges.',
    
    membershipRequired: 'core',
    price: 45,
    currency: 'GBP',
    maxAttendees: 200,
    minAttendees: 50,
    currentAttendees: 87,
    waitlistCount: 15,
    status: 'published',
    featured: true,
    
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 67,
    
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-26T16:45:00Z',
    lastActive: '2024-01-26T17:20:00Z',
    
    isRecurring: true,
    recurringPattern: 'yearly',
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible', 'hearing_loop', 'sign_language'],
    cancellationPolicy: 'Full refund up to 7 days before event',
    specialInstructions: 'Bring business cards and company brochures for exhibition table',
    weatherPolicy: 'Indoor event, unaffected by weather',
    
    culturalTheme: 'Lusophone Business Excellence',
    portugalRegionFocus: ['portugal', 'brazil'],
    languageRequirement: 'bilingual_required',
    culturalAuthenticityScore: 4.9,
    communityImpactScore: 4.8,
    heritagePreservation: true,
    crossCulturalExchange: true,
    
    networkingType: 'conference',
    businessFocus: ['established_businesses', 'import_export', 'technology', 'finance'],
    targetAudience: ['entrepreneurs', 'business_owners', 'executives', 'investors'],
    dresscode: 'Business formal',
    languageOfEvent: 'bilingual',
    
    partnerOrganizations: [
      {
        id: 'partner-003',
        name: 'Brazilian Chamber of Commerce',
        namePortuguese: 'Câmara de Comércio Brasileira',
        type: 'chamber_commerce',
        website: 'https://brazilianchamber.org.uk',
        representative: 'Roberto Silva',
        partnershipLevel: 'gold'
      },
      {
        id: 'partner-004',
        name: 'Invest Portugal',
        type: 'embassy',
        website: 'https://investportugal.gov.pt',
        representative: 'Dra. Teresa Costa',
        partnershipLevel: 'gold'
      }
    ],
    
    sponsorships: [
      {
        id: 'sponsor-002',
        businessId: 'business-001',
        businessName: 'Casa do Bacalhau',
        sponsorshipLevel: 'silver',
        benefits: ['Catering partnership', 'Logo display', 'Networking table']
      }
    ],
    
    speakerLineup: [
      {
        id: 'speaker-002',
        name: 'Carlos Moedas',
        title: 'Former EU Commissioner',
        company: 'Mayor of Lisbon',
        bio: 'Former European Commissioner and current Mayor of Lisbon, expert in innovation and digital transformation.',
        bioPortuguese: 'Ex-Comissário Europeu e atual Presidente da Câmara de Lisboa, especialista em inovação e transformação digital.',
        expertise: ['innovation', 'digital_transformation', 'public_policy'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        presentationTopic: 'Digital Innovation: Portugal-UK Partnerships',
        presentationLanguage: 'bilingual'
      },
      {
        id: 'speaker-003',
        name: 'Fernanda Barbosa',
        title: 'CEO',
        company: 'Brasil Fintech Association',
        bio: 'Leading fintech expert connecting Brazilian and European financial innovation.',
        bioPortuguese: 'Especialista líder em fintech conectando inovação financeira brasileira e europeia.',
        expertise: ['fintech', 'financial_services', 'regulatory'],
        country: 'Brazil',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        presentationTopic: 'Fintech Bridges: Brazil-UK Financial Innovation',
        presentationLanguage: 'bilingual'
      }
    ],
    
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: true,
    
    followUpEvents: ['networking-003', 'networking-004'],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-brazilian-summit',
    linkedinGroup: 'https://linkedin.com/groups/luso-brazilian-business',
    businessDirectory: true,
    
    businessConnectionsMade: 234,
    dealsGenerated: 28,
    followUpMeetings: 145,
    communityGrowth: 67
  },
  {
    id: 'networking-003',
    title: 'Portuguese Women in Business Leadership Circle',
    description: 'Exclusive networking circle for Portuguese women business leaders and entrepreneurs in London. Empowerment, mentorship, and strategic partnerships.',
    longDescription: 'An intimate and powerful networking circle designed specifically for Portuguese women who are leading businesses, managing teams, or building startups in London. This monthly gathering focuses on leadership development, strategic partnerships, and creating meaningful support networks. We address unique challenges faced by Portuguese women in business, celebrate successes, and provide mentorship opportunities. Conducted primarily in Portuguese with English support.',
    date: '2024-02-28',
    time: '18:30',
    endTime: '21:00',
    location: 'Kensington Business Club',
    address: '15 Queen\'s Gate, Kensington, London SW7 5LA',
    coordinates: { lat: 51.4987, lng: -0.1749 },
    category: 'Business & Professional',
    subcategory: 'Networking',
    tags: ['women', 'leadership', 'portuguese', 'networking', 'empowerment', 'mentorship'],
    
    hostId: 'host-networking-003',
    hostName: 'Portuguese Women Leaders UK',
    hostImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    hostBio: 'Empowering Portuguese women to excel in business leadership across the UK.',
    
    membershipRequired: 'premium',
    price: 25,
    currency: 'GBP',
    maxAttendees: 30,
    minAttendees: 10,
    currentAttendees: 18,
    waitlistCount: 12,
    status: 'published',
    featured: false,
    
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 15,
    
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-25T11:30:00Z',
    lastActive: '2024-01-26T08:45:00Z',
    
    isRecurring: true,
    recurringPattern: { frequency: 'monthly', interval: 1 },
    ageRestriction: '21+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Professional networking attire. Come prepared to share your business challenges and successes.',
    weatherPolicy: 'Indoor event, unaffected by weather',
    
    culturalTheme: 'Portuguese Women Excellence',
    portugalRegionFocus: ['portugal', 'brazil', 'angola', 'mozambique'],
    languageRequirement: 'portuguese_preferred',
    culturalAuthenticityScore: 4.8,
    communityImpactScore: 4.9,
    heritagePreservation: true,
    crossCulturalExchange: false,
    
    networkingType: 'mentorship_mixer',
    businessFocus: ['startups', 'established_businesses', 'consulting', 'technology'],
    targetAudience: ['entrepreneurs', 'business_owners', 'executives'],
    dresscode: 'Business smart',
    languageOfEvent: 'portuguese',
    
    partnerOrganizations: [
      {
        id: 'partner-005',
        name: 'Women in Business Portugal',
        namePortuguese: 'Mulheres de Negócios Portugal',
        type: 'business_association',
        representative: 'Dra. Isabel Mendes',
        partnershipLevel: 'gold'
      }
    ],
    
    sponsorships: [],
    
    speakerLineup: [
      {
        id: 'speaker-004',
        name: 'Dra. Cristina Fonseca',
        title: 'Venture Capitalist',
        company: 'Indico Capital Partners',
        bio: 'Leading venture capitalist and entrepreneur, co-founder of multiple successful startups.',
        bioPortuguese: 'Capitalista de risco líder e empresária, co-fundadora de várias startups bem-sucedidas.',
        expertise: ['venture_capital', 'startups', 'technology'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        presentationTopic: 'Building Successful Ventures: A Woman\'s Perspective',
        presentationLanguage: 'portuguese'
      }
    ],
    
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-women-leaders',
    businessDirectory: true,
    
    businessConnectionsMade: 78,
    dealsGenerated: 5,
    followUpMeetings: 34,
    communityGrowth: 12
  }
]

export interface NetworkingFilters {
  search?: string
  networkingType?: NetworkingType[]
  businessFocus?: BusinessFocus[]
  targetAudience?: TargetAudience[]
  priceRange?: { min: number; max: number }
  dateRange?: { start: string; end: string }
  languageOfEvent?: 'portuguese' | 'english' | 'bilingual' | 'all'
  partnerOrganizations?: string[]
  pitchSessions?: boolean
  mentorshipMatchmaking?: boolean
  investorPresence?: boolean
  sortBy?: 'date' | 'relevance' | 'price' | 'attendees'
}

export class NetworkingEventsService {
  private static instance: NetworkingEventsService
  private events: NetworkingEvent[] = []

  static getInstance(): NetworkingEventsService {
    if (!NetworkingEventsService.instance) {
      NetworkingEventsService.instance = new NetworkingEventsService()
    }
    return NetworkingEventsService.instance
  }

  constructor() {
    this.loadMockData()
  }

  private loadMockData() {
    this.events = [...MOCK_NETWORKING_EVENTS]
  }

  async searchNetworkingEvents(
    filters: NetworkingFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    events: NetworkingEvent[]
    total: number
    hasMore: boolean
    upcomingEvents: NetworkingEvent[]
    featuredEvents: NetworkingEvent[]
  }> {
    let filteredEvents = [...this.events]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.speakerLineup.some(speaker => 
          speaker.name.toLowerCase().includes(searchLower) ||
          speaker.company.toLowerCase().includes(searchLower)
        )
      )
    }

    if (filters.networkingType && filters.networkingType.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        filters.networkingType!.includes(event.networkingType)
      )
    }

    if (filters.businessFocus && filters.businessFocus.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        event.businessFocus.some(focus => filters.businessFocus!.includes(focus))
      )
    }

    if (filters.targetAudience && filters.targetAudience.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        event.targetAudience.some(audience => filters.targetAudience!.includes(audience))
      )
    }

    if (filters.languageOfEvent && filters.languageOfEvent !== 'all') {
      filteredEvents = filteredEvents.filter(event =>
        event.languageOfEvent === filters.languageOfEvent
      )
    }

    if (filters.priceRange) {
      filteredEvents = filteredEvents.filter(event =>
        event.price >= filters.priceRange!.min && event.price <= filters.priceRange!.max
      )
    }

    if (filters.pitchSessions !== undefined) {
      filteredEvents = filteredEvents.filter(event =>
        event.pitchSessions === filters.pitchSessions
      )
    }

    if (filters.mentorshipMatchmaking !== undefined) {
      filteredEvents = filteredEvents.filter(event =>
        event.mentorshipMatchmaking === filters.mentorshipMatchmaking
      )
    }

    if (filters.investorPresence !== undefined) {
      filteredEvents = filteredEvents.filter(event =>
        event.investorPresence === filters.investorPresence
      )
    }

    // Apply sorting
    this.applyNetworkingSorting(filteredEvents, filters.sortBy || 'date')

    // Get featured and upcoming events
    const featuredEvents = this.events.filter(event => event.featured).slice(0, 3)
    const upcomingEvents = this.events
      .filter(event => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

    return {
      events: paginatedEvents,
      total: filteredEvents.length,
      hasMore: endIndex < filteredEvents.length,
      upcomingEvents,
      featuredEvents
    }
  }

  private applyNetworkingSorting(events: NetworkingEvent[], sortBy: NetworkingFilters['sortBy']) {
    switch (sortBy) {
      case 'price':
        events.sort((a, b) => a.price - b.price)
        break
      case 'attendees':
        events.sort((a, b) => b.currentAttendees - a.currentAttendees)
        break
      case 'relevance':
        events.sort((a, b) => {
          // Sort by business connections made and community growth
          const aScore = a.businessConnectionsMade + a.communityGrowth * 2
          const bScore = b.businessConnectionsMade + b.communityGrowth * 2
          return bScore - aScore
        })
        break
      case 'date':
      default:
        events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
    }
  }

  async getNetworkingEventById(eventId: string): Promise<NetworkingEvent | null> {
    return this.events.find(e => e.id === eventId) || null
  }

  async getUpcomingNetworkingEvents(limit: number = 10): Promise<NetworkingEvent[]> {
    return this.events
      .filter(event => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit)
  }

  async getFeaturedNetworkingEvents(limit: number = 5): Promise<NetworkingEvent[]> {
    return this.events
      .filter(event => event.featured)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, limit)
  }

  async getNetworkingEventsByType(type: NetworkingType, limit: number = 10): Promise<NetworkingEvent[]> {
    return this.events
      .filter(event => event.networkingType === type)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit)
  }

  async getNetworkingStatistics(): Promise<{
    totalEvents: number
    totalConnections: number
    totalDeals: number
    averageRating: number
    topBusinessFocus: { focus: BusinessFocus; count: number }[]
    partnerOrganizations: number
  }> {
    const totalEvents = this.events.length
    const totalConnections = this.events.reduce((sum, event) => sum + event.businessConnectionsMade, 0)
    const totalDeals = this.events.reduce((sum, event) => sum + event.dealsGenerated, 0)
    const averageRating = this.events.reduce((sum, event) => sum + event.averageRating, 0) / totalEvents

    // Calculate top business focus areas
    const focusCount: { [key in BusinessFocus]?: number } = {}
    this.events.forEach(event => {
      event.businessFocus.forEach(focus => {
        focusCount[focus] = (focusCount[focus] || 0) + 1
      })
    })

    const topBusinessFocus = Object.entries(focusCount)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([focus, count]) => ({ focus: focus as BusinessFocus, count: count as number }))

    const uniquePartners = new Set()
    this.events.forEach(event => {
      event.partnerOrganizations.forEach(partner => {
        uniquePartners.add(partner.id)
      })
    })

    return {
      totalEvents,
      totalConnections,
      totalDeals,
      averageRating,
      topBusinessFocus,
      partnerOrganizations: uniquePartners.size
    }
  }
}

export const networkingEventsService = NetworkingEventsService.getInstance()