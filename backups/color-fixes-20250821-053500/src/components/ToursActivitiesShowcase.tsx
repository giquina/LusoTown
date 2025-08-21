"use client";

import React, { useState, memo, useMemo } from "react";
import { ROUTES } from '@/config'
import { motion } from "framer-motion";
import { ROUTES } from '@/config'
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CameraIcon,
  HeartIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LanguageIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  SparklesIcon,
  TagIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  CurrencyPoundIcon,
  BeakerIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ROUTES } from '@/config'
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from '@/config'

// Tour & Activity interfaces
interface TourGuide {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
  languages: string[];
  experience: string;
  verified: boolean;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  category: 'cultural' | 'food' | 'history' | 'neighborhoods' | 'business';
  duration: string;
  price: number;
  maxGroupSize: number;
  currentBookings: number;
  location: string;
  meetingPoint: string;
  highlights: string[];
  includes: string[];
  language: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  targetAudience: ('solo' | 'families' | 'business' | 'couples')[];
  guide: TourGuide;
  images: string[];
  featured: boolean;
  availability: 'available' | 'limited' | 'fully-booked';
  nextAvailableDate: string;
  tags: string[];
  specialOffers?: string;
  culturalFocus: string[];
}

// Sample Portuguese guides data
const portugueseGuides: TourGuide[] = [
  {
    id: "guide-maria",
    name: "Maria Santos",
    rating: 4.9,
    reviews: 127,
    image: buildUnsplashUrl("photo-1494790108755-2616b332-3a6?w=100&h=100&fit=crop&crop=face"),
    specialties: ["Portuguese Culture", "London History", "Food Tours"],
    languages: ["Portuguese", "English", "Spanish"],
    experience: "8 years",
    verified: true,
  },
  {
    id: "guide-joao",
    name: "João Oliveira",
    rating: 4.8,
    reviews: 89,
    image: buildUnsplashUrl("photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"),
    specialties: ["Business Tours", "Architecture", "Portuguese Districts"],
    languages: ["Portuguese", "English", "French"],
    experience: "12 years",
    verified: true,
  },
  {
    id: "guide-ana",
    name: "Ana Rodrigues",
    rating: 4.9,
    reviews: 156,
    image: buildUnsplashUrl("photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"),
    specialties: ["Family Tours", "Cultural Immersion", "Portuguese Markets"],
    languages: ["Portuguese", "English"],
    experience: "6 years",
    verified: true,
  },
];

// Sample tours and activities data
const toursData: Tour[] = [
  {
    id: "portuguese-food-camden",
    title: "Portuguese Food Discovery in Camden",
    description: "Explore the hidden Portuguese gems in Camden Market and surrounding areas. Taste authentic pastéis de nata, bifana, and discover where Portuguese locals shop for ingredients from home.",
    category: 'food',
    duration: "3.5 hours",
    price: 45,
    maxGroupSize: 8,
    currentBookings: 6,
    location: "Camden Market & Surroundings",
    meetingPoint: "Camden Market Main Entrance",
    highlights: [
      "Authentic pastéis de nata from Portuguese bakery",
      "Traditional bifana preparation demonstration",
      "Portuguese grocery shopping experience",
      "Meet local Portuguese business owners",
      "Learn Portuguese food vocabulary"
    ],
    includes: [
      "Professional Portuguese guide",
      "Food tastings (5+ items)",
      "Recipe cards in Portuguese & English",
      "Transport between locations"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'easy',
    targetAudience: ['solo', 'families', 'couples'],
    guide: portugueseGuides[0],
    images: [
      buildUnsplashUrl("photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1509440159596-0249088772ff?w=800&h=400&fit=crop")
    ],
    featured: true,
    availability: 'limited',
    nextAvailableDate: "2025-08-25",
    tags: ["Food", "Culture", "Portuguese Community", "Authentic"],
    culturalFocus: ["Portuguese Cuisine", "Community Connections", "Language Practice"],
  },
  {
    id: "portuguese-business-london",
    title: "Portuguese Business Districts & Networking",
    description: "Professional tour of Portuguese business concentrations in London. Visit Portuguese companies, learn about business opportunities, and network with successful Portuguese entrepreneurs.",
    category: 'business',
    duration: "4 hours",
    price: 85,
    maxGroupSize: 12,
    currentBookings: 8,
    location: "City of London & Canary Wharf",
    meetingPoint: "Bank Station Exit 3",
    highlights: [
      "Visit Portuguese-owned businesses",
      "Meet successful Portuguese entrepreneurs",
      "Business networking opportunities",
      "Investment and partnership insights",
      "Professional development in Portuguese context"
    ],
    includes: [
      "Expert business guide",
      "Business lunch at Portuguese restaurant",
      "Networking contact cards",
      "Market research insights",
      "Follow-up business community access"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'easy',
    targetAudience: ['business'],
    guide: portugueseGuides[1],
    images: [
      buildUnsplashUrl("photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1556761175-b413da4baf72?w=800&h=400&fit=crop")
    ],
    featured: false,
    availability: 'available',
    nextAvailableDate: "2025-08-22",
    tags: ["Business", "Networking", "Professional", "Entrepreneurs"],
    culturalFocus: ["Business Culture", "Professional Networks", "Economic Opportunities"],
  },
  {
    id: "portuguese-heritage-walking",
    title: "Portuguese Heritage in Central London",
    description: "Walk through the historical Portuguese presence in London. From embassy district to cultural centers, discover centuries of Portuguese influence in the British capital.",
    category: 'cultural',
    duration: "2.5 hours",
    price: 35,
    maxGroupSize: 15,
    currentBookings: 10,
    location: "Central London",
    meetingPoint: "Portuguese Embassy Area",
    highlights: [
      "Portuguese Embassy and diplomatic history",
      "Cultural centers and Portuguese institutions",
      "Historical Portuguese residents stories",
      "Portuguese cultural influence on London",
      "Traditional Portuguese architectural elements"
    ],
    includes: [
      "Cultural heritage expert guide",
      "Historical documentation",
      "Portuguese cultural context",
      "Photo opportunities at key locations"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'easy',
    targetAudience: ['solo', 'families', 'couples'],
    guide: portugueseGuides[2],
    images: [
      buildUnsplashUrl("photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1533929736458-ca588d08c8be?w=800&h=400&fit=crop")
    ],
    featured: true,
    availability: 'available',
    nextAvailableDate: "2025-08-20",
    tags: ["Heritage", "Culture", "History", "Walking Tour"],
    culturalFocus: ["Portuguese History", "Cultural Heritage", "Community Stories"],
  },
  {
    id: "portobello-portuguese-markets",
    title: "Portuguese Life in Portobello & Notting Hill",
    description: "Discover the vibrant Portuguese community in Portobello Road and Notting Hill. Experience authentic Portuguese lifestyle, markets, and community gathering places.",
    category: 'neighborhoods',
    duration: "3 hours",
    price: 40,
    maxGroupSize: 10,
    currentBookings: 4,
    location: "Portobello Road & Notting Hill",
    meetingPoint: "Notting Hill Gate Station",
    highlights: [
      "Portuguese community hubs in Notting Hill",
      "Traditional Portuguese shops and services",
      "Community gathering places and cafés",
      "Portuguese influence on local culture",
      "Meet local Portuguese residents"
    ],
    includes: [
      "Local community guide",
      "Portuguese coffee tasting",
      "Community insights and contacts",
      "Local shopping recommendations"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'easy',
    targetAudience: ['solo', 'families', 'couples'],
    guide: portugueseGuides[0],
    images: [
      buildUnsplashUrl("photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1520637836862-4d197d17c936?w=800&h=400&fit=crop")
    ],
    featured: false,
    availability: 'available',
    nextAvailableDate: "2025-08-21",
    tags: ["Neighborhoods", "Community", "Local Life", "Markets"],
    culturalFocus: ["Community Living", "Local Integration", "Portuguese Lifestyle"],
  },
  {
    id: "greenwich-portuguese-maritime",
    title: "Portuguese Maritime History in Greenwich",
    description: "Explore the deep Portuguese maritime connections to Greenwich and the Thames. Discover Portuguese navigational contributions and historical maritime trade relationships.",
    category: 'history',
    duration: "4 hours",
    price: 55,
    maxGroupSize: 12,
    currentBookings: 7,
    location: "Greenwich",
    meetingPoint: "Greenwich Station",
    highlights: [
      "Portuguese maritime history and navigation",
      "Greenwich maritime connections to Portugal",
      "Historical trade relationships",
      "Portuguese navigational instruments",
      "Thames Portuguese maritime influence"
    ],
    includes: [
      "Maritime history specialist guide",
      "Museum entries",
      "Historical documentation",
      "Portuguese maritime context",
      "Traditional Portuguese sailor meal"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'moderate',
    targetAudience: ['solo', 'families', 'couples'],
    guide: portugueseGuides[1],
    images: [
      buildUnsplashUrl("photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop")
    ],
    featured: false,
    availability: 'available',
    nextAvailableDate: "2025-08-23",
    tags: ["History", "Maritime", "Culture", "Educational"],
    culturalFocus: ["Maritime Heritage", "Historical Connections", "Portuguese Exploration"],
  },
  {
    id: "family-portuguese-london",
    title: "Family-Friendly Portuguese London Adventure",
    description: "Perfect family tour introducing children to Portuguese culture in London. Interactive experiences, kid-friendly Portuguese activities, and family bonding in a cultural context.",
    category: 'cultural',
    duration: "2.5 hours",
    price: 30,
    maxGroupSize: 8,
    currentBookings: 5,
    location: "Central London Parks & Cultural Sites",
    meetingPoint: "Hyde Park Corner",
    highlights: [
      "Interactive Portuguese culture activities for kids",
      "Family-friendly Portuguese games and stories",
      "Child-appropriate cultural learning",
      "Portuguese language fun for children",
      "Family photography in cultural settings"
    ],
    includes: [
      "Family specialist guide",
      "Activity materials for children",
      "Portuguese snacks for kids",
      "Family cultural games",
      "Take-home Portuguese learning materials"
    ],
    language: ["Portuguese", "English"],
    difficulty: 'easy',
    targetAudience: ['families'],
    guide: portugueseGuides[2],
    images: [
      buildUnsplashUrl("photo-1560707303-4e980ce876ad?w=800&h=400&fit=crop"),
      buildUnsplashUrl("photo-1533929736458-ca588d08c8be?w=800&h=400&fit=crop")
    ],
    featured: false,
    availability: 'available',
    nextAvailableDate: "2025-08-24",
    tags: ["Family", "Children", "Interactive", "Cultural Learning"],
    specialOffers: "Kids under 12 half price",
    culturalFocus: ["Family Culture", "Children's Learning", "Cultural Transmission"],
  },
];

// Statistics for the showcase
const tourStats = [
  {
    number: "50+",
    label: "tours.showcase.stats.tours_monthly",
    icon: <CalendarDaysIcon className="w-5 h-5" />,
  },
  {
    number: "25+",
    label: "tours.showcase.stats.portuguese_guides",
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    number: "98%",
    label: "tours.showcase.stats.satisfaction",
    icon: <StarIcon className="w-5 h-5" />,
  },
  {
    number: "15+",
    label: "tours.showcase.stats.destinations",
    icon: <MapPinIcon className="w-5 h-5" />,
  },
];

// Helper function to get category icons
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    'cultural': <SparklesIcon className="w-6 h-6" />,
    'food': <BeakerIcon className="w-6 h-6" />,
    'history': <BookOpenIcon className="w-6 h-6" />,
    'neighborhoods': <MapPinIcon className="w-6 h-6" />,
    'business': <BuildingOffice2Icon className="w-6 h-6" />
  };
  return iconMap[category] || <CalendarDaysIcon className="w-6 h-6" />;
};

// Helper function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'cultural': 'from-primary-500 to-secondary-500',
    'food': 'from-coral-500 to-accent-500',
    'history': 'from-secondary-500 to-premium-500',
    'neighborhoods': 'from-accent-500 to-action-500',
    'business': 'from-premium-500 to-primary-500'
  };
  return colorMap[category] || 'from-gray-500 to-gray-600';
};

// Tour Filter Component
const TourFilters = memo(({ activeFilter, onFilterChange }: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) => {
  const { t } = useLanguage();
  
  const filters = [
    { key: 'all', label: 'tours.showcase.filters.all' },
    { key: 'solo', label: 'tours.showcase.filters.solo' },
    { key: 'families', label: 'tours.showcase.filters.families' },
    { key: 'business', label: 'tours.showcase.filters.business' },
    { key: 'cultural', label: 'tours.showcase.filters.cultural' },
    { key: 'food', label: 'tours.showcase.filters.food' },
    { key: 'history', label: 'tours.showcase.filters.history' },
    { key: 'neighborhoods', label: 'tours.showcase.filters.neighborhoods' },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.key
              ? 'bg-gradient-to-r from-secondary-500 to-primary-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-secondary-300 hover:text-secondary-600'
          }`}
        >
          {t(filter.label)}
        </button>
      ))}
    </div>
  );
});
TourFilters.displayName = "TourFilters";

// Trust Indicators Component
const TrustIndicators = memo(() => {
  const { t } = useLanguage();
  
  const trustFeatures = [
    {
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      text: 'tours.showcase.trust.verified_guides'
    },
    {
      icon: <AcademicCapIcon className="w-5 h-5" />,
      text: 'tours.showcase.trust.local_knowledge'
    },
    {
      icon: <HeartIcon className="w-5 h-5" />,
      text: 'tours.showcase.trust.cultural_understanding'
    },
    {
      icon: <UserGroupIcon className="w-5 h-5" />,
      text: 'tours.showcase.trust.community_recommended'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {trustFeatures.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
            {feature.icon}
          </div>
          <span className="text-sm font-medium text-gray-700">{t(feature.text)}</span>
        </motion.div>
      ))}
    </div>
  );
});
TrustIndicators.displayName = "TrustIndicators";

// Main ToursActivitiesShowcase Component
const ToursActivitiesShowcase = memo(() => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter tours based on active filter
  const filteredTours = useMemo(() => {
    if (activeFilter === 'all') return toursData;
    
    if (['solo', 'families', 'business'].includes(activeFilter)) {
      return toursData.filter(tour => tour.targetAudience.includes(activeFilter as any));
    }
    
    return toursData.filter(tour => tour.category === activeFilter);
  }, [activeFilter]);

  const handleBookTour = (tourId: string) => {
    // Integration with existing transport booking system
    window.location.href = `/tours/${tourId}/book`;
  };

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
            <GlobeAltIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">
              {t('tours.showcase.featured_badge')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t('tours.showcase.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t('tours.showcase.subtitle')}
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
        >
          {tourStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{t(stat.label)}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Tour Filters */}
        <TourFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Featured Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {filteredTours.slice(0, 6).map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Tour Image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 bg-gradient-to-r ${getCategoryColor(tour.category)} rounded-lg flex items-center justify-center text-white`}>
                      {getCategoryIcon(tour.category)}
                    </div>
                    <div className="text-xs font-bold text-gray-900 capitalize">
                      {tour.category}
                    </div>
                  </div>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl px-3 py-2 shadow-lg">
                  <div className="text-xs font-bold">
                    {t('tours.showcase.from_price')}{tour.price}
                  </div>
                </div>

                {/* Featured badge */}
                {tour.featured && (
                  <div className="absolute top-16 left-4 bg-gradient-to-r from-accent-400 to-coral-500 text-white rounded-lg px-2 py-1 shadow-lg animate-pulse">
                    <div className="text-xs font-bold flex items-center">
                      <SparklesIcon className="w-3 h-3 mr-1" />
                      FEATURED
                    </div>
                  </div>
                )}

                {/* Availability status */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
                  <div className={`text-xs font-medium flex items-center gap-1 ${
                    tour.availability === 'available' ? 'text-green-600' : 
                    tour.availability === 'limited' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      tour.availability === 'available' ? 'bg-green-500' : 
                      tour.availability === 'limited' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    {tour.availability === 'available' ? 'Available' :
                     tour.availability === 'limited' ? 'Limited Spots' : 'Fully Booked'}
                  </div>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex-1">
                    {tour.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {tour.description}
                </p>

                {/* Tour Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {tour.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UsersIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {tour.currentBookings}/{tour.maxGroupSize} booked
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <LanguageIcon className="w-4 h-4 mr-2 text-primary-500" />
                    {tour.language.join(', ')}
                  </div>
                </div>

                {/* Guide Info */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={tour.guide.image}
                      alt={tour.guide.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        {tour.guide.name}
                        {tour.guide.verified && (
                          <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <StarIcon className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">
                            {tour.guide.rating} ({tour.guide.reviews})
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {tour.guide.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultural Focus Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tour.culturalFocus.slice(0, 2).map((focus, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full border border-primary-200"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                {/* Target Audience Icons */}
                <div className="flex items-center gap-2 mb-4">
                  {tour.targetAudience.map((audience) => (
                    <span
                      key={audience}
                      className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-lg font-medium"
                    >
                      {t(`tours.showcase.${audience === 'solo' ? 'solo_friendly' : 
                          audience === 'families' ? 'family_welcome' : 
                          audience === 'business' ? 'business_groups' : audience}`)}
                    </span>
                  ))}
                </div>

                {/* Booking Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600 font-medium">
                      {tour.maxGroupSize - tour.currentBookings} spots left
                    </span>
                    <span className="text-xs font-medium text-primary-600">
                      {Math.round((tour.currentBookings / tour.maxGroupSize) * 100)}% full
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(tour.currentBookings / tour.maxGroupSize) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Special Offers */}
                {tour.specialOffers && (
                  <div className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 mb-4">
                    🎁 {tour.specialOffers}
                  </div>
                )}

                {/* Book Button */}
                <div className="mt-auto space-y-3">
                  {tour.availability !== 'fully-booked' ? (
                    <>
                      <button
                        onClick={() => handleBookTour(tour.id)}
                        className="w-full bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700 text-white font-semibold py-4 rounded-2xl hover:from-secondary-600 hover:via-secondary-700 hover:to-secondary-800 transition-all duration-300 group-hover:scale-105 shadow-xl hover:shadow-2xl min-h-[44px] flex items-center justify-center"
                      >
                        {t('tours.showcase.book_now')} - £{tour.price}
                      </button>
                      
                      {/* Group booking option for business tours */}
                      {tour.category === 'business' && (
                        <button
                          onClick={() => handleBookTour(`${tour.id}-group`)}
                          className="w-full bg-gradient-to-r from-coral-500 to-accent-500 text-white font-medium py-3 rounded-xl hover:from-coral-600 hover:to-accent-600 transition-all duration-300 text-center shadow-lg hover:shadow-xl min-h-[40px] flex items-center justify-center gap-2"
                        >
                          <UserGroupIcon className="w-4 h-4" />
                          {t('tours.showcase.group_booking')}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white font-semibold py-4 rounded-2xl cursor-not-allowed min-h-[44px] flex items-center justify-center"
                    >
                      Fully Booked - {tour.nextAvailableDate}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 rounded-3xl p-10 text-white shadow-2xl border border-white/10">
            <h3 className="text-3xl font-bold mb-6">
              Experience London Through Portuguese Eyes
            </h3>
            <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join passionate Portuguese guides who understand your culture and heritage. 
              From hidden food gems to business opportunities, discover London like never before.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/tours"
                className="inline-flex items-center bg-white text-secondary-600 font-bold px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                {t('tours.showcase.view_all_tours')}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={ROUTES.auth.signup}
                className="inline-flex items-center border-2 border-white text-white font-bold px-10 py-4 rounded-2xl hover:bg-white hover:text-secondary-600 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                {t('tours.showcase.join_community')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
ToursActivitiesShowcase.displayName = "ToursActivitiesShowcase";

export default ToursActivitiesShowcase;