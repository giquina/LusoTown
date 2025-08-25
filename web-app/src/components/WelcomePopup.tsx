'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  XMarkIcon,
  HeartIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

const PORTUGUESE_SPEAKING_COUNTRIES = [
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ao', name: 'Angola', flag: '🇦🇴' },
  { code: 'cv', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'other', name: 'Other Portuguese-speaking', flag: '🌍' }
]

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState('')
  const router = useRouter()
  const { t, language } = useLanguage()

  // Show welcome popup for new users after interaction
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lusotown-welcome-seen')
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        if (window.scrollY > 300) {
          setIsVisible(true)
        }
      }, 15000) // 15 seconds
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('lusotown-welcome-seen', 'true')
  }

  const handleNext = () => {
    if (step === 1 && selectedCountry) {
      setStep(2)
    }
  }

  const handleAction = (action: string) => {
    localStorage.setItem('lusotown-welcome-seen', 'true')
    localStorage.setItem('lusotown-heritage', selectedCountry)
    setIsVisible(false)
    
    switch (action) {
      case 'events':
        router.push(ROUTES.events)
        break
      case 'matches':
        router.push(ROUTES.matches)
        break
      case 'business':
        router.push(ROUTES.directory)
        break
      default:
        break
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          {step === 1 && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl mb-3">🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Find Your Portuguese Community
                </h2>
                <p className="text-sm text-gray-600">
                  Connect with {language === 'pt' ? '750+' : '750+'} Portuguese speakers across the UK
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Where are you from?</p>
                {PORTUGUESE_SPEAKING_COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      selectedCountry === country.code
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedCountry}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-red-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 text-sm font-bold"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  What interests you most?
                </h2>
                <p className="text-sm text-gray-600">
                  We'll personalize your experience
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleAction('events')}
                  className="w-full p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <CalendarDaysIcon className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Cultural Events</div>
                      <div className="text-sm text-gray-600">Festivals, parties, celebrations</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('matches')}
                  className="w-full p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <HeartIcon className="w-6 h-6 text-red-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Find Your Match</div>
                      <div className="text-sm text-gray-600">Dating, friendships, connections</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('business')}
                  className="w-full p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Business Directory</div>
                      <div className="text-sm text-gray-600">Services, restaurants, professionals</div>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-4 px-4 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Explore everything
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}