import { buildUnsplashUrl, buildCloudinaryUrl } from '@/config'
// Performance optimization utilities for LusoTown

// Image optimization
export const imageConfig = {
  domains: ['images.unsplash.com', 'res.cloudinary.com'],
  formats: ['image/webp', 'image/avif'],
  sizes: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },
}

// Bundle optimization - defer non-critical imports
export const deferImport = (importFn: () => Promise<any>, delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      importFn().then(resolve)
    }, delay)
  })
}

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
    ]
    
    fontLinks.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      document.head.appendChild(link)
    })
  }
}

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

// Memory management for large components
export const cleanupComponent = (componentName: string) => {
  // Clear any intervals, timeouts, event listeners
}

// Critical CSS for above-the-fold content
export const criticalCSS = `
  .hero-section { 
    min-height: 100vh;
    background: linear-gradient(135deg, #10b981, var(--color-action-500));
  }
  .loading-skeleton {
    background: linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

// Reduce motion for users who prefer it
export const prefersReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof performance !== 'undefined') {
    const start = performance.now()
    fn()
    const end = performance.now()
  } else {
    fn()
  }
}