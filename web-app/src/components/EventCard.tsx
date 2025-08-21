'use client'

import React from 'react'
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

export default function EventCard({ 
  event, 
  index = 0, 
  className = "",
  showWaitingListModal = true 
}: EventCardProps) {
  const { language } = useLanguage()
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.03 }}
        className={`bg-white rounded-3xl shadow-xl border border-secondary-100/50 overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-all duration-300 ${className}`}
      >
        {/* Event Image */}
        <div className="h-48 relative overflow-hidden">
          <EventImageWithFallback
            src={event.image}
            alt={`${event.title} event image`}
            category={event.category}
            className="object-cover"
            fill
            priority
          />
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Category icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-xl">
                {event.icon}
              </div>
              <div className="text-sm font-semibold opacity-95 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {event.category}
              </div>
            </div>
          </div>
          
          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/40 shadow-lg">
            <div className="text-xs font-bold text-gray-900">{event.date}</div>
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-xl px-3 py-2 shadow-lg">
            <div className="text-xs font-bold">£{event.price}</div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 mr-2 text-primary-500" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <UsersIcon className="w-4 h-4 mr-2 text-primary-500" />
              {event.attendees}/{event.maxAttendees} attending
            </div>
            <div className="flex items-center text-sm text-coral-600 font-medium">
              <SparklesIcon className="w-4 h-4 mr-2 text-coral-500" />
              {event.ageRestriction}
            </div>
          </div>

          {/* Attendance bar or Status Info */}
          <div className="mb-4">
            {bookingStatus.status === 'available' ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-secondary-600 font-medium flex items-center">
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                    {statusMessages.primary}
                  </span>
                  <span className="text-xs font-medium text-primary-600">
                    {statusMessages.secondary}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                {event.specialOffer && (
                  <div className="mt-2 text-xs text-accent-600 font-medium bg-accent-50 px-2 py-1 rounded-lg border border-accent-200">
                    🎁 {event.specialOffer}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-action-600 font-medium">
                    {statusMessages.primary}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {event.attendees}/{event.maxAttendees} attending
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-gray-500 to-gray-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `100%` }}
                  ></div>
                </div>
                {/* Waiting List Info */}
                <div className="mt-2 text-xs text-coral-600 font-medium bg-coral-50 px-2 py-1 rounded-lg border border-coral-200">
                  <UsersIcon className="w-3 h-3 inline mr-1" />
                  {statusMessages.secondary}
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            {bookingStatus.status === 'available' ? (
              <Link 
                href={`/events/${event.id}/book`}
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-semibold py-4 rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-300 group-hover:scale-105 block text-center shadow-lg hover:shadow-xl animate-pulse"
              >
                {statusMessages.buttonText}
              </Link>
            ) : (
              <button 
                onClick={() => showWaitingListModal && openWaitingListModal(event)}
                disabled={!showWaitingListModal}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-semibold py-4 rounded-2xl hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:scale-105 block text-center shadow-lg hover:shadow-xl"
              >
                {statusMessages.buttonText}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Waiting List Modal */}
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