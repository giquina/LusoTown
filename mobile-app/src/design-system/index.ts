// 🇵🇹 LusoTown Mobile - Portuguese Cultural Design System
// Complete design system export for Portuguese-speaking community mobile app

// Design Tokens
export * from './tokens';
export { DESIGN_TOKENS, PORTUGUESE_THEME, COMPONENT_THEMES, RESPONSIVE_THEMES, ACCESSIBILITY_THEME, DARK_MODE_THEME } from './tokens';

// Enhanced Portuguese Cultural Tokens
export { COLORS, CULTURAL_COLORS, PORTUGUESE_PRIMARY_COLORS } from './tokens/colors';
export { ICONOGRAPHY, ICON_SIZES, ICON_STROKES } from './tokens/iconography';
export { IMAGERY, IMAGE_QUALITY_STANDARDS, PORTUGUESE_PHOTOGRAPHY_STANDARDS } from './tokens/imagery';

// Cultural Authenticity System
export { CULTURAL_AUTHENTICITY, CULTURAL_VALUES, VALIDATION_FUNCTIONS } from './patterns/CulturalAuthenticity';

// Core Components
export { PortugueseButton } from './components/PortugueseButton';
export type { PortugueseButtonProps, PortugueseButtonVariant, PortugueseButtonSize } from './components/PortugueseButton';

export { HeritageCard } from './components/HeritageCard';
export type { HeritageCardProps } from './components/HeritageCard';

export { CulturalEventCard } from './components/CulturalEventCard';
export type { CulturalEventCardProps } from './components/CulturalEventCard';

// UI Patterns
export { OnboardingFlow } from './patterns/OnboardingFlow';
export type { OnboardingFlowProps, OnboardingStep } from './patterns/OnboardingFlow';

export { 
  PortugueseTabBar, 
  PortugueseDrawerItem, 
  PortugueseHeader, 
  PortugueseActionSheet 
} from './patterns/NavigationPatterns';
export type { 
  PortugueseTabBarProps, 
  TabConfig, 
  DrawerItemProps, 
  PortugueseHeaderProps, 
  PortugueseActionSheetProps, 
  ActionSheetItem 
} from './patterns/NavigationPatterns';

/**
 * LusoTown Portuguese Cultural Design System
 * 
 * A comprehensive design system specifically created for Portuguese-speaking community
 * mobile applications. This system includes:
 * 
 * ## Design Tokens
 * - **Colors**: Portuguese heritage colors (red, green, gold) with cultural context
 * - **Typography**: Optimized for Portuguese text with proper diacritical support
 * - **Spacing**: Touch-friendly spacing system following iOS/Android guidelines
 * - **Shadows**: Platform-specific elevation with Portuguese brand colors
 * - **Border Radius**: Consistent rounding system for mobile components
 * 
 * ## Core Components
 * - **PortugueseButton**: Touch-optimized button with cultural variants
 * - **HeritageCard**: Country selection card with authentic flag representation
 * - **CulturalEventCard**: Event display with Portuguese cultural context
 * 
 * ## UI Patterns
 * - **OnboardingFlow**: Complete Portuguese cultural onboarding experience
 * - **Navigation Patterns**: Tab bar, drawer, header with bilingual support
 * 
 * ## Cultural Guidelines
 * - Use "Portuguese-speaking community" terminology
 * - Support all Lusophone nations (Portugal, Brazil, Cape Verde, etc.)
 * - Maintain 44px+ touch targets for accessibility
 * - Include proper Portuguese diacritical mark support
 * - Follow Portuguese brand colors and cultural authenticity
 * 
 * @example Basic Usage
 * ```tsx
 * import { PortugueseButton, PORTUGUESE_THEME } from '@/design-system';
 * 
 * function MyComponent() {
 *   return (
 *     <PortugueseButton
 *       title="Participar"
 *       variant="primary"
 *       culturalContext="portugal"
 *       onPress={() => handleAction()}
 *     />
 *   );
 * }
 * ```
 * 
 * @example Advanced Theme Usage
 * ```tsx
 * import { DESIGN_TOKENS, COMPONENT_THEMES } from '@/design-system';
 * 
 * const customStyles = StyleSheet.create({
 *   container: {
 *     backgroundColor: DESIGN_TOKENS.colors.neutral.background.primary,
 *     padding: DESIGN_TOKENS.spacing.spacing.lg,
 *   },
 *   heritageCard: {
 *     ...COMPONENT_THEMES.heritage.shadows.selected,
 *     borderRadius: COMPONENT_THEMES.heritage.borderRadius,
 *   }
 * });
 * ```
 */

// Default export with all design system utilities
export default {
  tokens: {
    colors: COLORS,
    typography: TYPOGRAPHY,
    spacing: SPACING_SYSTEM,
    shadows: SHADOWS,
    borderRadius: BORDER_RADIUS_SYSTEM
  },
  themes: {
    portuguese: PORTUGUESE_THEME,
    components: COMPONENT_THEMES,
    responsive: RESPONSIVE_THEMES,
    accessibility: ACCESSIBILITY_THEME,
    darkMode: DARK_MODE_THEME
  },
  components: {
    PortugueseButton,
    HeritageCard,
    CulturalEventCard
  },
  patterns: {
    OnboardingFlow,
    PortugueseTabBar,
    PortugueseDrawerItem,
    PortugueseHeader,
    PortugueseActionSheet
  }
} as const;

/**
 * Cultural Design System Utilities
 * Helper functions and constants for Portuguese cultural context
 */
export const CULTURAL_UTILITIES = {
  /**
   * Get Portuguese heritage flag emoji
   */
  getHeritageFlag: (heritage: string): string => {
    const flags: Record<string, string> = {
      'portugal': '🇵🇹',
      'brazil': '🇧🇷',
      'cape-verde': '🇨🇻',
      'angola': '🇦🇴',
      'mozambique': '🇲🇿',
      'guinea-bissau': '🇬🇼',
      'east-timor': '🇹🇱',
      'sao-tome': '🇸🇹'
    };
    return flags[heritage] || '🇵🇹';
  },

  /**
   * Get cultural color for heritage country
   */
  getHeritage Color: (heritage: string): string => {
    const colors: Record<string, string> = {
      'portugal': PORTUGUESE_THEME.colors.primary,
      'brazil': '#009B3A',
      'cape-verde': '#003893',
      'angola': '#CE1126',
      'mozambique': '#00A859',
      'guinea-bissau': '#CE1126',
      'east-timor': '#DC143C',
      'sao-tome': '#12AD2B'
    };
    return colors[heritage] || PORTUGUESE_THEME.colors.primary;
  },

  /**
   * Format Portuguese currency
   */
  formatPortugueseCurrency: (amount: number, currency: string = 'GBP'): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  /**
   * Format Portuguese date
   */
  formatPortugueseDate: (date: Date, language: 'pt' | 'en' = 'pt'): string => {
    const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Validate Portuguese text input
   */
  validatePortugueseText: (text: string): boolean => {
    // Check for common Portuguese characters and diacritics
    const portugueseRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s\-'.,!?]+$/;
    return portugueseRegex.test(text);
  },

  /**
   * Get touch target size for accessibility
   */
  getTouchTargetSize: (size: 'small' | 'medium' | 'large' = 'medium'): number => {
    return SPACING_SYSTEM.touchTargets[size];
  },

  /**
   * Get responsive spacing based on screen size
   */
  getResponsiveSpacing: (
    element: 'screenPadding' | 'cardPadding' | 'componentSpacing', 
    screenSize: 'small' | 'medium' | 'large' = 'medium'
  ): number => {
    return RESPONSIVE_THEMES[screenSize].spacing[element];
  }
} as const;