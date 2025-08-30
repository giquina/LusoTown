'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { PALOP_CULTURAL_SECTIONS, type CulturalSection } from '@/config/palop-cultural-sections'

interface PalopCulturalCarouselProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  featuredNations?: string[]
  onNationSelect?: (nationId: string) => void
  mobileSettings?: {
    enableSwipeGestures?: boolean
    enableHapticFeedback?: boolean
    enablePullToRefresh?: boolean
  }
  enablePortugueseGestures?: boolean
}

export default function PalopCulturalCarousel({
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  featuredNations,
  onNationSelect,
  mobileSettings = {
    enableSwipeGestures: true,
    enableHapticFeedback: false,
    enablePullToRefresh: true
  },
  enablePortugueseGestures = true
}: PalopCulturalCarouselProps) {
  const { t, currentLanguage } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Filter sections if featured nations specified
  const displayedSections = featuredNations 
    ? PALOP_CULTURAL_SECTIONS.filter(section => featuredNations.includes(section.id))
    : PALOP_CULTURAL_SECTIONS

  const totalSections = displayedSections.length

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalSections)
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, autoPlay, autoPlayInterval, totalSections])

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? totalSections - 1 : prev - 1)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalSections)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (mobileSettings.enableSwipeGestures) {
      setTouchStart(e.targetTouches[0].clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (mobileSettings.enableSwipeGestures) {
      setTouchEnd(e.targetTouches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    if (!mobileSettings.enableSwipeGestures) return
    
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (enablePortugueseGestures) {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevious()
            break
          case 'ArrowRight':
            goToNext()
            break
          case ' ':
            e.preventDefault()
            togglePlayPause()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [enablePortugueseGestures])

  const handleNationSelect = (section: CulturalSection) => {
    if (onNationSelect) {
      onNationSelect(section.id)
    }
    
    // Track cultural engagement
    if (typeof window !== 'undefined') {
      console.log(`Carousel engagement: ${section.nation.name}`)
    }
  }

  const currentSection = displayedSections[currentIndex]

  if (!currentSection) return null

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      {/* Main Carousel Container */}
      <div
        ref={carouselRef}
        className="relative h-96 md:h-[500px] bg-gradient-to-br from-heritage-primary to-heritage-secondary"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-between p-8 text-white">
          {/* Left Side - Nation Info */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-6xl md:text-8xl">{currentSection.nation.flag}</span>
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-2">
                    {currentSection.nation.name}
                  </h2>
                  <p className="text-xl md:text-2xl opacity-90">
                    {currentSection.community.communitySize}
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Highlights */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 opacity-90">
                  {currentLanguage === 'pt' ? 'Tradições Culturais' : 'Cultural Traditions'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentSection.cultural.primaryGenres.slice(0, 4).map((genre, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2 opacity-90">
                  {currentLanguage === 'pt' ? 'Presença no Reino Unido' : 'UK Presence'}
                </h4>
                <p className="text-sm opacity-80 max-w-lg">
                  {currentSection.community.ukPresence}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={() => handleNationSelect(currentSection)}
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-heritage-primary transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>
                {currentLanguage === 'pt' ? 'Explorar Comunidade' : 'Explore Community'}
              </span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Right Side - Cultural Visual */}
          <div className="hidden lg:block flex-shrink-0 w-80">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-4">
                {currentLanguage === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
              </h4>
              <div className="space-y-3">
                {currentSection.events.regular.slice(0, 3).map((event, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs opacity-75">{event.frequency}</p>
                  </div>
                ))}
              </div>
              
              {/* Featured Testimonial */}
              {currentSection.testimonials.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-xs italic opacity-80 mb-2">
                    "{currentSection.testimonials[0].quote.substring(0, 100)}..."
                  </div>
                  <div className="text-xs">
                    <strong>{currentSection.testimonials[0].name}</strong>, {currentSection.testimonials[0].location}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous/Next Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-20"
            aria-label="Previous nation"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-20"
            aria-label="Next nation"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Play/Pause Button */}
          {autoPlay && (
            <button
              onClick={togglePlayPause}
              className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 z-20"
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </button>
          )}
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {displayedSections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Nation Flags Quick Navigation */}
      <div className="absolute top-4 left-4 flex space-x-2 z-20">
        {displayedSections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => goToSlide(index)}
            className={`text-2xl transition-all duration-200 hover:scale-125 ${
              index === currentIndex ? 'scale-125 drop-shadow-lg' : 'opacity-60'
            }`}
            aria-label={`View ${section.nation.name}`}
          >
            {section.nation.flag}
          </button>
        ))}
      </div>

      {/* Mobile Touch Instructions */}
      {mobileSettings.enableSwipeGestures && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/60 text-xs z-20 md:hidden">
          ← {currentLanguage === 'pt' ? 'Deslizar para navegar' : 'Swipe to navigate'} →
        </div>
      )}
    </div>
  )
}