// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens: Colors
// Comprehensive Portuguese heritage color system optimized for mobile

/**
 * Portuguese Cultural Color Palette
 * Based on Portuguese flag colors (red, green) with cultural heritage gold
 * Optimized for mobile accessibility and Portuguese-speaking community branding
 */

// Primary Portuguese Colors - From Flag Heritage
export const PORTUGUESE_PRIMARY_COLORS = {
  red: {
    50: '#FEF2F2',   // Lightest red background
    100: '#FEE2E2',  // Light red for surfaces
    200: '#FECACA',  // Soft red
    300: '#FCA5A5',  // Medium light red
    400: '#F87171',  // Medium red
    500: '#FF0000',  // Portuguese flag red (primary)
    600: '#DC2626',  // Darker red for interactions
    700: '#B91C1C',  // Deep red
    800: '#991B1B',  // Very deep red
    900: '#7F1D1D'   // Darkest red
  },
  green: {
    50: '#F0FDF4',   // Lightest green background
    100: '#DCFCE7',  // Light green for surfaces
    200: '#BBF7D0',  // Soft green
    300: '#86EFAC',  // Medium light green
    400: '#4ADE80',  // Medium green
    500: '#2E8B57',  // Portuguese heritage green (enhanced)
    600: '#16A34A',  // Darker green for interactions
    700: '#15803D',  // Deep green
    800: '#166534',  // Very deep green
    900: '#14532D'   // Darkest green
  },
  gold: {
    50: '#FFFBEB',   // Lightest gold background
    100: '#FEF3C7',  // Light gold for surfaces
    200: '#FDE68A',  // Soft gold
    300: '#FCD34D',  // Medium light gold
    400: '#FBBF24',  // Medium gold
    500: '#FFD700',  // Portuguese heritage gold (primary)
    600: '#D97706',  // Darker gold for interactions
    700: '#B45309',  // Deep gold
    800: '#92400E',  // Very deep gold
    900: '#78350F'   // Darkest gold
  }
} as const;

// Semantic Color System for Mobile UI
export const SEMANTIC_COLORS = {
  // Primary brand colors - Portuguese flag red
  primary: {
    main: PORTUGUESE_PRIMARY_COLORS.red[500],        // #FF0000
    dark: PORTUGUESE_PRIMARY_COLORS.red[600],        // #DC2626
    light: PORTUGUESE_PRIMARY_COLORS.red[100],       // #FEE2E2
    surface: PORTUGUESE_PRIMARY_COLORS.red[50],      // #FEF2F2
    contrast: '#FFFFFF'                              // White text on red
  },
  
  // Secondary colors - Portuguese flag green
  secondary: {
    main: PORTUGUESE_PRIMARY_COLORS.green[500],      // #00A859
    dark: PORTUGUESE_PRIMARY_COLORS.green[600],      // #16A34A
    light: PORTUGUESE_PRIMARY_COLORS.green[100],     // #DCFCE7
    surface: PORTUGUESE_PRIMARY_COLORS.green[50],    // #F0FDF4
    contrast: '#FFFFFF'                              // White text on green
  },
  
  // Accent colors - Portuguese heritage gold
  accent: {
    main: PORTUGUESE_PRIMARY_COLORS.gold[500],       // #FFD700
    dark: PORTUGUESE_PRIMARY_COLORS.gold[600],       // #D97706
    light: PORTUGUESE_PRIMARY_COLORS.gold[100],      // #FEF3C7
    surface: PORTUGUESE_PRIMARY_COLORS.gold[50],     // #FFFBEB
    contrast: '#1F2937'                              // Dark text on gold
  },
  
  // Action colors (matches primary for consistency)
  action: {
    main: PORTUGUESE_PRIMARY_COLORS.red[500],        // #FF0000
    dark: PORTUGUESE_PRIMARY_COLORS.red[700],        // #B91C1C
    light: PORTUGUESE_PRIMARY_COLORS.red[100],       // #FEE2E2
    disabled: '#9CA3AF'                              // Gray for disabled states
  }
} as const;

// Portuguese Cultural Context Colors
export const CULTURAL_COLORS = {
  // Azulejo (Portuguese tile) inspired blues
  azulejo: {
    50: '#EFF6FF',   // Lightest azulejo blue
    100: '#DBEAFE',  // Light azulejo blue
    200: '#BFDBFE',  // Soft azulejo blue
    300: '#93C5FD',  // Medium light azulejo blue
    400: '#60A5FA',  // Medium azulejo blue
    500: '#4A90E2',  // Portuguese azulejo blue (primary)
    600: '#2563EB',  // Darker azulejo blue
    700: '#1D4ED8',  // Deep azulejo blue
    800: '#1E40AF',  // Very deep azulejo blue
    900: '#1E3A8A'   // Darkest azulejo blue
  },
  
  // Heritage countries accent colors - All 8 Portuguese-speaking nations
  heritage: {
    portugal: PORTUGUESE_PRIMARY_COLORS.red[500],    // 🇵🇹 Portugal - Red
    brazil: '#009B3A',                               // 🇧🇷 Brazil - Green
    capeVerde: '#003893',                            // 🇨🇻 Cape Verde - Blue
    angola: '#CE1126',                               // 🇦🇴 Angola - Red
    mozambique: '#00A859',                           // 🇲🇿 Mozambique - Green
    guineaBissau: '#CE1126',                         // 🇬🇼 Guinea-Bissau - Red
    eastTimor: '#DC143C',                            // 🇹🇱 East Timor - Red
    saoTome: '#12AD2B'                               // 🇸🇹 São Tomé - Green
  },
  
  // PALOP (African Portuguese-speaking) heritage colors
  palop: {
    // Angola 🇦🇴 - Diamond heritage and Kizomba culture
    angola: {
      primary: '#CE1126',      // Flag red
      accent: '#FFD700',       // Diamond gold
      cultural: '#8B4513'      // Kizomba earth tones
    },
    
    // Cape Verde 🇨🇻 - Island blues and Morna soul
    capeVerde: {
      primary: '#003893',      // Flag blue
      accent: '#4A90E2',       // Ocean blue
      cultural: '#2E8B57'      // Island green
    },
    
    // Mozambique 🇲🇿 - Coastal spices and Indian Ocean heritage
    mozambique: {
      primary: '#00A859',      // Flag green
      accent: '#FF6B35',       // Peri-peri spice red
      cultural: '#4169E1'      // Coastal blue
    },
    
    // Guinea-Bissau 🇬🇼 - Community arts and cultural preservation
    guineaBissau: {
      primary: '#CE1126',      // Flag red
      accent: '#FFD700',       // Cultural gold
      cultural: '#228B22'      // Community green
    },
    
    // São Tomé and Príncipe 🇸🇹 - Cocoa paradise and tropical culture
    saoTome: {
      primary: '#12AD2B',      // Flag green
      accent: '#8B4513',       // Cocoa brown
      cultural: '#FF7F50'      // Tropical coral
    }
  },
  
  // Cultural celebration colors
  celebration: {
    santosPopulares: PORTUGUESE_PRIMARY_COLORS.red[500],   // Portuguese festivals
    festaJunina: '#FFD700',                                // Brazilian festivals
    carnaval: '#FF69B4',                                   // Carnival
    fado: '#4A4A4A',                                       // Fado music
    folklore: PORTUGUESE_PRIMARY_COLORS.green[500],        // Folk traditions
    kizomba: '#8B4513',                                    // Angolan Kizomba
    morna: '#4A90E2',                                      // Cape Verdean Morna
    batuque: '#228B22',                                    // Traditional rhythms
    coladeira: '#FF7F50'                                   // Island dance music
  }
} as const;

// UI State Colors (WCAG AA compliant)
export const STATE_COLORS = {
  success: {
    main: PORTUGUESE_PRIMARY_COLORS.green[500],      // #00A859 - Portuguese green
    dark: PORTUGUESE_PRIMARY_COLORS.green[700],      // #15803D
    light: PORTUGUESE_PRIMARY_COLORS.green[100],     // #DCFCE7
    surface: PORTUGUESE_PRIMARY_COLORS.green[50],    // #F0FDF4
    contrast: '#FFFFFF'
  },
  warning: {
    main: PORTUGUESE_PRIMARY_COLORS.gold[500],       // #FFD700 - Portuguese gold
    dark: PORTUGUESE_PRIMARY_COLORS.gold[600],       // #D97706
    light: PORTUGUESE_PRIMARY_COLORS.gold[100],      // #FEF3C7
    surface: PORTUGUESE_PRIMARY_COLORS.gold[50],     // #FFFBEB
    contrast: '#1F2937'
  },
  error: {
    main: PORTUGUESE_PRIMARY_COLORS.red[500],        // #FF0000 - Portuguese red
    dark: PORTUGUESE_PRIMARY_COLORS.red[700],        // #B91C1C
    light: PORTUGUESE_PRIMARY_COLORS.red[100],       // #FEE2E2
    surface: PORTUGUESE_PRIMARY_COLORS.red[50],      // #FEF2F2
    contrast: '#FFFFFF'
  },
  info: {
    main: CULTURAL_COLORS.azulejo[500],              // #4A90E2 - Portuguese blue
    dark: CULTURAL_COLORS.azulejo[700],              // #1D4ED8
    light: CULTURAL_COLORS.azulejo[100],             // #DBEAFE
    surface: CULTURAL_COLORS.azulejo[50],            // #EFF6FF
    contrast: '#FFFFFF'
  }
} as const;

// Neutral Colors for Text and Backgrounds
export const NEUTRAL_COLORS = {
  // Text colors (optimized for Portuguese text readability)
  text: {
    primary: '#1F2937',     // Dark gray for primary text (WCAG AAA)
    secondary: '#6B7280',   // Medium gray for secondary text
    tertiary: '#9CA3AF',    // Light gray for placeholder text
    inverse: '#FFFFFF',     // White text for dark backgrounds
    disabled: '#D1D5DB'     // Disabled text color
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',     // White main background
    secondary: '#F9FAFB',   // Very light gray for cards
    tertiary: '#F3F4F6',    // Light gray for sections
    inverse: '#1F2937',     // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)'  // Modal overlay
  },
  
  // Border and divider colors
  border: {
    primary: '#E5E7EB',     // Light gray borders
    secondary: '#D1D5DB',   // Medium gray borders
    focus: SEMANTIC_COLORS.primary.main,  // Portuguese red for focus
    success: STATE_COLORS.success.main,   // Green for success
    warning: STATE_COLORS.warning.main,   // Gold for warning
    error: STATE_COLORS.error.main        // Red for error
  }
} as const;

// Shadow Colors for Mobile Elevation
export const SHADOW_COLORS = {
  primary: 'rgba(31, 41, 55, 0.1)',      // Standard shadow
  portuguese: 'rgba(255, 0, 0, 0.15)',   // Portuguese red shadow
  cultural: 'rgba(74, 144, 226, 0.12)',  // Azulejo blue shadow
  heritage: 'rgba(255, 215, 0, 0.18)',   // Portuguese gold shadow
  premium: 'rgba(184, 134, 11, 0.2)'     // Premium gold shadow
} as const;

// Gradient Colors for Premium Features
export const GRADIENT_COLORS = {
  // Portuguese flag gradient
  portuguese: {
    start: PORTUGUESE_PRIMARY_COLORS.red[500],
    end: PORTUGUESE_PRIMARY_COLORS.green[500],
    colors: [PORTUGUESE_PRIMARY_COLORS.red[500], PORTUGUESE_PRIMARY_COLORS.green[500]]
  },
  
  // Heritage gold gradient
  heritage: {
    start: PORTUGUESE_PRIMARY_COLORS.gold[400],
    end: PORTUGUESE_PRIMARY_COLORS.gold[600],
    colors: [PORTUGUESE_PRIMARY_COLORS.gold[400], PORTUGUESE_PRIMARY_COLORS.gold[600]]
  },
  
  // Azulejo gradient
  azulejo: {
    start: CULTURAL_COLORS.azulejo[400],
    end: CULTURAL_COLORS.azulejo[600],
    colors: [CULTURAL_COLORS.azulejo[400], CULTURAL_COLORS.azulejo[600]]
  },
  
  // Premium gradient
  premium: {
    start: PORTUGUESE_PRIMARY_COLORS.gold[300],
    end: PORTUGUESE_PRIMARY_COLORS.gold[700],
    colors: [PORTUGUESE_PRIMARY_COLORS.gold[300], PORTUGUESE_PRIMARY_COLORS.gold[700]]
  }
} as const;

// Export consolidated color system
export const COLORS = {
  ...SEMANTIC_COLORS,
  cultural: CULTURAL_COLORS,
  state: STATE_COLORS,
  neutral: NEUTRAL_COLORS,
  shadow: SHADOW_COLORS,
  gradient: GRADIENT_COLORS,
  portuguese: PORTUGUESE_PRIMARY_COLORS
} as const;

export default COLORS;