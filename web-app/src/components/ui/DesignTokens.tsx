'use client'

import React from 'react'

// Design Tokens and Theme Configuration for Portuguese-speaking Community Platform

// Color System - Portuguese Cultural Heritage
export const PortugueseColors = {
  // Primary Heritage Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1e40af', // Main brand blue
    600: '#1e3a8a',
    700: '#1d4ed8',
    800: '#1e3a8a',
    900: '#1e3a8a',
  },
  
  // Secondary Heritage Colors (Green)
  secondary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0', 
    300: '#6ee7b7',
    400: '#34d399',
    500: '#059669', // Portuguese green
    600: '#047857',
    700: '#065f46',
    800: '#064e3b',
    900: '#022c22',
  },
  
  // Accent Colors (Gold/Orange)
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d', 
    400: '#fbbf24',
    500: '#f59e0b', // Portuguese gold
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Action Colors (Red)
  action: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#dc2626', // Portuguese red
    600: '#b91c1c', 
    700: '#991b1b',
    800: '#7f1d1d',
    900: '#7f1d1d',
  },
  
  // Premium/Coral Colors
  premium: {
    50: '#faf5ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa', 
    500: '#7c3aed', // Premium purple
    600: '#5b21b6',
    700: '#4c1d95',
    800: '#3730a3',
    900: '#312e81',
  },

  // Neutral Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151', 
    800: '#1f2937',
    900: '#111827',
  }
}

// Typography Scale for Portuguese Content
export const TypographyTokens = {
  fontFamily: {
    display: ['Poppins', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace']
  },
  
  fontSize: {
    // Display sizes (Headers)
    'display-large': '4rem',    // 64px
    'display': '3rem',          // 48px  
    'display-small': '2.5rem',  // 40px
    
    // Heading sizes
    'heading-1': '2rem',        // 32px
    'heading-2': '1.75rem',     // 28px
    'heading-3': '1.5rem',      // 24px
    'heading-4': '1.25rem',     // 20px
    
    // Body sizes  
    'body-large': '1.125rem',   // 18px
    'body': '1rem',             // 16px
    'body-small': '0.875rem',   // 14px
    'caption': '0.75rem',       // 12px
    
    // Mobile optimized
    'mobile-display': '2rem',   // 32px
    'mobile-heading': '1.5rem', // 24px
    'mobile-body': '1rem',      // 16px
  },
  
  fontWeight: {
    light: '300',
    normal: '400', 
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  
  lineHeight: {
    tight: '1.2',
    normal: '1.4',
    relaxed: '1.6',
    loose: '1.8'
  },
  
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em', 
    normal: '0em',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.03em'
  }
}

// Spacing System
export const SpacingTokens = {
  space: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px - minimum card padding
    7: '1.75rem',   // 28px
    8: '2rem',      // 32px
    9: '2.25rem',   // 36px
    10: '2.5rem',   // 40px
    11: '2.75rem',  // 44px - touch target
    12: '3rem',     // 48px
    14: '3.5rem',   // 56px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  // Component specific spacing
  card: {
    padding: {
      sm: '1rem',     // 16px
      md: '1.5rem',   // 24px - standard
      lg: '2rem',     // 32px
      xl: '2.5rem',   // 40px
    },
    gap: '1rem',      // 16px between cards
  },
  
  button: {
    padding: {
      sm: '0.5rem 0.75rem',  // 8px 12px
      md: '0.75rem 1rem',    // 12px 16px
      lg: '1rem 1.5rem',     // 16px 24px
      xl: '1.25rem 2rem',    // 20px 32px
    }
  }
}

// Shadow System
export const ShadowTokens = {
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    card: '0 4px 20px rgba(0, 0, 0, 0.08)',
    'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
    elevated: '0 12px 40px rgba(0, 0, 0, 0.15)',
    premium: '0 20px 50px rgba(0, 0, 0, 0.20)',
    
    // Cultural themed shadows
    portuguese: '0 8px 25px rgba(30, 64, 175, 0.15)',
    cultural: '0 6px 20px rgba(5, 150, 105, 0.12), 0 2px 6px rgba(245, 158, 11, 0.08)',
    lusophone: '0 10px 30px rgba(220, 38, 38, 0.10), 0 4px 12px rgba(22, 163, 74, 0.08)',
    
    // Focus and interactive states  
    focus: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    'focus-cultural': '0 0 0 3px rgba(5, 150, 105, 0.5)',
  }
}

// Border Radius System
export const BorderRadiusTokens = {
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
    
    // Component specific
    button: '0.5rem',  // 8px
    input: '0.375rem', // 6px  
    card: '0.75rem',   // 12px
    'card-lg': '1rem', // 16px
  }
}

// Animation and Transition Tokens
export const AnimationTokens = {
  transition: {
    fast: '150ms ease-out',
    normal: '200ms ease-out', 
    slow: '300ms ease-out',
    slower: '500ms ease-out',
  },
  
  easing: {
    linear: 'linear',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)', 
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  }
}

// Breakpoint System for Responsive Design  
export const BreakpointTokens = {
  breakpoints: {
    xs: '475px',
    sm: '640px', 
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Container max-widths
  containers: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
}

// Z-Index Scale for Layering
export const ZIndexTokens = {
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20', 
    30: '30',
    40: '40',
    50: '50',
    
    // Component layers
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030', 
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
  }
}

// Portuguese Cultural Nation Themes
export const NationalThemes = {
  portugal: {
    primary: '#C8102E',  // Portuguese red
    secondary: '#046A38', // Portuguese green
    accent: '#FFD700',   // Gold
    gradient: 'linear-gradient(135deg, #C8102E 0%, #046A38 50%, #C8102E 100%)',
    flag: '🇵🇹'
  },
  
  brazil: {
    primary: '#009739',  // Brazilian green
    secondary: '#FEDD00', // Brazilian yellow  
    accent: '#012169',   // Brazilian blue
    gradient: 'linear-gradient(135deg, #009739 0%, #FEDD00 50%, #012169 100%)',
    flag: '🇧🇷'
  },
  
  angola: {
    primary: '#CE1126',  // Angolan red
    secondary: '#000000', // Black
    accent: '#FFCD00',   // Yellow
    gradient: 'linear-gradient(135deg, #CE1126 0%, #000000 50%, #FFCD00 100%)',
    flag: '🇦🇴'
  },
  
  'cape-verde': {
    primary: '#003893',  // Cape Verdean blue
    secondary: '#FFFFFF', // White  
    accent: '#CF142B',   // Red
    gradient: 'linear-gradient(135deg, #003893 0%, #FFFFFF 50%, #003893 100%)',
    flag: '🇨🇻'
  },
  
  mozambique: {
    primary: '#009639',  // Mozambican green
    secondary: '#000000', // Black
    accent: '#FFD100',   // Yellow
    gradient: 'linear-gradient(135deg, #009639 0%, #000000 25%, #FFD100 50%, #FFFFFF 75%, #CE1126 100%)',
    flag: '🇲🇿'
  },
  
  'guinea-bissau': {
    primary: '#CE1126',  // Red
    secondary: '#FCD116', // Yellow
    accent: '#009639',   // Green  
    gradient: 'linear-gradient(135deg, #CE1126 0%, #FCD116 50%, #009639 100%)',
    flag: '🇬🇼'
  },
  
  'sao-tome': {
    primary: '#009639',  // Green
    secondary: '#FFFF00', // Yellow
    accent: '#CE1126',   // Red
    gradient: 'linear-gradient(135deg, #009639 0%, #FFFF00 50%, #CE1126 100%)', 
    flag: '🇸🇹'
  },
  
  timor: {
    primary: '#CE1126',  // Red
    secondary: '#FFC726', // Yellow
    accent: '#000000',   // Black
    gradient: 'linear-gradient(135deg, #CE1126 0%, #FFC726 50%, #000000 100%)',
    flag: '🇹🇱'
  }
}

// Component for Design Token Documentation/Showcase
export function DesignTokenShowcase() {
  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-heading-1 font-bold text-primary-900 mb-4">
          LusoTown Design System
        </h2>
        <p className="text-body text-neutral-600 mb-8">
          Modern design tokens for Portuguese-speaking community platform
        </p>
      </div>
      
      {/* Color Palette */}
      <section>
        <h3 className="text-heading-3 font-semibold text-primary-900 mb-4">
          Portuguese Cultural Colors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(PortugueseColors).map(([colorName, shades]) => (
            <div key={colorName} className="space-y-2">
              <h4 className="text-sm font-medium capitalize text-neutral-700">
                {colorName}
              </h4>
              <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                {Object.entries(shades).map(([shade, hex]) => (
                  <div
                    key={shade}
                    className="h-12 flex items-end justify-center pb-1"
                    style={{ backgroundColor: hex }}
                    title={`${colorName}-${shade}: ${hex}`}
                  >
                    <span className="text-xs text-white drop-shadow-sm">
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Typography Scale */}
      <section>
        <h3 className="text-heading-3 font-semibold text-primary-900 mb-4">
          Typography Scale
        </h3>
        <div className="space-y-4">
          {Object.entries(TypographyTokens.fontSize).map(([name, size]) => (
            <div key={name} className="flex items-center gap-4">
              <span 
                className="font-display font-semibold text-primary-900"
                style={{ fontSize: size }}
              >
                Comunidade Portuguesa
              </span>
              <span className="text-sm text-neutral-500 font-mono">
                {name}: {size}
              </span>
            </div>
          ))}
        </div>
      </section>
      
      {/* National Themes */}
      <section>
        <h3 className="text-heading-3 font-semibold text-primary-900 mb-4">
          PALOP National Themes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(NationalThemes).map(([nation, theme]) => (
            <div 
              key={nation}
              className="p-4 rounded-card text-white text-center font-medium"
              style={{ background: theme.gradient }}
            >
              <div className="text-2xl mb-2">{theme.flag}</div>
              <div className="capitalize text-sm">
                {nation.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Export all design tokens