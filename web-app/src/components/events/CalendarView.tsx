'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import EventCard from './EventCard'

interface Event {
  id: string
  title: string
  titlePortuguese?: string
  date: string
  time: string
  category: string
  culturalFocus: string
  price: number
  location: {
    venue: string
    city: string
  }
  featured: boolean
  verified: boolean
}

interface CalendarViewProps {
  events: Event[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export default function CalendarView({
  events,
  selectedDate,
  onDateSelect
}: CalendarViewProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const [currentViewDate, setCurrentViewDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  )

  // Generate calendar days for the current month
  const calendarDays = useMemo(() => {
    const year = currentViewDate.getFullYear()
    const month = currentViewDate.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    
    // First day of the calendar grid (may be from previous month)
    const startCalendar = new Date(firstDay)
    startCalendar.setDate(firstDay.getDate() - firstDay.getDay())
    
    // Last day of the calendar grid (may be from next month)
    const endCalendar = new Date(lastDay)
    endCalendar.setDate(lastDay.getDate() + (6 - lastDay.getDay()))
    
    const days = []
    const currentDate = new Date(startCalendar)
    
    while (currentDate <= endCalendar) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }, [currentViewDate])

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateString)
  }

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(selectedDate)

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentViewDate)
    if (direction === 'prev') {
      newDate.setMonth(currentViewDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentViewDate.getMonth() + 1)
    }
    setCurrentViewDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentViewDate.getMonth()
  }

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0
  }

  const getDayColor = (date: Date) => {
    if (isSelectedDate(date)) return colors.primary
    if (isToday(date)) return colors.accent
    if (hasEvents(date)) return colors.secondary
    return 'transparent'
  }

  const monthNames = language === 'pt' ? [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ] : [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = language === 'pt' ? 
    ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] :
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Grid */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentViewDate.getMonth()]} {currentViewDate.getFullYear()}
            </h2>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
          </div>

          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const dayEvents = getEventsForDate(date)
              const isCurrentMonthDay = isCurrentMonth(date)
              
              return (
                <button
                  key={index}
                  onClick={() => onDateSelect(date)}
                  className={`
                    relative p-2 h-20 border border-gray-100 rounded-lg transition-colors
                    ${isCurrentMonthDay ? 'hover:bg-gray-50' : 'text-gray-400'}
                    ${isSelectedDate(date) ? 'ring-2 ring-blue-500' : ''}
                  `}
                  style={{
                    backgroundColor: isSelectedDate(date) ? `${colors.primary}15` : 'transparent'
                  }}
                >
                  {/* Day Number */}
                  <div className={`text-sm font-medium ${
                    isToday(date) ? 'text-white' : 
                    isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                    
                    {/* Today Indicator */}
                    {isToday(date) && (
                      <div 
                        className="absolute inset-1 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-white font-semibold">{date.getDate()}</span>
                      </div>
                    )}
                  </div>

                  {/* Event Indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="flex space-x-1 justify-center">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="w-2 h-2 rounded-full"
                            style={{ 
                              backgroundColor: event.featured ? colors.accent : 
                                             event.verified ? colors.primary : colors.secondary 
                            }}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500">+</div>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              {t('calendar.legend', 'Legend')}
            </h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                <span>{t('calendar.today', 'Today')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <span>{t('calendar.selected', 'Selected')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                <span>{t('calendar.has_events', 'Has Events')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date Events */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>

          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-gray-600 text-sm">
                {t('calendar.no_events', 'No events scheduled for this date')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {language === 'pt' && event.titlePortuguese ? event.titlePortuguese : event.title}
                      </h4>
                      
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span>⏰</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>📍</span>
                          <span>{event.location.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{event.price === 0 ? '🆓' : '💷'}</span>
                          <span>
                            {event.price === 0 ? 
                              t('events.free', 'FREE') : 
                              `£${event.price}`
                            }
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full text-white" 
                              style={{ backgroundColor: colors.secondary }}>
                          {event.category}
                        </span>
                        
                        {event.featured && (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                        
                        {event.verified && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-2">
                <button
                  className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // This would typically navigate to a filtered events list
                    console.log('View all events for date:', selectedDate)
                  }}
                >
                  {t('calendar.view_all_events', 'View All Events')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            {t('calendar.this_month', 'This Month')}
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t('calendar.total_events', 'Total Events')}</span>
              <span className="font-medium">
                {events.filter(event => {
                  const eventDate = new Date(event.date)
                  return eventDate.getMonth() === currentViewDate.getMonth() &&
                         eventDate.getFullYear() === currentViewDate.getFullYear()
                }).length}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t('calendar.free_events', 'Free Events')}</span>
              <span className="font-medium">
                {events.filter(event => {
                  const eventDate = new Date(event.date)
                  return eventDate.getMonth() === currentViewDate.getMonth() &&
                         eventDate.getFullYear() === currentViewDate.getFullYear() &&
                         event.price === 0
                }).length}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t('calendar.featured_events', 'Featured Events')}</span>
              <span className="font-medium">
                {events.filter(event => {
                  const eventDate = new Date(event.date)
                  return eventDate.getMonth() === currentViewDate.getMonth() &&
                         eventDate.getFullYear() === currentViewDate.getFullYear() &&
                         event.featured
                }).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}