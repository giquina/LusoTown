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
  CheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
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
import { ROUTES } from "@/config/routes";
import {
  ButtonStyles,
  PortugueseGradients,
  Spacing,
  Typography,
  cn,
} from "@/lib/design";
import PortugueseCulturalCalendar from "@/components/PortugueseCulturalCalendar";
import EventsDiscovery from "@/components/EventsDiscovery";
import CommunityEventCreation from "@/components/CommunityEventCreation";

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
  const [activeTab, setActiveTab] = useState<"events" | "tours" | "cultural" | "create">("events");
  const { getConnectionsByEvent } = useNetworking();

  // Preview system state
  const [user, setUser] = useState(getCurrentUser());

  // Check URL parameters on component mount and handle navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam === "tours") {
        setActiveTab("tours");
      } else if (tabParam === "cultural") {
        setActiveTab("cultural");
      } else if (tabParam === "create") {
        setActiveTab("create");
      }
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (tab: "events" | "tours" | "cultural" | "create") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab !== "events") {
        url.searchParams.set("tab", tab);
      } else {
        url.searchParams.delete("tab");
      }
      window.history.pushState({}, "", url.toString());
    }
  };
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
            "Technology & Innovation",
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
              "Technology & Innovation": 1,
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
    window.location.href = ROUTES.signup;
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

      <main className="pt-16">
        {/* Hero Section - CONVERSION OPTIMIZED */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-green-50/20">
          {/* Portuguese tile pattern background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c53026' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          {/* Portuguese flag inspired gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-red-500/5" />

          {/* Live Activity Badge */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm" />
                <span className="text-xs font-bold text-gray-800">
                  🎵 47 people viewing Portuguese events now
                </span>
              </div>
            </motion.div>
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
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-4"
              >
                {activeTab === "events" ? (
                  <>
                    <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                      Find Your Next
                    </span>{" "}
                    <span className="text-gray-900">Portuguese Cultural Experience</span>
                  </>
                ) : (
                  <>
                    <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                      Premium
                    </span>{" "}
                    <span className="text-gray-900">Group Experiences</span>
                  </>
                )}
              </motion.h1>
              {/* Social Proof Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4 mb-6"
              >
                <p className="text-xl xs:text-2xl sm:text-3xl text-gray-700 leading-relaxed font-medium">
                  <span className="font-bold text-green-600">750+ Portuguese speakers</span> attend monthly • 
                  <span className="font-bold text-blue-600">23 joined this week</span>
                </p>
                
                <div className="flex items-center gap-4 text-lg text-gray-600">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    <span className="font-bold text-yellow-600">4.8★ from 890+ reviews</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  <span className="font-semibold text-red-600">Next event:</span> Porto Night this Friday (47 attending)
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg text-gray-700 mb-8"
              >
                {activeTab === "events" ? (
                  <>
                    {/* Desktop full subtitle */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Descubra eventos autênticos nos bairros portugueses de Londres - de Santos Populares em Stockwell a noites de Fado em Camden. Conecte-se com a sua comunidade através de experiências culturais genuínas, networking profissional e tradições que unem gerações."
                        : "Discover authentic events in London's Portuguese neighborhoods - from Santos Populares in Stockwell to Fado nights in Camden. Connect with your community through genuine cultural experiences, professional networking, and traditions that unite generations."}
                    </span>
                    {/* Mobile short subtitle */}
                    <span className="sm:hidden">
                      {isPortuguese
                        ? "Eventos portugueses autênticos em Londres!"
                        : "Authentic Portuguese events in London!"}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Desktop full subtitle */}
                    <span className="hidden sm:block">
                      {isPortuguese
                        ? "Reserve experiências exclusivas com falantes de português em todo o Reino Unido. Desde grupos especializados para mulheres 30+ e 40+ até experiências familiares - encontre sua comunidade e explore o Reino Unido juntos."
                        : "Book exclusive group experiences with Portuguese speakers across the United Kingdom. From specialized groups for Women 30+ and 40+ to family-friendly activities - find your community and explore the United Kingdom together."}
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
                <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-2 rounded-2xl shadow-xl border border-gray-200 w-full max-w-4xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleTabChange("events")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "events"
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      {isPortuguese ? "Eventos" : "Events"}
                    </button>
                    <button
                      onClick={() => handleTabChange("cultural")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "cultural"
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {isPortuguese ? "Calendário Cultural" : "Cultural Calendar"}
                      </span>
                      <span className="sm:hidden">
                        {isPortuguese ? "Cultural" : "Cultural"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTabChange("tours")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "tours"
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {isPortuguese ? "Tours" : "Tours"}
                      </span>
                      <span className="sm:hidden">
                        {isPortuguese ? "Tours" : "Tours"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTabChange("create")}
                      className={`px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-sm transition-all duration-200 touch-manipulation min-h-[44px] flex items-center justify-center ${
                        activeTab === "create"
                          ? "bg-gradient-to-r from-accent-500 to-coral-500 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <span className="hidden sm:inline">
                        {isPortuguese ? "Criar Evento" : "Create Event"}
                      </span>
                      <span className="sm:hidden">
                        {isPortuguese ? "Criar" : "Create"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="space-y-4 mb-8"
              >
                {/* Primary CTA */}
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer group py-6 px-8"
                >
                  <div className="flex items-center justify-center gap-4 text-xl font-black">
                    <span className="text-xl">🇵🇹</span>
                    <span className="relative z-10">
                      Join 750+ Portuguese Speakers - FREE
                    </span>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-2xl">→</span>
                    </motion.div>
                  </div>
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => window.location.href = activeTab === 'events' ? '/events' : '/tours'}
                  className="w-full bg-white/90 backdrop-blur-lg border-2 border-gray-200 text-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group py-4 px-6"
                >
                  <div className="flex items-center justify-center gap-3 text-lg font-bold">
                    <span className="text-lg">👀</span>
                    <span>Browse {activeTab === 'events' ? 'Events' : 'Experiences'} First</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>→</span>
                    </motion.div>
                  </div>
                </button>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span>Verified Portuguese speakers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span>Safe & secure</span>
                  </div>
                </div>
              </motion.div>

              {/* Dynamic Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                    {activeTab === "events" ? "200+" : `${tours.length}+`}
                  </div>
                  <div className="text-sm text-gray-600">
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
                  <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">
                    {activeTab === "events"
                      ? "750+"
                      : Object.keys(EVENT_TOUR_CATEGORIES).length}
                  </div>
                  <div className="text-sm text-gray-600">
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
                  <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-1">
                    {activeTab === "events" ? "10+" : featuredItems.length}
                  </div>
                  <div className="text-sm text-gray-600">
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
                  className="w-full pl-10 sm:pl-12 pr-20 sm:pr-32 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg bg-white backdrop-blur-sm"
                />
                <MagnifyingGlassIcon className="absolute left-6 sm:left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className={cn(
                    ButtonStyles.legacy.smallButton,
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
                          key: "Technology & Innovation",
                          label: "🤖 Tech/Innovation",
                          description: "Technology workshops and innovation training",
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            {/* Cultural Calendar Tab */}
            {activeTab === "cultural" && (
              <PortugueseCulturalCalendar />
            )}

            {/* Create Event Tab */}
            {activeTab === "create" && (
              <CommunityEventCreation
                onEventCreated={(eventId) => {
                  // Handle successful event creation
                  console.log("Event created:", eventId);
                  setActiveTab("events");
                }}
              />
            )}

            {/* Events and Tours Content */}
            {(activeTab === "events" || activeTab === "tours") && (
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
                  {/* Portuguese Events Discovery */}
                  {activeTab === "events" && (
                    <div className="mb-8">
                      <EventsDiscovery />
                    </div>
                  )}

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow min-h-[44px] text-sm font-medium"
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      <span>{isPortuguese ? "Filtros" : "Filters"}</span>
                    </button>

                    <div className="text-gray-600 text-sm sm:text-base">
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
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 w-full sm:w-auto min-w-[120px]"
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
                    {/* Background Image for Featured Section - avoid flyers/text */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95 z-10"></div>
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                        style={{
                          backgroundImage:
                            activeTab === "events"
                              ? "url('/events/jazz-networking.jpg')"
                              : "url('/events/book-brunch.jpg')",
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
            )}
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
          {/* Background Image - avoid text overlays in imagery */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-premium-900/85 via-coral-900/80 to-accent-900/85 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/events/ceramic-art.jpg')",
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
                  ? "Partilhe a sua experiência com a comunidade de falantes de português. Organize eventos, crie grupos ou ofereça experiências únicas em Londres."
                  : "Share your expertise with the Portuguese-speaking community. Host events, create groups, or offer unique experiences in London."}
              </p>

              {/* Three CTA Options */}
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <a
                  href={`${ROUTES.events  }/create`}
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
                  href={`${ROUTES.groups  }/create`}
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
                  href={ROUTES.host}
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
                href={ROUTES.host}
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
                href={ROUTES.myNetwork}
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
