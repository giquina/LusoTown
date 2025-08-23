'use client'

// LusoTown Premium Navigation Context
// Sophisticated navigation state management for affluent Portuguese speakers
// Elite user journey tracking and breadcrumb automation

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

interface NavigationState {
  currentPath: string
  previousPath: string | null
  breadcrumbs: BreadcrumbItem[]
  userJourney: NavigationStep[]
  isLoading: boolean
  searchHistory: string[]
  favoritePages: string[]
}

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
  subtitle?: string
  category?: 'event' | 'service' | 'community' | 'content'
}

interface NavigationStep {
  path: string
  timestamp: Date
  timeSpent?: number
  referrer?: string
  searchQuery?: string
  userAction?: 'click' | 'search' | 'navigation' | 'bookmark'
}

interface NavigationContextType {
  state: NavigationState
  updateBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  addToJourney: (step: Partial<NavigationStep>) => void
  markPageAsFavorite: (path: string) => void
  removeFromFavorites: (path: string) => void
  addSearchQuery: (query: string) => void
  getPageAnalytics: (path: string) => NavigationAnalytics
  getBreadcrumbsForPath: (path: string) => BreadcrumbItem[]
  isCurrentPage: (path: string) => boolean
  getRelatedPages: (path: string) => string[]
}

interface NavigationAnalytics {
  visitCount: number
  averageTimeSpent: number
  lastVisited: Date | null
  commonEntry: string | null
  conversionRate: number
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Premium route mapping for Portuguese-speaking community
const ROUTE_HIERARCHY: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/events': [
    { label: 'Events', isActive: true, category: 'event', subtitle: 'Portuguese-speaking community Events' }
  ],
  '/events/create': [
    { label: 'Events', href: ROUTES.events, category: 'event' },
    { label: 'Create Event', isActive: true, category: 'event', subtitle: 'Host Your Event' }
  ],
  '/community': [
    { label: 'Community', isActive: true, category: 'community', subtitle: 'Portuguese Speakers in London' }
  ],
  '/services': [
    { label: 'Premium Services', isActive: true, category: 'service', subtitle: 'Exclusive Portuguese Services' }
  ],
  '/transport': [
    { label: 'Services', href: ROUTES.services, category: 'service' },
    { label: 'Transport', isActive: true, category: 'service', subtitle: 'Portuguese-Speaking Drivers' }
  ],
  '/london-tours': [
    { label: 'Services', href: ROUTES.services, category: 'service' },
    { label: 'London Tours', isActive: true, category: 'service', subtitle: 'Portuguese-Guided Tours' }
  ],
  '/business-networking': [
    { label: 'Events', href: ROUTES.events, category: 'event' },
    { label: 'Business Networking', isActive: true, category: 'event', subtitle: 'Professional Portuguese Network' }
  ],
  '/matches': [
    { label: 'Find Your Match', isActive: true, category: 'community', subtitle: 'Connect with Portuguese Speakers' }
  ],
  '/tv': [
    { label: 'Live TV', isActive: true, category: 'content', subtitle: 'Portuguese Content & Shows' }
  ],
  '/live': [
    { label: 'Streaming Income', isActive: true, category: 'service', subtitle: 'Monetize Your Portuguese Content' }
  ],
  '/students': [
    { label: 'Students', isActive: true, category: 'community', subtitle: 'Portuguese Students in UK' }
  ],
  '/pricing': [
    { label: 'Pricing', isActive: true, category: 'service', subtitle: 'Membership Plans' }
  ]
}

// Related pages mapping for intelligent navigation
const RELATED_PAGES: Record<string, string[]> = {
  '/events': ['/community', '/business-networking', '/students'],
  '/community': ['/events', '/matches', '/forums'],
  '/services': ['/transport', '/london-tours', '/live'],
  '/transport': ['/services', '/london-tours'],
  '/london-tours': ['/services', '/transport', '/events'],
  '/business-networking': ['/events', '/community', '/services'],
  '/matches': ['/community', '/events'],
  '/tv': ['/live', '/events'],
  '/live': ['/tv', '/services'],
  '/students': ['/events', '/community', '/pricing']
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useLanguage()

  const [state, setState] = useState<NavigationState>({
    currentPath: pathname || '/',
    previousPath: null,
    breadcrumbs: [],
    userJourney: [],
    isLoading: false,
    searchHistory: [],
    favoritePages: []
  })

  // Initialize navigation state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedJourney = localStorage.getItem('lusotown-navigation-journey')
      const savedFavorites = localStorage.getItem('lusotown-favorite-pages')
      const savedSearchHistory = localStorage.getItem('lusotown-search-history')

      setState(prev => ({
        ...prev,
        userJourney: savedJourney ? JSON.parse(savedJourney) : [],
        favoritePages: savedFavorites ? JSON.parse(savedFavorites) : [],
        searchHistory: savedSearchHistory ? JSON.parse(savedSearchHistory) : []
      }))
    }
  }, [])

  // Track navigation changes
  useEffect(() => {
    if (!pathname) return; // Guard against null pathname
    
    setState(prev => {
      // Prevent unnecessary state updates if the path hasn't changed
      if (prev.currentPath === pathname) return prev;
      
      const newState = {
        ...prev,
        previousPath: prev.currentPath,
        currentPath: pathname,
        breadcrumbs: getBreadcrumbsForPath(pathname)
      }

      // Add to user journey
      const journeyStep: NavigationStep = {
        path: pathname,
        timestamp: new Date(),
        userAction: 'navigation'
      }

      // Calculate time spent on previous page
      if (prev.userJourney.length > 0) {
        const lastStep = prev.userJourney[prev.userJourney.length - 1]
        if (lastStep && !lastStep.timeSpent) {
          lastStep.timeSpent = Date.now() - lastStep.timestamp.getTime()
        }
      }

      const updatedJourney = [...prev.userJourney, journeyStep].slice(-50) // Keep last 50 steps

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('lusotown-navigation-journey', JSON.stringify(updatedJourney))
      }

      return {
        ...newState,
        userJourney: updatedJourney
      }
    })
  }, [pathname])

  const updateBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
    setState(prev => ({ ...prev, breadcrumbs }))
  }

  const addToJourney = (step: Partial<NavigationStep>) => {
    const fullStep: NavigationStep = {
      path: pathname || '/',
      timestamp: new Date(),
      userAction: 'click',
      ...step
    }

    setState(prev => {
      const updatedJourney = [...prev.userJourney, fullStep].slice(-50)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('lusotown-navigation-journey', JSON.stringify(updatedJourney))
      }

      return {
        ...prev,
        userJourney: updatedJourney
      }
    })
  }

  const markPageAsFavorite = (path: string) => {
    setState(prev => {
      if (prev.favoritePages.includes(path)) return prev

      const updatedFavorites = [...prev.favoritePages, path]
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('lusotown-favorite-pages', JSON.stringify(updatedFavorites))
      }

      return {
        ...prev,
        favoritePages: updatedFavorites
      }
    })
  }

  const removeFromFavorites = (path: string) => {
    setState(prev => {
      const updatedFavorites = prev.favoritePages.filter(p => p !== path)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('lusotown-favorite-pages', JSON.stringify(updatedFavorites))
      }

      return {
        ...prev,
        favoritePages: updatedFavorites
      }
    })
  }

  const addSearchQuery = (query: string) => {
    setState(prev => {
      if (prev.searchHistory.includes(query)) return prev

      const updatedHistory = [query, ...prev.searchHistory].slice(0, 20) // Keep last 20 searches
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('lusotown-search-history', JSON.stringify(updatedHistory))
      }

      return {
        ...prev,
        searchHistory: updatedHistory
      }
    })

    // Add to journey
    addToJourney({
      userAction: 'search',
      searchQuery: query
    })
  }

  const getPageAnalytics = (path: string): NavigationAnalytics => {
    const visits = state.userJourney.filter(step => step.path === path)
    const visitCount = visits.length
    const totalTime = visits.reduce((sum, visit) => sum + (visit.timeSpent || 0), 0)
    const averageTimeSpent = visitCount > 0 ? totalTime / visitCount : 0
    const lastVisited = visits.length > 0 ? visits[visits.length - 1].timestamp : null

    // Find most common entry point
    const entryPoints = visits
      .filter(visit => visit.referrer)
      .reduce((acc, visit) => {
        acc[visit.referrer!] = (acc[visit.referrer!] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    const commonEntry = Object.keys(entryPoints).length > 0 
      ? Object.entries(entryPoints).sort(([,a], [,b]) => b - a)[0][0]
      : null

    // Simple conversion rate calculation (pages with actions vs total visits)
    const actionsOnPage = state.userJourney.filter(
      step => step.path === path && ['click', 'bookmark'].includes(step.userAction || '')
    ).length
    const conversionRate = visitCount > 0 ? (actionsOnPage / visitCount) * 100 : 0

    return {
      visitCount,
      averageTimeSpent,
      lastVisited,
      commonEntry,
      conversionRate
    }
  }

  const getBreadcrumbsForPath = (path: string): BreadcrumbItem[] => {
    try {
      // Translate breadcrumb labels safely - avoid using t() during SSR or infinite loops
      const breadcrumbs = ROUTE_HIERARCHY[path] || []
      return breadcrumbs.map(crumb => ({
        ...crumb,
        // Use fallback labels initially, translations can be applied later in client-side rendering
        label: crumb.label // Keep original labels to avoid translation loops
      }))
    } catch (error) {
      console.error('Error generating breadcrumbs for path:', path, error)
      return []
    }
  }

  const isCurrentPage = (path: string): boolean => {
    return state.currentPath === path
  }

  const getRelatedPages = (path: string): string[] => {
    return RELATED_PAGES[path] || []
  }

  const contextValue: NavigationContextType = {
    state,
    updateBreadcrumbs,
    addToJourney,
    markPageAsFavorite,
    removeFromFavorites,
    addSearchQuery,
    getPageAnalytics,
    getBreadcrumbsForPath,
    isCurrentPage,
    getRelatedPages
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

// Premium navigation analytics hook
export function useNavigationAnalytics() {
  const { state, getPageAnalytics } = useNavigation()

  const getCurrentPageAnalytics = () => getPageAnalytics(state.currentPath)
  
  const getTopPages = (limit: number = 5) => {
    const pageCounts = state.userJourney.reduce((acc, step) => {
      acc[step.path] = (acc[step.path] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([path, count]) => ({ path, count }))
  }

  const getRecentSearches = (limit: number = 10) => {
    return state.searchHistory.slice(0, limit)
  }

  const getJourneyInsights = () => {
    const totalSessions = state.userJourney.length
    const uniquePages = new Set(state.userJourney.map(step => step.path)).size
    const avgTimePerPage = state.userJourney
      .filter(step => step.timeSpent)
      .reduce((sum, step) => sum + (step.timeSpent || 0), 0) / totalSessions

    return {
      totalSessions,
      uniquePages,
      avgTimePerPage,
      favoriteCount: state.favoritePages.length,
      searchCount: state.searchHistory.length
    }
  }

  return {
    getCurrentPageAnalytics,
    getTopPages,
    getRecentSearches,
    getJourneyInsights
  }
}

export default NavigationProvider