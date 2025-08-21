"use client";

import { ROUTES, buildUnsplashUrl } from '@/config';
import { useState } from "react";
import { motion } from "framer-motion";
import { ROUTES } from '@/config/routes'
import {
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import GroupEventCard, { GroupEventData } from "./GroupEventCard";

// Sample data for group events
const sampleGroupEvents: GroupEventData[] = [
  {
    id: "group-event-1",
    title: "Tower of London Portuguese Heritage Tour",
    description:
      "Explore the Tower of London with Portuguese-speaking women 30+ and discover fascinating historical connections between Portugal and England. Guided tour includes Crown Jewels and Beefeater stories.",
    date: "2025-08-18",
    time: "10:00 AM",
    location: "Tower of London, EC3N 4AB",
    price: 35,
    currency: "£",
    category: "Women 30+",
    image:
      buildUnsplashUrl('1513635269975-59663e0ac1ad'),
    spotsLeft: 0,
    maxAttendees: 15,
    hostName: "Ana Rodrigues",
    hostImage: "/profiles/default-avatar.svg",
    hostVerified: true,
    rating: 4.9,
    reviewCount: 47,
    isPopular: true,
    hasPhotos: true,
    groupFocus: "Cultural Heritage",
    ageRange: "30-55",
    languages: ["Portuguese", "English"],
  },
  {
    id: "group-event-2",
    title: "Thames Sunset Tea Cruise",
    description:
      "Relaxing evening cruise along the Thames with traditional afternoon tea. Perfect for Portuguese women 30+ looking to unwind and connect while enjoying London's skyline at golden hour.",
    date: "2025-08-20",
    time: "5:30 PM",
    location: "Westminster Pier, SW1A 2JH",
    price: 45,
    currency: "£",
    category: "Women 30+",
    image: buildRoute(ROUTES.events, { id: 'event-id' }),
    spotsLeft: 0,
    maxAttendees: 12,
    hostName: "Carla Santos",
    hostImage:
      buildUnsplashUrl('1438761681033-6461ffad8d80'),
    hostVerified: true,
    rating: 4.8,
    reviewCount: 34,
    isNewEvent: true,
    hasPhotos: true,
    groupFocus: "Social & Relaxation",
    ageRange: "30-50",
    languages: ["Portuguese", "English"],
  },
  {
    id: "group-event-3",
    title: "St. Paul's Cathedral & City Architecture Walk",
    description:
      "Sophisticated cultural walk through the City of London, exploring architectural marvels including St. Paul's Cathedral. Designed for Portuguese women 40+ who appreciate history and beautiful design.",
    date: "2025-08-22",
    time: "2:00 PM",
    location: "St. Paul's Cathedral, EC4M 8AD",
    price: 28,
    currency: "£",
    category: "Women 40+",
    image: buildRoute(ROUTES.events, { id: 'event-id' }),
    spotsLeft: 0,
    maxAttendees: 18,
    hostName: "Isabel Fernandes",
    hostImage:
      buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
    hostVerified: true,
    rating: 4.9,
    reviewCount: 63,
    hasPhotos: true,
    groupFocus: "Architecture & History",
    ageRange: "40-65",
    languages: ["Portuguese", "English"],
  },
  {
    id: "group-event-4",
    title: "Harry Potter Studio Tour Community Adventure",
    description:
      "Magical day out at the Warner Bros Studio Tour. Perfect for Portuguese speakers in London - you will be guided by Portuguese hosts and travel with fellow Portuguese speakers, making it feel like going with close friends who share your language and culture while exploring behind-the-scenes magic, costumes, and sets.",
    date: "2025-08-24",
    time: "11:00 AM",
    location: "Warner Bros Studio Tour, WD25 7LR",
    price: 55,
    currency: "£",
    category: "All Welcome",
    image:
      buildUnsplashUrl('1551269901-5c5e14c25df7'),
    spotsLeft: 0,
    maxAttendees: 25,
    hostName: "Miguel Silva",
    hostImage:
      buildUnsplashUrl('1472099645785-5658abf4ff4e'),
    hostVerified: true,
    rating: 4.7,
    reviewCount: 89,
    isPopular: true,
    hasPhotos: true,
    groupFocus: "Community Connection",
    ageRange: "All ages welcome",
    languages: ["Portuguese", "English"],
  },
  {
    id: "group-event-5",
    title: "Borough Market Portuguese Food Tasting",
    description:
      "Discover the best Portuguese and international foods at Borough Market. Join other Portuguese-speaking women 30+ for tastings, shopping, and cultural food discussions.",
    date: "2025-08-25",
    time: "10:30 AM",
    location: "Borough Market, SE1 9AL",
    price: 25,
    currency: "£",
    category: "Women 30+",
    image:
      buildUnsplashUrl('1555939594-58d7cb561ad1'),
    spotsLeft: 0,
    maxAttendees: 14,
    hostName: "Beatriz Costa",
    hostImage:
      buildUnsplashUrl('1544725176-7c40e5a71c5e'),
    hostVerified: true,
    rating: 4.8,
    reviewCount: 52,
    hasPhotos: true,
    groupFocus: "Food & Culture",
    ageRange: "30-55",
    languages: ["Portuguese", "English"],
  },
  {
    id: "group-event-6",
    title: "London Zoo Community Safari Day",
    description:
      "Fun-filled day at London Zoo with Portuguese speakers in London. Educational talks, animal encounters, and activities led by Portuguese guides - experience London's wildlife while connecting with fellow Portuguese speakers who share your language and culture.",
    date: "2025-08-26",
    time: "10:00 AM",
    location: "London Zoo, NW1 4RY",
    price: 32,
    currency: "£",
    category: "All Welcome",
    image:
      buildUnsplashUrl('1564349683136-77e08dba1ef7'),
    spotsLeft: 0,
    maxAttendees: 20,
    hostName: "João Pereira",
    hostImage:
      buildUnsplashUrl('1507003211169-0a1dd7228f2d'),
    hostVerified: true,
    rating: 4.6,
    reviewCount: 71,
    hasPhotos: true,
    groupFocus: "Wildlife & Education",
    ageRange: "All ages welcome",
    languages: ["Portuguese", "English"],
  },
];

interface GroupEventsSectionProps {
  variant?: "homepage" | "full-page";
  maxEvents?: number;
  showFilters?: boolean;
  className?: string;
}

export default function GroupEventsSection({
  variant = "homepage",
  maxEvents = 6,
  showFilters = false,
  className = "",
}: GroupEventsSectionProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const isPortuguese = language === "pt";

  const categories = [
    {
      id: "all",
      label: isPortuguese ? "Todos" : "All Events",
      count: sampleGroupEvents.length,
    },
    {
      id: "Women 30+",
      label: isPortuguese ? "Mulheres 30+" : "Women 30+",
      count: sampleGroupEvents.filter((e) => e.category === "Women 30+").length,
    },
    {
      id: "Women 40+",
      label: isPortuguese ? "Mulheres 40+" : "Women 40+",
      count: sampleGroupEvents.filter((e) => e.category === "Women 40+").length,
    },
    {
      id: "All Welcome",
      label: isPortuguese ? "Todos Bem-vindos" : "All Welcome",
      count: sampleGroupEvents.filter((e) => e.category === "All Welcome")
        .length,
    },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? sampleGroupEvents.slice(0, maxEvents)
      : sampleGroupEvents
          .filter((event) => event.category === selectedCategory)
          .slice(0, maxEvents);

  const handleReserve = (eventId: string) => {
    console.log("Reserving spot for event:", eventId);
    // Handle reservation logic here
  };

  const handleLike = (eventId: string) => {
    console.log("Liking event:", eventId);
    // Handle like logic here
  };

  if (variant === "homepage") {
    return (
      <section
        className={`py-24 bg-gradient-to-br from-white via-primary-50/20 to-secondary-50/30 relative overflow-hidden ${className}`}
      >
        {/* Portuguese-inspired background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-coral-200/40 via-accent-100/30 to-secondary-100/30 rounded-full opacity-60 animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-premium-200/40 via-action-100/30 to-coral-100/30 rounded-full opacity-50 animate-bounce"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
          <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-coral-300/50 rounded-full opacity-30" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-coral-50/80 via-secondary-50/60 to-premium-50/60 border border-coral-200/40 rounded-3xl px-8 py-4 shadow-xl mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="w-5 h-5 text-coral-600" />
                  <span className="text-sm font-bold bg-gradient-to-r from-coral-600 via-secondary-600 to-premium-600 bg-clip-text text-transparent">
                    {isPortuguese ? "GRUPOS PORTUGUESES" : "PORTUGUESE GROUPS"}
                  </span>
                </div>
                <div className="w-2 h-2 bg-coral-400 rounded-full animate-pulse"></div>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {isPortuguese
                  ? "Eventos & Tours de Grupo"
                  : "Upcoming Group Events & Tours"}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 mb-4 font-medium max-w-4xl mx-auto leading-relaxed">
                {isPortuguese
                  ? "Junte-se a grupos portugueses para explorar Londres através de experiências culturais, passeios históricos e aventuras comunitárias"
                  : "Join Portuguese-speaking groups to explore London through cultural experiences, historical tours, and community adventures"}
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-coral-400 rounded-full"></div>
                  <span>
                    {isPortuguese ? "50% Mulheres 30+" : "50% Women 30+"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-premium-400 rounded-full"></div>
                  <span>
                    {isPortuguese ? "25% Mulheres 40+" : "25% Women 40+"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary-400 rounded-full"></div>
                  <span>
                    {isPortuguese ? "25% Todos Bem-vindos" : "25% All Welcome"}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-2xl p-2 shadow-lg">
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-coral-500 to-secondary-500 text-white shadow-lg"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="ml-2 text-xs opacity-70">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GroupEventCard
                    event={event}
                    onReserve={handleReserve}
                    onLike={handleLike}
                    variant={index === 0 ? "featured" : "default"}
                  />
                </motion.div>
              ))}
            </div>

            {/* Group Benefits Highlight */}
            <div className="bg-gradient-to-r from-white/80 via-coral-50/60 to-secondary-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-8 mb-12 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {isPortuguese
                    ? "Por que Participar nos Nossos Grupos?"
                    : "Why Join Our Portuguese Groups?"}
                </h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  {isPortuguese
                    ? "Conecte-se com portugueses que partilham os seus interesses, explore Londres de forma autêntica e crie amizades duradouras."
                    : "Connect with Portuguese speakers who share your interests. With Portuguese-speaking guides and hosts, you will explore London authentically while building lasting friendships with people who understand your language and culture."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/60 rounded-2xl border border-white/30">
                  <div className="w-12 h-12 bg-gradient-to-r from-coral-500 to-coral-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese
                      ? "Conexões Autênticas"
                      : "Authentic Connections"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Conheça pessoas que partilham a sua cultura e língua"
                      : "Connect with Portuguese speakers through shared experiences led by Portuguese hosts and guides"}
                  </p>
                </div>

                <div className="text-center p-6 bg-white/60 rounded-2xl border border-white/30">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? "Descubra Londres" : "Discover London"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Explore a cidade com locais e experiências únicas"
                      : "Discover London with Portuguese-speaking guides who understand your cultural preferences and language"}
                  </p>
                </div>

                <div className="text-center p-6 bg-white/60 rounded-2xl border border-white/30">
                  <div className="w-12 h-12 bg-gradient-to-r from-premium-500 to-premium-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese
                      ? "Experiências de Qualidade"
                      : "Quality Experiences"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Organizadores experientes e eventos bem planeados"
                      : "Portuguese-speaking event organizers who ensure culturally authentic and language-comfortable experiences"}
                  </p>
                </div>
              </div>
            </div>

            {/* Call-to-Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-coral-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese
                    ? "Pronto para Se Juntar ao Próximo Evento?"
                    : "Ready to Join Your Next Group Adventure?"}
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  {isPortuguese
                    ? "Reserve o seu lugar em eventos que conectam portugueses através de experiências únicas em Londres."
                    : "Reserve your spot in events that connect Portuguese speakers through unique London experiences."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href=buildRoute(ROUTES.events, { id: 'event-id' })
                    className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-coral-500 via-secondary-500 to-premium-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-coral-600 via-secondary-600 to-premium-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isPortuguese
                        ? "Ver Todos os Eventos de Grupo"
                        : "View All Group Events"}
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </a>
                  <a
                    href={ROUTES.groupsCreate}
                    className="text-lg font-bold px-8 py-4 bg-white/70 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-coral-300 hover:-translate-y-1"
                  >
                    {isPortuguese
                      ? "Criar Evento de Grupo"
                      : "Create Group Event"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full-page variant
  return (
    <div
      className={`min-h-screen py-24 bg-gradient-to-br from-white via-primary-50/20 to-secondary-50/30 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              {isPortuguese
                ? "Eventos de Grupo Portugueses"
                : "Portuguese Group Events"}
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? "Descubra eventos organizados especialmente para portugueses em Londres. Conecte-se, explore e crie memórias inesquecíveis."
                : "Discover events organized specifically for Portuguese speakers in London. Connect, explore, and create unforgettable memories."}
            </p>
          </div>

          {/* Filters and Search */}
          {showFilters && (
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-coral-500 to-secondary-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GroupEventCard
                  event={event}
                  onReserve={handleReserve}
                  onLike={handleLike}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
