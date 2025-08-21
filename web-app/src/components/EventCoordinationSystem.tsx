'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  HeartIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  CurrencyPoundIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShareIcon,
  BookmarkIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BellIcon as BellSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface EventMeetup {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: {
    name: string
    address: string
    area: string
    coordinates?: { lat: number, lng: number }
  }
  organizer: {
    id: string
    name: string
    isMatch: boolean
    compatibility?: number
    verified: boolean
  }
  category: 'cultural' | 'social' | 'professional' | 'food' | 'music' | 'sports'
  culturalElements: string[]
  attendees: {
    confirmed: number
    capacity: number
    matches: number // Number of user's matches attending
    following: number // Number of people user follows attending
  }
  pricing: {
    isFree: boolean
    price?: string
    includes?: string[]
  }
  transport: {
    available: boolean
    provider?: string
    pickupPoints?: string[]
    price?: string
    groupBooking: boolean
  }
  matchOpportunities: {
    compatibleAttendees: number
    newConnectionPotential: 'high' | 'medium' | 'low'
    serviceProviders: string[]
  }
  requirements?: {
    minimumAge?: number
    languageLevel?: 'beginner' | 'intermediate' | 'advanced' | 'native'
    membershipRequired?: boolean
  }
  highlights: string[]
  photos?: string[]
  rsvpStatus?: 'attending' | 'interested' | 'declined' | null
  isBookmarked?: boolean
  remindersSet?: boolean
}

interface EventCoordinationSystemProps {
  userMatches?: string[]
  userFollowing?: string[]
  userLocation?: string
  onRSVP: (eventId: string, status: 'attending' | 'interested' | 'declined') => void
  onBookTransport: (eventId: string, pickupPoint: string) => void
  onMessageOrganizer: (organizerId: string) => void
  onInviteMatches: (eventId: string, matchIds: string[]) => void
  onBookmarkEvent: (eventId: string) => void
  onSetReminder: (eventId: string) => void
  className?: string
}

export default function EventCoordinationSystem({
  userMatches = [],
  userFollowing = [],
  userLocation = 'London',
  onRSVP,
  onBookTransport,
  onMessageOrganizer,
  onInviteMatches,
  onBookmarkEvent,
  onSetReminder,
  className = ''
}: EventCoordinationSystemProps) {
  const { language } = useLanguage()
  const { membershipTier } = useSubscription()
  const [selectedEvent, setSelectedEvent] = useState<EventMeetup | null>(null)
  const [filterCategory, setFilterCategory] = useState<'all' | EventMeetup['category']>('all')
  const [sortBy, setSortBy] = useState<'date' | 'matches' | 'compatibility' | 'proximity'>('date')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const isPortuguese = language === 'pt'

  // Mock events with match integration
  const eventMeetups: EventMeetup[] = useMemo(() => [
    {
      id: 'fado-night-authentic',
      title: isPortuguese ? 'Noite de Fado Autêntico' : 'Authentic Fado Night',
      description: isPortuguese 
        ? 'Experiência íntima de Fado com músicos tradicionais vindos diretamente de Lisboa. Uma noite para relembrar as nossas raízes musicais.'
        : 'Intimate Fado experience with traditional musicians coming directly from Lisbon. A night to remember our musical roots.',
      date: '2025-08-25',
      time: '19:30',
      location: {
        name: 'Portuguese Cultural Centre',
        address: '2 Stockwell Road, London SW9 9AS',
        area: 'Stockwell',
        coordinates: { lat: 51.4729, lng: -0.1234 }
      },
      organizer: {
        id: 'ana-cultural-events',
        name: 'Ana Silva',
        isMatch: true,
        compatibility: 94,
        verified: true
      },
      category: 'cultural',
      culturalElements: ['Traditional Fado', 'Portuguese Wine', 'Cultural History', 'Community Singing'],
      attendees: {
        confirmed: 45,
        capacity: 80,
        matches: 7,
        following: 12
      },
      pricing: {
        isFree: false,
        price: '£15',
        includes: ['Fado performance', 'Portuguese appetizers', 'Wine tasting']
      },
      transport: {
        available: true,
        provider: 'Carlos Transport',
        pickupPoints: ['Elephant & Castle', 'Vauxhall', 'Bermondsey'],
        price: '£5 return',
        groupBooking: true
      },
      matchOpportunities: {
        compatibleAttendees: 12,
        newConnectionPotential: 'high',
        serviceProviders: ['Cultural Guide', 'Music Teacher']
      },
      requirements: {
        minimumAge: 18,
        languageLevel: 'beginner'
      },
      highlights: [
        'Professional Fado singers from Lisboa',
        'Traditional Portuguese wine selection',
        'Cultural storytelling session',
        'Meet other Portuguese music lovers'
      ],
      rsvpStatus: null,
      isBookmarked: false,
      remindersSet: false
    },
    {
      id: 'portuguese-cooking-class',
      title: isPortuguese ? 'Aula de Culinária Portuguesa' : 'Portuguese Cooking Class',
      description: isPortuguese
        ? 'Aprende a fazer pratos tradicionais portugueses com chef profissional. Desde pastéis de nata a bacalhau à brás!'
        : 'Learn to make traditional Portuguese dishes with a professional chef. From pastéis de nata to bacalhau à brás!',
      date: '2025-08-27',
      time: '14:00',
      location: {
        name: 'Taste of Portugal Kitchen',
        address: '15 Borough Market, London SE1 9AL',
        area: 'Borough',
        coordinates: { lat: 51.5054, lng: -0.0907 }
      },
      organizer: {
        id: 'chef-joao',
        name: 'Chef João Pereira',
        isMatch: false,
        verified: true
      },
      category: 'food',
      culturalElements: ['Traditional Recipes', 'Portuguese Ingredients', 'Family Cooking Stories', 'Regional Variations'],
      attendees: {
        confirmed: 18,
        capacity: 20,
        matches: 3,
        following: 5
      },
      pricing: {
        isFree: false,
        price: '£35',
        includes: ['All ingredients', 'Recipe cards', 'Cooked meal', 'Take-home pastéis de nata']
      },
      transport: {
        available: false,
        groupBooking: false
      },
      matchOpportunities: {
        compatibleAttendees: 8,
        newConnectionPotential: 'medium',
        serviceProviders: ['Portuguese Grocery Guide', 'Catering Service']
      },
      requirements: {
        languageLevel: 'beginner'
      },
      highlights: [
        'Hands-on cooking experience',
        'Learn authentic family recipes',
        'Take home recipe collection',
        'Meet fellow Portuguese food enthusiasts'
      ],
      rsvpStatus: 'interested',
      isBookmarked: true,
      remindersSet: false
    },
    {
      id: 'portuguese-business-networking',
      title: isPortuguese ? 'Networking Empresarial Português' : 'Portuguese Business Networking',
      description: isPortuguese
        ? 'Conecta-te com empresários e profissionais portugueses em Londres. Oportunidades de negócio e parcerias.'
        : 'Connect with Portuguese entrepreneurs and professionals in London. Business opportunities and partnerships.',
      date: '2025-08-29',
      time: '18:00',
      location: {
        name: 'The Shard - Level 31',
        address: '31 London Bridge St, London SE1 9SG',
        area: 'London Bridge',
        coordinates: { lat: 51.5045, lng: -0.0865 }
      },
      organizer: {
        id: 'portuguese-business-uk',
        name: 'Portuguese Business Network UK',
        isMatch: false,
        verified: true
      },
      category: 'professional',
      culturalElements: ['Business Culture Exchange', 'Portuguese Market Insights', 'Cultural Networking'],
      attendees: {
        confirmed: 67,
        capacity: 100,
        matches: 5,
        following: 8
      },
      pricing: {
        isFree: false,
        price: '£25',
        includes: ['Welcome drink', 'Networking session', 'Portuguese appetizers', 'Business card exchange']
      },
      transport: {
        available: true,
        provider: 'Sofia Business Transport',
        pickupPoints: ['Canary Wharf', 'Bank Station', 'Liverpool Street'],
        price: '£8 return',
        groupBooking: true
      },
      matchOpportunities: {
        compatibleAttendees: 15,
        newConnectionPotential: 'high',
        serviceProviders: ['Business Consultant', 'Legal Advisor', 'Financial Services']
      },
      requirements: {
        minimumAge: 21,
        membershipRequired: true
      },
      highlights: [
        'High-level networking opportunities',
        'Portuguese business success stories',
        'Partnership opportunities',
        'Professional development workshops'
      ],
      rsvpStatus: 'attending',
      isBookmarked: true,
      remindersSet: true
    },
    {
      id: 'portuguese-families-picnic',
      title: isPortuguese ? 'Piquenique das Famílias Portuguesas' : 'Portuguese Families Picnic',
      description: isPortuguese
        ? 'Dia divertido para famílias portuguesas com atividades para crianças, comida tradicional e jogos culturais.'
        : 'Fun day for Portuguese families with children\'s activities, traditional food, and cultural games.',
      date: '2025-08-31',
      time: '11:00',
      location: {
        name: 'Battersea Park',
        address: 'Battersea Park, London SW11 4NJ',
        area: 'Battersea',
        coordinates: { lat: 51.4816, lng: -0.1547 }
      },
      organizer: {
        id: 'portuguese-families-london',
        name: 'Portuguese Families London',
        isMatch: false,
        verified: true
      },
      category: 'social',
      culturalElements: ['Traditional Games', 'Portuguese Stories', 'Folk Dancing', 'Language Activities'],
      attendees: {
        confirmed: 89,
        capacity: 150,
        matches: 9,
        following: 15
      },
      pricing: {
        isFree: true,
        includes: ['Family activities', 'Traditional games', 'Cultural workshops', 'Children\'s entertainment']
      },
      transport: {
        available: true,
        provider: 'Family Transport Coordination',
        pickupPoints: ['Stockwell', 'Vauxhall', 'Elephant & Castle', 'Bermondsey'],
        price: 'Free for families',
        groupBooking: true
      },
      matchOpportunities: {
        compatibleAttendees: 23,
        newConnectionPotential: 'high',
        serviceProviders: ['Childcare Services', 'Educational Services', 'Family Photography']
      },
      requirements: {
        languageLevel: 'beginner'
      },
      highlights: [
        'Family-friendly environment',
        'Children\'s Portuguese language activities',
        'Traditional Portuguese picnic food',
        'Cultural games and entertainment'
      ],
      rsvpStatus: null,
      isBookmarked: false,
      remindersSet: false
    },
    {
      id: 'portuguese-students-study-group',
      title: isPortuguese ? 'Grupo de Estudo Universitário' : 'Portuguese University Study Group',
      description: isPortuguese
        ? 'Sessão de estudo colaborativo para estudantes universitários portugueses. Partilhar recursos e apoio académico.'
        : 'Collaborative study session for Portuguese university students. Share resources and academic support.',
      date: '2025-08-26',
      time: '16:00',
      location: {
        name: 'British Library',
        address: '96 Euston Rd, London NW1 2DB',
        area: 'King\'s Cross',
        coordinates: { lat: 51.5297, lng: -0.1276 }
      },
      organizer: {
        id: 'beatriz-student-leader',
        name: 'Beatriz Costa',
        isMatch: true,
        compatibility: 85,
        verified: false
      },
      category: 'social',
      culturalElements: ['Academic Support', 'Portuguese Study Resources', 'Cultural Academic Exchange'],
      attendees: {
        confirmed: 24,
        capacity: 30,
        matches: 4,
        following: 7
      },
      pricing: {
        isFree: true,
        includes: ['Study space reservation', 'Resource sharing', 'Group discussion', 'Academic support']
      },
      transport: {
        available: false,
        groupBooking: false
      },
      matchOpportunities: {
        compatibleAttendees: 12,
        newConnectionPotential: 'medium',
        serviceProviders: ['Academic Tutor', 'Career Advisor']
      },
      requirements: {
        languageLevel: 'intermediate',
        minimumAge: 18
      },
      highlights: [
        'Academic collaboration',
        'Study technique sharing',
        'Portuguese academic resources',
        'Student networking'
      ],
      rsvpStatus: null,
      isBookmarked: false,
      remindersSet: false
    }
  ], [isPortuguese])

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let events = eventMeetups

    // Filter by category
    if (filterCategory !== 'all') {
      events = events.filter(event => event.category === filterCategory)
    }

    // Sort events
    switch (sortBy) {
      case 'date':
        events = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'matches':
        events = events.sort((a, b) => b.attendees.matches - a.attendees.matches)
        break
      case 'compatibility':
        events = events.sort((a, b) => {
          const aScore = a.organizer.compatibility || 0
          const bScore = b.organizer.compatibility || 0
          return bScore - aScore
        })
        break
      case 'proximity':
        // Mock proximity sorting (in real app, would use actual distance)
        events = events.sort((a, b) => a.location.area.localeCompare(b.location.area))
        break
    }

    return events
  }, [eventMeetups, filterCategory, sortBy])

  const getCategoryIcon = (category: EventMeetup['category']) => {
    switch (category) {
      case 'cultural': return <SparklesIcon className="w-4 h-4" />
      case 'social': return <UsersIcon className="w-4 h-4" />
      case 'professional': return <ChatBubbleLeftRightIcon className="w-4 h-4" />
      case 'food': return <HeartIcon className="w-4 h-4" />
      case 'music': return <CalendarDaysIcon className="w-4 h-4" />
      case 'sports': return <UsersIcon className="w-4 h-4" />
    }
  }

  const getCategoryLabel = (category: EventMeetup['category']) => {
    if (isPortuguese) {
      switch (category) {
        case 'cultural': return 'Cultural'
        case 'social': return 'Social'
        case 'professional': return 'Profissional'
        case 'food': return 'Culinária'
        case 'music': return 'Música'
        case 'sports': return 'Desporto'
      }
    } else {
      switch (category) {
        case 'cultural': return 'Cultural'
        case 'social': return 'Social'
        case 'professional': return 'Professional'
        case 'food': return 'Food'
        case 'music': return 'Music'
        case 'sports': return 'Sports'
      }
    }
  }

  const getConnectionPotentialColor = (potential: 'high' | 'medium' | 'low') => {
    switch (potential) {
      case 'high': return 'text-action-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-secondary-600 bg-secondary-100'
    }
  }

  const handleRSVP = (eventId: string, status: 'attending' | 'interested' | 'declined') => {
    onRSVP(eventId, status)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return isPortuguese 
      ? date.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })
      : date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarDaysIcon className="w-6 h-6 text-primary-500" />
              {isPortuguese ? 'Coordenação de Eventos para Matches' : 'Event Coordination for Matches'}
            </h2>
            <p className="text-secondary-600">
              {isPortuguese 
                ? 'Encontra eventos onde os teus matches estarão presentes'
                : 'Find events where your matches will be attending'
              }
            </p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="all">{isPortuguese ? 'Todas as Categorias' : 'All Categories'}</option>
              <option value="cultural">{isPortuguese ? 'Cultural' : 'Cultural'}</option>
              <option value="social">{isPortuguese ? 'Social' : 'Social'}</option>
              <option value="professional">{isPortuguese ? 'Profissional' : 'Professional'}</option>
              <option value="food">{isPortuguese ? 'Culinária' : 'Food'}</option>
              <option value="music">{isPortuguese ? 'Música' : 'Music'}</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="date">{isPortuguese ? 'Data' : 'Date'}</option>
              <option value="matches">{isPortuguese ? 'Matches Presentes' : 'Matches Attending'}</option>
              <option value="compatibility">{isPortuguese ? 'Compatibilidade' : 'Compatibility'}</option>
              <option value="proximity">{isPortuguese ? 'Proximidade' : 'Proximity'}</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-xl font-bold text-primary-600">{filteredEvents.length}</div>
            <div className="text-sm text-primary-700">
              {isPortuguese ? 'Eventos Disponíveis' : 'Available Events'}
            </div>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-xl font-bold text-secondary-600">
              {filteredEvents.reduce((acc, event) => acc + event.attendees.matches, 0)}
            </div>
            <div className="text-sm text-secondary-700">
              {isPortuguese ? 'Matches nos Eventos' : 'Matches at Events'}
            </div>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-xl font-bold text-accent-600">
              {filteredEvents.filter(e => e.transport.available).length}
            </div>
            <div className="text-sm text-accent-700">
              {isPortuguese ? 'Com Transporte' : 'With Transport'}
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xl font-bold text-action-600">
              {filteredEvents.filter(e => e.pricing.isFree).length}
            </div>
            <div className="text-sm text-green-700">
              {isPortuguese ? 'Eventos Grátis' : 'Free Events'}
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${
                      event.category === 'cultural' ? 'from-purple-500 to-violet-500' :
                      event.category === 'social' ? 'from-blue-500 to-cyan-500' :
                      event.category === 'professional' ? 'from-green-500 to-emerald-500' :
                      event.category === 'food' ? 'from-orange-500 to-amber-500' :
                      'from-pink-500 to-rose-500'
                    }`}>
                      {getCategoryIcon(event.category)}
                      <span className="sr-only">{getCategoryLabel(event.category)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-secondary-600">
                        <span>{getCategoryLabel(event.category)}</span>
                        {event.organizer.isMatch && (
                          <span className="flex items-center gap-1 bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                            <HeartSolidIcon className="w-3 h-3" />
                            {isPortuguese ? 'Teu Match' : 'Your Match'}
                          </span>
                        )}
                        {event.organizer.verified && (
                          <span className="text-action-600">✓ {isPortuguese ? 'Verificado' : 'Verified'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-secondary-700 mb-4 line-clamp-2">{event.description}</p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => onBookmarkEvent(event.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      event.isBookmarked 
                        ? 'text-yellow-600 bg-yellow-100' 
                        : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                    }`}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onSetReminder(event.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      event.remindersSet 
                        ? 'text-primary-600 bg-blue-100' 
                        : 'text-gray-400 hover:text-primary-600 hover:bg-blue-50'
                    }`}
                  >
                    {event.remindersSet ? <BellSolidIcon className="w-5 h-5" /> : <BellIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
                    <div className="text-sm text-secondary-600">{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{event.location.name}</div>
                    <div className="text-sm text-secondary-600">{event.location.area}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CurrencyPoundIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {event.pricing.isFree ? (isPortuguese ? 'Grátis' : 'Free') : event.pricing.price}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {event.attendees.confirmed}/{event.attendees.capacity} {isPortuguese ? 'confirmados' : 'confirmed'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Opportunities */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4 border border-primary-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-600">{event.attendees.matches}</div>
                    <div className="text-sm text-primary-700">
                      {isPortuguese ? 'Teus Matches' : 'Your Matches'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-secondary-600">{event.matchOpportunities.compatibleAttendees}</div>
                    <div className="text-sm text-secondary-700">
                      {isPortuguese ? 'Compatíveis' : 'Compatible'}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConnectionPotentialColor(event.matchOpportunities.newConnectionPotential)}`}>
                      {event.matchOpportunities.newConnectionPotential === 'high' ? (isPortuguese ? 'Alta' : 'High') :
                       event.matchOpportunities.newConnectionPotential === 'medium' ? (isPortuguese ? 'Média' : 'Medium') :
                       (isPortuguese ? 'Baixa' : 'Low')}
                    </span>
                    <div className="text-sm text-secondary-600 mt-1">
                      {isPortuguese ? 'Probabilidade' : 'Connection Potential'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transport Info */}
              {event.transport.available && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TruckIcon className="w-4 h-4 text-primary-600" />
                      <span className="font-medium text-blue-800">
                        {isPortuguese ? 'Transporte Disponível' : 'Transport Available'}
                      </span>
                      <span className="text-sm text-primary-600">• {event.transport.price}</span>
                    </div>
                    <button
                      onClick={() => event.transport.pickupPoints && onBookTransport(event.id, event.transport.pickupPoints[0])}
                      className="text-sm bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {isPortuguese ? 'Reservar' : 'Book'}
                    </button>
                  </div>
                  {event.transport.pickupPoints && (
                    <div className="text-sm text-primary-600 mt-1">
                      {isPortuguese ? 'Pontos de recolha:' : 'Pickup points:'} {event.transport.pickupPoints.join(', ')}
                    </div>
                  )}
                </div>
              )}

              {/* Event Highlights */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-secondary-700 mb-2">
                  {isPortuguese ? 'Destaques' : 'Highlights'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {event.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-action-500 flex-shrink-0" />
                      <span className="text-secondary-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RSVP Status */}
              {event.rsvpStatus && (
                <div className={`mb-4 p-3 rounded-lg border ${
                  event.rsvpStatus === 'attending' ? 'bg-green-50 border-green-200' :
                  event.rsvpStatus === 'interested' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className={`w-4 h-4 ${
                      event.rsvpStatus === 'attending' ? 'text-action-600' :
                      event.rsvpStatus === 'interested' ? 'text-yellow-600' :
                      'text-coral-600'
                    }`} />
                    <span className={`text-sm font-medium ${
                      event.rsvpStatus === 'attending' ? 'text-green-800' :
                      event.rsvpStatus === 'interested' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      {event.rsvpStatus === 'attending' ? (isPortuguese ? 'Vais participar' : 'You\'re attending') :
                       event.rsvpStatus === 'interested' ? (isPortuguese ? 'Tens interesse' : 'You\'re interested') :
                       (isPortuguese ? 'Não vais participar' : 'You declined')}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  {!event.rsvpStatus && (
                    <>
                      <button
                        onClick={() => handleRSVP(event.id, 'attending')}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        {isPortuguese ? 'Participar' : 'Attend'}
                      </button>
                      <button
                        onClick={() => handleRSVP(event.id, 'interested')}
                        className="flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                      >
                        <HeartIcon className="w-4 h-4" />
                        {isPortuguese ? 'Interessado' : 'Interested'}
                      </button>
                    </>
                  )}
                  
                  {event.organizer.isMatch && (
                    <button
                      onClick={() => onMessageOrganizer(event.organizer.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      {isPortuguese ? 'Conversar' : 'Message'}
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowInviteModal(true)}
                    disabled={event.attendees.matches === 0}
                    className="flex items-center gap-1 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    {isPortuguese ? 'Convidar Matches' : 'Invite Matches'}
                  </button>
                  
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg text-sm font-medium hover:bg-secondary-200 transition-colors"
                  >
                    {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-700 mb-2">
            {isPortuguese ? 'Nenhum Evento Encontrado' : 'No Events Found'}
          </h3>
          <p className="text-gray-500">
            {isPortuguese 
              ? 'Tenta ajustar os filtros para encontrar mais eventos'
              : 'Try adjusting the filters to find more events'
            }
          </p>
        </div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedEvent.title}
                  </h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-gray-500 hover:text-secondary-700"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Detailed event content would go here */}
                <div className="text-center py-8">
                  <p className="text-secondary-600">
                    {isPortuguese 
                      ? 'Detalhes completos do evento, lista de participantes, e opções de coordenação...'
                      : 'Full event details, attendee list, and coordination options...'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}