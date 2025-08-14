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
import SaveFavoriteCartButton from '@/components/SaveFavoriteCartButton'
import ImprovedEventCard from '@/components/ImprovedEventCard'
import { Event, EventFilters, eventService, EVENT_CATEGORIES } from '@/lib/events'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

const EventCard = ({ event }: { event: Event }) => {
  const { isSaved } = useCart()
  const { t } = useLanguage()
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const isFavorited = isSaved(event.title)
  
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
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto"
      >
        {/* Event Image Header */}
        <div className="relative h-52 overflow-hidden">
          <EventImageWithFallback
            src={event.images?.[0] || ''}
            alt={event.title}
            category={event.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            priority
          />
          
          {/* Top Overlays */}
          <div className="absolute inset-x-0 top-0 p-4">
            <div className="flex items-start justify-between">
              {/* Badges Left */}
              <div className="flex flex-col gap-2">
                {event.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ⭐ FEATURED
                  </span>
                )}
                {event.verifiedEvent && (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ✓ VERIFIED
                  </span>
                )}
              </div>

              {/* Actions Right */}
              <div className="flex gap-2">
                <SaveFavoriteCartButton
                  itemId={event.id}
                  itemType="event"
                  title={event.title}
                  description={event.description}
                  imageUrl={event.images?.[0]}
                  category={event.category}
                  eventDate={event.date}
                  eventTime={event.time}
                  eventLocation={event.location}
                  eventPrice={event.price}
                  spotsLeft={spotsLeft}
                  requiresApproval={event.requiresApproval}
                  membershipRequired={event.membershipRequired}
                  showCart={false}
                  showSave={true}
                  size="small"
                  iconOnly={true}
                  variant="default"
                  className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                />
                <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                  <ShareIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Overlays */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between">
              {/* Availability Status */}
              <div>
                {isFull ? (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    FULL {event.allowWaitlist && '• JOIN WAITLIST'}
                  </span>
                ) : isAlmostFull ? (
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {spotsLeft} SPOT{spotsLeft === 1 ? '' : 'S'} LEFT
                  </span>
                ) : (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {spotsLeft} SPOTS AVAILABLE
                  </span>
                )}
              </div>

              {/* Photo Gallery Indicator */}
              {event.photos && event.photos.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPhotoGallery(true)
                  }}
                  className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <PhotoIcon className="w-4 h-4" />
                  <span>{event.photos.length} Photos</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 space-y-4">
          {/* Header Section - Title & Price */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight">
                  {event.title}
                </h3>
                {event.ageRestriction && (
                  <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                    {event.ageRestriction}
                  </span>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold text-primary-600">
                  {event.price === 0 ? 'FREE' : `£${event.price}`}
                </div>
                {event.membershipRequired !== 'free' && (
                  <div className="text-xs text-gray-500 capitalize mt-1">
                    {event.membershipRequired}+ required
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Event Details */}
          <div className="space-y-3 border-t border-gray-100 pt-4">
            {/* Date & Time Row */}
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2 flex-1">
                <CalendarIcon className="w-4 h-4 text-primary-500" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-primary-500" />
                <span className="font-medium">{formatTime(event.time)}{event.endTime && ` - ${formatTime(event.endTime)}`}</span>
              </div>
            </div>

            {/* Location Row */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPinIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="font-medium truncate">{event.location}</span>
              <span className="text-gray-500">• {event.address.split(',')[1]?.trim()}</span>
            </div>
          </div>

          {/* Host & Stats Section */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              {event.hostImage ? (
                <img 
                  src={event.hostImage} 
                  alt={event.hostName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold ring-2 ring-primary-100 shadow-sm">
                  {event.hostName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <div className="text-sm text-gray-700 font-semibold">{event.hostName}</div>
                <div className="text-xs text-gray-500">Host</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <UserGroupIcon className="w-4 h-4" />
                <span className="font-medium">{event.currentAttendees}</span>
              </div>
              {event.averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{event.averageRating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Attendees Section */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">Going</span>
                <span className="text-xs text-gray-500">{event.attendees.length} confirmed</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {event.attendees.slice(0, 6).map((attendee, index) => (
                    <div key={attendee.id} className="relative">
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
                  {event.attendees.length > 6 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold shadow-sm">
                      +{event.attendees.length - 6}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {event.attendees.filter(a => a.membershipTier === 'premium').length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {event.attendees.filter(a => a.membershipTier === 'premium').length} Premium
                    </span>
                  )}
                  {event.attendees.filter(a => a.membershipTier === 'core').length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      {event.attendees.filter(a => a.membershipTier === 'core').length} Core
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tags Section */}
          {event.tags && event.tags.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex flex-wrap gap-2">
                {event.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {event.tags.length > 4 && (
                  <span className="text-xs text-gray-400 px-2 py-1.5">
                    +{event.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-3">
              <SaveFavoriteCartButton
                itemId={event.id}
                itemType="event"
                title={event.title}
                description={event.description}
                imageUrl={event.images?.[0]}
                category={event.category}
                eventDate={event.date}
                eventTime={event.time}
                eventLocation={event.location}
                eventPrice={event.price}
                spotsLeft={spotsLeft}
                requiresApproval={event.requiresApproval}
                membershipRequired={event.membershipRequired}
                showSave={false}
                showCart={true}
                iconOnly={false}
                className="flex-1"
              />
              <a
                href={`/events/${event.id}`}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm shadow-md hover:shadow-lg"
              >
                {isFull ? t('event.join-waitlist') : t('event.view-details')}
              </a>
            </div>
          </div>
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
  const { t } = useLanguage()
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
                {t('events.subtitle', 'Join the Portuguese community across London for meaningful experiences, new friendships, and unforgettable cultural adventures. From Fado nights in Camden to family gatherings in Stockwell - find your community.')}
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
                  <div className="text-sm text-gray-600">{t('events.stats-events', 'Portuguese Events This Month')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">{t('events.stats-members', 'Community Members')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">{t('events.stats-venues', 'Portuguese Venues')}</div>
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
                  placeholder={t('events.search-placeholder', 'Search Portuguese events by name, venue, or cultural focus...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2.5 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium shadow-lg text-sm"
                >
                  {t('events.search', 'Search')}
                </button>
              </motion.div>

              {/* Portuguese Quick Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-8"
              >
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {/* Portuguese Cultural Filters */}
                  {[
                    { key: 'fado', label: '🎵 Fado', description: 'Traditional Portuguese music' },
                    { key: 'family', label: '👨‍👩‍👧‍👦 Família', description: 'Family-friendly events' },
                    { key: 'food', label: '🍽️ Culinária', description: 'Portuguese food & cooking' },
                    { key: 'language', label: '🗣️ Português', description: 'Language exchange' },
                    { key: 'cultural', label: '🏛️ Cultural', description: 'Cultural celebrations' },
                    { key: 'business', label: '💼 Negócios', description: 'Business networking' }
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setFilters({ ...filters, category: filter.key === filters.category ? undefined : filter.key })}
                      className={`group px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        filters.category === filter.key
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg transform scale-105'
                          : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                      }`}
                      title={filter.description}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                
                {/* Location Quick Filters */}
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <span className="text-gray-500">{t('events.popular-areas', 'Popular Areas:')} </span>
                  {[
                    { area: 'Stockwell', flag: '🇵🇹' },
                    { area: 'Vauxhall', flag: '🏛️' },
                    { area: 'Camden', flag: '🎵' },
                    { area: 'Bermondsey', flag: '🏢' }
                  ].map((location) => (
                    <button
                      key={location.area}
                      onClick={() => setSearchQuery(location.area)}
                      className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      {location.flag} {location.area}
                    </button>
                  ))}
                </div>
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

                {/* Events Grid - Optimized Multi-Column Layout */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                  >
                    <AnimatePresence>
                      {events.map((event) => (
                        <ImprovedEventCard key={event.id} event={event} />
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