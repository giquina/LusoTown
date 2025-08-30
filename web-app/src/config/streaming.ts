/**
 * Portuguese Community Streaming Configuration
 * Cultural streaming categories, OBS integration settings, and Portuguese-focused streaming features
 */

export const STREAMING_CONFIG = {
  // LiveKit Server Configuration
  livekit: {
    wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://lusotown-streaming.livekit.cloud',
    apiKey: process.env.LIVEKIT_API_KEY || '',
    apiSecret: process.env.LIVEKIT_API_SECRET || '',
  },
  
  // Streaming Server Configuration
  server: {
    url: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080',
    rtmpPort: 1935,
    httpPort: 8080,
    hlsPort: 8081,
  },

  // Portuguese Cultural Stream Categories
  categories: {
    musica: {
      id: 'musica',
      name: { pt: 'Música', en: 'Music' },
      description: {
        pt: 'Performances de Fado, Kizomba, música popular portuguesa e outras expressões musicais lusófonas',
        en: 'Fado, Kizomba, Portuguese popular music and other Lusophone musical expressions'
      },
      subcategories: [
        { id: 'fado', name: { pt: 'Fado', en: 'Fado' }, color: '#1e40af' },
        { id: 'kizomba', name: { pt: 'Kizomba', en: 'Kizomba' }, color: '#059669' },
        { id: 'popular', name: { pt: 'Música Popular', en: 'Popular Music' }, color: '#f59e0b' },
        { id: 'tradicional', name: { pt: 'Música Tradicional', en: 'Traditional Music' }, color: '#dc2626' },
        { id: 'contemporanea', name: { pt: 'Música Contemporânea', en: 'Contemporary Music' }, color: '#7c3aed' }
      ],
      icon: '🎵',
      badge: '🇵🇹'
    },
    culinaria: {
      id: 'culinaria',
      name: { pt: 'Culinária', en: 'Cooking' },
      description: {
        pt: 'Demonstrações culinárias de pratos tradicionais portugueses e de países lusófonos',
        en: 'Culinary demonstrations of traditional Portuguese and Lusophone dishes'
      },
      subcategories: [
        { id: 'tradicional', name: { pt: 'Cozinha Tradicional', en: 'Traditional Cooking' }, color: '#1e40af' },
        { id: 'doces', name: { pt: 'Doçaria Conventual', en: 'Convent Sweets' }, color: '#059669' },
        { id: 'peixe', name: { pt: 'Pratos de Peixe', en: 'Fish Dishes' }, color: '#f59e0b' },
        { id: 'palop', name: { pt: 'Cozinha PALOP', en: 'PALOP Cuisine' }, color: '#dc2626' },
        { id: 'festiva', name: { pt: 'Comida Festiva', en: 'Festive Food' }, color: '#7c3aed' }
      ],
      icon: '🍽️',
      badge: '👨‍🍳'
    },
    cultura: {
      id: 'cultura',
      name: { pt: 'Cultura & História', en: 'Culture & History' },
      description: {
        pt: 'Discussões sobre história portuguesa, tradições culturais e património lusófono',
        en: 'Discussions about Portuguese history, cultural traditions and Lusophone heritage'
      },
      subcategories: [
        { id: 'historia', name: { pt: 'História', en: 'History' }, color: '#1e40af' },
        { id: 'tradicoes', name: { pt: 'Tradições', en: 'Traditions' }, color: '#059669' },
        { id: 'literatura', name: { pt: 'Literatura', en: 'Literature' }, color: '#f59e0b' },
        { id: 'patrimonio', name: { pt: 'Património', en: 'Heritage' }, color: '#dc2626' },
        { id: 'festas', name: { pt: 'Festas Populares', en: 'Folk Festivals' }, color: '#7c3aed' }
      ],
      icon: '📚',
      badge: '🏛️'
    },
    danca: {
      id: 'danca',
      name: { pt: 'Dança', en: 'Dance' },
      description: {
        pt: 'Aulas e performances de danças tradicionais portuguesas e lusófonas',
        en: 'Classes and performances of traditional Portuguese and Lusophone dances'
      },
      subcategories: [
        { id: 'folclorica', name: { pt: 'Dança Folclórica', en: 'Folk Dance' }, color: '#1e40af' },
        { id: 'kizomba', name: { pt: 'Kizomba', en: 'Kizomba' }, color: '#059669' },
        { id: 'corridinho', name: { pt: 'Corridinho', en: 'Corridinho' }, color: '#f59e0b' },
        { id: 'vira', name: { pt: 'Vira', en: 'Vira' }, color: '#dc2626' },
        { id: 'contemporanea', name: { pt: 'Dança Contemporânea', en: 'Contemporary Dance' }, color: '#7c3aed' }
      ],
      icon: '💃',
      badge: '🕺'
    },
    artesanato: {
      id: 'artesanato',
      name: { pt: 'Artesanato', en: 'Crafts' },
      description: {
        pt: 'Demonstrações de artesanato tradicional português e técnicas ancestrais',
        en: 'Demonstrations of traditional Portuguese crafts and ancestral techniques'
      },
      subcategories: [
        { id: 'ceramica', name: { pt: 'Cerâmica', en: 'Ceramics' }, color: '#1e40af' },
        { id: 'bordados', name: { pt: 'Bordados', en: 'Embroidery' }, color: '#059669' },
        { id: 'azulejos', name: { pt: 'Azulejos', en: 'Tiles' }, color: '#f59e0b' },
        { id: 'cestaria', name: { pt: 'Cestaria', en: 'Basketry' }, color: '#dc2626' },
        { id: 'olaria', name: { pt: 'Olaria', en: 'Pottery' }, color: '#7c3aed' }
      ],
      icon: '🎨',
      badge: '✋'
    },
    eventos: {
      id: 'eventos',
      name: { pt: 'Eventos Comunitários', en: 'Community Events' },
      description: {
        pt: 'Transmissões ao vivo de eventos da comunidade portuguesa no Reino Unido',
        en: 'Live broadcasts of Portuguese community events in the United Kingdom'
      },
      subcategories: [
        { id: 'festas', name: { pt: 'Festas Populares', en: 'Folk Festivals' }, color: '#1e40af' },
        { id: 'conferencias', name: { pt: 'Conferências', en: 'Conferences' }, color: '#059669' },
        { id: 'meetups', name: { pt: 'Encontros', en: 'Meetups' }, color: '#f59e0b' },
        { id: 'celebracoes', name: { pt: 'Celebrações', en: 'Celebrations' }, color: '#dc2626' },
        { id: 'workshops', name: { pt: 'Oficinas', en: 'Workshops' }, color: '#7c3aed' }
      ],
      icon: '🎪',
      badge: '🎉'
    },
    conversas: {
      id: 'conversas',
      name: { pt: 'Conversas & Talk Shows', en: 'Talks & Talk Shows' },
      description: {
        pt: 'Programas de conversa sobre temas relevantes para a comunidade portuguesa',
        en: 'Talk shows about topics relevant to the Portuguese-speaking community'
      },
      subcategories: [
        { id: 'entrevistas', name: { pt: 'Entrevistas', en: 'Interviews' }, color: '#1e40af' },
        { id: 'debates', name: { pt: 'Debates', en: 'Debates' }, color: '#059669' },
        { id: 'podcasts', name: { pt: 'Podcasts', en: 'Podcasts' }, color: '#f59e0b' },
        { id: 'noticias', name: { pt: 'Notícias', en: 'News' }, color: '#dc2626' },
        { id: 'discussoes', name: { pt: 'Discussões', en: 'Discussions' }, color: '#7c3aed' }
      ],
      icon: '🎤',
      badge: '💬'
    }
  },

  // OBS Integration Settings
  obs: {
    streamKey: {
      format: 'lusotown_${userId}_${streamId}_${timestamp}',
      length: 32
    },
    recommended: {
      resolution: '1920x1080',
      fps: 30,
      bitrate: {
        video: 2500, // kbps
        audio: 160   // kbps
      },
      encoder: 'x264',
      preset: 'veryfast',
      keyframe: 2
    },
    mobile: {
      resolution: '1280x720',
      fps: 30,
      bitrate: {
        video: 1500, // kbps
        audio: 128   // kbps
      }
    }
  },

  // Stream Quality Settings
  quality: {
    levels: [
      { name: '1080p', width: 1920, height: 1080, bitrate: 2500, fps: 30 },
      { name: '720p', width: 1280, height: 720, bitrate: 1500, fps: 30 },
      { name: '480p', width: 854, height: 480, bitrate: 1000, fps: 30 },
      { name: '360p', width: 640, height: 360, bitrate: 600, fps: 30 }
    ],
    adaptive: true,
    autoQuality: true
  },

  // Chat Configuration
  chat: {
    enabled: true,
    moderation: true,
    portuguese: {
      welcomeMessage: {
        pt: 'Bem-vindos ao canal! Por favor mantenham o respeito pela nossa comunidade lusófona 🇵🇹',
        en: 'Welcome to the channel! Please maintain respect for our Portuguese-speaking community 🇵🇹'
      },
      moderationKeywords: [
        'spam', 'flood', 'insulto', 'ofensa', 'discriminação', 
        'hate', 'harassment', 'abuse', 'troll'
      ],
      culturalPhrases: [
        { pt: 'Muito bom!', en: 'Very good!', emoji: '👏' },
        { pt: 'Excelente!', en: 'Excellent!', emoji: '🎉' },
        { pt: 'Obrigado/a!', en: 'Thank you!', emoji: '🙏' },
        { pt: 'Parabéns!', en: 'Congratulations!', emoji: '🎊' }
      ]
    },
    maxLength: 200,
    rateLimit: {
      messages: 5,
      window: 60000 // 1 minute
    }
  },

  // Stream Recording
  recording: {
    enabled: true,
    format: 'mp4',
    quality: 'high',
    storage: {
      provider: 'cloudinary',
      folder: 'portuguese-streams',
      autoUpload: true
    }
  },

  // Portuguese Regional Features
  regional: {
    timezones: [
      { id: 'london', name: 'London (GMT)', offset: '+00:00' },
      { id: 'lisbon', name: 'Lisboa (WET)', offset: '+00:00' },
      { id: 'azores', name: 'Açores (AZOT)', offset: '-01:00' },
      { id: 'brasil', name: 'Brasil (BRT)', offset: '-03:00' },
      { id: 'cabo_verde', name: 'Cabo Verde (CVT)', offset: '-01:00' }
    ],
    schedule: {
      popular: [
        { time: '19:00', name: { pt: 'Fado às 19h', en: '7pm Fado' } },
        { time: '20:00', name: { pt: 'Culinária às 20h', en: '8pm Cooking' } },
        { time: '21:00', name: { pt: 'Conversas às 21h', en: '9pm Talks' } }
      ]
    }
  },

  // Analytics and Metrics
  analytics: {
    enabled: true,
    trackViews: true,
    trackEngagement: true,
    trackCultural: true, // Portuguese-specific metrics
    culturalMetrics: [
      'portuguese_language_usage',
      'cultural_category_preferences',
      'regional_viewer_distribution',
      'lusophone_engagement_rate'
    ]
  },

  // Mobile Streaming
  mobile: {
    enabled: true,
    minResolution: '720p',
    adaptiveBitrate: true,
    lowLatency: true,
    touchControls: {
      enabled: true,
      culturalGestures: true // Portuguese community-specific gestures
    }
  }
} as const

// Stream Room Configuration
export const STREAM_ROOMS = {
  public: {
    maxParticipants: 100,
    allowScreenShare: true,
    allowChat: true,
    recordByDefault: false
  },
  community: {
    maxParticipants: 50,
    allowScreenShare: true,
    allowChat: true,
    recordByDefault: true,
    requireHeritage: false // Open to all Portuguese-speaking community members
  },
  cultural: {
    maxParticipants: 30,
    allowScreenShare: true,
    allowChat: true,
    recordByDefault: true,
    requireHeritage: false, // Cultural content open to all
    moderationStrict: true
  },
  private: {
    maxParticipants: 10,
    allowScreenShare: true,
    allowChat: true,
    recordByDefault: false,
    inviteOnly: true
  }
} as const

// Portuguese Stream Templates
export const STREAM_TEMPLATES = {
  fado_performance: {
    name: { pt: 'Performance de Fado', en: 'Fado Performance' },
    category: 'musica',
    subcategory: 'fado',
    defaultTitle: { pt: 'Noite de Fado ao Vivo', en: 'Live Fado Night' },
    suggestedTags: ['fado', 'musica-tradicional', 'portugal', 'performance'],
    overlay: {
      banner: 'fado-night-banner.png',
      logo: 'lusotown-fado-logo.png'
    }
  },
  cooking_show: {
    name: { pt: 'Programa de Culinária', en: 'Cooking Show' },
    category: 'culinaria',
    subcategory: 'tradicional',
    defaultTitle: { pt: 'Cozinha Portuguesa Tradicional', en: 'Traditional Portuguese Cooking' },
    suggestedTags: ['culinaria', 'receitas', 'tradicional', 'portugal'],
    overlay: {
      banner: 'cooking-show-banner.png',
      logo: 'lusotown-chef-logo.png'
    }
  },
  cultural_talk: {
    name: { pt: 'Conversa Cultural', en: 'Cultural Talk' },
    category: 'conversas',
    subcategory: 'discussoes',
    defaultTitle: { pt: 'Conversa sobre Cultura Portuguesa', en: 'Talk about Portuguese Culture' },
    suggestedTags: ['cultura', 'historia', 'tradicoes', 'portugal'],
    overlay: {
      banner: 'cultural-talk-banner.png',
      logo: 'lusotown-culture-logo.png'
    }
  }
} as const

// Stream Monetization (if enabled)
export const STREAM_MONETIZATION = {
  enabled: false, // Currently disabled for community focus
  donations: {
    enabled: false,
    platforms: ['stripe', 'paypal'],
    currencies: ['GBP', 'EUR'],
    suggestions: [5, 10, 25, 50]
  },
  subscriptions: {
    enabled: false,
    tiers: []
  }
} as const