// LusoTown Design System - Portuguese-Inspired Colors and Components
// Unidos pela Língua (United by Language)

/**
 * Portuguese-Inspired Color Palette
 * Each color represents an aspect of Portuguese culture and heritage
 */
export const PortugueseColors = {
  // Azul Atlântico (Atlantic Blue) - Primary - Deep ocean blue representing connection and trust
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1e40af', // Main brand color
    600: '#1e3a8a',
    700: '#1d4ed8',
    800: '#1e3a8a',
    900: '#1e3a8a',
  },

  // Verde Esperança (Hope Green) - Secondary - Vibrant emerald representing growth and heritage
  secondary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0', 
    300: '#6ee7b7',
    400: '#34d399',
    500: '#059669', // Main secondary
    600: '#047857',
    700: '#065f46',
    800: '#064e3b',
    900: '#022c22',
  },

  // Dourado Sol (Golden Sun) - Accent - Warm amber representing warmth and joy
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d', 
    400: '#fbbf24',
    500: '#f59e0b', // Main accent
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Vermelho Paixão (Passion Red) - Action - Bold red representing passion and unity
  action: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#dc2626', // Main action
    600: '#b91c1c',
    700: '#991b1b',
    800: '#7f1d1d',
    900: '#7f1d1d',
  },

  // Roxo Fado (Fado Purple) - Premium - Rich purple representing cultural traditions
  premium: {
    50: '#faf5ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#7c3aed', // Main premium
    600: '#5b21b6',
    700: '#4c1d95',
    800: '#3730a3',
    900: '#312e81',
  },

  // Coral Tropical (Tropical Coral) - Warm Accent - Vibrant coral representing warm interactions
  coral: {
    50: '#fff7ed',
    100: '#fed7aa',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main coral
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
} as const

/**
 * Portuguese Gradient Combinations
 * Pre-defined gradients that represent Portuguese culture
 */
export const PortugueseGradients = {
  // Flag-inspired gradients
  flag: 'bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600',
  flagSubtle: 'bg-gradient-to-r from-secondary-50 via-action-50 to-accent-50',
  
  // Primary brand gradients
  ocean: 'bg-gradient-to-r from-primary-500 to-secondary-500',
  oceanLight: 'bg-gradient-to-r from-primary-100 to-secondary-100',
  
  // Warm gradients
  sunset: 'bg-gradient-to-r from-accent-500 to-coral-500',
  sunrise: 'bg-gradient-to-r from-accent-400 to-action-400',
  
  // Cultural gradients
  fado: 'bg-gradient-to-r from-premium-500 to-primary-500',
  heritage: 'bg-gradient-to-br from-secondary-500 to-primary-600',
  
  // Background gradients
  subtleHeritage: 'bg-gradient-to-br from-white via-gray-50 to-secondary-50',
  warmBackground: 'bg-gradient-to-br from-gray-50 via-white to-primary-50',
} as const

/**
 * Standard Button Classes
 * Consistent button styling across the application
 */
export const ButtonStyles = {
  // Primary CTAs - Main actions like "JOIN NOW"
  primaryCTA: `
    inline-flex items-center justify-center
    bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600
    hover:from-secondary-700 hover:via-action-700 hover:to-accent-700
    text-white font-bold text-lg
    px-8 py-4 rounded-2xl
    shadow-2xl hover:shadow-3xl
    transform transition-all duration-300
    hover:-translate-y-1 hover:scale-105
    relative overflow-hidden
    group
  `,

  // Secondary CTAs - Supporting actions
  secondaryCTA: `
    inline-flex items-center justify-center
    bg-white/70 backdrop-blur-lg
    text-gray-800 border-2 border-gray-200
    hover:border-secondary-300 hover:text-secondary-700
    font-bold text-lg
    px-8 py-4 rounded-2xl
    shadow-lg hover:shadow-xl
    transform transition-all duration-300
    hover:-translate-y-1
  `,

  // Small buttons for cards and secondary actions
  smallButton: `
    inline-flex items-center justify-center
    bg-gradient-to-r from-primary-500 to-secondary-500
    hover:from-primary-600 hover:to-secondary-600
    text-white font-medium
    px-6 py-3 rounded-xl
    transition-all duration-200
    hover:scale-105
  `,

  // White buttons with colored text
  whiteCTA: `
    inline-flex items-center justify-center
    bg-white text-primary-600
    hover:bg-gray-50 hover:text-primary-700
    font-bold text-lg
    px-8 py-4 rounded-xl
    shadow-2xl hover:shadow-3xl
    transform transition-all duration-300
    hover:-translate-y-2 hover:scale-105
  `,

  // Outlined buttons
  outlined: `
    inline-flex items-center justify-center
    border-2 border-white text-white
    hover:bg-white hover:text-primary-600
    font-bold
    px-8 py-4 rounded-xl
    transition-all duration-300
  `,
} as const

/**
 * Card Styles
 * Consistent card styling with Portuguese aesthetics
 */
export const CardStyles = {
  glassmorphism: `
    bg-white/70 backdrop-blur-lg
    border border-white/30
    rounded-3xl
    shadow-2xl hover:shadow-3xl
    transition-all duration-300
    hover:-translate-y-1 hover:scale-105
  `,

  standard: `
    bg-white rounded-2xl
    shadow-lg hover:shadow-xl
    transition-all duration-300
    border border-gray-100
  `,

  featured: `
    bg-gradient-to-br from-white to-secondary-50
    rounded-2xl p-8
    shadow-xl border border-secondary-100
    hover:shadow-2xl transition-all duration-300
  `,
} as const

/**
 * Typography Scale
 * Portuguese-inspired typography hierarchy
 */
export const Typography = {
  displayLarge: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight',
  display: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight',
  heading1: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  heading2: 'text-xl sm:text-2xl md:text-3xl font-bold',
  heading3: 'text-lg sm:text-xl md:text-2xl font-bold',
  body: 'text-base sm:text-lg leading-relaxed',
  bodyLarge: 'text-lg sm:text-xl leading-relaxed',
  caption: 'text-sm text-gray-600',
  small: 'text-xs text-gray-500',
} as const

/**
 * Spacing Scale
 * Consistent spacing throughout the application
 */
export const Spacing = {
  section: 'py-20',
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  cardPadding: 'p-6 sm:p-8',
  buttonPadding: 'px-8 py-4',
  smallPadding: 'px-6 py-3',
} as const

/**
 * Animation Classes
 * Smooth animations for Portuguese aesthetic
 */
export const Animations = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  slideInRight: 'animate-slide-in-right',
  hover: 'transition-all duration-300',
  hoverScale: 'hover:scale-105 transition-transform duration-300',
  hoverRotate: 'group-hover:rotate-3 transition-transform duration-300',
} as const

/**
 * Shadow Styles
 * Portuguese-inspired shadow system
 */
export const Shadows = {
  soft: 'shadow-lg',
  medium: 'shadow-xl',
  strong: 'shadow-2xl',
  lifted: 'shadow-3xl',
  glow: 'shadow-2xl shadow-primary-500/20',
} as const

/**
 * Utility function to combine class names
 */
export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Icon background colors for different categories
 */
export const IconBackgrounds = {
  cultural: 'bg-gradient-to-br from-action-500 to-action-600',
  social: 'bg-gradient-to-br from-secondary-500 to-secondary-600', 
  professional: 'bg-gradient-to-br from-primary-500 to-primary-600',
  food: 'bg-gradient-to-br from-accent-500 to-coral-500',
  music: 'bg-gradient-to-br from-premium-500 to-premium-600',
  sports: 'bg-gradient-to-br from-action-500 to-secondary-500',
} as const

// Export color usage guidelines
export const ColorGuidelines = {
  primary: 'Use for main navigation, primary buttons, and key brand elements',
  secondary: 'Use for success states, growth indicators, and positive actions',
  accent: 'Use for highlights, warnings, and warm interactions',
  action: 'Use for urgent actions, important notifications, and passionate elements',
  premium: 'Use for premium features, cultural content, and sophisticated elements',
  coral: 'Use for warm accents, friendly interactions, and community elements',
} as const