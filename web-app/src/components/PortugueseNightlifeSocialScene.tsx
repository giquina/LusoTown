"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MoonIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  FireIcon,
  StarIcon,
  ArrowRightIcon,
  MusicalNoteIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface SocialExperience {
  id: string;
  titleEn: string;
  titlePt: string;
  category: 'tasca' | 'festival' | 'guitar_circle' | 'cafe' | 'dance_night' | 'fado_house';
  atmosphere: 'intimate' | 'vibrant' | 'social' | 'cultural' | 'celebratory' | 'authentic';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' | 'all_day';
  icon: string;
  descriptionEn: string;
  descriptionPt: string;
  socialMagic: {
    en: string;
    pt: string;
  };
  londonSpots: string[];
  typicalTiming: string;
  communityVibe: {
    en: string;
    pt: string;
  };
  whatToExpect: string[];
  culturalAuthenticity: {
    en: string;
    pt: string;
  };
  socialBenefits: string[];
}

const socialExperiences: SocialExperience[] = [
  {
    id: "tasca_culture",
    titleEn: "Tasca Culture - Intimate Portuguese Taverns",
    titlePt: "Cultura de Tasca - Tabernas Portuguesas Íntimas",
    category: "tasca",
    atmosphere: "intimate",
    timeOfDay: "evening",
    icon: "🍷",
    descriptionEn: "Intimate Portuguese taverns where live fado, warm conversation, and authentic community atmosphere create magical evenings. These are the heart of Portuguese social life.",
    descriptionPt: "Tabernas portuguesas íntimas onde fado ao vivo, conversas calorosas e atmosfera comunitária autêntica criam noites mágicas. Estas são o coração da vida social portuguesa.",
    socialMagic: {
      en: "Tascas create instant intimacy between strangers. You'll share tables, stories, and emotions with people who become friends by the end of the evening.",
      pt: "As tascas criam intimidade instantânea entre estranhos. Partilhará mesas, histórias e emoções com pessoas que se tornam amigas no final da noite."
    },
    londonSpots: ["Casa do Bacalhau (Borough)", "Taberna Real (Vauxhall)", "O Tasco (Stockwell)", "Adega (Bermondsey)"],
    typicalTiming: "7pm - 11pm, Thursday to Saturday",
    communityVibe: {
      en: "Multigenerational gatherings where elderly Portuguese share wisdom with young professionals, creating beautiful intergenerational connections.",
      pt: "Encontros multigeracionais onde portugueses idosos partilham sabedoria com jovens profissionais, criando belas conexões intergeracionais."
    },
    whatToExpect: ["Live fado performance", "Shared dining tables", "Portuguese wine", "Warm conversations", "Emotional connections"],
    culturalAuthenticity: {
      en: "Authentic Portuguese hospitality where everyone is treated like family, and the warmth is genuine and overwhelming.",
      pt: "Hospitalidade portuguesa autêntica onde todos são tratados como família, e o calor é genuíno e avassalador."
    },
    socialBenefits: ["Deep connections", "Cultural immersion", "Emotional release", "Community belonging", "Authentic friendships"]
  },
  {
    id: "santos_populares_festivals",
    titleEn: "Santos Populares Street Festivals",
    titlePt: "Festivais de Rua Santos Populares",
    category: "festival",
    atmosphere: "celebratory",
    timeOfDay: "all_day",
    icon: "🎉",
    descriptionEn: "Incredible street festivals celebrating Santo António, São João, and São Pedro with grilled sardines, community dancing, and infectious Portuguese joy that transforms London streets.",
    descriptionPt: "Festivais de rua incríveis celebrando Santo António, São João e São Pedro com sardinhas grelhadas, dança comunitária e alegria portuguesa contagiosa que transforma as ruas de Londres.",
    socialMagic: {
      en: "These festivals create pure community magic. Everyone dances together - children, grandparents, newcomers. The joy is absolutely infectious and unforgettable.",
      pt: "Estes festivais criam magia comunitária pura. Todos dançam juntos - crianças, avós, recém-chegados. A alegria é absolutamente contagiosa e inesquecível."
    },
    londonSpots: ["Stockwell Park", "Portuguese Centre courtyards", "Borough Market area", "Community squares across London"],
    typicalTiming: "June 13th (Santo António), June 24th (São João), June 29th (São Pedro)",
    communityVibe: {
      en: "The entire Portuguese-speaking community comes together in joyous celebration, creating the most welcoming and inclusive atmosphere imaginable.",
      pt: "Toda a comunidade de falantes de português junta-se em celebração alegre, criando a atmosfera mais acolhedora e inclusiva imaginável."
    },
    whatToExpect: ["Grilled sardines", "Traditional decorations", "Community dancing", "Live music", "Street parties", "Traditional games"],
    culturalAuthenticity: {
      en: "These are Portugal's most beloved festivals, recreated with complete authenticity and passion in London's Portuguese communities.",
      pt: "Estes são os festivais mais amados de Portugal, recriados com total autenticidade e paixão nas comunidades portuguesas de Londres."
    },
    socialBenefits: ["Community celebration", "Cultural pride", "Intergenerational bonding", "Neighborhood connections", "Joyful memories"]
  },
  {
    id: "guitar_circles",
    titleEn: "Portuguese Guitar Circles",
    titlePt: "Círculos de Guitarra Portuguesa",
    category: "guitar_circle",
    atmosphere: "intimate",
    timeOfDay: "evening",
    icon: "🎸",
    descriptionEn: "Intimate acoustic sessions where Portuguese hearts connect through music. Everyone shares songs, stories, and the magical sound of guitarra portuguesa.",
    descriptionPt: "Sessões acústicas íntimas onde corações portugueses se conectam através da música. Todos partilham canções, histórias e o som mágico da guitarra portuguesa.",
    socialMagic: {
      en: "Music transcends language barriers. You'll find yourself emotionally connected to people through shared melodies, even if you're just listening.",
      pt: "A música transcende barreiras linguísticas. Encontrar-se-á emocionalmente conectado às pessoas através de melodias partilhadas, mesmo que esteja apenas a ouvir."
    },
    londonSpots: ["Private homes", "Portuguese cultural centres", "Small intimate venues", "Community spaces"],
    typicalTiming: "Friday evenings, 7pm - 10pm",
    communityVibe: {
      en: "These circles welcome everyone - musicians and music lovers alike. The atmosphere is supportive, nurturing, and deeply emotional.",
      pt: "Estes círculos acolhem todos - músicos e amantes da música. A atmosfera é apoiante, nutritiva e profundamente emocional."
    },
    whatToExpect: ["Guitar portuguesa music", "Shared songs", "Emotional stories", "Intimate setting", "Musical participation"],
    culturalAuthenticity: {
      en: "The guitar portuguesa's unique sound is central to Portuguese musical identity, creating authentic cultural experiences.",
      pt: "O som único da guitarra portuguesa é central à identidade musical portuguesa, criando experiências culturais autênticas."
    },
    socialBenefits: ["Musical expression", "Emotional connection", "Cultural learning", "Artistic appreciation", "Deep friendships"]
  },
  {
    id: "portuguese_cafe_culture",
    titleEn: "Portuguese Café Culture - Social Gathering Spaces",
    titlePt: "Cultura de Café Portuguesa - Espaços de Encontro Social",
    category: "cafe",
    atmosphere: "social",
    timeOfDay: "morning",
    icon: "☕",
    descriptionEn: "Traditional Portuguese cafés where strong coffee, pastéis de nata, and animated conversation create the perfect social atmosphere for community bonding.",
    descriptionPt: "Cafés portugueses tradicionais onde café forte, pastéis de nata e conversas animadas criam a atmosfera social perfeita para união comunitária.",
    socialMagic: {
      en: "Portuguese cafés are community living rooms where regulars become family, and newcomers are warmly welcomed into ongoing conversations.",
      pt: "Os cafés portugueses são salas de estar comunitárias onde os habituais se tornam família, e os recém-chegados são calorosamente acolhidos em conversas contínuas."
    },
    londonSpots: ["Café da Esquina (Stockwell)", "Pastelaria Ribatejo (Vauxhall)", "Café Central (Harrow)", "Local Portuguese bakeries"],
    typicalTiming: "Morning coffee: 7am - 11am, Afternoon chat: 3pm - 6pm",
    communityVibe: {
      en: "These spaces buzz with Portuguese conversation, where community news is shared, friendships are formed, and cultural connections are maintained.",
      pt: "Estes espaços fervilham com conversas portuguesas, onde notícias da comunidade são partilhadas, amizades se formam e conexões culturais são mantidas."
    },
    whatToExpect: ["Strong Portuguese coffee", "Fresh pastéis de nata", "Animated conversations", "Community news", "Cultural discussions"],
    culturalAuthenticity: {
      en: "Authentic Portuguese café culture where time moves slowly, conversations are deep, and community connections are treasured.",
      pt: "Cultura de café portuguesa autêntica onde o tempo move-se devagar, as conversas são profundas e as conexões comunitárias são valorizadas."
    },
    socialBenefits: ["Daily community", "Cultural preservation", "Social routine", "Information sharing", "Multigenerational connection"]
  },
  {
    id: "traditional_dance_nights",
    titleEn: "Traditional Portuguese Dance Nights",
    titlePt: "Noites de Dança Tradicional Portuguesa",
    category: "dance_night",
    atmosphere: "vibrant",
    timeOfDay: "evening",
    icon: "💃",
    descriptionEn: "Community events teaching and celebrating Portuguese traditional dances like Vira and Corridinho, where everyone learns, laughs, and connects through movement.",
    descriptionPt: "Eventos comunitários ensinando e celebrando danças tradicionais portuguesas como Vira e Corridinho, onde todos aprendem, riem e se conectam através do movimento.",
    socialMagic: {
      en: "Dancing breaks down all social barriers. Within minutes, strangers are holding hands, laughing together, and creating joyful memories that last forever.",
      pt: "A dança quebra todas as barreiras sociais. Em minutos, estranhos estão de mãos dadas, rindo juntos e criando memórias alegres que duram para sempre."
    },
    londonSpots: ["Portuguese Centre (Stockwell)", "Community halls", "Cultural associations", "Church halls"],
    typicalTiming: "Saturday evenings, 7pm - 11pm",
    communityVibe: {
      en: "These nights welcome all ages and skill levels. Experienced dancers patiently teach newcomers, creating inclusive and joyful learning environments.",
      pt: "Estas noites acolhem todas as idades e níveis de habilidade. Dançarinos experientes ensinam pacientemente os novatos, criando ambientes de aprendizagem inclusivos e alegres."
    },
    whatToExpect: ["Traditional Portuguese dances", "Patient teaching", "Community inclusion", "Live music", "Joyful atmosphere", "Cultural costumes"],
    culturalAuthenticity: {
      en: "These dances preserve centuries-old Portuguese traditions, maintaining cultural identity through movement and music.",
      pt: "Estas danças preservam tradições portuguesas centenárias, mantendo a identidade cultural através do movimento e música."
    },
    socialBenefits: ["Physical activity", "Cultural learning", "Community bonding", "Stress relief", "Intergenerational sharing"]
  },
  {
    id: "fado_houses",
    titleEn: "Fado Houses - Where Portuguese Souls Connect",
    titlePt: "Casas de Fado - Onde Almas Portuguesas se Conectam",
    category: "fado_house",
    atmosphere: "cultural",
    timeOfDay: "night",
    icon: "🎵",
    descriptionEn: "Intimate venues where Portuguese soul comes alive through fado music, creating deeply emotional experiences that touch hearts and build profound connections.",
    descriptionPt: "Locais íntimos onde a alma portuguesa ganha vida através da música do fado, criando experiências profundamente emocionais que tocam corações e constroem conexões profundas.",
    socialMagic: {
      en: "Fado creates shared emotional experiences. Strangers cry together, feel together, and leave with deep understanding of Portuguese saudade.",
      pt: "O fado cria experiências emocionais partilhadas. Estranhos choram juntos, sentem juntos e saem com profundo entendimento da saudade portuguesa."
    },
    londonSpots: ["Traditional Portuguese restaurants", "Cultural centres", "Intimate performance spaces", "Private fado evenings"],
    typicalTiming: "Thursday to Sunday evenings, 8pm - 11pm",
    communityVibe: {
      en: "Reverent and emotional atmosphere where the entire community respects the art form and connects through shared Portuguese heritage.",
      pt: "Atmosfera reverente e emocional onde toda a comunidade respeita a forma de arte e se conecta através da herança portuguesa partilhada."
    },
    whatToExpected: ["Live fado performances", "Emotional atmosphere", "Portuguese wine", "Respectful silence", "Deep cultural connection"],
    culturalAuthenticity: {
      en: "UNESCO-recognized fado maintains its authentic form in London, preserving the true essence of Portuguese emotional expression.",
      pt: "O fado reconhecido pela UNESCO mantém a sua forma autêntica em Londres, preservando a verdadeira essência da expressão emocional portuguesa."
    },
    socialBenefits: ["Emotional release", "Cultural pride", "Spiritual connection", "Heritage preservation", "Deep understanding"]
  }
];

const PortugueseNightlifeSocialScene: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<SocialExperience | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Social Scenes', namePt: 'Todas Cenas Sociais', icon: '🌟' },
    { id: 'tasca', nameEn: 'Tasca Culture', namePt: 'Cultura Tasca', icon: '🍷' },
    { id: 'festival', nameEn: 'Street Festivals', namePt: 'Festivais de Rua', icon: '🎉' },
    { id: 'cafe', nameEn: 'Café Culture', namePt: 'Cultura Café', icon: '☕' },
    { id: 'fado_house', nameEn: 'Fado Houses', namePt: 'Casas de Fado', icon: '🎵' },
    { id: 'dance_night', nameEn: 'Dance Nights', namePt: 'Noites de Dança', icon: '💃' }
  ];

  const filteredExperiences = selectedCategory === 'all' 
    ? socialExperiences 
    : socialExperiences.filter(exp => exp.category === selectedCategory);

  const getAtmosphereColor = (atmosphere: string) => {
    const colorMap: Record<string, string> = {
      'intimate': 'from-purple-500 to-indigo-500',
      'vibrant': 'from-orange-500 to-red-500',
      'social': 'from-green-500 to-blue-500',
      'cultural': 'from-indigo-500 to-purple-500',
      'celebratory': 'from-yellow-500 to-orange-500',
      'authentic': 'from-primary-500 to-secondary-500'
    };
    return colorMap[atmosphere] || 'from-primary-500 to-secondary-500';
  };

  const getTimeIcon = (timeOfDay: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'morning': <SunIcon className="w-4 h-4" />,
      'afternoon': <SunIcon className="w-4 h-4" />,
      'evening': <MoonIcon className="w-4 h-4" />,
      'night': <MoonIcon className="w-4 h-4" />,
      'all_day': <GlobeAltIcon className="w-4 h-4" />
    };
    return iconMap[timeOfDay] || <ClockIcon className="w-4 h-4" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-orange-200 via-yellow-100 to-red-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-6 py-3 mb-6">
            <MoonIcon className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-indigo-700 font-medium">
              {language === "pt" ? "Vida Social Portuguesa" : "Portuguese Social Life"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "pt" 
              ? "Vida Noturna & Cena Social Vibrante" 
              : "Vibrant Nightlife & Social Scene"}
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            {language === "pt"
              ? "Descubra a cultura de tasca íntima, festivais de rua incríveis, círculos de guitarra, cultura de café e casas de fado onde a comunidade de falantes de português cria experiências sociais mágicas em Londres."
              : "Discover intimate tasca culture, incredible street festivals, guitar circles, café culture, and fado houses where the Portuguese-speaking community creates magical social experiences in London."
            }
          </p>

          <div className="inline-flex items-center gap-2 text-lg text-indigo-600 font-medium">
            <HeartIcon className="w-5 h-5" />
            <span>
              {language === "pt" ? "Onde a comunidade de falantes de português se conecta" : "Where the Portuguese-speaking community connects"}
            </span>
          </div>
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
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

        {/* Social Experiences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedExperience(experience)}
            >
              {/* Header with atmosphere gradient */}
              <div className={`h-2 bg-gradient-to-r ${getAtmosphereColor(experience.atmosphere)}`}></div>
              
              <div className="p-6">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                        {experience.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {language === "pt" ? experience.titlePt : experience.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="capitalize">{experience.atmosphere}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {getTimeIcon(experience.timeOfDay)}
                            <span className="capitalize">{experience.timeOfDay.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {language === "pt" ? experience.descriptionPt : experience.descriptionEn}
                </p>

                {/* Social Magic */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">
                      {language === "pt" ? "Magia Social" : "Social Magic"}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    {language === "pt" ? experience.socialMagic.pt : experience.socialMagic.en}
                  </p>
                </div>

                {/* London Spots */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Locais em Londres:" : "London Spots:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.londonSpots.slice(0, 2).map((spot, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                      >
                        {spot}
                      </span>
                    ))}
                    {experience.londonSpots.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{experience.londonSpots.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Typical Timing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{experience.typicalTiming}</span>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "O que esperar:" : "What to expect:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.whatToExpect.slice(0, 3).map((expectation, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                      >
                        {expectation}
                      </span>
                    ))}
                    {experience.whatToExpect.length > 3 && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        +{experience.whatToExpect.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  {language === "pt" ? "Juntar-se à Experiência" : "Join This Experience"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Scene Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white"
        >
          <div className="flex justify-center mb-4">
            <UserGroupIcon className="w-12 h-12 opacity-80" />
          </div>
          <blockquote className="text-2xl md:text-3xl italic mb-4">
            {language === "pt" 
              ? "\"A hospitalidade portuguesa transforma estranhos em família numa só noite.\""
              : "\"Portuguese hospitality transforms strangers into family in a single night.\""}
          </blockquote>
          <div className="mt-6">
            <p className="text-lg opacity-95">
              {language === "pt"
                ? "Junte-se à nossa vibrante cena social e descubra como a comunidade de falantes de português cria conexões mágicas em Londres."
                : "Join our vibrant social scene and discover how the Portuguese-speaking community creates magical connections in London."
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className={`h-2 bg-gradient-to-r ${getAtmosphereColor(selectedExperience.atmosphere)}`}></div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                    {selectedExperience.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {language === "pt" ? selectedExperience.titlePt : selectedExperience.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="capitalize">{selectedExperience.atmosphere}</span>
                      <span>•</span>
                      <span className="capitalize">{selectedExperience.timeOfDay.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === "pt" ? "Descrição" : "Description"}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {language === "pt" ? selectedExperience.descriptionPt : selectedExperience.descriptionEn}
                  </p>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-100">
                    <h5 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4" />
                      {language === "pt" ? "Magia Social" : "Social Magic"}
                    </h5>
                    <p className="text-indigo-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.socialMagic.pt : selectedExperience.socialMagic.en}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                    <h5 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <UserGroupIcon className="w-4 h-4" />
                      {language === "pt" ? "Ambiente Comunitário" : "Community Vibe"}
                    </h5>
                    <p className="text-green-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.communityVibe.pt : selectedExperience.communityVibe.en}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === "pt" ? "Detalhes Práticos" : "Practical Details"}
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-primary-500" />
                        {language === "pt" ? "Locais em Londres" : "London Spots"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.londonSpots.map((spot, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                          >
                            {spot}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-secondary-500" />
                        {language === "pt" ? "Horários Típicos" : "Typical Timing"}
                      </h5>
                      <p className="text-gray-600">{selectedExperience.typicalTiming}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-orange-500" />
                        {language === "pt" ? "O que Esperar" : "What to Expect"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.whatToExpect.map((expectation, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full"
                          >
                            {expectation}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <HeartIcon className="w-4 h-4 text-pink-500" />
                        {language === "pt" ? "Benefícios Sociais" : "Social Benefits"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.socialBenefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-50 text-pink-700 text-sm rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-100">
                      <h5 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <FireIcon className="w-4 h-4" />
                        {language === "pt" ? "Autenticidade Cultural" : "Cultural Authenticity"}
                      </h5>
                      <p className="text-yellow-700 leading-relaxed">
                        {language === "pt" ? selectedExperience.culturalAuthenticity.pt : selectedExperience.culturalAuthenticity.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium py-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Juntar-se a Esta Experiência" : "Join This Experience"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Ver Locais Próximos" : "Find Nearby Venues"}
                  <MapPinIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortugueseNightlifeSocialScene;