"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  StarIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  PlayIcon,
  MapPinIcon,
  MusicalNoteIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  AcademicCapIcon,
  FireIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Quiz Question Types
interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'slider' | 'image_selection' | 'scenario' | 'ranking';
  category: 'food' | 'music' | 'traditions' | 'family' | 'language' | 'integration' | 'community' | 'values' | 'holidays' | 'regional';
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
    image?: string;
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

// Portuguese Cultural Compatibility Questions
const quizQuestions: QuizQuestion[] = [
  // Food & Cuisine Category
  {
    id: 'food_cooking_frequency',
    type: 'multiple_choice',
    category: 'food',
    weight: 2.5,
    titleEn: 'How often do you cook traditional Portuguese/Brazilian food?',
    titlePt: 'Com que frequência cozinha comida tradicional portuguesa/brasileira?',
    options: [
      { id: 'daily', labelEn: 'Almost daily', labelPt: 'Quase todos os dias', value: 10, emoji: '👩‍🍳' },
      { id: 'weekly', labelEn: 'Few times a week', labelPt: 'Algumas vezes por semana', value: 8, emoji: '🍽️' },
      { id: 'special', labelEn: 'Only for special occasions', labelPt: 'Apenas em ocasiões especiais', value: 5, emoji: '🎉' },
      { id: 'rarely', labelEn: 'Rarely, I miss it', labelPt: 'Raramente, tenho saudades', value: 3, emoji: '😢' },
      { id: 'never', labelEn: 'Never cook it in London', labelPt: 'Nunca cozinho em Londres', value: 1, emoji: '🚫' },
    ],
  },
  {
    id: 'food_ingredients_importance',
    type: 'slider',
    category: 'food',
    weight: 2.0,
    titleEn: 'How important is finding authentic Portuguese ingredients in London?',
    titlePt: 'Quão importante é encontrar ingredientes portugueses autênticos em Londres?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: 'Not important',
      labelMinPt: 'Nada importante',
      labelMaxEn: 'Essential for happiness',
      labelMaxPt: 'Essencial para a felicidade',
    },
  },
  {
    id: 'food_favorites',
    type: 'image_selection',
    category: 'food',
    weight: 2.0,
    titleEn: 'Which Portuguese foods make you most nostalgic? (Select up to 3)',
    titlePt: 'Que comidas portuguesas lhe dão mais nostalgia? (Selecione até 3)',
    options: [
      { id: 'pasteis_nata', labelEn: 'Pastéis de Nata', labelPt: 'Pastéis de Nata', value: 10, emoji: '🧁' },
      { id: 'francesinha', labelEn: 'Francesinha', labelPt: 'Francesinha', value: 9, emoji: '🥪' },
      { id: 'bacalhau', labelEn: 'Bacalhau dishes', labelPt: 'Pratos de bacalhau', value: 10, emoji: '🐟' },
      { id: 'caldo_verde', labelEn: 'Caldo Verde', labelPt: 'Caldo Verde', value: 8, emoji: '🍲' },
      { id: 'bifana', labelEn: 'Bifana', labelPt: 'Bifana', value: 7, emoji: '🥖' },
      { id: 'feijoada', labelEn: 'Feijoada (Brazilian)', labelPt: 'Feijoada (Brasileira)', value: 9, emoji: '🍛' },
      { id: 'pao_acucar', labelEn: 'Pão de Açúcar', labelPt: 'Pão de Açúcar', value: 6, emoji: '🍞' },
      { id: 'queijadas', labelEn: 'Queijadas', labelPt: 'Queijadas', value: 7, emoji: '🧀' },
    ],
  },

  // Music & Culture Category
  {
    id: 'music_fado_connection',
    type: 'slider',
    category: 'music',
    weight: 3.0,
    titleEn: 'How deeply do you connect with Fado music?',
    titlePt: 'Quão profundamente se conecta com o Fado?',
    descriptionEn: 'From casual listening to emotional connection',
    descriptionPt: 'De ouvir casualmente até ligação emocional',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: 'Just background music',
      labelMinPt: 'Apenas música de fundo',
      labelMaxEn: 'Brings tears to my eyes',
      labelMaxPt: 'Faz-me chorar',
    },
  },
  {
    id: 'music_preferences',
    type: 'multiple_choice',
    category: 'music',
    weight: 2.5,
    titleEn: 'Which Portuguese music genre speaks to your soul?',
    titlePt: 'Que género musical português fala à sua alma?',
    options: [
      { id: 'fado', labelEn: 'Traditional Fado', labelPt: 'Fado Tradicional', value: 10, emoji: '🎭' },
      { id: 'pimba', labelEn: 'Pimba (Fun & Dancing)', labelPt: 'Pimba (Diversão & Dança)', value: 8, emoji: '💃' },
      { id: 'rock_portugues', labelEn: 'Portuguese Rock', labelPt: 'Rock Português', value: 7, emoji: '🎸' },
      { id: 'bossa_nova', labelEn: 'Bossa Nova (Brazilian)', labelPt: 'Bossa Nova (Brasileira)', value: 9, emoji: '🎵' },
      { id: 'samba', labelEn: 'Samba', labelPt: 'Samba', value: 8, emoji: '🥁' },
      { id: 'morna', labelEn: 'Morna (Cape Verdean)', labelPt: 'Morna (Cabo-verdiana)', value: 9, emoji: '🌊' },
    ],
  },

  // Saudade & Emotional Connection
  {
    id: 'saudade_level',
    type: 'slider',
    category: 'traditions',
    weight: 4.0,
    titleEn: 'How often do you experience "saudade" for your homeland?',
    titlePt: 'Com que frequência sente "saudade" da sua terra natal?',
    descriptionEn: 'That uniquely Portuguese feeling of nostalgic longing',
    descriptionPt: 'Esse sentimento unicamente português de nostalgia e saudade',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: 'Rarely feel it',
      labelMinPt: 'Raramente sinto',
      labelMaxEn: 'Constant companion',
      labelMaxPt: 'Companheira constante',
    },
  },

  // Regional & Heritage
  {
    id: 'regional_connection',
    type: 'multiple_choice',
    category: 'regional',
    weight: 2.5,
    titleEn: 'Which Portuguese-speaking region do you feel most connected to?',
    titlePt: 'A que região lusófona se sente mais ligado(a)?',
    options: [
      { id: 'norte_portugal', labelEn: 'Northern Portugal (Porto, Braga)', labelPt: 'Norte de Portugal (Porto, Braga)', value: 10, emoji: '🇵🇹' },
      { id: 'centro_portugal', labelEn: 'Central Portugal (Coimbra, Aveiro)', labelPt: 'Centro de Portugal (Coimbra, Aveiro)', value: 10, emoji: '🏛️' },
      { id: 'lisboa_area', labelEn: 'Lisbon & Surrounding', labelPt: 'Lisboa e Arredores', value: 10, emoji: '🌅' },
      { id: 'alentejo_algarve', labelEn: 'Alentejo & Algarve', labelPt: 'Alentejo e Algarve', value: 10, emoji: '🌾' },
      { id: 'acores', labelEn: 'Azores Islands', labelPt: 'Ilhas dos Açores', value: 10, emoji: '🏝️' },
      { id: 'madeira', labelEn: 'Madeira Island', labelPt: 'Ilha da Madeira', value: 10, emoji: '🌺' },
      { id: 'brasil_sudeste', labelEn: 'Southeast Brazil (SP, RJ)', labelPt: 'Sudeste do Brasil (SP, RJ)', value: 10, emoji: '🇧🇷' },
      { id: 'brasil_nordeste', labelEn: 'Northeast Brazil', labelPt: 'Nordeste do Brasil', value: 10, emoji: '🏖️' },
      { id: 'angola', labelEn: 'Angola', labelPt: 'Angola', value: 10, emoji: '🇦🇴' },
      { id: 'cabo_verde', labelEn: 'Cape Verde', labelPt: 'Cabo Verde', value: 10, emoji: '🇨🇻' },
    ],
  },

  // Language Usage
  {
    id: 'language_daily_use',
    type: 'multiple_choice',
    category: 'language',
    weight: 3.0,
    titleEn: 'In your daily life in London, which language do you use most?',
    titlePt: 'Na sua vida diária em Londres, que língua usa mais?',
    options: [
      { id: 'mostly_portuguese', labelEn: 'Mostly Portuguese', labelPt: 'Maioritariamente português', value: 10, emoji: '🇵🇹' },
      { id: 'equal_both', labelEn: 'Equal Portuguese & English', labelPt: 'Português e inglês igualmente', value: 8, emoji: '🌍' },
      { id: 'mostly_english', labelEn: 'Mostly English, Portuguese at home', labelPt: 'Maioritariamente inglês, português em casa', value: 6, emoji: '🏠' },
      { id: 'english_portuguese_friends', labelEn: 'English work, Portuguese with friends', labelPt: 'Inglês no trabalho, português com amigos', value: 7, emoji: '👥' },
      { id: 'struggling_portuguese', labelEn: 'Trying to maintain Portuguese', labelPt: 'A tentar manter o português', value: 4, emoji: '📚' },
    ],
  },

  // Family & Traditions
  {
    id: 'family_traditions',
    type: 'multiple_choice',
    category: 'family',
    weight: 3.5,
    titleEn: 'Which Portuguese family traditions do you maintain in London?',
    titlePt: 'Que tradições familiares portuguesas mantém em Londres?',
    options: [
      { id: 'christmas_24th', labelEn: 'Christmas dinner on December 24th', labelPt: 'Ceia de Natal a 24 de dezembro', value: 9, emoji: '🎄' },
      { id: 'santos_populares', labelEn: 'Santos Populares celebrations', labelPt: 'Celebrações dos Santos Populares', value: 8, emoji: '🎪' },
      { id: 'family_sunday_lunch', labelEn: 'Long family Sunday lunches', labelPt: 'Almoços familiares longos de domingo', value: 9, emoji: '🍽️' },
      { id: 'easter_traditions', labelEn: 'Portuguese Easter traditions', labelPt: 'Tradições da Páscoa portuguesa', value: 7, emoji: '🥚' },
      { id: 'festa_junina', labelEn: 'Festa Junina (Brazilian)', labelPt: 'Festa Junina (Brasileira)', value: 8, emoji: '🌽' },
      { id: 'all_souls_day', labelEn: 'Day of the Dead remembrance', labelPt: 'Recordação do Dia dos Finados', value: 6, emoji: '🕯️' },
    ],
  },

  // Holiday Celebrations
  {
    id: 'holiday_adaptation',
    type: 'scenario',
    category: 'holidays',
    weight: 2.5,
    titleEn: 'Your ideal Christmas celebration in London would be:',
    titlePt: 'A sua celebração ideal de Natal em Londres seria:',
    options: [
      { id: 'traditional_portuguese', labelEn: 'Exactly like back home - Portuguese traditions only', labelPt: 'Exatamente como em casa - só tradições portuguesas', value: 10, emoji: '🇵🇹' },
      { id: 'mix_traditions', labelEn: 'Mix Portuguese traditions with British customs', labelPt: 'Misturar tradições portuguesas com costumes britânicos', value: 7, emoji: '🌍' },
      { id: 'adapt_local', labelEn: 'Mostly British way, with some Portuguese touches', labelPt: 'Maioritariamente à britânica, com toques portugueses', value: 4, emoji: '🇬🇧' },
      { id: 'fully_integrated', labelEn: 'Completely British - when in Rome...', labelPt: 'Completamente britânico - em Roma sê romano...', value: 2, emoji: '🤝' },
    ],
  },

  // Community Involvement
  {
    id: 'community_involvement',
    type: 'multiple_choice',
    category: 'community',
    weight: 3.0,
    titleEn: 'How involved are you in the Portuguese community in London?',
    titlePt: 'Quão envolvido(a) está na comunidade portuguesa em Londres?',
    options: [
      { id: 'very_active', labelEn: 'Very active - organize events', labelPt: 'Muito ativo(a) - organizo eventos', value: 10, emoji: '👑' },
      { id: 'regular_attendee', labelEn: 'Regular attendee at events', labelPt: 'Participo regularmente em eventos', value: 8, emoji: '🎉' },
      { id: 'occasional', labelEn: 'Occasional participation', labelPt: 'Participação ocasional', value: 6, emoji: '👋' },
      { id: 'want_to_join', labelEn: 'Want to get more involved', labelPt: 'Quero envolver-me mais', value: 5, emoji: '🚀' },
      { id: 'prefer_private', labelEn: 'Prefer smaller, private gatherings', labelPt: 'Prefiro reuniões menores e privadas', value: 4, emoji: '👥' },
      { id: 'not_interested', labelEn: 'Not particularly interested', labelPt: 'Não muito interessado(a)', value: 2, emoji: '🤷' },
    ],
  },

  // Values & Social Behavior
  {
    id: 'social_behavior',
    type: 'scenario',
    category: 'values',
    weight: 2.8,
    titleEn: 'When meeting new Portuguese people in London, you typically:',
    titlePt: 'Quando conhece novos portugueses em Londres, normalmente:',
    options: [
      { id: 'warm_immediate', labelEn: 'Immediately warm and welcoming - like family', labelPt: 'Imediatamente caloroso(a) e acolhedor(a) - como família', value: 10, emoji: '🤗' },
      { id: 'friendly_cautious', labelEn: 'Friendly but take time to open up', labelPt: 'Simpático(a) mas demoro a abrir-me', value: 7, emoji: '😊' },
      { id: 'polite_reserved', labelEn: 'Polite but reserved initially', labelPt: 'Educado(a) mas reservado(a) inicialmente', value: 5, emoji: '🤝' },
      { id: 'very_private', labelEn: 'Quite private, prefer to observe first', labelPt: 'Muito reservado(a), prefiro observar primeiro', value: 3, emoji: '👀' },
    ],
  },

  // Integration vs Heritage
  {
    id: 'integration_balance',
    type: 'slider',
    category: 'integration',
    weight: 3.5,
    titleEn: 'How do you balance Portuguese heritage with British integration?',
    titlePt: 'Como equilibra a herança portuguesa com a integração britânica?',
    descriptionEn: 'Finding your cultural balance in London',
    descriptionPt: 'Encontrando o seu equilíbrio cultural em Londres',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      labelMinEn: 'Fully integrated, minimal heritage',
      labelMinPt: 'Totalmente integrado(a), herança mínima',
      labelMaxEn: 'Strong heritage, selective integration',
      labelMaxPt: 'Herança forte, integração seletiva',
    },
  },

  // Future Plans
  {
    id: 'future_connection',
    type: 'multiple_choice',
    category: 'values',
    weight: 2.0,
    titleEn: 'Your long-term vision for cultural connection in London:',
    titlePt: 'A sua visão a longo prazo para conexão cultural em Londres:',
    options: [
      { id: 'portuguese_household', labelEn: 'Maintain fully Portuguese household', labelPt: 'Manter casa totalmente portuguesa', value: 10, emoji: '🏠' },
      { id: 'bilingual_family', labelEn: 'Raise bilingual, bicultural family', labelPt: 'Criar família bilingue e bicultural', value: 8, emoji: '👨‍👩‍👧‍👦' },
      { id: 'cultural_events', labelEn: 'Active in cultural events and community', labelPt: 'Ativo(a) em eventos culturais e comunidade', value: 9, emoji: '🎭' },
      { id: 'selective_traditions', labelEn: 'Keep select traditions, adapt others', labelPt: 'Manter tradições selecionadas, adaptar outras', value: 6, emoji: '🎯' },
      { id: 'fully_british', labelEn: 'Eventually become fully British', labelPt: 'Eventualmente tornar-me totalmente britânico(a)', value: 2, emoji: '🇬🇧' },
    ],
  },

  // Entertainment & Leisure
  {
    id: 'entertainment_preferences',
    type: 'ranking',
    category: 'values',
    weight: 2.0,
    titleEn: 'Rank your preferred weekend activities (drag to reorder):',
    titlePt: 'Classifique as suas atividades preferidas de fim de semana (arraste para reordenar):',
    options: [
      { id: 'portuguese_restaurant', labelEn: 'Portuguese restaurant visits', labelPt: 'Visitas a restaurantes portugueses', value: 0, emoji: '🍽️' },
      { id: 'fado_nights', labelEn: 'Fado nights in London', labelPt: 'Noites de fado em Londres', value: 0, emoji: '🎭' },
      { id: 'football_matches', labelEn: 'Watching Portuguese football', labelPt: 'Ver futebol português', value: 0, emoji: '⚽' },
      { id: 'british_activities', labelEn: 'Traditional British activities', labelPt: 'Atividades tradicionalmente britânicas', value: 0, emoji: '🇬🇧' },
      { id: 'international_mix', labelEn: 'International/multicultural events', labelPt: 'Eventos internacionais/multiculturais', value: 0, emoji: '🌍' },
      { id: 'home_family', labelEn: 'Quiet time at home with family', labelPt: 'Tempo sossegado em casa com família', value: 0, emoji: '🏠' },
    ],
  },

  // Language Preservation
  {
    id: 'language_future',
    type: 'multiple_choice',
    category: 'language',
    weight: 3.0,
    titleEn: 'How important is passing Portuguese to future generations?',
    titlePt: 'Quão importante é transmitir português às futuras gerações?',
    options: [
      { id: 'absolutely_essential', labelEn: 'Absolutely essential - it\'s who we are', labelPt: 'Absolutamente essencial - é quem somos', value: 10, emoji: '👨‍👩‍👧‍👦' },
      { id: 'very_important', labelEn: 'Very important but can be flexible', labelPt: 'Muito importante mas posso ser flexível', value: 8, emoji: '📚' },
      { id: 'somewhat_important', labelEn: 'Somewhat important', labelPt: 'Relativamente importante', value: 6, emoji: '🤔' },
      { id: 'not_priority', labelEn: 'Not a major priority', labelPt: 'Não é uma prioridade major', value: 3, emoji: '🤷' },
      { id: 'english_focus', labelEn: 'Focus should be on English success', labelPt: 'O foco deve ser no sucesso em inglês', value: 1, emoji: '🇬🇧' },
    ],
  },

  // Portuguese Business & Professional Life
  {
    id: 'professional_networking',
    type: 'multiple_choice',
    category: 'community',
    weight: 2.5,
    titleEn: 'In your professional life in London, do you seek Portuguese connections?',
    titlePt: 'Na sua vida profissional em Londres, procura conexões portuguesas?',
    options: [
      { id: 'actively_seek', labelEn: 'Actively seek Portuguese business networks', labelPt: 'Procuro ativamente redes de negócios portuguesas', value: 10, emoji: '🤝' },
      { id: 'open_opportunities', labelEn: 'Open to Portuguese business opportunities', labelPt: 'Aberto(a) a oportunidades de negócio portuguesas', value: 8, emoji: '💼' },
      { id: 'personal_only', labelEn: 'Keep professional and cultural life separate', labelPt: 'Mantenho vida profissional e cultural separadas', value: 4, emoji: '⚖️' },
      { id: 'avoid_mixing', labelEn: 'Prefer not to mix work with heritage', labelPt: 'Prefiro não misturar trabalho com herança', value: 2, emoji: '🚫' },
    ],
  }
];

// Compatibility scoring algorithm
interface CompatibilityProfile {
  food: number;
  music: number;
  traditions: number;
  family: number;
  language: number;
  integration: number;
  community: number;
  values: number;
  holidays: number;
  regional: number;
  overallScore: number;
  culturalStrength: 'Very Strong' | 'Strong' | 'Moderate' | 'Developing' | 'Flexible';
  profileType: string;
  recommendations: string[];
}

interface QuizAnswer {
  questionId: string;
  value: number | number[];
  selectedOptions?: string[];
}

interface QuizProps {
  onComplete: (profile: CompatibilityProfile) => void;
  onClose: () => void;
  currentUserId?: string;
}

export default function PortugueseCulturalCompatibilityQuiz({ onComplete, onClose, currentUserId }: QuizProps) {
  const { language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState(5);
  const [rankingOrder, setRankingOrder] = useState<string[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  // Initialize states when question changes
  useEffect(() => {
    if (currentQuestion) {
      setSelectedOptions([]);
      setSliderValue(currentQuestion.sliderConfig ? Math.ceil((currentQuestion.sliderConfig.min + currentQuestion.sliderConfig.max) / 2) : 5);
      if (currentQuestion.type === 'ranking' && currentQuestion.options) {
        setRankingOrder(currentQuestion.options.map(opt => opt.id));
      }
    }
  }, [currentQuestionIndex]);

  const handleAnswer = () => {
    let answerValue: number | number[];
    let selectedOpts: string[] = [];

    switch (currentQuestion.type) {
      case 'multiple_choice':
        if (selectedOptions.length === 0) return;
        answerValue = selectedOptions.reduce((sum, optId) => {
          const option = currentQuestion.options?.find(opt => opt.id === optId);
          return sum + (option?.value || 0);
        }, 0) / selectedOptions.length;
        selectedOpts = selectedOptions;
        break;
      
      case 'slider':
        answerValue = sliderValue;
        break;
      
      case 'image_selection':
        if (selectedOptions.length === 0) return;
        answerValue = selectedOptions.reduce((sum, optId) => {
          const option = currentQuestion.options?.find(opt => opt.id === optId);
          return sum + (option?.value || 0);
        }, 0) / selectedOptions.length;
        selectedOpts = selectedOptions;
        break;
      
      case 'scenario':
        if (selectedOptions.length === 0) return;
        const selectedOption = currentQuestion.options?.find(opt => opt.id === selectedOptions[0]);
        answerValue = selectedOption?.value || 0;
        selectedOpts = selectedOptions;
        break;
      
      case 'ranking':
        answerValue = rankingOrder.map((optId, index) => (rankingOrder.length - index) * 2);
        selectedOpts = rankingOrder;
        break;
      
      default:
        return;
    }

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      value: answerValue,
      selectedOptions: selectedOpts,
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQuestion.id), newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const profile = calculateCompatibilityProfile(updatedAnswers);
      setIsCompleted(true);
      setShowResults(true);
      onComplete(profile);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateCompatibilityProfile = (quizAnswers: QuizAnswer[]): CompatibilityProfile => {
    const categoryScores: Record<string, { total: number; weight: number }> = {};

    // Calculate weighted scores by category
    quizAnswers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (!question) return;

      const category = question.category;
      if (!categoryScores[category]) {
        categoryScores[category] = { total: 0, weight: 0 };
      }

      let normalizedScore = 0;
      if (Array.isArray(answer.value)) {
        normalizedScore = answer.value.reduce((sum, val) => sum + val, 0) / answer.value.length;
      } else {
        normalizedScore = answer.value;
      }

      categoryScores[category].total += normalizedScore * question.weight;
      categoryScores[category].weight += question.weight;
    });

    // Calculate final scores (0-10 scale)
    const finalScores: Record<string, number> = {};
    Object.keys(categoryScores).forEach(category => {
      const { total, weight } = categoryScores[category];
      finalScores[category] = weight > 0 ? Math.min(10, total / weight) : 0;
    });

    // Calculate overall cultural strength
    const overallScore = Object.values(finalScores).reduce((sum, score) => sum + score, 0) / Object.keys(finalScores).length;

    let culturalStrength: CompatibilityProfile['culturalStrength'];
    if (overallScore >= 8.5) culturalStrength = 'Very Strong';
    else if (overallScore >= 7) culturalStrength = 'Strong';
    else if (overallScore >= 5.5) culturalStrength = 'Moderate';
    else if (overallScore >= 3.5) culturalStrength = 'Developing';
    else culturalStrength = 'Flexible';

    // Determine profile type
    let profileType = '';
    if (finalScores.traditions >= 8 && finalScores.language >= 8) {
      profileType = language === 'pt' ? 'Guardião da Tradição' : 'Tradition Guardian';
    } else if (finalScores.integration >= 7 && finalScores.community >= 7) {
      profileType = language === 'pt' ? 'Ponte Cultural' : 'Cultural Bridge';
    } else if (finalScores.food >= 8 && finalScores.music >= 8) {
      profileType = language === 'pt' ? 'Amante da Cultura' : 'Culture Enthusiast';
    } else if (finalScores.family >= 8) {
      profileType = language === 'pt' ? 'Coração Familiar' : 'Family Heart';
    } else {
      profileType = language === 'pt' ? 'Explorador Cultural' : 'Cultural Explorer';
    }

    // Generate recommendations
    const recommendations = generateRecommendations(finalScores, language);

    return {
      food: finalScores.food || 0,
      music: finalScores.music || 0,
      traditions: finalScores.traditions || 0,
      family: finalScores.family || 0,
      language: finalScores.language || 0,
      integration: finalScores.integration || 0,
      community: finalScores.community || 0,
      values: finalScores.values || 0,
      holidays: finalScores.holidays || 0,
      regional: finalScores.regional || 0,
      overallScore,
      culturalStrength,
      profileType,
      recommendations,
    };
  };

  const generateRecommendations = (scores: Record<string, number>, lang: string): string[] => {
    const recommendations: string[] = [];

    if (scores.food >= 7) {
      recommendations.push(
        lang === 'pt' 
          ? 'Participe em workshops de culinária portuguesa no Borough Market'
          : 'Join Portuguese cooking workshops at Borough Market'
      );
    }

    if (scores.music >= 7) {
      recommendations.push(
        lang === 'pt'
          ? 'Visite noites de fado autênticas em Soho e Kentish Town'
          : 'Visit authentic fado nights in Soho and Kentish Town'
      );
    }

    if (scores.community >= 6) {
      recommendations.push(
        lang === 'pt'
          ? 'Junte-se ao Portuguese Community Centre em Stockwell'
          : 'Join the Portuguese Community Centre in Stockwell'
      );
    }

    if (scores.language >= 7) {
      recommendations.push(
        lang === 'pt'
          ? 'Considere ensinar português a outros membros da comunidade'
          : 'Consider teaching Portuguese to other community members'
      );
    }

    if (scores.traditions >= 8) {
      recommendations.push(
        lang === 'pt'
          ? 'Organize celebrações dos Santos Populares em Londres'
          : 'Organize Santos Populares celebrations in London'
      );
    }

    return recommendations.slice(0, 4); // Return top 4 recommendations
  };

  const handleOptionSelect = (optionId: string, allowMultiple = false) => {
    if (allowMultiple) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const canProceed = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
      case 'image_selection':
      case 'scenario':
        return selectedOptions.length > 0;
      case 'slider':
        return true;
      case 'ranking':
        return rankingOrder.length === currentQuestion.options?.length;
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
      case 'scenario':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedOptions.includes(option.id)
                    ? 'border-primary-500 bg-primary-50 text-primary-900'
                    : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">
                    {language === 'pt' ? option.labelPt : option.labelEn}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'image_selection':
        return (
          <div className="space-y-4">
            <p className="text-sm text-secondary-600 text-center">
              {language === 'pt' ? 'Selecione até 3 opções' : 'Select up to 3 options'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (selectedOptions.includes(option.id)) {
                      setSelectedOptions(prev => prev.filter(id => id !== option.id));
                    } else if (selectedOptions.length < 3) {
                      setSelectedOptions(prev => [...prev, option.id]);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    selectedOptions.includes(option.id)
                      ? 'border-primary-500 bg-primary-50 text-primary-900 scale-95'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                  }`}
                  disabled={!selectedOptions.includes(option.id) && selectedOptions.length >= 3}
                >
                  <div className="text-3xl mb-2">{option.emoji}</div>
                  <div className="text-sm font-medium">
                    {language === 'pt' ? option.labelPt : option.labelEn}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-6">
            <div className="px-4">
              <input
                type="range"
                min={currentQuestion.sliderConfig?.min || 1}
                max={currentQuestion.sliderConfig?.max || 10}
                step={currentQuestion.sliderConfig?.step || 1}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-secondary-600 mt-2">
                <span>
                  {language === 'pt' 
                    ? currentQuestion.sliderConfig?.labelMinPt 
                    : currentQuestion.sliderConfig?.labelMinEn}
                </span>
                <span className="font-bold text-primary-600 text-lg">{sliderValue}</span>
                <span>
                  {language === 'pt' 
                    ? currentQuestion.sliderConfig?.labelMaxPt 
                    : currentQuestion.sliderConfig?.labelMaxEn}
                </span>
              </div>
            </div>
          </div>
        );

      case 'ranking':
        return (
          <div className="space-y-3">
            <p className="text-sm text-secondary-600 text-center">
              {language === 'pt' ? 'Arraste para reordenar (1º = mais importante)' : 'Drag to reorder (1st = most important)'}
            </p>
            {rankingOrder.map((optionId, index) => {
              const option = currentQuestion.options?.find(opt => opt.id === optionId);
              if (!option) return null;
              
              return (
                <div
                  key={optionId}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-move"
                >
                  <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-xl">{option.emoji}</span>
                  <span className="font-medium">
                    {language === 'pt' ? option.labelPt : option.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
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
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              {language === 'pt' ? 'Perfil Cultural Completo!' : 'Cultural Profile Complete!'}
            </h2>
            <p className="text-secondary-600">
              {language === 'pt' 
                ? 'Discover your Portuguese cultural compatibility'
                : 'Discover your Portuguese cultural compatibility'}
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => {
                setShowResults(false);
                onClose();
              }}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
            >
              {language === 'pt' ? 'Ver Matches Compatíveis' : 'View Compatible Matches'}
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-secondary-100 text-secondary-700 py-3 rounded-xl font-medium hover:bg-secondary-200 transition-colors"
            >
              {language === 'pt' ? 'Fechar' : 'Close'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-primary-900">
              {language === 'pt' ? 'Quiz de Compatibilidade Cultural' : 'Cultural Compatibility Quiz'}
            </h2>
            <p className="text-sm text-secondary-600">
              {language === 'pt' 
                ? `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`
                : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-secondary-200 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{currentQuestionIndex + 1}</span>
            </div>
            <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
              {currentQuestion.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'pt' ? currentQuestion.titlePt : currentQuestion.titleEn}
          </h3>
          
          {currentQuestion.descriptionEn && (
            <p className="text-sm text-secondary-600 mb-6">
              {language === 'pt' ? currentQuestion.descriptionPt : currentQuestion.descriptionEn}
            </p>
          )}
        </div>

        {/* Question Content */}
        <div className="mb-8">
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            {language === 'pt' ? 'Anterior' : 'Previous'}
          </button>

          <button
            onClick={handleAnswer}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion
              ? (language === 'pt' ? 'Completar Quiz' : 'Complete Quiz')
              : (language === 'pt' ? 'Próxima' : 'Next')
            }
            {!isLastQuestion && <ChevronRightIcon className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Export types for use in matching algorithm
export type { CompatibilityProfile, QuizAnswer };