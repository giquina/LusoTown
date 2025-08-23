'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon,
  SpeakerWaveIcon,
  KeyboardIcon,
  MicrophoneIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  InformationCircleIcon,
  GlobeEuropeAfricaIcon,
  HeartIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { 
  EyeSlashIcon,
  SpeakerXMarkIcon,
  MicrophoneIcon as MicSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibilityContext } from '@/context/AccessibilityContext';
import { LuxuryRipple } from './LuxuryMobileInteraction';

interface AccessibilityWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  alwaysVisible?: boolean;
  className?: string;
}

export default function AccessibilityWidget({
  position = 'bottom-left',
  alwaysVisible = false,
  className = ''
}: AccessibilityWidgetProps) {
  const { language, t } = useLanguage();
  const {
    isHighContrast,
    isLargeText,
    isReducedMotion,
    isKeyboardNavigation,
    isScreenReaderActive,
    isVoiceControlActive,
    isMobile,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleKeyboardNavigation,
    toggleScreenReader,
    toggleVoiceControl,
    announceToScreenReader,
    showAccessibilityHelp,
    availableVoices,
    isListening
  } = useAccessibilityContext();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<'main' | 'voice' | 'keyboard' | 'visual'>('main');
  const [hasBeenIntroduced, setHasBeenIntroduced] = useState(false);

  // Introduce widget to new users
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('lusotown-accessibility-intro');
    if (!hasSeenIntro && !hasBeenIntroduced) {
      setTimeout(() => {
        announceToScreenReader(
          language === 'pt'
            ? 'Widget de acessibilidade disponível. Clique no ícone inferior esquerdo para aceder às opções de acessibilidade.'
            : 'Accessibility widget available. Click the bottom left icon to access accessibility options.',
          'assertive'
        );
        setHasBeenIntroduced(true);
        localStorage.setItem('lusotown-accessibility-intro', 'true');
      }, 2000);
    }
  }, [language, announceToScreenReader, hasBeenIntroduced]);

  const getPositionClasses = () => {
    const baseClasses = 'fixed z-50';
    switch (position) {
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`;
      case 'top-right':
        return `${baseClasses} top-4 right-4`;
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      default:
        return `${baseClasses} bottom-4 left-4`;
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setActiveSection('main');
      announceToScreenReader(
        language === 'pt'
          ? 'Painel de acessibilidade aberto'
          : 'Accessibility panel opened'
      );
    } else {
      announceToScreenReader(
        language === 'pt'
          ? 'Painel de acessibilidade fechado'
          : 'Accessibility panel closed'
      );
    }
  };

  const handleFeatureToggle = (feature: string, action: () => void, currentState: boolean) => {
    action();
    announceToScreenReader(
      language === 'pt'
        ? `${feature} ${!currentState ? 'ativado' : 'desativado'}`
        : `${feature} ${!currentState ? 'enabled' : 'disabled'}`
    );
  };

  const accessibilityFeatures = [
    {
      id: 'high-contrast',
      name: language === 'pt' ? 'Alto Contraste' : 'High Contrast',
      description: language === 'pt' ? 'Melhora a visibilidade do texto' : 'Improves text visibility',
      icon: EyeIcon,
      activeIcon: EyeIcon,
      isActive: isHighContrast,
      action: toggleHighContrast,
      section: 'visual'
    },
    {
      id: 'large-text',
      name: language === 'pt' ? 'Texto Grande' : 'Large Text',
      description: language === 'pt' ? 'Aumenta o tamanho do texto' : 'Increases text size',
      icon: AdjustmentsHorizontalIcon,
      activeIcon: AdjustmentsHorizontalIcon,
      isActive: isLargeText,
      action: toggleLargeText,
      section: 'visual'
    },
    {
      id: 'reduced-motion',
      name: language === 'pt' ? 'Movimento Reduzido' : 'Reduced Motion',
      description: language === 'pt' ? 'Reduz animações' : 'Reduces animations',
      icon: AdjustmentsHorizontalIcon,
      activeIcon: AdjustmentsHorizontalIcon,
      isActive: isReducedMotion,
      action: toggleReducedMotion,
      section: 'visual'
    },
    {
      id: 'keyboard-nav',
      name: language === 'pt' ? 'Navegação Teclado' : 'Keyboard Navigation',
      description: language === 'pt' ? 'Navegação melhorada por teclado' : 'Enhanced keyboard navigation',
      icon: KeyboardIcon,
      activeIcon: KeyboardIcon,
      isActive: isKeyboardNavigation,
      action: toggleKeyboardNavigation,
      section: 'keyboard'
    },
    {
      id: 'screen-reader',
      name: language === 'pt' ? 'Leitor de Ecrã' : 'Screen Reader',
      description: language === 'pt' ? 'Leitura automática de conteúdo' : 'Automatic content reading',
      icon: SpeakerWaveIcon,
      activeIcon: SpeakerWaveIcon,
      isActive: isScreenReaderActive,
      action: toggleScreenReader,
      section: 'voice'
    },
    {
      id: 'voice-control',
      name: language === 'pt' ? 'Controlo Voz' : 'Voice Control',
      description: language === 'pt' ? 'Comandos de voz em português' : 'Portuguese voice commands',
      icon: MicrophoneIcon,
      activeIcon: MicSolidIcon,
      isActive: isVoiceControlActive,
      action: toggleVoiceControl,
      section: 'voice'
    }
  ];

  const getCurrentSectionFeatures = () => {
    return accessibilityFeatures.filter(feature => feature.section === activeSection);
  };

  const getActiveFeatureCount = () => {
    return accessibilityFeatures.filter(feature => feature.isActive).length;
  };

  const sections = [
    {
      id: 'main' as const,
      name: language === 'pt' ? 'Principal' : 'Main',
      icon: AdjustmentsHorizontalIcon
    },
    {
      id: 'visual' as const,
      name: language === 'pt' ? 'Visual' : 'Visual',
      icon: EyeIcon
    },
    {
      id: 'voice' as const,
      name: language === 'pt' ? 'Voz' : 'Voice',
      icon: SpeakerWaveIcon
    },
    {
      id: 'keyboard' as const,
      name: language === 'pt' ? 'Teclado' : 'Keyboard',
      icon: KeyboardIcon
    }
  ];

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      {/* Main Toggle Button */}
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
      >
        <LuxuryRipple
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            bg-gradient-to-br from-primary-600 to-secondary-600 text-white
            shadow-2xl hover:shadow-3xl transition-all duration-300
            ${isExpanded ? 'ring-4 ring-primary-200' : ''}
          `}
          onClick={handleToggleExpand}
          hapticFeedback="medium"
          rippleColor="rgba(255, 255, 255, 0.3)"
        >
          <span className="sr-only">
            {language === 'pt' 
              ? `Acessibilidade ${isExpanded ? '- fechar painel' : '- abrir painel'}${getActiveFeatureCount() > 0 ? `. ${getActiveFeatureCount()} funcionalidades ativas` : ''}`
              : `Accessibility ${isExpanded ? '- close panel' : '- open panel'}${getActiveFeatureCount() > 0 ? `. ${getActiveFeatureCount()} features active` : ''}`
            }
          </span>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isExpanded ? (
              <XMarkIcon className="w-8 h-8" aria-hidden="true" />
            ) : (
              <GlobeEuropeAfricaIcon className="w-8 h-8" aria-hidden="true" />
            )}
          </motion.div>

          {/* Active features indicator */}
          {getActiveFeatureCount() > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              aria-hidden="true"
            >
              {getActiveFeatureCount()}
            </motion.div>
          )}

          {/* Voice control listening indicator */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-400"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
          )}

          {/* Portuguese heritage indicator */}
          <div 
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-green-500 shadow-md"
            title={language === 'pt' ? 'Acessibilidade Portuguesa' : 'Portuguese Accessibility'}
            aria-hidden="true"
          />
        </LuxuryRipple>
      </motion.div>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
            
            {/* Main Panel */}
            <motion.div
              className={`
                absolute ${position.includes('bottom') ? 'bottom-20' : 'top-20'} 
                ${position.includes('right') ? 'right-0' : 'left-0'}
                w-80 max-w-[90vw] max-h-[70vh] overflow-hidden
                bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl
                border border-gray-200/60
              `}
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                y: position.includes('bottom') ? 20 : -20
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                y: position.includes('bottom') ? 20 : -20
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              role="dialog"
              aria-labelledby="accessibility-panel-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <GlobeEuropeAfricaIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 
                        id="accessibility-panel-title"
                        className="font-bold text-gray-900"
                      >
                        {language === 'pt' ? 'Acessibilidade' : 'Accessibility'}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {language === 'pt' ? 'Comunidade de Falantes de Português' : 'Portuguese-speaking community'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={showAccessibilityHelp}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label={language === 'pt' ? 'Mostrar ajuda de acessibilidade' : 'Show accessibility help'}
                  >
                    <InformationCircleIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Section Navigation */}
                <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActiveSection = activeSection === section.id;
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`
                          flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors
                          focus:outline-none focus:ring-2 focus:ring-primary-400
                          ${isActiveSection 
                            ? 'bg-white text-primary-600 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                          }
                        `}
                        aria-selected={isActiveSection}
                        role="tab"
                      >
                        <Icon className="w-4 h-4 mx-auto" aria-hidden="true" />
                        <span className="block text-xs mt-1">{section.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {activeSection === 'main' ? (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <HeartIcon className="w-12 h-12 text-primary-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {language === 'pt' ? 'Bem-vindo à Acessibilidade' : 'Welcome to Accessibility'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'pt' 
                          ? 'Personalize a sua experiência na comunidade de falantes de português'
                          : 'Customize your Portuguese-speaking community experience'
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {accessibilityFeatures.map((feature) => {
                        const Icon = feature.isActive ? feature.activeIcon : feature.icon;
                        
                        return (
                          <LuxuryRipple
                            key={feature.id}
                            className={`
                              p-3 rounded-lg border transition-all duration-200
                              ${feature.isActive 
                                ? 'border-primary-200 bg-primary-50 ring-2 ring-primary-100' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }
                            `}
                            onClick={() => handleFeatureToggle(feature.name, feature.action, feature.isActive)}
                            hapticFeedback="light"
                          >
                            <div className="text-center">
                              <Icon 
                                className={`w-6 h-6 mx-auto mb-2 ${
                                  feature.isActive ? 'text-primary-600' : 'text-gray-500'
                                }`} 
                              />
                              <h4 className={`text-xs font-medium ${
                                feature.isActive ? 'text-primary-900' : 'text-gray-900'
                              }`}>
                                {feature.name}
                              </h4>
                              {feature.isActive && (
                                <div className="w-2 h-2 bg-primary-500 rounded-full mx-auto mt-1" />
                              )}
                            </div>
                          </LuxuryRipple>
                        );
                      })}
                    </div>

                    {availableVoices.length > 0 && (
                      <div className="text-center text-xs text-gray-500">
                        {language === 'pt' 
                          ? `${availableVoices.length} vozes portuguesas disponíveis`
                          : `${availableVoices.length} Portuguese voices available`
                        }
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getCurrentSectionFeatures().map((feature) => {
                      const Icon = feature.isActive ? feature.activeIcon : feature.icon;
                      
                      return (
                        <div
                          key={feature.id}
                          className={`
                            p-4 rounded-lg border transition-all duration-200
                            ${feature.isActive 
                              ? 'border-primary-200 bg-primary-50' 
                              : 'border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Icon 
                                className={`w-5 h-5 mt-0.5 ${
                                  feature.isActive ? 'text-primary-600' : 'text-gray-500'
                                }`} 
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {feature.name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleFeatureToggle(feature.name, feature.action, feature.isActive)}
                              className={`
                                w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                                focus:outline-none focus:ring-2 focus:ring-primary-400
                                ${feature.isActive 
                                  ? 'bg-primary-600' 
                                  : 'bg-gray-300'
                                }
                              `}
                              role="switch"
                              aria-checked={feature.isActive}
                              aria-label={`${feature.name} ${feature.isActive ? (language === 'pt' ? 'ativo' : 'active') : (language === 'pt' ? 'inativo' : 'inactive')}`}
                            >
                              <div
                                className={`
                                  w-4 h-4 bg-white rounded-full transition-transform duration-200 mt-1
                                  ${feature.isActive ? 'translate-x-5' : 'translate-x-1'}
                                `}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200/60 bg-gray-50/50">
                <div className="text-xs text-gray-600 text-center">
                  {language === 'pt' 
                    ? 'Acessibilidade premium para a comunidade de falantes de português'
                    : 'Premium accessibility for the Portuguese-speaking community'
                  }
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}