'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InformationCircleIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface CulturalTerm {
  term: string;
  definition: {
    en: string;
    pt: string;
  };
  culturalContext?: {
    en: string;
    pt: string;
  };
  category: 'music' | 'food' | 'tradition' | 'place' | 'language' | 'history';
  pronunciation?: {
    en: string;
    pt: string;
  };
}

interface TooltipPosition {
  top: number;
  left: number;
}

interface CulturalTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

// Portuguese cultural terms database
const CULTURAL_TERMS: Record<string, CulturalTerm> = {
  'fado': {
    term: 'Fado',
    definition: {
      en: 'Traditional Portuguese music genre expressing deep emotion, often about fate, love, and loss',
      pt: 'Gênero musical tradicional português que expressa emoção profunda, frequentemente sobre destino, amor e perda'
    },
    culturalContext: {
      en: 'UNESCO Intangible Cultural Heritage, central to Portuguese identity and soul',
      pt: 'Património Cultural Imaterial da UNESCO, central à identidade e alma portuguesa'
    },
    category: 'music',
    pronunciation: {
      en: 'FAH-doo',
      pt: 'FA-do'
    }
  },
  'palop': {
    term: 'PALOP',
    definition: {
      en: 'African Countries with Portuguese as Official Language (Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé and Príncipe)',
      pt: 'Países Africanos de Língua Oficial Portuguesa (Angola, Cabo Verde, Guiné-Bissau, Moçambique, São Tomé e Príncipe)'
    },
    culturalContext: {
      en: 'These nations share Portuguese colonial history and maintain strong cultural and linguistic ties',
      pt: 'Estas nações partilham história colonial portuguesa e mantêm fortes laços culturais e linguísticos'
    },
    category: 'place'
  },
  'saudade': {
    term: 'Saudade',
    definition: {
      en: 'A deep emotional state of longing for something absent, uniquely Portuguese concept',
      pt: 'Estado emocional profundo de saudade por algo ausente, conceito unicamente português'
    },
    culturalContext: {
      en: 'Considered untranslatable, it encompasses nostalgia, longing, and bittersweet remembrance',
      pt: 'Considerada intraduzível, engloba nostalgia, saudade e lembrança agridoce'
    },
    category: 'language',
    pronunciation: {
      en: 'sah-oo-DAH-deh',
      pt: 'sau-DA-de'
    }
  },
  'pastéis de nata': {
    term: 'Pastéis de Nata',
    definition: {
      en: 'Traditional Portuguese custard tarts with flaky pastry and creamy filling',
      pt: 'Pastéis tradicionais portugueses com massa folhada e recheio cremoso'
    },
    culturalContext: {
      en: 'Originated in Belém monastery, now a symbol of Portuguese cuisine worldwide',
      pt: 'Originários do mosteiro de Belém, agora símbolo da culinária portuguesa mundial'
    },
    category: 'food',
    pronunciation: {
      en: 'pahs-TAYSH deh NAH-tah',
      pt: 'pas-TÉIS de NA-ta'
    }
  },
  'azulejo': {
    term: 'Azulejo',
    definition: {
      en: 'Traditional Portuguese painted ceramic tiles, often blue and white',
      pt: 'Azulejos tradicionais portugueses pintados em cerâmica, frequentemente azuis e brancos'
    },
    culturalContext: {
      en: 'Decorates buildings throughout Portugal and former colonies, telling stories through art',
      pt: 'Decora edifícios por Portugal e antigas colónias, contando histórias através da arte'
    },
    category: 'tradition',
    pronunciation: {
      en: 'ah-zoo-LAY-zhoo',
      pt: 'a-zu-LE-jo'
    }
  },
  'bacalhau': {
    term: 'Bacalhau',
    definition: {
      en: 'Salted cod fish, fundamental ingredient in Portuguese cuisine with over 365 recipes',
      pt: 'Bacalhau salgado, ingrediente fundamental da culinária portuguesa com mais de 365 receitas'
    },
    culturalContext: {
      en: 'Called "fiel amigo" (faithful friend), it sustained Portuguese sailors on long voyages',
      pt: 'Chamado "fiel amigo", sustentou marinheiros portugueses em longas viagens'
    },
    category: 'food',
    pronunciation: {
      en: 'bah-kah-LYAH-oo',
      pt: 'ba-ca-LHAU'
    }
  },
  'camões': {
    term: 'Camões',
    definition: {
      en: 'Luís Vaz de Camões, Portugal\'s greatest poet, author of "Os Lusíadas"',
      pt: 'Luís Vaz de Camões, o maior poeta português, autor de "Os Lusíadas"'
    },
    culturalContext: {
      en: 'His epic poem celebrates Portuguese maritime achievements and national identity',
      pt: 'O seu poema épico celebra as conquistas marítimas e identidade nacional portuguesa'
    },
    category: 'history',
    pronunciation: {
      en: 'kah-MOINSH',
      pt: 'ca-MÕES'
    }
  },
  'lusitânia': {
    term: 'Lusitânia',
    definition: {
      en: 'Ancient Roman province corresponding to modern-day Portugal',
      pt: 'Antiga província romana correspondente ao atual Portugal'
    },
    culturalContext: {
      en: 'Origin of "Lusophone" (Portuguese-speaking) and Portuguese cultural identity',
      pt: 'Origem de "Lusófono" (falante de português) e identidade cultural portuguesa'
    },
    category: 'history'
  },
  'morna': {
    term: 'Morna',
    definition: {
      en: 'Traditional Cape Verdean music genre, similar to the blues, expressing melancholy and longing',
      pt: 'Género musical tradicional cabo-verdiano, similar ao blues, expressando melancolia e saudade'
    },
    culturalContext: {
      en: 'Made famous by Cesária Évora, it represents the soul of Cape Verde',
      pt: 'Tornada famosa por Cesária Évora, representa a alma de Cabo Verde'
    },
    category: 'music'
  },
  'kizomba': {
    term: 'Kizomba',
    definition: {
      en: 'Angolan music and dance genre that became popular worldwide',
      pt: 'Género musical e de dança angolano que se tornou popular mundialmente'
    },
    culturalContext: {
      en: 'Represents modern Angolan culture and African Portuguese identity',
      pt: 'Representa a cultura angolana moderna e identidade portuguesa africana'
    },
    category: 'music'
  }
};

const getCategoryColor = (category: CulturalTerm['category']) => {
  const colors = {
    music: 'from-purple-500 to-pink-500',
    food: 'from-orange-500 to-red-500',
    tradition: 'from-blue-500 to-indigo-500',
    place: 'from-green-500 to-teal-500',
    language: 'from-yellow-500 to-orange-500',
    history: 'from-gray-500 to-slate-600'
  };
  return colors[category] || colors.tradition;
};

const getCategoryIcon = (category: CulturalTerm['category']) => {
  switch (category) {
    case 'music': return '🎵';
    case 'food': return '🍽️';
    case 'tradition': return '🎨';
    case 'place': return '🌍';
    case 'language': return '💬';
    case 'history': return '📚';
    default: return '🇵🇹';
  }
};

function CulturalTooltip({ term, children, className = '', inline = true }: CulturalTooltipProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const termKey = term.toLowerCase();
  const termData = CULTURAL_TERMS[termKey];

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let top = triggerRect.top + scrollTop - tooltipRect.height - 10;
    let left = triggerRect.left + scrollLeft + triggerRect.width / 2 - tooltipRect.width / 2;

    // Adjust if tooltip goes off-screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < scrollTop + 10) {
      top = triggerRect.bottom + scrollTop + 10;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  if (!termData) {
    // Return children without tooltip if term not found
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={`${inline ? 'inline' : 'block'} cursor-help border-b-2 border-dotted border-primary-400 hover:border-primary-600 transition-colors ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        aria-describedby={`tooltip-${termKey}`}
        tabIndex={0}
      >
        {children}
      </span>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            id={`tooltip-${termKey}`}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed z-[9999] max-w-sm"
            style={{ top: position.top, left: position.left }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header with category badge */}
              <div className={`p-4 bg-gradient-to-r ${getCategoryColor(termData.category)} text-white`}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(termData.category)}</span>
                  <h3 className="font-bold text-lg">{termData.term}</h3>
                </div>
                {termData.pronunciation && (
                  <div className="mt-1 text-sm opacity-90">
                    /{language === 'pt' ? termData.pronunciation.pt : termData.pronunciation.en}/
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {language === 'pt' ? termData.definition.pt : termData.definition.en}
                </p>

                {termData.culturalContext && (
                  <div className="bg-primary-50 border-l-4 border-primary-400 p-3 rounded-r">
                    <div className="flex items-start space-x-2">
                      <HeartIcon className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-primary-800 text-xs leading-relaxed">
                        <strong>{language === 'pt' ? 'Contexto Cultural:' : 'Cultural Context:'}</strong>
                        <br />
                        {language === 'pt' ? termData.culturalContext.pt : termData.culturalContext.en}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with category */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="capitalize">
                    {termData.category} • {language === 'pt' ? 'Cultura Portuguesa' : 'Portuguese Culture'}
                  </span>
                  <span>🇵🇹</span>
                </div>
              </div>

              {/* Arrow pointer */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook to automatically wrap cultural terms in tooltips
export function usePortugueseCulturalTooltips(text: string): React.ReactNode {
  const processText = (inputText: string): React.ReactNode => {
    let processedText = inputText;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Sort terms by length (longest first) to avoid partial matches
    const sortedTerms = Object.keys(CULTURAL_TERMS).sort((a, b) => b.length - a.length);

    for (const termKey of sortedTerms) {
      const term = CULTURAL_TERMS[termKey].term;
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;

      while ((match = regex.exec(processedText)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          elements.push(processedText.slice(lastIndex, match.index));
        }

        // Add the tooltip-wrapped term
        elements.push(
          <CulturalTooltip key={`${termKey}-${match.index}`} term={termKey}>
            {match[0]}
          </CulturalTooltip>
        );

        lastIndex = match.index + match[0].length;
      }
    }

    // Add remaining text
    if (lastIndex < processedText.length) {
      elements.push(processedText.slice(lastIndex));
    }

    return elements.length > 0 ? elements : inputText;
  };

  return processText(text);
}

// Component to display all available cultural terms
export function CulturalTermsGlossary() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'music', 'food', 'tradition', 'place', 'language', 'history'];
  const filteredTerms = Object.values(CULTURAL_TERMS).filter(
    term => selectedCategory === 'all' || term.category === selectedCategory
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Glossário Cultural Português' : 'Portuguese Cultural Glossary'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Explore termos culturais portugueses e lusófonos'
            : 'Explore Portuguese and Lusophone cultural terms'
          }
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' 
                ? (language === 'pt' ? 'Todos' : 'All')
                : `${getCategoryIcon(category as CulturalTerm['category'])} ${category.charAt(0).toUpperCase() + category.slice(1)}`
              }
            </button>
          ))}
        </div>
      </div>

      {/* Terms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map(term => (
          <div key={term.term} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <CulturalTooltip term={term.term.toLowerCase()} inline={false}>
                <h3 className="font-semibold text-lg text-gray-900">{term.term}</h3>
              </CulturalTooltip>
              <span className="text-lg">{getCategoryIcon(term.category)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {language === 'pt' ? term.definition.pt : term.definition.en}
            </p>
            <div className="text-xs text-gray-500 capitalize">
              {term.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CulturalTooltip;