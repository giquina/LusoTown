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
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  CheckCircleIcon,
  PhotoIcon,
  ShareIcon,
  HandThumbUpIcon,
  FaceSmileIcon,
  CameraIcon,
  GiftIcon,
  BoltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { formatPrice } from "@/config/pricing";

interface EventAttendee {
  id: string;
  name: string;
  age: number;
  profession: string;
  origin: string;
  profileImage?: string;
  connectionType: 'met_at_event' | 'talked_during' | 'exchanged_contacts' | 'planned_next_meetup';
  connectionStrength: number;
  interactionQuality: 'excellent' | 'good' | 'neutral' | 'poor';
  sharedMoments: string[];
  followUpStatus: 'pending' | 'contacted' | 'responded' | 'ignored' | 'blocked';
  mutualInterest: boolean;
  culturalConnection: number;
  membershipType: 'Free' | 'Community' | 'Ambassador';
}

interface PastEvent {
  id: string;
  title: string;
  culturalCategory: string;
  date: string;
  location: string;
  neighborhood: string;
  attendedAt: string;
  duration: string;
  rating: number;
  photos: string[];
  highlights: string[];
  attendees: EventAttendee[];
  hostRating: number;
  culturalAuthenticity: number;
  wouldRecommend: boolean;
  followUpOpportunities: string[];
  nextSimilarEvent?: {
    id: string;
    title: string;
    date: string;
  };
}

interface FollowUpSuggestion {
  id: string;
  type: 'coffee_meetup' | 'cultural_event' | 'group_activity' | 'professional_networking' | 'language_exchange';
  title: string;
  description: string;
  suggestedDate: string;
  location: string;
  safetyLevel: 'public' | 'group' | 'verified_venue';
  estimatedCost: number;
  culturalRelevance: number;
  attendeeIds: string[];
  reasonForSuggestion: string;
}

interface PostEventConnectionsProps {
  userId: string;
  userLocation: string;
  onContactAttendee?: (attendeeId: string, message: string) => void;
  onPlanFollowUp?: (suggestionId: string, attendeeIds: string[]) => void;
  onRateEvent?: (eventId: string, rating: number, review: string) => void;
  onReportIssue?: (eventId: string, attendeeId: string, issue: string) => void;
  onShareEventMemory?: (eventId: string, photo: string, caption: string) => void;
}

export default function PostEventConnections({
  userId,
  userLocation,
  onContactAttendee,
  onPlanFollowUp,
  onRateEvent,
  onReportIssue,
  onShareEventMemory,
}: PostEventConnectionsProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [selectedTab, setSelectedTab] = useState<'recent_events' | 'connections' | 'follow_ups' | 'memories'>('recent_events');
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<FollowUpSuggestion[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [contactingAttendee, setContactingAttendee] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockPastEvents: PastEvent[] = [
    {
      id: "fado-night-completed",
      title: language === "pt" ? "Noite de Fado Autêntico" : "Authentic Fado Night",
      culturalCategory: "Fado Music",
      date: "2025-08-20",
      location: "Portuguese Cultural Centre",
      neighborhood: "Soho",
      attendedAt: "2 days ago",
      duration: "3 hours",
      rating: 5,
      photos: ["/events/fado-night-1.jpg", "/events/fado-night-2.jpg"],
      highlights: [
        language === "pt" ? "Fadista incrível" : "Amazing fadista",
        language === "pt" ? "Ambiente autêntico" : "Authentic atmosphere",
        language === "pt" ? "Conheci pessoas fantásticas" : "Met fantastic people"
      ],
      hostRating: 5,
      culturalAuthenticity: 100,
      wouldRecommend: true,
      followUpOpportunities: [
        language === "pt" ? "Café com grupo de fado" : "Coffee with fado group",
        language === "pt" ? "Próximo evento de fado" : "Next fado event",
        language === "pt" ? "Aulas de guitarra portuguesa" : "Portuguese guitar lessons"
      ],
      nextSimilarEvent: {
        id: "next-fado",
        title: language === "pt" ? "Noite de Fado - Setembro" : "Fado Night - September",
        date: "2025-09-15"
      },
      attendees: [
        {
          id: "attendee-sofia",
          name: "Sofia Martins",
          age: 29,
          profession: "Teacher",
          origin: "Porto, Portugal",
          connectionType: "exchanged_contacts",
          connectionStrength: 92,
          interactionQuality: "excellent",
          sharedMoments: [
            language === "pt" ? "Cantaram fado juntos" : "Sang fado together",
            language === "pt" ? "Conversaram sobre Porto" : "Talked about Porto"
          ],
          followUpStatus: "pending",
          mutualInterest: true,
          culturalConnection: 95,
          membershipType: "Community"
        },
        {
          id: "attendee-miguel",
          name: "Miguel Santos",
          age: 32,
          profession: "Software Engineer",
          origin: "Lisboa, Portugal",
          connectionType: "talked_during",
          connectionStrength: 78,
          interactionQuality: "good",
          sharedMoments: [
            language === "pt" ? "Discutiram tecnologia em Portugal" : "Discussed technology in Portugal"
          ],
          followUpStatus: "contacted",
          mutualInterest: false,
          culturalConnection: 82,
          membershipType: "Ambassador"
        }
      ]
    },
    {
      id: "santos-populares-completed",
      title: language === "pt" ? "Santos Populares - São João" : "Santos Populares - São João",
      culturalCategory: "Santos Populares",
      date: "2025-06-23",
      location: "Vauxhall Community Gardens",
      neighborhood: "Vauxhall",
      attendedAt: "2 months ago",
      duration: "5 hours",
      rating: 4,
      photos: ["/events/santos-1.jpg", "/events/santos-2.jpg", "/events/santos-3.jpg"],
      highlights: [
        language === "pt" ? "Sardinhas deliciosas" : "Delicious sardines",
        language === "pt" ? "Dança tradicional" : "Traditional dancing",
        language === "pt" ? "Ambiente familiar" : "Family atmosphere"
      ],
      hostRating: 4,
      culturalAuthenticity: 95,
      wouldRecommend: true,
      followUpOpportunities: [
        language === "pt" ? "Jantar português em grupo" : "Portuguese group dinner",
        language === "pt" ? "Aulas de dança tradicional" : "Traditional dance classes"
      ],
      attendees: [
        {
          id: "attendee-carolina",
          name: "Carolina Lima",
          age: 28,
          profession: "Financial Analyst",
          origin: "São Paulo, Brasil",
          connectionType: "planned_next_meetup",
          connectionStrength: 88,
          interactionQuality: "excellent",
          sharedMoments: [
            language === "pt" ? "Dançaram juntos" : "Danced together",
            language === "pt" ? "Partilharam histórias do Brasil" : "Shared stories from Brazil"
          ],
          followUpStatus: "responded",
          mutualInterest: true,
          culturalConnection: 89,
          membershipType: "Community"
        }
      ]
    }
  ];

  const mockFollowUpSuggestions: FollowUpSuggestion[] = [
    {
      id: "coffee-group-fado",
      type: "coffee_meetup",
      title: language === "pt" ? "Café com Grupo de Fado" : "Coffee with Fado Group",
      description: language === "pt" 
        ? "Encontro informal para conversar sobre fado e marcar próximos eventos"
        : "Informal meetup to chat about fado and plan future events",
      suggestedDate: "2025-08-25",
      location: "Café Lusitano, Soho",
      safetyLevel: "public",
      estimatedCost: 5,
      culturalRelevance: 95,
      attendeeIds: ["attendee-sofia", "attendee-miguel"],
      reasonForSuggestion: language === "pt" 
        ? "Baseado no interesse comum em fado e localização próxima"
        : "Based on shared interest in fado and nearby location"
    },
    {
      id: "cultural-event-next",
      type: "cultural_event",
      title: language === "pt" ? "Próximo Evento Cultural Juntos" : "Next Cultural Event Together",
      description: language === "pt"
        ? "Reservem juntos o próximo evento de fado em setembro"
        : "Book together for the next fado event in September",
      suggestedDate: "2025-09-15",
      location: "Portuguese Cultural Centre",
      safetyLevel: "verified_venue",
      estimatedCost: 25,
      culturalRelevance: 100,
      attendeeIds: ["attendee-sofia"],
      reasonForSuggestion: language === "pt"
        ? "Excelente conexão no último evento de fado"
        : "Excellent connection at last fado event"
    },
    {
      id: "group-dinner-portuguese",
      type: "group_activity",
      title: language === "pt" ? "Jantar Português em Grupo" : "Portuguese Group Dinner",
      description: language === "pt"
        ? "Jantar em restaurante português com pessoas do festival São João"
        : "Dinner at Portuguese restaurant with people from São João festival",
      suggestedDate: "2025-08-30",
      location: "Restaurante Lusitano, Borough",
      safetyLevel: "group",
      estimatedCost: 35,
      culturalRelevance: 90,
      attendeeIds: ["attendee-carolina"],
      reasonForSuggestion: language === "pt"
        ? "Planearam encontrar-se novamente durante o festival"
        : "Planned to meet again during the festival"
    }
  ];

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      
      setTimeout(() => {
        setPastEvents(mockPastEvents);
        setFollowUpSuggestions(mockFollowUpSuggestions);
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, [language]);

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal")) return "🇵🇹";
    if (origin.includes("Brasil")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
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
      default:
        return "🇵🇹";
    }
  };

  const getConnectionTypeLabel = (type: string) => {
    switch (type) {
      case "met_at_event":
        return language === "pt" ? "Conheceram-se" : "Met";
      case "talked_during":
        return language === "pt" ? "Conversaram" : "Talked";
      case "exchanged_contacts":
        return language === "pt" ? "Trocaram contactos" : "Exchanged contacts";
      case "planned_next_meetup":
        return language === "pt" ? "Planearam encontro" : "Planned meetup";
      default:
        return language === "pt" ? "Conexão" : "Connection";
    }
  };

  const getInteractionQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "neutral":
        return "text-gray-600 bg-gray-100";
      case "poor":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleContactAttendee = (attendeeId: string) => {
    if (customMessage.trim()) {
      setContactingAttendee(attendeeId);
      
      setTimeout(() => {
        onContactAttendee?.(attendeeId, customMessage);
        setContactingAttendee(null);
        setCustomMessage('');
        
        // Update attendee status
        setPastEvents(prev => prev.map(event => ({
          ...event,
          attendees: event.attendees.map(attendee => 
            attendee.id === attendeeId 
              ? { ...attendee, followUpStatus: 'contacted' as const }
              : attendee
          )
        })));
      }, 1000);
    }
  };

  const handlePlanFollowUp = (suggestionId: string) => {
    const suggestion = followUpSuggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      onPlanFollowUp?.(suggestionId, suggestion.attendeeIds);
    }
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
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-coral-500 to-accent-500 rounded-xl">
            <HeartIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-900">
              {language === "pt" 
                ? "Conexões Pós-Evento" 
                : "Post-Event Connections"}
            </h3>
            <p className="text-sm text-primary-600">
              {language === "pt"
                ? "Continue as amizades iniciadas em eventos portugueses"
                : "Continue friendships started at Portuguese events"}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-primary-50 rounded-xl p-1">
          <button
            onClick={() => setSelectedTab('recent_events')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'recent_events'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Eventos Recentes" : "Recent Events"}
          </button>
          <button
            onClick={() => setSelectedTab('connections')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'connections'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Conexões" : "Connections"}
          </button>
          <button
            onClick={() => setSelectedTab('follow_ups')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'follow_ups'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Próximos Encontros" : "Follow-ups"}
          </button>
          <button
            onClick={() => setSelectedTab('memories')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'memories'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Memórias" : "Memories"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Recent Events */}
        {selectedTab === 'recent_events' && (
          <div className="space-y-4">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-primary-100 rounded-xl p-4 hover:shadow-lg transition-all"
              >
                {/* Event Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-xl">
                    {getEventCategoryIcon(event.culturalCategory)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-primary-900 mb-1">{event.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-primary-600 mb-2">
                      <span>{event.date}</span>
                      <span>{event.neighborhood}</span>
                      <span>{event.attendedAt}</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarSolid
                            key={i}
                            className={`w-4 h-4 ${
                              i < event.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {event.rating}/5 • {event.culturalAuthenticity}% {language === "pt" ? "autêntico" : "authentic"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-coral-600">
                      {event.attendees.length}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === "pt" ? "conexões" : "connections"}
                    </div>
                  </div>
                </div>

                {/* Event Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {event.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        ✨ {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attendee Connections Preview */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                    {language === "pt" ? "Pessoas que conheceu:" : "People you met:"}
                  </h5>
                  <div className="flex items-center gap-2">
                    {event.attendees.slice(0, 3).map((attendee, idx) => (
                      <div
                        key={attendee.id}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white ${
                          attendee.mutualInterest ? 'bg-gradient-to-r from-coral-500 to-accent-500' : 'bg-gradient-to-r from-primary-400 to-secondary-400'
                        }`}
                        title={`${attendee.name} - ${attendee.connectionStrength}% connection`}
                      >
                        {attendee.name.charAt(0)}
                      </div>
                    ))}
                    {event.attendees.length > 3 && (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        +{event.attendees.length - 3}
                      </div>
                    )}
                    <span className="text-sm text-gray-600 ml-2">
                      {event.attendees.filter(a => a.mutualInterest).length} {language === "pt" ? "interesse mútuo" : "mutual interest"}
                    </span>
                  </div>
                </div>

                {/* Next Similar Event */}
                {event.nextSimilarEvent && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarDaysIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">
                        {language === "pt" ? "Próximo evento similar:" : "Next similar event:"}
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      {event.nextSimilarEvent.title} • {event.nextSimilarEvent.date}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-1"
                  >
                    <UsersIcon className="w-4 h-4" />
                    {language === "pt" ? "Ver Conexões" : "View Connections"}
                  </button>
                  
                  <button className="px-3 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm">
                    <ShareIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Connections */}
        {selectedTab === 'connections' && (
          <div className="space-y-4">
            {selectedEvent ? (
              <div>
                {/* Back Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mb-4 text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  ← {language === "pt" ? "Voltar aos eventos" : "Back to events"}
                </button>

                {/* Event Info */}
                <div className="bg-primary-50 p-4 rounded-xl border border-primary-200 mb-4">
                  <h4 className="font-bold text-primary-900 mb-2">{selectedEvent.title}</h4>
                  <p className="text-sm text-primary-700">
                    {selectedEvent.attendees.length} {language === "pt" ? "pessoas conhecidas neste evento" : "people met at this event"}
                  </p>
                </div>

                {/* Attendee Connections */}
                <div className="space-y-3">
                  {selectedEvent.attendees.map((attendee) => (
                    <div key={attendee.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                          👤
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-gray-900">
                                  {attendee.name}, {attendee.age}
                                </h5>
                                <span className="text-lg">{getOriginFlag(attendee.origin)}</span>
                                {attendee.mutualInterest && (
                                  <HeartSolid className="w-4 h-4 text-red-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{attendee.profession}</p>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-lg font-bold text-coral-600">
                                {attendee.connectionStrength}%
                              </div>
                              <div className="text-xs text-gray-500">
                                {language === "pt" ? "conexão" : "connection"}
                              </div>
                            </div>
                          </div>

                          {/* Connection Details */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-gray-50 p-2 rounded-lg">
                              <div className="text-xs text-gray-600 mb-1">
                                {language === "pt" ? "Tipo de conexão" : "Connection type"}
                              </div>
                              <div className="text-sm font-semibold text-gray-800">
                                {getConnectionTypeLabel(attendee.connectionType)}
                              </div>
                            </div>
                            <div className={`p-2 rounded-lg ${getInteractionQualityColor(attendee.interactionQuality)}`}>
                              <div className="text-xs mb-1">
                                {language === "pt" ? "Qualidade" : "Quality"}
                              </div>
                              <div className="text-sm font-semibold capitalize">
                                {attendee.interactionQuality}
                              </div>
                            </div>
                          </div>

                          {/* Shared Moments */}
                          {attendee.sharedMoments.length > 0 && (
                            <div className="mb-3">
                              <div className="text-xs text-gray-600 mb-1">
                                {language === "pt" ? "Momentos partilhados:" : "Shared moments:"}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {attendee.sharedMoments.map((moment, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                                  >
                                    {moment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Follow-up Actions */}
                          <div className="space-y-2">
                            {attendee.followUpStatus === 'pending' && (
                              <div>
                                <textarea
                                  value={customMessage}
                                  onChange={(e) => setCustomMessage(e.target.value)}
                                  placeholder={language === "pt" 
                                    ? `Olá ${attendee.name}! Foi um prazer conhecer-te no evento...`
                                    : `Hi ${attendee.name}! It was great meeting you at the event...`}
                                  className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
                                  rows={2}
                                />
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => handleContactAttendee(attendee.id)}
                                    disabled={!customMessage.trim() || contactingAttendee === attendee.id}
                                    className="flex-1 bg-gradient-to-r from-coral-600 to-accent-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-coral-700 hover:to-accent-700 transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                                  >
                                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                    {contactingAttendee === attendee.id ? "..." : (language === "pt" ? "Contactar" : "Contact")}
                                  </button>
                                  {onReportIssue && (
                                    <button
                                      onClick={() => onReportIssue(selectedEvent.id, attendee.id, 'inappropriate_behavior')}
                                      className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                    >
                                      <ShieldCheckIcon className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                            {attendee.followUpStatus === 'contacted' && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm text-blue-800">
                                    {language === "pt" ? "Mensagem enviada" : "Message sent"}
                                  </span>
                                </div>
                              </div>
                            )}

                            {attendee.followUpStatus === 'responded' && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-800">
                                    {language === "pt" ? "Respondeu à mensagem" : "Responded to message"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  {language === "pt" 
                    ? "Selecione um evento para ver as suas conexões"
                    : "Select an event to view your connections"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Follow-ups */}
        {selectedTab === 'follow_ups' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-primary-900">
                {language === "pt" ? "Sugestões de Encontros" : "Meetup Suggestions"}
              </h4>
              <span className="text-sm text-primary-600">
                {followUpSuggestions.length} {language === "pt" ? "sugestões" : "suggestions"}
              </span>
            </div>

            {followUpSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-primary-100 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-xl flex items-center justify-center text-xl">
                    {suggestion.type === 'coffee_meetup' ? '☕' :
                     suggestion.type === 'cultural_event' ? '🎭' :
                     suggestion.type === 'group_activity' ? '👥' :
                     suggestion.type === 'professional_networking' ? '🤝' :
                     '💬'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-bold text-primary-900 mb-1">{suggestion.title}</h5>
                        <p className="text-sm text-primary-700 mb-2">{suggestion.description}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-secondary-600">
                          {suggestion.culturalRelevance}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === "pt" ? "cultural" : "cultural"}
                        </div>
                      </div>
                    </div>

                    {/* Suggestion Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <CalendarDaysIcon className="w-3 h-3" />
                        <span>{suggestion.suggestedDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{suggestion.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <ShieldCheckIcon className="w-3 h-3" />
                        <span className="capitalize">{suggestion.safetyLevel}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <span>£{suggestion.estimatedCost}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-2 rounded-lg mb-3">
                      <p className="text-xs text-gray-700">
                        <strong>{language === "pt" ? "Razão:" : "Reason:"}</strong> {suggestion.reasonForSuggestion}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePlanFollowUp(suggestion.id)}
                        className="flex-1 bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all flex items-center justify-center gap-1"
                      >
                        <CalendarDaysIcon className="w-4 h-4" />
                        {language === "pt" ? "Planear Encontro" : "Plan Meetup"}
                      </button>
                      
                      <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        {language === "pt" ? "Talvez depois" : "Maybe later"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Memories */}
        {selectedTab === 'memories' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhotoIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Partilhe as Suas Memórias" 
                  : "Share Your Memories"}
              </h4>
              <p className="text-primary-600 text-sm mb-4">
                {language === "pt"
                  ? "Adicione fotos e memórias dos eventos portugueses que participou."
                  : "Add photos and memories from Portuguese events you attended."}
              </p>
              <button className="bg-gradient-to-r from-coral-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-coral-700 hover:to-accent-700 transition-all">
                {language === "pt" ? "Adicionar Memória" : "Add Memory"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Premium Upgrade Prompt */}
      {!hasActiveSubscription && (
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <BoltIcon className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-orange-900 mb-1">
                {language === "pt" 
                  ? "Desbloqueie Conexões Pós-Evento Premium" 
                  : "Unlock Premium Post-Event Connections"}
              </h5>
              <p className="text-orange-700 text-sm">
                {language === "pt"
                  ? "Membros Premium podem contactar todas as pessoas dos eventos e receber sugestões personalizadas de encontros."
                  : "Premium members can contact all event attendees and receive personalized meetup suggestions."}
              </p>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}