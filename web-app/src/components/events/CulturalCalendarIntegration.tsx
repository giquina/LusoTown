'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDaysIcon,
  AcademicCapIcon,
  GlobeEuropeAfricaIcon,
  MusicalNoteIcon,
  BuildingOfficeIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import { CULTURAL_EVENTS } from '@/config/cultural-events'
import { LUSOPHONE_CELEBRATIONS, UNIVERSITY_EVENTS } from '@/config/lusophone-celebrations'
import EventDiscoverySystem from './EventDiscoverySystem'
import PortugueseEventsCalendar from './PortugueseEventsCalendar'

interface CulturalCalendarIntegrationProps {
  className?: string
  showUniversityEvents?: boolean
  showPALOPCelebrations?: boolean
  defaultView?: 'calendar' | 'discovery' | 'unified'
}

interface IntegratedEvent {
  id: string
  title: string
  titlePortuguese: string
  date: Date
  time: string
  type: 'cultural' | 'celebration' | 'university' | 'business'
  category: string
  location: string
  description: string
  descriptionPortuguese: string
  organizer: string
  country: string
  flagEmoji: string
  price?: string
  capacity?: number
  attendees?: number
  tags: string[]
  imageUrl?: string
  isRecurring?: boolean
  culturalSignificance?: string
  universityPartnership?: string
}

export default function CulturalCalendarIntegration({
  className = '',
  showUniversityEvents = true,
  showPALOPCelebrations = true,
  defaultView = 'unified'
}: CulturalCalendarIntegrationProps) {
  const { language, t } = useLanguage()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [currentView, setCurrentView] = useState<'calendar' | 'discovery' | 'unified'>(defaultView)
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    country: 'all',
    timeframe: 'month'
  })
  const [selectedEvent, setSelectedEvent] = useState<IntegratedEvent | null>(null)

  const isPortuguese = language === 'pt'

  // Integrate all event sources into unified calendar
  const integratedEvents = useMemo(() => {
    const events: IntegratedEvent[] = []
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    // Add cultural events from config
    CULTURAL_EVENTS.forEach(event => {
      if (!event.isActive) return

      // Generate upcoming event dates
      const eventDate = new Date(currentYear, currentMonth + Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1)
      
      events.push({
        id: `cultural-${event.id}`,
        title: event.name,
        titlePortuguese: event.namePortuguese,
        date: eventDate,
        time: event.time,
        type: 'cultural',
        category: event.type,
        location: event.venue,
        description: event.description,
        descriptionPortuguese: event.descriptionPortuguese,
        organizer: event.organizer,
        country: event.origin,
        flagEmoji: event.flag,
        price: event.price,
        capacity: event.capacity,
        attendees: event.attendanceAverage,
        tags: [event.type, event.origin, 'cultural'],
        imageUrl: event.image,
        isRecurring: event.isRegularEvent,
        culturalSignificance: event.culturalBackground
      })
    })

    // Add PALOP celebrations if enabled
    if (showPALOPCelebrations) {
      LUSOPHONE_CELEBRATIONS.forEach(celebration => {
        const celebrationDate = generateCelebrationDate(celebration.period.en, currentYear)
        if (celebrationDate) {
          events.push({
            id: `palop-${celebration.id}`,
            title: celebration.name.en,
            titlePortuguese: celebration.name.pt,
            date: celebrationDate,
            time: '19:00',
            type: 'celebration',
            category: celebration.category,
            location: 'Multiple Venues Across UK',
            description: celebration.description.en,
            descriptionPortuguese: celebration.description.pt,
            organizer: 'PALOP Community Network',
            country: celebration.countries.join(', '),
            flagEmoji: celebration.flagEmoji || '🎉',
            tags: ['palop', 'celebration', ...celebration.countries],
            culturalSignificance: celebration.significance.en,
            isRecurring: true
          })
        }
      })
    }

    // Add university events if enabled
    if (showUniversityEvents) {
      UNIVERSITY_EVENTS.forEach(event => {
        const eventDate = new Date(event.date)
        events.push({
          id: `university-${event.id}`,
          title: event.title.en,
          titlePortuguese: event.title.pt,
          date: eventDate,
          time: event.time,
          type: 'university',
          category: event.type,
          location: event.location,
          description: event.description.en,
          descriptionPortuguese: event.description.pt,
          organizer: event.university,
          country: 'United Kingdom',
          flagEmoji: '🎓',
          capacity: event.capacity,
          tags: ['university', 'students', event.type],
          universityPartnership: event.university,
          isRecurring: event.isRecurring
        })
      })
    }

    return events.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [showUniversityEvents, showPALOPCelebrations])

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return integratedEvents.filter(event => {
      if (selectedFilters.type !== 'all' && event.type !== selectedFilters.type) {
        return false
      }
      if (selectedFilters.country !== 'all' && !event.country.toLowerCase().includes(selectedFilters.country.toLowerCase())) {
        return false
      }
      // Add timeframe filtering logic here if needed
      return true
    })
  }, [integratedEvents, selectedFilters])

  // Event type statistics
  const eventStats = useMemo(() => {
    const stats = {
      total: filteredEvents.length,
      cultural: filteredEvents.filter(e => e.type === 'cultural').length,
      palop: filteredEvents.filter(e => e.type === 'celebration').length,
      university: filteredEvents.filter(e => e.type === 'university').length,
      countries: [...new Set(filteredEvents.map(e => e.country))].length
    }
    return stats
  }, [filteredEvents])

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event)
  }

  const toggleEventFavorite = (event: IntegratedEvent) => {
    toggleFavorite({
      id: event.id,
      type: 'event',
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl || `/images/events/${event.category}.jpg`
    })
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header with View Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('cultural.calendar.title', 'Portuguese-Speaking Cultural Calendar')}
              </h1>
              <p className="text-gray-600">
                {t('cultural.calendar.subtitle', 'Unified view of cultural events, PALOP celebrations, and university activities')}
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setCurrentView('unified')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                currentView === 'unified' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('cultural.view.unified', 'Unified')}
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                currentView === 'calendar' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('cultural.view.calendar', 'Calendar')}
            </button>
            <button
              onClick={() => setCurrentView('discovery')}
              className={`px-4 py-2 rounded-md transition-colors text-sm ${
                currentView === 'discovery' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('cultural.view.discovery', 'Discovery')}
            </button>
          </div>
        </div>

        {/* Event Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{eventStats.total}</div>
            <div className="text-sm text-primary-600">{isPortuguese ? 'Total' : 'Total'}</div>
          </div>
          <div className="bg-secondary-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary-600">{eventStats.cultural}</div>
            <div className="text-sm text-secondary-600">{isPortuguese ? 'Culturais' : 'Cultural'}</div>
          </div>
          <div className="bg-accent-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-600">{eventStats.palop}</div>
            <div className="text-sm text-accent-600">PALOP</div>
          </div>
          <div className="bg-gold-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gold-600">{eventStats.university}</div>
            <div className="text-sm text-gold-600">{isPortuguese ? 'Universitários' : 'University'}</div>
          </div>
          <div className="bg-coral-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-coral-600">{eventStats.countries}</div>
            <div className="text-sm text-coral-600">{isPortuguese ? 'Países' : 'Countries'}</div>
          </div>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedFilters({ ...selectedFilters, type: 'all' })}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              selectedFilters.type === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('filters.all_types', 'All Types')}
          </button>
          <button
            onClick={() => setSelectedFilters({ ...selectedFilters, type: 'cultural' })}
            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
              selectedFilters.type === 'cultural' 
                ? 'bg-secondary-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MusicalNoteIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Cultural' : 'Cultural'}</span>
          </button>
          <button
            onClick={() => setSelectedFilters({ ...selectedFilters, type: 'celebration' })}
            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
              selectedFilters.type === 'celebration' 
                ? 'bg-accent-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <GlobeEuropeAfricaIcon className="w-4 h-4" />
            <span>PALOP</span>
          </button>
          <button
            onClick={() => setSelectedFilters({ ...selectedFilters, type: 'university' })}
            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 ${
              selectedFilters.type === 'university' 
                ? 'bg-gold-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4" />
            <span>{isPortuguese ? 'Universidades' : 'University'}</span>
          </button>
        </div>
      </div>

      {/* Content based on current view */}
      <AnimatePresence mode="wait">
        {currentView === 'unified' && (
          <motion.div
            key="unified"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Integrated Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.slice(0, 9).map((event) => {
                const eventIsFavorite = isFavorite(event.id)
                const typeColor = {
                  cultural: 'from-secondary-500 to-secondary-600',
                  celebration: 'from-accent-500 to-accent-600',
                  university: 'from-gold-500 to-gold-600',
                  business: 'from-primary-500 to-primary-600'
                }[event.type] || 'from-gray-500 to-gray-600'

                return (
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleEventSelect(event)}
                  >
                    <div className={`h-32 bg-gradient-to-br ${typeColor} flex items-center justify-center relative`}>
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">{event.flagEmoji}</div>
                        <div className="text-sm opacity-90">{event.country}</div>
                      </div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleEventFavorite(event)
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {eventIsFavorite ? (
                          <HeartSolidIcon className="w-5 h-5 text-red-300" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`bg-gradient-to-r ${typeColor} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                          {event.type.toUpperCase()}
                        </span>
                        {event.isRecurring && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {isPortuguese ? 'Recorrente' : 'Recurring'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {isPortuguese ? event.titlePortuguese : event.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {isPortuguese ? event.descriptionPortuguese : event.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4" />
                          <span>{event.date.toLocaleDateString()} • {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        {event.capacity && event.attendees && (
                          <div className="flex items-center space-x-2">
                            <UsersIcon className="w-4 h-4" />
                            <span>{event.attendees}/{event.capacity}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className={`w-full bg-gradient-to-r ${typeColor} text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity`}>
                        {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {currentView === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PortugueseEventsCalendar 
              onEventSelect={handleEventSelect}
              showFilters={true}
            />
          </motion.div>
        )}

        {currentView === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EventDiscoverySystem />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedEvent.flagEmoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isPortuguese ? selectedEvent.titlePortuguese : selectedEvent.title}
                    </h2>
                    <p className="text-gray-600">{selectedEvent.organizer}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  {isPortuguese ? selectedEvent.descriptionPortuguese : selectedEvent.description}
                </p>

                {selectedEvent.culturalSignificance && (
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-900 mb-2">
                      {isPortuguese ? 'Significado Cultural' : 'Cultural Significance'}
                    </h4>
                    <p className="text-primary-700 text-sm">{selectedEvent.culturalSignificance}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>{isPortuguese ? 'Data:' : 'Date:'}</strong> {selectedEvent.date.toLocaleDateString()}
                  </div>
                  <div>
                    <strong>{isPortuguese ? 'Hora:' : 'Time:'}</strong> {selectedEvent.time}
                  </div>
                  <div className="col-span-2">
                    <strong>{isPortuguese ? 'Local:' : 'Location:'}</strong> {selectedEvent.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to generate celebration dates
function generateCelebrationDate(period: string, year: number): Date | null {
  const periodText = period.toLowerCase()
  
  if (periodText.includes('june')) {
    return new Date(year, 5, 13) // June 13
  } else if (periodText.includes('september 7')) {
    return new Date(year, 8, 7) // September 7
  } else if (periodText.includes('november 11')) {
    return new Date(year, 10, 11) // November 11
  } else if (periodText.includes('march')) {
    return new Date(year, 2, 15) // March 15
  } else if (periodText.includes('june 25')) {
    return new Date(year, 5, 25) // June 25
  } else if (periodText.includes('july 12')) {
    return new Date(year, 6, 12) // July 12
  } else if (periodText.includes('october')) {
    return new Date(year, 9, 15) // October 15
  } else if (periodText.includes('february')) {
    return new Date(year, 1, 15) // February 15
  }
  
  return null
}