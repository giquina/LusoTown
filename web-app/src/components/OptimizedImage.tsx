'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  fallback?: string
  sizes?: string
  quality?: number
  loading?: 'lazy' | 'eager'
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  fallback = '/images/placeholder-gray.jpg',
  sizes = '(max-width: 375px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  quality = 80,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setImgSrc(fallback)
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 animate-pulse rounded flex items-center justify-center">
          <div className="text-2xl">🇵🇹</div>
        </div>
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'object-cover' : ''}`}
        {...props}
      />
    </div>
  )
}

/**
 * Lusophone Cultural Avatar Component
 * Mobile-optimized for Lusophone cultural content with flag integration
 */
interface PortugueseAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  flag?: string;
  heritage?: string;
  className?: string;
}

export function PortugueseAvatar({
  src,
  alt,
  size = 'md',
  flag,
  heritage,
  className = ""
}: PortugueseAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const flagSizeClasses = {
    sm: 'w-3 h-3 text-xs',
    md: 'w-4 h-4 text-sm',
    lg: 'w-5 h-5 text-base'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
        height={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
        className="rounded-full ring-2 ring-white shadow-sm"
        quality={85}
        sizes="64px"
        priority={size === 'lg'}
      />
      
      {/* Portuguese heritage flag indicator */}
      {flag && (
        <div 
          className={`absolute -bottom-1 -right-1 ${flagSizeClasses[size]} bg-white rounded-full flex items-center justify-center shadow-md ring-1 ring-gray-200`}
          title={heritage ? `From ${heritage}` : 'Portuguese heritage'}
        >
          <span>{flag}</span>
        </div>
      )}
    </div>
  );
}