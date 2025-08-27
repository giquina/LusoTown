'use client'

import React, { useState, useEffect, useCallback, useRef, KeyboardEvent, memo, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  WifiIcon,
  CloudIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'
import { usePortugueseBundleOptimization } from '@/utils/portuguese-bundle-optimizer'
import logger from '@/utils/logger'
import { EnhancedMobileGestures, usePortugueseGestures } from '../EnhancedMobileGestures'

/**
 * Base interface for carousel items - all items must extend this
 */
export interface LusophoneCarouselItem {
  id: string
  title: {
    en: string
    pt: string
  }
  description?: {
    en: string
    pt: string
  }
  image?: string
  flagEmoji?: string
  countries?: string[]
  category?: string
  priority?: number
}

/**
 * Weekend Events carousel item
 */
export interface WeekendEventItem extends LusophoneCarouselItem {
  date: string
  time: string
  location: string
  price: number
  attendees: number
  maxAttendees: number
  tags: string[]
}

/**
 * PALOP Heritage carousel item
 */
export interface PALOPHeritageItem extends LusophoneCarouselItem {
  country: 'Angola' | 'Cape Verde' | 'Mozambique' | 'Guinea-Bissau' | 'São Tomé and Príncipe' | 'East Timor'
  heritage: {
    music: string[]
    traditions: string[]
    cuisine: string[]
  }
  businessCount: number
}

/**
 * Weekly Discovery carousel item
 */
export interface WeeklyDiscoveryItem extends LusophoneCarouselItem {
  discoveryType: 'restaurant' | 'event' | 'business' | 'cultural-site'
  location: {
    name: string
    area: string
  }
  featured: boolean
  rating?: number
}

/**
 * Cultural Celebration carousel item
 */
export interface CulturalCelebrationItem extends LusophoneCarouselItem {
  celebrationType: 'festival' | 'independence' | 'cultural' | 'religious' | 'music'
  period: {
    en: string
    pt: string
  }
  significance: {
    en: string
    pt: string
  }
  traditionalElements: string[]
}

/**
 * Union type for all possible carousel items
 */
export type CarouselItemType = WeekendEventItem | PALOPHeritageItem | WeeklyDiscoveryItem | CulturalCelebrationItem | LusophoneCarouselItem

/**
 * Responsive breakpoint configuration
 */
interface ResponsiveConfig {
  mobile: {
    itemsPerView: number
    spacing: number
  }
  tablet: {
    itemsPerView: number
    spacing: number
  }
  desktop: {
    itemsPerView: number
    spacing: number
  }
}

/**
 * Mobile optimization settings
 */
interface MobileSettings {
  enableSwipeGestures: boolean
  enableHapticFeedback: boolean
  enableMomentumScrolling: boolean
  enablePullToRefresh: boolean
  touchThreshold: number
  swipeVelocityThreshold: number
  enableLazyLoading: boolean
  preloadDistance: number
}

/**
 * PWA features configuration
 */
interface PWASettings {
  enableOfflineMode: boolean
  enablePushNotifications: boolean
  enableBackgroundSync: boolean
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate'
  offlineQueueLimit: number
}

/**
 * Performance monitoring
 */
interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionLatency: number
  memoryUsage: number
  networkStatus: 'online' | 'offline' | 'slow'
}

/**
 * Main carousel component props
 */
interface LusophoneCarouselProps<T extends CarouselItemType> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  title?: {
    en: string
    pt: string
  }
  subtitle?: {
    en: string
    pt: string
  }
  responsive?: ResponsiveConfig
  autoAdvance?: boolean
  autoAdvanceInterval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
  onItemClick?: (item: T, index: number) => void
  loading?: boolean
  emptyStateMessage?: {
    en: string
    pt: string
  }
  // Enhanced mobile features
  mobileSettings?: Partial<MobileSettings>
  pwaSettings?: Partial<PWASettings>
  onSwipeGesture?: (direction: 'left' | 'right', item: T) => void
  onPullToRefresh?: () => Promise<void>
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void
  enablePortugueseGestures?: boolean
  enableAccessibilityAnnouncements?: boolean
}

/**
 * Default responsive configuration
 */
const DEFAULT_RESPONSIVE: ResponsiveConfig = {
  mobile: {
    itemsPerView: 1,
    spacing: 16
  },
  tablet: {
    itemsPerView: 2,
    spacing: 20
  },
  desktop: {
    itemsPerView: 3,
    spacing: 24
  }
}

/**
 * Default mobile settings optimized for Portuguese-speaking community
 */
const DEFAULT_MOBILE_SETTINGS: MobileSettings = {
  enableSwipeGestures: true,
  enableHapticFeedback: false,
  enableMomentumScrolling: true,
  enablePullToRefresh: true,
  touchThreshold: 44, // WCAG 2.1 AA minimum touch target
  swipeVelocityThreshold: 0.3,
  enableLazyLoading: true,
  preloadDistance: 2 // Preload 2 items ahead
}

/**
 * Default PWA settings for offline Portuguese cultural content
 */
const DEFAULT_PWA_SETTINGS: PWASettings = {
  enableOfflineMode: true,
  enablePushNotifications: true,
  enableBackgroundSync: true,
  cacheStrategy: 'stale-while-revalidate',
  offlineQueueLimit: 50
}

/**
 * Custom hook for responsive configuration
 */
function useResponsive(responsive: ResponsiveConfig) {
  const [currentConfig, setCurrentConfig] = useState(responsive.mobile)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth
      
      if (width >= 1024) {
        setCurrentConfig(responsive.desktop)
        setScreenSize('desktop')
      } else if (width >= 768) {
        setCurrentConfig(responsive.tablet)
        setScreenSize('tablet')
      } else {
        setCurrentConfig(responsive.mobile)
        setScreenSize('mobile')
      }
    }

    updateConfig()
    window.addEventListener('resize', updateConfig)
    
    return () => window.removeEventListener('resize', updateConfig)
  }, [responsive])

  return { currentConfig, screenSize }
}

/**
 * Custom hook for mobile performance monitoring
 */
function useMobilePerformance(onUpdate?: (metrics: PerformanceMetrics) => void) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionLatency: 0,
    memoryUsage: 0,
    networkStatus: 'online'
  })

  useEffect(() => {
    const startTime = performance.now()
    
    // Network status monitoring
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      let status: 'online' | 'offline' | 'slow' = navigator.onLine ? 'online' : 'offline'
      
      if (connection && connection.effectiveType) {
        if (['slow-2g', '2g'].includes(connection.effectiveType)) {
          status = 'slow'
        }
      }
      
      setMetrics(prev => ({ ...prev, networkStatus: status }))
    }

    // Memory usage monitoring
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMetrics(prev => ({ 
          ...prev, 
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
        }))
      }
    }

    // Load time measurement
    const updateLoadTime = () => {
      const loadTime = performance.now() - startTime
      setMetrics(prev => ({ ...prev, loadTime }))
    }

    updateNetworkStatus()
    updateMemoryUsage()
    updateLoadTime()

    // Set up periodic updates
    const interval = setInterval(() => {
      updateMemoryUsage()
      updateNetworkStatus()
    }, 5000)

    // Cleanup
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    onUpdate?.(metrics)
  }, [metrics, onUpdate])

  return metrics
}

/**
 * Custom hook for PWA features
 */
function usePWAFeatures(settings: PWASettings) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState<any>(null)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const installPWA = useCallback(async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const result = await installPrompt.userChoice
      setInstallPrompt(null)
      return result.outcome === 'accepted'
    }
    return false
  }, [installPrompt])

  return {
    isOffline,
    canInstall: !!installPrompt,
    installPWA
  }
}

/**
 * Custom hook for carousel navigation with mobile optimizations
 */
function useCarouselNavigation<T extends CarouselItemType>(
  items: T[],
  itemsPerView: number,
  autoAdvance: boolean = false,
  autoAdvanceInterval: number = 5000,
  mobileSettings?: Partial<MobileSettings>
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoAdvance)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Mobile momentum scrolling
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const settings = { ...DEFAULT_MOBILE_SETTINGS, ...mobileSettings }
  const maxIndex = Math.max(0, items.length - itemsPerView)

  const goToSlide = useCallback((index: number, withAnimation = true) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex))
    if (newIndex !== currentIndex) {
      setIsTransitioning(withAnimation)
      setCurrentIndex(newIndex)
      
      // Haptic feedback disabled for better UX
      // if (settings.enableHapticFeedback && 'vibrate' in navigator) {
      //   navigator.vibrate(10)
      // }
      
      if (withAnimation) {
        setTimeout(() => setIsTransitioning(false), 300)
      }
    }
  }, [currentIndex, maxIndex, settings.enableHapticFeedback])

  const goToNext = useCallback((withAnimation = true) => {
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
    goToSlide(nextIndex, withAnimation)
  }, [currentIndex, maxIndex, goToSlide])

  const goToPrevious = useCallback((withAnimation = true) => {
    const prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
    goToSlide(prevIndex, withAnimation)
  }, [currentIndex, maxIndex, goToSlide])

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  // Auto-advance logic
  useEffect(() => {
    if (isPlaying && items.length > itemsPerView) {
      intervalRef.current = setInterval(() => goToNext(true), autoAdvanceInterval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, items.length, itemsPerView, goToNext, autoAdvanceInterval])

  // Reset current index if items change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0)
    }
  }, [items.length, maxIndex, currentIndex])

  return {
    currentIndex,
    isPlaying,
    isTransitioning,
    goToSlide,
    goToNext,
    goToPrevious,
    togglePlay,
    maxIndex,
    x,
    containerRef
  }
}

/**
 * Loading skeleton component
 */
function CarouselSkeleton({ itemsPerView }: { itemsPerView: number }) {
  return (
    <div className="grid gap-6 animate-pulse" style={{
      gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`
    }}>
      {Array.from({ length: itemsPerView }).map((_, index) => (
        <div key={index} className="bg-gray-200 rounded-xl h-64"></div>
      ))}
    </div>
  )
}

/**
 * Empty state component
 */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">🏛️</span>
      </div>
      <p className="text-gray-600 max-w-md">{message}</p>
    </div>
  )
}

/**
 * Main LusophoneCarousel Component with Enhanced Mobile Features
 */
const LusophoneCarousel = memo(<T extends CarouselItemType>({
  items,
  renderItem,
  title,
  subtitle,
  responsive = DEFAULT_RESPONSIVE,
  autoAdvance = false,
  autoAdvanceInterval = 5000,
  showControls = true,
  showDots = true,
  className = '',
  onItemClick,
  loading = false,
  emptyStateMessage,
  // Enhanced mobile features
  mobileSettings,
  pwaSettings,
  onSwipeGesture,
  onPullToRefresh,
  onPerformanceUpdate,
  enablePortugueseGestures = true,
  enableAccessibilityAnnouncements = true
}: LusophoneCarouselProps<T>) => {
  const { language, t } = useLanguage()
  const { stats, loadBundle } = usePortugueseBundleOptimization()
  const { currentConfig, screenSize } = useResponsive(responsive)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const controls = useAnimation()
  
  // Enhanced mobile settings
  const mobileConfig = { ...DEFAULT_MOBILE_SETTINGS, ...mobileSettings }
  const pwaConfig = { ...DEFAULT_PWA_SETTINGS, ...pwaSettings }
  
  // Mobile performance monitoring
  const performanceMetrics = useMobilePerformance(onPerformanceUpdate)
  
  // PWA features
  const { isOffline, canInstall, installPWA } = usePWAFeatures(pwaConfig)
  
  // Portuguese gesture patterns
  const { detectCulturalPattern } = usePortugueseGestures()
  
  const {
    currentIndex,
    isPlaying,
    isTransitioning,
    goToSlide,
    goToNext,
    goToPrevious,
    togglePlay,
    maxIndex,
    x,
    containerRef
  } = useCarouselNavigation(items, currentConfig.itemsPerView, autoAdvance, autoAdvanceInterval, mobileConfig)
  
  // Pull to refresh state
  const [isPullingToRefresh, setIsPullingToRefresh] = useState(false)
  const pullDistance = useMotionValue(0)

  // Enhanced gesture handlers
  const handleSwipe = useCallback((gesture: any) => {
    const { direction, distance, velocity } = gesture
    
    if (velocity > mobileConfig.swipeVelocityThreshold && distance > mobileConfig.touchThreshold) {
      const currentItem = items[currentIndex]
      
      if (direction === 'left') {
        goToNext()
        onSwipeGesture?.('left', currentItem)
      } else if (direction === 'right') {
        goToPrevious()
        onSwipeGesture?.('right', currentItem)
      }
      
      // Detect Portuguese cultural gestures
      if (enablePortugueseGestures) {
        const culturalPattern = detectCulturalPattern(gesture)
        if (culturalPattern) {
          // Handle Portuguese cultural patterns
          announceAccessibility(t(`carousel.culturalGesture.${culturalPattern}`, `Detected ${culturalPattern} gesture`))
        }
      }
    }
  }, [goToNext, goToPrevious, onSwipeGesture, items, currentIndex, mobileConfig, enablePortugueseGestures, detectCulturalPattern, t])

  const handlePullToRefresh = useCallback(async () => {
    if (!onPullToRefresh || isPullingToRefresh) return
    
    setIsPullingToRefresh(true)
    try {
      await onPullToRefresh()
    } finally {
      setIsPullingToRefresh(false)
      animate(pullDistance, 0, { duration: 0.3 })
    }
  }, [onPullToRefresh, isPullingToRefresh, pullDistance])

  const handlePanStart = useCallback(() => {
    if (isPlaying) {
      togglePlay() // Pause auto-advance during interaction
    }
  }, [isPlaying, togglePlay])

  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (screenSize !== 'mobile') return
    
    const { offset, velocity } = info
    
    // Pull to refresh gesture (downward at top)
    if (mobileConfig.enablePullToRefresh && offset.y > 0 && currentIndex === 0) {
      const pullAmount = Math.min(offset.y * 0.5, 100)
      pullDistance.set(pullAmount)
      
      if (pullAmount > 60 && Math.abs(velocity.y) > 200) {
        handlePullToRefresh()
      }
    }
    
    // Horizontal swipe for navigation
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      const progress = offset.x / 200 // Normalize to -1 to 1
      x.set(offset.x * 0.5) // Damped movement
    }
  }, [screenSize, mobileConfig, currentIndex, pullDistance, handlePullToRefresh, x])

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    const { offset, velocity } = info
    
    // Snap back if not enough velocity/distance
    animate(x, 0, { duration: 0.3, ease: 'easeOut' })
    animate(pullDistance, 0, { duration: 0.3 })
    
    // Resume auto-advance if it was playing
    if (autoAdvance && !isPlaying) {
      setTimeout(() => togglePlay(), 1000)
    }
  }, [x, pullDistance, autoAdvance, isPlaying, togglePlay])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        announceAccessibility(t('carousel.navigation.previous', 'Previous item'))
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        announceAccessibility(t('carousel.navigation.next', 'Next item'))
        break
      case ' ':
        event.preventDefault()
        if (autoAdvance) {
          togglePlay()
          announceAccessibility(isPlaying ? t('carousel.paused', 'Carousel paused') : t('carousel.playing', 'Carousel playing'))
        }
        break
      case 'Home':
        event.preventDefault()
        goToSlide(0)
        announceAccessibility(t('carousel.navigation.first', 'First item'))
        break
      case 'End':
        event.preventDefault()
        goToSlide(maxIndex)
        announceAccessibility(t('carousel.navigation.last', 'Last item'))
        break
    }
  }, [goToPrevious, goToNext, togglePlay, goToSlide, maxIndex, autoAdvance, isPlaying, t])

  const handleItemClick = useCallback((item: T, index: number) => {
    onItemClick?.(item, index)
    announceAccessibility(t('carousel.itemSelected', `Selected ${item.title[language]}`))
  }, [onItemClick, t, language])

  // Accessibility announcements
  const announceAccessibility = useCallback((message: string) => {
    if (!enableAccessibilityAnnouncements) return
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.lang = language === 'pt' ? 'pt-PT' : 'en-GB'
      utterance.volume = 0.3
      speechSynthesis.speak(utterance)
    }
  }, [enableAccessibilityAnnouncements, language])

  // Calculate visible items
  const visibleItems = items.slice(currentIndex, currentIndex + currentConfig.itemsPerView)
  
  // Pad with items from beginning if needed (for smooth infinite scroll)
  while (visibleItems.length < currentConfig.itemsPerView && items.length > 0) {
    const remainingNeeded = currentConfig.itemsPerView - visibleItems.length
    const itemsToAdd = items.slice(0, remainingNeeded)
    visibleItems.push(...itemsToAdd)
  }

  if (loading) {
    return (
      <section className={`lusophone-carousel ${className}`}>
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {title[language]}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle[language]}
              </p>
            )}
          </div>
        )}
        <CarouselSkeleton itemsPerView={currentConfig.itemsPerView} />
      </section>
    )
  }

  if (items.length === 0) {
    const defaultEmptyMessage = {
      en: 'No items available at the moment. Check back soon for new content!',
      pt: 'Nenhum item disponível no momento. Volte em breve para novo conteúdo!'
    }
    const message = emptyStateMessage ? emptyStateMessage[language] : defaultEmptyMessage[language]
    
    return (
      <section className={`lusophone-carousel ${className}`}>
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {title[language]}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle[language]}
              </p>
            )}
          </div>
        )}
        <EmptyState message={message} />
      </section>
    )
  }

  const shouldShowNavigation = items.length > currentConfig.itemsPerView

  return (
    <section 
      className={`lusophone-carousel ${className} ${isOffline ? 'offline-mode' : ''}`}
      role="region"
      aria-label={title ? title[language] : t('carousel.defaultLabel', 'Content carousel')}
    >
      {/* PWA Status Bar */}
      {(isOffline || performanceMetrics.networkStatus === 'slow') && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-200 rounded-lg flex items-center gap-2">
          {isOffline ? (
            <>
              <WifiIcon className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                {t('carousel.offline', 'Offline mode - Cached Portuguese cultural content')}
              </span>
            </>
          ) : (
            <>
              <CloudIcon className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                {t('carousel.slowConnection', 'Slow connection - Portuguese content may load slowly')}
              </span>
            </>
          )}
          
          {canInstall && (
            <button
              onClick={installPWA}
              className="ml-auto text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              {t('carousel.installApp', 'Install App')}
            </button>
          )}
        </div>
      )}

      {/* Header with Performance Info */}
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {title[language]}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600">
              {subtitle[language]}
            </p>
          )}
          
          {/* Performance indicator for developers */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 mt-2">
              Load: {performanceMetrics.loadTime.toFixed(0)}ms | 
              Memory: {performanceMetrics.memoryUsage.toFixed(1)}MB |
              Network: {performanceMetrics.networkStatus}
            </div>
          )}
        </div>
      )}

      {/* Pull to Refresh Indicator */}
      {mobileConfig.enablePullToRefresh && screenSize === 'mobile' && (
        <motion.div
          style={{ y: pullDistance }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-30"
        >
          <div className="bg-white rounded-full p-2 shadow-lg border">
            {isPullingToRefresh ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-4 h-4 text-blue-500">↓</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Enhanced Carousel Container */}
      <EnhancedMobileGestures
        onSwipe={handleSwipe}
        onTap={(point) => {
          // Handle tap on empty areas
          if (screenSize === 'mobile') {
            announceAccessibility(t('carousel.tapped', 'Carousel tapped'))
          }
        }}
        enablePortugueseGestures={enablePortugueseGestures}
        enableHapticFeedback={mobileConfig.enableHapticFeedback}
        enableVoiceAnnouncements={enableAccessibilityAnnouncements && language === 'pt'}
        className="relative"
        disabled={loading || items.length === 0}
      >
        <motion.div
          className="relative"
          drag={screenSize === 'mobile' ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handlePanStart}
          onDrag={handlePan}
          onDragEnd={handlePanEnd}
          dragElastic={0.1}
          dragMomentum={mobileConfig.enableMomentumScrolling}
        >
          {/* Enhanced Navigation Controls with Mobile Touch Targets */}
          {shouldShowNavigation && showControls && (
            <>
              <button
                onClick={goToPrevious}
                className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 
                           bg-white/90 hover:bg-white shadow-lg hover:shadow-xl 
                           ${screenSize === 'mobile' ? 'w-11 h-11' : 'w-12 h-12'} 
                           rounded-full flex items-center justify-center
                           border border-primary-200 hover:border-primary-300
                           transition-all duration-300 group touch-manipulation
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${isTransitioning ? 'opacity-50' : ''}`}
                aria-label={t('carousel.previous', 'Previous Portuguese cultural items')}
                disabled={currentIndex === 0 && !autoAdvance}
                style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
              >
                <ChevronLeftIcon className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-primary-600 group-hover:text-primary-800 transition-colors`} />
              </button>

              <button
                onClick={goToNext}
                className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                           bg-white/90 hover:bg-white shadow-lg hover:shadow-xl
                           ${screenSize === 'mobile' ? 'w-11 h-11' : 'w-12 h-12'}
                           rounded-full flex items-center justify-center
                           border border-primary-200 hover:border-primary-300
                           transition-all duration-300 group touch-manipulation
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${isTransitioning ? 'opacity-50' : ''}`}
                aria-label={t('carousel.next', 'Next Portuguese cultural items')}
                disabled={currentIndex >= maxIndex && !autoAdvance}
                style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
              >
                <ChevronRightIcon className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-primary-600 group-hover:text-primary-800 transition-colors`} />
              </button>

              {/* Auto-advance toggle - Hidden on mobile when space is limited */}
              {autoAdvance && screenSize !== 'mobile' && (
                <button
                  onClick={togglePlay}
                  className="absolute right-20 top-1/2 -translate-y-1/2 z-20
                             bg-white/90 hover:bg-white shadow-lg hover:shadow-xl
                             w-12 h-12 rounded-full flex items-center justify-center
                             border border-primary-200 hover:border-primary-300
                             transition-all duration-300 group touch-manipulation
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={isPlaying ? t('carousel.pause', 'Pause Portuguese cultural carousel') : t('carousel.play', 'Play Portuguese cultural carousel')}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                  )}
                </button>
              )}
            </>
          )}

          {/* Enhanced Carousel Content with Lazy Loading */}
          <div
            ref={carouselRef}
            className={`overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-gold-50 
                       ${screenSize === 'mobile' ? 'p-4' : 'p-6'} 
                       ${isTransitioning ? 'pointer-events-none' : ''}`}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="group"
            aria-label={t('carousel.content', 'Portuguese cultural carousel content')}
            style={{ touchAction: 'pan-x pinch-zoom' }}
          >
            {/* Mobile swipe hint */}
            {screenSize === 'mobile' && mobileConfig.enableSwipeGestures && currentIndex === 0 && (
              <div className="absolute top-4 right-4 z-10 bg-black/10 backdrop-blur-sm rounded-full p-2">
                <span className="text-xs text-gray-600">← →</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ 
                  opacity: 0, 
                  x: screenSize === 'mobile' ? 30 : 50,
                  scale: screenSize === 'mobile' ? 0.95 : 1
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  x: screenSize === 'mobile' ? -30 : -50,
                  scale: screenSize === 'mobile' ? 0.95 : 1
                }}
                transition={{ 
                  duration: screenSize === 'mobile' ? 0.25 : 0.3, 
                  ease: screenSize === 'mobile' ? 'easeInOut' : [0.4, 0, 0.2, 1]
                }}
                className="grid gap-4 md:gap-6"
                style={{
                  gridTemplateColumns: `repeat(${currentConfig.itemsPerView}, 1fr)`,
                  minHeight: screenSize === 'mobile' ? '200px' : 'auto'
                }}
              >
                {visibleItems.map((item, index) => {
                  const globalIndex = currentIndex + index
                  const shouldLazyLoad = mobileConfig.enableLazyLoading && 
                    Math.abs(globalIndex - currentIndex) > mobileConfig.preloadDistance

                  return (
                    <motion.div
                      key={`${item.id}-${currentIndex}-${index}`}
                      initial={{ opacity: 0, y: screenSize === 'mobile' ? 10 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: screenSize === 'mobile' ? 0.2 : 0.3, 
                        delay: index * (screenSize === 'mobile' ? 0.05 : 0.1),
                        ease: "easeOut"
                      }}
                      whileHover={screenSize !== 'mobile' ? { y: -4, scale: 1.02 } : undefined}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer touch-manipulation
                                 ${screenSize === 'mobile' ? 'active:scale-95' : ''}
                                 ${shouldLazyLoad ? 'loading-placeholder' : ''}`}
                      onClick={() => handleItemClick(item, globalIndex)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleItemClick(item, globalIndex)
                        }
                      }}
                      aria-label={`${item.title[language]} - ${t('carousel.item', 'Portuguese cultural item')} ${globalIndex + 1} of ${items.length}`}
                      style={{ 
                        minHeight: screenSize === 'mobile' ? '160px' : '200px',
                        minWidth: screenSize === 'mobile' ? '280px' : '300px'
                      }}
                    >
                      {shouldLazyLoad ? (
                        // Lazy loading placeholder
                        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                          <div className="text-gray-400">
                            {t('carousel.loading', 'Loading Portuguese content...')}
                          </div>
                        </div>
                      ) : (
                        renderItem(item, globalIndex)
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* Touch gesture hints for mobile */}
            {screenSize === 'mobile' && mobileConfig.enableSwipeGestures && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-75"></div>
                <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-75"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50"></div>
              </div>
            )}
          </div>

          {/* Enhanced Mobile-Friendly Dot Indicators */}
          {shouldShowNavigation && showDots && (
            <div className={`flex justify-center mt-6 ${screenSize === 'mobile' ? 'space-x-3' : 'space-x-2'}`}>
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${screenSize === 'mobile' ? 'w-4 h-4' : 'w-3 h-3'} 
                             rounded-full transition-all duration-300 touch-manipulation
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                             ${index === currentIndex 
                               ? 'bg-primary-600 scale-125 shadow-lg' 
                               : 'bg-primary-300 hover:bg-primary-400 hover:scale-110'}`}
                  aria-label={t('carousel.goToSlide', `Go to Portuguese cultural slide ${index + 1} of ${maxIndex + 1}`, { slide: index + 1, total: maxIndex + 1 })}
                  style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
                />
              ))}
              
              {/* Progress bar for mobile */}
              {screenSize === 'mobile' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      </EnhancedMobileGestures>

      {/* Mobile-specific auto-advance control */}
      {autoAdvance && screenSize === 'mobile' && (
        <div className="flex justify-center mt-4">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 bg-white border border-primary-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ minHeight: '44px' }}
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 text-primary-600" />
            ) : (
              <PlayIcon className="w-4 h-4 text-primary-600" />
            )}
            <span className="text-sm text-primary-700">
              {isPlaying ? t('carousel.pause', 'Pause') : t('carousel.play', 'Play')}
            </span>
          </button>
        </div>
      )}

      {/* Enhanced Screen Reader Status with Performance Info */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {t('carousel.status', `Showing Portuguese cultural items ${currentIndex + 1} to ${Math.min(currentIndex + currentConfig.itemsPerView, items.length)} of ${items.length}. ${isOffline ? 'Offline mode active.' : ''} ${performanceMetrics.networkStatus === 'slow' ? 'Slow connection detected.' : ''}`, {
          start: currentIndex + 1,
          end: Math.min(currentIndex + currentConfig.itemsPerView, items.length),
          total: items.length,
          networkStatus: performanceMetrics.networkStatus
        })}
      </div>

      {/* Development Performance Monitor */}
      {process.env.NODE_ENV === 'development' && onPerformanceUpdate && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <div>Load: {performanceMetrics.loadTime.toFixed(0)}ms</div>
          <div>Memory: {performanceMetrics.memoryUsage.toFixed(1)}MB</div>
          <div>Network: {performanceMetrics.networkStatus}</div>
          <div>Mobile Settings: Swipe={mobileConfig.enableSwipeGestures.toString()}, Haptic={mobileConfig.enableHapticFeedback.toString()}</div>
        </div>
      )}
    </section>
  )
})

export default LusophoneCarousel

/**
 * Export enhanced utility functions and types for external use
 */
export {
  type WeekendEventItem,
  type PALOPHeritageItem,
  type WeeklyDiscoveryItem,
  type CulturalCelebrationItem,
  type CarouselItemType,
  type ResponsiveConfig,
  type MobileSettings,
  type PWASettings,
  type PerformanceMetrics,
  DEFAULT_RESPONSIVE,
  DEFAULT_MOBILE_SETTINGS,
  DEFAULT_PWA_SETTINGS,
  useCarouselNavigation,
  useResponsive,
  useMobilePerformance,
  usePWAFeatures
}