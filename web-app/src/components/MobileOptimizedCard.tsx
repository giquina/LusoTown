"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
// Removed luxury imports - using standard components
import {
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';

interface CardAction {
  label: string;
  labelPt: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

interface CardBadge {
  text: string;
  textPt: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
  icon?: React.ComponentType<{ className?: string }>;
}

interface MobileOptimizedCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageFallback?: string;
  link?: string;
  category?: string;
  location?: string;
  date?: string;
  time?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  attendees?: number;
  maxAttendees?: number;
  badges?: CardBadge[];
  actions?: CardAction[];
  onFavorite?: () => void;
  onShare?: () => void;
  isFavorited?: boolean;
  className?: string;
  variant?: 'event' | 'business' | 'member' | 'default';
  priority?: boolean;
}

export default function MobileOptimizedCard({
  title,
  description,
  imageUrl,
  imageFallback = '/images/placeholder.jpg',
  link,
  category,
  location,
  date,
  time,
  price,
  currency = '£',
  rating,
  reviewCount,
  attendees,
  maxAttendees,
  badges = [],
  actions = [],
  onFavorite,
  onShare,
  isFavorited = false,
  className = '',
  variant = 'default',
  priority = false
}: MobileOptimizedCardProps) {
  const { language, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Lusophone text length adjustment
  const isPortuguese = language === 'pt';
  const maxDescriptionLength = isPortuguese ? 120 : 150; // Lusophone text is typically 20-30% longer
  const shouldTruncate = description.length > maxDescriptionLength;
  const displayDescription = shouldTruncate && !showFullDescription 
    ? `${description.substring(0, maxDescriptionLength)}...` 
    : description;

  // Badge colors with Portuguese flag theme
  const badgeColors = {
    red: 'bg-red-100 text-red-800 border-red-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const CardWrapper = link 
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={link} className="block">
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  return (
    <CardWrapper>
      <motion.div
        className={`elite-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onTapStart={() => setIsPressed(true)}
        onTapCancel={() => setIsPressed(false)}
        onTapEnd={() => setIsPressed(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Image Section */}
        {(imageUrl || imageFallback) && (
          <div className="relative h-48 sm:h-52 overflow-hidden">
            <Image
              src={imageError ? imageFallback : imageUrl || imageFallback}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            
            {/* Category Badge */}
            {category && (
              <motion.div 
                className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm border border-white/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {category}
              </motion.div>
            )}
            
            {/* Price Badge */}
            {price !== undefined && (
              <motion.div 
                className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currency}{price}
              </motion.div>
            )}
            
            {/* Action Buttons Overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              {onShare && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onShare();
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-white/50"
                  hapticFeedback="light"
                >
                  <ShareIcon className="w-4 h-4 text-gray-700" />
                </div>
              )}
              
              {onFavorite && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFavorite();
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-white/50"
                  hapticFeedback="medium"
                >
                  {isFavorited ? (
                    <HeartIconSolid className="w-4 h-4 text-red-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-gray-700" />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="mb-3">
            {/* Title - Optimized for Lusophone text length */}
            <h3 className={`font-bold text-gray-900 mb-2 leading-tight ${
              isPortuguese ? 'text-lg' : 'text-lg sm:text-xl'
            } line-clamp-2`}>
              {title}
            </h3>
            
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${badgeColors[badge.color]}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {badge.icon && <badge.icon className="w-3 h-3" />}
                    {isPortuguese ? badge.textPt : badge.text}
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Rating for business variant */}
            {variant === 'business' && rating && (
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {rating} {reviewCount && `(${reviewCount})`}
                </span>
              </div>
            )}
          </div>

          {/* Description - Lusophone text aware */}
          <div className="mb-4">
            <p className={`text-gray-600 leading-relaxed ${
              isPortuguese ? 'text-sm' : 'text-sm sm:text-base'
            }`}>
              {displayDescription}
            </p>
            
            {shouldTruncate && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFullDescription(!showFullDescription);
                }}
                className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors mt-2 min-h-[44px] flex items-center"
              >
                {showFullDescription 
                  ? (isPortuguese ? 'Ver menos' : 'Show less')
                  : (isPortuguese ? 'Ver mais' : 'Show more')
                }
              </button>
            )}
          </div>

          {/* Event/Business Details */}
          <div className="space-y-2 mb-4">
            {location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                <span className="line-clamp-1 break-words">{location}</span>
              </div>
            )}
            
            {date && (
              <div className="flex items-center text-sm text-gray-600">
                <ClockIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                <span>
                  {date} {time && `• ${time}`}
                </span>
              </div>
            )}
            
            {variant === 'event' && attendees !== undefined && maxAttendees && (
              <div className="flex items-center text-sm text-gray-600">
                <UsersIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                <span>
                  {attendees}/{maxAttendees} {isPortuguese ? 'participantes' : 'attending'}
                </span>
              </div>
            )}
          </div>

          {/* Attendance Progress Bar for Events */}
          {variant === 'event' && attendees !== undefined && maxAttendees && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">
                  {isPortuguese ? 'Ocupação' : 'Occupancy'}
                </span>
                <span className="text-xs font-medium text-primary-600">
                  {Math.round((attendees / maxAttendees) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(attendees / maxAttendees) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className={`flex gap-2 ${actions.length === 1 ? '' : actions.length === 2 ? 'grid grid-cols-2' : 'flex-wrap'}`}>
              {actions.map((action, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!action.disabled) {
                      action.onClick();
                    }
                  }}
                  className={`
                    flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 text-center min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-xl
                    ${action.variant === 'primary'
                      ? 'bg-gradient-to-r from-red-600 via-red-700 to-green-600 text-white hover:from-red-700 hover:via-red-800 hover:to-green-700'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }
                    ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  hapticFeedback={action.variant === 'primary' ? 'medium' : 'light'}
                  disabled={action.disabled}
                >
                  <span className="truncate">
                    {isPortuguese ? action.labelPt : action.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lusophone Cultural Accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-0"
          animate={{ 
            opacity: isPressed ? 0.8 : 0,
            scaleX: isPressed ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </CardWrapper>
  );
}

// Export additional card variants for specific use cases
export function EventCard(props: MobileOptimizedCardProps) {
  return <MobileOptimizedCard {...props} variant="event" />;
}

export function BusinessCard(props: MobileOptimizedCardProps) {
  return <MobileOptimizedCard {...props} variant="business" />;
}

export function MemberCard(props: MobileOptimizedCardProps) {
  return <MobileOptimizedCard {...props} variant="member" />;
}