'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  Play,
  Crown,
  Zap,
  TrendingUp,
  AlertTriangle,
  Check,
  Lock
} from 'lucide-react'

interface UsageLimitIndicatorProps {
  feature: 'matches' | 'messages' | 'events' | 'livestream'
  size?: 'compact' | 'standard' | 'detailed'
  showUpgradeButton?: boolean
  onUpgradeClick?: () => void
}

export function UsageLimitIndicator({ 
  feature, 
  size = 'standard', 
  showUpgradeButton = true,
  onUpgradeClick 
}: UsageLimitIndicatorProps) {
  const { language } = useLanguage()
  const { 
    usageLimits, 
    usage,
    membershipTier,
    getRemainingMatches,
    getRemainingMessages,
    canCreateMatch,
    canSendMessage,
    canAccessPremiumEvent,
    canAccessLivestream
  } = useSubscription()

  const translations = {
    en: {
      matches: {
        title: 'Daily Matches',
        remaining: 'remaining today',
        unlimited: 'Unlimited matches',
        upgradeMsg: 'Upgrade for unlimited matches',
        resetTime: 'Resets at midnight'
      },
      messages: {
        title: 'Monthly Messages', 
        remaining: 'remaining this month',
        unlimited: 'Unlimited messaging',
        upgradeMsg: 'Upgrade for unlimited messaging',
        resetTime: 'Resets monthly'
      },
      events: {
        title: 'Premium Events',
        remaining: 'events available',
        unlimited: 'Unlimited event access',
        upgradeMsg: 'Upgrade to access premium events',
        resetTime: 'Premium member feature'
      },
      livestream: {
        title: 'Livestream Hours',
        remaining: 'hours remaining',
        unlimited: 'Unlimited streaming',
        upgradeMsg: 'Upgrade for streaming access',
        resetTime: 'Monthly allocation'
      },
      upgrade: 'Upgrade Now',
      unlocked: 'Unlocked'
    },
    pt: {
      matches: {
        title: 'Matches Diários',
        remaining: 'restantes hoje',
        unlimited: 'Matches ilimitados',
        upgradeMsg: 'Upgrade para matches ilimitados',
        resetTime: 'Reinicia à meia-noite'
      },
      messages: {
        title: 'Mensagens Mensais',
        remaining: 'restantes este mês',
        unlimited: 'Mensagens ilimitadas',
        upgradeMsg: 'Upgrade para mensagens ilimitadas',
        resetTime: 'Reinicia mensalmente'
      },
      events: {
        title: 'Eventos Premium',
        remaining: 'eventos disponíveis',
        unlimited: 'Acesso ilimitado a eventos',
        upgradeMsg: 'Upgrade para aceder a eventos premium',
        resetTime: 'Funcionalidade de membro premium'
      },
      livestream: {
        title: 'Horas de Transmissão',
        remaining: 'horas restantes',
        unlimited: 'Transmissão ilimitada',
        upgradeMsg: 'Upgrade para acesso a transmissão',
        resetTime: 'Alocação mensal'
      },
      upgrade: 'Fazer Upgrade',
      unlocked: 'Desbloqueado'
    }
  }

  const t = translations[language][feature]

  // Get feature-specific data
  const getFeatureData = () => {
    switch (feature) {
      case 'matches':
        const remainingMatches = getRemainingMatches()
        return {
          current: usageLimits.dailyMatches === -1 ? 0 : (usageLimits.dailyMatches - remainingMatches),
          limit: usageLimits.dailyMatches,
          remaining: remainingMatches,
          canUse: canCreateMatch(),
          icon: Heart,
          color: 'coral',
          isUnlimited: usageLimits.dailyMatches === -1
        }
      case 'messages':
        const remainingMessages = getRemainingMessages()
        return {
          current: usageLimits.monthlyMessages === -1 ? 0 : (usageLimits.monthlyMessages - remainingMessages),
          limit: usageLimits.monthlyMessages,
          remaining: remainingMessages,
          canUse: canSendMessage(),
          icon: MessageCircle,
          color: 'primary',
          isUnlimited: usageLimits.monthlyMessages === -1
        }
      case 'events':
        return {
          current: usage?.premiumEventsUsed || 0,
          limit: usageLimits.premiumEvents,
          remaining: usageLimits.premiumEvents === -1 ? -1 : Math.max(0, usageLimits.premiumEvents - (usage?.premiumEventsUsed || 0)),
          canUse: canAccessPremiumEvent(),
          icon: Calendar,
          color: 'secondary',
          isUnlimited: usageLimits.premiumEvents === -1
        }
      case 'livestream':
        return {
          current: usage?.livestreamHoursUsed || 0,
          limit: usageLimits.livestreamHours,
          remaining: usageLimits.livestreamHours === -1 ? -1 : Math.max(0, usageLimits.livestreamHours - (usage?.livestreamHoursUsed || 0)),
          canUse: canAccessLivestream(),
          icon: Play,
          color: 'premium',
          isUnlimited: usageLimits.livestreamHours === -1
        }
      default:
        return null
    }
  }

  const featureData = getFeatureData()
  if (!featureData) return null

  const { current, limit, remaining, canUse, icon: Icon, color, isUnlimited } = featureData
  const progress = limit > 0 ? (current / limit) * 100 : 0
  const isNearLimit = progress > 80
  const isAtLimit = remaining === 0 && limit > 0

  // Compact size for inline usage
  if (size === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 text-${color}-500`} />
        <div className="flex items-center gap-1">
          {isUnlimited ? (
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <Check className="h-3 w-3" />
              {t.unlocked}
            </span>
          ) : (
            <>
              <span className={`text-sm font-medium ${isAtLimit ? 'text-red-600' : 'text-neutral-900'}`}>
                {remaining}
              </span>
              <span className="text-xs text-neutral-600">
                {t.remaining}
              </span>
            </>
          )}
        </div>
      </div>
    )
  }

  // Detailed size for dashboard/settings pages
  if (size === 'detailed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl p-6 border-2 ${
          isAtLimit ? 'border-red-200 bg-red-50' : 
          isNearLimit ? 'border-orange-200 bg-orange-50' : 
          `border-${color}-200 bg-${color}-50`
        } shadow-sm`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full bg-${color}-100`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{t.title}</h3>
              <p className="text-sm text-neutral-600">{t.resetTime}</p>
            </div>
          </div>
          
          {isUnlimited && (
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <Crown className="h-3 w-3" />
              Premium
            </div>
          )}
        </div>

        {isUnlimited ? (
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-green-600 mb-1">{t.unlimited}</div>
            <div className="text-sm text-green-700">{t.unlocked} ✨</div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">
                  {current} / {limit} used
                </span>
                <span className={`text-sm font-medium ${
                  isAtLimit ? 'text-red-600' : 
                  isNearLimit ? 'text-orange-600' : 
                  'text-neutral-600'
                }`}>
                  {remaining} {t.remaining}
                </span>
              </div>
              
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-2 rounded-full ${
                    isAtLimit ? 'bg-red-500' :
                    isNearLimit ? 'bg-orange-500' :
                    `bg-${color}-500`
                  }`}
                />
              </div>
            </div>

            {(isAtLimit || isNearLimit) && showUpgradeButton && (
              <div className="bg-white rounded-lg p-4 border border-neutral-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 ${isAtLimit ? 'text-red-500' : 'text-orange-500'} mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900 mb-2">
                      {isAtLimit ? 'Limit reached!' : 'Running low'}
                    </p>
                    <p className="text-xs text-neutral-600 mb-3">
                      {t.upgradeMsg}
                    </p>
                    <button
                      onClick={onUpgradeClick}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Crown className="h-4 w-4" />
                      {t.upgrade}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    )
  }

  // Standard size (default)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-lg p-4 border ${
        isAtLimit ? 'border-red-200' : 
        isNearLimit ? 'border-orange-200' : 
        'border-neutral-200'
      } shadow-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 text-${color}-500`} />
          <span className="font-medium text-neutral-900">{t.title}</span>
        </div>
        
        {isUnlimited && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <Check className="h-4 w-4" />
            {t.unlocked}
          </div>
        )}
      </div>

      {isUnlimited ? (
        <div className="text-center py-2">
          <div className="text-lg font-bold text-green-600">{t.unlimited}</div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-neutral-900">{remaining}</span>
            <span className="text-sm text-neutral-600">{t.remaining}</span>
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-1.5 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className={`h-1.5 rounded-full ${
                isAtLimit ? 'bg-red-500' :
                isNearLimit ? 'bg-orange-500' :
                `bg-${color}-500`
              }`}
            />
          </div>
          
          <div className="text-xs text-neutral-500 mb-3">{t.resetTime}</div>
          
          {isAtLimit && showUpgradeButton && (
            <button
              onClick={onUpgradeClick}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <Crown className="h-4 w-4" />
              {t.upgrade}
            </button>
          )}
        </>
      )}
    </motion.div>
  )
}

// Usage Dashboard Component
export function UsageDashboard() {
  const { language } = useLanguage()
  const { membershipTier, usageLimits } = useSubscription()

  const translations = {
    en: {
      title: 'Your Usage',
      subtitle: 'Track your LusoTown community activity',
      tierInfo: {
        free: 'Free Account - Limited Features',
        community: 'Community Member - Premium Access', 
        ambassador: 'Cultural Ambassador - Full Access'
      }
    },
    pt: {
      title: 'A Sua Utilização',
      subtitle: 'Acompanhe a sua atividade na comunidade LusoTown',
      tierInfo: {
        free: 'Conta Gratuita - Funcionalidades Limitadas',
        community: 'Membro da Comunidade - Acesso Premium',
        ambassador: 'Embaixador Cultural - Acesso Completo'
      }
    }
  }

  const t = translations[language]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t.title}</h2>
        <p className="text-neutral-600">{t.subtitle}</p>
        <div className="mt-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            membershipTier === 'free' ? 'bg-neutral-100 text-neutral-700' :
            membershipTier === 'community' ? 'bg-primary-100 text-primary-800' :
            'bg-secondary-100 text-secondary-800'
          }`}>
            {membershipTier === 'ambassador' && <Crown className="h-4 w-4" />}
            {t.tierInfo[membershipTier]}
          </span>
        </div>
      </div>

      {/* Usage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UsageLimitIndicator feature="matches" size="detailed" />
        <UsageLimitIndicator feature="messages" size="detailed" />
        <UsageLimitIndicator feature="events" size="detailed" />
        <UsageLimitIndicator feature="livestream" size="detailed" />
      </div>
    </div>
  )
}

// Inline usage indicators for forms/buttons
export function InlineUsageCheck({ feature }: { feature: 'matches' | 'messages' | 'events' | 'livestream' }) {
  const { language } = useLanguage()
  const subscription = useSubscription()

  let canUse = false
  switch (feature) {
    case 'matches':
      canUse = subscription.canCreateMatch()
      break
    case 'messages':
      canUse = subscription.canSendMessage()
      break
    case 'events':
      canUse = subscription.canAccessPremiumEvent()
      break
    case 'livestream':
      canUse = subscription.canAccessLivestream()
      break
  }
  
  if (canUse) return null

  return (
    <div className="flex items-center gap-2 text-red-600 text-sm">
      <Lock className="h-4 w-4" />
      <span>
        {language === 'pt' ? 'Limite atingido' : 'Limit reached'}
      </span>
    </div>
  )
}