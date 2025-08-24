"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CulturalFlagCarouselProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  autoPlay?: boolean;
  duration?: number;
}

export function CulturalFlagCarousel({ 
  className = "", 
  size = "lg", 
  autoPlay = true,
  duration = 800 
}: CulturalFlagCarouselProps) {
  const flags = ['🇵🇹', '🇧🇷', '🇦🇴', '🇲🇿', '🇨🇻', '🇬🇼', '🇸🇹', '🇹🇱', '🇲🇴', '🇬🇶'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUKFlag, setShowUKFlag] = useState(false);

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl"
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex === flags.length) {
          setShowUKFlag(true);
          return 0; // Reset to start
        }
        if (nextIndex > flags.length) {
          setShowUKFlag(false);
          return 0;
        }
        setShowUKFlag(false);
        return nextIndex;
      });
    }, duration);
    
    return () => clearInterval(timer);
  }, [autoPlay, duration, flags.length]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showUKFlag ? 'uk' : currentIndex}
          initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 1.2, opacity: 0, rotateY: 90 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className={`${sizeClasses[size]} filter drop-shadow-lg`}
        >
          {showUKFlag ? '🇬🇧' : flags[currentIndex]}
        </motion.div>
      </AnimatePresence>
      
      {/* Flag transition indicator */}
      <motion.div 
        className="ml-4 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {flags.slice(0, 3).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex % 3 ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          />
        ))}
        <div className="w-4 h-2 flex items-center justify-center">
          <span className="text-xs text-gray-500">→</span>
        </div>
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            showUKFlag ? 'bg-secondary-500' : 'bg-gray-300'
          }`}
        />
      </motion.div>
    </div>
  );
}

export default CulturalFlagCarousel;