"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  CurrencyPoundIcon,
  ShareIcon,
  CalendarIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import AdvancedSkeletonLoader from './AdvancedSkeletonLoader';
import {
  PortugueseHeartButton,
  PortugueseSaveButton,
  PortugueseStarRating,
  PortugueseRippleButton,
  PortugueseFlagWave,
  PortugueseActivityIndicator,
  PortugueseCompletionCelebration,
} from './PortugueseMicroInteractions';
import PullToRefreshWrapper from './PullToRefreshWrapper';
import SmartSwipeNavigation from './SmartSwipeNavigation';
// Event interface for enhanced card
interface EnhancedEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  address: string;
  price: number;
  currency: string;
  category: string;
  culturalTags: string[];
  imageUrl?: string;
  attendeeCount: number;
  maxAttendees?: number;
  rating: number;
  isLiked: boolean;
  isSaved: boolean;
  isFeatured: boolean;
  distance?: number;
  travelTime?: string;
  organizerName: string;
  organizerAvatar?: string;
  lastUpdated: Date;
}
interface EnhancedEventCardProps {
  event: EnhancedEvent;
  onLike?: (eventId: string) => void;
  onSave?: (eventId: string) => void;
  onShare?: (event: EnhancedEvent) => void;
  onView?: (event: EnhancedEvent) => void;
  onRate?: (eventId: string, rating: number) => void;
  loading?: boolean;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}
export default function EnhancedEventCard({
  event,
  onLike,
  onSave,
  onShare,
  onView,
  onRate,
  loading = false,
  className = '',
  showActions = true,
  compact = false,
}: EnhancedEventCardProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  // Loading state
  if (loading) {
    return <AdvancedSkeletonLoader variant="event-card" portugueseTheme={true} />;
  }
  // Format price
  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return isPortuguese ? 'Grátis' : 'Free';
    return `${currency}${price.toFixed(2)}`;
  };
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  // Handle interactions
  const handleLike = () => {
    if (onLike) onLike(event.id);
    if (!event.isLiked) {
      setShowCelebration(true);
    }
  };
  const handleSave = () => {
    if (onSave) onSave(event.id);
    if (!event.isSaved) {
      setShowCelebration(true);
    }
  };
  const handleShare = async () => {
    if (onShare) {
      onShare(event);
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: `${window.location.origin}/events/${event.id}`,
        });
      } catch (error) {
        }
    }
  };
  const handleView = () => {
    if (onView) onView(event);
  };
  const handleRate = (rating: number) => {
    if (onRate) onRate(event.id, rating);
  };
  return (
    <>
      <motion.div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        layout
      >
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {event.imageUrl && !imageError && (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AdvancedSkeletonLoader variant="event-card" count={1} />
                </div>
              )}
              <motion.img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoading ? 0 : 1 }}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            </>
          )}
          {/* Fallback when no image or error */}
          {(!event.imageUrl || imageError) && !imageLoading && (
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-red-400 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🎭</div>
                <div className="text-sm font-medium">{event.category}</div>
              </div>
            </div>
          )}
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Lusophone Flag Indicator */}
          <div className="absolute top-3 right-3">
            <PortugueseFlagWave size="w-8 h-5" animate={true} />
          </div>
          {/* Featured Badge */}
          {event.isFeatured && (
            <motion.div
              className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ⭐ {isPortuguese ? 'Destaque' : 'Featured'}
            </motion.div>
          )}
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </div>
          </div>
          {/* Distance Info */}
          {event.distance && (
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" />
                {event.distance.toFixed(1)}km
              </div>
            </div>
          )}
        </div>
        {/* Event Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <motion.h3 
                className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 cursor-pointer"
                onClick={handleView}
                whileHover={{ scale: 1.01 }}
              >
                {event.title}
              </motion.h3>
              {!compact && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {event.description}
                </p>
              )}
            </div>
            {/* Quick Actions */}
            {showActions && (
              <div className="flex items-center gap-2 ml-3">
                <PortugueseHeartButton
                  isLiked={event.isLiked}
                  onToggle={handleLike}
                  size="w-5 h-5"
                />
                <PortugueseSaveButton
                  isSaved={event.isSaved}
                  onToggle={handleSave}
                  size="w-5 h-5"
                />
              </div>
            )}
          </div>
          {/* Event Details */}
          <div className="space-y-2 mb-4">
            {/* Date and Time */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
              <span>{formatDate(event.date)}</span>
              <ClockIcon className="w-4 h-4 flex-shrink-0 ml-2" />
              <span>{event.startTime}</span>
              {event.endTime && <span>- {event.endTime}</span>}
            </div>
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPinIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
              {event.travelTime && (
                <span className="text-green-600 font-medium ml-auto">
                  {event.travelTime}
                </span>
              )}
            </div>
            {/* Attendance and Price */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <UsersIcon className="w-4 h-4" />
                <span>
                  {event.attendeeCount}
                  {event.maxAttendees && `/${event.maxAttendees}`}
                  {' '}
                  {isPortuguese ? 'confirmados' : 'attending'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CurrencyPoundIcon className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-900">
                  {formatPrice(event.price, event.currency)}
                </span>
              </div>
            </div>
          </div>
          {/* Cultural Tags */}
          {event.culturalTags && event.culturalTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {event.culturalTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {event.culturalTags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{event.culturalTags.length - 3}
                </span>
              )}
            </div>
          )}
          {/* Rating */}
          {event.rating > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <PortugueseStarRating
                rating={event.rating}
                onRate={handleRate}
                size="w-4 h-4"
                readonly={!onRate}
              />
              <span className="text-sm text-gray-600">
                ({event.rating.toFixed(1)})
              </span>
            </div>
          )}
          {/* Organizer */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-red-400 rounded-full flex items-center justify-center">
              {event.organizerAvatar ? (
                <img
                  src={event.organizerAvatar}
                  alt={event.organizerName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-bold">
                  {event.organizerName.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {event.organizerName}
              </div>
              <div className="text-xs text-gray-500">
                {isPortuguese ? 'Organizador' : 'Organizer'}
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-2">
              <PortugueseRippleButton
                onClick={handleView}
                className="flex-1 bg-gradient-to-r from-green-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold text-center"
                Lusophone={true}
              >
                {isPortuguese ? 'Ver Detalhes' : 'View Details'}
              </PortugueseRippleButton>
              <motion.button
                onClick={handleShare}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShareIcon className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          )}
          {/* Activity Indicators */}
          {!compact && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <PortugueseActivityIndicator
                count={event.attendeeCount}
                icon={<UsersIcon className="w-4 h-4 text-green-600" />}
                label={isPortuguese ? 'interessados' : 'interested'}
                animate={true}
              />
              <div className="text-xs text-gray-500">
                {isPortuguese ? 'Actualizado ' : 'Updated '}
                {new Date(event.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      {/* Success Celebration */}
      <PortugueseCompletionCelebration
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </>
  );
}
// Grid wrapper with advanced features
export function EnhancedEventGrid({
  events,
  loading = false,
  onRefresh,
  onCategoryChange,
  className = '',
  ...cardProps
}: {
  events: EnhancedEvent[];
  loading?: boolean;
  onRefresh?: () => Promise<void>;
  onCategoryChange?: (categoryId: string) => void;
  className?: string;
} & Omit<EnhancedEventCardProps, 'event'>) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const gridContent = (
    <div className={`${className}`}>
      {/* Swipe Navigation */}
      {onCategoryChange && (
        <div className="mb-6">
          <SmartSwipeNavigation
            onCategoryChange={onCategoryChange}
            autoPlay={false}
            showIndicators={true}
          />
        </div>
      )}
      {/* Events Grid */}
      {loading ? (
        <AdvancedSkeletonLoader variant="event-grid" count={6} />
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isPortuguese ? 'Nenhum evento encontrado' : 'No events found'}
          </h3>
          <p className="text-gray-600">
            {isPortuguese 
              ? 'Tente ajustar os seus filtros ou volte mais tarde.'
              : 'Try adjusting your filters or check back later.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event) => (
            <EnhancedEventCard
              key={event.id}
              event={event}
              {...cardProps}
            />
          ))}
        </div>
      )}
    </div>
  );
  // Wrap with pull-to-refresh if enabled
  if (onRefresh) {
    return (
      <PullToRefreshWrapper onRefresh={onRefresh}>
        {gridContent}
      </PullToRefreshWrapper>
    );
  }
  return gridContent;
}