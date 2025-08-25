"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  StarIcon,
  HeartIcon,
  GlobeEuropeAfricaIcon,
  MusicalNoteIcon,
  CakeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  LanguageIcon,
  SparklesIcon,
  FireIcon,
  HandRaisedIcon,
  CameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
  FireIcon as FireSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Lusophone Cultural Onboarding Flow
interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (userData: UserOnboardingData) => void;
}

interface UserOnboardingData {
  heritage: string[];
  culturalInterests: string[];
  languages: string[];
  location: string;
  ageRange: string;
  profession?: string;
  education?: string;
  lookingFor: string[];
  profilePhoto?: string;
  bio?: string;
}

export function MobilePortugueseOnboarding({
  isOpen,
  onClose,
  onComplete
}: OnboardingProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserOnboardingData>({
    heritage: [],
    culturalInterests: [],
    languages: [],
    location: '',
    ageRange: '',
    lookingFor: []
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const steps = [
    { 
      id: 'welcome', 
      title: language === 'pt' ? 'Bem-vindos' : 'Welcome',
      component: WelcomeStep 
    },
    { 
      id: 'heritage', 
      title: language === 'pt' ? 'Herança' : 'Heritage',
      component: HeritageStep 
    },
    { 
      id: 'interests', 
      title: language === 'pt' ? 'Interesses' : 'Interests',
      component: InterestsStep 
    },
    { 
      id: 'languages', 
      title: language === 'pt' ? 'Línguas' : 'Languages',
      component: LanguagesStep 
    },
    { 
      id: 'profile', 
      title: language === 'pt' ? 'Perfil' : 'Profile',
      component: ProfileStep 
    },
    { 
      id: 'complete', 
      title: language === 'pt' ? 'Completo' : 'Complete',
      component: CompleteStep 
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(userData);
    onClose();
  };

  const updateUserData = (updates: Partial<UserOnboardingData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        className="w-full max-w-md max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: currentStep * 60 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-10 h-10 bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-sm font-bold">LT</span>
              </motion.div>
              <div>
                <div className="font-bold text-gray-900">LusoTown</div>
                <div className="text-sm text-gray-500">
                  {steps[currentStep]?.title}
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all lusophone-touch-target"
              aria-label="Close onboarding"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
              <span>{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {CurrentStepComponent && (
            <CurrentStepComponent
              userData={userData}
              updateUserData={updateUserData}
              onNext={nextStep}
              onPrevious={previousStep}
              onComplete={handleComplete}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Step 1: Welcome & Cultural Introduction
function WelcomeStep({ onNext, isFirstStep }: any) {
  const { language } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-3xl">🌍</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 leading-tight responsive-portuguese-heading"
        >
          {language === 'pt' 
            ? 'Bem-vindos à Comunidade Lusófona!'
            : 'Welcome to the Lusophone Community!'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 leading-relaxed responsive-portuguese-text"
        >
          {language === 'pt'
            ? 'Vamos criar seu perfil para conectá-lo com outros falantes de português no Reino Unido. Celebramos TODAS as origens lusófonas!'
            : 'Let\'s create your profile to connect you with other Portuguese speakers in the United Kingdom. We celebrate ALL Portuguese-speaking backgrounds!'}
        </motion.p>
      </motion.div>

      {/* Cultural Diversity Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-2xl p-4 border border-red-200"
      >
        <div className="text-center mb-4">
          <h3 className="font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Nossa Diversidade Cultural' : 'Our Cultural Diversity'}
          </h3>
          <div className="text-3xl mb-2">🇵🇹🇧🇷🇨🇻🇦🇴🇲🇿🇬🇼🇸🇹🇹🇱</div>
          <p className="text-sm text-gray-600">
            {language === 'pt'
              ? 'Portugal • Brasil • Cabo Verde • Angola • Moçambique • Guiné-Bissau • São Tomé • Timor-Leste'
              : 'Portugal • Brazil • Cape Verde • Angola • Mozambique • Guinea-Bissau • São Tomé • Timor-Leste'}
          </p>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="text-center p-3 bg-white border border-gray-200 rounded-xl">
          <div className="text-2xl font-bold text-red-600">750+</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Membros' : 'Members'}
          </div>
        </div>
        <div className="text-center p-3 bg-white border border-gray-200 rounded-xl">
          <div className="text-2xl font-bold text-green-600">50+</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Eventos/mês' : 'Events/month'}
          </div>
        </div>
        <div className="text-center p-3 bg-white border border-gray-200 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">98%</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Satisfação' : 'Satisfaction'}
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 lusophone-touch-target"
      >
        <span>
          {language === 'pt' ? 'Vamos Começar!' : 'Let\'s Get Started!'}
        </span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

// Step 2: Heritage Selection
function HeritageStep({ userData, updateUserData, onNext, onPrevious }: any) {
  const { language } = useLanguage();
  const [selectedHeritage, setSelectedHeritage] = useState<string[]>(userData.heritage || []);

  const heritageOptions = [
    { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
    { code: 'br', name: language === 'pt' ? 'Brasil' : 'Brazil', flag: '🇧🇷' },
    { code: 'cv', name: language === 'pt' ? 'Cabo Verde' : 'Cape Verde', flag: '🇨🇻' },
    { code: 'ao', name: 'Angola', flag: '🇦🇴' },
    { code: 'mz', name: language === 'pt' ? 'Moçambique' : 'Mozambique', flag: '🇲🇿' },
    { code: 'gw', name: language === 'pt' ? 'Guiné-Bissau' : 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'st', name: language === 'pt' ? 'São Tomé' : 'São Tomé', flag: '🇸🇹' },
    { code: 'tl', name: language === 'pt' ? 'Timor-Leste' : 'Timor-Leste', flag: '🇹🇱' },
    { code: 'mixed', name: language === 'pt' ? 'Herança Mista' : 'Mixed Heritage', flag: '🌍' },
    { code: 'uk', name: language === 'pt' ? 'Nascido no RU' : 'UK-Born', flag: '🇬🇧' }
  ];

  const toggleHeritage = (heritage: string) => {
    const updated = selectedHeritage.includes(heritage)
      ? selectedHeritage.filter(h => h !== heritage)
      : [...selectedHeritage, heritage];
    setSelectedHeritage(updated);
    updateUserData({ heritage: updated });
  };

  const handleNext = () => {
    if (selectedHeritage.length > 0) {
      onNext();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Qual é a sua herança lusófona?'
            : 'What is your Portuguese heritage?'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Selecione todas as origens que representam você. Múltiplas seleções são bem-vindas!'
            : 'Select all backgrounds that represent you. Multiple selections are welcome!'}
        </p>
      </motion.div>

      {/* Heritage Grid */}
      <div className="grid grid-cols-2 gap-3">
        {heritageOptions.map((option, index) => {
          const isSelected = selectedHeritage.includes(option.code);
          
          return (
            <motion.button
              key={option.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleHeritage(option.code)}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-200 text-center min-h-[100px] flex flex-col items-center justify-center
                ${isSelected 
                  ? 'border-red-500 bg-red-50 shadow-lg ring-2 ring-red-200' 
                  : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                }
                lusophone-touch-target
              `}
            >
              <div className="text-3xl mb-2">{option.flag}</div>
              <div className="text-sm font-semibold text-gray-900 leading-tight">
                {option.name}
              </div>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all lusophone-touch-target"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedHeritage.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all lusophone-touch-target
            ${selectedHeritage.length > 0
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Step 3: Cultural Interests
function InterestsStep({ userData, updateUserData, onNext, onPrevious }: any) {
  const { language } = useLanguage();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userData.culturalInterests || []);

  const interestCategories = [
    {
      category: language === 'pt' ? 'Música' : 'Music',
      icon: MusicalNoteIcon,
      interests: [
        'Fado',
        'Samba',
        'Bossa Nova',
        'Morna',
        'Kizomba',
        'Kuduro',
        'Marrabenta',
        'MPB',
        'Coladeira'
      ]
    },
    {
      category: language === 'pt' ? 'Cultura' : 'Culture',
      icon: GlobeEuropeAfricaIcon,
      interests: [
        language === 'pt' ? 'Literatura Lusófona' : 'Lusophone Literature',
        language === 'pt' ? 'Cinema Português' : 'Lusophone Cinema',
        language === 'pt' ? 'Artes Visuais' : 'Visual Arts',
        language === 'pt' ? 'Teatro' : 'Theatre',
        language === 'pt' ? 'Poesia' : 'Poetry',
        language === 'pt' ? 'História' : 'History'
      ]
    },
    {
      category: language === 'pt' ? 'Tradições' : 'Traditions',
      icon: FireSolidIcon,
      interests: [
        'Santos Populares',
        'Festa Junina',
        'Carnaval',
        language === 'pt' ? 'Culinária Tradicional' : 'Traditional Cuisine',
        language === 'pt' ? 'Danças Folclóricas' : 'Folk Dances',
        language === 'pt' ? 'Festivais Religiosos' : 'Religious Festivals'
      ]
    }
  ];

  const toggleInterest = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(updated);
    updateUserData({ culturalInterests: updated });
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      onNext();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Quais são seus interesses culturais?'
            : 'What are your cultural interests?'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Selecione os aspectos da cultura lusófona que mais lhe interessam'
            : 'Select the aspects of Portuguese culture that interest you most'}
        </p>
      </motion.div>

      {/* Interest Categories */}
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {interestCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <category.icon className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">{category.category}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {category.interests.map((interest, index) => {
                const isSelected = selectedInterests.includes(interest);
                
                return (
                  <motion.button
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium text-center
                      ${isSelected 
                        ? 'border-red-500 bg-red-50 text-red-700 shadow-md' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300'
                      }
                      lusophone-touch-target
                    `}
                  >
                    {interest}
                    {isSelected && (
                      <CheckIcon className="w-4 h-4 inline ml-1" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selection Counter */}
      <div className="text-center p-3 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          {selectedInterests.length} {language === 'pt' ? 'interesses selecionados' : 'interests selected'}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all lusophone-touch-target"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedInterests.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all lusophone-touch-target
            ${selectedInterests.length > 0
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Step 4: Languages
function LanguagesStep({ userData, updateUserData, onNext, onPrevious }: any) {
  const { language } = useLanguage();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(userData.languages || ['Lusophone']);

  const languageOptions = [
    { code: 'Lusophone', name: language === 'pt' ? 'Português' : 'Lusophone', flag: '🇵🇹' },
    { code: 'English', name: language === 'pt' ? 'Inglês' : 'English', flag: '🇬🇧' },
    { code: 'Spanish', name: language === 'pt' ? 'Espanhol' : 'Spanish', flag: '🇪🇸' },
    { code: 'French', name: language === 'pt' ? 'Francês' : 'French', flag: '🇫🇷' },
    { code: 'Italian', name: language === 'pt' ? 'Italiano' : 'Italian', flag: '🇮🇹' },
    { code: 'Crioulo', name: 'Crioulo', flag: '🇨🇻' },
    { code: 'Kimbundu', name: 'Kimbundu', flag: '🇦🇴' },
    { code: 'Changana', name: 'Changana', flag: '🇲🇿' }
  ];

  const toggleLanguage = (languageCode: string) => {
    const updated = selectedLanguages.includes(languageCode)
      ? selectedLanguages.filter(l => l !== languageCode)
      : [...selectedLanguages, languageCode];
    setSelectedLanguages(updated);
    updateUserData({ languages: updated });
  };

  const handleNext = () => {
    if (selectedLanguages.length > 0) {
      onNext();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Que línguas você fala?'
            : 'What languages do you speak?'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Isso nos ajudará a conectá-lo com pessoas que falam as mesmas línguas'
            : 'This will help us connect you with people who speak the same languages'}
        </p>
      </motion.div>

      {/* Language Grid */}
      <div className="grid grid-cols-2 gap-3">
        {languageOptions.map((option, index) => {
          const isSelected = selectedLanguages.includes(option.code);
          
          return (
            <motion.button
              key={option.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleLanguage(option.code)}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-200 text-center min-h-[80px] flex flex-col items-center justify-center
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }
                lusophone-touch-target
              `}
            >
              <div className="text-2xl mb-1">{option.flag}</div>
              <div className="text-sm font-semibold text-gray-900">
                {option.name}
              </div>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all lusophone-touch-target"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedLanguages.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all lusophone-touch-target
            ${selectedLanguages.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Step 5: Profile Information
function ProfileStep({ userData, updateUserData, onNext, onPrevious }: any) {
  const { language } = useLanguage();
  const [location, setLocation] = useState(userData.location || '');
  const [ageRange, setAgeRange] = useState(userData.ageRange || '');
  const [lookingFor, setLookingFor] = useState<string[]>(userData.lookingFor || []);

  const ageRanges = [
    '18-25',
    '26-35', 
    '36-45',
    '46-55',
    '56-65',
    '65+'
  ];

  const lookingForOptions = [
    { 
      code: 'friends', 
      label: language === 'pt' ? 'Amigos' : 'Friends',
      icon: UserGroupIcon 
    },
    { 
      code: 'dating', 
      label: language === 'pt' ? 'Relacionamentos' : 'Dating',
      icon: HeartSolidIcon 
    },
    { 
      code: 'events', 
      label: language === 'pt' ? 'Eventos Culturais' : 'Cultural Events',
      icon: CalendarDaysIcon 
    },
    { 
      code: 'business', 
      label: language === 'pt' ? 'Networking' : 'Business',
      icon: BuildingOffice2Icon 
    },
    { 
      code: 'language', 
      label: language === 'pt' ? 'Prática de Língua' : 'Language Practice',
      icon: LanguageIcon 
    },
    { 
      code: 'culture', 
      label: language === 'pt' ? 'Troca Cultural' : 'Cultural Exchange',
      icon: GlobeEuropeAfricaIcon 
    }
  ];

  const ukCities = [
    'London',
    'Manchester',
    'Birmingham',
    'Liverpool',
    'Leeds',
    'Sheffield',
    'Bristol',
    'Edinburgh',
    'Glasgow',
    'Cardiff',
    'Newcastle',
    'Nottingham',
    'Leicester',
    'Oxford',
    'Cambridge'
  ];

  const toggleLookingFor = (option: string) => {
    const updated = lookingFor.includes(option)
      ? lookingFor.filter(l => l !== option)
      : [...lookingFor, option];
    setLookingFor(updated);
    updateUserData({ lookingFor: updated });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateUserData({ location: value });
  };

  const handleAgeRangeChange = (value: string) => {
    setAgeRange(value);
    updateUserData({ ageRange: value });
  };

  const handleNext = () => {
    if (location && ageRange && lookingFor.length > 0) {
      onNext();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Vamos completar seu perfil'
            : 'Let\'s complete your profile'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Algumas informações básicas para conectá-lo melhor'
            : 'Some basic information to connect you better'}
        </p>
      </motion.div>

      {/* Location */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Localização no Reino Unido' : 'Location in United Kingdom'}
        </label>
        <select
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all lusophone-touch-target"
        >
          <option value="">
            {language === 'pt' ? 'Selecione sua cidade' : 'Select your city'}
          </option>
          {ukCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Age Range */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Faixa Etária' : 'Age Range'}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ageRanges.map((range) => (
            <button
              key={range}
              onClick={() => handleAgeRangeChange(range)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
                ${ageRange === range 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                }
                lusophone-touch-target
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Looking For */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'O que você procura?' : 'What are you looking for?'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {lookingForOptions.map((option) => {
            const isSelected = lookingFor.includes(option.code);
            const IconComponent = option.icon;
            
            return (
              <button
                key={option.code}
                onClick={() => toggleLookingFor(option.code)}
                className={`
                  flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium
                  ${isSelected 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                  }
                  lusophone-touch-target
                `}
              >
                <IconComponent className="w-4 h-4" />
                <span className="flex-1 text-left">{option.label}</span>
                {isSelected && <CheckIcon className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all lusophone-touch-target"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!location || !ageRange || lookingFor.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all lusophone-touch-target
            ${location && ageRange && lookingFor.length > 0
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>{language === 'pt' ? 'Finalizar' : 'Finish'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Step 6: Completion
function CompleteStep({ userData, onComplete }: any) {
  const { language } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
        >
          <CheckIcon className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 responsive-portuguese-heading"
        >
          {language === 'pt' 
            ? 'Bem-vindos à comunidade!'
            : 'Welcome to the community!'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 leading-relaxed responsive-portuguese-text"
        >
          {language === 'pt'
            ? 'Seu perfil foi criado com sucesso! Agora você pode começar a explorar eventos, conectar-se com outros lusófonos e celebrar nossa rica cultura.'
            : 'Your profile has been created successfully! Now you can start exploring events, connecting with other Portuguese speakers, and celebrating our rich culture.'}
        </motion.p>
      </motion.div>

      {/* Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-2xl p-4 border border-red-200"
      >
        <h3 className="font-bold text-gray-900 mb-3">
          {language === 'pt' ? 'Resumo do Perfil' : 'Profile Summary'}
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'pt' ? 'Herança:' : 'Heritage:'}
            </span>
            <span className="ml-2 text-gray-600">
              {userData.heritage?.join(', ') || 'N/A'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'pt' ? 'Interesses:' : 'Interests:'}
            </span>
            <span className="ml-2 text-gray-600">
              {userData.culturalInterests?.slice(0, 3).join(', ') || 'N/A'}
              {userData.culturalInterests?.length > 3 && ` +${userData.culturalInterests.length - 3}`}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'pt' ? 'Línguas:' : 'Languages:'}
            </span>
            <span className="ml-2 text-gray-600">
              {userData.languages?.join(', ') || 'N/A'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              {language === 'pt' ? 'Localização:' : 'Location:'}
            </span>
            <span className="ml-2 text-gray-600">{userData.location || 'N/A'}</span>
          </div>
        </div>
      </motion.div>

      {/* Complete Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 lusophone-touch-target"
      >
        <span>
          {language === 'pt' ? 'Começar a Explorar!' : 'Start Exploring!'}
        </span>
        <SparklesIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

export default MobilePortugueseOnboarding;