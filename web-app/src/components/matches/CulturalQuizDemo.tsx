"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  SparklesIcon,
  ChartBarIcon,
  HeartIcon,
  UserGroupIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import CulturalCompatibilityIntegration from './CulturalCompatibilityIntegration';
import type { CompatibilityProfile } from './PortugueseCulturalCompatibilityQuiz';

interface CulturalQuizDemoProps {
  showAsPrompt?: boolean;
  className?: string;
}

export default function CulturalQuizDemo({ showAsPrompt = true, className = "" }: CulturalQuizDemoProps) {
  const { language } = useLanguage();
  const [userProfile, setUserProfile] = useState<CompatibilityProfile | null>(null);
  const [showIntegration, setShowIntegration] = useState(false);

  const handleProfileUpdate = (profile: CompatibilityProfile) => {
    setUserProfile(profile);
    setShowIntegration(true);
  };

  const mockUserProfile: CompatibilityProfile = {
    food: 8.5,
    music: 7.2,
    traditions: 9.1,
    family: 8.8,
    language: 8.0,
    integration: 6.5,
    community: 7.8,
    values: 8.3,
    holidays: 8.7,
    regional: 7.9,
    overallScore: 8.1,
    culturalStrength: 'Very Strong',
    profileType: language === 'pt' ? 'Guardião da Tradição' : 'Tradition Guardian',
    recommendations: [
      language === 'pt' 
        ? 'Participe em workshops de culinária portuguesa no Borough Market'
        : 'Join Lusophone cooking workshops at Borough Market',
      language === 'pt'
        ? 'Visite noites de fado autênticas em Soho'
        : 'Visit authentic fado nights in Soho',
      language === 'pt'
        ? 'Junte-se ao Portuguese-speaking community Centre em Stockwell'
        : 'Join the Portuguese-speaking community Centre in Stockwell',
      language === 'pt'
        ? 'Organize celebrações dos Santos Populares em Londres'
        : 'Organize Santos Populares celebrations in London',
    ],
  };

  if (showIntegration || userProfile) {
    return (
      <div className={className}>
        <CulturalCompatibilityIntegration
          currentUserProfile={userProfile || mockUserProfile}
          onProfileUpdate={handleProfileUpdate}
          showQuizPrompt={false}
        />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Quiz Prompt */}
      <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl border border-primary-200 p-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SparklesIcon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            {language === 'pt' 
              ? 'Descubra Sua Compatibilidade Cultural Portuguesa'
              : 'Discover Your Lusophone Cultural Compatibility'}
          </h2>

          <p className="text-primary-700 mb-8 text-lg leading-relaxed">
            {language === 'pt'
              ? 'Complete nosso quiz cultural detalhado para encontrar pessoas que realmente compartilham seus valores, tradições e conexão com a herança portuguesa. Vai além de interesses básicos para descobrir compatibilidade cultural profunda.'
              : 'Complete our detailed cultural quiz to find people who truly share your values, traditions, and connection to Portuguese heritage. Goes beyond basic interests to discover deep cultural compatibility.'}
          </p>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 border border-primary-200"
            >
              <ChartBarIcon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-2">
                {language === 'pt' ? '15-20 Perguntas' : '15-20 Questions'}
              </h3>
              <p className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Cobrindo comida, música, tradições, família, língua e integração'
                  : 'Covering food, music, traditions, family, language & integration'}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 border border-primary-200"
            >
              <HeartIcon className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-2">
                {language === 'pt' ? 'Perfil Personalizado' : 'Personal Profile'}
              </h3>
              <p className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Receba sua classificação cultural e tipo de personalidade'
                  : 'Get your cultural classification and personality type'}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 border border-primary-200"
            >
              <UserGroupIcon className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-900 mb-2">
                {language === 'pt' ? 'Matches Melhores' : 'Better Matches'}
              </h3>
              <p className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Veja scores de compatibilidade em perfis de matches'
                  : 'See compatibility scores on match profiles'}
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowIntegration(true)}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all inline-flex items-center justify-center gap-3 transform hover:scale-105"
            >
              <PlayIcon className="w-5 h-5" />
              {language === 'pt' ? 'Iniciar Quiz Cultural' : 'Start Cultural Quiz'}
            </button>

            <button
              onClick={() => setUserProfile(mockUserProfile)}
              className="bg-white border-2 border-primary-300 text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all"
            >
              {language === 'pt' ? 'Ver Demo' : 'View Demo'}
            </button>
          </div>

          <p className="text-sm text-primary-600 mt-4">
            {language === 'pt' 
              ? '⏱️ Demora apenas 5-7 minutos • Privado e seguro • Sem julgamentos'
              : '⏱️ Takes only 5-7 minutes • Private & secure • No judgment'}
          </p>
        </div>
      </div>

      {/* Quiz Preview */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-primary-600" />
          {language === 'pt' ? 'Exemplo de Perguntas do Quiz' : 'Sample Quiz Questions'}
        </h3>

        <div className="space-y-4">
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-2">
              {language === 'pt' ? '🍽️ Culinária e Tradições' : '🍽️ Food & Traditions'}
            </h4>
            <p className="text-sm text-primary-700">
              {language === 'pt' 
                ? '"Com que frequência cozinha comida tradicional portuguesa/brasileira?"'
                : '"How often do you cook traditional Lusophone/Brazilian food?"'}
            </p>
          </div>

          <div className="bg-secondary-50 rounded-xl p-4 border border-secondary-200">
            <h4 className="font-semibold text-secondary-900 mb-2">
              {language === 'pt' ? '🎭 Música e Cultura' : '🎭 Music & Culture'}
            </h4>
            <p className="text-sm text-secondary-700">
              {language === 'pt' 
                ? '"Quão profundamente se conecta com o Fado?"'
                : '"How deeply do you connect with Fado music?"'}
            </p>
          </div>

          <div className="bg-accent-50 rounded-xl p-4 border border-accent-200">
            <h4 className="font-semibold text-accent-900 mb-2">
              {language === 'pt' ? '💭 Saudade e Identidade' : '💭 Saudade & Identity'}
            </h4>
            <p className="text-sm text-accent-700">
              {language === 'pt' 
                ? '"Com que frequência sente \'saudade\' da sua terra natal?"'
                : '"How often do you experience \'saudade\' for your homeland?"'}
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            {language === 'pt' 
              ? '...e mais 15 perguntas sobre família, integração, comunidade e valores'
              : '...and 15+ more questions about family, integration, community & values'}
          </span>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <h3 className="text-lg font-bold text-green-900 mb-4">
          {language === 'pt' ? '🎯 Por que fazer o Quiz?' : '🎯 Why Take the Quiz?'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Encontre pessoas com valores culturais similares'
                : 'Find people with similar cultural values'}
            </li>
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Veja scores de compatibilidade detalhados'
                : 'See detailed compatibility scores'}
            </li>
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Filtre matches por força cultural'
                : 'Filter matches by cultural strength'}
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Receba recomendações culturais personalizadas'
                : 'Get personalized cultural recommendations'}
            </li>
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Conecte-se baseado em tradições partilhadas'
                : 'Connect based on shared traditions'}
            </li>
            <li className="flex items-start gap-2 text-sm text-green-800">
              <span className="text-green-600 font-bold">✓</span>
              {language === 'pt' 
                ? 'Entenda sua própria identidade cultural'
                : 'Understand your own cultural identity'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}