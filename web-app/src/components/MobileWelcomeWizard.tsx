'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HeartIcon,
  CalendarDaysIcon,
  CheckIcon,
  StarIcon,
  UsersIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

interface MobileWelcomeWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (selection: string) => void
}

const COMMUNITY_STATS = {
  members: '750+',
  events: '50+',
  satisfaction: '98%'
}

export default function MobileWelcomeWizard({
  isOpen,
  onClose,
  onComplete
}: MobileWelcomeWizardProps) {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedReason, setSelectedReason] = useState<string>('')
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

  const steps = [
    {
      id: 'purpose',
      component: PurposeStep
    },
    {
      id: 'cultural',
      component: CulturalConnectionStep
    },
    {
      id: 'action',
      component: ActionStep
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = (action: string) => {
    onComplete(action)
    onClose()
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
          <div className="h-full overflow-y-auto">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full bg-white"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🇵🇹</span>
                    </div>
                    <span className="font-bold text-gray-900">LusoTown</span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-gradient-to-r from-green-500 to-red-500 w-6'
                          : index < currentStep
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    selectedReason={selectedReason}
                    onReasonSelect={setSelectedReason}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    onComplete={handleComplete}
                    isPortuguese={isPortuguese}
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

// Step 1: What brings you here?
function PurposeStep({ selectedReason, onReasonSelect, onNext, isPortuguese }: any) {
  const reasons = [
    {
      id: 'events',
      title: isPortuguese ? 'Eventos Portugueses' : 'Portuguese Events',
      description: isPortuguese ? 'Fado, festas, Santos Populares' : 'Fado, festivals, Santos Populares',
      icon: CalendarDaysIcon,
      color: 'from-blue-500 to-blue-600',
      emoji: '🎉'
    },
    {
      id: 'friends',
      title: isPortuguese ? 'Fazer Amigos' : 'Make Friends',
      description: isPortuguese ? 'Conhecer outros portugueses' : 'Meet other Portuguese speakers',
      icon: UsersIcon,
      color: 'from-green-500 to-green-600',
      emoji: '👥'
    },
    {
      id: 'dating',
      title: isPortuguese ? 'Encontrar Alguém' : 'Find Someone',
      description: isPortuguese ? 'Relacionamentos e amor' : 'Relationships and love',
      icon: HeartIcon,
      color: 'from-red-500 to-pink-500',
      emoji: '❤️'
    },
    {
      id: 'business',
      title: isPortuguese ? 'Networking' : 'Networking',
      description: isPortuguese ? 'Conectar profissionalmente' : 'Connect professionally',
      icon: StarIcon,
      color: 'from-purple-500 to-purple-600',
      emoji: '💼'
    }
  ]

  const handleSelection = (reasonId: string) => {
    onReasonSelect(reasonId)
    setTimeout(onNext, 300)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-2xl">🤗</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {isPortuguese ? 'O que te trouxe aqui?' : 'What brings you here?'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          {isPortuguese 
            ? 'Escolha o que mais te interessa para começar'
            : 'Choose what interests you most to get started'
          }
        </motion.p>
      </div>

      <div className="space-y-3">
        {reasons.map((reason, index) => (
          <motion.button
            key={reason.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            onClick={() => handleSelection(reason.id)}
            className={`w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left ${
              selectedReason === reason.id ? 'border-green-500 bg-green-50' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-red-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{reason.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {reason.title}
                </div>
                <div className="text-sm text-gray-600">
                  {reason.description}
                </div>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Step 2: Perfect for Portuguese speakers!
function CulturalConnectionStep({ onNext, onPrevious, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-3xl">🇵🇹</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {isPortuguese ? 'Perfeito para portugueses!' : 'Perfect for Portuguese speakers!'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          {isPortuguese 
            ? 'Junta-te à maior comunidade de falantes de português em Londres'
            : 'Join London\'s largest Portuguese-speaking community'
          }
        </motion.p>
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 via-red-50 to-yellow-50 rounded-2xl p-6 border-2 border-green-100"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">{COMMUNITY_STATS.members}</div>
            <div className="text-xs text-green-700 font-medium">
              {isPortuguese ? 'Portugueses' : 'Portuguese'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">{COMMUNITY_STATS.events}</div>
            <div className="text-xs text-red-700 font-medium">
              {isPortuguese ? 'Eventos/Mês' : 'Events/Month'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">{COMMUNITY_STATS.satisfaction}</div>
            <div className="text-xs text-yellow-700 font-medium">
              {isPortuguese ? 'Satisfação' : 'Satisfaction'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cultural highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        {[
          {
            emoji: '🎵',
            text: isPortuguese ? 'Noites de Fado autênticas' : 'Authentic Fado nights'
          },
          {
            emoji: '🍷',
            text: isPortuguese ? 'Provas de vinhos portugueses' : 'Portuguese wine tastings'
          },
          {
            emoji: '⚽',
            text: isPortuguese ? 'Ver jogos de futebol juntos' : 'Watch football matches together'
          },
          {
            emoji: '🏰',
            text: isPortuguese ? 'Passeios culturais em Londres' : 'Cultural tours in London'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-gray-700">{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-red-600 transition-all"
        >
          <span>{isPortuguese ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Step 3: Start with FREE matching
function ActionStep({ onPrevious, onComplete, isPortuguese }: any) {
  const handlePrimaryAction = () => {
    onComplete('matches')
  }

  const handleSecondaryAction = () => {
    onComplete('events')
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-red-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <HeartSolidIcon className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {isPortuguese ? 'Comece gratuitamente!' : 'Start for FREE!'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          {isPortuguese 
            ? 'Encontre portugueses perto de si sem pagar nada'
            : 'Find Portuguese speakers near you at no cost'
          }
        </motion.p>
      </div>

      {/* Primary Action */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handlePrimaryAction}
        className="w-full p-6 bg-gradient-to-r from-green-500 to-red-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-xl font-bold mb-1">
              {isPortuguese ? 'Encontrar Portugueses' : 'Find Portuguese Matches'}
            </div>
            <div className="text-sm text-white/90">
              {isPortuguese ? 'Completamente GRATUITO' : 'Completely FREE'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              <span className="text-sm font-bold">FREE</span>
            </div>
            <ArrowRightIcon className="w-6 h-6" />
          </div>
        </div>
      </motion.button>

      {/* Secondary Action */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={handleSecondaryAction}
        className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {isPortuguese ? 'Explorar Eventos' : 'Browse Cultural Events'}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Fado, festas e mais' : 'Fado, festivals and more'}
            </div>
          </div>
          <CalendarDaysIcon className="w-6 h-6 text-gray-400" />
        </div>
      </motion.button>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-green-50 rounded-xl p-4 border border-green-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <GiftIcon className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">
            {isPortuguese ? 'Benefícios incluídos:' : 'Benefits included:'}
          </span>
        </div>
        <div className="space-y-2">
          {[
            isPortuguese ? '✓ Matching gratuito para sempre' : '✓ Free matching forever',
            isPortuguese ? '✓ Primeiro evento gratuito' : '✓ First event free',
            isPortuguese ? '✓ Acesso à comunidade portuguesa' : '✓ Access to Portuguese community'
          ].map((benefit, index) => (
            <div key={index} className="text-sm text-green-700 flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-600" />
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={() => onComplete('explore')}
          className="flex-1 text-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
        >
          {isPortuguese ? 'Explorar mais tarde' : 'Explore later'}
        </button>
      </div>
    </div>
  )
}