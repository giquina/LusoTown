"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  LanguageIcon,
  CakeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Lusophone Cultural Preference Types
interface CulturalPreferences {
  // Heritage background
  heritage: ('portugal' | 'brazil' | 'angola' | 'cape-verde' | 'mozambique' | 'guinea-bissau' | 'sao-tome' | 'timor-leste')[];
  // Preferred event types
  eventTypes: ('fado' | 'samba' | 'kizomba' | 'folk-dance' | 'football' | 'food-wine' | 'business' | 'cultural-talks' | 'family')[];
  // Time preferences
  preferredTimes: ('morning' | 'afternoon' | 'evening' | 'weekend')[];
  // Location preferences
  preferredAreas: ('stockwell' | 'vauxhall' | 'camden' | 'kensington' | 'central-london')[];
  // Language preference
  languagePreference: 'portuguese' | 'english' | 'both';
  // Age group
  ageGroup: '18-25' | '26-35' | '36-45' | '46-55' | '55+';
  // Professional interests
  professionalInterests: ('tech' | 'healthcare' | 'finance' | 'education' | 'hospitality' | 'arts' | 'law' | 'business')[];
}

interface UserPersonalizationData {
  preferences: CulturalPreferences;
  attendedEvents: string[];
  savedEvents: string[];
  interactionHistory: {
    eventId: string;
    action: 'viewed' | 'saved' | 'attended' | 'shared';
    timestamp: Date;
  }[];
  lastUpdated: Date;
}

interface PersonalizationEngineProps {
  userId?: string;
  onPreferencesChange: (preferences: CulturalPreferences) => void;
  className?: string;
  showOnboarding?: boolean;
}

// Cultural Heritage Options
const HERITAGE_OPTIONS = [
  { id: 'portugal', name: 'Portugal', namePt: 'Portugal', flag: '🇵🇹', color: 'from-green-500 to-red-500' },
  { id: 'brazil', name: 'Brazil', namePt: 'Brasil', flag: '🇧🇷', color: 'from-green-400 to-yellow-400' },
  { id: 'angola', name: 'Angola', namePt: 'Angola', flag: '🇦🇴', color: 'from-red-600 to-black' },
  { id: 'cape-verde', name: 'Cape Verde', namePt: 'Cabo Verde', flag: '🇨🇻', color: 'from-blue-500 to-white' },
  { id: 'mozambique', name: 'Mozambique', namePt: 'Moçambique', flag: '🇲🇿', color: 'from-green-500 to-red-500' },
  { id: 'guinea-bissau', name: 'Guinea-Bissau', namePt: 'Guiné-Bissau', flag: '🇬🇼', color: 'from-red-500 to-yellow-400' },
  { id: 'sao-tome', name: 'São Tomé & Príncipe', namePt: 'São Tomé e Príncipe', flag: '🇸🇹', color: 'from-green-500 to-yellow-400' },
  { id: 'timor-leste', name: 'Timor-Leste', namePt: 'Timor-Leste', flag: '🇹🇱', color: 'from-red-500 to-yellow-400' },
];

// Event Type Preferences
const EVENT_TYPE_OPTIONS = [
  { id: 'fado', nameEn: 'Fado Music', namePt: 'Música Fado', icon: '🎵', description: 'Traditional Portuguese music' },
  { id: 'samba', nameEn: 'Samba & Dance', namePt: 'Samba e Dança', icon: '💃', description: 'Brazilian dance and music' },
  { id: 'kizomba', nameEn: 'Kizomba', namePt: 'Kizomba', icon: '🕺', description: 'Angolan dance and music' },
  { id: 'football', nameEn: 'Football Events', namePt: 'Eventos de Futebol', icon: '⚽', description: 'Lusophone football viewing' },
  { id: 'food-wine', nameEn: 'Food & Wine', namePt: 'Gastronomia', icon: '🍷', description: 'Portuguese cuisine experiences' },
  { id: 'business', nameEn: 'Business Networking', namePt: 'Networking Profissional', icon: '💼', description: 'Professional Lusophone community' },
  { id: 'cultural-talks', nameEn: 'Cultural Talks', namePt: 'Palestras Culturais', icon: '🗣️', description: 'Portuguese history and culture' },
  { id: 'family', nameEn: 'Family Events', namePt: 'Eventos Familiares', icon: '👨‍👩‍👧‍👦', description: 'Family-friendly Lusophone events' },
];

export default function PersonalizationEngine({
  userId,
  onPreferencesChange,
  className = '',
  showOnboarding = false,
}: PersonalizationEngineProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const [userPreferences, setUserPreferences] = useState<CulturalPreferences>({
    heritage: [],
    eventTypes: [],
    preferredTimes: ['evening'],
    preferredAreas: [],
    languagePreference: 'both',
    ageGroup: '26-35',
    professionalInterests: [],
  });

  const [showOnboardingWizard, setShowOnboardingWizard] = useState(showOnboarding);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [personalizationScore, setPersonalizationScore] = useState(0);

  // Load saved preferences
  useEffect(() => {
    if (userId) {
      const savedPrefs = localStorage.getItem(`lusotown_preferences_${userId}`);
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        setUserPreferences(parsed.preferences);
        calculatePersonalizationScore(parsed.preferences);
      }
    }
  }, [userId]);

  // Calculate personalization score
  const calculatePersonalizationScore = (prefs: CulturalPreferences) => {
    let score = 0;
    if (prefs.heritage.length > 0) score += 20;
    if (prefs.eventTypes.length > 0) score += 30;
    if (prefs.preferredAreas.length > 0) score += 20;
    if (prefs.preferredTimes.length > 0) score += 10;
    if (prefs.professionalInterests.length > 0) score += 20;
    setPersonalizationScore(Math.min(score, 100));
  };

  // Save preferences
  const savePreferences = useCallback((newPrefs: CulturalPreferences) => {
    setUserPreferences(newPrefs);
    onPreferencesChange(newPrefs);
    calculatePersonalizationScore(newPrefs);
    
    if (userId) {
      const userData: UserPersonalizationData = {
        preferences: newPrefs,
        attendedEvents: [],
        savedEvents: [],
        interactionHistory: [],
        lastUpdated: new Date(),
      };
      localStorage.setItem(`lusotown_preferences_${userId}`, JSON.stringify(userData));
    }
  }, [userId, onPreferencesChange]);

  // Onboarding steps
  const onboardingSteps = [
    {
      title: isPortuguese ? 'Qual é a sua herança lusófona?' : 'What\'s your Lusophone heritage?',
      subtitle: isPortuguese ? 'Selecione todos que se aplicam' : 'Select all that apply',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {HERITAGE_OPTIONS.map((heritage) => {
            const isSelected = userPreferences.heritage.includes(heritage.id as any);
            return (
              <motion.button
                key={heritage.id}
                onClick={() => {
                  const newHeritage = isSelected
                    ? userPreferences.heritage.filter(h => h !== heritage.id)
                    : [...userPreferences.heritage, heritage.id as any];
                  savePreferences({ ...userPreferences, heritage: newHeritage });
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-green-400 bg-gradient-to-r from-green-50 to-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{heritage.flag}</div>
                <div className="text-sm font-medium text-gray-900">
                  {isPortuguese ? heritage.namePt : heritage.name}
                </div>
              </motion.button>
            );
          })}
        </div>
      ),
    },
    {
      title: isPortuguese ? 'Que tipo de eventos lhe interessam?' : 'What type of events interest you?',
      subtitle: isPortuguese ? 'Escolha as suas preferências' : 'Choose your preferences',
      component: (
        <div className="space-y-3">
          {EVENT_TYPE_OPTIONS.map((eventType) => {
            const isSelected = userPreferences.eventTypes.includes(eventType.id as any);
            return (
              <motion.button
                key={eventType.id}
                onClick={() => {
                  const newEventTypes = isSelected
                    ? userPreferences.eventTypes.filter(e => e !== eventType.id)
                    : [...userPreferences.eventTypes, eventType.id as any];
                  savePreferences({ ...userPreferences, eventTypes: newEventTypes });
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-green-400 bg-gradient-to-r from-green-50 to-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{eventType.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {isPortuguese ? eventType.namePt : eventType.nameEn}
                    </div>
                    <div className="text-sm text-gray-600">
                      {eventType.description}
                    </div>
                  </div>
                  {isSelected && (
                    <HeartSolidIcon className="w-6 h-6 text-red-500 ml-auto" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      ),
    },
    {
      title: isPortuguese ? 'Quando prefere eventos?' : 'When do you prefer events?',
      subtitle: isPortuguese ? 'Selecione os melhores horários' : 'Select your best times',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'morning', nameEn: 'Morning', namePt: 'Manhã', icon: '🌅' },
            { id: 'afternoon', nameEn: 'Afternoon', namePt: 'Tarde', icon: '☀️' },
            { id: 'evening', nameEn: 'Evening', namePt: 'Noite', icon: '🌆' },
            { id: 'weekend', nameEn: 'Weekend', namePt: 'Fim de Semana', icon: '🎉' },
          ].map((time) => {
            const isSelected = userPreferences.preferredTimes.includes(time.id as any);
            return (
              <motion.button
                key={time.id}
                onClick={() => {
                  const newTimes = isSelected
                    ? userPreferences.preferredTimes.filter(t => t !== time.id)
                    : [...userPreferences.preferredTimes, time.id as any];
                  savePreferences({ ...userPreferences, preferredTimes: newTimes });
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-green-400 bg-gradient-to-r from-green-50 to-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-2">{time.icon}</div>
                <div className="text-sm font-medium text-gray-900">
                  {isPortuguese ? time.namePt : time.nameEn}
                </div>
              </motion.button>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className={`${className}`}>
      {/* Personalization Score */}
      <div className="bg-gradient-to-r from-green-100 to-red-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isPortuguese ? 'Perfil de Personalização' : 'Personalization Profile'}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${personalizationScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700">
                {personalizationScore}%
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isPortuguese 
                ? `${personalizationScore < 50 ? 'Complete o seu perfil para recomendações melhores' : 'Óptimo! A receber recomendações personalizadas'}`
                : `${personalizationScore < 50 ? 'Complete your profile for better recommendations' : 'Great! Receiving personalized recommendations'}`
              }
            </p>
          </div>
          {personalizationScore < 50 && (
            <button
              onClick={() => setShowOnboardingWizard(true)}
              className="bg-gradient-to-r from-green-500 to-red-500 text-white px-4 py-2 rounded-xl font-medium text-sm"
            >
              {isPortuguese ? 'Completar' : 'Complete'}
            </button>
          )}
        </div>
      </div>

      {/* Onboarding Wizard */}
      <AnimatePresence>
        {showOnboardingWizard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {isPortuguese ? 'Personalização LusoTown' : 'LusoTown Personalization'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {isPortuguese ? `Passo ${onboardingStep + 1} de ${onboardingSteps.length}` : `Step ${onboardingStep + 1} of ${onboardingSteps.length}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOnboardingWizard(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    {onboardingSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index <= onboardingStep ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-red-500 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((onboardingStep + 1) / onboardingSteps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Current Step */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {onboardingSteps[onboardingStep].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {onboardingSteps[onboardingStep].subtitle}
                  </p>
                  {onboardingSteps[onboardingStep].component}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setOnboardingStep(Math.max(0, onboardingStep - 1))}
                    disabled={onboardingStep === 0}
                    className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPortuguese ? 'Anterior' : 'Previous'}
                  </button>
                  
                  {onboardingStep < onboardingSteps.length - 1 ? (
                    <button
                      onClick={() => setOnboardingStep(onboardingStep + 1)}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-red-500 text-white font-medium"
                    >
                      {isPortuguese ? 'Próximo' : 'Next'}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowOnboardingWizard(false)}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-red-500 text-white font-medium"
                    >
                      {isPortuguese ? 'Concluído' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Preference Adjustments */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <StarIcon className="w-4 h-4" />
          {isPortuguese ? 'Preferências Rápidas' : 'Quick Preferences'}
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Heritage */}
          {userPreferences.heritage.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Herança' : 'Heritage'}
              </h5>
              <div className="flex flex-wrap gap-2">
                {userPreferences.heritage.map((heritage) => {
                  const option = HERITAGE_OPTIONS.find(h => h.id === heritage);
                  return option ? (
                    <span
                      key={heritage}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {option.flag}
                      {isPortuguese ? option.namePt : option.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Event Types */}
          {userPreferences.eventTypes.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Interesses' : 'Interests'}
              </h5>
              <div className="flex flex-wrap gap-2">
                {userPreferences.eventTypes.map((eventType) => {
                  const option = EVENT_TYPE_OPTIONS.find(e => e.id === eventType);
                  return option ? (
                    <span
                      key={eventType}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {option.icon}
                      {isPortuguese ? option.namePt : option.nameEn}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}