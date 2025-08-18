'use client'

import React, { useState, useEffect } from 'react'
import { plans, formatPrice } from '@/config/pricing'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Crown, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  X,
  Calendar,
  Zap
} from 'lucide-react'

interface TrialCountdownProps {
  position?: 'header' | 'sidebar' | 'modal' | 'banner'
  showDetails?: boolean
  onUpgrade?: () => void
  dismissible?: boolean
}

export default function TrialCountdown({ 
  position = 'header',
  showDetails = false,
  onUpgrade,
  dismissible = false
}: TrialCountdownProps) {
  const { language } = useLanguage()
  const { 
    trial, 
    isInTrial, 
    trialDaysRemaining, 
    createSubscription,
    markTrialAsUsed 
  } = useSubscription()
  
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate precise time remaining
  useEffect(() => {
    if (!trial || !isInTrial) return

    const updateTimer = () => {
      const now = new Date().getTime()
      const trialEnd = new Date(trial.trial_end).getTime()
      const difference = trialEnd - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [trial, isInTrial])

  const handleUpgrade = async (tier: 'community' | 'ambassador') => {
    try {
      await createSubscription(tier)
      if (onUpgrade) onUpgrade()
    } catch (error) {
      console.error('Upgrade error:', error)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isInTrial || !isVisible) return null

  const translations = {
    en: {
      trialActive: 'Free Trial Active',
      timeRemaining: 'Time Remaining',
      days: 'days',
      hours: 'hours', 
      minutes: 'mins',
      seconds: 'secs',
      upgradeNow: 'Upgrade Now',
      continueWith: 'Continue with Community',
      ambassadorUpgrade: 'Upgrade to Ambassador',
      trialEnding: 'Trial ending soon!',
      trialEndingSoon: 'Your free trial ends in less than 24 hours',
      enjoyingTrial: 'Enjoying your trial?',
      upgradeToKeep: 'Upgrade to keep unlimited access to Portuguese community features',
      features: {
        unlimited: 'Unlimited matches & messaging',
        events: 'Access to Portuguese cultural events',
        filters: 'Cultural compatibility matching',
        verification: 'Profile verification badge'
      },
      dismiss: 'Dismiss'
    },
    pt: {
      trialActive: 'Teste Gratuito Ativo',
      timeRemaining: 'Tempo Restante',
      days: 'dias',
      hours: 'horas',
      minutes: 'mins',
      seconds: 'segs',
      upgradeNow: 'Fazer Upgrade',
      continueWith: 'Continuar com Comunidade',
      ambassadorUpgrade: 'Upgrade para Embaixador',
      trialEnding: 'Teste a terminar em breve!',
      trialEndingSoon: 'O seu teste gratuito termina em menos de 24 horas',
      enjoyingTrial: 'A gostar do seu teste?',
      upgradeToKeep: 'Faça upgrade para manter acesso ilimitado às funcionalidades da comunidade portuguesa',
      features: {
        unlimited: 'Matches e mensagens ilimitados',
        events: 'Acesso a eventos culturais portugueses',
        filters: 'Compatibilidade cultural',
        verification: 'Distintivo de perfil verificado'
      },
      dismiss: 'Dispensar'
    }
  }

  const t = translations[language]

  // Different layouts based on position
  if (position === 'banner') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">{t.trialActive}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4" />
                <span>
                  {timeLeft.days > 0 && `${timeLeft.days}${t.days} `}
                  {timeLeft.hours > 0 && `${timeLeft.hours}${t.hours} `}
                  {timeLeft.minutes}${t.minutes} {timeLeft.seconds}${t.seconds}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpgrade('community')}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                {t.upgradeNow}
              </button>
              
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (position === 'modal' && timeLeft.days <= 1) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                {t.trialEnding}
              </h3>
              
              <p className="text-neutral-600 mb-6">
                {t.trialEndingSoon}
              </p>
              
              {/* Time remaining display */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { value: timeLeft.days, label: t.days },
                    { value: timeLeft.hours, label: t.hours },
                    { value: timeLeft.minutes, label: t.minutes },
                    { value: timeLeft.seconds, label: t.seconds }
                  ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-2">
                      <div className="text-2xl font-bold text-orange-600">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-neutral-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Upgrade buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleUpgrade('community')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  {t.continueWith} {formatPrice(plans.community.monthly)}/mês
                </button>
                
                <button
                  onClick={() => handleUpgrade('ambassador')}
                  className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  {t.ambassadorUpgrade} {formatPrice(plans.ambassador.monthly)}/mês
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="w-full text-neutral-600 hover:text-neutral-900 py-2 font-medium transition-colors"
                >
                  {t.dismiss}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (position === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-5 w-5 text-primary-600" />
          <span className="font-semibold text-primary-900">{t.trialActive}</span>
        </div>
        
        <div className="text-sm text-primary-800 mb-3">
          <div className="font-medium mb-1">{t.timeRemaining}:</div>
          <div className="text-lg font-bold">
            {timeLeft.days > 0 && `${timeLeft.days} ${t.days}`}
            {timeLeft.days === 0 && `${timeLeft.hours}h ${timeLeft.minutes}m`}
          </div>
        </div>
        
        {showDetails && (
          <ul className="text-xs text-primary-700 mb-4 space-y-1">
            {Object.values(t.features).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        <button
          onClick={() => handleUpgrade('community')}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {t.upgradeNow}
        </button>
      </motion.div>
    )
  }

  // Default header position
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg border border-primary-200"
    >
      <Crown className="h-4 w-4 text-primary-600" />
      <span className="text-sm font-medium text-primary-900">
        {t.trialActive}: {timeLeft.days > 0 ? `${timeLeft.days} ${t.days}` : `${timeLeft.hours}h ${timeLeft.minutes}m`}
      </span>
      <button
        onClick={() => handleUpgrade('community')}
        className="ml-auto bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-md text-sm font-semibold transition-colors"
      >
        {t.upgradeNow}
      </button>
    </motion.div>
  )
}

// Trial Progress Component
export function TrialProgress() {
  const { language } = useLanguage()
  const { trial, isInTrial, trialDaysRemaining } = useSubscription()
  
  if (!isInTrial || !trial) return null

  const totalDays = 7
  const progress = ((totalDays - trialDaysRemaining) / totalDays) * 100

  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-900">
          {language === 'pt' ? 'Progresso do Teste' : 'Trial Progress'}
        </span>
        <span className="text-sm text-neutral-600">
          {language === 'pt' ? `${trialDaysRemaining} dias restantes` : `${trialDaysRemaining} days left`}
        </span>
      </div>
      
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-2 text-xs text-neutral-600 text-center">
        {language === 'pt' 
          ? `Dia ${totalDays - trialDaysRemaining} de ${totalDays}`
          : `Day ${totalDays - trialDaysRemaining} of ${totalDays}`
        }
      </div>
    </div>
  )
}