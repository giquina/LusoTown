/**
 * Cloudinary CDN Integration for LusoTown
 * Provides optimized image delivery for Portuguese-speaking community platform
 */

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'lusotown'
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`

// Image quality presets for different use cases
export const QUALITY_PRESETS = {
  thumbnail: 'q_auto:low,w_150,h_150,c_fill',
  small: 'q_auto:good,w_300,h_200,c_fill',
  medium: 'q_auto:good,w_600,h_400,c_fill',
  large: 'q_auto:good,w_1200,h_800,c_fill',
  hero: 'q_auto:best,w_1920,h_1080,c_fill',
  profile: 'q_auto:good,w_200,h_200,c_fill,g_face',
  event: 'q_auto:good,w_400,h_300,c_fill',
  gallery: 'q_auto:good,w_800,h_600,c_fill'
} as const

export type QualityPreset = keyof typeof QUALITY_PRESETS

// Portuguese-speaking community specific transformations
export const COMMUNITY_TRANSFORMATIONS = {
  // Add Portuguese flag overlay for official content
  officialContent: 'l_lusotown:portuguese_flag,w_50,g_north_east,x_10,y_10',
  // Warm color grading for Lusophone aesthetic
  portugueseFilter: 'e_improve:outdoor:20,e_vibrance:20,e_saturation:10',
  // Privacy blur for sensitive content
  privacyBlur: 'e_blur:300',
  // Heritage preservation filter
  heritage: 'e_sepia:50,e_improve:outdoor:10'
} as const

/**
 * Generate optimized Cloudinary URL for images
 * @param publicId - Cloudinary public ID or asset path
 * @param preset - Quality preset for optimization
 * @param transformations - Additional transformations
 * @returns Optimized image URL
 */
export function getCloudinaryUrl(
  publicId: string,
  preset: QualityPreset = 'medium',
  transformations: string[] = []
): string {
  if (!publicId) {
    return getFallbackImage(preset)
  }

  // Remove leading slash if present
  const cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId

  // Combine preset with additional transformations
  const allTransformations = [
    QUALITY_PRESETS[preset],
    'f_auto', // Auto format selection (WebP, AVIF, etc.)
    'dpr_auto', // Auto device pixel ratio
    ...transformations
  ].join(',')

  return `${CLOUDINARY_BASE_URL}/image/upload/${allTransformations}/${cleanPublicId}`
}

/**
 * Generate URL for Portuguese-speaking community assets
 * @param assetPath - Path to community asset
 * @param preset - Quality preset
 * @param isOfficial - Whether to add official overlay
 * @returns Optimized community asset URL
 */
export function getCommunityAssetUrl(
  assetPath: string,
  preset: QualityPreset = 'medium',
  isOfficial: boolean = false
): string {
  const transformations = [
    COMMUNITY_TRANSFORMATIONS.portugueseFilter
  ]

  if (isOfficial) {
    transformations.push(COMMUNITY_TRANSFORMATIONS.officialContent)
  }

  return getCloudinaryUrl(`community/${assetPath}`, preset, transformations)
}

/**
 * Generate URL for user profile images
 * @param userId - User ID
 * @param imageId - Image identifier
 * @param isPrivate - Whether to apply privacy blur
 * @returns Optimized profile image URL
 */
export function getProfileImageUrl(
  userId: string,
  imageId: string = 'default',
  isPrivate: boolean = false
): string {
  const transformations = []

  if (isPrivate) {
    transformations.push(COMMUNITY_TRANSFORMATIONS.privacyBlur)
  }

  return getCloudinaryUrl(`profiles/${userId}/${imageId}`, 'profile', transformations)
}

/**
 * Generate URL for event images
 * @param eventId - Event ID
 * @param imageId - Image identifier
 * @param heritage - Whether to apply heritage filter
 * @returns Optimized event image URL
 */
export function getEventImageUrl(
  eventId: string,
  imageId: string = 'main',
  heritage: boolean = false
): string {
  const transformations = []

  if (heritage) {
    transformations.push(COMMUNITY_TRANSFORMATIONS.heritage)
  }

  return getCloudinaryUrl(`events/${eventId}/${imageId}`, 'event', transformations)
}

/**
 * Generate fallback image for when no image is available
 * @param preset - Quality preset
 * @returns Fallback image URL
 */
export function getFallbackImage(preset: QualityPreset = 'medium'): string {
  return getCloudinaryUrl('lusotown/fallback/placeholder', preset, [
    'c_pad,b_rgb:f0f0f0', // Light gray background
    'l_text:Arial_40_bold:LusoTown,co_rgb:666666,g_center' // Text overlay
  ])
}

/**
 * Generate responsive image srcSet for Next.js Image component
 * @param publicId - Cloudinary public ID
 * @param preset - Base quality preset
 * @returns srcSet string for responsive images
 */
export function getResponsiveSrcSet(
  publicId: string,
  preset: QualityPreset = 'medium'
): string {
  const widths = [320, 640, 768, 1024, 1280, 1536]
  
  return widths.map(width => {
    const url = getCloudinaryUrl(publicId, preset, [`w_${width}`])
    return `${url} ${width}w`
  }).join(', ')
}

/**
 * Optimize existing image URLs to use Cloudinary
 * @param existingUrl - Current image URL
 * @param preset - Quality preset
 * @returns Cloudinary optimized URL or original if not applicable
 */
export function optimizeExistingImage(
  existingUrl: string,
  preset: QualityPreset = 'medium'
): string {
  // Check if already a Cloudinary URL
  if (existingUrl.includes('res.cloudinary.com')) {
    return existingUrl
  }

  // Check if it's a local asset
  if (existingUrl.startsWith('/') && !existingUrl.startsWith('//')) {
    // Convert local asset to Cloudinary
    const assetPath = existingUrl.startsWith('/') ? existingUrl.slice(1) : existingUrl
    return getCloudinaryUrl(`assets/${assetPath}`, preset)
  }

  // For external URLs, return as is (or implement fetch transformation)
  return existingUrl
}

/**
 * Portuguese-speaking community specific image enhancements
 */
export const PORTUGUESE_ENHANCEMENTS = {
  /**
   * Enhance Portuguese flag colors in images
   */
  enhanceFlag: 'e_replace_color:tolerance_30:from_rgb:ff0000:to_rgb:ff0000,e_replace_color:tolerance_30:from_rgb:00ff00:to_rgb:006600',
  
  /**
   * Warm Mediterranean lighting
   */
  mediterraneanLighting: 'e_improve:outdoor:30,e_vibrance:15,co_rgb:ffaa00,e_colorize:10',
  
  /**
   * Cultural heritage preservation
   */
  heritagePreservation: 'q_auto:best,e_improve:indoor:20,e_sharpen:50',
  
  /**
   * Community event enhancement
   */
  eventEnhancement: 'e_improve:outdoor:25,e_saturation:15,e_contrast:10'
}

/**
 * Generate URLs for Lusophone cultural assets
 * @param culturalType - Type of cultural content (heritage, flag, food, etc.)
 * @param assetId - Asset identifier
 * @param preset - Quality preset
 * @returns Culturally optimized image URL
 */
export function getCulturalAssetUrl(
  culturalType: 'heritage' | 'flag' | 'food' | 'festival' | 'landmark',
  assetId: string,
  preset: QualityPreset = 'medium'
): string {
  const transformations = [COMMUNITY_TRANSFORMATIONS.portugueseFilter]

  switch (culturalType) {
    case 'heritage':
      transformations.push(PORTUGUESE_ENHANCEMENTS.heritagePreservation)
      break
    case 'flag':
      transformations.push(PORTUGUESE_ENHANCEMENTS.enhanceFlag)
      break
    case 'food':
    case 'festival':
      transformations.push(PORTUGUESE_ENHANCEMENTS.mediterraneanLighting)
      break
    case 'landmark':
      transformations.push(PORTUGUESE_ENHANCEMENTS.eventEnhancement)
      break
  }

  return getCloudinaryUrl(`cultural/${culturalType}/${assetId}`, preset, transformations)
}

/**
 * Utility to check if Cloudinary is properly configured
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_CLOUD_NAME !== 'lusotown')
}

/**
 * Development helper to log Cloudinary URLs
 */
export function debugCloudinaryUrl(url: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('🌥️  Cloudinary URL:', url)
  }
}