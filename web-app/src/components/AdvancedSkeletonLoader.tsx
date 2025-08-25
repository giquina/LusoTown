"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useHeritage } from '@/context/HeritageContext';
import { useLanguage } from '@/context/LanguageContext';

// Advanced Skeleton Loading with Portuguese Cultural Elements
interface SkeletonProps {
  className?: string;
  variant?: 'event-card' | 'event-grid' | 'testimonial' | 'business-card' | 'cultural-content';
  count?: number;
  animated?: boolean;
  portugueseTheme?: boolean;
}

const PortugueseGradient = ({ className }: { className: string }) => (
  <motion.div
    className={`bg-gradient-to-r from-green-200 via-white to-red-200 ${className}`}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    }}
    style={{
      backgroundSize: '200% 200%',
    }}
  />
);

const SkeletonPulse = ({ className }: { className: string }) => (
  <motion.div
    className={`bg-gray-200 ${className}`}
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />
);

export function EventCardSkeleton({ portugueseTheme = true }: { portugueseTheme?: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Event Image Skeleton */}
      <div className="relative h-48 overflow-hidden">
        {portugueseTheme ? (
          <PortugueseGradient className="w-full h-full" />
        ) : (
          <SkeletonPulse className="w-full h-full" />
        )}
        
        {/* Portuguese flag corner indicator */}
        {portugueseTheme && (
          <div className="absolute top-3 right-3">
            <motion.div
              className="w-6 h-4 rounded-sm bg-gradient-to-r from-green-500 to-red-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        )}
        
        {/* Event category badge */}
        <div className="absolute top-3 left-3">
          <SkeletonPulse className="w-20 h-6 rounded-full" />
        </div>
        
        {/* Featured badge */}
        <div className="absolute bottom-3 left-3">
          <SkeletonPulse className="w-16 h-5 rounded-full" />
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-6">
        {/* Title and subtitle */}
        <div className="mb-4">
          <SkeletonPulse className="h-6 rounded mb-2" />
          <SkeletonPulse className="h-4 rounded w-3/4" />
        </div>
        
        {/* Event details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded" />
            <SkeletonPulse className="h-4 rounded flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded" />
            <SkeletonPulse className="h-4 rounded w-2/3" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded" />
            <SkeletonPulse className="h-4 rounded w-1/2" />
          </div>
        </div>
        
        {/* Price and attendance */}
        <div className="flex items-center justify-between mb-4">
          <SkeletonPulse className="h-8 w-20 rounded-lg" />
          <SkeletonPulse className="h-6 w-24 rounded-full" />
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <SkeletonPulse className="h-12 flex-1 rounded-xl" />
          <SkeletonPulse className="h-12 w-12 rounded-xl" />
          <SkeletonPulse className="h-12 w-12 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6, portugueseTheme = true }: { count?: number; portugueseTheme?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <EventCardSkeleton portugueseTheme={portugueseTheme} />
        </motion.div>
      ))}
    </div>
  );
}

export function BusinessCardSkeleton({ portugueseTheme = true }: { portugueseTheme?: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      {/* Business header */}
      <div className="flex items-start gap-4 mb-4">
        <SkeletonPulse className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <SkeletonPulse className="h-5 rounded mb-2" />
          <SkeletonPulse className="h-4 rounded w-2/3 mb-1" />
          <SkeletonPulse className="h-3 rounded w-1/2" />
        </div>
        {portugueseTheme && (
          <motion.div
            className="w-8 h-6 rounded bg-gradient-to-r from-green-400 to-red-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Business details */}
      <div className="space-y-2 mb-4">
        <SkeletonPulse className="h-4 rounded" />
        <SkeletonPulse className="h-4 rounded w-3/4" />
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <SkeletonPulse className="h-9 flex-1 rounded-lg" />
        <SkeletonPulse className="h-9 w-9 rounded-lg" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton({ portugueseTheme = true }: { portugueseTheme?: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Quote content */}
      <div className="mb-4">
        <SkeletonPulse className="h-4 rounded mb-2" />
        <SkeletonPulse className="h-4 rounded mb-2" />
        <SkeletonPulse className="h-4 rounded w-2/3" />
      </div>
      
      {/* User info */}
      <div className="flex items-center gap-3">
        <SkeletonPulse className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <SkeletonPulse className="h-4 rounded mb-1" />
          <SkeletonPulse className="h-3 rounded w-2/3" />
        </div>
        {portugueseTheme && (
          <motion.div
            className="flex gap-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-4 h-4 bg-yellow-300 rounded-sm" />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function CulturalContentSkeleton({ portugueseTheme = true }: { portugueseTheme?: boolean }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-8 border border-gray-100">
      {/* Header with Portuguese cultural elements */}
      <div className="flex items-center gap-4 mb-6">
        {portugueseTheme ? (
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <SkeletonPulse className="w-12 h-12 rounded-full" />
        )}
        <div className="flex-1">
          <SkeletonPulse className="h-6 rounded mb-2" />
          <SkeletonPulse className="h-4 rounded w-3/4" />
        </div>
      </div>
      
      {/* Cultural content */}
      <div className="space-y-3">
        <SkeletonPulse className="h-4 rounded" />
        <SkeletonPulse className="h-4 rounded" />
        <SkeletonPulse className="h-4 rounded w-5/6" />
      </div>
    </div>
  );
}

// Main Advanced Skeleton Loader Component
export default function AdvancedSkeletonLoader({
  variant = 'event-card',
  count = 1,
  animated = true,
  portugueseTheme = true,
  className = '',
}: SkeletonProps) {
  const { language } = useLanguage();
  const { colors } = useHeritage();
  
  const renderSkeleton = () => {
    switch (variant) {
      case 'event-card':
        return <EventCardSkeleton portugueseTheme={portugueseTheme} />;
      case 'event-grid':
        return <EventGridSkeleton count={count} portugueseTheme={portugueseTheme} />;
      case 'business-card':
        return <BusinessCardSkeleton portugueseTheme={portugueseTheme} />;
      case 'testimonial':
        return <TestimonialSkeleton portugueseTheme={portugueseTheme} />;
      case 'cultural-content':
        return <CulturalContentSkeleton portugueseTheme={portugueseTheme} />;
      default:
        return <EventCardSkeleton portugueseTheme={portugueseTheme} />;
    }
  };

  if (variant === 'event-grid') {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
}

// Loading states for specific components
export const LoadingStates = {
  EventCard: () => <EventCardSkeleton />,
  EventGrid: (props: { count?: number }) => <EventGridSkeleton {...props} />,
  BusinessCard: () => <BusinessCardSkeleton />,
  Testimonial: () => <TestimonialSkeleton />,
  CulturalContent: () => <CulturalContentSkeleton />,
};