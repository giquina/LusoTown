'use client'

import React from 'react'
import { StarIcon, MapPinIcon, PhoneIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import Carousel from '@/components/ui/Carousel'

export interface PortugueseBusiness {
  id: string
  name: string
  description: string
  category: 'restaurant' | 'service' | 'shop' | 'entertainment' | 'professional' | 'healthcare'
  heritage: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'guinea-bissau' | 'sao-tome-principe' | 'east-timor'
  address: string
  area: string
  postcode: string
  phone: string
  website?: string
  email: string
  rating: number
  reviewCount: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  images: string[]
  specialties: string[]
  openingHours: {
    [key: string]: { open: string; close: string } | null
  }
  verified: boolean
  featured: boolean
  distance?: number
  coordinates: [number, number] // [latitude, longitude]
}

interface BusinessDirectoryCarouselProps {
  businesses: PortugueseBusiness[]
  title?: string
  subtitle?: string
  onBusinessClick?: (business: PortugueseBusiness) => void
  className?: string
  autoPlay?: boolean
}

// Heritage flag emojis
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

// Category icons and colors
const CATEGORY_INFO = {
  restaurant: { icon: '🍽️', color: 'bg-orange-100 text-orange-700 border-orange-200', label: { pt: 'Restaurante', en: 'Restaurant' } },
  service: { icon: '🔧', color: 'bg-blue-100 text-blue-700 border-blue-200', label: { pt: 'Serviço', en: 'Service' } },
  shop: { icon: '🛍️', color: 'bg-green-100 text-green-700 border-green-200', label: { pt: 'Loja', en: 'Shop' } },
  entertainment: { icon: '🎵', color: 'bg-purple-100 text-purple-700 border-purple-200', label: { pt: 'Entretenimento', en: 'Entertainment' } },
  professional: { icon: '💼', color: 'bg-gray-100 text-gray-700 border-gray-200', label: { pt: 'Profissional', en: 'Professional' } },
  healthcare: { icon: '🏥', color: 'bg-red-100 text-red-700 border-red-200', label: { pt: 'Saúde', en: 'Healthcare' } }
}

export default function BusinessDirectoryCarousel({
  businesses,
  title,
  subtitle,
  onBusinessClick,
  className = '',
  autoPlay = false
}: BusinessDirectoryCarouselProps) {
  const { language } = useLanguage()

  const formatDistance = (distance?: number) => {
    if (!distance) return ''
    return distance < 1 
      ? `${Math.round(distance * 1000)}m ${language === 'pt' ? 'de distância' : 'away'}`
      : `${distance.toFixed(1)}km ${language === 'pt' ? 'de distância' : 'away'}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="relative">
        {i < Math.floor(rating) ? (
          <StarSolidIcon className="w-4 h-4 text-yellow-400" />
        ) : i < rating ? (
          <div className="relative">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <StarSolidIcon 
              className="w-4 h-4 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: `inset(0 ${100 - (rating - Math.floor(rating)) * 100}% 0 0)` }}
            />
          </div>
        ) : (
          <StarIcon className="w-4 h-4 text-gray-300" />
        )}
      </div>
    ))
  }

  const isOpenNow = (openingHours: PortugueseBusiness['openingHours']) => {
    const now = new Date()
    const today = now.toLocaleDateString('en-US', { weekday: 'lowercase' })
    const currentTime = now.toTimeString().slice(0, 5) // HH:MM format
    
    const todayHours = openingHours[today]
    if (!todayHours) return false
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }

  const renderBusinessCard = (business: PortugueseBusiness, index: number) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full
                 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -4 }}
      style={{ touchAction: 'manipulation', userSelect: 'none' }}
    >
      {/* Business Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={business.images[0]}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Heritage Flag */}
        <div className="absolute top-3 left-3 text-2xl bg-white/90 backdrop-blur-sm 
                       rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          {HERITAGE_FLAGS[business.heritage]}
        </div>
        
        {/* Verified Badge */}
        {business.verified && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold 
                         px-2 py-1 rounded-full flex items-center gap-1">
            ✓ {language === 'pt' ? 'Verificado' : 'Verified'}
          </div>
        )}
        
        {/* Featured Badge */}
        {business.featured && (
          <div className="absolute top-12 right-3 bg-gradient-to-r from-red-500 to-green-500 
                         text-white text-xs font-bold px-2 py-1 rounded-full">
            {language === 'pt' ? 'Destaque' : 'Featured'}
          </div>
        )}
        
        {/* Price Range */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm 
                       px-3 py-1 rounded-full text-sm font-semibold text-primary-700">
          {business.priceRange}
        </div>
      </div>

      {/* Business Content */}
      <div className="p-4 space-y-3">
        {/* Category & Favorite */}
        <div className="flex justify-between items-start">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1
                           ${CATEGORY_INFO[business.category].color}`}>
            <span>{CATEGORY_INFO[business.category].icon}</span>
            {CATEGORY_INFO[business.category].label[language as keyof typeof CATEGORY_INFO.restaurant.label]}
          </span>
          <HeartIcon className="w-5 h-5 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" />
        </div>

        {/* Business Name */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {business.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(business.rating)}
          </div>
          <span className="text-sm text-gray-600 font-medium">{business.rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">
            ({business.reviewCount} {language === 'pt' ? 'avaliações' : 'reviews'})
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        {/* Business Details */}
        <div className="space-y-2 text-sm text-gray-500">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{business.area}, {business.postcode}</span>
            {business.distance && (
              <span className="text-xs text-primary-600 font-medium whitespace-nowrap">
                • {formatDistance(business.distance)}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-primary-500" />
            <span className="font-mono">{business.phone}</span>
          </div>

          {/* Opening Status */}
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-primary-500" />
            <span className={`font-medium ${isOpenNow(business.openingHours) ? 'text-green-600' : 'text-red-600'}`}>
              {isOpenNow(business.openingHours) 
                ? (language === 'pt' ? 'Aberto agora' : 'Open now')
                : (language === 'pt' ? 'Fechado' : 'Closed')
              }
            </span>
          </div>
        </div>

        {/* Specialties */}
        {business.specialties.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">
              {language === 'pt' ? 'Especialidades:' : 'Specialties:'}
            </p>
            <div className="flex flex-wrap gap-1">
              {business.specialties.slice(0, 3).map((specialty, specialtyIndex) => (
                <span
                  key={specialtyIndex}
                  className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
              {business.specialties.length > 3 && (
                <span className="text-xs text-gray-400 self-center">
                  +{business.specialties.length - 3} {language === 'pt' ? 'mais' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )

  const defaultTitle = language === 'pt' 
    ? 'Negócios Portugueses em Destaque'
    : 'Featured Portuguese Businesses'
    
  const defaultSubtitle = language === 'pt'
    ? 'Descubra os melhores restaurantes, serviços e lojas da comunidade lusófona no Reino Unido'
    : 'Discover the best restaurants, services, and shops from the Portuguese-speaking community in the UK'

  return (
    <div className={className}>
      <Carousel
        items={businesses}
        renderItem={renderBusinessCard}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        title={title || defaultTitle}
        subtitle={subtitle || defaultSubtitle}
        showArrows={true}
        showDots={true}
        autoPlay={autoPlay}
        autoPlayDelay={8000}
        gap="1.5rem"
        onItemClick={onBusinessClick}
        ariaLabel={language === 'pt' ? 'Carrossel de negócios portugueses' : 'Portuguese businesses carousel'}
        className="px-4 md:px-0"
      />
    </div>
  )
}