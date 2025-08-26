'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  HandRaisedIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface GestureHint {
  id: string;
  gesture: 'swipeLeft' | 'swipeRight' | 'swipeUp' | 'swipeDown' | 'tap' | 'longPress' | 'pinch';
  icon: React.ComponentType<{ className?: string }>;
  position: { x: number; y: number };
  description: {
    en: string;
    pt: string;
  };
  action: {
    en: string;
    pt: string;
  };
  trigger?: string; // CSS selector for when to show this hint
}

const MOBILE_GESTURES: GestureHint[] = [
  {
    id: 'swipe-left-nav',
    gesture: 'swipeLeft',
    icon: ArrowLeftIcon,
    position: { x: 85, y: 15 },
    description: {
      en: 'Swipe left to navigate back',
      pt: 'Deslize para a esquerda para voltar'
    },
    action: {
      en: 'Previous page',
      pt: 'Página anterior'
    },
    trigger: '[data-gesture="swipe-nav"]'
  },
  {
    id: 'swipe-right-menu',
    gesture: 'swipeRight',
    icon: ArrowRightIcon,
    position: { x: 5, y: 15 },
    description: {
      en: 'Swipe right to open menu',
      pt: 'Deslize para a direita para abrir menu'
    },
    action: {
      en: 'Open navigation',
      pt: 'Abrir navegação'
    },
    trigger: '[data-gesture="menu-swipe"]'
  },
  {
    id: 'swipe-up-more',
    gesture: 'swipeUp',
    icon: ArrowUpIcon,
    position: { x: 50, y: 85 },
    description: {
      en: 'Swipe up for more content',
      pt: 'Deslize para cima para mais conteúdo'
    },
    action: {
      en: 'Load more',
      pt: 'Carregar mais'
    },
    trigger: '[data-gesture="load-more"]'
  },
  {
    id: 'swipe-down-refresh',
    gesture: 'swipeDown',
    icon: ArrowDownIcon,
    position: { x: 50, y: 5 },
    description: {
      en: 'Pull down to refresh',
      pt: 'Puxe para baixo para atualizar'
    },
    action: {
      en: 'Refresh content',
      pt: 'Atualizar conteúdo'
    },
    trigger: '[data-gesture="pull-refresh"]'
  },
  {
    id: 'tap-lusobot',
    gesture: 'tap',
    icon: HandRaisedIcon,
    position: { x: 85, y: 85 },
    description: {
      en: 'Tap to chat with LusoBot',
      pt: 'Toque para conversar com o LusoBot'
    },
    action: {
      en: 'Open chat assistant',
      pt: 'Abrir assistente de chat'
    },
    trigger: '[data-testid="lusobot-widget"]'
  }
];

interface MobileGestureHintsProps {
  className?: string;
  autoShow?: boolean;
  showOnFirstVisit?: boolean;
  specificGestures?: string[];
}

export default function MobileGestureHints({
  className = '',
  autoShow = true,
  showOnFirstVisit = true,
  specificGestures
}: MobileGestureHintsProps) {
  const { language } = useLanguage();
  const [activeHints, setActiveHints] = useState<GestureHint[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileWidth = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isMobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check first visit
  useEffect(() => {
    if (!showOnFirstVisit || !isMobile) return;

    const hasSeenGestureHints = localStorage.getItem('lusotown-gesture-hints-shown');
    if (!hasSeenGestureHints && autoShow) {
      setTimeout(() => {
        showGestureHints();
      }, 3000);
    }
  }, [isMobile, autoShow, showOnFirstVisit]);

  // Filter gestures based on current page
  useEffect(() => {
    if (!isMobile) return;

    let hintsToShow = MOBILE_GESTURES;

    // Filter by specific gestures if provided
    if (specificGestures && specificGestures.length > 0) {
      hintsToShow = MOBILE_GESTURES.filter(hint => specificGestures.includes(hint.id));
    }

    // Filter by available trigger elements
    const availableHints = hintsToShow.filter(hint => {
      if (!hint.trigger) return true;
      return document.querySelector(hint.trigger) !== null;
    });

    setActiveHints(availableHints);
  }, [isMobile, specificGestures]);

  const showGestureHints = () => {
    if (activeHints.length === 0) return;
    
    setIsVisible(true);
    setCurrentHintIndex(0);
    setHasBeenShown(true);
    localStorage.setItem('lusotown-gesture-hints-shown', 'true');
  };

  const nextHint = () => {
    if (currentHintIndex < activeHints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      hideHints();
    }
  };

  const hideHints = () => {
    setIsVisible(false);
  };

  const resetHints = () => {
    localStorage.removeItem('lusotown-gesture-hints-shown');
    setHasBeenShown(false);
  };

  if (!isMobile || activeHints.length === 0) return null;

  const currentHint = activeHints[currentHintIndex];

  return (
    <>
      {/* Gesture Hints Overlay */}
      <AnimatePresence>
        {isVisible && currentHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[10000] bg-black bg-opacity-50 flex items-center justify-center ${className}`}
            style={{ backdropFilter: 'blur(2px)' }}
          >
            {/* Dark overlay to focus attention */}
            <div className="absolute inset-0" onClick={hideHints} />
            
            {/* Gesture hint positioned on screen */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute bg-white rounded-2xl shadow-2xl p-6 max-w-xs mx-4 border-2 border-primary-200"
              style={{
                left: `${currentHint.position.x}%`,
                top: `${currentHint.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Close button */}
              <button
                onClick={hideHints}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={language === 'pt' ? 'Fechar dicas' : 'Close hints'}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* Gesture icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full">
                  <currentHint.icon className="w-8 h-8 text-primary-600" />
                </div>
              </div>

              {/* Gesture description */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {currentHint.description[language === 'pt' ? 'pt' : 'en']}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {currentHint.action[language === 'pt' ? 'pt' : 'en']}
                </p>

                {/* Progress indicator */}
                <div className="flex justify-center space-x-1 mb-4">
                  {activeHints.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentHintIndex ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={hideHints}
                    className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'pt' ? 'Pular' : 'Skip'}
                  </button>
                  <button
                    onClick={nextHint}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {currentHintIndex < activeHints.length - 1 
                      ? (language === 'pt' ? 'Próximo' : 'Next')
                      : (language === 'pt' ? 'Concluir' : 'Done')
                    }
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Animated gesture demonstration */}
            <GestureAnimation gesture={currentHint.gesture} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture hints trigger button (for testing/manual activation) */}
      {!isVisible && (
        <div className="fixed bottom-4 left-4 z-[100]">
          <button
            onClick={showGestureHints}
            className="p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors opacity-20 hover:opacity-100"
            title={language === 'pt' ? 'Mostrar dicas de gestos' : 'Show gesture hints'}
          >
            <HandRaisedIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}

// Animated gesture demonstration component
function GestureAnimation({ gesture }: { gesture: GestureHint['gesture'] }) {
  const getAnimation = () => {
    switch (gesture) {
      case 'swipeLeft':
        return {
          initial: { x: 20, opacity: 0.5 },
          animate: { x: -20, opacity: 1 },
          transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
        };
      case 'swipeRight':
        return {
          initial: { x: -20, opacity: 0.5 },
          animate: { x: 20, opacity: 1 },
          transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
        };
      case 'swipeUp':
        return {
          initial: { y: 20, opacity: 0.5 },
          animate: { y: -20, opacity: 1 },
          transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
        };
      case 'swipeDown':
        return {
          initial: { y: -20, opacity: 0.5 },
          animate: { y: 20, opacity: 1 },
          transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
        };
      case 'tap':
        return {
          initial: { scale: 1, opacity: 0.8 },
          animate: { scale: 1.2, opacity: 1 },
          transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' as const }
        };
      case 'longPress':
        return {
          initial: { scale: 1, opacity: 0.8 },
          animate: { scale: 1.1, opacity: 1 },
          transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const }
        };
      default:
        return {
          initial: { opacity: 0.8 },
          animate: { opacity: 1 },
          transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' as const }
        };
    }
  };

  const animation = getAnimation();

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      {...animation}
    >
      <div className="w-6 h-6 bg-white rounded-full shadow-lg opacity-60" />
    </motion.div>
  );
}

// Hook for programmatic control
export function useMobileGestureHints() {
  const [hintsVisible, setHintsVisible] = useState(false);

  const showHints = () => setHintsVisible(true);
  const hideHints = () => setHintsVisible(false);
  const resetHints = () => {
    localStorage.removeItem('lusotown-gesture-hints-shown');
  };

  return {
    hintsVisible,
    showHints,
    hideHints,
    resetHints
  };
}

// Demo component for testing
export function MobileGestureHintsDemo() {
  const { language } = useLanguage();
  const { showHints, resetHints } = useMobileGestureHints();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {language === 'pt' ? 'Dicas de Gestos Móveis' : 'Mobile Gesture Hints'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={showHints}
          className="p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {language === 'pt' ? 'Mostrar Dicas de Gestos' : 'Show Gesture Hints'}
        </button>
        <button
          onClick={resetHints}
          className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          {language === 'pt' ? 'Resetar Estado das Dicas' : 'Reset Hints State'}
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">
          {language === 'pt' ? 'Gestos Disponíveis' : 'Available Gestures'}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {language === 'pt' ? 'Deslizar para a esquerda: Navegação para trás' : 'Swipe left: Back navigation'}</li>
          <li>• {language === 'pt' ? 'Deslizar para a direita: Abrir menu' : 'Swipe right: Open menu'}</li>
          <li>• {language === 'pt' ? 'Deslizar para cima: Carregar mais conteúdo' : 'Swipe up: Load more content'}</li>
          <li>• {language === 'pt' ? 'Puxar para baixo: Atualizar' : 'Pull down: Refresh'}</li>
          <li>• {language === 'pt' ? 'Toque: Ativar LusoBot' : 'Tap: Activate LusoBot'}</li>
        </ul>
      </div>
    </div>
  );
}