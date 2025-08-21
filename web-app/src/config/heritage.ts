/**
 * Heritage Community Configuration System
 * Configurable cultural elements for different heritage communities
 * Default: Portuguese community
 */

export interface HeritageConfig {
  // Basic identity
  identity: {
    name: string;
    code: string; // ISO 639-1 language code or custom identifier
    defaultLanguage: string;
    tagline: {
      native: string;
      english: string;
    };
  };

  // Visual branding
  branding: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      action: string;
      premium: string;
      coral: string;
    };
    symbols: {
      flag: string;
      primary: string; // Main cultural symbol
      secondary?: string;
    };
    culturalEmoji: string; // Main representative emoji
  };

  // Geographic configuration
  geography: {
    mainCountry: {
      name: string;
      code: string; // ISO country code
      timezone: string;
      currency: string;
    };
    diasporaHub: {
      city: string;
      country: string;
      timezone: string;
      currency: string;
      culturalAreas: string[];
    };
    relatedCountries?: Array<{
      name: string;
      code: string;
      timezone: string;
      currency: string;
    }>;
  };

  // Cultural elements
  culture: {
    traditions: string[];
    foods: string[];
    music: string[];
    celebrations: string[];
    languages: string[];
    values: string[];
  };

  // Streaming platform configuration
  streaming: {
    emotes: Record<string, {
      unicode: string;
      description: string;
      cultural: boolean;
    }>;
    contentCategories: Record<string, {
      name: string;
      nameEn: string;
      description: string;
      tags: string[];
      streamPrefix: string;
      requiresModeration: boolean;
    }>;
    moderationKeywords: {
      positive: string[];
      review: string[];
      blocked: string[];
    };
  };

  // Business and community features
  community: {
    businessTypes: string[];
    eventTypes: string[];
    networkingCategories: string[];
    professionalSectors: string[];
  };
}

// Portuguese Heritage Configuration (Default)
export const PORTUGUESE_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Portuguese',
    code: 'pt',
    defaultLanguage: 'pt-PT',
    tagline: {
      native: 'Unidos pela Língua',
      english: 'United by Language'
    }
  },

  branding: {
    colors: {
      primary: '#1e40af', // Atlantic Blue
      secondary: '#059669', // Hope Green
      accent: '#f59e0b', // Golden Sun
      action: '#dc2626', // Passion Red
      premium: '#7c3aed', // Fado Purple
      coral: '#f97316' // Tropical Coral
    },
    symbols: {
      flag: '🇵🇹',
      primary: '🏛️', // Classical architecture representing heritage
      secondary: '⚓' // Maritime heritage
    },
    culturalEmoji: '🇵🇹'
  },

  geography: {
    mainCountry: {
      name: 'Portugal',
      code: 'PT',
      timezone: 'Europe/Lisbon',
      currency: 'EUR'
    },
    diasporaHub: {
      city: 'London',
      country: 'United Kingdom',
      timezone: 'Europe/London',
      currency: 'GBP',
      culturalAreas: [
        'Vauxhall',
        'Stockwell',
        'Golborne Road',
        'Borough Market',
        'Camden'
      ]
    },
    relatedCountries: [
      {
        name: 'Brazil',
        code: 'BR',
        timezone: 'America/Sao_Paulo',
        currency: 'BRL'
      },
      {
        name: 'Angola',
        code: 'AO',
        timezone: 'Africa/Luanda',
        currency: 'AOA'
      },
      {
        name: 'Mozambique',
        code: 'MZ',
        timezone: 'Africa/Maputo',
        currency: 'MZN'
      }
    ]
  },

  culture: {
    traditions: ['Fado', 'Santos Populares', 'Azulejos', 'Maritime Heritage'],
    foods: ['Pastéis de Nata', 'Bacalhau', 'Francesinha', 'Bifana'],
    music: ['Fado', 'Pimba', 'Folk', 'Modern Portuguese'],
    celebrations: ['Portugal Day', 'Santos Populares', 'Christmas on 24th', 'New Year'],
    languages: ['Portuguese', 'Mirandese'],
    values: ['Saudade', 'Family', 'Hospitality', 'Heritage', 'Community']
  },

  streaming: {
    emotes: {
      ':saudade:': {
        unicode: '💙',
        description: 'Portuguese feeling of longing/nostalgia',
        cultural: true
      },
      ':festa:': {
        unicode: '🎉',
        description: 'Portuguese celebration/party',
        cultural: true
      },
      ':futebol:': {
        unicode: '⚽',
        description: 'Football/soccer - Portuguese passion',
        cultural: true
      },
      ':fado:': {
        unicode: '🎵',
        description: 'Traditional Portuguese music',
        cultural: true
      },
      ':bacalhau:': {
        unicode: '🐟',
        description: 'Portuguese codfish tradition',
        cultural: true
      },
      ':pastel:': {
        unicode: '🥟',
        description: 'Pastel de nata - Portuguese pastry',
        cultural: true
      },
      ':lusitano:': {
        unicode: '🤝',
        description: 'Lusophone community unity',
        cultural: true
      }
    },
    contentCategories: {
      cultural: {
        name: 'Conteúdo Cultural',
        nameEn: 'Cultural Content',
        description: 'Fado, tradições, arte portuguesa',
        tags: ['fado', 'tradicoes', 'arte', 'cultura', 'historia'],
        streamPrefix: 'cultural_',
        requiresModeration: false
      },
      business: {
        name: 'Negócios e Empreendedorismo',
        nameEn: 'Business & Entrepreneurship',
        description: 'Workshops, networking, startups portugueses',
        tags: ['negocios', 'startups', 'networking', 'workshops'],
        streamPrefix: 'business_',
        requiresModeration: true
      },
      social: {
        name: 'Social e Comunidade',
        nameEn: 'Social & Community',
        description: 'Eventos sociais, encontros, conversas',
        tags: ['social', 'comunidade', 'eventos', 'encontros'],
        streamPrefix: 'social_',
        requiresModeration: true
      },
      education: {
        name: 'Educação e Língua',
        nameEn: 'Education & Language',
        description: 'Aulas de português, história, literatura',
        tags: ['educacao', 'lingua', 'aulas', 'historia'],
        streamPrefix: 'education_',
        requiresModeration: false
      }
    },
    moderationKeywords: {
      positive: [
        'comunidade', 'união', 'família', 'tradição', 'cultura',
        'saudade', 'respeito', 'solidariedade', 'lusófono',
        'portugal', 'brasil', 'angola', 'moçambique',
        'community', 'unity', 'family', 'tradition', 'culture'
      ],
      review: [
        'política', 'religião', 'controversia', 'debate',
        'politics', 'religion', 'controversy', 'debate'
      ],
      blocked: [
        'spam', 'scam', 'fraud', 'inappropriate',
        'hate', 'discrimination', 'racism'
      ]
    }
  },

  community: {
    businessTypes: [
      'Restaurant',
      'Café',
      'Bakery',
      'Services',
      'Professional',
      'Retail',
      'Cultural'
    ],
    eventTypes: [
      'Cultural',
      'Business Networking',
      'Social',
      'Educational',
      'Food & Wine',
      'Music & Arts',
      'Sports'
    ],
    networkingCategories: [
      'Business Professionals',
      'Entrepreneurs',
      'Students',
      'Families',
      'Cultural Enthusiasts',
      'Recent Immigrants'
    ],
    professionalSectors: [
      'Technology',
      'Finance',
      'Healthcare',
      'Education',
      'Hospitality',
      'Construction',
      'Creative Industries'
    ]
  }
};

// Example: Italian Heritage Configuration
export const ITALIAN_HERITAGE: HeritageConfig = {
  identity: {
    name: 'Italian',
    code: 'it',
    defaultLanguage: 'it-IT',
    tagline: {
      native: 'Uniti dalla Tradizione',
      english: 'United by Tradition'
    }
  },

  branding: {
    colors: {
      primary: '#006633', // Italian green
      secondary: '#CC0000', // Italian red
      accent: '#FFD700', // Gold
      action: '#DC143C', // Deep red
      premium: '#4B0082', // Indigo
      coral: '#FF6347' // Tomato
    },
    symbols: {
      flag: '🇮🇹',
      primary: '🏛️', // Classical architecture
      secondary: '🍝' // Pasta representing cuisine
    },
    culturalEmoji: '🇮🇹'
  },

  geography: {
    mainCountry: {
      name: 'Italy',
      code: 'IT',
      timezone: 'Europe/Rome',
      currency: 'EUR'
    },
    diasporaHub: {
      city: 'London',
      country: 'United Kingdom',
      timezone: 'Europe/London',
      currency: 'GBP',
      culturalAreas: [
        'Little Italy (Clerkenwell)',
        'Soho',
        'South London',
        'North London'
      ]
    }
  },

  culture: {
    traditions: ['Renaissance Art', 'Opera', 'Family Values', 'Catholic Heritage'],
    foods: ['Pasta', 'Pizza', 'Gelato', 'Espresso', 'Parmigiano'],
    music: ['Opera', 'Classical', 'Folk', 'Modern Italian'],
    celebrations: ['Ferragosto', 'Carnevale', 'Christmas', 'Easter'],
    languages: ['Italian', 'Regional dialects'],
    values: ['Family', 'Art', 'Food', 'Heritage', 'Community']
  },

  streaming: {
    emotes: {
      ':pasta:': {
        unicode: '🍝',
        description: 'Italian pasta tradition',
        cultural: true
      },
      ':opera:': {
        unicode: '🎭',
        description: 'Italian opera culture',
        cultural: true
      },
      ':calcio:': {
        unicode: '⚽',
        description: 'Italian football passion',
        cultural: true
      },
      ':famiglia:': {
        unicode: '👨‍👩‍👧‍👦',
        description: 'Italian family values',
        cultural: true
      }
    },
    contentCategories: {
      cultural: {
        name: 'Contenuto Culturale',
        nameEn: 'Cultural Content',
        description: 'Arte, tradizioni, cultura italiana',
        tags: ['arte', 'tradizioni', 'cultura', 'storia'],
        streamPrefix: 'cultural_',
        requiresModeration: false
      },
      business: {
        name: 'Business e Imprenditoria',
        nameEn: 'Business & Entrepreneurship',
        description: 'Workshop, networking, startup italiani',
        tags: ['business', 'startup', 'networking', 'workshop'],
        streamPrefix: 'business_',
        requiresModeration: true
      }
    },
    moderationKeywords: {
      positive: [
        'famiglia', 'tradizione', 'cultura', 'comunità',
        'arte', 'cucina', 'heritage', 'italiano',
        'family', 'tradition', 'culture', 'community'
      ],
      review: [
        'politica', 'religione', 'controversia',
        'politics', 'religion', 'controversy'
      ],
      blocked: [
        'spam', 'scam', 'fraud', 'inappropriate',
        'hate', 'discrimination', 'racism'
      ]
    }
  },

  community: {
    businessTypes: [
      'Ristorante',
      'Pizzeria',
      'Gelateria',
      'Delicatessen',
      'Services',
      'Professional'
    ],
    eventTypes: [
      'Cultural',
      'Business Networking',
      'Culinary',
      'Arts',
      'Music',
      'Family'
    ],
    networkingCategories: [
      'Business Professionals',
      'Chefs & Restaurateurs',
      'Artists',
      'Families',
      'Students'
    ],
    professionalSectors: [
      'Hospitality',
      'Fashion',
      'Design',
      'Technology',
      'Finance',
      'Arts'
    ]
  }
};

// Heritage configuration manager
export class HeritageManager {
  private static instance: HeritageManager;
  private currentHeritage: HeritageConfig;

  private constructor() {
    // Default to Portuguese heritage
    this.currentHeritage = PORTUGUESE_HERITAGE;
    
    // Load from environment or localStorage
    const heritageCode = process.env.NEXT_PUBLIC_HERITAGE_CODE || 
                        (typeof window !== 'undefined' ? localStorage.getItem('heritage-code') : null);
    
    if (heritageCode) {
      this.setHeritage(heritageCode);
    }
  }

  public static getInstance(): HeritageManager {
    if (!HeritageManager.instance) {
      HeritageManager.instance = new HeritageManager();
    }
    return HeritageManager.instance;
  }

  public getCurrentHeritage(): HeritageConfig {
    return this.currentHeritage;
  }

  public setHeritage(code: string): boolean {
    const heritageConfigs: Record<string, HeritageConfig> = {
      'pt': PORTUGUESE_HERITAGE,
      'it': ITALIAN_HERITAGE
    };

    if (heritageConfigs[code]) {
      this.currentHeritage = heritageConfigs[code];
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('heritage-code', code);
      }
      
      return true;
    }
    
    return false;
  }

  public getAvailableHeritages(): Array<{ code: string; name: string; flag: string }> {
    return [
      {
        code: 'pt',
        name: 'Portuguese',
        flag: PORTUGUESE_HERITAGE.branding.symbols.flag
      },
      {
        code: 'it',
        name: 'Italian',
        flag: ITALIAN_HERITAGE.branding.symbols.flag
      }
    ];
  }

  // Utility methods for easy access
  public getColors() {
    return this.currentHeritage.branding.colors;
  }

  public getSymbols() {
    return this.currentHeritage.branding.symbols;
  }

  public getEmotes() {
    return this.currentHeritage.streaming.emotes;
  }

  public getCulturalAreas() {
    return this.currentHeritage.geography.diasporaHub.culturalAreas;
  }

  public getBusinessTypes() {
    return this.currentHeritage.community.businessTypes;
  }

  public moderateContent(text: string, language?: string) {
    const lowerText = text.toLowerCase();
    const keywords = this.currentHeritage.streaming.moderationKeywords;
    
    const isBlocked = keywords.blocked.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    const needsReview = keywords.review.some(keyword =>
      lowerText.includes(keyword.toLowerCase())
    );
    
    const isPositive = keywords.positive.some(keyword =>
      lowerText.includes(keyword.toLowerCase())
    );
    
    return {
      approved: !isBlocked,
      flagged: needsReview,
      positive: isPositive,
      score: isBlocked ? 0 : (needsReview ? 0.5 : (isPositive ? 1 : 0.7))
    };
  }
}

// Default export for convenience
export default HeritageManager.getInstance();