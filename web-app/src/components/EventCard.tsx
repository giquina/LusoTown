'use client'

import { useState } from 'react'
import FavoriteButton from '@/components/FavoriteButton'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UserGroupIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  maxAttendees: number
  currentAttendees: number
  category: string
  price: number
  imageUrl?: string
  hostName?: string
  hostImage?: string
}

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  maxAttendees,
  currentAttendees,
  category,
  price,
  imageUrl,
  hostName,
  hostImage
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const spotsLeft = maxAttendees - currentAttendees
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
  const isFull = spotsLeft <= 0

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="text-4xl">🎉</div>
          </div>
        )}
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            itemId={id}
            itemType="event"
            itemTitle={title}
            itemDescription={description}
            itemImageUrl={imageUrl}
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Availability Status */}
        <div className="absolute bottom-3 right-3">
          {isFull ? (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              FULL
            </span>
          ) : isAlmostFull ? (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {spotsLeft} SPOT{spotsLeft === 1 ? '' : 'S'} LEFT
            </span>
          ) : (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {spotsLeft} SPOTS
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDaysIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{formatDate(date)}</div>
              <div className="text-xs text-gray-500">{formatTime(time)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <UserGroupIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{currentAttendees}/{maxAttendees} Attending</div>
              <div className="text-xs text-gray-500">Price: {price === 0 ? 'FREE' : `£${price}`}</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm">
            View Details
          </button>
          <button className="border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm">
            {isFull ? 'Join Waitlist' : 'RSVP Now'}
          </button>
        </div>
      </div>
    </div>
  )
}