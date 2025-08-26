'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionMarkCircleIcon, XMarkIcon, InformationCircleIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface HelpBubbleConfig {
  id: string;
  trigger: string; // CSS selector or element ID
  title: {
    en: string;
    pt: string;
  };
  content: {
    en: string;
    pt: string;
  };
  position: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  priority: number; // Higher number = higher priority
  culturalContext?: {
    en: string;
    pt: string;
  };
  actionButtons?: Array<{
    label: { en: string; pt: string };
    action: () => void;
    type: 'primary' | 'secondary';
  }>;
}

// Portuguese Cultural Help Configuration
const HELP_BUBBLES: HelpBubbleConfig[] = [
  {
    id: 'palop-heritage-help',
    trigger: '[data-testid="palop-section"], section:has-text("PALOP")',
    title: {
      en: 'PALOP Countries Heritage',
      pt: 'Património dos Países PALOP'
    },
    content: {
      en: 'PALOP stands for African Portuguese-speaking Countries (Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé and Príncipe). Discover events and connect with communities from all lusophone nations.',
      pt: 'PALOP significa Países Africanos de Língua Oficial Portuguesa (Angola, Cabo Verde, Guiné-Bissau, Moçambique, São Tomé e Príncipe). Descubra eventos e conecte-se com comunidades de todas as nações lusófonas.'
    },
    position: 'bottom',
    priority: 9,
    culturalContext: {
      en: 'These communities bring rich cultural traditions including music, cuisine, and festivals to the UK Portuguese-speaking diaspora.',
      pt: 'Estas comunidades trazem ricas tradições culturais incluindo música, culinária e festivais para a diáspora lusófona no Reino Unido.'
    }
  },
  {
    id: 'cultural-calendar-help',
    trigger: '[data-testid="cultural-calendar"], section:has-text("Cultural Calendar")',
    title: {
      en: 'Portuguese Cultural Events',
      pt: 'Eventos Culturais Portugueses'
    },
    content: {
      en: 'Discover authentic Portuguese cultural events in London & UK. From Fado nights to Portuguese business networking, connect with your heritage and community.',
      pt: 'Descubra eventos culturais portugueses autênticos em Londres e no Reino Unido. Desde noites de Fado até networking empresarial português, conecte-se com a sua herança e comunidade.'
    },
    position: 'right',
    priority: 8,
    actionButtons: [
      {
        label: { en: 'Browse All Events', pt: 'Ver Todos os Eventos' },
        action: () => window.location.href = '/events',
        type: 'primary'
      }
    ]
  },
  {
    id: 'matches-system-help',
    trigger: '[data-testid="matches-section"], section:has-text("Match")',
    title: {
      en: 'Portuguese Cultural Matching',
      pt: 'Compatibilidade Cultural Portuguesa'
    },
    content: {
      en: 'Our AI system matches you with Portuguese speakers based on cultural interests, regional background, and shared experiences. Build meaningful connections within the community.',
      pt: 'O nosso sistema de IA combina-o com falantes de português com base em interesses culturais, origem regional e experiências partilhadas. Construa conexões significativas dentro da comunidade.'
    },
    position: 'top',
    priority: 7,
    culturalContext: {
      en: 'Whether you\'re from Portugal, Brazil, Angola, or other lusophone countries, find your cultural tribe in London.',
      pt: 'Seja de Portugal, Brasil, Angola ou outros países lusófonos, encontre a sua tribo cultural em Londres.'
    }
  },
  {
    id: 'business-directory-help',
    trigger: '[href="/business-directory"], a:has-text("Business Directory")',
    title: {
      en: 'Portuguese Business Network',
      pt: 'Rede de Negócios Portuguesa'
    },
    content: {
      en: 'Connect with Portuguese-owned businesses and entrepreneurs across London. Support the community economy and find services that understand your culture.',
      pt: 'Conecte-se com empresas e empreendedores portugueses em Londres. Apoie a economia da comunidade e encontre serviços que compreendem a sua cultura.'
    },
    position: 'bottom',
    priority: 6
  },
  {
    id: 'subscription-help',
    trigger: '[data-testid="subscription-info"], .subscription, [class*="pricing"]',
    title: {
      en: 'Community Membership Tiers',
      pt: 'Níveis de Associação da Comunidade'
    },
    content: {
      en: 'Join our Portuguese-speaking community with membership options designed for different needs. From basic community access to premium networking opportunities.',
      pt: 'Junte-se à nossa comunidade lusófona com opções de associação pensadas para diferentes necessidades. Desde acesso básico à comunidade até oportunidades premium de networking.'
    },
    position: 'left',
    priority: 5
  },
  {
    id: 'mobile-experience-help',
    trigger: '[data-testid="mobile-navigation"], .mobile-nav',
    title: {
      en: 'Mobile Portuguese Experience',
      pt: 'Experiência Móvel Portuguesa'
    },
    content: {
      en: 'LusoTown is optimized for mobile use. Swipe through events, chat with community members, and stay connected with Portuguese culture on the go.',
      pt: 'LusoTown está otimizado para uso móvel. Navegue pelos eventos, converse com membros da comunidade e mantenha-se conectado com a cultura portuguesa em movimento.'
    },
    position: 'auto',
    priority: 4
  }
];

interface ContextualHelpBubbleProps {
  config: HelpBubbleConfig;
  onClose: () => void;
  isVisible: boolean;
}

const ContextualHelpBubble: React.FC<ContextualHelpBubbleProps> = ({ 
  config, 
  onClose, 
  isVisible 
}) => {
  const { t, language } = useLanguage();
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Find trigger element and calculate position
    const triggerElement = document.querySelector(config.trigger);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      let top = 0;
      let left = 0;

      switch (config.position) {
        case 'top':
          top = rect.top + scrollTop - 10;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + scrollTop + 10;
          left = rect.left + scrollLeft + rect.width / 2;
          break;
        case 'left':
          top = rect.top + scrollTop + rect.height / 2;
          left = rect.left + scrollLeft - 10;
          break;
        case 'right':
          top = rect.top + scrollTop + rect.height / 2;
          left = rect.right + scrollLeft + 10;
          break;
        case 'auto':
        default:
          // Smart positioning based on viewport
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          if (rect.top < viewportHeight / 2) {
            // Element is in top half - show bubble below
            top = rect.bottom + scrollTop + 10;
            left = Math.min(rect.left + scrollLeft, viewportWidth - 320);
          } else {
            // Element is in bottom half - show bubble above
            top = rect.top + scrollTop - 10;
            left = Math.min(rect.left + scrollLeft, viewportWidth - 320);
          }
          break;
      }

      setPosition({ top, left });
    }
  }, [isVisible, config.trigger, config.position]);

  if (!isVisible || !position) return null;

  const title = language === 'pt' ? config.title.pt : config.title.en;
  const content = language === 'pt' ? config.content.pt : config.content.en;
  const culturalContext = config.culturalContext ? 
    (language === 'pt' ? config.culturalContext.pt : config.culturalContext.en) : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed z-[9999] max-w-sm bg-white rounded-xl shadow-2xl border border-primary-200 overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          transform: config.position === 'top' || config.position === 'bottom' ? 'translateX(-50%)' : 
                    config.position === 'left' ? 'translateX(-100%)' : 
                    config.position === 'right' ? 'translateX(0)' : 'translateX(-25%)'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <InformationCircleIcon className="w-5 h-5" />
              <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-100 transition-colors p-1"
              aria-label={t('help.close')}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {content}
          </p>

          {culturalContext && (
            <div className="bg-primary-50 border-l-4 border-primary-400 p-3 mb-3">
              <div className="flex items-start">
                <HeartIcon className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-primary-800 text-xs leading-relaxed">
                  {culturalContext}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {config.actionButtons && config.actionButtons.length > 0 && (
            <div className="flex space-x-2 mt-3">
              {config.actionButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.action}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    button.type === 'primary'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {language === 'pt' ? button.label.pt : button.label.en}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pointer/Arrow */}
        <div
          className={`absolute w-0 h-0 border-8 ${
            config.position === 'top' ? 'border-transparent border-b-white -top-2 left-1/2 transform -translate-x-1/2' :
            config.position === 'bottom' ? 'border-transparent border-t-white -bottom-2 left-1/2 transform -translate-x-1/2' :
            config.position === 'left' ? 'border-transparent border-r-white -left-2 top-1/2 transform -translate-y-1/2' :
            config.position === 'right' ? 'border-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2' :
            'border-transparent border-t-white -bottom-2 left-8'
          }`}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default function ContextualHelpBubbles() {
  const [activeBubbles, setActiveBubbles] = useState<Set<string>>(new Set());
  const [shownBubbles, setShownBubbles] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize help system
  useEffect(() => {
    const initializeHelp = () => {
      // Get user's help preferences from localStorage
      const helpPreferences = JSON.parse(localStorage.getItem('lusotown_help_preferences') || '{}');
      const dismissedBubbles = new Set(helpPreferences.dismissedBubbles || []);
      
      // Check which help bubbles should be shown
      const eligibleBubbles = HELP_BUBBLES.filter(bubble => {
        if (dismissedBubbles.has(bubble.id)) return false;
        
        // Check if trigger element exists
        const triggerElement = document.querySelector(bubble.trigger);
        return triggerElement !== null;
      });

      // Show highest priority bubbles (max 2 at once for better UX)
      const bubblesToShow = eligibleBubbles
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 2);

      setActiveBubbles(new Set(bubblesToShow.map(b => b.id)));
      setIsInitialized(true);
    };

    // Wait for DOM to be ready
    const timer = setTimeout(initializeHelp, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to show contextual help
  useEffect(() => {
    if (!isInitialized) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      HELP_BUBBLES.forEach(bubble => {
        if (shownBubbles.has(bubble.id) || activeBubbles.has(bubble.id)) return;

        const triggerElement = document.querySelector(bubble.trigger);
        if (triggerElement) {
          const rect = triggerElement.getBoundingClientRect();
          const elementTop = scrollY + rect.top;
          const isInViewport = scrollY + viewportHeight > elementTop && scrollY < elementTop + rect.height;

          if (isInViewport && activeBubbles.size < 1) {
            // Show this bubble after a short delay
            setTimeout(() => {
              setActiveBubbles(prev => new Set([...prev, bubble.id]));
              setShownBubbles(prev => new Set([...prev, bubble.id]));
            }, 1000);
          }
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isInitialized, activeBubbles, shownBubbles]);

  const closeBubble = (bubbleId: string, dismiss = false) => {
    setActiveBubbles(prev => {
      const newSet = new Set(prev);
      newSet.delete(bubbleId);
      return newSet;
    });

    if (dismiss) {
      // Save dismissal to localStorage
      const helpPreferences = JSON.parse(localStorage.getItem('lusotown_help_preferences') || '{}');
      const dismissedBubbles = helpPreferences.dismissedBubbles || [];
      dismissedBubbles.push(bubbleId);
      
      localStorage.setItem('lusotown_help_preferences', JSON.stringify({
        ...helpPreferences,
        dismissedBubbles
      }));
    }
  };

  return (
    <>
      {Array.from(activeBubbles).map(bubbleId => {
        const config = HELP_BUBBLES.find(b => b.id === bubbleId);
        if (!config) return null;

        return (
          <ContextualHelpBubble
            key={bubbleId}
            config={config}
            isVisible={true}
            onClose={() => closeBubble(bubbleId, true)}
          />
        );
      })}

      {/* Help Toggle Button */}
      {isInitialized && activeBubbles.size === 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-4 z-[9998] bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          onClick={() => {
            // Reset and show help bubbles again
            localStorage.removeItem('lusotown_help_preferences');
            window.location.reload();
          }}
          title="Show Help Bubbles"
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
}

// Utility function for throttling scroll events
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}