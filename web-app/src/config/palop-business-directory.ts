/**
 * PALOP Business Directory Configuration
 * Celebrating PALOP (African Portuguese-Speaking Countries) Business Excellence in the UK
 * Comprehensive directory of businesses owned by entrepreneurs from Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé and Príncipe
 */

export interface PALOPBusiness {
  id: string
  businessName: string
  businessNamePortuguese?: string
  ownerName: string
  ownerCountry: 'angola' | 'cape_verde' | 'guinea_bissau' | 'mozambique' | 'sao_tome_principe'
  
  // Business Classification
  category: 'restaurants' | 'import_export' | 'professional_services' | 'beauty_wellness' | 'retail' | 'consulting' | 'technology' | 'finance' | 'healthcare' | 'education' | 'construction' | 'transportation' | 'entertainment' | 'cultural_services'
  subcategory: string
  businessType: 'sole_trader' | 'partnership' | 'limited_company' | 'franchise'
  
  // Business Description
  description: string
  descriptionPortuguese: string
  specialties: string[]
  uniqueSellingPoint: string
  culturalConnection: string
  
  // Location & Contact
  address: string
  postcode: string
  city: string
  region: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  
  phone: string
  email: string
  website?: string
  
  // Business Hours
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday?: string
    sunday?: string
  }
  
  // Services & Products
  services: string[]
  servicesPortuguese: string[]
  priceRange: '£' | '££' | '£££' | '££££'
  paymentMethods: string[]
  languages: string[]
  
  // Cultural Elements
  culturalOfferings: string[]
  traditionalProducts?: string[]
  culturalEvents?: boolean
  communitySupport: string[]
  
  // Business Success
  establishedYear: number
  employees: number
  annualRevenue?: string
  awards?: string[]
  certifications: string[]
  
  // Customer & Community
  targetCustomers: string[]
  communityInvolvement: string[]
  socialImpact: string
  
  // Online Presence
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  
  // Reviews & Recognition
  averageRating: number
  totalReviews: number
  featuredReview?: string
  testimonials: string[]
  
  // Business Development
  expansionPlans?: string
  partnershipInterests: string[]
  investmentSeeking?: boolean
  mentoringOffered?: boolean
  
  // Metadata
  isActive: boolean
  isVerified: boolean
  isPremium: boolean
  featuredBusiness: boolean
  lastUpdated: string
  joinedDate: string
}

/**
 * PALOP Business Directory - Celebrating African Portuguese Entrepreneurial Excellence
 */
export const PALOP_BUSINESS_DIRECTORY: PALOPBusiness[] = [
  // ANGOLA 🇦🇴 - Business Excellence
  {
    id: 'angola-elite-diamonds-london',
    businessName: 'Elite Angolan Diamonds & Precious Stones London',
    businessNamePortuguese: 'Diamantes Angolanos de Elite e Pedras Preciosas Londres',
    ownerName: 'Carlos Burity Santos',
    ownerCountry: 'angola',
    
    category: 'retail',
    subcategory: 'Luxury Jewelry & Precious Stones',
    businessType: 'limited_company',
    
    description: 'Premier luxury jewelry boutique specializing in exquisite Angolan diamonds and precious stones. Showcasing Angola\'s position as Africa\'s diamond capital with ethically sourced, certified gems and bespoke jewelry design services.',
    descriptionPortuguese: 'Boutique de joias de luxo especializada em diamantes angolanos requintados e pedras preciosas. Mostrando a posição de Angola como capital dos diamantes de África com gemas de origem ética, certificadas e serviços de design de joias sob medida.',
    specialties: ['Angolan diamonds', 'Bespoke jewelry design', 'Precious stone consulting', 'Investment gems', 'Cultural jewelry'],
    uniqueSellingPoint: 'Only UK boutique specializing exclusively in certified Angolan diamonds with cultural heritage authentication',
    culturalConnection: 'Celebrates Angola as Africa\'s diamond capital while promoting ethical mining practices and cultural heritage preservation',
    
    address: '15 Hatton Garden',
    postcode: 'EC1N 8AT',
    city: 'London',
    region: 'Central London',
    coordinates: {
      latitude: 51.5194,
      longitude: -0.1063
    },
    
    phone: '+44 20 7242 8888',
    email: 'info@eliteangolandiamonds.co.uk',
    website: 'https://eliteangolandiamonds.co.uk',
    
    openingHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-19:00',
      friday: '10:00-18:00',
      saturday: '10:00-17:00'
    },
    
    services: [
      'Certified Angolan diamond sales',
      'Bespoke jewelry design',
      'Precious stone appraisals',
      'Investment consulting',
      'Cultural jewelry commissions',
      'Estate jewelry restoration'
    ],
    servicesPortuguese: [
      'Vendas de diamantes angolanos certificados',
      'Design de joias sob medida',
      'Avaliações de pedras preciosas',
      'Consultoria de investimentos',
      'Comissões de joias culturais',
      'Restauração de joias patrimoniais'
    ],
    priceRange: '££££',
    paymentMethods: ['Credit cards', 'Bank transfer', 'Cryptocurrency', 'Financing available'],
    languages: ['Portuguese', 'English', 'French'],
    
    culturalOfferings: [
      'Angolan heritage jewelry designs',
      'Cultural significance education',
      'Traditional symbolism incorporation',
      'Angola independence commemorative pieces'
    ],
    traditionalProducts: ['Angolan diamond cuts', 'Traditional African gold work', 'Cultural symbolic jewelry'],
    communitySupport: ['Angola cultural events sponsorship', 'PALOP business network support', 'Diamond industry education'],
    
    establishedYear: 2018,
    employees: 8,
    annualRevenue: '£2.5M+',
    awards: ['London Luxury Jeweller of the Year 2023', 'Ethical Diamond Retailer Award'],
    certifications: ['Kimberley Process Certified', 'UK Hallmarking Council', 'Luxury Goods Certified'],
    
    targetCustomers: ['Luxury jewelry collectors', 'Investment buyers', 'Angolan community', 'Cultural enthusiasts'],
    communityInvolvement: ['Angola Independence Day sponsorship', 'Diamond industry education programs', 'PALOP business mentoring'],
    socialImpact: 'Promotes ethical Angolan diamond trade while supporting community cultural events and business development',
    
    socialMedia: {
      instagram: 'https://instagram.com/eliteangolandiamonds',
      facebook: 'https://facebook.com/EliteAngolaDiamondsLondon',
      linkedin: 'https://linkedin.com/company/elite-angolan-diamonds'
    },
    
    averageRating: 4.9,
    totalReviews: 87,
    featuredReview: 'Incredible service and the most beautiful Angolan diamonds I\'ve ever seen. Carlos educated us about Angola\'s diamond heritage - truly special experience.',
    testimonials: [
      'The most authentic Angolan jewelry in London - exceptional quality and cultural knowledge',
      'Professional service with deep understanding of Angola\'s gem heritage',
      'Investment advice was excellent, diamonds are stunning'
    ],
    
    expansionPlans: 'Opening second location in Manchester, developing online certification platform',
    partnershipInterests: ['Angolan mining cooperatives', 'Luxury hotels', 'Cultural institutions'],
    investmentSeeking: false,
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-01-15'
  },

  {
    id: 'kizomba-connection-dance-studio',
    businessName: 'Kizomba Connection Dance Studio London',
    businessNamePortuguese: 'Estúdio de Dança Conexão Kizomba Londres',
    ownerName: 'Maria Esperança Fernandes',
    ownerCountry: 'angola',
    
    category: 'cultural_services',
    subcategory: 'Dance Instruction & Cultural Center',
    businessType: 'limited_company',
    
    description: 'London\'s premier Kizomba dance studio offering professional instruction in Angola\'s most sensual cultural export. From beginner classes to advanced workshops, we teach the art of connection through authentic Angolan partner dancing.',
    descriptionPortuguese: 'Premier estúdio de dança Kizomba de Londres oferecendo instrução profissional na exportação cultural mais sensual de Angola. De aulas iniciantes a workshops avançados, ensinamos a arte da conexão através da autêntica dança de parceiros angolana.',
    specialties: ['Kizomba instruction', 'Semba traditional dance', 'Partner connection workshops', 'Cultural dance education', 'Wedding dance preparation'],
    uniqueSellingPoint: 'Only London studio run by Angolan masters with direct lineage to original Kizomba creators',
    culturalConnection: 'Preserves and teaches authentic Angolan Kizomba culture while building romantic and social connections',
    
    address: '42 Elephant and Castle Shopping Centre',
    postcode: 'SE1 6TE',
    city: 'London',
    region: 'South London',
    coordinates: {
      latitude: 51.4947,
      longitude: -0.0996
    },
    
    phone: '+44 20 7703 5555',
    email: 'connect@kizombaconnection.co.uk',
    website: 'https://kizombaconnection.co.uk',
    
    openingHours: {
      monday: 'Closed',
      tuesday: '19:00-22:00',
      wednesday: '19:00-22:00',
      thursday: '19:00-22:00',
      friday: '19:00-23:00',
      saturday: '14:00-23:00',
      sunday: '14:00-20:00'
    },
    
    services: [
      'Kizomba beginner to advanced classes',
      'Semba traditional dance instruction',
      'Private couple workshops',
      'Wedding dance choreography',
      'Cultural dance appreciation courses',
      'Social dance events'
    ],
    servicesPortuguese: [
      'Aulas de Kizomba de iniciante a avançado',
      'Instrução de dança tradicional Semba',
      'Workshops privados para casais',
      'Coreografia de dança de casamento',
      'Cursos de apreciação de dança cultural',
      'Eventos de dança social'
    ],
    priceRange: '££',
    paymentMethods: ['Credit cards', 'Direct debit', 'Cash', 'PayPal'],
    languages: ['Portuguese', 'English', 'Spanish'],
    
    culturalOfferings: [
      'Authentic Angolan dance instruction',
      'Cultural context education',
      'Traditional music appreciation',
      'Partner connection philosophy',
      'Angolan cultural events'
    ],
    traditionalProducts: ['Kizomba music collections', 'Traditional dance attire', 'Cultural accessories'],
    culturalEvents: true,
    communitySupport: ['Free community classes monthly', 'Angola cultural event performances', 'Youth dance programs'],
    
    establishedYear: 2019,
    employees: 6,
    awards: ['Best Dance Studio South London 2023', 'Cultural Preservation Award'],
    certifications: ['Professional Dance Instruction Certificate', 'Cultural Arts Education License'],
    
    targetCustomers: ['Dance enthusiasts', 'Couples', 'Angolan community', 'Cultural explorers', 'Wedding couples'],
    communityInvolvement: ['Angola Independence Day performances', 'Community festival participation', 'School cultural programs'],
    socialImpact: 'Preserves Angolan dance culture while creating social connections and promoting cultural understanding',
    
    socialMedia: {
      instagram: 'https://instagram.com/kizombaconnectionlondon',
      facebook: 'https://facebook.com/KizombaConnectionStudio',
      youtube: 'https://youtube.com/KizombaConnectionDance',
      tiktok: 'https://tiktok.com/@kizombaconnection'
    },
    
    averageRating: 4.8,
    totalReviews: 156,
    featuredReview: 'Maria taught us authentic Kizomba for our wedding. The connection we learned extends far beyond dancing - it\'s about Angolan culture and real partnership.',
    testimonials: [
      'Best Kizomba instruction in London - authentic and passionate teaching',
      'Learning here connected me to my Angolan heritage in the most beautiful way',
      'The community here is amazing - made lifelong friends through dance'
    ],
    
    partnershipInterests: ['Cultural centers', 'Wedding venues', 'Music venues', 'Community organizations'],
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-02-01'
  },

  // CAPE VERDE 🇨🇻 - Island Culture & Music
  {
    id: 'morna-soul-music-academy',
    businessName: 'Morna Soul Music Academy & Cultural Center',
    businessNamePortuguese: 'Academia de Música Alma Morna e Centro Cultural',
    ownerName: 'António Silva Tavares',
    ownerCountry: 'cape_verde',
    
    category: 'cultural_services',
    subcategory: 'Music Education & Cultural Preservation',
    businessType: 'limited_company',
    
    description: 'London\'s authentic Cape Verdean music academy specializing in the soulful art of Morna - Cape Verde\'s blues. Teaching traditional island music, instruments, and the emotional depth that makes Cape Verdean culture so beautifully touching.',
    descriptionPortuguese: 'Academia autêntica de música cabo-verdiana de Londres especializada na arte da alma da Morna - o blues de Cabo Verde. Ensinando música tradicional das ilhas, instrumentos, e a profundidade emocional que torna a cultura cabo-verdiana tão lindamente tocante.',
    specialties: ['Morna vocal instruction', 'Cavaquinho guitar lessons', 'Cape Verdean cultural music', 'Traditional songwriting', 'Acoustic performance'],
    uniqueSellingPoint: 'Only UK academy preserving authentic Cape Verdean Morna traditions with master musicians from the islands',
    culturalConnection: 'Preserves Cape Verde\'s most precious musical heritage while teaching emotional expression through island music',
    
    address: '28 Golborne Road',
    postcode: 'W10 5PR',
    city: 'London',
    region: 'West London',
    coordinates: {
      latitude: 51.5213,
      longitude: -0.2058
    },
    
    phone: '+44 20 8960 3333',
    email: 'soul@mornasoul.co.uk',
    website: 'https://mornasoulacademy.co.uk',
    
    openingHours: {
      monday: 'Closed',
      tuesday: '18:00-21:00',
      wednesday: '18:00-21:00',
      thursday: '18:00-21:00',
      friday: '18:00-22:00',
      saturday: '14:00-22:00',
      sunday: '14:00-19:00'
    },
    
    services: [
      'Morna vocal instruction',
      'Cavaquinho guitar lessons',
      'Traditional Cape Verdean music courses',
      'Cultural music appreciation',
      'Acoustic performance coaching',
      'Song writing workshops'
    ],
    servicesPortuguese: [
      'Instrução vocal de Morna',
      'Aulas de cavaquinho',
      'Cursos de música tradicional cabo-verdiana',
      'Apreciação musical cultural',
      'Coaching de performance acústica',
      'Workshops de composição'
    ],
    priceRange: '££',
    paymentMethods: ['Credit cards', 'Direct debit', 'Cash', 'PayPal'],
    languages: ['Cape Verdean Creole', 'Portuguese', 'English'],
    
    culturalOfferings: [
      'Authentic Cape Verdean music education',
      'Traditional instrument instruction',
      'Cultural storytelling through music',
      'Island music history lessons',
      'Emotional expression workshops'
    ],
    traditionalProducts: ['Cape Verdean instruments', 'Traditional music recordings', 'Cultural songbooks'],
    culturalEvents: true,
    communitySupport: ['Free community Morna circles', 'Cape Verde cultural event performances', 'Youth music programs'],
    
    establishedYear: 2020,
    employees: 4,
    certifications: ['Music Education License', 'Cultural Arts Preservation Certificate'],
    
    targetCustomers: ['Music lovers', 'Cape Verdean community', 'Cultural enthusiasts', 'Musicians', 'Emotional expression seekers'],
    communityInvolvement: ['Cape Verde Independence celebrations', 'Island cultural festivals', 'Community storytelling events'],
    socialImpact: 'Preserves Cape Verdean musical heritage while providing emotional healing and cultural connection through music',
    
    socialMedia: {
      instagram: 'https://instagram.com/mornasoulacademy',
      facebook: 'https://facebook.com/MornaSoulMusicAcademy',
      youtube: 'https://youtube.com/MornaSoulAcademy'
    },
    
    averageRating: 4.9,
    totalReviews: 74,
    featuredReview: 'António taught me to sing Morna from the soul. It\'s not just music lessons - it\'s connecting to the heart of Cape Verdean culture.',
    testimonials: [
      'The most authentic Cape Verdean music education in London',
      'Learning Morna here healed my heart and connected me to my heritage',
      'Beautiful, soulful instruction that goes beyond technique to cultural understanding'
    ],
    
    partnershipInterests: ['Cultural centers', 'Music venues', 'Community organizations', 'Therapeutic music programs'],
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-03-10'
  },

  {
    id: 'cachupa-island-kitchen-restaurant',
    businessName: 'Cachupa Island Kitchen - Authentic Cape Verdean Restaurant',
    businessNamePortuguese: 'Cozinha da Ilha Cachupa - Restaurante Autêntico Cabo-verdiano',
    ownerName: 'Helena Santos Morais',
    ownerCountry: 'cape_verde',
    
    category: 'restaurants',
    subcategory: 'Cape Verdean Traditional Cuisine',
    businessType: 'limited_company',
    
    description: 'London\'s most authentic Cape Verdean restaurant serving traditional island cuisine with love. Famous for our incredible Cachupa - Cape Verde\'s national dish - and the warm island hospitality that makes every meal feel like family.',
    descriptionPortuguese: 'Restaurante cabo-verdiano mais autêntico de Londres servindo culinária tradicional das ilhas com amor. Famoso pela nossa Cachupa incrível - prato nacional de Cabo Verde - e pela calorosa hospitalidade das ilhas que faz cada refeição parecer família.',
    specialties: ['Authentic Cachupa variations', 'Fresh island seafood', 'Traditional Cape Verdean stews', 'Island-style grilled fish', 'Homemade traditional desserts'],
    uniqueSellingPoint: 'Only London restaurant serving traditional Cachupa exactly as prepared in Cape Verde islands with family recipes',
    culturalConnection: 'Brings authentic Cape Verdean family dining culture to London with traditional recipes and island hospitality',
    
    address: '156 Stockwell Road',
    postcode: 'SW9 9TQ',
    city: 'London',
    region: 'South London',
    coordinates: {
      latitude: 51.4727,
      longitude: -0.1223
    },
    
    phone: '+44 20 7733 4444',
    email: 'welcome@cachupaislandkitchen.co.uk',
    website: 'https://cachupaislandkitchen.co.uk',
    
    openingHours: {
      monday: 'Closed',
      tuesday: '17:00-22:00',
      wednesday: '17:00-22:00',
      thursday: '17:00-22:00',
      friday: '17:00-23:00',
      saturday: '12:00-23:00',
      sunday: '12:00-21:00'
    },
    
    services: [
      'Traditional Cape Verdean dining',
      'Family-style meal sharing',
      'Cultural dining experiences',
      'Private group bookings',
      'Catering for Cape Verdean events',
      'Cachupa cooking workshops'
    ],
    servicesPortuguese: [
      'Jantar tradicional cabo-verdiano',
      'Refeições familiares compartilhadas',
      'Experiências culturais gastronômicas',
      'Reservas privadas para grupos',
      'Catering para eventos cabo-verdianos',
      'Workshops de culinária Cachupa'
    ],
    priceRange: '££',
    paymentMethods: ['Credit cards', 'Cash', 'Contactless'],
    languages: ['Cape Verdean Creole', 'Portuguese', 'English'],
    
    culturalOfferings: [
      'Traditional Cape Verdean dining atmosphere',
      'Family-style service culture',
      'Island music during dining',
      'Cultural food education',
      'Traditional cooking workshops'
    ],
    traditionalProducts: ['Authentic Cachupa', 'Traditional Cape Verdean desserts', 'Island spice blends', 'Grogue (traditional spirit)'],
    culturalEvents: true,
    communitySupport: ['Cape Verde cultural event catering', 'Community cooking classes', 'Family celebration hosting'],
    
    establishedYear: 2017,
    employees: 7,
    awards: ['Best Cape Verdean Restaurant London 2023', 'Authentic Cultural Cuisine Award'],
    certifications: ['Food Safety Excellence', 'Cultural Cuisine Authenticity'],
    
    targetCustomers: ['Cape Verdean community', 'Island food lovers', 'Cultural cuisine enthusiasts', 'Families'],
    communityInvolvement: ['Cape Verde Independence Day celebrations', 'Cultural food festivals', 'Community gathering hosting'],
    socialImpact: 'Preserves Cape Verdean culinary traditions while providing community gathering space and cultural education through food',
    
    socialMedia: {
      instagram: 'https://instagram.com/cachupaislandkitchen',
      facebook: 'https://facebook.com/CachupaIslandKitchen',
      youtube: 'https://youtube.com/CachupaKitchenLondon'
    },
    
    averageRating: 4.8,
    totalReviews: 203,
    featuredReview: 'Helena\'s Cachupa tastes exactly like my grandmother\'s in Cape Verde. This is the real island experience - food made with love and tradition.',
    testimonials: [
      'The most authentic Cape Verdean food in London - tastes like home',
      'Family atmosphere with incredible traditional flavors',
      'Helena treats every customer like family - amazing cultural experience'
    ],
    
    expansionPlans: 'Opening weekend island brunch service, developing cooking class program',
    partnershipInterests: ['Cape Verdean cultural centers', 'Island tourism promotion', 'Community organizations'],
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-01-20'
  },

  // MOZAMBIQUE 🇲🇿 - Coastal Culture
  {
    id: 'mozambique-coastal-spice-trading',
    businessName: 'Mozambique Coastal Spice Trading Company',
    businessNamePortuguese: 'Companhia de Comércio de Especiarias Costeiras de Moçambique',
    ownerName: 'Fernando Machel Samora',
    ownerCountry: 'mozambique',
    
    category: 'import_export',
    subcategory: 'Spices, Condiments & Traditional Products',
    businessType: 'limited_company',
    
    description: 'Premier importer of authentic Mozambican spices and coastal specialties. Bringing the incredible flavors of Mozambique\'s Indian Ocean heritage to the United Kingdom through traditional peri-peri, coastal spices, and cultural food products.',
    descriptionPortuguese: 'Importador premier de especiarias autênticas moçambicanas e especialidades costeiras. Trazendo os sabores incríveis da herança do Oceano Índico de Moçambique para o Reino Unido através de peri-peri tradicional, especiarias costeiras e produtos alimentares culturais.',
    specialties: ['Authentic Mozambican peri-peri', 'Coastal spice blends', 'Traditional condiments', 'Coconut products', 'Seafood seasonings'],
    uniqueSellingPoint: 'Only UK importer with direct relationships with Mozambican coastal spice farmers and traditional producers',
    culturalConnection: 'Preserves Mozambican coastal culinary heritage while supporting traditional producers and bringing authentic flavors to diaspora communities',
    
    address: '78 Commercial Road',
    postcode: 'E1 1LN',
    city: 'London',
    region: 'East London',
    coordinates: {
      latitude: 51.5118,
      longitude: -0.0472
    },
    
    phone: '+44 20 7702 6666',
    email: 'flavors@mozambiquecoastalspice.co.uk',
    website: 'https://mozambiquecoastalspice.co.uk',
    
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '10:00-15:00'
    },
    
    services: [
      'Wholesale spice distribution',
      'Retail authentic Mozambican products',
      'Restaurant supply services',
      'Cultural cooking consultations',
      'Traditional recipe preservation',
      'Spice education workshops'
    ],
    servicesPortuguese: [
      'Distribuição grossista de especiarias',
      'Varejo de produtos moçambicanos autênticos',
      'Serviços de fornecimento para restaurantes',
      'Consultações culinárias culturais',
      'Preservação de receitas tradicionais',
      'Workshops de educação sobre especiarias'
    ],
    priceRange: '££',
    paymentMethods: ['Credit cards', 'Bank transfer', 'Trade accounts', 'PayPal'],
    languages: ['Portuguese', 'English', 'Makua'],
    
    culturalOfferings: [
      'Authentic Mozambican spice education',
      'Traditional cooking method sharing',
      'Coastal cuisine cultural workshops',
      'Spice origin storytelling',
      'Cultural food preservation support'
    ],
    traditionalProducts: [
      'Traditional peri-peri varieties',
      'Coastal spice blends',
      'Coconut-based products',
      'Traditional condiments',
      'Seafood seasonings'
    ],
    communitySupport: ['Mozambican restaurant partnerships', 'Cultural cooking classes', 'Traditional producer support'],
    
    establishedYear: 2016,
    employees: 12,
    annualRevenue: '£800K+',
    awards: ['Best Specialist Food Importer 2023', 'Ethical Trade Partnership Award'],
    certifications: ['Fair Trade Certified', 'Organic Import License', 'Food Safety Excellence'],
    
    targetCustomers: ['Restaurants', 'Food retailers', 'Mozambican community', 'Spice enthusiasts', 'Cultural food lovers'],
    communityInvolvement: ['Mozambique Independence celebrations', 'Coastal cuisine festivals', 'Traditional producer support programs'],
    socialImpact: 'Supports Mozambican traditional producers while preserving coastal culinary heritage and providing authentic flavors to UK communities',
    
    socialMedia: {
      instagram: 'https://instagram.com/mozambiquecoastalspice',
      facebook: 'https://facebook.com/MozambiqueCoastalSpice',
      linkedin: 'https://linkedin.com/company/mozambique-coastal-spice'
    },
    
    averageRating: 4.7,
    totalReviews: 89,
    featuredReview: 'Fernando\'s peri-peri is exactly what I remember from Maputo. Supporting local Mozambican producers while bringing authentic flavors to London.',
    testimonials: [
      'The most authentic Mozambican spices in the UK - exceptional quality',
      'Professional wholesale service with deep cultural knowledge',
      'Supporting traditional producers while delivering amazing flavors'
    ],
    
    expansionPlans: 'Developing direct-from-farmer online platform, expanding to European markets',
    partnershipInterests: ['Mozambican cultural centers', 'African restaurants', 'Specialty food retailers'],
    investmentSeeking: false,
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-02-15'
  },

  // GUINEA-BISSAU 🇬🇼 - Community & Culture
  {
    id: 'guinea-bissau-community-arts-center',
    businessName: 'Guinea-Bissau Community Arts & Cultural Center',
    businessNamePortuguese: 'Centro de Artes Comunitárias e Cultural da Guiné-Bissau',
    ownerName: 'Amílcar Cabral Santos',
    ownerCountry: 'guinea_bissau',
    
    category: 'cultural_services',
    subcategory: 'Community Arts & Cultural Preservation',
    businessType: 'limited_company',
    
    description: 'Community-focused cultural center preserving Guinea-Bissau heritage through traditional arts, community workshops, cultural education, and providing a gathering space for the Guinea-Bissau diaspora to maintain their rich cultural traditions.',
    descriptionPortuguese: 'Centro cultural focado na comunidade preservando a herança da Guiné-Bissau através de artes tradicionais, workshops comunitários, educação cultural, e fornecendo um espaço de encontro para a diáspora da Guiné-Bissau manter suas ricas tradições culturais.',
    specialties: ['Traditional Guinea-Bissau arts', 'Community cultural workshops', 'Heritage preservation programs', 'Language maintenance classes', 'Cultural storytelling'],
    uniqueSellingPoint: 'Only UK center dedicated exclusively to preserving and sharing Guinea-Bissau cultural heritage and community traditions',
    culturalConnection: 'Preserves Guinea-Bissau cultural identity while strengthening community bonds and educating broader UK communities about West African Portuguese heritage',
    
    address: '95 Peckham High Street',
    postcode: 'SE15 5RS',
    city: 'London',
    region: 'South London',
    coordinates: {
      latitude: 51.4739,
      longitude: -0.0692
    },
    
    phone: '+44 20 7639 2222',
    email: 'community@guineabissaucultural.co.uk',
    website: 'https://guineabissauculturalcenter.co.uk',
    
    openingHours: {
      monday: 'Closed',
      tuesday: '18:00-21:00',
      wednesday: '18:00-21:00',
      thursday: '18:00-21:00',
      friday: '18:00-22:00',
      saturday: '14:00-22:00',
      sunday: '14:00-19:00'
    },
    
    services: [
      'Traditional arts workshops',
      'Cultural heritage education',
      'Language preservation classes',
      'Community gathering facilitation',
      'Cultural storytelling sessions',
      'Youth cultural programs'
    ],
    servicesPortuguese: [
      'Workshops de artes tradicionais',
      'Educação de patrimônio cultural',
      'Aulas de preservação de língua',
      'Facilitação de encontros comunitários',
      'Sessões de contos culturais',
      'Programas culturais juvenis'
    ],
    priceRange: '£',
    paymentMethods: ['Cash', 'Bank transfer', 'Community contributions'],
    languages: ['Portuguese', 'Crioulo', 'Balanta', 'Fula', 'English'],
    
    culturalOfferings: [
      'Authentic Guinea-Bissau cultural education',
      'Traditional craft instruction',
      'Community storytelling preservation',
      'Language maintenance programs',
      'Cultural identity strengthening'
    ],
    traditionalProducts: ['Traditional crafts', 'Cultural art pieces', 'Community publications'],
    culturalEvents: true,
    communitySupport: [
      'Free community cultural programs',
      'Guinea-Bissau Independence celebrations',
      'Youth cultural identity support',
      'Elder cultural knowledge preservation'
    ],
    
    establishedYear: 2021,
    employees: 5,
    awards: ['Community Cultural Preservation Award 2023'],
    certifications: ['Community Arts Education License', 'Cultural Heritage Preservation Certificate'],
    
    targetCustomers: ['Guinea-Bissau community', 'PALOP community', 'Cultural preservationists', 'Youth programs'],
    communityInvolvement: [
      'Guinea-Bissau Independence Day coordination',
      'West African cultural festivals',
      'Community education programs',
      'Cultural identity workshops'
    ],
    socialImpact: 'Preserves Guinea-Bissau cultural heritage while strengthening community identity and educating broader communities about West African Portuguese culture',
    
    socialMedia: {
      facebook: 'https://facebook.com/GuineaBissauCulturalCenterLondon',
      instagram: 'https://instagram.com/guineabissauculture_uk'
    },
    
    averageRating: 4.8,
    totalReviews: 45,
    featuredReview: 'Amílcar creates a space where Guinea-Bissau culture thrives in London. My children learn their heritage and I reconnect with my roots.',
    testimonials: [
      'Essential community space preserving our Guinea-Bissau heritage',
      'Wonderful cultural education for children and adults',
      'Authentic community gathering place with deep cultural knowledge'
    ],
    
    partnershipInterests: ['West African cultural organizations', 'Community education centers', 'Cultural preservation societies'],
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: false,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-04-05'
  },

  // SÃO TOMÉ AND PRÍNCIPE 🇸🇹 - Island Paradise
  {
    id: 'sao-tome-cocoa-paradise-cafe',
    businessName: 'São Tomé Cocoa Paradise Café & Cultural Hub',
    businessNamePortuguese: 'Café Paraíso do Cacau de São Tomé e Centro Cultural',
    ownerName: 'Isabel Menezes Costa',
    ownerCountry: 'sao_tome_principe',
    
    category: 'restaurants',
    subcategory: 'Specialty Coffee & Cultural Café',
    businessType: 'limited_company',
    
    description: 'Unique cultural café specializing in premium São Tomé cocoa and coffee, celebrating the island paradise culture of São Tomé and Príncipe. Offering authentic island flavors, tropical atmosphere, and cultural experiences in London\'s heart.',
    descriptionPortuguese: 'Café cultural único especializado em cacau e café premium de São Tomé, celebrando a cultura de paraíso das ilhas de São Tomé e Príncipe. Oferecendo sabores autênticos das ilhas, atmosfera tropical, e experiências culturais no coração de Londres.',
    specialties: ['Premium São Tomé cocoa products', 'Authentic island coffee', 'Tropical café atmosphere', 'Cultural education through café experience', 'Traditional island pastries'],
    uniqueSellingPoint: 'London\'s only café specializing exclusively in São Tomé and Príncipe cocoa and coffee with authentic island cultural atmosphere',
    culturalConnection: 'Showcases São Tomé\'s world-renowned cocoa heritage while creating a tropical island cultural experience in urban London',
    
    address: '234 Portobello Road',
    postcode: 'W11 1LJ',
    city: 'London',
    region: 'West London',
    coordinates: {
      latitude: 51.5158,
      longitude: -0.2057
    },
    
    phone: '+44 20 7727 3333',
    email: 'paradise@saotomecocoa.co.uk',
    website: 'https://saotomecacaoparadise.co.uk',
    
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-19:00',
      saturday: '09:00-19:00',
      sunday: '09:00-17:00'
    },
    
    services: [
      'Premium São Tomé cocoa beverages',
      'Authentic island coffee service',
      'Cultural café experiences',
      'Cocoa education workshops',
      'Island-style tropical breakfasts',
      'Cultural event hosting'
    ],
    servicesPortuguese: [
      'Bebidas premium de cacau de São Tomé',
      'Serviço autêntico de café das ilhas',
      'Experiências culturais de café',
      'Workshops de educação sobre cacau',
      'Cafés da manhã tropicais estilo ilha',
      'Hospedagem de eventos culturais'
    ],
    priceRange: '££',
    paymentMethods: ['Credit cards', 'Cash', 'Contactless', 'PayPal'],
    languages: ['Portuguese', 'English', 'Forro'],
    
    culturalOfferings: [
      'São Tomé cocoa heritage education',
      'Tropical island atmosphere creation',
      'Cultural music and ambiance',
      'Island lifestyle appreciation',
      'Paradise culture sharing'
    ],
    traditionalProducts: [
      'Premium São Tomé cocoa',
      'Traditional island coffee',
      'Tropical pastries',
      'Island spice blends',
      'Cultural cocoa products'
    ],
    culturalEvents: true,
    communitySupport: ['São Tomé cultural celebrations', 'Island heritage education', 'Small community gathering support'],
    
    establishedYear: 2022,
    employees: 6,
    awards: ['Best Specialty Coffee Shop Portobello 2023'],
    certifications: ['Fair Trade Coffee Certified', 'Organic Cocoa Specialist', 'Cultural Heritage Café'],
    
    targetCustomers: ['Coffee enthusiasts', 'São Tomé community', 'Tropical culture lovers', 'Cultural café seekers', 'Cocoa connoisseurs'],
    communityInvolvement: ['São Tomé Independence celebrations', 'Island culture festivals', 'Tropical conservation awareness'],
    socialImpact: 'Promotes São Tomé\'s cocoa heritage while supporting island producers and creating awareness of tropical island culture and conservation',
    
    socialMedia: {
      instagram: 'https://instagram.com/saotomecocoaparadise',
      facebook: 'https://facebook.com/SaoTomeCacaoParadiseLondon',
      youtube: 'https://youtube.com/SaoTomeCocoaParadise'
    },
    
    averageRating: 4.6,
    totalReviews: 67,
    featuredReview: 'Isabel brings the warmth and beauty of São Tomé to London. The cocoa is incredible and the island atmosphere is so authentic and welcoming.',
    testimonials: [
      'The best cocoa in London with authentic São Tomé island atmosphere',
      'Cultural experience through coffee - educational and delicious',
      'Feels like a tropical escape with amazing São Tomé flavors'
    ],
    
    partnershipInterests: ['São Tomé cocoa producers', 'Tropical culture organizations', 'Environmental conservation groups'],
    mentoringOffered: true,
    
    isActive: true,
    isVerified: true,
    isPremium: true,
    featuredBusiness: true,
    lastUpdated: '2024-08-24',
    joinedDate: '2024-06-01'
  }
]

/**
 * Get PALOP businesses by country
 */
export function getPALOPBusinessesByCountry(country: PALOPBusiness['ownerCountry']): PALOPBusiness[] {
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.ownerCountry === country && business.isActive
  )
}

/**
 * Get PALOP businesses by category
 */
export function getPALOPBusinessesByCategory(category: PALOPBusiness['category']): PALOPBusiness[] {
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.category === category && business.isActive
  )
}

/**
 * Get featured PALOP businesses
 */
export function getFeaturedPALOPBusinesses(): PALOPBusiness[] {
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.featuredBusiness && business.isActive
  )
}

/**
 * Get premium PALOP businesses
 */
export function getPremiumPALOPBusinesses(): PALOPBusiness[] {
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.isPremium && business.isActive
  )
}

/**
 * Get PALOP businesses by city
 */
export function getPALOPBusinessesByCity(city: string): PALOPBusiness[] {
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.city.toLowerCase() === city.toLowerCase() && business.isActive
  )
}

/**
 * Search PALOP businesses
 */
export function searchPALOPBusinesses(query: string): PALOPBusiness[] {
  const lowerQuery = query.toLowerCase()
  return PALOP_BUSINESS_DIRECTORY.filter(business => 
    business.isActive && (
      business.businessName.toLowerCase().includes(lowerQuery) ||
      business.description.toLowerCase().includes(lowerQuery) ||
      business.specialties.some(spec => spec.toLowerCase().includes(lowerQuery)) ||
      business.services.some(service => service.toLowerCase().includes(lowerQuery))
    )
  )
}

/**
 * PALOP Business Statistics
 */
export function getPALOPBusinessStats() {
  const activeBusinesses = PALOP_BUSINESS_DIRECTORY.filter(b => b.isActive)
  
  return {
    total: activeBusinesses.length,
    byCountry: {
      angola: getPALOPBusinessesByCountry('angola').length,
      cape_verde: getPALOPBusinessesByCountry('cape_verde').length,
      guinea_bissau: getPALOPBusinessesByCountry('guinea_bissau').length,
      mozambique: getPALOPBusinessesByCountry('mozambique').length,
      sao_tome_principe: getPALOPBusinessesByCountry('sao_tome_principe').length
    },
    featured: getFeaturedPALOPBusinesses().length,
    premium: getPremiumPALOPBusinesses().length,
    averageRating: activeBusinesses.reduce((sum, b) => sum + b.averageRating, 0) / activeBusinesses.length,
    totalEmployees: activeBusinesses.reduce((sum, b) => sum + b.employees, 0)
  }
}