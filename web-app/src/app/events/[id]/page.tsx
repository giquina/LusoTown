'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Footer from '@/components/Footer'
import EventReviewSystem from '@/components/EventReviewSystem'
import { Event, EventReview, eventService } from '@/lib/events'
import { authService } from '@/lib/auth'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'



const RSVPModal = ({
  isOpen,
  onClose,
  event,
  onRSVP
}: {
  isOpen: boolean
  onClose: () => void
  event: Event
  onRSVP: (status: 'going' | 'waitlist') => void
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notes, setNotes] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const spotsLeft = event.maxAttendees - event.currentAttendees
    const status = spotsLeft > 0 ? 'going' : 'waitlist'
    
    onRSVP(status)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  RSVP to {event.title}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any questions or special requests..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dietary Requirements (Optional)
                    </label>
                    <input
                      type="text"
                      value={dietaryRequirements}
                      onChange={(e) => setDietaryRequirements(e.target.value)}
                      placeholder="e.g., Vegetarian, Gluten-free, Allergies..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>

                  {event.price > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">Payment Required</p>
                          <p>You'll be charged £{event.price} upon confirmation. {event.refundPolicy}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm RSVP'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const eventId = params?.id as string
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showRSVPModal, setShowRSVPModal] = useState(false)
  const [userRSVP, setUserRSVP] = useState<'going' | 'waitlist' | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [userHasRSVPd, setUserHasRSVPd] = useState(false)

  useEffect(() => {
    // Get current user
    const user = authService.getCurrentUser()
    setCurrentUser(user)
    loadEvent()
  }, [eventId])

  // Toast notification function
  const alert = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const loadEvent = async () => {
    if (!eventId) return
    
    setLoading(true)
    try {
      const eventData = await eventService.getEventById(eventId)
      if (!eventData) {
        setError('Event not found')
        return
      }
      setEvent(eventData)
      
      // Check if user has already RSVP'd (mock for now)
      const user = authService.getCurrentUser()
      if (user) {
        // This would be a real API call
        const userRSVPs = await eventService.getUserRSVPs(user.id)
        const existingRSVP = userRSVPs.find(rsvp => rsvp.eventId === eventId)
        if (existingRSVP) {
          setUserRSVP(existingRSVP.status === 'confirmed' ? 'going' : 'waitlist')
          setUserHasRSVPd(true)
        }
      }
    } catch (err) {
      setError('Failed to load event')
      console.error('Error loading event:', err)
    }
    setLoading(false)
  }

  const handleRSVP = async (status: 'going' | 'waitlist') => {
    const user = authService.getCurrentUser()
    if (!user) {
      router.push('/login')
      return
    }

    if (!event) return

    setIsSubmitting(true)
    
    try {
      const result = await eventService.rsvpToEvent(eventId, user.id, user)
      
      if (result.success) {
        setUserRSVP(status)
        
        // Auto-post to LusoFeed when user RSVPs
        const feedPost = {
          type: 'event_rsvp',
          eventId: eventId,
          eventName: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          userId: user.id,
          userName: user.name,
          userAvatar: user.profileImage,
          content: `I'm ${status === 'going' ? 'going to' : 'on the waitlist for'} "${event.title}"! Excited to join this event. #EventRSVP #LusoTown`,
          hashtags: ['EventRSVP', 'LusoTown'],
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: 0,
          liked: false
        }
        
        // In a real implementation, this would call an API to create the post
        console.log('Auto-posting to LusoFeed:', feedPost)
        
        alert('success', `Successfully ${status === 'going' ? 'RSVPed' : 'joined waitlist'}!`)
      } else {
        alert('error', result.message)
      }
    } catch (error) {
      console.error('Error with RSVP:', error)
      alert('error', 'Failed to process RSVP. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleCancelRSVP = async () => {
    const user = authService.getCurrentUser()
    if (!user) return

    try {
      const result = await eventService.cancelRSVP(eventId, user.id)
      if (result.success) {
        setUserRSVP(null)
        loadEvent() // Refresh event data
        alert('success', 'RSVP cancelled successfully!')
      } else {
        alert('error', result.message)
      }
    } catch (error) {
      console.error('Error cancelling RSVP:', error)
      alert('error', 'Failed to cancel RSVP. Please try again.')
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
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

  const handleReviewAdded = (newReview: EventReview) => {
    if (event) {
      const updatedEvent = { ...event }
      updatedEvent.reviews.push(newReview)
      updatedEvent.totalReviews = updatedEvent.reviews.length
      const totalRating = updatedEvent.reviews.reduce((sum, review) => sum + review.rating, 0)
      updatedEvent.averageRating = totalRating / updatedEvent.reviews.length
      setEvent(updatedEvent)
    }
  }

  const isEventHost = currentUser && event && event.hostId === currentUser.id

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <a
              href={ROUTES.events}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Browse All Events
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const spotsLeft = event ? event.maxAttendees - event.currentAttendees : 0
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative">
          {/* Image Gallery */}
          <div className="relative h-96 bg-gradient-to-r from-primary-200 to-secondary-200">
            {event.images.length > 0 ? (
              <>
                <Image 
                  src={event.images[currentImageIndex] || event.images[0]} 
                  alt={event.title}
                  fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                />
                
                {event.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : event.images.length - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev < event.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {event.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🎉
              </div>
            )}
            
            {/* Overlay Actions */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                {isFavorited ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Status Badges */}
            <div className="absolute top-6 left-6 flex gap-2">
              {event.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ⭐ FEATURED
                </span>
              )}
              {event.verifiedEvent && (
                <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ✓ VERIFIED
                </span>
              )}
            </div>

            {/* Availability Status */}
            <div className="absolute bottom-6 left-6">
              {isFull ? (
                <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  FULL {event.allowWaitlist && '• WAITLIST AVAILABLE'}
                </span>
              ) : isAlmostFull ? (
                <span className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {spotsLeft} SPOT{spotsLeft === 1 ? '' : 'S'} LEFT
                </span>
              ) : (
                <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {spotsLeft} SPOTS AVAILABLE
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12">
          <div className="container-width">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Info */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        {event.title}
                      </h1>
                      <p className="text-lg text-gray-600 mb-3">
                        {event.description}
                      </p>
                      {/* Portuguese Cultural Context */}
                      {(event.tags.includes('Portuguese') || event.tags.includes('Fado') || event.tags.includes('Cultural')) && (
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-full border border-primary-200 mb-3">
                          <span className="text-2xl">🇵🇹</span>
                          <span className="text-sm font-medium text-primary-700">
                            {t('event.portuguese-cultural-event', 'Authentic Portuguese Cultural Event')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {event.price === 0 ? 'FREE' : `£${event.price}`}
                      </div>
                      {event.membershipRequired !== 'free' && (
                        <div className="text-sm text-gray-500 capitalize">
                          {event.membershipRequired}+ required
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
                        <div className="text-sm text-gray-500">Date</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-5 h-5 text-secondary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatTime(event.time)}{event.endTime && ` - ${formatTime(event.endTime)}`}
                        </div>
                        <div className="text-sm text-gray-500">Time</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPinIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{event.location}</div>
                        <div className="text-sm text-gray-500 mb-2">{event.address}</div>
                        {/* Portuguese Venue Context */}
                        {(event.location.includes('Stockwell') || event.location.includes('Vauxhall') || event.location.includes('Portuguese')) && (
                          <div className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full inline-block">
                            🏛️ {t('event.portuguese-cultural-area', 'Portuguese Cultural Area')}
                          </div>
                        )}
                        {/* Venue Type Indicators */}
                        {event.location.includes('Church') && (
                          <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-block ml-2">
                            ⛪ {t('event.community-space', 'Community Space')}
                          </div>
                        )}
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        {t('event.view-map', 'View Map')} →
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserGroupIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{event.currentAttendees} / {event.maxAttendees}</div>
                        <div className="text-sm text-gray-500">Attendees</div>
                      </div>
                    </div>

                    {/* Age Restriction */}
                    {event.ageRestriction && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <InformationCircleIcon className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{event.ageRestriction}</div>
                          <div className="text-sm text-gray-500">Age Requirement</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <div className="prose prose-gray max-w-none">
                    {event.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* What to Expect / Bring */}
                {event.whatToBring && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Event Details</h2>
                    
                    {/* What to Expect section can be added if needed in the Event interface */}

                    {event.whatToBring && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What to Bring</h3>
                        <ul className="space-y-1">
                          {event.whatToBring.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <InformationCircleIcon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Photo Gallery */}
                {event.photos && event.photos.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Event Photos</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {event.photos.length} photos
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.photos.map((photo, index) => (
                        <motion.div
                          key={photo.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                          onClick={() => {
                            // Could implement a lightbox modal here
                            window.open(photo.url, '_blank')
                          }}
                        >
                          <Image 
                            src={photo.url}
                            alt={photo.caption || 'Event photo'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          
                          {/* Photo Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-3 w-full">
                              {photo.caption && (
                                <p className="text-white text-sm font-medium mb-1">{photo.caption}</p>
                              )}
                              <p className="text-white/80 text-xs">📸 by {photo.uploadedBy}</p>
                            </div>
                          </div>
                          
                          {/* Featured Badge */}
                          {photo.featured && (
                            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                              ⭐ Featured
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    
                    {event.photos.length > 6 && (
                      <div className="text-center mt-6">
                        <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                          View all photos ({event.photos.length}) →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Event Attendees Section */}
                {event.attendees && event.attendees.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Who's Going</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {event.attendees.length} attending
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {event.attendees.map((attendee) => (
                        <motion.div
                          key={attendee.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          className="text-center group cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative inline-block mb-2">
                            {attendee.profileImage ? (
                              <Image 
                                src={attendee.profileImage}
                                alt={attendee.name}
                                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg group-hover:shadow-xl transition-shadow"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-300 to-secondary-300 flex items-center justify-center text-white font-bold text-lg border-3 border-white shadow-lg group-hover:shadow-xl transition-shadow">
                                {attendee.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                            )}
                            
                            {/* Membership Badge */}
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                              attendee.membershipTier === 'premium' ? 'bg-purple-500' : 
                              attendee.membershipTier === 'core' ? 'bg-secondary-500' : 'bg-green-500'
                            }`}>
                              {attendee.membershipTier === 'premium' ? 'P' : 
                               attendee.membershipTier === 'core' ? 'C' : 'F'}
                            </div>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                            {attendee.name.split(' ')[0]}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize">
                            {attendee.membershipTier}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Membership Distribution */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">Community Mix:</span>
                          <div className="flex items-center gap-3">
                            {event.attendees.filter(a => a.membershipTier === 'premium').length > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-purple-700 font-medium">
                                  {event.attendees.filter(a => a.membershipTier === 'premium').length} Premium
                                </span>
                              </div>
                            )}
                            {event.attendees.filter(a => a.membershipTier === 'core').length > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                                <span className="text-secondary-700 font-medium">
                                  {event.attendees.filter(a => a.membershipTier === 'core').length} Core
                                </span>
                              </div>
                            )}
                            {event.attendees.filter(a => a.membershipTier === 'free').length > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-green-700 font-medium">
                                  {event.attendees.filter(a => a.membershipTier === 'free').length} Free
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Review System */}
                <EventReviewSystem 
                  event={event}
                  userAttended={userHasRSVPd}
                  onReviewAdded={handleReviewAdded}
                />

                {/* Review Analytics for Event Hosts */}
                {isEventHost && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Host Analytics</h2>
                      <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
                      >
                        <ChartBarIcon className="w-4 h-4" />
                        {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
                      </button>
                    </div>
                    
                    {showAnalytics && (
                      {/* ReviewAnalytics component removed */}
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* RSVP Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Join This Event</h3>
                    
                    {userRSVP ? (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${
                          userRSVP === 'going' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircleIcon className={`w-5 h-5 ${
                              userRSVP === 'going' ? 'text-green-600' : 'text-yellow-600'
                            }`} />
                            <span className={`font-medium ${
                              userRSVP === 'going' ? 'text-green-800' : 'text-yellow-800'
                            }`}>
                              {userRSVP === 'going' ? 'You\'re Going!' : 'You\'re on the Waitlist'}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            userRSVP === 'going' ? 'text-green-700' : 'text-yellow-700'
                          }`}>
                            {userRSVP === 'going' 
                              ? 'We\'ll send you event updates and reminders.' 
                              : 'You\'ll be notified if a spot opens up.'}
                          </p>
                        </div>
                        
                        <button
                          onClick={handleCancelRSVP}
                          className="w-full px-4 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                          Cancel RSVP
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {isFull && !event.allowWaitlist ? (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                              <span className="font-medium text-red-800">Event Full</span>
                            </div>
                            <p className="text-sm text-red-700">
                              This event has reached capacity and doesn't have a waitlist.
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowRSVPModal(true)}
                            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-4 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
                          >
                            {isFull ? 'Join Waitlist' : 'RSVP Now'}
                          </button>
                        )}

                        {event.price > 0 && (
                          <div className="text-center">
                            <p className="text-sm text-gray-600">
                              £{event.price} per person
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {event.refundPolicy}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Host Info */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t('event.event-organizer', 'Event Organizer')}</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                      {event.hostImage ? (
                        <Image 
                          src={event.hostImage} 
                          alt={event.hostName}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-primary-100">
                          {event.hostName.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.hostName}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">{t('event.community-organizer', 'Community Organizer')}</p>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            ✓ {t('event.verified', 'Verified')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {event.hostBio && (
                      <p className="text-sm text-gray-700 mb-4">{event.hostBio}</p>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-3 mb-4">
                      <h5 className="font-semibold text-gray-900 text-sm">{t('event.contact-organizer', 'Contact Organizer')}</h5>
                      <div className="space-y-2">
                        {/* WhatsApp Contact - Common for Portuguese-speaking community */}
                        <button className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                          <span className="text-green-600">📱</span>
                          <div className="text-left">
                            <div className="text-sm font-medium text-green-700">{t('event.whatsapp-contact', 'WhatsApp')}</div>
                            <div className="text-xs text-green-600">{t('event.quick-response', 'Usually responds within 1 hour')}</div>
                          </div>
                        </button>
                        
                        <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="text-gray-600">✉️</span>
                          <div className="text-left">
                            <div className="text-sm font-medium text-gray-700">{t('event.email-contact', 'Email')}</div>
                            <div className="text-xs text-gray-600">{t('event.detailed-questions', 'For detailed questions')}</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all">
                        {t('event.view-host-profile', 'View Host Profile')}
                      </button>
                      <button className="w-full border border-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        {t('event.message-organizer', 'Message Organizer')}
                      </button>
                    </div>
                  </div>

                  {/* Event Stats */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Event Stats</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">{event.views || 0}</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-600">{event.favorites || 0}</div>
                        <div className="text-sm text-gray-600">Favorites</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{event.shares || 0}</div>
                        <div className="text-sm text-gray-600">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{event.currentAttendees}</div>
                        <div className="text-sm text-gray-600">Going</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Modal */}
        <RSVPModal
          isOpen={showRSVPModal}
          onClose={() => setShowRSVPModal(false)}
          event={event}
          onRSVP={handleRSVP}
        />
        
        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="fixed top-4 right-4 z-50"
            >
              <div className={`rounded-lg p-4 shadow-lg text-white ${ 
                notification.type === 'success' 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}>
                <div className="flex items-center gap-2">
                  {notification.type === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5" />
                  )}
                  {notification.message}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
