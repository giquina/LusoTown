"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSafeSearchQuery } from '@/hooks/useSafeHTML';
import { BusinessCard } from '@/components';
import { BusinessMap } from '@/components';
import {
  PORTUGUESE_BUSINESS_CATEGORIES,
  getPopularBusinessCategories,
  searchBusinessCategories,
  type BusinessCategory
} from '@/config/business-categories';
import {
  FEATURED_PORTUGUESE_BUSINESSES,
  PALOP_BUSINESS_SHOWCASE,
  searchBusinesses,
  getBusinessesByCity,
  getFeaturedBusinessesByCategory,
  type BusinessCarouselItem
} from '@/config/business-directory-carousels';
import {
  PortugueseBusiness,
  portugueseBusinessService,
  type BusinessFilters
} from '@/lib/businessDirectory';
import { UK_CITIES_PORTUGUESE_EXPANSION, getUKCityBusinessData } from '@/config/uk-cities-expansion';
import {
  geolocationService,
  type Location,
  type BusinessDistance
} from '@/lib/geolocation';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  FunnelIcon,
  ViewColumnsIcon,
  MapIcon,
  StarIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface BusinessDirectoryProps {
  className?: string;
  children?: React.ReactNode;
  initialCategory?: string;
  initialLocation?: string;
  showMap?: boolean;
}

type ViewMode = 'grid' | 'list' | 'map';

type SortOption = 'relevance' | 'distance' | 'rating' | 'name' | 'newest';

export default function BusinessDirectory({ 
  className,
  children,
  initialCategory,
  initialLocation,
  showMap = true
}: BusinessDirectoryProps) {
  const { t, language } = useLanguage();
  
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || '');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [businesses, setBusinesses] = useState<BusinessCarouselItem[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessCarouselItem[]>([]);
  const [featuredBusinesses, setFeaturedBusinesses] = useState<BusinessCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [radiusKm, setRadiusKm] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessCarouselItem | null>(null);
  
  // Location and distance state
  const [nearbyBusinesses, setNearbyBusinesses] = useState<BusinessDistance[]>([]);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  
  // Popular categories for quick access
  const popularCategories = getPopularBusinessCategories();
  
  // UK cities with Portuguese-speaking communities from config
  const ukCities = getUKCityBusinessData();
  
  // Load businesses on component mount
  useEffect(() => {
    loadBusinesses();
    checkLocationPermission();
  }, []);
  
  // Filter businesses when search params change
  useEffect(() => {
    filterBusinesses();
  }, [searchQuery, selectedCategory, selectedLocation, sortBy, businesses, nearbyBusinesses]);
  
  const loadBusinesses = useCallback(async () => {
    setLoading(true);
    try {
      // Combine featured businesses and PALOP showcase
      const allBusinesses = [...FEATURED_PORTUGUESE_BUSINESSES, ...PALOP_BUSINESS_SHOWCASE];
      setBusinesses(allBusinesses);
      
      // Get featured businesses for carousel
      const featured = allBusinesses.filter(b => b.isFeatured).slice(0, 6);
      setFeaturedBusinesses(featured);
    } catch (error) {
      console.error('Failed to load businesses:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const checkLocationPermission = useCallback(async () => {
    const support = await geolocationService.checkGeolocationSupport();
    setLocationPermission(support.permission);
  }, []);
  
  const requestLocation = useCallback(async () => {
    try {
      const result = await geolocationService.getCurrentLocation();
      setUserLocation(result.location);
      setLocationPermission('granted');
      
      // Calculate distances to businesses
      const distances = geolocationService.getBusinessesWithinRadius(
        businesses, 
        result.location, 
        radiusKm
      );
      setNearbyBusinesses(distances);
    } catch (error) {
      console.error('Location request failed:', error);
      setLocationPermission('denied');
    }
  }, [businesses, radiusKm]);
  
  // Sanitize search query
  const safeSearchQuery = useSafeSearchQuery(searchQuery);

  const filterBusinesses = useCallback(() => {
    let filtered = [...businesses];
    
    // Apply search filter with sanitization
    if (safeSearchQuery.trim()) {
      filtered = searchBusinesses(safeSearchQuery);
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }
    
    // Apply location filter
    if (selectedLocation) {
      filtered = getBusinessesByCity(selectedLocation);
    }
    
    // Apply distance filter if user location is available
    if (userLocation && nearbyBusinesses.length > 0) {
      const nearbyIds = nearbyBusinesses.map(nb => nb.businessId);
      filtered = filtered.filter(business => nearbyIds.includes(business.id));
    }
    
    // Apply sorting
    filtered = sortBusinesses(filtered);
    
    setFilteredBusinesses(filtered);
  }, [safeSearchQuery, selectedCategory, selectedLocation, businesses, userLocation, nearbyBusinesses, sortBy]);
  
  const sortBusinesses = useCallback((businessesToSort: BusinessCarouselItem[]) => {
    const sorted = [...businessesToSort];
    
    switch (sortBy) {
      case 'distance':
        if (nearbyBusinesses.length > 0) {
          sorted.sort((a, b) => {
            const aDistance = nearbyBusinesses.find(nb => nb.businessId === a.id)?.distance || Infinity;
            const bDistance = nearbyBusinesses.find(nb => nb.businessId === b.id)?.distance || Infinity;
            return aDistance - bDistance;
          });
        }
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        sorted.sort((a, b) => a.title[language].localeCompare(b.title[language]));
        break;
      case 'newest':
        sorted.sort((a, b) => b.establishedYear - a.establishedYear);
        break;
      case 'relevance':
      default:
        // Sort by featured status, then premium, then rating
        sorted.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isPremium && !b.isPremium) return -1;
          if (!a.isPremium && b.isPremium) return 1;
          return b.rating - a.rating;
        });
        break;
    }
    
    return sorted;
  }, [sortBy, nearbyBusinesses, language]);
  
  const handleBusinessSelect = useCallback((business: BusinessCarouselItem | null) => {
    setSelectedBusiness(business);
  }, []);
  
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSortBy('relevance');
    setShowFilters(false);
  }, []);
  
  const getDistance = useCallback((businessId: string): string | null => {
    const distance = nearbyBusinesses.find(nb => nb.businessId === businessId);
    return distance ? distance.distanceText : null;
  }, [nearbyBusinesses]);

  return (
    <div className={`business-directory bg-gray-50 ${className || ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('business.directory.title', 'Portuguese Business Directory')}
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                {t('business.directory.subtitle', 'Discover Portuguese-speaking businesses across the United Kingdom')}
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === 'grid'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ViewColumnsIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FunnelIcon className="w-4 h-4" />
                </button>
                {showMap && (
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 text-sm font-medium ${
                      viewMode === 'map'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {locationPermission !== 'granted' && (
                <button
                  onClick={requestLocation}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <MapPinIcon className="w-4 h-4" />
                  {t('business.directory.near_me', 'Near Me')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('business.directory.search_placeholder', 'Search businesses, services, or locations...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap"
              >
                <FunnelIcon className="w-4 h-4" />
                {t('business.directory.filters', 'Filters')}
              </button>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="relevance">{t('business.directory.sort.relevance', 'Relevance')}</option>
                <option value="distance">{t('business.directory.sort.distance', 'Distance')}</option>
                <option value="rating">{t('business.directory.sort.rating', 'Rating')}</option>
                <option value="name">{t('business.directory.sort.name', 'Name')}</option>
                <option value="newest">{t('business.directory.sort.newest', 'Newest')}</option>
              </select>
            </div>
          </div>
          
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('business.directory.category', 'Category')}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('business.directory.all_categories', 'All Categories')}</option>
                    {PORTUGUESE_BUSINESS_CATEGORIES.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.emoji} {category.name[language]}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('business.directory.location', 'Location')}
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">{t('business.directory.all_locations', 'All Locations')}</option>
                    {ukCities.map(city => (
                      <option key={city.id} value={city.name.en}>
                        {city.name[language]} ({city.businesses})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Radius Filter (when location is available) */}
                {userLocation && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('business.directory.radius', 'Search Radius')}: {radiusKm}km
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={radiusKm}
                      onChange={(e) => setRadiusKm(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t('business.directory.clear_filters', 'Clear Filters')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
            ) : (
              <span>
                {t('business.directory.results_count', 'Showing {{count}} of {{total}} businesses', {
                  count: filteredBusinesses.length,
                  total: businesses.length
                })}
              </span>
            )}
          </div>
          
          {userLocation && (
            <div className="text-sm text-gray-500">
              📍 {t('business.directory.location_detected', 'Location detected')}
            </div>
          )}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Map View */}
        {viewMode === 'map' && !loading && showMap && (
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <BusinessMap
              businesses={filteredBusinesses}
              selectedBusiness={selectedBusiness}
              onBusinessSelect={handleBusinessSelect}
              center={userLocation || undefined}
              showNearMeButton={true}
              showRadiusSelector={true}
            />
          </div>
        )}
        
        {/* Grid/List View */}
        {viewMode !== 'map' && !loading && (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                distance={getDistance(business.id)}
                compact={viewMode === 'list'}
                language={language}
              />
            ))}
          </div>
        )}
        
        {/* No Results */}
        {!loading && filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <BuildingStorefrontIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('business.directory.no_results', 'No businesses found')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('business.directory.no_results_desc', 'Try adjusting your search terms or filters')}
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t('business.directory.clear_filters', 'Clear Filters')}
            </button>
          </div>
        )}
      </div>
      
      {/* Featured Businesses Section */}
      {featuredBusinesses.length > 0 && viewMode !== 'map' && (
        <div className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('business.directory.featured', 'Featured Businesses')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  featured={true}
                  language={language}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
}

export { BusinessDirectory };
