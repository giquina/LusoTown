// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens: Spacing
// Consistent spacing system for mobile touch interfaces

/**
 * Base Spacing Scale
 * Built on 4px base unit for consistent spacing across all mobile components
 */
export const BASE_UNIT = 4;

/**
 * Spacing Scale
 * Consistent spacing values following mobile design best practices
 */
export const SPACING_SCALE = {
  0: 0,           // No spacing
  1: BASE_UNIT,   // 4px  - Tiny spacing
  2: BASE_UNIT * 2,  // 8px  - Extra small
  3: BASE_UNIT * 3,  // 12px - Small
  4: BASE_UNIT * 4,  // 16px - Medium (base)
  5: BASE_UNIT * 5,  // 20px - Medium large
  6: BASE_UNIT * 6,  // 24px - Large
  7: BASE_UNIT * 7,  // 28px - Extra large
  8: BASE_UNIT * 8,  // 32px - 2x large
  10: BASE_UNIT * 10, // 40px - 2.5x large
  12: BASE_UNIT * 12, // 48px - 3x large
  14: BASE_UNIT * 14, // 56px - 3.5x large
  16: BASE_UNIT * 16, // 64px - 4x large
  20: BASE_UNIT * 20, // 80px - 5x large
  24: BASE_UNIT * 24, // 96px - 6x large
  32: BASE_UNIT * 32, // 128px - 8x large
  40: BASE_UNIT * 40, // 160px - 10x large
  48: BASE_UNIT * 48, // 192px - 12x large
  56: BASE_UNIT * 56, // 224px - 14x large
  64: BASE_UNIT * 64  // 256px - 16x large
} as const;

/**
 * Named Spacing Constants
 * Semantic spacing names for common use cases
 */
export const SPACING = {
  none: SPACING_SCALE[0],      // 0px
  xs: SPACING_SCALE[1],        // 4px  - Tiny gaps
  sm: SPACING_SCALE[2],        // 8px  - Small gaps, tight spacing
  md: SPACING_SCALE[4],        // 16px - Default spacing
  lg: SPACING_SCALE[6],        // 24px - Large spacing
  xl: SPACING_SCALE[8],        // 32px - Extra large spacing
  '2xl': SPACING_SCALE[12],    // 48px - Section spacing
  '3xl': SPACING_SCALE[16],    // 64px - Large section spacing
  '4xl': SPACING_SCALE[20],    // 80px - Hero section spacing
  '5xl': SPACING_SCALE[24]     // 96px - Major section spacing
} as const;

/**
 * Mobile Touch Target Dimensions
 * Minimum touch target sizes following iOS/Android guidelines
 */
export const TOUCH_TARGETS = {
  // Minimum touch target size (44px minimum for accessibility)
  minimum: 44,
  
  // Recommended touch target sizes
  small: 44,       // Minimum accessible size
  medium: 48,      // Comfortable touch target
  large: 56,       // Large touch target for primary actions
  xlarge: 64,      // Extra large for important actions
  
  // Spacing between touch targets
  spacing: {
    tight: SPACING.xs,    // 4px between targets
    normal: SPACING.sm,   // 8px between targets (recommended)
    loose: SPACING.md     // 16px between targets
  }
} as const;

/**
 * Layout Spacing Constants
 * Common spacing patterns for mobile layouts
 */
export const LAYOUT_SPACING = {
  // Screen edge padding
  screenPadding: {
    horizontal: SPACING.lg,    // 24px - Standard screen padding
    vertical: SPACING.lg,      // 24px - Standard vertical padding
    safe: SPACING.md          // 16px - Safe area padding
  },
  
  // Component spacing
  component: {
    tight: SPACING.xs,         // 4px - Tight component spacing
    normal: SPACING.sm,        // 8px - Normal component spacing
    loose: SPACING.md,         // 16px - Loose component spacing
    section: SPACING.lg        // 24px - Section spacing
  },
  
  // List item spacing
  list: {
    itemPadding: SPACING.md,   // 16px - Individual list item padding
    itemSpacing: SPACING.xs,   // 4px - Between list items
    sectionSpacing: SPACING.lg // 24px - Between list sections
  },
  
  // Card spacing
  card: {
    padding: SPACING.md,       // 16px - Interior card padding
    margin: SPACING.sm,        // 8px - Between cards
    contentSpacing: SPACING.sm // 8px - Between card content elements
  },
  
  // Form spacing
  form: {
    fieldSpacing: SPACING.md,  // 16px - Between form fields
    groupSpacing: SPACING.lg,  // 24px - Between form groups
    buttonSpacing: SPACING.xl, // 32px - Above action buttons
    labelSpacing: SPACING.xs   // 4px - Between label and input
  }
} as const;

/**
 * Portuguese Cultural Layout Patterns
 * Spacing optimized for Portuguese-speaking community content
 */
export const PORTUGUESE_SPACING = {
  // Heritage card spacing (for country selection, cultural content)
  heritageCard: {
    padding: SPACING.lg,           // 24px - Generous padding for flags/content
    margin: SPACING.md,            // 16px - Space between heritage cards
    iconSpacing: SPACING.sm,       // 8px - Between flag and text
    textSpacing: SPACING.xs        // 4px - Between name lines
  },
  
  // Cultural event spacing
  event: {
    cardPadding: SPACING.md,       // 16px - Event card padding
    cardMargin: SPACING.sm,        // 8px - Between event cards
    metadataSpacing: SPACING.xs,   // 4px - Between event metadata
    actionSpacing: SPACING.md      // 16px - Space above action buttons
  },
  
  // Business listing spacing
  business: {
    listPadding: SPACING.md,       // 16px - Business list item padding
    imageSpacing: SPACING.sm,      // 8px - Between image and content
    ratingSpacing: SPACING.xs,     // 4px - Between rating elements
    contactSpacing: SPACING.md     // 16px - Contact section spacing
  },
  
  // Community matching spacing
  match: {
    cardPadding: SPACING.lg,       // 24px - Match card padding
    avatarSpacing: SPACING.md,     // 16px - Between avatar and content
    badgeSpacing: SPACING.xs,      // 4px - Between heritage badges
    actionSpacing: SPACING.xl      // 32px - Between match actions
  }
} as const;

/**
 * Modal and Overlay Spacing
 * Spacing for modals, sheets, and overlay components
 */
export const MODAL_SPACING = {
  // Bottom sheet spacing
  bottomSheet: {
    contentPadding: SPACING.lg,    // 24px - Interior padding
    headerPadding: SPACING.md,     // 16px - Header padding
    handleMargin: SPACING.sm,      // 8px - Above drag handle
    closeButtonMargin: SPACING.md  // 16px - Close button margin
  },
  
  // Modal dialog spacing
  modal: {
    padding: SPACING.lg,           // 24px - Modal interior padding
    buttonSpacing: SPACING.md,     // 16px - Between modal buttons
    contentSpacing: SPACING.md,    // 16px - Between content sections
    titleSpacing: SPACING.sm       // 8px - Below modal title
  },
  
  // Action sheet spacing
  actionSheet: {
    itemPadding: SPACING.md,       // 16px - Action item padding
    itemSpacing: SPACING_SCALE[1], // 4px - Between action items
    sectionSpacing: SPACING.sm,    // 8px - Between sections
    cancelSpacing: SPACING.md      // 16px - Above cancel button
  }
} as const;

/**
 * Navigation Spacing
 * Spacing for navigation elements and tab bars
 */
export const NAVIGATION_SPACING = {
  // Tab bar spacing
  tabBar: {
    height: 65,                    // Tab bar height
    padding: SPACING.xs,           // 4px - Interior padding
    iconMargin: SPACING_SCALE[1],  // 4px - Below icon
    labelMargin: SPACING_SCALE[1]  // 4px - Above label
  },
  
  // Header spacing
  header: {
    height: 56,                    // Standard header height
    padding: SPACING.md,           // 16px - Horizontal padding
    titleMargin: SPACING.sm,       // 8px - Around title
    buttonPadding: SPACING.sm      // 8px - Header button padding
  },
  
  // Drawer navigation spacing
  drawer: {
    itemPadding: SPACING.md,       // 16px - Drawer item padding
    itemMargin: SPACING.xs,        // 4px - Between items
    sectionSpacing: SPACING.lg,    // 24px - Between sections
    headerPadding: SPACING.lg      // 24px - Drawer header padding
  }
} as const;

/**
 * Animation and Gesture Spacing
 * Spacing considerations for animations and gestures
 */
export const GESTURE_SPACING = {
  // Swipe gesture areas
  swipe: {
    minDistance: 60,               // 60px - Minimum swipe distance
    deadZone: SPACING.md,          // 16px - Dead zone around gestures
    triggerDistance: 80            // 80px - Distance to trigger action
  },
  
  // Drag and drop spacing
  drag: {
    snapDistance: 20,              // 20px - Snap to target distance
    previewOffset: SPACING.md,     // 16px - Drag preview offset
    dropZonePadding: SPACING.lg    // 24px - Drop zone padding
  }
} as const;

/**
 * Responsive Spacing Adjustments
 * Spacing adjustments for different screen sizes
 */
export const RESPONSIVE_SPACING = {
  // Small screens (< 375px width)
  small: {
    screenPadding: SPACING.md,     // 16px - Reduced screen padding
    cardPadding: SPACING.sm,       // 8px - Reduced card padding
    componentSpacing: SPACING.xs   // 4px - Tighter component spacing
  },
  
  // Medium screens (375px - 414px width)
  medium: {
    screenPadding: SPACING.lg,     // 24px - Standard screen padding
    cardPadding: SPACING.md,       // 16px - Standard card padding
    componentSpacing: SPACING.sm   // 8px - Standard component spacing
  },
  
  // Large screens (> 414px width)
  large: {
    screenPadding: SPACING.xl,     // 32px - Generous screen padding
    cardPadding: SPACING.lg,       // 24px - Generous card padding
    componentSpacing: SPACING.md   // 16px - Comfortable component spacing
  }
} as const;

// Export consolidated spacing system
export const SPACING_SYSTEM = {
  scale: SPACING_SCALE,
  spacing: SPACING,
  touchTargets: TOUCH_TARGETS,
  layout: LAYOUT_SPACING,
  portuguese: PORTUGUESE_SPACING,
  modal: MODAL_SPACING,
  navigation: NAVIGATION_SPACING,
  gesture: GESTURE_SPACING,
  responsive: RESPONSIVE_SPACING,
  baseUnit: BASE_UNIT
} as const;

export default SPACING_SYSTEM;