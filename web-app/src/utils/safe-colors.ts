/**
 * Safe Color System for Framer Motion
 * 
 * This utility provides safe color class generation that works with both
 * static Tailwind CSS classes and Framer Motion animations, preventing
 * the 'text-red-600 is not an animatable color' error.
 */

// Color mapping for all dynamic color references
const COLOR_MAP = {
  // Red variants
  red: {
    50: 'bg-red-50',
    100: 'bg-red-100', 
    200: 'bg-red-200',
    300: 'bg-red-300',
    400: 'bg-red-400',
    500: 'bg-red-500',
    600: 'bg-red-600',
    700: 'bg-red-700',
    800: 'bg-red-800',
    900: 'bg-red-900',
  },
  
  // Primary (Lusophone brand)
  primary: {
    50: 'bg-primary-50',
    100: 'bg-primary-100',
    200: 'bg-primary-200', 
    300: 'bg-primary-300',
    400: 'bg-primary-400',
    500: 'bg-primary-500',
    600: 'bg-primary-600',
    700: 'bg-primary-700',
    800: 'bg-primary-800',
    900: 'bg-primary-900',
  },
  
  // Secondary
  secondary: {
    50: 'bg-secondary-50',
    100: 'bg-secondary-100',
    200: 'bg-secondary-200',
    300: 'bg-secondary-300', 
    400: 'bg-secondary-400',
    500: 'bg-secondary-500',
    600: 'bg-secondary-600',
    700: 'bg-secondary-700',
    800: 'bg-secondary-800',
    900: 'bg-secondary-900',
  },
  
  // Blue
  blue: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    200: 'bg-blue-200',
    300: 'bg-blue-300',
    400: 'bg-blue-400', 
    500: 'bg-blue-500',
    600: 'bg-blue-600',
    700: 'bg-blue-700',
    800: 'bg-blue-800',
    900: 'bg-blue-900',
  },
  
  // Green
  green: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    200: 'bg-green-200',
    300: 'bg-green-300',
    400: 'bg-green-400',
    500: 'bg-green-500', 
    600: 'bg-green-600',
    700: 'bg-green-700',
    800: 'bg-green-800',
    900: 'bg-green-900',
  },
  
  // Yellow
  yellow: {
    50: 'bg-yellow-50',
    100: 'bg-yellow-100',
    200: 'bg-yellow-200',
    300: 'bg-yellow-300',
    400: 'bg-yellow-400',
    500: 'bg-yellow-500',
    600: 'bg-yellow-600',
    700: 'bg-yellow-700',
    800: 'bg-yellow-800', 
    900: 'bg-yellow-900',
  },
  
  // Orange
  orange: {
    50: 'bg-orange-50',
    100: 'bg-orange-100',
    200: 'bg-orange-200',
    300: 'bg-orange-300',
    400: 'bg-orange-400',
    500: 'bg-orange-500',
    600: 'bg-orange-600',
    700: 'bg-orange-700',
    800: 'bg-orange-800',
    900: 'bg-orange-900',
  },
  
  // Purple
  purple: {
    50: 'bg-purple-50',
    100: 'bg-purple-100',
    200: 'bg-purple-200',
    300: 'bg-purple-300',
    400: 'bg-purple-400',
    500: 'bg-purple-500',
    600: 'bg-purple-600',
    700: 'bg-purple-700',
    800: 'bg-purple-800',
    900: 'bg-purple-900',
  },
  
  // Gray
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100', 
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    400: 'bg-gray-400',
    500: 'bg-gray-500',
    600: 'bg-gray-600',
    700: 'bg-gray-700',
    800: 'bg-gray-800',
    900: 'bg-gray-900',
  }
} as const

// Text color variants
const TEXT_COLOR_MAP = {
  red: {
    50: 'text-red-50',
    100: 'text-red-100',
    200: 'text-red-200',
    300: 'text-red-300',
    400: 'text-red-400',
    500: 'text-red-500',
    600: 'text-red-600',
    700: 'text-red-700',
    800: 'text-red-800',
    900: 'text-red-900',
  },
  primary: {
    50: 'text-primary-50',
    100: 'text-primary-100',
    200: 'text-primary-200',
    300: 'text-primary-300',
    400: 'text-primary-400',
    500: 'text-primary-500',
    600: 'text-primary-600',
    700: 'text-primary-700',
    800: 'text-primary-800',
    900: 'text-primary-900',
  },
  secondary: {
    50: 'text-secondary-50',
    100: 'text-secondary-100',
    200: 'text-secondary-200',
    300: 'text-secondary-300',
    400: 'text-secondary-400',
    500: 'text-secondary-500',
    600: 'text-secondary-600',
    700: 'text-secondary-700',
    800: 'text-secondary-800',
    900: 'text-secondary-900',
  },
  blue: {
    50: 'text-blue-50',
    100: 'text-blue-100',
    200: 'text-blue-200',
    300: 'text-blue-300', 
    400: 'text-blue-400',
    500: 'text-blue-500',
    600: 'text-blue-600',
    700: 'text-blue-700',
    800: 'text-blue-800',
    900: 'text-blue-900',
  },
  green: {
    50: 'text-green-50',
    100: 'text-green-100',
    200: 'text-green-200',
    300: 'text-green-300',
    400: 'text-green-400',
    500: 'text-green-500',
    600: 'text-green-600',
    700: 'text-green-700',
    800: 'text-green-800',
    900: 'text-green-900',
  },
  yellow: {
    50: 'text-yellow-50',
    100: 'text-yellow-100',
    200: 'text-yellow-200',
    300: 'text-yellow-300',
    400: 'text-yellow-400',
    500: 'text-yellow-500',
    600: 'text-yellow-600',
    700: 'text-yellow-700',
    800: 'text-yellow-800',
    900: 'text-yellow-900',
  },
  orange: {
    50: 'text-orange-50',
    100: 'text-orange-100',
    200: 'text-orange-200',
    300: 'text-orange-300',
    400: 'text-orange-400', 
    500: 'text-orange-500',
    600: 'text-orange-600',
    700: 'text-orange-700',
    800: 'text-orange-800',
    900: 'text-orange-900',
  },
  purple: {
    50: 'text-purple-50',
    100: 'text-purple-100',
    200: 'text-purple-200',
    300: 'text-purple-300',
    400: 'text-purple-400',
    500: 'text-purple-500',
    600: 'text-purple-600',
    700: 'text-purple-700',
    800: 'text-purple-800',
    900: 'text-purple-900',
  },
  gray: {
    50: 'text-gray-50',
    100: 'text-gray-100',
    200: 'text-gray-200',
    300: 'text-gray-300',
    400: 'text-gray-400',
    500: 'text-gray-500',
    600: 'text-gray-600',
    700: 'text-gray-700',
    800: 'text-gray-800',
    900: 'text-gray-900',
  }
} as const

// Border color variants
const BORDER_COLOR_MAP = {
  red: {
    50: 'border-red-50',
    100: 'border-red-100',
    200: 'border-red-200',
    300: 'border-red-300',
    400: 'border-red-400',
    500: 'border-red-500',
    600: 'border-red-600',
    700: 'border-red-700',
    800: 'border-red-800',
    900: 'border-red-900',
  },
  primary: {
    50: 'border-primary-50',
    100: 'border-primary-100',
    200: 'border-primary-200',
    300: 'border-primary-300',
    400: 'border-primary-400',
    500: 'border-primary-500',
    600: 'border-primary-600',
    700: 'border-primary-700',
    800: 'border-primary-800',
    900: 'border-primary-900',
  },
  secondary: {
    50: 'border-secondary-50',
    100: 'border-secondary-100',
    200: 'border-secondary-200',
    300: 'border-secondary-300',
    400: 'border-secondary-400',
    500: 'border-secondary-500',
    600: 'border-secondary-600',
    700: 'border-secondary-700',
    800: 'border-secondary-800',
    900: 'border-secondary-900',
  },
  blue: {
    50: 'border-blue-50',
    100: 'border-blue-100',
    200: 'border-blue-200',
    300: 'border-blue-300',
    400: 'border-blue-400',
    500: 'border-blue-500',
    600: 'border-blue-600',
    700: 'border-blue-700',
    800: 'border-blue-800',
    900: 'border-blue-900',
  },
  green: {
    50: 'border-green-50',
    100: 'border-green-100',
    200: 'border-green-200',
    300: 'border-green-300',
    400: 'border-green-400',
    500: 'border-green-500',
    600: 'border-green-600',
    700: 'border-green-700',
    800: 'border-green-800',
    900: 'border-green-900',
  },
  yellow: {
    50: 'border-yellow-50',
    100: 'border-yellow-100',
    200: 'border-yellow-200',
    300: 'border-yellow-300',
    400: 'border-yellow-400',
    500: 'border-yellow-500',
    600: 'border-yellow-600',
    700: 'border-yellow-700',
    800: 'border-yellow-800',
    900: 'border-yellow-900',
  },
  orange: {
    50: 'border-orange-50',
    100: 'border-orange-100',
    200: 'border-orange-200',
    300: 'border-orange-300',
    400: 'border-orange-400',
    500: 'border-orange-500',
    600: 'border-orange-600',
    700: 'border-orange-700',
    800: 'border-orange-800',
    900: 'border-orange-900',
  },
  purple: {
    50: 'border-purple-50',
    100: 'border-purple-100',
    200: 'border-purple-200',
    300: 'border-purple-300',
    400: 'border-purple-400',
    500: 'border-purple-500',
    600: 'border-purple-600',
    700: 'border-purple-700',
    800: 'border-purple-800',
    900: 'border-purple-900',
  },
  gray: {
    50: 'border-gray-50',
    100: 'border-gray-100',
    200: 'border-gray-200',
    300: 'border-gray-300',
    400: 'border-gray-400',
    500: 'border-gray-500',
    600: 'border-gray-600',
    700: 'border-gray-700',
    800: 'border-gray-800',
    900: 'border-gray-900',
  }
} as const

type ColorName = keyof typeof COLOR_MAP
type ColorShade = keyof typeof COLOR_MAP[ColorName]
type ColorPrefix = 'bg' | 'text' | 'border'

/**
 * Get a safe static Tailwind color class
 * This prevents Framer Motion animation errors by returning static classes
 */
export function getSafeColorClass(
  color: string, 
  shade: string | number = '600', 
  prefix: ColorPrefix = 'text'
): string {
  const colorName = color as ColorName
  const colorShade = (String(shade) as unknown) as ColorShade
  
  // Map to appropriate color system
  const colorMap = prefix === 'bg' ? COLOR_MAP : 
                   prefix === 'text' ? TEXT_COLOR_MAP :
                   BORDER_COLOR_MAP
  
  // Return static class or fallback
  if (colorMap[colorName] && colorMap[colorName][colorShade]) {
    return colorMap[colorName][colorShade]
  }
  
  // Fallbacks
  if (prefix === 'bg') {
    return colorName === 'primary' ? 'bg-primary-600' :
           colorName === 'secondary' ? 'bg-secondary-600' :
           colorName === 'red' ? 'bg-red-600' :
           'bg-gray-600'
  }
  
  if (prefix === 'text') {
    return colorName === 'primary' ? 'text-primary-600' :
           colorName === 'secondary' ? 'text-secondary-600' :
           colorName === 'red' ? 'text-red-600' :
           'text-gray-600'
  }
  
  if (prefix === 'border') {
    return colorName === 'primary' ? 'border-primary-600' :
           colorName === 'secondary' ? 'border-secondary-600' :
           colorName === 'red' ? 'border-red-600' :
           'border-gray-600'
  }
  
  return `${prefix}-gray-600`
}

/**
 * Get safe combined color classes for complex styling
 */
export function getSafeColorClasses(color: string, variant: 'light' | 'medium' | 'dark' = 'medium') {
  const shades = {
    light: { bg: '50', text: '700', border: '200' },
    medium: { bg: '100', text: '800', border: '300' }, 
    dark: { bg: '600', text: 'white', border: '600' }
  }
  
  const shade = shades[variant]
  
  return {
    bg: getSafeColorClass(color, shade.bg, 'bg'),
    text: shade.text === 'white' ? 'text-white' : getSafeColorClass(color, shade.text, 'text'),
    border: getSafeColorClass(color, shade.border, 'border')
  }
}

/**
 * Generate safe className string for components
 */
export function createSafeClassName(
  baseClasses: string,
  color?: string,
  variant?: 'light' | 'medium' | 'dark'
): string {
  if (!color) return baseClasses
  
  const colorClasses = getSafeColorClasses(color, variant)
  return `${baseClasses} ${colorClasses.bg} ${colorClasses.text} ${colorClasses.border}`
}

/**
 * Convert dynamic template literals to safe static classes
 */
export function convertDynamicClass(dynamicClass: string, color: string): string {
  // Extract prefix and shade from dynamic class template
  const bgMatch = dynamicClass.match(/bg-\$\{.*\}-(\d+)/)
  const textMatch = dynamicClass.match(/text-\$\{.*\}-(\d+)/)
  const borderMatch = dynamicClass.match(/border-\$\{.*\}-(\d+)/)
  
  if (bgMatch) {
    return getSafeColorClass(color, bgMatch[1], 'bg')
  }
  
  if (textMatch) {
    return getSafeColorClass(color, textMatch[1], 'text')
  }
  
  if (borderMatch) {
    return getSafeColorClass(color, borderMatch[1], 'border')
  }
  
  // Fallback - extract what we can
  if (dynamicClass.includes('bg-')) {
    return getSafeColorClass(color, '600', 'bg')
  }
  
  if (dynamicClass.includes('text-')) {
    return getSafeColorClass(color, '600', 'text')
  }
  
  if (dynamicClass.includes('border-')) {
    return getSafeColorClass(color, '600', 'border')
  }
  
  return 'text-gray-600' // Ultimate fallback
}

const safeColorUtils = {
  getSafeColorClass,
  getSafeColorClasses,
  createSafeClassName,
  convertDynamicClass
}

export default safeColorUtils