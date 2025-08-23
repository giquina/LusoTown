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
        targetAudience: ['All ages', 'Portuguese-speaking community', 'Heritage speakers'],
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
    
    partnerships: ['Portuguese Embassy', 'Local Portuguese-speaking community', 'Golborne Portuguese-speaking community'],
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
    name: process.env.NEXT_PUBLIC_CASA_BRASIL_NAME || 'Casa do Brasil in London - Elite Cultural Centre',
    namePortuguese: process.env.NEXT_PUBLIC_CASA_BRASIL_NAME_PT || 'Casa do Brasil em Londres - Centro Cultural de Elite',
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
      'Elite Brazilian cultural events and galas',
      'Executive Portuguese language programs',
      'Luxury Brazilian lifestyle workshops',
      'High-society networking events',
      'Brazilian art exhibitions and auctions',
      'Business development seminars',
      'Cultural diplomacy programs',
      'Premium capoeira and dance classes',
      'Brazilian fine dining experiences',
      'Investment and trade facilitation',
      'Corporate cultural consulting'
    ],
    servicesPortuguese: [
      'Eventos culturais brasileiros de elite e galas',
      'Programas executivos de língua portuguesa',
      'Workshops de estilo de vida brasileiro de luxo',
      'Eventos de networking da alta sociedade',
      'Exposições e leilões de arte brasileira',
      'Seminários de desenvolvimento empresarial',
      'Programas de diplomacia cultural',
      'Aulas premium de capoeira e dança',
      'Experiências gastronômicas brasileiras refinadas',
      'Facilitação de investimentos e comércio',
      'Consultoria cultural corporativa'
    ],
    
    programs: [
      {
        id: 'casa-executive-portuguese',
        name: 'Executive Brazilian Portuguese Program',
        namePortuguese: 'Programa Executivo de Português Brasileiro',
        description: 'Exclusive Portuguese language program for C-suite executives focusing on business communication and cultural nuances',
        descriptionPortuguese: 'Programa exclusivo de língua portuguesa para executivos C-level focando em comunicação empresarial e nuances culturais',
        type: 'language_course',
        targetAudience: ['C-suite executives', 'Investment bankers', 'International business leaders', 'Diplomatic personnel'],
        duration: '12 weeks intensive',
        cost: '£2,500 per executive program',
        schedule: 'Private or small group sessions (3 hours/week)',
        maxParticipants: 6,
        certification: true,
        registrationRequired: true,
        contactEmail: 'executive@casadobrasil.org.uk'
      },
      {
        id: 'casa-business-networking-gala',
        name: 'Brazilian Business Excellence Gala',
        namePortuguese: 'Gala de Excelência Empresarial Brasileira',
        description: 'Annual black-tie networking gala celebrating Brazilian business success in the UK, featuring keynote speakers from Fortune 500 Brazilian companies',
        descriptionPortuguese: 'Gala anual de networking em traje de gala celebrando o sucesso empresarial brasileiro no Reino Unido, com palestrantes de empresas brasileiras Fortune 500',
        type: 'event',
        targetAudience: ['Brazilian expatriate executives', 'UK-Brazil trade officials', 'Investment fund managers', 'Cultural ambassadors'],
        duration: 'Annual event',
        cost: '£350 - £2,500 per table',
        schedule: 'Annual (September)',
        maxParticipants: 200,
        prerequisites: ['Professional references required', 'Invitation or membership'],
        certification: false,
        registrationRequired: true,
        contactEmail: 'gala@casadobrasil.org.uk'
      },
      {
        id: 'casa-luxury-capoeira',
        name: 'Premium Capoeira & Brazilian Martial Arts',
        namePortuguese: 'Capoeira Premium e Artes Marciais Brasileiras',
        description: 'Exclusive capoeira classes with master instructors from Brazil, including cultural history and philosophy for discerning practitioners',
        descriptionPortuguese: 'Aulas exclusivas de capoeira com mestres instrutores do Brasil, incluindo história cultural e filosofia para praticantes exigentes',
        type: 'cultural_workshop',
        targetAudience: ['Fitness enthusiasts', 'Cultural connoisseurs', 'Stress-relief seekers', 'Brazilian heritage individuals'],
        duration: 'Ongoing with intensive workshops',
        cost: '£45 per class / £450 per month unlimited',
        schedule: 'Three times weekly + monthly intensives',
        maxParticipants: 15,
        registrationRequired: true,
        contactEmail: 'capoeira@casadobrasil.org.uk'
      },
      {
        id: 'casa-cultural-investment',
        name: 'Brazilian Art & Cultural Investment Seminars',
        namePortuguese: 'Seminários de Investimento em Arte e Cultura Brasileira',
        description: 'Educational seminars on investing in Brazilian art, cultural properties, and heritage assets for high-net-worth individuals',
        descriptionPortuguese: 'Seminários educacionais sobre investimento em arte brasileira, propriedades culturais e ativos patrimoniais para indivíduos de alto patrimônio',
        type: 'certification',
        targetAudience: ['Art collectors', 'Investment advisors', 'Cultural institution leaders', 'Wealth managers'],
        duration: '6-week intensive course',
        cost: '£1,200 per participant',
        schedule: 'Quarterly offerings',
        maxParticipants: 12,
        certification: true,
        registrationRequired: true,
        contactEmail: 'investment@casadobrasil.org.uk'
      },
      {
        id: 'casa-luxury-culinary',
        name: 'Brazilian Fine Dining & Wine Experience',
        namePortuguese: 'Experiência de Gastronomia Fina e Vinhos Brasileiros',
        description: 'Curated dining experiences featuring Brazil\'s sophisticated culinary scene, premium cachaças, and wine pairings',
        descriptionPortuguese: 'Experiências gastronômicas curadas apresentando a sofisticada cena culinária brasileira, cachaças premium e harmonização de vinhos',
        type: 'cultural_workshop',
        targetAudience: ['Food connoisseurs', 'Wine enthusiasts', 'Business entertainment hosts', 'Cultural tourists'],
        duration: 'Monthly events',
        cost: '£150 - £350 per person',
        schedule: 'Monthly themed dinners',
        maxParticipants: 24,
        registrationRequired: true,
        contactEmail: 'culinary@casadobrasil.org.uk'
      }
    ],
    
    openingHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-21:00',
      wednesday: '09:00-21:00',
      thursday: '09:00-21:00',
      friday: '09:00-21:00',
      saturday: '10:00-18:00',
      sunday: '12:00-17:00'
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_CASA_BRASIL_DIRECTOR || 'Dr. Fernanda Almeida Santos',
      title: 'Executive Cultural Director & Brazil-UK Trade Liaison',
      titlePortuguese: 'Diretora Cultural Executiva e Ligação Comercial Brasil-Reino Unido',
      email: 'fernanda.santos@casadobrasil.org.uk',
      bio: 'Former São Paulo Opera House cultural director and international business consultant specializing in Brazil-UK cultural and economic partnerships. MBA from INSEAD, PhD in Cultural Studies from USP.'
    },
    
    capacity: 250,
    facilities: [
      'Premium theatre with state-of-the-art audio-visual',
      'Contemporary art gallery with rotating exhibitions',
      'Professional dance studios with Marley floors',
      'Executive conference rooms',
      'VIP reception lounges',
      'Brazilian specialty café and wine bar',
      'Business center with translation services',
      'Private dining rooms',
      'Cultural library and research center'
    ],
    languages: ['Portuguese', 'English', 'Spanish'],
    
    partnerships: [
      'Brazilian Embassy London',
      'UK-Brazil Chamber of Commerce',
      'São Paulo State Cultural Department',
      'Rio de Janeiro Tourism Board',
      'Itaú Cultural London',
      'Vale Foundation UK',
      'British Council Brazil',
      'London Business School Brazil Centre',
      'Brazilian Development Bank (BNDES) London Office'
    ],
    accreditation: [
      'UK Registered Charity',
      'Brazilian Ministry of Culture official partner',
      'UK Trade & Investment cultural partner',
      'Instituto Camões collaborative institution'
    ],
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CASA_BRASIL_FACEBOOK || 'https://facebook.com/CasaDoBrasilEliteLondon',
      instagram: process.env.NEXT_PUBLIC_CASA_BRASIL_INSTAGRAM || 'https://instagram.com/casadobrasil_elite',
      twitter: process.env.NEXT_PUBLIC_CASA_BRASIL_TWITTER || 'https://twitter.com/CasaBrasilElite',
      linkedin: 'https://linkedin.com/company/casa-do-brasil-london-elite'
    },
    
    isActive: true,
    establishedYear: 1995,
    lastUpdated: '2024-08-22',
    description: 'Premier Brazilian cultural institution in London, fostering sophisticated cultural exchange and business development between Brazil and the UK. Serving as the epicenter for Brazilian elite networking, luxury cultural experiences, and high-level diplomatic engagement.',
    descriptionPortuguese: 'Principal instituição cultural brasileira em Londres, promovendo intercâmbio cultural sofisticado e desenvolvimento empresarial entre Brasil e Reino Unido. Servindo como epicentro para networking da elite brasileira, experiências culturais de luxo e engajamento diplomático de alto nível.'
  },

  {
    id: 'centro-cultural-cabo-verde-london',
    name: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_NAME || 'Cape Verdean Cultural Center London - Music & Soul',
    namePortuguese: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_NAME_PT || 'Centro Cultural Cabo-verdiano Londres - Música e Alma',
    type: 'lusophone_center',
    
    address: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_ADDRESS || 'Stockwell Community Centre, 1 Studley Road',
    postcode: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_POSTCODE || 'SW4 6RA',
    city: 'London',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.4622,
      longitude: -0.1234
    },
    
    phone: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_PHONE || '+44 20 7622 4958',
    email: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_EMAIL || 'info@capeverdecultural.co.uk',
    website: process.env.NEXT_PUBLIC_CAPE_VERDE_CENTER_WEBSITE || 'https://capeverdecultural.co.uk',
    
    services: [
      'Heartfelt Morna music sessions - Cape Verde\'s blues',
      'Energetic Coladeira dance parties and celebrations',
      'Traditional Funaná accordion music workshops',
      'Batuko women\'s music circles with vocal harmonies',
      'Cape Verdean language and Creole conversation circles',
      'Island food culture and traditional Cachupa cooking',
      'Cape Verdean cultural storytelling and poetry nights',
      'Traditional crafts: weaving, pottery, and artisan workshops',
      'Modern Cape Verdean artist showcases and concerts',
      'Community celebration festivals with island rhythms',
      'Cultural film nights featuring Cape Verdean cinema',
      'Social clubs for music, dancing, and island connections'
    ],
    servicesPortuguese: [
      'Sessões emocionantes de música Morna - o blues de Cabo Verde',
      'Festas energéticas de dança Coladeira e celebrações',
      'Workshops tradicionais de música Funaná com acordeão',
      'Círculos de música feminina Batuko com harmonias vocais',
      'Círculos de conversação em língua cabo-verdiana e crioulo',
      'Cultura alimentar das ilhas e culinária tradicional de Cachupa',
      'Noites de contos e poesia cultural cabo-verdiana',
      'Artesanatos tradicionais: tecelagem, cerâmica e workshops artesanais',
      'Showcases e concertos de artistas cabo-verdianos modernos',
      'Festivais de celebração comunitária com ritmos das ilhas',
      'Noites de cinema cultural apresentando cinema cabo-verdiano',
      'Clubes sociais para música, dança e conexões das ilhas'
    ],
    
    programs: [
      {
        id: 'cape-verde-morna-soul-sessions',
        name: 'Morna Soul Sessions - Heartfelt Music Circles',
        namePortuguese: 'Sessões de Alma Morna - Círculos de Música do Coração',
        description: 'Intimate acoustic sessions featuring Cape Verde\'s most emotional music genre, where participants learn traditional morna songs that touch the soul with their melancholic beauty and deep cultural meaning',
        descriptionPortuguese: 'Sessões acústicas íntimas apresentando o gênero musical mais emocional de Cabo Verde, onde os participantes aprendem canções tradicionais de morna que tocam a alma com sua beleza melancólica e significado cultural profundo',
        type: 'cultural_workshop',
        targetAudience: ['Music lovers', 'Cape Verdean heritage individuals', 'Cultural enthusiasts', 'Musicians seeking soulful expression'],
        duration: 'Weekly ongoing sessions',
        cost: '£25 per session / £80 per month',
        schedule: 'Thursday evenings (7:00-9:00 PM)',
        maxParticipants: 20,
        certification: false,
        registrationRequired: true,
        contactEmail: 'morna@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-coladeira-dance-celebration',
        name: 'Coladeira Dance Celebration - Joyful Island Rhythms',
        namePortuguese: 'Celebração de Dança Coladeira - Ritmos Alegres das Ilhas',
        description: 'High-energy dance sessions teaching the infectious rhythms of Coladeira, Cape Verde\'s most joyful music that brings communities together in celebration with upbeat melodies and energetic movements',
        descriptionPortuguese: 'Sessões de dança de alta energia ensinando os ritmos contagiantes da Coladeira, a música mais alegre de Cabo Verde que une comunidades em celebração com melodias animadas e movimentos energéticos',
        type: 'cultural_workshop',
        targetAudience: ['Dance enthusiasts', 'Community celebration lovers', 'Fitness seekers', 'Cultural dancers'],
        duration: 'Bi-weekly dance parties',
        cost: '£20 per session / £60 per month',
        schedule: 'Saturday evenings (6:00-8:30 PM)',
        maxParticipants: 35,
        certification: false,
        registrationRequired: true,
        contactEmail: 'coladeira@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-cachupa-cooking-culture',
        name: 'Cachupa Cooking Culture - Heart of Cape Verdean Food',
        namePortuguese: 'Cultura Culinária da Cachupa - Coração da Comida Cabo-verdiana',
        description: 'Discover the soul of Cape Verdean cuisine through hands-on Cachupa cooking workshops, learning to prepare the national dish that brings families together with its incredible one-pot meal traditions and island flavors',
        descriptionPortuguese: 'Descubra a alma da culinária cabo-verdiana através de workshops práticos de culinária Cachupa, aprendendo a preparar o prato nacional que une famílias com suas incríveis tradições de refeições numa panela e sabores das ilhas',
        type: 'cultural_workshop',
        targetAudience: ['Food enthusiasts', 'Cultural cooking lovers', 'Cape Verdean families', 'Community meal organizers'],
        duration: 'Monthly intensive workshops',
        cost: '£45 per workshop (includes ingredients)',
        schedule: 'Second Sunday of each month (2:00-6:00 PM)',
        maxParticipants: 16,
        certification: false,
        registrationRequired: true,
        contactEmail: 'cachupa@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-batuko-womens-circles',
        name: 'Batuko Women\'s Music Circles - Vocal Harmonies & Sisterhood',
        namePortuguese: 'Círculos Femininos de Batuko - Harmonias Vocais e Irmandade',
        description: 'Traditional women\'s music circles featuring Cape Verde\'s powerful Batuko tradition, where women come together to create incredible vocal harmonies, share stories, and maintain cultural bonds through music',
        descriptionPortuguese: 'Círculos tradicionais de música feminina apresentando a poderosa tradição Batuko de Cabo Verde, onde mulheres se reúnem para criar harmonias vocais incríveis, compartilhar histórias e manter laços culturais através da música',
        type: 'cultural_workshop',
        targetAudience: ['Women of all ages', 'Cape Verdean heritage women', 'Vocal harmony enthusiasts', 'Cultural tradition keepers'],
        duration: 'Monthly women\'s gatherings',
        cost: '£15 per session / £50 per quarter',
        schedule: 'Third Saturday of each month (3:00-5:30 PM)',
        maxParticipants: 25,
        prerequisites: ['Women-only sessions', 'Respectful cultural appreciation'],
        certification: false,
        registrationRequired: true,
        contactEmail: 'batuko@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-funana-accordion-energy',
        name: 'Funaná Accordion Energy - High-Spirited Island Music',
        namePortuguese: 'Energia do Acordeão Funaná - Música Animada das Ilhas',
        description: 'Learn the high-energy accordion music that gets Cape Verdean communities moving, featuring traditional Funaná rhythms that create infectious joy and bring people together in spirited musical celebrations',
        descriptionPortuguese: 'Aprenda a música energética de acordeão que faz as comunidades cabo-verdianas se moverem, apresentando ritmos tradicionais de Funaná que criam alegria contagiante e unem pessoas em celebrações musicais animadas',
        type: 'cultural_workshop',
        targetAudience: ['Accordion players', 'Traditional music lovers', 'Cultural enthusiasts', 'Community musicians'],
        duration: '8-week intensive courses',
        cost: '£35 per session / £250 per course',
        schedule: 'Wednesday evenings (7:30-9:00 PM)',
        maxParticipants: 12,
        prerequisites: ['Basic accordion knowledge helpful but not required'],
        certification: false,
        registrationRequired: true,
        contactEmail: 'funana@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-island-festival-celebration',
        name: 'Cape Verdean Island Festival - Community Spirit Celebration',
        namePortuguese: 'Festival das Ilhas Cabo-verdianas - Celebração do Espírito Comunitário',
        description: 'Annual carnival-style celebration showcasing the incredible community spirit that makes Cape Verdean culture so special, featuring live music, traditional dancing, island food, and the warmth of Cape Verdean hospitality',
        descriptionPortuguese: 'Celebração anual estilo carnaval mostrando o espírito comunitário incrível que torna a cultura cabo-verdiana tão especial, apresentando música ao vivo, danças tradicionais, comida das ilhas e o calor da hospitalidade cabo-verdiana',
        type: 'event',
        targetAudience: ['Entire Cape Verdean community', 'Cultural enthusiasts', 'Families', 'Music and dance lovers'],
        duration: 'Annual weekend festival',
        cost: '£15 adults / £5 children / £35 families',
        schedule: 'Annual (July - Independence Day weekend)',
        maxParticipants: 500,
        certification: false,
        registrationRequired: false,
        contactEmail: 'festival@capeverdecultural.co.uk'
      },
      {
        id: 'cape-verde-creole-language-heart',
        name: 'Cape Verdean Creole Language Circle - Speaking from the Heart',
        namePortuguese: 'Círculo de Língua Crioula Cabo-verdiana - Falando do Coração',
        description: 'Warm and welcoming language circles where participants learn Cape Verdean Creole in a supportive community environment, celebrating the unique linguistic heritage that connects island hearts worldwide',
        descriptionPortuguese: 'Círculos de língua calorosos e acolhedores onde os participantes aprendem o crioulo cabo-verdiano num ambiente comunitário de apoio, celebrando a herança linguística única que conecta corações das ilhas no mundo todo',
        type: 'language_course',
        targetAudience: ['Language learners', 'Cape Verdean heritage individuals', 'Cultural enthusiasts', 'Community connectors'],
        duration: '12-week conversational courses',
        cost: '£120 per course',
        schedule: 'Tuesday evenings (6:30-8:00 PM)',
        maxParticipants: 18,
        certification: false,
        registrationRequired: true,
        contactEmail: 'creole@capeverdecultural.co.uk'
      }
    ],
    
    openingHours: {
      monday: 'Closed',
      tuesday: '18:00-21:00', // Creole language circles
      wednesday: '19:00-21:30', // Funaná accordion workshops
      thursday: '19:00-21:00', // Morna soul sessions
      friday: '18:00-22:00', // Social events and community gatherings
      saturday: '14:00-20:30', // Coladeira dance parties and cultural activities
      sunday: '13:00-18:00' // Cachupa cooking and family programs
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_CAPE_VERDE_DIRECTOR || 'Maria Antónia Fernandes',
      title: 'Cultural Director & Master Morna Singer',
      titlePortuguese: 'Diretora Cultural e Cantora Mestra de Morna',
      email: 'maria@capeverdecultural.co.uk',
      bio: 'Renowned Cape Verdean cultural ambassador and master Morna singer, dedicated to preserving the heartfelt musical traditions and community spirit that make Cape Verdean culture so beautifully unique and welcoming'
    },
    
    capacity: 120,
    facilities: [
      'Intimate acoustic performance space for Morna sessions',
      'Large dance hall with traditional music sound system',
      'Community kitchen for Cachupa cooking workshops',
      'Cultural exhibition space showcasing island heritage',
      'Traditional crafts workshop room with artisan tools',
      'Cozy storytelling corner for cultural sharing',
      'Musical instrument collection including accordion and cavaquinho',
      'Community gathering hall for festivals and celebrations',
      'Outdoor terrace for island-style social events'
    ],
    languages: ['Cape Verdean Creole', 'Portuguese', 'English'],
    
    partnerships: [
      'Cape Verde Embassy London',
      'Stockwell Portuguese-speaking community Centre',
      'London Cape Verdean Association',
      'Traditional Music Preservation Society',
      'Island Cultural Heritage Foundation',
      'Cape Verdean Musicians Network UK',
      'Community Arts Partnership London'
    ],
    accreditation: [
      'UK Registered Cultural Organization',
      'Cape Verdean Ministry of Culture Partner',
      'Traditional Arts Preservation Certificate'
    ],
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CAPE_VERDE_FACEBOOK || 'https://facebook.com/CapeVerdeCulturalLondon',
      instagram: process.env.NEXT_PUBLIC_CAPE_VERDE_INSTAGRAM || 'https://instagram.com/capeverde_music_soul',
      youtube: process.env.NEXT_PUBLIC_CAPE_VERDE_YOUTUBE || 'https://youtube.com/CapeVerdeanMusicSoul'
    },
    
    isActive: true,
    establishedYear: 2010,
    lastUpdated: '2024-08-22',
    description: 'Heartwarming Cape Verdean cultural center celebrating the soul-stirring music, joyful dance, incredible community spirit, and beautiful island traditions that make Cape Verdean culture so welcoming and emotionally rich. A place where Morna touches hearts, Coladeira brings joy, and island hospitality creates lasting cultural connections.',
    descriptionPortuguese: 'Centro cultural cabo-verdiano emocionante celebrando a música comovente, dança alegre, espírito comunitário incrível e belas tradições das ilhas que tornam a cultura cabo-verdiana tão acolhedora e emocionalmente rica. Um lugar onde a Morna toca corações, a Coladeira traz alegria e a hospitalidade das ilhas cria conexões culturais duradouras.'
  },

  {
    id: 'centro-cultural-angolano-london',
    name: process.env.NEXT_PUBLIC_ANGOLA_CENTER_NAME || 'Centro Cultural Angolano de Londres',
    namePortuguese: process.env.NEXT_PUBLIC_ANGOLA_CENTER_NAME_PT || 'Centro Cultural Angolano de Londres',
    type: 'lusophone_center',
    
    address: process.env.NEXT_PUBLIC_ANGOLA_CENTER_ADDRESS || 'Mayfair Business Centre, 8 Shepherd Street',
    postcode: process.env.NEXT_PUBLIC_ANGOLA_CENTER_POSTCODE || 'W1J 7JE',
    city: 'London',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1478
    },
    
    phone: process.env.NEXT_PUBLIC_ANGOLA_CENTER_PHONE || '+44 20 7495 1752',
    email: process.env.NEXT_PUBLIC_ANGOLA_CENTER_EMAIL || 'info@centroangolalondres.co.uk',
    website: process.env.NEXT_PUBLIC_ANGOLA_CENTER_WEBSITE || 'https://centroangolalondres.co.uk',
    
    services: [
      'Sensual Kizomba Social Dancing - Magnetic connection nights with live music',
      'Vibrant Semba Community Dancing - High-energy traditional celebrations',
      'Electric Kuduro Urban Dance Parties - Modern Angolan street culture',
      'Incredible Angolan Music Festivals - Traditional to contemporary sounds',
      'Amazing Muamba de Galinha Cooking Experiences - Family feast traditions',
      'Angolan Nightlife Tours - Discover London\'s vibrant Angolan social scene',
      'Traditional Drumming Circles - Powerful community percussion experiences',
      'Bold Street Food Journeys - Urban flavors and authentic market tours',
      'Luxury Angolan cultural events and sophisticated networking',
      'Elite business networking (Oil & Gas) and diamond industry connections',
      'High-end Angolan restaurant partnerships and private dining experiences',
      'Exclusive Angolan art exhibitions and contemporary cultural showcases',
      'Premium cultural consultancy services and heritage preservation'
    ],
    servicesPortuguese: [
      'Dança Social Sensual de Kizomba - Noites de conexão magnética com música ao vivo',
      'Dança Comunitária Vibrante de Semba - Celebrações tradicionais de alta energia',
      'Festas Urbanas Elétricas de Kuduro - Cultura de rua angolana moderna',
      'Festivais de Música Angolana Incríveis - Sons tradicionais a contemporâneos',
      'Experiências Culinárias Incríveis de Muamba de Galinha - Tradições de festa familiar',
      'Tours da Vida Noturna Angolana - Descubra a vibrante cena social angolana de Londres',
      'Círculos de Percussão Tradicionais - Experiências poderosas de percussão comunitária',
      'Jornadas de Comida de Rua Ousada - Sabores urbanos e tours autênticos de mercado',
      'Eventos culturais angolanos de luxo e networking sofisticado',
      'Networking empresarial de elite (Petróleo & Gás) e conexões da indústria de diamantes',
      'Parcerias com restaurantes angolanos de alta classe e experiências de jantar privadas',
      'Exposições exclusivas de arte angolana e showcases culturais contemporâneos',
      'Serviços de consultoria cultural premium e preservação do patrimônio'
    ],
    
    programs: [
      {
        id: 'angola-business-elite',
        name: 'Angola Business Elite Network',
        namePortuguese: 'Rede Empresarial de Elite Angolana',
        description: 'Exclusive networking for successful Angolan entrepreneurs and business leaders in oil, gas, diamonds, and luxury sectors',
        descriptionPortuguese: 'Networking exclusivo para empresários angolanos de sucesso e líderes empresariais em petróleo, gás, diamantes e setores de luxo',
        type: 'event',
        targetAudience: ['C-suite executives', 'Oil & Gas professionals', 'Diamond industry leaders', 'Luxury entrepreneurs'],
        duration: 'Monthly exclusive events',
        cost: '£150 per member per month',
        schedule: 'First Thursday of each month (Private dining)',
        maxParticipants: 25,
        prerequisites: ['Business verification', 'Net worth assessment', 'Professional referrals'],
        certification: false,
        registrationRequired: true,
        contactEmail: 'elite@centroangolalondres.co.uk'
      },
      {
        id: 'angola-diamond-capital-series',
        name: 'Angola: Africa\'s Diamond Capital - Investment Series',
        namePortuguese: 'Angola: Capital dos Diamantes de África - Série de Investimentos',
        description: 'High-level investment seminars showcasing Angola\'s natural resource wealth and luxury development opportunities',
        descriptionPortuguese: 'Seminários de investimento de alto nível mostrando a riqueza de recursos naturais de Angola e oportunidades de desenvolvimento de luxo',
        type: 'certification',
        targetAudience: ['Investment professionals', 'Wealth managers', 'High-net-worth individuals', 'Private equity partners'],
        duration: '6-month series',
        cost: '£2,500 per series',
        schedule: 'Bi-monthly (3 hours per session)',
        maxParticipants: 15,
        prerequisites: ['Investment portfolio verification', 'Professional credentials'],
        certification: true,
        registrationRequired: true,
        contactEmail: 'investments@centroangolalondres.co.uk'
      },
      {
        id: 'angola-luxury-cuisine-masterclass',
        name: 'Sophisticated Angolan Cuisine & Wine Masterclass',
        namePortuguese: 'Masterclass de Culinária Angolana Sofisticada e Vinhos',
        description: 'Refined culinary experiences featuring elevated Angolan gastronomy paired with premium Portuguese and international wines',
        descriptionPortuguese: 'Experiências culinárias refinadas apresentando gastronomia angolana elevada combinada com vinhos portugueses e internacionais premium',
        type: 'cultural_workshop',
        targetAudience: ['Gastronomy enthusiasts', 'Luxury lifestyle connoisseurs', 'Cultural sophisticates'],
        duration: 'Weekend intensive',
        cost: '£450 per weekend',
        schedule: 'Monthly weekend sessions',
        maxParticipants: 12,
        certification: false,
        registrationRequired: true,
        contactEmail: 'cuisine@centroangolalondres.co.uk'
      },
      {
        id: 'angola-luanda-society-connections',
        name: 'Luanda High Society Cultural Exchange',
        namePortuguese: 'Intercâmbio Cultural da Alta Sociedade de Luanda',
        description: 'Exclusive cultural program connecting London\'s Angolan elite with Luanda\'s sophisticated social circles',
        descriptionPortuguese: 'Programa cultural exclusivo conectando a elite angolana de Londres com os círculos sociais sofisticados de Luanda',
        type: 'event',
        targetAudience: ['Angolan diaspora elite', 'Cultural ambassadors', 'High-society professionals'],
        duration: 'Quarterly programs',
        cost: '£800 per program',
        schedule: 'Quarterly weekend events',
        maxParticipants: 20,
        prerequisites: ['Social verification', 'Cultural ambassador status'],
        certification: false,
        registrationRequired: true,
        contactEmail: 'society@centroangolalondres.co.uk'
      },
      
      // NEW MAGNETIC ANGOLAN CULTURAL PROGRAMS
      {
        id: 'angola-magnetic-kizomba-series',
        name: 'Sensual Kizomba Mastery - Magnetic Connection Series',
        namePortuguese: 'Maestria de Kizomba Sensual - Série de Conexão Magnética',
        description: 'Master the art of sensual kizomba dancing through this magnetic series that teaches the romantic partner dance creating incredible connections. Professional instruction in Angola\'s most captivating cultural export.',
        descriptionPortuguese: 'Domine a arte da dança sensual de kizomba através desta série magnética que ensina a dança romântica de parceiros criando conexões incríveis. Instrução profissional na exportação cultural mais cativante de Angola.',
        type: 'cultural_workshop',
        targetAudience: ['Dance enthusiasts', 'Couples', 'Singles seeking connection', 'Cultural explorers'],
        duration: '8-week progressive series',
        cost: '£120 per series (£15 per class)',
        schedule: 'Weekly evening classes (2 hours each)',
        maxParticipants: 30,
        certification: false,
        registrationRequired: true,
        contactEmail: 'kizomba@centroangolalondres.co.uk'
      },
      
      {
        id: 'angola-vibrant-music-nights',
        name: 'Vibrant Angolan Music Nights - From Traditional to Modern',
        namePortuguese: 'Noites de Música Angolana Vibrante - Do Tradicional ao Moderno',
        description: 'Monthly celebration of Angola\'s incredible musical heritage featuring live performances of semba, kuduro, afrobeat fusion, and contemporary Angolan artists. Experience the sounds that make Angolan culture absolutely magnetic.',
        descriptionPortuguese: 'Celebração mensal do incrível patrimônio musical de Angola com apresentações ao vivo de semba, kuduro, fusão afrobeat e artistas angolanos contemporâneos. Experimente os sons que tornam a cultura angolana absolutamente magnética.',
        type: 'event',
        targetAudience: ['Music lovers', 'Angolan community', 'Cultural enthusiasts', 'All ages welcome'],
        duration: 'Monthly events',
        cost: '£25 per person',
        schedule: 'Last Saturday of each month (7pm-11pm)',
        maxParticipants: 80,
        certification: false,
        registrationRequired: true,
        contactEmail: 'music@centroangolalondres.co.uk'
      },
      
      {
        id: 'angola-incredible-food-culture',
        name: 'Incredible Angolan Food Culture Workshop',
        namePortuguese: 'Workshop de Cultura Alimentar Angolana Incrível',
        description: 'Learn to prepare amazing Angolan dishes including muamba de galinha, funge, calulu, and traditional accompaniments. Discover the bold flavors and rich food traditions that bring Angolan families together.',
        descriptionPortuguese: 'Aprenda a preparar pratos angolanos incríveis incluindo muamba de galinha, funge, calulu e acompanhamentos tradicionais. Descubra os sabores ousados e as ricas tradições alimentares que unem as famílias angolanas.',
        type: 'cultural_workshop',
        targetAudience: ['Food enthusiasts', 'Cultural learners', 'Angolan heritage families', 'Community members'],
        duration: 'Monthly 4-hour workshops',
        cost: '£45 per workshop',
        schedule: 'Second Sunday of each month (2pm-6pm)',
        maxParticipants: 16,
        certification: false,
        registrationRequired: true,
        contactEmail: 'cuisine@centroangolalondres.co.uk'
      },
      
      {
        id: 'angola-urban-culture-experience',
        name: 'Angolan Urban Culture & Street Art Experience',
        namePortuguese: 'Experiência de Cultura Urbana e Arte de Rua Angolana',
        description: 'Explore modern Angola\'s vibrant urban culture through street art workshops, contemporary music, and cultural storytelling. Connect with London\'s young Angolan artists and creators shaping contemporary culture.',
        descriptionPortuguese: 'Explore a vibrante cultura urbana da Angola moderna através de workshops de arte de rua, música contemporânea e narrativas culturais. Conecte-se com jovens artistas e criadores angolanos de Londres moldando a cultura contemporânea.',
        type: 'cultural_workshop',
        targetAudience: ['Young adults', 'Artists', 'Urban culture enthusiasts', 'Creative professionals'],
        duration: 'Bi-monthly weekend workshops',
        cost: '£35 per workshop',
        schedule: 'Every other Saturday (1pm-5pm)',
        maxParticipants: 20,
        certification: false,
        registrationRequired: true,
        contactEmail: 'urban@centroangolalondres.co.uk'
      }
    ],
    
    openingHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00', 
      wednesday: '09:00-18:00',
      thursday: '09:00-20:00', // Extended for business networking
      friday: '09:00-18:00',
      saturday: '10:00-16:00' // Weekend cultural events
    },
    
    director: {
      name: process.env.NEXT_PUBLIC_ANGOLA_DIRECTOR || 'Dr. Esperança Burity',
      title: 'Cultural & Business Director',
      titlePortuguese: 'Diretora Cultural e Empresarial',
      email: 'director@centroangolalondres.co.uk',
      bio: 'Former Angolan diplomatic attaché and luxury business consultant, specializing in high-end cultural programming and elite networking for the Angolan diaspora in London'
    },
    
    capacity: 80,
    facilities: [
      'Private dining room',
      'Executive boardroom',
      'Art gallery space', 
      'VIP lounge',
      'Cultural exhibition hall',
      'Business consultation suites',
      'Premium event space'
    ],
    languages: ['Portuguese', 'English', 'French'],
    
    partnerships: [
      'Angolan Embassy London',
      'London Diamond Bourse',
      'City of London Corporation',
      'Mayfair Private Members Clubs',
      'Anglo-Angolan Chamber of Commerce',
      'Luanda International Business Forum'
    ],
    accreditation: [
      'Angolan Ministry of Culture',
      'UK Registered Cultural Organization',
      'City of London Business Partner'
    ],
    
    socialMedia: {
      linkedin: process.env.NEXT_PUBLIC_ANGOLA_LINKEDIN || 'https://linkedin.com/company/centro-angolano-londres',
      instagram: process.env.NEXT_PUBLIC_ANGOLA_INSTAGRAM || 'https://instagram.com/angolacentrelondon',
      facebook: process.env.NEXT_PUBLIC_ANGOLA_FACEBOOK || 'https://facebook.com/CentroAngolanoLondres'
    },
    
    isActive: true,
    establishedYear: 2018,
    lastUpdated: '2024-08-22',
    description: 'Elite cultural center serving London\'s affluent Angolan diaspora, focusing on sophisticated cultural exchange, luxury business networking, and celebrating Angola as Africa\'s diamond capital',
    descriptionPortuguese: 'Centro cultural de elite servindo a próspera diáspora angolana de Londres, focando no intercâmbio cultural sofisticado, networking empresarial de luxo e celebrando Angola como a capital dos diamantes de África'
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