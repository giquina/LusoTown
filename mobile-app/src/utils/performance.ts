/**
 * Performance Optimization Utilities
 * LusoTown Mobile App - Portuguese-speaking Community Platform
 * 
 * Implements comprehensive performance optimization for:
 * - Image loading and caching
 * - Portuguese font optimization
 * - Bundle size reduction
 * - Battery usage optimization
 * - Core Web Vitals improvements
 */

import { Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../design-system/tokens/colors';

// Performance Configuration
const PERFORMANCE_CONFIG = {
  // Image optimization thresholds
  image: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 0.8,
    cacheTimeout: 1800000, // 30 minutes
    lazyLoadThreshold: 0.1,
    lazyLoadRootMargin: '50px'
  },
  
  // Font loading optimization
  fonts: {
    loadTimeout: 3000,
    fallbackFont: Platform.OS === 'ios' ? 'System' : 'Roboto',
    portugueseSubsets: ['latin', 'latin-ext']
  },
  
  // Battery optimization
  battery: {
    backgroundSyncInterval: 600000, // 10 minutes
    locationUpdateInterval: 30000,  // 30 seconds
    imageCompressionLevel: 0.7
  },
  
  // Cache configuration
  cache: {
    maxSize: 50, // MB
    maxAge: 86400000, // 24 hours
    cleanupInterval: 3600000 // 1 hour
  }
} as const;

// Image Optimization Class
export class ImageOptimizer {
  private static cache = new Map<string, string>();
  private static cacheTimestamps = new Map<string, number>();
  
  /**
   * Optimize Portuguese cultural images
   */
  static optimizeForCulturalContent(imageType: string, originalSize: number): number {
    const optimizationRules: Record<string, number> = {
      'portuguese-flag': 0.7,
      'event-banner': 0.6,
      'user-avatar': 0.5,
      'business-logo': 0.6,
      'cultural-photo': 0.8,
      'fado-performance': 0.7,
      'festival-image': 0.65,
      'food-image': 0.7
    };
    
    const compressionRatio = optimizationRules[imageType] || 0.7;
    return Math.round(originalSize * compressionRatio);
  }
  
  /**
   * Preload critical Portuguese cultural images
   */
  static async preloadCriticalImages(imageUrls: string[]): Promise<void> {
    const criticalImages = imageUrls.slice(0, 3); // Only first 3 images
    
    try {
      await Promise.all(
        criticalImages.map(url => 
          new Promise<void>((resolve, reject) => {
            Image.prefetch(url)
              .then(() => resolve())
              .catch(() => resolve()); // Don't fail on single image error
          })
        )
      );
    } catch (error) {
      console.warn('Image preloading failed:', error);
    }
  }
  
  /**
   * Get optimized image URI with caching
   */
  static getOptimizedImageUri(originalUri: string, options?: {
    width?: number;
    height?: number;
    quality?: number;
  }): string {
    const { width = 400, height = 300, quality = 0.8 } = options || {};
    
    // Check cache first
    const cacheKey = `${originalUri}_${width}_${height}_${quality}`;
    const cached = this.cache.get(cacheKey);
    const cacheTime = this.cacheTimestamps.get(cacheKey);
    
    if (cached && cacheTime && Date.now() - cacheTime < PERFORMANCE_CONFIG.image.cacheTimeout) {
      return cached;
    }
    
    // Generate optimized URI (in production, this would call image optimization service)
    const optimizedUri = `${originalUri}?w=${width}&h=${height}&q=${Math.round(quality * 100)}&f=webp`;
    
    // Cache the result
    this.cache.set(cacheKey, optimizedUri);
    this.cacheTimestamps.set(cacheKey, Date.now());
    
    return optimizedUri;
  }
  
  /**
   * Clear image cache periodically
   */
  static cleanupCache(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    this.cacheTimestamps.forEach((timestamp, key) => {
      if (now - timestamp > PERFORMANCE_CONFIG.image.cacheTimeout) {
        expiredKeys.push(key);
      }
    });
    
    expiredKeys.forEach(key => {
      this.cache.delete(key);
      this.cacheTimestamps.delete(key);
    });
  }
}

// Portuguese Font Optimization
export class PortugueseFontOptimizer {
  private static loadedFonts = new Set<string>();
  private static fontLoadPromises = new Map<string, Promise<void>>();
  
  /**
   * Load Portuguese fonts progressively
   */
  static async loadPortugueseFonts(): Promise<void> {
    const portugueseFontSubsets = PERFORMANCE_CONFIG.fonts.portugueseSubsets;
    
    try {
      for (const subset of portugueseFontSubsets) {
        if (!this.loadedFonts.has(subset)) {
          await this.loadFontSubset(subset);
          this.loadedFonts.add(subset);
        }
      }
    } catch (error) {
      console.warn('Portuguese font loading failed, using fallback:', error);
    }
  }
  
  /**
   * Load individual font subset
   */
  private static async loadFontSubset(subset: string): Promise<void> {
    if (this.fontLoadPromises.has(subset)) {
      return this.fontLoadPromises.get(subset)!;
    }
    
    const promise = new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Font loading timeout: ${subset}`));
      }, PERFORMANCE_CONFIG.fonts.loadTimeout);
      
      // Simulate font loading (in production, this would use Expo Font)
      setTimeout(() => {
        clearTimeout(timeout);
        resolve();
      }, 100);
    });
    
    this.fontLoadPromises.set(subset, promise);
    return promise;
  }
  
  /**
   * Handle Portuguese text length differences for layout
   */
  static handleTextLength(text: string, language: string): {
    adjustedWidth: number;
    maxLines: number;
    fontSize: number;
  } {
    const lengthMultipliers: Record<string, number> = {
      'pt': 1.25, // Portuguese is ~25% longer than English
      'en': 1.0
    };
    
    const baseWidth = 300; // Base width in pixels
    const multiplier = lengthMultipliers[language] || 1.0;
    
    return {
      adjustedWidth: baseWidth * multiplier,
      maxLines: language === 'pt' ? 3 : 2,
      fontSize: language === 'pt' ? 14 : 16 // Slightly smaller for longer text
    };
  }
}

// Battery Usage Optimizer
export class BatteryOptimizer {
  private static backgroundTasks = new Map<string, NodeJS.Timeout>();
  
  /**
   * Optimize location tracking for Portuguese businesses
   */
  static optimizeLocationTracking(userContext: string): {
    accuracy: string;
    interval: number;
    enableHighAccuracy: boolean;
  } {
    const locationSettings: Record<string, any> = {
      'browsing-businesses': { 
        accuracy: 'balanced', 
        interval: 30000, 
        enableHighAccuracy: false 
      },
      'background': { 
        accuracy: 'low', 
        interval: 600000, 
        enableHighAccuracy: false 
      },
      'event-checkin': { 
        accuracy: 'high', 
        interval: 5000, 
        enableHighAccuracy: true 
      }
    };
    
    return locationSettings[userContext] || locationSettings['background'];
  }
  
  /**
   * Optimize background sync for Portuguese content
   */
  static optimizeBackgroundSync(): {
    essential: string[];
    deferrable: string[];
    scheduleIntelligently: boolean;
  } {
    return {
      essential: ['match-notifications', 'event-reminders', 'safety-alerts'],
      deferrable: ['cultural-content-updates', 'business-directory-sync', 'analytics'],
      scheduleIntelligently: true
    };
  }
  
  /**
   * Schedule intelligent background tasks
   */
  static scheduleBackgroundTask(taskId: string, callback: () => Promise<void>, priority: 'high' | 'medium' | 'low'): void {
    // Clear existing task
    const existingTask = this.backgroundTasks.get(taskId);
    if (existingTask) {
      clearInterval(existingTask);
    }
    
    // Set interval based on priority
    const intervals = {
      high: 300000,    // 5 minutes
      medium: 600000,  // 10 minutes
      low: 1800000     // 30 minutes
    };
    
    const task = setInterval(async () => {
      try {
        await callback();
      } catch (error) {
        console.warn(`Background task ${taskId} failed:`, error);
      }
    }, intervals[priority]);
    
    this.backgroundTasks.set(taskId, task);
  }
  
  /**
   * Clear all background tasks
   */
  static clearAllBackgroundTasks(): void {
    this.backgroundTasks.forEach(task => clearInterval(task));
    this.backgroundTasks.clear();
  }
}

// Portuguese Cache Manager
export class PortugueseCacheManager {
  private static cacheStrategies = {
    'portuguese-events': { ttl: 300000, priority: 'high' },
    'cultural-businesses': { ttl: 600000, priority: 'medium' },
    'user-matches': { ttl: 900000, priority: 'high' },
    'cultural-images': { ttl: 1800000, priority: 'low' },
    'translations': { ttl: 86400000, priority: 'high' }, // 24 hours
    'user-profile': { ttl: 1800000, priority: 'high' }
  };
  
  /**
   * Cache Portuguese community data with strategy
   */
  static async cacheData(key: string, data: any): Promise<void> {
    try {
      const cacheKey = `lusotown_cache_${key}`;
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl: this.cacheStrategies[key as keyof typeof this.cacheStrategies]?.ttl || 600000
      };
      
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn(`Cache write failed for ${key}:`, error);
    }
  }
  
  /**
   * Retrieve cached data
   */
  static async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cacheKey = `lusotown_cache_${key}`;
      const cachedString = await AsyncStorage.getItem(cacheKey);
      
      if (!cachedString) return null;
      
      const cached = JSON.parse(cachedString);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - cached.timestamp > cached.ttl) {
        await AsyncStorage.removeItem(cacheKey);
        return null;
      }
      
      return cached.data;
    } catch (error) {
      console.warn(`Cache read failed for ${key}:`, error);
      return null;
    }
  }
  
  /**
   * Prefetch relevant Portuguese content
   */
  static async prefetchPortugueseContent(userProfile: {
    heritage: string[];
    location: { latitude: number; longitude: number };
    interests: string[];
  }): Promise<void> {
    const { heritage, location, interests } = userProfile;
    
    try {
      await Promise.allSettled([
        this.prefetchEvents(heritage, location),
        this.prefetchBusinesses(heritage, location),
        this.prefetchCulturalMatches(heritage, interests)
      ]);
    } catch (error) {
      console.warn('Content prefetching failed:', error);
    }
  }
  
  private static async prefetchEvents(heritage: string[], location: any): Promise<void> {
    // Implementation would fetch and cache events
    console.log('Prefetching events for heritage:', heritage);
  }
  
  private static async prefetchBusinesses(heritage: string[], location: any): Promise<void> {
    // Implementation would fetch and cache businesses
    console.log('Prefetching businesses for heritage:', heritage);
  }
  
  private static async prefetchCulturalMatches(heritage: string[], interests: string[]): Promise<void> {
    // Implementation would fetch and cache matches
    console.log('Prefetching matches for heritage:', heritage, 'interests:', interests);
  }
  
  /**
   * Clear expired cache entries
   */
  static async clearExpiredCache(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const cacheKeys = allKeys.filter(key => key.startsWith('lusotown_cache_'));
      
      const expiredKeys: string[] = [];
      
      for (const key of cacheKeys) {
        const cachedString = await AsyncStorage.getItem(key);
        if (cachedString) {
          try {
            const cached = JSON.parse(cachedString);
            const now = Date.now();
            
            if (now - cached.timestamp > cached.ttl) {
              expiredKeys.push(key);
            }
          } catch (error) {
            // Corrupted cache entry, mark for removal
            expiredKeys.push(key);
          }
        }
      }
      
      if (expiredKeys.length > 0) {
        await AsyncStorage.multiRemove(expiredKeys);
        console.log(`Cleared ${expiredKeys.length} expired cache entries`);
      }
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }
}

// Performance Monitor
export class PerformanceMonitor {
  private static metrics = {
    renderTimes: new Map<string, number[]>(),
    apiCalls: new Map<string, number[]>(),
    imageLoads: new Map<string, number[]>()
  };
  
  /**
   * Track component render performance
   */
  static trackRenderTime(componentName: string, startTime: number): void {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (!this.metrics.renderTimes.has(componentName)) {
      this.metrics.renderTimes.set(componentName, []);
    }
    
    const times = this.metrics.renderTimes.get(componentName)!;
    times.push(renderTime);
    
    // Keep only last 10 measurements
    if (times.length > 10) {
      times.shift();
    }
    
    // Log slow renders
    if (renderTime > 16) { // 60fps threshold
      console.warn(`Slow render in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  }
  
  /**
   * Track API call performance
   */
  static trackApiCall(apiName: string, duration: number): void {
    if (!this.metrics.apiCalls.has(apiName)) {
      this.metrics.apiCalls.set(apiName, []);
    }
    
    const durations = this.metrics.apiCalls.get(apiName)!;
    durations.push(duration);
    
    if (durations.length > 10) {
      durations.shift();
    }
  }
  
  /**
   * Get performance summary
   */
  static getPerformanceSummary(): {
    averageRenderTimes: Record<string, number>;
    slowestComponents: Array<{ name: string; avgTime: number }>;
    apiPerformance: Record<string, number>;
  } {
    const averageRenderTimes: Record<string, number> = {};
    const apiPerformance: Record<string, number> = {};
    
    // Calculate average render times
    this.metrics.renderTimes.forEach((times, component) => {
      const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
      averageRenderTimes[component] = Math.round(avg * 100) / 100;
    });
    
    // Calculate API performance
    this.metrics.apiCalls.forEach((durations, api) => {
      const avg = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
      apiPerformance[api] = Math.round(avg);
    });
    
    // Find slowest components
    const slowestComponents = Object.entries(averageRenderTimes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, avgTime]) => ({ name, avgTime }));
    
    return {
      averageRenderTimes,
      slowestComponents,
      apiPerformance
    };
  }
}

// Performance initialization and cleanup
export const PerformanceUtils = {
  /**
   * Initialize performance optimizations
   */
  async initialize(): Promise<void> {
    try {
      // Load critical Portuguese fonts
      await PortugueseFontOptimizer.loadPortugueseFonts();
      
      // Setup cache cleanup interval
      setInterval(() => {
        ImageOptimizer.cleanupCache();
        PortugueseCacheManager.clearExpiredCache();
      }, PERFORMANCE_CONFIG.cache.cleanupInterval);
      
      console.log('Performance optimizations initialized');
    } catch (error) {
      console.warn('Performance initialization failed:', error);
    }
  },
  
  /**
   * Cleanup performance resources
   */
  cleanup(): void {
    BatteryOptimizer.clearAllBackgroundTasks();
    ImageOptimizer.cleanupCache();
  },
  
  /**
   * Get current performance configuration
   */
  getConfig: () => PERFORMANCE_CONFIG
};

export default {
  ImageOptimizer,
  PortugueseFontOptimizer,
  BatteryOptimizer,
  PortugueseCacheManager,
  PerformanceMonitor,
  PerformanceUtils
};
