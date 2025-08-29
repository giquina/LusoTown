'use client'
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface EnhancedMobileWelcomeWizardProps {
  onComplete?: () => void
  className?: string
}

export default function EnhancedMobileWelcomeWizard({ 
  onComplete,
  className = '' 
}: EnhancedMobileWelcomeWizardProps) {
  const { t } = useLanguage()

  const handleStart = () => {
    onComplete?.()
  }

  return (
    <div className={"bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto " + className}>
      <div className="text-center">
        <div className="text-6xl mb-4">👋</div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Welcome to LusoTown
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Connect with the Portuguese-speaking community across the UK
        </p>
        
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
