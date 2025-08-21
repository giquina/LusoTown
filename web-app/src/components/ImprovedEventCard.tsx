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
} from "@heroicons/react/24/outline";
import EventImageWithFallback from "@/components/EventImageWithFallback";
import SaveFavoriteCartButton from "@/components/SaveFavoriteCartButton";
import NetworkPreview from "@/components/NetworkPreview";
import { Event } from "@/lib/events";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNetworking } from "@/context/NetworkingContext";
import { formatEventDate } from "@/lib/dateUtils";
import { getCurrentUser } from "@/lib/auth";
import {
  ButtonStyles,
  Typography,
  Spacing,
  IconSystem,
  getButtonStyles,
  cn,
} from "@/lib/design";

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
                className="text-gray-500 hover:text-secondary-700 p-3 rounded-full hover:bg-secondary-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                    <p className="mt-2 text-sm text-secondary-600">
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
                    className={cn(Spacing.touchTarget, "bg-white/90 backdrop-blur-sm rounded-full shadow-lg")}
                  />
                  <button className={cn(Spacing.touchTarget, "bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg")}>
                    <ShareIcon className={cn(IconSystem.sizes.sm, "text-secondary-600")} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Overlays */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex items-end justify-between">
                {/* Left: Availability Status */}
                <div>
                  {isFull ? (
                    <span className="bg-action-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      FULL {event.allowWaitlist && "• JOIN WAITLIST"}
                    </span>
                  ) : isAlmostFull ? (
                    <span className="bg-coral-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {spotsLeft} SPOT{spotsLeft === 1 ? "" : "S"} LEFT
                    </span>
                  ) : (
                    <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {spotsLeft} SPOTS AVAILABLE
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
                    className={cn(
                      "bg-black/70 text-white text-xs px-3 py-2 rounded-full hover:bg-black/80 transition-colors flex items-center gap-1.5 font-medium shadow-lg",
                      Spacing.touchTarget
                    )}
                  >
                    <PhotoIcon className={IconSystem.sizes.xs} />
                    {event.photos.length} Photos
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Section - flexible */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col">
            {/* Title - improved hierarchy */}
            <h3 className={cn(Typography.heading4, "mb-3 group-hover:text-primary-600 transition-colors")}>
              {event.title}
            </h3>

            {/* Organizer name - improved hierarchy */}
            <div className={Spacing.componentSmall}>
              <p className={cn(Typography.caption, "font-medium")}>
                {isPortuguese ? "Organizado por" : "Hosted by"}{" "}
                <span className={cn(Typography.label, "text-gray-900")}>
                  {event.hostName}
                </span>
              </p>
            </div>

            {/* Description - better readability */}
            <p className={cn(Typography.bodySmall, "mb-4", Typography.lineClamp2)}>
              {event.description}
            </p>

            {/* Event details with improved hierarchy */}
            <div className={cn("space-y-2", Spacing.component)}>
              <div className={cn("flex items-center", Spacing.sm)}>
                <CalendarIcon className={cn(IconSystem.sizes.sm, "text-primary-500 flex-shrink-0")} />
                <span className={cn(Typography.label, "text-gray-900")}>
                  {formatDate(event.date)}
                </span>
              </div>
              <div className={cn("flex items-center", Spacing.sm)}>
                <ClockIcon className={cn(IconSystem.sizes.sm, "text-primary-500 flex-shrink-0")} />
                <span className={Typography.caption}>
                  {formatTime(event.time)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </span>
              </div>
              <div className={cn("flex items-start", Spacing.sm)}>
                <MapPinIcon className={cn(IconSystem.sizes.sm, "text-primary-500 mt-0.5 flex-shrink-0")} />
                <span className={cn(Typography.caption, "break-words")}>
                  {event.location}
                </span>
              </div>
            </div>

            {/* Price and availability - improved hierarchy */}
            <div className={cn("flex items-center justify-between", Spacing.component)}>
              <div className={Typography.priceLarge}>
                {event.price === 0 ? "FREE" : `£${event.price}`}
                {event.membershipRequired !== "free" && (
                  <span className={cn(Typography.small, "ml-2 capitalize")}>
                    ({isPortuguese ? "Membro" : "Member"})
                  </span>
                )}
              </div>
              <div className={cn(Typography.status, "text-primary-600")}>
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

            {/* CTA buttons - unified design system */}
            <div className="mt-auto">
              <div className={cn("flex", Spacing.sm)}>
                <a
                  href={`/events/${event.id}`}
                  className={cn(
                    getButtonStyles('primary', 'medium'),
                    "flex-1 text-center"
                  )}
                >
                  {isFull
                    ? isPortuguese
                      ? "Lista"
                      : "Waitlist"
                    : isPortuguese
                    ? "Ver Mais"
                    : "View More"}
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
                  spotsLeft={spotsLeft}
                  requiresApproval={event.requiresApproval}
                  membershipRequired={event.membershipRequired}
                  showSave={false}
                  showCart={true}
                  iconOnly={false}
                  size="medium"
                  variant="outline"
                  className="flex-1"
                />
              </div>
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
                    <p className="text-xs text-secondary-600">
                      {isPortuguese
                        ? "Disponível apenas para membros"
                        : "Available to members only"}
                    </p>
                  </div>
                </div>

                {/* Content preview stats */}
                <div className="flex items-center justify-between mb-4 text-xs text-secondary-600">
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
                <p className="text-sm text-secondary-700 mb-4 line-clamp-2">
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
