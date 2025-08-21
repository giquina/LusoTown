"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BoltIcon,
  PlusIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';

// Import our new saudade components
import SaudadeMatchingSystem from './SaudadeMatchingSystem';
import SaudadeCompatibilityEngine from './SaudadeCompatibilityEngine';
import SaudadeMatchCard from './SaudadeMatchCard';
import CulturalHealingRecommendations from './CulturalHealingRecommendations';
import type { SaudadeProfile, CulturalDepthProfile } from './SaudadeMatchingSystem';

interface SaudadeMatchingIntegrationProps {
  userId: string;
  existingProfile?: any;
  onProfileUpdate: (profile: CulturalDepthProfile) => void;
  onMatchInteraction: (matchId: string, action: 'like' | 'pass' | 'message') => void;
}

export default function SaudadeMatchingIntegration({
  userId,
  existingProfile,
  onProfileUpdate,
  onMatchInteraction,
}: SaudadeMatchingIntegrationProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [userCulturalProfile, setUserCulturalProfile] = useState<CulturalDepthProfile | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [showHealing, setShowHealing] = useState(false);
  const [currentSaudadeLevel, setCurrentSaudadeLevel] = useState(5);
  const [isInitialized, setIsInitialized] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState<'intro' | 'assessment' | 'results'>('intro');

  useEffect(() => {
    // Check if user has existing saudade profile
    const checkExistingProfile = async () => {
      try {
        // In real app, this would fetch from Supabase
        const existingSaudadeProfile = localStorage.getItem(`saudade-profile-${userId}`);
        
        if (existingSaudadeProfile) {
          const profile = JSON.parse(existingSaudadeProfile);
          setUserCulturalProfile(profile);
          setCurrentSaudadeLevel(profile.saudadeProfile.saudadeIntensity);
          setIsInitialized(true);
          setShowMatches(true);
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error loading saudade profile:', error);
        setIsInitialized(true);
      }
    };

    checkExistingProfile();
  }, [userId]);

  const handleProfileComplete = (profile: CulturalDepthProfile) => {
    setUserCulturalProfile(profile);
    setCurrentSaudadeLevel(profile.saudadeProfile.saudadeIntensity);
    
    // Save to localStorage (in real app, would save to Supabase)
    localStorage.setItem(`saudade-profile-${userId}`, JSON.stringify(profile));
    
    onProfileUpdate(profile);
    setAssessmentStep('results');
    
    // Auto-transition to matches after brief celebration
    setTimeout(() => {
      setShowAssessment(false);
      setShowMatches(true);
    }, 3000);
  };

  const handleMatchSelect = (match: any) => {
    // Handle match selection
  };

  const handleStartConversation = (matchId: string) => {
    onMatchInteraction(matchId, 'message');
  };

  const handleActivitySelect = (activity: any) => {
    // Handle activity selection - could open event booking, community page, etc.
  };

  const handleScheduleActivity = (activityId: string, partnerId?: string) => {
    // Handle activity scheduling
  };

  const retakeAssessment = () => {
    setAssessmentStep('intro');
    setShowAssessment(true);
    setShowMatches(false);
    setShowHealing(false);
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // New user - show introduction
  if (!userCulturalProfile && !showAssessment) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-50 via-pink-50 to-primary-50 rounded-3xl p-8 text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartSolid className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'pt' 
                ? 'Encontre Sua Alma Gémea de Saudade'
                : 'Find Your Saudade Soulmate'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt'
                ? 'Descubra conexões emocionais autênticas com pessoas que compreendem profundamente a sua saudade e herança portuguesa. Vá além do superficial.'
                : 'Discover authentic emotional connections with people who deeply understand your saudade and Portuguese heritage. Go beyond the surface.'}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HeartSolid className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Compatibilidade de Saudade' : 'Saudade Compatibility'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'pt'
                  ? 'Combine com base na intensidade e frequência da sua saudade'
                  : 'Match based on your saudade intensity and frequency'}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <SparklesIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Cura Cultural' : 'Cultural Healing'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'pt'
                  ? 'Atividades personalizadas para curar a saudade juntos'
                  : 'Personalized activities to heal saudade together'}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserGroupIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Apoio Emocional' : 'Emotional Support'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'pt'
                  ? 'Conecte-se com quem compreende a sua jornada emocional'
                  : 'Connect with those who understand your emotional journey'}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <button
              onClick={() => {
                setShowAssessment(true);
                setAssessmentStep('intro');
              }}
              className="bg-gradient-to-r from-red-600 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-primary-700 transition-all shadow-lg"
            >
              {language === 'pt' ? 'Descobrir Minha Compatibilidade de Saudade' : 'Discover My Saudade Compatibility'}
            </button>
            
            <p className="text-sm text-gray-500">
              {language === 'pt' 
                ? '5 minutos • Baseado em psicologia cultural portuguesa'
                : '5 minutes • Based on Portuguese cultural psychology'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show Assessment
  if (showAssessment) {
    if (assessmentStep === 'intro') {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartSolid className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'pt' 
                  ? 'Avaliação de Saudade e Compatibilidade Cultural'
                  : 'Saudade & Cultural Compatibility Assessment'}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                {language === 'pt'
                  ? 'Esta avaliação vai compreender a profundidade da sua saudade, triggers emocionais, e como você se conecta com a sua herança portuguesa.'
                  : 'This assessment will understand the depth of your saudade, emotional triggers, and how you connect with your Portuguese heritage.'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {language === 'pt' ? 'O que vamos descobrir:' : 'What we\'ll discover:'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>{language === 'pt' ? 'Intensidade da sua saudade' : 'Your saudade intensity'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{language === 'pt' ? 'Triggers emocionais únicos' : 'Unique emotional triggers'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{language === 'pt' ? 'Estratégias de adaptação' : 'Coping strategies'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{language === 'pt' ? 'Necessidades de apoio' : 'Support needs'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAssessmentStep('assessment')}
              className="bg-gradient-to-r from-red-600 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-primary-700 transition-all"
            >
              {language === 'pt' ? 'Começar Avaliação' : 'Start Assessment'}
            </button>
          </div>
        </motion.div>
      );
    }

    if (assessmentStep === 'assessment') {
      return (
        <SaudadeMatchingSystem
          onComplete={handleProfileComplete}
          onClose={() => setShowAssessment(false)}
          showAsModal={false}
        />
      );
    }

    if (assessmentStep === 'results') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Perfil Completo!' : 'Profile Complete!'}
              </h2>
              <p className="text-gray-600">
                {language === 'pt' 
                  ? 'Agora você pode encontrar conexões emocionais autênticas baseadas na sua saudade'
                  : 'Now you can find authentic emotional connections based on your saudade'}
              </p>
            </div>

            {userCulturalProfile && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'pt' ? 'Seu Tipo de Compatibilidade:' : 'Your Compatibility Type:'}
                </h3>
                <div className="text-lg font-bold text-red-600 mb-2">
                  {userCulturalProfile.saudadeProfile.emotionalCompatibilityType}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? `Intensidade de Saudade: ${userCulturalProfile.saudadeProfile.saudadeIntensity}/10`
                    : `Saudade Intensity: ${userCulturalProfile.saudadeProfile.saudadeIntensity}/10`}
                </div>
              </div>
            )}

            <div className="text-gray-500 text-sm">
              {language === 'pt' ? 'Redirecionando para matches...' : 'Redirecting to matches...'}
            </div>
          </div>
        </motion.div>
      );
    }
  }

  // Main Dashboard with Saudade Integration
  return (
    <div className="space-y-8">
      {/* Header with Profile Summary */}
      {userCulturalProfile && (
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-primary-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center">
                <HeartSolid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {userCulturalProfile.saudadeProfile.emotionalCompatibilityType}
                </h2>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? `Saudade ${userCulturalProfile.saudadeProfile.saudadeIntensity}/10 • ${userCulturalProfile.saudadeProfile.frequency}`
                    : `Saudade ${userCulturalProfile.saudadeProfile.saudadeIntensity}/10 • ${userCulturalProfile.saudadeProfile.frequency}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={retakeAssessment}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
                title={language === 'pt' ? 'Refazer avaliação' : 'Retake assessment'}
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHealing(!showHealing)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
                title={language === 'pt' ? 'Recomendações de cura' : 'Healing recommendations'}
              >
                <SparklesIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => {
            setShowMatches(true);
            setShowHealing(false);
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            showMatches
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {language === 'pt' ? 'Matches de Saudade' : 'Saudade Matches'}
        </button>
        <button
          onClick={() => {
            setShowHealing(true);
            setShowMatches(false);
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            showHealing
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {language === 'pt' ? 'Cura Cultural' : 'Cultural Healing'}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {showMatches && userCulturalProfile && (
          <motion.div
            key="matches"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SaudadeCompatibilityEngine
              userProfile={userCulturalProfile}
              onMatchSelect={handleMatchSelect}
              onStartConversation={handleStartConversation}
              showDetailedAnalysis={hasActiveSubscription}
            />
          </motion.div>
        )}

        {showHealing && userCulturalProfile && (
          <motion.div
            key="healing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CulturalHealingRecommendations
              userProfile={userCulturalProfile}
              currentSaudadeLevel={currentSaudadeLevel}
              onActivitySelect={handleActivitySelect}
              onScheduleActivity={handleScheduleActivity}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Upgrade Prompt */}
      {!hasActiveSubscription && userCulturalProfile && (
        <div className="bg-gradient-to-r from-primary-50 to-coral-50 border border-primary-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-coral-500 rounded-xl">
              <StarSolid className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-1">
                {language === 'pt' ? 'Desbloqueie Todo o Potencial da Compatibilidade de Saudade' : 'Unlock Full Saudade Compatibility Potential'}
              </h3>
              <p className="text-primary-700 text-sm">
                {language === 'pt'
                  ? 'Acesso a análises detalhadas de compatibilidade, matches ilimitados e recomendações personalizadas de cura cultural'
                  : 'Access detailed compatibility analysis, unlimited matches, and personalized cultural healing recommendations'}
              </p>
            </div>
            <button className="bg-gradient-to-r from-primary-600 to-coral-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-coral-700 transition-all">
              {language === 'pt' ? 'Upgrade' : 'Upgrade'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}