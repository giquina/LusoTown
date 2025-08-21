"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  TicketIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  BoltIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  MusicalNoteIcon,
  CakeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { formatPrice } from "@/config/pricing";
import EventConversationStarters from "./EventConversationStarters";

interface UpcomingEvent {
  id: string;
  title: string;
  category: string;
  culturalCategory: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  price: number;
  attendeeCount: number;
  maxAttendees: number;
  culturalAuthenticity: number;
  languageLevel: 'Portuguese' | 'English' | 'Bilingual';
  isUserAttending: boolean;
  isMatchAttending: boolean;
  matchAttendanceConfidence: number;
}

interface EventConnectionSuggestion {
  eventId: string;
  connectionType: 'both_attending' | 'recommend_together' | 'similar_interest' | 'cultural_match';
  matchLikelihood: number;
  safetyScore: number;
  suggestedMeetupTime: string;
  culturalRelevance: number;
}

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  origin: string;
  interests: string[];
  bio: string;
  compatibility: number;
  culturalAlignment: number;
  membershipType: 'Free' | 'Community' | 'Ambassador';
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
  lastActive: string;
  profileImage?: string;
  // Event-based data
  upcomingEvents: UpcomingEvent[];
  eventConnections: EventConnectionSuggestion[];
  pastEventInteractions: number;
  eventResponseRate: number;
  preferredEventTypes: string[];
  culturalEventParticipation: number;
}

interface EventEnhancedMatchCardProps {
  matchProfile: MatchProfile;
  userInterests: string[];
  userLocation: string;
  userUpcomingEvents: string[];
  onLike?: (matchId: string) => void;
  onSkip?: (matchId: string) => void;
  onMessage?: (matchId: string) => void;
  onEventBookTogether?: (eventId: string, matchId: string) => void;
  onViewEventDetails?: (eventId: string) => void;
  onSafetyReport?: (matchId: string, reason: string) => void;
  showEventSuggestions?: boolean;
  showConversationStarters?: boolean;
}

export default function EventEnhancedMatchCard({
  matchProfile,
  userInterests,
  userLocation,
  userUpcomingEvents,
  onLike,
  onSkip,
  onMessage,
  onEventBookTogether,
  onViewEventDetails,
  onSafetyReport,
  showEventSuggestions = true,
  showConversationStarters = true,
}: EventEnhancedMatchCardProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [selectedTab, setSelectedTab] = useState<'profile' | 'events' | 'cultural_compatibility'>('profile');
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [selectedEventForConversation, setSelectedEventForConversation] = useState<UpcomingEvent | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal")) return "🇵🇹";
    if (origin.includes("Brasil")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    return "🌍";
  };

  const getEventCategoryIcon = (category: string) => {
    switch (category) {
      case "Fado Music":
        return "🎵";
      case "Santos Populares":
        return "🎉";
      case "Portuguese Cuisine":
        return "🥮";
      case "Football":
        return "⚽";
      case "Portuguese Wine":
        return "🍷";
      case "Professional Networking":
        return "🤝";
      default:
        return "🇵🇹";
    }
  };

  const getMembershipBadge = (type: string) => {
    switch (type) {
      case "Ambassador":
        return { icon: "👑", color: "text-yellow-600", bg: "bg-yellow-100", label: "Cultural Ambassador" };
      case "Community":
        return { icon: "⭐", color: "text-primary-600", bg: "bg-blue-100", label: "Community Member" };
      case "Free":
        return { icon: "🌟", color: "text-secondary-600", bg: "bg-secondary-100", label: "Free Member" };
      default:
        return { icon: "👤", color: "text-secondary-600", bg: "bg-secondary-100", label: "Member" };
    }
  };

  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case "both_attending":
        return language === "pt" ? "Ambos confirmados" : "Both attending";
      case "recommend_together":
        return language === "pt" ? "Recomendado juntos" : "Recommended together";
      case "similar_interest":
        return language === "pt" ? "Interesse similar" : "Similar interest";
      case "cultural_match":
        return language === "pt" ? "Compatibilidade cultural" : "Cultural match";
      default:
        return language === "pt" ? "Conexão sugerida" : "Suggested connection";
    }
  };

  const handleAction = async (action: string, eventId?: string) => {
    setActionLoading(action);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));
    
    switch (action) {
      case 'like':
        onLike?.(matchProfile.id);
        break;
      case 'skip':
        onSkip?.(matchProfile.id);
        break;
      case 'message':
        onMessage?.(matchProfile.id);
        break;
      case 'book_together':
        if (eventId) {
          onEventBookTogether?.(eventId, matchProfile.id);
        }
        break;
    }
    
    setActionLoading(null);
  };

  const handleStartConversation = (eventId: string) => {
    const event = matchProfile.upcomingEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEventForConversation(event);
      setShowConversationModal(true);
    }
  };

  // Find shared events
  const sharedEvents = matchProfile.upcomingEvents.filter(event => 
    userUpcomingEvents.includes(event.id) || event.isUserAttending
  );

  // Find recommended events for both
  const recommendedEvents = matchProfile.upcomingEvents.filter(event => {
    const connection = matchProfile.eventConnections.find(conn => conn.eventId === event.id);
    return connection && connection.connectionType === 'recommend_together';
  });

  // Calculate cultural event alignment
  const culturalEventAlignment = Math.round(
    (matchProfile.culturalEventParticipation + 
     matchProfile.upcomingEvents.filter(e => e.culturalAuthenticity >= 80).length * 10) / 2
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-primary-100 overflow-hidden">
      {/* Profile Header */}
      <div className="relative h-48 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 text-4xl">{getOriginFlag(matchProfile.origin)}</div>
          <div className="absolute bottom-4 left-4 text-2xl">
            {getEventCategoryIcon(matchProfile.preferredEventTypes[0] || "Cultural")}
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-primary-400 drop-shadow-lg">👤</div>
        </div>

        {/* Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl">
          <div className="flex items-center gap-1">
            <StarSolid className="w-4 h-4 text-yellow-300" />
            {matchProfile.compatibility}% Match
          </div>
        </div>

        {/* Verification & Membership */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {matchProfile.verificationStatus === 'Verified' && (
            <div className="bg-action-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircleIcon className="w-3 h-3" />
              {language === "pt" ? "Verificado" : "Verified"}
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getMembershipBadge(matchProfile.membershipType).bg} ${getMembershipBadge(matchProfile.membershipType).color}`}>
            {getMembershipBadge(matchProfile.membershipType).icon} {getMembershipBadge(matchProfile.membershipType).label}
          </div>
        </div>

        {/* Event Connection Indicator */}
        {(sharedEvents.length > 0 || recommendedEvents.length > 0) && (
          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-coral-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CalendarDaysIcon className="w-3 h-3" />
            {sharedEvents.length > 0 ? 
              (language === "pt" ? `${sharedEvents.length} eventos juntos` : `${sharedEvents.length} shared events`) :
              (language === "pt" ? "Eventos recomendados" : "Recommended events")
            }
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Profile Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-primary-900 mb-1">
                {matchProfile.name}, {matchProfile.age}
              </h3>
              <p className="text-sm text-primary-600">{matchProfile.profession}</p>
              <p className="text-sm text-gray-500">{matchProfile.location} • {matchProfile.lastActive}</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-secondary-600 mb-1">
                {culturalEventAlignment}%
              </div>
              <div className="text-xs text-gray-500">
                {language === "pt" ? "Eventos culturais" : "Cultural events"}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-secondary-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setSelectedTab('profile')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedTab === 'profile'
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-secondary-600 hover:text-secondary-800"
              }`}
            >
              {language === "pt" ? "Perfil" : "Profile"}
            </button>
            <button
              onClick={() => setSelectedTab('events')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedTab === 'events'
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-secondary-600 hover:text-secondary-800"
              }`}
            >
              {language === "pt" ? "Eventos" : "Events"}
              {(sharedEvents.length > 0 || recommendedEvents.length > 0) && (
                <span className="ml-1 bg-coral-500 text-white text-xs rounded-full px-2 py-0.5">
                  {sharedEvents.length + recommendedEvents.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedTab('cultural_compatibility')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedTab === 'cultural_compatibility'
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-secondary-600 hover:text-secondary-800"
              }`}
            >
              {language === "pt" ? "Cultural" : "Cultural"}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {selectedTab === 'profile' && (
              <div className="space-y-4">
                {/* Bio */}
                <div className="bg-primary-25 p-3 rounded-xl border border-primary-100">
                  <p className="text-primary-800 text-sm leading-relaxed">
                    {matchProfile.bio}
                  </p>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="text-sm font-bold text-primary-900 mb-2 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4 text-secondary-500" />
                    {language === "pt" ? "Interesses" : "Interests"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchProfile.interests.slice(0, 6).map((interest, index) => {
                      const isShared = userInterests.some(userInterest =>
                        userInterest.toLowerCase().includes(interest.toLowerCase()) ||
                        interest.toLowerCase().includes(userInterest.toLowerCase())
                      );
                      
                      return (
                        <div
                          key={index}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            isShared
                              ? 'bg-gradient-to-r from-coral-100 to-accent-100 text-coral-700 border border-coral-200'
                              : 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border border-primary-200'
                          }`}
                        >
                          {isShared && "✨ "}{interest}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary-600">{matchProfile.eventResponseRate}%</div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" ? "Taxa resposta" : "Response rate"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-secondary-600">{matchProfile.pastEventInteractions}</div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" ? "Eventos passados" : "Past events"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-accent-600">{matchProfile.culturalAlignment}%</div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" ? "Alinhamento" : "Alignment"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'events' && (
              <div className="space-y-4">
                {/* Shared Events */}
                {sharedEvents.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-coral-800 mb-3 flex items-center gap-2">
                      <HeartSolid className="w-4 h-4 text-coral-500" />
                      {language === "pt" ? "Eventos em Comum" : "Shared Events"}
                    </h4>
                    <div className="space-y-3">
                      {sharedEvents.map((event) => (
                        <div key={event.id} className="bg-gradient-to-r from-coral-50 to-accent-50 border border-coral-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="text-sm">{getEventCategoryIcon(event.culturalCategory)}</div>
                                <h5 className="font-semibold text-coral-800 text-sm">{event.title}</h5>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-coral-600">
                                <span>{event.date} • {event.time}</span>
                                <span>{event.neighborhood}</span>
                                <span>{formatPrice(event.price)}</span>
                              </div>
                            </div>
                            {event.culturalAuthenticity >= 90 && (
                              <div className="bg-action-500 text-white px-2 py-1 rounded text-xs font-bold">
                                ✨ Autêntico
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStartConversation(event.id)}
                              className="flex-1 bg-gradient-to-r from-coral-600 to-accent-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-coral-700 hover:to-accent-700 transition-all flex items-center justify-center gap-1"
                            >
                              <ChatBubbleLeftRightIcon className="w-3 h-3" />
                              {language === "pt" ? "Conversar" : "Chat"}
                            </button>
                            <button
                              onClick={() => handleAction('book_together', event.id)}
                              disabled={actionLoading === 'book_together'}
                              className="flex-1 bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-secondary-700 hover:to-primary-700 transition-all flex items-center justify-center gap-1 disabled:opacity-50"
                            >
                              <UsersIcon className="w-3 h-3" />
                              {actionLoading === 'book_together' ? "..." : (language === "pt" ? "Ir Juntos" : "Go Together")}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Events */}
                {recommendedEvents.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-secondary-800 mb-3 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-secondary-500" />
                      {language === "pt" ? "Eventos Recomendados" : "Recommended Events"}
                    </h4>
                    <div className="space-y-3">
                      {recommendedEvents.slice(0, 3).map((event) => {
                        const connection = matchProfile.eventConnections.find(conn => conn.eventId === event.id);
                        
                        return (
                          <div key={event.id} className="bg-gradient-to-r from-secondary-50 to-primary-50 border border-secondary-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="text-sm">{getEventCategoryIcon(event.culturalCategory)}</div>
                                  <h5 className="font-semibold text-secondary-800 text-sm">{event.title}</h5>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-secondary-600">
                                  <span>{event.date} • {event.time}</span>
                                  <span>{event.neighborhood}</span>
                                  <span>{formatPrice(event.price)}</span>
                                </div>
                                {connection && (
                                  <div className="mt-1">
                                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                                      {getConnectionTypeLabel(connection.connectionType)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-secondary-600">
                                  {connection?.matchLikelihood || 85}%
                                </div>
                                <div className="text-xs text-gray-500">match</div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStartConversation(event.id)}
                                className="flex-1 bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-secondary-700 hover:to-primary-700 transition-all flex items-center justify-center gap-1"
                              >
                                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                                {language === "pt" ? "Sugerir Evento" : "Suggest Event"}
                              </button>
                              <button
                                onClick={() => onViewEventDetails?.(event.id)}
                                className="px-3 py-2 border border-secondary-300 text-secondary-600 rounded-lg hover:bg-secondary-50 transition-colors text-xs"
                              >
                                {language === "pt" ? "Ver" : "View"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* No Events Message */}
                {sharedEvents.length === 0 && recommendedEvents.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarDaysIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-secondary-600 text-sm">
                      {language === "pt" 
                        ? "Nenhum evento em comum no momento. Sugiram eventos um ao outro!"
                        : "No shared events at the moment. Suggest events to each other!"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'cultural_compatibility' && (
              <div className="space-y-4">
                {/* Cultural Alignment Score */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary-600 mb-1">
                      {matchProfile.culturalAlignment}%
                    </div>
                    <p className="text-primary-700 text-sm">
                      {language === "pt" ? "Compatibilidade Cultural" : "Cultural Compatibility"}
                    </p>
                  </div>
                  
                  {/* Cultural Categories */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'food', icon: CakeIcon, label: language === "pt" ? 'Culinária' : 'Food', score: 92 },
                      { key: 'music', icon: MusicalNoteIcon, label: language === "pt" ? 'Música' : 'Music', score: 88 },
                      { key: 'traditions', icon: SparklesIcon, label: language === "pt" ? 'Tradições' : 'Traditions', score: 95 },
                      { key: 'language', icon: AcademicCapIcon, label: language === "pt" ? 'Idioma' : 'Language', score: 89 }
                    ].map((category) => (
                      <div key={category.key} className="text-center p-3 bg-white/60 rounded-lg">
                        <category.icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                        <div className="text-xs font-medium text-primary-700 mb-1">
                          {category.label}
                        </div>
                        <div className="text-sm font-bold text-primary-600">
                          {category.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Event Participation */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h5 className="font-semibold text-gray-900 mb-3">
                    {language === "pt" ? "Participação em Eventos Culturais" : "Cultural Event Participation"}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">
                        {language === "pt" ? "Eventos autênticos frequentados" : "Authentic events attended"}
                      </span>
                      <span className="font-semibold text-primary-600">
                        {matchProfile.pastEventInteractions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">
                        {language === "pt" ? "Taxa de participação" : "Participation rate"}
                      </span>
                      <span className="font-semibold text-secondary-600">
                        {matchProfile.culturalEventParticipation}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-600">
                        {language === "pt" ? "Tipos de eventos preferidos" : "Preferred event types"}
                      </span>
                      <span className="font-semibold text-accent-600">
                        {matchProfile.preferredEventTypes.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Why You'll Connect */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-3">
                    {language === "pt" ? "Por que vocês se vão conectar:" : "Why you'll connect:"}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-action-600" />
                      <span className="text-sm text-green-700">
                        {language === "pt" 
                          ? "Ambos valorizam tradições portuguesas autênticas"
                          : "Both value authentic Portuguese traditions"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-action-600" />
                      <span className="text-sm text-green-700">
                        {language === "pt"
                          ? "Participação ativa em eventos culturais"
                          : "Active participation in cultural events"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-action-600" />
                      <span className="text-sm text-green-700">
                        {language === "pt"
                          ? `${userInterests.filter(i => matchProfile.interests.includes(i)).length} interesses em comum`
                          : `${userInterests.filter(i => matchProfile.interests.includes(i)).length} shared interests`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleAction('skip')}
            disabled={!!actionLoading}
            className="flex-1 bg-secondary-100 text-secondary-700 py-3 rounded-xl font-semibold hover:bg-secondary-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            ✕ {language === "pt" ? "Passar" : "Skip"}
          </button>

          <button
            onClick={() => handleAction('like')}
            disabled={!!actionLoading}
            className="flex-1 bg-gradient-to-r from-coral-600 to-accent-600 text-white py-3 rounded-xl font-semibold hover:from-coral-700 hover:to-accent-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <HeartSolid className="w-5 h-5" />
            {actionLoading === 'like' ? "..." : (language === "pt" ? "Gosto" : "Like")}
          </button>

          <button
            onClick={() => handleAction('message')}
            disabled={!!actionLoading || !hasActiveSubscription}
            className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            {actionLoading === 'message' ? "..." : (language === "pt" ? "Mensagem" : "Message")}
          </button>
        </div>

        {/* Premium Upgrade Notice */}
        {!hasActiveSubscription && (
          <div className="mt-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <BoltIcon className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-orange-800 font-medium">
                {language === "pt"
                  ? "Desbloqueie mensagens e eventos exclusivos com Premium"
                  : "Unlock messaging and exclusive events with Premium"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Starters Modal */}
      {showConversationModal && selectedEventForConversation && (
        <EventConversationStarters
          matchProfile={{
            id: matchProfile.id,
            name: matchProfile.name,
            age: matchProfile.age,
            origin: matchProfile.origin,
            profession: matchProfile.profession,
            interests: matchProfile.interests,
            culturalBackground: matchProfile.origin,
            membershipType: matchProfile.membershipType,
            verificationStatus: matchProfile.verificationStatus,
            lastActive: matchProfile.lastActive,
            eventAttendanceStatus: 'confirmed'
          }}
          eventContext={{
            eventId: selectedEventForConversation.id,
            eventTitle: selectedEventForConversation.title,
            eventCategory: selectedEventForConversation.category,
            eventDate: selectedEventForConversation.date,
            eventTime: selectedEventForConversation.time,
            eventLocation: selectedEventForConversation.location,
            culturalCategory: selectedEventForConversation.culturalCategory,
            languageLevel: selectedEventForConversation.languageLevel
          }}
          userInterests={userInterests}
          userCulturalBackground={userLocation}
          onConversationStart={(starterId, text) => {
            setShowConversationModal(false);
          }}
          onSafetyReport={onSafetyReport}
          isVisible={showConversationModal}
          onClose={() => setShowConversationModal(false)}
        />
      )}
    </div>
  );
}