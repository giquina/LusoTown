"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

// Elite Mobile Experience Optimizer
interface MobileExperienceOptimizerProps {
  children: React.ReactNode;
  enablePremiumAnimations?: boolean;
  enableLuxuryEffects?: boolean;
  enablePortugueseTheming?: boolean;
  className?: string;
}

export function MobileExperienceOptimizer({
  children,
  enablePremiumAnimations = true,
  enableLuxuryEffects = true,
  enablePortugueseTheming = true,
  className = ''
}: MobileExperienceOptimizerProps) {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    orientation: 'portrait' as 'portrait' | 'landscape',
    viewportHeight: 0,
    viewportWidth: 0,
    safeAreaTop: 0,
    safeAreaBottom: 0
  });

  const [performanceMode, setPerformanceMode] = useState<'auto' | 'performance' | 'quality'>('auto');
  const { language } = useLanguage();
  const { colors } = useHeritage();
  const { scrollY } = useScroll();

  // Initialize device detection and optimization
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setDeviceInfo({
        isMobile,
        isTablet,
        isTouch,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        safeAreaTop: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) || 0,
        safeAreaBottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0
      });
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  // Performance monitoring and optimization
  useEffect(() => {
    if (!deviceInfo.isMobile) return;

    const checkPerformance = () => {
      // Check device memory if available
      const memory = (navigator as any).deviceMemory;
      const connection = (navigator as any).connection;
      
      let mode: 'auto' | 'performance' | 'quality' = 'auto';
      
      if (memory && memory < 4) {
        mode = 'performance';
      } else if (connection && connection.effectiveType && connection.effectiveType.includes('2g')) {
        mode = 'performance';
      } else if (memory && memory >= 8) {
        mode = 'quality';
      }
      
      setPerformanceMode(mode);
    };

    checkPerformance();
  }, [deviceInfo.isMobile]);

  // Portuguese heritage color optimization
  const optimizedColors = enablePortugueseTheming ? {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    heritage: 'linear-gradient(135deg, #C5282F 0%, #FFD700 50%, #00A859 100%)',
    luxury: 'linear-gradient(135deg, #1a1a1a 0%, #C5282F 50%, #000000 100%)'
  } : {};

  return (
    <motion.div
      className={`mobile-experience-optimizer ${className}`}
      style={{
        ...optimizedColors,
        '--device-viewport-height': `${deviceInfo.viewportHeight}px`,
        '--device-viewport-width': `${deviceInfo.viewportWidth}px`,
        '--safe-area-top': `${deviceInfo.safeAreaTop}px`,
        '--safe-area-bottom': `${deviceInfo.safeAreaBottom}px`,
      } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: performanceMode === 'performance' ? 0.3 : 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      {/* Performance indicator removed for cleaner UI */}

      {/* Optimized content wrapper */}
      <motion.div
        className="min-h-screen"
        style={{
          paddingTop: `max(env(safe-area-inset-top), ${deviceInfo.safeAreaTop}px)`,
          paddingBottom: `max(env(safe-area-inset-bottom), ${deviceInfo.safeAreaBottom}px)`,
        }}
        animate={enablePremiumAnimations ? {
          backgroundImage: enableLuxuryEffects 
            ? 'radial-gradient(circle at 50% 50%, rgba(197,40,47,0.05) 0%, transparent 70%)'
            : 'none'
        } : undefined}
      >
        {children}
      </motion.div>

      {/* Premium background effects for mobile */}
      {enableLuxuryEffects && deviceInfo.isMobile && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: performanceMode !== 'performance' ? 0.3 : 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-green-50/30" />
          {enablePortugueseTheming && (
            <div 
              className="absolute top-0 left-0 right-0 h-px opacity-20"
              style={{
                background: 'linear-gradient(90deg, transparent, #C5282F 25%, #FFD700 50%, #00A859 75%, transparent)'
              }}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Premium Mobile Layout Components
interface LuxuryMobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'standard' | 'premium' | 'elite';
  enableGestures?: boolean;
  className?: string;
}

export function LuxuryMobileLayout({
  children,
  header,
  navigation,
  sidebar,
  footer,
  variant = 'premium',
  enableGestures = true,
  className = ''
}: LuxuryMobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  const layoutVariants = {
    standard: 'bg-white',
    premium: 'bg-gradient-to-br from-white via-red-50/10 to-green-50/10',
    elite: 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'
  };

  return (
    <div className={`luxury-mobile-layout ${layoutVariants[variant]} ${className}`}>
      {/* Header */}
      {header && (
        <motion.header
          className="sticky top-0 z-40"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {header}
        </motion.header>
      )}

      {/* Main Content Area */}
      <motion.main
        className="flex-1 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Sidebar */}
        <AnimatePresence>
          {sidebar && sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-40 overflow-y-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {sidebar}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.main>

      {/* Navigation */}
      {navigation && (
        <motion.div
          className="z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 30 }}
        >
          {navigation}
        </motion.div>
      )}

      {/* Footer */}
      {footer && (
        <footer className="z-10">
          {footer}
        </footer>
      )}
    </div>
  );
}

// Elite Mobile Gesture Handler
interface MobileGestureHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onLongPress?: () => void;
  className?: string;
  disabled?: boolean;
}

export function MobileGestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onLongPress,
  className = '',
  disabled = false
}: MobileGestureHandlerProps) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0, time: 0 });
  const longPressTimer = useRef<NodeJS.Timeout>();

  const minSwipeDistance = 50;
  const maxSwipeTime = 300;
  const longPressDelay = 500;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    const touch = e.touches[0];
    setTouchStart({ 
      x: touch.clientX, 
      y: touch.clientY, 
      time: Date.now() 
    });

    // Start long press timer
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
        // Haptic feedback simulation
        if ('vibrate' in navigator) {
          navigator.vibrate(100);
        }
      }, longPressDelay);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return;

    // Clear long press timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    const touch = e.changedTouches[0];
    const endData = { 
      x: touch.clientX, 
      y: touch.clientY, 
      time: Date.now() 
    };
    setTouchEnd(endData);

    const deltaX = endData.x - touchStart.x;
    const deltaY = endData.y - touchStart.y;
    const deltaTime = endData.time - touchStart.time;

    if (deltaTime > maxSwipeTime) return;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Determine swipe direction
    if (absX > absY && absX > minSwipeDistance) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    } else if (absY > minSwipeDistance) {
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown();
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  return (
    <div
      className={`touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  );
}

// Premium Mobile Performance Monitor
export function useMobilePerformance() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    connection: 'unknown',
    battery: 100,
    performance: 'good' as 'good' | 'medium' | 'poor'
  });

  useEffect(() => {
    const updateMetrics = () => {
      // FPS monitoring
      let fps = 60;
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;
          
          setMetrics(prev => ({ ...prev, fps }));
        }
        
        requestAnimationFrame(measureFPS);
      };

      requestAnimationFrame(measureFPS);

      // Memory monitoring
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({ 
          ...prev, 
          memory: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }));
      }

      // Connection monitoring
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setMetrics(prev => ({ 
          ...prev, 
          connection: connection.effectiveType || 'unknown'
        }));
      }

      // Battery monitoring
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setMetrics(prev => ({ 
            ...prev, 
            battery: Math.round(battery.level * 100)
          }));
        });
      }
    };

    updateMetrics();
  }, []);

  return metrics;
}

export default {
  MobileExperienceOptimizer,
  LuxuryMobileLayout,
  MobileGestureHandler,
  useMobilePerformance
};