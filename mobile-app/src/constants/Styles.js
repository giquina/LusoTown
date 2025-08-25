import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🇵🇹 Portuguese Flag Colors - Official Portuguese Heritage Design System
export const Colors = {
  // Portuguese Flag Primary Colors
  red: '#FF0000',           // Portuguese flag red - passion and courage
  redDark: '#CC0000',       // Deep red for interactions
  redLight: '#FFE6E6',      // Light red for backgrounds
  
  green: '#00A859',         // Portuguese flag green - hope and nature
  greenDark: '#008A47',     // Deep green for interactions
  greenLight: '#E6F7F1',    // Light green for backgrounds
  
  // Portuguese Cultural Colors
  gold: '#FFD700',          // Portuguese golden heritage
  goldDark: '#B8860B',      // Deep gold for premium features
  goldLight: '#FFFACD',     // Light gold for accents
  
  // Primary brand colors (Portuguese Red)
  primary: '#FF0000',       // Portuguese flag red
  primaryDark: '#CC0000',   
  primaryLight: '#FFE6E6',  
  
  // Secondary colors (Portuguese Green)
  secondary: '#00A859',     // Portuguese flag green
  secondaryDark: '#008A47', 
  secondaryLight: '#E6F7F1',
  
  // Accent colors (Portuguese Gold)
  accent: '#FFD700',        // Portuguese golden heritage
  accentDark: '#B8860B',    
  accentLight: '#FFFACD',   
  
  // Action color (Portuguese Red for consistency)
  action: '#FF0000',        // Portuguese passion
  actionDark: '#CC0000',    
  actionLight: '#FFE6E6',   
  
  // Premium color (Deep Portuguese Gold)
  premium: '#B8860B',       // Luxurious Portuguese gold
  premiumDark: '#996F00',   
  premiumLight: '#F4E99B',  
  
  // Cultural Heritage Colors
  azulejo: '#4A90E2',       // Portuguese tile blue
  azulejoDark: '#2E5B9A',   
  azulejoLight: '#E1F0FF',  
  
  // Neutral colors
  background: '#FAFAFA',    // Clean white background
  surface: '#FFFFFF',       // Card backgrounds  
  text: '#1F2937',         // Dark text for readability
  textSecondary: '#6B7280', // Secondary text
  textLight: '#9CA3AF',    // Placeholder text
  
  // Status colors using Portuguese heritage
  success: '#00A859',       // Portuguese green for success
  warning: '#FFD700',       // Portuguese gold for warnings  
  error: '#FF0000',         // Portuguese red for errors
  
  // Special colors
  border: '#E5E7EB',
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
