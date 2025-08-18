'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  CheckCircleIcon, 
  FireIcon, 
  ClockIcon, 
  UsersIcon,
  HeartIcon,
  StarIcon,
  CrownIcon,
  TrophyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { plans, formatPrice } from '@/config/pricing'

interface ConversionOptimizerProps {
  trigger: 'exit-intent' | 'time-based' | 'usage-limit' | 'match-success' | 'manual'
  context?: 'matches' | 'messaging' | 'events' | 'general'
  urgency?: 'low' | 'medium' | 'high' | 'critical'
  onClose?: () => void
  onConvert?: (tier: 'community' | 'ambassador') => void
}

export default function ConversionOptimizer({ 
  trigger, 
  context = 'general',
  urgency = 'medium',
  onClose,
  onConvert 
}: ConversionOptimizerProps) {
  const { language } = useLanguage()
  const { createSubscription, getRemainingMatches, getRemainingMessages } = useSubscription()
  const [isVisible, setIsVisible] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes for limited time offer
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [liveStats, setLiveStats] = useState({
    activeUsers: 147,
    recentSignups: 23,
    liveMatches: 8
  })
  
  const isPortuguese = language === 'pt'
  const remainingMatches = getRemainingMatches()
  const remainingMessages = getRemainingMessages()

  // Exit intent detection
  useEffect(() => {
    if (trigger === 'exit-intent') {
      let hasTriggered = false
      
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasTriggered) {
          hasTriggered = true
          setIsVisible(true)
        }
      }
      
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [trigger])

  // Time-based trigger
  useEffect(() => {
    if (trigger === 'time-based') {
      const timer = setTimeout(() => setIsVisible(true), 30000) // 30 seconds
      return () => clearTimeout(timer)
    }
  }, [trigger])

  // Usage limit trigger
  useEffect(() => {
    if (trigger === 'usage-limit') {
      if (remainingMatches <= 1 || remainingMessages <= 1) {
        setIsVisible(true)
      }
    }
  }, [trigger, remainingMatches, remainingMessages])

  // Countdown timer for urgency
  useEffect(() => {
    if (isVisible && urgency === 'critical') {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsVisible(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isVisible, urgency])

  // Live stats animation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setLiveStats(prev => ({
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
          recentSignups: prev.recentSignups + (Math.random() > 0.7 ? 1 : 0),
          liveMatches: prev.liveMatches + (Math.random() > 0.8 ? 1 : 0)
        }))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  // Testimonial rotation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % successStories.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleUpgrade = async (tier: 'community' | 'ambassador') => {
    await createSubscription(tier)
    onConvert?.(tier)
    setIsVisible(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getUrgencyContent = () => {
    switch (urgency) {
      case 'critical':
        return {
          badge: isPortuguese ? 'OFERTA LIMITADA' : 'LIMITED TIME',
          badgeColor: 'bg-red-500',
          title: isPortuguese ? 'Última Oportunidade!' : 'Last Chance!',
          subtitle: isPortuguese 
            ? `Esta oferta expira em ${formatTime(timeRemaining)}` 
            : `This offer expires in ${formatTime(timeRemaining)}`,
          discount: 25,
          pulse: true
        }
      case 'high':
        return {
          badge: isPortuguese ? 'POPULAR AGORA' : 'TRENDING NOW',
          badgeColor: 'bg-orange-500',
          title: isPortuguese ? 'Junte-se a 23 Pessoas Hoje!' : 'Join 23 People Today!',
          subtitle: isPortuguese 
            ? 'Mais de 50 portugueses inscreveram-se esta semana' 
            : 'Over 50 Portuguese speakers joined this week',
          discount: 15,
          pulse: true
        }
      case 'medium':
        return {
          badge: isPortuguese ? 'OFERTA ESPECIAL' : 'SPECIAL OFFER',
          badgeColor: 'bg-primary-500',
          title: isPortuguese ? 'Desconto Exclusivo' : 'Exclusive Discount',
          subtitle: isPortuguese 
            ? 'Para novos membros da comunidade portuguesa' 
            : 'For new Portuguese community members',
          discount: 10,
          pulse: false
        }
      default:
        return {
          badge: isPortuguese ? 'RECOMENDADO' : 'RECOMMENDED',
          badgeColor: 'bg-green-500',
          title: isPortuguese ? 'Plano Popular' : 'Popular Plan',
          subtitle: isPortuguese 
            ? 'Escolhido por 84% dos membros portugueses' 
            : 'Chosen by 84% of Portuguese members',
          discount: 0,
          pulse: false
        }
    }
  }

  const successStories = [
    {
      text: isPortuguese 
        ? '"Encontrei o meu grupo de amigos portugueses através do LusoTown. Agora temos jantares todas as semanas!"'
        : '"Found my Portuguese friend group through LusoTown. Now we have dinner every week!"',
      author: 'Sofia, 28, Stockwell',
      verified: true
    },
    {
      text: isPortuguese 
        ? '"Conheci o meu parceiro de negócios português aqui. Já abrimos uma pastelaria juntos!"'
        : '"Met my Portuguese business partner here. We\'ve already opened a pastry shop together!"',
      author: 'Miguel, 34, Camden',
      verified: true
    },
    {
      text: isPortuguese 
        ? '"Finalmente alguém que entende saudade! Casamos no próximo mês."'
        : '"Finally someone who understands saudade! Getting married next month."',
      author: 'Ana, 29, Vauxhall',
      verified: true
    }
  ]

  const urgencyContent = getUrgencyContent()
  const discountedPrice = urgencyContent.discount > 0 
    ? plans.community.monthly * (1 - urgencyContent.discount / 100)
    : plans.community.monthly

  const getContextContent = () => {
    switch (context) {
      case 'matches':
        return {
          icon: HeartIcon,
          title: isPortuguese ? 'Matches Ilimitados Esperando' : 'Unlimited Matches Awaiting',
          description: isPortuguese 
            ? 'Tem mais 156 portugueses compatíveis na sua área que quer conhecer!'
            : 'You have 156+ compatible Portuguese speakers in your area wanting to meet you!',
          cta: isPortuguese ? 'Ver Todos os Matches' : 'See All Matches'
        }
      case 'messaging':
        return {
          icon: UsersIcon,
          title: isPortuguese ? 'Conversas Ilimitadas' : 'Unlimited Conversations',
          description: isPortuguese 
            ? 'Sem limites de mensagens. Conecte-se profundamente com a comunidade portuguesa.'
            : 'No message limits. Connect deeply with the Portuguese community.',
          cta: isPortuguese ? 'Mensagens Ilimitadas' : 'Unlimited Messaging'
        }
      case 'events':
        return {
          icon: StarIcon,
          title: isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events',
          description: isPortuguese 
            ? 'Acesso VIP a 60+ eventos portugueses mensais em Londres.'
            : 'VIP access to 60+ monthly Portuguese events in London.',
          cta: isPortuguese ? 'Acesso VIP' : 'VIP Access'
        }
      default:
        return {
          icon: CrownIcon,
          title: isPortuguese ? 'Experiência Premium' : 'Premium Experience',
          description: isPortuguese 
            ? 'Tudo incluído para a melhor experiência na comunidade portuguesa.'
            : 'Everything included for the best Portuguese community experience.',
          cta: isPortuguese ? 'Upgrade Completo' : 'Full Upgrade'
        }
    }
  }

  const contextContent = getContextContent()
  const IconComponent = contextContent.icon

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className={`bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden ${urgencyContent.pulse ? 'animate-pulse' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Urgency Badge */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${urgencyContent.badgeColor} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg ${urgencyContent.pulse ? 'animate-bounce' : ''}`}>
            {urgencyContent.badge}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mt-4 mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <IconComponent className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">
              {urgencyContent.title}
            </h2>
            
            <p className="text-primary-700 mb-4">
              {urgencyContent.subtitle}
            </p>

            {/* Live Stats */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-semibold text-sm">
                  {isPortuguese ? 'Atividade em Tempo Real' : 'Live Activity'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <motion.div 
                    key={liveStats.activeUsers}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {liveStats.activeUsers}
                  </motion.div>
                  <div className="text-xs text-gray-600">
                    {isPortuguese ? 'Online agora' : 'Online now'}
                  </div>
                </div>
                <div>
                  <motion.div 
                    key={liveStats.recentSignups}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {liveStats.recentSignups}
                  </motion.div>
                  <div className="text-xs text-gray-600">
                    {isPortuguese ? 'Inscrições hoje' : 'Signups today'}
                  </div>
                </div>
                <div>
                  <motion.div 
                    key={liveStats.liveMatches}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {liveStats.liveMatches}
                  </motion.div>
                  <div className="text-xs text-gray-600">
                    {isPortuguese ? 'Matches agora' : 'Live matches'}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg text-primary-800 font-medium">
              {contextContent.description}
            </p>
          </div>

          {/* Social Proof */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <p className="text-gray-700 italic mb-2 text-sm">
                {successStories[currentTestimonial].text}
              </p>
              <div className="flex items-center justify-center gap-2">
                <cite className="text-xs text-gray-500">
                  — {successStories[currentTestimonial].author}
                </cite>
                {successStories[currentTestimonial].verified && (
                  <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 sm:p-6 mb-6 border-2 border-primary-200">
            <div className="text-center">
              {urgencyContent.discount > 0 && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg line-through text-gray-400">
                    {formatPrice(plans.community.monthly)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {urgencyContent.discount}% OFF
                  </span>
                </div>
              )}
              
              <div className="text-3xl font-bold text-primary-900 mb-2">
                {formatPrice(discountedPrice)}
                <span className="text-lg text-primary-600 font-normal">/month</span>
              </div>
              
              <div className="text-primary-700 mb-4">
                {isPortuguese ? 'Membro da Comunidade' : 'Community Member'}
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { text: isPortuguese ? 'Matches ilimitados' : 'Unlimited matches', icon: HeartIcon },
                  { text: isPortuguese ? 'Mensagens ilimitadas' : 'Unlimited messaging', icon: UsersIcon },
                  { text: isPortuguese ? 'Todos os eventos' : 'All events access', icon: StarIcon },
                  { text: isPortuguese ? 'Suporte prioritário' : 'Priority support', icon: TrophyIcon }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 leading-tight">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleUpgrade('community')}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {contextContent.cta}
            </button>
            
            <button
              onClick={() => handleUpgrade('ambassador')}
              className="w-full bg-gradient-to-r from-premium-600 to-premium-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-premium-700 hover:to-premium-800 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <CrownIcon className="w-5 h-5" />
                {isPortuguese 
                  ? `Embaixador Cultural - ${formatPrice(plans.ambassador.monthly)}/mês`
                  : `Cultural Ambassador - ${formatPrice(plans.ambassador.monthly)}/month`}
              </span>
            </button>

            <button
              onClick={handleClose}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
            >
              {isPortuguese ? 'Talvez mais tarde' : 'Maybe later'}
            </button>
          </div>

          {/* Portuguese Community Value */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <FireIcon className="w-3 h-3" />
              <span>
                {isPortuguese 
                  ? '750+ portugueses conectados • Londres & Reino Unido'
                  : '750+ Portuguese speakers connected • London & UK'}
              </span>
            </div>
          </div>

          {/* Urgency Timer */}
          {urgency === 'critical' && timeRemaining > 0 && (
            <div className="mt-4 text-center bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center justify-center gap-2">
                <ClockIcon className="w-4 h-4 text-red-600 animate-pulse" />
                <span className="text-red-800 font-semibold text-sm">
                  {isPortuguese 
                    ? `Oferta expira em ${formatTime(timeRemaining)}`
                    : `Offer expires in ${formatTime(timeRemaining)}`}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}