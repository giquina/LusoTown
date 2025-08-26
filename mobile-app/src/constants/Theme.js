import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { Colors } from './Styles';
import { MOBILE_UX_CONFIG } from '../config';

// Portuguese Cultural Theme Configuration
const fontConfig = {
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
};

// Portuguese Flag Color Theme
export const paperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    // Primary - Portuguese Red
    primary: Colors.primary,
    primaryContainer: Colors.primaryLight,
    onPrimary: Colors.surface,
    onPrimaryContainer: Colors.primaryDark,
    
    // Secondary - Portuguese Green  
    secondary: Colors.secondary,
    secondaryContainer: Colors.secondaryLight,
    onSecondary: Colors.surface,
    onSecondaryContainer: Colors.secondaryDark,
    
    // Tertiary - Portuguese Gold
    tertiary: Colors.accent,
    tertiaryContainer: Colors.accentLight,
    onTertiary: Colors.text,
    onTertiaryContainer: Colors.accentDark,
    
    // Surface colors
    surface: Colors.surface,
    surfaceVariant: Colors.background,
    onSurface: Colors.text,
    onSurfaceVariant: Colors.textSecondary,
    
    // Background
    background: Colors.background,
    onBackground: Colors.text,
    
    // Other semantic colors
    error: Colors.error,
    onError: Colors.surface,
    errorContainer: '#FFEBEE',
    onErrorContainer: Colors.error,
    
    success: Colors.success,
    successContainer: Colors.secondaryLight,
    
    warning: Colors.warning,
    warningContainer: Colors.accentLight,
    
    // Outline and borders
    outline: Colors.border,
    outlineVariant: Colors.border,
    
    // Inverse colors for high contrast
    inverseSurface: Colors.text,
    inverseOnSurface: Colors.surface,
    inversePrimary: Colors.primaryLight,
    
    // Portuguese Cultural Accent
    azulejo: Colors.azulejo,
    azulejoContainer: Colors.azulejoLight,
    onAzulejo: Colors.surface,
    
    // Premium Portuguese Gold
    premium: Colors.premium,
    premiumContainer: Colors.premiumLight,
    onPremium: Colors.surface,
  },
  roundness: 12, // Portuguese architectural influence
};

export default paperTheme;