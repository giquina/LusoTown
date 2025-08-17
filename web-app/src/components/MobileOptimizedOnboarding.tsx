'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DevicePhoneMobileIcon,
  MapPinIcon,
  HeartIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface MobileOnboardingStep {
  id: string
  title: string
  titlePortuguese: string
  subtitle: string
  subtitlePortuguese: string
  type: 'welcome' | 'location' | 'interests' | 'goals' | 'completion'
  component: React.ComponentType<any>
  validation?: (data: any) => boolean
  mobileOptimizations: {
    gestureSupport: boolean
    voiceInput: boolean
    tapTargetSize: 'small' | 'medium' | 'large'
    keyboardType?: 'default' | 'numeric' | 'email'
  }
}

interface MobileOptimizedOnboardingProps {
  onComplete: (data: any) => void
  onSkip: () => void
  variant?: 'mobile' | 'tablet' | 'desktop'
  culturalPersonalization?: boolean
}

const WelcomeStep = ({ onNext, data, setData, language }: any) => {
  const isPortuguese = language === 'pt'
  
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center"
      >
        <SparklesIcon className="w-10 h-10 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {isPortuguese ? 'Bem-vindo à Família Portuguesa!' : 'Welcome to the Portuguese Family!'}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {isPortuguese 
            ? 'Em 60 segundos, vamos personalizar a sua experiência na comunidade portuguesa de Londres.'
            : 'In 60 seconds, we\'ll personalize your Portuguese community experience in London.'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 p-3 bg-secondary-50 rounded-lg">
          <CheckCircleIcon className="w-4 h-4 text-secondary-600" />
          <span className="text-gray-700">
            {isPortuguese ? 'Eventos culturais' : 'Cultural events'}
          </span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-accent-50 rounded-lg">
          <CheckCircleIcon className="w-4 h-4 text-accent-600" />
          <span className="text-gray-700">
            {isPortuguese ? 'Transporte premium' : 'Premium transport'}
          </span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg">
          <CheckCircleIcon className="w-4 h-4 text-primary-600" />
          <span className="text-gray-700">
            {isPortuguese ? 'Networking português' : 'Portuguese networking'}
          </span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-coral-50 rounded-lg">
          <CheckCircleIcon className="w-4 h-4 text-coral-600" />
          <span className="text-gray-700">
            {isPortuguese ? 'Apoio comunitário' : 'Community support'}
          </span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-secondary-500 to-accent-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-secondary-600 hover:to-accent-600 transition-all flex items-center justify-center gap-2"
      >
        <span>{isPortuguese ? 'Começar' : 'Get Started'}</span>
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

const LocationStep = ({ onNext, onPrev, data, setData, language }: any) => {
  const isPortuguese = language === 'pt'
  const [selectedLocation, setSelectedLocation] = useState(data.location || '')
  
  const londonAreas = [
    { id: 'central', name: 'Central London', namePortuguese: 'Centro de Londres' },
    { id: 'south', name: 'South London (Vauxhall, Stockwell)', namePortuguese: 'Sul de Londres (Vauxhall, Stockwell)' },
    { id: 'east', name: 'East London', namePortuguese: 'Leste de Londres' },
    { id: 'west', name: 'West London', namePortuguese: 'Oeste de Londres' },
    { id: 'north', name: 'North London', namePortuguese: 'Norte de Londres' },
    { id: 'outside', name: 'Outside London', namePortuguese: 'Fora de Londres' }
  ]

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setData({ ...data, location })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <MapPinIcon className="w-12 h-12 mx-auto text-primary-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Onde está localizado?' : 'Where are you located?'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Ajudamos a conectar com a comunidade portuguesa na sua área'
            : 'We\'ll help connect you with the Portuguese community in your area'
          }
        </p>
      </div>

      <div className="space-y-3">
        {londonAreas.map((area) => (
          <motion.button
            key={area.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLocationSelect(area.id)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedLocation === area.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="font-semibold text-gray-900">
              {isPortuguese ? area.namePortuguese : area.name}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        <button
          onClick={onNext}
          disabled={!selectedLocation}
          className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const InterestsStep = ({ onNext, onPrev, data, setData, language }: any) => {
  const isPortuguese = language === 'pt'
  const [selectedInterests, setSelectedInterests] = useState(data.interests || [])
  
  const interests = [
    { 
      id: 'cultural_events', 
      name: 'Cultural Events', 
      namePortuguese: 'Eventos Culturais',
      icon: HeartIcon,
      color: 'coral'
    },
    { 
      id: 'business_networking', 
      name: 'Business Networking', 
      namePortuguese: 'Networking Empresarial',
      icon: BriefcaseIcon,
      color: 'primary'
    },
    { 
      id: 'education', 
      name: 'Education & Learning', 
      namePortuguese: 'Educação e Aprendizagem',
      icon: AcademicCapIcon,
      color: 'secondary'
    },
    { 
      id: 'community_support', 
      name: 'Community Support', 
      namePortuguese: 'Apoio Comunitário',
      icon: UserGroupIcon,
      color: 'accent'
    }
  ]

  const handleInterestToggle = (interestId: string) => {
    const updated = selectedInterests.includes(interestId)
      ? selectedInterests.filter((id: string) => id !== interestId)
      : [...selectedInterests, interestId]
    
    setSelectedInterests(updated)
    setData({ ...data, interests: updated })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <HeartIcon className="w-12 h-12 mx-auto text-coral-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'O que lhe interessa?' : 'What interests you?'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Selecione todas as áreas que lhe interessam (pode escolher múltiplas)'
            : 'Select all areas that interest you (you can choose multiple)'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {interests.map((interest) => {
          const IconComponent = interest.icon
          const isSelected = selectedInterests.includes(interest.id)
          
          return (
            <motion.button
              key={interest.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleInterestToggle(interest.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                isSelected
                  ? `border-${interest.color}-500 bg-${interest.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                isSelected ? `text-${interest.color}-600` : 'text-gray-400'
              }`} />
              <div className={`font-semibold text-sm ${
                isSelected ? `text-${interest.color}-700` : 'text-gray-600'
              }`}>
                {isPortuguese ? interest.namePortuguese : interest.name}
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        <button
          onClick={onNext}
          disabled={selectedInterests.length === 0}
          className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const GoalsStep = ({ onNext, onPrev, data, setData, language }: any) => {
  const isPortuguese = language === 'pt'
  const [selectedGoals, setSelectedGoals] = useState(data.goals || [])
  
  const goals = [
    { 
      id: 'find_community', 
      name: 'Find Portuguese Community', 
      namePortuguese: 'Encontrar Comunidade Portuguesa',
      description: 'Connect with fellow Portuguese speakers',
      descriptionPortuguese: 'Conectar com outros falantes de português'
    },
    { 
      id: 'career_growth', 
      name: 'Career Growth', 
      namePortuguese: 'Crescimento Profissional',
      description: 'Professional development and networking',
      descriptionPortuguese: 'Desenvolvimento profissional e networking'
    },
    { 
      id: 'cultural_preservation', 
      name: 'Cultural Preservation', 
      namePortuguese: 'Preservação Cultural',
      description: 'Maintain Portuguese culture and traditions',
      descriptionPortuguese: 'Manter cultura e tradições portuguesas'
    },
    { 
      id: 'practical_support', 
      name: 'Practical Support', 
      namePortuguese: 'Apoio Prático',
      description: 'Housing, transport, and life assistance',
      descriptionPortuguese: 'Habitação, transporte e assistência de vida'
    }
  ]

  const handleGoalToggle = (goalId: string) => {
    const updated = selectedGoals.includes(goalId)
      ? selectedGoals.filter((id: string) => id !== goalId)
      : [...selectedGoals, goalId]
    
    setSelectedGoals(updated)
    setData({ ...data, goals: updated })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <BriefcaseIcon className="w-12 h-12 mx-auto text-accent-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Quais são os seus objetivos?' : 'What are your goals?'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Ajudamos a personalizar a sua experiência com base nos seus objetivos'
            : 'We\'ll help personalize your experience based on your goals'
          }
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <motion.button
            key={goal.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGoalToggle(goal.id)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedGoals.includes(goal.id)
                ? 'border-accent-500 bg-accent-50'
                : 'border-gray-200 hover:border-accent-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedGoals.includes(goal.id)
                  ? 'border-accent-500 bg-accent-500'
                  : 'border-gray-300'
              }`}>
                {selectedGoals.includes(goal.id) && (
                  <CheckCircleIcon className="w-3 h-3 text-white" />
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {isPortuguese ? goal.namePortuguese : goal.name}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? goal.descriptionPortuguese : goal.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        <button
          onClick={onNext}
          disabled={selectedGoals.length === 0}
          className="flex-1 bg-accent-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>{isPortuguese ? 'Finalizar' : 'Complete'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

const CompletionStep = ({ onComplete, data, language }: any) => {
  const isPortuguese = language === 'pt'
  
  useEffect(() => {
    // Auto-complete after animation
    const timer = setTimeout(() => {
      onComplete(data)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [onComplete, data])

  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center"
      >
        <CheckCircleIcon className="w-10 h-10 text-white" />
      </motion.div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {isPortuguese ? 'Perfil Personalizado Criado!' : 'Personalized Profile Created!'}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {isPortuguese 
            ? 'A sua experiência personalizada está a ser preparada. Será redirecionado em breve...'
            : 'Your personalized experience is being prepared. You\'ll be redirected shortly...'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-700">
            {isPortuguese ? 'Localização' : 'Location'}
          </div>
          <div className="text-green-600">{data.location}</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="font-semibold text-green-700">
            {isPortuguese ? 'Interesses' : 'Interests'}
          </div>
          <div className="text-green-600">{data.interests?.length || 0}</div>
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3 }}
        className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
      />
    </div>
  )
}

export default function MobileOptimizedOnboarding({
  onComplete,
  onSkip,
  variant = 'mobile',
  culturalPersonalization = true
}: MobileOptimizedOnboardingProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<any>({})
  const [isVisible, setIsVisible] = useState(true)

  const steps: MobileOnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      titlePortuguese: 'Bem-vindo',
      subtitle: 'Join the Portuguese community',
      subtitlePortuguese: 'Junte-se à comunidade portuguesa',
      type: 'welcome',
      component: WelcomeStep,
      mobileOptimizations: {
        gestureSupport: true,
        voiceInput: false,
        tapTargetSize: 'large'
      }
    },
    {
      id: 'location',
      title: 'Location',
      titlePortuguese: 'Localização',
      subtitle: 'Where are you based?',
      subtitlePortuguese: 'Onde está localizado?',
      type: 'location',
      component: LocationStep,
      validation: (data) => !!data.location,
      mobileOptimizations: {
        gestureSupport: true,
        voiceInput: false,
        tapTargetSize: 'large'
      }
    },
    {
      id: 'interests',
      title: 'Interests',
      titlePortuguese: 'Interesses',
      subtitle: 'What interests you?',
      subtitlePortuguese: 'O que lhe interessa?',
      type: 'interests',
      component: InterestsStep,
      validation: (data) => data.interests && data.interests.length > 0,
      mobileOptimizations: {
        gestureSupport: true,
        voiceInput: false,
        tapTargetSize: 'medium'
      }
    },
    {
      id: 'goals',
      title: 'Goals',
      titlePortuguese: 'Objetivos',
      subtitle: 'What are your goals?',
      subtitlePortuguese: 'Quais são os seus objetivos?',
      type: 'goals',
      component: GoalsStep,
      validation: (data) => data.goals && data.goals.length > 0,
      mobileOptimizations: {
        gestureSupport: true,
        voiceInput: false,
        tapTargetSize: 'large'
      }
    },
    {
      id: 'completion',
      title: 'Complete',
      titlePortuguese: 'Completo',
      subtitle: 'Welcome to the community!',
      subtitlePortuguese: 'Bem-vindo à comunidade!',
      type: 'completion',
      component: CompletionStep,
      mobileOptimizations: {
        gestureSupport: false,
        voiceInput: false,
        tapTargetSize: 'large'
      }
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = (finalData: any) => {
    // Save onboarding data
    localStorage.setItem('lusotown-onboarding-completed', 'true')
    localStorage.setItem('lusotown-onboarding-data', JSON.stringify(finalData))
    
    setIsVisible(false)
    onComplete(finalData)
  }

  const handleSkip = () => {
    localStorage.setItem('lusotown-onboarding-skipped', 'true')
    setIsVisible(false)
    onSkip()
  }

  if (!isVisible) return null

  const CurrentStepComponent = steps[currentStep].component
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {language === 'pt' ? steps[currentStep].titlePortuguese : steps[currentStep].title}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'pt' ? steps[currentStep].subtitlePortuguese : steps[currentStep].subtitle}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              {language === 'pt' ? 'Pular' : 'Skip'}
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>{currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                onNext={handleNext}
                onPrev={handlePrev}
                onComplete={handleComplete}
                data={userData}
                setData={setUserData}
                language={language}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Touch Indicators */}
        {variant === 'mobile' && (
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <DevicePhoneMobileIcon className="w-4 h-4" />
              <span>
                {language === 'pt' ? 'Deslize ou toque para navegar' : 'Swipe or tap to navigate'}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}