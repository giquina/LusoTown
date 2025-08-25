"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
// LusoMobileNavigation removed - duplicate nav, using PremiumMobileNavigation in layout instead
import { LuxuryPullToRefresh } from './LuxuryMobileInteraction';

interface MobileResponsiveLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showMobileNav?: boolean;
  showHeader?: boolean;
  pullToRefresh?: boolean;
  onRefresh?: () => Promise<void>;
  headerActions?: React.ReactNode;
  backgroundPattern?: 'none' | 'subtle' | 'portuguese';
  className?: string;
  contentClassName?: string;
  hideNavOn?: string[];
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export default function MobileResponsiveLayout({
  children,
  title,
  description,
  showMobileNav = true,
  showHeader = false,
  pullToRefresh = false,
  onRefresh,
  headerActions,
  backgroundPattern = 'subtle',
  className = '',
  contentClassName = '',
  hideNavOn = [],
  maxWidth = 'lg'
}: MobileResponsiveLayoutProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isPortuguese = language === 'pt';

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  // Lusophone cultural background patterns
  const backgroundPatterns = {
    none: '',
    subtle: 'bg-gradient-to-br from-gray-50 via-white to-gray-50',
    portuguese: `
      relative
      before:absolute before:inset-0 before:opacity-[0.02] before:pointer-events-none
      before:bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]
      bg-gradient-to-br from-red-50/30 via-yellow-50/20 to-green-50/30
    `
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  // Default refresh handler
  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      // Default refresh behavior
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
    }
  };

  const ContentWrapper = pullToRefresh 
    ? ({ children: wrapperChildren }: { children: React.ReactNode }) => (
        <LuxuryPullToRefresh onRefresh={handleRefresh}>
          {wrapperChildren}
        </LuxuryPullToRefresh>
      )
    : ({ children: wrapperChildren }: { children: React.ReactNode }) => <>{wrapperChildren}</>;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="elite-loading-spinner" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen elite-mobile-viewport ${backgroundPatterns[backgroundPattern]} ${className}`}>
      {/* Skip Links for Accessibility */}
      <div className="sr-only-focusable">
        <a
          href="#main-content"
          className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50 focus:not-sr-only"
        >
          {isPortuguese ? 'Pular para conteúdo principal' : 'Skip to main content'}
        </a>
        <a
          href="#mobile-navigation"
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50 focus:not-sr-only"
        >
          {isPortuguese ? 'Pular para navegação' : 'Skip to navigation'}
        </a>
      </div>

      {/* Header */}
      {showHeader && (
        <motion.header
          className={`
            sticky top-0 z-40 transition-all duration-300 elite-safe-top
            ${isScrolled 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
              : 'bg-transparent'
            }
          `}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 sm:px-6 py-3">
            <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  {title && (
                    <motion.h1 
                      className={`font-bold text-gray-900 truncate ${
                        isPortuguese ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {title}
                    </motion.h1>
                  )}
                  {description && (
                    <motion.p 
                      className={`text-gray-600 truncate mt-1 ${
                        isPortuguese ? 'text-sm' : 'text-sm sm:text-base'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {description}
                    </motion.p>
                  )}
                </div>
                
                {headerActions && (
                  <motion.div 
                    className="flex items-center gap-2 ml-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {headerActions}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <ContentWrapper>
        <main
          ref={contentRef}
          id="main-content"
          role="main"
          data-cultural-main="portuguese"
          className={`
            flex-1 relative
            ${showMobileNav ? 'pb-20 sm:pb-4' : 'pb-4'}
            ${showHeader ? 'pt-0' : 'pt-4'}
            elite-safe-left elite-safe-right
            ${contentClassName}
          `}
        >
          <div className={`mx-auto px-4 sm:px-6 ${maxWidthClasses[maxWidth]}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </ContentWrapper>

      {/* Mobile Navigation handled by PremiumMobileNavigation in main layout */}

      {/* Lusophone Cultural Accessibility Announcements */}
      <div
        id="cultural-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 0.3 : 0 }}
        style={{
          scaleX: useMotionValue(0)
        }}
      />

      {/* Lusophone Cultural Context Styles */}
      <style jsx global>{`
        /* Lusophone text optimizations */
        .portuguese-text {
          font-feature-settings: 'liga' 1, 'calt' 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Touch target enhancements for Lusophone content */
        .portuguese-interactive {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(197, 40, 47, 0.1);
        }
        
        /* Lusophone cultural spacing adjustments */
        .portuguese-spacing-sm {
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        
        .portuguese-spacing-lg {
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        
        /* Safe area enhancements */
        .safe-area-padding {
          padding-top: max(1rem, env(safe-area-inset-top));
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
          padding-left: max(1rem, env(safe-area-inset-left));
          padding-right: max(1rem, env(safe-area-inset-right));
        }
        
        /* Mobile-first responsive typography for Lusophone */
        @media (max-width: 640px) {
          .responsive-portuguese-text {
            font-size: 0.875rem;
            line-height: 1.4;
          }
          
          .responsive-portuguese-title {
            font-size: 1.125rem;
            line-height: 1.3;
          }
          
          .responsive-portuguese-heading {
            font-size: 1.25rem;
            line-height: 1.25;
          }
        }
        
        @media (min-width: 641px) {
          .responsive-portuguese-text {
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .responsive-portuguese-title {
            font-size: 1.25rem;
            line-height: 1.4;
          }
          
          .responsive-portuguese-heading {
            font-size: 1.5rem;
            line-height: 1.3;
          }
        }
        
        /* Lusophone cultural indicators */
        .cultural-content {
          position: relative;
        }
        
        .cultural-content::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(197, 40, 47, 0.1) 0%, 
            rgba(255, 215, 0, 0.1) 50%, 
            rgba(0, 168, 89, 0.1) 100%);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .cultural-content:hover::before,
        .cultural-content:focus-within::before {
          opacity: 1;
        }
        
        /* High contrast support */
        @media (prefers-contrast: high) {
          .elite-mobile-viewport {
            --primary-color: #000000;
            --secondary-color: #ffffff;
            --accent-color: #0066cc;
          }
          
          .cultural-content::before {
            background: linear-gradient(45deg, 
              rgba(0, 0, 0, 0.2) 0%, 
              rgba(0, 102, 204, 0.2) 50%, 
              rgba(0, 0, 0, 0.2) 100%);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .elite-mobile-viewport * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Lusophone keyboard support */
        input[lang="pt"],
        textarea[lang="pt"] {
          font-feature-settings: 'liga' 1, 'calt' 1, 'ccmp' 1;
        }
        
        /* Mobile performance optimizations */
        .elite-optimized * {
          will-change: auto;
          contain: layout style paint;
        }
        
        /* Lusophone text overflow handling */
        .portuguese-ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .portuguese-line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .portuguese-line-clamp {
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </div>
  );
}

// Motion value hook for scroll progress (simplified version)
function useMotionValue(initial: number) {
  const [value, setValue] = useState(initial);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setValue(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return value;
}