import { supabase } from '@/lib/supabase'

export interface CulturalEvent {
  id: string
  name: string
  description?: string
  cultural_significance?: string
  celebration_type: 'religious' | 'national' | 'regional' | 'traditional' | 'community'
  origin_region?: string
  date_type: 'fixed' | 'variable' | 'season'
  celebration_date?: string
  celebration_month?: number
  celebration_day?: number
  season?: string
  is_major_celebration: boolean
  london_participation_level: number // 1-5 scale
  typical_activities?: string[]
  food_traditions?: string[]
  music_traditions?: string[]
  recommended_venues?: string[]
  created_at: string
}

export interface CulturalEventSchedule {
  cultural_event: CulturalEvent
  next_date: string
  days_until: number
  london_events?: Array<{
    id: string
    title: string
    location?: string
    start_datetime: string
    venue_name?: string
  }>
}

export interface SeasonalCelebration {
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  celebrations: CulturalEvent[]
  current_season: boolean
  upcoming_events: Array<{
    name: string
    estimated_date: string
    significance: string
  }>
}

export interface PortugueseHoliday {
  name: string
  date: string
  type: 'national' | 'religious' | 'regional'
  description: string
  celebrated_in_uk: boolean
  typical_celebrations: string[]
  london_events_count: number
}

class CulturalCalendarService {
  private supabaseClient = supabase

  /**
   * Get all Portuguese cultural events
   */
  async getAllCulturalEvents(): Promise<CulturalEvent[]> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')
      .order('london_participation_level', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Get major Portuguese celebrations
   */
  async getMajorCelebrations(): Promise<CulturalEvent[]> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')
      .eq('is_major_celebration', true)
      .gte('london_participation_level', 3)
      .order('london_participation_level', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Get upcoming cultural celebrations with London events
   */
  async getUpcomingCelebrations(months: number = 3): Promise<CulturalEventSchedule[]> {
    const culturalEvents = await this.getAllCulturalEvents()
    const now = new Date()
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + months)

    const upcomingSchedule: CulturalEventSchedule[] = []

    for (const event of culturalEvents) {
      let nextDate: Date | null = null

      if (event.date_type === 'fixed' && event.celebration_date) {
        // Fixed date celebration
        const celebrationDate = new Date(event.celebration_date)
        const thisYear = new Date(now.getFullYear(), celebrationDate.getMonth(), celebrationDate.getDate())
        const nextYear = new Date(now.getFullYear() + 1, celebrationDate.getMonth(), celebrationDate.getDate())
        
        nextDate = thisYear >= now ? thisYear : nextYear
      } else if (event.date_type === 'variable' && event.celebration_month && event.celebration_day) {
        // Variable date (specific day of specific month)
        const thisYear = new Date(now.getFullYear(), event.celebration_month - 1, event.celebration_day)
        const nextYear = new Date(now.getFullYear() + 1, event.celebration_month - 1, event.celebration_day)
        
        nextDate = thisYear >= now ? thisYear : nextYear
      } else if (event.date_type === 'season' && event.season) {
        // Seasonal celebration - estimate middle of season
        const seasonMonths = {
          spring: 4, // April
          summer: 7, // July
          autumn: 10, // October
          winter: 1 // January (next year)
        }
        
        const month = seasonMonths[event.season as keyof typeof seasonMonths]
        nextDate = new Date(now.getFullYear(), month - 1, 15)
        if (nextDate < now) {
          nextDate.setFullYear(nextDate.getFullYear() + 1)
        }
      }

      if (nextDate && nextDate <= futureDate) {
        const daysUntil = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        // Get related London events
        const { data: londonEvents } = await this.supabaseClient
          .from('events')
          .select(`
            id,
            title,
            location,
            start_datetime,
            venue:portuguese_venues!partner_venue_id(name)
          `)
          .contains('tags', [event.name.toLowerCase()])
          .eq('status', 'active')
          .gte('start_datetime', now.toISOString())
          .lte('start_datetime', futureDate.toISOString())
          .limit(5)

        upcomingSchedule.push({
          cultural_event: event,
          next_date: nextDate.toISOString(),
          days_until: daysUntil,
          london_events: (londonEvents || []).map(evt => ({
            id: evt.id,
            title: evt.title,
            location: evt.location,
            start_datetime: evt.start_datetime,
            venue_name: (evt.venue as any)?.name || ''
          }))
        })
      }
    }

    // Sort by next occurrence date
    upcomingSchedule.sort((a, b) => new Date(a.next_date).getTime() - new Date(b.next_date).getTime())

    return upcomingSchedule
  }

  /**
   * Get celebrations by season
   */
  async getCelebrationsBySeason(): Promise<SeasonalCelebration[]> {
    const culturalEvents = await this.getAllCulturalEvents()
    const currentMonth = new Date().getMonth() + 1

    // Define seasons (Northern Hemisphere)
    const seasons = {
      spring: { months: [3, 4, 5], name: 'spring' as const },
      summer: { months: [6, 7, 8], name: 'summer' as const },
      autumn: { months: [9, 10, 11], name: 'autumn' as const },
      winter: { months: [12, 1, 2], name: 'winter' as const }
    }

    const getCurrentSeason = () => {
      for (const [season, config] of Object.entries(seasons)) {
        if (config.months.includes(currentMonth)) {
          return config.name
        }
      }
      return 'spring' as const
    }

    const currentSeason = getCurrentSeason()
    const seasonalCelebrations: SeasonalCelebration[] = []

    for (const [seasonName, seasonConfig] of Object.entries(seasons)) {
      const seasonEvents = culturalEvents.filter(event => {
        if (event.season === seasonConfig.name) return true
        if (event.celebration_month && seasonConfig.months.includes(event.celebration_month)) return true
        return false
      })

      // Estimate upcoming events for this season
      const upcomingEvents = seasonEvents.map(event => {
        let estimatedDate = ''
        if (event.celebration_month && event.celebration_day) {
          estimatedDate = `${event.celebration_month}/${event.celebration_day}`
        } else if (event.celebration_date) {
          estimatedDate = event.celebration_date
        } else {
          estimatedDate = `${seasonConfig.name} season`
        }

        return {
          name: event.name,
          estimated_date: estimatedDate,
          significance: event.cultural_significance || event.description || ''
        }
      })

      seasonalCelebrations.push({
        season: seasonConfig.name,
        celebrations: seasonEvents,
        current_season: currentSeason === seasonConfig.name,
        upcoming_events: upcomingEvents
      })
    }

    return seasonalCelebrations
  }

  /**
   * Get Portuguese national holidays
   */
  async getPortugueseHolidays(year?: number): Promise<PortugueseHoliday[]> {
    const targetYear = year || new Date().getFullYear()
    
    // Portuguese national holidays with fixed dates
    const fixedHolidays: PortugueseHoliday[] = [
      {
        name: 'New Year\'s Day',
        date: `${targetYear}-01-01`,
        type: 'national',
        description: 'Beginning of the new year',
        celebrated_in_uk: true,
        typical_celebrations: ['family gatherings', 'fireworks', 'traditional meals'],
        london_events_count: 0
      },
      {
        name: 'Carnival Tuesday',
        date: this.calculateCarnivalDate(targetYear),
        type: 'national',
        description: 'Portuguese Carnival celebrations',
        celebrated_in_uk: true,
        typical_celebrations: ['parades', 'costumes', 'street parties', 'traditional sweets'],
        london_events_count: 0
      },
      {
        name: 'Good Friday',
        date: this.calculateEasterDate(targetYear, -2),
        type: 'religious',
        description: 'Christian holy day commemorating crucifixion',
        celebrated_in_uk: true,
        typical_celebrations: ['religious services', 'processions', 'fasting'],
        london_events_count: 0
      },
      {
        name: 'Easter Sunday',
        date: this.calculateEasterDate(targetYear, 0),
        type: 'religious',
        description: 'Christian celebration of resurrection',
        celebrated_in_uk: true,
        typical_celebrations: ['family meals', 'traditional sweets', 'church services'],
        london_events_count: 0
      },
      {
        name: 'Liberation Day',
        date: `${targetYear}-04-25`,
        type: 'national',
        description: 'Carnation Revolution anniversary',
        celebrated_in_uk: true,
        typical_celebrations: ['cultural events', 'political commemorations', 'carnations'],
        london_events_count: 0
      },
      {
        name: 'Labour Day',
        date: `${targetYear}-05-01`,
        type: 'national',
        description: 'International Workers\' Day',
        celebrated_in_uk: false,
        typical_celebrations: ['rallies', 'demonstrations', 'family gatherings'],
        london_events_count: 0
      },
      {
        name: 'Portugal Day',
        date: `${targetYear}-06-10`,
        type: 'national',
        description: 'National Day of Portugal and Portuguese communities',
        celebrated_in_uk: true,
        typical_celebrations: ['cultural exhibitions', 'flag ceremonies', 'community events'],
        london_events_count: 0
      },
      {
        name: 'Corpus Christi',
        date: this.calculateEasterDate(targetYear, 60),
        type: 'religious',
        description: 'Catholic celebration of the Eucharist',
        celebrated_in_uk: true,
        typical_celebrations: ['processions', 'flower carpets', 'religious ceremonies'],
        london_events_count: 0
      },
      {
        name: 'Assumption of Mary',
        date: `${targetYear}-08-15`,
        type: 'religious',
        description: 'Catholic holy day celebrating Virgin Mary',
        celebrated_in_uk: true,
        typical_celebrations: ['religious processions', 'pilgrimages', 'traditional festivals'],
        london_events_count: 0
      },
      {
        name: 'Republic Day',
        date: `${targetYear}-10-05`,
        type: 'national',
        description: 'Proclamation of the Portuguese Republic',
        celebrated_in_uk: false,
        typical_celebrations: ['official ceremonies', 'cultural events'],
        london_events_count: 0
      },
      {
        name: 'All Saints\' Day',
        date: `${targetYear}-11-01`,
        type: 'religious',
        description: 'Catholic holy day honoring saints',
        celebrated_in_uk: true,
        typical_celebrations: ['cemetery visits', 'prayers for the dead', 'family gatherings'],
        london_events_count: 0
      },
      {
        name: 'Restoration of Independence',
        date: `${targetYear}-12-01`,
        type: 'national',
        description: 'End of Iberian Union (1640)',
        celebrated_in_uk: false,
        typical_celebrations: ['historical commemorations', 'cultural events'],
        london_events_count: 0
      },
      {
        name: 'Immaculate Conception',
        date: `${targetYear}-12-08`,
        type: 'religious',
        description: 'Catholic celebration of Virgin Mary',
        celebrated_in_uk: true,
        typical_celebrations: ['religious services', 'nativity preparations'],
        london_events_count: 0
      },
      {
        name: 'Christmas Day',
        date: `${targetYear}-12-25`,
        type: 'religious',
        description: 'Christian celebration of Jesus\' birth',
        celebrated_in_uk: true,
        typical_celebrations: ['family reunions', 'midnight mass', 'traditional meals', 'gift giving'],
        london_events_count: 0
      }
    ]

    // Get event counts for each holiday from database
    for (const holiday of fixedHolidays) {
      const { count } = await this.supabaseClient
        .from('events')
        .select('*', { count: 'exact', head: true })
        .contains('tags', [holiday.name.toLowerCase()])
        .eq('status', 'active')

      holiday.london_events_count = count || 0
    }

    return fixedHolidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  /**
   * Get cultural events by origin region
   */
  async getCulturalEventsByRegion(region: string): Promise<CulturalEvent[]> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')
      .eq('origin_region', region)
      .order('london_participation_level', { ascending: false })

    if (error) throw error
    return data || []
  }

  /**
   * Get events happening this month
   */
  async getThisMonthsCelebrations(): Promise<CulturalEventSchedule[]> {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    
    return this.getUpcomingCelebrations(1)
  }

  /**
   * Search cultural events by name or type
   */
  async searchCulturalEvents(query: string, filters?: {
    celebration_type?: string
    origin_region?: string
    major_only?: boolean
  }): Promise<CulturalEvent[]> {
    let supabaseQuery = this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')

    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (filters?.celebration_type) {
      supabaseQuery = supabaseQuery.eq('celebration_type', filters.celebration_type)
    }

    if (filters?.origin_region) {
      supabaseQuery = supabaseQuery.eq('origin_region', filters.origin_region)
    }

    if (filters?.major_only) {
      supabaseQuery = supabaseQuery.eq('is_major_celebration', true)
    }

    supabaseQuery = supabaseQuery.order('london_participation_level', { ascending: false })

    const { data, error } = await supabaseQuery

    if (error) throw error
    return data || []
  }

  /**
   * Get cultural celebration details by ID
   */
  async getCulturalEventById(eventId: string): Promise<CulturalEvent | null> {
    const { data, error } = await this.supabaseClient
      .from('portuguese_cultural_calendar')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data
  }

  /**
   * Helper function to calculate Easter date
   */
  private calculateEasterDate(year: number, daysOffset: number = 0): string {
    // Using anonymous Gregorian algorithm
    const a = year % 19
    const b = Math.floor(year / 100)
    const c = year % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n = Math.floor((h + l - 7 * m + 114) / 31)
    const p = (h + l - 7 * m + 114) % 31

    const easterDate = new Date(year, n - 1, p + 1)
    easterDate.setDate(easterDate.getDate() + daysOffset)

    return easterDate.toISOString().split('T')[0]
  }

  /**
   * Helper function to calculate Carnival date (47 days before Easter)
   */
  private calculateCarnivalDate(year: number): string {
    return this.calculateEasterDate(year, -47)
  }
}

export const culturalCalendarService = new CulturalCalendarService()