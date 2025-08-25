// 🇵🇹 LusoTown Mobile - Heritage Card Component
// Cultural country selection card with Portuguese styling

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PORTUGUESE_THEME, COMPONENT_THEMES } from '../tokens';
import { HeritageCountry } from '../../types';
import { HERITAGE_COUNTRIES } from '../../config';

export interface HeritageCardProps {
  /** Heritage country key */
  heritage: HeritageCountry;
  
  /** Whether this heritage is selected */
  selected?: boolean;
  
  /** Whether selection is allowed */
  selectable?: boolean;
  
  /** Card size variant */
  size?: 'small' | 'medium' | 'large';
  
  /** Display style */
  layout?: 'vertical' | 'horizontal';
  
  /** Show country description */
  showDescription?: boolean;
  
  /** Current language for display */
  language?: 'en' | 'pt';
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Selection handler */
  onPress?: (heritage: HeritageCountry, event: GestureResponderEvent) => void;
  
  /** Long press handler for additional options */
  onLongPress?: (heritage: HeritageCountry, event: GestureResponderEvent) => void;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Heritage Card Component
 * 
 * A culturally-aware card component for displaying and selecting Portuguese heritage countries.
 * Features authentic flag representation, bilingual text, and proper Portuguese cultural styling.
 * 
 * @example
 * ```tsx
 * <HeritageCard
 *   heritage="portugal"
 *   selected={selectedHeritage.includes('portugal')}
 *   size="large"
 *   showDescription={true}
 *   language="pt"
 *   onPress={(heritage) => toggleHeritageSelection(heritage)}
 * />
 * ```
 */
export function HeritageCard({
  heritage,
  selected = false,
  selectable = true,
  size = 'medium',
  layout = 'vertical',
  showDescription = false,
  language = 'en',
  style,
  onPress,
  onLongPress,
  testID
}: HeritageCardProps) {
  
  const heritageData = HERITAGE_COUNTRIES[heritage];
  const theme = COMPONENT_THEMES.heritage;
  
  if (!heritageData) {
    return null;
  }
  
  const cardStyles = getCardStyles(size, layout, selected, selectable);
  const textStyles = getTextStyles(size, selected);
  const flagSize = getFlagSize(size);
  
  const handlePress = (event: GestureResponderEvent) => {
    if (selectable && onPress) {
      onPress(heritage, event);
    }
  };
  
  const handleLongPress = (event: GestureResponderEvent) => {
    if (onLongPress) {
      onLongPress(heritage, event);
    }
  };
  
  const renderFlag = () => (
    <View style={[styles.flagContainer, { width: flagSize, height: flagSize }]}>
      <Text style={[styles.flag, { fontSize: flagSize * 0.6 }]}>
        {heritageData.flag}
      </Text>
    </View>
  );
  
  const renderContent = () => {
    const primaryName = heritageData.name[language];
    const secondaryName = language === 'en' 
      ? heritageData.name.pt 
      : heritageData.name.en;
    
    return (
      <View style={styles.textContainer}>
        <Text style={[textStyles.primary, { textAlign: layout === 'vertical' ? 'center' : 'left' }]}>
          {primaryName}
        </Text>
        
        {primaryName !== secondaryName && (
          <Text style={[textStyles.secondary, { textAlign: layout === 'vertical' ? 'center' : 'left' }]}>
            {secondaryName}
          </Text>
        )}
        
        {showDescription && (
          <Text style={[textStyles.description, { textAlign: layout === 'vertical' ? 'center' : 'left' }]}>
            {heritageData.description[language]}
          </Text>
        )}
      </View>
    );
  };
  
  const renderSelectionIndicator = () => {
    if (!selectable || !selected) return null;
    
    return (
      <View style={styles.selectionIndicator}>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={theme.colors.selectedBorder}
        />
      </View>
    );
  };
  
  const renderVerificationBadge = () => {
    // Show verification badge for official heritage countries
    const isOfficialHeritage = ['portugal', 'brazil', 'cape-verde', 'angola', 'mozambique'].includes(heritage);
    
    if (!isOfficialHeritage) return null;
    
    return (
      <View style={styles.verificationBadge}>
        <Ionicons
          name="shield-checkmark"
          size={16}
          color={PORTUGUESE_THEME.colors.success}
        />
      </View>
    );
  };
  
  return (
    <TouchableOpacity
      style={[cardStyles, style]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      disabled={!selectable}
      activeOpacity={selectable ? 0.7 : 1}
      accessibilityRole="button"
      accessibilityLabel={`${heritageData.name[language]} heritage ${selected ? 'selected' : 'unselected'}`}
      accessibilityState={{ selected, disabled: !selectable }}
      testID={testID}
    >
      {layout === 'vertical' ? (
        <View style={styles.verticalLayout}>
          <View style={styles.flagSection}>
            {renderFlag()}
            {renderVerificationBadge()}
          </View>
          {renderContent()}
          {renderSelectionIndicator()}
        </View>
      ) : (
        <View style={styles.horizontalLayout}>
          <View style={styles.flagSection}>
            {renderFlag()}
            {renderVerificationBadge()}
          </View>
          <View style={styles.contentSection}>
            {renderContent()}
          </View>
          {renderSelectionIndicator()}
        </View>
      )}
    </TouchableOpacity>
  );
}

// Helper functions for styling
function getCardStyles(
  size: 'small' | 'medium' | 'large',
  layout: 'vertical' | 'horizontal',
  selected: boolean,
  selectable: boolean
): ViewStyle {
  const theme = COMPONENT_THEMES.heritage;
  
  const baseStyles: ViewStyle = {
    backgroundColor: selected ? theme.colors.selectedBackground : theme.colors.cardBackground,
    borderRadius: theme.borderRadius,
    borderWidth: 2,
    borderColor: selected ? theme.colors.selectedBorder : PORTUGUESE_THEME.colors.border,
    position: 'relative',
    ...theme.shadows.default,
  };
  
  // Apply selected shadow if selected
  if (selected) {
    Object.assign(baseStyles, theme.shadows.selected);
  }
  
  // Size and layout specific styles
  const sizeStyles = getSizeStyles(size, layout);
  
  // Disabled styles
  if (!selectable) {
    baseStyles.opacity = 0.6;
  }
  
  return {
    ...baseStyles,
    ...sizeStyles
  };
}

function getSizeStyles(size: 'small' | 'medium' | 'large', layout: 'vertical' | 'horizontal'): ViewStyle {
  const theme = COMPONENT_THEMES.heritage;
  
  const basePadding = theme.spacing.padding;
  const baseMargin = theme.spacing.margin;
  
  switch (size) {
    case 'small':
      return {
        padding: basePadding * 0.75,
        margin: baseMargin * 0.5,
        minWidth: layout === 'horizontal' ? 200 : 120,
        minHeight: layout === 'vertical' ? 140 : 80,
      };
    case 'medium':
      return {
        padding: basePadding,
        margin: baseMargin,
        minWidth: layout === 'horizontal' ? 280 : 160,
        minHeight: layout === 'vertical' ? 180 : 100,
      };
    case 'large':
      return {
        padding: basePadding * 1.25,
        margin: baseMargin,
        minWidth: layout === 'horizontal' ? 320 : 200,
        minHeight: layout === 'vertical' ? 220 : 120,
      };
    default:
      return getSizeStyles('medium', layout);
  }
}

function getTextStyles(size: 'small' | 'medium' | 'large', selected: boolean) {
  const theme = COMPONENT_THEMES.heritage;
  const baseColor = selected ? theme.colors.selectedText : theme.colors.text;
  
  switch (size) {
    case 'small':
      return {
        primary: {
          ...PORTUGUESE_THEME.typography.labelMedium,
          color: baseColor,
          fontWeight: '600',
          marginBottom: 2,
        },
        secondary: {
          ...PORTUGUESE_THEME.typography.labelSmall,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginBottom: 4,
        },
        description: {
          ...PORTUGUESE_THEME.typography.caption,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginTop: 4,
          lineHeight: 16,
        },
      };
    case 'medium':
      return {
        primary: {
          ...PORTUGUESE_THEME.typography.labelLarge,
          color: baseColor,
          fontWeight: '600',
          marginBottom: 4,
        },
        secondary: {
          ...PORTUGUESE_THEME.typography.labelMedium,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginBottom: 6,
        },
        description: {
          ...PORTUGUESE_THEME.typography.bodySmall,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginTop: 6,
          lineHeight: 18,
        },
      };
    case 'large':
      return {
        primary: {
          ...PORTUGUESE_THEME.typography.headingSmall,
          color: baseColor,
          fontWeight: '600',
          marginBottom: 6,
        },
        secondary: {
          ...PORTUGUESE_THEME.typography.labelLarge,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginBottom: 8,
        },
        description: {
          ...PORTUGUESE_THEME.typography.bodyMedium,
          color: selected ? theme.colors.selectedText : PORTUGUESE_THEME.colors.textSecondary,
          marginTop: 8,
          lineHeight: 22,
        },
      };
    default:
      return getTextStyles('medium', selected);
  }
}

function getFlagSize(size: 'small' | 'medium' | 'large'): number {
  switch (size) {
    case 'small':
      return 40;
    case 'medium':
      return 56;
    case 'large':
      return 72;
    default:
      return 56;
  }
}

const styles = StyleSheet.create({
  verticalLayout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagSection: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderRadius: PORTUGUESE_THEME.borderRadius.small,
    borderWidth: 1,
    borderColor: PORTUGUESE_THEME.colors.border,
  },
  flag: {
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
  contentSection: {
    flex: 1,
    marginLeft: PORTUGUESE_THEME.spacing.md,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderRadius: 12,
    padding: 2,
    ...PORTUGUESE_THEME.shadows.small,
  },
  verificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderRadius: 10,
    padding: 2,
    ...PORTUGUESE_THEME.shadows.small,
  },
});

export default HeritageCard;