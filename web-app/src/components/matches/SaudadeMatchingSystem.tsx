"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartIcon,
  HomeIcon,
  MusicalNoteIcon,
  SunIcon,
  CloudIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  FireIcon,
  SparklesIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  PhotoIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";

// Saudade Assessment Types
interface SaudadeAssessment {
  id: string;
  type:
    | "intensity"
    | "frequency"
    | "triggers"
    | "coping"
    | "connection"
    | "language_emotion";
  category:
    | "emotional_depth"
    | "cultural_triggers"
    | "heritage_connection"
    | "support_needs"
    | "homeland_bond";
  weight: number;
  titleEn: string;
  titlePt: string;
  descriptionEn?: string;
  descriptionPt?: string;
  options?: {
    id: string;
    labelEn: string;
    labelPt: string;
    value: number;
    emoji?: string;
    description?: string;
  }[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labelMinEn: string;
    labelMinPt: string;
    labelMaxEn: string;
    labelMaxPt: string;
  };
}

// Lusophone Regional Identity Assessment
interface RegionalIdentity {
  region: string;
  connection: number;
  specificAreas: string[];
  traditions: string[];
  culturalMarkers: string[];
}

// Saudade Profile
interface SaudadeProfile {
  saudadeIntensity: number; // 0-10 scale
  frequency: "constant" | "weekly" | "monthly" | "seasonal" | "rare";
  triggers: string[];
  copingMechanisms: string[];
  homelandConnection: number;
  languageEmotionalAttachment: number;
  culturalSupport: "high" | "moderate" | "low" | "independent";
  regionalIdentity: RegionalIdentity;
  heritagePreservation: number;
  integrationBalance: number;
  emotionalCompatibilityType: string;
  supportNeeds: string[];
  culturalHealingActivities: string[];
}

// Enhanced Cultural Matching Profile
interface CulturalDepthProfile {
  saudadeProfile: SaudadeProfile;
  regionalPreferences: RegionalIdentity[];
  lusoConnectionStrength: Record<string, number>; // Portugal, Brazil, Angola, etc.
  traditionalModernBalance: number;
  communityInvolvement: number;
  familyValuesImportance: number;
  languageFluency: Record<string, number>;
  culturalKnowledge: Record<string, number>;
  musicArtConnection: Record<string, number>;
  foodCookingInvolvement: number;
  socialCustomsAdherence: number;
  communityLeadership: number;
  overallCulturalDepth: number;
  compatibilityRecommendations: string[];
}

// Saudade Assessment Questions
const saudadeAssessmentQuestions: SaudadeAssessment[] = [
  // Saudade Intensity and Core Experience
  {
    id: "saudade_intensity_core",
    type: "intensity",
    category: "emotional_depth",
    weight: 5.0,
    titleEn: "How would you describe the intensity of your saudade?",
    titlePt: "Como descreveria a intensidade da sua saudade?",
    descriptionEn:
      "That uniquely Lusophone feeling of nostalgic longing and emotional connection to your homeland",
    descriptionPt:
      "Esse sentimento unicamente português de nostalgia e ligação emocional à sua terra natal",
    sliderConfig: {
      min: 0,
      max: 10,
      step: 1,
      labelMinEn: "Rarely feel saudade",
      labelMinPt: "Raramente sinto saudade",
      labelMaxEn: "Overwhelming constant presence",
      labelMaxPt: "Presença constante e avassaladora",
    },
  },

  {
    id: "saudade_frequency_patterns",
    type: "frequency",
    category: "emotional_depth",
    weight: 4.0,
    titleEn: "When do you experience saudade most intensely?",
    titlePt: "Quando sente saudade de forma mais intensa?",
    options: [
      {
        id: "daily_constant",
        labelEn: "Daily - it's always with me",
        labelPt: "Diariamente - está sempre comigo",
        value: 10,
        emoji: "💔",
      },
      {
        id: "evening_nights",
        labelEn: "Evenings and quiet moments",
        labelPt: "Noites e momentos silenciosos",
        value: 8,
        emoji: "🌙",
      },
      {
        id: "weekends",
        labelEn: "Weekends when I have time to think",
        labelPt: "Fins de semana quando tenho tempo para pensar",
        value: 7,
        emoji: "🏠",
      },
      {
        id: "special_dates",
        labelEn: "Lusophone holidays and special dates",
        labelPt: "Feriados portugueses e datas especiais",
        value: 9,
        emoji: "📅",
      },
      {
        id: "winter_weather",
        labelEn: "During grey London winters",
        labelPt: "Durante os invernos cinzentos de Londres",
        value: 6,
        emoji: "🌧️",
      },
      {
        id: "music_triggers",
        labelEn: "When hearing Portuguese music",
        labelPt: "Ao ouvir música portuguesa",
        value: 8,
        emoji: "🎵",
      },
      {
        id: "seasonal",
        labelEn: "Seasonally, comes in waves",
        labelPt: "Sazonalmente, vem em ondas",
        value: 5,
        emoji: "🌊",
      },
      {
        id: "rarely",
        labelEn: "Rarely, only on very special occasions",
        labelPt: "Raramente, só em ocasiões muito especiais",
        value: 2,
        emoji: "✨",
      },
    ],
  },

  // Saudade Triggers - Deep Cultural Elements
  {
    id: "saudade_deep_triggers",
    type: "triggers",
    category: "cultural_triggers",
    weight: 4.5,
    titleEn:
      "Which elements trigger your deepest saudade? (Select all that apply)",
    titlePt:
      "Que elementos despertam a sua saudade mais profunda? (Selecione todos os que se aplicam)",
    options: [
      {
        id: "fado_music",
        labelEn: "Fado music - especially Amália",
        labelPt: "Música de fado - especialmente Amália",
        value: 10,
        emoji: "🎭",
      },
      {
        id: "family_voices",
        labelEn: "Family voices on phone calls",
        labelPt: "Vozes da família nas chamadas",
        value: 9,
        emoji: "📞",
      },
      {
        id: "childhood_foods",
        labelEn: "Childhood comfort foods",
        labelPt: "Comidas de conforto da infância",
        value: 8,
        emoji: "🍲",
      },
      {
        id: "portuguese_countryside",
        labelEn: "Lusophone countryside landscapes",
        labelPt: "Paisagens do campo português",
        value: 8,
        emoji: "🌾",
      },
      {
        id: "ocean_waves",
        labelEn: "Sound of ocean waves",
        labelPt: "Som das ondas do mar",
        value: 7,
        emoji: "🌊",
      },
      {
        id: "church_bells",
        labelEn: "Lusophone church bells",
        labelPt: "Sinos das igrejas portuguesas",
        value: 6,
        emoji: "🔔",
      },
      {
        id: "santos_populares",
        labelEn: "Santos Populares season",
        labelPt: "Época dos Santos Populares",
        value: 8,
        emoji: "🎪",
      },
      {
        id: "grandmother_recipes",
        labelEn: "Grandmother's recipes and stories",
        labelPt: "Receitas e histórias da avó",
        value: 9,
        emoji: "👵",
      },
      {
        id: "portuguese_language",
        labelEn: "Lusophone poetry and literature",
        labelPt: "Poesia e literatura portuguesa",
        value: 7,
        emoji: "📚",
      },
      {
        id: "childhood_friends",
        labelEn: "Memories of childhood friends",
        labelPt: "Memórias de amigos de infância",
        value: 8,
        emoji: "👦",
      },
      {
        id: "portuguese_films",
        labelEn: "Lusophone films and TV shows",
        labelPt: "Filmes e programas de TV portugueses",
        value: 6,
        emoji: "🎬",
      },
      {
        id: "festival_memories",
        labelEn: "Village festival memories",
        labelPt: "Memórias de festas da aldeia",
        value: 8,
        emoji: "🎊",
      },
    ],
  },

  // Emotional Coping and Cultural Support
  {
    id: "saudade_coping_mechanisms",
    type: "coping",
    category: "support_needs",
    weight: 4.0,
    titleEn:
      "How do you cope with intense saudade? (Select your main approaches)",
    titlePt:
      "Como lida com a saudade intensa? (Selecione as suas principais abordagens)",
    options: [
      {
        id: "cook_portuguese",
        labelEn: "Cook traditional Lusophone meals",
        labelPt: "Cozinhar refeições tradicionais portuguesas",
        value: 8,
        emoji: "👩‍🍳",
      },
      {
        id: "call_family",
        labelEn: "Long phone calls with family back home",
        labelPt: "Longas chamadas com a família em casa",
        value: 9,
        emoji: "📱",
      },
      {
        id: "listen_fado",
        labelEn: "Listen to Fado and cry it out",
        labelPt: "Ouvir fado e chorar",
        value: 8,
        emoji: "😢",
      },
      {
        id: "portuguese_community",
        labelEn: "Seek Portuguese-speaking community events",
        labelPt: "Procurar eventos da comunidade de falantes de português",
        value: 7,
        emoji: "👥",
      },
      {
        id: "visit_portugal",
        labelEn: "Plan visits to Portugal/homeland",
        labelPt: "Planear visitas a Portugal/terra natal",
        value: 9,
        emoji: "✈️",
      },
      {
        id: "portuguese_media",
        labelEn: "Watch Lusophone TV and films",
        labelPt: "Ver TV e filmes portugueses",
        value: 6,
        emoji: "📺",
      },
      {
        id: "write_journal",
        labelEn: "Write in Lusophone/keep diary",
        labelPt: "Escrever em português/manter diário",
        value: 5,
        emoji: "✍️",
      },
      {
        id: "talk_portuguese_friends",
        labelEn: "Talk with other Portuguese-speaking friends",
        labelPt: "Conversar com outros amigos portugueses",
        value: 8,
        emoji: "💬",
      },
      {
        id: "portuguese_markets",
        labelEn: "Visit Lusophone shops and markets",
        labelPt: "Visitar lojas e mercados portugueses",
        value: 7,
        emoji: "🛒",
      },
      {
        id: "embrace_sadness",
        labelEn: "Embrace the sadness as part of me",
        labelPt: "Abraçar a tristeza como parte de mim",
        value: 6,
        emoji: "🤗",
      },
      {
        id: "share_culture",
        labelEn: "Share Portuguese culture with others",
        labelPt: "Partilhar cultura portuguesa com outros",
        value: 7,
        emoji: "🎭",
      },
      {
        id: "keep_busy",
        labelEn: "Keep myself very busy to avoid it",
        labelPt: "Manter-me muito ocupado(a) para evitar",
        value: 3,
        emoji: "🏃",
      },
    ],
  },

  // Homeland Connection Strength
  {
    id: "homeland_connection_strength",
    type: "connection",
    category: "homeland_bond",
    weight: 4.5,
    titleEn:
      "How strong is your emotional connection to your Lusophone homeland?",
    titlePt:
      "Quão forte é a sua ligação emocional à sua terra natal portuguesa?",
    descriptionEn:
      "Beyond practical ties - your emotional and spiritual connection",
    descriptionPt:
      "Para além dos laços práticos - a sua ligação emocional e espiritual",
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: "Feels distant and foreign now",
      labelMinPt: "Sente-se distante e estranho agora",
      labelMaxEn: "Feels like part of my soul",
      labelMaxPt: "Sente-se como parte da minha alma",
    },
  },

  // Language Emotional Connection
  {
    id: "language_emotional_attachment",
    type: "language_emotion",
    category: "heritage_connection",
    weight: 4.0,
    titleEn: "When you speak Lusophone versus English, how do you feel?",
    titlePt: "Quando fala português versus inglês, como se sente?",
    options: [
      {
        id: "portuguese_soul",
        labelEn: "Lusophone touches my soul, English is practical",
        labelPt: "Português toca a minha alma, inglês é prático",
        value: 10,
        emoji: "❤️",
      },
      {
        id: "portuguese_home",
        labelEn: "Lusophone feels like home, English like work",
        labelPt: "Português parece casa, inglês parece trabalho",
        value: 9,
        emoji: "🏠",
      },
      {
        id: "portuguese_family",
        labelEn: "Lusophone for emotions, English for daily life",
        labelPt: "Português para emoções, inglês para vida diária",
        value: 8,
        emoji: "💝",
      },
      {
        id: "equally_comfortable",
        labelEn: "Equally comfortable in both languages",
        labelPt: "Igualmente confortável em ambas as línguas",
        value: 6,
        emoji: "⚖️",
      },
      {
        id: "english_easier",
        labelEn: "English feels easier now, Lusophone takes effort",
        labelPt: "Inglês é mais fácil agora, português dá trabalho",
        value: 4,
        emoji: "🔄",
      },
      {
        id: "losing_portuguese",
        labelEn: "Worried I'm losing my Lusophone fluency",
        labelPt: "Preocupado(a) que estou a perder fluência em português",
        value: 5,
        emoji: "😟",
      },
      {
        id: "english_dominant",
        labelEn: "Think primarily in English now",
        labelPt: "Penso principalmente em inglês agora",
        value: 2,
        emoji: "🇬🇧",
      },
    ],
  },

  // Regional Lusophone Identity Depth
  {
    id: "regional_identity_depth",
    type: "connection",
    category: "heritage_connection",
    weight: 3.5,
    titleEn: "How deeply do you identify with your specific Lusophone region?",
    titlePt:
      "Quão profundamente se identifica com a sua região portuguesa específica?",
    options: [
      {
        id: "minho_deep",
        labelEn: "Minho - My identity is deeply rooted here",
        labelPt: "Minho - A minha identidade está profundamente enraizada aqui",
        value: 10,
        emoji: "🌲",
      },
      {
        id: "porto_norte",
        labelEn: "Porto/Norte - Proud Northerner, different from South",
        labelPt: "Porto/Norte - Nortista orgulhoso(a), diferente do Sul",
        value: 10,
        emoji: "🍷",
      },
      {
        id: "lisboa_area",
        labelEn: "Lisboa area - Capital energy and culture",
        labelPt: "Zona de Lisboa - energia e cultura da capital",
        value: 10,
        emoji: "🏛️",
      },
      {
        id: "centro_coimbra",
        labelEn: "Centro/Coimbra - Academic and historical heritage",
        labelPt: "Centro/Coimbra - herança académica e histórica",
        value: 10,
        emoji: "🎓",
      },
      {
        id: "alentejo_deep",
        labelEn: "Alentejo - Countryside soul and traditions",
        labelPt: "Alentejo - alma do campo e tradições",
        value: 10,
        emoji: "🌾",
      },
      {
        id: "algarve_coast",
        labelEn: "Algarve - Coastal living and fishing culture",
        labelPt: "Algarve - vida costeira e cultura piscatória",
        value: 10,
        emoji: "🏖️",
      },
      {
        id: "acores_island",
        labelEn: "Açores - Island identity and unique culture",
        labelPt: "Açores - identidade insular e cultura única",
        value: 10,
        emoji: "🌋",
      },
      {
        id: "madeira_island",
        labelEn: "Madeira - Proud Madeirense traditions",
        labelPt: "Madeira - tradições madeirenses orgulhosas",
        value: 10,
        emoji: "🌺",
      },
      {
        id: "general_portuguese",
        labelEn: "Generally Lusophone, not region-specific",
        labelPt: "Genericamente português(a), não específico da região",
        value: 6,
        emoji: "🇵🇹",
      },
      {
        id: "mixed_regions",
        labelEn: "Connected to multiple Lusophone regions",
        labelPt: "Ligado(a) a múltiplas regiões portuguesas",
        value: 7,
        emoji: "🗺️",
      },
    ],
  },

  // Cultural Support Needs Assessment
  {
    id: "cultural_support_needs",
    type: "coping",
    category: "support_needs",
    weight: 3.8,
    titleEn: "What kind of cultural emotional support do you most need?",
    titlePt: "Que tipo de apoio emocional cultural mais necessita?",
    options: [
      {
        id: "understanding_saudade",
        labelEn: "Someone who understands my saudade without explanation",
        labelPt: "Alguém que entenda a minha saudade sem explicação",
        value: 10,
        emoji: "🤝",
      },
      {
        id: "share_traditions",
        labelEn: "Partner to maintain traditions together",
        labelPt: "Parceiro(a) para manter tradições juntos",
        value: 9,
        emoji: "🎭",
      },
      {
        id: "portuguese_children",
        labelEn: "Raise Portuguese-speaking children together",
        labelPt: "Criar filhos que falam português juntos",
        value: 8,
        emoji: "👶",
      },
      {
        id: "homeland_visits",
        labelEn: "Someone to visit Portugal/homeland with",
        labelPt: "Alguém com quem visitar Portugal/terra natal",
        value: 8,
        emoji: "✈️",
      },
      {
        id: "community_building",
        labelEn: "Build Portuguese-speaking community together in London",
        labelPt:
          "Construir comunidade de falantes de português juntos em Londres",
        value: 7,
        emoji: "🏗️",
      },
      {
        id: "cultural_healing",
        labelEn: "Help heal cultural loneliness",
        labelPt: "Ajudar a curar a solidão cultural",
        value: 9,
        emoji: "💚",
      },
      {
        id: "integration_balance",
        labelEn: "Balance integration with heritage preservation",
        labelPt: "Equilibrar integração com preservação da herança",
        value: 7,
        emoji: "⚖️",
      },
      {
        id: "independence",
        labelEn: "Mostly independent, light cultural connection",
        labelPt: "Maioritariamente independente, ligação cultural leve",
        value: 3,
        emoji: "🦋",
      },
    ],
  },

  // Lusophone Cultural Connections
  {
    id: "lusophone_connections",
    type: "connection",
    category: "heritage_connection",
    weight: 3.0,
    titleEn: "How do you connect with other Lusophone cultures?",
    titlePt: "Como se conecta com outras culturas lusófonas?",
    options: [
      {
        id: "portuguese_only",
        labelEn: "Primarily Lusophone - others feel different",
        labelPt: "Principalmente português - outros parecem diferentes",
        value: 8,
        emoji: "🇵🇹",
      },
      {
        id: "lusophone_family",
        labelEn: "All Lusophone cultures feel like family",
        labelPt: "Todas as culturas lusófonas parecem família",
        value: 10,
        emoji: "🌍",
      },
      {
        id: "brazilian_connection",
        labelEn: "Strong connection to Brazilian culture",
        labelPt: "Forte ligação à cultura brasileira",
        value: 9,
        emoji: "🇧🇷",
      },
      {
        id: "african_lusophone",
        labelEn: "Deep respect for African Lusophone heritage",
        labelPt: "Profundo respeito pela herança lusófona africana",
        value: 8,
        emoji: "🌍",
      },
      {
        id: "cape_verdean",
        labelEn: "Feel connected to Cape Verdean community",
        labelPt: "Sinto-me ligado(a) à comunidade cabo-verdiana",
        value: 7,
        emoji: "🇨🇻",
      },
      {
        id: "language_bond",
        labelEn: "Language creates automatic cultural bond",
        labelPt: "A língua cria ligação cultural automática",
        value: 8,
        emoji: "🗣️",
      },
      {
        id: "cultural_curiosity",
        labelEn: "Curious but maintain Lusophone identity",
        labelPt: "Curioso(a) mas mantenho identidade portuguesa",
        value: 6,
        emoji: "🤔",
      },
      {
        id: "limited_connection",
        labelEn: "Limited connection beyond Lusophone",
        labelPt: "Ligação limitada para além do português",
        value: 4,
        emoji: "🔗",
      },
    ],
  },

  // Cultural Heritage Preservation vs Integration
  {
    id: "heritage_integration_balance",
    type: "intensity",
    category: "heritage_connection",
    weight: 4.2,
    titleEn:
      "How do you balance Portuguese heritage preservation with United Kingdom integration?",
    titlePt:
      "Como equilibra a preservação da herança portuguesa com a integração no Reino Unido?",
    descriptionEn:
      "Your approach to maintaining cultural identity while adapting to life in the United Kingdom",
    descriptionPt:
      "A sua abordagem para manter a identidade cultural enquanto se adapta à vida no Reino Unido",
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: "Full integration, minimal heritage",
      labelMinPt: "Integração total, herança mínima",
      labelMaxEn: "Strong heritage, selective integration",
      labelMaxPt: "Herança forte, integração seletiva",
    },
  },

  // Future Cultural Vision
  {
    id: "future_cultural_vision",
    type: "connection",
    category: "heritage_connection",
    weight: 3.5,
    titleEn: "Your vision for Portuguese culture in your future family life:",
    titlePt:
      "A sua visão para a cultura portuguesa na sua futura vida familiar:",
    options: [
      {
        id: "fully_portuguese_home",
        labelEn: "Maintain fully Lusophone household in London",
        labelPt: "Manter casa totalmente portuguesa em Londres",
        value: 10,
        emoji: "🏠",
      },
      {
        id: "bilingual_bicultural",
        labelEn: "Raise bilingual, bicultural children",
        labelPt: "Criar filhos bilingues e biculturais",
        value: 9,
        emoji: "👨‍👩‍👧‍👦",
      },
      {
        id: "portuguese_summers",
        labelEn: "United Kingdom life, Lusophone summers and holidays",
        labelPt: "Vida no Reino Unido, verões e feriados portugueses",
        value: 8,
        emoji: "☀️",
      },
      {
        id: "cultural_events_active",
        labelEn: "Active in Lusophone cultural events and community",
        labelPt: "Ativo(a) em eventos culturais portugueses e comunidade",
        value: 8,
        emoji: "🎪",
      },
      {
        id: "selective_traditions",
        labelEn: "Keep select meaningful traditions",
        labelPt: "Manter tradições selecionadas e significativas",
        value: 7,
        emoji: "🎯",
      },
      {
        id: "portuguese_food_music",
        labelEn: "Portuguese food and music, British lifestyle",
        labelPt: "Comida e música portuguesa, estilo de vida britânico",
        value: 6,
        emoji: "🍽️",
      },
      {
        id: "occasional_connections",
        labelEn: "Occasional Lusophone connections",
        labelPt: "Ligações portuguesas ocasionais",
        value: 4,
        emoji: "🔗",
      },
      {
        id: "mostly_british",
        labelEn: "Mostly British lifestyle with Portuguese heritage",
        labelPt:
          "Estilo de vida maioritariamente britânico com herança portuguesa",
        value: 3,
        emoji: "🇬🇧",
      },
    ],
  },
];

// Saudade Matching Algorithm
interface SaudadeCompatibilityResult {
  compatibilityScore: number;
  saudadeAlignment: number;
  emotionalSupport: number;
  culturalDepth: number;
  heritageAlignment: number;
  copingCompatibility: number;
  recommendedActivities: string[];
  supportStrengths: string[];
  potentialChallenges: string[];
  connectionType:
    | "saudade_soulmate"
    | "cultural_healer"
    | "heritage_guardian"
    | "integration_partner"
    | "gentle_companion";
}

interface SaudadeMatchingSystemProps {
  onComplete: (profile: CulturalDepthProfile) => void;
  onClose: () => void;
  showAsModal?: boolean;
}

export default function SaudadeMatchingSystem({
  onComplete,
  onClose,
  showAsModal = true,
}: SaudadeMatchingSystemProps) {
  const { language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(5);

  const currentQuestion = saudadeAssessmentQuestions[currentQuestionIndex] as
    | (typeof saudadeAssessmentQuestions)[number]
    | undefined;
  const progress =
    ((currentQuestionIndex + 1) / saudadeAssessmentQuestions.length) * 100;
  const isLastQuestion =
    currentQuestionIndex === saudadeAssessmentQuestions.length - 1;

  // Initialize slider value for each question
  useEffect(() => {
    if (currentQuestion?.sliderConfig) {
      const mid = Math.ceil(
        (currentQuestion.sliderConfig.min + currentQuestion.sliderConfig.max) /
          2
      );
      setSliderValue(mid);
    }
    setSelectedOptions([]);
  }, [currentQuestionIndex, currentQuestion?.sliderConfig]);

  const handleAnswer = () => {
    let answerValue: any;

    if (!currentQuestion) return null;
    switch (currentQuestion.type) {
      case "intensity":
      case "connection":
      case "language_emotion":
        answerValue = sliderValue;
        break;
      case "frequency":
      case "triggers":
      case "coping":
        answerValue = selectedOptions;
        break;
      default:
        return;
    }

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: {
        value: answerValue,
        questionType: currentQuestion.type,
        category: currentQuestion.category,
      },
    };

    setAnswers(newAnswers);

    if (isLastQuestion) {
      const profile = calculateSaudadeProfile(newAnswers);
      setIsCompleted(true);
      setShowResults(true);
      onComplete(profile);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateSaudadeProfile = (
    assessmentAnswers: Record<string, any>
  ): CulturalDepthProfile => {
    // Calculate saudade intensity
    const saudadeIntensity =
      assessmentAnswers["saudade_intensity_core"]?.value || 5;
    const homelandConnection =
      assessmentAnswers["homeland_connection_strength"]?.value || 5;
    const languageEmotional =
      assessmentAnswers["language_emotional_attachment"]?.value || 5;
    const heritageBalance =
      assessmentAnswers["heritage_integration_balance"]?.value || 5;

    // Determine frequency pattern
    const frequencyAnswers =
      assessmentAnswers["saudade_frequency_patterns"]?.value || [];
    let frequency: SaudadeProfile["frequency"] = "monthly";
    if (frequencyAnswers.includes("daily_constant")) frequency = "constant";
    else if (
      frequencyAnswers.includes("evening_nights") ||
      frequencyAnswers.includes("music_triggers")
    )
      frequency = "weekly";
    else if (frequencyAnswers.includes("seasonal")) frequency = "seasonal";
    else if (frequencyAnswers.includes("rarely")) frequency = "rare";

    // Extract triggers and coping mechanisms
    const triggers = assessmentAnswers["saudade_deep_triggers"]?.value || [];
    const copingMechanisms =
      assessmentAnswers["saudade_coping_mechanisms"]?.value || [];
    const supportNeeds =
      assessmentAnswers["cultural_support_needs"]?.value || [];

    // Determine cultural support level
    let culturalSupport: SaudadeProfile["culturalSupport"] = "moderate";
    if (
      supportNeeds.includes("understanding_saudade") ||
      supportNeeds.includes("cultural_healing")
    ) {
      culturalSupport = "high";
    } else if (supportNeeds.includes("independence")) {
      culturalSupport = "independent";
    } else if (supportNeeds.length <= 2) {
      culturalSupport = "low";
    }

    // Create regional identity
    const regionalAnswers =
      assessmentAnswers["regional_identity_depth"]?.value || [];
    const regionalIdentity: RegionalIdentity = {
      region: regionalAnswers[0] || "general_portuguese",
      connection: 8,
      specificAreas: [],
      traditions: [],
      culturalMarkers: [],
    };

    // Determine emotional compatibility type
    let emotionalCompatibilityType = "";
    if (saudadeIntensity >= 8 && culturalSupport === "high") {
      emotionalCompatibilityType =
        language === "pt" ? "Alma Saudosa" : "Saudade Soul";
    } else if (heritageBalance >= 8 && homelandConnection >= 8) {
      emotionalCompatibilityType =
        language === "pt" ? "Guardião Cultural" : "Cultural Guardian";
    } else if (
      culturalSupport === "high" &&
      copingMechanisms.includes("portuguese_community")
    ) {
      emotionalCompatibilityType =
        language === "pt" ? "Construtor de Pontes" : "Bridge Builder";
    } else if (saudadeIntensity >= 6 && frequency === "weekly") {
      emotionalCompatibilityType =
        language === "pt" ? "Coração Nostálgico" : "Nostalgic Heart";
    } else {
      emotionalCompatibilityType =
        language === "pt" ? "Equilibrista Cultural" : "Cultural Balancer";
    }

    // Generate cultural healing activities
    const culturalHealingActivities = generateCulturalHealingActivities(
      triggers,
      copingMechanisms,
      language
    );

    const saudadeProfile: SaudadeProfile = {
      saudadeIntensity,
      frequency,
      triggers,
      copingMechanisms,
      homelandConnection,
      languageEmotionalAttachment: languageEmotional,
      culturalSupport,
      regionalIdentity,
      heritagePreservation: heritageBalance,
      integrationBalance: 10 - heritageBalance,
      emotionalCompatibilityType,
      supportNeeds,
      culturalHealingActivities,
    };

    // Create comprehensive cultural depth profile
    const overallCulturalDepth =
      (saudadeIntensity +
        homelandConnection +
        languageEmotional +
        heritageBalance) /
      4;

    const culturalDepthProfile: CulturalDepthProfile = {
      saudadeProfile,
      regionalPreferences: [regionalIdentity],
      lusoConnectionStrength: {
        portugal: homelandConnection,
        brazil: 6, // Default values, would be more detailed in full implementation
        angola: 5,
        cape_verde: 4,
      },
      traditionalModernBalance: heritageBalance,
      communityInvolvement:
        culturalSupport === "high" ? 8 : culturalSupport === "moderate" ? 6 : 4,
      familyValuesImportance: 8,
      languageFluency: { portuguese: languageEmotional, english: 8 },
      culturalKnowledge: { traditional: heritageBalance, modern: 6 },
      musicArtConnection: {
        fado: triggers.includes("fado_music") ? 9 : 5,
        folk: 6,
      },
      foodCookingInvolvement: copingMechanisms.includes("cook_portuguese")
        ? 9
        : 5,
      socialCustomsAdherence: heritageBalance,
      communityLeadership: culturalSupport === "high" ? 7 : 4,
      overallCulturalDepth,
      compatibilityRecommendations: generateCompatibilityRecommendations(
        saudadeProfile,
        language
      ),
    };

    return culturalDepthProfile;
  };

  const generateCulturalHealingActivities = (
    triggers: string[],
    copingMechanisms: string[],
    lang: string
  ): string[] => {
    const activities: string[] = [];

    if (
      triggers.includes("fado_music") ||
      copingMechanisms.includes("listen_fado")
    ) {
      activities.push(
        lang === "pt"
          ? "Noites de fado autênticas em Londres"
          : "Authentic fado nights in London"
      );
    }

    if (copingMechanisms.includes("cook_portuguese")) {
      activities.push(
        lang === "pt"
          ? "Workshops de culinária portuguesa em grupo"
          : "Group Lusophone cooking workshops"
      );
    }

    if (triggers.includes("portuguese_countryside")) {
      activities.push(
        lang === "pt"
          ? "Visitas a jardins e parques que lembram Portugal"
          : "Visits to gardens and parks reminiscent of Portugal"
      );
    }

    if (copingMechanisms.includes("portuguese_community")) {
      activities.push(
        lang === "pt"
          ? "Participação ativa em eventos comunitários portugueses"
          : "Active participation in Portuguese-speaking community events"
      );
    }

    return activities;
  };

  const generateCompatibilityRecommendations = (
    profile: SaudadeProfile,
    lang: string
  ): string[] => {
    const recommendations: string[] = [];

    if (profile.saudadeIntensity >= 7) {
      recommendations.push(
        lang === "pt"
          ? "Procure parceiros com saudade similar para apoio emocional mútuo"
          : "Seek partners with similar saudade for mutual emotional support"
      );
    }

    if (profile.culturalSupport === "high") {
      recommendations.push(
        lang === "pt"
          ? "Ideais para relacionamentos com forte componente cultural partilhada"
          : "Ideal for relationships with strong shared cultural component"
      );
    }

    if (profile.heritagePreservation >= 8) {
      recommendations.push(
        lang === "pt"
          ? "Compatível com parceiros que valorizam tradições portuguesas"
          : "Compatible with partners who value Portuguese traditions"
      );
    }

    return recommendations;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "intensity":
      case "connection":
        return (
          <div className="space-y-6">
            <div className="px-4">
              <input
                type="range"
                min={currentQuestion?.sliderConfig?.min || 1}
                max={currentQuestion?.sliderConfig?.max || 10}
                step={currentQuestion?.sliderConfig?.step || 1}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-gray-200 via-primary-200 to-primary-400 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f3f4f6 0%, #e5e7eb ${(sliderValue - 1) * 10}%, #dc2626 ${(sliderValue - 1) * 10}%, #dc2626 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span className="text-left max-w-[40%]">
                  {language === "pt"
                    ? currentQuestion?.sliderConfig?.labelMinPt
                    : currentQuestion?.sliderConfig?.labelMinEn}
                </span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-2xl text-primary-600 mb-1">
                    {sliderValue}
                  </span>
                  <div className="flex">
                    {[...Array(sliderValue)].map((_, i) => (
                      <span key={i} className="text-red-500 mx-0.5">
                        ❤
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-right max-w-[40%]">
                  {language === "pt"
                    ? currentQuestion?.sliderConfig?.labelMaxPt
                    : currentQuestion?.sliderConfig?.labelMaxEn}
                </span>
              </div>
            </div>
          </div>
        );

      case "frequency":
      case "triggers":
      case "coping":
        const isMultiSelect =
          currentQuestion?.type === "triggers" ||
          currentQuestion?.type === "coping";
        return (
          <div className="space-y-3">
            {isMultiSelect && (
              <p className="text-sm text-gray-600 text-center mb-4">
                {language === "pt"
                  ? "Selecione todas as opções que se aplicam"
                  : "Select all that apply"}
              </p>
            )}
            {currentQuestion?.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  if (isMultiSelect) {
                    setSelectedOptions((prev) =>
                      prev.includes(option.id)
                        ? prev.filter((id) => id !== option.id)
                        : [...prev, option.id]
                    );
                  } else {
                    setSelectedOptions([option.id]);
                  }
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedOptions.includes(option.id)
                    ? "border-red-500 bg-red-50 text-red-900 shadow-lg"
                    : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-25"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="flex-1">
                    <span className="font-medium block">
                      {language === "pt" ? option.labelPt : option.labelEn}
                    </span>
                    {option.description && (
                      <span className="text-sm text-gray-600 block mt-1">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {selectedOptions.includes(option.id) && (
                    <span className="text-red-500">❤</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    switch (currentQuestion.type) {
      case "intensity":
      case "connection":
        return true;
      case "frequency":
      case "triggers":
      case "coping":
        return selectedOptions.length > 0;
      default:
        return false;
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">💝</div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              {language === "pt"
                ? "Perfil de Saudade Completo!"
                : "Saudade Profile Complete!"}
            </h2>
            <p className="text-gray-600">
              {language === "pt"
                ? "Descubra conexões emocionais autênticas baseadas na sua saudade"
                : "Discover authentic emotional connections based on your saudade"}
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => {
                setShowResults(false);
                onClose();
              }}
              className="w-full bg-gradient-to-r from-red-600 to-primary-600 text-white py-4 rounded-xl font-semibold hover:from-red-700 hover:to-primary-700 transition-all"
            >
              {language === "pt"
                ? "Ver Matches Emocionalmente Compatíveis"
                : "View Emotionally Compatible Matches"}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              {language === "pt" ? "Fechar" : "Close"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const content = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary-900">
            {language === "pt"
              ? "Avaliação de Saudade e Compatibilidade Cultural"
              : "Saudade & Cultural Compatibility Assessment"}
          </h2>
          <p className="text-sm text-gray-600">
            {language === "pt"
              ? `Pergunta ${currentQuestionIndex + 1} de ${saudadeAssessmentQuestions.length} - Compreenda a sua saudade`
              : `Question ${currentQuestionIndex + 1} of ${saudadeAssessmentQuestions.length} - Understanding your saudade`}
          </p>
        </div>
        {showAsModal && (
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
        <motion.div
          className="bg-gradient-to-r from-red-500 via-primary-500 to-secondary-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center text-white">
            ❤
          </div>
          <span className="bg-gradient-to-r from-red-100 to-primary-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium uppercase">
            {currentQuestion ? currentQuestion.category : ""}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {currentQuestion
            ? language === "pt"
              ? currentQuestion.titlePt
              : currentQuestion.titleEn
            : ""}
        </h3>

        {currentQuestion?.descriptionEn && (
          <p className="text-sm text-gray-600 mb-6">
            {currentQuestion
              ? language === "pt"
                ? currentQuestion.descriptionPt
                : currentQuestion.descriptionEn
              : ""}
          </p>
        )}
      </div>

      {/* Question Content */}
      <div className="mb-8">{renderQuestion()}</div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span aria-hidden>←</span>
          {language === "pt" ? "Anterior" : "Previous"}
        </button>

        <button
          onClick={handleAnswer}
          disabled={!canProceed()}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span aria-hidden>❤</span>
          {isLastQuestion
            ? language === "pt"
              ? "Completar Avaliação"
              : "Complete Assessment"
            : language === "pt"
              ? "Próxima"
              : "Next"}
        </button>
      </div>
    </>
  );

  if (showAsModal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {content}
        </motion.div>
      </motion.div>
    );
  }

  return <div className="bg-white rounded-3xl p-6 shadow-lg">{content}</div>;
}

// Export types for use in matching system
export type {
  SaudadeProfile,
  CulturalDepthProfile,
  SaudadeCompatibilityResult,
  RegionalIdentity,
};
