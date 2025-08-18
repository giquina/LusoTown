"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  ShareIcon,
  ClockIcon,
  PhotoIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import EventImageWithFallback from "@/components/EventImageWithFallback";
import SaveFavoriteCartButton from "@/components/SaveFavoriteCartButton";
import NetworkPreview from "@/components/NetworkPreview";
import WaitingListButton from "@/components/WaitingListButton";
import { Event } from "@/lib/events";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNetworking } from "@/context/NetworkingContext";
import { formatEventDate } from "@/lib/dateUtils";
import { getCurrentUser } from "@/lib/auth";
import { 
  updateEventAvailability, 
  isEventAvailable, 
  hasWaitingListAvailable, 
  getEventAvailabilityLabel, 
  getEventAvailabilityColor,
  getEventEstimatedAvailability
} from "@/lib/eventAvailability";

interface ImprovedEventCardProps {
  event: Event;
  showPreviewOverlay?: boolean;
  onUpgrade?: () => void;
}

const ImprovedEventCard = ({
  event,
  showPreviewOverlay = false,
  onUpgrade,
}: ImprovedEventCardProps) => {
  const { isSaved } = useCart();
  const { t, language } = useLanguage();
  const isPortuguese = language === "pt";
  const { getConnectionsByEvent } = useNetworking();
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Update event availability status
  const updatedEvent = updateEventAvailability(event);
  const available = isEventAvailable(updatedEvent);
  const waitingListAvailable = hasWaitingListAvailable(updatedEvent);
  const availabilityLabel = getEventAvailabilityLabel(updatedEvent, isPortuguese);
  const availabilityColor = getEventAvailabilityColor(updatedEvent);
  const estimatedAvailability = getEventEstimatedAvailability(updatedEvent, isPortuguese);

  // Get connections for this event
  const eventConnections = getConnectionsByEvent(event.id);

  const formatDate = (dateStr: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateStr, isPortuguese);
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const spotsLeft = event.maxAttendees - event.currentAttendees;
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0;
  const isFull = spotsLeft <= 0;

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Check if this should show preview overlay for free users
  const shouldShowPreview =
    showPreviewOverlay &&
    user?.membershipTier === "free" &&
    event.membershipRequired !== "free";

  const membershipTierNames = {
    core: isPortuguese ? "Comunidade" : "Community",
    premium: isPortuguese ? "Família" : "Family",
  };

  // Photo gallery modal component
  const PhotoGalleryModal = () => (
    <AnimatePresence>
      {showPhotoGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowPhotoGallery(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Event Photos</h3>
              <button
                onClick={() => setShowPhotoGallery(false)}
                className="text-gray-500 hover:text-gray-700 p-3 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {event.photos?.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <EventImageWithFallback
                    src={photo.url}
                    alt={photo.caption || "Event photo"}
                    category={event.category}
                    className="object-cover"
                    width={300}
                    height={300}
                  />
                  {photo.caption && (
                    <p className="mt-2 text-sm text-gray-600">
                      {photo.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="relative">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="h-auto min-h-[650px] sm:min-h-[680px] lg:min-h-[720px] flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {/* Event Image Header */}
          <div className="relative h-48 sm:h-52 bg-cover bg-center rounded-t-xl overflow-hidden">
            <EventImageWithFallback
              src={event.images?.[0] || ""}
              alt={event.title}
              category={event.category}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              priority
            />

            {/* Top Overlays */}
            <div className="absolute inset-x-0 top-0 p-4">
              <div className="flex items-start justify-between">
                {/* Left: Badges */}
                <div className="flex flex-col gap-2">
                  {event.featured && (
                    <span className="bg-gradient-to-r from-accent-400 to-coral-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ FEATURED
                    </span>
                  )}
                  {event.verifiedEvent && (
                    <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      ✓ VERIFIED
                    </span>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex gap-2">
                  <SaveFavoriteCartButton
                    itemId={event.id}
                    itemType="event"
                    title={event.title}
                    description={event.description}
                    imageUrl={event.images?.[0]}
                    category={event.category}
                    eventDate={event.date}
                    eventTime={event.time}
                    eventLocation={event.location}
                    eventPrice={event.price}
                    spotsLeft={spotsLeft}
                    requiresApproval={event.requiresApproval}
                    membershipRequired={event.membershipRequired}
                    showCart={false}
                    showSave={true}
                    size="small"
                    iconOnly={true}
                    variant="default"
                    className="min-w-[44px] min-h-[44px] bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                  />
                  <button className="min-w-[44px] min-h-[44px] bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                    <ShareIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Overlays */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-end justify-between">
                {/* Left: Availability Status */}
                <div>
                  {available ? (
                    <span className={`${availabilityColor.bg} ${availabilityColor.text} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border ${availabilityColor.border} flex items-center gap-1.5`}>
                      <CheckCircleIcon className="w-3 h-3" />
                      {availabilityLabel.toUpperCase()}
                    </span>
                  ) : (
                    <span className={`${availabilityColor.bg} ${availabilityColor.text} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border ${availabilityColor.border} flex items-center gap-1.5`}>
                      <ExclamationTriangleIcon className="w-3 h-3" />
                      {availabilityLabel.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Right: Photo Gallery */}
                {event.photos && event.photos.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPhotoGallery(true);
                    }}
                    className="bg-black/70 text-white text-xs px-3 py-2 rounded-full hover:bg-black/80 transition-colors flex items-center gap-1.5 font-medium shadow-lg min-h-[36px]"
                  >
                    <PhotoIcon className="w-3.5 h-3.5" />
                    {event.photos.length} Photos
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Section - flexible */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            {/* Title - full visibility, no truncation */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors">
              {event.title}
            </h3>

            {/* Organizer name - full visibility */}
            <div className="mb-3">
              <p className="text-sm text-gray-500 font-medium">
                {isPortuguese ? "Organizado por" : "Hosted by"}{" "}
                <span className="text-gray-700 font-semibold">
                  {event.hostName}
                </span>
              </p>
            </div>

            {/* Description - better spacing, no harsh truncation */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {event.description.length > 150
                ? `${event.description.substring(0, 150)}...`
                : event.description}
            </p>

            {/* Date, Time & Location - compact layout */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="font-medium text-gray-900">
                  {formatDate(event.date)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ClockIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="font-medium text-gray-600">
                  {formatTime(event.time)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="font-medium break-words">
                  {event.location}
                </span>
              </div>
            </div>

            {/* Price and availability */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-primary-600">
                {event.price === 0 ? "FREE" : `£${event.price}`}
                {event.membershipRequired !== "free" && (
                  <span className="text-xs text-gray-500 capitalize font-medium ml-2">
                    ({isPortuguese ? "Membro" : "Member"})
                  </span>
                )}
              </div>
              <div className="text-sm text-primary-600 font-medium">
                {spotsLeft} {isPortuguese ? "vagas" : "spots"}
              </div>
            </div>

            {/* Network Connections Section */}
            {eventConnections.length > 0 && (
              <div className="mb-4">
                <NetworkPreview
                  eventId={event.id}
                  connections={eventConnections}
                  maxPreview={3}
                  showAddButton={false}
                />
              </div>
            )}

            {/* CTA buttons - compact and inline */}
            <div className="mt-auto">
              {available ? (
                <div className="flex gap-2">
                  <a
                    href={`/events/${event.id}`}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm"
                  >
                    {isPortuguese ? "Ver Mais" : "View More"}
                  </a>
                  <SaveFavoriteCartButton
                    itemId={event.id}
                    itemType="event"
                    title={event.title}
                    description={event.description}
                    imageUrl={event.images?.[0]}
                    category={event.category}
                    eventDate={event.date}
                    eventTime={event.time}
                    eventLocation={event.location}
                    eventPrice={event.price}
                    spotsLeft={updatedEvent.maxAttendees - updatedEvent.currentAttendees}
                    requiresApproval={event.requiresApproval}
                    membershipRequired={event.membershipRequired}
                    showSave={false}
                    showCart={true}
                    iconOnly={false}
                    size="small"
                    variant="outline"
                    className="flex-1 text-sm py-2.5 px-4 whitespace-nowrap"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <a
                      href={`/events/${event.id}`}
                      className="flex-1 bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg text-center text-sm opacity-60 cursor-not-allowed"
                    >
                      {isPortuguese ? "Esgotado" : "Fully Booked"}
                    </a>
                    <button
                      className="flex-1 bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg text-sm opacity-60 cursor-not-allowed"
                      disabled
                    >
                      {isPortuguese ? "Indisponível" : "Unavailable"}
                    </button>
                  </div>
                  {waitingListAvailable && (
                    <WaitingListButton
                      serviceId={event.id}
                      serviceName={event.title}
                      serviceNamePortuguese={event.title}
                      estimatedAvailability={estimatedAvailability || undefined}
                      estimatedAvailabilityPortuguese={estimatedAvailability || undefined}
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Preview Overlay for Premium Content */}
        {shouldShowPreview && (
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent backdrop-blur-sm rounded-2xl">
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-4 shadow-lg"
              >
                {/* Header with membership tier icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      event.membershipRequired === "premium"
                        ? "bg-gradient-to-r from-premium-500 to-premium-600"
                        : "bg-gradient-to-r from-secondary-500 to-secondary-600"
                    } text-white`}
                  >
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {isPortuguese
                        ? "Evento Exclusivo para Membros"
                        : "Exclusive Member Event"}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {isPortuguese
                        ? "Disponível apenas para membros"
                        : "Available to members only"}
                    </p>
                  </div>
                </div>

                {/* Content preview stats */}
                <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>
                        {spotsLeft}/{event.maxAttendees} available
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary-600">
                    <StarIcon className="w-4 h-4" />
                    <span className="font-medium">Members Only</span>
                  </div>
                </div>

                {/* Event description preview */}
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Action button */}
                <button
                  onClick={onUpgrade}
                  className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                    event.membershipRequired === "premium"
                      ? "bg-gradient-to-r from-premium-500 to-premium-600 hover:from-premium-600 hover:to-premium-700 text-white"
                      : "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white"
                  }`}
                >
                  <span className="text-sm">
                    {isPortuguese
                      ? `Tornar-se Membro ${
                          membershipTierNames[
                            event.membershipRequired as "core" | "premium"
                          ]
                        }`
                      : `Become ${
                          membershipTierNames[
                            event.membershipRequired as "core" | "premium"
                          ]
                        } Member`}
                  </span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                {/* Benefits preview */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {isPortuguese
                        ? "Benefícios inclusos:"
                        : "Benefits included:"}
                    </span>
                    <div className="flex items-center gap-2">
                      {event.membershipRequired === "premium" ? (
                        <>
                          <span className="bg-premium-100 text-premium-800 px-2 py-1 rounded-full font-medium">
                            {isPortuguese ? "Eventos VIP" : "VIP Events"}
                          </span>
                          <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
                            {isPortuguese ? "Descontos" : "Discounts"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full font-medium">
                            {isPortuguese
                              ? "Eventos Especiais"
                              : "Special Events"}
                          </span>
                          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-medium">
                            {isPortuguese ? "Networking" : "Networking"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal />
    </>
  );
};

export default ImprovedEventCard;
