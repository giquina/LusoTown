'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { SophisticatedLoading } from './EliteMicroInteractions'

interface ElitePerformanceMonitorProps {
  children: React.ReactNode
  threshold?: number
  culturalTheme?: boolean
  reportMetrics?: boolean
}

export function ElitePerformanceMonitor({
  children,
  threshold = 3000, // 3 seconds
  culturalTheme = false,
  reportMetrics = true
}: ElitePerformanceMonitorProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadTime, setLoadTime] = React.useState<number | null>(null)
  const [performanceScore, setPerformanceScore] = React.useState<'excellent' | 'good' | 'needs_improvement' | null>(null)
  const startTime = React.useRef<number>(Date.now())

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const endTime = Date.now()
      const duration = endTime - startTime.current
      setLoadTime(duration)
      
      // Determine performance score for luxury standards
      let score: 'excellent' | 'good' | 'needs_improvement'
      if (duration < 1000) score = 'excellent'
      else if (duration < threshold) score = 'good'
      else score = 'needs_improvement'
      
      setPerformanceScore(score)
      
      // Report metrics for Portuguese community platform optimization
      if (reportMetrics && typeof window !== 'undefined') {
        if ('gtag' in window) {
          (window as any).gtag('event', 'page_load_time', {
            event_category: 'Performance',
            event_label: culturalTheme ? 'Portuguese Community' : 'General',
            value: duration,
            custom_map: {
              performance_score: score,
              cultural_context: culturalTheme ? 'portuguese_heritage' : 'standard'
            }
          })
        }
        
        // Send to Portuguese community analytics
        if (culturalTheme) {
          console.log(`🇵🇹 Portuguese Community Performance: ${duration}ms (${score})`)
        }
      }
      
      setIsLoading(false)
    }, 100) // Minimum loading time for sophisticated experience

    return () => clearTimeout(timer)
  }, [threshold, culturalTheme, reportMetrics])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SophisticatedLoading
          size="lg"
          variant="majestic"
          message={culturalTheme 
            ? "Preparando a sua experiência cultural portuguesa..."
            : "Preparing your luxury experience..."
          }
          culturalTheme={culturalTheme}
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      
      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && loadTime && (
        <ElitePerformanceIndicator
          loadTime={loadTime}
          score={performanceScore!}
          culturalTheme={culturalTheme}
        />
      )}
    </motion.div>
  )
}

interface ElitePerformanceIndicatorProps {
  loadTime: number
  score: 'excellent' | 'good' | 'needs_improvement'
  culturalTheme?: boolean
  className?: string
}

function ElitePerformanceIndicator({
  loadTime,
  score,
  culturalTheme = false,
  className = ''
}: ElitePerformanceIndicatorProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const scoreConfig = {
    excellent: {
      color: culturalTheme ? 'text-green-600' : 'text-emerald-600',
      bg: culturalTheme ? 'bg-green-100 border-green-300' : 'bg-emerald-100 border-emerald-300',
      icon: '⚡',
      label: culturalTheme ? 'Excelente' : 'Excellent'
    },
    good: {
      color: culturalTheme ? 'text-amber-600' : 'text-yellow-600',
      bg: culturalTheme ? 'bg-amber-100 border-amber-300' : 'bg-yellow-100 border-yellow-300',
      icon: '✨',
      label: culturalTheme ? 'Bom' : 'Good'
    },
    needs_improvement: {
      color: culturalTheme ? 'text-red-600' : 'text-red-600',
      bg: culturalTheme ? 'bg-red-100 border-red-300' : 'bg-red-100 border-red-300',
      icon: '⚠️',
      label: culturalTheme ? 'Precisa Melhorar' : 'Needs Improvement'
    }
  }

  const config = scoreConfig[score]

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed bottom-4 right-4 z-50 max-w-xs',
            className
          )}
        >
          <div className={cn(
            'rounded-2xl border-2 p-4 shadow-lg backdrop-blur-sm',
            config.bg
          )}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{config.icon}</span>
              <div className="flex-1">
                <p className={cn('text-sm font-semibold', config.color)}>
                  {config.label} Performance
                </p>
                <p className="text-xs text-gray-600">
                  {loadTime}ms {culturalTheme ? 'para a comunidade portuguesa' : 'load time'}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
  luxury?: boolean
  culturalTheme?: boolean
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  className?: string
}

export function LazyImage({
  src,
  alt,
  fallbackSrc = '/images/default-placeholder.jpg',
  luxury = false,
  culturalTheme = false,
  aspectRatio = 'landscape',
  className = '',
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [currentSrc, setCurrentSrc] = React.useState(src)
  const imgRef = React.useRef<HTMLImageElement>(null)

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image()
          img.onload = () => setIsLoading(false)
          img.onerror = () => {
            setHasError(true)
            setCurrentSrc(fallbackSrc)
            setIsLoading(false)
          }
          img.src = src
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [src, fallbackSrc])

  return (
    <div className={cn(
      'relative overflow-hidden',
      aspectRatioClasses[aspectRatio],
      luxury && 'rounded-2xl shadow-xl',
      culturalTheme && 'border-2 border-amber-200/50',
      className
    )}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              culturalTheme 
                ? 'bg-gradient-to-br from-red-50 via-amber-50 to-green-50'
                : 'bg-gray-100'
            )}
          >
            <SophisticatedLoading
              size="sm"
              variant={luxury ? "majestic" : "refined"}
              culturalTheme={culturalTheme}
            />
          </motion.div>
        ) : (
          <motion.img
            key="image"
            ref={imgRef}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={currentSrc}
            alt={alt}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              luxury && 'hover:scale-105 transition-transform duration-500'
            )}
            {...props}
          />
        )}
      </AnimatePresence>

      {/* Cultural pattern overlay for Portuguese images */}
      {culturalTheme && !isLoading && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='image-azulejo' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Crect width='50' height='50' fill='none'/%3E%3Cpath d='M25,5 L45,25 L25,45 L5,25 Z' fill='rgba(212,165,116,0.05)' stroke='rgba(212,165,116,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23image-azulejo)'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      )}

      {/* Luxury shimmer effect */}
      {luxury && !isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Error state indicator */}
      {hasError && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-red-100 border border-red-300 rounded-full flex items-center justify-center">
          <span className="text-red-600 text-xs">!</span>
        </div>
      )}
    </div>
  )
}

interface EliteInfiniteScrollProps {
  hasNextPage: boolean
  fetchNextPage: () => void
  isLoading: boolean
  culturalTheme?: boolean
  className?: string
  children: React.ReactNode
}

export function EliteInfiniteScroll({
  hasNextPage,
  fetchNextPage,
  isLoading,
  culturalTheme = false,
  className = '',
  children
}: EliteInfiniteScrollProps) {
  const { language } = useLanguage()
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const hasExecutedRef = React.useRef(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isLoading && !hasExecutedRef.current) {
          hasExecutedRef.current = true
          fetchNextPage()
          
          // Reset after a delay to prevent rapid firing
          setTimeout(() => {
            hasExecutedRef.current = false
          }, 1000)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Load before reaching the sentinel
      }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage, isLoading])

  return (
    <div className={className}>
      {children}
      
      <div ref={sentinelRef} className="py-8 flex justify-center">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SophisticatedLoading
                size="md"
                variant="opulent"
                message={
                  culturalTheme
                    ? language === 'pt' 
                      ? "A carregar mais conteúdo da comunidade..." 
                      : "Loading more community content..."
                    : "Loading more..."
                }
                culturalTheme={culturalTheme}
              />
            </motion.div>
          )}
          
          {!hasNextPage && !isLoading && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                'text-center p-6 rounded-2xl',
                culturalTheme 
                  ? 'bg-gradient-to-r from-red-50 via-amber-50 to-green-50 border-2 border-amber-200/50'
                  : 'bg-gray-50 border border-gray-200'
              )}
            >
              <div className="space-y-2">
                <div className="text-2xl">
                  {culturalTheme ? '🇵🇹' : '✨'}
                </div>
                <p className={cn(
                  'text-sm font-medium',
                  culturalTheme ? 'text-amber-700' : 'text-gray-600'
                )}>
                  {culturalTheme
                    ? language === 'pt'
                      ? 'Parabéns! Viu tudo o que a nossa comunidade portuguesa tem para oferecer'
                      : 'Congratulations! You\'ve seen everything our Portuguese community has to offer'
                    : 'You\'ve reached the end'
                  }
                </p>
                {culturalTheme && (
                  <p className="text-xs text-amber-600">
                    {language === 'pt' 
                      ? 'Continue a explorar outras secções da plataforma'
                      : 'Continue exploring other platform sections'
                    }
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Hook for performance metrics
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = React.useState({
    renderTime: 0,
    componentLoadTime: 0,
    interactionLatency: 0
  })

  const measureRenderTime = React.useCallback(() => {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      setMetrics(prev => ({
        ...prev,
        renderTime: end - start
      }))
    }
  }, [])

  const measureInteraction = React.useCallback(() => {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      setMetrics(prev => ({
        ...prev,
        interactionLatency: end - start
      }))
    }
  }, [])

  return {
    metrics,
    measureRenderTime,
    measureInteraction
  }
}