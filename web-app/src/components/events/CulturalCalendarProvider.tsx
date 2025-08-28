'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { CULTURAL_EVENTS, CulturalEvent } from '@/config/cultural-events'
import { LUSOPHONE_CELEBRATIONS, LusophoneCelebration } from '@/config/lusophone-celebrations'
import { UNIVERSITY_EVENTS, UniversityEvent } from '@/config/lusophone-celebrations'
import { PORTUGUESE_COUNTRIES } from '@/config/portuguese-countries'

interface CalendarEvent {
  id: string
  title: string
  titlePortuguese: string
  date: Date
  time: string
  endTime?: string
  type: 'cultural' | 'celebration' | 'university' | 'community' | 'business' | 'recurring'
  category: string
  subcategory?: string
  location: string
  venue: string
  address?: string
  description: string
  descriptionPortuguese: string
  organizer: string
  contactEmail?: string
  price?: string
  priceDetails?: string
  capacity?: number
  currentAttendees?: number
  country: string
  countries?: string[]
  flagEmoji: string
  image?: string
  gallery?: string[]
  tags: string[]
  featured: boolean
  isRecurring: boolean
  recurrencePattern?: string
  culturalAuthenticity?: number
  accessibility: {
    wheelchairAccessible: boolean
    signLanguage: boolean
    audioDescription: boolean
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

interface CulturalCalendarContextType {
  events: CalendarEvent[]
  upcomingEvents: CalendarEvent[]
  featuredEvents: CalendarEvent[]
  getEventsByMonth: (year: number, month: number) => CalendarEvent[]
  getEventsByType: (type: string) => CalendarEvent[]
  getEventsByCountry: (country: string) => CalendarEvent[]
  getEventById: (id: string) => CalendarEvent | null
  searchEvents: (query: string) => CalendarEvent[]
  filterEvents: (filters: EventFilters) => CalendarEvent[]
  getCulturalHolidays: (year: number, month: number) => CalendarEvent[]
  getUniversityEvents: () => CalendarEvent[]
  loading: boolean
  error: string | null
}

interface EventFilters {
  type?: string
  category?: string
  country?: string
  dateRange?: {
    start: Date
    end: Date
  }
  priceRange?: {
    min: number
    max: number
  }
  location?: string
  featured?: boolean
  accessibility?: string[]
}

const CulturalCalendarContext = createContext<CulturalCalendarContextType | undefined>(undefined)

interface CulturalCalendarProviderProps {
  children: ReactNode
}

export function CulturalCalendarProvider({ children }: CulturalCalendarProviderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate recurring events for cultural activities
  const generateRecurringEvents = useCallback((culturalEvent: CulturalEvent, startDate: Date, endDate: Date): CalendarEvent[] => {
    const events: CalendarEvent[] = []
    const current = new Date(startDate)
    
    while (current <= endDate) {
      let shouldAddEvent = false
      const eventDate = new Date(current)
      
      // Generate based on frequency
      if (culturalEvent.frequency === 'Weekly' && culturalEvent.dayOfWeek) {
        const targetDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          .indexOf(culturalEvent.dayOfWeek.toLowerCase())
        
        if (current.getDay() === targetDay) {
          shouldAddEvent = true
        }
      } else if (culturalEvent.frequency === 'Monthly') {
        // Add on 15th of each month
        if (current.getDate() === 15) {
          shouldAddEvent = true
        }
      } else if (culturalEvent.frequency === 'Twice weekly') {
        // Tuesday and Thursday for Kizomba-type events
        if (current.getDay() === 2 || current.getDay() === 4) {
          shouldAddEvent = true
        }
      }
      
      if (shouldAddEvent) {
        events.push({
          id: `${culturalEvent.id}-${eventDate.getTime()}`,
          title: culturalEvent.name,
          titlePortuguese: culturalEvent.namePortuguese,
          date: new Date(eventDate),
          time: culturalEvent.time,
          endTime: calculateEndTime(culturalEvent.time, culturalEvent.duration),
          type: 'cultural',
          category: culturalEvent.type,
          location: culturalEvent.venue,
          venue: culturalEvent.venue,
          address: culturalEvent.address,
          description: culturalEvent.description,
          descriptionPortuguese: culturalEvent.descriptionPortuguese,
          organizer: culturalEvent.organizer,
          contactEmail: culturalEvent.contactEmail,
          price: culturalEvent.price,
          priceDetails: culturalEvent.priceDetails,
          capacity: culturalEvent.capacity,
          currentAttendees: culturalEvent.attendanceAverage,
          country: culturalEvent.origin,
          flagEmoji: culturalEvent.flag,
          image: culturalEvent.image,
          gallery: culturalEvent.gallery,
          tags: culturalEvent.authenticityFeatures || [],
          featured: culturalEvent.featured,
          isRecurring: culturalEvent.isRegularEvent,
          recurrencePattern: culturalEvent.frequency,
          culturalAuthenticity: culturalEvent.popularityScore,
          accessibility: {
            wheelchairAccessible: true, // Default assumption for established venues
            signLanguage: false,
            audioDescription: false
          },
          socialMedia: culturalEvent.socialMedia
        })
      }
      
      // Move to next day
      current.setDate(current.getDate() + 1)
    }
    
    return events
  }, [])

  // Calculate end time from start time and duration
  const calculateEndTime = (startTime: string, duration: string): string => {
    try {
      const [hours, minutes] = startTime.split(':').map(Number)
      const durationMatch = duration.match(/(\d+)/)
      const durationHours = durationMatch ? parseInt(durationMatch[1]) : 2
      
      const endHour = (hours + durationHours) % 24
      return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    } catch {
      return startTime // Return original if parsing fails
    }
  }

  // Generate celebration events for specific dates
  const generateCelebrationEvents = useCallback((celebration: LusophoneCelebration, year: number): CalendarEvent[] => {
    const events: CalendarEvent[] = []
    const periodText = celebration.period.en.toLowerCase()
    
    // Parse period and create appropriate dates
    let celebrationDates: Date[] = []
    
    if (periodText.includes('june 13') || periodText.includes('june - july')) {
      celebrationDates.push(new Date(year, 5, 13)) // Santos Populares
    }
    if (periodText.includes('september 7')) {
      celebrationDates.push(new Date(year, 8, 7)) // Brazilian Independence
    }
    if (periodText.includes('november 11')) {
      celebrationDates.push(new Date(year, 10, 11)) // Angolan Independence
    }
    if (periodText.includes('march')) {
      celebrationDates.push(new Date(year, 2, 15)) // Cape Verde Culture Day
    }
    if (periodText.includes('june 25')) {
      celebrationDates.push(new Date(year, 5, 25)) // Mozambique Independence
    }
    if (periodText.includes('july 12')) {
      celebrationDates.push(new Date(year, 6, 12)) // São Tomé Independence
    }
    if (periodText.includes('october')) {
      celebrationDates.push(new Date(year, 9, 15)) // Film Festival
    }
    if (periodText.includes('february') || periodText.includes('carnival')) {
      celebrationDates.push(new Date(year, 1, 20)) // Carnival
    }
    
    celebrationDates.forEach(date => {
      events.push({
        id: `celebration-${celebration.id}-${year}`,
        title: celebration.name.en,
        titlePortuguese: celebration.name.pt,
        date,
        time: '19:00',
        endTime: '23:00',
        type: 'celebration',
        category: celebration.category,
        location: 'Multiple Venues',
        venue: 'Community Centers & Restaurants',
        description: celebration.description.en,
        descriptionPortuguese: celebration.description.pt,
        organizer: 'Portuguese-speaking Community',
        country: celebration.countries.join(', '),
        countries: celebration.countries,
        flagEmoji: celebration.flagEmoji || '🎉',
        tags: celebration.traditionalElements || [],
        featured: true,
        isRecurring: true,
        recurrencePattern: 'Annual',
        culturalAuthenticity: 95,
        accessibility: {
          wheelchairAccessible: true,
          signLanguage: false,
          audioDescription: false
        }
      })
    })
    
    return events
  }, [])

  // Generate university events from configuration
  const generateUniversityEvents = useCallback((): CalendarEvent[] => {
    const events: CalendarEvent[] = []
    const currentYear = new Date().getFullYear()
    
    UNIVERSITY_EVENTS.forEach(uniEvent => {
      // Create events for current and next year
      [currentYear, currentYear + 1].forEach(year => {
        const eventDate = new Date(uniEvent.date.replace('2025', year.toString()))
        
        events.push({
          id: `${uniEvent.id}-${year}`,
          title: uniEvent.title.en,
          titlePortuguese: uniEvent.title.pt,
          date: eventDate,
          time: uniEvent.time,
          endTime: '22:00', // Default end time
          type: 'university',
          category: uniEvent.type,
          location: uniEvent.location,
          venue: uniEvent.university,
          description: uniEvent.description.en,
          descriptionPortuguese: uniEvent.description.pt,
          organizer: 'LusoTown University Network',
          contactEmail: 'students@lusotown.com',
          country: 'United Kingdom',
          flagEmoji: '🎓',
          tags: ['networking', 'students', 'education', 'community'],
          featured: false,
          isRecurring: uniEvent.isRecurring,
          recurrencePattern: uniEvent.isRecurring ? 'Annual' : undefined,
          culturalAuthenticity: 85,
          capacity: uniEvent.capacity,
          accessibility: {
            wheelchairAccessible: true,
            signLanguage: true,
            audioDescription: false
          }
        })
      })
    })
    
    return events
  }, [])

  // Initialize events
  useEffect(() => {
    const initializeEvents = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const allEvents: CalendarEvent[] = []
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const startDate = new Date(currentYear, 0, 1) // January 1st
        const endDate = new Date(currentYear + 1, 11, 31) // December 31st next year
        
        // Generate recurring cultural events
        CULTURAL_EVENTS.forEach(culturalEvent => {
          if (culturalEvent.isActive) {
            const recurringEvents = generateRecurringEvents(culturalEvent, startDate, endDate)
            allEvents.push(...recurringEvents)
          }
        })
        
        // Generate celebration events for current and next year
        LUSOPHONE_CELEBRATIONS.forEach(celebration => {
          const thisYearEvents = generateCelebrationEvents(celebration, currentYear)
          const nextYearEvents = generateCelebrationEvents(celebration, currentYear + 1)
          allEvents.push(...thisYearEvents, ...nextYearEvents)
        })
        
        // Generate university events
        const universityEvents = generateUniversityEvents()
        allEvents.push(...universityEvents)
        
        // Sort events by date
        allEvents.sort((a, b) => a.date.getTime() - b.date.getTime())
        
        setEvents(allEvents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    
    initializeEvents()
  }, [generateRecurringEvents, generateCelebrationEvents, generateUniversityEvents])

  // Memoized computed values
  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter(event => event.date >= now)
      .slice(0, 10)
  }, [events])

  const featuredEvents = useMemo(() => {
    return events
      .filter(event => event.featured)
      .sort((a, b) => (b.culturalAuthenticity || 0) - (a.culturalAuthenticity || 0))
  }, [events])

  // Helper functions
  const getEventsByMonth = useCallback((year: number, month: number): CalendarEvent[] => {
    return events.filter(event => 
      event.date.getFullYear() === year && 
      event.date.getMonth() === month
    )
  }, [events])

  const getEventsByType = useCallback((type: string): CalendarEvent[] => {
    return events.filter(event => 
      event.type === type || event.category === type
    )
  }, [events])

  const getEventsByCountry = useCallback((country: string): CalendarEvent[] => {
    return events.filter(event => 
      event.country.toLowerCase().includes(country.toLowerCase()) ||
      (event.countries && event.countries.some(c => c.toLowerCase().includes(country.toLowerCase())))
    )
  }, [events])

  const getEventById = useCallback((id: string): CalendarEvent | null => {
    return events.find(event => event.id === id) || null
  }, [events])

  const searchEvents = useCallback((query: string): CalendarEvent[] => {
    if (!query.trim()) return events
    
    const searchTerm = query.toLowerCase()
    return events.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.titlePortuguese.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.descriptionPortuguese.toLowerCase().includes(searchTerm) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.venue.toLowerCase().includes(searchTerm)
    )
  }, [events])

  const filterEvents = useCallback((filters: EventFilters): CalendarEvent[] => {
    return events.filter(event => {
      // Type filter
      if (filters.type && event.type !== filters.type) {
        return false
      }
      
      // Category filter
      if (filters.category && event.category !== filters.category) {
        return false
      }
      
      // Country filter
      if (filters.country && !event.country.toLowerCase().includes(filters.country.toLowerCase())) {
        return false
      }
      
      // Date range filter
      if (filters.dateRange) {
        if (event.date < filters.dateRange.start || event.date > filters.dateRange.end) {
          return false
        }
      }
      
      // Price range filter (basic implementation)
      if (filters.priceRange && event.price) {
        const priceMatch = event.price.match(/£?(\d+(?:\.\d+)?)/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1]);
          if (price < filters.priceRange.min || price > filters.priceRange.max) {
            return false;
          }
        }
      }
      
      // Location filter
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      
      // Featured filter
      if (filters.featured !== undefined && event.featured !== filters.featured) {
        return false
      }
      
      return true
    })
  }, [events])

  const getCulturalHolidays = useCallback((year: number, month: number): CalendarEvent[] => {
    return getEventsByMonth(year, month).filter(event => event.type === 'celebration')
  }, [getEventsByMonth])

  const getUniversityEvents = useCallback((): CalendarEvent[] => {
    return events.filter(event => event.type === 'university')
  }, [events])

  const contextValue: CulturalCalendarContextType = {
    events,
    upcomingEvents,
    featuredEvents,
    getEventsByMonth,
    getEventsByType,
    getEventsByCountry,
    getEventById,
    searchEvents,
    filterEvents,
    getCulturalHolidays,
    getUniversityEvents,
    loading,
    error
  }

  return (
    <CulturalCalendarContext.Provider value={contextValue}>
      {children}
    </CulturalCalendarContext.Provider>
  )
}

export function useCulturalCalendar() {
  const context = useContext(CulturalCalendarContext)
  if (context === undefined) {
    throw new Error('useCulturalCalendar must be used within a CulturalCalendarProvider')
  }
  return context
}