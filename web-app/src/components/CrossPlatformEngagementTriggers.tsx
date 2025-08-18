'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TruckIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  HomeIcon,
  AcademicCapIcon,
  StarIcon,
  ArrowRightIcon,
  XMarkIcon,
  SparklesIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface EngagementTrigger {
  id: string
  type: 'transport_to_events' | 'events_to_transport' | 'events_to_networking' | 'networking_to_premium' | 'premium_upsell' | 'cross_service_recommendation'
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  primaryAction: {
    text: string
    textPortuguese: string
    href: string
    style: 'primary' | 'secondary' | 'premium'
  }
  secondaryAction?: {
    text: string
    textPortuguese: string
    href: string
  }
  context: {
    sourceService: string
    targetService: string
    incentive?: string
    incentivePortuguese?: string
  }
  timing: {
    showAfter: number // milliseconds
    dismissAfter?: number // milliseconds
  }
  conditions: {
    pagePattern?: RegExp
    userActivity?: string[]
    previousActions?: string[]
    excludePages?: string[]
  }
}

interface CrossPlatformEngagementTriggersProps {
  currentPage: string
  userActivity: string[]
  onTriggerAction?: (triggerId: string, actionType: 'primary' | 'secondary' | 'dismiss') => void
}

export default function CrossPlatformEngagementTriggers({
  currentPage,
  userActivity,
  onTriggerAction
}: CrossPlatformEngagementTriggersProps) {
  const { language } = useLanguage()
  const { connections, stats } = useNetworking()
  const [activeTriggers, setActiveTriggers] = useState<EngagementTrigger[]>([])
  const [dismissedTriggers, setDismissedTriggers] = useState<string[]>([])

  const isPortuguese = language === 'pt'

  // Define engagement triggers with Portuguese cultural context
  const triggers: EngagementTrigger[] = [
    {
      id: 'transport-after-event-booking',
      type: 'events_to_transport',
      title: 'Need Transport to Your Event?',
      titlePortuguese: 'Precisa de Transporte para o Seu Evento?',
      description: 'Book our Portuguese-speaking driver service for safe, convenient travel to Portuguese cultural events across London.',
      descriptionPortuguese: 'Reserve o nosso serviço de motorista falante de português para viagens seguras e convenientes para eventos culturais portugueses por toda Londres.',
      icon: TruckIcon,
      primaryAction: {
        text: 'Book Transport',
        textPortuguese: 'Reservar Transporte',
        href: '/transport',
        style: 'primary'
      },
      secondaryAction: {
        text: 'Maybe Later',
        textPortuguese: 'Talvez Mais Tarde',
        href: '#'
      },
      context: {
        sourceService: 'events',
        targetService: 'transport',
        incentive: '15% off first booking',
        incentivePortuguese: '15% desconto na primeira reserva'
      },
      timing: {
        showAfter: 3000,
        dismissAfter: 15000
      },
      conditions: {
        pagePattern: /\/events\/[^\/]+$/,
        userActivity: ['viewed_event', 'added_to_calendar'],
        excludePages: ['/transport']
      }
    },
    {
      id: 'events-after-transport-booking',
      type: 'transport_to_events',
      title: 'Discover Portuguese Events',
      titlePortuguese: 'Descubra Eventos Portugueses',
      description: 'While you\'re planning transport, check out amazing Portuguese cultural events happening across London this month.',
      descriptionPortuguese: 'Enquanto planeia o transporte, veja os incríveis eventos culturais portugueses acontecendo por Londres este mês.',
      icon: CalendarDaysIcon,
      primaryAction: {
        text: 'Browse Events',
        textPortuguese: 'Explorar Eventos',
        href: '/events',
        style: 'secondary'
      },
      context: {
        sourceService: 'transport',
        targetService: 'events',
        incentive: 'Coordinated transport available',
        incentivePortuguese: 'Transporte coordenado disponível'
      },
      timing: {
        showAfter: 5000
      },
      conditions: {
        pagePattern: /\/transport/,
        userActivity: ['viewed_transport_services', 'started_booking'],
        excludePages: ['/events']
      }
    },
    {
      id: 'networking-after-first-event',
      type: 'events_to_networking',
      title: 'Connect with Fellow Portuguese Speakers',
      titlePortuguese: 'Conecte-se com Outros Falantes de Português',
      description: 'You\'ve attended your first event! Build meaningful connections with Portuguese speakers who share your interests.',
      descriptionPortuguese: 'Participou no seu primeiro evento! Construa conexões significativas com membros da comunidade portuguesa que partilham os seus interesses.',
      icon: UserGroupIcon,
      primaryAction: {
        text: 'View My Network',
        textPortuguese: 'Ver a Minha Rede',
        href: '/my-network',
        style: 'primary'
      },
      secondaryAction: {
        text: 'Browse Connections',
        textPortuguese: 'Explorar Conexões',
        href: '/networking'
      },
      context: {
        sourceService: 'events',
        targetService: 'networking'
      },
      timing: {
        showAfter: 2000
      },
      conditions: {
        userActivity: ['attended_event'],
        previousActions: ['first_event_attendance']
      }
    },
    {
      id: 'premium-after-multiple-services',
      type: 'premium_upsell',
      title: 'Unlock Full Portuguese Community Access',
      titlePortuguese: 'Desbloqueie o Acesso Completo à Comunidade Portuguesa',
      description: 'You\'ve been active across our services! Upgrade to premium for unlimited transport booking, mentorship access, and housing assistance.',
      descriptionPortuguese: 'Tem estado ativo nos nossos serviços! Atualize para premium para reservas ilimitadas de transporte, acesso a mentoria e assistência habitacional.',
      icon: StarIcon,
      primaryAction: {
        text: 'Upgrade to Community £19.99/month',
        textPortuguese: 'Atualizar para Comunidade £19.99/mês',
        href: '/subscription',
        style: 'premium'
      },
      secondaryAction: {
        text: 'Learn More',
        textPortuguese: 'Saber Mais',
        href: '/premium'
      },
      context: {
        sourceService: 'multiple',
        targetService: 'subscription',
        incentive: 'Full community access',
        incentivePortuguese: 'Acesso completo à comunidade'
      },
      timing: {
        showAfter: 4000
      },
      conditions: {
        userActivity: ['used_transport', 'attended_events', 'made_connections'],
        previousActions: ['multiple_service_usage']
      }
    },
    {
      id: 'housing-assistance-for-new-users',
      type: 'cross_service_recommendation',
      title: 'Need Help Finding Housing in London?',
      titlePortuguese: 'Precisa de Ajuda para Encontrar Habitação em Londres?',
      description: 'Connect with our Portuguese community housing assistance program. Get support from locals who understand your needs.',
      descriptionPortuguese: 'Conecte-se com o nosso programa de assistência habitacional da comunidade portuguesa. Obtenha apoio de locais que compreendem as suas necessidades.',
      icon: HomeIcon,
      primaryAction: {
        text: 'Get Housing Help',
        textPortuguese: 'Obter Ajuda Habitacional',
        href: '/housing-assistance',
        style: 'secondary'
      },
      context: {
        sourceService: 'onboarding',
        targetService: 'housing',
        incentive: 'Free community support',
        incentivePortuguese: 'Apoio comunitário gratuito'
      },
      timing: {
        showAfter: 8000
      },
      conditions: {
        userActivity: ['completed_profile', 'new_user'],
        excludePages: ['/housing-assistance']
      }
    },
    {
      id: 'mentorship-after-networking',
      type: 'networking_to_premium',
      title: 'Ready for Professional Growth?',
      titlePortuguese: 'Pronto para Crescimento Profissional?',
      description: 'You\'re building great connections! Take the next step with our Portuguese professional mentorship program.',
      descriptionPortuguese: 'Está a construir ótimas conexões! Dê o próximo passo com o nosso programa de mentoria profissional portuguesa.',
      icon: AcademicCapIcon,
      primaryAction: {
        text: 'Access Mentorship',
        textPortuguese: 'Aceder a Mentoria',
        href: '/mentorship',
        style: 'premium'
      },
      context: {
        sourceService: 'networking',
        targetService: 'mentorship',
        incentive: 'Professional development',
        incentivePortuguese: 'Desenvolvimento profissional'
      },
      timing: {
        showAfter: 6000
      },
      conditions: {
        pagePattern: /\/my-network/,
        userActivity: ['active_networking'],
        previousActions: ['multiple_connections_made']
      }
    }
  ]

  // Check trigger conditions and activate appropriate triggers
  useEffect(() => {
    const checkTriggers = () => {
      const validTriggers = triggers.filter(trigger => {
        // Skip if already dismissed
        if (dismissedTriggers.includes(trigger.id)) return false

        // Check page pattern
        if (trigger.conditions.pagePattern && !trigger.conditions.pagePattern.test(currentPage)) {
          return false
        }

        // Check excluded pages
        if (trigger.conditions.excludePages?.some(page => currentPage.includes(page))) {
          return false
        }

        // Check user activity requirements
        if (trigger.conditions.userActivity) {
          const hasRequiredActivity = trigger.conditions.userActivity.some(activity => 
            userActivity.includes(activity)
          )
          if (!hasRequiredActivity) return false
        }

        // Check previous actions (mock implementation)
        if (trigger.conditions.previousActions) {
          const completedActions = JSON.parse(localStorage.getItem('lusotown-completed-actions') || '[]')
          const hasRequiredActions = trigger.conditions.previousActions.some(action =>
            completedActions.includes(action)
          )
          if (!hasRequiredActions) return false
        }

        // Special conditions based on networking stats
        if (trigger.id === 'networking-after-first-event' && stats.eventsAttended === 0) {
          return false
        }

        if (trigger.id === 'premium-after-multiple-services') {
          const hasUsedMultipleServices = userActivity.filter(activity => 
            ['used_transport', 'attended_events', 'made_connections'].includes(activity)
          ).length >= 2
          if (!hasUsedMultipleServices) return false
        }

        if (trigger.id === 'mentorship-after-networking' && connections.length < 2) {
          return false
        }

        return true
      })

      // Activate triggers with timing
      validTriggers.forEach(trigger => {
        setTimeout(() => {
          setActiveTriggers(prev => {
            if (prev.find(t => t.id === trigger.id)) return prev
            return [...prev, trigger]
          })

          // Auto-dismiss if specified
          if (trigger.timing.dismissAfter) {
            setTimeout(() => {
              setActiveTriggers(prev => prev.filter(t => t.id !== trigger.id))
            }, trigger.timing.dismissAfter)
          }
        }, trigger.timing.showAfter)
      })
    }

    checkTriggers()
  }, [currentPage, userActivity, stats, connections, dismissedTriggers])

  // Load dismissed triggers from localStorage
  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem('lusotown-dismissed-triggers') || '[]')
    setDismissedTriggers(dismissed)
  }, [])

  const handleDismiss = (triggerId: string) => {
    const newDismissed = [...dismissedTriggers, triggerId]
    setDismissedTriggers(newDismissed)
    localStorage.setItem('lusotown-dismissed-triggers', JSON.stringify(newDismissed))
    setActiveTriggers(prev => prev.filter(t => t.id !== triggerId))
    onTriggerAction?.(triggerId, 'dismiss')
  }

  const handleAction = (trigger: EngagementTrigger, actionType: 'primary' | 'secondary') => {
    // Track action for analytics
    const actions = JSON.parse(localStorage.getItem('lusotown-trigger-actions') || '[]')
    actions.push({
      triggerId: trigger.id,
      actionType,
      timestamp: new Date().toISOString(),
      sourceService: trigger.context.sourceService,
      targetService: trigger.context.targetService
    })
    localStorage.setItem('lusotown-trigger-actions', JSON.stringify(actions))

    // Mark as completed action for future trigger conditions
    const completedActions = JSON.parse(localStorage.getItem('lusotown-completed-actions') || '[]')
    if (actionType === 'primary') {
      completedActions.push(`${trigger.context.targetService}_engaged`)
    }
    localStorage.setItem('lusotown-completed-actions', JSON.stringify(completedActions))

    onTriggerAction?.(trigger.id, actionType)
    
    // Remove trigger after action
    setActiveTriggers(prev => prev.filter(t => t.id !== trigger.id))
  }

  if (activeTriggers.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4 max-w-sm">
      <AnimatePresence>
        {activeTriggers.map((trigger, index) => {
          const IconComponent = trigger.icon
          
          return (
            <motion.div
              key={trigger.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 backdrop-blur-sm max-w-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    trigger.primaryAction.style === 'premium' 
                      ? 'bg-premium-100' 
                      : trigger.primaryAction.style === 'primary'
                      ? 'bg-primary-100'
                      : 'bg-secondary-100'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      trigger.primaryAction.style === 'premium'
                        ? 'text-premium-600'
                        : trigger.primaryAction.style === 'primary'
                        ? 'text-primary-600'
                        : 'text-secondary-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">
                      {isPortuguese ? trigger.titlePortuguese : trigger.title}
                    </h3>
                    {trigger.context.incentive && (
                      <div className="flex items-center gap-1 mt-1">
                        <GiftIcon className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">
                          {isPortuguese ? trigger.context.incentivePortuguese : trigger.context.incentive}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(trigger.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {isPortuguese ? trigger.descriptionPortuguese : trigger.description}
              </p>

              {/* Actions */}
              <div className="space-y-2">
                <a
                  href={trigger.primaryAction.href}
                  onClick={() => handleAction(trigger, 'primary')}
                  className={`block w-full text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    trigger.primaryAction.style === 'premium'
                      ? 'bg-premium-500 text-white hover:bg-premium-600'
                      : trigger.primaryAction.style === 'primary'
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-secondary-500 text-white hover:bg-secondary-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{isPortuguese ? trigger.primaryAction.textPortuguese : trigger.primaryAction.text}</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </div>
                </a>

                {trigger.secondaryAction && (
                  <a
                    href={trigger.secondaryAction.href}
                    onClick={() => handleAction(trigger, 'secondary')}
                    className="block w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {isPortuguese ? trigger.secondaryAction.textPortuguese : trigger.secondaryAction.text}
                  </a>
                )}
              </div>

              {/* Source/Target Context */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <SparklesIcon className="w-3 h-3" />
                  <span>
                    {trigger.context.sourceService} → {trigger.context.targetService}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}