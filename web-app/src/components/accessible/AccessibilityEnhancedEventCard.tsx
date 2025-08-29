'use client'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  SparklesIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import EventImageWithFallback from '@/components/EventImageWithFallback'
import WaitingListModal from '@/components/WaitingListModal'
import { useWaitingListActions } from '@/hooks/useWaitingListActions'
import { useLanguage } from '@/context/LanguageContext'

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    location: string
    date: string
    time: string
    attendees: number
    maxAttendees: number
    price: number
    category: string
    image: string
    color: string
    icon: React.ReactNode
    ageRestriction: string
    tags: string[]
    status?: 'available' | 'fully-booked' | string
    specialOffer?: string
  }
  index?: number
  className?: string
  showWaitingListModal?: boolean
}

export default function AccessibilityEnhancedEventCard({ 
  event, 
  index = 0, 
  className = "",
  showWaitingListModal = true 
}: EventCardProps) {
  const { language, t } = useLanguage()
  const {
    isModalOpen,
    selectedEvent,
    openWaitingListModal,
    closeWaitingListModal,
    getBookingStatus,
    getStatusMessages
  } = useWaitingListActions()

  const bookingStatus = getBookingStatus(event)
  const statusMessages = getStatusMessages(event)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)

  // Enhanced keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsInteracting(true)
      
      if (bookingStatus.status === 'available') {
        // Navigate to booking page
        window.location.href = `/events/${event.id}/book`
      } else if (showWaitingListModal) {
        openWaitingListModal(event)
      }
    }
  }

  // Calculate accessibility metrics
  const attendancePercentage = Math.round((event.attendees / event.maxAttendees) * 100)
  const availableSpots = event.maxAttendees - event.attendees
  
  // Enhanced ARIA labels for Portuguese community
  const eventAriaLabel = t('event.card.aria_label', 
    '{{title}} event on {{date}} at {{location}}. {{attendees}} of {{maxAttendees}} spots filled. Price: £{{price}}. {{status}}',
    {
      title: event.title,
      date: event.date,
      location: event.location,
      attendees: event.attendees,
      maxAttendees: event.maxAttendees,
      price: event.price,
      status: bookingStatus.status === 'available' ? 
        t('event.availability.available', 'Available for booking') : 
        t('event.availability.full', 'Fully booked - join waiting list')
    }
  )

  const buttonAriaLabel = bookingStatus.status === 'available' ?
    t('event.button.book_aria', 'Book {{title}} event for £{{price}}', { title: event.title, price: event.price }) :
    t('event.button.waitlist_aria', 'Join waiting list for {{title}} event', { title: event.title })

  return (
    <>
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.03 }}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={eventAriaLabel}
        aria-describedby={`event-${event.id}-details`}
        className={`bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 ${
          isInteracting ? 'ring-4 ring-primary-500 ring-offset-2' : ''
        } ${className}`}
        onFocus={() => setIsInteracting(false)}
        onBlur={() => setIsInteracting(false)}
      >
        {/* Event Image with Enhanced Alt Text */}
        <div className="h-48 relative overflow-hidden" role="img" aria-label={t('event.image.alt', '{{category}} event image for {{title}}', { category: event.category, title: event.title })}>
          <EventImageWithFallback
            src={event.image}
            alt={t('event.image.detailed_alt', '{{title}} - {{category}} event taking place on {{date}} at {{location}}', {
              title: event.title,
              category: event.category,
              date: event.date,
              location: event.location
            })}
            category={event.category}
            className="object-cover"
            fill
            priority
          />
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
          
          {/* Category icon overlay with accessibility */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-xl">
                <span role="img" aria-label={t('event.category.icon_label', '{{category}} icon', { category: event.category })}>
                  {event.icon}
                </span>
              </div>
              <div className="text-sm font-semibold opacity-95 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {event.category}
              </div>
            </div>
          </div>
          
          {/* Date badge with semantic meaning */}
          <div 
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg"
            role="text"
            aria-label={t('event.date.label', 'Event date: {{date}}', { date: event.date })}
          >
            <div className="text-xs font-bold text-gray-900">{event.date}</div>
          </div>

          {/* Price badge with currency context */}
          <div 
            className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-xl px-3 py-2 shadow-lg"
            role="text"
            aria-label={t('event.price.label', 'Price: £{{price}} pounds', { price: event.price })}
          >
            <div className="text-xs font-bold">£{event.price}</div>
          </div>
        </div>

        {/* Event Content with Structured Information */}
        <div className="p-6 flex-grow flex flex-col">
          <header className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
              {event.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {event.description}
            </p>
          </header>

          {/* Event Details with Semantic Structure */}
          <dl className="space-y-2 mb-4" id={`event-${event.id}-details`}>
            <div className="flex items-center text-sm text-gray-500">
              <dt className="sr-only">{t('event.details.location', 'Location')}</dt>
              <MapPinIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <dd>{event.location}</dd>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <dt className="sr-only">{t('event.details.time', 'Time')}</dt>
              <ClockIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <dd>{event.time}</dd>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <dt className="sr-only">{t('event.details.attendance', 'Attendance')}</dt>
              <UsersIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <dd>
                <span aria-label={t('event.attendance.detailed', '{{attendees}} people attending out of {{maxAttendees}} maximum capacity', { attendees: event.attendees, maxAttendees: event.maxAttendees })}>
                  {event.attendees}/{event.maxAttendees} {t('event.attendance.attending', 'attending')}
                </span>
              </dd>
            </div>
            
            <div className="flex items-center text-sm text-coral-600 font-medium">
              <dt className="sr-only">{t('event.details.age_restriction', 'Age restriction')}</dt>
              <SparklesIcon className="w-4 h-4 mr-2 text-coral-500 flex-shrink-0" aria-hidden="true" />
              <dd>{event.ageRestriction}</dd>
            </div>
          </dl>

          {/* Attendance Progress with Accessibility */}
          <section className="mb-4" aria-label={t('event.availability.section', 'Event availability information')}>
            {bookingStatus.status === 'available' ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-secondary-600 font-medium flex items-center">
                    <CheckCircleIcon className="w-3 h-3 mr-1" aria-hidden="true" />
                    <span role="status" aria-live="polite">{statusMessages.primary}</span>
                  </span>
                  <span 
                    className="text-xs font-medium text-primary-600"
                    aria-label={t('event.spots.remaining', '{{spots}} spots remaining', { spots: availableSpots })}
                  >
                    {statusMessages.secondary}
                  </span>
                </div>
                
                <div 
                  className="w-full bg-gray-200 rounded-full h-2"
                  role="progressbar"
                  aria-valuenow={attendancePercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={t('event.progress.capacity', '{{percentage}}% of event capacity filled', { percentage: attendancePercentage })}
                >
                  <div 
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${attendancePercentage}%` }}
                    aria-hidden="true"
                  ></div>
                </div>
                
                {event.specialOffer && (
                  <div 
                    className="mt-2 text-xs text-accent-600 font-medium bg-accent-50 px-2 py-1 rounded-lg border border-accent-200"
                    role="note"
                    aria-label={t('event.offer.label', 'Special offer: {{offer}}', { offer: event.specialOffer })}
                  >
                    🎁 {event.specialOffer}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-action-600 font-medium">
                    <span role="status" aria-live="polite">{statusMessages.primary}</span>
                  </span>
                  <span 
                    className="text-xs font-medium text-gray-500"
                    aria-label={t('event.capacity.full', 'Event at full capacity: {{attendees}} attendees', { attendees: event.attendees })}
                  >
                    {event.attendees}/{event.maxAttendees} {t('event.attendance.attending', 'attending')}
                  </span>
                </div>
                
                <div 
                  className="w-full bg-gray-200 rounded-full h-2"
                  role="progressbar"
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={t('event.progress.full', 'Event is fully booked')}
                >
                  <div 
                    className="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-300 w-full"
                    aria-hidden="true"
                  ></div>
                </div>
                
                <div 
                  className="mt-2 text-xs text-coral-600 font-medium bg-coral-50 px-2 py-1 rounded-lg border border-coral-200"
                  role="note"
                  aria-label={t('event.waitlist.info', 'Waiting list available')}
                >
                  <UsersIcon className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {statusMessages.secondary}
                </div>
              </div>
            )}
          </section>

          {/* Action Button with Enhanced Accessibility */}
          <div className="mt-auto">
            {bookingStatus.status === 'available' ? (
              <Link 
                href={`/events/${event.id}/book`}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold py-4 rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300 group-hover:scale-105 block text-center shadow-lg hover:shadow-xl animate-pulse min-h-[56px] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
                aria-label={buttonAriaLabel}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = `/events/${event.id}/book`
                  }
                }}
              >
                {statusMessages.buttonText}
              </Link>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  showWaitingListModal && openWaitingListModal(event)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    showWaitingListModal && openWaitingListModal(event)
                  }
                }}
                disabled={!showWaitingListModal}
                aria-label={buttonAriaLabel}
                aria-describedby={`waitlist-help-${event.id}`}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-semibold py-4 rounded-2xl hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:scale-105 block text-center shadow-lg hover:shadow-xl min-h-[56px] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
              >
                {statusMessages.buttonText}
              </button>
            )}
            
            {/* Hidden help text for waiting list */}
            {bookingStatus.status !== 'available' && (
              <div id={`waitlist-help-${event.id}`} className="sr-only">
                {t('event.waitlist.help', 'Join the waiting list to be notified if spots become available for this Portuguese community event')}
              </div>
            )}
          </div>
        </div>
      </motion.article>

      {/* Waiting List Modal with Accessibility */}
      {showWaitingListModal && selectedEvent && (
        <WaitingListModal
          isOpen={isModalOpen}
          onClose={closeWaitingListModal}
          event={selectedEvent}
        />
      )}
    </>
  )
}