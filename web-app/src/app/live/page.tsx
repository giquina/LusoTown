'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, ClockIcon, UserGroupIcon, EyeIcon, HeartIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { Crown, Calendar, Users, Tv, Video, Zap } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import SubscriptionGate from '@/components/SubscriptionGate'
import StreamPlayer from '@/components/StreamPlayer'
import StreamSchedule from '@/components/StreamSchedule'
import StreamReplayLibrary from '@/components/StreamReplayLibrary'
import StreamViewerStats from '@/components/StreamViewerStats'
import StreamCategories from '@/components/StreamCategories'
import LiveChatWidget from '@/components/LiveChatWidget'

export default function LiveStreamingPage() {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, isInTrial, subscriptionRequired } = useSubscription()
  const [currentStream, setCurrentStream] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewerCount, setViewerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration - in production, this would come from YouTube API
  const streamCategories = [
    {
      id: 'portuguese-culture',
      name: language === 'pt' ? 'Conteúdo Cultural Português' : 'Portuguese Cultural Content',
      description: language === 'pt' ? 'Música tradicional portuguesa, noites de fado, celebrações culturais' : 'Traditional Portuguese music, fado nights, cultural celebrations',
      icon: '🎵',
      color: 'primary',
      isPremium: false,
      streamCount: 12
    },
    {
      id: 'business-workshops',
      name: language === 'pt' ? 'Workshops de Negócios' : 'Business Workshops',
      description: language === 'pt' ? 'Desenvolvimento profissional, workshops de IA, marketing digital' : 'Professional development, AI workshops, digital marketing',
      icon: '💼',
      color: 'action',
      isPremium: true,
      streamCount: 8
    },
    {
      id: 'community-events',
      name: language === 'pt' ? 'Eventos Comunitários' : 'Community Events',
      description: language === 'pt' ? 'Reuniões comunitárias, anúncios, sessões interativas' : 'Community meetings, announcements, interactive sessions',
      icon: '👥',
      color: 'secondary',
      isPremium: false,
      streamCount: 15
    },
    {
      id: 'student-sessions',
      name: language === 'pt' ? 'Sessões de Estudantes' : 'Student Sessions',
      description: language === 'pt' ? 'Grupos de estudo, conselhos de carreira, apoio académico' : 'Study groups, career advice, academic support',
      icon: '🎓',
      color: 'accent',
      isPremium: false,
      streamCount: 6
    },
    {
      id: 'vip-business',
      name: language === 'pt' ? 'Mesas Redondas VIP' : 'VIP Business Roundtables',
      description: language === 'pt' ? 'Conteúdo premium exclusivo com líderes da indústria' : 'Exclusive premium content with industry leaders',
      icon: '👑',
      color: 'premium',
      isPremium: true,
      streamCount: 4
    }
  ]

  // Mock current live stream
  const mockLiveStream = {
    id: 'live-fado-night-2025',
    title: language === 'pt' ? 'Noite de Fado ao Vivo com Maria Santos' : 'Live Fado Night with Maria Santos',
    description: language === 'pt' ? 'Junte-se a nós para uma noite especial de fado tradicional português ao vivo de Londres' : 'Join us for a special night of traditional Portuguese fado live from London',
    category: 'portuguese-culture',
    isLive: true,
    scheduledStart: new Date().toISOString(),
    viewerCount: 127,
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    youtubeVideoId: 'dQw4w9WgXcQ', // Mock YouTube video ID
    host: 'Maria Santos',
    duration: 90,
    tags: ['fado', 'music', 'portuguese', 'culture', 'live']
  }

  useEffect(() => {
    // Simulate loading current stream data
    const timer = setTimeout(() => {
      setCurrentStream(mockLiveStream)
      setViewerCount(mockLiveStream.viewerCount)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [language])

  // Simulate real-time viewer count updates
  useEffect(() => {
    if (!currentStream?.isLive) return

    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 6) - 2 // -2 to +3 viewers
        return Math.max(0, prev + change)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [currentStream])

  const handleStreamInteraction = (type: string) => {
    console.log(`Stream interaction: ${type}`)
    // In production, this would update the database and trigger networking connections
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 lg:pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-64 md:h-96 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-full rounded"></div>
                    <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-300 h-48 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20 lg:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-action-500 to-secondary-500 p-3 rounded-full">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {language === 'pt' ? 'LusoTown TV' : 'LusoTown TV'}
                </h1>
                {currentStream?.isLive && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-action-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {language === 'pt' ? 'AO VIVO' : 'LIVE'}
                  </motion.div>
                )}
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'O canal oficial da comunidade portuguesa em Londres. Programação cultural, workshops de negócios e eventos comunitários exclusivos.'
                  : 'The official Portuguese community channel in London. Cultural programming, business workshops, and exclusive community events.'
                }
              </p>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Stream Player - Takes up 2/3 of desktop width */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Live Stream Player */}
                {currentStream && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <StreamPlayer 
                      stream={currentStream}
                      hasAccess={!currentStream.isPremium || hasActiveSubscription || isInTrial}
                      onInteraction={handleStreamInteraction}
                    />
                    
                    {/* Stream Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {currentStream.title}
                          </h2>
                          <p className="text-gray-600 mb-3">
                            {currentStream.description}
                          </p>
                          
                          {/* Stream Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <EyeIcon className="w-4 h-4" />
                              <span>{viewerCount.toLocaleString()} {language === 'pt' ? 'espectadores' : 'viewers'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{currentStream.duration} {language === 'pt' ? 'min' : 'min'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserGroupIcon className="w-4 h-4" />
                              <span>{language === 'pt' ? 'Apresentado por' : 'Hosted by'} {currentStream.host}</span>
                            </div>
                            {currentStream.isPremium && (
                              <div className="flex items-center gap-1 text-premium-600">
                                <Crown className="w-4 h-4" />
                                <span>{language === 'pt' ? 'Premium' : 'Premium'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stream Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleStreamInteraction('like')}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <HeartIcon className="w-4 h-4" />
                          <span className="text-sm">{language === 'pt' ? 'Gostar' : 'Like'}</span>
                        </button>
                        <button
                          onClick={() => handleStreamInteraction('share')}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ShareIcon className="w-4 h-4" />
                          <span className="text-sm">{language === 'pt' ? 'Partilhar' : 'Share'}</span>
                        </button>
                        <button
                          onClick={() => handleStreamInteraction('save')}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <BookmarkIcon className="w-4 h-4" />
                          <span className="text-sm">{language === 'pt' ? 'Guardar' : 'Save'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stream Categories */}
                <StreamCategories 
                  categories={streamCategories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  hasActiveSubscription={hasActiveSubscription || isInTrial}
                />

                {/* Upcoming Schedule */}
                <StreamSchedule 
                  category={selectedCategory}
                  language={language}
                />

              </div>

              {/* Sidebar - Takes up 1/3 of desktop width */}
              <div className="space-y-6">
                
                {/* Viewer Stats */}
                <StreamViewerStats 
                  currentViewers={viewerCount}
                  peakViewers={156}
                  totalViews={2847}
                  language={language}
                />

                {/* Live Chat Widget */}
                {currentStream?.isLive && (
                  <LiveChatWidget 
                    streamId={currentStream.id}
                    isLive={true}
                    hasAccess={!currentStream.isPremium || hasActiveSubscription || isInTrial}
                  />
                )}

                {/* Premium Subscription Prompt */}
                {subscriptionRequired && (
                  <SubscriptionGate
                    feature={language === 'pt' ? 'streaming premium' : 'premium streaming'}
                    description={language === 'pt' 
                      ? 'Aceda a conteúdo exclusivo, workshops de negócios e replays de streams.'
                      : 'Access exclusive content, business workshops, and stream replays.'
                    }
                    compact={true}
                  />
                )}

                {/* Quick Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'pt' ? 'Navegação Rápida' : 'Quick Navigation'}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#schedule"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium">
                        {language === 'pt' ? 'Programação' : 'Schedule'}
                      </span>
                    </a>
                    <a
                      href="#replays"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Video className="w-5 h-5 text-secondary-600" />
                      <span className="text-sm font-medium">
                        {language === 'pt' ? 'Replays' : 'Replays'}
                      </span>
                    </a>
                    <a
                      href="#community"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-5 h-5 text-action-600" />
                      <span className="text-sm font-medium">
                        {language === 'pt' ? 'Comunidade' : 'Community'}
                      </span>
                    </a>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Stream Replay Library */}
            <div id="replays" className="mt-12">
              <StreamReplayLibrary 
                hasAccess={hasActiveSubscription || isInTrial}
                selectedCategory={selectedCategory}
                language={language}
              />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}