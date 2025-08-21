"use client";

import { buildUnsplashUrl } from '@/config';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BoltIcon,
  StarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';

// Import our saudade components
import SaudadeMatchingIntegration from './SaudadeMatchingIntegration';
import type { CulturalDepthProfile } from './SaudadeMatchingSystem';

interface SaudadeMatchingDemoProps {
  showAsDemo?: boolean;
  onUpgrade?: () => void;
}

export default function SaudadeMatchingDemo({ 
  showAsDemo = false,
  onUpgrade
}: SaudadeMatchingDemoProps) {
  const { language } = useLanguage();
  const [showDemo, setShowDemo] = useState(showAsDemo);
  const [currentStep, setCurrentStep] = useState(0);

  // Demo user profiles for showcase
  const demoProfiles = [
    {
      name: 'Sofia',
      age: 29,
      photo: buildUnsplashUrl('1494790108755-2616b612b1c5'),
      type: language === 'pt' ? 'Alma Saudosa' : 'Saudade Soul',
      saudadeIntensity: 8,
      compatibility: 94,
      description: language === 'pt' 
        ? 'Sente saudade intensa do Porto. Adora fado e cozinha tradicional.'
        : 'Feels intense saudade for Porto. Loves fado and traditional cooking.',
    },
    {
      name: 'Miguel',
      age: 34,
      photo: buildUnsplashUrl('1472099645785-5658abf4ff4e'),
      type: language === 'pt' ? 'Curador Cultural' : 'Cultural Healer',
      saudadeIntensity: 6,
      compatibility: 87,
      description: language === 'pt'
        ? 'Equilibra herança portuguesa com vida londrina. Procura apoio emocional.'
        : 'Balances Portuguese heritage with London life. Seeks emotional support.',
    },
    {
      name: 'Ana',
      age: 26,
      photo: buildUnsplashUrl('1438761681033-6461ffad8d80'),
      type: language === 'pt' ? 'Guardião da Herança' : 'Heritage Guardian',
      saudadeIntensity: 9,
      compatibility: 91,
      description: language === 'pt'
        ? 'Açoriana dedicada à preservação cultural. Organiza eventos comunitários.'
        : 'Azorean dedicated to cultural preservation. Organizes community events.',
    },
  ];

  const demoSteps = [
    {
      titleEn: 'Saudade Assessment',
      titlePt: 'Avaliação de Saudade',
      descriptionEn: 'Our unique assessment measures saudade intensity, emotional triggers, and cultural coping mechanisms.',
      descriptionPt: 'A nossa avaliação única mede intensidade de saudade, gatilhos emocionais e mecanismos culturais de adaptação.',
      icon: HeartSolid,
      color: 'from-red-500 to-pink-500',
    },
    {
      titleEn: 'Emotional Compatibility',
      titlePt: 'Compatibilidade Emocional',
      descriptionEn: 'Advanced algorithm matches based on saudade levels, cultural support needs, and heritage preservation.',
      descriptionPt: 'Algoritmo avançado que combina baseado em níveis de saudade, necessidades de apoio cultural e preservação da herança.',
      icon: SparklesIcon,
      color: 'from-blue-500 to-purple-500',
    },
    {
      titleEn: 'Cultural Healing',
      titlePt: 'Cura Cultural',
      descriptionEn: 'Personalized activities and recommendations to heal saudade together with your cultural match.',
      descriptionPt: 'Atividades personalizadas e recomendações para curar a saudade junto com o seu match cultural.',
      icon: UserGroupIcon,
      color: 'from-green-500 to-teal-500',
    },
  ];

  const features = [
    {
      titleEn: 'Deep Emotional Understanding',
      titlePt: 'Compreensão Emocional Profunda',
      descriptionEn: 'Beyond surface matching - understand the depth of Portuguese emotional experience',
      descriptionPt: 'Para além de matches superficiais - compreenda a profundidade da experiência emocional portuguesa',
      icon: HeartSolid,
    },
    {
      titleEn: 'Regional Cultural Matching',
      titlePt: 'Matching Cultural Regional',
      descriptionEn: 'Connect with people from your specific Portuguese region or with complementary cultural backgrounds',
      descriptionPt: 'Conecte-se com pessoas da sua região portuguesa específica ou com backgrounds culturais complementares',
      icon: AcademicCapIcon,
    },
    {
      titleEn: 'Therapeutic Activities',
      titlePt: 'Atividades Terapêuticas',
      descriptionEn: 'Curated activities designed to heal saudade and strengthen cultural bonds',
      descriptionPt: 'Atividades curadas para curar a saudade e fortalecer laços culturais',
      icon: SparklesIcon,
    },
    {
      titleEn: 'Saudade Support Network',
      titlePt: 'Rede de Apoio para Saudade',
      descriptionEn: 'Connect with others who truly understand your emotional and cultural journey',
      descriptionPt: 'Conecte-se com outros que verdadeiramente compreendem a sua jornada emocional e cultural',
      icon: UserGroupIcon,
    },
  ];

  if (showDemo) {
    return (
      <div className="space-y-8">
        {/* Demo Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-primary-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BoltIcon className="w-4 h-4" />
            {language === 'pt' ? 'NOVO: Sistema de Matching por Saudade' : 'NEW: Saudade-Based Matching System'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Encontre Sua Alma Gémea de Saudade'
              : 'Find Your Saudade Soulmate'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'O primeiro sistema de matching que compreende verdadeiramente a profundidade emocional da experiência portuguesa. Conecte-se com base na saudade, herança cultural e necessidades de apoio emocional.'
              : 'The first matching system that truly understands the emotional depth of the Portuguese experience. Connect based on saudade, cultural heritage, and emotional support needs.'}
          </p>
        </div>

        {/* Demo Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {demoSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${
                  currentStep === index ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-red-600 font-semibold mb-2">
                  {language === 'pt' ? `Passo ${index + 1}` : `Step ${index + 1}`}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? step.titlePt : step.titleEn}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? step.descriptionPt : step.descriptionEn}
                </p>
                
                {index < demoSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <ArrowRightIcon className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Demo Match Previews */}
        <div className="bg-gradient-to-br from-red-50 via-pink-50 to-primary-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Exemplos de Matches Baseados em Saudade' : 'Sample Saudade-Based Matches'}
            </h2>
            <p className="text-gray-600">
              {language === 'pt'
                ? 'Veja como o nosso sistema encontra conexões emocionais autênticas'
                : 'See how our system finds authentic emotional connections'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoProfiles.map((profile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-center mb-4">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                  />
                  <h3 className="font-semibold text-gray-900">{profile.name}, {profile.age}</h3>
                  <div className="text-sm text-red-600 font-medium">{profile.type}</div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'pt' ? 'Saudade:' : 'Saudade:'}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < profile.saudadeIntensity ? 'bg-red-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {language === 'pt' ? 'Compatibilidade:' : 'Compatibility:'}
                    </span>
                    <span className="text-green-600 font-bold">{profile.compatibility}%</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-4">{profile.description}</p>

                <button className="w-full bg-gradient-to-r from-red-500 to-primary-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-primary-600 transition-all">
                  {language === 'pt' ? 'Ver Perfil Completo' : 'View Full Profile'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-primary-500 rounded-xl">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? feature.titlePt : feature.titleEn}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'pt' ? feature.descriptionPt : feature.descriptionEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowDemo(false)}
            className="bg-gradient-to-r from-red-600 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-primary-700 transition-all shadow-lg"
          >
            {language === 'pt' ? 'Começar Minha Avaliação de Saudade' : 'Start My Saudade Assessment'}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            {language === 'pt' 
              ? '5 minutos • Baseado em psicologia cultural portuguesa • Completamente gratuito'
              : '5 minutes • Based on Portuguese cultural psychology • Completely free'}
          </p>
        </div>
      </div>
    );
  }

  // Main Integration Component
  return (
    <SaudadeMatchingIntegration
      userId="demo-user"
      onProfileUpdate={(profile: CulturalDepthProfile) => {
        console.log('Profile updated:', profile);
      }}
      onMatchInteraction={(matchId: string, action: 'like' | 'pass' | 'message') => {
        console.log('Match interaction:', matchId, action);
      }}
    />
  );
}