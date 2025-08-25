/**
 * Mobile App Configuration for LusoTown
 * 
 * Configuration for mobile app transition strategy, download CTAs,
 * deep linking, and app store information for Portuguese-speaking community.
 */

export interface MobileAppConfig {
  // App Store Information
  stores: {
    ios: {
      url: string;
      id: string;
      scheme: string;
    };
    android: {
      url: string;
      id: string;
      scheme: string;
    };
  };
  
  // Deep Link Configuration
  deepLink: {
    scheme: string;
    fallbackUrl: string;
    universalLink: string;
  };
  
  // App Features Preview
  features: Array<{
    id: string;
    title: { en: string; pt: string };
    description: { en: string; pt: string };
    icon: string;
    screenshot?: string;
  }>;
  
  // Community Statistics for Landing Page
  stats: {
    totalMembers: number;
    portugueseEvents: number;
    businessPartners: number;
    universityPartners: number;
  };
  
  // A/B Testing Configuration
  testing: {
    enabled: boolean;
    variants: Array<{
      id: string;
      weight: number;
      config: any;
    }>;
  };
}

export const MOBILE_APP_CONFIG: MobileAppConfig = {
  // App Store URLs and Configuration
  stores: {
    ios: {
      url: 'https://apps.apple.com/app/lusotown/id123456789',
      id: '123456789',
      scheme: 'itms-apps://itunes.apple.com/app/lusotown/id123456789'
    },
    android: {
      url: 'https://play.google.com/store/apps/details?id=com.lusotown.android',
      id: 'com.lusotown.android',
      scheme: 'market://details?id=com.lusotown.android'
    }
  },
  
  // Deep Linking Setup
  deepLink: {
    scheme: 'lusotown',
    fallbackUrl: '/?utm_source=deep_link_fallback',
    universalLink: 'https://lusotown.com/app'
  },
  
  // App Features for Preview Carousel
  features: [
    {
      id: 'events_discovery',
      title: {
        en: 'Discover Portuguese Events',
        pt: 'Descubra Eventos Portugueses'
      },
      description: {
        en: 'Find Fado nights, football watch parties, cultural festivals, and Santos Populares celebrations across the United Kingdom',
        pt: 'Encontre noites de Fado, festas de futebol, festivais culturais e celebrações dos Santos Populares em todo o Reino Unido'
      },
      icon: '🎭',
      screenshot: '/screenshots/app-events.png'
    },
    {
      id: 'cultural_matching',
      title: {
        en: 'Meet Lusophone Speakers',
        pt: 'Conheça Falantes Lusófonos'
      },
      description: {
        en: 'Connect with Portuguese speakers from Portugal, Brazil, Cape Verde, Angola, Mozambique and more across the UK',
        pt: 'Conecte-se com falantes de português de Portugal, Brasil, Cabo Verde, Angola, Moçambique e mais em todo o Reino Unido'
      },
      icon: '💕',
      screenshot: '/screenshots/app-matches.png'
    },
    {
      id: 'business_directory',
      title: {
        en: 'Portuguese Business Directory',
        pt: 'Diretório de Negócios Portugueses'
      },
      description: {
        en: 'Discover authentic Portuguese restaurants, services, and businesses owned by the Lusophone community',
        pt: 'Descubra restaurantes portugueses autênticos, serviços e negócios pertencentes à comunidade lusófona'
      },
      icon: '🏪',
      screenshot: '/screenshots/app-businesses.png'
    },
    {
      id: 'cultural_chat',
      title: {
        en: 'Lusophone Community Chat',
        pt: 'Chat da Comunidade Lusófona'
      },
      description: {
        en: 'Join conversations in Portuguese, share cultural experiences, and stay connected with your Lusophone community',
        pt: 'Participe de conversas em português, partilhe experiências culturais e mantenha-se conectado com a sua comunidade lusófona'
      },
      icon: '💬',
      screenshot: '/screenshots/app-chat.png'
    },
    {
      id: 'cultural_calendar',
      title: {
        en: 'Portuguese Cultural Calendar',
        pt: 'Calendário Cultural Português'
      },
      description: {
        en: 'Never miss Portuguese holidays, cultural celebrations, and community events across all Lusophone nations',
        pt: 'Nunca perca feriados portugueses, celebrações culturais e eventos comunitários de todas as nações lusófonas'
      },
      icon: '📅',
      screenshot: '/screenshots/app-calendar.png'
    },
    {
      id: 'offline_access',
      title: {
        en: 'Offline Community Access',
        pt: 'Acesso Offline à Comunidade'
      },
      description: {
        en: 'Access your saved events, business contacts, and cultural information even without internet connection',
        pt: 'Aceda aos seus eventos guardados, contactos comerciais e informações culturais mesmo sem ligação à internet'
      },
      icon: '📱',
      screenshot: '/screenshots/app-offline.png'
    }
  ],
  
  // Community Statistics for Social Proof
  stats: {
    totalMembers: 2750,
    portugueseEvents: 450,
    businessPartners: 180,
    universityPartners: 8
  },
  
  // A/B Testing Configuration
  testing: {
    enabled: true,
    variants: [
      {
        id: 'primary_cta_download',
        weight: 50,
        config: {
          primaryButton: 'Download App',
          secondaryButton: 'Continue to Website',
          hero: 'Get the LusoTown App - Your Portuguese Community in Your Pocket'
        }
      },
      {
        id: 'primary_cta_join',
        weight: 50,
        config: {
          primaryButton: 'Join on Mobile',
          secondaryButton: 'Use Website Version',
          hero: 'Join 2,750+ Portuguese Speakers on Mobile'
        }
      }
    ]
  }
};

// Mobile Device Detection Configuration
export interface DeviceDetectionConfig {
  userAgentPatterns: {
    ios: RegExp[];
    android: RegExp[];
    mobile: RegExp[];
    tablet: RegExp[];
    desktop: RegExp[];
  };
  viewportBreakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const DEVICE_DETECTION_CONFIG: DeviceDetectionConfig = {
  userAgentPatterns: {
    ios: [
      /iPad|iPhone|iPod/,
      /Safari.*Mobile/,
      /iPhone OS/,
      /iPad.*OS/
    ],
    android: [
      /Android/,
      /Mobile.*Android/,
      /Chrome.*Mobile.*Android/
    ],
    mobile: [
      /iPhone|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/,
      /Mobile|Mobi|phone/i
    ],
    tablet: [
      /iPad|Android(?!.*Mobile)|Silk|Kindle/,
      /tablet/i
    ],
    desktop: [
      /Windows NT|Macintosh|Linux(?!.*Android)/
    ]
  },
  viewportBreakpoints: {
    mobile: 768,  // Below this is considered mobile
    tablet: 1024, // Below this (but above mobile) is considered tablet
    desktop: 1024 // Above this is considered desktop
  }
};

// App Download Landing Page Configuration
export interface LandingPageConfig {
  hero: {
    title: { en: string; pt: string };
    subtitle: { en: string; pt: string };
    backgroundImage: string;
    culturalElements: string[];
  };
  trustSignals: Array<{
    id: string;
    type: 'university' | 'business' | 'community' | 'security';
    title: { en: string; pt: string };
    description: { en: string; pt: string };
    icon: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    age: number;
    location: string;
    heritage: string;
    quote: { en: string; pt: string };
    avatar?: string;
  }>;
}

export const LANDING_PAGE_CONFIG: LandingPageConfig = {
  hero: {
    title: {
      en: 'Get the LusoTown App - Your Portuguese Community in Your Pocket',
      pt: 'Baixe o App LusoTown - Sua Comunidade Portuguesa no Bolso'
    },
    subtitle: {
      en: 'Join 2,750+ Portuguese speakers across the United Kingdom. Download the app for exclusive features, offline access, and the best mobile experience.',
      pt: 'Junte-se a 2.750+ falantes de português em todo o Reino Unido. Baixe o aplicativo para recursos exclusivos, acesso offline e a melhor experiência móvel.'
    },
    backgroundImage: '/images/app-hero-background.jpg',
    culturalElements: ['🇵🇹', '🇧🇷', '🇨🇻', '🇦🇴', '🇲🇿', '🇬🇼', '🇸🇹', '🇹🇱', '🇲🇴']
  },
  trustSignals: [
    {
      id: 'university_partnerships',
      type: 'university',
      title: {
        en: '8 University Partnerships',
        pt: '8 Parcerias Universitárias'
      },
      description: {
        en: 'Trusted by Portuguese students at UCL, King\'s College, Imperial, LSE, Oxford, Cambridge, Manchester, and Edinburgh',
        pt: 'Confiado por estudantes portugueses na UCL, King\'s College, Imperial, LSE, Oxford, Cambridge, Manchester e Edinburgh'
      },
      icon: '🎓'
    },
    {
      id: 'verified_community',
      type: 'community',
      title: {
        en: 'Verified Portuguese Community',
        pt: 'Comunidade Portuguesa Verificada'
      },
      description: {
        en: 'All members are verified Portuguese speakers from Portugal, Brazil, PALOP countries, and other Lusophone nations',
        pt: 'Todos os membros são falantes de português verificados de Portugal, Brasil, países PALOP e outras nações lusófonas'
      },
      icon: '✅'
    },
    {
      id: 'secure_platform',
      type: 'security',
      title: {
        en: 'GDPR Compliant & Secure',
        pt: 'GDPR Compliant e Seguro'
      },
      description: {
        en: 'Your privacy is protected with UK data protection standards and GDPR compliance for Portuguese users',
        pt: 'Sua privacidade é protegida com padrões de proteção de dados do Reino Unido e conformidade GDPR para usuários portugueses'
      },
      icon: '🔒'
    },
    {
      id: 'business_network',
      type: 'business',
      title: {
        en: '180+ Portuguese Business Partners',
        pt: '180+ Parceiros Comerciais Portugueses'
      },
      description: {
        en: 'Trusted by Portuguese restaurant owners, service providers, and entrepreneurs across the United Kingdom',
        pt: 'Confiado por proprietários de restaurantes portugueses, prestadores de serviços e empreendedores em todo o Reino Unido'
      },
      icon: '🤝'
    }
  ],
  testimonials: [
    {
      id: 'maria_manchester',
      name: 'Maria Silva',
      age: 28,
      location: 'Manchester',
      heritage: 'Portugal',
      quote: {
        en: 'The app makes it so easy to find Portuguese events in Manchester! I never miss a Fado night or Santos Populares celebration now.',
        pt: 'O aplicativo torna muito fácil encontrar eventos portugueses em Manchester! Nunca mais perco uma noite de Fado ou celebração dos Santos Populares.'
      },
      avatar: '/avatars/maria-manchester.jpg'
    },
    {
      id: 'carlos_london',
      name: 'Carlos Santos',
      age: 35,
      location: 'London',
      heritage: 'Brazil',
      quote: {
        en: 'Finally found my Brazilian community in London! The app helped me connect with people who share my culture and language.',
        pt: 'Finalmente encontrei minha comunidade brasileira em Londres! O aplicativo me ajudou a conectar com pessoas que compartilham minha cultura e idioma.'
      },
      avatar: '/avatars/carlos-london.jpg'
    },
    {
      id: 'ana_edinburgh',
      name: 'Ana Tavares',
      age: 24,
      location: 'Edinburgh',
      heritage: 'Cape Verde',
      quote: {
        en: 'Love how the app celebrates all Lusophone cultures! I met amazing people from Cape Verde, Angola, and Mozambique here in Scotland.',
        pt: 'Adoro como o aplicativo celebra todas as culturas lusófonas! Conheci pessoas incríveis de Cabo Verde, Angola e Moçambique aqui na Escócia.'
      },
      avatar: '/avatars/ana-edinburgh.jpg'
    }
  ]
};

// Progressive Web App Enhancement Configuration
export interface PWAEnhancementConfig {
  features: {
    offlineMode: boolean;
    pushNotifications: boolean;
    backgroundSync: boolean;
    installPrompt: boolean;
  };
  caching: {
    strategy: 'network-first' | 'cache-first' | 'stale-while-revalidate';
    culturalContent: string[];
    essentialPages: string[];
    apiEndpoints: string[];
  };
  notifications: {
    types: Array<{
      id: string;
      title: { en: string; pt: string };
      description: { en: string; pt: string };
      icon: string;
    }>;
  };
}

export const PWA_ENHANCEMENT_CONFIG: PWAEnhancementConfig = {
  features: {
    offlineMode: true,
    pushNotifications: true,
    backgroundSync: true,
    installPrompt: true
  },
  caching: {
    strategy: 'stale-while-revalidate',
    culturalContent: [
      '/images/cultural/*',
      '/images/events/*',
      '/images/businesses/*'
    ],
    essentialPages: [
      '/',
      '/events',
      '/matches',
      '/business-directory',
      '/profile'
    ],
    apiEndpoints: [
      '/api/events',
      '/api/matches',
      '/api/businesses',
      '/api/user/profile'
    ]
  },
  notifications: {
    types: [
      {
        id: 'new_match',
        title: {
          en: 'New Portuguese Match!',
          pt: 'Nova Correspondência Portuguesa!'
        },
        description: {
          en: 'Someone from the Portuguese community is interested in connecting with you',
          pt: 'Alguém da comunidade portuguesa está interessado em se conectar com você'
        },
        icon: '💕'
      },
      {
        id: 'cultural_event',
        title: {
          en: 'Portuguese Cultural Event Near You',
          pt: 'Evento Cultural Português Perto de Você'
        },
        description: {
          en: 'A new Portuguese cultural event has been added in your area',
          pt: 'Um novo evento cultural português foi adicionado na sua área'
        },
        icon: '🎭'
      },
      {
        id: 'santos_populares',
        title: {
          en: 'Santos Populares Celebration!',
          pt: 'Celebração dos Santos Populares!'
        },
        description: {
          en: 'Join the Portuguese community for traditional Santos Populares festivities',
          pt: 'Junte-se à comunidade portuguesa para as festividades tradicionais dos Santos Populares'
        },
        icon: '🎉'
      }
    ]
  }
};

export default MOBILE_APP_CONFIG;