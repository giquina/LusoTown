/**
 * LusoTown Branded Feature Names Configuration
 * 
 * Centralized branding for all feature names across the platform.
 * Use these constants to maintain consistent branded messaging.
 */

// Core Branded Feature Names
export const BRANDED_FEATURES = {
  // Primary Features
  LUSOMATCH: {
    en: 'LusoMatch',
    pt: 'LusoMatch',
    description: {
      en: 'Portuguese cultural matching system',
      pt: 'Sistema de matches culturais portugueses'
    }
  },
  
  LUSOSTREAM: {
    en: 'LusoStream',
    pt: 'LusoStream', 
    description: {
      en: 'Portuguese cultural streaming platform',
      pt: 'Plataforma de streaming cultural portuguesa'
    }
  },
  
  LUSORIDE: {
    en: 'LusoRide',
    pt: 'LusoRide',
    description: {
      en: 'Portuguese-speaking transport services',
      pt: 'Serviços de transporte em português'
    }
  },
  
  LUSOCHAT: {
    en: 'LusoChat', 
    pt: 'LusoChat',
    description: {
      en: 'Portuguese-speaking community chat system',
      pt: 'Sistema de chat da comunidade de falantes de português'
    }
  },
  
  LUSOCONNECT: {
    en: 'LusoConnect',
    pt: 'LusoConnect',
    description: {
      en: 'Portuguese business networking platform',
      pt: 'Plataforma de networking empresarial português'
    }
  },
  
  LUSOEVENTS: {
    en: 'LusoEvents',
    pt: 'LusoEventos',
    description: {
      en: 'Portuguese cultural events platform',
      pt: 'Plataforma de eventos culturais portugueses'
    }
  },
  
  LUSOLEARN: {
    en: 'LusoLearn',
    pt: 'LusoLearn',
    description: {
      en: 'Portuguese-speaking community learning center',
      pt: 'Centro de aprendizagem da comunidade de falantes de português'
    }
  }
} as const;

// Feature Taglines
export const BRANDED_TAGLINES = {
  LUSOMATCH: {
    en: 'Where Portuguese Hearts Connect',
    pt: 'Onde os Corações Portugueses se Conectam'
  },
  
  LUSOSTREAM: {
    en: 'Portuguese Culture, Live & On-Demand',
    pt: 'Cultura Portuguesa, Ao Vivo & On-Demand'
  },
  
  LUSORIDE: {
    en: 'Your Portuguese-Speaking Driver Network', 
    pt: 'Sua Rede de Motoristas que Falam Português'
  },
  
  LUSOCHAT: {
    en: 'Real-Time Portuguese-speaking community',
    pt: 'Comunidade de Falantes de Português em Tempo Real'
  },
  
  LUSOCONNECT: {
    en: 'Professional Portuguese Network',
    pt: 'Rede Profissional Portuguesa'
  },
  
  LUSOEVENTS: {
    en: 'Authentic Portuguese Experiences',
    pt: 'Experiências Portuguesas Autênticas'
  },
  
  LUSOLEARN: {
    en: 'Master Portuguese Culture & Services',
    pt: 'Domine a Cultura e Serviços Portugueses'
  }
} as const;

// Call-to-Action Messages
export const BRANDED_CTA = {
  LUSOMATCH: {
    primary: {
      en: 'Find Your LusoMatch',
      pt: 'Encontre Seu LusoMatch'
    },
    secondary: {
      en: 'Start Matching',
      pt: 'Começar Matches'
    }
  },
  
  LUSOSTREAM: {
    primary: {
      en: 'Watch LusoStream',
      pt: 'Assistir LusoStream'
    },
    secondary: {
      en: 'Go Live',
      pt: 'Ir Ao Vivo'
    }
  },
  
  LUSORIDE: {
    primary: {
      en: 'Book LusoRide',
      pt: 'Reservar LusoRide'
    },
    secondary: {
      en: 'Find Portuguese Driver',
      pt: 'Encontrar Motorista Português'
    }
  },
  
  LUSOCHAT: {
    primary: {
      en: 'Join LusoChat',
      pt: 'Entrar no LusoChat'
    },
    secondary: {
      en: 'Start Chatting',
      pt: 'Começar a Conversar'
    }
  },
  
  LUSOCONNECT: {
    primary: {
      en: 'Network with LusoConnect', 
      pt: 'Fazer Network com LusoConnect'
    },
    secondary: {
      en: 'Join Professional Network',
      pt: 'Entrar na Rede Profissional'
    }
  },
  
  LUSOEVENTS: {
    primary: {
      en: 'Discover LusoEvents',
      pt: 'Descobrir LusoEventos'
    },
    secondary: {
      en: 'Browse Events',
      pt: 'Explorar Eventos'
    }
  },
  
  LUSOLEARN: {
    primary: {
      en: 'Learn with LusoLearn',
      pt: 'Aprender com LusoLearn'
    },
    secondary: {
      en: 'Start Learning',
      pt: 'Começar a Aprender'
    }
  }
} as const;

// Brand Colors for Features (using Portuguese heritage colors)
export const FEATURE_COLORS = {
  LUSOMATCH: {
    primary: '#DC2626', // Portuguese red
    secondary: '#16A34A', // Portuguese green
    accent: '#F59E0B' // Portuguese gold
  },
  
  LUSOSTREAM: {
    primary: '#7C2D12', // Deep red
    secondary: '#059669', // Emerald
    accent: '#D97706' // Amber
  },
  
  LUSORIDE: {
    primary: '#1D4ED8', // Blue
    secondary: '#DC2626', // Red
    accent: '#F59E0B' // Gold
  },
  
  LUSOCHAT: {
    primary: '#059669', // Green
    secondary: '#DC2626', // Red
    accent: '#8B5CF6' // Purple
  },
  
  LUSOCONNECT: {
    primary: '#1F2937', // Professional gray
    secondary: '#DC2626', // Portuguese red
    accent: '#F59E0B' // Gold
  },
  
  LUSOEVENTS: {
    primary: '#7C2D12', // Cultural red
    secondary: '#16A34A', // Green
    accent: '#F59E0B' // Gold
  },
  
  LUSOLEARN: {
    primary: '#1D4ED8', // Education blue
    secondary: '#DC2626', // Red
    accent: '#16A34A' // Green
  }
} as const;

// Helper functions
export type FeatureName = keyof typeof BRANDED_FEATURES;
export type Language = 'en' | 'pt';

export const getFeatureName = (feature: FeatureName, language: Language = 'en'): string => {
  return BRANDED_FEATURES[feature][language];
};

export const getFeatureTagline = (feature: FeatureName, language: Language = 'en'): string => {
  return BRANDED_TAGLINES[feature][language];
};

export const getFeatureCTA = (feature: FeatureName, type: 'primary' | 'secondary' = 'primary', language: Language = 'en'): string => {
  return BRANDED_CTA[feature][type][language];
};

export const getFeatureDescription = (feature: FeatureName, language: Language = 'en'): string => {
  return BRANDED_FEATURES[feature].description[language];
};

export const getFeatureColors = (feature: FeatureName) => {
  return FEATURE_COLORS[feature];
};

// Main brand messaging
export const MAIN_BRAND = {
  name: 'LusoTown',
  tagline: {
    en: 'Unidos pela Língua • United by Language',
    pt: 'Unidos pela Língua • United by Language'
  },
  mission: {
    en: 'Connecting Portuguese speakers across the United Kingdom',
    pt: 'Conectando falantes de português em todo o Reino Unido'
  },
  community: {
    en: 'Portuguese-speaking community London & UK',
    pt: 'Comunidade de Falantes de Português Londres e Reino Unido'
  }
} as const;