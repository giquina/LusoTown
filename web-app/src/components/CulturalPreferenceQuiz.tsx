'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon,
  MapPinIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  TrophyIcon,
  BriefcaseIcon,
  GlobeEuropeAfricaIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  HomeIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  FlagIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface QuizQuestion {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  category: 'origin' | 'language' | 'culture' | 'professional' | 'values' | 'lifestyle'
  title: string
  titlePortuguese: string
  subtitle?: string
  subtitlePortuguese?: string
  icon: any
  color: string
  options?: QuizOption[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { value: number; label: string; labelPortuguese: string }[]
  required?: boolean
}

interface QuizOption {
  value: string
  label: string
  labelPortuguese: string
  description?: string
  descriptionPortuguese?: string
  icon?: any
  emoji?: string
}

interface QuizResults {
  origin: string[]
  languagePreference: string
  culturalCelebrations: string[]
  professionalGoals: string[]
  culturalValues: string[]
  lifestyle: string[]
  compatibilityScore?: number
  matchingInsights?: string[]
}

interface CulturalPreferenceQuizProps {
  onComplete: (results: QuizResults) => void
  onSkip?: () => void
  variant?: 'full' | 'onboarding' | 'matching'
  showProgress?: boolean
}

export default function CulturalPreferenceQuiz({ 
  onComplete, 
  onSkip, 
  variant = 'full',
  showProgress = true 
}: CulturalPreferenceQuizProps) {
  const { language } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const isPortuguese = language === 'pt'

  // Quiz questions with Portuguese cultural context
  const questions: QuizQuestion[] = [
    {
      id: 'origin',
      type: 'multiple',
      category: 'origin',
      title: 'Where do you have Portuguese connections?',
      titlePortuguese: 'Onde tem conexões portuguesas?',
      subtitle: 'Select all that apply - this helps us understand your cultural background',
      subtitlePortuguese: 'Selecione todas as opções - isto ajuda-nos a compreender a sua origem cultural',
      icon: FlagIcon,
      color: 'primary',
      required: true,
      options: [
        { 
          value: 'portugal', 
          label: 'Portugal (Continental)', 
          labelPortuguese: 'Portugal (Continental)',
          emoji: '🇵🇹'
        },
        { 
          value: 'azores', 
          label: 'Azores', 
          labelPortuguese: 'Açores',
          emoji: '🏝️'
        },
        { 
          value: 'madeira', 
          label: 'Madeira', 
          labelPortuguese: 'Madeira',
          emoji: '🌺'
        },
        { 
          value: 'brazil', 
          label: 'Brazil', 
          labelPortuguese: 'Brasil',
          emoji: '🇧🇷'
        },
        { 
          value: 'angola', 
          label: 'Angola', 
          labelPortuguese: 'Angola',
          emoji: '🇦🇴'
        },
        { 
          value: 'mozambique', 
          label: 'Mozambique', 
          labelPortuguese: 'Moçambique',
          emoji: '🇲🇿'
        },
        { 
          value: 'cape_verde', 
          label: 'Cape Verde', 
          labelPortuguese: 'Cabo Verde',
          emoji: '🇨🇻'
        },
        { 
          value: 'guinea_bissau', 
          label: 'Guinea-Bissau', 
          labelPortuguese: 'Guiné-Bissau',
          emoji: '🇬🇼'
        },
        { 
          value: 'sao_tome', 
          label: 'São Tomé and Príncipe', 
          labelPortuguese: 'São Tomé e Príncipe',
          emoji: '🇸🇹'
        },
        { 
          value: 'timor_leste', 
          label: 'Timor-Leste', 
          labelPortuguese: 'Timor-Leste',
          emoji: '🇹🇱'
        },
        { 
          value: 'macau', 
          label: 'Macau', 
          labelPortuguese: 'Macau',
          emoji: '🇲🇴'
        },
        { 
          value: 'diaspora', 
          label: 'Portuguese Diaspora (other countries)', 
          labelPortuguese: 'Diáspora Portuguesa (outros países)',
          emoji: '🌍'
        }
      ]
    },
    {
      id: 'language_preference',
      type: 'single',
      category: 'language',
      title: 'What\'s your language preference?',
      titlePortuguese: 'Qual é a sua preferência de idioma?',
      subtitle: 'This helps us match you with people who communicate the way you do',
      subtitlePortuguese: 'Isto ajuda-nos a conectá-lo com pessoas que comunicam da mesma forma',
      icon: ChatBubbleLeftRightIcon,
      color: 'secondary',
      required: true,
      options: [
        { 
          value: 'portuguese_first', 
          label: 'Portuguese first, English when needed', 
          labelPortuguese: 'Português primeiro, inglês quando necessário',
          description: 'You prefer speaking Portuguese but can switch to English',
          descriptionPortuguese: 'Prefere falar português mas pode mudar para inglês'
        },
        { 
          value: 'bilingual', 
          label: 'Equally comfortable in both languages', 
          labelPortuguese: 'Igualmente confortável em ambos os idiomas',
          description: 'You switch between Portuguese and English naturally',
          descriptionPortuguese: 'Alterna entre português e inglês naturalmente'
        },
        { 
          value: 'english_comfortable', 
          label: 'English comfortable, Portuguese for cultural connection', 
          labelPortuguese: 'Confortável em inglês, português para conexão cultural',
          description: 'You prefer English but love Portuguese cultural moments',
          descriptionPortuguese: 'Prefere inglês mas adora momentos culturais portugueses'
        },
        { 
          value: 'learning', 
          label: 'Learning Portuguese, embracing the culture', 
          labelPortuguese: 'A aprender português, abraçando a cultura',
          description: 'You\'re passionate about Portuguese culture and language',
          descriptionPortuguese: 'É apaixonado pela cultura e língua portuguesa'
        }
      ]
    },
    {
      id: 'cultural_celebrations',
      type: 'multiple',
      category: 'culture',
      title: 'Which Portuguese cultural elements resonate with you?',
      titlePortuguese: 'Que elementos culturais portugueses ressoam consigo?',
      subtitle: 'Select the traditions and celebrations that feel meaningful to you',
      subtitlePortuguese: 'Selecione as tradições e celebrações que são significativas para si',
      icon: MusicalNoteIcon,
      color: 'coral',
      required: true,
      options: [
        { 
          value: 'fado', 
          label: 'Fado Music', 
          labelPortuguese: 'Música de Fado',
          description: 'The soulful Portuguese musical expression',
          descriptionPortuguese: 'A expressão musical portuguesa cheia de alma',
          emoji: '🎵'
        },
        { 
          value: 'santos_populares', 
          label: 'Santos Populares (June Festivals)', 
          labelPortuguese: 'Santos Populares',
          description: 'Traditional Portuguese summer celebrations',
          descriptionPortuguese: 'Celebrações tradicionais portuguesas de verão',
          emoji: '🎉'
        },
        { 
          value: 'football', 
          label: 'Portuguese Football', 
          labelPortuguese: 'Futebol Português',
          description: 'Supporting Portugal and Portuguese clubs',
          descriptionPortuguese: 'Apoiar Portugal e clubes portugueses',
          emoji: '⚽'
        },
        { 
          value: 'gastronomy', 
          label: 'Portuguese Cuisine', 
          labelPortuguese: 'Gastronomia Portuguesa',
          description: 'Pastéis de nata, bacalhau, and traditional dishes',
          descriptionPortuguese: 'Pastéis de nata, bacalhau e pratos tradicionais',
          emoji: '🧁'
        },
        { 
          value: 'christmas_traditions', 
          label: 'Portuguese Christmas (December 24th)', 
          labelPortuguese: 'Natal Português (24 de Dezembro)',
          description: 'Celebrating Christmas Eve as the main event',
          descriptionPortuguese: 'Celebrar a Consoada como evento principal',
          emoji: '🎄'
        },
        { 
          value: 'literature_poetry', 
          label: 'Portuguese Literature & Poetry', 
          labelPortuguese: 'Literatura e Poesia Portuguesa',
          description: 'Camões, Pessoa, and Portuguese literary tradition',
          descriptionPortuguese: 'Camões, Pessoa e tradição literária portuguesa',
          emoji: '📚'
        },
        { 
          value: 'religious_traditions', 
          label: 'Religious Traditions & Pilgrimages', 
          labelPortuguese: 'Tradições Religiosas e Romarias',
          description: 'Fátima, local saints, and spiritual practices',
          descriptionPortuguese: 'Fátima, santos locais e práticas espirituais',
          emoji: '⛪'
        },
        { 
          value: 'maritime_heritage', 
          label: 'Maritime Heritage & Discoveries', 
          labelPortuguese: 'Património Marítimo e Descobrimentos',
          description: 'Portuguese exploration and naval history',
          descriptionPortuguese: 'Exploração portuguesa e história naval',
          emoji: '⛵'
        },
        { 
          value: 'folk_traditions', 
          label: 'Folk Music & Regional Dances', 
          labelPortuguese: 'Música Folclórica e Danças Regionais',
          description: 'Traditional dances and regional music',
          descriptionPortuguese: 'Danças tradicionais e música regional',
          emoji: '💃'
        },
        { 
          value: 'crafts_arts', 
          label: 'Traditional Crafts & Arts', 
          labelPortuguese: 'Artesanato e Artes Tradicionais',
          description: 'Azulejos, ceramics, and traditional crafts',
          descriptionPortuguese: 'Azulejos, cerâmica e artesanato tradicional',
          emoji: '🎨'
        }
      ]
    },
    {
      id: 'professional_networking',
      type: 'multiple',
      category: 'professional',
      title: 'What are your professional networking goals?',
      titlePortuguese: 'Quais são os seus objetivos de networking profissional?',
      subtitle: 'Help us connect you with the right Portuguese professionals',
      subtitlePortuguese: 'Ajude-nos a conectá-lo com os profissionais portugueses certos',
      icon: BriefcaseIcon,
      color: 'premium',
      options: [
        { 
          value: 'business_partnerships', 
          label: 'Business Partnerships & Collaborations', 
          labelPortuguese: 'Parcerias Empresariais e Colaborações',
          description: 'Find business partners within the Portuguese community',
          descriptionPortuguese: 'Encontrar parceiros de negócio na comunidade portuguesa'
        },
        { 
          value: 'career_mentorship', 
          label: 'Career Mentorship & Guidance', 
          labelPortuguese: 'Mentoria e Orientação de Carreira',
          description: 'Connect with experienced Portuguese professionals',
          descriptionPortuguese: 'Conectar com profissionais portugueses experientes'
        },
        { 
          value: 'industry_connections', 
          label: 'Industry-Specific Connections', 
          labelPortuguese: 'Conexões Específicas do Setor',
          description: 'Network within your professional field',
          descriptionPortuguese: 'Fazer networking na sua área profissional'
        },
        { 
          value: 'startup_ecosystem', 
          label: 'Portuguese Startup Ecosystem', 
          labelPortuguese: 'Ecossistema de Startups Português',
          description: 'Connect with Portuguese entrepreneurs and investors',
          descriptionPortuguese: 'Conectar com empreendedores e investidores portugueses'
        },
        { 
          value: 'freelance_opportunities', 
          label: 'Freelance & Project Opportunities', 
          labelPortuguese: 'Oportunidades Freelance e Projetos',
          description: 'Find work opportunities within the community',
          descriptionPortuguese: 'Encontrar oportunidades de trabalho na comunidade'
        },
        { 
          value: 'portugal_uk_bridge', 
          label: 'Portugal-UK Business Bridge', 
          labelPortuguese: 'Ponte Empresarial Portugal-Reino Unido',
          description: 'Facilitate business between Portugal and UK',
          descriptionPortuguese: 'Facilitar negócios entre Portugal e Reino Unido'
        },
        { 
          value: 'social_only', 
          label: 'Purely Social - No Professional Goals', 
          labelPortuguese: 'Puramente Social - Sem Objetivos Profissionais',
          description: 'Just here for cultural and social connections',
          descriptionPortuguese: 'Apenas aqui para conexões culturais e sociais'
        }
      ]
    },
    {
      id: 'cultural_values',
      type: 'scale',
      category: 'values',
      title: 'How important are these values to you?',
      titlePortuguese: 'Qual a importância destes valores para si?',
      subtitle: 'Rate each value from 1 (not important) to 5 (very important)',
      subtitlePortuguese: 'Avalie cada valor de 1 (pouco importante) a 5 (muito importante)',
      icon: HeartIcon,
      color: 'accent',
      scaleMin: 1,
      scaleMax: 5,
      options: [
        { 
          value: 'family_first', 
          label: 'Family comes first (Família em primeiro)', 
          labelPortuguese: 'Família em primeiro lugar'
        },
        { 
          value: 'hospitality', 
          label: 'Hospitality & Warmth (Hospitalidade)', 
          labelPortuguese: 'Hospitalidade e Carinho'
        },
        { 
          value: 'respect_elders', 
          label: 'Respect for Elders & Tradition', 
          labelPortuguese: 'Respeito pelos Mais Velhos e Tradição'
        },
        { 
          value: 'community_support', 
          label: 'Community Support & Solidarity', 
          labelPortuguese: 'Apoio Comunitário e Solidariedade'
        },
        { 
          value: 'work_life_balance', 
          label: 'Work-Life Balance', 
          labelPortuguese: 'Equilíbrio Trabalho-Vida'
        },
        { 
          value: 'education_achievement', 
          label: 'Education & Achievement', 
          labelPortuguese: 'Educação e Conquistas'
        },
        { 
          value: 'cultural_preservation', 
          label: 'Preserving Portuguese Culture', 
          labelPortuguese: 'Preservar a Cultura Portuguesa'
        }
      ]
    },
    {
      id: 'lifestyle_preferences',
      type: 'multiple',
      category: 'lifestyle',
      title: 'What describes your lifestyle in London?',
      titlePortuguese: 'O que descreve o seu estilo de vida em Londres?',
      subtitle: 'This helps us match you with people who share similar lifestyles',
      subtitlePortuguese: 'Isto ajuda-nos a conectá-lo com pessoas com estilos de vida similares',
      icon: HomeIcon,
      color: 'neutral',
      options: [
        { 
          value: 'young_professional', 
          label: 'Young Professional', 
          labelPortuguese: 'Jovem Profissional',
          description: 'Building career, active social life, exploring London',
          descriptionPortuguese: 'Construindo carreira, vida social ativa, explorando Londres'
        },
        { 
          value: 'family_oriented', 
          label: 'Family-Oriented', 
          labelPortuguese: 'Orientado para a Família',
          description: 'Family activities, children\'s events, community involvement',
          descriptionPortuguese: 'Atividades familiares, eventos para crianças, envolvimento comunitário'
        },
        { 
          value: 'student_life', 
          label: 'Student Life', 
          labelPortuguese: 'Vida de Estudante',
          description: 'University studies, student events, budget-conscious',
          descriptionPortuguese: 'Estudos universitários, eventos estudantis, consciente do orçamento'
        },
        { 
          value: 'entrepreneur', 
          label: 'Entrepreneur/Business Owner', 
          labelPortuguese: 'Empreendedor/Dono de Negócio',
          description: 'Running business, networking focus, time flexibility',
          descriptionPortuguese: 'Gerir negócio, foco em networking, flexibilidade de tempo'
        },
        { 
          value: 'recent_arrival', 
          label: 'Recent Arrival to UK', 
          labelPortuguese: 'Chegada Recente ao Reino Unido',
          description: 'Learning about London, seeking guidance and connections',
          descriptionPortuguese: 'A conhecer Londres, procurando orientação e conexões'
        },
        { 
          value: 'established_resident', 
          label: 'Established UK Resident', 
          labelPortuguese: 'Residente Estabelecido no Reino Unido',
          description: 'Years in UK, willing to help newcomers, cultural ambassador',
          descriptionPortuguese: 'Anos no Reino Unido, disposto a ajudar recém-chegados, embaixador cultural'
        },
        { 
          value: 'cultural_enthusiast', 
          label: 'Cultural Enthusiast', 
          labelPortuguese: 'Entusiasta Cultural',
          description: 'Loves Portuguese events, cultural activities, traditions',
          descriptionPortuguese: 'Adora eventos portugueses, atividades culturais, tradições'
        },
        { 
          value: 'social_butterfly', 
          label: 'Social Butterfly', 
          labelPortuguese: 'Borboleta Social',
          description: 'Loves meeting people, parties, social gatherings',
          descriptionPortuguese: 'Adora conhecer pessoas, festas, encontros sociais'
        }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      // Calculate results and complete quiz
      completeQuiz()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const completeQuiz = () => {
    // Calculate compatibility insights
    const results: QuizResults = {
      origin: answers.origin || [],
      languagePreference: answers.language_preference || '',
      culturalCelebrations: answers.cultural_celebrations || [],
      professionalGoals: answers.professional_networking || [],
      culturalValues: Object.keys(answers.cultural_values || {}).map(key => 
        `${key}:${answers.cultural_values[key]}`
      ),
      lifestyle: answers.lifestyle_preferences || [],
      compatibilityScore: calculateCompatibilityScore(),
      matchingInsights: generateMatchingInsights()
    }

    setShowResults(true)
    
    // Call completion callback after showing results
    setTimeout(() => {
      onComplete(results)
    }, 3000)
  }

  const calculateCompatibilityScore = (): number => {
    // Simple scoring based on completeness and cultural depth
    let score = 60 // Base score
    
    if (answers.origin?.length > 0) score += 10
    if (answers.cultural_celebrations?.length >= 3) score += 15
    if (answers.professional_networking?.length > 0) score += 10
    if (answers.lifestyle_preferences?.length >= 2) score += 5
    
    return Math.min(score, 95) // Cap at 95%
  }

  const generateMatchingInsights = (): string[] => {
    const insights: string[] = []
    
    if (answers.origin?.includes('portugal')) {
      insights.push(isPortuguese ? 
        'Conexão forte com Portugal continental' : 
        'Strong connection to mainland Portugal'
      )
    }
    
    if (answers.cultural_celebrations?.includes('fado')) {
      insights.push(isPortuguese ? 
        'Aprecia a alma do Fado' : 
        'Appreciates the soul of Fado'
      )
    }
    
    if (answers.language_preference === 'bilingual') {
      insights.push(isPortuguese ? 
        'Comunicador bilíngue fluente' : 
        'Fluent bilingual communicator'
      )
    }
    
    return insights
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isAnswered = answers[currentQ.id] !== undefined
  const canProceed = !currentQ.required || isAnswered

  if (showResults) {
    const compatibilityScore = calculateCompatibilityScore()
    const insights = generateMatchingInsights()
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SparklesIcon className="w-10 h-10 text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            {isPortuguese ? 'Perfil Cultural Completo!' : 'Cultural Profile Complete!'}
          </h3>
          
          <p className="text-neutral-600 mb-6">
            {isPortuguese ? 
              'Agora podemos conectá-lo com portugueses compatíveis' :
              'Now we can connect you with compatible Portuguese speakers'
            }
          </p>
          
          <div className="bg-gradient-to-r from-coral-50 to-accent-50 rounded-xl p-4 mb-6">
            <div className="text-3xl font-bold text-coral-600 mb-2">
              {compatibilityScore}%
            </div>
            <p className="text-sm text-neutral-700">
              {isPortuguese ? 'Pontuação de Compatibilidade' : 'Compatibility Score'}
            </p>
          </div>
          
          {insights.length > 0 && (
            <div className="text-left mb-6">
              <h4 className="font-semibold text-neutral-900 mb-3">
                {isPortuguese ? 'Os Seus Destaques Culturais:' : 'Your Cultural Highlights:'}
              </h4>
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <CheckCircleIcon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">{insight}</span>
                </motion.div>
              ))}
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-neutral-500"
          >
            {isPortuguese ? 
              'A preparar as suas recomendações personalizadas...' :
              'Preparing your personalized recommendations...'
            }
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900">
              {isPortuguese ? 'Quiz de Preferências Culturais' : 'Cultural Preference Quiz'}
            </h2>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                {isPortuguese ? 'Saltar' : 'Skip'}
              </button>
            )}
          </div>
          
          {showProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>
                  {isPortuguese ? 'Pergunta' : 'Question'} {currentQuestion + 1} {isPortuguese ? 'de' : 'of'} {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${currentQ.color}-100 mb-4`}>
                <currentQ.icon className={`w-8 h-8 text-${currentQ.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {isPortuguese ? currentQ.titlePortuguese : currentQ.title}
              </h3>
              {currentQ.subtitle && (
                <p className="text-neutral-600">
                  {isPortuguese ? currentQ.subtitlePortuguese : currentQ.subtitle}
                </p>
              )}
            </div>

            {/* Question Input */}
            <div className="space-y-4">
              {currentQ.type === 'single' && currentQ.options?.map((option) => (
                <motion.label
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers[currentQ.id] === option.value
                      ? `border-${currentQ.color}-500 bg-${currentQ.color}-50`
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option.value}
                    checked={answers[currentQ.id] === option.value}
                    onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    {option.emoji && (
                      <span className="text-2xl">{option.emoji}</span>
                    )}
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {isPortuguese ? option.labelPortuguese : option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-neutral-600 mt-1">
                          {isPortuguese ? option.descriptionPortuguese : option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.label>
              ))}

              {currentQ.type === 'multiple' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options?.map((option) => (
                    <motion.label
                      key={option.value}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[currentQ.id]?.includes(option.value)
                          ? `border-${currentQ.color}-500 bg-${currentQ.color}-50`
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={answers[currentQ.id]?.includes(option.value) || false}
                        onChange={(e) => {
                          const currentValues = answers[currentQ.id] || []
                          const newValues = e.target.checked
                            ? [...currentValues, option.value]
                            : currentValues.filter((v: string) => v !== option.value)
                          handleAnswer(currentQ.id, newValues)
                        }}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        {option.emoji && (
                          <span className="text-lg">{option.emoji}</span>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-sm text-neutral-900">
                            {isPortuguese ? option.labelPortuguese : option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-neutral-600 mt-1">
                              {isPortuguese ? option.descriptionPortuguese : option.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              )}

              {currentQ.type === 'scale' && (
                <div className="space-y-4">
                  {currentQ.options?.map((option) => (
                    <div key={option.value} className="bg-neutral-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-neutral-900">
                          {isPortuguese ? option.labelPortuguese : option.label}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          answers.cultural_values?.[option.value] 
                            ? `bg-${currentQ.color}-100 text-${currentQ.color}-700`
                            : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {answers.cultural_values?.[option.value] || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">
                          {isPortuguese ? 'Pouco importante' : 'Not important'}
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              onClick={() => {
                                const newValues = {
                                  ...answers.cultural_values,
                                  [option.value]: value
                                }
                                handleAnswer('cultural_values', newValues)
                              }}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                answers.cultural_values?.[option.value] >= value
                                  ? `bg-${currentQ.color}-500 border-${currentQ.color}-500`
                                  : `border-neutral-300 hover:border-${currentQ.color}-400`
                              }`}
                            >
                              {answers.cultural_values?.[option.value] >= value && (
                                <span className="text-white text-xs font-bold">{value}</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <span className="text-xs text-neutral-500">
                          {isPortuguese ? 'Muito importante' : 'Very important'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-100 p-6 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              {isPortuguese ? 'Anterior' : 'Previous'}
            </button>
            
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentQuestion
                      ? `bg-${currentQ.color}-500`
                      : index < currentQuestion
                      ? `bg-${currentQ.color}-300`
                      : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextQuestion}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
                canProceed
                  ? `bg-${currentQ.color}-600 text-white hover:bg-${currentQ.color}-700`
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? (
                isPortuguese ? 'Finalizar' : 'Complete'
              ) : (
                isPortuguese ? 'Próxima' : 'Next'
              )}
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}