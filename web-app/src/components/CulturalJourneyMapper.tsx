'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TruckIcon,
  BuildingOfficeIcon,
  HeartIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
  CameraIcon,
  MusicalNoteIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface CulturalJourney {
  id: string
  type: 'tour_to_community' | 'transport_to_networking' | 'service_to_culture' | 'business_to_heritage'
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  stages: JourneyStage[]
  authenticConnections: AuthenticConnection[]
  valueProposition: string
  valuePropositionPortuguese: string
  completion: number
  estimatedDuration: string
  estimatedDurationPortuguese: string
}

interface JourneyStage {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  color: string
  isCompleted: boolean
  actions: StageAction[]
  culturalContext: string
  culturalContextPortuguese: string
}

interface StageAction {
  id: string
  title: string
  titlePortuguese: string
  href: string
  type: 'primary' | 'secondary'
  culturalValue: string
  culturalValuePortuguese: string
}

interface AuthenticConnection {
  id: string
  organization: string
  organizationPortuguese: string
  description: string
  descriptionPortuguese: string
  type: 'cultural_center' | 'business' | 'restaurant' | 'community_group' | 'educational'
  location: string
  contact?: string
}

interface CulturalJourneyMapperProps {
  currentService?: string
  currentEvent?: string
  userProfile?: any
  variant?: 'full' | 'widget' | 'embedded'
}

export default function CulturalJourneyMapper({ 
  currentService,
  currentEvent,
  userProfile,
  variant = 'full' 
}: CulturalJourneyMapperProps) {
  const { language, t } = useLanguage()
  const { connections, stats } = useNetworking()
  const [selectedJourney, setSelectedJourney] = useState<CulturalJourney | null>(null)
  const [showJourneyModal, setShowJourneyModal] = useState(false)
  const [completedStages, setCompletedStages] = useState<string[]>([])
  
  const isPortuguese = language === 'pt'

  // Cultural journey definitions with authentic Portuguese connections
  const culturalJourneys: CulturalJourney[] = [
    {
      id: 'heritage_tour_to_community',
      type: 'tour_to_community',
      title: 'Heritage Tour to Community Integration',
      titlePortuguese: 'Tour do Património à Integração Comunitária',
      description: 'Transform your Portuguese heritage tour experience into lasting community connections',
      descriptionPortuguese: 'Transforme a sua experiência de tour do património português em conexões comunitárias duradouras',
      completion: calculateJourneyCompletion('heritage_tour_to_community'),
      estimatedDuration: '2-3 weeks',
      estimatedDurationPortuguese: '2-3 semanas',
      valueProposition: 'From tourist to community member - discover your Portuguese London family',
      valuePropositionPortuguese: 'De turista a membro da comunidade - descubra a sua família portuguesa de Londres',
      stages: [
        {
          id: 'heritage_discovery',
          name: 'Portuguese Heritage Discovery',
          namePortuguese: 'Descoberta do Património Português',
          description: 'Explore Little Portugal, Vauxhall, and Portuguese landmarks with expert guides',
          descriptionPortuguese: 'Explore a Pequena Portugal, Vauxhall e marcos portugueses com guias especializados',
          icon: MapPinIcon,
          color: 'secondary',
          isCompleted: checkStageCompletion('heritage_discovery'),
          culturalContext: 'Learn about Portuguese settlement in Stockwell and Vauxhall since the 1960s',
          culturalContextPortuguese: 'Aprenda sobre o estabelecimento português em Stockwell e Vauxhall desde os anos 60',
          actions: [
            {
              id: 'book_heritage_tour',
              title: 'Book Heritage Tour',
              titlePortuguese: 'Reservar Tour do Património',
              href: '/services/cultural-tours/booking',
              type: 'primary',
              culturalValue: 'Connect with roots',
              culturalValuePortuguese: 'Conectar com as raízes'
            },
            {
              id: 'visit_little_portugal',
              title: 'Visit Little Portugal',
              titlePortuguese: 'Visitar a Pequena Portugal',
              href: '/events/tours/little-portugal',
              type: 'secondary',
              culturalValue: 'Authentic experience',
              culturalValuePortuguese: 'Experiência autêntica'
            }
          ]
        },
        {
          id: 'cultural_immersion',
          name: 'Cultural Immersion',
          namePortuguese: 'Imersão Cultural',
          description: 'Attend Fado nights, visit Portuguese restaurants, join Santos Populares celebrations',
          descriptionPortuguese: 'Participar em noites de Fado, visitar restaurantes portugueses, juntar-se às celebrações dos Santos Populares',
          icon: MusicalNoteIcon,
          color: 'accent',
          isCompleted: checkStageCompletion('cultural_immersion'),
          culturalContext: 'Experience authentic Portuguese culture through music, food, and festivities',
          culturalContextPortuguese: 'Experimente a cultura portuguesa autêntica através da música, comida e festividades',
          actions: [
            {
              id: 'attend_fado_night',
              title: 'Attend Fado Night',
              titlePortuguese: 'Participar em Noite de Fado',
              href: '/events/music/fado-nights',
              type: 'primary',
              culturalValue: 'Soulful connection',
              culturalValuePortuguese: 'Conexão da alma'
            },
            {
              id: 'santos_populares',
              title: 'Join Santos Populares',
              titlePortuguese: 'Juntar aos Santos Populares',
              href: '/events/cultural/santos-populares',
              type: 'secondary',
              culturalValue: 'Traditional celebration',
              culturalValuePortuguese: 'Celebração tradicional'
            }
          ]
        },
        {
          id: 'community_integration',
          name: 'Community Integration',
          namePortuguese: 'Integração Comunitária',
          description: 'Join Portuguese Cultural Centre, attend community events, build lasting friendships',
          descriptionPortuguese: 'Junte-se ao Centro Cultural Português, participar em eventos comunitários, construir amizades duradouras',
          icon: UserGroupIcon,
          color: 'primary',
          isCompleted: checkStageCompletion('community_integration'),
          culturalContext: 'Become part of the vibrant Portuguese community supporting each other in London',
          culturalContextPortuguese: 'Torne-se parte da vibrante comunidade portuguesa que se apoia mutuamente em Londres',
          actions: [
            {
              id: 'join_cultural_centre',
              title: 'Join Cultural Centre',
              titlePortuguese: 'Juntar ao Centro Cultural',
              href: '/community/cultural-centre',
              type: 'primary',
              culturalValue: 'Institutional connection',
              culturalValuePortuguese: 'Conexão institucional'
            }
          ]
        }
      ],
      authenticConnections: [
        {
          id: 'portuguese_cultural_centre',
          organization: 'Portuguese Cultural Centre',
          organizationPortuguese: 'Centro Cultural Português',
          description: 'Hub of Portuguese cultural activities and community events in London',
          descriptionPortuguese: 'Centro das atividades culturais portuguesas e eventos comunitários em Londres',
          type: 'cultural_center',
          location: 'South Lambeth Road, London',
          contact: 'culturalcentre@portuguese.org.uk'
        },
        {
          id: 'casa_do_brasil',
          organization: 'Casa do Brasil',
          organizationPortuguese: 'Casa do Brasil',
          description: 'Brazilian cultural center promoting Lusophone culture and arts',
          descriptionPortuguese: 'Centro cultural brasileiro promovendo a cultura e artes lusófonas',
          type: 'cultural_center',
          location: 'Southwark, London'
        },
        {
          id: 'lisboa_patisserie',
          organization: 'Lisboa Patisserie',
          organizationPortuguese: 'Pastelaria Lisboa',
          description: 'Authentic Portuguese bakery and meeting point for the community',
          descriptionPortuguese: 'Pastelaria portuguesa autêntica e ponto de encontro para a comunidade',
          type: 'restaurant',
          location: 'Vauxhall, London'
        }
      ]
    },
    {
      id: 'transport_to_business_networking',
      type: 'transport_to_networking',
      title: 'Executive Transport to Business Networking',
      titlePortuguese: 'Transporte Executivo para Networking de Negócios',
      description: 'Turn your transport experience into professional Portuguese business connections',
      descriptionPortuguese: 'Transforme a sua experiência de transporte em conexões profissionais de negócios portugueses',
      completion: calculateJourneyCompletion('transport_to_business_networking'),
      estimatedDuration: '1-2 weeks',
      estimatedDurationPortuguese: '1-2 semanas',
      valueProposition: 'From passenger to Portuguese business network member',
      valuePropositionPortuguese: 'De passageiro a membro da rede de negócios portuguesa',
      stages: [
        {
          id: 'executive_service',
          name: 'Executive Transport Service',
          namePortuguese: 'Serviço de Transporte Executivo',
          description: 'Experience premium transport with Portuguese-speaking professionals',
          descriptionPortuguese: 'Experimente o transporte premium com profissionais falantes de português',
          icon: TruckIcon,
          color: 'primary',
          isCompleted: checkStageCompletion('executive_service'),
          culturalContext: 'Connect with Portuguese business professionals during your journey',
          culturalContextPortuguese: 'Conecte-se com profissionais de negócios portugueses durante a sua viagem',
          actions: [
            {
              id: 'book_executive_transport',
              title: 'Book Executive Transport',
              titlePortuguese: 'Reservar Transporte Executivo',
              href: '/transport#executive-transport',
              type: 'primary',
              culturalValue: 'Professional experience',
              culturalValuePortuguese: 'Experiência profissional'
            }
          ]
        },
        {
          id: 'business_introduction',
          name: 'Business Network Introduction',
          namePortuguese: 'Apresentação à Rede de Negócios',
          description: 'Get introduced to Portuguese Chamber of Commerce and business associations',
          descriptionPortuguese: 'Seja apresentado à Câmara de Comércio Portuguesa e associações empresariais',
          icon: BuildingOfficeIcon,
          color: 'accent',
          isCompleted: checkStageCompletion('business_introduction'),
          culturalContext: 'Access the network of successful Portuguese entrepreneurs and professionals',
          culturalContextPortuguese: 'Acesso à rede de empresários e profissionais portugueses bem-sucedidos',
          actions: [
            {
              id: 'chamber_introduction',
              title: 'Chamber Introduction',
              titlePortuguese: 'Apresentação à Câmara',
              href: '/business/chamber-of-commerce',
              type: 'primary',
              culturalValue: 'Official network',
              culturalValuePortuguese: 'Rede oficial'
            }
          ]
        },
        {
          id: 'professional_integration',
          name: 'Professional Integration',
          namePortuguese: 'Integração Profissional',
          description: 'Attend Portuguese business events and professional development workshops',
          descriptionPortuguese: 'Participar em eventos de negócios portugueses e workshops de desenvolvimento profissional',
          icon: AcademicCapIcon,
          color: 'secondary',
          isCompleted: checkStageCompletion('professional_integration'),
          culturalContext: 'Develop professionally while maintaining Portuguese cultural values',
          culturalContextPortuguese: 'Desenvolver profissionalmente mantendo os valores culturais portugueses',
          actions: [
            {
              id: 'business_workshops',
              title: 'Business Workshops',
              titlePortuguese: 'Workshops de Negócios',
              href: '/events/business',
              type: 'primary',
              culturalValue: 'Skill development',
              culturalValuePortuguese: 'Desenvolvimento de competências'
            }
          ]
        }
      ],
      authenticConnections: [
        {
          id: 'portuguese_chamber_commerce',
          organization: 'Portuguese Chamber of Commerce UK',
          organizationPortuguese: 'Câmara de Comércio Portuguesa Reino Unido',
          description: 'Official chamber promoting Portuguese business interests in the UK',
          descriptionPortuguese: 'Câmara oficial promovendo interesses comerciais portugueses no Reino Unido',
          type: 'business',
          location: 'City of London'
        },
        {
          id: 'aep_uk',
          organization: 'Associação de Empresários Portugueses UK',
          organizationPortuguese: 'Associação de Empresários Portugueses Reino Unido',
          description: 'Network of Portuguese entrepreneurs and business leaders',
          descriptionPortuguese: 'Rede de empresários e líderes empresariais portugueses',
          type: 'business',
          location: 'London'
        }
      ]
    },
    {
      id: 'community_events_to_services',
      type: 'service_to_culture',
      title: 'Community Events to Premium Services',
      titlePortuguese: 'Eventos Comunitários para Serviços Premium',
      description: 'Elevate your community participation with premium transport and security services',
      descriptionPortuguese: 'Eleve a sua participação comunitária com transporte premium e serviços de segurança',
      completion: calculateJourneyCompletion('community_events_to_services'),
      estimatedDuration: '2-4 weeks',
      estimatedDurationPortuguese: '2-4 semanas',
      valueProposition: 'From community member to VIP cultural experience',
      valuePropositionPortuguese: 'De membro da comunidade a experiência cultural VIP',
      stages: [
        {
          id: 'event_participation',
          name: 'Community Event Participation',
          namePortuguese: 'Participação em Eventos Comunitários',
          description: 'Actively participate in Portuguese cultural events and celebrations',
          descriptionPortuguese: 'Participar ativamente em eventos culturais e celebrações portuguesas',
          icon: CalendarDaysIcon,
          color: 'secondary',
          isCompleted: checkStageCompletion('event_participation'),
          culturalContext: 'Immerse yourself in the rich tapestry of Portuguese celebrations',
          culturalContextPortuguese: 'Mergulhe na rica tapeçaria das celebrações portuguesas',
          actions: [
            {
              id: 'cultural_events',
              title: 'Join Cultural Events',
              titlePortuguese: 'Juntar a Eventos Culturais',
              href: '/events/cultural',
              type: 'primary',
              culturalValue: 'Cultural enrichment',
              culturalValuePortuguese: 'Enriquecimento cultural'
            }
          ]
        },
        {
          id: 'premium_upgrade',
          name: 'Premium Service Integration',
          namePortuguese: 'Integração de Serviços Premium',
          description: 'Add premium transport, security, and VIP services to enhance your cultural experiences',
          descriptionPortuguese: 'Adicione transporte premium, segurança e serviços VIP para melhorar as suas experiências culturais',
          icon: StarIcon,
          color: 'premium',
          isCompleted: checkStageCompletion('premium_upgrade'),
          culturalContext: 'Experience Portuguese culture with comfort, safety, and style',
          culturalContextPortuguese: 'Experimente a cultura portuguesa com conforto, segurança e estilo',
          actions: [
            {
              id: 'premium_membership',
              title: 'Premium Membership',
              titlePortuguese: 'Subscrição Premium',
              href: '/subscription',
              type: 'primary',
              culturalValue: 'Enhanced experience',
              culturalValuePortuguese: 'Experiência melhorada'
            }
          ]
        }
      ],
      authenticConnections: [
        {
          id: 'instituto_camoes',
          organization: 'Instituto Camões London',
          organizationPortuguese: 'Instituto Camões Londres',
          description: 'Portuguese language and culture institution promoting Portuguese heritage',
          descriptionPortuguese: 'Instituição de língua e cultura portuguesa promovendo o património português',
          type: 'educational',
          location: 'Central London'
        }
      ]
    }
  ]

  function calculateJourneyCompletion(journeyId: string): number {
    const completed = JSON.parse(localStorage.getItem(`lusotown-journey-${journeyId}`) || '[]')
    const journey = culturalJourneys.find(j => j.id === journeyId)
    if (!journey) return 0
    
    const totalStages = journey.stages.length
    const completedStages = completed.length
    return Math.round((completedStages / totalStages) * 100)
  }

  function checkStageCompletion(stageId: string): boolean {
    return localStorage.getItem(`lusotown-stage-${stageId}`) === 'completed'
  }

  const markStageCompleted = (stageId: string, journeyId: string) => {
    localStorage.setItem(`lusotown-stage-${stageId}`, 'completed')
    
    const completed = JSON.parse(localStorage.getItem(`lusotown-journey-${journeyId}`) || '[]')
    if (!completed.includes(stageId)) {
      completed.push(stageId)
      localStorage.setItem(`lusotown-journey-${journeyId}`, JSON.stringify(completed))
    }
    
    // Trigger re-render
    setCompletedStages(prev => [...prev, stageId])
  }

  const getRecommendedJourney = () => {
    // Intelligence: recommend based on current context
    if (currentService?.includes('transport') || currentService?.includes('executive')) {
      return culturalJourneys.find(j => j.type === 'transport_to_networking')
    }
    if (currentService?.includes('cultural') || currentEvent?.includes('heritage')) {
      return culturalJourneys.find(j => j.type === 'tour_to_community')
    }
    if (stats.eventsAttended > 2) {
      return culturalJourneys.find(j => j.type === 'service_to_culture')
    }
    
    // Default to heritage tour journey for new users
    return culturalJourneys[0]
  }

  const recommendedJourney = getRecommendedJourney()

  const renderJourneyCard = (journey: CulturalJourney, isRecommended = false) => (
    <motion.div
      key={journey.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
        isRecommended ? 'border-accent-200 shadow-md' : 'border-gray-200'
      }`}
      onClick={() => {
        setSelectedJourney(journey)
        setShowJourneyModal(true)
      }}
    >
      {isRecommended && (
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-5 h-5 text-accent-500" />
          <span className="text-sm font-medium text-accent-600">
            {isPortuguese ? 'Recomendado para você' : 'Recommended for you'}
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {isPortuguese ? journey.titlePortuguese : journey.title}
      </h3>
      <p className="text-gray-600 mb-4">
        {isPortuguese ? journey.descriptionPortuguese : journey.description}
      </p>
      
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{isPortuguese ? 'Progresso' : 'Progress'}</span>
          <span>{journey.completion}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${journey.completion}%` }}
          />
        </div>
      </div>
      
      {/* Value proposition */}
      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg p-3 mb-4">
        <p className="text-sm font-medium text-gray-800">
          {isPortuguese ? journey.valuePropositionPortuguese : journey.valueProposition}
        </p>
      </div>
      
      {/* Authentic connections preview */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <HeartIcon className="w-4 h-4 text-coral-500" />
        <span>
          {journey.authenticConnections.length} {isPortuguese ? 'conexões autênticas' : 'authentic connections'}
        </span>
      </div>
    </motion.div>
  )

  const renderJourneyModal = () => {
    if (!selectedJourney) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowJourneyModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isPortuguese ? selectedJourney.titlePortuguese : selectedJourney.title}
              </h2>
              <p className="text-gray-600">
                {isPortuguese ? selectedJourney.descriptionPortuguese : selectedJourney.description}
              </p>
            </div>
            <button
              onClick={() => setShowJourneyModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Journey Stages */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Etapas da Jornada' : 'Journey Stages'}
            </h3>
            <div className="space-y-4">
              {selectedJourney.stages.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <div
                    key={stage.id}
                    className={`border rounded-xl p-6 transition-all ${
                      stage.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${stage.color}-100 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${stage.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {isPortuguese ? stage.namePortuguese : stage.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {isPortuguese ? stage.descriptionPortuguese : stage.description}
                        </p>
                      </div>
                      {stage.isCompleted && (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700">
                        <strong>{isPortuguese ? 'Contexto Cultural:' : 'Cultural Context:'}</strong>{' '}
                        {isPortuguese ? stage.culturalContextPortuguese : stage.culturalContext}
                      </p>
                    </div>
                    
                    {!stage.isCompleted && (
                      <div className="flex gap-3">
                        {stage.actions.map(action => (
                          <a
                            key={action.id}
                            href={action.href}
                            onClick={() => markStageCompleted(stage.id, selectedJourney.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              action.type === 'primary'
                                ? `bg-${stage.color}-500 text-white hover:bg-${stage.color}-600`
                                : `border border-${stage.color}-500 text-${stage.color}-600 hover:bg-${stage.color}-50`
                            }`}
                          >
                            {isPortuguese ? action.titlePortuguese : action.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Authentic Connections */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Conexões Autênticas' : 'Authentic Connections'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedJourney.authenticConnections.map(connection => (
                <div
                  key={connection.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? connection.organizationPortuguese : connection.organization}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {isPortuguese ? connection.descriptionPortuguese : connection.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{connection.location}</span>
                  </div>
                  {connection.contact && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span>{connection.contact}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (variant === 'widget') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Sua Jornada Cultural' : 'Your Cultural Journey'}
        </h3>
        {recommendedJourney && renderJourneyCard(recommendedJourney, true)}
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Jornadas Culturais Autênticas' : 'Authentic Cultural Journeys'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? 'Descubra como os nossos serviços se conectam com a rica herança portuguesa de Londres, criando experiências culturais autênticas e conexões duradouras.'
                : 'Discover how our services connect with London\'s rich Portuguese heritage, creating authentic cultural experiences and lasting connections.'
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {culturalJourneys.map(journey => 
            renderJourneyCard(journey, journey.id === recommendedJourney?.id)
          )}
        </div>

        <AnimatePresence>
          {showJourneyModal && renderJourneyModal()}
        </AnimatePresence>
      </div>
    </section>
  )
}