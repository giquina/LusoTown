'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CrownIcon,
  TruckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  HomeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  XMarkIcon,
  GiftIcon,
  StarIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface ConversionOpportunity {
  id: string
  type: 'subscription_upgrade' | 'service_upsell' | 'engagement_boost' | 'retention_play' | 'referral_incentive'
  priority: 'high' | 'medium' | 'low'
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  value: string
  valuePortuguese: string
  incentive?: string
  incentivePortuguese?: string
  icon: any
  color: string
  cta: {
    primary: string
    primaryPortuguese: string
    href: string
  }
  secondary?: {
    text: string
    textPortuguese: string
    href: string
  }
  conditions: {
    userSegment: string[]
    activityThreshold?: number
    timeOnPlatform?: number
    previousActions?: string[]
    excludeIfHas?: string[]
  }
  timing: {
    showAfter: number
    expiresAfter?: number
    cooldownPeriod?: number
  }
  metrics: {
    conversionRate?: number
    averageValue?: number
    userLifetimeValue?: number
  }
}

interface ConversionOptimizationEngineProps {
  currentPage: string
  userActivity: string[]
  userSegment: 'new' | 'active' | 'engaged' | 'premium' | 'dormant'
  onConversion?: (opportunityId: string, conversionType: string, value: number) => void
}

export default function ConversionOptimizationEngine({
  currentPage,
  userActivity,
  userSegment,
  onConversion
}: ConversionOptimizationEngineProps) {
  const { language } = useLanguage()
  const { stats, connections } = useNetworking()
  const [activeOpportunities, setActiveOpportunities] = useState<ConversionOpportunity[]>([])
  const [dismissedOpportunities, setDismissedOpportunities] = useState<string[]>([])
  const [conversionHistory, setConversionHistory] = useState<any[]>([])

  const isPortuguese = language === 'pt'

  // Define conversion opportunities with Portuguese cultural context
  const opportunities: ConversionOpportunity[] = [
    {
      id: 'premium-upgrade-transport-user',
      type: 'subscription_upgrade',
      priority: 'high',
      title: 'Unlock Unlimited Transport Booking',
      titlePortuguese: 'Desbloqueie Reservas Ilimitadas de Transporte',
      description: 'You\'ve shown interest in our transport services! Upgrade to premium for unlimited booking, priority scheduling, and exclusive Portuguese driver network access.',
      descriptionPortuguese: 'Demonstrou interesse nos nossos serviços de transporte! Atualize para premium para reservas ilimitadas, agendamento prioritário e acesso exclusivo à rede de motoristas portugueses.',
      value: 'From £19.99/month - Portuguese community access',
      valuePortuguese: 'A partir de £19.99/mês - Acesso à comunidade portuguesa',
      incentive: '20% off first booking + VIP status',
      incentivePortuguese: '20% desconto na primeira reserva + estatuto VIP',
      icon: TruckIcon,
      color: 'primary',
      cta: {
        primary: 'Upgrade to Premium',
        primaryPortuguese: 'Atualizar para Premium',
        href: '/subscription?source=transport'
      },
      secondary: {
        text: 'Learn More',
        textPortuguese: 'Saber Mais',
        href: '/premium'
      },
      conditions: {
        userSegment: ['active', 'engaged'],
        previousActions: ['viewed_transport', 'started_booking'],
        excludeIfHas: ['premium_subscription']
      },
      timing: {
        showAfter: 5000,
        expiresAfter: 300000, // 5 minutes
        cooldownPeriod: 86400000 // 24 hours
      },
      metrics: {
        conversionRate: 15.2,
        averageValue: 25,
        userLifetimeValue: 150
      }
    },
    {
      id: 'networking-to-premium',
      type: 'subscription_upgrade',
      priority: 'high',
      title: 'Enhance Your Portuguese Network',
      titlePortuguese: 'Melhore a Sua Rede Portuguesa',
      description: 'You\'re building great connections! Premium membership unlocks advanced networking features, mentorship access, and exclusive business events.',
      descriptionPortuguese: 'Está a construir ótimas conexões! A subscrição premium desbloqueia funcionalidades avançadas de networking, acesso a mentoria e eventos empresariais exclusivos.',
      value: 'Professional growth investment',
      valuePortuguese: 'Investimento em crescimento profissional',
      incentive: 'First month free + exclusive networking events',
      incentivePortuguese: 'Primeiro mês grátis + eventos de networking exclusivos',
      icon: UserGroupIcon,
      color: 'secondary',
      cta: {
        primary: 'Unlock Premium Networking',
        primaryPortuguese: 'Desbloquear Networking Premium',
        href: '/subscription?source=networking'
      },
      conditions: {
        userSegment: ['active', 'engaged'],
        activityThreshold: 3, // connections made
        excludeIfHas: ['premium_subscription']
      },
      timing: {
        showAfter: 8000,
        cooldownPeriod: 172800000 // 48 hours
      },
      metrics: {
        conversionRate: 22.8,
        averageValue: 25,
        userLifetimeValue: 180
      }
    },
    {
      id: 'student-special-offer',
      type: 'subscription_upgrade',
      priority: 'high',
      title: 'Student Special: 50% Off Premium',
      titlePortuguese: 'Especial Estudante: 50% Desconto Premium',
      description: 'Portuguese student in the UK? Get premium access to mentorship, career events, and transport services at student-friendly pricing.',
      descriptionPortuguese: 'Estudante português no Reino Unido? Obtenha acesso premium a mentoria, eventos de carreira e serviços de transporte com preços amigáveis para estudantes.',
      value: 'Only £9.99/month (50% off)',
      valuePortuguese: 'Apenas £9.99/mês (50% desconto)',
      incentive: 'Career mentorship + exam transport',
      incentivePortuguese: 'Mentoria profissional + transporte para exames',
      icon: AcademicCapIcon,
      color: 'accent',
      cta: {
        primary: 'Claim Student Discount',
        primaryPortuguese: 'Reclamar Desconto de Estudante',
        href: '/subscription?discount=student'
      },
      conditions: {
        userSegment: ['new', 'active'],
        previousActions: ['indicated_student_status'],
        excludeIfHas: ['premium_subscription', 'student_discount_used']
      },
      timing: {
        showAfter: 3000,
        expiresAfter: 604800000 // 7 days
      },
      metrics: {
        conversionRate: 35.4,
        averageValue: 12.5,
        userLifetimeValue: 85
      }
    },
    {
      id: 'housing-assistance-upsell',
      type: 'service_upsell',
      priority: 'medium',
      title: 'Get Portuguese Community Housing Help',
      titlePortuguese: 'Obtenha Ajuda Habitacional da Comunidade Portuguesa',
      description: 'New to the UK? Our housing assistance program connects you with Portuguese speakers who can help with finding accommodation, understanding contracts, and local area advice.',
      descriptionPortuguese: 'Novo no Reino Unido? O nosso programa de assistência habitacional conecta-o com falantes de português que podem ajudar a encontrar acomodação, entender contratos e conselhos da área local.',
      value: 'Included with premium membership',
      valuePortuguese: 'Incluído na subscrição premium',
      icon: HomeIcon,
      color: 'coral',
      cta: {
        primary: 'Get Housing Help',
        primaryPortuguese: 'Obter Ajuda Habitacional',
        href: '/housing-assistance'
      },
      secondary: {
        text: 'Learn About Premium',
        textPortuguese: 'Saber Sobre Premium',
        href: '/premium'
      },
      conditions: {
        userSegment: ['new', 'active'],
        previousActions: ['indicated_housing_need', 'new_to_uk'],
        excludeIfHas: ['used_housing_assistance']
      },
      timing: {
        showAfter: 6000,
        cooldownPeriod: 259200000 // 72 hours
      },
      metrics: {
        conversionRate: 28.1,
        averageValue: 15,
        userLifetimeValue: 120
      }
    },
    {
      id: 'mentorship-program-engagement',
      type: 'engagement_boost',
      priority: 'medium',
      title: 'Connect with Portuguese Professionals',
      titlePortuguese: 'Conecte-se com Profissionais Portugueses',
      description: 'Advance your career with guidance from successful Portuguese professionals already established in the UK. Get industry insights, networking opportunities, and career advice.',
      descriptionPortuguese: 'Avance na sua carreira com orientação de profissionais portugueses bem-sucedidos já estabelecidos no Reino Unido. Obtenha insights da indústria, oportunidades de networking e conselhos profissionais.',
      value: 'Career acceleration',
      valuePortuguese: 'Aceleração profissional',
      incentive: 'Free consultation session',
      incentivePortuguese: 'Sessão de consulta gratuita',
      icon: AcademicCapIcon,
      color: 'premium',
      cta: {
        primary: 'Start Mentorship',
        primaryPortuguese: 'Iniciar Mentoria',
        href: '/mentorship'
      },
      conditions: {
        userSegment: ['active', 'engaged'],
        previousActions: ['indicated_professional_interest', 'attended_business_event'],
        excludeIfHas: ['active_mentorship']
      },
      timing: {
        showAfter: 10000,
        cooldownPeriod: 604800000 // 7 days
      },
      metrics: {
        conversionRate: 19.6,
        averageValue: 8,
        userLifetimeValue: 95
      }
    },
    {
      id: 'referral-reward-program',
      type: 'referral_incentive',
      priority: 'medium',
      title: 'Earn Rewards for Growing Our Community',
      titlePortuguese: 'Ganhe Recompensas por Fazer Crescer a Nossa Comunidade',
      description: 'Help fellow Portuguese speakers discover LusoTown! Earn service credits, exclusive event access, and community recognition for successful referrals.',
      descriptionPortuguese: 'Ajude outros falantes de português a descobrir o LusoTown! Ganhe créditos de serviços, acesso exclusivo a eventos e reconhecimento comunitário por indicações bem-sucedidas.',
      value: '£10 credit per successful referral',
      valuePortuguese: '£10 de crédito por cada indicação bem-sucedida',
      incentive: 'Bonus: 5 referrals = Premium upgrade',
      incentivePortuguese: 'Bónus: 5 indicações = Atualização Premium',
      icon: GiftIcon,
      color: 'accent',
      cta: {
        primary: 'Start Referring',
        primaryPortuguese: 'Começar a Indicar',
        href: '/referrals'
      },
      conditions: {
        userSegment: ['engaged', 'premium'],
        activityThreshold: 2, // attended events or used services
        excludeIfHas: ['active_referral_program']
      },
      timing: {
        showAfter: 15000,
        cooldownPeriod: 1209600000 // 14 days
      },
      metrics: {
        conversionRate: 12.4,
        averageValue: 35,
        userLifetimeValue: 200
      }
    },
    {
      id: 'cultural-event-bundle',
      type: 'service_upsell',
      priority: 'low',
      title: 'Portuguese Cultural Event Package',
      titlePortuguese: 'Pacote de Eventos Culturais Portugueses',
      description: 'Love Portuguese culture? Get priority access to all cultural events this season, including exclusive pre-event meetups and transport coordination.',
      descriptionPortuguese: 'Adora a cultura portuguesa? Obtenha acesso prioritário a todos os eventos culturais desta temporada, incluindo encontros exclusivos pré-evento e coordenação de transporte.',
      value: 'Save 30% on cultural events',
      valuePortuguese: 'Poupe 30% em eventos culturais',
      incentive: 'Free welcome dinner included',
      incentivePortuguese: 'Jantar de boas-vindas gratuito incluído',
      icon: HeartIcon,
      color: 'coral',
      cta: {
        primary: 'Get Event Package',
        primaryPortuguese: 'Obter Pacote de Eventos',
        href: '/events/packages'
      },
      conditions: {
        userSegment: ['active', 'engaged'],
        previousActions: ['attended_cultural_event', 'showed_cultural_interest'],
        excludeIfHas: ['cultural_package_active']
      },
      timing: {
        showAfter: 12000,
        cooldownPeriod: 2592000000 // 30 days
      },
      metrics: {
        conversionRate: 8.7,
        averageValue: 45,
        userLifetimeValue: 165
      }
    },
    {
      id: 'dormant-user-reactivation',
      type: 'retention_play',
      priority: 'high',
      title: 'We Miss You! Special Welcome Back Offer',
      titlePortuguese: 'Temos Saudades! Oferta Especial de Regresso',
      description: 'The Portuguese community has grown since you were last here! Come back and discover new events, connections, and services with this special offer.',
      descriptionPortuguese: 'A comunidade portuguesa cresceu desde a sua última visita! Volte e descubra novos eventos, conexões e serviços com esta oferta especial.',
      value: '30% off any service + bonus credits',
      valuePortuguese: '30% desconto em qualquer serviço + créditos bónus',
      incentive: 'Limited time: Expires in 48 hours',
      incentivePortuguese: 'Tempo limitado: Expira em 48 horas',
      icon: StarIcon,
      color: 'primary',
      cta: {
        primary: 'Welcome Me Back',
        primaryPortuguese: 'Dar-me as Boas-vindas de Volta',
        href: '/reactivation'
      },
      conditions: {
        userSegment: ['dormant'],
        timeOnPlatform: 2592000000, // 30 days since last activity
        excludeIfHas: ['reactivation_offer_used']
      },
      timing: {
        showAfter: 2000,
        expiresAfter: 172800000 // 48 hours
      },
      metrics: {
        conversionRate: 25.3,
        averageValue: 18,
        userLifetimeValue: 95
      }
    }
  ]

  // Load dismissed opportunities and conversion history
  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem('lusotown-dismissed-opportunities') || '[]')
    setDismissedOpportunities(dismissed)
    
    const history = JSON.parse(localStorage.getItem('lusotown-conversion-history') || '[]')
    setConversionHistory(history)
  }, [])

  // Evaluate and activate conversion opportunities
  useEffect(() => {
    const evaluateOpportunities = () => {
      const validOpportunities = opportunities.filter(opportunity => {
        // Skip if dismissed and within cooldown period
        const dismissalRecord = dismissedOpportunities.find(d => d.includes(opportunity.id))
        if (dismissalRecord) {
          const dismissalTime = parseInt(dismissalRecord.split(':')[1] || '0')
          const cooldownEnd = dismissalTime + (opportunity.timing.cooldownPeriod || 0)
          if (Date.now() < cooldownEnd) return false
        }

        // Check user segment match
        if (!opportunity.conditions.userSegment.includes(userSegment)) return false

        // Check exclude conditions
        if (opportunity.conditions.excludeIfHas) {
          const hasExcluded = opportunity.conditions.excludeIfHas.some(condition => {
            switch (condition) {
              case 'premium_subscription':
                return localStorage.getItem('lusotown-subscription-active') === 'true'
              case 'student_discount_used':
                return localStorage.getItem('lusotown-student-discount-used') === 'true'
              case 'used_housing_assistance':
                return localStorage.getItem('lusotown-housing-assistance-used') === 'true'
              case 'active_mentorship':
                return localStorage.getItem('lusotown-mentorship-active') === 'true'
              case 'active_referral_program':
                return localStorage.getItem('lusotown-referral-program-active') === 'true'
              case 'cultural_package_active':
                return localStorage.getItem('lusotown-cultural-package-active') === 'true'
              case 'reactivation_offer_used':
                return localStorage.getItem('lusotown-reactivation-offer-used') === 'true'
              default:
                return false
            }
          })
          if (hasExcluded) return false
        }

        // Check activity threshold (e.g., number of connections)
        if (opportunity.conditions.activityThreshold) {
          if (opportunity.id.includes('networking') && connections.length < opportunity.conditions.activityThreshold) {
            return false
          }
        }

        // Check previous actions
        if (opportunity.conditions.previousActions) {
          const completedActions = JSON.parse(localStorage.getItem('lusotown-completed-actions') || '[]')
          const hasRequiredActions = opportunity.conditions.previousActions.some(action =>
            completedActions.includes(action) || userActivity.includes(action)
          )
          if (!hasRequiredActions) return false
        }

        // Special conditions for dormant users
        if (opportunity.id === 'dormant-user-reactivation') {
          const lastActivity = localStorage.getItem('lusotown-last-activity')
          if (!lastActivity) return false
          const daysSinceActivity = (Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60 * 24)
          if (daysSinceActivity < 30) return false
        }

        return true
      })

      // Sort by priority and activate with timing
      const sortedOpportunities = validOpportunities.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })

      // Limit to top 2 opportunities to avoid overwhelming users
      const topOpportunities = sortedOpportunities.slice(0, 2)

      topOpportunities.forEach(opportunity => {
        setTimeout(() => {
          setActiveOpportunities(prev => {
            if (prev.find(op => op.id === opportunity.id)) return prev
            return [...prev, opportunity]
          })

          // Auto-expire if specified
          if (opportunity.timing.expiresAfter) {
            setTimeout(() => {
              setActiveOpportunities(prev => prev.filter(op => op.id !== opportunity.id))
            }, opportunity.timing.expiresAfter)
          }
        }, opportunity.timing.showAfter)
      })
    }

    evaluateOpportunities()
  }, [userSegment, userActivity, connections.length, dismissedOpportunities])

  const handleDismiss = (opportunityId: string) => {
    const dismissalRecord = `${opportunityId}:${Date.now()}`
    const newDismissed = [...dismissedOpportunities, dismissalRecord]
    setDismissedOpportunities(newDismissed)
    localStorage.setItem('lusotown-dismissed-opportunities', JSON.stringify(newDismissed))
    setActiveOpportunities(prev => prev.filter(op => op.id !== opportunityId))
  }

  const handleConversion = (opportunity: ConversionOpportunity) => {
    // Track conversion
    const conversion = {
      opportunityId: opportunity.id,
      type: opportunity.type,
      value: opportunity.metrics.averageValue || 0,
      timestamp: Date.now(),
      userSegment,
      currentPage
    }

    const newHistory = [...conversionHistory, conversion]
    setConversionHistory(newHistory)
    localStorage.setItem('lusotown-conversion-history', JSON.stringify(newHistory))

    // Mark relevant flags
    switch (opportunity.id) {
      case 'premium-upgrade-transport-user':
      case 'networking-to-premium':
        localStorage.setItem('lusotown-subscription-active', 'true')
        break
      case 'student-special-offer':
        localStorage.setItem('lusotown-student-discount-used', 'true')
        break
      case 'housing-assistance-upsell':
        localStorage.setItem('lusotown-housing-assistance-used', 'true')
        break
      case 'mentorship-program-engagement':
        localStorage.setItem('lusotown-mentorship-active', 'true')
        break
      case 'referral-reward-program':
        localStorage.setItem('lusotown-referral-program-active', 'true')
        break
      case 'cultural-event-bundle':
        localStorage.setItem('lusotown-cultural-package-active', 'true')
        break
      case 'dormant-user-reactivation':
        localStorage.setItem('lusotown-reactivation-offer-used', 'true')
        break
    }

    onConversion?.(opportunity.id, opportunity.type, conversion.value)
    setActiveOpportunities(prev => prev.filter(op => op.id !== opportunity.id))
  }

  if (activeOpportunities.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-40 space-y-4 max-w-sm">
      <AnimatePresence>
        {activeOpportunities.map((opportunity, index) => {
          const IconComponent = opportunity.icon
          
          return (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, x: 100, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: -20 }}
              transition={{ delay: index * 0.15, type: "spring", damping: 20 }}
              className={`bg-white rounded-2xl border-2 shadow-2xl p-6 backdrop-blur-sm ${
                opportunity.priority === 'high' 
                  ? `border-${opportunity.color}-200 shadow-${opportunity.color}-100` 
                  : 'border-gray-200'
              }`}
            >
              {/* Priority Badge */}
              {opportunity.priority === 'high' && (
                <div className="absolute -top-2 -left-2">
                  <div className={`bg-${opportunity.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                    {isPortuguese ? 'PRIORIDADE' : 'HIGH PRIORITY'}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${opportunity.color}-100`}>
                    <IconComponent className={`w-6 h-6 text-${opportunity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {isPortuguese ? opportunity.titlePortuguese : opportunity.title}
                    </h3>
                    <div className="text-xs text-gray-600 mt-1">
                      {isPortuguese ? opportunity.valuePortuguese : opportunity.value}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(opportunity.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Incentive Badge */}
              {opportunity.incentive && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <GiftIcon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">
                      {isPortuguese ? opportunity.incentivePortuguese : opportunity.incentive}
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {isPortuguese ? opportunity.descriptionPortuguese : opportunity.description}
              </p>

              {/* Conversion Rate Display for High-Priority Items */}
              {opportunity.priority === 'high' && opportunity.metrics.conversionRate && (
                <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                  <ChartBarIcon className="w-3 h-3" />
                  <span>
                    {opportunity.metrics.conversionRate}% {isPortuguese ? 'dos usuarios escolhem isto' : 'of users choose this'}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={opportunity.cta.href}
                  onClick={() => handleConversion(opportunity)}
                  className={`block w-full text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl bg-gradient-to-r from-${opportunity.color}-500 to-${opportunity.color}-600 text-white hover:from-${opportunity.color}-600 hover:to-${opportunity.color}-700`}
                >
                  {isPortuguese ? opportunity.cta.primaryPortuguese : opportunity.cta.primary}
                </a>

                {opportunity.secondary && (
                  <a
                    href={opportunity.secondary.href}
                    className="block w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {isPortuguese ? opportunity.secondary.textPortuguese : opportunity.secondary.text}
                  </a>
                )}
              </div>

              {/* Urgency/Expiry Indicator */}
              {opportunity.timing.expiresAfter && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-amber-600">
                    <ClockIcon className="w-3 h-3" />
                    <span>
                      {isPortuguese ? 'Oferta por tempo limitado' : 'Limited time offer'}
                    </span>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                    <span>{isPortuguese ? 'Verificado' : 'Verified'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-500" />
                    <span>4.8/5 {isPortuguese ? 'satisfação' : 'satisfaction'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}