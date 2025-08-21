"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// Performance monitoring hook
export function usePerformanceOptimization() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    connectionType: "unknown",
  });
  const startTimeRef = useRef(Date.now());
  const router = useRouter();

  // Preload critical routes
  const preloadRoute = useCallback((route: string) => {
    router.prefetch(route);
  }, [router]);

  // Monitor performance metrics
  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType("paint");
        
        setMetrics(prev => ({
          ...prev,
          loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
          renderTime: paint.find(p => p.name === "first-contentful-paint")?.startTime || 0,
        }));

        // Memory usage (if available)
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          setMetrics(prev => ({
            ...prev,
            memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // MB
          }));
        }

        // Network information
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          setMetrics(prev => ({
            ...prev,
            connectionType: connection.effectiveType || "unknown",
          }));
        }
      }
    };

    // Measure on load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    return () => {
      window.removeEventListener("load", measurePerformance);
    };
  }, []);

  // Critical resource preloading
  const preloadCriticalResources = useCallback(() => {
    const criticalRoutes = [
      "/business-directory",
      "/events",
      "/community",
      "/tv",
    ];

    criticalRoutes.forEach(route => {
      preloadRoute(route);
    });
  }, [preloadRoute]);

  return {
    metrics,
    preloadRoute,
    preloadCriticalResources,
  };
}

// Image optimization hook
export function useImageOptimization() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(img);
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { imgRef, shouldLoad: isIntersecting };
}

// Debounced search hook
export function useDebouncedSearch(value: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Virtual scrolling hook for large lists
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const buffer = Math.floor(visibleCount / 2);
    
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(items.length, start + visibleCount + buffer * 2);
    
    setStartIndex(start);
    setEndIndex(end);
    setVisibleItems(items.slice(start, end));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
  };
}

// Memory management hook
export function useMemoryManagement() {
  const mountedRef = useRef(true);
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set());
  const observersRef = useRef<Set<IntersectionObserver | MutationObserver>>(new Set());

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear all timers
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();

    // Disconnect all observers
    observersRef.current.forEach(observer => observer.disconnect());
    observersRef.current.clear();
  }, []);

  // Safe setTimeout
  const safeSetTimeout = useCallback((callback: () => void, delay: number) => {
    if (!mountedRef.current) return;
    
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        callback();
      }
      timersRef.current.delete(timer);
    }, delay);
    
    timersRef.current.add(timer);
    return timer;
  }, []);

  // Register observer
  const registerObserver = useCallback((observer: IntersectionObserver | MutationObserver) => {
    observersRef.current.add(observer);
    return observer;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  return {
    isMounted: () => mountedRef.current,
    safeSetTimeout,
    registerObserver,
    cleanup,
  };
}

// Bundle size optimization hook
export function useLazyComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>
) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = useCallback(async () => {
    if (Component) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const module = await importFn();
      setComponent(() => module.default);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [importFn, Component]);

  return {
    Component,
    loading,
    error,
    loadComponent,
  };
}