'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  XMarkIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  SparklesIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useWelcomePopup } from './WelcomePopupProvider'
import { ROUTES } from '@/config/routes'

interface WelcomePreferences {
  country: string
  interests: string[]
}

interface WelcomePopupProps {
  onClose?: () => void
}

const PORTUGUESE_SPEAKING_COUNTRIES = [
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ao', name: 'Angola', flag: '🇦🇴' },
  { code: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'cv', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'gw', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'st', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: 'tl', name: 'East Timor', flag: '🇹🇱' },
  { code: 'other', name: 'Other Portuguese-speaking region', flag: '🌍' }
]

const INTEREST_OPTIONS = [
  {
    key: 'events',
    icon: CalendarDaysIcon,
    color: 'text-primary-500',
    route: ROUTES.events
  },
  {
    key: 'businesses',
    icon: BuildingOfficeIcon,
    color: 'text-secondary-500',
    route: ROUTES.businessDirectory
  },
  {
    key: 'student-life',
    icon: AcademicCapIcon,
    color: 'text-accent-500',
    route: ROUTES.students
  },
  {
    key: 'cultural-experiences',
    icon: SparklesIcon,
    color: 'text-premium-500',
    route: ROUTES.community
  }
]

export default function WelcomePopup({ onClose }: WelcomePopupProps) {
  const { t } = useLanguage()
  const { isVisible, hideWelcomePopup } = useWelcomePopup()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<'welcome' | 'country' | 'interests'>('welcome')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isVisible])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible])

  const handleClose = useCallback(() => {
    hideWelcomePopup()
    if (onClose) {
      onClose()
    }
  }, [hideWelcomePopup, onClose])

  const handleSkipForNow = useCallback(() => {
    if (typeof window !== 'undefined') {
      const skipUntil = new Date().getTime() + (7 * 24 * 60 * 60 * 1000) // 7 days
      localStorage.setItem('lusotown-welcome-skip-until', skipUntil.toString())
    }
    handleClose()
  }, [handleClose])

  const handleExploreFirst = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lusotown-welcome-seen', 'true')
      localStorage.setItem('lusotown-show-banner', 'true')
    }
    handleClose()
  }, [handleClose])

  const handleGetStarted = useCallback(() => {
    setCurrentStep('country')
  }, [])

  const handleCountrySelect = useCallback((countryCode: string) => {
    setSelectedCountry(countryCode)
    setShowCountryDropdown(false)
    setCurrentStep('interests')
  }, [])

  const handleInterestToggle = useCallback((interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }, [])

  const handleFinishSetup = useCallback(() => {
    // Save preferences
    if (typeof window !== 'undefined') {
      const preferences: WelcomePreferences = {
        country: selectedCountry,
        interests: selectedInterests
      }
      localStorage.setItem('lusotown-user-preferences', JSON.stringify(preferences))
      localStorage.setItem('lusotown-welcome-seen', 'true')
    }

    // Route to most relevant page based on first interest or default to events
    const primaryInterest = selectedInterests[0] || 'events'
    const targetRoute = INTEREST_OPTIONS.find(option => option.key === primaryInterest)?.route || ROUTES.events
    
    handleClose()
    router.push(targetRoute)
  }, [selectedCountry, selectedInterests, handleClose, router])

  const getWelcomeContent = () => ({
    title: t('welcome.title'),
    subtitle: t('welcome.subtitle'),
    description: t('welcome.description'),
    getStarted: t('welcome.get_started'),
    exploreFirst: t('welcome.explore_first'),
    skipForNow: t('welcome.skip_for_now')
  })

  const getCountryContent = () => ({
    title: t('welcome.country.title'),
    subtitle: t('welcome.country.subtitle'),
    selectCountry: t('welcome.country.select')
  })

  const getInterestsContent = () => ({
    title: t('welcome.interests.title'),
    subtitle: t('welcome.interests.subtitle'),
    options: {
      events: t('welcome.interests.events'),
      businesses: t('welcome.interests.businesses'),
      'student-life': t('welcome.interests.student_life'),
      'cultural-experiences': t('welcome.interests.cultural_experiences')
    },
    continue: t('welcome.interests.continue'),
    finish: t('welcome.interests.finish')
  })

  const welcomeContent = getWelcomeContent()
  const countryContent = getCountryContent()
  const interestsContent = getInterestsContent()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close/Skip Button */}
            {currentStep === 'welcome' ? (
              <button
                onClick={handleSkipForNow}
                className="absolute top-4 right-4 text-sm text-gray-500 hover:text-gray-700 transition-colors z-10 font-medium"
              >
                {welcomeContent.skipForNow}
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}

            {/* Welcome Step */}
            {currentStep === 'welcome' && (
              <div>
                {/* Header with flags */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 pt-8 pb-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
                  </div>
                  
                  <div className="relative">
                    {/* Flag flow animation */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-2xl">🇵🇹</span>
                      <span className="text-2xl">🇧🇷</span>
                      <span className="text-2xl">🇦🇴</span>
                      <span className="text-2xl">🇲🇿</span>
                      <span className="text-2xl">🇨🇻</span>
                      <span className="text-xl text-white/80">→</span>
                      <span className="text-2xl">🇬🇧</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <GlobeEuropeAfricaIcon className="w-6 h-6 text-white" />
                      <span className="text-lg font-bold">LusoTown</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 text-center leading-tight">
                      {welcomeContent.title}
                    </h2>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-2 leading-relaxed text-center">
                    {welcomeContent.subtitle}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-6 text-center leading-relaxed">
                    {welcomeContent.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleGetStarted}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {welcomeContent.getStarted}
                    </button>
                    
                    <button
                      onClick={handleExploreFirst}
                      className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      {welcomeContent.exploreFirst}
                    </button>
                  </div>
                  
                  {/* Community Stats */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary-600">750+</div>
                        <div className="text-xs text-gray-600">
                          {t('common.portuguese_speakers', 'Portuguese Speakers')}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-secondary-600">50+</div>
                        <div className="text-xs text-gray-600">
                          {t('common.monthly_events', 'Monthly Events')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Country Selection Step */}
            {currentStep === 'country' && (
              <div>
                {/* Header */}
                <div className="bg-gradient-to-r from-accent-500 to-premium-500 px-6 pt-8 pb-6 text-white">
                  <h2 className="text-xl font-bold mb-2">
                    {countryContent.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {countryContent.subtitle}
                  </p>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="relative">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-primary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    >
                      {selectedCountry ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === selectedCountry)?.flag}
                          </span>
                          <span className="font-medium">
                            {PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === selectedCountry)?.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">{countryContent.selectCountry}</span>
                      )}
                      <ChevronDownIcon className={`w-5 h-5 text-gray-400 transform transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showCountryDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto"
                        >
                          {PORTUGUESE_SPEAKING_COUNTRIES.map((country) => (
                            <button
                              key={country.code}
                              onClick={() => handleCountrySelect(country.code)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                              <span className="text-xl">{country.flag}</span>
                              <span className="font-medium">{country.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}

            {/* Interests Selection Step */}
            {currentStep === 'interests' && (
              <div>
                {/* Header */}
                <div className="bg-gradient-to-r from-secondary-500 to-accent-500 px-6 pt-8 pb-6 text-white">
                  <h2 className="text-xl font-bold mb-2">
                    {interestsContent.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {interestsContent.subtitle}
                  </p>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {INTEREST_OPTIONS.map((option) => {
                      const isSelected = selectedInterests.includes(option.key)
                      return (
                        <button
                          key={option.key}
                          onClick={() => handleInterestToggle(option.key)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <option.icon className={`w-8 h-8 mx-auto mb-2 ${
                            isSelected ? 'text-primary-500' : option.color
                          }`} />
                          <div className={`text-sm font-medium ${
                            isSelected ? 'text-primary-900' : 'text-gray-700'
                          }`}>
                            {interestsContent.options[option.key as keyof typeof interestsContent.options]}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  
                  <button
                    onClick={handleFinishSetup}
                    disabled={selectedInterests.length === 0}
                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                      selectedInterests.length > 0
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {interestsContent.finish}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}