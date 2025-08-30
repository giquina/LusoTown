'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { ROUTES } from '@/config/routes'
import { formatPrice } from '@/config/pricing'

interface Event {
  id: string
  title: string
  titlePortuguese?: string
  description: string
  descriptionPortuguese?: string
  date: string
  endDate?: string
  time: string
  endTime?: string
  location: {
    venue: string
    address: string
    city: string
    coordinates?: [number, number]
  }
  category: string
  culturalFocus: string
  price: number
  currency: string
  maxAttendees?: number
  currentAttendees: number
  images: string[]
  organizer: {
    name: string
    email: string
    phone?: string
    website?: string
  }
  tags: string[]
  isRecurring: boolean
  accessibility: {
    wheelchairAccessible: boolean
    signLanguage: boolean
    audioDescription: boolean
  }
  featured: boolean
  verified: boolean
  ticketTypes: Array<{
    name: string
    price: number
    description: string
    available: number
  }>
}

interface EventCardProps {
  event: Event
  compact?: boolean
  showDistance?: boolean
  showBookingButton?: boolean
}

export default function EventCard({
  event,
  compact = false,
  showDistance = false,
  showBookingButton = true
}: EventCardProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const getCulturalFlag = (culturalFocus: string) => {
    const flags: Record<string, string> = {
      portugal: '🇵🇹',
      brazil: '🇧🇷',
      angola: '🇦🇴',
      cape_verde: '🇨🇻',
      mozambique: '🇲🇿',
      guinea_bissau: '🇬🇼',
      sao_tome: '🇸🇹',
      timor_leste: '🇹🇱',
      mixed: '🌐',
      other: '🌍'
    }
    return flags[culturalFocus] || '🌍'
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      cultural: '🎭',
      music: '🎵',
      food: '🍽️',
      sports: '⚽',
      education: '📚',
      business: '💼',
      religious: '⛪',
      festival: '🎉',
      arts: '🎨',
      dance: '💃',
      literature: '📖',
      community: '🤝'
    }
    return icons[category] || '🎭'
  }

  const formatEventDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    const now = new Date()
    
    // Check if it's today, tomorrow, or this week
    const today = now.toDateString()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString()
    const eventDateString = eventDate.toDateString()
    
    if (eventDateString === today) {
      return `${t('events.today', 'Today')} ${eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    } else if (eventDateString === tomorrow) {
      return `${t('events.tomorrow', 'Tomorrow')} ${eventDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return eventDate.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  const getAvailabilityStatus = () => {
    if (!event.maxAttendees) return null
    
    const availableSpots = event.maxAttendees - event.currentAttendees
    const percentageFull = (event.currentAttendees / event.maxAttendees) * 100
    
    if (percentageFull >= 100) {
      return { status: 'sold_out', color: 'bg-red-500', text: t('events.sold_out', 'Sold Out') }
    } else if (percentageFull >= 90) {
      return { status: 'almost_full', color: 'bg-orange-500', text: t('events.almost_full', 'Almost Full') }
    } else if (availableSpots <= 5) {
      return { status: 'few_left', color: 'bg-yellow-500', text: t('events.few_left', 'Few Left') }
    }
    
    return null
  }

  const availabilityStatus = getAvailabilityStatus()
  const eventTitle = language === 'pt' && event.titlePortuguese ? event.titlePortuguese : event.title
  const eventDescription = language === 'pt' && event.descriptionPortuguese ? event.descriptionPortuguese : event.description

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden ${compact ? '' : 'lg:flex'}`}>
      {/* Event Image */}
      <div className={`relative ${compact ? 'h-48' : 'lg:w-64 h-48 lg:h-auto'} flex-shrink-0`}>
        {event.images && event.images.length > 0 ? (
          <Image
            src={event.images[0]}
            alt={eventTitle}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-6xl`} style={{ backgroundColor: `${colors.primary}20` }}>
            {getCategoryIcon(event.category)}
          </div>
        )}

        {/* Event Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {event.featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ {t('events.featured', 'Featured')}
            </div>
          )}
          
          {event.verified && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ✓ {t('common.verified', 'Verified')}
            </div>
          )}
          
          {event.price === 0 && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {t('events.free', 'FREE')}
            </div>
          )}
          
          {availabilityStatus && (
            <div className={`${availabilityStatus.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
              {availabilityStatus.text}
            </div>
          )}
        </div>

        {/* Cultural Flag */}
        <div className="absolute top-3 right-3">
          <span className="text-2xl" title={`Cultural focus: ${event.culturalFocus}`}>
            {getCulturalFlag(event.culturalFocus)}
          </span>
        </div>

        {/* Recurring Badge */}
        {event.isRecurring && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded-full text-xs">
            🔄 {t('events.recurring', 'Recurring')}
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className={`${compact ? 'p-4' : 'p-6'} flex-1`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {/* Category and Date */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-500 capitalize flex items-center space-x-1">
                <span>{getCategoryIcon(event.category)}</span>
                <span>{event.category}</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-medium" style={{ color: colors.primary }}>
                {formatEventDate(event.date, event.time)}
              </span>
            </div>

            {/* Event Title */}
            <h3 className={`font-semibold text-gray-900 mb-2 ${compact ? 'text-lg' : 'text-xl'}`}>
              {eventTitle}
            </h3>

            {/* Event Description */}
            <p className={`text-gray-600 mb-3 ${compact ? 'text-sm line-clamp-2' : 'line-clamp-3'}`}>
              {eventDescription}
            </p>

            {/* Location */}
            <div className="flex items-start space-x-2 mb-3">
              <span className="text-gray-400 mt-0.5">📍</span>
              <div className="text-sm text-gray-600">
                <div className="font-medium">{event.location.venue}</div>
                <div>{event.location.address}, {event.location.city}</div>
              </div>
            </div>

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {event.tags.slice(0, compact ? 3 : 5).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs rounded-full text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {tag}
                  </span>
                ))}
                {event.tags.length > (compact ? 3 : 5) && (
                  <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                    +{event.tags.length - (compact ? 3 : 5)} more
                  </span>
                )}
              </div>
            )}

            {/* Accessibility Features */}
            {(event.accessibility.wheelchairAccessible || event.accessibility.signLanguage) && (
              <div className="flex space-x-3 mb-3">
                {event.accessibility.wheelchairAccessible && (
                  <span className="flex items-center text-green-600 text-xs">
                    ♿ {t('events.wheelchair_accessible', 'Wheelchair Accessible')}
                  </span>
                )}
                {event.accessibility.signLanguage && (
                  <span className="flex items-center text-blue-600 text-xs">
                    🤟 {t('events.sign_language', 'Sign Language')}
                  </span>
                )}
              </div>
            )}

            {/* Attendees Count */}
            {event.maxAttendees && (
              <div className="text-sm text-gray-600 mb-3">
                👥 {event.currentAttendees} / {event.maxAttendees} {t('events.attendees', 'attendees')}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: colors.primary,
                      width: `${Math.min(100, (event.currentAttendees / event.maxAttendees) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-right ml-4">
            {event.price === 0 ? (
              <div className="text-2xl font-bold text-green-600">
                {t('events.free', 'FREE')}
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(event.price)}
                </div>
                {event.ticketTypes.length > 1 && (
                  <div className="text-sm text-gray-500">
                    {t('events.from', 'from')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`${ROUTES.events}/${event.id}`}
            className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('events.view_details', 'View Details')}
          </Link>
          
          {showBookingButton && availabilityStatus?.status !== 'sold_out' && (
            <Link
              href={`${ROUTES.events}/${event.id}/book`}
              className="flex-1 text-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.primary }}
            >
              {event.price === 0 
                ? t('events.register_free', 'Register Free') 
                : t('events.book_tickets', 'Book Tickets')
              }
            </Link>
          )}
        </div>

        {/* Organizer Info */}
        <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>👤</span>
              <span>{t('events.organized_by', 'Organized by')} {event.organizer.name}</span>
            </div>
            
            {event.organizer.website && (
              <a
                href={event.organizer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xs underline"
              >
                {t('events.organizer_website', 'Website')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}