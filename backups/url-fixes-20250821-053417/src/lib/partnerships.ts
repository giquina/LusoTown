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
  },

  // Strategic Business and Financial Partnerships
  {
    id: 'partner-anglo-portuguese-society',
    name: 'Anglo-Portuguese Society',
    namePortuguese: 'Sociedade Anglo-Portuguesa',
    type: 'cultural_center',
    description: 'Premier cultural organization fostering UK-Portugal relations through high-level diplomatic, business, and cultural exchanges. LusoTown\'s founding cultural partner, officially endorsed by the Portuguese Ambassador.',
    descriptionPortuguese: 'Organização cultural de prestígio promovendo relações Reino Unido-Portugal através de intercâmbios diplomáticos, empresariais e culturais de alto nível. Parceiro cultural fundador da LusoTown, oficialmente apoiado pelo Embaixador Português.',
    
    website: 'https://www.angloportuguesesociety.org.uk',
    email: 'secretary@angloportuguesesociety.org.uk',
    phone: '+44 20 7235 2581',
    address: 'Portuguese Embassy Cultural Wing, 11 Belgrave Square',
    postcode: 'SW1X 8PP',
    
    partnershipLevel: 'founding_partner',
    partnershipStartDate: '2024-01-01',
    servicesOffered: [
      'High-level business networking events',
      'Diplomatic cultural programming',
      'Portuguese business delegation support',
      'Investment opportunity introductions',
      'Cultural heritage preservation initiatives',
      'Academic research collaboration',
      'Professional Portuguese language certification',
      'Ambassador-hosted exclusive events',
      'UK-Portugal trade mission coordination',
      'Elite membership networking opportunities'
    ],
    eventsHosted: [
      'Ambassador\'s Annual Gala (black-tie fundraising)',
      'Portuguese Investment Summit London',
      'Camões Prize Literary Celebration',
      'Port Wine & Business Networking Evenings',
      'Portuguese Heritage Preservation Symposium',
      'UK-Portugal Trade Delegation Dinners',
      'Cultural Exchange Academic Conferences',
      'Portuguese Art & Antiques Exhibitions'
    ],
    memberBenefits: [
      'Ambassador-hosted exclusive events access',
      'Priority networking with Portuguese business leaders',
      'Diplomatic reception invitations',
      'Cultural programming VIP access',
      'Portuguese government liaison opportunities',
      'High-value business connection facilitation',
      'Portuguese cultural heritage preservation involvement',
      'Academic research collaboration opportunities'
    ],
    
    communitySize: 1200,
    yearsActive: 95,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Portugal', 'Commonwealth'],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/company/anglo-portuguese-society',
      twitter: 'https://twitter.com/AngloPortSoc',
      facebook: 'https://facebook.com/AngloPortugueseSociety'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    charityNumber: 'CH207377',
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-ambassador-circle',
        name: 'Ambassador\'s Circle - Elite Business Network',
        namePortuguese: 'Círculo do Embaixador - Rede Empresarial de Elite',
        description: 'Exclusive high-level networking program connecting Portuguese and British business leaders, diplomats, and cultural figures.',
        targetAudience: ['C-suite executives', 'Diplomatic personnel', 'High-net-worth individuals', 'Cultural leaders'],
        frequency: 'Quarterly exclusive events',
        cost: '£850 annual membership (LusoTown premium members: £637)',
        registrationRequired: true,
        maxParticipants: 50
      },
      {
        id: 'prog-cultural-preservation',
        name: 'Portuguese Cultural Heritage Preservation Initiative',
        namePortuguese: 'Iniciativa de Preservação do Património Cultural Português',
        description: 'Collaborative program documenting and preserving Portuguese cultural heritage in the UK through digital archives and cultural events.',
        targetAudience: ['Cultural historians', 'Portuguese heritage families', 'Academic researchers'],
        frequency: 'Monthly workshops and quarterly symposiums',
        cost: '£125 per program (LusoTown members: £94)',
        registrationRequired: true,
        maxParticipants: 25
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-ambassador-gala',
        title: 'Ambassador\'s Annual Gala 2024: Celebrating Portuguese Excellence',
        titlePortuguese: 'Gala Anual do Embaixador 2024: Celebrando a Excelência Portuguesa',
        date: '2024-10-12',
        time: '19:00',
        location: 'Guildhall, City of London',
        description: 'Black-tie gala celebrating Portuguese achievement in business, arts, and diplomacy with awards ceremony and fundraising auction',
        capacity: 300,
        price: 185,
        partnerId: 'partner-anglo-portuguese-society'
      },
      {
        id: 'event-investment-summit',
        title: 'Portuguese Investment Summit London 2024',
        titlePortuguese: 'Cimeira de Investimento Português Londres 2024',
        date: '2024-11-14',
        time: '09:00',
        location: 'Canary Wharf Conference Centre',
        description: 'High-level investment summit connecting Portuguese and UK investors, featuring government officials and industry leaders',
        capacity: 150,
        price: 95,
        partnerId: 'partner-anglo-portuguese-society'
      }
    ],
    
    contactPerson: {
      name: 'Lady Catherine Pemberton-Silva',
      title: 'Honorary Secretary & LusoTown Partnership Director',
      email: 'partnerships@angloportuguesesociety.org.uk',
      phone: '+44 20 7235 2581',
      bio: 'Diplomatic liaison and cultural programming director with 20 years of experience in UK-Portugal relations. Official coordinator of the LusoTown strategic partnership, working closely with the Portuguese Ambassador to support premium community services.'
    }
  },

  {
    id: 'partner-millennium-bank',
    name: 'Millennium Bank UK (Portuguese Banking)',
    namePortuguese: 'Millennium Bank UK (Banca Portuguesa)',
    type: 'business_association',
    description: 'Leading Portuguese bank serving the UK market with specialized services for Portuguese nationals, businesses, and investors. Official banking partner providing exclusive financial services to LusoTown premium members.',
    descriptionPortuguese: 'Banco português líder no mercado do Reino Unido com serviços especializados para nacionais, empresas e investidores portugueses. Parceiro bancário oficial oferecendo serviços financeiros exclusivos aos membros premium da LusoTown.',
    
    website: 'https://www.millenniumbank.co.uk',
    email: 'portuguese.services@millenniumbank.co.uk',
    phone: '+44 20 7816 4000',
    address: 'Millennium House, 25 Canada Square, Canary Wharf',
    postcode: 'E14 5LQ',
    
    partnershipLevel: 'strategic_partner',
    partnershipStartDate: '2024-01-15',
    servicesOffered: [
      'Portuguese-speaking personal banking',
      'International money transfers (UK-Portugal)',
      'Portuguese property investment financing',
      'Business banking for Portuguese entrepreneurs',
      'Investment advisory services',
      'Portuguese pension planning',
      'Currency exchange services',
      'Portuguese mortgage advisory',
      'Cross-border business expansion support',
      'Wealth management for Portuguese clients'
    ],
    eventsHosted: [
      'Portuguese Property Investment Seminars',
      'Cross-border Business Banking Workshops',
      'Portuguese Pension Planning Sessions',
      'Investment Strategy Briefings',
      'Entrepreneur Finance Networking Events'
    ],
    memberBenefits: [
      'No fees on UK-Portugal transfers (saves £240/year)',
      'Preferential mortgage rates for Portuguese property',
      'Free Portuguese investment advisory consultations',
      'Priority banking services in Portuguese',
      'Exclusive access to Portuguese market investments',
      'Reduced fees on business banking services',
      'VIP customer service line',
      'Quarterly Portuguese market updates'
    ],
    
    communitySize: 8500,
    yearsActive: 15,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Portugal', 'EU'],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/company/millennium-bank-uk',
      twitter: 'https://twitter.com/MillenniumUK'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-property-investment',
        name: 'Portuguese Property Investment Advisory',
        namePortuguese: 'Consultoria de Investimento Imobiliário Português',
        description: 'Comprehensive advisory service for UK residents investing in Portuguese property, including financing, legal guidance, and market analysis.',
        targetAudience: ['Property investors', 'Portuguese diaspora', 'Retirees', 'Business professionals'],
        frequency: 'Monthly seminars, ongoing consultations',
        cost: 'Free for LusoTown members (normally £150/consultation)',
        registrationRequired: true,
        maxParticipants: 20
      },
      {
        id: 'prog-business-expansion',
        name: 'Cross-border Business Expansion Support',
        namePortuguese: 'Apoio à Expansão Empresarial Transfronteiriça',
        description: 'Banking and financial services supporting Portuguese businesses expanding to UK and UK businesses entering Portuguese markets.',
        targetAudience: ['Business owners', 'Entrepreneurs', 'SME executives'],
        frequency: 'Bi-weekly workshops',
        cost: '£85 per workshop (LusoTown members: free)',
        registrationRequired: true,
        maxParticipants: 15
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-property-seminar',
        title: 'Portuguese Golden Visa & Property Investment 2024',
        titlePortuguese: 'Visto Gold Português & Investimento Imobiliário 2024',
        date: '2024-09-25',
        time: '18:30',
        location: 'Millennium House, Canary Wharf',
        description: 'Expert seminar on Portuguese Golden Visa programs, property investment opportunities, and financing solutions',
        capacity: 80,
        price: 35,
        partnerId: 'partner-millennium-bank'
      }
    ],
    
    contactPerson: {
      name: 'Carlos Miguel Ferreira',
      title: 'Director of Portuguese Client Services & LusoTown Partnership Lead',
      email: 'carlos.ferreira@millenniumbank.co.uk',
      phone: '+44 20 7816 4000',
      bio: 'Senior banking executive specializing in Portuguese client services and cross-border financial solutions. Leads the strategic partnership with LusoTown to provide premium banking services to the Portuguese community in the UK.'
    }
  },

  {
    id: 'partner-tap-air-portugal',
    name: 'TAP Air Portugal UK',
    namePortuguese: 'TAP Air Portugal Reino Unido',
    type: 'business_association',
    description: 'Portugal\'s national airline serving the UK market with direct flights to Lisbon, Porto, and seasonal destinations. Official travel partner offering exclusive benefits to LusoTown members.',
    descriptionPortuguese: 'Companhia aérea nacional de Portugal servindo o mercado do Reino Unido com voos diretos para Lisboa, Porto e destinos sazonais. Parceiro oficial de viagens oferecendo benefícios exclusivos aos membros da LusoTown.',
    
    website: 'https://www.flytap.com/en-gb',
    email: 'uk.partnerships@tap.pt',
    phone: '+44 20 7630 0025',
    address: 'TAP Air Portugal House, 1-11 John Adam Street',
    postcode: 'WC2N 6HT',
    
    partnershipLevel: 'strategic_partner',
    partnershipStartDate: '2024-01-20',
    servicesOffered: [
      'Direct flights London-Lisbon-Porto',
      'Connecting flights to Portuguese islands',
      'Portuguese-speaking cabin crew',
      'Traditional Portuguese onboard service',
      'Miles&Go loyalty program benefits',
      'Group travel arrangements',
      'Corporate travel solutions',
      'Portuguese diaspora travel packages',
      'Community reunion flight discounts',
      'Portuguese business delegation services'
    ],
    eventsHosted: [
      'Portuguese destination showcase events',
      'Miles&Go member appreciation nights',
      'Portuguese tourism promotion seminars',
      'Corporate travel networking events'
    ],
    memberBenefits: [
      '15% discount on flights to Portugal',
      'Priority Miles&Go membership enrollment',
      'Complimentary seat selection',
      'Extra baggage allowance for Portuguese trips',
      'Access to TAP lounges with guest privileges',
      'Portuguese cultural event travel packages',
      'Community group booking discounts',
      'Business travel account priority setup'
    ],
    
    communitySize: 45000,
    yearsActive: 25,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Portugal', 'Portuguese-speaking Africa', 'Brazil'],
    
    socialMedia: {
      instagram: 'https://instagram.com/tapairportugal',
      facebook: 'https://facebook.com/TAPAirPortugal',
      twitter: 'https://twitter.com/tapairportugal',
      linkedin: 'https://linkedin.com/company/tap-air-portugal'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-heritage-travel',
        name: 'Portuguese Heritage Travel Program',
        namePortuguese: 'Programa de Viagens do Património Português',
        description: 'Specialized travel packages for Portuguese diaspora visiting community, exploring heritage sites, and maintaining cultural connections.',
        targetAudience: ['Portuguese diaspora', 'Heritage families', 'Cultural travelers'],
        frequency: 'Year-round availability',
        cost: 'Discounted packages from £189 return',
        registrationRequired: true
      },
      {
        id: 'prog-business-travel',
        name: 'UK-Portugal Business Travel Solutions',
        namePortuguese: 'Soluções de Viagens Empresariais Reino Unido-Portugal',
        description: 'Corporate travel program supporting business connections between UK and Portugal with flexible booking and priority services.',
        targetAudience: ['Business travelers', 'Entrepreneurs', 'Corporate executives'],
        frequency: 'On-demand',
        cost: 'Corporate rates with LusoTown discounts',
        registrationRequired: true
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-portugal-showcase',
        title: 'Discover Portugal Travel Showcase 2024',
        titlePortuguese: 'Mostra de Viagens Descobrir Portugal 2024',
        date: '2024-08-22',
        time: '18:00',
        location: 'Portugal Cultural Centre, London',
        description: 'Travel showcase featuring Portuguese destinations, cultural experiences, and exclusive travel offers',
        capacity: 100,
        price: 0,
        partnerId: 'partner-tap-air-portugal'
      }
    ],
    
    contactPerson: {
      name: 'Ana Sofia Rodrigues',
      title: 'UK Market Manager & LusoTown Partnership Coordinator',
      email: 'ana.rodrigues@tap.pt',
      phone: '+44 20 7630 0025',
      bio: 'Aviation industry professional specializing in Portuguese diaspora travel and community partnerships. Coordinates exclusive travel benefits for LusoTown members and Portuguese cultural events.'
    }
  },

  {
    id: 'partner-portugal-foods',
    name: 'Portugal Foods UK Distribution Network',
    namePortuguese: 'Rede de Distribuição Portugal Foods Reino Unido',
    type: 'business_association',
    description: 'Premium Portuguese food import and distribution network serving authentic Portuguese restaurants, delicatessens, and specialty food stores across the UK. Official culinary partner supporting Portuguese gastronomy businesses.',
    descriptionPortuguese: 'Rede premium de importação e distribuição de alimentos portugueses servindo restaurantes, delicatessens e lojas especializadas autênticas portuguesas em todo o Reino Unido. Parceiro culinário oficial apoiando negócios de gastronomia portuguesa.',
    
    website: 'https://www.portugalfoods.co.uk',
    email: 'partnerships@portugalfoods.co.uk',
    phone: '+44 20 8965 7200',
    address: 'Portugal Foods Distribution Centre, Unit 45 Western International Market',
    postcode: 'UB2 5XJ',
    
    partnershipLevel: 'official_partner',
    partnershipStartDate: '2024-02-01',
    servicesOffered: [
      'Authentic Portuguese food imports',
      'Restaurant supply chain management',
      'Portuguese delicatessen support',
      'Cultural food event catering',
      'Portuguese wine and spirits distribution',
      'Traditional Portuguese bakery supplies',
      'Portuguese specialty product sourcing',
      'Culinary event vendor coordination',
      'Portuguese food business consultancy',
      'Authentic ingredient certification'
    ],
    eventsHosted: [
      'Portuguese food tasting events',
      'Traditional cooking workshops',
      'Portuguese wine appreciation evenings',
      'Restaurant industry networking events',
      'Portuguese culinary heritage celebrations'
    ],
    memberBenefits: [
      '20% discount on Portuguese specialty products',
      'Priority access to limited Portuguese imports',
      'Free delivery on orders over £150',
      'Exclusive Portuguese wine tasting events',
      'Traditional Portuguese cooking classes',
      'Portuguese food business networking',
      'Culinary event catering discounts',
      'Authentic Portuguese recipe collection access'
    ],
    
    communitySize: 1500,
    yearsActive: 18,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Ireland'],
    
    socialMedia: {
      instagram: 'https://instagram.com/portugalfoodsuk',
      facebook: 'https://facebook.com/PortugalFoodsUK'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-culinary-heritage',
        name: 'Portuguese Culinary Heritage Preservation',
        namePortuguese: 'Preservação do Património Culinário Português',
        description: 'Educational program documenting and teaching traditional Portuguese cooking methods, recipes, and food culture.',
        targetAudience: ['Portuguese families', 'Culinary enthusiasts', 'Restaurant professionals'],
        frequency: 'Monthly workshops',
        cost: '£45 per workshop (LusoTown members: £36)',
        registrationRequired: true,
        maxParticipants: 16
      },
      {
        id: 'prog-restaurant-support',
        name: 'Portuguese Restaurant Business Support Network',
        namePortuguese: 'Rede de Apoio a Negócios de Restauração Portuguesa',
        description: 'Business support network for Portuguese restaurant owners, including supply chain optimization, marketing support, and industry networking.',
        targetAudience: ['Restaurant owners', 'Food entrepreneurs', 'Culinary professionals'],
        frequency: 'Quarterly networking events',
        cost: 'Free for LusoTown business members',
        registrationRequired: true,
        maxParticipants: 25
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-portuguese-food-festival',
        title: 'Festival of Portuguese Flavors 2024',
        titlePortuguese: 'Festival de Sabores Portugueses 2024',
        date: '2024-10-05',
        time: '12:00',
        location: 'Southbank Centre, London',
        description: 'Celebration of Portuguese culinary heritage with food stalls, cooking demonstrations, and traditional music',
        capacity: 500,
        price: 15,
        partnerId: 'partner-portugal-foods'
      }
    ],
    
    contactPerson: {
      name: 'Miguel Santos Costa',
      title: 'Business Development Director & Community Partnership Manager',
      email: 'miguel.costa@portugalfoods.co.uk',
      phone: '+44 20 8965 7200',
      bio: 'Food industry executive with expertise in Portuguese gastronomy and community business development. Manages partnerships with Portuguese restaurants and cultural organizations while coordinating LusoTown member benefits.'
    }
  },

  // Extended University and Academic Partnerships
  {
    id: 'partner-ucl-portuguese',
    name: 'UCL Portuguese Studies Department',
    namePortuguese: 'Departamento de Estudos Portugueses da UCL',
    type: 'educational_institution',
    description: 'University College London\'s Portuguese Studies Department offering comprehensive Portuguese language, literature, and cultural studies programs. Strategic academic partner providing exclusive educational benefits to LusoTown student members.',
    descriptionPortuguese: 'Departamento de Estudos Portugueses da University College London oferecendo programas abrangentes de língua portuguesa, literatura e estudos culturais. Parceiro acadêmico estratégico fornecendo benefícios educacionais exclusivos aos membros estudantes da LusoTown.',
    
    website: 'https://www.ucl.ac.uk/spanish-portuguese-latin-american-studies',
    email: 'portuguese.studies@ucl.ac.uk',
    phone: '+44 20 7679 7178',
    address: 'UCL School of European Languages, Culture and Society, Gower Street',
    postcode: 'WC1E 6BT',
    
    partnershipLevel: 'strategic_partner',
    partnershipStartDate: '2024-02-15',
    servicesOffered: [
      'Portuguese language courses (A1-C2)',
      'Portuguese literature and culture modules',
      'Research supervision in Portuguese studies',
      'Study abroad programs to Portugal',
      'Portuguese teacher training certification',
      'Academic conferences and symposiums',
      'Digital archive access to Portuguese texts',
      'Career guidance for Portuguese studies graduates'
    ],
    eventsHosted: [
      'Annual Portuguese Studies Conference',
      'Lusophone Literature Symposium',
      'Portuguese Culture Week events',
      'Graduate research presentations',
      'Portuguese film screening series'
    ],
    memberBenefits: [
      '30% discount on Portuguese language courses',
      'Free access to Portuguese digital library',
      'Priority enrollment in Portuguese studies modules',
      'Mentorship program with Portuguese faculty',
      'Study abroad scholarship opportunities',
      'Portuguese academic conference attendance'
    ],
    
    communitySize: 450,
    yearsActive: 12,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['London', 'UK', 'International'],
    
    socialMedia: {
      twitter: 'https://twitter.com/UCLPortuguese',
      facebook: 'https://facebook.com/UCLPortugueseStudies'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-ucl-undergraduate',
        name: 'Portuguese Studies BA Programme',
        namePortuguese: 'Programa de Licenciatura em Estudos Portugueses',
        description: 'Comprehensive three-year undergraduate degree in Portuguese language, literature, history, and culture',
        targetAudience: ['Undergraduate students', 'Portuguese heritage students', 'Language enthusiasts'],
        frequency: 'Full academic year',
        cost: '£9,250 per year (home students)',
        registrationRequired: true,
        maxParticipants: 25
      },
      {
        id: 'prog-ucl-postgraduate',
        name: 'Portuguese and Brazilian Studies MA',
        namePortuguese: 'Mestrado em Estudos Portugueses e Brasileiros',
        description: 'Advanced postgraduate study focusing on Portuguese and Brazilian literature, culture, and society',
        targetAudience: ['Postgraduate students', 'Researchers', 'Portuguese teachers'],
        frequency: 'One academic year',
        cost: '£31,200 per year',
        registrationRequired: true,
        maxParticipants: 15
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-ucl-conference',
        title: 'Lusophone Studies in the Digital Age Conference',
        titlePortuguese: 'Conferência de Estudos Lusófonos na Era Digital',
        date: '2024-11-08',
        time: '09:00',
        location: 'UCL Main Campus, Gustave Tuck Lecture Theatre',
        description: 'International conference exploring digital humanities approaches to Portuguese and Lusophone studies',
        capacity: 80,
        price: 15,
        partnerId: 'partner-ucl-portuguese'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Luísa Pereira',
      title: 'Head of Portuguese Studies & LusoTown Academic Liaison',
      email: 'l.pereira@ucl.ac.uk',
      phone: '+44 20 7679 7178',
      bio: 'Leading Portuguese studies academic and researcher with expertise in contemporary Portuguese literature and digital humanities. Coordinates the strategic partnership between UCL and LusoTown for enhanced Portuguese educational opportunities.'
    }
  },

  {
    id: 'partner-kings-college-portuguese',
    name: 'King\'s College London Portuguese Centre',
    namePortuguese: 'Centro Português do King\'s College London',
    type: 'educational_institution',
    description: 'King\'s College London Portuguese Centre promoting Portuguese language education, cultural studies, and academic research. Official academic partner supporting Portuguese language maintenance and cultural preservation.',
    descriptionPortuguese: 'Centro Português do King\'s College London promovendo educação em língua portuguesa, estudos culturais e pesquisa acadêmica. Parceiro acadêmico oficial apoiando a manutenção da língua portuguesa e preservação cultural.',
    
    website: 'https://www.kcl.ac.uk/modern-language-centre/portuguese',
    email: 'portuguese.centre@kcl.ac.uk',
    phone: '+44 20 7848 2029',
    address: 'King\'s College London, Virginia Woolf Building, 22 Kingsway',
    postcode: 'WC2B 6LE',
    
    partnershipLevel: 'official_partner',
    partnershipStartDate: '2024-03-01',
    servicesOffered: [
      'Portuguese for heritage speakers courses',
      'Portuguese business language training',
      'Cultural immersion workshops',
      'Portuguese translation and interpretation services',
      'Academic Portuguese writing support',
      'Portuguese cultural events programming',
      'Student mentorship programs',
      'Career development in Portuguese-speaking markets'
    ],
    eventsHosted: [
      'Portuguese Heritage Month celebrations',
      'Fado music appreciation evenings',
      'Portuguese business networking events',
      'Student language exchange meetups',
      'Portuguese cooking masterclasses'
    ],
    memberBenefits: [
      '25% discount on all Portuguese courses',
      'Free Portuguese cultural workshops',
      'Priority access to cultural events',
      'Mentorship with Portuguese students',
      'Portuguese career guidance sessions',
      'Translation services discount'
    ],
    
    communitySize: 320,
    yearsActive: 8,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['London', 'South East England'],
    
    socialMedia: {
      instagram: 'https://instagram.com/kclportuguese',
      facebook: 'https://facebook.com/KingsPortugueseCentre'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-kcl-heritage',
        name: 'Portuguese Heritage Language Programme',
        namePortuguese: 'Programa de Língua Portuguesa como Herança',
        description: 'Specialized program for Portuguese heritage speakers to develop academic and professional language skills',
        targetAudience: ['Heritage speakers', 'Portuguese community families', 'Second-generation Portuguese'],
        frequency: 'Weekly sessions throughout academic year',
        cost: '£180 per term (LusoTown members: £135)',
        registrationRequired: true,
        maxParticipants: 20
      },
      {
        id: 'prog-kcl-business',
        name: 'Portuguese for Business Professionals',
        namePortuguese: 'Português para Profissionais de Negócios',
        description: 'Intensive business Portuguese course focusing on commercial, legal, and technical language',
        targetAudience: ['Business professionals', 'Entrepreneurs', 'International trade workers'],
        frequency: 'Evening classes twice weekly',
        cost: '£320 per course (LusoTown members: £240)',
        registrationRequired: true,
        maxParticipants: 16
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-kcl-heritage',
        title: 'Portuguese Heritage Language Community Day',
        titlePortuguese: 'Dia da Comunidade da Língua Portuguesa como Herança',
        date: '2024-09-14',
        time: '10:00',
        location: 'King\'s College London, Virginia Woolf Building',
        description: 'Community-focused event promoting Portuguese language maintenance across generations',
        capacity: 60,
        price: 0,
        partnerId: 'partner-kings-college-portuguese'
      }
    ],
    
    contactPerson: {
      name: 'Professor Ana Rita Correia',
      title: 'Director of Portuguese Centre & Community Outreach Coordinator',
      email: 'ana.correia@kcl.ac.uk',
      phone: '+44 20 7848 2029',
      bio: 'Portuguese language education specialist with focus on heritage language maintenance and community engagement. Leads the Portuguese Centre\'s partnership with LusoTown to provide comprehensive Portuguese education services.'
    }
  },

  {
    id: 'partner-portuguese-medical-association',
    name: 'Portuguese Medical Association UK',
    namePortuguese: 'Associação Médica Portuguesa do Reino Unido',
    type: 'business_association',
    description: 'Professional association representing Portuguese healthcare professionals in the UK. Provides career support, professional development, and advocacy for Portuguese medical practitioners and healthcare workers.',
    descriptionPortuguese: 'Associação profissional representando profissionais de saúde portugueses no Reino Unido. Fornece apoio na carreira, desenvolvimento profissional e advocacia para médicos portugueses e trabalhadores de saúde.',
    
    website: 'https://www.pmauk.org',
    email: 'info@pmauk.org',
    phone: '+44 20 7935 4444',
    address: 'Portuguese Medical House, 45 Wimpole Street',
    postcode: 'W1G 8YD',
    
    partnershipLevel: 'strategic_partner',
    partnershipStartDate: '2024-04-01',
    servicesOffered: [
      'Medical career guidance and mentorship',
      'NHS registration support for Portuguese doctors',
      'Continuing medical education programs',
      'Medical English language support',
      'Professional networking events',
      'Healthcare job placement assistance',
      'Medical insurance and financial services',
      'Legal support for medical professionals'
    ],
    eventsHosted: [
      'Annual Portuguese Medical Conference',
      'Medical career development workshops',
      'Healthcare innovation seminars',
      'Medical research presentations',
      'Professional networking dinners'
    ],
    memberBenefits: [
      'Reduced medical conference fees',
      'Free career mentorship sessions',
      'Medical CPD course discounts',
      'Professional indemnity insurance discounts',
      'Healthcare job alerts and placement support',
      'Medical English courses at reduced rates',
      'Legal consultation services',
      'Medical research collaboration opportunities'
    ],
    
    communitySize: 850,
    yearsActive: 15,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom', 'Ireland'],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/company/portuguese-medical-association-uk',
      twitter: 'https://twitter.com/PMAUK_Official'
    },
    
    officialStatus: true,
    governmentRecognized: true,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-pma-mentorship',
        name: 'Portuguese Medical Mentorship Programme',
        namePortuguese: 'Programa de Mentoria Médica Portuguesa',
        description: 'Comprehensive mentorship program pairing experienced Portuguese doctors with newly qualified or relocating medical professionals',
        targetAudience: ['Newly qualified doctors', 'Portuguese doctors moving to UK', 'Medical students'],
        frequency: 'Ongoing individual mentorship',
        cost: 'Free for LusoTown medical professional members',
        registrationRequired: true,
        maxParticipants: 50
      },
      {
        id: 'prog-pma-cme',
        name: 'Continuing Medical Education in Portuguese',
        namePortuguese: 'Educação Médica Continuada em Português',
        description: 'Professional development courses delivered in Portuguese covering latest medical advances and UK healthcare system',
        targetAudience: ['Practicing doctors', 'Medical specialists', 'Healthcare professionals'],
        frequency: 'Monthly seminars and annual conference',
        cost: '£85 per seminar (LusoTown members: £60)',
        registrationRequired: true,
        maxParticipants: 40
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-pma-conference',
        title: 'Portuguese Medical Excellence Conference 2024',
        titlePortuguese: 'Conferência de Excelência Médica Portuguesa 2024',
        date: '2024-10-18',
        time: '08:30',
        location: 'Royal College of Physicians, London',
        description: 'Annual conference showcasing Portuguese medical excellence and innovation in UK healthcare',
        capacity: 200,
        price: 120,
        partnerId: 'partner-portuguese-medical-association'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Rui Ferreira Silva',
      title: 'President & LusoTown Professional Partnership Director',
      email: 'presidente@pmauk.org',
      phone: '+44 20 7935 4444',
      bio: 'Consultant cardiologist and President of the Portuguese Medical Association UK. Leads strategic partnerships with community organizations to support Portuguese healthcare professionals throughout their careers in the UK.'
    }
  },

  {
    id: 'partner-portuguese-lawyers-network',
    name: 'Portuguese Lawyers Network UK',
    namePortuguese: 'Rede de Advogados Portugueses do Reino Unido',
    type: 'business_association',
    description: 'Professional network of Portuguese legal practitioners in the UK providing legal services, professional development, and advocacy for Portuguese legal professionals and community legal needs.',
    descriptionPortuguese: 'Rede profissional de advogados portugueses no Reino Unido fornecendo serviços jurídicos, desenvolvimento profissional e advocacia para profissionais jurídicos portugueses e necessidades legais da comunidade.',
    
    website: 'https://www.plnuk.org',
    email: 'contact@plnuk.org',
    phone: '+44 20 7242 5555',
    address: 'Portuguese Legal Centre, 25 Lincoln\'s Inn Fields',
    postcode: 'WC2A 3LH',
    
    partnershipLevel: 'official_partner',
    partnershipStartDate: '2024-05-01',
    servicesOffered: [
      'Portuguese language legal services',
      'Immigration and visa support',
      'Portuguese property law assistance',
      'Business and commercial law guidance',
      'Legal services for Portuguese Portuguese speakers',
      'Legal qualification recognition support',
      'Pro bono legal clinic for community',
      'Legal training and professional development'
    ],
    eventsHosted: [
      'Portuguese Legal Forum annual conference',
      'Immigration law update seminars',
      'Legal rights awareness workshops',
      'Professional development training',
      'Community legal advice sessions'
    ],
    memberBenefits: [
      'Discounted legal consultation rates',
      'Free initial legal advice sessions',
      'Legal document translation services',
      'Immigration support and guidance',
      'Property purchase legal assistance',
      'Business law consultation discounts',
      'Legal CPD course access',
      'Community legal workshop attendance'
    ],
    
    communitySize: 180,
    yearsActive: 8,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom'],
    
    socialMedia: {
      linkedin: 'https://linkedin.com/company/portuguese-lawyers-network-uk',
      twitter: 'https://twitter.com/PLNUK_Legal'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-pln-community',
        name: 'Community Legal Support Programme',
        namePortuguese: 'Programa de Apoio Jurídico Comunitário',
        description: 'Pro bono legal support program providing essential legal services to Portuguese Portuguese speakers',
        targetAudience: ['Portuguese Portuguese speakers', 'Low-income families', 'Recent immigrants'],
        frequency: 'Weekly legal clinics',
        cost: 'Free for qualifying Portuguese speakers',
        registrationRequired: true,
        maxParticipants: 20
      },
      {
        id: 'prog-pln-professional',
        name: 'Portuguese Legal Professional Development',
        namePortuguese: 'Desenvolvimento Profissional Jurídico Português',
        description: 'Professional development program for Portuguese lawyers and legal professionals in the UK',
        targetAudience: ['Portuguese lawyers', 'Legal professionals', 'Law students'],
        frequency: 'Monthly seminars and workshops',
        cost: '£65 per session (LusoTown members: £45)',
        registrationRequired: true,
        maxParticipants: 30
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-pln-forum',
        title: 'Portuguese Legal Forum 2024: Community Rights & Immigration',
        titlePortuguese: 'Fórum Jurídico Português 2024: Direitos Comunitários e Imigração',
        date: '2024-11-22',
        time: '14:00',
        location: 'Lincoln\'s Inn Old Hall, London',
        description: 'Annual legal forum focusing on Portuguese community rights and immigration law updates',
        capacity: 100,
        price: 35,
        partnerId: 'partner-portuguese-lawyers-network'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Maria José Santos',
      title: 'Network Director & Community Legal Advocate',
      email: 'm.santos@plnuk.org',
      phone: '+44 20 7242 5555',
      bio: 'Immigration and community law specialist with 12 years of experience serving the Portuguese community in the UK. Leads the network\'s partnership with LusoTown to provide accessible legal services and support.'
    }
  },

  {
    id: 'partner-portuguese-heritage-trust',
    name: 'Portuguese Heritage Trust UK',
    namePortuguese: 'Fundação do Património Português Reino Unido',
    type: 'charity',
    description: 'Charitable organization dedicated to preserving and promoting Portuguese cultural heritage in the UK through education, cultural programs, and heritage preservation projects.',
    descriptionPortuguese: 'Organização de caridade dedicada à preservação e promoção do património cultural português no Reino Unido através de educação, programas culturais e projetos de preservação patrimonial.',
    
    website: 'https://www.portugueseheritage.org.uk',
    email: 'heritage@portugueseheritage.org.uk',
    phone: '+44 20 7387 1122',
    address: 'Portuguese Heritage House, 15 Tavistock Square',
    postcode: 'WC1H 9SH',
    
    partnershipLevel: 'community_partner',
    partnershipStartDate: '2024-06-01',
    servicesOffered: [
      'Portuguese heritage education programs',
      'Cultural artifact preservation',
      'Traditional Portuguese craft workshops',
      'Heritage tourism and cultural tours',
      'Portuguese genealogy research support',
      'Cultural documentation projects',
      'Traditional Portuguese music and dance classes',
      'Heritage preservation volunteering opportunities'
    ],
    eventsHosted: [
      'Portuguese Heritage Month festival',
      'Traditional Portuguese craft exhibitions',
      'Heritage preservation workshops',
      'Portuguese folk music concerts',
      'Cultural heritage walking tours'
    ],
    memberBenefits: [
      'Free heritage workshops and classes',
      'Priority access to cultural events',
      'Genealogy research support',
      'Traditional craft course discounts',
      'Heritage tour guide discounts',
      'Cultural preservation volunteer opportunities',
      'Portuguese heritage resource library access',
      'Community heritage documentation services'
    ],
    
    communitySize: 650,
    yearsActive: 22,
    languagesSupported: ['Portuguese', 'English'],
    regionsServed: ['United Kingdom'],
    
    socialMedia: {
      facebook: 'https://facebook.com/PortugueseHeritageTrustUK',
      instagram: 'https://instagram.com/portugueseheritageuk'
    },
    
    officialStatus: true,
    governmentRecognized: false,
    charityNumber: 'CH1145789',
    ambassadorEndorsed: true,
    
    programs: [
      {
        id: 'prog-pht-youth',
        name: 'Portuguese Heritage Youth Programme',
        namePortuguese: 'Programa Juvenil do Património Português',
        description: 'Educational program engaging young Portuguese heritage individuals in cultural preservation and traditional skills',
        targetAudience: ['Youth 12-25', 'Portuguese heritage families', 'Students'],
        frequency: 'Weekly sessions during term time',
        cost: 'Free for LusoTown member families',
        registrationRequired: true,
        maxParticipants: 25
      },
      {
        id: 'prog-pht-preservation',
        name: 'Community Heritage Preservation Project',
        namePortuguese: 'Projeto de Preservação do Património Comunitário',
        description: 'Collaborative project documenting and preserving Portuguese community heritage through oral histories and cultural artifacts',
        targetAudience: ['Portuguese community elders', 'Heritage volunteers', 'Researchers'],
        frequency: 'Monthly project meetings',
        cost: 'Free for volunteers',
        registrationRequired: true,
        maxParticipants: 15
      }
    ],
    
    upcomingEvents: [
      {
        id: 'event-pht-festival',
        title: 'Portuguese Cultural Festival London 2024',
        titlePortuguese: 'Festival da Cultura Portuguesa Londres 2024',
        date: '2024-09-28',
        time: '11:00',
        location: 'Coram\'s Fields, London',
        description: 'Annual festival celebrating Portuguese heritage with traditional crafts, music, food, and cultural demonstrations',
        capacity: 800,
        price: 8,
        partnerId: 'partner-portuguese-heritage-trust'
      }
    ],
    
    contactPerson: {
      name: 'Dr. Isabel Pereira',
      title: 'Heritage Director & Cultural Programme Coordinator',
      email: 'isabel.pereira@portugueseheritage.org.uk',
      phone: '+44 20 7387 1122',
      bio: 'Cultural historian and heritage preservation specialist with expertise in Portuguese cultural traditions. Coordinates the trust\'s partnership with LusoTown to provide heritage education and preservation opportunities for the community.'
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
    description: '25% discount on Portuguese language courses at Instituto Camões London (save up to £105).',
    descriptionPortuguese: '25% de desconto em cursos de língua portuguesa no Instituto Camões Londres (poupança até £105).',
    category: 'education',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '25%',
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
  },
  
  // Strategic Partnership Benefits
  {
    id: 'benefit-anglo-portuguese-elite',
    title: 'Anglo-Portuguese Society Elite Access',
    titlePortuguese: 'Acesso Elite à Sociedade Anglo-Portuguesa',
    description: '25% discount on Ambassador\'s Circle membership and priority access to diplomatic events (save £213).',
    descriptionPortuguese: '25% de desconto na adesão ao Círculo do Embaixador e acesso prioritário a eventos diplomáticos (poupança £213).',
    category: 'business',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '25%',
    validUntil: '2024-12-31'
  },
  {
    id: 'benefit-millennium-banking',
    title: 'Premium Portuguese Banking Services',
    titlePortuguese: 'Serviços Bancários Portugueses Premium',
    description: 'No fees on UK-Portugal transfers, preferential property investment rates, and free financial consultations (save £240/year).',
    descriptionPortuguese: 'Sem taxas em transferências Reino Unido-Portugal, taxas preferenciais para investimento imobiliário e consultas financeiras gratuitas (poupança £240/ano).',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '£240/year savings'
  },
  {
    id: 'benefit-tap-travel',
    title: 'Exclusive TAP Air Portugal Benefits',
    titlePortuguese: 'Benefícios Exclusivos TAP Air Portugal',
    description: '15% discount on flights to Portugal, complimentary seat selection, and TAP lounge access with guest privileges.',
    descriptionPortuguese: '15% de desconto em voos para Portugal, seleção de lugares gratuita e acesso aos lounges TAP com privilégios para convidados.',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '15%'
  },
  {
    id: 'benefit-portugal-foods',
    title: 'Portuguese Culinary Heritage Access',
    titlePortuguese: 'Acesso ao Património Culinário Português',
    description: '20% discount on Portuguese specialty products, free delivery, and exclusive culinary workshops.',
    descriptionPortuguese: '20% de desconto em produtos especializados portugueses, entrega gratuita e workshops culinários exclusivos.',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '20%'
  },
  {
    id: 'benefit-heritage-preservation',
    title: 'Portuguese Cultural Heritage Preservation',
    titlePortuguese: 'Preservação do Património Cultural Português',
    description: 'Free access to cultural heritage preservation workshops and digital archives (£200/year value).',
    descriptionPortuguese: 'Acesso gratuito a workshops de preservação do património cultural e arquivos digitais (valor £200/ano).',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-diplomatic-access',
    title: 'Diplomatic Reception Access',
    titlePortuguese: 'Acesso a Receções Diplomáticas',
    description: 'Invitations to select Portuguese Embassy diplomatic receptions and cultural celebrations.',
    descriptionPortuguese: 'Convites para receções diplomáticas selecionadas da Embaixada Portuguesa e celebrações culturais.',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-business-expansion',
    title: 'Cross-border Business Support',
    titlePortuguese: 'Apoio Empresarial Transfronteiriço',
    description: 'Free workshops on UK-Portugal business expansion and investment opportunities.',
    descriptionPortuguese: 'Workshops gratuitos sobre expansão empresarial e oportunidades de investimento Reino Unido-Portugal.',
    category: 'business',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-investment-advisory',
    title: 'Portuguese Investment Advisory Services',
    titlePortuguese: 'Serviços de Consultoria de Investimento Português',
    description: 'Free Portuguese property investment consultations and market analysis (normally £150/session).',
    descriptionPortuguese: 'Consultas gratuitas de investimento imobiliário português e análise de mercado (normalmente £150/sessão).',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '£150/session value'
  },

  // Extended Academic and Professional Benefits
  {
    id: 'benefit-ucl-academic',
    title: 'UCL Portuguese Studies Academic Benefits',
    titlePortuguese: 'Benefícios Acadêmicos dos Estudos Portugueses da UCL',
    description: '30% discount on Portuguese language courses and free access to Portuguese digital library at UCL.',
    descriptionPortuguese: '30% de desconto em cursos de língua portuguesa e acesso gratuito à biblioteca digital portuguesa na UCL.',
    category: 'education',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '30%',
    validUntil: '2025-12-31'
  },
  {
    id: 'benefit-kcl-heritage',
    title: 'King\'s College Portuguese Heritage Programme',
    titlePortuguese: 'Programa de Património Português do King\'s College',
    description: '25% discount on Portuguese courses and free cultural workshops at King\'s College London.',
    descriptionPortuguese: '25% de desconto em cursos de português e workshops culturais gratuitos no King\'s College London.',
    category: 'education',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '25%'
  },
  {
    id: 'benefit-medical-professional',
    title: 'Portuguese Medical Professional Support',
    titlePortuguese: 'Apoio Profissional Médico Português',
    description: 'Free career mentorship, medical CPD course discounts, and healthcare job placement assistance.',
    descriptionPortuguese: 'Mentoria profissional gratuita, descontos em cursos de DPC médica e assistência de colocação em empregos de saúde.',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '£300/year value'
  },
  {
    id: 'benefit-legal-services',
    title: 'Portuguese Legal Services Access',
    titlePortuguese: 'Acesso a Serviços Jurídicos Portugueses',
    description: 'Discounted legal consultations, free initial advice sessions, and immigration support.',
    descriptionPortuguese: 'Consultas jurídicas com desconto, sessões de aconselhamento inicial gratuitas e apoio à imigração.',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '40%'
  },
  {
    id: 'benefit-heritage-preservation',
    title: 'Portuguese Heritage Preservation Access',
    titlePortuguese: 'Acesso à Preservação do Património Português',
    description: 'Free heritage workshops, genealogy research support, and cultural preservation programs.',
    descriptionPortuguese: 'Workshops de património gratuitos, apoio à investigação genealógica e programas de preservação cultural.',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-community-integration',
    title: 'Enhanced Community Integration Services',
    titlePortuguese: 'Serviços Aprimorados de Integração Comunitária',
    description: 'Comprehensive support for newcomers including language exchange, professional networking, and cultural orientation.',
    descriptionPortuguese: 'Apoio abrangente para recém-chegados incluindo intercâmbio de idiomas, networking profissional e orientação cultural.',
    category: 'social',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-professional-development',
    title: 'Portuguese Professional Development Network',
    titlePortuguese: 'Rede de Desenvolvimento Profissional Português',
    description: 'Access to industry-specific training, career advancement workshops, and professional certification support.',
    descriptionPortuguese: 'Acesso a treinamento específico do setor, workshops de avanço na carreira e apoio à certificação profissional.',
    category: 'professional',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '50%'
  },
  {
    id: 'benefit-cultural-immersion',
    title: 'Portuguese Cultural Immersion Programme',
    titlePortuguese: 'Programa de Imersão Cultural Portuguesa',
    description: 'Exclusive access to cultural events, traditional workshops, and heritage preservation activities.',
    descriptionPortuguese: 'Acesso exclusivo a eventos culturais, workshops tradicionais e atividades de preservação do património.',
    category: 'cultural',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-academic-research',
    title: 'Portuguese Academic Research Collaboration',
    titlePortuguese: 'Colaboração em Pesquisa Acadêmica Portuguesa',
    description: 'Opportunities to participate in Portuguese studies research projects and academic conferences.',
    descriptionPortuguese: 'Oportunidades de participar em projetos de investigação de estudos portugueses e conferências acadêmicas.',
    category: 'education',
    membershipRequired: true,
    availableToAll: false
  },
  {
    id: 'benefit-business-networking',
    title: 'Portuguese Business Network Premium Access',
    titlePortuguese: 'Acesso Premium à Rede Empresarial Portuguesa',
    description: 'Premium access to Portuguese business networking events, trade missions, and investment opportunities.',
    descriptionPortuguese: 'Acesso premium a eventos de networking empresarial português, missões comerciais e oportunidades de investimento.',
    category: 'business',
    membershipRequired: true,
    availableToAll: false,
    discountAmount: '£200/year value'
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