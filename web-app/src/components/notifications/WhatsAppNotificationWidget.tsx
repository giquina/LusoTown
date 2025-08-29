'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

const WhatsAppNotificationWidget: React.FC = () => {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-green-200 p-6 max-w-sm"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-2xl">📱</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">
              {language === 'pt' ? 'Notificações WhatsApp' : 'WhatsApp Notifications'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt' ? 'Receba atualizações' : 'Get updates'}
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 text-sm">
          {language === 'pt' 
            ? 'Receba notificações sobre eventos da comunidade portuguesa diretamente no WhatsApp.'
            : 'Get notifications about Portuguese community events directly on WhatsApp.'
          }
        </p>

        <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center">
          <span className="mr-2">💬</span>
          {language === 'pt' ? 'Ativar Notificações' : 'Enable Notifications'}
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default WhatsAppNotificationWidget
