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
  },
  {
    id: "weekend",
    nameEn: "Weekend",
    namePt: "Fim de Semana",
    icon: "🎉",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "cultural",
    nameEn: "Cultural",
    namePt: "Cultural",
    icon: "🎭",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "business",
    nameEn: "Business",
    namePt: "Negócios",
    icon: "💼",
    color: "from-blue-500 to-indigo-500",
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

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-3">
        {EVENT_CATEGORIES.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id, index)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation ${
              selectedCategory === category.id
                ? "border-green-400 bg-gradient-to-r from-green-50 to-red-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {isPortuguese ? category.namePt : category.nameEn}
            </div>
            {showCounts && categoryCounts[category.id] && (
              <div className="text-xs text-gray-600">
                {categoryCounts[category.id]} {isPortuguese ? "eventos" : "events"}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
