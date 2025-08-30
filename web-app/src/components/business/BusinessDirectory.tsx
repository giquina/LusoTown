'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import BusinessCard from './BusinessCard'
import BusinessFilter from './BusinessFilter'
import BusinessMap from './BusinessMap'
import { PORTUGUESE_BUSINESS_CATEGORIES } from '@/config/business-categories'
import { UK_PORTUGUESE_COMMUNITIES } from '@/config/cultural-preferences'

interface Business {
  id: string
  name: string
  business_type: string
  description?: string
  short_description?: string
  address: string
  postcode: string
  city: string
  borough?: string
  coordinates?: [number, number]
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

interface BusinessDirectoryProps {
  initialBusinesses?: Business[]
  userLocation?: {
    latitude: number
    longitude: number
  }
  showMap?: boolean
  enableFilters?: boolean
  enableSearch?: boolean
  compact?: boolean
}

export default function BusinessDirectory({
  initialBusinesses = [],
  userLocation,
  showMap = true,
  enableFilters = true,
  enableSearch = true,
  compact = false
}: BusinessDirectoryProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses)
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(initialBusinesses)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    city: '',
    culturalFocus: '',
    rating: 0,
    priceRange: '',
    features: [] as string[]
  })

  // Memoized filter options
  const filterOptions = useMemo(() => ({
    categories: PORTUGUESE_BUSINESS_CATEGORIES.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.emoji
    })),
    cities: UK_PORTUGUESE_COMMUNITIES.map(community => ({
      id: community.city.toLowerCase(),
      name: community.city,
      count: community.population
    })),
    culturalFocus: [
      { id: 'portugal', name: { en: 'Portugal', pt: 'Portugal' }, flag: '🇵🇹' },
      { id: 'brazil', name: { en: 'Brazil', pt: 'Brasil' }, flag: '🇧🇷' },
      { id: 'africa', name: { en: 'African Countries', pt: 'Países Africanos' }, flag: '🌍' },
      { id: 'mixed', name: { en: 'Mixed Lusophone', pt: 'Lusófono Misto' }, flag: '🌐' }
    ]
  }), [])

  // Load businesses from API
  useEffect(() => {
    const loadBusinesses = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (userLocation) {
          params.append('lat', userLocation.latitude.toString())
          params.append('lng', userLocation.longitude.toString())
        }
        if (selectedFilters.category) {
          params.append('type', selectedFilters.category)
        }
        if (selectedFilters.rating > 0) {
          params.append('min_rating', selectedFilters.rating.toString())
        }

        const response = await fetch(`/api/business/directory?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          setBusinesses(data.businesses || [])
        }
      } catch (error) {
        console.error('Failed to load businesses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBusinesses()
  }, [userLocation, selectedFilters.category, selectedFilters.rating])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...businesses]

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(searchLower) ||
        business.description?.toLowerCase().includes(searchLower) ||
        business.address.toLowerCase().includes(searchLower) ||
        business.portuguese_specialties.some(specialty => 
          specialty.toLowerCase().includes(searchLower)
        )
      )
    }

    // Category filter
    if (selectedFilters.category) {
      filtered = filtered.filter(business => 
        business.business_type === selectedFilters.category
      )
    }

    // City filter
    if (selectedFilters.city) {
      filtered = filtered.filter(business => 
        business.city.toLowerCase() === selectedFilters.city
      )
    }

    // Cultural focus filter
    if (selectedFilters.culturalFocus) {
      filtered = filtered.filter(business => 
        business.cultural_focus === selectedFilters.culturalFocus
      )
    }

    // Price range filter
    if (selectedFilters.priceRange) {
      filtered = filtered.filter(business => 
        business.price_range === selectedFilters.priceRange
      )
    }

    // Rating filter
    if (selectedFilters.rating > 0) {
      filtered = filtered.filter(business => 
        business.average_rating >= selectedFilters.rating
      )
    }

    // Features filter
    if (selectedFilters.features.length > 0) {
      filtered = filtered.filter(business => {
        return selectedFilters.features.every(feature => {
          switch (feature) {
            case 'delivery':
              return business.delivery_available
            case 'takeaway':
              return business.takeaway_available
            case 'verified':
              return business.is_verified
            case 'premium':
              return business.is_premium
            default:
              return true
          }
        })
      })
    }

    setFilteredBusinesses(filtered)
  }, [businesses, searchTerm, selectedFilters])

  const handleFilterChange = (filterType: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      city: '',
      culturalFocus: '',
      rating: 0,
      priceRange: '',
      features: []
    })
    setSearchTerm('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('business.directory_title', 'Portuguese Business Directory')}
          </h1>
          <p className="text-gray-600">
            {t('business.directory_subtitle', 'Discover authentic Portuguese-speaking businesses across the UK')}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex mt-4 lg:mt-0 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 {t('common.list', 'List')}
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚏ {t('common.grid', 'Grid')}
          </button>
          {showMap && (
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🗺️ {t('common.map', 'Map')}
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {enableSearch && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder={t('business.search_placeholder', 'Search businesses, specialties, or locations...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {enableFilters && (
          <div className="lg:w-80 space-y-6">
            <BusinessFilter
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              {loading ? (
                t('common.loading', 'Loading...')
              ) : (
                t('business.results_count', `${filteredBusinesses.length} businesses found`)
              )}
            </p>
            
            {(searchTerm || Object.values(selectedFilters).some(value => 
              Array.isArray(value) ? value.length > 0 : value
            )) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {t('common.clear_all', 'Clear all filters')}
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Map View */}
          {viewMode === 'map' && !loading && (
            <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
              <BusinessMap
                businesses={filteredBusinesses}
                userLocation={userLocation}
                onBusinessSelect={(business) => {
                  // Handle business selection from map
                  console.log('Selected business:', business)
                }}
              />
            </div>
          )}

          {/* List/Grid View */}
          {viewMode !== 'map' && !loading && (
            <>
              {filteredBusinesses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏪</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('business.no_results_title', 'No businesses found')}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {t('business.no_results_subtitle', 'Try adjusting your filters or search terms to find more Portuguese businesses.')}
                  </p>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? `grid grid-cols-1 ${compact ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`
                    : 'space-y-6'
                }>
                  {filteredBusinesses.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      showDistance={!!userLocation}
                      compact={compact || viewMode === 'grid'}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}