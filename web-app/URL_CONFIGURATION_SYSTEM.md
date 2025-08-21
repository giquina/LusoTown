# LusoTown URL Configuration System

## Overview

Comprehensive URL configuration system implemented to eliminate hardcoded URLs throughout the LusoTown codebase. This system centralizes all external URLs, supports environment-specific configurations, and provides helper functions for dynamic URL building.

## Implementation Status

### ✅ Completed

**Core URL Configuration (`/src/config/cdn.ts`)**
- CDN and image providers (Unsplash, Cloudinary, BunnyCDN)
- University partnership URLs (UCL, KCL, Oxford, Cambridge, etc.)
- Portuguese cultural resources (Consulado, Instituto Camões, RTP, etc.)
- External services (Stripe, YouTube API, SendGrid, Resend)
- Streaming infrastructure (development vs production URLs)
- Social media URLs (synchronized with contact config)

**Helper Functions**
- `buildUnsplashUrl()` - Enhanced image URL building with optimization
- `buildPortugueseImageUrl()` - Portuguese community-focused images
- `buildAvatarUrl()` - Profile/avatar image URLs
- `buildUniversityUrl()` - University website URLs
- `buildPortugueseResourceUrl()` - Portuguese cultural resource URLs
- `buildStreamingUrl()` - Environment-aware streaming URLs
- `getEnvironmentUrl()` - Development vs production URL helper

**Files Updated**
- `/src/config/cdn.ts` - Main URL configuration
- `/src/config/index.ts` - Export centralized URLs
- `/src/app/students/page.tsx` - University URLs
- `/src/app/api/email/send/route.ts` - SendGrid/Resend URLs
- `/src/app/api/streams/auth/route.ts` - Streaming URLs
- `/src/app/api/favorites/route.ts` - Image URLs
- `/src/app/api/feed/route.ts` - Image and avatar URLs
- `/src/content/testimonials.ts` - Avatar URLs
- `/src/services/YouTubeAPIService.ts` - YouTube API URLs
- `/src/services/InternationalPartnership.ts` - Portuguese resource URLs
- `/src/app/instituto-camoes/page.tsx` - Institute Camões URLs
- `/src/app/academy/live-streaming/page.tsx` - OBS help URLs
- `/src/app/onboarding-demo/page.tsx` - WhatsApp URLs
- `.env.local.example` - Environment variable documentation

### 🔄 Partially Completed

**Components with Remaining Hardcoded URLs**
- `/src/components/PersonalizedFeed.tsx`
- `/src/components/NetworkPreview.tsx`
- `/src/components/MentorshipHero.tsx`
- `/src/components/TransportTestimonials.tsx`
- `/src/components/ConnectionCard.tsx`
- `/src/components/CustomToursSection.tsx`
- `/src/components/social/SocialFeed.tsx`
- `/src/components/social/PeopleYouMayKnow.tsx`
- `/src/components/ToursActivitiesShowcase.tsx`
- `/src/components/EventFeed.tsx`

### 📋 Still To Do

**Context Files**
- `/src/context/NetworkingContext.tsx`
- `/src/context/FollowingContext.tsx`

**Library Files**
- `/src/lib/events.ts`
- `/src/lib/london-events-additional.ts`
- `/src/lib/networkingEvents.ts`
- `/src/lib/businessDirectory.ts`
- `/src/lib/business-events-london.ts`
- `/src/lib/directory.ts`
- `/src/lib/profileImages.ts`

**Other Components**
- `/src/components/GroupEventsSection.tsx`
- `/src/components/CommunityFeedSection.tsx`
- `/src/components/matches/SaudadeMatchingDemo.tsx`
- `/src/components/matches/SaudadeCompatibilityEngine.tsx`
- `/src/components/MatchSuccessStoryGenerator.tsx`
- `/src/components/ServiceIntegrationFeed.tsx`

## Usage Examples

### Basic Image URL Building
```typescript
import { buildPortugueseImageUrl, buildAvatarUrl } from '@/config/cdn'

// Event image
const eventImage = buildPortugueseImageUrl('1493225457124-a3eb161ffa5f')
// Result: https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center&auto=format

// Avatar image
const avatar = buildAvatarUrl('1507003211169-0a1dd7228f2d')
// Result: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format
```

### University and Portuguese Resource URLs
```typescript
import { UNIVERSITY_URLS, buildPortugueseResourceUrl } from '@/config/cdn'

// University website
const uclWebsite = UNIVERSITY_URLS.ucl
// Result: https://www.ucl.ac.uk (configurable via env)

// Instituto Camões event registration
const fadoEvent = buildPortugueseResourceUrl('fadoMasterclass')
// Result: https://instituto-camoes.pt/fado-masterclass (configurable via env)
```

### Environment-Aware Streaming URLs
```typescript
import { buildStreamingUrl } from '@/config/cdn'

// HLS stream URL
const hlsUrl = buildStreamingUrl('hls', 'stream123')
// Development: http://localhost:8080/live/stream123.m3u8
// Production: https://stream.lusotown.com/live/stream123.m3u8
```

## Environment Variables

All URLs support environment variable configuration for flexibility across development, staging, and production environments.

### Key Environment Variables
```bash
# CDN Providers
NEXT_PUBLIC_UNSPLASH_BASE_URL=https://images.unsplash.com
NEXT_PUBLIC_CLOUDINARY_BASE_URL=https://res.cloudinary.com/dqhbeqttp

# Universities
NEXT_PUBLIC_UCL_URL=https://www.ucl.ac.uk
NEXT_PUBLIC_KCL_URL=https://www.kcl.ac.uk

# Portuguese Resources
NEXT_PUBLIC_CONSULADO_URL=https://london.embaixadaportugal.mne.gov.pt
NEXT_PUBLIC_INSTITUTO_CAMOES_URL=https://instituto-camoes.pt

# External Services
NEXT_PUBLIC_SENDGRID_API_URL=https://api.sendgrid.com/v3/mail/send
NEXT_PUBLIC_YOUTUBE_API_URL=https://www.googleapis.com/youtube/v3

# Streaming (Environment-aware)
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080  # Dev
NEXT_PUBLIC_STREAMING_SERVER_URL=https://stream.lusotown.com  # Prod
```

## Benefits

1. **Centralized Management**: All URLs managed in one location
2. **Environment Flexibility**: Easy switching between dev/staging/prod
3. **Performance Optimization**: Image URLs include optimization parameters
4. **Type Safety**: TypeScript support for URL keys and builders
5. **Cultural Context**: Portuguese-specific URL builders and resources
6. **Maintainability**: Easy updates without searching through codebase
7. **Testing**: Mock URLs easily for testing environments

## Migration Guide

### For New Development
```typescript
// ❌ Don't do this
const imageUrl = 'https://images.unsplash.com/photo-123?w=600&h=400'
const university = 'https://www.ucl.ac.uk'

// ✅ Do this instead
import { buildPortugueseImageUrl, UNIVERSITY_URLS } from '@/config/cdn'
const imageUrl = buildPortugueseImageUrl('123')
const university = UNIVERSITY_URLS.ucl
```

### For Existing Files
1. Import the appropriate URL constants or builders
2. Replace hardcoded URLs with configuration-based ones
3. Test that URLs work in both development and production
4. Update any related environment variables

## Next Steps

1. Complete remaining component migrations
2. Update context files with centralized URLs
3. Migrate library files to use URL builders
4. Add URL validation in CI/CD pipeline
5. Create URL audit script for ongoing maintenance
6. Document URL patterns for team members

## Architecture Decisions

### Why Centralize URLs?
- **Security**: Easier to audit and update external dependencies
- **Performance**: Consistent optimization parameters across images
- **Reliability**: Single source of truth for service endpoints
- **Compliance**: Easier GDPR/data protection compliance tracking

### Why Environment Variables?
- **Flexibility**: Different URLs for different environments
- **Security**: Sensitive endpoints not hardcoded in source
- **Deployment**: Easy configuration changes without code changes
- **Testing**: Mock services in test environments

### Why Helper Functions?
- **Consistency**: Standardized URL building patterns
- **Optimization**: Automatic image optimization parameters
- **Validation**: Type safety and parameter validation
- **Maintenance**: Centralized logic for URL construction

This URL configuration system provides a robust foundation for managing external dependencies and URLs across the LusoTown platform while maintaining flexibility for different deployment environments.