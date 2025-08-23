# Cloudinary CDN Integration for LusoTown

This document explains the Cloudinary integration for optimized image delivery in the LusoTown Portuguese-speaking community platform.

## Overview

LusoTown uses Cloudinary for advanced image optimization, transformation, and delivery. The integration includes Portuguese-speaking community-specific enhancements and cultural content optimizations.

## Features

### 🌟 Core Features
- **Automatic Format Selection**: WebP, AVIF based on browser support
- **Responsive Images**: Auto-generated srcSets for different screen sizes
- **Quality Optimization**: Adaptive quality based on content type
- **Portuguese-speaking community Enhancements**: Cultural color grading and filters

### 🇵🇹 Portuguese-speaking community Specific
- **Heritage Preservation Filters**: Optimized for cultural documentation
- **Official Content Overlay**: Portuguese flag overlay for verified content
- **Mediterranean Lighting**: Warm color grading for Portuguese aesthetics
- **Cultural Asset Organization**: Structured folders for heritage, food, festivals

## Setup

### 1. Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=lusotown_uploads
```

### 2. Cloudinary Folder Structure

Organize assets in Cloudinary:

```
lusotown/
├── community/
│   ├── heritage/        # Portuguese heritage sites, artifacts
│   ├── culture/         # Cultural events, traditions
│   ├── food/           # Portuguese cuisine
│   ├── festival/       # Community festivals
│   └── landmark/       # Portuguese landmarks in UK
├── profiles/
│   └── {userId}/       # User profile images
├── events/
│   └── {eventId}/      # Event images
├── assets/             # General platform assets
└── fallback/           # Placeholder images
```

## Usage

### Basic CloudinaryImage Component

```tsx
import CloudinaryImage from '@/components/CloudinaryImage'

// Basic usage
<CloudinaryImage
  src="community/heritage/tower-of-belem"
  alt="Torre de Belém"
  width={400}
  height={300}
  preset="medium"
/>

// With Portuguese-speaking community enhancements
<CloudinaryImage
  src="community/festival/festa-do-fado"
  alt="Festa do Fado"
  width={600}
  height={400}
  preset="large"
  communityEnhanced={true}
  official={true}
/>
```

### Specialized Components

#### Profile Images
```tsx
import { ProfileImage } from '@/components/CloudinaryImage'

<ProfileImage
  userId="user123"
  imageId="avatar"
  alt="Maria Silva"
  width={200}
  height={200}
  size="medium"
/>
```

#### Event Images
```tsx
import { EventImage } from '@/components/CloudinaryImage'

<EventImage
  eventId="event456"
  imageId="main"
  alt="Portuguese Cultural Festival"
  width={400}
  height={300}
  heritage={true}
/>
```

#### Community Cultural Images
```tsx
import { CommunityImage } from '@/components/CloudinaryImage'

<CommunityImage
  category="food"
  imageId="pasteis-de-nata"
  alt="Pastéis de Nata"
  width={300}
  height={200}
/>
```

### Direct API Usage

```tsx
import { 
  getCloudinaryUrl, 
  getCommunityAssetUrl,
  getCulturalAssetUrl 
} from '@/lib/cloudinary'

// Basic optimization
const optimizedUrl = getCloudinaryUrl('my-image', 'medium')

// Community asset with official overlay
const communityUrl = getCommunityAssetUrl('heritage/portugal-flag', 'large', true)

// Cultural asset with heritage filter
const culturalUrl = getCulturalAssetUrl('heritage', 'azulejo-tiles', 'large')
```

## Quality Presets

| Preset | Dimensions | Use Case |
|--------|------------|----------|
| `thumbnail` | 150x150 | Profile thumbnails, small previews |
| `small` | 300x200 | Card images, small components |
| `medium` | 600x400 | Standard content images |
| `large` | 1200x800 | Featured images, galleries |
| `hero` | 1920x1080 | Hero sections, banners |
| `profile` | 200x200 | User profile pictures |
| `event` | 400x300 | Event cards and listings |
| `gallery` | 800x600 | Photo galleries |

## Portuguese-speaking community Transformations

### Heritage Preservation
```
e_sepia:50,e_improve:outdoor:10
```
Optimized for historical documentation and cultural preservation.

### Mediterranean Lighting
```
e_improve:outdoor:30,e_vibrance:15,co_rgb:ffaa00,e_colorize:10
```
Warm, inviting lighting that reflects Portuguese coastal aesthetics.

### Official Content Overlay
```
l_lusotown:portuguese_flag,w_50,g_north_east,x_10,y_10
```
Adds Portuguese flag overlay for verified official content.

### Portuguese Flag Enhancement
```
e_replace_color:tolerance_30:from_rgb:ff0000:to_rgb:ff0000
```
Enhances flag colors in images for better visibility.

## Best Practices

### 1. Asset Organization
- Use descriptive folder names in Portuguese and English
- Include location data for geo-specific content
- Tag cultural significance levels

### 2. Performance
- Always use appropriate presets for context
- Enable responsive images for better mobile experience
- Use lazy loading for gallery images

### 3. Cultural Sensitivity
- Apply heritage filters to historical content
- Use official overlays only for verified sources
- Respect privacy with blur transformations

### 4. SEO Optimization
- Include descriptive alt text in Portuguese and English
- Use semantic file names
- Optimize for Core Web Vitals

## Migration from Standard Images

### Automatic Migration
The `optimizeExistingImage` function can automatically convert existing URLs:

```tsx
import { optimizeExistingImage } from '@/lib/cloudinary'

// Converts local or external URLs to Cloudinary
const optimized = optimizeExistingImage('/images/old-image.jpg', 'medium')
```

### Manual Migration Steps
1. Upload assets to Cloudinary with proper folder structure
2. Replace Image components with CloudinaryImage
3. Update alt text to be bilingual
4. Apply appropriate Portuguese-speaking community enhancements

## Troubleshooting

### Images Not Loading
- Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` environment variable
- Verify public ID exists in Cloudinary
- Check network connectivity

### Poor Image Quality
- Use appropriate preset for content type
- Verify transformations are correctly applied
- Check source image resolution

### Slow Loading
- Enable responsive images
- Use appropriate presets (avoid `hero` for small images)
- Implement lazy loading

## Development Tools

### Debug Mode
```tsx
import { debugCloudinaryUrl } from '@/lib/cloudinary'

// Logs Cloudinary URLs in development
debugCloudinaryUrl(myUrl)
```

### Configuration Check
```tsx
import { isCloudinaryConfigured } from '@/lib/cloudinary'

if (isCloudinaryConfigured()) {
  // Cloudinary is ready
} else {
  // Use fallback images
}
```

## Analytics and Monitoring

Monitor Cloudinary usage through:
- Cloudinary Dashboard for bandwidth and transformations
- Next.js Image optimization metrics
- Core Web Vitals for performance impact

## Future Enhancements

### Planned Features
- AI-powered cultural content tagging
- Automatic Portuguese language detection in images
- Enhanced heritage preservation filters
- Community-generated content moderation

### Integration Opportunities
- Portuguese OCR for historical documents
- Automatic Portuguese location tagging
- Cultural significance scoring
- Community voting on image quality

## Support

For issues with Cloudinary integration:
1. Check environment variables
2. Verify Cloudinary account settings
3. Review component props and transformations
4. Check browser console for errors

## Portuguese-speaking community Guidelines

When working with Portuguese cultural content:
- Respect historical accuracy in heritage images
- Use appropriate filters for different content types
- Include bilingual descriptions
- Consider cultural sensitivity in transformations
- Maintain high quality for preservation purposes

---

This integration ensures that LusoTown delivers optimized, culturally-appropriate images that enhance the Portuguese-speaking community experience while maintaining excellent performance and accessibility.