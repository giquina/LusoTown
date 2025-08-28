'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface OnboardingFlowEnhancedProps {
  onComplete: (data: any) => void
  onSkip: () => void
  variant?: 'welcome' | 'full'
}

interface OnboardingData {
  role: string
  interests: string[]
  location: string
  heritage: string
}

export default function OnboardingFlowEnhanced({
  onComplete,
  onSkip,
  variant = 'welcome'
}: OnboardingFlowEnhancedProps) {
  const { language } = useLanguage()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    role: '',
    interests: [],
    location: '',
    heritage: ''
  })

  const roles = [
    {
      id: 'student',
      title: language === 'pt' ? 'Estudante' : 'Student',
      description: language === 'pt' ? 'Estudar no Reino Unido' : 'Studying in the UK',
      icon: <AcademicCapIcon className="w-8 h-8" />
    },
    {
      id: 'professional',
      title: language === 'pt' ? 'Profissional' : 'Professional',
      description: language === 'pt' ? 'Trabalhar e fazer networking' : 'Working and networking',
      icon: <BriefcaseIcon className="w-8 h-8" />
    },
    {
      id: 'social',
      title: language === 'pt' ? 'Social' : 'Social',
      description: language === 'pt' ? 'Conhecer pessoas e cultura' : 'Meeting people and culture',
      icon: <HeartIcon className="w-8 h-8" />
    },
    {
      id: 'community',
      title: language === 'pt' ? 'Comunidade' : 'Community',
      description: language === 'pt' ? 'Contribuir para a comunidade' : 'Contributing to community',
      icon: <UserIcon className="w-8 h-8" />
    }
  ]

  const interests = [
    { id: 'cultural-events', label: language === 'pt' ? 'Eventos Culturais' : 'Cultural Events' },
    { id: 'business-networking', label: language === 'pt' ? 'Networking Profissional' : 'Business Networking' },
    { id: 'social-connections', label: language === 'pt' ? 'Conexões Sociais' : 'Social Connections' },
    { id: 'portuguese-culture', label: language === 'pt' ? 'Cultura Portuguesa' : 'Portuguese Culture' },
    { id: 'language-exchange', label: language === 'pt' ? 'Intercâmbio de Idiomas' : 'Language Exchange' },
    { id: 'food-dining', label: language === 'pt' ? 'Gastronomia' : 'Food & Dining' }
  ]

  const handleRoleSelect = (role: string) => {
    setData({ ...data, role })
    setStep(1)
  }

  const handleInterestToggle = (interest: string) => {
    const newInterests = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest]
    setData({ ...data, interests: newInterests })
  }

  const handleComplete = () => {
    onComplete(data)
  }

  const steps = [
    {
      title: language === 'pt' ? 'Qual é o seu papel?' : 'What\'s your role?',
      description: language === 'pt' ? 'Isso nos ajuda a personalizar sua experiência' : 'This helps us personalize your experience'
    },
    {
      title: language === 'pt' ? 'Quais são seus interesses?' : 'What are your interests?',
      description: language === 'pt' ? 'Selecione quantos desejar' : 'Select as many as you like'
    }
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Bem-vindo ao LusoTown!' : 'Welcome to LusoTown!'}
        </h1>
        <p className="text-lg text-gray-600">
          {language === 'pt' 
            ? 'Vamos configurar sua conta para a melhor experiência na comunidade portuguesa'
            : 'Let\'s set up your account for the best Portuguese community experience'
          }
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
          <span>{step + 1} {language === 'pt' ? 'de' : 'of'} {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[0].title}</h2>
              <p className="text-gray-600">{steps[0].description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all text-center group"
                >
                  <div className="text-primary-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {role.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[1].title}</h2>
              <p className="text-gray-600">{steps[1].description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    data.interests.includes(interest.id)
                      ? 'border-primary-500 bg-primary-50 text-primary-900'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{interest.label}</span>
                    {data.interests.includes(interest.id) && (
                      <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => setStep(0)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
              </button>
              
              <button
                onClick={handleComplete}
                disabled={data.interests.length === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{language === 'pt' ? 'Completar Configuração' : 'Complete Setup'}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip option */}
      <div className="text-center mt-8">
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          {language === 'pt' ? 'Pular por agora' : 'Skip for now'}
        </button>
      </div>
    </div>
  )
}