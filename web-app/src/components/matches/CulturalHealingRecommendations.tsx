"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  MusicalNoteIcon,
  HomeIcon,
  UserGroupIcon,
  CakeIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  CameraIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  SparklesIcon,
  SunIcon,
  HandHeartIcon,
  GlobeAltIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  PlayIcon as PlaySolid,
} from '@heroicons/react/24/solid';
import type { SaudadeProfile, CulturalDepthProfile } from './SaudadeMatchingSystem';

interface CulturalActivity {
  id: string;
  titleEn: string;
  titlePt: string;
  descriptionEn: string;
  descriptionPt: string;
  type: 'solo' | 'community' | 'couple' | 'family';
  category: 'music' | 'food' | 'social' | 'spiritual' | 'creative' | 'educational' | 'nature';
  saudadeLevel: 'low' | 'medium' | 'high' | 'any';
  triggers: string[];
  copingMechanisms: string[];
  duration: string;
  location: string;
  emotionalBenefit: string;
  culturalConnection: number; // 1-10
  icon: React.ComponentType<any>;
  color: string;
  healingPotential: number; // 1-10
}

interface HealingRecommendation {
  activity: CulturalActivity;
  matchScore: number;
  personalizedMessage: string;
  suggestedTiming: string;
  potentialPartners?: string[];
}

interface CulturalHealingRecommendationsProps {
  userProfile: CulturalDepthProfile;
  matchProfile?: CulturalDepthProfile;
  currentSaudadeLevel?: number;
  showForCouple?: boolean;
  onActivitySelect: (activity: CulturalActivity) => void;
  onScheduleActivity: (activityId: string, partnerId?: string) => void;
}

const culturalActivities: CulturalActivity[] = [
  {
    id: 'fado_therapy_session',
    titleEn: 'Therapeutic Fado Listening Session',
    titlePt: 'Sessão Terapêutica de Escuta de Fado',
    descriptionEn: 'Join intimate fado sessions designed for emotional release and saudade healing through authentic Portuguese music',
    descriptionPt: 'Participe em sessões íntimas de fado desenhadas para libertação emocional e cura da saudade através de música portuguesa autêntica',
    type: 'community',
    category: 'music',
    saudadeLevel: 'high',
    triggers: ['fado_music', 'portuguese_language'],
    copingMechanisms: ['listen_fado', 'embrace_sadness'],
    duration: '2 hours',
    location: 'Portuguese Cultural Centre, Stockwell',
    emotionalBenefit: 'Emotional release and cultural connection',
    culturalConnection: 10,
    icon: MusicalNoteIcon,
    color: 'from-purple-500 to-pink-500',
    healingPotential: 9,
  },
  {
    id: 'grandmother_recipe_workshop',
    titleEn: 'Grandmother\'s Recipe Revival Workshop',
    titlePt: 'Workshop de Recuperação de Receitas da Avó',
    descriptionEn: 'Learn and share traditional family recipes while connecting with others who understand the emotional power of Portuguese comfort food',
    descriptionPt: 'Aprenda e partilhe receitas tradicionais familiares enquanto se conecta com outros que compreendem o poder emocional da comida portuguesa',
    type: 'community',
    category: 'food',
    saudadeLevel: 'medium',
    triggers: ['childhood_foods', 'grandmother_recipes'],
    copingMechanisms: ['cook_portuguese', 'share_culture'],
    duration: '3 hours',
    location: 'Borough Market Portuguese Kitchen',
    emotionalBenefit: 'Nostalgic comfort and community bonding',
    culturalConnection: 9,
    icon: CakeIcon,
    color: 'from-orange-500 to-red-500',
    healingPotential: 8,
  },
  {
    id: 'saudade_support_circle',
    titleEn: 'Saudade Support Circle',
    titlePt: 'Círculo de Apoio para Saudade',
    descriptionEn: 'Safe space for Portuguese speakers to share their saudade experiences and find emotional support from those who truly understand',
    descriptionPt: 'Espaço seguro para falantes de português partilharem as suas experiências de saudade e encontrarem apoio emocional de quem realmente compreende',
    type: 'community',
    category: 'spiritual',
    saudadeLevel: 'high',
    triggers: ['family_voices', 'childhood_friends', 'homeland_memories'],
    copingMechanisms: ['talk_portuguese_friends', 'embrace_sadness', 'cultural_healing'],
    duration: '1.5 hours',
    location: 'Portuguese Community Centre',
    emotionalBenefit: 'Emotional validation and mutual support',
    culturalConnection: 8,
    icon: HandHeartIcon,
    color: 'from-green-500 to-teal-500',
    healingPotential: 10,
  },
  {
    id: 'virtual_homeland_journey',
    titleEn: 'Virtual Homeland Journey',
    titlePt: 'Jornada Virtual à Terra Natal',
    descriptionEn: 'Immersive virtual reality experience of Portuguese landscapes, villages, and familiar places to ease homesickness',
    descriptionPt: 'Experiência imersiva de realidade virtual de paisagens portuguesas, aldeias e lugares familiares para aliviar as saudades de casa',
    type: 'solo',
    category: 'nature',
    saudadeLevel: 'high',
    triggers: ['portuguese_countryside', 'childhood_places', 'ocean_waves'],
    copingMechanisms: ['visit_portugal', 'emotional_visualization'],
    duration: '45 minutes',
    location: 'Virtual Reality Centre, Soho',
    emotionalBenefit: 'Visual and emotional reconnection with homeland',
    culturalConnection: 7,
    icon: GlobeAltIcon,
    color: 'from-blue-500 to-cyan-500',
    healingPotential: 7,
  },
  {
    id: 'portuguese_poetry_evening',
    titleEn: 'Portuguese Poetry & Literature Evening',
    titlePt: 'Noite de Poesia e Literatura Portuguesa',
    descriptionEn: 'Evening of Portuguese poetry reading, discussion, and emotional expression through the beauty of Portuguese language',
    descriptionPt: 'Noite de leitura de poesia portuguesa, discussão e expressão emocional através da beleza da língua portuguesa',
    type: 'community',
    category: 'educational',
    saudadeLevel: 'medium',
    triggers: ['portuguese_language', 'childhood_memories'],
    copingMechanisms: ['write_journal', 'share_culture'],
    duration: '2 hours',
    location: 'Camões Institute, London',
    emotionalBenefit: 'Intellectual and emotional stimulation',
    culturalConnection: 8,
    icon: BookOpenIcon,
    color: 'from-indigo-500 to-purple-500',
    healingPotential: 6,
  },
  {
    id: 'santos_populares_planning',
    titleEn: 'Santos Populares Community Planning',
    titlePt: 'Planeamento Comunitário dos Santos Populares',
    descriptionEn: 'Collaborate in organizing Santos Populares celebrations in London, recreating the joy and community spirit of Portuguese festivities',
    descriptionPt: 'Colabore na organização das celebrações dos Santos Populares em Londres, recriando a alegria e espírito comunitário das festividades portuguesas',
    type: 'community',
    category: 'social',
    saudadeLevel: 'medium',
    triggers: ['santos_populares', 'festival_memories'],
    copingMechanisms: ['portuguese_community', 'share_culture'],
    duration: 'Ongoing project',
    location: 'Various London Parks',
    emotionalBenefit: 'Cultural pride and community building',
    culturalConnection: 9,
    icon: CalendarDaysIcon,
    color: 'from-yellow-500 to-orange-500',
    healingPotential: 8,
  },
  {
    id: 'family_connection_call',
    titleEn: 'Guided Family Connection Call',
    titlePt: 'Chamada de Conexão Familiar Guiada',
    descriptionEn: 'Structured video calls with family back home, with tips for meaningful conversations that help maintain emotional bonds',
    descriptionPt: 'Chamadas de vídeo estruturadas com família em casa, com dicas para conversas significativas que ajudam a manter laços emocionais',
    type: 'family',
    category: 'social',
    saudadeLevel: 'high',
    triggers: ['family_voices', 'childhood_friends'],
    copingMechanisms: ['call_family', 'emotional_connection'],
    duration: '30-60 minutes',
    location: 'At home or community center',
    emotionalBenefit: 'Strengthened family bonds and reduced isolation',
    culturalConnection: 10,
    icon: PhoneIcon,
    color: 'from-pink-500 to-red-500',
    healingPotential: 9,
  },
  {
    id: 'cultural_mentorship_program',
    titleEn: 'Cultural Mentorship Program',
    titlePt: 'Programa de Mentoria Cultural',
    descriptionEn: 'Connect with or become a cultural mentor to help preserve Portuguese heritage and support those struggling with cultural identity',
    descriptionPt: 'Conecte-se ou torne-se mentor cultural para ajudar a preservar a herança portuguesa e apoiar quem luta com identidade cultural',
    type: 'community',
    category: 'educational',
    saudadeLevel: 'any',
    triggers: ['cultural_responsibility', 'community_support'],
    copingMechanisms: ['share_culture', 'community_building'],
    duration: 'Long-term commitment',
    location: 'Community centres across London',
    emotionalBenefit: 'Purpose and cultural contribution',
    culturalConnection: 8,
    icon: AcademicCapIcon,
    color: 'from-emerald-500 to-green-500',
    healingPotential: 7,
  },
  {
    id: 'portuguese_nature_walk',
    titleEn: 'Portuguese-Style Nature Walk & Reflection',
    titlePt: 'Caminhada na Natureza e Reflexão ao Estilo Português',
    descriptionEn: 'Guided walks in London parks designed to evoke Portuguese countryside memories, with group reflection and mindfulness',
    descriptionPt: 'Caminhadas guiadas em parques de Londres desenhadas para evocar memórias do campo português, com reflexão em grupo e atenção plena',
    type: 'community',
    category: 'nature',
    saudadeLevel: 'medium',
    triggers: ['portuguese_countryside', 'nature_memories'],
    copingMechanisms: ['nature_connection', 'mindful_reflection'],
    duration: '2 hours',
    location: 'Hampstead Heath, Richmond Park',
    emotionalBenefit: 'Peace and natural connection',
    culturalConnection: 6,
    icon: MapPinIcon,
    color: 'from-green-400 to-blue-400',
    healingPotential: 5,
  },
  {
    id: 'couples_saudade_therapy',
    titleEn: 'Couples Saudade Therapy Session',
    titlePt: 'Sessão de Terapia de Saudade para Casais',
    descriptionEn: 'Specialized therapy for Portuguese couples to understand and support each other\'s saudade experiences and cultural needs',
    descriptionPt: 'Terapia especializada para casais portugueses compreenderem e apoiarem as experiências de saudade e necessidades culturais um do outro',
    type: 'couple',
    category: 'spiritual',
    saudadeLevel: 'high',
    triggers: ['relationship_strain', 'cultural_misunderstanding'],
    copingMechanisms: ['professional_help', 'mutual_support'],
    duration: '90 minutes',
    location: 'Portuguese Counseling Services',
    emotionalBenefit: 'Relationship strengthening and mutual understanding',
    culturalConnection: 9,
    icon: HeartIcon,
    color: 'from-rose-500 to-pink-500',
    healingPotential: 9,
  },
];

export default function CulturalHealingRecommendations({
  userProfile,
  matchProfile,
  currentSaudadeLevel = 5,
  showForCouple = false,
  onActivitySelect,
  onScheduleActivity,
}: CulturalHealingRecommendationsProps) {
  const { language } = useLanguage();
  const [recommendations, setRecommendations] = useState<HealingRecommendation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showingDetails, setShowingDetails] = useState<string | null>(null);

  useEffect(() => {
    const generateRecommendations = () => {
      const userSaudade = userProfile.saudadeProfile;
      const userTriggers = userSaudade.triggers;
      const userCoping = userSaudade.copingMechanisms;
      
      const scoredActivities = culturalActivities.map(activity => {
        let score = 0;
        
        // Saudade level match
        if (activity.saudadeLevel === 'any') score += 5;
        else if (activity.saudadeLevel === 'high' && currentSaudadeLevel >= 7) score += 10;
        else if (activity.saudadeLevel === 'medium' && currentSaudadeLevel >= 4 && currentSaudadeLevel <= 7) score += 10;
        else if (activity.saudadeLevel === 'low' && currentSaudadeLevel <= 4) score += 10;
        
        // Trigger alignment
        const triggerMatches = activity.triggers.filter(trigger => userTriggers.includes(trigger));
        score += triggerMatches.length * 3;
        
        // Coping mechanism alignment
        const copingMatches = activity.copingMechanisms.filter(coping => userCoping.includes(coping));
        score += copingMatches.length * 4;
        
        // Cultural depth alignment
        if (userProfile.overallCulturalDepth >= 8 && activity.culturalConnection >= 8) score += 5;
        
        // Type preference
        if (showForCouple && activity.type === 'couple') score += 8;
        if (userSaudade.culturalSupport === 'high' && activity.type === 'community') score += 6;
        if (userSaudade.culturalSupport === 'independent' && activity.type === 'solo') score += 6;
        
        // Generate personalized message
        const personalizedMessage = generatePersonalizedMessage(activity, userSaudade, language);
        
        // Suggest timing
        const suggestedTiming = generateSuggestedTiming(activity, userSaudade, language);
        
        return {
          activity,
          matchScore: score,
          personalizedMessage,
          suggestedTiming,
          potentialPartners: matchProfile ? [matchProfile.saudadeProfile.emotionalCompatibilityType] : undefined,
        };
      });
      
      // Sort by score and take top recommendations
      const topRecommendations = scoredActivities
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 8);
      
      setRecommendations(topRecommendations);
    };
    
    generateRecommendations();
  }, [userProfile, matchProfile, currentSaudadeLevel, showForCouple, language]);

  const generatePersonalizedMessage = (
    activity: CulturalActivity,
    saudadeProfile: SaudadeProfile,
    lang: string
  ): string => {
    const messages = {
      en: {
        high_saudade_fado: "Your deep saudade suggests this fado therapy could provide the emotional release you're seeking.",
        cooking_comfort: "Since you find comfort in Portuguese cooking, this workshop could deepen your culinary healing practice.",
        community_support: "Your need for cultural community makes this group activity particularly beneficial for you.",
        heritage_preservation: "Your strong heritage values align perfectly with this cultural preservation activity.",
        family_connection: "This activity directly addresses your family connection needs and homesickness patterns.",
        solo_healing: "This individual activity respects your independent approach to cultural healing.",
        couple_bonding: "Perfect for strengthening your cultural bond and mutual saudade understanding.",
      },
      pt: {
        high_saudade_fado: "A sua saudade profunda sugere que esta terapia de fado pode proporcionar a libertação emocional que procura.",
        cooking_comfort: "Como encontra conforto na culinária portuguesa, este workshop pode aprofundar a sua prática culinária de cura.",
        community_support: "A sua necessidade de comunidade cultural torna esta atividade em grupo particularmente benéfica.",
        heritage_preservation: "Os seus valores fortes de herança alinham-se perfeitamente com esta atividade de preservação cultural.",
        family_connection: "Esta atividade aborda diretamente as suas necessidades de conexão familiar e padrões de saudades de casa.",
        solo_healing: "Esta atividade individual respeita a sua abordagem independente à cura cultural.",
        couple_bonding: "Perfeito para fortalecer a sua ligação cultural e compreensão mútua da saudade.",
      }
    };

    // Simple logic to match activity with appropriate message
    if (activity.id.includes('fado') && saudadeProfile.saudadeIntensity >= 7) {
      return messages[lang].high_saudade_fado;
    }
    if (activity.id.includes('recipe') && saudadeProfile.copingMechanisms.includes('cook_portuguese')) {
      return messages[lang].cooking_comfort;
    }
    if (activity.type === 'community' && saudadeProfile.culturalSupport === 'high') {
      return messages[lang].community_support;
    }
    if (activity.culturalConnection >= 8 && saudadeProfile.heritagePreservation >= 8) {
      return messages[lang].heritage_preservation;
    }
    if (activity.id.includes('family')) {
      return messages[lang].family_connection;
    }
    if (activity.type === 'solo') {
      return messages[lang].solo_healing;
    }
    if (activity.type === 'couple') {
      return messages[lang].couple_bonding;
    }
    
    return messages[lang].community_support;
  };

  const generateSuggestedTiming = (
    activity: CulturalActivity,
    saudadeProfile: SaudadeProfile,
    lang: string
  ): string => {
    const timings = {
      en: {
        immediate: "Recommended for immediate emotional support",
        weekly: "Perfect for your weekly saudade patterns",
        monthly: "Ideal monthly cultural connection",
        seasonal: "Great for seasonal saudade peaks",
        evening: "Best for evening emotional processing",
        weekend: "Perfect weekend cultural activity",
      },
      pt: {
        immediate: "Recomendado para apoio emocional imediato",
        weekly: "Perfeito para os seus padrões semanais de saudade",
        monthly: "Conexão cultural mensal ideal",
        seasonal: "Ótimo para picos sazonais de saudade",
        evening: "Melhor para processamento emocional noturno",
        weekend: "Atividade cultural perfeita para fim de semana",
      }
    };

    if (saudadeProfile.saudadeIntensity >= 8) {
      return timings[lang].immediate;
    }
    if (saudadeProfile.frequency === 'weekly') {
      return timings[lang].weekly;
    }
    if (saudadeProfile.frequency === 'monthly') {
      return timings[lang].monthly;
    }
    if (saudadeProfile.frequency === 'seasonal') {
      return timings[lang].seasonal;
    }
    
    return timings[lang].weekend;
  };

  const categories = [
    { id: 'all', labelEn: 'All Activities', labelPt: 'Todas as Atividades', icon: SparklesIcon },
    { id: 'music', labelEn: 'Music & Fado', labelPt: 'Música e Fado', icon: MusicalNoteIcon },
    { id: 'food', labelEn: 'Food & Cooking', labelPt: 'Comida e Culinária', icon: CakeIcon },
    { id: 'social', labelEn: 'Community & Social', labelPt: 'Comunidade e Social', icon: UserGroupIcon },
    { id: 'spiritual', labelEn: 'Emotional Support', labelPt: 'Apoio Emocional', icon: HandHeartIcon },
    { id: 'educational', labelEn: 'Learning & Culture', labelPt: 'Aprendizagem e Cultura', icon: BookOpenIcon },
    { id: 'nature', labelEn: 'Nature & Reflection', labelPt: 'Natureza e Reflexão', icon: MapPinIcon },
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.activity.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HeartSolid className="w-6 h-6 text-coral-500" />
          <h2 className="text-2xl font-bold text-primary-900">
            {language === 'pt' ? 'Recomendações de Cura Cultural' : 'Cultural Healing Recommendations'}
          </h2>
        </div>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          {language === 'pt' 
            ? 'Atividades personalizadas para curar a saudade e fortalecer a sua conexão cultural'
            : 'Personalized activities to heal saudade and strengthen your cultural connection'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-500 to-primary-500 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{language === 'pt' ? category.labelPt : category.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecommendations.map((recommendation) => {
          const { activity } = recommendation;
          const IconComponent = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${activity.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {language === 'pt' ? activity.titlePt : activity.titleEn}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <span className="bg-secondary-100 px-2 py-1 rounded">{activity.type}</span>
                    <span>•</span>
                    <span>{activity.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-coral-600">
                    {recommendation.matchScore}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'pt' ? 'Compatível' : 'Match'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-secondary-600 mb-4">
                {language === 'pt' ? activity.descriptionPt : activity.descriptionEn}
              </p>

              {/* Personalized Message */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3 mb-4">
                <div className="text-xs font-medium text-red-800 mb-1">
                  {language === 'pt' ? 'Personalizado para Você:' : 'Personalized for You:'}
                </div>
                <p className="text-sm text-red-700">
                  {recommendation.personalizedMessage}
                </p>
              </div>

              {/* Benefits and Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-action-600">
                    {activity.healingPotential}/10
                  </div>
                  <div className="text-xs text-secondary-600">
                    {language === 'pt' ? 'Potencial de Cura' : 'Healing Potential'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {activity.culturalConnection}/10
                  </div>
                  <div className="text-xs text-secondary-600">
                    {language === 'pt' ? 'Conexão Cultural' : 'Cultural Connection'}
                  </div>
                </div>
              </div>

              {/* Timing and Location */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-secondary-600">
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>{recommendation.suggestedTiming}</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onActivitySelect(activity)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-primary-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-red-700 hover:to-primary-700 transition-all"
                >
                  {language === 'pt' ? 'Mais Detalhes' : 'Learn More'}
                </button>
                <button
                  onClick={() => onScheduleActivity(activity.id)}
                  className="px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  {language === 'pt' ? 'Agendar' : 'Schedule'}
                </button>
              </div>

              {/* Couple Activity Indicator */}
              {showForCouple && activity.type === 'couple' && (
                <div className="mt-3 p-2 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="flex items-center gap-2 text-pink-700 text-sm">
                    <HeartSolid className="w-4 h-4" />
                    <span>
                      {language === 'pt' 
                        ? 'Ideal para casais com saudade partilhada'
                        : 'Ideal for couples with shared saudade'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <HeartIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhuma recomendação encontrada' : 'No recommendations found'}
          </h3>
          <p className="text-secondary-600">
            {language === 'pt' 
              ? 'Tente uma categoria diferente ou complete o seu perfil de saudade'
              : 'Try a different category or complete your saudade profile'}
          </p>
        </div>
      )}
    </div>
  );
}