'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { CameraIcon } from '@heroicons/react/24/outline'

const MobileCameraIntegration: React.FC = () => {
  const { language } = useLanguage()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CameraIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Integração da Câmara Mobile' : 'Mobile Camera Integration'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt' 
            ? 'Tecnologia avançada de câmara para conectar melhor a comunidade portuguesa'
            : 'Advanced camera technology to better connect the Portuguese community'
          }
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <CameraIcon className="w-16 h-16 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-4">
          {language === 'pt' 
            ? 'Funcionalidade em desenvolvimento'
            : 'Feature in development'
          }
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
          {language === 'pt' ? 'Em breve' : 'Coming soon'}
        </button>
      </div>
    </div>
  )
}

export default MobileCameraIntegration
