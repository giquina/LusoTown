'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  HeartIcon as HeartOutlineIcon,
  ShareIcon,
  CameraIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useFavorites } from '@/context/FavoritesContext'
import FavoriteButton from '@/components/FavoriteButton'

export interface GroupEventData {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  currency: string
  category: 'Women 30+' | 'Women 40+' | 'Family-Friendly'
  image: string
  spotsLeft: number
  maxAttendees: number
  hostName: string
  hostImage?: string
  hostVerified?: boolean
  rating: number
  reviewCount: number
  isPopular?: boolean
  isNewEvent?: boolean
  hasPhotos?: boolean
  groupFocus: string
  ageRange: string
  languages: string[]
}

interface GroupEventCardProps {
  event: GroupEventData
  onReserve?: (eventId: string) => void
  onLike?: (eventId: string) => void
  className?: string
  variant?: 'default' | 'compact' | 'featured'
}

export default function GroupEventCard({ 
  event, 
  onReserve, 
  onLike,
  className = '',
  variant = 'default'
}: GroupEventCardProps) {
  const { language } = useLanguage()
  const { isFavorite } = useFavorites()
  const [liked, setLiked] = useState(false)
  
  const isPortuguese = language === 'pt'

  const handleLike = () => {
    setLiked(!liked)
    onLike?.(event.id)
  }

  const handleReserve = () => {
    onReserve?.(event.id)
  }

  const getCategoryColor = (category: GroupEventData['category']) => {
    switch (category) {
      case 'Women 30+':
        return 'bg-coral-100 text-coral-700 border-coral-200'
      case 'Women 40+':
        return 'bg-premium-100 text-premium-700 border-premium-200'
      case 'Family-Friendly':
        return 'bg-secondary-100 text-secondary-700 border-secondary-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryIcon = (category: GroupEventData['category']) => {
    switch (category) {
      case 'Women 30+':
        return '🌸'
      case 'Women 40+':
        return '🦋'
      case 'Family-Friendly':
        return '👨‍👩‍👧‍👦'
      default:
        return '👥'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) {
      return isPortuguese ? 'GRÁTIS' : 'FREE'
    }
    return `${currency}${price}`
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <div className="flex gap-4 p-4">
          {/* Event Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.isPopular && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                <StarIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{event.title}</h4>
              <FavoriteButton
                itemId={event.id}
                itemType="event"
                itemTitle={event.title}
                itemDescription={event.description}
                itemImageUrl={event.image}
                size="xs"
              />
            </div>
            
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-3 h-3 text-primary-500" />
                <span>{formatDate(event.date)} • {event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-3 h-3 text-secondary-500" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(event.category)}`}>
                {getCategoryIcon(event.category)} {event.category}
              </span>
              <span className="text-primary-600 font-semibold text-sm">
                {formatPrice(event.price, event.currency)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
      >
        {/* Featured Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-accent-500 to-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {isPortuguese ? 'DESTAQUE' : 'FEATURED'}
          </div>
        </div>

        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleLike}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              {liked ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartOutlineIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <ShareIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`text-xs px-3 py-1 rounded-full border backdrop-blur-sm bg-white/90 ${getCategoryColor(event.category)}`}>
              {getCategoryIcon(event.category)} {event.category}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-4">
              {event.title}
            </h3>
            <span className="text-2xl font-bold text-primary-600 flex-shrink-0">
              {formatPrice(event.price, event.currency)}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            {event.description}
          </p>

          {/* Event Meta */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
              <span>{formatDate(event.date)} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-secondary-500" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4 text-purple-500" />
              <span>
                {event.spotsLeft > 0 
                  ? `${event.spotsLeft} ${isPortuguese ? 'vagas' : 'spots'}`
                  : isPortuguese ? 'Lotado' : 'Full'
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span>{event.rating} ({event.reviewCount})</span>
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {event.hostImage ? (
                  <img 
                    src={event.hostImage} 
                    alt={event.hostName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xs">
                    {event.hostName.charAt(0)}
                  </div>
                )}
              </div>
              {event.hostVerified && (
                <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-3 h-3 text-primary-500 bg-white rounded-full" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{event.hostName}</div>
              <div className="text-xs text-gray-500">
                {isPortuguese ? 'Organizador de Grupo' : 'Group Organizer'}
              </div>
            </div>
          </div>

          {/* Reserve Button */}
          <button
            onClick={handleReserve}
            disabled={event.spotsLeft === 0}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
              event.spotsLeft === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-secondary-500 to-action-500 text-white hover:from-secondary-600 hover:to-action-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {event.spotsLeft === 0 
              ? (isPortuguese ? 'Lotado - Lista de Espera' : 'Full - Join Waitlist')
              : (isPortuguese ? 'Reservar o Meu Lugar' : 'Reserve Your Spot')
            }
          </button>
        </div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group ${className}`}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {event.isNewEvent && (
            <span className="bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {isPortuguese ? 'NOVO' : 'NEW'}
            </span>
          )}
          {event.isPopular && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {isPortuguese ? 'POPULAR' : 'POPULAR'}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FavoriteButton
            itemId={event.id}
            itemType="event"
            itemTitle={event.title}
            itemDescription={event.description}
            itemImageUrl={event.image}
            size="sm"
            variant="overlay"
          />
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm text-primary-600 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
            {formatPrice(event.price, event.currency)}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`text-xs px-3 py-1 rounded-full border ${getCategoryColor(event.category)}`}>
            {getCategoryIcon(event.category)} {event.category}
          </span>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Meta */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-secondary-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4 text-purple-500" />
              <span>
                {event.spotsLeft > 0 
                  ? `${event.spotsLeft} ${isPortuguese ? 'vagas restantes' : 'spots left'}`
                  : isPortuguese ? 'Evento lotado' : 'Event full'
                }
              </span>
            </div>
            {event.rating > 0 && (
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span>{event.rating} ({event.reviewCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              {event.hostImage ? (
                <img 
                  src={event.hostImage} 
                  alt={event.hostName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-sm">
                  {event.hostName.charAt(0)}
                </div>
              )}
            </div>
            {event.hostVerified && (
              <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-4 h-4 text-primary-500 bg-white rounded-full" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{event.hostName}</div>
            <div className="text-xs text-gray-500">
              {isPortuguese ? 'Organizador experiente' : 'Experienced organizer'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleReserve}
            disabled={event.spotsLeft === 0}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
              event.spotsLeft === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-secondary-500 to-action-500 text-white hover:from-secondary-600 hover:to-action-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {event.spotsLeft === 0 
              ? (isPortuguese ? 'Lista de Espera' : 'Join Waitlist')
              : (isPortuguese ? 'Reservar Lugar' : 'Reserve Spot')
            }
          </button>
          
          <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
            <ShareIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Urgency Indicator */}
        {event.spotsLeft <= 3 && event.spotsLeft > 0 && (
          <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 text-xs">
              <ClockIcon className="w-4 h-4" />
              <span className="font-medium">
                {isPortuguese 
                  ? `Apenas ${event.spotsLeft} lugares restantes!`
                  : `Only ${event.spotsLeft} spots left!`
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}