'use client'

// LusoTown Smart Navigation Component
// Intelligent navigation suggestions for affluent Portuguese speakers
// AI-powered recommendations based on user behavior and preferences

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  ArrowArrowTrendingUpIcon,
  UserGroupIcon,
  SparklesIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNavigation, useNavigationAnalytics } from '@/context/NavigationContext'
import { ROUTES } from '@/config/routes'

interface SmartNavProps {
  variant?: 'sidebar' | 'floating' | 'inline' | 'minimal'
  showAnalytics?: boolean
  maxSuggestions?: number
  className?: string
}

interface NavigationSuggestion {
  path: string
  title: string
  description: string
  category: 'trending' | 'recommended' | 'favorite' | 'recent' | 'related'
  icon?: React.ReactNode
  urgency?: 'low' | 'medium' | 'high'
  metadata?: {
    users?: number
    trending?: boolean
    new?: boolean
    premium?: boolean
  }
}

export default function SmartNavigation({ 
  variant = 'floating',
  showAnalytics = true,
  maxSuggestions = 5,
  className = ''
}: SmartNavProps) {
  const { t } = useLanguage()
  const { state, getRelatedPages, markPageAsFavorite, addToJourney } = useNavigation()
  const { getTopPages, getRecentSearches, getJourneyInsights } = useNavigationAnalytics()
  
  const [suggestions, setSuggestions] = useState<NavigationSuggestion[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Generate intelligent navigation suggestions
  useEffect(() => {
    const generateSuggestions = () => {
      const relatedPages = getRelatedPages(state.currentPath)
      const topPages = getTopPages(3)
      const recentSearches = getRecentSearches(3)
      
      const suggestions: NavigationSuggestion[] = []

      // Add related pages
      relatedPages.slice(0, 2).forEach(path => {
        suggestions.push({
          path,
          title: getPageTitle(path),
          description: getPageDescription(path),
          category: 'related',
          icon: getPageIcon(path),
          urgency: 'medium'
        })
      })

      // Add trending pages
      topPages.forEach(({ path, count }) => {
        if (path !== state.currentPath && !suggestions.find(s => s.path === path)) {
          suggestions.push({
            path,
            title: getPageTitle(path),
            description: getPageDescription(path),
            category: 'trending',
            icon: <ArrowTrendingUpIcon className="w-4 h-4" />,
            urgency: 'high',
            metadata: { users: count * 10, trending: true }
          })
        }
      })

      // Add favorites
      state.favoritePages.slice(0, 2).forEach(path => {
        if (!suggestions.find(s => s.path === path)) {
          suggestions.push({
            path,
            title: getPageTitle(path),
            description: getPageDescription(path),
            category: 'favorite',
            icon: <StarIcon className="w-4 h-4" />,
            urgency: 'low'
          })
        }
      })

      // Add premium recommendations based on current page
      if (state.currentPath === '/events') {
        suggestions.push({
          path: ROUTES.services,
          title: t('nav.premium-services', 'Premium Services'),
          description: t('nav.premium-services-desc', 'Exclusive services for Portuguese speakers'),
          category: 'recommended',
          icon: <SparklesIcon className="w-4 h-4" />,
          urgency: 'high',
          metadata: { premium: true, new: true }
        })
      }

      if (state.currentPath === '/community') {
        suggestions.push({
          path: ROUTES.matches,
          title: t('nav.find-match', 'Find Your Match'),
          description: t('nav.find-match-desc', 'Connect with Portuguese speakers'),
          category: 'recommended',
          icon: <UserGroupIcon className="w-4 h-4" />,
          urgency: 'medium',
          metadata: { new: true }
        })
      }

      return suggestions.slice(0, maxSuggestions)
    }

    setSuggestions(generateSuggestions())
  }, [state.currentPath, state.favoritePages, maxSuggestions])

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      [ROUTES.events]: t('nav.events', 'Events'),
      [ROUTES.community]: t('nav.community', 'Community'),
      [ROUTES.services]: t('nav.services', 'Premium Services'),
      [ROUTES.transport]: t('nav.transport', 'Transport'),
      [ROUTES.londonTours]: t('nav.london-tours', 'London Tours'),
      [ROUTES.businessNetworking]: t('nav.business-networking', 'Business Networking'),
      [ROUTES.matches]: t('nav.matches', 'Find Your Match'),
      [ROUTES.tv]: t('nav.tv', 'Live TV'),
      [ROUTES.live]: t('nav.live', 'Streaming Income'),
      [ROUTES.students]: t('nav.students', 'Students'),
      [ROUTES.pricing]: t('nav.pricing', 'Pricing')
    }
    return titles[path] || path.split('/').pop()?.replace('-', ' ') || 'Page'
  }

  const getPageDescription = (path: string): string => {
    const descriptions: Record<string, string> = {
      [ROUTES.events]: t('nav.events-desc', 'Portuguese community events in London'),
      [ROUTES.community]: t('nav.community-desc', 'Connect with Portuguese speakers'),
      [ROUTES.services]: t('nav.services-desc', 'Exclusive Portuguese services'),
      [ROUTES.transport]: t('nav.transport-desc', 'Portuguese-speaking drivers'),
      [ROUTES.londonTours]: t('nav.tours-desc', 'Portuguese-guided London tours'),
      [ROUTES.businessNetworking]: t('nav.networking-desc', 'Professional Portuguese network'),
      [ROUTES.matches]: t('nav.matches-desc', 'Find compatible Portuguese speakers'),
      [ROUTES.tv]: t('nav.tv-desc', 'Portuguese content and shows'),
      [ROUTES.live]: t('nav.live-desc', 'Monetize your Portuguese content'),
      [ROUTES.students]: t('nav.students-desc', 'Portuguese students in UK'),
      [ROUTES.pricing]: t('nav.pricing-desc', 'Membership plans')
    }
    return descriptions[path] || 'Explore this page'
  }

  const getPageIcon = (path: string): React.ReactNode => {
    if (path.includes('events')) return <span className="text-primary-500">🎉</span>
    if (path.includes('community')) return <span className="text-secondary-500">👥</span>
    if (path.includes('services')) return <span className="text-premium-500">✨</span>
    if (path.includes('transport')) return <span className="text-secondary-500">🚗</span>
    if (path.includes('tours')) return <span className="text-secondary-500">🏛️</span>
    if (path.includes('matches')) return <span className="text-action-500">💝</span>
    if (path.includes('tv')) return <span className="text-purple-500">📺</span>
    if (path.includes('live')) return <span className="text-green-500">💰</span>
    if (path.includes('students')) return <span className="text-blue-500">🎓</span>
    return <ArrowTopRightOnSquareIcon className="w-4 h-4" />
  }

  const handleSuggestionClick = (suggestion: NavigationSuggestion) => {
    addToJourney({
      path: suggestion.path,
      userAction: 'click',
      referrer: state.currentPath
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trending': return 'from-red-400 to-orange-400'
      case 'recommended': return 'from-premium-400 to-secondary-400'
      case 'favorite': return 'from-yellow-400 to-amber-400'
      case 'related': return 'from-primary-400 to-secondary-400'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory)

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {suggestions.slice(0, 3).map((suggestion, index) => (
          <motion.a
            key={suggestion.path}
            href={suggestion.path}
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
            onClick={() => handleSuggestionClick(suggestion)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {suggestion.title}
          </motion.a>
        ))}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-premium-500" />
          {t('navigation.suggestions', 'Suggested for You')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSuggestions.map((suggestion, index) => (
            <motion.a
              key={suggestion.path}
              href={suggestion.path}
              className="group p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300"
              onClick={() => handleSuggestionClick(suggestion)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center transition-colors">
                  {suggestion.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                    {suggestion.title}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    {suggestion.description}
                  </p>
                  {suggestion.metadata && (
                    <div className="flex items-center gap-2 mt-1">
                      {suggestion.metadata.trending && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          🔥 Trending
                        </span>
                      )}
                      {suggestion.metadata.new && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          ✨ New
                        </span>
                      )}
                      {suggestion.metadata.premium && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-premium-100 text-premium-700">
                          👑 Premium
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    )
  }

  // Floating variant (default)
  return (
    <motion.div
      className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <motion.div
        className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden transition-all duration-500 ${
          isExpanded ? 'w-80' : 'w-12'
        }`}
        whileHover={{ scale: isExpanded ? 1 : 1.05 }}
      >
        {!isExpanded ? (
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 flex items-center justify-center text-premium-600 hover:text-premium-700 hover:bg-premium-50 transition-all duration-300"
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <SparklesIcon className="w-5 h-5" />
          </motion.button>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-premium-500" />
                {t('navigation.smart-suggestions', 'Smart Suggestions')}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>

            {showAnalytics && (
              <div className="mb-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Your Journey</div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {state.userJourney.length} pages
                  </span>
                  <span className="flex items-center gap-1">
                    <BookmarkIcon className="w-3 h-3" />
                    {state.favoritePages.length} saved
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {filteredSuggestions.map((suggestion, index) => (
                <motion.a
                  key={suggestion.path}
                  href={suggestion.path}
                  className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  onClick={() => handleSuggestionClick(suggestion)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-r ${getCategoryColor(suggestion.category)} flex items-center justify-center text-white text-xs`}>
                      {suggestion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors text-sm">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors line-clamp-2">
                        {suggestion.description}
                      </p>
                      {suggestion.metadata?.users && (
                        <div className="text-xs text-gray-500 mt-1">
                          {suggestion.metadata.users}+ users
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Export specialized variants
export function InlineSmartNavigation(props: Omit<SmartNavProps, 'variant'>) {
  return <SmartNavigation {...props} variant="inline" />
}

export function MinimalSmartNavigation(props: Omit<SmartNavProps, 'variant'>) {
  return <SmartNavigation {...props} variant="minimal" />
}

export function FloatingSmartNavigation(props: Omit<SmartNavProps, 'variant'>) {
  return <SmartNavigation {...props} variant="floating" />
}