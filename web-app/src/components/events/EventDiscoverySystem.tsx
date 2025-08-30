'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  FunnelIcon,
  ViewColumnsIcon,
  ListBulletIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { CULTURAL_EVENTS } from '@/config/cultural-events'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'
import { UK_CITIES_EXPANSION } from '@/config/uk-cities-expansion'
import { brandColors } from '@/config/brand'
import PortugueseEventsCalendar from './PortugueseEventsCalendar'
import EventCard from '../EventCard'
import EnhancedCalendarView from './EnhancedCalendarView'

interface EventDiscoverySystemProps {
  className?: string
}

type ViewMode = 'calendar' | 'grid' | 'list'

interface FilterOptions {
  search: string
  category: string
  location: string
  dateRange: 'today' | 'week' | 'month' | 'all'
  priceRange: 'free' | 'paid' | 'all'
  country: string // PALOP nation filter
  eventType: 'cultural' | 'business' | 'fado' | 'kizomba' | 'food' | 'celebration' | 'all'
}

export default function EventDiscoverySystem({ className = '' }: EventDiscoverySystemProps) {
  const { language, t } = useLanguage()
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: 'all',
    location: 'all',
    dateRange: 'month',
    priceRange: 'all',
    country: 'all',
    eventType: 'all'
  })
  const [selectedCity, setSelectedCity] = useState('all')
  const [attendingEvents, setAttendingEvents] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const isPortuguese = language === 'pt'

  // Process and filter events
  const allEvents = useMemo(() => {
    const events = []
    const now = new Date()

    // Add cultural events
    CULTURAL_EVENTS.forEach(event => {
      if (!event.isActive) return
      
      // Generate upcoming events based on frequency
      const nextDate = getNextEventDate(event, now)
      if (nextDate) {
        events.push({
          id: `cultural-${event.id}`,
          title: isPortuguese ? event.namePortuguese : event.name,
          description: isPortuguese ? event.descriptionPortuguese : event.description,
          date: nextDate,
          time: event.time,
          location: event.venue,
          category: event.type,
          price: event.price,
          capacity: event.capacity,
          attendees: event.attendanceAverage,
          imageUrl: `/api/placeholder/400/200?text=${encodeURIComponent(event.name)}`,
          organizer: event.organizer || 'Community',
          tags: [event.type, event.origin],
          flagEmoji: event.flag,
          isPaid: event.price !== 'Free'
        })
      }
    })

    // Add celebration events
    LUSOPHONE_CELEBRATIONS.forEach(celebration => {
      const celebrationDate = getNextCelebrationDate(celebration, now)
      if (celebrationDate) {
        events.push({
          id: `celebration-${celebration.id}`,
          title: isPortuguese ? celebration.name.pt : celebration.name.en,
          description: isPortuguese ? celebration.description.pt : celebration.description.en,
          date: celebrationDate,
          time: '19:00',
          location: 'Various Venues',
          category: celebration.category,
          price: 'Free',
          capacity: 200,
          attendees: 50,
          imageUrl: `/api/placeholder/400/200?text=${encodeURIComponent(celebration.name.en)}`,
          organizer: 'Portuguese Community',
          tags: [celebration.category, ...celebration.countries],
          flagEmoji: celebration.flagEmoji || '🎉',
          isPaid: false,
          isCelebration: true
        })
      }
    })

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [isPortuguese])

  // Apply filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Search filter
      if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.category !== 'all' && event.category !== filters.category) {
        return false
      }

      // Event type filter
      if (filters.eventType !== 'all' && event.category !== filters.eventType) {
        return false
      }

      // Country filter (PALOP nations)
      if (filters.country !== 'all') {
        const eventCountry = event.tags.find(tag => 
          ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique', 'Guinea-Bissau', 'São Tomé', 'East Timor'].includes(tag)
        )
        if (!eventCountry || !eventCountry.toLowerCase().includes(filters.country.toLowerCase())) {
          return false
        }
      }

      // Location filter (UK cities)
      if (selectedCity !== 'all') {
        const cityData = UK_CITIES_EXPANSION.find(city => city.id === selectedCity)
        if (cityData && !event.location.toLowerCase().includes(cityData.name.toLowerCase())) {
          return false
        }
      }

      // Date range filter
      const eventDate = new Date(event.date)
      const now = new Date()
      
      switch (filters.dateRange) {
        case 'today':
          if (eventDate.toDateString() !== now.toDateString()) return false
          break
        case 'week':
          const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          if (eventDate < now || eventDate > weekFromNow) return false
          break
        case 'month':
          const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          if (eventDate < now || eventDate > monthFromNow) return false
          break
      }

      // Price filter
      if (filters.priceRange === 'free' && event.isPaid) return false
      if (filters.priceRange === 'paid' && !event.isPaid) return false

      return true
    })
  }, [allEvents, filters])

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = [...new Set(allEvents.map(event => event.category))]
    return cats
  }, [allEvents])

  const locations = useMemo(() => {
    const locs = [...new Set(allEvents.map(event => event.location))]
    return locs
  }, [allEvents])

  const eventTypes = [
    { id: 'all', name: isPortuguese ? 'Todos os Tipos' : 'All Types', icon: '🎯' },
    { id: 'fado', name: isPortuguese ? 'Fado' : 'Fado', icon: '🎵' },
    { id: 'kizomba', name: isPortuguese ? 'Kizomba' : 'Kizomba', icon: '💃' },
    { id: 'business', name: isPortuguese ? 'Negócios' : 'Business', icon: '💼' },
    { id: 'cultural', name: isPortuguese ? 'Cultural' : 'Cultural', icon: '🎭' },
    { id: 'food', name: isPortuguese ? 'Gastronomia' : 'Food', icon: '🍽️' },
    { id: 'celebration', name: isPortuguese ? 'Celebrações' : 'Celebrations', icon: '🎉' }
  ]

  const palopCountries = [
    { id: 'all', name: isPortuguese ? 'Todos os Países' : 'All Countries', flag: '🌍' },
    { id: 'portugal', name: 'Portugal', flag: '🇵🇹' },
    { id: 'brazil', name: 'Brasil', flag: '🇧🇷' },
    { id: 'angola', name: 'Angola', flag: '🇦🇴' },
    { id: 'cape verde', name: 'Cabo Verde', flag: '🇨🇻' },
    { id: 'mozambique', name: 'Moçambique', flag: '🇲🇿' },
    { id: 'guinea-bissau', name: 'Guiné-Bissau', flag: '🇬🇼' },
    { id: 'são tomé', name: 'São Tomé e Príncipe', flag: '🇸🇹' },
    { id: 'east timor', name: 'Timor-Leste', flag: '🇹🇱' }
  ]

  const handleAttendEvent = (eventId: string) => {
    setAttendingEvents(prev => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <CalendarDaysIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('events.discovery.title', 'Event Discovery')}
              </h1>
              <p className="text-gray-600">
                {t('events.discovery.subtitle', 'Discover Portuguese-speaking community events across the UK')}
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarDaysIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ViewColumnsIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('events.discovery.search', 'Search events...')}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>{t('events.discovery.filters', 'Filters')}</span>
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{t('events.filters.all_categories', 'All Categories')}</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as any })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{t('events.filters.all_dates', 'All Dates')}</option>
                    <option value="today">{t('events.filters.today', 'Today')}</option>
                    <option value="week">{t('events.filters.this_week', 'This Week')}</option>
                    <option value="month">{t('events.filters.this_month', 'This Month')}</option>
                  </select>

                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value as any })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{t('events.filters.all_prices', 'All Prices')}</option>
                    <option value="free">{t('events.filters.free', 'Free')}</option>
                    <option value="paid">{t('events.filters.paid', 'Paid')}</option>
                  </select>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">{t('events.filters.all_cities', 'All UK Cities')}</option>
                    <option value="london">🏴󠁧󠁢󠁥󠁮󠁧󠁿 London</option>
                    {UK_CITIES_EXPANSION.map(city => (
                      <option key={city.id} value={city.id}>
                        🏴󠁧󠁢󠁥󠁮󠁧󠁿 {city.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.eventType}
                    onChange={(e) => setFilters({ ...filters, eventType: e.target.value as any })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {palopCountries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {t('events.discovery.results_count', `Showing ${filteredEvents.length} of ${allEvents.length} events`)}
          </p>
        </div>
      </div>

      {/* Event Display */}
      <div className="space-y-6">
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <PortugueseEventsCalendar 
              events={filteredEvents}
              onEventSelect={setSelectedEvent}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              eventTypes={eventTypes}
              palopCountries={palopCountries}
              onAttendEvent={handleAttendEvent}
              attendingEvents={attendingEvents}
            />
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => {
              const isAttending = attendingEvents.has(event.id)
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary-400 to-secondary-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-5xl mb-2">{event.flagEmoji}</div>
                        <div className="text-sm opacity-90 font-medium">
                          {event.tags.find(tag => 
                            palopCountries.some(country => country.name.toLowerCase().includes(tag.toLowerCase()))
                          ) || 'Portuguese Community'}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-4 h-4 text-primary-500" />
                        <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="w-4 h-4 text-primary-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UsersIcon className="w-4 h-4 text-primary-500" />
                        <span>{event.attendees}/{event.capacity}</span>
                        <span className="text-xs text-gray-400">attending</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                      </button>
                      <button
                        onClick={() => handleAttendEvent(event.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isAttending
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isAttending 
                          ? (isPortuguese ? '✓ Confirmado' : '✓ Attending')
                          : (isPortuguese ? 'Participar' : 'Attend')
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{event.flagEmoji}</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="flex space-x-2">
                          {event.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{event.attendees}/{event.capacity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900 mb-2">
                        {event.price}
                      </div>
                      {event.isCelebration && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full mb-2 block">
                          {t('events.celebration', 'Celebration')}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAttendEvent(event.id)
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          attendingEvents.has(event.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                      >
                        {attendingEvents.has(event.id)
                          ? (isPortuguese ? '✓ Confirmado' : '✓ Attending')
                          : (isPortuguese ? 'Participar' : 'Attend')
                        }
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('events.discovery.no_results', 'No events found')}
            </h3>
            <p className="text-gray-600">
              {t('events.discovery.no_results_desc', 'Try adjusting your filters or search terms')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper functions
function getNextEventDate(event: any, fromDate: Date): Date | null {
  if (event.frequency === 'Weekly') {
    // Find next occurrence of the day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const targetDay = days.indexOf(event.dayOfWeek?.toLowerCase())
    if (targetDay === -1) return null

    const nextDate = new Date(fromDate)
    const currentDay = nextDate.getDay()
    const daysUntilTarget = (targetDay - currentDay + 7) % 7 || 7
    nextDate.setDate(nextDate.getDate() + daysUntilTarget)
    return nextDate
  }

  if (event.frequency === 'Monthly') {
    const nextDate = new Date(fromDate)
    nextDate.setDate(15) // Mid-month
    if (nextDate < fromDate) {
      nextDate.setMonth(nextDate.getMonth() + 1)
    }
    return nextDate
  }

  return null
}

function getNextCelebrationDate(celebration: any, fromDate: Date): Date | null {
  const currentYear = fromDate.getFullYear()
  const periodText = celebration.period.en.toLowerCase()
  
  let celebrationDate: Date
  
  if (periodText.includes('june')) {
    celebrationDate = new Date(currentYear, 5, 13) // June 13
  } else if (periodText.includes('september 7')) {
    celebrationDate = new Date(currentYear, 8, 7) // September 7
  } else if (periodText.includes('november 11')) {
    celebrationDate = new Date(currentYear, 10, 11) // November 11
  } else if (periodText.includes('march')) {
    celebrationDate = new Date(currentYear, 2, 15) // March 15
  } else {
    // Default to a future date
    celebrationDate = new Date(currentYear, fromDate.getMonth() + 1, 15)
  }
  
  // If the date has passed, move to next year
  if (celebrationDate < fromDate) {
    celebrationDate.setFullYear(currentYear + 1)
  }
  
  return celebrationDate
}te
}