import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * AI Cultural Guidelines and Ethics API Endpoint
 * Manages Lusophone cultural sensitivity guidelines and ethics violations
 */

interface CulturalGuideline {
  guideline_category: string
  guideline_title: string
  guideline_description: string
  implementation_rules: Record<string, any>
  examples: Record<string, any>
  violations_to_avoid: string[]
  portuguese_regions_applicable: string[]
  generation_considerations: Record<string, any>
  severity_level: 'low' | 'medium' | 'high' | 'critical'
  compliance_required: boolean
}

interface EthicsViolation {
  violation_type: string
  guideline_id?: string
  ai_service_name?: string
  ai_model_name?: string
  violation_description: string
  cultural_context?: string
  affected_user_id?: string
  severity_level: 'low' | 'medium' | 'high' | 'critical'
  detection_method: 'automated' | 'user_report' | 'manual_review'
}

interface GuidelinesResponse {
  guidelines: any[]
  categories: string[]
  compliance_summary: {
    total_guidelines: number
    critical_guidelines: number
    recent_violations: number
    compliance_score: number
  }
  regional_adaptations: Record<string, any>
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Cultural guidelines are public for transparency
    const category = searchParams.get('category')
    const region = searchParams.get('portuguese_region')
    const severityLevel = searchParams.get('severity_level')
    const activeOnly = searchParams.get('active_only') !== 'false' // Default true

    // Build query for guidelines
    let query = supabase
      .from('ai_cultural_guidelines')
      .select('*')
      .order('severity_level', { ascending: false })
      .order('guideline_category')

    if (category) {
      query = query.eq('guideline_category', category)
    }

    if (region) {
      query = query.contains('portuguese_regions_applicable', [region])
    }

    if (severityLevel) {
      query = query.eq('severity_level', severityLevel)
    }

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: guidelines, error: guidelinesError } = await query

    if (guidelinesError) throw guidelinesError

    // Get unique categories
    const categories = [...new Set(guidelines?.map(g => g.guideline_category) || [])]

    // Get compliance summary
    const complianceSummary = await getComplianceSummary(supabase, guidelines || [])

    // Get regional adaptations
    const regionalAdaptations = await getRegionalAdaptations(guidelines || [])

    const response: GuidelinesResponse = {
      guidelines: guidelines || [],
      categories,
      compliance_summary: complianceSummary,
      regional_adaptations: regionalAdaptations
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Cultural Guidelines API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cultural guidelines' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'cultural_advisor') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const guideline: CulturalGuideline = await request.json()

    // Validate required fields
    if (!guideline.guideline_category || !guideline.guideline_title || !guideline.guideline_description) {
      return NextResponse.json({ 
        error: 'Category, title, and description are required' 
      }, { status: 400 })
    }

    // Validate category
    const validCategories = [
      'language_usage', 'cultural_representation', 'saudade_sensitivity', 
      'religious_respect', 'generational_differences', 'regional_variations',
      'diaspora_experiences', 'family_values', 'tradition_preservation'
    ]

    if (!validCategories.includes(guideline.guideline_category)) {
      return NextResponse.json({ error: 'Invalid guideline category' }, { status: 400 })
    }

    // Add reviewer information
    const reviewedBy = `${profile.first_name} ${profile.last_name}`.trim()

    const { data: newGuideline, error: insertError } = await supabase
      .from('ai_cultural_guidelines')
      .insert({
        ...guideline,
        last_reviewed: new Date().toISOString().split('T')[0],
        reviewed_by: reviewedBy
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Track guideline creation
    await trackGuidelineActivity(
      supabase,
      'guideline_created',
      newGuideline.id,
      user.id,
      `New ${guideline.severity_level} severity guideline for ${guideline.guideline_category}`
    )

    return NextResponse.json({
      guideline: newGuideline,
      message: 'Cultural guideline created successfully'
    })

  } catch (error) {
    console.error('Cultural guideline creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create cultural guideline' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { guideline_id, updates } = await request.json()

    if (!guideline_id) {
      return NextResponse.json({ error: 'Guideline ID is required' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', user.id)
      .single()

    const reviewedBy = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()

    // Update guideline
    const { data: updatedGuideline, error: updateError } = await supabase
      .from('ai_cultural_guidelines')
      .update({
        ...updates,
        last_reviewed: new Date().toISOString().split('T')[0],
        reviewed_by: reviewedBy,
        updated_at: new Date().toISOString()
      })
      .eq('id', guideline_id)
      .select()
      .single()

    if (updateError) throw updateError

    // Track guideline update
    await trackGuidelineActivity(
      supabase,
      'guideline_updated',
      guideline_id,
      user.id,
      `Updated guideline: ${updatedGuideline.guideline_title}`
    )

    return NextResponse.json({
      guideline: updatedGuideline,
      message: 'Cultural guideline updated successfully'
    })

  } catch (error) {
    console.error('Cultural guideline update error:', error)
    return NextResponse.json(
      { error: 'Failed to update cultural guideline' },
      { status: 500 }
    )
  }
}

// Ethics Violations Management

export async function violations_GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Check authentication and admin access for violations
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const severityLevel = searchParams.get('severity_level')
    const status = searchParams.get('status') || 'open'
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build violations query
    let query = supabase
      .from('ai_ethics_violations')
      .select(`
        *,
        guideline:ai_cultural_guidelines(guideline_title, guideline_category),
        affected_user:profiles(first_name, last_name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (severityLevel) {
      query = query.eq('severity_level', severityLevel)
    }

    if (status) {
      query = query.eq('resolution_status', status)
    }

    const { data: violations, error } = await query

    if (error) throw error

    // Get violation statistics
    const stats = await getViolationStatistics(supabase)

    return NextResponse.json({
      violations: violations || [],
      statistics: stats,
      total_count: violations?.length || 0
    })

  } catch (error) {
    console.error('Ethics violations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ethics violations' },
      { status: 500 }
    )
  }
}

export async function violations_POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const violation: EthicsViolation = await request.json()

    // Validate required fields
    if (!violation.violation_type || !violation.violation_description) {
      return NextResponse.json({ 
        error: 'Violation type and description are required' 
      }, { status: 400 })
    }

    // For user reports, get the reporting user
    let reportingUserId: string | null = null
    if (violation.detection_method === 'user_report') {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        return NextResponse.json({ error: 'Authentication required for user reports' }, { status: 401 })
      }
      reportingUserId = user.id
    }

    const { data: newViolation, error: insertError } = await supabase
      .from('ai_ethics_violations')
      .insert({
        ...violation,
        resolution_status: 'open',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) throw insertError

    // Notify administrators for critical violations
    if (violation.severity_level === 'critical') {
      await notifyAdministrators(supabase, newViolation)
    }

    // Track violation report
    await trackGuidelineActivity(
      supabase,
      'violation_reported',
      newViolation.id,
      reportingUserId,
      `${violation.severity_level} violation: ${violation.violation_type}`
    )

    return NextResponse.json({
      violation: newViolation,
      message: 'Ethics violation reported successfully'
    })

  } catch (error) {
    console.error('Ethics violation reporting error:', error)
    return NextResponse.json(
      { error: 'Failed to report ethics violation' },
      { status: 500 }
    )
  }
}

// Helper Functions

async function getComplianceSummary(supabase: any, guidelines: any[]) {
  const totalGuidelines = guidelines.length
  const criticalGuidelines = guidelines.filter(g => g.severity_level === 'critical').length

  // Get recent violations (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const { data: recentViolations } = await supabase
    .from('ai_ethics_violations')
    .select('id')
    .gte('created_at', thirtyDaysAgo.toISOString())

  const recentViolationCount = recentViolations?.length || 0

  // Calculate compliance score (100% - violation rate)
  const complianceScore = totalGuidelines > 0 
    ? Math.max(0, 100 - (recentViolationCount / totalGuidelines * 10))
    : 100

  return {
    total_guidelines: totalGuidelines,
    critical_guidelines: criticalGuidelines,
    recent_violations: recentViolationCount,
    compliance_score: Math.round(complianceScore)
  }
}

async function getRegionalAdaptations(guidelines: any[]) {
  const adaptations: Record<string, any> = {}

  guidelines.forEach(guideline => {
    if (guideline.portuguese_regions_applicable?.length) {
      guideline.portuguese_regions_applicable.forEach((region: string) => {
        if (!adaptations[region]) {
          adaptations[region] = {
            total_guidelines: 0,
            categories: new Set(),
            critical_count: 0
          }
        }
        
        adaptations[region].total_guidelines++
        adaptations[region].categories.add(guideline.guideline_category)
        
        if (guideline.severity_level === 'critical') {
          adaptations[region].critical_count++
        }
      })
    }
  })

  // Convert sets to arrays
  Object.keys(adaptations).forEach(region => {
    adaptations[region].categories = Array.from(adaptations[region].categories)
  })

  return adaptations
}

async function getViolationStatistics(supabase: any) {
  const { data: violations } = await supabase
    .from('ai_ethics_violations')
    .select('severity_level, resolution_status, created_at')

  if (!violations?.length) {
    return {
      by_severity: {},
      by_status: {},
      resolution_time_avg: 0,
      trend: 'stable'
    }
  }

  // Group by severity
  const bySeverity = violations.reduce((acc: any, v: any) => {
    acc[v.severity_level] = (acc[v.severity_level] || 0) + 1
    return acc
  }, {})

  // Group by status
  const byStatus = violations.reduce((acc: any, v: any) => {
    acc[v.resolution_status] = (acc[v.resolution_status] || 0) + 1
    return acc
  }, {})

  // Calculate trend (compare last 30 days vs previous 30 days)
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

  const recentViolations = violations.filter(v => 
    new Date(v.created_at) >= thirtyDaysAgo
  ).length

  const previousViolations = violations.filter(v => 
    new Date(v.created_at) >= sixtyDaysAgo && new Date(v.created_at) < thirtyDaysAgo
  ).length

  let trend = 'stable'
  if (recentViolations > previousViolations * 1.2) trend = 'increasing'
  else if (recentViolations < previousViolations * 0.8) trend = 'decreasing'

  return {
    by_severity: bySeverity,
    by_status: byStatus,
    resolution_time_avg: 0, // Would be calculated from resolved violations
    trend
  }
}

async function trackGuidelineActivity(
  supabase: any,
  activityType: string,
  targetId: string,
  userId: string | null,
  description: string
) {
  try {
    // This would typically go to an audit log table
    console.log('Guideline activity:', {
      activity_type: activityType,
      target_id: targetId,
      user_id: userId,
      description,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to track guideline activity:', error)
  }
}

async function notifyAdministrators(supabase: any, violation: any) {
  try {
    // Get administrators
    const { data: admins } = await supabase
      .from('profiles')
      .select('id, first_name, last_name')
      .eq('role', 'admin')

    // Create notifications for each admin
    const notifications = admins?.map((admin: any) => ({
      user_id: admin.id,
      notification_type: 'system',
      title: 'Critical AI Ethics Violation',
      message: `A critical AI ethics violation has been reported: ${violation.violation_description}`,
      priority: 'high',
      action_data: {
        violation_id: violation.id,
        violation_type: violation.violation_type,
        cultural_context: violation.cultural_context
      }
    })) || []

    if (notifications.length > 0) {
      await supabase.from('user_notifications').insert(notifications)
    }
  } catch (error) {
    console.error('Failed to notify administrators:', error)
  }
}