// High-performance caching utilities for transport services

interface CacheEntry<T> {
  data: T
  timestamp: number
  expires: number
  key: string
  version: number
}

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum cache size
  version?: number // Cache version for invalidation
}

class TransportCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes
  private readonly maxSize: number
  private readonly version: number
  private accessTimes = new Map<string, number>()
  
  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100
    this.version = options.version || 1
  }

  set(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL
    const now = Date.now()
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expires: now + ttl,
      key,
      version: options.version || this.version
    }

    // Enforce cache size limit using LRU eviction
    if (this.cache.size >= this.maxSize) {
      this.evictLRU()
    }

    this.cache.set(key, entry)
    this.accessTimes.set(key, now)
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    const now = Date.now()
    
    // Check if expired or version mismatch
    if (now > entry.expires || entry.version !== this.version) {
      this.cache.delete(key)
      this.accessTimes.delete(key)
      return null
    }

    // Update access time for LRU
    this.accessTimes.set(key, now)
    
    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): boolean {
    this.accessTimes.delete(key)
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
    this.accessTimes.clear()
  }

  // Evict least recently used item
  private evictLRU(): void {
    let oldestTime = Date.now()
    let oldestKey = ''
    
    for (const [key, accessTime] of this.accessTimes.entries()) {
      if (accessTime < oldestTime) {
        oldestTime = accessTime
        oldestKey = key
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey)
      this.accessTimes.delete(oldestKey)
    }
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    const expiredKeys: string[] = []
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires || entry.version !== this.version) {
        expiredKeys.push(key)
      }
    }
    
    expiredKeys.forEach(key => {
      this.cache.delete(key)
      this.accessTimes.delete(key)
    })
  }

  // Get cache statistics
  getStats(): {
    size: number
    maxSize: number
    hitRate: number
    version: number
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // Would need hit/miss tracking for accurate rate
      version: this.version
    }
  }

  // Get or set with async function
  async getOrSet(
    key: string, 
    factory: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    const cached = this.get(key)
    
    if (cached !== null) {
      return cached
    }
    
    const data = await factory()
    this.set(key, data, options)
    
    return data
  }
}

// Specialized cache for pricing calculations
class PricingCache extends TransportCache<any> {
  constructor() {
    super({ 
      ttl: 10 * 60 * 1000, // 10 minutes for pricing
      maxSize: 200,
      version: 1
    })
  }

  generatePricingKey(
    serviceId: string,
    serviceType: 'tier' | 'package',
    duration: number,
    date: string,
    membershipLevel?: string,
    additionalParams?: Record<string, any>
  ): string {
    const params = {
      serviceId,
      serviceType,
      duration,
      date: date.split('T')[0], // Use date only, ignore time
      membershipLevel: membershipLevel || 'free',
      ...additionalParams
    }
    
    return `pricing:${JSON.stringify(params)}`
  }

  // Invalidate pricing for specific service
  invalidateService(serviceId: string): void {
    const keysToDelete: string[] = []
    
    for (const [key] of this.cache.entries()) {
      if (key.includes(`"serviceId":"${serviceId}"`)) {
        keysToDelete.push(key)
      }
    }
    
    keysToDelete.forEach(key => this.delete(key))
  }

  // Invalidate all pricing for a specific date (e.g., when seasonal pricing changes)
  invalidateDate(date: string): void {
    const dateStr = date.split('T')[0]
    const keysToDelete: string[] = []
    
    for (const [key] of this.cache.entries()) {
      if (key.includes(`"date":"${dateStr}"`)) {
        keysToDelete.push(key)
      }
    }
    
    keysToDelete.forEach(key => this.delete(key))
  }
}

// Specialized cache for service availability
class AvailabilityCache extends TransportCache<boolean> {
  constructor() {
    super({ 
      ttl: 2 * 60 * 1000, // 2 minutes for availability
      maxSize: 500,
      version: 1
    })
  }

  generateAvailabilityKey(
    serviceId: string,
    date: string,
    time: string
  ): string {
    return `availability:${serviceId}:${date}:${time}`
  }
}

// Form state cache for better UX
class FormStateCache extends TransportCache<any> {
  constructor() {
    super({ 
      ttl: 30 * 60 * 1000, // 30 minutes for form state
      maxSize: 50,
      version: 1
    })
  }

  saveFormState(sessionId: string, formData: any): void {
    this.set(`form:${sessionId}`, formData, { ttl: 30 * 60 * 1000 })
  }

  loadFormState(sessionId: string): any | null {
    return this.get(`form:${sessionId}`)
  }

  clearFormState(sessionId: string): void {
    this.delete(`form:${sessionId}`)
  }
}

// Cache manager to coordinate all caches
class TransportCacheManager {
  public pricing = new PricingCache()
  public availability = new AvailabilityCache()
  public formState = new FormStateCache()
  
  private cleanupInterval: NodeJS.Timeout
  
  constructor() {
    // Auto-cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }
  
  cleanup(): void {
    this.pricing.cleanup()
    this.availability.cleanup()
    this.formState.cleanup()
  }
  
  clearAll(): void {
    this.pricing.clear()
    this.availability.clear()
    this.formState.clear()
  }
  
  getStats(): {
    pricing: ReturnType<PricingCache['getStats']>
    availability: ReturnType<AvailabilityCache['getStats']>
    formState: ReturnType<FormStateCache['getStats']>
  } {
    return {
      pricing: this.pricing.getStats(),
      availability: this.availability.getStats(),
      formState: this.formState.getStats()
    }
  }
  
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.clearAll()
  }
}

// Singleton instance
export const transportCache = new TransportCacheManager()

// Memory-efficient debounce utility for frequent operations
export class DebounceManager {
  private timeouts = new Map<string, NodeJS.Timeout>()
  
  debounce<T extends (...args: any[]) => any>(
    key: string,
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const existingTimeout = this.timeouts.get(key)
      
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }
      
      const timeout = setTimeout(() => {
        this.timeouts.delete(key)
        func(...args)
      }, delay)
      
      this.timeouts.set(key, timeout)
    }
  }
  
  cancel(key: string): void {
    const timeout = this.timeouts.get(key)
    if (timeout) {
      clearTimeout(timeout)
      this.timeouts.delete(key)
    }
  }
  
  cancelAll(): void {
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout)
    }
    this.timeouts.clear()
  }
}

export const debounceManager = new DebounceManager()

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics = new Map<string, number[]>()
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  startTiming(key: string): () => void {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (!this.metrics.has(key)) {
        this.metrics.set(key, [])
      }
      
      const metrics = this.metrics.get(key)!
      metrics.push(duration)
      
      // Keep only last 100 measurements
      if (metrics.length > 100) {
        metrics.shift()
      }
    }
  }
  
  getAverageTime(key: string): number {
    const metrics = this.metrics.get(key)
    if (!metrics || metrics.length === 0) return 0
    
    return metrics.reduce((sum, time) => sum + time, 0) / metrics.length
  }
  
  getMetrics(): Record<string, { average: number; count: number }> {
    const result: Record<string, { average: number; count: number }> = {}
    
    for (const [key, metrics] of this.metrics.entries()) {
      result[key] = {
        average: this.getAverageTime(key),
        count: metrics.length
      }
    }
    
    return result
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()

// Export types for use in components
export type { CacheOptions, CacheEntry }