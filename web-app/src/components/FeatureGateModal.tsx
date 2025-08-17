'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { getMembershipTierConfig } from '@/lib/supabase'

interface FeatureGateModalProps {
  isOpen: boolean
  onClose: () => void
  feature: 'match' | 'message' | 'premium_event' | 'livestream'
  currentUsage: number
  limit: number
}

export default function FeatureGateModal({
  isOpen,
  onClose,
  feature,
  currentUsage,
  limit
}: FeatureGateModalProps) {
  const { language } = useLanguage()
  const { membershipTier, createSubscription, getRemainingMatches, getRemainingMessages } = useSubscription()
  const [isUpgrading, setIsUpgrading] = useState(false)
  
  const isPortuguese = language === 'pt'

  const getFeatureInfo = () => {
    switch (feature) {
      case 'match':
        return {
          title: isPortuguese ? 'Limite de Matches Atingido' : 'Match Limit Reached',
          description: isPortuguese 
            ? `Você usou ${currentUsage} de ${limit} matches diários disponíveis.`
            : `You've used ${currentUsage} of ${limit} daily matches available.`,
          icon: StarIcon,
          upgradeFeature: isPortuguese ? 'Matches ilimitados' : 'Unlimited matches'
        }
      case 'message':
        return {
          title: isPortuguese ? 'Limite de Mensagens Atingido' : 'Message Limit Reached',
          description: isPortuguese 
            ? `Você usou ${currentUsage} de ${limit} mensagens mensais disponíveis.`
            : `You've used ${currentUsage} of ${limit} monthly messages available.`,
          icon: StarIcon,
          upgradeFeature: isPortuguese ? 'Mensagens ilimitadas' : 'Unlimited messages'
        }
      case 'premium_event':
        return {
          title: isPortuguese ? 'Evento Premium Bloqueado' : 'Premium Event Locked',
          description: isPortuguese 
            ? 'Este evento é exclusivo para membros premium.'
            : 'This event is exclusive to premium members.',
          icon: StarIcon,
          upgradeFeature: isPortuguese ? 'Acesso a eventos premium' : 'Premium event access'
        }
      case 'livestream':
        return {
          title: isPortuguese ? 'Livestream Bloqueado' : 'Livestream Locked',
          description: isPortuguese 
            ? 'O acesso a livestreams requer uma assinatura premium.'
            : 'Livestream access requires a premium subscription.',
          icon: StarIcon,
          upgradeFeature: isPortuguese ? 'Acesso completo a livestreams' : 'Full livestream access'
        }
      default:
        return {
          title: isPortuguese ? 'Funcionalidade Bloqueada' : 'Feature Locked',
          description: isPortuguese ? 'Esta funcionalidade requer upgrade.' : 'This feature requires an upgrade.',
          icon: StarIcon,
          upgradeFeature: isPortuguese ? 'Acesso completo' : 'Full access'
        }
    }
  }

  const featureInfo = getFeatureInfo()
  const IconComponent = featureInfo.icon

  const recommendedTiers = [
    { tier: 'professional', name: isPortuguese ? 'Profissional' : 'Professional' },
    { tier: 'business', name: isPortuguese ? 'Negócios' : 'Business' },
    { tier: 'vip', name: 'VIP' }
  ]

  const handleUpgrade = async (tier: any) => {
    setIsUpgrading(true)
    try {
      await createSubscription(tier, 'yearly')
      onClose()
    } catch (error) {
      console.error('Error upgrading subscription:', error)
    } finally {
      setIsUpgrading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {featureInfo.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  {featureInfo.description}
                </p>
                
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {isPortuguese ? 'Desbloqueie com upgrade:' : 'Unlock with upgrade:'}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <CheckCircleIcon className="w-4 h-4" />
                    {featureInfo.upgradeFeature}
                  </div>
                </div>

                {/* Current Stats */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>{isPortuguese ? 'Matches restantes hoje:' : 'Matches remaining today:'}</span>
                      <span className="font-medium">{getRemainingMatches() === -1 ? '' : getRemainingMatches()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isPortuguese ? 'Mensagens restantes este mês:' : 'Messages remaining this month:'}</span>
                      <span className="font-medium">{getRemainingMessages() === -1 ? '' : getRemainingMessages()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upgrade Options */}
              <div className="space-y-3">
                {recommendedTiers.map((tierOption) => {
                  const config = getMembershipTierConfig(tierOption.tier as any)
                  const price = config.yearlyPrice / 100
                  
                  return (
                    <button
                      key={tierOption.tier}
                      onClick={() => handleUpgrade(tierOption.tier)}
                      disabled={isUpgrading}
                      className="w-full p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{tierOption.name}</div>
                          <div className="text-sm text-gray-500">£{price}/year</div>
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isPortuguese ? 'Continuar com plano atual' : 'Continue with current plan'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}