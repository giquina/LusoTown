"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  PhotoIcon,
  SparklesIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventImageWithFallback from "@/components/EventImageWithFallback";
import SaveFavoriteCartButton from "@/components/SaveFavoriteCartButton";
import ImprovedEventCard from "@/components/ImprovedEventCard";
import EventToursCard from "@/components/EventToursCard";
import CategoryFilter from "@/components/CategoryFilter";
import NetworkPreview from "@/components/NetworkPreview";
import {
  Event,
  EventFilters,
  eventService,
  EVENT_CATEGORIES,
} from "@/lib/events";
import {
  EventTour,
  EventToursFilters,
  EventsToursService,
  EVENT_TOUR_CATEGORIES,
} from "@/lib/events-tours";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNetworking } from "@/context/NetworkingContext";
import { getCurrentUser } from "@/lib/auth";
import {
  ButtonStyles,
  PortugueseGradients,
  Spacing,
  Typography,
  cn,
} from "@/lib/design";

// EventCard component is no longer needed - using ImprovedEventCard instead

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
}) => {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-xl z-50 lg:relative lg:shadow-none lg:bg-transparent lg:w-80"
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">
                  {isPortuguese ? "Filtros" : "Filters"}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">
                  {isPortuguese ? "Categoria" : "Category"}
                </h4>
                <div className="space-y-2">
                  {Object.entries(EVENT_CATEGORIES).map(([category, info]) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) =>
                          onFilterChange({
                            ...filters,
                            category: e.target.value,
                          })
                        }
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!filters.category}
                      onChange={() =>
                        onFilterChange({ ...filters, category: undefined })
                      }
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">
                      {isPortuguese ? "Todas as Categorias" : "All Categories"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Membership Level */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">
                  {isPortuguese ? "Acesso de Membros" : "Membership Access"}
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      value: "free",
                      label: isPortuguese ? "Membros Grátis" : "Free Members",
                    },
                    {
                      value: "core",
                      label: isPortuguese ? "Membros Core+" : "Core Members+",
                    },
                    {
                      value: "premium",
                      label: isPortuguese ? "Apenas Premium" : "Premium Only",
                    },
                  ].map((tier) => (
                    <label
                      key={tier.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="membershipLevel"
                        value={tier.value}
                        checked={filters.membershipLevel === tier.value}
                        onChange={(e) =>
                          onFilterChange({
                            ...filters,
                            membershipLevel: e.target.value as any,
                          })
                        }
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{tier.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membershipLevel"
                      value=""
                      checked={!filters.membershipLevel}
                      onChange={() =>
                        onFilterChange({
                          ...filters,
                          membershipLevel: undefined,
                        })
                      }
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">
                      {isPortuguese ? "Todos os Níveis" : "All Levels"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">
                  {isPortuguese ? "Disponibilidade" : "Availability"}
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      value: "available",
                      label: isPortuguese
                        ? "Disponível Agora"
                        : "Available Now",
                    },
                    {
                      value: "waitlist",
                      label: isPortuguese
                        ? "Apenas Lista de Espera"
                        : "Waitlist Only",
                    },
                    {
                      value: "all",
                      label: isPortuguese ? "Mostrar Todos" : "Show All",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={(e) =>
                          onFilterChange({
                            ...filters,
                            availability: e.target.value as any,
                          })
                        }
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">
                  {isPortuguese ? "Faixa de Preço" : "Price Range"}
                </h4>
                <div className="space-y-2">
                  {[
                    { min: 0, max: 0, label: isPortuguese ? "Grátis" : "Free" },
                    { min: 1, max: 25, label: "£1 - £25" },
                    { min: 26, max: 50, label: "£26 - £50" },
                    { min: 51, max: 100, label: "£51 - £100" },
                    { min: 101, max: 999, label: "£100+" },
                  ].map((range) => (
                    <label
                      key={`${range.min}-${range.max}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        value={`${range.min}-${range.max}`}
                        checked={
                          filters.priceRange?.min === range.min &&
                          filters.priceRange?.max === range.max
                        }
                        onChange={() =>
                          onFilterChange({
                            ...filters,
                            priceRange: { min: range.min, max: range.max },
                          })
                        }
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value=""
                      checked={!filters.priceRange}
                      onChange={() =>
                        onFilterChange({ ...filters, priceRange: undefined })
                      }
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">
                      {isPortuguese ? "Qualquer Preço" : "Any Price"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => onFilterChange({})}
                className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isPortuguese ? "Limpar Todos os Filtros" : "Clear All Filters"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function EventsPage() {
  const { language, t } = useLanguage();
  const isPortuguese = language === "pt";
  const [activeTab, setActiveTab] = useState<"events" | "tours">("events");
  const { getConnectionsByEvent } = useNetworking();

  // Preview system state
  const [user, setUser] = useState(getCurrentUser());

  // Check URL parameters on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam === "tours") {
        setActiveTab("tours");
      }
    }
  }, []);
  const [events, setEvents] = useState<Event[]>([]);
  const [tours, setTours] = useState<EventTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventFilters, setEventFilters] = useState<EventFilters>({});
  const [tourFilters, setTourFilters] = useState<EventToursFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "rating">(
    "date"
  );

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "events") {
        const searchFilters = { ...eventFilters };
        if (searchQuery) {
          searchFilters.searchQuery = searchQuery;
        }

        const eventData = await eventService.getEvents(searchFilters, {
          field: sortBy,
          direction: "asc",
        });
        setEvents(eventData);
      } else {
        const searchFilters = { ...tourFilters };
        if (searchQuery) {
          searchFilters.searchQuery = searchQuery;
        }

        let tourData = EventsToursService.getEventsTours(searchFilters);

        // Apply sorting for tours with business events priority
        tourData = tourData.sort((a, b) => {
          // Business event categories for tours
          const businessCategories = [
            "Technology & AI",
            "Business & Professional",
            "Finance & Investment",
            "Professional Networking",
          ];

          const aIsBusiness = businessCategories.includes(a.category);
          const bIsBusiness = businessCategories.includes(b.category);

          // Business events first
          if (aIsBusiness && !bIsBusiness) return -1;
          if (!aIsBusiness && bIsBusiness) return 1;

          // Within business events, maintain priority order
          if (aIsBusiness && bIsBusiness) {
            const businessPriority = {
              "Technology & AI": 1,
              "Professional Networking": 2,
              "Business & Professional": 3,
              "Finance & Investment": 4,
            };
            const aPriority =
              businessPriority[a.category as keyof typeof businessPriority] ||
              999;
            const bPriority =
              businessPriority[b.category as keyof typeof businessPriority] ||
              999;
            if (aPriority !== bPriority) {
              return aPriority - bPriority;
            }
          }

          // Then apply selected sorting
          if (sortBy === "popularity") {
            return b.currentAttendees - a.currentAttendees;
          } else if (sortBy === "rating") {
            return (b.averageRating || 0) - (a.averageRating || 0);
          } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
        });

        setTours(tourData);
      }
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setLoading(false);
  }, [activeTab, eventFilters, tourFilters, sortBy, searchQuery]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Preview system effects
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Preview system handlers
  const handleUpgradeClick = () => {
    // Navigate to membership/signup page
    window.location.href = "/join";
  };

  const handleSearch = () => {
    loadContent();
  };

  const handleEventFilterChange = (newFilters: EventFilters) => {
    setEventFilters(newFilters);
  };

  const handleTourFilterChange = (newFilters: EventToursFilters) => {
    setTourFilters(newFilters);
  };

  const handleTourCategoryChange = (category?: string) => {
    setTourFilters({ ...tourFilters, category });
  };

  const currentFilters = activeTab === "events" ? eventFilters : tourFilters;
  const currentData = activeTab === "events" ? events : tours;
  const featuredItems =
    activeTab === "events"
      ? events.filter((event) => event.featured)
      : tours.filter((tour) => tour.featured);

  // Calculate category counts
  const eventCounts =
    activeTab === "tours"
      ? Object.keys(EVENT_TOUR_CATEGORIES).reduce((acc, category) => {
          acc[category] =
            EventsToursService.getEventToursByCategory(category).length;
          return acc;
        }, {} as Record<string, number>)
      : {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section
          className={cn(
            PortugueseGradients.oceanLight,
            "relative py-16 overflow-hidden"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-secondary-900/80 to-accent-900/90 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: activeTab === "events" 
                  ? "url('/events/portuguese/portuguese-networking.jpg')"
                  : "url('/events/art-tour.jpg')"
              }}
            ></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20 z-20">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>

          <div className={cn(Spacing.container, "relative z-30")}>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg mb-4">
                  {isPortuguese
                    ? "Unidos pela Língua • United by Language"
                    : "Unidos pela Língua • United by Language"}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={cn(Typography.display, "text-white mb-6")}
              >
                {activeTab === "events" ? (
                  <>
                    {/* Desktop full title */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Seu Calendário Social Português"
                        : "Your Portuguese Social Calendar"}
                    </span>
                    {/* Mobile short title */}
                    <span className="sm:hidden">
                      {isPortuguese
                        ? "Eventos Portugueses"
                        : "Portuguese Events"}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Desktop full title */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Experiências Grupais & Tours"
                        : "Group Experiences & Tours"}
                    </span>
                    {/* Mobile short title */}
                    <span className="sm:hidden">
                      {isPortuguese
                        ? "Tours & Experiências"
                        : "Tours & Experiences"}
                    </span>
                  </>
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={cn(Typography.bodyLarge, "text-white/90 mb-8")}
              >
                {activeTab === "events" ? (
                  <>
                    {/* Desktop full subtitle */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Para profissionais portugueses em Londres e no Reino Unido - participe em workshops de negócios, eventos culturais e experiências sociais. De workshops de IA a networking executivo, do fado aos investimentos imobiliários - seu desenvolvimento profissional e pessoal espera!"
                        : "For Portuguese professionals in London and across the UK - join business workshops, cultural events, and social experiences. From AI workshops to executive networking, from fado to property investment - your professional and personal development awaits!"}
                    </span>
                    {/* Mobile short subtitle */}
                    <span className="sm:hidden">
                      {isPortuguese
                        ? "O seu calendário social espera!"
                        : "Your Portuguese social calendar awaits!"}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Desktop full subtitle */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Reserve experiências exclusivas com falantes de português em todo o Reino Unido. Desde grupos especializados para mulheres 30+ e 40+ até experiências familiares - encontre sua comunidade e explore o Reino Unido juntos."
                        : "Book exclusive group experiences with Portuguese speakers across the UK. From specialized groups for Women 30+ and 40+ to family-friendly activities - find your community and explore the UK together."}
                    </span>
                    {/* Mobile short subtitle */}
                    <span className="sm:hidden">
                      {isPortuguese
                        ? "Experiências exclusivas em grupo!"
                        : "Exclusive group experiences!"}
                    </span>
                  </>
                )}
              </motion.p>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center mb-8 px-4"
              >
                <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-2 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTab("events")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "events"
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      {isPortuguese ? "Eventos" : "Events"}
                    </button>
                    <button
                      onClick={() => setActiveTab("tours")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "tours"
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {isPortuguese
                          ? "Tours & Experiências"
                          : "Tours & Experiences"}
                      </span>
                      <span className="sm:hidden">
                        {isPortuguese ? "Tours" : "Tours"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Dynamic Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {activeTab === "events" ? "200+" : `${tours.length}+`}
                  </div>
                  <div className="text-sm text-white/80">
                    {activeTab === "events"
                      ? isPortuguese
                        ? "Experiências Mensais"
                        : "Monthly Experiences"
                      : isPortuguese
                      ? "Experiências"
                      : "Experiences"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {activeTab === "events"
                      ? "750+"
                      : Object.keys(EVENT_TOUR_CATEGORIES).length}
                  </div>
                  <div className="text-sm text-white/80">
                    {activeTab === "events"
                      ? isPortuguese
                        ? "Falantes de Português"
                        : "Portuguese Speakers"
                      : isPortuguese
                      ? "Categorias"
                      : "Categories"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {activeTab === "events" ? "10+" : featuredItems.length}
                  </div>
                  <div className="text-sm text-white/80">
                    {activeTab === "events"
                      ? isPortuguese
                        ? "Países Lusófonos"
                        : "Lusophone Countries"
                      : isPortuguese
                      ? "Destaque"
                      : "Featured"}
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative max-w-2xl mx-auto px-4"
              >
                <input
                  type="text"
                  placeholder={
                    activeTab === "events"
                      ? isPortuguese
                        ? "Buscar eventos..."
                        : "Search events..."
                      : isPortuguese
                      ? "Buscar tours..."
                      : "Search tours..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 sm:pl-12 pr-20 sm:pr-32 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <MagnifyingGlassIcon className="absolute left-6 sm:left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className={cn(
                    ButtonStyles.smallButton,
                    "absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm"
                  )}
                >
                  <span className="hidden sm:inline">
                    {isPortuguese ? "Buscar" : "Search"}
                  </span>
                  <span className="sm:hidden">🔍</span>
                </button>
              </motion.div>

              {/* Dynamic Quick Filters */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 px-4"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 max-w-4xl mx-auto">
                  {activeTab === "events"
                    ? /* Event Quick Filters */
                      [
                        {
                          key: "Technology & AI",
                          label: "🤖 AI/Tech",
                          description: "AI workshops and technology training",
                        },
                        {
                          key: "Business & Entrepreneurship",
                          label: "🚀 Business",
                          description: "Entrepreneurship and business scaling",
                        },
                        {
                          key: "Finance & Investment",
                          label: "💰 Investment",
                          description: "Property and financial investment",
                        },
                        {
                          key: "Digital Marketing",
                          label: "📱 Marketing",
                          description: "E-commerce and digital marketing",
                        },
                        {
                          key: "cultural",
                          label: "🎭 Cultural",
                          description: "Cultural experiences & shows",
                        },
                        {
                          key: "social",
                          label: "🥂 Social",
                          description: "Social gatherings & networking",
                        },
                      ].map((filter) => (
                        <button
                          key={filter.key}
                          onClick={() =>
                            setEventFilters({
                              ...eventFilters,
                              category:
                                filter.key === eventFilters.category
                                  ? undefined
                                  : filter.key,
                            })
                          }
                          className={`group px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation ${
                            eventFilters.category === filter.key
                              ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105"
                              : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                          }`}
                          title={filter.description}
                        >
                          {filter.label}
                        </button>
                      ))
                    : /* Tours Category Filters */
                      Object.entries(EVENT_TOUR_CATEGORIES).map(
                        ([category, info]) => (
                          <button
                            key={category}
                            onClick={() =>
                              handleTourCategoryChange(
                                category === tourFilters.category
                                  ? undefined
                                  : category
                              )
                            }
                            className={`group px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1 touch-manipulation justify-center text-center ${
                              tourFilters.category === category
                                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105"
                                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                            }`}
                          >
                            <span className="text-sm sm:text-base">
                              {info.icon}
                            </span>
                            <span className="truncate">{category}</span>
                            {eventCounts[category] > 0 && (
                              <span
                                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold ${
                                  tourFilters.category === category
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {eventCounts[category]}
                              </span>
                            )}
                          </button>
                        )
                      )}
                </div>

                {/* Popular Types */}
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-3">
                    {isPortuguese
                      ? "Experiências Populares:"
                      : "Popular Experiences:"}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                    {activeTab === "events"
                      ? [
                          { type: "Museum Tours", flag: "🏛️" },
                          { type: "Concert Nights", flag: "🎵" },
                          { type: "Football Matches", flag: "⚽" },
                          { type: "Weekend Trips", flag: "🚌" },
                        ].map((experience) => (
                          <button
                            key={experience.type}
                            onClick={() => setSearchQuery(experience.type)}
                            className="text-primary-600 hover:text-primary-700 font-medium transition-colors bg-primary-50 hover:bg-primary-100 rounded-lg px-2 py-1 text-xs"
                          >
                            {experience.flag} {experience.type}
                          </button>
                        ))
                      : [
                          { type: "Women 30+", flag: "👩‍💼" },
                          { type: "Family-Friendly", flag: "👨‍👩‍👧‍👦" },
                          { type: "Cultural Heritage", flag: "🏛️" },
                          { type: "Professional Networking", flag: "💼" },
                        ].map((experience) => (
                          <button
                            key={experience.type}
                            onClick={() => setSearchQuery(experience.type)}
                            className="text-primary-600 hover:text-primary-700 font-medium transition-colors bg-primary-50 hover:bg-primary-100 rounded-lg px-2 py-1 text-xs"
                          >
                            {experience.flag} {experience.type}
                          </button>
                        ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-lg font-bold mb-6">
                    {activeTab === "events"
                      ? isPortuguese
                        ? "Filtrar Eventos"
                        : "Filter Events"
                      : isPortuguese
                      ? "Filtrar Tours"
                      : "Filter Tours"}
                  </h3>
                  {activeTab === "events" ? (
                    <FilterSidebar
                      isOpen={true}
                      onClose={() => {}}
                      filters={eventFilters}
                      onFilterChange={handleEventFilterChange}
                    />
                  ) : (
                    <CategoryFilter
                      selectedCategory={tourFilters.category}
                      onCategoryChange={handleTourCategoryChange}
                      eventCounts={eventCounts}
                    />
                  )}
                </div>
              </div>

              {/* Events Grid */}
              <div className="flex-1">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      <span>{isPortuguese ? "Filtros" : "Filters"}</span>
                    </button>

                    <div className="text-gray-600">
                      {loading
                        ? isPortuguese
                          ? "Carregando..."
                          : "Loading..."
                        : `${currentData.length} ${
                            currentData.length === 1
                              ? activeTab === "events"
                                ? isPortuguese
                                  ? "evento encontrado"
                                  : "event found"
                                : isPortuguese
                                ? "experiência encontrada"
                                : "experience found"
                              : activeTab === "events"
                              ? isPortuguese
                                ? "eventos encontrados"
                                : "events found"
                              : isPortuguese
                              ? "experiências encontradas"
                              : "experiences found"
                          }`}
                    </div>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="date">
                      {isPortuguese ? "Ordenar por Data" : "Sort by Date"}
                    </option>
                    <option value="popularity">
                      {isPortuguese
                        ? "Ordenar por Popularidade"
                        : "Sort by Popularity"}
                    </option>
                    <option value="rating">
                      {isPortuguese
                        ? "Ordenar por Avaliação"
                        : "Sort by Rating"}
                    </option>
                  </select>
                </div>

                {/* Featured Section */}
                {featuredItems.length > 0 && (
                  <div className="mb-12 relative overflow-hidden rounded-2xl">
                    {/* Background Image for Featured Section */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95 z-10"></div>
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                        style={{
                          backgroundImage: activeTab === "events" 
                            ? "url('/events/portuguese/cape-verde-night.jpg')"
                            : "url('/events/wine-tasting.jpg')"
                        }}
                      ></div>
                    </div>
                    
                    <div className="relative z-20 p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <SparklesIcon className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-2xl font-bold text-gray-900">
                          {activeTab === "events"
                            ? isPortuguese
                              ? "Eventos em Destaque"
                              : "Featured Events"
                            : isPortuguese
                            ? "Experiências em Destaque"
                            : "Featured Experiences"}
                        </h2>
                      </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      {featuredItems.slice(0, 2).map((item, index) =>
                        activeTab === "events" ? (
                          <ImprovedEventCard
                            key={item.id}
                            event={item as Event}
                            showPreviewOverlay={index > 0} // Show preview overlay for 2nd and 3rd featured events
                            onUpgrade={handleUpgradeClick}
                          />
                        ) : (
                          <EventToursCard
                            key={item.id}
                            event={item as EventTour}
                          />
                        )
                      )}
                    </div>
                    </div>
                  </div>
                )}

                {/* Main Content Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 sm:p-6">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentData.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeTab === "events"
                        ? isPortuguese
                          ? "Nenhum evento encontrado"
                          : "No events found"
                        : isPortuguese
                        ? "Nenhuma experiência encontrada"
                        : "No experiences found"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {isPortuguese
                        ? "Tente ajustar seus critérios de pesquisa ou limpar os filtros."
                        : "Try adjusting your search criteria or clear your filters."}
                    </p>
                    <button
                      onClick={() => {
                        if (activeTab === "events") {
                          setEventFilters({});
                        } else {
                          setTourFilters({});
                        }
                        setSearchQuery("");
                      }}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      {isPortuguese
                        ? "Limpar Todos os Filtros"
                        : "Clear All Filters"}
                    </button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
                  >
                    <AnimatePresence>
                      {currentData.map((item, index) =>
                        activeTab === "events" ? (
                          <ImprovedEventCard
                            key={item.id}
                            event={item as Event}
                            showPreviewOverlay={
                              index % 4 === 2 || index % 4 === 3
                            } // Show preview on every 3rd and 4th event
                            onUpgrade={handleUpgradeClick}
                          />
                        ) : (
                          <EventToursCard
                            key={item.id}
                            event={item as EventTour}
                          />
                        )
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Sidebar */}
        {activeTab === "events" ? (
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={eventFilters}
            onFilterChange={handleEventFilterChange}
          />
        ) : (
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />

                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-xl z-50 lg:hidden"
                >
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">
                        {isPortuguese ? "Filtros" : "Filters"}
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <CategoryFilter
                      selectedCategory={tourFilters.category}
                      onCategoryChange={(category) => {
                        handleTourCategoryChange(category);
                        setShowFilters(false);
                      }}
                      eventCounts={eventCounts}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Host Your Event CTA Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-premium-900/85 via-coral-900/80 to-accent-900/85 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/events/portuguese/mozambican-bbq.jpg')"
              }}
            ></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {isPortuguese
                  ? "Crie, Organize e Partilhe"
                  : "Create, Host & Share"}
              </h2>
              <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
                {isPortuguese
                  ? "Partilhe a sua experiência com a comunidade portuguesa. Organize eventos, crie grupos ou ofereça experiências únicas em Londres."
                  : "Share your expertise with the Portuguese community. Host events, create groups, or offer unique experiences in London."}
              </p>

              {/* Three CTA Options */}
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <a
                  href="/events/create"
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <CalendarIcon className="w-8 h-8 text-premium-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isPortuguese ? "Criar Evento" : "Create Event"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Workshops, encontros culturais"
                      : "Workshops, cultural meetups"}
                  </p>
                </a>

                <a
                  href="/groups/create"
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <UserGroupIcon className="w-8 h-8 text-coral-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isPortuguese ? "Criar Grupo" : "Create Group"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Comunidades especializadas"
                      : "Specialized communities"}
                  </p>
                </a>

                <a
                  href="/host"
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <SparklesIcon className="w-8 h-8 text-accent-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isPortuguese ? "Criar Experiência" : "Create Experience"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isPortuguese
                      ? "Tours, atividades únicas"
                      : "Tours, unique activities"}
                  </p>
                </a>
              </div>

              {/* Main CTA */}
              <a
                href="/host"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-600 via-coral-600 to-accent-600 text-white font-bold px-8 py-4 rounded-2xl hover:from-premium-700 hover:via-coral-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                <AcademicCapIcon className="w-6 h-6" />
                {isPortuguese ? "Começar a Organizar" : "Start Hosting"}
              </a>
            </div>
          </div>
        </section>

        {/* My Network CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese
                  ? "Conecte-se com a Sua Rede"
                  : "Connect with Your Network"}
              </h2>
              <p className="text-gray-600 mb-6">
                {isPortuguese
                  ? "Veja quais dos seus contactos também estão a participar em eventos e construa a sua rede de falantes de português."
                  : "See which of your connections are also attending events and build your Portuguese-speaking network."}
              </p>
              <a
                href="/my-network"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <UserGroupIcon className="w-5 h-5" />
                {isPortuguese ? "Ver A Minha Rede" : "View My Network"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
