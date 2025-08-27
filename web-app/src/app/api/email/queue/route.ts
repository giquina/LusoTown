import { NextRequest, NextResponse } from 'next/server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import logger from '@/utils/logger'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      userId, 
      emailType, 
      config = {} 
    } = body

    // Validate userId matches authenticated user (or is admin)
    if (userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Calculate send time
    let sendAt = new Date()
    if (config.delayDays) {
      sendAt.setDate(sendAt.getDate() + config.delayDays)
    }
    if (config.delayHours) {
      sendAt.setHours(sendAt.getHours() + config.delayHours)
    }

    // Check if email of this type is already queued for user
    const { data: existingEmail } = await supabase
      .from('email_queue')
      .select('id')
      .eq('user_id', userId)
      .eq('email_type', emailType)
      .eq('status', 'pending')
      .single()

    if (existingEmail) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email of this type already queued' 
      })
    }

    // Queue the email
    const { data, error } = await supabase
      .from('email_queue')
      .insert({
        user_id: userId,
        email_type: emailType,
        send_at: sendAt.toISOString(),
        config: config,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      logger.error('Error queuing email', error, { area: 'messaging', action: 'queue_email' })
      return NextResponse.json({ error: 'Failed to queue email' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      emailId: data.id,
      sendAt: sendAt.toISOString()
    })
    
  } catch (error) {
    logger.error('Email queue error', error, { area: 'messaging', action: 'queue_email' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    const status = searchParams.get('status') || 'pending'

    let query = supabase
      .from('email_queue')
      .select('*')
      .eq('status', status)
      .order('send_at', { ascending: true })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data: queuedEmails, error } = await query

    if (error) {
      logger.error('Error fetching email queue', error, { area: 'messaging', action: 'fetch_queue' })
      return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      emails: queuedEmails 
    })
    
  } catch (error) {
    logger.error('Email queue fetch error', error, { area: 'messaging', action: 'fetch_queue' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { emailId, userId } = body

    // Verify user owns the email or is admin
    const { data: email, error: fetchError } = await supabase
      .from('email_queue')
      .select('user_id')
      .eq('id', emailId)
      .single()

    if (fetchError || !email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 })
    }

    if (email.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Cancel the email
    const { error } = await supabase
      .from('email_queue')
      .update({ 
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      })
      .eq('id', emailId)

    if (error) {
      logger.error('Error cancelling email', error, { area: 'messaging', action: 'cancel_email' })
      return NextResponse.json({ error: 'Failed to cancel email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
    
  } catch (error) {
    logger.error('Email cancel error', error, { area: 'messaging', action: 'cancel_email' })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}