'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowRightIcon, 
  SparklesIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { formatEventDate } from '@/lib/dateUtils'
import { useCart } from '@/context/CartContext'
import { EventsToursService, EventTour } from '@/lib/events-tours'
import { useState, useEffect } from 'react'

export default function EventsToursSection() {
  const { language, t } = useLanguage()
  const { addToSaved } = useCart()
  const isPortuguese = language === 'pt'
  const [featuredEvents, setFeaturedEvents] = useState<EventTour[]>([])

  useEffect(() => {
    const events = EventsToursService.getFeaturedEventsTours(3)
    setFeaturedEvents(events)
  }, [])

  const formatDate = (dateString: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateString, isPortuguese)
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatPrice = (price: number, currency: string = 'GBP') => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'
    return price === 0 ? (isPortuguese ? 'GRÁTIS' : 'FREE') : `${symbol}${price}`
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Women 30+': '👩‍💼',
      'Women 40+': '👩‍🏫',
      'Family-Friendly': '👨‍👩‍👧‍👦',
      'Mixed Groups': '🤝',
      'Cultural Heritage': '🏛️',
      'Professional Networking': '💼'
    }
    return icons[category as keyof typeof icons] || '🎯'
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Women 30+': 'bg-coral-500',
      'Women 40+': 'bg-premium-500',
      'Family-Friendly': 'bg-secondary-500',
      'Mixed Groups': 'bg-primary-500',
      'Cultural Heritage': 'bg-accent-500',
      'Professional Networking': 'bg-action-500'
    }
    return colors[category as keyof typeof colors] || 'bg-primary-500'
  }

  const handleSaveEvent = (event: EventTour) => {
    addToSaved({
      type: 'event',
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      category: event.category,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventPrice: event.price,
      metadata: {
        hostName: event.hostName,
        currency: event.currency,
        spotsLeft: event.maxAttendees - event.currentAttendees,
        membershipRequired: event.membershipRequired,
        featured: event.featured,
        groupExperience: event.groupExperience,
        highlights: event.highlights
      }
    })
  }

  if (featuredEvents.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full">
              <SparklesIcon className="w-4 h-4" />
              {isPortuguese ? 'Experiências em Destaque' : 'Featured Experiences'}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            {isPortuguese 
              ? 'Viva Londres com Sua Comunidade Portuguesa'
              : 'Live London with Your Portuguese Community'
            }
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            {isPortuguese 
              ? 'Desde experiências exclusivas para mulheres portuguesas até tours familiares e networking profissional - reserve sua vaga em grupos especializados que celebram nossa herança.'
              : 'From exclusive experiences for Portuguese women to family tours and professional networking - book your spot in specialized groups that celebrate our heritage.'
            }
          </motion.p>
        </div>

        {/* Featured Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event, index) => {
            const spotsLeft = event.maxAttendees - event.currentAttendees
            const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0
            const isFull = spotsLeft <= 0

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  {event.imageUrl ? (
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <div className="text-4xl">{getCategoryIcon(event.category)}</div>
                    </div>
                  )}
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <SparklesIcon className="w-3 h-3" />
                      {isPortuguese ? 'DESTAQUE' : 'FEATURED'}
                    </span>
                  </div>

                  {/* Save Button */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleSaveEvent(event)}
                      className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg group"
                    >
                      <HeartIcon className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Category & Price */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className={`${getCategoryColor(event.category)} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                      <span className="text-sm">{getCategoryIcon(event.category)}</span>
                      {event.category}
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {formatPrice(event.price, event.currency)}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
                      <span>{formatDate(event.date)} • {formatTime(event.time)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4 text-secondary-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UserGroupIcon className="w-4 h-4 text-purple-500" />
                      <div className="flex items-center justify-between w-full">
                        <span>{event.currentAttendees}/{event.maxAttendees} {isPortuguese ? 'participantes' : 'attending'}</span>
                        {isFull ? (
                          <span className="text-red-600 font-semibold text-xs">
                            {isPortuguese ? 'LOTADO' : 'FULL'}
                          </span>
                        ) : isAlmostFull ? (
                          <span className="text-orange-600 font-semibold text-xs">
                            {spotsLeft} {isPortuguese ? 'vagas' : 'spots'} left
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold text-xs">
                            {isPortuguese ? 'Vagas disponíveis' : 'Available'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Highlights Preview */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold">
                          {isPortuguese ? 'Destaque:' : 'Highlight:'}
                        </span> {event.highlights[0]}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <a 
                    href={`/events/${event.id}?type=tour`}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-sm block"
                  >
                    {isPortuguese ? 'Reservar Vaga' : 'Reserve Your Spot'}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese 
                ? 'Mais de 15 Experiências Disponíveis'
                : 'Over 15 Experiences Available'
              }
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Desde grupos especializados para mulheres portuguesas até tours familiares e networking profissional - encontre a experiência perfeita para conectar com sua comunidade.'
                : 'From specialized groups for Portuguese women to family tours and professional networking - find the perfect experience to connect with your community.'
              }
            </p>
            
            {/* Category Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">👩‍💼</div>
                <div className="text-sm font-semibold text-gray-900">
                  {isPortuguese ? 'Mulheres 30+ & 40+' : 'Women 30+ & 40+'}
                </div>
                <div className="text-xs text-gray-600">
                  {isPortuguese ? 'Networking exclusivo' : 'Exclusive networking'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <div className="text-sm font-semibold text-gray-900">
                  {isPortuguese ? 'Experiências Familiares' : 'Family Experiences'}
                </div>
                <div className="text-xs text-gray-600">
                  {isPortuguese ? 'Todas as idades' : 'All ages welcome'}
                </div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm font-semibold text-gray-900">
                  {isPortuguese ? 'Herança Cultural' : 'Cultural Heritage'}
                </div>
                <div className="text-xs text-gray-600">
                  {isPortuguese ? 'Tradições portuguesas' : 'Portuguese traditions'}
                </div>
              </div>
            </div>
          </div>

          <a
            href="/events?tab=tours"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            {isPortuguese ? 'Ver Todas as Experiências' : 'View All Experiences'}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}