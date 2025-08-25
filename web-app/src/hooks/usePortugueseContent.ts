'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface UsePortugueseContentOptions {
  enableCaching?: boolean
  cacheKey?: string
  fallback?: any
}

interface PortugueseContentState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

// Cache for Lusophone content to improve performance
const contentCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Custom hook for loading Lusophone content with performance optimizations
 * Includes caching, error handling, and loading states
 */
export function usePortugueseContent<T>(
  fetcher: () => Promise<T>,
  options: UsePortugueseContentOptions = {}
): PortugueseContentState<T> {
  const { language } = useLanguage()
  const { enableCaching = true, cacheKey, fallback } = options
  
  const [data, setData] = useState<T | null>(fallback || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    const key = cacheKey || `portuguese-content-${language}`
    
    // Check cache first if enabled
    if (enableCaching && contentCache.has(key)) {
      const cached = contentCache.get(key)!
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data)
        return
      }
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      setData(result)
      
      // Cache the result if enabled
      if (enableCaching) {
        contentCache.set(key, {
          data: result,
          timestamp: Date.now()
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load Lusophone content'
      setError(errorMessage)
      console.error('Lusophone content loading error:', err)
      
      // Use fallback if available
      if (fallback) {
        setData(fallback)
      }
    } finally {
      setIsLoading(false)
    }
  }, [fetcher, language, cacheKey, enableCaching, fallback])

  // Fetch content on mount and language change
  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  const refetch = useCallback(() => {
    // Clear cache for this key before refetching
    const key = cacheKey || `portuguese-content-${language}`
    if (enableCaching && contentCache.has(key)) {
      contentCache.delete(key)
    }
    fetchContent()
  }, [fetchContent, cacheKey, language, enableCaching])

  return {
    data,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook specifically for Lusophone cultural events
 */
export function usePortugueseEvents() {
  return usePortugueseContent(
    async () => {
      // This would typically fetch from your API
      const response = await fetch('/api/events/portuguese')
      if (!response.ok) {
        throw new Error('Failed to fetch Lusophone events')
      }
      return response.json()
    },
    {
      cacheKey: 'portuguese-events',
      enableCaching: true
    }
  )
}

/**
 * Hook for Portuguese business directory
 */
export function usePortugueseBusinesses() {
  return usePortugueseContent(
    async () => {
      const response = await fetch('/api/businesses/portuguese')
      if (!response.ok) {
        throw new Error('Failed to fetch Portuguese businesses')
      }
      return response.json()
    },
    {
      cacheKey: 'portuguese-businesses',
      enableCaching: true
    }
  )
}

/**
 * Clear all Lusophone content cache (useful for admin actions)
 */
export function clearPortugueseContentCache(): void {
  contentCache.clear()
}
