'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  TruckIcon,
  AcademicCapIcon,
  HomeIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  GlobeEuropeAfricaIcon,
  BriefcaseIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface OnboardingStep {
  id: string
  title: string
  titlePortuguese: string
  subtitle: string
  subtitlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  color: string
  fields: OnboardingField[]
}

interface OnboardingField {
  id: string
  type: 'select' | 'multiselect' | 'text' | 'radio' | 'checkbox' | 'slider'
  label: string
  labelPortuguese: string
  placeholder?: string
  placeholderPortuguese?: string
  options?: { value: string; label: string; labelPortuguese: string; description?: string; descriptionPortuguese?: string }[]
  required?: boolean
  min?: number
  max?: number
  value?: any
}

interface OnboardingData {
  language: string
  region: string
  role: string
  interests: string[]
  location: string
  professionalBackground: string[]
  culturalConnection: string
  communicationPreference: string
  eventPreferences: string[]
  transportNeeds: string[]
  communityGoals: string[]
  housingStatus: string
  familyStatus: string
  networkingStyle: string
  preferredEventTypes: string[]
  businessNeeds: string[]
  culturalInvolvement: string
  timeInUK: string
}

interface OnboardingFlowEnhancedProps {
  onComplete: (data: OnboardingData) => void
  onSkip?: () => void
  variant?: 'full' | 'welcome' | 'profile'
}

export default function OnboardingFlowEnhanced({ 
  onComplete, 
  onSkip, 
  variant = 'full' 
}: OnboardingFlowEnhancedProps) {
  const { language, switchLanguage } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({})
  const [isVisible, setIsVisible] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isPortuguese = language === 'pt'

  // Enhanced onboarding steps with Portuguese cultural context
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to LusoTown!',
      titlePortuguese: 'Bem-vindo ao LusoTown!',
      subtitle: 'Your Portuguese-speaking community in London & United Kingdom',
      subtitlePortuguese: 'A Sua Comunidade de Falantes de Português em Londres e Reino Unido',
      description: 'Connect with Portuguese speakers, discover cultural events, access premium transport services, and build meaningful relationships across the United Kingdom.',
      descriptionPortuguese: 'Conecte-se com falantes de português, descubra eventos culturais, acesse serviços de transporte premium e construa relacionamentos significativos por todo o Reino Unido.',
      icon: HeartIcon,
      color: 'primary',
      fields: [
        {
          id: 'language',
          type: 'radio',
          label: 'Choose your preferred language',
          labelPortuguese: 'Escolha o seu idioma preferido',
          required: true,
          options: [
            { value: 'en-uk', label: 'English (United Kingdom)', labelPortuguese: 'Inglês (Reino Unido)' },
            { value: 'en-us', label: 'English (United States)', labelPortuguese: 'Inglês (Estados Unidos)' },
            { value: 'pt-pt', label: 'Português (Portugal)', labelPortuguese: 'Português (Portugal)' },
            { value: 'pt-br', label: 'Português (Brasil)', labelPortuguese: 'Português (Brasil)' }
          ]
        },
        {
          id: 'region',
          type: 'select',
          label: 'Where are you located in the United Kingdom?',
          labelPortuguese: 'Onde está localizado no Reino Unido?',
          required: true,
          options: [
            { value: 'central-london', label: 'Central London', labelPortuguese: 'Centro de Londres' },
            { value: 'south-london', label: 'South London', labelPortuguese: 'Sul de Londres' },
            { value: 'east-london', label: 'East London', labelPortuguese: 'Leste de Londres' },
            { value: 'west-london', label: 'West London', labelPortuguese: 'Oeste de Londres' },
            { value: 'north-london', label: 'North London', labelPortuguese: 'Norte de Londres' },
            { value: 'greater-london', label: 'Greater London', labelPortuguese: 'Grande Londres' },
            { value: 'manchester', label: 'Manchester', labelPortuguese: 'Manchester' },
            { value: 'birmingham', label: 'Birmingham', labelPortuguese: 'Birmingham' },
            { value: 'other-uk', label: 'Other United Kingdom Location', labelPortuguese: 'Outra Localização no Reino Unido' }
          ]
        }
      ]
    },
    {
      id: 'role-interests',
      title: 'Your Role & Interests',
      titlePortuguese: 'Seu Papel e Interesses',
      subtitle: 'Help us personalize your experience',
      subtitlePortuguese: 'Ajude-nos a personalizar a sua experiência',
      description: 'Tell us about yourself so we can connect you with the right people and opportunities in the Portuguese-speaking community.',
      descriptionPortuguese: 'Conte-nos sobre si para que possamos conectá-lo com as pessoas e oportunidades certas na comunidade de falantes de português.',
      icon: UserGroupIcon,
      color: 'secondary',
      fields: [
        {
          id: 'role',
          type: 'radio',
          label: 'How would you like to participate?',
          labelPortuguese: 'Como gostaria de participar?',
          required: true,
          options: [
            { 
              value: 'organizer', 
              label: 'Event Organizer/Business Owner', 
              labelPortuguese: 'Organizador de Eventos/Empresário',
              description: 'Create events, promote services, build audiences',
              descriptionPortuguese: 'Criar eventos, promover serviços, construir audiências'
            },
            { 
              value: 'professional', 
              label: 'Business Professional', 
              labelPortuguese: 'Profissional de Negócios',
              description: 'Networking, career growth, business opportunities',
              descriptionPortuguese: 'Networking, crescimento profissional, oportunidades de negócio'
            },
            { 
              value: 'student', 
              label: 'Student', 
              labelPortuguese: 'Estudante',
              description: 'Education, social connections, career preparation',
              descriptionPortuguese: 'Educação, conexões sociais, preparação profissional'
            },
            { 
              value: 'family', 
              label: 'Family Member', 
              labelPortuguese: 'Membro da Família',
              description: 'Family activities, cultural preservation, community support',
              descriptionPortuguese: 'Atividades familiares, preservação cultural, apoio comunitário'
            },
            { 
              value: 'social', 
              label: 'Social Member', 
              labelPortuguese: 'Membro Social',
              description: 'Cultural events, friendships, community participation',
              descriptionPortuguese: 'Eventos culturais, amizades, participação comunitária'
            }
          ]
        },
        {
          id: 'interests',
          type: 'multiselect',
          label: 'What interests you most? (Select all that apply)',
          labelPortuguese: 'O que mais lhe interessa? (Selecione todos os aplicáveis)',
          required: true,
          options: [
            { value: 'cultural-events', label: 'Portuguese Cultural Events', labelPortuguese: 'Eventos Culturais Portugueses' },
            { value: 'business-networking', label: 'Business Networking', labelPortuguese: 'Networking Empresarial' },
            { value: 'family-activities', label: 'Family Activities', labelPortuguese: 'Atividades Familiares' },
            { value: 'professional-development', label: 'Professional Development', labelPortuguese: 'Desenvolvimento Profissional' },
            { value: 'food-and-dining', label: 'Portuguese Food & Dining', labelPortuguese: 'Comida e Restaurantes Portugueses' },
            { value: 'music-and-arts', label: 'Music & Arts', labelPortuguese: 'Música e Arte' },
            { value: 'sports', label: 'Sports & Recreation', labelPortuguese: 'Desportos e Recreação' },
            { value: 'language-learning', label: 'Language Learning', labelPortuguese: 'Aprendizagem de Idiomas' },
            { value: 'heritage-preservation', label: 'Heritage Preservation', labelPortuguese: 'Preservação do Património' },
            { value: 'travel-and-tours', label: 'Travel & Cultural Tours', labelPortuguese: 'Viagens e Tours Culturais' }
          ]
        }
      ]
    },
    {
      id: 'cultural-connection',
      title: 'Cultural Connection',
      titlePortuguese: 'Conexão Cultural',
      subtitle: 'Your Portuguese heritage and cultural background',
      subtitlePortuguese: 'A sua herança portuguesa e background cultural',
      description: 'Understanding your cultural background helps us create more meaningful connections and relevant experiences.',
      descriptionPortuguese: 'Compreender o seu background cultural ajuda-nos a criar conexões mais significativas e experiências relevantes.',
      icon: GlobeEuropeAfricaIcon,
      color: 'accent',
      fields: [
        {
          id: 'culturalConnection',
          type: 'radio',
          label: 'What\'s your connection to Portuguese culture?',
          labelPortuguese: 'Qual é a sua conexão com a cultura portuguesa?',
          required: true,
          options: [
            { value: 'portugal-born', label: 'Born in Portugal', labelPortuguese: 'Nascido em Portugal' },
            { value: 'brazil-born', label: 'Born in Brazil', labelPortuguese: 'Nascido no Brasil' },
            { value: 'portuguese-heritage', label: 'Portuguese Heritage/Ancestry', labelPortuguese: 'Herança/Ascendência Portuguesa' },
            { value: 'partner-family', label: 'Partner/Family Connection', labelPortuguese: 'Conexão por Parceiro/Família' },
            { value: 'cultural-interest', label: 'Cultural Interest/Learning', labelPortuguese: 'Interesse Cultural/Aprendizagem' },
            { value: 'business-connection', label: 'Business/Professional Connection', labelPortuguese: 'Conexão Empresarial/Profissional' }
          ]
        },
        {
          id: 'timeInUK',
          type: 'select',
          label: 'How long have you been in the United Kingdom?',
          labelPortuguese: 'Há quanto tempo está no Reino Unido?',
          required: true,
          options: [
            { value: 'less-than-1', label: 'Less than 1 year', labelPortuguese: 'Menos de 1 ano' },
            { value: '1-2-years', label: '1-2 years', labelPortuguese: '1-2 anos' },
            { value: '3-5-years', label: '3-5 years', labelPortuguese: '3-5 anos' },
            { value: '5-10-years', label: '5-10 years', labelPortuguese: '5-10 anos' },
            { value: 'more-than-10', label: 'More than 10 years', labelPortuguese: 'Mais de 10 anos' },
            { value: 'born-in-uk', label: 'Born in the United Kingdom', labelPortuguese: 'Nascido no Reino Unido' }
          ]
        },
        {
          id: 'communicationPreference',
          type: 'radio',
          label: 'Preferred language for community interactions?',
          labelPortuguese: 'Idioma preferido para interações comunitárias?',
          required: true,
          options: [
            { value: 'portuguese-only', label: 'Portuguese only', labelPortuguese: 'Apenas português' },
            { value: 'english-only', label: 'English only', labelPortuguese: 'Apenas inglês' },
            { value: 'both-languages', label: 'Both languages', labelPortuguese: 'Ambos os idiomas' },
            { value: 'depends-on-context', label: 'Depends on context', labelPortuguese: 'Depende do contexto' }
          ]
        }
      ]
    },
    {
      id: 'services-preferences',
      title: 'Service Preferences',
      titlePortuguese: 'Preferências de Serviços',
      subtitle: 'What LusoTown services interest you most?',
      subtitlePortuguese: 'Que serviços do LusoTown mais lhe interessam?',
      description: 'Help us understand which services you\'re most likely to use so we can provide relevant recommendations.',
      descriptionPortuguese: 'Ajude-nos a entender quais serviços tem mais probabilidade de usar para podermos fornecer recomendações relevantes.',
      icon: StarIcon,
      color: 'premium',
      fields: [
        {
          id: 'eventPreferences',
          type: 'multiselect',
          label: 'What types of events interest you?',
          labelPortuguese: 'Que tipos de eventos lhe interessam?',
          required: true,
          options: [
            { value: 'cultural-festivals', label: 'Cultural Festivals', labelPortuguese: 'Festivais Culturais' },
            { value: 'business-workshops', label: 'Business Workshops', labelPortuguese: 'Workshops Empresariais' },
            { value: 'networking-events', label: 'Networking Events', labelPortuguese: 'Eventos de Networking' },
            { value: 'food-experiences', label: 'Food Experiences', labelPortuguese: 'Experiências Gastronómicas' },
            { value: 'music-concerts', label: 'Music & Concerts', labelPortuguese: 'Música e Concertos' },
            { value: 'family-gatherings', label: 'Family Gatherings', labelPortuguese: 'Encontros Familiares' },
            { value: 'educational-talks', label: 'Educational Talks', labelPortuguese: 'Palestras Educacionais' },
            { value: 'sports-activities', label: 'Sports Activities', labelPortuguese: 'Atividades Desportivas' }
          ]
        },
        {
          id: 'transportNeeds',
          type: 'multiselect',
          label: 'Which transport services might you need?',
          labelPortuguese: 'Quais serviços de transporte poderia precisar?',
          options: [
            { value: 'event-transport', label: 'Transport to Events', labelPortuguese: 'Transporte para Eventos' },
            { value: 'airport-transfers', label: 'Airport Transfers', labelPortuguese: 'Transferências do Aeroporto' },
            { value: 'business-travel', label: 'Business Travel', labelPortuguese: 'Viagens de Negócios' },
            { value: 'family-occasions', label: 'Family Occasions', labelPortuguese: 'Ocasiões Familiares' },
            { value: 'security-services', label: 'Security Services', labelPortuguese: 'Serviços de Segurança' },
            { value: 'not-interested', label: 'Not interested in transport services', labelPortuguese: 'Não interessado em serviços de transporte' }
          ]
        },
        {
          id: 'communityGoals',
          type: 'multiselect',
          label: 'What are your community goals?',
          labelPortuguese: 'Quais são os seus objetivos comunitários?',
          required: true,
          options: [
            { value: 'make-friends', label: 'Make Portuguese-speaking friends', labelPortuguese: 'Fazer amigos falantes de português' },
            { value: 'business-opportunities', label: 'Find business opportunities', labelPortuguese: 'Encontrar oportunidades de negócio' },
            { value: 'cultural-preservation', label: 'Preserve Portuguese culture', labelPortuguese: 'Preservar a cultura portuguesa' },
            { value: 'professional-growth', label: 'Professional growth & mentorship', labelPortuguese: 'Crescimento profissional e mentoria' },
            { value: 'family-integration', label: 'Help family integrate into United Kingdom life', labelPortuguese: 'Ajudar a família a integrar-se na vida do Reino Unido' },
            { value: 'give-back', label: 'Give back to the community', labelPortuguese: 'Retribuir à comunidade' },
            { value: 'stay-connected', label: 'Stay connected to Portuguese roots', labelPortuguese: 'Manter-se conectado às raízes portuguesas' }
          ]
        }
      ]
    },
    {
      id: 'premium-services',
      title: 'Premium Services Interest',
      titlePortuguese: 'Interesse em Serviços Premium',
      subtitle: 'Explore our comprehensive Portuguese-speaking community support',
      subtitlePortuguese: 'Explore o nosso apoio abrangente à comunidade de falantes de português',
      description: 'Our £19.99/month Community membership unlocks transport booking, mentorship programs, housing assistance, and priority access to all community features.',
      descriptionPortuguese: 'A nossa subscrição de Comunidade £19.99/mês desbloqueia reservas de transporte, programas de mentoria, assistência habitacional e acesso prioritário a todas as funcionalidades comunitárias.',
      icon: SparklesIcon,
      color: 'coral',
      fields: [
        {
          id: 'housingStatus',
          type: 'radio',
          label: 'What\'s your current housing situation?',
          labelPortuguese: 'Qual é a sua situação habitacional atual?',
          required: true,
          options: [
            { value: 'settled', label: 'Settled and happy with current housing', labelPortuguese: 'Estabelecido e satisfeito com a habitação atual' },
            { value: 'looking-to-move', label: 'Looking to move/find better housing', labelPortuguese: 'À procura de mudança/melhor habitação' },
            { value: 'temporary-housing', label: 'In temporary housing', labelPortuguese: 'Em habitação temporária' },
            { value: 'new-to-uk', label: 'New to United Kingdom, need housing assistance', labelPortuguese: 'Novo no Reino Unido, preciso de assistência habitacional' },
            { value: 'help-others', label: 'Can help others with housing advice', labelPortuguese: 'Posso ajudar outros com conselhos habitacionais' }
          ]
        },
        {
          id: 'businessNeeds',
          type: 'multiselect',
          label: 'Which business/professional services interest you?',
          labelPortuguese: 'Quais serviços empresariais/profissionais lhe interessam?',
          options: [
            { value: 'mentorship', label: 'Professional Mentorship', labelPortuguese: 'Mentoria Profissional' },
            { value: 'business-networking', label: 'Business Networking Events', labelPortuguese: 'Eventos de Networking Empresarial' },
            { value: 'skill-development', label: 'Skill Development Workshops', labelPortuguese: 'Workshops de Desenvolvimento de Competências' },
            { value: 'startup-support', label: 'Startup/Entrepreneurship Support', labelPortuguese: 'Apoio a Startups/Empreendedorismo' },
            { value: 'career-guidance', label: 'Career Guidance', labelPortuguese: 'Orientação Profissional' },
            { value: 'business-partnerships', label: 'Business Partnerships', labelPortuguese: 'Parcerias Empresariais' },
            { value: 'not-applicable', label: 'Not applicable/not interested', labelPortuguese: 'Não aplicável/não interessado' }
          ]
        },
        {
          id: 'networkingStyle',
          type: 'radio',
          label: 'How do you prefer to network and connect?',
          labelPortuguese: 'Como prefere fazer networking e conectar-se?',
          required: true,
          options: [
            { value: 'large-events', label: 'Large community events and gatherings', labelPortuguese: 'Grandes eventos e encontros comunitários' },
            { value: 'small-groups', label: 'Small group meetups and intimate settings', labelPortuguese: 'Encontros de pequenos grupos e ambientes íntimos' },
            { value: 'professional-focused', label: 'Professional/business-focused networking', labelPortuguese: 'Networking focado em profissional/negócios' },
            { value: 'cultural-focused', label: 'Cultural and heritage-focused activities', labelPortuguese: 'Atividades focadas em cultura e património' },
            { value: 'online-first', label: 'Online connections first, then in-person', labelPortuguese: 'Conexões online primeiro, depois pessoalmente' },
            { value: 'activity-based', label: 'Activity-based (sports, hobbies, interests)', labelPortuguese: 'Baseado em atividades (desportos, hobbies, interesses)' }
          ]
        }
      ]
    }
  ]

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    const newErrors: Record<string, string> = {}

    step.fields.forEach(field => {
      if (field.required) {
        const value = onboardingData[field.id as keyof OnboardingData]
        
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = isPortuguese ? 'Este campo é obrigatório' : 'This field is required'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    
    // Clear error when user starts typing/selecting
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }))
    }

    // Apply language change immediately
    if (fieldId === 'language') {
      const langCode = value.includes('pt') ? 'pt' : 'en'
      switchLanguage(langCode)
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    // Save onboarding data
    localStorage.setItem('lusotown-onboarding-data', JSON.stringify(onboardingData))
    localStorage.setItem('lusotown-onboarding-completed', 'true')
    
    // Mark as completed for user journey tracking
    const completedActions = JSON.parse(localStorage.getItem('lusotown-completed-actions') || '[]')
    completedActions.push('onboarding_completed', 'profile_completed')
    localStorage.setItem('lusotown-completed-actions', JSON.stringify(completedActions))

    onComplete(onboardingData as OnboardingData)
    setIsVisible(false)
  }

  const handleSkip = () => {
    localStorage.setItem('lusotown-onboarding-skipped', 'true')
    onSkip?.()
    setIsVisible(false)
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r from-${currentStepData.color}-500 to-${currentStepData.color}-600 p-8 text-white`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <currentStepData.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {isPortuguese ? currentStepData.titlePortuguese : currentStepData.title}
                  </h2>
                  <p className="text-white/90">
                    {isPortuguese ? currentStepData.subtitlePortuguese : currentStepData.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="text-white/80 hover:text-white text-sm"
              >
                {isPortuguese ? 'Pular' : 'Skip'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-white/90 mb-2">
                <span>{isPortuguese ? 'Progresso' : 'Progress'}</span>
                <span>{currentStep + 1} of {steps.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <p className="text-white/90 leading-relaxed">
              {isPortuguese ? currentStepData.descriptionPortuguese : currentStepData.description}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-6">
              {currentStepData.fields.map((field) => {
                const value = onboardingData[field.id as keyof OnboardingData]
                const hasError = errors[field.id]

                return (
                  <div key={field.id} className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-900">
                      {isPortuguese ? field.labelPortuguese : field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === 'radio' && (
                      <div className="space-y-3">
                        {field.options?.map((option) => (
                          <label
                            key={option.value}
                            className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              value === option.value
                                ? `border-${currentStepData.color}-500 bg-${currentStepData.color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="radio"
                                name={field.id}
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">
                                  {isPortuguese ? option.labelPortuguese : option.label}
                                </div>
                                {option.description && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    {isPortuguese ? option.descriptionPortuguese : option.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}

                    {field.type === 'select' && (
                      <select
                        value={value || ''}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-${currentStepData.color}-500 ${
                          hasError ? 'border-red-500' : 'border-gray-200 focus:border-gray-300'
                        }`}
                      >
                        <option value="">
                          {isPortuguese ? 'Selecione uma opção...' : 'Select an option...'}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {isPortuguese ? option.labelPortuguese : option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === 'multiselect' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {field.options?.map((option) => {
                          const isSelected = Array.isArray(value) && value.includes(option.value)
                          
                          return (
                            <label
                              key={option.value}
                              className={`block p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected
                                  ? `border-${currentStepData.color}-500 bg-${currentStepData.color}-50`
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const currentValue = Array.isArray(value) ? value : []
                                    const newValue = e.target.checked
                                      ? [...currentValue, option.value]
                                      : currentValue.filter(v => v !== option.value)
                                    handleFieldChange(field.id, newValue)
                                  }}
                                  className={`rounded border-gray-300 text-${currentStepData.color}-600 focus:ring-${currentStepData.color}-500`}
                                />
                                <span className="text-sm font-medium text-gray-900">
                                  {isPortuguese ? option.labelPortuguese : option.label}
                                </span>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    )}

                    {hasError && (
                      <p className="text-sm text-red-600">{hasError}</p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                {isPortuguese ? 'Anterior' : 'Previous'}
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {isPortuguese ? 'Pular por Agora' : 'Skip for Now'}
                </button>
                
                <button
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-${currentStepData.color}-500 to-${currentStepData.color}-600 text-white rounded-xl font-semibold hover:from-${currentStepData.color}-600 hover:to-${currentStepData.color}-700 transition-all`}
                >
                  {currentStep === steps.length - 1 
                    ? (isPortuguese ? 'Concluir' : 'Complete')
                    : (isPortuguese ? 'Próximo' : 'Next')
                  }
                  {currentStep === steps.length - 1 ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <ArrowRightIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}