'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface ProgressiveLoadingProps {
  type: 'cultural-calendar' | 'palop-heritage' | 'business-directory' | 'matches' | 'events' | 'general';
  isLoading: boolean;
  hasError?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  culturalTheme?: 'portugal' | 'brazil' | 'palop' | 'mixed';
  showProgress?: boolean;
  estimatedTime?: number; // in milliseconds
  className?: string;
}

const CULTURAL_LOADING_MESSAGES = {
  'cultural-calendar': {
    en: {
      loading: 'Loading Portuguese cultural events...',
      progress: ['Connecting to cultural centers...', 'Fetching Fado events...', 'Loading festival dates...'],
      error: 'Unable to load cultural events. Please try again.',
    },
    pt: {
      loading: 'Carregando eventos culturais portugueses...',
      progress: ['Conectando aos centros culturais...', 'Buscando eventos de Fado...', 'Carregando datas dos festivais...'],
      error: 'Não foi possível carregar os eventos culturais. Tente novamente.',
    }
  },
  'palop-heritage': {
    en: {
      loading: 'Discovering PALOP heritage...',
      progress: ['Connecting to Angola...', 'Loading Cape Verde traditions...', 'Fetching Mozambique culture...'],
      error: 'Unable to connect to PALOP heritage resources.',
    },
    pt: {
      loading: 'Descobrindo patrimônio PALOP...',
      progress: ['Conectando a Angola...', 'Carregando tradições de Cabo Verde...', 'Buscando cultura de Moçambique...'],
      error: 'Não foi possível conectar aos recursos do patrimônio PALOP.',
    }
  },
  'business-directory': {
    en: {
      loading: 'Loading Portuguese businesses...',
      progress: ['Searching London businesses...', 'Verifying Portuguese ownership...', 'Loading contact details...'],
      error: 'Business directory temporarily unavailable.',
    },
    pt: {
      loading: 'Carregando negócios portugueses...',
      progress: ['Procurando negócios em Londres...', 'Verificando propriedade portuguesa...', 'Carregando detalhes de contacto...'],
      error: 'Diretório de negócios temporariamente indisponível.',
    }
  },
  'matches': {
    en: {
      loading: 'Finding your Portuguese community matches...',
      progress: ['Analyzing cultural compatibility...', 'Matching regional preferences...', 'Finding shared interests...'],
      error: 'Unable to find matches at the moment.',
    },
    pt: {
      loading: 'Encontrando as suas compatibilidades na comunidade portuguesa...',
      progress: ['Analisando compatibilidade cultural...', 'Combinando preferências regionais...', 'Encontrando interesses partilhados...'],
      error: 'Não foi possível encontrar compatibilidades no momento.',
    }
  },
  'events': {
    en: {
      loading: 'Loading community events...',
      progress: ['Fetching upcoming events...', 'Checking availability...', 'Loading event details...'],
      error: 'Events are currently unavailable.',
    },
    pt: {
      loading: 'Carregando eventos da comunidade...',
      progress: ['Buscando próximos eventos...', 'Verificando disponibilidade...', 'Carregando detalhes dos eventos...'],
      error: 'Os eventos estão atualmente indisponíveis.',
    }
  },
  'general': {
    en: {
      loading: 'Loading...',
      progress: ['Initializing...', 'Loading content...', 'Almost ready...'],
      error: 'Something went wrong. Please try again.',
    },
    pt: {
      loading: 'Carregando...',
      progress: ['Inicializando...', 'Carregando conteúdo...', 'Quase pronto...'],
      error: 'Algo deu errado. Tente novamente.',
    }
  }
};

const CULTURAL_COLORS = {
  portugal: {
    primary: '#d32f2f', // Portuguese red
    secondary: '#2e7d32', // Portuguese green
    accent: '#ff6f00' // Portuguese gold
  },
  brazil: {
    primary: '#4caf50', // Brazilian green
    secondary: '#ffeb3b', // Brazilian yellow
    accent: '#2196f3' // Brazilian blue
  },
  palop: {
    primary: '#8e24aa', // African purple
    secondary: '#ff5722', // Warm orange
    accent: '#795548' // Earth brown
  },
  mixed: {
    primary: '#3f51b5', // LusoTown blue
    secondary: '#9c27b0', // Mixed purple
    accent: '#ff9800' // Mixed orange
  }
};

const CulturalLoadingSkeleton: React.FC<{ type: ProgressiveLoadingProps['type']; theme: string }> = ({ type, theme }) => {
  const colors = CULTURAL_COLORS[theme as keyof typeof CULTURAL_COLORS] || CULTURAL_COLORS.mixed;

  const getSkeletonContent = () => {
    switch (type) {
      case 'cultural-calendar':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'palop-heritage':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        );
      
      case 'business-directory':
        return (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex space-x-4 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        );
      
      case 'matches':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {getSkeletonContent()}
    </div>
  );
};

const ProgressIndicator: React.FC<{ 
  progress: number; 
  colors: any; 
  showSteps: boolean;
  currentStep: string;
}> = ({ progress, colors, showSteps, currentStep }) => {
  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: colors.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {/* Current step */}
      {showSteps && currentStep && (
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 text-center"
        >
          {currentStep}
        </motion.p>
      )}
    </div>
  );
};

export default function ProgressiveLoadingStates({
  type,
  isLoading,
  hasError = false,
  errorMessage,
  children,
  culturalTheme = 'mixed',
  showProgress = false,
  estimatedTime = 3000,
  className = ''
}: ProgressiveLoadingProps) {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const messages = CULTURAL_LOADING_MESSAGES[type];
  const colors = CULTURAL_COLORS[culturalTheme];
  const currentLanguage = language === 'pt' ? 'pt' : 'en';

  // Progress simulation
  useEffect(() => {
    if (!isLoading || hasError) {
      setProgress(0);
      setCurrentStepIndex(0);
      setHasStarted(false);
      return;
    }

    setHasStarted(true);
    const steps = messages[currentLanguage].progress;
    const stepDuration = estimatedTime / steps.length;
    const progressIncrement = 100 / steps.length;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + progressIncrement / 10, 95); // Never reach 100% until loaded
        return newProgress;
      });
    }, stepDuration / 10);

    const stepTimer = setInterval(() => {
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isLoading, hasError, estimatedTime, messages, currentLanguage]);

  // Complete progress when loading finishes
  useEffect(() => {
    if (!isLoading && hasStarted && !hasError) {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setHasStarted(false);
      }, 500);
    }
  }, [isLoading, hasStarted, hasError]);

  if (hasError) {
    return (
      <div className={`p-6 ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Erro ao Carregar' : 'Loading Error'}
          </h3>
          <p className="text-gray-600 mb-4">
            {errorMessage || messages[currentLanguage].error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {language === 'pt' ? 'Tentar Novamente' : 'Try Again'}
          </button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Loading header */}
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-gray-200"
              style={{ borderTopColor: colors.primary }}
            />
            <h3 className="text-lg font-medium mb-2" style={{ color: colors.primary }}>
              {messages[currentLanguage].loading}
            </h3>
            
            {showProgress && (
              <div className="max-w-md mx-auto">
                <ProgressIndicator
                  progress={progress}
                  colors={colors}
                  showSteps={true}
                  currentStep={messages[currentLanguage].progress[currentStepIndex]}
                />
              </div>
            )}
          </div>

          {/* Cultural skeleton */}
          <CulturalLoadingSkeleton type={type} theme={culturalTheme} />
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loaded-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Convenience components for specific use cases
export const CulturalCalendarLoader: React.FC<Omit<ProgressiveLoadingProps, 'type'>> = (props) => (
  <ProgressiveLoadingStates {...props} type="cultural-calendar" culturalTheme="portugal" showProgress={true} />
);

export const PALOPHeritageLoader: React.FC<Omit<ProgressiveLoadingProps, 'type'>> = (props) => (
  <ProgressiveLoadingStates {...props} type="palop-heritage" culturalTheme="palop" showProgress={true} />
);

export const BusinessDirectoryLoader: React.FC<Omit<ProgressiveLoadingProps, 'type'>> = (props) => (
  <ProgressiveLoadingStates {...props} type="business-directory" culturalTheme="mixed" showProgress={true} />
);

export const MatchingLoader: React.FC<Omit<ProgressiveLoadingProps, 'type'>> = (props) => (
  <ProgressiveLoadingStates {...props} type="matches" culturalTheme="mixed" showProgress={true} estimatedTime={4000} />
);

export const EventsLoader: React.FC<Omit<ProgressiveLoadingProps, 'type'>> = (props) => (
  <ProgressiveLoadingStates {...props} type="events" culturalTheme="brazil" showProgress={true} />
);