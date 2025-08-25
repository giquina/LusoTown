// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design Tokens: Border Radius
// Consistent border radius system for Portuguese cultural UI elements

/**
 * Border Radius Scale
 * Consistent border radius values for mobile components
 * Based on 4px increments for visual harmony
 */
export const BORDER_RADIUS_SCALE = {
  none: 0,      // No border radius - sharp corners
  xs: 2,        // Extra small - subtle rounding
  sm: 4,        // Small - gentle rounding
  md: 6,        // Medium - noticeable rounding
  lg: 8,        // Large - comfortable rounding
  xl: 12,       // Extra large - pronounced rounding
  '2xl': 16,    // 2x large - strong rounding
  '3xl': 24,    // 3x large - very round
  full: 9999    // Full - completely round (pills/circles)
} as const;

/**
 * Semantic Border Radius Values
 * Named border radius values for common use cases
 */
export const BORDER_RADIUS = {
  // Component-specific radius values
  button: BORDER_RADIUS_SCALE.lg,           // 8px - Comfortable button rounding
  buttonPill: BORDER_RADIUS_SCALE.full,     // Full - Pill-shaped buttons
  card: BORDER_RADIUS_SCALE.xl,             // 12px - Card container rounding
  input: BORDER_RADIUS_SCALE.md,            // 6px - Input field rounding
  badge: BORDER_RADIUS_SCALE.full,          // Full - Badge rounding
  avatar: BORDER_RADIUS_SCALE.full,         // Full - Circular avatars
  image: BORDER_RADIUS_SCALE.lg,            // 8px - Image container rounding
  modal: BORDER_RADIUS_SCALE['2xl'],        // 16px - Modal rounding
  sheet: BORDER_RADIUS_SCALE['2xl'],        // 16px - Bottom sheet rounding
  
  // Interaction element radius
  touchTarget: BORDER_RADIUS_SCALE.md,      // 6px - Touch target rounding
  
  // Special elements
  none: BORDER_RADIUS_SCALE.none,           // 0px - Sharp corners
  subtle: BORDER_RADIUS_SCALE.xs,           // 2px - Very subtle rounding
  default: BORDER_RADIUS_SCALE.md           // 6px - Default rounding
} as const;

/**
 * Portuguese Cultural Border Radius
 * Border radius values optimized for Portuguese cultural elements
 */
export const PORTUGUESE_BORDER_RADIUS = {
  // Heritage selection cards - slightly more rounded for friendliness
  heritageCard: BORDER_RADIUS_SCALE.xl,     // 12px - Heritage country cards
  
  // Flag containers - subtle rounding to respect flag imagery
  flagContainer: BORDER_RADIUS_SCALE.sm,    // 4px - Flag image containers
  
  // Cultural event cards - welcoming rounded corners
  eventCard: BORDER_RADIUS_SCALE.lg,        // 8px - Event listing cards
  
  // Business listing cards - professional yet approachable
  businessCard: BORDER_RADIUS_SCALE.md,     // 6px - Business directory cards
  
  // Match profile cards - friendly and approachable
  matchCard: BORDER_RADIUS_SCALE.xl,        // 12px - Match profile cards
  
  // Cultural badges - fully rounded for distinctiveness
  culturalBadge: BORDER_RADIUS_SCALE.full,  // Full - Heritage badges
  
  // Traditional elements - more conservative rounding
  traditional: BORDER_RADIUS_SCALE.sm,      // 4px - Traditional/formal elements
  
  // Modern elements - contemporary rounding
  modern: BORDER_RADIUS_SCALE.lg,           // 8px - Modern UI elements
  
  // Festive elements - playful rounding for celebrations
  festive: BORDER_RADIUS_SCALE['2xl']       // 16px - Celebration/festival elements
} as const;

/**
 * Component-Specific Border Radius
 * Detailed radius configurations for specific components
 */
export const COMPONENT_BORDER_RADIUS = {
  // Button variants
  button: {
    primary: BORDER_RADIUS.button,          // 8px - Primary action buttons
    secondary: BORDER_RADIUS.button,        // 8px - Secondary buttons
    text: BORDER_RADIUS.subtle,             // 2px - Text buttons
    pill: BORDER_RADIUS.buttonPill,         // Full - Pill-shaped buttons
    fab: BORDER_RADIUS.full,                // Full - Floating action button
    icon: BORDER_RADIUS.md                  // 6px - Icon buttons
  },

  // Card variants
  card: {
    default: BORDER_RADIUS.card,            // 12px - Standard cards
    compact: BORDER_RADIUS.lg,              // 8px - Compact cards
    large: BORDER_RADIUS['2xl'],            // 16px - Large feature cards
    minimal: BORDER_RADIUS.sm               // 4px - Minimal cards
  },

  // Input variants
  input: {
    text: BORDER_RADIUS.input,              // 6px - Text inputs
    search: BORDER_RADIUS.buttonPill,       // Full - Search inputs
    select: BORDER_RADIUS.input,            // 6px - Select dropdowns
    textarea: BORDER_RADIUS.lg              // 8px - Text areas
  },

  // Modal variants
  modal: {
    dialog: BORDER_RADIUS.modal,            // 16px - Modal dialogs
    sheet: BORDER_RADIUS.sheet,             // 16px - Bottom sheets
    fullscreen: BORDER_RADIUS.none,         // 0px - Fullscreen modals
    alert: BORDER_RADIUS.xl                 // 12px - Alert dialogs
  },

  // Navigation elements
  navigation: {
    tabItem: BORDER_RADIUS.lg,              // 8px - Tab bar items
    tabIndicator: BORDER_RADIUS.sm,         // 4px - Active tab indicator
    headerButton: BORDER_RADIUS.md,         // 6px - Header buttons
    drawerItem: BORDER_RADIUS.lg            // 8px - Drawer menu items
  },

  // List elements
  list: {
    item: BORDER_RADIUS.lg,                 // 8px - List items
    section: BORDER_RADIUS.md,              // 6px - List sections
    separator: BORDER_RADIUS.none           // 0px - List separators
  }
} as const;

/**
 * Portuguese Component Border Radius
 * Border radius for Portuguese-specific components
 */
export const PORTUGUESE_COMPONENT_RADIUS = {
  // Onboarding components
  onboarding: {
    welcomeCard: BORDER_RADIUS_SCALE['3xl'],      // 24px - Welcome cards
    progressIndicator: BORDER_RADIUS.full,       // Full - Progress dots
    continueButton: BORDER_RADIUS.button         // 8px - Continue buttons
  },

  // Heritage selection
  heritage: {
    countryCard: PORTUGUESE_BORDER_RADIUS.heritageCard,    // 12px
    flagImage: PORTUGUESE_BORDER_RADIUS.flagContainer,     // 4px
    selectionBadge: BORDER_RADIUS.full,                    // Full
    multiSelectToggle: BORDER_RADIUS.lg                    // 8px
  },

  // Cultural events
  events: {
    featuredCard: BORDER_RADIUS_SCALE['2xl'],             // 16px - Featured events
    standardCard: PORTUGUESE_BORDER_RADIUS.eventCard,     // 8px - Standard events
    categoryBadge: BORDER_RADIUS.badge,                   // Full - Category badges
    dateChip: BORDER_RADIUS.buttonPill,                   // Full - Date chips
    priceTag: BORDER_RADIUS.md                            // 6px - Price tags
  },

  // Business directory
  business: {
    listingCard: PORTUGUESE_BORDER_RADIUS.businessCard,   // 6px
    categoryIcon: BORDER_RADIUS.lg,                       // 8px
    ratingBadge: BORDER_RADIUS.full,                      // Full
    verificationBadge: BORDER_RADIUS.badge,               // Full
    contactButton: BORDER_RADIUS.button                   // 8px
  },

  // Matching system
  matches: {
    profileCard: PORTUGUESE_BORDER_RADIUS.matchCard,      // 12px
    compatibilityBadge: BORDER_RADIUS.badge,              // Full
    heritageFlag: PORTUGUESE_BORDER_RADIUS.flagContainer, // 4px
    actionButton: BORDER_RADIUS.buttonPill,               // Full
    interestTag: BORDER_RADIUS.badge                      // Full
  },

  // Cultural elements
  cultural: {
    azulejoPattern: BORDER_RADIUS.sm,                     // 4px - Tile patterns
    traditionalCard: PORTUGUESE_BORDER_RADIUS.traditional, // 4px
    modernCard: PORTUGUESE_BORDER_RADIUS.modern,          // 8px
    festiveCard: PORTUGUESE_BORDER_RADIUS.festive,        // 16px
    heritageBadge: PORTUGUESE_BORDER_RADIUS.culturalBadge // Full
  }
} as const;

/**
 * Responsive Border Radius
 * Border radius adjustments for different screen sizes
 */
export const RESPONSIVE_BORDER_RADIUS = {
  // Small screens (< 375px)
  small: {
    card: BORDER_RADIUS.lg,                 // 8px - Smaller cards
    button: BORDER_RADIUS.md,               // 6px - Smaller buttons
    modal: BORDER_RADIUS.xl                 // 12px - Smaller modals
  },

  // Medium screens (375px - 414px)
  medium: {
    card: BORDER_RADIUS.xl,                 // 12px - Standard cards
    button: BORDER_RADIUS.lg,               // 8px - Standard buttons
    modal: BORDER_RADIUS['2xl']             // 16px - Standard modals
  },

  // Large screens (> 414px)
  large: {
    card: BORDER_RADIUS['2xl'],             // 16px - Larger cards
    button: BORDER_RADIUS.xl,               // 12px - Larger buttons
    modal: BORDER_RADIUS['3xl']             // 24px - Larger modals
  }
} as const;

/**
 * Border Radius Combinations
 * Pre-configured combinations for complex components
 */
export const RADIUS_COMBINATIONS = {
  // Card with different corner radius
  cardWithHeader: {
    top: BORDER_RADIUS.xl,                  // 12px - Rounded top
    bottom: BORDER_RADIUS.none,             // 0px - Square bottom
    topLeft: BORDER_RADIUS.xl,              // 12px
    topRight: BORDER_RADIUS.xl,             // 12px
    bottomLeft: BORDER_RADIUS.none,         // 0px
    bottomRight: BORDER_RADIUS.none         // 0px
  },

  // Modal with rounded top only
  bottomSheet: {
    top: BORDER_RADIUS['2xl'],              // 16px - Rounded top
    bottom: BORDER_RADIUS.none,             // 0px - Square bottom
    topLeft: BORDER_RADIUS['2xl'],          // 16px
    topRight: BORDER_RADIUS['2xl'],         // 16px
    bottomLeft: BORDER_RADIUS.none,         // 0px
    bottomRight: BORDER_RADIUS.none         // 0px
  },

  // Tab bar with top rounding
  tabBar: {
    top: BORDER_RADIUS.lg,                  // 8px - Rounded top
    bottom: BORDER_RADIUS.none,             // 0px - Square bottom
    topLeft: BORDER_RADIUS.lg,              // 8px
    topRight: BORDER_RADIUS.lg,             // 8px
    bottomLeft: BORDER_RADIUS.none,         // 0px
    bottomRight: BORDER_RADIUS.none         // 0px
  }
} as const;

/**
 * Border Radius Utilities
 * Helper functions and utilities for working with border radius
 */
export const RADIUS_UTILITIES = {
  // Get radius value by name
  getRadius: (name: keyof typeof BORDER_RADIUS) => BORDER_RADIUS[name],

  // Get Portuguese cultural radius
  getPortugueseRadius: (element: keyof typeof PORTUGUESE_BORDER_RADIUS) => 
    PORTUGUESE_BORDER_RADIUS[element],

  // Get component-specific radius
  getComponentRadius: (component: keyof typeof COMPONENT_BORDER_RADIUS, variant: string) => {
    const componentRadius = COMPONENT_BORDER_RADIUS[component];
    return componentRadius && typeof componentRadius === 'object' 
      ? (componentRadius as any)[variant] || BORDER_RADIUS.default
      : BORDER_RADIUS.default;
  },

  // Create radius style object for React Native
  createRadiusStyle: (radius: number) => ({
    borderRadius: radius
  }),

  // Create radius style with specific corners
  createCornerRadiusStyle: (
    topLeft: number, 
    topRight: number, 
    bottomLeft: number, 
    bottomRight: number
  ) => ({
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomLeftRadius: bottomLeft,
    borderBottomRightRadius: bottomRight
  }),

  // Get responsive radius based on screen size
  getResponsiveRadius: (element: string, screenSize: 'small' | 'medium' | 'large') => {
    const responsive = RESPONSIVE_BORDER_RADIUS[screenSize];
    return (responsive as any)[element] || BORDER_RADIUS.default;
  }
} as const;

// Export consolidated border radius system
export const BORDER_RADIUS_SYSTEM = {
  scale: BORDER_RADIUS_SCALE,
  radius: BORDER_RADIUS,
  portuguese: PORTUGUESE_BORDER_RADIUS,
  components: COMPONENT_BORDER_RADIUS,
  portugueseComponents: PORTUGUESE_COMPONENT_RADIUS,
  responsive: RESPONSIVE_BORDER_RADIUS,
  combinations: RADIUS_COMBINATIONS,
  utilities: RADIUS_UTILITIES
} as const;

export default BORDER_RADIUS_SYSTEM;