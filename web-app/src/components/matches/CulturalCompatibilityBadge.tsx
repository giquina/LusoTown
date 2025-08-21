"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  StarIcon,
  SparklesIcon,
  FireIcon,
  CakeIcon,
  MusicalNoteIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface CulturalCompatibilityBadgeProps {
  overallScore: number;
  categoryScores?: {
    food?: number;
    music?: number;
    traditions?: number;
    family?: number;
    language?: number;
  };
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  animated?: boolean;
  culturalStrength?: string;
  onClick?: () => void;
}

export default function CulturalCompatibilityBadge({
  overallScore,
  categoryScores,
  size = 'medium',
  showDetails = false,
  animated = true,
  culturalStrength,
  onClick
}: CulturalCompatibilityBadgeProps) {
  const { language } = useLanguage();

  const getCompatibilityLevel = (score: number) => {
    if (score >= 90) return {
      level: 'exceptional',
      icon: FireIcon,
      solidIcon: FireIcon,
      color: 'text-coral-600',
      bg: 'bg-red-100',
      border: 'border-red-300',
      gradient: 'from-red-500 to-orange-500',
      labelEn: 'Exceptional Match',
      labelPt: 'Match Excepcional',
      emoji: '🔥'
    };
    if (score >= 85) return {
      level: 'excellent',
      icon: HeartIcon,
      solidIcon: HeartIconSolid,
      color: 'text-pink-600',
      bg: 'bg-pink-100',
      border: 'border-pink-300',
      gradient: 'from-pink-500 to-red-500',
      labelEn: 'Excellent Match',
      labelPt: 'Match Excelente',
      emoji: '💖'
    };
    if (score >= 80) return {
      level: 'very-good',
      icon: StarIcon,
      solidIcon: StarIconSolid,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      gradient: 'from-yellow-500 to-orange-500',
      labelEn: 'Very Good Match',
      labelPt: 'Muito Boa Compatibilidade',
      emoji: '⭐'
    };
    if (score >= 70) return {
      level: 'good',
      icon: SparklesIcon,
      solidIcon: SparklesIcon,
      color: 'text-primary-600',
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      gradient: 'from-blue-500 to-purple-500',
      labelEn: 'Good Match',
      labelPt: 'Boa Compatibilidade',
      emoji: '✨'
    };
    return {
      level: 'moderate',
      icon: SparklesIcon,
      solidIcon: SparklesIcon,
      color: 'text-secondary-600',
      bg: 'bg-secondary-100',
      border: 'border-secondary-300',
      gradient: 'from-gray-500 to-gray-600',
      labelEn: 'Potential Match',
      labelPt: 'Match Potencial',
      emoji: '🤝'
    };
  };

  const compatibility = getCompatibilityLevel(overallScore);
  const IconComponent = compatibility.icon;
  const SolidIconComponent = compatibility.solidIcon;

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'px-2 py-1',
          icon: 'w-3 h-3',
          text: 'text-xs',
          score: 'text-xs',
        };
      case 'large':
        return {
          container: 'px-4 py-3',
          icon: 'w-6 h-6',
          text: 'text-sm',
          score: 'text-lg',
        };
      default: // medium
        return {
          container: 'px-3 py-2',
          icon: 'w-4 h-4',
          text: 'text-xs',
          score: 'text-sm',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const getCategoryIcon = (category: string) => {
    const icons = {
      food: CakeIcon,
      music: MusicalNoteIcon,
      traditions: SparklesIcon,
      family: HomeIcon,
      language: AcademicCapIcon,
    };
    return icons[category as keyof typeof icons] || SparklesIcon;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      food: language === 'pt' ? 'Culinária' : 'Food',
      music: language === 'pt' ? 'Música' : 'Music',
      traditions: language === 'pt' ? 'Tradições' : 'Traditions',
      family: language === 'pt' ? 'Família' : 'Family',
      language: language === 'pt' ? 'Idioma' : 'Language',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const badgeContent = (
    <div className={`
      inline-flex items-center gap-2 rounded-full border-2 transition-all duration-200
      ${compatibility.bg} ${compatibility.border} ${compatibility.color} ${sizeClasses.container}
      ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-md' : ''}
      ${animated ? 'animate-pulse' : ''}
    `}>
      <div className="flex items-center gap-1.5">
        {size === 'large' ? (
          <SolidIconComponent className={`${sizeClasses.icon} ${compatibility.color}`} />
        ) : (
          <IconComponent className={`${sizeClasses.icon} ${compatibility.color}`} />
        )}
        <span className={`font-bold ${sizeClasses.score}`}>
          {overallScore}%
        </span>
      </div>
      
      {size === 'large' && (
        <span className={`font-medium ${sizeClasses.text}`}>
          {language === 'pt' ? compatibility.labelPt : compatibility.labelEn}
        </span>
      )}
    </div>
  );

  if (showDetails && categoryScores && size !== 'small') {
    return (
      <div className="space-y-2">
        {/* Main Badge */}
        {animated ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onClick}
          >
            {badgeContent}
          </motion.div>
        ) : (
          <div onClick={onClick}>{badgeContent}</div>
        )}

        {/* Detailed Category Breakdown */}
        <div className="flex flex-wrap gap-1">
          {Object.entries(categoryScores).map(([category, score]) => {
            if (!score) return null;
            const CategoryIcon = getCategoryIcon(category);
            const categoryLevel = getCompatibilityLevel(score);
            
            return (
              <div
                key={category}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs
                  ${categoryLevel.bg} ${categoryLevel.color} border ${categoryLevel.border}
                `}
                title={`${getCategoryLabel(category)}: ${score}%`}
              >
                <CategoryIcon className="w-3 h-3" />
                <span className="font-medium">{score}%</span>
              </div>
            );
          })}
        </div>

        {culturalStrength && (
          <div className="text-xs text-secondary-600 font-medium">
            {language === 'pt' ? 'Força Cultural:' : 'Cultural Strength:'} {culturalStrength}
          </div>
        )}
      </div>
    );
  }

  // Simple badge without details
  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={onClick ? { scale: 1.05 } : {}}
        onClick={onClick}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return <div onClick={onClick}>{badgeContent}</div>;
}

// Cultural Compatibility Mini Widget
export function CulturalCompatibilityMiniWidget({
  overallScore,
  topCategories,
  onClick
}: {
  overallScore: number;
  topCategories?: { category: string; score: number }[];
  onClick?: () => void;
}) {
  const { language } = useLanguage();
  const compatibility = React.useMemo(() => {
    if (overallScore >= 90) return { emoji: '🔥', label: language === 'pt' ? 'Excepcional' : 'Exceptional' };
    if (overallScore >= 85) return { emoji: '💖', label: language === 'pt' ? 'Excelente' : 'Excellent' };
    if (overallScore >= 80) return { emoji: '⭐', label: language === 'pt' ? 'Muito Bom' : 'Very Good' };
    if (overallScore >= 70) return { emoji: '✨', label: language === 'pt' ? 'Bom' : 'Good' };
    return { emoji: '🤝', label: language === 'pt' ? 'Potencial' : 'Potential' };
  }, [overallScore, language]);

  return (
    <motion.div
      className={`
        bg-white rounded-xl border border-gray-200 p-3 shadow-sm
        ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''}
      `}
      whileHover={onClick ? { y: -2 } : {}}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-secondary-600">
          {language === 'pt' ? 'Compatibilidade Cultural' : 'Cultural Compatibility'}
        </span>
        <span className="text-lg">{compatibility.emoji}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary-600">{overallScore}%</span>
        <span className="text-xs text-gray-500">{compatibility.label}</span>
      </div>

      {topCategories && topCategories.length > 0 && (
        <div className="mt-2 flex gap-1">
          {topCategories.slice(0, 3).map(({ category, score }) => {
            const CategoryIcon = getCategoryIcon(category);
            return (
              <div
                key={category}
                className="flex items-center gap-1 bg-primary-50 px-2 py-1 rounded text-xs"
                title={`${getCategoryLabel(category)}: ${score}%`}
              >
                <CategoryIcon className="w-3 h-3 text-primary-600" />
                <span className="text-primary-700 font-medium">{score}%</span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

function getCategoryIcon(category: string) {
  const icons = {
    food: CakeIcon,
    music: MusicalNoteIcon,
    traditions: SparklesIcon,
    family: HomeIcon,
    language: AcademicCapIcon,
  };
  return icons[category as keyof typeof icons] || SparklesIcon;
}

function getCategoryLabel(category: string) {
  // This would need access to useLanguage, but for the utility function we'll keep it simple
  const labels = {
    food: 'Food',
    music: 'Music',
    traditions: 'Traditions',
    family: 'Family',
    language: 'Language',
  };
  return labels[category as keyof typeof labels] || category;
}