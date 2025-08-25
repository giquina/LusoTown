// 🇵🇹 LusoTown Mobile Configuration - Portuguese-speaking Community
import { HeritageCountry, Language } from '../types';

// App Configuration
export const APP_CONFIG = {
  name: 'LusoTown',
  version: '1.0.0',
  description: 'Portuguese-speaking community platform for the UK',
  supportEmail: 'support@lusotown.com',
  websiteUrl: 'https://lusotown.com',
  privacyPolicyUrl: 'https://lusotown.com/privacy',
  termsOfServiceUrl: 'https://lusotown.com/terms',
} as const;

// Portuguese Heritage Countries Configuration
export const HERITAGE_COUNTRIES: Record<HeritageCountry, {
  name: Record<Language, string>;
  flag: string;
  code: string;
  description: Record<Language, string>;
}> = {
  portugal: {
    name: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    code: 'PT',
    description: {
      en: 'The birthplace of Portuguese culture and language',
      pt: 'O berço da cultura e língua portuguesa'
    }
  },
  brazil: {
    name: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷', 
    code: 'BR',
    description: {
      en: 'The largest Portuguese-speaking country in the world',
      pt: 'O maior país lusófono do mundo'
    }
  },
  'cape-verde': {
    name: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    code: 'CV', 
    description: {
      en: 'Beautiful islands with rich Portuguese heritage',
      pt: 'Belas ilhas com rica herança portuguesa'
    }
  },
  angola: {
    name: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    code: 'AO',
    description: {
      en: 'Vibrant African nation with Portuguese cultural ties',
      pt: 'Nação africana vibrante com laços culturais portugueses'
    }
  },
  mozambique: {
    name: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    code: 'MZ',
    description: {
      en: 'East African country with Portuguese colonial heritage',
      pt: 'País da África Oriental com herança colonial portuguesa'
    }
  },
  'guinea-bissau': {
    name: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' },
    flag: '🇬🇼',
    code: 'GW',
    description: {
      en: 'West African nation with Portuguese linguistic heritage',
      pt: 'Nação da África Ocidental com herança linguística portuguesa'
    }
  },
  'east-timor': {
    name: { en: 'East Timor', pt: 'Timor-Leste' },
    flag: '🇹🇱',
    code: 'TL',
    description: {
      en: 'Southeast Asian nation with Portuguese historical ties',
      pt: 'Nação do Sudeste Asiático com laços históricos portugueses'
    }
  },
  'sao-tome': {
    name: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' },
    flag: '🇸🇹',
    code: 'ST',
    description: {
      en: 'Island nation in the Gulf of Guinea with Portuguese heritage',
      pt: 'Nação insular no Golfo da Guiné com herança portuguesa'
    }
  }
} as const;

// Cultural Interest Categories
export const INTEREST_CATEGORIES = {
  food: {
    name: { en: 'Food & Cuisine', pt: 'Comida e Culinária' },
    icon: '🍽️',
    color: '#FF6B35',
    tags: ['bacalhau', 'pastéis', 'vinho', 'churrasco', 'feijoada']
  },
  music: {
    name: { en: 'Music & Fado', pt: 'Música e Fado' },
    icon: '🎵',
    color: '#8B4513',
    tags: ['fado', 'bossa nova', 'samba', 'folk', 'contemporary']
  },
  sports: {
    name: { en: 'Football & Sports', pt: 'Futebol e Desportos' },
    icon: '⚽',
    color: '#00A859',
    tags: ['futebol', 'surf', 'volleyball', 'motorsports', 'athletics']
  },
  festivals: {
    name: { en: 'Cultural Festivals', pt: 'Festivais Culturais' },
    icon: '🎉',
    color: '#FFD700',
    tags: ['santos populares', 'carnaval', 'festa junina', 'natal', 'páscoa']
  },
  business: {
    name: { en: 'Business & Networking', pt: 'Negócios e Networking' },
    icon: '💼',
    color: '#4A90E2',
    tags: ['entrepreneurs', 'startups', 'finance', 'real estate', 'consulting']
  },
  arts: {
    name: { en: 'Arts & Literature', pt: 'Arte e Literatura' },
    icon: '🎨',
    color: '#9B59B6',
    tags: ['painting', 'literature', 'poetry', 'cinema', 'theater']
  },
  travel: {
    name: { en: 'Travel & Tourism', pt: 'Viagem e Turismo' },
    icon: '✈️',
    color: '#E67E22',
    tags: ['tourism', 'adventure', 'culture tours', 'heritage sites', 'nature']
  },
  family: {
    name: { en: 'Family & Traditions', pt: 'Família e Tradições' },
    icon: '👨‍👩‍👧‍👦',
    color: '#27AE60',
    tags: ['family values', 'traditions', 'children', 'elderly care', 'community']
  },
  nightlife: {
    name: { en: 'Nightlife & Social', pt: 'Vida Noturna e Social' },
    icon: '🌃',
    color: '#E74C3C',
    tags: ['bars', 'clubs', 'social events', 'dancing', 'parties']
  },
  education: {
    name: { en: 'Education & Learning', pt: 'Educação e Aprendizagem' },
    icon: '📚',
    color: '#3498DB',
    tags: ['language learning', 'history', 'culture', 'universities', 'courses']
  }
} as const;

// Event Categories  
export const EVENT_CATEGORIES = {
  cultural: {
    name: { en: 'Cultural', pt: 'Culturais' },
    icon: '🏛️',
    color: '#8B4513'
  },
  music: {
    name: { en: 'Music & Fado', pt: 'Música e Fado' },
    icon: '🎵',
    color: '#9B59B6'
  },
  food: {
    name: { en: 'Food & Wine', pt: 'Comida e Vinho' },
    icon: '🍷',
    color: '#E67E22'
  },
  sports: {
    name: { en: 'Sports', pt: 'Desportos' },
    icon: '⚽',
    color: '#00A859'
  },
  business: {
    name: { en: 'Business', pt: 'Negócios' },
    icon: '💼',
    color: '#4A90E2'
  },
  social: {
    name: { en: 'Social', pt: 'Sociais' },
    icon: '🎭',
    color: '#E74C3C'
  },
  festivals: {
    name: { en: 'Festivals', pt: 'Festivais' },
    icon: '🎉',
    color: '#FFD700'
  }
} as const;

// Business Categories
export const BUSINESS_CATEGORIES = {
  restaurants: {
    name: { en: 'Restaurants', pt: 'Restaurantes' },
    icon: '🍽️',
    color: '#E67E22'
  },
  services: {
    name: { en: 'Services', pt: 'Serviços' },
    icon: '🔧',
    color: '#3498DB'
  },
  retail: {
    name: { en: 'Retail', pt: 'Comércio' },
    icon: '🛍️',
    color: '#9B59B6'
  },
  professional: {
    name: { en: 'Professional', pt: 'Profissional' },
    icon: '💼',
    color: '#2C3E50'
  },
  health: {
    name: { en: 'Health & Beauty', pt: 'Saúde e Beleza' },
    icon: '💊',
    color: '#27AE60'
  },
  automotive: {
    name: { en: 'Automotive', pt: 'Automóvel' },
    icon: '🚗',
    color: '#34495E'
  },
  real_estate: {
    name: { en: 'Real Estate', pt: 'Imobiliário' },
    icon: '🏠',
    color: '#8B4513'
  },
  education: {
    name: { en: 'Education', pt: 'Educação' },
    icon: '🎓',
    color: '#4A90E2'
  }
} as const;

// UK Cities with Portuguese Communities
export const UK_CITIES = [
  { name: 'London', portuguese: 'Londres', population: 8900000 },
  { name: 'Birmingham', portuguese: 'Birmingham', population: 1100000 },
  { name: 'Manchester', portuguese: 'Manchester', population: 545000 },
  { name: 'Liverpool', portuguese: 'Liverpool', population: 500000 },
  { name: 'Leeds', portuguese: 'Leeds', population: 475000 },
  { name: 'Sheffield', portuguese: 'Sheffield', population: 450000 },
  { name: 'Bristol', portuguese: 'Bristol', population: 430000 },
  { name: 'Glasgow', portuguese: 'Glasgow', population: 600000 },
  { name: 'Edinburgh', portuguese: 'Edimburgo', population: 490000 },
  { name: 'Cardiff', portuguese: 'Cardiff', population: 350000 },
  { name: 'Oxford', portuguese: 'Oxford', population: 150000 },
  { name: 'Cambridge', portuguese: 'Cambridge', population: 125000 }
] as const;

// Portuguese Cultural Symbols
export const CULTURAL_SYMBOLS = {
  flag: '🇵🇹',
  heart: '❤️', 
  star: '⭐',
  crown: '👑',
  castle: '🏰',
  ship: '⛵',
  anchor: '⚓',
  wave: '🌊',
  sun: '☀️',
  music: '🎵',
  guitar: '🎸',
  football: '⚽',
  wine: '🍷',
  bread: '🍞',
  fish: '🐟',
  azulejo: '🔷'
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  timeout: 10000,
  retryAttempts: 3
} as const;

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  types: {
    event_reminder: {
      title: { en: 'Event Reminder', pt: 'Lembrete de Evento' },
      icon: '📅'
    },
    new_match: {
      title: { en: 'New Match!', pt: 'Novo Match!' },
      icon: '💝'
    },
    message_received: {
      title: { en: 'New Message', pt: 'Nova Mensagem' },
      icon: '💬'
    },
    event_invitation: {
      title: { en: 'Event Invitation', pt: 'Convite para Evento' },
      icon: '🎉'
    },
    community_update: {
      title: { en: 'Community Update', pt: 'Atualização da Comunidade' },
      icon: '📢'
    },
    cultural_celebration: {
      title: { en: 'Cultural Celebration', pt: 'Celebração Cultural' },
      icon: '🎊'
    }
  }
} as const;

export default {
  APP_CONFIG,
  HERITAGE_COUNTRIES,
  INTEREST_CATEGORIES,
  EVENT_CATEGORIES,
  BUSINESS_CATEGORIES,
  UK_CITIES,
  CULTURAL_SYMBOLS,
  API_CONFIG,
  NOTIFICATION_CONFIG
};