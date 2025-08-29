import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import logger from '@/utils/logger'
import { getApiErrorMessage, getApiSuccessMessage, getApiLogMessage } from '@/config/api-messages'

export async function GET(request: NextRequest) {
  try {
    // Use the existing supabase client
    
    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      logger.error(getApiLogMessage('SESSION_RETRIEVAL_ERROR'), error, { 
        area: 'auth', 
        action: 'session_retrieval' 
      })
      return NextResponse.json(
        { error: getApiErrorMessage('INTERNAL_SERVER_ERROR') },
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
    logger.error(getApiLogMessage('AUTH_SESSION_API_ERROR'), error, { 
      area: 'auth', 
      action: 'session_api' 
    })
    return NextResponse.json(
      { error: getApiErrorMessage('INTERNAL_SERVER_ERROR') },
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
      logger.error(getApiLogMessage('SIGN_OUT_ERROR'), error, { 
        area: 'auth', 
        action: 'sign_out' 
      })
      return NextResponse.json(
        { error: getApiErrorMessage('INTERNAL_SERVER_ERROR') },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: getApiSuccessMessage('USER_SIGNED_OUT') })
  } catch (error) {
    logger.error(getApiLogMessage('AUTH_SESSION_DELETE_ERROR'), error, { 
      area: 'auth', 
      action: 'session_delete' 
    })
    return NextResponse.json(
      { error: getApiErrorMessage('INTERNAL_SERVER_ERROR') },
      { status: 500 }
    )
  }
}