"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FunnelIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { Event, EventFilters } from "@/lib/events";
import QuickFiltersSystem from "./QuickFiltersSystem";
import SwipeEventNavigation from "./SwipeEventNavigation";
import EventPerformanceOptimizer from "./EventPerformanceOptimizer";

interface MobileEventsInterfaceProps {
  events: Event[];
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  loading: boolean;
  className?: string;
}

type ViewMode = 'grid' | 'list';

export default function MobileEventsInterface({
  events,
  filters,
  onFiltersChange,
  onSearchChange,
  searchQuery,
  loading,
  className = "",
}: MobileEventsInterfaceProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [optimizedEvents, setOptimizedEvents] = useState<Event[]>([]);

  // Cultural suggestions for Portuguese events
  const culturalSuggestions = useMemo(() => [
    { text: "Fado", query: "fado" },
    { text: "Santos Populares", query: "santos populares" },
    { text: "Futebol", query: "football OR futebol" },
    { text: "Brasileira", query: "brazilian OR brasil" },
    { text: "PALOP", query: "angola OR mozambique OR cape verde" },
    { text: isPortuguese ? "Música" : "Music", query: "music OR musica" },
  ], [isPortuguese]);

  // Quick filter options optimized for mobile
  const quickFilterOptions = useMemo(() => ({
    time: [
      { id: "time-tonight", label: isPortuguese ? "🌙 Hoje à Noite" : "🌙 Tonight", value: "tonight" },
      { id: "time-weekend", label: isPortuguese ? "🎉 Fim de Semana" : "🎉 Weekend", value: "weekend" },
    ],
    price: [
      { id: "price-free", label: isPortuguese ? "🆓 Grátis" : "🆓 Free", value: "free" },
      { id: "price-under-25", label: "💰 Under £25", value: "under-25" },
    ],
    culture: [
      { id: "culture-palop", label: "🌍 PALOP", value: "palop" },
      { id: "culture-brazilian", label: "🇧🇷 Brazilian", value: "brazilian" },
      { id: "culture-portuguese", label: "🇵🇹 Portuguese", value: "portuguese" },
    ],
    type: [
      { id: "type-music", label: isPortuguese ? "🎵 Música" : "🎵 Music", value: "music" },
      { id: "type-business", label: isPortuguese ? "💼 Negócios" : "💼 Business", value: "business" },
      { id: "type-cultural", label: isPortuguese ? "🎭 Cultural" : "🎭 Cultural", value: "cultural" },
    ],
  }), [isPortuguese]);

  const handleQuickFilter = (category: string, value: string) => {
    const newFilters = { ...filters };
    
    switch (category) {
      case 'time':
        if (value === 'tonight') {
          const today = new Date();
          newFilters.dateRange = {
            start: today.toISOString().split('T')[0],
            end: today.toISOString().split('T')[0]
          };
        } else if (value === 'weekend') {
          const today = new Date();
          const saturday = new Date(today);
          saturday.setDate(today.getDate() + (6 - today.getDay()));
          const sunday = new Date(saturday);
          sunday.setDate(saturday.getDate() + 1);
          
          newFilters.dateRange = {
            start: saturday.toISOString().split('T')[0],
            end: sunday.toISOString().split('T')[0]
          };
        }
        break;
        
      case 'price':
        if (value === 'free') {
          newFilters.priceRange = { min: 0, max: 0 };
        } else if (value === 'under-25') {
          newFilters.priceRange = { min: 0, max: 25 };
        }
        break;
        
      case 'culture':
        newFilters.tags = [...(newFilters.tags || []), value];
        break;
        
      case 'type':
        newFilters.category = value;
        break;
    }
    
    onFiltersChange(newFilters);
  };

  const handleSuggestionClick = (query: string) => {
    onSearchChange(query);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const activeFiltersCount = Object.keys(filters).length + (searchQuery ? 1 : 0);

  return (
    <div className={`mobile-events-interface ${className}`}>
      {/* Performance Optimizer */}
      <EventPerformanceOptimizer
        events={events}
        onFilteredEvents={setOptimizedEvents}
      />

      {/* Mobile Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isPortuguese ? "Procurar eventos portugueses..." : "Find Portuguese events..."}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 text-sm"
            />
          </div>

          {/* Cultural Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {culturalSuggestions.map((suggestion) => (
              <button
                key={suggestion.text}
                onClick={() => handleSuggestionClick(suggestion.query)}
                className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors font-medium"
              >
                {suggestion.text}
              </button>
            ))}
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors min-h-[40px]"
              >
                <FunnelIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {isPortuguese ? "Filtros" : "Filters"}
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  {isPortuguese ? "Limpar" : "Clear"}
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ListBulletIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Quick Filters */}
              <QuickFiltersSystem
                onFilterChange={(newFilters) => {
                  Object.entries(newFilters).forEach(([category, values]) => {
                    if (Array.isArray(values) && values.length > 0) {
                      handleQuickFilter(category, values[0]);
                    }
                  });
                }}
                activeFilters={filters}
                showFilterCounts={true}
                filterCounts={{
                  'time-tonight': optimizedEvents.filter(e => {
                    const today = new Date().toDateString();
                    return new Date(e.date).toDateString() === today;
                  }).length,
                  'price-free': optimizedEvents.filter(e => e.price === 0).length,
                  'culture-palop': optimizedEvents.filter(e => 
                    e.tags.some(tag => ['angola', 'mozambique', 'cape-verde', 'palop'].includes(tag.toLowerCase()))
                  ).length,
                  'type-music': optimizedEvents.filter(e => 
                    e.category.toLowerCase().includes('music') || 
                    e.tags.some(tag => tag.toLowerCase().includes('music'))
                  ).length,
                }}
              />

              {/* Advanced Category Filters */}
              <SwipeEventNavigation
                onCategorySelect={(categoryId) => {
                  if (categoryId === 'tonight') {
                    handleQuickFilter('time', 'tonight');
                  } else if (categoryId === 'weekend') {
                    handleQuickFilter('time', 'weekend');
                  } else if (categoryId === 'free') {
                    handleQuickFilter('price', 'free');
                  } else if (categoryId === 'palop-culture') {
                    handleQuickFilter('culture', 'palop');
                  } else {
                    handleQuickFilter('type', categoryId);
                  }
                }}
                selectedCategory={filters.category}
                showCounts={true}
                categoryCounts={{
                  tonight: optimizedEvents.filter(e => {
                    const today = new Date().toDateString();
                    return new Date(e.date).toDateString() === today;
                  }).length,
                  weekend: optimizedEvents.filter(e => {
                    const eventDay = new Date(e.date).getDay();
                    return eventDay === 0 || eventDay === 6; // Sunday or Saturday
                  }).length,
                  free: optimizedEvents.filter(e => e.price === 0).length,
                  'palop-culture': optimizedEvents.filter(e => 
                    e.tags.some(tag => ['angola', 'mozambique', 'cape-verde', 'palop'].includes(tag.toLowerCase()))
                  ).length,
                  cultural: optimizedEvents.filter(e => e.category.toLowerCase().includes('cultural')).length,
                  business: optimizedEvents.filter(e => e.category.toLowerCase().includes('business')).length,
                }}
                enableVoiceAnnouncements={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            {isPortuguese ? "Carregando eventos..." : "Loading events..."}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>
              {optimizedEvents.length} {isPortuguese ? "eventos encontrados" : "events found"}
            </span>
            <span className="text-xs bg-white px-2 py-1 rounded-full">
              {viewMode === 'grid' ? '📱 Grid' : '📋 List'}
            </span>
          </div>
        )}
      </div>

      {/* Export view mode for parent component */}
      <div className="sr-only" data-view-mode={viewMode}></div>
    </div>
  );
}