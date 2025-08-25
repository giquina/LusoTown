"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  CheckCircleIcon,
  MapPinIcon,
  BoltIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import EventBasedMatchingSystem from "./EventBasedMatchingSystem";
import EventEnhancedMatchCard from "./EventEnhancedMatchCard";
import PostEventConnections from "./PostEventConnections";
import CulturalCompatibilityIntegration from "./CulturalCompatibilityIntegration";
import { CompatibilityProfile } from "./PortugueseCulturalCompatibilityQuiz";

interface EventMatchingStats {
  totalEventMatches: number;
  upcomingEventConnections: number;
  pastEventConnections: number;
  culturalEventParticipation: number;
  eventBasedSuccessRate: number;
  averageEventCompatibility: number;
  mostPopularEventType: string;
  nextRecommendedEvent: {
    id: string;
    title: string;
    date: string;
    matchPotential: number;
  } | null;
}

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  upcomingEvents: string[];
  culturalProfile?: CompatibilityProfile;
  eventMatchingStats: EventMatchingStats;
}

interface EventMatchingIntegrationProps {
  currentUser: UserProfile;
  onProfileUpdate?: (profile: Partial<UserProfile>) => void;
  onMatchAction?: (matchId: string, action: 'like' | 'skip' | 'message') => void;
  onEventBooking?: (eventId: string, withMatchId?: string) => void;
  onConversationStart?: (matchId: string, eventId: string, message: string) => void;
  showFullIntegration?: boolean;
  prioritizeEventMatches?: boolean;
}

export default function EventMatchingIntegration({
  currentUser,
  onProfileUpdate,
  onMatchAction,
  onEventBooking,
  onConversationStart,
  showFullIntegration = true,
  prioritizeEventMatches = true,
}: EventMatchingIntegrationProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [activeSection, setActiveSection] = useState<'overview' | 'event_matching' | 'match_cards' | 'cultural_compatibility' | 'post_event'>('overview');
  const [eventMatchingEnabled, setEventMatchingEnabled] = useState(prioritizeEventMatches);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [stats, setStats] = useState<EventMatchingStats>(currentUser.eventMatchingStats);

  // Mock enhanced match profiles with event data
  const mockEventEnhancedMatches = [
    {
      id: "match-sofia-events",
      name: "Sofia Martins",
      age: 29,
      location: "Stockwell",
      profession: "Marketing Manager",
      origin: "Porto, Portugal",
      interests: ["Fado", "Lusophone Culture", "Professional Networking", "Arts"],
      bio: "Lusophone marketing professional who loves connecting with fellow lusófonos. Regular attendee of fado nights and cultural events!",
      compatibility: 94,
      culturalAlignment: 96,
      membershipType: "Community" as const,
      verificationStatus: "Verified" as const,
      lastActive: "2 hours ago",
      upcomingEvents: [
        {
          id: "fado-night-soho",
          title: language === "pt" ? "Noite de Fado Autêntico" : "Authentic Fado Night",
          category: "Cultural",
          culturalCategory: "Fado Music",
          date: "2025-08-25",
          time: "19:30",
          location: "Lusophone Cultural Centre",
          neighborhood: "Soho",
          price: 25,
          attendeeCount: 23,
          maxAttendees: 40,
          culturalAuthenticity: 100,
          languageLevel: "Lusophone" as const,
          isUserAttending: true,
          isMatchAttending: true,
          matchAttendanceConfidence: 95
        }
      ],
      eventConnections: [
        {
          eventId: "fado-night-soho",
          connectionType: "both_attending" as const,
          matchLikelihood: 95,
          safetyScore: 100,
          suggestedMeetupTime: "19:15",
          culturalRelevance: 100
        }
      ],
      pastEventInteractions: 12,
      eventResponseRate: 89,
      preferredEventTypes: ["Fado Music", "Cultural Events", "Professional Networking"],
      culturalEventParticipation: 92
    },
    {
      id: "match-miguel-events",
      name: "Miguel Santos",
      age: 32,
      location: "Vauxhall",
      profession: "Software Engineer",
      origin: "Lisboa, Portugal",
      interests: ["Football", "Technology", "Lusophone Wine", "Professional Networking"],
      bio: "Tech professional from Lisbon. Love mixing Portuguese traditions with modern London life. Always up for a good conversation about tech or football!",
      compatibility: 87,
      culturalAlignment: 82,
      membershipType: "Ambassador" as const,
      verificationStatus: "Verified" as const,
      lastActive: "1 day ago",
      upcomingEvents: [
        {
          id: "portugal-vs-spain-final",
          title: language === "pt" ? "Portugal vs Espanha - Final" : "Portugal vs Spain - Final",
          category: "Sports",
          culturalCategory: "Football",
          date: "2025-09-01",
          time: "20:00",
          location: "Sports Bar Português",
          neighborhood: "Stockwell",
          price: 15,
          attendeeCount: 45,
          maxAttendees: 80,
          culturalAuthenticity: 90,
          languageLevel: "Lusophone" as const,
          isUserAttending: false,
          isMatchAttending: true,
          matchAttendanceConfidence: 88
        }
      ],
      eventConnections: [
        {
          eventId: "portugal-vs-spain-final",
          connectionType: "recommend_together" as const,
          matchLikelihood: 87,
          safetyScore: 95,
          suggestedMeetupTime: "19:45",
          culturalRelevance: 90
        }
      ],
      pastEventInteractions: 8,
      eventResponseRate: 76,
      preferredEventTypes: ["Football", "Professional Networking", "Lusophone Wine"],
      culturalEventParticipation: 78
    }
  ];

  const handleCulturalProfileUpdate = (profile: CompatibilityProfile) => {
    onProfileUpdate?.({
      culturalProfile: profile
    });
  };

  const handleEventBooking = (eventId: string, withMatchId?: string) => {
    onEventBooking?.(eventId, withMatchId);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      upcomingEventConnections: prev.upcomingEventConnections + (withMatchId ? 1 : 0)
    }));
  };

  const handleMatchAction = (matchId: string, action: 'like' | 'skip' | 'message') => {
    onMatchAction?.(matchId, action);
    
    // Update stats for event-based matches
    if (action === 'like' && mockEventEnhancedMatches.find(m => m.id === matchId)) {
      setStats(prev => ({
        ...prev,
        totalEventMatches: prev.totalEventMatches + 1
      }));
    }
  };

  const getQuickActionStats = () => [
    {
      label: language === "pt" ? "Matches de Eventos" : "Event Matches",
      value: stats.totalEventMatches,
      change: "+12%",
      positive: true,
      icon: CalendarDaysIcon,
      color: "text-primary-600 bg-primary-100"
    },
    {
      label: language === "pt" ? "Eventos Futuros" : "Upcoming Events",
      value: stats.upcomingEventConnections,
      change: "+3",
      positive: true,
      icon: ClockIcon,
      color: "text-secondary-600 bg-secondary-100"
    },
    {
      label: language === "pt" ? "Taxa de Sucesso" : "Success Rate",
      value: `${stats.eventBasedSuccessRate}%`,
      change: "+5%",
      positive: true,
      icon: StarIcon,
      color: "text-green-600 bg-green-100"
    },
    {
      label: language === "pt" ? "Compatibilidade Média" : "Avg Compatibility",
      value: `${stats.averageEventCompatibility}%`,
      change: "+2%",
      positive: true,
      icon: HeartIcon,
      color: "text-coral-600 bg-coral-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Dashboard */}
      {showFullIntegration && activeSection === 'overview' && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Conexões Através de Eventos Portugueses" 
                  : "Lusophone Event-Based Connections"}
              </h2>
              <p className="text-primary-600">
                {language === "pt"
                  ? "Encontre pessoas compatíveis em eventos culturais autênticos"
                  : "Find compatible people at authentic cultural events"}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEventMatchingEnabled(!eventMatchingEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  eventMatchingEnabled
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${eventMatchingEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                {language === "pt" ? "Ativo" : "Active"}
              </button>
              
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
              >
                {getQuickActionStats().map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${stat.color}`}>
                        <stat.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-bold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Recommended Event */}
          {stats.nextRecommendedEvent && (
            <div className="bg-gradient-to-r from-coral-50 to-accent-50 border border-coral-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-coral-500 rounded-lg">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-coral-900 mb-1">
                    {language === "pt" ? "Evento Recomendado" : "Recommended Event"}
                  </h4>
                  <p className="text-coral-800 text-sm">
                    {stats.nextRecommendedEvent.title} • {stats.nextRecommendedEvent.date}
                  </p>
                  <p className="text-coral-700 text-xs">
                    {stats.nextRecommendedEvent.matchPotential}% {language === "pt" ? "potencial de match" : "match potential"}
                  </p>
                </div>
                <button
                  onClick={() => handleEventBooking(stats.nextRecommendedEvent!.id)}
                  className="bg-coral-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-coral-700 transition-colors"
                >
                  {language === "pt" ? "Ver Evento" : "View Event"}
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                key: 'event_matching',
                icon: CalendarDaysIcon,
                label: language === "pt" ? "Sistema de Eventos" : "Event System",
                description: language === "pt" ? "Encontre matches em eventos" : "Find matches at events",
                color: "from-primary-500 to-secondary-500"
              },
              {
                key: 'match_cards',
                icon: HeartIcon,
                label: language === "pt" ? "Matches Melhorados" : "Enhanced Matches",
                description: language === "pt" ? "Perfis com dados de eventos" : "Profiles with event data",
                color: "from-coral-500 to-accent-500"
              },
              {
                key: 'cultural_compatibility',
                icon: StarIcon,
                label: language === "pt" ? "Compatibilidade Cultural" : "Cultural Compatibility",
                description: language === "pt" ? "Quiz de tradições portuguesas" : "Portuguese traditions quiz",
                color: "from-secondary-500 to-accent-500"
              },
              {
                key: 'post_event',
                icon: UserGroupIcon,
                label: language === "pt" ? "Pós-Eventos" : "Post-Events",
                description: language === "pt" ? "Continue conexões feitas" : "Continue connections made",
                color: "from-accent-500 to-coral-500"
              }
            ].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key as any)}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all text-left group"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">
                  {section.label}
                </h4>
                <p className="text-gray-600 text-xs">
                  {section.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Event-Based Matching System */}
      {(activeSection === 'event_matching' || !showFullIntegration) && (
        <div>
          {showFullIntegration && (
            <button
              onClick={() => setActiveSection('overview')}
              className="mb-4 text-primary-600 hover:text-primary-800 flex items-center gap-1 text-sm"
            >
              ← {language === "pt" ? "Voltar ao painel" : "Back to dashboard"}
            </button>
          )}
          
          <EventBasedMatchingSystem
            currentUserId={currentUser.id}
            userInterests={currentUser.interests}
            userLocation={currentUser.location}
            onEventBooking={handleEventBooking}
            onMatchInteraction={handleMatchAction}
            onConversationStart={onConversationStart}
            showEventSuggestions={true}
            showAttendeeMatches={true}
          />
        </div>
      )}

      {/* Enhanced Match Cards */}
      {activeSection === 'match_cards' && (
        <div>
          {showFullIntegration && (
            <button
              onClick={() => setActiveSection('overview')}
              className="mb-4 text-primary-600 hover:text-primary-800 flex items-center gap-1 text-sm"
            >
              ← {language === "pt" ? "Voltar ao painel" : "Back to dashboard"}
            </button>
          )}
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-primary-100">
              <h3 className="text-lg font-bold text-primary-900 mb-4">
                {language === "pt" ? "Matches com Integração de Eventos" : "Event-Integrated Matches"}
              </h3>
              <p className="text-primary-600 text-sm mb-6">
                {language === "pt"
                  ? "Descubra pessoas compatíveis que frequentam os mesmos eventos portugueses que você."
                  : "Discover compatible people who attend the same Lusophone events as you."}
              </p>
            </div>

            {mockEventEnhancedMatches.map((match) => (
              <EventEnhancedMatchCard
                key={match.id}
                matchProfile={match}
                userInterests={currentUser.interests}
                userLocation={currentUser.location}
                userUpcomingEvents={currentUser.upcomingEvents}
                onLike={(matchId) => handleMatchAction(matchId, 'like')}
                onSkip={(matchId) => handleMatchAction(matchId, 'skip')}
                onMessage={(matchId) => handleMatchAction(matchId, 'message')}
                onEventBookTogether={handleEventBooking}
                onViewEventDetails={(eventId) => console.log('View event:', eventId)}
                onSafetyReport={(matchId, reason) => console.log('Safety report:', matchId, reason)}
                showEventSuggestions={true}
                showConversationStarters={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cultural Compatibility */}
      {activeSection === 'cultural_compatibility' && (
        <div>
          {showFullIntegration && (
            <button
              onClick={() => setActiveSection('overview')}
              className="mb-4 text-primary-600 hover:text-primary-800 flex items-center gap-1 text-sm"
            >
              ← {language === "pt" ? "Voltar ao painel" : "Back to dashboard"}
            </button>
          )}
          
          <CulturalCompatibilityIntegration
            currentUserProfile={currentUser.culturalProfile}
            onProfileUpdate={handleCulturalProfileUpdate}
            showQuizPrompt={!currentUser.culturalProfile}
          />
        </div>
      )}

      {/* Post-Event Connections */}
      {activeSection === 'post_event' && (
        <div>
          {showFullIntegration && (
            <button
              onClick={() => setActiveSection('overview')}
              className="mb-4 text-primary-600 hover:text-primary-800 flex items-center gap-1 text-sm"
            >
              ← {language === "pt" ? "Voltar ao painel" : "Back to dashboard"}
            </button>
          )}
          
          <PostEventConnections
            userId={currentUser.id}
            userLocation={currentUser.location}
            onContactAttendee={(attendeeId, message) => {
              console.log('Contact attendee:', attendeeId, message);
            }}
            onPlanFollowUp={(suggestionId, attendeeIds) => {
              console.log('Plan follow-up:', suggestionId, attendeeIds);
            }}
            onRateEvent={(eventId, rating, review) => {
              console.log('Rate event:', eventId, rating, review);
            }}
            onReportIssue={(eventId, attendeeId, issue) => {
              console.log('Report issue:', eventId, attendeeId, issue);
            }}
            onShareEventMemory={(eventId, photo, caption) => {
              console.log('Share memory:', eventId, photo, caption);
            }}
          />
        </div>
      )}

      {/* Premium Features Promotion */}
      {!hasActiveSubscription && (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <BoltIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-orange-900 mb-2">
                {language === "pt" 
                  ? "Desbloqueie Todo o Potencial dos Eventos" 
                  : "Unlock Full Event Potential"}
              </h4>
              <p className="text-orange-800 text-sm mb-3">
                {language === "pt"
                  ? "Membros Premium têm acesso completo ao sistema de matches baseado em eventos, conversas ilimitadas e sugestões personalizadas."
                  : "Premium members get full access to event-based matching system, unlimited conversations and personalized suggestions."}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700">
                    {language === "pt" ? "Matches ilimitados" : "Unlimited matches"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700">
                    {language === "pt" ? "Conversas em eventos" : "Event conversations"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700">
                    {language === "pt" ? "Eventos exclusivos" : "Exclusive events"}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
              {language === "pt" ? "Fazer Upgrade" : "Upgrade Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}