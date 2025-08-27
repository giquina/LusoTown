'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'
import logger from '@/utils/logger'

interface CarouselPerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionLatency: number
  memoryUsage: number
  networkStatus: 'online' | 'offline' | 'slow'
  frameRate: number
  bundleSize: number
  cacheHitRatio: number
}

interface MobileOptimizationSettings {
  enableImageLazyLoading: boolean
  enableIntersectionObserver: boolean
  enableVirtualScrolling: boolean
  enablePreloadOptimization: boolean
  enableBundleSplitting: boolean
  enableCriticalPathOptimization: boolean
  enablePortugueseContentPrioritization: boolean
}

interface PortugueseReadingPatterns {
  averageReadingTime: number
  scrollVelocity: number
  interactionFrequency: number
  contentEngagement: number
  preferredAutoAdvanceSpeed: number
}

const DEFAULT_MOBILE_SETTINGS: MobileOptimizationSettings = {
  enableImageLazyLoading: true,
  enableIntersectionObserver: true,
  enableVirtualScrolling: true,
  enablePreloadOptimization: true,
  enableBundleSplitting: true,
  enableCriticalPathOptimization: true,
  enablePortugueseContentPrioritization: true
}

const PORTUGUESE_READING_SPEEDS = {
  'pt-pt': 200, // words per minute for European Portuguese
  'pt-br': 180, // words per minute for Brazilian Portuguese
  'en-gb': 220  // words per minute for English (UK)
}

export function useCarouselPerformanceOptimization(options?: {
  enableRealTimeMonitoring?: boolean
  enablePortugueseOptimizations?: boolean
  optimizationLevel?: 'basic' | 'standard' | 'aggressive'
}) {
  const { language } = useLanguage()
  const [metrics, setMetrics] = useState<CarouselPerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionLatency: 0,
    memoryUsage: 0,
    networkStatus: 'online',
    frameRate: 60,
    bundleSize: 0,
    cacheHitRatio: 0
  })

  const [mobileSettings, setMobileSettings] = useState<MobileOptimizationSettings>(DEFAULT_MOBILE_SETTINGS)
  const [portugueseReadingPatterns, setPortugueseReadingPatterns] = useState<PortugueseReadingPatterns>({
    averageReadingTime: PORTUGUESE_READING_SPEEDS[language === 'pt' ? 'pt-pt' : 'en-gb'],
    scrollVelocity: 0,
    interactionFrequency: 0,
    contentEngagement: 0,
    preferredAutoAdvanceSpeed: 5000
  })

  const performanceObserver = useRef<PerformanceObserver>()
  const frameRateMonitor = useRef<number>()
  const memoryMonitor = useRef<NodeJS.Timeout>()
  const interactionTimer = useRef<number>()
  const cacheAnalytics = useRef<Map<string, number>>(new Map())

  // Portuguese cultural content optimization
  const optimizePortugueseContentTiming = useCallback((contentLength: number, language: string) => {
    const wordsPerMinute = PORTUGUESE_READING_SPEEDS[language as keyof typeof PORTUGUESE_READING_SPEEDS] || 200
    const estimatedReadingTime = (contentLength / wordsPerMinute) * 60 * 1000 // Convert to milliseconds
    
    // Add Portuguese cultural breathing space (Portuguese culture values reflection time)
    const culturalBuffer = language === 'pt' ? 1500 : 1000
    
    return Math.max(3000, estimatedReadingTime + culturalBuffer)
  }, [])

  // Advanced mobile performance monitoring
  const startPerformanceMonitoring = useCallback(() => {
    if (!options?.enableRealTimeMonitoring) return

    // Performance Observer for advanced metrics
    if ('PerformanceObserver' in window) {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            setMetrics(prev => ({
              ...prev,
              renderTime: entry.duration
            }))
          }
          
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            setMetrics(prev => ({
              ...prev,
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart
            }))
          }
        })
      })

      performanceObserver.current.observe({ 
        entryTypes: ['measure', 'navigation', 'paint', 'largest-contentful-paint'] 
      })
    }

    // Frame rate monitoring
    let lastTime = performance.now()
    let frameCount = 0

    const measureFrameRate = (currentTime: number) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          frameRate: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }))
        
        frameCount = 0
        lastTime = currentTime
      }
      
      frameRateMonitor.current = requestAnimationFrame(measureFrameRate)
    }
    
    frameRateMonitor.current = requestAnimationFrame(measureFrameRate)

    // Memory monitoring
    memoryMonitor.current = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }))
      }
    }, 2000)

    // Network status monitoring
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection
      let status: 'online' | 'offline' | 'slow' = navigator.onLine ? 'online' : 'offline'
      
      if (connection && connection.effectiveType) {
        if (['slow-2g', '2g'].includes(connection.effectiveType)) {
          status = 'slow'
        }
      }
      
      setMetrics(prev => ({ ...prev, networkStatus: status }))
    }

    updateNetworkStatus()
    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)

    return () => {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
    }
  }, [options?.enableRealTimeMonitoring])

  // Carousel-specific optimizations
  const optimizeCarouselPerformance = useCallback(() => {
    const level = options?.optimizationLevel || 'standard'
    
    // Adjust settings based on optimization level
    if (level === 'aggressive') {
      setMobileSettings(prev => ({
        ...prev,
        enableVirtualScrolling: true,
        enableBundleSplitting: true,
        enableCriticalPathOptimization: true
      }))
    }

    // Portuguese content prioritization
    if (options?.enablePortugueseOptimizations && language === 'pt') {
      // Optimize for Portuguese reading patterns
      const portugueseOptimizations = {
        preloadDistance: 3, // Preload more content for Portuguese users
        lazyLoadThreshold: 100, // Larger threshold for Portuguese text
        cacheStrategy: 'aggressive' as const
      }

      logger.info('[Carousel Performance] Applied Portuguese cultural optimizations', portugueseOptimizations)
    }
  }, [options?.optimizationLevel, options?.enablePortugueseOptimizations, language])

  // Image optimization for Portuguese cultural content
  const optimizePortugueseImages = useCallback(async (imageUrl: string): Promise<string> => {
    if (!mobileSettings.enableImageLazyLoading) return imageUrl

    // Portuguese cultural image optimization
    const isMobile = window.innerWidth <= 768
    const isSlowConnection = metrics.networkStatus === 'slow'
    
    let optimizedUrl = imageUrl
    
    // Apply mobile optimizations
    if (isMobile || isSlowConnection) {
      // Reduce quality for mobile/slow connections
      if (imageUrl.includes('cloudinary')) {
        optimizedUrl = imageUrl.replace(/q_\d+/, isSlowConnection ? 'q_30' : 'q_60')
        optimizedUrl = optimizedUrl.replace(/w_\d+/, isMobile ? 'w_400' : 'w_600')
      }
    }

    // Cache optimization analytics
    const cacheKey = `img_${imageUrl.split('/').pop()}`
    const cacheHits = cacheAnalytics.current.get(cacheKey) || 0
    cacheAnalytics.current.set(cacheKey, cacheHits + 1)
    
    return optimizedUrl
  }, [mobileSettings.enableImageLazyLoading, metrics.networkStatus])

  // Portuguese reading pattern analysis
  const analyzePortugueseReadingPatterns = useCallback((interactionData: {
    scrollVelocity: number
    dwellTime: number
    engagementScore: number
  }) => {
    setPortugueseReadingPatterns(prev => ({
      ...prev,
      scrollVelocity: interactionData.scrollVelocity,
      contentEngagement: interactionData.engagementScore,
      preferredAutoAdvanceSpeed: optimizePortugueseContentTiming(200, language)
    }))

    // Adjust carousel timing based on Portuguese reading patterns
    const isPortugueseReader = language === 'pt'
    const slowReader = interactionData.dwellTime > portugueseReadingPatterns.averageReadingTime * 1.3
    
    if (isPortugueseReader && slowReader) {
      // Provide more time for Portuguese cultural content
      setPortugueseReadingPatterns(prev => ({
        ...prev,
        preferredAutoAdvanceSpeed: prev.preferredAutoAdvanceSpeed * 1.2
      }))
    }
  }, [language, optimizePortugueseContentTiming])

  // Interaction latency measurement
  const measureInteractionLatency = useCallback(() => {
    interactionTimer.current = performance.now()
  }, [])

  const recordInteractionComplete = useCallback(() => {
    if (interactionTimer.current) {
      const latency = performance.now() - interactionTimer.current
      setMetrics(prev => ({
        ...prev,
        interactionLatency: latency
      }))
    }
  }, [])

  // Bundle size analysis
  const analyzeBundleSize = useCallback(async () => {
    if (!mobileSettings.enableBundleSplitting) return

    try {
      // Measure loaded bundle size
      const resources = performance.getEntriesByType('resource')
      let totalSize = 0
      
      resources.forEach((resource: any) => {
        if (resource.name.includes('carousel') || resource.name.includes('lusophone')) {
          totalSize += resource.transferSize || 0
        }
      })
      
      setMetrics(prev => ({
        ...prev,
        bundleSize: Math.round(totalSize / 1024) // Convert to KB
      }))

      // Cache hit ratio calculation
      const totalCacheRequests = Array.from(cacheAnalytics.current.values()).reduce((a, b) => a + b, 0)
      const cacheHits = Array.from(cacheAnalytics.current.values()).filter(hits => hits > 1).length
      const hitRatio = totalCacheRequests > 0 ? (cacheHits / totalCacheRequests) * 100 : 0
      
      setMetrics(prev => ({
        ...prev,
        cacheHitRatio: Math.round(hitRatio)
      }))

    } catch (error) {
      logger.warn('[Carousel Performance] Bundle analysis failed:', error)
    }
  }, [mobileSettings.enableBundleSplitting])

  // Auto-advance timing optimization for Portuguese content
  const getOptimalAutoAdvanceTime = useCallback((contentLength: number) => {
    const baseTime = optimizePortugueseContentTiming(contentLength, language)
    const readingPatternAdjustment = portugueseReadingPatterns.preferredAutoAdvanceSpeed
    const connectionAdjustment = metrics.networkStatus === 'slow' ? 1.5 : 1
    
    return Math.round(baseTime * connectionAdjustment)
  }, [optimizePortugueseContentTiming, language, portugueseReadingPatterns.preferredAutoAdvanceSpeed, metrics.networkStatus])

  // Performance optimization recommendations
  const getOptimizationRecommendations = useCallback(() => {
    const recommendations: string[] = []

    if (metrics.frameRate < 55) {
      recommendations.push('enable-virtual-scrolling')
    }

    if (metrics.memoryUsage > 100) {
      recommendations.push('optimize-memory-usage')
    }

    if (metrics.interactionLatency > 100) {
      recommendations.push('reduce-animation-complexity')
    }

    if (metrics.networkStatus === 'slow') {
      recommendations.push('enable-aggressive-caching')
    }

    if (metrics.bundleSize > 500) {
      recommendations.push('enable-code-splitting')
    }

    if (language === 'pt' && portugueseReadingPatterns.contentEngagement < 70) {
      recommendations.push('optimize-portuguese-content-timing')
    }

    return recommendations
  }, [metrics, language, portugueseReadingPatterns.contentEngagement])

  // Initialize performance monitoring
  useEffect(() => {
    const cleanup = startPerformanceMonitoring()
    optimizeCarouselPerformance()
    analyzeBundleSize()

    return () => {
      cleanup?.()
      
      if (performanceObserver.current) {
        performanceObserver.current.disconnect()
      }
      
      if (frameRateMonitor.current) {
        cancelAnimationFrame(frameRateMonitor.current)
      }
      
      if (memoryMonitor.current) {
        clearInterval(memoryMonitor.current)
      }
    }
  }, [startPerformanceMonitoring, optimizeCarouselPerformance, analyzeBundleSize])

  return {
    metrics,
    mobileSettings,
    portugueseReadingPatterns,
    optimizePortugueseImages,
    analyzePortugueseReadingPatterns,
    measureInteractionLatency,
    recordInteractionComplete,
    getOptimalAutoAdvanceTime,
    getOptimizationRecommendations,
    isOptimized: Object.values(mobileSettings).some(setting => setting === true)
  }
}

// Portuguese cultural performance utilities
export const PortugueseCarouselPerformanceUtils = {
  // Calculate optimal image sizes for Portuguese cultural content
  getOptimalImageSize: (viewportWidth: number, isMobile: boolean) => {
    if (isMobile) {
      return viewportWidth <= 375 ? 300 : 400
    }
    return viewportWidth <= 768 ? 500 : 700
  },

  // Optimize Portuguese text rendering
  optimizePortugueseTextRendering: () => {
    const style = document.createElement('style')
    style.textContent = `
      .portuguese-carousel-text {
        font-feature-settings: "liga" 1, "kern" 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        word-break: break-word;
        hyphens: auto;
      }
      
      .portuguese-carousel-text[lang="pt"] {
        line-height: 1.6;
        letter-spacing: 0.025em;
      }
    `
    document.head.appendChild(style)
  },

  // Measure Portuguese content readability
  measurePortugueseReadability: (text: string, language: string) => {
    const words = text.split(/\s+/).length
    const sentences = text.split(/[.!?]+/).length
    const avgWordsPerSentence = words / sentences
    
    // Portuguese typically has longer sentences
    const isPortugueseOptimal = language === 'pt' ? 
      avgWordsPerSentence <= 18 : // Portuguese
      avgWordsPerSentence <= 15   // English
    
    return {
      wordCount: words,
      sentenceCount: sentences,
      avgWordsPerSentence: Math.round(avgWordsPerSentence),
      isOptimal: isPortugueseOptimal,
      estimatedReadingTime: (words / PORTUGUESE_READING_SPEEDS[language as keyof typeof PORTUGUESE_READING_SPEEDS]) * 60
    }
  }
}