"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { 
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  HeartIcon,
  StarIcon,
  MapPinIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  CalendarDaysIcon as CalendarIconSolid,
  UserGroupIcon as CommunityIconSolid,
  BuildingLibraryIcon as BusinessIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { PortugueseHeritageBadge, PortugueseCulturalCard } from './PortugueseCulturalMobileComponents';

// Portuguese Cultural Mobile Navigation
interface MobileNavigationItem {
  id: string;
  label: { pt: string; en: string };
  icon: React.ComponentType<{ className?: string }>;
  iconSolid: React.ComponentType<{ className?: string }>;
  route: string;
  badge?: number;
  culturalContext: string;
}

interface PortugueseMobileNavigationProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  className?: string;
}

export function PortugueseMobileNavigation({
  activeRoute,
  onNavigate,
  className = ''
}: PortugueseMobileNavigationProps) {
  const { language } = useLanguage();
  const { colors } = useHeritage();

  const navigationItems: MobileNavigationItem[] = [
    {
      id: 'home',
      label: { pt: 'Início', en: 'Home' },
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      route: '/',
      culturalContext: 'Portuguese community home and welcome'
    },
    {
      id: 'events',
      label: { pt: 'Eventos', en: 'Events' },
      icon: CalendarDaysIcon,
      iconSolid: CalendarIconSolid,
      route: '/events',
      badge: 3,
      culturalContext: 'Portuguese cultural events and celebrations'
    },
    {
      id: 'community',
      label: { pt: 'Comunidade', en: 'Community' },
      icon: UserGroupIcon,
      iconSolid: CommunityIconSolid,
      route: '/community',
      culturalContext: 'Portuguese-speaking community connections'
    },
    {
      id: 'business',
      label: { pt: 'Negócios', en: 'Business' },
      icon: BuildingLibraryIcon,
      iconSolid: BusinessIconSolid,
      route: '/business-directory',
      culturalContext: 'Portuguese businesses and services directory'
    },
    {
      id: 'chat',
      label: { pt: 'Conversas', en: 'Chat' },
      icon: ChatBubbleLeftRightIcon,
      iconSolid: ChatIconSolid,
      route: '/messages',
      badge: 2,
      culturalContext: 'Portuguese community conversations and support'
    }
  ];

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl
      border-t border-gray-200 safe-area-pb ${className}
    `}>
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {navigationItems.map((item, index) => {
          const isActive = activeRoute === item.route;
          const IconComponent = isActive ? item.iconSolid : item.icon;
          
          return (
            <motion.button
              key={item.id}
              className="relative flex flex-col items-center justify-center p-2 min-h-[48px] transition-colors"
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.route)}
              initial={false}
              animate={{
                color: isActive ? colors.primary : '#6B7280'
              }}
            >
              <div className="relative">
                <IconComponent className={`
                  w-6 h-6 transition-all duration-200
                  ${isActive ? 'scale-110' : 'scale-100'}
                `} />
                
                {/* Portuguese Heritage Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="w-1 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-green-600 rounded-full" />
                  </motion.div>
                )}
                
                {/* Badge */}
                {item.badge && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-600 to-red-700 
                               text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              <span className={`
                text-xs font-medium mt-1 transition-all duration-200 line-clamp-1
                ${isActive ? 'font-bold' : 'font-normal'}
              `}>
                {item.label[language as keyof typeof item.label]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Portuguese Cultural Pattern Background */}
      <div 
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23FFFFFF'/><circle cx='20' cy='20' r='8' fill='none' stroke='%23DC143C' stroke-width='0.5' opacity='0.1'/></svg>")`,
          backgroundSize: '20px 20px'
        }}
      />
    </nav>
  );
}

// Portuguese Mobile Header Component
interface PortugueseMobileHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  onBack?: () => void;
  onMenuToggle?: () => void;
  onSearch?: () => void;
  onNotifications?: () => void;
  notificationCount?: number;
  className?: string;
}

export function PortugueseMobileHeader({
  title,
  subtitle,
  showBack = false,
  showMenu = false,
  showSearch = false,
  showNotifications = false,
  onBack,
  onMenuToggle,
  onSearch,
  onNotifications,
  notificationCount = 0,
  className = ''
}: PortugueseMobileHeaderProps) {
  const { language } = useLanguage();
  const { colors } = useHeritage();

  return (
    <motion.header
      className={`
        sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200
        px-4 py-3 safe-area-pt ${className}
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 rotate-180" />
            </motion.button>
          )}
          
          {showMenu && (
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={onMenuToggle}
            >
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={onSearch}
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
          
          {showNotifications && (
            <motion.button
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              whileTap={{ scale: 0.9 }}
              onClick={onNotifications}
            >
              <BellIcon className="w-5 h-5 text-gray-600" />
              {notificationCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-600 to-red-700 
                             text-white text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </motion.div>
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Portuguese Heritage Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-green-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
    </motion.header>
  );
}

// Portuguese Cultural Mobile Onboarding Flow
interface OnboardingStep {
  id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  image: string;
  culturalContext: string;
  heritage?: 'portugal' | 'brazil' | 'palop';
}

interface PortugueseMobileOnboardingProps {
  isVisible: boolean;
  onComplete: () => void;
  className?: string;
}

export function PortugueseMobileOnboarding({
  isVisible,
  onComplete,
  className = ''
}: PortugueseMobileOnboardingProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: { pt: 'Bem-vindo à LusoTown', en: 'Welcome to LusoTown' },
      description: { 
        pt: 'A sua plataforma para conectar com a comunidade lusófona no Reino Unido.',
        en: 'Your platform to connect with the Portuguese-speaking community in the United Kingdom.' 
      },
      image: '/images/onboarding/welcome-portuguese.jpg',
      culturalContext: 'Portuguese community welcome and cultural pride',
      heritage: 'portugal'
    },
    {
      id: 'heritage',
      title: { pt: 'Celebre a sua herança', en: 'Celebrate Your Heritage' },
      description: { 
        pt: 'Conecte-se com outros lusófonos de Portugal, Brasil, PALOP e comunidades de todo o mundo.',
        en: 'Connect with Portuguese speakers from Portugal, Brazil, PALOP, and communities worldwide.' 
      },
      image: '/images/onboarding/heritage-celebration.jpg',
      culturalContext: 'Lusophone diversity and cultural connection',
      heritage: 'palop'
    },
    {
      id: 'community',
      title: { pt: 'Descubra a comunidade', en: 'Discover Community' },
      description: { 
        pt: 'Encontre eventos, negócios locais e construa conexões autênticas com a sua comunidade.',
        en: 'Find events, local businesses, and build authentic connections with your community.' 
      },
      image: '/images/onboarding/community-events.jpg',
      culturalContext: 'Portuguese community engagement and local connections',
      heritage: 'brazil'
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setSwipeDirection(null);
      }, 150);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setSwipeDirection(null);
      }, 150);
    }
  };

  const skipToEnd = () => {
    onComplete();
  };

  if (!isVisible) return null;

  const currentStepData = onboardingSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 bg-white ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Skip Button */}
        <motion.button
          className="absolute top-4 right-4 z-10 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors safe-area-pt"
          onClick={skipToEnd}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'pt' ? 'Saltar' : 'Skip'}
        </motion.button>

        {/* Step Content */}
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <motion.div 
            className="relative flex-1 overflow-hidden"
            key={`image-${currentStep}`}
            initial={{ x: swipeDirection === 'left' ? '100%' : swipeDirection === 'right' ? '-100%' : 0 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <img
              src={currentStepData.image}
              alt={currentStepData.title[language as keyof typeof currentStepData.title]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Heritage Badge */}
            {currentStepData.heritage && (
              <div className="absolute top-6 left-6">
                <PortugueseHeritageBadge
                  country={currentStepData.heritage}
                  size="lg"
                  showLabel={true}
                />
              </div>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="bg-white px-6 py-8 rounded-t-3xl -mt-6 relative z-10"
            key={`content-${currentStep}`}
            initial={{ y: swipeDirection === 'left' ? '100%' : swipeDirection === 'right' ? '-100%' : 0 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {onboardingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'w-8 bg-gradient-to-r from-red-600 via-amber-500 to-green-600' 
                      : 'w-2 bg-gray-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>

            {/* Title */}
            <motion.h1
              className="text-2xl font-bold text-gray-900 text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentStepData.title[language as keyof typeof currentStepData.title]}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-center mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentStepData.description[language as keyof typeof currentStepData.description]}
            </motion.p>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {currentStep > 0 && (
                <motion.button
                  className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-semibold min-h-[56px] transition-colors"
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {language === 'pt' ? 'Anterior' : 'Previous'}
                </motion.button>
              )}
              
              <motion.button
                className="flex-1 py-4 px-6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-2xl font-semibold min-h-[56px] shadow-lg transition-all duration-200"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={nextStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentStep === onboardingSteps.length - 1 
                  ? (language === 'pt' ? 'Começar' : 'Get Started')
                  : (language === 'pt' ? 'Próximo' : 'Next')
                }
              </motion.button>
            </div>

            {/* Safe Area */}
            <div className="safe-area-pb" />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default {
  PortugueseMobileNavigation,
  PortugueseMobileHeader,
  PortugueseMobileOnboarding
};