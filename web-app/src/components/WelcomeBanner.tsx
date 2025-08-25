'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lusotown-welcome-seen')
    const showBanner = localStorage.getItem('lusotown-show-banner')
    
    if (!hasSeenWelcome && showBanner === 'true') {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('lusotown-welcome-seen', 'true')
    localStorage.removeItem('lusotown-show-banner')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-4 right-4 bg-gradient-to-r from-green-500 to-red-500 text-white p-4 rounded-lg shadow-lg z-40 mx-auto max-w-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {language === 'pt' 
                ? 'Bem-vindo à comunidade lusófona!'
                : 'Welcome to the Portuguese-speaking community!'
              }
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 hover:bg-white/20 rounded"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}