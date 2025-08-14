'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  PhotoIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import SaveFavoriteCartButton from '@/components/SaveFavoriteCartButton'
import ImprovedEventCard from '@/components/ImprovedEventCard'
import EventToursCard from '@/components/EventToursCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Event, EventFilters, eventService, EVENT_CATEGORIES } from '@/lib/events'
import { EventTour, EventToursFilters, EventsToursService, EVENT_TOUR_CATEGORIES } from '@/lib/events-tours'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

// EventCard component is no longer needed - using ImprovedEventCard instead

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange 
}: { 
  isOpen: boolean
  onClose: () => void
  filters: EventFilters
  onFilterChange: (filters: EventFilters) => void 
}) => {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:relative lg:shadow-none lg:bg-transparent"
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">{isPortuguese ? 'Filtros' : 'Filters'}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{isPortuguese ? 'Categoria' : 'Category'}</h4>
                <div className="space-y-2">
                  {Object.entries(EVENT_CATEGORIES).map(([category, info]) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!filters.category}
                      onChange={() => onFilterChange({ ...filters, category: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">{isPortuguese ? 'Todas as Categorias' : 'All Categories'}</span>
                  </label>
                </div>
              </div>

              {/* Membership Level */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{isPortuguese ? 'Acesso de Membros' : 'Membership Access'}</h4>
                <div className="space-y-2">
                  {[
                    { value: 'free', label: isPortuguese ? 'Membros Grátis' : 'Free Members' },
                    { value: 'core', label: isPortuguese ? 'Membros Core+' : 'Core Members+' },
                    { value: 'premium', label: isPortuguese ? 'Apenas Premium' : 'Premium Only' }
                  ].map((tier) => (
                    <label key={tier.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="membershipLevel"
                        value={tier.value}
                        checked={filters.membershipLevel === tier.value}
                        onChange={(e) => onFilterChange({ ...filters, membershipLevel: e.target.value as any })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{tier.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membershipLevel"
                      value=""
                      checked={!filters.membershipLevel}
                      onChange={() => onFilterChange({ ...filters, membershipLevel: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">{isPortuguese ? 'Todos os Níveis' : 'All Levels'}</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{isPortuguese ? 'Disponibilidade' : 'Availability'}</h4>
                <div className="space-y-2">
                  {[
                    { value: 'available', label: isPortuguese ? 'Disponível Agora' : 'Available Now' },
                    { value: 'waitlist', label: isPortuguese ? 'Apenas Lista de Espera' : 'Waitlist Only' },
                    { value: 'all', label: isPortuguese ? 'Mostrar Todos' : 'Show All' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={(e) => onFilterChange({ ...filters, availability: e.target.value as any })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{isPortuguese ? 'Faixa de Preço' : 'Price Range'}</h4>
                <div className="space-y-2">
                  {[
                    { min: 0, max: 0, label: isPortuguese ? 'Grátis' : 'Free' },
                    { min: 1, max: 25, label: '£1 - £25' },
                    { min: 26, max: 50, label: '£26 - £50' },
                    { min: 51, max: 100, label: '£51 - £100' },
                    { min: 101, max: 999, label: '£100+' }
                  ].map((range) => (
                    <label key={`${range.min}-${range.max}`} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={`${range.min}-${range.max}`}
                        checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                        onChange={() => onFilterChange({ ...filters, priceRange: { min: range.min, max: range.max } })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value=""
                      checked={!filters.priceRange}
                      onChange={() => onFilterChange({ ...filters, priceRange: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">{isPortuguese ? 'Qualquer Preço' : 'Any Price'}</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => onFilterChange({})}
                className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isPortuguese ? 'Limpar Todos os Filtros' : 'Clear All Filters'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function EventsPage() {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  const [activeTab, setActiveTab] = useState<'events' | 'tours'>('events')

  // Check URL parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get('tab')
      if (tabParam === 'tours') {
        setActiveTab('tours')
      }
    }
  }, [])
  const [events, setEvents] = useState<Event[]>([])
  const [tours, setTours] = useState<EventTour[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [eventFilters, setEventFilters] = useState<EventFilters>({})
  const [tourFilters, setTourFilters] = useState<EventToursFilters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'rating'>('date')

  useEffect(() => {
    loadContent()
  }, [activeTab, eventFilters, tourFilters, sortBy])

  const loadContent = async () => {
    setLoading(true)
    try {
      if (activeTab === 'events') {
        const searchFilters = { ...eventFilters }
        if (searchQuery) {
          searchFilters.searchQuery = searchQuery
        }
        
        const eventData = await eventService.getEvents(searchFilters, { field: sortBy, direction: 'asc' })
        setEvents(eventData)
      } else {
        const searchFilters = { ...tourFilters }
        if (searchQuery) {
          searchFilters.searchQuery = searchQuery
        }
        
        let tourData = EventsToursService.getEventsTours(searchFilters)
        
        // Apply sorting for tours
        if (sortBy === 'popularity') {
          tourData = tourData.sort((a, b) => b.currentAttendees - a.currentAttendees)
        } else if (sortBy === 'rating') {
          tourData = tourData.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        } else {
          tourData = tourData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        }
        
        setTours(tourData)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
    setLoading(false)
  }

  const handleSearch = () => {
    loadContent()
  }

  const handleEventFilterChange = (newFilters: EventFilters) => {
    setEventFilters(newFilters)
  }

  const handleTourFilterChange = (newFilters: EventToursFilters) => {
    setTourFilters(newFilters)
  }

  const handleTourCategoryChange = (category?: string) => {
    setTourFilters({ ...tourFilters, category })
  }

  const currentFilters = activeTab === 'events' ? eventFilters : tourFilters
  const currentData = activeTab === 'events' ? events : tours
  const featuredItems = activeTab === 'events' 
    ? events.filter(event => event.featured)
    : tours.filter(tour => tour.featured)

  // Calculate category counts
  const eventCounts = activeTab === 'tours' 
    ? Object.keys(EVENT_TOUR_CATEGORIES).reduce((acc, category) => {
        acc[category] = EventsToursService.getEventToursByCategory(category).length
        return acc
      }, {} as Record<string, number>)
    : {}

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>
          
          <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg mb-4">
                  {isPortuguese ? 'Unidos pela Língua • United by Language' : 'Unidos pela Língua • United by Language'}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                {activeTab === 'events' 
                  ? (isPortuguese ? 'Seu Calendário Social Português' : 'Your Portuguese Social Calendar')
                  : (isPortuguese ? 'Experiências Grupais & Tours' : 'Group Experiences & Tours')
                }
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 mb-8"
              >
                {activeTab === 'events'
                  ? (isPortuguese 
                      ? 'Para falantes de português em todo o Reino Unido, com foco principal em Londres - reserve experiências e viva a vida junto com outros falantes de português. De museus londrinos a noites de concertos, jogos de futebol a escapadas de fim de semana - seu calendário social espera!'
                      : 'For Portuguese speakers across the UK, with main focus on London - book experiences and live life together with fellow Portuguese speakers. From London museums to concert nights, football matches to weekend getaways - your social calendar awaits!')
                  : (isPortuguese 
                      ? 'Reserve experiências exclusivas com falantes de português em todo o Reino Unido. Desde grupos especializados para mulheres 30+ e 40+ até experiências familiares - encontre sua comunidade e explore o Reino Unido juntos.'
                      : 'Book exclusive group experiences with Portuguese speakers across the UK. From specialized groups for Women 30+ and 40+ to family-friendly activities - find your community and explore the UK together.')
                }
              </motion.p>

              {/* Tab Navigation */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200">
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      activeTab === 'events'
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {isPortuguese ? 'Eventos' : 'Events'}
                  </button>
                  <button
                    onClick={() => setActiveTab('tours')}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      activeTab === 'tours'
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {isPortuguese ? 'Tours & Experiências' : 'Tours & Experiences'}
                  </button>
                </div>
              </motion.div>

              {/* Dynamic Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
                    {activeTab === 'events' ? '200+' : `${tours.length}+`}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activeTab === 'events' 
                      ? (isPortuguese ? 'Experiências Mensais' : 'Monthly Experiences')
                      : (isPortuguese ? 'Experiências' : 'Experiences')
                    }
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">
                    {activeTab === 'events' ? '500+' : Object.keys(EVENT_TOUR_CATEGORIES).length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activeTab === 'events'
                      ? (isPortuguese ? 'Falantes de Português' : 'Portuguese Speakers')
                      : (isPortuguese ? 'Categorias' : 'Categories')
                    }
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                    {activeTab === 'events' ? '10+' : featuredItems.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activeTab === 'events'
                      ? (isPortuguese ? 'Países Lusófonos' : 'Lusophone Countries')
                      : (isPortuguese ? 'Destaque' : 'Featured')
                    }
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  placeholder={activeTab === 'events'
                    ? (isPortuguese 
                        ? 'Buscar eventos e experiências...'
                        : 'Search events & experiences...')
                    : (isPortuguese 
                        ? 'Buscar tours e experiências...'
                        : 'Search tours & experiences...')
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2.5 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium shadow-lg text-sm"
                >
                  {isPortuguese ? 'Buscar' : 'Search'}
                </button>
              </motion.div>

              {/* Dynamic Quick Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8"
              >
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {activeTab === 'events' ? (
                    /* Event Quick Filters */
                    [
                      { key: 'museums', label: '🏛️ Museums', description: 'Museum tours with Portuguese guides' },
                      { key: 'concerts', label: '🎵 Concerts', description: 'Music & concert nights' },
                      { key: 'sports', label: '⚽ Sports', description: 'Football matches & sports events' },
                      { key: 'trips', label: '🚌 Weekend Trips', description: 'Day trips & getaways' },
                      { key: 'cultural', label: '🎭 Cultural', description: 'Cultural experiences & shows' },
                      { key: 'social', label: '🥂 Social', description: 'Social gatherings & networking' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setEventFilters({ ...eventFilters, category: filter.key === eventFilters.category ? undefined : filter.key })}
                        className={`group px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          eventFilters.category === filter.key
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105'
                            : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                        }`}
                        title={filter.description}
                      >
                        {filter.label}
                      </button>
                    ))
                  ) : (
                    /* Tours Category Filters */
                    Object.entries(EVENT_TOUR_CATEGORIES).map(([category, info]) => (
                      <button
                        key={category}
                        onClick={() => handleTourCategoryChange(category === tourFilters.category ? undefined : category)}
                        className={`group px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          tourFilters.category === category
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105'
                            : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                        }`}
                      >
                        <span className="text-base">{info.icon}</span>
                        {category}
                        {eventCounts[category] > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            tourFilters.category === category
                              ? 'bg-white/20 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {eventCounts[category]}
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
                
                {/* Popular Types */}
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <span className="text-gray-500">
                    {isPortuguese 
                      ? 'Experiências Populares:' 
                      : 'Popular Experiences:'}
                    {' '}
                  </span>
                  {activeTab === 'events' ? [
                    { type: 'Museum Tours', flag: '🏛️' },
                    { type: 'Concert Nights', flag: '🎵' },
                    { type: 'Football Matches', flag: '⚽' },
                    { type: 'Weekend Trips', flag: '🚌' }
                  ].map((experience) => (
                    <button
                      key={experience.type}
                      onClick={() => setSearchQuery(experience.type)}
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      {experience.flag} {experience.type}
                    </button>
                  )) : [
                    { type: 'Women 30+', flag: '👩‍💼' },
                    { type: 'Family-Friendly', flag: '👨‍👩‍👧‍👦' },
                    { type: 'Cultural Heritage', flag: '🏛️' },
                    { type: 'Professional Networking', flag: '💼' }
                  ].map((experience) => (
                    <button
                      key={experience.type}
                      onClick={() => setSearchQuery(experience.type)}
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      {experience.flag} {experience.type}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-lg font-bold mb-6">
                    {activeTab === 'events' 
                      ? (isPortuguese ? 'Filtrar Eventos' : 'Filter Events')
                      : (isPortuguese ? 'Filtrar Tours' : 'Filter Tours')
                    }
                  </h3>
                  {activeTab === 'events' ? (
                    <FilterSidebar
                      isOpen={true}
                      onClose={() => {}}
                      filters={eventFilters}
                      onFilterChange={handleEventFilterChange}
                    />
                  ) : (
                    <CategoryFilter
                      selectedCategory={tourFilters.category}
                      onCategoryChange={handleTourCategoryChange}
                      eventCounts={eventCounts}
                    />
                  )}
                </div>
              </div>

              {/* Events Grid */}
              <div className="flex-1">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      <span>{isPortuguese ? 'Filtros' : 'Filters'}</span>
                    </button>
                    
                    <div className="text-gray-600">
                      {loading 
                        ? (isPortuguese ? 'Carregando...' : 'Loading...') 
                        : `${currentData.length} ${currentData.length === 1 
                            ? (activeTab === 'events'
                                ? (isPortuguese ? 'evento encontrado' : 'event found')
                                : (isPortuguese ? 'experiência encontrada' : 'experience found'))
                            : (activeTab === 'events'
                                ? (isPortuguese ? 'eventos encontrados' : 'events found')
                                : (isPortuguese ? 'experiências encontradas' : 'experiences found'))
                          }`
                      }
                    </div>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="date">{isPortuguese ? 'Ordenar por Data' : 'Sort by Date'}</option>
                    <option value="popularity">{isPortuguese ? 'Ordenar por Popularidade' : 'Sort by Popularity'}</option>
                    <option value="rating">{isPortuguese ? 'Ordenar por Avaliação' : 'Sort by Rating'}</option>
                  </select>
                </div>

                {/* Featured Section */}
                {featuredItems.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <SparklesIcon className="w-6 h-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        {activeTab === 'events'
                          ? (isPortuguese ? 'Eventos em Destaque' : 'Featured Events')
                          : (isPortuguese ? 'Experiências em Destaque' : 'Featured Experiences')
                        }
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredItems.slice(0, 3).map((item) => (
                        activeTab === 'events' ? (
                          <ImprovedEventCard key={item.id} event={item as Event} />
                        ) : (
                          <EventToursCard key={item.id} event={item as EventTour} />
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Content Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentData.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeTab === 'events'
                        ? (isPortuguese ? 'Nenhum evento encontrado' : 'No events found')
                        : (isPortuguese ? 'Nenhuma experiência encontrada' : 'No experiences found')
                      }
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {isPortuguese 
                        ? 'Tente ajustar seus critérios de pesquisa ou limpar os filtros.'
                        : 'Try adjusting your search criteria or clear your filters.'
                      }
                    </p>
                    <button
                      onClick={() => {
                        if (activeTab === 'events') {
                          setEventFilters({})
                        } else {
                          setTourFilters({})
                        }
                        setSearchQuery('')
                      }}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      {isPortuguese ? 'Limpar Todos os Filtros' : 'Clear All Filters'}
                    </button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                  >
                    <AnimatePresence>
                      {currentData.map((item) => (
                        activeTab === 'events' ? (
                          <ImprovedEventCard key={item.id} event={item as Event} />
                        ) : (
                          <EventToursCard key={item.id} event={item as EventTour} />
                        )
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Sidebar */}
        {activeTab === 'events' ? (
          <FilterSidebar
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={eventFilters}
            onFilterChange={handleEventFilterChange}
          />
        ) : (
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
                
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden"
                >
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">
                        {isPortuguese ? 'Filtros' : 'Filters'}
                      </h3>
                      <button 
                        onClick={() => setShowFilters(false)} 
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <CategoryFilter
                      selectedCategory={tourFilters.category}
                      onCategoryChange={(category) => {
                        handleTourCategoryChange(category)
                        setShowFilters(false)
                      }}
                      eventCounts={eventCounts}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  )
}