"use client";

import React, { useState, memo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightIcon,
  ClockIcon,
  TicketIcon,
  HeartIcon,
  CpuChipIcon,
  GiftIcon,
  CheckCircleIcon,
  StarIcon,
  FireIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import EventImageWithFallback from "@/components/EventImageWithFallback";
import { useLanguage } from "@/context/LanguageContext";
import { eventManagementService, PortugueseEvent, PortugueseServiceUtils } from "@/services";
import { formatPrice } from "@/config/pricing";

// Event Image Component with fallback - Memoized for performance
const PortugueseEventImage = memo(({ event }: { event: PortugueseEvent }) => {
  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const getCategoryIcon = (category?: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'fado': <MusicalNoteIcon className="w-6 h-6 text-white" />,
      'business': <UsersIcon className="w-6 h-6 text-white" />,
      'cultural': <SparklesIcon className="w-6 h-6 text-white" />,
      'food': <GiftIcon className="w-6 h-6 text-white" />,
      'technology': <CpuChipIcon className="w-6 h-6 text-white" />,
      'santos_populares': <FireIcon className="w-6 h-6 text-white" />
    };
    return iconMap[category?.toLowerCase() || ''] || <CalendarDaysIcon className="w-6 h-6 text-white" />;
  };

  return (
    <div className="h-48 relative overflow-hidden">
      <EventImageWithFallback
        src={event.image_url || `/events/portuguese/${event.cultural_category || 'default'}.jpg`}
        alt={`${event.title} event image`}
        category={event.cultural_category || 'cultural'}
        className="object-cover"
        fill
        priority
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Category icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-xl">
            {getCategoryIcon(event.cultural_category)}
          </div>
          <div className="text-sm font-semibold opacity-95 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {event.cultural_category || 'Cultural Event'}
          </div>
        </div>
      </div>

      {/* Date badge */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg">
        <div className="text-xs font-bold text-gray-900">{formatEventDate(event.start_datetime)}</div>
      </div>

      {/* Status/Price badge */}
      <div
        className={`absolute top-4 right-4 rounded-xl px-3 py-2 shadow-lg ${
          event.status === "active" && (!event.max_attendees || event.current_attendee_count < event.max_attendees)
            ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white"
            : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
        }`}
      >
        <div className="text-xs font-bold">
          {event.status === "active" && (!event.max_attendees || event.current_attendee_count < event.max_attendees)
            ? event.price > 0 ? formatPrice(event.price) : "FREE"
            : "FULL"}
        </div>
      </div>

      {/* Special badges for featured event */}
      {event.is_featured && (
        <>
          <div className="absolute top-16 left-4 bg-gradient-to-r from-accent-400 to-coral-500 text-white rounded-lg px-2 py-1 shadow-lg animate-pulse">
            <div className="text-xs font-bold flex items-center">
              <StarIcon className="w-3 h-3 mr-1" />
              FEATURED
            </div>
          </div>
        </>
      )}

      {/* Cultural authenticity score */}
      {event.cultural_authenticity_score && event.cultural_authenticity_score >= 80 && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-primary-500 to-premium-600 text-white rounded-lg px-2 py-1 shadow-lg">
          <div className="text-xs font-bold flex items-center">
            🇵🇹 AUTHENTIC
          </div>
        </div>
      )}

      {/* Portuguese venue badge */}
      {event.venue?.verified_portuguese_owned && (
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-2 py-1 shadow-lg">
          <div className="text-xs font-bold">PT VENUE</div>
        </div>
      )}
    </div>
  );
});
PortugueseEventImage.displayName = "PortugueseEventImage";

interface PortugueseEventsShowcaseProps {
  maxEvents?: number;
  showFilters?: boolean;
  featuredOnly?: boolean;
}

const PortugueseEventsShowcase: React.FC<PortugueseEventsShowcaseProps> = ({
  maxEvents = 6,
  showFilters = true,
  featuredOnly = false
}) => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<PortugueseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch real Portuguese events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        let fetchedEvents: PortugueseEvent[];
        
        if (featuredOnly) {
          fetchedEvents = await eventManagementService.getFeaturedEvents();
        } else {
          const filters: any = { limit: maxEvents };
          
          if (selectedFilter !== "all") {
            filters.cultural_category = selectedFilter;
          }
          
          fetchedEvents = await eventManagementService.getUpcomingEvents(filters);
        }
        
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching Portuguese events:', error);
        // Fallback to empty array on error
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedFilter, maxEvents, featuredOnly]);

  const eventFilters = [
    { value: "all", label: t("events.filters.all"), icon: SparklesIcon },
    { value: "fado", label: "Fado Music", icon: MusicalNoteIcon },
    { value: "business", label: t("events.filters.business"), icon: UsersIcon },
    { value: "cultural", label: t("events.filters.cultural"), icon: SparklesIcon },
    { value: "santos_populares", label: "Santos Populares", icon: FireIcon },
    { value: "food", label: t("events.filters.food"), icon: GiftIcon },
  ];

  const handleFavorite = async (eventId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(eventId)) {
      newFavorites.delete(eventId);
    } else {
      newFavorites.add(eventId);
    }
    setFavorites(newFavorites);
    
    // Store in localStorage for persistence
    localStorage.setItem('portuguese_event_favorites', JSON.stringify(Array.from(newFavorites)));
  };

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('portuguese_event_favorites');
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  const eventStats = [
    {
      icon: <UsersIcon className="w-5 h-5 text-primary-600" />,
      label: t("events.stats.attendees"),
      value: events.reduce((sum, event) => sum + event.current_attendee_count, 0).toLocaleString()
    },
    {
      icon: <CalendarDaysIcon className="w-5 h-5 text-secondary-600" />,
      label: t("events.stats.events"),
      value: events.length.toString()
    },
    {
      icon: <MapPinIcon className="w-5 h-5 text-accent-600" />,
      label: "Portuguese Venues",
      value: events.filter(e => e.venue?.verified_portuguese_owned).length.toString()
    },
    {
      icon: <SparklesIcon className="w-5 h-5 text-coral-600" />,
      label: "Cultural Events",
      value: events.filter(e => e.cultural_preservation_focus).length.toString()
    },
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-2xl"></div>
                <div className="bg-white p-6 rounded-b-2xl">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-primary-100 rounded-full px-6 py-3 text-sm font-medium text-primary-700 mb-8"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            🇵🇹 Portuguese Community Events
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {t("events.hero.title")}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              {" "}
              Portuguese Community
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with fellow Portuguese speakers at authentic cultural events, 
            business networking sessions, and traditional celebrations in London.
          </motion.p>
        </div>

        {/* Event Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {eventStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {eventFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedFilter === filter.value
                      ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:text-primary-700 hover:shadow-md"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {filter.label}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-200 hover:-translate-y-2"
            >
              <PortugueseEventImage event={event} />

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleFavorite(event.id)}
                    className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {favorites.has(event.id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {new Date(event.start_datetime).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    <span className="truncate">
                      {event.venue?.name || event.location || 'London'}
                      {event.portuguese_neighborhood && (
                        <span className="text-primary-600 font-medium ml-1">
                          • {PortugueseServiceUtils.getRegionDisplayName(event.portuguese_neighborhood)}
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    {event.current_attendee_count} attending
                    {event.max_attendees && (
                      <span className="text-gray-400"> / {event.max_attendees} max</span>
                    )}
                  </div>
                </div>

                {/* Portuguese Cultural Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.fado_music_featured && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      🎵 Fado Music
                    </span>
                  )}
                  {event.santos_populares_themed && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      🔥 Santos Populares
                    </span>
                  )}
                  {event.football_viewing_party && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ⚽ Football
                    </span>
                  )}
                  {event.cultural_preservation_focus && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      🏛️ Heritage
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Link
                  href={`/events/${event.id}`}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
                >
                  {event.price > 0 ? (
                    <>
                      Book for {PortugueseServiceUtils.formatEuroPrice(event.price)}
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      Join Free Event
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        {!featuredOnly && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
                  href={ROUTES.events}
              className="inline-flex items-center bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              View All Portuguese Events
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortugueseEventsShowcase;