// 🇵🇹 LusoTown Mobile - Cultural Authenticity Validation System
// Comprehensive validation for authentic Portuguese-speaking heritage representation

/**
 * Cultural Authenticity Validation System
 * Ensures respectful and accurate representation of all Portuguese-speaking cultures
 * Validates visual design elements for cultural accuracy and inclusivity
 */

// Core Cultural Values for Validation
export const CULTURAL_VALUES = {
  // Universal Portuguese-speaking values
  universal: {
    saudade: 'Deep emotional longing and cultural nostalgia',
    hospitalidade: 'Warm hospitality and community welcome',
    familia: 'Strong family bonds and intergenerational connection',
    fé: 'Deep spiritual and religious traditions',
    orgulho: 'Cultural pride and heritage celebration',
    comunidade: 'Strong community bonds and mutual support',
    respeito: 'Respect for elders and cultural traditions',
    alegria: 'Celebration of life and cultural joy'
  },
  
  // Country-specific cultural values
  country_specific: {
    portugal: {
      descobrimentos: 'Age of discoveries and exploration heritage',
      azulejos: 'Traditional tile artistry and architectural beauty',
      fado: 'Soul music expressing Portuguese emotional depth',
      tradição: 'Deep respect for traditional customs and practices'
    },
    
    brazil: {
      diversidade: 'Celebration of incredible cultural diversity',
      criatividade: 'Creative expression and artistic innovation',
      otimismo: 'Positive outlook and resilient spirit',
      miscigenação: 'Cultural blending and inclusive community'
    },
    
    palop: {
      angola: {
        resistência: 'Strength through historical challenges',
        riqueza: 'Natural resource wealth and cultural richness',
        dança: 'Cultural expression through traditional and modern dance',
        ubuntu: 'Community interconnection and mutual support'
      },
      
      capeVerde: {
        morabeza: 'Unique Cape Verdean hospitality and warmth',
        sodade: 'Cape Verdean expression of longing and connection',
        música: 'Musical heritage as cultural identity foundation',
        crioula: 'Creole culture blending African and Portuguese heritage'
      },
      
      mozambique: {
        unidade: 'Unity despite cultural and linguistic diversity',
        costa: 'Coastal heritage and maritime cultural connection',
        fusão: 'Cultural fusion from multiple heritage influences',
        comércio: 'Trading heritage and commercial cultural exchange'
      },
      
      guineaBissau: {
        coletividade: 'Collective community decision-making and support',
        tradição: 'Strong traditional cultural preservation',
        oralidade: 'Oral tradition and storytelling cultural transmission',
        artesanato: 'Traditional craftsmanship and artistic expression'
      },
      
      saoTome: {
        paraíso: 'Paradise island cultural identity',
        cacau: 'Cocoa heritage and agricultural cultural pride',
        biodiversidade: 'Environmental conservation and cultural connection',
        pequenez: 'Small island community bonds and intimacy'
      }
    }
  }
} as const;

// Visual Authenticity Validation Rules
export const AUTHENTICITY_VALIDATION = {
  // Color usage validation
  colors: {
    portugal: {
      required: ['Portuguese flag red', 'Portuguese green', 'Heritage gold'],
      avoid: ['Generic blue', 'Corporate gray', 'Non-heritage colors'],
      cultural_context: 'Colors must reflect Portuguese flag heritage or traditional elements'
    },
    
    palop: {
      angola: {
        required: ['Angolan flag red', 'Diamond gold', 'Cultural earth tones'],
        avoid: ['Generic African colors', 'Stereotypical representations'],
        cultural_context: 'Colors should reflect diamond heritage and Kizomba culture'
      },
      
      capeVerde: {
        required: ['Cape Verde flag blue', 'Ocean blue', 'Island green'],
        avoid: ['Continental assumptions', 'Non-maritime colors'],
        cultural_context: 'Colors should reflect island geography and maritime heritage'
      },
      
      mozambique: {
        required: ['Mozambican flag green', 'Coastal blue', 'Spice red'],
        avoid: ['Inland-only colors', 'Single cultural influence colors'],
        cultural_context: 'Colors should reflect coastal heritage and spice culture'
      },
      
      guineaBissau: {
        required: ['Guinea-Bissau flag red', 'Community green', 'Traditional gold'],
        avoid: ['Individual-focused colors', 'Modern-only palettes'],
        cultural_context: 'Colors should reflect community traditions and cultural preservation'
      },
      
      saoTome: {
        required: ['São Tomé flag green', 'Cocoa brown', 'Tropical coral'],
        avoid: ['Continental colors', 'Industrial palettes'],
        cultural_context: 'Colors should reflect tropical paradise and cocoa heritage'
      }
    }
  },
  
  // Iconography validation
  iconography: {
    cultural_accuracy: {
      required: [
        'Authentic cultural symbols',
        'Respectful heritage representation',
        'Country-specific elements',
        'Modern and traditional balance'
      ],
      
      avoid: [
        'Stereotypical representations',
        'Culturally appropriated symbols',
        'Generic Portuguese icons for specific cultures',
        'Historical-only imagery'
      ]
    },
    
    palop_specific: {
      angola: {
        authentic: ['Kizomba dance', 'Diamond heritage', 'Coffee culture', 'Urban-rural balance'],
        avoid: ['Only traditional imagery', 'Stereotypical African symbols'],
        validation: 'Must represent modern Angolan excellence and cultural pride'
      },
      
      capeVerde: {
        authentic: ['Island geography', 'Morna music', 'Maritime culture', 'Creole heritage'],
        avoid: ['Mainland assumptions', 'Continental imagery'],
        validation: 'Must reflect island culture and unique Cape Verdean identity'
      },
      
      mozambique: {
        authentic: ['Coastal elements', 'Spice culture', 'Cultural fusion', 'Indian Ocean heritage'],
        avoid: ['Single culture representation', 'Inland-only imagery'],
        validation: 'Must show cultural blending and coastal heritage'
      },
      
      guineaBissau: {
        authentic: ['Community focus', 'Traditional arts', 'Cultural preservation', 'Collective identity'],
        avoid: ['Individual-centric imagery', 'Modern-only representation'],
        validation: 'Must emphasize community traditions and cultural knowledge preservation'
      },
      
      saoTome: {
        authentic: ['Tropical paradise', 'Cocoa heritage', 'Small island culture', 'Environmental harmony'],
        avoid: ['Continental assumptions', 'Industrial imagery'],
        validation: 'Must represent island paradise culture and cocoa heritage excellence'
      }
    }
  },
  
  // Typography validation
  typography: {
    portuguese_text: {
      required: ['Proper diacritical marks', 'Portuguese language accuracy', 'Cultural terminology respect'],
      avoid: ['Machine translation errors', 'Cultural terminology misuse', 'Portuguese variant confusion'],
      validation: 'Text must be culturally appropriate and linguistically accurate'
    },
    
    cultural_terms: {
      portugal: ['saudade', 'fado', 'azulejos', 'descobrimentos'],
      brazil: ['samba', 'capoeira', 'festa junina', 'diversidade'],
      angola: ['kizomba', 'semba', 'morabeza angolana'],
      capeVerde: ['morna', 'coladeira', 'morabeza', 'sodade'],
      mozambique: ['marrabenta', 'xigubo', 'peri-peri'],
      guineaBissau: ['gumbé', 'balanta', 'manjuandadi'],
      saoTome: ['ússua', 'puita', 'socopé']
    }
  }
} as const;

// Cultural Representation Standards
export const REPRESENTATION_STANDARDS = {
  // Diversity requirements
  diversity: {
    age: 'Include all age groups from young to elderly community members',
    gender: 'Balanced representation across gender identities',
    heritage: 'Include people from all Portuguese-speaking nations',
    socioeconomic: 'Include working class to professional success stories',
    regional: 'Include urban and rural Portuguese-speaking communities',
    generation: 'Include first, second, and third+ generation Portuguese speakers'
  },
  
  // Content balance
  content_balance: {
    traditional_modern: '60% modern life, 40% traditional elements',
    country_representation: 'Equal visibility for all Portuguese-speaking nations',
    success_challenge: '70% positive achievements, 30% authentic challenges',
    individual_community: '40% individual stories, 60% community focus',
    business_cultural: '50% business success, 50% cultural preservation'
  },
  
  // Quality standards
  quality: {
    professional: 'All imagery meets professional photography standards',
    authentic: 'All content represents authentic Portuguese-speaking experiences',
    respectful: 'All representation maintains dignity and cultural respect',
    contemporary: 'All content reflects current Portuguese-speaking community realities',
    aspirational: 'All content inspires and celebrates Portuguese-speaking achievement'
  }
} as const;

// Validation Functions
export const VALIDATION_FUNCTIONS = {
  // Color validation
  validateColors: (colorPalette: string[], culturalContext: string): ValidationResult => {
    const contextRules = AUTHENTICITY_VALIDATION.colors[culturalContext as keyof typeof AUTHENTICITY_VALIDATION.colors];
    if (!contextRules) return { valid: false, errors: ['Unknown cultural context'] };
    
    const hasRequiredColors = contextRules.required.some(required => 
      colorPalette.some(color => color.toLowerCase().includes(required.toLowerCase()))
    );
    
    const hasAvoidedColors = contextRules.avoid.some(avoided => 
      colorPalette.some(color => color.toLowerCase().includes(avoided.toLowerCase()))
    );
    
    return {
      valid: hasRequiredColors && !hasAvoidedColors,
      errors: [
        ...(hasRequiredColors ? [] : ['Missing required cultural colors']),
        ...(hasAvoidedColors ? ['Contains culturally inappropriate colors'] : [])
      ],
      suggestions: [contextRules.cultural_context]
    };
  },
  
  // Icon validation
  validateIconography: (icons: string[], culturalContext: string): ValidationResult => {
    const contextRules = AUTHENTICITY_VALIDATION.iconography.palop_specific[culturalContext as keyof typeof AUTHENTICITY_VALIDATION.iconography.palop_specific];
    if (!contextRules) return { valid: false, errors: ['Unknown PALOP cultural context'] };
    
    const hasAuthenticElements = contextRules.authentic.some(authentic => 
      icons.some(icon => icon.toLowerCase().includes(authentic.toLowerCase()))
    );
    
    const hasAvoidedElements = contextRules.avoid.some(avoided => 
      icons.some(icon => icon.toLowerCase().includes(avoided.toLowerCase()))
    );
    
    return {
      valid: hasAuthenticElements && !hasAvoidedElements,
      errors: [
        ...(hasAuthenticElements ? [] : ['Missing authentic cultural iconography']),
        ...(hasAvoidedElements ? ['Contains culturally inappropriate iconography'] : [])
      ],
      suggestions: [contextRules.validation]
    };
  },
  
  // Content balance validation
  validateContentBalance: (content: ContentBalance): ValidationResult => {
    const standards = REPRESENTATION_STANDARDS.content_balance;
    const errors: string[] = [];
    
    // Check traditional/modern balance
    const traditionalModernRatio = content.modern / (content.traditional + content.modern);
    if (traditionalModernRatio < 0.5 || traditionalModernRatio > 0.7) {
      errors.push('Traditional/modern balance should be 60% modern, 40% traditional');
    }
    
    // Check country representation equality
    const countryValues = Object.values(content.countries);
    const maxCountry = Math.max(...countryValues);
    const minCountry = Math.min(...countryValues);
    if (maxCountry / minCountry > 2) {
      errors.push('Country representation should be balanced across all Portuguese-speaking nations');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      suggestions: ['Maintain balanced representation across all cultural dimensions']
    };
  },
  
  // Cultural terminology validation
  validateCulturalTerminology: (text: string, culturalContext: string): ValidationResult => {
    const culturalTerms = AUTHENTICITY_VALIDATION.typography.cultural_terms[culturalContext as keyof typeof AUTHENTICITY_VALIDATION.typography.cultural_terms];
    if (!culturalTerms) return { valid: false, errors: ['Unknown cultural context for terminology'] };
    
    // Check for culturally appropriate terminology
    const hasCulturalTerms = culturalTerms.some(term => 
      text.toLowerCase().includes(term.toLowerCase())
    );
    
    // Check for common mistakes
    const commonMistakes = [
      'Portuguese community' // Should be 'Portuguese-speaking community'
    ];
    
    const hasMistakes = commonMistakes.some(mistake => 
      text.toLowerCase().includes(mistake.toLowerCase())
    );
    
    return {
      valid: hasCulturalTerms && !hasMistakes,
      errors: [
        ...(hasCulturalTerms ? [] : ['Consider including culturally specific terminology']),
        ...(hasMistakes ? ['Contains terminology that should be more inclusive'] : [])
      ],
      suggestions: ['Use "Portuguese-speaking community" instead of "Portuguese community"']
    };
  }
} as const;

// Types for validation
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  suggestions?: string[];
}

export interface ContentBalance {
  traditional: number;
  modern: number;
  countries: {
    portugal: number;
    brazil: number;
    angola: number;
    capeVerde: number;
    mozambique: number;
    guineaBissau: number;
    eastTimor: number;
    saoTome: number;
  };
  individual: number;
  community: number;
  business: number;
  cultural: number;
}

// Cultural Authenticity Checklist
export const AUTHENTICITY_CHECKLIST = {
  visual_design: [
    '✅ Uses authentic Portuguese cultural colors',
    '✅ Includes appropriate PALOP heritage colors',
    '✅ Avoids stereotypical cultural representations',
    '✅ Balances traditional and modern elements',
    '✅ Represents all Portuguese-speaking nations equally'
  ],
  
  iconography: [
    '✅ Uses culturally appropriate symbols',
    '✅ Includes PALOP-specific cultural elements',
    '✅ Avoids cultural appropriation',
    '✅ Maintains 24px standard sizing',
    '✅ Provides cultural context for symbols'
  ],
  
  imagery: [
    '✅ Features authentic Portuguese-speaking communities',
    '✅ Includes diverse age, gender, and heritage representation',
    '✅ Shows contemporary Portuguese-speaking success',
    '✅ Respects cultural dignity and achievements',
    '✅ Balances individual and community focus'
  ],
  
  content: [
    '✅ Uses inclusive "Portuguese-speaking community" terminology',
    '✅ Includes culturally specific terminology appropriately',
    '✅ Represents all heritage countries respectfully',
    '✅ Balances business success with cultural preservation',
    '✅ Maintains authentic cultural voice and perspective'
  ]
} as const;

// Export comprehensive cultural authenticity system
export const CULTURAL_AUTHENTICITY = {
  values: CULTURAL_VALUES,
  validation: AUTHENTICITY_VALIDATION,
  standards: REPRESENTATION_STANDARDS,
  functions: VALIDATION_FUNCTIONS,
  checklist: AUTHENTICITY_CHECKLIST
} as const;

export default CULTURAL_AUTHENTICITY;