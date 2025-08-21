/**
 * Portuguese Cultural Centers and Institutions Configuration
 * Centralized configuration for Portuguese cultural institutions
 * Environment-configurable data for easy maintenance
 */

export interface CulturalCenter {
  id: string
  name: string
  namePortuguese: string
  type: 'instituto_camoes' | 'cultural_center' | 'portuguese_center' | 'brazilian_center' | 'lusophone_center'
  
  // Location
  address: string
  postcode: string
  city: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  
  // Contact Information
  phone: string
  email: string
  website: string
  
  // Programs and Services
  services: string[]
  servicesPortuguese: string[]
  programs: CulturalProgram[]
  
  // Schedule
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday?: string
    sunday?: string
  }
  
  // Staff
  director?: {
    name: string
    title: string
    titlePortuguese: string
    email?: string
    bio?: string
  }
  
  // Capacity and Resources
  capacity: number
  facilities: string[]
  languages: string[]
  
  // Partnerships
  partnerships: string[]
  accreditation: string[]
  
  // Social Media
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    linkedin?: string
  }
  
  // Status and Metadata
  isActive: boolean
  establishedYear: number
  lastUpdated: string
  description: string
  descriptionPortuguese: string
}

export interface CulturalProgram {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  type: 'language_course' | 'cultural_workshop' | 'certification' | 'event' | 'exhibition'
  targetAudience: string[]
  duration: string
  cost: string
  schedule: string
  maxParticipants?: number
  prerequisites?: string[]
  certification?: boolean
  registrationRequired: boolean
  contactEmail?: string
}

/**
 * Cultural Centers Configuration
 * Values can be overridden through environment variables
 */
export const CULTURAL_CENTERS: CulturalCenter[] = [
  {
    id: 'instituto-camoes-london',
    name: process.env.NEXT_PUBLIC_CAMOES_LONDON_NAME || 'Instituto Camões Centre London',
    namePortuguese: process.env.NEXT_PUBLIC_CAMOES_LONDON_NAME_PT || 'Centro do Instituto Camões Londres',
    type: 'instituto_camoes',
    
    address: process.env.NEXT_PUBLIC_CAMOES_ADDRESS || 'King\'s College London, Virginia Woolf Building, 22 Kingsway',
    postcode: process.env.NEXT_PUBLIC_CAMOES_POSTCODE || 'WC2B 6LE',
    city: 'London',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.5133,
      longitude: -0.1176
    },
    
    phone: process.env.NEXT_PUBLIC_CAMOES_PHONE || '+44 20 7589 8755',
    email: process.env.NEXT_PUBLIC_CAMOES_EMAIL || 'londres@instituto-camoes.pt',
    website: process.env.NEXT_PUBLIC_CAMOES_WEBSITE || 'https://www.instituto-camoes.pt/en/centres/london',
    
    services: [
      'Portuguese language courses',
      'Cultural events and exhibitions',
      'Portuguese teacher training',
      'Language certification (CAPLE)',
      'Digital library access',
      'Academic conferences',
      'Cultural workshops',
      'Portuguese citizenship preparation'
    ],
    servicesPortuguese: [
      'Cursos de língua portuguesa',
      'Eventos culturais e exposições',
      'Formação de professores de português',
      'Certificação linguística (CAPLE)',
      'Acesso à biblioteca digital',
      'Conferências acadêmicas',
      'Workshops culturais',
      'Preparação para cidadania portuguesa'
    ],
    
    programs: [
      {
        id: 'camoes-portuguese-adults',
        name: 'Portuguese for Adults - Complete CEFR Course',
        namePortuguese: 'Português para Adultos - Curso Completo QECR',
        description: 'Comprehensive Portuguese language course aligned with Common European Framework, A1-C2 levels',
        descriptionPortuguese: 'Curso abrangente de língua portuguesa alinhado com o Quadro Europeu Comum, níveis A1-C2',
        type: 'language_course',
        targetAudience: ['Adults 18+', 'Heritage speakers', 'Professionals'],
        duration: '30 weeks per level',
        cost: '£420 per level',
        schedule: 'Weekly (3 hours)',
        maxParticipants: 15,
        certification: true,
        registrationRequired: true
      },
      {
        id: 'camoes-business-portuguese',
        name: 'Business Portuguese Professional Certificate',
        namePortuguese: 'Certificado Profissional de Português Empresarial',
        description: 'Specialized Portuguese for business professionals working with Portuguese-speaking markets',
        descriptionPortuguese: 'Português especializado para profissionais de negócios que trabalham com mercados lusófonos',
        type: 'certification',
        targetAudience: ['Business professionals', 'Entrepreneurs', 'Finance workers'],
        duration: '20 weeks',
        cost: '£380 per course',
        schedule: 'Weekly (2 hours)',
        maxParticipants: 12,
        certification: true,
        registrationRequired: true
      },
      {
        id: 'camoes-heritage-weekend',
        name: 'Portuguese Heritage Weekend School',
        namePortuguese: 'Escola de Fim de Semana de Património Português',
        description: 'Weekend program for children of Portuguese heritage covering language, culture, and traditions',
        descriptionPortuguese: 'Programa de fim de semana para crianças de herança portuguesa cobrindo língua, cultura e tradições',
        type: 'cultural_workshop',
        targetAudience: ['Children 5-16', 'Portuguese heritage families'],
        duration: 'Academic year',
        cost: '£180 per term',
        schedule: 'Saturday mornings (3 hours)',
        maxParticipants: 20,
        registrationRequired: true
      }
    ],
    
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00'
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_CAMOES_DIRECTOR || 'Dr. Maria João Silva',
      title: 'Centre Director',
      titlePortuguese: 'Diretora do Centro',
      email: 'director.londres@instituto-camoes.pt',
      bio: 'Director of Instituto Camões London with expertise in Portuguese language education and cultural programming'
    },
    
    capacity: 200,
    facilities: ['Classrooms', 'Library', 'Conference room', 'Exhibition space', 'Audio-visual equipment'],
    languages: ['Portuguese', 'English'],
    
    partnerships: ['King\'s College London', 'Portuguese Embassy', 'LusoTown'],
    accreditation: ['Instituto Camões', 'Portuguese Ministry of Foreign Affairs'],
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CAMOES_FACEBOOK || 'https://facebook.com/InstitutoCamoesLondres',
      instagram: process.env.NEXT_PUBLIC_CAMOES_INSTAGRAM || 'https://instagram.com/camoes_london',
      twitter: process.env.NEXT_PUBLIC_CAMOES_TWITTER || 'https://twitter.com/CamoesLondon',
      youtube: process.env.NEXT_PUBLIC_CAMOES_YOUTUBE || 'https://youtube.com/InstitutoCamoesUK'
    },
    
    isActive: true,
    establishedYear: 1995,
    lastUpdated: '2024-08-21',
    description: 'Official Portuguese government cultural institution promoting Portuguese language and culture in the UK',
    descriptionPortuguese: 'Instituição cultural oficial do governo português promovendo língua e cultura portuguesas no Reino Unido'
  },
  
  {
    id: 'centro-cultural-portugues',
    name: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_NAME || 'Centro Cultural Português',
    namePortuguese: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_NAME_PT || 'Centro Cultural Português de Londres',
    type: 'portuguese_center',
    
    address: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_ADDRESS || '340 Harrow Road',
    postcode: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_POSTCODE || 'W9 2HP',
    city: 'London',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.5279,
      longitude: -0.2035
    },
    
    phone: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_PHONE || '+44 20 8969 3044',
    email: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_EMAIL || 'info@centroculturalportugues.org.uk',
    website: process.env.NEXT_PUBLIC_CENTRO_CULTURAL_WEBSITE || 'https://centroculturalportugues.org.uk',
    
    services: [
      'Portuguese language classes',
      'Cultural events',
      'Community support services',
      'Traditional Portuguese workshops',
      'Youth programs',
      'Senior citizen activities',
      'Portuguese library'
    ],
    servicesPortuguese: [
      'Aulas de língua portuguesa',
      'Eventos culturais',
      'Serviços de apoio comunitário',
      'Workshops tradicionais portugueses',
      'Programas juvenis',
      'Atividades para idosos',
      'Biblioteca portuguesa'
    ],
    
    programs: [
      {
        id: 'centro-portuguese-classes',
        name: 'Portuguese Language Classes',
        namePortuguese: 'Aulas de Língua Portuguesa',
        description: 'Portuguese language instruction for all levels, from beginner to advanced',
        descriptionPortuguese: 'Ensino de língua portuguesa para todos os níveis, do iniciante ao avançado',
        type: 'language_course',
        targetAudience: ['All ages', 'Portuguese community', 'Heritage speakers'],
        duration: '30 weeks',
        cost: '£150 per term',
        schedule: 'Weekly (2 hours)',
        maxParticipants: 20,
        registrationRequired: true
      },
      {
        id: 'centro-youth-program',
        name: 'Portuguese Youth Cultural Program',
        namePortuguese: 'Programa Cultural Juvenil Português',
        description: 'Cultural activities and Portuguese language maintenance for young people',
        descriptionPortuguese: 'Atividades culturais e manutenção da língua portuguesa para jovens',
        type: 'cultural_workshop',
        targetAudience: ['Youth 12-18', 'Portuguese heritage families'],
        duration: 'Academic year',
        cost: 'Free',
        schedule: 'Weekly (1.5 hours)',
        maxParticipants: 25,
        registrationRequired: true
      }
    ],
    
    openingHours: {
      monday: 'Closed',
      tuesday: '18:00-21:00',
      wednesday: '18:00-21:00',
      thursday: '18:00-21:00',
      friday: '18:00-21:00',
      saturday: '10:00-15:00',
      sunday: '10:00-13:00'
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_CENTRO_DIRECTOR || 'António Silva',
      title: 'Cultural Director',
      titlePortuguese: 'Diretor Cultural',
      email: 'diretor@centroculturalportugues.org.uk'
    },
    
    capacity: 150,
    facilities: ['Main hall', 'Classrooms', 'Kitchen', 'Library', 'Office space'],
    languages: ['Portuguese', 'English'],
    
    partnerships: ['Portuguese Embassy', 'Local Portuguese community', 'Golborne Portuguese Community'],
    accreditation: ['UK Registered Charity'],
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CENTRO_FACEBOOK || 'https://facebook.com/CentroCulturalPortuguesLondres'
    },
    
    isActive: true,
    establishedYear: 1982,
    lastUpdated: '2024-08-21',
    description: 'Community-based Portuguese cultural center offering language classes, cultural events, and community services',
    descriptionPortuguese: 'Centro cultural português baseado na comunidade oferecendo aulas de língua, eventos culturais e serviços comunitários'
  },
  
  {
    id: 'casa-do-brasil-london',
    name: process.env.NEXT_PUBLIC_CASA_BRASIL_NAME || 'Casa do Brasil in London',
    namePortuguese: process.env.NEXT_PUBLIC_CASA_BRASIL_NAME_PT || 'Casa do Brasil em Londres',
    type: 'brazilian_center',
    
    address: process.env.NEXT_PUBLIC_CASA_BRASIL_ADDRESS || '32 The Cut, Waterloo',
    postcode: process.env.NEXT_PUBLIC_CASA_BRASIL_POSTCODE || 'SE1 8LP',
    city: 'London',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.5048,
      longitude: -0.1086
    },
    
    phone: process.env.NEXT_PUBLIC_CASA_BRASIL_PHONE || '+44 20 7357 6022',
    email: process.env.NEXT_PUBLIC_CASA_BRASIL_EMAIL || 'info@casadobrasil.org.uk',
    website: process.env.NEXT_PUBLIC_CASA_BRASIL_WEBSITE || 'https://www.casadobrasil.org.uk',
    
    services: [
      'Brazilian cultural events',
      'Portuguese language classes',
      'Capoeira classes',
      'Samba workshops',
      'Brazilian film screenings',
      'Community support',
      'Arts workshops'
    ],
    servicesPortuguese: [
      'Eventos culturais brasileiros',
      'Aulas de língua portuguesa',
      'Aulas de capoeira',
      'Workshops de samba',
      'Exibições de filmes brasileiros',
      'Apoio comunitário',
      'Workshops de artes'
    ],
    
    programs: [
      {
        id: 'casa-capoeira',
        name: 'Capoeira Classes',
        namePortuguese: 'Aulas de Capoeira',
        description: 'Traditional Brazilian martial art and cultural expression classes for all levels',
        descriptionPortuguese: 'Aulas de arte marcial tradicional brasileira e expressão cultural para todos os níveis',
        type: 'cultural_workshop',
        targetAudience: ['All ages', 'Beginners to advanced'],
        duration: 'Ongoing',
        cost: '£12 per class',
        schedule: 'Twice weekly',
        maxParticipants: 25,
        registrationRequired: false
      },
      {
        id: 'casa-samba',
        name: 'Samba Dance Workshops',
        namePortuguese: 'Workshops de Dança Samba',
        description: 'Learn traditional Brazilian samba dance with professional instructors',
        descriptionPortuguese: 'Aprenda dança samba tradicional brasileira com instrutores profissionais',
        type: 'cultural_workshop',
        targetAudience: ['Adults', 'Dance enthusiasts'],
        duration: 'Ongoing',
        cost: '£15 per workshop',
        schedule: 'Weekly',
        maxParticipants: 20,
        registrationRequired: true
      }
    ],
    
    openingHours: {
      monday: 'Closed',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-18:00',
      saturday: '10:00-16:00'
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_CASA_BRASIL_DIRECTOR || 'Ana Beatriz Costa',
      title: 'Cultural Director',
      titlePortuguese: 'Diretora Cultural',
      email: 'ana@casadobrasil.org.uk',
      bio: 'Cultural director and artist passionate about promoting Brazilian culture in London'
    },
    
    capacity: 100,
    facilities: ['Theatre', 'Gallery', 'Dance studio', 'Office space', 'Café'],
    languages: ['Portuguese', 'English'],
    
    partnerships: ['Brazilian Embassy', 'Southwark Council', 'Local Brazilian community'],
    accreditation: ['UK Registered Charity'],
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CASA_BRASIL_FACEBOOK || 'https://facebook.com/CasaDoBrasilLondon',
      instagram: process.env.NEXT_PUBLIC_CASA_BRASIL_INSTAGRAM || 'https://instagram.com/casadobrasillondon',
      twitter: process.env.NEXT_PUBLIC_CASA_BRASIL_TWITTER || 'https://twitter.com/CasaBrasilLDN'
    },
    
    isActive: true,
    establishedYear: 1995,
    lastUpdated: '2024-08-21',
    description: 'Cultural center promoting Brazilian arts, culture, and community connections in London',
    descriptionPortuguese: 'Centro cultural promovendo artes brasileiras, cultura e conexões comunitárias em Londres'
  }
]

/**
 * Get cultural center by ID
 */
export function getCulturalCenterById(id: string): CulturalCenter | null {
  return CULTURAL_CENTERS.find(center => center.id === id) || null
}

/**
 * Get cultural centers by type
 */
export function getCulturalCentersByType(type: CulturalCenter['type']): CulturalCenter[] {
  return CULTURAL_CENTERS.filter(center => center.type === type && center.isActive)
}

/**
 * Get all Instituto Camões centers
 */
export function getCamoesInstitutes(): CulturalCenter[] {
  return getCulturalCentersByType('instituto_camoes')
}

/**
 * Get programs by type
 */
export function getProgramsByType(type: CulturalProgram['type']): CulturalProgram[] {
  const allPrograms: CulturalProgram[] = []
  CULTURAL_CENTERS.forEach(center => {
    if (center.isActive) {
      allPrograms.push(...center.programs.filter(program => program.type === type))
    }
  })
  return allPrograms
}

/**
 * Get all language courses
 */
export function getLanguageCourses(): CulturalProgram[] {
  return getProgramsByType('language_course')
}

/**
 * Get all cultural workshops
 */
export function getCulturalWorkshops(): CulturalProgram[] {
  return getProgramsByType('cultural_workshop')
}

/**
 * Find centers near a location (simplified - in production would use actual geolocation)
 */
export function findCentersNear(postcode: string, radiusKm: number = 10): CulturalCenter[] {
  // Simplified implementation - in production would use proper geolocation
  return CULTURAL_CENTERS.filter(center => center.isActive)
}

/**
 * Get opening hours for today
 */
export function getTodayOpeningHours(centerId: string): string {
  const center = getCulturalCenterById(centerId)
  if (!center) return 'Closed'
  
  const today = new Date().toLocaleLowerCase()
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayName = dayNames[new Date().getDay()]
  
  return center.openingHours[dayName as keyof typeof center.openingHours] || 'Closed'
}

/**
 * Check if center offers a specific service
 */
export function hasService(centerId: string, service: string): boolean {
  const center = getCulturalCenterById(centerId)
  if (!center) return false
  
  return center.services.some(s => 
    s.toLowerCase().includes(service.toLowerCase())
  )
}

/**
 * Get contact information for cultural support
 */
export function getCulturalSupportContacts(): {
  camoes: { phone: string; email: string }
  community: { phone: string; email: string }
  brazilian: { phone: string; email: string }
} {
  const camoes = getCulturalCenterById('instituto-camoes-london')
  const community = getCulturalCenterById('centro-cultural-portugues')
  const brazilian = getCulturalCenterById('casa-do-brasil-london')
  
  return {
    camoes: {
      phone: camoes?.phone || '+44 20 7589 8755',
      email: camoes?.email || 'londres@instituto-camoes.pt'
    },
    community: {
      phone: community?.phone || '+44 20 8969 3044',
      email: community?.email || 'info@centroculturalportugues.org.uk'
    },
    brazilian: {
      phone: brazilian?.phone || '+44 20 7357 6022',
      email: brazilian?.email || 'info@casadobrasil.org.uk'
    }
  }
}