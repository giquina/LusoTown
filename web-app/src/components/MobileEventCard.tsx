'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { useMobileScrollAnimation } from '@/hooks/useMobileScrollAnimation'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  HeartIcon,
  ShareIcon,
  TicketIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

interface MobileEventCardProps {
  event: {
    id: string
    title: { en: string; pt: string }
    description: { en: string; pt: string }
    image: string
    date: string
    time: string
    location: {
      venue: string
      address: string
      city: string
    }
    price: {
      free: boolean
      amount?: number
      currency?: string
    }
    category: string
    attendeeCount: number
    maxAttendees?: number
    organizer: {
      name: string
      country: string
      verified: boolean
    }
    tags: string[]
    isFeatured?: boolean
    isPremium?: boolean
  }
  compact?: boolean
  featured?: boolean
  className?: string
  animationDelay?: number
}

export default function MobileEventCard({
  event,
  compact = false,
  featured = false,
  className = '',
  animationDelay = 0
}: MobileEventCardProps) {
  const { language } = useLanguage()
  const [isLiked, setIsLiked] = React.useState(false)
  const [isAttending, setIsAttending] = React.useState(false)

  const cardRef = useMobileScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    animationClass: 'scroll-fade-in',
    delay: animationDelay
  })

  // Get flag emoji for organizer country
  const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
      'portugal': '🇵🇹',
      'brazil': '🇧🇷',
      'angola': '🇦🇴',
      'cape_verde': '🇨🇻',
      'mozambique': '🇲🇿',
      'guinea_bissau': '🇬🇼',
      'sao_tome_principe': '🇸🇹',
      'east_timor': '🇹🇱'
    }
    return flags[country] || '🌍'
  }

  // Format date for mobile display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return { label: 'Today', color: 'bg-green-500' }
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return { label: 'Tomorrow', color: 'bg-blue-500' }
    } else {
      return {
        label: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        color: 'bg-gray-500'
      }
    }
  }

  const dateInfo = formatDate(event.date)

  if (compact) {
    return (
      <div
        ref={cardRef}
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group cursor-pointer portuguese-touch-area scroll-fade-in ${className}`}
      >
        <div className="flex">
          {/* Event Image */}
          <div className="relative w-28 h-24 flex-shrink-0">
            <Image
              src={event.image}
              alt={event.title[language]}
              fill
              className="object-cover"
              sizes="112px"
            />
            {/* Date Badge */}
            <div className={`absolute top-2 left-2 ${dateInfo.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {dateInfo.label}
            </div>
          </div>

          {/* Event Content */}
          <div className="flex-1 card-padding">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="heading-portuguese-mobile text-gray-900 line-clamp-2 mb-1">
                  {event.title[language]}
                </h3>
                
                <div className="touch-spacing text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location.venue}</span>
                  </div>
                  {!event.price.free && (
                    <div className="flex items-center gap-1">
                      <TicketIcon className="w-4 h-4" />
                      <span>{event.price.currency}{event.price.amount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center touch-spacing ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLiked(!isLiked)
                  }}
                  className="portuguese-touch-area p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isLiked ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                </button>
                
                {event.organizer.country && (
                  <span className="text-sm">{getCountryFlag(event.organizer.country)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group cursor-pointer portuguese-touch-area scroll-fade-in ${
        featured ? 'ring-2 ring-primary-500 border-primary-200' : ''
      } ${className}`}
    >
      {/* Event Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex touch-spacing">
          <div className={`${dateInfo.color} text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg`}>
            {dateInfo.label}
          </div>
          {event.price.free && (
            <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              FREE
            </div>
          )}
          {event.isFeatured && (
            <div className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              FEATURED
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col touch-spacing">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="portuguese-touch-area bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-lg"
          >
            {isLiked ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Share functionality
            }}
            className="portuguese-touch-area bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-primary-500 transition-colors shadow-lg"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Organizer Country Flag */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm text-xl px-2 py-1 rounded-full shadow-lg">
            {getCountryFlag(event.organizer.country)}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="card-padding">
        <div className="text-spacing">
          {/* Event Title */}
          <h3 className="heading-portuguese-mobile text-gray-900 line-clamp-2">
            {event.title[language]}
          </h3>

          {/* Event Description */}
          <p className="text-portuguese-mobile text-gray-600 line-clamp-2">
            {event.description[language]}
          </p>

          {/* Event Details */}
          <div className="touch-spacing text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium">{event.location.venue}</div>
                <div className="text-xs text-gray-500">{event.location.address}, {event.location.city}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-gray-400" />
              <span>
                {event.attendeeCount} attending
                {event.maxAttendees && ` of ${event.maxAttendees}`}
              </span>
            </div>

            {!event.price.free && (
              <div className="flex items-center gap-2">
                <TicketIcon className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-primary-600">
                  {event.price.currency}{event.price.amount}
                </span>
              </div>
            )}
          </div>

          {/* Event Tags */}
          {event.tags.length > 0 && (
            <div className="flex flex-wrap touch-spacing">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-1"
                >
                  {tag}
                </span>
              ))}
              {event.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{event.tags.length - 3} more</span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex touch-spacing border-t border-gray-100 pt-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsAttending(!isAttending)
              }}
              className={`flex-1 portuguese-button-touch mr-2 px-4 py-3 rounded-lg button-text-portuguese transition-colors ${
                isAttending
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {isAttending ? 'Going' : 'Join Event'}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                // More details
              }}
              className="portuguese-button-touch px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-primary-300 hover:text-primary-700 transition-colors button-text-portuguese"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}