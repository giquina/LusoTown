'use client'

import React from 'react'
import Image, { ImageProps } from 'next/image'
import { 
  getCloudinaryUrl, 
  QualityPreset, 
  getFallbackImage, 
  getResponsiveSrcSet,
  optimizeExistingImage,
  isCloudinaryConfigured
} from '@/lib/cloudinary'

interface CloudinaryImageProps extends Omit<ImageProps, 'src' | 'srcSet'> {
  /** Cloudinary public ID or existing image URL */
  src: string
  /** Quality preset for optimization */
  preset?: QualityPreset
  /** Additional Cloudinary transformations */
  transformations?: string[]
  /** Whether to generate responsive srcSet */
  responsive?: boolean
  /** Fallback image when src is not available */
  fallback?: string
  /** Enable Portuguese community enhancements */
  communityEnhanced?: boolean
  /** Mark as official Portuguese content */
  official?: boolean
}

/**
 * CloudinaryImage - Optimized image component for LusoTown
 * Automatically optimizes images through Cloudinary CDN with Portuguese community features
 */
export default function CloudinaryImage({
  src,
  preset = 'medium',
  transformations = [],
  responsive = true,
  fallback,
  communityEnhanced = false,
  official = false,
  alt,
  className,
  ...props
}: CloudinaryImageProps) {
  // Handle missing or invalid src
  if (!src) {
    const fallbackSrc = fallback || getFallbackImage(preset)
    return (
      <Image
        src={fallbackSrc}
        alt={alt || 'LusoTown placeholder'}
        className={className}
        {...props}
      />
    )
  }

  // Prepare transformations
  const allTransformations = [...transformations]

  // Add community enhancements if requested
  if (communityEnhanced) {
    allTransformations.push('e_improve:outdoor:20,e_vibrance:20,e_saturation:10')
  }

  // Add official content overlay if requested
  if (official) {
    allTransformations.push('l_lusotown:portuguese_flag,w_50,g_north_east,x_10,y_10')
  }

  // Generate optimized URL
  let optimizedSrc: string
  
  if (isCloudinaryConfigured()) {
    // Use Cloudinary optimization
    if (src.includes('res.cloudinary.com')) {
      // Already a Cloudinary URL
      optimizedSrc = src
    } else {
      // Optimize through Cloudinary
      optimizedSrc = getCloudinaryUrl(src, preset, allTransformations)
    }
  } else {
    // Fallback to original URL if Cloudinary not configured
    optimizedSrc = optimizeExistingImage(src, preset)
  }

  // Generate responsive srcSet if enabled
  const srcSet = responsive && isCloudinaryConfigured() 
    ? getResponsiveSrcSet(src, preset)
    : undefined

  return (
    <Image
      src={optimizedSrc}
      srcSet={srcSet}
      alt={alt}
      className={className}
      onError={(e) => {
        // Fallback to placeholder on error
        const target = e.target as HTMLImageElement
        target.src = fallback || getFallbackImage(preset)
      }}
      {...props}
    />
  )
}

/**
 * Specialized CloudinaryImage variants for common use cases
 */

interface ProfileImageProps extends Omit<CloudinaryImageProps, 'preset'> {
  userId?: string
  imageId?: string
  size?: 'small' | 'medium' | 'large'
}

export function ProfileImage({ 
  userId, 
  imageId = 'default', 
  size = 'medium',
  src,
  ...props 
}: ProfileImageProps) {
  const presetMap = {
    small: 'thumbnail' as const,
    medium: 'profile' as const,
    large: 'large' as const
  }

  const profileSrc = src || (userId ? `profiles/${userId}/${imageId}` : '')

  return (
    <CloudinaryImage
      src={profileSrc}
      preset={presetMap[size]}
      transformations={['c_fill,g_face']} // Focus on face for profile images
      {...props}
    />
  )
}

interface EventImageProps extends Omit<CloudinaryImageProps, 'preset'> {
  eventId?: string
  imageId?: string
  heritage?: boolean
}

export function EventImage({ 
  eventId, 
  imageId = 'main', 
  heritage = false,
  src,
  ...props 
}: EventImageProps) {
  const eventSrc = src || (eventId ? `events/${eventId}/${imageId}` : '')
  const transformations = heritage ? ['e_sepia:50,e_improve:outdoor:10'] : []

  return (
    <CloudinaryImage
      src={eventSrc}
      preset="event"
      transformations={transformations}
      communityEnhanced={true}
      {...props}
    />
  )
}

interface CommunityImageProps extends Omit<CloudinaryImageProps, 'preset'> {
  category: 'heritage' | 'culture' | 'food' | 'festival' | 'landmark'
  imageId: string
}

export function CommunityImage({ 
  category, 
  imageId, 
  ...props 
}: CommunityImageProps) {
  const communitySrc = `community/${category}/${imageId}`

  const categoryTransformations = {
    heritage: ['e_sepia:30,e_improve:outdoor:15'],
    culture: ['e_vibrance:25,e_saturation:15'],
    food: ['e_vibrance:30,e_saturation:20,e_improve:indoor:20'],
    festival: ['e_improve:outdoor:25,e_saturation:15,e_contrast:10'],
    landmark: ['e_improve:outdoor:20,e_vibrance:15']
  }

  return (
    <CloudinaryImage
      src={communitySrc}
      preset="medium"
      transformations={categoryTransformations[category]}
      communityEnhanced={true}
      official={category === 'heritage'}
      {...props}
    />
  )
}

/**
 * Hero image with advanced optimizations
 */
export function HeroImage(props: Omit<CloudinaryImageProps, 'preset'>) {
  return (
    <CloudinaryImage
      preset="hero"
      responsive={true}
      communityEnhanced={true}
      transformations={[
        'e_improve:outdoor:30',
        'e_vibrance:20',
        'q_auto:best'
      ]}
      {...props}
    />
  )
}

/**
 * Gallery image optimized for viewing
 */
export function GalleryImage(props: Omit<CloudinaryImageProps, 'preset'>) {
  return (
    <CloudinaryImage
      preset="gallery"
      responsive={true}
      transformations={[
        'e_improve:outdoor:15',
        'e_sharpen:50'
      ]}
      {...props}
    />
  )
}