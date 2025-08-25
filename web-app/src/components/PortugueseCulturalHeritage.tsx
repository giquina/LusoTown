"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  MapPinIcon,
  CalendarDaysIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  BeakerIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface CulturalElement {
  id: string;
  nameEn: string;
  namePt: string;
  category: 'tradition' | 'cuisine' | 'music' | 'literature' | 'celebration' | 'heritage';
  icon: string;
  flag: string;
  region: string;
  descriptionEn: string;
  descriptionPt: string;
  significance: string;
  whenCelebrated?: string;
  whereFound: string[];
  funFact: {
    en: string;
    pt: string;
  };
}

const culturalElements: CulturalElement[] = [
  {
    id: "santos_populares",
    nameEn: "Santos Populares",
    namePt: "Santos Populares",
    category: "celebration",
    icon: "🎉",
    flag: "🇵🇹",
    region: "Portugal",
    descriptionEn: "Traditional Portuguese festivals celebrating popular saints, filled with music, dancing, grilled sardines, and community spirit.",
    descriptionPt: "Festivais tradicionais portugueses celebrando santos populares, cheios de música, dança, sardinhas grelhadas e espírito comunitário.",
    significance: "Community bonding and cultural preservation",
    whenCelebrated: "June (Santo António, São João, São Pedro)",
    whereFound: ["Stockwell", "Borough Market", "Lusophone Cultural Centers"],
    funFact: {
      en: "In London, Santos Populares brings together Portuguese speakers from all backgrounds to celebrate under the June sky.",
      pt: "Em Londres, os Santos Populares juntam lusófonos de todas as origens para celebrar sob o céu de junho."
    }
  },
  {
    id: "fado",
    nameEn: "Fado",
    namePt: "Fado",
    category: "music",
    icon: "🎵",
    flag: "🇵🇹",
    region: "Portugal (Lisboa, Coimbra)",
    descriptionEn: "UNESCO-recognized Portuguese music genre expressing saudade, loss, and melancholy with guitar accompaniment.",
    descriptionPt: "Género musical português reconhecido pela UNESCO que expressa saudade, perda e melancolia com acompanhamento de guitarra.",
    significance: "Soul of Lusophone emotional expression",
    whereFound: ["Kentish Town", "Soho", "Camden", "Traditional Lusophone Restaurants"],
    funFact: {
      en: "London's fado houses are where Lusophone hearts connect across generations and continents.",
      pt: "As casas de fado de Londres são onde os corações portugueses se conectam através de gerações e continentes."
    }
  },
  {
    id: "pasteis_de_nata",
    nameEn: "Pastéis de Nata",
    namePt: "Pastéis de Nata",
    category: "cuisine",
    icon: "🧁",
    flag: "🇵🇹",
    region: "Portugal (originated in Belém)",
    descriptionEn: "Iconic Lusophone custard tarts with flaky pastry and caramelized tops, a symbol of Lusophone culinary mastery.",
    descriptionPt: "Icónicos pastéis de nata portugueses com massa folhada e topo caramelizado, símbolo da maestria culinária portuguesa.",
    significance: "Culinary ambassador of Portugal worldwide",
    whereFound: ["Borough Market", "Lusophone Bakeries", "Cultural Workshops"],
    funFact: {
      en: "The secret recipe from Pastéis de Belém has been guarded for over 180 years, but London's Lusophone bakers create their own magic.",
      pt: "A receita secreta dos Pastéis de Belém é guardada há mais de 180 anos, mas os pasteleiros portugueses de Londres criam a sua própria magia."
    }
  },
  {
    id: "festa_junina",
    nameEn: "Festa Junina",
    namePt: "Festa Junina",
    category: "celebration",
    icon: "🌽",
    flag: "🇧🇷",
    region: "Brazil (nationwide)",
    descriptionEn: "Brazilian winter festivals celebrating rural life with traditional foods, quadrilha dancing, and bonfires.",
    descriptionPt: "Festivais brasileiros de inverno celebrando a vida rural com comidas tradicionais, dança de quadrilha e fogueiras.",
    significance: "Connection to Brazilian rural heritage",
    whenCelebrated: "June - July",
    whereFound: ["Vauxhall", "Brazilian Community Centers", "Parks across London"],
    funFact: {
      en: "London's Festa Junina brings the warmth of Brazilian winter celebrations to British summer nights.",
      pt: "A Festa Junina de Londres traz o calor das celebrações brasileiras de inverno para as noites de verão britânicas."
    }
  },
  {
    id: "saudade",
    nameEn: "Saudade",
    namePt: "Saudade",
    category: "heritage",
    icon: "💙",
    flag: "🇵🇹",
    region: "Portugal & Lusophone world",
    descriptionEn: "Untranslatable Lusophone emotion combining longing, nostalgia, and bittersweet remembrance.",
    descriptionPt: "Emoção portuguesa intraduzível que combina saudade, nostalgia e recordações agridoces.",
    significance: "Core of Lusophone emotional identity",
    whereFound: ["Poetry circles", "Fado houses", "Lusophone gatherings", "Literature groups"],
    funFact: {
      en: "Saudade is so uniquely Lusophone that it's considered one of the most difficult words to translate in any language.",
      pt: "A saudade é tão uniquamente portuguesa que é considerada uma das palavras mais difíceis de traduzir em qualquer idioma."
    }
  },
  {
    id: "vinho_verde",
    nameEn: "Vinho Verde",
    namePt: "Vinho Verde",
    category: "cuisine",
    icon: "🍾",
    flag: "🇵🇹",
    region: "Minho, Portugal",
    descriptionEn: "Light, refreshing Portuguese wine perfect for celebrations and summer gatherings.",
    descriptionPt: "Vinho português leve e refrescante perfeito para celebrações e encontros de verão.",
    significance: "Symbol of Lusophone conviviality",
    whereFound: ["Portuguese restaurants", "Wine bars", "Cultural tastings", "Community events"],
    funFact: {
      en: "Vinho Verde means 'green wine' but refers to young wine, not the color - though it pairs perfectly with London's Lusophone picnics.",
      pt: "Vinho Verde significa vinho jovem, não a cor - embora combine perfeitamente com os piqueniques portugueses de Londres."
    }
  }
];

const PortugueseCulturalHeritage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedElement, setSelectedElement] = useState<CulturalElement | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Heritage', namePt: 'Toda a Herança', icon: '🌍' },
    { id: 'celebration', nameEn: 'Celebrations', namePt: 'Celebrações', icon: '🎉' },
    { id: 'cuisine', nameEn: 'Cuisine', namePt: 'Gastronomia', icon: '🍷' },
    { id: 'music', nameEn: 'Music', namePt: 'Música', icon: '🎵' },
    { id: 'heritage', nameEn: 'Heritage', namePt: 'Herança', icon: '💙' }
  ];

  const filteredElements = selectedCategory === 'all' 
    ? culturalElements 
    : culturalElements.filter(element => element.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'tradition': <SparklesIcon className="w-5 h-5" />,
      'cuisine': <BeakerIcon className="w-5 h-5" />,
      'music': <MusicalNoteIcon className="w-5 h-5" />,
      'literature': <BookOpenIcon className="w-5 h-5" />,
      'celebration': <CalendarDaysIcon className="w-5 h-5" />,
      'heritage': <HeartIcon className="w-5 h-5" />
    };
    return iconMap[category] || <SparklesIcon className="w-5 h-5" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25"></div>
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
            <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-primary-700 font-medium">
              {language === "pt" ? "Herança Cultural" : "Cultural Heritage"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === "pt" 
              ? "Preserve e Celebre a Nossa Cultura" 
              : "Preserve and Celebrate Our Culture"}
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "pt"
              ? "Descubra as tradições, sabores e histórias que definem a nossa identidade lusófona em Londres."
              : "Discover the traditions, flavors, and stories that define our Lusophone identity in London."
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
              }`}
            >
              <span className="text-base">{category.icon}</span>
              <span className="font-medium">
                {language === "pt" ? category.namePt : category.nameEn}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Cultural Elements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredElements.map((element, index) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedElement(element)}
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-2xl">
                      {element.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                        {language === "pt" ? element.namePt : element.nameEn}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>{element.flag}</span>
                        <span>{element.region}</span>
                      </div>
                    </div>
                  </div>
                  {getCategoryIcon(element.category)}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {language === "pt" ? element.descriptionPt : element.descriptionEn}
                </p>

                {/* Where Found */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Onde encontrar em Londres:" : "Where to find in London:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {element.whereFound.slice(0, 2).map((location, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                      >
                        {location}
                      </span>
                    ))}
                    {element.whereFound.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{element.whereFound.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Fun Fact */}
                <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-3 border border-accent-100">
                  <div className="flex items-center gap-2 mb-1">
                    <StarIcon className="w-4 h-4 text-accent-600" />
                    <span className="text-xs font-medium text-accent-800">
                      {language === "pt" ? "Curiosidade" : "Fun Fact"}
                    </span>
                  </div>
                  <p className="text-xs text-accent-700 leading-relaxed">
                    {language === "pt" ? element.funFact.pt : element.funFact.en}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6">
                <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  {language === "pt" ? "Saber Mais" : "Learn More"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heritage Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
        >
          <blockquote className="text-2xl italic mb-4">
            {language === "pt" 
              ? "\"Um povo que não conhece a sua história está condenado a repeti-la.\""
              : "\"A people who don't know their history are condemned to repeat it.\""}
          </blockquote>
          <cite className="text-lg opacity-90">
            {language === "pt" ? "Adaptado de Edmund Burke" : "Adapted from Edmund Burke"}
          </cite>
          <div className="mt-6">
            <p className="text-lg opacity-95">
              {language === "pt"
                ? "Preserve a nossa cultura lusófona para as próximas gerações em Londres."
                : "Preserve our Portuguese culture for the next generations in London."
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal content would go here */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === "pt" ? selectedElement.namePt : selectedElement.nameEn}
                </h3>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              {/* Add more detailed content here */}
              <p className="text-gray-600 mb-4">
                {language === "pt" ? selectedElement.descriptionPt : selectedElement.descriptionEn}
              </p>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {language === "pt" ? selectedElement.funFact.pt : selectedElement.funFact.en}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortugueseCulturalHeritage;