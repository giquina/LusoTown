/**
 * Cultural Authenticity & Visual Polish System for LusoTown
 * 
 * MISSION: Create a platform where Portuguese speakers from ALL lusophone nations
 * feel equally welcomed and celebrated - from Angolan entrepreneurs to Cape Verdean 
 * students to Brazilian professionals.
 * 
 * CRITICAL: Language-first messaging celebrating ALL Portuguese-speaking nations
 */

export interface LusophoneNation {
  id: string
  name: {
    en: string
    pt: string
    local?: string // Local language name if different
  }
  flag: string
  capital: string
  independence?: string
  continent: 'Europe' | 'South America' | 'Africa' | 'Asia'
  popularityInUK: 'primary' | 'secondary' | 'emerging'
  ukDiasporaSize: string
  culturalElements: {
    music: string[]
    food: string[]
    traditions: string[]
    languages: string[]
  }
  businessStrengths: string[]
  celebrationColors: {
    primary: string
    secondary: string
    accent: string
  }
  famousFor: {
    en: string[]
    pt: string[]
  }
  ukCommunityHubs: string[]
}

/**
 * Complete Portuguese-speaking Nations Configuration
 * Equal representation for ALL lusophone countries
 */
export const LUSOPHONE_NATIONS: LusophoneNation[] = [
  // PORTUGAL 🇵🇹
  {
    id: 'portugal',
    name: {
      en: 'Portugal',
      pt: 'Portugal'
    },
    flag: '🇵🇹',
    capital: 'Lisbon',
    independence: '1143',
    continent: 'Europe',
    popularityInUK: 'primary',
    ukDiasporaSize: '500,000+',
    culturalElements: {
      music: ['Fado', 'Folk', 'Pimba', 'Pop rock'],
      food: ['Pastéis de nata', 'Bacalhau', 'Francesinha', 'Bifana'],
      traditions: ['Santos Populares', 'Festas da cidade', 'Romarias'],
      languages: ['Portuguese', 'Mirandês']
    },
    businessStrengths: ['Tourism', 'Wine', 'Textiles', 'Construction', 'Services'],
    celebrationColors: {
      primary: '#FF0000',
      secondary: '#006600',
      accent: '#FFD700'
    },
    famousFor: {
      en: ['Age of Exploration', 'Port wine', 'Azulejos', 'Cork production', 'Surf beaches'],
      pt: ['Era dos Descobrimentos', 'Vinho do Porto', 'Azulejos', 'Cortiça', 'Praias de surf']
    },
    ukCommunityHubs: ['London', 'Reading', 'Bedford', 'Thetford', 'Cambridge']
  },

  // BRAZIL 🇧🇷
  {
    id: 'brazil',
    name: {
      en: 'Brazil',
      pt: 'Brasil'
    },
    flag: '🇧🇷',
    capital: 'Brasília',
    independence: '1822-09-07',
    continent: 'South America',
    popularityInUK: 'primary',
    ukDiasporaSize: '150,000+',
    culturalElements: {
      music: ['Samba', 'Bossa Nova', 'Forró', 'Funk', 'MPB'],
      food: ['Feijoada', 'Pão de açúcar', 'Brigadeiros', 'Açaí', 'Churrasco'],
      traditions: ['Carnaval', 'Festa Junina', 'Capoeira', 'Futebol culture'],
      languages: ['Portuguese', 'Indigenous languages']
    },
    businessStrengths: ['Technology', 'Finance', 'Agriculture', 'Mining', 'Creative industries'],
    celebrationColors: {
      primary: '#009B3A',
      secondary: '#FEDF00',
      accent: '#002776'
    },
    famousFor: {
      en: ['Amazon rainforest', 'Football', 'Carnival', 'Coffee', 'Beaches'],
      pt: ['Floresta Amazônica', 'Futebol', 'Carnaval', 'Café', 'Praias']
    },
    ukCommunityHubs: ['London', 'Manchester', 'Brighton', 'Liverpool', 'Birmingham']
  },

  // ANGOLA 🇦🇴
  {
    id: 'angola',
    name: {
      en: 'Angola',
      pt: 'Angola'
    },
    flag: '🇦🇴',
    capital: 'Luanda',
    independence: '1975-11-11',
    continent: 'Africa',
    popularityInUK: 'primary',
    ukDiasporaSize: '50,000+',
    culturalElements: {
      music: ['Kizomba', 'Semba', 'Kuduro', 'Afrobeat'],
      food: ['Muamba de galinha', 'Funge', 'Calulu', 'Mufete'],
      traditions: ['Dance culture', 'Storytelling', 'Community celebrations'],
      languages: ['Portuguese', 'Umbundu', 'Kimbundu', 'Kikongo']
    },
    businessStrengths: ['Oil & gas', 'Diamonds', 'Mining', 'Construction', 'Import/export'],
    celebrationColors: {
      primary: '#CE1126',
      secondary: '#000000',
      accent: '#FFCD00'
    },
    famousFor: {
      en: ['Oil reserves', 'Diamonds', 'Kizomba music', 'Natural resources', 'Cultural dance'],
      pt: ['Reservas de petróleo', 'Diamantes', 'Música Kizomba', 'Recursos naturais', 'Dança cultural']
    },
    ukCommunityHubs: ['London', 'Luton', 'Milton Keynes', 'Birmingham', 'Manchester']
  },

  // CAPE VERDE 🇨🇻
  {
    id: 'cape_verde',
    name: {
      en: 'Cape Verde',
      pt: 'Cabo Verde',
      local: 'Kabu Verdi'
    },
    flag: '🇨🇻',
    capital: 'Praia',
    independence: '1975-07-05',
    continent: 'Africa',
    popularityInUK: 'primary',
    ukDiasporaSize: '25,000+',
    culturalElements: {
      music: ['Morna', 'Coladeira', 'Funaná', 'Batuko'],
      food: ['Cachupa', 'Pastéis', 'Canja', 'Fresh fish'],
      traditions: ['Island hospitality', 'Music storytelling', 'Family gatherings'],
      languages: ['Portuguese', 'Cape Verdean Creole']
    },
    businessStrengths: ['Tourism', 'Fishing', 'Services', 'Remittances', 'Cultural events'],
    celebrationColors: {
      primary: '#003893',
      secondary: '#FFFFFF',
      accent: '#CF142B'
    },
    famousFor: {
      en: ['Morna music', 'Cesária Évora', 'Island culture', 'Diaspora community', 'Hospitality'],
      pt: ['Música Morna', 'Cesária Évora', 'Cultura das ilhas', 'Comunidade da diáspora', 'Hospitalidade']
    },
    ukCommunityHubs: ['London', 'Rotterdam', 'Lisbon connection', 'Paris link', 'Boston network']
  },

  // MOZAMBIQUE 🇲🇿
  {
    id: 'mozambique',
    name: {
      en: 'Mozambique',
      pt: 'Moçambique'
    },
    flag: '🇲🇿',
    capital: 'Maputo',
    independence: '1975-06-25',
    continent: 'Africa',
    popularityInUK: 'primary',
    ukDiasporaSize: '15,000+',
    culturalElements: {
      music: ['Marrabenta', 'Traditional rhythms', 'Indian Ocean fusion'],
      food: ['Prawns peri-peri', 'Matapa', 'Xima', 'Coconut curry'],
      traditions: ['Coastal culture', 'Spice heritage', 'Cultural fusion'],
      languages: ['Portuguese', 'Makua', 'Sena', 'Tsonga']
    },
    businessStrengths: ['Mining', 'Agriculture', 'Tourism', 'Natural gas', 'Logistics'],
    celebrationColors: {
      primary: '#009639',
      secondary: '#000000',
      accent: '#FFFF00'
    },
    famousFor: {
      en: ['Natural gas', 'Spices', 'Indian Ocean coast', 'Traditional culture', 'Natural beauty'],
      pt: ['Gás natural', 'Especiarias', 'Costa do Oceano Índico', 'Cultura tradicional', 'Beleza natural']
    },
    ukCommunityHubs: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol']
  },

  // GUINEA-BISSAU 🇬🇼
  {
    id: 'guinea_bissau',
    name: {
      en: 'Guinea-Bissau',
      pt: 'Guiné-Bissau'
    },
    flag: '🇬🇼',
    capital: 'Bissau',
    independence: '1973-09-24',
    continent: 'Africa',
    popularityInUK: 'secondary',
    ukDiasporaSize: '5,000+',
    culturalElements: {
      music: ['Gumbe', 'Traditional rhythms', 'West African fusion'],
      food: ['Traditional stews', 'Rice dishes', 'West African specialties'],
      traditions: ['Community solidarity', 'Oral traditions', 'Cultural resilience'],
      languages: ['Portuguese', 'Crioulo', 'Balanta', 'Fula']
    },
    businessStrengths: ['Agriculture', 'Fishing', 'Cashews', 'Community services'],
    celebrationColors: {
      primary: '#CE1126',
      secondary: '#FCD116',
      accent: '#009639'
    },
    famousFor: {
      en: ['Cashew production', 'Cultural resilience', 'Traditional music', 'Community strength'],
      pt: ['Produção de caju', 'Resistência cultural', 'Música tradicional', 'Força comunitária']
    },
    ukCommunityHubs: ['London', 'Lisbon connection', 'Paris community', 'Community centers']
  },

  // SÃO TOMÉ AND PRÍNCIPE 🇸🇹
  {
    id: 'sao_tome_principe',
    name: {
      en: 'São Tomé and Príncipe',
      pt: 'São Tomé e Príncipe'
    },
    flag: '🇸🇹',
    capital: 'São Tomé',
    independence: '1975-07-12',
    continent: 'Africa',
    popularityInUK: 'secondary',
    ukDiasporaSize: '2,000+',
    culturalElements: {
      music: ['Traditional São Tomé', 'Island rhythms', 'Tropical fusion'],
      food: ['Cocoa specialties', 'Fresh fish', 'Tropical fruits', 'Island delicacies'],
      traditions: ['Island hospitality', 'Cocoa heritage', 'Paradise culture'],
      languages: ['Portuguese', 'Forro', 'Lungwa']
    },
    businessStrengths: ['Cocoa production', 'Tourism', 'Fishing', 'Agriculture'],
    celebrationColors: {
      primary: '#12AD2B',
      secondary: '#FFCE00',
      accent: '#D21034'
    },
    famousFor: {
      en: ['Cocoa production', 'Natural paradise', 'Island beauty', 'Biodiversity'],
      pt: ['Produção de cacau', 'Paraíso natural', 'Beleza das ilhas', 'Biodiversidade']
    },
    ukCommunityHubs: ['London', 'Portugal connection', 'Small diaspora network']
  },

  // EAST TIMOR 🇹🇱
  {
    id: 'east_timor',
    name: {
      en: 'East Timor',
      pt: 'Timor-Leste',
      local: 'Timor Lorosa\'e'
    },
    flag: '🇹🇱',
    capital: 'Dili',
    independence: '2002-05-20',
    continent: 'Asia',
    popularityInUK: 'emerging',
    ukDiasporaSize: '1,000+',
    culturalElements: {
      music: ['Traditional Timorese', 'Portuguese fusion', 'Southeast Asian blend'],
      food: ['Southeast Asian cuisine', 'Portuguese influenced dishes', 'Local specialties'],
      traditions: ['Cultural ceremonies', 'Traditional crafts', 'Community gatherings'],
      languages: ['Portuguese', 'Tetum', 'Indonesian']
    },
    businessStrengths: ['Oil reserves', 'Agriculture', 'Tourism potential', 'Development'],
    celebrationColors: {
      primary: '#DC143C',
      secondary: '#FFFF00',
      accent: '#000000'
    },
    famousFor: {
      en: ['Recent independence', 'Oil reserves', 'Cultural resilience', 'Southeast Asian Portuguese fusion'],
      pt: ['Independência recente', 'Reservas de petróleo', 'Resistência cultural', 'Fusão portuguesa do Sudeste Asiático']
    },
    ukCommunityHubs: ['London', 'Academic institutions', 'International community']
  },

  // MACAU 🇲🇴
  {
    id: 'macau',
    name: {
      en: 'Macau',
      pt: 'Macau',
      local: '澳門'
    },
    flag: '🇲🇴',
    capital: 'Macau',
    independence: '1999-12-20', // Return to China
    continent: 'Asia',
    popularityInUK: 'emerging',
    ukDiasporaSize: '3,000+',
    culturalElements: {
      music: ['Cantonese Portuguese fusion', 'Traditional Portuguese', 'Chinese blend'],
      food: ['Macanese cuisine', 'Portuguese-Chinese fusion', 'Egg tarts'],
      traditions: ['East meets West', 'Cultural fusion', 'International bridge'],
      languages: ['Portuguese', 'Chinese (Cantonese)', 'English']
    },
    businessStrengths: ['Gaming', 'Tourism', 'Finance', 'International trade', 'Bridge culture'],
    celebrationColors: {
      primary: '#067BC2',
      secondary: '#FFFFFF',
      accent: '#FFD100'
    },
    famousFor: {
      en: ['East-West cultural fusion', 'Gaming capital', 'Portuguese-Chinese blend', 'International bridge'],
      pt: ['Fusão cultural Oriente-Ocidente', 'Capital do jogo', 'Mistura luso-chinesa', 'Ponte internacional']
    },
    ukCommunityHubs: ['London', 'International business', 'Academic connections', 'Cultural centers']
  }
]

/**
 * Journey Visualization System
 * Shows the path from each Portuguese-speaking nation to UK
 */
export const NATION_TO_UK_JOURNEYS = {
  portugal: {
    route: '🇵🇹 → ✈️ → 🏛️ London',
    description: {
      en: 'European neighbors with deep historical ties',
      pt: 'Vizinhos europeus com laços históricos profundos'
    },
    travelTime: '2.5 hours',
    commonReasons: ['Work opportunities', 'Education', 'Family reunification', 'EU freedom']
  },
  brazil: {
    route: '🇧🇷 → ✈️ → 🏛️ London',
    description: {
      en: 'From South American energy to British opportunity',
      pt: 'Da energia sul-americana à oportunidade britânica'
    },
    travelTime: '11 hours',
    commonReasons: ['Career advancement', 'Education', 'Cultural exchange', 'Business']
  },
  angola: {
    route: '🇦🇴 → ✈️ → 🏛️ London',
    description: {
      en: 'From African diamond wealth to British business',
      pt: 'Da riqueza dos diamantes africanos aos negócios britânicos'
    },
    travelTime: '8 hours',
    commonReasons: ['Education', 'Business', 'Investment', 'Cultural preservation']
  },
  cape_verde: {
    route: '🇨🇻 → ✈️ → 🏛️ London',
    description: {
      en: 'From island paradise to metropolitan opportunity',
      pt: 'Do paraíso das ilhas à oportunidade metropolitana'
    },
    travelTime: '6 hours',
    commonReasons: ['Family diaspora', 'Education', 'Work opportunities', 'Cultural connections']
  },
  mozambique: {
    route: '🇲🇿 → ✈️ → 🏛️ London',
    description: {
      en: 'From Indian Ocean coast to British innovation',
      pt: 'Da costa do Oceano Índico à inovação britânica'
    },
    travelTime: '12 hours',
    commonReasons: ['Education', 'Business', 'Natural resources', 'Development opportunities']
  },
  guinea_bissau: {
    route: '🇬🇼 → ✈️ → 🏛️ London',
    description: {
      en: 'From West African resilience to British community',
      pt: 'Da resistência da África Ocidental à comunidade britânica'
    },
    travelTime: '7 hours',
    commonReasons: ['Education', 'Family reunification', 'Opportunity', 'Cultural preservation']
  },
  sao_tome_principe: {
    route: '🇸🇹 → ✈️ → 🏛️ London',
    description: {
      en: 'From equatorial paradise to global opportunity',
      pt: 'Do paraíso equatorial à oportunidade global'
    },
    travelTime: '8 hours',
    commonReasons: ['Education', 'Business development', 'Cultural exchange', 'Family']
  },
  east_timor: {
    route: '🇹🇱 → ✈️ → 🏛️ London',
    description: {
      en: 'From Southeast Asian independence to British opportunity',
      pt: 'Da independência do Sudeste Asiático à oportunidade britânica'
    },
    travelTime: '18 hours',
    commonReasons: ['Education', 'International development', 'Cultural exchange', 'Academic research']
  },
  macau: {
    route: '🇲🇴 → ✈️ → 🏛️ London',
    description: {
      en: 'From East-West bridge to British innovation',
      pt: 'Da ponte Oriente-Ocidente à inovação britânica'
    },
    travelTime: '14 hours',
    commonReasons: ['Business', 'Finance', 'Education', 'International bridge role']
  }
}

/**
 * Language-First Messaging System
 * CRITICAL: Always use "Portuguese speakers" not "Portuguese people"
 */
export const INCLUSIVE_LANGUAGE_GUIDE = {
  correct: {
    community: 'Portuguese-speaking community',
    people: 'Portuguese speakers',
    diaspora: 'Lusophone diaspora',
    culture: 'Portuguese-speaking cultures',
    heritage: 'Lusophone heritage',
    nations: 'Portuguese-speaking nations',
    businesses: 'Lusophone businesses',
    entrepreneurs: 'Portuguese-speaking entrepreneurs',
    students: 'Portuguese-speaking students',
    families: 'Portuguese-speaking families',
    professionals: 'Lusophone professionals'
  },
  avoid: {
    nationalityBased: [
      'Portuguese people',
      'Portuguese community',
      'Brazilians only',
      'Portuguese only',
      'Brazilian community',
      'Angolan community'
    ],
    exclusive: [
      'Portuguese community',
      'Only for Portuguese',
      'Brazilian exclusive',
      'Portugal-focused'
    ]
  },
  examples: {
    hero: {
      good: 'Welcome to London\'s most inclusive Portuguese-speaking community',
      bad: 'Welcome to London\'s Portuguese community'
    },
    events: {
      good: 'Cultural events celebrating all Portuguese-speaking nations',
      bad: 'Portuguese cultural events'
    },
    business: {
      good: 'Directory of Portuguese-speaking businesses from all lusophone countries',
      bad: 'Portuguese business directory'
    }
  }
}

/**
 * Visual Polish & Micro-Interactions Configuration
 */
export const VISUAL_POLISH_CONFIG = {
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    slideInFromRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    },
    parallaxScroll: {
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 50%, #228B22 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 4s ease infinite'
    },
    hoverLift: {
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(212, 165, 116, 0.15)'
      }
    },
    loadingSkeleton: {
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'loading-shimmer 2s infinite'
    }
  },
  culturalEffects: {
    portugueseFlag: {
      background: 'linear-gradient(45deg, #FF0000 33%, #006600 33%, #006600 66%, #FF0000 66%)',
      backgroundSize: '20px 20px',
      opacity: 0.1
    },
    lusophoneGradient: {
      background: 'linear-gradient(135deg, #D4A574 0%, #228B22 25%, #8B4513 50%, #DC143C 75%, #D4A574 100%)',
      backgroundSize: '400% 400%',
      animation: 'lusophone-flow 8s ease infinite'
    },
    nationalsColors: {
      portugal: 'linear-gradient(135deg, #FF0000 0%, #006600 100%)',
      brazil: 'linear-gradient(135deg, #009B3A 0%, #FEDF00 50%, #002776 100%)',
      angola: 'linear-gradient(135deg, #CE1126 0%, #000000 50%, #FFCD00 100%)',
      cape_verde: 'linear-gradient(135deg, #003893 0%, #FFFFFF 50%, #CF142B 100%)',
      mozambique: 'linear-gradient(135deg, #009639 0%, #000000 50%, #FFFF00 100%)',
      guinea_bissau: 'linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #009639 100%)',
      sao_tome_principe: 'linear-gradient(135deg, #12AD2B 0%, #FFCE00 50%, #D21034 100%)',
      east_timor: 'linear-gradient(135deg, #DC143C 0%, #FFFF00 50%, #000000 100%)',
      macau: 'linear-gradient(135deg, #067BC2 0%, #FFFFFF 50%, #FFD100 100%)'
    }
  },
  flagElements: {
    integrationStyles: {
      hero: 'Subtle flag patterns in background',
      cards: 'Small flag indicators on content cards',
      navigation: 'Flag emojis in navigation items',
      journey: 'Animated flag-to-flag journey visualization',
      celebration: 'Full flag displays during cultural events'
    },
    sizes: {
      mini: '16px',
      small: '24px',
      medium: '32px',
      large: '48px',
      jumbo: '64px'
    }
  }
}

/**
 * Micro-Interactions Library
 */
export const MICRO_INTERACTIONS = {
  buttons: {
    primaryHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)',
      transition: 'all 0.2s ease'
    },
    culturalPulse: {
      animation: 'cultural-pulse 2s infinite',
      boxShadow: '0 0 0 0 rgba(212, 165, 116, 0.7)'
    }
  },
  cards: {
    entrance: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }
  },
  navigation: {
    activeState: {
      borderBottom: '2px solid #D4A574',
      color: '#8B4513',
      fontWeight: '600'
    },
    hoverEffect: {
      color: '#D4A574',
      transition: 'color 0.2s ease'
    }
  }
}

/**
 * Cultural Authenticity Validation System
 */
export const CULTURAL_AUTHENTICITY_CHECKS = {
  language: {
    inclusivityScore: (text: string): number => {
      const inclusive = INCLUSIVE_LANGUAGE_GUIDE.correct
      const exclusive = INCLUSIVE_LANGUAGE_GUIDE.avoid.nationalityBased
      
      let score = 100
      exclusive.forEach(term => {
        if (text.toLowerCase().includes(term.toLowerCase())) {
          score -= 20
        }
      })
      
      Object.values(inclusive).forEach(term => {
        if (text.toLowerCase().includes(term.toLowerCase())) {
          score += 10
        }
      })
      
      return Math.min(100, Math.max(0, score))
    }
  },
  representation: {
    validateNationBalance: (content: any[]): {
      score: number
      missing: string[]
      overRepresented: string[]
    } => {
      const nationCounts: Record<string, number> = {}
      const primaryNations = ['portugal', 'brazil', 'angola', 'cape_verde', 'mozambique']
      
      content.forEach(item => {
        if (item.country || item.origin) {
          const nation = item.country || item.origin
          nationCounts[nation] = (nationCounts[nation] || 0) + 1
        }
      })
      
      const missing = primaryNations.filter(nation => !nationCounts[nation])
      const avg = Object.values(nationCounts).reduce((a, b) => a + b, 0) / Object.keys(nationCounts).length
      const overRepresented = Object.entries(nationCounts)
        .filter(([_, count]) => count > avg * 2)
        .map(([nation]) => nation)
      
      const score = Math.max(0, 100 - (missing.length * 20) - (overRepresented.length * 10))
      
      return { score, missing, overRepresented }
    }
  }
}

/**
 * Helper Functions
 */
export const getCulturalColors = (nationId: string) => {
  const nation = LUSOPHONE_NATIONS.find(n => n.id === nationId)
  return nation?.celebrationColors || {
    primary: '#D4A574',
    secondary: '#8B4513',
    accent: '#228B22'
  }
}

export const getNationByFlag = (flag: string) => {
  return LUSOPHONE_NATIONS.find(nation => nation.flag === flag)
}

export const getPrimaryNations = () => {
  return LUSOPHONE_NATIONS.filter(nation => nation.popularityInUK === 'primary')
}

export const getAllFlags = () => {
  return LUSOPHONE_NATIONS.map(nation => nation.flag).join('')
}

export const getJourneyVisualization = (nationId: string) => {
  return NATION_TO_UK_JOURNEYS[nationId as keyof typeof NATION_TO_UK_JOURNEYS]
}

export const validateCulturalAuthenticity = (content: string) => {
  return CULTURAL_AUTHENTICITY_CHECKS.language.inclusivityScore(content)
}