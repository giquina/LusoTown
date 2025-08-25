"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MusicalNoteIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  FireIcon,
  StarIcon,
  ArrowRightIcon,
  PlayIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface MusicDanceExperience {
  id: string;
  titleEn: string;
  titlePt: string;
  category: 'fado' | 'folklore' | 'modern' | 'rancho' | 'guitar' | 'festival';
  atmosphere: 'intimate' | 'community' | 'energetic' | 'soulful' | 'celebratory';
  icon: string;
  descriptionEn: string;
  descriptionPt: string;
  emotionalImpact: {
    en: string;
    pt: string;
  };
  londonVenues: string[];
  whenToExperience: string;
  culturalSignificance: {
    en: string;
    pt: string;
  };
  participationLevel: 'listen' | 'participate' | 'learn' | 'perform';
  communityConnection: {
    en: string;
    pt: string;
  };
  soulFactors: string[];
}

const musicDanceExperiences: MusicDanceExperience[] = [
  {
    id: "fado_nights",
    titleEn: "Fado Nights - Soul of Portugal",
    titlePt: "Noites de Fado - Alma de Portugal",
    category: "fado",
    atmosphere: "soulful",
    icon: "🎵",
    descriptionEn: "Intimate evenings where the Lusophone soul comes alive through haunting melodies and heartfelt lyrics. Fado is the blues of Portugal - raw, emotional, and deeply moving.",
    descriptionPt: "Noites íntimas onde a alma portuguesa ganha vida através de melodias assombrosas e letras sentidas. O fado é o blues de Portugal - cru, emocional e profundamente tocante.",
    emotionalImpact: {
      en: "Fado creates deep emotional connections, bringing tears to your eyes and stirring feelings of saudade - that beautiful Lusophone longing that touches your soul.",
      pt: "O fado cria conexões emocionais profundas, trazendo lágrimas aos olhos e despertando sentimentos de saudade - essa bela saudade portuguesa que toca a alma."
    },
    londonVenues: ["Casa do Bacalhau (Borough)", "Taberna Real (Vauxhall)", "Lusophone Cultural Centre (Stockwell)", "The Bica (Portobello)"],
    whenToExperience: "Thursday evenings and Sunday afternoons",
    culturalSignificance: {
      en: "UNESCO recognized fado as Intangible Cultural Heritage. It's the musical expression of the Lusophone soul, born in Lisbon's neighborhoods.",
      pt: "A UNESCO reconheceu o fado como Património Cultural Imaterial. É a expressão musical da alma portuguesa, nascido nos bairros de Lisboa."
    },
    participationLevel: "listen",
    communityConnection: {
      en: "Fado nights bring together Portuguese speakers of all ages, creating intergenerational bonds through shared emotional experiences.",
      pt: "As noites de fado reúnem lusófonos de todas as idades, criando laços intergeracionais através de experiências emocionais partilhadas."
    },
    soulFactors: ["Haunting melodies", "Deep emotional lyrics", "Guitar portuguesa", "Intimate atmosphere", "Shared tears and smiles"]
  },
  {
    id: "folklore_dancing",
    titleEn: "Traditional Lusophone Folk Dancing",
    titlePt: "Danças Folclóricas Tradicionais Portuguesas",
    category: "folklore",
    atmosphere: "community",
    icon: "💃",
    descriptionEn: "Energetic circle dances like Vira and Corridinho that bring the community together. Feel the joy and connection as you dance with fellow Lusophone souls.",
    descriptionPt: "Danças de roda energéticas como Vira e Corridinho que unem a comunidade. Sinta a alegria e conexão ao dançar com outras almas portuguesas.",
    emotionalImpact: {
      en: "Folk dancing creates pure joy and community spirit. You'll feel the infectious energy and leave with a huge smile and new friendships.",
      pt: "As danças folclóricas criam alegria pura e espírito comunitário. Sentirá a energia contagiante e sairá com um sorriso enorme e novas amizades."
    },
    londonVenues: ["Lusophone Centre (Stockwell)", "Casa da Cultura (Harrow)", "St. Anthony's Church Hall (Stockwell)", "Community centres across London"],
    whenToExperience: "Saturday afternoons and festival days",
    culturalSignificance: {
      en: "These dances preserve ancient Portuguese traditions, passed down through generations to maintain cultural identity and community bonds.",
      pt: "Estas danças preservam tradições portuguesas antigas, transmitidas através de gerações para manter a identidade cultural e os laços comunitários."
    },
    participationLevel: "participate",
    communityConnection: {
      en: "No experience needed! The community welcomes everyone and teaches the steps. It's about joy, not perfection.",
      pt: "Não é necessária experiência! A comunidade acolhe todos e ensina os passos. É sobre alegria, não perfeição."
    },
    soulFactors: ["Infectious rhythms", "Community inclusion", "Traditional costumes", "Intergenerational dancing", "Pure joy"]
  },
  {
    id: "rancho_folklorico",
    titleEn: "Rancho Folclórico - Heritage Preservation",
    titlePt: "Rancho Folclórico - Preservação da Herança",
    category: "rancho",
    atmosphere: "celebratory",
    icon: "🌺",
    descriptionEn: "Traditional folk groups that preserve Portuguese heritage through music, dance, and stunning regional costumes. Experience authentic cultural performances.",
    descriptionPt: "Grupos folclóricos tradicionais que preservam a herança portuguesa através da música, dança e trajes regionais deslumbrantes. Experiencia performances culturais autênticas.",
    emotionalImpact: {
      en: "Watching rancho performances fills you with pride for Portuguese culture and connects you to centuries-old traditions.",
      pt: "Ver performances de rancho enche-o de orgulho pela cultura portuguesa e conecta-o a tradições centenárias."
    },
    londonVenues: ["Portuguese festivals", "Cultural exhibitions", "Church celebrations", "Community events"],
    whenToExperience: "Cultural festivals and special celebrations",
    culturalSignificance: {
      en: "Rancho groups maintain authentic regional traditions, each region having distinct dances, music, and beautiful traditional costumes.",
      pt: "Os grupos de rancho mantêm tradições regionais autênticas, cada região tendo danças, música e belos trajes tradicionais distintos."
    },
    participationLevel: "learn",
    communityConnection: {
      en: "Joining a rancho creates deep cultural connections and helps preserve Portuguese traditions for future generations in London.",
      pt: "Juntar-se a um rancho cria conexões culturais profundas e ajuda a preservar tradições portuguesas para futuras gerações em Londres."
    },
    soulFactors: ["Authentic costumes", "Regional traditions", "Cultural pride", "Heritage preservation", "Community commitment"]
  },
  {
    id: "guitar_circles",
    titleEn: "Lusophone Guitar Circles",
    titlePt: "Círculos de Guitarra Portuguesa",
    category: "guitar",
    atmosphere: "intimate",
    icon: "🎸",
    descriptionEn: "Intimate acoustic sessions where everyone shares music and stories. Magical evenings with guitar portuguesa creating deep connections through music.",
    descriptionPt: "Sessões acústicas íntimas onde todos partilham música e histórias. Noites mágicas com guitarra portuguesa criando conexões profundas através da música.",
    emotionalImpact: {
      en: "Guitar circles create magical intimacy where music speaks louder than words. You'll experience genuine human connection through shared melodies.",
      pt: "Os círculos de guitarra criam intimidade mágica onde a música fala mais alto que as palavras. Experienciará conexão humana genuína através de melodias partilhadas."
    },
    londonVenues: ["Private homes", "Small venues", "Lusophone cafés", "Cultural spaces"],
    whenToExperience: "Friday evenings and weekend afternoons",
    culturalSignificance: {
      en: "The guitar portuguesa's unique sound and playing style is central to Portuguese musical identity and fado tradition.",
      pt: "O som único e estilo de tocar da guitarra portuguesa é central à identidade musical portuguesa e tradição do fado."
    },
    participationLevel: "participate",
    communityConnection: {
      en: "Everyone contributes - whether playing, singing, or simply listening with appreciation. Music creates instant bonds.",
      pt: "Todos contribuem - seja tocando, cantando, ou simplesmente ouvindo com apreciação. A música cria laços instantâneos."
    },
    soulFactors: ["Intimate setting", "Musical sharing", "Guitar portuguesa", "Story-telling", "Emotional connection"]
  },
  {
    id: "santos_populares",
    titleEn: "Santos Populares - Street Festival Magic",
    titlePt: "Santos Populares - Magia de Festa de Rua",
    category: "festival",
    atmosphere: "celebratory",
    icon: "🎉",
    descriptionEn: "Incredible street festivals celebrating Santos António, São João, and São Pedro with music, dancing, sardines, and amazing community spirit that lights up London.",
    descriptionPt: "Festivais de rua incríveis celebrando Santos António, São João e São Pedro com música, dança, sardinhas e espírito comunitário incrível que ilumina Londres.",
    emotionalImpact: {
      en: "Santos Populares creates pure celebration and community joy. The energy is infectious - you'll dance, laugh, and feel deeply connected to Portuguese culture.",
      pt: "Santos Populares criam pura celebração e alegria comunitária. A energia é contagiante - dançará, rirá e sentir-se-á profundamente conectado à cultura portuguesa."
    },
    londonVenues: ["Stockwell Park", "Lusophone Centre courtyard", "Borough Market area", "Community squares"],
    whenToExperience: "June (Santos António 13th, São João 24th, São Pedro 29th)",
    culturalSignificance: {
      en: "These are Portugal's most beloved popular festivals, bringing entire neighborhoods together in celebration of life and community.",
      pt: "Estes são os festivais populares mais amados de Portugal, juntando bairros inteiros em celebração da vida e comunidade."
    },
    participationLevel: "participate",
    communityConnection: {
      en: "Everyone joins in - families, children, elderly. It's the Portuguese-speaking community at its most joyful and welcoming.",
      pt: "Todos participam - famílias, crianças, idosos. É a comunidade de falantes de português no seu estado mais alegre e acolhedor."
    },
    soulFactors: ["Street celebrations", "Grilled sardines", "Community dancing", "Traditional decorations", "Infectious joy"]
  },
  {
    id: "modern_portuguese_pop",
    titleEn: "Modern Lusophone Pop & Contemporary Sounds",
    titlePt: "Pop Português Moderno & Sons Contemporâneos",
    category: "modern",
    atmosphere: "energetic",
    icon: "🎤",
    descriptionEn: "Contemporary Lusophone artists like Salvador Sobral and Aurea connecting tradition with modern sounds, creating music that speaks to Lusophone hearts today.",
    descriptionPt: "Artistas portugueses contemporâneos como Salvador Sobral e Aurea conectando tradição com sons modernos, criando música que fala aos corações portugueses hoje.",
    emotionalImpact: {
      en: "Modern Portuguese music shows how tradition evolves beautifully. You'll feel pride in Lusophone creativity and innovation.",
      pt: "A música portuguesa moderna mostra como a tradição evolui belamente. Sentirá orgulho na criatividade e inovação portuguesa."
    },
    londonVenues: ["Concert venues", "Lusophone events", "Cultural festivals", "Online streaming events"],
    whenToExperience: "Concerts, festivals, and cultural events throughout the year",
    culturalSignificance: {
      en: "Modern Lusophone artists maintain cultural essence while creating contemporary sounds that reach international audiences.",
      pt: "Artistas portugueses modernos mantêm a essência cultural enquanto criam sons contemporâneos que alcançam audiências internacionais."
    },
    participationLevel: "listen",
    communityConnection: {
      en: "These artists unite Portuguese speakers worldwide, creating shared pride in Lusophone cultural evolution.",
      pt: "Estes artistas unem lusófonos mundialmente, criando orgulho partilhado na evolução cultural portuguesa."
    },
    soulFactors: ["Contemporary relevance", "Cultural evolution", "International recognition", "Lusophone innovation", "Emotional resonance"]
  }
];

const PortugueseMusicDanceCulture: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<MusicDanceExperience | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Music & Dance', namePt: 'Toda Música & Dança', icon: '🎵' },
    { id: 'fado', nameEn: 'Fado Soul', namePt: 'Alma do Fado', icon: '💙' },
    { id: 'folklore', nameEn: 'Folk Dancing', namePt: 'Danças Folclóricas', icon: '💃' },
    { id: 'festival', nameEn: 'Festivals', namePt: 'Festivais', icon: '🎉' },
    { id: 'guitar', nameEn: 'Guitar Circles', namePt: 'Círculos Guitarra', icon: '🎸' },
    { id: 'modern', nameEn: 'Modern Sounds', namePt: 'Sons Modernos', icon: '🎤' }
  ];

  const filteredExperiences = selectedCategory === 'all' 
    ? musicDanceExperiences 
    : musicDanceExperiences.filter(exp => exp.category === selectedCategory);

  const getAtmosphereColor = (atmosphere: string) => {
    const colorMap: Record<string, string> = {
      'intimate': 'from-purple-500 to-pink-500',
      'community': 'from-green-500 to-blue-500',
      'energetic': 'from-orange-500 to-red-500',
      'soulful': 'from-indigo-500 to-purple-500',
      'celebratory': 'from-yellow-500 to-orange-500'
    };
    return colorMap[atmosphere] || 'from-primary-500 to-secondary-500';
  };

  const getParticipationIcon = (level: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'listen': <HeartIcon className="w-4 h-4" />,
      'participate': <UserGroupIcon className="w-4 h-4" />,
      'learn': <SparklesIcon className="w-4 h-4" />,
      'perform': <StarIcon className="w-4 h-4" />
    };
    return iconMap[level] || <HeartIcon className="w-4 h-4" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-200 via-pink-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-6">
            <MusicalNoteIcon className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-700 font-medium">
              {language === "pt" ? "Música & Dança Portuguesa" : "Lusophone Music & Dance"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "pt" 
              ? "A Alma da Música Portuguesa" 
              : "The Soul of Lusophone Music"}
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            {language === "pt"
              ? "Descubra a música comovente, danças tradicionais e experiências vibrantes que fazem da cultura portuguesa algo absolutamente cativante e emocionalmente poderoso."
              : "Discover the soul-stirring music, traditional dancing, and vibrant experiences that make Portuguese culture absolutely captivating and emotionally powerful."
            }
          </p>

          <div className="inline-flex items-center gap-2 text-lg text-primary-600 font-medium">
            <HeartIcon className="w-5 h-5" />
            <span>
              {language === "pt" ? "Experiências que tocam a alma" : "Experiences that touch the soul"}
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
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
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

        {/* Music & Dance Experiences Grid */}
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
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                        {experience.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                          {language === "pt" ? experience.titlePt : experience.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="capitalize">{experience.atmosphere}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {getParticipationIcon(experience.participationLevel)}
                            <span className="capitalize">{experience.participationLevel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PlayIcon className="w-6 h-6 text-purple-500 group-hover:text-purple-600 transition-colors" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {language === "pt" ? experience.descriptionPt : experience.descriptionEn}
                </p>

                {/* Emotional Impact */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      {language === "pt" ? "Impacto Emocional" : "Emotional Impact"}
                    </span>
                  </div>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    {language === "pt" ? experience.emotionalImpact.pt : experience.emotionalImpact.en}
                  </p>
                </div>

                {/* London Venues */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Onde experienciar em Londres:" : "Where to experience in London:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.londonVenues.slice(0, 2).map((venue, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                      >
                        {venue}
                      </span>
                    ))}
                    {experience.londonVenues.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{experience.londonVenues.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* When to Experience */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{experience.whenToExperience}</span>
                  </div>
                </div>

                {/* Soul Factors */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Fatores da Alma:" : "Soul Factors:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.soulFactors.slice(0, 3).map((factor, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                      >
                        {factor}
                      </span>
                    ))}
                    {experience.soulFactors.length > 3 && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        +{experience.soulFactors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  {language === "pt" ? "Experienciar Esta Magia" : "Experience This Magic"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cultural Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white"
        >
          <div className="flex justify-center mb-4">
            <MusicalNoteIcon className="w-12 h-12 opacity-80" />
          </div>
          <blockquote className="text-2xl md:text-3xl italic mb-4">
            {language === "pt" 
              ? "\"A música é a linguagem universal da alma portuguesa.\""
              : "\"Music is the universal language of the Lusophone soul.\""}
          </blockquote>
          <div className="mt-6">
            <p className="text-lg opacity-95">
              {language === "pt"
                ? "Junte-se à nossa comunidade musical e descubra como a cultura portuguesa toca corações em Londres."
                : "Join our musical community and discover how Portuguese culture touches hearts in London."
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-3xl">
                    {selectedExperience.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {language === "pt" ? selectedExperience.titlePt : selectedExperience.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="capitalize">{selectedExperience.atmosphere}</span>
                      <span>•</span>
                      <span className="capitalize">{selectedExperience.participationLevel}</span>
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

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6 border border-purple-100">
                    <h5 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <HeartIcon className="w-4 h-4" />
                      {language === "pt" ? "Impacto Emocional" : "Emotional Impact"}
                    </h5>
                    <p className="text-purple-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.emotionalImpact.pt : selectedExperience.emotionalImpact.en}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-100">
                    <h5 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <UserGroupIcon className="w-4 h-4" />
                      {language === "pt" ? "Conexão Comunitária" : "Community Connection"}
                    </h5>
                    <p className="text-orange-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.communityConnection.pt : selectedExperience.communityConnection.en}
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
                        {language === "pt" ? "Locais em Londres" : "London Venues"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.londonVenues.map((venue, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                          >
                            {venue}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-secondary-500" />
                        {language === "pt" ? "Quando Experienciar" : "When to Experience"}
                      </h5>
                      <p className="text-gray-600">{selectedExperience.whenToExperience}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <SparklesIcon className="w-4 h-4 text-orange-500" />
                        {language === "pt" ? "Fatores da Alma" : "Soul Factors"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.soulFactors.map((factor, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                      <h5 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                        <StarIcon className="w-4 h-4" />
                        {language === "pt" ? "Significado Cultural" : "Cultural Significance"}
                      </h5>
                      <p className="text-indigo-700 leading-relaxed">
                        {language === "pt" ? selectedExperience.culturalSignificance.pt : selectedExperience.culturalSignificance.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Participar Desta Experiência" : "Join This Experience"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Ver Próximos Eventos" : "View Upcoming Events"}
                  <CalendarDaysIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortugueseMusicDanceCulture;