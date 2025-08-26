'use client'

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LightBulbIcon,
  HandRaisedIcon,
  MapIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

/**
 * User Guidance System Context
 * Manages beginner guidance state across the app
 */
interface UserGuidanceContextType {
  isFirstTimeVisitor: boolean
  showGuidance: boolean
  currentStep: number
  completedSteps: string[]
  hideGuidance: () => void
  showGuidanceFor: (section: string) => void
  markStepComplete: (stepId: string) => void
  resetGuidance: () => void
}

const UserGuidanceContext = createContext<UserGuidanceContextType | null>(null)

interface UserGuidanceProviderProps {
  children: ReactNode
}

/**
 * Global User Guidance System Provider
 * Provides context for beginner guidance throughout the app
 */
export function UserGuidanceProvider({ children }: UserGuidanceProviderProps) {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false)
  const [showGuidance, setShowGuidance] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    // Check if this is a first-time visitor
    const hasVisited = localStorage.getItem('lusotown_has_visited')
    const guidanceCompleted = localStorage.getItem('lusotown_guidance_completed')
    
    if (!hasVisited) {
      setIsFirstTimeVisitor(true)
      setShowGuidance(true)
      localStorage.setItem('lusotown_has_visited', 'true')
    } else if (!guidanceCompleted) {
      // Returning visitor who hasn't completed guidance
      setShowGuidance(false) // Don't auto-show, but make it available
    }
  }, [])

  const hideGuidance = () => {
    setShowGuidance(false)
    localStorage.setItem('lusotown_guidance_completed', 'true')
  }

  const showGuidanceFor = (section: string) => {
    setShowGuidance(true)
  }

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      if (!prev.includes(stepId)) {
        const newSteps = [...prev, stepId]
        localStorage.setItem('lusotown_completed_steps', JSON.stringify(newSteps))
        return newSteps
      }
      return prev
    })
  }

  const resetGuidance = () => {
    setCompletedSteps([])
    setCurrentStep(1)
    setShowGuidance(true)
    localStorage.removeItem('lusotown_guidance_completed')
    localStorage.removeItem('lusotown_completed_steps')
  }

  const contextValue: UserGuidanceContextType = {
    isFirstTimeVisitor,
    showGuidance,
    currentStep,
    completedSteps,
    hideGuidance,
    showGuidanceFor,
    markStepComplete,
    resetGuidance,
  }

  return (
    <UserGuidanceContext.Provider value={contextValue}>
      {children}
    </UserGuidanceContext.Provider>
  )
}

/**
 * Hook to use the user guidance context
 */
export function useUserGuidance() {
  const context = useContext(UserGuidanceContext)
  if (!context) {
    throw new Error('useUserGuidance must be used within UserGuidanceProvider')
  }
  return context
}

/**
 * Main Welcome Banner for First-Time Visitors
 */
export function WelcomeGuidanceBanner() {
  const { language } = useLanguage()
  const { isFirstTimeVisitor, showGuidance, hideGuidance } = useUserGuidance()
  const isPortuguese = language === 'pt'

  if (!isFirstTimeVisitor || !showGuidance) return null

  const welcomeSteps = [
    {
      title: isPortuguese ? 'Bem-vindo ao LusoTown!' : 'Welcome to LusoTown!',
      description: isPortuguese 
        ? 'A maior comunidade de falantes de português no Reino Unido'
        : 'The largest Portuguese-speaking community in the United Kingdom',
      action: isPortuguese ? 'Vamos começar' : 'Let\'s get started',
    }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Welcome content */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <HeartSolidIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{welcomeSteps[0].title}</h2>
                <p className="text-sm text-white/90">{welcomeSteps[0].description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // Start guided tour
                  document.getElementById('guidance-tour')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <LightBulbIcon className="w-4 h-4" />
                {welcomeSteps[0].action}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              
              <button
                onClick={hideGuidance}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label={isPortuguese ? 'Fechar' : 'Close'}
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Guided Tour Component
 */
export function GuidedTour() {
  const { language } = useLanguage()
  const { showGuidance, markStepComplete, completedSteps } = useUserGuidance()
  const isPortuguese = language === 'pt'
  const [currentTourStep, setCurrentTourStep] = useState(0)

  if (!showGuidance) return null

  const tourSteps = [
    {
      id: 'explore-events',
      title: isPortuguese ? 'Explore Eventos' : 'Explore Events',
      description: isPortuguese 
        ? 'Descubra eventos culturais, sociais e profissionais'
        : 'Discover cultural, social and professional events',
      icon: MapIcon,
      action: isPortuguese ? 'Ver Eventos' : 'View Events',
      route: ROUTES.events,
      highlight: '#events-section'
    },
    {
      id: 'find-businesses',
      title: isPortuguese ? 'Encontre Negócios' : 'Find Businesses',
      description: isPortuguese 
        ? 'Conecte-se com negócios portugueses verificados'
        : 'Connect with verified Portuguese businesses',
      icon: HandRaisedIcon,
      action: isPortuguese ? 'Explorar Directório' : 'Explore Directory',
      route: ROUTES.businessDirectory,
      highlight: '#business-section'
    },
    {
      id: 'join-community',
      title: isPortuguese ? 'Junte-se à Comunidade' : 'Join Community',
      description: isPortuguese 
        ? 'Candidate-se para acesso completo à plataforma'
        : 'Apply for full platform access',
      icon: HeartSolidIcon,
      action: isPortuguese ? 'Candidatar-se' : 'Apply Now',
      route: ROUTES.apply,
      highlight: '#signup-section'
    }
  ]

  const currentStep = tourSteps[currentTourStep]

  const handleNext = () => {
    markStepComplete(currentStep.id)
    
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(currentTourStep + 1)
    } else {
      // Tour completed
      markStepComplete('tour-completed')
    }
  }

  const handleStepClick = (route: string) => {
    handleNext()
    window.location.href = route
  }

  return (
    <motion.div
      id="guidance-tour"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-2xl mx-auto my-8"
    >
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {tourSteps.map((step, index) => (
          <div
            key={step.id}
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
              index <= currentTourStep ? 'bg-primary-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Current step */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <currentStep.icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {currentStep.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {currentStep.description}
        </p>

        {/* Action button */}
        <button
          onClick={() => handleStepClick(currentStep.route)}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto group"
        >
          <span>{currentStep.action}</span>
          <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Skip option */}
        <button
          onClick={() => setCurrentTourStep(prev => Math.min(prev + 1, tourSteps.length - 1))}
          className="text-gray-500 hover:text-gray-700 text-sm mt-4 transition-colors"
        >
          {isPortuguese ? 'Saltar este passo' : 'Skip this step'}
        </button>
      </div>
    </motion.div>
  )
}

/**
 * Contextual Help Tooltip
 */
interface HelpTooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
}

export function HelpTooltip({ content, position = 'top', children }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  const positionClasses = {
    top: '-top-12 left-1/2 transform -translate-x-1/2',
    bottom: '-bottom-12 left-1/2 transform -translate-x-1/2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute ${positionClasses[position]} bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Quick Help Button (always visible)
 */
export function QuickHelpButton() {
  const { language } = useLanguage()
  const { showGuidanceFor } = useUserGuidance()
  const isPortuguese = language === 'pt'

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => showGuidanceFor('general')}
      className="fixed bottom-24 left-4 md:bottom-8 md:left-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 group"
      aria-label={isPortuguese ? 'Ajuda' : 'Help'}
    >
      <QuestionMarkCircleIcon className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-3 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isPortuguese ? 'Precisa de ajuda?' : 'Need help?'}
      </div>
    </motion.button>
  )
}

/**
 * Onboarding Progress Checklist
 */
export function OnboardingChecklist() {
  const { language } = useLanguage()
  const { completedSteps, markStepComplete } = useUserGuidance()
  const isPortuguese = language === 'pt'

  const checklistItems = [
    {
      id: 'profile-created',
      title: isPortuguese ? 'Perfil Criado' : 'Profile Created',
      description: isPortuguese ? 'Complete o seu perfil com informações culturais' : 'Complete your profile with cultural information',
      completed: completedSteps.includes('profile-created')
    },
    {
      id: 'first-event-viewed',
      title: isPortuguese ? 'Primeiro Evento Visto' : 'First Event Viewed',
      description: isPortuguese ? 'Explore eventos da comunidade' : 'Explore community events',
      completed: completedSteps.includes('first-event-viewed')
    },
    {
      id: 'business-explored',
      title: isPortuguese ? 'Directório Explorado' : 'Directory Explored',
      description: isPortuguese ? 'Descubra negócios portugueses' : 'Discover Portuguese businesses',
      completed: completedSteps.includes('business-explored')
    },
    {
      id: 'application-submitted',
      title: isPortuguese ? 'Candidatura Submetida' : 'Application Submitted',
      description: isPortuguese ? 'Junte-se oficialmente à comunidade' : 'Officially join the community',
      completed: completedSteps.includes('application-submitted')
    }
  ]

  const completedCount = checklistItems.filter(item => item.completed).length
  const progressPercentage = (completedCount / checklistItems.length) * 100

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">
          {isPortuguese ? 'Progresso de Integração' : 'Onboarding Progress'}
        </h3>
        <span className="text-sm text-gray-500">
          {completedCount}/{checklistItems.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
              item.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
              item.completed ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {item.completed && <CheckCircleIcon className="w-3 h-3 text-white" />}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-medium ${item.completed ? 'text-green-800' : 'text-gray-900'}`}>
                {item.title}
              </h4>
              <p className={`text-sm ${item.completed ? 'text-green-600' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}