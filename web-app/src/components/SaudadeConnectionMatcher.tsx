'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  HeartIcon, 
  UserGroupIcon,
  MapPinIcon,
  MusicalNoteIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

interface SaudadeAssessment {
  homelandLonging: number
  familyConnection: number
  culturalIdentity: number
  languageNostalgia: number
  foodMemory: number
  landscapeLonging: number
  triggers: string[]
  comfortActivities: string[]
  strongestTimes: string[]
  copingMechanisms: string[]
  supportType: string
  languagePreference: string
}

interface SaudadeMatch {
  id: string
  name: string
  age: number
  saudadeScore: number
  saudadeType: string
  sharedTriggers: string[]
  compatibilityScore: number
  lastActive: string
  profileImage: string
  location: string
}

interface SupportGroup {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  type: string
  focus: string
  participants: number
  maxParticipants: number
  meetingFrequency: string
  language: string
  nextMeeting: string
}

interface ComfortActivity {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  category: string
  comfortLevel: string
  duration: number
  groupSize: string
  authenticity: number
  effectivenessRating: number
}

export default function SaudadeConnectionMatcher() {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState<'assessment' | 'results' | 'matches'>('assessment')
  const [assessment, setAssessment] = useState<Partial<SaudadeAssessment>>({})
  const [matches, setMatches] = useState<SaudadeMatch[]>([])
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([])
  const [comfortActivities, setComfortActivities] = useState<ComfortActivity[]>([])
  const [assessmentStep, setAssessmentStep] = useState(0)

  // Saudade triggers options
  const saudadeTriggers = [
    { key: 'fado_music', en: 'Fado music', pt: 'Música de fado', emoji: '🎵' },
    { key: 'ocean_sounds', en: 'Ocean sounds', pt: 'Som do oceano', emoji: '🌊' },
    { key: 'grandmother_cooking', en: "Grandmother's cooking", pt: 'Culinária da avó', emoji: '👵' },
    { key: 'village_festivals', en: 'Village festivals', pt: 'Festas da aldeia', emoji: '🎉' },
    { key: 'childhood_friends', en: 'Childhood friends', pt: 'Amigos de infância', emoji: '👫' },
    { key: 'portuguese_tv', en: 'Lusophone TV shows', pt: 'Programas de TV portugueses', emoji: '📺' },
    { key: 'family_gatherings', en: 'Family gatherings', pt: 'Reuniões familiares', emoji: '👨‍👩‍👧‍👦' },
    { key: 'traditional_music', en: 'Traditional folk music', pt: 'Música tradicional', emoji: '🪗' }
  ]

  // Mock data - in real app, this would come from Supabase
  useEffect(() => {
    setMatches([
      {
        id: '1',
        name: 'Maria Santos',
        age: 32,
        saudadeScore: 8,
        saudadeType: 'cultural_saudade',
        sharedTriggers: ['fado_music', 'grandmother_cooking', 'family_gatherings'],
        compatibilityScore: 92,
        lastActive: '2 hours ago',
        profileImage: '/images/profiles/maria.jpg',
        location: 'Vauxhall'
      },
      {
        id: '2',
        name: 'João Pereira',
        age: 28,
        saudadeScore: 7,
        saudadeType: 'geographic_saudade',
        sharedTriggers: ['ocean_sounds', 'village_festivals', 'childhood_friends'],
        compatibilityScore: 87,
        lastActive: '1 day ago',
        profileImage: '/images/profiles/joao.jpg',
        location: 'Stockwell'
      }
    ])

    setSupportGroups([
      {
        id: '1',
        nameEn: 'Homesick Hearts Circle',
        namePt: 'Círculo dos Corações com Saudades',
        descriptionEn: 'Weekly support group for Portuguese speakers experiencing intense homesickness',
        descriptionPt: 'Grupo de apoio semanal para portugueses com saudades intensas',
        type: 'weekly_circle',
        focus: 'geographic_saudade',
        participants: 8,
        maxParticipants: 12,
        meetingFrequency: 'weekly',
        language: 'bilingual',
        nextMeeting: '2025-08-24T18:00:00Z'
      },
      {
        id: '2',
        nameEn: 'Fado & Feelings',
        namePt: 'Fado e Sentimentos',
        descriptionEn: 'Monthly gathering combining fado appreciation with emotional support',
        descriptionPt: 'Encontro mensal combinando fado com apoio emocional',
        type: 'monthly_gathering',
        focus: 'cultural_saudade',
        participants: 15,
        maxParticipants: 20,
        meetingFrequency: 'monthly',
        language: 'portuguese',
        nextMeeting: '2025-09-01T19:30:00Z'
      }
    ])

    setComfortActivities([
      {
        id: '1',
        nameEn: 'Fado Listening & Sharing Circle',
        namePt: 'Círculo de Escuta e Partilha de Fado',
        descriptionEn: 'Guided listening to classic fado with personal sharing',
        descriptionPt: 'Escuta guiada de fado clássico com partilha pessoal',
        category: 'music_therapy',
        comfortLevel: 'high_comfort',
        duration: 90,
        groupSize: '6-12 people',
        authenticity: 5,
        effectivenessRating: 4.8
      },
      {
        id: '2',
        nameEn: "Grandmother's Recipe Workshop",
        namePt: 'Oficina das Receitas da Avó',
        descriptionEn: 'Collaborative cooking of traditional Lusophone family recipes',
        descriptionPt: 'Culinária colaborativa de receitas tradicionais portuguesas',
        category: 'cooking_together',
        comfortLevel: 'high_comfort',
        duration: 180,
        groupSize: '4-8 people',
        authenticity: 5,
        effectivenessRating: 4.9
      }
    ])
  }, [])

  const assessmentQuestions = [
    {
      key: 'homelandLonging',
      questionEn: 'How intensely do you long for your homeland?',
      questionPt: 'Quão intensamente sente saudades da sua terra natal?',
      descriptionEn: 'Think about physical places, landscapes, and the overall feeling of "home"',
      descriptionPt: 'Pense em lugares físicos, paisagens e o sentimento geral de "casa"'
    },
    {
      key: 'familyConnection',
      questionEn: 'How much do you miss your family and close relationships?',
      questionPt: 'Quanto sente falta da sua família e relacionamentos próximos?',
      descriptionEn: 'Consider both immediate family and your broader social circle back home',
      descriptionPt: 'Considere tanto a família imediata quanto o seu círculo social mais amplo'
    },
    {
      key: 'culturalIdentity',
      questionEn: 'How strongly do you feel disconnected from Portuguese culture?',
      questionPt: 'Quão intensamente se sente desconectado da cultura portuguesa?',
      descriptionEn: 'Think about traditions, customs, and cultural practices you miss',
      descriptionPt: 'Pense em tradições, costumes e práticas culturais de que sente falta'
    },
    {
      key: 'languageNostalgia',
      questionEn: 'How much do you miss speaking Lusophone naturally?',
      questionPt: 'Quanto sente falta de falar português naturalmente?',
      descriptionEn: 'Consider the comfort and ease of your native language',
      descriptionPt: 'Considere o conforto e facilidade da sua língua nativa'
    },
    {
      key: 'foodMemory',
      questionEn: 'How intensely do you crave authentic Lusophone flavors?',
      questionPt: 'Quão intensamente deseja sabores portugueses autênticos?',
      descriptionEn: 'Think about specific dishes, ingredients, and food memories',
      descriptionPt: 'Pense em pratos específicos, ingredientes e memórias de comida'
    },
    {
      key: 'landscapeLonging',
      questionEn: 'How much do you miss Lusophone landscapes and nature?',
      questionPt: 'Quanto sente falta das paisagens e natureza portuguesas?',
      descriptionEn: 'Consider beaches, mountains, countryside, and natural environments',
      descriptionPt: 'Considere praias, montanhas, campo e ambientes naturais'
    }
  ]

  const calculateSaudadeProfile = () => {
    const scores = [
      assessment.homelandLonging || 0,
      assessment.familyConnection || 0,
      assessment.culturalIdentity || 0,
      assessment.languageNostalgia || 0,
      assessment.foodMemory || 0,
      assessment.landscapeLonging || 0
    ]
    
    const average = scores.reduce((a, b) => a + b, 0) / scores.length
    const geographic = ((assessment.homelandLonging || 0) + (assessment.landscapeLonging || 0)) / 2
    const relational = ((assessment.familyConnection || 0) + (assessment.culturalIdentity || 0)) / 2
    const cultural = ((assessment.languageNostalgia || 0) + (assessment.foodMemory || 0)) / 2
    
    let type = 'balanced_saudade'
    if (geographic >= 7) type = 'geographic_saudade'
    else if (relational >= 7) type = 'relational_saudade'
    else if (cultural >= 7) type = 'cultural_saudade'
    
    return { average: Math.round(average), type }
  }

  const renderAssessmentStep = () => {
    const question = assessmentQuestions[assessmentStep]
    const currentValue = assessment[question.key as keyof SaudadeAssessment] as number || 0
    
    return (
      <motion.div
        key={assessmentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-2xl mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('saudade.assessment.progress', 'Progress')}</span>
            <span>{assessmentStep + 1} / {assessmentQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? question.questionPt : question.questionEn}
          </h3>
          <p className="text-lg text-gray-600">
            {language === 'pt' ? question.descriptionPt : question.descriptionEn}
          </p>
        </div>

        {/* Saudade Intensity Scale */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              {t('saudade.scale.none', 'Not at all')}
            </span>
            <span className="text-sm text-gray-500">
              {t('saudade.scale.intense', 'Very intensely')}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            {[...Array(11)].map((_, i) => (
              <button
                key={i}
                onClick={() => setAssessment(prev => ({ ...prev, [question.key]: i }))}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all ${
                  currentValue === i
                    ? 'bg-gradient-to-br from-secondary-500 to-accent-500 text-white shadow-lg transform scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          
          {/* Heart intensity visualization */}
          <div className="flex justify-center items-center space-x-1 mt-4">
            {[...Array(10)].map((_, i) => (
              <HeartSolid
                key={i}
                className={`w-5 h-5 transition-all duration-300 ${
                  i < currentValue
                    ? 'text-red-500'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => assessmentStep > 0 && setAssessmentStep(assessmentStep - 1)}
            disabled={assessmentStep === 0}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
          >
            {t('common.back', 'Back')}
          </button>
          
          <button
            onClick={() => {
              if (assessmentStep < assessmentQuestions.length - 1) {
                setAssessmentStep(assessmentStep + 1)
              } else {
                setCurrentStep('results')
              }
            }}
            disabled={currentValue === 0}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-secondary-600 to-accent-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {assessmentStep < assessmentQuestions.length - 1 
              ? t('common.next', 'Next') 
              : t('saudade.assessment.complete', 'Complete Assessment')
            }
          </button>
        </div>
      </motion.div>
    )
  }

  const renderResults = () => {
    const profile = calculateSaudadeProfile()
    
    const saudadeTypeInfo = {
      geographic_saudade: {
        nameEn: 'Geographic Saudade',
        namePt: 'Saudade Geográfica',
        descEn: 'You deeply miss the physical places and landscapes of home',
        descPt: 'Sente profundamente a falta dos lugares físicos e paisagens de casa',
        color: 'from-blue-500 to-teal-500',
        icon: MapPinIcon
      },
      relational_saudade: {
        nameEn: 'Relational Saudade',
        namePt: 'Saudade Relacional',
        descEn: 'You deeply miss family connections and close relationships',
        descPt: 'Sente profundamente a falta das conexões familiares e relacionamentos próximos',
        color: 'from-pink-500 to-red-500',
        icon: UsersIcon
      },
      cultural_saudade: {
        nameEn: 'Cultural Saudade',
        namePt: 'Saudade Cultural',
        descEn: 'You deeply miss Portuguese culture, language, and traditions',
        descPt: 'Sente profundamente a falta da cultura, língua e tradições portuguesas',
        color: 'from-purple-500 to-indigo-500',
        icon: MusicalNoteIcon
      },
      balanced_saudade: {
        nameEn: 'Balanced Saudade',
        namePt: 'Saudade Equilibrada',
        descEn: 'You experience a balanced mix of different types of longing',
        descPt: 'Experimenta uma mistura equilibrada de diferentes tipos de saudade',
        color: 'from-green-500 to-emerald-500',
        icon: HeartIcon
      }
    }
    
    const typeInfo = saudadeTypeInfo[profile.type as keyof typeof saudadeTypeInfo]
    const Icon = typeInfo.icon
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Saudade Profile Results */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-4 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8"
          >
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${typeInfo.color} flex items-center justify-center`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? typeInfo.namePt : typeInfo.nameEn}
              </h3>
              <p className="text-lg text-gray-600 max-w-md">
                {language === 'pt' ? typeInfo.descPt : typeInfo.descEn}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {t('saudade.intensity', 'Saudade Intensity')}:
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <HeartSolid
                      key={i}
                      className={`w-4 h-4 ${
                        i < profile.average ? 'text-red-500' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{profile.average}/10</span>
              </div>
            </div>
          </motion.div>
          
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            {t('saudade.results.title', 'Your Saudade Connection Matches')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('saudade.results.subtitle', 'Based on your emotional profile, we\'ve found people, groups, and activities to help you feel more connected to home')}
          </p>
        </div>

        {/* Recommendation Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saudade Buddies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('saudade.buddies.title', 'Saudade Buddies')}
              </h3>
              <p className="text-gray-600">
                {t('saudade.buddies.desc', 'Connect with others who understand your specific type of longing')}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {matches.slice(0, 2).map((match) => (
                <div key={match.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {match.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{match.name}</h4>
                    <p className="text-sm text-gray-600">
                      {match.compatibilityScore}% {t('common.compatibility', 'compatibility')} • {match.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {match.sharedTriggers.slice(0, 2).map((trigger) => {
                      const triggerInfo = saudadeTriggers.find(t => t.key === trigger)
                      return triggerInfo ? (
                        <span key={trigger} className="text-lg">{triggerInfo.emoji}</span>
                      ) : null
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentStep('matches')}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {t('saudade.buddies.cta', 'Find Your Buddy')}
            </button>
          </motion.div>

          {/* Support Groups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('saudade.groups.title', 'Support Groups')}
              </h3>
              <p className="text-gray-600">
                {t('saudade.groups.desc', 'Join caring communities that provide emotional support and understanding')}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {supportGroups.map((group) => (
                <div key={group.id} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? group.namePt : group.nameEn}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'pt' ? group.descriptionPt : group.descriptionEn}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{group.participants}/{group.maxParticipants} members</span>
                    <span className="capitalize">{group.meetingFrequency}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              {t('saudade.groups.cta', 'Join a Group')}
            </button>
          </motion.div>

          {/* Comfort Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('saudade.activities.title', 'Comfort Activities')}
              </h3>
              <p className="text-gray-600">
                {t('saudade.activities.desc', 'Therapeutic activities rooted in Portuguese traditions to ease your saudade')}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {comfortActivities.map((activity) => (
                <div key={activity.id} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? activity.namePt : activity.nameEn}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'pt' ? activity.descriptionPt : activity.descriptionEn}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{activity.duration} min • {activity.groupSize}</span>
                    <div className="flex items-center gap-1">
                      <span>★</span>
                      <span>{activity.effectivenessRating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              {t('saudade.activities.cta', 'Try Activities')}
            </button>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-3xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('saudade.cta.title', 'Ready to Heal Your Saudade?')}
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              {t('saudade.cta.desc', 'Join our Portuguese-speaking community platform to connect with people who truly understand your journey')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-secondary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                {t('common.join_community', 'Join Community')}
              </button>
              <button
                onClick={() => setCurrentStep('assessment')}
                className="px-8 py-3 bg-white border-2 border-secondary-300 text-secondary-600 rounded-xl font-semibold hover:border-secondary-400 transition-colors"
              >
                {t('saudade.retake', 'Retake Assessment')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl px-6 py-3 mb-6"
          >
            <HeartSolid className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-700">
              {t('saudade.badge', 'Saudade Connection System')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            {t('saudade.title', 'Find Others Who Understand Your')}
            <br />
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {t('saudade.saudade', 'Saudade')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto"
          >
            {t('saudade.subtitle', 'Connect with Portuguese speakers who share your unique emotional journey of longing, homesickness, and cultural displacement')}
          </motion.p>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'assessment' && renderAssessmentStep()}
          {currentStep === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  )
}