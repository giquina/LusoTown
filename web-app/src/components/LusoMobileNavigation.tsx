"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/config/routes';
import {
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  UserIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  BuildingStorefrontIcon as BuildingStorefrontIconSolid,
  UserIcon as UserIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid';
import { LuxuryRipple, LuxuryFAB } from './LuxuryMobileInteraction';

interface NavItem {
  href: string;
  label: string;
  labelPt: string;
  icon: React.ComponentType<{ className?: string }>;
  iconActive: React.ComponentType<{ className?: string }>;
  badge?: number;
  cultural?: boolean;
}

interface LusoMobileNavigationProps {
  className?: string;
  hideOn?: string[];
  showFAB?: boolean;
  fabAction?: () => void;
}

export default function LusoMobileNavigation({
  className = '',
  hideOn = [],
  showFAB = true,
  fabAction
}: LusoMobileNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Lusophone cultural indicators
  const [showCulturalPulse, setShowCulturalPulse] = useState(false);

  // Navigation items with Lusophone cultural context
  const navigationItems: NavItem[] = [
    {
      href: ROUTES.home,
      label: 'Home',
      labelPt: 'Início',
      icon: HomeIcon,
      iconActive: HomeIconSolid,
      cultural: false
    },
    {
      href: ROUTES.events,
      label: 'Events',
      labelPt: 'Eventos',
      icon: CalendarDaysIcon,
      iconActive: CalendarDaysIconSolid,
      badge: 3, // Dynamic badge for new Lusophone cultural events
      cultural: true
    },
    {
      href: ROUTES.community,
      label: 'Community',
      labelPt: 'Comunidade',
      icon: UserGroupIcon,
      iconActive: UserGroupIconSolid,
      cultural: true
    },
    {
      href: ROUTES.chat,
      label: 'Chat',
      labelPt: 'Conversar',
      icon: ChatBubbleLeftRightIcon,
      iconActive: ChatBubbleLeftRightIconSolid,
      badge: 2, // Unread messages
      cultural: false
    },
    {
      href: ROUTES.businesses,
      label: 'Business',
      labelPt: 'Negócios',
      icon: BuildingStorefrontIcon,
      iconActive: BuildingStorefrontIconSolid,
      cultural: true
    }
  ];

  // Handle scroll behavior for navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      setIsScrolling(true);
      
      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Show navigation after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  // Cultural pulse animation for Lusophone events
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCulturalPulse(true);
      setTimeout(() => setShowCulturalPulse(false), 2000);
    }, 8000); // Every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Check if current path should hide navigation
  const shouldHide = hideOn.some(path => pathname?.includes(path));
  
  // Don't render on desktop or when hidden
  if (shouldHide) return null;

  const isActive = (href: string) => {
    if (href === ROUTES.home) {
      return pathname === '/' || pathname === ROUTES.home;
    }
    return pathname?.startsWith(href);
  };

  const handleNavigation = (href: string, hapticType: 'light' | 'medium' = 'light') => {
    // Add Lusophone cultural announcement for cultural sections
    const item = navigationItems.find(nav => nav.href === href);
    if (item?.cultural && language === 'pt') {
      announceInPortuguese(item.labelPt);
    }
    
    router.push(href);
  };

  const announceInPortuguese = (text: string) => {
    // Lusophone cultural accessibility announcement
    const announcement = document.createElement('div');
    announcement.className = 'portuguese-announcement';
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Navegando para ${text} - Seção cultural portuguesa`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 3000);
  };

  return (
    <>
      <motion.nav
        className={`elite-mobile-nav ${className}`}
        data-cultural-nav="portuguese"
        role="navigation"
        aria-label={language === 'pt' ? 'Navegação principal da comunidade portuguesa' : 'Main Lusophone community navigation'}
        initial={{ y: 100 }}
        animate={{ 
          y: isVisible ? 0 : 100,
          backdropFilter: isScrolling ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(160%)'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: isScrolling ? 0.2 : 0.4
        }}
      >
        {/* Portuguese heritage accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600"
          animate={{
            opacity: showCulturalPulse ? 1 : 0.6,
            scaleX: showCulturalPulse ? 1 : 0.8
          }}
          transition={{ duration: 0.8 }}
        />

        <div className="flex items-center justify-around px-2 py-1">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            const IconComponent = active ? item.iconActive : item.icon;
            
            return (
              <motion.div
                key={item.href}
                className="elite-nav-item-wrapper flex-1"
                whileTap={{ scale: 0.95 }}
              >
                <LuxuryRipple
                  className={`elite-nav-item ${active ? 'elite-nav-item--active' : ''} relative flex-1`}
                  onClick={() => handleNavigation(item.href, 'light')}
                  hapticFeedback="light"
                  rippleColor={active ? 'rgba(197, 40, 47, 0.3)' : 'rgba(107, 114, 128, 0.2)'}
                >
                  <motion.div
                    className="relative flex flex-col items-center gap-1 w-full"
                    animate={{
                      scale: active ? 1.05 : 1,
                      y: active ? -2 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Icon with Lusophone cultural indicators */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: active ? [0, -5, 5, 0] : 0,
                          scale: showCulturalPulse && item.cultural ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent 
                          className={`elite-nav-icon w-6 h-6 ${
                            active 
                              ? 'text-red-600' 
                              : 'text-gray-500'
                          }`}
                        />
                      </motion.div>
                      
                      {/* Lusophone cultural indicator */}
                      {item.cultural && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full"
                          animate={{
                            scale: showCulturalPulse ? [1, 1.3, 1] : 1,
                            opacity: active ? 1 : 0.7
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                      
                      {/* Badge for notifications */}
                      {item.badge && item.badge > 0 && (
                        <motion.div
                          className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {item.badge > 99 ? '99+' : item.badge}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Label with Lusophone support */}
                    <motion.span
                      className={`elite-nav-label text-xs font-medium ${
                        active 
                          ? 'text-red-600 font-semibold' 
                          : 'text-gray-500'
                      }`}
                      animate={{
                        fontWeight: active ? 600 : 500,
                        fontSize: active ? '0.7rem' : '0.65rem'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {language === 'pt' ? item.labelPt : item.label}
                    </motion.span>
                  </motion.div>

                  {/* Focus indicator for accessibility */}
                  <motion.div
                    className="absolute inset-0 border-2 border-red-500 rounded-xl opacity-0"
                    animate={{
                      opacity: active ? 0.3 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </LuxuryRipple>
              </motion.div>
            );
          })}
        </div>

        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50"
        >
          {language === 'pt' ? 'Pular para conteúdo principal' : 'Skip to main content'}
        </a>
      </motion.nav>

      {/* Luxury FAB for quick actions */}
      {showFAB && (
        <motion.div
          className="fixed bottom-20 right-4 z-40"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            delay: 0.5
          }}
        >
          <LuxuryFAB
            icon={<PlusIcon className="w-6 h-6" />}
            onClick={fabAction || (() => router.push(ROUTES.host))}
            variant="primary"
            size="medium"
            tooltip={language === 'pt' ? 'Criar Evento' : 'Create Event'}
            className="shadow-lg hover:shadow-xl"
          />
          
          {/* Lusophone cultural pulse indicator */}
          <motion.div
            className="absolute inset-0 border-2 border-red-500 rounded-full opacity-30"
            animate={{
              scale: showCulturalPulse ? [1, 1.2, 1] : 1,
              opacity: showCulturalPulse ? [0.3, 0.6, 0.3] : 0
            }}
            transition={{ duration: 2 }}
          />
        </motion.div>
      )}

      {/* Cultural announcement area */}
      <div 
        id="portuguese-announcements"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Lusophone navigation indicators */}
      <style jsx>{`
        .portuguese-announcement {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #dc2626 0%, #16a34a 100%);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          max-width: 280px;
          z-index: 9999;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          animation: slideInUp 0.5s ease-out;
        }
        
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Lusophone cultural navigation enhancements */
        .elite-mobile-nav {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px) saturate(160%);
          border-top: 1px solid rgba(197, 40, 47, 0.1);
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.08), 
                      0 -2px 8px rgba(197, 40, 47, 0.05);
        }
        
        .elite-nav-item--active {
          background: radial-gradient(circle at center, 
            rgba(197, 40, 47, 0.08) 0%, 
            transparent 70%);
        }
        
        /* Safe area support for notched devices */
        @supports (padding: max(0px)) {
          .elite-mobile-nav {
            padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .elite-mobile-nav {
            background: white;
            border-top: 2px solid #dc2626;
          }
          
          .elite-nav-icon {
            filter: contrast(2);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .elite-mobile-nav,
          .elite-nav-item,
          .elite-nav-icon {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}