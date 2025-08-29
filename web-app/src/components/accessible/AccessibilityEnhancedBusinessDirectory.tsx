"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { HeartIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/outline';

interface BusinessDirectoryProps {
  className?: string;
  children?: React.ReactNode;
  initialCategory?: string;
  initialLocation?: string;
  showMap?: boolean;
}

type ViewMode = 'grid' | 'list' | 'map';
type SortOption = 'relevance' | 'distance' | 'rating' | 'name' | 'newest';

export default function AccessibilityEnhancedBusinessDirectory({ 
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
  
  // Accessibility-specific refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  
  // Keyboard navigation state
  const [focusedBusinessIndex, setFocusedBusinessIndex] = useState(-1);
  const [announceToScreenReader, setAnnounceToScreenReader] = useState('');
  
  // Popular categories for quick access
  const popularCategories = getPopularBusinessCategories();
  
  // UK cities with Portuguese-speaking communities from config
  const ukCities = getUKCityBusinessData();
  
  // Enhanced keyboard navigation handlers
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedBusinessIndex(prev => 
          prev < filteredBusinesses.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedBusinessIndex(prev => 
          prev > 0 ? prev - 1 : filteredBusinesses.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        if (focusedBusinessIndex >= 0 && filteredBusinesses[focusedBusinessIndex]) {
          event.preventDefault();
          const business = filteredBusinesses[focusedBusinessIndex];
          handleBusinessSelect(business);
        }
        break;
      case 'Escape':
        setFocusedBusinessIndex(-1);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        break;
      case '/':
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        break;
    }
  }, [focusedBusinessIndex, filteredBusinesses]);
  
  // Screen reader announcements
  const announceResults = useCallback((count: number, total: number) => {
    const message = t('business.directory.results_announced', 
      'Showing {{count}} of {{total}} businesses. Use arrow keys to navigate, Enter to select.',
      { count, total }
    );
    setAnnounceToScreenReader(message);
  }, [t]);
  
  // Load businesses on component mount
  useEffect(() => {
    loadBusinesses();
    checkLocationPermission();
  }, []);
  
  // Filter businesses when search params change
  useEffect(() => {
    filterBusinesses();
  }, [searchQuery, selectedCategory, selectedLocation, sortBy, businesses, nearbyBusinesses]);
  
  // Announce results to screen reader when filtered businesses change
  useEffect(() => {
    if (!loading && filteredBusinesses.length >= 0) {
      announceResults(filteredBusinesses.length, businesses.length);
    }
  }, [filteredBusinesses, businesses, loading, announceResults]);
  
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
      
      // Announce location access to screen reader
      setAnnounceToScreenReader(t('business.directory.location_granted', 
        'Location access granted. Businesses sorted by distance.'
      ));
    } catch (error) {
      console.error('Location request failed:', error);
      setLocationPermission('denied');
      setAnnounceToScreenReader(t('business.directory.location_denied', 
        'Location access denied. Showing all businesses.'
      ));
    }
  }, [businesses, radiusKm, t]);
  
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
    setFocusedBusinessIndex(-1); // Reset focus when results change
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
    if (business) {
      setAnnounceToScreenReader(t('business.directory.business_selected', 
        'Selected {{businessName}}. Rating: {{rating}} stars.',
        { businessName: business.title[language], rating: business.rating }
      ));
    }
  }, [language, t]);
  
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSortBy('relevance');
    setShowFilters(false);
    setFocusedBusinessIndex(-1);
    setAnnounceToScreenReader(t('business.directory.filters_cleared', 'All filters cleared. Showing all businesses.'));
    
    // Focus back to search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [t]);
  
  const getDistance = useCallback((businessId: string): string | null => {
    const distance = nearbyBusinesses.find(nb => nb.businessId === businessId);
    return distance ? distance.distanceText : null;
  }, [nearbyBusinesses]);

  return (
    <div 
      className={`business-directory bg-gray-50 ${className || ''}`}
      onKeyDown={handleKeyDown}
      role="main"
      aria-label={t('business.directory.main_content', 'Portuguese Business Directory')}
    >
      {/* Screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announceToScreenReader}
      </div>
      
      {/* Skip to content link for keyboard users */}
      <a 
        href="#business-directory-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t('accessibility.skip_to_content', 'Skip to business listings')}
      </a>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
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
            
            {/* View Mode Toggle with Full Accessibility */}
            <div className="flex items-center gap-2">
              <div 
                className="flex rounded-lg border border-gray-300 overflow-hidden" 
                role="tablist" 
                aria-label={t('business.directory.view_modes', 'View modes for business directory')}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setViewMode('grid');
                      setAnnounceToScreenReader(t('business.directory.grid_view_selected', 'Grid view selected'));
                    }
                  }}
                  role="tab"
                  tabIndex={0}
                  aria-selected={viewMode === 'grid'}
                  aria-controls="business-directory-content"
                  aria-label={t('business.directory.grid_view', 'Grid view - shows businesses in a card layout')}
                  className={`px-4 py-2 text-sm font-medium min-h-[56px] min-w-[56px] flex items-center justify-center ${
                    viewMode === 'grid'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <ViewColumnsIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">{t('business.directory.grid_view', 'Grid view')}</span>
                </button>
                
                <button
                  onClick={() => setViewMode('list')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setViewMode('list');
                      setAnnounceToScreenReader(t('business.directory.list_view_selected', 'List view selected'));
                    }
                  }}
                  role="tab"
                  tabIndex={0}
                  aria-selected={viewMode === 'list'}
                  aria-controls="business-directory-content"
                  aria-label={t('business.directory.list_view', 'List view - shows businesses in a detailed list')}
                  className={`px-4 py-2 text-sm font-medium min-h-[56px] min-w-[56px] flex items-center justify-center ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                >
                  <FunnelIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">{t('business.directory.list_view', 'List view')}</span>
                </button>
                
                {showMap && (
                  <button
                    onClick={() => setViewMode('map')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setViewMode('map');
                        setAnnounceToScreenReader(t('business.directory.map_view_selected', 'Map view selected'));
                      }
                    }}
                    role="tab"
                    tabIndex={0}
                    aria-selected={viewMode === 'map'}
                    aria-controls="business-directory-content"
                    aria-label={t('business.directory.map_view', 'Map view - shows businesses on an interactive map')}
                    className={`px-4 py-2 text-sm font-medium min-h-[56px] min-w-[56px] flex items-center justify-center ${
                      viewMode === 'map'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
                    } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                  >
                    <MapIcon className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">{t('business.directory.map_view', 'Map view')}</span>
                  </button>
                )}
              </div>
              
              {locationPermission !== 'granted' && (
                <button
                  onClick={requestLocation}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      requestLocation();
                    }
                  }}
                  aria-label={t('business.directory.near_me_description', 'Find businesses near your location')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:bg-primary-600 transition-colors min-h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <MapPinIcon className="w-4 h-4" aria-hidden="true" />
                  {t('business.directory.near_me', 'Near Me')}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200" aria-label={t('business.directory.search_section', 'Search and filter businesses')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar with Enhanced Accessibility */}
            <div className="flex-1 relative">
              <label htmlFor="business-search" className="sr-only">
                {t('business.directory.search_label', 'Search businesses, services, or locations')}
              </label>
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                id="business-search"
                ref={searchInputRef}
                type="text"
                placeholder={t('business.directory.search_placeholder', 'Search businesses, services, or locations...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-describedby="search-help"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[56px]"
              />
              <div id="search-help" className="sr-only">
                {t('business.directory.search_help', 'Press forward slash to focus search, use arrow keys to navigate results')}
              </div>
            </div>
            
            {/* Quick Filters with Accessibility */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowFilters(!showFilters);
                  }
                }}
                aria-expanded={showFilters}
                aria-controls="advanced-filters"
                aria-label={t('business.directory.filters_toggle', showFilters ? 'Hide filters' : 'Show filters')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:bg-gray-50 whitespace-nowrap min-h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <FunnelIcon className="w-4 h-4" aria-hidden="true" />
                {t('business.directory.filters', 'Filters')}
              </button>
              
              {/* Sort Dropdown with Enhanced Labels */}
              <div className="relative">
                <label htmlFor="sort-select" className="sr-only">
                  {t('business.directory.sort_label', 'Sort businesses by')}
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    const sortLabels = {
                      relevance: t('business.directory.sort.relevance', 'Relevance'),
                      distance: t('business.directory.sort.distance', 'Distance'),
                      rating: t('business.directory.sort.rating', 'Rating'),
                      name: t('business.directory.sort.name', 'Name'),
                      newest: t('business.directory.sort.newest', 'Newest')
                    };
                    setAnnounceToScreenReader(t('business.directory.sort_changed', 'Sorted by {{sortType}}', { sortType: sortLabels[e.target.value as SortOption] }));
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[56px] focus:outline-none"
                >
                  <option value="relevance">{t('business.directory.sort.relevance', 'Relevance')}</option>
                  <option value="distance">{t('business.directory.sort.distance', 'Distance')}</option>
                  <option value="rating">{t('business.directory.sort.rating', 'Rating')}</option>
                  <option value="name">{t('business.directory.sort.name', 'Name')}</option>
                  <option value="newest">{t('business.directory.sort.newest', 'Newest')}</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters Panel with Full Accessibility */}
          {showFilters && (
            <div 
              id="advanced-filters"
              ref={filtersRef}
              role="region"
              aria-label={t('business.directory.advanced_filters', 'Advanced filter options')}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('business.directory.category', 'Category')}
                  </label>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (e.target.value) {
                        const category = PORTUGUESE_BUSINESS_CATEGORIES.find(c => c.id === e.target.value);
                        if (category) {
                          setAnnounceToScreenReader(t('business.directory.category_selected', 'Category filter: {{categoryName}}', { categoryName: category.name[language] }));
                        }
                      } else {
                        setAnnounceToScreenReader(t('business.directory.category_cleared', 'Category filter cleared'));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 min-h-[56px] focus:outline-none"
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
                  <label htmlFor="location-select" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('business.directory.location', 'Location')}
                  </label>
                  <select
                    id="location-select"
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      if (e.target.value) {
                        setAnnounceToScreenReader(t('business.directory.location_selected', 'Location filter: {{locationName}}', { locationName: e.target.value }));
                      } else {
                        setAnnounceToScreenReader(t('business.directory.location_cleared', 'Location filter cleared'));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 min-h-[56px] focus:outline-none"
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
                    <label htmlFor="radius-slider" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('business.directory.radius', 'Search Radius')}: {radiusKm}km
                    </label>
                    <input
                      id="radius-slider"
                      type="range"
                      min="1"
                      max="50"
                      value={radiusKm}
                      onChange={(e) => {
                        const newRadius = parseInt(e.target.value);
                        setRadiusKm(newRadius);
                        setAnnounceToScreenReader(t('business.directory.radius_changed', 'Search radius set to {{radius}} kilometers', { radius: newRadius }));
                      }}
                      aria-describedby="radius-help"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div id="radius-help" className="sr-only">
                      {t('business.directory.radius_help', 'Adjust search radius from 1 to 50 kilometers')}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      clearFilters();
                    }
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:text-gray-800 transition-colors min-h-[56px] rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t('business.directory.clear_filters', 'Clear Filters')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Main Content Area */}
      <main 
        id="business-directory-content"
        ref={resultsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        tabIndex={-1}
      >
        {/* Results Header with Screen Reader Context */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {loading ? (
              <div className="animate-pulse" aria-live="polite">
                <div className="h-4 bg-gray-300 rounded w-48"></div>
                <span className="sr-only">{t('business.directory.loading', 'Loading businesses...')}</span>
              </div>
            ) : (
              <span role="status" aria-live="polite">
                {t('business.directory.results_count', 'Showing {{count}} of {{total}} businesses', {
                  count: filteredBusinesses.length,
                  total: businesses.length
                })}
              </span>
            )}
          </div>
          
          {userLocation && (
            <div className="text-sm text-gray-500" role="status">
              📍 {t('business.directory.location_detected', 'Location detected')}
            </div>
          )}
        </div>
        
        {/* Loading State with Accessibility */}
        {loading && (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="status"
            aria-live="polite"
            aria-label={t('business.directory.loading_businesses', 'Loading businesses')}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse" aria-hidden="true">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Map View with Accessibility */}
        {viewMode === 'map' && !loading && showMap && (
          <div 
            className="h-[600px] rounded-lg overflow-hidden shadow-lg"
            role="application"
            aria-label={t('business.directory.map_application', 'Interactive map showing business locations')}
          >
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
        
        {/* Grid/List View with Enhanced Navigation */}
        {viewMode !== 'map' && !loading && (
          <div 
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
            role="list"
            aria-label={t('business.directory.business_list', 'List of businesses')}
          >
            {filteredBusinesses.map((business, index) => (
              <div 
                key={business.id}
                role="listitem"
                className={focusedBusinessIndex === index ? 'ring-2 ring-primary-500 rounded-lg' : ''}
                tabIndex={focusedBusinessIndex === index ? 0 : -1}
              >
                <BusinessCard
                  business={business}
                  distance={getDistance(business.id)}
                  compact={viewMode === 'list'}
                  language={language}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* No Results with Helpful Actions */}
        {!loading && filteredBusinesses.length === 0 && (
          <div className="text-center py-12" role="status" aria-live="polite">
            <BuildingStorefrontIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('business.directory.no_results', 'No businesses found')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('business.directory.no_results_desc', 'Try adjusting your search terms or filters')}
            </p>
            <button
              onClick={clearFilters}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  clearFilters();
                }
              }}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:bg-primary-600 transition-colors min-h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t('business.directory.clear_filters', 'Clear Filters')}
            </button>
          </div>
        )}
      </main>
      
      {/* Keyboard Navigation Instructions */}
      <div className="sr-only" role="complementary" aria-label={t('accessibility.keyboard_instructions', 'Keyboard navigation instructions')}>
        <h2>{t('accessibility.keyboard_navigation', 'Keyboard Navigation')}</h2>
        <ul>
          <li>{t('accessibility.key_slash', 'Press / to focus search')}</li>
          <li>{t('accessibility.key_arrows', 'Use arrow keys to navigate business listings')}</li>
          <li>{t('accessibility.key_enter', 'Press Enter or Space to select')}</li>
          <li>{t('accessibility.key_escape', 'Press Escape to return to search')}</li>
          <li>{t('accessibility.key_tab', 'Use Tab to navigate between sections')}</li>
        </ul>
      </div>
    </div>
  );
}