"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ScaleIcon,
  StarIcon,
  CheckCircleIcon,
  SparklesIcon,
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  LightBulbIcon,
  TrophyIcon,
  CalendarDaysIcon,
  CurrencyPoundIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolid,
  ScaleIcon as ScaleSolid,
  BriefcaseIcon as BriefcaseSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

interface BusinessProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  company: string;
  industry: string;
  experience: string;
  companySize: string;
  networkingGoals: string[];
  businessInterests: string[];
  origin: string;
  bio: string;
  skills: string[];
  achievements: string[];
  languages: string[];
  isVerified: boolean;
  professionalScore: number;
  culturalAlignment: number;
  businessCompatibility: number;
  responseRate: number;
  lastActive: string;
  portfolioUrl?: string;
  linkedInUrl?: string;
  mentorshipInterest: "mentor" | "mentee" | "peer" | "both";
  availableForMentorship: boolean;
  businessEvents: Array<{
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
    businessRelevance: string;
    popularity: number;
  }>;
  image?: string;
}

interface BusinessMatchCardProps {
  profile: BusinessProfile;
  matchType: "mentorship" | "collaboration" | "networking" | "partnership" | "investment";
  compatibilityScore: number;
  businessCompatibility: number;
  culturalAlignment: number;
  onConnect: (profileId: string) => void;
  onSkip: (profileId: string) => void;
  onPriorityConnect?: (profileId: string) => void;
  onMentorshipRequest?: (menteeId: string, mentorId: string) => void;
  isLoading?: boolean;
  showBusinessEvents?: boolean;
  showConversationStarters?: boolean;
}

export default function BusinessMatchCard({
  profile,
  matchType,
  compatibilityScore,
  businessCompatibility,
  culturalAlignment,
  onConnect,
  onSkip,
  onPriorityConnect,
  onMentorshipRequest,
  isLoading = false,
  showBusinessEvents = true,
  showConversationStarters = true,
}: BusinessMatchCardProps) {
  const { language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'profile' | 'business' | 'events'>('profile');

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal") || origin.includes("Porto") || origin.includes("Lisboa")) return "🇵🇹";
    if (origin.includes("Brasil") || origin.includes("São Paulo")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    if (origin.includes("Cabo Verde")) return "🇨🇻";
    return "🌍";
  };

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case "mentorship": return "🎓";
      case "collaboration": return "🤝";
      case "networking": return "🌐";
      case "partnership": return "💼";
      case "investment": return "💰";
      default: return "🔗";
    }
  };

  const getMatchTypeLabel = (type: string) => {
    const labels = {
      mentorship: language === "pt" ? "Mentoria" : "Mentorship",
      collaboration: language === "pt" ? "Colaboração" : "Collaboration", 
      networking: language === "pt" ? "Networking" : "Networking",
      partnership: language === "pt" ? "Parceria" : "Partnership",
      investment: language === "pt" ? "Investimento" : "Investment",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getExperienceColor = (experience: string) => {
    if (experience.includes("12+") || experience.includes("15+")) return "from-accent-500 to-accent-600";
    if (experience.includes("8+") || experience.includes("10+")) return "from-blue-500 to-blue-600";
    if (experience.includes("5+")) return "from-green-500 to-green-600";
    return "from-gray-500 to-gray-600";
  };

  const getMentorshipTypeText = (type: string) => {
    const types = {
      mentor: language === "pt" ? "Mentor Disponível" : "Available as Mentor",
      mentee: language === "pt" ? "Procura Mentor" : "Seeking Mentor",
      peer: language === "pt" ? "Networking Entre Pares" : "Peer Networking",
      both: language === "pt" ? "Mentor e Mentorando" : "Mentor & Mentee",
    };
    return types[type as keyof typeof types] || type;
  };

  const tabs = [
    {
      id: 'profile' as const,
      label: language === "pt" ? "Perfil" : "Profile",
      icon: UserGroupIcon,
    },
    {
      id: 'business' as const,
      label: language === "pt" ? "Negócio" : "Business",
      icon: BriefcaseIcon,
    },
    {
      id: 'events' as const,
      label: language === "pt" ? "Eventos" : "Events",
      icon: CalendarDaysIcon,
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
      {/* Profile Header Section */}
      <div className="relative h-64 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-primary-400 drop-shadow-lg">👤</div>
        </div>

        {/* Business Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-1">
            <BriefcaseSolid className="w-4 h-4 text-yellow-300" />
            <span className="font-bold text-sm">{businessCompatibility}% Business Match</span>
          </div>
        </div>

        {/* Origin Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-xl border border-primary-100">
          <span className="text-lg">{getOriginFlag(profile.origin)}</span>
        </div>

        {/* Verification Badge */}
        {profile.isVerified && (
          <div className="absolute top-16 right-4 bg-action-500 text-white px-2 py-1 rounded-full shadow-lg">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        )}

        {/* Match Type Badge */}
        <div className="absolute top-16 left-4 bg-gradient-to-r from-premium-500 to-coral-500 text-white px-3 py-1 rounded-full shadow-lg border border-white/20">
          <div className="flex items-center gap-1">
            <span className="text-sm">{getMatchTypeIcon(matchType)}</span>
            <span className="text-xs font-medium">{getMatchTypeLabel(matchType)}</span>
          </div>
        </div>

        {/* Activity Status */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-100">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-action-500 rounded-full"></div>
            <span className="text-xs font-medium text-primary-700">
              {language === "pt" ? "Ativo recentemente" : "Recently active"}
            </span>
          </div>
        </div>

        {/* Professional Links */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {profile.portfolioUrl && (
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-100">
              <GlobeAltIcon className="w-4 h-4 text-primary-600" />
            </div>
          )}
          {profile.linkedInUrl && (
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary-100">
              <LinkIcon className="w-4 h-4 text-primary-600" />
            </div>
          )}
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
                  <BuildingOfficeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile.company}</span>
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

            {/* Languages */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <GlobeAltIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Idiomas" : "Languages"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.languages.slice(0, 3).map((lang, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-secondary-50 to-accent-50 text-secondary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-secondary-200"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>

            {/* Mentorship Interest */}
            <div className="bg-gradient-to-r from-accent-50 via-coral-50 to-premium-50 p-4 rounded-2xl border border-accent-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-accent-500 to-coral-500 rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-bold text-accent-800 text-sm">
                    {getMentorshipTypeText(profile.mentorshipInterest)}
                  </span>
                </div>
                {profile.availableForMentorship && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {language === "pt" ? "Disponível" : "Available"}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-800">{compatibilityScore}%</div>
                  <div className="text-xs text-accent-600">
                    {language === "pt" ? "Geral" : "Overall"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-800">{businessCompatibility}%</div>
                  <div className="text-xs text-accent-600">
                    {language === "pt" ? "Negócio" : "Business"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-800">{culturalAlignment}%</div>
                  <div className="text-xs text-accent-600">
                    {language === "pt" ? "Cultural" : "Cultural"}
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/60">
                <h5 className="font-bold text-accent-800 mb-2 text-xs">
                  {language === "pt" ? "Conexão Profissional:" : "Professional Connection:"}
                </h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 text-action-500" />
                    <span className="text-xs text-accent-700">
                      {language === "pt" ? "Herança cultural portuguesa partilhada" : "Shared Portuguese cultural heritage"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-3 h-3 text-primary-500" />
                    <span className="text-xs text-accent-700">
                      {language === "pt" ? "Objetivos de networking alinhados" : "Aligned networking goals"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="w-3 h-3 text-accent-500" />
                    <span className="text-xs text-accent-700">
                      {language === "pt" ? "Interesses comerciais complementares" : "Complementary business interests"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Tab */}
        {selectedTab === 'business' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Perfil Profissional" : "Professional Profile"}
              </h4>
              <p className="text-sm text-primary-600">
                {profile.industry} • {profile.experience} • {profile.companySize}
              </p>
            </div>

            {/* Professional Skills */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <LightBulbIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Competências Principais" : "Core Skills"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Networking Goals */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <UserGroupIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Objetivos de Networking" : "Networking Goals"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.networkingGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-secondary-50 to-accent-50 text-secondary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-secondary-200"
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Interests */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Interesses Comerciais" : "Business Interests"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.businessInterests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-accent-50 to-coral-50 text-accent-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-accent-200"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <TrophyIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Conquistas" : "Achievements"}
              </h4>
              <div className="space-y-2">
                {profile.achievements.slice(0, 3).map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-premium-25 p-2 rounded-lg border border-premium-100"
                  >
                    <TrophyIcon className="w-4 h-4 text-premium-600" />
                    <span className="text-sm text-premium-800 font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && showBusinessEvents && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Eventos de Negócio Sugeridos" : "Suggested Business Events"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Baseado nos vossos interesses profissionais comuns"
                  : "Based on your shared professional interests"}
              </p>
            </div>

            <div className="space-y-3">
              {profile.businessEvents.map((event) => (
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
                    <span className="font-semibold flex items-center gap-1">
                      <CurrencyPoundIcon className="w-3 h-3" />
                      {event.price === 0 ? (language === "pt" ? "Grátis" : "Free") : event.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
              {language === "pt" ? "Ver Todos os Eventos" : "View All Events"}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-primary-100">
          <button
            onClick={() => onSkip(profile.id)}
            className="w-14 h-14 bg-white border-3 border-secondary-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-red-300 group"
          >
            <span className="text-xl group-hover:text-coral-600 transition-colors">❌</span>
          </button>

          {onMentorshipRequest && profile.availableForMentorship && (
            <button
              onClick={() => onMentorshipRequest?.("currentUserId", profile.id)}
              className="w-14 h-14 bg-gradient-to-r from-accent-500 to-coral-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
            >
              <AcademicCapIcon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>
          )}

          <button
            onClick={() => onConnect(profile.id)}
            className="w-16 h-16 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          >
            <ScaleSolid className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>

          {onPriorityConnect && (
            <button
              onClick={() => onPriorityConnect(profile.id)}
              className="w-14 h-14 bg-gradient-to-r from-premium-500 to-coral-500 border-2 border-premium-300 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
            >
              <StarSolid className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}