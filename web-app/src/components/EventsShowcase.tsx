"use client";

import React, { useState, memo, useMemo, useEffect } from "react";
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
  BeakerIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  CpuChipIcon,
  GiftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import EventImageWithFallback from "@/components/EventImageWithFallback";
import WaitingListModal from "@/components/WaitingListModal";
import { useWaitingList } from "@/context/WaitingListContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Event } from "@/types/event";
import { formatPrice } from "@/config/pricing";
import { eventManagementService, PortugueseEvent } from '@/services';

// Event Image Component with fallback - Memoized for performance
const EventImage = memo(({ event }: { event: Event }) => {
  return (
    <div className="h-48 relative overflow-hidden">
      <EventImageWithFallback
        src={event.image}
        alt={`${event.title} event image`}
        category={event.category}
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
            {event.icon}
          </div>
          <div className="text-sm font-semibold opacity-95 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {event.category}
          </div>
        </div>
      </div>

      {/* Date badge */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg">
        <div className="text-xs font-bold text-gray-900">{event.date}</div>
      </div>

      {/* Status/Price badge */}
      <div
        className={`absolute top-4 right-4 rounded-xl px-3 py-2 shadow-lg ${
          event.status === "available"
            ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white"
            : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
        }`}
      >
        <div className="text-xs font-bold">
          {event.status === "available"
            ? `${formatPrice(event.price)}`
            : "SOLD OUT"}
        </div>
      </div>

      {/* Special badges for featured event */}
      {event.featured && (
        <>
          <div className="absolute top-16 left-4 bg-gradient-to-r from-accent-400 to-coral-500 text-white rounded-lg px-2 py-1 shadow-lg animate-pulse">
            <div className="text-xs font-bold flex items-center">
              <GiftIcon className="w-3 h-3 mr-1" />
              FREE GIVEAWAY
            </div>
          </div>
          <div className="absolute top-28 left-4 bg-gradient-to-r from-primary-500 to-premium-600 text-white rounded-lg px-2 py-1 shadow-lg">
            <div className="text-xs font-bold">NEW EVENT</div>
          </div>
        </>
      )}
    </div>
  );
});
EventImage.displayName = "EventImage";

// Helper function to get category icons with Portuguese cultural symbols
const getCategoryIcon = (category?: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    'fado': <MusicalNoteIcon className="w-6 h-6 text-white" />,
    'futebol': <div className="w-6 h-6 text-white text-lg">⚽</div>,
    'gastronomia': <div className="w-6 h-6 text-white text-lg">🍷</div>,
    'business': <UsersIcon className="w-6 h-6 text-white" />,
    'negocios': <div className="w-6 h-6 text-white text-lg">🤝</div>,
    'cultural': <SparklesIcon className="w-6 h-6 text-white" />,
    'santos_populares': <div className="w-6 h-6 text-white text-lg">🎉</div>,
    'festa_junina': <div className="w-6 h-6 text-white text-lg">🌽</div>,
    'literatura': <BookOpenIcon className="w-6 h-6 text-white" />,
    'musica': <MusicalNoteIcon className="w-6 h-6 text-white" />,
    'danca': <div className="w-6 h-6 text-white text-lg">💃</div>,
    'pasteis_de_nata': <div className="w-6 h-6 text-white text-lg">🧁</div>,
    'vinho_verde': <div className="w-6 h-6 text-white text-lg">🍾</div>,
    'historia': <div className="w-6 h-6 text-white text-lg">⛵</div>,
    'tecnologia': <CpuChipIcon className="w-6 h-6 text-white" />,
    'familia': <div className="w-6 h-6 text-white text-lg">👨‍👩‍👧‍👦</div>
  };
  return iconMap[category?.toLowerCase() || ''] || <CalendarDaysIcon className="w-6 h-6 text-white" />;
};

const eventStats = [
  {
    number: "200+",
    label: "Eventos Mensais | Monthly Events",
    icon: <CalendarDaysIcon className="w-5 h-5" />,
    flag: "🇵🇹"
  },
  {
    number: "1,200+",
    label: "Lusófonos | Portuguese Speakers",
    icon: <UsersIcon className="w-5 h-5" />,
    flag: "🇧🇷"
  },
  {
    number: "98%",
    label: "Satisfação Cultural | Cultural Satisfaction",
    icon: <HeartIcon className="w-5 h-5" />,
    flag: "🌍"
  },
  {
    number: "25+",
    label: "Cidades Reino Unido | UK Cities",
    icon: <MapPinIcon className="w-5 h-5" />,
    flag: "🇬🇧"
  },
];

const EventsShowcase = memo(() => {
  const { getWaitingListCount } = useWaitingList();
  const { language } = useLanguage();
  const [waitingListModalOpen, setWaitingListModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // State for real Portuguese events data
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real Portuguese events
  useEffect(() => {
    const fetchRealEvents = async () => {
      try {
        const realEvents = await eventManagementService.getUpcomingEvents({ limit: 6 });
        
        // Transform Portuguese events to match existing Event interface
        const transformedEvents: Event[] = realEvents.map((event: PortugueseEvent) => ({
          id: parseInt(event.id),
          title: event.title,
          description: event.description || '',
          location: event.venue?.name || event.location || 'London',
          address: event.venue?.address || event.location || '',
          date: new Date(event.start_datetime).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          }),
          time: new Date(event.start_datetime).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          endTime: new Date(event.end_datetime).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          attendees: event.current_attendee_count,
          maxAttendees: event.max_attendees || 0,
          price: event.price,
          category: event.cultural_category || 'Cultural Event',
          image: event.image_url || `/events/portuguese/${event.cultural_category || 'default'}.jpg`,
          color: "from-primary-500 to-secondary-500",
          icon: getCategoryIcon(event.cultural_category),
          ageRestriction: "Welcome to Portuguese speakers and friends",
          tags: event.tags || [],
          status: event.status === 'active' && (!event.max_attendees || event.current_attendee_count < event.max_attendees) 
            ? "available" 
            : "fully-booked",
          featured: event.is_featured || false
        }));
        
        setUpcomingEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching Portuguese events:', error);
        // Fallback to empty array
        setUpcomingEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRealEvents();
  }, []);

  // Memoize filtered events for performance
  const filteredEvents = useMemo(() => {
    return upcomingEvents.slice(0, 6); // Show only first 6 events
  }, [upcomingEvents]);

  const handleJoinWaitingList = (event: Event) => {
    setSelectedEvent(event);
    setWaitingListModalOpen(true);
  };

  // Show loading state while fetching events
  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-3 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">
              {language === "pt" ? "Descubra Eventos Incríveis" : "Discover Amazing Events"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {language === "pt" 
              ? "De Almoços de Feijoada a Noites de Fado" 
              : "From Feijoada Lunches to Fado Evenings"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {language === "pt"
              ? "Descubra eventos culturais autênticos lusófonos pelo Reino Unido. De festivais gastronómicos tradicionais a networking profissional, conecte-se com a sua herança e construa amizades duradouras."
              : "Discover authentic Portuguese-speaking cultural events across the UK. From traditional food festivals to professional networking, connect with your heritage and build lasting friendships."
            }
          </motion.p>
          
          {/* Portuguese Community Areas in London */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-4 text-sm"
          >
            {[
              { area: "Stockwell", icon: "🇵🇹", description: language === "pt" ? "Coração da comunidade" : "Heart of community" },
              { area: "Vauxhall", icon: "🇧🇷", description: language === "pt" ? "Centro brasileiro" : "Brazilian hub" },
              { area: "Elephant & Castle", icon: "🇦🇴", description: language === "pt" ? "Diversidade lusófona" : "Lusophone diversity" },
              { area: "Borough Market", icon: "🍷", description: language === "pt" ? "Sabores portugueses" : "Portuguese flavors" },
              { area: "Kentish Town", icon: "🎵", description: language === "pt" ? "Noites de fado" : "Fado nights" }
            ].map((location, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md border border-gray-200"
              >
                <span className="text-base">{location.icon}</span>
                <span className="font-medium text-gray-800">{location.area}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{location.description}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Bar - Enhanced Multi-Column Layout with Portuguese Cultural Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {eventStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:border-primary-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3 relative">
                {stat.icon}
                <div className="absolute -top-1 -right-1 text-lg">{stat.flag}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Events - Enhanced Multi-Column Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {filteredEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Event Image */}
              <EventImage event={event} />

              {/* Event Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                    {event.title}
                  </h3>
                  {event.status === "fully-booked" && (
                    <div className="bg-action-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {language === "pt" ? "LOTADO" : "FULLY BOOKED"}
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {event.attendees}/{event.maxAttendees} attending
                  </div>
                  <div className="flex items-center text-sm text-coral-600 font-medium">
                    <SparklesIcon className="w-4 h-4 mr-2 text-coral-500" />
                    {event.ageRestriction}
                  </div>
                </div>

                {/* Attendance bar or Special Features */}
                <div className="mb-4">
                  {event.status === "available" ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-secondary-600 font-medium flex items-center">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Available to book
                        </span>
                        <span className="text-xs font-medium text-primary-600">
                          {event.maxAttendees - event.attendees} spots left
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (event.attendees / event.maxAttendees) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      {event.specialOffer && (
                        <div className="mt-2 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                          🎁 {event.specialOffer}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-action-600 font-medium">
                          {language === "pt" ? "Completo" : "Fully booked"}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `100%` }}
                        ></div>
                      </div>
                      {/* Waiting List Info */}
                      <div className="mt-2 text-xs text-coral-600 font-medium bg-coral-50 px-2 py-1 rounded-lg border border-coral-200">
                        <UsersIcon className="w-3 h-3 inline mr-1" />
                        {getWaitingListCount(event.id)}{" "}
                        {language === "pt"
                          ? "na lista de espera"
                          : "on waiting list"}
                      </div>
                    </>
                  )}
                </div>

                {/* RSVP Button */}
                <div className="mt-auto space-y-3">
                  {event.status === "available" ? (
                    <>
                      <a
                        href={`/events/${event.id}/book`}
                        className="w-full bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700 text-white font-semibold py-4 rounded-2xl hover:from-secondary-600 hover:via-secondary-700 hover:to-secondary-800 transition-all duration-300 group-hover:scale-105 text-center shadow-xl hover:shadow-2xl animate-pulse min-h-[44px] flex items-center justify-center"
                      >
                        Book Now - {formatPrice(event.price)}
                      </a>
                      {/* Book Together Button for Portuguese cultural events */}
                      {event.featured && (
                        <button className="w-full bg-gradient-to-r from-coral-500 to-accent-500 text-white font-medium py-3 rounded-xl hover:from-coral-600 hover:to-accent-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl min-h-[40px] flex items-center justify-center gap-2">
                          <UsersIcon className="w-4 h-4" />
                          {language === "pt"
                            ? "Reservar em Grupo"
                            : "Book Together"}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleJoinWaitingList(event)}
                      className="w-full bg-gradient-to-r from-coral-500 via-accent-500 to-accent-600 text-white font-semibold py-4 rounded-2xl hover:from-coral-600 hover:via-accent-600 hover:to-accent-700 transition-all duration-300 group-hover:scale-105 block text-center shadow-xl hover:shadow-2xl min-h-[44px]"
                    >
                      {language === "pt"
                        ? "Juntar à Lista de Espera"
                        : "Join Waiting List"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portuguese Cultural Event Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg mb-12 border border-gray-100"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "pt" ? "Explore por Categoria Cultural" : "Explore by Cultural Category"}
            </h3>
            <p className="text-gray-600">
              {language === "pt" 
                ? "Descubra eventos autênticos da cultura lusófona em Londres" 
                : "Discover authentic Portuguese cultural events across London"}
            </p>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-5">
            {[
              { 
                name: language === "pt" ? "Fado & Música" : "Fado & Music", 
                icon: "🎵", 
                count: language === "pt" ? "15+ eventos" : "15+ events", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Futebol & Desporto" : "Football & Sports", 
                icon: "⚽", 
                count: language === "pt" ? "20+ jogos" : "20+ matches", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Gastronomia" : "Portuguese Cuisine", 
                icon: "🍷", 
                count: language === "pt" ? "25+ eventos" : "25+ events", 
                flag: "🇧🇷" 
              },
              { 
                name: language === "pt" ? "Santos Populares" : "Popular Saints", 
                icon: "🎉", 
                count: language === "pt" ? "12+ festas" : "12+ festivals", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Negócios" : "Business Network", 
                icon: "🤝", 
                count: language === "pt" ? "30+ eventos" : "30+ events", 
                flag: "🌍" 
              },
              { 
                name: language === "pt" ? "Pastéis de Nata" : "Pastéis de Nata", 
                icon: "🧁", 
                count: language === "pt" ? "8+ workshops" : "8+ workshops", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Vinho Verde" : "Wine Tasting", 
                icon: "🍾", 
                count: language === "pt" ? "10+ degustações" : "10+ tastings", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Literatura" : "Literature", 
                icon: "📚", 
                count: language === "pt" ? "6+ eventos" : "6+ events", 
                flag: "🇧🇷" 
              },
              { 
                name: language === "pt" ? "História Naval" : "Maritime History", 
                icon: "⛵", 
                count: language === "pt" ? "4+ tours" : "4+ tours", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Dança" : "Traditional Dance", 
                icon: "💃", 
                count: language === "pt" ? "12+ aulas" : "12+ classes", 
                flag: "🇵🇹" 
              },
              { 
                name: language === "pt" ? "Festa Junina" : "June Festivals", 
                icon: "🌽", 
                count: language === "pt" ? "6+ festas" : "6+ festivals", 
                flag: "🇧🇷" 
              },
              { 
                name: language === "pt" ? "Família" : "Family Events", 
                icon: "👨‍👩‍👧‍👦", 
                count: language === "pt" ? "18+ eventos" : "18+ events", 
                flag: "🌍" 
              }
            ].map((category, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-secondary-50/30 hover:from-secondary-50 hover:to-primary-50 transition-all duration-300 cursor-pointer group border border-gray-100/50 hover:border-secondary-200/50 shadow-lg hover:shadow-xl relative"
              >
                <div className="absolute top-2 right-2 text-sm">{category.flag}</div>
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                  {category.name}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {category.count}
                </div>
              </div>
            ))}
          </div>
          
          {/* Portuguese Cultural Quote */}
          <div className="mt-8 text-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
            <p className="text-sm italic text-gray-700 mb-2">
              {language === "pt" 
                ? "\"A cultura é a nossa segunda alma\" - Teixeira de Pascoaes"
                : "\"Culture is our second soul\" - Teixeira de Pascoaes"}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>🇵🇹</span>
              <span>{language === "pt" ? "Poeta português, 1877-1952" : "Portuguese poet, 1877-1952"}</span>
            </div>
          </div>
        </motion.div>

        {/* Portuguese Community Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-12 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "pt" ? "Vozes da Nossa Comunidade" : "Voices from Our Community"}
            </h3>
            <p className="text-gray-600">
              {language === "pt" 
                ? "Histórias reais de lusófonos que encontraram casa em Londres"
                : "Real stories from Portuguese speakers who found home in London"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Santos",
                location: "Stockwell",
                region: "🇵🇹 Porto",
                quote: language === "pt" 
                  ? "\"Finalmente encontrei pessoas que compreendem a saudade. Os eventos de fado são como estar em casa.\""
                  : "\"I finally found people who understand saudade. The fado nights feel like being home.\"",
                event: language === "pt" ? "Noites de Fado no Soho" : "Fado Nights in Soho"
              },
              {
                name: "João Silva",
                location: "Vauxhall", 
                region: "🇧🇷 São Paulo",
                quote: language === "pt"
                  ? "\"A festa junina em Londres foi incrível! As crianças adoraram e senti-me conectado às minhas raízes.\""
                  : "\"The festa junina in London was amazing! My kids loved it and I felt connected to my roots.\"",
                event: language === "pt" ? "Festa Junina Brasileira" : "Brazilian June Festival"
              },
              {
                name: "Ana Pereira",
                location: "Borough Market",
                region: "🇦🇴 Luanda", 
                quote: language === "pt"
                  ? "\"O workshop de pastéis de nata ensinou-me receitas da minha avó. Que experiência especial!\""
                  : "\"The pastéis de nata workshop taught me my grandmother's recipes. Such a special experience!\"",
                event: language === "pt" ? "Workshop Pastéis de Nata" : "Pastéis de Nata Workshop"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-secondary-50/30 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                    <div className="text-xs text-gray-500">{testimonial.region}</div>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-3 text-sm leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <div className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full inline-block">
                  {testimonial.event}
                </div>
              </div>
            ))}
          </div>

          {/* Portuguese Expressions Section */}
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
            <h4 className="font-bold text-gray-900 mb-4 text-center">
              {language === "pt" ? "Expressões que Nos Unem" : "Expressions That Unite Us"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-gray-900">Saudade</div>
                <div className="text-gray-600 text-xs">
                  {language === "pt" ? "Sentimento únicamente português" : "Uniquely Portuguese feeling"}
                </div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-gray-900">Desenrascanço</div>
                <div className="text-gray-600 text-xs">
                  {language === "pt" ? "Arte de resolver problemas" : "Art of problem-solving"}
                </div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-gray-900">Cafezinho</div>
                <div className="text-gray-600 text-xs">
                  {language === "pt" ? "Pausa brasileira essencial" : "Essential Brazilian break"}
                </div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-gray-900">Convívio</div>
                <div className="text-gray-600 text-xs">
                  {language === "pt" ? "Partilhar momentos juntos" : "Sharing moments together"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section with Portuguese Cultural Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 rounded-3xl p-10 text-white shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Portuguese Cultural Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-6xl">🇵🇹</div>
              <div className="absolute top-4 right-4 text-6xl">🇧🇷</div>
              <div className="absolute bottom-4 left-1/4 text-4xl">⚽</div>
              <div className="absolute bottom-4 right-1/4 text-4xl">🎵</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5">🍷</div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">
                {language === "pt" 
                  ? "Junte-se à Comunidade Portuguesa em Londres & Reino Unido"
                  : "Join the Portuguese Community in London & UK"}
              </h3>
              <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
                {language === "pt"
                  ? "De networking empresarial a culinária tradicional, serviços de transporte a eventos culturais. Conecte-se com outros lusófonos e construa relacionamentos significativos."
                  : "From business networking to traditional cooking, transport services to cultural events. Connect with fellow Portuguese speakers and build meaningful relationships."
                }
              </p>

              {/* Portuguese Saying */}
              <div className="mb-8 text-lg italic opacity-90">
                {language === "pt" 
                  ? "\"Quem tem amigos, tem tudo\" - Provérbio Português"
                  : "\"Those who have friends, have everything\" - Portuguese Proverb"}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/events"
                  className="inline-flex items-center bg-white text-secondary-600 font-bold px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group shadow-xl hover:shadow-2xl min-h-[44px]"
                >
                  {language === "pt" ? "Ver Eventos" : "View Events"}
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center border-2 border-white text-white font-bold px-10 py-4 rounded-2xl hover:bg-white hover:text-secondary-600 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px]"
                >
                  {language === "pt" ? "Juntar-se Agora" : "Join Now"}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waiting List Modal */}
      {selectedEvent && (
        <WaitingListModal
          isOpen={waitingListModalOpen}
          onClose={() => setWaitingListModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </section>
  );
});
EventsShowcase.displayName = "EventsShowcase";

export default EventsShowcase;
