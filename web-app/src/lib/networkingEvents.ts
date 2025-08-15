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
  },
  {
    // Tech Event 1: App Development Workshop
    id: 'tech-001',
    title: 'Portuguese Mobile App Development Live Workshop',
    description: 'Learn mobile app development from experienced Portuguese developers. Hands-on coding session with React Native and Flutter.',
    longDescription: 'Join our intensive mobile app development workshop led by successful Portuguese developers working at top UK tech companies. Learn React Native and Flutter through practical projects. Build your first app during the session with live coding, Q&A, and personalized mentorship. Perfect for aspiring developers and entrepreneurs looking to enter the mobile app market. All skill levels welcome - we\'ll provide different tracks for beginners and intermediate developers.',
    date: '2024-03-20',
    time: '18:00',
    endTime: '21:00',
    location: 'TechHub London',
    address: '20 Ropemaker Street, London EC2Y 9AR',
    coordinates: { lat: 51.5188, lng: -0.0973 },
    category: 'Technology & Development',
    subcategory: 'Workshop',
    tags: ['app development', 'react native', 'flutter', 'coding', 'mobile', 'portuguese tech'],
    hostId: 'host-tech-001',
    hostName: 'Portuguese Developers London',
    hostImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    hostBio: 'Community of Portuguese software developers building the future of technology in London.',
    membershipRequired: 'free',
    price: 25,
    currency: 'GBP',
    maxAttendees: 40,
    minAttendees: 10,
    currentAttendees: 28,
    waitlistCount: 5,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 15,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'monthly', interval: 1 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring your laptop with development environment set up. We\'ll provide setup guides.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Tech Innovation',
    portugalRegionFocus: ['portugal', 'brazil'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 4.3,
    communityImpactScore: 4.8,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['technology', 'startups'],
    targetAudience: ['developers', 'entrepreneurs', 'students'],
    dresscode: 'Casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-tech-001',
        name: 'João Pedro Silva',
        title: 'Senior Mobile Developer',
        company: 'Meta London',
        bio: 'Senior mobile developer with 8+ years building apps used by millions. Originally from Porto, now leading mobile teams in London.',
        bioPortuguese: 'Desenvolvedor mobile sénior com mais de 8 anos a construir apps usadas por milhões. Natural do Porto, agora lidera equipas móveis em Londres.',
        expertise: ['react_native', 'flutter', 'mobile_architecture'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'Building Scalable Mobile Apps with React Native',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-developers',
    businessDirectory: true,
    businessConnectionsMade: 45,
    dealsGenerated: 2,
    followUpMeetings: 18,
    communityGrowth: 8
  },
  {
    // Tech Event 2: Website Development Masterclass
    id: 'tech-002',
    title: 'Build Your Business Website - Portuguese Entrepreneur Masterclass',
    description: 'Complete website development masterclass for Portuguese business owners. From design to deployment using modern technologies.',
    longDescription: 'Transform your business idea into a professional website! This comprehensive masterclass is designed specifically for Portuguese entrepreneurs who want to establish their online presence. Learn modern web development using Next.js, design principles, SEO optimization, and deployment strategies. Our experienced instructors will guide you through building a complete business website from scratch. No prior coding experience required - we start from the basics and build up to advanced features.',
    date: '2024-03-25',
    time: '14:00',
    endTime: '18:00',
    location: 'WeWork Aldgate Tower',
    address: '2 Leman Street, London E1 8FA',
    coordinates: { lat: 51.5126, lng: -0.0705 },
    category: 'Technology & Development',
    subcategory: 'Masterclass',
    tags: ['web development', 'nextjs', 'business website', 'seo', 'portuguese entrepreneurs'],
    hostId: 'host-tech-002',
    hostName: 'Portuguese Digital Solutions',
    hostImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    hostBio: 'Empowering Portuguese businesses with cutting-edge digital solutions and web presence.',
    membershipRequired: 'free',
    price: 35,
    currency: 'GBP',
    maxAttendees: 30,
    minAttendees: 8,
    currentAttendees: 22,
    waitlistCount: 3,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 12,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-25T14:30:00Z',
    isRecurring: false,
    recurringPattern: undefined,
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible', 'hearing_loop'],
    cancellationPolicy: 'Full refund up to 72 hours before event',
    specialInstructions: 'Bring laptop and charger. We provide all software licenses and learning materials.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Business Digital Transformation',
    portugalRegionFocus: ['portugal', 'brazil', 'angola'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 4.2,
    communityImpactScore: 4.6,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['technology', 'established_businesses', 'startups'],
    targetAudience: ['business_owners', 'entrepreneurs'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-tech-002',
        name: 'Maria Fernanda Costa',
        title: 'Full-Stack Developer & Business Owner',
        company: 'Costa Digital Agency',
        bio: 'Full-stack developer and successful digital agency owner. Built 200+ websites for Portuguese businesses across Europe.',
        bioPortuguese: 'Desenvolvedora full-stack e proprietária de agência digital bem-sucedida. Construiu mais de 200 websites para empresas portuguesas em toda a Europa.',
        expertise: ['web_development', 'business_strategy', 'digital_marketing'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'From Idea to Online Success: Building Your Business Website',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-web-dev',
    businessDirectory: true,
    businessConnectionsMade: 32,
    dealsGenerated: 4,
    followUpMeetings: 15,
    communityGrowth: 6
  },
  {
    // Tech Event 3: Digital Marketing Workshop
    id: 'tech-003',
    title: 'Digital Marketing Mastery for Portuguese Businesses',
    description: 'Learn advanced digital marketing strategies tailored for Portuguese businesses in the UK market. SEO, social media, and paid advertising.',
    longDescription: 'Master digital marketing specifically designed for Portuguese businesses targeting UK customers. Learn SEO strategies, social media marketing, Google Ads, Facebook advertising, and content marketing. Our expert will share case studies from successful Portuguese businesses and provide hands-on practice with real campaigns. Understand the unique challenges of marketing Portuguese services to UK audiences and how to leverage your cultural advantage.',
    date: '2024-04-10',
    time: '19:00',
    endTime: '22:00',
    location: 'London Business School',
    address: 'Regent\'s Park, London NW1 4SA',
    coordinates: { lat: 51.5252, lng: -0.1580 },
    category: 'Marketing & Growth',
    subcategory: 'Workshop',
    tags: ['digital marketing', 'seo', 'google ads', 'social media', 'portuguese business'],
    hostId: 'host-marketing-001',
    hostName: 'Portuguese Marketing Collective',
    hostImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    hostBio: 'Collective of Portuguese marketing professionals helping businesses grow in international markets.',
    membershipRequired: 'free',
    price: 30,
    currency: 'GBP',
    maxAttendees: 35,
    minAttendees: 12,
    currentAttendees: 31,
    waitlistCount: 7,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 18,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'quarterly', interval: 3 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring your business information and current marketing materials for personalized advice.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Business Global Reach',
    portugalRegionFocus: ['portugal', 'brazil'],
    languageRequirement: 'bilingual_required',
    culturalAuthenticityScore: 4.1,
    communityImpactScore: 4.7,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['technology', 'retail', 'hospitality', 'consulting'],
    targetAudience: ['business_owners', 'marketing_professionals'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-marketing-001',
        name: 'Carlos Miguel Santos',
        title: 'Digital Marketing Director',
        company: 'Google UK',
        bio: 'Senior digital marketing executive at Google with 10+ years helping international businesses scale in the UK market.',
        bioPortuguese: 'Executivo sénior de marketing digital no Google com mais de 10 anos a ajudar empresas internacionais a crescer no mercado britânico.',
        expertise: ['digital_strategy', 'google_ads', 'international_marketing'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'Scaling Portuguese Businesses with Digital Marketing',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-marketing',
    businessDirectory: true,
    businessConnectionsMade: 52,
    dealsGenerated: 6,
    followUpMeetings: 23,
    communityGrowth: 11
  },
  {
    // Tech Event 4: Start Your Own Business Workshop
    id: 'business-001',
    title: 'Start Your Own Business: Portuguese Entrepreneur\'s Guide to UK Success',
    description: 'Complete guide to starting a business in the UK for Portuguese entrepreneurs. Legal requirements, funding, and growth strategies.',
    longDescription: 'Everything you need to know about starting a successful business in the UK as a Portuguese entrepreneur. Learn about legal requirements, business registration, tax implications, funding options, and growth strategies. Our panel of successful Portuguese business owners will share their experiences, challenges, and success stories. Includes practical workshops on business planning, financial projections, and networking strategies. Perfect for aspiring entrepreneurs ready to take the leap.',
    date: '2024-04-15',
    time: '10:00',
    endTime: '16:00',
    location: 'Portuguese Cultural Centre',
    address: '11 Belgrave Square, London SW1X 8PP',
    coordinates: { lat: 51.5001, lng: -0.1537 },
    category: 'Business & Entrepreneurship',
    subcategory: 'Workshop',
    tags: ['start business', 'uk registration', 'funding', 'business plan', 'portuguese entrepreneurs'],
    hostId: 'host-business-001',
    hostName: 'Portuguese Entrepreneurs UK',
    hostImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    hostBio: 'Supporting Portuguese entrepreneurs in building successful businesses across the UK.',
    membershipRequired: 'free',
    price: 45,
    currency: 'GBP',
    maxAttendees: 50,
    minAttendees: 15,
    currentAttendees: 42,
    waitlistCount: 12,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 25,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'bi-monthly', interval: 2 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible', 'hearing_loop'],
    cancellationPolicy: 'Full refund up to 7 days before event',
    specialInstructions: 'Bring your business ideas, notebook, and any existing business plans for feedback.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Entrepreneurial Spirit',
    portugalRegionFocus: ['portugal', 'brazil', 'angola'],
    languageRequirement: 'bilingual_required',
    culturalAuthenticityScore: 4.8,
    communityImpactScore: 4.9,
    heritagePreservation: true,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['startups', 'consulting', 'import_export', 'retail'],
    targetAudience: ['aspiring_entrepreneurs', 'early_stage_founders'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [
      {
        id: 'partner-business-001',
        name: 'Portuguese Chamber of Commerce UK',
        type: 'chamber_commerce',
        website: 'https://uk-portugal.com',
        representative: 'Dr. Ana Silva',
        partnershipLevel: 'gold'
      }
    ],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-business-001',
        name: 'Ricardo Oliveira',
        title: 'Serial Entrepreneur & Investor',
        company: 'Oliveira Ventures',
        bio: 'Portuguese serial entrepreneur who built and sold 3 successful companies in the UK. Now mentors and invests in Portuguese startups.',
        bioPortuguese: 'Empresário em série português que construiu e vendeu 3 empresas bem-sucedidas no Reino Unido. Agora mentoriza e investe em startups portuguesas.',
        expertise: ['business_strategy', 'fundraising', 'scaling'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'From Idea to Exit: Building Successful Businesses in the UK',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: true,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-entrepreneurs',
    businessDirectory: true,
    businessConnectionsMade: 67,
    dealsGenerated: 8,
    followUpMeetings: 34,
    communityGrowth: 15
  },
  {
    // Tech Event 5: Data Science & AI Workshop
    id: 'tech-004',
    title: 'Data Science & AI for Portuguese Business Innovation',
    description: 'Learn how to leverage data science and artificial intelligence in your business. Hands-on workshop with real Portuguese business case studies.',
    longDescription: 'Discover the power of data science and AI for Portuguese businesses. This intensive workshop covers machine learning fundamentals, data analysis techniques, and practical AI implementations. Learn how successful Portuguese companies are using AI to improve operations, customer service, and decision-making. Includes hands-on coding sessions with Python, data visualization, and building your first AI model. No prior experience required - we\'ll guide you from basics to practical applications.',
    date: '2024-05-08',
    time: '18:30',
    endTime: '21:30',
    location: 'Imperial College London',
    address: 'South Kensington Campus, London SW7 2AZ',
    coordinates: { lat: 51.4988, lng: -0.1749 },
    category: 'Technology & Innovation',
    subcategory: 'Workshop',
    tags: ['data science', 'artificial intelligence', 'machine learning', 'python', 'business innovation'],
    hostId: 'host-ai-001',
    hostName: 'Portuguese AI & Data Society',
    hostImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    hostBio: 'Community of Portuguese data scientists and AI researchers advancing technology innovation.',
    membershipRequired: 'free',
    price: 40,
    currency: 'GBP',
    maxAttendees: 25,
    minAttendees: 10,
    currentAttendees: 21,
    waitlistCount: 6,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 8,
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-05T14:30:00Z',
    isRecurring: false,
    recurringPattern: undefined,
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring laptop with Python installed. We\'ll provide installation guides and datasets.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Innovation Excellence',
    portugalRegionFocus: ['portugal'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 3.9,
    communityImpactScore: 4.5,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['technology', 'consulting', 'finance'],
    targetAudience: ['tech_professionals', 'business_analysts', 'entrepreneurs'],
    dresscode: 'Casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-ai-001',
        name: 'Dr. Sofia Pereira',
        title: 'Senior Data Scientist',
        company: 'DeepMind',
        bio: 'PhD in Machine Learning, senior data scientist at DeepMind working on AI for business applications.',
        bioPortuguese: 'Doutoramento em Machine Learning, cientista de dados sénior na DeepMind a trabalhar em IA para aplicações empresariais.',
        expertise: ['machine_learning', 'ai_strategy', 'business_applications'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'AI-Powered Business Transformation for SMEs',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-ai-data',
    businessDirectory: true,
    businessConnectionsMade: 28,
    dealsGenerated: 3,
    followUpMeetings: 12,
    communityGrowth: 5
  },
  {
    // Tech Event 6: E-commerce & Online Business
    id: 'ecommerce-001',
    title: 'Build Your E-commerce Empire: Portuguese Products in UK Markets',
    description: 'Complete guide to launching and scaling e-commerce businesses selling Portuguese products in the UK. From Shopify to Amazon FBA.',
    longDescription: 'Master e-commerce selling Portuguese products to UK customers. Learn platform selection (Shopify, Amazon, eBay), product sourcing from Portugal, logistics, customs, marketing, and scaling strategies. Our expert panel includes successful Portuguese e-commerce entrepreneurs who will share their journey from startup to 6-figure revenues. Includes hands-on workshops on setting up your first online store, product photography, and digital marketing for e-commerce.',
    date: '2024-05-20',
    time: '13:00',
    endTime: '17:00',
    location: 'Shopify London Office',
    address: '77-79 Leadenhall Street, London EC3A 3DE',
    coordinates: { lat: 51.5136, lng: -0.0826 },
    category: 'E-commerce & Retail',
    subcategory: 'Workshop',
    tags: ['ecommerce', 'shopify', 'amazon fba', 'portuguese products', 'online business'],
    hostId: 'host-ecommerce-001',
    hostName: 'Portuguese E-commerce Collective',
    hostImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    hostBio: 'Network of Portuguese e-commerce entrepreneurs building successful online businesses in the UK.',
    membershipRequired: 'free',
    price: 50,
    currency: 'GBP',
    maxAttendees: 30,
    minAttendees: 12,
    currentAttendees: 26,
    waitlistCount: 8,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 14,
    createdAt: '2024-04-10T10:00:00Z',
    updatedAt: '2024-04-15T14:30:00Z',
    isRecurring: false,
    recurringPattern: undefined,
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 5 days before event',
    specialInstructions: 'Bring your product ideas and any existing business materials. Laptop recommended.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Products Global Reach',
    portugalRegionFocus: ['portugal', 'azores', 'madeira'],
    languageRequirement: 'bilingual_required',
    culturalAuthenticityScore: 4.7,
    communityImpactScore: 4.6,
    heritagePreservation: true,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['retail', 'import_export', 'startups'],
    targetAudience: ['aspiring_entrepreneurs', 'product_owners'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-ecommerce-001',
        name: 'Ana Rita Mendes',
        title: 'E-commerce Entrepreneur',
        company: 'Portuguese Delights UK',
        bio: 'Built a £2M e-commerce business selling Portuguese food and crafts online. Expert in Amazon FBA and international shipping.',
        bioPortuguese: 'Construiu um negócio de e-commerce de £2M vendendo comida e artesanato português online. Especialista em Amazon FBA e envios internacionais.',
        expertise: ['ecommerce_strategy', 'amazon_fba', 'product_sourcing'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'From Zero to £2M: Building a Portuguese Products Empire',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-ecommerce',
    businessDirectory: true,
    businessConnectionsMade: 41,
    dealsGenerated: 7,
    followUpMeetings: 19,
    communityGrowth: 9
  },
  {
    // Tech Event 7: Fintech & Cryptocurrency
    id: 'fintech-001',
    title: 'Fintech Innovation: Portuguese Perspective on Digital Finance',
    description: 'Explore fintech trends, cryptocurrency, and digital banking from a Portuguese business perspective. Expert insights and networking.',
    longDescription: 'Deep dive into the fintech revolution with a focus on opportunities for Portuguese businesses and individuals. Learn about cryptocurrency investing, digital banking solutions, payment processing, and fintech startups. Our panel includes Portuguese fintech entrepreneurs, blockchain developers, and financial advisors. Discover how fintech can streamline your business operations and personal finances. Includes practical sessions on crypto trading, digital wallets, and fintech tools for small businesses.',
    date: '2024-06-05',
    time: '18:00',
    endTime: '21:00',
    location: 'Level39 Canary Wharf',
    address: 'One Canada Square, Level 39, London E14 5AB',
    coordinates: { lat: 51.5048, lng: -0.0195 },
    category: 'Finance & Technology',
    subcategory: 'Panel Discussion',
    tags: ['fintech', 'cryptocurrency', 'blockchain', 'digital banking', 'investment'],
    hostId: 'host-fintech-001',
    hostName: 'Portuguese Fintech Forum',
    hostImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    hostBio: 'Forum for Portuguese professionals working in financial technology and innovation.',
    membershipRequired: 'free',
    price: 35,
    currency: 'GBP',
    maxAttendees: 40,
    minAttendees: 15,
    currentAttendees: 33,
    waitlistCount: 9,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.5,
    totalReviews: 11,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-05T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'quarterly', interval: 3 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring questions about fintech and digital finance. Networking encouraged.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Financial Innovation',
    portugalRegionFocus: ['portugal'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 3.8,
    communityImpactScore: 4.3,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'panel_discussion',
    businessFocus: ['finance', 'technology', 'startups'],
    targetAudience: ['finance_professionals', 'entrepreneurs', 'investors'],
    dresscode: 'Business professional',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-fintech-001',
        name: 'Miguel Fernandes',
        title: 'Head of Blockchain',
        company: 'Revolut',
        bio: 'Leading blockchain innovation at Revolut. Former investment banker with deep expertise in cryptocurrency and digital assets.',
        bioPortuguese: 'Liderando inovação blockchain na Revolut. Ex-banqueiro de investimento com profunda expertise em criptomoeda e ativos digitais.',
        expertise: ['blockchain', 'cryptocurrency', 'digital_banking'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'The Future of Digital Finance: A Portuguese Perspective',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: true,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-fintech',
    businessDirectory: true,
    businessConnectionsMade: 37,
    dealsGenerated: 4,
    followUpMeetings: 16,
    communityGrowth: 7
  },
  {
    // Tech Event 8: SaaS & Cloud Computing
    id: 'saas-001',
    title: 'Building SaaS Products: Portuguese Developers Masterclass',
    description: 'Learn to build and scale Software-as-a-Service products. From MVP to enterprise solutions with cloud technologies.',
    longDescription: 'Comprehensive masterclass on building SaaS products from Portuguese developers who have successfully launched and scaled software businesses. Learn cloud architecture, subscription models, customer acquisition, and technical scaling strategies. Covers AWS/Azure deployment, database design, API development, and SaaS metrics. Perfect for developers wanting to transition into product development or entrepreneurs planning to build SaaS businesses. Includes hands-on coding sessions and real-world case studies.',
    date: '2024-06-18',
    time: '14:00',
    endTime: '18:00',
    location: 'AWS London Office',
    address: '60 Holborn Viaduct, London EC1A 2FD',
    coordinates: { lat: 51.5175, lng: -0.1065 },
    category: 'Technology & Development',
    subcategory: 'Masterclass',
    tags: ['saas', 'cloud computing', 'aws', 'software development', 'subscription business'],
    hostId: 'host-saas-001',
    hostName: 'Portuguese SaaS Builders',
    hostImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    hostBio: 'Community of Portuguese developers and entrepreneurs building successful SaaS products.',
    membershipRequired: 'free',
    price: 55,
    currency: 'GBP',
    maxAttendees: 25,
    minAttendees: 10,
    currentAttendees: 19,
    waitlistCount: 4,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 9,
    createdAt: '2024-05-10T10:00:00Z',
    updatedAt: '2024-05-15T14:30:00Z',
    isRecurring: false,
    recurringPattern: undefined,
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 72 hours before event',
    specialInstructions: 'Programming experience required. Bring laptop with development environment set up.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Tech Entrepreneurship',
    portugalRegionFocus: ['portugal'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 3.7,
    communityImpactScore: 4.4,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['technology', 'startups'],
    targetAudience: ['developers', 'tech_entrepreneurs'],
    dresscode: 'Casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-saas-001',
        name: 'Pedro Silva',
        title: 'CTO & Co-founder',
        company: 'CloudFlow SaaS',
        bio: 'Built and scaled a SaaS platform to 10,000+ customers. Expert in cloud architecture and subscription business models.',
        bioPortuguese: 'Construiu e escalou uma plataforma SaaS para mais de 10.000 clientes. Especialista em arquitetura cloud e modelos de negócio de subscrição.',
        expertise: ['saas_architecture', 'cloud_computing', 'scaling'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'From Idea to 10K Users: Scaling SaaS Products',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-saas',
    businessDirectory: true,
    businessConnectionsMade: 24,
    dealsGenerated: 2,
    followUpMeetings: 11,
    communityGrowth: 4
  },
  {
    // Tech Event 9: Cybersecurity Workshop
    id: 'cybersec-001',
    title: 'Cybersecurity Essentials for Portuguese Small Businesses',
    description: 'Protect your business from cyber threats. Practical cybersecurity workshop covering threat prevention, data protection, and compliance.',
    longDescription: 'Essential cybersecurity training designed specifically for Portuguese small businesses operating in the UK. Learn to identify and prevent cyber threats, implement data protection measures, and ensure GDPR compliance. Our expert will cover password management, phishing prevention, backup strategies, and incident response. Includes hands-on exercises with security tools and real case studies of cyber attacks on small businesses. Perfect for business owners and managers who want to protect their operations.',
    date: '2024-07-10',
    time: '19:00',
    endTime: '22:00',
    location: 'Cyber Security Skills Centre',
    address: '1 Fore Street, London EC2Y 9DT',
    coordinates: { lat: 51.5179, lng: -0.0912 },
    category: 'Technology & Security',
    subcategory: 'Workshop',
    tags: ['cybersecurity', 'data protection', 'gdpr', 'business security', 'threat prevention'],
    hostId: 'host-cybersec-001',
    hostName: 'Portuguese Cyber Defense Group',
    hostImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop',
    hostBio: 'Group of Portuguese cybersecurity professionals protecting businesses from digital threats.',
    membershipRequired: 'free',
    price: 25,
    currency: 'GBP',
    maxAttendees: 30,
    minAttendees: 12,
    currentAttendees: 24,
    waitlistCount: 6,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 13,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-05T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'quarterly', interval: 3 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring your business devices for security assessment. No technical background required.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Business Protection',
    portugalRegionFocus: ['portugal', 'brazil'],
    languageRequirement: 'bilingual_required',
    culturalAuthenticityScore: 3.9,
    communityImpactScore: 4.5,
    heritagePreservation: false,
    crossCulturalExchange: true,
    networkingType: 'workshop',
    businessFocus: ['established_businesses', 'consulting', 'retail'],
    targetAudience: ['business_owners', 'managers'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-cybersec-001',
        name: 'Luís Campos',
        title: 'Senior Cybersecurity Consultant',
        company: 'SecureGuard UK',
        bio: 'Cybersecurity expert with 12+ years protecting small and medium businesses from cyber threats.',
        bioPortuguese: 'Especialista em cibersegurança com mais de 12 anos a proteger pequenas e médias empresas de ameaças cibernéticas.',
        expertise: ['threat_prevention', 'gdpr_compliance', 'incident_response'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'Cybersecurity Best Practices for Small Businesses',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: false,
    businessCardExchange: true,
    mentorshipMatchmaking: false,
    investorPresence: false,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-cybersec',
    businessDirectory: true,
    businessConnectionsMade: 29,
    dealsGenerated: 1,
    followUpMeetings: 8,
    communityGrowth: 5
  },
  {
    // Tech Event 10: Green Tech & Sustainability
    id: 'greentech-001',
    title: 'Green Technology & Sustainable Business: Portuguese Innovation for Climate Action',
    description: 'Explore green technology solutions and sustainable business practices. Learn how Portuguese companies are leading climate innovation.',
    longDescription: 'Join Portuguese entrepreneurs and innovators leading the green technology revolution. Discover sustainable business practices, renewable energy solutions, and climate-friendly innovations. Learn how Portuguese companies are developing cutting-edge green technologies and building sustainable businesses. Includes presentations on solar energy, waste reduction, sustainable manufacturing, and green finance. Perfect for entrepreneurs interested in climate action and sustainable business models. Network with like-minded individuals building the future of green business.',
    date: '2024-07-25',
    time: '18:00',
    endTime: '21:00',
    location: 'Greentech Hub London',
    address: '30 Great Guildford Street, London SE1 0HS',
    coordinates: { lat: 51.5016, lng: -0.0960 },
    category: 'Sustainability & Innovation',
    subcategory: 'Panel Discussion',
    tags: ['green technology', 'sustainability', 'climate action', 'renewable energy', 'eco innovation'],
    hostId: 'host-greentech-001',
    hostName: 'Portuguese Green Innovation Network',
    hostImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop',
    hostBio: 'Network of Portuguese professionals and entrepreneurs driving sustainable innovation and green technology.',
    membershipRequired: 'free',
    price: 20,
    currency: 'GBP',
    maxAttendees: 45,
    minAttendees: 15,
    currentAttendees: 38,
    waitlistCount: 11,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 16,
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-06-20T14:30:00Z',
    isRecurring: true,
    recurringPattern: { frequency: 'bi-monthly', interval: 2 },
    ageRestriction: '18+',
    accessibility: ['wheelchair_accessible', 'hearing_loop'],
    cancellationPolicy: 'Full refund up to 48 hours before event',
    specialInstructions: 'Bring your green business ideas and sustainability questions for the panel discussion.',
    weatherPolicy: 'Indoor event',
    culturalTheme: 'Portuguese Environmental Leadership',
    portugalRegionFocus: ['portugal', 'azores'],
    languageRequirement: 'bilingual_preferred',
    culturalAuthenticityScore: 4.2,
    communityImpactScore: 4.7,
    heritagePreservation: true,
    crossCulturalExchange: true,
    networkingType: 'panel_discussion',
    businessFocus: ['technology', 'manufacturing', 'consulting'],
    targetAudience: ['entrepreneurs', 'sustainability_professionals', 'innovators'],
    dresscode: 'Business casual',
    languageOfEvent: 'bilingual',
    partnerOrganizations: [],
    sponsorships: [],
    speakerLineup: [
      {
        id: 'speaker-greentech-001',
        name: 'Catarina Santos',
        title: 'CEO & Founder',
        company: 'EcoTech Solutions Portugal',
        bio: 'Leading green technology entrepreneur developing renewable energy solutions. Champion of sustainable business practices.',
        bioPortuguese: 'Empresária líder em tecnologia verde desenvolvendo soluções de energia renovável. Defensora de práticas empresariais sustentáveis.',
        expertise: ['renewable_energy', 'sustainable_business', 'climate_action'],
        country: 'Portugal',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        presentationTopic: 'Building Profitable Green Businesses: Lessons from Portugal',
        presentationLanguage: 'bilingual'
      }
    ],
    pitchSessions: true,
    businessCardExchange: true,
    mentorshipMatchmaking: true,
    investorPresence: true,
    followUpEvents: [],
    whatsappGroup: 'https://chat.whatsapp.com/portuguese-greentech',
    businessDirectory: true,
    businessConnectionsMade: 51,
    dealsGenerated: 6,
    followUpMeetings: 22,
    communityGrowth: 13
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