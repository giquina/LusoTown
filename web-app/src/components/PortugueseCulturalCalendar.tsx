'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useAriaAnnouncements, ARIA_MESSAGES } from '@/hooks/useAriaAnnouncements'
import { useFocusIndicator } from '@/hooks/useFocusManagement'
import { 
  CalendarDaysIcon,
  BellIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  GlobeAltIcon,
  SparklesIcon,
  FlagIcon,
  MusicalNoteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  EyeIcon,
  ArrowPathIcon,
  CalendarIcon,
  PlayIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import RecurringEventCreator from './RecurringEventCreator'
import { 
  PORTUGUESE_CULTURAL_CALENDAR,
  getUpcomingCulturalCelebrations,
  RECURRING_EVENT_TEMPLATES,
  getFeaturedRecurringTemplates
} from '@/config/recurring-events'

interface CulturalEvent {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  culturalSignificanceEn: string
  culturalSignificancePt: string
  celebrationType: 'religious' | 'national' | 'regional' | 'traditional' | 'community' | 'seasonal'
  originRegion: 'mainland_portugal' | 'azores' | 'madeira' | 'brazil' | 'diaspora' | 'all_regions'
  dateType: 'fixed' | 'variable' | 'seasonal'
  celebrationDate?: string
  celebrationMonth?: number
  celebrationDay?: number
  season?: 'spring' | 'summer' | 'autumn' | 'winter'
  isMajorCelebration: boolean
  londonParticipationLevel: number // 1-5
  typicalActivities: string[]
  foodTraditions: string[]
  musicTraditions: string[]
  recommendedVenues: string[]
  londonEvents?: LondonCulturalEvent[]
  historicalBackground: string
  modernAdaptations: string[]
  familyFriendly: boolean
  religiousSignificance?: string
  emoji: string
  color: string
  isUserFavorite: boolean
  reminderSet: boolean
}

interface LondonCulturalEvent {
  id: string
  culturalEventId: string
  name: string
  date: string
  time: string
  venue: string
  organizer: string
  ticketPrice: number
  maxAttendees: number
  currentAttendees: number
  authenticity: number
  website?: string
  bookingRequired: boolean
  isAuthentic: boolean
}

interface CulturalHoliday {
  id: string
  name: string
  date: string
  type: 'portugal' | 'brazil' | 'diaspora'
  isPublicHoliday: boolean
  significance: string
  celebrations: string[]
}

export default function PortugueseCulturalCalendar() {
  const { t, language } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline' | 'regions' | 'recurring'>('calendar')
  const [culturalEvents, setCulturalEvents] = useState<CulturalEvent[]>([])
  const [showRecurringCreator, setShowRecurringCreator] = useState(false)
  const [upcomingCelebrations, setUpcomingCelebrations] = useState(getUpcomingCulturalCelebrations(90))
  const [recurringTemplates] = useState(getFeaturedRecurringTemplates())
  const [filters, setFilters] = useState({
    celebrationType: '',
    originRegion: '',
    participationLevel: '',
    isFavorite: false
  })

  // ARIA and Focus Management
  const { announcePolite } = useAriaAnnouncements()
  const { addFocusClasses } = useFocusIndicator()

  // Lusophone cultural calendar data
  useEffect(() => {
    setCulturalEvents([
      {
        id: '1',
        nameEn: 'Portugal Day',
        namePt: 'Dia de Portugal',
        descriptionEn: 'National Day celebrating Portuguese language, culture and communities worldwide',
        descriptionPt: 'Dia Nacional celebrando a língua, cultura e comunidades portuguesas pelo mundo',
        culturalSignificanceEn: 'Celebrates Lusophone identity, language, and the global Lusophone diaspora community',
        culturalSignificancePt: 'Celebra a identidade portuguesa, a língua e a comunidade da diáspora portuguesa mundial',
        celebrationType: 'national',
        originRegion: 'mainland_portugal',
        dateType: 'fixed',
        celebrationDate: '2025-06-10',
        isMajorCelebration: true,
        londonParticipationLevel: 5,
        typicalActivities: ['flag ceremonies', 'cultural exhibitions', 'poetry readings', 'community gatherings', 'traditional food fairs'],
        foodTraditions: ['francesinha', 'pastéis de nata', 'chouriço', 'queijo da serra', 'vinho do porto'],
        musicTraditions: ['fado music', 'hymn performances', 'traditional folk songs'],
        recommendedVenues: ['Lusophone Cultural Centre', 'Camões Square', 'Lusophone Embassy'],
        londonEvents: [
          {
            id: '1',
            culturalEventId: '1',
            name: 'Portugal Day Celebration London 2025',
            date: '2025-06-10',
            time: '14:00',
            venue: 'Lusophone Cultural Centre',
            organizer: 'Lusophone Embassy London',
            ticketPrice: 0,
            maxAttendees: 500,
            currentAttendees: 0,
            authenticity: 95,
            bookingRequired: false,
            isAuthentic: true
          }
        ],
        historicalBackground: 'Celebrated since 1580, commemorating Luís de Camões and Lusophone literary heritage',
        modernAdaptations: ['social media campaigns', 'virtual celebrations', 'international broadcasts'],
        familyFriendly: true,
        emoji: '🇵🇹',
        color: 'from-green-600 to-red-600',
        isUserFavorite: false,
        reminderSet: false
      },
      {
        id: '2',
        nameEn: 'Santos Populares',
        namePt: 'Santos Populares',
        descriptionEn: 'Popular Saints festivals celebrating Saint Anthony, Saint John, and Saint Peter',
        descriptionPt: 'Festas dos Santos Populares celebrando Santo António, São João e São Pedro',
        culturalSignificanceEn: 'Major summer festivities marking Lusophone cultural identity and community gathering',
        culturalSignificancePt: 'Grandes festividades de verão marcando a identidade cultural portuguesa e reunião comunitária',
        celebrationType: 'traditional',
        originRegion: 'mainland_portugal',
        dateType: 'fixed',
        celebrationDate: '2025-06-13',
        isMajorCelebration: true,
        londonParticipationLevel: 5,
        typicalActivities: ['street parties', 'grilled sardines', 'traditional dances', 'manjerico basil gifts', 'paper lanterns'],
        foodTraditions: ['grilled sardines', 'caldo verde', 'bifana', 'vinho verde', 'broa de milho'],
        musicTraditions: ['marchas populares', 'traditional folk music', 'accordion music'],
        recommendedVenues: ['Kennington Park', 'Portuguese restaurants', 'Community centers'],
        londonEvents: [
          {
            id: '2',
            culturalEventId: '2',
            name: 'London Santos Populares Festival',
            date: '2025-06-13',
            time: '18:00',
            venue: 'Kennington Park',
            organizer: 'Lusophone Association London',
            ticketPrice: 15,
            maxAttendees: 600,
            currentAttendees: 0,
            authenticity: 92,
            bookingRequired: true,
            isAuthentic: true
          }
        ],
        historicalBackground: 'Ancient festivals honoring popular saints, particularly strong in Lisbon and Porto traditions',
        modernAdaptations: ['park venues in London', 'electric grills for safety', 'fusion music performances'],
        familyFriendly: true,
        emoji: '🎉',
        color: 'from-yellow-500 to-red-500',
        isUserFavorite: true,
        reminderSet: true
      },
      {
        id: '3',
        nameEn: 'Festa do Divino Espírito Santo',
        namePt: 'Festa do Divino Espírito Santo',
        descriptionEn: 'Azorean Holy Spirit Festival with traditional crown ceremonies and community meals',
        descriptionPt: 'Festa açoriana do Divino Espírito Santo com cerimônias da coroa e refeições comunitárias',
        culturalSignificanceEn: 'Central to Azorean identity, emphasizing community solidarity and religious devotion',
        culturalSignificancePt: 'Central à identidade açoriana, enfatizando solidariedade comunitária e devoção religiosa',
        celebrationType: 'religious',
        originRegion: 'azores',
        dateType: 'variable',
        celebrationMonth: 5,
        season: 'spring',
        isMajorCelebration: true,
        londonParticipationLevel: 4,
        typicalActivities: ['crown processions', 'sopas do espírito santo', 'community meals', 'religious ceremonies'],
        foodTraditions: ['sopas', 'massa sovada', 'linguiça', 'traditional bread', 'sweet rice'],
        musicTraditions: ['religious hymns', 'traditional Azorean folk music', 'community singing'],
        recommendedVenues: ['Azorean Community Centre', 'Lusophone churches', 'Community halls'],
        londonEvents: [
          {
            id: '3',
            culturalEventId: '3',
            name: 'Azorean Divine Holy Spirit Festival London',
            date: '2025-05-25',
            time: '12:00',
            venue: 'Lusophone Cultural Centre',
            organizer: 'Azorean Association London',
            ticketPrice: 10,
            maxAttendees: 200,
            currentAttendees: 0,
            authenticity: 98,
            bookingRequired: true,
            isAuthentic: true
          }
        ],
        historicalBackground: 'Medieval origins from Queen Isabel\'s charitable works, brought to Azores by settlers',
        modernAdaptations: ['adapted venues', 'community kitchens', 'interfaith participation'],
        familyFriendly: true,
        religiousSignificance: 'Honors the Holy Spirit through acts of charity and community sharing',
        emoji: '👑',
        color: 'from-red-600 to-purple-600',
        isUserFavorite: false,
        reminderSet: false
      },
      {
        id: '4',
        nameEn: 'Festa da Flor',
        namePt: 'Festa da Flor',
        descriptionEn: 'Madeiran Flower Festival celebrating spring and floral traditions',
        descriptionPt: 'Festa da Flor madeirense celebrando a primavera e tradições florais',
        culturalSignificanceEn: 'Celebrates Madeira\'s natural beauty and the island\'s connection to nature',
        culturalSignificancePt: 'Celebra a beleza natural da Madeira e a conexão da ilha com a natureza',
        celebrationType: 'regional',
        originRegion: 'madeira',
        dateType: 'variable',
        celebrationMonth: 4,
        season: 'spring',
        isMajorCelebration: false,
        londonParticipationLevel: 3,
        typicalActivities: ['flower carpets', 'children\'s parade', 'flower arrangements', 'garden exhibitions'],
        foodTraditions: ['bolo do caco', 'espada fish', 'poncha', 'honey cake', 'tropical fruits'],
        musicTraditions: ['Madeiran folk music', 'traditional dances', 'children\'s songs'],
        recommendedVenues: ['London parks', 'Botanical gardens', 'Lusophone venues'],
        londonEvents: [],
        historicalBackground: 'Started in 1979 to celebrate Madeira\'s year-round spring-like climate and flowers',
        modernAdaptations: ['indoor flower displays', 'community garden projects', 'children\'s workshops'],
        familyFriendly: true,
        emoji: '🌺',
        color: 'from-pink-500 to-green-500',
        isUserFavorite: false,
        reminderSet: false
      },
      {
        id: '5',
        nameEn: 'Lusophone Christmas',
        namePt: 'Natal Português',
        descriptionEn: 'Traditional Lusophone Christmas celebrated on December 24th with Consoada dinner',
        descriptionPt: 'Natal tradicional português celebrado a 24 de dezembro com ceia da Consoada',
        culturalSignificanceEn: 'Central family celebration emphasizing togetherness, tradition, and religious observance',
        culturalSignificancePt: 'Celebração familiar central enfatizando união, tradição e observância religiosa',
        celebrationType: 'religious',
        originRegion: 'all_regions',
        dateType: 'fixed',
        celebrationDate: '2024-12-24',
        isMajorCelebration: true,
        londonParticipationLevel: 5,
        typicalActivities: ['consoada dinner', 'midnight mass', 'gift exchange', 'family gatherings', 'carol singing'],
        foodTraditions: ['bacalhau', 'rabanadas', 'filhós', 'bolo rei', 'vinho do porto'],
        musicTraditions: ['Lusophone carols', 'janeiras', 'traditional hymns'],
        recommendedVenues: ['Portuguese restaurants', 'Lusophone churches', 'Family homes'],
        londonEvents: [
          {
            id: '4',
            culturalEventId: '5',
            name: 'Lusophone Christmas Celebration London',
            date: '2024-12-24',
            time: '19:00',
            venue: 'Lusophone Cultural Centre',
            organizer: 'Portuguese-speaking community London',
            ticketPrice: 25,
            maxAttendees: 150,
            currentAttendees: 0,
            authenticity: 90,
            bookingRequired: true,
            isAuthentic: true
          }
        ],
        historicalBackground: 'Combines Christian traditions with Lusophone cultural customs dating back centuries',
        modernAdaptations: ['community dinners for diaspora', 'video calls with family', 'multicultural celebrations'],
        familyFriendly: true,
        religiousSignificance: 'Celebrates the birth of Christ with emphasis on family unity and charity',
        emoji: '🎄',
        color: 'from-green-600 to-red-600',
        isUserFavorite: true,
        reminderSet: true
      },
      {
        id: '6',
        nameEn: 'Carnaval',
        namePt: 'Carnaval',
        descriptionEn: 'Lusophone Carnival celebrations with regional variations and community festivities',
        descriptionPt: 'Celebrações de Carnaval português com variações regionais e festividades comunitárias',
        culturalSignificanceEn: 'Pre-Lenten celebration expressing joy, creativity, and community bonding',
        culturalSignificancePt: 'Celebração pré-quaresmal expressando alegria, criatividade e união comunitária',
        celebrationType: 'traditional',
        originRegion: 'all_regions',
        dateType: 'variable',
        celebrationMonth: 2,
        season: 'winter',
        isMajorCelebration: true,
        londonParticipationLevel: 4,
        typicalActivities: ['costume parades', 'mask making', 'dancing', 'music performances', 'street celebrations'],
        foodTraditions: ['malasadas', 'filhós', 'chouriça doce', 'traditional sweets', 'carnival cakes'],
        musicTraditions: ['carnival songs', 'folk music', 'percussion ensembles'],
        recommendedVenues: ['Community centers', 'Dance halls', 'Cultural venues'],
        londonEvents: [
          {
            id: '5',
            culturalEventId: '6',
            name: 'Lusophone Carnaval London 2025',
            date: '2025-03-01',
            time: '19:00',
            venue: 'Stockwell Community Centre',
            organizer: 'Luso-Brazilian Cultural Association',
            ticketPrice: 20,
            maxAttendees: 300,
            currentAttendees: 0,
            authenticity: 85,
            bookingRequired: true,
            isAuthentic: true
          }
        ],
        historicalBackground: 'Medieval origins with influences from both Lusophone and Brazilian traditions',
        modernAdaptations: ['indoor celebrations', 'multicultural influences', 'family-friendly timing'],
        familyFriendly: true,
        emoji: '🎭',
        color: 'from-purple-500 to-pink-500',
        isUserFavorite: false,
        reminderSet: false
      }
    ])
  }, [])

  const celebrationTypes = [
    { key: 'religious', nameEn: 'Religious', namePt: 'Religiosas', color: 'bg-purple-100 text-purple-700', icon: '⛪' },
    { key: 'national', nameEn: 'National', namePt: 'Nacionais', color: 'bg-green-100 text-green-700', icon: '🇵🇹' },
    { key: 'regional', nameEn: 'Regional', namePt: 'Regionais', color: 'bg-blue-100 text-blue-700', icon: '🏝️' },
    { key: 'traditional', nameEn: 'Traditional', namePt: 'Tradicionais', color: 'bg-yellow-100 text-yellow-700', icon: '🎉' },
    { key: 'community', nameEn: 'Community', namePt: 'Comunitárias', color: 'bg-pink-100 text-pink-700', icon: '👥' },
    { key: 'seasonal', nameEn: 'Seasonal', namePt: 'Sazonais', color: 'bg-orange-100 text-orange-700', icon: '🌸' }
  ]

  const originRegions = [
    { key: 'mainland_portugal', nameEn: 'Mainland Portugal', namePt: 'Portugal Continental', flag: '🇵🇹' },
    { key: 'azores', nameEn: 'Azores', namePt: 'Açores', flag: '🏝️' },
    { key: 'madeira', nameEn: 'Madeira', namePt: 'Madeira', flag: '🌺' },
    { key: 'brazil', nameEn: 'Brazil', namePt: 'Brasil', flag: '🇧🇷' },
    { key: 'diaspora', nameEn: 'Diaspora', namePt: 'Diáspora', flag: '🌍' },
    { key: 'all_regions', nameEn: 'All Regions', namePt: 'Todas as Regiões', flag: '🌐' }
  ]

  const getEventsForMonth = (date: Date) => {
    return culturalEvents.filter(event => {
      if (event.dateType === 'fixed' && event.celebrationDate) {
        const eventDate = new Date(event.celebrationDate)
        return eventDate.getMonth() === date.getMonth()
      }
      if (event.dateType === 'variable' && event.celebrationMonth) {
        return event.celebrationMonth - 1 === date.getMonth()
      }
      return false
    })
  }

  const toggleFavorite = (eventId: string) => {
    setCulturalEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const newFavoriteState = !event.isUserFavorite
          // Announce change to screen readers
          const message = newFavoriteState 
            ? ARIA_MESSAGES.events.favoriteAdded 
            : ARIA_MESSAGES.events.favoriteRemoved
          announcePolite(message)
          return { ...event, isUserFavorite: newFavoriteState }
        }
        return event
      })
    )
  }

  const toggleReminder = (eventId: string) => {
    setCulturalEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const newReminderState = !event.reminderSet
          if (newReminderState) {
            announcePolite(ARIA_MESSAGES.events.reminderSet)
          }
          return { ...event, reminderSet: newReminderState }
        }
        return event
      })
    )
  }

  const filteredEvents = culturalEvents.filter(event => {
    if (filters.celebrationType && event.celebrationType !== filters.celebrationType) return false
    if (filters.originRegion && event.originRegion !== filters.originRegion) return false
    if (filters.participationLevel && event.londonParticipationLevel < parseInt(filters.participationLevel)) return false
    if (filters.isFavorite && !event.isUserFavorite) return false
    return true
  })

  const renderCalendarView = () => {
    const monthEvents = getEventsForMonth(currentDate)
    
    return (
      <div className="space-y-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              {currentDate.toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
            <p className="text-gray-600">
              {monthEvents.length} {t('calendar.cultural_events', 'cultural events')}
            </p>
          </div>
          
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Events for Selected Month */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {monthEvents.map((event) => {
            const typeInfo = celebrationTypes.find(t => t.key === event.celebrationType)
            const regionInfo = originRegions.find(r => r.key === event.originRegion)
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 cursor-pointer transform transition-all hover:shadow-2xl"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Event Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{event.emoji}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {language === 'pt' ? event.namePt : event.nameEn}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {regionInfo && (
                          <span className="text-sm text-gray-600">{regionInfo.flag}</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo?.color}`}>
                          {language === 'pt' ? typeInfo?.namePt : typeInfo?.nameEn}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(event.id)
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        event.isUserFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      {event.isUserFavorite ? <HeartSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleReminder(event.id)
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        event.reminderSet ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                      }`}
                    >
                      <BellIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Event Date */}
                <div className="mb-4">
                  {event.dateType === 'fixed' && event.celebrationDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDaysIcon className="w-5 h-5 text-secondary-500" />
                      <span className="font-semibold">
                        {new Date(event.celebrationDate).toLocaleDateString(
                          language === 'pt' ? 'pt-PT' : 'en-GB',
                          { weekday: 'long', month: 'long', day: 'numeric' }
                        )}
                      </span>
                    </div>
                  )}
                  {event.dateType === 'variable' && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDaysIcon className="w-5 h-5 text-secondary-500" />
                      <span className="font-semibold">
                        {t('calendar.variable_date', 'Variable date in')} {
                          event.celebrationMonth ? 
                          new Date(2025, event.celebrationMonth - 1).toLocaleDateString(
                            language === 'pt' ? 'pt-PT' : 'en-GB', { month: 'long' }
                          ) : event.season
                        }
                      </span>
                    </div>
                  )}
                </div>

                {/* Cultural Significance */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {language === 'pt' ? event.culturalSignificancePt : event.culturalSignificanceEn}
                </p>

                {/* London Participation Level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-secondary-500" />
                    <span className="text-sm text-gray-600">{t('calendar.london_celebration', 'London Celebration')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarSolid
                        key={i}
                        className={`w-4 h-4 ${
                          i < event.londonParticipationLevel ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Traditional Elements Preview */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {event.typicalActivities.slice(0, 3).map((activity) => (
                      <span
                        key={activity}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                      >
                        {activity}
                      </span>
                    ))}
                    {event.typicalActivities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{event.typicalActivities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* London Events */}
                {event.londonEvents && event.londonEvents.length > 0 && (
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <EyeIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">
                        {event.londonEvents.length} {t('calendar.london_events', 'London events planned')}
                      </span>
                    </div>
                    <p className="text-xs text-green-700">
                      {t('calendar.next_event', 'Next')}: {event.londonEvents[0].name}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {monthEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('calendar.no_events', 'No Cultural Events This Month')}
            </h3>
            <p className="text-gray-600">
              {t('calendar.check_other_months', 'Check other months or explore different celebration types')}
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderTimelineView = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('calendar.timeline.title', 'Lusophone Cultural Year Timeline')}
        </h3>
        <p className="text-gray-600">
          {t('calendar.timeline.subtitle', 'Follow the rhythm of Portuguese celebrations throughout the year')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary-500 to-accent-500 rounded-full"></div>
        
        <div className="space-y-8">
          {filteredEvents.sort((a, b) => {
            const aMonth = a.celebrationMonth || (a.celebrationDate ? new Date(a.celebrationDate).getMonth() + 1 : 12)
            const bMonth = b.celebrationMonth || (b.celebrationDate ? new Date(b.celebrationDate).getMonth() + 1 : 12)
            return aMonth - bMonth
          }).map((event, index) => {
            const typeInfo = celebrationTypes.find(t => t.key === event.celebrationType)
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-6 w-5 h-5 bg-white border-4 border-secondary-500 rounded-full"></div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{event.emoji}</div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {language === 'pt' ? event.namePt : event.nameEn}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {event.celebrationDate ? 
                            new Date(event.celebrationDate).toLocaleDateString(
                              language === 'pt' ? 'pt-PT' : 'en-GB', 
                              { month: 'long', day: 'numeric' }
                            ) :
                            event.celebrationMonth ?
                            new Date(2025, event.celebrationMonth - 1).toLocaleDateString(
                              language === 'pt' ? 'pt-PT' : 'en-GB', { month: 'long' }
                            ) : event.season
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo?.color}`}>
                        {typeInfo?.icon} {language === 'pt' ? typeInfo?.namePt : typeInfo?.nameEn}
                      </span>
                      {event.isMajorCelebration && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          ⭐ {t('calendar.major', 'Major')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {language === 'pt' ? event.culturalSignificancePt : event.culturalSignificanceEn}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('calendar.activities', 'Traditional Activities')}
                      </h5>
                      <ul className="space-y-1">
                        {event.typicalActivities.slice(0, 3).map((activity) => (
                          <li key={activity} className="text-gray-600">• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('calendar.foods', 'Traditional Foods')}
                      </h5>
                      <ul className="space-y-1">
                        {event.foodTraditions.slice(0, 3).map((food) => (
                          <li key={food} className="text-gray-600">• {food}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {t('calendar.music', 'Traditional Music')}
                      </h5>
                      <ul className="space-y-1">
                        {event.musicTraditions.slice(0, 3).map((music) => (
                          <li key={music} className="text-gray-600">• {music}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {event.londonEvents && event.londonEvents.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-xl">
                      <p className="text-sm font-semibold text-green-800 mb-1">
                        {t('calendar.london_celebration_available', 'London Celebration Available')}
                      </p>
                      <p className="text-xs text-green-700">
                        {event.londonEvents[0].name} - {event.londonEvents[0].venue}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderRegionsView = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('calendar.regions.title', 'Cultural Celebrations by Lusophone Region')}
        </h3>
        <p className="text-gray-600">
          {t('calendar.regions.subtitle', 'Explore the unique cultural traditions from each Lusophone region celebrated in London')}
        </p>
      </div>

      {originRegions.filter(region => region.key !== 'all_regions').map((region) => {
        const regionEvents = filteredEvents.filter(event => event.originRegion === region.key)
        
        return (
          <motion.div
            key={region.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{region.flag}</div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  {language === 'pt' ? region.namePt : region.nameEn}
                </h4>
                <p className="text-gray-600">
                  {regionEvents.length} {t('calendar.celebrations', 'celebrations')}
                </p>
              </div>
            </div>

            {regionEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{event.emoji}</div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {language === 'pt' ? event.namePt : event.nameEn}
                        </h5>
                        <p className="text-xs text-gray-600">
                          {event.celebrationDate ? 
                            new Date(event.celebrationDate).toLocaleDateString(
                              language === 'pt' ? 'pt-PT' : 'en-GB', { month: 'short', day: 'numeric' }
                            ) : 
                            t('calendar.variable', 'Variable date')
                          }
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {language === 'pt' ? event.descriptionPt : event.descriptionEn}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid
                            key={i}
                            className={`w-3 h-3 ${
                              i < event.londonParticipationLevel ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      {event.isMajorCelebration && (
                        <span className="text-xs font-medium text-yellow-600">
                          ⭐ {t('calendar.major', 'Major')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {t('calendar.no_regional_events', 'No events from this region match your current filters')}
                </p>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )

  const renderRecurringEventsView = () => (
    <div className="space-y-8">
      {/* Header with Create Button */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2">
              {language === 'pt' ? 'Eventos Culturais Recorrentes' : 'Recurring Cultural Events'}
            </h3>
            <p className="text-white/90 text-lg">
              {language === 'pt' 
                ? 'Crie e gerencie séries de eventos portugueses autênticos'
                : 'Create and manage authentic Portuguese event series'}
            </p>
          </div>
          <button
            onClick={() => setShowRecurringCreator(true)}
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            {language === 'pt' ? 'Criar Série' : 'Create Series'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {recurringTemplates.length}
          </div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Modelos Disponíveis' : 'Available Templates'}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {upcomingCelebrations.length}
          </div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Próximas Celebrações' : 'Upcoming Celebrations'}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-1">8</div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Países Representados' : 'Countries Represented'}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-amber-600 mb-1">12</div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Eventos Mensais' : 'Monthly Events'}
          </div>
        </div>
      </div>

      {/* Upcoming Cultural Celebrations */}
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <SparklesIcon className="w-6 h-6 text-amber-500" />
          <h4 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Próximas Celebrações Culturais' : 'Upcoming Cultural Celebrations'}
          </h4>
        </div>
        
        <div className="space-y-4">
          {upcomingCelebrations.slice(0, 5).map((celebration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h5 className="font-bold text-amber-900">
                    {language === 'pt' ? celebration.celebration.name.pt : celebration.celebration.name.en}
                  </h5>
                  <p className="text-sm text-amber-700">
                    {new Date(celebration.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    {language === 'pt' ? celebration.celebration.significance.pt : celebration.celebration.significance.en}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-amber-700 mb-1">
                  {celebration.suggestedTemplates.length} {language === 'pt' ? 'modelos sugeridos' : 'suggested templates'}
                </div>
                {celebration.suggestedTemplates.length > 0 && (
                  <button
                    onClick={() => {
                      setShowRecurringCreator(true);
                      // Pre-select first suggested template
                    }}
                    className="bg-amber-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-amber-600 transition-colors"
                  >
                    {language === 'pt' ? 'Criar Evento' : 'Create Event'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Recurring Templates */}
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ArrowPathIcon className="w-6 h-6 text-primary-500" />
            <h4 className="text-2xl font-bold text-gray-900">
              {language === 'pt' ? 'Modelos de Eventos em Destaque' : 'Featured Event Templates'}
            </h4>
          </div>
          <button
            onClick={() => setViewMode('calendar')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
          >
            <EyeIcon className="w-4 h-4" />
            {language === 'pt' ? 'Ver Todos' : 'View All'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recurringTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setShowRecurringCreator(true)}
            >
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.flagEmojis}</span>
                  <div>
                    <h5 className="text-white font-bold">
                      {language === 'pt' ? template.name.pt : template.name.en}
                    </h5>
                    <p className="text-white/80 text-sm">
                      {template.culturalOrigin.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {language === 'pt' ? template.description.pt : template.description.en}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarIcon className="w-3 h-3" />
                    <span>
                      {template.pattern.type === 'weekly' ? 
                        (language === 'pt' ? 'Semanal' : 'Weekly') :
                      template.pattern.type === 'monthly' ?
                        (language === 'pt' ? 'Mensal' : 'Monthly') :
                        (language === 'pt' ? 'Personalizado' : 'Custom')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ClockIcon className="w-3 h-3" />
                    <span>{Math.floor(template.eventDefaults.duration / 60)}h</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <UsersIcon className="w-3 h-3" />
                    <span>{template.eventDefaults.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>£{template.eventDefaults.price}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.eventDefaults.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm group-hover:bg-primary-600">
                  {language === 'pt' ? 'Usar Este Modelo' : 'Use This Template'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cultural Authenticity Guidelines */}
      <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-3xl p-8 border border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <FlagIcon className="w-6 h-6 text-green-600" />
          <h4 className="text-xl font-bold text-gray-900">
            {language === 'pt' ? 'Diretrizes de Autenticidade Cultural' : 'Cultural Authenticity Guidelines'}
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Elementos Obrigatórios' : 'Required Elements'}
            </h5>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {language === 'pt' ? 'Contexto cultural autêntico' : 'Authentic cultural context'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {language === 'pt' ? 'Componentes educacionais' : 'Educational components'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {language === 'pt' ? 'Envolvimento da comunidade' : 'Community involvement'}
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Melhores Práticas' : 'Best Practices'}
            </h5>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {language === 'pt' ? 'Parcerias com organizações culturais' : 'Partner with cultural organizations'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {language === 'pt' ? 'Inclusão de todas as nações lusófonas' : 'Include all Portuguese-speaking nations'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {language === 'pt' ? 'Ambiente bilíngue (PT/EN)' : 'Bilingual environment (PT/EN)'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-red-50/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-red-50 border border-green-200 rounded-3xl px-6 py-3 mb-6"
          >
            <CalendarDaysIcon className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">
              {t('calendar.badge', 'Lusophone Cultural Calendar')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            {t('calendar.title', 'Lusophone Cultural')}
            <br />
            <span className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
              {t('calendar.calendar', 'Calendar & Holidays')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto"
          >
            {t('calendar.subtitle', 'Discover, celebrate, and never miss Lusophone cultural holidays, saint days, and traditional celebrations in London')}
          </motion.p>
        </div>

        {/* Filters and View Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                {[
                  { key: 'calendar', label: t('calendar.view.calendar', 'Calendar'), icon: CalendarDaysIcon },
                  { key: 'timeline', label: t('calendar.view.timeline', 'Timeline'), icon: ClockIcon },
                  { key: 'regions', label: t('calendar.view.regions', 'Regions'), icon: GlobeAltIcon },
                  { key: 'recurring', label: language === 'pt' ? 'Eventos Recorrentes' : 'Recurring Events', icon: ArrowPathIcon }
                ].map((view) => {
                  const Icon = view.icon
                  return (
                    <button
                      key={view.key}
                      onClick={() => setViewMode(view.key as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                        viewMode === view.key
                          ? 'bg-white text-secondary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {view.label}
                    </button>
                  )
                })}
              </div>

              {/* My Favorites Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isFavorite}
                  onChange={(e) => setFilters(prev => ({ ...prev, isFavorite: e.target.checked }))}
                  className="rounded border-gray-300 text-secondary-600 focus:ring-secondary-500"
                />
                <HeartIcon className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">
                  {t('calendar.my_favorites', 'My Favorites')}
                </span>
              </label>
            </div>

            <div className="text-sm text-gray-600">
              {filteredEvents.length} {t('calendar.events_shown', 'events shown')}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <select
              value={filters.celebrationType}
              onChange={(e) => setFilters(prev => ({ ...prev, celebrationType: e.target.value }))}
              className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
            >
              <option value="">{t('calendar.all_types', 'All Celebration Types')}</option>
              {celebrationTypes.map(type => (
                <option key={type.key} value={type.key}>
                  {type.icon} {language === 'pt' ? type.namePt : type.nameEn}
                </option>
              ))}
            </select>

            <select
              value={filters.originRegion}
              onChange={(e) => setFilters(prev => ({ ...prev, originRegion: e.target.value }))}
              className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
            >
              <option value="">{t('calendar.all_regions', 'All Lusophone Regions')}</option>
              {originRegions.map(region => (
                <option key={region.key} value={region.key}>
                  {region.flag} {language === 'pt' ? region.namePt : region.nameEn}
                </option>
              ))}
            </select>

            <select
              value={filters.participationLevel}
              onChange={(e) => setFilters(prev => ({ ...prev, participationLevel: e.target.value }))}
              className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
            >
              <option value="">{t('calendar.all_participation', 'All Participation Levels')}</option>
              <option value="5">{t('calendar.very_high', 'Very High (5★)')}</option>
              <option value="4">{t('calendar.high', 'High (4★+)')}</option>
              <option value="3">{t('calendar.medium', 'Medium (3★+)')}</option>
              <option value="1">{t('calendar.any', 'Any Level')}</option>
            </select>

            <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
              <PlusIcon className="w-5 h-5 inline mr-2" />
              {t('calendar.add_event', 'Add Event')}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {viewMode === 'calendar' && renderCalendarView()}
            {viewMode === 'timeline' && renderTimelineView()}
            {viewMode === 'regions' && renderRegionsView()}
            {viewMode === 'recurring' && renderRecurringEventsView()}
          </motion.div>
        </AnimatePresence>

        {/* Selected Event Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedEvent.emoji}</div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {language === 'pt' ? selectedEvent.namePt : selectedEvent.nameEn}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {language === 'pt' ? selectedEvent.descriptionPt : selectedEvent.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl font-light"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Cultural Information */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.cultural_significance', 'Cultural Significance')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {language === 'pt' ? selectedEvent.culturalSignificancePt : selectedEvent.culturalSignificanceEn}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.historical_background', 'Historical Background')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedEvent.historicalBackground}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.traditional_activities', 'Traditional Activities')}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedEvent.typicalActivities.map((activity) => (
                          <li key={activity} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.traditional_foods', 'Traditional Foods')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.foodTraditions.map((food) => (
                          <span
                            key={food}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - London Celebrations */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.london_celebrations', 'London Celebrations')}
                      </h4>
                      
                      {selectedEvent.londonEvents && selectedEvent.londonEvents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedEvent.londonEvents.map((londonEvent) => (
                            <div key={londonEvent.id} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                              <h5 className="font-bold text-green-900 mb-2">{londonEvent.name}</h5>
                              <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                                <div className="flex items-center gap-2">
                                  <CalendarDaysIcon className="w-4 h-4" />
                                  <span>{new Date(londonEvent.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ClockIcon className="w-4 h-4" />
                                  <span>{londonEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{londonEvent.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <SparklesIcon className="w-4 h-4" />
                                  <span>{londonEvent.authenticity}% {t('common.authentic', 'Authentic')}</span>
                                </div>
                              </div>
                              <div className="mt-3">
                                <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors">
                                  {londonEvent.ticketPrice === 0 ? t('common.free_entry', 'Free Entry') : `£${londonEvent.ticketPrice}`}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 text-center">
                          <CalendarDaysIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-600 mb-4">
                            {t('calendar.no_london_events', 'No London events scheduled yet')}
                          </p>
                          <button className="bg-secondary-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-secondary-700 transition-colors">
                            {t('calendar.organize_event', 'Organize an Event')}
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {t('calendar.modern_adaptations', 'Modern Adaptations in London')}
                      </h4>
                      <ul className="space-y-2">
                        {selectedEvent.modernAdaptations.map((adaptation) => (
                          <li key={adaptation} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            {adaptation}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleFavorite(selectedEvent.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                          selectedEvent.isUserFavorite
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {selectedEvent.isUserFavorite ? <HeartSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                        {selectedEvent.isUserFavorite ? t('calendar.remove_favorite', 'Remove Favorite') : t('calendar.add_favorite', 'Add Favorite')}
                      </button>
                      
                      <button
                        onClick={() => toggleReminder(selectedEvent.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                          selectedEvent.reminderSet
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <BellIcon className="w-5 h-5" />
                        {selectedEvent.reminderSet ? t('calendar.reminder_set', 'Reminder Set') : t('calendar.set_reminder', 'Set Reminder')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recurring Event Creator Modal */}
        <AnimatePresence>
          {showRecurringCreator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <RecurringEventCreator
                onEventSeriesCreated={(templateId, instances) => {
                  // Handle the created recurring event series
                  console.log('Recurring event series created:', templateId, instances);
                  setShowRecurringCreator(false);
                  // You could add logic here to refresh the calendar or show a success message
                }}
                onClose={() => setShowRecurringCreator(false)}
                className="max-h-[90vh] overflow-y-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}