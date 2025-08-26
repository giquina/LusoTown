'use client'

import React, { useState, useEffect, useCallback, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

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
 * Custom hook for carousel navigation
 */
function useCarouselNavigation<T extends CarouselItemType>(
  items: T[],
  itemsPerView: number,
  autoAdvance: boolean = false,
  autoAdvanceInterval: number = 5000
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoAdvance)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const maxIndex = Math.max(0, items.length - itemsPerView)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }, [maxIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  }, [maxIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)
  }, [maxIndex])

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  // Auto-advance logic
  useEffect(() => {
    if (isPlaying && items.length > itemsPerView) {
      intervalRef.current = setInterval(goToNext, autoAdvanceInterval)
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
    goToSlide,
    goToNext,
    goToPrevious,
    togglePlay,
    maxIndex
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
 * Main LusophoneCarousel Component
 */
export default function LusophoneCarousel<T extends CarouselItemType>({
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
  emptyStateMessage
}: LusophoneCarouselProps<T>) {
  const { language, t } = useLanguage()
  const { currentConfig, screenSize } = useResponsive(responsive)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const {
    currentIndex,
    isPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    togglePlay,
    maxIndex
  } = useCarouselNavigation(items, currentConfig.itemsPerView, autoAdvance, autoAdvanceInterval)

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNext()
        break
      case ' ':
        event.preventDefault()
        if (autoAdvance) togglePlay()
        break
      case 'Home':
        event.preventDefault()
        goToSlide(0)
        break
      case 'End':
        event.preventDefault()
        goToSlide(maxIndex)
        break
    }
  }, [goToPrevious, goToNext, togglePlay, goToSlide, maxIndex, autoAdvance])

  const handleItemClick = useCallback((item: T, index: number) => {
    onItemClick?.(item, index)
  }, [onItemClick])

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
      className={`lusophone-carousel ${className}`}
      role="region"
      aria-label={title ? title[language] : t('carousel.defaultLabel', 'Content carousel')}
    >
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
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Controls */}
        {shouldShowNavigation && showControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                         bg-white/90 hover:bg-white shadow-lg hover:shadow-xl 
                         w-12 h-12 rounded-full flex items-center justify-center
                         border border-primary-200 hover:border-primary-300
                         transition-all duration-300 group
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={t('carousel.previous', 'Previous items')}
              disabled={currentIndex === 0 && !autoAdvance}
            >
              <ChevronLeftIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                         bg-white/90 hover:bg-white shadow-lg hover:shadow-xl
                         w-12 h-12 rounded-full flex items-center justify-center
                         border border-primary-200 hover:border-primary-300
                         transition-all duration-300 group
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={t('carousel.next', 'Next items')}
              disabled={currentIndex >= maxIndex && !autoAdvance}
            >
              <ChevronRightIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            </button>

            {/* Auto-advance toggle */}
            {autoAdvance && (
              <button
                onClick={togglePlay}
                className="absolute right-20 top-1/2 -translate-y-1/2 z-20
                           bg-white/90 hover:bg-white shadow-lg hover:shadow-xl
                           w-12 h-12 rounded-full flex items-center justify-center
                           border border-primary-200 hover:border-primary-300
                           transition-all duration-300 group
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label={isPlaying ? t('carousel.pause', 'Pause carousel') : t('carousel.play', 'Play carousel')}
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

        {/* Carousel Content */}
        <div
          ref={carouselRef}
          className="overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-gold-50 p-6"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="group"
          aria-label={t('carousel.content', 'Carousel content')}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1] // Custom easing for smooth animation
              }}
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${currentConfig.itemsPerView}, 1fr)`
              }}
            >
              {visibleItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => handleItemClick(item, currentIndex + index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleItemClick(item, currentIndex + index)
                    }
                  }}
                  aria-label={item.title[language]}
                >
                  {renderItem(item, currentIndex + index)}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        {shouldShowNavigation && showDots && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                           ${index === currentIndex 
                             ? 'bg-primary-600 scale-125' 
                             : 'bg-primary-300 hover:bg-primary-400'}`}
                aria-label={t('carousel.goToSlide', `Go to slide ${index + 1}`, { slide: index + 1 })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Screen Reader Status */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        role="status"
      >
        {t('carousel.status', `Showing items ${currentIndex + 1} to ${Math.min(currentIndex + currentConfig.itemsPerView, items.length)} of ${items.length}`, {
          start: currentIndex + 1,
          end: Math.min(currentIndex + currentConfig.itemsPerView, items.length),
          total: items.length
        })}
      </div>
    </section>
  )
}

/**
 * Export utility functions and types for external use
 */
export {
  type WeekendEventItem,
  type PALOPHeritageItem,
  type WeeklyDiscoveryItem,
  type CulturalCelebrationItem,
  type CarouselItemType,
  type ResponsiveConfig,
  DEFAULT_RESPONSIVE,
  useCarouselNavigation,
  useResponsive
}