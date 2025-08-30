import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Portuguese Community LiveKit Token Generation API
 * Generates secure access tokens for Portuguese community streaming
 */

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || 'devkey'
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || 'secret'

// Portuguese cultural streaming categories
const CULTURAL_CATEGORIES = {
  musica: { name: { pt: 'Música', en: 'Music' }, premium: false },
  culinaria: { name: { pt: 'Culinária', en: 'Cooking' }, premium: false },
  cultura: { name: { pt: 'Cultura & História', en: 'Culture & History' }, premium: false },
  danca: { name: { pt: 'Dança', en: 'Dance' }, premium: false },
  artesanato: { name: { pt: 'Artesanato', en: 'Crafts' }, premium: false },
  eventos: { name: { pt: 'Eventos Comunitários', en: 'Community Events' }, premium: false },
  conversas: { name: { pt: 'Conversas & Talk Shows', en: 'Talks & Talk Shows' }, premium: false }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required for Portuguese community streaming' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      roomName, 
      participantName, 
      category = 'general',
      role = 'viewer', // viewer, streamer, moderator
      metadata = {}
    } = body

    // Validation
    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: 'Room name and participant name are required' },
        { status: 400 }
      )
    }

    // Get user profile for Portuguese community context
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Generate participant identity
    const identity = `${user.id}_${participantName}_${Date.now()}`
    
    // Create LiveKit access token
    const accessToken = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity,
      ttl: '10h' // Token valid for 10 hours
    })

    // Add Portuguese community metadata
    const tokenMetadata = {
      ...metadata,
      userId: user.id,
      email: user.email,
      participantName,
      category,
      cultural: CULTURAL_CATEGORIES[category as keyof typeof CULTURAL_CATEGORIES] || null,
      community: 'portuguese',
      profile: {
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        avatar: profile?.avatar_url,
        heritage: profile?.portuguese_heritage
      },
      joinedAt: Date.now(),
      role
    }

    accessToken.metadata = JSON.stringify(tokenMetadata)

    // Set permissions based on role
    const permissions = {
      room: roomName,
      roomJoin: true,
      canSubscribe: true,
      canPublishData: true, // For chat and reactions
    }

    // Role-specific permissions
    switch (role) {
      case 'streamer':
        permissions.canPublish = true
        permissions.roomRecord = true
        permissions.roomAdmin = true
        break
      case 'moderator':
        permissions.canPublish = false
        permissions.roomAdmin = true
        break
      case 'viewer':
      default:
        permissions.canPublish = false
        permissions.roomAdmin = false
        break
    }

    accessToken.addGrant(permissions)
    const token = accessToken.toJwt()

    // Log streaming session for Portuguese community analytics
    await supabase
      .from('streaming_sessions')
      .insert({
        user_id: user.id,
        room_name: roomName,
        participant_name: participantName,
        category,
        role,
        token_id: identity,
        created_at: new Date().toISOString()
      })
      .select()

    console.log(`🎫 Generated LiveKit token for Portuguese community member: ${participantName} (${role}) in room: ${roomName}`)

    return NextResponse.json({
      success: true,
      token,
      wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://lusotown-streaming.livekit.cloud',
      participant: {
        identity,
        name: participantName,
        role,
        metadata: tokenMetadata
      },
      room: {
        name: roomName,
        category,
        cultural: CULTURAL_CATEGORIES[category as keyof typeof CULTURAL_CATEGORIES]
      }
    })

  } catch (error) {
    console.error('❌ LiveKit token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate streaming token' },
      { status: 500 }
    )
  }
}