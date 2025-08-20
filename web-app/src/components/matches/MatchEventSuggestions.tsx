"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  TicketIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import Link from "next/link";
import { formatPrice } from "@/config/pricing";

interface EventSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  culturalCategory: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  price: number;
  spotsAvailable: number;
  totalSpots: number;
  compatibilityScore: number;
  compatibilityReasons: string[];
  image?: string;
  isFadoFeatured: boolean;
  isSantosPopulares: boolean;
  isFootballViewing: boolean;
  buddyDiscountPercent: number;
  culturalAuthenticity: number;
}

interface MatchEventSuggestionsProps {
  matchId: string;
  matchedUserName: string;
  matchedUserAge: number;
  sharedInterests: string[];
  compatibilityScore: number;
  onBookTogether?: (eventId: string) => void;
  onSaveEvent?: (eventId: string) => void;
}

export default function MatchEventSuggestions({
  matchId,
  matchedUserName,
  matchedUserAge,
  sharedInterests,
  compatibilityScore,
  onBookTogether,
  onSaveEvent,
}: MatchEventSuggestionsProps) {
  const { language, t } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventSuggestion | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock event suggestions based on compatibility
  useEffect(() => {
    const mockSuggestions: EventSuggestion[] = [
      {
        id: "1",
        title: language === "pt" ? "Noite de Fado Autêntico" : "Authentic Fado Night",
        description: language === "pt" 
          ? "Uma noite íntima de Fado com fadistas tradicionais e guitarras portuguesas"
          : "An intimate evening of Fado with traditional fadistas and Portuguese guitars",
        category: "Cultural",
        culturalCategory: "Fado Music",
        date: "2025-08-25",
        time: "19:30",
        location: "Portuguese Cultural Centre",
        neighborhood: "Vauxhall",
        price: 25,
        spotsAvailable: 12,
        totalSpots: 30,
        compatibilityScore: 95,
        compatibilityReasons: ["fado_music_lovers", "cultural_preservation", "intimate_setting"],
        isFadoFeatured: true,
        isSantosPopulares: false,
        isFootballViewing: false,
        buddyDiscountPercent: 15,
        culturalAuthenticity: 100,
      },
      {
        id: "2",
        title: language === "pt" ? "Degustação de Vinhos do Douro" : "Douro Wine Tasting",
        description: language === "pt"
          ? "Prove os melhores vinhos do Douro com petiscos tradicionais portugueses"
          : "Taste the finest Douro wines with traditional Portuguese appetizers",
        category: "Gastronomy",
        culturalCategory: "Portuguese Wine",
        date: "2025-08-28",
        time: "18:00",
        location: "Lusitania Wine Bar",
        neighborhood: "Borough Market",
        price: 45,
        spotsAvailable: 8,
        totalSpots: 20,
        compatibilityScore: 88,
        compatibilityReasons: ["wine_enthusiasts", "portuguese_cuisine", "social_networking"],
        isFadoFeatured: false,
        isSantosPopulares: false,
        isFootballViewing: false,
        buddyDiscountPercent: 20,
        culturalAuthenticity: 95,
      },
      {
        id: "3",
        title: language === "pt" ? "Portugal vs Espanha - Final" : "Portugal vs Spain - Final",
        description: language === "pt"
          ? "Assistam ao grande jogo juntos com a comunidade portuguesa de Londres"
          : "Watch the big game together with London's Portuguese community",
        category: "Sports",
        culturalCategory: "Football",
        date: "2025-09-01",
        time: "20:00",
        location: "Sports Bar Português",
        neighborhood: "Stockwell",
        price: 15,
        spotsAvailable: 25,
        totalSpots: 50,
        compatibilityScore: 92,
        compatibilityReasons: ["football_fans", "community_bonding", "portuguese_pride"],
        isFadoFeatured: false,
        isSantosPopulares: false,
        isFootballViewing: true,
        buddyDiscountPercent: 10,
        culturalAuthenticity: 90,
      },
      {
        id: "4",
        title: language === "pt" ? "Workshop de Pastéis de Nata" : "Pastéis de Nata Workshop",
        description: language === "pt"
          ? "Aprendam a fazer os famosos pastéis de nata com um chef português"
          : "Learn to make the famous pastéis de nata with a Portuguese chef",
        category: "Workshop",
        culturalCategory: "Portuguese Cuisine",
        date: "2025-09-05",
        time: "14:00",
        location: "Cooking Studio Lisboa",
        neighborhood: "Camden",
        price: 35,
        spotsAvailable: 6,
        totalSpots: 16,
        compatibilityScore: 85,
        compatibilityReasons: ["culinary_interests", "hands_on_learning", "cultural_skills"],
        isFadoFeatured: false,
        isSantosPopulares: false,
        isFootballViewing: false,
        buddyDiscountPercent: 25,
        culturalAuthenticity: 100,
      },
    ];

    // Filter suggestions based on shared interests
    const filteredSuggestions = mockSuggestions.filter(suggestion => 
      suggestion.compatibilityReasons.some(reason => 
        sharedInterests.some(interest => 
          interest.toLowerCase().includes(reason.split('_')[0]) ||
          reason.includes(interest.toLowerCase().replace(/\s+/g, '_'))
        )
      )
    );

    setTimeout(() => {
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : mockSuggestions.slice(0, 2));
      setLoading(false);
    }, 800);
  }, [matchId, sharedInterests, language]);

  const handleBookTogether = (event: EventSuggestion) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
    onBookTogether?.(event.id);
  };

  const handleSaveEvent = (eventId: string) => {
    onSaveEvent?.(eventId);
  };

  const getCulturalIcon = (category: string) => {
    switch (category) {
      case "Fado Music":
        return "🎵";
      case "Portuguese Wine":
        return "🍷";
      case "Football":
        return "⚽";
      case "Portuguese Cuisine":
        return "🥮";
      default:
        return "🇵🇹";
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-primary-50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
            <CalendarDaysIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">
            {language === "pt" 
              ? "Eventos Sugeridos para Vocês" 
              : "Suggested Events for You Two"}
          </h3>
        </div>
        
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HeartSolid className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-primary-900">
                {language === "pt" 
                  ? `Você e ${matchedUserName}` 
                  : `You and ${matchedUserName}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-bold text-primary-700">
                {compatibilityScore}% {language === "pt" ? "compatíveis" : "compatible"}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sharedInterests.slice(0, 3).map((interest, index) => (
              <span 
                key={index}
                className="bg-white/80 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium"
              >
                {interest}
              </span>
            ))}
            {sharedInterests.length > 3 && (
              <span className="text-primary-600 text-xs font-medium">
                +{sharedInterests.length - 3} {language === "pt" ? "mais" : "more"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Event Suggestions */}
      <div className="space-y-4">
        <AnimatePresence>
          {suggestions.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-primary-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-primary-200"
            >
              {/* Event Header */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-2xl">
                    {getCulturalIcon(event.culturalCategory)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-primary-900 text-base mb-1 leading-tight">
                        {event.title}
                      </h4>
                      <p className="text-sm text-primary-700 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className={`ml-3 px-2 py-1 rounded-lg border text-xs font-bold ${getCompatibilityColor(event.compatibilityScore)}`}>
                      {event.compatibilityScore}% match
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-primary-600">
                      <CalendarDaysIcon className="w-3 h-3" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary-600">
                      <MapPinIcon className="w-3 h-3" />
                      <span className="truncate">{event.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary-600">
                      <TicketIcon className="w-3 h-3" />
                      <span>{formatPrice(event.price)}</span>
                      {event.buddyDiscountPercent > 0 && (
                        <span className="text-green-600 font-semibold">
                          (-{event.buddyDiscountPercent}% juntos!)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-primary-600">
                      <UserGroupIcon className="w-3 h-3" />
                      <span>{event.spotsAvailable} {language === "pt" ? "vagas" : "spots"}</span>
                    </div>
                  </div>
                  
                  {/* Compatibility Reasons */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {event.compatibilityReasons.slice(0, 2).map((reason, idx) => (
                        <span 
                          key={idx}
                          className="bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {reason.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Special Badges */}
                  {(event.isFadoFeatured || event.culturalAuthenticity >= 95) && (
                    <div className="flex gap-2 mb-3">
                      {event.isFadoFeatured && (
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          🎵 Fado Autêntico
                        </span>
                      )}
                      {event.culturalAuthenticity >= 95 && (
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          ✨ Tradição 100%
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookTogether(event)}
                      className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-1"
                    >
                      <UsersIcon className="w-4 h-4" />
                      {language === "pt" ? "Reservar Juntos" : "Book Together"}
                    </button>
                    
                    <button
                      onClick={() => handleSaveEvent(event.id)}
                      className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                      aria-label={language === "pt" ? "Guardar evento" : "Save event"}
                    >
                      <HeartIcon className="w-4 h-4" />
                    </button>
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                      aria-label={language === "pt" ? "Ver detalhes" : "View details"}
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No suggestions fallback */}
      {suggestions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h4 className="font-semibold text-primary-900 mb-2">
            {language === "pt" 
              ? "Estamos a preparar sugestões personalizadas" 
              : "We're preparing personalized suggestions"}
          </h4>
          <p className="text-primary-600 text-sm">
            {language === "pt"
              ? "Com base nos vossos interesses comuns, encontraremos eventos perfeitos para vocês!"
              : "Based on your shared interests, we'll find perfect events for you both!"}
          </p>
        </div>
      )}

      {/* Premium Upgrade Prompt for Free Users */}
      {!hasActiveSubscription && suggestions.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <SparklesIcon className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-orange-900 mb-1">
                {language === "pt" 
                  ? "Quer mais sugestões personalizadas?" 
                  : "Want more personalized suggestions?"}
              </h5>
              <p className="text-orange-700 text-sm">
                {language === "pt"
                  ? "Membros Premium recebem 3x mais sugestões culturais baseadas na compatibilidade."
                  : "Premium members get 3x more cultural suggestions based on compatibility."}
              </p>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {language === "pt" ? "Reservar Juntos!" : "Book Together!"}
                </h3>
                <p className="text-primary-700">
                  {language === "pt"
                    ? `Reservem "${selectedEvent.title}" e poupem ${selectedEvent.buddyDiscountPercent}% como par!`
                    : `Book "${selectedEvent.title}" and save ${selectedEvent.buddyDiscountPercent}% as a pair!`}
                </p>
              </div>

              <div className="bg-primary-50 p-4 rounded-xl mb-4">
                <div className="text-center">
                  <div className="font-bold text-primary-900 text-lg">
                    {formatPrice(selectedEvent.price * 2 * (1 - selectedEvent.buddyDiscountPercent / 100))}
                  </div>
                  <div className="text-primary-600 text-sm">
                    {language === "pt" ? "Para dois (com desconto)" : "For two (with discount)"}
                  </div>
                  <div className="text-xs text-primary-500 line-through">
                    {formatPrice(selectedEvent.price * 2)}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 border border-primary-300 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                  {language === "pt" ? "Talvez depois" : "Maybe later"}
                </button>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    // Handle booking logic here
                  }}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  {language === "pt" ? "Reservar Agora" : "Book Now"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}