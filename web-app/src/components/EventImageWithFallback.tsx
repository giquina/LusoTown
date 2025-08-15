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
    return (
      <Image
        src={getEventPlaceholder(category)}
        alt={`${alt} (placeholder)`}
        className={className}
        width={width}
        height={height}
      />
    )
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      onError={() => setImageError(true)}
      priority={priority}
      unoptimized // For static export compatibility
    />
  )
}