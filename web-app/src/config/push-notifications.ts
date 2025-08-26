// Push Notifications Configuration for Portuguese-speaking Community
// Comprehensive PWA notification system with Portuguese cultural context

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  title: {
    en: string;
    pt: string;
  };
  body: {
    en: string;
    pt: string;
  };
  icon?: string;
  badge?: string;
  actions?: NotificationAction[];
  culturalContext?: CulturalContext;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  requireInteraction?: boolean;
  vibrate?: number[];
  sound?: string;
}

export interface NotificationAction {
  action: string;
  title: {
    en: string;
    pt: string;
  };
  icon?: string;
}

export interface CulturalContext {
  region: 'portugal' | 'brazil' | 'angola' | 'mozambique' | 'cape-verde' | 'timor-leste' | 'guinea-bissau' | 'sao-tome' | 'all';
  tradition?: string;
  significance?: string;
  heritage?: 'lusophone' | 'palop' | 'brazilian' | 'portuguese';
  celebration?: string;
}

export type NotificationType = 
  | 'cultural-event'
  | 'festa'
  | 'fado-night' 
  | 'community-match'
  | 'business-update'
  | 'restaurant-special'
  | 'cultural-celebration'
  | 'heritage-reminder'
  | 'lusophone-news'
  | 'emergency'
  | 'premium-content'
  | 'lusobot-insight'
  | 'networking-opportunity'
  | 'student-event'
  | 'transport-update';

export const NOTIFICATION_CATEGORIES = {
  CULTURAL: {
    id: 'cultural',
    name: { en: 'Cultural Events', pt: 'Eventos Culturais' },
    description: { 
      en: 'Portuguese celebrations, festivals, and cultural activities',
      pt: 'Celebrações portuguesas, festivais e atividades culturais'
    },
    icon: 'calendar',
    color: '#DC2626',
    defaultEnabled: true
  },
  COMMUNITY: {
    id: 'community',
    name: { en: 'Community Matches', pt: 'Matches da Comunidade' },
    description: { 
      en: 'New Portuguese-speaking community connections and matches',
      pt: 'Novas conexões e matches da comunidade de falantes de português'
    },
    icon: 'heart',
    color: '#EC4899',
    defaultEnabled: true
  },
  BUSINESS: {
    id: 'business',
    name: { en: 'Business Updates', pt: 'Atualizações de Negócios' },
    description: { 
      en: 'Portuguese business offers, new listings, and reviews',
      pt: 'Ofertas de negócios portugueses, novos anúncios e avaliações'
    },
    icon: 'briefcase',
    color: '#059669',
    defaultEnabled: false
  },
  HERITAGE: {
    id: 'heritage',
    name: { en: 'Heritage Celebrations', pt: 'Celebrações do Património' },
    description: { 
      en: 'Portuguese national days, cultural heritage, and traditions',
      pt: 'Dias nacionais portugueses, património cultural e tradições'
    },
    icon: 'flag',
    color: '#7C3AED',
    defaultEnabled: true
  },
  AI_INSIGHTS: {
    id: 'ai-insights',
    name: { en: 'LusoBot Insights', pt: 'Insights do LusoBot' },
    description: { 
      en: 'AI-powered cultural wisdom and therapeutic support',
      pt: 'Sabedoria cultural e apoio terapêutico do IA'
    },
    icon: 'brain',
    color: '#0EA5E9',
    defaultEnabled: true
  },
  EMERGENCY: {
    id: 'emergency',
    name: { en: 'Emergency Alerts', pt: 'Alertas de Emergência' },
    description: { 
      en: 'Important safety and community alerts',
      pt: 'Alertas importantes de segurança e comunidade'
    },
    icon: 'alert-triangle',
    color: '#DC2626',
    defaultEnabled: true
  }
} as const;

export const NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  // Cultural Events
  {
    id: 'fado-night-reminder',
    type: 'fado-night',
    title: {
      en: '🎸 Fado Night Tonight!',
      pt: '🎸 Noite de Fado Hoje!'
    },
    body: {
      en: 'Authentic Portuguese fado performance starts in 2 hours. Experience the soul of Portugal in London.',
      pt: 'Performance autêntica de fado começa em 2 horas. Vive a alma de Portugal em Londres.'
    },
    icon: '/icons/fado-guitar.png',
    priority: 'high',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    actions: [
      {
        action: 'view-event',
        title: { en: 'View Event', pt: 'Ver Evento' },
        icon: '/icons/calendar.png'
      },
      {
        action: 'get-directions',
        title: { en: 'Get Directions', pt: 'Obter Direções' },
        icon: '/icons/navigation.png'
      }
    ],
    culturalContext: {
      region: 'portugal',
      tradition: 'fado',
      significance: 'Traditional Portuguese music expressing saudade',
      heritage: 'lusophone'
    }
  },
  {
    id: 'santo-antonio-festa',
    type: 'festa',
    title: {
      en: '🎉 Santo António Festa Tomorrow!',
      pt: '🎉 Festa de Santo António Amanhã!'
    },
    body: {
      en: 'Join us for sardines, folk dancing, and Portuguese traditions. Celebrate Santo António with the community!',
      pt: 'Junta-te a nós para sardinhas, danças folclóricas e tradições portuguesas. Celebra Santo António com a comunidade!'
    },
    icon: '/icons/santo-antonio.png',
    priority: 'high',
    requireInteraction: true,
    vibrate: [300, 100, 300, 100, 300],
    actions: [
      {
        action: 'rsvp-yes',
        title: { en: 'I\'m Going!', pt: 'Vou!' },
        icon: '/icons/check.png'
      },
      {
        action: 'share-event',
        title: { en: 'Share', pt: 'Partilhar' },
        icon: '/icons/share.png'
      }
    ],
    culturalContext: {
      region: 'portugal',
      tradition: 'santo-antonio',
      significance: 'Traditional Portuguese festa celebrating Santo António',
      heritage: 'portuguese',
      celebration: 'Santos Populares'
    }
  },
  {
    id: 'festa-junina-brazilian',
    type: 'festa',
    title: {
      en: '🌽 Festa Junina Tonight!',
      pt: '🌽 Festa Junina Hoje à Noite!'
    },
    body: {
      en: 'Brazilian winter festival with quadrilha dancing, corn, and canjica. Celebrate Brazilian heritage in London!',
      pt: 'Festival de inverno brasileiro com quadrilha, milho e canjica. Celebra a herança brasileira em Londres!'
    },
    icon: '/icons/festa-junina.png',
    priority: 'high',
    requireInteraction: false,
    vibrate: [200, 100, 200, 100, 300],
    culturalContext: {
      region: 'brazil',
      tradition: 'festa-junina',
      significance: 'Brazilian winter celebration with rural traditions',
      heritage: 'brazilian'
    }
  },

  // Community Matches
  {
    id: 'cultural-match-found',
    type: 'community-match',
    title: {
      en: '💝 New Portuguese Match!',
      pt: '💝 Novo Match Português!'
    },
    body: {
      en: 'Someone from your region with similar cultural interests wants to connect. 95% compatibility!',
      pt: 'Alguém da tua região com interesses culturais similares quer conectar. 95% de compatibilidade!'
    },
    icon: '/icons/match-heart.png',
    priority: 'normal',
    requireInteraction: false,
    actions: [
      {
        action: 'view-profile',
        title: { en: 'View Profile', pt: 'Ver Perfil' },
        icon: '/icons/user.png'
      },
      {
        action: 'send-message',
        title: { en: 'Send Message', pt: 'Enviar Mensagem' },
        icon: '/icons/message.png'
      }
    ],
    culturalContext: {
      region: 'all',
      heritage: 'lusophone'
    }
  },

  // Business Updates
  {
    id: 'restaurant-special',
    type: 'restaurant-special',
    title: {
      en: '🍽️ Portuguese Restaurant Special!',
      pt: '🍽️ Especial do Restaurante Português!'
    },
    body: {
      en: 'Casa do Bacalhau: 20% off authentic Portuguese dishes this weekend. Pastéis de nata included!',
      pt: 'Casa do Bacalhau: 20% desconto em pratos portugueses autênticos este fim-de-semana. Pastéis de nata incluídos!'
    },
    icon: '/icons/restaurant.png',
    priority: 'low',
    requireInteraction: false,
    culturalContext: {
      region: 'portugal',
      heritage: 'portuguese'
    }
  },

  // Heritage Celebrations
  {
    id: 'portugal-day-reminder',
    type: 'heritage-reminder',
    title: {
      en: '🇵🇹 Portugal Day Tomorrow!',
      pt: '🇵🇹 Dia de Portugal Amanhã!'
    },
    body: {
      en: 'Celebrate Portuguese culture and heritage. Special events across London for the Portuguese community.',
      pt: 'Celebra a cultura e património português. Eventos especiais por toda Londres para a comunidade portuguesa.'
    },
    icon: '/icons/portugal-flag.png',
    priority: 'high',
    requireInteraction: true,
    vibrate: [500, 200, 500, 200, 500],
    culturalContext: {
      region: 'portugal',
      tradition: 'dia-de-portugal',
      significance: 'National day celebrating Portuguese culture and language',
      heritage: 'portuguese'
    }
  },
  {
    id: 'cape-verde-independence',
    type: 'heritage-reminder',
    title: {
      en: '🇨🇻 Cape Verde Independence Day!',
      pt: '🇨🇻 Dia da Independência de Cabo Verde!'
    },
    body: {
      en: 'Celebrating Cape Verdean heritage and the beautiful islands. Morna music event at 7pm.',
      pt: 'Celebrando a herança cabo-verdiana e as belas ilhas. Evento de música morna às 19h.'
    },
    icon: '/icons/cape-verde-flag.png',
    priority: 'high',
    requireInteraction: false,
    culturalContext: {
      region: 'cape-verde',
      tradition: 'independence-day',
      significance: 'Cape Verde independence celebration',
      heritage: 'palop'
    }
  },

  // AI Insights
  {
    id: 'lusobot-cultural-wisdom',
    type: 'lusobot-insight',
    title: {
      en: '🧠 LusoBot Cultural Insight',
      pt: '🧠 Insight Cultural do LusoBot'
    },
    body: {
      en: 'Daily Portuguese wisdom: "Quem não arrisca, não petisca" - Take risks to achieve your dreams.',
      pt: 'Sabedoria portuguesa diária: "Quem não arrisca, não petisca" - Arrisca para alcançar os teus sonhos.'
    },
    icon: '/icons/lusobot.png',
    priority: 'low',
    requireInteraction: false,
    culturalContext: {
      region: 'all',
      heritage: 'lusophone'
    }
  },

  // Emergency Alerts
  {
    id: 'community-emergency',
    type: 'emergency',
    title: {
      en: '🚨 Community Alert',
      pt: '🚨 Alerta da Comunidade'
    },
    body: {
      en: 'Important safety information for the Portuguese-speaking community. Check the app for details.',
      pt: 'Informação importante de segurança para a comunidade de falantes de português. Verifica a app para detalhes.'
    },
    icon: '/icons/emergency.png',
    priority: 'urgent',
    requireInteraction: true,
    vibrate: [1000, 500, 1000, 500, 1000],
    culturalContext: {
      region: 'all',
      heritage: 'lusophone'
    }
  }
];

export const PORTUGUESE_CULTURAL_CALENDAR = [
  {
    date: '01-01',
    name: { en: 'New Year\'s Day', pt: 'Ano Novo' },
    type: 'national-holiday',
    regions: ['all'],
    priority: 'normal'
  },
  {
    date: '02-12',
    name: { en: 'Carnival', pt: 'Carnaval' },
    type: 'cultural-celebration',
    regions: ['brazil', 'cape-verde'],
    priority: 'high'
  },
  {
    date: '03-08',
    name: { en: 'Women\'s Day', pt: 'Dia da Mulher' },
    type: 'national-holiday',
    regions: ['all'],
    priority: 'normal'
  },
  {
    date: '04-25',
    name: { en: 'Freedom Day', pt: 'Dia da Liberdade' },
    type: 'national-holiday',
    regions: ['portugal'],
    priority: 'high'
  },
  {
    date: '05-01',
    name: { en: 'Labor Day', pt: 'Dia do Trabalhador' },
    type: 'national-holiday',
    regions: ['all'],
    priority: 'normal'
  },
  {
    date: '06-10',
    name: { en: 'Portugal Day', pt: 'Dia de Portugal' },
    type: 'national-holiday',
    regions: ['portugal'],
    priority: 'high'
  },
  {
    date: '06-13',
    name: { en: 'Santo António', pt: 'Santo António' },
    type: 'cultural-festa',
    regions: ['portugal'],
    priority: 'high'
  },
  {
    date: '06-24',
    name: { en: 'São João', pt: 'São João' },
    type: 'cultural-festa',
    regions: ['portugal', 'brazil'],
    priority: 'high'
  },
  {
    date: '07-05',
    name: { en: 'Cape Verde Independence', pt: 'Independência de Cabo Verde' },
    type: 'national-holiday',
    regions: ['cape-verde'],
    priority: 'high'
  },
  {
    date: '09-07',
    name: { en: 'Brazil Independence', pt: 'Independência do Brasil' },
    type: 'national-holiday',
    regions: ['brazil'],
    priority: 'high'
  },
  {
    date: '10-05',
    name: { en: 'Republic Day', pt: 'Implantação da República' },
    type: 'national-holiday',
    regions: ['portugal'],
    priority: 'high'
  },
  {
    date: '11-11',
    name: { en: 'Angola Independence', pt: 'Independência de Angola' },
    type: 'national-holiday',
    regions: ['angola'],
    priority: 'high'
  },
  {
    date: '12-01',
    name: { en: 'Restoration Day', pt: 'Restauração da Independência' },
    type: 'national-holiday',
    regions: ['portugal'],
    priority: 'high'
  }
] as const;

export const NOTIFICATION_SETTINGS = {
  // VAPID Configuration (should be in environment variables)
  VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa40HI80j4xKg9XlQjC0I1LVIE7w_P8YcLgL1C0LB-S9w4PQC5xqm2zWMOz1GM',
  
  // Notification timing
  QUIET_HOURS: {
    start: 22, // 10 PM
    end: 8     // 8 AM
  },
  
  // Batch notification limits
  MAX_DAILY_NOTIFICATIONS: 10,
  MAX_HOURLY_NOTIFICATIONS: 3,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 5000, // 5 seconds
  
  // Cache durations
  TEMPLATE_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  SUBSCRIPTION_CACHE_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  // Portuguese cultural priorities
  CULTURAL_EVENT_ADVANCE_NOTICE: {
    festa: 24 * 60 * 60 * 1000, // 24 hours
    'fado-night': 4 * 60 * 60 * 1000, // 4 hours
    'national-holiday': 3 * 24 * 60 * 60 * 1000, // 3 days
    'community-match': 0, // Immediate
    'business-special': 2 * 60 * 60 * 1000 // 2 hours
  }
} as const;

export const PUSH_NOTIFICATION_CONFIG = {
  serviceWorkerUrl: '/sw.js',
  scope: '/',
  userVisibleOnly: true,
  applicationServerKey: NOTIFICATION_SETTINGS.VAPID_PUBLIC_KEY
} as const;

// Portuguese cultural notification sounds
export const NOTIFICATION_SOUNDS = {
  'fado-night': '/sounds/fado-snippet.mp3',
  'festa': '/sounds/festa-music.mp3',
  'community-match': '/sounds/gentle-chime.mp3',
  'emergency': '/sounds/urgent-alert.mp3',
  'heritage-reminder': '/sounds/portuguese-hymn.mp3',
  'default': '/sounds/notification.mp3'
} as const;

// Mobile optimization settings
export const MOBILE_NOTIFICATION_CONFIG = {
  // Touch-friendly action button sizes
  actionButtonMinSize: 44, // 44px minimum touch target
  
  // Vibration patterns for different cultures
  vibrationPatterns: {
    portugal: [200, 100, 200],
    brazil: [300, 100, 300, 100, 300],
    'cape-verde': [150, 50, 150, 50, 150],
    angola: [250, 100, 250],
    default: [200, 100, 200]
  },
  
  // Rich notification media sizes
  iconSize: 192,
  badgeSize: 72,
  imageMaxWidth: 360,
  imageMaxHeight: 180,
  
  // Portuguese text length considerations
  titleMaxLength: {
    en: 50,
    pt: 65 // Portuguese titles are typically longer
  },
  bodyMaxLength: {
    en: 160,
    pt: 200 // Portuguese descriptions are typically longer
  }
} as const;

export default {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_TEMPLATES,
  PORTUGUESE_CULTURAL_CALENDAR,
  NOTIFICATION_SETTINGS,
  PUSH_NOTIFICATION_CONFIG,
  NOTIFICATION_SOUNDS,
  MOBILE_NOTIFICATION_CONFIG
};