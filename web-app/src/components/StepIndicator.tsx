'use client'

import { motion } from 'framer-motion'
import { CheckIcon, ClockIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepTitles?: string[]
  completedSteps?: number[]
  showTimeEstimate?: boolean
}

export default function StepIndicator({ 
  currentStep, 
  totalSteps, 
  stepTitles = [],
  completedSteps = [],
  showTimeEstimate = true 
}: StepIndicatorProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const progressPercentage = (currentStep / totalSteps) * 100
  const timeRemaining = Math.max(1, Math.ceil((totalSteps - currentStep + 1) * 0.5))
  
  const defaultStepTitles = [
    isPortuguese ? 'Tipo' : 'Type',
    isPortuguese ? 'Detalhes' : 'Details', 
    isPortuguese ? 'Riscos' : 'Risks',
    isPortuguese ? 'Proteção' : 'Protection',
    isPortuguese ? 'Requisitos' : 'Requirements',
    isPortuguese ? 'Contacto' : 'Contact'
  ]
  
  const titles = stepTitles.length > 0 ? stepTitles : defaultStepTitles
  
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-3">
        {/* Mobile Progress Bar */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary-700">
              {isPortuguese ? `Passo ${currentStep}/${totalSteps}` : `Step ${currentStep}/${totalSteps}`}
            </span>
            <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
            <motion.div 
              className="bg-gradient-to-r from-secondary-500 to-accent-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {showTimeEstimate && (
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <ClockIcon className="w-3 h-3" />
                <span>
                  {isPortuguese 
                    ? `${timeRemaining} min restante${timeRemaining > 1 ? 's' : ''}`
                    : `${timeRemaining} min remaining`
                  }
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop Step Indicators */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between relative">
            {/* Background line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-secondary-200 z-0" />
            
            {/* Progress line */}
            <motion.div 
              className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-secondary-500 to-accent-500 z-10"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Step circles */}
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1
              const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep
              const isCurrent = stepNumber === currentStep
              const isFuture = stepNumber > currentStep
              
              return (
                <div key={stepNumber} className="relative z-20 flex flex-col items-center">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      isCompleted 
                        ? 'bg-secondary-500 border-secondary-500 text-white shadow-lg' 
                        : isCurrent
                        ? 'bg-white border-secondary-500 text-secondary-600 shadow-lg ring-4 ring-secondary-100'
                        : 'bg-secondary-100 border-secondary-300 text-gray-400'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isCurrent ? 1.2 : 1,
                      boxShadow: isCurrent ? "0 0 0 4px rgba(34, 197, 94, 0.1)" : "none"
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: isFuture ? 1 : 1.1 }}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      stepNumber
                    )}
                  </motion.div>
                  
                  <motion.span 
                    className={`text-xs mt-2 text-center font-medium transition-colors ${
                      isCurrent 
                        ? 'text-secondary-600' 
                        : isCompleted 
                        ? 'text-secondary-700' 
                        : 'text-gray-400'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {titles[index] || `${isPortuguese ? 'Passo' : 'Step'} ${stepNumber}`}
                  </motion.span>
                </div>
              )
            })}
          </div>
          
          {/* Time estimate and percentage */}
          {showTimeEstimate && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <ClockIcon className="w-4 h-4" />
                <span>
                  {isPortuguese 
                    ? `Cerca de ${timeRemaining} minuto${timeRemaining > 1 ? 's' : ''} restante${timeRemaining > 1 ? 's' : ''}`
                    : `About ${timeRemaining} minute${timeRemaining > 1 ? 's' : ''} remaining`
                  }
                </span>
              </div>
              
              <div className="text-xs text-gray-500">
                <span className="font-medium text-secondary-600">{Math.round(progressPercentage)}%</span> 
                {isPortuguese ? ' concluído' : ' complete'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}