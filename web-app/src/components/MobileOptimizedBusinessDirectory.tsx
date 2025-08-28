'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import BusinessCard from '@/components/BusinessCard'
import { businessDirectoryCarousels } from '@/config/business-directory-carousels'
import { useMobileScrollAnimation, useCardGridAnimation, usePortugueseScrollAnimation } from '@/hooks/useMobileScrollAnimation'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

interface MobileOptimizedBusinessDirectoryProps {
  featured?: boolean
  maxItems?: number
  showSearch?: boolean
  className?: string
}

export default function MobileOptimizedBusinessDirectory({
  featured = false,
  maxItems = 12,
  showSearch = true,
  className = ''
}: MobileOptimizedBusinessDirectoryProps) {
  const { t } = useLanguage()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const headerRef = usePortugueseScrollAnimation(100)
  const searchRef = usePortugueseScrollAnimation(200)
  const businessesRef = usePortugueseScrollAnimation(300)

  // Get businesses from config
  const allBusinesses = businessDirectoryCarousels.flatMap(carousel => carousel.items)
  
  // Filter businesses based on search and filters
  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = searchTerm === '' || 
      business.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.title.pt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.pt.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = selectedLocation === 'all' || business.location.city === selectedLocation
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory
    const matchesFeatured = !featured || business.isFeatured

    return matchesSearch && matchesLocation && matchesCategory && matchesFeatured
  }).slice(0, maxItems)

  // Get unique locations and categories for filters
  const uniqueLocations = Array.from(new Set(allBusinesses.map(b => b.location.city)))
  const uniqueCategories = Array.from(new Set(allBusinesses.map(b => b.category)))

  return (
    <div className={`mobile-safe ${className}`}>
      {/* Header Section */}
      <div 
        ref={headerRef}
        className="text-center header-spacing-large lusophone-reveal"
      >
        <h2 className="heading-portuguese-large text-gray-900 header-spacing">
          <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
            {t('business.directory.title', 'Portuguese Business Directory')}
          </span>
        </h2>
        <p className="text-portuguese-mobile text-gray-600 max-w-3xl mx-auto">
          {t('business.directory.subtitle', 'Discover authentic Portuguese businesses, restaurants, and services across the United Kingdom')}
        </p>
        
        {/* PALOP Nations Representation */}
        <div className="flex justify-center items-center touch-spacing header-spacing">
          <div className="flex items-center touch-spacing text-sm text-gray-600">
            <span className="flag-emoji">🇵🇹</span>
            <span className="flag-emoji">🇧🇷</span>
            <span className="flag-emoji">🇦🇴</span>
            <span className="flag-emoji">🇨🇻</span>
            <span className="flag-emoji">🇲🇿</span>
            <span className="flag-emoji">🇬🇼</span>
            <span className="flag-emoji">🇸🇹</span>
            <span className="flag-emoji">🇹🇱</span>
            <span className="px-2 text-xs font-medium">
              {t('business.directory.palop', 'All Portuguese-speaking nations represented')}
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      {showSearch && (
        <div 
          ref={searchRef}
          className="section-spacing scroll-fade-in"
        >
          {/* Search Bar */}
          <div className="relative card-padding bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('business.search.placeholder', 'Search businesses, restaurants, services...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full portuguese-button-touch pl-12 pr-4 py-4 text-portuguese-mobile border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            {/* Filter Toggle and View Mode */}
            <div className="flex justify-between items-center touch-spacing-large">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="portuguese-button-touch flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span className="button-text-portuguese">
                  {t('business.filters.toggle', 'Filters')}
                </span>
                {(selectedLocation !== 'all' || selectedCategory !== 'all') && (
                  <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    {t('business.filters.active', 'Active')}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center touch-spacing bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`portuguese-touch-area p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`portuguese-touch-area p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 touch-spacing-large animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 touch-grid-large">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPinIcon className="w-4 h-4 inline mr-1" />
                      {t('business.filters.location', 'Location')}
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full portuguese-button-touch border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-portuguese-mobile"
                    >
                      <option value="all">{t('business.filters.all_locations', 'All Locations')}</option>
                      {uniqueLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <AdjustmentsHorizontalIcon className="w-4 h-4 inline mr-1" />
                      {t('business.filters.category', 'Category')}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full portuguese-button-touch border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-portuguese-mobile"
                    >
                      <option value="all">{t('business.filters.all_categories', 'All Categories')}</option>
                      {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedLocation !== 'all' || selectedCategory !== 'all') && (
                  <div className="touch-spacing">
                    <button
                      onClick={() => {
                        setSelectedLocation('all')
                        setSelectedCategory('all')
                      }}
                      className="portuguese-button-touch text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      {t('business.filters.clear', 'Clear all filters')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center touch-spacing text-portuguese-mobile text-gray-600">
        {t('business.results.count', `Showing ${filteredBusinesses.length} Portuguese businesses`)}
      </div>

      {/* Business Cards Grid/List */}
      <div 
        ref={businessesRef}
        className="section-spacing lusophone-reveal"
      >
        {filteredBusinesses.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card-grid-spacing-large'
              : 'touch-spacing-large'
          }>
            {filteredBusinesses.map((business, index) => (
              <div 
                key={business.id} 
                className="scroll-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BusinessCard
                  business={business}
                  compact={viewMode === 'list'}
                  featured={business.isFeatured}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center card-padding bg-gray-50 rounded-xl">
            <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="heading-portuguese-mobile text-gray-900 mb-2">
              {t('business.no_results.title', 'No businesses found')}
            </h3>
            <p className="text-portuguese-mobile text-gray-600">
              {t('business.no_results.subtitle', 'Try adjusting your search or filters')}
            </p>
          </div>
        )}
      </div>

      {/* Load More Button (if there are more results) */}
      {filteredBusinesses.length === maxItems && allBusinesses.length > maxItems && (
        <div className="text-center section-spacing">
          <button className="portuguese-button-touch bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white button-text-portuguese-large px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            {t('business.load_more', 'Load More Businesses')}
          </button>
        </div>
      )}
    </div>
  )
}