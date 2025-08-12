'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
    // Check if user has already verified their age
    const verified = localStorage.getItem('lusotown-age-verified')
    if (!verified) {
      setShowModal(true)
    } else {
      setIsVerified(true)
    }
  }, [])

  const handleVerifyAge = (isOver21: boolean) => {
    if (isOver21) {
      localStorage.setItem('lusotown-age-verified', 'true')
      setIsVerified(true)
      setShowModal(false)
    } else {
      // Redirect to a different page or show message for under 21
      window.location.href = 'https://www.gov.uk/browse/childcare-parenting'
    }
  }

  const content = {
    en: {
      title: 'Age Verification Required',
      subtitle: 'LusoTown London is exclusively for adults 21 and over',
      description: 'Our platform focuses on nightlife, social events, and adult connections within the Portuguese-speaking community in London.',
      confirm: 'I am 21 or older',
      deny: 'I am under 21',
      warning: 'This platform is designed for adults only'
    },
    pt: {
      title: 'Verificação de Idade Necessária',
      subtitle: 'LusoTown London é exclusivamente para adultos com 21 anos ou mais',
      description: 'A nossa plataforma foca-se em vida noturna, eventos sociais e conexões de adultos na comunidade lusófona de Londres.',
      confirm: 'Tenho 21 anos ou mais',
      deny: 'Tenho menos de 21 anos',
      warning: 'Esta plataforma é apenas para adultos'
    }
  }

  const strings = content[language as keyof typeof content] || content.en

  if (isVerified) return null

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
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
                  onClick={() => handleVerifyAge(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-green-700 hover:to-red-700 transition-all duration-200 shadow-lg text-sm sm:text-base"
                >
                  {strings.confirm}
                </button>
                
                <button
                  onClick={() => handleVerifyAge(false)}
                  className="w-full bg-gray-200 text-gray-700 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-gray-300 transition-colors duration-200 text-sm sm:text-base"
                >
                  {strings.deny}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6 flex items-center justify-center gap-1">
                <ExclamationTriangleIcon className="h-3 w-3" />
                {strings.warning}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}