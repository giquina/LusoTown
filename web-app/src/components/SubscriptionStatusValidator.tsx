'use client'

import { useEffect, useState } from 'react'
import { useSubscription } from '@/context/SubscriptionContext'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  PlayIcon,
  ShieldCheckIcon,
  CrownIcon
} from '@heroicons/react/24/outline'

interface SubscriptionStatusValidatorProps {
  compact?: boolean
  showOnlyIssues?: boolean
  position?: 'top' | 'bottom' | 'inline'
}

interface FeatureStatus {
  name: string
  nameEn: string
  available: boolean
  usage?: {
    used: number
    limit: number
    unit: string
    unitEn: string
  }
  icon: typeof HeartIcon
  tier: 'free' | 'community' | 'ambassador'
}

export default function SubscriptionStatusValidator({
  compact = false,
  showOnlyIssues = false,
  position = 'inline'
}: SubscriptionStatusValidatorProps) {
  const {
    membershipTier,
    hasActiveSubscription,
    getRemainingMatches,
    getRemainingMessages,
    canSendMessage,
    canCreateMatch,
    canAccessPremiumEvent,
    canAccessLivestream,
    usageLimits
  } = useSubscription()

  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const [features, setFeatures] = useState<FeatureStatus[]>([])

  useEffect(() => {
    const remainingMatches = getRemainingMatches()
    const remainingMessages = getRemainingMessages()

    const featureStatuses: FeatureStatus[] = [
      {
        name: 'Matches Diários',
        nameEn: 'Daily Matches',
        available: canCreateMatch(),
        usage: usageLimits.dailyMatches !== -1 ? {
          used: usageLimits.dailyMatches - (remainingMatches === -1 ? 0 : remainingMatches),
          limit: usageLimits.dailyMatches,
          unit: 'hoje',
          unitEn: 'today'
        } : undefined,
        icon: HeartIcon,
        tier: membershipTier === 'none' ? 'free' : membershipTier
      },
      {
        name: 'Mensagens',
        nameEn: 'Messaging',
        available: canSendMessage(),
        usage: usageLimits.monthlyMessages !== -1 ? {
          used: usageLimits.monthlyMessages - (remainingMessages === -1 ? 0 : remainingMessages),
          limit: usageLimits.monthlyMessages,
          unit: 'este mês',
          unitEn: 'this month'
        } : undefined,
        icon: ChatBubbleLeftRightIcon,
        tier: membershipTier === 'none' ? 'free' : membershipTier
      },
      {
        name: 'Eventos Premium',
        nameEn: 'Premium Events',
        available: canAccessPremiumEvent(),
        icon: CalendarIcon,
        tier: 'ambassador'
      },
      {
        name: 'Streaming',
        nameEn: 'Streaming',
        available: canAccessLivestream(),
        usage: membershipTier === 'ambassador' ? {
          used: 0, // Would track actual usage
          limit: 5,
          unit: 'horas/mês',
          unitEn: 'hours/month'
        } : undefined,
        icon: PlayIcon,
        tier: 'ambassador'
      }
    ]

    setFeatures(featureStatuses)
  }, [
    canCreateMatch, canSendMessage, canAccessPremiumEvent, canAccessLivestream,
    getRemainingMatches, getRemainingMessages, membershipTier, usageLimits
  ])

  const getTierIcon = (tier: 'free' | 'community' | 'ambassador') => {
    switch (tier) {
      case 'free': return ShieldCheckIcon
      case 'community': return HeartIcon
      case 'ambassador': return CrownIcon
      default: return ShieldCheckIcon
    }
  }

  const getTierName = (tier: 'free' | 'community' | 'ambassador') => {
    switch (tier) {
      case 'free': return isPortuguese ? 'Gratuito' : 'Free'
      case 'community': return isPortuguese ? 'Comunidade' : 'Community'
      case 'ambassador': return isPortuguese ? 'Embaixador' : 'Ambassador'
      default: return isPortuguese ? 'Básico' : 'Basic'
    }
  }

  const getTierColor = (tier: 'free' | 'community' | 'ambassador') => {
    switch (tier) {
      case 'free': return 'text-gray-600 bg-gray-100'
      case 'community': return 'text-primary-600 bg-primary-100'
      case 'ambassador': return 'text-premium-600 bg-premium-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (feature: FeatureStatus) => {
    if (!feature.available) return XCircleIcon
    if (feature.usage && feature.usage.used >= feature.usage.limit) return ExclamationTriangleIcon
    return CheckCircleIcon
  }

  const getStatusColor = (feature: FeatureStatus) => {
    if (!feature.available) return 'text-red-500'
    if (feature.usage && feature.usage.used >= feature.usage.limit) return 'text-yellow-500'
    return 'text-green-500'
  }

  // Filter features if showOnlyIssues is true
  const displayFeatures = showOnlyIssues 
    ? features.filter(f => !f.available || (f.usage && f.usage.used >= f.usage.limit))
    : features

  if (displayFeatures.length === 0 && showOnlyIssues) {
    return null
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'sticky top-4 z-30'
      case 'bottom':
        return 'fixed bottom-4 left-4 right-4 z-30'
      default:
        return ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: position === 'bottom' ? 50 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${getPositionClasses()} max-w-2xl ${position === 'inline' ? 'w-full' : 'mx-auto'}`}
    >
      <div className={`bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg ${compact ? 'p-4' : 'p-6'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getTierColor(membershipTier === 'none' ? 'free' : membershipTier)}`}>
              {(() => {
                const TierIcon = getTierIcon(membershipTier === 'none' ? 'free' : membershipTier)
                return <TierIcon className="w-5 h-5" />
              })()}
            </div>
            <div>
              <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'} text-gray-900`}>
                {isPortuguese ? 'Status da Subscrição' : 'Subscription Status'}
              </h3>
              <p className="text-sm text-gray-600">
                {getTierName(membershipTier === 'none' ? 'free' : membershipTier)} •{' '}
                {hasActiveSubscription 
                  ? (isPortuguese ? 'Ativo' : 'Active')
                  : (isPortuguese ? 'Gratuito' : 'Free')
                }
              </p>
            </div>
          </div>
          
          {!compact && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              hasActiveSubscription 
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {hasActiveSubscription 
                ? (isPortuguese ? 'Premium' : 'Premium')
                : (isPortuguese ? 'Gratuito' : 'Free')
              }
            </div>
          )}
        </div>

        {/* Features Status */}
        <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {displayFeatures.map((feature, index) => {
            const StatusIcon = getStatusIcon(feature)
            const FeatureIcon = feature.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  feature.available 
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                } ${compact ? 'text-sm' : ''}`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FeatureIcon className={`w-4 h-4 flex-shrink-0 ${
                    feature.available ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {isPortuguese ? feature.name : feature.nameEn}
                    </div>
                    {feature.usage && !compact && (
                      <div className="text-xs text-gray-600">
                        {feature.usage.used}/{feature.usage.limit} {
                          isPortuguese ? feature.usage.unit : feature.usage.unitEn
                        }
                      </div>
                    )}
                  </div>
                </div>
                <StatusIcon className={`w-4 h-4 flex-shrink-0 ${getStatusColor(feature)}`} />
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        {!hasActiveSubscription && !compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {isPortuguese ? 'Precisa de mais acesso?' : 'Need more access?'}
              </span>
              <a
                href="/subscription"
                className="bg-primary-600 text-white px-3 py-1 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {isPortuguese ? 'Upgrade' : 'Upgrade'}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}