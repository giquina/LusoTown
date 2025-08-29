/**
 * Bundle Optimizer Component for Portuguese-speaking Community Platform
 * Implements advanced code splitting and performance optimizations
 */

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Performance monitoring
interface PerformanceMetrics {
  bundleSize: number;
  loadTime: number;
  componentsLoaded: number;
  memoryUsage: number;
  coreWebVitals: {
    CLS: number;
    FID: number;
    LCP: number;
    FCP: number;
    TTFB: number;
  };
}

// Advanced dynamic imports for Portuguese community features
export const LazyPortugueseComponents = {
  // Events Components
  EventDiscovery: dynamic(() => import('@/components/events/EventDiscovery'), {
    ssr: false,
    loading: () => <div className="h-64 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  EventCard: dynamic(() => import('@/components/events/EventCard'), {
    ssr: true,
    loading: () => <div className="h-40 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  // Business Components
  BusinessDirectory: dynamic(() => import('@/components/business/BusinessDirectory'), {
    ssr: false,
    loading: () => <div className="h-96 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  BusinessMap: dynamic(() => import('@/components/BusinessMap'), {
    ssr: false,
    loading: () => <div className="h-64 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  // Cultural Components
  LusophoneCarousel: dynamic(() => import('@/components/carousels/LusophoneCarousel'), {
    ssr: true,
    loading: () => <div className="h-48 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  CulturalCalendar: dynamic(() => import('@/components/CulturalCalendar'), {
    ssr: false,
    loading: () => <div className="h-80 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  // Community Features
  CommunityFeed: dynamic(() => import('@/components/community/CommunityFeed'), {
    ssr: false,
    loading: () => <div className="space-y-4">{Array(3).fill(0).map((_, i) => <div key={i} className="h-32 bg-primary-50 animate-pulse rounded-lg" />)}</div>
  }),
  
  // Mobile-specific Components
  MobileNavigation: dynamic(() => import('@/components/mobile/MobileNavigation'), {
    ssr: false,
    loading: () => null
  }),
  
  TouchGestureHandler: dynamic(() => import('@/components/mobile/TouchGestureHandler'), {
    ssr: false,
    loading: () => null
  }),
  
  // Advanced Features
  AIMatchingEngine: dynamic(() => import('@/components/matching/AIMatchingEngine'), {
    ssr: false,
    loading: () => <div className="h-64 bg-primary-50 animate-pulse rounded-lg" />
  }),
  
  StreamingPlayer: dynamic(() => import('@/components/streaming/StreamingPlayer'), {
    ssr: false,
    loading: () => <div className="h-64 bg-black animate-pulse rounded-lg" />
  })
};

// Bundle size analyzer hook
export function useBundleAnalytics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const analyzeBundle = async () => {
      setIsAnalyzing(true);
      
      try {
        // Measure bundle performance
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        
        // Web Vitals measurement
        const webVitals = {
          CLS: 0,
          FID: 0,
          LCP: 0,
          FCP: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          TTFB: navigationEntry?.responseStart || 0
        };
        
        // Memory usage (if available)
        const memoryInfo = (performance as any).memory;
        const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0;
        
        // Component count estimation
        const componentsLoaded = document.querySelectorAll('[data-component]').length;
        
        const newMetrics: PerformanceMetrics = {
          bundleSize: 0, // Will be calculated from network entries
          loadTime: navigationEntry?.loadEventEnd - navigationEntry?.navigationStart || 0,
          componentsLoaded,
          memoryUsage,
          coreWebVitals: webVitals
        };
        
        setMetrics(newMetrics);
        
        // Report to analytics
        if (window.gtag) {
          window.gtag('event', 'portuguese_bundle_performance', {
            event_category: 'Performance',
            load_time: newMetrics.loadTime,
            memory_usage: newMetrics.memoryUsage,
            components_count: newMetrics.componentsLoaded
          });
        }
        
      } catch (error) {
        console.warn('Bundle analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    // Run analysis after page load
    if (document.readyState === 'complete') {
      analyzeBundle();
    } else {
      window.addEventListener('load', analyzeBundle);
      return () => window.removeEventListener('load', analyzeBundle);
    }
  }, []);
  
  return { metrics, isAnalyzing };
}

// Code splitting utility for Portuguese community features
export function createPortugueseComponentLoader<T = any>(
  componentPath: string,
  fallbackComponent?: React.ComponentType<T>
) {
  return dynamic(
    () => import(componentPath).catch(() => {
      console.warn(`Failed to load Portuguese component: ${componentPath}`);
      return { default: fallbackComponent || (() => null) };
    }),
    {
      ssr: false,
      loading: () => (
        <div className="animate-pulse bg-primary-50 rounded-lg p-4">
          <div className="flex items-center justify-center h-32">
            <div className="text-primary-600 font-medium">
              Loading Portuguese community feature...
            </div>
          </div>
        </div>
      )
    }
  );
}

// Performance optimization component
export default function BundleOptimizer({ children }: { children: React.ReactNode }) {
  const { metrics, isAnalyzing } = useBundleAnalytics();
  const [optimizationsEnabled, setOptimizationsEnabled] = useState(false);
  
  useEffect(() => {
    // Enable optimizations based on device capabilities
    const enableOptimizations = () => {
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (connection.effectiveType === '2g' || connection.effectiveType === '3g');
      const isLowMemory = metrics && metrics.memoryUsage > 50; // MB threshold
      
      setOptimizationsEnabled(isSlowConnection || isLowMemory);
    };
    
    enableOptimizations();
  }, [metrics]);
  
  useEffect(() => {
    if (!optimizationsEnabled) return;
    
    // Implement performance optimizations for Portuguese community platform
    const optimizations = {
      // Reduce image quality for slow connections
      optimizeImages: () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src.includes('unsplash.com')) {
            img.src = img.src.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=60');
          }
        });
      },
      
      // Defer non-critical animations
      reduceAnimations: () => {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
      },
      
      // Optimize carousel performance
      optimizeCarousels: () => {
        const carousels = document.querySelectorAll('[data-carousel]');
        carousels.forEach(carousel => {
          carousel.setAttribute('data-lazy-load', 'true');
        });
      }
    };
    
    // Apply optimizations
    Object.values(optimizations).forEach(optimization => {
      try {
        optimization();
      } catch (error) {
        console.warn('Optimization failed:', error);
      }
    });
  }, [optimizationsEnabled]);
  
  // Performance debug overlay (development only)
  const showDebugInfo = process.env.NODE_ENV === 'development' && metrics;
  
  return (
    <>
      {children}
      
      {showDebugInfo && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded-lg font-mono z-50">
          <div>Load: {Math.round(metrics.loadTime)}ms</div>
          <div>Memory: {Math.round(metrics.memoryUsage)}MB</div>
          <div>Components: {metrics.componentsLoaded}</div>
          <div>FCP: {Math.round(metrics.coreWebVitals.FCP)}ms</div>
          {optimizationsEnabled && <div className="text-yellow-400">Optimized</div>}
        </div>
      )}
    </>
  );
}

// Portuguese-specific chunk loading strategy
export const PortugueseChunkLoader = {
  // Core Portuguese features (high priority)
  loadCoreFeatures: () => {
    return Promise.all([
      import('@/components/events/EventCard'),
      import('@/components/business/BusinessCard'),
      import('@/components/carousels/LusophoneCarousel')
    ]);
  },
  
  // Advanced features (lazy load)
  loadAdvancedFeatures: () => {
    return Promise.all([
      import('@/components/matching/AIMatchingEngine'),
      import('@/components/streaming/StreamingPlayer'),
      import('@/components/community/CommunityFeed')
    ]);
  },
  
  // Mobile-specific features
  loadMobileFeatures: () => {
    return Promise.all([
      import('@/components/mobile/MobileNavigation'),
      import('@/components/mobile/TouchGestureHandler'),
      import('@/components/mobile/MobileCarousel')
    ]);
  }
};

// Export component preloader for critical pages
export function preloadPortugueseComponents(pageType: string) {
  if (typeof window === 'undefined') return;
  
  const preloadMap = {
    home: PortugueseChunkLoader.loadCoreFeatures,
    events: () => Promise.all([
      import('@/components/events/EventDiscovery'),
      import('@/components/events/EventCard'),
      import('@/components/CulturalCalendar')
    ]),
    business: () => Promise.all([
      import('@/components/business/BusinessDirectory'),
      import('@/components/BusinessMap'),
      import('@/components/business/BusinessCard')
    ]),
    community: () => Promise.all([
      import('@/components/community/CommunityFeed'),
      import('@/components/community/CommunityStats'),
      import('@/components/matching/CulturalCompatibility')
    ])
  };
  
  const preloader = preloadMap[pageType as keyof typeof preloadMap];
  if (preloader) {
    // Preload after initial render
    setTimeout(preloader, 100);
  }
}