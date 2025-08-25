"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

// Lusophone cultural event categories
const EVENT_CATEGORIES = [
  {
    id: "tonight",
    nameEn: "Tonight",
    namePt: "Hoje à Noite",
    icon: "🌙",
    color: "from-purple-500 to-blue-500",
    description: {
      en: "Events happening tonight",
      pt: "Eventos hoje à noite"
    }
  },
  {
    id: "weekend", 
    nameEn: "Weekend",
    namePt: "Fim de Semana",
    icon: "🎉",
    color: "from-green-500 to-emerald-500",
    description: {
      en: "Weekend activities",
      pt: "Atividades de fim de semana"
    }
  },
  {
    id: "free",
    nameEn: "Free",
    namePt: "Grátis",
    icon: "🆓",
    color: "from-blue-500 to-cyan-500",
    description: {
      en: "Free events",
      pt: "Eventos gratuitos"
    }
  },
  {
    id: "palop-culture",
    nameEn: "PALOP Culture",
    namePt: "Cultura PALOP",
    icon: "🌍",
    color: "from-red-500 to-orange-500",
    description: {
      en: "Portuguese-speaking African countries culture",
      pt: "Cultura dos países africanos de língua portuguesa"
    }
  },
  {
    id: "cultural",
    nameEn: "Cultural",
    namePt: "Cultural",
    icon: "🎭",
    color: "from-pink-500 to-rose-500",
    description: {
      en: "Traditional cultural events",
      pt: "Eventos culturais tradicionais"
    }
  },
  {
    id: "business",
    nameEn: "Business",
    namePt: "Negócios",
    icon: "💼",
    color: "from-gray-600 to-slate-600",
    description: {
      en: "Networking and business events",
      pt: "Eventos de networking e negócios"
    }
  },
];

interface SwipeEventNavigationProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory?: string;
  showCounts?: boolean;
  categoryCounts?: Record<string, number>;
  enableVoiceAnnouncements?: boolean;
}

export default function SwipeEventNavigation({
  onCategorySelect,
  selectedCategory,
  showCounts = false,
  categoryCounts = {},
  enableVoiceAnnouncements = false,
}: SwipeEventNavigationProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryClick = (categoryId: string, index: number) => {
    setCurrentIndex(index);
    onCategorySelect(categoryId);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {isPortuguese ? "Categorias de Eventos" : "Event Categories"}
        </h3>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={isPortuguese ? "Procurar eventos portugueses..." : "Find Portuguese events..."}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200 text-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Cultural Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {["Fado", "Santos Populares", "Futebol", "Brasileira"].map((suggestion) => (
            <button
              key={suggestion}
              className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 font-medium">
            {isPortuguese ? "Ordenar por:" : "Sort by:"}
          </span>
          <div className="flex gap-2">
            {[
              { id: "today", label: isPortuguese ? "Hoje" : "Today" },
              { id: "week", label: isPortuguese ? "Semana" : "This Week" },
              { id: "price", label: isPortuguese ? "Preço" : "Price" },
              { id: "distance", label: isPortuguese ? "Distância" : "Distance" }
            ].map((sortOption) => (
              <button
                key={sortOption.id}
                className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                {sortOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Categories Grid */}
      <div className="grid grid-cols-2 gap-3">
        {EVENT_CATEGORIES.map((category, index) => {
          const isActive = selectedCategory === category.id;
          const count = categoryCounts[category.id] || 0;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, index)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation text-left overflow-hidden min-h-[100px] flex flex-col justify-between ${
                isActive
                  ? `border-transparent bg-gradient-to-br ${category.color} text-white shadow-lg transform scale-105`
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }`}
              whileHover={{ scale: isActive ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              title={isPortuguese ? category.description.pt : category.description.en}
            >
              {/* Portuguese cultural pattern overlay */}
              {isActive && (
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.3'%3E%3Cpath d='M20 20l-10-10h20l-10 10zm0 0l10 10H10l10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                </div>
              )}
              
              <div className="relative z-10">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className={`text-sm font-semibold mb-1 ${
                  isActive ? "text-white" : "text-gray-900"
                }`}>
                  {isPortuguese ? category.namePt : category.nameEn}
                </div>
              </div>
              
              {showCounts && count > 0 && (
                <div className="relative z-10 mt-auto">
                  <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-white" : "bg-green-500"
                    }`}></span>
                    {count} {isPortuguese ? "eventos" : "events"}
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
