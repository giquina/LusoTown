"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  SparklesIcon,
  HeartIcon,
  ChartBarIcon,
  StarIcon,
  FireIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CakeIcon,
  MusicalNoteIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import PortugueseCulturalCompatibilityQuiz, { type CompatibilityProfile } from './PortugueseCulturalCompatibilityQuiz';
import CulturalCompatibilityResults from './CulturalCompatibilityResults';

interface CulturalMatch {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  culturalProfile: CompatibilityProfile;
  overallCompatibility: number;
  sharedInterests: string[];
  culturalAlignment: {
    food: number;
    music: number;
    traditions: number;
    family: number;
    language: number;
  };
  profileImage?: string;
  bio: string;
  lastActive: string;
}

interface CulturalCompatibilityIntegrationProps {
  currentUserProfile?: CompatibilityProfile;
  onProfileUpdate: (profile: CompatibilityProfile) => void;
  showQuizPrompt?: boolean;
}

export default function CulturalCompatibilityIntegration({
  currentUserProfile,
  onProfileUpdate,
  showQuizPrompt = false
}: CulturalCompatibilityIntegrationProps) {
  const { language } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizProfile, setQuizProfile] = useState<CompatibilityProfile | null>(null);
  const [culturalMatches, setCulturalMatches] = useState<CulturalMatch[]>([]);
  const [showCompatibilityFilter, setShowCompatibilityFilter] = useState(false);
  const [compatibilityFilters, setCompatibilityFilters] = useState({
    minCompatibility: 70,
    priorityCategories: [] as string[],
    culturalStrength: 'any' as 'any' | 'Very Strong' | 'Strong' | 'Moderate' | 'Developing' | 'Flexible',
  });

  // Mock cultural matches based on user profile
  const generateCulturalMatches = (userProfile: CompatibilityProfile): CulturalMatch[] => {
    const mockMatches: CulturalMatch[] = [
      {
        id: 'cultural-match-1',
        name: 'Sofia Martins',
        age: 29,
        location: 'Stockwell',
        profession: 'Teacher',
        bio: 'Portuguese teacher who loves sharing our culture with the next generation. Passionate about fado and traditional cooking.',
        lastActive: '2 hours ago',
        culturalProfile: {
          food: 9.2,
          music: 8.8,
          traditions: 9.5,
          family: 8.9,
          language: 9.8,
          integration: 6.5,
          community: 9.1,
          values: 8.7,
          holidays: 9.0,
          regional: 8.3,
          overallScore: 8.8,
          culturalStrength: 'Very Strong',
          profileType: 'Tradition Guardian',
          recommendations: [],
        },
        overallCompatibility: 94,
        sharedInterests: ['Portuguese Language', 'Fado Music', 'Traditional Cooking', 'Family Values'],
        culturalAlignment: {
          food: 92,
          music: 89,
          traditions: 96,
          family: 91,
          language: 98,
        },
      },
      {
        id: 'cultural-match-2',
        name: 'Miguel Santos',
        age: 32,
        location: 'Vauxhall',
        profession: 'Software Engineer',
        bio: 'Tech professional from Lisbon. Love mixing Portuguese traditions with modern London life. Benfica supporter!',
        lastActive: '1 day ago',
        culturalProfile: {
          food: 7.5,
          music: 6.8,
          traditions: 7.2,
          family: 8.1,
          language: 8.5,
          integration: 8.9,
          community: 7.8,
          values: 7.6,
          holidays: 7.0,
          regional: 8.0,
          overallScore: 7.7,
          culturalStrength: 'Strong',
          profileType: 'Cultural Bridge',
          recommendations: [],
        },
        overallCompatibility: 87,
        sharedInterests: ['Professional Networking', 'Portuguese Football', 'Technology', 'Cultural Events'],
        culturalAlignment: {
          food: 78,
          music: 72,
          traditions: 81,
          family: 85,
          language: 89,
        },
      },
      {
        id: 'cultural-match-3',
        name: 'Beatriz Oliveira',
        age: 26,
        location: 'Camden',
        profession: 'Medical Student',
        bio: 'Medical student from Braga exploring Portuguese culture in London. Love trying new things while staying connected to my roots.',
        lastActive: '3 hours ago',
        culturalProfile: {
          food: 6.8,
          music: 7.9,
          traditions: 6.5,
          family: 8.3,
          language: 7.2,
          integration: 8.7,
          community: 7.1,
          values: 7.8,
          holidays: 6.9,
          regional: 7.5,
          overallScore: 7.4,
          culturalStrength: 'Strong',
          profileType: 'Cultural Explorer',
          recommendations: [],
        },
        overallCompatibility: 82,
        sharedInterests: ['Education', 'Young Professionals', 'Cultural Events', 'Healthcare'],
        culturalAlignment: {
          food: 73,
          music: 84,
          traditions: 75,
          family: 88,
          language: 79,
        },
      },
      {
        id: 'cultural-match-4',
        name: 'Ricardo Costa',
        age: 34,
        location: 'Elephant & Castle',
        profession: 'Chef',
        bio: 'Chef specializing in Portuguese cuisine. Always experimenting with traditional recipes and sharing food stories.',
        lastActive: '5 hours ago',
        culturalProfile: {
          food: 9.8,
          music: 7.3,
          traditions: 8.1,
          family: 8.6,
          language: 8.2,
          integration: 7.5,
          community: 8.9,
          values: 8.0,
          holidays: 8.4,
          regional: 8.7,
          overallScore: 8.4,
          culturalStrength: 'Very Strong',
          profileType: 'Culture Enthusiast',
          recommendations: [],
        },
        overallCompatibility: 91,
        sharedInterests: ['Portuguese Cuisine', 'Business Networking', 'Cultural Events', 'Cooking'],
        culturalAlignment: {
          food: 98,
          music: 76,
          traditions: 84,
          family: 89,
          language: 87,
        },
      },
      {
        id: 'cultural-match-5',
        name: 'Carolina Lima',
        age: 28,
        location: 'Kensington',
        profession: 'Financial Analyst',
        bio: 'Brazilian analyst who loves connecting with all Portuguese speakers. Samba dancer and capoeira enthusiast.',
        lastActive: '1 hour ago',
        culturalProfile: {
          food: 8.1,
          music: 9.2,
          traditions: 7.8,
          family: 9.1,
          language: 8.8,
          integration: 8.2,
          community: 8.5,
          values: 8.4,
          holidays: 8.7,
          regional: 7.9,
          overallScore: 8.5,
          culturalStrength: 'Very Strong',
          profileType: 'Culture Enthusiast',
          recommendations: [],
        },
        overallCompatibility: 89,
        sharedInterests: ['Brazilian Culture', 'Dance', 'Professional Networking', 'Language Exchange'],
        culturalAlignment: {
          food: 85,
          music: 94,
          traditions: 83,
          family: 92,
          language: 91,
        },
      },
    ];

    // Calculate compatibility based on user profile
    if (userProfile) {
      return mockMatches.map(match => ({
        ...match,
        overallCompatibility: calculateCompatibilityScore(userProfile, match.culturalProfile),
      })).sort((a, b) => b.overallCompatibility - a.overallCompatibility);
    }

    return mockMatches;
  };

  const calculateCompatibilityScore = (profile1: CompatibilityProfile, profile2: CompatibilityProfile): number => {
    const categories = ['food', 'music', 'traditions', 'family', 'language', 'integration', 'community', 'values'];
    const weights = {
      food: 1.5,
      music: 1.5,
      traditions: 2.0,
      family: 2.0,
      language: 1.8,
      integration: 1.2,
      community: 1.3,
      values: 1.7,
    };

    let totalScore = 0;
    let totalWeight = 0;

    categories.forEach(category => {
      const score1 = profile1[category as keyof CompatibilityProfile] as number;
      const score2 = profile2[category as keyof CompatibilityProfile] as number;
      const weight = weights[category as keyof typeof weights];
      
      // Calculate compatibility score (closer values = higher compatibility)
      const difference = Math.abs(score1 - score2);
      const categoryCompatibility = Math.max(0, 10 - difference);
      
      totalScore += categoryCompatibility * weight;
      totalWeight += weight;
    });

    return Math.min(100, Math.round((totalScore / totalWeight) * 10));
  };

  useEffect(() => {
    if (currentUserProfile) {
      setCulturalMatches(generateCulturalMatches(currentUserProfile));
    }
  }, [currentUserProfile]);

  const handleQuizComplete = (profile: CompatibilityProfile) => {
    setQuizProfile(profile);
    setShowQuiz(false);
    setShowResults(true);
    onProfileUpdate(profile);
  };

  const handleViewMatches = () => {
    setShowResults(false);
    // This would typically navigate to the matches page with cultural filtering
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 90) return { icon: FireIcon, color: 'text-coral-500', bg: 'bg-red-100' };
    if (score >= 80) return { icon: HeartIcon, color: 'text-pink-500', bg: 'bg-pink-100' };
    if (score >= 70) return { icon: StarIcon, color: 'text-accent-500', bg: 'bg-yellow-100' };
    return { icon: SparklesIcon, color: 'text-primary-500', bg: 'bg-blue-100' };
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      food: CakeIcon,
      music: MusicalNoteIcon,
      traditions: SparklesIcon,
      family: HomeIcon,
      language: AcademicCapIcon,
    };
    return icons[category as keyof typeof icons] || CheckCircleIcon;
  };

  const filteredMatches = culturalMatches.filter(match => {
    if (match.overallCompatibility < compatibilityFilters.minCompatibility) return false;
    if (compatibilityFilters.culturalStrength !== 'any' && 
        match.culturalProfile.culturalStrength !== compatibilityFilters.culturalStrength) return false;
    return true;
  });

  if (!currentUserProfile && showQuizPrompt) {
    return (
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200 p-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-900 mb-3">
            {language === 'pt' 
              ? 'Descubra Sua Compatibilidade Cultural Portuguesa'
              : 'Discover Your Portuguese Cultural Compatibility'}
          </h3>
          <p className="text-primary-700 mb-6 max-w-md mx-auto">
            {language === 'pt'
              ? 'Complete nosso quiz cultural para encontrar pessoas que realmente compartilham seus valores e tradições portuguesas.'
              : 'Complete our cultural quiz to find people who truly share your Portuguese values and traditions.'}
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all inline-flex items-center gap-2"
          >
            <ChartBarIcon className="w-5 h-5" />
            {language === 'pt' ? 'Iniciar Quiz Cultural' : 'Start Cultural Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cultural Profile Summary */}
      {currentUserProfile && (
        <div className="bg-white rounded-2xl border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {language === 'pt' ? 'Seu Perfil Cultural' : 'Your Cultural Profile'}
                </h3>
                <p className="text-sm text-secondary-600">{currentUserProfile.profileType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">
                  {Math.round(currentUserProfile.overallScore * 10)}%
                </div>
                <div className="text-xs text-gray-500">
                  {currentUserProfile.culturalStrength}
                </div>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="p-2 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
                title={language === 'pt' ? 'Refazer quiz' : 'Retake quiz'}
              >
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-secondary-600" />
              </button>
            </div>
          </div>

          {/* Top Cultural Categories */}
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(currentUserProfile)
              .filter(([key, value]) => typeof value === 'number' && key !== 'overallScore')
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .slice(0, 5)
              .map(([category, score], index) => {
                const IconComponent = getCategoryIcon(category);
                return (
                  <div key={category} className="text-center p-3 bg-secondary-50 rounded-lg">
                    <IconComponent className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-secondary-700 mb-1">
                      {category === 'food' ? (language === 'pt' ? 'Culinária' : 'Food') :
                       category === 'music' ? (language === 'pt' ? 'Música' : 'Music') :
                       category === 'traditions' ? (language === 'pt' ? 'Tradições' : 'Traditions') :
                       category === 'family' ? (language === 'pt' ? 'Família' : 'Family') :
                       category === 'language' ? (language === 'pt' ? 'Idioma' : 'Language') :
                       category}
                    </div>
                    <div className="text-xs font-bold text-primary-600">
                      {(score as number).toFixed(1)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Compatibility Filters */}
      {currentUserProfile && (
        <div className="bg-white rounded-2xl border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary-600" />
              {language === 'pt' ? 'Filtros de Compatibilidade' : 'Compatibility Filters'}
            </h3>
            <button
              onClick={() => setShowCompatibilityFilter(!showCompatibilityFilter)}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              {showCompatibilityFilter 
                ? (language === 'pt' ? 'Esconder' : 'Hide')
                : (language === 'pt' ? 'Mostrar' : 'Show')}
            </button>
          </div>

          <AnimatePresence>
            {showCompatibilityFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Compatibilidade Mínima' : 'Minimum Compatibility'}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={compatibilityFilters.minCompatibility}
                    onChange={(e) => setCompatibilityFilters(prev => ({
                      ...prev,
                      minCompatibility: Number(e.target.value)
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span className="font-bold text-primary-600">
                      {compatibilityFilters.minCompatibility}%
                    </span>
                    <span>95%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {language === 'pt' ? 'Força Cultural' : 'Cultural Strength'}
                  </label>
                  <select
                    value={compatibilityFilters.culturalStrength}
                    onChange={(e) => setCompatibilityFilters(prev => ({
                      ...prev,
                      culturalStrength: e.target.value as any
                    }))}
                    className="w-full p-2 border border-secondary-300 rounded-lg"
                  >
                    <option value="any">{language === 'pt' ? 'Qualquer' : 'Any'}</option>
                    <option value="Very Strong">{language === 'pt' ? 'Muito Forte' : 'Very Strong'}</option>
                    <option value="Strong">{language === 'pt' ? 'Forte' : 'Strong'}</option>
                    <option value="Moderate">{language === 'pt' ? 'Moderado' : 'Moderate'}</option>
                    <option value="Developing">{language === 'pt' ? 'Em Desenvolvimento' : 'Developing'}</option>
                    <option value="Flexible">{language === 'pt' ? 'Flexível' : 'Flexible'}</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Cultural Matches */}
      {currentUserProfile && filteredMatches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-primary-600" />
              {language === 'pt' ? 'Matches Culturalmente Compatíveis' : 'Culturally Compatible Matches'}
            </h3>
            <span className="text-sm text-secondary-600">
              {filteredMatches.length} {language === 'pt' ? 'encontrados' : 'found'}
            </span>
          </div>

          <div className="grid gap-4">
            {filteredMatches.map((match) => {
              const compatibilityStyle = getCompatibilityIcon(match.overallCompatibility);
              const IconComponent = compatibilityStyle.icon;

              return (
                <div key={match.id} className="bg-white rounded-2xl border border-secondary-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Profile Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-2xl">
                      👤
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{match.name}, {match.age}</h4>
                          <p className="text-sm text-secondary-600">{match.profession} • {match.location}</p>
                          <p className="text-xs text-gray-500">{match.lastActive}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${compatibilityStyle.bg}`}>
                          <IconComponent className={`w-4 h-4 ${compatibilityStyle.color}`} />
                          <span className={`font-bold text-sm ${compatibilityStyle.color}`}>
                            {match.overallCompatibility}%
                          </span>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-secondary-700 mb-4">{match.bio}</p>

                      {/* Cultural Alignment */}
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {Object.entries(match.culturalAlignment).map(([category, score]) => {
                          const IconComponent = getCategoryIcon(category);
                          return (
                            <div key={category} className="text-center p-2 bg-secondary-50 rounded-lg">
                              <IconComponent className="w-4 h-4 text-primary-600 mx-auto mb-1" />
                              <div className="text-xs font-bold text-secondary-700">{score}%</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Shared Interests */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {match.sharedInterests.slice(0, 3).map((interest, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-800 px-2 py-1 rounded-lg text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                        {match.sharedInterests.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{match.sharedInterests.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Profile Type */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-secondary-700">
                          {match.culturalProfile.profileType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {match.culturalProfile.culturalStrength}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <PortugueseCulturalCompatibilityQuiz
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
            currentUserId="demo-user"
          />
        )}
      </AnimatePresence>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && quizProfile && (
          <CulturalCompatibilityResults
            profile={quizProfile}
            onViewMatches={handleViewMatches}
            onRetakeQuiz={() => {
              setShowResults(false);
              setShowQuiz(true);
            }}
            onClose={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}