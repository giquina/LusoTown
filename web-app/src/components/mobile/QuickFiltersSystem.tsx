"use client";

import React from "react";
import { motion } from "framer-motion";
import { FunnelIcon, MapPinIcon, ClockIcon, CurrencyPoundIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface QuickFiltersSystemProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
  showFilterCounts?: boolean;
  filterCounts?: Record<string, number>;
}

export default function QuickFiltersSystem({
  onFilterChange,
  activeFilters,
  showFilterCounts = false,
  filterCounts = {},
}: QuickFiltersSystemProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const quickFilters = [
    {
      id: "time-tonight",
      label: isPortuguese ? "🌙 Hoje à Noite" : "🌙 Tonight",
      category: "time",
      value: "tonight",
    },
    {
      id: "price-free",
      label: isPortuguese ? "🆓 Grátis" : "🆓 Free",
      category: "price",
      value: "free",
    },
    {
      id: "culture-palop",
      label: isPortuguese ? "🌍 PALOP" : "🌍 PALOP",
      category: "culture",
      value: "palop",
    },
    {
      id: "type-music",
      label: isPortuguese ? "🎵 Música" : "🎵 Music",
      category: "type",
      value: "music",
    },
  ];

  const handleFilterClick = (filter: any) => {
    const currentFilters = activeFilters[filter.category] || [];
    const isActive = currentFilters.includes(filter.value);
    
    const updatedFilters = {
      ...activeFilters,
      [filter.category]: isActive
        ? currentFilters.filter((v: string) => v !== filter.value)
        : [...currentFilters, filter.value],
    };

    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3 mb-4">
        <FunnelIcon className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-bold text-gray-900">
          {isPortuguese ? "Filtros Rápidos" : "Quick Filters"}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickFilters.map((filter) => {
          const isActive = activeFilters[filter.category]?.includes(filter.value);
          const count = filterCounts[filter.id] || 0;

          return (
            <motion.button
              key={filter.id}
              onClick={() => handleFilterClick(filter)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 touch-manipulation text-left ${
                isActive
                  ? "border-green-400 bg-gradient-to-r from-green-50 to-red-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium text-sm text-gray-900 mb-1">
                {filter.label}
              </div>
              {showFilterCounts && count > 0 && (
                <div className="text-xs text-gray-600">
                  {count} {isPortuguese ? "resultados" : "results"}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
