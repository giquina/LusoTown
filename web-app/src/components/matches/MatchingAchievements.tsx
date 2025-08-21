"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  CalendarDaysIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import {
  TrophyIcon as TrophySolid,
  StarIcon as StarSolid,
  HeartIcon as HeartSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";

interface Achievement {
  id: string;
  type: 'first_match' | 'mutual_match' | 'event_attendee' | 'cultural_explorer' | 
        'fado_lover' | 'food_enthusiast' | 'football_fan' | 'networking_pro' |
        'community_builder' | 'cultural_ambassador' | 'buddy_matcher' | 'conversation_starter';
  name: string;
  description: string;
  category: 'matching' | 'cultural' | 'social' | 'events' | 'community';
  level: number;
  maxLevel: number;
  currentProgress: number;
  requiredProgress: number;
  badgeIcon: string;
  badgeColor: string;
  pointsAwarded: number;
  unlockedAt?: string;
  isUnlocked: boolean;
  isFeatured: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  culturalAuthenticity: number;
  rewards?: {
    discountPercent?: number;
    priorityMatching?: boolean;
    specialBadge?: string;
    exclusiveEvents?: boolean;
  };
}

interface MatchingAchievementsProps {
  userId?: string;
  showProgressBar?: boolean;
  showRewards?: boolean;
  onAchievementClick?: (achievement: Achievement) => void;
}

export default function MatchingAchievements({
  userId,
  showProgressBar = true,
  showRewards = true,
  onAchievementClick,
}: MatchingAchievementsProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: language === "pt" ? "Todas" : "All", icon: SparklesIcon },
    { id: 'matching', name: language === "pt" ? "Matches" : "Matching", icon: HeartIcon },
    { id: 'cultural', name: language === "pt" ? "Cultural" : "Cultural", icon: MusicalNoteIcon },
    { id: 'events', name: language === "pt" ? "Eventos" : "Events", icon: CalendarDaysIcon },
    { id: 'community', name: language === "pt" ? "Comunidade" : "Community", icon: UserGroupIcon },
  ];

  // Mock achievements data
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: "1",
        type: "first_match",
        name: language === "pt" ? "Primeiro Match" : "First Match",
        description: language === "pt" 
          ? "Fez a sua primeira ligação na comunidade portuguesa!"
          : "Made your first connection in the Portuguese community!",
        category: "matching",
        level: 1,
        maxLevel: 1,
        currentProgress: 1,
        requiredProgress: 1,
        badgeIcon: "🇵🇹",
        badgeColor: "from-green-500 to-green-600",
        pointsAwarded: 10,
        unlockedAt: "2025-08-15",
        isUnlocked: true,
        isFeatured: true,
        rarity: "common",
        culturalAuthenticity: 100,
      },
      {
        id: "2",
        type: "fado_lover",
        name: language === "pt" ? "Amante de Fado" : "Fado Lover",
        description: language === "pt"
          ? "Participou em 3 eventos de Fado - aprecia verdadeiramente o património musical português"
          : "Attended 3 Fado events - truly appreciates Portuguese musical heritage",
        category: "cultural",
        level: 2,
        maxLevel: 5,
        currentProgress: 3,
        requiredProgress: 3,
        badgeIcon: "🎵",
        badgeColor: "from-purple-500 to-purple-600",
        pointsAwarded: 25,
        unlockedAt: "2025-08-18",
        isUnlocked: true,
        isFeatured: false,
        rarity: "rare",
        culturalAuthenticity: 95,
        rewards: {
          discountPercent: 10,
          specialBadge: "🎼",
        },
      },
      {
        id: "3",
        type: "food_enthusiast",
        name: language === "pt" ? "Entusiasta Gastronómico" : "Food Enthusiast",
        description: language === "pt"
          ? "Participou em 5 eventos gastronómicos portugueses - um verdadeiro apreciador da nossa culinária!"
          : "Joined 5 Portuguese food events - a true lover of our cuisine!",
        category: "cultural",
        level: 3,
        maxLevel: 5,
        currentProgress: 5,
        requiredProgress: 5,
        badgeIcon: "🥮",
        badgeColor: "from-orange-500 to-red-500",
        pointsAwarded: 30,
        unlockedAt: "2025-08-19",
        isUnlocked: true,
        isFeatured: true,
        rarity: "epic",
        culturalAuthenticity: 100,
        rewards: {
          discountPercent: 15,
          exclusiveEvents: true,
          specialBadge: "👨‍🍳",
        },
      },
      {
        id: "4",
        type: "community_builder",
        name: language === "pt" ? "Construtor de Comunidade" : "Community Builder",
        description: language === "pt"
          ? "Apresentou 10 pessoas da comunidade portuguesa umas às outras"
          : "Introduced 10 Portuguese community members to each other",
        category: "community",
        level: 1,
        maxLevel: 3,
        currentProgress: 7,
        requiredProgress: 10,
        badgeIcon: "🤝",
        badgeColor: "from-blue-500 to-cyan-500",
        pointsAwarded: 50,
        isUnlocked: false,
        isFeatured: true,
        rarity: "legendary",
        culturalAuthenticity: 90,
        rewards: {
          priorityMatching: true,
          discountPercent: 20,
          specialBadge: "👑",
        },
      },
      {
        id: "5",
        type: "football_fan",
        name: language === "pt" ? "Adepto de Futebol" : "Football Fan",
        description: language === "pt"
          ? "Assistiu a 5 jogos de Portugal com a comunidade"
          : "Watched 5 Portugal matches with the community",
        category: "cultural",
        level: 2,
        maxLevel: 4,
        currentProgress: 5,
        requiredProgress: 5,
        badgeIcon: "⚽",
        badgeColor: "from-green-600 to-red-600",
        pointsAwarded: 20,
        unlockedAt: "2025-08-20",
        isUnlocked: true,
        isFeatured: false,
        rarity: "rare",
        culturalAuthenticity: 85,
        rewards: {
          discountPercent: 10,
        },
      },
      {
        id: "6",
        type: "cultural_ambassador",
        name: language === "pt" ? "Embaixador Cultural" : "Cultural Ambassador",
        description: language === "pt"
          ? "Organizou eventos culturais e promoveu a herança portuguesa em Londres"
          : "Organized cultural events and promoted Portuguese heritage in London",
        category: "community",
        level: 1,
        maxLevel: 1,
        currentProgress: 0,
        requiredProgress: 1,
        badgeIcon: "👑",
        badgeColor: "from-yellow-500 to-amber-600",
        pointsAwarded: 100,
        isUnlocked: false,
        isFeatured: true,
        rarity: "legendary",
        culturalAuthenticity: 100,
        rewards: {
          priorityMatching: true,
          discountPercent: 25,
          exclusiveEvents: true,
          specialBadge: "🏆",
        },
      },
    ];

    setTimeout(() => {
      setAchievements(mockAchievements);
      setTotalPoints(mockAchievements.reduce((sum, ach) => 
        ach.isUnlocked ? sum + ach.pointsAwarded : sum, 0
      ));
      setUserLevel(Math.floor(mockAchievements.filter(a => a.isUnlocked).length / 2) + 1);
      setLoading(false);
    }, 800);
  }, [language]);

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const unlockedMatch = !showUnlockedOnly || achievement.isUnlocked;
    return categoryMatch && unlockedMatch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-500';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-500 to-purple-700';
      case 'legendary':
        return 'from-yellow-400 to-orange-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return language === "pt" ? "Comum" : "Common";
      case 'rare':
        return language === "pt" ? "Raro" : "Rare";
      case 'epic':
        return language === "pt" ? "Épico" : "Epic";
      case 'legendary':
        return language === "pt" ? "Lendário" : "Legendary";
      default:
        return language === "pt" ? "Comum" : "Common";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
            <TrophySolid className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">
            {language === "pt" ? "Conquistas Culturais" : "Cultural Achievements"}
          </h3>
        </div>

        {/* User Progress Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-900">{totalPoints}</div>
              <div className="text-xs text-primary-600">
                {language === "pt" ? "Pontos Totais" : "Total Points"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-900">{userLevel}</div>
              <div className="text-xs text-primary-600">
                {language === "pt" ? "Nível" : "Level"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-900">
                {achievements.filter(a => a.isUnlocked).length}
              </div>
              <div className="text-xs text-primary-600">
                {language === "pt" ? "Desbloqueadas" : "Unlocked"}
              </div>
            </div>
          </div>

          {showProgressBar && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-800">
                  {language === "pt" ? "Progresso do Nível" : "Level Progress"}
                </span>
                <span className="text-sm text-primary-600">
                  {userLevel * 2 - 1}/{userLevel * 2} {language === "pt" ? "conquistas" : "achievements"}
                </span>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(((achievements.filter(a => a.isUnlocked).length % (userLevel * 2)) / (userLevel * 2)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Toggle Controls */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary-800">
            {filteredAchievements.length} {language === "pt" ? "conquistas" : "achievements"}
          </span>
          <button
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className={`text-sm px-3 py-1 rounded-lg transition-colors ${
              showUnlockedOnly
                ? "bg-green-100 text-green-700"
                : "bg-primary-100 text-primary-700 hover:bg-primary-200"
            }`}
          >
            {showUnlockedOnly 
              ? (language === "pt" ? "Mostrar Todas" : "Show All")
              : (language === "pt" ? "Só Desbloqueadas" : "Unlocked Only")
            }
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onAchievementClick?.(achievement)}
              className={`relative border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                achievement.isUnlocked
                  ? "border-primary-200 hover:border-primary-300 hover:shadow-lg bg-white"
                  : "border-gray-200 bg-gray-50 opacity-75"
              }`}
            >
              {/* Achievement Header */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    achievement.isUnlocked ? achievement.badgeColor : 'from-gray-300 to-gray-400'
                  } rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {achievement.isUnlocked ? achievement.badgeIcon : "🔒"}
                  </div>
                  
                  {/* Rarity Border */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-xl opacity-20 -z-10`}></div>
                  
                  {/* Featured Badge */}
                  {achievement.isFeatured && achievement.isUnlocked && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center">
                      <StarSolid className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-bold text-base leading-tight ${
                        achievement.isUnlocked ? 'text-primary-900' : 'text-secondary-600'
                      }`}>
                        {achievement.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          achievement.isUnlocked 
                            ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`
                            : 'bg-secondary-200 text-secondary-600'
                        }`}>
                          {getRarityText(achievement.rarity)}
                        </span>
                        {achievement.isUnlocked && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            +{achievement.pointsAwarded} pts
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!achievement.isUnlocked && (
                      <LockClosedIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>

                  <p className={`text-sm leading-relaxed mb-3 ${
                    achievement.isUnlocked ? 'text-primary-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>

                  {/* Progress Bar */}
                  {!achievement.isUnlocked && showProgressBar && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-secondary-600">
                          {language === "pt" ? "Progresso" : "Progress"}
                        </span>
                        <span className="text-xs text-secondary-600">
                          {achievement.currentProgress}/{achievement.requiredProgress}
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(achievement.currentProgress / achievement.requiredProgress) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Level Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: achievement.maxLevel }).map((_, i) => (
                        <StarSolid
                          key={i}
                          className={`w-3 h-3 ${
                            i < achievement.level && achievement.isUnlocked
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className={`text-xs ml-1 ${
                        achievement.isUnlocked ? 'text-primary-600' : 'text-gray-500'
                      }`}>
                        {language === "pt" ? "Nível" : "Level"} {achievement.level}
                      </span>
                    </div>

                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <span className="text-xs text-primary-500">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Rewards Preview */}
                  {achievement.rewards && showRewards && achievement.isUnlocked && (
                    <div className="mt-3 pt-3 border-t border-primary-100">
                      <div className="flex flex-wrap gap-1">
                        {achievement.rewards.discountPercent && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {achievement.rewards.discountPercent}% {language === "pt" ? "desconto" : "discount"}
                          </span>
                        )}
                        {achievement.rewards.priorityMatching && (
                          <span className="text-xs bg-blue-100 text-primary-700 px-2 py-1 rounded">
                            {language === "pt" ? "Prioridade" : "Priority"}
                          </span>
                        )}
                        {achievement.rewards.exclusiveEvents && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {language === "pt" ? "Eventos VIP" : "VIP Events"}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrophyIcon className="w-8 h-8 text-primary-600" />
          </div>
          <h4 className="font-semibold text-primary-900 mb-2">
            {language === "pt" 
              ? "Nenhuma conquista encontrada" 
              : "No achievements found"}
          </h4>
          <p className="text-primary-600 text-sm">
            {language === "pt"
              ? "Participe em eventos e faça matches para desbloquear conquistas!"
              : "Participate in events and make matches to unlock achievements!"}
          </p>
        </div>
      )}

      {/* Premium Upgrade Prompt */}
      {!hasActiveSubscription && achievements.some(a => a.isUnlocked) && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <GiftIcon className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-purple-900 mb-1">
                {language === "pt" 
                  ? "Desbloqueie mais conquistas!" 
                  : "Unlock more achievements!"}
              </h5>
              <p className="text-purple-700 text-sm">
                {language === "pt"
                  ? "Membros Premium têm acesso a conquistas exclusivas e recompensas especiais."
                  : "Premium members get access to exclusive achievements and special rewards."}
              </p>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}