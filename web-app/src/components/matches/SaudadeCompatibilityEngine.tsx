"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartIcon,
  SparklesIcon,
  HomeIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  FireIcon,
  SunIcon,
  MapPinIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import type {
  SaudadeProfile,
  CulturalDepthProfile,
  SaudadeCompatibilityResult,
  RegionalIdentity,
} from "./SaudadeMatchingSystem";

interface CompatibilityMatch {
  id: string;
  userId: string;
  name: string;
  age: number;
  photo: string;
  saudadeProfile: SaudadeProfile;
  culturalProfile: CulturalDepthProfile;
  compatibilityResult: SaudadeCompatibilityResult;
  distance?: number;
  lastActive?: string;
}

interface SaudadeCompatibilityEngineProps {
  userProfile: CulturalDepthProfile;
  onMatchSelect: (match: CompatibilityMatch) => void;
  onStartConversation: (matchId: string) => void;
  showDetailedAnalysis?: boolean;
}

export default function SaudadeCompatibilityEngine({
  userProfile,
  onMatchSelect,
  onStartConversation,
  showDetailedAnalysis = true,
}: SaudadeCompatibilityEngineProps) {
  const { language } = useLanguage();
  const [compatibleMatches, setCompatibleMatches] = useState<
    CompatibilityMatch[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<CompatibilityMatch | null>(
    null
  );
  const [showAnalysis, setShowAnalysis] = useState(false);

  const calculateSaudadeCompatibility = useCallback(
    (
      user: CulturalDepthProfile,
      potential: CulturalDepthProfile
    ): SaudadeCompatibilityResult => {
      const userSaudade = user.saudadeProfile;
      const potentialSaudade = potential.saudadeProfile;

      // Saudade Intensity Alignment (0-100)
      const intensityDiff = Math.abs(
        userSaudade.saudadeIntensity - potentialSaudade.saudadeIntensity
      );
      const saudadeAlignment = Math.max(0, 100 - intensityDiff * 10);

      // Cultural Depth Compatibility
      const culturalDepthDiff = Math.abs(
        user.overallCulturalDepth - potential.overallCulturalDepth
      );
      const culturalDepth = Math.max(0, 100 - culturalDepthDiff * 10);

      // Heritage Alignment
      const heritageDiff = Math.abs(
        userSaudade.heritagePreservation - potentialSaudade.heritagePreservation
      );
      const heritageAlignment = Math.max(0, 100 - heritageDiff * 8);

      // Emotional Triggers Compatibility
      const sharedTriggers = userSaudade.triggers.filter((trigger) =>
        potentialSaudade.triggers.includes(trigger)
      );
      const triggerCompatibility =
        (sharedTriggers.length / Math.max(userSaudade.triggers.length, 1)) *
        100;

      // Coping Mechanisms Alignment
      const sharedCoping = userSaudade.copingMechanisms.filter((mechanism) =>
        potentialSaudade.copingMechanisms.includes(mechanism)
      );
      const copingAlignment =
        (sharedCoping.length /
          Math.max(userSaudade.copingMechanisms.length, 1)) *
        100;

      // Regional Identity Compatibility
      const regionalCompatibility = calculateRegionalIdentityMatch(
        user.regionalIdentity,
        potential.regionalIdentity
      );

      // Overall Compatibility Score (weighted average)
      const compatibilityScore = Math.round(
        saudadeAlignment * 0.25 +
          culturalDepth * 0.2 +
          heritageAlignment * 0.2 +
          triggerCompatibility * 0.15 +
          copingAlignment * 0.1 +
          regionalCompatibility * 0.1
      );

      return {
        compatibilityScore,
        saudadeAlignment,
        culturalDepth,
        heritageAlignment,
        triggerCompatibility,
        copingAlignment,
        regionalCompatibility,
        sharedElements: {
          triggers: sharedTriggers,
          copingMechanisms: sharedCoping,
          culturalActivities: findSharedCulturalActivities(user, potential),
        },
        potentialChallenges: identifyPotentialChallenges(
          userSaudade,
          potentialSaudade
        ),
        relationshipStrengths: identifyRelationshipStrengths(
          userSaudade,
          potentialSaudade
        ),
      };
    },
    []
  );

  const findCompatibleMatches = useCallback(async () => {
    setLoading(true);

    // Simulated compatible matches - in real app, this would be API call
    const mockMatches = generateMockMatches(userProfile);

    // Calculate compatibility for each match
    const analyzedMatches = mockMatches.map((match) => ({
      ...match,
      compatibilityResult: calculateSaudadeCompatibility(
        userProfile,
        match.culturalProfile
      ),
    }));

    // Sort by compatibility score
    analyzedMatches.sort(
      (a, b) =>
        b.compatibilityResult.compatibilityScore -
        a.compatibilityResult.compatibilityScore
    );

    setCompatibleMatches(analyzedMatches);
    setLoading(false);
  }, [userProfile, calculateSaudadeCompatibility]);

  useEffect(() => {
    findCompatibleMatches();
  }, [findCompatibleMatches]);

  const generateMockMatches = (
    userProfile: CulturalDepthProfile
  ): Omit<CompatibilityMatch, "compatibilityResult">[] => {
    return [
      {
        id: "1",
        userId: "user_1",
        name: "Sofia",
        age: 29,
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=150&h=150&fit=crop&crop=face",
        distance: 2.3,
        lastActive: "2 hours ago",
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity + 1,
          frequency: "weekly",
          triggers: ["fado_music", "family_voices", "portuguese_countryside"],
          copingMechanisms: ["cook_portuguese", "listen_fado", "call_family"],
          homelandConnection: 8,
          languageEmotionalAttachment: 9,
          culturalSupport: "high",
          regionalIdentity: {
            region: "porto_norte",
            connection: 9,
            specificAreas: ["Porto", "Braga"],
            traditions: ["Santos Populares", "Francesinha"],
            culturalMarkers: ["Northern pride", "Football culture"],
          },
          heritagePreservation: 8,
          integrationBalance: 4,
          emotionalCompatibilityType: "Alma Saudosa",
          supportNeeds: ["understanding_saudade", "share_traditions"],
          culturalHealingActivities: ["Fado nights", "Lusophone cooking"],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 8.5,
        },
      },
      {
        id: "2",
        userId: "user_2",
        name: "Miguel",
        age: 34,
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        distance: 5.7,
        lastActive: "1 day ago",
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity - 1,
          frequency: "monthly",
          triggers: ["childhood_foods", "portuguese_films", "santos_populares"],
          copingMechanisms: [
            "portuguese_community",
            "cook_portuguese",
            "visit_portugal",
          ],
          homelandConnection: 7,
          languageEmotionalAttachment: 8,
          culturalSupport: "moderate",
          regionalIdentity: {
            region: "lisboa_area",
            connection: 8,
            specificAreas: ["Lisboa", "Cascais"],
            traditions: ["Fado", "Lusophone literature"],
            culturalMarkers: ["Urban culture", "Cosmopolitan"],
          },
          heritagePreservation: 7,
          integrationBalance: 5,
          emotionalCompatibilityType: "Construtor de Pontes",
          supportNeeds: ["cultural_healing", "community_building"],
          culturalHealingActivities: [
            "Community events",
            "Lusophone literature",
          ],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 7.2,
        },
      },
      {
        id: "3",
        userId: "user_3",
        name: "Ana",
        age: 26,
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        distance: 1.2,
        lastActive: "30 minutes ago",
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity + 2,
          frequency: "constant",
          triggers: [
            "fado_music",
            "grandmother_recipes",
            "ocean_waves",
            "church_bells",
          ],
          copingMechanisms: [
            "listen_fado",
            "cook_portuguese",
            "call_family",
            "embrace_sadness",
          ],
          homelandConnection: 9,
          languageEmotionalAttachment: 10,
          culturalSupport: "high",
          regionalIdentity: {
            region: "acores_island",
            connection: 10,
            specificAreas: ["São Miguel", "Terceira"],
            traditions: ["Azorean festivals", "Island traditions"],
            culturalMarkers: ["Island identity", "Strong community"],
          },
          heritagePreservation: 9,
          integrationBalance: 2,
          emotionalCompatibilityType: "Alma Saudosa",
          supportNeeds: [
            "understanding_saudade",
            "cultural_healing",
            "share_traditions",
          ],
          culturalHealingActivities: [
            "Fado therapy",
            "Traditional cooking",
            "Island festivals",
          ],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 9.1,
        },
      },
    ];
  };

  const generateRecommendedActivities = (
    user: SaudadeProfile,
    potential: SaudadeProfile,
    lang: string
  ): string[] => {
    const activities: string[] = [];

    // Shared coping mechanisms
    const sharedCoping = user.copingMechanisms.filter((mechanism) =>
      potential.copingMechanisms.includes(mechanism)
    );

    if (sharedCoping.includes("cook_portuguese")) {
      activities.push(
        lang === "pt"
          ? "Cozinhar pratos tradicionais juntos"
          : "Cook traditional dishes together"
      );
    }

    if (sharedCoping.includes("listen_fado")) {
      activities.push(
        lang === "pt"
          ? "Noites de fado íntimas para partilhar saudade"
          : "Intimate fado nights to share saudade"
      );
    }

    if (sharedCoping.includes("portuguese_community")) {
      activities.push(
        lang === "pt"
          ? "Participar em eventos comunitários portugueses"
          : "Attend Portuguese-speaking community events together"
      );
    }

    // High saudade intensity activities
    if (user.saudadeIntensity >= 7 && potential.saudadeIntensity >= 7) {
      activities.push(
        lang === "pt"
          ? "Sessões de apoio emocional e compreensão mútua"
          : "Emotional support sessions and mutual understanding"
      );
    }

    // Regional connections
    if (user.regionalIdentity.region === potential.regionalIdentity.region) {
      activities.push(
        lang === "pt"
          ? "Celebrar tradições regionais específicas"
          : "Celebrate specific regional traditions"
      );
    }

    return activities.slice(0, 4);
  };

  const generateSupportStrengths = (
    user: SaudadeProfile,
    potential: SaudadeProfile,
    lang: string
  ): string[] => {
    const strengths: string[] = [];

    if (user.saudadeIntensity >= 7 && potential.saudadeIntensity >= 7) {
      strengths.push(
        lang === "pt"
          ? "Compreensão profunda da saudade mútua"
          : "Deep mutual understanding of saudade"
      );
    }

    if (
      user.culturalSupport === "high" &&
      potential.culturalSupport === "high"
    ) {
      strengths.push(
        lang === "pt"
          ? "Ambos valorizam apoio cultural emocional"
          : "Both value emotional cultural support"
      );
    }

    if (user.heritagePreservation >= 8 && potential.heritagePreservation >= 8) {
      strengths.push(
        lang === "pt"
          ? "Compromisso partilhado com preservação cultural"
          : "Shared commitment to cultural preservation"
      );
    }

    if (
      user.languageEmotionalAttachment >= 8 &&
      potential.languageEmotionalAttachment >= 8
    ) {
      strengths.push(
        lang === "pt"
          ? "Ligação emocional forte ao português"
          : "Strong emotional connection to Lusophone"
      );
    }

    return strengths;
  };

  const generatePotentialChallenges = (
    user: SaudadeProfile,
    potential: SaudadeProfile,
    lang: string
  ): string[] => {
    const challenges: string[] = [];

    const intensityDiff = Math.abs(
      user.saudadeIntensity - potential.saudadeIntensity
    );
    if (intensityDiff >= 3) {
      challenges.push(
        lang === "pt"
          ? "Diferentes níveis de intensidade de saudade"
          : "Different levels of saudade intensity"
      );
    }

    const integrationDiff = Math.abs(
      user.integrationBalance - potential.integrationBalance
    );
    if (integrationDiff >= 4) {
      challenges.push(
        lang === "pt"
          ? "Abordagens diferentes para integração vs herança"
          : "Different approaches to integration vs heritage"
      );
    }

    if (
      user.culturalSupport === "independent" &&
      potential.culturalSupport === "high"
    ) {
      challenges.push(
        lang === "pt"
          ? "Necessidades diferentes de apoio cultural"
          : "Different cultural support needs"
      );
    }

    if (user.frequency === "constant" && potential.frequency === "rare") {
      challenges.push(
        lang === "pt"
          ? "Frequências muito diferentes de saudade"
          : "Very different saudade frequencies"
      );
    }

    return challenges;
  };

  const getConnectionTypeLabel = (
    type: SaudadeCompatibilityResult["connectionType"]
  ) => {
    const labels = {
      saudade_soulmate:
        language === "pt" ? "Alma Gémea de Saudade" : "Saudade Soulmate",
      cultural_healer:
        language === "pt" ? "Curador Cultural" : "Cultural Healer",
      heritage_guardian:
        language === "pt" ? "Guardião da Herança" : "Heritage Guardian",
      integration_partner:
        language === "pt" ? "Parceiro de Integração" : "Integration Partner",
      gentle_companion:
        language === "pt" ? "Companheiro Gentil" : "Gentle Companion",
    };
    return labels[type];
  };

  const getConnectionTypeIcon = (
    type: SaudadeCompatibilityResult["connectionType"]
  ) => {
    switch (type) {
      case "saudade_soulmate":
        return HeartSolid;
      case "cultural_healer":
        return HandHeartIcon;
      case "heritage_guardian":
        return HomeIcon;
      case "integration_partner":
        return UserGroupIcon;
      default:
        return SparklesIcon;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-blue-600 bg-blue-50";
    if (score >= 55) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-6 h-48"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HeartSolid className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-primary-900">
            {language === "pt"
              ? "Matches Baseados em Saudade"
              : "Saudade-Based Matches"}
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === "pt"
            ? "Encontre conexões emocionais autênticas com pessoas que compreendem a sua saudade e herança cultural"
            : "Find authentic emotional connections with people who understand your saudade and cultural heritage"}
        </p>
      </div>

      {/* Compatible Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {compatibleMatches.map((match) => {
          const IconComponent = getConnectionTypeIcon(
            match.compatibilityResult.connectionType
          );

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={match.photo}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {match.name}
                    </h3>
                    <span className="text-sm text-gray-500">{match.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{match.distance}km away</span>
                    <span>•</span>
                    <span>{match.lastActive}</span>
                  </div>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {language === "pt"
                      ? "Compatibilidade Emocional"
                      : "Emotional Compatibility"}
                  </span>
                  <span
                    className={`text-sm font-bold px-2 py-1 rounded-full ${getCompatibilityColor(
                      match.compatibilityResult.compatibilityScore
                    )}`}
                  >
                    {match.compatibilityResult.compatibilityScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-primary-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${match.compatibilityResult.compatibilityScore}%`,
                    }}
                  />
                </div>
              </div>

              {/* Connection Type */}
              <div className="mb-4">
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-primary-50 rounded-lg">
                  <IconComponent className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {getConnectionTypeLabel(
                      match.compatibilityResult.connectionType
                    )}
                  </span>
                </div>
              </div>

              {/* Compatibility Breakdown */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {match.compatibilityResult.saudadeAlignment}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "pt" ? "Saudade" : "Saudade"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {match.compatibilityResult.emotionalSupport}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "pt" ? "Apoio" : "Support"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {match.compatibilityResult.culturalDepth}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "pt" ? "Cultura" : "Culture"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {match.compatibilityResult.heritageAlignment}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === "pt" ? "Herança" : "Heritage"}
                  </div>
                </div>
              </div>

              {/* Shared Elements */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {language === "pt"
                    ? "Conexões Partilhadas:"
                    : "Shared Connections:"}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {match.saudadeProfile.triggers
                    .slice(0, 3)
                    .map((trigger, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                      >
                        {trigger === "fado_music"
                          ? language === "pt"
                            ? "Fado"
                            : "Fado"
                          : trigger === "family_voices"
                          ? language === "pt"
                            ? "Família"
                            : "Family"
                          : trigger === "cook_portuguese"
                          ? language === "pt"
                            ? "Culinária"
                            : "Cooking"
                          : trigger}
                      </span>
                    ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onStartConversation(match.id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-red-700 hover:to-primary-700 transition-all"
                >
                  {language === "pt"
                    ? "Iniciar Conversa"
                    : "Start Conversation"}
                </button>
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setShowAnalysis(true);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {language === "pt" ? "Análise" : "Analysis"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Analysis Modal */}
      {showAnalysis && selectedMatch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary-900">
                {language === "pt"
                  ? "Análise de Compatibilidade Detalhada"
                  : "Detailed Compatibility Analysis"}
              </h3>
              <button
                onClick={() => setShowAnalysis(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Profile Summary */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-red-50 to-primary-50 rounded-xl">
              <img
                src={selectedMatch.photo}
                alt={selectedMatch.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">
                  {selectedMatch.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {getConnectionTypeLabel(
                    selectedMatch.compatibilityResult.connectionType
                  )}
                </p>
              </div>
            </div>

            {/* Support Strengths */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <StarSolid className="w-5 h-5 text-yellow-500" />
                {language === "pt"
                  ? "Pontos Fortes do Apoio"
                  : "Support Strengths"}
              </h4>
              <div className="space-y-2">
                {selectedMatch.compatibilityResult.supportStrengths.map(
                  (strength, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {strength}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Recommended Activities */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <HeartSolid className="w-5 h-5 text-red-500" />
                {language === "pt"
                  ? "Atividades Recomendadas"
                  : "Recommended Activities"}
              </h4>
              <div className="space-y-2">
                {selectedMatch.compatibilityResult.recommendedActivities.map(
                  (activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      {activity}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Potential Challenges */}
            {selectedMatch.compatibilityResult.potentialChallenges.length >
              0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-orange-500" />
                  {language === "pt"
                    ? "Áreas para Conversação"
                    : "Areas for Discussion"}
                </h4>
                <div className="space-y-2">
                  {selectedMatch.compatibilityResult.potentialChallenges.map(
                    (challenge, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        {challenge}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Action */}
            <button
              onClick={() => {
                setShowAnalysis(false);
                onStartConversation(selectedMatch.id);
              }}
              className="w-full bg-gradient-to-r from-red-600 to-primary-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-primary-700 transition-all"
            >
              {language === "pt"
                ? "Iniciar Conversa com Base na Análise"
                : "Start Conversation Based on Analysis"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
