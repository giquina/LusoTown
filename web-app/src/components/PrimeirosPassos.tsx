'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapPinIcon,
  HeartIcon,
  CurrencyPoundIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  LanguageIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid'

interface OnboardingStep {
  id: string
  titleEn: string
  titlePt: string
  descriptionEn: string
  descriptionPt: string
  icon: React.ComponentType<any>
  action: string
  actionPt: string
  completed: boolean
  optional?: boolean
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    titleEn: 'Welcome to LusoTown',
    titlePt: 'Bem-vindo à LusoTown',
    descriptionEn: 'Your Portuguese-speaking community awaits! Let\'s get you started with finding your people in London.',
    descriptionPt: 'A sua comunidade de falantes de português espera! Vamos começar a encontrar a sua gente em Londres.',
    icon: UserGroupIcon,
    action: 'Get Started',
    actionPt: 'Começar',
    completed: false
  },
  {
    id: 'profile',
    titleEn: 'Create Your Profile',
    titlePt: 'Criar o Seu Perfil',
    descriptionEn: 'Tell us about yourself - where you\'re from, your interests, and what brings you to London.',
    descriptionPt: 'Conte-nos sobre si - de onde é, os seus interesses, e o que o trouxe a Londres.',
    icon: GlobeAltIcon,
    action: 'Complete Profile',
    actionPt: 'Completar Perfil',
    completed: false
  },
  {
    id: 'language',
    titleEn: 'Choose Your Language',
    titlePt: 'Escolher o Seu Idioma',
    descriptionEn: 'Switch between English and Portuguese anytime. We speak your language!',
    descriptionPt: 'Alternar entre inglês e português a qualquer momento. Falamos a sua língua!',
    icon: LanguageIcon,
    action: 'Set Language',
    actionPt: 'Definir Idioma',
    completed: false
  },
  {
    id: 'events',
    titleEn: 'Explore Events',
    titlePt: 'Explorar Eventos',
    descriptionEn: 'Discover Portuguese events, cultural activities, and meetups happening near you.',
    descriptionPt: 'Descobrir eventos portugueses, atividades culturais e encontros perto de si.',
    icon: CalendarDaysIcon,
    action: 'Browse Events',
    actionPt: 'Ver Eventos',
    completed: false
  },
  {
    id: 'location',
    titleEn: 'Set Your Location',
    titlePt: 'Definir a Sua Localização',
    descriptionEn: 'Help us show you events and activities in your area of London.',
    descriptionPt: 'Ajude-nos a mostrar eventos e atividades na sua área de Londres.',
    icon: MapPinIcon,
    action: 'Set Location',
    actionPt: 'Definir Localização',
    completed: false,
    optional: true
  },
  {
    id: 'connect',
    titleEn: 'Start Connecting',
    titlePt: 'Começar a Conectar',
    descriptionEn: 'Save events to your favorites and start building your Portuguese social calendar!',
    descriptionPt: 'Guardar eventos nos favoritos e começar a construir o seu calendário social português!',
    icon: HeartIcon,
    action: 'Save Favorites',
    actionPt: 'Guardar Favoritos',
    completed: false
  }
]

interface PrimeirosPassosProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function PrimeirosPassos({ isOpen, onClose, onComplete }: PrimeirosPassosProps) {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultSteps)
  const [isCompleting, setIsCompleting] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('lusotown-onboarding-progress')
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        setSteps(prev => prev.map(step => ({
          ...step,
          completed: progress[step.id] || false
        })))
      } catch (error) {
        console.error('Error loading onboarding progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (updatedSteps: OnboardingStep[]) => {
    const progress = updatedSteps.reduce((acc, step) => {
      acc[step.id] = step.completed
      return acc
    }, {} as Record<string, boolean>)
    localStorage.setItem('lusotown-onboarding-progress', JSON.stringify(progress))
  }

  const completeStep = (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    )
    setSteps(updatedSteps)
    saveProgress(updatedSteps)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepAction = (step: OnboardingStep) => {
    completeStep(step.id)
    
    // Simulate action based on step
    switch (step.id) {
      case 'language':
        // This would trigger language selection
        break
      case 'events':
        // This would navigate to events page
        break
      case 'profile':
        // This would open profile creation
        break
      default:
        break
    }
    
    // Auto-advance to next step after a brief delay
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        nextStep()
      } else {
        handleComplete()
      }
    }, 1000)
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    
    // Mark onboarding as completed
    localStorage.setItem('lusotown-onboarding-completed', 'true')
    
    setTimeout(() => {
      onComplete()
      onClose()
    }, 1500)
  }

  const completedSteps = steps.filter(step => step.completed).length
  const progress = (completedSteps / steps.length) * 100

  if (!isOpen) return null

  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-primary-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {language === 'pt' ? 'Primeiros Passos' : 'First Steps'}
              </h2>
              <p className="text-primary-100 mt-1">
                {language === 'pt' 
                  ? 'Vamos configurar a sua experiência LusoTown'
                  : 'Let\'s set up your LusoTown experience'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-primary-200 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-primary-200 mb-2">
              <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
              <span>{completedSteps}/{steps.length}</span>
            </div>
            <div className="w-full bg-primary-500 rounded-full h-2">
              <motion.div
                className="bg-accent-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {isCompleting ? (
              <motion.div
                key="completing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <CheckCircleIconSolid className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!'}
                </h3>
                <p className="text-gray-600">
                  {language === 'pt' 
                    ? 'Está tudo pronto! Vamos explorar a sua comunidade de falantes de português.'
                    : 'You\'re all set! Let\'s explore your Portuguese-speaking community.'
                  }
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Step Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <currentStepData.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'pt' ? currentStepData.titlePt : currentStepData.titleEn}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {language === 'pt' ? currentStepData.descriptionPt : currentStepData.descriptionEn}
                  </p>
                </div>

                {/* Step Content */}
                <div className="bg-gray-50 rounded-lg p-6">
                  {currentStepData.id === 'welcome' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <UserGroupIcon className="w-8 h-8 text-primary-600 mb-2" />
                          <h4 className="font-semibold text-gray-900">
                            {language === 'pt' ? 'Comunidade' : 'Community'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'pt' 
                              ? 'Conecte-se com portugueses'
                              : 'Connect with Portuguese speakers'
                            }
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <CalendarDaysIcon className="w-8 h-8 text-secondary-600 mb-2" />
                          <h4 className="font-semibold text-gray-900">
                            {language === 'pt' ? 'Eventos' : 'Events'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {language === 'pt' 
                              ? 'Descubra atividades culturais'
                              : 'Discover cultural activities'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStepData.id === 'language' && (
                    <div className="flex justify-center space-x-4">
                      <button className="flex items-center space-x-2 bg-white border-2 border-primary-200 rounded-lg p-4 hover:border-primary-400 transition-colors">
                        <span className="text-2xl">🇬🇧</span>
                        <span className="font-medium">English</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-white border-2 border-primary-400 rounded-lg p-4">
                        <span className="text-2xl">🇵🇹</span>
                        <span className="font-medium">Português</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  {currentStepData.completed ? (
                    <div className="flex items-center text-secondary-600">
                      <CheckCircleIconSolid className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        {language === 'pt' ? 'Completo!' : 'Completed!'}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStepAction(currentStepData)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
                    >
                      <span>
                        {language === 'pt' ? currentStepData.actionPt : currentStepData.action}
                      </span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {!isCompleting && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>{language === 'pt' ? 'Anterior' : 'Previous'}</span>
              </button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep 
                        ? 'bg-primary-600' 
                        : index < currentStep 
                          ? 'bg-secondary-500' 
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleComplete}
                  className="flex items-center space-x-2 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700"
                >
                  <span>{language === 'pt' ? 'Concluir' : 'Complete'}</span>
                  <CheckCircleIcon className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{language === 'pt' ? 'Próximo' : 'Next'}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}