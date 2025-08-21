'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExclamationTriangleIcon, 
  ClockIcon, 
  HeartIcon, 
  ChatBubbleLeftRightIcon,
  CrownIcon,
  FireIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { plans, formatPrice } from '@/config/pricing'

interface UsageLimitIndicatorProps {
  type: 'matches' | 'messages' | 'both'
  position?: 'top' | 'bottom' | 'floating'
  showUpgradePrompt?: boolean
  compact?: boolean
}

export default function UsageLimitIndicator({ 
  type, 
  position = 'top',
  showUpgradePrompt = true,
  compact = false 
}: UsageLimitIndicatorProps) {
  const { language } = useLanguage()
  const { 
    hasActiveSubscription, 
    getRemainingMatches, 
    getRemainingMessages,
    createSubscription,
    usageLimits
  } = useSubscription()
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [lastAlertShown, setLastAlertShown] = useState<string | null>(null)
  const [pulseAnimation, setPulseAnimation] = useState(false)
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low')
  
  const isPortuguese = language === 'pt'
  const remainingMatches = getRemainingMatches()
  const remainingMessages = getRemainingMessages()
  
  // Calculate urgency level
  useEffect(() => {
    let level: 'low' | 'medium' | 'high' | 'critical' = 'low'
    
    if (type === 'matches' || type === 'both') {
      if (remainingMatches === 0) level = 'critical'
      else if (remainingMatches === 1) level = 'high'
      else if (remainingMatches <= 2) level = 'medium'
    }
    
    if (type === 'messages' || type === 'both') {
      if (remainingMessages === 0) level = 'critical'
      else if (remainingMessages <= 1) level = 'high'
      else if (remainingMessages <= 2) level = 'medium'
    }
    
    setUrgencyLevel(level)
    
    // Trigger pulse animation for high urgency
    if (level === 'high' || level === 'critical') {
      setPulseAnimation(true)
      const timer = setTimeout(() => setPulseAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [remainingMatches, remainingMessages, type])

  // Auto-show upgrade modal for critical situations
  useEffect(() => {
    if (urgencyLevel === 'critical' && showUpgradePrompt) {
      const currentAlert = `${type}-${remainingMatches}-${remainingMessages}`
      if (currentAlert !== lastAlertShown) {
        setShowUpgradeModal(true)
        setLastAlertShown(currentAlert)
      }
    }
  }, [urgencyLevel, type, remainingMatches, remainingMessages, lastAlertShown, showUpgradePrompt])

  // Don't show for premium users
  if (hasActiveSubscription) return null

  const getUrgencyConfig = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          borderColor: 'border-red-600',
          icon: ExclamationTriangleIcon,
          pulse: true,
          message: isPortuguese ? 'LIMITE ATINGIDO!' : 'LIMIT REACHED!'
        }
      case 'high':
        return {
          bgColor: 'bg-orange-500',
          textColor: 'text-white',
          borderColor: 'border-orange-600',
          icon: ExclamationTriangleIcon,
          pulse: true,
          message: isPortuguese ? 'QUASE NO LIMITE!' : 'ALMOST AT LIMIT!'
        }
      case 'medium':
        return {
          bgColor: 'bg-yellow-500',
          textColor: 'text-white',
          borderColor: 'border-yellow-600',
          icon: ClockIcon,
          pulse: false,
          message: isPortuguese ? 'Limite Próximo' : 'Limit Approaching'
        }
      default:
        return {
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          borderColor: 'border-blue-600',
          icon: ClockIcon,
          pulse: false,
          message: isPortuguese ? 'Uso Normal' : 'Normal Usage'
        }
    }
  }

  const urgencyConfig = getUrgencyConfig()
  const IconComponent = urgencyConfig.icon

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'fixed bottom-4 left-4 right-4 z-40'
      case 'floating':
        return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40'
      default:
        return 'sticky top-20 z-30 mx-4'
    }
  }

  const formatTimeUntilReset = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const msUntilReset = tomorrow.getTime() - now.getTime()
    const hoursUntilReset = Math.floor(msUntilReset / (1000 * 60 * 60))
    const minutesUntilReset = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hoursUntilReset}h ${minutesUntilReset}m`
  }

  const handleUpgrade = async () => {
    await createSubscription('community')
    setShowUpgradeModal(false)
  }

  const shouldShow = () => {
    if (urgencyLevel === 'low' && !compact) return false
    return true
  }

  if (!shouldShow()) return null

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${getPositionClasses()} max-w-md mx-auto`}
      >
        <motion.div
          animate={pulseAnimation ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: pulseAnimation ? Infinity : 0 }}
          className={`
            ${urgencyConfig.bgColor} ${urgencyConfig.textColor} 
            rounded-xl p-3 sm:p-4 shadow-lg border-2 ${urgencyConfig.borderColor}
            ${compact ? 'px-3 py-2' : ''}
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <IconComponent className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0 ${urgencyConfig.pulse ? 'animate-pulse' : ''}`} />
              
              <div className="flex-1 min-w-0">
                {!compact && (
                  <div className={`font-bold ${compact ? 'text-xs' : 'text-sm'} mb-1`}>
                    {urgencyConfig.message}
                  </div>
                )}
                
                <div className={`${compact ? 'text-xs' : 'text-sm'} leading-tight`}>
                  {type === 'matches' && (
                    <span>
                      {isPortuguese 
                        ? `${remainingMatches} matches restantes hoje`
                        : `${remainingMatches} matches left today`}
                    </span>
                  )}
                  
                  {type === 'messages' && (
                    <span>
                      {isPortuguese 
                        ? `${remainingMessages} mensagens restantes`
                        : `${remainingMessages} messages left`}
                    </span>
                  )}
                  
                  {type === 'both' && (
                    <span>
                      {isPortuguese 
                        ? `${remainingMatches} matches • ${remainingMessages} msgs`
                        : `${remainingMatches} matches • ${remainingMessages} msgs`}
                    </span>
                  )}
                </div>
                
                {!compact && urgencyLevel !== 'critical' && (
                  <div className="text-xs opacity-80 mt-1">
                    {type === 'matches' && (
                      <span>
                        {isPortuguese 
                          ? `Reinicia em ${formatTimeUntilReset()}`
                          : `Resets in ${formatTimeUntilReset()}`}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {showUpgradePrompt && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className={`
                  bg-white/20 hover:bg-white/30 px-2 sm:px-3 py-1 sm:py-2 rounded-lg 
                  font-semibold transition-all flex-shrink-0
                  ${compact ? 'text-xs px-2 py-1' : 'text-sm'}
                  hover:scale-105 transform
                `}
              >
                {compact ? '↑' : (isPortuguese ? 'Upgrade' : 'Upgrade')}
              </button>
            )}
          </div>
          
          {!compact && urgencyLevel === 'critical' && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  {isPortuguese 
                    ? 'Upgrade para continuar'
                    : 'Upgrade to continue'}
                </div>
                <div className="text-xs font-bold">
                  {formatPrice(plans.community.monthly)}/mês
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${urgencyConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {urgencyLevel === 'critical' 
                    ? (isPortuguese ? 'Limite Atingido!' : 'Limit Reached!')
                    : (isPortuguese ? 'Quase no Limite!' : 'Almost at Limit!')}
                </h3>
                
                <p className="text-gray-700 mb-6">
                  {urgencyLevel === 'critical' 
                    ? (isPortuguese 
                        ? 'Não pode criar mais matches ou enviar mensagens hoje. Faça upgrade para acesso ilimitado!'
                        : 'You can\'t create more matches or send messages today. Upgrade for unlimited access!')
                    : (isPortuguese 
                        ? 'Está quase a atingir o seu limite diário. Faça upgrade para continuar a conectar-se!'
                        : 'You\'re almost at your daily limit. Upgrade to keep connecting!')}
                </p>

                {/* Benefits Preview */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
                  <h4 className="font-bold text-primary-900 mb-3">
                    {isPortuguese ? 'Com Premium obtém:' : 'With Premium you get:'}
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        icon: HeartIcon,
                        text: isPortuguese ? 'Matches ilimitados diários' : 'Unlimited daily matches'
                      },
                      {
                        icon: ChatBubbleLeftRightIcon,
                        text: isPortuguese ? 'Mensagens ilimitadas' : 'Unlimited messaging'
                      },
                      {
                        icon: FireIcon,
                        text: isPortuguese ? 'Prioridade nos matches' : 'Priority in matching'
                      },
                      {
                        icon: CrownIcon,
                        text: isPortuguese ? 'Acesso a eventos VIP' : 'VIP events access'
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircleIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-primary-600 text-white rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                      {formatPrice(plans.community.monthly)}
                      <span className="text-lg font-normal">/mês</span>
                    </div>
                    <div className="text-primary-100 text-sm">
                      {isPortuguese ? 'Membro da Comunidade' : 'Community Member'}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleUpgrade}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-xl font-bold hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105"
                  >
                    {isPortuguese ? 'Upgrade Agora' : 'Upgrade Now'}
                  </button>
                  
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                  >
                    {urgencyLevel === 'critical' 
                      ? (isPortuguese ? 'Voltar amanhã' : 'Come back tomorrow')
                      : (isPortuguese ? 'Continuar com limites' : 'Continue with limits')}
                  </button>
                </div>

                {/* Social Proof */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  {isPortuguese 
                    ? '750+ portugueses já fizeram upgrade para acesso ilimitado'
                    : '750+ Portuguese speakers already upgraded to unlimited access'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}