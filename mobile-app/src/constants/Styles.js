import { StyleSheet, Dimensions } from 'react-native';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG } from '../config';

const { width, height } = Dimensions.get('window');

// Portuguese Flag Colors - Imported from centralized configuration with flag color definitions
export const Colors = {
  ...PORTUGUESE_COLORS,
  // Portuguese flag red - passion and courage
  portugueseRed: PORTUGUESE_COLORS.primary || '#FF0000',
  // Portuguese flag green - hope and nature  
  portugueseGreen: PORTUGUESE_COLORS.secondary || '#00A859', 
  portugueseGold: PORTUGUESE_COLORS.accent || '#FFD700',
  // Flag colors - aliases for cultural authenticity
  flagRed: PORTUGUESE_COLORS.primary || '#FF0000',
  flagGreen: PORTUGUESE_COLORS.secondary || '#00A859',
  flagGold: PORTUGUESE_COLORS.accent || '#FFD700',
};

// Spacing System - Using mobile UX configuration
export const Spacing = {
  xs: 4,
  sm: 8,
  md: MOBILE_UX_CONFIG.comfortableSpacing,
  lg: MOBILE_UX_CONFIG.premiumSpacing,
  xl: 32,
  xxl: 48,
  // Touch targets
  minTouch: MOBILE_UX_CONFIG.minTouchTarget,
};

// 📝 Typography - Beautiful, readable text hierarchy
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    color: Colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    color: Colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.text,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.textLight,
  },
};

// 🧩 Common Styles - Reusable style building blocks
export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonText: {
    ...Typography.body,
    color: Colors.surface,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    backgroundColor: Colors.surface,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

// Device Dimensions - Using mobile UX breakpoints
export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < MOBILE_UX_CONFIG.breakpoints.small,
  isMediumDevice: width >= MOBILE_UX_CONFIG.breakpoints.small && width < MOBILE_UX_CONFIG.breakpoints.medium,
  isLargeDevice: width >= MOBILE_UX_CONFIG.breakpoints.medium,
  isTablet: width >= MOBILE_UX_CONFIG.breakpoints.tablet,
  breakpoints: MOBILE_UX_CONFIG.breakpoints,
};

export default {
  Colors,
  Spacing,
  Typography,
  CommonStyles,
  Layout,
};
