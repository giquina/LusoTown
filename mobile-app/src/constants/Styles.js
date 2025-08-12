import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🎨 Design System - Think of this as your app's DNA
export const Colors = {
  // Primary brand colors
  primary: '#FF6B6B',        // Warm coral - friendly and inviting
  primaryDark: '#FF5252',    // Deeper coral for interactions
  primaryLight: '#FFB3BA',   // Light coral for backgrounds
  
  // Secondary colors
  secondary: '#4ECDC4',      // Calming teal - trustworthy
  secondaryDark: '#26A69A',  
  secondaryLight: '#B2DFDB',
  
  // Neutral colors
  background: '#FAFAFA',     // Clean white background
  surface: '#FFFFFF',        // Card backgrounds
  text: '#2C2C2C',          // Main text color
  textSecondary: '#757575',  // Secondary text
  textLight: '#BDBDBD',     // Placeholder text
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  
  // Special colors
  border: '#E0E0E0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// 📏 Spacing System - Consistent spacing like building blocks
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
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

// 📱 Device Dimensions
export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isLargeDevice: width >= 414,
};

export default {
  Colors,
  Spacing,
  Typography,
  CommonStyles,
  Layout,
};
