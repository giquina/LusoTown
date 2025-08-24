/**
 * PALOP Cultural Events Configuration
 * Celebrating Países Africanos de Língua Oficial Portuguesa (African Portuguese-Speaking Countries)
 * Comprehensive cultural event system for Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé and Príncipe
 */

export interface PALOPCulturalEvent {
  id: string
  title: string
  titlePortuguese: string
  country: 'angola' | 'cape_verde' | 'guinea_bissau' | 'mozambique' | 'sao_tome_principe'
  category: 'independence' | 'music' | 'food' | 'heritage' | 'business' | 'community' | 'art'
  type: 'celebration' | 'workshop' | 'networking' | 'festival' | 'class' | 'performance'
  
  description: string
  descriptionPortuguese: string
  culturalSignificance: string
  culturalSignificancePortuguese: string
  
  // Event Details
  duration: string
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'special'
  season?: string
  traditionalMonth?: number
  
  // Cultural Elements
  music?: string[]
  food?: string[]
  traditions?: string[]
  language?: string[]
  
  // Community Impact
  targetAudience: string[]
  expectedAttendance: number
  communityBenefit: string
  
  // Business/Professional Elements
  networking?: boolean
  businessOpportunity?: string
  professionalDevelopment?: boolean
  
  // Practical Information
  venues: string[]
  priceRange: string
  bookingRequired: boolean
  dresscode?: string
  ageGroups: string[]
  
  // Cultural Education
  culturalLearning: string[]
  languageElement?: string
  heritageConnection: string
  
  // Social Media & Promotion
  hashtags: string[]
  promotionalEmoji: string
  flagEmoji: string
  
  isActive: boolean
  priority: 'high' | 'medium' | 'low'
  lastUpdated: string
}

/**
 * PALOP Cultural Events - Celebrating African Portuguese Heritage in the UK
 * Each country's most significant and engaging cultural celebrations
 */
export const PALOP_CULTURAL_EVENTS: PALOPCulturalEvent[] = [
  // ANGOLA 🇦🇴
  {
    id: 'angola-independence-celebration',
    title: 'Angola Independence Day Celebration - November Freedom Festival',
    titlePortuguese: 'Celebração da Independência de Angola - Festival da Liberdade de Novembro',
    country: 'angola',
    category: 'independence',
    type: 'celebration',
    
    description: 'Grand celebration of Angola\'s independence (November 11th) featuring powerful Semba and Kizomba performances, traditional Angolan cuisine, business networking for the thriving Angolan diaspora, and cultural pride celebrations that unite the Angolan community in London.',
    descriptionPortuguese: 'Grande celebração da independência de Angola (11 de novembro) com apresentações poderosas de Semba e Kizomba, culinária tradicional angolana, networking empresarial para a próspera diáspora angolana, e celebrações de orgulho cultural que unem a comunidade angolana em Londres.',
    culturalSignificance: 'Angola\'s independence represents resilience, cultural pride, and the beginning of a new era. This celebration honors Angolan heritage while showcasing the success of the Angolan community in the United Kingdom.',
    culturalSignificancePortuguese: 'A independência de Angola representa resistência, orgulho cultural e o início de uma nova era. Esta celebração honra a herança angolana enquanto mostra o sucesso da comunidade angolana no Reino Unido.',
    
    duration: '2-day weekend festival',
    frequency: 'annual',
    traditionalMonth: 11,
    season: 'autumn',
    
    music: ['Semba', 'Kizomba', 'Kuduro', 'Afrobeat fusion', 'Traditional drumming'],
    food: ['Muamba de galinha', 'Funge', 'Calulu', 'Mufete', 'Traditional Angolan desserts'],
    traditions: ['Traditional dress celebration', 'Cultural storytelling', 'Business showcase', 'Diaspora networking'],
    language: ['Portuguese', 'Umbundu', 'Kimbundu', 'Kikongo'],
    
    targetAudience: ['Angolan diaspora', 'PALOP community', 'African culture enthusiasts', 'Business professionals'],
    expectedAttendance: 400,
    communityBenefit: 'Strengthens Angolan cultural identity, promotes business connections, celebrates diaspora achievements, and educates broader community about Angolan heritage.',
    
    networking: true,
    businessOpportunity: 'Oil & gas, diamonds, luxury goods, import/export, cultural consulting',
    professionalDevelopment: true,
    
    venues: ['Cultural centers', 'Community halls', 'Business venues', 'Hotels'],
    priceRange: '£25-75',
    bookingRequired: true,
    dresscode: 'Traditional Angolan attire encouraged',
    ageGroups: ['All ages welcome', 'Family-friendly'],
    
    culturalLearning: [
      'Angolan independence history',
      'Traditional music and dance',
      'Angolan cuisine and hospitality',
      'Modern Angola achievements',
      'Diaspora success stories'
    ],
    languageElement: 'Portuguese with regional language introductions',
    heritageConnection: 'Celebrates Angolan freedom, resilience, and cultural pride while honoring diaspora achievements in the United Kingdom',
    
    hashtags: ['#AngolaIndependenceUK', '#AngolanPrideUK', '#PALOPPride', '#LusoTownAngola'],
    promotionalEmoji: '🎉🇦🇴',
    flagEmoji: '🇦🇴',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },
  
  {
    id: 'angola-kizomba-sensual-nights',
    title: 'Angolan Kizomba Sensual Dance Nights - Magnetic Connection',
    titlePortuguese: 'Noites Sensuais de Kizomba Angolana - Conexão Magnética',
    country: 'angola',
    category: 'music',
    type: 'performance',
    
    description: 'Monthly sensual Kizomba nights featuring Angola\'s most magnetic cultural export - intimate partner dancing that creates incredible connections. Professional instruction followed by social dancing with live Angolan musicians.',
    descriptionPortuguese: 'Noites mensais sensuais de Kizomba apresentando a exportação cultural mais magnética de Angola - dança íntima de parceiros que cria conexões incríveis. Instrução profissional seguida de dança social com músicos angolanos ao vivo.',
    culturalSignificance: 'Kizomba represents the romantic, sensual side of Angolan culture and has become a global phenomenon. These nights celebrate Angola\'s cultural influence worldwide.',
    culturalSignificancePortuguese: 'A Kizomba representa o lado romântico e sensual da cultura angolana e tornou-se um fenômeno global. Estas noites celebram a influência cultural de Angola no mundo.',
    
    duration: '4-hour evening events',
    frequency: 'monthly',
    
    music: ['Kizomba', 'Semba', 'Afrobeat', 'Zouk', 'Tarraxinha'],
    traditions: ['Partner dancing', 'Social connection', 'Musical appreciation'],
    
    targetAudience: ['Dance enthusiasts', 'Couples', 'Singles', 'Angolan community', 'Cultural explorers'],
    expectedAttendance: 120,
    communityBenefit: 'Promotes Angolan cultural exports, creates social connections, celebrates romantic partnership culture',
    
    networking: true,
    businessOpportunity: 'Dance instruction, event planning, music promotion',
    
    venues: ['Dance studios', 'Cultural centers', 'Event halls'],
    priceRange: '£20-35',
    bookingRequired: true,
    dresscode: 'Smart casual, comfortable for dancing',
    ageGroups: ['18+', 'Young adults', 'Adults'],
    
    culturalLearning: [
      'Kizomba dance techniques',
      'Angolan music appreciation',
      'Partner connection and respect',
      'Cultural significance of dance'
    ],
    heritageConnection: 'Celebrates Angola\'s global cultural influence through its most beloved dance export',
    
    hashtags: ['#KizombaLondon', '#AngolanDance', '#PALOPNights', '#SensualDancing'],
    promotionalEmoji: '💃🇦🇴',
    flagEmoji: '🇦🇴',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },

  // CAPE VERDE 🇨🇻
  {
    id: 'cape-verde-independence-celebration',
    title: 'Cape Verde Independence Day - Island Freedom Celebration',
    titlePortuguese: 'Dia da Independência de Cabo Verde - Celebração da Liberdade das Ilhas',
    country: 'cape_verde',
    category: 'independence',
    type: 'celebration',
    
    description: 'Joyful celebration of Cape Verde\'s independence (July 5th) featuring heartfelt Morna music, energetic Coladeira dancing, incredible Cachupa feasts, and the amazing community spirit that makes Cape Verdean culture so welcoming and beautiful.',
    descriptionPortuguese: 'Celebração alegre da independência de Cabo Verde (5 de julho) com música emocionante de Morna, dança energética de Coladeira, festas incríveis de Cachupa, e o espírito comunitário incrível que torna a cultura cabo-verdiana tão acolhedora e bonita.',
    culturalSignificance: 'Cape Verde\'s independence celebrates the unique island culture that blends African, Portuguese, and Atlantic influences into something beautifully distinct.',
    culturalSignificancePortuguese: 'A independência de Cabo Verde celebra a cultura única das ilhas que mistura influências africanas, portuguesas e atlânticas em algo lindamente distinto.',
    
    duration: 'Weekend festival',
    frequency: 'annual',
    traditionalMonth: 7,
    season: 'summer',
    
    music: ['Morna', 'Coladeira', 'Funaná', 'Batuko', 'Traditional Cape Verdean'],
    food: ['Cachupa', 'Pastéis', 'Canja', 'Fresh fish', 'Island specialties'],
    traditions: ['Island storytelling', 'Community singing', 'Traditional crafts', 'Cultural sharing'],
    language: ['Cape Verdean Creole', 'Portuguese'],
    
    targetAudience: ['Cape Verdean community', 'PALOP community', 'Island culture lovers', 'Music enthusiasts'],
    expectedAttendance: 350,
    communityBenefit: 'Celebrates Cape Verdean island culture, promotes community bonding, shares cultural traditions with broader UK community',
    
    venues: ['Community centers', 'Outdoor spaces', 'Cultural halls'],
    priceRange: '£15-50',
    bookingRequired: true,
    ageGroups: ['All ages', 'Family-friendly'],
    
    culturalLearning: [
      'Cape Verdean independence history',
      'Island music traditions',
      'Community values and hospitality',
      'Creole language basics',
      'Traditional crafts and arts'
    ],
    heritageConnection: 'Honors Cape Verde\'s unique island independence and the warmth of Cape Verdean community culture',
    
    hashtags: ['#CapeVerdeIndependenceUK', '#IslandPrideUK', '#PALOPHeritage', '#CapeverdeanCulture'],
    promotionalEmoji: '🏝️🇨🇻',
    flagEmoji: '🇨🇻',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },

  {
    id: 'cape-verde-morna-soul-sessions',
    title: 'Cape Verdean Morna Soul Sessions - Heartfelt Music Circles',
    titlePortuguese: 'Sessões de Alma Morna Cabo-verdiana - Círculos de Música do Coração',
    country: 'cape_verde',
    category: 'music',
    type: 'workshop',
    
    description: 'Intimate acoustic sessions celebrating Cape Verde\'s most emotional music - Morna, the island blues that touches souls with melancholic beauty. Learn traditional songs, understand cultural meaning, connect through heartfelt musical expression.',
    descriptionPortuguese: 'Sessões acústicas íntimas celebrando a música mais emocional de Cabo Verde - Morna, o blues das ilhas que toca almas com beleza melancólica. Aprenda canções tradicionais, entenda significado cultural, conecte-se através da expressão musical sincera.',
    culturalSignificance: 'Morna is Cape Verde\'s most precious cultural gift - music that expresses the deepest island emotions and connects Cape Verdean hearts worldwide.',
    culturalSignificancePortuguese: 'A Morna é o presente cultural mais precioso de Cabo Verde - música que expressa as emoções mais profundas das ilhas e conecta corações cabo-verdianos no mundo todo.',
    
    duration: '2-hour intimate sessions',
    frequency: 'weekly',
    
    music: ['Morna', 'Traditional Cape Verdean', 'Acoustic storytelling'],
    traditions: ['Musical storytelling', 'Emotional expression', 'Cultural sharing'],
    
    targetAudience: ['Music lovers', 'Cape Verdean heritage', 'Cultural enthusiasts', 'Musicians'],
    expectedAttendance: 25,
    communityBenefit: 'Preserves Cape Verdean musical heritage, creates emotional connections, shares cultural depth',
    
    venues: ['Intimate music venues', 'Cultural centers', 'Community spaces'],
    priceRange: '£20-30',
    bookingRequired: true,
    ageGroups: ['All ages', 'Music appreciation'],
    
    culturalLearning: [
      'Morna musical techniques',
      'Cape Verdean emotional expression',
      'Traditional song meanings',
      'Cultural storytelling through music'
    ],
    heritageConnection: 'Preserves and shares Cape Verde\'s most emotionally powerful musical tradition',
    
    hashtags: ['#MornaLondon', '#CapeVerdeanMusic', '#IslandSoul', '#PALOPMusic'],
    promotionalEmoji: '🎵🇨🇻',
    flagEmoji: '🇨🇻',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },

  // MOZAMBIQUE 🇲🇿
  {
    id: 'mozambique-independence-celebration',
    title: 'Mozambique Independence Day - Coastal Freedom Festival',
    titlePortuguese: 'Dia da Independência de Moçambique - Festival da Liberdade Costeira',
    country: 'mozambique',
    category: 'independence',
    type: 'celebration',
    
    description: 'Vibrant celebration of Mozambique\'s independence (June 25th) featuring energetic Marrabenta music, incredible coastal cuisine, cultural performances, and showcasing Mozambique\'s rich blend of African, Portuguese, and Indian Ocean influences.',
    descriptionPortuguese: 'Celebração vibrante da independência de Moçambique (25 de junho) com música energética de Marrabenta, culinária costeira incrível, apresentações culturais, e mostrando a rica mistura de influências africanas, portuguesas e do Oceano Índico de Moçambique.',
    culturalSignificance: 'Mozambique\'s independence celebrates a unique coastal culture that bridges Africa, Portugal, and the Indian Ocean trading routes.',
    culturalSignificancePortuguese: 'A independência de Moçambique celebra uma cultura costeira única que une África, Portugal e as rotas comerciais do Oceano Índico.',
    
    duration: 'Weekend celebration',
    frequency: 'annual',
    traditionalMonth: 6,
    season: 'summer',
    
    music: ['Marrabenta', 'Traditional Mozambican', 'Coastal rhythms', 'Indian Ocean fusion'],
    food: ['Prawns peri-peri', 'Matapa', 'Xima', 'Coconut curry', 'Coastal specialties'],
    traditions: ['Coastal culture', 'Spice trading heritage', 'Cultural fusion', 'Community celebration'],
    language: ['Portuguese', 'Makua', 'Sena', 'Local languages'],
    
    targetAudience: ['Mozambican diaspora', 'PALOP community', 'Coastal culture enthusiasts', 'Spice lovers'],
    expectedAttendance: 280,
    communityBenefit: 'Celebrates Mozambican coastal heritage, promotes cultural diversity, showcases diaspora achievements',
    
    venues: ['Cultural centers', 'Restaurants', 'Community halls'],
    priceRange: '£20-60',
    bookingRequired: true,
    ageGroups: ['All ages', 'Family-oriented'],
    
    culturalLearning: [
      'Mozambican independence history',
      'Coastal cultural traditions',
      'Spice route heritage',
      'Marrabenta music appreciation',
      'Indian Ocean cultural connections'
    ],
    heritageConnection: 'Honors Mozambique\'s unique position as a bridge between Africa, Portugal, and Indian Ocean cultures',
    
    hashtags: ['#MozambiqueIndependenceUK', '#CoastalPrideUK', '#PALOPDiversity', '#MozambicanCulture'],
    promotionalEmoji: '🌊🇲🇿',
    flagEmoji: '🇲🇿',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },

  // GUINEA-BISSAU 🇬🇼
  {
    id: 'guinea-bissau-independence-celebration',
    title: 'Guinea-Bissau Independence Day - Cultural Resilience Festival',
    titlePortuguese: 'Dia da Independência da Guiné-Bissau - Festival da Resistência Cultural',
    country: 'guinea_bissau',
    category: 'independence',
    type: 'celebration',
    
    description: 'Proud celebration of Guinea-Bissau\'s independence (September 24th) honoring the country\'s cultural resilience, traditional music, incredible community spirit, and the strength of the Guinea-Bissau diaspora in maintaining their heritage.',
    descriptionPortuguese: 'Celebração orgulhosa da independência da Guiné-Bissau (24 de setembro) honrando a resistência cultural do país, música tradicional, espírito comunitário incrível, e a força da diáspora da Guiné-Bissau em manter sua herança.',
    culturalSignificance: 'Guinea-Bissau\'s independence represents cultural resilience and the preservation of traditional West African heritage within Portuguese-speaking identity.',
    culturalSignificancePortuguese: 'A independência da Guiné-Bissau representa resistência cultural e a preservação da herança tradicional da África Ocidental dentro da identidade lusófona.',
    
    duration: 'Day-long celebration',
    frequency: 'annual',
    traditionalMonth: 9,
    season: 'autumn',
    
    music: ['Traditional Guinea-Bissau', 'West African rhythms', 'Gumbe', 'Cultural fusion'],
    food: ['Traditional stews', 'Rice dishes', 'West African specialties', 'Cultural foods'],
    traditions: ['Cultural storytelling', 'Traditional crafts', 'Community solidarity', 'Heritage preservation'],
    language: ['Portuguese', 'Crioulo', 'Balanta', 'Local languages'],
    
    targetAudience: ['Guinea-Bissau diaspora', 'PALOP community', 'West African culture enthusiasts'],
    expectedAttendance: 180,
    communityBenefit: 'Preserves Guinea-Bissau heritage, strengthens diaspora connections, educates about cultural resilience',
    
    venues: ['Community centers', 'Cultural spaces', 'Educational venues'],
    priceRange: '£15-40',
    bookingRequired: true,
    ageGroups: ['All ages', 'Community-focused'],
    
    culturalLearning: [
      'Guinea-Bissau independence struggle',
      'Traditional music and culture',
      'West African heritage',
      'Community resilience values',
      'Cultural preservation methods'
    ],
    heritageConnection: 'Celebrates Guinea-Bissau\'s cultural strength and the diaspora\'s commitment to heritage preservation',
    
    hashtags: ['#GuineaBissauIndependenceUK', '#CulturalResilienceUK', '#PALOPHeritage', '#WestAfricanPride'],
    promotionalEmoji: '💪🇬🇼',
    flagEmoji: '🇬🇼',
    
    isActive: true,
    priority: 'medium',
    lastUpdated: '2024-08-24'
  },

  // SÃO TOMÉ AND PRÍNCIPE 🇸🇹
  {
    id: 'sao-tome-independence-celebration',
    title: 'São Tomé and Príncipe Independence - Island Paradise Celebration',
    titlePortuguese: 'Independência de São Tomé e Príncipe - Celebração do Paraíso das Ilhas',
    country: 'sao_tome_principe',
    category: 'independence',
    type: 'celebration',
    
    description: 'Beautiful celebration of São Tomé and Príncipe\'s independence (July 12th) featuring the incredible natural paradise culture, traditional music, exceptional cocoa heritage, and the warm island hospitality of the São Tomé community.',
    descriptionPortuguese: 'Linda celebração da independência de São Tomé e Príncipe (12 de julho) apresentando a incrível cultura de paraíso natural, música tradicional, herança excepcional do cacau, e a calorosa hospitalidade das ilhas da comunidade são-tomense.',
    culturalSignificance: 'São Tomé and Príncipe represents the beauty of small island independence and the preservation of unique equatorial African-Portuguese culture.',
    culturalSignificancePortuguese: 'São Tomé e Príncipe representa a beleza da independência de pequenas ilhas e a preservação da cultura única africano-portuguesa equatorial.',
    
    duration: 'Weekend island celebration',
    frequency: 'annual',
    traditionalMonth: 7,
    season: 'summer',
    
    music: ['Traditional São Tomé', 'Island rhythms', 'Portuguese colonial fusion', 'Tropical sounds'],
    food: ['Cocoa specialties', 'Fresh fish', 'Tropical fruits', 'Traditional stews', 'Island delicacies'],
    traditions: ['Island hospitality', 'Cocoa heritage', 'Natural paradise appreciation', 'Community sharing'],
    language: ['Portuguese', 'Forro', 'Lungwa'],
    
    targetAudience: ['São Tomé diaspora', 'PALOP community', 'Island culture lovers', 'Paradise enthusiasts'],
    expectedAttendance: 120,
    communityBenefit: 'Celebrates unique island culture, promotes paradise conservation awareness, strengthens small diaspora community',
    
    venues: ['Cultural centers', 'Garden venues', 'Community spaces'],
    priceRange: '£18-45',
    bookingRequired: true,
    ageGroups: ['All ages', 'Family paradise theme'],
    
    culturalLearning: [
      'São Tomé independence history',
      'Island ecological culture',
      'Cocoa heritage and production',
      'Tropical island traditions',
      'Small community solidarity'
    ],
    heritageConnection: 'Celebrates the unique paradise island culture and community strength of São Tomé and Príncipe',
    
    hashtags: ['#SaoTomeIndependenceUK', '#IslandParadiseUK', '#PALOPIslands', '#SaoTomeCulture'],
    promotionalEmoji: '🏝️🇸🇹',
    flagEmoji: '🇸🇹',
    
    isActive: true,
    priority: 'medium',
    lastUpdated: '2024-08-24'
  },

  // CROSS-PALOP EVENTS
  {
    id: 'palop-business-excellence-summit',
    title: 'PALOP Business Excellence Summit - African Portuguese Entrepreneurship',
    titlePortuguese: 'Cúpula de Excelência Empresarial PALOP - Empreendedorismo Africano Português',
    country: 'angola', // Rotating lead
    category: 'business',
    type: 'networking',
    
    description: 'Elite annual summit celebrating business success across all PALOP countries - Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé. Featuring successful entrepreneurs, investment opportunities, trade connections, and the incredible business achievements of African Portuguese-speaking diaspora.',
    descriptionPortuguese: 'Cúpula elite anual celebrando sucesso empresarial em todos os países PALOP - Angola, Cabo Verde, Guiné-Bissau, Moçambique, São Tomé. Com empresários de sucesso, oportunidades de investimento, conexões comerciais, e as conquistas empresariais incríveis da diáspora africana lusófona.',
    culturalSignificance: 'Represents the collective business strength and entrepreneurial spirit of all African Portuguese-speaking nations united in the United Kingdom.',
    culturalSignificancePortuguese: 'Representa a força empresarial coletiva e espírito empreendedor de todas as nações africanas de língua portuguesa unidas no Reino Unido.',
    
    duration: '2-day summit',
    frequency: 'annual',
    
    targetAudience: ['PALOP business owners', 'Entrepreneurs', 'Investors', 'Professional leaders', 'Trade officials'],
    expectedAttendance: 300,
    communityBenefit: 'Promotes PALOP business success, creates investment opportunities, strengthens economic ties, celebrates diaspora achievements',
    
    networking: true,
    businessOpportunity: 'Cross-PALOP trade, investment opportunities, business partnerships, economic development',
    professionalDevelopment: true,
    
    venues: ['Business centers', 'Hotels', 'Conference facilities'],
    priceRange: '£150-500',
    bookingRequired: true,
    dresscode: 'Business professional',
    ageGroups: ['Professional adults'],
    
    culturalLearning: [
      'PALOP economic opportunities',
      'Cross-cultural business practices',
      'Investment landscape analysis',
      'Diaspora success strategies',
      'Pan-African Portuguese cooperation'
    ],
    heritageConnection: 'Celebrates the collective economic strength and business success of all PALOP nations in the United Kingdom',
    
    hashtags: ['#PALOPBusinessUK', '#AfricanPortugueseSuccess', '#PALOPEntrepreneurs', '#LusoAfricanBusiness'],
    promotionalEmoji: '🤝🌍',
    flagEmoji: '🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  },

  {
    id: 'palop-heritage-month-celebration',
    title: 'PALOP Heritage Month - Celebrating 50+ Years of Independence',
    titlePortuguese: 'Mês da Herança PALOP - Celebrando 50+ Anos de Independência',
    country: 'cape_verde', // Rotating coordination
    category: 'heritage',
    type: 'festival',
    
    description: 'Month-long celebration honoring 50+ years of PALOP independence, featuring rotating spotlights on each nation\'s achievements, cultural contributions, success stories, and the incredible resilience of African Portuguese-speaking communities in the United Kingdom.',
    descriptionPortuguese: 'Celebração de um mês honrando 50+ anos de independência PALOP, com destaques rotativos das conquistas de cada nação, contribuições culturais, histórias de sucesso, e a resistência incrível das comunidades africanas lusófonas no Reino Unido.',
    culturalSignificance: 'Celebrates over half a century of PALOP independence and the collective achievements of African Portuguese-speaking nations.',
    culturalSignificancePortuguese: 'Celebra mais de meio século de independência PALOP e as conquistas coletivas das nações africanas de língua portuguesa.',
    
    duration: 'Month-long series of events',
    frequency: 'annual',
    traditionalMonth: 11,
    season: 'autumn',
    
    music: ['All PALOP traditional music', 'Cultural fusion', 'Contemporary African Portuguese'],
    food: ['Dishes from all PALOP countries', 'Cultural food tours', 'Heritage cooking'],
    traditions: ['Independence ceremonies', 'Cultural showcases', 'Heritage exhibitions', 'Success celebrations'],
    
    targetAudience: ['All PALOP communities', 'African Portuguese diaspora', 'Cultural enthusiasts', 'Heritage preservationists'],
    expectedAttendance: 1200,
    communityBenefit: 'Celebrates collective PALOP heritage, educates about African Portuguese cultures, promotes unity and pride',
    
    venues: ['Multiple venues across London', 'Cultural institutions', 'Community centers', 'Public spaces'],
    priceRange: '£10-100 depending on event',
    bookingRequired: true,
    ageGroups: ['All ages', 'Intergenerational'],
    
    culturalLearning: [
      'PALOP independence movements',
      'Cultural preservation methods',
      'Diaspora contribution analysis',
      'Pan-African Portuguese cooperation',
      'Heritage celebration traditions'
    ],
    heritageConnection: 'Honors the collective journey of PALOP nations from independence to success in the global diaspora',
    
    hashtags: ['#PALOPHeritageMonthUK', '#50YearsPALOPPride', '#AfricanPortugueseHeritage', '#PALOPUnityUK'],
    promotionalEmoji: '🎉🌍',
    flagEmoji: '🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹',
    
    isActive: true,
    priority: 'high',
    lastUpdated: '2024-08-24'
  }
]

/**
 * Get PALOP events by country
 */
export function getPALOPEventsByCountry(country: PALOPCulturalEvent['country']): PALOPCulturalEvent[] {
  return PALOP_CULTURAL_EVENTS.filter(event => 
    event.country === country && event.isActive
  )
}

/**
 * Get PALOP events by category
 */
export function getPALOPEventsByCategory(category: PALOPCulturalEvent['category']): PALOPCulturalEvent[] {
  return PALOP_CULTURAL_EVENTS.filter(event => 
    event.category === category && event.isActive
  )
}

/**
 * Get all independence celebrations
 */
export function getPALOPIndependenceCelebrations(): PALOPCulturalEvent[] {
  return getPALOPEventsByCategory('independence')
}

/**
 * Get high priority PALOP events
 */
export function getHighPriorityPALOPEvents(): PALOPCulturalEvent[] {
  return PALOP_CULTURAL_EVENTS.filter(event => 
    event.priority === 'high' && event.isActive
  )
}

/**
 * Get PALOP events by month
 */
export function getPALOPEventsByMonth(month: number): PALOPCulturalEvent[] {
  return PALOP_CULTURAL_EVENTS.filter(event => 
    event.traditionalMonth === month && event.isActive
  )
}

/**
 * Get current month PALOP events
 */
export function getCurrentMonthPALOPEvents(): PALOPCulturalEvent[] {
  const currentMonth = new Date().getMonth() + 1
  return getPALOPEventsByMonth(currentMonth)
}

/**
 * PALOP Country Information
 */
export const PALOP_COUNTRIES = {
  angola: {
    name: 'Angola',
    namePortuguese: 'Angola',
    flag: '🇦🇴',
    independence: '1975-11-11',
    capital: 'Luanda',
    description: 'Africa\'s diamond capital with vibrant Kizomba culture',
    descriptionPortuguese: 'Capital dos diamantes de África com cultura vibrante de Kizomba'
  },
  cape_verde: {
    name: 'Cape Verde',
    namePortuguese: 'Cabo Verde',
    flag: '🇨🇻',
    independence: '1975-07-05',
    capital: 'Praia',
    description: 'Island paradise known for soulful Morna music',
    descriptionPortuguese: 'Paraíso das ilhas conhecido pela música Morna da alma'
  },
  guinea_bissau: {
    name: 'Guinea-Bissau',
    namePortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    independence: '1973-09-24',
    capital: 'Bissau',
    description: 'West African nation with rich cultural traditions',
    descriptionPortuguese: 'Nação da África Ocidental com ricas tradições culturais'
  },
  mozambique: {
    name: 'Mozambique',
    namePortuguese: 'Moçambique',
    flag: '🇲🇿',
    independence: '1975-06-25',
    capital: 'Maputo',
    description: 'Coastal nation blending African and Portuguese cultures',
    descriptionPortuguese: 'Nação costeira misturando culturas africanas e portuguesas'
  },
  sao_tome_principe: {
    name: 'São Tomé and Príncipe',
    namePortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    independence: '1975-07-12',
    capital: 'São Tomé',
    description: 'Tropical islands famous for cocoa and natural beauty',
    descriptionPortuguese: 'Ilhas tropicais famosas pelo cacau e beleza natural'
  }
} as const

/**
 * Get PALOP country information
 */
export function getPALOPCountryInfo(country: keyof typeof PALOP_COUNTRIES) {
  return PALOP_COUNTRIES[country]
}

/**
 * Get all PALOP flags as emoji string
 */
export function getAllPALOPFlags(): string {
  return Object.values(PALOP_COUNTRIES).map(country => country.flag).join('')
}