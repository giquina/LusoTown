'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CalendarDaysIcon,
  MusicalNoteIcon,
  CameraIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  FlagIcon,
  FireIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface FestaEvent {
  id: string
  nameEn: string
  namePt: string
  descriptionEn: string
  descriptionPt: string
  festaType: 'santos_populares' | 'festa_junina' | 'carnaval' | 'festa_divino' | 'arraial' | 'marchas' | 'sardinhada'
  date: string
  time: string
  location: string
  venue: string
  organizerId: string
  organizerName: string
  maxAttendees: number
  currentAttendees: number
  ticketPrice: number
  currency: string
  isAuthentic: boolean
  authenticityScore: number
  traditionalElements: string[]
  musicGenres: string[]
  foodOfferings: string[]
  culturalActivities: string[]
  ageGroups: string[]
  dresscode: string
  languagePreference: string
  weatherDependent: boolean
  familyFriendly: boolean
  liveMusic: boolean
  traditionalDances: boolean
  foodStalls: boolean
  decorations: string[]
  collaborativeFeatures: string[]
  imageGallery: string[]
  videoContent: string[]
  socialHashtags: string[]
  partnerVenues: string[]
  sponsorships: string[]
  rating: number
  reviewCount: number
  repeatEvent: boolean
  seasonalTiming: string
}

interface FestaPlanning {
  id: string
  eventName: string
  plannerId: string
  plannerName: string
  festaType: string
  targetDate: string
  status: 'brainstorming' | 'planning' | 'organizing' | 'confirmed' | 'completed'
  collaborators: string[]
  neededRoles: string[]
  budget: number
  estimatedAttendees: number
  venue: string
  venueConfirmed: boolean
  permits: string[]
  suppliers: string[]
  timeline: { date: string; task: string; responsible: string; status: string }[]
  culturalRequirements: string[]
  traditionalElements: string[]
  modernAdaptations: string[]
  communitySupport: number
  volunteersNeeded: number
  currentVolunteers: number
  fundingGoal: number
  currentFunding: number
  updates: { date: string; message: string; author: string }[]
}

interface CulturalMedia {
  id: string
  eventId: string
  eventName: string
  mediaType: 'photo' | 'video' | 'audio' | 'story'
  title: string
  description: string
  uploaderId: string
  uploaderName: string
  fileUrl: string
  thumbnailUrl: string
  tags: string[]
  culturalContext: string
  traditionalSignificance: string
  location: string
  uploadDate: string
  viewCount: number
  likes: number
  shares: number
  comments: number
  festaType: string
  authenticity: number
  isPublic: boolean
  allowDownload: boolean
  culturalEducationValue: number
  memoryValue: number
}

export default function FestaIntegrationHub() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'discover' | 'plan' | 'memories' | 'traditions'>('discover')
  const [festaEvents, setFestaEvents] = useState<FestaEvent[]>([])
  const [festaPlanning, setFestaPlanning] = useState<FestaPlanning[]>([])
  const [culturalMedia, setCulturalMedia] = useState<CulturalMedia[]>([])
  const [selectedEvent, setSelectedEvent] = useState<FestaEvent | null>(null)
  const [filters, setFilters] = useState({
    festaType: '',
    month: '',
    location: '',
    priceRange: ''
  })

  // Festa types with cultural context
  const festaTypes = [
    {
      key: 'santos_populares',
      nameEn: 'Santos Populares',
      namePt: 'Santos Populares',
      emoji: '🎉',
      color: 'from-red-500 to-orange-500',
      season: 'summer',
      significance: 'Major Portuguese street festivals celebrating popular saints'
    },
    {
      key: 'festa_junina',
      nameEn: 'Festa Junina',
      namePt: 'Festa Junina',
      emoji: '🌽',
      color: 'from-yellow-500 to-orange-500',
      season: 'summer',
      significance: 'Brazilian-Portuguese countryside celebrations'
    },
    {
      key: 'carnaval',
      nameEn: 'Carnaval',
      namePt: 'Carnaval',
      emoji: '🎭',
      color: 'from-purple-500 to-pink-500',
      season: 'winter',
      significance: 'Pre-Lenten celebrations with masks, parades, and music'
    },
    {
      key: 'festa_divino',
      nameEn: 'Festa do Divino',
      namePt: 'Festa do Divino Espírito Santo',
      emoji: '👑',
      color: 'from-red-500 to-red-600',
      season: 'spring',
      significance: 'Azorean Holy Spirit festival with community meals'
    },
    {
      key: 'arraial',
      nameEn: 'Arraial',
      namePt: 'Arraial',
      emoji: '🏟️',
      color: 'from-green-500 to-blue-500',
      season: 'summer',
      significance: 'Traditional Portuguese village square celebrations'
    },
    {
      key: 'marchas',
      nameEn: 'Marchas Populares',
      namePt: 'Marchas Populares',
      emoji: '🚶‍♀️',
      color: 'from-blue-500 to-indigo-500',
      season: 'summer',
      significance: 'Neighborhood parade competitions in Lisbon tradition'
    }
  ]

  // Mock data
  useEffect(() => {
    setFestaEvents([
      {
        id: '1',
        nameEn: 'London Santos Populares 2025',
        namePt: 'Santos Populares Londres 2025',
        descriptionEn: 'Authentic Portuguese street festival celebrating Saint Anthony with grilled sardines, traditional music, and community spirit',
        descriptionPt: 'Autêntico festival de rua português celebrando Santo António com sardinhas grelhadas, música tradicional e espírito comunitário',
        festaType: 'santos_populares',
        date: '2025-06-13',
        time: '18:00',
        location: 'Kennington Park',
        venue: 'Kennington Park Pavilion',
        organizerId: '1',
        organizerName: 'Associação Portuguesa de Londres',
        maxAttendees: 500,
        currentAttendees: 387,
        ticketPrice: 15,
        currency: 'GBP',
        isAuthentic: true,
        authenticityScore: 95,
        traditionalElements: ['grilled_sardines', 'manjerico_basil', 'paper_lanterns', 'folk_dancing', 'accordion_music'],
        musicGenres: ['fado', 'folk_portuguese', 'marchas_populares'],
        foodOfferings: ['sardines', 'caldo_verde', 'bifana', 'pasteis_nata', 'vinho_verde'],
        culturalActivities: ['traditional_dancing', 'manjerico_gifting', 'folk_singing', 'accordion_workshop'],
        ageGroups: ['families', 'adults', 'seniors'],
        dresscode: 'Traditional Portuguese or casual',
        languagePreference: 'bilingual',
        weatherDependent: true,
        familyFriendly: true,
        liveMusic: true,
        traditionalDances: true,
        foodStalls: true,
        decorations: ['portuguese_flags', 'paper_lanterns', 'manjerico_pots', 'colorful_banners'],
        collaborativeFeatures: ['community_cooking', 'group_singing', 'dance_teaching', 'story_sharing'],
        imageGallery: [],
        videoContent: [],
        socialHashtags: ['#SantosPopularesLondon', '#PortugueseHeritage', '#LusoTownFesta'],
        partnerVenues: ['Portuguese Cultural Centre', 'Casa do Bacalhau'],
        sponsorships: ['TAP Portugal', 'Super Bock'],
        rating: 4.8,
        reviewCount: 156,
        repeatEvent: true,
        seasonalTiming: 'june_traditional'
      },
      {
        id: '2',
        nameEn: 'Carnaval de Inverno London',
        namePt: 'Carnaval de Inverno Londres',
        descriptionEn: 'Winter carnival celebration with Portuguese and Brazilian influences, featuring costume parade and samba music',
        descriptionPt: 'Celebração de carnaval de inverno com influências portuguesas e brasileiras, com desfile de fantasias e música de samba',
        festaType: 'carnaval',
        date: '2025-02-28',
        time: '19:00',
        venue: 'Community Hall Stockwell',
        location: 'Stockwell',
        organizerId: '2',
        organizerName: 'Luso-Brazilian Cultural Association',
        maxAttendees: 300,
        currentAttendees: 245,
        ticketPrice: 20,
        currency: 'GBP',
        isAuthentic: true,
        authenticityScore: 88,
        traditionalElements: ['costume_parade', 'samba_dancing', 'mask_making', 'percussion_music'],
        musicGenres: ['samba', 'marchinhas', 'portuguese_folk'],
        foodOfferings: ['malasadas', 'chouriço', 'bifanas', 'pasteis_bacalhau'],
        culturalActivities: ['mask_workshop', 'samba_lessons', 'costume_competition', 'percussion_circle'],
        ageGroups: ['families', 'young_adults', 'adults'],
        dresscode: 'Carnival costumes encouraged',
        languagePreference: 'multilingual',
        weatherDependent: false,
        familyFriendly: true,
        liveMusic: true,
        traditionalDances: true,
        foodStalls: true,
        decorations: ['carnival_masks', 'colorful_streamers', 'brazilian_portuguese_flags', 'feathers'],
        collaborativeFeatures: ['group_costume_making', 'dance_workshops', 'music_jamming', 'cultural_exchange'],
        imageGallery: [],
        videoContent: [],
        socialHashtags: ['#CarnavalLondon', '#LusoBrazilian', '#LusoTownCarnival'],
        partnerVenues: ['Brazilian Restaurant Network', 'Portuguese Dance Academy'],
        sponsorships: ['Sagres Beer', 'Globo TV'],
        rating: 4.6,
        reviewCount: 89,
        repeatEvent: true,
        seasonalTiming: 'pre_lenten'
      }
    ])

    setFestaPlanning([
      {
        id: '1',
        eventName: 'Festa Junina Hackney 2025',
        plannerId: '1',
        plannerName: 'Maria Santos',
        festaType: 'festa_junina',
        targetDate: '2025-06-21',
        status: 'planning',
        collaborators: ['João Silva', 'Ana Pereira', 'Carlos Mendes'],
        neededRoles: ['Sound Engineer', 'Food Coordinator', 'Decorations Team'],
        budget: 3500,
        estimatedAttendees: 200,
        venue: 'Hackney Community Centre',
        venueConfirmed: true,
        permits: ['Music License', 'Food Handling Permit'],
        suppliers: ['Traditional Foods Ltd', 'Portuguese Decorations Co'],
        timeline: [
          { date: '2025-03-01', task: 'Venue booking confirmation', responsible: 'Maria Santos', status: 'completed' },
          { date: '2025-03-15', task: 'Permits application', responsible: 'João Silva', status: 'in_progress' },
          { date: '2025-04-01', task: 'Food suppliers confirmation', responsible: 'Ana Pereira', status: 'pending' }
        ],
        culturalRequirements: ['traditional_music', 'authentic_food', 'quadrilha_dancing', 'bonfire_ceremony'],
        traditionalElements: ['quadrilha_dance', 'traditional_games', 'corn_based_foods', 'folk_music'],
        modernAdaptations: ['photo_booth', 'social_media_integration', 'online_ticketing', 'digital_program'],
        communitySupport: 85,
        volunteersNeeded: 25,
        currentVolunteers: 18,
        fundingGoal: 3500,
        currentFunding: 2100,
        updates: [
          { date: '2025-02-15', message: 'Venue confirmed! Hackney Community Centre is perfect for our festa.', author: 'Maria Santos' },
          { date: '2025-02-20', message: 'Looking for volunteers to help with decorations. Portuguese crafting skills welcome!', author: 'Ana Pereira' }
        ]
      }
    ])

    setCulturalMedia([
      {
        id: '1',
        eventId: '1',
        eventName: 'Santos Populares London 2024',
        mediaType: 'photo',
        title: 'Traditional Sardine Grilling',
        description: 'Community members grilling sardines in the traditional Portuguese way with rock salt and olive oil',
        uploaderId: '1',
        uploaderName: 'Carlos Fernandes',
        fileUrl: '/images/festa/sardines-grilling.jpg',
        thumbnailUrl: '/images/festa/sardines-grilling-thumb.jpg',
        tags: ['sardines', 'grilling', 'traditional', 'community'],
        culturalContext: 'Sardines are the iconic food of Santos Populares, representing Portuguese coastal heritage',
        traditionalSignificance: 'Grilling sardines outdoors brings families and communities together during summer festivals',
        location: 'Kennington Park',
        uploadDate: '2024-06-13',
        viewCount: 1240,
        likes: 156,
        shares: 43,
        comments: 28,
        festaType: 'santos_populares',
        authenticity: 95,
        isPublic: true,
        allowDownload: false,
        culturalEducationValue: 90,
        memoryValue: 85
      },
      {
        id: '2',
        eventId: '2',
        eventName: 'Carnaval London 2024',
        mediaType: 'video',
        title: 'Samba Circle Dance',
        description: 'Spontaneous samba circle with children and adults celebrating Portuguese-Brazilian carnival traditions',
        uploaderId: '2',
        uploaderName: 'Ana Barbosa',
        fileUrl: '/videos/festa/samba-circle.mp4',
        thumbnailUrl: '/images/festa/samba-circle-thumb.jpg',
        tags: ['samba', 'dancing', 'children', 'carnival'],
        culturalContext: 'Samba dancing connects Portuguese and Brazilian cultural expressions in diaspora celebrations',
        traditionalSignificance: 'Community samba circles foster intergenerational cultural transmission and joy',
        location: 'Stockwell Community Hall',
        uploadDate: '2024-02-28',
        viewCount: 890,
        likes: 78,
        shares: 22,
        comments: 15,
        festaType: 'carnaval',
        authenticity: 88,
        isPublic: true,
        allowDownload: false,
        culturalEducationValue: 85,
        memoryValue: 92
      }
    ])
  }, [])

  const renderDiscoverFestas = () => (
    <div className="space-y-8">
      {/* Festa Types Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {festaTypes.map((festa) => (
          <motion.div
            key={festa.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-br ${festa.color} rounded-3xl p-6 text-white cursor-pointer transform transition-all hover:shadow-2xl`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{festa.emoji}</div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'pt' ? festa.namePt : festa.nameEn}
              </h3>
              <p className="text-sm opacity-90 mb-4">{festa.significance}</p>
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                <ClockIcon className="w-4 h-4" />
                <span className="text-xs font-medium capitalize">{festa.season}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.festaType}
            onChange={(e) => setFilters(prev => ({ ...prev, festaType: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('festa.filters.all_types', 'All Festa Types')}</option>
            {festaTypes.map(type => (
              <option key={type.key} value={type.key}>
                {type.emoji} {language === 'pt' ? type.namePt : type.nameEn}
              </option>
            ))}
          </select>

          <select
            value={filters.month}
            onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('festa.filters.all_months', 'All Months')}</option>
            <option value="1">{t('months.january', 'January')}</option>
            <option value="2">{t('months.february', 'February')}</option>
            <option value="6">{t('months.june', 'June')}</option>
            <option value="12">{t('months.december', 'December')}</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('festa.filters.all_locations', 'All London Areas')}</option>
            <option value="central">Central London</option>
            <option value="south">South London</option>
            <option value="north">North London</option>
            <option value="east">East London</option>
            <option value="west">West London</option>
          </select>

          <select
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
            className="rounded-xl border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
          >
            <option value="">{t('festa.filters.all_prices', 'All Price Ranges')}</option>
            <option value="free">{t('festa.filters.free', 'Free Events')}</option>
            <option value="0-20">£0 - £20</option>
            <option value="20-50">£20 - £50</option>
            <option value="50+">£50+</option>
          </select>
        </div>
      </div>

      {/* Festa Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {festaEvents.map((event) => {
          const festaType = festaTypes.find(t => t.key === event.festaType)
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Event Header */}
              <div className={`bg-gradient-to-r ${festaType?.color || 'from-gray-400 to-gray-500'} p-6 text-white`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{festaType?.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {language === 'pt' ? event.namePt : event.nameEn}
                      </h3>
                      <p className="text-sm opacity-90">{event.organizerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <StarSolid className="w-4 h-4 text-yellow-300" />
                      <span className="font-semibold">{event.rating}</span>
                    </div>
                    <p className="text-xs opacity-90">{event.reviewCount} reviews</p>
                  </div>
                </div>
                
                {/* Authenticity Badge */}
                {event.isAuthentic && (
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <SparklesIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {event.authenticityScore}% {t('festa.authentic', 'Authentic')}
                    </span>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {language === 'pt' ? event.descriptionPt : event.descriptionEn}
                </p>

                {/* Event Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDaysIcon className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <UsersIcon className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm">{event.currentAttendees}/{event.maxAttendees}</span>
                  </div>
                </div>

                {/* Traditional Elements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {t('festa.traditional_elements', 'Traditional Elements')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.traditionalElements.slice(0, 4).map((element) => (
                      <span
                        key={element}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                      >
                        {element.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {event.traditionalElements.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{event.traditionalElements.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Icons */}
                <div className="flex items-center gap-4 mb-6 text-gray-600">
                  {event.familyFriendly && (
                    <div className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      <span className="text-xs">{t('festa.family_friendly', 'Family Friendly')}</span>
                    </div>
                  )}
                  {event.liveMusic && (
                    <div className="flex items-center gap-1">
                      <MusicalNoteIcon className="w-4 h-4" />
                      <span className="text-xs">{t('festa.live_music', 'Live Music')}</span>
                    </div>
                  )}
                  {event.foodStalls && (
                    <div className="flex items-center gap-1">
                      <FireIcon className="w-4 h-4" />
                      <span className="text-xs">{t('festa.food_stalls', 'Food Stalls')}</span>
                    </div>
                  )}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    £{event.ticketPrice}
                    <span className="text-sm text-gray-500 font-normal">
                      {' '}/{t('festa.person', 'person')}
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                    {t('festa.join', 'Join Festa')}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  const renderPlanFesta = () => (
    <div className="space-y-8">
      {/* Planning Hero */}
      <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            {t('festa.planning.title', 'Organize Your Own Portuguese Festa')}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {t('festa.planning.subtitle', 'Bring the community together with authentic Portuguese celebrations. We provide tools, guidance, and support every step of the way.')}
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            {t('festa.planning.start', 'Start Planning a Festa')}
          </button>
        </motion.div>
      </div>

      {/* Active Planning Projects */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t('festa.planning.active', 'Community Festa Planning Projects')}
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {festaPlanning.map((planning) => (
            <motion.div
              key={planning.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              {/* Planning Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{planning.eventName}</h4>
                  <p className="text-gray-600">Organized by {planning.plannerName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      planning.status === 'planning' ? 'bg-blue-100 text-blue-700' :
                      planning.status === 'organizing' ? 'bg-yellow-100 text-yellow-700' :
                      planning.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {planning.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(planning.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary-600">
                    {Math.round((planning.currentFunding / planning.fundingGoal) * 100)}%
                  </div>
                  <p className="text-xs text-gray-500">Funded</p>
                </div>
              </div>

              {/* Progress Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-900">{planning.currentVolunteers}</div>
                  <div className="text-xs text-gray-600">/ {planning.volunteersNeeded} Volunteers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-900">£{planning.currentFunding}</div>
                  <div className="text-xs text-gray-600">/ £{planning.fundingGoal} Budget</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-900">{planning.estimatedAttendees}</div>
                  <div className="text-xs text-gray-600">Expected</div>
                </div>
              </div>

              {/* Needed Roles */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">
                  {t('festa.planning.needed_roles', 'Roles Needed')}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {planning.neededRoles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Updates */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">
                  {t('festa.planning.recent_updates', 'Recent Updates')}
                </h5>
                <div className="space-y-2">
                  {planning.updates.slice(0, 2).map((update, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-gray-700">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(update.date).toLocaleDateString()} - {update.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-2 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all">
                  {t('festa.planning.volunteer', 'Volunteer')}
                </button>
                <button className="flex-1 border-2 border-secondary-300 text-secondary-600 py-2 rounded-xl font-semibold text-sm hover:border-secondary-400 transition-colors">
                  {t('festa.planning.support', 'Support')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Planning Resources */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('festa.planning.resources', 'Festa Planning Resources')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: CalendarDaysIcon,
              title: t('festa.resources.timeline', 'Planning Timeline'),
              desc: t('festa.resources.timeline_desc', 'Step-by-step planning guide with deadlines')
            },
            {
              icon: UsersIcon,
              title: t('festa.resources.volunteers', 'Volunteer Management'),
              desc: t('festa.resources.volunteers_desc', 'Tools to organize and coordinate helpers')
            },
            {
              icon: MapPinIcon,
              title: t('festa.resources.venues', 'Venue Directory'),
              desc: t('festa.resources.venues_desc', 'Portuguese-friendly venues across London')
            },
            {
              icon: MusicalNoteIcon,
              title: t('festa.resources.suppliers', 'Cultural Suppliers'),
              desc: t('festa.resources.suppliers_desc', 'Authentic music, food, and decoration vendors')
            }
          ].map((resource, index) => {
            const Icon = resource.icon
            return (
              <div key={index} className="text-center p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderCulturalMemories = () => (
    <div className="space-y-8">
      {/* Memories Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-3xl px-6 py-3 mb-6"
        >
          <CameraIcon className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-700">
            {t('festa.memories.badge', 'Cultural Memory Bank')}
          </span>
        </motion.div>

        <h2 className="text-3xl font-black text-gray-900 mb-4">
          {t('festa.memories.title', 'Preserve Our Festa Memories')}
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {t('festa.memories.subtitle', 'Share photos, videos, and stories from Portuguese celebrations to create a living archive of our cultural heritage in London')}
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShareIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {t('festa.memories.upload', 'Share Your Festa Memories')}
          </h3>
          <p className="text-gray-700 mb-6">
            {t('festa.memories.upload_desc', 'Help preserve Portuguese culture by sharing your authentic festa photos and videos with cultural context')}
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            {t('festa.memories.upload_btn', 'Upload Memories')}
          </button>
        </div>
      </div>

      {/* Cultural Media Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {culturalMedia.map((media) => (
          <motion.div
            key={media.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl"
          >
            {/* Media Preview */}
            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
              {media.mediaType === 'photo' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CameraIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              {media.mediaType === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-gray-600 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
              
              {/* Festa Type Badge */}
              <div className="absolute top-4 left-4">
                {(() => {
                  const festaType = festaTypes.find(t => t.key === media.festaType)
                  return festaType ? (
                    <div className={`bg-gradient-to-r ${festaType.color} text-white px-3 py-1 rounded-full flex items-center gap-1`}>
                      <span>{festaType.emoji}</span>
                      <span className="text-xs font-medium">{festaType.nameEn}</span>
                    </div>
                  ) : null
                })()}
              </div>

              {/* Authenticity Score */}
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1">
                <SparklesIcon className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-semibold">{media.authenticity}%</span>
              </div>
            </div>

            {/* Media Info */}
            <div className="p-6">
              <h4 className="font-bold text-gray-900 mb-2">{media.title}</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{media.description}</p>
              
              <div className="text-xs text-gray-500 mb-4">
                <p className="mb-1">{t('festa.memories.from', 'From')}: {media.eventName}</p>
                <p className="mb-1">{t('festa.memories.by', 'By')}: {media.uploaderName}</p>
                <p>{t('festa.memories.location', 'Location')}: {media.location}</p>
              </div>

              {/* Cultural Context */}
              <div className="bg-secondary-50 rounded-xl p-3 mb-4">
                <h5 className="font-semibold text-secondary-900 mb-1 text-sm">
                  {t('festa.memories.cultural_context', 'Cultural Context')}
                </h5>
                <p className="text-secondary-700 text-xs">{media.culturalContext}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {media.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {media.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{media.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <HeartSolid className="w-4 h-4 text-red-500" />
                    <span>{media.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShareIcon className="w-4 h-4" />
                    <span>{media.shares}</span>
                  </div>
                </div>
                <span>{media.viewCount} views</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Collection Stats */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('festa.memories.stats', 'Community Memory Archive Stats')}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-secondary-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">{t('festa.memories.photos', 'Photos Shared')}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-accent-600 mb-2">89</div>
            <div className="text-sm text-gray-600">{t('festa.memories.videos', 'Videos Archived')}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-coral-600 mb-2">156</div>
            <div className="text-sm text-gray-600">{t('festa.memories.stories', 'Cultural Stories')}</div>
          </div>
          <div>
            <div className="text-3xl font-black text-premium-600 mb-2">23</div>
            <div className="text-sm text-gray-600">{t('festa.memories.events', 'Events Documented')}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTraditions = () => (
    <div className="space-y-8">
      {/* Traditions Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl px-6 py-3 mb-6"
        >
          <FlagIcon className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-700">
            {t('festa.traditions.badge', 'Portuguese Heritage Guide')}
          </span>
        </motion.div>

        <h2 className="text-3xl font-black text-gray-900 mb-4">
          {t('festa.traditions.title', 'Learn Our Festa Traditions')}
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {t('festa.traditions.subtitle', 'Discover the deep cultural meanings, regional variations, and authentic ways to celebrate Portuguese festivals in London')}
        </p>
      </div>

      {/* Traditional Elements Encyclopedia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          {
            name: 'Grilled Sardines',
            namePt: 'Sardinhas Grelhadas',
            tradition: 'santos_populares',
            significance: 'Symbol of Portuguese coastal heritage and community gathering',
            significancePt: 'Símbolo da herança costeira portuguesa e reunião comunitária',
            howTo: 'Grill over charcoal with coarse salt, serve with roasted peppers and broa bread',
            howToPt: 'Grelhadas no carvão com sal grosso, servir com pimentos assados e broa',
            regionalVariations: ['Lisbon style with basil', 'Porto style with olive oil', 'Algarve style with herbs'],
            seasonality: 'Peak in June during Santos Populares',
            londonAdaptation: 'Use outdoor grills in London parks with proper permits',
            culturalMeaning: 'Represents abundance from the sea and sharing with community',
            materials: ['Fresh sardines', 'Coarse sea salt', 'Charcoal grill', 'Olive oil'],
            difficulty: 'Easy',
            authenticity: 95
          },
          {
            name: 'Manjerico Basil',
            namePt: 'Manjerico',
            tradition: 'santos_populares',
            significance: 'Traditional gift between lovers and friends, symbol of protection and good luck',
            significancePt: 'Oferta tradicional entre namorados e amigos, símbolo de proteção e boa sorte',
            howTo: 'Present small basil plants with colorful ribbons and traditional poems',
            howToPt: 'Apresentar pequenas plantas de manjerico com fitas coloridas e quadras tradicionais',
            regionalVariations: ['Lisbon quadras', 'Different colored ribbons by region'],
            seasonality: 'Given on Saint Anthony\'s Eve (June 12)',
            londonAdaptation: 'Grow in small pots, available at Portuguese grocery stores',
            culturalMeaning: 'Expression of love, friendship, and wishes for prosperity',
            materials: ['Basil plant', 'Colorful ribbons', 'Traditional poem card', 'Small decorative pot'],
            difficulty: 'Easy',
            authenticity: 98
          },
          {
            name: 'Paper Lanterns',
            namePt: 'Balões de São João',
            tradition: 'santos_populares',
            significance: 'Wishes sent to heaven, community spectacle of hope and celebration',
            significancePt: 'Desejos enviados ao céu, espetáculo comunitário de esperança e celebração',
            howTo: 'Create tissue paper lanterns with candles, release together at sunset',
            howToPt: 'Criar lanternas de papel de seda com velas, soltar juntos ao pôr do sol',
            regionalVariations: ['Porto sky lanterns', 'Different colors for different wishes'],
            seasonality: 'São João night (June 23) in Porto tradition',
            londonAdaptation: 'Use LED lights instead of candles for safety, check local regulations',
            culturalMeaning: 'Collective hope, wishes for the community, visual celebration',
            materials: ['Tissue paper', 'Wire frame', 'LED lights', 'String'],
            difficulty: 'Moderate',
            authenticity: 85
          },
          {
            name: 'Quadrilha Dance',
            namePt: 'Dança da Quadrilha',
            tradition: 'festa_junina',
            significance: 'Community dance celebrating rural Portuguese-Brazilian traditions',
            significancePt: 'Dança comunitária celebrando tradições rurais português-brasileiras',
            howTo: 'Form couples in squares, follow caller\'s instructions in Portuguese',
            howToPt: 'Formar casais em quadrado, seguir instruções do marcador em português',
            regionalVariations: ['Brazilian quadrilha', 'Portuguese folk variations', 'Modern adaptations'],
            seasonality: 'June festivals (São João period)',
            londonAdaptation: 'Practice indoors during winter, teach in community centers',
            culturalMeaning: 'Unity, tradition transmission, intergenerational bonding',
            materials: ['Traditional costumes', 'Portuguese folk music', 'Dance instruction cards'],
            difficulty: 'Moderate',
            authenticity: 88
          }
        ].map((tradition, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            {/* Tradition Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {language === 'pt' ? tradition.namePt : tradition.name}
                </h3>
                <div className="flex items-center gap-2">
                  {(() => {
                    const festaType = festaTypes.find(t => t.key === tradition.tradition)
                    return festaType ? (
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <span>{festaType.emoji}</span>
                        {festaType.nameEn}
                      </span>
                    ) : null
                  })()}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <SparklesIcon className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{tradition.authenticity}%</span>
                </div>
                <p className="text-xs text-gray-500">{t('festa.traditions.authentic', 'Authentic')}</p>
              </div>
            </div>

            {/* Cultural Significance */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('festa.traditions.significance', 'Cultural Significance')}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'pt' ? tradition.significancePt : tradition.significance}
              </p>
            </div>

            {/* How To */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('festa.traditions.how_to', 'How to Celebrate')}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'pt' ? tradition.howToPt : tradition.howTo}
              </p>
            </div>

            {/* London Adaptation */}
            <div className="mb-6 bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                {t('festa.traditions.london_adaptation', 'London Adaptation')}
              </h4>
              <p className="text-blue-700 text-sm">{tradition.londonAdaptation}</p>
            </div>

            {/* Materials Needed */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {t('festa.traditions.materials', 'Materials Needed')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tradition.materials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Difficulty and Seasonality */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  <span>{tradition.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4" />
                  <span>{tradition.seasonality}</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all">
                {t('festa.traditions.learn', 'Learn More')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Regional Variations */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('festa.traditions.regional', 'Regional Portuguese Festa Traditions')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { region: 'Lisboa', specialties: ['Santos Populares', 'Marchas', 'Sardines'], color: 'from-red-500 to-orange-500' },
            { region: 'Porto', specialties: ['São João', 'Plastic Hammers', 'Sky Lanterns'], color: 'from-blue-500 to-purple-500' },
            { region: 'Açores', specialties: ['Festa do Divino', 'Sopas', 'Holy Spirit Crown'], color: 'from-green-500 to-blue-500' },
            { region: 'Madeira', specialties: ['Festa da Flor', 'Wine Festival', 'Folklore'], color: 'from-purple-500 to-pink-500' }
          ].map((region) => (
            <div
              key={region.region}
              className={`bg-gradient-to-br ${region.color} rounded-2xl p-6 text-white text-center`}
            >
              <h4 className="text-lg font-bold mb-4">{region.region}</h4>
              <ul className="space-y-2">
                {region.specialties.map((specialty) => (
                  <li key={specialty} className="text-sm opacity-90">{specialty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-red-50/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-3xl px-6 py-3 mb-6"
          >
            <SparklesIcon className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-700">
              {t('festa.badge', 'Festa Integration Hub')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
          >
            {t('festa.title', 'Celebrate Portuguese')}
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              {t('festa.festivities', 'Festivities in London')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto"
          >
            {t('festa.subtitle', 'Discover, plan, and preserve authentic Portuguese celebrations with comprehensive festa integration tools and community collaboration features')}
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div className="flex space-x-2">
              {[
                { key: 'discover', label: t('festa.tabs.discover', 'Discover Festas'), icon: CalendarDaysIcon },
                { key: 'plan', label: t('festa.tabs.plan', 'Plan Festa'), icon: SparklesIcon },
                { key: 'memories', label: t('festa.tabs.memories', 'Cultural Memories'), icon: CameraIcon },
                { key: 'traditions', label: t('festa.tabs.traditions', 'Learn Traditions'), icon: FlagIcon }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeTab === 'discover' && renderDiscoverFestas()}
            {activeTab === 'plan' && renderPlanFesta()}
            {activeTab === 'memories' && renderCulturalMemories()}
            {activeTab === 'traditions' && renderTraditions()}
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
                {/* Event Modal Content */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {language === 'pt' ? selectedEvent.namePt : selectedEvent.nameEn}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {language === 'pt' ? selectedEvent.descriptionPt : selectedEvent.descriptionEn}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Detailed event information would go here */}
                <div className="space-y-6">
                  {/* Add comprehensive event details, booking, sharing, etc. */}
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all">
                    {t('festa.book_now', 'Book Your Spot')} - £{selectedEvent.ticketPrice}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}