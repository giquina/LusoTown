// 🇵🇹 LusoTown Mobile - Portuguese Cultural Navigation Patterns
// Bottom tab, drawer, and gesture navigation patterns

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PORTUGUESE_THEME, NAVIGATION_SPACING } from '../tokens';

// Bottom Tab Navigation Component
export interface PortugueseTabBarProps {
  /** Current active tab */
  activeTab: string;
  
  /** Tab configuration */
  tabs: TabConfig[];
  
  /** Tab change handler */
  onTabChange: (tabKey: string) => void;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Show tab labels */
  showLabels?: boolean;
  
  /** Badge counts for tabs */
  badgeCounts?: Record<string, number>;
}

export interface TabConfig {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  label: string;
  labelPortuguese: string;
  culturalIcon?: string; // Emoji or cultural symbol
  accessibilityLabel?: string;
}

/**
 * Portuguese Tab Bar Component
 * 
 * A culturally-aware bottom tab navigation optimized for Portuguese-speaking users.
 * Features Portuguese cultural icons and bilingual labels.
 */
export function PortugueseTabBar({
  activeTab,
  tabs,
  onTabChange,
  style,
  showLabels = true,
  badgeCounts = {}
}: PortugueseTabBarProps) {
  
  const renderTab = (tab: TabConfig) => {
    const isActive = activeTab === tab.key;
    const badgeCount = badgeCounts[tab.key] || 0;
    const iconName = isActive ? tab.iconFocused : tab.icon;
    
    return (
      <TouchableOpacity
        key={tab.key}
        style={[styles.tabItem, isActive && styles.activeTabItem]}
        onPress={() => onTabChange(tab.key)}
        activeOpacity={0.7}
        accessibilityRole="tab"
        accessibilityLabel={tab.accessibilityLabel || tab.label}
        accessibilityState={{ selected: isActive }}
      >
        <View style={styles.tabIconContainer}>
          <Ionicons
            name={iconName}
            size={24}
            color={isActive ? PORTUGUESE_THEME.colors.primary : PORTUGUESE_THEME.colors.textSecondary}
          />
          
          {tab.culturalIcon && (
            <View style={styles.culturalIconOverlay}>
              <Text style={styles.culturalIcon}>{tab.culturalIcon}</Text>
            </View>
          )}
          
          {badgeCount > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {badgeCount > 99 ? '99+' : badgeCount}
              </Text>
            </View>
          )}
        </View>
        
        {showLabels && (
          <Text style={[
            styles.tabLabel,
            isActive && styles.activeTabLabel
          ]}>
            {tab.labelPortuguese}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.tabBar, style]}>
      <View style={styles.tabContainer}>
        {tabs.map(renderTab)}
      </View>
    </View>
  );
}

// Drawer Navigation Item Component
export interface DrawerItemProps {
  /** Item icon */
  icon: keyof typeof Ionicons.glyphMap;
  
  /** Item label */
  label: string;
  
  /** Portuguese label */
  labelPortuguese?: string;
  
  /** Whether item is active */
  active?: boolean;
  
  /** Cultural context */
  culturalIcon?: string;
  
  /** Badge count */
  badgeCount?: number;
  
  /** Item press handler */
  onPress: (event: GestureResponderEvent) => void;
  
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Portuguese Drawer Item Component
 * 
 * Navigation drawer item with Portuguese cultural context and bilingual labels.
 */
export function PortugueseDrawerItem({
  icon,
  label,
  labelPortuguese,
  active = false,
  culturalIcon,
  badgeCount,
  onPress,
  style
}: DrawerItemProps) {
  
  return (
    <TouchableOpacity
      style={[styles.drawerItem, active && styles.activeDrawerItem, style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
    >
      <View style={styles.drawerItemIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={active ? PORTUGUESE_THEME.colors.primary : PORTUGUESE_THEME.colors.textSecondary}
        />
        {culturalIcon && (
          <Text style={styles.drawerCulturalIcon}>{culturalIcon}</Text>
        )}
      </View>
      
      <View style={styles.drawerItemContent}>
        <Text style={[styles.drawerItemLabel, active && styles.activeDrawerItemLabel]}>
          {labelPortuguese || label}
        </Text>
        {labelPortuguese && labelPortuguese !== label && (
          <Text style={styles.drawerItemSubLabel}>{label}</Text>
        )}
      </View>
      
      {badgeCount && badgeCount > 0 && (
        <View style={styles.drawerBadge}>
          <Text style={styles.drawerBadgeText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Header Navigation Component
export interface PortugueseHeaderProps {
  /** Header title */
  title: string;
  
  /** Portuguese title */
  titlePortuguese?: string;
  
  /** Left button configuration */
  leftButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  
  /** Right button configuration */
  rightButton?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel?: string;
    badgeCount?: number;
  };
  
  /** Cultural context */
  culturalContext?: 'portugal' | 'brazil' | 'heritage' | 'premium';
  
  /** Custom style */
  style?: ViewStyle;
}

/**
 * Portuguese Header Component
 * 
 * Navigation header with Portuguese cultural theming and bilingual support.
 */
export function PortugueseHeader({
  title,
  titlePortuguese,
  leftButton,
  rightButton,
  culturalContext,
  style
}: PortugueseHeaderProps) {
  
  const headerStyles = getHeaderStyles(culturalContext);
  
  return (
    <View style={[styles.header, headerStyles, style]}>
      <View style={styles.headerLeft}>
        {leftButton && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={leftButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={leftButton.accessibilityLabel || 'Back'}
          >
            <Ionicons
              name={leftButton.icon}
              size={24}
              color={PORTUGUESE_THEME.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {titlePortuguese || title}
        </Text>
        {titlePortuguese && titlePortuguese !== title && (
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
      
      <View style={styles.headerRight}>
        {rightButton && (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={rightButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={rightButton.accessibilityLabel || 'Action'}
          >
            <Ionicons
              name={rightButton.icon}
              size={24}
              color={PORTUGUESE_THEME.colors.text}
            />
            {rightButton.badgeCount && rightButton.badgeCount > 0 && (
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>
                  {rightButton.badgeCount > 99 ? '99+' : rightButton.badgeCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Action Sheet Component
export interface ActionSheetItem {
  key: string;
  title: string;
  titlePortuguese?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  culturalIcon?: string;
  destructive?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export interface PortugueseActionSheetProps {
  /** Whether action sheet is visible */
  visible: boolean;
  
  /** Action sheet title */
  title?: string;
  
  /** Portuguese title */
  titlePortuguese?: string;
  
  /** Action items */
  items: ActionSheetItem[];
  
  /** Cancel action */
  onCancel: () => void;
  
  /** Cancel button text */
  cancelText?: string;
}

/**
 * Portuguese Action Sheet Component
 * 
 * Bottom action sheet with Portuguese cultural styling and bilingual support.
 */
export function PortugueseActionSheet({
  visible,
  title,
  titlePortuguese,
  items,
  onCancel,
  cancelText = 'Cancelar'
}: PortugueseActionSheetProps) {
  
  if (!visible) return null;
  
  const renderActionItem = (item: ActionSheetItem) => (
    <TouchableOpacity
      key={item.key}
      style={[
        styles.actionItem,
        item.destructive && styles.destructiveActionItem,
        item.disabled && styles.disabledActionItem
      ]}
      onPress={item.onPress}
      disabled={item.disabled}
      accessibilityRole="button"
      accessibilityLabel={item.titlePortuguese || item.title}
    >
      {(item.icon || item.culturalIcon) && (
        <View style={styles.actionItemIcon}>
          {item.icon && (
            <Ionicons
              name={item.icon}
              size={22}
              color={item.destructive 
                ? PORTUGUESE_THEME.colors.error 
                : item.disabled 
                ? PORTUGUESE_THEME.colors.textSecondary 
                : PORTUGUESE_THEME.colors.text
              }
            />
          )}
          {item.culturalIcon && (
            <Text style={styles.actionCulturalIcon}>{item.culturalIcon}</Text>
          )}
        </View>
      )}
      
      <Text style={[
        styles.actionItemText,
        item.destructive && styles.destructiveActionText,
        item.disabled && styles.disabledActionText
      ]}>
        {item.titlePortuguese || item.title}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.actionSheetOverlay}>
      <TouchableOpacity 
        style={styles.actionSheetBackdrop} 
        onPress={onCancel}
        activeOpacity={1}
      />
      
      <View style={styles.actionSheet}>
        {(title || titlePortuguese) && (
          <View style={styles.actionSheetHeader}>
            <Text style={styles.actionSheetTitle}>
              {titlePortuguese || title}
            </Text>
          </View>
        )}
        
        <View style={styles.actionItemsContainer}>
          {items.map(renderActionItem)}
        </View>
        
        <View style={styles.actionSheetCancel}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel={cancelText}
          >
            <Text style={styles.cancelButtonText}>{cancelText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Helper functions
function getHeaderStyles(culturalContext?: string): ViewStyle {
  switch (culturalContext) {
    case 'portugal':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.primary + '10',
        borderBottomColor: PORTUGUESE_THEME.colors.primary + '30',
      };
    case 'brazil':
      return {
        backgroundColor: '#009B3A' + '10',
        borderBottomColor: '#009B3A' + '30',
      };
    case 'heritage':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.accent + '10',
        borderBottomColor: PORTUGUESE_THEME.colors.accent + '30',
      };
    case 'premium':
      return {
        backgroundColor: PORTUGUESE_THEME.colors.accent + '20',
        borderBottomColor: PORTUGUESE_THEME.colors.accent,
      };
    default:
      return {};
  }
}

const styles = StyleSheet.create({
  // Tab Bar Styles
  tabBar: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: PORTUGUESE_THEME.colors.border,
    paddingBottom: NAVIGATION_SPACING.tabBar.padding,
    paddingTop: NAVIGATION_SPACING.tabBar.padding,
    ...PORTUGUESE_THEME.shadows.small,
  },
  tabContainer: {
    flexDirection: 'row',
    height: NAVIGATION_SPACING.tabBar.height,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  activeTabItem: {
    backgroundColor: PORTUGUESE_THEME.colors.primary + '10',
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    marginHorizontal: 4,
  },
  tabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  culturalIconOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  culturalIcon: {
    fontSize: 12,
  },
  tabBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: PORTUGUESE_THEME.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.surface,
    fontSize: 10,
    fontWeight: '600',
  },
  tabLabel: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginTop: NAVIGATION_SPACING.tabBar.labelMargin,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: PORTUGUESE_THEME.colors.primary,
    fontWeight: '600',
  },
  
  // Drawer Styles
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: NAVIGATION_SPACING.drawer.itemPadding,
    paddingVertical: NAVIGATION_SPACING.drawer.itemPadding,
    marginBottom: NAVIGATION_SPACING.drawer.itemMargin,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
  },
  activeDrawerItem: {
    backgroundColor: PORTUGUESE_THEME.colors.primary + '10',
  },
  drawerItemIcon: {
    width: 32,
    alignItems: 'center',
    position: 'relative',
  },
  drawerCulturalIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 10,
  },
  drawerItemContent: {
    flex: 1,
    marginLeft: PORTUGUESE_THEME.spacing.md,
  },
  drawerItemLabel: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    color: PORTUGUESE_THEME.colors.text,
  },
  activeDrawerItemLabel: {
    color: PORTUGUESE_THEME.colors.primary,
    fontWeight: '600',
  },
  drawerItemSubLabel: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginTop: 2,
  },
  drawerBadge: {
    backgroundColor: PORTUGUESE_THEME.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  drawerBadgeText: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.surface,
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: NAVIGATION_SPACING.header.height,
    paddingHorizontal: NAVIGATION_SPACING.header.padding,
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_THEME.colors.border,
    ...PORTUGUESE_THEME.shadows.small,
  },
  headerLeft: {
    width: 50,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: NAVIGATION_SPACING.header.titleMargin,
  },
  headerRight: {
    width: 50,
    alignItems: 'flex-end',
  },
  headerButton: {
    padding: NAVIGATION_SPACING.header.buttonPadding,
    position: 'relative',
  },
  headerTitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    color: PORTUGUESE_THEME.colors.text,
    fontWeight: '600',
  },
  headerSubtitle: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginTop: 2,
  },
  headerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: PORTUGUESE_THEME.colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  headerBadgeText: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.surface,
    fontSize: 9,
    fontWeight: '600',
  },
  
  // Action Sheet Styles
  actionSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  actionSheetBackdrop: {
    flex: 1,
  },
  actionSheet: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderTopLeftRadius: PORTUGUESE_THEME.borderRadius.large,
    borderTopRightRadius: PORTUGUESE_THEME.borderRadius.large,
    paddingBottom: PORTUGUESE_THEME.spacing.xl,
  },
  actionSheetHeader: {
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
    paddingVertical: PORTUGUESE_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_THEME.colors.border,
  },
  actionSheetTitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    color: PORTUGUESE_THEME.colors.text,
    textAlign: 'center',
  },
  actionItemsContainer: {
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
    paddingTop: PORTUGUESE_THEME.spacing.md,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: PORTUGUESE_THEME.spacing.md,
    paddingHorizontal: PORTUGUESE_THEME.spacing.sm,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
  },
  destructiveActionItem: {
    backgroundColor: PORTUGUESE_THEME.colors.error + '10',
  },
  disabledActionItem: {
    opacity: 0.5,
  },
  actionItemIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: PORTUGUESE_THEME.spacing.md,
  },
  actionCulturalIcon: {
    fontSize: 16,
    position: 'absolute',
    bottom: -2,
    right: 6,
  },
  actionItemText: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    color: PORTUGUESE_THEME.colors.text,
  },
  destructiveActionText: {
    color: PORTUGUESE_THEME.colors.error,
  },
  disabledActionText: {
    color: PORTUGUESE_THEME.colors.textSecondary,
  },
  actionSheetCancel: {
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
    paddingTop: PORTUGUESE_THEME.spacing.md,
    marginTop: PORTUGUESE_THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: PORTUGUESE_THEME.colors.border,
  },
  cancelButton: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderColor: PORTUGUESE_THEME.colors.border,
    borderWidth: 2,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    paddingVertical: PORTUGUESE_THEME.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...PORTUGUESE_THEME.typography.labelLarge,
    color: PORTUGUESE_THEME.colors.textSecondary,
    fontWeight: '600',
  },
});

export default {
  PortugueseTabBar,
  PortugueseDrawerItem,
  PortugueseHeader,
  PortugueseActionSheet,
};