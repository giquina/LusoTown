// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens
// Comprehensive design system for Portuguese-speaking community mobile app

export { COLORS, PORTUGUESE_PRIMARY_COLORS, SEMANTIC_COLORS, CULTURAL_COLORS, STATE_COLORS, NEUTRAL_COLORS, SHADOW_COLORS, GRADIENT_COLORS } from './colors';
export { TYPOGRAPHY, FONT_FAMILIES, FONT_WEIGHTS, FONT_SIZES, LINE_HEIGHTS, TYPOGRAPHY_SCALE, PORTUGUESE_TYPOGRAPHY, CULTURAL_TYPOGRAPHY, MOBILE_TYPOGRAPHY } from './typography';
export { SPACING_SYSTEM, SPACING_SCALE, SPACING, TOUCH_TARGETS, LAYOUT_SPACING, PORTUGUESE_SPACING } from './spacing';
export { SHADOWS, ELEVATION_SCALE, SHADOW_DEFINITIONS, PORTUGUESE_SHADOWS, COMPONENT_SHADOWS } from './shadows';
export { BORDER_RADIUS_SYSTEM, BORDER_RADIUS_SCALE, BORDER_RADIUS, PORTUGUESE_BORDER_RADIUS, COMPONENT_BORDER_RADIUS } from './borderRadius';

/**
 * Consolidated Design Tokens
 * Complete Portuguese Cultural Design System for Mobile
 */
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING_SYSTEM } from './spacing';
import { SHADOWS } from './shadows';
import { BORDER_RADIUS_SYSTEM } from './borderRadius';

export const DESIGN_TOKENS = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING_SYSTEM,
  shadows: SHADOWS,
  borderRadius: BORDER_RADIUS_SYSTEM
} as const;

/**
 * Portuguese Cultural Theme
 * Pre-configured theme using Portuguese heritage colors and cultural context
 */
export const PORTUGUESE_THEME = {
  // Primary brand colors
  colors: {
    primary: COLORS.primary.main,           // Portuguese red
    secondary: COLORS.secondary.main,       // Portuguese green
    accent: COLORS.accent.main,             // Portuguese gold
    background: COLORS.neutral.background.primary,
    surface: COLORS.neutral.background.secondary,
    text: COLORS.neutral.text.primary,
    textSecondary: COLORS.neutral.text.secondary,
    border: COLORS.neutral.border.primary,
    success: COLORS.state.success.main,
    warning: COLORS.state.warning.main,
    error: COLORS.state.error.main,
    info: COLORS.state.info.main
  },

  // Portuguese-optimized typography
  typography: {
    displayLarge: TYPOGRAPHY.scale.display1,
    displayMedium: TYPOGRAPHY.scale.display2,
    headingLarge: TYPOGRAPHY.scale.heading1,
    headingMedium: TYPOGRAPHY.scale.heading2,
    headingSmall: TYPOGRAPHY.scale.heading3,
    bodyLarge: TYPOGRAPHY.portuguese.portugueseBody,
    bodyMedium: TYPOGRAPHY.scale.bodyMedium,
    bodySmall: TYPOGRAPHY.scale.bodySmall,
    labelLarge: TYPOGRAPHY.scale.labelLarge,
    labelMedium: TYPOGRAPHY.scale.labelMedium,
    labelSmall: TYPOGRAPHY.scale.labelSmall,
    caption: TYPOGRAPHY.portuguese.portugueseCaption
  },

  // Consistent spacing
  spacing: {
    xs: SPACING_SYSTEM.spacing.xs,
    sm: SPACING_SYSTEM.spacing.sm,
    md: SPACING_SYSTEM.spacing.md,
    lg: SPACING_SYSTEM.spacing.lg,
    xl: SPACING_SYSTEM.spacing.xl,
    screenPadding: SPACING_SYSTEM.layout.screenPadding.horizontal,
    cardPadding: SPACING_SYSTEM.portuguese.heritageCard.padding,
    touchTarget: SPACING_SYSTEM.touchTargets.medium
  },

  // Portuguese cultural shadows
  shadows: {
    none: SHADOWS.definitions.none,
    small: SHADOWS.definitions.sm,
    medium: SHADOWS.definitions.md,
    large: SHADOWS.definitions.lg,
    portuguese: SHADOWS.portuguese.portuguese,
    heritage: SHADOWS.portuguese.heritage,
    premium: SHADOWS.portuguese.premium
  },

  // Cultural border radius
  borderRadius: {
    none: BORDER_RADIUS_SYSTEM.radius.none,
    small: BORDER_RADIUS_SYSTEM.radius.subtle,
    medium: BORDER_RADIUS_SYSTEM.radius.default,
    large: BORDER_RADIUS_SYSTEM.radius.card,
    full: BORDER_RADIUS_SYSTEM.radius.buttonPill,
    heritage: BORDER_RADIUS_SYSTEM.portuguese.heritageCard,
    cultural: BORDER_RADIUS_SYSTEM.portuguese.culturalBadge
  }
} as const;

/**
 * Component Theme Variants
 * Pre-configured component themes for different Portuguese cultural contexts
 */
export const COMPONENT_THEMES = {
  // Heritage selection theme
  heritage: {
    colors: {
      background: COLORS.neutral.background.primary,
      cardBackground: COLORS.neutral.background.secondary,
      selectedBackground: COLORS.primary.surface,
      selectedBorder: COLORS.primary.main,
      text: COLORS.neutral.text.primary,
      selectedText: COLORS.primary.main
    },
    spacing: SPACING_SYSTEM.portuguese.heritageCard,
    borderRadius: BORDER_RADIUS_SYSTEM.portuguese.heritageCard,
    shadows: SHADOWS.portugueseComponents.heritageCard
  },

  // Cultural events theme
  events: {
    colors: {
      background: COLORS.neutral.background.primary,
      cardBackground: COLORS.neutral.background.secondary,
      featuredBackground: COLORS.cultural.azulejo[50],
      categoryBackground: COLORS.accent.surface,
      text: COLORS.neutral.text.primary,
      categoryText: COLORS.accent.main
    },
    spacing: SPACING_SYSTEM.portuguese.event,
    borderRadius: BORDER_RADIUS_SYSTEM.portuguese.eventCard,
    shadows: SHADOWS.portugueseComponents.eventCard
  },

  // Business directory theme
  business: {
    colors: {
      background: COLORS.neutral.background.primary,
      cardBackground: COLORS.neutral.background.secondary,
      verifiedBackground: COLORS.state.success.surface,
      premiumBackground: COLORS.accent.surface,
      text: COLORS.neutral.text.primary,
      verifiedText: COLORS.state.success.main,
      premiumText: COLORS.accent.main
    },
    spacing: SPACING_SYSTEM.portuguese.business,
    borderRadius: BORDER_RADIUS_SYSTEM.portuguese.businessCard,
    shadows: SHADOWS.portugueseComponents.businessCard
  },

  // Matching system theme
  matches: {
    colors: {
      background: COLORS.neutral.background.primary,
      cardBackground: COLORS.neutral.background.secondary,
      highlightedBackground: COLORS.primary.surface,
      compatibilityBackground: COLORS.secondary.surface,
      text: COLORS.neutral.text.primary,
      highlightedText: COLORS.primary.main,
      compatibilityText: COLORS.secondary.main
    },
    spacing: SPACING_SYSTEM.portuguese.match,
    borderRadius: BORDER_RADIUS_SYSTEM.portuguese.matchCard,
    shadows: SHADOWS.portugueseComponents.matchCard
  }
} as const;

/**
 * Responsive Theme Configuration
 * Theme adjustments for different screen sizes
 */
export const RESPONSIVE_THEMES = {
  small: {
    spacing: SPACING_SYSTEM.responsive.small,
    borderRadius: BORDER_RADIUS_SYSTEM.responsive.small,
    typography: {
      ...PORTUGUESE_THEME.typography,
      displayLarge: TYPOGRAPHY.scale.heading1,  // Smaller display text
      displayMedium: TYPOGRAPHY.scale.heading2
    }
  },

  medium: {
    spacing: SPACING_SYSTEM.responsive.medium,
    borderRadius: BORDER_RADIUS_SYSTEM.responsive.medium,
    typography: PORTUGUESE_THEME.typography
  },

  large: {
    spacing: SPACING_SYSTEM.responsive.large,
    borderRadius: BORDER_RADIUS_SYSTEM.responsive.large,
    typography: {
      ...PORTUGUESE_THEME.typography,
      displayLarge: TYPOGRAPHY.scale.display1,  // Larger display text
      displayMedium: TYPOGRAPHY.scale.display2
    }
  }
} as const;

/**
 * Accessibility Theme Enhancements
 * Enhanced contrast and sizing for accessibility
 */
export const ACCESSIBILITY_THEME = {
  colors: {
    ...PORTUGUESE_THEME.colors,
    // Enhanced contrast ratios
    text: '#1A1A1A',              // Darker text for better contrast
    textSecondary: '#4A4A4A',     // Darker secondary text
    border: '#CCCCCC'             // Stronger border contrast
  },

  spacing: {
    ...PORTUGUESE_THEME.spacing,
    touchTarget: SPACING_SYSTEM.touchTargets.large,  // Larger touch targets
    cardPadding: SPACING_SYSTEM.spacing.xl           // More generous padding
  },

  typography: {
    ...PORTUGUESE_THEME.typography,
    // Larger base font sizes for readability
    bodyLarge: {
      ...TYPOGRAPHY.scale.bodyLarge,
      fontSize: 20  // Increased from 18
    },
    bodyMedium: {
      ...TYPOGRAPHY.scale.bodyMedium,
      fontSize: 18  // Increased from 16
    }
  }
} as const;

/**
 * Dark Mode Theme
 * Portuguese cultural theme adapted for dark mode
 */
export const DARK_MODE_THEME = {
  colors: {
    ...PORTUGUESE_THEME.colors,
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#404040',
    // Keep Portuguese brand colors for cultural identity
    primary: COLORS.primary.main,
    secondary: COLORS.secondary.main,
    accent: COLORS.accent.main
  },

  shadows: {
    ...PORTUGUESE_THEME.shadows,
    // Adjusted shadows for dark backgrounds
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
    }
  }
} as const;

// Export all design tokens and themes
export default {
  tokens: DESIGN_TOKENS,
  theme: PORTUGUESE_THEME,
  components: COMPONENT_THEMES,
  responsive: RESPONSIVE_THEMES,
  accessibility: ACCESSIBILITY_THEME,
  darkMode: DARK_MODE_THEME
} as const;