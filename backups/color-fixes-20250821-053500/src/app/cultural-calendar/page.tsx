'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  ClockIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  CakeIcon,
  SparklesIcon,
  HeartIcon,
  ShareIcon,
  FlagIcon,
  GlobeAltIcon,
  BanknotesIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'

// Mock cultural events data
const mockCulturalEvents = [
  {
    id: 1,
    title: 'Santos Populares Festival London',
    date: '2024-06-13',
    time: '6:00 PM - 11:00 PM',
    location: 'Potters Fields Park, London Bridge',
    category: 'Festival',
    type: 'Community Event',
    description: 'Join us for the biggest Portuguese cultural celebration in London! Traditional music, food, and festivities celebrating São António.',
    organizer: 'Portuguese Cultural Association',
    attendees: 245,
    maxAttendees: 500,
    price: 'Free',
    image: '/images/events/santos-populares.jpg',
    featured: true,
    tags: ['Traditional', 'Music', 'Food', 'Family-Friendly'],
    highlights: ['Traditional Sardines', 'Fado Music', 'Portuguese Folk Dancing', 'Caldo Verde'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 2,
    title: 'Fado Night at Portuguese Cultural Center',
    date: '2024-06-20',
    time: '8:00 PM - 10:30 PM',
    location: 'Portuguese Cultural Center, South Lambeth',
    category: 'Music',
    type: 'Cultural Performance',
    description: 'An intimate evening of traditional Fado music featuring renowned Portuguese musicians.',
    organizer: 'Fado Society London',
    attendees: 45,
    maxAttendees: 60,
    price: '£18',
    image: '/images/events/fado-night.jpg',
    featured: false,
    tags: ['Music', 'Traditional', 'Adults Only'],
    highlights: ['Professional Fado Singers', 'Traditional Portuguese Wine', 'Authentic Atmosphere'],
    rating: 4.8,
    reviews: 23
  },
  {
    id: 3,
    title: 'Portuguese Independence Day Celebration',
    date: '2024-12-01',
    time: '2:00 PM - 8:00 PM',
    location: 'Trafalgar Square, Central London',
    category: 'National Holiday',
    type: 'Public Celebration',
    description: 'Celebrate Portugal\'s Independence Day with cultural performances, food stalls, and community activities.',
    organizer: 'Portuguese Embassy & Community Groups',
    attendees: 180,
    maxAttendees: 1000,
    price: 'Free',
    image: '/images/events/independence-day.jpg',
    featured: true,
    tags: ['National Holiday', 'Cultural', 'Family-Friendly', 'Music'],
    highlights: ['Official Ceremony', 'Portuguese Choir', 'Traditional Crafts', 'Food Festival'],
    rating: 4.9,
    reviews: 67
  },
  {
    id: 4,
    title: 'Portuguese Wine Tasting & Cultural Evening',
    date: '2024-06-25',
    time: '7:00 PM - 10:00 PM',
    location: 'Noble Green Wines, Borough Market',
    category: 'Food & Drink',
    type: 'Tasting Event',
    description: 'Discover the finest Portuguese wines while learning about regional wine-making traditions.',
    organizer: 'Portuguese Wine Society',
    attendees: 28,
    maxAttendees: 40,
    price: '£35',
    image: '/images/events/wine-tasting.jpg',
    featured: false,
    tags: ['Wine', 'Education', 'Adults Only', 'Premium'],
    highlights: ['6 Regional Wines', 'Portuguese Cheese Selection', 'Wine Expert Guide'],
    rating: 4.7,
    reviews: 15
  },
  {
    id: 5,
    title: 'Festa Junina Brazilian-Portuguese Celebration',
    date: '2024-06-24',
    time: '12:00 PM - 6:00 PM',
    location: 'Burgess Park, Southwark',
    category: 'Festival',
    type: 'Cultural Celebration',
    description: 'Experience the joy of Festa Junina with traditional games, quadrilha dancing, and delicious Brazilian-Portuguese food.',
    organizer: 'Brazilian-Portuguese Alliance',
    attendees: 156,
    maxAttendees: 300,
    price: '£8',
    image: '/images/events/festa-junina.jpg',
    featured: true,
    tags: ['Brazilian-Portuguese', 'Dancing', 'Games', 'Family-Friendly'],
    highlights: ['Quadrilha Dancing', 'Traditional Games', 'Canjica & Pamonha', 'Live Music'],
    rating: 4.8,
    reviews: 41
  },
  {
    id: 6,
    title: 'Portuguese Language & Culture Workshop',
    date: '2024-06-22',
    time: '10:00 AM - 4:00 PM',
    location: 'King\'s College London, Strand Campus',
    category: 'Education',
    type: 'Workshop',
    description: 'Full-day workshop exploring Portuguese language, literature, and cultural traditions for academics and enthusiasts.',
    organizer: 'Instituto Camões & King\'s College',
    attendees: 35,
    maxAttendees: 50,
    price: '£25',
    image: '/images/events/culture-workshop.jpg',
    featured: false,
    tags: ['Education', 'Academic', 'Language', 'Literature'],
    highlights: ['Expert Speakers', 'Interactive Sessions', 'Cultural Displays', 'Certificate'],
    rating: 4.9,
    reviews: 28
  },
  {
    id: 7,
    title: 'Portuguese Football Watch Party - Euro 2024',
    date: '2024-06-18',
    time: '8:00 PM - 11:00 PM',
    location: 'O\'Neill\'s Pub, Leicester Square',
    category: 'Sports',
    type: 'Watch Party',
    description: 'Cheer for Portugal with fellow supporters! Big screens, Portuguese commentary, and match atmosphere.',
    organizer: 'Portuguese Football Supporters Club',
    attendees: 89,
    maxAttendees: 120,
    price: 'Free (drinks purchased separately)',
    image: '/images/events/football-watch.jpg',
    featured: false,
    tags: ['Sports', 'Football', 'Social', 'Adults'],
    highlights: ['Large Screens', 'Portuguese Commentary', 'Team Atmosphere', 'Portuguese Snacks'],
    rating: 4.6,
    reviews: 34
  },
  {
    id: 8,
    title: 'Traditional Portuguese Christmas Market',
    date: '2024-12-15',
    time: '11:00 AM - 8:00 PM',
    location: 'South Bank, London',
    category: 'Holiday',
    type: 'Market',
    description: 'Experience a traditional Portuguese Christmas with handmade crafts, festive foods, and holiday music.',
    organizer: 'Portuguese Christmas Committee',
    attendees: 78,
    maxAttendees: 400,
    price: 'Free entry',
    image: '/images/events/christmas-market.jpg',
    featured: true,
    tags: ['Christmas', 'Market', 'Crafts', 'Family-Friendly'],
    highlights: ['Handmade Crafts', 'Traditional Sweets', 'Carol Singing', 'Santa Photos'],
    rating: 4.8,
    reviews: 52
  }
]

const categories = ['All Categories', 'Festival', 'Music', 'National Holiday', 'Food & Drink', 'Education', 'Sports', 'Holiday']
const months = [
  'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function CulturalCalendarPage() {
  const { t } = useLanguage()
  const [events, setEvents] = useState(mockCulturalEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockCulturalEvents)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedMonth, setSelectedMonth] = useState('All Months')
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter events based on criteria
  useEffect(() => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    if (selectedMonth !== 'All Months') {
      const monthIndex = months.indexOf(selectedMonth)
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getMonth() + 1 === monthIndex
      })
    }

    if (showFreeOnly) {
      filtered = filtered.filter(event => event.price === 'Free' || event.price.includes('Free'))
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory, selectedMonth, showFreeOnly])

  const toggleSaveEvent = (eventId: number) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Festival': return <SparklesIcon className="w-5 h-5" />
      case 'Music': return <MusicalNoteIcon className="w-5 h-5" />
      case 'National Holiday': return <FlagIcon className="w-5 h-5" />
      case 'Food & Drink': return <CakeIcon className="w-5 h-5" />
      case 'Education': return <CalendarDaysIcon className="w-5 h-5" />
      case 'Sports': return <UserGroupIcon className="w-5 h-5" />
      case 'Holiday': return <SparklesIcon className="w-5 h-5" />
      default: return <CalendarDaysIcon className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-premium-600 via-coral-600 to-action-600 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <CalendarDaysIcon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Portuguese Cultural Calendar</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Celebrate Portuguese Culture in London
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover authentic Portuguese festivals, cultural events, and celebrations happening throughout London
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-white/80">Annual Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-white/80">Festivals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,500+</div>
                  <div className="text-white/80">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">Year-Round</div>
                  <div className="text-white/80">Celebrations</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cultural events, festivals, or traditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-premium-500 focus:border-transparent text-lg"
                />
              </div>
              <button className="bg-premium-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-premium-700 transition-colors whitespace-nowrap">
                Search Events
              </button>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-premium-500 focus:border-transparent"
                >
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>

                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="rounded text-premium-600 focus:ring-premium-500"
                  />
                  <span className="text-sm font-medium">Free Events Only</span>
                </label>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-premium-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-premium-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredEvents.length}</span> cultural events found
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
        </div>
      </section>

      {/* Event Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-xl border ${event.featured ? 'border-premium-300 ring-2 ring-premium-100' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  {/* Event Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-premium-100 to-coral-100">
                    {event.featured && (
                      <div className="absolute top-3 left-3 bg-premium-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleSaveEvent(event.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          savedEvents.includes(event.id)
                            ? 'bg-premium-600 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <HeartIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/80 text-gray-600 hover:bg-white transition-colors">
                        <ShareIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getCategoryIcon(event.category)}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      {getCategoryIcon(event.category)}
                      <span className="text-sm font-medium text-premium-600">{event.category}</span>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{event.title}</h3>

                    {/* Date and Time */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-premium-100 text-premium-700 px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Event Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{event.rating} ({event.reviews})</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-premium-600">{event.price}</span>
                      <button className="bg-premium-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-premium-700 transition-colors">
                        View Event
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-xl border ${event.featured ? 'border-premium-300 ring-2 ring-premium-100' : 'border-gray-200'} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Event Image Placeholder */}
                    <div className="w-full lg:w-48 h-32 lg:h-24 bg-gradient-to-br from-premium-100 to-coral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(event.category)}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          {event.featured && (
                            <span className="inline-block bg-premium-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                              Featured
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarDaysIcon className="w-4 h-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{event.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.slice(0, 4).map((tag, idx) => (
                              <span key={idx} className="bg-premium-100 text-premium-700 px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Area */}
                        <div className="flex lg:flex-col items-start lg:items-end gap-4">
                          <div className="text-right">
                            <div className="text-xl font-bold text-premium-600 mb-1">{event.price}</div>
                            <div className="text-sm text-gray-600">{event.attendees}/{event.maxAttendees} attending</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleSaveEvent(event.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                savedEvents.includes(event.id)
                                  ? 'bg-premium-100 text-premium-600'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <HeartIcon className="w-5 h-5" />
                            </button>
                            <button className="bg-premium-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-premium-700 transition-colors">
                              View Event
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarDaysIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No cultural events found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Event CTA */}
      <section className="bg-gradient-to-r from-premium-50 to-coral-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Organizing a Portuguese Cultural Event?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Share your event with the Portuguese community in London and help preserve our culture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-premium-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-premium-700 transition-colors">
                Submit Event
              </button>
              <button className="border border-premium-600 text-premium-600 px-8 py-3 rounded-lg font-semibold hover:bg-premium-50 transition-colors">
                Cultural Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}