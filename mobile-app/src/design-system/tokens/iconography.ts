// 🇵🇹 LusoTown Mobile - Portuguese Cultural Iconography System
// Comprehensive icon system celebrating Portuguese-speaking heritage

/**
 * Portuguese Cultural Iconography Standards
 * 24px standard sizing with consistent stroke width and cultural authenticity
 * Supports all 8 Portuguese-speaking nations with respectful representation
 */

// Icon sizing standards
export const ICON_SIZES = {
  xs: 12,      // 12px - Micro icons
  sm: 16,      // 16px - Small icons
  md: 20,      // 20px - Medium icons
  lg: 24,      // 24px - Standard icons (primary)
  xl: 32,      // 32px - Large icons
  xxl: 48,     // 48px - Hero icons
  xxxl: 64     // 64px - Feature icons
} as const;

// Icon stroke standards for consistency
export const ICON_STROKES = {
  thin: 1,      // 1px - Delicate details
  regular: 1.5, // 1.5px - Standard stroke
  medium: 2,    // 2px - Medium weight
  bold: 2.5     // 2.5px - Bold emphasis
} as const;

// Portuguese Cultural Icons - Core Heritage Elements
export const PORTUGUESE_CULTURAL_ICONS = {
  // National Symbols
  flags: {
    portugal: 'flag-portugal',           // 🇵🇹 Portuguese flag
    brazil: 'flag-brazil',               // 🇧🇷 Brazilian flag
    capeVerde: 'flag-cape-verde',        // 🇨🇻 Cape Verde flag
    angola: 'flag-angola',               // 🇦🇴 Angolan flag
    mozambique: 'flag-mozambique',       // 🇲🇿 Mozambican flag
    guineaBissau: 'flag-guinea-bissau',  // 🇬🇼 Guinea-Bissau flag
    eastTimor: 'flag-east-timor',        // 🇹🇱 East Timor flag
    saoTome: 'flag-sao-tome'             // 🇸🇹 São Tomé flag
  },
  
  // Cultural Heritage Icons
  heritage: {
    castelo: 'castle-tower',             // Portuguese castles
    azulejos: 'ceramic-tiles',           // Traditional Portuguese tiles
    mosteiro: 'monastery',               // Monasteries and religious heritage
    farol: 'lighthouse',                 // Coastal lighthouses
    caravela: 'caravel-ship',            // Portuguese exploration ships
    padrao: 'discovery-monument',        // Discovery monuments
    pelourinho: 'pillory-column',        // Historical pillory columns
    quinta: 'wine-estate'                // Traditional wine estates
  },
  
  // Music and Dance Icons
  music: {
    fado: 'guitar-fado',                 // Fado guitar
    viola: 'portuguese-guitar',          // Portuguese viola
    cavaquinho: 'cavaquinho',            // Cape Verdean cavaquinho
    kizomba: 'dancing-couple',           // Kizomba dance
    morna: 'musical-notes-sad',          // Cape Verdean Morna
    batuque: 'drums-traditional',        // Traditional drums
    folklórico: 'folk-dance',            // Folk dancing
    concertina: 'accordion-small'        // Traditional concertina
  },
  
  // Food and Culinary Icons
  culinary: {
    bacalhau: 'codfish',                 // Portuguese codfish
    pastéis: 'custard-tart',             // Pastéis de nata
    francesinha: 'sandwich-portuguese',  // Francesinha sandwich
    caldo: 'soup-bowl',                  // Traditional soup
    grilled: 'fish-grilled',             // Grilled sardines
    wine: 'wine-glass-portuguese',       // Portuguese wine
    port: 'wine-glass-fortified',        // Port wine
    bifana: 'pork-sandwich',             // Portuguese pork sandwich
    chouriço: 'sausage-traditional',     // Portuguese sausage
    queijo: 'cheese-wheel'               // Traditional cheese
  },
  
  // PALOP Cultural Heritage Icons
  palop: {
    // Angola 🇦🇴
    angola: {
      diamonds: 'diamond-cut',           // Diamond heritage
      kizomba: 'dance-sensual',          // Kizomba dance
      semba: 'dance-traditional',        // Semba dance
      coffee: 'coffee-beans',            // Angolan coffee
      art: 'mask-traditional'            // Traditional art
    },
    
    // Cape Verde 🇨🇻
    capeVerde: {
      morna: 'music-soul',               // Morna music
      cachupa: 'stew-traditional',       // Traditional stew
      islands: 'archipelago',            // Island geography
      boats: 'fishing-boat',             // Traditional fishing
      windmills: 'windmill-traditional'  // Island windmills
    },
    
    // Mozambique 🇲🇿
    mozambique: {
      piri: 'chili-pepper',              // Peri-peri peppers
      seafood: 'prawns-grilled',         // Coastal seafood
      spices: 'spice-blend',             // Traditional spices
      dhow: 'sailing-dhow',              // Traditional boats
      coconut: 'coconut-palm'            // Coconut palms
    },
    
    // Guinea-Bissau 🇬🇼
    guineaBissau: {
      crafts: 'weaving-traditional',     // Traditional crafts
      community: 'community-circle',     // Community gathering
      masks: 'ceremonial-mask',          // Cultural masks
      drums: 'talking-drums',            // Traditional drums
      palmwine: 'palm-wine'              // Palm wine
    },
    
    // São Tomé and Príncipe 🇸🇹
    saoTome: {
      cocoa: 'cocoa-pod',                // Cocoa heritage
      coffee: 'coffee-plantation',       // Coffee farming
      tropical: 'tropical-flower',       // Tropical flora
      paradise: 'island-paradise',       // Island paradise
      birds: 'tropical-birds'            // Endemic birds
    }
  },
  
  // Business and Community Icons
  business: {
    restaurant: 'restaurant-portuguese', // Portuguese restaurants
    market: 'market-traditional',       // Traditional markets
    shop: 'shop-cultural',              // Cultural shops
    services: 'services-professional',  // Professional services
    import: 'shipping-import',          // Import/export
    finance: 'bank-portuguese',         // Financial services
    real_estate: 'property-portugal',   // Real estate
    technology: 'tech-innovation'       // Technology services
  },
  
  // Social and Community Icons
  community: {
    family: 'family-portuguese',        // Portuguese families
    wedding: 'wedding-traditional',     // Traditional weddings
    baptism: 'baptism-celebration',     // Religious celebrations
    festa: 'festival-celebration',      // Community festivals
    church: 'church-portuguese',        // Portuguese churches
    school: 'school-portuguese',        // Portuguese schools
    association: 'community-group',     // Community associations
    elderly: 'elderly-care'             // Elder care
  },
  
  // Events and Celebrations
  events: {
    santos: 'saints-celebration',       // Santos Populares
    carnaval: 'carnival-mask',          // Carnival celebrations
    easter: 'easter-portuguese',        // Portuguese Easter
    christmas: 'christmas-portuguese',  // Portuguese Christmas
    independence: 'independence-day',   // Independence celebrations
    cultural: 'cultural-festival',     // Cultural festivals
    sports: 'football-portuguese',      // Sports events
    networking: 'professional-network' // Professional networking
  }
} as const;

// Icon Loading Animation Standards
export const LOADING_ANIMATIONS = {
  // Portuguese-themed loading states
  azulejo: {
    type: 'ceramic-tile-pattern',
    duration: 1200,
    color: 'primary'
  },
  heritage: {
    type: 'flag-wave',
    duration: 800,
    color: 'heritage'
  },
  cultural: {
    type: 'music-note-flow',
    duration: 1000,
    color: 'cultural'
  },
  palop: {
    type: 'heritage-blend',
    duration: 1500,
    color: 'palop'
  }
} as const;

// Icon Color Mapping for Cultural Context
export const ICON_CULTURAL_COLORS = {
  portugal: {
    primary: '#FF0000',    // Portuguese red
    secondary: '#2E8B57',  // Portuguese green
    accent: '#FFD700'      // Heritage gold
  },
  brazil: {
    primary: '#009B3A',    // Brazilian green
    secondary: '#FFD700',  // Brazilian yellow
    accent: '#002776'      // Brazilian blue
  },
  palop: {
    angola: {
      primary: '#CE1126',  // Angolan red
      accent: '#FFD700'    // Diamond gold
    },
    capeVerde: {
      primary: '#003893',  // Cape Verde blue
      accent: '#4A90E2'    // Ocean blue
    },
    mozambique: {
      primary: '#00A859',  // Mozambican green
      accent: '#FF6B35'    // Peri-peri red
    },
    guineaBissau: {
      primary: '#CE1126',  // Guinea-Bissau red
      accent: '#FFD700'    // Cultural gold
    },
    saoTome: {
      primary: '#12AD2B',  // São Tomé green
      accent: '#8B4513'    // Cocoa brown
    }
  }
} as const;

// Icon Accessibility Standards
export const ICON_ACCESSIBILITY = {
  // Minimum contrast ratios
  contrast: {
    normal: 4.5,    // WCAG AA standard
    large: 3.0      // WCAG AA for large text
  },
  
  // Alternative text patterns
  altText: {
    flag: (country: string) => `${country} flag icon`,
    cultural: (element: string) => `Portuguese cultural ${element} icon`,
    business: (type: string) => `${type} business category icon`,
    event: (event: string) => `${event} celebration icon`,
    palop: (country: string, element: string) => `${country} ${element} cultural icon`
  },
  
  // Focus states
  focus: {
    outline: '2px solid',
    outlineOffset: '2px',
    color: 'primary'
  }
} as const;

// Icon Usage Guidelines
export const ICON_USAGE_GUIDELINES = {
  // When to use specific icons
  flags: {
    usage: 'Heritage identification, cultural context, nationality representation',
    placement: 'Profile headers, cultural sections, heritage selectors',
    sizing: 'md (20px) for inline, lg (24px) for standalone, xl (32px) for emphasis'
  },
  
  cultural: {
    usage: 'Heritage education, cultural celebrations, traditional elements',
    placement: 'Cultural content, educational sections, heritage features',
    sizing: 'lg (24px) standard, xl (32px) for feature highlights'
  },
  
  palop: {
    usage: 'African Portuguese heritage, specific country representation',
    placement: 'PALOP business directory, cultural education, heritage celebration',
    sizing: 'md (20px) for categories, lg (24px) for features, xl (32px) for heroes'
  },
  
  business: {
    usage: 'Service categories, business types, professional identification',
    placement: 'Directory listings, search categories, business profiles',
    sizing: 'md (20px) for lists, lg (24px) for cards, xl (32px) for headers'
  }
} as const;

// Cultural Authenticity Validation
export const CULTURAL_AUTHENTICITY = {
  // Validation rules for respectful representation
  palop: {
    angola: {
      required: ['Kizomba', 'diamonds', 'coffee'],
      avoid: ['stereotypes', 'oversimplification'],
      represent: 'Diamond heritage, Kizomba culture, coffee tradition'
    },
    capeVerde: {
      required: ['Morna', 'islands', 'cachupa'],
      avoid: ['mainland assumptions'],
      represent: 'Island culture, musical heritage, maritime tradition'
    },
    mozambique: {
      required: ['coastal elements', 'spices', 'Portuguese-Arabic fusion'],
      avoid: ['inland-only representation'],
      represent: 'Coastal heritage, spice culture, cultural fusion'
    },
    guineaBissau: {
      required: ['community focus', 'traditional arts'],
      avoid: ['individual-centric representation'],
      represent: 'Community traditions, collective heritage'
    },
    saoTome: {
      required: ['tropical elements', 'cocoa', 'island paradise'],
      avoid: ['continental assumptions'],
      represent: 'Tropical culture, cocoa heritage, island beauty'
    }
  }
} as const;

// Export consolidated iconography system
export const ICONOGRAPHY = {
  sizes: ICON_SIZES,
  strokes: ICON_STROKES,
  icons: PORTUGUESE_CULTURAL_ICONS,
  loading: LOADING_ANIMATIONS,
  colors: ICON_CULTURAL_COLORS,
  accessibility: ICON_ACCESSIBILITY,
  guidelines: ICON_USAGE_GUIDELINES,
  authenticity: CULTURAL_AUTHENTICITY
} as const;

export default ICONOGRAPHY;