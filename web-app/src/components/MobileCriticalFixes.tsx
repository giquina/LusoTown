"use client";

/**
 * Critical Mobile Fixes for LusoTown Portuguese Community Platform
 * 
 * This component addresses all critical mobile UX issues identified in the
 * comprehensive mobile experience review and implements Portuguese-specific optimizations.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

interface MobileFixProps {
  children: React.ReactNode;
  enablePortugueseFixes?: boolean;
  enableTouchOptimizations?: boolean;
  enablePerformanceMode?: boolean;
  debugMode?: boolean;
}

export function MobileCriticalFixes({
  children,
  enablePortugueseFixes = true,
  enableTouchOptimizations = true,
  enablePerformanceMode = true,
  debugMode = false
}: MobileFixProps) {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTouch: false,
    viewport: { width: 0, height: 0 },
    pixelRatio: 1,
    networkSpeed: 'unknown' as 'slow' | 'fast' | 'unknown'
  });

  const [fixes, setFixes] = useState({
    touchTargetsApplied: 0,
    portugueseTextOptimized: 0,
    performanceEnhanced: 0,
    accessibilityFixed: 0
  });

  const { language } = useLanguage();
  const { colors } = useHeritage();

  // Critical Fix 1: Portuguese Text Overflow Prevention
  const applyPortugueseTextFixes = useCallback(() => {
    if (!enablePortugueseFixes) return;

    const textElements = document.querySelectorAll('p, span, button, label, h1, h2, h3, h4, h5, h6');
    let fixedElements = 0;

    textElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        const hasPortugueseText = element.textContent?.includes('ão') || 
                                 element.textContent?.includes('ç') || 
                                 element.textContent?.includes('ã') ||
                                 element.textContent?.includes('õ');

        if (hasPortugueseText || language === 'pt') {
          // Apply Portuguese text optimizations
          element.style.wordBreak = 'break-word';
          element.style.hyphens = 'auto';
          element.style.overflowWrap = 'break-word';
          element.style.lineHeight = '1.5';
          
          // Extra spacing for longer Portuguese words
          if (element.tagName === 'BUTTON') {
            element.style.minHeight = '48px';
            element.style.padding = '12px 16px';
          }

          fixedElements++;
        }
      }
    });

    setFixes(prev => ({ ...prev, portugueseTextOptimized: fixedElements }));
  }, [enablePortugueseFixes, language]);

  // Critical Fix 2: Touch Target Size Enforcement
  const applyTouchTargetFixes = useCallback(() => {
    if (!enableTouchOptimizations || !deviceInfo.isTouch) return;

    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [onclick]');
    let fixedElements = 0;

    interactiveElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect();
        
        // Enforce minimum 44px touch targets
        if (rect.width < 44 || rect.height < 44) {
          element.style.minWidth = '44px';
          element.style.minHeight = '44px';
          element.style.display = 'inline-flex';
          element.style.alignItems = 'center';
          element.style.justifyContent = 'center';
          element.style.padding = element.style.padding || '8px 12px';
          fixedElements++;
        }

        // Add touch-friendly spacing
        const siblings = Array.from(element.parentElement?.children || []);
        const index = siblings.indexOf(element);
        if (index > 0) {
          const prevSibling = siblings[index - 1] as HTMLElement;
          const prevRect = prevSibling.getBoundingClientRect();
          const distance = Math.abs(rect.left - prevRect.right);
          
          if (distance < 8) {
            element.style.marginLeft = '8px';
          }
        }
      }
    });

    setFixes(prev => ({ ...prev, touchTargetsApplied: fixedElements }));
  }, [enableTouchOptimizations, deviceInfo.isTouch]);

  // Critical Fix 3: Mobile Performance Optimization
  const applyPerformanceFixes = useCallback(() => {
    if (!enablePerformanceMode) return;

    let optimizations = 0;

    // Lazy load images that aren't already lazy loaded
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        optimizations++;
      }
    });

    // Optimize animations for slower devices
    if (deviceInfo.networkSpeed === 'slow') {
      const animatedElements = document.querySelectorAll('[class*="animate-"], [style*="animation"]');
      animatedElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.animationDuration = '0.2s'; // Faster animations
          element.style.transitionDuration = '0.2s';
          optimizations++;
        }
      });
    }

    // Add GPU acceleration to frequently interacted elements
    const frequentElements = document.querySelectorAll('button, .card, [role="button"]');
    frequentElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform';
        optimizations++;
      }
    });

    setFixes(prev => ({ ...prev, performanceEnhanced: optimizations }));
  }, [enablePerformanceMode, deviceInfo.networkSpeed]);

  // Critical Fix 4: Accessibility Enhancements
  const applyAccessibilityFixes = useCallback(() => {
    let fixes = 0;

    // Add missing alt text to images
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.alt = language === 'pt' ? 'Imagem da comunidade portuguesa' : 'Portuguese community image';
        fixes++;
      }
    });

    // Add lang attributes to Portuguese content
    if (language === 'pt') {
      document.documentElement.setAttribute('lang', 'pt-PT');
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, button, label');
      textElements.forEach((element) => {
        if (element.textContent && !element.getAttribute('lang')) {
          element.setAttribute('lang', 'pt-PT');
          fixes++;
        }
      });
    }

    // Improve focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        if (!element.style.outline) {
          element.style.outline = 'none';
          element.style.boxShadow = 'none';
          element.addEventListener('focus', () => {
            element.style.boxShadow = `0 0 0 3px ${colors.primary}40`;
          });
          element.addEventListener('blur', () => {
            element.style.boxShadow = 'none';
          });
          fixes++;
        }
      }
    });

    setFixes(prev => ({ ...prev, accessibilityFixed: fixes }));
  }, [language, colors.primary]);

  // Device detection and initialization
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Detect network speed
      const connection = (navigator as any).connection;
      let networkSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      if (connection) {
        const effectiveType = connection.effectiveType;
        networkSpeed = effectiveType.includes('2g') || effectiveType === 'slow-2g' ? 'slow' : 'fast';
      }

      setDeviceInfo({
        isMobile,
        isTouch,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        pixelRatio: window.devicePixelRatio || 1,
        networkSpeed
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

  // Apply all fixes when component mounts and device info changes
  useEffect(() => {
    if (deviceInfo.viewport.width > 0) {
      // Apply fixes in order of priority
      applyPortugueseTextFixes();
      applyTouchTargetFixes();
      applyPerformanceFixes();
      applyAccessibilityFixes();
    }
  }, [deviceInfo, applyPortugueseTextFixes, applyTouchTargetFixes, applyPerformanceFixes, applyAccessibilityFixes]);

  // Add critical CSS variables for Portuguese community mobile experience
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--portuguese-red', '#C5282F');
    root.style.setProperty('--portuguese-green', '#00A859');
    root.style.setProperty('--portuguese-gold', '#FFD700');
    root.style.setProperty('--touch-target-min', '44px');
    root.style.setProperty('--touch-spacing-min', '8px');
    root.style.setProperty('--portuguese-text-line-height', '1.5');
  }, []);

  return (
    <div className="mobile-critical-fixes">
      {/* Debug Information */}
      {debugMode && deviceInfo.isMobile && (
        <motion.div
          className="fixed top-4 right-4 z-[9999] bg-black/90 text-white text-xs p-3 rounded-lg font-mono"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <div>📱 Mobile Fixes Applied:</div>
          <div>Portuguese Text: {fixes.portugueseTextOptimized}</div>
          <div>Touch Targets: {fixes.touchTargetsApplied}</div>
          <div>Performance: {fixes.performanceEnhanced}</div>
          <div>Accessibility: {fixes.accessibilityFixed}</div>
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div>Viewport: {deviceInfo.viewport.width}x{deviceInfo.viewport.height}</div>
            <div>Network: {deviceInfo.networkSpeed}</div>
            <div>Touch: {deviceInfo.isTouch ? 'Yes' : 'No'}</div>
          </div>
        </motion.div>
      )}

      {/* Critical Viewport Meta Fix */}
      {deviceInfo.isMobile && (
        <style jsx global>{`
          /* Critical mobile fixes for Portuguese community */
          @media (max-width: 768px) {
            /* Prevent horizontal scrolling */
            body {
              overflow-x: hidden;
              -webkit-text-size-adjust: 100%;
            }

            /* Portuguese text optimization */
            * {
              word-break: break-word;
              hyphens: auto;
            }

            /* Touch target enforcement */
            button, a[href], input, select, textarea, [role="button"] {
              min-height: var(--touch-target-min, 44px);
              min-width: var(--touch-target-min, 44px);
              margin: var(--touch-spacing-min, 8px) 0;
            }

            /* Portuguese cultural colors */
            .heritage-accent {
              background: linear-gradient(135deg, var(--portuguese-red), var(--portuguese-green));
            }

            /* Mobile performance optimizations */
            * {
              transform: translateZ(0);
              -webkit-backface-visibility: hidden;
              -webkit-perspective: 1000;
            }

            /* Portuguese text readability */
            p, span, label {
              line-height: var(--portuguese-text-line-height, 1.5);
              font-size: max(16px, 1rem); /* Prevent zoom on iOS */
            }
          }

          /* Extra small devices (Portuguese community priority) */
          @media (max-width: 375px) {
            .container, .max-w-7xl, .max-w-6xl {
              padding-left: 16px;
              padding-right: 16px;
            }
            
            button {
              min-height: 48px; /* Extra height for small screens */
            }
          }
        `}</style>
      )}

      {children}
    </div>
  );
}

export default MobileCriticalFixes;