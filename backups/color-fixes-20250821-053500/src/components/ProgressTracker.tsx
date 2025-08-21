'use client'

import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

interface ProgressTrackerProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  completedSteps?: number[]
}

export default function ProgressTracker({ 
  currentStep, 
  totalSteps, 
  stepTitles, 
  completedSteps = [] 
}: ProgressTrackerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const progressPercentage = (currentStep / totalSteps) * 100
  const timeRemaining = Math.max(1, Math.ceil((totalSteps - currentStep + 1) * 0.5)) // 30 seconds per step
  
  return (
    <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border-b border-gray-200">
      <div className="px-4 sm:px-6 py-4">
        {/* Header Info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {isPortuguese ? `Passo ${currentStep} de ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
              </span>
              <span className="text-sm px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {isPortuguese 
                ? `Cerca de ${timeRemaining} minuto${timeRemaining > 1 ? 's' : ''} restante${timeRemaining > 1 ? 's' : ''}`
                : `About ${timeRemaining} minute${timeRemaining > 1 ? 's' : ''} remaining`
              }
            </p>
          </div>
          
          {/* SIA Badge */}
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-900">SIA Licenciado</div>
              <div className="text-gray-600">Segurança Profissional</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-secondary-500 to-accent-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1
              const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep
              const isCurrent = stepNumber === currentStep
              
              return (
                <div key={stepNumber} className="flex flex-col items-center">
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      isCompleted 
                        ? 'bg-secondary-500 border-secondary-500 text-white' 
                        : isCurrent
                        ? 'bg-white border-secondary-500 text-secondary-500'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? <CheckIcon className="w-4 h-4" /> : stepNumber}
                  </motion.div>
                  <span className={`text-xs mt-1 text-center max-w-[60px] leading-tight ${
                    isCurrent ? 'text-secondary-600 font-medium' : 'text-gray-500'
                  }`}>
                    {stepTitles[index] || `${isPortuguese ? 'Passo' : 'Step'} ${stepNumber}`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Auto-save indicator */}
        <div className="flex items-center justify-center mt-3">
          <motion.div 
            className="flex items-center space-x-2 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>
              {isPortuguese ? 'Progresso guardado automaticamente' : 'Progress saved automatically'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}