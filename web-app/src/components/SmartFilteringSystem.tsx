"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FunnelIcon,
  XMarkIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyPoundIcon,
  UsersIcon,
  TagIcon,
  SparklesIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

// Advanced Filtering Types
export interface SmartFilters {
  // Cultural Categories
  cultural?: 'portuguese' | 'brazilian' | 'palop' | 'all-lusophone';
  // Time-based
  timeframe?: 'tonight' | 'tomorrow' | 'weekend' | 'next-week' | 'this-month';
  // Location-based
  area?: 'central-london' | 'south-london' | 'north-london' | 'east-london' | 'west-london' | 'greater-london';
  // Price range
  priceRange?: 'free' | 'under-20' | 'under-50' | 'premium';
  // Event type
  eventType?: 'cultural' | 'business' | 'social' | 'educational' | 'food' | 'music' | 'sports';
  // Community level
  memberLevel?: 'all' | 'members-only' | 'premium-only';
  // Special attributes
  tags?: string[];
  // AI-powered recommendations
  recommendedFor?: 'newcomers' | 'families' | 'professionals' | 'students' | 'seniors';
}

interface SmartFilteringSystemProps {
  onFilterChange: (filters: SmartFilters) => void;
  currentFilters: SmartFilters;
  eventCount?: number;
  className?: string;
  showAdvanced?: boolean;
}

// Lusophone Cultural Areas in London
const LONDON_PORTUGUESE_AREAS = {
  'south-london': {
    nameEn: 'South London',
    namePt: 'Sul de Londres',
    icon: '🏛️',
    description: 'Stockwell, Vauxhall, Lambeth - Heart of Lusophone community',
    neighborhoods: ['Stockwell', 'Vauxhall', 'Lambeth', 'Elephant & Castle'],
  },
  'central-london': {
    nameEn: 'Central London',
    namePt: 'Centro de Londres',
    icon: '🌟',
    description: 'Westminster, Camden, City - Business & cultural events',
    neighborhoods: ['Camden', 'Westminster', 'City of London', 'Fitzrovia'],
  },
  'west-london': {
    nameEn: 'West London',
    namePt: 'Oeste de Londres',
    icon: '🏘️',
    description: 'Notting Hill, Kensington - Premium Lusophone experiences',
    neighborhoods: ['Kensington', 'Notting Hill', 'Hammersmith', 'Fulham'],
  },
  'north-london': {
    nameEn: 'North London',
    namePt: 'Norte de Londres',
    icon: '🌳',
    description: 'Islington, Camden - Lusophone family communities',
    neighborhoods: ['Islington', 'Camden', 'Hampstead', 'Finsbury Park'],
  },
  'east-london': {
    nameEn: 'East London',
    namePt: 'Este de Londres',
    icon: '🎨',
    description: 'Shoreditch, Hackney - Creative Lusophone community',
    neighborhoods: ['Shoreditch', 'Hackney', 'Bethnal Green', 'Canary Wharf'],
  },
  'greater-london': {
    nameEn: 'Greater London',
    namePt: 'Grande Londres',
    icon: '🚇',
    description: 'Outer London boroughs with Lusophone communities',
    neighborhoods: ['Croydon', 'Richmond', 'Bromley', 'Barnet'],
  },
};

export default function SmartFilteringSystem({
  onFilterChange,
  currentFilters,
  eventCount = 0,
  className = '',
  showAdvanced = false,
}: SmartFilteringSystemProps) {
  const { language } = useLanguage();
  const { colors } = useHeritage();
  const isPortuguese = language === 'pt';

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  // Quick Filter Presets
  const quickFilters = useMemo(() => [
    {
      id: 'tonight',
      nameEn: '🌙 Tonight',
      namePt: '🌙 Hoje à Noite',
      filters: { timeframe: 'tonight' as const },
      description: 'Events happening tonight',
    },
    {
      id: 'free',
      nameEn: '🆓 Free Events',
      namePt: '🆓 Eventos Grátis',
      filters: { priceRange: 'free' as const },
      description: 'Free Lusophone community events',
    },
    {
      id: 'portuguese-culture',
      nameEn: '🇵🇹 Lusophone Culture',
      namePt: '🇵🇹 Cultura Portuguesa',
      filters: { cultural: 'portuguese' as const, eventType: 'cultural' as const },
      description: 'Authentic Lusophone cultural events',
    },
    {
      id: 'palop-heritage',
      nameEn: '🌍 PALOP Heritage',
      namePt: '🌍 Património PALOP',
      filters: { cultural: 'palop' as const },
      description: 'PALOP countries cultural celebrations',
    },
    {
      id: 'business',
      nameEn: '💼 Professional',
      namePt: '💼 Profissional',
      filters: { eventType: 'business' as const },
      description: 'Portuguese business networking',
    },
    {
      id: 'stockwell',
      nameEn: '🏘️ Stockwell Area',
      namePt: '🏘️ Área de Stockwell',
      filters: { area: 'south-london' as const },
      description: 'Events in Lusophone heartland',
    },
  ], []);

  // Cultural Filter Options
  const culturalOptions = [
    { 
      value: 'all-lusophone' as const, 
      nameEn: 'All Lusophone', 
      namePt: 'Todos Lusófonos', 
      icon: '🌍',
      description: 'All Portuguese-speaking countries' 
    },
    { 
      value: 'portuguese' as const, 
      nameEn: 'Lusophone', 
      namePt: 'Português', 
      icon: '🇵🇹',
      description: 'Portugal heritage and culture' 
    },
    { 
      value: 'brazilian' as const, 
      nameEn: 'Brazilian', 
      namePt: 'Brasileiro', 
      icon: '🇧🇷',
      description: 'Brazilian culture and events' 
    },
    { 
      value: 'palop' as const, 
      nameEn: 'PALOP Countries', 
      namePt: 'Países PALOP', 
      icon: '🌍',
      description: 'Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé' 
    },
  ];

  // Apply quick filter
  const handleQuickFilter = (filterId: string) => {
    const filter = quickFilters.find(f => f.id === filterId);
    if (filter) {
      setActiveQuickFilter(filterId);
      onFilterChange({ ...currentFilters, ...filter.filters });
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveQuickFilter(null);
    onFilterChange({});
  };

  // Count active filters
  const activeFilterCount = Object.keys(currentFilters).length;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {isPortuguese ? 'Filtros Inteligentes' : 'Smart Filters'}
              </h3>
              <p className="text-sm text-gray-600">
                {isPortuguese 
                  ? `${eventCount} eventos encontrados`
                  : `${eventCount} events found`
                }
              </p>
            </div>
          </div>
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              {isPortuguese ? 'Limpar Tudo' : 'Clear All'}
            </button>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          {isPortuguese ? '🚀 Filtros Rápidos' : '🚀 Quick Filters'}
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {quickFilters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => handleQuickFilter(filter.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                activeQuickFilter === filter.id
                  ? 'bg-gradient-to-r from-green-50 to-red-50 border-green-300 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm font-medium text-gray-900 mb-1">
                {isPortuguese ? filter.namePt : filter.nameEn}
              </div>
              <div className="text-xs text-gray-600">
                {filter.description}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <SparklesIcon className="w-4 h-4" />
          {isPortuguese ? 'Filtros Avançados' : 'Advanced Filters'}
          <motion.div
            animate={{ rotate: isAdvancedOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isAdvancedOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-4 space-y-6">
              {/* Cultural Heritage */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <TagIcon className="w-4 h-4" />
                  {isPortuguese ? 'Herança Cultural' : 'Cultural Heritage'}
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {culturalOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange({ 
                        ...currentFilters, 
                        cultural: currentFilters.cultural === option.value ? undefined : option.value 
                      })}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                        currentFilters.cultural === option.value
                          ? 'bg-gradient-to-r from-green-50 to-red-50 border-green-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-sm font-medium">
                          {isPortuguese ? option.namePt : option.nameEn}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {option.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* London Areas */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  {isPortuguese ? 'Áreas de Londres' : 'London Areas'}
                </h5>
                <div className="space-y-2">
                  {Object.entries(LONDON_PORTUGUESE_AREAS).map(([key, area]) => (
                    <button
                      key={key}
                      onClick={() => onFilterChange({ 
                        ...currentFilters, 
                        area: currentFilters.area === key ? undefined : key as any
                      })}
                      className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                        currentFilters.area === key
                          ? 'bg-gradient-to-r from-green-50 to-red-50 border-green-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl mt-0.5">{area.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900 mb-1">
                            {isPortuguese ? area.namePt : area.nameEn}
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            {area.description}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {area.neighborhoods.slice(0, 3).map((neighborhood) => (
                              <span
                                key={neighborhood}
                                className="inline-block px-2 py-1 bg-gray-200 text-xs rounded-full text-gray-700"
                              >
                                {neighborhood}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CurrencyPoundIcon className="w-4 h-4" />
                  {isPortuguese ? 'Faixa de Preço' : 'Price Range'}
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'free' as const, label: 'Free', labelPt: 'Grátis', icon: '🆓' },
                    { value: 'under-20' as const, label: 'Under £20', labelPt: 'Até £20', icon: '💷' },
                    { value: 'under-50' as const, label: 'Under £50', labelPt: 'Até £50', icon: '💰' },
                    { value: 'premium' as const, label: 'Premium', labelPt: 'Premium', icon: '💎' },
                  ].map((price) => (
                    <button
                      key={price.value}
                      onClick={() => onFilterChange({ 
                        ...currentFilters, 
                        priceRange: currentFilters.priceRange === price.value ? undefined : price.value
                      })}
                      className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                        currentFilters.priceRange === price.value
                          ? 'bg-gradient-to-r from-green-50 to-red-50 border-green-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-lg mb-1">{price.icon}</div>
                      <div className="text-sm font-medium">
                        {isPortuguese ? price.labelPt : price.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <StarIcon className="w-4 h-4" />
            <span>
              {isPortuguese 
                ? `${activeFilterCount} filtro${activeFilterCount > 1 ? 's' : ''} aplicado${activeFilterCount > 1 ? 's' : ''}`
                : `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}