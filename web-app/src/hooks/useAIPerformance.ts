'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { dynamicAIServiceClient, type AIServicePerformanceMetrics } from '@/lib/ai/DynamicAIServiceClient'

interface AIPerformanceState {
  services: Map<string, AIServicePerformanceMetrics>
  totalLoadTime: number
  isLoading: boolean
  errors: Map<string, Error>
  lastUpdated: Date | null
}

interface AIPerformanceHookReturn {
  performance: AIPerformanceState
  loadService: (serviceName: string) => Promise<void>
  loadMultipleServices: (serviceNames: string[]) => Promise<void>
  refreshMetrics: () => void
  disposeServices: () => Promise<void>
  getServiceStatus: (serviceName: string) => 'loaded' | 'loading' | 'error' | 'not-loaded'
}

// Performance thresholds for Portuguese-speaking community AI systems
const PERFORMANCE_THRESHOLDS = {
  excellentLoadTime: 100, // ms
  goodLoadTime: 300, // ms
  acceptableLoadTime: 500, // ms
  minCulturalAccuracy: 85, // %
  targetCulturalAccuracy: 95, // %
}

export function useAIPerformance(): AIPerformanceHookReturn {
  const [performance, setPerformance] = useState<AIPerformanceState>({
    services: new Map(),
    totalLoadTime: 0,
    isLoading: false,
    errors: new Map(),
    lastUpdated: null
  })

  const loadingServices = useRef<Set<string>>(new Set())
  const metricsInterval = useRef<NodeJS.Timeout | null>(null)

  // Update performance metrics from the dynamic client
  const refreshMetrics = useCallback(() => {
    const metrics = dynamicAIServiceClient.getPerformanceMetrics()
    const serviceStatus = dynamicAIServiceClient.getServiceStatus()
    
    setPerformance(prev => ({
      ...prev,
      services: metrics,
      totalLoadTime: Array.from(metrics.values()).reduce((sum, metric) => sum + metric.loadTime, 0),
      lastUpdated: new Date()
    }))

    // Log performance insights
    console.log('🔍 AI Performance Metrics Updated:', {
      totalServices: metrics.size,
      averageLoadTime: metrics.size > 0 ? 
        Array.from(metrics.values()).reduce((sum, m) => sum + m.loadTime, 0) / metrics.size : 0,
      culturalAccuracy: metrics.size > 0 ?
        Array.from(metrics.values()).reduce((sum, m) => sum + m.culturalAccuracy, 0) / metrics.size : 0
    })
  }, [])

  // Load a single AI service with performance monitoring
  const loadService = useCallback(async (serviceName: string) => {
    if (loadingServices.current.has(serviceName)) {
      console.warn(`⚠️  Service ${serviceName} is already loading`)
      return
    }

    loadingServices.current.add(serviceName)
    
    setPerformance(prev => ({
      ...prev,
      isLoading: true,
      errors: new Map(prev.errors).delete(serviceName) ? new Map(prev.errors) : prev.errors
    }))

    const startTime = performance.now()

    try {
      console.log(`🚀 Loading AI service: ${serviceName}`)
      
      await dynamicAIServiceClient.lazyLoadService(serviceName)
      
      const loadTime = performance.now() - startTime
      
      // Log performance classification
      let performanceLevel = 'poor'
      if (loadTime <= PERFORMANCE_THRESHOLDS.excellentLoadTime) {
        performanceLevel = 'excellent'
      } else if (loadTime <= PERFORMANCE_THRESHOLDS.goodLoadTime) {
        performanceLevel = 'good'
      } else if (loadTime <= PERFORMANCE_THRESHOLDS.acceptableLoadTime) {
        performanceLevel = 'acceptable'
      }

      console.log(`✅ ${serviceName} loaded in ${loadTime.toFixed(2)}ms (${performanceLevel})`)
      
      refreshMetrics()
    } catch (error) {
      console.error(`❌ Failed to load ${serviceName}:`, error)
      
      setPerformance(prev => ({
        ...prev,
        errors: new Map(prev.errors).set(serviceName, error as Error)
      }))
    } finally {
      loadingServices.current.delete(serviceName)
      
      setPerformance(prev => ({
        ...prev,
        isLoading: loadingServices.current.size > 0
      }))
    }
  }, [refreshMetrics])

  // Load multiple services in parallel
  const loadMultipleServices = useCallback(async (serviceNames: string[]) => {
    console.log(`🚀 Loading ${serviceNames.length} AI services in parallel`)
    
    setPerformance(prev => ({ ...prev, isLoading: true }))
    
    const startTime = performance.now()

    try {
      await dynamicAIServiceClient.loadMultipleServices(serviceNames)
      
      const totalTime = performance.now() - startTime
      console.log(`✅ All services loaded in ${totalTime.toFixed(2)}ms`)
      
      refreshMetrics()
    } catch (error) {
      console.error('❌ Failed to load multiple services:', error)
    } finally {
      setPerformance(prev => ({ ...prev, isLoading: false }))
    }
  }, [refreshMetrics])

  // Dispose all services
  const disposeServices = useCallback(async () => {
    console.log('🧹 Disposing all AI services...')
    
    try {
      await dynamicAIServiceClient.dispose()
      
      setPerformance({
        services: new Map(),
        totalLoadTime: 0,
        isLoading: false,
        errors: new Map(),
        lastUpdated: new Date()
      })
      
      console.log('✅ All AI services disposed')
    } catch (error) {
      console.error('❌ Failed to dispose services:', error)
    }
  }, [])

  // Get service status
  const getServiceStatus = useCallback((serviceName: string): 'loaded' | 'loading' | 'error' | 'not-loaded' => {
    if (performance.errors.has(serviceName)) {
      return 'error'
    }
    
    if (loadingServices.current.has(serviceName)) {
      return 'loading'
    }
    
    if (performance.services.has(serviceName)) {
      return 'loaded'
    }
    
    return 'not-loaded'
  }, [performance.services, performance.errors])

  // Setup performance monitoring interval
  useEffect(() => {
    // Refresh metrics every 5 seconds
    metricsInterval.current = setInterval(() => {
      if (performance.services.size > 0) {
        refreshMetrics()
      }
    }, 5000)

    return () => {
      if (metricsInterval.current) {
        clearInterval(metricsInterval.current)
      }
    }
  }, [refreshMetrics, performance.services.size])

  // Preload critical services on hook initialization
  useEffect(() => {
    const initializeCriticalServices = async () => {
      console.log('🎯 Initializing critical AI services for Portuguese-speaking community...')
      
      try {
        await dynamicAIServiceClient.preloadCriticalServices()
        refreshMetrics()
      } catch (error) {
        console.warn('⚠️  Some critical services failed to initialize:', error)
      }
    }

    initializeCriticalServices()
  }, [refreshMetrics])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (metricsInterval.current) {
        clearInterval(metricsInterval.current)
      }
    }
  }, [])

  return {
    performance,
    loadService,
    loadMultipleServices,
    refreshMetrics,
    disposeServices,
    getServiceStatus
  }
}

// Performance analysis utilities
export const AIPerformanceUtils = {
  /**
   * Classify load time performance
   */
  classifyLoadTime(loadTime: number): 'excellent' | 'good' | 'acceptable' | 'poor' {
    if (loadTime <= PERFORMANCE_THRESHOLDS.excellentLoadTime) return 'excellent'
    if (loadTime <= PERFORMANCE_THRESHOLDS.goodLoadTime) return 'good'
    if (loadTime <= PERFORMANCE_THRESHOLDS.acceptableLoadTime) return 'acceptable'
    return 'poor'
  },

  /**
   * Get performance color for UI
   */
  getPerformanceColor(loadTime: number): string {
    const level = AIPerformanceUtils.classifyLoadTime(loadTime)
    
    const colors = {
      excellent: 'text-green-600 bg-green-50 border-green-200',
      good: 'text-blue-600 bg-blue-50 border-blue-200',
      acceptable: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      poor: 'text-red-600 bg-red-50 border-red-200'
    }
    
    return colors[level]
  },

  /**
   * Validate cultural accuracy
   */
  validateCulturalAccuracy(accuracy: number): {
    isValid: boolean
    level: 'excellent' | 'good' | 'acceptable' | 'poor'
    message: string
  } {
    if (accuracy >= PERFORMANCE_THRESHOLDS.targetCulturalAccuracy) {
      return {
        isValid: true,
        level: 'excellent',
        message: 'Excellent Portuguese cultural accuracy'
      }
    }
    
    if (accuracy >= PERFORMANCE_THRESHOLDS.minCulturalAccuracy) {
      return {
        isValid: true,
        level: 'good',
        message: 'Good Portuguese cultural accuracy'
      }
    }
    
    return {
      isValid: false,
      level: 'poor',
      message: 'Portuguese cultural accuracy below minimum threshold'
    }
  },

  /**
   * Get recommendations for performance improvement
   */
  getPerformanceRecommendations(metrics: AIServicePerformanceMetrics): string[] {
    const recommendations: string[] = []
    
    if (metrics.loadTime > PERFORMANCE_THRESHOLDS.acceptableLoadTime) {
      recommendations.push('Consider code splitting or caching to improve load time')
    }
    
    if (metrics.culturalAccuracy < PERFORMANCE_THRESHOLDS.targetCulturalAccuracy) {
      recommendations.push('Enhance Portuguese cultural context training data')
    }
    
    if (metrics.cacheHitRate < 0.8) {
      recommendations.push('Optimize caching strategy for better performance')
    }
    
    if (metrics.responseTime > 200) {
      recommendations.push('Optimize AI model inference time')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Performance is optimal for Portuguese-speaking community needs')
    }
    
    return recommendations
  }
}