"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MusicalNoteIcon,
  HeartIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface CommunityOption {
  id: string;
  title: string;
  benefit: string;
  details?: string;
  icon: React.ComponentType<any>;
  gradient: string;
  culturalSymbols: string;
}

interface StreamlinedCommunitySelectorProps {
  onSelection?: (optionId: string) => void;
  className?: string;
}

const communityOptions: CommunityOption[] = [
  {
    id: "cultural_events",
    title: "Cultural Events",
    benefit: "Discover authentic experiences",
    icon: MusicalNoteIcon,
    gradient: "from-purple-500 to-pink-500",
    culturalSymbols: "🎵🎭🎪",
  },
  {
    id: "meet_people",
    title: "Meet People",
    benefit: "Find meaningful connections",
    details:
      "Make friends who share your culture and values. Weekly meetups and group activities—simple and genuine.",
    icon: HeartIcon,
    gradient: "from-red-500 to-rose-500",
    culturalSymbols: "💕❤️🤝",
  },
  {
    id: "business_network",
    title: "Business Network",
    benefit: "Connect with entrepreneurs",
    icon: UserGroupIcon,
    gradient: "from-blue-500 to-indigo-500",
    culturalSymbols: "💼🤝💰",
  },
  {
    id: "student_life",
    title: "Student Life",
    benefit: "University community access",
    icon: AcademicCapIcon,
    gradient: "from-green-500 to-teal-500",
    culturalSymbols: "🎓📚🏫",
  },
];

export default function StreamlinedCommunitySelector({
  onSelection,
  className = "",
}: StreamlinedCommunitySelectorProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showNext, setShowNext] = useState(false);

  const handleSelection = (optionId: string) => {
    setSelectedOption(optionId);
    setShowNext(true);

    // Call parent selection handler if provided
    if (onSelection) {
      onSelection(optionId);
    }
  };

  const handleNext = () => {
    // Route based on selection - you can customize these routes
    const routes = {
      cultural_events: "/events",
      meet_people: "/matches",
      business_network: "/business-directory",
      student_life: "/students",
    };

    const route = routes[selectedOption as keyof typeof routes] || "/signup";
    window.location.href = route;
  };

  return (
    <section
      className={`py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50 section-spacing ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            What brings you to our community?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-600"
          >
            Choose what interests you most in the Portuguese-speaking community
          </motion.p>

          {/* Portuguese-speaking nations representation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-1 mt-4 text-lg"
          >
            🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱
          </motion.div>
        </div>

        {/* Expanded Grid Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {communityOptions.map((option, index) => {
              const IconComponent = option.icon;
              const isSelected = selectedOption === option.id;

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleSelection(option.id)}
                  className={`
                    relative p-4 sm:p-6 bg-white rounded-2xl border-2 transition-all duration-300 
                    min-h-[180px] sm:min-h-[200px]
                    hover:shadow-xl hover:-translate-y-1 active:scale-95
                    ${
                      isSelected
                        ? "border-primary-500 bg-primary-50 shadow-lg"
                        : "border-gray-200 hover:border-primary-300"
                    }
                  `}
                  style={{ touchAction: "manipulation" }}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <ArrowRightIcon className="w-3 h-3 text-white" />
                    </motion.div>
                  )}

                  <div className="flex flex-col items-center text-center h-full">
                    {/* Icon with gradient background */}
                    <div
                      className={`
                      w-12 h-12 sm:w-14 sm:h-14 mb-3 rounded-xl flex items-center justify-center
                      bg-gradient-to-br ${option.gradient} shadow-lg
                    `}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    {/* Cultural symbols */}
                    <div className="text-lg sm:text-xl mb-2">
                      {option.culturalSymbols}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 leading-tight">
                      {option.title}
                    </h3>

                    {/* Benefit */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                      {option.benefit}
                    </p>

                    {/* Optional details for richer context */}
                    {option.details && (
                      <p className="mt-2 text-xs text-gray-500 leading-snug hidden md:block">
                        {option.details}
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next Button - appears after selection */}
          {showNext && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mr-2 gap-1">
                  <span className="text-sm">🇵🇹</span>
                  <span className="text-sm">🇧🇷</span>
                  <span className="text-sm">🇦🇴</span>
                </div>
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          )}

          {/* Trust indicators */}
      <div className="text-center mt-6 text-sm text-gray-500">
            <div className="flex justify-center items-center gap-4">
              <span>Portuguese speakers</span>
              <span>•</span>
              <span>Free to Join</span>
              <span>•</span>
        <span>United Kingdom–Wide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
