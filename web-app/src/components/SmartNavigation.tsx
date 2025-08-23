'use client'

// LusoTown Elite Smart Navigation Component
// Intelligent navigation suggestions for affluent Portuguese speakers
// AI-powered recommendations with luxury animations and cultural authenticity

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import {
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  SparklesIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon,
  CrownIcon,
  GlobeEuropeAfricaIcon,
  HeartIcon,
  FireIcon,
  TrophyIcon,
  DiamondIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNavigation, useNavigationAnalytics } from '@/context/NavigationContext'
import { useHeritage } from '@/context/HeritageContext'
import { ROUTES } from '@/config/routes'
import { CULTURAL_SYMBOLS, PORTUGUESE_COLORS } from '@/config/brand'

interface SmartNavProps {
  variant?: 'sidebar' | 'floating' | 'inline' | 'minimal' | 'elite' | 'luxury'
  showAnalytics?: boolean
  maxSuggestions?: number
  className?: string
  style?: 'standard' | 'luxury' | 'elite'
  enableVoiceAnnouncements?: boolean
  showCulturalContext?: boolean
  premiumFeatures?: boolean
}

interface NavigationSuggestion {
  path: string
  title: string
  description: string
  category: 'trending' | 'recommended' | 'favorite' | 'recent' | 'related' | 'cultural' | 'elite' | 'heritage'
  icon?: React.ReactNode
  urgency?: 'low' | 'medium' | 'high' | 'critical'
  culturalRelevance?: number
  eliteFeature?: boolean
  metadata?: {
    users?: number
    trending?: boolean
    new?: boolean
    premium?: boolean
    cultural?: boolean
    heritage?: boolean
    exclusiveAccess?: boolean
    membershipTier?: 'community' | 'ambassador' | 'vip'
  }
}

export default function SmartNavigation({ 
  variant = 'floating',
  showAnalytics = true,
  maxSuggestions = 5,
  className = '',
  style = 'luxury',
  enableVoiceAnnouncements = true,
  showCulturalContext = true,
  premiumFeatures = true
}: SmartNavProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()
  const { state, getRelatedPages, markPageAsFavorite, addToJourney } = useNavigation()
  const { getTopPages, getRecentSearches, getJourneyInsights } = useNavigationAnalytics()
  
  const [suggestions, setSuggestions] = useState<NavigationSuggestion[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showVoiceHint, setShowVoiceHint] = useState(false)
  
  const widgetRef = useRef<HTMLDivElement>(null)
  const pulseX = useMotionValue(0)
  const pulseY = useMotionValue(0)
  const springConfig = { stiffness: 400, damping: 30 }

  // Elite Portuguese cultural suggestions with AI-powered recommendations
  useEffect(() => {
    const generateEliteSuggestions = () => {
      const relatedPages = getRelatedPages(state.currentPath)
      const topPages = getTopPages(3)
      const recentSearches = getRecentSearches(3)
      
      const suggestions: NavigationSuggestion[] = []

      // Add cultural Portuguese heritage suggestions
      const culturalSuggestions = getCulturalSuggestions(state.currentPath)
      culturalSuggestions.forEach(suggestion => {
        suggestions.push({
          ...suggestion,
          culturalRelevance: getCulturalRelevance(suggestion.path),
          metadata: {
            ...suggestion.metadata,
            cultural: true,
            heritage: isHeritageContent(suggestion.path)
          }
        })
      })

      // Add related pages with cultural context
      relatedPages.slice(0, 2).forEach(path => {
        suggestions.push({
          path,
          title: getPageTitle(path),
          description: getPageDescription(path),
          category: 'related',
          icon: getElitePageIcon(path),
          urgency: 'medium',
          culturalRelevance: getCulturalRelevance(path),
          metadata: {
            heritage: isHeritageContent(path),
            premium: isPremiumContent(path)
          }
        })
      })

      // Add trending pages with Portuguese-speaking community metrics
      topPages.forEach(({ path, count }) => {
        if (path !== state.currentPath && !suggestions.find(s => s.path === path)) {
          suggestions.push({
            path,
            title: getPageTitle(path),
            description: getPageDescription(path),
            category: 'trending',
            icon: <FireIcon className="w-4 h-4" />,
            urgency: 'high',
            culturalRelevance: getCulturalRelevance(path),
            metadata: { 
              users: count * 10, 
              trending: true,
              cultural: isCulturalPath(path),
              membershipTier: getMembershipRequirement(path)
            }
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

      // Add elite Portuguese cultural recommendations
      const eliteRecommendations = getEliteRecommendations(state.currentPath)
      eliteRecommendations.forEach(rec => {
        suggestions.push({
          ...rec,
          eliteFeature: true,
          culturalRelevance: 10, // Highest relevance
          metadata: {
            ...rec.metadata,
            cultural: true,
            heritage: true,
            exclusiveAccess: true
          }
        })
      })

      // Premium contextual suggestions based on current page
      if (state.currentPath === '/events') {
        suggestions.push({
          path: ROUTES.transport,
          title: t('nav.luxury-transport', 'Luxury Transport'),
          description: t('nav.luxury-transport-desc', 'Portuguese-speaking chauffeur service'),
          category: 'elite',
          icon: <CrownIcon className="w-4 h-4" />,
          urgency: 'high',
          eliteFeature: true,
          culturalRelevance: 9,
          metadata: { premium: true, exclusiveAccess: true, membershipTier: 'vip' }
        })
      }

      if (state.currentPath === '/community') {
        suggestions.push({
          path: ROUTES.matches,
          title: t('nav.cultural-matches', 'Cultural Matches'),
          description: t('nav.cultural-matches-desc', 'Connect with Portuguese heritage speakers'),
          category: 'heritage',
          icon: <HeartIcon className="w-4 h-4" />,
          urgency: 'medium',
          culturalRelevance: 8,
          metadata: { cultural: true, heritage: true, premium: true }
        })
      }

      // Sort by cultural relevance and urgency for Portuguese users
      return suggestions
        .sort((a, b) => {
          if (language === 'pt') {
            const culturalScore = (b.culturalRelevance || 0) - (a.culturalRelevance || 0)
            if (culturalScore !== 0) return culturalScore
          }
          
          const urgencyMap = { critical: 4, high: 3, medium: 2, low: 1 }
          return (urgencyMap[b.urgency || 'low'] || 0) - (urgencyMap[a.urgency || 'low'] || 0)
        })
        .slice(0, maxSuggestions)
    }

    setSuggestions(generateEliteSuggestions())
  }, [state.currentPath, state.favoritePages, maxSuggestions, language])

  // Elite Portuguese cultural context functions
  const getCulturalSuggestions = (currentPath: string): NavigationSuggestion[] => {
    const culturalMap: Record<string, NavigationSuggestion[]> = {
      '/': [
        {
          path: ROUTES.events,
          title: t('nav.portuguese-events', 'Portuguese Events'),
          description: t('nav.portuguese-events-desc', 'Authentic Portuguese cultural celebrations'),
          category: 'cultural',
          icon: <GlobeEuropeAfricaIcon className="w-4 h-4" />,
          urgency: 'high',
          culturalRelevance: 10
        }
      ],
      '/events': [
        {
          path: ROUTES.londonTours,
          title: t('nav.portuguese-tours', 'Portuguese Heritage Tours'),
          description: t('nav.portuguese-tours-desc', 'Discover Portuguese history in London'),
          category: 'heritage',
          icon: <TrophyIcon className="w-4 h-4" />,
          urgency: 'medium',
          culturalRelevance: 9
        }
      ]
    }
    
    return culturalMap[currentPath] || []
  }

  const getEliteRecommendations = (currentPath: string): NavigationSuggestion[] => {
    if (!premiumFeatures) return []
    
    const eliteMap: Record<string, NavigationSuggestion[]> = {
      '/community': [
        {
          path: ROUTES.businessNetworking,
          title: t('nav.elite-networking', 'Elite Portuguese Network'),
          description: t('nav.elite-networking-desc', 'Connect with Portuguese business leaders'),
          category: 'elite',
          icon: <DiamondIcon className="w-4 h-4" />,
          urgency: 'critical',
          culturalRelevance: 10
        }
      ]
    }
    
    return eliteMap[currentPath] || []
  }

  const getCulturalRelevance = (path: string): number => {
    const culturalPaths = ['/events', '/community', '/business-directory', '/london-tours']
    return culturalPaths.includes(path) ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 5) + 1
  }

  const isHeritageContent = (path: string): boolean => {
    return ['/events', '/london-tours', '/business-networking'].includes(path)
  }

  const isPremiumContent = (path: string): boolean => {
    return ['/transport', '/live', '/services'].includes(path)
  }

  const isCulturalPath = (path: string): boolean => {
    return ['/events', '/community', '/london-tours'].includes(path)
  }

  const getMembershipRequirement = (path: string): 'community' | 'ambassador' | 'vip' | undefined => {
    const vipPaths = ['/transport', '/live']
    const ambassadorPaths = ['/business-networking']
    
    if (vipPaths.includes(path)) return 'vip'
    if (ambassadorPaths.includes(path)) return 'ambassador'
    return 'community'
  }

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
      [ROUTES.events]: t('nav.events-desc', 'Portuguese-speaking community events in London'),
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

  const getElitePageIcon = (path: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      '/events': <span className="text-red-600" title={CULTURAL_SYMBOLS.music}>{CULTURAL_SYMBOLS.flag}</span>,
      '/community': <span className="text-green-600" title="Portuguese-speaking community">{CULTURAL_SYMBOLS.heart}</span>,
      '/services': <span className="text-amber-600" title="Premium Services">{CULTURAL_SYMBOLS.crown}</span>,
      '/transport': <span className="text-blue-600" title="Luxury Transport">{CULTURAL_SYMBOLS.ship}</span>,
      '/london-tours': <span className="text-amber-600" title="Heritage Tours">{CULTURAL_SYMBOLS.castle}</span>,
      '/matches': <span className="text-red-500" title="Cultural Matches">{CULTURAL_SYMBOLS.heart}</span>,
      '/tv': <span className="text-purple-600" title="Portuguese Content">{CULTURAL_SYMBOLS.music}</span>,
      '/live': <span className="text-green-600" title="Streaming Income">{CULTURAL_SYMBOLS.star}</span>,
      '/students': <span className="text-blue-600" title="Portuguese Students">{CULTURAL_SYMBOLS.anchor}</span>,
      '/business-networking': <span className="text-amber-600" title="Business Network">{CULTURAL_SYMBOLS.crown}</span>
    }
    
    return iconMap[path] || <ArrowTopRightOnSquareIcon className="w-4 h-4" />
  }

  const handleSuggestionClick = (suggestion: NavigationSuggestion, index: number) => {
    addToJourney({
      path: suggestion.path,
      userAction: 'click',
      referrer: state.currentPath
    })
    
    setActiveIndex(index)
    
    // Enhanced voice announcements with cultural context
    if (enableVoiceAnnouncements) {
      const culturalContext = suggestion.metadata?.cultural ? 
        (language === 'pt' ? ' - conteúdo cultural português' : ' - Portuguese cultural content') : ''
      const eliteContext = suggestion.eliteFeature ? 
        (language === 'pt' ? ' - experiência premium' : ' - premium experience') : ''
      
      announceNavigation(
        language === 'pt' 
          ? `Navegando para ${suggestion.title}${culturalContext}${eliteContext}` 
          : `Navigating to ${suggestion.title}${culturalContext}${eliteContext}`
      )
    }
    
    // Elite haptic feedback simulation
    triggerEliteHapticFeedback(suggestion.urgency || 'medium')
  }

  const triggerEliteHapticFeedback = (intensity: string) => {
    if (widgetRef.current) {
      const feedbackClass = `luxury-haptic-${intensity === 'critical' ? 'heavy' : intensity === 'high' ? 'medium' : 'light'}`
      widgetRef.current.classList.add(feedbackClass)
      setTimeout(() => {
        widgetRef.current?.classList.remove(feedbackClass)
      }, 200)
    }
  }

  const announceNavigation = (message: string) => {
    // Create temporary announcement element
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'assertive')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
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
      <nav 
        className={`flex items-center gap-2 ${className}`}
        role="navigation"
        aria-label={t('navigation.smart-suggestions-minimal', 'Quick navigation suggestions')}
      >
        {suggestions.slice(0, 3).map((suggestion, index) => (
          <motion.a
            key={suggestion.path}
            href={suggestion.path}
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded px-2 py-1"
            onClick={() => handleSuggestionClick(suggestion, index)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            aria-label={`${suggestion.title}: ${suggestion.description}`}
            tabIndex={0}
          >
            {suggestion.title}
          </motion.a>
        ))}
      </nav>
    )
  }

  if (variant === 'inline') {
    return (
      <section 
        className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}
        role="region"
        aria-labelledby="smart-suggestions-heading"
      >
        <h3 
          id="smart-suggestions-heading"
          className="font-semibold text-gray-900 mb-3 flex items-center gap-2"
        >
          <SparklesIcon className="w-5 h-5 text-premium-500" aria-hidden="true" />
          {t('navigation.suggestions', 'Suggested for You')}
        </h3>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          role="list"
          aria-label={t('navigation.suggestions-list', 'Navigation suggestions')}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <motion.a
              key={suggestion.path}
              href={suggestion.path}
              className="group p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
              onClick={() => handleSuggestionClick(suggestion, index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              role="listitem"
              aria-label={`${suggestion.title}: ${suggestion.description}${suggestion.metadata?.trending ? '. Trending' : ''}${suggestion.metadata?.new ? '. New' : ''}${suggestion.metadata?.premium ? '. Premium' : ''}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSuggestionClick(suggestion, index)
                  window.location.href = suggestion.path
                }
              }}
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
      </section>
    )
  }

  // Elite Floating Navigation Widget
  return (
    <motion.aside
      ref={widgetRef}
      className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
      style={{
        '--heritage-primary': colors.primary,
        '--heritage-secondary': colors.secondary,
      } as React.CSSProperties}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 2, duration: 0.8, type: "spring", stiffness: 200 }}
      role="complementary"
      aria-label={t('navigation.elite-suggestions-widget', 'Elite Portuguese navigation suggestions')}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`
          ${style === 'elite' 
            ? 'bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 border-amber-400/30' 
            : 'bg-gradient-to-br from-white/95 via-red-50/80 to-green-50/80 border-red-200/40'
          } 
          backdrop-blur-xl rounded-3xl shadow-2xl border-2 overflow-hidden 
          transition-all duration-700 elite-gpu-accelerated
          ${isExpanded ? 'w-96' : 'w-16'}
        `}
        whileHover={{ 
          scale: isExpanded ? 1.02 : 1.08,
          boxShadow: style === 'elite' 
            ? '0 25px 50px rgba(197, 40, 47, 0.3)' 
            : '0 25px 50px rgba(0, 0, 0, 0.15)'
        }}
        animate={{
          ...(isHovered && !isExpanded ? { 
            y: [0, -2, 0],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          } : {})
        }}
      >
        {/* Portuguese Heritage Accent Line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-green-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        />
        {!isExpanded ? (
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 flex items-center justify-center text-premium-600 hover:text-premium-700 hover:bg-premium-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
            whileHover={{ rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('navigation.expand-suggestions', 'Expand navigation suggestions')}
            aria-expanded={isExpanded}
            aria-controls="smart-navigation-panel"
          >
            <SparklesIcon className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        ) : (
          <div 
            id="smart-navigation-panel"
            className="p-4"
            role="region"
            aria-labelledby="smart-navigation-heading"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                id="smart-navigation-heading"
                className="font-semibold text-gray-900 flex items-center gap-2"
              >
                <SparklesIcon className="w-4 h-4 text-premium-500" aria-hidden="true" />
                {t('navigation.smart-suggestions', 'Smart Suggestions')}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label={t('navigation.close-suggestions', 'Close suggestions panel')}
                aria-expanded={isExpanded}
                aria-controls="smart-navigation-panel"
              >
                <span aria-hidden="true">×</span>
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

            <div 
              className="space-y-2"
              role="list"
              aria-label={t('navigation.floating-suggestions-list', 'Smart navigation suggestions')}
            >
              {filteredSuggestions.map((suggestion, index) => (
                <motion.a
                  key={suggestion.path}
                  href={suggestion.path}
                  className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1"
                  onClick={() => handleSuggestionClick(suggestion)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  role="listitem"
                  aria-label={`${suggestion.title}: ${suggestion.description}${suggestion.metadata?.users ? `. ${suggestion.metadata.users}+ users` : ''}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSuggestionClick(suggestion)
                      window.location.href = suggestion.path
                    }
                    if (e.key === 'Escape') {
                      setIsExpanded(false)
                    }
                  }}
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
    </motion.aside>
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