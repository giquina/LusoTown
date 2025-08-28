/**
 * About Page Content Configuration
 * 
 * All content, quotes, and testimonials for the About page
 * to eliminate hardcoded strings and enable proper bilingual support
 */

export const ABOUT_QUOTES = {
  heritage: {
    pt: "Do palácio real português às torres de Macau, dos diamantes angolanos ao ouro brasileiro—somos uma família de prestígio global.",
    en: "From the Portuguese royal palace to the towers of Macau, from Angolan diamonds to Brazilian gold—we are a family of global prestige."
  },
  community: {
    pt: "Somos uma comunidade de mente aberta que acolhe todos os falantes de português com o coração cheio de amor.",
    en: "We are an open-minded community that welcomes all Portuguese speakers with hearts full of love."
  },
  belonging: {
    pt: "Aqui, todos têm lugar. Here, everyone belongs. We're not just building a community—we're creating a family.",
    en: "Aqui, todos têm lugar. Here, everyone belongs. We're not just building a community—we're creating a family."
  }
} as const;

export const ABOUT_MISSION = {
  vision: {
    pt: "Criar pontes culturais e preservar o património lusófono no Reino Unido",
    en: "Creating cultural bridges and preserving Portuguese heritage in the United Kingdom"
  },
  mission: {
    pt: "Conectar, celebrar e capacitar a comunidade de língua portuguesa",
    en: "Connect, celebrate and empower the Portuguese-speaking community"
  },
  values: {
    authenticity: {
      pt: "Autenticidade Cultural",
      en: "Cultural Authenticity"
    },
    community: {
      pt: "Comunidade Forte", 
      en: "Strong Community"
    },
    heritage: {
      pt: "Preservação do Património",
      en: "Heritage Preservation"
    },
    innovation: {
      pt: "Inovação Tecnológica",
      en: "Technological Innovation"
    }
  }
} as const;

export const ABOUT_STATISTICS = {
  members: {
    total: 750,
    labelPt: "Membros da Comunidade",
    labelEn: "Community Members"
  },
  students: {
    total: 2150,
    labelPt: "Estudantes Universitários",
    labelEn: "University Students"
  },
  universities: {
    total: 8,
    labelPt: "Parcerias Universitárias",
    labelEn: "University Partnerships"
  },
  businesses: {
    total: 200,
    labelPt: "Negócios Parceiros",
    labelEn: "Partner Businesses"
  },
  events: {
    monthly: 25,
    labelPt: "Eventos Mensais",
    labelEn: "Monthly Events"
  }
} as const;

export const ABOUT_FEATURES = {
  culturalEvents: {
    titlePt: "Eventos Culturais Autênticos",
    titleEn: "Authentic Cultural Events",
    descriptionPt: "Fado, Santos Populares, Dia de Portugal e mais celebrações tradicionais",
    descriptionEn: "Fado, Santos Populares, Portugal Day and more traditional celebrations"
  },
  businessDirectory: {
    titlePt: "Diretório de Negócios",
    titleEn: "Business Directory", 
    descriptionPt: "Descubra restaurantes, serviços e empresas portuguesas por todo o Reino Unido",
    descriptionEn: "Discover Portuguese restaurants, services and businesses across the United Kingdom"
  },
  communityMatching: {
    titlePt: "Conexões Comunitárias",
    titleEn: "Community Connections",
    descriptionPt: "Encontre amigos e parceiros que partilham a sua herança cultural",
    descriptionEn: "Find friends and partners who share your cultural heritage"
  },
  universitySupport: {
    titlePt: "Apoio Universitário",
    titleEn: "University Support",
    descriptionPt: "Programas especiais para estudantes portugueses em universidades do Reino Unido",
    descriptionEn: "Special programs for Portuguese students at UK universities"
  }
} as const;

export const ABOUT_TESTIMONIALS = {
  maria: {
    name: "Maria Santos",
    location: "Londres",
    locationEn: "London",
    quotePt: "Encontrei a minha segunda família através da LusoTown. Os eventos de fado são incríveis!",
    quoteEn: "I found my second family through LusoTown. The fado events are incredible!",
    role: "Membro da Comunidade",
    roleEn: "Community Member"
  },
  joao: {
    name: "João Silva",
    location: "Manchester",
    quotePt: "Como estudante universitário, a LusoTown ajudou-me a conectar com outros portugueses e manter as minhas tradições vivas.",
    quoteEn: "As a university student, LusoTown helped me connect with other Portuguese and keep my traditions alive.",
    role: "Estudante Universitário",
    roleEn: "University Student"
  },
  ana: {
    name: "Ana Rodrigues",
    location: "Birmingham",
    quotePt: "O diretório de negócios transformou a visibilidade do meu restaurante na comunidade portuguesa.",
    quoteEn: "The business directory transformed my restaurant's visibility in the Portuguese community.",
    role: "Proprietária de Restaurante",
    roleEn: "Restaurant Owner"
  }
} as const;

export const ABOUT_TIMELINE = {
  2020: {
    titlePt: "Fundação",
    titleEn: "Foundation",
    descriptionPt: "LusoTown foi criada para conectar a comunidade portuguesa em Londres",
    descriptionEn: "LusoTown was created to connect the Portuguese community in London"
  },
  2021: {
    titlePt: "Expansão Regional",
    titleEn: "Regional Expansion",
    descriptionPt: "Expandimos para Manchester, Birmingham e outras cidades do Reino Unido",
    descriptionEn: "We expanded to Manchester, Birmingham and other UK cities"
  },
  2022: {
    titlePt: "Parcerias Universitárias", 
    titleEn: "University Partnerships",
    descriptionPt: "Estabelecemos parcerias com 8 universidades prestigiadas",
    descriptionEn: "We established partnerships with 8 prestigious universities"
  },
  2023: {
    titlePt: "Comunidade Nacional",
    titleEn: "National Community", 
    descriptionPt: "Atingimos 750+ membros ativos em todo o Reino Unido",
    descriptionEn: "We reached 750+ active members across the United Kingdom"
  },
  2024: {
    titlePt: "Inovação Tecnológica",
    titleEn: "Technological Innovation",
    descriptionPt: "Lançamento da plataforma móvel e sistema de streaming cultural",
    descriptionEn: "Launch of mobile platform and cultural streaming system"
  }
} as const;

export const ABOUT_TEAM = {
  leadership: {
    titlePt: "Nossa Liderança",
    titleEn: "Our Leadership",
    descriptionPt: "Uma equipa apaixonada pela cultura portuguesa e inovação tecnológica",
    descriptionEn: "A team passionate about Portuguese culture and technological innovation"
  },
  advisors: {
    titlePt: "Conselheiros Culturais",
    titleEn: "Cultural Advisors",
    descriptionPt: "Especialistas em cultura lusófona e integração comunitária",
    descriptionEn: "Experts in Portuguese culture and community integration"
  }
} as const;

export const ABOUT_CONTACT_CTA = {
  titlePt: "Junte-se à Nossa Família",
  titleEn: "Join Our Family",
  descriptionPt: "Faça parte da maior comunidade portuguesa do Reino Unido",
  descriptionEn: "Be part of the largest Portuguese community in the United Kingdom",
  buttonPt: "Começar Agora",
  buttonEn: "Get Started Now"
} as const;

// Helper functions
export const getAboutQuote = (key: keyof typeof ABOUT_QUOTES, language: 'pt' | 'en' = 'en') => {
  return ABOUT_QUOTES[key][language];
};

export const getAboutMissionValue = (key: keyof typeof ABOUT_MISSION.values, language: 'pt' | 'en' = 'en') => {
  return ABOUT_MISSION.values[key][language];
};

export const getAboutTestimonial = (key: keyof typeof ABOUT_TESTIMONIALS, language: 'pt' | 'en' = 'en') => {
  const testimonial = ABOUT_TESTIMONIALS[key];
  return {
    name: testimonial.name,
    location: language === 'pt' ? testimonial.location : testimonial.locationEn || testimonial.location,
    quote: language === 'pt' ? testimonial.quotePt : testimonial.quoteEn,
    role: language === 'pt' ? testimonial.role : testimonial.roleEn
  };
};

export const getAboutFeature = (key: keyof typeof ABOUT_FEATURES, language: 'pt' | 'en' = 'en') => {
  const feature = ABOUT_FEATURES[key];
  return {
    title: language === 'pt' ? feature.titlePt : feature.titleEn,
    description: language === 'pt' ? feature.descriptionPt : feature.descriptionEn
  };
};

export const getAboutTimelineEntry = (year: keyof typeof ABOUT_TIMELINE, language: 'pt' | 'en' = 'en') => {
  const entry = ABOUT_TIMELINE[year];
  return {
    title: language === 'pt' ? entry.titlePt : entry.titleEn,
    description: language === 'pt' ? entry.descriptionPt : entry.descriptionEn
  };
};

// Type definitions
export type AboutQuoteKey = keyof typeof ABOUT_QUOTES;
export type AboutMissionValueKey = keyof typeof ABOUT_MISSION.values;
export type AboutTestimonialKey = keyof typeof ABOUT_TESTIMONIALS;
export type AboutFeatureKey = keyof typeof ABOUT_FEATURES;
export type AboutTimelineYear = keyof typeof ABOUT_TIMELINE;
export type Language = 'pt' | 'en';
