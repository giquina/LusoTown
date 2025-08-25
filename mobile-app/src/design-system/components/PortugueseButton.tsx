// 🇵🇹 LusoTown Mobile - Portuguese Cultural Button Component
// Touch-friendly button with Portuguese heritage styling

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PORTUGUESE_THEME } from '../tokens';
import { TOUCH_TARGETS } from '../tokens/spacing';

export type PortugueseButtonVariant = 'primary' | 'secondary' | 'accent' | 'cultural' | 'heritage' | 'outline' | 'text';
export type PortugueseButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type PortugueseButtonIconPosition = 'left' | 'right';

export interface PortugueseButtonProps {
  /** Button text content */
  title: string;
  
  /** Button variant style */
  variant?: PortugueseButtonVariant;
  
  /** Button size */
  size?: PortugueseButtonSize;
  
  /** Optional icon name from Ionicons */
  icon?: keyof typeof Ionicons.glyphMap;
  
  /** Icon position relative to text */
  iconPosition?: PortugueseButtonIconPosition;
  
  /** Loading state */
  loading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Full width button */
  fullWidth?: boolean;
  
  /** Portuguese cultural context */
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'traditional' | 'modern' | 'festive';
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom text style overrides */
  textStyle?: TextStyle;
  
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Portuguese Button Component
 * 
 * A culturally-aware button component optimized for Portuguese-speaking community app.
 * Features Portuguese heritage colors, proper touch targets, and cultural context support.
 * 
 * @example
 * ```tsx
 * <PortugueseButton
 *   title="Participar no Evento"
 *   variant="primary"
 *   size="large"
 *   icon="calendar"
 *   culturalContext="portugal"
 *   onPress={() => joinEvent()}
 * />
 * ```
 */
export function PortugueseButton({
  title,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  culturalContext,
  style,
  textStyle,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID
}: PortugueseButtonProps) {
  
  // Get button styles based on variant and cultural context
  const buttonStyles = getButtonStyles(variant, size, culturalContext, disabled, fullWidth);
  const textStyles = getTextStyles(variant, size, culturalContext, disabled);
  const iconSize = getIconSize(size);
  const iconColor = getIconColor(variant, disabled);
  
  // Render icon if provided
  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={iconColor}
          style={[
            styles.icon,
            iconPosition === 'right' && styles.iconRight
          ]}
        />
      );
    }
    
    if (icon) {
      return (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={[
            styles.icon,
            iconPosition === 'right' && styles.iconRight
          ]}
        />
      );
    }
    
    return null;
  };
  
  // Render button content
  const renderContent = () => {
    const iconElement = renderIcon();
    const textElement = (
      <Text
        style={[textStyles, textStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    );
    
    if (iconPosition === 'right') {
      return (
        <>
          {textElement}
          {iconElement}
        </>
      );
    }
    
    return (
      <>
        {iconElement}
        {textElement}
      </>
    );
  };
  
  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      activeOpacity={disabled ? 1 : 0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}
      testID={testID}
    >
      <View style={styles.content}>
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
}

// Helper functions for styling
function getButtonStyles(
  variant: PortugueseButtonVariant,
  size: PortugueseButtonSize,
  culturalContext?: string,
  disabled?: boolean,
  fullWidth?: boolean
): ViewStyle {
  const baseStyles: ViewStyle = {
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...PORTUGUESE_THEME.shadows.small,
  };
  
  // Size-specific styles
  const sizeStyles = getSizeStyles(size);
  
  // Variant-specific styles
  const variantStyles = getVariantStyles(variant, culturalContext, disabled);
  
  // Full width style
  const widthStyle: ViewStyle = fullWidth ? { width: '100%' } : {};
  
  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
    ...widthStyle
  };
}

function getSizeStyles(size: PortugueseButtonSize): ViewStyle {
  switch (size) {
    case 'small':
      return {
        paddingHorizontal: PORTUGUESE_THEME.spacing.md,
        paddingVertical: PORTUGUESE_THEME.spacing.sm,
        minHeight: TOUCH_TARGETS.small,
      };
    case 'medium':
      return {
        paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
        paddingVertical: PORTUGUESE_THEME.spacing.md,
        minHeight: TOUCH_TARGETS.medium,
      };
    case 'large':
      return {
        paddingHorizontal: PORTUGUESE_THEME.spacing.xl,
        paddingVertical: PORTUGUESE_THEME.spacing.lg,
        minHeight: TOUCH_TARGETS.large,
      };
    case 'xlarge':
      return {
        paddingHorizontal: PORTUGUESE_THEME.spacing.xl,
        paddingVertical: PORTUGUESE_THEME.spacing.xl,
        minHeight: TOUCH_TARGETS.xlarge,
      };
    default:
      return getSizeStyles('medium');
  }
}

function getVariantStyles(
  variant: PortugueseButtonVariant,
  culturalContext?: string,
  disabled?: boolean
): ViewStyle {
  if (disabled) {
    return {
      backgroundColor: PORTUGUESE_THEME.colors.border,
      borderColor: PORTUGUESE_THEME.colors.border,
      borderWidth: 1,
    };
  }
  
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.primary,
      };
    case 'secondary':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.secondary,
      };
    case 'accent':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.accent,
      };
    case 'cultural':
      return getCulturalVariantStyles(culturalContext);
    case 'heritage':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.primary,
        ...PORTUGUESE_THEME.shadows.heritage,
        borderRadius: PORTUGUESE_THEME.borderRadius.heritage,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: PORTUGUESE_THEME.colors.primary,
        borderWidth: 2,
      };
    case 'text':
      return {
        backgroundColor: 'transparent',
      };
    default:
      return getVariantStyles('primary', culturalContext, disabled);
  }
}

function getCulturalVariantStyles(culturalContext?: string): ViewStyle {
  switch (culturalContext) {
    case 'portugal':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.primary, // Portuguese red
      };
    case 'brazil':
      return {
        backgroundColor: '#009B3A', // Brazilian green
      };
    case 'cape-verde':
      return {
        backgroundColor: '#003893', // Cape Verdean blue
      };
    case 'angola':
      return {
        backgroundColor: '#CE1126', // Angolan red
      };
    case 'traditional':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.textSecondary,
        borderRadius: PORTUGUESE_THEME.borderRadius.small,
      };
    case 'modern':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.accent,
        borderRadius: PORTUGUESE_THEME.borderRadius.large,
      };
    case 'festive':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.accent,
        ...PORTUGUESE_THEME.shadows.heritage,
      };
    default:
      return {
        backgroundColor: PORTUGUESE_THEME.colors.primary,
      };
  }
}

function getTextStyles(
  variant: PortugueseButtonVariant,
  size: PortugueseButtonSize,
  culturalContext?: string,
  disabled?: boolean
): TextStyle {
  const baseStyles: TextStyle = {
    fontWeight: '600',
    textAlign: 'center',
  };
  
  // Size-specific text styles
  const sizeTextStyles = getTextSizeStyles(size);
  
  // Color based on variant
  const colorStyle: TextStyle = { color: getTextColor(variant, disabled) };
  
  return {
    ...baseStyles,
    ...sizeTextStyles,
    ...colorStyle
  };
}

function getTextSizeStyles(size: PortugueseButtonSize): TextStyle {
  switch (size) {
    case 'small':
      return PORTUGUESE_THEME.typography.labelMedium;
    case 'medium':
      return PORTUGUESE_THEME.typography.labelLarge;
    case 'large':
      return {
        ...PORTUGUESE_THEME.typography.labelLarge,
        fontSize: 18,
      };
    case 'xlarge':
      return {
        ...PORTUGUESE_THEME.typography.labelLarge,
        fontSize: 20,
      };
    default:
      return getTextSizeStyles('medium');
  }
}

function getTextColor(variant: PortugueseButtonVariant, disabled?: boolean): string {
  if (disabled) {
    return PORTUGUESE_THEME.colors.textSecondary;
  }
  
  switch (variant) {
    case 'outline':
    case 'text':
      return PORTUGUESE_THEME.colors.primary;
    case 'accent':
      return PORTUGUESE_THEME.colors.text; // Dark text on gold
    default:
      return '#FFFFFF'; // White text on colored backgrounds
  }
}

function getIconSize(size: PortugueseButtonSize): number {
  switch (size) {
    case 'small':
      return 16;
    case 'medium':
      return 20;
    case 'large':
      return 24;
    case 'xlarge':
      return 28;
    default:
      return 20;
  }
}

function getIconColor(variant: PortugueseButtonVariant, disabled?: boolean): string {
  return getTextColor(variant, disabled);
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: PORTUGUESE_THEME.spacing.xs,
  },
  iconRight: {
    marginRight: 0,
    marginLeft: PORTUGUESE_THEME.spacing.xs,
  },
});

export default PortugueseButton;