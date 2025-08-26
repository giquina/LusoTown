/**
 * Portuguese Cultural Mobile Design System Hook
 * 
 * Comprehensive hook providing mobile-first design utilities, 
 * Portuguese cultural theming, and responsive design patterns
 * optimized for the Portuguese-speaking community.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { PORTUGUESE_MOBILE_DESIGN_TOKENS, PORTUGUESE_CULTURAL_PATTERNS } from '@/config/portuguese-mobile-design-tokens';

// Mobile Device Detection
interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: 'mobile-small' | 'mobile-standard' | 'tablet-portrait' | 'desktop-small' | 'desktop-large';
  orientation: 'portrait' | 'landscape';
  touchCapable: boolean;
  safeAreaInsets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

// Responsive Breakpoint
interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}

// Portuguese Cultural Theme
interface PortugueseCulturalTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    heritage: {
      portugal: string;
      brazil: string;
      palop: string;
    };
    azulejo: {
      light: string;
      medium: string;
      deep: string;
    };
  };
  patterns: {
    azulejo: string;
    nautical: string;
    cultural: string;
  };
  spacing: typeof PORTUGUESE_MOBILE_DESIGN_TOKENS.spacing;
  typography: typeof PORTUGUESE_MOBILE_DESIGN_TOKENS.typography;
  shadows: typeof PORTUGUESE_MOBILE_DESIGN_TOKENS.shadows;
}

// Mobile Design Utilities
interface MobileDesignUtils {
  // Responsive Classes
  responsive: <T>(values: ResponsiveValue<T>) => T | undefined;
  
  // Touch Target Utilities
  touchTarget: (size?: 'minimum' | 'recommended' | 'premium' | 'hero') => string;
  
  // Portuguese Text Utilities
  textContainer: (maxLines?: number, culturalContext?: boolean) => string;
  
  // Cultural Pattern Utilities
  culturalPattern: (pattern: 'azulejo' | 'nautical' | 'geometric') => string;
  
  // Portuguese Heritage Colors
  heritageColor: (country: 'portugal' | 'brazil' | 'palop', shade?: number) => string;
  
  // Mobile Animation Utilities
  mobileAnimation: (type: 'slide' | 'fade' | 'scale' | 'cultural') => object;
  
  // Safe Area Utilities
  safeArea: (position: 'top' | 'bottom' | 'left' | 'right' | 'all') => string;
  
  // Portuguese Cultural Context
  culturalContext: (content: string, heritage?: string) => {
    length: number;
    complexity: 'simple' | 'moderate' | 'complex';
    recommendations: string[];
  };
}

export function usePortugueseMobileDesign(): {
  device: DeviceInfo;
  theme: PortugueseCulturalTheme;
  utils: MobileDesignUtils;
  isReady: boolean;
} {
  const { language } = useLanguage();
  const { colors: heritageColors } = useHeritage();
  
  // Device Detection State
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenSize: 'desktop-small',
    orientation: 'landscape',
    touchCapable: false,
    safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  
  const [isReady, setIsReady] = useState(false);

  // Device Detection Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      let screenSize: DeviceInfo['screenSize'] = 'desktop-large';
      let isMobile = false;
      let isTablet = false;
      let isDesktop = true;

      if (width < 414) {
        screenSize = 'mobile-small';
        isMobile = true;
        isDesktop = false;
      } else if (width < 768) {
        screenSize = 'mobile-standard';
        isMobile = true;
        isDesktop = false;
      } else if (width < 1024) {
        screenSize = 'tablet-portrait';
        isTablet = true;
        isDesktop = false;
      } else if (width < 1280) {
        screenSize = 'desktop-small';
      } else {
        screenSize = 'desktop-large';
      }

      // Safe Area Insets (for iOS devices)
      const safeAreaInsets = {
        top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'),
        right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0'),
        bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0'),
        left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0')
      };

      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        screenSize,
        orientation,
        touchCapable,
        safeAreaInsets
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);
    
    setIsReady(true);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  // Portuguese Cultural Theme
  const theme: PortugueseCulturalTheme = useMemo(() => ({
    colors: {
      primary: heritageColors.primary || PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.portuguese.red.value,
      secondary: heritageColors.secondary || PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.portuguese.green.value,
      accent: heritageColors.accent || PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.portuguese.gold.value,
      heritage: {
        portugal: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.portuguese.red.value,
        brazil: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.palop.brazil.value,
        palop: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.palop.angola.value
      },
      azulejo: {
        light: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.azulejo.light.value,
        medium: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.azulejo.medium.value,
        deep: PORTUGUESE_MOBILE_DESIGN_TOKENS.colors.azulejo.deep.value
      }
    },
    patterns: {
      azulejo: PORTUGUESE_CULTURAL_PATTERNS.azulejo.geometric.pattern,
      nautical: PORTUGUESE_CULTURAL_PATTERNS.nautical.compass.pattern,
      cultural: PORTUGUESE_CULTURAL_PATTERNS.azulejo.floral.pattern
    },
    spacing: PORTUGUESE_MOBILE_DESIGN_TOKENS.spacing,
    typography: PORTUGUESE_MOBILE_DESIGN_TOKENS.typography,
    shadows: PORTUGUESE_MOBILE_DESIGN_TOKENS.shadows
  }), [heritageColors]);

  // Mobile Design Utilities
  const utils: MobileDesignUtils = useMemo(() => ({
    // Responsive Utility
    responsive: <T>(values: ResponsiveValue<T>): T | undefined => {
      if (device.isMobile && values.mobile) return values.mobile;
      if (device.isTablet && values.tablet) return values.tablet;
      if (device.isDesktop && values.desktop) return values.desktop;
      return values.mobile || values.tablet || values.desktop;
    },

    // Touch Target Utility
    touchTarget: (size: 'minimum' | 'recommended' | 'premium' | 'hero' = 'recommended'): string => {
      const targetSizes = PORTUGUESE_MOBILE_DESIGN_TOKENS.touchTargets[size];
      return `min-h-[${targetSizes.size}] min-w-[${targetSizes.size}] p-[${targetSizes.spacing}]`;
    },

    // Text Container Utility
    textContainer: (maxLines?: number, culturalContext = true): string => {
      const baseClasses = 'overflow-hidden break-words';
      const portugueseClasses = culturalContext ? 'hyphens-auto' : '';
      const lineClampClass = maxLines ? `line-clamp-${maxLines}` : '';
      
      return `${baseClasses} ${portugueseClasses} ${lineClampClass}`.trim();
    },

    // Cultural Pattern Utility
    culturalPattern: (pattern: 'azulejo' | 'nautical' | 'geometric'): string => {
      const patterns = {
        azulejo: theme.patterns.azulejo,
        nautical: theme.patterns.nautical,
        geometric: theme.patterns.cultural
      };
      
      return `background-image: url("${patterns[pattern]}")`;
    },

    // Heritage Color Utility
    heritageColor: (country: 'portugal' | 'brazil' | 'palop', shade = 500): string => {
      const colorMap = {
        portugal: '#DC143C',
        brazil: '#009639',
        palop: '#FF0000'
      };
      
      return colorMap[country];
    },

    // Mobile Animation Utility
    mobileAnimation: (type: 'slide' | 'fade' | 'scale' | 'cultural'): object => {
      const animations = {
        slide: {
          initial: { x: device.isMobile ? 100 : 50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: device.isMobile ? -100 : -50, opacity: 0 },
          transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        fade: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: device.isMobile ? 0.2 : 0.3 }
        },
        scale: {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 },
          transition: { type: "spring", stiffness: 400 }
        },
        cultural: {
          initial: { scale: 0.8, opacity: 0, rotate: -5 },
          animate: { scale: 1, opacity: 1, rotate: 0 },
          exit: { scale: 0.8, opacity: 0, rotate: 5 },
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: device.isMobile ? 0.4 : 0.6
          }
        }
      };
      
      return animations[type];
    },

    // Safe Area Utility
    safeArea: (position: 'top' | 'bottom' | 'left' | 'right' | 'all'): string => {
      const { safeAreaInsets } = device;
      
      const safeAreaClasses = {
        top: `pt-[env(safe-area-inset-top)] pt-[${safeAreaInsets.top}px]`,
        bottom: `pb-[env(safe-area-inset-bottom)] pb-[${safeAreaInsets.bottom}px]`,
        left: `pl-[env(safe-area-inset-left)] pl-[${safeAreaInsets.left}px]`,
        right: `pr-[env(safe-area-inset-right)] pr-[${safeAreaInsets.right}px]`,
        all: `p-[env(safe-area-inset-top)] p-[env(safe-area-inset-right)] p-[env(safe-area-inset-bottom)] p-[env(safe-area-inset-left)]`
      };
      
      return safeAreaClasses[position] || '';
    },

    // Cultural Context Analyzer
    culturalContext: (content: string, heritage = 'portugal'): {
      length: number;
      complexity: 'simple' | 'moderate' | 'complex';
      recommendations: string[];
    } => {
      const length = content.length;
      const wordCount = content.split(/\s+/).length;
      const sentences = content.split(/[.!?]+/).length;
      
      // Portuguese text tends to be 20-30% longer than English
      const adjustedLength = language === 'pt' ? length * 1.25 : length;
      
      let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
      const recommendations: string[] = [];
      
      if (wordCount > 50 || sentences > 5) {
        complexity = 'complex';
        recommendations.push(
          language === 'pt' 
            ? 'Considere dividir em parágrafos mais curtos'
            : 'Consider breaking into shorter paragraphs'
        );
      } else if (wordCount > 20 || sentences > 3) {
        complexity = 'moderate';
      }
      
      if (adjustedLength > 200 && device.isMobile) {
        recommendations.push(
          language === 'pt'
            ? 'Texto pode ser muito longo para dispositivos móveis'
            : 'Text may be too long for mobile devices'
        );
      }
      
      if (heritage === 'portugal' && /[áàâãéèêíìîóòôõúùû]/i.test(content)) {
        recommendations.push(
          language === 'pt'
            ? 'Acentos portugueses detectados - verifique compatibilidade'
            : 'Portuguese accents detected - check compatibility'
        );
      }
      
      return {
        length: Math.round(adjustedLength),
        complexity,
        recommendations
      };
    }
  }), [device, theme, language]);

  return {
    device,
    theme,
    utils,
    isReady
  };
}

// Portuguese Mobile Design Hook for specific components
export function usePortugueseMobileComponent(componentName: string) {
  const { device, theme, utils } = usePortugueseMobileDesign();
  
  // Component-specific optimizations
  const componentOptimizations = useMemo(() => {
    const baseOptimizations = {
      touchTargets: utils.touchTarget(device.isMobile ? 'recommended' : 'minimum'),
      animations: utils.mobileAnimation(device.isMobile ? 'slide' : 'fade'),
      spacing: device.isMobile ? theme.spacing.md.value : theme.spacing.lg.value,
      typography: device.isMobile 
        ? theme.typography.scale.base.value 
        : theme.typography.scale.lg.value
    };

    // Component-specific overrides
    const componentSpecific = {
      'business-card': {
        ...baseOptimizations,
        imageHeight: device.isMobile ? '12rem' : '16rem',
        contentPadding: device.isMobile ? theme.spacing.md.value : theme.spacing.lg.value
      },
      'navigation': {
        ...baseOptimizations,
        height: device.isMobile ? '4rem' : '5rem',
        safeArea: utils.safeArea('bottom')
      },
      'header': {
        ...baseOptimizations,
        safeArea: utils.safeArea('top'),
        backdrop: device.isMobile ? 'backdrop-blur-xl' : 'backdrop-blur-lg'
      },
      'event-card': {
        ...baseOptimizations,
        culturalPattern: utils.culturalPattern('azulejo'),
        heritageAccent: theme.colors.heritage.portugal
      }
    };

    return componentSpecific[componentName as keyof typeof componentSpecific] || baseOptimizations;
  }, [componentName, device, theme, utils]);

  return {
    device,
    theme,
    utils,
    optimizations: componentOptimizations
  };
}

// Portuguese Cultural Animation Presets
export const PORTUGUESE_MOBILE_ANIMATIONS = {
  // Heritage Pride Animation
  heritagePride: {
    initial: { scale: 0.8, opacity: 0, rotateY: -15 },
    animate: { scale: 1, opacity: 1, rotateY: 0 },
    whileHover: { scale: 1.05, rotateY: 5 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },

  // Cultural Celebration
  culturalCelebration: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    whileHover: { y: -5, scale: 1.02 },
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 20,
      delay: Math.random() * 0.3 // Staggered animation
    }
  },

  // Azulejo Tile Effect
  azulejoTile: {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    whileHover: { rotate: 5, scale: 1.1 },
    transition: { 
      type: "spring", 
      stiffness: 200,
      damping: 15,
      duration: 0.8
    }
  },

  // Portuguese Navigation
  portugueseNavigation: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

export default usePortugueseMobileDesign;