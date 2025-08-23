'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { getEventPlaceholder } from '@/lib/placeholders'

interface EventImageWithFallbackProps {
  src: string
  alt: string
  category?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export default function EventImageWithFallback({
  src,
  alt,
  category = 'networking',
  className = '',
  fill = false,
  width,
  height,
  priority = false
}: EventImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)
  const hasValidSrc = typeof src === 'string' && src.trim().length > 0

  // Allowed hosts based on next.config.js images.remotePatterns
  const allowedHosts = useMemo(
    () => [
      'images.unsplash.com',
      'unsplash.com',
      'res.cloudinary.com',
      'lusotown-london.vercel.app',
      'stream.lusotown.com',
      'portuguese-content.lusotown.com',
      'lusotown-portuguese-content.b-cdn.net',
      'lusotown-portuguese-streams.b-cdn.net',
      // wildcard domain: *.b-cdn.net (handle via endsWith check)
      '.b-cdn.net',
      // YouTube thumbnails
      'img.youtube.com',
      'i.ytimg.com',
    ],
    []
  )

  const isAllowedExternal = (url: string) => {
    try {
      // Allow data, blob and relative paths immediately
      if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/')) return true
      const u = new URL(url)
      const host = u.hostname.toLowerCase()
      // direct host match
      if (allowedHosts.includes(host)) return true
      // support wildcard for *.b-cdn.net
      if (host.endsWith('.b-cdn.net')) return true
      return false
    } catch {
      // If URL parsing fails, treat as not allowed and use placeholder
      return false
    }
  }

  const safeSrc = hasValidSrc && isAllowedExternal(src) ? src : getEventPlaceholder(category)
  
  if (imageError || !hasValidSrc) {
    if (fill) {
      return (
        <Image
          src={getEventPlaceholder(category)}
          alt={`${alt} (placeholder)`}
          fill
          className={className}
          unoptimized // For SVG data URLs
        />
      )
    }
    
    return (
      <Image
        src={getEventPlaceholder(category)}
        alt={`${alt} (placeholder)`}
        className={className}
        width={width || 400}
        height={height || 300}
        unoptimized // For SVG data URLs
      />
    )
  }
  
  if (fill) {
    return (
      <Image
        src={safeSrc}
        alt={alt}
        fill
        className={className}
        onError={() => setImageError(true)}
        priority={priority}
        unoptimized // For static export compatibility
      />
    )
  }
  
  return (
    <Image
      src={safeSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      onError={() => setImageError(true)}
      priority={priority}
      unoptimized // For static export compatibility
    />
  )
}