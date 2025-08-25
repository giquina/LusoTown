/**
 * Mobile Performance Optimization Engine for LusoTown
 * 
 * Comprehensive mobile performance optimization system for Portuguese-speaking community,
 * including critical path rendering, resource prioritization, and Portuguese cultural content optimization.
 */

import { PWA_ENHANCEMENT_CONFIG } from '@/config/mobile-app';

export interface PerformanceMetrics {
  // Core Web Vitals for Portuguese Cultural Content
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  
  // Mobile-specific metrics
  timeToInteractive?: number;
  totalBlockingTime?: number;
  resourceLoadTime: Record<string, number>;
  criticalPathComplete?: number;
  
  // Portuguese cultural optimization metrics
  culturalContentLoadTime?: number;
  lusophoneImageOptimization?: number;
  bilingualRenderTime?: number;
  
  // Connection awareness
  connectionType?: string;
  effectiveConnectionType?: string;
  downloadSpeed?: number;
  rtt?: number;
}

export interface PerformanceOptimization {
  criticalCSS: string[];
  deferredResources: string[];
  preloadResources: string[];
  culturalAssetPriorities: Record<string, number>;
  compressionSettings: Record<string, any>;
}

export interface CulturalContentConfig {
  portugueseEventImages: string[];
  lusophoneBusinessLogos: string[];
  culturalCelebrationAssets: string[];
  bilingualFontOptimization: boolean;
  heritageColorOptimization: boolean;
}

/**
 * Mobile Performance Optimization Manager
 */
export class MobilePerformanceOptimizer {
  private static instance: MobilePerformanceOptimizer;
  private metrics: PerformanceMetrics = { resourceLoadTime: {} };
  private observer: PerformanceObserver | null = null;
  private culturalContentConfig: CulturalContentConfig;
  private isLowEndDevice: boolean = false;
  private connectionQuality: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown' = 'unknown';

  private constructor() {
    this.culturalContentConfig = {
      portugueseEventImages: [
        '/events/fado-night.webp',
        '/events/festa-junina.webp', 
        '/events/santo-antonio.webp',
        '/events/portuguese-festival.webp'
      ],
      lusophoneBusinessLogos: [
        '/businesses/portuguese-restaurant.webp',
        '/businesses/brazilian-services.webp',
        '/businesses/angolan-culture.webp'
      ],
      culturalCelebrationAssets: [
        '/cultural/azulejos-pattern.webp',
        '/cultural/portuguese-flag.webp',
        '/cultural/fado-guitar.webp'
      ],
      bilingualFontOptimization: true,
      heritageColorOptimization: true
    };
  }

  public static getInstance(): MobilePerformanceOptimizer {
    if (!MobilePerformanceOptimizer.instance) {
      MobilePerformanceOptimizer.instance = new MobilePerformanceOptimizer();
    }
    return MobilePerformanceOptimizer.instance;
  }

  /**
   * Initialize mobile performance optimization for Portuguese community
   */
  public async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    console.log('[Mobile Performance] Initializing Portuguese cultural optimization...');

    try {
      // Detect device capabilities
      await this.detectDeviceCapabilities();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Optimize critical rendering path
      await this.optimizeCriticalPath();
      
      // Setup connection-aware optimizations
      this.setupConnectionAwareness();
      
      // Optimize Portuguese cultural content
      await this.optimizePortugueseCulturalContent();
      
      // Setup lazy loading for non-critical resources
      this.setupLazyLoading();
      
      console.log('[Mobile Performance] Portuguese cultural optimization initialized');
    } catch (error) {
      console.error('[Mobile Performance] Initialization failed:', error);
    }
  }

  /**
   * Detect device capabilities for optimization strategy
   */
  private async detectDeviceCapabilities(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Memory detection (Chrome only)
      const deviceMemory = (navigator as any).deviceMemory || 4;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      
      // Low-end device detection
      this.isLowEndDevice = deviceMemory <= 2 || hardwareConcurrency <= 2;
      
      // Connection quality detection
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        this.connectionQuality = connection.effectiveType || 'unknown';
      }
      
      console.log(`[Mobile Performance] Device capabilities: Memory=${deviceMemory}GB, Cores=${hardwareConcurrency}, Connection=${this.connectionQuality}, LowEnd=${this.isLowEndDevice}`);
    } catch (error) {
      console.warn('[Mobile Performance] Could not detect device capabilities:', error);
    }
  }

  /**
   * Setup performance monitoring for Portuguese cultural content
   */
  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        for (const entry of entries) {
          this.processPerformanceEntry(entry);
        }
      });

      // Observe different types of performance entries
      this.observer.observe({ entryTypes: ['navigation', 'resource', 'paint', 'layout-shift', 'largest-contentful-paint'] });
      
      // Setup Web Vitals monitoring
      this.setupWebVitalsMonitoring();
      
    } catch (error) {
      console.warn('[Mobile Performance] Performance monitoring setup failed:', error);
    }
  }

  /**
   * Setup Web Vitals monitoring with Portuguese cultural context
   */
  private setupWebVitalsMonitoring(): void {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.firstContentfulPaint = lastEntry.startTime;
      
      if (lastEntry.startTime > 2500) {
        console.warn('[Mobile Performance] FCP is slow for Portuguese community content:', lastEntry.startTime);
        this.optimizeForSlowFCP();
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.largestContentfulPaint = lastEntry.startTime;
      
      if (lastEntry.startTime > 4000) {
        console.warn('[Mobile Performance] LCP is slow for Portuguese cultural images:', lastEntry.startTime);
        this.optimizeForSlowLCP();
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cumulativeLayoutShift = clsValue;
      
      if (clsValue > 0.1) {
        console.warn('[Mobile Performance] CLS is high, may affect Portuguese text rendering:', clsValue);
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Process individual performance entries
   */
  private processPerformanceEntry(entry: PerformanceEntry): void {
    if (entry.entryType === 'resource') {
      const resourceEntry = entry as PerformanceResourceTiming;
      this.metrics.resourceLoadTime[entry.name] = resourceEntry.responseEnd - resourceEntry.startTime;
      
      // Track Portuguese cultural resource performance
      if (this.isPortugueseCulturalResource(entry.name)) {
        const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
        this.metrics.culturalContentLoadTime = (this.metrics.culturalContentLoadTime || 0) + loadTime;
        
        if (loadTime > 3000) {
          console.warn('[Mobile Performance] Slow Portuguese cultural resource:', entry.name, loadTime);
          this.optimizeSlowCulturalResource(entry.name, loadTime);
        }
      }
    }
  }

  /**
   * Optimize critical rendering path for Portuguese community
   */
  private async optimizeCriticalPath(): Promise<void> {
    console.log('[Mobile Performance] Optimizing critical path for Portuguese community...');

    try {
      // Preload critical Portuguese cultural assets
      await this.preloadCriticalAssets();
      
      // Inline critical CSS for Portuguese cultural colors
      this.inlineCriticalCSS();
      
      // Defer non-critical resources
      this.deferNonCriticalResources();
      
      // Optimize font loading for Portuguese characters
      this.optimizePortugueseFontLoading();
      
    } catch (error) {
      console.error('[Mobile Performance] Critical path optimization failed:', error);
    }
  }

  /**
   * Preload critical assets for Portuguese community
   */
  private async preloadCriticalAssets(): Promise<void> {
    const criticalAssets = [
      // Core Portuguese cultural images
      '/images/portuguese-flag.webp',
      '/images/azulejos-pattern.webp',
      // Critical fonts for Portuguese characters
      '/fonts/poppins-regular.woff2',
      '/fonts/poppins-semibold.woff2',
      // Essential API endpoints
      '/api/events?featured=true&lang=pt'
    ];

    for (const asset of criticalAssets) {
      this.preloadResource(asset);
    }
  }

  /**
   * Preload individual resource with appropriate settings
   */
  private preloadResource(url: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    // Set appropriate 'as' attribute based on resource type
    if (url.endsWith('.woff2') || url.endsWith('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (url.includes('/api/')) {
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
    } else if (url.endsWith('.webp') || url.endsWith('.jpg') || url.endsWith('.png')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  }

  /**
   * Inline critical CSS for Portuguese cultural elements
   */
  private inlineCriticalCSS(): void {
    const criticalCSS = `
      /* Portuguese Heritage Colors - Critical Path */
      :root {
        --heritage-red: #DC2626;
        --heritage-green: #059669;
        --heritage-gold: #D97706;
        --heritage-blue: #1E40AF;
      }
      
      /* Mobile-first Critical Styles for Portuguese Community */
      .portuguese-hero {
        background: linear-gradient(135deg, var(--heritage-red), var(--heritage-green));
        color: white;
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cultural-content-loading {
        background: var(--heritage-gold);
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      /* Mobile Navigation Critical Styles */
      .mobile-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid #E5E7EB;
        padding: 0.5rem;
        z-index: 50;
      }
      
      /* Touch Target Optimization */
      .touch-target {
        min-height: 44px;
        min-width: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = criticalCSS;
    document.head.appendChild(style);
  }

  /**
   * Defer non-critical resources for better performance
   */
  private deferNonCriticalResources(): void {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]:not([data-critical])');
    scripts.forEach(script => {
      if (!this.isCriticalScript(script.getAttribute('src') || '')) {
        script.setAttribute('defer', '');
      }
    });

    // Lazy load non-critical stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    stylesheets.forEach(link => {
      if (!this.isCriticalStylesheet(link.getAttribute('href') || '')) {
        this.lazyLoadStylesheet(link as HTMLLinkElement);
      }
    });
  }

  /**
   * Optimize font loading for Portuguese characters
   */
  private optimizePortugueseFontLoading(): void {
    // Preload fonts for Portuguese characters (ã, ç, õ, etc.)
    const portugueseFonts = [
      '/fonts/poppins-regular.woff2',
      '/fonts/poppins-semibold.woff2',
      '/fonts/inter-regular.woff2'
    ];

    portugueseFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });

    // Add font-display: swap for faster text rendering
    const fontFaceStyle = document.createElement('style');
    fontFaceStyle.innerHTML = `
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
        unicode-range: U+00C0-00FF, U+0100-017F, U+1E00-1EFF;
      }
    `;
    document.head.appendChild(fontFaceStyle);
  }

  /**
   * Setup connection-aware optimizations
   */
  private setupConnectionAwareness(): void {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) return;

    const connection = (navigator as any).connection;
    
    connection.addEventListener('change', () => {
      this.connectionQuality = connection.effectiveType || 'unknown';
      this.adaptToConnectionQuality();
    });

    // Initial adaptation
    this.adaptToConnectionQuality();
  }

  /**
   * Adapt performance based on connection quality
   */
  private adaptToConnectionQuality(): void {
    console.log(`[Mobile Performance] Adapting to connection: ${this.connectionQuality}`);

    if (this.connectionQuality === 'slow-2g' || this.connectionQuality === '2g') {
      // Ultra-aggressive optimization for slow connections
      this.enableDataSaverMode();
    } else if (this.connectionQuality === '3g') {
      // Moderate optimization for 3G
      this.enableBalancedMode();
    } else {
      // Full experience for 4G+
      this.enableFullExperienceMode();
    }
  }

  /**
   * Enable data saver mode for slow connections
   */
  private enableDataSaverMode(): void {
    console.log('[Mobile Performance] Enabling data saver mode for Portuguese community');
    
    // Disable auto-playing videos
    document.querySelectorAll('video[autoplay]').forEach(video => {
      (video as HTMLVideoElement).removeAttribute('autoplay');
    });

    // Replace high-quality images with low-quality versions
    document.querySelectorAll('img[data-src-low]').forEach(img => {
      const lowQualitySrc = img.getAttribute('data-src-low');
      if (lowQualitySrc) {
        img.setAttribute('src', lowQualitySrc);
      }
    });

    // Disable non-essential animations
    document.body.classList.add('reduce-motion');
  }

  /**
   * Optimize Portuguese cultural content specifically
   */
  private async optimizePortugueseCulturalContent(): Promise<void> {
    console.log('[Mobile Performance] Optimizing Portuguese cultural content...');

    try {
      // Optimize cultural images
      await this.optimizeCulturalImages();
      
      // Optimize bilingual content rendering
      this.optimizeBilingualContent();
      
      // Cache Portuguese events data
      await this.cacheCulturalEvents();
      
      // Optimize heritage color loading
      this.optimizeHeritageColors();
      
    } catch (error) {
      console.error('[Mobile Performance] Cultural content optimization failed:', error);
    }
  }

  /**
   * Optimize cultural images for mobile
   */
  private async optimizeCulturalImages(): Promise<void> {
    const culturalImages = document.querySelectorAll('img[data-cultural="true"]');
    
    for (const img of culturalImages) {
      const imgElement = img as HTMLImageElement;
      
      // Add loading="lazy" for non-critical cultural images
      if (!imgElement.getAttribute('data-critical')) {
        imgElement.loading = 'lazy';
      }
      
      // Use WebP format if supported
      if (this.supportsWebP()) {
        const webpSrc = imgElement.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        imgElement.src = webpSrc;
      }
      
      // Add proper sizing for mobile
      if (!imgElement.sizes) {
        imgElement.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      }
    }
  }

  /**
   * Optimize bilingual content rendering
   */
  private optimizeBilingualContent(): void {
    // Preload both language versions to avoid layout shifts
    const bilingualElements = document.querySelectorAll('[data-bilingual="true"]');
    
    bilingualElements.forEach(element => {
      const englishText = element.getAttribute('data-en');
      const portugueseText = element.getAttribute('data-pt');
      
      if (englishText && portugueseText) {
        // Pre-calculate dimensions for both languages to prevent CLS
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.width = getComputedStyle(element).width;
        tempDiv.className = element.className;
        
        tempDiv.textContent = englishText;
        document.body.appendChild(tempDiv);
        const englishHeight = tempDiv.offsetHeight;
        
        tempDiv.textContent = portugueseText;
        const portugueseHeight = tempDiv.offsetHeight;
        
        document.body.removeChild(tempDiv);
        
        // Set minimum height to prevent layout shift
        const minHeight = Math.max(englishHeight, portugueseHeight);
        (element as HTMLElement).style.minHeight = `${minHeight}px`;
      }
    });
  }

  /**
   * Cache cultural events for offline access
   */
  private async cacheCulturalEvents(): Promise<void> {
    if ('caches' in window) {
      try {
        const cache = await caches.open('portuguese-cultural-events-v1');
        const eventsToCache = [
          '/api/events?category=fado-nights&lang=pt',
          '/api/events?category=festa-junina&lang=pt',
          '/api/events?category=santo-antonio&lang=pt',
          '/api/events?category=portuguese-festivals&lang=pt'
        ];
        
        await cache.addAll(eventsToCache);
        console.log('[Mobile Performance] Portuguese cultural events cached');
      } catch (error) {
        console.warn('[Mobile Performance] Failed to cache cultural events:', error);
      }
    }
  }

  /**
   * Setup lazy loading for non-critical resources
   */
  private setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Optimize for slow First Contentful Paint
   */
  private optimizeForSlowFCP(): void {
    console.log('[Mobile Performance] Optimizing for slow FCP...');
    
    // Inline more critical CSS
    this.inlineCriticalCSS();
    
    // Remove render-blocking resources
    this.removeRenderBlockingResources();
  }

  /**
   * Optimize for slow Largest Contentful Paint
   */
  private optimizeForSlowLCP(): void {
    console.log('[Mobile Performance] Optimizing for slow LCP...');
    
    // Preload LCP element resources
    const lcpElements = document.querySelectorAll('[data-lcp="true"]');
    lcpElements.forEach(element => {
      if (element.tagName === 'IMG') {
        this.preloadResource((element as HTMLImageElement).src);
      }
    });
  }

  /**
   * Optimize slow Portuguese cultural resources
   */
  private optimizeSlowCulturalResource(resourceUrl: string, loadTime: number): void {
    console.log(`[Mobile Performance] Optimizing slow cultural resource: ${resourceUrl} (${loadTime}ms)`);
    
    // Implement resource-specific optimizations
    if (resourceUrl.includes('.jpg') || resourceUrl.includes('.png')) {
      // Convert to WebP if possible
      this.convertImageToWebP(resourceUrl);
    } else if (resourceUrl.includes('/api/')) {
      // Cache API responses more aggressively
      this.cacheApiResponse(resourceUrl);
    }
  }

  // Utility functions
  private isPortugueseCulturalResource(url: string): boolean {
    const culturalPatterns = [
      '/events/fado', '/events/festa', '/events/santo',
      '/businesses/portuguese', '/businesses/brazilian',
      '/cultural/', '/heritage/', '/lusophone/'
    ];
    
    return culturalPatterns.some(pattern => url.includes(pattern));
  }

  private isCriticalScript(src: string): boolean {
    const criticalPatterns = ['/polyfills', '/runtime', '/vendors'];
    return criticalPatterns.some(pattern => src.includes(pattern));
  }

  private isCriticalStylesheet(href: string): boolean {
    const criticalPatterns = ['/critical.css', '/above-fold.css'];
    return criticalPatterns.some(pattern => href.includes(pattern));
  }

  private lazyLoadStylesheet(link: HTMLLinkElement): void {
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = link.href;
    newLink.media = 'print';
    newLink.onload = () => {
      newLink.media = 'all';
    };
    
    link.parentNode?.replaceChild(newLink, link);
  }

  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  private enableBalancedMode(): void {
    console.log('[Mobile Performance] Enabling balanced mode for Portuguese community');
    // Implement balanced optimizations
  }

  private enableFullExperienceMode(): void {
    console.log('[Mobile Performance] Enabling full experience for Portuguese community');
    // Enable all features and animations
  }

  private optimizeHeritageColors(): void {
    // Ensure heritage colors load quickly on mobile
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --heritage-red: #DC2626;
        --heritage-green: #059669;
        --heritage-gold: #D97706;
        --heritage-blue: #1E40AF;
      }
    `;
    document.head.appendChild(style);
  }

  private removeRenderBlockingResources(): void {
    // Remove or defer render-blocking resources
    const blockingResources = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    blockingResources.forEach(link => {
      this.lazyLoadStylesheet(link as HTMLLinkElement);
    });
  }

  private convertImageToWebP(imageUrl: string): void {
    // Placeholder for WebP conversion logic
    console.log(`[Mobile Performance] Should convert to WebP: ${imageUrl}`);
  }

  private cacheApiResponse(apiUrl: string): void {
    // Implement aggressive API caching
    if ('caches' in window) {
      caches.open('api-responses-v1').then(cache => {
        cache.add(apiUrl);
      });
    }
  }
}

// Export singleton instance and utility functions
export const mobilePerformanceOptimizer = MobilePerformanceOptimizer.getInstance();

export const initializeMobilePerformance = async (): Promise<void> => {
  return await mobilePerformanceOptimizer.initialize();
};

export const getPerformanceMetrics = (): PerformanceMetrics => {
  return mobilePerformanceOptimizer.getMetrics();
};

export default MobilePerformanceOptimizer;