'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserGroupIcon,
  GiftIcon,
  ShareIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon,
  CurrencyPoundIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LinkIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline'
import { CrownIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface ReferralReward {
  id: string
  type: 'monetary' | 'service_credit' | 'exclusive_access' | 'cultural_bonus'
  name: string
  namePortuguese: string
  value: string
  valuePortuguese: string
  description: string
  descriptionPortuguese: string
  requirements: {
    referralsNeeded: number
    timeframe?: string
    conditions?: string[]
  }
  isUnlocked: boolean
  icon: any
  color: string
}

interface ReferralMethod {
  id: string
  method: 'whatsapp' | 'email' | 'sms' | 'link' | 'qr_code' | 'social_media'
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  conversionRate: number
  culturalRelevance: number // 1-5 scale for Portuguese community
  icon: any
  isActive: boolean
}

interface CulturalIncentive {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  culturalSignificance: string
  culturalSignificancePortuguese: string
  eligibility: {
    region: string[]
    events: string[]
    minimumReferrals: number
  }
  value: string
  valuePortuguese: string
  expiresAt?: string
}

interface PortugueseCommunityReferralSystemProps {
  variant?: 'full' | 'widget' | 'modal'
  showCulturalIncentives?: boolean
  targetRegion?: string
  onReferralSent?: (method: string, count: number) => void
}

export default function PortugueseCommunityReferralSystem({
  variant = 'full',
  showCulturalIncentives = true,
  targetRegion = 'london',
  onReferralSent
}: PortugueseCommunityReferralSystemProps) {
  const { language } = useLanguage()
  const { connections, stats } = useNetworking()
  const [userReferrals, setUserReferrals] = useState<any[]>([])
  const [selectedMethod, setSelectedMethod] = useState<ReferralMethod | null>(null)
  const [referralCode, setReferralCode] = useState<string>('')
  const [totalEarnings, setTotalEarnings] = useState<number>(0)
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false)

  const isPortuguese = language === 'pt'

  // Referral rewards with Portuguese cultural context
  const referralRewards: ReferralReward[] = [
    {
      id: 'first-referral',
      type: 'monetary',
      name: 'First Portuguese Friend Bonus',
      namePortuguese: 'Bónus do Primeiro Amigo Português',
      value: '£10 credit',
      valuePortuguese: '£10 de crédito',
      description: 'Earn £10 when your first Portuguese friend joins LusoTown',
      descriptionPortuguese: 'Ganhe £10 quando o seu primeiro amigo português se juntar ao LusoTown',
      requirements: {
        referralsNeeded: 1,
        timeframe: '30 days',
        conditions: ['Friend must be Portuguese speaker', 'Friend must complete profile']
      },
      isUnlocked: false,
      icon: HeartIcon,
      color: 'coral'
    },
    {
      id: 'community-builder',
      type: 'service_credit',
      name: 'Community Builder',
      namePortuguese: 'Construtor de Comunidade',
      value: 'Free premium transport',
      valuePortuguese: 'Transporte premium gratuito',
      description: 'Get 3 free premium transport bookings for bringing 3 Portuguese speakers',
      descriptionPortuguese: 'Obtenha 3 reservas gratuitas de transporte premium por trazer 3 falantes de português',
      requirements: {
        referralsNeeded: 3,
        timeframe: '60 days',
        conditions: ['All friends must be active users', 'At least one must book transport']
      },
      isUnlocked: false,
      icon: UserGroupIcon,
      color: 'primary'
    },
    {
      id: 'cultural-ambassador',
      type: 'exclusive_access',
      name: 'Cultural Ambassador',
      namePortuguese: 'Embaixador Cultural',
      value: 'VIP cultural events access',
      valuePortuguese: 'Acesso VIP a eventos culturais',
      description: 'Exclusive access to private Fado nights and Portuguese cultural events',
      descriptionPortuguese: 'Acesso exclusivo a noites privadas de Fado e eventos culturais portugueses',
      requirements: {
        referralsNeeded: 5,
        timeframe: '90 days',
        conditions: ['Focus on Portuguese cultural enthusiasts', 'Must attend at least one cultural event']
      },
      isUnlocked: false,
      icon: SparklesIcon,
      color: 'secondary'
    },
    {
      id: 'community-champion',
      type: 'cultural_bonus',
      name: 'Community Champion',
      namePortuguese: 'Campeão da Comunidade',
      value: 'Cultural tour package',
      valuePortuguese: 'Pacote de tour cultural',
      description: 'Free Portuguese cultural tour of London + dinner for you and a friend',
      descriptionPortuguese: 'Tour gratuito da cultura portuguesa de Londres + jantar para si e um amigo',
      requirements: {
        referralsNeeded: 8,
        timeframe: '120 days',
        conditions: ['Diverse referrals (Portugal, Brazil, Angola, etc.)', 'High engagement referrals']
      },
      isUnlocked: false,
      icon: TrophyIcon,
      color: 'accent'
    },
    {
      id: 'lusophone-legend',
      type: 'exclusive_access',
      name: 'Lusophone Legend',
      namePortuguese: 'Lenda Lusófona',
      value: 'Lifetime premium + recognition',
      valuePortuguese: 'Premium vitalício + reconhecimento',
      description: 'Lifetime premium membership + featured community leader profile',
      descriptionPortuguese: 'Subscrição premium vitalícia + perfil destacado de líder comunitário',
      requirements: {
        referralsNeeded: 15,
        conditions: ['Consistent quality referrals', 'Community leadership', 'Cultural contribution']
      },
      isUnlocked: false,
      icon: CrownIcon,
      color: 'premium'
    }
  ]

  // Referral methods optimized for Portuguese community
  const referralMethods: ReferralMethod[] = [
    {
      id: 'whatsapp',
      method: 'whatsapp',
      name: 'WhatsApp Groups',
      namePortuguese: 'Grupos WhatsApp',
      description: 'Share with Portuguese WhatsApp groups and family chats',
      descriptionPortuguese: 'Partilhe com grupos WhatsApp portugueses e conversas familiares',
      conversionRate: 35.2,
      culturalRelevance: 5,
      icon: ChatBubbleLeftRightIcon,
      isActive: true
    },
    {
      id: 'direct-link',
      method: 'link',
      name: 'Direct Link',
      namePortuguese: 'Link Direto',
      description: 'Personal referral link for sharing anywhere',
      descriptionPortuguese: 'Link de indicação pessoal para partilhar em qualquer lugar',
      conversionRate: 22.8,
      culturalRelevance: 4,
      icon: LinkIcon,
      isActive: true
    },
    {
      id: 'email',
      method: 'email',
      name: 'Email Invitation',
      namePortuguese: 'Convite por Email',
      description: 'Personalized email invitations with Portuguese cultural content',
      descriptionPortuguese: 'Convites personalizados por email com conteúdo cultural português',
      conversionRate: 18.5,
      culturalRelevance: 3,
      icon: EnvelopeIcon,
      isActive: true
    },
    {
      id: 'qr-code',
      method: 'qr_code',
      name: 'QR Code',
      namePortuguese: 'Código QR',
      description: 'QR code for in-person sharing at Portuguese events',
      descriptionPortuguese: 'Código QR para partilha presencial em eventos portugueses',
      conversionRate: 28.1,
      culturalRelevance: 4,
      icon: QrCodeIcon,
      isActive: true
    },
    {
      id: 'social-media',
      method: 'social_media',
      name: 'Social Media',
      namePortuguese: 'Redes Sociais',
      description: 'Share on Facebook, Instagram with Portuguese community hashtags',
      descriptionPortuguese: 'Partilhe no Facebook, Instagram com hashtags da comunidade portuguesa',
      conversionRate: 12.3,
      culturalRelevance: 3,
      icon: ShareIcon,
      isActive: true
    }
  ]

  // Cultural incentives for specific Portuguese celebrations and events
  const culturalIncentives: CulturalIncentive[] = [
    {
      id: 'santos-populares-2024',
      title: 'Santos Populares Celebration Bonus',
      titlePortuguese: 'Bónus da Celebração dos Santos Populares',
      description: 'Special referral rewards during Santos Populares season (June)',
      descriptionPortuguese: 'Recompensas especiais de indicação durante a época dos Santos Populares (Junho)',
      culturalSignificance: 'Traditional Portuguese summer festivals celebrating Santo António, São João, and São Pedro',
      culturalSignificancePortuguese: 'Festivais tradicionais portugueses de verão celebrando Santo António, São João e São Pedro',
      eligibility: {
        region: ['london', 'uk'],
        events: ['santos_populares_events'],
        minimumReferrals: 2
      },
      value: 'Double referral rewards + free event access',
      valuePortuguese: 'Recompensas de indicação duplas + acesso gratuito a evento',
      expiresAt: '2024-06-30'
    },
    {
      id: 'dia-de-portugal-2024',
      title: 'Dia de Portugal Community Drive',
      titlePortuguese: 'Campanha Comunitária do Dia de Portugal',
      description: 'Build our community for Portugal Day celebrations',
      descriptionPortuguese: 'Construa a nossa comunidade para as celebrações do Dia de Portugal',
      culturalSignificance: 'Portuguese National Day celebrating Portuguese culture and heritage',
      culturalSignificancePortuguese: 'Dia Nacional de Portugal celebrando a cultura e património português',
      eligibility: {
        region: ['london', 'uk'],
        events: ['dia_de_portugal'],
        minimumReferrals: 1
      },
      value: '£15 bonus per Portuguese referral',
      valuePortuguese: '£15 de bónus por cada indicação portuguesa'
    },
    {
      id: 'winter-saudade-campaign',
      title: 'Winter Saudade Campaign',
      titlePortuguese: 'Campanha Saudade de Inverno',
      description: 'Help fellow Portuguese speakers fight winter loneliness in London',
      descriptionPortuguese: 'Ajude outros falantes de português a combater a solidão do inverno em Londres',
      culturalSignificance: 'Addressing the unique Portuguese concept of "saudade" and community support',
      culturalSignificancePortuguese: 'Abordando o conceito português único de "saudade" e apoio comunitário',
      eligibility: {
        region: ['london'],
        events: ['winter_events'],
        minimumReferrals: 3
      },
      value: 'Warm winter meetup package + transport credits',
      valuePortuguese: 'Pacote de encontro de inverno caloroso + créditos de transporte'
    }
  ]

  useEffect(() => {
    loadUserReferrals()
    generateReferralCode()
    calculateEarnings()
  }, [])

  const loadUserReferrals = () => {
    // Mock referral data
    const mockReferrals = [
      { id: '1', name: 'Maria Silva', status: 'active', date: '2024-08-10', reward: 10 },
      { id: '2', name: 'João Santos', status: 'pending', date: '2024-08-12', reward: 0 },
      { id: '3', name: 'Ana Costa', status: 'active', date: '2024-08-15', reward: 10 }
    ]
    setUserReferrals(mockReferrals)
  }

  const generateReferralCode = () => {
    // Generate unique referral code
    const userId = localStorage.getItem('lusotown-user-id') || 'demo-user'
    const code = `LUSO${userId.slice(-4).toUpperCase()}PT`
    setReferralCode(code)
  }

  const calculateEarnings = () => {
    const active = userReferrals.filter(r => r.status === 'active')
    const earnings = active.reduce((total, referral) => total + referral.reward, 0)
    setTotalEarnings(earnings)
  }

  const handleReferralMethod = (method: ReferralMethod) => {
    setSelectedMethod(method)
    setShowReferralModal(true)
  }

  const sendReferral = (method: string, recipients: number = 1) => {
    // Track referral sending
    onReferralSent?.(method, recipients)
    
    // Update local storage
    const sentReferrals = JSON.parse(localStorage.getItem('lusotown-sent-referrals') || '[]')
    sentReferrals.push({
      method,
      recipients,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('lusotown-sent-referrals', JSON.stringify(sentReferrals))
    
    setShowReferralModal(false)
  }

  const getReferralURL = (code: string): string => {
    return `https://lusotown.london?ref=${code}&utm_source=referral&utm_medium=${selectedMethod?.method}&utm_campaign=portuguese_community`
  }

  const generateWhatsAppMessage = (): string => {
    const url = getReferralURL(referralCode)
    return isPortuguese 
      ? `Olá! 👋 Descobri uma plataforma incrível para a comunidade portuguesa em Londres - LusoTown! 🇵🇹\n\nTens eventos culturais, transporte premium com motoristas portugueses, networking profissional e muito mais. A comunidade já tem 750+ membros!\n\nUsa o meu código ${referralCode} e ambos ganhamos £10 de crédito! 🎁\n\n${url}\n\n#LusoTown #ComunidadePortuguesaLondres`
      : `Hi! 👋 I found an amazing platform for the Portuguese community in London - LusoTown! 🇵🇹\n\nThey have cultural events, premium transport with Portuguese drivers, professional networking and much more. The community already has 750+ members!\n\nUse my code ${referralCode} and we both get £10 credit! 🎁\n\n${url}\n\n#LusoTown #PortugueseCommunityLondon`
  }

  const renderReferralRewards = () => (
    <div className="space-y-4">
      {referralRewards.map((reward) => {
        const IconComponent = reward.icon
        const progress = Math.min((userReferrals.filter(r => r.status === 'active').length / reward.requirements.referralsNeeded) * 100, 100)
        
        return (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 rounded-xl p-6 transition-all ${
              reward.isUnlocked || progress === 100
                ? `border-${reward.color}-200 bg-${reward.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-${reward.color}-100 flex items-center justify-center`}>
                <IconComponent className={`w-8 h-8 text-${reward.color}-600`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {isPortuguese ? reward.namePortuguese : reward.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {isPortuguese ? reward.descriptionPortuguese : reward.description}
                </p>
                
                <div className="flex items-center gap-4 mb-3">
                  <span className={`text-lg font-bold text-${reward.color}-600`}>
                    {isPortuguese ? reward.valuePortuguese : reward.value}
                  </span>
                  {reward.requirements.timeframe && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {reward.requirements.timeframe}
                    </span>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                      {userReferrals.filter(r => r.status === 'active').length} / {reward.requirements.referralsNeeded} {isPortuguese ? 'indicações' : 'referrals'}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`bg-${reward.color}-500 h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
                
                {progress === 100 && !reward.isUnlocked && (
                  <button className={`bg-${reward.color}-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-${reward.color}-600 transition-colors`}>
                    {isPortuguese ? 'Resgatar Recompensa' : 'Claim Reward'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  const renderReferralMethods = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {referralMethods.map((method) => {
        const IconComponent = method.icon
        
        return (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleReferralMethod(method)}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {isPortuguese ? method.namePortuguese : method.name}
                </h3>
                <div className="text-sm text-gray-600">
                  {method.conversionRate}% {isPortuguese ? 'conversão' : 'conversion'}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {isPortuguese ? method.descriptionPortuguese : method.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(method.culturalRelevance)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <ArrowRightIcon className="w-4 h-4 text-gray-400" />
            </div>
          </motion.button>
        )
      })}
    </div>
  )

  const renderCulturalIncentives = () => (
    <div className="space-y-4">
      {culturalIncentives.map((incentive) => (
        <motion.div
          key={incentive.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-coral-50 to-accent-50 border border-coral-200 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {isPortuguese ? incentive.titlePortuguese : incentive.title}
              </h3>
              <p className="text-gray-600">
                {isPortuguese ? incentive.descriptionPortuguese : incentive.description}
              </p>
            </div>
            {incentive.expiresAt && (
              <div className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full whitespace-nowrap">
                {isPortuguese ? 'Expira em breve' : 'Expires soon'}
              </div>
            )}
          </div>
          
          <div className="bg-white/60 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              {isPortuguese ? 'Significado Cultural:' : 'Cultural Significance:'}
            </h4>
            <p className="text-sm text-gray-700">
              {isPortuguese ? incentive.culturalSignificancePortuguese : incentive.culturalSignificance}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-coral-600">
              {isPortuguese ? incentive.valuePortuguese : incentive.value}
            </span>
            <button className="bg-coral-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-600 transition-colors">
              {isPortuguese ? 'Participar' : 'Join Campaign'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )

  if (variant === 'widget') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-primary-600" />
          {isPortuguese ? 'Sistema de Indicações' : 'Referral System'}
        </h3>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">£{totalEarnings}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Ganhos totais' : 'Total earnings'}</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{userReferrals.length}</div>
            <div className="text-sm text-gray-600">{isPortuguese ? 'Amigos indicados' : 'Friends referred'}</div>
          </div>
          
          <button
            onClick={() => setShowReferralModal(true)}
            className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            {isPortuguese ? 'Indicar Amigos' : 'Refer Friends'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Sistema de Indicações da Comunidade Portuguesa' : 'Portuguese Community Referral System'}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {isPortuguese 
            ? 'Ajude a crescer a nossa comunidade portuguesa em Londres e Reino Unido. Ganhe recompensas por cada amigo português que trouxer!'
            : 'Help grow our Portuguese community across London and the UK. Earn rewards for every Portuguese friend you bring!'
          }
        </p>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-primary-600">£{totalEarnings}</div>
          <div className="text-gray-600">{isPortuguese ? 'Ganhos Totais' : 'Total Earnings'}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-secondary-600">{userReferrals.length}</div>
          <div className="text-gray-600">{isPortuguese ? 'Indicações Enviadas' : 'Referrals Sent'}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-accent-600">
            {userReferrals.filter(r => r.status === 'active').length}
          </div>
          <div className="text-gray-600">{isPortuguese ? 'Amigos Ativos' : 'Active Friends'}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-coral-600">{referralCode}</div>
          <div className="text-gray-600">{isPortuguese ? 'Seu Código' : 'Your Code'}</div>
        </div>
      </div>

      {/* Referral Methods */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Métodos de Indicação' : 'Referral Methods'}
        </h2>
        {renderReferralMethods()}
      </div>

      {/* Reward Tiers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isPortuguese ? 'Níveis de Recompensa' : 'Reward Tiers'}
        </h2>
        {renderReferralRewards()}
      </div>

      {/* Cultural Incentives */}
      {showCulturalIncentives && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HeartIcon className="w-6 h-6 text-coral-600" />
            {isPortuguese ? 'Incentivos Culturais Especiais' : 'Special Cultural Incentives'}
          </h2>
          {renderCulturalIncentives()}
        </div>
      )}

      {/* Referral Modal */}
      <AnimatePresence>
        {showReferralModal && selectedMethod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReferralModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isPortuguese ? selectedMethod.namePortuguese : selectedMethod.name}
                </h2>
                <button
                  onClick={() => setShowReferralModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {selectedMethod.method === 'whatsapp' && (
                <div className="space-y-4">
                  <textarea
                    value={generateWhatsAppMessage()}
                    readOnly
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none text-sm"
                  />
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sendReferral('whatsapp')}
                    className="block w-full bg-green-500 text-white text-center py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    {isPortuguese ? 'Abrir WhatsApp' : 'Open WhatsApp'}
                  </a>
                </div>
              )}

              {selectedMethod.method === 'link' && (
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Seu link de indicação:' : 'Your referral link:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={getReferralURL(referralCode)}
                        readOnly
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(getReferralURL(referralCode))
                          sendReferral('link')
                        }}
                        className="bg-primary-500 text-white px-4 py-2 rounded font-semibold hover:bg-primary-600 transition-colors"
                      >
                        {isPortuguese ? 'Copiar' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod.method === 'qr_code' && (
                <div className="space-y-4 text-center">
                  <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center">
                    <QrCodeIcon className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {isPortuguese 
                      ? 'Código QR seria gerado aqui para partilha presencial'
                      : 'QR code would be generated here for in-person sharing'
                    }
                  </p>
                  <button
                    onClick={() => sendReferral('qr_code')}
                    className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                  >
                    {isPortuguese ? 'Gerar QR Code' : 'Generate QR Code'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}