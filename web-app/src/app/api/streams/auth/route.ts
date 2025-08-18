import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Mock streaming authentication endpoint
// In production, this would integrate with your actual streaming server

const JWT_SECRET = process.env.JWT_SECRET || 'lusotown-streaming-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { userId, streamId, role = 'viewer' } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
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
      JWT_SECRET
    )

    // Mock streaming URLs (would be real in production)
    const streamUrls = {
      rtmp: `rtmp://localhost:1935/live/${streamId}`,
      hls: `http://localhost:8080/hls/${streamId}/index.m3u8`,
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
    const decoded = jwt.verify(token, JWT_SECRET)
    return NextResponse.json({ valid: true, payload: decoded })
  } catch (error) {
    return NextResponse.json({ valid: false, error: 'Invalid token' }, { status: 401 })
  }
}