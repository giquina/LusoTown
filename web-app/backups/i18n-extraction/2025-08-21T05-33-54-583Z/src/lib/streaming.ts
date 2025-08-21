import { createClient } from '@/lib/supabase'
import { sign, verify } from 'jsonwebtoken'

import { STREAMING_URLS } from '@/config/streaming';
import { CDN_URLS } from '@/config/cdn';
const JWT_SECRET = process.env.STREAMING_JWT_SECRET || 'your-streaming-jwt-secret-key'
const STREAM_SERVER_URL = process.env.STREAM_SERVER_URL || 'stream.lusotown.com'

export interface StreamAuthToken {
  token: string
  tokenType: 'rtmp' | 'playback' | 'webhook'
  streamId: string
  streamKey: string
  userId: string
  expiresAt: string
}

export interface StreamConfiguration {
  rtmpUrl: string
  playbackUrl: string
  hlsUrl: string
  dashUrl?: string
  streamKey: string
  maxBitrate: number
  maxResolution: string
  allowTranscoding: boolean
}

export interface OBSConfiguration {
  server: string
  streamKey: string
  maxBitrate: number
  keyframeInterval: number
  profile: string
  tune: string
  encoder: string
}

/**
 * Generate a unique stream key
 */
export function generateStreamKey(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `sk_${timestamp}_${random}`
}

/**
 * Generate JWT token for stream authentication
 */
export function generateStreamAuthToken(
  userId: string,
  streamId: string,
  streamKey: string,
  tokenType: 'rtmp' | 'playback' | 'webhook',
  expiresInHours: number = 24
): string {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + expiresInHours * 60 * 60 * 1000)

  const payload = {
    userId,
    streamId,
    streamKey,
    tokenType,
    iat: Math.floor(now.getTime() / 1000),
    exp: Math.floor(expiresAt.getTime() / 1000)
  }

  // Add specific permissions based on token type
  if (tokenType === 'rtmp') {
    Object.assign(payload, {
      rtmp: {
        allowPublish: true,
        maxBitrate: 6000,
        maxDuration: 4 * 60 * 60 // 4 hours
      }
    })
  } else if (tokenType === 'playback') {
    Object.assign(payload, {
      playback: {
        allowView: true,
        qualityLevels: ['360p', '720p', '1080p']
      }
    })
  }

  return sign(payload, JWT_SECRET)
}

/**
 * Verify stream authentication token
 */
export function verifyStreamAuthToken(token: string): any {
  try {
    const decoded = verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

/**
 * Generate RTMP URLs for streaming
 */
export function generateRTMPUrls(streamKey: string): {
  rtmpUrl: string
  rtmpEndpoint: string
  rtmpKey: string
} {
  return {
    rtmpUrl: STREAMING_URLS.rtmpBase,
    rtmpEndpoint: STREAMING_URLS.rtmpBase,
    rtmpKey: streamKey
  }
}

/**
 * Generate playback URLs for viewers
 */
export function generatePlaybackUrls(streamKey: string): {
  hlsUrl: string
  dashUrl: string
  rtmpUrl: string
  embedUrl: string
} {
  return {
    hlsUrl: STREAMING_URLS.hlsPlayback,
    dashUrl: CDN_URLS.external,
    rtmpUrl: STREAMING_URLS.rtmpBase,
    embedUrl: CDN_URLS.external
  }
}

/**
 * Generate OBS Studio configuration
 */
export function generateOBSConfiguration(
  streamKey: string,
  userSettings?: {
    maxBitrate?: number
    maxResolution?: string
    enableTranscoding?: boolean
  }
): OBSConfiguration {
  const maxBitrate = userSettings?.maxBitrate || 3000
  
  return {
    server: STREAMING_URLS.rtmpBase,
    streamKey: streamKey,
    maxBitrate: maxBitrate,
    keyframeInterval: 2,
    profile: 'main',
    tune: 'zerolatency',
    encoder: 'x264'
  }
}

/**
 * Validate stream creation permissions
 */
export async function validateStreamPermissions(
  userId: string,
  supabase: any
): Promise<{
  canStream: boolean
  dailyLimit: number
  streamsToday: number
  error?: string
}> {
  try {
    const { data: settings, error } = await supabase
      .from('user_streaming_settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // Not found error
      throw error
    }

    // If no settings exist, create default ones
    if (!settings) {
      const { data: newSettings, error: createError } = await supabase
        .from('user_streaming_settings')
        .insert({
          user_id: userId,
          can_stream: false, // Default to false, needs to be enabled
          daily_stream_limit: 5
        })
        .select()
        .single()

      if (createError) throw createError

      return {
        canStream: false,
        dailyLimit: 5,
        streamsToday: 0,
        error: 'Streaming permissions not enabled. Please contact support.'
      }
    }

    // Check if user can stream
    if (!settings.can_stream) {
      return {
        canStream: false,
        dailyLimit: settings.daily_stream_limit,
        streamsToday: settings.streams_created_today,
        error: 'Streaming permissions not enabled'
      }
    }

    // Reset daily count if it's a new day
    const today = new Date().toDateString()
    const lastStreamDate = settings.last_stream_date ? new Date(settings.last_stream_date).toDateString() : null
    
    if (lastStreamDate !== today) {
      await supabase
        .from('user_streaming_settings')
        .update({
          streams_created_today: 0,
          last_stream_date: new Date().toISOString().split('T')[0]
        })
        .eq('user_id', userId)

      settings.streams_created_today = 0
    }

    // Check daily limit
    if (settings.streams_created_today >= settings.daily_stream_limit) {
      return {
        canStream: false,
        dailyLimit: settings.daily_stream_limit,
        streamsToday: settings.streams_created_today,
        error: 'Daily streaming limit exceeded'
      }
    }

    return {
      canStream: true,
      dailyLimit: settings.daily_stream_limit,
      streamsToday: settings.streams_created_today
    }
  } catch (error) {
    console.error('Error validating stream permissions:', error)
    return {
      canStream: false,
      dailyLimit: 0,
      streamsToday: 0,
      error: 'Failed to validate permissions'
    }
  }
}

/**
 * Portuguese streaming categories helper
 */
export const PORTUGUESE_STREAM_CATEGORIES = {
  'musica-portuguesa': {
    namePt: 'Música Portuguesa',
    nameEn: 'Portuguese Music',
    culturalContext: 'universal',
    portugueseFocused: true
  },
  'culinaria': {
    namePt: 'Culinária',
    nameEn: 'Cooking',
    culturalContext: 'universal',
    portugueseFocused: true
  },
  'futebol': {
    namePt: 'Futebol',
    nameEn: 'Football',
    culturalContext: 'universal',
    portugueseFocused: true
  },
  'cultura-tradicoes': {
    namePt: 'Cultura & Tradições',
    nameEn: 'Culture & Traditions',
    culturalContext: 'universal',
    portugueseFocused: true
  },
  'lingua-portuguesa': {
    namePt: 'Língua Portuguesa',
    nameEn: 'Portuguese Language',
    culturalContext: 'universal',
    portugueseFocused: true
  },
  'negocios': {
    namePt: 'Negócios',
    nameEn: 'Business',
    culturalContext: 'universal',
    portugueseFocused: false
  }
} as const

/**
 * Portuguese cultural regions
 */
export const CULTURAL_REGIONS = {
  brasil: 'Brasil',
  portugal: 'Portugal',
  africa: 'África Lusófona',
  diaspora: 'Diáspora Portuguesa',
  universal: 'Universal'
} as const

/**
 * Stream quality presets
 */
export const STREAM_QUALITY_PRESETS = {
  mobile: {
    maxBitrate: 1000,
    maxResolution: '720p',
    fps: 30
  },
  standard: {
    maxBitrate: 3000,
    maxResolution: '1080p',
    fps: 30
  },
  high: {
    maxBitrate: 6000,
    maxResolution: '1080p',
    fps: 60
  },
  premium: {
    maxBitrate: 10000,
    maxResolution: '1440p',
    fps: 60
  }
} as const

/**
 * Rate limiting configuration
 */
export const RATE_LIMITS = {
  free: {
    dailyStreams: 2,
    maxDuration: 2 * 60 * 60, // 2 hours
    maxBitrate: 2000,
    maxResolution: '720p'
  },
  core: {
    dailyStreams: 5,
    maxDuration: 4 * 60 * 60, // 4 hours
    maxBitrate: 4000,
    maxResolution: '1080p'
  },
  premium: {
    dailyStreams: 10,
    maxDuration: 8 * 60 * 60, // 8 hours
    maxBitrate: 8000,
    maxResolution: '1440p'
  }
} as const