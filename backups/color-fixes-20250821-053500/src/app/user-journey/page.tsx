'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  TruckIcon, 
  CalendarDaysIcon,
  CogIcon,
  ArrowRightIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'
import ProgressiveUserJourney from '@/components/ProgressiveUserJourney'
import CrossPlatformEngagementTriggers from '@/components/CrossPlatformEngagementTriggers'
import OnboardingFlowEnhanced from '@/components/OnboardingFlowEnhanced'
import ConversionOptimizationEngine from '@/components/ConversionOptimizationEngine'
import RetentionGrowthMechanics from '@/components/RetentionGrowthMechanics'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { useNetworking } from '@/context/NetworkingContext'

export default function UserJourneyPage() {
  const { language, t } = useLanguage()
  const { stats, connections } = useNetworking()
  const [activeTab, setActiveTab] = useState<'journey' | 'achievements' | 'analytics' | 'settings'>('journey')
  const [userActivity, setUserActivity] = useState<string[]>([])
  const [userSegment, setUserSegment] = useState<'new' | 'active' | 'engaged' | 'premium' | 'dormant'>('active')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  const isPortuguese = language === 'pt'

  useEffect(() => {
    // Determine user segment based on activity
    determineUserSegment()
    
    // Load user activity
    loadUserActivity()
    
    // Load analytics data
    loadAnalyticsData()
    
    // Check if onboarding should be shown
    const hasCompletedOnboarding = localStorage.getItem('lusotown-onboarding-completed')
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true)
    }
  }, [stats, connections])

  const determineUserSegment = () => {
    const subscriptionActive = localStorage.getItem('lusotown-subscription-active') === 'true'
    const lastActivity = localStorage.getItem('lusotown-last-activity')
    const daysSinceActivity = lastActivity 
      ? Math.floor((Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60 * 24))
      : 999

    if (subscriptionActive) {
      setUserSegment('premium')
    } else if (daysSinceActivity > 30) {
      setUserSegment('dormant')
    } else if (stats.eventsAttended > 3 || connections.length > 5) {
      setUserSegment('engaged')
    } else if (stats.eventsAttended > 0 || connections.length > 0) {
      setUserSegment('active')
    } else {
      setUserSegment('new')
    }
  }

  const loadUserActivity = () => {
    const activity: string[] = []
    
    // Check various activity indicators
    if (localStorage.getItem('lusotown-transport-booked')) activity.push('used_transport')
    if (stats.eventsAttended > 0) activity.push('attended_events')
    if (connections.length > 0) activity.push('made_connections')
    if (localStorage.getItem('lusotown-profile-completed')) activity.push('completed_profile')
    if (localStorage.getItem('lusotown-mentorship-used')) activity.push('used_mentorship')
    if (localStorage.getItem('lusotown-housing-assistance-used')) activity.push('used_housing')
    
    // Add mock activity based on page visits
    const visitedPages = JSON.parse(localStorage.getItem('lusotown-visited-pages') || '[]')
    if (visitedPages.includes('/transport')) activity.push('viewed_transport')
  if (visitedPages.includes(ROUTES.events)) activity.push('viewed_events')
    if (visitedPages.includes('/my-network')) activity.push('viewed_networking')
    
    setUserActivity(activity)
  }

  const loadAnalyticsData = () => {
    // Mock analytics data - in real app would come from API
    const data = {
      totalUsers: 750,
      newUsersThisMonth: 125,
      averageSessionDuration: '8m 32s',
      conversionRate: '18.5%',
      userJourneyMetrics: {
        discoveryToEngagement: '65%',
        engagementToInvestment: '28%',
        investmentToAdvocacy: '42%'
      },
      topConversionPaths: [
        { path: 'Events → Transport → Premium', rate: '22%', users: 165 },
        { path: 'Networking → Mentorship → Premium', rate: '19%', users: 143 },
        { path: 'Transport → Housing → Premium', rate: '15%', users: 113 },
        { path: 'Cultural Events → Community → Advocacy', rate: '12%', users: 90 }
      ],
      retentionMetrics: {
        day7: '78%',
        day30: '54%',
        day90: '38%',
        day365: '22%'
      }
    }
    setAnalyticsData(data)
  }

  const handleOnboardingComplete = (data: any) => {
    setShowOnboarding(false)
    
    // Update user activity based on onboarding data
    const newActivity = [...userActivity, 'completed_onboarding', 'completed_profile']
    if (data.role === 'student') newActivity.push('indicated_student_status')
    if (data.housingStatus === 'new-to-uk') newActivity.push('indicated_housing_need', 'new_to_uk')
    if (data.businessNeeds?.length > 0) newActivity.push('indicated_professional_interest')
    
    setUserActivity(newActivity)
  }

  const handleConversion = (opportunityId: string, conversionType: string, value: number) => {
    
    // Update analytics
    if (analyticsData) {
      setAnalyticsData(prev => ({
        ...prev,
        totalConversions: (prev.totalConversions || 0) + 1,
        totalRevenue: (prev.totalRevenue || 0) + value
      }))
    }
  }

  const tabs = [
    {
      id: 'journey',
      name: isPortuguese ? 'Jornada do Utilizador' : 'User Journey',
      icon: ChartBarIcon,
      description: isPortuguese ? 'Acompanhe o seu progresso na comunidade' : 'Track your community progress'
    },
    {
      id: 'achievements',
      name: isPortuguese ? 'Conquistas' : 'Achievements',
      icon: TrophyIcon,
      description: isPortuguese ? 'Conquistas e marcos culturais' : 'Achievements and cultural milestones'
    },
    {
      id: 'analytics',
      name: isPortuguese ? 'Análises' : 'Analytics',
      icon: ChartBarIcon,
      description: isPortuguese ? 'Dados da comunidade e crescimento' : 'Community data and growth insights'
    },
    {
      id: 'settings',
      name: isPortuguese ? 'Configurações' : 'Settings',
      icon: CogIcon,
      description: isPortuguese ? 'Personalizar a sua experiência' : 'Customize your experience'
    }
  ]

  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {isPortuguese 
                  ? 'Sua Jornada na Comunidade Portuguesa' 
                  : 'Your Portuguese Community Journey'
                }
              </h1>
              <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Descubra como está a progredir na nossa vibrante comunidade portuguesa em Londres e Reino Unido. Cada passo aproxima-o mais de casa.'
                  : 'Discover how you\'re progressing in our vibrant Portuguese community across London and the UK. Each step brings you closer to home.'
                }
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{connections.length}</div>
                  <div className="text-primary-200 text-sm">{isPortuguese ? 'Conexões' : 'Connections'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{stats.eventsAttended}</div>
                  <div className="text-primary-200 text-sm">{isPortuguese ? 'Eventos' : 'Events'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{userActivity.length}</div>
                  <div className="text-primary-200 text-sm">{isPortuguese ? 'Atividades' : 'Activities'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white capitalize">{userSegment}</div>
                  <div className="text-primary-200 text-sm">{isPortuguese ? 'Segmento' : 'Segment'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{tab.name}</div>
                      <div className="text-xs text-gray-500">{tab.description}</div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {activeTab === 'journey' && (
                <motion.div
                  key="journey"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProgressiveUserJourney 
                    variant="full" 
                    currentPage="/user-journey"
                  />
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RetentionGrowthMechanics 
                    variant="achievements"
                    showRecentAchievements={true}
                  />
                </motion.div>
              )}

              {activeTab === 'analytics' && analyticsData && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Community Growth Metrics */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Métricas da Comunidade' : 'Community Metrics'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                        <UserGroupIcon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                        <div className="text-3xl font-bold text-primary-700">{analyticsData.totalUsers}</div>
                        <div className="text-sm text-primary-600">{isPortuguese ? 'Total de Membros' : 'Total Members'}</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
                        <SparklesIcon className="w-8 h-8 mx-auto mb-3 text-secondary-600" />
                        <div className="text-3xl font-bold text-secondary-700">{analyticsData.newUsersThisMonth}</div>
                        <div className="text-sm text-secondary-600">{isPortuguese ? 'Novos Este Mês' : 'New This Month'}</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                        <CalendarDaysIcon className="w-8 h-8 mx-auto mb-3 text-accent-600" />
                        <div className="text-3xl font-bold text-accent-700">{analyticsData.averageSessionDuration}</div>
                        <div className="text-sm text-accent-600">{isPortuguese ? 'Duração Média' : 'Avg. Duration'}</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-coral-50 to-coral-100 rounded-xl">
                        <TruckIcon className="w-8 h-8 mx-auto mb-3 text-coral-600" />
                        <div className="text-3xl font-bold text-coral-700">{analyticsData.conversionRate}</div>
                        <div className="text-sm text-coral-600">{isPortuguese ? 'Taxa de Conversão' : 'Conversion Rate'}</div>
                      </div>
                    </div>
                  </div>

                  {/* User Journey Flow */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Fluxo da Jornada do Utilizador' : 'User Journey Flow'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-primary-600 mb-2">
                          {analyticsData.userJourneyMetrics.discoveryToEngagement}
                        </div>
                        <div className="text-sm text-gray-600">
                          {isPortuguese ? 'Descoberta → Envolvimento' : 'Discovery → Engagement'}
                        </div>
                      </div>
                      <div className="text-center p-6 border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-secondary-600 mb-2">
                          {analyticsData.userJourneyMetrics.engagementToInvestment}
                        </div>
                        <div className="text-sm text-gray-600">
                          {isPortuguese ? 'Envolvimento → Investimento' : 'Engagement → Investment'}
                        </div>
                      </div>
                      <div className="text-center p-6 border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-accent-600 mb-2">
                          {analyticsData.userJourneyMetrics.investmentToAdvocacy}
                        </div>
                        <div className="text-sm text-gray-600">
                          {isPortuguese ? 'Investimento → Advocacia' : 'Investment → Advocacy'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Conversion Paths */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Principais Caminhos de Conversão' : 'Top Conversion Paths'}
                    </h3>
                    <div className="space-y-4">
                      {analyticsData.topConversionPaths.map((path: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{path.path}</div>
                            <div className="text-sm text-gray-600">{path.users} {isPortuguese ? 'utilizadores' : 'users'}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">{path.rate}</div>
                            <div className="text-xs text-gray-500">{isPortuguese ? 'taxa' : 'rate'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Configurações da Jornada' : 'Journey Settings'}
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {isPortuguese ? 'Reiniciar Onboarding' : 'Reset Onboarding'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isPortuguese 
                              ? 'Refaça o processo de integração para atualizar as suas preferências'
                              : 'Redo the onboarding process to update your preferences'
                            }
                          </p>
                        </div>
                        <button
                          onClick={() => setShowOnboarding(true)}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          {isPortuguese ? 'Reiniciar' : 'Reset'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {isPortuguese ? 'Limpar Dados de Progresso' : 'Clear Progress Data'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isPortuguese 
                              ? 'Remove todas as conquistas e dados de progresso'
                              : 'Remove all achievements and progress data'
                            }
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            localStorage.removeItem('lusotown-achievements')
                            localStorage.removeItem('lusotown-loyalty-program')
                            localStorage.removeItem('lusotown-completed-actions')
                            window.location.reload()
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          {isPortuguese ? 'Limpar' : 'Clear'}
                        </button>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <h3 className="font-semibold text-amber-800 mb-2">
                          {isPortuguese ? 'Estado Atual do Utilizador' : 'Current User Status'}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-amber-700">{isPortuguese ? 'Segmento:' : 'Segment:'}</span>
                            <span className="ml-2 font-semibold capitalize">{userSegment}</span>
                          </div>
                          <div>
                            <span className="text-amber-700">{isPortuguese ? 'Atividades:' : 'Activities:'}</span>
                            <span className="ml-2 font-semibold">{userActivity.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Engagement Triggers and Conversion Engine */}
        <CrossPlatformEngagementTriggers
          currentPage="/user-journey"
          userActivity={userActivity}
        />
        
        <ConversionOptimizationEngine
          currentPage="/user-journey"
          userActivity={userActivity}
          userSegment={userSegment}
          onConversion={handleConversion}
        />

        {/* Enhanced Onboarding */}
        {showOnboarding && (
          <OnboardingFlowEnhanced
            onComplete={handleOnboardingComplete}
            onSkip={() => setShowOnboarding(false)}
            variant="full"
          />
        )}
      </main>
      <Footer />
    </>
  )
}