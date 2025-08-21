'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ROUTES } from '@/config/routes'
import { 
  ArrowRightIcon,
  XMarkIcon,
  UserGroupIcon,
  TruckIcon,
  CalendarDaysIcon,
  SparklesIcon,
  MapPinIcon,
  UsersIcon,
  BellIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { Car, Shield, Crown, Users, MapPin, Calendar } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useNetworking } from '@/context/NetworkingContext'

interface CrossPlatformNavigationWidgetProps {
  currentPage: 'transport' | 'events' | 'community' | 'networking' | 'home'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  alwaysVisible?: boolean
}

export default function CrossPlatformNavigationWidget({ 
  currentPage,
  position = 'bottom-right',
  alwaysVisible = false 
}: CrossPlatformNavigationWidgetProps) {
  const { language, t } = useLanguage()
  const { 
    crossPlatformNotifications,
    getPersonalizedRecommendations
  } = usePlatformIntegration()
  const { hasActiveSubscription, membershipTier, serviceDiscount } = useSubscription()
  const { connections, stats } = useNetworking()
  
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)
  const [dismissedRecommendations, setDismissedRecommendations] = useState<string[]>([])
  const isPortuguese = language === 'pt'

  const recommendations = getPersonalizedRecommendations()
  const unreadNotifications = crossPlatformNotifications.filter(n => !n.isRead)

  useEffect(() => {
    setHasUnreadNotifications(unreadNotifications.length > 0)
  }, [crossPlatformNotifications, unreadNotifications.length])

  // Don't show on homepage unless always visible
  if (currentPage === 'home' && !alwaysVisible) {
    return null
  }

  const getPositionClasses = () => {
    const baseClasses = 'fixed z-40'
    switch (position) {
      case 'bottom-right':
        return `${baseClasses} bottom-6 right-6`
      case 'bottom-left':
        return `${baseClasses} bottom-6 left-6`
      case 'top-right':
        return `${baseClasses} top-24 right-6`
      case 'top-left':
        return `${baseClasses} top-24 left-6`
      default:
        return `${baseClasses} bottom-6 right-6`
    }
  }

  const getCrossPageOpportunities = () => {
    switch (currentPage) {
      case 'transport':
        return [
          {
            id: 'transport-to-events',
            title: isPortuguese ? 'Eventos Portugueses' : 'Portuguese Events',
            description: isPortuguese ? 'Encontre eventos para ir com seu transporte' : 'Find events to go to with your transport',
            action: ROUTES.events,
            icon: CalendarDaysIcon,
            color: 'secondary',
            badge: stats.eventsAttended < 3 ? (isPortuguese ? 'Novo' : 'New') : null
          },
          {
            id: 'transport-to-networking',
            title: isPortuguese ? 'Rede Portuguesa' : 'Portuguese Network',
            description: isPortuguese ? 'Conecte-se com outros que usam transporte' : 'Connect with others who use transport',
            action: ROUTES.myNetwork,
            icon: UserGroupIcon,
            color: 'accent',
            badge: connections.length >= 3 ? `${connections.length}` : null
          }
        ]
      
      case 'events':
        return [
          {
            id: 'events-to-transport',
            title: isPortuguese ? 'Transporte Premium' : 'Premium Transport',
            description: isPortuguese ? 'Chegue ao evento com segurança e estilo' : 'Arrive at the event safely and in style',
            action: ROUTES.transport,
            icon: Car,
            color: 'primary',
            badge: hasActiveSubscription ? `${serviceDiscount}% OFF` : null
          },
          {
            id: 'events-to-group-transport',
            title: isPortuguese ? 'Transporte Privado' : 'Private Transport',
            description: isPortuguese ? 'Vá com suas conexões do LusoTown' : 'Go with your LusoTown connections',
              action: ROUTES.transportGroup,
            icon: Users,
            color: 'secondary',
            badge: connections.length >= 2 ? (isPortuguese ? 'Disponível' : 'Available') : null
          }
        ]
      
      case 'community':
        return [
          {
            id: 'community-to-events',
            title: isPortuguese ? 'Eventos da Comunidade' : 'Community Events',
            description: isPortuguese ? 'Participe de eventos com sua rede' : 'Join events with your network',
            action: ROUTES.events,
            icon: CalendarDaysIcon,
            color: 'secondary',
            badge: null
          },
          {
            id: 'community-to-premium-services',
            title: isPortuguese ? 'Serviços Premium' : 'Premium Services',
            description: isPortuguese ? 'Acesso exclusivo a transporte VIP' : 'Exclusive access to VIP transport',
              action: ROUTES.transport,
            icon: Crown,
            color: 'premium',
            badge: hasActiveSubscription ? (isPortuguese ? 'Incluído' : 'Included') : null
          }
        ]
      
      case 'networking':
        return [
          {
            id: 'networking-to-events',
            title: isPortuguese ? 'Eventos para Networking' : 'Networking Events',
            description: isPortuguese ? 'Encontre eventos para expandir sua rede' : 'Find events to expand your network',
            action: `${ROUTES.events}?category=networking`,
            icon: SparklesIcon,
            color: 'accent',
            badge: null
          },
          {
            id: 'networking-to-group-services',
            title: isPortuguese ? 'Serviços em Grupo' : 'Group Services',
            description: isPortuguese ? 'Organize transporte com suas conexões' : 'Organize transport with your connections',
              action: ROUTES.transportGroup,
            icon: UsersIcon,
            color: 'primary',
            badge: connections.length >= 3 ? (isPortuguese ? 'Economia 30%' : '30% Savings') : null
          }
        ]
      
      default:
        return []
    }
  }

  const crossPageOpportunities = getCrossPageOpportunities()

  const handleOpportunityClick = (opportunity: any) => {
    // Track the opportunity click for analytics
    window.location.href = opportunity.action
    setIsExpanded(false)
  }

  const handleDismissNotification = (notificationId: string) => {
    setDismissedRecommendations(prev => [...prev, notificationId])
  }

  const activeNotifications = unreadNotifications.filter(
    n => !dismissedRecommendations.includes(n.id)
  )

  const activeRecommendations = recommendations.filter(
    r => !dismissedRecommendations.includes(r.type)
  )

  return (
    <div className={getPositionClasses()}>
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setIsExpanded(false)}
            />
            
            {/* Expanded Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-h-96 overflow-y-auto"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {isPortuguese ? 'Oportunidades' : 'Opportunities'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isPortuguese ? 'Descubra mais na LusoTown' : 'Discover more on LusoTown'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Notifications */}
                {activeNotifications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {isPortuguese ? 'Notificações' : 'Notifications'}
                    </h4>
                    <div className="space-y-2">
                      {activeNotifications.slice(0, 2).map((notification) => (
                        <div
                          key={notification.id}
                          className="bg-primary-50 border border-primary-200 rounded-lg p-3 relative"
                        >
                          <button
                            onClick={() => handleDismissNotification(notification.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                          <h5 className="font-semibold text-gray-900 text-sm mb-1">
                            {notification.title}
                          </h5>
                          <p className="text-xs text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          {notification.actionType === 'redirect' && (notification.actionData as any)?.url && (
                            <button
                              onClick={() => {
                                const url = (notification.actionData as any)?.url as string | undefined
                                if (url) window.location.href = url
                              }}
                              className="text-primary-600 text-xs font-medium hover:text-primary-700"
                            >
                              {isPortuguese ? 'Ver Mais' : 'See More'}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cross-page Opportunities */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {isPortuguese ? 'Explore Mais' : 'Explore More'}
                  </h4>
                  {crossPageOpportunities.map((opportunity) => {
                    const Icon = opportunity.icon
                    return (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleOpportunityClick(opportunity)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-${opportunity.color}-500 to-${opportunity.color}-600 flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-semibold text-gray-900 text-sm">
                                {opportunity.title}
                              </h5>
                              {opportunity.badge && (
                                <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                                  {opportunity.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {opportunity.description}
                            </p>
                          </div>
                          <ArrowRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Recommendations */}
                {activeRecommendations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {isPortuguese ? 'Recomendado' : 'Recommended'}
                    </h4>
                    {activeRecommendations.slice(0, 1).map((rec) => (
                      <div
                        key={rec.type}
                        className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-3 border border-accent-200 relative"
                      >
                        <button
                          onClick={() => handleDismissNotification(rec.type)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                        <h5 className="font-semibold text-gray-900 text-sm mb-1">
                          {rec.title}
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">
                          {rec.description}
                        </p>
                        <button
                          onClick={() => {
                            setIsExpanded(false)
                          }}
                          className="text-accent-600 text-xs font-medium hover:text-accent-700"
                        >
                          {isPortuguese ? 'Explorar' : 'Explore'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Widget Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={hasUnreadNotifications ? { 
          scale: [1, 1.1, 1],
          transition: { duration: 2, repeat: Infinity }
        } : {}}
      >
        <SparklesIcon className="w-6 h-6" />
        
        {/* Notification Badge */}
        {(hasUnreadNotifications || activeRecommendations.length > 0) && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {activeNotifications.length + activeRecommendations.length}
          </div>
        )}
      </motion.button>
    </div>
  )
}