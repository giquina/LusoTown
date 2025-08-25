// Portuguese-speaking community bundle optimization utilities
import logger from "@/utils/logger";

interface BundleOptimizationConfig {
  enableCriticalResourcePreload: boolean;
  enablePortugueseContentGrouping: boolean;
  enableMobilePrioritization: boolean;
  enableCulturalContentSplitting: boolean;
  enableLazyLoadingThresholds: boolean;
}

interface PortugueseContentPriority {
  critical: string[];
  high: string[];
  medium: string[];
  low: string[];
  defer: string[];
}

interface DeviceOptimizationContext {
  isMobile: boolean;
  connectionType: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown";
  deviceMemory: number;
  isDataSaverMode: boolean;
  viewportWidth: number;
  prefersReducedMotion: boolean;
}

// Portuguese-speaking community content prioritization
const PORTUGUESE_CONTENT_PRIORITIES: PortugueseContentPriority = {
  critical: [
    "portuguese-navigation",
    "community-authentication",
    "language-switcher",
    "cultural-branding",
    "mobile-header",
  ],
  high: [
    "event-listings",
    "community-matches",
    "business-directory",
    "cultural-calendar",
    "portuguese-feed",
  ],
  medium: [
    "community-stories",
    "cultural-articles",
    "business-profiles",
    "event-details",
    "user-profiles",
  ],
  low: [
    "historical-content",
    "cultural-galleries",
    "community-photos",
    "testimonials",
    "about-sections",
  ],
  defer: [
    "cultural-videos",
    "large-galleries",
    "community-archives",
    "advanced-features",
    "admin-panels",
  ],
};

// Mobile-first optimization thresholds
const MOBILE_OPTIMIZATION_THRESHOLDS = {
  criticalBundleSize: 170 * 1024, // 170KB for critical path
  highPriorityBundleSize: 250 * 1024, // 250KB for high priority
  lazyLoadThreshold: 50, // 50px from viewport
  slowConnectionThreshold: "3g",
  lowMemoryThreshold: 2, // GB
  batteryLowThreshold: 0.2, // 20%
};

export class PortugueseBundleOptimizer {
  private config: BundleOptimizationConfig;
  private deviceContext: DeviceOptimizationContext | null = null;
  private loadedBundles: Set<string> = new Set();
  private preloadedResources: Set<string> = new Set();

  constructor(config: Partial<BundleOptimizationConfig> = {}) {
    this.config = {
      enableCriticalResourcePreload: true,
      enablePortugueseContentGrouping: true,
      enableMobilePrioritization: true,
      enableCulturalContentSplitting: true,
      enableLazyLoadingThresholds: true,
      ...config,
    };

    this.initializeDeviceContext();
  }

  private initializeDeviceContext(): void {
    if (typeof window === "undefined") return;

    const connection = (navigator as any).connection;

    this.deviceContext = {
      isMobile: window.innerWidth <= 768,
      connectionType: connection?.effectiveType || "unknown",
      deviceMemory: (navigator as any).deviceMemory || 4,
      isDataSaverMode: connection?.saveData || false,
      viewportWidth: window.innerWidth,
      prefersReducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    };
  }

  // Preload critical Portuguese-speaking community resources
  public async preloadCriticalResources(): Promise<void> {
    if (!this.config.enableCriticalResourcePreload || !this.deviceContext)
      return;

    const criticalResources = [
      "/api/auth/session",
      "/api/user/preferences",
      "/api/events/featured?limit=5",
      "/api/community/stats",
    ];

    // Adjust for device capabilities
    if (
      this.deviceContext.isDataSaverMode ||
      this.deviceContext.connectionType === "slow-2g"
    ) {
      // Skip non-essential preloading on slow connections
      criticalResources.splice(2); // Keep only auth and preferences
    }

    const preloadPromises = criticalResources.map(async (resource) => {
      if (this.preloadedResources.has(resource)) return;

      try {
        const response = await fetch(resource, {
          method: "GET",
          headers: {
            "X-Preload": "true",
          },
        });

        if (response.ok) {
          this.preloadedResources.add(resource);
        }
      } catch (error) {
        logger.info(`[Bundle Optimizer] Failed to preload ${resource}:`, error);
      }
    });

    await Promise.allSettled(preloadPromises);
  }

  // Load Lusophone content bundles based on priority
  public async loadPortugueseContentBundle(
    priority: keyof PortugueseContentPriority
  ): Promise<void> {
    if (!this.config.enablePortugueseContentGrouping) return;

    const bundleKey = `portuguese-${priority}`;
    if (this.loadedBundles.has(bundleKey)) return;

    const contentTypes = PORTUGUESE_CONTENT_PRIORITIES[priority];

    // Skip or defer loading based on device constraints
    if (this.shouldDeferLoading(priority)) {
      setTimeout(() => this.loadPortugueseContentBundle(priority), 2000);
      return;
    }

    try {
      const loadPromises = contentTypes.map(async (contentType) => {
        return this.loadContentTypeBundle(contentType);
      });

      await Promise.allSettled(loadPromises);
      this.loadedBundles.add(bundleKey);
      logger.info(
        `[Bundle Optimizer] Loaded ${priority} priority Lusophone content`
      );
    } catch (error) {
      logger.error(
        `[Bundle Optimizer] Failed to load ${priority} bundle:`,
        error
      );
    }
  }

  private async loadContentTypeBundle(contentType: string): Promise<void> {
    const bundleMap: { [key: string]: () => Promise<any> } = {
      "portuguese-navigation": () =>
        import("@/components/PortugueseNavigation"),
      "community-authentication": () => import("@/components/AuthSystem"),
      "event-listings": () => import("@/components/EventsShowcase"),
      "community-matches": () => import("@/components/MatchesSystem"),
      "business-directory": () => import("@/components/BusinessDirectory"),
      "cultural-calendar": () => import("@/components/CulturalCalendar"),
      "portuguese-feed": () => import("@/components/CommunityFeedSection"),
      "community-stories": () => import("@/components/SuccessStories"),
      "cultural-articles": () => import("@/components/CulturalArticles"),
      "business-profiles": () => import("@/components/BusinessProfiles"),
      "cultural-galleries": () => import("@/components/CulturalGallery"),
      "community-photos": () => import("@/components/CommunityPhotos"),
      "cultural-videos": () => import("@/components/CulturalVideos"),
    };

    if (bundleMap[contentType]) {
      await bundleMap[contentType]();
    }
  }

  private shouldDeferLoading(
    priority: keyof PortugueseContentPriority
  ): boolean {
    if (!this.deviceContext) return false;

    // Defer low priority content on constrained devices
    if (priority === "low" || priority === "defer") {
      if (this.deviceContext.isDataSaverMode) return true;
      if (
        this.deviceContext.connectionType === "slow-2g" ||
        this.deviceContext.connectionType === "2g"
      )
        return true;
      if (
        this.deviceContext.deviceMemory <=
        MOBILE_OPTIMIZATION_THRESHOLDS.lowMemoryThreshold
      )
        return true;
    }

    // Defer medium priority on very constrained devices
    if (priority === "medium") {
      if (
        this.deviceContext.isDataSaverMode &&
        this.deviceContext.connectionType === "slow-2g"
      )
        return true;
      if (this.deviceContext.deviceMemory <= 1) return true;
    }

    return false;
  }

  // Optimize bundle loading for mobile Lusophone users
  public optimizeForMobile(): void {
    if (
      !this.config.enableMobilePrioritization ||
      !this.deviceContext?.isMobile
    )
      return;

    // Implement mobile-specific optimizations
    this.implementMobileOptimizations();

    // Set up intersection observer for lazy loading
    if (this.config.enableLazyLoadingThresholds) {
      this.setupIntersectionObserver();
    }

    // Optimize for Lusophone mobile usage patterns
    this.optimizePortugueseMobilePatterns();
  }

  private implementMobileOptimizations(): void {
    if (!this.deviceContext) return;

    // Reduce animation complexity on mobile
    if (
      this.deviceContext.prefersReducedMotion ||
      this.deviceContext.deviceMemory <= 2
    ) {
      document.documentElement.classList.add("reduced-animations");
    }

    // Apply data saver optimizations
    if (this.deviceContext.isDataSaverMode) {
      document.documentElement.classList.add("data-saver-mode");
      this.enableDataSaverMode();
    }

    // Optimize for slow connections
    if (["slow-2g", "2g", "3g"].includes(this.deviceContext.connectionType)) {
      document.documentElement.classList.add("slow-connection");
      this.enableSlowConnectionOptimizations();
    }
  }

  private enableDataSaverMode(): void {
    // Disable autoplay videos
    const videos = document.querySelectorAll("video[autoplay]");
    videos.forEach((video) => video.removeAttribute("autoplay"));

    // Reduce image quality
    const images = document.querySelectorAll('img[src*="cloudinary"]');
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.src.replace(/q_\d+/, "q_30");
    });

    // Defer non-critical Lusophone cultural content
    this.deferNonCriticalContent();
  }

  private enableSlowConnectionOptimizations(): void {
    // Preload only critical resources
    const criticalLinks = document.querySelectorAll('link[rel="preload"]');
    criticalLinks.forEach((link) => {
      if (!link.getAttribute("href")?.includes("critical")) {
        link.remove();
      }
    });

    // Increase intersection observer thresholds
    this.lazyLoadThreshold = 20; // Closer to viewport
  }

  private lazyLoadThreshold = MOBILE_OPTIMIZATION_THRESHOLDS.lazyLoadThreshold;

  private setupIntersectionObserver(): void {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            this.loadElementContent(element);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: `${this.lazyLoadThreshold}px 0px`,
        threshold: 0.1,
      }
    );

    // Observe lazy-loadable Lusophone content
    const lazyElements = document.querySelectorAll("[data-portuguese-lazy]");
    lazyElements.forEach((element) => observer.observe(element));
  }

  private loadElementContent(element: HTMLElement): void {
    const contentType = element.dataset.portugueseLazy;
    if (!contentType) return;

    // Load specific Lusophone content based on type
    switch (contentType) {
      case "cultural-gallery":
        this.loadCulturalGallery(element);
        break;
      case "community-feed":
        this.loadCommunityFeed(element);
        break;
      case "business-listings":
        this.loadBusinessListings(element);
        break;
      case "event-details":
        this.loadEventDetails(element);
        break;
      default:
        logger.warn(
          `[Bundle Optimizer] Unknown Lusophone content type: ${contentType}`
        );
    }
  }

  private async loadCulturalGallery(element: HTMLElement): Promise<void> {
    try {
      const { default: CulturalGallery } = await import(
        "@/components/CulturalGallery"
      );
      // Render component in element
      element.innerHTML =
        '<div class="cultural-gallery-loaded">Gallery loaded</div>';
    } catch (error) {
      logger.error(
        "[Bundle Optimizer] Failed to load cultural gallery:",
        error
      );
    }
  }

  private async loadCommunityFeed(element: HTMLElement): Promise<void> {
    try {
      const { default: CommunityFeed } = await import(
        "@/components/CommunityFeedSection"
      );
      element.innerHTML =
        '<div class="community-feed-loaded">Feed loaded</div>';
    } catch (error) {
      logger.error("[Bundle Optimizer] Failed to load community feed:", error);
    }
  }

  private async loadBusinessListings(element: HTMLElement): Promise<void> {
    try {
      const { default: BusinessDirectory } = await import(
        "@/components/BusinessDirectory"
      );
      element.innerHTML =
        '<div class="business-listings-loaded">Businesses loaded</div>';
    } catch (error) {
      logger.error(
        "[Bundle Optimizer] Failed to load business listings:",
        error
      );
    }
  }

  private async loadEventDetails(element: HTMLElement): Promise<void> {
    try {
      const eventId = element.dataset.eventId;
      if (eventId) {
        const response = await fetch(`/api/events/${eventId}`);
        const eventData = await response.json();
        element.innerHTML = `<div class="event-details-loaded">${eventData.title}</div>`;
      }
    } catch (error) {
      logger.error("[Bundle Optimizer] Failed to load event details:", error);
    }
  }

  private optimizePortugueseMobilePatterns(): void {
    // Optimize for Lusophone mobile usage patterns
    // 73% of Portuguese-speaking community uses mobile

    // Prioritize touch-friendly interactions
    this.optimizeTouchTargets();

    // Optimize for Lusophone text rendering
    this.optimizePortugueseTextRendering();

    // Implement Lusophone cultural color optimization
    this.optimizeCulturalTheming();
  }

  private optimizeTouchTargets(): void {
    const touchTargets = document.querySelectorAll(
      'button, a[role="button"], [onclick]'
    );
    touchTargets.forEach((target) => {
      const element = target as HTMLElement;
      const rect = element.getBoundingClientRect();

      // Ensure minimum 44px touch targets
      if (rect.width < 44 || rect.height < 44) {
        element.style.minWidth = "44px";
        element.style.minHeight = "44px";
        element.style.padding = element.style.padding || "8px";
      }
    });
  }

  private optimizePortugueseTextRendering(): void {
    // Optimize for Lusophone diacritics and special characters
    document.documentElement.style.textRendering = "optimizeLegibility";
    document.documentElement.style.fontFeatureSettings = '"liga" 1, "kern" 1';

    // Ensure proper Lusophone text wrapping
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span"
    );
    textElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.wordBreak = "break-word";
      htmlElement.style.hyphens = "auto";
      htmlElement.lang = htmlElement.lang || "pt-PT";
    });
  }

  private optimizeCulturalTheming(): void {
    // Apply Lusophone cultural color optimizations
    const colorOptimizations = document.createElement("style");
    colorOptimizations.textContent = `
      .portuguese-optimized {
        --primary-cultural: #1e40af; /* Lusophone blue */
        --secondary-cultural: #059669; /* Lusophone green */
        --accent-cultural: #dc2626; /* Lusophone red */
        --gold-cultural: #f59e0b; /* Lusophone gold */
      }
      
      .mobile-portuguese-text {
        line-height: 1.6;
        letter-spacing: 0.025em;
      }
      
      .cultural-gradient {
        background: linear-gradient(135deg, 
          var(--primary-cultural), 
          var(--secondary-cultural), 
          var(--accent-cultural)
        );
      }
    `;
    document.head.appendChild(colorOptimizations);

    document.documentElement.classList.add("portuguese-optimized");
  }

  private deferNonCriticalContent(): void {
    const nonCriticalSelectors = [
      ".cultural-video",
      ".large-gallery",
      ".testimonial-carousel",
      ".community-archive",
      ".admin-panel",
    ];

    nonCriticalSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.display = "none";
        htmlElement.dataset.deferred = "true";
      });
    });
  }

  // Public method to get optimization stats
  public getOptimizationStats(): {
    loadedBundles: string[];
    preloadedResources: string[];
    deviceContext: DeviceOptimizationContext | null;
    optimizationsApplied: string[];
  } {
    const optimizationsApplied = [];

    if (this.deviceContext?.isMobile)
      optimizationsApplied.push("mobile-optimized");
    if (this.deviceContext?.isDataSaverMode)
      optimizationsApplied.push("data-saver");
    if (this.deviceContext?.prefersReducedMotion)
      optimizationsApplied.push("reduced-motion");

    return {
      loadedBundles: Array.from(this.loadedBundles),
      preloadedResources: Array.from(this.preloadedResources),
      deviceContext: this.deviceContext,
      optimizationsApplied,
    };
  }

  // Clean up resources
  public cleanup(): void {
    this.loadedBundles.clear();
    this.preloadedResources.clear();
    this.deviceContext = null;
  }
}

// Create global instance
export const portugueseBundleOptimizer = new PortugueseBundleOptimizer();

// Hook for React components
export function usePortugueseBundleOptimization() {
  const [stats, setStats] = React.useState(
    portugueseBundleOptimizer.getOptimizationStats()
  );

  React.useEffect(() => {
    // Initialize optimization
    portugueseBundleOptimizer.preloadCriticalResources();
    portugueseBundleOptimizer.optimizeForMobile();

    // Load critical Lusophone content
    portugueseBundleOptimizer.loadPortugueseContentBundle("critical");

    // Update stats
    const updateStats = () =>
      setStats(portugueseBundleOptimizer.getOptimizationStats());
    const interval = setInterval(updateStats, 2000);

    return () => {
      clearInterval(interval);
      portugueseBundleOptimizer.cleanup();
    };
  }, []);

  return {
    stats,
    loadBundle: portugueseBundleOptimizer.loadPortugueseContentBundle.bind(
      portugueseBundleOptimizer
    ),
    preloadResources: portugueseBundleOptimizer.preloadCriticalResources.bind(
      portugueseBundleOptimizer
    ),
  };
}

// Utility functions
export function preloadPortugueseRoute(route: string): void {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    requestIdleCallback(() => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = route;
      document.head.appendChild(link);
    });
  }
}

export function optimizePortugueseImages(): void {
  const images = document.querySelectorAll(
    'img[src*="portuguese"], img[alt*="portuguese" i]'
  );
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;

    // Add lazy loading
    if (!imgElement.loading) {
      imgElement.loading = "lazy";
    }

    // Add proper sizes for Lusophone content
    if (!imgElement.sizes) {
      imgElement.sizes =
        "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
    }
  });
}

// Lusophone-specific performance measurement
export function measurePortuguesePerformance(): Promise<{
  culturalContentLoadTime: number;
  portugueseTextRenderTime: number;
  mobileOptimizationScore: number;
}> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve({
        culturalContentLoadTime: 0,
        portugueseTextRenderTime: 0,
        mobileOptimizationScore: 0,
      });
      return;
    }

    const start = performance.now();

    requestAnimationFrame(() => {
      const culturalElements = document.querySelectorAll(
        "[data-portuguese-content]"
      );
      const textElements = document.querySelectorAll("p, h1, h2, h3");
      const mobileElements = document.querySelectorAll('[class*="mobile"]');

      const culturalContentLoadTime = performance.now() - start;
      const portugueseTextRenderTime =
        culturalElements.length > 0 ? performance.now() - start : 0;
      const mobileOptimizationScore = Math.min(
        100,
        (mobileElements.length / textElements.length) * 100
      );

      resolve({
        culturalContentLoadTime,
        portugueseTextRenderTime,
        mobileOptimizationScore,
      });
    });
  });
}

import React from "react"; // For the hook
