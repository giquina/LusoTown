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
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      id: "time-weekend",
      label: isPortuguese ? "🎉 Fim de Semana" : "🎉 Weekend", 
      category: "time",
      value: "weekend",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: "price-free",
      label: isPortuguese ? "🆓 Grátis" : "🆓 Free",
      category: "price",
      value: "free",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "culture-palop",
      label: isPortuguese ? "🌍 PALOP" : "🌍 PALOP",
      category: "culture",
      value: "palop",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: "type-music",
      label: isPortuguese ? "🎵 Música" : "🎵 Music",
      category: "type",
      value: "music",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: "type-business",
      label: isPortuguese ? "💼 Negócios" : "💼 Business",
      category: "type",
      value: "business",
      gradient: "from-gray-600 to-slate-600"
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
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation text-left overflow-hidden min-h-[80px] flex flex-col justify-center ${
                isActive
                  ? `border-transparent bg-gradient-to-br ${filter.gradient} text-white shadow-lg`
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Portuguese flag pattern overlay for active filters */}
              {isActive && (
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                </div>
              )}
              
              <div className={`font-semibold text-sm mb-1 relative z-10 ${
                isActive ? "text-white" : "text-gray-900"
              }`}>
                {filter.label}
              </div>
              {showFilterCounts && count > 0 && (
                <div className={`text-xs font-medium relative z-10 flex items-center gap-1 ${
                  isActive ? "text-white/90" : "text-gray-600"
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    isActive ? "bg-white/60" : "bg-green-500"
                  }`}></span>
                  {count} {isPortuguese ? "eventos" : "events"}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
