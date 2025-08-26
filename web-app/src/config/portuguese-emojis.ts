/**
 * Portuguese Cultural Emojis and Expressions Configuration
 * 
 * Configuration for Portuguese cultural emoji packs, expressions, and idioms
 * Supporting all Lusophone countries and regional variations
 */

export interface EmojiPack {
  name: string
  description: string
  country: string
  flag: string
  emojis: EmojiItem[]
}

export interface EmojiItem {
  emoji: string
  name: string
  description: string
  tags: string[]
  usage: 'formal' | 'casual' | 'both'
  cultural_significance?: string
}

export interface CulturalExpression {
  text: string
  emoji: string
  meaning: string
  usage_context: string
  region: string[]
  formality: 'formal' | 'casual' | 'mixed'
}

export interface GreetingTemplate {
  id: string
  text: string
  emoji: string
  context: string
  time_of_day?: 'morning' | 'afternoon' | 'evening' | 'any'
  formality: 'formal' | 'casual' | 'mixed'
  region: string[]
}

// Portuguese Cultural Emoji Packs
export const PORTUGUESE_EMOJI_PACKS: Record<string, EmojiPack> = {
  portugal: {
    name: 'Portugal Pack',
    description: 'Traditional Portuguese cultural emojis',
    country: 'Portugal',
    flag: '🇵🇹',
    emojis: [
      {
        emoji: '🐟',
        name: 'Bacalhau',
        description: 'Portuguese codfish - cultural staple',
        tags: ['food', 'tradition', 'culture'],
        usage: 'both',
        cultural_significance: 'Central to Portuguese cuisine and culture'
      },
      {
        emoji: '🏺',
        name: 'Azulejo',
        description: 'Portuguese ceramic tiles',
        tags: ['art', 'architecture', 'tradition'],
        usage: 'both',
        cultural_significance: 'Traditional Portuguese decorative art'
      },
      {
        emoji: '🎭',
        name: 'Fado',
        description: 'Traditional Portuguese music',
        tags: ['music', 'emotion', 'tradition'],
        usage: 'both',
        cultural_significance: 'UNESCO recognized Portuguese musical expression'
      },
      {
        emoji: '⛵',
        name: 'Caravela',
        description: 'Portuguese exploration ships',
        tags: ['history', 'exploration', 'pride'],
        usage: 'both',
        cultural_significance: 'Symbol of Portuguese maritime heritage'
      },
      {
        emoji: '🧿',
        name: 'Olho Turco',
        description: 'Evil eye protection',
        tags: ['protection', 'tradition', 'superstition'],
        usage: 'casual',
        cultural_significance: 'Traditional protective symbol'
      },
      {
        emoji: '🌊',
        name: 'Saudade',
        description: 'Deep longing/nostalgia',
        tags: ['emotion', 'longing', 'culture'],
        usage: 'both',
        cultural_significance: 'Uniquely Portuguese emotional concept'
      }
    ]
  },
  brazil: {
    name: 'Brazil Pack',
    description: 'Brazilian Portuguese cultural emojis',
    country: 'Brazil',
    flag: '🇧🇷',
    emojis: [
      {
        emoji: '🍹',
        name: 'Caipirinha',
        description: 'Brazilian national cocktail',
        tags: ['drink', 'party', 'culture'],
        usage: 'casual',
        cultural_significance: 'National drink of Brazil'
      },
      {
        emoji: '🎭',
        name: 'Carnaval',
        description: 'Brazilian carnival celebration',
        tags: ['celebration', 'music', 'dance'],
        usage: 'casual',
        cultural_significance: 'Most famous Brazilian cultural celebration'
      },
      {
        emoji: '⚽',
        name: 'Futebol',
        description: 'Brazilian football passion',
        tags: ['sport', 'passion', 'culture'],
        usage: 'casual',
        cultural_significance: 'Central to Brazilian national identity'
      },
      {
        emoji: '🏖️',
        name: 'Praia',
        description: 'Beach culture',
        tags: ['beach', 'lifestyle', 'relaxation'],
        usage: 'casual',
        cultural_significance: 'Essential part of Brazilian coastal culture'
      },
      {
        emoji: '🎶',
        name: 'Samba',
        description: 'Brazilian musical genre',
        tags: ['music', 'dance', 'rhythm'],
        usage: 'casual',
        cultural_significance: 'Quintessential Brazilian music and dance'
      },
      {
        emoji: '☕',
        name: 'Café',
        description: 'Brazilian coffee culture',
        tags: ['drink', 'culture', 'social'],
        usage: 'both',
        cultural_significance: 'Brazil is a major coffee producer and consumer'
      }
    ]
  },
  capeverde: {
    name: 'Cape Verde Pack',
    description: 'Cape Verdean cultural emojis',
    country: 'Cape Verde',
    flag: '🇨🇻',
    emojis: [
      {
        emoji: '🎵',
        name: 'Morna',
        description: 'Cape Verdean musical genre',
        tags: ['music', 'emotion', 'tradition'],
        usage: 'both',
        cultural_significance: 'Traditional Cape Verdean music expressing sodade'
      },
      {
        emoji: '🌊',
        name: 'Sodade',
        description: 'Cape Verdean longing',
        tags: ['emotion', 'longing', 'island'],
        usage: 'both',
        cultural_significance: 'Cape Verdean concept similar to saudade'
      },
      {
        emoji: '🏝️',
        name: 'Ilha',
        description: 'Island life',
        tags: ['island', 'ocean', 'home'],
        usage: 'both',
        cultural_significance: 'Island identity central to Cape Verdean culture'
      },
      {
        emoji: '🍲',
        name: 'Cachupa',
        description: 'National dish of Cape Verde',
        tags: ['food', 'tradition', 'comfort'],
        usage: 'both',
        cultural_significance: 'National dish representing Cape Verdean heritage'
      },
      {
        emoji: '🥁',
        name: 'Batuko',
        description: 'Traditional Cape Verdean rhythm',
        tags: ['music', 'rhythm', 'community'],
        usage: 'casual',
        cultural_significance: 'Traditional community musical expression'
      }
    ]
  },
  angola: {
    name: 'Angola Pack',
    description: 'Angolan Portuguese cultural emojis',
    country: 'Angola',
    flag: '🇦🇴',
    emojis: [
      {
        emoji: '🎭',
        name: 'Kuduro',
        description: 'Angolan music and dance',
        tags: ['music', 'dance', 'energy'],
        usage: 'casual',
        cultural_significance: 'Popular Angolan musical genre'
      },
      {
        emoji: '💎',
        name: 'Diamante',
        description: 'Angola\'s diamond heritage',
        tags: ['wealth', 'resources', 'pride'],
        usage: 'formal',
        cultural_significance: 'Angola is a major diamond producer'
      },
      {
        emoji: '🦁',
        name: 'Leão',
        description: 'Strength and pride',
        tags: ['strength', 'pride', 'africa'],
        usage: 'both',
        cultural_significance: 'Symbol of African strength and pride'
      },
      {
        emoji: '🌴',
        name: 'Palmeira',
        description: 'Palm trees',
        tags: ['nature', 'tropical', 'home'],
        usage: 'casual',
        cultural_significance: 'Common in Angolan landscape'
      }
    ]
  }
};

// Cultural Expressions with Context
export const CULTURAL_EXPRESSIONS: CulturalExpression[] = [
  {
    text: 'Que saudades!',
    emoji: '💔',
    meaning: 'I miss this/you so much!',
    usage_context: 'Express deep longing or nostalgia',
    region: ['PT', 'BR', 'All'],
    formality: 'casual'
  },
  {
    text: 'Está tudo bem?',
    emoji: '😊',
    meaning: 'Is everything okay?',
    usage_context: 'Caring inquiry about someone\'s wellbeing',
    region: ['PT'],
    formality: 'mixed'
  },
  {
    text: 'Tudo bom?',
    emoji: '👍',
    meaning: 'Everything good?',
    usage_context: 'Casual greeting or check-in',
    region: ['BR'],
    formality: 'casual'
  },
  {
    text: 'Fixe!',
    emoji: '😎',
    meaning: 'Cool! Awesome!',
    usage_context: 'Express approval or excitement (Portuguese)',
    region: ['PT'],
    formality: 'casual'
  },
  {
    text: 'Legal!',
    emoji: '🤙',
    meaning: 'Cool! Nice!',
    usage_context: 'Express approval or agreement (Brazilian)',
    region: ['BR'],
    formality: 'casual'
  },
  {
    text: 'Morabeza',
    emoji: '🤗',
    meaning: 'Cape Verdean hospitality',
    usage_context: 'Express warmth and welcoming spirit',
    region: ['CV'],
    formality: 'mixed'
  },
  {
    text: 'Desenrasca',
    emoji: '🛠️',
    meaning: 'Make do with what you have',
    usage_context: 'Finding creative solutions',
    region: ['PT'],
    formality: 'casual'
  },
  {
    text: 'Jeitinho brasileiro',
    emoji: '😉',
    meaning: 'Brazilian way of getting things done',
    usage_context: 'Finding creative/flexible solutions',
    region: ['BR'],
    formality: 'casual'
  }
];

// Greeting Templates
export const GREETING_TEMPLATES: GreetingTemplate[] = [
  // Portuguese (Portugal)
  {
    id: 'pt-morning',
    text: 'Bom dia! Como está?',
    emoji: '🌅',
    context: 'Formal morning greeting',
    time_of_day: 'morning',
    formality: 'formal',
    region: ['PT']
  },
  {
    id: 'pt-casual-morning',
    text: 'Olá! Tudo bem?',
    emoji: '☀️',
    context: 'Casual morning greeting',
    time_of_day: 'morning',
    formality: 'casual',
    region: ['PT']
  },
  {
    id: 'pt-afternoon',
    text: 'Boa tarde!',
    emoji: '🌤️',
    context: 'Standard afternoon greeting',
    time_of_day: 'afternoon',
    formality: 'mixed',
    region: ['PT']
  },
  {
    id: 'pt-evening',
    text: 'Boa noite! Como passou o dia?',
    emoji: '🌙',
    context: 'Evening greeting with inquiry',
    time_of_day: 'evening',
    formality: 'mixed',
    region: ['PT']
  },

  // Brazilian Portuguese
  {
    id: 'br-morning',
    text: 'Bom dia! Beleza?',
    emoji: '🌞',
    context: 'Casual Brazilian morning greeting',
    time_of_day: 'morning',
    formality: 'casual',
    region: ['BR']
  },
  {
    id: 'br-general',
    text: 'Oi! Como vai?',
    emoji: '😄',
    context: 'General Brazilian greeting',
    time_of_day: 'any',
    formality: 'casual',
    region: ['BR']
  },
  {
    id: 'br-whatsup',
    text: 'E aí? Tudo certo?',
    emoji: '🤙',
    context: 'Very casual Brazilian greeting',
    time_of_day: 'any',
    formality: 'casual',
    region: ['BR']
  },

  // Cape Verde
  {
    id: 'cv-general',
    text: 'Oi! Tudo dreto?',
    emoji: '🏝️',
    context: 'Cape Verdean casual greeting',
    time_of_day: 'any',
    formality: 'casual',
    region: ['CV']
  },
  {
    id: 'cv-formal',
    text: 'Bom dia! Como está?',
    emoji: '🇨🇻',
    context: 'Formal Cape Verdean greeting',
    time_of_day: 'morning',
    formality: 'formal',
    region: ['CV']
  }
];

// Farewell Templates
export const FAREWELL_TEMPLATES: GreetingTemplate[] = [
  {
    id: 'pt-formal-bye',
    text: 'Adeus! Tenha um bom dia.',
    emoji: '👋',
    context: 'Formal Portuguese farewell',
    time_of_day: 'any',
    formality: 'formal',
    region: ['PT']
  },
  {
    id: 'pt-casual-bye',
    text: 'Tchau! Até logo!',
    emoji: '✌️',
    context: 'Casual Portuguese farewell',
    time_of_day: 'any',
    formality: 'casual',
    region: ['PT']
  },
  {
    id: 'br-bye',
    text: 'Falou! Até mais!',
    emoji: '🤙',
    context: 'Brazilian casual farewell',
    time_of_day: 'any',
    formality: 'casual',
    region: ['BR']
  },
  {
    id: 'general-saudade',
    text: 'Até breve! Vou ter saudades!',
    emoji: '💕',
    context: 'Emotional farewell with longing',
    time_of_day: 'any',
    formality: 'casual',
    region: ['PT', 'BR', 'CV']
  }
];

// Reaction Emojis for Portuguese Context
export const PORTUGUESE_REACTIONS = {
  agreement: [
    { emoji: '👍', text: 'Sim!', meaning: 'Yes!' },
    { emoji: '✅', text: 'Exato!', meaning: 'Exactly!' },
    { emoji: '💯', text: 'Perfeito!', meaning: 'Perfect!' }
  ],
  excitement: [
    { emoji: '🎉', text: 'Que fixe!', meaning: 'How cool!' },
    { emoji: '😍', text: 'Adoro!', meaning: 'I love it!' },
    { emoji: '🤩', text: 'Incrível!', meaning: 'Incredible!' }
  ],
  empathy: [
    { emoji: '🤗', text: 'Compreendo...', meaning: 'I understand...' },
    { emoji: '💪', text: 'Força!', meaning: 'Stay strong!' },
    { emoji: '❤️', text: 'Estou contigo!', meaning: 'I\'m with you!' }
  ],
  surprise: [
    { emoji: '😮', text: 'Sério?!', meaning: 'Seriously?!' },
    { emoji: '🤯', text: 'Não acredito!', meaning: 'I can\'t believe it!' },
    { emoji: '😱', text: 'Nossa!', meaning: 'Wow!' }
  ]
};

// Helper Functions
export const getEmojiPackForCountry = (country: string): EmojiPack | null => {
  const countryMap: Record<string, string> = {
    'Portugal': 'portugal',
    'Brazil': 'brazil',
    'Cape Verde': 'capeverde',
    'Angola': 'angola'
  };
  
  const packKey = countryMap[country];
  return packKey ? PORTUGUESE_EMOJI_PACKS[packKey] : null;
};

export const getGreetingForContext = (
  region: string, 
  timeOfDay: string, 
  formality: 'formal' | 'casual'
): GreetingTemplate | null => {
  return GREETING_TEMPLATES.find(template => 
    template.region.includes(region) &&
    (template.time_of_day === timeOfDay || template.time_of_day === 'any') &&
    (template.formality === formality || template.formality === 'mixed')
  ) || null;
};

export const getFarewellForContext = (
  region: string,
  formality: 'formal' | 'casual'
): GreetingTemplate | null => {
  return FAREWELL_TEMPLATES.find(template =>
    template.region.includes(region) &&
    (template.formality === formality || template.formality === 'mixed')
  ) || null;
};

export const getCulturalExpressionsByRegion = (region: string): CulturalExpression[] => {
  return CULTURAL_EXPRESSIONS.filter(expr => 
    expr.region.includes(region) || expr.region.includes('All')
  );
};

export const getReactionsByCategory = (category: keyof typeof PORTUGUESE_REACTIONS) => {
  return PORTUGUESE_REACTIONS[category] || [];
};

export const searchEmojis = (query: string): EmojiItem[] => {
  const results: EmojiItem[] = [];
  
  Object.values(PORTUGUESE_EMOJI_PACKS).forEach(pack => {
    pack.emojis.forEach(emoji => {
      if (
        emoji.name.toLowerCase().includes(query.toLowerCase()) ||
        emoji.description.toLowerCase().includes(query.toLowerCase()) ||
        emoji.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ) {
        results.push(emoji);
      }
    });
  });
  
  return results;
};

export const getRandomGreeting = (region?: string): GreetingTemplate => {
  let templates = GREETING_TEMPLATES;
  
  if (region) {
    templates = templates.filter(t => t.region.includes(region));
  }
  
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getTimeBasedGreeting = (region: string = 'PT'): GreetingTemplate => {
  const hour = new Date().getHours();
  let timeOfDay: 'morning' | 'afternoon' | 'evening';
  
  if (hour < 12) {
    timeOfDay = 'morning';
  } else if (hour < 18) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }
  
  return getGreetingForContext(region, timeOfDay, 'casual') || getRandomGreeting(region);
};