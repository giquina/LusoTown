'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  UserCircleIcon, 
  CalendarIcon, 
  BuildingStorefrontIcon,
  HeartIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

interface OnboardingStep {
  id: string;
  title: { en: string; pt: string };
  description: { en: string; pt: string };
  icon: React.ReactNode;
  completed: boolean;
  action?: () => void;
  route?: string;
}

interface OnboardingProgressProps {
  className?: string;
  showInHeader?: boolean;
  minimized?: boolean;
}

export default function OnboardingProgressIndicator({ 
  className = '',
  showInHeader = false,
  minimized = false
}: OnboardingProgressProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(!minimized);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([]);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize onboarding steps
  useEffect(() => {
    const steps: OnboardingStep[] = [
      {
        id: 'profile-setup',
        title: {
          en: 'Complete Your Profile',
          pt: 'Complete o Seu Perfil'
        },
        description: {
          en: 'Add your photo and Portuguese cultural background',
          pt: 'Adicione sua foto e background cultural português'
        },
        icon: <UserCircleIcon className="w-5 h-5" />,
        completed: checkProfileCompletion(),
        route: '/profile'
      },
      {
        id: 'first-event',
        title: {
          en: 'Join Your First Event',
          pt: 'Participe do Seu Primeiro Evento'
        },
        description: {
          en: 'Explore Portuguese cultural events in London',
          pt: 'Explore eventos culturais portugueses em Londres'
        },
        icon: <CalendarIcon className="w-5 h-5" />,
        completed: checkEventParticipation(),
        route: '/events'
      },
      {
        id: 'business-connection',
        title: {
          en: 'Connect with Portuguese Businesses',
          pt: 'Conecte-se com Negócios Portugueses'
        },
        description: {
          en: 'Discover Portuguese-owned businesses near you',
          pt: 'Descubra negócios portugueses perto de você'
        },
        icon: <BuildingStorefrontIcon className="w-5 h-5" />,
        completed: checkBusinessConnection(),
        route: '/business-directory'
      },
      {
        id: 'cultural-match',
        title: {
          en: 'Find Your Cultural Match',
          pt: 'Encontre Sua Compatibilidade Cultural'
        },
        description: {
          en: 'Use our AI to connect with like-minded Portuguese speakers',
          pt: 'Use nossa IA para conectar com falantes portugueses similares'
        },
        icon: <HeartIcon className="w-5 h-5" />,
        completed: checkCulturalMatch(),
        route: '/matches'
      }
    ];

    setOnboardingSteps(steps);
    const completed = steps.filter(step => step.completed).length;
    setCompletedSteps(completed);

    // Show celebration when all steps are completed
    if (completed === steps.length && completed > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, []);

  // Check completion functions (these would integrate with your app's state)
  function checkProfileCompletion(): boolean {
    // This would check if user has completed profile
    // For demo purposes, checking localStorage
    return localStorage.getItem('lusotown_profile_completed') === 'true';
  }

  function checkEventParticipation(): boolean {
    // This would check if user has joined an event
    return localStorage.getItem('lusotown_event_joined') === 'true';
  }

  function checkBusinessConnection(): boolean {
    // This would check if user has interacted with business directory
    return localStorage.getItem('lusotown_business_explored') === 'true';
  }

  function checkCulturalMatch(): boolean {
    // This would check if user has used the matching system
    return localStorage.getItem('lusotown_match_found') === 'true';
  }

  const progressPercentage = (completedSteps / onboardingSteps.length) * 100;

  const handleStepClick = (step: OnboardingStep) => {
    if (step.route) {
      window.location.href = step.route;
    } else if (step.action) {
      step.action();
    }
  };

  const markStepCompleted = (stepId: string) => {
    // For demo purposes
    localStorage.setItem(`lusotown_${stepId.replace('-', '_')}_completed`, 'true');
    
    setOnboardingSteps(prev => 
      prev.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
    
    setCompletedSteps(prev => prev + 1);
  };

  const dismissOnboarding = () => {
    localStorage.setItem('lusotown_onboarding_dismissed', 'true');
    setIsExpanded(false);
  };

  // Don't show if onboarding is dismissed and all steps completed
  const isDismissed = localStorage.getItem('lusotown_onboarding_dismissed') === 'true';
  if (isDismissed && completedSteps === onboardingSteps.length) {
    return null;
  }

  const HeaderVersion = () => (
    <div className={`relative ${className}`}>
      {/* Compact header version */}
      <div className="flex items-center space-x-3">
        {/* Progress circle */}
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray={`${progressPercentage}, 100`}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-green-600">
              {completedSteps}
            </span>
          </div>
        </div>

        {/* Progress text */}
        <div className="hidden sm:block">
          <div className="text-sm font-medium text-gray-700">
            {language === 'pt' 
              ? `${completedSteps} de ${onboardingSteps.length} concluídos`
              : `${completedSteps} of ${onboardingSteps.length} completed`
            }
          </div>
          {completedSteps < onboardingSteps.length && (
            <div className="text-xs text-gray-500">
              {language === 'pt' 
                ? 'Complete sua jornada lusófona'
                : 'Complete your Portuguese journey'
              }
            </div>
          )}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={language === 'pt' ? 'Expandir progresso' : 'Expand progress'}
        >
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
      </div>

      {/* Expanded dropdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                  {language === 'pt' ? 'Jornada Lusófona' : 'Portuguese Journey'}
                </h3>
                <button
                  onClick={dismissOnboarding}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  aria-label={language === 'pt' ? 'Fechar' : 'Close'}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-primary-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {progressPercentage.toFixed(0)}% {language === 'pt' ? 'completo' : 'complete'}
                </p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    step.completed 
                      ? 'bg-green-50 border-green-200 text-green-900' 
                      : 'bg-gray-50 border-gray-200 hover:bg-primary-50 hover:border-primary-200'
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {step.completed ? (
                      <CheckCircleIconSolid className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium">
                      {language === 'pt' ? step.title.pt : step.title.en}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'pt' ? step.description.pt : step.description.en}
                    </p>
                  </div>
                  {!step.completed && (
                    <div className="text-xs text-primary-600 font-medium">
                      {language === 'pt' ? 'Iniciar' : 'Start'}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {completedSteps === onboardingSteps.length && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-primary-50 border-t border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <h4 className="font-medium text-green-900">
                    {language === 'pt' ? 'Parabéns!' : 'Congratulations!'}
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    {language === 'pt' 
                      ? 'Você completou sua jornada lusófona!'
                      : "You've completed your Portuguese journey!"
                    }
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-full right-0 mt-2 p-4 bg-gradient-to-r from-green-500 to-primary-500 text-white rounded-xl shadow-2xl z-50"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🇵🇹🎉</div>
              <div className="font-semibold">
                {language === 'pt' ? 'Jornada Completa!' : 'Journey Complete!'}
              </div>
              <div className="text-sm opacity-90 mt-1">
                {language === 'pt' ? 'Bem-vindo à comunidade!' : 'Welcome to the community!'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const FullVersion = () => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {language === 'pt' ? 'Sua Jornada Lusófona' : 'Your Portuguese Journey'}
            </h2>
            <p className="text-gray-600 mt-1">
              {language === 'pt' 
                ? 'Complete estes passos para aproveitar ao máximo a comunidade'
                : 'Complete these steps to get the most out of the community'
              }
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {completedSteps}/{onboardingSteps.length}
            </div>
            <div className="text-sm text-gray-500">
              {language === 'pt' ? 'concluídos' : 'completed'}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-primary-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {progressPercentage.toFixed(0)}% {language === 'pt' ? 'completo' : 'complete'}
          </p>
        </div>

        <div className="space-y-4">
          {onboardingSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                step.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-primary-50 hover:border-primary-300'
              }`}
              onClick={() => handleStepClick(step)}
            >
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircleIconSolid className="w-8 h-8 text-green-500" />
                ) : (
                  <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {language === 'pt' ? step.title.pt : step.title.en}
                </h3>
                <p className="text-gray-600 mt-1">
                  {language === 'pt' ? step.description.pt : step.description.en}
                </p>
              </div>
              {!step.completed && (
                <div className="flex-shrink-0">
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {language === 'pt' ? 'Iniciar' : 'Start'}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {completedSteps === onboardingSteps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 bg-gradient-to-r from-green-50 to-primary-50 rounded-xl border border-green-200"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🇵🇹🎉🇧🇷</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">
                {language === 'pt' ? 'Parabéns!' : 'Congratulations!'}
              </h3>
              <p className="text-green-700 mb-4">
                {language === 'pt' 
                  ? 'Você completou sua jornada de integração na comunidade lusófona!'
                  : "You've completed your integration journey into the Portuguese-speaking community!"
                }
              </p>
              <button
                onClick={dismissOnboarding}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {language === 'pt' ? 'Continuar Explorando' : 'Continue Exploring'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return showInHeader ? <HeaderVersion /> : <FullVersion />;
}