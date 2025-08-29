/**
 * Lusophone Flag System Configuration
 * All 8 Portuguese-speaking nations with cultural authenticity and respect
 */

export interface LusophoneFlag {
  code: string;
  name: string;
  namePortuguese: string;
  flag: string;
  flagSvg?: string; // Optional SVG flag for higher quality displays
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  continent: string;
  population: number;
  isPrimary: boolean; // Major Portuguese-speaking countries with significant UK diaspora
  diasporaSize: string;
  culturalSymbol: string; // Respectful cultural icon
  nationalDay: string;
  heritageQuote: string; // Inspiring cultural quote
  heritageQuotePortuguese: string;
}

export const LUSOPHONE_FLAGS: LusophoneFlag[] = [
  // Primary Portuguese-speaking nations
  {
    code: 'PT',
    name: 'Portugal',
    namePortuguese: 'Portugal',
    flag: '🇵🇹',
    colors: {
      primary: '#1e40af', // Portuguese Atlantic Blue
      secondary: '#059669', // Portuguese Hope Green
      accent: '#dc2626', // Portuguese Passion Red
    },
    continent: 'Europe',
    population: 10_300_000,
    isPrimary: true,
    diasporaSize: '500,000+',
    culturalSymbol: '🏰', // Historic castles
    nationalDay: 'June 10',
    heritageQuote: 'The sea that unites us all',
    heritageQuotePortuguese: 'O mar que nos une a todos',
  },
  {
    code: 'BR',
    name: 'Brazil',
    namePortuguese: 'Brasil',
    flag: '🇧🇷',
    colors: {
      primary: '#059669', // Brazilian Green
      secondary: '#f59e0b', // Brazilian Gold
      accent: '#1e40af', // Brazilian Blue
    },
    continent: 'South America',
    population: 215_000_000,
    isPrimary: true,
    diasporaSize: '150,000+',
    culturalSymbol: '🌴', // Palm trees and tropical heritage
    nationalDay: 'September 7',
    heritageQuote: 'Unity in diversity and celebration',
    heritageQuotePortuguese: 'Unidade na diversidade e celebração',
  },
  {
    code: 'AO',
    name: 'Angola',
    namePortuguese: 'Angola',
    flag: '🇦🇴',
    colors: {
      primary: '#dc2626', // Angolan Red
      secondary: '#1f2937', // Angolan Black
      accent: '#f59e0b', // Angolan Gold
    },
    continent: 'Africa',
    population: 34_000_000,
    isPrimary: true,
    diasporaSize: '50,000+',
    culturalSymbol: '⭐', // Star of unity
    nationalDay: 'November 11',
    heritageQuote: 'Strength through unity and heritage',
    heritageQuotePortuguese: 'Força através da unidade e património',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    namePortuguese: 'Moçambique',
    flag: '🇲🇿',
    colors: {
      primary: '#059669', // Mozambican Green
      secondary: '#1f2937', // Mozambican Black
      accent: '#f59e0b', // Mozambican Gold
    },
    continent: 'Africa',
    population: 32_000_000,
    isPrimary: true,
    diasporaSize: '15,000+',
    culturalSymbol: '🌊', // Indian Ocean heritage
    nationalDay: 'June 25',
    heritageQuote: 'Ocean winds carry our dreams',
    heritageQuotePortuguese: 'Ventos do oceano levam os nossos sonhos',
  },
  {
    code: 'CV',
    name: 'Cape Verde',
    namePortuguese: 'Cabo Verde',
    flag: '🇨🇻',
    colors: {
      primary: '#1e40af', // Cape Verdean Blue
      secondary: '#f8fafc', // Cape Verdean White
      accent: '#f59e0b', // Cape Verdean Gold
    },
    continent: 'Africa',
    population: 560_000,
    isPrimary: true,
    diasporaSize: '25,000+',
    culturalSymbol: '🎵', // Musical heritage (morna, coladeira)
    nationalDay: 'July 5',
    heritageQuote: 'Islands of music and resilience',
    heritageQuotePortuguese: 'Ilhas de música e resistência',
  },
  
  // Secondary Portuguese-speaking nations
  {
    code: 'GW',
    name: 'Guinea-Bissau',
    namePortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    colors: {
      primary: '#dc2626', // Guinea-Bissau Red
      secondary: '#f59e0b', // Guinea-Bissau Yellow
      accent: '#059669', // Guinea-Bissau Green
    },
    continent: 'Africa',
    population: 2_000_000,
    isPrimary: false,
    diasporaSize: '5,000+',
    culturalSymbol: '🥁', // Traditional drums and rhythm
    nationalDay: 'September 24',
    heritageQuote: 'Rhythm of ancient wisdom',
    heritageQuotePortuguese: 'Ritmo da sabedoria ancestral',
  },
  {
    code: 'ST',
    name: 'São Tomé and Príncipe',
    namePortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    colors: {
      primary: '#059669', // São Tomé Green
      secondary: '#f59e0b', // São Tomé Yellow
      accent: '#dc2626', // São Tomé Red
    },
    continent: 'Africa',
    population: 220_000,
    isPrimary: false,
    diasporaSize: '2,000+',
    culturalSymbol: '🌺', // Tropical flowers and biodiversity
    nationalDay: 'July 12',
    heritageQuote: 'Paradise of natural beauty',
    heritageQuotePortuguese: 'Paraíso de beleza natural',
  },
  {
    code: 'TL',
    name: 'East Timor',
    namePortuguese: 'Timor-Leste',
    flag: '🇹🇱',
    colors: {
      primary: '#dc2626', // Timorese Red
      secondary: '#f59e0b', // Timorese Yellow
      accent: '#1f2937', // Timorese Black
    },
    continent: 'Asia',
    population: 1_300_000,
    isPrimary: false,
    diasporaSize: '1,000+',
    culturalSymbol: '🏔️', // Mountains and resilience
    nationalDay: 'May 20',
    heritageQuote: 'Mountain strength, ocean dreams',
    heritageQuotePortuguese: 'Força das montanhas, sonhos do oceano',
  },
];

/**
 * Flag rotation configurations for different display contexts
 */
export const FLAG_ROTATION_CONFIGS = {
  header: {
    interval: 4000, // 4 seconds per flag
    showQuote: false,
    size: 'small',
    enableHover: true,
    showName: true,
  },
  footer: {
    interval: 6000, // 6 seconds per flag
    showQuote: true,
    size: 'medium',
    enableHover: true,
    showName: true,
  },
  cultural: {
    interval: 8000, // 8 seconds per flag
    showQuote: true,
    size: 'large',
    enableHover: true,
    showName: true,
  },
  card: {
    interval: 5000, // 5 seconds per flag
    showQuote: false,
    size: 'small',
    enableHover: false,
    showName: false,
  },
} as const;

/**
 * Flag display sizes with Portuguese heritage colors
 */
export const FLAG_SIZES = {
  small: {
    container: 'w-8 h-6',
    flag: 'text-lg',
    text: 'text-xs',
  },
  medium: {
    container: 'w-12 h-9',
    flag: 'text-2xl',
    text: 'text-sm',
  },
  large: {
    container: 'w-16 h-12',
    flag: 'text-3xl',
    text: 'text-base',
  },
} as const;

/**
 * Cultural context for flag animations and transitions
 */
export const FLAG_ANIMATIONS = {
  fadeTransition: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  slideTransition: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  gentleTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.8, ease: "easeInOut" }
  },
} as const;

/**
 * Respectful national symbol usage guidelines
 */
export const CULTURAL_RESPECT_GUIDELINES = {
  flagUsage: {
    // Always maintain proper proportions
    // Never overlay text directly on flags
    // Provide cultural context when possible
    // Respect national symbols with dignity
  },
  colorHarmony: {
    // Use flag colors to enhance, not overwhelm
    // Maintain Portuguese heritage as primary theme
    // Subtle integration with existing design system
  },
  culturalSensitivity: {
    // Celebrate diversity while maintaining unity
    // Honor all 8 nations equally in rotation
    // Provide educational context when appropriate
  },
} as const;