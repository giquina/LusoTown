'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrophyIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  GiftIcon,
  ShareIcon,
  AcademicCapIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

interface Achievement {
  id: string
  category: 'cultural' | 'networking' | 'business' | 'community' | 'advocacy'
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward: number
  unlockConditions: {
    type: string
    threshold: number
    metadata?: any
  }[]
  isUnlocked: boolean
  unlockedAt?: string
  progress: number
  maxProgress: number
}

interface LoyaltyProgram {
  currentLevel: number
  currentXP: number
  nextLevelXP: number
  levelName: string
  levelNamePortuguese: string
  perks: string[]
  perksPortuguese: string[]
  totalEventsAttended: number
  totalTransportBookings: number
  totalNetworkConnections: number
  communityContributions: number
  referralsSuccessful: number
  monthsActive: number
}

interface CulturalMilestone {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  dateAchieved?: string
  category: 'heritage' | 'language' | 'community' | 'cultural_exchange'
  icon: any
  progress: number
  maxProgress: number
  rewards: {
    xp: number
    badge: string
    exclusive_access?: string
  }
}

interface RetentionGrowthMechanicsProps {
  variant?: 'dashboard' | 'profile' | 'achievements' | 'progress'
  showRecentAchievements?: boolean
  onAchievementUnlock?: (achievement: Achievement) => void
}

export default function RetentionGrowthMechanics({
  variant = 'dashboard',
  showRecentAchievements = true,
  onAchievementUnlock
}: RetentionGrowthMechanicsProps) {
  const { language } = useLanguage()
  const { stats, connections } = useNetworking()
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgram | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [culturalMilestones, setCulturalMilestones] = useState<CulturalMilestone[]>([])
  const [streakData, setStreakData] = useState<any>(null)
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([])
  const [showAchievementPopup, setShowAchievementPopup] = useState<Achievement | null>(null)

  const isPortuguese = language === 'pt'

  // Define achievement system with Portuguese cultural context
  const achievementDefinitions: Achievement[] = [
    {
      id: 'first-connection',
      category: 'networking',
      name: 'First Portuguese Connection',
      namePortuguese: 'Primeira Conexão Portuguesa',
      description: 'Made your first connection in the Portuguese community',
      descriptionPortuguese: 'Fez a sua primeira conexão na comunidade portuguesa',
      icon: '🤝',
      color: 'secondary',
      rarity: 'common',
      xpReward: 100,
      unlockConditions: [
        { type: 'connections_made', threshold: 1 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'cultural-explorer',
      category: 'cultural',
      name: 'Cultural Explorer',
      namePortuguese: 'Explorador Cultural',
      description: 'Attended 3 different Portuguese cultural events',
      descriptionPortuguese: 'Participou em 3 eventos culturais portugueses diferentes',
      icon: '🎭',
      color: 'accent',
      rarity: 'common',
      xpReward: 250,
      unlockConditions: [
        { type: 'cultural_events_attended', threshold: 3 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'transport-pioneer',
      category: 'business',
      name: 'Transport Pioneer',
      namePortuguese: 'Pioneiro do Transporte',
      description: 'First to use Portuguese-speaking transport services',
      descriptionPortuguese: 'Primeiro a usar serviços de transporte falantes de português',
      icon: '🚗',
      color: 'primary',
      rarity: 'rare',
      xpReward: 500,
      unlockConditions: [
        { type: 'transport_bookings', threshold: 1 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'community-connector',
      category: 'networking',
      name: 'Community Connector',
      namePortuguese: 'Conector Comunitário',
      description: 'Connected with 10+ Portuguese community members',
      descriptionPortuguese: 'Conectado com 10+ membros da comunidade portuguesa',
      icon: '🌐',
      color: 'secondary',
      rarity: 'rare',
      xpReward: 750,
      unlockConditions: [
        { type: 'connections_made', threshold: 10 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 10
    },
    {
      id: 'heritage-guardian',
      category: 'cultural',
      name: 'Heritage Guardian',
      namePortuguese: 'Guardião do Património',
      description: 'Actively preserving and sharing Portuguese culture',
      descriptionPortuguese: 'Preservando e partilhando ativamente a cultura portuguesa',
      icon: '🏛️',
      color: 'coral',
      rarity: 'epic',
      xpReward: 1000,
      unlockConditions: [
        { type: 'cultural_contributions', threshold: 5 },
        { type: 'events_attended', threshold: 8 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: 'business-ambassador',
      category: 'business',
      name: 'Business Ambassador',
      namePortuguese: 'Embaixador Empresarial',
      description: 'Leader in Portuguese business community networking',
      descriptionPortuguese: 'Líder no networking da comunidade empresarial portuguesa',
      icon: '💼',
      color: 'premium',
      rarity: 'epic',
      xpReward: 1250,
      unlockConditions: [
        { type: 'business_events_attended', threshold: 5 },
        { type: 'professional_connections', threshold: 15 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: 'community-pillar',
      category: 'advocacy',
      name: 'Community Pillar',
      namePortuguese: 'Pilar da Comunidade',
      description: 'Foundational member who helped shape the community',
      descriptionPortuguese: 'Membro fundacional que ajudou a moldar a comunidade',
      icon: '👑',
      color: 'premium',
      rarity: 'legendary',
      xpReward: 2500,
      unlockConditions: [
        { type: 'months_active', threshold: 12 },
        { type: 'referrals_successful', threshold: 5 },
        { type: 'events_organized', threshold: 2 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 12
    },
    {
      id: 'cultural-bridge',
      category: 'cultural',
      name: 'Cultural Bridge Builder',
      namePortuguese: 'Construtor de Pontes Culturais',
      description: 'Connecting Portuguese speakers across different backgrounds',
      descriptionPortuguese: 'Conectando falantes de português de diferentes origens',
      icon: '🌉',
      color: 'coral',
      rarity: 'rare',
      xpReward: 800,
      unlockConditions: [
        { type: 'diverse_connections', threshold: 8 },
        { type: 'cultural_exchange_events', threshold: 3 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 8
    },
    {
      id: 'premium-pioneer',
      category: 'business',
      name: 'Premium Pioneer',
      namePortuguese: 'Pioneiro Premium',
      description: 'Early adopter of premium Portuguese community services',
      descriptionPortuguese: 'Adotante precoce dos serviços premium da comunidade portuguesa',
      icon: '⭐',
      color: 'premium',
      rarity: 'epic',
      xpReward: 1500,
      unlockConditions: [
        { type: 'premium_subscription_duration', threshold: 6 },
        { type: 'premium_services_used', threshold: 3 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 6
    },
    {
      id: 'storyteller',
      category: 'community',
      name: 'Community Storyteller',
      namePortuguese: 'Contador de Histórias da Comunidade',
      description: 'Shared inspiring stories that motivate others',
      descriptionPortuguese: 'Partilhou histórias inspiradoras que motivam outros',
      icon: '📖',
      color: 'accent',
      rarity: 'rare',
      xpReward: 600,
      unlockConditions: [
        { type: 'stories_shared', threshold: 3 },
        { type: 'community_engagement', threshold: 50 }
      ],
      isUnlocked: false,
      progress: 0,
      maxProgress: 3
    }
  ]

  // Cultural milestones specific to Portuguese heritage
  const culturalMilestoneDefinitions: CulturalMilestone[] = [
    {
      id: 'santos-populares-participation',
      title: 'Santos Populares Celebration',
      titlePortuguese: 'Celebração dos Santos Populares',
      description: 'Participated in traditional Portuguese summer festivals',
      descriptionPortuguese: 'Participou nos festivais tradicionais portugueses de verão',
      category: 'heritage',
      icon: CalendarDaysIcon,
      progress: 0,
      maxProgress: 1,
      rewards: {
        xp: 300,
        badge: '🎊',
        exclusive_access: 'VIP access to Portuguese cultural events'
      }
    },
    {
      id: 'fado-appreciation',
      title: 'Fado Cultural Appreciation',
      titlePortuguese: 'Apreciação Cultural do Fado',
      description: 'Attended Fado performances and learned about this UNESCO heritage',
      descriptionPortuguese: 'Assistiu a performances de Fado e aprendeu sobre este património da UNESCO',
      category: 'cultural_exchange',
      icon: SparklesIcon,
      progress: 0,
      maxProgress: 3,
      rewards: {
        xp: 450,
        badge: '🎵',
        exclusive_access: 'Private Fado sessions with artists'
      }
    },
    {
      id: 'portuguese-cuisine-explorer',
      title: 'Portuguese Cuisine Explorer',
      titlePortuguese: 'Explorador da Culinária Portuguesa',
      description: 'Discovered authentic Portuguese restaurants and food experiences',
      descriptionPortuguese: 'Descobriu restaurantes portugueses autênticos e experiências gastronómicas',
      category: 'cultural_exchange',
      icon: HeartIcon,
      progress: 0,
      maxProgress: 5,
      rewards: {
        xp: 200,
        badge: '🍽️',
        exclusive_access: 'Chef-led Portuguese cooking workshops'
      }
    },
    {
      id: 'language-preservation',
      title: 'Portuguese Language Preservation',
      titlePortuguese: 'Preservação da Língua Portuguesa',
      description: 'Actively using and promoting Portuguese language in the community',
      descriptionPortuguese: 'Usando e promovendo ativamente a língua portuguesa na comunidade',
      category: 'language',
      icon: GiftIcon,
      progress: 0,
      maxProgress: 10,
      rewards: {
        xp: 800,
        badge: '📚',
        exclusive_access: 'Portuguese literature discussion groups'
      }
    }
  ]

  // Loyalty program levels
  const loyaltyLevels = [
    { level: 1, name: 'Portuguese Friend', namePortuguese: 'Amigo Português', xpRequired: 0, perks: ['Community access', 'Basic event notifications'], perksPortuguese: ['Acesso à comunidade', 'Notificações básicas de eventos'] },
    { level: 2, name: 'Cultural Explorer', namePortuguese: 'Explorador Cultural', xpRequired: 500, perks: ['Event discounts', 'Cultural content access'], perksPortuguese: ['Descontos em eventos', 'Acesso a conteúdo cultural'] },
    { level: 3, name: 'Community Member', namePortuguese: 'Membro da Comunidade', xpRequired: 1500, perks: ['Transport booking priority', 'Networking events'], perksPortuguese: ['Prioridade na reserva de transporte', 'Eventos de networking'] },
    { level: 4, name: 'Portuguese Ambassador', namePortuguese: 'Embaixador Português', xpRequired: 3500, perks: ['Premium features', 'Mentorship access'], perksPortuguese: ['Funcionalidades premium', 'Acesso a mentoria'] },
    { level: 5, name: 'Cultural Guardian', namePortuguese: 'Guardião Cultural', xpRequired: 7500, perks: ['VIP access', 'Community leadership'], perksPortuguese: ['Acesso VIP', 'Liderança comunitária'] },
    { level: 6, name: 'Heritage Keeper', namePortuguese: 'Guardião do Património', xpRequired: 15000, perks: ['Exclusive events', 'Cultural advisory role'], perksPortuguese: ['Eventos exclusivos', 'Papel consultivo cultural'] }
  ]

  // Initialize and load data
  useEffect(() => {
    loadUserProgress()
    calculateAchievements()
    updateLoyaltyProgram()
  }, [stats, connections])

  const loadUserProgress = () => {
    // Load from localStorage
    const savedAchievements = localStorage.getItem('lusotown-achievements')
    const savedLoyalty = localStorage.getItem('lusotown-loyalty-program')
    const savedMilestones = localStorage.getItem('lusotown-cultural-milestones')

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements))
    } else {
      setAchievements(achievementDefinitions)
    }

    if (savedLoyalty) {
      setLoyaltyProgram(JSON.parse(savedLoyalty))
    }

    if (savedMilestones) {
      setCulturalMilestones(JSON.parse(savedMilestones))
    } else {
      setCulturalMilestones(culturalMilestoneDefinitions)
    }

    // Calculate streak data
    const lastActivity = localStorage.getItem('lusotown-last-activity')
    const activityHistory = JSON.parse(localStorage.getItem('lusotown-activity-history') || '[]')
    
    setStreakData({
      currentStreak: calculateCurrentStreak(activityHistory),
      longestStreak: calculateLongestStreak(activityHistory),
      lastActivity: lastActivity ? new Date(parseInt(lastActivity)) : null
    })
  }

  const calculateCurrentStreak = (history: any[]): number => {
    // Mock implementation - would calculate based on daily activity
    return Math.floor(Math.random() * 30) + 1
  }

  const calculateLongestStreak = (history: any[]): number => {
    // Mock implementation - would find longest consecutive activity period
    return Math.floor(Math.random() * 60) + 15
  }

  const calculateAchievements = () => {
    let updatedAchievements = [...achievements]
    let newUnlocks: Achievement[] = []

    updatedAchievements.forEach(achievement => {
      if (!achievement.isUnlocked) {
        let progress = 0
        let canUnlock = true

        achievement.unlockConditions.forEach(condition => {
          switch (condition.type) {
            case 'connections_made':
              progress = Math.min(connections.length, condition.threshold)
              if (connections.length < condition.threshold) canUnlock = false
              break
            case 'events_attended':
            case 'cultural_events_attended':
              progress = Math.min(stats.eventsAttended, condition.threshold)
              if (stats.eventsAttended < condition.threshold) canUnlock = false
              break
            case 'transport_bookings':
              const transportBookings = parseInt(localStorage.getItem('lusotown-transport-bookings-count') || '0')
              progress = Math.min(transportBookings, condition.threshold)
              if (transportBookings < condition.threshold) canUnlock = false
              break
            case 'months_active':
              const accountCreated = localStorage.getItem('lusotown-account-created')
              if (accountCreated) {
                const monthsActive = Math.floor((Date.now() - parseInt(accountCreated)) / (1000 * 60 * 60 * 24 * 30))
                progress = Math.min(monthsActive, condition.threshold)
                if (monthsActive < condition.threshold) canUnlock = false
              } else {
                canUnlock = false
              }
              break
            case 'referrals_successful':
              const referrals = JSON.parse(localStorage.getItem('lusotown-successful-referrals') || '[]').length
              progress = Math.min(referrals, condition.threshold)
              if (referrals < condition.threshold) canUnlock = false
              break
            default:
              // Mock progress for other conditions
              progress = Math.floor(Math.random() * condition.threshold)
              if (progress < condition.threshold) canUnlock = false
          }
        })

        achievement.progress = progress

        if (canUnlock && !achievement.isUnlocked) {
          achievement.isUnlocked = true
          achievement.unlockedAt = new Date().toISOString()
          newUnlocks.push(achievement)
        }
      }
    })

    setAchievements(updatedAchievements)
    localStorage.setItem('lusotown-achievements', JSON.stringify(updatedAchievements))

    // Handle new unlocks
    if (newUnlocks.length > 0) {
      setRecentAchievements(prev => [...prev, ...newUnlocks])
      newUnlocks.forEach(achievement => {
        onAchievementUnlock?.(achievement)
        if (showRecentAchievements) {
          setTimeout(() => {
            setShowAchievementPopup(achievement)
            setTimeout(() => setShowAchievementPopup(null), 4000)
          }, 1000)
        }
      })
    }
  }

  const updateLoyaltyProgram = () => {
    // Calculate total XP from achievements
    const totalXP = achievements.reduce((total, achievement) => {
      return total + (achievement.isUnlocked ? achievement.xpReward : 0)
    }, 0)

    // Additional XP from activities
    const activityXP = stats.eventsAttended * 50 + connections.length * 25

    const currentTotalXP = totalXP + activityXP

    // Find current level
    let currentLevel = loyaltyLevels[0]
    for (let i = loyaltyLevels.length - 1; i >= 0; i--) {
      if (currentTotalXP >= loyaltyLevels[i].xpRequired) {
        currentLevel = loyaltyLevels[i]
        break
      }
    }

    // Find next level
    const nextLevelIndex = loyaltyLevels.findIndex(level => level.level === currentLevel.level + 1)
    const nextLevel = nextLevelIndex >= 0 ? loyaltyLevels[nextLevelIndex] : null

    const loyaltyData: LoyaltyProgram = {
      currentLevel: currentLevel.level,
      currentXP: currentTotalXP,
      nextLevelXP: nextLevel ? nextLevel.xpRequired : currentTotalXP,
      levelName: currentLevel.name,
      levelNamePortuguese: currentLevel.namePortuguese,
      perks: currentLevel.perks,
      perksPortuguese: currentLevel.perksPortuguese,
      totalEventsAttended: stats.eventsAttended,
      totalTransportBookings: parseInt(localStorage.getItem('lusotown-transport-bookings-count') || '0'),
      totalNetworkConnections: connections.length,
      communityContributions: parseInt(localStorage.getItem('lusotown-community-contributions') || '0'),
      referralsSuccessful: JSON.parse(localStorage.getItem('lusotown-successful-referrals') || '[]').length,
      monthsActive: Math.floor((Date.now() - parseInt(localStorage.getItem('lusotown-account-created') || Date.now().toString())) / (1000 * 60 * 60 * 24 * 30))
    }

    setLoyaltyProgram(loyaltyData)
    localStorage.setItem('lusotown-loyalty-program', JSON.stringify(loyaltyData))
  }

  if (!loyaltyProgram) return null

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Loyalty Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-premium-500 to-premium-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AcademicCapIcon className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">
                {isPortuguese ? loyaltyProgram.levelNamePortuguese : loyaltyProgram.levelName}
              </h3>
              <p className="text-premium-100">
                {isPortuguese ? 'Nível' : 'Level'} {loyaltyProgram.currentLevel}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{loyaltyProgram.currentXP} XP</div>
            <div className="text-sm text-premium-200">
              {loyaltyProgram.currentXP}/{loyaltyProgram.nextLevelXP} {isPortuguese ? 'para próximo nível' : 'to next level'}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-premium-400 rounded-full h-3 mb-4">
          <motion.div
            className="bg-white h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(loyaltyProgram.currentXP / loyaltyProgram.nextLevelXP) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* Current Perks */}
        <div className="grid grid-cols-2 gap-3">
          {(isPortuguese ? loyaltyProgram.perksPortuguese : loyaltyProgram.perks).slice(0, 4).map((perk, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircleIcon className="w-4 h-4 text-premium-200" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <CalendarDaysIcon className="w-6 h-6 mx-auto mb-2 text-accent-600" />
          <div className="text-2xl font-bold text-gray-900">{loyaltyProgram.totalEventsAttended}</div>
          <div className="text-sm text-secondary-600">{isPortuguese ? 'Eventos' : 'Events'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <UserGroupIcon className="w-6 h-6 mx-auto mb-2 text-secondary-600" />
          <div className="text-2xl font-bold text-gray-900">{loyaltyProgram.totalNetworkConnections}</div>
          <div className="text-sm text-secondary-600">{isPortuguese ? 'Conexões' : 'Connections'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <TrophyIcon className="w-6 h-6 mx-auto mb-2 text-coral-600" />
          <div className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.isUnlocked).length}</div>
          <div className="text-sm text-secondary-600">{isPortuguese ? 'Conquistas' : 'Achievements'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
          <FireIcon className="w-6 h-6 mx-auto mb-2 text-orange-600" />
          <div className="text-2xl font-bold text-gray-900">{streakData?.currentStreak || 0}</div>
          <div className="text-sm text-secondary-600">{isPortuguese ? 'Sequência' : 'Day Streak'}</div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-accent-500" />
            {isPortuguese ? 'Conquistas Recentes' : 'Recent Achievements'}
          </h3>
          <div className="space-y-3">
            {recentAchievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {isPortuguese ? achievement.namePortuguese : achievement.name}
                  </h4>
                  <p className="text-sm text-secondary-600">
                    {isPortuguese ? achievement.descriptionPortuguese : achievement.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-premium-600">+{achievement.xpReward} XP</div>
                  <div className="text-xs text-gray-500">{achievement.rarity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Conquistas da Comunidade Portuguesa' : 'Portuguese Community Achievements'}
        </h2>
        <p className="text-secondary-600">
          {isPortuguese ? 'Celebre a sua jornada na comunidade portuguesa' : 'Celebrate your journey in the Portuguese community'}
        </p>
      </div>

      {/* Achievement Categories */}
      {['cultural', 'networking', 'business', 'community', 'advocacy'].map((category) => {
        const categoryAchievements = achievements.filter(a => a.category === category)
        if (categoryAchievements.length === 0) return null

        const categoryNames = {
          cultural: { en: 'Cultural Heritage', pt: 'Património Cultural' },
          networking: { en: 'Community Networking', pt: 'Networking Comunitário' },
          business: { en: 'Business Excellence', pt: 'Excelência Empresarial' },
          community: { en: 'Community Contribution', pt: 'Contribuição Comunitária' },
          advocacy: { en: 'Community Advocacy', pt: 'Advocacia Comunitária' }
        }

        return (
          <div key={category} className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isPortuguese ? categoryNames[category as keyof typeof categoryNames].pt : categoryNames[category as keyof typeof categoryNames].en}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.isUnlocked
                      ? `border-${achievement.color}-200 bg-${achievement.color}-50`
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl ${achievement.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">
                        {isPortuguese ? achievement.namePortuguese : achievement.name}
                      </h4>
                      <p className="text-sm text-secondary-600 mb-2">
                        {isPortuguese ? achievement.descriptionPortuguese : achievement.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
                        <motion.div
                          className={`bg-${achievement.color}-500 h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                        <span className={`font-bold text-${achievement.color}-600`}>
                          {achievement.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  // Achievement unlock popup
  const achievementPopup = showAchievementPopup && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-2xl border-2 border-yellow-300 shadow-2xl p-6 max-w-sm"
      >
        <div className="text-center">
          <div className="text-4xl mb-3">{showAchievementPopup.icon}</div>
          <h3 className="font-bold text-gray-900 mb-2">
            {isPortuguese ? 'Conquista Desbloqueada!' : 'Achievement Unlocked!'}
          </h3>
          <h4 className="font-semibold text-secondary-800 mb-1">
            {isPortuguese ? showAchievementPopup.namePortuguese : showAchievementPopup.name}
          </h4>
          <p className="text-sm text-secondary-600 mb-3">
            {isPortuguese ? showAchievementPopup.descriptionPortuguese : showAchievementPopup.description}
          </p>
          <div className="text-lg font-bold text-premium-600">
            +{showAchievementPopup.xpReward} XP
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <div>
      {variant === 'dashboard' && renderDashboard()}
      {variant === 'achievements' && renderAchievements()}
      {achievementPopup}
    </div>
  )
}