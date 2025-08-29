'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'

interface ProfileCreationWizardProps {
  onComplete?: () => void
}

export default function ProfileCreationWizard({ onComplete }: ProfileCreationWizardProps) {
  const { language } = useLanguage()
  const { colors } = useHeritage()
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {language === 'pt' ? 'Complete o Perfil' : 'Complete Profile'}
      </h1>
      <p className="text-gray-600">Step {currentStep} of 3</p>
      <button onClick={handleNext} className="mt-4 bg-primary-500 text-white px-4 py-2 rounded">
        {currentStep === 3 ? 'Complete' : 'Next'}
      </button>
    </div>
  )
}
