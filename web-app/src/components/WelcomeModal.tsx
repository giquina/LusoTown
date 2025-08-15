'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, GlobeEuropeAfricaIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function WelcomeModal() {
  const [showModal, setShowModal] = useState(false)
  const [isWelcomed, setIsWelcomed] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    // Check if user has already seen the welcome message
    const welcomed = localStorage.getItem('lusotown-welcomed')
    if (!welcomed) {
      setShowModal(true)
    } else {
      setIsWelcomed(true)
    }
  }, [])

  const handleContinue = () => {
    localStorage.setItem('lusotown-welcomed', 'true')
    setIsWelcomed(true)
    setShowModal(false)
  }

  const handleSkip = () => {
    localStorage.setItem('lusotown-welcomed', 'true')
    setIsWelcomed(true)
    setShowModal(false)
  }

  const content = {
    en: {
      title: 'Welcome to LusoTown London!',
      subtitle: 'Your Portuguese community hub in London - Events, Business, Culture & More',
      description: 'Join London\'s most vibrant Portuguese community! Discover 200+ cultural events, connect through our networking system, explore premium chauffeur services, and find Portuguese businesses. From tech workshops to traditional festivals, from professional networking to family celebrations - everything Portuguese in London is here. 18+ community with 90+ features and growing!',
      confirm: 'Explore LusoTown',
      skip: 'Maybe later',
      welcome: 'The heart of Portuguese London since 2024'
    },
    pt: {
      title: 'Bem-vindos ao LusoTown Londres!',
      subtitle: 'O seu centro da comunidade portuguesa em Londres - Eventos, Negócios, Cultura e Mais',
      description: 'Junte-se à comunidade portuguesa mais vibrante de Londres! Descubra mais de 200 eventos culturais, conecte-se através do nosso sistema de networking, explore serviços premium de chauffeur, e encontre negócios portugueses. De workshops de tecnologia a festivais tradicionais, de networking profissional a celebrações familiares - tudo o que é português em Londres está aqui. Comunidade 18+ com mais de 90 funcionalidades e a crescer!',
      confirm: 'Explorar LusoTown',
      skip: 'Talvez mais tarde',
      welcome: 'O coração do Londres português desde 2024'
    }
  }

  const strings = content[language as keyof typeof content] || content.en

  if (isWelcomed) return null

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
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {strings.title}
              </h2>
              
              <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
                {strings.subtitle}
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {strings.description}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-green-700 hover:to-red-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  {strings.confirm}
                </button>
                
                <button
                  onClick={handleSkip}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                >
                  {strings.skip}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6 flex items-center justify-center gap-1">
                <GlobeEuropeAfricaIcon className="h-3 w-3" />
                {strings.welcome}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}