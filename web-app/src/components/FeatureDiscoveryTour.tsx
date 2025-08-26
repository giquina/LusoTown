'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  PlayIcon,
  StarIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  AcademicCapIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface TourStep {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  target: string; // CSS selector for the element to highlight
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: React.ComponentType<{ className?: string }>;
  action?: {
    text: {
      en: string;
      pt: string;
    };
    onClick: () => void;
  };
  category: 'ai' | 'social' | 'cultural' | 'business' | 'education';
}

const FEATURE_TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: {
      en: 'Welcome to LusoTown!',
      pt: 'Bem-vindo ao LusoTown!'
    },
    description: {
      en: 'Your Portuguese-speaking community platform in the UK. Let\'s discover what makes LusoTown special!',
      pt: 'Sua plataforma da comunidade lusófona no Reino Unido. Vamos descobrir o que torna o LusoTown especial!'
    },
    target: 'body',
    placement: 'center',
    icon: SparklesIcon,
    category: 'social'
  },
  {
    id: 'lusobot-chat',
    title: {
      en: 'Meet LusoBot - Your AI Assistant',
      pt: 'Conheça o LusoBot - Seu Assistente IA'
    },
    description: {
      en: 'Chat in Portuguese or English! Get help finding events, businesses, or cultural information.',
      pt: 'Converse em português ou inglês! Obtenha ajuda para encontrar eventos, empresas ou informações culturais.'
    },
    target: '[data-testid="lusobot-widget"]',
    placement: 'left',
    icon: ChatBubbleLeftRightIcon,
    action: {
      text: {
        en: 'Try LusoBot',
        pt: 'Experimentar LusoBot'
      },
      onClick: () => {
        const lusoBotWidget = document.querySelector('[data-testid="lusobot-widget"]');
        if (lusoBotWidget) (lusoBotWidget as HTMLElement).click();
      }
    },
    category: 'ai'
  },
  {
    id: 'cultural-calendar',
    title: {
      en: 'Portuguese Cultural Events',
      pt: 'Eventos Culturais Portugueses'
    },
    description: {
      en: 'Discover authentic Fado nights, festivals, and PALOP cultural celebrations throughout the UK.',
      pt: 'Descubra noites autênticas de Fado, festivais e celebrações culturais PALOP em todo o Reino Unido.'
    },
    target: '[data-feature="cultural-calendar"]',
    placement: 'top',
    icon: CalendarDaysIcon,
    category: 'cultural'
  },
  {
    id: 'palop-heritage',
    title: {
      en: 'PALOP Countries Heritage',
      pt: 'Património dos Países PALOP'
    },
    description: {
      en: 'Explore the rich heritage of Cape Verde, Angola, Mozambique, Guinea-Bissau, and São Tomé and Príncipe.',
      pt: 'Explore o rico património de Cabo Verde, Angola, Moçambique, Guiné-Bissau e São Tomé e Príncipe.'
    },
    target: '[data-feature="palop-heritage"]',
    placement: 'bottom',
    icon: StarIcon,
    category: 'cultural'
  },
  {
    id: 'matches-system',
    title: {
      en: 'Cultural Compatibility Matching',
      pt: 'Correspondência de Compatibilidade Cultural'
    },
    description: {
      en: 'Find community members who share your interests, values, and cultural background.',
      pt: 'Encontre membros da comunidade que compartilham seus interesses, valores e origem cultural.'
    },
    target: '[data-feature="matches-section"]',
    placement: 'top',
    icon: HeartIcon,
    category: 'social'
  },
  {
    id: 'business-directory',
    title: {
      en: 'Portuguese Business Directory',
      pt: 'Diretório de Empresas Portuguesas'
    },
    description: {
      en: 'Support local Portuguese businesses - from restaurants to services, all verified and community-recommended.',
      pt: 'Apoie empresas portuguesas locais - de restaurantes a serviços, todos verificados e recomendados pela comunidade.'
    },
    target: '[data-feature="business-directory"]',
    placement: 'bottom',
    icon: ShoppingBagIcon,
    category: 'business'
  },
  {
    id: 'university-partnerships',
    title: {
      en: 'University Partnerships',
      pt: 'Parcerias Universitárias'
    },
    description: {
      en: 'Connect with Portuguese students at UCL, King\'s College, Imperial, Oxford, Cambridge, and more!',
      pt: 'Conecte-se com estudantes portugueses na UCL, King\'s College, Imperial, Oxford, Cambridge e muito mais!'
    },
    target: '[data-feature="university-section"]',
    placement: 'top',
    icon: AcademicCapIcon,
    category: 'education'
  },
  {
    id: 'location-services',
    title: {
      en: 'UK-Wide Coverage',
      pt: 'Cobertura em Todo o Reino Unido'
    },
    description: {
      en: 'From London to Manchester, Edinburgh to Cardiff - find your Portuguese community anywhere in the UK.',
      pt: 'De Londres a Manchester, Edimburgo a Cardiff - encontre sua comunidade portuguesa em qualquer lugar do Reino Unido.'
    },
    target: '[data-feature="location-selector"]',
    placement: 'right',
    icon: MapPinIcon,
    category: 'social'
  },
  {
    id: 'complete',
    title: {
      en: 'You\'re All Set!',
      pt: 'Está Tudo Pronto!'
    },
    description: {
      en: 'Start exploring, connecting, and celebrating Portuguese culture in the UK. Bem-vindos à família LusoTown!',
      pt: 'Comece a explorar, conectar-se e celebrar a cultura portuguesa no Reino Unido. Welcome to the LusoTown family!'
    },
    target: 'body',
    placement: 'center',
    icon: CheckIcon,
    category: 'social'
  }
];

interface FeatureDiscoveryTourProps {
  className?: string;
  autoStart?: boolean;
  showOnFirstVisit?: boolean;
  specificSteps?: string[];
}

export default function FeatureDiscoveryTour({
  className = '',
  autoStart = false,
  showOnFirstVisit = true,
  specificSteps
}: FeatureDiscoveryTourProps) {
  const { language } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [tourCompleted, setTourCompleted] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  // Filter steps if specific steps provided
  const tourSteps = specificSteps 
    ? FEATURE_TOUR_STEPS.filter(step => specificSteps.includes(step.id))
    : FEATURE_TOUR_STEPS;

  const currentStep = tourSteps[currentStepIndex];

  // Check first visit and auto-start
  useEffect(() => {
    if (!showOnFirstVisit) return;

    const hasTakenTour = localStorage.getItem('lusotown-feature-tour-completed');
    if (!hasTakenTour && autoStart) {
      setTimeout(() => {
        startTour();
      }, 2000);
    }
  }, [autoStart, showOnFirstVisit]);

  // Update highlight position when step changes
  useEffect(() => {
    if (!isActive || !currentStep) return;

    const updateHighlight = () => {
      if (currentStep.target === 'body') {
        setHighlightPosition({ x: 0, y: 0, width: 0, height: 0 });
        return;
      }

      const element = document.querySelector(currentStep.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightPosition({
          x: rect.left - 8,
          y: rect.top - 8,
          width: rect.width + 16,
          height: rect.height + 16
        });
      }
    };

    updateHighlight();

    // Setup resize observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new ResizeObserver(updateHighlight);
    const element = document.querySelector(currentStep.target);
    if (element) {
      observerRef.current.observe(element);
    }

    // Listen for window resize
    window.addEventListener('resize', updateHighlight);
    window.addEventListener('scroll', updateHighlight);

    return () => {
      window.removeEventListener('resize', updateHighlight);
      window.removeEventListener('scroll', updateHighlight);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentStep, isActive]);

  const startTour = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
    setTourCompleted(false);
  };

  const nextStep = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const skipTour = () => {
    completeTour();
  };

  const completeTour = () => {
    setIsActive(false);
    setTourCompleted(true);
    localStorage.setItem('lusotown-feature-tour-completed', 'true');
  };

  const resetTour = () => {
    localStorage.removeItem('lusotown-feature-tour-completed');
    setTourCompleted(false);
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ai: 'bg-purple-600',
      social: 'bg-red-600',
      cultural: 'bg-amber-600',
      business: 'bg-green-600',
      education: 'bg-blue-600'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  const getTourPosition = () => {
    if (!currentStep || currentStep.placement === 'center') {
      return {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const { placement } = currentStep;
    const baseStyle = { position: 'fixed' as const };

    switch (placement) {
      case 'top':
        return {
          ...baseStyle,
          bottom: `${window.innerHeight - highlightPosition.y + 20}px`,
          left: `${highlightPosition.x + highlightPosition.width / 2}px`,
          transform: 'translateX(-50%)'
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: `${highlightPosition.y + highlightPosition.height + 20}px`,
          left: `${highlightPosition.x + highlightPosition.width / 2}px`,
          transform: 'translateX(-50%)'
        };
      case 'left':
        return {
          ...baseStyle,
          top: `${highlightPosition.y + highlightPosition.height / 2}px`,
          right: `${window.innerWidth - highlightPosition.x + 20}px`,
          transform: 'translateY(-50%)'
        };
      case 'right':
        return {
          ...baseStyle,
          top: `${highlightPosition.y + highlightPosition.height / 2}px`,
          left: `${highlightPosition.x + highlightPosition.width + 20}px`,
          transform: 'translateY(-50%)'
        };
      default:
        return {
          ...baseStyle,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  if (!isActive && !tourCompleted) {
    return (
      <div className="fixed bottom-4 right-4 z-[100]">
        <button
          onClick={startTour}
          className="p-3 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          title={language === 'pt' ? 'Iniciar tour de funcionalidades' : 'Start feature tour'}
        >
          <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="sr-only">
            {language === 'pt' ? 'Iniciar tour de funcionalidades' : 'Start feature tour'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isActive && currentStep && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[9998] bg-black bg-opacity-60 ${className}`}
            style={{ backdropFilter: 'blur(2px)' }}
          >
            {/* Highlight spotlight */}
            {currentStep.target !== 'body' && highlightPosition.width > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute bg-white rounded-lg shadow-2xl"
                style={{
                  left: highlightPosition.x,
                  top: highlightPosition.y,
                  width: highlightPosition.width,
                  height: highlightPosition.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)',
                  zIndex: 9999
                }}
              />
            )}
          </motion.div>

          {/* Tour card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-[10000] max-w-sm mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            style={getTourPosition()}
          >
            {/* Header */}
            <div className={`${getCategoryColor(currentStep.category)} text-white p-4`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <currentStep.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">
                      {currentStep.title[language === 'pt' ? 'pt' : 'en']}
                    </h3>
                    <p className="text-xs opacity-90 mt-1">
                      {language === 'pt' ? 'Passo' : 'Step'} {currentStepIndex + 1} {language === 'pt' ? 'de' : 'of'} {tourSteps.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={skipTour}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  aria-label={language === 'pt' ? 'Fechar tour' : 'Close tour'}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <motion.div
                    className="bg-white h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + 1) / tourSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                {currentStep.description[language === 'pt' ? 'pt' : 'en']}
              </p>

              {/* Action button */}
              {currentStep.action && (
                <div className="mb-4">
                  <button
                    onClick={currentStep.action.onClick}
                    className="w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-800"
                  >
                    {currentStep.action.text[language === 'pt' ? 'pt' : 'en']}
                  </button>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Anterior' : 'Previous'}</span>
                </button>

                <div className="flex space-x-1">
                  {tourSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStepIndex 
                          ? getCategoryColor(currentStep.category)
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextStep}
                  className={`flex items-center space-x-2 px-4 py-2 ${getCategoryColor(currentStep.category)} text-white rounded-lg hover:opacity-90 transition-opacity`}
                >
                  <span>
                    {currentStepIndex === tourSteps.length - 1
                      ? (language === 'pt' ? 'Concluir' : 'Finish')
                      : (language === 'pt' ? 'Próximo' : 'Next')
                    }
                  </span>
                  {currentStepIndex === tourSteps.length - 1 ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <ArrowRightIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for tour management
export function useFeatureDiscoveryTour() {
  const [tourActive, setTourActive] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('lusotown-feature-tour-completed');
    setTourCompleted(!!completed);
  }, []);

  const startTour = () => setTourActive(true);
  const resetTour = () => {
    localStorage.removeItem('lusotown-feature-tour-completed');
    setTourCompleted(false);
  };

  return {
    tourActive,
    tourCompleted,
    startTour,
    resetTour
  };
}

// Demo component
export function FeatureDiscoveryTourDemo() {
  const { language } = useLanguage();
  const { startTour, resetTour, tourCompleted } = useFeatureDiscoveryTour();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {language === 'pt' ? 'Tour de Descoberta de Funcionalidades' : 'Feature Discovery Tour'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={startTour}
          className="p-4 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          {language === 'pt' ? 'Iniciar Tour' : 'Start Tour'}
        </button>
        <button
          onClick={resetTour}
          className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {language === 'pt' ? 'Resetar Tour' : 'Reset Tour'}
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800">
          <strong>{language === 'pt' ? 'Status:' : 'Status:'}</strong>{' '}
          {tourCompleted 
            ? (language === 'pt' ? 'Tour concluído' : 'Tour completed')
            : (language === 'pt' ? 'Tour não iniciado' : 'Tour not started')
          }
        </p>
      </div>

      <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h4 className="font-medium text-primary-900 mb-2">
          {language === 'pt' ? 'Funcionalidades do Tour' : 'Tour Features'}
        </h4>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>• {language === 'pt' ? 'Destaque interativo de elementos' : 'Interactive element highlighting'}</li>
          <li>• {language === 'pt' ? 'Navegação guiada passo a passo' : 'Step-by-step guided navigation'}</li>
          <li>• {language === 'pt' ? 'Demonstrações de funcionalidades em tempo real' : 'Real-time feature demonstrations'}</li>
          <li>• {language === 'pt' ? 'Suporte bilíngue completo' : 'Full bilingual support'}</li>
        </ul>
      </div>
    </div>
  );
}