'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon,
  ShareIcon,
  ClockIcon,
  PhotoIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import SaveFavoriteCartButton from '@/components/SaveFavoriteCartButton'
import NetworkPreview from '@/components/NetworkPreview'
import { Event } from '@/lib/events'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'
import { formatEventDate } from '@/lib/dateUtils'
import { getCurrentUser } from '@/lib/auth'

interface ImprovedEventCardProps {
  event: Event
  showPreviewOverlay?: boolean
  onUpgrade?: () => void
}

const ImprovedEventCard = ({ event, showPreviewOverlay = false, onUpgrade }: ImprovedEventCardProps) => {
  const { isSaved } = useCart()
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'
  const { getConnectionsByEvent } = useNetworking()
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [user, setUser] = useState(getCurrentUser())
  
  // Get connections for this event
  const eventConnections = getConnectionsByEvent(event.id)
  
  const formatDate = (dateStr: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateStr, isPortuguese)
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

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  // Check if this should show preview overlay for free users
  const shouldShowPreview = showPreviewOverlay && 
    user?.membershipTier === 'free' && 
    event.membershipRequired !== 'free'

  const membershipTierNames = {
    core: isPortuguese ? 'Comunidade' : 'Community',
    premium: isPortuguese ? 'Família' : 'Family'
  }

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
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {event.photos?.map((photo) => (
                <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                  <EventImageWithFallback
                    src={photo.url}
                    alt={photo.caption || 'Event photo'}
                    category={event.category}
            className="object-cover"
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
      <div className="relative">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col"
      >
        {/* Event Image Header */}
        <div className="relative h-48 overflow-hidden">
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
              {/* Left: Badges */}
              <div className="flex flex-col gap-2">
                {event.featured && (
                  <span className="bg-gradient-to-r from-accent-400 to-coral-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ⭐ FEATURED
                  </span>
                )}
                {event.verifiedEvent && (
                  <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ✓ VERIFIED
                  </span>
                )}
              </div>

              {/* Right: Actions */}
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
                  className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
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
              {/* Left: Availability Status */}
              <div>
                {isFull ? (
                  <span className="bg-action-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    FULL {event.allowWaitlist && '• JOIN WAITLIST'}
                  </span>
                ) : isAlmostFull ? (
                  <span className="bg-coral-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {spotsLeft} SPOT{spotsLeft === 1 ? '' : 'S'} LEFT
                  </span>
                ) : (
                  <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {spotsLeft} SPOTS AVAILABLE
                  </span>
                )}
              </div>

              {/* Right: Photo Gallery */}
              {event.photos && event.photos.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPhotoGallery(true)
                  }}
                  className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors flex items-center gap-1.5 font-medium shadow-lg"
                >
                  <PhotoIcon className="w-3.5 h-3.5" />
                  {event.photos.length} Photos
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 space-y-4 flex-grow flex flex-col">
          {/* Header: Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0 order-2 sm:order-1">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-tight break-words min-h-[3.5rem] flex items-start">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed break-words">
                {event.description}
              </p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0 order-1 sm:order-2">
              <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">
                {event.price === 0 ? 'FREE' : `£${event.price}`}
              </div>
              {event.membershipRequired !== 'free' && (
                <div className="text-xs text-gray-500 capitalize font-medium">
                  {isPortuguese ? 'Membro necessário' : 'Membership needed'}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Event Details Section */}
          <div className="space-y-3">
            {/* Date & Time Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CalendarIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="font-medium truncate">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <ClockIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="font-medium truncate">
                  {formatTime(event.time)}{event.endTime && ` - ${formatTime(event.endTime)}`}
                </span>
              </div>
            </div>

            {/* Location Row */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPinIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <span className="font-medium break-words">{event.location}, {event.address.split(',')[1]}</span>
            </div>

            {/* Age Restriction */}
            {event.ageRestriction && (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-coral-100 text-coral-800 px-2 py-1 rounded-full font-medium">
                  {event.ageRestriction}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Host & Stats Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {event.hostImage ? (
                <Image 
                  src={event.hostImage} 
                  alt={event.hostName}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold ring-2 ring-primary-100 shadow-sm">
                  {event.hostName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <div className="text-sm text-gray-900 font-medium">{event.hostName}</div>
                <div className="text-xs text-gray-500">Event Host</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <UserGroupIcon className="w-4 h-4" />
                <span className="font-medium">{event.currentAttendees}</span>
              </div>
              {event.averageRating > 0 && (
                <div className="flex items-center gap-1.5">
                  <StarIcon className="w-4 h-4 fill-accent-400 text-accent-400" />
                  <span className="font-medium">{event.averageRating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Network Connections Section */}
          {eventConnections.length > 0 && (
            <>
              <div className="border-t border-gray-100"></div>
              <NetworkPreview
                eventId={event.id}
                connections={eventConnections}
                maxPreview={3}
                showAddButton={false}
              />
            </>
          )}

          {/* Attendees Section */}
          {event.attendees && event.attendees.length > 0 && (
            <>
              <div className="border-t border-gray-100"></div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Going:</span>
                  <div className="flex -space-x-2">
                    {event.attendees.slice(0, 5).map((attendee, index) => (
                      <div key={attendee.id} className="relative">
                        {attendee.profileImage ? (
                          <Image
                            src={attendee.profileImage}
                            alt={attendee.name}
                            width={32} height={32}
                            className="rounded-full border-2 border-white object-cover shadow-sm hover:scale-110 transition-transform"
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
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                          attendee.membershipTier === 'premium' ? 'bg-premium-500' : 
                          attendee.membershipTier === 'core' ? 'bg-secondary-500' : 'bg-secondary-400'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full absolute inset-0 m-auto"></div>
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
                <div className="text-xs text-gray-500 flex gap-3">
                  {event.attendees.filter(a => a.membershipTier === 'premium').length > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-premium-500 rounded-full"></div>
                      {event.attendees.filter(a => a.membershipTier === 'premium').length} Premium
                    </span>
                  )}
                  {event.attendees.filter(a => a.membershipTier === 'core').length > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      {event.attendees.filter(a => a.membershipTier === 'core').length} Core
                    </span>
                  )}
                  {event.attendees.filter(a => a.membershipTier === 'free').length > 0 && (
                    <span className="inline-flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full"></div>
                      {event.attendees.filter(a => a.membershipTier === 'free').length} Free
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Tags Section */}
          <div className="border-t border-gray-100"></div>
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium transition-colors break-words"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1.5">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <div className="flex flex-col gap-3">
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
                size="medium"
                variant="outline"
                className="w-full"
              />
              <a
                href={`/events/${event.id}`}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 hover:shadow-lg transition-all duration-200 text-center shadow-md"
              >
                {isFull ? t('event.join-waitlist') : t('event.view-details')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Overlay for Premium Content */}
      {shouldShowPreview && (
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent backdrop-blur-sm rounded-2xl">
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-4 shadow-lg"
            >
              {/* Header with membership tier icon */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  event.membershipRequired === 'premium' 
                    ? 'bg-gradient-to-r from-premium-500 to-premium-600' 
                    : 'bg-gradient-to-r from-secondary-500 to-secondary-600'
                } text-white`}>
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {isPortuguese ? 'Evento Exclusivo para Membros' : 'Exclusive Member Event'}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {isPortuguese ? 'Disponível apenas para membros' : 'Available to members only'}
                  </p>
                </div>
              </div>

              {/* Content preview stats */}
              <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{spotsLeft}/{event.maxAttendees} available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary-600">
                  <StarIcon className="w-4 h-4" />
                  <span className="font-medium">Members Only</span>
                </div>
              </div>

              {/* Event description preview */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Action button */}
              <button
                onClick={onUpgrade}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                  event.membershipRequired === 'premium'
                    ? 'bg-gradient-to-r from-premium-500 to-premium-600 hover:from-premium-600 hover:to-premium-700 text-white'
                    : 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white'
                }`}
              >
                <span className="text-sm">
                  {isPortuguese 
                    ? `Tornar-se Membro ${membershipTierNames[event.membershipRequired as 'core' | 'premium']}`
                    : `Become ${membershipTierNames[event.membershipRequired as 'core' | 'premium']} Member`
                  }
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              {/* Benefits preview */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    {isPortuguese ? 'Benefícios inclusos:' : 'Benefits included:'}
                  </span>
                  <div className="flex items-center gap-2">
                    {event.membershipRequired === 'premium' ? (
                      <>
                        <span className="bg-premium-100 text-premium-800 px-2 py-1 rounded-full font-medium">
                          {isPortuguese ? 'Eventos VIP' : 'VIP Events'}
                        </span>
                        <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
                          {isPortuguese ? 'Descontos' : 'Discounts'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full font-medium">
                          {isPortuguese ? 'Eventos Especiais' : 'Special Events'}
                        </span>
                        <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full font-medium">
                          {isPortuguese ? 'Networking' : 'Networking'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      </div>
      
      {/* Photo Gallery Modal */}
      <PhotoGalleryModal />
    </>
  )
}

export default ImprovedEventCard