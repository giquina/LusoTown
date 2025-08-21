'use client'

// LusoTown Premium Search Interface
// Sophisticated search experience for affluent Portuguese speakers
// AI-powered suggestions with luxury visual hierarchy

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  TrendingUpIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  SparklesIcon,
  MapPinIcon,
  CalendarDaysIcon,
  TagIcon,
  UserGroupIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNavigation } from '@/context/NavigationContext'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'event' | 'business' | 'service' | 'community' | 'content'
  category: string
  url: string
  location?: string
  date?: string
  price?: string
  rating?: number
  image?: string
  metadata?: {
    trending?: boolean
    premium?: boolean
    verified?: boolean
    popularity?: number
    recentlyAdded?: boolean
  }
}

interface SearchFilter {
  type: string[]
  location: string[]
  dateRange: [Date | null, Date | null]
  priceRange: [number, number]
  category: string[]
  features: string[]
}

interface PremiumSearchInterfaceProps {
  variant?: 'full' | 'compact' | 'modal'
  showFilters?: boolean
  showSuggestions?: boolean
  maxResults?: number
  placeholder?: string
  className?: string
  onSearch?: (query: string, filters: SearchFilter) => void
  onResultSelect?: (result: SearchResult) => void
}

export default function PremiumSearchInterface({
  variant = 'full',
  showFilters = true,
  showSuggestions = true,
  maxResults = 10,
  placeholder,
  className = '',
  onSearch,
  onResultSelect
}: PremiumSearchInterfaceProps) {
  const { t } = useLanguage()
  const { addSearchQuery, state } = useNavigation()
  const router = useRouter()
  
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [filters, setFilters] = useState<SearchFilter>({
    type: [],
    location: [],
    dateRange: [null, null],
    priceRange: [0, 1000],
    category: [],
    features: []
  })

  // Portuguese-specific search suggestions
  const portugueseSuggestions = [
    t('search.suggestions.events', 'Portuguese events London'),
    t('search.suggestions.restaurants', 'Portuguese restaurants'),
    t('search.suggestions.community', 'Portuguese community'),
    t('search.suggestions.language', 'Portuguese language exchange'),
    t('search.suggestions.business', 'Portuguese business networking'),
    t('search.suggestions.culture', 'Portuguese cultural events'),
    t('search.suggestions.fado', 'Fado nights London'),
    t('search.suggestions.football', 'Portuguese football viewing'),
  ]

  // Mock search results with Portuguese context
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Fado Night at Cafe OPorto',
      description: 'Authentic Portuguese Fado music evening with traditional cuisine',
      type: 'event',
      category: 'Cultural',
      url: '/events/fado-night-cafe-oporto',
      location: 'South Lambeth Road, London',
      date: '2024-09-15',
      price: '£25',
      rating: 4.8,
      metadata: { trending: true, verified: true, popularity: 95 }
    },
    {
      id: '2',
      title: 'Portuguese Business Network Meetup',
      description: 'Monthly networking event for Portuguese entrepreneurs in London',
      type: 'event',
      category: 'Business',
      url: '/events/portuguese-business-network',
      location: 'Canary Wharf, London',
      date: '2024-09-20',
      price: 'Free',
      metadata: { premium: true, verified: true, popularity: 87 }
    },
    {
      id: '3',
      title: 'Quinta do Portal Wine Tasting',
      description: 'Premium Portuguese wine tasting with expert sommelier',
      type: 'event',
      category: 'Food & Wine',
      url: '/events/quinta-portal-wine-tasting',
      location: 'Mayfair, London',
      date: '2024-09-25',
      price: '£45',
      rating: 4.9,
      metadata: { premium: true, trending: true, popularity: 92 }
    }
  ]

  // Handle search with intelligent suggestions
  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Filter mock results based on query
      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
      )

      setResults(filteredResults.slice(0, maxResults))
      setShowResults(filteredResults.length > 0)
      setIsLoading(false)

      // Add to search history
      if (query.trim()) {
        addSearchQuery(query.trim())
      }
    }

    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [query, maxResults, addSearchQuery])

  // Generate intelligent suggestions based on current input
  useEffect(() => {
    if (query.length > 0) {
      const filtered = portugueseSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions(state.searchHistory.slice(0, 5))
    }
  }, [query, state.searchHistory])

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      onSearch?.(finalQuery, filters)
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    onResultSelect?.(result)
    router.push(result.url)
    setShowResults(false)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'event': return <CalendarDaysIcon className="w-5 h-5" />
      case 'business': return <BuildingStorefrontIcon className="w-5 h-5" />
      case 'service': return <SparklesIcon className="w-5 h-5" />
      case 'community': return <UserGroupIcon className="w-5 h-5" />
      default: return <TagIcon className="w-5 h-5" />
    }
  }

  const categories = [
    { id: 'all', label: t('search.categories.all', 'All'), count: results.length },
    { id: 'events', label: t('search.categories.events', 'Events'), count: results.filter(r => r.type === 'event').length },
    { id: 'businesses', label: t('search.categories.businesses', 'Businesses'), count: results.filter(r => r.type === 'business').length },
    { id: 'services', label: t('search.categories.services', 'Services'), count: results.filter(r => r.type === 'service').length },
  ]

  if (variant === 'compact') {
    return (
      <div className={`relative max-w-md ${className}`} ref={searchRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || t('search.placeholder.compact', 'Search Portuguese community...')}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Main Search Bar */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-lg border-2 border-primary-200/60 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex items-center p-4 lg:p-6">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder || t('search.placeholder.full', 'Search events, services, community...')}
              className="w-full text-lg lg:text-xl font-medium text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none pr-12"
            />
            {query && (
              <motion.button
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
          </div>

          {showFilters && (
            <motion.button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="mx-4 p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AdjustmentsHorizontalIcon className="w-6 h-6" />
            </motion.button>
          )}

          <motion.button
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Premium shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">{t('search.button', 'Search')}</span>
          </motion.button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && !showResults && (
          <motion.div
            className="border-t border-gray-200/60 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                {query ? t('search.suggestions.title', 'Suggestions') : t('search.recent.title', 'Recent Searches')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion)
                    handleSearch(suggestion)
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-primary-700 bg-gray-100 hover:bg-primary-50 rounded-full transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/60 z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Category Filters */}
            <div className="border-b border-gray-200/60 p-4">
              <div className="flex items-center gap-4 overflow-x-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{category.label}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">{t('search.searching', 'Searching...')}</span>
                </div>
              ) : (
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50/80 hover:to-secondary-50/80 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center text-primary-600 transition-colors">
                          {getResultIcon(result.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                              {result.title}
                            </h3>
                            <div className="flex items-center gap-2 ml-4">
                              {result.metadata?.trending && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  🔥 Trending
                                </span>
                              )}
                              {result.metadata?.premium && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-premium-100 text-premium-700">
                                  👑 Premium
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                            {result.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {result.location && (
                              <span className="flex items-center gap-1">
                                <MapPinIcon className="w-3 h-3" />
                                {result.location}
                              </span>
                            )}
                            {result.date && (
                              <span className="flex items-center gap-1">
                                <CalendarDaysIcon className="w-3 h-3" />
                                {new Date(result.date).toLocaleDateString()}
                              </span>
                            )}
                            {result.price && (
                              <span className="font-medium text-primary-600">
                                {result.price}
                              </span>
                            )}
                            {result.rating && (
                              <span className="flex items-center gap-1">
                                <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {result.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* View All Results */}
            {results.length > 0 && (
              <div className="border-t border-gray-200/60 p-4">
                <motion.button
                  onClick={() => handleSearch()}
                  className="w-full text-center py-3 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  {t('search.view-all', 'View all results for "{query}"').replace('{query}', query)}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}