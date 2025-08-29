'use client'

import { useState } from 'react'
import Image from 'next/image'

interface EventImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function EventImageWithFallback({
  src,
  alt,
  width,
  height,
  className = ''
}: EventImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div 
        className={`bg-primary-100 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-primary-600 text-2xl">🎉</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}
