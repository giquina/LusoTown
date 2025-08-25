"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  BookmarkIcon,
  FlagIcon,
  MusicalNoteIcon,
  AcademicCapIcon,
  CakeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

// Portuguese Cultural Preference Categories
const CULTURAL_PREFERENCES = {
  heritage: {
    id: 'heritage',
    label: 'Heritage Origin',
    labelPt: 'Origem Cultural',
    icon: FlagIcon,
    options: [
      { value: 'portugal', label: 'Portugal', labelPt: 'Portugal', flag: '🇵🇹' },
      { value: 'brazil', label: 'Brazil', labelPt: 'Brasil', flag: '🇧🇷' },
      { value: 'cape-verde', label: 'Cape Verde', labelPt: 'Cabo Verde', flag: '🇨🇻' },
      { value: 'angola', label: 'Angola', labelPt: 'Angola', flag: '🇦🇴' },
      { value: 'mozambique', label: 'Mozambique', labelPt: 'Moçambique', flag: '🇲🇿' },
      { value: 'guinea-bissau', label: 'Guinea-Bissau', labelPt: 'Guiné-Bissau', flag: '🇬🇼' },
      { value: 'sao-tome', label: 'São Tomé', labelPt: 'São Tomé', flag: '🇸🇹' },
      { value: 'timor-leste', label: 'Timor-Leste', labelPt: 'Timor-Leste', flag: '🇹🇱' },
      { value: 'macau', label: 'Macau', labelPt: 'Macau', flag: '🇲🇴' }
    ]
  },
  interests: {
    id: 'interests',
    label: 'Cultural Interests',
    labelPt: 'Interesses Culturais',
    icon: MusicalNoteIcon,
    options: [
      { value: 'fado', label: 'Fado Music', labelPt: 'Música Fado', icon: '🎵' },
      { value: 'cuisine', label: 'Portuguese Cuisine', labelPt: 'Culinária Portuguesa', icon: '🍽️' },
      { value: 'literature', label: 'Literature', labelPt: 'Literatura', icon: '📚' },
      { value: 'history', label: 'History', labelPt: 'História', icon: '🏛️' },
      { value: 'language', label: 'Language Learning', labelPt: 'Aprendizagem da Língua', icon: '🗣️' },
      { value: 'festivals', label: 'Traditional Festivals', labelPt: 'Festivais Tradicionais', icon: '🎉' },
      { value: 'art', label: 'Arts & Crafts', labelPt: 'Artes e Ofícios', icon: '🎨' },
      { value: 'dance', label: 'Traditional Dance', labelPt: 'Dança Tradicional', icon: '💃' }
    ]
  },
  lifestyle: {
    id: 'lifestyle',
    label: 'Lifestyle',
    labelPt: 'Estilo de Vida',
    icon: UserIcon,
    options: [
      { value: 'professional', label: 'Professional Networking', labelPt: 'Networking Profissional', icon: '💼' },
      { value: 'family', label: 'Family-Friendly', labelPt: 'Para Toda a Família', icon: '👨‍👩‍👧‍👦' },
      { value: 'student', label: 'Student Life', labelPt: 'Vida de Estudante', icon: '🎓' },
      { value: 'social', label: 'Social Gatherings', labelPt: 'Encontros Sociais', icon: '🥂' },
      { value: 'fitness', label: 'Sports & Fitness', labelPt: 'Desporto e Fitness', icon: '⚽' },
      { value: 'spiritual', label: 'Spiritual/Religious', labelPt: 'Espiritual/Religioso', icon: '⛪' }
    ]
  },
  schedule: {
    id: 'schedule',
    label: 'Preferred Times',
    labelPt: 'Horários Preferidos',
    icon: ClockIcon,
    options: [
      { value: 'morning', label: 'Morning (9-12)', labelPt: 'Manhã (9-12)', icon: '🌅' },
      { value: 'afternoon', label: 'Afternoon (12-18)', labelPt: 'Tarde (12-18)', icon: '☀️' },
      { value: 'evening', label: 'Evening (18-22)', labelPt: 'Noite (18-22)', icon: '🌆' },
      { value: 'weekend', label: 'Weekends', labelPt: 'Fins de Semana', icon: '📅' },
      { value: 'weekday', label: 'Weekdays', labelPt: 'Dias de Semana', icon: '📋' }
    ]
  }
};

interface PersonalizationEngineProps {
  onPreferencesUpdate?: (preferences: Record<string, string[]>) => void;
  onRecommendationsGenerated?: (recommendations: any[]) => void;
  className?: string;
  showWelcomeWizard?: boolean;
}

export function PersonalizationEngine({
  onPreferencesUpdate,
  onRecommendationsGenerated,
  className = '',
  showWelcomeWizard = false
}: PersonalizationEngineProps) {
  const { language } = useLanguage();
  const [preferences, setPreferences] = useState<Record<string, string[]>>({});
  const [showPreferences, setShowPreferences] = useState(showWelcomeWizard);
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [personalizationScore, setPersonalizationScore] = useState(0);

  const steps = Object.entries(CULTURAL_PREFERENCES);

  // Calculate personalization score
  useEffect(() => {
    const totalOptions = Object.values(CULTURAL_PREFERENCES)
      .reduce((acc, category) => acc + category.options.length, 0);
    const selectedOptions = Object.values(preferences)
      .reduce((acc, prefs) => acc + prefs.length, 0);
    
    const score = Math.round((selectedOptions / totalOptions) * 100);
    setPersonalizationScore(score);
  }, [preferences]);

  // Generate recommendations based on preferences
  const generateRecommendations = useCallback(() => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        title: 'Fado Night at Portuguese Cultural Center',
        type: 'event',
        matchReason: 'Based on your interest in Fado music',
        matchReasonPt: 'Com base no seu interesse em música Fado',
        score: 95,
        image: '/images/fado-night.jpg',
        date: '2024-01-15',
        location: 'Central London'
      },
      {
        id: 'rec-2',
        title: 'Portuguese Business Network Breakfast',
        type: 'networking',
        matchReason: 'Matches your professional networking preference',
        matchReasonPt: 'Corresponde à sua preferência de networking profissional',
        score: 88,
        image: '/images/business-breakfast.jpg',
        date: '2024-01-18',
        location: 'Canary Wharf'
      },
      {
        id: 'rec-3',
        title: 'Cape Verdean Cultural Evening',
        type: 'cultural',
        matchReason: 'Based on your Cape Verdean heritage interest',
        matchReasonPt: 'Com base no seu interesse na herança cabo-verdiana',
        score: 92,
        image: '/images/cape-verde.jpg',
        date: '2024-01-20',
        location: 'Stockwell'
      }
    ];

    // Filter recommendations based on actual preferences
    const filteredRecommendations = mockRecommendations.filter(rec => {
      if (preferences.heritage?.includes('cape-verde') && rec.type === 'cultural') return true;
      if (preferences.interests?.includes('fado') && rec.title.toLowerCase().includes('fado')) return true;
      if (preferences.lifestyle?.includes('professional') && rec.type === 'networking') return true;
      return Math.random() > 0.5; // Random fallback for demo
    });

    setRecommendations(filteredRecommendations);
    onRecommendationsGenerated?.(filteredRecommendations);
  }, [preferences, onRecommendationsGenerated]);

  // Update preferences
  const updatePreferences = useCallback((categoryId: string, value: string) => {
    const currentPrefs = preferences[categoryId] || [];
    const newPrefs = currentPrefs.includes(value)
      ? currentPrefs.filter(p => p !== value)
      : [...currentPrefs, value];
    
    const updatedPreferences = {
      ...preferences,
      [categoryId]: newPrefs
    };

    setPreferences(updatedPreferences);
    onPreferencesUpdate?.(updatedPreferences);
    
    // Generate new recommendations when preferences change
    setTimeout(() => generateRecommendations(), 500);
  }, [preferences, onPreferencesUpdate, generateRecommendations]);

  // Complete setup wizard
  const completeSetup = useCallback(() => {
    setShowPreferences(false);
    generateRecommendations();
    
    // Save preferences to localStorage
    localStorage.setItem('lusotown-preferences', JSON.stringify(preferences));
    
    // Announce completion
    const announcement = language === 'pt' 
      ? 'Personalização completa! Recomendações geradas com base nas suas preferências.'
      : 'Personalization complete! Recommendations generated based on your preferences.';
      
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);
    setTimeout(() => document.body.removeChild(announcer), 2000);
  }, [preferences, generateRecommendations, language]);

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('lusotown-preferences');
    if (saved) {
      try {
        const parsedPreferences = JSON.parse(saved);
        setPreferences(parsedPreferences);
        generateRecommendations();
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, [generateRecommendations]);

  // Personalization Setup Wizard
  const SetupWizard = () => {
    const [categoryId, category] = steps[currentStep] || [];
    if (!category) return null;

    const categoryLabel = language === 'pt' && category.labelPt ? category.labelPt : category.label;
    const Icon = category.icon;

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-green-600 p-6 text-white text-center relative">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setShowPreferences(false)}
              aria-label={language === 'pt' ? 'Fechar' : 'Close'}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-xl font-bold mb-2">
              {language === 'pt' 
                ? 'Personalize Sua Experiência'
                : 'Personalize Your Experience'
              }
            </h2>
            <p className="text-white/90 text-sm">
              {categoryLabel} ({currentStep + 1}/{steps.length})
            </p>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <motion.div
                className="h-2 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {language === 'pt' 
                ? 'Selecione suas preferências:'
                : 'Select your preferences:'
              }
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {category.options.map((option) => {
                const isSelected = preferences[categoryId]?.includes(option.value) || false;
                const optionLabel = language === 'pt' && option.labelPt ? option.labelPt : option.label;

                return (
                  <motion.button
                    key={option.value}
                    className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-50 to-green-50 border-2 border-red-200 text-red-700'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                    onClick={() => updatePreferences(categoryId, option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xl">{option.flag || option.icon}</span>
                    <span className="font-medium">{optionLabel}</span>
                    {isSelected && (
                      <motion.div
                        className="ml-auto w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {currentStep > 0 && (
                <button
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  {language === 'pt' ? 'Anterior' : 'Previous'}
                </button>
              )}

              <button
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    completeSetup();
                  }
                }}
              >
                {currentStep < steps.length - 1 
                  ? (language === 'pt' ? 'Próximo' : 'Next')
                  : (language === 'pt' ? 'Concluir' : 'Complete')
                }
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-gray-900">
              {language === 'pt' ? 'Para Si' : 'For You'}
            </h4>
          </div>

          <button
            className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
            onClick={() => setShowPreferences(true)}
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span>{personalizationScore}%</span>
          </button>
        </div>

        {/* Personalized Recommendations */}
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.slice(0, 3).map((rec, index) => (
              <motion.div
                key={rec.id}
                className="border border-gray-200 rounded-xl p-3 hover:border-red-200 hover:bg-red-50/50 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1">
                    {rec.title}
                  </h5>
                  <div className="flex items-center gap-1 ml-2 text-xs text-red-600 font-medium">
                    <StarIcon className="w-3 h-3" />
                    {rec.score}%
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2">
                  {language === 'pt' ? rec.matchReasonPt : rec.matchReason}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {rec.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3" />
                    {rec.location}
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              className="w-full py-2 text-center text-red-600 hover:text-red-700 font-medium text-sm hover:bg-red-50 rounded-lg transition-colors"
              onClick={generateRecommendations}
            >
              {language === 'pt' ? 'Ver Mais Recomendações' : 'See More Recommendations'}
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <HeartIcon className="w-6 h-6 text-red-600" />
            </div>
            <h5 className="font-medium text-gray-900 mb-2">
              {language === 'pt' ? 'Personalizar Experiência' : 'Personalize Your Experience'}
            </h5>
            <p className="text-sm text-gray-600 mb-4">
              {language === 'pt' 
                ? 'Configure suas preferências para receber recomendações personalizadas'
                : 'Set up your preferences to get personalized recommendations'
              }
            </p>
            <button
              className="bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-shadow"
              onClick={() => setShowPreferences(true)}
            >
              {language === 'pt' ? 'Começar' : 'Get Started'}
            </button>
          </div>
        )}
      </div>

      {/* Setup Wizard */}
      <AnimatePresence>
        {showPreferences && <SetupWizard />}
      </AnimatePresence>
    </>
  );
}

export default PersonalizationEngine;