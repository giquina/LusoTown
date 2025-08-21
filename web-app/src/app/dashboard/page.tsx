'use client'

import React, { useState, useEffect } from 'react'
import { authService, User } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { socialMedia } from '@/config/contact'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import Footer from '@/components/Footer'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import EcosystemOverview from '@/components/EcosystemOverview'
import UnifiedActivity from '@/components/UnifiedActivity'
import SmartRecommendations from '@/components/SmartRecommendations'
import QuickActions from '@/components/QuickActions'
import EcosystemStats from '@/components/EcosystemStats'
import SocialFeed from '@/components/social/SocialFeed'
import { 
  Heart, 
  Calendar, 
  Users, 
  Settings, 
  MapPin, 
  Star, 
  Plus,
  BookOpen,
  Wine,
  Dumbbell,
  Palette,
  Coffee,
  Music,
  Camera,
  Plane,
  User as UserIcon,
  Crown,
  Shield,
  LogOut,
  Activity,
  Network,
  Car,
  Sparkles,
  Twitter
} from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  maxAttendees: number
  image: string
  isFavorite: boolean
  membershipRequired: 'free' | 'core' | 'premium'
}

const DUMMY_EVENTS: Event[] = [
  {
    id: 'book-club-jan',
    title: 'Book Club: "Women Who Run With Wolves"',
    description: 'Join our monthly book discussion in a cozy Kensington café. This month we\'re exploring Clarissa Pinkola Estés\' powerful work.',
    date: '2024-08-15',
    time: '19:00',
    location: 'The Literary Café, Kensington',
    category: 'Books & Reading',
    attendees: 12,
    maxAttendees: 15,
    image: '/events/book-club.jpg',
    isFavorite: false,
    membershipRequired: 'core'
  },
  {
    id: 'wine-tasting-feb',
    title: 'Wine Tasting: Italian Varietals',
    description: 'Discover the rich flavors of Italian wines with our sommelier guide. Perfect for beginners and enthusiasts alike.',
    date: '2024-08-18',
    time: '18:30',
    location: 'Vinoteca, Marylebone',
    category: 'Wine & Dining',
    attendees: 8,
    maxAttendees: 12,
    image: '/events/wine-tasting.jpg',
    isFavorite: false,
    membershipRequired: 'premium'
  },
  {
    id: 'yoga-march',
    title: 'Morning Yoga in Hyde Park',
    description: 'Start your Saturday with gentle yoga surrounded by nature. All levels welcome, mats provided.',
    date: '2024-08-20',
    time: '09:00',
    location: 'Hyde Park Speaker\'s Corner',
    category: 'Fitness & Wellness',
    attendees: 18,
    maxAttendees: 20,
    image: '/events/yoga.jpg',
    isFavorite: false,
    membershipRequired: 'free'
  },
  {
    id: 'art-gallery-tour',
    title: 'Tate Modern Gallery Tour',
    description: 'Explore contemporary art with our knowledgeable guide. Coffee and discussion afterward.',
    date: '2024-08-22',
    time: '14:00',
    location: 'Tate Modern, South Bank',
    category: 'Arts & Culture',
    attendees: 6,
    maxAttendees: 10,
    image: '/events/art-tour.jpg',
    isFavorite: false,
    membershipRequired: 'free'
  },
  {
    id: 'networking-brunch',
    title: 'Professional Women\'s Brunch',
    description: 'Network with accomplished women across industries. Premium members get priority seating.',
    date: '2024-08-25',
    time: '11:00',
    location: 'Sketch, Mayfair',
    category: 'Networking',
    attendees: 15,
    maxAttendees: 25,
    image: '/events/networking.jpg',
    isFavorite: false,
    membershipRequired: 'premium'
  }
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>(DUMMY_EVENTS)
  const [activeTab, setActiveTab] = useState('ecosystem')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { language, t } = useLanguage()
  const { 
    userJourney, 
    getPersonalizedRecommendations,
    getPortugueseCommunityInsights,
    calculateMembershipBenefits,
    getUserTimeline
  } = usePlatformIntegration()
  const { stats, connections } = useNetworking()
  const { hasActiveSubscription, membershipTier } = useSubscription()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    // Update events with user's favorites
    const updatedEvents = DUMMY_EVENTS.map(event => ({
      ...event,
      isFavorite: currentUser.favoriteEvents.includes(event.id)
    }))
    
    setUser(currentUser)
    setEvents(updatedEvents)
    setLoading(false)
  }, [router])

  const handleLogout = async () => {
    await authService.logout()
    router.push('/')
  }

  const toggleFavorite = async (eventId: string) => {
    const event = events.find(e => e.id === eventId)
    if (!event) return

    const action = event.isFavorite ? 'remove' : 'add'
    await authService.updateFavorites(eventId, action)

    // Update local state
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, isFavorite: !e.isFavorite } : e
    ))
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Books & Reading': <BookOpen className="w-4 h-4" />,
      'Wine & Dining': <Wine className="w-4 h-4" />,
      'Fitness & Wellness': <Dumbbell className="w-4 h-4" />,
      'Arts & Culture': <Palette className="w-4 h-4" />,
      'Networking': <Coffee className="w-4 h-4" />,
      'Music': <Music className="w-4 h-4" />,
      'Photography': <Camera className="w-4 h-4" />,
      'Travel': <Plane className="w-4 h-4" />
    }
    return icons[category] || <Calendar className="w-4 h-4" />
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <UserIcon className="w-3 h-3" />, color: 'bg-gray-100 text-gray-600', label: 'Free' },
      core: { icon: <Star className="w-3 h-3" />, color: 'bg-[#FF6B6B] text-white', label: 'Core' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const canAccessEvent = (eventRequirement: string, userTier: string) => {
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[eventRequirement as keyof typeof tierLevels]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const favoriteEvents = events.filter(e => e.isFavorite)
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date())
  const accessibleEvents = upcomingEvents.filter(e => canAccessEvent(e.membershipRequired, user.membershipTier))

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Dashboard Content */}
      <div className="pt-16 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <div className="flex items-center space-x-2">
                  {getMembershipBadge(user.membershipTier).icon}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipBadge(user.membershipTier).color}`}>
                    {getMembershipBadge(user.membershipTier).label} Member
                  </span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Admin</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.location}</p>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'ecosystem', label: language === 'pt' ? 'Ecossistema' : 'Ecosystem', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'activity', label: language === 'pt' ? 'Atividade' : 'Activity', icon: <Activity className="w-4 h-4" /> },
                  { id: 'networking', label: language === 'pt' ? 'Rede' : 'Network', icon: <Network className="w-4 h-4" /> },
                  { id: 'services', label: language === 'pt' ? 'Serviços' : 'Services', icon: <Car className="w-4 h-4" /> },
                  { id: 'events', label: language === 'pt' ? 'Eventos' : 'Events', icon: <Users className="w-4 h-4" /> },
                  { id: 'social', label: language === 'pt' ? 'Comunidade' : 'Social', icon: <Twitter className="w-4 h-4" /> },
                  { id: 'favorites', label: language === 'pt' ? 'Favoritos' : 'Favorites', icon: <Heart className="w-4 h-4" /> },
                  { id: 'profile', label: language === 'pt' ? 'Perfil' : 'Profile', icon: <Settings className="w-4 h-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'ecosystem' && (
              <div className="space-y-6">
                {/* Unified Ecosystem Overview */}
                <EcosystemOverview />
                
                {/* Platform Integration Stats */}
                <EcosystemStats />

                {/* Smart Recommendations */}
                <SmartRecommendations />

                {/* Quick Actions */}
                <QuickActions onTabChange={setActiveTab} />
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                {/* Unified Activity Timeline */}
                <UnifiedActivity activities={getUserTimeline() || []} />
                
                {/* Platform Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{language === 'pt' ? 'Conexões da Rede' : 'Network Connections'}</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalConnections}</p>
                      </div>
                      <Network className="w-8 h-8 text-primary-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{language === 'pt' ? 'Eventos Participados' : 'Events Attended'}</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.eventsAttended}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-secondary-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{language === 'pt' ? 'Pontos da Plataforma' : 'Platform Points'}</p>
                        <p className="text-2xl font-bold text-gray-900">{userJourney?.lifetimeValue || 0}</p>
                      </div>
                      <Star className="w-8 h-8 text-accent-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'networking' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{language === 'pt' ? 'Sua Rede Portuguesa' : 'Your Portuguese Network'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{language === 'pt' ? 'Estatísticas da Rede' : 'Network Stats'}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">{language === 'pt' ? 'Total de Conexões' : 'Total Connections'}</span>
                          <span className="font-semibold text-primary-600">{stats.totalConnections}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">{language === 'pt' ? 'Eventos Compartilhados' : 'Shared Events'}</span>
                          <span className="font-semibold text-secondary-600">{stats.eventsAttended}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">{language === 'pt' ? 'Crescimento Mensal' : 'Monthly Growth'}</span>
                          <span className="font-semibold text-accent-600">+{stats.monthlyGrowth || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{language === 'pt' ? 'Conexões Recentes' : 'Recent Connections'}</h3>
                      <div className="space-y-3">
                        {connections.slice(0, 3).map(connection => (
                          <div key={connection.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {connection.connectedUser.firstName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{connection.connectedUser.firstName} {connection.connectedUser.lastName || ''}</p>
                              <p className="text-sm text-gray-600">{connection.sharedEventsCount} {language === 'pt' ? 'eventos compartilhados' : 'shared events'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">{language === 'pt' ? 'Seus Serviços' : 'Your Services'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Car className="w-6 h-6 text-primary-500" />
                        <h3 className="font-semibold text-gray-900">{language === 'pt' ? 'Transporte Premium' : 'Premium Transport'}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{language === 'pt' ? 'Serviços de transporte profissional com foco na comunidade portuguesa' : 'Professional transport services with Portuguese community focus'}</p>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>• {language === 'pt' ? 'Motoristas que falam português' : 'Portuguese-speaking drivers'}</p>
                        <p>• {language === 'pt' ? 'Segurança licenciada SIA' : 'SIA-licensed security'}</p>
                        <p>• {language === 'pt' ? 'Tours culturais portugueses' : 'Portuguese cultural tours'}</p>
                      </div>
                      <button 
                        onClick={() => router.push(ROUTES.transport)}
                        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        {language === 'pt' ? 'Reservar Transporte' : 'Book Transport'}
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-6 h-6 text-secondary-500" />
                        <h3 className="font-semibold text-gray-900">{language === 'pt' ? 'Suporte Comunitário' : 'Community Support'}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{language === 'pt' ? 'Assistência habitacional, grupos de vizinhança e mentoria' : 'Housing assistance, neighborhood groups, and mentorship'}</p>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>• {language === 'pt' ? 'Assistência habitacional' : 'Housing assistance'}</p>
                        <p>• {language === 'pt' ? 'Grupos de vizinhança' : 'Neighborhood groups'}</p>
                        <p>• {language === 'pt' ? 'Programas de mentoria' : 'Mentorship programs'}</p>
                      </div>
                      <button 
                        onClick={() => router.push('/housing-assistance')}
                        className="w-full px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                      >
                        {language === 'pt' ? 'Acessar Suporte' : 'Access Support'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {t('dashboard.social.title')}
                      </h2>
                      <p className="text-gray-600">
                        {t('dashboard.social.subtitle')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg flex items-center justify-center">
                        <Twitter className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Feed Integration */}
                  <SocialFeed 
                    initialFilter="all"
                    className="mt-6"
                  />
                </div>
                
                {/* Additional Social Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dashboard.social.share_events')}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('dashboard.social.share_events_desc')}
                    </p>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="w-full px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>{t('dashboard.social.view_events')}</span>
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('dashboard.social.follow_lusotown')}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('dashboard.social.follow_desc')}
                    </p>
                    <a
                      href={socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>{t('dashboard.social.follow')}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">All Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 relative">
                        <EventImageWithFallback
                          src={event.image}
                          alt={event.title}
                          category={event.category}
                          className="object-cover"
                          fill
                          priority
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="text-white text-center">
                            {getCategoryIcon(event.category)}
                            <p className="mt-2 font-medium">{event.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 flex-1">{event.title}</h3>
                          <button
                            onClick={() => toggleFavorite(event.id)}
                            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                event.isFavorite 
                                  ? 'text-[#FF6B6B] fill-current' 
                                  : 'text-gray-400 hover:text-[#FF6B6B]'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees}/{event.maxAttendees} attending</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipBadge(event.membershipRequired).color}`}>
                            {getMembershipBadge(event.membershipRequired).label} Required
                          </span>
                          {canAccessEvent(event.membershipRequired, user.membershipTier) ? (
                            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                              {language === 'pt' ? 'Participar' : 'Join Event'}
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm">
                              {language === 'pt' ? 'Upgrade Necessário' : 'Upgrade Needed'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Favorite Events</h2>
                {favoriteEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">Start adding events to your favorites to see them here!</p>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {language === 'pt' ? 'Explorar Eventos' : 'Browse Events'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteEvents.map(event => (
                      <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center">
                          <div className="text-white text-center">
                            {getCategoryIcon(event.category)}
                            <p className="mt-2 font-medium">{event.category}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 flex-1">{event.title}</h3>
                            <button
                              onClick={() => toggleFavorite(event.id)}
                              className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Heart className="w-5 h-5 text-[#FF6B6B] fill-current" />
                            </button>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                              {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={user.location}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Membership</label>
                      <div className="flex items-center space-x-2">
                        {getMembershipBadge(user.membershipTier).icon}
                        <span className={`px-3 py-2 rounded-lg text-sm font-medium ${getMembershipBadge(user.membershipTier).color}`}>
                          {getMembershipBadge(user.membershipTier).label} Member
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#FF6B6B] text-white rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        {language === 'pt' ? 'Atualizar Perfil' : 'Update Profile'}
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        {language === 'pt' ? 'Alterar Senha' : 'Change Password'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}