'use client'

import { useState } from 'react'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface FeedSearchProps {
  onSearch: (query: string) => void
  onFilter: (filters: any) => void
  currentQuery: string
  activeFilters: number
}

export default function FeedSearch({
  onSearch,
  onFilter,
  currentQuery,
  activeFilters
}: FeedSearchProps) {
  const [query, setQuery] = useState(currentQuery)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    eventType: '',
    businessType: '',
    hashtags: [] as string[],
    dateRange: 'all'
  })

  const handleSearch = () => {
    onSearch(query)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  const applyFilters = () => {
    onFilter(filters)
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      eventType: '',
      businessType: '',
      hashtags: [],
      dateRange: 'all'
    })
    onFilter({})
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search posts, events, businesses, hashtags..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
          >
            Search
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
              showFilters || activeFilters > 0
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
            {activeFilters > 0 && (
              <span className="bg-white text-primary-500 text-xs px-2 py-1 rounded-full font-medium">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Filter Panel */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Event Type
              </label>
              <select
                value={filters.eventType}
                onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              >
                <option value="">All Events</option>
                <option value="music">Music & Entertainment</option>
                <option value="food">Food & Dining</option>
                <option value="culture">Cultural Events</option>
                <option value="social">Social Gatherings</option>
                <option value="business">Business Networking</option>
                <option value="sports">Sports & Fitness</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Business Type
              </label>
              <select
                value={filters.businessType}
                onChange={(e) => setFilters({...filters, businessType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              >
                <option value="">All Businesses</option>
                <option value="restaurant">Restaurants & Cafés</option>
                <option value="shop">Shops & Services</option>
                <option value="entertainment">Entertainment</option>
                <option value="professional">Professional Services</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Popular Hashtags
              </label>
              <div className="flex flex-wrap gap-2">
                {['#LusoTown', '#Portugal', '#Brazil', '#Angola', '#Mozambique'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const newHashtags = filters.hashtags.includes(tag)
                        ? filters.hashtags.filter(t => t !== tag)
                        : [...filters.hashtags, tag]
                      setFilters({...filters, hashtags: newHashtags})
                    }}
                    className={`text-xs px-2 py-1 rounded-full ${
                      filters.hashtags.includes(tag)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={applyFilters}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}