'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { getEventPlaceholder } from '@/lib/placeholders';

interface OptimizedPortugueseImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  culturalCategory?: 'events' | 'cultural' | 'business' | 'community' | 'heritage';
  enableLazyLoading?: boolean;
  enableWebP?: boolean;
  enableAVIF?: boolean;
  mobileOptimized?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

interface DeviceCapabilities {
  supportsWebP: boolean;
  supportsAVIF: boolean;
  connectionSpeed: 'fast' | 'slow' | 'unknown';
  devicePixelRatio: number;
  viewportWidth: number;
  isLowBandwidth: boolean;
  prefersReducedData: boolean;
}

// Portuguese cultural image optimization configuration
const PORTUGUESE_IMAGE_CONFIG = {
  culturalCategories: {
    events: {
      aspectRatio: '16:9',
      defaultQuality: 80,
      lowBandwidthQuality: 50,
      prioritySizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    },
    cultural: {
      aspectRatio: '4:3',
      defaultQuality: 85,
      lowBandwidthQuality: 60,
      prioritySizes: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw',
    },
    business: {
      aspectRatio: '1:1',
      defaultQuality: 75,
      lowBandwidthQuality: 45,
      prioritySizes: '(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw',
    },
    community: {
      aspectRatio: '16:9',
      defaultQuality: 80,
      lowBandwidthQuality: 50,
      prioritySizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    },
    heritage: {
      aspectRatio: '3:4',
      defaultQuality: 90,
      lowBandwidthQuality: 70,
      prioritySizes: '(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw',
    },
  },
  mobileBreakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  qualityThresholds: {
    excellent: 90,
    good: 75,
    acceptable: 60,
    low: 45,
  },
};

export default function OptimizedPortugueseImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  className = '',
  culturalCategory = 'events',
  enableLazyLoading = true,
  enableWebP = true,
  enableAVIF = true,
  mobileOptimized = true,
  onLoad,
  onError,
}: OptimizedPortugueseImageProps) {
  // State management
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(!enableLazyLoading || priority);
  
  // Refs
  const imageRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Initialize device capabilities and optimization
  useEffect(() => {
    const capabilities = detectDeviceCapabilities();
    setDeviceCapabilities(capabilities);
    
    if (capabilities) {
      const optimizedImageSrc = optimizeImageSource(src, capabilities);
      setOptimizedSrc(optimizedImageSrc);
    }
  }, [src]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || priority || !imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(imageRef.current);
    intersectionObserverRef.current = observer;

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [enableLazyLoading, priority]);

  const detectDeviceCapabilities = (): DeviceCapabilities => {
    const canvas = document.createElement('canvas');
    const connection = (navigator as any).connection;
    
    return {
      supportsWebP: canvas.toDataURL('image/webp').indexOf('webp') !== -1,
      supportsAVIF: canvas.toDataURL('image/avif').indexOf('avif') !== -1,
      connectionSpeed: getConnectionSpeed(),
      devicePixelRatio: window.devicePixelRatio || 1,
      viewportWidth: window.innerWidth,
      isLowBandwidth: connection?.saveData || getConnectionSpeed() === 'slow',
      prefersReducedData: connection?.saveData || false,
    };
  };

  const getConnectionSpeed = (): 'fast' | 'slow' | 'unknown' => {
    const connection = (navigator as any).connection;
    if (!connection) return 'unknown';
    
    const slowTypes = ['slow-2g', '2g', '3g'];
    return slowTypes.includes(connection.effectiveType) ? 'slow' : 'fast';
  };

  const optimizeImageSource = useCallback((originalSrc: string, capabilities: DeviceCapabilities): string => {
    if (!originalSrc) return originalSrc;

    let optimizedUrl = originalSrc;

    // Apply format optimization
    if (capabilities.supportsAVIF && enableAVIF) {
      optimizedUrl = convertToFormat(optimizedUrl, 'avif');
    } else if (capabilities.supportsWebP && enableWebP) {
      optimizedUrl = convertToFormat(optimizedUrl, 'webp');
    }

    // Apply quality optimization based on connection and device
    const optimalQuality = getOptimalQuality(capabilities);
    optimizedUrl = applyQuality(optimizedUrl, optimalQuality);

    // Apply size optimization for mobile
    if (mobileOptimized && capabilities.viewportWidth <= PORTUGUESE_IMAGE_CONFIG.mobileBreakpoints.md) {
      optimizedUrl = optimizeForMobile(optimizedUrl, capabilities);
    }

    // Apply DPR optimization
    if (capabilities.devicePixelRatio > 1 && !capabilities.isLowBandwidth) {
      optimizedUrl = applyDPR(optimizedUrl, capabilities.devicePixelRatio);
    }

    return optimizedUrl;
  }, [culturalCategory, enableWebP, enableAVIF, mobileOptimized]);

  const convertToFormat = (url: string, format: 'webp' | 'avif'): string => {
    // Handle Cloudinary URLs
    if (url.includes('cloudinary.com')) {
      if (url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/f_${format}/`);
      }
    }

    // Handle other CDN providers
    if (url.includes('?')) {
      return `${url}&format=${format}`;
    } else {
      return `${url}?format=${format}`;
    }
  };

  const getOptimalQuality = (capabilities: DeviceCapabilities): number => {
    if (quality) return quality;

    const categoryConfig = PORTUGUESE_IMAGE_CONFIG.culturalCategories[culturalCategory];
    
    if (capabilities.isLowBandwidth || capabilities.prefersReducedData) {
      return categoryConfig.lowBandwidthQuality;
    }

    if (capabilities.connectionSpeed === 'slow') {
      return Math.max(categoryConfig.lowBandwidthQuality, PORTUGUESE_IMAGE_CONFIG.qualityThresholds.acceptable);
    }

    return categoryConfig.defaultQuality;
  };

  const applyQuality = (url: string, qualityValue: number): string => {
    // Handle Cloudinary URLs
    if (url.includes('cloudinary.com')) {
      if (url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/q_${qualityValue}/`);
      }
    }

    // Handle other providers
    if (url.includes('?')) {
      return `${url}&q=${qualityValue}`;
    } else {
      return `${url}?q=${qualityValue}`;
    }
  };

  const optimizeForMobile = (url: string, capabilities: DeviceCapabilities): string => {
    const maxWidth = capabilities.viewportWidth * capabilities.devicePixelRatio;
    
    // Handle Cloudinary URLs
    if (url.includes('cloudinary.com')) {
      if (url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/w_${Math.min(maxWidth, 1200)},c_limit/`);
      }
    }

    // Handle other providers
    const widthParam = `w=${Math.min(maxWidth, 1200)}`;
    if (url.includes('?')) {
      return `${url}&${widthParam}`;
    } else {
      return `${url}?${widthParam}`;
    }
  };

  const applyDPR = (url: string, dpr: number): string => {
    const dprValue = Math.min(dpr, 2); // Cap at 2x to avoid excessive file sizes

    // Handle Cloudinary URLs
    if (url.includes('cloudinary.com')) {
      if (url.includes('/upload/')) {
        return url.replace('/upload/', `/upload/dpr_${dprValue}/`);
      }
    }

    // Handle other providers
    const dprParam = `dpr=${dprValue}`;
    if (url.includes('?')) {
      return `${url}&${dprParam}`;
    } else {
      return `${url}?${dprParam}`;
    }
  };

  const getOptimalSizes = (): string => {
    if (sizes) return sizes;
    
    const categoryConfig = PORTUGUESE_IMAGE_CONFIG.culturalCategories[culturalCategory];
    return categoryConfig.prioritySizes;
  };

  const generatePlaceholder = (): string => {
    if (blurDataURL) return blurDataURL;
    
    // Generate category-specific placeholder
    return getEventPlaceholder(culturalCategory);
  };

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const getOptimalQualityForCurrentConditions = (): number => {
    if (!deviceCapabilities) return quality || 75;
    return getOptimalQuality(deviceCapabilities);
  };

  // Don't render if not visible (lazy loading)
  if (!isVisible) {
    return (
      <div 
        ref={imageRef} 
        className={`${className} bg-gray-200 animate-pulse`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  // Render error state with placeholder
  if (imageError) {
    return (
      <div 
        className={`${className} bg-gray-100 flex items-center justify-center`}
        style={{ 
          width: fill ? '100%' : width, 
          height: fill ? '100%' : height,
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      >
        <Image
          src={generatePlaceholder()}
          alt={`${alt} (placeholder)`}
          width={width || 400}
          height={height || 300}
          className="opacity-60"
          unoptimized
        />
      </div>
    );
  }

  // Main image component
  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onLoad: handleImageLoad,
    onError: handleImageError,
    priority,
    quality: getOptimalQualityForCurrentConditions(),
    placeholder: placeholder as any,
    ...(blurDataURL && { blurDataURL }),
    sizes: getOptimalSizes(),
    ...(fill ? { fill: true } : { width: width || 400, height: height || 300 }),
  };

  return (
    <div ref={imageRef} className="relative">
      <Image {...imageProps} />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && deviceCapabilities && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {deviceCapabilities.supportsAVIF && enableAVIF ? 'AVIF' : 
           deviceCapabilities.supportsWebP && enableWebP ? 'WebP' : 'JPEG'} 
          {deviceCapabilities.isLowBandwidth ? ' (Low Bandwidth)' : ''}
        </div>
      )}
    </div>
  );
}

// Hook for image optimization utilities
export function usePortugueseImageOptimization() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);

  useEffect(() => {
    const detectCapabilities = () => {
      const canvas = document.createElement('canvas');
      const connection = (navigator as any).connection;
      
      setCapabilities({
        supportsWebP: canvas.toDataURL('image/webp').indexOf('webp') !== -1,
        supportsAVIF: canvas.toDataURL('image/avif').indexOf('avif') !== -1,
        connectionSpeed: connection?.effectiveType === '4g' ? 'fast' : 'slow',
        devicePixelRatio: window.devicePixelRatio || 1,
        viewportWidth: window.innerWidth,
        isLowBandwidth: connection?.saveData || false,
        prefersReducedData: connection?.saveData || false,
      });
    };

    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    
    return () => {
      window.removeEventListener('resize', detectCapabilities);
    };
  }, []);

  const optimizeImageUrl = useCallback((url: string, options?: {
    quality?: number;
    width?: number;
    format?: 'webp' | 'avif' | 'auto';
  }) => {
    if (!capabilities || !url) return url;

    let optimizedUrl = url;

    // Apply format
    const format = options?.format || (capabilities.supportsAVIF ? 'avif' : 
                                      capabilities.supportsWebP ? 'webp' : null);
    if (format && format !== 'auto') {
      if (url.includes('cloudinary.com')) {
        optimizedUrl = optimizedUrl.replace('/upload/', `/upload/f_${format}/`);
      }
    }

    // Apply quality
    const quality = options?.quality || (capabilities.isLowBandwidth ? 50 : 80);
    if (url.includes('cloudinary.com')) {
      optimizedUrl = optimizedUrl.replace('/upload/', `/upload/q_${quality}/`);
    }

    // Apply width
    if (options?.width) {
      if (url.includes('cloudinary.com')) {
        optimizedUrl = optimizedUrl.replace('/upload/', `/upload/w_${options.width},c_limit/`);
      }
    }

    return optimizedUrl;
  }, [capabilities]);

  return {
    capabilities,
    optimizeImageUrl,
    isLowBandwidth: capabilities?.isLowBandwidth || false,
    supportedFormats: {
      webp: capabilities?.supportsWebP || false,
      avif: capabilities?.supportsAVIF || false,
    },
  };
}