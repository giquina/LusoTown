'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  PhotoIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import { Event, EventFilters, eventService, EVENT_CATEGORIES } from '@/lib/events'

const EventCard = ({ event }: { event: Event }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const spotsLeft = event.maxAttendees - event.currentAttendees
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  // Photo gallery modal component
  const PhotoGalleryModal = () => (
    <AnimatePresence>
      {showPhotoGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowPhotoGallery(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Event Photos</h3>
              <button 
                onClick={() => setShowPhotoGallery(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.photos?.map((photo) => (
                <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                  <EventImageWithFallback
                    src={photo.url}
                    alt={photo.caption || 'Event photo'}
                    category={event.category}
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
                  />
                  {photo.caption && (
                    <p className="mt-2 text-sm text-gray-600">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <EventImageWithFallback
            src={event.images?.[0] || ''}
            alt={event.title}
            category={event.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            priority
          />
          
          {/* Photo Gallery Indicator */}
          {event.photos && event.photos.length > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault()
                setShowPhotoGallery(true)
              }}
              className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full hover:bg-black/80 transition-colors flex items-center gap-1"
            >
              <PhotoIcon className="w-3 h-3" />
              {event.photos.length}
            </button>
          )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
              ⭐ FEATURED
            </span>
          )}
          {event.verifiedEvent && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ✓ VERIFIED
            </span>
          )}
        </div>

        {/* Favorite & Share */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorited(!isFavorited)
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            {isFavorited ? (
              <HeartSolidIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <ShareIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Availability Status */}
        <div className="absolute bottom-3 left-3">
          {isFull ? (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              FULL {event.allowWaitlist && '• JOIN WAITLIST'}
            </span>
          ) : isAlmostFull ? (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {spotsLeft} SPOT{spotsLeft === 1 ? '' : 'S'} LEFT
            </span>
          ) : (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {spotsLeft} SPOTS AVAILABLE
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Event Details */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-primary-600">
              {event.price === 0 ? 'FREE' : `£${event.price}`}
            </div>
            {event.membershipRequired !== 'free' && (
              <div className="text-xs text-gray-500 capitalize">
                {event.membershipRequired}+ required
              </div>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{formatTime(event.time)}{event.endTime && ` - ${formatTime(event.endTime)}`}</span>
          </div>
          {event.ageRestriction && (
            <div className="flex items-center gap-1">
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                {event.ageRestriction}
              </span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
          <MapPinIcon className="w-4 h-4" />
          <span className="truncate">{event.location}, {event.address.split(',')[1]}</span>
        </div>

        {/* Host & Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {event.hostImage ? (
              <img 
                src={event.hostImage} 
                alt={event.hostName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-md"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold ring-2 ring-white shadow-md">
                {event.hostName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <span className="text-sm text-gray-700 font-medium">{event.hostName}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <UserGroupIcon className="w-4 h-4" />
              <span>{event.currentAttendees}</span>
            </div>
            {event.averageRating > 0 && (
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{event.averageRating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Attendee Photos */}
        {event.attendees && event.attendees.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">Going:</span>
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 5).map((attendee, index) => (
                  <div
                    key={attendee.id}
                    className="relative"
                  >
                    {attendee.profileImage ? (
                      <img
                        src={attendee.profileImage}
                        alt={attendee.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm hover:scale-110 transition-transform"
                        title={attendee.name}
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-primary-300 to-secondary-300 flex items-center justify-center text-white text-xs font-bold shadow-sm hover:scale-110 transition-transform"
                        title={attendee.name}
                      >
                        {attendee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white text-xs flex items-center justify-center ${
                      attendee.membershipTier === 'premium' ? 'bg-purple-500' : 
                      attendee.membershipTier === 'core' ? 'bg-secondary-500' : 'bg-green-500'
                    }`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                ))}
                {event.attendees.length > 5 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold shadow-sm">
                    +{event.attendees.length - 5}
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {event.attendees.filter(a => a.membershipTier === 'premium').length > 0 && (
                <span className="inline-flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  {event.attendees.filter(a => a.membershipTier === 'premium').length} Premium
                </span>
              )}
              {event.attendees.filter(a => a.membershipTier === 'core').length > 0 && (
                <span className="inline-flex items-center gap-1 ml-3">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  {event.attendees.filter(a => a.membershipTier === 'core').length} Core
                </span>
              )}
              {event.attendees.filter(a => a.membershipTier === 'free').length > 0 && (
                <span className="inline-flex items-center gap-1 ml-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {event.attendees.filter(a => a.membershipTier === 'free').length} Free
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={`/events/${event.id}`}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center block"
        >
          {isFull ? 'Join Waitlist' : 'View Details & RSVP'}
        </a>
      </div>
      </motion.div>
      
      {/* Photo Gallery Modal */}
      <PhotoGalleryModal />
    </>
  )
}

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange 
}: { 
  isOpen: boolean
  onClose: () => void
  filters: EventFilters
  onFilterChange: (filters: EventFilters) => void 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:relative lg:shadow-none lg:bg-transparent"
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {Object.entries(EVENT_CATEGORIES).map(([category, info]) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!filters.category}
                      onChange={() => onFilterChange({ ...filters, category: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">All Categories</span>
                  </label>
                </div>
              </div>

              {/* Membership Level */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Membership Access</h4>
                <div className="space-y-2">
                  {[
                    { value: 'free', label: 'Free Members' },
                    { value: 'core', label: 'Core Members+' },
                    { value: 'premium', label: 'Premium Only' }
                  ].map((tier) => (
                    <label key={tier.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="membershipLevel"
                        value={tier.value}
                        checked={filters.membershipLevel === tier.value}
                        onChange={(e) => onFilterChange({ ...filters, membershipLevel: e.target.value as any })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{tier.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="membershipLevel"
                      value=""
                      checked={!filters.membershipLevel}
                      onChange={() => onFilterChange({ ...filters, membershipLevel: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">All Levels</span>
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Availability</h4>
                <div className="space-y-2">
                  {[
                    { value: 'available', label: 'Available Now' },
                    { value: 'waitlist', label: 'Waitlist Only' },
                    { value: 'all', label: 'Show All' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={(e) => onFilterChange({ ...filters, availability: e.target.value as any })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { min: 0, max: 0, label: 'Free' },
                    { min: 1, max: 25, label: '£1 - £25' },
                    { min: 26, max: 50, label: '£26 - £50' },
                    { min: 51, max: 100, label: '£51 - £100' },
                    { min: 101, max: 999, label: '£100+' }
                  ].map((range) => (
                    <label key={`${range.min}-${range.max}`} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={`${range.min}-${range.max}`}
                        checked={filters.priceRange?.min === range.min && filters.priceRange?.max === range.max}
                        onChange={() => onFilterChange({ ...filters, priceRange: { min: range.min, max: range.max } })}
                        className="text-primary-500 focus:ring-primary-400"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value=""
                      checked={!filters.priceRange}
                      onChange={() => onFilterChange({ ...filters, priceRange: undefined })}
                      className="text-primary-500 focus:ring-primary-400"
                    />
                    <span className="text-sm">Any Price</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => onFilterChange({})}
                className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<EventFilters>({})
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'rating'>('date')

  useEffect(() => {
    loadEvents()
  }, [filters, sortBy])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const searchFilters = { ...filters }
      if (searchQuery) {
        searchFilters.searchQuery = searchQuery
      }
      
      const eventData = await eventService.getEvents(searchFilters, { field: sortBy, direction: 'asc' })
      setEvents(eventData)
    } catch (error) {
      console.error('Error loading events:', error)
    }
    setLoading(false)
  }

  const handleSearch = () => {
    loadEvents()
  }

  const handleFilterChange = (newFilters: EventFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>
          
          <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Discover Amazing{' '}
                <span className="gradient-text">Events</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 mb-8"
              >
                Join the Portuguese community across the UK for meaningful experiences, new friendships, and unforgettable cultural adventures. Family-friendly events welcoming children, adults, and seniors from our Portuguese-speaking community.
              </motion.p>

              {/* Event Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">150+</div>
                  <div className="text-sm text-gray-600">UK Events This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">UK Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </motion.div>
              
              {/* Enhanced Search Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative max-w-2xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search events across the UK by name, location, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-24 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium shadow-lg"
                >
                  Search
                </button>
              </motion.div>

              {/* Quick Category Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {Object.keys(EVENT_CATEGORIES).slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters({ ...filters, category: category === filters.category ? undefined : category })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filters.category === category
                        ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                        : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-lg font-bold mb-6">Filter Events</h3>
                  <FilterSidebar
                    isOpen={true}
                    onClose={() => {}}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>

              {/* Events Grid */}
              <div className="flex-1">
                {/* Controls */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <AdjustmentsHorizontalIcon className="w-5 h-5" />
                      <span>Filters</span>
                    </button>
                    
                    <div className="text-gray-600">
                      {loading ? 'Loading...' : `${events.length} event${events.length === 1 ? '' : 's'} found`}
                    </div>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                </div>

                {/* Events Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or clear your filters.
                    </p>
                    <button
                      onClick={() => {
                        setFilters({})
                        setSearchQuery('')
                      }}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </main>

      <Footer />
    </div>
  )
}