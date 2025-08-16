'use client'

// LusoTown Design System Usage:
// - Primary (blue): Icons, information, navigation elements
// - Portuguese CTA Gradient: from-secondary-600 via-action-600 to-accent-600 (Green → Red → Amber)
// - Always use Portuguese gradient for main action buttons (search, join, book, etc.)

import React, { useState, useEffect, useRef } from 'react'
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ClockIcon,
  MapPinIcon,
  TagIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { Event } from '@/lib/events'
import { searchEvents, searchContent, SearchResult } from '@/lib/search'

interface SearchBarProps {
  variant?: 'homepage' | 'header' | 'page'
  className?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ variant = 'homepage', className = '', onSearch }: SearchBarProps) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        if (variant === 'header') {
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [variant])

  // Real-time search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      try {
        const [eventResults, contentResults] = await Promise.all([
          searchEvents(query),
          searchContent(query)
        ])

        const allResults = [
          ...eventResults.slice(0, 4),
          ...contentResults.slice(0, 3)
        ].slice(0, 6)

        setSuggestions(allResults)
        setShowSuggestions(allResults.length > 0)
      } catch (error) {
        console.error('Search error:', error)
        setSuggestions([])
        setShowSuggestions(false)
      }
      setIsLoading(false)
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (finalQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`)
      onSearch?.(finalQuery)
      setShowSuggestions(false)
      if (variant === 'header') {
        setIsExpanded(false)
      }
    }
  }

  const handleSuggestionClick = (suggestion: SearchResult) => {
    if (suggestion.type === 'event') {
      router.push(`/events/${suggestion.id}`)
    } else {
      router.push(suggestion.url)
    }
    setShowSuggestions(false)
    setQuery('')
    if (variant === 'header') {
      setIsExpanded(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      if (variant === 'header') {
        setIsExpanded(false)
      }
    }
  }

  const handleFocus = () => {
    if (variant === 'header') {
      setIsExpanded(true)
    }
    if (suggestions.length > 0 && query.trim().length >= 2) {
      setShowSuggestions(true)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <CalendarDaysIcon className="w-4 h-4" />
      case 'business':
        return <BuildingStorefrontIcon className="w-4 h-4" />
      case 'group':
        return <UserGroupIcon className="w-4 h-4" />
      case 'page':
        return <TagIcon className="w-4 h-4" />
      default:
        return <MagnifyingGlassIcon className="w-4 h-4" />
    }
  }

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'event':
        return t('search.type.event')
      case 'business':
        return t('search.type.business')
      case 'group':
        return t('search.type.group')
      case 'page':
        return t('search.type.page')
      default:
        return type
    }
  }

  // Homepage variant - prominent search bar
  if (variant === 'homepage') {
    return (
      <div className={`relative max-w-4xl mx-auto ${className}`} ref={searchRef}>
        <div className="relative">
          <div className="relative bg-white/90 backdrop-blur-lg border-2 border-primary-200/60 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-primary-300/80 group">
            <div className="flex items-center p-6">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                  <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  placeholder={t('search.placeholder')}
                  className="w-full text-xl font-medium text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSearch()}
                className="flex-shrink-0 ml-4 px-8 py-3 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg min-h-[44px]"
              >
{t('search.button')}
              </button>
            </div>
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200/60 backdrop-blur-lg z-50 overflow-hidden">
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                  <MagnifyingGlassIcon className="w-4 h-4" />
{t('search.suggestions')}
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.type}-${suggestion.id}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 rounded-xl hover:bg-primary-50 transition-colors group min-h-[44px]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-200 transition-colors flex items-center justify-center text-primary-600">
                          {getResultIcon(suggestion.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 break-words line-clamp-1 leading-tight flex-1 min-w-0">{suggestion.title}</h4>
                            <span className="flex-shrink-0 text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full whitespace-nowrap">
                              {getResultTypeLabel(suggestion.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{suggestion.description}</p>
                          {suggestion.location && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <MapPinIcon className="w-3 h-3" />
                              {suggestion.location}
                            </div>
                          )}
                          {suggestion.date && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <ClockIcon className="w-3 h-3" />
                              {new Date(suggestion.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-3 bg-gray-50">
                <button
                  onClick={() => handleSearch()}
                  className="w-full text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  {t('search.see-all-results').replace('{query}', query)}
                </button>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200/60 p-4 z-50">
              <div className="flex items-center justify-center gap-3 text-gray-500">
                <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
{t('search.searching')}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Header variant - compact search bar
  if (variant === 'header') {
    return (
      <div className={`relative ${className}`} ref={searchRef}>
        <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-80' : 'w-10'}`}>
          {!isExpanded ? (
            <button
              onClick={() => {
                setIsExpanded(true)
                setTimeout(() => inputRef.current?.focus(), 100)
              }}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-full shadow-lg">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  placeholder={t('search.placeholder.short')}
                  className="w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1 pr-2">
                {query && (
                  <button
                    onClick={clearSearch}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <button
                  onClick={() => handleSearch()}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Header Search Suggestions */}
        {isExpanded && showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 min-h-[44px]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                      {getResultIcon(suggestion.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 break-words line-clamp-1 text-sm leading-tight">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1 leading-relaxed">{suggestion.description}</p>
                    </div>
                    <span className="flex-shrink-0 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded whitespace-nowrap">
                      {getResultTypeLabel(suggestion.type)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default/page variant - standard search bar
  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center p-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={t('search.placeholder')}
            className="flex-1 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none min-h-[44px]"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="p-2 ml-2 hover:bg-gray-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            >
              <XMarkIcon className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Page Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id}-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                    {getResultIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 break-words line-clamp-1 leading-tight flex-1 min-w-0">{suggestion.title}</h4>
                      <span className="flex-shrink-0 text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full whitespace-nowrap">
                        {getResultTypeLabel(suggestion.type)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{suggestion.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}