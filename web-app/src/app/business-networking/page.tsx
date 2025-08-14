'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { networkingEventsService, NetworkingEvent, NetworkingFilters, NetworkingType, BusinessFocus, TargetAudience } from '@/lib/networkingEvents'
import { 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  BuildingOfficeIcon,
  MicrophoneIcon,
  GlobeAltIcon,
  CurrencyPoundIcon,
  UsersIcon,
  SparklesIcon,
  TrophyIcon,
  
  LightBulbIcon,
  XMarkIcon,
  CheckBadgeIcon,
  FlagIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface NetworkingEventCardProps {
  event: NetworkingEvent
  featured?: boolean
}

const NetworkingEventCard: React.FC<NetworkingEventCardProps> = ({ event, featured = false }) => {
  const { language } = useLanguage()
  const [isFavorited, setIsFavorited] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const getNetworkingTypeLabel = (type: NetworkingType) => {
    const types = {
      breakfast_networking: { en: 'Breakfast Networking', pt: 'Networking ao Pequeno-almoço' },
      lunch_meeting: { en: 'Lunch Meeting', pt: 'Reunião de Almoço' },
      after_work_drinks: { en: 'After Work Drinks', pt: 'Drinks Pós-trabalho' },
      weekend_workshop: { en: 'Weekend Workshop', pt: 'Workshop de Fim de semana' },
      conference: { en: 'Conference', pt: 'Conferência' },
      panel_discussion: { en: 'Panel Discussion', pt: 'Discussão em Painel' },
      pitch_competition: { en: 'Pitch Competition', pt: 'Competição de Pitch' },
      mentorship_mixer: { en: 'Mentorship Mixer', pt: 'Encontro de Mentoria' },
      investor_meetup: { en: 'Investor Meetup', pt: 'Encontro de Investidores' },
      industry_roundtable: { en: 'Industry Roundtable', pt: 'Mesa Redonda da Indústria' }
    }
    return types[type]?.[language] || type
  }

  const getLanguageFlag = (lang: string) => {
    const flags = {
      portuguese: '🇵🇹',
      english: '🇬🇧',
      bilingual: '🌍'
    }
    return flags[lang as keyof typeof flags] || '🌍'
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border ${featured ? 'border-premium-300 ring-2 ring-premium-200' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 group`}>
      {featured && (
        <div className="bg-gradient-to-r from-premium-400 to-accent-400 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <TrophyIcon className="w-4 h-4" />
          {language === 'pt' ? 'Evento em Destaque' : 'Featured Event'}
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {event.images.length > 0 ? (
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <UsersIcon className="w-16 h-16 text-primary-400" />
          </div>
        )}
        
        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {getNetworkingTypeLabel(event.networkingType)}
          </span>
        </div>
        
        {/* Language Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            {getLanguageFlag(event.languageOfEvent)}
            {event.languageOfEvent === 'bilingual' ? (language === 'pt' ? 'Bilíngue' : 'Bilingual') : 
             event.languageOfEvent === 'portuguese' ? (language === 'pt' ? 'Português' : 'Portuguese') : 
             'English'}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <HeartIcon className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <BuildingOfficeIcon className="w-4 h-4" />
            <span>{event.hostName}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatTime(event.time)} - {formatTime(event.endTime)}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CurrencyPoundIcon className="w-4 h-4 flex-shrink-0" />
            <span>
              {event.price === 0 
                ? (language === 'pt' ? 'Gratuito' : 'Free')
                : `£${event.price}`
              }
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <UsersIcon className="w-4 h-4 flex-shrink-0" />
            <span>
              {event.currentAttendees}/{event.maxAttendees} {language === 'pt' ? 'participantes' : 'attendees'}
            </span>
          </div>
        </div>
        
        {/* Business Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {event.pitchSessions && (
              <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full flex items-center gap-1">
                <MicrophoneIcon className="w-3 h-3" />
                {language === 'pt' ? 'Pitch Sessions' : 'Pitch Sessions'}
              </span>
            )}
            {event.mentorshipMatchmaking && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full flex items-center gap-1">
                <LightBulbIcon className="w-3 h-3" />
                {language === 'pt' ? 'Mentoria' : 'Mentorship'}
              </span>
            )}
            {event.investorPresence && (
              <span className="px-2 py-1 bg-premium-100 text-premium-700 text-xs rounded-full flex items-center gap-1">
                <TrophyIcon className="w-3 h-3" />
                {language === 'pt' ? 'Investidores' : 'Investors'}
              </span>
            )}
          </div>
        </div>
        
        {/* Speaker Highlights */}
        {event.speakerLineup.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <MicrophoneIcon className="w-4 h-4" />
              {language === 'pt' ? 'Oradores' : 'Speakers'}
            </h4>
            <div className="space-y-2">
              {event.speakerLineup.slice(0, 2).map(speaker => (
                <div key={speaker.id} className="flex items-center gap-3">
                  {speaker.imageUrl ? (
                    <img 
                      src={speaker.imageUrl} 
                      alt={speaker.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 text-xs font-medium">
                        {speaker.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{speaker.name}</p>
                    <p className="text-xs text-gray-600">{speaker.title}, {speaker.company}</p>
                  </div>
                </div>
              ))}
              {event.speakerLineup.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{event.speakerLineup.length - 2} {language === 'pt' ? 'mais oradores' : 'more speakers'}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Partner Organizations */}
        {event.partnerOrganizations.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              {language === 'pt' ? 'Parceiros' : 'Partners'}
            </h4>
            <div className="flex flex-wrap gap-1">
              {event.partnerOrganizations.slice(0, 3).map(partner => (
                <span
                  key={partner.id}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {language === 'pt' && partner.namePortuguese ? partner.namePortuguese : partner.name}
                </span>
              ))}
              {event.partnerOrganizations.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{event.partnerOrganizations.length - 3} {language === 'pt' ? 'mais' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Success Metrics */}
        {(event.businessConnectionsMade > 0 || event.dealsGenerated > 0) && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
              <CheckBadgeIcon className="w-4 h-4" />
              {language === 'pt' ? 'Impacto Anterior' : 'Previous Impact'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {event.businessConnectionsMade > 0 && (
                <div className="text-green-700">
                  <span className="font-medium">{event.businessConnectionsMade}</span>
                  <span className="block text-xs">{language === 'pt' ? 'conexões criadas' : 'connections made'}</span>
                </div>
              )}
              {event.dealsGenerated > 0 && (
                <div className="text-green-700">
                  <span className="font-medium">{event.dealsGenerated}</span>
                  <span className="block text-xs">{language === 'pt' ? 'negócios gerados' : 'deals generated'}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(event.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {event.averageRating} ({event.totalReviews} {language === 'pt' ? 'avaliações' : 'reviews'})
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
            {language === 'pt' ? 'Inscrever-se' : 'Register'}
          </button>
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BusinessNetworking() {
  const { language } = useLanguage()
  const [events, setEvents] = useState<NetworkingEvent[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<NetworkingEvent[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<NetworkingEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [statistics, setStatistics] = useState<any>(null)
  
  const [filters, setFilters] = useState<NetworkingFilters>({
    search: '',
    sortBy: 'date'
  })

  useEffect(() => {
    loadNetworkingEvents()
    loadStatistics()
  }, [filters])

  const loadNetworkingEvents = async () => {
    try {
      setLoading(true)
      const result = await networkingEventsService.searchNetworkingEvents(filters, 1, 20)
      setEvents(result.events)
      setFeaturedEvents(result.featuredEvents)
      setUpcomingEvents(result.upcomingEvents)
      setTotal(result.total)
    } catch (error) {
      console.error('Error loading networking events:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = async () => {
    try {
      const stats = await networkingEventsService.getNetworkingStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const handleFilterChange = (key: keyof NetworkingFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const removeFilter = (key: keyof NetworkingFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) 
        ? (prev[key] as any[]).filter(item => item !== value)
        : key === 'search' ? '' : prev[key]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      search: '',
      sortBy: 'date'
    })
  }

  const networkingTypes: { value: NetworkingType; label: { en: string; pt: string } }[] = [
    { value: 'breakfast_networking', label: { en: 'Breakfast Networking', pt: 'Networking Pequeno-almoço' } },
    { value: 'lunch_meeting', label: { en: 'Lunch Meeting', pt: 'Reunião de Almoço' } },
    { value: 'after_work_drinks', label: { en: 'After Work Drinks', pt: 'Drinks Pós-trabalho' } },
    { value: 'conference', label: { en: 'Conference', pt: 'Conferência' } },
    { value: 'panel_discussion', label: { en: 'Panel Discussion', pt: 'Discussão em Painel' } },
    { value: 'pitch_competition', label: { en: 'Pitch Competition', pt: 'Competição de Pitch' } },
    { value: 'mentorship_mixer', label: { en: 'Mentorship Mixer', pt: 'Encontro de Mentoria' } },
    { value: 'investor_meetup', label: { en: 'Investor Meetup', pt: 'Encontro de Investidores' } }
  ]

  const businessFocusOptions: { value: BusinessFocus; label: { en: string; pt: string } }[] = [
    { value: 'startups', label: { en: 'Startups', pt: 'Startups' } },
    { value: 'technology', label: { en: 'Technology', pt: 'Tecnologia' } },
    { value: 'finance', label: { en: 'Finance', pt: 'Finanças' } },
    { value: 'real_estate', label: { en: 'Real Estate', pt: 'Imobiliário' } },
    { value: 'hospitality', label: { en: 'Hospitality', pt: 'Hospitalidade' } },
    { value: 'import_export', label: { en: 'Import/Export', pt: 'Importação/Exportação' } },
    { value: 'consulting', label: { en: 'Consulting', pt: 'Consultoria' } },
    { value: 'healthcare', label: { en: 'Healthcare', pt: 'Saúde' } }
  ]

  const activeFiltersCount = [
    filters.search,
    ...(filters.networkingType || []),
    ...(filters.businessFocus || []),
    ...(filters.targetAudience || []),
    filters.languageOfEvent !== 'all' ? filters.languageOfEvent : null
  ].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Networking Empresarial Português' : 'Portuguese Business Networking'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Conecte-se com empreendedores e profissionais portugueses em Londres. Construa relacionamentos, encontre oportunidades, faça negócios.'
                : 'Connect with Portuguese entrepreneurs and professionals in London. Build relationships, find opportunities, make deals.'}
            </p>
            
            {/* Statistics */}
            {statistics && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary-600">{statistics.totalEvents}</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Eventos' : 'Events'}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-secondary-600">{statistics.totalConnections}</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Conexões' : 'Connections'}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-accent-600">{statistics.totalDeals}</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Negócios' : 'Deals'}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-premium-600">{statistics.partnerOrganizations}</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Parceiros' : 'Partners'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'pt' ? 'Buscar eventos de networking...' : 'Search networking events...'}
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="date">{language === 'pt' ? 'Por Data' : 'By Date'}</option>
                  <option value="relevance">{language === 'pt' ? 'Por Relevância' : 'By Relevance'}</option>
                  <option value="price">{language === 'pt' ? 'Por Preço' : 'By Price'}</option>
                  <option value="attendees">{language === 'pt' ? 'Por Participantes' : 'By Attendees'}</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <AdjustmentsHorizontalIcon className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Filtros' : 'Filters'}</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-primary-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Networking Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pt' ? 'Tipo de Evento' : 'Event Type'}
                    </label>
                    <select
                      onChange={(e) => {
                        const type = e.target.value as NetworkingType
                        if (type && !filters.networkingType?.includes(type)) {
                          handleFilterChange('networkingType', [...(filters.networkingType || []), type])
                        }
                        e.target.value = ''
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{language === 'pt' ? 'Adicionar tipo...' : 'Add type...'}</option>
                      {networkingTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label[language]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Business Focus Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pt' ? 'Foco Empresarial' : 'Business Focus'}
                    </label>
                    <select
                      onChange={(e) => {
                        const focus = e.target.value as BusinessFocus
                        if (focus && !filters.businessFocus?.includes(focus)) {
                          handleFilterChange('businessFocus', [...(filters.businessFocus || []), focus])
                        }
                        e.target.value = ''
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{language === 'pt' ? 'Adicionar foco...' : 'Add focus...'}</option>
                      {businessFocusOptions.map(focus => (
                        <option key={focus.value} value={focus.value}>{focus.label[language]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pt' ? 'Idioma do Evento' : 'Event Language'}
                    </label>
                    <select
                      value={filters.languageOfEvent || 'all'}
                      onChange={(e) => handleFilterChange('languageOfEvent', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">{language === 'pt' ? 'Todos os idiomas' : 'All languages'}</option>
                      <option value="portuguese">{language === 'pt' ? 'Português' : 'Portuguese'}</option>
                      <option value="english">{language === 'pt' ? 'Inglês' : 'English'}</option>
                      <option value="bilingual">{language === 'pt' ? 'Bilíngue' : 'Bilingual'}</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearAllFilters}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {language === 'pt' ? 'Limpar Tudo' : 'Clear All'}
                    </button>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filters.search && (
                      <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                        {language === 'pt' ? 'Busca: ' : 'Search: '}"{filters.search}"
                        <button
                          onClick={() => removeFilter('search', '')}
                          className="ml-2 hover:bg-primary-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.networkingType?.map(type => (
                      <span key={type} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
                        {networkingTypes.find(t => t.value === type)?.label[language]}
                        <button
                          onClick={() => removeFilter('networkingType', type)}
                          className="ml-2 hover:bg-secondary-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.businessFocus?.map(focus => (
                      <span key={focus} className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full">
                        {businessFocusOptions.find(f => f.value === focus)?.label[language]}
                        <button
                          onClick={() => removeFilter('businessFocus', focus)}
                          className="ml-2 hover:bg-accent-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrophyIcon className="w-6 h-6 text-accent-500" />
                {language === 'pt' ? 'Eventos em Destaque' : 'Featured Events'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map(event => (
                  <NetworkingEventCard key={event.id} event={event} featured={true} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'pt' ? 'Nenhum evento encontrado' : 'No events found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'pt' 
                ? 'Tente ajustar seus filtros para encontrar mais eventos de networking.'
                : 'Try adjusting your search filters to find more networking events.'}
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-primary"
            >
              {language === 'pt' ? 'Limpar Filtros' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <NetworkingEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
          <UsersIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' ? 'Organize Seu Evento de Networking' : 'Organize Your Networking Event'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {language === 'pt' 
              ? 'Tem uma ideia para um evento de networking português? Conecte empresários, construa parcerias, faça a diferença na comunidade.'
              : 'Have an idea for a Portuguese networking event? Connect entrepreneurs, build partnerships, make a difference in the community.'}
          </p>
          <button className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {language === 'pt' ? 'Criar Evento' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  )
}