/**
 * Heritage-aware Tailwind CSS utilities
 * Generates dynamic CSS custom properties based on heritage configuration
 */

import { HeritageConfig } from '@/config/heritage'

export function generateHeritageCSSProperties(heritage: HeritageConfig) {
  const { branding } = heritage
  const { colors } = branding

  return {
    // Heritage colors as CSS custom properties
    '--heritage-primary': colors.primary,
    '--heritage-secondary': colors.secondary,
    '--heritage-accent': colors.accent,
    '--heritage-action': colors.action,
    '--heritage-premium': colors.premium,
    '--heritage-coral': colors.coral,

    // Generate color scales for each heritage color
    '--heritage-primary-50': lightenColor(colors.primary, 0.95),
    '--heritage-primary-100': lightenColor(colors.primary, 0.9),
    '--heritage-primary-200': lightenColor(colors.primary, 0.8),
    '--heritage-primary-300': lightenColor(colors.primary, 0.6),
    '--heritage-primary-400': lightenColor(colors.primary, 0.3),
    '--heritage-primary-500': colors.primary,
    '--heritage-primary-600': darkenColor(colors.primary, 0.1),
    '--heritage-primary-700': darkenColor(colors.primary, 0.2),
    '--heritage-primary-800': darkenColor(colors.primary, 0.3),
    '--heritage-primary-900': darkenColor(colors.primary, 0.4),

    '--heritage-secondary-50': lightenColor(colors.secondary, 0.95),
    '--heritage-secondary-100': lightenColor(colors.secondary, 0.9),
    '--heritage-secondary-200': lightenColor(colors.secondary, 0.8),
    '--heritage-secondary-300': lightenColor(colors.secondary, 0.6),
    '--heritage-secondary-400': lightenColor(colors.secondary, 0.3),
    '--heritage-secondary-500': colors.secondary,
    '--heritage-secondary-600': darkenColor(colors.secondary, 0.1),
    '--heritage-secondary-700': darkenColor(colors.secondary, 0.2),
    '--heritage-secondary-800': darkenColor(colors.secondary, 0.3),
    '--heritage-secondary-900': darkenColor(colors.secondary, 0.4),

    '--heritage-accent-50': lightenColor(colors.accent, 0.95),
    '--heritage-accent-100': lightenColor(colors.accent, 0.9),
    '--heritage-accent-200': lightenColor(colors.accent, 0.8),
    '--heritage-accent-300': lightenColor(colors.accent, 0.6),
    '--heritage-accent-400': lightenColor(colors.accent, 0.3),
    '--heritage-accent-500': colors.accent,
    '--heritage-accent-600': darkenColor(colors.accent, 0.1),
    '--heritage-accent-700': darkenColor(colors.accent, 0.2),
    '--heritage-accent-800': darkenColor(colors.accent, 0.3),
    '--heritage-accent-900': darkenColor(colors.accent, 0.4),

    '--heritage-action-50': lightenColor(colors.action, 0.95),
    '--heritage-action-100': lightenColor(colors.action, 0.9),
    '--heritage-action-200': lightenColor(colors.action, 0.8),
    '--heritage-action-300': lightenColor(colors.action, 0.6),
    '--heritage-action-400': lightenColor(colors.action, 0.3),
    '--heritage-action-500': colors.action,
    '--heritage-action-600': darkenColor(colors.action, 0.1),
    '--heritage-action-700': darkenColor(colors.action, 0.2),
    '--heritage-action-800': darkenColor(colors.action, 0.3),
    '--heritage-action-900': darkenColor(colors.action, 0.4),

    '--heritage-premium-50': lightenColor(colors.premium, 0.95),
    '--heritage-premium-100': lightenColor(colors.premium, 0.9),
    '--heritage-premium-200': lightenColor(colors.premium, 0.8),
    '--heritage-premium-300': lightenColor(colors.premium, 0.6),
    '--heritage-premium-400': lightenColor(colors.premium, 0.3),
    '--heritage-premium-500': colors.premium,
    '--heritage-premium-600': darkenColor(colors.premium, 0.1),
    '--heritage-premium-700': darkenColor(colors.premium, 0.2),
    '--heritage-premium-800': darkenColor(colors.premium, 0.3),
    '--heritage-premium-900': darkenColor(colors.premium, 0.4),
  }
}

// Utility functions for color manipulation
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function lightenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const lighten = (value: number) => Math.min(255, Math.round(value + (255 - value) * amount))
  
  return rgbToHex(
    lighten(rgb.r),
    lighten(rgb.g),
    lighten(rgb.b)
  )
}

function darkenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const darken = (value: number) => Math.max(0, Math.round(value * (1 - amount)))
  
  return rgbToHex(
    darken(rgb.r),
    darken(rgb.g),
    darken(rgb.b)
  )
}

// Generate heritage-aware gradient classes
export function generateHeritageGradients(heritage: HeritageConfig) {
  const { colors } = heritage.branding

  return {
    primary: `linear-gradient(135deg, ${colors.primary} 0%, ${darkenColor(colors.primary, 0.2)} 100%)`,
    secondary: `linear-gradient(135deg, ${colors.secondary} 0%, ${darkenColor(colors.secondary, 0.2)} 100%)`,
    accent: `linear-gradient(135deg, ${colors.accent} 0%, ${darkenColor(colors.accent, 0.2)} 100%)`,
    action: `linear-gradient(135deg, ${colors.action} 0%, ${darkenColor(colors.action, 0.2)} 100%)`,
    premium: `linear-gradient(135deg, ${colors.premium} 0%, ${darkenColor(colors.premium, 0.2)} 100%)`,
    
    // Multi-color gradients
    brand: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
    hero: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.action} 100%)`,
    card: `linear-gradient(135deg, ${lightenColor(colors.primary, 0.9)} 0%, ${lightenColor(colors.secondary, 0.9)} 100%)`,
  }
}

// Heritage-aware CSS class utilities
export function getHeritageClasses(heritage: HeritageConfig) {
  return {
    // Button classes
    primaryButton: 'bg-[var(--heritage-primary)] hover:bg-[var(--heritage-primary-600)] text-white',
    secondaryButton: 'bg-[var(--heritage-secondary)] hover:bg-[var(--heritage-secondary-600)] text-white',
    accentButton: 'bg-[var(--heritage-accent)] hover:bg-[var(--heritage-accent-600)] text-white',
    actionButton: 'bg-[var(--heritage-action)] hover:bg-[var(--heritage-action-600)] text-white',
    
    // Text classes
    primaryText: 'text-[var(--heritage-primary)]',
    secondaryText: 'text-[var(--heritage-secondary)]',
    accentText: 'text-[var(--heritage-accent)]',
    actionText: 'text-[var(--heritage-action)]',
    
    // Background classes
    primaryBg: 'bg-[var(--heritage-primary)]',
    secondaryBg: 'bg-[var(--heritage-secondary)]',
    accentBg: 'bg-[var(--heritage-accent)]',
    actionBg: 'bg-[var(--heritage-action)]',
    
    // Border classes
    primaryBorder: 'border-[var(--heritage-primary)]',
    secondaryBorder: 'border-[var(--heritage-secondary)]',
    accentBorder: 'border-[var(--heritage-accent)]',
    actionBorder: 'border-[var(--heritage-action)]',
    
    // Gradient classes
    primaryGradient: 'bg-gradient-to-br from-[var(--heritage-primary)] to-[var(--heritage-primary-700)]',
    brandGradient: 'bg-gradient-to-br from-[var(--heritage-primary)] via-[var(--heritage-secondary)] to-[var(--heritage-accent)]',
    heroGradient: 'bg-gradient-to-br from-[var(--heritage-primary)] to-[var(--heritage-action)]',
  }
}

// Hook for applying heritage CSS properties to document
export function applyHeritageCSSProperties(heritage: HeritageConfig) {
  if (typeof document === 'undefined') return

  const properties = generateHeritageCSSProperties(heritage)
  const root = document.documentElement

  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

// Heritage-aware color palette for charts and data visualization
export function getHeritageColorPalette(heritage: HeritageConfig) {
  const { colors } = heritage.branding

  return {
    primary: [
      colors.primary,
      darkenColor(colors.primary, 0.1),
      darkenColor(colors.primary, 0.2),
      lightenColor(colors.primary, 0.2),
      lightenColor(colors.primary, 0.4)
    ],
    full: [
      colors.primary,
      colors.secondary,
      colors.accent,
      colors.action,
      colors.premium,
      colors.coral
    ],
    gradients: generateHeritageGradients(heritage)
  }
}