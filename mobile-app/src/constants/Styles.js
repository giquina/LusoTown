import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// 🎨 LusoTown Design System - Unidos pela Língua (United by Language)
export const Colors = {
  // Primary brand colors - Azul Atlântico (Atlantic Blue)
  primary: '#1E40AF',        // Deep ocean blue - connects all Portuguese nations
  primaryDark: '#1E3A8A',    // Deep navy for interactions
  primaryLight: '#DBEAFE',   // Light sky blue for backgrounds
  
  // Secondary colors - Verde Esperança (Hope Green)
  secondary: '#059669',      // Vibrant emerald - lush landscapes
  secondaryDark: '#047857',  // Forest green
  secondaryLight: '#D1FAE5', // Soft mint
  
  // Accent colors - Dourado Sol (Golden Sun)
  accent: '#F59E0B',         // Warm amber - optimism and warmth
  accentDark: '#D97706',     // Deep gold
  accentLight: '#FEF3C7',    // Cream
  
  // Action color - Vermelho Paixão (Passion Red)
  action: '#DC2626',         // Bold red - passionate spirit
  actionDark: '#B91C1C',     // Deep crimson
  actionLight: '#FEE2E2',    // Soft pink
  
  // Premium color - Roxo Fado (Fado Purple)
  premium: '#7C3AED',        // Rich purple - soulful tradition
  premiumDark: '#5B21B6',    // Deep violet
  premiumLight: '#EDE9FE',   // Lavender
  
  // Warm accent - Coral Tropical (Tropical Coral)
  coral: '#F97316',          // Vibrant coral - tropical paradise
  coralDark: '#EA580C',      // Deep coral
  coralLight: '#FED7AA',     // Peach
  
  // Neutral colors
  background: '#FAFAFA',     // Clean white background
  surface: '#FFFFFF',        // Card backgrounds
  text: '#1F2937',          // Darker main text for better contrast
  textSecondary: '#6B7280',  // Secondary text
  textLight: '#9CA3AF',     // Placeholder text
  
  // Status colors (updated for better accessibility)
  success: '#059669',        // Using our secondary green
  warning: '#F59E0B',        // Using our accent amber
  error: '#DC2626',          // Using our action red
  
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
