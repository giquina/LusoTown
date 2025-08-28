/**
 * Cultural Preferences Configuration for Portuguese-speaking Community Matching
 * Centralized configuration for cultural matching system
 */

import { PORTUGUESE_SPEAKING_COUNTRIES } from './portuguese-countries';
import { PORTUGUESE_HERITAGE } from './heritage';

export interface CulturalInterestCategory {
  id: string;
  nameEn: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  interests: CulturalInterest[];
  icon: string;
  color: string;
}

export interface CulturalInterest {
  id: string;
  nameEn: string;
  namePt: string;
  category: string;
  emoji?: string;
  popularity: number; // 1-100
  isTraditional: boolean;
}

export interface LanguageProficiencyLevel {
  level: 'native' | 'fluent' | 'intermediate' | 'beginner';
  nameEn: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  score: number; // 1-10
}

export interface MatchingPreference {
  id: string;
  nameEn: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  weight: number; // 0-1
  isDefault: boolean;
}

// Cultural Interest Categories
export const CULTURAL_INTEREST_CATEGORIES: CulturalInterestCategory[] = [
  {
    id: 'music_arts',
    nameEn: 'Music & Arts',
    namePt: 'Música e Artes',
    description: 'Traditional and modern Portuguese music, visual arts',
    descriptionPt: 'Música tradicional e moderna portuguesa, artes visuais',
    icon: '🎵',
    color: 'blue',
    interests: [
      {
        id: 'fado',
        nameEn: 'Fado Music',
        namePt: 'Música de Fado',
        category: 'music_arts',
        emoji: '🎭',
        popularity: 85,
        isTraditional: true
      },
      {
        id: 'traditional_folk',
        nameEn: 'Traditional Folk Music',
        namePt: 'Música Folclórica Tradicional',
        category: 'music_arts',
        emoji: '🪕',
        popularity: 70,
        isTraditional: true
      },
      {
        id: 'modern_portuguese',
        nameEn: 'Modern Portuguese Music',
        namePt: 'Música Portuguesa Moderna',
        category: 'music_arts',
        emoji: '🎸',
        popularity: 75,
        isTraditional: false
      },
      {
        id: 'brazilian_music',
        nameEn: 'Brazilian Music',
        namePt: 'Música Brasileira',
        category: 'music_arts',
        emoji: '🇧🇷',
        popularity: 80,
        isTraditional: false
      },
      {
        id: 'visual_arts',
        nameEn: 'Visual Arts & Crafts',
        namePt: 'Artes Visuais e Artesanato',
        category: 'music_arts',
        emoji: '🎨',
        popularity: 60,
        isTraditional: true
      },
      {
        id: 'literature_poetry',
        nameEn: 'Literature & Poetry',
        namePt: 'Literatura e Poesia',
        category: 'music_arts',
        emoji: '📚',
        popularity: 65,
        isTraditional: true
      }
    ]
  },
  {
    id: 'food_cuisine',
    nameEn: 'Food & Cuisine',
    namePt: 'Gastronomia e Culinária',
    description: 'Portuguese cuisine, cooking, wine, food culture',
    descriptionPt: 'Culinária portuguesa, cozinha, vinho, cultura gastronómica',
    icon: '🍽️',
    color: 'orange',
    interests: [
      {
        id: 'portuguese_cuisine',
        nameEn: 'Portuguese Cuisine',
        namePt: 'Culinária Portuguesa',
        category: 'food_cuisine',
        emoji: '🐟',
        popularity: 90,
        isTraditional: true
      },
      {
        id: 'brazilian_cuisine',
        nameEn: 'Brazilian Cuisine',
        namePt: 'Culinária Brasileira',
        category: 'food_cuisine',
        emoji: '🥘',
        popularity: 85,
        isTraditional: true
      },
      {
        id: 'african_lusophone_cuisine',
        nameEn: 'African Lusophone Cuisine',
        namePt: 'Culinária Africana Lusófona',
        category: 'food_cuisine',
        emoji: '🌍',
        popularity: 70,
        isTraditional: true
      },
      {
        id: 'cooking',
        nameEn: 'Cooking & Recipes',
        namePt: 'Cozinha e Receitas',
        category: 'food_cuisine',
        emoji: '👨‍🍳',
        popularity: 75,
        isTraditional: false
      },
      {
        id: 'wine_tasting',
        nameEn: 'Portuguese Wine & Tasting',
        namePt: 'Vinho Português e Degustação',
        category: 'food_cuisine',
        emoji: '🍷',
        popularity: 80,
        isTraditional: true
      },
      {
        id: 'pastries',
        nameEn: 'Portuguese Pastries',
        namePt: 'Doçaria Portuguesa',
        category: 'food_cuisine',
        emoji: '🥧',
        popularity: 88,
        isTraditional: true
      }
    ]
  },
  {
    id: 'festivals_traditions',
    nameEn: 'Festivals & Traditions',
    namePt: 'Festivais e Tradições',
    description: 'Traditional celebrations, religious festivals, cultural events',
    descriptionPt: 'Celebrações tradicionais, festivais religiosos, eventos culturais',
    icon: '🎉',
    color: 'green',
    interests: [
      {
        id: 'santos_populares',
        nameEn: 'Santos Populares (June Festivals)',
        namePt: 'Santos Populares',
        category: 'festivals_traditions',
        emoji: '🎊',
        popularity: 85,
        isTraditional: true
      },
      {
        id: 'christmas_traditions',
        nameEn: 'Portuguese Christmas Traditions',
        namePt: 'Tradições de Natal Português',
        category: 'festivals_traditions',
        emoji: '🎄',
        popularity: 90,
        isTraditional: true
      },
      {
        id: 'religious_festivals',
        nameEn: 'Religious Festivals & Pilgrimages',
        namePt: 'Festivais Religiosos e Romarias',
        category: 'festivals_traditions',
        emoji: '⛪',
        popularity: 75,
        isTraditional: true
      },
      {
        id: 'carnival',
        nameEn: 'Carnival Celebrations',
        namePt: 'Celebrações de Carnaval',
        category: 'festivals_traditions',
        emoji: '🎭',
        popularity: 80,
        isTraditional: true
      },
      {
        id: 'regional_festivals',
        nameEn: 'Regional Festivals',
        namePt: 'Festivais Regionais',
        category: 'festivals_traditions',
        emoji: '🏘️',
        popularity: 70,
        isTraditional: true
      },
      {
        id: 'diaspora_events',
        nameEn: 'Diaspora Community Events',
        namePt: 'Eventos da Comunidade da Diáspora',
        category: 'festivals_traditions',
        emoji: '🌍',
        popularity: 85,
        isTraditional: false
      }
    ]
  },
  {
    id: 'sports_recreation',
    nameEn: 'Sports & Recreation',
    namePt: 'Desportos e Recreação',
    description: 'Football, sports, outdoor activities, fitness',
    descriptionPt: 'Futebol, desportos, atividades ao ar livre, fitness',
    icon: '⚽',
    color: 'red',
    interests: [
      {
        id: 'portuguese_football',
        nameEn: 'Portuguese Football',
        namePt: 'Futebol Português',
        category: 'sports_recreation',
        emoji: '⚽',
        popularity: 95,
        isTraditional: true
      },
      {
        id: 'brazilian_football',
        nameEn: 'Brazilian Football',
        namePt: 'Futebol Brasileiro',
        category: 'sports_recreation',
        emoji: '🇧🇷',
        popularity: 90,
        isTraditional: true
      },
      {
        id: 'surfing',
        nameEn: 'Surfing',
        namePt: 'Surf',
        category: 'sports_recreation',
        emoji: '🏄‍♂️',
        popularity: 60,
        isTraditional: false
      },
      {
        id: 'hiking',
        nameEn: 'Hiking & Nature',
        namePt: 'Caminhadas e Natureza',
        category: 'sports_recreation',
        emoji: '🥾',
        popularity: 65,
        isTraditional: false
      },
      {
        id: 'cycling',
        nameEn: 'Cycling',
        namePt: 'Ciclismo',
        category: 'sports_recreation',
        emoji: '🚴‍♂️',
        popularity: 55,
        isTraditional: false
      },
      {
        id: 'fitness',
        nameEn: 'Fitness & Gym',
        namePt: 'Fitness e Ginásio',
        category: 'sports_recreation',
        emoji: '💪',
        popularity: 70,
        isTraditional: false
      }
    ]
  },
  {
    id: 'social_community',
    nameEn: 'Social & Community',
    namePt: 'Social e Comunidade',
    description: 'Community involvement, volunteering, social gatherings',
    descriptionPt: 'Envolvimento comunitário, voluntariado, encontros sociais',
    icon: '🤝',
    color: 'purple',
    interests: [
      {
        id: 'community_events',
        nameEn: 'Community Events',
        namePt: 'Eventos da Comunidade',
        category: 'social_community',
        emoji: '👥',
        popularity: 85,
        isTraditional: false
      },
      {
        id: 'volunteering',
        nameEn: 'Volunteering',
        namePt: 'Voluntariado',
        category: 'social_community',
        emoji: '🤲',
        popularity: 70,
        isTraditional: false
      },
      {
        id: 'networking',
        nameEn: 'Professional Networking',
        namePt: 'Networking Profissional',
        category: 'social_community',
        emoji: '💼',
        popularity: 75,
        isTraditional: false
      },
      {
        id: 'language_exchange',
        nameEn: 'Language Exchange',
        namePt: 'Intercâmbio de Idiomas',
        category: 'social_community',
        emoji: '💬',
        popularity: 80,
        isTraditional: false
      },
      {
        id: 'family_activities',
        nameEn: 'Family Activities',
        namePt: 'Atividades Familiares',
        category: 'social_community',
        emoji: '👨‍👩‍👧‍👦',
        popularity: 85,
        isTraditional: true
      },
      {
        id: 'cultural_education',
        nameEn: 'Cultural Education',
        namePt: 'Educação Cultural',
        category: 'social_community',
        emoji: '📚',
        popularity: 65,
        isTraditional: false
      }
    ]
  },
  {
    id: 'business_professional',
    nameEn: 'Business & Professional',
    namePt: 'Negócios e Profissional',
    description: 'Entrepreneurship, career development, business opportunities',
    descriptionPt: 'Empreendedorismo, desenvolvimento de carreira, oportunidades de negócio',
    icon: '💼',
    color: 'gray',
    interests: [
      {
        id: 'entrepreneurship',
        nameEn: 'Entrepreneurship',
        namePt: 'Empreendedorismo',
        category: 'business_professional',
        emoji: '🚀',
        popularity: 70,
        isTraditional: false
      },
      {
        id: 'business_partnerships',
        nameEn: 'Business Partnerships',
        namePt: 'Parcerias Empresariais',
        category: 'business_professional',
        emoji: '🤝',
        popularity: 65,
        isTraditional: false
      },
      {
        id: 'career_mentoring',
        nameEn: 'Career Mentoring',
        namePt: 'Mentoria de Carreira',
        category: 'business_professional',
        emoji: '👨‍🏫',
        popularity: 75,
        isTraditional: false
      },
      {
        id: 'portugal_uk_trade',
        nameEn: 'Portugal-UK Trade',
        namePt: 'Comércio Portugal-Reino Unido',
        category: 'business_professional',
        emoji: '🌉',
        popularity: 60,
        isTraditional: false
      },
      {
        id: 'freelance_opportunities',
        nameEn: 'Freelance Opportunities',
        namePt: 'Oportunidades Freelance',
        category: 'business_professional',
        emoji: '💻',
        popularity: 70,
        isTraditional: false
      },
      {
        id: 'investment_finance',
        nameEn: 'Investment & Finance',
        namePt: 'Investimento e Finanças',
        category: 'business_professional',
        emoji: '📊',
        popularity: 55,
        isTraditional: false
      }
    ]
  }
];

// Language Proficiency Levels
export const LANGUAGE_PROFICIENCY_LEVELS: LanguageProficiencyLevel[] = [
  {
    level: 'native',
    nameEn: 'Native Speaker',
    namePt: 'Falante Nativo',
    description: 'Portuguese is my first language',
    descriptionPt: 'O português é a minha língua materna',
    score: 10
  },
  {
    level: 'fluent',
    nameEn: 'Fluent',
    namePt: 'Fluente',
    description: 'I speak Portuguese fluently and comfortably',
    descriptionPt: 'Falo português fluentemente e confortavelmente',
    score: 9
  },
  {
    level: 'intermediate',
    nameEn: 'Intermediate',
    namePt: 'Intermediário',
    description: 'I can have conversations but still learning',
    descriptionPt: 'Consigo ter conversas mas ainda estou a aprender',
    score: 6
  },
  {
    level: 'beginner',
    nameEn: 'Beginner',
    namePt: 'Iniciante',
    description: 'I\'m learning Portuguese and embracing the culture',
    descriptionPt: 'Estou a aprender português e a abraçar a cultura',
    score: 3
  }
];

// Matching Preferences
export const MATCHING_PREFERENCES: MatchingPreference[] = [
  {
    id: 'cultural_background',
    nameEn: 'Cultural Background',
    namePt: 'Origem Cultural',
    description: 'Shared Portuguese-speaking heritage',
    descriptionPt: 'Herança lusófona partilhada',
    weight: 0.25,
    isDefault: true
  },
  {
    id: 'language_skills',
    nameEn: 'Language Skills',
    namePt: 'Competências Linguísticas',
    description: 'Portuguese and English proficiency levels',
    descriptionPt: 'Níveis de proficiência em português e inglês',
    weight: 0.20,
    isDefault: true
  },
  {
    id: 'shared_interests',
    nameEn: 'Shared Interests',
    namePt: 'Interesses Partilhados',
    description: 'Common cultural and social interests',
    descriptionPt: 'Interesses culturais e sociais comuns',
    weight: 0.25,
    isDefault: true
  },
  {
    id: 'location_proximity',
    nameEn: 'Location',
    namePt: 'Localização',
    description: 'Geographic proximity in the UK',
    descriptionPt: 'Proximidade geográfica no Reino Unido',
    weight: 0.15,
    isDefault: true
  },
  {
    id: 'age_range',
    nameEn: 'Age Compatibility',
    namePt: 'Compatibilidade de Idade',
    description: 'Similar age ranges',
    descriptionPt: 'Faixas etárias similares',
    weight: 0.10,
    isDefault: true
  },
  {
    id: 'professional_goals',
    nameEn: 'Professional Goals',
    namePt: 'Objetivos Profissionais',
    description: 'Career and business alignment',
    descriptionPt: 'Alinhamento profissional e empresarial',
    weight: 0.05,
    isDefault: false
  }
];

// Cultural Values (Portuguese-specific)
export const CULTURAL_VALUES = [
  {
    id: 'family_first',
    nameEn: 'Family First',
    namePt: 'Família em Primeiro Lugar',
    description: 'Family is the foundation of life',
    descriptionPt: 'A família é a base da vida',
    emoji: '👨‍👩‍👧‍👦',
    isTraditional: true
  },
  {
    id: 'hospitality',
    nameEn: 'Hospitality & Warmth',
    namePt: 'Hospitalidade e Carinho',
    description: 'Welcoming others with open arms',
    descriptionPt: 'Acolher os outros de braços abertos',
    emoji: '🤗',
    isTraditional: true
  },
  {
    id: 'respect_tradition',
    nameEn: 'Respect for Tradition',
    namePt: 'Respeito pela Tradição',
    description: 'Honoring cultural heritage and traditions',
    descriptionPt: 'Honrar a herança cultural e tradições',
    emoji: '🏛️',
    isTraditional: true
  },
  {
    id: 'community_support',
    nameEn: 'Community Support',
    namePt: 'Apoio Comunitário',
    description: 'Supporting each other in the diaspora',
    descriptionPt: 'Apoiar-se mutuamente na diáspora',
    emoji: '🤝',
    isTraditional: true
  },
  {
    id: 'work_life_balance',
    nameEn: 'Work-Life Balance',
    namePt: 'Equilíbrio Trabalho-Vida',
    description: 'Balance between career and personal life',
    descriptionPt: 'Equilíbrio entre carreira e vida pessoal',
    emoji: '⚖️',
    isTraditional: false
  },
  {
    id: 'cultural_pride',
    nameEn: 'Cultural Pride',
    namePt: 'Orgulho Cultural',
    description: 'Pride in Portuguese heritage and achievements',
    descriptionPt: 'Orgulho na herança portuguesa e conquistas',
    emoji: '🇵🇹',
    isTraditional: true
  },
  {
    id: 'education_learning',
    nameEn: 'Education & Learning',
    namePt: 'Educação e Aprendizagem',
    description: 'Valuing education and continuous learning',
    descriptionPt: 'Valorizar a educação e aprendizagem contínua',
    emoji: '📚',
    isTraditional: true
  },
  {
    id: 'entrepreneurial_spirit',
    nameEn: 'Entrepreneurial Spirit',
    namePt: 'Espírito Empreendedor',
    description: 'Innovation and business creation',
    descriptionPt: 'Inovação e criação de negócios',
    emoji: '🚀',
    isTraditional: false
  }
];

// UK Cities with Portuguese Communities
export const UK_PORTUGUESE_COMMUNITIES = [
  {
    city: 'London',
    areas: ['Vauxhall', 'Stockwell', 'Golborne Road', 'Borough Market', 'Camden'],
    population: 500000,
    coordinates: [51.5074, -0.1278]
  },
  {
    city: 'Manchester',
    areas: ['City Centre', 'Salford', 'Oldham'],
    population: 15000,
    coordinates: [53.4808, -2.2426]
  },
  {
    city: 'Birmingham',
    areas: ['City Centre', 'Handsworth', 'Small Heath'],
    population: 12000,
    coordinates: [52.4862, -1.8904]
  },
  {
    city: 'Liverpool',
    areas: ['City Centre', 'Toxteth'],
    population: 8000,
    coordinates: [53.4084, -2.9916]
  },
  {
    city: 'Leeds',
    areas: ['City Centre', 'Harehills'],
    population: 6000,
    coordinates: [53.8008, -1.5491]
  },
  {
    city: 'Bristol',
    areas: ['City Centre', 'St Pauls'],
    population: 7000,
    coordinates: [51.4545, -2.5879]
  },
  {
    city: 'Edinburgh',
    areas: ['City Centre', 'Leith'],
    population: 4000,
    coordinates: [55.9533, -3.1883]
  },
  {
    city: 'Glasgow',
    areas: ['City Centre', 'Govan'],
    population: 3500,
    coordinates: [55.8642, -4.2518]
  }
];

// Default matching configuration
export const DEFAULT_CULTURAL_MATCHING_CONFIG = {
  minCompatibilityScore: 60,
  maxMatchesPerUser: 20,
  maxDistance: 25, // kilometers
  defaultAgeRange: [18, 65] as [number, number],
  requireVerification: false,
  minSafetyScore: 6,
  refreshInterval: 24, // hours
  weights: {
    cultural: 0.25,
    interests: 0.25,
    language: 0.20,
    location: 0.15,
    age: 0.10,
    professional: 0.05
  }
};

// Safety and verification settings
export const SAFETY_SETTINGS = {
  minProfileCompleteness: 70, // percentage
  requiredFields: ['name', 'age', 'location', 'bio', 'culturalBackground', 'interests'],
  bannedWords: ['money', 'investment', 'business opportunity', 'whatsapp', 'telegram', 'sugar daddy', 'escort'],
  maxBioLength: 500,
  maxInterests: 10,
  photoVerificationRequired: false,
  universityVerificationBonus: 1.5 // multiplier for safety score
};

// Utility functions
export const getCulturalInterestById = (id: string): CulturalInterest | undefined => {
  for (const category of CULTURAL_INTEREST_CATEGORIES) {
    const interest = category.interests.find(i => i.id === id);
    if (interest) return interest;
  }
  return undefined;
};

export const getCategoryByInterestId = (interestId: string): CulturalInterestCategory | undefined => {
  return CULTURAL_INTEREST_CATEGORIES.find(category => 
    category.interests.some(interest => interest.id === interestId)
  );
};

export const getLanguageProficiencyByLevel = (level: string): LanguageProficiencyLevel | undefined => {
  return LANGUAGE_PROFICIENCY_LEVELS.find(l => l.level === level);
};

export const validateCulturalProfile = (profile: any): string[] => {
  const errors: string[] = [];
  
  if (!profile.culturalBackground || profile.culturalBackground.length === 0) {
    errors.push('Cultural background is required');
  }
  
  if (!profile.interests || profile.interests.length === 0) {
    errors.push('At least one cultural interest is required');
  }
  
  if (profile.interests && profile.interests.length > SAFETY_SETTINGS.maxInterests) {
    errors.push(`Maximum ${SAFETY_SETTINGS.maxInterests} interests allowed`);
  }
  
  if (!profile.languageSkills || !profile.languageSkills.portuguese) {
    errors.push('Portuguese language proficiency is required');
  }
  
  if (!profile.bio || profile.bio.length < 20) {
    errors.push('Bio must be at least 20 characters');
  }
  
  if (profile.bio && profile.bio.length > SAFETY_SETTINGS.maxBioLength) {
    errors.push(`Bio must be less than ${SAFETY_SETTINGS.maxBioLength} characters`);
  }
  
  // Check for banned words
  const bioLower = profile.bio ? profile.bio.toLowerCase() : '';
  const hasBannedWords = SAFETY_SETTINGS.bannedWords.some(word => 
    bioLower.includes(word.toLowerCase())
  );
  if (hasBannedWords) {
    errors.push('Bio contains inappropriate content');
  }
  
  return errors;
};