'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrophyIcon,
  XMarkIcon,
  SparklesIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface Milestone {
  id: string
  type: 'connections' | 'events' | 'achievements' | 'cultural'
  title: string
  description: string
  icon: string
  value: number
  threshold: number
  color: string
}

interface NetworkMilestoneAlertProps {
  milestone: Milestone
  isVisible: boolean
  onDismiss: () => void
  autoHide?: boolean
  autoHideDelay?: number
}

export default function NetworkMilestoneAlert({ 
  milestone, 
  isVisible, 
  onDismiss,
  autoHide = true,
  autoHideDelay = 5000 
}: NetworkMilestoneAlertProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowFireworks(true)
      const timer = setTimeout(() => setShowFireworks(false), 2000)
      
      if (autoHide) {
        const dismissTimer = setTimeout(onDismiss, autoHideDelay)
        return () => {
          clearTimeout(timer)
          clearTimeout(dismissTimer)
        }
      }
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, autoHideDelay, onDismiss])

  const getMilestoneIcon = () => {
    const icons = {
      connections: UserGroupIcon,
      events: CalendarIcon,
      achievements: TrophyIcon,
      cultural: SparklesIcon
    }
    return icons[milestone.type] || TrophyIcon
  }

  const getMilestoneMessages = () => {
    const messages = {
      connections: {
        title: isPortuguese ? 'Nova Conexão!' : 'New Connection!',
        celebration: isPortuguese ? 'Parabéns!' : 'Congratulations!'
      },
      events: {
        title: isPortuguese ? 'Marco de Eventos!' : 'Event Milestone!',
        celebration: isPortuguese ? 'Incrível!' : 'Amazing!'
      },
      achievements: {
        title: isPortuguese ? 'Conquista Desbloqueada!' : 'Achievement Unlocked!',
        celebration: isPortuguese ? 'Fantástico!' : 'Fantastic!'
      },
      cultural: {
        title: isPortuguese ? 'Marco Cultural!' : 'Cultural Milestone!',
        celebration: isPortuguese ? 'Bem feito!' : 'Well done!'
      }
    }
    return messages[milestone.type] || messages.achievements
  }

  const IconComponent = getMilestoneIcon()
  const messages = getMilestoneMessages()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className={`bg-white rounded-2xl shadow-2xl border-2 ${milestone.color} overflow-hidden`}>
            {/* Fireworks Effect */}
            {showFireworks && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                      x: [0, Math.random() * 200 - 100],
                      y: [0, Math.random() * 100 - 50]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>
            )}

            {/* Header */}
            <div className={`${milestone.color} px-6 py-4 text-white relative`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{messages.celebration}</h3>
                    <p className="text-sm opacity-90">{messages.title}</p>
                  </div>
                </div>
                
                <button
                  onClick={onDismiss}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{milestone.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {isPortuguese ? 'Progresso' : 'Progress'}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {milestone.value}/{milestone.threshold}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((milestone.value / milestone.threshold) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${milestone.color} rounded-full`}
                  />
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Navigate to relevant page based on milestone type
                  if (milestone.type === 'connections') {
                    window.location.href = '/my-network'
                  } else if (milestone.type === 'events') {
                    window.location.href = '/events'
                  }
                }}
                className={`w-full ${milestone.color} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}
              >
                {milestone.type === 'connections' && (isPortuguese ? 'Ver A Minha Rede' : 'View My Network')}
                {milestone.type === 'events' && (isPortuguese ? 'Ver Eventos' : 'View Events')}
                {milestone.type === 'achievements' && (isPortuguese ? 'Ver Conquistas' : 'View Achievements')}
                {milestone.type === 'cultural' && (isPortuguese ? 'Continuar Explorando' : 'Keep Exploring')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}