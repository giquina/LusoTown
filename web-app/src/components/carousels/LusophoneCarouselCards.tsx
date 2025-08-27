'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon, 
  StarIcon,
  CalendarDaysIcon,
  MusicalNoteIcon,
  BuildingStorefrontIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'
import type {
  WeekendEventItem,
  PALOPHeritageItem,
  WeeklyDiscoveryItem,
  CulturalCelebrationItem
} from './LusophoneCarousel'

/**
 * Utility function to get country flag emoji
 */
function getCountryFlag(country: string): string {
  const countryFlags: Record<string, string> = {
    'portugal': '🇵🇹',
    'brazil': '🇧🇷',
    'angola': '🇦🇴',
    'cape verde': '🇨🇻',
    'mozambique': '🇲🇿',
    'guinea-bissau': '🇬🇼',
    'são tomé and príncipe': '🇸🇹',
    'east timor': '🇹🇱'
  }
  
  return countryFlags[country.toLowerCase()] || '🌍'
}

/**
 * Utility function to format price
 */
function formatPrice(price: number): string {
  return price === 0 ? 'Free' : `£${price.toFixed(2)}`
}

/**
 * Weekend Event Card Component
 */
interface WeekendEventCardProps {
  event: WeekendEventItem
  onFavoriteToggle?: (eventId: string) => void
  onBookmarkToggle?: (eventId: string) => void
  isFavorite?: boolean
  isBookmarked?: boolean
}

function WeekendEventCard({ 
  event, 
  onFavoriteToggle, 
  onBookmarkToggle, 
  isFavorite = false, 
  isBookmarked = false 
}: WeekendEventCardProps) {
  const { language } = useLanguage()
  
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100
  const isAlmostFull = attendancePercentage > 80

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl border border-primary-100 overflow-hidden h-full flex flex-col transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-50">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title[language]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <CalendarDaysIcon className="w-16 h-16 text-primary-400" />
          </div>
        )}
        
        {/* Overlay with country flags */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
          <span className="text-sm font-semibold text-primary-900">{formatPrice(event.price)}</span>
        </div>

        {/* Country Flags */}
        {event.countries && event.countries.length > 0 && (
          <div className="absolute top-4 left-4 flex space-x-1">
            {event.countries.slice(0, 3).map((country, index) => (
              <span key={index} className="text-2xl drop-shadow-lg">
                {getCountryFlag(country)}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {onFavoriteToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle(event.id)
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-colors
                         ${isFavorite 
                           ? 'bg-red-500 text-white' 
                           : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon className="w-4 h-4" />
            </button>
          )}
          
          {onBookmarkToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onBookmarkToggle(event.id)
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-colors
                         ${isBookmarked 
                           ? 'bg-primary-500 text-white' 
                           : 'bg-white/90 text-gray-700 hover:bg-primary-50 hover:text-primary-500'}`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title[language]}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.description[language]}
          </p>
        )}

        {/* Event Meta Information */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDaysIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
            <span>{event.date} at {event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <UsersIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
            <span>{event.attendees}/{event.maxAttendees} attending</span>
            {isAlmostFull && (
              <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                Almost Full!
              </span>
            )}
          </div>
        </div>

        {/* Attendance Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Attendance</span>
            <span className="text-xs text-gray-700 font-medium">{Math.round(attendancePercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isAlmostFull ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-primary-500 to-primary-600'
              }`}
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full border border-primary-200"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{event.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * PALOP Heritage Card Component
 */
interface PALOPHeritageCardProps {
  heritage: PALOPHeritageItem
  onExploreClick?: (heritageId: string) => void
}

function PALOPHeritageCard({ heritage, onExploreClick }: PALOPHeritageCardProps) {
  const { language } = useLanguage()
  
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-md hover:shadow-xl border border-primary-100 overflow-hidden h-full flex flex-col transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Header with Country Info */}
      <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600 text-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{heritage.title[language]}</h3>
            <p className="text-primary-100 text-sm">{heritage.country}</p>
          </div>
          <div className="text-4xl">
            {heritage.flagEmoji || getCountryFlag(heritage.country)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Description */}
        {heritage.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {heritage.description[language]}
          </p>
        )}

        {/* Heritage Elements */}
        <div className="space-y-3 mb-4 flex-grow">
          {heritage.heritage.music.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <MusicalNoteIcon className="w-4 h-4 text-primary-500 mr-2" />
                <span className="text-sm font-semibold text-gray-800">Music</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {heritage.heritage.music.slice(0, 3).map((music, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                  >
                    {music}
                  </span>
                ))}
              </div>
            </div>
          )}

          {heritage.heritage.traditions.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <SparklesIcon className="w-4 h-4 text-primary-500 mr-2" />
                <span className="text-sm font-semibold text-gray-800">Traditions</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {heritage.heritage.traditions.slice(0, 2).map((tradition, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded-full"
                  >
                    {tradition}
                  </span>
                ))}
              </div>
            </div>
          )}

          {heritage.heritage.cuisine.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <BuildingStorefrontIcon className="w-4 h-4 text-primary-500 mr-2" />
                <span className="text-sm font-semibold text-gray-800">Cuisine</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {heritage.heritage.cuisine.slice(0, 2).map((cuisine, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Business Count */}
        <div className="bg-primary-50 rounded-lg p-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{heritage.businessCount}</div>
            <div className="text-xs text-primary-700">
              {language === 'en' ? 'Related Businesses' : 'Negócios Relacionados'}
            </div>
          </div>
        </div>

        {/* Explore Button */}
        {onExploreClick && (
          <button
            onClick={() => onExploreClick(heritage.id)}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {language === 'en' ? 'Explore Heritage' : 'Explorar Património'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Weekly Discovery Card Component
 */
interface WeeklyDiscoveryCardProps {
  discovery: WeeklyDiscoveryItem
  onDiscoverClick?: (discoveryId: string) => void
}

function WeeklyDiscoveryCard({ discovery, onDiscoverClick }: WeeklyDiscoveryCardProps) {
  const { language } = useLanguage()
  
  const getDiscoveryIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return <BuildingStorefrontIcon className="w-8 h-8 text-primary-500" />
      case 'event':
        return <CalendarDaysIcon className="w-8 h-8 text-primary-500" />
      case 'business':
        return <BuildingStorefrontIcon className="w-8 h-8 text-primary-500" />
      case 'cultural-site':
        return <SparklesIcon className="w-8 h-8 text-primary-500" />
      default:
        return <MapPinIcon className="w-8 h-8 text-primary-500" />
    }
  }

  const getDiscoveryTypeLabel = (type: string) => {
    const labels = {
      en: {
        restaurant: 'Restaurant',
        event: 'Event',
        business: 'Business',
        'cultural-site': 'Cultural Site'
      },
      pt: {
        restaurant: 'Restaurante',
        event: 'Evento',
        business: 'Negócio',
        'cultural-site': 'Local Cultural'
      }
    }
    return labels[language][type as keyof typeof labels.en] || type
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl border border-primary-100 overflow-hidden h-full flex flex-col transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="relative h-24 bg-gradient-to-br from-primary-50 to-gold-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getDiscoveryIcon(discovery.discoveryType)}
            <div>
              <div className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                {getDiscoveryTypeLabel(discovery.discoveryType)}
              </div>
              {discovery.featured && (
                <div className="text-xs bg-gold-200 text-gold-800 px-2 py-1 rounded-full mt-1">
                  ⭐ Featured
                </div>
              )}
            </div>
          </div>
          
          {discovery.rating && (
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-800">{discovery.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {discovery.title[language]}
        </h3>

        {/* Description */}
        {discovery.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
            {discovery.description[language]}
          </p>
        )}

        {/* Location */}
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <MapPinIcon className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
            <span className="font-medium">{discovery.location.name}</span>
          </div>
          <div className="text-xs text-gray-400 ml-6">
            {discovery.location.area}
          </div>
        </div>

        {/* Countries */}
        {discovery.countries && discovery.countries.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">Lusophone Heritage:</div>
            <div className="flex flex-wrap gap-1">
              {discovery.countries.map((country, index) => (
                <span key={index} className="text-lg">
                  {getCountryFlag(country)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Discover Button */}
        {onDiscoverClick && (
          <button
            onClick={() => onDiscoverClick(discovery.id)}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold py-3 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {language === 'en' ? 'Discover More' : 'Descobrir Mais'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Cultural Celebration Card Component
 */
interface CulturalCelebrationCardProps {
  celebration: CulturalCelebrationItem
  onLearnMoreClick?: (celebrationId: string) => void
}

function CulturalCelebrationCard({ celebration, onLearnMoreClick }: CulturalCelebrationCardProps) {
  const { language } = useLanguage()
  
  const getCelebrationTypeColor = (type: string) => {
    switch (type) {
      case 'festival':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'independence':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'cultural':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'religious':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'music':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-primary-100 text-primary-700 border-primary-200'
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl border border-primary-100 overflow-hidden h-full flex flex-col transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Header with celebration info */}
      <div className="relative h-32 bg-gradient-to-br from-primary-100 to-gold-50 p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-2 ${getCelebrationTypeColor(celebration.celebrationType)}`}>
              {celebration.celebrationType.replace('-', ' ').toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
              {celebration.title[language]}
            </h3>
          </div>
          <div className="text-3xl">
            {celebration.flagEmoji || '🎭'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Period */}
        <div className="flex items-center mb-3">
          <ClockIcon className="w-4 h-4 text-primary-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{celebration.period[language]}</span>
        </div>

        {/* Description */}
        {celebration.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {celebration.description[language]}
          </p>
        )}

        {/* Significance */}
        {celebration.significance && (
          <div className="mb-4 flex-grow">
            <div className="text-xs font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Cultural Significance:' : 'Significado Cultural:'}
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">
              {celebration.significance[language]}
            </p>
          </div>
        )}

        {/* Traditional Elements */}
        {celebration.traditionalElements && celebration.traditionalElements.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Traditional Elements:' : 'Elementos Tradicionais:'}
            </div>
            <div className="flex flex-wrap gap-1">
              {celebration.traditionalElements.slice(0, 4).map((element, index) => (
                <span 
                  key={index}
                  className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full border border-primary-200"
                >
                  {element}
                </span>
              ))}
              {celebration.traditionalElements.length > 4 && (
                <span className="text-xs text-gray-500">+{celebration.traditionalElements.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Countries involved */}
        {celebration.countries && celebration.countries.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Celebrated by:' : 'Celebrado por:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {celebration.countries.map((country, index) => (
                <span key={index} className="text-xl" title={country}>
                  {getCountryFlag(country)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Learn More Button */}
        {onLearnMoreClick && (
          <button
            onClick={() => onLearnMoreClick(celebration.id)}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {language === 'en' ? 'Learn More' : 'Saber Mais'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Export all card components
 */
export {
  WeekendEventCard,
  PALOPHeritageCard,
  WeeklyDiscoveryCard,
  CulturalCelebrationCard,
  getCountryFlag,
  formatPrice
}