// Shared brand configuration for LusoTown platform
// This file provides brand configuration that can be used by both web and mobile apps
// Following LusoTown's zero hardcoding policy

const brandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'LusoTown',
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Conectando a Comunidade Lusófona',
  taglineEn: process.env.NEXT_PUBLIC_BRAND_TAGLINE_EN || 'Connecting the Portuguese-speaking community',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'lusotown.com',
  domainLondon: process.env.NEXT_PUBLIC_DOMAIN_LONDON || 'lusotown.london',
  description: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION || 'United Kingdom\'s Portuguese-speaking community platform for authentic connections',
  descriptionPt: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION_PT || 'Plataforma da comunidade lusófona no Reino Unido para conexões autênticas',
  
  // Heritage-specific configuration
  heritage: {
    defaultCode: process.env.NEXT_PUBLIC_HERITAGE_CODE || 'pt',
    allowSwitching: process.env.NEXT_PUBLIC_HERITAGE_SWITCHING === 'true',
    autoDetect: process.env.NEXT_PUBLIC_HERITAGE_AUTO_DETECT === 'true'
  }
};

const defaultImages = {
  event: process.env.NEXT_PUBLIC_DEFAULT_EVENT_IMAGE || '/events/networking.jpg',
  profile: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE || '/images/profiles/default.jpg',
  logo: process.env.NEXT_PUBLIC_LOGO_PATH || '/logo.png',
  logoWhite: process.env.NEXT_PUBLIC_LOGO_WHITE_PATH || '/logo-white.png',
  favicon: process.env.NEXT_PUBLIC_FAVICON_PATH || '/favicon.ico',
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.jpg'
};

const venues = {
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
const brandColors = {
  primary: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#D4A574', // Heritage primary
  secondary: process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#8B4513', // Heritage secondary
  accent: process.env.NEXT_PUBLIC_ACCENT_COLOR || '#228B22', // Heritage accent
  action: process.env.NEXT_PUBLIC_ACTION_COLOR || '#DC143C', // Action color
  premium: process.env.NEXT_PUBLIC_PREMIUM_COLOR || '#8B008B', // Premium features
  coral: process.env.NEXT_PUBLIC_CORAL_COLOR || '#FF7F50' // Warm accent
};

// Extended Lusophone Color Palette
const PORTUGUESE_COLORS = {
  // Traditional Lusophone Colors
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

// Mobile-specific brand configuration
const MOBILE_BRAND = {
  // App icons and splash screens
  icon: process.env.EXPO_PUBLIC_APP_ICON || '/assets/icon.png',
  splash: process.env.EXPO_PUBLIC_SPLASH_IMAGE || '/assets/splash.png',
  adaptiveIcon: {
    foregroundImage: process.env.EXPO_PUBLIC_ADAPTIVE_ICON_FOREGROUND || '/assets/adaptive-icon.png',
    backgroundColor: brandColors.primary
  },
  
  // Navigation colors
  navigationBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: PORTUGUESE_COLORS.gold[200]
  },
  
  // Status bar
  statusBar: {
    backgroundColor: brandColors.primary,
    barStyle: 'light-content'
  }
};

// Lusophone Cultural Symbols and Icons
const CULTURAL_SYMBOLS = {
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

module.exports = {
  brandConfig,
  defaultImages,
  venues,
  brandColors,
  PORTUGUESE_COLORS,
  MOBILE_BRAND,
  CULTURAL_SYMBOLS,
  
  // Consolidated export for backward compatibility
  brand: brandConfig
};