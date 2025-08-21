"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  BookOpenIcon,
  HeartIcon,
  QuoteIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface CulturalQuote {
  id: string;
  category: 'proverb' | 'literature' | 'fado' | 'wisdom' | 'modern';
  textPt: string;
  textEn: string;
  author: {
    name: string;
    period: string;
    origin: string;
    flag: string;
  };
  context: {
    pt: string;
    en: string;
  };
  culturalSignificance: {
    pt: string;
    en: string;
  };
  modernRelevance: {
    pt: string;
    en: string;
  };
}

const culturalQuotes: CulturalQuote[] = [
  {
    id: 'camoes_1',
    category: 'literature',
    textPt: "Mudam-se os tempos, mudam-se as vontades, muda-se o ser, muda-se a confiança.",
    textEn: "Times change, desires change, being changes, trust changes.",
    author: {
      name: "Luís de Camões",
      period: "1524-1580",
      origin: "Portugal",
      flag: "🇵🇹"
    },
    context: {
      pt: "Do poema 'Redondilhas' - reflexão sobre a mutabilidade da vida",
      en: "From the poem 'Redondilhas' - reflection on life's mutability"
    },
    culturalSignificance: {
      pt: "Camões expressa a filosofia portuguesa sobre aceitação da mudança",
      en: "Camões expresses Portuguese philosophy about accepting change"
    },
    modernRelevance: {
      pt: "Ressoa com imigrantes portugueses adaptando-se à vida em Londres",
      en: "Resonates with Portuguese immigrants adapting to life in London"
    }
  },
  {
    id: 'pessoa_1',
    category: 'literature',
    textPt: "Navegar é preciso; viver não é preciso.",
    textEn: "To sail is necessary; to live is not necessary.",
    author: {
      name: "Fernando Pessoa",
      period: "1888-1935",
      origin: "Portugal",
      flag: "🇵🇹"
    },
    context: {
      pt: "Inspirado no lema dos navegadores portugueses antigos",
      en: "Inspired by the motto of ancient Portuguese navigators"
    },
    culturalSignificance: {
      pt: "Representa o espírito explorador português e coragem de partir",
      en: "Represents the Portuguese explorer spirit and courage to leave"
    },
    modernRelevance: {
      pt: "Fala a todos os portugueses que partiram para encontrar nova vida",
      en: "Speaks to all Portuguese who left to find new life"
    }
  },
  {
    id: 'proverb_1',
    category: 'proverb',
    textPt: "Quem tem amigos, tem tudo.",
    textEn: "Those who have friends, have everything.",
    author: {
      name: "Provérbio Português",
      period: "Tradicional",
      origin: "Portugal",
      flag: "🇵🇹"
    },
    context: {
      pt: "Sabedoria popular sobre a importância da amizade",
      en: "Folk wisdom about the importance of friendship"
    },
    culturalSignificance: {
      pt: "Reflete a valorização portuguesa das relações humanas",
      en: "Reflects Portuguese valuation of human relationships"
    },
    modernRelevance: {
      pt: "Essencial para comunidades portuguesas em Londres construindo laços",
      en: "Essential for Portuguese communities in London building bonds"
    }
  },
  {
    id: 'machado_1',
    category: 'literature',
    textPt: "A vida é uma ópera e uma grande ópera.",
    textEn: "Life is an opera and a grand opera.",
    author: {
      name: "Machado de Assis",
      period: "1839-1908", 
      origin: "Brasil",
      flag: "🇧🇷"
    },
    context: {
      pt: "Do romance 'Dom Casmurro' sobre a teatralidade da vida",
      en: "From the novel 'Dom Casmurro' about life's theatricality"
    },
    culturalSignificance: {
      pt: "Machado captura a perspectiva brasileira sobre drama e vida",
      en: "Machado captures Brazilian perspective on drama and life"
    },
    modernRelevance: {
      pt: "Fala às experiências dramáticas da imigração brasileira",
      en: "Speaks to the dramatic experiences of Brazilian immigration"
    }
  },
  {
    id: 'fado_wisdom',
    category: 'fado',
    textPt: "O fado não se canta, sente-se.",
    textEn: "Fado is not sung, it is felt.",
    author: {
      name: "Sabedoria do Fado",
      period: "Tradicional",
      origin: "Lisboa",
      flag: "🇵🇹"
    },
    context: {
      pt: "Filosofia tradicional sobre a natureza emocional do fado",
      en: "Traditional philosophy about the emotional nature of fado"
    },
    culturalSignificance: {
      pt: "Fado como expressão da alma portuguesa e da saudade",
      en: "Fado as expression of Portuguese soul and saudade"
    },
    modernRelevance: {
      pt: "Noites de fado em Londres conectam corações lusófonos",
      en: "Fado nights in London connect Portuguese hearts"
    }
  },
  {
    id: 'drummond_1',
    category: 'modern',
    textPt: "No meio do caminho tinha uma pedra.",
    textEn: "In the middle of the road there was a stone.",
    author: {
      name: "Carlos Drummond de Andrade",
      period: "1902-1987",
      origin: "Brasil",
      flag: "🇧🇷"
    },
    context: {
      pt: "Poema icônico sobre obstáculos e persistência",
      en: "Iconic poem about obstacles and persistence"
    },
    culturalSignificance: {
      pt: "Representa a capacidade brasileira de superar dificuldades",
      en: "Represents Brazilian capacity to overcome difficulties"
    },
    modernRelevance: {
      pt: "Ressoa com desafios da adaptação cultural em Londres",
      en: "Resonates with challenges of cultural adaptation in London"
    }
  },
  {
    id: 'saramago_1',
    category: 'modern',
    textPt: "Somos a memória que temos e a responsabilidade que assumimos.",
    textEn: "We are the memory we have and the responsibility we assume.",
    author: {
      name: "José Saramago",
      period: "1922-2010",
      origin: "Portugal",
      flag: "🇵🇹"
    },
    context: {
      pt: "Reflexão sobre identidade e dever moral",
      en: "Reflection on identity and moral duty"
    },
    culturalSignificance: {
      pt: "Saramago sobre preservar cultura e assumir responsabilidades",
      en: "Saramago on preserving culture and assuming responsibilities"
    },
    modernRelevance: {
      pt: "Fala à missão de preservar cultura portuguesa em Londres",
      en: "Speaks to the mission of preserving Portuguese culture in London"
    }
  },
  {
    id: 'cesaria_1',
    category: 'modern',
    textPt: "Sodade é um sentimento que não se explica, só se sente.",
    textEn: "Sodade is a feeling that cannot be explained, only felt.",
    author: {
      name: "Cesária Évora",
      period: "1941-2011",
      origin: "Cabo Verde",
      flag: "🇨🇻"
    },
    context: {
      pt: "A diva do fado cabo-verdiano sobre saudade/sodade",
      en: "The Cape Verdean fado diva on saudade/sodade"
    },
    culturalSignificance: {
      pt: "Expressa o sentimento universal lusófono de saudade",
      en: "Expresses the universal Portuguese feeling of saudade"
    },
    modernRelevance: {
      pt: "Une toda a diáspora lusófona através do sentimento compartilhado",
      en: "Unites the entire Portuguese diaspora through shared feeling"
    }
  }
];

const PortugueseCulturalQuotes: React.FC = () => {
  const { language } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const currentQuote = culturalQuotes[currentQuoteIndex];

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % culturalQuotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval);
  }, [autoRotate]);

  const nextQuote = () => {
    setAutoRotate(false);
    setCurrentQuoteIndex((prev) => (prev + 1) % culturalQuotes.length);
  };

  const prevQuote = () => {
    setAutoRotate(false);
    setCurrentQuoteIndex((prev) => (prev - 1 + culturalQuotes.length) % culturalQuotes.length);
  };

  const getCategoryIcon = (category: CulturalQuote['category']) => {
    const iconMap = {
      'proverb': <SparklesIcon className="w-5 h-5" />,
      'literature': <BookOpenIcon className="w-5 h-5" />,
      'fado': <HeartIcon className="w-5 h-5" />,
      'wisdom': <GlobeAltIcon className="w-5 h-5" />,
      'modern': <QuoteIcon className="w-5 h-5" />
    };
    return iconMap[category] || <QuoteIcon className="w-5 h-5" />;
  };

  const getCategoryName = (category: CulturalQuote['category']) => {
    const categoryMap = {
      'proverb': { pt: 'Provérbio', en: 'Proverb' },
      'literature': { pt: 'Literatura', en: 'Literature' },
      'fado': { pt: 'Fado', en: 'Fado' },
      'wisdom': { pt: 'Sabedoria', en: 'Wisdom' },
      'modern': { pt: 'Moderno', en: 'Modern' }
    };
    return categoryMap[category][language] || category;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-200 via-secondary-100 to-accent-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-secondary-200 via-accent-100 to-coral-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-primary-400 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-secondary-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-6 py-3 mb-6">
            <QuoteIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">
              {language === "pt" ? "Sabedoria Lusófona" : "Portuguese Wisdom"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "pt" 
              ? "Palavras que Definem a Nossa Alma" 
              : "Words that Define Our Soul"}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "pt"
              ? "Descubra a profundidade da sabedoria portuguesa através de citações que atravessam séculos e unem corações lusófonos."
              : "Discover the depth of Portuguese wisdom through quotes that span centuries and unite Portuguese hearts."
            }
          </p>
        </motion.div>

        {/* Main Quote Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-4 py-2">
                    {getCategoryIcon(currentQuote.category)}
                    <span className="text-primary-700 font-medium text-sm">
                      {getCategoryName(currentQuote.category)}
                    </span>
                    <span className="text-2xl ml-2">{currentQuote.author.flag}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-center mb-8">
                  <div className="text-6xl text-primary-200 mb-4">❝</div>
                  <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-4 italic">
                    {language === "pt" ? currentQuote.textPt : currentQuote.textEn}
                  </p>
                  <div className="text-6xl text-primary-200 rotate-180">❝</div>
                </blockquote>

                {/* Author Info */}
                <div className="text-center mb-6">
                  <cite className="text-xl font-semibold text-gray-900 not-italic">
                    {currentQuote.author.name}
                  </cite>
                  <div className="text-sm text-gray-600 mt-1">
                    {currentQuote.author.period} • {currentQuote.author.origin}
                  </div>
                </div>

                {/* Context & Significance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <BookOpenIcon className="w-4 h-4 text-primary-600" />
                      {language === "pt" ? "Contexto" : "Context"}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === "pt" ? currentQuote.context.pt : currentQuote.context.en}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-xl p-6 border border-secondary-100">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <HeartIcon className="w-4 h-4 text-secondary-600" />
                      {language === "pt" ? "Relevância Moderna" : "Modern Relevance"}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === "pt" ? currentQuote.modernRelevance.pt : currentQuote.modernRelevance.en}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
              <button
                onClick={prevQuote}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === "pt" ? "Anterior" : "Previous"}
                </span>
              </button>

              {/* Quote Indicators */}
              <div className="flex items-center gap-2">
                {culturalQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoRotate(false);
                      setCurrentQuoteIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? 'bg-primary-500 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextQuote}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium">
                  {language === "pt" ? "Próxima" : "Next"}
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cultural Legacy Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            {language === "pt" 
              ? "Preserve a Nossa Herança Cultural" 
              : "Preserve Our Cultural Heritage"}
          </h3>
          <p className="text-lg opacity-95 max-w-2xl mx-auto leading-relaxed">
            {language === "pt"
              ? "Estas palavras não são apenas citações - são pontes entre o passado e o presente, ligando corações portugueses em Londres e pelo mundo."
              : "These words are not just quotes - they are bridges between past and present, connecting Portuguese hearts in London and around the world."
            }
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-4xl opacity-75">
            🇵🇹 🇧🇷 🇦🇴 🇲🇿 🇨🇻 🇬🇼 🇸🇹 🇹🇱
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortugueseCulturalQuotes;