"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Event } from "@/lib/events";

interface EventPerformanceOptimizerProps {
  events: Event[];
  onFilteredEvents: (events: Event[]) => void;
  className?: string;
}

export default function EventPerformanceOptimizer({
  events,
  onFilteredEvents,
  className = "",
}: EventPerformanceOptimizerProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  // Virtual scrolling for performance
  const virtualizedEvents = useMemo(() => {
    return events.slice(visibleRange.start, visibleRange.end);
  }, [events, visibleRange]);

  // Image lazy loading optimization
  const preloadEventImages = (eventList: Event[]) => {
    eventList.forEach((event) => {
      if (event.images && event.images.length > 0) {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, event.images![0]]));
        };
        img.src = event.images[0];
      }
    });
  };

  useEffect(() => {
    // Preload images for visible events
    preloadEventImages(virtualizedEvents);
  }, [virtualizedEvents]);

  // Mobile-specific filtering for performance
  const mobileOptimizedEvents = useMemo(() => {
    // For mobile, prioritize events with images and closer dates
    const prioritized = events.sort((a, b) => {
      // Events with images first
      const aHasImage = a.images && a.images.length > 0 ? 1 : 0;
      const bHasImage = b.images && b.images.length > 0 ? 1 : 0;
      
      if (aHasImage !== bHasImage) {
        return bHasImage - aHasImage;
      }
      
      // Then by date (closer events first)
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      const now = Date.now();
      
      const aDiff = Math.abs(aDate - now);
      const bDiff = Math.abs(bDate - now);
      
      return aDiff - bDiff;
    });
    
    return prioritized;
  }, [events]);

  useEffect(() => {
    onFilteredEvents(mobileOptimizedEvents);
  }, [mobileOptimizedEvents, onFilteredEvents]);

  // Performance monitoring
  useEffect(() => {
    // Monitor and optimize for mobile
    if (typeof window !== 'undefined') {
      const connection = (navigator as any).connection;
      
      if (connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g')) {
        // Reduce initial load for slower connections
        setVisibleRange({ start: 0, end: 6 });
      }
    }
  }, []);

  return (
    <div className={`mobile-performance-optimizer ${className}`}>
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded z-50">
          Loaded: {loadedImages.size}/{events.length} images
        </div>
      )}
      
      {/* Connection status indicator */}
      <div className="sr-only">
        {isPortuguese 
          ? `${virtualizedEvents.length} eventos otimizados para dispositivos móveis`
          : `${virtualizedEvents.length} events optimized for mobile`
        }
      </div>
    </div>
  );
}