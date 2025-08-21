/**
 * Streaming URLs Configuration
 * Centralized streaming server URLs and endpoints
 */

export const STREAMING_URLS = {
  rtmpBase: process.env.NEXT_PUBLIC_RTMP_SERVER_URL || 'rtmp://localhost:1935',
  hlsPlayback: process.env.NEXT_PUBLIC_HLS_SERVER_URL || 'http://localhost:8080',
  serverUrl: process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080',
  websocket: process.env.NEXT_PUBLIC_STREAMING_WS_URL || 'ws://localhost:8080',
  base: process.env.NEXT_PUBLIC_STREAMING_BASE_URL || 'http://localhost:8080'
} as const;

export const RTMP_CONFIG = {
  server: STREAMING_URLS.rtmpBase + '/live',
  playbackBase: STREAMING_URLS.hlsPlayback + '/live'
} as const;