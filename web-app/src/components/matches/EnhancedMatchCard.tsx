"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  SparklesIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import CulturalCompatibilityBadge from "./CulturalCompatibilityBadge";

interface MatchProfile {
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
}

interface EnhancedMatchCardProps {
  profile: MatchProfile;
  onLike: (profileId: string) => void;
  onSkip: (profileId: string) => void;
  onSuperLike?: (profileId: string) => void;
  onStartConversation?: (profileId: string, starter?: string) => void;
  isLoading?: boolean;
  showEventSuggestions?: boolean;
  showConversationStarters?: boolean;
}

export default function EnhancedMatchCard({
  profile,
  onLike,
  onSkip,
  onSuperLike,
  onStartConversation,
  isLoading = false,
  showEventSuggestions = true,
  showConversationStarters = true,
}: EnhancedMatchCardProps) {
  const { language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'profile' | 'events' | 'starters'>('profile');
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal") || origin.includes("Porto") || origin.includes("Lisboa")) return "🇵🇹";
    if (origin.includes("Brasil") || origin.includes("São Paulo")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    if (origin.includes("Cabo Verde")) return "🇨🇻";
    return "🌍";
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "from-green-500 to-green-600";
    if (score >= 80) return "from-blue-500 to-blue-600";
    if (score >= 70) return "from-yellow-500 to-yellow-600";
    return "from-gray-500 to-gray-600";
  };

  const getCulturalCompatibilityText = (score: number) => {
    if (score >= 95) {
      return language === "pt" ? "Conexão Cultural Extraordinária" : "Extraordinary Cultural Connection";
    }
    if (score >= 85) {
      return language === "pt" ? "Forte Compatibilidade Cultural" : "Strong Cultural Compatibility";
    }
    if (score >= 75) {
      return language === "pt" ? "Boa Sintonia Cultural" : "Good Cultural Harmony";
    }
    return language === "pt" ? "Algumas Afinidades Culturais" : "Some Cultural Affinities";
  };

  const tabs = [
    {
      id: 'profile' as const,
      label: language === "pt" ? "Perfil" : "Profile",
      icon: UserGroupIcon,
    },
    {
      id: 'events' as const,
      label: language === "pt" ? "Eventos" : "Events",
      icon: CalendarDaysIcon,
    },
    {
      id: 'starters' as const,
      label: language === "pt" ? "Conversa" : "Chat",
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 max-w-md mx-auto">
        <div className="animate-pulse">
          <div className="h-64 bg-primary-100"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-primary-100 rounded w-3/4"></div>
            <div className="h-4 bg-primary-50 rounded w-full"></div>
            <div className="h-4 bg-primary-50 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 max-w-md mx-auto"
    >
      {/* Profile Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-primary-400 drop-shadow-lg">👤</div>
        </div>

        {/* Enhanced Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-1">
            <StarSolid className="w-4 h-4 text-yellow-300" />
            <span className="font-bold text-sm">{profile.compatibility}% Match</span>
          </div>
        </div>

        {/* Enhanced Origin Badge - Flag Only */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-xl border border-primary-100">
          <span className="text-lg">{getOriginFlag(profile.origin)}</span>
        </div>

        {/* Verification Badge */}
        {profile.isVerified && (
          <div className="absolute top-16 right-4 bg-action-500 text-white px-2 py-1 rounded-full shadow-lg">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        )}

        {/* Activity Status */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-100">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-action-500 rounded-full"></div>
            <span className="text-xs font-medium text-primary-700">
              {language === "pt" ? "Ativo recentemente" : "Recently active"}
            </span>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="absolute bottom-4 right-4 flex gap-1">
          {profile.achievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-100"
              title={achievement.name}
            >
              <span className="text-sm">{achievement.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? "text-primary-700 border-b-2 border-primary-600 bg-white"
                    : "text-primary-600 hover:text-primary-700 hover:bg-primary-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Profile Tab */}
        {selectedTab === 'profile' && (
          <div className="space-y-4">
            {/* Basic Info */}
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                {profile.name}, {profile.age}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile.profession}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile.location}, London</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-primary-25 p-4 rounded-xl border border-primary-100">
              <p className="text-primary-800 text-sm leading-relaxed">{profile.bio}</p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Interesses Comuns" : "Common Interests"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.slice(0, 4).map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary-200"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Cultural Connection */}
            <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 p-4 rounded-2xl border border-secondary-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-bold text-secondary-800 text-sm">
                    {getCulturalCompatibilityText(profile.culturalAlignment)}
                  </span>
                </div>
                <CulturalCompatibilityBadge
                  overallScore={profile.culturalAlignment}
                  size="small"
                  animated={false}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-800">{profile.compatibility}%</div>
                  <div className="text-xs text-secondary-600">
                    {language === "pt" ? "Geral" : "Overall"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-800">{profile.eventCompatibility}%</div>
                  <div className="text-xs text-secondary-600">
                    {language === "pt" ? "Eventos" : "Events"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-800">{profile.culturalAlignment}%</div>
                  <div className="text-xs text-secondary-600">
                    {language === "pt" ? "Cultural" : "Cultural"}
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/60">
                <h5 className="font-bold text-secondary-800 mb-2 text-xs">
                  {language === "pt" ? "Porque vão conectar:" : "Why you'll connect:"}
                </h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 text-action-500" />
                    <span className="text-xs text-secondary-700">
                      {language === "pt" ? "Herança portuguesa partilhada" : "Shared Portuguese heritage"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 text-primary-500" />
                    <span className="text-xs text-secondary-700">
                      {language === "pt" ? "Interesses culturais similares" : "Similar cultural interests"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-3 h-3 text-accent-500" />
                    <span className="text-xs text-secondary-700">
                      {language === "pt" ? `Ambos em ${profile.location}` : `Both in ${profile.location}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && showEventSuggestions && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Eventos Sugeridos" : "Suggested Events"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Baseado nos vossos interesses comuns"
                  : "Based on your shared interests"}
              </p>
            </div>

            <div className="space-y-3">
              {profile.suggestedEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="border border-primary-200 rounded-xl p-3 hover:bg-primary-25 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-primary-900 text-sm">{event.title}</h5>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-lg">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-primary-600">
                    <span>{event.date}</span>
                    <span className="font-semibold">£{event.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
              {language === "pt" ? "Ver Todos os Eventos" : "View All Events"}
            </button>
          </div>
        )}

        {/* Conversation Starters Tab */}
        {selectedTab === 'starters' && showConversationStarters && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Messaging com Proteção" : "Protected Messaging"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Mensagens só ficam disponíveis após match mútuo ou eventos partilhados"
                  : "Messaging unlocked after mutual match or shared events"}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircleIcon className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-blue-800">
                  {language === "pt" ? "Sistema de Segurança TikTok-Style" : "TikTok-Style Safety System"}
                </span>
              </div>
              <p className="text-xs text-primary-700">
                {language === "pt"
                  ? "As mensagens só ficam disponíveis quando há interesse mútuo ou quando participam em eventos juntos, garantindo conexões autênticas e seguras."
                  : "Messages only unlock when there's mutual interest or when you attend events together, ensuring authentic and safe connections."}
              </p>
            </div>

            <div className="space-y-3">
              {profile.conversationStarters.slice(0, 3).map((starter) => (
                <div
                  key={starter.id}
                  className="border border-secondary-200 rounded-xl p-3 bg-secondary-50 opacity-60"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-secondary-600 leading-relaxed flex-1">
                      "{starter.text}"
                    </p>
                    <div className="flex items-center gap-1 ml-2">
                      <FireIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">
                        {starter.popularity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-lg">
                      {starter.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {language === "pt" ? "Bloqueado" : "Locked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-200">
              <h5 className="font-semibold text-primary-900 mb-2">
                {language === "pt" ? "Como Desbloquear Mensagens:" : "How to Unlock Messaging:"}
              </h5>
              <div className="space-y-2 text-sm text-primary-700">
                <div className="flex items-center gap-2">
                  <HeartIcon className="w-4 h-4 text-coral-500" />
                  <span>{language === "pt" ? "Match mútuo (ambos gostam)" : "Mutual match (both like each other)"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
                  <span>{language === "pt" ? "Participar em eventos juntos" : "Attend events together"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-primary-100">
          <button
            onClick={() => onSkip(profile.id)}
            className="w-16 h-16 bg-white border-3 border-secondary-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-red-300 group"
          >
            <XMarkIcon className="w-8 h-8 text-secondary-600 group-hover:text-coral-600 transition-colors" />
          </button>

          <button
            onClick={() => onLike(profile.id)}
            className="w-20 h-20 bg-gradient-to-r from-action-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          >
            <HeartSolid className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
          </button>

          {onSuperLike && (
            <button
              onClick={() => onSuperLike(profile.id)}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-yellow-300 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
            >
              <StarIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}