export const brandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'LusoTown',
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Unidos pela Herança',
  taglineEn: process.env.NEXT_PUBLIC_BRAND_TAGLINE_EN || 'United by Heritage',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'lusotown.com',
  domainLondon: process.env.NEXT_PUBLIC_DOMAIN_LONDON || 'lusotown.uk',
  description: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION || 'London\'s heritage community platform for authentic cultural connections',
  descriptionPt: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION_PT || 'Plataforma da comunidade cultural de Londres para conexões autênticas',
  
  // Heritage-specific configuration
  heritage: {
    defaultCode: process.env.NEXT_PUBLIC_HERITAGE_CODE || 'pt',
    allowSwitching: process.env.NEXT_PUBLIC_HERITAGE_SWITCHING === 'true',
    autoDetect: process.env.NEXT_PUBLIC_HERITAGE_AUTO_DETECT === 'true'
  }
};

export const defaultImages = {
  event: process.env.NEXT_PUBLIC_DEFAULT_EVENT_IMAGE || '/events/networking.jpg',
  profile: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE || '/images/profiles/default.jpg',
  logo: process.env.NEXT_PUBLIC_LOGO_PATH || '/logo.png',
  logoWhite: process.env.NEXT_PUBLIC_LOGO_WHITE_PATH || '/logo-white.png',
  favicon: process.env.NEXT_PUBLIC_FAVICON_PATH || '/favicon.ico',
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.jpg'
};

export const venues = {
  defaultEventVenue: process.env.NEXT_PUBLIC_DEFAULT_VENUE || 'Heritage Community Centre',
  defaultEventAddress: process.env.NEXT_PUBLIC_DEFAULT_ADDRESS || 'Central London',
  mainHubs: [
    'Cultural Centre North',
    'Cultural Centre South', 
    'Community Hub East',
    'Heritage Community West'
  ]
};

// Heritage Brand Colors - Configurable Palette
export const brandColors = {
  primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#D4A574', // Heritage primary
  secondary: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#8B4513', // Heritage secondary
  accent: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#228B22', // Heritage accent
  action: process.env.NEXT_PUBLIC_ACTION_COLOR || '#DC143C', // Action color
  premium: process.env.NEXT_PUBLIC_PREMIUM_COLOR || '#8B008B', // Premium features
  coral: process.env.NEXT_PUBLIC_CORAL_COLOR || '#FF7F50' // Warm accent
};

// Extended Portuguese Color Palette
export const PORTUGUESE_COLORS = {
  // Traditional Portuguese Colors
  gold: {
    50: '#FDF7ED',
    100: '#FBEDC2',
    200: '#F7D997',
    300: '#F3C56B',
    400: '#EFB140',
    500: '#D4A574', // Primary gold
    600: '#B8945E',
    700: '#9C8248',
    800: '#807032',
    900: '#645E1C'
  },
  brown: {
    50: '#F7F3F0',
    100: '#E8DDD6',
    200: '#D9C7BC',
    300: '#CAB1A2',
    400: '#BB9B88',
    500: '#8B4513', // Primary brown
    600: '#7A3E11',
    700: '#69370F',
    800: '#58300D',
    900: '#47290B'
  },
  green: {
    50: '#F0F8F0',
    100: '#D6E8D6',
    200: '#BCD8BC',
    300: '#A2C8A2',
    400: '#88B888',
    500: '#228B22', // Primary green
    600: '#1E7D1E',
    700: '#1A6F1A',
    800: '#166116',
    900: '#125312'
  },
  red: {
    50: '#FDF2F2',
    100: '#F8D7D7',
    200: '#F3BCBC',
    300: '#EEA1A1',
    400: '#E98686',
    500: '#DC143C', // Primary red
    600: '#C51235',
    700: '#AE102E',
    800: '#970E27',
    900: '#800C20'
  }
};

// Portuguese Cultural Design Tokens
export const DESIGN_TOKENS = {
  // Typography
  fontFamily: {
    primary: '"Inter", "Helvetica Neue", Arial, sans-serif',
    heading: '"Inter", "Helvetica Neue", Arial, sans-serif',
    body: '"Inter", "Helvetica Neue", Arial, sans-serif',
    portuguese: '"Open Sans", "Roboto", sans-serif' // Better Portuguese character support
  },
  
  // Spacing (following 8px grid)
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem',  // 8px
    md: '1rem',    // 16px
    lg: '1.5rem',  // 24px
    xl: '2rem',    // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
    '5xl': '8rem'  // 128px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    '2xl': '1rem',  // 16px
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    portuguese: '0 4px 6px -1px rgba(212, 165, 116, 0.2)' // Golden shadow
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
};

// Portuguese Cultural Symbols and Icons
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
  fish: '🐟'
};

// Portuguese Cultural Emojis for Streaming
export const CULTURAL_EMOJIS = {
  ':saudade:': '💙', // Deep longing/nostalgia
  ':festa:': '🎉',   // Party/celebration
  ':futebol:': '⚽', // Football
  ':fado:': '🎵',    // Traditional music
  ':vinho:': '🍷',   // Wine
  ':bacalhau:': '🐟', // Codfish
  ':pasteis:': '🥧', // Pastries
  ':lisboa:': '🏛️', // Lisbon
  ':porto:': '🌉',   // Porto
  ':azulejos:': '🔵', // Traditional tiles
  ':navegador:': '⛵', // Navigator/exploration
  ':coracao:': '❤️'  // Heart/love
};

// Accessibility Colors (WCAG compliant)
export const ACCESSIBILITY_COLORS = {
  focus: '#4F46E5', // High contrast focus color
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

// Semantic Color System
export const SEMANTIC_COLORS = {
  // Text colors
  text: {
    primary: '#1F2937',   // Dark gray
    secondary: '#6B7280', // Medium gray
    tertiary: '#9CA3AF',  // Light gray
    inverse: '#FFFFFF',   // White
    link: brandColors.action,
    linkHover: PORTUGUESE_COLORS.red[600]
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',   // White
    secondary: '#F9FAFB', // Very light gray
    tertiary: '#F3F4F6',  // Light gray
    accent: PORTUGUESE_COLORS.gold[50],
    inverse: '#1F2937'    // Dark gray
  },
  
  // Border colors
  border: {
    primary: '#E5E7EB',   // Light gray
    secondary: '#D1D5DB', // Medium gray
    accent: brandColors.primary,
    focus: ACCESSIBILITY_COLORS.focus
  },
  
  // State colors
  state: {
    success: ACCESSIBILITY_COLORS.success,
    warning: ACCESSIBILITY_COLORS.warning,
    error: ACCESSIBILITY_COLORS.error,
    info: ACCESSIBILITY_COLORS.info
  }
};

// Component-Specific Colors
export const COMPONENT_COLORS = {
  button: {
    primary: {
      background: brandColors.primary,
      backgroundHover: PORTUGUESE_COLORS.gold[600],
      text: '#FFFFFF',
      border: brandColors.primary
    },
    secondary: {
      background: 'transparent',
      backgroundHover: PORTUGUESE_COLORS.gold[50],
      text: brandColors.primary,
      border: brandColors.primary
    },
    accent: {
      background: brandColors.action,
      backgroundHover: PORTUGUESE_COLORS.red[600],
      text: '#FFFFFF',
      border: brandColors.action
    }
  },
  
  card: {
    background: '#FFFFFF',
    border: SEMANTIC_COLORS.border.primary,
    shadow: DESIGN_TOKENS.shadows.md,
    hoverShadow: DESIGN_TOKENS.shadows.lg
  },
  
  input: {
    background: '#FFFFFF',
    border: SEMANTIC_COLORS.border.primary,
    borderFocus: brandColors.primary,
    text: SEMANTIC_COLORS.text.primary,
    placeholder: SEMANTIC_COLORS.text.tertiary
  },
  
  navigation: {
    background: '#FFFFFF',
    text: SEMANTIC_COLORS.text.primary,
    textHover: brandColors.primary,
    textActive: brandColors.action,
    border: SEMANTIC_COLORS.border.primary
  }
};

// Consolidated export for backward compatibility
export const brand = brandConfig;