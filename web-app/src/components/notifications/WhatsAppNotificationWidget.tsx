'use client'

import { useState, useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { ChatBubbleLeftRightIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppNotificationWidgetProps {
  className?: string
  autoShow?: boolean
}

export default function WhatsAppNotificationWidget({ 
  className = '', 
  autoShow = true 
}: WhatsAppNotificationWidgetProps) {
  const { 
    preferences, 
    updatePreferences, 
    addNotification,
    getChannelSettings 
  } = useNotifications()
  const { language } = useLanguage()
  const { hasActiveSubscription, membershipTier } = useSubscription()
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [hasOptedIn, setHasOptedIn] = useState(false)

  useEffect(() => {
    // Load WhatsApp opt-in status
    const optInStatus = localStorage.getItem('lusotown-whatsapp-optin')
    const savedPhoneNumber = localStorage.getItem('lusotown-whatsapp-phone')
    
    if (optInStatus === 'true' && savedPhoneNumber) {
      setHasOptedIn(true)
      setPhoneNumber(savedPhoneNumber)
    }

    // Show widget automatically for premium members who haven't opted in
    if (autoShow && hasActiveSubscription && !hasOptedIn) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000) // Show after 5 seconds
      
      return () => clearTimeout(timer)
    }
  }, [autoShow, hasActiveSubscription, hasOptedIn])

  const handleOptIn = async () => {
    if (!phoneNumber.trim()) return

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      addNotification({
        type: 'system_update',
        category: 'system',
        title: language === 'pt' ? 'Número Inválido' : 'Invalid Number',
        message: language === 'pt' ? 'Por favor, insira um número de telefone válido' : 'Please enter a valid phone number',
        userId: 'current-user',
        priority: 'medium'
      })
      return
    }

    // Save opt-in status
    localStorage.setItem('lusotown-whatsapp-optin', 'true')
    localStorage.setItem('lusotown-whatsapp-phone', phoneNumber)
    setHasOptedIn(true)

    // Update notification preferences
    if (preferences) {
      const whatsappSettings = getChannelSettings('whatsapp')
      await updatePreferences({
        whatsapp: {
          ...whatsappSettings,
          enabled: true,
          categories: {
            ...whatsappSettings.categories,
            community: true,
            services: true,
            transport: true,
            heritage: true
          }
        }
      })
    }

    // Send confirmation notification
    addNotification({
      type: 'subscription_update',
      category: 'system',
      title: language === 'pt' ? 'WhatsApp Ativado' : 'WhatsApp Enabled',
      message: language === 'pt' 
        ? 'Receberá atualizações da comunidade portuguesa via WhatsApp'
        : 'You\'ll receive Portuguese community updates via WhatsApp',
      userId: 'current-user',
      priority: 'medium',
      actionUrl: '/notification-preferences',
      actionLabel: language === 'pt' ? 'Configurar' : 'Configure'
    })

    setIsVisible(false)
  }

  const handleOptOut = () => {
    localStorage.removeItem('lusotown-whatsapp-optin')
    localStorage.removeItem('lusotown-whatsapp-phone')
    setHasOptedIn(false)
    setPhoneNumber('')
    
    // Update preferences
    if (preferences) {
      const whatsappSettings = getChannelSettings('whatsapp')
      updatePreferences({
        whatsapp: {
          ...whatsappSettings,
          enabled: false
        }
      })
    }

    addNotification({
      type: 'subscription_update',
      category: 'system',
      title: language === 'pt' ? 'WhatsApp Desativado' : 'WhatsApp Disabled',
      message: language === 'pt' 
        ? 'Não receberá mais atualizações via WhatsApp'
        : 'You won\'t receive WhatsApp updates anymore',
      userId: 'current-user',
      priority: 'low'
    })
  }

  if (!hasActiveSubscription) {
    return null // Only show for premium members
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && !hasOptedIn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className={`fixed bottom-4 right-4 z-50 ${className}`}
          >
            <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-6 max-w-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="h-6 w-6 text-secondary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      🇵🇹 {language === 'pt' ? 'Comunidade WhatsApp' : 'WhatsApp Community'}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {language === 'pt' 
                        ? 'Junte-se à nossa comunidade portuguesa'
                        : 'Join our Portuguese community'
                      }
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-neutral-700">
                  {language === 'pt' 
                    ? 'Receba atualizações exclusivas da comunidade portuguesa em Londres via WhatsApp:'
                    : 'Get exclusive Portuguese community updates in the U.K. via WhatsApp:'
                  }
                </p>
                
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>• {language === 'pt' ? 'Eventos culturais urgentes' : 'Urgent cultural events'}</li>
                  <li>• {language === 'pt' ? 'Atualizações de transporte' : 'Transport updates'}</li>
                  <li>• {language === 'pt' ? 'Oportunidades de negócio' : 'Business opportunities'}</li>
                  <li>• {language === 'pt' ? 'Suporte da comunidade' : 'Community support'}</li>
                </ul>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {language === 'pt' ? 'Número de WhatsApp' : 'WhatsApp Number'}
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={language === 'pt' ? '+44 7XXX XXXXXX' : '+44 7XXX XXXXXX'}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleOptIn}
                    disabled={!phoneNumber.trim()}
                    className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'pt' ? 'Ativar WhatsApp' : 'Enable WhatsApp'}
                  </button>

                  <p className="text-xs text-neutral-500 text-center">
                    {language === 'pt' 
                      ? 'Pode cancelar a qualquer momento nas configurações'
                      : 'You can unsubscribe anytime in settings'
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Status Indicator for opted-in users */}
      {hasOptedIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <div className="bg-secondary-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-secondary-700 transition-colors group"
               onClick={() => setIsExpanded(!isExpanded)}>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-400 rounded-full animate-pulse"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-neutral-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                {language === 'pt' ? 'WhatsApp Ativo' : 'WhatsApp Active'}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 w-64"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {language === 'pt' ? 'WhatsApp Ativo' : 'WhatsApp Active'}
                  </h4>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-neutral-600">
                      {language === 'pt' ? 'Número:' : 'Number:'}
                    </span>
                    <span className="font-mono text-neutral-900 ml-1">{phoneNumber}</span>
                  </div>
                  
                  <div>
                    <span className="text-neutral-600">
                      {language === 'pt' ? 'Status:' : 'Status:'}
                    </span>
                    <span className="text-secondary-600 font-medium ml-1">
                      {language === 'pt' ? 'Ativo' : 'Active'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-200">
                    <button
                      onClick={handleOptOut}
                      className="text-xs text-action-600 hover:text-action-700"
                    >
                      {language === 'pt' ? 'Desativar WhatsApp' : 'Disable WhatsApp'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  )
}