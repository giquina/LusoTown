import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Use the existing supabase client
    
    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session retrieval error:', error)
      return NextResponse.json(
        { error: 'Failed to retrieve session' },
        { status: 500 }
      )
    }

    // If no session, return null user
    if (!session) {
      return NextResponse.json({
        user: null,
        session: null,
        authenticated: false
      })
    }

    // Get additional user profile info if available
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        user_metadata: session.user.user_metadata,
        profile: profile || null
      },
      session: {
        access_token: session.access_token,
        expires_at: session.expires_at,
        expires_in: session.expires_in
      },
      authenticated: true
    })
  } catch (error) {
    console.error('Auth session API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Use the existing supabase client
    
    // Sign out user
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      return NextResponse.json(
        { error: 'Failed to sign out' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Successfully signed out' })
  } catch (error) {
    console.error('Auth session delete API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}