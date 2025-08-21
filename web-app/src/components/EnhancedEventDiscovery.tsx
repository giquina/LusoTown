"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { EVENT_CATEGORIES } from "@/lib/events";
import type { Event } from "@/types/event";

interface EnhancedEventDiscoveryProps {
  events: Event[];
  onEventsFiltered: (events: Event[]) => void;
  className?: string;
}

interface EventFilters {
  searchTerm: string;
  selectedCategory: string | null;
  priceRange: 'free' | 'paid' | 'all';
  timeFilter: 'today' | 'week' | 'month' | 'all';
  location: string;
  sortBy: 'date' | 'popularity' | 'price' | 'relevance';
}

interface RecommendationReason {
  type: 'trending' | 'popular' | 'similar' | 'nearby' | 'cultural';
  label: string;
  labelPt: string;
  weight: number;
}

export default function EnhancedEventDiscovery({ 
  events, 
  onEventsFiltered, 
  className = "" 
}: EnhancedEventDiscoveryProps) {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';

  const [filters, setFilters] = useState<EventFilters>({
    searchTerm: '',
    selectedCategory: null,
    priceRange: 'all',
    timeFilter: 'all',
    location: '',
    sortBy: 'relevance'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Enhanced filtering logic with Portuguese cultural considerations
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm) ||
          event.category?.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.selectedCategory && event.category !== filters.selectedCategory) {
        return false;
      }

      // Price filter
      if (filters.priceRange !== 'all') {
        const isFree = !event.price || event.price === 0;
        if (filters.priceRange === 'free' && !isFree) return false;
        if (filters.priceRange === 'paid' && isFree) return false;
      }

      // Time filter
      if (filters.timeFilter !== 'all') {
        const eventDate = new Date(event.date);
        const now = new Date();
        const timeDiff = eventDate.getTime() - now.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        switch (filters.timeFilter) {
          case 'today':
            if (daysDiff > 1) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
        }
      }

      // Location filter (fuzzy matching)
      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        if (!event.location.toLowerCase().includes(locationTerm)) return false;
      }

      return true;
    });

    // Sorting with Portuguese cultural prioritization
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popularity':
          return (b.attendees || 0) - (a.attendees || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'relevance':
        default:
          // Portuguese cultural events get priority
          const aCultural = a.title.toLowerCase().includes('portuguese') || 
                          a.title.toLowerCase().includes('português') ||
                          a.description.toLowerCase().includes('portuguese') ||
                          a.description.toLowerCase().includes('português');
          const bCultural = b.title.toLowerCase().includes('portuguese') || 
                          b.title.toLowerCase().includes('português') ||
                          b.description.toLowerCase().includes('portuguese') ||
                          b.description.toLowerCase().includes('português');
          
          if (aCultural && !bCultural) return -1;
          if (!aCultural && bCultural) return 1;
          
          // Then by date
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [events, filters]);

  // Update parent component when filtered events change
  React.useEffect(() => {
    onEventsFiltered(filteredAndSortedEvents);
  }, [filteredAndSortedEvents, onEventsFiltered]);

  // Generate smart recommendations based on user behavior and Portuguese cultural context
  const eventRecommendations = useMemo(() => {
    const reasons: RecommendationReason[] = [
      { type: 'trending', label: 'Trending Now', labelPt: 'Tendência Agora', weight: 3 },
      { type: 'popular', label: 'Popular Choice', labelPt: 'Escolha Popular', weight: 2 },
      { type: 'cultural', label: 'Portuguese Heritage', labelPt: 'Herança Portuguesa', weight: 4 },
      { type: 'nearby', label: 'Near You', labelPt: 'Perto de Ti', weight: 2 },
      { type: 'similar', label: 'Similar Interest', labelPt: 'Interesse Semelhante', weight: 1 }
    ];

    return filteredAndSortedEvents.slice(0, 6).map(event => {
      // Determine recommendation reason based on event characteristics
      let recommendationReason = reasons[0]; // default to trending

      if (event.title.toLowerCase().includes('portuguese') || 
          event.title.toLowerCase().includes('português') ||
          event.category === 'Cultural Heritage') {
        recommendationReason = reasons.find(r => r.type === 'cultural') || reasons[0];
      } else if ((event.attendees || 0) > 50) {
        recommendationReason = reasons.find(r => r.type === 'popular') || reasons[0];
      } else if (event.location.toLowerCase().includes('london')) {
        recommendationReason = reasons.find(r => r.type === 'nearby') || reasons[0];
      }

      return {
        event,
        reason: recommendationReason
      };
    });
  }, [filteredAndSortedEvents]);

  const handleFilterChange = useCallback((key: keyof EventFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      selectedCategory: null,
      priceRange: 'all',
      timeFilter: 'all',
      location: '',
      sortBy: 'relevance'
    });
  }, []);

  const hasActiveFilters = filters.searchTerm || filters.selectedCategory || 
    filters.priceRange !== 'all' || filters.timeFilter !== 'all' || filters.location;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {/* Main Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={isPortuguese ? "Procurar eventos..." : "Search events..."}
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            {isPortuguese ? 'Filtros' : 'Filters'}
            {hasActiveFilters && (
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {[filters.selectedCategory, filters.priceRange !== 'all', filters.timeFilter !== 'all', filters.location].filter(Boolean).length}
              </span>
            )}
          </motion.button>
        </div>

        {/* Quick Category Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(EVENT_CATEGORIES).slice(0, 6).map(([category, info]) => (
            <motion.button
              key={category}
              onClick={() => handleFilterChange('selectedCategory', 
                filters.selectedCategory === category ? null : category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filters.selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">{info.subcategories?.[0]?.charAt(0) || '🎯'}</span>
              {category}
            </motion.button>
          ))}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 pt-4 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Preço' : 'Price'}
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{isPortuguese ? 'Todos os preços' : 'All prices'}</option>
                    <option value="free">{isPortuguese ? 'Grátis' : 'Free'}</option>
                    <option value="paid">{isPortuguese ? 'Pagos' : 'Paid'}</option>
                  </select>
                </div>

                {/* Time Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Quando' : 'When'}
                  </label>
                  <select
                    value={filters.timeFilter}
                    onChange={(e) => handleFilterChange('timeFilter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{isPortuguese ? 'Qualquer altura' : 'Anytime'}</option>
                    <option value="today">{isPortuguese ? 'Hoje' : 'Today'}</option>
                    <option value="week">{isPortuguese ? 'Esta semana' : 'This week'}</option>
                    <option value="month">{isPortuguese ? 'Este mês' : 'This month'}</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Localização' : 'Location'}
                  </label>
                  <input
                    type="text"
                    placeholder={isPortuguese ? "e.g. Camden, London" : "e.g. Camden, London"}
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Ordenar por' : 'Sort by'}
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="relevance">{isPortuguese ? 'Relevância' : 'Relevance'}</option>
                    <option value="date">{isPortuguese ? 'Data' : 'Date'}</option>
                    <option value="popularity">{isPortuguese ? 'Popularidade' : 'Popularity'}</option>
                    <option value="price">{isPortuguese ? 'Preço' : 'Price'}</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    {isPortuguese ? 'Limpar filtros' : 'Clear filters'}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart Recommendations */}
      {showRecommendations && eventRecommendations.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-6 h-6 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                {isPortuguese ? 'Recomendados para Ti' : 'Recommended for You'}
              </h3>
            </div>
            <button
              onClick={() => setShowRecommendations(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventRecommendations.slice(0, 3).map(({ event, reason }, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    reason.type === 'cultural' ? 'bg-secondary-100 text-secondary-700' :
                    reason.type === 'trending' ? 'bg-orange-100 text-orange-700' :
                    reason.type === 'popular' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {reason.type === 'cultural' ? '🇵🇹' :
                     reason.type === 'trending' ? '🔥' :
                     reason.type === 'popular' ? '⭐' :
                     reason.type === 'nearby' ? '📍' : '✨'}
                    {isPortuguese ? reason.labelPt : reason.label}
                  </span>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {event.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {event.location.split(',')[0]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          {isPortuguese 
            ? `${filteredAndSortedEvents.length} eventos encontrados`
            : `${filteredAndSortedEvents.length} events found`
          }
          {hasActiveFilters && (
            <span className="ml-2 text-primary-600 font-medium">
              ({isPortuguese ? 'filtrado' : 'filtered'})
            </span>
          )}
        </div>
        
        {filteredAndSortedEvents.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FunnelIcon className="w-4 h-4" />
            {isPortuguese 
              ? 'Eventos portugueses têm prioridade'
              : 'Portuguese events prioritized'
            }
          </div>
        )}
      </div>
    </div>
  );
}