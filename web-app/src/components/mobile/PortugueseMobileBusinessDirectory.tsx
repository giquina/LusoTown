"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  ClockIcon,
  StarIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CameraIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolid,
  BookmarkIcon as BookmarkSolid,
  HeartIcon as HeartSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useHeritage } from "@/context/HeritageContext";
import {
  PortugueseHeritageBadge,
  PortugueseCulturalCard,
} from "./PortugueseCulturalMobileComponents";
import {
  PortugueseSwipeActions,
  PortugueseDoubleTap,
  PortugueseLongPressMenu,
} from "./PortugueseGestureSystem";

// Portuguese Business Types
interface PortugueseBusiness {
  id: string;
  name: string;
  category:
    | "restaurant"
    | "cafe"
    | "market"
    | "service"
    | "retail"
    | "healthcare"
    | "education"
    | "cultural";
  description: string;
  address: string;
  postcode: string;
  phone?: string;
  website?: string;
  email?: string;
  heritage:
    | "portugal"
    | "brazil"
    | "cape-verde"
    | "angola"
    | "mozambique"
    | "guinea-bissau";
  rating: number;
  reviewCount: number;
  images: string[];
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  specialties: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  verified: boolean;
  distance?: number;
  coordinates: [number, number];
}

// Mobile Business Card Component
interface MobileBusinessCardProps {
  business: PortugueseBusiness;
  onSelect: (business: PortugueseBusiness) => void;
  onBookmark: (businessId: string) => void;
  onShare: (business: PortugueseBusiness) => void;
  onGetDirections: (business: PortugueseBusiness) => void;
  isBookmarked: boolean;
  showDistance?: boolean;
  className?: string;
}

export function MobileBusinessCard({
  business,
  onSelect,
  onBookmark,
  onShare,
  onGetDirections,
  isBookmarked,
  showDistance = true,
  className = "",
}: MobileBusinessCardProps) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryLabels: Record<
    PortugueseBusiness["category"],
    { pt: string; en: string }
  > = {
    restaurant: { pt: "Restaurante", en: "Restaurant" },
    cafe: { pt: "Café", en: "Cafe" },
    market: { pt: "Mercado", en: "Market" },
    service: { pt: "Serviço", en: "Service" },
    retail: { pt: "Comércio", en: "Retail" },
    healthcare: { pt: "Saúde", en: "Healthcare" },
    education: { pt: "Educação", en: "Education" },
    cultural: { pt: "Cultural", en: "Cultural" },
  };

  const longPressMenuItems: Array<{
    id: string;
    label: { pt: string; en: string };
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
    color: string;
  }> = [
    {
      id: "directions",
      label: { pt: "Direções", en: "Directions" },
      icon: ArrowTopRightOnSquareIcon as unknown as React.ComponentType<{
        className?: string;
      }>,
      action: () => onGetDirections(business),
      color: "blue-600",
    },
    {
      id: "call",
      label: { pt: "Ligar", en: "Call" },
      icon: PhoneIcon as unknown as React.ComponentType<{ className?: string }>,
      action: () => business.phone && window.open(`tel:${business.phone}`),
      color: "green-600",
    },
    {
      id: "website",
      label: { pt: "Website", en: "Website" },
      icon: GlobeAltIcon as unknown as React.ComponentType<{
        className?: string;
      }>,
      action: () => business.website && window.open(business.website, "_blank"),
      color: "purple-600",
    },
    {
      id: "share",
      label: { pt: "Partilhar", en: "Share" },
      icon: ShareIcon as unknown as React.ComponentType<{ className?: string }>,
      action: () => onShare(business),
      color: "amber-600",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % business.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + business.images.length) % business.images.length
    );
  };

  return (
    <PortugueseLongPressMenu
      onLongPress={() => {}}
      menuItems={longPressMenuItems}
      className={className}
    >
      <PortugueseSwipeActions
        onLike={() => onBookmark(business.id)}
        onShare={() => onShare(business)}
        onBookmark={() => onBookmark(business.id)}
        isLiked={false}
        isBookmarked={isBookmarked}
        className="w-full"
      >
        <PortugueseDoubleTap
          onDoubleTap={() => onBookmark(business.id)}
          onSingleTap={() => onSelect(business)}
          feedbackType="heart"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Image Carousel */}
            {business.images.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={business.images[currentImageIndex]}
                    alt={business.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Image Navigation */}
                {business.images.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {business.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Business Heritage Badge */}
                <div className="absolute top-3 left-3">
                  <PortugueseHeritageBadge
                    country={business.heritage}
                    size="sm"
                    showLabel={false}
                  />
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <motion.button
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmark(business.id);
                    }}
                  >
                    {isBookmarked ? (
                      <BookmarkSolid className="w-4 h-4 text-amber-500" />
                    ) : (
                      <BookmarkIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </motion.button>

                  <motion.button
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(business);
                    }}
                  >
                    <ShareIcon className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>

                {/* Verification Badge */}
                {business.verified && (
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <StarSolid className="w-3 h-3" />
                      {language === "pt" ? "Verificado" : "Verified"}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Business Information */}
            <div className="p-4">
              {/* Category and Price Range */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {
                    categoryLabels[business.category][
                      language === "pt" ? "pt" : "en"
                    ]
                  }
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-green-600">
                    {business.priceRange}
                  </span>
                  {showDistance && business.distance && (
                    <span className="text-xs text-gray-500">
                      {business.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
              </div>

              {/* Business Name */}
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 text-lg">
                {business.name}
              </h3>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(business.rating)
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {business.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({business.reviewCount}{" "}
                  {language === "pt" ? "avaliações" : "reviews"})
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-3">
                <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 line-clamp-2">
                  {business.address}, {business.postcode}
                </p>
              </div>

              {/* Specialties */}
              {business.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {business.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {business.specialties.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{business.specialties.length - 3}{" "}
                      {language === "pt" ? "mais" : "more"}
                    </span>
                  )}
                </div>
              )}

              {/* Quick Contact Actions */}
              <div className="flex gap-2 mt-4">
                {business.phone && (
                  <motion.button
                    className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 min-h-[40px]"
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${business.phone}`);
                    }}
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {language === "pt" ? "Ligar" : "Call"}
                  </motion.button>
                )}

                <motion.button
                  className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 min-h-[40px]"
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onGetDirections(business);
                  }}
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  {language === "pt" ? "Direções" : "Directions"}
                </motion.button>
              </div>
            </div>

            {/* Portuguese Cultural Pattern */}
            <div
              className="absolute bottom-0 right-0 w-16 h-16 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23DC143C'/><circle cx='30' cy='30' r='20' fill='none' stroke='%23228B22' stroke-width='2' opacity='0.5'/><circle cx='30' cy='30' r='10' fill='none' stroke='%23D4A574' stroke-width='1' opacity='0.7'/></svg>")`,
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>
        </PortugueseDoubleTap>
      </PortugueseSwipeActions>
    </PortugueseLongPressMenu>
  );
}

// Portuguese Mobile Business Filter
interface MobileBusinessFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: BusinessFilters) => void;
  currentFilters: BusinessFilters;
  className?: string;
}

interface BusinessFilters {
  categories: string[];
  heritage: string[];
  priceRange: string[];
  rating: number;
  distance: number;
  verified: boolean;
  openNow: boolean;
}

export function MobileBusinessFilter({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
  className = "",
}: MobileBusinessFilterProps) {
  const { language } = useLanguage();
  const [filters, setFilters] = useState<BusinessFilters>(currentFilters);

  const categories = [
    { id: "restaurant", label: { pt: "Restaurantes", en: "Restaurants" } },
    { id: "cafe", label: { pt: "Cafés", en: "Cafes" } },
    { id: "market", label: { pt: "Mercados", en: "Markets" } },
    { id: "service", label: { pt: "Serviços", en: "Services" } },
    { id: "retail", label: { pt: "Comércio", en: "Retail" } },
    { id: "healthcare", label: { pt: "Saúde", en: "Healthcare" } },
    { id: "education", label: { pt: "Educação", en: "Education" } },
    { id: "cultural", label: { pt: "Cultural", en: "Cultural" } },
  ];

  const heritageOptions = [
    { id: "portugal", label: { pt: "Portugal", en: "Portugal" } },
    { id: "brazil", label: { pt: "Brasil", en: "Brazil" } },
    { id: "cape-verde", label: { pt: "Cabo Verde", en: "Cape Verde" } },
    { id: "angola", label: { pt: "Angola", en: "Angola" } },
    { id: "mozambique", label: { pt: "Moçambique", en: "Mozambique" } },
    { id: "guinea-bissau", label: { pt: "Guiné-Bissau", en: "Guinea-Bissau" } },
  ];

  const priceRanges = [
    { id: "$", label: "$" },
    { id: "$$", label: "$$" },
    { id: "$$$", label: "$$$" },
    { id: "$$$$", label: "$$$$" },
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: BusinessFilters = {
      categories: [],
      heritage: [],
      priceRange: [],
      rating: 0,
      distance: 50,
      verified: false,
      openNow: false,
    };
    setFilters(resetFilters);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto ${className}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 border-b border-gray-100">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {language === "pt" ? "Filtros" : "Filters"}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {language === "pt" ? "Limpar" : "Reset"}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === "pt" ? "Categorias" : "Categories"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        filters.categories.includes(category.id)
                          ? "bg-red-100 text-red-700 border-2 border-red-200"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          categories: prev.categories.includes(category.id)
                            ? prev.categories.filter((c) => c !== category.id)
                            : [...prev.categories, category.id],
                        }));
                      }}
                    >
                      {category.label[language as keyof typeof category.label]}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Heritage */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === "pt" ? "Herança Cultural" : "Cultural Heritage"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {heritageOptions.map((heritage) => (
                    <motion.button
                      key={heritage.id}
                      className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                        filters.heritage.includes(heritage.id)
                          ? "bg-green-100 text-green-700 border-2 border-green-200"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          heritage: prev.heritage.includes(heritage.id)
                            ? prev.heritage.filter((h) => h !== heritage.id)
                            : [...prev.heritage, heritage.id],
                        }));
                      }}
                    >
                      <PortugueseHeritageBadge
                        country={heritage.id as any}
                        size="sm"
                        showLabel={false}
                      />
                      {heritage.label[language as keyof typeof heritage.label]}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === "pt" ? "Faixa de Preço" : "Price Range"}
                </h3>
                <div className="flex gap-3">
                  {priceRanges.map((price) => (
                    <motion.button
                      key={price.id}
                      className={`flex-1 p-3 rounded-xl font-bold transition-all ${
                        filters.priceRange.includes(price.id)
                          ? "bg-amber-100 text-amber-700 border-2 border-amber-200"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent"
                      }`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: prev.priceRange.includes(price.id)
                            ? prev.priceRange.filter((p) => p !== price.id)
                            : [...prev.priceRange, price.id],
                        }));
                      }}
                    >
                      {price.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === "pt" ? "Avaliação Mínima" : "Minimum Rating"}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, rating: star }))
                        }
                      >
                        <StarSolid
                          className={`w-8 h-8 ${
                            star <= filters.rating
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {filters.rating > 0
                      ? `${filters.rating}+ ${language === "pt" ? "estrelas" : "stars"}`
                      : language === "pt"
                        ? "Qualquer avaliação"
                        : "Any rating"}
                  </span>
                </div>
              </div>

              {/* Distance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === "pt" ? "Distância Máxima" : "Maximum Distance"}
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filters.distance}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        distance: parseInt(e.target.value),
                      }))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1 km</span>
                    <span className="font-semibold text-gray-900">
                      {filters.distance} km
                    </span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-4">
                <motion.label
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium text-gray-900">
                    {language === "pt"
                      ? "Apenas negócios verificados"
                      : "Verified businesses only"}
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        verified: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-red-600 bg-white border-2 border-gray-300 rounded focus:ring-red-500"
                  />
                </motion.label>

                <motion.label
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-medium text-gray-900">
                    {language === "pt" ? "Aberto agora" : "Open now"}
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.openNow}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        openNow: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500"
                  />
                </motion.label>
              </div>
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
              <motion.button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg"
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
              >
                {language === "pt" ? "Aplicar Filtros" : "Apply Filters"}
              </motion.button>
              <div className="safe-area-pb" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function PortugueseMobileBusinessDirectory() {
  // This file exports individual components; default export preserved as a noop component
  // to satisfy any legacy imports expecting a component. Prefer named imports.
  return null;
}
