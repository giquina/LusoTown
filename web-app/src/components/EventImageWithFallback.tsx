'use client'

import React, { useState } from 'react'
import OptimizedPortugueseImage from './OptimizedPortugueseImage'
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
  // Map category to cultural category for optimization
  const culturalCategory = category === 'networking' ? 'business' :
                           category === 'cultural' ? 'cultural' :
                           category === 'community' ? 'community' :
                           'events'

  return (
    <OptimizedPortugueseImage
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      culturalCategory={culturalCategory}
      enableLazyLoading={!priority}
      enableWebP={true}
      enableAVIF={true}
      mobileOptimized={true}
      placeholder="blur"
      blurDataURL={getEventPlaceholder(category)}
      onError={() => {
        console.log(`Failed to load image: ${src}`)
      }}
    />
  )
}