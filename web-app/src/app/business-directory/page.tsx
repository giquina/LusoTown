'use client'
import Image from 'next/image'

import React, { useState, useEffect, useMemo } from 'react'

// ✅ PUBLIC ACCESS: This page is accessible to all users without authentication
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { portugueseBusinessService, PortugueseBusiness, BusinessFilters, BusinessCategory, LondonArea, PortugueseRegion } from '@/lib/businessDirectory'
import { geolocationService, BusinessDistance } from '@/lib/geolocation'
import BusinessMap from '@/components/BusinessMap'
import NearMeButton, { DistanceIndicator } from '@/components/NearMeButton'
// import BusinessSubmissionForm from '@/components/BusinessSubmissionForm' // TODO: Implement component
import { LUSOPHONE_CELEBRATIONS, CULTURAL_WISDOM, getFeaturedCelebrations, getRandomCulturalWisdom } from '@/config/lusophone-celebrations'
import { PALOP_BUSINESS_DIRECTORY, getFeaturedPALOPBusinesses, getPALOPBusinessesByCategory } from '@/config/palop-business-directory'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { 
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  ClockIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BuildingStorefrontIcon,
  TagIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  SparklesIcon,
  HeartIcon,
  XMarkIcon,
  FlagIcon,
  MapIcon,
  ListBulletIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, UsersIcon } from '@heroicons/react/24/solid'
import Footer from '@/components/Footer'

// Cultural Wisdom Display Component
const CulturalWisdomDisplay: React.FC = () => {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [currentWisdom, setCurrentWisdom] = useState(() => getRandomCulturalWisdom())
  const [fadeClass, setFadeClass] = useState('opacity-100')

  // Rotate wisdom every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0')
      setTimeout(() => {
        setCurrentWisdom(getRandomCulturalWisdom())
        setFadeClass('opacity-100')
      }, 300)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 text-center p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
      <div className={`transition-opacity duration-300 ${fadeClass}`}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-2xl">{currentWisdom.flagEmoji}</span>
          <span className="text-sm font-medium text-primary-700">
            {currentWisdom.origin[language]}
          </span>
        </div>
        
        <p className="text-lg italic text-gray-800 mb-3 font-medium">
          "{currentWisdom.quote[language]}"
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
          <span>🌍</span>
          <span>{currentWisdom.philosophy[language].slice(0, 80)}...</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>{isPortuguese ? 'Comunidade Lusófona Mundial' : 'Global Lusophone Community'}</span>
          <span>•</span>
          <span>{isPortuguese ? 'Tradições Empresariais' : 'Business Traditions'}</span>
        </div>
      </div>
    </div>
  )
}

interface BusinessCardProps {
  business: PortugueseBusiness
  featured?: boolean
  distance?: number
  viewMode?: 'grid' | 'list'
  onFavorite?: (businessId: string) => void
  isFavorited?: boolean
}

interface FilterState {
  search: string
  category: BusinessCategory[]
  palop: boolean
  cultural: boolean
  londonArea: LondonArea[]
  verificationStatus: 'verified' | 'all'
  sortBy: 'featured' | 'rating' | 'distance' | 'newest' | 'alphabetical'
  priceRange?: ('£' | '££' | '£££' | '££££')[]
  openNow?: boolean
}

const BusinessCard: React.FC<BusinessCardProps> = ({ 
  business, 
  featured = false, 
  distance, 
  viewMode = 'grid',
  onFavorite,
  isFavorited = false 
}) => {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const formatHours = (hours: string) => {
    if (hours === 'Closed') return isPortuguese ? 'Fechado' : 'Closed'
    return hours
  }

  const getCategoryLabel = (category: BusinessCategory) => {
    const categories = {
      restaurant: { en: 'Restaurant', pt: 'Restaurante' },
      cafe: { en: 'Café', pt: 'Café' },
      bakery: { en: 'Bakery', pt: 'Pastelaria' },
      grocery: { en: 'Grocery', pt: 'Mercearia' },
      services: { en: 'Services', pt: 'Serviços' },
      travel: { en: 'Travel Agency', pt: 'Agência de Viagens' },
      cultural_center: { en: 'Cultural Center', pt: 'Centro Cultural' },
      healthcare: { en: 'Healthcare', pt: 'Saúde' },
      legal: { en: 'Legal Services', pt: 'Serviços Jurídicos' },
      education: { en: 'Education', pt: 'Educação' },
      beauty: { en: 'Beauty & Wellness', pt: 'Beleza e Bem-estar' },
      retail: { en: 'Retail', pt: 'Comércio' },
      real_estate: { en: 'Real Estate', pt: 'Imobiliário' },
      financial: { en: 'Financial Services', pt: 'Serviços Financeiros' },
      consulting: { en: 'Consulting', pt: 'Consultoria' },
      automotive: { en: 'Automotive', pt: 'Automóvel' },
      home_services: { en: 'Home Services', pt: 'Serviços Domésticos' },
      entertainment: { en: 'Entertainment', pt: 'Entretenimento' },
      technology: { en: 'Technology', pt: 'Tecnologia' },
    }
    return categories[category]?.[language] || category
  }

  const getRegionFlag = (region: PortugueseRegion) => {
    const flags = {
      portugal_mainland: '🇵🇹',
      portugal_azores: '🇵🇹',
      portugal_madeira: '🇵🇹',
      brazil: '🇧🇷',
      angola: '🇦🇴',
      mozambique: '🇲🇿',
      cape_verde: '🇨🇻',
      guinea_bissau: '🇬🇼',
      sao_tome_principe: '🇸🇹',
      east_timor: '🇹🇱',
      macau: '🇲🇴',
      portuguese_diaspora: '🌍'
    }
    return flags[region] || '🇵🇹'
  }

  const getRegionName = (region: PortugueseRegion) => {
    const regionNames = {
      portugal_mainland: { pt: 'Portugal Continental', en: 'Mainland Portugal' },
      portugal_azores: { pt: 'Açores', en: 'Azores' },
      portugal_madeira: { pt: 'Madeira', en: 'Madeira' },
      brazil: { pt: 'Brasil', en: 'Brazil' },
      angola: { pt: 'Angola', en: 'Angola' },
      mozambique: { pt: 'Moçambique', en: 'Mozambique' },
      cape_verde: { pt: 'Cabo Verde', en: 'Cape Verde' },
      guinea_bissau: { pt: 'Guiné-Bissau', en: 'Guinea-Bissau' },
      sao_tome_principe: { pt: 'São Tomé e Príncipe', en: 'São Tomé and Príncipe' },
      east_timor: { pt: 'Timor-Leste', en: 'East Timor' },
      macau: { pt: 'Macau', en: 'Macau' },
      portuguese_diaspora: { pt: 'Diáspora Portuguesa', en: 'Lusophone Diaspora' }
    }
    return regionNames[region]?.[language] || region.replace('_', ' ')
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border ${
      featured ? 'border-accent-300 ring-2 ring-accent-200' : 'border-gray-100'
    } overflow-hidden hover:shadow-xl transition-all duration-300 group ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      {featured && (
        <div className="bg-gradient-to-r from-accent-400 to-premium-400 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <SparklesIcon className="w-4 h-4" />
          {isPortuguese ? 'Negócio em Destaque' : 'Featured Business'}
        </div>
      )}
      
      {/* Image */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' 
          ? 'w-32 h-32 flex-shrink-0 sm:w-40 sm:h-40' 
          : 'h-48'
      }`}>
        {business.photos.length > 0 ? (
          <div className="relative w-full h-full">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="animate-pulse w-8 h-8 bg-primary-300 rounded"></div>
              </div>
            )}
            <Image 
              src={business.photos[0]} 
              alt={business.name}
              fill
              sizes={viewMode === 'list' ? '160px' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <BuildingStorefrontIcon className="w-16 h-16 text-primary-400" />
          </div>
        )}
        
        {/* Verification Badge */}
        {business.verificationStatus === 'verified' && (
          <div className="absolute top-3 left-3">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckBadgeIcon className="w-3 h-3" />
              {isPortuguese ? 'Verificado' : 'Verified'}
            </div>
          </div>
        )}
        
        {/* Category & Region */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {getCategoryLabel(business.category)}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            {getRegionFlag(business.ownerRegion)}
            {getRegionName(business.ownerRegion)}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(business.id)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors active:scale-95"
        >
          <HeartIcon className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      {/* Content */}
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {isPortuguese && business.namePortuguese ? business.namePortuguese : business.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{getRegionFlag(business.ownerRegion)}</span>
            <span>{isPortuguese ? `Proprietário: ${business.ownerName}` : `Owner: ${business.ownerName}`}</span>
            <span>•</span>
            <span>{isPortuguese ? `Desde ${business.yearEstablished}` : `Since ${business.yearEstablished}`}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {isPortuguese && business.descriptionPortuguese ? business.descriptionPortuguese : business.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {business.rating} ({business.reviewCount} {isPortuguese ? 'avaliações' : 'reviews'})
          </span>
        </div>
        
        {/* Special Offers */}
        {business.specialOffers && business.specialOffers.length > 0 && (
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <TagIcon className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-medium text-accent-800">
                {isPortuguese ? 'Oferta Especial' : 'Special Offer'}
              </span>
            </div>
            <p className="text-sm text-accent-700">
              {isPortuguese && business.specialOffers[0].titlePortuguese 
                ? business.specialOffers[0].titlePortuguese 
                : business.specialOffers[0].title}
            </p>
          </div>
        )}
        
        {/* Cultural Events */}
        {business.culturalEvents && business.culturalEvents.length > 0 && (
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <CalendarDaysIcon className="w-4 h-4 text-secondary-600" />
              <span className="text-sm font-medium text-secondary-800">
                {isPortuguese ? 'Eventos Culturais' : 'Cultural Events'}
              </span>
            </div>
            <p className="text-sm text-secondary-700">
              {isPortuguese && business.culturalEvents[0].titlePortuguese 
                ? business.culturalEvents[0].titlePortuguese 
                : business.culturalEvents[0].title}
            </p>
          </div>
        )}
        
        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="truncate block">{business.address}, {business.postcode}</span>
              {distance && (
                <DistanceIndicator distance={distance} className="text-xs text-primary-600 mt-1" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <PhoneIcon className="w-4 h-4 flex-shrink-0" />
            <span>{business.phone}</span>
          </div>
          
          {business.website && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <GlobeAltIcon className="w-4 h-4 flex-shrink-0" />
              <a 
                href={business.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline truncate"
              >
                {isPortuguese ? 'Visitar Website' : 'Visit Website'}
              </a>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatHours(business.openingHours.monday)}</span>
          </div>
        </div>
        
        {/* Languages Spoken */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {business.languagesSpoken.map(lang => (
              <span
                key={lang}
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
              >
                {lang === 'portuguese' ? (isPortuguese ? 'Português' : 'Lusophone') : 
                 lang === 'english' ? (isPortuguese ? 'Inglês' : 'English') : lang}
              </span>
            ))}
          </div>
        </div>
        
        {/* Community Badges */}
        {business.communityBadges.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-xs text-gray-600">{isPortuguese ? 'Distintivos' : 'Badges'}</span>
            </div>
            <div className="flex space-x-1">
              {business.communityBadges.slice(0, 3).map(badge => (
                <div
                  key={badge.id}
                  className="text-xs p-1 rounded"
                  title={isPortuguese ? badge.namePortuguese : badge.name}
                >
                  <span className="text-base">{badge.icon}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 min-h-[44px] active:scale-95">
            {isPortuguese ? 'Ver Detalhes' : 'View Details'}
          </button>
          <a 
            href={`tel:${business.phone}`}
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors min-h-[44px] flex items-center justify-center active:scale-95"
          >
            <PhoneIcon className="w-5 h-5" />
          </a>
          {business.website && (
            <a 
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors min-h-[44px] flex items-center justify-center active:scale-95"
            >
              <GlobeAltIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BusinessDirectory() {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  const { coordinates, isLoading: locationLoading, error: locationError } = useGeolocation()
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Core state
  const [businesses, setBusinesses] = useState<PortugueseBusiness[]>([])
  const [featuredBusinesses, setFeaturedBusinesses] = useState<PortugueseBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [selectedBusiness, setSelectedBusiness] = useState<PortugueseBusiness | null>(null)
  const [businessDistances, setBusinessDistances] = useState<BusinessDistance[]>([])
  const [favoritedBusinesses, setFavoritedBusinesses] = useState<Set<string>>(new Set())
  
  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'grid'>('grid')
  const [cardViewMode, setCardViewMode] = useState<'grid' | 'list'>('grid')
  
  // Enhanced filters state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: [],
    palop: false,
    cultural: false,
    londonArea: [],
    verificationStatus: 'verified',
    sortBy: 'featured',
    priceRange: [],
    openNow: false
  })

  // Auto-detect nearby businesses when location is available
  useEffect(() => {
    if (coordinates && !locationLoading) {
      handleLocationUpdate({ coordinates }, businessDistances)
    }
  }, [coordinates, locationLoading])

  useEffect(() => {
    loadBusinesses()
  }, [filters])

  // Load saved favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('lusotown-favorite-businesses')
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavoritedBusinesses(new Set(parsed))
      } catch (error) {
        console.warn('Failed to load saved favorites:', error)
      }
    }
  }, [])

  const loadBusinesses = async () => {
    try {
      setLoading(true)
      const result = await portugueseBusinessService.searchBusinesses(filters, 1, 20)
      setBusinesses(result.businesses)
      setFeaturedBusinesses(result.featuredBusinesses)
      setTotal(result.total)
    } catch (error) {
      console.error('Error loading businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleFavoriteToggle = (businessId: string) => {
    setFavoritedBusinesses(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId)
      } else {
        newFavorites.add(businessId)
      }
      
      // Save to localStorage
      localStorage.setItem('lusotown-favorite-businesses', JSON.stringify([...newFavorites]))
      
      return newFavorites
    })
  }

  const removeFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: Array.isArray(prev[key]) 
        ? (prev[key] as any[]).filter(item => item !== value)
        : key === 'search' ? '' : prev[key]
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: [],
      palop: false,
      cultural: false,
      londonArea: [],
      verificationStatus: 'verified',
      sortBy: 'featured',
      priceRange: [],
      openNow: false
    })
  }

  const handleLocationUpdate = (result: any, distances: BusinessDistance[]) => {
    setBusinessDistances(distances)
    // Update sort to show nearest first
    setFilters(prev => ({ ...prev, sortBy: 'distance' }))
  }

  const getBusinessDistance = (businessId: string): number | undefined => {
    return businessDistances.find(bd => bd.businessId === businessId)?.distance
  }

  const isBusinessOpen = (business: PortugueseBusiness): boolean => {
    if (!business.openingHours) return false
    
    const now = new Date()
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDay = dayNames[now.getDay()]
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    const todayHours = business.openingHours[currentDay as keyof typeof business.openingHours]
    if (!todayHours || todayHours === 'Closed') return false
    
    // Parse opening hours (assumes format like "09:00-18:00")
    const hoursParts = todayHours.split('-')
    if (hoursParts.length !== 2) return false
    
    const [openStr, closeStr] = hoursParts
    const openTime = parseTime(openStr)
    const closeTime = parseTime(closeStr)
    
    if (openTime === null || closeTime === null) return false
    
    return currentTime >= openTime && currentTime <= closeTime
  }

  const parseTime = (timeStr: string): number | null => {
    const parts = timeStr.trim().split(':')
    if (parts.length !== 2) return null
    
    const hours = parseInt(parts[0])
    const minutes = parseInt(parts[1])
    
    if (isNaN(hours) || isNaN(minutes)) return null
    
    return hours * 60 + minutes
  }

  // Filter businesses based on current filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchMatch = 
          business.name.toLowerCase().includes(searchLower) ||
          business.namePortuguese?.toLowerCase().includes(searchLower) ||
          business.description.toLowerCase().includes(searchLower) ||
          business.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        
        if (!searchMatch) return false
      }
      
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(business.category)) {
        return false
      }
      
      // PALOP filter
      if (filters.palop) {
        const palopRegions = ['angola', 'mozambique', 'cape_verde', 'guinea_bissau', 'sao_tome_principe']
        if (!palopRegions.includes(business.ownerRegion)) {
          return false
        }
      }
      
      // Cultural filter
      if (filters.cultural && !business.supportsCulture) {
        return false
      }
      
      // Location filter
      if (filters.londonArea.length > 0 && !filters.londonArea.includes(business.londonArea)) {
        return false
      }
      
      // Verification filter
      if (filters.verificationStatus === 'verified' && business.verificationStatus !== 'verified') {
        return false
      }
      
      // Open now filter
      if (filters.openNow && !isBusinessOpen(business)) {
        return false
      }
      
      return true
    })
  }, [businesses, filters])

  const handleBusinessSubmissionSuccess = (businessId: string) => {
    setShowSubmissionForm(false)
    // Optionally reload businesses to show the new submission
    loadBusinesses()
  }

  const categories: { value: BusinessCategory | 'all'; label: { en: string; pt: string }; emoji: string }[] = [
    { value: 'all', label: { en: 'All Categories', pt: 'Todas Categorias' }, emoji: '🏪' },
    { value: 'restaurant', label: { en: 'Food & Dining', pt: 'Comida e Jantar' }, emoji: '🍽️' },
    { value: 'cafe', label: { en: 'Cafés & Bakeries', pt: 'Cafés e Padarias' }, emoji: '☕' },
    { value: 'services', label: { en: 'Professional Services', pt: 'Serviços Profissionais' }, emoji: '💼' },
    { value: 'cultural_center', label: { en: 'Cultural & Arts', pt: 'Cultural e Artes' }, emoji: '🎭' },
    { value: 'healthcare', label: { en: 'Health & Wellness', pt: 'Saúde e Bem-estar' }, emoji: '🏥' },
    { value: 'retail', label: { en: 'Shopping & Retail', pt: 'Compras e Varejo' }, emoji: '🛍️' },
    { value: 'beauty', label: { en: 'Beauty & Style', pt: 'Beleza e Estilo' }, emoji: '💄' },
    { value: 'education', label: { en: 'Education', pt: 'Educação' }, emoji: '🎓' },
    { value: 'travel', label: { en: 'Travel & Tourism', pt: 'Viagens e Turismo' }, emoji: '✈️' }
  ]

  const londonAreas: { value: LondonArea; label: string; emoji: string }[] = [
    { value: 'central_london', label: 'Central London', emoji: '🏛️' },
    { value: 'north_london', label: 'North London', emoji: '🌳' },
    { value: 'south_london', label: 'South London', emoji: '🏘️' },
    { value: 'east_london', label: 'East London', emoji: '🏗️' },
    { value: 'west_london', label: 'West London', emoji: '🌟' },
    { value: 'northeast_london', label: 'Northeast London', emoji: '🌲' },
    { value: 'northwest_london', label: 'Northwest London', emoji: '🏡' },
    { value: 'southeast_london', label: 'Southeast London', emoji: '🌊' },
    { value: 'southwest_london', label: 'Southwest London', emoji: '🌺' }
  ]

  const activeFiltersCount = [
    filters.search,
    ...(filters.category || []),
    ...(filters.londonArea || []),
    ...(filters.priceRange || []),
    filters.verificationStatus !== 'verified' ? filters.verificationStatus : null,
    filters.palop ? 'palop' : null,
    filters.cultural ? 'cultural' : null,
    filters.openNow ? 'openNow' : null
  ].filter(Boolean).length

  const submissionFormModal = showSubmissionForm ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Add Your Business</h2>
          <p className="text-gray-600 mb-6">Business submission form coming soon!</p>
          <button
            onClick={() => setShowSubmissionForm(false)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Header */}
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            
            {/* Loading Search Bar */}
            <div className="bg-white rounded-xl p-6 mt-8">
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
            
            {/* Loading Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('business_directory.title', 'Lusophone Business Directory')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('business_directory.subtitle', 'Discover and support authentic businesses owned by Portuguese speakers across London. From Portugal to Brazil, Angola to Cape Verde - united by language, united by business.')}
            </p>
            
            {/* PALOP Business Excellence Recognition */}
            <div className="mt-6 bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 rounded-xl p-6 border border-orange-200 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <SparklesIcon className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('palop.business.directory.title', 'PALOP Business Excellence Directory')}
                </h2>
              </div>
              <div className="text-3xl mb-4 text-center">🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹</div>
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                {t('palop.success.entrepreneurs', 'PALOP Entrepreneurs Changing London\'s Landscape')} - From Angola's diamond traders to Cape Verde's music schools, Mozambique's spice importers to Guinea-Bissau's cultural centers.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl mb-1 hover:scale-110 transition-transform cursor-pointer">🇦🇴</div>
                  <div className="text-sm font-semibold text-red-800">Angola</div>
                  <div className="text-xs text-red-600">Diamond & Kizomba</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1 hover:scale-110 transition-transform cursor-pointer">🇨🇻</div>
                  <div className="text-sm font-semibold text-blue-800">Cape Verde</div>
                  <div className="text-xs text-blue-600">Music & Food</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1 hover:scale-110 transition-transform cursor-pointer">🇬🇼</div>
                  <div className="text-sm font-semibold text-purple-800">Guinea-Bissau</div>
                  <div className="text-xs text-purple-600">Cultural Heritage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1 hover:scale-110 transition-transform cursor-pointer">🇲🇿</div>
                  <div className="text-sm font-semibold text-green-800">Mozambique</div>
                  <div className="text-xs text-green-600">Spices & Cuisine</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1 hover:scale-110 transition-transform cursor-pointer">🇸🇹</div>
                  <div className="text-sm font-semibold text-orange-800">São Tomé</div>
                  <div className="text-xs text-orange-600">Cocoa Paradise</div>
                </div>
              </div>
            </div>

            {/* Lusophone Unity Flag Strip */}
            <div className="mt-4 flex justify-center items-center gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-xl">
              <span className="text-sm text-gray-700 font-medium mr-2">Heritage:</span>
              <div className="flex gap-1">
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Portugal">🇵🇹</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Brazil">🇧🇷</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Angola">🇦🇴</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Mozambique">🇲🇿</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Cape Verde">🇨🇻</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Guinea-Bissau">🇬🇼</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="São Tomé and Príncipe">🇸🇹</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="East Timor">🇹🇱</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Macau">🇲🇴</span>
              </div>
              <div className="text-gray-400 mx-1">→</div>
              <span className="text-lg" title="United Kingdom - Our Business Home">🇬🇧</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                <span>{total} {isPortuguese ? 'negócios verificados' : 'verified businesses'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FlagIcon className="w-4 h-4 text-primary-500" />
                <span>{isPortuguese ? 'Proprietários lusófonos' : 'Lusophone-owned businesses'}</span>
              </div>
            </div>
            
            {/* View Toggle and Add Business Button */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ListBulletIcon className="w-4 h-4" />
                  {t('business_directory.list_view', 'List View')}
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                  {t('business_directory.map_view', 'Map View')}
                </button>
              </div>
              
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-2 rounded-lg hover:from-secondary-600 hover:to-accent-600 transition-all duration-200"
              >
                <PlusIcon className="w-4 h-4" />
                {t('business_directory.add_business', 'Add My Business')}
              </button>
            </div>
          </div>

          {/* Cross-Directory Navigation */}
          <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-4 mb-6 border border-secondary-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <BuildingStorefrontIcon className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t('directory.community_discovery')}</h3>
                  <p className="text-sm text-gray-600">{t('directory.find_members_businesses')}</p>
                </div>
              </div>
              <a 
                href={ROUTES.directory}
                className="flex items-center gap-2 bg-white text-secondary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-secondary-200"
              >
                <UsersIcon className="w-4 h-4" />
                <span>{t('directory.browse_members')}</span>
              </a>
            </div>
          </div>

          {/* Enhanced Mobile-First Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            {/* Search Bar */}
            <div className="p-4 sm:p-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={isPortuguese ? 'Encontrar negócios portugueses...' : 'Find Portuguese businesses...'}
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base"
                />
              </div>
            </div>
            
            {/* Quick Filter Categories */}
            <div className="px-4 sm:px-6 pb-4">
              <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                {categories.slice(0, isMobile ? 4 : 6).map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      if (category.value === 'all') {
                        handleFilterChange('category', [])
                      } else {
                        const currentCategories = filters.category || []
                        if (currentCategories.includes(category.value as BusinessCategory)) {
                          handleFilterChange('category', currentCategories.filter(c => c !== category.value))
                        } else {
                          handleFilterChange('category', [...currentCategories, category.value])
                        }
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      (category.value === 'all' && filters.category.length === 0) ||
                      filters.category.includes(category.value as BusinessCategory)
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-sm">{category.emoji}</span>
                    <span className="text-sm font-medium">{category.label[language]}</span>
                  </button>
                ))}
                
                {/* Show more categories button on mobile */}
                {isMobile && categories.length > 4 && (
                  <button
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap text-sm"
                  >
                    <span>+{categories.length - 4}</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Control Bar */}
            <div className="border-t border-gray-100 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                {/* Location & Filter Buttons */}
                <div className="flex items-center gap-2">
                  <NearMeButton
                    businesses={businesses}
                    onLocationUpdate={handleLocationUpdate}
                    variant="outline"
                    size="sm"
                    className="min-h-[44px]"
                  />
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-all min-h-[44px] ${
                      showFilters || activeFiltersCount > 0
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <FunnelIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{isPortuguese ? 'Filtros' : 'Filters'}</span>
                    {activeFiltersCount > 0 && (
                      <span className="bg-white text-primary-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* View Mode Toggle & Sort */}
                <div className="flex items-center gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm min-h-[44px]"
                  >
                    <option value="featured">{isPortuguese ? 'Destaque' : 'Featured'}</option>
                    <option value="rating">{isPortuguese ? 'Avaliação' : 'Rating'}</option>
                    <option value="distance">{isPortuguese ? 'Distância' : 'Distance'}</option>
                    <option value="newest">{isPortuguese ? 'Novos' : 'Newest'}</option>
                    <option value="alphabetical">{isPortuguese ? 'A-Z' : 'A-Z'}</option>
                  </select>
                  
                  {viewMode !== 'map' && (
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setCardViewMode('grid')}
                        className={`p-2 rounded transition-colors ${
                          cardViewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      >
                        <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                          <div className="bg-current opacity-60"></div>
                          <div className="bg-current opacity-60"></div>
                          <div className="bg-current opacity-60"></div>
                          <div className="bg-current opacity-60"></div>
                        </div>
                      </button>
                      <button
                        onClick={() => setCardViewMode('list')}
                        className={`p-2 rounded transition-colors ${
                          cardViewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      >
                        <ListBulletIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Mobile-Optimized Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="p-4 sm:p-6 space-y-4">
                  {/* PALOP & Cultural Quick Filters */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleFilterChange('palop', !filters.palop)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        filters.palop 
                          ? 'border-orange-400 bg-orange-50 text-orange-800' 
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🌍</span>
                      <span className="font-medium text-sm">
                        {isPortuguese ? 'PALOP' : 'PALOP'}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handleFilterChange('cultural', !filters.cultural)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        filters.cultural 
                          ? 'border-purple-400 bg-purple-50 text-purple-800' 
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🎭</span>
                      <span className="font-medium text-sm">
                        {isPortuguese ? 'Cultural' : 'Cultural'}
                      </span>
                    </button>
                  </div>
                  
                  {/* Special Filters */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleFilterChange('openNow', !filters.openNow)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        filters.openNow 
                          ? 'border-green-400 bg-green-50 text-green-800' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm font-medium">
                        {isPortuguese ? 'Aberto Agora' : 'Open Now'}
                      </span>
                    </button>
                  </div>
                  
                  {/* Location Areas */}
                  {londonAreas.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        {isPortuguese ? 'Areas de Londres' : 'London Areas'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {londonAreas.map((area) => (
                          <button
                            key={area.value}
                            onClick={() => {
                              const currentAreas = filters.londonArea || []
                              if (currentAreas.includes(area.value)) {
                                handleFilterChange('londonArea', currentAreas.filter(a => a !== area.value))
                              } else {
                                handleFilterChange('londonArea', [...currentAreas, area.value])
                              }
                            }}
                            className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-all ${
                              filters.londonArea?.includes(area.value)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-xs">{area.emoji}</span>
                            <span>{area.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={clearAllFilters}
                        className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                      >
                        {isPortuguese ? 'Limpar Todos os Filtros' : 'Clear All Filters'} ({activeFiltersCount})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
          
          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex items-center justify-between bg-white rounded-xl p-4 border border-primary-200">
              <div className="flex flex-wrap gap-2 flex-1">
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                    🔍 {filters.search}
                    <button
                      onClick={() => removeFilter('search', '')}
                      className="ml-2 hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.palop && (
                  <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                    🌍 PALOP
                    <button
                      onClick={() => handleFilterChange('palop', false)}
                      className="ml-2 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.cultural && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                    🎭 {isPortuguese ? 'Cultural' : 'Cultural'}
                    <button
                      onClick={() => handleFilterChange('cultural', false)}
                      className="ml-2 hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.openNow && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    🟢 {isPortuguese ? 'Aberto Agora' : 'Open Now'}
                    <button
                      onClick={() => handleFilterChange('openNow', false)}
                      className="ml-2 hover:bg-green-200 rounded-full p-0.5 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category?.map(category => {
                  const categoryData = categories.find(c => c.value === category)
                  return categoryData ? (
                    <span key={category} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
                      {categoryData.emoji} {categoryData.label[language]}
                      <button
                        onClick={() => removeFilter('category', category)}
                        className="ml-2 hover:bg-secondary-200 rounded-full p-0.5 transition-colors"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null
                })}
                {filters.londonArea?.map(area => {
                  const areaData = londonAreas.find(a => a.value === area)
                  return areaData ? (
                    <span key={area} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {areaData.emoji} {areaData.label}
                      <button
                        onClick={() => removeFilter('londonArea', area)}
                        className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null
                })}
              </div>
              
              <button
                onClick={clearAllFilters}
                className="ml-4 text-sm text-gray-600 hover:text-gray-800 font-medium whitespace-nowrap"
              >
                {isPortuguese ? 'Limpar' : 'Clear'}
              </button>
            </div>
          )}
          </div>

          {/* Featured Businesses */}
          {featuredBusinesses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Negócios em Destaque' : 'Featured Businesses'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBusinesses.map(business => (
                  <BusinessCard key={business.id} business={business} featured={true} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {viewMode === 'map' ? (
          <div className="mb-8">
            <BusinessMap
              businesses={businesses}
              selectedBusiness={selectedBusiness}
              onBusinessSelect={setSelectedBusiness}
              height="600px"
              className="w-full"
              showClusters={true}
              showRadiusSelector={true}
              showNearMeButton={true}
            />
          </div>
        ) : (
          <>
            {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredBusinesses.length > 0 
                ? `${filteredBusinesses.length} ${isPortuguese ? 'negócios encontrados' : 'businesses found'}` 
                : isPortuguese ? 'Nenhum resultado' : 'No results'}
            </h2>
            
            {coordinates && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {isPortuguese ? 'Perto de você' : 'Near you'}
              </span>
            )}
          </div>
          
          {/* Main Business Display */}
          {filteredBusinesses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <div className="max-w-sm mx-auto">
                <BuildingStorefrontIcon className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {isPortuguese ? 'Nenhum negócio encontrado' : 'No businesses found'}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {isPortuguese 
                    ? 'Tente ajustar seus filtros ou buscar em uma área diferente. Nossos negócios portugueses estão espalhados por todo Londres.'
                    : 'Try adjusting your filters or searching in a different area. Our Portuguese businesses are spread across London.'}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                  >
                    {isPortuguese ? 'Limpar Filtros' : 'Clear All Filters'}
                  </button>
                  <button
                    onClick={() => setShowSubmissionForm(true)}
                    className="w-full px-6 py-3 bg-white text-primary-600 border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors font-medium"
                  >
                    {isPortuguese ? 'Adicionar Meu Negócio' : 'Add My Business'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`grid gap-4 sm:gap-6 ${
              cardViewMode === 'list' 
                ? 'grid-cols-1' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredBusinesses.map(business => (
                <BusinessCard 
                  key={business.id} 
                  business={business}
                  viewMode={cardViewMode}
                  distance={getBusinessDistance(business.id)}
                  onFavorite={handleFavoriteToggle}
                  isFavorited={favoritedBusinesses.has(business.id)}
                  featured={featuredBusinesses.some(fb => fb.id === business.id)}
                />
              ))}
            </div>
          )}
          </>
        )}

        {/* Lusophone Cultural Celebrations Section - Enhanced */}
        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('business_directory.cultural_celebrations_title')}
            </h3>
            <p className="text-gray-600">
              {t('business_directory.cultural_celebrations_subtitle')}
            </p>
            
            {/* Heritage Flags Strip */}
            <div className="mt-4 flex justify-center items-center gap-2 p-3 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 rounded-xl">
              <span className="text-sm text-gray-700 font-medium mr-2">{isPortuguese ? 'Culturas:' : 'Cultures:'}</span>
              <div className="flex gap-1">
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Portugal">🇵🇹</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Brazil">🇧🇷</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Angola">🇦🇴</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Cape Verde">🇨🇻</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Mozambique">🇲🇿</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="Guinea-Bissau">🇬🇼</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="São Tomé and Príncipe">🇸🇹</span>
                <span className="text-lg hover:scale-110 transition-transform cursor-pointer" title="East Timor">🇹🇱</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {getFeaturedCelebrations(8).map((celebration, index) => {
              // Handle special flag emojis for multi-flag celebrations
              const displayFlags = celebration.flagEmoji?.includes('🇵🇹') ? 
                celebration.flagEmoji : celebration.icon
              
              return (
                <div
                  key={celebration.id}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-secondary-50/30 hover:from-secondary-50 hover:to-primary-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:shadow-md group"
                  title={celebration.description[language]}
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {celebration.icon}
                  </div>
                  
                  {/* Show countries represented */}
                  {celebration.countries.length > 1 && (
                    <div className="text-xs mb-1 flex justify-center gap-1">
                      {celebration.countries.slice(0, 3).map((country, idx) => {
                        const countryFlags = {
                          'Portugal': '🇵🇹',
                          'Brazil': '🇧🇷', 
                          'Angola': '🇦🇴',
                          'Cape Verde': '🇨🇻',
                          'Mozambique': '🇲🇿'
                        }
                        return (
                          <span key={idx} className="text-xs opacity-70">
                            {countryFlags[country as keyof typeof countryFlags]}
                          </span>
                        )
                      })}
                    </div>
                  )}
                  
                  <div className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                    {celebration.name[language]}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {celebration.period[language]}
                  </div>
                  <div className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                    {celebration.businessCount} {isPortuguese ? 'negócios' : 'businesses'}
                  </div>
                  {celebration.countries.length > 1 && (
                    <div className="text-xs text-secondary-600 mt-1 opacity-75">
                      {celebration.countries.length} {isPortuguese ? 'culturas' : 'cultures'}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Enhanced Cultural Wisdom with Rotation */}
          <CulturalWisdomDisplay />
        </div>

        {/* Load More Button for Large Results */}
        {filteredBusinesses.length >= 20 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              {isPortuguese ? 'Carregar Mais Negócios' : 'Load More Businesses'}
            </button>
          </div>
        )}
        
        {/* Enhanced Community Member Networking Call-to-Action */}
        <div className="mt-12 bg-gradient-to-r from-accent-500 to-premium-500 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden">
          {/* Lusophone Cultural Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-4xl">👥</div>
            <div className="absolute top-4 right-4 text-4xl">🤝</div>
            <div className="absolute bottom-4 left-1/4 text-3xl">🎓</div>
            <div className="absolute bottom-4 right-1/4 text-3xl">💼</div>
            <div className="absolute top-1/2 left-8 text-2xl transform -translate-y-1/2">🌍</div>
            <div className="absolute top-1/2 right-8 text-2xl transform -translate-y-1/2">🇬🇧</div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              {t('business_directory.connect_community_title')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t('business_directory.connect_community_subtitle')}
            </p>
            <div className="mb-6 text-lg italic opacity-90">
              "{t('business_directory.business_thrives_quote')}"
            </div>
            
            {/* Heritage Connection Indicator */}
            <div className="mb-6 flex justify-center items-center gap-2 text-sm opacity-80">
              <span className="bg-white/20 px-3 py-1 rounded-full">🇵🇹 Portugal</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🇧🇷 Brasil</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🇦🇴 Angola</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🇨🇻 Cabo Verde</span>
              <span className="text-white/60">+ more</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={ROUTES.directory}
                className="bg-white text-accent-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
              >
                <UsersIcon className="w-5 h-5" />
                {t('business_directory.explore_members')}
              </a>
              <div className="text-sm opacity-75">
                750+ {t('business_directory.verified_members')}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action for Business Owners */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 sm:p-8 text-center text-white relative overflow-hidden">
          {/* Complete Lusophone Cultural Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-4xl">🇵🇹</div>
            <div className="absolute top-4 right-4 text-4xl">🇧🇷</div>
            <div className="absolute bottom-4 left-8 text-3xl">🇦🇴</div>
            <div className="absolute bottom-4 right-8 text-3xl">🇨🇻</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🇲🇿</div>
            <div className="absolute top-1/4 right-1/4 text-xl">🇬🇼</div>
            <div className="absolute bottom-1/4 left-1/4 text-xl">🇸🇹</div>
            <div className="absolute top-3/4 left-3/4 text-xl">🇹🇱</div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              {t('business_directory.own_business_cta_title')}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {t('business_directory.own_business_cta_subtitle')}
            </p>
            
            {/* Cultural Diversity Showcase */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm opacity-80">
              <div className="bg-white/10 px-3 py-2 rounded-lg">
                🇵🇹 {isPortuguese ? 'Portugal' : 'Portugal'}
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-lg">
                🇧🇷 {isPortuguese ? 'Brasil' : 'Brazil'}
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-lg">
                🇦🇴 {isPortuguese ? 'Angola' : 'Angola'}
              </div>
              <div className="bg-white/10 px-3 py-2 rounded-lg">
                🇨🇻 {isPortuguese ? 'Cabo Verde' : 'Cape Verde'}
              </div>
            </div>
            
            <div className="mb-6 text-lg italic opacity-90">
              "{t('business_directory.one_language_many_cultures')}" - {t('business_directory.lusophone_proverb')}
            </div>
            
            {/* Enhanced CTA with Business Categories */}
            <div className="mb-6 text-sm opacity-75">
              {isPortuguese ? 'Restaurantes • Serviços • Arte • Tecnologia • Saúde • E muito mais...' : 'Restaurants • Services • Arts • Technology • Healthcare • And much more...'}
            </div>
            
            <button 
              onClick={() => setShowSubmissionForm(true)}
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 mx-auto"
            >
              <PlusIcon className="w-5 h-5" />
              {t('business_directory.add_business', 'Add My Business')}
            </button>
            
            <div className="mt-4 text-xs opacity-70">
              {isPortuguese ? 'Gratuito para listar • Verificação rápida • Suporte em português' : 'Free to list • Quick verification • Lusophone support'}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {submissionFormModal}
    </div>
  )
}