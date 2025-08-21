'use client'

import { ROUTES } from '@/config';
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UsersIcon,
  HeartIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  CurrencyPoundIcon,
  FlagIcon,
  MusicalNoteIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  StarIcon as StarOutlineIcon,
  BookOpenIcon,
  CakeIcon
} from '@heroicons/react/24/outline'
import { Typography, Spacing, IconSystem, cn } from '@/lib/design'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import Link from 'next/link'
import Image from 'next/image'
import { ROUTES } from '@/config/routes'

interface PortugueseEvent {
  id: string
  title: string
  description: string
  cultural_category: string
  portuguese_neighborhood: string
  date: string
  time: string
  location: string
  venue: string
  price: number
  currency: string
  max_attendees: number
  current_attendees: number
  host_name: string
  host_verified: boolean
  cultural_authenticity_score: number
  fado_music_featured: boolean
  santos_populares_themed: boolean
  football_viewing_party: boolean
  cultural_preservation_focus: boolean
  tags: string[]
  image: string
  partner_venue?: {
    name: string
    type: string
    authenticity_rating: number
  }
  recommendations_score?: number
  distance_km?: number
}

interface NeighborhoodData {
  name: string
  portuguese_population: number
  authenticity_level: number
  popular_venues: string[]
  cultural_significance: string
}

interface EventsDiscoveryProps {
  className?: string
  compact?: boolean
  focusNeighborhood?: string
  culturalCategory?: string
}

const PORTUGUESE_NEIGHBORHOODS: NeighborhoodData[] = [
  {
    name: 'Stockwell',
    portuguese_population: 2800,
    authenticity_level: 95,
    popular_venues: ['Portuguese Centre', 'Bar do Fado', 'Café Nata'],
    cultural_significance: 'Heart of Little Portugal with highest concentration of Portuguese families'
  },
  {
    name: 'Vauxhall',
    portuguese_population: 2100,
    authenticity_level: 90,
    popular_venues: ['Portuguese Community Hall', 'Vauxhall Portuguese Market', 'Taberna Real'],
    cultural_significance: 'Historic Portuguese settlement area with traditional businesses'
  },
  {
    name: 'North Kensington',
    portuguese_population: 1900,
    authenticity_level: 85,
    popular_venues: ['Golborne Road Market', 'Portuguese Church', 'Casa Madeira'],
    cultural_significance: 'Established Portuguese community with strong cultural roots'
  },
  {
    name: 'Brixton',
    portuguese_population: 1200,
    authenticity_level: 70,
    popular_venues: ['Brixton Portuguese Club', 'Portuguese Bakery', 'Cultural Centre'],
    cultural_significance: 'Growing Portuguese community with vibrant cultural scene'
  },
  {
    name: 'Camden',
    portuguese_population: 800,
    authenticity_level: 60,
    popular_venues: ['Camden Portuguese Café', 'Fado Bar', 'Portuguese Restaurant'],
    cultural_significance: 'Young Portuguese professionals and students hub'
  }
]

// Professional icon mapping for Portuguese cultural categories
const CULTURAL_CATEGORIES = [
  {
    id: 'santos_populares',
    name: { en: 'Santos Populares', pt: 'Santos Populares' },
    icon: CakeIcon,
    color: 'bg-gradient-to-br from-action-500 to-action-600',
    description: 'Traditional Portuguese summer festivals'
  },
  {
    id: 'fado_music',
    name: { en: 'Fado Music', pt: 'Música de Fado' },
    icon: MusicalNoteIcon,
    color: 'bg-gradient-to-br from-premium-500 to-premium-600',
    description: 'Portuguese soul music experiences'
  },
  {
    id: 'football_culture',
    name: { en: 'Football Culture', pt: 'Cultura do Futebol' },
  icon: StarOutlineIcon,
    color: 'bg-gradient-to-br from-secondary-500 to-secondary-600',
    description: 'Portuguese football viewing and discussion'
  },
  {
    id: 'business_networking',
    name: { en: 'Business Networking', pt: 'Networking de Negócios' },
    icon: BuildingOfficeIcon,
    color: 'bg-gradient-to-br from-primary-500 to-primary-600',
    description: 'Professional development and networking'
  },
  {
    id: 'cultural_preservation',
    name: { en: 'Cultural Preservation', pt: 'Preservação Cultural' },
    icon: AcademicCapIcon,
    color: 'bg-gradient-to-br from-accent-500 to-accent-600',
    description: 'Heritage and tradition preservation'
  },
  {
    id: 'gastronomy',
    name: { en: 'Portuguese Gastronomy', pt: 'Gastronomia Portuguesa' },
    icon: CakeIcon,
    color: 'bg-gradient-to-br from-coral-500 to-coral-600',
    description: 'Cooking classes and food experiences'
  },
  {
    id: 'language_culture',
    name: { en: 'Language & Culture', pt: 'Língua e Cultura' },
    icon: BookOpenIcon,
    color: 'bg-gradient-to-br from-accent-500 to-premium-600',
    description: 'Portuguese language and cultural education'
  }
]

export default function EventsDiscovery({
  className = '',
  compact = false,
  focusNeighborhood,
  culturalCategory
}: EventsDiscoveryProps) {
  const { language } = useLanguage()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const [events, setEvents] = useState<PortugueseEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(focusNeighborhood || 'all')
  const [selectedCategory, setSelectedCategory] = useState(culturalCategory || 'all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'distance' | 'authenticity' | 'popularity'>('date')

  const isPortuguese = language === 'pt'

  // Mock Portuguese events data
  const mockPortugueseEvents: PortugueseEvent[] = [
    {
      id: 'santos-populares-stockwell',
      title: 'Santos Populares Celebration 2025',
      description: 'Traditional Portuguese summer festival with grilled sardines, folk music, and community dancing',
      cultural_category: 'santos_populares',
      portuguese_neighborhood: 'Stockwell',
      date: '2025-06-13',
      time: '18:00',
      location: 'Portuguese Centre, South Lambeth Road',
      venue: 'Portuguese Community Centre',
      price: 15,
      currency: 'GBP',
      max_attendees: 200,
      current_attendees: 156,
      host_name: 'Portuguese Cultural Association',
      host_verified: true,
      cultural_authenticity_score: 95,
      fado_music_featured: true,
      santos_populares_themed: true,
      football_viewing_party: false,
      cultural_preservation_focus: true,
      tags: ['traditional', 'family-friendly', 'authentic', 'community'],
      image: buildRoute(ROUTES.events, { id: 'event-id' }),
      partner_venue: {
        name: 'Portuguese Centre',
        type: 'cultural_center',
        authenticity_rating: 5
      },
      recommendations_score: 98,
      distance_km: 2.1
    },
    {
      id: 'fado-night-camden',
      title: 'Authentic Fado Night',
      description: 'Intimate evening of traditional Portuguese fado music with professional fadistas from Coimbra',
      cultural_category: 'fado_music',
      portuguese_neighborhood: 'Camden',
      date: '2025-01-25',
      time: '20:00',
      location: 'Bar do Fado, St John Street',
      venue: 'Bar do Fado',
      price: 25,
      currency: 'GBP',
      max_attendees: 50,
      current_attendees: 38,
      host_name: 'Maria Santos',
      host_verified: true,
      cultural_authenticity_score: 90,
      fado_music_featured: true,
      santos_populares_themed: false,
      football_viewing_party: false,
      cultural_preservation_focus: true,
      tags: ['music', 'intimate', 'professional', 'evening'],
      image: buildRoute(ROUTES.events, { id: 'event-id' }),
      partner_venue: {
        name: 'Bar do Fado',
        type: 'restaurant',
        authenticity_rating: 5
      },
      recommendations_score: 92,
      distance_km: 4.5
    },
    {
      id: 'football-portugal-england',
      title: 'Portugal vs England Watch Party',
      description: 'Join fellow Portuguese supporters for the Nations League match with traditional snacks and drinks',
      cultural_category: 'football_culture',
      portuguese_neighborhood: 'Vauxhall',
      date: '2025-02-15',
      time: '19:45',
      location: 'Portuguese Sports Club, Vauxhall',
      venue: 'Portuguese Sports Club',
      price: 8,
      currency: 'GBP',
      max_attendees: 80,
      current_attendees: 67,
      host_name: 'Sporting Club London',
      host_verified: true,
      cultural_authenticity_score: 85,
      fado_music_featured: false,
      santos_populares_themed: false,
      football_viewing_party: true,
      cultural_preservation_focus: false,
      tags: ['sports', 'social', 'competitive', 'casual'],
      image: buildRoute(ROUTES.events, { id: 'event-id' }),
      partner_venue: {
        name: 'Portuguese Sports Club',
        type: 'club',
        authenticity_rating: 4
      },
      recommendations_score: 88,
      distance_km: 3.2
    },
    {
      id: 'business-networking-kensington',
      title: 'Portuguese Entrepreneurs Network',
      description: 'Monthly networking event for Portuguese business owners and professionals in London',
      cultural_category: 'business_networking',
      portuguese_neighborhood: 'North Kensington',
      date: '2025-01-30',
      time: '18:30',
      location: 'Portuguese Business Centre, Ladbroke Grove',
      venue: 'Portuguese Business Hub',
      price: 20,
      currency: 'GBP',
      max_attendees: 60,
      current_attendees: 45,
      host_name: 'Portuguese Chamber of Commerce',
      host_verified: true,
      cultural_authenticity_score: 70,
      fado_music_featured: false,
      santos_populares_themed: false,
      football_viewing_party: false,
      cultural_preservation_focus: false,
      tags: ['professional', 'networking', 'business', 'formal'],
      image: buildRoute(ROUTES.events, { id: 'event-id' }),
      partner_venue: {
        name: 'Portuguese Business Hub',
        type: 'business_center',
        authenticity_rating: 4
      },
      recommendations_score: 85,
      distance_km: 5.8
    },
    {
      id: 'cooking-class-pasteis',
      title: 'Pastéis de Nata Masterclass',
      description: 'Learn to make authentic Portuguese pastéis de nata with chef from Pastéis de Belém',
      cultural_category: 'gastronomy',
      portuguese_neighborhood: 'Stockwell',
      date: '2025-02-08',
      time: '14:00',
      location: 'Portuguese Cooking School, Stockwell',
      venue: 'Casa da Culinária',
      price: 45,
      currency: 'GBP',
      max_attendees: 16,
      current_attendees: 12,
      host_name: 'Chef António Ribeiro',
      host_verified: true,
      cultural_authenticity_score: 93,
      fado_music_featured: false,
      santos_populares_themed: false,
      football_viewing_party: false,
      cultural_preservation_focus: true,
      tags: ['cooking', 'hands-on', 'traditional', 'educational'],
      image: buildRoute(ROUTES.events, { id: 'event-id' }),
      partner_venue: {
        name: 'Casa da Culinária',
        type: 'cooking_school',
        authenticity_rating: 5
      },
      recommendations_score: 94,
      distance_km: 1.8
    }
  ]

  useEffect(() => {
    // Simulate loading events
    const timer = setTimeout(() => {
      setEvents(mockPortugueseEvents)
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesNeighborhood = selectedNeighborhood === 'all' || event.portuguese_neighborhood === selectedNeighborhood
    const matchesCategory = selectedCategory === 'all' || event.cultural_category === selectedCategory
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1]
    
    return matchesSearch && matchesNeighborhood && matchesCategory && matchesPrice
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return (a.distance_km || 0) - (b.distance_km || 0)
      case 'authenticity':
        return b.cultural_authenticity_score - a.cultural_authenticity_score
      case 'popularity':
        return b.current_attendees - a.current_attendees
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  const getAttendancePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100)
  }

  // Get professional icon component for category
  const getCategoryIcon = (categoryId: string) => {
    const category = CULTURAL_CATEGORIES.find(cat => cat.id === categoryId)
    const IconComponent = category ? category.icon : SparklesIcon
    return <IconComponent className={cn(IconSystem.sizes.lg, 'text-white')} />
  }

  const getCategoryName = (categoryId: string) => {
    const category = CULTURAL_CATEGORIES.find(cat => cat.id === categoryId)
    return category ? category.name[isPortuguese ? 'pt' : 'en'] : categoryId
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {isPortuguese ? 'Eventos Próximos' : 'Upcoming Events'}
          </h3>
          <Link
            href={ROUTES.events}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            {isPortuguese ? 'Ver Todos' : 'View All'}
          </Link>
        </div>

        <div className="space-y-3">
          {sortedEvents.slice(0, 3).map((event) => {
            const isFavorite = favorites.events?.includes(event.id)
            const attendancePercentage = getAttendancePercentage(event.current_attendees, event.max_attendees)

            return (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(event.cultural_category)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {event.portuguese_neighborhood} • {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (isFavorite) {
                        removeFromFavorites('events', event.id)
                      } else {
                        addToFavorites('events', event.id)
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {isFavorite ? (
                      <HeartSolidIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>£{event.price}</span>
                  <span>{attendancePercentage}% full</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-start sm:items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                {isPortuguese ? 'Descobrir Eventos Portugueses' : 'Discover Portuguese Events'}
              </h2>
              <p className="text-gray-600 text-sm leading-tight mt-1">
                {isPortuguese
                  ? 'Eventos autênticos nos bairros portugueses de Londres'
                  : 'Authentic events in London\'s Portuguese neighborhoods'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-gray-100 p-2.5 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Quick Filters */}
        <div className="space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={isPortuguese ? 'Procurar eventos...' : 'Search events...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{isPortuguese ? 'Todos os Bairros' : 'All Neighborhoods'}</option>
              {PORTUGUESE_NEIGHBORHOODS.map(neighborhood => (
                <option key={neighborhood.name} value={neighborhood.name}>
                  {neighborhood.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{isPortuguese ? 'Todas as Categorias' : 'All Categories'}</option>
              {CULTURAL_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name[isPortuguese ? 'pt' : 'en']}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="date">{isPortuguese ? 'Por Data' : 'By Date'}</option>
              <option value="distance">{isPortuguese ? 'Por Distância' : 'By Distance'}</option>
              <option value="authenticity">{isPortuguese ? 'Por Autenticidade' : 'By Authenticity'}</option>
              <option value="popularity">{isPortuguese ? 'Por Popularidade' : 'By Popularity'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="p-6">
        <div className="mb-4 text-sm text-gray-600">
          {sortedEvents.length} {isPortuguese ? 'eventos encontrados' : 'events found'}
        </div>

        <div className="space-y-4">
          {sortedEvents.map((event) => {
            const isFavorite = favorites.events?.includes(event.id)
            const attendancePercentage = getAttendancePercentage(event.current_attendees, event.max_attendees)
            const eventDate = new Date(event.date)

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Event Image */}
                  <div className="sm:w-32 md:w-48 h-32 sm:h-24 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">{getCategoryIcon(event.cultural_category)}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                            {getCategoryName(event.cultural_category)}
                          </span>
                          {event.host_verified && (
                            <span className="inline-block w-4 h-4 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">
                              ✓
                            </span>
                          )}
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <StarSolidIcon
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(event.cultural_authenticity_score / 20)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-600">
                              ({event.cultural_authenticity_score}% {isPortuguese ? 'autêntico' : 'authentic'})
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {event.description}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isFavorite) {
                            removeFromFavorites('events', event.id)
                          } else {
                            addToFavorites('events', event.id)
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {isFavorite ? (
                          <HeartSolidIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Event Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{eventDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{event.portuguese_neighborhood}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CurrencyPoundIcon className="w-4 h-4" />
                        <span>£{event.price}</span>
                      </div>
                    </div>

                    {/* Special Features */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {event.fado_music_featured && (
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          🎵 Fado
                        </span>
                      )}
                      {event.santos_populares_themed && (
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          🎉 Santos Populares
                        </span>
                      )}
                      {event.football_viewing_party && (
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          ⚽ Football
                        </span>
                      )}
                      {event.cultural_preservation_focus && (
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          🏛️ Heritage
                        </span>
                      )}
                    </div>

                    {/* Attendance and Action */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{event.current_attendees}/{event.max_attendees}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{attendancePercentage}% full</span>
                        </div>
                        {event.distance_km && (
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{event.distance_km}km away</span>
                          </div>
                        )}
                      </div>
                      <Link
                        href={buildRoute(ROUTES.events, { id: 'event-id' })}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm"
                      >
                        {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isPortuguese ? 'Nenhum evento encontrado' : 'No events found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese
                ? 'Tente ajustar os seus critérios de pesquisa'
                : 'Try adjusting your search criteria'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedNeighborhood('all')
                setSelectedCategory('all')
                setPriceRange([0, 100])
              }}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              {isPortuguese ? 'Limpar Filtros' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}