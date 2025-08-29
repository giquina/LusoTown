/**
 * PALOP Cultural Enhancement Configuration
 * Ensuring Equal Representation of All Portuguese-speaking Nations
 * Focus: Angola, Cape Verde, Mozambique, Guinea-Bissau, São Tomé and Príncipe, East Timor
 */

export interface CulturalEnhancement {
  id: string
  nation: string
  nationPortuguese: string
  flag: string
  priority: 'high' | 'medium' | 'low'
  category: 'testimonial' | 'business' | 'event' | 'visual' | 'story'
  enhancement: string
  implementation: string
  culturalSignificance: string
}

/**
 * COMPREHENSIVE PALOP REPRESENTATION ENHANCEMENTS
 */
export const PALOP_CULTURAL_ENHANCEMENTS: CulturalEnhancement[] = [
  
  // GUINEA-BISSAU 🇬🇼 TESTIMONIALS (Currently Missing)
  {
    id: 'guinea-bissau-testimonial-1',
    nation: 'Guinea-Bissau',
    nationPortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    priority: 'high',
    category: 'testimonial',
    enhancement: 'Add Guinea-Bissau community member testimonial to LusophoneTestimonials component',
    implementation: 'Create Maria Sanhá success story from Bissau → Bristol, agricultural business specialist',
    culturalSignificance: 'Guinea-Bissau has strong agricultural heritage and entrepreneurial spirit that needs representation'
  },
  
  {
    id: 'guinea-bissau-testimonial-2', 
    nation: 'Guinea-Bissau',
    nationPortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    priority: 'high',
    category: 'testimonial',
    enhancement: 'Add Guinea-Bissau professional success story highlighting integration achievements',
    implementation: 'Create João Vieira testimonial - healthcare professional from Bissau working in Manchester NHS',
    culturalSignificance: 'Showcases Guinea-Bissau professional excellence and NHS contribution'
  },

  // SÃO TOMÉ AND PRÍNCIPE 🇸🇹 TESTIMONIALS (Currently Missing)
  {
    id: 'sao-tome-testimonial-1',
    nation: 'São Tomé and Príncipe',
    nationPortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    priority: 'high',
    category: 'testimonial',
    enhancement: 'Add São Tomé and Príncipe island culture testimonial',
    implementation: 'Create Ana do Espírito Santo success story - cocoa business owner from São Tomé → Edinburgh',
    culturalSignificance: 'São Tomé cocoa heritage and island entrepreneurship needs visibility'
  },

  {
    id: 'sao-tome-testimonial-2',
    nation: 'São Tomé and Príncipe', 
    nationPortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    priority: 'high',
    category: 'testimonial',
    enhancement: 'Add São Tomé cultural preservation success story',
    implementation: 'Create Carlos Neves testimonial - cultural center founder preserving Santomean traditions in London',
    culturalSignificance: 'Highlights island cultural preservation and community building efforts'
  },

  // EAST TIMOR 🇹🇱 TESTIMONIALS (Currently Missing)
  {
    id: 'east-timor-testimonial-1',
    nation: 'East Timor',
    nationPortuguese: 'Timor-Leste',
    flag: '🇹🇱',
    priority: 'high', 
    category: 'testimonial',
    enhancement: 'Add East Timor/Timor-Leste community success story',
    implementation: 'Create Teresa Guterres testimonial - academic researcher from Dili → Oxford University',
    culturalSignificance: 'East Timor academic excellence and unique Asian-Lusophone identity'
  },

  {
    id: 'east-timor-testimonial-2',
    nation: 'East Timor',
    nationPortuguese: 'Timor-Leste', 
    flag: '🇹🇱',
    priority: 'high',
    category: 'testimonial',
    enhancement: 'Add East Timor cultural bridge-building story',
    implementation: 'Create Miguel Ximenes testimonial - cultural ambassador bridging Timorese and Portuguese communities',
    culturalSignificance: 'Showcases unique East Timor position bridging Asian and Lusophone cultures'
  },

  // BUSINESS DIRECTORY PALOP EXPANSION
  {
    id: 'guinea-bissau-businesses',
    nation: 'Guinea-Bissau',
    nationPortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    priority: 'high',
    category: 'business',
    enhancement: 'Add Guinea-Bissau businesses to PALOP_BUSINESS_DIRECTORY',
    implementation: 'Create Bissau Heritage Foods (cashew products), Guiné Import Services, traditional crafts business',
    culturalSignificance: 'Guinea-Bissau cashew industry and traditional crafts need business representation'
  },

  {
    id: 'sao-tome-businesses',
    nation: 'São Tomé and Príncipe',
    nationPortuguese: 'São Tomé e Príncipe', 
    flag: '🇸🇹',
    priority: 'high',
    category: 'business',
    enhancement: 'Add São Tomé businesses focusing on cocoa and island products',
    implementation: 'Create São Tomé Premium Cocoa Ltd, Island Paradise Travel Services, Santomean Cultural Center',
    culturalSignificance: 'São Tomé world-renowned cocoa heritage and tourism potential'
  },

  {
    id: 'east-timor-businesses',
    nation: 'East Timor',
    nationPortuguese: 'Timor-Leste',
    flag: '🇹🇱',
    priority: 'high', 
    category: 'business',
    enhancement: 'Add East Timor/Timor-Leste businesses highlighting unique Asian-Lusophone culture',
    implementation: 'Create Timor Coffee Company London, East Timor Cultural Association, Timorese-Portuguese Translation Services',
    culturalSignificance: 'East Timor coffee excellence and unique cultural position as Asian Portuguese-speaking nation'
  },

  // CULTURAL EVENTS EXPANSION
  {
    id: 'guinea-bissau-events',
    nation: 'Guinea-Bissau',
    nationPortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    priority: 'medium',
    category: 'event',
    enhancement: 'Add Guinea-Bissau Independence Day celebration (September 24)',
    implementation: 'Add to CULTURAL_EVENTS with Gumbe music, traditional dance, and cashew-based foods',
    culturalSignificance: 'Guinea-Bissau independence struggle heritage and traditional Gumbe music culture'
  },

  {
    id: 'sao-tome-events',
    nation: 'São Tomé and Príncipe',
    nationPortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    priority: 'medium',
    category: 'event', 
    enhancement: 'Add São Tomé Independence Day celebration (July 12) and Cocoa Festival',
    implementation: 'Add cultural events featuring Ússua music, traditional dances, and cocoa appreciation events',
    culturalSignificance: 'São Tomé island culture, cocoa heritage, and unique Creole music traditions'
  },

  {
    id: 'east-timor-events',
    nation: 'East Timor',
    nationPortuguese: 'Timor-Leste',
    flag: '🇹🇱',
    priority: 'medium',
    category: 'event',
    enhancement: 'Add East Timor Independence Day (May 20) and cultural events',
    implementation: 'Add events featuring Timorese traditional music, Asian-Portuguese fusion culture, coffee celebrations',
    culturalSignificance: 'East Timor recent independence (2002) and unique Asian-Lusophone identity'
  },

  // VISUAL REPRESENTATION ENHANCEMENTS
  {
    id: 'palop-visual-equality',
    nation: 'All PALOP Nations',
    nationPortuguese: 'Todas as Nações PALOP',
    flag: '🌍',
    priority: 'high',
    category: 'visual',
    enhancement: 'Ensure equal flag representation in all carousel and flag displays',
    implementation: 'Update RotatingFlagDisplay and ComprehensiveLusophoneExperience to give equal time to all 8 nations',
    culturalSignificance: 'Visual equality reinforces cultural equality and community representation'
  },

  {
    id: 'palop-cultural-imagery',
    nation: 'All PALOP Nations', 
    nationPortuguese: 'Todas as Nações PALOP',
    flag: '🌍',
    priority: 'medium',
    category: 'visual',
    enhancement: 'Add authentic cultural imagery from underrepresented PALOP nations',
    implementation: 'Include Guinea-Bissau masks, São Tomé cocoa plantations, East Timor traditional textiles in visual assets',
    culturalSignificance: 'Authentic visual representation strengthens cultural connection and pride'
  },

  // COMMUNITY STORY DIVERSITY
  {
    id: 'palop-success-stories',
    nation: 'All PALOP Nations',
    nationPortuguese: 'Todas as Nações PALOP', 
    flag: '🌍',
    priority: 'high',
    category: 'story',
    enhancement: 'Expand SUCCESS_STORIES config to include all 8 Portuguese-speaking nations equally',
    implementation: 'Add 2-3 success stories from each currently underrepresented nation with authentic cultural context',
    culturalSignificance: 'Equal storytelling ensures all community members see themselves represented and valued'
  },

  // LANGUAGE AND TERMINOLOGY UPDATES
  {
    id: 'inclusive-terminology',
    nation: 'All Portuguese-speaking Nations',
    nationPortuguese: 'Todas as Nações Lusófonas',
    flag: '🌍',
    priority: 'high',
    category: 'story',
    enhancement: 'Ensure consistent use of "Portuguese-speaking community" rather than limiting terms',
    implementation: 'Audit all text content to use inclusive terminology that encompasses all 8 nations',
    culturalSignificance: 'Inclusive language ensures all community members feel welcomed and represented'
  }
]

/**
 * SPECIFIC PALOP TESTIMONIAL ADDITIONS
 */
export const NEW_PALOP_TESTIMONIALS = [
  // Guinea-Bissau Testimonials
  {
    id: 'guinea-bissau-agricultural-success',
    name: 'Maria Sanhá',
    age: 35,
    heritage: 'Guinea-Bissau',
    flag: '🇬🇼',
    location: 'Bissau → Bristol',
    membershipType: 'Professional Member',
    quote: 'Through LusoTown, I connected with other PALOP entrepreneurs and learned about UK agricultural markets. My cashew import business now supplies premium nuts to restaurants across Britain, celebrating Guinea-Bissau\'s agricultural heritage.',
    achievement: 'Built UK cashew import business serving 40+ restaurants',
    businessValue: 'First Guinea-Bissau agricultural products distributor in Southwest England',
    profession: 'Agricultural Import Specialist & Cultural Ambassador',
    culturalContribution: 'Introducing authentic Guinea-Bissau cashew products to UK markets'
  },

  {
    id: 'guinea-bissau-healthcare-professional',
    name: 'Dr. João Vieira',
    age: 41,
    heritage: 'Guinea-Bissau', 
    flag: '🇬🇼',
    location: 'Bissau → Manchester',
    membershipType: 'Elite Member',
    quote: 'LusoTown helped me connect with other Portuguese-speaking healthcare professionals. Working in Manchester NHS, I now coordinate tropical medicine programs and help train staff on PALOP health practices. My Guinea-Bissau medical knowledge benefits UK healthcare.',
    achievement: 'Leads tropical medicine training programs for NHS Greater Manchester',
    businessValue: 'Enhanced NHS cultural competency for Portuguese-speaking patients',
    profession: 'NHS Consultant Physician & Tropical Medicine Specialist',
    culturalContribution: 'Bridging Guinea-Bissau medical practices with UK healthcare excellence'
  },

  // São Tomé and Príncipe Testimonials
  {
    id: 'sao-tome-cocoa-entrepreneur', 
    name: 'Ana do Espírito Santo',
    age: 38,
    heritage: 'São Tomé and Príncipe',
    flag: '🇸🇹',
    location: 'São Tomé → Edinburgh',
    membershipType: 'Founding Member',
    quote: 'LusoTown connected me with luxury chocolate makers across Scotland. My São Tomé Premium Cocoa business now supplies Edinburgh\'s finest chocolatiers with beans from my family\'s plantation. We\'re putting São Tomé cocoa heritage on the UK luxury map.',
    achievement: 'Supplies 12+ premium chocolatiers with authentic São Tomé cocoa',
    businessValue: '£300K+ annual revenue showcasing island cocoa heritage',
    profession: 'Premium Cocoa Importer & Island Heritage Ambassador',
    culturalContribution: 'Promoting São Tomé as world-class cocoa origin destination'
  },

  {
    id: 'sao-tome-cultural-center',
    name: 'Carlos Neves',
    age: 44,
    heritage: 'São Tomé and Príncipe',
    flag: '🇸🇹', 
    location: 'Príncipe Island → London',
    membershipType: 'Cultural Ambassador',
    quote: 'Starting the first São Tomé Cultural Center in London through connections made at LusoTown events. We preserve Tchiloli dramatic traditions, teach Ússua music, and celebrate our unique island culture. The Portuguese-speaking community embraces our island heritage.',
    achievement: 'Founded London\'s first São Tomé and Príncipe Cultural Center',
    businessValue: 'Cultural preservation and community education hub',
    profession: 'Cultural Center Director & Island Traditions Preservationist',
    culturalContribution: 'Preserving and sharing São Tomé dramatic and musical traditions'
  },

  // East Timor/Timor-Leste Testimonials
  {
    id: 'east-timor-academic-researcher',
    name: 'Dr. Teresa Guterres',
    age: 33,
    heritage: 'East Timor (Timor-Leste)',
    flag: '🇹🇱',
    location: 'Dili → Oxford',
    membershipType: 'Academic Member', 
    quote: 'LusoTown opened doors to Portuguese-speaking academic networks across Europe. My research on post-colonial Portuguese identity benefits from connections with scholars from all PALOP nations. East Timor\'s unique Asian-Lusophone perspective enriches academic discourse.',
    achievement: 'Published groundbreaking research on Asian-Lusophone identity',
    businessValue: 'First East Timorese researcher at Oxford Portuguese Studies Department',
    profession: 'Oxford University Research Fellow & Post-Colonial Studies Expert',
    culturalContribution: 'Advancing academic understanding of East Timor\'s unique cultural position'
  },

  {
    id: 'east-timor-cultural-ambassador',
    name: 'Miguel Ximenes',
    age: 29,
    heritage: 'East Timor (Timor-Leste)',
    flag: '🇹🇱',
    location: 'Dili → Birmingham', 
    membershipType: 'Cultural Bridge Builder',
    quote: 'Through LusoTown, I organize events that showcase East Timor as the bridge between Asian and Lusophone cultures. Our Timorese coffee ceremonies combined with Portuguese traditions create unique cultural fusion experiences that celebrate our distinctive identity.',
    achievement: 'Organizes monthly East Timor-Portuguese cultural fusion events', 
    businessValue: 'Cultural education and bridge-building between Asian and Lusophone communities',
    profession: 'Cultural Ambassador & East Timor Heritage Educator',
    culturalContribution: 'Showcasing East Timor\'s unique position as Asian Portuguese-speaking nation'
  }
]

/**
 * PALOP BUSINESS DIRECTORY ADDITIONS
 */
export const NEW_PALOP_BUSINESSES = [
  // Guinea-Bissau Businesses
  {
    id: 'bissau-heritage-foods',
    businessName: 'Bissau Heritage Foods - Premium Cashew & Traditional Products',
    businessNamePortuguese: 'Alimentos Herança de Bissau - Caju Premium e Produtos Tradicionais',
    ownerName: 'Amílcar Cabral Santos',
    ownerCountry: 'guinea_bissau',
    category: 'import_export',
    subcategory: 'Traditional Foods & Agricultural Products',
    description: 'Premium importer of authentic Guinea-Bissau cashew nuts and traditional products. Celebrating Guinea-Bissau as Africa\'s cashew capital with ethically sourced, premium nuts and traditional foods.',
    culturalSignificance: 'Guinea-Bissau cashew heritage and agricultural excellence',
    location: 'Birmingham',
    specialties: ['Premium cashew nuts', 'Traditional Guinea-Bissau foods', 'Agricultural products', 'Cultural food education']
  },

  // São Tomé and Príncipe Businesses  
  {
    id: 'sao-tome-premium-cocoa',
    businessName: 'São Tomé Premium Cocoa Company London',
    businessNamePortuguese: 'Companhia de Cacau Premium São Tomé Londres',
    ownerName: 'Isabel do Sacramento',
    ownerCountry: 'sao_tome_principe',
    category: 'import_export', 
    subcategory: 'Premium Cocoa & Chocolate Products',
    description: 'Luxury cocoa importer specializing in world-class São Tomé cocoa beans. Supplying UK\'s finest chocolatiers with premium beans from sustainable island plantations.',
    culturalSignificance: 'São Tomé world-renowned cocoa heritage and sustainable farming',
    location: 'Edinburgh',
    specialties: ['Premium cocoa beans', 'Sustainable plantation products', 'Luxury chocolate supplies', 'Cocoa education workshops']
  },

  // East Timor Businesses
  {
    id: 'timor-coffee-company-london',
    businessName: 'Timor Coffee Company London - Premium East Timor Coffee',
    businessNamePortuguese: 'Companhia de Café Timor Londres - Café Premium do Timor-Leste', 
    ownerName: 'António Ramos-Horta',
    ownerCountry: 'east_timor',
    category: 'import_export',
    subcategory: 'Premium Coffee & Cultural Products',
    description: 'Specialist importer of exceptional East Timor coffee beans. Showcasing Timor-Leste\'s high-altitude coffee excellence while supporting cooperative farmers and cultural preservation.',
    culturalSignificance: 'East Timor coffee excellence and cooperative farming heritage',
    location: 'London',
    specialties: ['High-altitude coffee beans', 'Cooperative farmer support', 'Cultural coffee ceremonies', 'Asian-Portuguese fusion products']
  }
]

/**
 * CULTURAL EVENTS ADDITIONS FOR UNDERREPRESENTED NATIONS
 */
export const NEW_PALOP_CULTURAL_EVENTS = [
  {
    id: 'guinea-bissau-independence-day',
    name: 'Guinea-Bissau Independence Day Celebration',
    namePortuguese: 'Celebração do Dia da Independência da Guiné-Bissau',
    date: 'September 24',
    description: 'Celebrating Guinea-Bissau independence with traditional Gumbe music, cultural dances, and authentic cashew-based foods.',
    culturalElements: ['Gumbe music performances', 'Traditional dance workshops', 'Cashew product tastings', 'Cultural history presentations'],
    location: 'Various London venues',
    significance: 'Honors Guinea-Bissau independence struggle and cultural resilience'
  },

  {
    id: 'sao-tome-cocoa-festival',
    name: 'São Tomé Cocoa Heritage Festival',
    namePortuguese: 'Festival da Herança do Cacau de São Tomé',
    date: 'July 12 (Independence Day period)',
    description: 'Celebrating São Tomé\'s world-class cocoa heritage with tastings, plantation history, and Ússua music performances.',
    culturalElements: ['Premium cocoa tastings', 'Plantation heritage education', 'Ússua music performances', 'Traditional island dances'],
    location: 'Edinburgh and London',
    significance: 'Showcases São Tomé as premier cocoa origin and island culture'
  },

  {
    id: 'east-timor-coffee-ceremony',
    name: 'East Timor Coffee & Cultural Ceremony',
    namePortuguese: 'Cerimônia do Café e Cultura do Timor-Leste',
    date: 'May 20 (Independence Day)',
    description: 'Unique cultural event showcasing East Timor\'s premium coffee culture combined with Asian-Portuguese cultural fusion.',
    culturalElements: ['Traditional coffee ceremonies', 'Asian-Portuguese cultural fusion', 'Timorese textile exhibitions', 'Liberation history presentations'],
    location: 'Birmingham and Oxford',
    significance: 'Celebrates East Timor\'s unique Asian-Lusophone identity and coffee excellence'
  }
]

/**
 * IMPLEMENTATION PRIORITY MATRIX
 */
export const PALOP_IMPLEMENTATION_PRIORITIES = {
  immediate: [
    'Add Guinea-Bissau, São Tomé, and East Timor testimonials to LusophoneTestimonials component',
    'Update business directory to include businesses from all underrepresented PALOP nations', 
    'Ensure flag rotation gives equal time to all 8 Portuguese-speaking nations',
    'Update terminology throughout platform to use "Portuguese-speaking community" consistently'
  ],
  nextSprint: [
    'Add PALOP cultural events to cultural calendar',
    'Create authentic cultural imagery for underrepresented nations',
    'Expand success stories configuration with equal representation',
    'Develop PALOP business showcase section'
  ],
  ongoing: [
    'Monitor representation balance across all platform content',
    'Collect authentic testimonials from underrepresented PALOP community members',
    'Partner with cultural organizations from all 8 nations',
    'Develop educational content about each nation\'s unique contributions'
  ]
}

/**
 * CULTURAL AUTHENTICITY GUIDELINES
 */
export const PALOP_CULTURAL_AUTHENTICITY = {
  guineaBissau: {
    keyElements: ['Gumbe music', 'Agricultural heritage', 'Cashew industry', 'Resistance culture', 'Traditional crafts'],
    avoidStereotypes: 'Focus on entrepreneurial spirit and agricultural innovation, not just historical struggles',
    celebrateUniqueness: 'World-class cashew production, rich musical traditions, resilient community spirit'
  },
  saoTomePrincipe: {
    keyElements: ['Cocoa excellence', 'Island culture', 'Ússua music', 'Tchiloli drama', 'Creole traditions'],
    avoidStereotypes: 'Emphasize world-class cocoa heritage and unique cultural contributions, not just small island status',
    celebrateUniqueness: 'Premier cocoa origin, unique dramatic traditions, sustainable island living'
  },
  eastTimor: {
    keyElements: ['Coffee excellence', 'Asian-Portuguese fusion', 'Recent independence', 'Mountain culture', 'Cultural resilience'],
    avoidStereotypes: 'Focus on unique Asian-Lusophone identity and achievements, not just recent independence struggles',
    celebrateUniqueness: 'Only Asian Portuguese-speaking nation, premium coffee heritage, cultural bridge-building'
  }
}

export default PALOP_CULTURAL_ENHANCEMENTS