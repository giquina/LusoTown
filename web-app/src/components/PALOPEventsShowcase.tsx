'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PALOP_CULTURAL_EVENTS, getHighPriorityPALOPEvents, getCurrentMonthPALOPEvents } from '@/config/palop-cultural-events'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UsersIcon, 
  SparklesIcon,
  ArrowRightIcon,
  FlagIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { ROUTES } from '@/config/routes'

interface PALOPEventsShowcaseProps {
  variant?: 'featured' | 'current-month' | 'independence' | 'business' | 'cultural'
  limit?: number
  className?: string
  showCountryFlags?: boolean
  showDescription?: boolean
}

/**
 * PALOP Events Showcase Component
 * Displays curated PALOP cultural events with pride and cultural context
 */
const PALOPEventsShowcase: React.FC<PALOPEventsShowcaseProps> = ({
  variant = 'featured',
  limit = 3,
  className = '',
  showCountryFlags = true,
  showDescription = true
}) => {
  const { t } = useLanguage()

  // Get events based on variant
  const getEvents = () => {
    switch (variant) {
      case 'current-month':
        return getCurrentMonthPALOPEvents().slice(0, limit)
      case 'independence':
        return PALOP_CULTURAL_EVENTS.filter(e => e.category === 'independence').slice(0, limit)
      case 'business':
        return PALOP_CULTURAL_EVENTS.filter(e => e.networking || e.category === 'business').slice(0, limit)
      case 'cultural':
        return PALOP_CULTURAL_EVENTS.filter(e => e.category === 'music' || e.category === 'heritage').slice(0, limit)
      default:
        return getHighPriorityPALOPEvents().slice(0, limit)
    }
  }

  const events = getEvents()

  if (events.length === 0) {
    return null
  }

  const getCountryColor = (country: string) => {
    switch (country) {
      case 'angola': return 'border-red-500 text-red-600'
      case 'cape_verde': return 'border-blue-500 text-blue-600'
      case 'mozambique': return 'border-green-500 text-green-600'
      case 'guinea_bissau': return 'border-purple-500 text-purple-600'
      case 'sao_tome_principe': return 'border-orange-500 text-orange-600'
      default: return 'border-gray-500 text-gray-600'
    }
  }

  const getCountryName = (country: string) => {
    switch (country) {
      case 'angola': return 'Angola 🇦🇴'
      case 'cape_verde': return 'Cape Verde 🇨🇻'
      case 'mozambique': return 'Mozambique 🇲🇿'
      case 'guinea_bissau': return 'Guinea-Bissau 🇬🇼'
      case 'sao_tome_principe': return 'São Tomé 🇸🇹'
      default: return 'PALOP'
    }
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
            <SparklesIcon className="w-4 h-4" />
            {t('palop.events.calendar.title', 'PALOP Cultural Calendar')}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {variant === 'independence' && t('palop.events.independence.celebrations', 'PALOP Independence Celebrations')}
            {variant === 'business' && t('palop.networking.professional', 'PALOP Professional Network')}
            {variant === 'cultural' && t('palop.cultural.education', 'PALOP Cultural Education Hub')}
            {variant === 'current-month' && 'This Month\'s PALOP Events'}
            {variant === 'featured' && 'Featured PALOP Cultural Events'}
          </h2>
          
          {showCountryFlags && (
            <div className="text-3xl mb-4">🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹</div>
          )}
          
          {showDescription && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('palop.success.subtitle', 'Where PALOP Cultures Thrive in Britain')} - Celebrating the incredible cultural heritage of African Portuguese-speaking nations across the United Kingdom.
            </p>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`bg-white rounded-2xl p-6 shadow-xl border-l-4 ${getCountryColor(event.country)} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Country Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getCountryColor(event.country)} bg-opacity-10`}>
                  <FlagIcon className="w-3 h-3" />
                  {getCountryName(event.country)}
                </div>
                <div className="text-2xl">{event.flagEmoji}</div>
              </div>

              {/* Event Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {event.description.slice(0, 120)}...
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-medium">{event.frequency}</span>
                  <span>•</span>
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UsersIcon className="w-4 h-4" />
                  <span>{event.expectedAttendance}+ attendees expected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{event.venues[0] || 'Multiple venues'}</span>
                </div>
              </div>

              {/* Cultural Elements */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {event.music?.slice(0, 2).map((music, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      🎵 {music}
                    </span>
                  ))}
                  {event.food?.slice(0, 1).map((food, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      🍽️ {food}
                    </span>
                  ))}
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    PALOP Heritage
                  </span>
                </div>
              </div>

              {/* Networking Badge */}
              {event.networking && (
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    <HeartIcon className="w-3 h-3" />
                    Professional Networking
                  </div>
                </div>
              )}

              {/* Cultural Significance */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-700 italic">
                  "{event.culturalSignificance.slice(0, 100)}..."
                </p>
              </div>

              {/* Event Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                  Learn More
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <a
            href={ROUTES.events}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-center mr-3">
              <span className="text-sm">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</span>
            </div>
            {t('palop.events.calendar.title', 'View All PALOP Events')}
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default PALOPEventsShowcase

/**
 * PALOP Success Stories Component
 * Showcases successful PALOP entrepreneurs and community members
 */
export const PALOPSuccessStories: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLanguage()

  const successStories = [
    {
      name: 'Carlos Burity Santos',
      country: 'Angola 🇦🇴',
      business: 'Elite Angolan Diamonds London',
      achievement: '£2.5M+ Annual Revenue',
      story: 'Building London\'s premier Angolan diamond boutique in Hatton Garden',
      impact: 'Supporting ethical diamond trade while celebrating Angolan heritage'
    },
    {
      name: 'Helena Santos Morais',
      country: 'Cape Verde 🇨🇻',
      business: 'Cachupa Island Kitchen',
      achievement: '4.8/5 Customer Rating',
      story: 'Bringing authentic Cape Verdean cuisine to London with family recipes',
      impact: 'Preserving island food culture while building successful restaurant'
    },
    {
      name: 'Fernando Machel Samora',
      country: 'Mozambique 🇲🇿',
      business: 'Coastal Spice Trading Company',
      achievement: '£800K+ Annual Revenue',
      story: 'Importing authentic Mozambican spices directly from coastal producers',
      impact: 'Supporting traditional farmers while bringing coastal flavors to UK'
    }
  ]

  return (
    <section className={`py-12 bg-gradient-to-br from-green-50 to-yellow-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-yellow-500 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
            <SparklesIcon className="w-4 h-4" />
            {t('palop.success.stories', 'PALOP Success Stories')}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {t('palop.success.entrepreneurs', 'PALOP Entrepreneurs Changing London\'s Landscape')}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the incredible entrepreneurs from Angola, Cape Verde, Guinea-Bissau, Mozambique, and São Tomé who are building successful businesses while preserving their cultural heritage in the United Kingdom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center mb-4">
                <div className="text-3xl mb-3">{story.country.split(' ')[1]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{story.business}</p>
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  <SparklesIcon className="w-3 h-3" />
                  {story.achievement}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium mb-1">Success Story:</p>
                  <p className="text-xs text-gray-600">{story.story}</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800 font-medium mb-1">Community Impact:</p>
                  <p className="text-xs text-blue-600">{story.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}