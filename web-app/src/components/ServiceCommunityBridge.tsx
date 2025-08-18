'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRightIcon,
  CheckCircleIcon,
  UserGroupIcon,
  TruckIcon,
  CalendarDaysIcon,
  SparklesIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  UsersIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { Car, Shield, Crown, Users, MapPin, Clock, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { useNetworking } from '@/context/NetworkingContext'

interface ServiceCommunityBridgeProps {
  triggerContext?: 'transport_page' | 'event_page' | 'community_page' | 'homepage'
  selectedService?: any
  selectedEvent?: any
  onIntegrationSelected?: (integration: any) => void
}

export default function ServiceCommunityBridge({ 
  triggerContext = 'homepage',
  selectedService,
  selectedEvent,
  onIntegrationSelected 
}: ServiceCommunityBridgeProps) {
  const { language, t } = useLanguage()
  const { 
    bridgeOpportunities, 
    getPersonalizedRecommendations,
    findEventTransportOpportunities,
    trackServiceToCommuityFlow,
    createGroupTransportBooking
  } = usePlatformIntegration()
  const { hasActiveSubscription, membershipTier, serviceDiscount } = useSubscription()
  const { connections, stats } = useNetworking()
  
  const [showIntegrationModal, setShowIntegrationModal] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [groupBookingMode, setGroupBookingMode] = useState(false)
  const [selectedConnections, setSelectedConnections] = useState<string[]>([])
  const isPortuguese = language === 'pt'

  const recommendations = getPersonalizedRecommendations()

  // Integration flows based on context
  const getContextualIntegrations = () => {
    switch (triggerContext) {
      case 'transport_page':
        return {
          title: isPortuguese ? 'Transforme seu Transporte numa Experiência Social' : 'Turn Your Transport Into a Social Experience',
          subtitle: isPortuguese ? 'Conecte-se com a comunidade portuguesa durante suas viagens' : 'Connect with the Portuguese community during your travels',
          integrations: [
            {
              id: 'transport-to-events',
              title: isPortuguese ? 'Transporte + Eventos Culturais' : 'Transport + Cultural Events',
              description: isPortuguese ? 'Chegue aos eventos portugueses com estilo e conhece pessoas no caminho' : 'Arrive at Portuguese events in style and meet people on the way',
              value: isPortuguese ? 'Economia de até 25% + Networking garantido' : 'Save up to 25% + Guaranteed networking',
              icon: CalendarDaysIcon,
              color: 'secondary'
            },
            {
              id: 'transport-to-community',
              title: isPortuguese ? 'Transporte + Networking' : 'Transport + Networking',
              description: isPortuguese ? 'Compartilhe viagens com outros portugueses da sua área' : 'Share rides with other Portuguese speakers in your area',
              value: isPortuguese ? 'Conexões instantâneas + Custos compartilhados' : 'Instant connections + Shared costs',
              icon: UserGroupIcon,
              color: 'accent'
            }
          ]
        }
      
      case 'event_page':
        return {
          title: isPortuguese ? 'Chegue ao Evento em Grande Estilo' : 'Arrive at the Event in Style',
          subtitle: isPortuguese ? 'Transforme sua ida ao evento numa experiência premium' : 'Turn your trip to the event into a premium experience',
          integrations: [
            {
              id: 'event-transport-vip',
              title: isPortuguese ? 'Transporte VIP para o Evento' : 'VIP Transport to Event',
              description: isPortuguese ? 'Chegue relaxado e com segurança ao evento português' : 'Arrive relaxed and safely at the Portuguese event',
              value: isPortuguese ? 'Sem preocupações + Chegada premium' : 'No worries + Premium arrival',
              icon: Car,
              color: 'primary'
            },
            {
              id: 'event-group-transport',
              title: isPortuguese ? 'Transporte em Grupo' : 'Group Transport',
              description: isPortuguese ? 'Compartilhe o transporte com outras pessoas que vão ao mesmo evento' : 'Share transport with others going to the same event',
              value: isPortuguese ? 'Economize 30% + Conhece pessoas' : 'Save 30% + Meet people',
              icon: Users,
              color: 'secondary'
            }
          ]
        }
      
      case 'community_page':
        return {
          title: isPortuguese ? 'Leve sua Experiência Comunitária ao Próximo Nível' : 'Take Your Community Experience to the Next Level',
          subtitle: isPortuguese ? 'Adicione serviços premium às suas atividades comunitárias' : 'Add premium services to your community activities',
          integrations: [
            {
              id: 'community-premium-services',
              title: isPortuguese ? 'Serviços Premium para Membros' : 'Premium Services for Members',
              description: isPortuguese ? 'Acesso a transporte executivo e segurança para eventos da comunidade' : 'Access to executive transport and security for community events',
              value: isPortuguese ? 'Desconto exclusivo de membro + Serviços de qualidade' : 'Exclusive member discount + Quality services',
              icon: Crown,
              color: 'premium'
            }
          ]
        }
      
      default:
        return {
          title: isPortuguese ? 'Uma Plataforma, Todas as Experiências' : 'One Platform, All Experiences',
          subtitle: isPortuguese ? 'Descubra como transportes e comunidade se conectam na LusoTown' : 'Discover how transport and community connect at LusoTown',
          integrations: bridgeOpportunities.slice(0, 3).map(opp => ({
            id: opp.id,
            title: opp.title,
            description: opp.description,
            value: `£${opp.pricing.basePrice} · ${opp.duration}`,
            icon: SparklesIcon,
            color: 'primary'
          }))
        }
    }
  }

  const contextualContent = getContextualIntegrations()

  const handleIntegrationClick = (integration: any) => {
    setSelectedIntegration(integration)
    setShowIntegrationModal(true)
    
    trackServiceToCommuityFlow(
      triggerContext.replace('_page', ''),
      'integration_modal_opened'
    )
    
    onIntegrationSelected?.(integration)
  }

  const handleGroupBooking = async () => {
    if (selectedEvent && selectedConnections.length > 0) {
      const success = await createGroupTransportBooking(selectedEvent.id, selectedConnections)
      if (success) {
        setGroupBookingMode(false)
        setSelectedConnections([])
        setShowIntegrationModal(false)
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'from-primary-500 to-primary-600 text-white',
      secondary: 'from-secondary-500 to-secondary-600 text-white',
      accent: 'from-accent-500 to-accent-600 text-white',
      premium: 'from-premium-500 to-premium-600 text-white',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.primary
  }

  const renderGroupBookingModal = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Convidar Conexões' : 'Invite Connections'}
        </h3>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Selecione quem você gostaria de convidar para compartilhar o transporte'
            : 'Select who you\'d like to invite to share transport'
          }
        </p>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-2">
        {connections.slice(0, 8).map((connection) => (
          <div
            key={connection.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selectedConnections.includes(connection.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              if (selectedConnections.includes(connection.id)) {
                setSelectedConnections(prev => prev.filter(id => id !== connection.id))
              } else {
                setSelectedConnections(prev => [...prev, connection.id])
              }
            }}
          >
            <input
              type="checkbox"
              checked={selectedConnections.includes(connection.id)}
              onChange={() => {}}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <img
              src={connection.connectedUser.profilePictureUrl}
              alt={connection.connectedUser.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {connection.connectedUser.firstName} {connection.connectedUser.lastName}
              </div>
              <div className="text-sm text-gray-500">
                {connection.connectedUser.location} · {connection.sharedEventsCount} {isPortuguese ? 'eventos juntos' : 'events together'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedConnections.length > 0 && (
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Economia Estimada' : 'Estimated Savings'}
            </span>
            <span className="text-lg font-bold text-secondary-600">
              £{selectedConnections.length * 15}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {isPortuguese 
              ? `${selectedConnections.length} pessoas × £15 economia por pessoa`
              : `${selectedConnections.length} people × £15 savings per person`
            }
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => setGroupBookingMode(false)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          {isPortuguese ? 'Cancelar' : 'Cancel'}
        </button>
        <button
          onClick={handleGroupBooking}
          disabled={selectedConnections.length === 0}
          className="flex-1 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPortuguese ? 'Criar Reserva de Grupo' : 'Create Group Booking'}
        </button>
      </div>
    </div>
  )

  const renderIntegrationDetails = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {selectedIntegration?.title}
        </h3>
        <p className="text-gray-600">
          {selectedIntegration?.description}
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CurrencyPoundIcon className="w-5 h-5 text-secondary-600" />
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Economia' : 'Savings'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese ? 'Até 30% de desconto em reservas combinadas' : 'Up to 30% off combined bookings'}
          </p>
        </div>
        
        <div className="bg-accent-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <UserGroupIcon className="w-5 h-5 text-accent-600" />
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Networking' : 'Networking'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese ? 'Conecte-se com outros portugueses' : 'Connect with other Portuguese speakers'}
          </p>
        </div>
        
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Segurança' : 'Safety'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese ? 'Transporte seguro e verificado' : 'Safe and verified transport'}
          </p>
        </div>
        
        <div className="bg-premium-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ClockIcon className="w-5 h-5 text-premium-600" />
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Conveniência' : 'Convenience'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese ? 'Tudo numa só reserva' : 'Everything in one booking'}
          </p>
        </div>
      </div>

      {/* Member Benefits */}
      {hasActiveSubscription && (
        <div className="bg-gradient-to-r from-premium-50 to-accent-50 rounded-lg p-4 border border-premium-200">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-premium-600" />
            <span className="font-medium text-gray-900">
              {isPortuguese ? 'Benefício de Membro' : 'Member Benefit'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isPortuguese 
              ? `Desconto adicional de ${serviceDiscount}% como membro ${membershipTier}`
              : `Additional ${serviceDiscount}% discount as ${membershipTier} member`
            }
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {connections.length >= 2 && (
          <button
            onClick={() => setGroupBookingMode(true)}
            className="flex-1 px-4 py-2 border border-secondary-600 text-secondary-600 rounded-lg hover:bg-secondary-50 flex items-center justify-center space-x-2"
          >
            <UsersIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Reserva em Grupo' : 'Group Booking'}</span>
          </button>
        )}
        <button
          onClick={() => window.location.href = '/transport'}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2"
        >
          <span>{isPortuguese ? 'Reservar Agora' : 'Book Now'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {contextualContent.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {contextualContent.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Integration Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contextualContent.integrations.map((integration, index) => {
            const Icon = integration.icon
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleIntegrationClick(integration)}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(integration.color)} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {integration.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {integration.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium text-sm">
                      {integration.value}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Personalized Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-xl p-6 border border-accent-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Recomendado Para Você' : 'Recommended For You'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendations.slice(0, 2).map((rec, index) => (
                <div key={rec.type} className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {rec.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {rec.description}
                  </p>
                  <button
                    onClick={() => handleIntegrationClick(rec)}
                    className="text-accent-600 font-medium text-sm hover:text-accent-700 flex items-center group"
                  >
                    {isPortuguese ? 'Explorar' : 'Explore'}
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Integration Modal */}
        <AnimatePresence>
          {showIntegrationModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowIntegrationModal(false)
                setGroupBookingMode(false)
                setSelectedConnections([])
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {groupBookingMode ? renderGroupBookingModal() : renderIntegrationDetails()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}