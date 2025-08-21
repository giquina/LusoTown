'use client'

/**
 * CulturalPersonalityAssessment.tsx
 * Portuguese Cultural Psychology Assessment
 * 
 * Comprehensive psychological assessment tool designed specifically for
 * Portuguese speakers, analyzing cultural personality dimensions,
 * adaptation patterns, and providing personalized cultural insights.
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  HeartIcon,
  UserGroupIcon,
  HomeIcon,
  GlobeEuropeAfricaIcon,
  MusicalNoteIcon,
  BookOpenIcon,
  FaceSmileIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PuzzlePieceIcon,
  EyeIcon,
  SparklesIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

// Cultural Personality Dimensions
interface CulturalPersonalityProfile {
  // Core Portuguese Cultural Dimensions
  familyCentricity: number        // 0-10: Individual vs Family-oriented
  collectivismScore: number       // 0-10: Individual vs Community-focused
  traditionAdherence: number      // 0-10: Modern vs Traditional values
  hierarchyRespect: number        // 0-10: Egalitarian vs Hierarchy-respecting
  hospitalityValue: number        // 0-10: Reserved vs Hospitable
  religiousOrientation: number    // 0-10: Secular vs Religious
  
  // Portuguese Emotional Psychology
  saudadeCapacity: number         // 0-10: Ability to experience deep longing
  emotionalExpressiveness: number // 0-10: Reserved vs Emotionally expressive
  nostalgiaIntensity: number      // 0-10: Forward-looking vs Nostalgic
  melancholyAcceptance: number    // 0-10: Joy-seeking vs Melancholy-accepting
  passionIntensity: number        // 0-10: Measured vs Passionate
  
  // Cultural Adaptation Patterns
  culturalFlexibility: number     // 0-10: Rigid vs Adaptable culturally
  identityIntegration: number     // 0-10: Compartmentalized vs Integrated identity
  languageLoyalty: number         // 0-10: Language-flexible vs Portuguese-loyal
  culturalPride: number           // 0-10: Modest vs Proudly Portuguese
  diasporaComfort: number         // 0-10: Homesick vs Comfortable in diaspora
  
  // Social and Communication Styles
  communicationDirectness: number // 0-10: Indirect vs Direct communication
  conflictAvoidance: number       // 0-10: Confrontational vs Conflict-avoiding
  socialWarmth: number            // 0-10: Formal vs Warm in social settings
  groupHarmony: number            // 0-10: Individual expression vs Group harmony
  authorityRelation: number       // 0-10: Questioning vs Respectful of authority
  
  // Portuguese-Specific Cultural Markers
  fadoResonance: number           // 0-10: Connection to fado music/emotion
  foodCulturalSignificance: number // 0-10: Functional vs Culturally significant food
  celebrationStyle: number        // 0-10: Minimalist vs Elaborate celebrations
  storytellingValue: number       // 0-10: Present-focused vs Story/history-focused
  landscapeConnection: number     // 0-10: Urban-adapted vs Landscape-connected
}

interface AssessmentQuestion {
  id: string
  dimension: keyof CulturalPersonalityProfile
  questionEn: string
  questionPt: string
  contextEn: string
  contextPt: string
  scenarioEn?: string
  scenarioPt?: string
  responseType: 'scale' | 'scenario' | 'preference'
  culturalWeight: number // How important this dimension is for Portuguese identity
}

interface PersonalityInsight {
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  culturalContext: string
  strengthLevel: 'low' | 'moderate' | 'high' | 'very_high'
  developmentSuggestions: string[]
  culturalActivities: string[]
  compatibilityImplications: string[]
}

interface CulturalArchetype {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  characteristics: string[]
  strengthsEn: string[]
  strengthsPt: string[]
  challengesEn: string[]
  challengesPt: string[]
  recommendedActivities: string[]
  compatibleArchetypes: string[]
  prevalenceInDiaspora: number
  culturalSignificance: string
}

const CULTURAL_ARCHETYPES: CulturalArchetype[] = [
  {
    id: 'saudoso_tradicional',
    nameEn: 'Traditional Nostalgic',
    namePt: 'Saudoso Tradicional',
    descriptionEn: 'Deeply connected to Portuguese traditions with intense saudade for homeland',
    descriptionPt: 'Profundamente ligado às tradições portuguesas com saudade intensa da pátria',
    characteristics: ['High saudade capacity', 'Strong tradition adherence', 'Deep family centricity'],
    strengthsEn: ['Cultural preservation', 'Emotional authenticity', 'Strong community bonds'],
    strengthsPt: ['Preservação cultural', 'Autenticidade emocional', 'Laços comunitários fortes'],
    challengesEn: ['Adaptation difficulty', 'Potential isolation', 'Resistance to change'],
    challengesPt: ['Dificuldade de adaptação', 'Potencial isolamento', 'Resistência à mudança'],
    recommendedActivities: ['Fado sessions', 'Traditional cooking', 'Cultural storytelling'],
    compatibleArchetypes: ['cultural_bridge_builder', 'community_guardian'],
    prevalenceInDiaspora: 25,
    culturalSignificance: 'Guardians of Portuguese cultural authenticity'
  },
  {
    id: 'ponte_cultural',
    nameEn: 'Cultural Bridge Builder',
    namePt: 'Construtor de Pontes Culturais',
    descriptionEn: 'Balances Portuguese heritage with British integration seamlessly',
    descriptionPt: 'Equilibra herança portuguesa com integração britânica harmoniosamente',
    characteristics: ['High cultural flexibility', 'Strong identity integration', 'Moderate saudade'],
    strengthsEn: ['Cross-cultural communication', 'Adaptive resilience', 'Community building'],
    strengthsPt: ['Comunicação intercultural', 'Resistência adaptativa', 'Construção comunitária'],
    challengesEn: ['Identity confusion periods', 'Cultural authenticity questions', 'Balancing demands'],
    challengesPt: ['Períodos de confusão identitária', 'Questões de autenticidade cultural', 'Equilibrar exigências'],
    recommendedActivities: ['Bilingual events', 'Cultural workshops', 'Mentorship programs'],
    compatibleArchetypes: ['modern_portuguese', 'community_guardian'],
    prevalenceInDiaspora: 35,
    culturalSignificance: 'Facilitators of cultural evolution and adaptation'
  },
  {
    id: 'português_moderno',
    nameEn: 'Modern Portuguese',
    namePt: 'Português Moderno',
    descriptionEn: 'Contemporary Portuguese identity with selective cultural maintenance',
    descriptionPt: 'Identidade portuguesa contemporânea com manutenção cultural seletiva',
    characteristics: ['Low tradition adherence', 'High diaspora comfort', 'Moderate cultural pride'],
    strengthsEn: ['Innovation mindset', 'Professional adaptability', 'Global perspective'],
    strengthsPt: ['Mentalidade inovadora', 'Adaptabilidade profissional', 'Perspetiva global'],
    challengesEn: ['Cultural disconnect risk', 'Generational tensions', 'Identity grounding'],
    challengesPt: ['Risco de desconexão cultural', 'Tensões geracionais', 'Ancoragem identitária'],
    recommendedActivities: ['Modern Portuguese events', 'Professional networking', 'Cultural fusion activities'],
    compatibleArchetypes: ['cultural_bridge_builder', 'pragmatic_integrator'],
    prevalenceInDiaspora: 30,
    culturalSignificance: 'Innovators of Portuguese cultural expression'
  },
  {
    id: 'guardião_comunidade',
    nameEn: 'Community Guardian',
    namePt: 'Guardião da Comunidade',
    descriptionEn: 'Dedicated to preserving and nurturing Portuguese community bonds',
    descriptionPt: 'Dedicado a preservar e nutrir os laços da comunidade portuguesa',
    characteristics: ['High collectivism', 'Strong group harmony', 'Deep hospitality values'],
    strengthsEn: ['Community organization', 'Cultural transmission', 'Social cohesion'],
    strengthsPt: ['Organização comunitária', 'Transmissão cultural', 'Coesão social'],
    challengesEn: ['Personal boundaries', 'Burnout risk', 'Conflict avoidance'],
    challengesPt: ['Limites pessoais', 'Risco de esgotamento', 'Evitamento de conflitos'],
    recommendedActivities: ['Community leadership', 'Event organization', 'Cultural education'],
    compatibleArchetypes: ['traditional_nostalgic', 'cultural_bridge_builder'],
    prevalenceInDiaspora: 10,
    culturalSignificance: 'Pillars of Portuguese community structure'
  }
]

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'family_centricity_1',
    dimension: 'familyCentricity',
    questionEn: 'How important is family input in your major life decisions?',
    questionPt: 'Quão importante é a opinião da família nas suas decisões importantes de vida?',
    contextEn: 'Think about career moves, relationships, or major purchases',
    contextPt: 'Pense em mudanças de carreira, relacionamentos ou compras importantes',
    responseType: 'scale',
    culturalWeight: 0.9
  },
  {
    id: 'saudade_capacity_1',
    dimension: 'saudadeCapacity',
    questionEn: 'How deeply do you experience saudade for Portugal?',
    questionPt: 'Quão profundamente sente saudade de Portugal?',
    contextEn: 'Saudade is that uniquely Portuguese feeling of deep longing',
    contextPt: 'Saudade é esse sentimento unicamente português de nostalgia profunda',
    responseType: 'scale',
    culturalWeight: 1.0
  },
  {
    id: 'tradition_adherence_1',
    dimension: 'traditionAdherence',
    questionEn: 'How important is maintaining Portuguese traditions in your daily life?',
    questionPt: 'Quão importante é manter tradições portuguesas na sua vida diária?',
    contextEn: 'Consider food customs, celebrations, and social practices',
    contextPt: 'Considere costumes alimentares, celebrações e práticas sociais',
    responseType: 'scale',
    culturalWeight: 0.85
  },
  {
    id: 'fado_resonance_1',
    dimension: 'fadoResonance',
    questionEn: 'How much does fado music move you emotionally?',
    questionPt: 'Quanto a música do fado o emociona?',
    contextEn: 'Think about your emotional response to fado melodies and lyrics',
    contextPt: 'Pense na sua resposta emocional às melodias e letras do fado',
    responseType: 'scale',
    culturalWeight: 0.8
  },
  {
    id: 'hospitality_scenario',
    dimension: 'hospitalityValue',
    questionEn: 'A friend visits unexpectedly. What do you do?',
    questionPt: 'Um amigo visita-o inesperadamente. O que faz?',
    scenarioEn: 'A) Apologize that you\'re not prepared\nB) Quickly prepare something to offer\nC) Insist they stay for a meal\nD) Drop everything to make them feel at home',
    scenarioPt: 'A) Desculpa-se por não estar preparado\nB) Prepara rapidamente algo para oferecer\nC) Insiste para ficarem para uma refeição\nD) Deixa tudo para os fazer sentir em casa',
    responseType: 'scenario',
    culturalWeight: 0.9
  },
  {
    id: 'cultural_flexibility_1',
    dimension: 'culturalFlexibility',
    questionEn: 'How comfortable are you adapting Portuguese ways to British contexts?',
    questionPt: 'Quão confortável se sente adaptando costumes portugueses a contextos britânicos?',
    contextEn: 'Consider work situations, social settings, or child-rearing approaches',
    contextPt: 'Considere situações profissionais, contextos sociais ou abordagens educacionais',
    responseType: 'scale',
    culturalWeight: 0.7
  },
  {
    id: 'emotional_expressiveness_1',
    dimension: 'emotionalExpressiveness',
    questionEn: 'How openly do you express emotions in social situations?',
    questionPt: 'Quão abertamente expressa emoções em situações sociais?',
    contextEn: 'Think about showing joy, sadness, frustration, or love publicly',
    contextPt: 'Pense em mostrar alegria, tristeza, frustração ou amor publicamente',
    responseType: 'scale',
    culturalWeight: 0.75
  },
  {
    id: 'language_loyalty_1',
    dimension: 'languageLoyalty',
    questionEn: 'How important is speaking Portuguese with other Portuguese speakers?',
    questionPt: 'Quão importante é falar português com outros falantes de português?',
    contextEn: 'Even when English might be easier or more convenient',
    contextPt: 'Mesmo quando inglês seria mais fácil ou conveniente',
    responseType: 'scale',
    culturalWeight: 0.8
  },
  {
    id: 'food_cultural_significance_1',
    dimension: 'foodCulturalSignificance',
    questionEn: 'How important is Portuguese food for maintaining your cultural identity?',
    questionPt: 'Quão importante é a comida portuguesa para manter a sua identidade cultural?',
    contextEn: 'Consider traditional recipes, ingredients, and meal customs',
    contextPt: 'Considere receitas tradicionais, ingredientes e costumes alimentares',
    responseType: 'scale',
    culturalWeight: 0.85
  },
  {
    id: 'diaspora_comfort_1',
    dimension: 'diasporaComfort',
    questionEn: 'How at home do you feel living in London versus Portugal?',
    questionPt: 'Quão em casa se sente vivendo em Londres versus Portugal?',
    contextEn: 'Consider social connections, cultural comfort, and daily life ease',
    contextPt: 'Considere conexões sociais, conforto cultural e facilidade da vida diária',
    responseType: 'scale',
    culturalWeight: 0.9
  }
]

export default function CulturalPersonalityAssessment() {
  const { t, language } = useLanguage()
  
  // Assessment State
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [personalityProfile, setPersonalityProfile] = useState<CulturalPersonalityProfile | null>(null)
  const [culturalArchetype, setCulturalArchetype] = useState<CulturalArchetype | null>(null)
  const [personalityInsights, setPersonalityInsights] = useState<PersonalityInsight[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate personality profile from responses
  const calculatePersonalityProfile = (): CulturalPersonalityProfile => {
    const profile: CulturalPersonalityProfile = {
      familyCentricity: responses['family_centricity_1'] || 5,
      collectivismScore: 5, // Would be calculated from multiple questions
      traditionAdherence: responses['tradition_adherence_1'] || 5,
      hierarchyRespect: 5,
      hospitalityValue: responses['hospitality_scenario'] || 5,
      religiousOrientation: 5,
      saudadeCapacity: responses['saudade_capacity_1'] || 5,
      emotionalExpressiveness: responses['emotional_expressiveness_1'] || 5,
      nostalgiaIntensity: 5,
      melancholyAcceptance: 5,
      passionIntensity: 5,
      culturalFlexibility: responses['cultural_flexibility_1'] || 5,
      identityIntegration: 5,
      languageLoyalty: responses['language_loyalty_1'] || 5,
      culturalPride: 5,
      diasporaComfort: responses['diaspora_comfort_1'] || 5,
      communicationDirectness: 5,
      conflictAvoidance: 5,
      socialWarmth: 5,
      groupHarmony: 5,
      authorityRelation: 5,
      fadoResonance: responses['fado_resonance_1'] || 5,
      foodCulturalSignificance: responses['food_cultural_significance_1'] || 5,
      celebrationStyle: 5,
      storytellingValue: 5,
      landscapeConnection: 5
    }
    
    return profile
  }

  // Determine cultural archetype based on personality profile
  const determineCulturalArchetype = (profile: CulturalPersonalityProfile): CulturalArchetype => {
    // Traditional Nostalgic: High saudade + high tradition + high family centricity
    if (profile.saudadeCapacity >= 7 && profile.traditionAdherence >= 7 && profile.familyCentricity >= 7) {
      return CULTURAL_ARCHETYPES.find(a => a.id === 'saudoso_tradicional')!
    }
    
    // Cultural Bridge Builder: High flexibility + moderate saudade + high integration
    if (profile.culturalFlexibility >= 7 && profile.saudadeCapacity >= 4 && profile.saudadeCapacity <= 7 && profile.identityIntegration >= 6) {
      return CULTURAL_ARCHETYPES.find(a => a.id === 'ponte_cultural')!
    }
    
    // Community Guardian: High collectivism + high hospitality + high group harmony
    if (profile.collectivismScore >= 7 && profile.hospitalityValue >= 7 && profile.groupHarmony >= 7) {
      return CULTURAL_ARCHETYPES.find(a => a.id === 'guardião_comunidade')!
    }
    
    // Default to Modern Portuguese
    return CULTURAL_ARCHETYPES.find(a => a.id === 'português_moderno')!
  }

  // Generate personality insights
  const generatePersonalityInsights = (profile: CulturalPersonalityProfile): PersonalityInsight[] => {
    const insights: PersonalityInsight[] = []
    
    // Saudade insight
    if (profile.saudadeCapacity >= 8) {
      insights.push({
        title: 'Deep Saudade Connection',
        titlePt: 'Conexão Profunda de Saudade',
        description: 'You experience saudade very intensely, which connects you deeply to Portuguese culture but may also create emotional challenges in diaspora life.',
        descriptionPt: 'Experimenta saudade muito intensamente, o que o conecta profundamente à cultura portuguesa mas pode também criar desafios emocionais na vida da diáspora.',
        culturalContext: 'High saudade is characteristic of Portuguese cultural psychology',
        strengthLevel: 'very_high',
        developmentSuggestions: [
          'Channel saudade into creative expression',
          'Connect with others who understand this emotion',
          'Use saudade as motivation for cultural preservation'
        ],
        culturalActivities: [
          'Fado singing or listening groups',
          'Portuguese poetry reading',
          'Cultural storytelling sessions'
        ],
        compatibilityImplications: [
          'High compatibility with others who experience deep saudade',
          'May need understanding partners regarding emotional intensity',
          'Strong cultural bonding potential with similar personalities'
        ]
      })
    }
    
    // Family centricity insight
    if (profile.familyCentricity >= 8) {
      insights.push({
        title: 'Strong Family Orientation',
        titlePt: 'Forte Orientação Familiar',
        description: 'Family plays a central role in your decisions and worldview, reflecting core Portuguese values of family solidarity and interconnectedness.',
        descriptionPt: 'A família tem um papel central nas suas decisões e visão do mundo, refletindo valores portugueses fundamentais de solidariedade e interconexão familiar.',
        culturalContext: 'Family centricity is a cornerstone of Portuguese cultural identity',
        strengthLevel: 'very_high',
        developmentSuggestions: [
          'Balance family input with personal autonomy',
          'Help bridge generational differences',
          'Share family values with British friends'
        ],
        culturalActivities: [
          'Multi-generational Portuguese events',
          'Family recipe sharing sessions',
          'Portuguese family history projects'
        ],
        compatibilityImplications: [
          'Best matches with others who value family highly',
          'May conflict with highly individualistic personalities',
          'Strong potential for building family-centered community'
        ]
      })
    }
    
    return insights
  }

  // Handle response to current question
  const handleResponse = (value: number) => {
    const question = ASSESSMENT_QUESTIONS[currentQuestion]
    setResponses(prev => ({
      ...prev,
      [question.id]: value
    }))
  }

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      processResults()
    }
  }

  // Move to previous question
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Process assessment results
  const processResults = async () => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const profile = calculatePersonalityProfile()
    const archetype = determineCulturalArchetype(profile)
    const insights = generatePersonalityInsights(profile)
    
    setPersonalityProfile(profile)
    setCulturalArchetype(archetype)
    setPersonalityInsights(insights)
    setCurrentStep('results')
    setIsProcessing(false)
  }

  // Restart assessment
  const restartAssessment = () => {
    setCurrentStep('intro')
    setCurrentQuestion(0)
    setResponses({})
    setPersonalityProfile(null)
    setCulturalArchetype(null)
    setPersonalityInsights([])
  }

  // Render introduction
  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-3xl p-8 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
            <PuzzlePieceIcon className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          {t('assessment.title', 'Portuguese Cultural Personality Assessment')}
        </h2>
        
        <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
          {t('assessment.subtitle', 'Discover your unique Portuguese cultural personality and how it shapes your experience in the diaspora community')}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <EyeIcon className="w-8 h-8 text-secondary-600 mb-3" />
            <h3 className="font-bold text-lg mb-2">
              {t('assessment.discover', 'Discover Your Archetype')}
            </h3>
            <p className="text-gray-600">
              {t('assessment.discover_desc', 'Identify your Portuguese cultural archetype and understand your unique cultural expression')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <SparklesIcon className="w-8 h-8 text-accent-600 mb-3" />
            <h3 className="font-bold text-lg mb-2">
              {t('assessment.insights', 'Personal Insights')}
            </h3>
            <p className="text-gray-600">
              {t('assessment.insights_desc', 'Get personalized recommendations for cultural activities and community connections')}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h4 className="font-bold text-lg mb-4">
            {t('assessment.dimensions', 'We\'ll explore these cultural dimensions:')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <HeartIcon className="w-4 h-4 text-red-500" />
              <span>{t('assessment.saudade', 'Saudade Capacity')}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4 text-blue-500" />
              <span>{t('assessment.family', 'Family Centricity')}</span>
            </div>
            <div className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4 text-green-500" />
              <span>{t('assessment.tradition', 'Tradition Adherence')}</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeEuropeAfricaIcon className="w-4 h-4 text-purple-500" />
              <span>{t('assessment.adaptation', 'Cultural Adaptation')}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentStep('assessment')}
          className="px-8 py-4 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          {t('assessment.start', 'Start Assessment')}
        </button>
      </div>
    </motion.div>
  )

  // Render assessment question
  const renderAssessment = () => {
    const question = ASSESSMENT_QUESTIONS[currentQuestion]
    const currentResponse = responses[question.id] || 0
    const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100

    return (
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-3xl mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('assessment.progress', 'Progress')}</span>
            <span>{currentQuestion + 1} / {ASSESSMENT_QUESTIONS.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-secondary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? question.questionPt : question.questionEn}
          </h3>
          
          <p className="text-lg text-gray-600 mb-6">
            {language === 'pt' ? question.contextPt : question.contextEn}
          </p>

          {/* Scenario Questions */}
          {question.responseType === 'scenario' && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <pre className="text-gray-700 whitespace-pre-line font-sans">
                {language === 'pt' ? question.scenarioPt : question.scenarioEn}
              </pre>
            </div>
          )}

          {/* Scale Response */}
          {question.responseType === 'scale' && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{t('assessment.scale.disagree', 'Strongly Disagree')}</span>
                <span>{t('assessment.scale.agree', 'Strongly Agree')}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                {[...Array(11)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleResponse(i)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                      currentResponse === i
                        ? 'bg-gradient-to-br from-secondary-500 to-accent-500 text-white shadow-lg transform scale-110'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>

              {/* Visual feedback */}
              <div className="flex justify-center items-center space-x-1">
                {[...Array(10)].map((_, i) => (
                  <HeartSolid
                    key={i}
                    className={`w-4 h-4 transition-all duration-300 ${
                      i < currentResponse
                        ? 'text-secondary-500'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scenario Response */}
          {question.responseType === 'scenario' && (
            <div className="grid grid-cols-2 gap-3">
              {['A', 'B', 'C', 'D'].map((option, index) => (
                <button
                  key={option}
                  onClick={() => handleResponse(index * 2.5)} // Convert to 0-10 scale
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    currentResponse === index * 2.5
                      ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            {t('common.back', 'Back')}
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={currentResponse === 0 && question.responseType === 'scale'}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {currentQuestion < ASSESSMENT_QUESTIONS.length - 1 
              ? t('common.next', 'Next') 
              : t('assessment.complete', 'Complete Assessment')
            }
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    )
  }

  // Render processing screen
  const renderProcessing = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-white rounded-3xl p-12 shadow-xl">
        <div className="w-20 h-20 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {t('assessment.processing', 'Analyzing Your Cultural Personality')}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {t('assessment.processing_desc', 'Our AI is analyzing your responses to create your personalized Portuguese cultural profile...')}
        </p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <p>{t('assessment.analyzing_saudade', '✓ Analyzing saudade patterns')}</p>
          <p>{t('assessment.evaluating_cultural', '✓ Evaluating cultural dimensions')}</p>
          <p>{t('assessment.determining_archetype', '⋯ Determining your archetype')}</p>
        </div>
      </div>
    </motion.div>
  )

  // Render results
  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Cultural Archetype */}
      {culturalArchetype && (
        <div className="bg-gradient-to-br from-white to-secondary-50 rounded-3xl p-8 shadow-xl border border-secondary-200 mb-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              {language === 'pt' ? culturalArchetype.namePt : culturalArchetype.nameEn}
            </h2>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              {language === 'pt' ? culturalArchetype.descriptionPt : culturalArchetype.descriptionEn}
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>{culturalArchetype.prevalenceInDiaspora}% of Portuguese diaspora</span>
              <span>•</span>
              <span>{culturalArchetype.culturalSignificance}</span>
            </div>
          </div>

          {/* Characteristics */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 text-green-700">
                {t('assessment.strengths', 'Cultural Strengths')}
              </h4>
              <ul className="space-y-2">
                {(language === 'pt' ? culturalArchetype.strengthsPt : culturalArchetype.strengthsEn).map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 text-amber-700">
                {t('assessment.growth_areas', 'Growth Areas')}
              </h4>
              <ul className="space-y-2">
                {(language === 'pt' ? culturalArchetype.challengesPt : culturalArchetype.challengesEn).map((challenge, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Personality Insights */}
      {personalityInsights.length > 0 && (
        <div className="grid gap-6 mb-8">
          {personalityInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  insight.strengthLevel === 'very_high' ? 'bg-red-100' :
                  insight.strengthLevel === 'high' ? 'bg-orange-100' :
                  insight.strengthLevel === 'moderate' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <HeartSolid className={`w-6 h-6 ${
                    insight.strengthLevel === 'very_high' ? 'text-red-600' :
                    insight.strengthLevel === 'high' ? 'text-orange-600' :
                    insight.strengthLevel === 'moderate' ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">
                    {language === 'pt' ? insight.titlePt : insight.title}
                  </h4>
                  
                  <p className="text-gray-700 mb-4">
                    {language === 'pt' ? insight.descriptionPt : insight.description}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('assessment.development', 'Development')}
                      </h5>
                      <ul className="space-y-1">
                        {insight.developmentSuggestions.slice(0, 2).map((suggestion, i) => (
                          <li key={i} className="text-gray-600">• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('assessment.activities', 'Recommended Activities')}
                      </h5>
                      <ul className="space-y-1">
                        {insight.culturalActivities.slice(0, 2).map((activity, i) => (
                          <li key={i} className="text-gray-600">• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('assessment.compatibility', 'Compatibility Notes')}
                      </h5>
                      <ul className="space-y-1">
                        {insight.compatibilityImplications.slice(0, 2).map((implication, i) => (
                          <li key={i} className="text-gray-600">• {implication}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('assessment.next_steps', 'Ready to Connect with Your Portuguese Community?')}
          </h3>
          
          <p className="text-lg text-gray-700 mb-6">
            {t('assessment.next_desc', 'Use your cultural personality insights to find better matches and join more relevant community activities')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              {t('assessment.find_matches', 'Find Compatible Matches')}
            </button>
            
            <button className="px-8 py-3 bg-white border-2 border-secondary-300 text-secondary-600 rounded-xl font-semibold hover:border-secondary-400 transition-colors">
              {t('assessment.join_events', 'Join Recommended Events')}
            </button>
            
            <button
              onClick={restartAssessment}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {t('assessment.retake', 'Retake Assessment')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-3xl px-6 py-3 mb-6"
          >
            <PuzzlePieceIcon className="w-5 h-5 text-secondary-600" />
            <span className="font-semibold text-secondary-700">
              {t('assessment.badge', 'Cultural Psychology Assessment')}
            </span>
          </motion.div>
          
          {currentStep !== 'intro' && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-black text-gray-900"
            >
              {currentStep === 'assessment' && t('assessment.taking', 'Discovering Your Cultural Self')}
              {currentStep === 'results' && t('assessment.your_profile', 'Your Portuguese Cultural Profile')}
            </motion.h1>
          )}
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && renderIntro()}
          {currentStep === 'assessment' && !isProcessing && renderAssessment()}
          {isProcessing && renderProcessing()}
          {currentStep === 'results' && !isProcessing && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  )
}