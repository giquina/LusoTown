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
  BriefcaseIcon,
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
import BusinessNetworkingMatch from "./BusinessNetworkingMatch";

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
  const [activeTab, setActiveTab] = useState<'discover' | 'mutual' | 'events' | 'groups' | 'achievements' | 'business'>('discover');
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
      id: 'business' as const,
      label: language === "pt" ? "Profissional" : "Business",
      icon: BriefcaseIcon,
      count: 12,
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
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-8 text-white overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"
            >
              <HeartSolid className="w-12 h-12 text-red-500" />
            </motion.div>
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-3"
              >
                {language === "pt" ? "Falantes de Português" : "Portuguese Speakers"}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-lg"
              >
                {language === "pt" 
                  ? "Conecte-se com falantes de português em todo o Reino Unido"
                  : "Connect with Portuguese speakers across the United Kingdom"}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Daily Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
              {language === "pt" ? "Atividade de Hoje" : "Today's Activity"}
            </h3>
            <p className="text-gray-600">
              {language === "pt" ? "Seu progresso diário conectando-se com outros falantes de português" : "Your daily progress connecting with fellow Portuguese speakers"}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary-900">{dailyStats.likesGiven}</div>
              </div>
              <div className="text-primary-700 font-semibold">
                {language === "pt" ? "Likes Dados" : "Likes Given"}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-secondary-900">{dailyStats.matchesReceived}</div>
              </div>
              <div className="text-secondary-700 font-semibold">
                {language === "pt" ? "Matches Recebidos" : "Matches Received"}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-accent-900">{dailyStats.conversationsStarted}</div>
              </div>
              <div className="text-accent-700 font-semibold">
                {language === "pt" ? "Conversas Iniciadas" : "Conversations Started"}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-2xl p-6 border border-coral-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-coral-500 to-coral-600 rounded-xl">
                  <CalendarDaysIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-coral-900">{dailyStats.eventsBooked}</div>
              </div>
              <div className="text-coral-700 font-semibold">
                {language === "pt" ? "Eventos Reservados" : "Events Booked"}
              </div>
            </motion.div>
          </div>
        </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl p-3 shadow-xl border border-primary-200 overflow-x-auto">
              <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 relative overflow-hidden ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white shadow-xl"
                      : "text-primary-700 hover:text-primary-800 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:shadow-md"
                  }`}
                >
                  {/* Active Tab Glow Effect */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {tab.label}
                    {tab.count > 0 && (
                      <motion.span 
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          activeTab === tab.id
                            ? "bg-white/25 text-white backdrop-blur-sm"
                            : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                        }`}
                      >
                        {tab.count}
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              );
            })}
              </div>
            </div>
          </motion.div>

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

          {activeTab === 'business' && (
            <motion.div
              key="business"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <BusinessNetworkingMatch
                currentUserId={currentUserId}
                onBusinessMatchAction={(matchId, action) => {
                  // Handle business match actions
                  console.log('Business match action:', matchId, action);
                }}
                onMentorshipRequest={(menteeId, mentorId) => {
                  // Handle mentorship requests
                  console.log('Mentorship request:', menteeId, mentorId);
                }}
                onBusinessEventBooking={(eventId, matchId) => {
                  // Handle business event booking
                  console.log('Business event booking:', eventId, matchId);
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