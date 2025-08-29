'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

interface CarouselItem {
  id: string
  title: string
  titlePt: string
  description?: string
  descriptionPt?: string
  imageUrl?: string
  imageAlt?: string
  imageAltPt?: string
  href?: string
  ariaLabel?: string
  ariaLabelPt?: string
}

interface AccessibilityEnhancedCarouselProps {
  /** Carousel items */
  items: CarouselItem[]
  /** Auto-advance interval in milliseconds */
  autoAdvanceInterval?: number
  /** Enable touch/swipe gestures */
  enableSwipe?: boolean
  /** Enable keyboard navigation */
  enableKeyboard?: boolean
  /** Show navigation dots */
  showDots?: boolean
  /** Show previous/next arrows */
  showArrows?: boolean
  /** Carousel title for screen readers */
  carouselTitle?: string
  carouselTitlePt?: string
  /** Number of items to show at once */
  itemsPerView?: number
  /** Mobile items per view */
  mobileItemsPerView?: number
}

/**
 * Fully accessible carousel component for Portuguese-speaking community
 * Implements WCAG 2.1 AA compliance with keyboard navigation and screen reader support
 */
export default function AccessibilityEnhancedCarousel({
  items,
  autoAdvanceInterval = 0,
  enableSwipe = true,
  enableKeyboard = true,
  showDots = true,
  showArrows = true,
  carouselTitle = 'Carousel',
  carouselTitlePt = 'Carrossel',
  itemsPerView = 1,
  mobileItemsPerView = 1
}: AccessibilityEnhancedCarouselProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoAdvanceInterval > 0)
  const [isPaused, setIsPaused] = useState(false)
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  
  const totalItems = items.length
  const maxIndex = Math.max(0, totalItems - itemsPerView)
  const currentTitle = language === 'pt' ? carouselTitlePt : carouselTitle

  // Auto-advance functionality
  useEffect(() => {
    if (isPlaying && autoAdvanceInterval > 0 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalItems)
      }, autoAdvanceInterval)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, autoAdvanceInterval, isPaused, totalItems])

  // Navigation functions
  const goToNext = useCallback(() => {
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    announceSlideChange(newIndex)
  }, [currentIndex, maxIndex])

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1
    setCurrentIndex(newIndex)
    announceSlideChange(newIndex)
  }, [currentIndex, maxIndex])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index)
      announceSlideChange(index)
    }
  }, [maxIndex])

  // Accessibility announcements
  const announceSlideChange = (index: number) => {
    const item = items[index]
    const title = language === 'pt' ? item.titlePt : item.title
    const announcement = language === 'pt' 
      ? `Slide ${index + 1} de ${totalItems}: ${title}`
      : `Slide ${index + 1} of ${totalItems}: ${title}`
    
    announceToScreenReader(announcement)
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 2000)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(event.target as Node)) return

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          goToPrevious()
          break
        
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          goToNext()
          break
        
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        
        case 'End':
          event.preventDefault()
          goToSlide(maxIndex)
          break
        
        case ' ':
          if (autoAdvanceInterval > 0) {
            event.preventDefault()
            setIsPlaying(!isPlaying)
            const message = isPlaying
              ? language === 'pt' ? 'Carrossel pausado' : 'Carousel paused'
              : language === 'pt' ? 'Carrossel retomado' : 'Carousel resumed'
            announceToScreenReader(message)
          }
          break
        
        case 'Escape':
          setIsPaused(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, goToNext, goToPrevious, goToSlide, maxIndex, isPlaying, autoAdvanceInterval, language])

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe) return
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!enableSwipe || touchStartX.current === null || touchEndX.current === null) return
    
    const difference = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
    setIsPaused(false)
  }

  // Focus management
  const handleItemFocus = (index: number) => {
    setFocusedItemIndex(index)
    setIsPaused(true)
  }

  const handleItemBlur = () => {
    setFocusedItemIndex(null)
    setIsPaused(false)
  }

  // Render carousel item
  const renderItem = (item: CarouselItem, index: number) => {
    const isVisible = index >= currentIndex && index < currentIndex + itemsPerView
    const title = language === 'pt' ? item.titlePt : item.title
    const description = language === 'pt' ? item.descriptionPt : item.description
    const imageAlt = language === 'pt' ? item.imageAltPt : item.imageAlt
    const ariaLabel = language === 'pt' ? item.ariaLabelPt : item.ariaLabel

    return (
      <div
        key={item.id}
        ref={el => { if (el) itemsRef.current[index] = el }}
        className={`
          flex-shrink-0 px-2 transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0 absolute'}
          ${itemsPerView > 1 ? `w-1/${itemsPerView}` : 'w-full'}
        `}
        style={{
          transform: `translateX(${(index - currentIndex) * (100 / itemsPerView)}%)`,
        }}
        role="group"
        aria-roledescription="slide"
        aria-label={ariaLabel || `${title}, slide ${index + 1} of ${totalItems}`}
        tabIndex={isVisible ? 0 : -1}
        onFocus={() => handleItemFocus(index)}
        onBlur={handleItemBlur}
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          {item.imageUrl && (
            <div className="relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={imageAlt || title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading={isVisible ? 'eager' : 'lazy'}
              />
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-heritage-primary mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 text-sm line-clamp-3">
                {description}
              </p>
            )}
            
            {item.href && (
              <a
                href={item.href}
                className="inline-flex items-center mt-4 text-heritage-primary hover:text-heritage-primary/80 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label={`${language === 'pt' ? 'Saber mais sobre' : 'Learn more about'} ${title}`}
              >
                {language === 'pt' ? 'Saber mais' : 'Learn more'}
                <ChevronRightIcon className="h-4 w-4 ml-1" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!items.length) return null

  return (
    <section
      ref={carouselRef}
      className="relative w-full"
      role="region"
      aria-label={currentTitle}
      aria-roledescription="carousel"
    >
      {/* Carousel container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2 min-h-[48px] min-w-[48px]"
            onClick={goToPrevious}
            aria-label={language === 'pt' ? 'Slide anterior' : 'Previous slide'}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="h-6 w-6 text-heritage-primary" aria-hidden="true" />
          </button>
          
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2 min-h-[48px] min-w-[48px]"
            onClick={goToNext}
            aria-label={language === 'pt' ? 'Próximo slide' : 'Next slide'}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRightIcon className="h-6 w-6 text-heritage-primary" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Auto-play control */}
      {autoAdvanceInterval > 0 && (
        <button
          type="button"
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={
            isPlaying
              ? language === 'pt' ? 'Pausar reprodução automática' : 'Pause auto-play'
              : language === 'pt' ? 'Iniciar reprodução automática' : 'Start auto-play'
          }
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5 text-heritage-primary" aria-hidden="true" />
          ) : (
            <PlayIcon className="h-5 w-5 text-heritage-primary" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Navigation dots */}
      {showDots && totalItems > 1 && (
        <div
          className="flex justify-center mt-6 space-x-2"
          role="tablist"
          aria-label={language === 'pt' ? 'Navegação do carrossel' : 'Carousel navigation'}
        >
          {Array.from({ length: Math.ceil(totalItems / itemsPerView) }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                min-h-[24px] min-w-[24px] flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2
                ${currentIndex === index * itemsPerView
                  ? 'bg-heritage-primary' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
              onClick={() => goToSlide(index * itemsPerView)}
              aria-label={`${language === 'pt' ? 'Ir para slide' : 'Go to slide'} ${index + 1}`}
              aria-selected={currentIndex === index * itemsPerView}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        {language === 'pt' ? (
          `Use as setas do teclado para navegar. Pressione espaço para pausar/retomar a reprodução automática.`
        ) : (
          `Use arrow keys to navigate. Press spacebar to pause/resume auto-play.`
        )}
      </div>
    </section>
  )
}