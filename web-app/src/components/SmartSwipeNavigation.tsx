"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

// Lusophone Cultural Categories for Events
export const PORTUGUESE_EVENT_CATEGORIES = [
  {
    id: 'tonight',
    nameEn: 'Tonight',
    namePt: 'Hoje à Noite',
    icon: '🌙',
    color: 'from-purple-500 to-blue-500',
    description: 'Events happening tonight in Lusophone community',
  },
  {
    id: 'weekend',
    nameEn: 'Weekend',
    namePt: 'Fim de Semana',
    icon: '🎉',
    color: 'from-green-500 to-emerald-500',
    description: 'Weekend Lusophone cultural events',
  },
  {
    id: 'cultural',
    nameEn: 'Cultural',
    namePt: 'Cultural',
    icon: '🎭',
    color: 'from-red-500 to-pink-500',
    description: 'Portuguese heritage and cultural events',
  },
  {
    id: 'palop',
    nameEn: 'PALOP Heritage',
    namePt: 'Património PALOP',
    icon: '🌍',
    color: 'from-yellow-500 to-orange-500',
    description: 'PALOP countries cultural events',
  },
  {
    id: 'business',
    nameEn: 'Business',
    namePt: 'Negócios',
    icon: '💼',
    color: 'from-blue-500 to-indigo-500',
    description: 'Portuguese business networking',
  },
  {
    id: 'food',
    nameEn: 'Food & Wine',
    namePt: 'Gastronomia',
    icon: '🍷',
    color: 'from-red-600 to-rose-600',
    description: 'Portuguese cuisine and wine events',
  },
  {
    id: 'music',
    nameEn: 'Music & Dance',
    namePt: 'Música & Dança',
    icon: '🎵',
    color: 'from-pink-500 to-purple-500',
    description: 'Fado, Kizomba, and Portuguese music',
  },
  {
    id: 'sports',
    nameEn: 'Sports',
    namePt: 'Desportos',
    icon: '⚽',
    color: 'from-green-600 to-green-700',
    description: 'Lusophone football and sports events',
  }
];

interface SmartSwipeNavigationProps {
  activeCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  categories?: typeof PORTUGUESE_EVENT_CATEGORIES;
  className?: string;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function SmartSwipeNavigation({
  activeCategory,
  onCategoryChange,
  categories = PORTUGUESE_EVENT_CATEGORIES,
  className = '',
  showIndicators = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}: SmartSwipeNavigationProps) {
  const { language } = useLanguage();
  const { colors } = useHeritage();
  const isPortuguese = language === 'pt';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Find current category index
  useEffect(() => {
    if (activeCategory) {
      const index = categories.findIndex(cat => cat.id === activeCategory);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [activeCategory, categories]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % categories.length;
        setCurrentIndex(nextIndex);
        onCategoryChange(categories[nextIndex].id);
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, currentIndex, isDragging, categories, onCategoryChange]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 100; // Minimum drag distance
    const velocity = info.velocity.x;

    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 || velocity > 500) {
        // Swiped right - go to previous
        const newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
        setCurrentIndex(newIndex);
        onCategoryChange(categories[newIndex].id);
      } else {
        // Swiped left - go to next
        const newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex(newIndex);
        onCategoryChange(categories[newIndex].id);
      }
    }

    // Reset position
    x.set(0);
  }, [currentIndex, categories, onCategoryChange, x]);

  const goToCategory = useCallback((index: number) => {
    setCurrentIndex(index);
    onCategoryChange(categories[index].id);
  }, [categories, onCategoryChange]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    goToCategory(newIndex);
  }, [currentIndex, categories.length, goToCategory]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    goToCategory(newIndex);
  }, [currentIndex, categories.length, goToCategory]);

  const currentCategory = categories[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Main Category Display */}
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          ref={containerRef}
          className="flex"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x }}
          whileDrag={{ scale: 0.95 }}
        >
          <motion.div
            key={currentCategory.id}
            className={`min-w-full bg-gradient-to-r ${currentCategory.color} p-6 text-white`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{currentCategory.icon}</span>
                  <h3 className="text-xl font-bold">
                    {isPortuguese ? currentCategory.namePt : currentCategory.nameEn}
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  {currentCategory.description}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-manipulation"
                  aria-label={isPortuguese ? 'Categoria anterior' : 'Previous category'}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-manipulation"
                  aria-label={isPortuguese ? 'Próxima categoria' : 'Next category'}
                >
                  <ChevronRightIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Lusophone Flag Corner */}
        <div className="absolute top-3 right-3">
          <motion.div
            className="w-6 h-4 rounded-sm bg-gradient-to-r from-green-500 to-red-500 shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Category Indicators */}
      {showIndicators && (
        <div className="flex justify-center mt-4 gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => goToCategory(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-green-500 to-red-500 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`${isPortuguese ? 'Ir para' : 'Go to'} ${
                isPortuguese ? category.namePt : category.nameEn
              }`}
            />
          ))}
        </div>
      )}

      {/* Quick Category Pills */}
      <div className="mt-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => goToCategory(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 touch-manipulation ${
                index === currentIndex
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">{category.icon}</span>
              <span>{isPortuguese ? category.namePt : category.nameEn}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Swipe Instructions (Mobile) */}
      <div className="lg:hidden mt-2 text-center">
        <p className="text-xs text-gray-500">
          {isPortuguese
            ? '← Deslize para navegar pelas categorias →'
            : '← Swipe to navigate categories →'}
        </p>
      </div>
    </div>
  );
}

// Gesture-based Quick Filters Component
export function GestureQuickFilters({
  filters,
  onFilterChange,
  className = '',
}: {
  filters: any;
  onFilterChange: (filters: any) => void;
  className?: string;
}) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const quickFilters = [
    {
      key: 'free',
      labelEn: '🆓 Free Events',
      labelPt: '🆓 Eventos Grátis',
      action: () => onFilterChange({ ...filters, priceRange: { min: 0, max: 0 } }),
    },
    {
      key: 'tonight',
      labelEn: '🌙 Tonight',
      labelPt: '🌙 Hoje à Noite',
      action: () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        onFilterChange({
          ...filters,
          dateRange: {
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0],
          },
        });
      },
    },
    {
      key: 'portuguese',
      labelEn: '🇵🇹 Lusophone Culture',
      labelPt: '🇵🇹 Cultura Portuguesa',
      action: () => onFilterChange({ ...filters, tags: ['portuguese', 'culture'] }),
    },
    {
      key: 'palop',
      labelEn: '🌍 PALOP Heritage',
      labelPt: '🌍 Património PALOP',
      action: () => onFilterChange({ ...filters, tags: ['palop', 'heritage'] }),
    },
  ];

  return (
    <div className={`${className}`}>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {quickFilters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={filter.action}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition-colors touch-manipulation shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPortuguese ? filter.labelPt : filter.labelEn}
          </motion.button>
        ))}
      </div>
    </div>
  );
}