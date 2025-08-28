'use client'

import React from 'react'
import { CalendarIcon, MapPinIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import Carousel from '@/components/ui/Carousel'

export interface PortugueseEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  area: string
  price: number
  currency: string
  category: 'cultural' | 'music' | 'food' | 'sports' | 'business' | 'community'
  heritage: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'guinea-bissau' | 'sao-tome-principe' | 'east-timor'
  image: string
  attendees: number
  maxAttendees: number
  featured: boolean
  organizer: string
  tags: string[]
}

interface FeaturedEventsCarouselProps {
  events: PortugueseEvent[]
  title?: string
  subtitle?: string
  onEventClick?: (event: PortugueseEvent) => void
  className?: string
  autoPlay?: boolean
}

// Heritage flag emojis for Portuguese-speaking countries
const HERITAGE_FLAGS = {
  portugal: '🇵🇹',
  brazil: '🇧🇷',
  'cape-verde': '🇨🇻',
  angola: '🇦🇴',
  mozambique: '🇲🇿',
  'guinea-bissau': '🇬🇼',
  'sao-tome-principe': '🇸🇹',
  'east-timor': '🇹🇱'
}

// Category colors matching Portuguese cultural theme
const CATEGORY_COLORS = {
  cultural: 'bg-red-100 text-red-700 border-red-200',
  music: 'bg-green-100 text-green-700 border-green-200',
  food: 'bg-orange-100 text-orange-700 border-orange-200',
  sports: 'bg-blue-100 text-blue-700 border-blue-200',
  business: 'bg-purple-100 text-purple-700 border-purple-200',
  community: 'bg-yellow-100 text-yellow-700 border-yellow-200'
}

export default function FeaturedEventsCarousel({
  events,
  title,
  subtitle,
  onEventClick,
  className = '',
  autoPlay = false
}: FeaturedEventsCarouselProps) {
  const { language } = useLanguage()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    })
  }

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) {
      return language === 'pt' ? 'Grátis' : 'Free'
    }
    return `${currency}${price.toFixed(2)}`
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      cultural: { pt: 'Cultural', en: 'Cultural' },
      music: { pt: 'Música', en: 'Music' },
      food: { pt: 'Comida', en: 'Food' },
      sports: { pt: 'Desporto', en: 'Sports' },
      business: { pt: 'Negócios', en: 'Business' },
      community: { pt: 'Comunidade', en: 'Community' }
    }
    return labels[category as keyof typeof labels]?.[language as keyof typeof labels.cultural] || category
  }

  const renderEventCard = (event: PortugueseEvent, index: number) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full
                 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -4 }}
      style={{ touchAction: 'manipulation', userSelect: 'none' }}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heritage Flag */}
        <div className="absolute top-3 left-3 text-2xl bg-white/90 backdrop-blur-sm 
                       rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          {HERITAGE_FLAGS[event.heritage]}
        </div>
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-green-500 
                         text-white text-xs font-bold px-2 py-1 rounded-full">
            {language === 'pt' ? 'Destaque' : 'Featured'}
          </div>
        )}
        
        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm 
                       px-3 py-1 rounded-full text-sm font-semibold text-primary-700">
          {formatPrice(event.price, event.currency)}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex justify-between items-start">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border
                           ${CATEGORY_COLORS[event.category] || CATEGORY_COLORS.community}`}>
            {getCategoryLabel(event.category)}
          </span>
          <HeartIcon className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-500">
          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-primary-500" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-primary-500" />
            <span className="truncate">{event.location}, {event.area}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <UserGroupIcon className="w-4 h-4 text-primary-500" />
            <span>
              {event.attendees}/{event.maxAttendees} {language === 'pt' ? 'participantes' : 'attendees'}
            </span>
          </div>
        </div>

        {/* Organizer */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {language === 'pt' ? 'Organizado por' : 'Organized by'} <span className="font-medium text-gray-700">{event.organizer}</span>
          </p>
        </div>

        {/* Tags */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {event.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="text-xs text-gray-400">
                +{event.tags.length - 3} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )

  const defaultTitle = language === 'pt' 
    ? 'Eventos em Destaque da Comunidade Portuguesa'
    : 'Featured Portuguese Community Events'
    
  const defaultSubtitle = language === 'pt'
    ? 'Descubra os melhores eventos culturais, musicais e comunitários para a comunidade lusófona no Reino Unido'
    : 'Discover the best cultural, musical, and community events for Portuguese speakers across the UK'

  return (
    <div className={className}>
      <Carousel
        items={events}
        renderItem={renderEventCard}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        title={title || defaultTitle}
        subtitle={subtitle || defaultSubtitle}
        showArrows={true}
        showDots={true}
        autoPlay={autoPlay}
        autoPlayDelay={6000}
        gap="1.5rem"
        onItemClick={onEventClick}
        ariaLabel={language === 'pt' ? 'Carrossel de eventos portugueses' : 'Portuguese events carousel'}
        className="px-4 md:px-0"
      />
    </div>
  )
}