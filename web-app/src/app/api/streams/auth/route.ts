import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { requireEnv } from '@/config/env'

// Mock streaming authentication endpoint
// In production, this would integrate with your actual streaming server

export async function POST(request: NextRequest) {
  try {
    const { userId, streamId, role = 'viewer' } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let jwtSecret: string
    try {
      jwtSecret = requireEnv('STREAMING_JWT_SECRET', 'JWT secret for streaming authentication')
    } catch (error) {
      console.error('Streaming JWT configuration error:', error)
      return NextResponse.json(
        { error: 'Server configuration error: Missing STREAMING_JWT_SECRET' }, 
        { status: 500 }
      )
    }

    // Generate streaming token
    const token = jwt.sign(
      {
        userId,
        streamId,
        role,
        region: 'diaspora', // Would come from user profile
        permissions: {
          canChat: true,
          canStream: role === 'host',
          canModerate: ['host', 'moderator'].includes(role),
          canCreatePolls: ['host', 'moderator', 'subscriber'].includes(role)
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
      },
      jwtSecret
    )

    // Mock streaming URLs (would be real in production)
    const streamUrls = {
      rtmp: `rtmp://localhost:1935/live/${streamId}`,
      // Align with SRS/dev scripts: HLS served at /live/<streamId>.m3u8
      hls: `http://localhost:8080/live/${streamId}.m3u8`,
      webrtc: `ws://localhost:8080/webrtc/${streamId}`,
      chat: `ws://localhost:3001/chat/${streamId}`
    }

    return NextResponse.json({
      token,
      streamUrls,
      permissions: {
        canChat: true,
        canStream: role === 'host',
        canModerate: ['host', 'moderator'].includes(role),
        canCreatePolls: ['host', 'moderator', 'subscriber'].includes(role)
      }
    })

  } catch (error) {
    console.error('Stream auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 })
  }

  try {
    const jwtSecret = requireEnv('STREAMING_JWT_SECRET', 'JWT secret for streaming authentication')
    const decoded = jwt.verify(token, jwtSecret)
    return NextResponse.json({ valid: true, payload: decoded })
  } catch (configError) {
    if (configError instanceof Error && configError.message.includes('Missing required environment variable')) {
      console.error('Streaming JWT configuration error:', configError)
      return NextResponse.json(
        { error: 'Server configuration error: Missing STREAMING_JWT_SECRET' }, 
        { status: 500 }
      )
    }
    return NextResponse.json({ valid: false, error: 'Invalid token' }, { status: 401 })
  }
}