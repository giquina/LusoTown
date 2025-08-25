'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TruckIcon, 
  UserGroupIcon, 
  CalendarDaysIcon,
  BanknotesIcon,
  MapPinIcon,
  StarIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { useNetworking } from '@/context/NetworkingContext'

interface UserJourneyStage {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  color: string
  progress: number
  isCompleted: boolean
  nextActions: JourneyAction[]
  benefits: string[]
  benefitsPortuguese: string[]
}

interface JourneyAction {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  href: string
  type: 'primary' | 'secondary' | 'tertiary'
  estimatedTime: string
  estimatedTimePortuguese: string
  value: string
  valuePortuguese: string
}

interface ProgressiveUserJourneyProps {
  variant?: 'dashboard' | 'widget' | 'full'
  showCompletedStages?: boolean
  currentPage?: string
}

export default function ProgressiveUserJourney({ 
  variant = 'full',
  showCompletedStages = true,
  currentPage 
}: ProgressiveUserJourneyProps) {
  const { language, t } = useLanguage()
  const { stats, connections } = useNetworking()
  const [currentStage, setCurrentStage] = useState<UserJourneyStage | null>(null)
  const [journeyStages, setJourneyStages] = useState<UserJourneyStage[]>([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const isPortuguese = language === 'pt'

  // Define user journey stages with Lusophone cultural context
  const calculateDiscoveryProgress = useCallback(function calculateDiscoveryProgress(): number {
    let progress = 0
    const hasCompletedProfile = typeof window !== 'undefined' ? localStorage.getItem('lusotown-profile-completed') : null
    if (hasCompletedProfile) progress += 40
    const visitedPages = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lusotown-visited-pages') || '[]') : []
    if (visitedPages.includes('/events')) progress += 30
    if (visitedPages.includes('/transport')) progress += 30
    return Math.min(progress, 100)
  }, [])

  const calculateEngagementProgress = useCallback(function calculateEngagementProgress(): number {
    let progress = 0
    if (stats.eventsAttended > 0) progress += 50
    if (connections.length > 0) progress += 30
    const hasBookedTransport = typeof window !== 'undefined' ? localStorage.getItem('lusotown-transport-booked') : null
    if (hasBookedTransport) progress += 20
    return Math.min(progress, 100)
  }, [stats.eventsAttended, connections.length])

  const calculateInvestmentProgress = useCallback(function calculateInvestmentProgress(): number {
    let progress = 0
    const hasSubscription = typeof window !== 'undefined' ? localStorage.getItem('lusotown-subscription-active') : null
    if (hasSubscription) progress += 60
    const usedMentorship = typeof window !== 'undefined' ? localStorage.getItem('lusotown-mentorship-used') : null
    const usedHousing = typeof window !== 'undefined' ? localStorage.getItem('lusotown-housing-used') : null
    if (usedMentorship) progress += 20
    if (usedHousing) progress += 20
    return Math.min(progress, 100)
  }, [])

  const calculateAdvocacyProgress = useCallback(function calculateAdvocacyProgress(): number {
    let progress = 0
    const referralsMade = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lusotown-referrals') || '[]').length : 0
    if (referralsMade > 0) progress += 40
    const eventsHosted = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lusotown-hosted-events') || '[]').length : 0
    if (eventsHosted > 0) progress += 40
    const sharedStory = typeof window !== 'undefined' ? localStorage.getItem('lusotown-shared-story') : null
    if (sharedStory) progress += 20
    return Math.min(progress, 100)
  }, [])

  const stages: UserJourneyStage[] = useMemo(() => [
    {
      id: 'discovery',
      name: 'Discovery & Entry',
      namePortuguese: 'Descoberta e Entrada',
      description: 'Welcome to the Portuguese-speaking community in London! Start exploring our services and connect with fellow Portuguese speakers.',
      descriptionPortuguese: 'Bem-vindo à comunidade de falantes de português em Londres! Comece a explorar os nossos serviços e conecte-se com outros falantes de português.',
      icon: MapPinIcon,
      color: 'secondary',
      progress: calculateDiscoveryProgress(),
      isCompleted: calculateDiscoveryProgress() >= 100,
      nextActions: [
        {
          id: 'complete-profile',
          title: 'Complete Your Profile',
          titlePortuguese: 'Complete o Seu Perfil',
          description: 'Add your Lusophone background and interests to connect with the right people',
          descriptionPortuguese: 'Adicione o seu background português e interesses para se conectar com as pessoas certas',
          href: '/profile/edit',
          type: 'primary',
          estimatedTime: '5 minutes',
          estimatedTimePortuguese: '5 minutos',
          value: 'Better connections',
          valuePortuguese: 'Melhores conexões'
        },
        {
          id: 'browse-events',
          title: 'Browse Cultural Events',
          titlePortuguese: 'Explorar Eventos Culturais',
          description: 'Discover Lusophone cultural events happening across London',
          descriptionPortuguese: 'Descubra eventos culturais portugueses acontecendo por toda Londres',
          href: ROUTES.events,
          type: 'secondary',
          estimatedTime: '10 minutes',
          estimatedTimePortuguese: '10 minutos',
          value: 'Cultural connection',
          valuePortuguese: 'Conexão cultural'
        },
        {
          id: 'explore-transport',
          title: 'Explore Transport Services',
          titlePortuguese: 'Explorar Serviços de Transporte',
          description: 'Check out our Portuguese-speaking driver and security services',
          descriptionPortuguese: 'Conheça os nossos serviços de motorista e segurança falantes de português',
          href: '/transport',
          type: 'tertiary',
          estimatedTime: '5 minutes',
          estimatedTimePortuguese: '5 minutos',
          value: 'Safe travel',
          valuePortuguese: 'Viagem segura'
        }
      ],
      benefits: [
        'Connect with Portuguese speakers in London',
        'Access to authentic Lusophone events and experiences',
        'Safe and familiar transport with Portuguese-speaking drivers'
      ],
      benefitsPortuguese: [
        'Conecte-se com 750+ falantes de português em Londres',
        'Acesso a eventos e experiências portuguesas autênticas',
        'Transporte seguro e familiar com motoristas falantes de português'
      ]
    },
    {
      id: 'engagement',
      name: 'Active Engagement',
      namePortuguese: 'Envolvimento Ativo',
      description: 'Start participating in events and building your Lusophone network in London.',
      descriptionPortuguese: 'Comece a participar em eventos e construir a sua rede portuguesa em Londres.',
      icon: UserGroupIcon,
      color: 'accent',
      progress: calculateEngagementProgress(),
      isCompleted: calculateEngagementProgress() >= 100,
      nextActions: [
        {
          id: 'attend-first-event',
          title: 'Attend Your First Event',
          titlePortuguese: 'Participe no Seu Primeiro Evento',
          description: 'Join a Lusophone cultural event and start building connections',
          descriptionPortuguese: 'Junte-se a um evento cultural português e comece a construir conexões',
          href: ROUTES.events,
          type: 'primary',
          estimatedTime: '2-3 hours',
          estimatedTimePortuguese: '2-3 horas',
          value: 'Real connections',
          valuePortuguese: 'Conexões reais'
        },
        {
          id: 'book-transport',
          title: 'Book Transport Service',
          titlePortuguese: 'Reservar Serviço de Transporte',
          description: 'Experience our Portuguese-speaking transport for events or tours',
          descriptionPortuguese: 'Experimente o nosso transporte falante de português para eventos ou tours',
          href: '/transport',
          type: 'secondary',
          estimatedTime: '15 minutes',
          estimatedTimePortuguese: '15 minutos',
          value: 'Convenience & safety',
          valuePortuguese: 'Conveniência e segurança'
        },
        {
          id: 'join-groups',
          title: 'Join Neighborhood Groups',
          titlePortuguese: 'Juntar-se a Grupos de Bairro',
          description: 'Connect with Portuguese speakers in your London area',
          descriptionPortuguese: 'Conecte-se com falantes de português na sua área de Londres',
          href: '/neighborhood-groups',
          type: 'secondary',
          estimatedTime: '10 minutes',
          estimatedTimePortuguese: '10 minutos',
          value: 'Local support',
          valuePortuguese: 'Apoio local'
        }
      ],
      benefits: [
        'Build meaningful connections at cultural events',
        'Access premium transport with Portuguese-speaking staff',
        'Join location-based Portuguese-speaking community groups'
      ],
      benefitsPortuguese: [
        'Construa conexões significativas em eventos culturais',
        'Acesso a transporte premium com pessoal falante de português',
        'Junte-se a grupos comunitários portugueses baseados em localização'
      ]
    },
    {
      id: 'investment',
      name: 'Premium Investment',
      namePortuguese: 'Investimento Premium',
      description: 'Unlock the full Portuguese-speaking community experience with premium membership.',
      descriptionPortuguese: 'Desbloqueie a experiência completa da comunidade de falantes de português com a subscrição premium.',
      icon: StarIcon,
      color: 'premium',
      progress: calculateInvestmentProgress(),
      isCompleted: calculateInvestmentProgress() >= 100,
      nextActions: [
        {
          id: 'upgrade-premium',
          title: 'Upgrade to Premium Membership',
          titlePortuguese: 'Atualizar para Subscrição Premium',
          description: 'Get full access to transport booking, mentorship, and housing assistance',
          descriptionPortuguese: 'Obtenha acesso completo a reservas de transporte, mentoria e assistência habitacional',
          href: '/subscription',
          type: 'primary',
          estimatedTime: '2 minutes',
          estimatedTimePortuguese: '2 minutos',
          value: 'Complete access £19.99/month',
          valuePortuguese: 'Acesso completo £19.99/mês'
        },
        {
          id: 'use-mentorship',
          title: 'Access Professional Mentorship',
          titlePortuguese: 'Aceder a Mentoria Profissional',
          description: 'Connect with successful Lusophone professionals for career guidance',
          descriptionPortuguese: 'Conecte-se com profissionais portugueses bem-sucedidos para orientação profissional',
          href: '/mentorship',
          type: 'secondary',
          estimatedTime: '30 minutes',
          estimatedTimePortuguese: '30 minutos',
          value: 'Career growth',
          valuePortuguese: 'Crescimento profissional'
        },
        {
          id: 'get-housing-help',
          title: 'Get Housing Assistance',
          titlePortuguese: 'Obter Assistência Habitacional',
          description: 'Access housing support specifically for the Portuguese-speaking community',
          descriptionPortuguese: 'Acesse apoio habitacional especificamente para a comunidade de falantes de português',
          href: '/housing-assistance',
          type: 'tertiary',
          estimatedTime: '20 minutes',
          estimatedTimePortuguese: '20 minutos',
          value: 'Housing security',
          valuePortuguese: 'Segurança habitacional'
        }
      ],
      benefits: [
        'Unlimited transport booking with Lusophone drivers',
        'Access to professional mentorship programs',
        'Housing assistance and neighborhood integration support',
        'Priority access to cultural events and experiences'
      ],
      benefitsPortuguese: [
        'Reservas ilimitadas de transporte com motoristas portugueses',
        'Acesso a programas de mentoria profissional',
        'Assistência habitacional e apoio à integração no bairro',
        'Acesso prioritário a eventos e experiências culturais'
      ]
    },
    {
      id: 'advocacy',
      name: 'Community Advocacy',
      namePortuguese: 'Advocacia Comunitária',
      description: 'Become a Portuguese-speaking community leader and help others discover LusoTown.',
      descriptionPortuguese: 'Torne-se um líder da comunidade de falantes de português e ajude outros a descobrir o LusoTown.',
      icon: MegaphoneIcon,
      color: 'coral',
      progress: calculateAdvocacyProgress(),
      isCompleted: calculateAdvocacyProgress() >= 100,
      nextActions: [
        {
          id: 'refer-friends',
          title: 'Refer Portuguese-speaking Friends',
          titlePortuguese: 'Indicar Amigos Portugueses',
          description: 'Help grow the Portuguese-speaking community by inviting friends and family',
          descriptionPortuguese: 'Ajude a crescer a comunidade de falantes de português convidando amigos e família',
          href: '/referrals',
          type: 'primary',
          estimatedTime: '10 minutes',
          estimatedTimePortuguese: '10 minutos',
          value: 'Community growth',
          valuePortuguese: 'Crescimento comunitário'
        },
        {
          id: 'host-events',
          title: 'Host Cultural Events',
          titlePortuguese: 'Organizar Eventos Culturais',
          description: 'Share Portuguese culture by organizing your own events',
          descriptionPortuguese: 'Partilhe a cultura portuguesa organizando os seus próprios eventos',
          href: '/host',
          type: 'secondary',
          estimatedTime: '1-2 hours',
          estimatedTimePortuguese: '1-2 horas',
          value: 'Cultural preservation',
          valuePortuguese: 'Preservação cultural'
        },
        {
          id: 'share-story',
          title: 'Share Your Success Story',
          titlePortuguese: 'Partilhar a Sua História de Sucesso',
          description: 'Inspire others with your Portuguese-speaking community journey',
          descriptionPortuguese: 'Inspire outros com a sua jornada na comunidade de falantes de português',
          href: '/success-stories',
          type: 'tertiary',
          estimatedTime: '30 minutes',
          estimatedTimePortuguese: '30 minutos',
          value: 'Community inspiration',
          valuePortuguese: 'Inspiração comunitária'
        }
      ],
      benefits: [
        'Become a recognized Portuguese-speaking community leader',
        'Earn rewards for successful referrals',
        'Help preserve and share Portuguese culture',
        'Build a legacy in the London Portuguese-speaking community'
      ],
      benefitsPortuguese: [
        'Torne-se um líder reconhecido da comunidade de falantes de português',
        'Ganhe recompensas por indicações bem-sucedidas',
        'Ajude a preservar e partilhar a cultura portuguesa',
        'Construa um legado na comunidade de falantes de português de Londres'
      ]
    }
  ], [calculateDiscoveryProgress, calculateEngagementProgress, calculateInvestmentProgress, calculateAdvocacyProgress])

  // Calculate progress for each stage based on user activity

  useEffect(() => {
    // Update stages with current progress
    const updatedStages = stages.map(stage => ({
      ...stage,
      progress: stage.id === 'discovery' ? calculateDiscoveryProgress() :
                stage.id === 'engagement' ? calculateEngagementProgress() :
                stage.id === 'investment' ? calculateInvestmentProgress() :
                calculateAdvocacyProgress(),
      isCompleted: stage.id === 'discovery' ? calculateDiscoveryProgress() >= 100 :
                   stage.id === 'engagement' ? calculateEngagementProgress() >= 100 :
                   stage.id === 'investment' ? calculateInvestmentProgress() >= 100 :
                   calculateAdvocacyProgress() >= 100
    }))
    
    setJourneyStages(updatedStages)
    
    // Find current stage (first incomplete stage)
    const currentStageIndex = updatedStages.findIndex(stage => !stage.isCompleted)
    setCurrentStage(currentStageIndex >= 0 ? updatedStages[currentStageIndex] : updatedStages[updatedStages.length - 1])
    
    // Track page visits for progress calculation
    if (currentPage) {
      const visitedPages = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lusotown-visited-pages') || '[]') : []
      if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage)
        typeof window !== 'undefined' && localStorage.setItem('lusotown-visited-pages', JSON.stringify(visitedPages))
      }
    }
  }, [stats, connections, currentPage, stages, calculateDiscoveryProgress, calculateEngagementProgress, calculateInvestmentProgress, calculateAdvocacyProgress])

  const handleActionClick = (action: JourneyAction) => {
    // Track action completion for progress calculation
    localStorage.setItem(`lusotown-action-${action.id}`, 'completed')
    
    // Show success message for certain actions
    if (['complete-profile', 'attend-first-event', 'upgrade-premium'].includes(action.id)) {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  if (variant === 'widget' && currentStage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-${currentStage.color}-100 flex items-center justify-center`}>
            <currentStage.icon className={`w-6 h-6 text-${currentStage.color}-600`} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">
              {isPortuguese ? currentStage.namePortuguese : currentStage.name}
            </h3>
            <p className="text-sm text-gray-600">
              {isPortuguese ? currentStage.descriptionPortuguese : currentStage.description}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{isPortuguese ? 'Progresso' : 'Progress'}</span>
            <span>{currentStage.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`bg-${currentStage.color}-500 h-2 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${currentStage.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Next Action */}
        {currentStage.nextActions.length > 0 && (
          <a
            href={currentStage.nextActions[0].href}
            onClick={() => handleActionClick(currentStage.nextActions[0])}
            className={`block w-full bg-${currentStage.color}-500 text-white text-center py-3 px-4 rounded-xl font-semibold hover:bg-${currentStage.color}-600 transition-colors`}
          >
            {isPortuguese ? currentStage.nextActions[0].titlePortuguese : currentStage.nextActions[0].title}
          </a>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3"
          >
            <CheckCircleIcon className="w-6 h-6" />
            <span className="font-medium">
              {isPortuguese ? 'Progresso atualizado!' : 'Progress updated!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Sua Jornada na Comunidade de Falantes de Português' : 'Your Portuguese-speaking community Journey'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {isPortuguese 
            ? 'Descubra, conecte-se e torne-se parte da vibrante comunidade de falantes de português em Londres. Cada passo aproxima-o mais de casa.'
            : 'Discover, connect, and become part of London\'s vibrant Portuguese-speaking community. Each step brings you closer to home.'
          }
        </p>
      </div>

      {/* Journey Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {journeyStages.map((stage, index) => {
          if (!showCompletedStages && stage.isCompleted) return null
          
          const IconComponent = stage.icon
          
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl border-2 p-8 ${
                stage.id === currentStage?.id 
                  ? `border-${stage.color}-200 shadow-lg` 
                  : stage.isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200'
              }`}
            >
              {/* Stage Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-${stage.color}-100 flex items-center justify-center relative`}>
                  <IconComponent className={`w-8 h-8 text-${stage.color}-600`} />
                  {stage.isCompleted && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {isPortuguese ? stage.namePortuguese : stage.name}
                  </h3>
                  <p className="text-gray-600">
                    {isPortuguese ? stage.descriptionPortuguese : stage.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{isPortuguese ? 'Progresso' : 'Progress'}</span>
                  <span>{stage.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className={`bg-${stage.color}-500 h-3 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.progress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {isPortuguese ? 'Benefícios:' : 'Benefits:'}
                </h4>
                <ul className="space-y-2">
                  {(isPortuguese ? stage.benefitsPortuguese : stage.benefits).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Actions */}
              {!stage.isCompleted && stage.nextActions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    {isPortuguese ? 'Próximos Passos:' : 'Next Steps:'}
                  </h4>
                  {stage.nextActions.map((action) => (
                    <a
                      key={action.id}
                      href={action.href}
                      onClick={() => handleActionClick(action)}
                      className={`block p-4 rounded-xl border transition-all hover:shadow-md ${
                        action.type === 'primary'
                          ? `bg-${stage.color}-500 text-white border-${stage.color}-500 hover:bg-${stage.color}-600`
                          : action.type === 'secondary'
                          ? `bg-white text-${stage.color}-600 border-${stage.color}-200 hover:bg-${stage.color}-50`
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">
                            {isPortuguese ? action.titlePortuguese : action.title}
                          </h5>
                          <p className={`text-sm ${
                            action.type === 'primary' ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {isPortuguese ? action.descriptionPortuguese : action.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className={action.type === 'primary' ? 'text-white/80' : 'text-gray-500'}>
                              ⏱️ {isPortuguese ? action.estimatedTimePortuguese : action.estimatedTime}
                            </span>
                            <span className={action.type === 'primary' ? 'text-white/80' : 'text-gray-500'}>
                              💎 {isPortuguese ? action.valuePortuguese : action.value}
                            </span>
                          </div>
                        </div>
                        <ArrowRightIcon className={`w-5 h-5 ${
                          action.type === 'primary' ? 'text-white' : `text-${stage.color}-600`
                        }`} />
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Completed Badge */}
              {stage.isCompleted && (
                <div className="flex items-center justify-center gap-3 p-4 bg-green-100 rounded-xl">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-700">
                    {isPortuguese ? 'Etapa Concluída!' : 'Stage Completed!'}
                  </span>
                  <SparklesIcon className="w-6 h-6 text-green-600" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Overall Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Seu Progresso na Comunidade' : 'Your Community Progress'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary-600">
              {journeyStages.filter(s => s.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Etapas Concluídas' : 'Stages Completed'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary-600">
              {Math.round(journeyStages.reduce((acc, s) => acc + s.progress, 0) / journeyStages.length)}%
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Progresso Total' : 'Overall Progress'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-600">
              {connections.length}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Conexões' : 'Connections'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-coral-600">
              {stats.eventsAttended}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Eventos' : 'Events'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}