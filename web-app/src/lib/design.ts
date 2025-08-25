// Heritage-Configurable Design System
// Adaptable for different cultural communities

import { HeritageManager } from '@/config/heritage'

/**
 * Heritage-Aware Color Palette
 * Uses heritage configuration for dynamic color theming
 * Falls back to Lusophone colors as default
 */
const getHeritageColors = () => {
  const heritage = HeritageManager.getInstance().getCurrentHeritage()
  return heritage.branding.colors
}

/**
 * Heritage-Configurable Color Palette
 * Dynamically adapts to selected heritage community
 * @deprecated Use heritage CSS custom properties instead
 */
export const PortugueseColors = {
  // Note: These are fallback values. Use CSS custom properties for heritage-aware colors
  primary: {
    50: 'var(--heritage-primary-50, #eff6ff)',
    100: 'var(--heritage-primary-100, #dbeafe)', 
    200: 'var(--heritage-primary-200, #bfdbfe)',
    300: 'var(--heritage-primary-300, #93c5fd)',
    400: 'var(--heritage-primary-400, #60a5fa)',
    500: 'var(--heritage-primary, #1e40af)', // Main brand color - heritage configurable
    600: 'var(--heritage-primary-600, #1e3a8a)',
    700: 'var(--heritage-primary-700, #1d4ed8)',
    800: 'var(--heritage-primary-800, #1e3a8a)',
    900: 'var(--heritage-primary-900, #1e3a8a)',
  },

  secondary: {
    50: 'var(--heritage-secondary-50, #ecfdf5)',
    100: 'var(--heritage-secondary-100, #d1fae5)',
    200: 'var(--heritage-secondary-200, #a7f3d0)', 
    300: 'var(--heritage-secondary-300, #6ee7b7)',
    400: 'var(--heritage-secondary-400, #34d399)',
    500: 'var(--heritage-secondary, #059669)', // Heritage configurable
    600: 'var(--heritage-secondary-600, #047857)',
    700: 'var(--heritage-secondary-700, #065f46)',
    800: 'var(--heritage-secondary-800, #064e3b)',
    900: 'var(--heritage-secondary-900, #022c22)',
  },

  accent: {
    50: 'var(--heritage-accent-50, #fffbeb)',
    100: 'var(--heritage-accent-100, #fef3c7)',
    200: 'var(--heritage-accent-200, #fde68a)',
    300: 'var(--heritage-accent-300, #fcd34d)', 
    400: 'var(--heritage-accent-400, #fbbf24)',
    500: 'var(--heritage-accent, #f59e0b)', // Heritage configurable
    600: 'var(--heritage-accent-600, #d97706)',
    700: 'var(--heritage-accent-700, #b45309)',
    800: 'var(--heritage-accent-800, #92400e)',
    900: 'var(--heritage-accent-900, #78350f)',
  },

  action: {
    50: 'var(--heritage-action-50, #fef2f2)',
    100: 'var(--heritage-action-100, #fee2e2)',
    200: 'var(--heritage-action-200, #fecaca)',
    300: 'var(--heritage-action-300, #fca5a5)',
    400: 'var(--heritage-action-400, #f87171)',
    500: 'var(--heritage-action, #dc2626)', // Heritage configurable
    600: 'var(--heritage-action-600, #b91c1c)',
    700: 'var(--heritage-action-700, #991b1b)',
    800: 'var(--heritage-action-800, #7f1d1d)',
    900: 'var(--heritage-action-900, #7f1d1d)',
  },

  premium: {
    50: 'var(--heritage-premium-50, #faf5ff)',
    100: 'var(--heritage-premium-100, #ede9fe)',
    200: 'var(--heritage-premium-200, #ddd6fe)',
    300: 'var(--heritage-premium-300, #c4b5fd)',
    400: 'var(--heritage-premium-400, #a78bfa)',
    500: 'var(--heritage-premium, #7c3aed)', // Heritage configurable
    600: 'var(--heritage-premium-600, #5b21b6)',
    700: 'var(--heritage-premium-700, #4c1d95)',
    800: 'var(--heritage-premium-800, #3730a3)',
    900: 'var(--heritage-premium-900, #312e81)',
  },

  coral: {
    50: 'var(--heritage-coral-50, #fff7ed)',
    100: 'var(--heritage-coral-100, #fed7aa)',
    200: 'var(--heritage-coral-200, #fed7aa)',
    300: 'var(--heritage-coral-300, #fdba74)',
    400: 'var(--heritage-coral-400, #fb923c)',
    500: 'var(--heritage-coral, #f97316)', // Heritage configurable
    600: 'var(--heritage-coral-600, #ea580c)',
    700: 'var(--heritage-coral-700, #c2410c)',
    800: 'var(--heritage-coral-800, #9a3412)',
    900: 'var(--heritage-coral-900, #7c2d12)',
  },
} as const

/**
 * Runtime Heritage Colors
 * Get current heritage colors at runtime
 */
export const getHeritageColorsRuntime = () => getHeritageColors()

/**
 * Heritage-Configurable Gradient Combinations
 * Adapts to different cultural communities using heritage colors
 */
export const PortugueseGradients = {
  // Heritage-inspired gradients (uses CSS custom properties)
  flag: 'bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600',
  flagSubtle: 'bg-gradient-to-r from-secondary-50 via-action-50 to-accent-50',
  
  // Primary brand gradients (heritage-aware)
  ocean: 'bg-gradient-to-r from-primary-500 to-secondary-500',
  oceanLight: 'bg-gradient-to-r from-primary-100 to-secondary-100',
  
  // Warm gradients
  sunset: 'bg-gradient-to-r from-accent-500 to-coral-500',
  sunrise: 'bg-gradient-to-r from-accent-400 to-action-400',
  
  // Cultural gradients (adapts to heritage)
  fado: 'bg-gradient-to-r from-premium-500 to-primary-500',
  heritage: 'bg-gradient-to-br from-secondary-500 to-primary-600',
  
  // Background gradients (heritage-aware)
  subtleHeritage: 'bg-gradient-to-br from-white via-gray-50 to-secondary-50',
  warmBackground: 'bg-gradient-to-br from-gray-50 via-white to-primary-50',
} as const

/**
 * Heritage Gradients
 * New name for clarity - these adapt to heritage configuration
 */
export const HeritageGradients = PortugueseGradients

/**
 * Unified Button System
 * Consistent button styling with size variants and semantic types
 */
export const ButtonStyles = {
  // Base button classes - shared across all variants
  base: `
    inline-flex items-center justify-center
    font-semibold rounded-xl transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-manipulation
  `,

  // Size variants with proper touch targets
  sizes: {
    small: 'min-h-[36px] px-3 py-2 text-sm',
    medium: 'min-h-[44px] px-4 py-2.5 text-base', // 44px minimum for touch
    large: 'min-h-[48px] px-6 py-3 text-lg',
    xlarge: 'min-h-[56px] px-8 py-4 text-xl'
  },

  // Semantic button variants
  variants: {
    // Primary - Main actions
    primary: `
      bg-gradient-to-r from-primary-500 to-secondary-500
      hover:from-primary-600 hover:to-secondary-600
      focus:ring-primary-500 text-white shadow-lg
      hover:shadow-xl hover:-translate-y-0.5
    `,

    // Secondary - Supporting actions  
    secondary: `
      bg-white border-2 border-gray-300
      hover:border-primary-500 hover:text-primary-600
      focus:ring-primary-500 text-gray-700
      shadow-sm hover:shadow-md
    `,

    // Outline - Subtle actions
    outline: `
      border-2 border-primary-500 text-primary-600
      hover:bg-primary-500 hover:text-white
      focus:ring-primary-500 bg-transparent
    `,

    // Ghost - Minimal actions
    ghost: `
      text-primary-600 hover:bg-primary-50
      focus:ring-primary-500 bg-transparent
    `,

    // Danger - Destructive actions
    danger: `
      bg-action-500 hover:bg-action-600
      focus:ring-action-500 text-white shadow-lg
      hover:shadow-xl hover:-translate-y-0.5
    `,

    // Success - Positive actions
    success: `
      bg-secondary-500 hover:bg-secondary-600
      focus:ring-secondary-500 text-white shadow-lg
      hover:shadow-xl hover:-translate-y-0.5
    `,

    // Premium - Special actions
    premium: `
      bg-gradient-to-r from-premium-500 to-accent-500
      hover:from-premium-600 hover:to-accent-600
      focus:ring-premium-500 text-white shadow-lg
      hover:shadow-xl hover:-translate-y-0.5
    `
  },

  // Legacy styles for gradual migration
  legacy: {
    primaryCTA: `
      inline-flex items-center justify-center min-h-[48px]
      bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600
      hover:from-secondary-700 hover:via-action-700 hover:to-accent-700
      text-white font-bold text-lg px-8 py-4 rounded-2xl
      shadow-2xl hover:shadow-3xl transition-all duration-300
      hover:-translate-y-1 hover:scale-105 relative overflow-hidden group
    `,
    
    secondaryCTA: `
      inline-flex items-center justify-center min-h-[44px]
      bg-white/70 backdrop-blur-lg text-gray-800
      border-2 border-gray-200 hover:border-secondary-300
      hover:text-secondary-700 font-bold text-lg px-8 py-4
      rounded-2xl shadow-lg hover:shadow-xl
      transform transition-all duration-300 hover:-translate-y-1
    `,
    
    smallButton: `
      inline-flex items-center justify-center min-h-[36px]
      bg-gradient-to-r from-primary-500 to-secondary-500
      hover:from-primary-600 hover:to-secondary-600
      text-white font-medium px-6 py-3 rounded-xl
      transition-all duration-200 hover:scale-105
    `
  }
} as const

/**
 * Button utility function to combine classes
 */
export const getButtonStyles = (variant: keyof typeof ButtonStyles.variants, size: keyof typeof ButtonStyles.sizes = 'medium') => {
  return `${ButtonStyles.base} ${ButtonStyles.sizes[size]} ${ButtonStyles.variants[variant]}`
}

/**
 * Card Styles
 * Consistent card styling with Lusophone aesthetics
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
 * Typography Scale with Information Hierarchy
 * Lusophone-inspired typography with clear visual hierarchy
 */
export const Typography = {
  // Display typography for hero sections
  displayLarge: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-gray-900',
  display: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900',
  
  // Heading hierarchy with consistent line-height
  heading1: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900',
  heading2: 'text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-gray-900', 
  heading3: 'text-lg sm:text-xl md:text-2xl font-bold leading-tight text-gray-900',
  heading4: 'text-base sm:text-lg font-bold leading-tight text-gray-900',
  heading5: 'text-sm sm:text-base font-bold leading-tight text-gray-900',
  
  // Body text with optimal readability
  body: 'text-base leading-relaxed text-gray-700',
  bodyLarge: 'text-lg leading-relaxed text-gray-700',
  bodySmall: 'text-sm leading-relaxed text-gray-600',
  
  // Supporting text
  caption: 'text-sm leading-normal text-gray-600',
  small: 'text-xs leading-normal text-gray-500',
  
  // Interactive elements
  label: 'text-sm font-medium leading-normal text-gray-900',
  button: 'font-semibold leading-normal',
  link: 'font-medium text-primary-600 hover:text-primary-700',
  
  // Price and important data
  price: 'font-bold text-primary-600',
  priceSmall: 'text-sm font-bold text-primary-600',
  priceLarge: 'text-lg font-bold text-primary-600',
  
  // Status and badges
  badge: 'text-xs font-medium uppercase tracking-wide',
  status: 'text-sm font-medium',
  
  // Utility classes
  truncate: 'truncate',
  lineClamp2: 'line-clamp-2',
  lineClamp3: 'line-clamp-3'
} as const

/**
 * Comprehensive Spacing Scale
 * Consistent spacing with touch-friendly sizing
 */
export const Spacing = {
  // Section spacing
  section: 'py-16 sm:py-20 lg:py-24',
  sectionSmall: 'py-8 sm:py-12',
  sectionLarge: 'py-20 sm:py-24 lg:py-32',
  
  // Container layouts
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'max-w-4xl mx-auto px-4 sm:px-6',
  containerLarge: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Card spacing
  card: 'p-4 sm:p-6',
  cardSmall: 'p-3 sm:p-4',
  cardLarge: 'p-6 sm:p-8',
  
  // Component spacing
  component: 'mb-6 sm:mb-8',
  componentSmall: 'mb-3 sm:mb-4',
  componentLarge: 'mb-8 sm:mb-12',
  
  // Element spacing (4px scale)
  xs: 'gap-1', // 4px
  sm: 'gap-2', // 8px  
  md: 'gap-3', // 12px
  lg: 'gap-4', // 16px
  xl: 'gap-6', // 24px
  '2xl': 'gap-8', // 32px
  
  // Touch-friendly minimums
  touchTarget: 'min-h-[44px] min-w-[44px]', // 44px minimum
  touchPadding: 'p-2', // 8px padding for 44px total
  
  // Grid spacing
  gridSmall: 'gap-3 sm:gap-4',
  gridMedium: 'gap-4 sm:gap-6',
  gridLarge: 'gap-6 sm:gap-8'
} as const

/**
 * Animation Classes
 * Smooth animations for Lusophone aesthetic
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
 * Lusophone-inspired shadow system
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
 * Professional Icon System
 * Consistent icon styling with semantic colors
 */
export const IconSystem = {
  // Icon sizes with consistent proportions
  sizes: {
    xs: 'w-3 h-3', // 12px
    sm: 'w-4 h-4', // 16px
    md: 'w-5 h-5', // 20px - default
    lg: 'w-6 h-6', // 24px
    xl: 'w-8 h-8', // 32px
    '2xl': 'w-10 h-10' // 40px
  },
  
  // Icon background containers
  containers: {
    small: 'w-8 h-8 rounded-lg flex items-center justify-center',
    medium: 'w-10 h-10 rounded-xl flex items-center justify-center',
    large: 'w-12 h-12 rounded-xl flex items-center justify-center',
    xlarge: 'w-16 h-16 rounded-2xl flex items-center justify-center'
  },
  
  // Category-specific styling
  categories: {
    cultural: {
      bg: 'bg-gradient-to-br from-action-500 to-action-600',
      text: 'text-action-600',
      bgLight: 'bg-action-50',
      icon: 'text-white'
    },
    social: {
      bg: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
      text: 'text-secondary-600', 
      bgLight: 'bg-secondary-50',
      icon: 'text-white'
    },
    professional: {
      bg: 'bg-gradient-to-br from-primary-500 to-primary-600',
      text: 'text-primary-600',
      bgLight: 'bg-primary-50',
      icon: 'text-white'
    },
    food: {
      bg: 'bg-gradient-to-br from-accent-500 to-coral-500',
      text: 'text-accent-600',
      bgLight: 'bg-accent-50',
      icon: 'text-white'
    },
    music: {
      bg: 'bg-gradient-to-br from-premium-500 to-premium-600',
      text: 'text-premium-600',
      bgLight: 'bg-premium-50',
      icon: 'text-white'
    },
    sports: {
      bg: 'bg-gradient-to-br from-action-500 to-secondary-500',
      text: 'text-secondary-600',
      bgLight: 'bg-secondary-50',
      icon: 'text-white'
    }
  },
  
  // Common icon states
  states: {
    default: 'text-gray-600',
    hover: 'hover:text-primary-600',
    active: 'text-primary-600',
    disabled: 'text-gray-400'
  }
} as const

// Legacy icon backgrounds for migration
export const IconBackgrounds = IconSystem.categories

// Export color usage guidelines
export const ColorGuidelines = {
  primary: 'Use for main navigation, primary buttons, and key brand elements',
  secondary: 'Use for success states, growth indicators, and positive actions',
  accent: 'Use for highlights, warnings, and warm interactions',
  action: 'Use for urgent actions, important notifications, and passionate elements',
  premium: 'Use for premium features, cultural content, and sophisticated elements',
  coral: 'Use for warm accents, friendly interactions, and community elements',
} as const