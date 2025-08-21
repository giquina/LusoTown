'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Zap, 
  Image, 
  Network,
  HardDrive,
  Cpu,
  BarChart3,
  Clock,
  Download,
  Upload,
  Wifi,
  WifiOff,
  RefreshCw,
  Gauge,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface PerformanceOptimizationProps {
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableCaching?: boolean;
  enableNetworkAware?: boolean;
  className?: string;
}

interface PerformanceMetrics {
  loadTime: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  ttfb: number; // Time to First Byte
  domSize: number;
  networkType: string;
  connectionSpeed: 'fast' | 'slow' | 'unknown';
}

interface CacheStats {
  totalSize: number;
  itemCount: number;
  hitRate: number;
  lastCleared: string | null;
}

interface NetworkInfo {
  online: boolean;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

// Portuguese cultural content priorities for optimization
const PORTUGUESE_CONTENT_PRIORITIES = {
  high: [
    'portuguese-events',
    'community-matches',
    'business-directory',
    'cultural-calendar'
  ],
  medium: [
    'portuguese-recipes',
    'cultural-articles',
    'community-stories',
    'event-photos'
  ],
  low: [
    'historical-content',
    'language-lessons',
    'cultural-videos',
    'community-gallery'
  ]
};

export default function PerformanceOptimization({
  enableLazyLoading = true,
  enableImageOptimization = true,
  enableCaching = true,
  enableNetworkAware = true,
  className = ''
}: PerformanceOptimizationProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Performance states
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    totalSize: 0,
    itemCount: 0,
    hitRate: 0,
    lastCleared: null
  });
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    online: true,
    effectiveType: '4g',
    downlink: 10,
    rtt: 100,
    saveData: false
  });

  // Optimization states
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lazyLoadingEnabled, setLazyLoadingEnabled] = useState(enableLazyLoading);
  const [imageOptimizationEnabled, setImageOptimizationEnabled] = useState(enableImageOptimization);
  const [cachingEnabled, setCachingEnabled] = useState(enableCaching);
  const [networkAwareEnabled, setNetworkAwareEnabled] = useState(enableNetworkAware);

  // Performance monitoring
  const [performanceScore, setPerformanceScore] = useState<'good' | 'needs-improvement' | 'poor'>('good');
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string[]>([]);

  // Refs for performance observers
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    initializePerformanceMonitoring();
    setupNetworkMonitoring();
    setupLazyLoading();
    checkCacheStats();
    
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (metrics) {
      calculatePerformanceScore();
      generateOptimizationSuggestions();
    }
  }, [metrics]);

  const initializePerformanceMonitoring = () => {
    // Collect initial performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      collectPerformanceMetrics();
      
      // Setup performance observer for ongoing monitoring
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
            });
          });
          
          observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
          performanceObserverRef.current = observer;
        } catch (error) {
        }
      }
    }

    // Monitor Core Web Vitals
    measureCoreWebVitals();
  };

  const collectPerformanceMetrics = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    if (!navigation) return;

    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const domSize = document.querySelectorAll('*').length;

    const newMetrics: PerformanceMetrics = {
      loadTime: navigation.loadEventEnd - navigation.navigationStart,
      fcp,
      lcp: 0, // Will be measured by observer
      cls: 0, // Will be measured by observer
      fid: 0, // Will be measured by observer
      ttfb: navigation.responseStart - navigation.navigationStart,
      domSize,
      networkType: getNetworkType(),
      connectionSpeed: getConnectionSpeed()
    };

    setMetrics(newMetrics);
  };

  const measureCoreWebVitals = () => {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry && metrics) {
            setMetrics(prev => prev ? { ...prev, lcp: lastEntry.startTime } : null);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-input' && metrics) {
              setMetrics(prev => prev ? { ...prev, fid: (entry as any).processingStart - entry.startTime } : null);
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          if (metrics) {
            setMetrics(prev => prev ? { ...prev, cls: clsValue } : null);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

      } catch (error) {
      }
    }
  };

  const setupNetworkMonitoring = () => {
    const updateOnlineStatus = () => {
      setNetworkInfo(prev => ({ ...prev, online: navigator.onLine }));
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Network Information API
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkInfo = () => {
        setNetworkInfo(prev => ({
          ...prev,
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 100,
          saveData: connection.saveData || false
        }));
      };

      updateNetworkInfo();
      connection.addEventListener('change', updateNetworkInfo);
    }
  };

  const setupLazyLoading = () => {
    if (!lazyLoadingEnabled || !('IntersectionObserver' in window)) return;

    const imageSelector = 'img[data-src], [data-background-src]';
    const images = document.querySelectorAll(imageSelector);

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLElement;
          
          if (img.tagName === 'IMG') {
            const imgElement = img as HTMLImageElement;
            const dataSrc = imgElement.getAttribute('data-src');
            if (dataSrc) {
              imgElement.src = dataSrc;
              imgElement.removeAttribute('data-src');
              imgElement.classList.add('fade-in');
            }
          } else {
            const backgroundSrc = img.getAttribute('data-background-src');
            if (backgroundSrc) {
              img.style.backgroundImage = `url(${backgroundSrc})`;
              img.removeAttribute('data-background-src');
              img.classList.add('fade-in');
            }
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
    intersectionObserverRef.current = imageObserver;
  };

  const checkCacheStats = async () => {
    try {
      // Check IndexedDB cache stats
      if ('indexedDB' in window) {
        const cacheSize = await calculateCacheSize();
        const itemCount = await getCacheItemCount();
        
        setCacheStats({
          totalSize: cacheSize,
          itemCount,
          hitRate: getStoredCacheHitRate(),
          lastCleared: localStorage.getItem('lusotown-cache-cleared')
        });
      }
    } catch (error) {
      console.error('[Performance] Cache stats check failed:', error);
    }
  };

  const calculateCacheSize = async (): Promise<number> => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    }
    return 0;
  };

  const getCacheItemCount = async (): Promise<number> => {
    // Count localStorage items related to Portuguese content
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('lusotown-')) {
        count++;
      }
    }
    return count;
  };

  const getStoredCacheHitRate = (): number => {
    const hits = parseInt(localStorage.getItem('lusotown-cache-hits') || '0');
    const misses = parseInt(localStorage.getItem('lusotown-cache-misses') || '0');
    const total = hits + misses;
    return total > 0 ? (hits / total) * 100 : 0;
  };

  const getNetworkType = (): string => {
    if ('connection' in navigator) {
      return (navigator as any).connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  };

  const getConnectionSpeed = (): 'fast' | 'slow' | 'unknown' => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection?.effectiveType) {
        return ['4g', '5g'].includes(connection.effectiveType) ? 'fast' : 'slow';
      }
    }
    return 'unknown';
  };

  const calculatePerformanceScore = () => {
    if (!metrics) return;

    let score = 100;

    // LCP scoring (2.5s good, 4s needs improvement)
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;

    // FID scoring (100ms good, 300ms needs improvement)
    if (metrics.fid > 300) score -= 25;
    else if (metrics.fid > 100) score -= 10;

    // CLS scoring (0.1 good, 0.25 needs improvement)
    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 10;

    // Load time scoring
    if (metrics.loadTime > 3000) score -= 20;
    else if (metrics.loadTime > 2000) score -= 10;

    if (score >= 90) setPerformanceScore('good');
    else if (score >= 50) setPerformanceScore('needs-improvement');
    else setPerformanceScore('poor');
  };

  const generateOptimizationSuggestions = () => {
    if (!metrics) return;

    const suggestions: string[] = [];

    if (metrics.lcp > 2500) {
      suggestions.push(
        language === 'pt' 
          ? 'Otimizar imagens portuguesas para carregamento mais rápido' 
          : 'Optimize Portuguese cultural images for faster loading'
      );
    }

    if (metrics.fid > 100) {
      suggestions.push(
        language === 'pt'
          ? 'Reduzir JavaScript para melhor interatividade'
          : 'Reduce JavaScript for better interactivity'
      );
    }

    if (metrics.cls > 0.1) {
      suggestions.push(
        language === 'pt'
          ? 'Estabilizar layout dos eventos portugueses'
          : 'Stabilize Portuguese events layout'
      );
    }

    if (metrics.domSize > 1500) {
      suggestions.push(
        language === 'pt'
          ? 'Simplificar estrutura da página da comunidade'
          : 'Simplify community page structure'
      );
    }

    if (networkInfo.connectionSpeed === 'slow') {
      suggestions.push(
        language === 'pt'
          ? 'Ativar modo de dados limitados para conteúdo português'
          : 'Enable data saver mode for Portuguese content'
      );
    }

    setOptimizationSuggestions(suggestions);
  };

  const optimizePortugueseContent = useCallback(async () => {
    setIsOptimizing(true);

    try {
      // Preload high-priority Portuguese cultural content
      const highPriorityContent = PORTUGUESE_CONTENT_PRIORITIES.high;
      
      for (const contentType of highPriorityContent) {
        try {
          // Simulate preloading Portuguese cultural content
          await preloadContent(contentType);
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
        }
      }

      // Optimize images for Portuguese cultural content
      if (imageOptimizationEnabled) {
        await optimizePortugueseImages();
      }

      // Clear old cache for Portuguese content
      if (cachingEnabled) {
        await clearOldPortugueseCache();
      }

      // Apply network-aware optimizations
      if (networkAwareEnabled && networkInfo.connectionSpeed === 'slow') {
        await applyDataSaverMode();
      }

      addNotification({
        id: 'optimization-complete',
        type: 'success',
        title: language === 'pt' ? 'Otimização Concluída!' : 'Optimization Complete!',
        message: language === 'pt' 
          ? 'Conteúdo português otimizado para melhor performance' 
          : 'Portuguese content optimized for better performance',
        duration: 5000
      });

      // Recalculate metrics
      setTimeout(collectPerformanceMetrics, 1000);

    } catch (error) {
      console.error('[Performance] Optimization failed:', error);
      addNotification({
        id: 'optimization-error',
        type: 'error',
        title: language === 'pt' ? 'Erro na Otimização' : 'Optimization Error',
        message: language === 'pt' 
          ? 'Não foi possível otimizar o conteúdo' 
          : 'Could not optimize content',
        duration: 5000
      });
    } finally {
      setIsOptimizing(false);
    }
  }, [imageOptimizationEnabled, cachingEnabled, networkAwareEnabled, networkInfo, language]);

  const preloadContent = async (contentType: string) => {
    const endpoints = {
      'portuguese-events': '/api/events?featured=true&portuguese=true',
      'community-matches': '/api/matches?priority=high',
      'business-directory': '/api/businesses?portuguese=true&verified=true',
      'cultural-calendar': '/api/cultural-calendar?upcoming=true'
    };

    const endpoint = endpoints[contentType as keyof typeof endpoints];
    if (endpoint) {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        
        // Cache the response for quick access
        if (cachingEnabled) {
          localStorage.setItem(`lusotown-cached-${contentType}`, JSON.stringify({
            data,
            timestamp: Date.now(),
            expires: Date.now() + 3600000 // 1 hour
          }));
        }
      }
    }
  };

  const optimizePortugueseImages = async () => {
    const images = document.querySelectorAll('img');
    
    for (const img of images) {
      if (img.src && img.src.includes('portuguese') || img.alt.includes('portuguese')) {
        // Apply lazy loading if not already applied
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }

        // Apply appropriate sizing
        if (!img.sizes && img.srcset) {
          img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        }
      }
    }
  };

  const clearOldPortugueseCache = async () => {
    const now = Date.now();
    const keys = Object.keys(localStorage);
    
    for (const key of keys) {
      if (key.startsWith('lusotown-cached-')) {
        try {
          const cached = JSON.parse(localStorage.getItem(key) || '{}');
          if (cached.expires && cached.expires < now) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          // Invalid cache entry, remove it
          localStorage.removeItem(key);
        }
      }
    }

    setCacheStats(prev => ({
      ...prev,
      lastCleared: new Date().toISOString()
    }));
  };

  const applyDataSaverMode = async () => {
    // Reduce image quality for Portuguese content
    document.documentElement.classList.add('data-saver-mode');
    
    // Disable auto-playing videos
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
      video.removeAttribute('autoplay');
    });

    // Defer non-critical Portuguese cultural content
    const deferredElements = document.querySelectorAll('[data-defer-loading]');
    deferredElements.forEach(element => {
      element.setAttribute('style', 'display: none;');
    });
  };

  const clearAllCache = async () => {
    try {
      // Clear localStorage
      const keys = Object.keys(localStorage);
      keys.filter(key => key.startsWith('lusotown-')).forEach(key => {
        localStorage.removeItem(key);
      });

      // Clear service worker caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.includes('lusotown') || cacheName.includes('portuguese')) {
              return caches.delete(cacheName);
            }
          })
        );
      }

      setCacheStats({
        totalSize: 0,
        itemCount: 0,
        hitRate: 0,
        lastCleared: new Date().toISOString()
      });

      addNotification({
        id: 'cache-cleared',
        type: 'success',
        title: language === 'pt' ? 'Cache Limpo!' : 'Cache Cleared!',
        message: language === 'pt' 
          ? 'Dados antigos da comunidade portuguesa removidos' 
          : 'Old Portuguese community data removed',
        duration: 3000
      });

    } catch (error) {
      console.error('[Performance] Cache clear failed:', error);
    }
  };

  const cleanup = () => {
    if (performanceObserverRef.current) {
      performanceObserverRef.current.disconnect();
    }
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatMilliseconds = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Performance Score */}
      <div className={`rounded-lg p-6 ${
        performanceScore === 'good' ? 'bg-green-50 border border-green-200' :
        performanceScore === 'needs-improvement' ? 'bg-yellow-50 border border-yellow-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {performanceScore === 'good' && <CheckCircle className="h-8 w-8 text-action-600" />}
            {performanceScore === 'needs-improvement' && <Clock className="h-8 w-8 text-yellow-600" />}
            {performanceScore === 'poor' && <AlertTriangle className="h-8 w-8 text-coral-600" />}
          </div>
          <div className="flex-1">
            <h2 className={`text-lg font-semibold ${
              performanceScore === 'good' ? 'text-green-900' :
              performanceScore === 'needs-improvement' ? 'text-yellow-900' :
              'text-red-900'
            }`}>
              {language === 'pt' ? 'Performance da Comunidade' : 'Community Performance'}
            </h2>
            <p className={`text-sm mt-1 ${
              performanceScore === 'good' ? 'text-green-700' :
              performanceScore === 'needs-improvement' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {performanceScore === 'good' && (language === 'pt' ? 'Excelente performance para conteúdo português' : 'Excellent performance for Portuguese content')}
              {performanceScore === 'needs-improvement' && (language === 'pt' ? 'Performance pode ser melhorada' : 'Performance can be improved')}
              {performanceScore === 'poor' && (language === 'pt' ? 'Performance precisa de otimização urgente' : 'Performance needs urgent optimization')}
            </p>
          </div>
          <button
            onClick={optimizePortugueseContent}
            disabled={isOptimizing}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              performanceScore === 'good' ? 'bg-action-600 hover:bg-green-700' :
              performanceScore === 'needs-improvement' ? 'bg-yellow-600 hover:bg-yellow-700' :
              'bg-coral-600 hover:bg-red-700'
            } text-white disabled:opacity-50`}
          >
            {isOptimizing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>{language === 'pt' ? 'A otimizar...' : 'Optimizing...'}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>{language === 'pt' ? 'Otimizar' : 'Optimize'}</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-600" />
              <h3 className="font-medium text-gray-900">
                {language === 'pt' ? 'Tempo de Carregamento' : 'Load Time'}
              </h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {formatMilliseconds(metrics.loadTime)}
            </p>
            <p className="text-sm text-secondary-600">
              {language === 'pt' ? 'Página completa' : 'Full page load'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Gauge className="h-5 w-5 text-action-600" />
              <h3 className="font-medium text-gray-900">LCP</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {formatMilliseconds(metrics.lcp)}
            </p>
            <p className="text-sm text-secondary-600">
              {language === 'pt' ? 'Conteúdo principal' : 'Largest content'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <h3 className="font-medium text-gray-900">CLS</h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {metrics.cls.toFixed(3)}
            </p>
            <p className="text-sm text-secondary-600">
              {language === 'pt' ? 'Estabilidade visual' : 'Visual stability'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              {networkInfo.online ? (
                <Wifi className="h-5 w-5 text-action-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-coral-600" />
              )}
              <h3 className="font-medium text-gray-900">
                {language === 'pt' ? 'Rede' : 'Network'}
              </h3>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {networkInfo.effectiveType.toUpperCase()}
            </p>
            <p className="text-sm text-secondary-600">
              {networkInfo.downlink}Mbps • {networkInfo.rtt}ms
            </p>
          </div>
        </div>
      )}

      {/* Cache Statistics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <HardDrive className="h-5 w-5 text-secondary-600" />
            <span>{language === 'pt' ? 'Cache da Comunidade' : 'Community Cache'}</span>
          </h3>
          <button
            onClick={clearAllCache}
            className="text-coral-600 hover:text-red-800 text-sm font-medium"
          >
            {language === 'pt' ? 'Limpar Cache' : 'Clear Cache'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-secondary-600">{language === 'pt' ? 'Tamanho Total' : 'Total Size'}</p>
            <p className="text-lg font-semibold text-gray-900">{formatBytes(cacheStats.totalSize)}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-600">{language === 'pt' ? 'Itens' : 'Items'}</p>
            <p className="text-lg font-semibold text-gray-900">{cacheStats.itemCount}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-600">{language === 'pt' ? 'Taxa de Acerto' : 'Hit Rate'}</p>
            <p className="text-lg font-semibold text-gray-900">{cacheStats.hitRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-secondary-600">{language === 'pt' ? 'Última Limpeza' : 'Last Cleared'}</p>
            <p className="text-lg font-semibold text-gray-900">
              {cacheStats.lastCleared 
                ? new Date(cacheStats.lastCleared).toLocaleDateString()
                : language === 'pt' ? 'Nunca' : 'Never'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      {optimizationSuggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            {language === 'pt' ? 'Sugestões de Otimização' : 'Optimization Suggestions'}
          </h3>
          <ul className="space-y-2">
            {optimizationSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2 text-blue-800">
                <span className="text-primary-600 mt-1">•</span>
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Feature Toggles */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'pt' ? 'Otimizações Ativas' : 'Active Optimizations'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image className="h-5 w-5 text-action-600" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {language === 'pt' ? 'Carregamento Lazy' : 'Lazy Loading'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {language === 'pt' ? 'Imagens portuguesas carregadas sob demanda' : 'Portuguese images loaded on demand'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLazyLoadingEnabled(!lazyLoadingEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                lazyLoadingEnabled ? 'bg-action-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                lazyLoadingEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cpu className="h-5 w-5 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {language === 'pt' ? 'Otimização de Imagens' : 'Image Optimization'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {language === 'pt' ? 'Compressão automática de conteúdo cultural' : 'Automatic cultural content compression'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setImageOptimizationEnabled(!imageOptimizationEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                imageOptimizationEnabled ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                imageOptimizationEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Network className="h-5 w-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {language === 'pt' ? 'Modo Rede Inteligente' : 'Network-Aware Mode'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {language === 'pt' ? 'Adapta conteúdo à velocidade da ligação' : 'Adapts content to connection speed'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setNetworkAwareEnabled(!networkAwareEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${
                networkAwareEnabled ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                networkAwareEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}