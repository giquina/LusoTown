# LusoTown Streaming Platform - Developer Guide

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Development Environment Setup](#development-environment-setup)
4. [Portuguese Cultural Integration](#portuguese-cultural-integration)
5. [Streaming Components](#streaming-components)
6. [Real-time Chat System](#real-time-chat-system)
7. [Creator Monetization](#creator-monetization)
8. [Mobile Development](#mobile-development)
9. [Testing Strategies](#testing-strategies)
10. [Performance Optimization](#performance-optimization)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Overview

The LusoTown Streaming Platform is a comprehensive streaming solution designed specifically for the Portuguese-speaking community. This developer guide covers technical implementation, cultural integration requirements, and best practices for maintaining the platform.

### Key Technologies

```yaml
Frontend:
  - Next.js 14 (App Router)
  - TypeScript 5.0+
  - TailwindCSS 3.0+
  - Framer Motion
  - HLS.js for video playback
  - Socket.io-client for real-time features

Backend:
  - Node.js 18+ / Express
  - Simple Relay Server (SRS) for streaming
  - Redis for real-time data
  - PostgreSQL (Supabase) for persistent data
  - Socket.io for WebSocket connections

Infrastructure:
  - Docker containers
  - BunnyCDN for video delivery
  - Vercel for web hosting
  - Digital Ocean for media servers
```

### Cultural Requirements

All streaming features must include:
- **Bilingual Support**: Portuguese and English
- **Regional Awareness**: Portugal, Brazil, Africa, Diaspora
- **Cultural Sensitivity**: AI moderation for Portuguese content
- **Authentic Elements**: Portuguese emotes, cultural categories, heritage focus

---

## Architecture

### System Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │  Mobile Client  │    │  Creator Tools  │
│   (Next.js)     │    │  (React Native) │    │    (Dashboard)  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │     API Gateway           │
                    │  (Load Balancer + Auth)   │
                    └─────────────┬─────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
┌───────▼───────┐      ┌─────────▼─────────┐      ┌───────▼───────┐
│ Streaming API │      │ Portuguese Chat   │      │ Monetization  │
│   Service     │      │     Service       │      │   Service     │
└───────┬───────┘      └─────────┬─────────┘      └───────┬───────┘
        │                        │                        │
┌───────▼───────┐      ┌─────────▼─────────┐      ┌───────▼───────┐
│  SRS Media    │      │    Redis          │      │   Payment     │
│   Server      │      │  (Chat/Sessions)  │      │  Processor    │
└───────┬───────┘      └───────────────────┘      └───────────────┘
        │
┌───────▼───────┐
│   BunnyCDN    │
│ (Video CDN)   │
└───────────────┘
```

### Database Schema

#### Core Streaming Tables

```sql
-- Streaming channels
CREATE TABLE streaming_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  channel_name VARCHAR(255) NOT NULL,
  channel_slug VARCHAR(100) UNIQUE NOT NULL,
  description_pt TEXT,
  description_en TEXT,
  youtube_channel_id VARCHAR(100),
  portuguese_verified BOOLEAN DEFAULT FALSE,
  cultural_regions TEXT[] DEFAULT '{}',
  subscriber_count INTEGER DEFAULT 0,
  total_views BIGINT DEFAULT 0,
  revenue_share_percentage DECIMAL(3,2) DEFAULT 0.70,
  creator_tier creator_tier_enum DEFAULT 'affiliate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live streams
CREATE TABLE live_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES streaming_channels(id) ON DELETE CASCADE,
  category_id UUID REFERENCES stream_categories(id),
  title_pt VARCHAR(255),
  title_en VARCHAR(255),
  description_pt TEXT,
  description_en TEXT,
  stream_key VARCHAR(255) UNIQUE NOT NULL,
  rtmp_endpoint VARCHAR(500),
  hls_playlist_url VARCHAR(500),
  webrtc_url VARCHAR(500),
  youtube_stream_id VARCHAR(100),
  status stream_status_enum DEFAULT 'scheduled',
  access_level access_level_enum DEFAULT 'public',
  max_viewers INTEGER DEFAULT 1000,
  current_viewers INTEGER DEFAULT 0,
  peak_viewers INTEGER DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  portuguese_content_percentage INTEGER DEFAULT 0,
  cultural_tags TEXT[] DEFAULT '{}',
  target_regions TEXT[] DEFAULT '{}',
  scheduled_start TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portuguese emotes
CREATE TABLE portuguese_emotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name_pt VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  cultural_context TEXT,
  usage_context TEXT,
  regions TEXT[] DEFAULT '{}',
  rarity emote_rarity_enum DEFAULT 'common',
  creator_tier_required creator_tier_enum DEFAULT 'affiliate',
  usage_count BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Enums

```sql
CREATE TYPE creator_tier_enum AS ENUM ('affiliate', 'partner', 'elite');
CREATE TYPE stream_status_enum AS ENUM ('scheduled', 'live', 'ended', 'cancelled');
CREATE TYPE access_level_enum AS ENUM ('public', 'registered', 'premium');
CREATE TYPE emote_rarity_enum AS ENUM ('common', 'rare', 'epic', 'legendary');
```

---

## Development Environment Setup

### Prerequisites

```bash
# System requirements
Node.js 18+
Docker Desktop
Redis Server
PostgreSQL 14+
```

### Local Development Setup

```bash
# Clone and setup
git clone https://github.com/lusotown/streaming-platform.git
cd streaming-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Configuration

```env
# .env.local
# Core API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Streaming Infrastructure
SRS_SERVER_URL=rtmp://localhost:1935/live
HLS_OUTPUT_DIR=/var/www/hls
WEBRTC_SERVER_URL=http://localhost:1985

# CDN Configuration
BUNNY_CDN_API_KEY=your_bunny_cdn_key
BUNNY_CDN_STREAM_ENDPOINT=https://stream.bunnycdn.com
BUNNY_CDN_PULL_ZONE=your_pull_zone_id

# Portuguese Features
PORTUGUESE_EMOTES_CDN=https://emotes.lusotown.com
CULTURAL_CONTENT_API=https://cultural-api.lusotown.com
MODERATION_API_KEY=your_moderation_api_key

# Payment Processing
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PIX_WEBHOOK_SECRET=your_pix_webhook_secret
MBWAY_API_KEY=your_mbway_api_key

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_redis_password

# Development Features
DEBUG_STREAMING=true
MOCK_PAYMENTS=true
BYPASS_MODERATION=false
```

### Docker Development Stack

```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  # SRS Media Server
  srs-server:
    image: ossrs/srs:4
    ports:
      - "1935:1935"   # RTMP
      - "1985:1985"   # HTTP API
      - "8080:8080"   # HTTP Server
    volumes:
      - ./srs.conf:/usr/local/srs/conf/srs.conf
      - ./hls:/usr/local/srs/objs/nginx/html
    environment:
      - CANDIDATE=localhost

  # Redis for chat and sessions
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  # PostgreSQL (if not using Supabase)
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: lusotown_streaming
      POSTGRES_USER: lusotown
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
```

### Start Development Environment

```bash
# Start infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Start Next.js development
npm run dev

# Start Socket.io server (separate terminal)
npm run dev:websocket

# Start Portuguese chat service
npm run dev:chat
```

---

## Portuguese Cultural Integration

### Language Support Implementation

#### Bilingual Context Hook

```typescript
// hooks/usePortugueseLanguage.ts
import { useLanguage } from '@/context/LanguageContext';

interface PortugueseText {
  pt: string;
  en: string;
}

export function usePortugueseLanguage() {
  const { language } = useLanguage();
  
  const t = (text: PortugueseText | string): string => {
    if (typeof text === 'string') return text;
    return text[language as 'pt' | 'en'] || text.en;
  };

  const formatPortugueseNumber = (num: number): string => {
    return new Intl.NumberFormat(language === 'pt' ? 'pt-PT' : 'en-GB').format(num);
  };

  const formatPortugueseCurrency = (amount: number, currency: 'EUR' | 'GBP' | 'BRL'): string => {
    const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return { t, formatPortugueseNumber, formatPortugueseCurrency, language };
}
```

#### Cultural Region Detection

```typescript
// lib/cultural-regions.ts
export type PortugueseRegion = 'portugal' | 'brazil' | 'angola' | 'mozambique' | 
                               'cape_verde' | 'guinea_bissau' | 'sao_tome' | 
                               'east_timor' | 'diaspora';

export interface CulturalContext {
  region: PortugueseRegion;
  preferredLanguageVariant: 'pt-PT' | 'pt-BR';
  timezone: string;
  currency: 'EUR' | 'BRL' | 'GBP';
  culturalEvents: string[];
  preferredEmotes: string[];
}

export function detectCulturalRegion(userProfile: any): CulturalContext {
  // Implementation based on user location, language preference, cultural markers
  const region = userProfile.region || 'diaspora';
  
  const regionalConfigs: Record<PortugueseRegion, CulturalContext> = {
    portugal: {
      region: 'portugal',
      preferredLanguageVariant: 'pt-PT',
      timezone: 'Europe/Lisbon',
      currency: 'EUR',
      culturalEvents: ['santos_populares', 'festa_vindimas', 'natal_portugues'],
      preferredEmotes: [':pastelnata:', ':fado:', ':azulejo:', ':vinho_porto:']
    },
    brazil: {
      region: 'brazil',
      preferredLanguageVariant: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      currency: 'BRL',
      culturalEvents: ['carnaval', 'festa_junina', 'independencia'],
      preferredEmotes: [':caipirinha:', ':samba:', ':acai:', ':feijoada:']
    },
    diaspora: {
      region: 'diaspora',
      preferredLanguageVariant: 'pt-PT',
      timezone: 'Europe/London',
      currency: 'GBP',
      culturalEvents: ['encontros_comunidade', 'natal_saudade'],
      preferredEmotes: [':saudade:', ':coracao:', ':tradicao:', ':comunidade:']
    }
    // ... other regions
  };

  return regionalConfigs[region] || regionalConfigs.diaspora;
}
```

### Portuguese Emotes System

#### Emote Component

```typescript
// components/PortugueseEmote.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EmoteData {
  code: string;
  name_pt: string;
  name_en: string;
  image_url: string;
  cultural_context: string;
  regions: string[];
}

interface PortugueseEmoteProps {
  code: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  onClick?: (emote: EmoteData) => void;
}

export function PortugueseEmote({ 
  code, 
  size = 'md', 
  showTooltip = true, 
  onClick 
}: PortugueseEmoteProps) {
  const [emoteData, setEmoteData] = useState<EmoteData | null>(null);
  const [showTooltipState, setShowTooltipState] = useState(false);
  const { t, language } = usePortugueseLanguage();

  useEffect(() => {
    fetchEmoteData(code).then(setEmoteData);
  }, [code]);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  if (!emoteData) {
    return <span className="text-purple-500">{code}</span>;
  }

  return (
    <div className="relative inline-block">
      <Image
        src={emoteData.image_url}
        alt={language === 'pt' ? emoteData.name_pt : emoteData.name_en}
        width={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
        height={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
        className={`${sizeClasses[size]} cursor-pointer hover:scale-110 transition-transform`}
        onMouseEnter={() => showTooltip && setShowTooltipState(true)}
        onMouseLeave={() => setShowTooltipState(false)}
        onClick={() => onClick?.(emoteData)}
      />
      
      {showTooltip && showTooltipState && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
          <div className="font-medium">
            {language === 'pt' ? emoteData.name_pt : emoteData.name_en}
          </div>
          <div className="text-gray-300 text-xs">
            {emoteData.cultural_context}
          </div>
        </div>
      )}
    </div>
  );
}

async function fetchEmoteData(code: string): Promise<EmoteData | null> {
  try {
    const response = await fetch(`/api/emotes/portuguese/${encodeURIComponent(code)}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
```

#### Cultural Content Validation

```typescript
// lib/cultural-validation.ts
export interface CulturalContentAnalysis {
  portugueseContentPercentage: number;
  culturalAuthenticity: number;
  regionalRelevance: Record<PortugueseRegion, number>;
  recommendedImprovements: string[];
  culturalTags: string[];
}

export async function analyzeCulturalContent(
  title: string,
  description: string,
  tags: string[],
  userRegion: PortugueseRegion
): Promise<CulturalContentAnalysis> {
  
  const culturalKeywords = {
    portugal: ['fado', 'azulejo', 'pastéis', 'porto', 'lisboa', 'tradição'],
    brazil: ['samba', 'capoeira', 'açaí', 'carnaval', 'rio', 'são paulo'],
    general: ['saudade', 'lusofonia', 'português', 'comunidade', 'herança']
  };

  const content = `${title} ${description} ${tags.join(' ')}`.toLowerCase();
  
  let portugueseContentScore = 0;
  let culturalMatches = 0;
  let regionalRelevance = {} as Record<PortugueseRegion, number>;

  // Analyze Portuguese language usage
  const portugueseIndicators = ['português', 'lusitano', 'lusófono', 'brasil', 'portugal'];
  portugueseContentScore = portugueseIndicators.filter(word => 
    content.includes(word)
  ).length / portugueseIndicators.length;

  // Analyze cultural keywords
  Object.entries(culturalKeywords).forEach(([region, keywords]) => {
    const matches = keywords.filter(keyword => content.includes(keyword)).length;
    if (region !== 'general') {
      regionalRelevance[region as PortugueseRegion] = matches / keywords.length;
    }
    culturalMatches += matches;
  });

  const culturalAuthenticity = Math.min(culturalMatches / 10, 1);

  const recommendedImprovements = [];
  if (portugueseContentScore < 0.6) {
    recommendedImprovements.push('Add more Portuguese language elements');
  }
  if (culturalAuthenticity < 0.4) {
    recommendedImprovements.push('Include traditional cultural references');
  }

  return {
    portugueseContentPercentage: Math.round(portugueseContentScore * 100),
    culturalAuthenticity,
    regionalRelevance,
    recommendedImprovements,
    culturalTags: extractCulturalTags(content)
  };
}

function extractCulturalTags(content: string): string[] {
  const tagPatterns = {
    'música_tradicional': ['fado', 'música tradicional', 'folclore'],
    'culinária': ['receita', 'culinária', 'comida tradicional', 'pastéis'],
    'negócios': ['empreendedorismo', 'business', 'startup'],
    'diáspora': ['imigração', 'comunidade', 'saudade', 'longe de casa']
  };

  const detectedTags = [];
  for (const [tag, patterns] of Object.entries(tagPatterns)) {
    if (patterns.some(pattern => content.includes(pattern))) {
      detectedTags.push(tag);
    }
  }

  return detectedTags;
}
```

---

## Streaming Components

### StreamPlayer Component

```typescript
// components/streaming/StreamPlayer.tsx
'use client'

import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { usePortugueseLanguage } from '@/hooks/usePortugueseLanguage';
import { useSubscription } from '@/context/SubscriptionContext';
import { PortugueseEmote } from './PortugueseEmote';

interface StreamPlayerProps {
  streamId: string;
  hlsUrl: string;
  isLive: boolean;
  accessLevel: 'public' | 'registered' | 'premium';
  culturalContext: CulturalContext;
  onViewerJoin?: () => void;
  onViewerLeave?: () => void;
}

export function StreamPlayer({ 
  streamId, 
  hlsUrl, 
  isLive, 
  accessLevel,
  culturalContext,
  onViewerJoin,
  onViewerLeave 
}: StreamPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { t } = usePortugueseLanguage();
  const { hasActiveSubscription } = useSubscription();

  useEffect(() => {
    // Check access permissions
    const checkAccess = () => {
      switch (accessLevel) {
        case 'public':
          return true;
        case 'registered':
          return true; // Assuming user is logged in
        case 'premium':
          return hasActiveSubscription;
        default:
          return false;
      }
    };

    setHasAccess(checkAccess());
  }, [accessLevel, hasActiveSubscription]);

  useEffect(() => {
    if (!hasAccess || !videoRef.current || !hlsUrl) return;

    // Initialize HLS.js
    if (Hls.isSupported()) {
      const hls = new Hls({
        liveDurationInfinity: true,
        liveMaxLatencyDuration: 10,
        liveSyncDurationCount: 3,
        liveBackBufferLength: 0
      });

      hls.loadSource(hlsUrl);
      hls.attachMedia(videoRef.current);
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      videoRef.current.src = hlsUrl;
    }
  }, [hasAccess, hlsUrl]);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      onViewerJoin?.();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onViewerLeave?.();
    }
  };

  if (!hasAccess) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary-900 to-secondary-900 rounded-xl flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <PortugueseEmote code=":premium:" size="lg" />
          <h3 className="text-xl font-bold">
            {t({ pt: 'Conteúdo Premium', en: 'Premium Content' })}
          </h3>
          <p className="max-w-md">
            {t({ 
              pt: 'Este stream é exclusivo para membros premium da comunidade lusófona.',
              en: 'This stream is exclusive to premium members of the Portuguese-speaking community.'
            })}
          </p>
          <button className="bg-premium-600 hover:bg-premium-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            {t({ pt: 'Tornar-se Premium', en: 'Go Premium' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-64 md:h-96"
        controls
        muted
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
        poster={`/api/streams/${streamId}/thumbnail`}
      />
      
      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 left-4 bg-action-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          {t({ pt: 'AO VIVO', en: 'LIVE' })}
        </div>
      )}

      {/* Viewer Count */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {viewerCount.toLocaleString()} {t({ pt: 'espectadores', en: 'viewers' })}
      </div>

      {/* Cultural Context Badge */}
      <div className="absolute bottom-4 left-4 bg-primary-600/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
        {culturalContext.region === 'portugal' && '🇵🇹'}
        {culturalContext.region === 'brazil' && '🇧🇷'} 
        {culturalContext.region === 'diaspora' && '🌍'}
      </div>
    </div>
  );
}
```

### Creator Dashboard Component

```typescript
// components/streaming/CreatorDashboard.tsx
import { useState, useEffect } from 'react';
import { usePortugueseLanguage } from '@/hooks/usePortugueseLanguage';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface CreatorMetrics {
  totalViewers: number;
  peakViewers: number;
  averageWatchTime: number;
  portugueseAudiencePercentage: number;
  revenueToday: number;
  newSubscribers: number;
  culturalEngagementScore: number;
  regionalBreakdown: Record<PortugueseRegion, number>;
}

export function CreatorDashboard({ creatorId }: { creatorId: string }) {
  const [metrics, setMetrics] = useState<CreatorMetrics | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const { t, formatPortugueseCurrency, formatPortugueseNumber } = usePortugueseLanguage();

  useEffect(() => {
    fetchCreatorMetrics(creatorId, timeRange).then(setMetrics);
  }, [creatorId, timeRange]);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">
              {t({ pt: 'Espectadores Totais', en: 'Total Viewers' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-600">
              {formatPortugueseNumber(metrics.totalViewers)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {metrics.peakViewers} {t({ pt: 'pico', en: 'peak' })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">
              {t({ pt: 'Audiência Portuguesa', en: 'Portuguese Audience' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-600">
              {metrics.portugueseAudiencePercentage}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t({ pt: 'da audiência total', en: 'of total audience' })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">
              {t({ pt: 'Receita Hoje', en: 'Revenue Today' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-600">
              {formatPortugueseCurrency(metrics.revenueToday, 'EUR')}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              +{metrics.newSubscribers} {t({ pt: 'novos subscritores', en: 'new subscribers' })}
            </p>
          </CardContent>
        </Card>

        <Card className="border-premium-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">
              {t({ pt: 'Engagement Cultural', en: 'Cultural Engagement' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-premium-600">
              {(metrics.culturalEngagementScore * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t({ pt: 'score de autenticidade', en: 'authenticity score' })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t({ pt: 'Distribuição Regional', en: 'Regional Distribution' })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(metrics.regionalBreakdown).map(([region, percentage]) => (
              <div key={region} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {region === 'portugal' && '🇵🇹'}
                    {region === 'brazil' && '🇧🇷'}
                    {region === 'angola' && '🇦🇴'}
                    {region === 'diaspora' && '🌍'}
                  </span>
                  <span className="font-medium">
                    {t({ 
                      pt: getPortugueseRegionName(region as PortugueseRegion), 
                      en: getEnglishRegionName(region as PortugueseRegion) 
                    })}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{percentage.toFixed(1)}%</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getPortugueseRegionName(region: PortugueseRegion): string {
  const names = {
    portugal: 'Portugal',
    brazil: 'Brasil',
    angola: 'Angola',
    mozambique: 'Moçambique',
    cape_verde: 'Cabo Verde',
    guinea_bissau: 'Guiné-Bissau',
    sao_tome: 'São Tomé e Príncipe',
    east_timor: 'Timor-Leste',
    diaspora: 'Diáspora'
  };
  return names[region] || region;
}

function getEnglishRegionName(region: PortugueseRegion): string {
  const names = {
    portugal: 'Portugal',
    brazil: 'Brazil',
    angola: 'Angola',
    mozambique: 'Mozambique',
    cape_verde: 'Cape Verde',
    guinea_bissau: 'Guinea-Bissau',
    sao_tome: 'São Tomé and Príncipe',
    east_timor: 'East Timor',
    diaspora: 'Diaspora'
  };
  return names[region] || region;
}

async function fetchCreatorMetrics(
  creatorId: string, 
  timeRange: string
): Promise<CreatorMetrics> {
  const response = await fetch(`/api/creator/${creatorId}/metrics?range=${timeRange}`);
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return response.json();
}
```

---

## Real-time Chat System

### Portuguese Chat Component

```typescript
// components/streaming/PortugueseChat.tsx
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePortugueseLanguage } from '@/hooks/usePortugueseLanguage';
import { PortugueseEmote } from './PortugueseEmote';

interface ChatMessage {
  id: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    region: PortugueseRegion;
    isSubscriber: boolean;
    isModerator: boolean;
    badges: string[];
  };
  message: string;
  emotes: Array<{
    code: string;
    url: string;
    culturalContext: string;
  }>;
  timestamp: Date;
  moderationScore: number;
}

interface PortugueseChatProps {
  streamId: string;
  userRegion: PortugueseRegion;
  canChat: boolean;
}

export function PortugueseChat({ streamId, userRegion, canChat }: PortugueseChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmotePicker, setShowEmotePicker] = useState(false);
  const [availableEmotes, setAvailableEmotes] = useState<EmoteData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = usePortugueseLanguage();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(`${process.env.NEXT_PUBLIC_WS_URL}/chat`, {
      auth: {
        streamId,
        userRegion,
        language
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to Portuguese chat');
    });

    newSocket.on('message', (message: ChatMessage) => {
      setMessages(prev => [...prev.slice(-99), message]); // Keep last 100 messages
    });

    newSocket.on('emote_reaction', (data: { emoteCode: string; count: number }) => {
      // Handle emote reactions
    });

    newSocket.on('moderation_action', (data: { messageId: string; action: string }) => {
      setMessages(prev => prev.filter(msg => msg.id !== data.messageId));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [streamId, userRegion, language]);

  useEffect(() => {
    // Load available emotes for user's region
    fetchPortugueseEmotes(userRegion).then(setAvailableEmotes);
  }, [userRegion]);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim() || !canChat) return;

    const messageWithEmotes = parseEmotesInMessage(newMessage, availableEmotes);
    
    socket.emit('send_message', {
      message: newMessage,
      containsEmotes: messageWithEmotes.emotes.map(e => e.code),
      userRegion
    });

    setNewMessage('');
  };

  const handleEmoteClick = (emote: EmoteData) => {
    setNewMessage(prev => prev + ` ${emote.code} `);
    setShowEmotePicker(false);
  };

  const renderMessage = (msg: ChatMessage) => {
    const parts = msg.message.split(/(:[\w_]+:)/g);
    
    return (
      <div key={msg.id} className="flex space-x-2 py-1">
        <div className="flex-shrink-0">
          {msg.user.region === 'portugal' && '🇵🇹'}
          {msg.user.region === 'brazil' && '🇧🇷'}
          {msg.user.region === 'diaspora' && '🌍'}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center space-x-2">
            <span className={`font-medium text-sm ${
              msg.user.isModerator ? 'text-premium-600' : 
              msg.user.isSubscriber ? 'text-secondary-600' : 'text-gray-700'
            }`}>
              {msg.user.displayName}
            </span>
            {msg.user.badges.includes('portuguese_verified') && (
              <span className="text-xs bg-primary-100 text-primary-700 px-1 rounded">
                ✓ {t({ pt: 'PT', en: 'PT' })}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-900 break-words">
            {parts.map((part, index) => {
              if (part.startsWith(':') && part.endsWith(':')) {
                const emote = msg.emotes.find(e => e.code === part);
                if (emote) {
                  return <PortugueseEmote key={index} code={part} size="sm" />;
                }
              }
              return <span key={index}>{part}</span>;
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-96 bg-white border rounded-lg">
      {/* Header */}
      <div className="border-b px-4 py-2 bg-primary-50">
        <h3 className="font-medium text-primary-900">
          {t({ pt: 'Chat da Comunidade', en: 'Community Chat' })}
        </h3>
        <p className="text-xs text-primary-600">
          {messages.length} {t({ pt: 'mensagens', en: 'messages' })}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto px-4 py-2 space-y-1">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {canChat ? (
        <div className="border-t p-3">
          <div className="flex space-x-2">
            <div className="flex-grow relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t({ 
                  pt: 'Digite sua mensagem...', 
                  en: 'Type your message...' 
                })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                maxLength={500}
              />
              {showEmotePicker && (
                <PortugueseEmotePicker
                  emotes={availableEmotes}
                  onEmoteClick={handleEmoteClick}
                  onClose={() => setShowEmotePicker(false)}
                />
              )}
            </div>
            <button
              onClick={() => setShowEmotePicker(!showEmotePicker)}
              className="px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              😊
            </button>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t({ pt: 'Enviar', en: 'Send' })}
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t p-3 bg-gray-50 text-center text-sm text-gray-600">
          {t({ 
            pt: 'Faça login para participar do chat', 
            en: 'Login to participate in chat' 
          })}
        </div>
      )}
    </div>
  );
}

// Additional helper components...
function PortugueseEmotePicker({ emotes, onEmoteClick, onClose }: any) {
  return (
    <div className="absolute bottom-full left-0 right-0 bg-white border rounded-lg shadow-lg p-2 mb-1 max-h-40 overflow-y-auto">
      <div className="grid grid-cols-6 gap-1">
        {emotes.map((emote: EmoteData) => (
          <button
            key={emote.code}
            onClick={() => onEmoteClick(emote)}
            className="p-1 hover:bg-gray-100 rounded"
            title={emote.name_pt}
          >
            <PortugueseEmote code={emote.code} size="sm" showTooltip={false} />
          </button>
        ))}
      </div>
    </div>
  );
}

async function fetchPortugueseEmotes(region: PortugueseRegion): Promise<EmoteData[]> {
  const response = await fetch(`/api/emotes/cultural?region=${region}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data.emotes;
}

function parseEmotesInMessage(message: string, availableEmotes: EmoteData[]) {
  const emotePattern = /:[\w_]+:/g;
  const matches = message.match(emotePattern) || [];
  const validEmotes = matches.filter(match => 
    availableEmotes.some(emote => emote.code === match)
  );
  
  return {
    message,
    emotes: validEmotes.map(code => availableEmotes.find(e => e.code === code)!)
  };
}
```

---

## Testing Strategies

### Portuguese Content Testing

```typescript
// __tests__/streaming/portuguese-content.test.ts
import { analyzeCulturalContent } from '@/lib/cultural-validation';
import { PortugueseEmote } from '@/components/streaming/PortugueseEmote';
import { render, screen } from '@testing-library/react';

describe('Portuguese Cultural Content', () => {
  describe('Cultural Content Analysis', () => {
    it('should correctly identify Portuguese cultural content', async () => {
      const result = await analyzeCulturalContent(
        'Aula de Fado com Maria João',
        'Aprenda os segredos do fado tradicional português com uma fadista profissional',
        ['fado', 'música', 'portugal', 'tradição'],
        'portugal'
      );

      expect(result.portugueseContentPercentage).toBeGreaterThan(80);
      expect(result.culturalAuthenticity).toBeGreaterThan(0.7);
      expect(result.culturalTags).toContain('música_tradicional');
      expect(result.regionalRelevance.portugal).toBeGreaterThan(0.5);
    });

    it('should suggest improvements for low cultural content', async () => {
      const result = await analyzeCulturalContent(
        'Generic Cooking Show',
        'Learn to cook various dishes from around the world',
        ['cooking', 'food', 'recipes'],
        'diaspora'
      );

      expect(result.portugueseContentPercentage).toBeLessThan(30);
      expect(result.recommendedImprovements).toContain('Add more Portuguese language elements');
      expect(result.recommendedImprovements).toContain('Include traditional cultural references');
    });
  });

  describe('Portuguese Emotes', () => {
    it('should render Portuguese emotes correctly', () => {
      render(
        <PortugueseEmote 
          code=":saudade:" 
          size="md" 
          showTooltip={true} 
        />
      );

      const emote = screen.getByAltText(/saudade/i);
      expect(emote).toBeInTheDocument();
      expect(emote).toHaveClass('w-6 h-6');
    });

    it('should show cultural context in tooltip', async () => {
      render(
        <PortugueseEmote 
          code=":pastelnata:" 
          size="lg" 
          showTooltip={true} 
        />
      );

      // Mock emote data fetch
      const mockEmoteData = {
        code: ':pastelnata:',
        name_pt: 'Pastel de Nata',
        name_en: 'Portuguese Custard Tart',
        image_url: '/emotes/pastelnata.png',
        cultural_context: 'Traditional Portuguese pastry'
      };

      // Test tooltip display logic
    });
  });

  describe('Regional Content Preferences', () => {
    it('should detect correct regional preferences', () => {
      const portugalContext = detectCulturalRegion({ region: 'portugal' });
      expect(portugalContext.preferredLanguageVariant).toBe('pt-PT');
      expect(portugalContext.currency).toBe('EUR');
      expect(portugalContext.culturalEvents).toContain('santos_populares');
      expect(portugalContext.preferredEmotes).toContain(':pastelnata:');

      const brazilContext = detectCulturalRegion({ region: 'brazil' });
      expect(brazilContext.preferredLanguageVariant).toBe('pt-BR');
      expect(brazilContext.currency).toBe('BRL');
      expect(brazilContext.culturalEvents).toContain('carnaval');
      expect(brazilContext.preferredEmotes).toContain(':caipirinha:');
    });
  });
});
```

### Streaming Infrastructure Testing

```typescript
// __tests__/streaming/streaming-infrastructure.test.ts
describe('Streaming Infrastructure', () => {
  describe('Stream Creation', () => {
    it('should create stream with correct RTMP configuration', async () => {
      const streamData = {
        title: { pt: 'Test Stream', en: 'Test Stream' },
        category_id: 'portuguese_cultural',
        access_level: 'premium'
      };

      const response = await fetch('/api/streaming/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(streamData)
      });

      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.stream.rtmp_url).toMatch(/^rtmp:\/\//);
      expect(result.stream.playback_urls.hls).toMatch(/\.m3u8$/);
      expect(result.monetization.revenue_share).toBeGreaterThan(0.7);
    });

    it('should enforce Portuguese content requirements', async () => {
      const lowCulturalContentStream = {
        title: { en: 'Generic Stream' },
        category_id: 'general',
        portuguese_content_percentage: 30
      };

      const response = await fetch('/api/streaming/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lowCulturalContentStream)
      });

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.error.code).toBe('INSUFFICIENT_PORTUGUESE_CONTENT');
    });
  });

  describe('Chat Moderation', () => {
    it('should detect Portuguese toxicity correctly', async () => {
      const toxicMessage = 'Esse streamer é uma porcaria!';
      
      const response = await fetch('/api/moderation/analyze-portuguese', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: toxicMessage,
          content_type: 'chat_message',
          user_region: 'brazil'
        })
      });

      const result = await response.json();
      expect(result.moderation_result.toxicity_score).toBeGreaterThan(0.5);
      expect(result.moderation_result.recommended_action).toBe('warn');
    });

    it('should handle cultural context in moderation', async () => {
      const culturalExpression = 'Que saudade de casa!';
      
      const response = await fetch('/api/moderation/analyze-portuguese', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: culturalExpression,
          content_type: 'chat_message',
          user_region: 'diaspora'
        })
      });

      const result = await response.json();
      expect(result.moderation_result.toxicity_score).toBeLessThan(0.3);
      expect(result.moderation_result.cultural_sensitivity_score).toBeGreaterThan(0.8);
    });
  });
});
```

---

## Performance Optimization

### Streaming Performance

```typescript
// lib/streaming-optimization.ts
export class StreamingOptimizer {
  private static instance: StreamingOptimizer;
  private qualitySettings: Map<string, QualityProfile> = new Map();

  static getInstance(): StreamingOptimizer {
    if (!StreamingOptimizer.instance) {
      StreamingOptimizer.instance = new StreamingOptimizer();
    }
    return StreamingOptimizer.instance;
  }

  async optimizeStreamQuality(
    streamId: string, 
    viewerMetrics: ViewerMetrics,
    connectionQuality: ConnectionQuality
  ): Promise<QualityProfile> {
    const profile = this.calculateOptimalProfile(viewerMetrics, connectionQuality);
    
    // Portuguese content optimization
    if (profile.culturalContentBoost) {
      profile.bitrate *= 1.1; // 10% boost for cultural content
      profile.audioQuality = 'high'; // Preserve fado and music quality
    }

    this.qualitySettings.set(streamId, profile);
    return profile;
  }

  private calculateOptimalProfile(
    metrics: ViewerMetrics, 
    connection: ConnectionQuality
  ): QualityProfile {
    // Base profile calculation
    let profile: QualityProfile = {
      resolution: '720p',
      bitrate: 2500,
      framerate: 30,
      audioQuality: 'medium',
      culturalContentBoost: false
    };

    // Optimize for mobile Portuguese users
    if (metrics.mobilePercentage > 70) {
      profile.resolution = '480p';
      profile.bitrate = 1200;
    }

    // Boost quality for Portuguese cultural content
    if (metrics.culturalContentPercentage > 70) {
      profile.culturalContentBoost = true;
      profile.audioQuality = 'high'; // Important for fado and music
    }

    // Adjust for connection quality
    if (connection.averageSpeed < 5000000) { // 5 Mbps
      profile.bitrate = Math.min(profile.bitrate, 1500);
      profile.resolution = '480p';
    }

    return profile;
  }
}

interface ViewerMetrics {
  totalViewers: number;
  mobilePercentage: number;
  culturalContentPercentage: number;
  averageWatchTime: number;
  bounceRate: number;
}

interface ConnectionQuality {
  averageSpeed: number;
  latency: number;
  packetLoss: number;
  stabilityScore: number;
}

interface QualityProfile {
  resolution: string;
  bitrate: number;
  framerate: number;
  audioQuality: 'low' | 'medium' | 'high';
  culturalContentBoost: boolean;
}
```

### Portuguese Content Caching

```typescript
// lib/portuguese-content-cache.ts
export class PortugueseContentCache {
  private emoteCache: Map<string, EmoteData[]> = new Map();
  private culturalEventCache: Map<string, CulturalEvent[]> = new Map();
  private translationCache: Map<string, TranslationPair> = new Map();

  async getCulturalEmotes(region: PortugueseRegion): Promise<EmoteData[]> {
    const cacheKey = `emotes_${region}`;
    
    if (this.emoteCache.has(cacheKey)) {
      return this.emoteCache.get(cacheKey)!;
    }

    const emotes = await this.fetchEmotesFromAPI(region);
    this.emoteCache.set(cacheKey, emotes);
    
    // Cache for 1 hour
    setTimeout(() => {
      this.emoteCache.delete(cacheKey);
    }, 3600000);

    return emotes;
  }

  async getCulturalEvents(
    region: PortugueseRegion, 
    dateRange: DateRange
  ): Promise<CulturalEvent[]> {
    const cacheKey = `events_${region}_${dateRange.start}_${dateRange.end}`;
    
    if (this.culturalEventCache.has(cacheKey)) {
      return this.culturalEventCache.get(cacheKey)!;
    }

    const events = await this.fetchCulturalEventsFromAPI(region, dateRange);
    this.culturalEventCache.set(cacheKey, events);

    return events;
  }

  async getTranslation(text: string, targetLanguage: 'pt' | 'en'): Promise<string> {
    const cacheKey = `${text}_${targetLanguage}`;
    
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey)!.translated;
    }

    const translation = await this.fetchTranslationFromAPI(text, targetLanguage);
    this.translationCache.set(cacheKey, { original: text, translated: translation });

    return translation;
  }

  private async fetchEmotesFromAPI(region: PortugueseRegion): Promise<EmoteData[]> {
    const response = await fetch(`/api/emotes/cultural?region=${region}`);
    const data = await response.json();
    return data.emotes;
  }

  private async fetchCulturalEventsFromAPI(
    region: PortugueseRegion, 
    dateRange: DateRange
  ): Promise<CulturalEvent[]> {
    const response = await fetch(
      `/api/cultural/events?region=${region}&start=${dateRange.start}&end=${dateRange.end}`
    );
    return response.json();
  }

  private async fetchTranslationFromAPI(text: string, targetLanguage: string): Promise<string> {
    // Implement Portuguese-focused translation service
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage, culturalContext: true })
    });
    const data = await response.json();
    return data.translatedText;
  }
}

interface DateRange {
  start: string;
  end: string;
}

interface CulturalEvent {
  id: string;
  name: string;
  date: string;
  region: PortugueseRegion;
  significance: string;
  streamingBoostExpected: number;
}

interface TranslationPair {
  original: string;
  translated: string;
}
```

---

## Deployment

### Production Configuration

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  # Next.js Application
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.lusotown.com
      - NEXT_PUBLIC_WS_URL=wss://chat.lusotown.com
    depends_on:
      - redis
      - postgres

  # SRS Media Server
  srs:
    image: ossrs/srs:4
    ports:
      - "1935:1935"   # RTMP
      - "1985:1985"   # HTTP API
      - "8080:8080"   # HTTP Server
    volumes:
      - ./srs.prod.conf:/usr/local/srs/conf/srs.conf
      - srs_data:/usr/local/srs/objs/nginx/html
    environment:
      - CANDIDATE=streaming.lusotown.com
    restart: unless-stopped

  # Portuguese Chat Service
  chat-service:
    build:
      context: ./services/chat
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - REDIS_URL=redis://redis:6379
      - PORTUGUESE_MODERATION_API_KEY=${PORTUGUESE_MODERATION_API_KEY}
    depends_on:
      - redis
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

  # PostgreSQL
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: lusotown_streaming
      POSTGRES_USER: lusotown
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # Nginx Load Balancer
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
      - srs_data:/var/www/hls:ro
    depends_on:
      - web
      - srs
    restart: unless-stopped

volumes:
  redis_data:
  postgres_data:
  srs_data:
```

### Kubernetes Deployment

```yaml
# k8s/streaming-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: lusotown-streaming
  labels:
    app: lusotown-streaming
spec:
  replicas: 3
  selector:
    matchLabels:
      app: lusotown-streaming
  template:
    metadata:
      labels:
        app: lusotown-streaming
    spec:
      containers:
      - name: web
        image: lusotown/streaming-web:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        - name: POSTGRES_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: postgres-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: lusotown-streaming-service
spec:
  selector:
    app: lusotown-streaming
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy-streaming.yml
name: Deploy Streaming Platform

on:
  push:
    branches: [main]
    paths: ['streaming/**', 'web-app/src/components/streaming/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run Portuguese content tests
      run: npm run test:portuguese
    
    - name: Run streaming tests
      run: npm run test:streaming
    
    - name: Run cultural integration tests
      run: npm run test:cultural

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker images
      run: |
        docker build -t lusotown/streaming-web:${{ github.sha }} .
        docker build -t lusotown/chat-service:${{ github.sha }} ./services/chat
    
    - name: Push to registry
      run: |
        echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
        docker push lusotown/streaming-web:${{ github.sha }}
        docker push lusotown/chat-service:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      uses: azure/k8s-deploy@v1
      with:
        manifests: |
          k8s/streaming-deployment.yml
          k8s/portuguese-chat-service.yml
        images: |
          lusotown/streaming-web:${{ github.sha }}
          lusotown/chat-service:${{ github.sha }}
        kubectl-version: 'latest'
```

---

## Troubleshooting

### Common Issues

#### Streaming Connection Problems

**Issue:** RTMP connection fails
```bash
# Debug SRS server
docker logs srs-server

# Check RTMP endpoint
curl -v rtmp://localhost:1935/live/stream_key

# Verify firewall settings
sudo ufw status
sudo ufw allow 1935/tcp
```

**Issue:** HLS playback not working
```javascript
// Debug HLS.js errors
hls.on(Hls.Events.ERROR, (event, data) => {
  console.error('HLS Error:', data);
  
  if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
    console.log('Network error - checking CDN...');
    // Implement CDN fallback
  }
  
  if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
    console.log('Media error - attempting recovery...');
    hls.recoverMediaError();
  }
});
```

#### Portuguese Content Issues

**Issue:** Emotes not loading
```typescript
// Debug emote loading
const debugEmoteLoad = async (emoteCode: string) => {
  try {
    const response = await fetch(`/api/emotes/portuguese/${emoteCode}`);
    console.log('Emote response:', response.status);
    
    if (!response.ok) {
      console.error('Emote fetch failed:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('Emote data:', data);
    return data;
  } catch (error) {
    console.error('Emote loading error:', error);
  }
};
```

**Issue:** Cultural content validation failing
```typescript
// Debug cultural analysis
const debugCulturalAnalysis = async (content: string) => {
  const analysis = await analyzeCulturalContent(
    content, 
    '', 
    [], 
    'portugal'
  );
  
  console.log('Cultural analysis result:', analysis);
  
  if (analysis.portugueseContentPercentage < 60) {
    console.warn('Low Portuguese content detected');
    console.log('Suggestions:', analysis.recommendedImprovements);
  }
  
  return analysis;
};
```

#### Chat and Real-time Issues

**Issue:** Socket.io connection drops
```typescript
// Implement reconnection logic
socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
  
  if (reason === 'io server disconnect') {
    // Server initiated disconnect - manual reconnection needed
    socket.connect();
  }
  // Otherwise, reconnection is automatic
});

socket.on('connect', () => {
  console.log('Socket reconnected');
  // Rejoin chat room
  socket.emit('join_stream_chat', { streamId, userRegion });
});
```

### Monitoring and Logging

```typescript
// lib/streaming-monitoring.ts
export class StreamingMonitor {
  private metrics: StreamingMetrics = {
    activeStreams: 0,
    totalViewers: 0,
    portugueseAudience: 0,
    chatMessages: 0,
    culturalEmotesUsed: 0
  };

  startMonitoring() {
    setInterval(() => {
      this.collectMetrics();
      this.reportHealthStatus();
      this.checkPortugueseCommunityHealth();
    }, 30000); // Every 30 seconds
  }

  private async collectMetrics() {
    try {
      // Collect streaming metrics
      const streams = await fetch('/api/admin/streams/active').then(r => r.json());
      this.metrics.activeStreams = streams.length;
      
      // Collect viewer metrics
      const viewers = await fetch('/api/admin/viewers/current').then(r => r.json());
      this.metrics.totalViewers = viewers.total;
      this.metrics.portugueseAudience = viewers.portuguese;
      
      // Log metrics
      console.log('Streaming metrics:', this.metrics);
      
      // Send to monitoring service
      await this.sendToMonitoring(this.metrics);
    } catch (error) {
      console.error('Failed to collect metrics:', error);
    }
  }

  private checkPortugueseCommunityHealth() {
    const portuguesePercentage = this.metrics.totalViewers > 0 
      ? this.metrics.portugueseAudience / this.metrics.totalViewers 
      : 0;
      
    if (portuguesePercentage < 0.7) {
      console.warn('Portuguese-speaking community engagement below threshold:', portuguesePercentage);
      // Trigger cultural content promotion
    }
  }

  private async sendToMonitoring(metrics: StreamingMetrics) {
    // Send to your monitoring service (e.g., DataDog, New Relic)
    await fetch('/api/monitoring/streaming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        metrics,
        service: 'lusotown-streaming'
      })
    });
  }
}
```

---

## Summary

This developer guide provides comprehensive coverage of the LusoTown Streaming Platform implementation, focusing on:

1. **Portuguese Cultural Integration** - Authentic cultural features and regional awareness
2. **Technical Architecture** - Scalable streaming infrastructure with real-time capabilities
3. **Community Focus** - Portuguese emotes, cultural content validation, and regional moderation
4. **Developer Experience** - Clear setup instructions, testing strategies, and debugging tools
5. **Production Readiness** - Deployment configurations and monitoring solutions

The platform prioritizes the Portuguese-speaking community while maintaining high technical standards and performance. All features are designed with cultural authenticity and community building in mind.

For additional support or contributions, contact the development team at developers@lusotown.com.

---

*© 2025 LusoTown. All rights reserved. | Todos os direitos reservados.*  
*Developer Guide v1.0 - Updated August 18, 2025*