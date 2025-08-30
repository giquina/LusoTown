'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import EventCard from './EventCard'
import CalendarView from './CalendarView'
import { PALOP_CULTURAL_EVENTS } from '@/config/palop-cultural-events'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'

interface Event {
  id: string
  title: string
  titlePortuguese?: string
  description: string
  descriptionPortuguese?: string
  date: string
  endDate?: string
  time: string
  endTime?: string
  location: {
    venue: string
    address: string
    city: string
    coordinates?: [number, number]
  }
  category: string
  culturalFocus: string
  price: number
  currency: string
  maxAttendees?: number
  currentAttendees: number
  images: string[]
  organizer: {
    name: string
    email: string
    phone?: string
    website?: string
  }
  tags: string[]
  isRecurring: boolean
  recurringPattern?: {
    frequency: string
    interval: number
    daysOfWeek?: number[]
    endDate?: string
  }
  ageRestriction?: {
    minAge?: number
    maxAge?: number
  }
  accessibility: {
    wheelchairAccessible: boolean
    signLanguage: boolean
    audioDescription: boolean
  }
  requirements: string[]
  cancellationPolicy: string
  featured: boolean
  verified: boolean
  bookingUrl?: string
  ticketTypes: Array<{
    name: string
    price: number
    description: string
    available: number
  }>
}

interface EventsCalendarProps {
  initialEvents?: Event[]
  showFilters?: boolean
  defaultView?: 'calendar' | 'list' | 'grid'
  userLocation?: {
    latitude: number
    longitude: number
  }
}

export default function EventsCalendar({
  initialEvents = [],
  showFilters = true,
  defaultView = 'list',
  userLocation
}: EventsCalendarProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [view, setView] = useState<'calendar' | 'list' | 'grid'>(defaultView)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)
  
  const [filters, setFilters] = useState({
    category: '',
    culturalFocus: '',
    city: '',
    dateRange: '',
    priceRange: '',
    features: [] as string[],
    searchTerm: ''
  })

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    let filtered = [...events]

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    // Cultural focus filter
    if (filters.culturalFocus) {
      filtered = filtered.filter(event => event.culturalFocus === filters.culturalFocus)
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter(event => 
        event.location.city.toLowerCase() === filters.city.toLowerCase()
      )
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date()
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date)
        switch (filters.dateRange) {
          case 'today':
            return eventDate.toDateString() === now.toDateString()
          case 'this_week':
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
            return eventDate >= now && eventDate <= weekFromNow
          case 'this_month':
            return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
          case 'next_month':
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1)
            return eventDate.getMonth() === nextMonth.getMonth() && eventDate.getFullYear() === nextMonth.getFullYear()
          default:
            return true
        }
      })
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(event => {
        switch (filters.priceRange) {
          case 'free':
            return event.price === 0
          case 'under_20':
            return event.price > 0 && event.price < 20
          case '20_50':
            return event.price >= 20 && event.price <= 50
          case 'over_50':
            return event.price > 50
          default:
            return true
        }
      })
    }

    // Features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(event => {
        return filters.features.every(feature => {
          switch (feature) {
            case 'wheelchair_accessible':
              return event.accessibility.wheelchairAccessible
            case 'sign_language':
              return event.accessibility.signLanguage
            case 'verified':
              return event.verified
            case 'featured':
              return event.featured
            case 'recurring':
              return event.isRecurring
            default:
              return true
          }
        })
      })
    }

    // Search term filter
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.titlePortuguese?.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.venue.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Sort events by date
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events, filters])

  // Load cultural events from config
  React.useEffect(() => {
    const culturalEvents = [
      ...PALOP_CULTURAL_EVENTS.events.map((event, index) => ({
        id: `palop-${index}`,
        title: event.nameEn,
        titlePortuguese: event.namePt,
        description: event.descriptionEn,
        descriptionPortuguese: event.descriptionPt,
        date: event.date,
        time: '19:00',
        location: {
          venue: event.venue.name,
          address: event.venue.address,
          city: event.venue.city,
          coordinates: event.venue.coordinates as [number, number]
        },
        category: event.category,
        culturalFocus: event.culturalFocus,
        price: event.ticketPrice,
        currency: 'GBP',
        currentAttendees: Math.floor(Math.random() * 100) + 20,
        images: [event.imageUrl],
        organizer: event.organizer,
        tags: event.tags,
        isRecurring: false,
        accessibility: {
          wheelchairAccessible: true,
          signLanguage: false,
          audioDescription: false
        },
        requirements: [],
        cancellationPolicy: 'Free cancellation up to 24 hours before the event',
        featured: Math.random() > 0.7,
        verified: true,
        ticketTypes: [{
          name: 'General Admission',
          price: event.ticketPrice,
          description: 'Standard entry ticket',
          available: 100
        }]
      })),
      ...LUSOPHONE_CELEBRATIONS.map((celebration, index) => ({
        id: `celebration-${index}`,
        title: celebration.nameEn,
        titlePortuguese: celebration.namePt,
        description: celebration.descriptionEn,
        descriptionPortuguese: celebration.descriptionPt,
        date: celebration.date,
        time: celebration.traditionalTime || '18:00',
        location: {
          venue: 'Various Locations',
          address: 'Portuguese Community Centers',
          city: 'London'
        },
        category: celebration.category,
        culturalFocus: celebration.origin,
        price: 0,
        currency: 'GBP',
        currentAttendees: Math.floor(Math.random() * 200) + 50,
        images: [],
        organizer: {
          name: 'LusoTown Community',
          email: 'events@lusotown.com'
        },
        tags: celebration.keywords,
        isRecurring: celebration.significance === 'annual',
        accessibility: {
          wheelchairAccessible: true,
          signLanguage: true,
          audioDescription: false
        },
        requirements: [],
        cancellationPolicy: 'Free community event',
        featured: celebration.significance === 'national',
        verified: true,
        ticketTypes: [{
          name: 'Free Entry',
          price: 0,
          description: 'Free community celebration',
          available: 500
        }]
      }))
    ]

    setEvents(culturalEvents)
  }, [])

  const eventCategories = [
    { id: '', name: { en: 'All Categories', pt: 'Todas as Categorias' }, icon: '🎭', count: filteredEvents.length },
    { id: 'cultural', name: { en: 'Cultural Events', pt: 'Eventos Culturais' }, icon: '🎨', count: filteredEvents.filter(e => e.category === 'cultural').length },
    { id: 'music', name: { en: 'Music & Fado', pt: 'Música e Fado' }, icon: '🎵', count: filteredEvents.filter(e => e.category === 'music').length },
    { id: 'food', name: { en: 'Food & Wine', pt: 'Gastronomia e Vinhos' }, icon: '🍷', count: filteredEvents.filter(e => e.category === 'food').length },
    { id: 'sports', name: { en: 'Sports', pt: 'Desporto' }, icon: '⚽', count: filteredEvents.filter(e => e.category === 'sports').length },
    { id: 'education', name: { en: 'Education', pt: 'Educação' }, icon: '📚', count: filteredEvents.filter(e => e.category === 'education').length },
    { id: 'business', name: { en: 'Business', pt: 'Negócios' }, icon: '💼', count: filteredEvents.filter(e => e.category === 'business').length },
    { id: 'religious', name: { en: 'Religious', pt: 'Religioso' }, icon: '⛪', count: filteredEvents.filter(e => e.category === 'religious').length },
    { id: 'festival', name: { en: 'Festivals', pt: 'Festivais' }, icon: '🎉', count: filteredEvents.filter(e => e.category === 'festival').length }
  ]

  const culturalFocusOptions = [
    { id: '', name: { en: 'All Cultures', pt: 'Todas as Culturas' }, flag: '🌍' },
    { id: 'portugal', name: { en: 'Portugal', pt: 'Portugal' }, flag: '🇵🇹' },
    { id: 'brazil', name: { en: 'Brazil', pt: 'Brasil' }, flag: '🇧🇷' },
    { id: 'angola', name: { en: 'Angola', pt: 'Angola' }, flag: '🇦🇴' },
    { id: 'cape_verde', name: { en: 'Cape Verde', pt: 'Cabo Verde' }, flag: '🇨🇻' },
    { id: 'mozambique', name: { en: 'Mozambique', pt: 'Moçambique' }, flag: '🇲🇿' },
    { id: 'mixed', name: { en: 'Mixed Lusophone', pt: 'Lusófono Misto' }, flag: '🌐' }
  ]

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      culturalFocus: '',
      city: '',
      dateRange: '',
      priceRange: '',
      features: [],
      searchTerm: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('events.calendar_title', 'Portuguese Community Events')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('events.calendar_subtitle', 'Discover authentic Portuguese cultural events, festivals, and community gatherings across the UK')}
        </p>
      </div>

      {/* View Toggle and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder={t('events.search_placeholder', 'Search events, venues, or topics...')}
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 {t('common.list', 'List')}
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'grid'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚏ {t('common.grid', 'Grid')}
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'calendar'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📅 {t('common.calendar', 'Calendar')}
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {t('events.categories', 'Categories')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {eventCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange('category', category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border text-sm ${
                    filters.category === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name[language]}</span>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cultural Focus and Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('events.cultural_focus', 'Cultural Focus')}
              </label>
              <select
                value={filters.culturalFocus}
                onChange={(e) => handleFilterChange('culturalFocus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {culturalFocusOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.flag} {option.name[language]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('events.date_range', 'Date Range')}
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('events.any_date', 'Any Date')}</option>
                <option value="today">{t('events.today', 'Today')}</option>
                <option value="this_week">{t('events.this_week', 'This Week')}</option>
                <option value="this_month">{t('events.this_month', 'This Month')}</option>
                <option value="next_month">{t('events.next_month', 'Next Month')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('events.price_range', 'Price Range')}
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('events.any_price', 'Any Price')}</option>
                <option value="free">{t('events.free', 'Free')}</option>
                <option value="under_20">{t('events.under_20', 'Under £20')}</option>
                <option value="20_50">{t('events.20_to_50', '£20 - £50')}</option>
                <option value="over_50">{t('events.over_50', 'Over £50')}</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {Object.values(filters).some(value => 
            Array.isArray(value) ? value.length > 0 : value
          ) && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {t('common.clear_all_filters', 'Clear all filters')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {loading ? (
            t('common.loading', 'Loading...')
          ) : (
            t('events.results_count', `${filteredEvents.length} events found`)
          )}
        </p>
      </div>

      {/* Events Display */}
      {view === 'calendar' ? (
        <CalendarView
          events={filteredEvents}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      ) : loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('events.no_events', 'No events found')}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {t('events.try_different_filters', 'Try adjusting your filters or check back later for new Portuguese community events.')}
          </p>
        </div>
      ) : (
        <div className={
          view === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              compact={view === 'grid'}
              showDistance={!!userLocation}
            />
          ))}
        </div>
      )}
    </div>
  )
}