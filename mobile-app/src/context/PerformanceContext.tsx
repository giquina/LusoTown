import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PerformanceMonitor, PortugueseCacheManager } from '../utils/performance';

interface PerformanceContextType {
  isOptimizedMode: boolean;
  networkQuality: 'fast' | 'medium' | 'slow' | 'offline';
  batteryLevel: number | null;
  memoryUsage: number | null;
  enableOptimizedMode: () => void;
  disableOptimizedMode: () => void;
  clearCache: () => Promise<void>;
  getPerformanceMetrics: () => Promise<PerformanceMetrics>;
  reportPerformanceIssue: (issue: PerformanceIssue) => void;
}

interface PerformanceMetrics {
  renderTimes: number[];
  apiCallTimes: number[];
  memoryUsage: number[];
  cacheHitRate: number;
  errorCount: number;
}

interface PerformanceIssue {
  type: 'render_slow' | 'api_timeout' | 'memory_high' | 'crash' | 'freeze';
  description: string;
  timestamp: number;
  userAgent?: string;
  stackTrace?: string;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOptimizedMode, setIsOptimizedMode] = useState(false);
  const [networkQuality, setNetworkQuality] = useState<'fast' | 'medium' | 'slow' | 'offline'>('fast');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    renderTimes: [],
    apiCallTimes: [],
    memoryUsage: [],
    cacheHitRate: 0,
    errorCount: 0,
  });

  // Initialize performance monitoring
  useEffect(() => {
    const initializePerformance = async () => {
      try {
        // Load saved performance preferences
        const savedOptimizedMode = await AsyncStorage.getItem('lusotown_optimized_mode');
        if (savedOptimizedMode === 'true') {
          setIsOptimizedMode(true);
        }

        // Start performance monitoring
        PerformanceMonitor.startMonitoring();
        
        console.log('Performance monitoring initialized for Portuguese-speaking community');
      } catch (error) {
        console.error('Error initializing performance monitoring:', error);
      }
    };

    initializePerformance();

    // Monitor app state changes for performance optimization
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        // App going to background - optimize for battery
        PerformanceMonitor.optimizeForBackground();
      } else if (nextAppState === 'active') {
        // App becoming active - resume full performance monitoring
        PerformanceMonitor.resumeFullMonitoring();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
      PerformanceMonitor.stopMonitoring();
    };
  }, []);

  // Monitor network quality
  useEffect(() => {
    const monitorNetworkQuality = async () => {
      try {
        // Simple network quality check - can be enhanced with more sophisticated methods
        const startTime = performance.now();
        
        // Make a small request to test connectivity
        const response = await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache',
        });
        
        const endTime = performance.now();
        const latency = endTime - startTime;
        
        if (response.ok) {
          if (latency < 100) {
            setNetworkQuality('fast');
          } else if (latency < 300) {
            setNetworkQuality('medium');
          } else {
            setNetworkQuality('slow');
          }
        } else {
          setNetworkQuality('offline');
        }
      } catch (error) {
        setNetworkQuality('offline');
      }
    };

    // Check network quality periodically
    monitorNetworkQuality();
    const networkInterval = setInterval(monitorNetworkQuality, 30000); // Every 30 seconds

    return () => clearInterval(networkInterval);
  }, []);

  // Monitor memory usage (simplified)
  useEffect(() => {
    const monitorMemoryUsage = () => {
      // In a real implementation, you'd use a native module to get actual memory usage
      // For now, we'll simulate based on performance metrics
      const estimatedMemoryUsage = performanceMetrics.renderTimes.length * 0.5 + 
                                   performanceMetrics.apiCallTimes.length * 0.3;
      setMemoryUsage(Math.min(estimatedMemoryUsage, 100));
    };

    const memoryInterval = setInterval(monitorMemoryUsage, 10000); // Every 10 seconds

    return () => clearInterval(memoryInterval);
  }, [performanceMetrics]);

  const enableOptimizedMode = useCallback(async () => {
    setIsOptimizedMode(true);
    await AsyncStorage.setItem('lusotown_optimized_mode', 'true');
    
    // Enable Portuguese cultural content caching
    await PortugueseCacheManager.enableAggressiveCaching();
    
    console.log('Optimized mode enabled for Portuguese-speaking community experience');
  }, []);

  const disableOptimizedMode = useCallback(async () => {
    setIsOptimizedMode(false);
    await AsyncStorage.setItem('lusotown_optimized_mode', 'false');
    
    // Disable aggressive caching
    await PortugueseCacheManager.disableAggressiveCaching();
    
    console.log('Optimized mode disabled');
  }, []);

  const clearCache = useCallback(async () => {
    try {
      await PortugueseCacheManager.clearAllCache();
      console.log('Performance cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, []);

  const getPerformanceMetrics = useCallback(async (): Promise<PerformanceMetrics> => {
    try {
      const metrics = await PerformanceMonitor.getMetrics();
      setPerformanceMetrics(metrics);
      return metrics;
    } catch (error) {
      console.error('Error getting performance metrics:', error);
      return performanceMetrics;
    }
  }, [performanceMetrics]);

  const reportPerformanceIssue = useCallback((issue: PerformanceIssue) => {
    // Log performance issue for Portuguese-speaking community experience improvement
    console.warn('Performance issue reported:', issue);
    
    // In a real implementation, you'd send this to your analytics service
    PerformanceMonitor.reportIssue(issue);
    
    // Update error count
    setPerformanceMetrics(prev => ({
      ...prev,
      errorCount: prev.errorCount + 1,
    }));
  }, []);

  const contextValue: PerformanceContextType = {
    isOptimizedMode,
    networkQuality,
    batteryLevel,
    memoryUsage,
    enableOptimizedMode,
    disableOptimizedMode,
    clearCache,
    getPerformanceMetrics,
    reportPerformanceIssue,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
};

export default PerformanceProvider;