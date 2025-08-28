'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { UK_CITIES_EXPANSION } from '@/config/uk-cities-expansion'

interface EnhancedCalendarViewProps {
  events: any[]
  onEventSelect: (event: any) => void
  selectedCity: string
  onCityChange: (city: string) => void
  eventTypes: any[]
  palopCountries: any[]
  onAttendEvent: (eventId: string) => void
  attendingEvents: Set<string>
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  events: any[]
  dayNumber: number
}

export default function EnhancedCalendarView({
  events,
  onEventSelect,
  selectedCity,
  onCityChange,
  eventTypes,
  palopCountries,
  onAttendEvent,
  attendingEvents
}: EnhancedCalendarViewProps) {
  const { language, t } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  
  const isPortuguese = language === 'pt'

  // Calendar calculation
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days: CalendarDay[] = []
    const currentDay = new Date(startDate)
    
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        const dayEvents = events.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate.toDateString() === currentDay.toDateString()
        })
        
        days.push({
          date: new Date(currentDay),
          isCurrentMonth: currentDay.getMonth() === month,
          events: dayEvents,
          dayNumber: currentDay.getDate()
        })
        
        currentDay.setDate(currentDay.getDate() + 1)
      }
    }
    
    return days
  }, [currentDate, events])

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return []
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === selectedDate.toDateString()
    })
  }, [selectedDate, events])

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const monthNamesPortuguese = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const weekDays = isPortuguese 
    ? ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getEventColor = (eventType: string) => {
    const colors = {
      fado: 'bg-purple-500',
      kizomba: 'bg-pink-500',
      business: 'bg-blue-500',
      cultural: 'bg-green-500',
      food: 'bg-orange-500',
      celebration: 'bg-yellow-500'
    }
    return colors[eventType as keyof typeof colors] || 'bg-primary-500'
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={t('calendar.navigation.previous_month', 'Previous month')}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900">
            {isPortuguese 
              ? monthNamesPortuguese[currentDate.getMonth()]
              : monthNames[currentDate.getMonth()]
            } {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={t('calendar.navigation.next_month', 'Next month')}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* City Selector */}
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">🇬🇧 {isPortuguese ? 'Todo o Reino Unido' : 'All UK Cities'}</option>
            <option value="london">🏴󠁧󠁢󠁥󠁮󠁧󠁿 London</option>
            {UK_CITIES_EXPANSION.map(city => (
              <option key={city.id} value={city.id}>
                🏴󠁧󠁢󠁥󠁮󠁧󠁿 {city.name}
              </option>
            ))}
          </select>

          {/* Today Button */}
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            {isPortuguese ? 'Hoje' : 'Today'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Week Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 bg-gray-50 rounded-lg p-2">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                className={`
                  relative h-24 p-1 rounded-lg cursor-pointer transition-all
                  ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-100'}
                  ${selectedDate?.toDateString() === day.date.toDateString() 
                    ? 'ring-2 ring-primary-500 bg-primary-50' 
                    : 'hover:bg-primary-50'
                  }
                  ${day.date.toDateString() === new Date().toDateString() 
                    ? 'ring-1 ring-primary-300' 
                    : ''
                  }
                `}
                onClick={() => setSelectedDate(day.date)}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`
                  text-sm font-medium mb-1
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${day.date.toDateString() === new Date().toDateString() 
                    ? 'text-primary-600 font-bold' 
                    : ''
                  }
                `}>
                  {day.dayNumber}
                </div>
                
                {/* Event indicators */}
                <div className="space-y-1">
                  {day.events.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={event.id}
                      className={`
                        text-xs p-1 rounded text-white truncate
                        ${getEventColor(event.category)}
                      `}
                      title={event.title}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{event.flagEmoji}</span>
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-600 text-center">
                      +{day.events.length - 2} {t('calendar.event.more_events', 'more')}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="space-y-4">
          {selectedDate && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <CalendarDaysIcon className="w-5 h-5 text-primary-500" />
                <span>
                  {selectedDate.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </h3>

              {selectedDateEvents.length === 0 ? (
                <p className="text-gray-600 text-sm">
                  {isPortuguese 
                    ? 'Nenhum evento nesta data' 
                    : 'No events on this date'
                  }
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map(event => {
                    const isAttending = attendingEvents.has(event.id)
                    return (
                      <motion.div
                        key={event.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onEventSelect(event)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{event.flagEmoji}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 line-clamp-1">
                                {event.title}
                              </h4>
                              <div className={`
                                inline-block px-2 py-1 rounded-full text-xs font-medium
                                ${getEventColor(event.category)} text-white
                              `}>
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onAttendEvent(event.id)
                            }}
                            className={`
                              p-1 rounded-full transition-colors
                              ${isAttending 
                                ? 'text-yellow-500 hover:text-yellow-600' 
                                : 'text-gray-400 hover:text-yellow-500'
                              }
                            `}
                          >
                            {isAttending ? (
                              <StarSolidIcon className="w-5 h-5" />
                            ) : (
                              <StarIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPinIcon className="w-3 h-3" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <UsersIcon className="w-3 h-3" />
                            <span>{event.attendees}/{event.capacity}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onAttendEvent(event.id)
                          }}
                          className={`
                            w-full mt-3 py-2 rounded-lg text-xs font-medium transition-colors
                            ${isAttending
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-primary-500 text-white hover:bg-primary-600'
                            }
                          `}
                        >
                          {isAttending
                            ? (isPortuguese ? '✓ Confirmado' : '✓ Attending')
                            : (isPortuguese ? 'Participar' : 'Attend')
                          }
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-md p-6 text-white">
            <h4 className="font-bold mb-3">
              {isPortuguese ? 'Estatísticas do Mês' : 'Monthly Stats'}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{isPortuguese ? 'Total de Eventos:' : 'Total Events:'}</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPortuguese ? 'Participando:' : 'Attending:'}</span>
                <span className="font-semibold">{attendingEvents.size}</span>
              </div>
              <div className="flex justify-between">
                <span>{isPortuguese ? 'Cidades:' : 'Cities:'}</span>
                <span className="font-semibold">
                  {[...new Set(events.map(e => e.location))].length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}