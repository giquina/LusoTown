"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, PanInfo } from 'framer-motion';
import { 
  SparklesIcon, 
  StarIcon,
  CrownIcon,
  HeartIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  FlagIcon,
  AcademicCapIcon,
  MusicNoteIcon,
  CameraIcon,
  ShareIcon,
  BookmarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { PORTUGUESE_MOBILE_DESIGN_TOKENS } from '@/config/portuguese-mobile-design-tokens';

// Portuguese Heritage Badge Component
interface PortugueseHeritageBadgeProps {
  country: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'guinea-bissau' | 'east-timor' | 'sao-tome';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PortugueseHeritageBadge({
  country,
  size = 'md',
  showLabel = true,
  interactive = false,
  onClick,
  className = ''
}: PortugueseHeritageBadgeProps) {
  const { language } = useLanguage();
  
  const countryConfig = {
    portugal: {
      flag: '🇵🇹',
      colors: 'from-red-600 via-green-600 to-red-600',
      name: { pt: 'Portugal', en: 'Portugal' },
      accent: '#DC143C'
    },
    brazil: {
      flag: '🇧🇷', 
      colors: 'from-green-500 via-yellow-400 to-blue-600',
      name: { pt: 'Brasil', en: 'Brazil' },
      accent: '#009639'
    },
    'cape-verde': {
      flag: '🇨🇻',
      colors: 'from-blue-600 via-white to-red-500',
      name: { pt: 'Cabo Verde', en: 'Cape Verde' },
      accent: '#003893'
    },
    angola: {
      flag: '🇦🇴',
      colors: 'from-red-600 via-black to-yellow-400',
      name: { pt: 'Angola', en: 'Angola' },
      accent: '#FF0000'
    },
    mozambique: {
      flag: '🇲🇿',
      colors: 'from-green-600 via-yellow-400 to-red-600',
      name: { pt: 'Moçambique', en: 'Mozambique' },
      accent: '#00A550'
    },
    'guinea-bissau': {
      flag: '🇬🇼',
      colors: 'from-red-600 via-yellow-400 to-green-600',
      name: { pt: 'Guiné-Bissau', en: 'Guinea-Bissau' },
      accent: '#DC143C'
    },
    'east-timor': {
      flag: '🇹🇱',
      colors: 'from-red-600 via-yellow-400 to-black',
      name: { pt: 'Timor-Leste', en: 'East Timor' },
      accent: '#DC143C'
    },
    'sao-tome': {
      flag: '🇸🇹',
      colors: 'from-green-600 via-yellow-400 to-red-600',
      name: { pt: 'São Tomé e Príncipe', en: 'São Tomé and Príncipe' },
      accent: '#12AD2B'
    }
  };

  const config = countryConfig[country];
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm', 
    lg: 'w-12 h-12 text-base'
  };

  return (
    <motion.div
      className={`
        relative flex items-center gap-2 ${className}
        ${interactive ? 'cursor-pointer' : ''}
      `}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <motion.div
        className={`
          ${sizes[size]} rounded-full flex items-center justify-center
          bg-gradient-to-r ${config.colors} shadow-lg border-2 border-white
          relative overflow-hidden
        `}
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 5 }}
      >
        <span className="text-lg">{config.flag}</span>
        
        {/* Premium shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ translateX: ['−100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>
      
      {showLabel && (
        <motion.span 
          className="text-sm font-semibold text-gray-700"
          style={{ color: config.accent }}
        >
          {config.name[language as keyof typeof config.name]}
        </motion.span>
      )}
    </motion.div>
  );
}

// Portuguese Cultural Card Component (Mobile Optimized)
interface PortugueseCulturalCardProps {
  title: string;
  description?: string;
  image?: string;
  category: 'event' | 'business' | 'community' | 'cultural' | 'education';
  heritage?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique';
  onClick?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PortugueseCulturalCard({
  title,
  description,
  image,
  category,
  heritage,
  onClick,
  onShare,
  onBookmark,
  isBookmarked = false,
  className = '',
  children
}: PortugueseCulturalCardProps) {
  const { language } = useLanguage();
  const [isPressed, setIsPressed] = useState(false);

  const categoryConfig = {
    event: {
      icon: CalendarDaysIcon,
      color: 'from-red-500 to-red-600',
      bg: 'bg-red-50'
    },
    business: {
      icon: BuildingLibraryIcon,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50'
    },
    community: {
      icon: UserGroupIcon,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50'
    },
    cultural: {
      icon: MusicNoteIcon,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50'
    },
    education: {
      icon: AcademicCapIcon,
      color: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50'
    }
  };

  const config = categoryConfig[category];
  const IconComponent = config.icon;

  return (
    <motion.div
      className={`
        luxury-card relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100
        ${className} ${onClick ? 'cursor-pointer' : ''}
      `}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
      layout
    >
      {/* Portuguese Heritage Corner */}
      {heritage && (
        <div className="absolute top-0 right-0 z-10">
          <PortugueseHeritageBadge
            country={heritage}
            size="sm"
            showLabel={false}
            className="m-3"
          />
        </div>
      )}

      {/* Image Section */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent`} />
          
          {/* Quick Actions Overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            <motion.button
              className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md`}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
            >
              <BookmarkIcon 
                className={`w-4 h-4 ${isBookmarked ? 'text-red-600 fill-current' : 'text-gray-600'}`}
              />
            </motion.button>
            
            {onShare && (
              <motion.button
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md"
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
              >
                <ShareIcon className="w-4 h-4 text-gray-600" />
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {language === 'pt' ? 
              (category === 'event' ? 'Evento' :
               category === 'business' ? 'Negócio' :
               category === 'community' ? 'Comunidade' :
               category === 'cultural' ? 'Cultural' : 'Educação') :
              category
            }
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Children Content */}
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </div>

      {/* Portuguese Cultural Pattern Overlay */}
      <div 
        className="absolute bottom-0 right-0 w-16 h-16 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23DC143C'/><path d='M30 0L45 15H15z' fill='%23228B22' opacity='0.5'/><path d='M60 30L45 45V15z' fill='%23228B22' opacity='0.5'/><path d='M30 60L15 45H45z' fill='%23228B22' opacity='0.5'/><path d='M0 30L15 15V45z' fill='%23228B22' opacity='0.5'/></svg>")`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Premium interaction feedback */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-green-500/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPressed ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}

// Portuguese Cultural Swipe Navigation
interface PortugueseSwipeNavigationProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemSelect?: (item: T, index: number) => void;
  itemWidth?: number;
  spacing?: number;
  showIndicators?: boolean;
  className?: string;
  title?: string;
}

export function PortugueseSwipeNavigation<T>({
  items,
  renderItem,
  onItemSelect,
  itemWidth = 280,
  spacing = 16,
  showIndicators = true,
  className = '',
  title
}: PortugueseSwipeNavigationProps<T>) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > threshold && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < -threshold && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, items.length - 1)));
  };

  return (
    <div className={`portuguese-swipe-navigation ${className}`}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            <motion.button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              disabled={currentIndex === 0}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(currentIndex - 1)}
            >
              <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
            </motion.button>
            <motion.button
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              disabled={currentIndex >= items.length - 1}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(currentIndex + 1)}
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Scrollable Container */}
      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex gap-4 px-4"
          drag="x"
          dragConstraints={{
            left: -(items.length - 1) * (itemWidth + spacing),
            right: 0
          }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * (itemWidth + spacing) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              style={{ width: itemWidth }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onItemSelect?.(item, index)}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </motion.div>

        {/* Portuguese Cultural Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Indicators */}
      {showIndicators && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-red-600 to-green-600 w-6' 
                  : 'bg-gray-300'
              }`}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Portuguese Cultural Action Sheet
interface PortugueseCulturalAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color?: 'red' | 'green' | 'blue' | 'amber' | 'purple';
  heritage?: 'portugal' | 'brazil' | 'palop';
  onClick: () => void;
}

interface PortugueseCulturalActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions: PortugueseCulturalAction[];
  className?: string;
}

export function PortugueseCulturalActionSheet({
  isOpen,
  onClose,
  title,
  description,
  actions,
  className = ''
}: PortugueseCulturalActionSheetProps) {
  const { language } = useLanguage();

  const colorConfig = {
    red: 'from-red-500 to-red-600 text-white',
    green: 'from-green-500 to-green-600 text-white',
    blue: 'from-blue-500 to-blue-600 text-white',
    amber: 'from-amber-500 to-amber-600 text-white',
    purple: 'from-purple-500 to-purple-600 text-white'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Action Sheet */}
          <motion.div
            className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 overflow-hidden">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
              
              {/* Header */}
              {(title || description) && (
                <div className="px-6 py-4 border-b border-gray-100">
                  {title && (
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-sm text-gray-600">
                      {description}
                    </p>
                  )}
                </div>
              )}
              
              {/* Actions */}
              <div className="px-2 py-3 max-h-80 overflow-y-auto">
                {actions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-2xl mb-2
                      ${action.color 
                        ? `bg-gradient-to-r ${colorConfig[action.color]}` 
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                      }
                      transition-all duration-200 min-h-[56px]
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      action.onClick();
                      onClose();
                    }}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {action.icon}
                    </div>
                    <span className="font-semibold text-left flex-1">
                      {action.label}
                    </span>
                    {action.heritage && (
                      <PortugueseHeritageBadge
                        country={action.heritage}
                        size="sm"
                        showLabel={false}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Safe Area */}
              <div className="h-safe-area-inset-bottom" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Portuguese Cultural Touch Feedback
export function usePortugueseTouchFeedback() {
  const triggerHaptic = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    // Haptic feedback simulation for Portuguese cultural interactions
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, []);

  const triggerCulturalFeedback = useCallback((heritage: 'portugal' | 'brazil' | 'palop' = 'portugal') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      const patterns = {
        portugal: [20, 10, 20], // Short-pause-short (like Portuguese rhythm)
        brazil: [30, 5, 15, 5, 30], // Samba-like rhythm
        palop: [25, 15, 25] // Balanced African-Portuguese rhythm
      };
      navigator.vibrate(patterns[heritage]);
    }
  }, []);

  return { triggerHaptic, triggerCulturalFeedback };
}

export default {
  PortugueseHeritageBadge,
  PortugueseCulturalCard,
  PortugueseSwipeNavigation,
  PortugueseCulturalActionSheet,
  usePortugueseTouchFeedback
};