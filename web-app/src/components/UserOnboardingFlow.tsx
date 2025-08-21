'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  HeartIcon,
  UsersIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  StarIcon,
  GlobeEuropeAfricaIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  GiftIcon,
  DocumentTextIcon,
  EyeIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'
import { 
  CheckBadgeIcon, 
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'

interface OnboardingStep {
  id: string
  title: string
  subtitle: string
  component: React.ComponentType<any>
}

interface UserOnboardingFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: any) => void
  initialStep?: number
}

export default function UserOnboardingFlow({
  isOpen,
  onClose,
  onComplete,
  initialStep = 0
}: UserOnboardingFlowProps) {
  const { language, t } = useLanguage()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [onboardingData, setOnboardingData] = useState({
    socialLogin: null,
    heritage: null,
    location: null,
    interests: [],
    acceptedGuidelines: false,
    referralCode: '',
    studentStatus: false
  })
  const [mounted, setMounted] = useState(false)

  const isPortuguese = language === 'pt'

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  if (!mounted) return null

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: isPortuguese ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!',
      subtitle: isPortuguese 
        ? 'A sua comunidade portuguesa em Londres'
        : 'Your Portuguese community in London',
      component: WelcomeStep
    },
    {
      id: 'social-login',
      title: isPortuguese ? 'Como prefere entrar?' : 'How would you like to sign in?',
      subtitle: isPortuguese
        ? 'Escolha o método mais conveniente'
        : 'Choose your preferred method',
      component: SocialLoginStep
    },
    {
      id: 'heritage',
      title: isPortuguese ? 'Partilhe a sua herança' : 'Share your heritage',
      subtitle: isPortuguese
        ? 'De onde vem a sua conexão portuguesa?'
        : 'Where does your Portuguese connection come from?',
      component: HeritageStep
    },
    {
      id: 'location',
      title: isPortuguese ? 'Onde está em Londres?' : 'Where are you in London?',
      subtitle: isPortuguese
        ? 'Ajude-nos a conectá-lo com portugueses perto de si'
        : 'Help us connect you with Portuguese speakers near you',
      component: LocationStep
    },
    {
      id: 'interests',
      title: isPortuguese ? 'O que lhe interessa?' : 'What interests you?',
      subtitle: isPortuguese
        ? 'Escolha as suas categorias favoritas'
        : 'Choose your favorite categories',
      component: InterestsStep
    },
    {
      id: 'guidelines',
      title: isPortuguese ? 'Diretrizes da Comunidade' : 'Community Guidelines',
      subtitle: isPortuguese
        ? 'Mantemos a nossa comunidade segura e acolhedora'
        : 'We keep our community safe and welcoming',
      component: GuidelinesStep
    },
    {
      id: 'growth',
      title: isPortuguese ? 'Bónus de Boas-vindas!' : 'Welcome Bonus!',
      subtitle: isPortuguese
        ? 'Aproveite os seus benefícios de membro'
        : 'Enjoy your member benefits',
      component: GrowthStep
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(onboardingData)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (newData: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...newData }))
  }

  const CurrentStepComponent = steps[currentStep]?.component

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        >
          {/* Mobile Layout */}
          <div className="block sm:hidden h-full overflow-y-auto">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full bg-white"
            >
              {/* Mobile Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                      <HeartIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">LusoTown</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-full transition-all"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-secondary-600">
                      {isPortuguese ? 'Progresso' : 'Progress'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentStep + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="flex-1 p-6">
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    data={onboardingData}
                    onDataChange={updateData}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    isPortuguese={isPortuguese}
                    isMobile={true}
                    step={steps[currentStep]}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Desktop Header */}
              <div className="flex-shrink-0 relative px-8 py-6 border-b bg-gradient-to-r from-primary-50 via-white to-secondary-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">LusoTown</h1>
                      <p className="text-sm text-secondary-600">
                        {isPortuguese ? 'Comunidade Portuguesa em Londres' : 'Portuguese Community in London'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-full transition-all"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-secondary-600">
                      {steps[currentStep]?.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentStep + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    data={onboardingData}
                    onDataChange={updateData}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    isPortuguese={isPortuguese}
                    isMobile={false}
                    step={steps[currentStep]}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Welcome Step Component
function WelcomeStep({ onNext, isPortuguese, isMobile }: any) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} mx-auto bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl`}
      >
        <HeartSolidIcon className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} text-white`} />
      </motion.div>

      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}
        >
          {isPortuguese ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${isMobile ? 'text-base' : 'text-lg'} text-secondary-600 max-w-2xl mx-auto leading-relaxed`}
        >
          {isPortuguese 
            ? 'A maior comunidade de falantes de português em Londres. Conecte-se, descubra eventos, faça amigos e sinta-se em casa.'
            : 'The largest community of Portuguese speakers in London. Connect, discover events, make friends, and feel at home.'
          }
        </motion.p>
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-primary-600`}>750+</div>
            <div className="text-xs text-primary-700">
              {isPortuguese ? 'Portugueses' : 'Portuguese'}
            </div>
          </div>
          <div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-secondary-600`}>50+</div>
            <div className="text-xs text-secondary-700">
              {isPortuguese ? 'Eventos/Mês' : 'Events/Month'}
            </div>
          </div>
          <div>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-accent-600`}>98%</div>
            <div className="text-xs text-accent-700">
              {isPortuguese ? 'Satisfação' : 'Satisfaction'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-6 text-sm text-secondary-600"
      >
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-action-500" />
          <span>{isPortuguese ? 'Seguro' : 'Safe'}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
          <span>{isPortuguese ? 'Verificado' : 'Verified'}</span>
        </div>
        <div className="flex items-center gap-2">
          <GiftIcon className="w-5 h-5 text-purple-500" />
          <span>{isPortuguese ? 'Gratuito' : 'Free'}</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onNext}
        className={`${isMobile ? 'w-full py-4' : 'px-8 py-4'} bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2`}
      >
        <span>{isPortuguese ? 'Vamos Começar!' : 'Let\'s Get Started!'}</span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
    </div>
  )
}

// Social Login Step Component
function SocialLoginStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  const socialOptions = [
    {
      id: 'google',
      name: 'Google',
      icon: '🔗',
      color: 'from-red-500 to-red-600',
      description: isPortuguese ? 'Rápido e seguro' : 'Fast and secure'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: 'from-blue-500 to-blue-600',
      description: isPortuguese ? 'Conecte com amigos' : 'Connect with friends'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-700 to-blue-800',
      description: isPortuguese ? 'Profissional' : 'Professional'
    },
    {
      id: 'email',
      name: 'Email',
      icon: '📧',
      color: 'from-gray-600 to-gray-700',
      description: isPortuguese ? 'Email tradicional' : 'Traditional email'
    }
  ]

  const handleSelection = (method: string) => {
    onDataChange({ socialLogin: method })
    setTimeout(onNext, 300)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
          {isPortuguese ? 'Como prefere entrar?' : 'How would you like to sign in?'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese 
            ? 'Escolha o método mais conveniente para si'
            : 'Choose the most convenient method for you'
          }
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
        {socialOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelection(option.id)}
            className={`group relative p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-200 text-left ${
              data.socialLogin === option.id ? 'border-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-xl`}>
                {option.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{option.name}</div>
                <div className="text-sm text-secondary-600">{option.description}</div>
              </div>
            </div>
            
            {data.socialLogin === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} pt-6`}>
        <button
          onClick={onPrevious}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 rounded-xl transition-all`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        {data.socialLogin && (
          <button
            onClick={onNext}
            className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all`}
          >
            <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Heritage Step Component
function HeritageStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  const heritageOptions = [
    {
      id: 'portugal',
      name: isPortuguese ? 'Portugal' : 'Portugal',
      flag: '🇵🇹',
      description: isPortuguese ? 'Nascido em Portugal ou ascendência portuguesa' : 'Born in Portugal or Portuguese ancestry'
    },
    {
      id: 'brazil',
      name: isPortuguese ? 'Brasil' : 'Brazil',
      flag: '🇧🇷',
      description: isPortuguese ? 'Nascido no Brasil ou ascendência brasileira' : 'Born in Brazil or Brazilian ancestry'
    },
    {
      id: 'angola',
      name: 'Angola',
      flag: '🇦🇴',
      description: isPortuguese ? 'Nascido em Angola ou ascendência angolana' : 'Born in Angola or Angolan ancestry'
    },
    {
      id: 'mozambique',
      name: isPortuguese ? 'Moçambique' : 'Mozambique',
      flag: '🇲🇿',
      description: isPortuguese ? 'Nascido em Moçambique ou ascendência moçambicana' : 'Born in Mozambique or Mozambican ancestry'
    },
    {
      id: 'cape_verde',
      name: isPortuguese ? 'Cabo Verde' : 'Cape Verde',
      flag: '🇨🇻',
      description: isPortuguese ? 'Nascido em Cabo Verde ou ascendência cabo-verdiana' : 'Born in Cape Verde or Cape Verdean ancestry'
    },
    {
      id: 'east_timor',
      name: isPortuguese ? 'Timor-Leste' : 'East Timor',
      flag: '🇹🇱',
      description: isPortuguese ? 'Nascido em Timor-Leste ou ascendência timorense' : 'Born in East Timor or Timorese ancestry'
    },
    {
      id: 'guinea_bissau',
      name: isPortuguese ? 'Guiné-Bissau' : 'Guinea-Bissau',
      flag: '🇬🇼',
      description: isPortuguese ? 'Nascido na Guiné-Bissau ou ascendência guineense' : 'Born in Guinea-Bissau or Guinea-Bissauan ancestry'
    },
    {
      id: 'sao_tome',
      name: isPortuguese ? 'São Tomé e Príncipe' : 'São Tomé and Príncipe',
      flag: '🇸🇹',
      description: isPortuguese ? 'Nascido em São Tomé e Príncipe ou ascendência são-tomense' : 'Born in São Tomé and Príncipe or São Toméan ancestry'
    },
    {
      id: 'diaspora',
      name: isPortuguese ? 'Diáspora' : 'Diaspora',
      flag: '🌍',
      description: isPortuguese ? 'Segunda geração ou aprendeu português' : 'Second generation or learned Portuguese'
    }
  ]

  const handleSelection = (heritage: string) => {
    onDataChange({ heritage })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
          {isPortuguese ? 'Partilhe a sua herança' : 'Share your heritage'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese 
            ? 'De onde vem a sua conexão com a língua portuguesa?'
            : 'Where does your connection to the Portuguese language come from?'
          }
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}>
        {heritageOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSelection(option.id)}
            className={`group relative p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-200 text-left ${
              data.heritage === option.id ? 'border-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{option.flag}</div>
              <div className="flex-1">
                <div className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {option.name}
                </div>
                {!isMobile && (
                  <div className="text-xs text-secondary-600 leading-relaxed">
                    {option.description}
                  </div>
                )}
              </div>
            </div>
            
            {data.heritage === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} pt-6`}>
        <button
          onClick={onPrevious}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 rounded-xl transition-all`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        {data.heritage && (
          <button
            onClick={onNext}
            className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all`}
          >
            <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Location Step Component  
function LocationStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  const londonAreas = [
    {
      id: 'central',
      name: isPortuguese ? 'Centro de Londres' : 'Central London',
      areas: ['Westminster', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets'],
      icon: BuildingOffice2Icon
    },
    {
      id: 'north',
      name: isPortuguese ? 'Norte de Londres' : 'North London',
      areas: ['Barnet', 'Enfield', 'Haringey', 'Waltham Forest'],
      icon: GlobeEuropeAfricaIcon
    },
    {
      id: 'south',
      name: isPortuguese ? 'Sul de Londres' : 'South London',
      areas: ['Croydon', 'Greenwich', 'Lewisham', 'Southwark', 'Lambeth'],
      icon: MapPinIcon
    },
    {
      id: 'east',
      name: isPortuguese ? 'Este de Londres' : 'East London',
      areas: ['Newham', 'Redbridge', 'Barking & Dagenham', 'Havering'],
      icon: UserGroupIcon
    },
    {
      id: 'west',
      name: isPortuguese ? 'Oeste de Londres' : 'West London',
      areas: ['Ealing', 'Hounslow', 'Richmond', 'Kingston', 'Wandsworth'],
      icon: HeartIcon
    },
    {
      id: 'outside',
      name: isPortuguese ? 'Fora de Londres' : 'Outside London',
      areas: ['Surrey', 'Essex', 'Hertfordshire', 'Kent', 'Other UK'],
      icon: UsersIcon
    }
  ]

  const handleSelection = (location: string) => {
    onDataChange({ location })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
          {isPortuguese ? 'Onde está localizado?' : 'Where are you located?'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese 
            ? 'Ajude-nos a conectá-lo com portugueses perto de si'
            : 'Help us connect you with Portuguese speakers near you'
          }
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-5'}`}>
        {londonAreas.map((area, index) => (
          <motion.button
            key={area.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelection(area.id)}
            className={`group relative p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-200 text-left ${
              data.location === area.id ? 'border-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <area.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className={`font-semibold text-gray-900 mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                  {area.name}
                </div>
                <div className={`text-secondary-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {area.areas.join(', ')}
                </div>
              </div>
            </div>
            
            {data.location === area.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <CheckIcon className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} pt-6`}>
        <button
          onClick={onPrevious}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 rounded-xl transition-all`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        {data.location && (
          <button
            onClick={onNext}
            className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all`}
          >
            <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Interests Step Component
function InterestsStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  const interestCategories = [
    {
      id: 'cultural_events',
      name: isPortuguese ? 'Eventos Culturais' : 'Cultural Events',
      description: isPortuguese ? 'Fado, Santos Populares, festas tradicionais' : 'Fado, Santos Populares, traditional festivals',
      icon: CalendarDaysIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'business_networking',
      name: isPortuguese ? 'Networking Empresarial' : 'Business Networking',
      description: isPortuguese ? 'Conectar com empresários portugueses' : 'Connect with Portuguese entrepreneurs',
      icon: BuildingOffice2Icon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'social_connections',
      name: isPortuguese ? 'Conexões Sociais' : 'Social Connections',
      description: isPortuguese ? 'Fazer amigos e conhecer pessoas' : 'Make friends and meet people',
      icon: UsersIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'student_life',
      name: isPortuguese ? 'Vida Universitária' : 'Student Life',
      description: isPortuguese ? 'Eventos para estudantes portugueses' : 'Events for Portuguese students',
      icon: AcademicCapIcon,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'food_wine',
      name: isPortuguese ? 'Comida e Vinho' : 'Food & Wine',
      description: isPortuguese ? 'Degustações e experiências gastronómicas' : 'Tastings and culinary experiences',
      icon: HeartIcon,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'sports',
      name: isPortuguese ? 'Desportos' : 'Sports',
      description: isPortuguese ? 'Futebol, padel, outras atividades' : 'Football, padel, other activities',
      icon: StarIcon,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'music_arts',
      name: isPortuguese ? 'Música e Artes' : 'Music & Arts',
      description: isPortuguese ? 'Concertos, exposições, cultura' : 'Concerts, exhibitions, culture',
      icon: HeartIcon,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'families',
      name: isPortuguese ? 'Famílias' : 'Families',
      description: isPortuguese ? 'Atividades para toda a família' : 'Activities for the whole family',
      icon: UserGroupIcon,
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  const handleInterestToggle = (interestId: string) => {
    const currentInterests = data.interests || []
    const updatedInterests = currentInterests.includes(interestId)
      ? currentInterests.filter((id: string) => id !== interestId)
      : [...currentInterests, interestId]
    
    onDataChange({ interests: updatedInterests })
  }

  const selectedInterests = data.interests || []

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
          {isPortuguese ? 'O que lhe interessa?' : 'What interests you?'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese 
            ? 'Selecione as categorias que mais lhe interessam (pode escolher várias)'
            : 'Select the categories that interest you most (you can choose several)'
          }
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
        {interestCategories.map((category, index) => {
          const isSelected = selectedInterests.includes(category.id)
          
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleInterestToggle(category.id)}
              className={`group relative p-4 bg-white border-2 rounded-xl hover:shadow-lg transition-all duration-200 text-left ${
                isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-gray-900 mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {category.name}
                  </div>
                  {!isMobile && (
                    <div className="text-xs text-secondary-600 leading-relaxed">
                      {category.description}
                    </div>
                  )}
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center"
                >
                  <CheckIcon className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 rounded-lg p-4 border border-primary-200"
        >
          <p className="text-primary-800 text-sm text-center">
            {isPortuguese 
              ? `${selectedInterests.length} categoria${selectedInterests.length > 1 ? 's' : ''} selecionada${selectedInterests.length > 1 ? 's' : ''}`
              : `${selectedInterests.length} categor${selectedInterests.length > 1 ? 'ies' : 'y'} selected`
            }
          </p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} pt-6`}>
        <button
          onClick={onPrevious}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 rounded-xl transition-all`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        {selectedInterests.length > 0 && (
          <button
            onClick={onNext}
            className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all`}
          >
            <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Guidelines Step Component
function GuidelinesStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  const guidelines = [
    {
      icon: ShieldCheckIcon,
      title: isPortuguese ? 'Respeito e Segurança' : 'Respect and Safety',
      description: isPortuguese 
        ? 'Tratamos todos com respeito e mantemos um ambiente seguro'
        : 'We treat everyone with respect and maintain a safe environment'
    },
    {
      icon: HeartIcon,
      title: isPortuguese ? 'Autenticidade Cultural' : 'Cultural Authenticity',
      description: isPortuguese
        ? 'Celebramos e preservamos a nossa herança portuguesa'
        : 'We celebrate and preserve our Portuguese heritage'
    },
    {
      icon: UsersIcon,
      title: isPortuguese ? 'Comunidade Inclusiva' : 'Inclusive Community',
      description: isPortuguese
        ? 'Acolhemos todos os falantes de português, independentemente da origem'
        : 'We welcome all Portuguese speakers, regardless of origin'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: isPortuguese ? 'Comunicação Respeitosa' : 'Respectful Communication',
      description: isPortuguese
        ? 'Mantemos conversas construtivas e respeitosas'
        : 'We maintain constructive and respectful conversations'
    },
    {
      icon: EyeIcon,
      title: isPortuguese ? 'Privacidade e Consentimento' : 'Privacy and Consent',
      description: isPortuguese
        ? 'Respeitamos a privacidade e obtemos consentimento para partilhas'
        : 'We respect privacy and obtain consent for sharing'
    },
    {
      icon: HandRaisedIcon,
      title: isPortuguese ? 'Reportar Preocupações' : 'Report Concerns',
      description: isPortuguese
        ? 'Encorajamos a reportar qualquer comportamento inadequado'
        : 'We encourage reporting any inappropriate behavior'
    }
  ]

  const handleAcceptance = () => {
    onDataChange({ acceptedGuidelines: !data.acceptedGuidelines })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
          {isPortuguese ? 'Diretrizes da Comunidade' : 'Community Guidelines'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese 
            ? 'Estas diretrizes ajudam a manter a nossa comunidade segura e acolhedora'
            : 'These guidelines help keep our community safe and welcoming'
          }
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 gap-4'} max-h-96 overflow-y-auto`}>
        {guidelines.map((guideline, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white border border-gray-200 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <guideline.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h4 className={`font-semibold text-gray-900 mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {guideline.title}
                </h4>
                <p className={`text-secondary-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                  {guideline.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Acceptance Checkbox */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
      >
        <label className="flex items-start gap-4 cursor-pointer">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-5 h-5 border-2 rounded transition-all ${
              data.acceptedGuidelines 
                ? 'bg-primary-500 border-primary-500' 
                : 'border-secondary-300'
            }`}>
              {data.acceptedGuidelines && (
                <CheckIcon className="w-3 h-3 text-white m-0.5" />
              )}
            </div>
          </div>
          <div>
            <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
              {isPortuguese 
                ? 'Concordo com as diretrizes da comunidade'
                : 'I agree to the community guidelines'
              }
            </p>
            <p className={`text-secondary-600 mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isPortuguese
                ? 'Comprometo-me a seguir estas diretrizes para manter a nossa comunidade segura'
                : 'I commit to following these guidelines to keep our community safe'
              }
            </p>
          </div>
        </label>
      </motion.div>

      {/* Navigation Buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'} pt-6`}>
        <button
          onClick={onPrevious}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 rounded-xl transition-all`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={data.acceptedGuidelines ? onNext : handleAcceptance}
          className={`${isMobile ? 'w-full' : ''} flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
            data.acceptedGuidelines
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600'
              : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
          }`}
        >
          <span>
            {data.acceptedGuidelines 
              ? (isPortuguese ? 'Continuar' : 'Continue')
              : (isPortuguese ? 'Aceitar Diretrizes' : 'Accept Guidelines')
            }
          </span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Growth Step Component
function GrowthStep({ onNext, onPrevious, data, onDataChange, isPortuguese, isMobile }: any) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24'} mx-auto bg-gradient-to-br from-green-500 via-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-xl`}
      >
        <GiftIcon className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} text-white`} />
      </motion.div>

      <div className="space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}
        >
          {isPortuguese ? 'Parabéns! Bem-vindo!' : 'Congratulations! Welcome!'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${isMobile ? 'text-base' : 'text-lg'} text-secondary-600 max-w-2xl mx-auto leading-relaxed`}
        >
          {isPortuguese 
            ? 'Agora faz parte da maior comunidade portuguesa em Londres! Aqui estão os seus benefícios de boas-vindas:'
            : 'You\'re now part of London\'s largest Portuguese community! Here are your welcome benefits:'
          }
        </motion.p>
      </div>

      {/* Welcome Benefits */}
      <div className="space-y-4">
        {[
          {
            icon: CalendarDaysIcon,
            title: isPortuguese ? 'Primeiro Evento Gratuito' : 'First Event Free',
            description: isPortuguese ? 'Participe no seu primeiro evento português sem custos' : 'Attend your first Portuguese event at no cost',
            color: 'from-blue-500 to-blue-600'
          },
          {
            icon: AcademicCapIcon,
            title: isPortuguese ? 'Desconto de Estudante' : 'Student Discount',
            description: isPortuguese ? '50% de desconto se for estudante' : '50% discount if you\'re a student',
            color: 'from-purple-500 to-purple-600'
          },
          {
            icon: StarSolidIcon,
            title: isPortuguese ? 'Acesso Premium 7 Dias' : '7-Day Premium Access',
            description: isPortuguese ? 'Acesso completo por uma semana' : 'Full access for one week',
            color: 'from-yellow-500 to-orange-500'
          },
          {
            icon: UserGroupIcon,
            title: isPortuguese ? 'Convide Amigos' : 'Invite Friends',
            description: isPortuguese ? 'Ganhe benefícios por cada amigo que convidar' : 'Earn benefits for each friend you invite',
            color: 'from-green-500 to-green-600'
          }
        ].map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <benefit.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                {benefit.title}
              </div>
              <div className={`text-secondary-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                {benefit.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <button
          onClick={onNext}
          className={`${isMobile ? 'w-full py-4' : 'px-8 py-4'} bg-gradient-to-r from-green-500 via-primary-500 to-secondary-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
        >
          <span>{isPortuguese ? 'Explorar Comunidade' : 'Explore Community'}</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
        
        <p className="text-xs text-gray-500">
          {isPortuguese 
            ? 'Pode alterar as suas preferências a qualquer momento no seu perfil'
            : 'You can change your preferences anytime in your profile'
          }
        </p>
      </motion.div>
    </div>
  )
}