'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon,
  UserGroupIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface PostEventCheckinProps {
  eventId: string
  eventTitle: string
  eventDate: string
  expectedConnections?: number
  onClose?: () => void
}

export default function PostEventCheckin({ 
  eventId, 
  eventTitle, 
  eventDate,
  expectedConnections = 0,
  onClose 
}: PostEventCheckinProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const { markEventAttended } = useNetworking()
  
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm')
  const [newConnections, setNewConnections] = useState(0)

  const handleConfirmAttendance = async () => {
    setStep('processing')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock connection creation based on expected connections
    const actualConnections = Math.min(expectedConnections, Math.floor(Math.random() * 3) + 1)
    setNewConnections(actualConnections)
    
    await markEventAttended(eventId)
    setStep('success')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-md w-full mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {step === 'confirm' && (isPortuguese ? 'Confirmar Participação' : 'Confirm Attendance')}
            {step === 'processing' && (isPortuguese ? 'Processando...' : 'Processing...')}
            {step === 'success' && (isPortuguese ? 'Participação Confirmada!' : 'Attendance Confirmed!')}
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Event Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{eventTitle}</h4>
              <p className="text-sm text-gray-600">{formatDate(eventDate)}</p>
            </div>

            {/* Expected Connections */}
            {expectedConnections > 0 && (
              <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <UserGroupIcon className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-primary-700">
                    {isPortuguese 
                      ? `${expectedConnections} falantes de português também participaram`
                      : `${expectedConnections} Portuguese speakers also attended`
                    }
                  </p>
                  <p className="text-xs text-primary-600">
                    {isPortuguese 
                      ? 'Confirme a sua participação para se conectar!'
                      : 'Confirm your attendance to connect!'
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Confirmation Message */}
            <p className="text-gray-600 text-sm">
              {isPortuguese 
                ? 'Confirme que participou neste evento para fazer novas conexões com outros falantes de português.'
                : 'Confirm that you attended this event to make new connections with other Portuguese speakers.'
              }
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleConfirmAttendance}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5" />
                {isPortuguese ? 'Sim, Participei' : 'Yes, I Attended'}
              </button>
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {isPortuguese ? 'Cancelar' : 'Cancel'}
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'A criar conexões com outros participantes...'
                : 'Creating connections with other attendees...'
              }
            </p>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircleSolidIcon className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Participação Confirmada!' : 'Attendance Confirmed!'}
              </h4>
              
              {newConnections > 0 ? (
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">
                    {isPortuguese 
                      ? `🎉 ${newConnections} nova${newConnections > 1 ? 's' : ''} conexã${newConnections > 1 ? 'ões' : 'o'}!`
                      : `🎉 ${newConnections} new connection${newConnections > 1 ? 's' : ''}!`
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {isPortuguese 
                      ? 'Visite "A Minha Rede" para conhecer as suas novas conexões.'
                      : 'Visit "My Network" to see your new connections.'
                    }
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">
                  {isPortuguese 
                    ? 'Obrigado por confirmar a sua participação!'
                    : 'Thank you for confirming your attendance!'
                  }
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {newConnections > 0 && (
                <a
                  href="/my-network"
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2.5 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium text-center"
                >
                  {isPortuguese ? 'Ver A Minha Rede' : 'View My Network'}
                </a>
              )}
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {isPortuguese ? 'Fechar' : 'Close'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}