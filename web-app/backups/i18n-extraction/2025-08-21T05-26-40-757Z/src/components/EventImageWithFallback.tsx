'use client'

import React, { useState } from 'react'
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
  
  if (imageError) {
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
        src={src}
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
      src={src}
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