'use client'

import { useState } from 'react'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'
import { useLanguage } from '@/context/LanguageContext'
import { 
  MapPinIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface BusinessCardProps {
  id: string
  name: string
  category: string
  description: string
  location: string
  phone?: string
  website?: string
  rating: number
  reviewCount: number
  hours?: string
  imageUrl?: string
}

export default function BusinessCard({
  id,
  name,
  category,
  description,
  location,
  phone,
  website,
  rating,
  reviewCount,
  hours,
  imageUrl
}: BusinessCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group min-h-[420px] sm:min-h-[460px] flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="text-4xl">🏪</div>
          </div>
        )}
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            itemId={id}
            itemType="business"
            itemTitle={name}
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
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6 flex-grow flex flex-col pb-20 sm:pb-16 relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1 min-w-0 break-words">
            {name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words leading-relaxed">
          {description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating} ({reviewCount} reviews)
          </span>
        </div>
        
        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3 text-sm text-gray-600 min-w-0">
            <MapPinIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
            <span className="truncate max-w-full line-clamp-1">{location}</span>
          </div>
          
          {phone && (
            <div className="flex items-center gap-3 text-sm text-gray-600 min-w-0">
              <PhoneIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span className="truncate">{phone}</span>
            </div>
          )}
          
          {website && (
            <div className="flex items-center gap-3 text-sm text-gray-600 min-w-0">
              <GlobeAltIcon className="w-5 h-5 text-action-500 flex-shrink-0" />
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline truncate"
              >
                <span className="hidden sm:inline">{isPortuguese ? 'Visitar Website' : 'Visit Website'}</span>
                <span className="sm:hidden">{isPortuguese ? 'Website' : 'Website'}</span>
              </a>
            </div>
          )}
          
          {hours && (
            <div className="flex items-center gap-3 text-sm text-gray-600 min-w-0">
              <ClockIcon className="w-5 h-5 text-premium-500 flex-shrink-0" />
              <span className="truncate">{hours}</span>
            </div>
          )}
        </div>
        
        {/* Action Buttons - Fixed at bottom with mobile-optimized layout */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center text-xs sm:text-sm flex items-center justify-center min-h-[44px]">
              <span className="hidden sm:inline">{isPortuguese ? 'Ver Detalhes do Negócio' : 'View Business Details'}</span>
              <span className="sm:hidden">{isPortuguese ? 'Ver Detalhes' : 'View Details'}</span>
            </button>
            
            <button className="sm:flex-shrink-0 border border-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 text-center text-xs sm:text-sm flex items-center justify-center min-h-[44px] sm:min-w-[120px]">
              <span className="hidden sm:inline">{isPortuguese ? 'Contactar' : 'Contact'}</span>
              <span className="sm:hidden">{isPortuguese ? 'Contactar' : 'Contact'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}