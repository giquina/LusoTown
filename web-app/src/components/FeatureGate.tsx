'use client'

import { ReactNode } from 'react'
import { useSubscription } from '@/context/SubscriptionContext'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  ExclamationTriangleIcon,
  LockClosedIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { formatPrice, plans } from '@/config/pricing'

interface FeatureGateProps {
  children: ReactNode
  feature: 'match' | 'message' | 'premium_event' | 'livestream'
  fallback?: ReactNode
  showUsageInfo?: boolean
}

export default function FeatureGate({ 
  children, 
  feature, 
  fallback,
  showUsageInfo = true 
}: FeatureGateProps) {
  const {
    canSendMessage,
    canCreateMatch,
    canAccessPremiumEvent,
    canAccessLivestream,
    getRemainingMatches,
    getRemainingMessages,
    hasActiveSubscription,
    membershipTier,
    createSubscription
  } = useSubscription()
  
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  // Check if user can access this feature
  const canAccess = () => {
    switch (feature) {
      case 'match': return canCreateMatch()
      case 'message': return canSendMessage()
      case 'premium_event': return canAccessPremiumEvent()
      case 'livestream': return canAccessLivestream()
      default: return false
    }
  }

  // Get remaining usage info
  const getUsageInfo = () => {
    switch (feature) {
      case 'match':
        const remainingMatches = getRemainingMatches()
        return {
          remaining: remainingMatches,
          unit: isPortuguese ? 'matches hoje' : 'matches today',
          icon: HeartIcon
        }
      case 'message':
        const remainingMessages = getRemainingMessages()
        return {
          remaining: remainingMessages,
          unit: isPortuguese ? 'mensagens este mês' : 'messages this month',
          icon: ChatBubbleLeftRightIcon
        }
      case 'premium_event':
        return {
          remaining: 0,
          unit: isPortuguese ? 'eventos premium' : 'premium events',
          icon: CalendarIcon
        }
      case 'livestream':
        return {
          remaining: membershipTier === 'ambassador' ? 5 : 0,
          unit: isPortuguese ? 'horas de streaming' : 'streaming hours',
          icon: PlayIcon
        }
      default:
        return { remaining: 0, unit: '', icon: LockClosedIcon }
    }
  }

  const getFeatureName = () => {
    switch (feature) {
      case 'match': return isPortuguese ? 'Match' : 'Match'
      case 'message': return isPortuguese ? 'Mensagem' : 'Message'
      case 'premium_event': return isPortuguese ? 'Evento Premium' : 'Premium Event'
      case 'livestream': return isPortuguese ? 'Streaming' : 'Streaming'
      default: return isPortuguese ? 'Funcionalidade' : 'Feature'
    }
  }

  const getRequiredTier = () => {
    switch (feature) {
      case 'match':
      case 'message':
        return 'community'
      case 'premium_event':
        return 'ambassador'
      case 'livestream':
        return 'ambassador'
      default:
        return 'community'
    }
  }

  // If user can access the feature, show it
  if (canAccess()) {
    return <>{children}</>
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>
  }

  // Default blocked state with upgrade prompt
  const usageInfo = getUsageInfo()
  const IconComponent = usageInfo.icon
  const requiredTier = getRequiredTier()
  const requiredPlan = plans[requiredTier as keyof typeof plans]

  const handleUpgrade = async () => {
    await createSubscription(requiredTier as 'community' | 'ambassador')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <LockClosedIcon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {isPortuguese ? `${getFeatureName()} Bloqueado` : `${getFeatureName()} Blocked`}
      </h3>

      {showUsageInfo && usageInfo.remaining !== -1 && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <IconComponent className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">
            {usageInfo.remaining} {usageInfo.unit} {isPortuguese ? 'restantes' : 'remaining'}
          </span>
        </div>
      )}

      <p className="text-gray-700 mb-6">
        {feature === 'match' && !hasActiveSubscription && (
          isPortuguese 
            ? 'Atingiu o limite diário de 2 matches. Upgrade para matches ilimitados.'
            : 'You\'ve reached your daily limit of 2 matches. Upgrade for unlimited matches.'
        )}
        {feature === 'message' && !hasActiveSubscription && (
          isPortuguese 
            ? 'Atingiu o limite mensal de 3 mensagens. Upgrade para mensagens ilimitadas.'
            : 'You\'ve reached your monthly limit of 3 messages. Upgrade for unlimited messaging.'
        )}
        {feature === 'premium_event' && (
          isPortuguese 
            ? 'Esta é uma funcionalidade premium. Requer upgrade para Embaixador Cultural.'
            : 'This is a premium feature. Requires upgrade to Cultural Ambassador.'
        )}
        {feature === 'livestream' && (
          isPortuguese 
            ? 'Acesso a streaming requer Embaixador Cultural (5h/mês).'
            : 'Streaming access requires Cultural Ambassador (5h/month).'
        )}
      </p>

      {/* Upgrade Prompt */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <div className="text-2xl font-bold text-primary-600 mb-1">
          {formatPrice(requiredPlan.monthly)}
          <span className="text-base font-normal text-gray-600">
            {isPortuguese ? '/mês' : '/month'}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {requiredTier === 'community' 
            ? (isPortuguese ? 'Membro da Comunidade' : 'Community Member')
            : (isPortuguese ? 'Embaixador Cultural' : 'Cultural Ambassador')}
        </div>
      </div>

      {/* Benefits Preview */}
      <div className="text-left mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-center">
          {isPortuguese ? 'Benefícios incluídos:' : 'What\'s included:'}
        </h4>
        <div className="space-y-2">
          {requiredTier === 'community' ? [
            isPortuguese ? 'Matches ilimitados diários' : 'Unlimited daily matches',
            isPortuguese ? 'Mensagens ilimitadas' : 'Unlimited messaging',
            isPortuguese ? 'Perfil completo verificado' : 'Complete verified profile',
            isPortuguese ? 'Acesso ao diretório de empresas' : 'Business directory access'
          ] : [
            isPortuguese ? 'Tudo do Membro da Comunidade' : 'Everything in Community Member',
            isPortuguese ? 'Visibilidade prioritária' : 'Priority visibility',
            isPortuguese ? 'Criação de eventos básicos' : 'Basic event creation',
            isPortuguese ? '5h streaming por mês' : '5h streaming per month'
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleUpgrade}
        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-xl font-bold hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105"
      >
        {isPortuguese 
          ? `Upgrade para ${formatPrice(requiredPlan.monthly)}/mês`
          : `Upgrade for ${formatPrice(requiredPlan.monthly)}/month`}
      </button>

      <div className="mt-3 text-xs text-gray-500">
        {isPortuguese 
          ? 'Junte-se a 750+ portugueses que já fizeram upgrade'
          : 'Join Portuguese speakers who already upgraded'}
      </div>
    </motion.div>
  )
}