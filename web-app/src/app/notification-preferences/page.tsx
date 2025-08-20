'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import NotificationPreferences from '@/components/NotificationPreferences'
import WhatsAppNotificationWidget from '@/components/notifications/WhatsAppNotificationWidget'
import { useLanguage } from '@/context/LanguageContext'
import { useNotifications } from '@/context/NotificationContext'
import { 
  BellIcon, 
  Cog6ToothIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function NotificationPreferencesPage() {
  const { language, t } = useLanguage()
  const { analytics, preferences } = useNotifications()
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSavePreferences = async () => {
    setSaveStatus('saving')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const insightCards = analytics ? [
    {
      title: language === 'pt' ? 'Taxa de Leitura' : 'Read Rate',
      value: `${Math.round(analytics.readRate)}%`,
      color: analytics.readRate >= 80 ? 'text-secondary-600' : analytics.readRate >= 60 ? 'text-accent-600' : 'text-action-600',
      bgColor: analytics.readRate >= 80 ? 'bg-secondary-50' : analytics.readRate >= 60 ? 'bg-accent-50' : 'bg-action-50',
      icon: '📖'
    },
    {
      title: language === 'pt' ? 'Engajamento' : 'Engagement',
      value: `${analytics.engagementScore}%`,
      color: analytics.engagementScore >= 80 ? 'text-secondary-600' : analytics.engagementScore >= 60 ? 'text-accent-600' : 'text-action-600',
      bgColor: analytics.engagementScore >= 80 ? 'bg-secondary-50' : analytics.engagementScore >= 60 ? 'bg-accent-50' : 'bg-action-50',
      icon: '📊'
    },
    {
      title: language === 'pt' ? 'Total de Notificações' : 'Total Notifications',
      value: analytics.totalNotifications.toString(),
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      icon: '🔔'
    },
    {
      title: language === 'pt' ? 'Canal Mais Eficaz' : 'Most Effective Channel',
      value: language === 'pt' ? 'SMS' : 'SMS',
      color: 'text-premium-600',
      bgColor: 'bg-premium-50',
      icon: '📱'
    }
  ] : []

  return (
    <div className="min-h-screen bg-neutral-50">
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="container-width py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <BellIcon className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {language === 'pt' ? 'Preferências de Notificação' : 'Notification Preferences'}
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Personalize como recebe atualizações da comunidade portuguesa em Londres & Reino Unido'
                  : 'Customize how you receive updates from the Portuguese community in the U.K. & UK'
                }
              </p>
            </motion.div>
          </div>
        </div>

        {/* Analytics Insights */}
        {analytics && (
          <div className="container-width py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                {language === 'pt' ? 'Os Seus Insights de Notificação' : 'Your Notification Insights'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {insightCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className={`${card.bgColor} rounded-lg p-6 text-center`}
                  >
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <div className={`text-3xl font-bold ${card.color} mb-2`}>
                      {card.value}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {card.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Notification Preferences */}
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NotificationPreferences />
          </motion.div>
        </div>

        {/* Portuguese Community Features */}
        <div className="container-width py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                🇵🇹 {language === 'pt' ? 'Funcionalidades da Comunidade Portuguesa' : 'Portuguese Community Features'}
              </h2>
              <p className="text-lg text-neutral-600">
                {language === 'pt' 
                  ? 'Descubra notificações especializadas para a nossa comunidade em Londres & Reino Unido'
                  : 'Discover specialized notifications for our community in the U.K. & UK'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cultural Events */}
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {language === 'pt' ? 'Eventos Culturais' : 'Cultural Events'}
                </h3>
                <p className="text-sm text-neutral-600">
                  {language === 'pt' 
                    ? 'Noites de Fado, festivais portugueses, celebrações tradicionais'
                    : 'Fado nights, Portuguese festivals, traditional celebrations'
                  }
                </p>
              </div>

              {/* Business Networking */}
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {language === 'pt' ? 'Networking Empresarial' : 'Business Networking'}
                </h3>
                <p className="text-sm text-neutral-600">
                  {language === 'pt' 
                    ? 'Oportunidades de negócio, parcerias, eventos profissionais'
                    : 'Business opportunities, partnerships, professional events'
                  }
                </p>
              </div>

              {/* Heritage Preservation */}
              <div className="text-center">
                <div className="w-16 h-16 bg-premium-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {language === 'pt' ? 'Património Cultural' : 'Cultural Heritage'}
                </h3>
                <p className="text-sm text-neutral-600">
                  {language === 'pt' 
                    ? 'Preservação cultural, histórias da comunidade, tradições'
                    : 'Cultural preservation, community stories, traditions'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Actions */}
        <div className="container-width py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {language === 'pt' ? 'Guardar Preferências' : 'Save Preferences'}
                </h3>
                <p className="text-sm text-neutral-600">
                  {language === 'pt' 
                    ? 'As suas preferências são guardadas automaticamente'
                    : 'Your preferences are saved automatically'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {saveStatus === 'saved' && (
                  <div className="flex items-center space-x-2 text-secondary-600">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="text-sm">
                      {language === 'pt' ? 'Guardado' : 'Saved'}
                    </span>
                  </div>
                )}
                
                {saveStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-action-600">
                    <ExclamationTriangleIcon className="h-5 w-5" />
                    <span className="text-sm">
                      {language === 'pt' ? 'Erro ao guardar' : 'Error saving'}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSavePreferences}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Cog6ToothIcon className="h-4 w-4" />
                  <span>
                    {saveStatus === 'saving' 
                      ? (language === 'pt' ? 'A guardar...' : 'Saving...')
                      : (language === 'pt' ? 'Guardar' : 'Save')
                    }
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* WhatsApp Widget */}
      <WhatsAppNotificationWidget />

      <Footer />
    </div>
  )
}