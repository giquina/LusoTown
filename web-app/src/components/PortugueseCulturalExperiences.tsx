"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  HeartIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon,
  StarIcon,
  ArrowRightIcon,
  PaintBrushIcon,
  CameraIcon,
  FilmIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface CulturalExperience {
  id: string;
  titleEn: string;
  titlePt: string;
  category: 'azulejo' | 'literature' | 'crafts' | 'cinema' | 'walking_tours' | 'art_workshops';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  duration: string;
  icon: string;
  descriptionEn: string;
  descriptionPt: string;
  culturalDepth: {
    en: string;
    pt: string;
  };
  londonVenues: string[];
  typicalSchedule: string;
  learningOutcomes: {
    en: string;
    pt: string;
  };
  skillsGained: string[];
  culturalInsight: {
    en: string;
    pt: string;
  };
  communityAspect: string[];
  materialsCovered: string[];
}

const culturalExperiences: CulturalExperience[] = [
  {
    id: "azulejo_appreciation",
    titleEn: "Azulejo Appreciation - Beautiful Tile Art Workshops",
    titlePt: "Apreciação de Azulejos - Oficinas de Arte de Azulejos",
    category: "azulejo",
    experienceLevel: "all_levels",
    duration: "2-3 hours",
    icon: "🎨",
    descriptionEn: "Beautiful tile art workshops and cultural education exploring Portugal's stunning azulejo tradition. Learn to appreciate and create these iconic blue and white masterpieces.",
    descriptionPt: "Belas oficinas de arte de azulejos e educação cultural explorando a deslumbrante tradição portuguesa dos azulejos. Aprenda a apreciar e criar estas icónicas obras-primas azuis e brancas.",
    culturalDepth: {
      en: "Azulejos tell the story of Portugal through ceramic art. These workshops connect you to centuries of Lusophone artistic tradition while developing your own creative skills.",
      pt: "Os azulejos contam a história de Portugal através da arte cerâmica. Estas oficinas conectam-no a séculos de tradição artística portuguesa enquanto desenvolve as suas próprias habilidades criativas."
    },
    londonVenues: ["Lusophone Cultural Centre", "Art studios in Stockwell", "Community centres", "Lusophone museums"],
    typicalSchedule: "Saturday afternoons, 2pm - 5pm",
    learningOutcomes: {
      en: "Understand azulejo history, learn traditional patterns, develop appreciation for Lusophone ceramic art, and create your own tile masterpiece.",
      pt: "Compreender a história dos azulejos, aprender padrões tradicionais, desenvolver apreciação pela arte cerâmica portuguesa e criar a sua própria obra-prima em azulejo."
    },
    skillsGained: ["Ceramic painting", "Pattern design", "Cultural history", "Artistic appreciation", "Traditional techniques"],
    culturalInsight: {
      en: "Azulejos represent Lusophone resilience and beauty - they've adorned buildings for centuries, telling stories and preserving culture through art.",
      pt: "Os azulejos representam a resistência e beleza portuguesas - adornam edifícios há séculos, contando histórias e preservando cultura através da arte."
    },
    communityAspect: ["Intergenerational learning", "Cultural preservation", "Artistic sharing", "Community pride", "Heritage continuation"],
    materialsCovered: ["Traditional patterns", "Historical periods", "Regional styles", "Modern interpretations", "Cultural significance"]
  },
  {
    id: "literature_circles",
    titleEn: "Lusophone Literature Circles - Pessoa, Saramago & Cultural Discussions",
    titlePt: "Círculos de Literatura Portuguesa - Pessoa, Saramago & Discussões Culturais",
    category: "literature",
    experienceLevel: "intermediate",
    duration: "1.5-2 hours",
    icon: "📚",
    descriptionEn: "Engaging discussions of Lusophone literature masters like Fernando Pessoa and José Saramago in community settings that build deep cultural understanding and intellectual connections.",
    descriptionPt: "Discussões envolventes de mestres da literatura portuguesa como Fernando Pessoa e José Saramago em ambientes comunitários que constroem compreensão cultural profunda e conexões intelectuais.",
    culturalDepth: {
      en: "Lusophone literature circles explore the profound depths of the Lusophone soul through works that have shaped global literature and express universal human experiences.",
      pt: "Os círculos de literatura portuguesa exploram as profundidades profundas da alma portuguesa através de obras que moldaram a literatura global e expressam experiências humanas universais."
    },
    londonVenues: ["Lusophone libraries", "Bookshops in Stockwell", "Cultural centres", "Private reading groups", "University spaces"],
    typicalSchedule: "Thursday evenings, 7pm - 9pm",
    learningOutcomes: {
      en: "Deepen understanding of Lusophone literature, engage in intellectual discourse, connect with Lusophone cultural identity, and discover universal themes.",
      pt: "Aprofundar a compreensão da literatura portuguesa, envolver-se em discurso intelectual, conectar-se com a identidade cultural portuguesa e descobrir temas universais."
    },
    skillsGained: ["Literary analysis", "Critical thinking", "Cultural understanding", "Discussion skills", "Portuguese language"],
    culturalInsight: {
      en: "Lusophone literature captures the essence of saudade and human experience, offering profound insights into the Lusophone worldview and universal emotions.",
      pt: "A literatura portuguesa captura a essência da saudade e experiência humana, oferecendo insights profundos sobre a visão de mundo portuguesa e emoções universais."
    },
    communityAspect: ["Intellectual community", "Cultural discussion", "Shared reading", "Educational growth", "Literary appreciation"],
    materialsCovered: ["Fernando Pessoa", "José Saramago", "Modern Lusophone authors", "Cultural themes", "Literary movements"]
  },
  {
    id: "traditional_crafts",
    titleEn: "Traditional Lusophone Crafts - Pottery, Weaving & Artisan Workshops",
    titlePt: "Artesanato Tradicional Português - Cerâmica, Tecelagem & Oficinas Artesanais",
    category: "crafts",
    experienceLevel: "beginner",
    duration: "3-4 hours",
    icon: "🏺",
    descriptionEn: "Hands-on workshops in traditional Lusophone crafts including pottery, weaving, and artisan techniques that preserve ancient skills while creating beautiful, functional art.",
    descriptionPt: "Oficinas práticas em artesanato tradicional português incluindo cerâmica, tecelagem e técnicas artesanais que preservam habilidades antigas enquanto criam arte bela e funcional.",
    culturalDepth: {
      en: "Traditional crafts connect you to centuries of Lusophone artisan heritage, learning skills passed down through generations while creating meaningful objects with your hands.",
      pt: "O artesanato tradicional conecta-o a séculos de herança artesanal portuguesa, aprendendo habilidades transmitidas através de gerações enquanto cria objetos significativos com as suas mãos."
    },
    londonVenues: ["Artisan studios", "Lusophone centres", "Craft workshops", "Community spaces", "Cultural festivals"],
    typicalSchedule: "Saturday workshops, 10am - 2pm",
    learningOutcomes: {
      en: "Master traditional techniques, create functional art pieces, understand cultural significance of crafts, and connect with Lusophone artisan heritage.",
      pt: "Dominar técnicas tradicionais, criar peças de arte funcional, compreender o significado cultural do artesanato e conectar-se com a herança artesanal portuguesa."
    },
    skillsGained: ["Pottery techniques", "Weaving skills", "Traditional patterns", "Hand craftsmanship", "Cultural appreciation"],
    culturalInsight: {
      en: "Lusophone crafts reflect the practical beauty of Portuguese culture - functional objects created with care, skill, and artistic sensibility passed through generations.",
      pt: "O artesanato português reflete a beleza prática da cultura portuguesa - objetos funcionais criados com cuidado, habilidade e sensibilidade artística transmitida através de gerações."
    },
    communityAspect: ["Skill sharing", "Artisan community", "Cultural preservation", "Creative expression", "Intergenerational teaching"],
    materialsCovered: ["Traditional pottery", "Lusophone weaving", "Regional techniques", "Cultural symbolism", "Modern applications"]
  },
  {
    id: "portuguese_cinema",
    titleEn: "Lusophone Cinema Nights - Cultural Film Screenings",
    titlePt: "Noites de Cinema Português - Exibições de Filmes Culturais",
    category: "cinema",
    experienceLevel: "all_levels",
    duration: "2.5-3 hours",
    icon: "🎬",
    descriptionEn: "Cultural film screenings building community through Lusophone cinema, exploring contemporary and classic films that showcase Lusophone storytelling and cultural perspectives.",
    descriptionPt: "Exibições de filmes culturais construindo comunidade através do cinema português, explorando filmes contemporâneos e clássicos que mostram narrativa portuguesa e perspectivas culturais.",
    culturalDepth: {
      en: "Lusophone cinema nights create cultural dialogue through visual storytelling, connecting London's Portuguese-speaking community while introducing others to Lusophone perspectives and experiences.",
      pt: "As noites de cinema português criam diálogo cultural através de narrativa visual, conectando a comunidade de falantes de português de Londres enquanto introduz outros às perspectivas e experiências portuguesas."
    },
    londonVenues: ["Community cinemas", "Lusophone centres", "Cultural venues", "Universities", "Private screenings"],
    typicalSchedule: "Monthly Friday evenings, 7pm - 10pm",
    learningOutcomes: {
      en: "Discover Lusophone filmmaking, understand cultural themes, engage in post-film discussions, and connect with Lusophone artistic expression through cinema.",
      pt: "Descobrir o cinema português, compreender temas culturais, envolver-se em discussões pós-filme e conectar-se com a expressão artística portuguesa através do cinema."
    },
    skillsGained: ["Film appreciation", "Cultural analysis", "Discussion skills", "Lusophone context", "Artistic understanding"],
    culturalInsight: {
      en: "Lusophone cinema reflects the Lusophone experience with honesty and artistry, offering windows into Lusophone life, history, and contemporary challenges.",
      pt: "O cinema português reflete a experiência portuguesa com honestidade e arte, oferecendo janelas para a vida, história e desafios contemporâneos portugueses."
    },
    communityAspect: ["Cultural dialogue", "Community viewing", "Shared experience", "Educational discussion", "Cultural bridge-building"],
    materialsCovered: ["Contemporary Lusophone films", "Classic cinema", "Documentary works", "Cultural themes", "Film industry history"]
  },
  {
    id: "heritage_walking_tours",
    titleEn: "Heritage Walking Tours - Exploring Lusophone Influence in United Kingdom Cities",
    titlePt: "Tours de Herança a Pé - Explorando Influência Portuguesa em Cidades do Reino Unido",
    category: "walking_tours",
    experienceLevel: "all_levels",
    duration: "2-3 hours",
    icon: "🚶",
    descriptionEn: "Guided walks exploring Lusophone historical influence and contemporary presence in United Kingdom cities, discovering hidden stories and cultural connections throughout London and beyond.",
    descriptionPt: "Caminhadas guiadas explorando a influência histórica portuguesa e presença contemporânea em cidades do Reino Unido, descobrindo histórias escondidas e conexões culturais por Londres e além.",
    culturalDepth: {
      en: "Heritage tours reveal the deep Lusophone connections to British history, from maritime exploration to modern communities, uncovering stories often hidden in plain sight.",
      pt: "Os tours de herança revelam as conexões portuguesas profundas à história britânica, desde exploração marítima a comunidades modernas, descobrindo histórias frequentemente escondidas à vista."
    },
    londonVenues: ["Historic London areas", "Lusophone neighborhoods", "Maritime museums", "Cultural landmarks", "Community areas"],
    typicalSchedule: "Sunday afternoons, 2pm - 5pm",
    learningOutcomes: {
      en: "Discover Lusophone historical presence, understand community development, explore cultural landmarks, and appreciate Lusophone contributions to British society.",
      pt: "Descobrir presença histórica portuguesa, compreender desenvolvimento comunitário, explorar marcos culturais e apreciar contribuições portuguesas para a sociedade britânica."
    },
    skillsGained: ["Historical knowledge", "Cultural awareness", "Walking exploration", "Community understanding", "Heritage appreciation"],
    culturalInsight: {
      en: "Portuguese heritage tours show how Portuguese culture has woven itself into British society, creating lasting connections between two maritime nations.",
      pt: "Os tours de herança portuguesa mostram como a cultura portuguesa se entrelaçou na sociedade britânica, criando conexões duradouras entre duas nações marítimas."
    },
    communityAspect: ["Historical education", "Community pride", "Cultural sharing", "Neighborhood exploration", "Heritage preservation"],
    materialsCovered: ["Historical sites", "Lusophone immigration", "Cultural landmarks", "Community development", "Contemporary presence"]
  },
  {
    id: "art_workshops",
    titleEn: "Lusophone Art Workshops - Creative Expression & Cultural Learning",
    titlePt: "Oficinas de Arte Portuguesa - Expressão Criativa & Aprendizagem Cultural",
    category: "art_workshops",
    experienceLevel: "beginner",
    duration: "2-4 hours",
    icon: "🖌️",
    descriptionEn: "Creative workshops exploring Lusophone artistic traditions through hands-on practice, combining cultural education with artistic expression in supportive community environments.",
    descriptionPt: "Oficinas criativas explorando tradições artísticas portuguesas através de prática prática, combinando educação cultural com expressão artística em ambientes comunitários de apoio.",
    culturalDepth: {
      en: "Art workshops provide hands-on connection to Lusophone creative traditions, allowing personal expression while learning cultural techniques and artistic heritage.",
      pt: "As oficinas de arte proporcionam conexão prática às tradições criativas portuguesas, permitindo expressão pessoal enquanto se aprende técnicas culturais e herança artística."
    },
    londonVenues: ["Art studios", "Community centres", "Lusophone institutions", "Creative spaces", "Cultural workshops"],
    typicalSchedule: "Weekend workshops, flexible timing",
    learningOutcomes: {
      en: "Develop artistic skills, understand Lusophone art traditions, create personal artwork, and connect with creative Portuguese-speaking community members.",
      pt: "Desenvolver habilidades artísticas, compreender tradições de arte portuguesa, criar obra de arte pessoal e conectar-se com membros criativos da comunidade de falantes de português."
    },
    skillsGained: ["Artistic techniques", "Cultural patterns", "Creative expression", "Traditional methods", "Contemporary applications"],
    culturalInsight: {
      en: "Lusophone art workshops show how creativity and culture intertwine, with traditional techniques providing foundation for contemporary artistic expression.",
      pt: "As oficinas de arte portuguesa mostram como criatividade e cultura se entrelaçam, com técnicas tradicionais fornecendo base para expressão artística contemporânea."
    },
    communityAspect: ["Creative community", "Artistic sharing", "Cultural expression", "Skill development", "Personal growth"],
    materialsCovered: ["Traditional techniques", "Cultural motifs", "Contemporary methods", "Personal projects", "Community showcases"]
  }
];

const PortugueseCulturalExperiences: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<CulturalExperience | null>(null);

  const categories = [
    { id: 'all', nameEn: 'All Cultural Experiences', namePt: 'Todas Experiências Culturais', icon: '🌟' },
    { id: 'azulejo', nameEn: 'Azulejo Art', namePt: 'Arte de Azulejos', icon: '🎨' },
    { id: 'literature', nameEn: 'Literature Circles', namePt: 'Círculos Literários', icon: '📚' },
    { id: 'crafts', nameEn: 'Traditional Crafts', namePt: 'Artesanato Tradicional', icon: '🏺' },
    { id: 'cinema', nameEn: 'Cinema Nights', namePt: 'Noites de Cinema', icon: '🎬' },
    { id: 'walking_tours', nameEn: 'Heritage Tours', namePt: 'Tours de Herança', icon: '🚶' },
    { id: 'art_workshops', nameEn: 'Art Workshops', namePt: 'Oficinas de Arte', icon: '🖌️' }
  ];

  const filteredExperiences = selectedCategory === 'all' 
    ? culturalExperiences 
    : culturalExperiences.filter(exp => exp.category === selectedCategory);

  const getExperienceLevelColor = (level: string) => {
    const colorMap: Record<string, string> = {
      'beginner': 'from-green-500 to-blue-500',
      'intermediate': 'from-blue-500 to-purple-500',
      'advanced': 'from-purple-500 to-red-500',
      'all_levels': 'from-indigo-500 to-purple-500'
    };
    return colorMap[level] || 'from-primary-500 to-secondary-500';
  };

  const getExperienceLevelIcon = (level: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'beginner': <SparklesIcon className="w-4 h-4" />,
      'intermediate': <AcademicCapIcon className="w-4 h-4" />,
      'advanced': <StarIcon className="w-4 h-4" />,
      'all_levels': <UserGroupIcon className="w-4 h-4" />
    };
    return iconMap[level] || <AcademicCapIcon className="w-4 h-4" />;
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'azulejo': <PaintBrushIcon className="w-6 h-6" />,
      'literature': <BookOpenIcon className="w-6 h-6" />,
      'crafts': <BuildingLibraryIcon className="w-6 h-6" />,
      'cinema': <FilmIcon className="w-6 h-6" />,
      'walking_tours': <MapPinIcon className="w-6 h-6" />,
      'art_workshops': <CameraIcon className="w-6 h-6" />
    };
    return iconMap[category] || <SparklesIcon className="w-6 h-6" />;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-indigo-200 via-blue-100 to-cyan-100 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
            <AcademicCapIcon className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              {language === "pt" ? "Experiências Culturais Portuguesas" : "Lusophone Cultural Experiences"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "pt" 
              ? "Experiências Culturais Enriquecedoras" 
              : "Enriching Cultural Experiences"}
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            {language === "pt"
              ? "Descubra a apreciação de azulejos, círculos de literatura, artesanato tradicional, noites de cinema e tours de herança que conectam profundamente com a rica cultura portuguesa."
              : "Discover azulejo appreciation, literature circles, traditional crafts, cinema nights, and heritage walking tours that deeply connect you with rich Portuguese culture."
            }
          </p>

          <div className="inline-flex items-center gap-2 text-lg text-blue-600 font-medium">
            <HeartIcon className="w-5 h-5" />
            <span>
              {language === "pt" ? "Experiências que enriquecem a alma" : "Experiences that enrich the soul"}
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
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
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

        {/* Cultural Experiences Grid */}
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
              {/* Header with experience level gradient */}
              <div className={`h-2 bg-gradient-to-r ${getExperienceLevelColor(experience.experienceLevel)}`}></div>
              
              <div className="p-6">
                {/* Title and Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                        {experience.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                          {language === "pt" ? experience.titlePt : experience.titleEn}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="capitalize">{experience.category.replace('_', ' ')}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {getExperienceLevelIcon(experience.experienceLevel)}
                            <span className="capitalize">{experience.experienceLevel.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {getCategoryIcon(experience.category)}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {language === "pt" ? experience.descriptionPt : experience.descriptionEn}
                </p>

                {/* Cultural Depth */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      {language === "pt" ? "Profundidade Cultural" : "Cultural Depth"}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    {language === "pt" ? experience.culturalDepth.pt : experience.culturalDepth.en}
                  </p>
                </div>

                {/* London Venues */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Locais em Londres:" : "London Venues:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.londonVenues.slice(0, 2).map((venue, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
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

                {/* Duration and Schedule */}
                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{experience.typicalSchedule}</span>
                  </div>
                </div>

                {/* Skills Gained */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {language === "pt" ? "Habilidades adquiridas:" : "Skills gained:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {experience.skillsGained.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {experience.skillsGained.length > 3 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">
                        +{experience.skillsGained.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                  {language === "pt" ? "Participar desta Experiência" : "Join This Experience"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cultural Learning Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-white"
        >
          <div className="flex justify-center mb-4">
            <AcademicCapIcon className="w-12 h-12 opacity-80" />
          </div>
          <blockquote className="text-2xl md:text-3xl italic mb-4">
            {language === "pt" 
              ? "\"A cultura portuguesa vive através da aprendizagem e partilha de experiências.\""
              : "\"Portuguese culture lives through learning and sharing experiences.\""}
          </blockquote>
          <div className="mt-6">
            <p className="text-lg opacity-95">
              {language === "pt"
                ? "Junte-se às nossas experiências culturais e descubra como a herança portuguesa enriquece vidas em Londres."
                : "Join our cultural experiences and discover how Portuguese heritage enriches lives in London."
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
            <div className={`h-2 bg-gradient-to-r ${getExperienceLevelColor(selectedExperience.experienceLevel)}`}></div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-3xl">
                    {selectedExperience.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {language === "pt" ? selectedExperience.titlePt : selectedExperience.titleEn}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="capitalize">{selectedExperience.category.replace('_', ' ')}</span>
                      <span>•</span>
                      <span className="capitalize">{selectedExperience.experienceLevel.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{selectedExperience.duration}</span>
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

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-100">
                    <h5 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4" />
                      {language === "pt" ? "Profundidade Cultural" : "Cultural Depth"}
                    </h5>
                    <p className="text-blue-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.culturalDepth.pt : selectedExperience.culturalDepth.en}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                    <h5 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <AcademicCapIcon className="w-4 h-4" />
                      {language === "pt" ? "Resultados de Aprendizagem" : "Learning Outcomes"}
                    </h5>
                    <p className="text-green-700 leading-relaxed">
                      {language === "pt" ? selectedExperience.learningOutcomes.pt : selectedExperience.learningOutcomes.en}
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
                        {language === "pt" ? "Horário Típico" : "Typical Schedule"}
                      </h5>
                      <p className="text-gray-600">{selectedExperience.typicalSchedule}</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        {language === "pt" ? "Habilidades Adquiridas" : "Skills Gained"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.skillsGained.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                        <UserGroupIcon className="w-4 h-4 text-pink-500" />
                        {language === "pt" ? "Aspecto Comunitário" : "Community Aspect"}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.communityAspect.map((aspect, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-50 text-pink-700 text-sm rounded-full"
                          >
                            {aspect}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                      <h5 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4" />
                        {language === "pt" ? "Insight Cultural" : "Cultural Insight"}
                      </h5>
                      <p className="text-purple-700 leading-relaxed">
                        {language === "pt" ? selectedExperience.culturalInsight.pt : selectedExperience.culturalInsight.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materials Covered */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-blue-500" />
                  {language === "pt" ? "Materiais Cobertos" : "Materials Covered"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.materialsCovered.map((material, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full border border-blue-200"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium py-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Inscrever-se na Experiência" : "Enroll in Experience"}
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  {language === "pt" ? "Ver Mais Detalhes" : "View More Details"}
                  <BookOpenIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default PortugueseCulturalExperiences;