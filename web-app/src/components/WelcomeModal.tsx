'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, GlobeEuropeAfricaIcon, XMarkIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

type LanguageOption = 'en-uk' | 'en-us' | 'pt-pt' | 'pt-br'
type RoleOption = 'organizer' | 'member'
type ModalStep = 'welcome' | 'language' | 'role' | 'complete'

export default function WelcomeModal() {
  const [showModal, setShowModal] = useState(false)
  const [isWelcomed, setIsWelcomed] = useState(false)
  const [currentStep, setCurrentStep] = useState<ModalStep>('welcome')
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null)
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null)
  const { t, language, switchLanguage } = useLanguage()

  useEffect(() => {
    // Check if user has already seen the welcome message
    const welcomed = localStorage.getItem('lusotown-welcomed')
    if (!welcomed) {
      setShowModal(true)
    } else {
      setIsWelcomed(true)
    }
  }, [])

  const handleSkip = () => {
    localStorage.setItem('lusotown-welcomed', 'true')
    setIsWelcomed(true)
    setShowModal(false)
  }

  const handleComplete = () => {
    // Apply selected language
    if (selectedLanguage) {
      const langCode = selectedLanguage.includes('pt') ? 'pt' : 'en'
      switchLanguage(langCode)
      
      // Store user preferences
      localStorage.setItem('lusotown-language-preference', selectedLanguage)
      localStorage.setItem('lusotown-user-role', selectedRole || 'member')
    }
    
    localStorage.setItem('lusotown-welcomed', 'true')
    setIsWelcomed(true)
    setShowModal(false)
  }

  const proceedToLanguageSelection = () => {
    setCurrentStep('language')
  }

  const proceedToRoleSelection = () => {
    if (selectedLanguage) {
      setCurrentStep('role')
    }
  }

  const canProceedFromLanguage = selectedLanguage !== null
  const canComplete = selectedLanguage !== null && selectedRole !== null

  const content = {
    welcome: {
      title: 'Welcome to LusoTown!',
      subtitle: 'Choose how you\'d like to participate in our community',
      description: 'Connect with Portuguese speakers across the UK. Discover cultural events, join discussions, and celebrate our shared heritage together.\n\nOur platform welcomes all Portuguese speakers and their families - from children to seniors, everyone is welcome to join our community.',
      continue: 'Get Started',
      skip: 'Skip for now'
    },
    language: {
      title: 'Choose Your Language',
      subtitle: 'Select your preferred language and region',
      description: 'This will help us provide content and events most relevant to you.',
      languages: [
        { code: 'en-uk', label: 'English (United Kingdom)', flag: '🇬🇧' },
        { code: 'en-us', label: 'English (United States)', flag: '🇺🇸' },
        { code: 'pt-pt', label: 'Português (Portugal)', flag: '🇵🇹' },
        { code: 'pt-br', label: 'Português (Brasil)', flag: '🇧🇷' }
      ],
      continue: 'Continue',
      back: 'Back'
    },
    role: {
      title: 'How would you like to participate?',
      subtitle: 'Choose your primary interest',
      organizer: {
        title: 'Event Organizer/Promoter',
        subtitle: 'Share Portuguese culture by creating and promoting events throughout the UK',
        features: [
          'Create and manage events',
          'Reach Portuguese communities across the UK',
          'Promote cultural activities and businesses',
          'Build engaged audiences'
        ],
        button: 'I create or promote events'
      },
      member: {
        title: 'Free Community Member',
        subtitle: 'Explore and participate in the vibrant Portuguese community across the UK',
        features: [
          'Browse events nationwide',
          'Join community discussions',
          'Discover Portuguese businesses',
          'Connect with fellow Portuguese speakers'
        ],
        button: 'I want to explore events'
      },
      continue: 'Complete Setup',
      back: 'Back'
    }
  }

  if (isWelcomed) return null

  const renderWelcomeStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <HeartIcon className="h-8 w-8 text-primary-600" />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {content.welcome.title}
      </h2>
      
      <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
        {content.welcome.subtitle}
      </p>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed whitespace-pre-line">
        {content.welcome.description}
      </p>

      <div className="space-y-3">
        <button
          onClick={proceedToLanguageSelection}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
        >
          {content.welcome.continue}
        </button>
        
        <button
          onClick={handleSkip}
          className="w-full bg-gray-100 text-gray-700 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
        >
          {content.welcome.skip}
        </button>
      </div>
    </div>
  )

  const renderLanguageStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-premium-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <GlobeEuropeAfricaIcon className="h-8 w-8 text-accent-600" />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {content.language.title}
      </h2>
      
      <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
        {content.language.subtitle}
      </p>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
        {content.language.description}
      </p>

      <div className="space-y-3 mb-6">
        {content.language.languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code as LanguageOption)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center space-x-3 ${
              selectedLanguage === lang.code
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
          </button>
        ))}
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('welcome')}
          className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
        >
          {content.language.back}
        </button>
        
        <button
          onClick={proceedToRoleSelection}
          disabled={!canProceedFromLanguage}
          className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base ${
            canProceedFromLanguage
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {content.language.continue}
        </button>
      </div>
    </div>
  )

  const renderRoleStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-coral-100 to-action-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <UserGroupIcon className="h-8 w-8 text-coral-600" />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {content.role.title}
      </h2>
      
      <p className="text-base sm:text-lg text-gray-700 mb-6 font-medium">
        {content.role.subtitle}
      </p>

      <div className="space-y-4 mb-6">
        {/* Event Organizer Option */}
        <button
          onClick={() => setSelectedRole('organizer')}
          className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedRole === 'organizer'
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <SparklesIcon className={`h-8 w-8 ${selectedRole === 'organizer' ? 'text-primary-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-1 ${selectedRole === 'organizer' ? 'text-primary-700' : 'text-gray-900'}`}>
                {content.role.organizer.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {content.role.organizer.subtitle}
              </p>
              <ul className="text-sm space-y-1">
                {content.role.organizer.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-xs">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                  {content.role.organizer.button}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Community Member Option */}
        <button
          onClick={() => setSelectedRole('member')}
          className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedRole === 'member'
              ? 'border-secondary-500 bg-secondary-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <UserGroupIcon className={`h-8 w-8 ${selectedRole === 'member' ? 'text-secondary-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-1 ${selectedRole === 'member' ? 'text-secondary-700' : 'text-gray-900'}`}>
                {content.role.member.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {content.role.member.subtitle}
              </p>
              <ul className="text-sm space-y-1">
                {content.role.member.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-xs">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <span className="inline-block bg-secondary-100 text-secondary-700 text-xs font-medium px-3 py-1 rounded-full">
                  {content.role.member.button}
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setCurrentStep('language')}
          className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
        >
          {content.role.back}
        </button>
        
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg text-sm sm:text-base ${
            canComplete
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {content.role.continue}
        </button>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleSkip}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {['welcome', 'language', 'role'].map((step, index) => (
                  <div
                    key={step}
                    className={`h-2 w-8 rounded-full transition-colors duration-200 ${
                      currentStep === step || (index === 0 && currentStep !== 'welcome') || (index === 1 && currentStep === 'role')
                        ? 'bg-primary-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Render current step */}
            {currentStep === 'welcome' && renderWelcomeStep()}
            {currentStep === 'language' && renderLanguageStep()}
            {currentStep === 'role' && renderRoleStep()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}