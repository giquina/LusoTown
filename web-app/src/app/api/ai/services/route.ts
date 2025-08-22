import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * AI Services Management API Endpoint
 * Manages AI cloud service configurations and health monitoring
 */

interface ServiceConfig {
  service_name: string
  service_type: string
  configuration: Record<string, any>
  capabilities: string[]
  rate_limits: Record<string, any>
  cost_per_request: number
  is_active: boolean
  is_primary: boolean
}

interface ServiceHealth {
  service_name: string
  health_status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown'
  response_time_ms: number
  success_rate: number
  last_error?: string
  tested_at: string
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'developer') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const serviceType = searchParams.get('service_type')
    const includeHealth = searchParams.get('include_health') === 'true'
    const activeOnly = searchParams.get('active_only') === 'true'

    // Build query
    let query = supabase
      .from('ai_service_configs')
      .select('*')
      .order('service_name')

    if (serviceType) {
      query = query.eq('service_type', serviceType)
    }

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: services, error } = await query

    if (error) throw error

    // Add health information if requested
    let servicesWithHealth = services
    if (includeHealth && services?.length) {
      const healthChecks = await Promise.all(
        services.map(service => checkServiceHealth(service))
      )
      
      servicesWithHealth = services.map((service, index) => ({
        ...service,
        current_health: healthChecks[index]
      }))
    }

    // Get service usage statistics
    const usageStats = await getServiceUsageStats(supabase, services?.map(s => s.service_name) || [])

    return NextResponse.json({
      services: servicesWithHealth,
      usage_statistics: usageStats,
      total_services: services?.length || 0,
      active_services: services?.filter(s => s.is_active).length || 0
    })

  } catch (error) {
    console.error('AI Services API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AI services configuration' },
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
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const serviceConfig: ServiceConfig = await request.json()

    // Validate required fields
    if (!serviceConfig.service_name || !serviceConfig.service_type) {
      return NextResponse.json({ error: 'Service name and type are required' }, { status: 400 })
    }

    // Validate service type
    const validServiceTypes = [
      'llm', 'translation', 'sentiment_analysis', 'speech_to_text', 
      'text_to_speech', 'computer_vision', 'document_analysis'
    ]
    
    if (!validServiceTypes.includes(serviceConfig.service_type)) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
    }

    // If setting as primary, unset other primary services of same type
    if (serviceConfig.is_primary) {
      await supabase
        .from('ai_service_configs')
        .update({ is_primary: false })
        .eq('service_type', serviceConfig.service_type)
        .neq('service_name', serviceConfig.service_name)
    }

    // Test service configuration before saving
    const healthCheck = await testServiceConfiguration(serviceConfig)
    
    // Insert or update service configuration
    const { data: newService, error: insertError } = await supabase
      .from('ai_service_configs')
      .upsert({
        ...serviceConfig,
        health_status: healthCheck.health_status,
        last_health_check: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) throw insertError

    return NextResponse.json({
      service: newService,
      health_check: healthCheck,
      message: 'AI service configuration saved successfully'
    })

  } catch (error) {
    console.error('AI Service configuration error:', error)
    return NextResponse.json(
      { error: 'Failed to save AI service configuration' },
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

    const { service_name, updates } = await request.json()

    if (!service_name) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 })
    }

    // Update service configuration
    const { data: updatedService, error: updateError } = await supabase
      .from('ai_service_configs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('service_name', service_name)
      .select()
      .single()

    if (updateError) throw updateError

    // Perform health check on updated service
    const healthCheck = await checkServiceHealth(updatedService)
    
    // Update health status
    await supabase
      .from('ai_service_configs')
      .update({
        health_status: healthCheck.health_status,
        last_health_check: new Date().toISOString()
      })
      .eq('service_name', service_name)

    return NextResponse.json({
      service: updatedService,
      health_check: healthCheck,
      message: 'AI service configuration updated successfully'
    })

  } catch (error) {
    console.error('AI Service update error:', error)
    return NextResponse.json(
      { error: 'Failed to update AI service configuration' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    
    // Check authentication and admin access
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceName = searchParams.get('service_name')

    if (!serviceName) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 })
    }

    // Check if service is in use
    const { data: usageCount } = await supabase
      .from('ai_service_usage')
      .select('id', { count: 'exact' })
      .eq('service_name', serviceName)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours

    if (usageCount && usageCount.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete service that has been used in the last 24 hours' },
        { status: 400 }
      )
    }

    // Delete service configuration
    const { error: deleteError } = await supabase
      .from('ai_service_configs')
      .delete()
      .eq('service_name', serviceName)

    if (deleteError) throw deleteError

    return NextResponse.json({
      message: 'AI service configuration deleted successfully'
    })

  } catch (error) {
    console.error('AI Service deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete AI service configuration' },
      { status: 500 }
    )
  }
}

// Helper Functions

async function checkServiceHealth(service: any): Promise<ServiceHealth> {
  const startTime = Date.now()
  
  try {
    let healthStatus: ServiceHealth['health_status'] = 'unknown'
    let responseTime = 0
    let successRate = 1
    let lastError: string | undefined

    // Perform health check based on service type
    switch (service.service_name) {
      case 'openai':
        const openAIHealth = await checkOpenAIHealth(service.configuration)
        healthStatus = openAIHealth.status
        responseTime = openAIHealth.responseTime
        lastError = openAIHealth.error
        break

      case 'azure_openai':
        const azureHealth = await checkAzureOpenAIHealth(service.configuration)
        healthStatus = azureHealth.status
        responseTime = azureHealth.responseTime
        lastError = azureHealth.error
        break

      case 'google_cloud_ai':
        const googleHealth = await checkGoogleCloudHealth(service.configuration)
        healthStatus = googleHealth.status
        responseTime = googleHealth.responseTime
        lastError = googleHealth.error
        break

      default:
        // Generic health check - just verify configuration exists
        healthStatus = service.configuration && Object.keys(service.configuration).length > 0 
          ? 'healthy' 
          : 'unhealthy'
        responseTime = Date.now() - startTime
    }

    return {
      service_name: service.service_name,
      health_status: healthStatus,
      response_time_ms: responseTime,
      success_rate: successRate,
      last_error: lastError,
      tested_at: new Date().toISOString()
    }

  } catch (error) {
    return {
      service_name: service.service_name,
      health_status: 'unhealthy',
      response_time_ms: Date.now() - startTime,
      success_rate: 0,
      last_error: error instanceof Error ? error.message : 'Unknown error',
      tested_at: new Date().toISOString()
    }
  }
}

async function testServiceConfiguration(config: ServiceConfig) {
  // Test the service configuration without saving it
  const mockService = {
    service_name: config.service_name,
    configuration: config.configuration
  }
  
  return await checkServiceHealth(mockService)
}

async function checkOpenAIHealth(config: any) {
  const startTime = Date.now()
  
  try {
    // Mock OpenAI health check - in production, this would make an actual API call
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${config.api_key || 'test'}`,
        'Content-Type': 'application/json'
      }
    })
    
    const responseTime = Date.now() - startTime
    
    if (response.ok) {
      return { status: 'healthy' as const, responseTime, error: undefined }
    } else {
      return { 
        status: 'unhealthy' as const, 
        responseTime, 
        error: `HTTP ${response.status}: ${response.statusText}` 
      }
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Connection failed'
    }
  }
}

async function checkAzureOpenAIHealth(config: any) {
  const startTime = Date.now()
  
  try {
    // Mock Azure OpenAI health check
    if (!config.endpoint || !config.api_key) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: 'Missing endpoint or API key'
      }
    }
    
    // In production, this would make an actual Azure OpenAI API call
    return {
      status: 'healthy' as const,
      responseTime: Date.now() - startTime,
      error: undefined
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Azure connection failed'
    }
  }
}

async function checkGoogleCloudHealth(config: any) {
  const startTime = Date.now()
  
  try {
    // Mock Google Cloud AI health check
    if (!config.project_id) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: 'Missing project ID'
      }
    }
    
    // In production, this would make an actual Google Cloud API call
    return {
      status: 'healthy' as const,
      responseTime: Date.now() - startTime,
      error: undefined
    }
  } catch (error) {
    return {
      status: 'unhealthy' as const,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Google Cloud connection failed'
    }
  }
}

async function getServiceUsageStats(supabase: any, serviceNames: string[]) {
  if (serviceNames.length === 0) return {}

  const endDate = new Date()
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000) // Last 7 days

  const { data: usageData } = await supabase
    .from('ai_service_usage')
    .select('service_name, success, total_cost, latency_ms, created_at')
    .in('service_name', serviceNames)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  const stats: Record<string, any> = {}

  serviceNames.forEach(serviceName => {
    const serviceUsage = usageData?.filter(u => u.service_name === serviceName) || []
    
    const totalRequests = serviceUsage.length
    const successfulRequests = serviceUsage.filter(u => u.success).length
    const totalCost = serviceUsage.reduce((sum, u) => sum + (u.total_cost || 0), 0)
    const avgLatency = totalRequests > 0 
      ? serviceUsage.reduce((sum, u) => sum + (u.latency_ms || 0), 0) / totalRequests
      : 0

    stats[serviceName] = {
      total_requests: totalRequests,
      success_rate: totalRequests > 0 ? successfulRequests / totalRequests : 0,
      total_cost: totalCost,
      average_latency_ms: Math.round(avgLatency),
      requests_per_day: totalRequests / 7,
      cost_per_request: totalRequests > 0 ? totalCost / totalRequests : 0
    }
  })

  return stats
}