'use client'

import { useState } from 'react'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_BUSINESS_CATEGORIES } from '@/config/business-categories'
import type { BusinessCarouselItem } from '@/config/business-directory-carousels'
import { 
  MapPinIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  ClockIcon,
  StarIcon,
  CheckBadgeIcon,
  FireIcon,
  SparklesIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon } from '@heroicons/react/24/outline'

interface BusinessCardProps {
  business: BusinessCarouselItem
  distance?: string | null
  compact?: boolean
  featured?: boolean
  language?: 'en' | 'pt'
  className?: string
  onSelect?: (business: BusinessCarouselItem) => void
}

export default function BusinessCard({
  business,
  distance,
  compact = false,
  featured = false,
  language: propLanguage,
  className = '',
  onSelect
}: BusinessCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { language: contextLanguage } = useLanguage()
  const language = propLanguage || contextLanguage
  const isPortuguese = language === 'pt'
  
  // Get category details
  const categoryDetails = PORTUGUESE_BUSINESS_CATEGORIES.find(cat => cat.id === business.category)
  
  // Format business location
  const locationString = `${business.location.city}, ${business.location.region}`
  
  // Format rating display
  const formatRating = (rating: number) => {
    return rating % 1 === 0 ? rating.toString() : rating.toFixed(1)
  }
  
  // Get region flag emoji
  const getRegionFlag = (ownerCountry: string): string => {
    const flags: Record<string, string> = {
      'portugal': '🇵🇹',
      'brazil': '🇧🇷',
      'angola': '🇦🇴',
      'cape_verde': '🇨🇻',
      'mozambique': '🇲🇿',
      'guinea_bissau': '🇬🇼',
      'sao_tome_principe': '🇸🇹',
      'east_timor': '🇹🇱',
      'portuguese_diaspora': '🌍'
    }
    return flags[ownerCountry] || '🇵🇹'
  }
  
  const handleClick = () => {
    onSelect?.(business)
  }

  if (compact) {
    // List view - horizontal layout with enhanced mobile spacing
    return (
      <div 
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer portuguese-touch-area ${className}`}
        onClick={handleClick}
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-36 h-28 flex-shrink-0">
            <Image 
              src={business.image} 
              alt={business.title[language]}
              fill
              className="object-cover"
              sizes="144px"
            />
            {business.isVerified && (
              <div className="absolute top-2 right-2">
                <CheckBadgeIcon className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 card-padding">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {business.title[language]}
                  </h3>
                  {business.isPremium && (
                    <SparklesIcon className="w-4 h-4 text-yellow-500" />
                  )}
                  {business.isFeatured && (
                    <FireIcon className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <span>{categoryDetails?.emoji}</span>
                  <span>{categoryDetails?.name[language]}</span>
                  <span className="text-gray-400">•</span>
                  <span>{getRegionFlag(business.ownerCountry)}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    <span>{formatRating(business.rating)}</span>
                    <span className="text-gray-400">({business.reviewCount})</span>
                  </div>
                  
                  {distance && (
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span>{distance}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center touch-spacing">
                <FavoriteButton
                  itemId={business.id}
                  itemType="business"
                  itemTitle={business.title[language]}
                  itemDescription={business.description[language]}
                  itemImageUrl={business.image}
                  size="sm"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`tel:${business.contact.phone}`, '_self')
                  }}
                  className="portuguese-button-touch text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <PhoneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Grid view - vertical layout with revolutionary mobile spacing
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group cursor-pointer portuguese-touch-area scroll-fade-in ${
        featured ? 'ring-2 ring-primary-500 border-primary-200' : ''
      } ${className}`}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={business.image} 
          alt={business.title[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {business.isVerified && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckBadgeIcon className="w-3 h-3" />
              {isPortuguese ? 'Verificado' : 'Verified'}
            </div>
          )}
          {business.isPremium && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              {isPortuguese ? 'Premium' : 'Premium'}
            </div>
          )}
          {featured && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <FireIcon className="w-3 h-3" />
              {isPortuguese ? 'Destaque' : 'Featured'}
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            itemId={business.id}
            itemType="business"
            itemTitle={business.title[language]}
            itemDescription={business.description[language]}
            itemImageUrl={business.image}
            size="sm"
            className="bg-white/80 backdrop-blur-sm"
          />
        </div>
        
        {/* Price Range */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {business.priceRange}
          </span>
        </div>
        
        {/* Distance */}
        {distance && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <MapPinIcon className="w-3 h-3" />
              {distance}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {business.title[language]}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span>{categoryDetails?.emoji}</span>
              <span>{categoryDetails?.name[language]}</span>
              <span className="text-gray-400">•</span>
              <span>{getRegionFlag(business.ownerCountry)}</span>
              <span className="capitalize">{business.ownerCountry.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description[language]}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(business.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {formatRating(business.rating)} ({business.reviewCount} {isPortuguese ? 'avaliações' : 'reviews'})
          </span>
        </div>
        
        {/* Location & Contact */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{locationString}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{business.contact.phone}</span>
          </div>
          
          {business.contact.website && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GlobeAltIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <a 
                href={business.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {isPortuguese ? 'Website' : 'Website'}
              </a>
            </div>
          )}
        </div>
        
        {/* Specialties */}
        {business.specialties && business.specialties.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {business.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {business.specialties.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{business.specialties.length - 3} {isPortuguese ? 'mais' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // Handle view details
            }}
            className="flex-1 bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            {isPortuguese ? 'Ver Detalhes' : 'View Details'}
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              window.open(`tel:${business.contact.phone}`, '_self')
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { BusinessCard }