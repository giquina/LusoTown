'use client'

/**
 * Heritage Color Migration Utility
 * Helps components transition from hardcoded Portuguese colors to heritage-configurable colors
 * This utility provides both component-level and hook-based solutions for color migration
 */

import React, { ReactNode } from 'react'
import { useHeritage } from '@/context/HeritageContext'

interface HeritageColorMigrationProps {
  children: ReactNode
  className?: string
}

/**
 * Migration wrapper that updates CSS custom properties for legacy components
 * Use this temporarily while migrating components to use heritage colors
 */
export function HeritageColorMigration({ children, className }: HeritageColorMigrationProps) {
  const { heritage } = useHeritage()
  const { colors } = heritage.branding

  // Inline styles that override legacy hardcoded colors with heritage colors
  const legacyColorOverrides: React.CSSProperties = {
    // Override hardcoded hex values with heritage colors
    '--legacy-primary': colors.primary,
    '--legacy-secondary': colors.secondary,
    '--legacy-accent': colors.accent,
    '--legacy-action': colors.action,
    '--legacy-premium': colors.premium,
    '--legacy-coral': colors.coral,
  } as React.CSSProperties

  return (
    <div className={className} style={legacyColorOverrides}>
      {children}
    </div>
  )
}

/**
 * Hook for getting heritage-aware color replacements for hardcoded colors
 * Use this in components that need to programmatically replace colors
 */
export function useHeritageColorReplacements() {
  const { heritage } = useHeritage()
  const { colors } = heritage.branding

  return {
    // Map common hardcoded Portuguese colors to heritage colors
    colorMap: {
      '#1e40af': colors.primary,    // Primary blue
      '#059669': colors.secondary,  // Secondary green
      '#f59e0b': colors.accent,     // Accent amber
      '#dc2626': colors.action,     // Action red
      '#7c3aed': colors.premium,    // Premium purple
      '#f97316': colors.coral,      // Coral orange
    },
    
    // Helper function to replace a hardcoded color with heritage equivalent
    replaceColor: (hardcodedColor: string): string => {
      const colorMap: Record<string, string> = {
        '#1e40af': colors.primary,
        '#1e3a8a': colors.primary,
        '#1d4ed8': colors.primary,
        '#059669': colors.secondary,
        '#047857': colors.secondary,
        '#065f46': colors.secondary,
        '#f59e0b': colors.accent,
        '#d97706': colors.accent,
        '#b45309': colors.accent,
        '#dc2626': colors.action,
        '#b91c1c': colors.action,
        '#991b1b': colors.action,
        '#7c3aed': colors.premium,
        '#5b21b6': colors.premium,
        '#4c1d95': colors.premium,
        '#f97316': colors.coral,
        '#ea580c': colors.coral,
        '#c2410c': colors.coral,
      }
      
      return colorMap[hardcodedColor.toLowerCase()] || hardcodedColor
    },

    // Direct access to current heritage colors
    colors,
    
    // Helper function to get heritage-aware gradient strings
    getHeritageGradient: (type: 'primary' | 'secondary' | 'accent' | 'action' | 'premium' | 'brand'): string => {
      switch (type) {
        case 'primary':
          return `linear-gradient(135deg, ${colors.primary}, ${adjustColorBrightness(colors.primary, -20)})`
        case 'secondary':
          return `linear-gradient(135deg, ${colors.secondary}, ${adjustColorBrightness(colors.secondary, -20)})`
        case 'accent':
          return `linear-gradient(135deg, ${colors.accent}, ${adjustColorBrightness(colors.accent, -20)})`
        case 'action':
          return `linear-gradient(135deg, ${colors.action}, ${adjustColorBrightness(colors.action, -20)})`
        case 'premium':
          return `linear-gradient(135deg, ${colors.premium}, ${adjustColorBrightness(colors.premium, -20)})`
        case 'brand':
          return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`
        default:
          return `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
      }
    }
  }
}

/**
 * Component that shows current heritage colors for debugging and development
 * Remove this component in production builds
 */
export function HeritageColorDebugger() {
  const { heritage, heritageCode, availableHeritages } = useHeritage()
  const { colors } = heritage.branding

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 text-xs">
      <h4 className="font-bold mb-2">Heritage Colors ({heritageCode})</h4>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></div>
          <span>Primary: {colors.primary}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.secondary }}></div>
          <span>Secondary: {colors.secondary}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }}></div>
          <span>Accent: {colors.accent}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.action }}></div>
          <span>Action: {colors.action}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.premium }}></div>
          <span>Premium: {colors.premium}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.coral }}></div>
          <span>Coral: {colors.coral}</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t">
        <select 
          className="text-xs p-1 border rounded"
          onChange={(e) => {
            // This would trigger heritage change - implement if needed
            console.log('Heritage change requested:', e.target.value)
          }}
          value={heritageCode}
        >
          {availableHeritages.map(heritage => (
            <option key={heritage.code} value={heritage.code}>
              {heritage.flag} {heritage.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

/**
 * Higher-order component for wrapping legacy components with heritage color support
 */
export function withHeritageColors<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    wrapperClassName?: string
    applyColorOverrides?: boolean
  } = {}
) {
  return React.forwardRef<any, P>((props, ref) => {
    const { heritage } = useHeritage()
    
    if (options.applyColorOverrides) {
      return (
        <HeritageColorMigration className={options.wrapperClassName}>
          <Component {...props} ref={ref} />
        </HeritageColorMigration>
      )
    }

    return <Component {...props} ref={ref} />
  })
}

// Utility function to adjust color brightness (for gradients)
function adjustColorBrightness(hexColor: string, percent: number): string {
  // Remove the hash if present
  const hex = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Adjust brightness
  const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)))
  const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)))
  const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)))
  
  // Convert back to hex
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`
}

/**
 * CSS-in-JS utility for generating heritage-aware styles
 */
export function createHeritageStyles(heritage: any) {
  const { colors } = heritage.branding
  
  return {
    primaryButton: {
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: adjustColorBrightness(colors.primary, -10),
        transform: 'translateY(-1px)',
      }
    },
    
    secondaryButton: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      padding: '10px 22px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: colors.primary,
        color: 'white',
      }
    },
    
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.primary}20`, // 20% opacity
      padding: '24px',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: `0 8px 25px ${colors.primary}30`, // 30% opacity shadow
        transform: 'translateY(-2px)',
      }
    }
  }
}

export default HeritageColorMigration