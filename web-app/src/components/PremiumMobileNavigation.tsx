"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  HeartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  SparklesIcon,
  GlobeEuropeAfricaIcon,
  CrownIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  BoltIcon,
  DiamondIcon,
  GemIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolidIcon,
  CalendarDaysIcon as CalendarSolidIcon,
  UserGroupIcon as UserGroupSolidIcon,
  HeartIcon as HeartSolidIcon,
  UserIcon as UserSolidIcon,
  MagnifyingGlassIcon as SearchSolidIcon
} from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { LuxuryRipple } from './LuxuryMobileInteraction';

// Elite Tab Navigation Interface
interface PremiumTabItem {
  id: string;
  label: string;
  labelPt?: string;
  href: string;
  icon: React.ComponentType<any>;
  solidIcon: React.ComponentType<any>;
  color: string;
  badge?: number;
  premium?: boolean;
  heritage?: boolean;
}

const premiumNavItems: PremiumTabItem[] = [
  {
    id: 'home',
    label: 'Home',
    labelPt: 'Início',
    href: '/',
    icon: HomeIcon,
    solidIcon: HomeSolidIcon,
    color: 'text-red-600',
    heritage: true
  },
  {
    id: 'events',
    label: 'Events',
    labelPt: 'Eventos',
    href: '/events',
    icon: CalendarDaysIcon,
    solidIcon: CalendarSolidIcon,
    color: 'text-green-600',
    heritage: true
  },
  {
    id: 'community',
    label: 'Community',
    labelPt: 'Comunidade',
    href: '/community',
    icon: UserGroupIcon,
    solidIcon: UserGroupSolidIcon,
    color: 'text-blue-600',
    premium: true
  },
  {
    id: 'discover',
    label: 'Discover',
    labelPt: 'Descobrir',
    href: '/search',
    icon: MagnifyingGlassIcon,
    solidIcon: SearchSolidIcon,
    color: 'text-purple-600',
    premium: true
  },
  {
    id: 'profile',
    label: 'Profile',
    labelPt: 'Perfil',
    href: '/profile',
    icon: UserIcon,
    solidIcon: UserSolidIcon,
    color: 'text-amber-600',
    premium: true
  }
];

interface PremiumMobileNavigationProps {
  className?: string;
  user?: any;
  notifications?: number;
  onCreateNew?: () => void;
  style?: 'standard' | 'luxury' | 'elite';
}

export function PremiumMobileNavigation({ 
  className = '',
  user,
  notifications = 0,
  onCreateNew,
  style = 'luxury'
}: PremiumMobileNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, t } = useLanguage();
  const { colors } = useHeritage();
  const { scrollY } = useScroll();

  // Auto-hide navigation on scroll with premium physics
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 150; // Increased threshold for smoother experience
      
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update active tab based on pathname
  useEffect(() => {
    const currentItem = premiumNavItems.find(item => 
      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
    );
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, [pathname]);

  const handleNavigation = (item: PremiumTabItem) => {
    setActiveTab(item.id);
    router.push(item.href);
  };

  const navStyle = {
    standard: 'bg-white/95 backdrop-blur-md border-t border-gray-200',
    luxury: 'bg-gradient-to-r from-white/95 via-red-50/80 to-green-50/80 backdrop-blur-xl border-t border-red-200/40',
    elite: 'bg-gradient-to-r from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-xl border-t border-amber-400/30 text-white'
  };

  return (
    <motion.nav
      className={`
        fixed bottom-0 left-0 right-0 z-50 transition-all duration-500
        ${navStyle[style]}
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        ${className}
      `}
      style={{
        '--heritage-primary': colors.primary,
        '--heritage-secondary': colors.secondary,
      } as React.CSSProperties}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Premium accent line */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 ${
          style === 'elite'
            ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400'
            : 'bg-gradient-to-r from-red-600 via-amber-400 to-green-600'
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      <div className="px-4 py-3 pb-safe-bottom">
        <div className="flex items-center justify-around">
          {premiumNavItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const IconComponent = isActive ? item.solidIcon : item.icon;
            const label = language === 'pt' && item.labelPt ? item.labelPt : item.label;
            
            return (
              <motion.div
                key={item.id}
                className="relative flex-1 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LuxuryRipple
                  className={`
                    relative p-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1
                    ${isActive 
                      ? (style === 'elite' 
                          ? 'bg-amber-400/20 shadow-lg'
                          : 'bg-red-100/60 shadow-lg')
                      : 'hover:bg-gray-100/60'
                    }
                  `}
                  onClick={() => handleNavigation(item)}
                  hapticFeedback="medium"
                  rippleColor={
                    style === 'elite' 
                      ? 'rgba(251, 191, 36, 0.3)'
                      : 'rgba(197, 40, 47, 0.2)'
                  }
                >
                  {/* Premium indicators */}
                  {item.premium && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}
                    />
                  )}

                  {item.heritage && (
                    <motion.div
                      className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-red-500 to-green-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 500 }}
                    />
                  )}

                  <motion.div
                    className="relative"
                    animate={isActive ? { 
                      scale: 1.2, 
                      y: -2,
                      color: style === 'elite' ? '#fbbf24' : item.color
                    } : { 
                      scale: 1, 
                      y: 0,
                      color: style === 'elite' ? '#d1d5db' : '#6b7280'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <IconComponent className="w-6 h-6" />

                    {/* Notification badge */}
                    {item.id === 'profile' && notifications > 0 && (
                      <motion.div
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {notifications > 9 ? '9+' : notifications}
                      </motion.div>
                    )}

                    {/* Active pulse effect */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${
                          style === 'elite'
                            ? 'bg-amber-400/30'
                            : 'bg-red-500/20'
                        }`}
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 0.2, 0.6]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>

                  <motion.span
                    className={`text-xs font-semibold transition-all duration-300 ${
                      isActive 
                        ? (style === 'elite' ? 'text-amber-400' : item.color)
                        : (style === 'elite' ? 'text-gray-300' : 'text-gray-500')
                    }`}
                    animate={isActive ? { 
                      fontWeight: 700,
                      scale: 1.05
                    } : { 
                      fontWeight: 600,
                      scale: 1
                    }}
                  >
                    {label}
                  </motion.span>
                </LuxuryRipple>

                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className={`absolute -bottom-1 w-8 h-1 rounded-full ${
                        style === 'elite'
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                          : 'bg-gradient-to-r from-red-500 to-green-500'
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

// Premium Floating Navigation Menu for Quick Actions
interface FloatingNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  actions?: Array<{
    label: string;
    labelPt?: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
    color: string;
    premium?: boolean;
  }>;
  style?: 'standard' | 'luxury' | 'elite';
}

export function FloatingNavigation({
  isOpen,
  onToggle,
  actions = [],
  style = 'luxury'
}: FloatingNavigationProps) {
  const { language } = useLanguage();

  const defaultActions = [
    {
      label: 'Create Event',
      labelPt: 'Criar Evento',
      icon: CalendarDaysIcon,
      onClick: () => console.log('Create event'),
      color: 'bg-blue-500',
      premium: true
    },
    {
      label: 'Join Community',
      labelPt: 'Juntar à Comunidade',
      icon: UserGroupIcon,
      onClick: () => console.log('Join community'),
      color: 'bg-green-500'
    },
    {
      label: 'Portuguese Culture',
      labelPt: 'Cultura Portuguesa',
      icon: GlobeEuropeAfricaIcon,
      onClick: () => console.log('Culture'),
      color: 'bg-red-500',
      premium: true
    }
  ];

  const menuActions = actions.length > 0 ? actions : defaultActions;

  const fabStyle = {
    standard: 'bg-blue-600 hover:bg-blue-700',
    luxury: 'bg-gradient-to-br from-red-600 to-green-600',
    elite: 'bg-gradient-to-br from-gray-900 via-amber-900 to-black border-2 border-amber-400/50'
  };

  return (
    <>
      {/* Main FAB */}
      <motion.button
        className={`
          fixed bottom-24 right-6 w-16 h-16 rounded-2xl text-white shadow-2xl z-50
          ${fabStyle[style]}
          flex items-center justify-center
        `}
        whileHover={{ 
          scale: 1.1, 
          rotate: isOpen ? 45 : 0,
          boxShadow: style === 'elite' 
            ? '0 20px 40px rgba(0,0,0,0.4)'
            : '0 20px 40px rgba(197,40,47,0.3)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        transition={{ type: "spring", stiffness: 400 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-8 h-8" />
          ) : (
            <PlusIcon className="w-8 h-8" />
          )}
        </motion.div>

        {/* Premium glow effect */}
        {(style === 'luxury' || style === 'elite') && (
          <motion.div
            className={`absolute inset-0 rounded-2xl ${
              style === 'elite'
                ? 'bg-gradient-to-br from-amber-400/30 to-yellow-400/30'
                : 'bg-gradient-to-br from-red-400/30 to-green-400/30'
            }`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

            {/* Action Items */}
            {menuActions.map((action, index) => {
              const label = language === 'pt' && action.labelPt ? action.labelPt : action.label;
              
              return (
                <motion.div
                  key={action.label}
                  className="fixed bottom-24 right-6 z-50"
                  initial={{ 
                    scale: 0, 
                    y: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1, 
                    y: -(80 * (index + 1)),
                    opacity: 1
                  }}
                  exit={{ 
                    scale: 0, 
                    y: 0,
                    opacity: 0
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring", 
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Label */}
                    <motion.div
                      className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                        {label}
                        {action.premium && (
                          <CrownIcon className="inline w-3 h-3 ml-1 text-amber-500" />
                        )}
                      </span>
                    </motion.div>

                    {/* Action Button */}
                    <motion.button
                      className={`
                        w-14 h-14 rounded-2xl text-white shadow-xl
                        ${action.color}
                        flex items-center justify-center relative overflow-hidden
                      `}
                      whileHover={{ scale: 1.1, rotate: 12 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        action.onClick();
                        onToggle();
                      }}
                    >
                      <action.icon className="w-6 h-6" />
                      
                      {action.premium && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default {
  PremiumMobileNavigation,
  FloatingNavigation
};