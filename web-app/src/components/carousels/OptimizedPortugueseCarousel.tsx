'use client'

import React, { useState, useEffect, useCallback, useRef, memo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  WifiIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'
import { useCarouselPerformanceOptimization } from '@/hooks/useCarouselPerformanceOptimization'
import { usePortuguesePWAFeatures } from '@/hooks/usePortuguesePWAFeatures'
import { EnhancedMobileGestures } from '../EnhancedMobileGestures'
import logger from '@/utils/logger'

// Enhanced interfaces building on existing carousel types
interface OptimizedCarouselProps<T = any> {
  items: T[]
  renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode
  title?: {
    en: string
    pt: string
  }
  subtitle?: {
    en: string
    pt: string
  }
  className?: string
  autoAdvance?: boolean
  autoAdvanceInterval?: number
  showControls?: boolean
  showDots?: boolean
  onItemClick?: (item: T, index: number) => void
  loading?: boolean
  // Enhanced optimization props
  enablePerformanceOptimization?: boolean
  enablePortugueseCulturalOptimization?: boolean
  enableOfflineMode?: boolean
  optimizationLevel?: 'basic' | 'standard' | 'aggressive'
  contentType?: 'events' | 'businesses' | 'cultural' | 'mixed'
}

interface CarouselPerformanceStats {
  loadTime: number
  renderTime: number
  interactionLatency: number
  memoryUsage: number
  frameRate: number
  optimizationScore: number
}

const OptimizedPortugueseCarousel = memo(<T extends any>({
  items,
  renderItem,
  title,
  subtitle,
  className = '',
  autoAdvance = false,
  autoAdvanceInterval = 5000,
  showControls = true,
  showDots = true,
  onItemClick,
  loading = false,
  enablePerformanceOptimization = true,
  enablePortugueseCulturalOptimization = true,
  enableOfflineMode = true,
  optimizationLevel = 'standard',
  contentType = 'mixed'
}: OptimizedCarouselProps<T>) => {
  const { language, t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoAdvance)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [performanceStats, setPerformanceStats] = useState<CarouselPerformanceStats>({
    loadTime: 0,
    renderTime: 0,
    interactionLatency: 0,
    memoryUsage: 0,
    frameRate: 60,
    optimizationScore: 100
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const itemsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3
  const maxIndex = Math.max(0, items.length - itemsPerView)

  // Enhanced performance optimization hook
  const {
    metrics,
    optimizePortugueseImages,
    analyzePortugueseReadingPatterns,
    measureInteractionLatency,
    recordInteractionComplete,
    getOptimalAutoAdvanceTime,
    getOptimizationRecommendations
  } = useCarouselPerformanceOptimization({
    enableRealTimeMonitoring: enablePerformanceOptimization,
    enablePortugueseOptimizations: enablePortugueseCulturalOptimization,
    optimizationLevel
  })

  // PWA features hook
  const {
    offlineCapabilities,
    queueOfflineAction,
    backgroundSyncData,
    isFullyOfflineCapable
  } = usePortuguesePWAFeatures()

  // Dynamic auto-advance timing based on Portuguese reading patterns
  const dynamicAutoAdvanceTime = getOptimalAutoAdvanceTime(
    items[currentIndex]?.title?.[language]?.length || 100
  )

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enablePerformanceOptimization) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]))
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        })
      },
      {
        root: containerRef.current,
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    const itemElements = containerRef.current?.querySelectorAll('.carousel-item')
    itemElements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [items, enablePerformanceOptimization])

  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceOptimization) return

    const startTime = performance.now()
    
    const measurePerformance = () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      setPerformanceStats(prev => ({
        ...prev,
        loadTime,
        renderTime: metrics.renderTime,
        interactionLatency: metrics.interactionLatency,
        memoryUsage: metrics.memoryUsage,
        frameRate: metrics.frameRate,
        optimizationScore: Math.max(0, 100 - (metrics.memoryUsage / 2) - (loadTime / 10))
      }))
    }

    requestAnimationFrame(measurePerformance)
  }, [metrics, enablePerformanceOptimization])

  // Enhanced navigation with performance tracking
  const goToSlide = useCallback((index: number) => {
    measureInteractionLatency()
    
    const newIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(newIndex)
    
    // Analyze Portuguese reading patterns
    if (enablePortugueseCulturalOptimization) {
      const dwellTime = Date.now() - (window as any).lastSlideTime || 0
      analyzePortugueseReadingPatterns({
        scrollVelocity: Math.abs(newIndex - currentIndex),
        dwellTime,
        engagementScore: visibleItems.size > 0 ? 85 : 50
      })
    }
    
    ;(window as any).lastSlideTime = Date.now()
    recordInteractionComplete()
  }, [maxIndex, currentIndex, measureInteractionLatency, recordInteractionComplete, analyzePortugueseReadingPatterns, enablePortugueseCulturalOptimization, visibleItems.size])

  const goToNext = useCallback(() => goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1), [goToSlide, currentIndex, maxIndex])
  const goToPrevious = useCallback(() => goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1), [goToSlide, currentIndex, maxIndex])

  // Enhanced item click with offline support
  const handleItemClick = useCallback((item: T, index: number) => {
    measureInteractionLatency()
    
    if (offlineCapabilities.isOffline) {
      // Queue action for when back online
      queueOfflineAction({
        type: 'favorite-event',
        data: { itemId: (item as any).id, index }
      })
    }
    
    onItemClick?.(item, index)
    recordInteractionComplete()
  }, [measureInteractionLatency, recordInteractionComplete, offlineCapabilities.isOffline, queueOfflineAction, onItemClick])

  // Auto-advance with Portuguese timing optimization
  useEffect(() => {
    if (!isPlaying || items.length <= itemsPerView) return

    const interval = setInterval(() => {
      goToNext()
    }, dynamicAutoAdvanceTime)

    return () => clearInterval(interval)
  }, [isPlaying, items.length, itemsPerView, goToNext, dynamicAutoAdvanceTime])

  // PWA optimization recommendations
  const optimizationRecommendations = getOptimizationRecommendations()

  if (loading) {
    return (
      <div className={`optimized-carousel-loading ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${itemsPerView}, 1fr)` }}>
            {Array.from({ length: itemsPerView }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={`optimized-carousel-empty ${className}`}>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🏛️</span>
          </div>
          <p className="text-gray-600">
            {t('carousel.empty', 'No Portuguese cultural content available')}
          </p>
          {offlineCapabilities.isOffline && (
            <p className="text-sm text-yellow-600 mt-2">
              {t('carousel.offline', 'You are offline. Some content may be unavailable.')}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <section 
      className={`optimized-portuguese-carousel ${className} ${offlineCapabilities.isOffline ? 'offline-mode' : ''}`}
      role="region"
      aria-label={title ? title[language] : t('carousel.defaultLabel', 'Portuguese cultural carousel')}
    >
      {/* Performance and PWA Status Bar */}
      {enablePerformanceOptimization && (
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            {offlineCapabilities.isOffline ? (
              <div className="flex items-center gap-1 text-yellow-600">
                <WifiIcon className="w-4 h-4" />
                <span>{t('carousel.offline', 'Offline Mode')}</span>
              </div>
            ) : metrics.networkStatus === 'slow' ? (
              <div className="flex items-center gap-1 text-orange-600">
                <CloudIcon className="w-4 h-4" />
                <span>{t('carousel.slowConnection', 'Slow Connection')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-green-600">
                <BoltIcon className="w-4 h-4" />
                <span>{t('carousel.optimized', 'Optimized')}</span>
              </div>
            )}
            
            {window.innerWidth <= 768 && (
              <div className="flex items-center gap-1 text-blue-600">
                <DevicePhoneMobileIcon className="w-4 h-4" />
                <span>Mobile</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <span>Score: {Math.round(performanceStats.optimizationScore)}%</span>
          </div>
        </div>
      )}

      {/* Header */}
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
          
          {/* Performance indicator for development */}
          {process.env.NODE_ENV === 'development' && enablePerformanceOptimization && (
            <div className="text-xs text-gray-400 mt-2 space-x-4">
              <span>Load: {Math.round(performanceStats.loadTime)}ms</span>
              <span>Memory: {Math.round(performanceStats.memoryUsage)}MB</span>
              <span>FPS: {metrics.frameRate}</span>
              {optimizationRecommendations.length > 0 && (
                <span className="text-orange-500">
                  {optimizationRecommendations.length} optimizations available
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Enhanced Carousel Container with Portuguese Gestures */}
      <EnhancedMobileGestures
        onSwipe={(gesture) => {
          if (gesture.direction === 'left') goToNext()
          else if (gesture.direction === 'right') goToPrevious()
        }}
        enablePortugueseGestures={enablePortugueseCulturalOptimization}
        enableHapticFeedback={false}
        enableVoiceAnnouncements={language === 'pt'}
        className="relative"
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-gold-50 p-4 md:p-6"
        >
          {/* Navigation Controls */}
          {items.length > itemsPerView && showControls && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 
                           bg-white/90 hover:bg-white shadow-lg hover:shadow-xl 
                           w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center
                           border border-primary-200 hover:border-primary-300
                           transition-all duration-300 group touch-manipulation
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={t('carousel.previous', 'Previous Portuguese cultural items')}
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                           bg-white/90 hover:bg-white shadow-lg hover:shadow-xl
                           w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center
                           border border-primary-200 hover:border-primary-300
                           transition-all duration-300 group touch-manipulation
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={t('carousel.next', 'Next Portuguese cultural items')}
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              </button>
            </>
          )}

          {/* Enhanced Carousel Content with Lazy Loading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid gap-4 md:gap-6"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                minHeight: '200px'
              }}
            >
              {items.slice(currentIndex, currentIndex + itemsPerView).map((item, index) => {
                const globalIndex = currentIndex + index
                const isVisible = visibleItems.has(globalIndex)
                
                return (
                  <motion.div
                    key={`${(item as any).id || globalIndex}-${currentIndex}`}
                    data-index={globalIndex}
                    className="carousel-item cursor-pointer touch-manipulation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item, globalIndex)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${(item as any).title?.[language] || 'Portuguese cultural item'} - ${globalIndex + 1} of ${items.length}`}
                    style={{ minHeight: '160px' }}
                  >
                    <Suspense fallback={
                      <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {t('carousel.loading', 'Loading Portuguese content...')}
                        </span>
                      </div>
                    }>
                      {renderItem(item, globalIndex, isVisible)}
                    </Suspense>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Mobile swipe hint */}
          {window.innerWidth <= 768 && currentIndex === 0 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-75"></div>
              <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-75"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50"></div>
            </div>
          )}
        </div>

        {/* Enhanced Dot Indicators */}
        {items.length > itemsPerView && showDots && (
          <div className="flex justify-center mt-6 space-x-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 touch-manipulation
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${index === currentIndex 
                             ? 'bg-primary-600 scale-125 shadow-lg' 
                             : 'bg-primary-300 hover:bg-primary-400 hover:scale-110'}`}
                aria-label={t('carousel.goToSlide', `Go to Portuguese cultural slide ${index + 1} of ${maxIndex + 1}`)}
                style={{ minWidth: '44px', minHeight: '44px' }}
              />
            ))}
          </div>
        )}
      </EnhancedMobileGestures>

      {/* Auto-advance control */}
      {autoAdvance && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="flex items-center gap-2 bg-white border border-primary-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation"
            style={{ minHeight: '44px' }}
            aria-label={isPlaying ? t('carousel.pause', 'Pause Portuguese cultural carousel') : t('carousel.play', 'Play Portuguese cultural carousel')}
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

      {/* Screen Reader Status */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {t('carousel.status', `Showing Portuguese cultural items ${currentIndex + 1} to ${Math.min(currentIndex + itemsPerView, items.length)} of ${items.length}. Performance score: ${Math.round(performanceStats.optimizationScore)}%.`)}
        {offlineCapabilities.isOffline && t('carousel.offlineMode', ' Offline mode active.')}
      </div>
    </section>
  )
})

OptimizedPortugueseCarousel.displayName = 'OptimizedPortugueseCarousel'

export default OptimizedPortugueseCarousel
export { OptimizedPortugueseCarousel }