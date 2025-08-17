'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserGroupIcon, 
  TruckIcon, 
  CalendarDaysIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyPoundIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { Car, Shield, Crown, TrendingUp, Users, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useNetworking } from '@/context/NetworkingContext'

interface UnifiedExperienceHubProps {
  initialTab?: 'discover' | 'book' | 'connect' | 'upgrade'
  onServiceBooked?: () => void
  onEventJoined?: () => void
}

export default function UnifiedExperienceHub({ 
  initialTab = 'discover',
  onServiceBooked,
  onEventJoined 
}: UnifiedExperienceHubProps) {
  const { language, t } = useLanguage()
  const { 
    bridgeOpportunities, 
    getPersonalizedRecommendations,
    getCulturalEventTransportPairings,
    findPortugueseBusinessConnections,
    getPortugueseCommunityInsights,
    trackActivity,
    createGroupTransportBooking
  } = usePlatformIntegration()
  const { hasActiveSubscription, membershipTier, serviceDiscount } = useSubscription()
  const { connections, stats } = useNetworking()
  
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [isBooking, setIsBooking] = useState(false)
  const isPortuguese = language === 'pt'

  const tabs = [
    {
      id: 'discover',
      name: isPortuguese ? 'Descobrir' : 'Discover',
      icon: SparklesIcon,
      description: isPortuguese ? 'Experiências integradas' : 'Integrated experiences'
    },
    {
      id: 'book',
      name: isPortuguese ? 'Reservar' : 'Book',
      icon: CalendarDaysIcon,
      description: isPortuguese ? 'Serviços + Comunidade' : 'Services + Community'
    },
    {
      id: 'connect',
      name: isPortuguese ? 'Conectar' : 'Connect',
      icon: UserGroupIcon,
      description: isPortuguese ? 'Rede portuguesa' : 'Portuguese network'
    },
    {
      id: 'upgrade',
      name: isPortuguese ? 'Melhorar' : 'Upgrade',
      icon: TrendingUp,
      description: isPortuguese ? 'Mais benefícios' : 'More benefits'
    }
  ]

  const recommendations = getPersonalizedRecommendations()
  const communityInsights = getPortugueseCommunityInsights()
  const businessConnections = findPortugueseBusinessConnections()
  const eventTransportPairings = getCulturalEventTransportPairings()

  const handleBookExperience = async (experience: any) => {
    setIsBooking(true)
    
    try {
      // Track cross-platform activity
      trackActivity({
        activityType: 'transport_booking',
        serviceType: 'transport',
        points: 100,
        metadata: { 
          experienceType: 'integrated_service',
          bridgeOpportunityId: experience.id 
        }
      })

      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSelectedExperience(experience)
      onServiceBooked?.()
      
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsBooking(false)
    }
  }

  const renderDiscoverTab = () => (
    <div className="space-y-8">
      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Recomendado Para Você' : 'Recommended For You'}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {rec.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {rec.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.benefits.map((benefit: string) => (
                    <span 
                      key={benefit}
                      className="px-3 py-1 bg-white text-primary-600 text-xs font-medium rounded-full border border-primary-200"
                    >
                      {benefit.replace('_', ' ')}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab(rec.action === 'view_events' ? 'book' : 'connect')}
                  className="text-primary-600 font-semibold text-sm hover:text-primary-700 flex items-center group"
                >
                  {isPortuguese ? 'Explorar' : 'Explore'}
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Bridge Opportunities */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Experiências Integradas' : 'Integrated Experiences'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bridgeOpportunities.map((opportunity) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {opportunity.serviceIntegration.transportIncluded && (
                      <Car className="w-5 h-5 text-primary-600" />
                    )}
                    {opportunity.serviceIntegration.eventAccess && (
                      <CalendarDaysIcon className="w-5 h-5 text-secondary-600" />
                    )}
                    {opportunity.serviceIntegration.networkingFeatures && (
                      <Users className="w-5 h-5 text-accent-600" />
                    )}
                  </div>
                  {hasActiveSubscription && (
                    <div className="px-2 py-1 bg-premium-100 text-premium-700 text-xs font-medium rounded-full">
                      -{opportunity.pricing.memberDiscount}%
                    </div>
                  )}
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {opportunity.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {opportunity.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    £{hasActiveSubscription ? 
                      Math.round(opportunity.pricing.basePrice * (1 - opportunity.pricing.memberDiscount / 100)) :
                      opportunity.pricing.basePrice
                    }
                  </div>
                  <div className="text-sm text-gray-500">
                    {opportunity.duration}
                  </div>
                </div>

                <button
                  onClick={() => handleBookExperience(opportunity)}
                  disabled={isBooking}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {isPortuguese ? 'Reservando...' : 'Booking...'}
                    </div>
                  ) : (
                    isPortuguese ? 'Reservar Experiência' : 'Book Experience'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Insights */}
      <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-xl p-6 border border-accent-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Comunidade Portuguesa em Londres' : 'Portuguese Community in London'}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">{communityInsights.totalMembers}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Membros' : 'Members'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">{communityInsights.activeLastMonth}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Ativos este mês' : 'Active this month'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{communityInsights.averageConnections}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Conexões médias' : 'Avg connections'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-coral-600">{communityInsights.communityGrowth}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Crescimento' : 'Growth'}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBookTab = () => (
    <div className="space-y-8">
      {/* Event + Transport Pairings */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Eventos + Transporte' : 'Events + Transport'}
        </h3>
        <div className="space-y-4">
          {eventTransportPairings.map((pairing) => (
            <motion.div
              key={pairing.eventId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mb-4 lg:mb-0">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {pairing.eventTitle}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {pairing.culturalExperience}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-secondary-600">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      {pairing.groupSavings}
                    </div>
                    <div className="flex items-center text-primary-600">
                      <Car className="w-4 h-4 mr-1" />
                      {pairing.transportOptions.length} {isPortuguese ? 'opções' : 'options'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                    onClick={() => window.location.href = `/events/${pairing.eventId}`}
                  >
                    {isPortuguese ? 'Ver Evento' : 'View Event'}
                  </button>
                  <button 
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => handleBookExperience(pairing)}
                  >
                    {isPortuguese ? 'Reservar Conjunto' : 'Book Together'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Group Booking Opportunities */}
      {connections.length >= 2 && (
        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-6 border border-secondary-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isPortuguese ? 'Reservas de Grupo' : 'Group Bookings'}
          </h3>
          <p className="text-gray-600 mb-6">
            {isPortuguese 
              ? `Você tem ${connections.length} conexões. Economize até 30% em reservas de grupo!`
              : `You have ${connections.length} connections. Save up to 30% on group bookings!`
            }
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Car className="w-6 h-6 text-primary-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isPortuguese ? 'Transporte Partilhado' : 'Shared Transport'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese ? 'Para eventos culturais' : 'To cultural events'}
                  </p>
                </div>
              </div>
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                {isPortuguese ? 'Criar Grupo' : 'Create Group'}
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-secondary-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isPortuguese ? 'Segurança VIP' : 'VIP Security'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese ? 'Para eventos de negócios' : 'For business events'}
                  </p>
                </div>
              </div>
              <button className="w-full bg-secondary-600 text-white py-2 rounded-lg hover:bg-secondary-700 transition-colors">
                {isPortuguese ? 'Solicitar Cotação' : 'Request Quote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderConnectTab = () => (
    <div className="space-y-8">
      {/* Business Connections */}
      {businessConnections.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Conexões de Negócios' : 'Business Connections'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessConnections.slice(0, 4).map((connection) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={connection.connectedUser.profilePictureUrl}
                    alt={connection.connectedUser.firstName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {connection.connectedUser.firstName} {connection.connectedUser.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{connection.businessType}</p>
                    <p className="text-xs text-primary-600">{connection.businessArea}</p>
                  </div>
                  <button className="px-3 py-1 border border-primary-600 text-primary-600 rounded-lg text-sm hover:bg-primary-50">
                    {isPortuguese ? 'Conectar' : 'Connect'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Network Stats */}
      <div className="bg-gradient-to-r from-premium-50 to-accent-50 rounded-xl p-6 border border-premium-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Sua Rede Portuguesa' : 'Your Portuguese Network'}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-premium-600">{stats.totalConnections}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Conexões' : 'Connections'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">{stats.eventsAttended}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Eventos' : 'Events'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">{stats.newConnectionsThisMonth}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Novas este mês' : 'New this month'}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-coral-600">{stats.connectionStrength.toFixed(1)}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Força média' : 'Avg strength'}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUpgradeTab = () => (
    <div className="space-y-8">
      {/* Current Membership Status */}
      <div className="bg-gradient-to-r from-premium-600 to-accent-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">
              {isPortuguese ? 'Membro' : 'Member'} {membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)}
            </h3>
            <p className="opacity-90">
              {isPortuguese 
                ? `${serviceDiscount}% desconto em todos os serviços`
                : `${serviceDiscount}% discount on all services`
              }
            </p>
          </div>
          <Crown className="w-12 h-12 opacity-80" />
        </div>
      </div>

      {/* Upgrade Benefits */}
      {!hasActiveSubscription && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Desbloqueie Mais Benefícios' : 'Unlock More Benefits'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? '15% desconto em transportes' : '15% discount on transport'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? 'Acesso prioritário a eventos' : 'Priority event access'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? 'Networking exclusivo' : 'Exclusive networking'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? 'Reservas de grupo gratuitas' : 'Free group bookings'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? 'Suporte português 24/7' : '24/7 Portuguese support'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-secondary-600" />
                <span>{isPortuguese ? 'Eventos culturais exclusivos' : 'Exclusive cultural events'}</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => window.location.href = '/premium'}
              className="w-full bg-gradient-to-r from-premium-600 to-accent-600 text-white py-3 rounded-lg font-semibold hover:from-premium-700 hover:to-accent-700 transition-all duration-200"
            >
              {isPortuguese ? 'Upgrade para Premium' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Centro de Experiências LusoTown' : 'LusoTown Experience Hub'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {isPortuguese
            ? 'Descubra, reserve e conecte-se numa plataforma integrada para a comunidade portuguesa'
            : 'Discover, book, and connect in one integrated platform for the Portuguese community'
          }
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-xl p-1 flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'discover' && renderDiscoverTab()}
          {activeTab === 'book' && renderBookTab()}
          {activeTab === 'connect' && renderConnectTab()}
          {activeTab === 'upgrade' && renderUpgradeTab()}
        </motion.div>
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isPortuguese ? 'Reserva Confirmada!' : 'Booking Confirmed!'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isPortuguese
                    ? `Sua experiência "${selectedExperience.title}" foi reservada com sucesso.`
                    : `Your "${selectedExperience.title}" experience has been booked successfully.`
                  }
                </p>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {isPortuguese ? 'Fechar' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}