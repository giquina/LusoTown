/**
 * Recurring Event System Configuration for Portuguese Cultural Celebrations
 * Comprehensive system for creating, managing, and scheduling recurring Portuguese cultural events
 * Following zero hardcoding policy and Portuguese cultural authenticity
 */

import { LUSOPHONE_CELEBRATIONS } from './lusophone-celebrations';
import { CULTURAL_EVENTS } from './cultural-events';

export interface RecurringEventPattern {
  id: string
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
  interval: number // Repeat every N days/weeks/months/years
  daysOfWeek?: number[] // 0=Sunday, 1=Monday, etc.
  dayOfMonth?: number // For monthly events
  monthOfYear?: number // For yearly events (1-12)
  endDate?: string
  maxOccurrences?: number
  skipHolidays?: boolean
  culturalContext?: {
    celebration: string // Link to LUSOPHONE_CELEBRATIONS id
    significance: string
  }
}

export interface RecurringEventTemplate {
  id: string
  name: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  category: string
  culturalOrigin: string[] // Countries involved
  flagEmojis: string
  pattern: RecurringEventPattern
  eventDefaults: {
    duration: number // minutes
    capacity: number
    price: number
    membershipRequired: 'free' | 'core' | 'premium'
    tags: string[]
  }
  venues: {
    primary: string
    alternates: string[]
  }
  organizationGuidelines: {
    en: string[]
    pt: string[]
  }
  culturalAuthenticity: {
    requiredElements: string[]
    educationalComponents: string[]
    communityInvolvement: string[]
  }
  marketingAssets: {
    images: string[]
    socialHashtags: string[]
    partnerOrganizations: string[]
  }
  isActive: boolean
  featured: boolean
}

/**
 * Portuguese Cultural Calendar Integration
 * Maps Portuguese cultural dates to recurring event opportunities
 */
export const PORTUGUESE_CULTURAL_CALENDAR = {
  // Portuguese National Holidays and Cultural Days
  'day-of-portugal': {
    date: '06-10', // June 10th
    name: { en: 'Portugal Day', pt: 'Dia de Portugal' },
    significance: { 
      en: 'Celebrates Portuguese national identity and Lusophone heritage worldwide', 
      pt: 'Celebra a identidade nacional portuguesa e a herança lusófona mundial' 
    },
    eventSuggestions: ['cultural-celebration', 'food-festival', 'music-concert']
  },
  'santos-populares': {
    date: '06-13', // June 13th (Santo António)
    name: { en: 'Santos Populares', pt: 'Santos Populares' },
    significance: { 
      en: 'Traditional Portuguese June celebrations with street parties and cultural festivities', 
      pt: 'Celebrações tradicionais portuguesas de junho com festas de rua e festividades culturais' 
    },
    eventSuggestions: ['street-festival', 'traditional-music', 'community-gathering']
  },
  'christmas-portuguese': {
    date: '12-25',
    name: { en: 'Portuguese Christmas', pt: 'Natal Português' },
    significance: { 
      en: 'Portuguese Christmas traditions including Consoada and family gatherings', 
      pt: 'Tradições natalinas portuguesas incluindo Consoada e encontros familiares' 
    },
    eventSuggestions: ['family-dinner', 'christmas-market', 'traditional-sweets']
  },
  // Brazilian Cultural Days
  'brazilian-independence': {
    date: '09-07',
    name: { en: 'Brazilian Independence Day', pt: 'Independência do Brasil' },
    significance: { 
      en: 'Celebrates Brazilian independence with green and yellow festivities', 
      pt: 'Celebra a independência brasileira com festividades verde e amarela' 
    },
    eventSuggestions: ['samba-party', 'brazilian-bbq', 'capoeira-demonstration']
  },
  'festa-junina': {
    date: '06-24', // São João
    name: { en: 'Festa Junina', pt: 'Festa Junina' },
    significance: { 
      en: 'Brazilian June festivals with quadrilha dancing and traditional foods', 
      pt: 'Festivais brasileiros de junho com dança quadrilha e comidas tradicionais' 
    },
    eventSuggestions: ['quadrilha-dancing', 'traditional-games', 'corn-festival']
  },
  'carnival-brazilian': {
    date: '02-variable', // 47 days before Easter
    name: { en: 'Brazilian Carnival', pt: 'Carnaval Brasileiro' },
    significance: { 
      en: 'World-famous Brazilian carnival with samba, costumes, and street parties', 
      pt: 'Carnaval brasileiro mundialmente famoso com samba, fantasias e festas de rua' 
    },
    eventSuggestions: ['samba-parade', 'costume-party', 'street-celebration']
  },
  // PALOP Countries Cultural Days
  'angola-independence': {
    date: '11-11',
    name: { en: 'Angola Independence Day', pt: 'Independência de Angola' },
    significance: { 
      en: 'Celebrates Angolan independence and Kizomba cultural heritage', 
      pt: 'Celebra a independência angolana e a herança cultural da Kizomba' 
    },
    eventSuggestions: ['kizomba-night', 'angolan-cuisine', 'cultural-exhibition']
  },
  'cape-verde-culture': {
    date: '03-18', // Culture Day
    name: { en: 'Cape Verde Culture Day', pt: 'Dia da Cultura Cabo-verdiana' },
    significance: { 
      en: 'Celebrates Cape Verdean Morna music and island culture', 
      pt: 'Celebra a música Morna cabo-verdiana e cultura das ilhas' 
    },
    eventSuggestions: ['morna-concert', 'island-cuisine', 'cultural-workshop']
  },
  'mozambique-independence': {
    date: '06-25',
    name: { en: 'Mozambique Independence Day', pt: 'Independência de Moçambique' },
    significance: { 
      en: 'Honors Mozambican independence and multicultural heritage', 
      pt: 'Honra a independência moçambicana e herança multicultural' 
    },
    eventSuggestions: ['cultural-fusion', 'traditional-music', 'art-exhibition']
  }
} as const;

/**
 * Predefined Recurring Event Templates for Portuguese Cultural Organizations
 */
export const RECURRING_EVENT_TEMPLATES: RecurringEventTemplate[] = [
  {
    id: 'weekly-fado-nights',
    name: {
      en: 'Weekly Authentic Fado Nights',
      pt: 'Noites de Fado Autêntico Semanais'
    },
    description: {
      en: 'Intimate weekly Fado performances celebrating Portuguese musical heritage with traditional singers and guitar accompaniment',
      pt: 'Apresentações semanais íntimas de Fado celebrando a herança musical portuguesa com cantores tradicionais e acompanhamento de guitarra'
    },
    category: 'music',
    culturalOrigin: ['Portugal'],
    flagEmojis: '🇵🇹🎵',
    pattern: {
      id: 'weekly-fado-pattern',
      type: 'weekly',
      interval: 1,
      daysOfWeek: [5], // Friday
      culturalContext: {
        celebration: 'fado-heritage',
        significance: 'Preserves and shares Portugal\'s UNESCO-recognized musical tradition'
      }
    },
    eventDefaults: {
      duration: 180, // 3 hours
      capacity: 80,
      price: 25,
      membershipRequired: 'free',
      tags: ['fado', 'portuguese-music', 'traditional', 'cultural', 'intimate']
    },
    venues: {
      primary: 'The Camden Assembly',
      alternates: ['Ronnie Scott\'s', 'Rich Mix London', 'Barbican Centre']
    },
    organizationGuidelines: {
      en: [
        'Ensure authentic Portuguese Fado singers and musicians',
        'Provide cultural context and history during performances',
        'Create intimate, respectful atmosphere similar to Lisbon Fado houses',
        'Offer Portuguese wine and traditional appetizers',
        'Include program notes in both English and Portuguese'
      ],
      pt: [
        'Garantir cantores e músicos de Fado portugueses autênticos',
        'Fornecer contexto cultural e história durante as apresentações',
        'Criar atmosfera íntima e respeitosa similar às casas de Fado de Lisboa',
        'Oferecer vinho português e aperitivos tradicionais',
        'Incluir notas de programa em inglês e português'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Professional Fado singers from Portugal',
        'Traditional Portuguese guitar accompaniment',
        'Historical context and storytelling',
        'Portuguese wine service',
        'Intimate, candle-lit atmosphere'
      ],
      educationalComponents: [
        'History of Fado in Portuguese culture',
        'UNESCO World Heritage significance',
        'Portuguese guitar techniques and construction',
        'Famous Fado singers and their contributions'
      ],
      communityInvolvement: [
        'Portuguese cultural organizations partnerships',
        'Community member testimonials and stories',
        'Intergenerational audience engagement',
        'Support for Portuguese artists in London'
      ]
    },
    marketingAssets: {
      images: ['/events/fado-night-authentic.jpg', '/events/portuguese-guitar.jpg'],
      socialHashtags: ['#FadoLondon', '#PortugueseHeritage', '#LusoTown', '#AuthenticFado'],
      partnerOrganizations: ['Instituto Camões London', 'Portuguese Embassy Cultural Department']
    },
    isActive: true,
    featured: true
  },
  {
    id: 'monthly-kizomba-socials',
    name: {
      en: 'Monthly Kizomba Social Dance Nights',
      pt: 'Noites Sociais de Kizomba Mensais'
    },
    description: {
      en: 'Monthly celebration of Angolan Kizomba dance culture with beginner lessons, social dancing, and live music from Portuguese-speaking Africa',
      pt: 'Celebração mensal da cultura de dança Kizomba angolana com aulas para iniciantes, dança social e música ao vivo da África lusófona'
    },
    category: 'dance',
    culturalOrigin: ['Angola', 'Cape Verde'],
    flagEmojis: '🇦🇴💃🎵',
    pattern: {
      id: 'monthly-kizomba-pattern',
      type: 'monthly',
      interval: 1,
      dayOfMonth: 15, // 15th of each month
      culturalContext: {
        celebration: 'kizomba-heritage',
        significance: 'Celebrates Angolan dance heritage and African lusophone culture'
      }
    },
    eventDefaults: {
      duration: 300, // 5 hours
      capacity: 150,
      price: 20,
      membershipRequired: 'free',
      tags: ['kizomba', 'angola', 'dance', 'social', 'african-culture', 'beginner-friendly']
    },
    venues: {
      primary: 'One Regent Street',
      alternates: ['The Place', 'Rich Mix London', 'Southbank Centre']
    },
    organizationGuidelines: {
      en: [
        'Begin with beginner-friendly Kizomba instruction',
        'Feature authentic Angolan and Cape Verdean music',
        'Emphasize respectful partner dance etiquette',
        'Include cultural education about Kizomba origins',
        'Create welcoming environment for all skill levels'
      ],
      pt: [
        'Começar com instrução de Kizomba amigável para iniciantes',
        'Apresentar música autêntica angolana e cabo-verdiana',
        'Enfatizar etiqueta respeitosa de dança de parceiros',
        'Incluir educação cultural sobre origens da Kizomba',
        'Criar ambiente acolhedor para todos os níveis de habilidade'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Angolan dance instructors and cultural experts',
        'Authentic Kizomba and Semba music selection',
        'Cultural context education during lessons',
        'Respectful partner dance environment',
        'Connection to Portuguese-speaking African heritage'
      ],
      educationalComponents: [
        'History of Kizomba in 1980s Angola',
        'Relationship between Semba and Kizomba',
        'Role of dance in Angolan and Cape Verdean culture',
        'Partner dance respect and consent practices'
      ],
      communityInvolvement: [
        'Angolan and Cape Verdean community partnerships',
        'Cross-cultural dance exchange opportunities',
        'Support for African diaspora artists',
        'Intergenerational cultural transmission'
      ]
    },
    marketingAssets: {
      images: ['/events/kizomba-social-dancing.jpg', '/events/angolan-culture.jpg'],
      socialHashtags: ['#KizombaLondon', '#AngolanCulture', '#AfricanDance', '#LusoTown'],
      partnerOrganizations: ['Centro Cultural Angolano Londres', 'Cape Verdean Community Association']
    },
    isActive: true,
    featured: true
  },
  {
    id: 'seasonal-brazilian-festivals',
    name: {
      en: 'Seasonal Brazilian Cultural Festivals',
      pt: 'Festivais Culturais Brasileiros Sazonais'
    },
    description: {
      en: 'Quarterly celebrations of Brazilian culture featuring regional festivals, traditional foods, music, and dance from different Brazilian states',
      pt: 'Celebrações trimestrais da cultura brasileira apresentando festivais regionais, comidas tradicionais, música e dança de diferentes estados brasileiros'
    },
    category: 'festival',
    culturalOrigin: ['Brazil'],
    flagEmojis: '🇧🇷🎊🎭',
    pattern: {
      id: 'seasonal-brazilian-pattern',
      type: 'custom',
      interval: 3, // Every 3 months
      culturalContext: {
        celebration: 'brazilian-regional-diversity',
        significance: 'Celebrates the regional diversity of Brazilian culture and traditions'
      }
    },
    eventDefaults: {
      duration: 480, // 8 hours (full day festival)
      capacity: 300,
      price: 35,
      membershipRequired: 'free',
      tags: ['brazil', 'festival', 'regional-culture', 'family-friendly', 'food', 'music']
    },
    venues: {
      primary: 'Vauxhall Park',
      alternates: ['Clapham Common', 'Hampstead Heath', 'Greenwich Park']
    },
    organizationGuidelines: {
      en: [
        'Rotate focus on different Brazilian regions each season',
        'Feature authentic regional Brazilian cuisine and vendors',
        'Include live performances of regional Brazilian music',
        'Organize family-friendly activities and cultural workshops',
        'Partner with Brazilian community organizations'
      ],
      pt: [
        'Alternar foco em diferentes regiões brasileiras a cada estação',
        'Apresentar culinária regional brasileira autêntica e vendedores',
        'Incluir apresentações ao vivo de música regional brasileira',
        'Organizar atividades familiares e workshops culturais',
        'Parceria com organizações da comunidade brasileira'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Regional Brazilian food vendors and authentic recipes',
        'Live performances by Brazilian musicians and dancers',
        'Cultural workshops and educational activities',
        'Brazilian arts and crafts demonstrations',
        'Community involvement from different Brazilian regions'
      ],
      educationalComponents: [
        'Regional diversity of Brazilian culture',
        'Traditional festivals from different Brazilian states',
        'History of Brazilian immigration to London',
        'Brazilian contribution to global culture'
      ],
      communityInvolvement: [
        'Brazilian restaurants and food vendors participation',
        'Brazilian cultural organizations partnerships',
        'Brazilian artists and performers showcases',
        'Family-friendly activities for Brazilian diaspora'
      ]
    },
    marketingAssets: {
      images: ['/events/brazilian-festival-diversity.jpg', '/events/brazilian-regional-food.jpg'],
      socialHashtags: ['#BrazilianFestival', '#BrazilianCulture', '#LusoTown', '#BrazilianRegions'],
      partnerOrganizations: ['Brazilian Chamber of Commerce UK', 'Brazilian Cultural Centre London']
    },
    isActive: true,
    featured: true
  },
  {
    id: 'weekly-portuguese-business-networking',
    name: {
      en: 'Weekly Portuguese Business Networking',
      pt: 'Networking Empresarial Português Semanal'
    },
    description: {
      en: 'Regular business networking for Portuguese-speaking entrepreneurs, professionals, and business owners across all lusophone countries',
      pt: 'Networking empresarial regular para empreendedores, profissionais e proprietários de negócios lusófonos de todos os países lusófonos'
    },
    category: 'business',
    culturalOrigin: ['Portugal', 'Brazil', 'Angola', 'Mozambique', 'Cape Verde'],
    flagEmojis: '🇵🇹🇧🇷💼',
    pattern: {
      id: 'weekly-business-pattern',
      type: 'weekly',
      interval: 1,
      daysOfWeek: [4], // Thursday
      culturalContext: {
        celebration: 'lusophone-business-community',
        significance: 'Builds strong business networks across Portuguese-speaking communities'
      }
    },
    eventDefaults: {
      duration: 120, // 2 hours
      capacity: 60,
      price: 30,
      membershipRequired: 'core',
      tags: ['business', 'networking', 'entrepreneurs', 'professional', 'lusophone']
    },
    venues: {
      primary: 'WeWork London',
      alternates: ['The Shard', 'Canary Wharf Business Centre', 'City of London venues']
    },
    organizationGuidelines: {
      en: [
        'Rotate monthly themes focusing on different business sectors',
        'Include structured networking and pitch opportunities',
        'Feature successful Portuguese-speaking business leaders',
        'Provide bilingual networking materials and support',
        'Encourage cross-cultural business partnerships'
      ],
      pt: [
        'Alternar temas mensais focando em diferentes setores empresariais',
        'Incluir networking estruturado e oportunidades de pitch',
        'Apresentar líderes empresariais lusófonos bem-sucedidos',
        'Fornecer materiais e apoio de networking bilíngue',
        'Encorajar parcerias empresariais interculturais'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Portuguese business culture and networking etiquette',
        'Bilingual environment supporting both languages',
        'Cultural understanding of lusophone markets',
        'Traditional Portuguese hospitality in professional setting',
        'Cross-cultural business expertise and opportunities'
      ],
      educationalComponents: [
        'Portuguese-speaking market opportunities globally',
        'Cultural considerations in international business',
        'Leveraging cultural heritage for business advantage',
        'Success stories from lusophone entrepreneurs'
      ],
      communityInvolvement: [
        'Portuguese-speaking business associations partnerships',
        'Mentorship opportunities for new entrepreneurs',
        'Support for Portuguese-speaking startups',
        'Cross-cultural business development'
      ]
    },
    marketingAssets: {
      images: ['/events/portuguese-business-networking.jpg', '/events/lusophone-entrepreneurs.jpg'],
      socialHashtags: ['#PortugueseBusiness', '#LusophoneEntrepreneurs', '#LusoTown', '#BusinessNetworking'],
      partnerOrganizations: ['Portuguese Chamber of Commerce UK', 'Brazilian Business Association', 'Angolan Business Network']
    },
    isActive: true,
    featured: true
  },
  {
    id: 'monthly-lusophone-cultural-discovery',
    name: {
      en: 'Monthly Lusophone Cultural Discovery',
      pt: 'Descoberta Cultural Lusófona Mensal'
    },
    description: {
      en: 'Monthly exploration of different Portuguese-speaking cultures featuring cuisine, arts, history, and traditions from across the lusophone world',
      pt: 'Exploração mensal de diferentes culturas lusófonas apresentando culinária, artes, história e tradições de todo o mundo lusófono'
    },
    category: 'cultural',
    culturalOrigin: ['Portugal', 'Brazil', 'Angola', 'Mozambique', 'Cape Verde', 'Guinea-Bissau', 'São Tomé and Príncipe', 'East Timor'],
    flagEmojis: '🌍🇵🇹🇧🇷',
    pattern: {
      id: 'monthly-cultural-discovery-pattern',
      type: 'monthly',
      interval: 1,
      dayOfMonth: 20, // 20th of each month
      culturalContext: {
        celebration: 'lusophone-cultural-diversity',
        significance: 'Celebrates the rich cultural diversity across all Portuguese-speaking nations'
      }
    },
    eventDefaults: {
      duration: 240, // 4 hours
      capacity: 100,
      price: 25,
      membershipRequired: 'free',
      tags: ['cultural', 'education', 'diversity', 'lusophone', 'history', 'arts']
    },
    venues: {
      primary: 'British Museum',
      alternates: ['V&A Museum', 'Southbank Centre', 'Rich Mix London']
    },
    organizationGuidelines: {
      en: [
        'Rotate monthly focus on different lusophone countries',
        'Include cultural exhibitions and educational presentations',
        'Feature authentic cuisine and cultural artifacts',
        'Organize workshops on traditional arts and crafts',
        'Invite cultural ambassadors and community elders'
      ],
      pt: [
        'Alternar foco mensal em diferentes países lusófonos',
        'Incluir exposições culturais e apresentações educativas',
        'Apresentar culinária autêntica e artefatos culturais',
        'Organizar workshops de artes e artesanatos tradicionais',
        'Convidar embaixadores culturais e anciãos da comunidade'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Authentic cultural presentations by community members',
        'Traditional arts, crafts, and cultural demonstrations',
        'Educational content about history and traditions',
        'Cultural food tastings from featured country',
        'Interactive workshops and cultural exchange'
      ],
      educationalComponents: [
        'History and geography of featured lusophone country',
        'Traditional arts, music, and cultural expressions',
        'Contemporary culture and modern developments',
        'Diaspora communities and global connections'
      ],
      communityInvolvement: [
        'Cultural ambassadors and community leaders',
        'Traditional artists and craftspeople',
        'Cultural organizations and embassies partnerships',
        'Intergenerational knowledge sharing'
      ]
    },
    marketingAssets: {
      images: ['/events/lusophone-cultural-diversity.jpg', '/events/traditional-arts-crafts.jpg'],
      socialHashtags: ['#LusophoneCulture', '#CulturalDiscovery', '#LusoTown', '#PortugueseHeritage'],
      partnerOrganizations: ['Instituto Camões', 'Embassy Cultural Departments', 'Museum Partners']
    },
    isActive: true,
    featured: true
  },
  {
    id: 'weekly-family-portuguese-activities',
    name: {
      en: 'Weekly Portuguese Family Activities',
      pt: 'Atividades Familiares Portuguesas Semanais'
    },
    description: {
      en: 'Family-friendly weekly activities promoting Portuguese language, culture, and traditions for children and parents in Portuguese-speaking families',
      pt: 'Atividades semanais familiares promovendo língua, cultura e tradições portuguesas para crianças e pais em famílias lusófonas'
    },
    category: 'family',
    culturalOrigin: ['Portugal', 'Brazil', 'All Lusophone Countries'],
    flagEmojis: '👨‍👩‍👧‍👦🇵🇹',
    pattern: {
      id: 'weekly-family-pattern',
      type: 'weekly',
      interval: 1,
      daysOfWeek: [6], // Saturday
      culturalContext: {
        celebration: 'portuguese-family-heritage',
        significance: 'Preserves Portuguese language and culture for future generations'
      }
    },
    eventDefaults: {
      duration: 180, // 3 hours
      capacity: 80,
      price: 15,
      membershipRequired: 'free',
      tags: ['family', 'children', 'portuguese-language', 'education', 'cultural-preservation']
    },
    venues: {
      primary: 'Portuguese School London',
      alternates: ['Community Centres', 'Portuguese Cultural Centre', 'Local Libraries']
    },
    organizationGuidelines: {
      en: [
        'Age-appropriate activities for different age groups',
        'Portuguese language learning games and activities',
        'Traditional Portuguese stories, songs, and games',
        'Cultural crafts and cooking activities for families',
        'Encourage intergenerational participation'
      ],
      pt: [
        'Atividades apropriadas para diferentes faixas etárias',
        'Jogos e atividades de aprendizagem da língua portuguesa',
        'Histórias, canções e jogos tradicionais portugueses',
        'Artesanato cultural e atividades culinárias para famílias',
        'Encorajar participação intergeracional'
      ]
    },
    culturalAuthenticity: {
      requiredElements: [
        'Portuguese language instruction and practice',
        'Traditional Portuguese children\'s games and songs',
        'Cultural storytelling and Portuguese literature',
        'Traditional crafts and cooking activities',
        'Intergenerational cultural exchange'
      ],
      educationalComponents: [
        'Portuguese language development for heritage speakers',
        'Portuguese history and geography for children',
        'Traditional Portuguese festivals and customs',
        'Portuguese children\'s literature and folktales'
      ],
      communityInvolvement: [
        'Portuguese-speaking families and children',
        'Portuguese school teachers and educators',
        'Grandparents and community elders',
        'Portuguese cultural organizations'
      ]
    },
    marketingAssets: {
      images: ['/events/portuguese-family-activities.jpg', '/events/children-learning-portuguese.jpg'],
      socialHashtags: ['#PortugueseFamilies', '#LusophoneChildren', '#PortugueseLanguage', '#LusoTown'],
      partnerOrganizations: ['Portuguese Schools UK', 'Portuguese Family Associations', 'Community Education Centers']
    },
    isActive: true,
    featured: false
  }
];

/**
 * Event Management Functions for Recurring Events
 */

export interface RecurrenceInstance {
  id: string
  templateId: string
  occurrenceDate: string
  status: 'scheduled' | 'published' | 'cancelled' | 'completed'
  customizations?: {
    title?: { en: string, pt: string }
    description?: { en: string, pt: string }
    venue?: string
    capacity?: number
    price?: number
  }
}

/**
 * Get all active recurring event templates
 */
export function getActiveRecurringTemplates(): RecurringEventTemplate[] {
  return RECURRING_EVENT_TEMPLATES.filter(template => template.isActive);
}

/**
 * Get featured recurring event templates
 */
export function getFeaturedRecurringTemplates(): RecurringEventTemplate[] {
  return RECURRING_EVENT_TEMPLATES.filter(template => template.isActive && template.featured);
}

/**
 * Get recurring templates by category
 */
export function getRecurringTemplatesByCategory(category: string): RecurringEventTemplate[] {
  return RECURRING_EVENT_TEMPLATES.filter(
    template => template.isActive && template.category === category
  );
}

/**
 * Get recurring templates by cultural origin
 */
export function getRecurringTemplatesByOrigin(origin: string): RecurringEventTemplate[] {
  return RECURRING_EVENT_TEMPLATES.filter(
    template => template.isActive && 
    template.culturalOrigin.some(country => 
      country.toLowerCase().includes(origin.toLowerCase())
    )
  );
}

/**
 * Generate next occurrence dates for a recurring pattern
 */
export function generateRecurrenceOccurrences(
  pattern: RecurringEventPattern,
  startDate: Date,
  count: number = 10
): Date[] {
  const occurrences: Date[] = [];
  let currentDate = new Date(startDate);
  
  for (let i = 0; i < count; i++) {
    if (pattern.endDate && currentDate > new Date(pattern.endDate)) {
      break;
    }
    
    occurrences.push(new Date(currentDate));
    
    // Calculate next occurrence based on pattern
    switch (pattern.type) {
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (7 * pattern.interval));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + pattern.interval);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + pattern.interval);
        break;
      case 'daily':
        currentDate.setDate(currentDate.getDate() + pattern.interval);
        break;
      case 'custom':
        // Custom logic based on specific requirements
        currentDate.setDate(currentDate.getDate() + (30 * pattern.interval)); // Default to monthly for custom
        break;
    }
  }
  
  return occurrences;
}

/**
 * Get upcoming Portuguese cultural celebrations
 */
export function getUpcomingCulturalCelebrations(daysAhead: number = 90): Array<{
  date: string
  celebration: typeof PORTUGUESE_CULTURAL_CALENDAR[keyof typeof PORTUGUESE_CULTURAL_CALENDAR]
  suggestedTemplates: RecurringEventTemplate[]
}> {
  const today = new Date();
  const celebrations = [];
  
  for (const [key, celebration] of Object.entries(PORTUGUESE_CULTURAL_CALENDAR)) {
    // Calculate next occurrence of this celebration
    const [month, day] = celebration.date.split('-').map(Number);
    let celebrationDate = new Date(today.getFullYear(), month - 1, day);
    
    // If the date has passed this year, look at next year
    if (celebrationDate < today) {
      celebrationDate = new Date(today.getFullYear() + 1, month - 1, day);
    }
    
    // Check if it's within the specified range
    const daysDifference = Math.ceil((celebrationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference <= daysAhead) {
      // Find suggested templates based on event suggestions
      const suggestedTemplates = RECURRING_EVENT_TEMPLATES.filter(template =>
        celebration.eventSuggestions.some(suggestion =>
          template.name.en.toLowerCase().includes(suggestion.toLowerCase()) ||
          template.category.toLowerCase().includes(suggestion.toLowerCase())
        )
      );
      
      celebrations.push({
        date: celebrationDate.toISOString().split('T')[0],
        celebration,
        suggestedTemplates
      });
    }
  }
  
  return celebrations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Cultural event validation helper
 */
export function validateCulturalAuthenticity(
  template: RecurringEventTemplate,
  customizations?: RecurrenceInstance['customizations']
): {
  isValid: boolean
  warnings: string[]
  suggestions: string[]
} {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Check cultural authenticity requirements
  if (template.culturalAuthenticity.requiredElements.length === 0) {
    warnings.push('No cultural authenticity elements specified');
  }
  
  // Check educational components
  if (template.culturalAuthenticity.educationalComponents.length === 0) {
    warnings.push('Missing educational components for cultural preservation');
  }
  
  // Check community involvement
  if (template.culturalAuthenticity.communityInvolvement.length === 0) {
    warnings.push('Limited community involvement specified');
  }
  
  // Provide suggestions for improvement
  if (template.marketingAssets.partnerOrganizations.length === 0) {
    suggestions.push('Consider partnering with Portuguese cultural organizations');
  }
  
  if (!template.culturalOrigin.includes('Portugal') && !template.culturalOrigin.includes('Brazil')) {
    suggestions.push('Ensure representation of major Portuguese-speaking communities');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions
  };
}

/**
 * Get seasonal event suggestions based on current date
 */
export function getSeasonalEventSuggestions(): RecurringEventTemplate[] {
  const now = new Date();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  
  // Spring suggestions (March-May)
  if (month >= 3 && month <= 5) {
    return RECURRING_EVENT_TEMPLATES.filter(template =>
      template.name.en.toLowerCase().includes('spring') ||
      template.description.en.toLowerCase().includes('easter') ||
      template.category === 'cultural'
    );
  }
  
  // Summer suggestions (June-August)
  if (month >= 6 && month <= 8) {
    return RECURRING_EVENT_TEMPLATES.filter(template =>
      template.name.en.toLowerCase().includes('santos populares') ||
      template.name.en.toLowerCase().includes('festa junina') ||
      template.category === 'festival'
    );
  }
  
  // Autumn suggestions (September-November)
  if (month >= 9 && month <= 11) {
    return RECURRING_EVENT_TEMPLATES.filter(template =>
      template.name.en.toLowerCase().includes('harvest') ||
      template.name.en.toLowerCase().includes('independence') ||
      template.category === 'cultural'
    );
  }
  
  // Winter suggestions (December-February)
  return RECURRING_EVENT_TEMPLATES.filter(template =>
    template.name.en.toLowerCase().includes('christmas') ||
    template.name.en.toLowerCase().includes('carnival') ||
    template.category === 'cultural'
  );
}