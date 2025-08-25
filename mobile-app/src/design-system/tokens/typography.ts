// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens: Typography
// Typography system optimized for Portuguese text and mobile readability

import { Platform } from 'react-native';

/**
 * Font Family Configuration
 * Optimized for Portuguese text rendering with proper diacritical mark support
 */
export const FONT_FAMILIES = {
  // Primary font family - excellent Portuguese support
  primary: Platform.select({
    ios: 'San Francisco', // SF Pro on iOS
    android: 'Roboto',    // Roboto on Android
    default: 'System'     // System font fallback
  }),
  
  // Secondary font for headings
  heading: Platform.select({
    ios: 'San Francisco Display',
    android: 'Roboto',
    default: 'System'
  }),
  
  // Monospace for code/special content
  monospace: Platform.select({
    ios: 'SF Mono',
    android: 'Roboto Mono',
    default: 'monospace'
  }),
  
  // Portuguese-optimized fonts (when available)
  portuguese: Platform.select({
    ios: 'San Francisco',     // Excellent diacritical support
    android: 'Roboto',        // Good Portuguese character support
    default: 'System'
  })
} as const;

/**
 * Font Weight System
 * Consistent weight hierarchy for Portuguese text
 */
export const FONT_WEIGHTS = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const
} as const;

/**
 * Font Size Scale
 * Mobile-optimized sizes for Portuguese text readability
 */
export const FONT_SIZES = {
  xs: 10,   // Small labels, captions
  sm: 12,   // Secondary text, badges
  base: 14, // Default body text
  md: 16,   // Primary body text, buttons
  lg: 18,   // Large body text, subheadings
  xl: 20,   // Small headings
  '2xl': 24, // Medium headings
  '3xl': 28, // Large headings
  '4xl': 32, // Extra large headings
  '5xl': 36, // Display text
  '6xl': 48  // Hero text
} as const;

/**
 * Line Height System
 * Optimized for Portuguese text with proper accent mark clearance
 */
export const LINE_HEIGHTS = {
  tight: 1.1,    // Dense text, headings
  snug: 1.25,    // Compact text
  normal: 1.4,   // Default body text
  relaxed: 1.5,  // Comfortable reading
  loose: 1.75    // Extra spacing for accessibility
} as const;

/**
 * Letter Spacing
 * Subtle adjustments for Portuguese text readability
 */
export const LETTER_SPACING = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1
} as const;

/**
 * Typography Scale Definitions
 * Complete typography system for Portuguese-speaking community app
 */
export const TYPOGRAPHY_SCALE = {
  // Display typography - for hero sections, splash screens
  display1: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES['6xl'],      // 48
    lineHeight: FONT_SIZES['6xl'] * LINE_HEIGHTS.tight,    // 52.8
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.tight
  },
  
  display2: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES['5xl'],      // 36
    lineHeight: FONT_SIZES['5xl'] * LINE_HEIGHTS.tight,    // 39.6
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.tight
  },
  
  // Heading typography
  heading1: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES['4xl'],      // 32
    lineHeight: FONT_SIZES['4xl'] * LINE_HEIGHTS.snug,     // 40
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  heading2: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES['3xl'],      // 28
    lineHeight: FONT_SIZES['3xl'] * LINE_HEIGHTS.snug,     // 35
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  heading3: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES['2xl'],      // 24
    lineHeight: FONT_SIZES['2xl'] * LINE_HEIGHTS.snug,     // 30
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  heading4: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES.xl,          // 20
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.normal,       // 28
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  heading5: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES.lg,          // 18
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.normal,       // 25.2
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  heading6: {
    fontFamily: FONT_FAMILIES.heading,
    fontSize: FONT_SIZES.md,          // 16
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,       // 22.4
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: LETTER_SPACING.normal
  },
  
  // Body typography - optimized for Portuguese text
  bodyLarge: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.lg,          // 18
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.relaxed,      // 27
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: LETTER_SPACING.normal
  },
  
  bodyMedium: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.md,          // 16
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.relaxed,      // 24
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: LETTER_SPACING.normal
  },
  
  bodySmall: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.base,        // 14
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,     // 19.6
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: LETTER_SPACING.normal
  },
  
  // Label typography - for forms, buttons, UI elements
  labelLarge: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.md,          // 16
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,       // 22.4
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: LETTER_SPACING.wide
  },
  
  labelMedium: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.base,        // 14
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,     // 19.6
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: LETTER_SPACING.wide
  },
  
  labelSmall: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.sm,          // 12
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,       // 16.8
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: LETTER_SPACING.wider
  },
  
  // Caption typography - for small text, metadata
  caption: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.sm,          // 12
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,       // 16.8
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: LETTER_SPACING.normal
  },
  
  overline: {
    fontFamily: FONT_FAMILIES.primary,
    fontSize: FONT_SIZES.xs,          // 10
    lineHeight: FONT_SIZES.xs * LINE_HEIGHTS.normal,       // 14
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: LETTER_SPACING.widest,
    textTransform: 'uppercase' as const
  }
} as const;

/**
 * Portuguese-Specific Typography Variants
 * Optimized for Portuguese language characteristics
 */
export const PORTUGUESE_TYPOGRAPHY = {
  // Portuguese title with proper accent support
  portugueseTitle: {
    ...TYPOGRAPHY_SCALE.heading1,
    fontFamily: FONT_FAMILIES.portuguese,
    lineHeight: FONT_SIZES['4xl'] * LINE_HEIGHTS.relaxed  // Extra space for accents
  },
  
  // Portuguese body text with comfortable reading
  portugueseBody: {
    ...TYPOGRAPHY_SCALE.bodyMedium,
    fontFamily: FONT_FAMILIES.portuguese,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.loose        // Generous spacing
  },
  
  // Portuguese captions with proper diacritical clearance
  portugueseCaption: {
    ...TYPOGRAPHY_SCALE.caption,
    fontFamily: FONT_FAMILIES.portuguese,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.relaxed      // Extra accent space
  }
} as const;

/**
 * Cultural Typography Themes
 * Typography variants for different Portuguese-speaking cultural contexts
 */
export const CULTURAL_TYPOGRAPHY = {
  // Traditional/formal Portuguese typography
  traditional: {
    ...TYPOGRAPHY_SCALE.bodyMedium,
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: LETTER_SPACING.normal,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.relaxed
  },
  
  // Modern/contemporary Portuguese typography
  modern: {
    ...TYPOGRAPHY_SCALE.bodyMedium,
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: LETTER_SPACING.wide,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal
  },
  
  // Celebration/festive typography
  festive: {
    ...TYPOGRAPHY_SCALE.heading3,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: LETTER_SPACING.wide,
    textTransform: 'uppercase' as const
  }
} as const;

/**
 * Mobile-Optimized Typography Utilities
 * Responsive typography adjustments for different screen sizes
 */
export const MOBILE_TYPOGRAPHY = {
  // Touch-friendly button text
  buttonText: {
    ...TYPOGRAPHY_SCALE.labelLarge,
    minHeight: 44, // iOS/Android touch target minimum
    textAlign: 'center' as const
  },
  
  // Accessible form labels
  formLabel: {
    ...TYPOGRAPHY_SCALE.labelMedium,
    marginBottom: 8,
    color: '#374151' // Dark gray for contrast
  },
  
  // Error text for forms
  errorText: {
    ...TYPOGRAPHY_SCALE.caption,
    color: '#DC2626', // Red for errors
    marginTop: 4
  },
  
  // Success text for forms
  successText: {
    ...TYPOGRAPHY_SCALE.caption,
    color: '#059669', // Green for success
    marginTop: 4
  },
  
  // Tab bar labels
  tabLabel: {
    ...TYPOGRAPHY_SCALE.labelSmall,
    textAlign: 'center' as const,
    marginTop: 2
  },
  
  // Navigation titles
  navigationTitle: {
    ...TYPOGRAPHY_SCALE.heading6,
    textAlign: 'center' as const
  }
} as const;

// Export consolidated typography system
export const TYPOGRAPHY = {
  families: FONT_FAMILIES,
  weights: FONT_WEIGHTS,
  sizes: FONT_SIZES,
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  scale: TYPOGRAPHY_SCALE,
  portuguese: PORTUGUESE_TYPOGRAPHY,
  cultural: CULTURAL_TYPOGRAPHY,
  mobile: MOBILE_TYPOGRAPHY
} as const;

export default TYPOGRAPHY;