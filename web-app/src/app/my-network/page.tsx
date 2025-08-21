'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  TrophyIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { CrownIcon } from 'lucide-react'
import Footer from '@/components/Footer'
import { useNetworking, ConnectionFilters as ConnectionFiltersType } from '@/context/NetworkingContext'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

// Import components we'll create
import NetworkHeader from '@/components/NetworkHeader'
import ConnectionsGrid from '@/components/ConnectionsGrid'
import SortingControls from '@/components/SortingControls'
import NetworkBadges from '@/components/NetworkBadges'
import ConnectionNotificationBanner from '@/components/ConnectionNotificationBanner'
import ConnectionFilters from '@/components/ConnectionFilters'
import NetworkAnalytics from '@/components/NetworkAnalytics'
import ReferralWidget from '@/components/ReferralWidget'

export default function MyNetworkPage() {
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'
  const {
    connections,
    stats,
    notifications,
    loading,
    getConnections,
    searchConnections,
    filterConnections,
    getUnreadNotificationsCount
  } = useNetworking()

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'most_events' | 'alphabetical' | 'strongest'>('recent')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredConnections, setFilteredConnections] = useState(connections)
  const [activeFilters, setActiveFilters] = useState<ConnectionFiltersType>({})

  // Update filtered connections when search, sort, or filters change
  useEffect(() => {
    let filtered = connections
    
    // Apply text search
    if (searchQuery) {
      filtered = searchConnections(searchQuery)
    }
    
    // Apply advanced filters
    if (Object.keys(activeFilters).length > 0) {
      filtered = filterConnections(activeFilters)
    }
    
    // Apply sorting
    if (filtered.length > 0) {
      filtered = getConnections(sortBy)
    }
    
    setFilteredConnections(filtered)
  }, [searchQuery, sortBy, activeFilters, connections, searchConnections, filterConnections, getConnections])

  const handleFiltersChange = (filters: ConnectionFiltersType) => {
    setActiveFilters(filters)
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="h-16 w-16 bg-secondary-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-secondary-200 rounded mb-2"></div>
                    <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg mb-4">
                  {isPortuguese ? 'Rede Portuguesa • Portuguese Network' : 'Portuguese Network • Rede Portuguesa'}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? 'A Minha Rede' : 'My Network'}
              </h1>
              
              <p className="text-lg sm:text-xl text-secondary-600 mb-8">
                {isPortuguese 
                  ? 'Conecte-se com falantes de português que conheceu em eventos do LusoTown. Construa amizades duradouras e explore Londres juntos.'
                  : 'Connect with Portuguese speakers you\'ve met at LusoTown events. Build lasting friendships and explore London together.'
                }
              </p>

              {/* Network Stats */}
              <NetworkHeader stats={stats} />
            </motion.div>
          </div>
        </section>

        {/* Notification Banner */}
        {getUnreadNotificationsCount() > 0 && (
          <ConnectionNotificationBanner notifications={notifications} />
        )}

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col gap-4">
                {/* Top Row: Search and Controls */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={isPortuguese ? 'Procurar conexões...' : 'Search connections...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center gap-4">
                    <ConnectionFilters 
                      onFiltersChange={handleFiltersChange}
                      activeFilters={activeFilters}
                      onClearFilters={handleClearFilters}
                    />
                    <SortingControls sortBy={sortBy} onSortChange={setSortBy} />
                  </div>
                </div>
                
                {/* Results Count */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary-600">
                    {filteredConnections.length} {isPortuguese ? 'conexões' : 'connections'}
                    {Object.keys(activeFilters).length > 0 && (
                      <span className="ml-2 text-primary-600">
                        ({isPortuguese ? 'filtrado' : 'filtered'})
                      </span>
                    )}
                  </span>
                  {Object.keys(activeFilters).length > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {isPortuguese ? 'Limpar filtros' : 'Clear filters'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Referral Widget */}
                <ReferralWidget variant="compact" showStats={true} />
                
                {/* Network Analytics */}
                <NetworkAnalytics />
                
                {/* Network Badges */}
                <NetworkBadges achievements={stats.achievements} />
                
                {/* Conversation Starters */}
                {/* ConversationStarters component removed */}
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {filteredConnections.length === 0 ? (
                  // Empty State
                  <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                    <div className="text-6xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {searchQuery 
                        ? (isPortuguese ? 'Nenhuma conexão encontrada' : 'No connections found')
                        : (isPortuguese ? 'Comece a fazer conexões!' : 'Start making connections!')
                      }
                    </h3>
                    <p className="text-secondary-600 mb-6">
                      {searchQuery
                        ? (isPortuguese 
                            ? 'Tente ajustar os seus critérios de pesquisa.'
                            : 'Try adjusting your search criteria.')
                        : (isPortuguese 
                            ? 'Participe em eventos do LusoTown para conhecer outros falantes de português.'
                            : 'Attend LusoTown events to meet other Portuguese speakers.')
                      }
                    </p>
                    {!searchQuery && (
                      <a 
                        href={ROUTES.events} 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        {isPortuguese ? 'Explorar Eventos' : 'Explore Events'}
                      </a>
                    )}
                  </div>
                ) : (
                  // Connections Grid
                  <ConnectionsGrid connections={filteredConnections} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}