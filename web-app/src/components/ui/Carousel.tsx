'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export interface CarouselProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
  className?: string
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  gap?: string
  title?: string
  subtitle?: string
  onItemClick?: (item: any, index: number) => void
  ariaLabel?: string
  id?: string
}

export default function Carousel({
  items,
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  className = '',
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayDelay = 5000,
  gap = '1rem',
  title,
  subtitle,
  onItemClick,
  ariaLabel,
  id
}: CarouselProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Calculate max index based on items per view
  const maxIndex = Math.max(0, items.length - itemsToShow)

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(itemsPerView.desktop)
      } else if (window.innerWidth >= 768) {
        setItemsToShow(itemsPerView.tablet)
      } else {
        setItemsToShow(itemsPerView.mobile)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [itemsPerView])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && items.length > itemsToShow) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
      }, autoPlayDelay)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, maxIndex, autoPlayDelay, items.length, itemsToShow])

  // Navigation functions
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(maxIndex) // Loop to end
    }
    setIsAutoPlaying(false) // Stop auto-play on manual navigation
  }, [currentIndex, maxIndex])

  const goToNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop to beginning
    }
    setIsAutoPlaying(false) // Stop auto-play on manual navigation
  }, [currentIndex, maxIndex])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index <= maxIndex) {
      setCurrentIndex(index)
      setIsAutoPlaying(false) // Stop auto-play on manual navigation
    }
  }, [maxIndex])

  // Touch/drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
    setIsAutoPlaying(false) // Stop auto-play on touch
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const dragDistance = clientX - dragStart
    const threshold = 50 // Minimum drag distance to trigger navigation

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target !== carouselRef.current) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(maxIndex)
          break
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyPress)
      return () => carousel.removeEventListener('keydown', handleKeyPress)
    }
  }, [goToPrevious, goToNext, goToSlide, maxIndex])

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'pt' ? 'Nenhum item para mostrar' : 'No items to display'}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} id={id}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        {/* Previous Arrow */}
        {showArrows && items.length > itemsToShow && (
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                     bg-white/90 backdrop-blur-sm border border-primary-200 
                     rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl
                     transition-all duration-200 group
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={language === 'pt' ? 'Item anterior' : 'Previous item'}
            style={{ touchAction: 'manipulation', userSelect: 'none' }} // Prevent sound/selection
          >
            <ChevronLeftIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
          </button>
        )}

        {/* Next Arrow */}
        {showArrows && items.length > itemsToShow && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                     bg-white/90 backdrop-blur-sm border border-primary-200 
                     rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl
                     transition-all duration-200 group
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={language === 'pt' ? 'Próximo item' : 'Next item'}
            style={{ touchAction: 'manipulation', userSelect: 'none' }} // Prevent sound/selection
          >
            <ChevronRightIcon className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
          </button>
        )}

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          tabIndex={0}
          role="region"
          aria-label={ariaLabel || (language === 'pt' ? 'Carrossel de conteúdo' : 'Content carousel')}
          aria-live="polite"
          style={{ userSelect: 'none' }} // Prevent text selection
        >
          <motion.div
            className="flex"
            style={{ gap }}
            animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / itemsToShow}%` }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onItemClick?.(item, index)}
                role={onItemClick ? 'button' : undefined}
                tabIndex={onItemClick ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onItemClick(item, index)
                  }
                }}
                style={{ touchAction: 'manipulation' }} // Prevent double-tap zoom and sounds
              >
                {renderItem(item, index)}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dot Indicators */}
      {showDots && items.length > itemsToShow && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                         ${index === currentIndex
                           ? 'bg-primary-600 w-8' 
                           : 'bg-primary-200 hover:bg-primary-300'
                         }`}
              aria-label={`${language === 'pt' ? 'Ir para item' : 'Go to item'} ${index + 1}`}
              style={{ touchAction: 'manipulation', userSelect: 'none' }} // Prevent sound
            />
          ))}
        </div>
      )}

      {/* Auto-play control */}
      {autoPlay && items.length > itemsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-primary-600 hover:text-primary-700 
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                     px-3 py-1 rounded-md border border-primary-200 hover:bg-primary-50"
            style={{ touchAction: 'manipulation', userSelect: 'none' }} // Prevent sound
          >
            {isAutoPlaying 
              ? (language === 'pt' ? 'Pausar' : 'Pause')
              : (language === 'pt' ? 'Reproduzir' : 'Play')
            }
          </button>
        </div>
      )}
    </div>
  )
}