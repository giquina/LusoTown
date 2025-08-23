'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';

interface MobilePerformanceOptimizerProps {
  enableAggressive?: boolean;
  enableDataSaver?: boolean;
  enableBatteryOptimization?: boolean;
  className?: string;
}

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  inp: number; // Interaction to Next Paint
  ttfb: number; // Time to First Byte
  memoryUsage: number;
  batteryLevel?: number;
  connectionType: string;
  deviceMemory?: number;
  hardwareConcurrency: number;
}

interface OptimizationState {
  isDataSaverMode: boolean;
  isBatteryMode: boolean;
  isSlowConnectionMode: boolean;
  isLowMemoryMode: boolean;
  imageQuality: 'high' | 'medium' | 'low';
  animationsEnabled: boolean;
  preloadingEnabled: boolean;
}

// Portuguese-speaking community mobile optimization priorities
const MOBILE_OPTIMIZATION_CONFIG = {
  dataThresholds: {
    slowConnection: ['slow-2g', '2g', '3g'],
    lowMemory: 2, // GB
    lowBattery: 0.2, // 20%
  },
  contentPriorities: {
    critical: ['events', 'matches', 'community-feed'],
    important: ['business-directory', 'cultural-calendar'],
    defer: ['animations', 'videos', 'large-images'],
  },
  mobileBreakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
  },
};

export default function MobilePerformanceOptimizer({
  enableAggressive = false,
  enableDataSaver = true,
  enableBatteryOptimization = true,
  className = ''
}: MobilePerformanceOptimizerProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Performance states
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [optimizationState, setOptimizationState] = useState<OptimizationState>({
    isDataSaverMode: false,
    isBatteryMode: false,
    isSlowConnectionMode: false,
    isLowMemoryMode: false,
    imageQuality: 'high',
    animationsEnabled: true,
    preloadingEnabled: true,
  });
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationsApplied, setOptimizationsApplied] = useState<string[]>([]);

  // Refs
  const observerRef = useRef<PerformanceObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    initializeMobileOptimization();
    monitorDeviceConditions();
    setupIntersectionObserver();

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (metrics) {
      evaluateOptimizationNeeds();
    }
  }, [metrics]);

  const initializeMobileOptimization = () => {
    // Detect initial device conditions
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const connection = (navigator as any).connection;

    // Initial performance measurement
    measurePerformanceMetrics();

    // Set up performance observer
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          processPerformanceEntries(entries);
        });

        observer.observe({
          entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input']
        });

        observerRef.current = observer;
      } catch (error) {
        console.log('[Mobile Performance] Observer setup failed:', error);
      }
    }

    // Apply initial optimizations based on device
    applyInitialOptimizations(deviceMemory, connection);
  };

  const measurePerformanceMetrics = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    const connection = (navigator as any).connection;

    if (!navigation) return;

    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const memoryInfo = (performance as any).memory;

    const newMetrics: PerformanceMetrics = {
      fcp,
      lcp: 0, // Will be updated by observer
      cls: 0, // Will be updated by observer
      inp: 0, // Will be updated by observer
      ttfb: navigation.responseStart - navigation.navigationStart,
      memoryUsage: memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0,
      connectionType: connection?.effectiveType || 'unknown',
      deviceMemory: (navigator as any).deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency || 2,
    };

    // Get battery information if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setMetrics(prev => prev ? { ...prev, batteryLevel: battery.level } : null);
      }).catch(() => {
        // Battery API not supported
      });
    }

    setMetrics(newMetrics);
  };

  const processPerformanceEntries = (entries: PerformanceEntry[]) => {
    entries.forEach(entry => {
      if (entry.name === 'largest-contentful-paint') {
        setMetrics(prev => prev ? { ...prev, lcp: entry.startTime } : null);
      } else if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        setMetrics(prev => prev ? { 
          ...prev, 
          cls: prev.cls + (entry as any).value 
        } : null);
      } else if (entry.entryType === 'first-input') {
        setMetrics(prev => prev ? { 
          ...prev, 
          inp: (entry as any).processingStart - entry.startTime 
        } : null);
      }
    });
  };

  const monitorDeviceConditions = () => {
    // Monitor network changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const updateConnectionStatus = () => {
        const isSlowConnection = MOBILE_OPTIMIZATION_CONFIG.dataThresholds.slowConnection
          .includes(connection.effectiveType);
        
        setOptimizationState(prev => ({
          ...prev,
          isSlowConnectionMode: isSlowConnection,
          isDataSaverMode: connection.saveData || isSlowConnection,
        }));
      };

      updateConnectionStatus();
      connection.addEventListener('change', updateConnectionStatus);
    }

    // Monitor battery status
    if ('getBattery' in navigator && enableBatteryOptimization) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryStatus = () => {
          const isLowBattery = battery.level <= MOBILE_OPTIMIZATION_CONFIG.dataThresholds.lowBattery;
          
          setOptimizationState(prev => ({
            ...prev,
            isBatteryMode: isLowBattery && !battery.charging,
          }));
        };

        updateBatteryStatus();
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
      }).catch(() => {
        // Battery API not available
      });
    }

    // Monitor memory pressure
    if ((navigator as any).deviceMemory) {
      const deviceMemory = (navigator as any).deviceMemory;
      setOptimizationState(prev => ({
        ...prev,
        isLowMemoryMode: deviceMemory <= MOBILE_OPTIMIZATION_CONFIG.dataThresholds.lowMemory,
      }));
    }
  };

  const setupIntersectionObserver = () => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Lazy load Portuguese cultural content
          const element = entry.target as HTMLElement;
          
          if (element.dataset.src) {
            // Load image
            if (element.tagName === 'IMG') {
              (element as HTMLImageElement).src = element.dataset.src;
              element.removeAttribute('data-src');
            }
          }

          if (element.dataset.component) {
            // Load component
            loadDeferredComponent(element.dataset.component);
          }

          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: optimizationState.isDataSaverMode ? '20px' : '50px',
      threshold: 0.1,
    });

    intersectionObserverRef.current = observer;

    // Observe all lazy-loadable elements
    const lazyElements = document.querySelectorAll('[data-src], [data-component]');
    lazyElements.forEach(el => observer.observe(el));
  };

  const evaluateOptimizationNeeds = () => {
    if (!metrics) return;

    const suggestions: string[] = [];

    // Check Core Web Vitals for mobile optimization needs
    if (metrics.lcp > 2500) {
      suggestions.push('optimize-images');
      suggestions.push('reduce-render-blocking');
    }

    if (metrics.cls > 0.1) {
      suggestions.push('stabilize-layout');
    }

    if (metrics.inp > 200) {
      suggestions.push('optimize-interactions');
      suggestions.push('reduce-javascript');
    }

    if (metrics.memoryUsage > 50) { // 50MB threshold
      suggestions.push('memory-optimization');
    }

    // Apply automatic optimizations if needed
    if (suggestions.length > 0) {
      applyAutomaticOptimizations(suggestions);
    }
  };

  const applyInitialOptimizations = (deviceMemory: number, connection: any) => {
    const optimizations: string[] = [];

    // Low memory device optimizations
    if (deviceMemory <= 2) {
      optimizations.push('low-memory-mode');
      setOptimizationState(prev => ({
        ...prev,
        isLowMemoryMode: true,
        imageQuality: 'low',
        animationsEnabled: false,
        preloadingEnabled: false,
      }));
    }

    // Slow connection optimizations
    if (connection && MOBILE_OPTIMIZATION_CONFIG.dataThresholds.slowConnection.includes(connection.effectiveType)) {
      optimizations.push('data-saver-mode');
      setOptimizationState(prev => ({
        ...prev,
        isDataSaverMode: true,
        imageQuality: prev.imageQuality === 'high' ? 'medium' : prev.imageQuality,
      }));
    }

    if (optimizations.length > 0) {
      setOptimizationsApplied(optimizations);
      addNotification({
        id: 'mobile-optimization',
        type: 'info',
        title: language === 'pt' ? 'Otimização Móvel Ativada' : 'Mobile Optimization Enabled',
        message: language === 'pt' 
          ? 'Ajustes automáticos para melhor performance na sua ligação'
          : 'Automatic adjustments for better performance on your connection',
        duration: 4000
      });
    }
  };

  const applyAutomaticOptimizations = useCallback((suggestions: string[]) => {
    const newOptimizations: string[] = [];

    suggestions.forEach(suggestion => {
      switch (suggestion) {
        case 'optimize-images':
          optimizePortugueseImages();
          newOptimizations.push('image-optimization');
          break;
        case 'reduce-render-blocking':
          deferNonCriticalResources();
          newOptimizations.push('resource-deferring');
          break;
        case 'stabilize-layout':
          stabilizeLayout();
          newOptimizations.push('layout-stabilization');
          break;
        case 'optimize-interactions':
          optimizeTouchInteractions();
          newOptimizations.push('touch-optimization');
          break;
        case 'memory-optimization':
          optimizeMemoryUsage();
          newOptimizations.push('memory-cleanup');
          break;
        default:
          break;
      }
    });

    if (newOptimizations.length > 0) {
      setOptimizationsApplied(prev => [...prev, ...newOptimizations]);
    }
  }, []);

  const optimizePortugueseImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Apply appropriate image quality based on optimization state
      if (optimizationState.imageQuality === 'low') {
        // Convert to lower quality if possible
        if (img.src.includes('?')) {
          img.src += '&q=30';
        } else if (img.src.includes('cloudinary')) {
          img.src = img.src.replace('/upload/', '/upload/q_30,f_auto/');
        }
      } else if (optimizationState.imageQuality === 'medium') {
        if (img.src.includes('?')) {
          img.src += '&q=60';
        } else if (img.src.includes('cloudinary')) {
          img.src = img.src.replace('/upload/', '/upload/q_60,f_auto/');
        }
      }

      // Add lazy loading
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Add proper sizing
      if (!img.sizes && img.srcset) {
        img.sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
      }
    });
  };

  const deferNonCriticalResources = () => {
    // Defer non-critical Portuguese cultural content
    const deferredSelectors = [
      '[data-defer]',
      '.cultural-gallery img',
      '.event-photos img',
      'video[poster]',
    ];

    deferredSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el.tagName === 'IMG') {
          const img = el as HTMLImageElement;
          if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
          }
        }
      });
    });
  };

  const stabilizeLayout = () => {
    // Add explicit dimensions to prevent layout shift
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.width && rect.height) {
        img.style.width = `${rect.width}px`;
        img.style.height = `${rect.height}px`;
      }
    });

    // Add skeleton loaders to prevent content jumping
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(el => {
      el.classList.add('loading-skeleton');
    });
  };

  const optimizeTouchInteractions = () => {
    // Ensure proper touch target sizes for Portuguese mobile users
    const touchTargets = document.querySelectorAll('button, a, [role="button"]');
    
    touchTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        (target as HTMLElement).style.minWidth = '44px';
        (target as HTMLElement).style.minHeight = '44px';
      }
    });

    // Add touch feedback
    document.documentElement.classList.add('touch-optimized');
  };

  const optimizeMemoryUsage = () => {
    // Clear unused cached content
    const cacheKeys = Object.keys(localStorage);
    cacheKeys.forEach(key => {
      if (key.startsWith('lusotown-cached-') && Math.random() > 0.7) {
        try {
          const cached = JSON.parse(localStorage.getItem(key) || '{}');
          const age = Date.now() - (cached.timestamp || 0);
          if (age > 300000) { // 5 minutes old
            localStorage.removeItem(key);
          }
        } catch {
          localStorage.removeItem(key);
        }
      }
    });

    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
  };

  const loadDeferredComponent = async (componentName: string) => {
    try {
      // Dynamic import based on component name
      const componentMap: { [key: string]: () => Promise<any> } = {
        'portuguese-calendar': () => import('@/components/PortugueseCalendar'),
        'cultural-gallery': () => import('@/components/CulturalGallery'),
        'community-feed': () => import('@/components/CommunityFeedSection'),
      };

      if (componentMap[componentName]) {
        await componentMap[componentName]();
      }
    } catch (error) {
      console.log(`[Mobile Performance] Failed to load component ${componentName}:`, error);
    }
  };

  const optimizeMobileExperience = async () => {
    setIsOptimizing(true);

    try {
      const optimizations: string[] = [];

      // Apply comprehensive mobile optimizations
      if (optimizationState.isDataSaverMode || optimizationState.isSlowConnectionMode) {
        await applyDataSaverOptimizations();
        optimizations.push('data-saver');
      }

      if (optimizationState.isBatteryMode) {
        await applyBatteryOptimizations();
        optimizations.push('battery-saver');
      }

      if (optimizationState.isLowMemoryMode) {
        await applyLowMemoryOptimizations();
        optimizations.push('memory-saver');
      }

      // Portuguese-specific mobile optimizations
      await applyPortugueseMobileOptimizations();
      optimizations.push('portuguese-mobile');

      setOptimizationsApplied(prev => [...prev, ...optimizations]);

      addNotification({
        id: 'mobile-optimization-complete',
        type: 'success',
        title: language === 'pt' ? 'Optimização Móvel Completa!' : 'Mobile Optimization Complete!',
        message: language === 'pt' 
          ? 'Experiência otimizada para falantes de português'
          : 'Experience optimized for Portuguese speakers',
        duration: 5000
      });

      // Re-measure performance
      setTimeout(measurePerformanceMetrics, 1000);

    } catch (error) {
      console.error('[Mobile Performance] Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyDataSaverOptimizations = async () => {
    // Reduce image quality
    setOptimizationState(prev => ({ ...prev, imageQuality: 'low' }));
    
    // Disable autoplay videos
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(video => video.removeAttribute('autoplay'));

    // Defer non-critical animations
    document.documentElement.classList.add('data-saver-mode');
    setOptimizationState(prev => ({ ...prev, animationsEnabled: false }));
  };

  const applyBatteryOptimizations = async () => {
    // Disable animations
    setOptimizationState(prev => ({ ...prev, animationsEnabled: false }));
    document.documentElement.classList.add('battery-saver-mode');

    // Reduce screen updates
    const reducedMotion = document.createElement('style');
    reducedMotion.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(reducedMotion);
  };

  const applyLowMemoryOptimizations = async () => {
    // Reduce cached content
    const cacheLimit = 5; // Keep only 5 recent items
    const cacheKeys = Object.keys(localStorage)
      .filter(key => key.startsWith('lusotown-cached-'))
      .slice(cacheLimit);
    
    cacheKeys.forEach(key => localStorage.removeItem(key));

    // Disable preloading
    setOptimizationState(prev => ({ ...prev, preloadingEnabled: false }));
  };

  const applyPortugueseMobileOptimizations = async () => {
    // Optimize for Portuguese content viewing patterns
    const portugueseElements = document.querySelectorAll('[data-portuguese-content]');
    
    portugueseElements.forEach(el => {
      // Ensure proper mobile typography
      el.classList.add('mobile-typography');
      
      // Add touch-friendly spacing
      el.classList.add('mobile-spacing');
    });

    // Preload critical Portuguese resources
    if (optimizationState.preloadingEnabled) {
      const criticalResources = [
        '/api/events?featured=true&limit=5',
        '/api/community/feed?limit=10',
      ];

      criticalResources.forEach(url => {
        fetch(url).catch(() => {
          // Fail silently, this is just optimization
        });
      });
    }
  };

  const cleanup = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }
  };

  const getPerformanceScore = (): 'excellent' | 'good' | 'needs-improvement' | 'poor' => {
    if (!metrics) return 'good';

    let score = 100;

    // Mobile-specific scoring
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;

    if (metrics.inp > 300) score -= 25;
    else if (metrics.inp > 200) score -= 10;

    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 10;

    if (metrics.memoryUsage > 100) score -= 20; // 100MB threshold
    else if (metrics.memoryUsage > 50) score -= 10;

    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  };

  if (typeof window === 'undefined') return null;

  const performanceScore = getPerformanceScore();
  const isMobile = window.innerWidth <= MOBILE_OPTIMIZATION_CONFIG.mobileBreakpoints.md;

  if (!isMobile) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 ${className}`}>
      <div className={`rounded-lg shadow-lg p-3 max-w-xs ${
        performanceScore === 'excellent' ? 'bg-green-50 border border-green-200' :
        performanceScore === 'good' ? 'bg-blue-50 border border-blue-200' :
        performanceScore === 'needs-improvement' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            {language === 'pt' ? 'Performance Móvel' : 'Mobile Performance'}
          </h3>
          <div className={`w-3 h-3 rounded-full ${
            performanceScore === 'excellent' ? 'bg-green-500' :
            performanceScore === 'good' ? 'bg-blue-500' :
            performanceScore === 'needs-improvement' ? 'bg-yellow-500' :
            'bg-red-500'
          }`} />
        </div>

        {metrics && (
          <div className="text-xs text-gray-600 mb-3">
            <div>LCP: {(metrics.lcp / 1000).toFixed(1)}s</div>
            <div>INP: {metrics.inp}ms</div>
            <div>CLS: {metrics.cls.toFixed(3)}</div>
            {optimizationState.isDataSaverMode && (
              <div className="text-orange-600 font-medium">
                {language === 'pt' ? 'Modo Dados' : 'Data Saver'}
              </div>
            )}
            {optimizationState.isBatteryMode && (
              <div className="text-red-600 font-medium">
                {language === 'pt' ? 'Bateria Baixa' : 'Battery Saver'}
              </div>
            )}
          </div>
        )}

        <button
          onClick={optimizeMobileExperience}
          disabled={isOptimizing}
          className={`w-full px-3 py-2 rounded-md text-xs font-medium transition-colors ${
            performanceScore === 'excellent' ? 'bg-green-600 hover:bg-green-700' :
            performanceScore === 'good' ? 'bg-blue-600 hover:bg-blue-700' :
            performanceScore === 'needs-improvement' ? 'bg-yellow-600 hover:bg-yellow-700' :
            'bg-red-600 hover:bg-red-700'
          } text-white disabled:opacity-50`}
        >
          {isOptimizing ? (
            <div className="flex items-center justify-center space-x-1">
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              <span>{language === 'pt' ? 'A otimizar...' : 'Optimizing...'}</span>
            </div>
          ) : (
            <span>
              {language === 'pt' ? 'Otimizar para Móvel' : 'Optimize for Mobile'}
            </span>
          )}
        </button>

        {optimizationsApplied.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {language === 'pt' ? 'Aplicado:' : 'Applied:'} {optimizationsApplied.length} {language === 'pt' ? 'otimizações' : 'optimizations'}
          </div>
        )}
      </div>
    </div>
  );
}