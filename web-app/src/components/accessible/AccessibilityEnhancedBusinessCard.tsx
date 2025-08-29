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

export default function AccessibilityEnhancedBusinessCard({
  business,
  distance,
  compact = false,
  featured = false,
  language: propLanguage,
  className = '',
  onSelect
}: BusinessCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { language: contextLanguage, t } = useLanguage()
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
  
  // Enhanced keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
  
  const handleClick = () => {
    onSelect?.(business)
  }

  // Enhanced ARIA labels
  const businessAriaLabel = t('business.card.aria_label', 
    '{{businessName}} - {{category}} business in {{location}}. {{rating}} star rating from {{reviewCount}} reviews. {{distance}} {{verification}} {{premium}}',
    {
      businessName: business.title[language],
      category: categoryDetails?.name[language] || business.category,
      location: locationString,
      rating: formatRating(business.rating),
      reviewCount: business.reviewCount,
      distance: distance ? `${distance} away.` : '',
      verification: business.isVerified ? t('business.verified', 'Verified business.') : '',
      premium: business.isPremium ? t('business.premium', 'Premium listing.') : ''
    }
  )

  const phoneAriaLabel = t('business.phone.aria_label', 'Call {{businessName}} at {{phone}}', {
    businessName: business.title[language],
    phone: business.contact.phone
  })

  const websiteAriaLabel = t('business.website.aria_label', 'Visit {{businessName}} website', {
    businessName: business.title[language]
  })

  if (compact) {
    // List view - horizontal layout with enhanced accessibility
    return (
      <article 
        className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer portuguese-touch-area focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={businessAriaLabel}
        aria-describedby={`business-${business.id}-details`}
      >
        <div className="flex">
          {/* Image with Enhanced Alt Text */}
          <div className="relative w-36 h-28 flex-shrink-0">
            <Image 
              src={business.image} 
              alt={t('business.image.alt', '{{businessName}} - {{category}} business storefront in {{city}}', {
                businessName: business.title[language],
                category: categoryDetails?.name[language] || business.category,
                city: business.location.city
              })}
              fill
              className="object-cover"
              sizes="144px"
            />
            {business.isVerified && (
              <div 
                className="absolute top-2 right-2"
                role="img"
                aria-label={t('business.verification.badge', 'Verified business badge')}
              >
                <CheckBadgeIcon className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
          
          {/* Content with Semantic Structure */}
          <div className="flex-1 card-padding">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <header>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-gray-900 truncate">
                      {business.title[language]}
                    </h2>
                    {business.isPremium && (
                      <span role="img" aria-label={t('business.premium.badge', 'Premium business')}>
                        <SparklesIcon className="w-4 h-4 text-yellow-500" />
                      </span>
                    )}
                    {business.isFeatured && (
                      <span role="img" aria-label={t('business.featured.badge', 'Featured business')}>
                        <FireIcon className="w-4 h-4 text-orange-500" />
                      </span>
                    )}
                  </div>
                </header>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1" id={`business-${business.id}-details`}>
                  <span role="img" aria-label={categoryDetails?.name[language]}>{categoryDetails?.emoji}</span>
                  <span>{categoryDetails?.name[language]}</span>
                  <span className="text-gray-400" aria-hidden="true">•</span>
                  <span role="img" aria-label={t('business.country.label', 'Business owner from {{country}}', { country: business.ownerCountry.replace('_', ' ') })}>
                    {getRegionFlag(business.ownerCountry)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div 
                      role="img" 
                      aria-label={t('business.rating.stars', '{{rating}} out of 5 stars', { rating: formatRating(business.rating) })}
                      className="flex items-center"
                    >
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1">{formatRating(business.rating)}</span>
                      <span className="text-gray-400 ml-1" aria-label={t('business.reviews.count', 'from {{count}} reviews', { count: business.reviewCount })}>
                        ({business.reviewCount})
                      </span>
                    </div>
                  </div>
                  
                  {distance && (
                    <div className="flex items-center gap-1" aria-label={t('business.distance.label', '{{distance}} away', { distance })}>
                      <MapPinIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      <span>{distance}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons with Enhanced Accessibility */}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(`tel:${business.contact.phone}`, '_self')
                    }
                  }}
                  aria-label={phoneAriaLabel}
                  className="portuguese-button-touch text-gray-400 hover:text-primary-500 focus:text-primary-500 transition-colors min-h-[56px] min-w-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                >
                  <PhoneIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
  
  // Grid view - vertical layout with full accessibility
  return (
    <article 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 group cursor-pointer portuguese-touch-area scroll-fade-in focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 ${
        featured ? 'ring-2 ring-primary-500 border-primary-200' : ''
      } ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={businessAriaLabel}
      aria-describedby={`business-${business.id}-full-details`}
    >
      {/* Image with Full Accessibility */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={business.image} 
          alt={t('business.image.detailed_alt', '{{businessName}} storefront - {{category}} business located in {{city}}, {{region}}. {{description}}', {
            businessName: business.title[language],
            category: categoryDetails?.name[language] || business.category,
            city: business.location.city,
            region: business.location.region,
            description: business.description[language].substring(0, 100)
          })}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" aria-hidden="true"></div>
        
        {/* Top badges with Screen Reader Support */}
        <div className="absolute top-3 left-3 flex gap-2">
          {business.isVerified && (
            <div 
              className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              role="img"
              aria-label={t('business.verification.full_badge', 'Verified Portuguese-speaking business')}
            >
              <CheckBadgeIcon className="w-3 h-3" aria-hidden="true" />
              {t('business.verified_label', isPortuguese ? 'Verificado' : 'Verified')}
            </div>
          )}
          {business.isPremium && (
            <div 
              className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              role="img"
              aria-label={t('business.premium.full_badge', 'Premium listing with enhanced features')}
            >
              <SparklesIcon className="w-3 h-3" aria-hidden="true" />
              {t('business.premium_label', isPortuguese ? 'Premium' : 'Premium')}
            </div>
          )}
          {featured && (
            <div 
              className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              role="img"
              aria-label={t('business.featured.full_badge', 'Featured business in Portuguese community')}
            >
              <FireIcon className="w-3 h-3" aria-hidden="true" />
              {t('business.featured_label', isPortuguese ? 'Destaque' : 'Featured')}
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
        
        {/* Price Range with Accessibility */}
        <div className="absolute bottom-3 left-3">
          <span 
            className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
            role="text"
            aria-label={t('business.price_range.label', 'Price range: {{range}}', { range: business.priceRange })}
          >
            {business.priceRange}
          </span>
        </div>
        
        {/* Distance with Context */}
        {distance && (
          <div className="absolute bottom-3 right-3">
            <span 
              className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
              role="text"
              aria-label={t('business.distance.detailed', '{{distance}} from your location', { distance })}
            >
              <MapPinIcon className="w-3 h-3" aria-hidden="true" />
              {distance}
            </span>
          </div>
        )}
      </div>
      
      {/* Content with Full Semantic Structure */}
      <div className="p-4">
        {/* Header */}
        <header className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {business.title[language]}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span role="img" aria-label={categoryDetails?.name[language]}>{categoryDetails?.emoji}</span>
              <span>{categoryDetails?.name[language]}</span>
              <span className="text-gray-400" aria-hidden="true">•</span>
              <span role="img" aria-label={t('business.heritage.label', 'Portuguese-speaking business from {{country}}', { country: business.ownerCountry.replace('_', ' ') })}>
                {getRegionFlag(business.ownerCountry)}
              </span>
              <span className="capitalize">{business.ownerCountry.replace('_', ' ')}</span>
            </div>
          </div>
        </header>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2" id={`business-${business.id}-full-details`}>
          {business.description[language]}
        </p>
        
        {/* Rating with Enhanced Accessibility */}
        <div className="flex items-center gap-2 mb-4">
          <div 
            role="img" 
            aria-label={t('business.rating.detailed', '{{rating}} out of 5 stars from {{count}} customer reviews', { 
              rating: formatRating(business.rating), 
              count: business.reviewCount 
            })}
            className="flex items-center"
          >
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(business.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {formatRating(business.rating)} ({business.reviewCount} {t('business.reviews.text', isPortuguese ? 'avaliações' : 'reviews')})
          </span>
        </div>
        
        {/* Location & Contact with Enhanced Accessibility */}
        <address className="space-y-2 mb-4 not-italic">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <span className="truncate" aria-label={t('business.address.label', 'Business address: {{address}}', { address: locationString })}>
              {locationString}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <a 
              href={`tel:${business.contact.phone}`}
              className="truncate hover:text-primary-600 focus:text-primary-600 transition-colors focus:outline-none focus:underline"
              aria-label={phoneAriaLabel}
              onClick={(e) => e.stopPropagation()}
            >
              {business.contact.phone}
            </a>
          </div>
          
          {business.contact.website && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GlobeAltIcon className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
              <a 
                href={business.contact.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline focus:underline truncate focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={websiteAriaLabel}
                onClick={(e) => e.stopPropagation()}
              >
                {t('business.website.text', isPortuguese ? 'Website' : 'Website')}
              </a>
            </div>
          )}
        </address>
        
        {/* Specialties with Accessibility */}
        {business.specialties && business.specialties.length > 0 && (
          <section className="mb-4" aria-label={t('business.specialties.section', 'Business specialties')}>
            <div className="flex flex-wrap gap-1" role="list">
              {business.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  role="listitem"
                >
                  {specialty}
                </span>
              ))}
              {business.specialties.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1" role="text">
                  +{business.specialties.length - 3} {t('business.specialties.more', isPortuguese ? 'mais' : 'more')}
                </span>
              )}
            </div>
          </section>
        )}
        
        {/* Action Buttons with Full Accessibility */}
        <div className="flex gap-2" role="group" aria-label={t('business.actions.group', 'Business contact actions')}>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              // Handle view details
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                // Handle view details
              }
            }}
            className="flex-1 bg-primary-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-600 focus:bg-primary-600 transition-colors text-sm min-h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={t('business.view_details.aria', 'View detailed information for {{businessName}}', { businessName: business.title[language] })}
          >
            {t('business.view_details.text', isPortuguese ? 'Ver Detalhes' : 'View Details')}
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              window.open(`tel:${business.contact.phone}`, '_self')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                window.open(`tel:${business.contact.phone}`, '_self')
              }
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:bg-gray-50 transition-colors min-h-[56px] min-w-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={phoneAriaLabel}
          >
            <PhoneIcon className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{t('business.call.text', 'Call')}</span>
          </button>
        </div>
      </div>
    </article>
  )
}