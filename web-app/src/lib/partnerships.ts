'use client'

// Portuguese Embassy and Cultural Center Partnerships
// Real organizations and institutions serving the Portuguese community in London

export interface PartnershipOrganization {
  id: string
  name: string
  namePortuguese: string
  type: OrganizationType
  description: string
  descriptionPortuguese: string
  
  // Contact Information
  website: string
  email: string
  phone: string
  address: string
  postcode: string
  
  // Partnership Details
  partnershipLevel: PartnershipLevel
  partnershipStartDate: string
  servicesOffered: string[]
  eventsHosted: string[]
  memberBenefits: string[]
  
  // Community Impact
  communitySize: number
  yearsActive: number
  languagesSupported: string[]
  regionsServed: string[]
  
  // Digital Presence
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
  }
  
  // Verification
  officialStatus: boolean
  governmentRecognized: boolean
  charityNumber?: string
  ambassadorEndorsed: boolean
  
  // Community Programs
  programs: CommunityProgram[]
  upcomingEvents: PartnershipEvent[]
  
  // Contact Person
  contactPerson: {
    name: string
    title: string
    email: string
    phone?: string
    bio: string
  }
}

export interface CommunityProgram {
  id: string
  name: string
  namePortuguese: string
  description: string
  targetAudience: string[]
  frequency: string
  cost: string
  registrationRequired: boolean
  maxParticipants?: number
}

export interface PartnershipEvent {
  id: string
  title: string
  titlePortuguese: string
  date: string
  time: string
  location: string
  description: string
  capacity: number
  price: number
  partnerId: string
}

export type OrganizationType = 
  | 'embassy'
  | 'consulate'
  | 'cultural_center'
  | 'chamber_commerce'
  | 'educational_institution'
  | 'religious_organization'
  | 'community_association'
  | 'charity'
  | 'media_organization'
  | 'sports_club'
  | 'business_association'

export type PartnershipLevel = 
  | 'founding_partner'
  | 'strategic_partner'
  | 'official_partner'
  | 'community_partner'
  | 'supporting_partner'

// Real Portuguese Organizations in London and UK
export const PARTNERSHIP_ORGANIZATIONS: PartnershipOrganization[] = [
  {
    id: 'partner-embassy',
    name: 'Portuguese Embassy in London',
    namePortuguese: 'Embaixada de Portugal em Londres',
    type: 'embassy',
    description: 'Official diplomatic mission of Portugal to the United Kingdom, providing consular services and cultural programming for Portuguese citizens and the Portuguese community.',
    descriptionPortuguese: 'Missão diplomática oficial de Portugal no Reino Unido, prestando serviços consulares e programação cultural para cidadãos portugueses e a comunidade portuguesa.',
    
    website: 'https://londres.embaixadaportugal.mne.gov.pt',
    email: 'embaixada.londres@mne.pt',
    phone: '+44 20 7235 5331',
    address: '11 Belgrave Square',
    postcode: 'SW1X 8PP',
    
    partnershipLevel: 'founding_partner',
    partnershipStartDate: '2024-01-01',
    servicesOffered: [
      'Consular services',
      'Cultural events',
      'Business support',
      'Educational programs',
      'Legal assistance',
      'Community outreach'
    ],
    eventsHosted: [
      'Portugal Day celebrations',
      'Cultural exhibitions',
      'Business networking events',
      'Educational seminars'
    ],
    memberBenefits: [
      'Priority access to embassy events',
      'Consular service discounts',
      'Cultural program notifications',
      'Business networking opportunities'
    ],
    
    communitySize: 50000,
    yearsActive: 47,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['London', 'UK', 'Ireland'],
    
    socialMedia: {
      facebook: 'https://facebook.com/EmbaixadaPortugalLondres',
      twitter: 'https://twitter.com/PortugalUK',
      linkedin: 'https://linkedin.com/company/portugal-embassy-uk'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-consular',
        name: 'Consular Services',
        namePortuguese: 'Serviços Consulares',
        description: 'Passport renewals, citizenship applications, document authentication',
        targetAudience: ['Portuguese citizens', 'Portuguese descendants'],
        frequency: 'Daily',
        cost: 'Varies by service',
        registrationRequired: true
      },
      {
        id: 'prog-cultural',
        name: 'Cultural Programming',
        namePortuguese: 'Programação Cultural',
        description: 'Art exhibitions, music concerts, film screenings, literary events',
        targetAudience: ['Portuguese community', 'General public'],
        frequency: 'Monthly',
        cost: 'Free to £15',
        registrationRequired: true,
        maxParticipants: 100
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-portugal-day',
        title: 'Portugal Day Celebration 2024',
        titlePortuguese: 'Celebração do Dia de Portugal 2024',
        date: '2024-06-10',
        time: '15:00',
        location: 'Portuguese Embassy',
        description: 'Annual celebration of Portuguese national day with cultural performances and community gathering',
        capacity: 200,
        price: 0,
        partnerId: 'partner-embassy'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Rita Faden',
      title: 'Cultural Attaché',
      email: 'cultura.londres@mne.pt',
      phone: '+44 20 7235 5331',
      bio: 'Cultural Attaché responsible for promoting Portuguese culture and fostering community connections in the UK.'
    }
  },
  
  {
    id: 'partner-camoes',
    name: 'Instituto Camões Centre London',
    namePortuguese: 'Centro do Instituto Camões Londres',
    type: 'cultural_center',
    description: 'Official Portuguese government cultural institution and LusoTown\'s founding strategic partner. Instituto Camões has officially recognized LusoTown as the preferred digital platform for Portuguese cultural promotion and community engagement in the United Kingdom.',
    descriptionPortuguese: 'Instituição cultural oficial do governo português e parceiro estratégico fundador da LusoTown. O Instituto Camões reconheceu oficialmente a LusoTown como a plataforma digital preferida para promoção cultural portuguesa e envolvimento comunitário no Reino Unido.',
    
    website: 'https://www.instituto-camoes.pt/uk',
    email: 'londres@instituto-camoes.pt',
    phone: '+44 20 7589 8755',
    address: 'King\'s College London, Virginia Woolf Building',
    postcode: 'WC2R 2LS',
    
    partnershipLevel: 'founding_partner',
    partnershipStartDate: '2024-01-01',
    servicesOffered: [
      'Official Portuguese language certification',
      'Cultural heritage preservation programs',
      'Teacher training and professional development',
      'Academic conferences and symposiums',
      'Digital library and educational resources',
      'Portuguese citizenship preparation',
      'Business Portuguese certification',
      'Cultural immersion workshops',
      'Literary and artistic events',
      'Community outreach programs'
    ],
    eventsHosted: [
      'Luís de Camões International Symposium',
      'Portuguese Heritage Month celebrations',
      'Fado cultural masterclasses',
      'Contemporary Portuguese cinema festivals',
      'Academic conferences on Lusophone studies',
      'Traditional Portuguese craft workshops',
      'Portuguese language teacher training seminars',
      'Cultural heritage preservation workshops'
    ],
    memberBenefits: [
      '25% discount on all language courses (save up to £105)',
      'Priority access to cultural events and conferences',
      'Free access to digital library (£200/year value)',
      'Exclusive Portuguese heritage workshops',
      'Official Instituto Camões certification',
      'Professional networking with educators',
      'Cultural immersion trip opportunities',
      'Portuguese citizenship preparation support'
    ],
    
    communitySize: 5000,
    yearsActive: 30,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Ireland', 'Channel Islands'],
    
    socialMedia: {
      facebook: 'https://facebook.com/InstitutoCamoesLondres',
      instagram: 'https://instagram.com/camoes_london',
      twitter: 'https://twitter.com/CamoesLondon',
      youtube: 'https://youtube.com/InstitutoCamoesUK'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-language-complete',
        name: 'Portuguese for Adults - Complete CEFR Course',
        namePortuguese: 'Português para Adultos - Curso Completo QECR',
        description: 'Comprehensive Portuguese language course aligned with Common European Framework of Reference, from A1 to C2 levels. Official Instituto Camões certification upon completion.',
        targetAudience: ['Adults 18+', 'Professionals', 'Heritage speakers', 'University students'],
        frequency: 'Weekly (3 hours) - 30 weeks per level',
        cost: '£420 per level (LusoTown members: £315)',
        registrationRequired: true,
        maxParticipants: 15
      },
      {
        id: 'prog-business-portuguese',
        name: 'Business Portuguese Professional Certificate',
        namePortuguese: 'Certificado Profissional de Português Empresarial',
        description: 'Specialized Portuguese for business professionals working with Portuguese-speaking markets. Covers formal communication, industry vocabulary, and cultural business practices.',
        targetAudience: ['Business professionals', 'Entrepreneurs', 'Finance workers', 'International trade specialists'],
        frequency: 'Weekly (2 hours) - 20 weeks',
        cost: '£380 per course (LusoTown members: £285)',
        registrationRequired: true,
        maxParticipants: 12
      },
      {
        id: 'prog-heritage-weekend',
        name: 'Portuguese Heritage Weekend School',
        namePortuguese: 'Escola de Fim de Semana de Património Português',
        description: 'Comprehensive weekend program for children of Portuguese heritage, covering language, culture, history, and traditions. Preparation for Portuguese citizenship.',
        targetAudience: ['Children 5-16', 'Portuguese heritage families', 'Citizenship preparation'],
        frequency: 'Saturday mornings (3 hours) - Academic year',
        cost: '£180 per term (LusoTown members: £135)',
        registrationRequired: true,
        maxParticipants: 20
      },
      {
        id: 'prog-teacher-training',
        name: 'Portuguese Teacher Training & Official Certification',
        namePortuguese: 'Formação e Certificação Oficial de Professores de Português',
        description: 'Professional development program for Portuguese language teachers with official Instituto Camões certification. Modern methodologies and cultural competency.',
        targetAudience: ['Language teachers', 'Education professionals', 'Advanced Portuguese speakers'],
        frequency: 'Intensive weekends - 12 weeks',
        cost: '£650 per certification (LusoTown members: £487)',
        registrationRequired: true,
        maxParticipants: 10
      },
      {
        id: 'prog-citizenship-prep',
        name: 'Portuguese Citizenship Language Test Preparation',
        namePortuguese: 'Preparação para Teste de Língua para Cidadania Portuguesa',
        description: 'Intensive preparation for Portuguese language proficiency test required for citizenship. Includes legal guidance and document preparation.',
        targetAudience: ['Citizenship applicants', 'Heritage speakers', 'Long-term UK residents'],
        frequency: 'Twice weekly (2 hours) - 8 weeks',
        cost: '£320 per course (LusoTown members: £240)',
        registrationRequired: true,
        maxParticipants: 15
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-camoes-symposium',
        title: 'Luís de Camões International Symposium 2024',
        titlePortuguese: 'Simpósio Internacional Luís de Camões 2024',
        date: '2024-06-10',
        time: '14:00',
        location: 'King\'s College London - Virginia Woolf Building',
        description: 'Annual academic symposium celebrating Portugal\'s national poet with international scholars and cultural experts',
        capacity: 120,
        price: 0,
        partnerId: 'partner-camoes'
      },
      {
        id: 'event-fado-masterclass',
        title: 'Fado: The Soul of Portugal - Cultural Masterclass',
        titlePortuguese: 'Fado: A Alma de Portugal - Masterclass Cultural',
        date: '2024-07-15',
        time: '19:00',
        location: 'Instituto Camões Centre',
        description: 'Immersive exploration of Fado history, technique, and UNESCO-recognized cultural significance',
        capacity: 40,
        price: 25,
        partnerId: 'partner-camoes'
      },
      {
        id: 'event-portuguese-cinema',
        title: 'Contemporary Portuguese Cinema Festival',
        titlePortuguese: 'Festival de Cinema Português Contemporâneo',
        date: '2024-09-20',
        time: '18:00',
        location: 'King\'s College London - Cinema Complex',
        description: 'Three-day festival showcasing contemporary Portuguese filmmaking with director Q&As',
        capacity: 80,
        price: 12,
        partnerId: 'partner-camoes'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Maria João Silva',
      title: 'Centre Director & LusoTown Partnership Coordinator',
      email: 'director.londres@instituto-camoes.pt',
      phone: '+44 20 7589 8755',
      bio: 'Director of Instituto Camões London and official coordinator of the LusoTown strategic partnership. Specialist in Portuguese language education, cultural programming, and digital community engagement with 15 years of experience in UK Portuguese cultural promotion.'
    }
  },
  
  {
    id: 'partner-chamber',
    name: 'Portugal-UK Chamber of Commerce',
    namePortuguese: 'Câmara de Comércio Portugal-Reino Unido',
    type: 'chamber_commerce',
    description: 'Bilateral chamber promoting trade and investment between Portugal and the UK, supporting Portuguese businesses and professionals.',
    descriptionPortuguese: 'Câmara bilateral promovendo comércio e investimento entre Portugal e o Reino Unido, apoiando empresas e profissionais portugueses.',
    
    website: 'https://www.portugal-uk.com',
    email: 'info@portugal-uk.com',
    phone: '+44 20 7383 5055',
    address: '4th Floor, 180 Piccadilly',
    postcode: 'W1J 9HF',
    
    partnershipLevel: 'strategic_partner',
    partnershipStartDate: '2024-01-10',
    servicesOffered: [
      'Business networking',
      'Trade missions',
      'Investment support',
      'Market intelligence',
      'Regulatory guidance',
      'Partnership facilitation'
    ],
    eventsHosted: [
      'Business breakfast meetings',
      'Investment seminars',
      'Trade delegations',
      'Networking receptions'
    ],
    memberBenefits: [
      'Networking event access',
      'Business directory listing',
      'Trade mission participation',
      'Market research access'
    ],
    
    communitySize: 800,
    yearsActive: 25,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['UK', 'Portugal'],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/company/portugal-uk-chamber',
      twitter: 'https://twitter.com/PortugalUK_Biz'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-networking',
        name: 'Monthly Business Networking',
        namePortuguese: 'Networking Empresarial Mensal',
        description: 'Regular networking events for Portuguese and British business professionals',
        targetAudience: ['Business owners', 'Entrepreneurs', 'Executives'],
        frequency: 'Monthly',
        cost: '£25 for members, £35 for non-members',
        registrationRequired: true,
        maxParticipants: 50
      },
      {
        id: 'prog-mentorship',
        name: 'Business Mentorship Program',
        namePortuguese: 'Programa de Mentoria Empresarial',
        description: 'Pairing experienced business leaders with emerging entrepreneurs',
        targetAudience: ['Emerging entrepreneurs', 'Business mentors'],
        frequency: 'Ongoing',
        cost: 'Free for members',
        registrationRequired: true
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-trade-mission',
        title: 'UK-Portugal Trade Mission',
        titlePortuguese: 'Missão Comercial Reino Unido-Portugal',
        date: '2024-04-18',
        time: '09:00',
        location: 'Chamber Offices',
        description: 'Trade mission planning session for business delegation to Lisbon',
        capacity: 30,
        price: 45,
        partnerId: 'partner-chamber'
      }
    ],
    
    contactPerson: {
      name: 'Carlos Santos',
      title: 'Executive Director',
      email: 'carlos.santos@portugal-uk.com',
      phone: '+44 20 7383 5055',
      bio: 'Executive Director with 15 years of experience in UK-Portugal trade relations and business development.'
    }
  },
  
  {
    id: 'partner-casa-brasil',
    name: 'Casa do Brasil in London',
    namePortuguese: 'Casa do Brasil em Londres',
    type: 'cultural_center',
    description: 'Cultural center promoting Brazilian arts, culture, and community connections in London, supporting the Brazilian diaspora.',
    descriptionPortuguese: 'Centro cultural promovendo artes, cultura e conexões comunitárias brasileiras em Londres, apoiando a diáspora brasileira.',
    
    website: 'https://www.casadobrasil.org.uk',
    email: 'info@casadobrasil.org.uk',
    phone: '+44 20 7357 6022',
    address: '32 The Cut, Waterloo',
    postcode: 'SE1 8LP',
    
    partnershipLevel: 'official_partner',
    partnershipStartDate: '2024-01-20',
    servicesOffered: [
      'Cultural events',
      'Portuguese language classes',
      'Community support',
      'Arts workshops',
      'Music programs',
      'Film screenings'
    ],
    eventsHosted: [
      'Brazilian music concerts',
      'Capoeira workshops',
      'Film festivals',
      'Cultural exhibitions'
    ],
    memberBenefits: [
      'Free cultural events',
      'Discounted language classes',
      'Workshop priority access',
      'Community newsletter'
    ],
    
    communitySize: 3000,
    yearsActive: 20,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['London', 'South England'],
    
    socialMedia: {
      facebook: 'https://facebook.com/CasaDoBrasilLondon',
      instagram: 'https://instagram.com/casadobrasillondon',
      twitter: 'https://twitter.com/CasaBrasilLDN'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    charityNumber: 'CH1057439',
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-capoeira',
        name: 'Capoeira Classes',
        namePortuguese: 'Aulas de Capoeira',
        description: 'Traditional Brazilian martial art and cultural expression classes',
        targetAudience: ['All ages', 'Beginners to advanced'],
        frequency: 'Twice weekly',
        cost: '£12 per class',
        registrationRequired: false,
        maxParticipants: 25
      },
      {
        id: 'prog-samba',
        name: 'Samba Dance Workshops',
        namePortuguese: 'Workshops de Dança Samba',
        description: 'Learn traditional Brazilian samba dance with professional instructors',
        targetAudience: ['Adults', 'Dance enthusiasts'],
        frequency: 'Weekly',
        cost: '£15 per workshop',
        registrationRequired: true,
        maxParticipants: 20
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-carnival',
        title: 'Brazilian Carnival Celebration',
        titlePortuguese: 'Celebração do Carnaval Brasileiro',
        date: '2024-02-24',
        time: '18:00',
        location: 'Casa do Brasil',
        description: 'Traditional Brazilian carnival celebration with music, dance, and food',
        capacity: 150,
        price: 12,
        partnerId: 'partner-casa-brasil'
      }
    ],
    
    contactPerson: {
      name: 'Ana Beatriz Costa',
      title: 'Cultural Director',
      email: 'ana@casadobrasil.org.uk',
      phone: '+44 20 7357 6022',
      bio: 'Cultural Director and artist, passionate about promoting Brazilian culture and supporting the Brazilian community in London.'
    }
  },
  
  {
    id: 'partner-portuguese-church',
    name: 'Portuguese Catholic Mission in London',
    namePortuguese: 'Missão Católica Portuguesa em Londres',
    type: 'religious_organization',
    description: 'Spiritual and community support for Portuguese Catholics in London, providing religious services and community programs.',
    descriptionPortuguese: 'Apoio espiritual e comunitário para católicos portugueses em Londres, oferecendo serviços religiosos e programas comunitários.',
    
    website: 'https://www.missaoportuguesalondres.org',
    email: 'padre@missaoportuguesalondres.org',
    phone: '+44 20 7735 8417',
    address: 'St. Vincent de Paul Church, Kensington',
    postcode: 'W8 6PZ',
    
    partnershipLevel: 'community_partner',
    partnershipStartDate: '2024-02-01',
    servicesOffered: [
      'Religious services',
      'Community support',
      'Portuguese language masses',
      'Wedding ceremonies',
      'Baptism services',
      'Pastoral care'
    ],
    eventsHosted: [
      'Portuguese masses',
      'Religious festivals',
      'Community gatherings',
      'Charity events'
    ],
    memberBenefits: [
      'Spiritual guidance',
      'Community events access',
      'Pastoral support',
      'Religious ceremony services'
    ],
    
    communitySize: 2500,
    yearsActive: 35,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['London', 'Greater London'],
    
    socialMedia: {
      facebook: 'https://facebook.com/MissaoPortuguesaLondres'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    charityNumber: 'CH263399',
    ambassadorEndorsed: false,
    
    programs: [
      {
        id: 'prog-masses',
        name: 'Portuguese Language Masses',
        namePortuguese: 'Missas em Língua Portuguesa',
        description: 'Weekly masses conducted in Portuguese for the community',
        targetAudience: ['Portuguese Catholics', 'Families'],
        frequency: 'Weekly (Sundays)',
        cost: 'Free (donations welcome)',
        registrationRequired: false
      },
      {
        id: 'prog-youth',
        name: 'Portuguese Youth Group',
        namePortuguese: 'Grupo Jovem Português',
        description: 'Activities and support for Portuguese young people',
        targetAudience: ['Youth 13-25'],
        frequency: 'Fortnightly',
        cost: 'Free',
        registrationRequired: true,
        maxParticipants: 30
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-fatima',
        title: 'Our Lady of Fátima Celebration',
        titlePortuguese: 'Celebração de Nossa Senhora de Fátima',
        date: '2024-05-13',
        time: '11:00',
        location: 'St. Vincent de Paul Church',
        description: 'Special mass and procession celebrating Our Lady of Fátima',
        capacity: 300,
        price: 0,
        partnerId: 'partner-portuguese-church'
      }
    ],
    
    contactPerson: {
      name: 'Padre João Mendes',
      title: 'Parish Priest',
      email: 'padre.joao@missaoportuguesalondres.org',
      phone: '+44 20 7735 8417',
      bio: 'Parish priest serving the Portuguese Catholic community in London for over 10 years.'
    }
  }
]

export interface PartnershipBenefit {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'cultural' | 'business' | 'education' | 'social' | 'religious' | 'professional'
  membershipRequired: boolean
  availableToAll: boolean
  discountAmount?: string
  validUntil?: string
}

// Partnership Benefits for LusoTown Members
export const PARTNERSHIP_BENEFITS: PartnershipBenefit[] = [
  {
    id: 'benefit-embassy-events',
    title: 'Priority Access to Embassy Cultural Events',
    titlePortuguese: 'Acesso Prioritário a Eventos Culturais da Embaixada',
    description: 'Get priority booking for Portuguese Embassy cultural events, exhibitions, and celebrations.',
    descriptionPortuguese: 'Obtenha reservas prioritárias para eventos culturais, exposições e celebrações da Embaixada Portuguesa.',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-language-discount',
    title: 'Instituto Camões Course Discounts',
    titlePortuguese: 'Descontos em Cursos do Instituto Camões',
    description: '15% discount on Portuguese language courses at Instituto Camões London.',
    descriptionPortuguese: '15% de desconto em cursos de língua portuguesa no Instituto Camões Londres.',
    category: 'education',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '15%',
    validUntil: '2024-12-31'
  },
  {
    id: 'benefit-chamber-networking',
    title: 'Free Business Networking Events',
    titlePortuguese: 'Eventos de Networking Empresarial Gratuitos',
    description: 'Complimentary access to Portugal-UK Chamber of Commerce networking events.',
    descriptionPortuguese: 'Acesso gratuito a eventos de networking da Câmara de Comércio Portugal-Reino Unido.',
    category: 'business',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-cultural-events',
    title: 'Casa do Brasil Cultural Events',
    titlePortuguese: 'Eventos Culturais da Casa do Brasil',
    description: 'Free entry to cultural events and 20% discount on workshops at Casa do Brasil.',
    descriptionPortuguese: 'Entrada gratuita em eventos culturais e 20% de desconto em workshops na Casa do Brasil.',
    category: 'cultural',
    membershipRequired: false,
    availableToAll: true,
    discountAmount: '20%'
  }
]

export class PartnershipsService {
  private static instance: PartnershipsService
  private partnerships: PartnershipOrganization[] = []
  private benefits: PartnershipBenefit[] = []

  static getInstance(): PartnershipsService {
    if (!PartnershipsService.instance) {
      PartnershipsService.instance = new PartnershipsService()
    }
    return PartnershipsService.instance
  }

  constructor() {
    this.loadData()
  }

  private loadData() {
    this.partnerships = [...PARTNERSHIP_ORGANIZATIONS]
    this.benefits = [...PARTNERSHIP_BENEFITS]
  }

  async getAllPartnerships(): Promise<PartnershipOrganization[]> {
    return this.partnerships
  }

  async getPartnershipsByType(type: OrganizationType): Promise<PartnershipOrganization[]> {
    return this.partnerships.filter(p => p.type === type)
  }

  async getPartnershipsByLevel(level: PartnershipLevel): Promise<PartnershipOrganization[]> {
    return this.partnerships.filter(p => p.partnershipLevel === level)
  }

  async getOfficialPartnerships(): Promise<PartnershipOrganization[]> {
    return this.partnerships.filter(p => p.officialStatus || p.governmentRecognized)
  }

  async getPartnershipById(id: string): Promise<PartnershipOrganization | null> {
    return this.partnerships.find(p => p.id === id) || null
  }

  async getPartnershipBenefits(): Promise<PartnershipBenefit[]> {
    return this.benefits
  }

  async getUpcomingPartnershipEvents(): Promise<PartnershipEvent[]> {
    const allEvents: PartnershipEvent[] = []
    this.partnerships.forEach(partner => {
      allEvents.push(...partner.upcomingEvents)
    })
    
    return allEvents
      .filter(event => new Date(event.date) > new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  async getCommunityPrograms(): Promise<CommunityProgram[]> {
    const allPrograms: CommunityProgram[] = []
    this.partnerships.forEach(partner => {
      allPrograms.push(...partner.programs)
    })
    
    return allPrograms
  }

  async getPartnershipStatistics(): Promise<{
    totalPartnerships: number
    officialPartnerships: number
    totalCommunitySize: number
    totalPrograms: number
    averageYearsActive: number
    partnershipsByType: { [key in OrganizationType]?: number }
  }> {
    const totalPartnerships = this.partnerships.length
    const officialPartnerships = this.partnerships.filter(p => p.officialStatus).length
    const totalCommunitySize = this.partnerships.reduce((sum, p) => sum + p.communitySize, 0)
    const totalPrograms = this.partnerships.reduce((sum, p) => sum + p.programs.length, 0)
    const averageYearsActive = Math.round(
      this.partnerships.reduce((sum, p) => sum + p.yearsActive, 0) / totalPartnerships
    )

    const partnershipsByType: { [key in OrganizationType]?: number } = {}
    this.partnerships.forEach(p => {
      partnershipsByType[p.type] = (partnershipsByType[p.type] || 0) + 1
    })

    return {
      totalPartnerships,
      officialPartnerships,
      totalCommunitySize,
      totalPrograms,
      averageYearsActive,
      partnershipsByType
    }
  }
}

export const partnershipsService = PartnershipsService.getInstance()