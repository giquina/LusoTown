"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartIcon,
  SparklesIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  FireIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import EnhancedMatchCard from "./EnhancedMatchCard";
import MatchEventSuggestions from "./MatchEventSuggestions";
import EventBuddyFinder from "./EventBuddyFinder";
import MatchingAchievements from "./MatchingAchievements";
import GroupMatching from "./GroupMatching";

interface Match {
  id: string;
  userId: string;
  targetUserId: string;
  compatibilityScore: number;
  eventCompatibilityScore: number;
  culturalAlignment: number;
  sharedInterests: string[];
  isMutual: boolean;
  matchedAt?: string;
  profile: {
    id: string;
    name: string;
    age: number;
    location: string;
    profession: string;
    origin: string;
    interests: string[];
    bio: string;
    image?: string;
    compatibility: number;
    eventCompatibility: number;
    culturalAlignment: number;
    suggestedEvents: Array<{
      id: string;
      title: string;
      category: string;
      date: string;
      price: number;
    }>;
    conversationStarters: Array<{
      id: string;
      text: string;
      category: string;
      culturalContext: string;
      popularity: number;
    }>;
    achievements: Array<{
      id: string;
      name: string;
      icon: string;
      category: string;
    }>;
    isVerified: boolean;
    responseRate: number;
    lastActive: string;
  };
}

interface EnhancedMatchDashboardProps {
  currentUserId?: string;
  showEventSuggestions?: boolean;
  showAchievements?: boolean;
  showGroupMatching?: boolean;
  onMatchAction?: (matchId: string, action: 'like' | 'skip' | 'super_like') => void;
  onEventBooking?: (eventId: string, matchId?: string) => void;
}

export default function EnhancedMatchDashboard({
  currentUserId = "user1",
  showEventSuggestions = true,
  showAchievements = true,
  showGroupMatching = true,
  onMatchAction,
  onEventBooking,
}: EnhancedMatchDashboardProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'discover' | 'mutual' | 'events' | 'groups' | 'achievements'>('discover');
  const [mutualMatches, setMutualMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({
    likesGiven: 0,
    matchesReceived: 0,
    conversationsStarted: 0,
    eventsBooked: 0,
  });

  // Mock data - In production, this would come from API
  useEffect(() => {
    const mockMatches: Match[] = [
      {
        id: "match1",
        userId: currentUserId,
        targetUserId: "user2",
        compatibilityScore: 94,
        eventCompatibilityScore: 89,
        culturalAlignment: 96,
        sharedInterests: ["Fado", "Portuguese Culture", "Wine Tasting", "Cultural Events"],
        isMutual: false,
        profile: {
          id: "user2",
          name: "Sofia Santos",
          age: 29,
          location: "Vauxhall",
          profession: "Marketing Manager",
          origin: "Porto, Portugal",
          interests: ["Fado", "Portuguese Culture", "Wine Tasting", "Cultural Events", "Business Networking"],
          bio: "Portuguesa do Porto a viver em Londres há 3 anos. Adoro noites de Fado e procuro alguém que partilhe a paixão pela nossa cultura!",
          compatibility: 94,
          eventCompatibility: 89,
          culturalAlignment: 96,
          suggestedEvents: [
            { id: "evt1", title: "Noite de Fado Autêntico", category: "Cultural", date: "2025-08-25", price: 25 },
            { id: "evt2", title: "Degustação de Vinhos do Douro", category: "Gastronomy", date: "2025-08-28", price: 40 },
          ],
          conversationStarters: [
            {
              id: "cs1",
              text: "Adoras Fado? Qual é o teu fadista favorito?",
              category: "Música Portuguesa",
              culturalContext: "Fado é património cultural português",
              popularity: 89,
            },
            {
              id: "cs2", 
              text: "Que sítios do Porto tens mais saudades?",
              category: "Herança Regional",
              culturalContext: "Conexão com a cidade natal",
              popularity: 76,
            },
          ],
          achievements: [
            { id: "ach1", name: "Amante de Fado", icon: "🎵", category: "cultural" },
            { id: "ach2", name: "Primeiro Match", icon: "🇵🇹", category: "matching" },
          ],
          isVerified: true,
          responseRate: 92,
          lastActive: "2h ago",
        },
      },
      {
        id: "match2",
        userId: currentUserId,
        targetUserId: "user3",
        compatibilityScore: 87,
        eventCompatibilityScore: 91,
        culturalAlignment: 88,
        sharedInterests: ["Football", "Portuguese Cuisine", "Professional Networking"],
        isMutual: true,
        matchedAt: "2025-08-19",
        profile: {
          id: "user3",
          name: "Miguel Costa",
          age: 32,
          location: "Stockwell",
          profession: "Software Engineer",
          origin: "Lisboa, Portugal",
          interests: ["Football", "Portuguese Cuisine", "Professional Networking", "Tech Meetups"],
          bio: "Engenheiro de software de Lisboa. Grande adepto do Benfica e sempre pronto para conversar sobre tecnologia ou futebol!",
          compatibility: 87,
          eventCompatibility: 91,
          culturalAlignment: 88,
          suggestedEvents: [
            { id: "evt3", title: "Portugal vs Espanha", category: "Sports", date: "2025-09-01", price: 15 },
            { id: "evt4", title: "Workshop de Pastéis de Nata", category: "Workshop", date: "2025-09-05", price: 35 },
          ],
          conversationStarters: [
            {
              id: "cs3",
              text: "Viste o último jogo do Benfica? Que loucura!",
              category: "Desporto",
              culturalContext: "Futebol une a comunidade portuguesa",
              popularity: 95,
            },
          ],
          achievements: [
            { id: "ach3", name: "Adepto de Futebol", icon: "⚽", category: "cultural" },
            { id: "ach4", name: "Match Mútuo", icon: "💕", category: "matching" },
          ],
          isVerified: true,
          responseRate: 88,
          lastActive: "1h ago",
        },
      },
    ];

    const mockMutualMatches = mockMatches.filter(m => m.isMutual);

    setTimeout(() => {
      setMatches(mockMatches);
      setMutualMatches(mockMutualMatches);
      setCurrentMatch(mockMatches[0]);
      setDailyStats({
        likesGiven: 12,
        matchesReceived: 3,
        conversationsStarted: 1,
        eventsBooked: 2,
      });
      setLoading(false);
    }, 1000);
  }, [currentUserId]);

  const handleMatchAction = (profileId: string, action: 'like' | 'skip' | 'super_like') => {
    onMatchAction?.(profileId, action);
    
    // Move to next match
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
      setCurrentMatch(matches[currentMatchIndex + 1]);
    } else {
      setCurrentMatchIndex(0);
      setCurrentMatch(matches[0]);
    }

    // Update daily stats
    if (action === 'like' || action === 'super_like') {
      setDailyStats(prev => ({
        ...prev,
        likesGiven: prev.likesGiven + 1,
      }));
    }
  };

  const handleStartConversation = (profileId: string, starterId?: string) => {
    setDailyStats(prev => ({
      ...prev,
      conversationsStarted: prev.conversationsStarted + 1,
    }));
    // Handle conversation start logic
  };

  const handleEventBooking = (eventId: string) => {
    onEventBooking?.(eventId, currentMatch?.id);
    setDailyStats(prev => ({
      ...prev,
      eventsBooked: prev.eventsBooked + 1,
    }));
  };

  const tabs = [
    {
      id: 'discover' as const,
      label: language === "pt" ? "Descobrir" : "Discover",
      icon: SparklesIcon,
      count: matches.length,
    },
    {
      id: 'mutual' as const,
      label: language === "pt" ? "Matches" : "Matches",
      icon: HeartIcon,
      count: mutualMatches.length,
    },
    {
      id: 'events' as const,
      label: language === "pt" ? "Eventos" : "Events",
      icon: CalendarDaysIcon,
      count: 4,
    },
    {
      id: 'groups' as const,
      label: language === "pt" ? "Grupos" : "Groups",
      icon: UserGroupIcon,
      count: 3,
    },
    {
      id: 'achievements' as const,
      label: language === "pt" ? "Conquistas" : "Achievements",
      icon: TrophyIcon,
      count: 8,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-white to-coral-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-primary-100 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-primary-50 rounded-2xl"></div>
              <div className="h-96 bg-primary-50 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-white to-coral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
              <HeartSolid className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-900">
                {language === "pt" ? "Matches Portugueses" : "Portuguese Matches"}
              </h1>
              <p className="text-primary-600">
                {language === "pt" 
                  ? "Conecte-se com a comunidade portuguesa em Londres"
                  : "Connect with the Portuguese community in London"}
              </p>
            </div>
          </div>

          {/* Daily Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100 mb-6">
            <h3 className="text-lg font-bold text-primary-900 mb-4">
              {language === "pt" ? "Atividade de Hoje" : "Today's Activity"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{dailyStats.likesGiven}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Likes Dados" : "Likes Given"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{dailyStats.matchesReceived}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Matches Recebidos" : "Matches Received"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{dailyStats.conversationsStarted}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Conversas Iniciadas" : "Conversations Started"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{dailyStats.eventsBooked}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Eventos Reservados" : "Events Booked"}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-primary-100 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                      : "text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-primary-100 text-primary-700"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Match Card */}
              <div>
                {currentMatch && (
                  <EnhancedMatchCard
                    profile={currentMatch.profile}
                    onLike={(profileId) => handleMatchAction(profileId, 'like')}
                    onSkip={(profileId) => handleMatchAction(profileId, 'skip')}
                    onSuperLike={(profileId) => handleMatchAction(profileId, 'super_like')}
                    onStartConversation={handleStartConversation}
                    showEventSuggestions={true}
                    showConversationStarters={true}
                  />
                )}
              </div>

              {/* Event Suggestions */}
              <div className="space-y-6">
                {currentMatch && showEventSuggestions && (
                  <MatchEventSuggestions
                    matchId={currentMatch.id}
                    matchedUserName={currentMatch.profile.name}
                    matchedUserAge={currentMatch.profile.age}
                    sharedInterests={currentMatch.sharedInterests}
                    compatibilityScore={currentMatch.compatibilityScore}
                    onBookTogether={handleEventBooking}
                  />
                )}

                {/* Event Buddy Finder */}
                <EventBuddyFinder
                  onBuddyRequestAccepted={(requestId) => {
                    setDailyStats(prev => ({
                      ...prev,
                      eventsBooked: prev.eventsBooked + 1,
                    }));
                  }}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'mutual' && (
            <motion.div
              key="mutual"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
                <h3 className="text-xl font-bold text-primary-900 mb-4">
                  {language === "pt" ? "Seus Matches Mútuos" : "Your Mutual Matches"}
                </h3>
                
                {mutualMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mutualMatches.map((match) => (
                      <div
                        key={match.id}
                        className="border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                            👤
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-primary-900">
                              {match.profile.name}, {match.profile.age}
                            </h4>
                            <p className="text-sm text-primary-600">
                              {match.profile.location} • {match.compatibilityScore}% match
                            </p>
                          </div>
                          <div className="text-green-500">
                            <HeartSolid className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {match.sharedInterests.slice(0, 2).map((interest, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium mr-1"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
                            {language === "pt" ? "Conversar" : "Chat"}
                          </button>
                          <button className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                            <CalendarDaysIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-primary-900 mb-2">
                      {language === "pt" ? "Nenhum match mútuo ainda" : "No mutual matches yet"}
                    </h4>
                    <p className="text-primary-600 text-sm">
                      {language === "pt"
                        ? "Continue descobrindo pessoas para fazer seus primeiros matches!"
                        : "Keep discovering people to make your first matches!"}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && showEventSuggestions && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {currentMatch && (
                <MatchEventSuggestions
                  matchId={currentMatch.id}
                  matchedUserName={currentMatch.profile.name}
                  matchedUserAge={currentMatch.profile.age}
                  sharedInterests={currentMatch.sharedInterests}
                  compatibilityScore={currentMatch.compatibilityScore}
                  onBookTogether={handleEventBooking}
                />
              )}
              <EventBuddyFinder
                onBuddyRequestAccepted={(requestId) => {
                  setDailyStats(prev => ({
                    ...prev,
                    eventsBooked: prev.eventsBooked + 1,
                  }));
                }}
              />
            </motion.div>
          )}

          {activeTab === 'groups' && showGroupMatching && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GroupMatching
                currentUserId={currentUserId}
                onGroupMatchAccepted={(requestId, groupMembers) => {
                  setDailyStats(prev => ({
                    ...prev,
                    matchesReceived: prev.matchesReceived + groupMembers.length,
                  }));
                }}
              />
            </motion.div>
          )}

          {activeTab === 'achievements' && showAchievements && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MatchingAchievements
                userId={currentUserId}
                showProgressBar={true}
                showRewards={true}
                onAchievementClick={(achievement) => {
                  // Handle achievement click
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Upgrade Footer */}
        {!hasActiveSubscription && (
          <div className="mt-8 bg-gradient-to-r from-premium-50 to-coral-50 border border-premium-200 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-premium-500 to-coral-500 rounded-xl">
                <StarSolid className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-premium-900 mb-2">
                  {language === "pt" 
                    ? "Desbloqueie o Potencial Completo dos Matches" 
                    : "Unlock Full Matching Potential"}
                </h4>
                <p className="text-premium-700 text-sm">
                  {language === "pt"
                    ? "Membros Premium têm matches ilimitados, sugestões de eventos exclusivas, acesso a grupos VIP e muito mais."
                    : "Premium members get unlimited matches, exclusive event suggestions, VIP group access and much more."}
                </p>
              </div>
              <button className="bg-gradient-to-r from-premium-600 to-coral-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-premium-700 hover:to-coral-700 transition-all shadow-lg">
                {language === "pt" ? "Upgrade Premium" : "Upgrade Premium"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}