'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { ROUTES } from '@/config/routes'
import { formatPrice } from '@/config/pricing'

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
}

export default function BusinessCard({ 
  business, 
  showDistance = false, 
  compact = false 
}: BusinessCardProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const getCulturalFlag = (culturalFocus: string) => {
    switch (culturalFocus) {
      case 'portugal': return '🇵🇹'
      case 'brazil': return '🇧🇷'
      case 'africa': return '🌍'
      case 'mixed': return '🌐'
      default: return '🇵🇹'
    }
  }

  const getBusinessTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      restaurant: '🍽️',
      cafe: '☕',
      bakery: '🥐',
      grocery: '🛒',
      hair_salon: '💇',
      beauty_salon: '💄',
      legal_services: '⚖️',
      doctor: '🏥',
      real_estate: '🏠',
      cultural_center: '🎭',
      school: '📚',
      church: '⛪',
      other: '🏪'
    }
    return icons[type] || '🏪'
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 ${compact ? 'p-3' : 'p-4'}`}>
      {/* Premium Badge */}
      {business.is_premium && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
          {t('business.premium', 'Premium')}
        </div>
      )}

      <div className={`flex ${compact ? 'space-x-3' : 'space-x-4'}`}>
        {/* Business Image/Icon */}
        <div className={`flex-shrink-0 ${compact ? 'w-16 h-16' : 'w-20 h-20'}`}>
          {business.image_url ? (
            <Image
              src={business.image_url}
              alt={business.name}
              width={compact ? 64 : 80}
              height={compact ? 64 : 80}
              className="rounded-lg object-cover"
            />
          ) : (
            <div 
              className={`${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-lg flex items-center justify-center text-2xl`}
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              {getBusinessTypeIcon(business.business_type)}
            </div>
          )}
        </div>

        {/* Business Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              {/* Name and Cultural Flag */}
              <div className="flex items-center space-x-2">
                <h3 className={`font-semibold text-gray-900 truncate ${compact ? 'text-sm' : 'text-lg'}`}>
                  {business.name}
                </h3>
                <span className="text-lg" title={`Cultural focus: ${business.cultural_focus}`}>
                  {getCulturalFlag(business.cultural_focus)}
                </span>
                {business.is_verified && (
                  <span className="text-blue-500" title={t('business.verified', 'Verified')}>
                    ✓
                  </span>
                )}
              </div>

              {/* Business Type and Price Range */}
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-gray-600 capitalize ${compact ? 'text-xs' : 'text-sm'}`}>
                  {business.business_type.replace('_', ' ')}
                </span>
                <span className="text-gray-400">•</span>
                <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm'}`} style={{ color: colors.accent }}>
                  {business.price_range}
                </span>
              </div>

              {/* Address */}
              <p className={`text-gray-600 mt-1 ${compact ? 'text-xs' : 'text-sm'}`}>
                {business.address}
                {showDistance && business.distance_km && (
                  <span className="ml-2 text-gray-500">
                    • {business.distance_km}km {t('common.away', 'away')}
                  </span>
                )}
              </p>

              {/* Portuguese Specialties */}
              {business.portuguese_specialties && business.portuguese_specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {business.portuguese_specialties.slice(0, compact ? 2 : 3).map((specialty, index) => (
                    <span 
                      key={index}
                      className={`inline-block px-2 py-1 rounded-full text-white ${compact ? 'text-xs' : 'text-xs'}`}
                      style={{ backgroundColor: colors.secondary }}
                    >
                      {specialty.replace('_', ' ')}
                    </span>
                  ))}
                  {business.portuguese_specialties.length > (compact ? 2 : 3) && (
                    <span className="text-gray-500 text-xs">
                      +{business.portuguese_specialties.length - (compact ? 2 : 3)} more
                    </span>
                  )}
                </div>
              )}

              {/* Rating and Reviews */}
              {business.average_rating > 0 && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex">
                    {renderStars(business.average_rating)}
                  </div>
                  <span className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                    {business.average_rating.toFixed(1)} ({business.total_reviews} {t('common.reviews', 'reviews')})
                  </span>
                </div>
              )}

              {/* Services */}
              {(business.delivery_available || business.takeaway_available) && (
                <div className="flex space-x-3 mt-2">
                  {business.delivery_available && (
                    <span className="flex items-center text-green-600 text-xs">
                      🚚 {t('business.delivery', 'Delivery')}
                    </span>
                  )}
                  {business.takeaway_available && (
                    <span className="flex items-center text-blue-600 text-xs">
                      🥡 {t('business.takeaway', 'Takeaway')}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
        <div className="flex space-x-2">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex items-center space-x-1 text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <span>📞</span>
              <span className="hidden sm:inline">{t('business.call', 'Call')}</span>
            </a>
          )}
          
          {business.website_url && (
            <a
              href={business.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <span>🌐</span>
              <span className="hidden sm:inline">{t('business.website', 'Website')}</span>
            </a>
          )}
        </div>

        <Link
          href={`${ROUTES.businessDirectory}/${business.id}`}
          className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-colors"
          style={{ backgroundColor: colors.primary }}
        >
          {t('business.view_details', 'View Details')}
        </Link>
      </div>
    </div>
  )
}