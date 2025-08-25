// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens: Shadows & Elevation
// Mobile-optimized shadow system for depth and hierarchy

import { Platform } from 'react-native';
import { SHADOW_COLORS } from './colors';

/**
 * Elevation Scale
 * Consistent elevation values for material design depth
 */
export const ELEVATION_SCALE = {
  0: 0,   // Flat, no elevation
  1: 1,   // Slightly raised
  2: 2,   // Card elevation
  3: 3,   // Modal background
  4: 4,   // Navigation drawer
  5: 5,   // Dropdown menus
  6: 6,   // Floating action button
  8: 8,   // Dialog elevation
  12: 12, // Tooltip elevation
  16: 16, // Snackbar elevation
  24: 24  // Maximum elevation
} as const;

/**
 * Shadow Definitions
 * Platform-specific shadow configurations for iOS and Android
 */
export const SHADOW_DEFINITIONS = {
  // No shadow
  none: Platform.select({
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: ELEVATION_SCALE[0],
    },
    default: {}
  }),

  // Very subtle shadow for slight elevation
  xs: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    android: {
      elevation: ELEVATION_SCALE[1],
    },
    default: {}
  }),

  // Small shadow for cards and buttons
  sm: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: ELEVATION_SCALE[2],
    },
    default: {}
  }),

  // Medium shadow for elevated components
  md: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: ELEVATION_SCALE[3],
    },
    default: {}
  }),

  // Large shadow for modals and floating elements
  lg: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    android: {
      elevation: ELEVATION_SCALE[4],
    },
    default: {}
  }),

  // Extra large shadow for major floating elements
  xl: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: ELEVATION_SCALE[6],
    },
    default: {}
  }),

  // Maximum shadow for top-level dialogs
  '2xl': Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.primary,
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.3,
      shadowRadius: 24,
    },
    android: {
      elevation: ELEVATION_SCALE[8],
    },
    default: {}
  })
} as const;

/**
 * Portuguese Cultural Shadow Variants
 * Shadows with Portuguese brand colors for cultural elements
 */
export const PORTUGUESE_SHADOWS = {
  // Portuguese red shadow for cultural elements
  portuguese: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.portuguese,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: ELEVATION_SCALE[3],
    },
    default: {}
  }),

  // Heritage gold shadow for premium features
  heritage: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.heritage,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 8,
    },
    android: {
      elevation: ELEVATION_SCALE[4],
    },
    default: {}
  }),

  // Azulejo blue shadow for cultural context
  cultural: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.cultural,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: {
      elevation: ELEVATION_SCALE[2],
    },
    default: {}
  }),

  // Premium gold shadow for luxury features
  premium: Platform.select({
    ios: {
      shadowColor: SHADOW_COLORS.premium,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    android: {
      elevation: ELEVATION_SCALE[5],
    },
    default: {}
  })
} as const;

/**
 * Component-Specific Shadows
 * Pre-configured shadows for common UI components
 */
export const COMPONENT_SHADOWS = {
  // Card components
  card: {
    default: SHADOW_DEFINITIONS.sm,
    elevated: SHADOW_DEFINITIONS.md,
    floating: SHADOW_DEFINITIONS.lg
  },

  // Button components
  button: {
    default: SHADOW_DEFINITIONS.xs,
    raised: SHADOW_DEFINITIONS.sm,
    floating: SHADOW_DEFINITIONS.md
  },

  // Modal components
  modal: {
    backdrop: SHADOW_DEFINITIONS.lg,
    dialog: SHADOW_DEFINITIONS.xl,
    fullscreen: SHADOW_DEFINITIONS['2xl']
  },

  // Navigation components
  navigation: {
    tabBar: Platform.select({
      ios: {
        shadowColor: SHADOW_COLORS.primary,
        shadowOffset: { width: 0, height: -2 },  // Upward shadow
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: ELEVATION_SCALE[3],
      },
      default: {}
    }),
    
    header: Platform.select({
      ios: {
        shadowColor: SHADOW_COLORS.primary,
        shadowOffset: { width: 0, height: 2 },   // Downward shadow
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: ELEVATION_SCALE[2],
      },
      default: {}
    })
  },

  // Input components
  input: {
    default: SHADOW_DEFINITIONS.none,
    focused: SHADOW_DEFINITIONS.xs,
    error: Platform.select({
      ios: {
        shadowColor: '#DC2626', // Error red
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: ELEVATION_SCALE[1],
      },
      default: {}
    })
  }
} as const;

/**
 * Portuguese Cultural Component Shadows
 * Shadows for Portuguese-specific UI components
 */
export const PORTUGUESE_COMPONENT_SHADOWS = {
  // Heritage selection cards
  heritageCard: {
    default: SHADOW_DEFINITIONS.sm,
    selected: PORTUGUESE_SHADOWS.portuguese,
    premium: PORTUGUESE_SHADOWS.heritage
  },

  // Cultural event cards
  eventCard: {
    default: SHADOW_DEFINITIONS.sm,
    featured: PORTUGUESE_SHADOWS.cultural,
    premium: PORTUGUESE_SHADOWS.heritage
  },

  // Business listing cards
  businessCard: {
    default: SHADOW_DEFINITIONS.sm,
    verified: PORTUGUESE_SHADOWS.cultural,
    premium: PORTUGUESE_SHADOWS.premium
  },

  // Match profile cards
  matchCard: {
    default: SHADOW_DEFINITIONS.md,
    highlighted: PORTUGUESE_SHADOWS.portuguese,
    premium: PORTUGUESE_SHADOWS.heritage
  },

  // Cultural badges
  culturalBadge: {
    default: SHADOW_DEFINITIONS.xs,
    verified: PORTUGUESE_SHADOWS.cultural,
    premium: PORTUGUESE_SHADOWS.premium
  }
} as const;

/**
 * Interactive Shadow States
 * Shadow transitions for interactive elements
 */
export const INTERACTIVE_SHADOWS = {
  // Button press states
  button: {
    rest: SHADOW_DEFINITIONS.sm,
    pressed: SHADOW_DEFINITIONS.xs,    // Reduced shadow when pressed
    disabled: SHADOW_DEFINITIONS.none  // No shadow when disabled
  },

  // Card hover/press states
  card: {
    rest: SHADOW_DEFINITIONS.sm,
    hover: SHADOW_DEFINITIONS.md,      // Elevated on hover
    pressed: SHADOW_DEFINITIONS.xs,    // Reduced on press
    selected: SHADOW_DEFINITIONS.lg    // Emphasized when selected
  },

  // Floating action button states
  fab: {
    rest: SHADOW_DEFINITIONS.lg,
    pressed: SHADOW_DEFINITIONS.md,    // Slightly reduced when pressed
    disabled: SHADOW_DEFINITIONS.sm    // Minimal shadow when disabled
  }
} as const;

/**
 * Animation Shadow Presets
 * Pre-configured shadow animations for smooth transitions
 */
export const ANIMATION_SHADOWS = {
  // Fade in/out shadows
  fade: {
    from: SHADOW_DEFINITIONS.none,
    to: SHADOW_DEFINITIONS.md
  },

  // Elevate animation (bottom to floating)
  elevate: {
    from: SHADOW_DEFINITIONS.xs,
    to: SHADOW_DEFINITIONS.xl
  },

  // Press animation (floating to pressed)
  press: {
    from: SHADOW_DEFINITIONS.md,
    to: SHADOW_DEFINITIONS.xs
  },

  // Selection animation (normal to selected)
  select: {
    from: SHADOW_DEFINITIONS.sm,
    to: PORTUGUESE_SHADOWS.portuguese
  }
} as const;

/**
 * Shadow Utilities
 * Helper functions for working with shadows
 */
export const SHADOW_UTILITIES = {
  // Create custom shadow with specific color
  createShadow: (color: string, elevation: keyof typeof ELEVATION_SCALE = 3) => {
    return Platform.select({
      ios: {
        shadowColor: color,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.15,
        shadowRadius: elevation * 1.5,
      },
      android: {
        elevation: ELEVATION_SCALE[elevation],
      },
      default: {}
    });
  },

  // Get elevation value for Android
  getElevation: (level: keyof typeof ELEVATION_SCALE) => ELEVATION_SCALE[level],

  // Check if platform supports shadows
  supportsShadows: Platform.OS === 'ios',

  // Get platform-appropriate shadow
  getPlatformShadow: (iosShadow: any, androidElevation: number) => {
    return Platform.select({
      ios: iosShadow,
      android: { elevation: androidElevation },
      default: {}
    });
  }
} as const;

// Export consolidated shadow system
export const SHADOWS = {
  scale: ELEVATION_SCALE,
  definitions: SHADOW_DEFINITIONS,
  portuguese: PORTUGUESE_SHADOWS,
  components: COMPONENT_SHADOWS,
  portugueseComponents: PORTUGUESE_COMPONENT_SHADOWS,
  interactive: INTERACTIVE_SHADOWS,
  animations: ANIMATION_SHADOWS,
  utilities: SHADOW_UTILITIES
} as const;

export default SHADOWS;