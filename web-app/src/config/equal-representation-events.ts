/**
 * Equal Representation Cultural Events Configuration
 * Ensuring all 8 Portuguese-speaking nations have cultural events representation
 */

export interface CulturalEvent {
  id: string
  name: string
  namePortuguese: string
  nation: string
  flag: string
  date: string
  description: string
  descriptionPortuguese: string
  culturalElements: string[]
  location: string
  significance: string
  category: 'independence' | 'cultural' | 'music' | 'food' | 'heritage' | 'religious'
  isRecurring: boolean
  attendanceExpected: number
  organizingPartner?: string
}

/**
 * COMPREHENSIVE CULTURAL EVENTS - ALL 8 NATIONS REPRESENTED
 */
export const EQUAL_REPRESENTATION_EVENTS: CulturalEvent[] = [
  
  // PORTUGAL 🇵🇹 EVENTS
  {
    id: 'portugal-day-celebration',
    name: 'Portugal Day Celebration',
    namePortuguese: 'Celebração do Dia de Portugal',
    nation: 'Portugal',
    flag: '🇵🇹',
    date: 'June 10',
    description: 'Celebrating Portuguese national day with traditional music, food, and cultural exhibitions',
    descriptionPortuguese: 'Celebrando o dia nacional português com música tradicional, comida e exposições culturais',
    culturalElements: ['Fado performances', 'Portuguese cuisine', 'Folk dancing', 'Cultural exhibitions'],
    location: 'Various UK cities',
    significance: 'Portugal National Day - celebrates Portuguese culture and heritage',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 2000,
    organizingPartner: 'Portuguese Embassy & Community Centers'
  },

  // BRAZIL 🇧🇷 EVENTS
  {
    id: 'brazilian-independence-day',
    name: 'Brazilian Independence Day Festival',
    namePortuguese: 'Festival do Dia da Independência do Brasil',
    nation: 'Brazil',
    flag: '🇧🇷',
    date: 'September 7',
    description: 'Vibrant celebration of Brazilian independence with samba, capoeira, and Brazilian cuisine',
    descriptionPortuguese: 'Celebração vibrante da independência brasileira com samba, capoeira e culinária brasileira',
    culturalElements: ['Samba performances', 'Capoeira demonstrations', 'Brazilian barbecue', 'Carnival-style parade'],
    location: 'London, Manchester, Birmingham',
    significance: 'Celebrates Brazil\'s independence and vibrant culture',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 3500,
    organizingPartner: 'Brazilian Community Centers UK'
  },

  // ANGOLA 🇦🇴 EVENTS
  {
    id: 'angola-independence-day',
    name: 'Angola Independence Day Celebration',
    namePortuguese: 'Celebração do Dia da Independência de Angola',
    nation: 'Angola',
    flag: '🇦🇴',
    date: 'November 11',
    description: 'Honoring Angolan independence with Kizomba dancing, traditional music, and Angolan cuisine',
    descriptionPortuguese: 'Honrando a independência angolana com dança Kizomba, música tradicional e culinária angolana',
    culturalElements: ['Kizomba dance workshops', 'Semba music', 'Traditional Angolan food', 'Cultural storytelling'],
    location: 'London, Manchester',
    significance: 'Celebrates Angola\'s independence and rich cultural heritage',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 1200,
    organizingPartner: 'Angolan Cultural Association UK'
  },

  // CAPE VERDE 🇨🇻 EVENTS
  {
    id: 'cape-verde-independence-day',
    name: 'Cape Verde Independence Day Festival',
    namePortuguese: 'Festival do Dia da Independência de Cabo Verde',
    nation: 'Cape Verde',
    flag: '🇨🇻',
    date: 'July 5',
    description: 'Soulful celebration featuring authentic Morna music, island cuisine, and Cape Verdean traditions',
    descriptionPortuguese: 'Celebração tocante com música Morna autêntica, culinária das ilhas e tradições cabo-verdianas',
    culturalElements: ['Morna vocal performances', 'Traditional island dances', 'Cape Verdean cuisine', 'Cultural poetry'],
    location: 'London, Bristol',
    significance: 'Celebrates Cape Verde independence and unique island culture',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 800,
    organizingPartner: 'Cape Verdean Community UK'
  },

  // MOZAMBIQUE 🇲🇿 EVENTS
  {
    id: 'mozambique-independence-day',
    name: 'Mozambique Independence Day Celebration',
    namePortuguese: 'Celebração do Dia da Independência de Moçambique',
    nation: 'Mozambique',
    flag: '🇲🇿',
    date: 'June 25',
    description: 'Vibrant celebration of Mozambican independence with traditional music, coastal cuisine, and cultural exhibitions',
    descriptionPortuguese: 'Celebração vibrante da independência moçambicana com música tradicional, culinária costeira e exposições culturais',
    culturalElements: ['Mozambican traditional music', 'Coastal cuisine tastings', 'Cultural dance performances', 'Heritage exhibitions'],
    location: 'London, Edinburgh',
    significance: 'Celebrates Mozambique independence and coastal cultural heritage',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 950,
    organizingPartner: 'Mozambican Association UK'
  },

  // GUINEA-BISSAU 🇬🇼 EVENTS (Previously Missing)
  {
    id: 'guinea-bissau-independence-day',
    name: 'Guinea-Bissau Independence Day Celebration',
    namePortuguese: 'Celebração do Dia da Independência da Guiné-Bissau',
    nation: 'Guinea-Bissau',
    flag: '🇬🇼',
    date: 'September 24',
    description: 'Honoring Guinea-Bissau independence with traditional Gumbe music, cultural dances, and authentic cashew-based foods',
    descriptionPortuguese: 'Honrando a independência da Guiné-Bissau com música Gumbe tradicional, danças culturais e comidas autênticas à base de caju',
    culturalElements: ['Gumbe music performances', 'Traditional dance workshops', 'Cashew product tastings', 'Cultural history presentations'],
    location: 'London, Birmingham, Bristol',
    significance: 'Celebrates Guinea-Bissau independence struggle and cultural resilience',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 600,
    organizingPartner: 'Guinea-Bissau Community Association UK'
  },

  // SÃO TOMÉ AND PRÍNCIPE 🇸🇹 EVENTS (Previously Missing)
  {
    id: 'sao-tome-independence-cocoa-festival',
    name: 'São Tomé Independence & Cocoa Heritage Festival',
    namePortuguese: 'Festival da Independência e Herança do Cacau de São Tomé',
    nation: 'São Tomé and Príncipe',
    flag: '🇸🇹',
    date: 'July 12',
    description: 'Celebrating São Tomé independence with world-class cocoa tastings, Ússua music, and traditional island culture',
    descriptionPortuguese: 'Celebrando a independência de São Tomé com degustações de cacau de classe mundial, música Ússua e cultura tradicional das ilhas',
    culturalElements: ['Premium cocoa tastings', 'Ússua music performances', 'Traditional island dances', 'Plantation heritage education'],
    location: 'Edinburgh, London',
    significance: 'Celebrates São Tomé independence and world-renowned cocoa heritage',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 450,
    organizingPartner: 'São Tomé Cultural Center UK'
  },

  // EAST TIMOR 🇹🇱 EVENTS (Previously Missing)
  {
    id: 'east-timor-independence-day',
    name: 'East Timor Independence Day & Coffee Festival',
    namePortuguese: 'Dia da Independência do Timor-Leste e Festival do Café',
    nation: 'East Timor (Timor-Leste)',
    flag: '🇹🇱',
    date: 'May 20',
    description: 'Unique celebration showcasing East Timor\'s recent independence, premium coffee culture, and Asian-Portuguese fusion heritage',
    descriptionPortuguese: 'Celebração única mostrando a recente independência do Timor-Leste, cultura do café premium e herança de fusão asiático-portuguesa',
    culturalElements: ['Traditional coffee ceremonies', 'Asian-Portuguese cultural fusion', 'Timorese textile exhibitions', 'Liberation history presentations'],
    location: 'Birmingham, Oxford, London',
    significance: 'Celebrates East Timor\'s unique Asian-Lusophone identity and recent independence achievement',
    category: 'independence',
    isRecurring: true,
    attendanceExpected: 350,
    organizingPartner: 'East Timor Cultural Association UK'
  },

  // MULTI-NATION LUSOPHONE EVENTS
  {
    id: 'lusophone-unity-festival',
    name: 'Lusophone Unity Festival - All Nations Celebration',
    namePortuguese: 'Festival de Unidade Lusófona - Celebração de Todas as Nações',
    nation: 'All Portuguese-speaking Nations',
    flag: '🌍',
    date: 'May 5 (Portuguese Language Day)',
    description: 'Grand celebration bringing together all 8 Portuguese-speaking cultures with music, food, and cultural exhibitions from every nation',
    descriptionPortuguese: 'Grande celebração reunindo todas as 8 culturas lusófonas com música, comida e exposições culturais de cada nação',
    culturalElements: [
      'Music from all 8 nations',
      'Food festival featuring all countries', 
      'Cultural workshops and exhibitions',
      'Language celebration activities',
      'Business networking opportunities'
    ],
    location: 'London (main), Manchester, Birmingham, Edinburgh',
    significance: 'Celebrates unity and diversity across all Portuguese-speaking nations',
    category: 'cultural',
    isRecurring: true,
    attendanceExpected: 5000,
    organizingPartner: 'Community of Portuguese Language Countries (CPLP) UK'
  },

  // SEASONAL CULTURAL EVENTS
  {
    id: 'palop-winter-cultural-festival',
    name: 'PALOP Winter Cultural Festival',
    namePortuguese: 'Festival Cultural de Inverno PALOP',
    nation: 'African Portuguese-speaking Nations',
    flag: '🌍',
    date: 'December 15-22',
    description: 'Week-long celebration featuring African Portuguese-speaking cultures during winter season',
    descriptionPortuguese: 'Celebração de uma semana com culturas africanas lusófonas durante a temporada de inverno',
    culturalElements: [
      'Angola Kizomba nights',
      'Cape Verde Morna evenings', 
      'Mozambique coastal cuisine',
      'Guinea-Bissau craft workshops',
      'São Tomé cocoa experiences'
    ],
    location: 'Various UK cities',
    significance: 'Highlights PALOP cultural richness during winter season',
    category: 'cultural',
    isRecurring: true,
    attendanceExpected: 2500,
    organizingPartner: 'PALOP Cultural Alliance UK'
  }
]

/**
 * EVENT ATTENDANCE PROJECTIONS BY NATION
 */
export const EVENT_ATTENDANCE_PROJECTIONS = {
  portugal: 2000,
  brazil: 3500,
  angola: 1200,
  cape_verde: 800,
  mozambique: 950,
  guinea_bissau: 600,
  sao_tome_principe: 450,
  east_timor: 350,
  multi_nation: 7500, // Combined multi-nation events
  total_projected: 17350
}

/**
 * CULTURAL EVENT CATEGORIES
 */
export const EVENT_CATEGORIES = {
  independence_days: 8, // All 8 nations have independence celebrations
  cultural_festivals: 3, // Multi-nation and seasonal events
  music_focused: 4, // Cape Verde, Angola, São Tomé, multi-nation
  food_focused: 6, // Most events include authentic cuisine
  heritage_education: 8, // All events include cultural education
  community_building: 10 // All events build community connections
}

/**
 * SEASONAL EVENT DISTRIBUTION
 */
export const SEASONAL_DISTRIBUTION = {
  spring: ['East Timor (May 20)', 'Multi-nation (May 5)'],
  summer: ['Portugal (June 10)', 'Mozambique (June 25)', 'Cape Verde (July 5)', 'São Tomé (July 12)'],
  autumn: ['Brazil (September 7)', 'Guinea-Bissau (September 24)', 'Angola (November 11)'],
  winter: ['PALOP Festival (December)']
}

/**
 * IMPLEMENTATION PRIORITIES
 */
export const EVENT_IMPLEMENTATION_PRIORITIES = {
  immediate: [
    'Add Guinea-Bissau Independence Day event (September 24)',
    'Add São Tomé Independence & Cocoa Festival (July 12)', 
    'Add East Timor Independence & Coffee Festival (May 20)',
    'Create Lusophone Unity Festival (May 5)'
  ],
  next_quarter: [
    'Establish partnerships with underrepresented nation community organizations',
    'Develop authentic cultural content for each event',
    'Create multilingual event materials (PT/EN)',
    'Set up event booking and attendance systems'
  ],
  ongoing: [
    'Monitor attendance balance across all nations',
    'Collect community feedback for cultural authenticity',
    'Expand event offerings based on community needs',
    'Build partnerships with cultural institutions'
  ]
}

export default EQUAL_REPRESENTATION_EVENTS