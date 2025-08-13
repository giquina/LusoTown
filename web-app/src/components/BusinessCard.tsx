'use client'

import { useState } from 'react'
import FavoriteButton from '@/components/FavoriteButton'
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
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
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          {phone && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <PhoneIcon className="w-4 h-4 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          )}
          
          {website && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <GlobeAltIcon className="w-4 h-4 flex-shrink-0" />
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline truncate"
              >
                Visit Website
              </a>
            </div>
          )}
          
          {hours && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ClockIcon className="w-4 h-4 flex-shrink-0" />
              <span>{hours}</span>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
          View Business Details
        </button>
      </div>
    </div>
  )
}