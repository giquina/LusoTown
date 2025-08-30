'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import { ROUTES } from '@/config/routes'
import { formatPrice } from '@/config/pricing'
import {
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  StarIcon,
  CheckBadgeIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface BusinessCardProps {
  business: {
    id: string
    name: string
    business_type: string
    description?: string
    short_description?: string
    address: string
    postcode: string
    phone?: string
    website_url?: string
    cultural_focus: string
    portuguese_specialties: string[]
    average_rating: number
    total_reviews: number
    is_premium: boolean
    is_verified: boolean
    price_range: string
    distance_km?: number
    image_url?: string
    opening_hours?: Record<string, any>
    delivery_available?: boolean
    takeaway_available?: boolean
  }
  showDistance?: boolean
  compact?: boolean
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
}

export default function EnhancedBusinessCard({ 
  business, 
  showDistance = false, 
  compact = false,
  culturalContext = 'general'
}: BusinessCardProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const getCulturalFlag = (culturalFocus: string) => {
    switch (culturalFocus) {
      case 'portugal': return '🇵🇹'
      case 'brazil': return '🇧🇷'
      case 'cape-verde': return '🇨🇻'
      case 'angola': return '🇦🇴'
      case 'mozambique': return '🇲🇿'
      case 'guinea-bissau': return '🇬🇼'
      case 'sao-tome': return '🇸🇹'
      case 'timor-leste': return '🇹🇱'
      case 'general': return '🌍'
      default: return '🌍'
    }
  }

  const handleFavorite = () => {
    // Add to favorites logic
    console.log('Added to favorites:', business.id)
  }

  const handleShare = () => {
    // Share business logic
    if (navigator.share) {
      navigator.share({
        title: business.name,
        text: business.description || business.short_description,
        url: `${window.location.origin}${ROUTES.BUSINESSES.DETAILS(business.id)}`
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(`${window.location.origin}${ROUTES.BUSINESSES.DETAILS(business.id)}`)
    }
  }

  const handleCall = () => {
    if (business.phone) {
      window.location.href = `tel:${business.phone}`
    }
  }

  const handleWebsite = () => {
    if (business.website_url) {
      window.open(business.website_url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDirections = () => {
    const address = `${business.address}, ${business.postcode}`
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank', 'noopener,noreferrer')
  }

  // Keyboard navigation handlers
  const cardLinkProps = useEnhancedKeyboardNavigation({
    culturalContext,
    ariaLabel: `${t('businesses.view_details')}: ${business.name}`,
    announceActions: false
  })

  const favoriteButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleFavorite,
    culturalContext,
    ariaLabel: `${t('businesses.add_to_favorites')}: ${business.name}`,
    announceActions: true
  })

  const shareButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleShare,
    culturalContext,
    ariaLabel: `${t('businesses.share')}: ${business.name}`,
    announceActions: true
  })

  const callButtonProps = business.phone ? useEnhancedKeyboardNavigation({
    onClick: handleCall,
    culturalContext,
    ariaLabel: `${t('businesses.call')}: ${business.name}`,
    announceActions: true
  }) : {}

  const websiteButtonProps = business.website_url ? useEnhancedKeyboardNavigation({
    onClick: handleWebsite,
    culturalContext,
    ariaLabel: `${t('businesses.visit_website')}: ${business.name}`,
    announceActions: true
  }) : {}

  const directionsButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleDirections,
    culturalContext,
    ariaLabel: `${t('businesses.get_directions')}: ${business.name}`,
    announceActions: true
  })

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ))
  }

  const cardContent = (
    <article 
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-50 ${
        compact ? 'h-auto' : 'h-full'
      }`}
      role="article"
      aria-label={`${t('businesses.business')}: ${business.name}`}
    >
      {/* Business Image */}
      <div className={`relative ${compact ? 'h-32' : 'h-48'} bg-gray-100 overflow-hidden`}>
        {business.image_url ? (
          <Image
            src={business.image_url}
            alt={`${business.name} ${t('businesses.image')}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-4xl opacity-50">🏪</span>
          </div>
        )}
        
        {/* Cultural Flag and Premium Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-2xl bg-white bg-opacity-90 rounded-full p-1" role="img" aria-label={`${t('businesses.cultural_focus')}: ${business.cultural_focus}`}>
            {getCulturalFlag(business.cultural_focus)}
          </span>
          {business.is_premium && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {t('businesses.premium')}
            </span>
          )}
        </div>
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            {...favoriteButtonProps}
            className="p-2 bg-white bg-opacity-90 hover:bg-white rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[40px] min-w-[40px]"
          >
            <HeartIcon className="w-5 h-5 text-gray-700 hover:text-red-500" aria-hidden="true" />
          </button>
          
          <button
            {...shareButtonProps}
            className="p-2 bg-white bg-opacity-90 hover:bg-white rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[40px] min-w-[40px]"
          >
            <ShareIcon className="w-5 h-5 text-gray-700 hover:text-primary-500" aria-hidden="true" />
          </button>
        </div>
        
        {/* Distance Badge */}
        {showDistance && business.distance_km && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            {business.distance_km.toFixed(1)} km {t('businesses.away')}
          </div>
        )}
      </div>
      
      {/* Business Information */}
      <div className="p-4">
        <header className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {business.name}
            </h3>
            {business.is_verified && (
              <CheckBadgeIcon className="w-5 h-5 text-primary-500 flex-shrink-0 ml-2" aria-label={t('businesses.verified')} />
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
              {business.business_type}
            </span>
            <span className="text-sm text-gray-600">
              {formatPrice(business.price_range)}
            </span>
          </div>
        </header>
        
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center" role="img" aria-label={`${t('businesses.rating')}: ${business.average_rating} ${t('businesses.out_of_5')}`}>
            {renderRatingStars(business.average_rating)}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {business.average_rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            ({business.total_reviews} {t('businesses.reviews')})
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {business.description || business.short_description}
        </p>
        
        {/* Portuguese Specialties */}
        {business.portuguese_specialties && business.portuguese_specialties.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {business.portuguese_specialties.slice(0, compact ? 2 : 3).map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {business.portuguese_specialties.length > (compact ? 2 : 3) && (
                <span className="text-xs text-gray-500">
                  +{business.portuguese_specialties.length - (compact ? 2 : 3)} {t('businesses.more')}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{business.address}</span>
        </div>
        
        {/* Services */}
        <div className="flex items-center gap-3 mb-4">
          {business.delivery_available && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {t('businesses.delivery')}
            </span>
          )}
          {business.takeaway_available && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {t('businesses.takeaway')}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <footer className="flex gap-2">
          {business.phone && (
            <button
              {...callButtonProps}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
            >
              <PhoneIcon className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">{t('businesses.call')}</span>
            </button>
          )}
          
          {business.website_url && (
            <button
              {...websiteButtonProps}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-500 min-h-[44px]"
            >
              <GlobeAltIcon className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">{t('businesses.website')}</span>
            </button>
          )}
          
          <button
            {...directionsButtonProps}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-[44px]"
          >
            <MapPinIcon className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">{t('businesses.directions')}</span>
          </button>
        </footer>
      </div>
    </article>
  )

  return (
    <Link 
      href={ROUTES.BUSINESSES.DETAILS(business.id)}
      {...cardLinkProps}
      className="block h-full focus:outline-none"
    >
      {cardContent}
    </Link>
  )
}