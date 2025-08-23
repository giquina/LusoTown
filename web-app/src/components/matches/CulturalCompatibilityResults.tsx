"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  StarIcon,
  HeartIcon,
  SparklesIcon,
  ChartBarIcon,
  AcademicCapIcon,
  HomeIcon,
  MusicalNoteIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MapPinIcon,
  FireIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import type { CompatibilityProfile } from './PortugueseCulturalCompatibilityQuiz';

interface CulturalCompatibilityResultsProps {
  profile: CompatibilityProfile;
  onViewMatches: () => void;
  onRetakeQuiz: () => void;
  onClose: () => void;
}

export default function CulturalCompatibilityResults({ 
  profile, 
  onViewMatches, 
  onRetakeQuiz, 
  onClose 
}: CulturalCompatibilityResultsProps) {
  const { language } = useLanguage();

  const categoryIcons = {
    food: CakeIcon,
    music: MusicalNoteIcon,
    traditions: SparklesIcon,
    family: HomeIcon,
    language: ChatBubbleLeftRightIcon,
    integration: GlobeAltIcon,
    community: UserGroupIcon,
    values: HeartIcon,
    holidays: StarIcon,
    regional: MapPinIcon,
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      food: language === 'pt' ? 'Culinária' : 'Cuisine',
      music: language === 'pt' ? 'Música' : 'Music',
      traditions: language === 'pt' ? 'Tradições' : 'Traditions',
      family: language === 'pt' ? 'Família' : 'Family',
      language: language === 'pt' ? 'Idioma' : 'Language',
      integration: language === 'pt' ? 'Integração' : 'Integration',
      community: language === 'pt' ? 'Comunidade' : 'Community',
      values: language === 'pt' ? 'Valores' : 'Values',
      holidays: language === 'pt' ? 'Celebrações' : 'Holidays',
      regional: language === 'pt' ? 'Regional' : 'Regional',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 8) return language === 'pt' ? 'Muito Forte' : 'Very Strong';
    if (score >= 6) return language === 'pt' ? 'Forte' : 'Strong';
    if (score >= 4) return language === 'pt' ? 'Moderado' : 'Moderate';
    return language === 'pt' ? 'Flexível' : 'Flexible';
  };

  const strengthDescriptions = {
    'Very Strong': {
      pt: 'Você é um verdadeiro guardião da cultura portuguesa! Sua conexão com as tradições, língua e valores lusófonos é excepcionalmente forte.',
      en: 'You are a true guardian of Portuguese culture! Your connection to Lusophone traditions, language, and values is exceptionally strong.'
    },
    'Strong': {
      pt: 'Você mantém uma ligação sólida com sua herança portuguesa enquanto navega pela vida em Londres.',
      en: 'You maintain a solid connection to your Portuguese heritage while navigating life in London.'
    },
    'Moderate': {
      pt: 'Você equilibra bem sua herança portuguesa com a integração britânica, adaptando-se conforme necessário.',
      en: 'You balance your Portuguese heritage well with British integration, adapting as needed.'
    },
    'Developing': {
      pt: 'Você está explorando diferentes aspectos da cultura portuguesa e definindo sua própria relação cultural.',
      en: 'You are exploring different aspects of Portuguese culture and defining your own cultural relationship.'
    },
    'Flexible': {
      pt: 'Você adota uma abordagem flexível à cultura, integrando-se bem enquanto preserva elementos que lhe são importantes.',
      en: 'You take a flexible approach to culture, integrating well while preserving elements important to you.'
    }
  };

  const profileDescriptions = {
    'Guardião da Tradição': {
      pt: 'Você é o coração da comunidade de falantes de português, preservando e transmitindo tradições para as futuras gerações.',
      en: 'You are the heart of the Portuguese-speaking community, preserving and passing traditions to future generations.'
    },
    'Tradition Guardian': {
      pt: 'Você é o coração da comunidade de falantes de português, preservando e transmitindo tradições para as futuras gerações.',
      en: 'You are the heart of the Portuguese-speaking community, preserving and passing traditions to future generations.'
    },
    'Ponte Cultural': {
      pt: 'Você conecta mundos, ajudando outros portugueses a integrar-se enquanto mantém suas raízes culturais.',
      en: 'You connect worlds, helping other Portuguese integrate while maintaining their cultural roots.'
    },
    'Cultural Bridge': {
      pt: 'Você conecta mundos, ajudando outros portugueses a integrar-se enquanto mantém suas raízes culturais.',
      en: 'You connect worlds, helping other Portuguese integrate while maintaining their cultural roots.'
    },
    'Amante da Cultura': {
      pt: 'Você celebra a rica tapeçaria da cultura portuguesa através da comida, música e festivais.',
      en: 'You celebrate the rich tapestry of Portuguese culture through food, music, and festivals.'
    },
    'Culture Enthusiast': {
      pt: 'Você celebra a rica tapeçaria da cultura portuguesa através da comida, música e festivais.',
      en: 'You celebrate the rich tapestry of Portuguese culture through food, music, and festivals.'
    },
    'Coração Familiar': {
      pt: 'A família é o centro da sua vida, e você garante que os valores portugueses sejam passados adiante.',
      en: 'Family is at the center of your life, and you ensure Portuguese values are passed down.'
    },
    'Family Heart': {
      pt: 'A família é o centro da sua vida, e você garante que os valores portugueses sejam passados adiante.',
      en: 'Family is at the center of your life, and you ensure Portuguese values are passed down.'
    },
    'Explorador Cultural': {
      pt: 'Você está em uma jornada de descoberta, explorando diferentes aspectos da sua herança portuguesa.',
      en: 'You are on a journey of discovery, exploring different aspects of your Portuguese heritage.'
    },
    'Cultural Explorer': {
      pt: 'Você está em uma jornada de descoberta, explorando diferentes aspectos da sua herança portuguesa.',
      en: 'You are on a journey of discovery, exploring different aspects of your Portuguese heritage.'
    }
  };

  const compatibilityInsights = {
    highTraditional: {
      pt: 'Você terá mais afinidade com pessoas que também valorizam profundamente as tradições portuguesas e a preservação cultural.',
      en: 'You will have strong affinity with people who also deeply value Portuguese traditions and cultural preservation.'
    },
    balanced: {
      pt: 'Sua abordagem equilibrada significa compatibilidade com uma ampla gama de pessoas, desde tradicionalistas até cosmopolitas.',
      en: 'Your balanced approach means compatibility with a wide range of people, from traditionalists to cosmopolitans.'
    },
    integrated: {
      pt: 'Você se conectará bem com portugueses que também priorizaram a integração na sociedade britânica.',
      en: 'You will connect well with Portuguese speakers who have also prioritized integration into British society.'
    },
    exploring: {
      pt: 'Você é compatível com outros que estão explorando sua identidade cultural e encontrando seu lugar em Londres.',
      en: 'You are compatible with others who are exploring their cultural identity and finding their place in London.'
    }
  };

  const getCompatibilityInsight = () => {
    if (profile.overallScore >= 8) return compatibilityInsights.highTraditional;
    if (profile.overallScore >= 6) return compatibilityInsights.balanced;
    if (profile.overallScore >= 4) return compatibilityInsights.integrated;
    return compatibilityInsights.exploring;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">
                {language === 'pt' ? 'Seu Perfil Cultural Português' : 'Your Portuguese Cultural Profile'}
              </h2>
              <p className="text-gray-600">
                {language === 'pt' 
                  ? 'Descubra sua compatibilidade cultural e encontre pessoas com valores similares'
                  : 'Discover your cultural compatibility and find people with similar values'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Overall Score Section */}
          <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-6 mb-8 border border-primary-200">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {Math.round(profile.overallScore * 10)}%
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {language === 'pt' ? 'Força Cultural Portuguesa' : 'Portuguese Cultural Strength'}
              </h3>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary-300">
                <TrophyIcon className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-primary-800">
                  {profile.culturalStrength === 'Very Strong' && language === 'pt' ? 'Muito Forte' :
                   profile.culturalStrength === 'Strong' && language === 'pt' ? 'Forte' :
                   profile.culturalStrength === 'Moderate' && language === 'pt' ? 'Moderado' :
                   profile.culturalStrength === 'Developing' && language === 'pt' ? 'Em Desenvolvimento' :
                   profile.culturalStrength === 'Flexible' && language === 'pt' ? 'Flexível' :
                   profile.culturalStrength}
                </span>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-primary-800 leading-relaxed">
                {strengthDescriptions[profile.culturalStrength][language]}
              </p>
            </div>
          </div>

          {/* Profile Type */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{profile.profileType}</h4>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? 'Seu tipo de personalidade cultural' : 'Your cultural personality type'}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {profileDescriptions[profile.profileType]?.[language] || 
               profileDescriptions[profile.profileType]?.en ||
               'A unique cultural personality with strong Portuguese connections.'}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-primary-600" />
              {language === 'pt' ? 'Análise Detalhada por Categoria' : 'Detailed Category Analysis'}
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(profile).map(([category, score]) => {
                if (category === 'overallScore' || category === 'culturalStrength' || 
                    category === 'profileType' || category === 'recommendations' || 
                    typeof score !== 'number') return null;

                const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                if (!IconComponent) return null;

                return (
                  <div key={category} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-primary-600" />
                        <span className="font-medium text-gray-900">
                          {getCategoryLabel(category)}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(score)}`}>
                        {getScoreDescription(score)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / 10) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                    
                    <div className="text-right text-sm font-semibold text-gray-700">
                      {score.toFixed(1)}/10
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-blue-600" />
              {language === 'pt' ? 'Insights de Compatibilidade' : 'Compatibility Insights'}
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              {getCompatibilityInsight()[language]}
            </p>
            
            {/* Top Compatibility Areas */}
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(profile)
                .filter(([key, value]) => typeof value === 'number' && key !== 'overallScore')
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 3)
                .map(([category, score], index) => {
                  const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                  if (!IconComponent) return null;
                  
                  return (
                    <div key={category} className="bg-white rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {getCategoryLabel(category)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {(score as number).toFixed(1)}/10
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-green-600" />
              {language === 'pt' ? 'Recomendações Personalizadas' : 'Personalized Recommendations'}
            </h4>
            <div className="space-y-3">
              {profile.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Match Quality Prediction */}
          <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl border border-pink-200 p-6 mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-pink-600" />
              {language === 'pt' ? 'Previsão de Qualidade de Matches' : 'Match Quality Prediction'}
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">
                  {language === 'pt' ? 'Você será mais compatível com:' : 'You will be most compatible with:'}
                </h5>
                <ul className="space-y-2">
                  {profile.overallScore >= 7 && (
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {language === 'pt' 
                        ? 'Portugueses que mantêm tradições familiares'
                        : 'Portuguese speakers who maintain family traditions'}
                    </li>
                  )}
                  {profile.music >= 7 && (
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {language === 'pt' 
                        ? 'Amantes de fado e música portuguesa'
                        : 'Fado and Portuguese music lovers'}
                    </li>
                  )}
                  {profile.food >= 7 && (
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {language === 'pt' 
                        ? 'Entusiastas da culinária portuguesa'
                        : 'Portuguese cuisine enthusiasts'}
                    </li>
                  )}
                  {profile.community >= 6 && (
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {language === 'pt' 
                        ? 'Membros ativos da comunidade'
                        : 'Active community members'}
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-pink-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">
                    {Math.round((profile.overallScore / 10) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {language === 'pt' ? 'Taxa de Compatibilidade Média' : 'Average Compatibility Rate'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'pt' 
                      ? 'Baseado no seu perfil cultural'
                      : 'Based on your cultural profile'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onViewMatches}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-2"
            >
              {language === 'pt' ? 'Ver Matches Compatíveis' : 'View Compatible Matches'}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onRetakeQuiz}
                className="bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                {language === 'pt' ? 'Refazer Quiz' : 'Retake Quiz'}
              </button>
              
              <button
                onClick={onClose}
                className="bg-white border-2 border-primary-300 text-primary-700 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}