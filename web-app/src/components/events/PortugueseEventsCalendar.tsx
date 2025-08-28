'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  MusicalNoteIcon,
  CakeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  HeartIcon,
  TagIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Typography, Spacing, cn } from '@/lib/design'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import { CULTURAL_EVENTS, CulturalEvent } from '@/config/cultural-events'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'
import { PORTUGUESE_COUNTRIES } from '@/config/portuguese-countries'

interface PortugueseEventsCalendarProps {
  className?: string
  view?: 'month' | 'week'
  onEventSelect?: (event: CalendarEvent) => void
  selectedDate?: Date
  showFilters?: boolean
}

interface CalendarEvent {
  id: string
  title: string
  titlePortuguese: string
  date: Date
  time: string
  type: 'cultural' | 'celebration' | 'regular' | 'special'
  category: string
  location: string
  description: string
  descriptionPortuguese: string
  color: string
  icon: React.ComponentType<any>
  country: string
  flagEmoji: string
  price?: string
  attendees?: {
    current: number
    max: number
  }
}

const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
}

const WEEKDAYS = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
}

const EVENT_COLORS = {
  fado: 'bg-purple-500',
  kizomba: 'bg-red-500',
  business: 'bg-blue-500',
  cultural: 'bg-green-500',
  food: 'bg-orange-500',
  celebration: 'bg-pink-500',
  music: 'bg-indigo-500',
  festival: 'bg-yellow-500'
}

const EVENT_ICONS = {
  fado: MusicalNoteIcon,
  kizomba: UsersIcon,
  business: BuildingOfficeIcon,
  cultural: FlagIcon,
  food: CakeIcon,
  celebration: CakeIcon,
  music: MusicalNoteIcon,
  festival: CakeIcon
}

export default function PortugueseEventsCalendar({
  className = '',
  view = 'month',
  onEventSelect,
  selectedDate,
  showFilters = true
}: PortugueseEventsCalendarProps) {
  const { language, t } = useLanguage()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date())
  const [currentView, setCurrentView] = useState<'month' | 'week'>(view)
  const [selectedEventType, setSelectedEventType] = useState<string>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  const isPortuguese = language === 'pt'

  // Generate calendar events from cultural events and celebrations
  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = []
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    // Add cultural events (recurring)
    CULTURAL_EVENTS.forEach(event => {
      if (!event.isActive) return

      // Generate events for current and next month
      for (let monthOffset = -1; monthOffset <= 2; monthOffset++) {
        const eventDate = new Date(currentYear, currentMonth + monthOffset, 15) // Mid-month for regular events
        
        // Adjust date based on event frequency
        if (event.frequency === 'Weekly' && event.dayOfWeek) {
          // Generate weekly events
          const daysInMonth = new Date(eventDate.getFullYear(), eventDate.getMonth() + 1, 0).getDate()
          for (let day = 1; day <= daysInMonth; day += 7) {
            const weeklyDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), day)
            events.push({
              id: `${event.id}-${weeklyDate.toISOString()}`,
              title: event.name,
              titlePortuguese: event.namePortuguese,
              date: weeklyDate,
              time: event.time,
              type: 'regular',
              category: event.type,
              location: event.venue,
              description: event.description,
              descriptionPortuguese: event.descriptionPortuguese,
              color: EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || 'bg-gray-500',
              icon: EVENT_ICONS[event.type as keyof typeof EVENT_ICONS] || TagIcon,
              country: event.origin,
              flagEmoji: event.flag,
              price: event.price,
              attendees: {
                current: event.attendanceAverage,
                max: event.capacity
              }
            })
          }
        } else if (event.frequency === 'Monthly') {
          events.push({
            id: `${event.id}-${eventDate.toISOString()}`,
            title: event.name,
            titlePortuguese: event.namePortuguese,
            date: eventDate,
            time: event.time,
            type: 'regular',
            category: event.type,
            location: event.venue,
            description: event.description,
            descriptionPortuguese: event.descriptionPortuguese,
            color: EVENT_COLORS[event.type as keyof typeof EVENT_COLORS] || 'bg-gray-500',
            icon: EVENT_ICONS[event.type as keyof typeof EVENT_ICONS] || TagIcon,
            country: event.origin,
            flagEmoji: event.flag,
            price: event.price,
            attendees: {
              current: event.attendanceAverage,
              max: event.capacity
            }
          })
        }
      }
    })

    // Add lusophone celebration events
    LUSOPHONE_CELEBRATIONS.forEach(celebration => {
      // Parse period and create appropriate dates
      const periodText = celebration.period.en.toLowerCase()
      let celebrationDate: Date

      if (periodText.includes('june')) {
        celebrationDate = new Date(currentYear, 5, 13) // June 13 (Santos Populares)
      } else if (periodText.includes('september 7')) {
        celebrationDate = new Date(currentYear, 8, 7) // September 7 (Brazilian Independence)
      } else if (periodText.includes('november 11')) {
        celebrationDate = new Date(currentYear, 10, 11) // November 11 (Angolan Independence)
      } else if (periodText.includes('march')) {
        celebrationDate = new Date(currentYear, 2, 15) // March 15 (Cape Verde Culture)
      } else if (periodText.includes('june 25')) {
        celebrationDate = new Date(currentYear, 5, 25) // June 25 (Mozambique)
      } else if (periodText.includes('july 12')) {
        celebrationDate = new Date(currentYear, 6, 12) // July 12 (São Tomé)
      } else if (periodText.includes('october')) {
        celebrationDate = new Date(currentYear, 9, 15) // October 15 (Film Festival)
      } else if (periodText.includes('february')) {
        celebrationDate = new Date(currentYear, 1, 15) // February 15 (Carnival)
      } else {
        celebrationDate = new Date(currentYear, currentMonth, Math.floor(Math.random() * 28) + 1)
      }

      events.push({
        id: `celebration-${celebration.id}`,
        title: celebration.name.en,
        titlePortuguese: celebration.name.pt,
        date: celebrationDate,
        time: '19:00',
        type: 'celebration',
        category: celebration.category,
        location: 'Various Venues',
        description: celebration.description.en,
        descriptionPortuguese: celebration.description.pt,
        color: 'bg-gradient-to-r from-primary-500 to-secondary-500',
        icon: CakeIcon,
        country: celebration.countries.join(', '),
        flagEmoji: celebration.flagEmoji || '🎉'
      })
    })

    return events
  }, [currentDate])

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      if (selectedEventType !== 'all' && event.category !== selectedEventType) {
        return false
      }
      if (selectedCountry !== 'all' && !event.country.toLowerCase().includes(selectedCountry.toLowerCase())) {
        return false
      }
      return true
    })
  }, [calendarEvents, selectedEventType, selectedCountry])

  // Generate calendar grid
  const calendarGrid = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    
    const grid: (Date | null)[] = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      grid.push(null)
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      grid.push(new Date(year, month, day))
    }
    
    return grid
  }, [currentDate])

  // Get events for specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventSelect) {
      onEventSelect(event)
    }
  }

  const toggleEventFavorite = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite({
      id: event.id,
      type: 'event',
      title: event.title,
      description: event.description,
      imageUrl: `/images/events/${event.category}.jpg`
    })
  }

  const uniqueEventTypes = useMemo(() => {
    const types = [...new Set(calendarEvents.map(event => event.category))]
    return types
  }, [calendarEvents])

  const uniqueCountries = useMemo(() => {
    const countries = [...new Set(calendarEvents.map(event => event.country))]
    return countries
  }, [calendarEvents])

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {t('calendar.title', 'Portuguese Events Calendar')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('calendar.subtitle', 'Cultural events and Portuguese-speaking community celebrations')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView(currentView === 'month' ? 'week' : 'month')}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {currentView === 'month' ? 
                t('calendar.view.week', 'Week') : 
                t('calendar.view.month', 'Month')
              }
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{t('calendar.filters.all_types', 'All Types')}</option>
              {uniqueEventTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{t('calendar.filters.all_countries', 'All Countries')}</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-900">
            {MONTH_NAMES[language][currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS[language].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2 min-h-[100px]" />
            }

            const dayEvents = getEventsForDate(date)
            const isToday = date.toDateString() === new Date().toDateString()
            const isCurrentMonth = date.getMonth() === currentDate.getMonth()

            return (
              <motion.div
                key={date.toISOString()}
                className={cn(
                  'p-2 min-h-[100px] border border-gray-100 hover:bg-gray-50 transition-colors relative',
                  isToday && 'bg-primary-50 border-primary-200',
                  !isCurrentMonth && 'text-gray-400'
                )}
                whileHover={{ scale: 1.02 }}
              >
                <div className={cn(
                  'text-sm font-medium mb-1',
                  isToday && 'text-primary-600'
                )}>
                  {date.getDate()}
                </div>
                
                {/* Event Indicators */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => {
                    const IconComponent = event.icon
                    const eventIsFavorite = isFavorite(event.id)
                    
                    return (
                      <motion.div
                        key={event.id}
                        className="relative group cursor-pointer"
                        onClick={() => handleEventClick(event)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className={cn(
                          'text-xs p-1 rounded text-white truncate flex items-center space-x-1',
                          typeof event.color === 'string' ? event.color : 'bg-gray-500'
                        )}>
                          <IconComponent className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {isPortuguese ? event.titlePortuguese : event.title}
                          </span>
                          <button
                            onClick={(e) => toggleEventFavorite(event, e)}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {eventIsFavorite ? (
                              <HeartSolidIcon className="w-3 h-3 text-red-200" />
                            ) : (
                              <HeartIcon className="w-3 h-3 text-white/70" />
                            )}
                          </button>
                        </div>
                        
                        {/* Event Tooltip */}
                        <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white p-2 rounded-lg text-xs whitespace-nowrap bottom-full left-0 mb-1">
                          <div className="font-medium">
                            {isPortuguese ? event.titlePortuguese : event.title}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>{event.time}</span>
                            <MapPinIcon className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                  
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 font-medium">
                      +{dayEvents.length - 3} {isPortuguese ? 'mais' : 'more'}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Event Summary */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">
            {isPortuguese ? 'Resumo do Mês' : 'Monthly Summary'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-primary-600">
                {filteredEvents.filter(e => e.date.getMonth() === currentDate.getMonth()).length}
              </div>
              <div className="text-gray-600">
                {isPortuguese ? 'Eventos' : 'Events'}
              </div>
            </div>
            <div>
              <div className="font-medium text-secondary-600">
                {filteredEvents.filter(e => e.type === 'celebration').length}
              </div>
              <div className="text-gray-600">
                {isPortuguese ? 'Celebrações' : 'Celebrations'}
              </div>
            </div>
            <div>
              <div className="font-medium text-accent-600">
                {uniqueCountries.length}
              </div>
              <div className="text-gray-600">
                {isPortuguese ? 'Países' : 'Countries'}
              </div>
            </div>
            <div>
              <div className="font-medium text-coral-600">
                {uniqueEventTypes.length}
              </div>
              <div className="text-gray-600">
                {isPortuguese ? 'Categorias' : 'Categories'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}