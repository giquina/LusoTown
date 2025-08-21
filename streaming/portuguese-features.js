#!/usr/bin/env node
/**
 * HeritageTown Cultural Community Streaming Features
 * Configurable cultural emotes, content moderation, and community tools
 * Default: Portuguese community configuration
 */

// Load heritage configuration
const heritageCode = process.env.HERITAGE_CODE || 'pt';

// Portuguese cultural emotes system (default)
const portugueseEmotes = {
  // Core Portuguese emotions and expressions
  ':saudade:': {
    unicode: '💔',
    description: 'Portuguese feeling of longing/nostalgia',
    regions: ['portugal', 'brazil', 'diaspora'],
    cultural: true
  },
  ':festa:': {
    unicode: '🎉',
    description: 'Portuguese celebration/party',
    regions: ['portugal', 'brazil', 'angola', 'mozambique'],
    cultural: true
  },
  ':futebol:': {
    unicode: '⚽',
    description: 'Football/soccer - Portuguese passion',
    regions: ['portugal', 'brazil', 'all'],
    cultural: true
  },
  ':fado:': {
    unicode: '🎵',
    description: 'Traditional Portuguese music',
    regions: ['portugal', 'diaspora'],
    cultural: true
  },
  ':bacalhau:': {
    unicode: '🐟',
    description: 'Portuguese codfish tradition',
    regions: ['portugal', 'diaspora'],
    cultural: true
  },
  ':pastel:': {
    unicode: '🥟',
    description: 'Pastel de nata - Portuguese pastry',
    regions: ['portugal', 'diaspora'],
    cultural: true
  },
  ':caipirinha:': {
    unicode: '🍹',
    description: 'Brazilian traditional drink',
    regions: ['brazil', 'diaspora'],
    cultural: true
  },
  ':cristo:': {
    unicode: '🗽',
    description: 'Cristo Redentor - Brazilian landmark',
    regions: ['brazil', 'diaspora'],
    cultural: true
  },
  ':angola:': {
    unicode: '🇦🇴',
    description: 'Angola flag and pride',
    regions: ['angola', 'diaspora'],
    cultural: true
  },
  ':mozambique:': {
    unicode: '🇲🇿',
    description: 'Mozambique flag and pride',
    regions: ['mozambique', 'diaspora'],
    cultural: true
  },
  ':london:': {
    unicode: '🇬🇧',
    description: 'Portuguese community in London',
    regions: ['diaspora', 'uk'],
    cultural: true
  },
  ':lusitano:': {
    unicode: '🤝',
    description: 'Lusophone community unity',
    regions: ['all'],
    cultural: true
  }
};

// Portuguese content categories for streaming
const contentCategories = {
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
    tags: ['negocios', 'startups', 'networking', 'workshops', 'empreendedorismo'],
    streamPrefix: 'business_',
    requiresModeration: true
  },
  social: {
    name: 'Social e Comunidade',
    nameEn: 'Social & Community',
    description: 'Eventos sociais, encontros, conversas',
    tags: ['social', 'comunidade', 'eventos', 'encontros', 'conversas'],
    streamPrefix: 'social_',
    requiresModeration: true
  },
  education: {
    name: 'Educação e Língua',
    nameEn: 'Education & Language',
    description: 'Aulas de português, história, literatura',
    tags: ['educacao', 'lingua', 'aulas', 'historia', 'literatura'],
    streamPrefix: 'education_',
    requiresModeration: false
  },
  food: {
    name: 'Gastronomia Portuguesa',
    nameEn: 'Portuguese Gastronomy',
    description: 'Culinária, receitas, tradições culinárias',
    tags: ['culinaria', 'receitas', 'comida', 'gastronomia', 'cozinha'],
    streamPrefix: 'food_',
    requiresModeration: false
  },
  sports: {
    name: 'Desporto',
    nameEn: 'Sports',
    description: 'Futebol, desportos, comentários',
    tags: ['futebol', 'desporto', 'comentarios', 'jogos', 'competicoes'],
    streamPrefix: 'sports_',
    requiresModeration: true
  }
};

// Portuguese community moderation keywords
const moderationKeywords = {
  // Positive Portuguese community terms (encouraged)
  positive: [
    'comunidade', 'união', 'família', 'tradição', 'cultura',
    'saudade', 'respeito', 'solidariedade', 'lusófono',
    'portugal', 'brasil', 'angola', 'moçambique', 'união',
    'community', 'unity', 'family', 'tradition', 'culture'
  ],
  
  // Content flags for review (not blocked, just flagged)
  review: [
    'política', 'religião', 'controversia', 'debate',
    'politics', 'religion', 'controversy', 'debate'
  ],
  
  // Spam/inappropriate (blocked)
  blocked: [
    'spam', 'scam', 'fraud', 'inappropriate',
    'hate', 'discrimination', 'racism'
  ]
};

// Portuguese regional settings
const regionalSettings = {
  portugal: {
    timezone: 'Europe/Lisbon',
    currency: 'EUR',
    language: 'pt-PT',
    dialects: ['continental', 'madeira', 'acores'],
    culturalEvents: ['santos_populares', 'fado', 'folk_festivals']
  },
  brazil: {
    timezone: 'America/Sao_Paulo',
    currency: 'BRL', 
    language: 'pt-BR',
    dialects: ['carioca', 'paulista', 'nordestino', 'gaucho'],
    culturalEvents: ['carnaval', 'festa_junina', 'folklore']
  },
  angola: {
    timezone: 'Africa/Luanda',
    currency: 'AOA',
    language: 'pt-AO',
    dialects: ['luanda', 'regional'],
    culturalEvents: ['independence_day', 'traditional_music']
  },
  mozambique: {
    timezone: 'Africa/Maputo', 
    currency: 'MZN',
    language: 'pt-MZ',
    dialects: ['maputo', 'regional'],
    culturalEvents: ['independence_day', 'traditional_dance']
  },
  diaspora: {
    timezone: 'Europe/London',  // UK-focused
    currency: 'GBP',
    language: 'pt-PT',  // Default to Portuguese Portuguese
    dialects: ['mixed', 'london_portuguese'],
    culturalEvents: ['portugal_day_london', 'brazilian_festival', 'cultural_exchange']
  }
};

// Content recommendation engine for Portuguese community
const contentRecommendations = {
  // Peak viewing times for Portuguese community in London
  scheduleOptimal: {
    weekdays: {
      morning: '09:00-11:00',  // Portuguese breakfast shows
      lunch: '12:00-14:00',    // Business content
      evening: '19:00-22:00',  // Cultural/social content
      late: '22:00-24:00'      // Brazil timezone content
    },
    weekends: {
      morning: '10:00-12:00',  // Weekend cultural shows
      afternoon: '14:00-17:00', // Family content
      evening: '19:00-23:00',  // Prime entertainment
      late: '23:00-01:00'      // Late night social
    }
  },
  
  // Content matching based on viewer preferences
  audienceMatching: {
    cultural_enthusiasts: ['fado', 'traditional_music', 'history', 'art'],
    business_professionals: ['networking', 'startups', 'workshops', 'seminars'],
    social_community: ['events', 'meetups', 'discussions', 'gaming'],
    families: ['education', 'cooking', 'family_events', 'children_content'],
    students: ['language_learning', 'study_groups', 'university_content']
  }
};

// Portuguese community analytics tracking
const analyticsEvents = {
  streamStart: {
    category: 'portuguese_streaming',
    action: 'stream_started',
    trackCultural: true,
    trackRegion: true
  },
  emoteUsed: {
    category: 'portuguese_community',
    action: 'emote_used',
    trackEmoteType: true,
    trackCulturalContext: true
  },
  chatMessage: {
    category: 'portuguese_engagement',
    action: 'chat_message',
    trackLanguage: true,
    trackSentiment: true
  },
  viewerJoin: {
    category: 'portuguese_audience',
    action: 'viewer_joined',
    trackRegion: true,
    trackDeviceType: true
  }
};

// Export all Portuguese community features
module.exports = {
  portugueseEmotes,
  contentCategories,
  moderationKeywords,
  regionalSettings,
  contentRecommendations,
  analyticsEvents,
  
  // Helper functions
  getEmotesByRegion: (region) => {
    return Object.entries(portugueseEmotes)
      .filter(([key, emote]) => emote.regions.includes(region) || emote.regions.includes('all'))
      .reduce((obj, [key, emote]) => ({ ...obj, [key]: emote }), {});
  },
  
  getCategoryByPrefix: (streamKey) => {
    for (const [categoryKey, category] of Object.entries(contentCategories)) {
      if (streamKey.startsWith(category.streamPrefix)) {
        return { key: categoryKey, ...category };
      }
    }
    return null;
  },
  
  moderateContent: (text, language = 'pt') => {
    const lowerText = text.toLowerCase();
    
    // Check for blocked content
    const isBlocked = moderationKeywords.blocked.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    // Check for content that needs review
    const needsReview = moderationKeywords.review.some(keyword =>
      lowerText.includes(keyword.toLowerCase())
    );
    
    // Check for positive Portuguese community content
    const isPositive = moderationKeywords.positive.some(keyword =>
      lowerText.includes(keyword.toLowerCase())
    );
    
    return {
      approved: !isBlocked,
      flagged: needsReview,
      positive: isPositive,
      score: isBlocked ? 0 : (needsReview ? 0.5 : (isPositive ? 1 : 0.7))
    };
  },
  
  getOptimalStreamTime: (region = 'diaspora', day = 'weekday') => {
    const schedule = contentRecommendations.scheduleOptimal[day === 'weekend' ? 'weekends' : 'weekdays'];
    const regionSettings = regionalSettings[region];
    
    return {
      schedule,
      timezone: regionSettings.timezone,
      currency: regionSettings.currency,
      language: regionSettings.language
    };
  }
};