'use client'
import Image from 'next/image'

import React, { useState, useEffect } from 'react'

// ✅ PUBLIC ACCESS: This page is accessible to all users without authentication
import { useLanguage } from '@/context/LanguageContext'
import { portugueseBusinessService, PortugueseBusiness, BusinessFilters, BusinessCategory, LondonArea, PortugueseRegion } from '@/lib/businessDirectory'
import { geolocationService, BusinessDistance } from '@/lib/geolocation'
import BusinessMap from '@/components/BusinessMap'
import NearMeButton, { DistanceIndicator } from '@/components/NearMeButton'
import BusinessSubmissionForm from '@/components/BusinessSubmissionForm'
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
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Footer from '@/components/Footer'

interface BusinessCardProps {
  business: PortugueseBusiness
  featured?: boolean
  distance?: number
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, featured = false, distance }) => {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [isFavorited, setIsFavorited] = useState(false)

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
      portuguese_diaspora: { pt: 'Diáspora Portuguesa', en: 'Portuguese Diaspora' }
    }
    return regionNames[region]?.[language] || region.replace('_', ' ')
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border ${featured ? 'border-accent-300 ring-2 ring-accent-200' : 'border-gray-100'} overflow-hidden hover:shadow-xl transition-all duration-300 group`}>
      {featured && (
        <div className="bg-gradient-to-r from-accent-400 to-premium-400 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <SparklesIcon className="w-4 h-4" />
          {isPortuguese ? 'Negócio em Destaque' : 'Featured Business'}
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {business.photos.length > 0 ? (
          <Image 
            src={business.photos[0]} 
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
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
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <HeartIcon className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
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
                {lang === 'portuguese' ? (isPortuguese ? 'Português' : 'Portuguese') : 
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
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
            {isPortuguese ? 'Ver Detalhes' : 'View Details'}
          </button>
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <PhoneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BusinessDirectory() {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  const [businesses, setBusinesses] = useState<PortugueseBusiness[]>([])
  const [featuredBusinesses, setFeaturedBusinesses] = useState<PortugueseBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [businessDistances, setBusinessDistances] = useState<BusinessDistance[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<PortugueseBusiness | null>(null)
  
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    category: [],
    londonArea: [],
    verificationStatus: 'verified',
    sortBy: 'featured'
  })

  useEffect(() => {
    loadBusinesses()
  }, [filters])

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

  const handleFilterChange = (key: keyof BusinessFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const removeFilter = (key: keyof BusinessFilters, value: any) => {
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
      londonArea: [],
      verificationStatus: 'verified',
      sortBy: 'featured'
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

  const handleBusinessSubmissionSuccess = (businessId: string) => {
    setShowSubmissionForm(false)
    // Optionally reload businesses to show the new submission
    loadBusinesses()
  }

  const categories: { value: BusinessCategory; label: { en: string; pt: string } }[] = [
    { value: 'restaurant', label: { en: 'Restaurants', pt: 'Restaurantes' } },
    { value: 'cafe', label: { en: 'Cafés', pt: 'Cafés' } },
    { value: 'bakery', label: { en: 'Bakeries', pt: 'Pastelarias' } },
    { value: 'grocery', label: { en: 'Groceries', pt: 'Mercearias' } },
    { value: 'travel', label: { en: 'Travel', pt: 'Viagens' } },
    { value: 'cultural_center', label: { en: 'Cultural Centers', pt: 'Centros Culturais' } },
    { value: 'services', label: { en: 'Services', pt: 'Serviços' } },
    { value: 'healthcare', label: { en: 'Healthcare', pt: 'Saúde' } },
    { value: 'legal', label: { en: 'Legal', pt: 'Jurídico' } },
    { value: 'education', label: { en: 'Education', pt: 'Educação' } }
  ]

  const londonAreas: { value: LondonArea; label: string }[] = [
    { value: 'central_london', label: 'Central London' },
    { value: 'north_london', label: 'North London' },
    { value: 'south_london', label: 'South London' },
    { value: 'east_london', label: 'East London' },
    { value: 'west_london', label: 'West London' },
    { value: 'northeast_london', label: 'Northeast London' },
    { value: 'northwest_london', label: 'Northwest London' },
    { value: 'southeast_london', label: 'Southeast London' },
    { value: 'southwest_london', label: 'Southwest London' }
  ]

  const activeFiltersCount = [
    filters.search,
    ...(filters.category || []),
    ...(filters.londonArea || []),
    filters.verificationStatus !== 'verified' ? filters.verificationStatus : null
  ].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
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
              {t('business_directory.title', 'Portuguese Business Directory')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('business_directory.subtitle', 'Discover and support authentic Portuguese-owned businesses across London. United by language, united by business.')}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                <span>{total} {isPortuguese ? 'negócios verificados' : 'verified businesses'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FlagIcon className="w-4 h-4 text-primary-500" />
                <span>{isPortuguese ? 'Proprietários lusófonos' : 'Portuguese-speaking owners'}</span>
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

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={isPortuguese ? 'Buscar negócios...' : 'Search businesses...'}
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
                <NearMeButton
                  businesses={businesses}
                  onLocationUpdate={handleLocationUpdate}
                  variant="outline"
                  size="md"
                  className="whitespace-nowrap"
                />
                
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="featured">{isPortuguese ? 'Em Destaque' : 'Featured'}</option>
                  <option value="rating">{isPortuguese ? 'Melhor Avaliação' : 'Highest Rated'}</option>
                  <option value="newest">{isPortuguese ? 'Mais Recentes' : 'Newest'}</option>
                  <option value="alphabetical">{isPortuguese ? 'A-Z' : 'A-Z'}</option>
                  <option value="distance">{isPortuguese ? 'Mais Próximo' : 'Nearest'}</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FunnelIcon className="w-4 h-4" />
                  <span>{isPortuguese ? 'Filtros' : 'Filters'}</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-primary-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Categoria' : 'Category'}
                    </label>
                    <select
                      onChange={(e) => {
                        const category = e.target.value as BusinessCategory
                        if (category && !filters.category?.includes(category)) {
                          handleFilterChange('category', [...(filters.category || []), category])
                        }
                        e.target.value = ''
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{isPortuguese ? 'Adicionar categoria...' : 'Add category...'}</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label[language]}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Área de Londres' : 'London Area'}
                    </label>
                    <select
                      onChange={(e) => {
                        const area = e.target.value as LondonArea
                        if (area && !filters.londonArea?.includes(area)) {
                          handleFilterChange('londonArea', [...(filters.londonArea || []), area])
                        }
                        e.target.value = ''
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{isPortuguese ? 'Adicionar área...' : 'Add area...'}</option>
                      {londonAreas.map(area => (
                        <option key={area.value} value={area.value}>{area.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Verification Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Status' : 'Status'}
                    </label>
                    <select
                      value={filters.verificationStatus}
                      onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="verified">{isPortuguese ? 'Apenas Verificados' : 'Verified Only'}</option>
                      <option value="all">{isPortuguese ? 'Todos' : 'All'}</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearAllFilters}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {isPortuguese ? 'Limpar Tudo' : 'Clear All'}
                    </button>
                  </div>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filters.search && (
                      <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                        {isPortuguese ? 'Busca: ' : 'Search: '}"{filters.search}"
                        <button
                          onClick={() => removeFilter('search', '')}
                          className="ml-2 hover:bg-primary-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.category?.map(category => (
                      <span key={category} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">
                        {categories.find(c => c.value === category)?.label[language]}
                        <button
                          onClick={() => removeFilter('category', category)}
                          className="ml-2 hover:bg-secondary-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {filters.londonArea?.map(area => (
                      <span key={area} className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full">
                        {londonAreas.find(a => a.value === area)?.label}
                        <button
                          onClick={() => removeFilter('londonArea', area)}
                          className="ml-2 hover:bg-accent-200 rounded-full p-0.5"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
            {/* Main Business Grid */}
            {businesses.length === 0 ? (
          <div className="text-center py-12">
            <BuildingStorefrontIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isPortuguese ? 'Nenhum negócio encontrado' : 'No businesses found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isPortuguese 
                ? 'Tente ajustar seus filtros para encontrar mais negócios.'
                : 'Try adjusting your search filters to find more businesses.'}
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-primary"
            >
              {isPortuguese ? 'Limpar Filtros' : 'Clear Filters'}
            </button>
          </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {businesses.map(business => (
                  <BusinessCard 
                    key={business.id} 
                    business={business} 
                    distance={getBusinessDistance(business.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Portuguese Cultural Celebrations Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isPortuguese ? 'Celebrações Culturais Portuguesas' : 'Portuguese Cultural Celebrations'}
            </h3>
            <p className="text-gray-600">
              {isPortuguese 
                ? 'Encontre negócios que participam nas nossas tradições culturais'
                : 'Find businesses that participate in our cultural traditions'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { 
                name: isPortuguese ? 'Santos Populares' : 'Popular Saints', 
                icon: '🎉', 
                date: isPortuguese ? 'Junho' : 'June',
                businesses: 15 
              },
              { 
                name: isPortuguese ? 'Festa do Fado' : 'Fado Festival', 
                icon: '🎵', 
                date: isPortuguese ? 'Todo o ano' : 'Year-round',
                businesses: 8 
              },
              { 
                name: isPortuguese ? 'Festa Junina' : 'June Festival', 
                icon: '🌽', 
                date: isPortuguese ? 'Junho-Julho' : 'June-July',
                businesses: 12 
              },
              { 
                name: isPortuguese ? 'Dia de Portugal' : 'Portugal Day', 
                icon: '🇵🇹', 
                date: isPortuguese ? '10 de Junho' : 'June 10th',
                businesses: 25 
              },
              { 
                name: isPortuguese ? 'Carnaval' : 'Carnival', 
                icon: '🎭', 
                date: isPortuguese ? 'Fevereiro' : 'February',
                businesses: 18 
              },
              { 
                name: isPortuguese ? 'Vindimas' : 'Harvest', 
                icon: '🍇', 
                date: isPortuguese ? 'Setembro' : 'September',
                businesses: 10 
              }
            ].map((celebration, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-secondary-50/30 hover:from-secondary-50 hover:to-primary-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:shadow-md"
              >
                <div className="text-3xl mb-2">{celebration.icon}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
                  {celebration.name}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {celebration.date}
                </div>
                <div className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                  {celebration.businesses} {isPortuguese ? 'negócios' : 'businesses'}
                </div>
              </div>
            ))}
          </div>

          {/* Portuguese Cultural Quote */}
          <div className="mt-8 text-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
            <p className="text-sm italic text-gray-700 mb-2">
              {isPortuguese 
                ? "\"O comércio une os povos e as culturas\" - Provérbio Lusófono"
                : "\"Commerce unites peoples and cultures\" - Portuguese Proverb"}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>🌍</span>
              <span>{isPortuguese ? 'Comunidade Lusófona Mundial' : 'Global Portuguese Community'}</span>
            </div>
          </div>
        </div>

        {/* Call to Action for Business Owners */}
        <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          {/* Portuguese Cultural Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-4xl">🇵🇹</div>
            <div className="absolute top-4 right-4 text-4xl">🇧🇷</div>
            <div className="absolute bottom-4 left-1/4 text-3xl">🍷</div>
            <div className="absolute bottom-4 right-1/4 text-3xl">🎵</div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              {isPortuguese ? 'Tem um negócio português?' : 'Own a Portuguese business?'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {isPortuguese 
                ? 'Junte-se ao maior diretório de negócios portugueses no Reino Unido. Conecte-se com a comunidade lusófona e preserve a nossa cultura através do comércio.'
                : 'Join the UK\'s premier Portuguese business directory. Connect with the Portuguese-speaking community and preserve our culture through commerce.'}
            </p>
            <div className="mb-6 text-lg italic opacity-90">
              {isPortuguese 
                ? '"Onde há portugueses, há esperança" - Ditado Popular'
                : '"Where there are Portuguese people, there is hope" - Popular Saying'}
            </div>
            <button 
              onClick={() => setShowSubmissionForm(true)}
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('business_directory.add_business', 'Add My Business')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Business Submission Form Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <BusinessSubmissionForm
              onSubmissionSuccess={handleBusinessSubmissionSuccess}
              onClose={() => setShowSubmissionForm(false)}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}