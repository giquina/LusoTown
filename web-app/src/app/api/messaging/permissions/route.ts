import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const targetUserId = searchParams.get('targetUserId')

    if (!targetUserId) {
      return NextResponse.json({ error: 'Target user ID is required' }, { status: 400 })
    }

    // Check messaging permissions using the database function
    const { data: permissionData, error: permissionError } = await supabase
      .rpc('can_users_message', {
        user_a: user.id,
        user_b: targetUserId
      })

    if (permissionError) {
      console.error('Permission check error:', permissionError)
      return NextResponse.json({ error: 'Failed to check permissions' }, { status: 500 })
    }

    return NextResponse.json(permissionData)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { targetUserId, permissionType, sourceId, expiresAt } = body

    if (!targetUserId || !permissionType) {
      return NextResponse.json({ 
        error: 'Target user ID and permission type are required' 
      }, { status: 400 })
    }

    // Create messaging permission (admin override)
    const { data, error } = await supabase
      .from('messaging_permissions')
      .insert({
        user_id: user.id,
        target_user_id: targetUserId,
        permission_type: permissionType,
        permission_source: 'admin_override',
        source_id: sourceId,
        expires_at: expiresAt
      })
      .select()
      .single()

    if (error) {
      console.error('Permission creation error:', error)
      return NextResponse.json({ error: 'Failed to create permission' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}